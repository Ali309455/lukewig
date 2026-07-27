import { where } from "firebase/firestore";
import dbService from "./DBService";

const WISHLIST_COLLECTION = "wishlists";

class WishlistService {
  constructor() {
    this.db = dbService;
  }

  async getWishlist(userId) {
    try {
      if (!userId) throw new Error("User ID is required.");
      const results = await this.db.query(WISHLIST_COLLECTION, [
        where("userId", "==", userId),
      ]);
      return results.length > 0 ? results[0] : null;
    } catch (error) {
      console.error("WishlistService.getWishlist failed:", error);
      return null;
    }
  }

  async addToWishlist(userId, product) {
    try {
      if (!userId || !product || !product.id) {
        throw new Error("User ID and product are required.");
      }

      const existing = await this.getWishlist(userId);

      if (existing) {
        const alreadyAdded = (existing.items || []).some(
          (item) => item.productId === product.id
        );
        if (alreadyAdded) return existing;

        const updatedItems = [
          ...(existing.items || []),
          {
            productId: product.id,
            name: product.name,
            category: product.category || "",
            price: product.price,
            image: product.image || "",
            addedAt: new Date().toISOString(),
          },
        ];

        await this.db.update(WISHLIST_COLLECTION, existing.id, {
          items: updatedItems,
        });

        return this.getWishlist(userId);
      }

      const id = await this.db.create(WISHLIST_COLLECTION, {
        userId,
        items: [
          {
            productId: product.id,
            name: product.name,
            category: product.category || "",
            price: product.price,
            image: product.image || "",
            addedAt: new Date().toISOString(),
          },
        ],
      });

      return this.getWishlist(userId);
    } catch (error) {
      console.error("WishlistService.addToWishlist failed:", error);
      throw new Error(error.message || "Failed to add to wishlist.");
    }
  }

  async removeFromWishlist(userId, productId) {
    try {
      if (!userId || !productId) {
        throw new Error("User ID and product ID are required.");
      }

      const existing = await this.getWishlist(userId);
      if (!existing) return null;

      const updatedItems = (existing.items || []).filter(
        (item) => item.productId !== productId
      );

      if (updatedItems.length === 0) {
        await this.db.delete(WISHLIST_COLLECTION, existing.id);
        return null;
      }

      await this.db.update(WISHLIST_COLLECTION, existing.id, {
        items: updatedItems,
      });

      return this.getWishlist(userId);
    } catch (error) {
      console.error("WishlistService.removeFromWishlist failed:", error);
      throw new Error(error.message || "Failed to remove from wishlist.");
    }
  }

  async clearWishlist(userId) {
    try {
      if (!userId) throw new Error("User ID is required.");
      const existing = await this.getWishlist(userId);
      if (existing) {
        await this.db.delete(WISHLIST_COLLECTION, existing.id);
      }
    } catch (error) {
      console.error("WishlistService.clearWishlist failed:", error);
      throw new Error(error.message || "Failed to clear wishlist.");
    }
  }

  isInWishlist(wishlist, productId) {
    if (!wishlist || !wishlist.items) return false;
    return wishlist.items.some((item) => item.productId === productId);
  }
}

const wishlistService = new WishlistService();

export default wishlistService;
