# Firebase Firestore Database Schema Specification
## Brand: VERSATILE BY VERSHA' ("One Woman. Every Look.")

This document defines the complete Cloud Firestore database schema, collection structures, field data types, subcollections, indexes, security rules, and initial seed data mapping for Phase 2 Firebase integration.

---

## 1. Overview & Architecture

```
Firestore Root
├── users/ (Collection)
│   └── {userId} (Document)
├── products/ (Collection)
│   └── {productId} (Document)
├── bundles/ (Collection)
│   └── {bundleId} (Document)
├── reviews/ (Collection)
│   └── {reviewId} (Document)
├── orders/ (Collection)
│   └── {orderId} (Document)
├── sales/ (Collection)
│   └── {saleId} (Document)
└── carts/ (Collection)
    └── {userId} (Document)
```

---

## 2. Collections & Document Schemas

### 2.1 Users Collection (`users`)

Stores customer and administrator profile information linked directly to Firebase Auth `request.auth.uid`.

- **Collection ID**: `users`
- **Document ID**: `{userId}` (Firebase Auth UID)

| Field Name | Data Type | Required | Description | Example |
| :--- | :--- | :--- | :--- | :--- |
| `uid` | String | Yes | User unique identifier from Firebase Auth | `"usr_98234"` |
| `email` | String | Yes | User email address | `"jessica@example.com"` |
| `displayName` | String | Yes | Full name or display name | `"Jessica Miller"` |
| `role` | String | Yes | User role: `"customer"` \| `"admin"` | `"customer"` |
| `createdAt` | Timestamp | Yes | Profile creation date | `Timestamp.now()` |
| `updatedAt` | Timestamp | Yes | Last update timestamp | `Timestamp.now()` |

---

### 2.2 Products Collection (`products`)

Stores all hair wig items, HD laces, closures, and variants.

- **Collection ID**: `products`
- **Document ID**: `{productId}` (e.g. `"wig-1"`, `"lace-1"`)

| Field Name | Data Type | Required | Description | Example |
| :--- | :--- | :--- | :--- | :--- |
| `id` | String | Yes | Unique product ID | `"wig-1"` |
| `name` | String | Yes | Product title | `"Silky Straight Lace Wig"` |
| `category` | String | Yes | Category: `"Straight Wigs"` \| `"Wave Wigs"` \| `"Curly Wigs"` \| `"Colored Wigs"` \| `"HD Laces & Closures"` | `"Straight Wigs"` |
| `price` | Number | Yes | Base price in USD | `189` |
| `originalPrice` | Number | No | Original price before discount | `229` |
| `discountPercent` | Number | No | Calculated discount percentage | `18` |
| `isOnSale` | Boolean | Yes | Flag indicating active sale | `true` |
| `rating` | Number | Yes | Average rating (calculated or cached) | `4.8` |
| `reviewsCount` | Number | Yes | Total review count | `128` |
| `image` | String | Yes | Main image path / Storage URL | `"/images/wig1.jpeg"` |
| `description` | String | Yes | Detailed product description | `"Premium 100% HD Swiss Lace Wig..."` |
| `sizes` | Array of Maps | Yes | Length variants with pricing | *See nested schema below* |
| `details` | Map | Yes | Specifications map | *See nested schema below* |
| `createdAt` | Timestamp | Yes | Product creation timestamp | `Timestamp.now()` |
| `updatedAt` | Timestamp | Yes | Last modification timestamp | `Timestamp.now()` |

#### Nested Map: `sizes` (Array of Maps)
```json
[
  { "size": "12\"", "price": 129, "image": "/images/wig1.jpeg" },
  { "size": "16\"", "price": 159, "image": "/images/wig2.jpeg" },
  { "size": "20\"", "price": 189, "image": "/images/wig3.jpeg" },
  { "size": "24\"", "price": 239, "image": "/images/wig4.jpeg" }
]
```

#### Nested Map: `details` (Map)
```json
{
  "hairType": "100% Virgin Brazilian Human Hair",
  "capSize": "Medium (Adjustable 22.5\")",
  "density": "180% High Density",
  "laceType": "HD Invisible Swiss Lace"
}
```

