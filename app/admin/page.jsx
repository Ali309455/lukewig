"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  PlusCircle,
  Sparkles,
  Package,
  Layers,
  ShoppingBag,
  Trash2,
  Edit,
  Tag,
  DollarSign,
  TrendingUp,
  CheckCircle,
  Crown,
} from "lucide-react";
import { INITIAL_PRODUCTS, INITIAL_BUNDLES, ACTIVE_SALE } from "@/lib/mockData";
import { useAuth } from "@/context/AuthContext";

export default function AdminDashboardPage() {
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState("products");

  // State collections
  const [productList, setProductList] = useState(INITIAL_PRODUCTS);
  const [bundleList, setBundleList] = useState(INITIAL_BUNDLES);
  const [currentSale, setCurrentSale] = useState(ACTIVE_SALE);

  // New Product Form State
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "Straight Wigs",
    price: "",
    originalPrice: "",
    image: "/images/wig1.jpeg",
    description: "",
    size12: "129",
    size16: "159",
    size20: "189",
    size24: "239",
  });

  // New Bundle Form State
  const [newBundle, setNewBundle] = useState({
    title: "",
    price: "",
    originalPrice: "",
    savings: "$50 OFF",
    image: "/images/bundle.jpeg",
    includesStr: "3x Straight Bundles, 1x HD Frontal",
  });

  // Sale Launcher Form State
  const [saleForm, setSaleForm] = useState({
    bannerText: currentSale.bannerText,
    discountPercent: currentSale.discountPercent,
    active: currentSale.active,
  });

  const [notification, setNotification] = useState(null);

  const notify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Add Product Handler
  const handleAddProduct = (e) => {
    e.preventDefault();
    const productObj = {
      id: `wig-${Date.now()}`,
      name: newProduct.name,
      category: newProduct.category,
      price: Number(newProduct.price),
      originalPrice: Number(newProduct.originalPrice) || Number(newProduct.price) + 40,
      discountPercent: 15,
      isOnSale: true,
      rating: 5.0,
      reviewsCount: 1,
      image: newProduct.image,
      description: newProduct.description || "Luxury 100% HD Swiss Lace human hair wig by VERSATILE.",
      sizes: [
        { size: '12"', price: Number(newProduct.size12), image: newProduct.image },
        { size: '16"', price: Number(newProduct.size16), image: newProduct.image },
        { size: '20"', price: Number(newProduct.size20), image: newProduct.image },
        { size: '24"', price: Number(newProduct.size24), image: newProduct.image },
      ],
    };

    setProductList([productObj, ...productList]);
    notify(`Product "${newProduct.name}" added to store catalog!`);
    setNewProduct({
      name: "",
      category: "Straight Wigs",
      price: "",
      originalPrice: "",
      image: "/images/wig1.jpeg",
      description: "",
      size12: "129",
      size16: "159",
      size20: "189",
      size24: "239",
    });
  };

  // Delete Product Handler
  const handleDeleteProduct = (id) => {
    setProductList(productList.filter((p) => p.id !== id));
    notify("Product removed from catalog.");
  };

  // Add Bundle Handler
  const handleAddBundle = (e) => {
    e.preventDefault();
    const bundleObj = {
      id: `bundle-${Date.now()}`,
      title: newBundle.title,
      price: Number(newBundle.price),
      originalPrice: Number(newBundle.originalPrice),
      savings: newBundle.savings,
      image: newBundle.image,
      includes: newBundle.includesStr.split(",").map((s) => s.trim()),
      popular: true,
    };

    setBundleList([bundleObj, ...bundleList]);
    notify(`Bundle "${newBundle.title}" created successfully!`);
    setNewBundle({
      title: "",
      price: "",
      originalPrice: "",
      savings: "$50 OFF",
      image: "/images/bundle.jpeg",
      includesStr: "3x Straight Bundles, 1x HD Frontal",
    });
  };

  // Update Sale Handler
  const handleUpdateSale = (e) => {
    e.preventDefault();
    setCurrentSale({
      ...currentSale,
      bannerText: saleForm.bannerText,
      discountPercent: saleForm.discountPercent,
      active: saleForm.active,
    });
    notify("Flash Sale campaign launched sitewide!");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-sans">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-24 right-6 z-50 bg-emerald-700 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-bold animate-bounce">
          <CheckCircle className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Header Bar matching Home Page Aesthetics */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-pink-100 pb-6 gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="relative w-36 h-10">
              <Image
                src="/images/logo.svg"
                alt="VERSATILE BY VERSHA'"
                width={140}
                height={40}
                className="object-contain"
              />
            </div>
            <span className="px-3 py-1 rounded-full bg-luxe-rose/10 text-luxe-rose text-xs font-bold border border-luxe-rose/20 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Management Dashboard</span>
            </span>
          </div>
          <h1 className="font-serif text-3xl font-extrabold text-gray-900 tracking-tight">
            VERSATILE BY VERSHA' <span className="text-luxe-gold font-normal text-xl">| Store Management</span>
          </h1>
          <p className="text-xs text-gray-500 font-medium">
            Logged in as: <strong className="text-gray-900 font-bold">{user?.email || "Admin Operator"}</strong>
          </p>
        </div>

        <Link
          href="/shop"
          className="px-5 py-2.5 rounded-full border border-pink-200 text-xs font-bold text-gray-700 hover:bg-luxe-rose hover:text-white hover:border-luxe-rose transition-all shadow-xs"
        >
          View Store Front →
        </Link>
      </div>

      {/* Analytics Metric Cards with Serif Headings */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-pink-100 space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-bold uppercase tracking-wider font-sans">Total Sales</span>
            <DollarSign className="w-5 h-5 text-emerald-500" />
          </div>
          <p className="font-serif text-3xl sm:text-4xl font-extrabold text-gray-900">$24,850</p>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +18.4% this month
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-pink-100 space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-bold uppercase tracking-wider font-sans">Products</span>
            <Package className="w-5 h-5 text-luxe-rose" />
          </div>
          <p className="font-serif text-3xl sm:text-4xl font-extrabold text-gray-900">{productList.length}</p>
          <span className="text-[11px] text-gray-500 font-medium">Catalog Items</span>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-pink-100 space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-bold uppercase tracking-wider font-sans">Active Sale</span>
            <Tag className="w-5 h-5 text-luxe-gold" />
          </div>
          <p className="font-serif text-3xl sm:text-4xl font-extrabold text-luxe-rose">
            {currentSale.active ? `${currentSale.discountPercent}% OFF` : "OFF"}
          </p>
          <span className="text-[11px] text-gray-500 font-medium">Sitewide Flash Promo</span>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-pink-100 space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-bold uppercase tracking-wider font-sans">Bundle Deals</span>
            <Layers className="w-5 h-5 text-indigo-500" />
          </div>
          <p className="font-serif text-3xl sm:text-4xl font-extrabold text-gray-900">{bundleList.length}</p>
          <span className="text-[11px] text-gray-500 font-medium">Active Package Offers</span>
        </div>
      </div>

      {/* Admin Navigation Tabs - Styled in Serif Typography matching Home Tabs */}
      <div className="flex space-x-4 border-b border-pink-100">
        <button
          type="button"
          onClick={() => setActiveTab("products")}
          className={`pb-3 px-5 font-serif text-xl font-bold border-b-2 transition-all ${
            activeTab === "products"
              ? "border-luxe-rose text-luxe-rose text-2xl"
              : "border-transparent text-gray-400 hover:text-gray-700"
          }`}
        >
          Product Manager
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("sales")}
          className={`pb-3 px-5 font-serif text-xl font-bold border-b-2 transition-all ${
            activeTab === "sales"
              ? "border-luxe-rose text-luxe-rose text-2xl"
              : "border-transparent text-gray-400 hover:text-gray-700"
          }`}
        >
          Launch Sales
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("bundles")}
          className={`pb-3 px-5 font-serif text-xl font-bold border-b-2 transition-all ${
            activeTab === "bundles"
              ? "border-luxe-rose text-luxe-rose text-2xl"
              : "border-transparent text-gray-400 hover:text-gray-700"
          }`}
        >
          Create Bundles
        </button>
      </div>

      {/* TAB 1: PRODUCT MANAGER */}
      {activeTab === "products" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Add Product Form */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-pink-100 space-y-4">
            <h2 className="font-serif text-2xl font-bold text-gray-900 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-luxe-rose" />
              <span>Add New Product</span>
            </h2>

            <form onSubmit={handleAddProduct} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1 uppercase tracking-wider text-[11px]">Product Title</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Silky Straight HD Lace Wig"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-luxe-rose text-sm text-gray-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1 uppercase tracking-wider text-[11px]">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full px-3 py-2.5 border border-pink-200 rounded-xl bg-pink-50/30 text-xs font-semibold text-gray-800"
                  >
                    <option>Straight Wigs</option>
                    <option>Wave Wigs</option>
                    <option>Curly Wigs</option>
                    <option>Colored Wigs</option>
                    <option>HD Laces & Closures</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1 uppercase tracking-wider text-[11px]">Base Price ($)</label>
                  <input
                    required
                    type="number"
                    placeholder="189"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-pink-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-luxe-rose"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1 uppercase tracking-wider text-[11px]">Select Image Asset</label>
                <select
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  className="w-full px-3 py-2.5 border border-pink-200 rounded-xl bg-pink-50/30 text-xs font-semibold text-gray-800"
                >
                  <option value="/images/wig1.jpeg">Wig 1 (Straight Silky)</option>
                  <option value="/images/wig2.jpeg">Wig 2 (Body Wave)</option>
                  <option value="/images/wig3.jpeg">Wig 3 (Deep Curly)</option>
                  <option value="/images/wig4.jpeg">Wig 4 (Highlight Bob)</option>
                  <option value="/images/hero.png">Hero Luxury Model</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700 block uppercase tracking-wider text-[11px]">Length Variant Pricing ($)</label>
                <div className="grid grid-cols-4 gap-2">
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block text-center">12"</span>
                    <input
                      type="number"
                      value={newProduct.size12}
                      onChange={(e) => setNewProduct({ ...newProduct, size12: e.target.value })}
                      className="w-full px-2 py-1.5 border border-pink-200 rounded-lg text-center font-semibold text-xs"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block text-center">16"</span>
                    <input
                      type="number"
                      value={newProduct.size16}
                      onChange={(e) => setNewProduct({ ...newProduct, size16: e.target.value })}
                      className="w-full px-2 py-1.5 border border-pink-200 rounded-lg text-center font-semibold text-xs"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block text-center">20"</span>
                    <input
                      type="number"
                      value={newProduct.size20}
                      onChange={(e) => setNewProduct({ ...newProduct, size20: e.target.value })}
                      className="w-full px-2 py-1.5 border border-pink-200 rounded-lg text-center font-semibold text-xs"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block text-center">24"</span>
                    <input
                      type="number"
                      value={newProduct.size24}
                      onChange={(e) => setNewProduct({ ...newProduct, size24: e.target.value })}
                      className="w-full px-2 py-1.5 border border-pink-200 rounded-lg text-center font-semibold text-xs"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-luxe-rose hover:bg-luxe-rose-dark text-white font-semibold text-xs shadow-md transition-all mt-2"
              >
                Save & Publish Product
              </button>
            </form>
          </div>

          {/* Product Catalog List */}
          <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-pink-100 space-y-4">
            <h2 className="font-serif text-2xl font-bold text-gray-900">Current Catalog ({productList.length})</h2>

            <div className="divide-y divide-gray-100 max-h-[520px] overflow-y-auto pr-2">
              {productList.map((p) => (
                <div key={p.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-pink-50 flex-shrink-0 border border-pink-100">
                      <Image src={p.image} alt={p.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h3 className="font-serif text-base font-bold text-gray-900">{p.name}</h3>
                      <p className="text-[11px] text-gray-500 font-medium">{p.category} — <strong className="text-luxe-rose font-bold">${p.price}</strong></p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleDeleteProduct(p.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: LAUNCH SALES */}
      {activeTab === "sales" && (
        <div className="max-w-2xl bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-pink-100 space-y-6">
          <h2 className="font-serif text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-luxe-rose" />
            <span>Launch Sitewide Flash Sale</span>
          </h2>

          <form onSubmit={handleUpdateSale} className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-4 bg-pink-50/60 rounded-2xl border border-pink-100">
              <div>
                <p className="font-bold text-gray-900 text-sm">Campaign Active Status</p>
                <p className="text-[11px] text-gray-500">Toggle sale banner display across header</p>
              </div>
              <input
                type="checkbox"
                checked={saleForm.active}
                onChange={(e) => setSaleForm({ ...saleForm, active: e.target.checked })}
                className="w-5 h-5 accent-luxe-rose cursor-pointer"
              />
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1 uppercase tracking-wider text-[11px]">Banner Announcement Text</label>
              <input
                type="text"
                value={saleForm.bannerText}
                onChange={(e) => setSaleForm({ ...saleForm, bannerText: e.target.value })}
                className="w-full px-4 py-3 border border-pink-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-luxe-rose text-gray-800"
              />
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1 uppercase tracking-wider text-[11px]">Sitewide Discount Percentage (%)</label>
              <input
                type="number"
                value={saleForm.discountPercent}
                onChange={(e) => setSaleForm({ ...saleForm, discountPercent: Number(e.target.value) })}
                className="w-full px-4 py-3 border border-pink-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-luxe-rose text-gray-800"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-luxe-rose hover:bg-luxe-rose-dark text-white font-semibold text-sm shadow-md transition-all"
            >
              Update & Launch Flash Sale
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: CREATE BUNDLES */}
      {activeTab === "bundles" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-pink-100 space-y-4">
            <h2 className="font-serif text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-luxe-gold" />
              <span>Create Bundle Package</span>
            </h2>

            <form onSubmit={handleAddBundle} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1 uppercase tracking-wider text-[11px]">Bundle Title</label>
                <input
                  required
                  type="text"
                  placeholder="3 Bundles + HD Frontal Deal"
                  value={newBundle.title}
                  onChange={(e) => setNewBundle({ ...newBundle, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-pink-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-luxe-rose"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1 uppercase tracking-wider text-[11px]">Special Price ($)</label>
                  <input
                    required
                    type="number"
                    placeholder="320"
                    value={newBundle.price}
                    onChange={(e) => setNewBundle({ ...newBundle, price: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-pink-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-luxe-rose"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1 uppercase tracking-wider text-[11px]">Original Price ($)</label>
                  <input
                    required
                    type="number"
                    placeholder="420"
                    value={newBundle.originalPrice}
                    onChange={(e) => setNewBundle({ ...newBundle, originalPrice: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-pink-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-luxe-rose"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1 uppercase tracking-wider text-[11px]">Included Items (Comma Separated)</label>
                <textarea
                  rows={2}
                  value={newBundle.includesStr}
                  onChange={(e) => setNewBundle({ ...newBundle, includesStr: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-pink-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-luxe-rose"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-luxe-rose hover:bg-luxe-rose-dark text-white font-semibold text-xs shadow-md transition-all"
              >
                Create Bundle Deal
              </button>
            </form>
          </div>

          {/* Active Bundles List */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-pink-100 space-y-4">
            <h2 className="font-serif text-2xl font-bold text-gray-900">Active Bundles ({bundleList.length})</h2>

            <div className="space-y-4">
              {bundleList.map((b) => (
                <div key={b.id} className="p-4 bg-pink-50/50 rounded-2xl border border-pink-100 flex justify-between items-center">
                  <div>
                    <h3 className="font-serif text-base font-bold text-gray-900">{b.title}</h3>
                    <p className="text-[11px] text-luxe-rose font-semibold">${b.price} (Save {b.savings})</p>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">
                    Active
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
