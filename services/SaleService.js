import { where } from "firebase/firestore";
import dbService from "./DBService";

const SALES_COLLECTION = "sales";

const SALE_TYPES = {
  FLASH: "flash",
  CATEGORY: "category",
};

class SaleService {
  constructor() {
    this.db = dbService;
  }

  async createSale(saleData) {
    try {
      const id = await this.db.create(SALES_COLLECTION, {
        ...saleData,
        saleType: saleData.saleType || SALE_TYPES.FLASH,
        category: saleData.category || "",
        promoCode: (saleData.promoCode || "").toUpperCase().trim(),
        discountPercent: saleData.discountPercent ?? 0,
        active: saleData.active ?? false,
        showInHeader: saleData.showInHeader ?? false,
        bannerText: saleData.bannerText || "",
        noteText: saleData.noteText || "",
        buttonText: saleData.buttonText || "",
        startDate: saleData.startDate || null,
        endDate: saleData.endDate || null,
      });
      return this.getSale(id);
    } catch (error) {
      console.error("SaleService.createSale failed:", error);
      throw new Error(error.message || "Failed to create sale.");
    }
  }

  async updateSale(saleId, saleData) {
    try {
      const payload = { ...saleData };
      if (payload.promoCode) {
        payload.promoCode = payload.promoCode.toUpperCase().trim();
      }
      await this.db.update(SALES_COLLECTION, saleId, payload);
      return this.getSale(saleId);
    } catch (error) {
      console.error("SaleService.updateSale failed:", error);
      throw new Error(error.message || "Failed to update sale.");
    }
  }

  async deleteSale(saleId) {
    try {
      await this.db.delete(SALES_COLLECTION, saleId);
    } catch (error) {
      console.error("SaleService.deleteSale failed:", error);
      throw new Error(error.message || "Failed to delete sale.");
    }
  }

  async getSale(saleId) {
    try {
      const sale = await this.db.get(SALES_COLLECTION, saleId);
      if (!sale) {
        throw new Error("Sale not found.");
      }
      return this.normalizeSale(sale);
    } catch (error) {
      console.error("SaleService.getSale failed:", error);
      throw new Error(error.message || "Failed to fetch sale.");
    }
  }

  async getSales() {
    try {
      const sales = await this.db.getAll(SALES_COLLECTION);
      return sales.map((s) => this.normalizeSale(s));
    } catch (error) {
      console.error("SaleService.getSales failed:", error);
      throw new Error(error.message || "Failed to fetch sales.");
    }
  }

  async getActiveSale() {
    try {
      const all = await this.db.getAll(SALES_COLLECTION);
      const now = new Date();
      const active = all.find((s) => {
        const sale = this.normalizeSale(s);
        if (!sale.active) return false;
        if (sale.startDate && new Date(sale.startDate) > now) return false;
        if (sale.endDate && new Date(sale.endDate) < now) return false;
        return true;
      });
      return active ? this.normalizeSale(active) : null;
    } catch (error) {
      console.error("SaleService.getActiveSale failed:", error);
      throw new Error(error.message || "Failed to fetch active sale.");
    }
  }

  async searchSales(searchTerm) {
    try {
      const term = searchTerm?.trim().toLowerCase();
      if (!term) {
        return this.getSales();
      }
      const all = await this.db.getAll(SALES_COLLECTION);
      return all
        .filter((s) => {
          const title = (s.title || "").toLowerCase();
          const code = (s.promoCode || "").toLowerCase();
          const banner = (s.bannerText || "").toLowerCase();
          return (
            title.includes(term) ||
            code.includes(term) ||
            banner.includes(term)
          );
        })
        .map((s) => this.normalizeSale(s));
    } catch (error) {
      console.error("SaleService.searchSales failed:", error);
      throw new Error(error.message || "Failed to search sales.");
    }
  }