---

### 2.3 Bundles Collection (`bundles`)

Stores bundle package deals (e.g., 3 Bundles + HD Frontal).

- **Collection ID**: `bundles`
- **Document ID**: `{bundleId}` (e.g. `"bundle-1"`)

| Field Name | Data Type | Required | Description | Example |
| :--- | :--- | :--- | :--- | :--- |
| `id` | String | Yes | Unique bundle ID | `"bundle-1"` |
| `title` | String | Yes | Package deal name | `"3 Bundles + 13x4 HD Frontal Deal"` |
| `price` | Number | Yes | Special bundle price in USD | `320` |
| `originalPrice` | Number | Yes | Value price before bundle deal | `420` |
| `savings` | String | Yes | Display savings badge string | `"$100 OFF"` |
| `image` | String | Yes | Package bundle image path | `"/images/bundle.jpeg"` |
| `includes` | Array of Strings | Yes | List of included items | `["3x Straight Bundles", "1x 13x4 HD Frontal"]` |
| `popular` | Boolean | Yes | Flag to highlight as popular | `true` |
| `createdAt` | Timestamp | Yes | Creation timestamp | `Timestamp.now()` |

---

### 2.4 Product Reviews Collection (`reviews`)

Stores verified customer product reviews and star ratings. Can be queried globally or filtered per product.

- **Collection ID**: `reviews`
- **Document ID**: `{reviewId}` (auto-generated)

| Field Name | Data Type | Required | Description | Example |
| :--- | :--- | :--- | :--- | :--- |
| `id` | String | Yes | Unique review document ID | `"rev_87123"` |
| `productId` | String | Yes | Reference product ID | `"wig-1"` |
| `userId` | String | Yes | Author user UID | `"usr_98234"` |
| `userName` | String | Yes | Author display name | `"Jessica M."` |
| `userEmail` | String | Yes | Author email address | `"jessica@example.com"` |
| `rating` | Number | Yes | Star rating from `1` to `5` | `5` |
| `reviewText` | String | Yes | Written review comment | `"The HD lace melted into my skin!"` |
| `verified` | Boolean | Yes | Verified buyer badge (true) | `true` |
| `createdAt` | Timestamp | Yes | Review timestamp | `Timestamp.now()` |

---

### 2.5 Orders Collection (`orders`)

Stores purchase transactions for order fulfillment and review permission validation.

- **Collection ID**: `orders`
- **Document ID**: `{orderId}` (e.g. `"ord-101"`)

| Field Name | Data Type | Required | Description | Example |
| :--- | :--- | :--- | :--- | :--- |
| `id` | String | Yes | Unique order ID | `"ord-101"` |
| `userId` | String | Yes | Customer Firebase Auth UID | `"usr_98234"` |
| `customerInfo` | Map | Yes | Shipping details | *See nested schema below* |
| `items` | Array of Maps | Yes | Purchased products | *See nested schema below* |
| `totalAmount` | Number | Yes | Grand total order amount in USD | `320.00` |
| `status` | String | Yes | Status: `"Pending"` \| `"Processing"` \| `"Shipped"` \| `"Delivered"` \| `"Cancelled"` | `"Delivered"` |
| `createdAt` | Timestamp | Yes | Order placement date | `Timestamp.now()` |
| `deliveredAt` | Timestamp | No | Delivery completion date | `Timestamp.now()` |

#### Nested Map: `customerInfo`
```json
{
  "name": "Jessica Miller",
  "email": "jessica@example.com",
  "address": "123 Luxe Blvd",
  "city": "Atlanta",
  "state": "GA",
  "zip": "30301"
}
```

#### Nested Map: `items` (Array of Maps)
```json
[
  {
    "productId": "wig-1",
    "name": "Silky Straight Lace Wig",
    "price": 189,
    "size": "20\"",
    "image": "/images/wig1.jpeg",
    "quantity": 1
  }
]
```

---

### 2.6 Active Flash Sales Collection (`sales`)

Stores active promo campaigns and flash sale banner settings.

- **Collection ID**: `sales`
- **Document ID**: `{saleId}` (e.g. `"summer-glow-sale"`)

