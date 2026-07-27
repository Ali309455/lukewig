"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  PlusCircle,
  Package,
  DollarSign,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Search,
  Tag,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import productService from "@/services/ProductService";
import bundleService from "@/services/BundleService";
import saleService from "@/services/SaleService";
import orderService, { ORDER_STATUSES } from "@/services/OrderService";
import { SIZE_KEYS, calcDiscountedPrice } from "@/components/admin/common/constants";
import ProductForm from "@/components/admin/products/ProductForm";
import ProductCatalogList from "@/components/admin/products/ProductCatalogList";
import BundleForm from "@/components/admin/bundles/BundleForm";
import BundleList from "@/components/admin/bundles/BundleList";
import OrdersSection from "@/components/admin/orders/OrdersSection";
import SaleManagerSection from "@/components/admin/sales/SaleManagerSection";
import RestockModal from "@/components/admin/modals/RestockModal";

const EMPTY_FORM = {
  name: "",
  category: "Straight Wigs",
  shortDescription: "",
  fullDescription: "",
  originalPrice: "",
  price: "",
  isOnSale: false,
  discountPercent: 0,
  sizes: SIZE_KEYS.map((size) => ({ size, price: "", stock: "" })),
  details: { hairType: "", density: "", capSize: "", laceType: "" },
  images: [],
};

const EMPTY_SALE_FORM = {
  title: "",
  saleType: "flash",
  category: "",
  promoCode: "",
  discountPercent: 0,
  startDate: "",
  endDate: "",
  active: false,
  showInHeader: false,
  bannerText: "",
  noteText: "",
  buttonText: "",
};

