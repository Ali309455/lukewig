"use client";

import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-luxe-rose uppercase tracking-widest px-3 py-1 bg-luxe-rose/10 rounded-full border border-luxe-rose/20 inline-flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5" />
          LEGAL
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-gray-900">
          Privacy Policy
        </h1>
        <p className="text-gray-500 text-sm">
          Last updated: July 30, 2026
        </p>
      </div>

      <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-xs border border-pink-100 space-y-8 text-gray-600 text-sm leading-relaxed">

        <div>
          <p>
            Versatile by Versha' ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-serif text-2xl font-bold text-gray-900">1. Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul className="list-disc pl-6 space-y-1.5">
            <li><strong className="text-gray-900">Personal Information:</strong> Name, email address, phone number, shipping address, billing address, and payment information when you place an order.</li>
            <li><strong className="text-gray-900">Account Information:</strong> Username, password, and order history if you create an account.</li>
            <li><strong className="text-gray-900">Communication Data:</strong> Any messages you send us through our contact form, email, or customer service channels.</li>
            <li><strong className="text-gray-900">Usage Data:</strong> Information about how you navigate and interact with our website, including pages visited, time spent, and referring URLs.</li>
            <li><strong className="text-gray-900">Device Information:</strong> IP address, browser type, operating system, and device type.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="font-serif text-2xl font-bold text-gray-900">2. How We Use Your Information</h2>
          <p>We use the information we collect for the following purposes:</p>
          <ul className="list-disc pl-6 space-y-1.5">
            <li>To process and fulfill your orders, including shipping and returns.</li>
            <li>To communicate with you about your order, account, or inquiries.</li>
            <li>To send promotional offers, newsletters, and marketing communications (with your consent where required).</li>
            <li>To improve our website, products, and customer experience.</li>
            <li>To detect, prevent, and address fraud, security, or technical issues.</li>
            <li>To comply with legal obligations and enforce our Terms of Service.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="font-serif text-2xl font-bold text-gray-900">3. Payment Information</h2>
          <p>
            We do not store your full payment card details on our servers. All payment transactions are processed securely through third-party payment processors (such as Stripe, PayPal, or Square) that comply with PCI DSS standards. Your payment information is encrypted and handled in accordance with their respective privacy policies.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-serif text-2xl font-bold text-gray-900">4. Cookies & Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors come from. You can control cookie preferences through your browser settings. Disabling cookies may affect certain features of our website.
          </p>
          <p>Types of cookies we use:</p>
          <ul className="list-disc pl-6 space-y-1.5">
            <li><strong className="text-gray-900">Essential Cookies:</strong> Required for the website to function properly (e.g., shopping cart functionality).</li>
            <li><strong className="text-gray-900">Analytics Cookies:</strong> Help us understand how visitors use our site so we can improve it.</li>
            <li><strong className="text-gray-900">Marketing Cookies:</strong> Used to deliver relevant advertisements and measure campaign effectiveness.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="font-serif text-2xl font-bold text-gray-900">5. How We Share Your Information</h2>
          <p>We do not sell your personal information. We may share your data with:</p>
          <ul className="list-disc pl-6 space-y-1.5">
            <li><strong className="text-gray-900">Service Providers:</strong> Third-party vendors who help us operate our business (shipping carriers, payment processors, email delivery services, analytics providers).</li>
            <li><strong className="text-gray-900">Legal Requirements:</strong> When required by law, court order, or governmental regulation.</li>
            <li><strong className="text-gray-900">Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="font-serif text-2xl font-bold text-gray-900">6. Data Retention</h2>
          <p>
            We retain your personal information only for as long as necessary to fulfill the purposes described in this policy, or as required by applicable law. Order records are typically retained for accounting and tax compliance purposes. Account information is retained until you request deletion.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-serif text-2xl font-bold text-gray-900">7. Your Rights</h2>
          <p>Depending on your jurisdiction, you may have the right to:</p>
          <ul className="list-disc pl-6 space-y-1.5">
            <li>Access the personal information we hold about you.</li>
            <li>Request correction of inaccurate or incomplete data.</li>
            <li>Request deletion of your personal data.</li>
            <li>Object to or restrict the processing of your data.</li>
            <li>Request portability of your data to another service provider.</li>
            <li>Withdraw consent at any time (where processing is based on consent).</li>
          </ul>
          <p className="mt-3">To exercise any of these rights, please contact us at <strong className="text-gray-900">versatilebyversha@yahoo.com</strong>.</p>
        </div>

        <div className="space-y-3">
          <h2 className="font-serif text-2xl font-bold text-gray-900">8. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes SSL/TLS encryption for data transmitted through our website and secure storage practices.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-serif text-2xl font-bold text-gray-900">9. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites or services. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-serif text-2xl font-bold text-gray-900">10. Children's Privacy</h2>
          <p>
            Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from minors. If we become aware that a minor has provided us with personal data, we will take steps to delete it.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-serif text-2xl font-bold text-gray-900">11. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-serif text-2xl font-bold text-gray-900">12. Contact Us</h2>
          <p>
            If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us:
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