  async toggleSaleStatus(saleId, active) {
    try {
      await this.db.update(SALES_COLLECTION, saleId, { active });
      return this.getSale(saleId);
    } catch (error) {
      console.error("SaleService.toggleSaleStatus failed:", error);
      throw new Error(error.message || "Failed to toggle sale status.");
    }
  }

  async validatePromoCode(code) {
    try {
      if (!code || !code.trim()) {
        return { valid: false, message: "Please enter a promo code." };
      }

      const normalizedCode = code.trim().toUpperCase();
      const all = await this.db.getAll(SALES_COLLECTION);
      const match = all.find((s) => {
        const saleCode = (s.promoCode || "").toUpperCase().trim();
        return saleCode === normalizedCode;
      });

      if (!match) {
        return { valid: false, message: "Invalid promotional code." };
      }

      const sale = this.normalizeSale(match);

      if (!sale.active) {
        return { valid: false, message: "This promo code is no longer active." };
      }

      const now = new Date();

      if (sale.startDate && new Date(sale.startDate) > now) {
        return {
          valid: false,
          message: `This promo code is not yet valid. It starts on ${new Date(
            sale.startDate
          ).toLocaleDateString()}.`,
        };
      }

      if (sale.endDate && new Date(sale.endDate) < now) {
        return {
          valid: false,
          message: "This promo code has expired.",
        };
      }

      return {
        valid: true,
        sale,
        message: `Promo code applied! ${sale.discountPercent}% off${
          sale.saleType === "category" && sale.category
            ? ` on ${sale.category}`
            : " sitewide"
        }.`,
      };
    } catch (error) {
      console.error("SaleService.validatePromoCode failed:", error);
      return { valid: false, message: "Failed to validate promo code." };
    }
  }

  isSaleExpired(sale) {
    if (!sale.endDate) return false;
    return new Date(sale.endDate) < new Date();
  }

  isSaleActive(sale) {
    if (!sale.active) return false;
    if (this.isSaleExpired(sale)) return false;
    if (sale.startDate && new Date(sale.startDate) > new Date()) return false;
    return true;
  }

  async calculateDiscount(promoCode, items) {
    if (!promoCode || !items || !items.length) {
      return { discountAmount: 0, eligibleItems: [] };
    }

    const result = await this.validatePromoCode(promoCode);
    if (!result.valid || !result.sale) {
      return { discountAmount: 0, eligibleItems: [] };
    }

    const sale = result.sale;
    const percent = sale.discountPercent;

    let discountedTotal = 0;
    const eligibleItems = [];

    for (const item of items) {
      const itemTotal = (item.price || 0) * (item.qty || 1);
      const isCategoryMatch =
        sale.saleType === "category" && sale.category
          ? (item.category || "") === sale.category
          : true;

      if (sale.saleType === "flash" || isCategoryMatch) {
        discountedTotal += (itemTotal * percent) / 100;
        eligibleItems.push(item.productId || item.id);
      }
    }

    return {
      discountAmount: Math.round(discountedTotal * 100) / 100,
      eligibleItems,
      saleId: sale.id,
      discountPercent: percent,
    };
  }

  normalizeSale(sale) {
    return {
      id: sale.id ?? "",
      title: sale.title ?? "",
      saleType: sale.saleType || "flash",
      category: sale.category || "",
      promoCode: sale.promoCode || "",
      discountPercent: typeof sale.discountPercent === "number"
        ? sale.discountPercent
        : Number(sale.discountPercent) || 0,
      startDate: sale.startDate || null,
      endDate: sale.endDate || null,
      active: sale.active ?? false,
      showInHeader: sale.showInHeader ?? false,
      bannerText: sale.bannerText || "",
      noteText: sale.noteText || "",
      buttonText: sale.buttonText || "",
      createdAt: sale.createdAt || null,
      updatedAt: sale.updatedAt || null,
    };
  }
}

const saleService = new SaleService();

export default saleService;