const EMPTY_BUNDLE_FORM = {
  title: "",
  price: "",
  originalPrice: "",
  savings: "",
  imageFile: null,
  image: "",
  includes: [""],
  popular: false,
};

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("products");

  // Products state
  const [productList, setProductList] = useState([]);
  const [productLoading, setProductLoading] = useState(true);
  const [productSubmitting, setProductSubmitting] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [productSearchTerm, setProductSearchTerm] = useState("");
  const [restockProduct, setRestockProduct] = useState(null);

  // Bundles state
  const [bundleList, setBundleList] = useState([]);
  const [bundleLoading, setBundleLoading] = useState(true);
  const [bundleSubmitting, setBundleSubmitting] = useState(false);
  const [editingBundle, setEditingBundle] = useState(null);
  const [bundleForm, setBundleForm] = useState(EMPTY_BUNDLE_FORM);
  const [bundleSearchTerm, setBundleSearchTerm] = useState("");

  // Orders state
  const [orderList, setOrderList] = useState([]);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderUpdating, setOrderUpdating] = useState(null);

  // Sale state
  const [saleList, setSaleList] = useState([]);
  const [saleLoading, setSaleLoading] = useState(true);
  const [saleSubmitting, setSaleSubmitting] = useState(false);
  const [editingSale, setEditingSale] = useState(null);
  const [saleForm, setSaleForm] = useState(EMPTY_SALE_FORM);
  const [saleSearchTerm, setSaleSearchTerm] = useState("");

  // Notifications
  const [notification, setNotification] = useState(null);
  const notifyTimerRef = useRef(null);

  const notify = useCallback((msg, type = "success") => {
    if (notifyTimerRef.current) clearTimeout(notifyTimerRef.current);
    setNotification({ msg, type });
    notifyTimerRef.current = setTimeout(() => setNotification(null), 3500);
  }, []);

  // Data loaders
  const loadProducts = useCallback(async () => {
    try {
      setProductLoading(true);
      const products = await productService.getProducts();
      setProductList(products);
    } catch (err) {
      notify(err.message, "error");
    } finally {
      setProductLoading(false);
    }
  }, [notify]);

  const loadBundles = useCallback(async () => {
    try {
      setBundleLoading(true);
      const bundles = await bundleService.getBundles();
      setBundleList(bundles);
    } catch (err) {
      notify(err.message, "error");
    } finally {
      setBundleLoading(false);
    }
  }, [notify]);

  const loadOrders = useCallback(async () => {
    try {
      setOrderLoading(true);
      const orders = await orderService.getAllOrders();
      setOrderList(orders);
    } catch (err) {
      notify(err.message, "error");
    } finally {
      setOrderLoading(false);
    }
  }, [notify]);

  const loadSales = useCallback(async () => {
    try {
      setSaleLoading(true);
      const sales = await saleService.getSales();
      setSaleList(sales);
    } catch (err) {
      notify(err.message, "error");
    } finally {
      setSaleLoading(false);
    }
  }, [notify]);

  useEffect(() => {
    loadProducts();
    loadBundles();
    loadSales();
  }, [loadProducts, loadBundles, loadSales]);

  useEffect(() => {
    if (activeTab === "orders") loadOrders();
  }, [activeTab, loadOrders]);

  // Product handlers
  const resetProductForm = () => {
    setForm(EMPTY_FORM);
    setEditingProduct(null);
  };

  const buildProductObj = (f) => {
    const origPrice = parseFloat(f.originalPrice) || 0;
    const discPct = f.isOnSale ? f.discountPercent : 0;
    const salePrice = parseFloat(calcDiscountedPrice(origPrice, discPct)) || origPrice;
    return {
      name: f.name.trim(),
      category: f.category,
      shortDescription: f.shortDescription.trim(),
      fullDescription: f.fullDescription.trim(),
      originalPrice: origPrice,
      price: salePrice,
      discountPercent: discPct,
      isOnSale: f.isOnSale,
      sizes: f.sizes.map((s) => ({
        size: s.size,
        price: parseFloat(s.price) || 0,
        stock: parseInt(s.stock) || 0,
      })),
      details: { ...f.details },
      images: [],
      rating: 0,
      reviewsCount: 0,
    };
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setProductSubmitting(true);
    try {
      const productObj = buildProductObj(form);
      const created = await productService.createProduct(productObj);
      const newFiles = form.images.filter((f) => f instanceof File);
      if (newFiles.length && created?.id) {
        await productService.uploadProductImages(created.id, newFiles);
      }
      await loadProducts();
      notify(`"${form.name}" added to catalog!`);
      resetProductForm();
    } catch (err) {
      notify(err.message, "error");
    } finally {
      setProductSubmitting(false);
    }
  };

  const handleEditProductClick = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name || "",
      category: product.category || "Straight Wigs",
      shortDescription: product.shortDescription || "",
      fullDescription: product.fullDescription || product.description || "",
      originalPrice: product.originalPrice || "",
      price: product.price || "",
      isOnSale: product.isOnSale ?? false,
      discountPercent: product.discountPercent ?? 0,
      sizes: SIZE_KEYS.map((sz) => {
        const match = product.sizes?.find((s) => s.size === sz);
        return { size: sz, price: match?.price ?? "", stock: match?.stock ?? "" };
      }),
      details: {
        hairType: product.details?.hairType || "",
        density: product.details?.density || "",
        capSize: product.details?.capSize || "",
        laceType: product.details?.laceType || "",
      },
      images: product.images || [],
    });
    document.getElementById("product-form-card")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    setProductSubmitting(true);
    try {
      const productObj = buildProductObj(form);
      await productService.updateProduct(editingProduct.id, productObj);
      const newFiles = form.images.filter((f) => f instanceof File);
      if (newFiles.length) {
        await productService.uploadProductImages(editingProduct.id, newFiles);
      }
      await loadProducts();
      notify("Product updated successfully.");
      resetProductForm();
    } catch (err) {
      notify(err.message, "error");
    } finally {
      setProductSubmitting(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await productService.deleteProduct(id);
      await loadProducts();
      notify("Product removed from catalog.");
    } catch (err) {
      notify(err.message, "error");
    }
  };

  const handleProductSearch = async (term) => {
    setProductSearchTerm(term);
    try {
      setProductLoading(true);
      const results = await productService.searchProducts(term);
      setProductList(results);
    } catch (err) {
      notify(err.message, "error");
    } finally {
      setProductLoading(false);
    }
  };

  const handleRestockComplete = (productId, size, newStock) => {
    notify(`Product restocked — ${size} now has ${newStock} units.`);
    loadProducts();
  };

  // Bundle handlers
  const resetBundleForm = () => {
    setBundleForm(EMPTY_BUNDLE_FORM);
    setEditingBundle(null);
  };

  const buildBundleObj = (f) => ({
    title: f.title.trim(),
    price: parseFloat(f.price) || 0,
    originalPrice: parseFloat(f.originalPrice) || 0,
    savings: f.savings.trim(),
    image: f.image || "",
    includes: f.includes.filter((item) => item.trim() !== ""),
    popular: f.popular,
  });

  const handleAddBundle = async (e) => {
    e.preventDefault();
    setBundleSubmitting(true);
    try {
      const bundleObj = buildBundleObj(bundleForm);
      const created = await bundleService.createBundle(bundleObj);
      if (bundleForm.imageFile && created?.id) {
        const downloadURL = await bundleService.uploadBundleImage(created.id, bundleForm.imageFile);
        await bundleService.updateBundle(created.id, { image: downloadURL });
      }
      await loadBundles();
      notify(`Bundle "${bundleForm.title}" created!`);
      resetBundleForm();
    } catch (err) {
      notify(err.message, "error");
    } finally {
      setBundleSubmitting(false);
    }
  };

  const handleEditBundleClick = (bundle) => {
    setEditingBundle(bundle);
    setBundleForm({
      title: bundle.title || "",
      price: bundle.price || "",
      originalPrice: bundle.originalPrice || "",
      savings: bundle.savings || "",
      imageFile: null,
      image: bundle.image || "",
      includes: bundle.includes?.length > 0 ? bundle.includes : [""],
      popular: bundle.popular ?? false,
    });
    document.getElementById("bundle-form-card")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleUpdateBundle = async (e) => {
    e.preventDefault();
    setBundleSubmitting(true);
    try {
      const bundleObj = buildBundleObj(bundleForm);
      if (bundleForm.imageFile) {
        const downloadURL = await bundleService.uploadBundleImage(editingBundle.id, bundleForm.imageFile);
        bundleObj.image = downloadURL;
      }
      await bundleService.updateBundle(editingBundle.id, bundleObj);
      await loadBundles();
      notify("Bundle updated successfully.");
      resetBundleForm();
    } catch (err) {
      notify(err.message, "error");
    } finally {
      setBundleSubmitting(false);
    }
  };

  const handleDeleteBundle = async (id) => {
    try {
      await bundleService.deleteBundle(id);
      await loadBundles();
      notify("Bundle removed.");
    } catch (err) {
      notify(err.message, "error");
    }
  };

  const handleBundleSearch = async (term) => {
    setBundleSearchTerm(term);
    try {
      setBundleLoading(true);
      const results = await bundleService.searchBundles(term);
      setBundleList(results);
    } catch (err) {
      notify(err.message, "error");
    } finally {
      setBundleLoading(false);
    }
  };

  // Order handlers
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      setOrderUpdating(orderId);
      await orderService.updateOrderStatus(orderId, newStatus);
      await loadOrders();
      notify(`Order status updated to "${newStatus}"`);
    } catch (err) {
      notify(err.message, "error");
    } finally {
      setOrderUpdating(null);
    }
  };

  // Sale handlers
  const resetSaleForm = () => {
    setSaleForm(EMPTY_SALE_FORM);
    setEditingSale(null);
  };

  const buildSaleObj = (f) => ({
    title: f.title.trim(),
    saleType: f.saleType,
    category: f.saleType === "category" ? f.category : "",
    promoCode: f.promoCode.trim().toUpperCase(),
    discountPercent: Number(f.discountPercent) || 0,
    startDate: f.startDate || null,
    endDate: f.endDate || null,
    active: f.active,
    showInHeader: f.showInHeader,
    bannerText: f.bannerText.trim(),
    noteText: f.noteText.trim(),
    buttonText: f.buttonText.trim(),
  });

  const handleAddSale = async (e) => {
    e.preventDefault();
    setSaleSubmitting(true);
    try {
      const saleObj = buildSaleObj(saleForm);
      await saleService.createSale(saleObj);
      await loadSales();
      notify(`Sale campaign "${saleForm.title}" created!`);
      resetSaleForm();
    } catch (err) {
      notify(err.message, "error");
    } finally {
      setSaleSubmitting(false);
    }
  };

  const handleEditSaleClick = (sale) => {
    setEditingSale(sale);
    setSaleForm({
      title: sale.title || "",
      saleType: sale.saleType || "flash",
      category: sale.category || "",
      promoCode: sale.promoCode || "",
      discountPercent: sale.discountPercent ?? 0,
      startDate: sale.startDate || "",
      endDate: sale.endDate || "",
      active: sale.active ?? false,
      showInHeader: sale.showInHeader ?? false,
      bannerText: sale.bannerText || "",
      noteText: sale.noteText || "",
      buttonText: sale.buttonText || "",
    });
    document.getElementById("sale-form-card")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleUpdateSale = async (e) => {
    e.preventDefault();
    setSaleSubmitting(true);
    try {
      const saleObj = buildSaleObj(saleForm);
      await saleService.updateSale(editingSale.id, saleObj);
      await loadSales();
      notify("Sale campaign updated successfully.");
      resetSaleForm();
    } catch (err) {
      notify(err.message, "error");
    } finally {
      setSaleSubmitting(false);
    }
  };

  const handleDeleteSale = async (id) => {
    try {
      await saleService.deleteSale(id);
      await loadSales();
      notify("Sale campaign removed.");
    } catch (err) {
      notify(err.message, "error");
    }
  };

  const handleToggleSaleActive = async (id, active) => {
    try {
      await saleService.toggleSaleStatus(id, active);
      await loadSales();
      notify(active ? "Sale campaign activated." : "Sale campaign deactivated.");
    } catch (err) {
      notify(err.message, "error");
    }
  };

  const handleSaleSearch = async (term) => {
    setSaleSearchTerm(term);
    try {
      setSaleLoading(true);
      const results = await saleService.searchSales(term);
      setSaleList(results);
    } catch (err) {
      notify(err.message, "error");
    } finally {
      setSaleLoading(false);
    }
  };

  const TabBtn = ({ id, label }) => (
    <button
      type="button"
      onClick={() => setActiveTab(id)}
      className={`pb-3 px-5 font-serif text-xl font-bold border-b-2 transition-all ${
        activeTab === id
          ? "border-luxe-rose text-luxe-rose text-2xl"
          : "border-transparent text-gray-400 hover:text-gray-700"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-sans">
      {notification && (
        <div
          className={`fixed top-24 right-4 sm:right-6 z-50 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-bold animate-bounce max-w-xs ${
            notification.type === "error"
              ? "bg-red-600 text-white"
              : "bg-emerald-700 text-white"
          }`}
        >
          {notification.type === "error" ? (
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
          ) : (
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
          )}
          <span>{notification.msg}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-pink-100 pb-6 gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-36 h-10">
              <Image src="/images/logo.svg" alt="VERSATILE BY VERSHA'" width={140} height={40} className="object-contain" />
            </div>
            <span className="px-3 py-1 rounded-full bg-luxe-rose/10 text-luxe-rose text-xs font-bold border border-luxe-rose/20 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin Management Dashboard
            </span>
          </div>
          <h1 className="font-serif text-3xl font-extrabold text-gray-900 tracking-tight">
            VERSATILE BY VERSHA&apos;{" "}
            <span className="text-luxe-gold font-normal text-xl">| Store Management</span>
          </h1>
          <p className="text-xs text-gray-500 font-medium">
            Logged in as: <strong className="text-gray-900 font-bold">{user?.email || "Admin"}</strong>
          </p>
        </div>
        <Link
          href="/shop"
          className="px-5 py-2.5 rounded-full border border-pink-200 text-xs font-bold text-gray-700 hover:bg-luxe-rose hover:text-white hover:border-luxe-rose transition-all shadow-xs whitespace-nowrap"
        >
          View Store Front →
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Sales", value: "$24,850", sub: "+18.4% this month", icon: <DollarSign className="w-5 h-5 text-emerald-500" />, valueClass: "text-gray-900" },
          { label: "Products", value: productList.length, sub: "Catalog Items", icon: <Package className="w-5 h-5 text-luxe-rose" />, valueClass: "text-gray-900" },
          { label: "Active Sale", value: (saleList.find((s) => s.active)?.discountPercent || "No") + "% OFF", sub: saleList.filter((s) => s.active).length + " Active Campaigns", icon: <Tag className="w-5 h-5 text-luxe-gold" />, valueClass: "text-luxe-rose" },
          { label: "Bundle Deals", value: bundleList.length, sub: "Active Packages", icon: <Package className="w-5 h-5 text-indigo-500" />, valueClass: "text-gray-900" },
        ].map(({ label, value, sub, icon, valueClass }) => (
          <div key={label} className="bg-white p-5 rounded-3xl shadow-sm border border-pink-100 space-y-2">
            <div className="flex items-center justify-between text-gray-400">
              <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
              {icon}
            </div>
            <p className={`font-serif text-2xl sm:text-3xl font-extrabold ${valueClass}`}>{value}</p>
            <span className="text-[11px] text-gray-500 font-medium flex items-center gap-1">
              {label === "Total Sales" && <TrendingUp className="w-3 h-3 text-emerald-500" />}
              {sub}
            </span>
          </div>
        ))}
      </div>

      <div className="flex space-x-2 sm:space-x-4 border-b border-pink-100 overflow-x-auto">
        <TabBtn id="orders" label="Orders" />
        <TabBtn id="products" label="Product Manager" />
        <TabBtn id="sales" label="Launch Sales" />
        <TabBtn id="bundles" label="Create Bundles" />
      </div>

      {activeTab === "orders" && (
        <OrdersSection
          orders={orderList}
          loading={orderLoading}
          updating={orderUpdating}
          onStatusChange={handleUpdateOrderStatus}
          onRefresh={loadOrders}
        />
      )}

      {activeTab === "products" && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div
            id="product-form-card"
            className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-pink-100 space-y-4"
          >
            <h2 className="font-serif text-2xl font-bold text-gray-900 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-luxe-rose flex-shrink-0" />
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h2>

            {editingProduct && (
              <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-100 rounded-xl text-xs font-semibold text-blue-600">
                <Package className="w-3.5 h-3.5" />
                Editing: <span className="font-bold">{editingProduct.name}</span>
              </div>
            )}

            <ProductForm
              form={form}
              setForm={setForm}
              editingProduct={editingProduct}
              onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
              submitting={productSubmitting}
              onCancel={resetProductForm}
            />
          </div>

          <ProductCatalogList
            products={productList}
            loading={productLoading}
            searchTerm={productSearchTerm}
            onSearch={handleProductSearch}
            onEdit={handleEditProductClick}
            onDelete={handleDeleteProduct}
            onRestock={setRestockProduct}
            notify={notify}
          />
        </div>
      )}

      {activeTab === "sales" && (
        <div id="sale-form-card">
          <SaleManagerSection
            saleList={saleList}
            saleForm={saleForm}
            setSaleForm={setSaleForm}
            onSubmit={editingSale ? handleUpdateSale : handleAddSale}
            editingSale={editingSale}
            onCancel={resetSaleForm}
            submitting={saleSubmitting}
            searchTerm={saleSearchTerm}
            onSearch={handleSaleSearch}
            onEdit={handleEditSaleClick}
            onDelete={handleDeleteSale}
            onToggleActive={handleToggleSaleActive}
          />
        </div>
      )}

      {activeTab === "bundles" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div
            id="bundle-form-card"
            className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-pink-100 space-y-4"
          >
            <h2 className="font-serif text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Package className="w-5 h-5 text-luxe-gold flex-shrink-0" />
              {editingBundle ? "Edit Bundle" : "Create Bundle Package"}
            </h2>

            {editingBundle && (
              <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-100 rounded-xl text-xs font-semibold text-blue-600">
                <Package className="w-3.5 h-3.5" />
                Editing: <span className="font-bold">{editingBundle.title}</span>
              </div>
            )}

            <BundleForm
              form={bundleForm}
              setForm={setBundleForm}
              editingBundle={editingBundle}
              onSubmit={editingBundle ? handleUpdateBundle : handleAddBundle}
              submitting={bundleSubmitting}
              onCancel={resetBundleForm}
            />
          </div>

          <BundleList
            bundles={bundleList}
            loading={bundleLoading}
            searchTerm={bundleSearchTerm}
            onSearch={handleBundleSearch}
            onEdit={handleEditBundleClick}
            onDelete={handleDeleteBundle}
          />
        </div>
      )}

      {restockProduct && (
        <RestockModal
          product={restockProduct}
          onClose={() => setRestockProduct(null)}
          onRestocked={handleRestockComplete}
        />
      )}
    </div>
  );
}