| Field Name | Data Type | Required | Description | Example |
| :--- | :--- | :--- | :--- | :--- |
| `id` | String | Yes | Sale identifier | `"summer-glow-sale"` |
| `title` | String | Yes | Campaign name | `"SUMMER GLOW FLASH SALE"` |
| `active` | Boolean | Yes | Banner active status | `true` |
| `discountPercent` | Number | Yes | Sitewide promo discount % | `20` |
| `promoCode` | String | Yes | Coupon code | `"LUXE20"` |
| `bannerText` | String | Yes | Announcement banner message | `"FREE SHIPPING OVER $199..."` |
| `targetEndsAt` | Timestamp | Yes | Countdown expiration | `Timestamp.fromDate(...)` |
| `updatedAt` | Timestamp | Yes | Last update timestamp | `Timestamp.now()` |

---

### 2.7 User Carts Collection (`carts`)

Stores active shopping cart items for authenticated users across devices.

- **Collection ID**: `carts`
- **Document ID**: `{userId}` (Firebase Auth UID)

| Field Name | Data Type | Required | Description | Example |
| :--- | :--- | :--- | :--- | :--- |
| `userId` | String | Yes | Document ID matching User UID | `"usr_98234"` |
| `items` | Array of Maps | Yes | Selected cart items | `[{ "productId": "wig-1", "size": "20\"", "qty": 1 }]` |
| `updatedAt` | Timestamp | Yes | Last cart sync timestamp | `Timestamp.now()` |

---

## 3. Required Firestore Indexes

To ensure high-performance querying and sorting in Phase 2:

### 3.1 Reviews Collection Index
- `productId` (Ascending) + `createdAt` (Descending)
- `productId` (Ascending) + `userId` (Ascending)

### 3.2 Orders Collection Index
- `userId` (Ascending) + `status` (Ascending) + `createdAt` (Descending)

---

## 4. Security Rules (Phase 2 Reference)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper Functions
    function isSignedIn() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isSignedIn() && request.auth.uid == userId;
    }
    
    function isAdmin() {
      return isSignedIn() && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // Products & Bundles: Public Read, Admin Write
    match /products/{productId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    match /bundles/{bundleId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // Sales: Public Read, Admin Write
    match /sales/{saleId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // Reviews: Public Read, Authenticated User Write (if delivered purchase verified)
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if isSignedIn() && request.resource.data.userId == request.auth.uid;
      allow update, delete: if isAdmin();
    }

    // Orders: Customer Read/Create Own, Admin Read/Write All
    match /orders/{orderId} {
      allow create: if isSignedIn() && request.resource.data.userId == request.auth.uid;
      allow read: if isSignedIn() && (resource.data.userId == request.auth.uid || isAdmin());
      allow update, delete: if isAdmin();
    }

    // Users: Read/Write Own Profile, Admin Full Access
    match /users/{userId} {
      allow read, write: if isOwner(userId) || isAdmin();
    }

    // Carts: Read/Write Own Cart
    match /carts/{userId} {
      allow read, write: if isOwner(userId);
    }

  }
}
```

---

## 5. Review Permission Logic Query Flow

For Phase 2 Firebase integration, the 6 permission checks translate into the following Firestore query flow:

```javascript
// 1. Auth check
const user = auth.currentUser;
if (!user) return { canReview: false, reason: "Login to write a review." };

// 2. Check if user already submitted a review
const existingReviewSnap = await db.collection("reviews")
  .where("productId", "==", productId)
  .where("userId", "==", user.uid)
  .get();

if (!existingReviewSnap.empty) {
  return { canReview: false, reason: "You have already reviewed this product." };
}

// 3. Check for delivered purchase
const orderSnap = await db.collection("orders")
  .where("userId", "==", user.uid)
  .where("status", "==", "Delivered")
  .get();

const hasPurchasedProduct = orderSnap.docs.some(doc => {
  const items = doc.data().items || [];
  return items.some(item => item.productId === productId);
});

if (!hasPurchasedProduct) {
  return { canReview: false, reason: "You can review this product after delivery." };
}

return { canReview: true, reason: "You are verified to review this product." };
```
