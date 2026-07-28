"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle2, Sparkles } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    orderId: "",
    subject: "General Inquiry",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Something went wrong.");
      }

      setSubmitted(true);

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        orderId: "",
        subject: "General Inquiry",
        message: "",
      });
    } catch (err) {
      setError(err.message || "Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-bold text-luxe-rose uppercase tracking-widest px-3 py-1 bg-luxe-rose/10 rounded-full border border-luxe-rose/20">
          WE'RE HERE TO HELP
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-gray-900">
          Contact Versatile by Versha'
        </h1>
        <p className="text-gray-500 text-sm">
          Have a question about lace cap sizing, custom order requests, or
          shipping status? Reach out to our dedicated support team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-3xl shadow-xs border border-pink-100 flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-luxe-rose/10 text-luxe-rose flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold text-gray-900">
                Email Us
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                versatilebyversha@yahoo.com
              </p>
              <span className="text-[11px] text-luxe-rose font-semibold">
                24/7 Response Time
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-xs border border-pink-100 flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-luxe-gold/10 text-luxe-gold flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold text-gray-900">
                Online Store
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                Shop from anywhere — we ship worldwide
              </p>
              <span className="text-[11px] text-gray-400">
                No Public Address
              </span>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-xs border border-pink-100">
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-3xl font-bold text-gray-900">
                Message Received!
              </h3>
              <p className="text-gray-500 text-sm max-w-md mx-auto">
                Thank you for contacting Versatile by Versha'. One of our wig
                specialists will respond within 24 business hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-full bg-luxe-rose text-white text-xs font-semibold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-gray-900 mb-2">
                Send Us A Message
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                    Your Full Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Jessica Miller"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-luxe-rose"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="jessica@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-luxe-rose"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-luxe-rose"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                    Order Number (If applicable)
                  </label>
                  <input
                    type="text"
                    placeholder="LX-98214"
                    value={formData.orderId}
                    onChange={(e) =>
                      setFormData({ ...formData, orderId: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-luxe-rose"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  Inquiry Subject
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-hidden focus:ring-2 focus:ring-luxe-rose"
                >
                  <option>General Inquiry</option>
                  <option>Lace Cap Sizing Help</option>
                  <option>Order Status & Tracking</option>
                  <option>Custom Wig Request</option>
                  <option>Wholesale & Salon Partnerships</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  Your Message
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can our wig specialists assist you today?"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-luxe-rose"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-full bg-luxe-rose hover:bg-luxe-rose-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />

                <span>{loading ? "Sending..." : "Submit Inquiry"}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
