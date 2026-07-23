# Luxe Hair - Migration Context & Architectural Overview

## 1. Existing Legacy Codebase Analysis
The original project is a static HTML/CSS/JS e-commerce website for a high-end human hair wig brand called **Luxe Hair**.

### Key Styling & Design Tokens
- **Typography**: 
  - Brand Heading: `Cormorant Garamond` (serif, elegant, luxury feel)
  - Body / Subheadings: `Poppins` (sans-serif, clean)
- **Color Palette**:
  - Primary Background: `#fff8f8` / `#fff8f9`
  - Hero Gradient: `linear-gradient(135deg, #fff8f9, #ffeef3)`
  - Primary Accent (Rose / Pink): `#ef5d8f` (hover: `#d94979`)
  - Secondary Accent (Gold / Luxury): `#c79b3d`
  - Announcement Bar: `#f6c9d3`
- **Existing Assets**:
  - Images in `images/`: `hero.png`, `wig1.jpeg` .. `wig4.jpeg`, `bundle.jpeg`, `client1.jpg` .. `client3.jpg`

---

## 2. Target Architecture (Next.js + Firebase)

```
luxe-hair-next/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── (shop)/
│   │   ├── shop/page.tsx
│   │   ├── product/[id]/page.tsx
│   │   ├── cart/page.tsx
│   │   └── checkout/page.tsx
│   ├── (admin)/
│   │   └── admin/
│   │       ├── page.tsx          # Dashboard & Analytics
│   │       ├── products/page.tsx # Manage & Add Products
│   │       ├── sales/page.tsx    # Flash Sales & Launch Sales
│   │       └── bundles/page.tsx  # Bundle Deals Creator
│   ├── layout.tsx
│   ├── page.tsx                  # Home Page
│   └── globals.css
├── components/
│   ├── common/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── AnnouncementBar.tsx
│   │   └── LoadingShimmer.tsx
│   ├── shop/
│   │   ├── ProductCard.tsx
│   │   ├── BundleCard.tsx
│   │   ├── ProductFilter.tsx
│   │   └── ProductDetails.tsx
│   ├── cart/
│   │   └── CartItem.tsx
│   └── admin/
│       ├── ProductForm.tsx
│       ├── SaleForm.tsx
│       └── BundleForm.tsx
├── context/
│   ├── AuthContext.tsx
│   └── CartContext.tsx
├── lib/
│   ├── firebase.ts               # Firebase App & Firestore Config
│   ├── firebaseUtils.ts          # Auth & Data helpers
│   └── seedData.ts               # Initial demo products & bundles
├── types/
│   └── index.ts                  # TypeScript Interfaces (Product, CartItem, Sale, User)
```

---

## 3. Core Features & Functional Requirements

1. **Authentication (Firebase Auth)**
   - Sign up with Email/Password + Name
   - Login with Email/Password
   - Auth state listener & User context
   - Admin role distinction (`admin` vs `customer`)

2. **Database & Data Structure (Firebase Firestore)**
   - `products`: id, name, category, price, discountPrice, isOnSale, images[], sizes[], rating, reviewsCount, description
   - `bundles`: id, title, price, originalPrice, description, includes[], image
   - `sales`: id, title, discountPercent, bannerText, active, startDate, endDate
   - `carts`: userId -> items[{ productId, name, price, size, image, qty }]
   - `orders`: id, userId, customerInfo, items[], totalAmount, status, createdAt

3. **Cart & Sales Logic**
   - Active sales dynamically apply discounts to product prices
   - Dynamic Cart calculation (subtotal, shipping threshold over $199, grand total)
   - Real-time updates & persistent storage (Firestore for logged-in users, LocalStorage fallback for guests)

4. **Loading States & Shimmers**
   - Skeleton shimmer cards while fetching products
   - Skeleton loading for product details and cart items
   - Spinner / shimmer UI during auth state resolution

5. **Admin Panel**
   - Product Management: Add, edit, delete products & variants
   - Sales Launcher: Activate/deactivate flash sales with countdown timer
   - Bundle Creator: Combine multiple items into discounted bundle packages

---

## 4. Multi-Phase Execution Plan

To optimize API token usage and allow incremental validation, implementation is divided into **4 distinct phases**:

- **Phase 1: Next.js Foundation & Design System Setup**
  - Initialize Next.js app structure, Tailwind / custom CSS configuration matching existing aesthetics.
  - Setup core Layout components (Navbar, Footer, AnnouncementBar, Loading Skeleton/Shimmers).
  - Seed baseline static dataset and mock UI routes (`/`, `/shop`, `/product/[id]`).

- **Phase 2: Firebase Integration & Authentication**
  - Configure `firebase.ts` client & admin initialization.
  - Build Auth Provider (`AuthContext`), Login page, Signup page, and protected route wrappers.
  - Connect User Profile state.

- **Phase 3: Shopping Cart & Sales System**
  - Build persistent `CartContext` (Firestore sync for logged-in users + localStorage for guests).
  - Build `/cart` page and `/checkout` flow.
  - Implement active sales banner and dynamic product discount pricing with countdown timer.

- **Phase 4: Admin Panel & CMS Features**
  - Build `/admin` dashboard layout & security check (Admin only).
  - Product CRUD forms (Add/Edit/Delete products with variants & images).
  - Sales Launching tool (Create active promo campaigns).
  - Bundle Deal Creator tool.
