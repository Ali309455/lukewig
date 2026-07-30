"use client";

import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-luxe-rose uppercase tracking-widest px-3 py-1 bg-luxe-rose/10 rounded-full border border-luxe-rose/20 inline-flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5" />
          LEGAL
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-gray-900">
          Terms of Service
        </h1>
        <p className="text-gray-500 text-sm">
          Last updated: July 30, 2026
        </p>
      </div>

      <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-xs border border-pink-100 space-y-8 text-gray-600 text-sm leading-relaxed">

        <div>
          <p>
            Welcome to Versatile by Versha'. By accessing or using our website, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our website or services.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-serif text-2xl font-bold text-gray-900">1. General</h2>
          <p>
            These Terms of Service govern your use of the Versatile by Versha' website and the purchase of any products from our store. We reserve the right to update or modify these terms at any time without prior notice. Continued use of our site after changes constitutes acceptance of the revised terms.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-serif text-2xl font-bold text-gray-900">2. Eligibility</h2>
          <p>
            By using this website, you represent that you are at least 13 years of age or are accessing the site under the supervision of a parent or guardian. You agree to provide accurate, current, and complete information during the account registration and checkout process.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-serif text-2xl font-bold text-gray-900">3. Products & Pricing</h2>
          <ul className="list-disc pl-6 space-y-1.5">
            <li>All product descriptions, images, pricing, and availability are subject to change without notice.</li>
            <li>We make every effort to display accurate colors and details, but we cannot guarantee that your monitor's display will be an exact representation.</li>
            <li>We reserve the right to limit quantities of any product and to refuse or cancel any order.</li>
            <li>Prices are listed in US Dollars (USD) unless otherwise stated. Taxes and shipping fees will be added at checkout.</li>
            <li>Promotional codes and discounts may not be combined unless explicitly stated.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="font-serif text-2xl font-bold text-gray-900">4. Orders & Payment</h2>
          <ul className="list-disc pl-6 space-y-1.5">
            <li>By placing an order, you agree to pay the full amount specified at checkout, including applicable taxes and shipping fees.</li>
            <li>We accept major credit cards, debit cards, PayPal, and other payment methods as displayed at checkout.</li>
            <li>Orders are processed after payment confirmation. We reserve the right to verify payment information before processing.</li>
            <li>We reserve the right to cancel orders due to suspected fraud, unauthorized transactions, or pricing errors.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="font-serif text-2xl font-bold text-gray-900">5. Shipping & Delivery</h2>
          <ul className="list-disc pl-6 space-y-1.5">
            <li>Shipping times are estimates and not guaranteed. We are not responsible for delays caused by carriers, customs clearance, or unforeseen circumstances.</li>
            <li>Risk of loss and title for products pass to you upon delivery by the carrier.</li>
            <li>International orders may be subject to customs duties, taxes, and import fees, which are the responsibility of the buyer.</li>
            <li>Free shipping offers apply only to qualifying orders as specified in the promotion.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="font-serif text-2xl font-bold text-gray-900">6. Returns & Exchanges</h2>
          <ul className="list-disc pl-6 space-y-1.5">
            <li>Due to the hygienic nature of hair products, we accept returns and exchanges within 30 days of delivery only for unworn, unaltered, and unused items in their original packaging.</li>
            <li>Custom or made-to-order wigs are final sale and cannot be returned or exchanged.</li>
            <li>Shipping charges for returns are the responsibility of the customer unless the return is due to our error or a defective product.</li>
            <li>Refunds are processed to the original payment method within 5-10 business days after we receive and inspect the returned item.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="font-serif text-2xl font-bold text-gray-900">7. Intellectual Property</h2>
          <p>
            All content on this website — including text, graphics, logos, images, product designs, and software — is the property of Versatile by Versha' or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our express written consent.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-serif text-2xl font-bold text-gray-900">8. User Conduct</h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-6 space-y-1.5">
            <li>Use our website for any unlawful purpose or in violation of any applicable laws.</li>
            <li>Attempt to gain unauthorized access to our systems or interfere with the operation of our website.</li>
            <li>Submit false or misleading information, including fraudulent payment details.</li>
            <li>Engage in any activity that could damage, disable, or impair our website or services.</li>
            <li>Use automated tools (bots, scrapers) to access or collect data from our website without permission.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="font-serif text-2xl font-bold text-gray-900">9. Limitation of Liability</h2>
          <p>
            Versatile by Versha' shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of our website or products. Our total liability for any claim arising from these terms or your purchase shall not exceed the amount paid by you for the product in question.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-serif text-2xl font-bold text-gray-900">10. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless Versatile by Versha', its owners, employees, and affiliates from any claims, damages, losses, liabilities, and expenses arising out of your use of our website, violation of these terms, or infringement of any third-party rights.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-serif text-2xl font-bold text-gray-900">11. Governing Law</h2>
          <p>
            These Terms of Service shall be governed by and construed in accordance with the laws of the United States and the State of [Your State]. Any disputes arising under these terms shall be resolved in the courts located in [Your County/State].
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-serif text-2xl font-bold text-gray-900">12. Termination</h2>
          <p>
            We reserve the right to terminate or suspend your account and access to our services at our sole discretion, without prior notice, for conduct that we believe violates these terms or is harmful to our business, other customers, or third parties.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-serif text-2xl font-bold text-gray-900">13. Contact Information</h2>
          <p>
            For questions, concerns, or inquiries regarding these Terms of Service, please contact us:
          </p>
          <div className="bg-luxe-rose/5 p-5 rounded-2xl border border-luxe-rose/10 space-y-1">
            <p><strong className="text-gray-900">Email:</strong> versatilebyversha@yahoo.com</p>
            <p><strong className="text-gray-900">Business Name:</strong> Versatile by Versha'</p>
            <p><strong className="text-gray-900">Website:</strong> <Link href="/" className="text-luxe-rose hover:underline">www.versatilebyversha.com</Link></p>
          </div>
        </div>

      </div>

      {/* Back Link */}
      <div className="text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-luxe-rose text-white text-xs font-bold hover:bg-luxe-rose-dark transition-all shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>

    </div>
  );
}
