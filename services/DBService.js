import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  serverTimestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "../config/firebase";

/**
 * Low-level Firestore & Storage access. All other services must use this class.
 */
class DBService {
  constructor() {
    this.db = db;
    this.storage = storage;
  }

  /**
   * Create a document. Pass documentId to use a specific ID (e.g. Firebase Auth uid).
   * @param {string} collectionName
   * @param {Object} data
   * @param {string} [documentId]
   * @returns {Promise<string>} Document id
   */
  async create(collectionName, data, documentId = null) {
    try {
      const payload = {
        ...data,
        createdAt: data.createdAt ?? serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      if (documentId) {
        await setDoc(doc(this.db, collectionName, documentId), payload);
        return documentId;
      }

      const docRef = await addDoc(collection(this.db, collectionName), payload);
      return docRef.id;
    } catch (error) {
      console.error(`DBService.create(${collectionName}) failed:`, error);
      throw new Error(error.message || "Failed to create document.");
    }
  }

  /**
   * @param {string} collectionName
   * @param {string} id
   * @returns {Promise<Object|null>}
   */
  async get(collectionName, id) {
    try {
      const snap = await getDoc(doc(this.db, collectionName, id));
      if (!snap.exists()) return null;
      return { id: snap.id, ...snap.data() };
    } catch (error) {
      console.error(`DBService.get(${collectionName}, ${id}) failed:`, error);
      throw new Error(error.message || "Failed to fetch document.");
    }
  }

  /**
   * @param {string} collectionName
   * @returns {Promise<Array<Object>>}
   */
  async getAll(collectionName) {
    try {
      const snap = await getDocs(collection(this.db, collectionName));
      return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    } catch (error) {
      console.error(`DBService.getAll(${collectionName}) failed:`, error);
      throw new Error(error.message || "Failed to fetch documents.");
    }
  }

  /**
   * @param {string} collectionName
   * @param {string} id
   * @param {Object} data
   */
  async update(collectionName, id, data) {
    try {
      await updateDoc(doc(this.db, collectionName, id), {
        ...data,
        updatedAt: serverTimestamp(),
      });
      return { id, ...data };
    } catch (error) {
      console.error(`DBService.update(${collectionName}, ${id}) failed:`, error);
      throw new Error(error.message || "Failed to update document.");
    }
  }

  /**
   * @param {string} collectionName
   * @param {string} id
   */
  async delete(collectionName, id) {
    try {
      await deleteDoc(doc(this.db, collectionName, id));
    } catch (error) {
      console.error(`DBService.delete(${collectionName}, ${id}) failed:`, error);
      throw new Error(error.message || "Failed to delete document.");
    }
  }

  /**
   * @param {string} collectionName
   * @param {Array} constraints Firestore query constraints (where, orderBy, limit, etc.)
   * @returns {Promise<Array<Object>>}
   */
  async query(collectionName, constraints = []) {
    try {
      const q = query(collection(this.db, collectionName), ...constraints);
      const snap = await getDocs(q);
      return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    } catch (error) {
      console.error(`DBService.query(${collectionName}) failed:`, error);
      throw new Error(error.message || "Failed to run query.");
    }
  }

  /**
   * @param {File|Blob} file
   * @param {string} path Storage path (e.g. products/{id}/image.jpg)
   * @returns {Promise<{ downloadURL: string, storagePath: string }>}
   */
  async uploadFile(file, path) {
    try {
      const storageRef = ref(this.storage, path);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return { downloadURL, storagePath: path };
    } catch (error) {
      console.error(`DBService.uploadFile(${path}) failed:`, error);
      throw new Error(error.message || "Failed to upload file.");
    }
  }

  /**
   * @param {string} storagePath
   */
  async deleteFile(storagePath) {
    try {
      await deleteObject(ref(this.storage, storagePath));
    } catch (error) {
      console.error(`DBService.deleteFile(${storagePath}) failed:`, error);
      throw new Error(error.message || "Failed to delete file.");
    }
  }

  /**
   * @param {string} storagePath
   * @returns {Promise<string>}
   */
  async getFileURL(storagePath) {
    try {
      return await getDownloadURL(ref(this.storage, storagePath));
    } catch (error) {
      console.error(`DBService.getFileURL(${storagePath}) failed:`, error);
      throw new Error(error.message || "Failed to resolve file URL.");
    }
  }
}

const dbService = new DBService();

export default dbService;
