import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../config/firebase";
import dbService from "./DBService";

const USERS_COLLECTION = "users";

/**
 * Authentication & user profile operations (Firebase Auth + Firestore users).
 */
class AuthService {
  constructor() {
    this.auth = auth;
    this.googleProvider = new GoogleAuthProvider();
  }

  /**
   * Register with email/password and create Firestore user profile.
   * @param {string} displayName
   * @param {string} email
   * @param {string} password
   */
  async register(displayName, email, password) {
    try {
      const credential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      if (displayName) {
        await updateProfile(credential.user, { displayName });
      }

      await this.createUserDocument(credential.user, {
        displayName: displayName || email.split("@")[0],
        role: "customer",
      });

      await sendEmailVerification(credential.user);

      return this.mapAuthUser(credential.user, {
        displayName: displayName || email.split("@")[0],
        role: "customer",
      });
    } catch (error) {
      console.error("AuthService.register failed:", error);
      throw new Error(this.formatAuthError(error));
    }
  }

  /**
   * @param {string} email
   * @param {string} password
   */
  async login(email, password) {
    try {
      const credential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      const profile = await dbService.get(USERS_COLLECTION, credential.user.uid);
      return this.mapAuthUser(credential.user, profile);
    } catch (error) {
      console.error("AuthService.login failed:", error);
      throw new Error(this.formatAuthError(error));
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.error("AuthService.logout failed:", error);
      throw new Error(error.message || "Failed to sign out.");
    }
  }

  async googleLogin() {
    try {
      const result = await signInWithPopup(this.auth, this.googleProvider);
      const existing = await dbService.get(USERS_COLLECTION, result.user.uid);

      if (!existing) {
        await this.createUserDocument(result.user, {
          displayName: result.user.displayName || "Customer",
          role: "customer",
        });
      }

      const profile = await dbService.get(USERS_COLLECTION, result.user.uid);
      return this.mapAuthUser(result.user, profile);
    } catch (error) {
      console.error("AuthService.googleLogin failed:", error);
      throw new Error(this.formatAuthError(error));
    }
  }

  /**
   * @param {string} email
   */
  async forgotPassword(email) {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (error) {
      console.error("AuthService.forgotPassword failed:", error);
      throw new Error(this.formatAuthError(error));
    }
  }

  async verifyEmail() {
    try {
      const user = this.auth.currentUser;
      if (!user) {
        throw new Error("No authenticated user.");
      }
      await sendEmailVerification(user);
    } catch (error) {
      console.error("AuthService.verifyEmail failed:", error);
      throw new Error(error.message || "Failed to send verification email.");
    }
  }

  /**
   * @returns {Promise<Object|null>}
   */
  async getCurrentUser() {
    try {
      const user = this.auth.currentUser;
      if (!user) return null;
      const profile = await dbService.get(USERS_COLLECTION, user.uid);
      return this.mapAuthUser(user, profile);
    } catch (error) {
      console.error("AuthService.getCurrentUser failed:", error);
      throw new Error(error.message || "Failed to resolve current user.");
    }
  }

  /**
   * @param {Object} data displayName, photoURL, etc.
   */
  async updateProfile(data) {
    try {
      const user = this.auth.currentUser;
      if (!user) {
        throw new Error("No authenticated user.");
      }

      const authUpdates = {};
      if (data.displayName !== undefined) authUpdates.displayName = data.displayName;
      if (data.photoURL !== undefined) authUpdates.photoURL = data.photoURL;

      if (Object.keys(authUpdates).length) {
        await updateProfile(user, authUpdates);
      }

      const firestoreUpdates = {};
      if (data.displayName !== undefined) firestoreUpdates.displayName = data.displayName;
      if (data.photoURL !== undefined) firestoreUpdates.photoURL = data.photoURL;
      if (data.phone !== undefined) firestoreUpdates.phone = data.phone;

      if (Object.keys(firestoreUpdates).length) {
        await dbService.update(USERS_COLLECTION, user.uid, firestoreUpdates);
      }

      return this.getCurrentUser();
    } catch (error) {
      console.error("AuthService.updateProfile failed:", error);
      throw new Error(error.message || "Failed to update profile.");
    }
  }

  /**
   * Firestore user document id MUST equal Firebase Auth uid.
   * @param {import('firebase/auth').User} firebaseUser
   * @param {Object} additionalData
   */
  async createUserDocument(firebaseUser, additionalData = {}) {
    try {
      if (!firebaseUser?.uid) {
        throw new Error("Invalid Firebase user.");
      }

      const userData = {
        uid: firebaseUser.uid,
        email: firebaseUser.email || "",
        displayName:
          additionalData.displayName ||
          firebaseUser.displayName ||
          firebaseUser.email?.split("@")[0] ||
          "Customer",
        role: additionalData.role || "customer",
        photoURL: firebaseUser.photoURL || additionalData.photoURL || null,
      };

      await dbService.create(USERS_COLLECTION, userData, firebaseUser.uid);
      return userData;
    } catch (error) {
      console.error("AuthService.createUserDocument failed:", error);
      throw new Error(error.message || "Failed to create user profile.");
    }
  }

  /**
   * Subscribe to auth state; returns unsubscribe function.
   * @param {(user: Object|null) => void} callback
   */
  subscribeToAuthState(callback) {
    return onAuthStateChanged(this.auth, async (firebaseUser) => {
      try {
        if (!firebaseUser) {
          callback(null);
          return;
        }
        const profile = await dbService.get(USERS_COLLECTION, firebaseUser.uid);
        callback(this.mapAuthUser(firebaseUser, profile));
      } catch (error) {
        console.error("AuthService.subscribeToAuthState failed:", error);
        callback(null);
      }
    });
  }

  mapAuthUser(firebaseUser, profile = null) {
    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName:
        profile?.displayName ||
        firebaseUser.displayName ||
        firebaseUser.email?.split("@")[0] ||
        "Customer",
      role: profile?.role || "customer",
      photoURL: profile?.photoURL || firebaseUser.photoURL || null,
      emailVerified: firebaseUser.emailVerified,
    };
  }

  formatAuthError(error) {
    if (!error?.code) return error.message || "Authentication failed.";
    switch (error.code) {
      case "auth/email-already-in-use":
        return "This email is already registered.";
      case "auth/invalid-email":
        return "Invalid email address.";
      case "auth/weak-password":
        return "Password should be at least 6 characters.";
      case "auth/user-not-found":
      case "auth/wrong-password":
      case "auth/invalid-credential":
        return "Invalid email or password.";
      default:
        return error.message || "Authentication failed.";
    }
  }
}

const authService = new AuthService();

export default authService;
