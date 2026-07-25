import { where, orderBy, limit } from "firebase/firestore";
import dbService from "./DBService";

const PRODUCTS_COLLECTION = "products";

/**
 * Product catalog operations.
 */
class ProductService {
  constructor() {
    this.db = dbService;
  }

  /**
   * @param {Object} productData
   */
  async createProduct(productData) {
    try {
      const id = await this.db.create(PRODUCTS_COLLECTION, {
        ...productData,
        averageRating: productData.averageRating ?? productData.rating ?? 0,
        ratingCount: productData.ratingCount ?? productData.reviewsCount ?? 0,
        ratingSum: productData.ratingSum ?? 0,
        stock: productData.stock ?? 0,
        isOnSale: productData.isOnSale ?? false,
        images: productData.images ?? [],
      });
      return this.getProduct(id);
    } catch (error) {
      console.error("ProductService.createProduct failed:", error);
      throw new Error(error.message || "Failed to create product.");
    }
  }

  /**
   * @param {string} productId
   * @param {Object} productData
   */
  async updateProduct(productId, productData) {
    try {
      await this.db.update(PRODUCTS_COLLECTION, productId, productData);
      return this.getProduct(productId);
    } catch (error) {
      console.error("ProductService.updateProduct failed:", error);
      throw new Error(error.message || "Failed to update product.");
    }
  }

  /**
   * @param {string} productId
   */
  async deleteProduct(productId) {
    try {
      console.log(PRODUCTS_COLLECTION, productId);
      const res = await this.db.delete(PRODUCTS_COLLECTION, productId);
      console.log(res)
    } catch (error) {
      console.error("ProductService.deleteProduct failed:", error);
      throw new Error(error.message || "Failed to delete product.");
    }
  }

  /**
   * @param {string} productId
   */
  async getProduct(productId) {
    try {
      const product = await this.db.get(PRODUCTS_COLLECTION, productId);
      if (!product) {
        throw new Error("Product not found.");
      }
      return this.normalizeProduct(product);
    } catch (error) {
      console.error("ProductService.getProduct failed:", error);
      throw new Error(error.message || "Failed to fetch product.");
    }
  }

  /**
   * @param {Object} [options]
   * @param {string} [options.category]
   * @param {number} [options.limitCount]
   */
  async getProducts(options = {}) {
    try {
      let products;

      if (options.category) {
        const constraints = [
          where("category", "==", options.category),
          orderBy("createdAt", "desc"),
        ];
        if (options.limitCount) {
          constraints.push(limit(options.limitCount));
        }
        products = await this.db.query(PRODUCTS_COLLECTION, constraints);
      } else {
        products = await this.db.getAll(PRODUCTS_COLLECTION);
        if (options.limitCount) {
          products = products.slice(0, options.limitCount);
        }
      }

      return products.map((p) => this.normalizeProduct(p));
    } catch (error) {
      console.error("ProductService.getProducts failed:", error);
      throw new Error(error.message || "Failed to fetch products.");
    }
  }

  /**
   * @param {string} searchTerm
   */
  async searchProducts(searchTerm) {
    try {
      const term = searchTerm?.trim().toLowerCase();
      if (!term) {
        return this.getProducts();
      }

      const all = await this.db.getAll(PRODUCTS_COLLECTION);
      return all
        .filter((p) => {
          const name = (p.name || "").toLowerCase();
          const category = (p.category || "").toLowerCase();
          const description = (p.description || "").toLowerCase();
          return (
            name.includes(term) ||
            category.includes(term) ||
            description.includes(term)
          );
        })
        .map((p) => this.normalizeProduct(p));
    } catch (error) {
      console.error("ProductService.searchProducts failed:", error);
      throw new Error(error.message || "Failed to search products.");
    }
  }

  /**
   * @param {string} productId
   * @param {Array<File>} files
   * @returns {Promise<Array<{ downloadURL: string, storagePath: string }>>}
   */
  async uploadProductImages(productId, files = []) {
    try {
      if (!productId) {
        throw new Error("Product id is required.");
      }

      const uploads = [];
      for (let i = 0; i < files.length; i += 1) {
        const file = files[i];
        const ext = file.name?.split(".").pop() || "jpg";
        const path = `products/${productId}/${Date.now()}-${i}.${ext}`;
        const result = await this.db.uploadFile(file, path);
        uploads.push(result);
      }

      if (uploads.length) {
        const product = await this.db.get(PRODUCTS_COLLECTION, productId);
        const existing = product?.images ?? [];
        await this.db.update(PRODUCTS_COLLECTION, productId, {
          images: [...existing, ...uploads],
        });
      }

      return uploads;
    } catch (error) {
      console.error("ProductService.uploadProductImages failed:", error);
      throw new Error(error.message || "Failed to upload product images.");
    }
  }

  /**
   * @param {string} productId
   * @param {boolean} isOnSale
   * @param {Object} [saleFields] discountPercent, discountPrice, originalPrice
   */
  async toggleSale(productId, isOnSale, saleFields = {}) {
    try {
      await this.db.update(PRODUCTS_COLLECTION, productId, {
        isOnSale,
        ...saleFields,
      });
      return this.getProduct(productId);
    } catch (error) {
      console.error("ProductService.toggleSale failed:", error);
      throw new Error(error.message || "Failed to update sale status.");
    }
  }

  /**
   * @param {string} productId
   * @param {number} stock
   */
  async updateStock(productId, stock) {
    try {
      if (typeof stock !== "number" || stock < 0) {
        throw new Error("Stock must be a non-negative number.");
      }
      await this.db.update(PRODUCTS_COLLECTION, productId, { stock });
      return this.getProduct(productId);
    } catch (error) {
      console.error("ProductService.updateStock failed:", error);
      throw new Error(error.message || "Failed to update stock.");
    }
  }

  normalizeProduct(product) {
    return {
      ...product,
      rating: product.averageRating ?? product.rating ?? 0,
      reviewsCount: product.ratingCount ?? product.reviewsCount ?? 0,
      image:
        product.image ||
        product.images?.[0]?.downloadURL ||
        product.images?.[0] ||
        null,
    };
  }
}

const productService = new ProductService();

export default productService;
