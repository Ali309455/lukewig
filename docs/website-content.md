# Website Content Documentation

## Brand Identity

**Brand Name:** VERSATILE BY VERSHA'
**Tagline:** "One Woman. Every Look."
**Original Brand (legacy references):** Luxe Hair

---

## 1. Homepage

Source: `app/page.jsx`

### Hero Section

**Heading lines:**
- "Crown Your"
- "Confidence"

**Background image alt:** "Luxe Hair - Premium Wigs Collection"

**Primary CTA Button:**
- "Shop Collection" (links to `/shop`)

**Secondary CTA Button:**
- "Browse Bundles" (links to `/shop?category=bundles`)

### Features Banner

Source: `app/page.jsx` (lines 118-168)

| # | Heading | Description |
|---|---------|-------------|
| 1 | 100% HD Swiss Lace | Melts seamlessly into all skin tones naturally |
| 2 | Unprocessed Virgin Hair | Bleach & dyeable up to #613 light blondes |
| 3 | Express Delivery | Ships within 2-4 business days worldwide |
| 4 | 30-Day Guarantee | Risk-free exchanges & full satisfaction |

### Featured Selection / Trending Wigs

**Pre-heading:** "FEATURED SELECTION"

**Heading:** "Trending Wigs Collection"

**Subheading:** "Hand-crafted HD lace frontal and glueless wigs designed for instant luxury."

**CTA:** "Explore All Wigs"

### Best Selling Bundle Deals

**Pre-heading:** "EXCLUSIVE SAVINGS"

**Heading:** "Best Selling Bundle Deals"

**Subheading:** "Save up to $100 when you purchase complete virgin bundle packages."

### Customer Reviews Section

**Pre-heading:** "REAL REVIEWS"

**Heading:** "Loved By Thousands of Queens"

### Reviews (from mock data)

Source: `lib/mockData.js` (lines 258-286)

| # | Name | Role | Rating | Comment |
|---|------|------|--------|---------|
| 1 | Jessica M. | Verified Buyer | 5 | "The lace literally melted into my skin! Everyone thought it was my real hair growing from my scalp." |
| 2 | Sophia K. | Verified Buyer | 5 | "Super soft human hair, zero shedding even after washing 3 times. Definitely buying another length!" |
| 3 | Amanda L. | Verified Buyer | 5 | "Delivery was lightning fast! The bundle package deal saved me over $100 compared to other hair brands." |

---

## 2. About Page

Source: `app/about/page.jsx`

### Header Hero

**Pre-heading:** "VERSATILE BY VERSHA'"

**Heading:** "Crafting Confidence, One Hair Strand At A Time"
**Highlight:** "One Hair Strand At A Time" (gold italic)

**Description:** "Founded with a mission to make every queen feel bold, glamorous, and naturally confident. We specialize in 100% unprocessed virgin human hair wigs, HD Swiss lace frontals, and closures designed for flawless, scalp-like melts."

**CTA:** "Explore Collection"

**Image alt:** "Luxe Hair Craftsmanship"

### Brand Values — "Our Core Pillars"

**Pre-heading:** "OUR CORE PILLARS"

**Heading:** "Why Queens Choose VERSATILE BY VERSHA'"

| # | Title | Description |
|---|-------|-------------|
| 1 | 100% Single-Donor Virgin Hair | Every bundle and wig is crafted from raw, cuticle-aligned hair that can be bleached, dyed up to #613 blonde, and heat-styled repeatedly. |
| 2 | Ultra-Thin Invisible HD Swiss Lace | Our real HD lace is feather-light and transparent, blending seamlessly with every skin tone without harsh lines or thick edges. |
| 3 | Ethically Sourced & Quality Tested | We adhere to strict ethical sourcing standards. Each unit undergoes rigorous 5-point quality inspection before leaving our atelier. |

### Customer Community Showcase

**Pre-heading:** "COMMUNITY"

**Heading:** "The VERSATILE Sisterhood"

**Client Showcase:**
| Name | Description |
|------|-------------|
| Jessica M. | Wearing 24" Silky Straight HD Frontal Wig |
| Sophia K. | Wearing 20" Body Wave Glueless Wig |
| Amanda L. | Wearing 13x4 HD Swiss Lace Frontal Deal |

---

## 3. Products

Source: `lib/mockData.js`

### Product: Silky Straight Lace Wig

| Field | Value |
|-------|-------|
| **ID** | wig-1 |
| **Category** | Straight Wigs |
| **Price** | $189 |
| **Original Price** | $229 |
| **Discount** | 18% OFF |
| **On Sale** | Yes |
| **Rating** | 5.0 |
| **Reviews Count** | 128 |
| **Image** | /images/wig1.png |
| **Description** | Premium 100% HD Lace Human Hair Wig. Ultra-soft, silky texture with pre-plucked natural hairline and invisible lace. |

**Sizes/Variants:**

| Size | Price | Image |
|------|-------|-------|
| 12" | $129 | /images/wig1.png |
| 16" | $159 | /images/wig2.png |
| 20" | $189 | /images/wig3.png |
| 24" | $239 | /images/wig4.jpeg |

