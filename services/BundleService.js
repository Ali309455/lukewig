import dbService from "./DBService";

const BUNDLES_COLLECTION = "bundles";

/**
 * Bundle package deal operations.
 */
class BundleService {
  constructor() {
    this.db = dbService;
  }

  /**
   * @param {Object} bundleData
   */
  async createBundle(bundleData) {
    try {
      const id = await this.db.create(BUNDLES_COLLECTION, {
        ...bundleData,
        price: bundleData.price ?? 0,
        originalPrice: bundleData.originalPrice ?? 0,
        savings: bundleData.savings ?? "",
        image: bundleData.image ?? "",
        includes: bundleData.includes ?? [],
        popular: bundleData.popular ?? false,
      });
      return this.getBundle(id);
    } catch (error) {
      console.error("BundleService.createBundle failed:", error);
      throw new Error(error.message || "Failed to create bundle.");
    }
  }

  /**
   * @param {string} bundleId
   * @param {Object} bundleData
   */
  async updateBundle(bundleId, bundleData) {
    try {
      await this.db.update(BUNDLES_COLLECTION, bundleId, bundleData);
      return this.getBundle(bundleId);
    } catch (error) {
      console.error("BundleService.updateBundle failed:", error);
      throw new Error(error.message || "Failed to update bundle.");
    }
  }

  /**
   * @param {string} bundleId
   */
  async deleteBundle(bundleId) {
    try {
      await this.db.delete(BUNDLES_COLLECTION, bundleId);
    } catch (error) {
      console.error("BundleService.deleteBundle failed:", error);
      throw new Error(error.message || "Failed to delete bundle.");
    }
  }

  /**
   * @param {string} bundleId
   */
  async getBundle(bundleId) {
    try {
      const bundle = await this.db.get(BUNDLES_COLLECTION, bundleId);
      if (!bundle) {
        throw new Error("Bundle not found.");
      }
      return this.normalizeBundle(bundle);
    } catch (error) {
      console.error("BundleService.getBundle failed:", error);
      throw new Error(error.message || "Failed to fetch bundle.");
    }
  }

  /**
   * @returns {Promise<Array<Object>>}
   */
  async getBundles() {
    try {
      const bundles = await this.db.getAll(BUNDLES_COLLECTION);
      return bundles.map((b) => this.normalizeBundle(b));
    } catch (error) {
      console.error("BundleService.getBundles failed:", error);
      throw new Error(error.message || "Failed to fetch bundles.");
    }
  }

  /**
   * @param {string} searchTerm
   */
  async searchBundles(searchTerm) {
    try {
      const term = searchTerm?.trim().toLowerCase();
      if (!term) {
        return this.getBundles();
      }

      const all = await this.db.getAll(BUNDLES_COLLECTION);
      return all
        .filter((b) => {
          const title = (b.title || "").toLowerCase();
          const includes = (b.includes || [])
            .map((item) => item.toLowerCase())
            .join(" ");
          return title.includes(term) || includes.includes(term);
        })
        .map((b) => this.normalizeBundle(b));
    } catch (error) {
      console.error("BundleService.searchBundles failed:", error);
      throw new Error(error.message || "Failed to search bundles.");
    }
  }

  /**
   * Uploads a single bundle image and returns the download URL string.
   * @param {string} bundleId
   * @param {File} file
   * @returns {Promise<string>} downloadURL
   */
  async uploadBundleImage(bundleId, file) {
    try {
      if (!bundleId) {
        throw new Error("Bundle id is required.");
      }
      const ext = file.name?.split(".").pop() || "jpg";
      const path = `bundles/${bundleId}/${Date.now()}.${ext}`;
      const result = await this.db.uploadFile(file, path);
      return result.downloadURL;
    } catch (error) {
      console.error("BundleService.uploadBundleImage failed:", error);
      throw new Error(error.message || "Failed to upload bundle image.");
    }
  }

  /**
   * @param {Object} bundle Raw Firestore document
   * @returns {Object} Normalized bundle matching the schema
   */
  normalizeBundle(bundle) {
    return {
      id: bundle.id ?? "",
      title: bundle.title ?? "",
      price: typeof bundle.price === "number" ? bundle.price : Number(bundle.price) || 0,
      originalPrice:
        typeof bundle.originalPrice === "number"
          ? bundle.originalPrice
          : Number(bundle.originalPrice) || 0,
      savings: bundle.savings ?? "",
      image: bundle.image ?? "",
      includes: Array.isArray(bundle.includes) ? bundle.includes : [],
      popular: bundle.popular ?? false,
    };
  }
}

const bundleService = new BundleService();

export default bundleService;