**Details/Specifications:**
- Hair Type: 100% Virgin Brazilian Human Hair
- Cap Size: Medium (Adjustable 22.5")
- Density: 180% High Density
- Lace Type: HD Invisible Swiss Lace

---

### Product: Body Wave Glueless Wig

| Field | Value |
|-------|-------|
| **ID** | wig-2 |
| **Category** | Wave Wigs |
| **Price** | $210 |
| **Original Price** | $260 |
| **Discount** | 19% OFF |
| **On Sale** | Yes |
| **Rating** | 4.9 |
| **Reviews Count** | 94 |
| **Image** | /images/wig2.png |
| **Description** | Effortless body wave curls with pre-cut HD lace for 30-second wear. No glue, no gel needed. |

**Sizes/Variants:**

| Size | Price | Image |
|------|-------|-------|
| 14" | $170 | /images/wig2.png |
| 18" | $210 | /images/wig3.png |
| 22" | $250 | /images/wig4.jpeg |

**Details/Specifications:**
- Hair Type: 100% Peruvian Body Wave
- Cap Size: Medium Adjustable
- Density: 200% Full Density
- Lace Type: Transparent 13x4 Lace Frontal

---

### Product: Deep Wave Curly Frontal Wig

| Field | Value |
|-------|-------|
| **ID** | wig-3 |
| **Category** | Curly Wigs |
| **Price** | $245 |
| **Original Price** | $295 |
| **Discount** | 17% OFF |
| **On Sale** | No |
| **Rating** | 4.8 |
| **Reviews Count** | 156 |
| **Image** | /images/wig3.jpeg |
| **Description** | Rich deep wave bounce curls created from unprocessed virgin hair. Can be bleached and dyed up to #613. |

**Sizes/Variants:**

| Size | Price | Image |
|------|-------|-------|
| 16" | $205 | /images/wig3.png |
| 20" | $245 | /images/wig4.jpeg |
| 26" | $299 | /images/wig1.png |

**Details/Specifications:**
- Hair Type: 100% Malaysian Deep Curly
- Cap Size: Standard Breathable Cap
- Density: 180% Natural Density
- Lace Type: 5x5 HD Closure

---

### Product: Honey Blonde Highlight Bob Wig

| Field | Value |
|-------|-------|
| **ID** | wig-4 |
| **Category** | Colored Wigs |
| **Price** | $199 |
| **Original Price** | $249 |
| **Discount** | 20% OFF |
| **On Sale** | Yes |
| **Rating** | 5.0 |
| **Reviews Count** | 88 |
| **Image** | /images/wig4.jpeg |
| **Description** | Stunning piano highlight honey blonde wig. Short chic bob cut pre-styled to perfection. |

**Sizes/Variants:**

| Size | Price | Image |
|------|-------|-------|
| 10" | $159 | /images/wig4.jpeg |
| 12" | $179 | /images/wig1.png |
| 14" | $199 | /images/wig2.png |

**Details/Specifications:**
- Hair Type: 100% Virgin Hair Colored #4/27
- Cap Size: Medium
- Density: 150% Silky
- Lace Type: 13x4 HD Frontal

---

### Product: 13x4 Ultra Invisible HD Swiss Lace Frontal

| Field | Value |
|-------|-------|
| **ID** | lace-1 |
| **Category** | HD Laces & Closures |
| **Price** | $110 |
| **Original Price** | $140 |
| **Discount** | 21% OFF |
| **On Sale** | Yes |
| **Rating** | 5.0 |
| **Reviews Count** | 210 |
| **Image** | /images/WhatsApp Image 2026-07-17 at 10.39.57 PM.jpeg |
| **Description** | Real HD Swiss Lace Frontal that melts effortlessly into any skin tone without white cast or harsh borders. |

**Sizes/Variants:**

| Size | Price | Image |
|------|-------|-------|
| 14" | $90 | /images/WhatsApp Image 2026-07-17 at 10.39.57 PM.jpeg |
| 18" | $110 | /images/WhatsApp Image 2026-07-17 at 10.39.57 PM (1).jpeg |
| 22" | $130 | /images/WhatsApp Image 2026-07-17 at 10.39.57 PM (3).jpeg |

**Details/Specifications:**
- Hair Type: 100% Raw Single Donor Hair
- Cap Size: 13x4 Ear-to-Ear Coverage
- Density: Natural 130%
- Lace Type: Ultra-Thin Skin HD Swiss Lace

---

### Product: 5x5 HD Lace Closure (Pre-Plucked Hairline)

| Field | Value |
|-------|-------|
| **ID** | lace-2 |
| **Category** | HD Laces & Closures |
| **Price** | $85 |
| **Original Price** | $115 |
| **Discount** | 26% OFF |
| **On Sale** | Yes |
| **Rating** | 4.9 |
| **Reviews Count** | 167 |
| **Image** | /images/WhatsApp Image 2026-07-17 at 10.39.57 PM (1).jpeg |
| **Description** | Compact 5x5 HD Lace Closure with baby hairs pre-customized for protective installs and quick styling. |

**Sizes/Variants:**

| Size | Price | Image |
|------|-------|-------|
| 12" | $75 | /images/WhatsApp Image 2026-07-17 at 10.39.57 PM (1).jpeg |
| 16" | $85 | /images/WhatsApp Image 2026-07-17 at 10.39.57 PM (3).jpeg |
| 20" | $95 | /images/WhatsApp Image 2026-07-17 at 10.39.57 PM.jpeg |

**Details/Specifications:**
- Hair Type: 100% Unprocessed Virgin Hair
- Cap Size: 5x5 Deep Parting
- Density: 130% Full
- Lace Type: Skin-like HD Lace

---

### Product: 13x6 Full Ear-to-Ear HD Frontal

| Field | Value |
|-------|-------|
| **ID** | lace-3 |
| **Category** | HD Laces & Closures |
| **Price** | $135 |
| **Original Price** | $165 |
| **Discount** | 18% OFF |
| **On Sale** | No |
| **Rating** | 5.0 |
| **Reviews Count** | 89 |
| **Image** | /images/WhatsApp Image 2026-07-17 at 10.39.57 PM (3).jpeg |
| **Description** | Deep 6-inch parting space ear-to-ear HD frontal allowing versatile ponytails, half-up styles, and deep side parts. |

**Sizes/Variants:**

| Size | Price | Image |
|------|-------|-------|
| 16" | $120 | /images/WhatsApp Image 2026-07-17 at 10.39.57 PM (3).jpeg |
| 20" | $135 | /images/WhatsApp Image 2026-07-17 at 10.39.57 PM.jpeg |
| 24" | $155 | /images/WhatsApp Image 2026-07-17 at 10.39.57 PM (1).jpeg |

**Details/Specifications:**
- Hair Type: 100% Virgin Cuticle Aligned
- Cap Size: 13x6 Extra Deep Part
- Density: 140%
- Lace Type: Invisible Swiss HD Lace

---

## 4. Bundles (Collections)

Source: `lib/mockData.js` (lines 216-245)

### Bundle: 3 Bundles + 13x4 HD Frontal Deal

| Field | Value |
|-------|-------|
| **ID** | bundle-1 |
| **Title** | 3 Bundles + 13x4 HD Frontal Deal |
| **Price** | $320 |
| **Original Price** | $420 |
| **Savings** | $100 OFF |
| **Popular** | Yes |
| **Image** | /images/bundle.jpeg |
| **Includes** | 3x Straight Virgin Bundles (18", 20", 22"), 1x 13x4 HD Swiss Lace Frontal, Free Satin Silk Storage Bag |

### Bundle: Glueless Beginner Wig Kit

| Field | Value |
|-------|-------|
| **ID** | bundle-2 |
| **Title** | Glueless Beginner Wig Kit |
| **Price** | $260 |
| **Original Price** | $340 |
| **Savings** | $80 OFF |
| **Popular** | No |
| **Image** | /images/wig2.png |
| **Includes** | 1x Ready-to-Wear Glueless Wig (20"), 1x Wig Grip Band + Melt Band, 1x Hair Edge Control Gel |

---

## 5. Active Sale / Promotions

Source: `lib/mockData.js` (lines 247-256)

**Sale ID:** summer-glow-sale
**Title:** "SUMMER GLOW FLASH SALE ✨ UP TO 30% OFF SITEWIDE"
**Active:** Yes
**Discount Percent:** 20%
**Promo Code:** LUXE20
**Banner Text:** "FREE SHIPPING ON ORDERS OVER $199 ✨ USE CODE LUXE20 FOR EXTRA 20% OFF"

---

## 6. Shop Page

Source: `app/shop/page.jsx`

### Header Banner

**Pre-heading:** "VERSATILE BY VERSHA' — ONE WOMAN. EVERY LOOK."

**Heading:** "Shop Luxury Wigs & Bundles"

**Subheading:** "Find your perfect length, density, and HD lace texture designed for flawless confidence."

### Filter Sidebar

**Filter Section Heading:** "Filters"

**Reset button:** "Reset All"

**Category options:** "All", "Straight Wigs", "Wave Wigs", "Curly Wigs", "Colored Wigs", "HD Laces & Closures"

**Price Range label:** "Max Price"

**Length Filter label:** "Hair Length"

**Length options:** 10", 12", 14", 16", 18", 20", 22", 24", 26"

**Simulate Loading Button:** "Simulate Loading Shimmer"

### Sort & Results

**Showing text:** "Showing **{count}** Products"

**Sort options:**
- "Sort By:"
- "Featured First"
- "Price: Low to High"
- "Price: High to Low"
- "Highest Rated"

### Empty State

"No wigs found matching your filter criteria."

**Button:** "Reset Filters"

### HD Lace Spotlight

**Badge:** "REAL INVISIBLE MELT LACE"

**Heading:** "HD Swiss Frontals & Closures Collection"

**Description:** "Feather-light 13x4, 13x6, and 5x5 HD Swiss Laces that disappear effortlessly on all skin tones with zero white cast."

**Button:** "View All HD Laces ({count})"

### Bundles Section in Shop

**Heading:** "Package Bundle Deals"

---

## 7. Product Detail Page

Source: `app/product/[id]/page.jsx`

### Breadcrumb
- "Back to Shop Collection"

### Product Info

**Discount badge:** "SAVE {percent}%"

**Category label:** (product category)

**Reviews text:** "{rating} ({count} Customer Reviews)"

**Price display:** ${price} (with original price line-through)

**Stock statuses:**
- "Only {count} left" (low stock)
- "In Stock & Ready to Ship" (in stock)
- "Out of Stock" (no stock)

**Size selector heading:** "Select Hair Length"
**Active label:** "Active: {size}"
**Sold out label:** "(Sold Out)"

### Quantity Controls
- `-` / `+` buttons
- Quantity number display

### Add to Cart Button
- "Add To Shopping Bag" (in stock)
- "Out of Stock" (out of stock)

### Value Props Grid
- "Free Delivery >$199"
- "100% HD Swiss Lace"
- "Easy 30-Day Return"

### Product Details Tabs
- "Description & Quality"
- "Hair Specifications"

**Specification fields:**
- "Hair Material"
- "Cap Size"
- "Density"
- "Lace Type"

### Related Products
- "You May Also Love"

---

## 8. Contact Page

Source: `app/contact/page.jsx`

### Header

**Pre-heading:** "WE'RE HERE TO HELP"

**Heading:** "Contact Luxe Concierge"

**Description:** "Have a question about lace cap sizing, custom order requests, or shipping status? Reach out to our dedicated support team."

### Contact Info Cards

| Field | Value |
|-------|-------|
| **Email Concierge** | support@luxehaircollection.com · "24/7 Response Time" |
| **VIP Phone Line** | +1 (800) 589-LUXE (5893) · "Mon - Sat: 9 AM - 7 PM EST" |
| **Flagship Atelier** | 540 Fifth Avenue, Suite 1200, New York, NY 10036 |

### Contact Form

**Heading:** "Send Us A Message"

**Form Fields:**

| Label | Placeholder | Required |
|-------|-------------|----------|
| Your Full Name | Jessica Miller | Yes |
| Email Address | jessica@example.com | Yes |
| Phone Number (Optional) | +1 (555) 000-0000 | No |
| Order Number (If applicable) | LX-98214 | No |
| Inquiry Subject | (dropdown) | — |
| Your Message | How can our wig specialists assist you today? | Yes |

**Inquiry Subject Options:**
- General Inquiry
- Lace Cap Sizing Help
- Order Status & Tracking
- Custom Wig Request
- Wholesale & Salon Partnerships

**Submit Button:** "Submit Inquiry"

**Success State:**
- "Message Received!"
- "Thank you for contacting Luxe Hair Concierge. One of our wig specialists will respond within 2-4 business hours."
- Button: "Send Another Message"

---

## 9. Cart Page

Source: `app/cart/page.jsx`

### Empty Cart
- "Your Cart is Empty"
- "Looks like you haven't added any luxury wigs to your bag yet. Explore our latest collection!"
- Button: "Start Shopping"

### Cart Header
- "Shopping Cart"
- Button: "Clear Cart"

### Free Shipping Progress
- "Add **${amount}** more for FREE Shipping!"
- "🎉 Congratulations! You unlocked FREE Express Shipping!" (when threshold met)
- "{percent}%"

### Cart Table Columns
- "Product"
- "Length"
- "Price"
- "Qty"
- "Subtotal"

### Item Labels
- "ID: #{productId}"

### Continue Shopping Link
- "← Continue Shopping"

### Order Summary

**Heading:** "Order Summary"

**Promo Code:**
- Label: "Promo / Coupon Code"
- Placeholder: "Try LUXE20"
- Button: "Apply"
- Applied promo: "{code} ✓"
- Remove link: "Remove"

**Price Breakdown:**
- "Subtotal"
- "Discount ({percent}%)"
- "Estimated Shipping"
- "Grand Total"

**Free shipping label:** "FREE"

**Checkout Button:** "Proceed To Checkout"

**Security notice:** "Encrypted 256-Bit SSL Safe Checkout"

---

## 10. Login Page

Source: `app/login/page.jsx`

### Brand & Heading
- "Versatile By Versha"
- "Welcome Back, Queen"
- "Sign in to access your saved wishlist, orders, and cart"

### Google Sign-in
- "Continue with Google"

### Login Form

| Label | Placeholder | Required |
|-------|-------------|----------|
| Email Address | you@example.com | Yes |
| Password | •••••••• | Yes |

**Button:** "Sign In"

**Error message:** "Failed to sign in. Please check your credentials."

### Demo Admin Button
- "Click for Quick Demo Admin Login"

### Navigation Link
- "Don't have an account? Create Account"

---

## 11. Signup Page

Source: `app/signup/page.jsx`

### Heading
- "VERSATILE BY VERSHA'"
- "Join The Sisterhood"
- "Create your account for exclusive VIP deals and 15% off your first order"

### Signup Form

| Label | Placeholder | Required |
|-------|-------------|----------|
| Full Name | Jessica Miller | Yes |
| Email Address | jessica@example.com | Yes |
| Password | •••••••• | Yes |

**Button:** "Create Your VERSATILE Account"

### Navigation Link
- "Already have an account? Sign In"

---

## 12. Checkout Page

Source: `app/checkout/page.jsx`

### Page Title
- "Checkout"
- Link: "Back to Cart"

### Shipping Information Section

| Label | Placeholder | Required |
|-------|-------------|----------|
| First Name | Jane | Yes |
| Last Name | Doe | Yes |
| Email Address | jane@example.com | Yes |
| Phone Number | +1 (555) 000-0000 | Yes |
| Delivery Street Address | 123 Luxury Ave, Suite 400 | Yes |
| City | New York | Yes |
| Zip Code | 10001 | Yes |

### Payment Option Section

**Heading:** "Payment Option"

**Option 1 — Credit / Debit Card:**
- Title: "Credit / Debit Card"
- Description: "Pay with Visa, Mastercard, Amex"

**Option 2 — Cash On Delivery:**
- Title: "Cash On Delivery"
- Description: "Pay upon package arrival"

**Stripe notice:** "You will be redirected to Stripe's secure checkout page to complete your payment. Your card details are never stored on our servers."

**COD notice:** "Pay when your package arrives. No upfront payment required."

### Order Summary (Checkout)

**Heading:** "Order Items ({count})"

**Promo Code section:**
- Placeholder: "Enter promo code"
- Button: "Apply"

**Breakdown:**
- "Subtotal"
- "Discount ({percent}%)"
- "Shipping Fee"
- "Total Amount"

**Pay Button:** "Pay ${total}"

**Processing states:** "Redirecting to Stripe..." / "Processing..."

**Security notice:** "Money-Back Guarantee Protected"

### Error & Warning Messages

- "Missing required fields: {fields}"
- "Your cart is empty"
- "Please sign in to place an order"
- "Card payments are currently unavailable. Please use Cash on Delivery."

### Order Placed Success State (COD)

- "Order Placed Successfully!"
- "Thank you for shopping with Versatile by Versha! Your order confirmation has been sent to {email}."
- "Order Reference: #LX-{id}"
- "Payment Method: Cash on Delivery"
- "Estimated Delivery: 2 - 4 Business Days"
- Button: "View My Orders"

---

## 13. Checkout Success Page

Source: `app/checkout/success/page.jsx`

### Verifying State
- "Confirming Your Payment"
- "Your payment was received. We are confirming your order and it will appear on your orders page shortly."
- Buttons: "View My Orders", "Continue Shopping"

### Timeout / Confirmed State
- "Payment Successful!"
- "Your payment was processed successfully. Your order is being prepared and will appear on your orders page shortly."

### Error State
- "Something Needs Attention"
- "{errorMsg}"

### Confirmed State
- "Order Placed Successfully!"
- "Thank you for shopping with Versatile by Versha! Your payment has been confirmed and your order is being prepared."
- "Order Reference: {id}"
- "Payment Method: Card Payment (Stripe)"
- "Payment Status: Paid"
- "Estimated Delivery: 2 - 4 Business Days"

---

## 14. Checkout Cancelled Page

Source: `app/checkout/cancelled/page.jsx`

- "Payment Cancelled"
- "Your payment was not completed. No charges have been made. You can try again or choose a different payment method."
- "Your cart items are still saved. Nothing has been lost."
- Buttons: "Return to Checkout", "Continue Shopping"
- Link: "Back to Cart"

---

## 15. Wishlist Page

Source: `app/wishlist/page.jsx`

### Not Logged In State
- "Sign In to View Wishlist"
- "Your wishlist is saved to your account. Please sign in to see your saved items."
- Button: "Sign In"

### Empty Wishlist
- "Your Wishlist is Empty"
- "Save your favorite styles by tapping the heart icon on any product."
- Button: "Start Shopping"

### Wishlist with Items
- "My Wishlist ({count})"
- Link: "Continue Shopping"
- Product card shows: category, name, price, "Add" button

---

## 16. Orders Page

Source: `app/orders/page.jsx`

### Not Signed In
- "Sign In Required"
- "Please sign in to view your orders"
- Button: "Sign In"

### Empty Orders
- "No Orders Yet"
- "You haven't placed any orders yet. Start shopping our luxurious collection of wigs and bundle deals!"
- Buttons: "Let's Go Shopping", "Browse Bundles"

### Orders Header
- "My Orders"
- "Track and manage your orders"
- "{count} {Order/Orders}"

### Order Card Elements
- "Order ID"
- Order reference: "#LX-{id}"
- "Placed on {date}"
- Order status badges: "Pending", "Placed", "Processing", "Dispatched", "Delivered", "Cancelled", "Refunded"
- Payment status badges: "Paid", "Pending", "Failed"
- "COD" (payment method label)
- "Card Payment"
- "Cash on Delivery"
- "+{n} more" (additional items)
- "Qty: {n}"
- "Total"
- "View Product"

### Error State
- "Error: {error}"
- Button: "Try Again"

---

## 17. Navigation

Source: `components/common/Navbar.jsx`

### Desktop Navigation Links

| Name | Href |
|------|------|
| Home | / |
| Shop All | /shop |
| HD Laces | /shop?category=HD+Laces+%26+Closures |
| Bundle Deals | /shop?category=bundles |
| About Us | /about |
| Contact | /contact |

### Admin Link (visible only to admin)
- "Admin" (with ShieldCheck icon)

### Right Action Icons

**Search button:** aria-label "Search items"

**Wishlist:** aria-label "Wishlist with {count} items"

**Cart:** aria-label "Shopping cart with {count} items"

**User authenticated:**
- Display name or "Account"
- Dropdown items:
  - "Admin Dashboard" (admin only)
  - "My Orders"
  - "Sign Out"

**User not authenticated:**
- "Sign In" button

### Mobile Menu Drawer

- Logo alt: "VERSATILE Logo"
- Close button aria-label: "Close menu"

**Mobile navigation links:** Same as desktop + "Admin Panel" (admin only)

**Mobile footer:**
- "100% Virgin Hair & HD Lace"
- "© VERSATILE BY VERSHA'"

### Search Modal

- "Search VERSATILE Collection"
- "Find silky straight, body wave, deep wave, or HD lace closures."
- Placeholder: "Type to search wigs & extensions..."

### Hamburger Button
- aria-label: "Open main navigation menu" / "Close main navigation menu"

---

## 18. Footer

Source: `components/common/Footer.jsx`

### Value Badges

| Title | Description |
|-------|-------------|
| Worldwide Express Shipping | Free express delivery on all orders over $199 |
| 100% Virgin Hair Guarantee | Ethically sourced, unprocessed human hair |
| Hassle-Free Returns | 30-day easy exchanges & money-back policy |

### Brand Info

- Tagline: "\"One Woman. Every Look.\""
- Description: "Crown your confidence with luxury virgin hair wigs & HD Swiss lace closures designed to deliver ultimate elegance and style."

### Social Links
- Instagram
- Facebook
- Twitter

### Quick Links
- Home
- Shop All Wigs
- Bundle Deals
- Shopping Cart
- My Account

### Customer Care
- Wig Care & Maintenance Guide
- Shipping & Delivery Policy
- Returns & Refunds
- Lace Cap Size Guide
- FAQs

### Newsletter Signup (Join Versatile VIP)

**Title:** "Join Versatile VIP"

**Description:** "Subscribe to unlock secret flash sales, product drops, and 15% off your first order!"

**Placeholder:** "Enter your email address..."

**Button:** "Subscribe Now"

### Bottom Bar

- "© {year} VERSATILE BY VERSHA'. All Rights Reserved."
- "Privacy Policy"
- "Terms of Service"
- "Cookie Settings"

---

## 19. Announcement Bar

Source: `components/common/AnnouncementBar.jsx`

**Dynamic sale text:** Uses `sale.bannerText || sale.title`
- Fallback mock: "FREE SHIPPING ON ORDERS OVER $199 ✨ USE CODE LUXE20 FOR EXTRA 20% OFF"

**Promo code display:** "Use code {code} at checkout"

**Countdown timer:** "{HH}:{MM}:{SS}"

---

## 20. Product Card

Source: `components/shop/ProductCard.jsx`

### Badges
- "{percent}% OFF" (sale badge)
- Sold Out (when out of stock)

### Labels
- "Length:"
- "Quick View"
- "Add" (add to cart button)
- "Standard Size" (when no sizes available)
- "Remove from wishlist" / "Add to wishlist" (aria-labels)

---

## 21. Bundle Card

Source: `components/shop/BundleCard.jsx`

### Badges
- "★ BEST SELLER BUNDLE" (popular badge)
- "{savings}" (e.g., "$100 OFF")

### Labels
- "Bundle Special Price"
- "Claim Deal" (button)

---

## 22. Reviews Section

Source: `components/ProductReviews/ProductReviews.jsx`

### Section Header
- "Verified Hair Enthusiasts"
- "Customer Reviews & Ratings"

### Buttons
- "Write a Review"
- "Close Review Form"
- "Review Locked" (disabled)
- "Sign In to Review"
- "All Ratings ({total})"
- "{n} Stars ({count})"

### Sort options
- "Most Recent"
- "Highest Rated"
- "Lowest Rated"

### Empty filter state
- "No reviews found matching filter"
- "Try selecting all ratings to see all reviews."

### Aggregate Rating
- "{rating} / 5"
- "Based on {count} {Review/Reviews}"

---

## 23. Review Form

Source: `components/ProductReviews/ReviewForm.jsx`

### Permission States

**Not logged in:**
- Pre-heading: "Write a Customer Review"
- Message: "Login to write a review."
- Button: "Sign In To Review"

**Already reviewed:**
- Pre-heading: "Write a Customer Review"
- Message: "You have already reviewed this product."

**No delivered order:**
- Pre-heading: "Write a Customer Review"
- Message: "You can review this product after delivery."

### Review Form

- Heading: "Share Your Experience"
- Description: "Your feedback helps hair lovers make the best choice for {productName}"
- Badge: "Verified Purchaser"
- Label: "Overall Rating"
- Rating display: "{n} / 5 Stars"
- Label: "Your Review"
- Placeholder: "Tell us about the texture, lace melt, hair density, and styling versatility..."
- Button: "Submit Verified Review"

### Validation Messages
- "Please write a few words about your experience with this product."

### Success Message
- "Thank you! Your review has been submitted successfully."

### Error Messages
- "Failed to submit review. Please try again."

---

## 24. Review Card

Source: `components/ProductReviews/ReviewCard.jsx`

### Labels
- "Verified Buyer" (badge)
- "Verified Order" (date fallback)

---

## 25. Admin Dashboard

Source: `app/admin/page.jsx`

### Header
- "Admin Management Dashboard"
- "VERSATILE BY VERSHA' | Store Management"
- "Logged in as: {email}"
- Link: "View Store Front →"

### Dashboard Stats

| Label | Value | Sub |
|-------|-------|-----|
| Total Sales | $24,850 | +18.4% this month |
| Products | {count} | Catalog Items |
| Active Sale | {percent}% OFF | {n} Active Campaigns |
| Bundle Deals | {count} | Active Packages |

### Tab Navigation
- "Orders"
- "Product Manager"
- "Launch Sales"
- "Create Bundles"

### Product Form (Admin)
Source: `components/admin/products/ProductForm.jsx`

**Section:** "General Information"
- "Product Name" — placeholder: "e.g. Silky Straight HD Lace Wig"
- "Category" — dropdown with categories
- "Short Description" — placeholder: "One-line tagline for this product"
- "Full Description" — placeholder: "Detailed product description…"

**Section:** "Pricing"
- "Original Price ($)" — placeholder: "189.00"
- "Enable Sale" — "Apply discount to this product"
- "Discount Percentage"
- "Discounted Price (auto-calculated)"

**Section:** "Variant Pricing & Stock"
- Column headers: "Size", "Price ($)", "Stock"
- Size labels: 12", 16", 20", 24"

**Section:** "Product Details"
- "Hair Type" — placeholder: "100% Virgin Brazilian Human Hair"
- "Density" — placeholder: "180% High Density"
- "Cap Size" — placeholder: 'Medium (Adjustable 22.5")'
- "Lace Type" — placeholder: "HD Invisible Swiss Lace"

**Section:** "Product Images"
- "Click to upload product images"
- "PNG, JPG, WEBP — multiple allowed"

**Buttons:**
- "Update Product" (editing)
- "Save & Publish Product" (new)
- "Cancel Edit"
- "Updating…" / "Publishing…" (loading)

### Product Catalog List (Admin)
Source: `components/admin/products/ProductCatalogList.jsx`

- "Current Catalog ({count})"
- Placeholder: "Search products…"
- Empty: "No products found."
- Empty button: "+ Add New Product"
- Discount badge: "{percent}% OFF"

### Sale Manager (Admin)
Source: `components/admin/sales/SaleManagerSection.jsx`

- "Create Sale Campaign" / "Edit Sale Campaign"
- "Sale Title" — placeholder: "e.g. Summer Flash Sale"
- "Sale Type" — options: "Flash Sitewide Sale", "Category-wise Sale"
- "Target Category" — dropdown with categories
- "Promo Code" — placeholder: "e.g. SUMMER20"
- "Discount (%)" — min 0, max 100
- "Start Date" / "End Date"
- "Campaign Active" — "Toggle sale across the site"
- "Show in Header Banner" — "Display sale announcement in site header"
- "Banner Text (shown in header)" — placeholder: "FREE SHIPPING ON ORDERS OVER $199"
- "Note Text (shown in checkout)" — placeholder: "Extra 20% off sitewide"
- "Button Text (optional)" — placeholder: "Shop Now"
- Buttons: "Create Sale Campaign", "Update Sale Campaign", "Cancel", "Saving..."
- List: "All Campaigns"
- Placeholder: "Search sales..."
- Empty: "No sale campaigns created yet. Create your first campaign."
- Sale card: sitewide/category label, "{percent}% OFF", "Code: {code}", "Active"/"Inactive" toggle, "Edit", "Delete"

### Bundle Form (Admin)
Source: `components/admin/bundles/BundleForm.jsx`

- "Create Bundle Package" / "Edit Bundle"
- "Bundle Title" — placeholder: "e.g. 3 Bundles + HD Frontal Deal"
- "Original Price ($)" — placeholder: "420"
- "Current Price ($)" — placeholder: "320"
- "Savings Badge" — placeholder: "e.g. $100 OFF"
- "Bundle Image" — "Click to upload bundle image" — "PNG, JPG, WEBP"
- "Mark as Popular" — "Highlights this bundle as a featured deal"
- "Included Items"
- Buttons: "Create Bundle Deal", "Update Bundle", "Cancel Edit", "Creating…", "Updating…"

### Bundle List (Admin)
Source: `components/admin/bundles/BundleList.jsx`

- "Active Bundles ({count})"
- Placeholder: "Search bundles…"
- Empty: "No bundles found."
- Empty button: "+ Create Bundle"
- Popular badge: "Popular"
- Includes display: items joined with " · "

### Orders Section (Admin)
Source: `components/admin/orders/OrdersSection.jsx`

- "All Orders ({count})"
- Button: "Refresh"
- Empty: "No orders yet."
- "Today's Orders ({count})"
- "Earlier Orders ({count})"

### Admin Order Card
Source: `components/admin/orders/AdminOrderCard.jsx`

- Order reference: "#{id}"
- Customer name (from userName, shipping address, or email, fallback "N/A")
- Payment: "COD" / "Card"
- Payment status: "Paid" / other
- Total: "${total}"
- Items display: "{name} ({size} x{qty})"
- Bundle label: "BUNDLE"
- Button: "Update Status"

### Restock Modal
Source: `components/admin/modals/RestockModal.jsx`

- "Restock Inventory"
- "Product: {name}"
- "Select Size Variant"
- Current stock display: "(current: {n})"
- Current stock info: "Current stock: {n}" / "Price: ${price}"
- "New Stock Quantity" — placeholder: "Enter stock quantity"
- Buttons: "Cancel", "Confirm Restock"
- Buttons: "Updating..." (loading)
- Validation: "Please select a size variant."
- Validation: "Please enter a valid non-negative stock quantity."

---

## 26. Buttons (Complete List)

Collected from all sources:

| Button Label | Location |
|-------------|----------|
| Shop Collection | Homepage hero, CTA section |
| Browse Bundles | Homepage hero |
| Explore All Wigs | Homepage trending section |
| Shop Now | (optional in sale form) |
| Learn More | Not used directly |
| Start Shopping | Empty cart, empty wishlist |
| Continue Shopping | Cart page, checkout success/cancelled |
| Proceed To Checkout | Cart page |
| Apply | Cart page, checkout promo |
| Remove | Cart promo code |
| Sign In | Login page, navbar, wishlist, reviews |
| Create Account | Login page |
| Create Your VERSATILE Account | Signup page |
| Submit Inquiry | Contact form |
| Send Another Message | Contact success |
| View My Orders | Checkout success, orders page |
| Continue with Google | Login page |
| Click for Quick Demo Admin Login | Login page |
| Reset All | Shop filters |
| Reset Filters | Shop page empty state |
| Simulate Loading Shimmer | Shop filters |
| View All HD Laces | Shop page |
| Add | Product card, wishlist |
| Quick View | Product card overlay |
| Claim Deal | Bundle card |
| Add To Shopping Bag | Product detail page |
| Write a Review | Reviews section |
| Close Review Form | Reviews section |
| Sign In to Review | Reviews section |
| Submit Verified Review | Review form |
| Subscribe Now | Footer |
| Clear Cart | Cart page |
| Let's Go Shopping | Orders page empty |
| Browse Bundles | Orders page empty, homepage |
| Return to Checkout | Checkout cancelled |
| View Store Front → | Admin |
| Save & Publish Product | Admin product form |
| Update Product | Admin product form |
| Cancel Edit | Admin forms |
| Create Sale Campaign | Admin sales |
| Update Sale Campaign | Admin sales |
| Create Bundle Deal | Admin bundles |
| Update Bundle | Admin bundles |
| Create Bundle Package | Admin bundles |
| Confirm Restock | Restock modal |
| Cancel | Restock modal, admin forms |
| Refresh | Admin orders |
| Update Status | Admin order card |
| + Add New Product | Admin product list |
| + Create Bundle | Admin bundle list |
| Try Again | Orders error state |
| Sign Out | Navbar dropdown |
| Admin Dashboard | Navbar dropdown |
| My Orders | Navbar dropdown |
| Admin Panel | Mobile menu |
| Back to Shop Collection | Product detail |
| Back to Cart | Checkout, checkout cancelled |
| Send Another Message | Contact success |

---

## 27. Form Labels & Placeholders

Collected from all forms:

| Form | Label | Placeholder |
|------|-------|-------------|
| Contact | Your Full Name | Jessica Miller |
| Contact | Email Address | jessica@example.com |
| Contact | Phone Number (Optional) | +1 (555) 000-0000 |
| Contact | Order Number (If applicable) | LX-98214 |
| Contact | Inquiry Subject | — |
| Contact | Your Message | How can our wig specialists assist you today? |
| Login | Email Address | you@example.com |
| Login | Password | •••••••• |
| Signup | Full Name | Jessica Miller |
| Signup | Email Address | jessica@example.com |
| Signup | Password | •••••••• |
| Checkout | First Name | Jane |
| Checkout | Last Name | Doe |
| Checkout | Email Address | jane@example.com |
| Checkout | Phone Number | +1 (555) 000-0000 |
| Checkout | Delivery Street Address | 123 Luxury Ave, Suite 400 |
| Checkout | City | New York |
| Checkout | Zip Code | 10001 |
| Cart Promo | Promo / Coupon Code | Try LUXE20 |
| Checkout Promo | Promo / Coupon Code | Enter promo code |
| Footer Newsletter | — | Enter your email address... |
| Search Modal | — | Type to search wigs & extensions... |
| Review Form | Overall Rating | — |
| Review Form | Your Review | Tell us about the texture, lace melt, hair density, and styling versatility... |
| Admin Product | Product Name | e.g. Silky Straight HD Lace Wig |
| Admin Product | Short Description | One-line tagline for this product |
| Admin Product | Full Description | Detailed product description… |
| Admin Product | Original Price ($) | 189.00 |
| Admin Sale | Sale Title | e.g. Summer Flash Sale |
| Admin Sale | Promo Code | e.g. SUMMER20 |
| Admin Sale | Banner Text | FREE SHIPPING ON ORDERS OVER $199 |
| Admin Sale | Note Text | Extra 20% off sitewide |
| Admin Sale | Button Text | Shop Now |
| Admin Bundle | Bundle Title | e.g. 3 Bundles + HD Frontal Deal |
| Admin Bundle | Original Price ($) | 420 |
| Admin Bundle | Current Price ($) | 320 |
| Admin Bundle | Savings Badge | e.g. $100 OFF |
| Admin Includes | — | e.g. 3x Straight Virgin Bundles (18", 20", 22") |

---

## 28. Validation, Error & Success Messages

### Validation Messages
- "Missing required fields: {fields}"
- "Please write a few words about your experience with this product."
- "Please select a size variant."
- "Please enter a valid non-negative stock quantity."
- "Please enter a promo code."

### Auth Error Messages
- "Failed to sign in. Please check your credentials."
- "Google sign-in failed. Please try again."
- "This email is already registered."
- "Invalid email address."
- "Password should be at least 6 characters."
- "Invalid email or password."
- "Authentication failed."

### Checkout Error Messages
- "Your cart is empty"
- "Please sign in to place an order"
- "Card payments are currently unavailable. Please use Cash on Delivery."
- "Failed to create checkout session."
- "No checkout URL returned."
- "Failed to start payment. Please try again."
- "Failed to place order. Please try again."

### Promo Code Messages
- "Please enter a promo code."
- "Invalid promotional code."
- "This promo code is no longer active."
- "This promo code has expired."
- "This promo code is not yet valid. It starts on {date}."
- "Promo code applied! {percent}% off sitewide."
- "Promo code applied! {percent}% off on {category}."
- "Failed to validate promo code."

### Order Statuses
- Pending, Placed, Processing, Dispatched, Delivered, Cancelled, Refunded
- Payment Statuses: Paid, Pending, Failed

### Notification/Toast Messages
- "Added {qty}x \"{name} ({size})\""
- "Item removed from cart"
- "{product} added to catalog!"
- "Product updated successfully."
- "Product removed from catalog."
- "Product restocked — {size} now has {newStock} units."
- "Bundle \"{title}\" created!"
- "Bundle updated successfully."
- "Bundle removed."
- "Sale campaign \"{title}\" created!"
- "Sale campaign updated successfully."
- "Sale campaign removed."
- "Sale campaign activated."
- "Sale campaign deactivated."
- "Order status updated to \"{status}\""

### Review Permission Messages
- "Login to write a review."
- "You have already reviewed this product."
- "You can review this product after delivery."
- "You are verified to review this product."
- "Unable to verify review eligibility."
- "You must be logged in to submit a review."

---

## 29. Loading States & Shimmers

Source: `components/common/LoadingShimmer.jsx`

### ProductCardShimmer
- Skeleton with image box, title lines, price, and button placeholders

### ProductGridShimmer
- Grid of ProductCardShimmer (default count: 4)

### ProductDetailsShimmer
- Two-column layout with image skeleton, thumbnails, text lines, size buttons, and CTA skeleton

### CartShimmer
- Page with header skeleton and list of item skeletons

---

## 30. Toast Notification

Source: `app/layout.jsx`

- Component: ToastNotification
- Dynamic notification text from CartContext
- Rendered with CheckCircle icon

---

## 31. Error & Authentication Pages Texts

### 404 / Error pages
- No dedicated 404 page found in the codebase.

### Sign In Required (Orders)
- "Sign In Required"
- "Please sign in to view your orders"
- Button: "Sign In"

### Sign In Required (Wishlist)
- "Sign In to View Wishlist"
- "Your wishlist is saved to your account. Please sign in to see your saved items."
- Button: "Sign In"

---

## 32. SEO & Metadata

Source: `app/layout.jsx`

**Page Title:** "VERSATILE BY VERSHA' | One Woman. Every Look."

**Meta Description:** "Shop 100% HD Swiss lace human hair wigs, body wave, deep wave, and luxury bundle deals. VERSATILE BY VERSHA' — One Woman. Every Look."

**Google Fonts (globals.css):**
- Cormorant Garamond (serif, brand headings)
- Poppins (sans-serif, body text)

**Tailwind CSS Custom Classes:**
- `.shimmer-box` — skeleton animation
- `.text-shadow-hero` — text shadow for hero
- `.glass-panel` — glassmorphism

---

## 33. Image Alt Texts

| Path | Alt Text |
|------|----------|
| /images/logo.png | "VERSATILE BY VERSHA Logo" |
| /images/logo.png | "VERSATILE Logo" (mobile) |
| /images/bannerimage.png | "Luxe Hair - Premium Wigs Collection" |
| /images/hero.png | "Luxe Hair Craftsmanship" |
| /images/logo.svg | "VERSATILE BY VERSHA'" (admin) |
| /images/client1.jpg | "Luxe Client 1" |
| /images/client2.jpg | "Luxe Client 2" |
| /images/client3.jpg | "Luxe Client 3" |

---

## 34. Toast/Notification Messages (CartContext)

Source: `context/CartContext.js`

- "Added {qty}x \"{name} ({size})\""
- "Item removed from cart"

Admin notification messages (from `app/admin/page.jsx`):
- "{name} added to catalog!"
- "Product updated successfully."
- "Product removed from catalog."
- "Product restocked — {size} now has {newStock} units."
- "Bundle \"{title}\" created!"
- "Bundle updated successfully."
- "Bundle removed."
- "Sale campaign \"{title}\" created!"
- "Sale campaign updated successfully."
- "Sale campaign removed."
- "Sale campaign activated."
- "Sale campaign deactivated."
- "Order status updated to \"{status}\""

---

## 35. Admin Constants

Source: `components/admin/common/constants.js`

**Categories:**
- "Straight Wigs"
- "Wave Wigs"
- "Curly Wigs"
- "Colored Wigs"
- "HD Laces & Closures"

**Size Keys:** 12", 16", 20", 24"

---

## 36. Policies & Legal Links

Source: `components/common/Footer.jsx`

Link labels in footer:
- "Privacy Policy"
- "Terms of Service"
- "Cookie Settings"
- "Shipping & Delivery Policy"
- "Returns & Refunds"

No dedicated policy pages or full policy content found within the codebase — these are all links with `href="#"` placeholders.

---

## 37. API Error Messages

Source: `app/api/checkout/route.js`

- "Your cart is empty."
- "You must be signed in to checkout."
- "Email is required."
- "Shipping address is required."
- "Each item must have a productId."
- "Invalid quantity for \"{name}\"."
- "Bundle \"{name}\" not found."
- "Product \"{name}\" not found."
- "Size is required for \"{name}\"."
- "Size \"{size}\" not available for \"{name}\"."
- "Insufficient stock for \"{name}\" ({size}). Available: {stock}, requested: {qty}."
- "Invalid promo code."
- "Failed to create checkout session. Please try again."

Source: `app/api/checkout/verify/route.js`

- "Missing session_id parameter."
- "Failed to verify order."

Source: `app/api/stripe/webhook/route.js`

- "Webhook not configured."
- "Missing Stripe signature header."
- "Invalid webhook signature."
- "Webhook processing failed."

Source: `lib/stripe.js`

- "STRIPE_SECRET_KEY is not set. Stripe payments will not work."

---

## 38. Service Layer Text

Source: Various service files

### AuthService error mapping:
- "This email is already registered."
- "Invalid email address."
- "Password should be at least 6 characters."
- "Invalid email or password."
- "Authentication failed."

### OrderService:
- "Invalid order status: {status}"
- "Bundle \"{name}\" not found."
- "Size \"{size}\" not available for \"{name}\"."
- "Insufficient stock for \"{name}\" ({size}). Available: {stock}, requested: {qty}."
- "Discount amount mismatch. Please re-apply promo code."

### ReviewService:
- "You must be logged in to submit a review."
- "Product, rating, and review text are required."
- "You can only edit your own review."
- "You can only delete your own review."
- "Review not found."

---

## 39. Summary

### Total Pages Scanned

| Page | File |
|------|------|
| Homepage | `app/page.jsx` |
| Shop | `app/shop/page.jsx` |
| Product Detail | `app/product/[id]/page.jsx` |
| About | `app/about/page.jsx` |
| Contact | `app/contact/page.jsx` |
| Cart | `app/cart/page.jsx` |
| Checkout | `app/checkout/page.jsx` |
| Checkout Success | `app/checkout/success/page.jsx` |
| Checkout Cancelled | `app/checkout/cancelled/page.jsx` |
| Login | `app/login/page.jsx` |
| Signup | `app/signup/page.jsx` |
| Wishlist | `app/wishlist/page.jsx` |
| Orders | `app/orders/page.jsx` |
| Admin Dashboard | `app/admin/page.jsx` |

**Total: 14 pages**

### Total Components Scanned

| Category | Components |
|----------|-----------|
| Common | Navbar, Footer, AnnouncementBar, LoadingShimmer |
| Shop | ProductCard, BundleCard |
| ProductReviews | ProductReviews, ReviewForm, ReviewCard, RatingStars |
| Admin/Products | ProductForm, ProductCatalogList |
| Admin/Sales | SaleManagerSection |
| Admin/Bundles | BundleForm, BundleList |
| Admin/Orders | OrdersSection, AdminOrderCard |
| Admin/Modals | RestockModal |
| Admin/Common | Field, Section, ToggleSwitch, DiscountInput, ImageUploader, SingleImageUploader, IncludesEditor |

**Total: 22 components**

### Total Unique Text Entries Extracted

Approximately **500+** unique text entries.

### Files Containing Hardcoded Strings

All user-facing text is hardcoded directly in JSX files. No CMS, no localization system. Files with the most hardcoded strings:

- `app/page.jsx` (homepage content)
- `app/shop/page.jsx` (shop page content)
- `app/about/page.jsx` (about page content)
- `app/contact/page.jsx` (contact page content)
- `app/cart/page.jsx` (cart page content)
- `app/checkout/page.jsx` (checkout page content)
- `app/login/page.jsx` (login page content)
- `app/signup/page.jsx` (signup page content)
- `app/orders/page.jsx` (orders page content)
- `app/wishlist/page.jsx` (wishlist page content)
- `app/admin/page.jsx` (admin dashboard content)
- `components/common/Navbar.jsx` (navigation text)
- `components/common/Footer.jsx` (footer text)
- `components/shop/ProductCard.jsx` (product card text)
- `components/shop/BundleCard.jsx` (bundle card text)
- `components/ProductReviews/ProductReviews.jsx` (reviews section text)
- `components/ProductReviews/ReviewForm.jsx` (review form text)
- `components/admin/products/ProductForm.jsx` (admin product form)
- `components/admin/sales/SaleManagerSection.jsx` (admin sales form)
- `components/admin/bundles/BundleForm.jsx` (admin bundle form)
- `components/admin/modals/RestockModal.jsx` (restock modal)
- `services/AuthService.js` (auth error messages)
- `services/OrderService.js` (order error messages)
- `services/SaleService.js` (promo validation messages)
- `permissions/reviewPermissions.js` (review permission messages)
- `lib/mockData.js` (product/bundle/review/sale data)

**Total: 25+ files**

### Suggested Opportunities to Centralize Repeated Content

1. **Brand name references:** "VERSATILE BY VERSHA'" is repeated in ~15+ files. Centralize into a single constant.

2. **Tagline:** "\"One Woman. Every Look.\"" appears in layout, shop page, and footer.

3. **Button labels:** "Shop Collection", "Continue Shopping", "View My Orders", "Sign In" appear in many places.

4. **Promo messages:** "FREE SHIPPING ON ORDERS OVER $199", shipping threshold of $199, and shipping fee of $15 appear in multiple files (CartContext, checkout API, cart page, mock data).

5. **Value props:** "Free Delivery >$199", "100% HD Swiss Lace", "Easy 30-Day Return" / "30-Day Guarantee" — appear in product detail and homepage features.

6. **Category names:** "Straight Wigs", "Wave Wigs", "Curly Wigs", "Colored Wigs", "HD Laces & Closures" — duplicated in shop page filters, admin constants, and product data.

7. **Size options:** 12", 14", 16", 18", 20", 22", 24", 26" — appear in shop page, admin constants, and mock data.

8. **Auth error messages:** Formatted in AuthService but the same concepts appear in login page error messages.

9. **Order statuses:** Defined in OrderService and also used in AdminOrderCard and OrdersPage.

10. **Footer links:** "Wig Care & Maintenance Guide", "Shipping & Delivery Policy", "Returns & Refunds", "Lace Cap Size Guide", "FAQs" — all placeholder links.

**Recommendation:** Extract all user-facing strings into a single `constants/content.js` file (or CMS) to enable easier editing, localization, and consistency across the application.
