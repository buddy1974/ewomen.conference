import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Calendar, MapPin, MessageCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const WA_URL = "https://wa.me/237683493220";

const PaymentSuccess = () => {
  useEffect(() => {
    trackEvent("payment_success_view");
  }, []);

  return (
    <div className="min-h-screen gradient-magenta py-16 px-4 flex items-center">
      <div className="max-w-lg mx-auto w-full">

        {/* Success card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

          {/* Top banner */}
          <div
            className="px-8 py-6 text-white text-center"
            style={{ background: "linear-gradient(90deg, #d4198a 0%, #c0157c 100%)" }}
          >
            <CheckCircle size={48} className="mx-auto mb-3 text-white" strokeWidth={1.8} />
            <h1 className="font-display text-2xl font-bold">Registration Confirmed</h1>
          </div>

          <div className="px-8 py-8 space-y-6 text-center">

            <p className="text-gray-800 font-semibold text-lg leading-snug">
              Your payment has been received successfully.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Your place at the <strong>E-Woman Conference 2026</strong> is now confirmed.
            </p>

            {/* Event details */}
            <div className="bg-gray-50 rounded-2xl px-6 py-5 space-y-3 text-left">
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <Calendar size={16} className="flex-shrink-0 text-[#d4198a]" />
                <span>March 13–14, 2026</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <MapPin size={16} className="flex-shrink-0 text-[#d4198a]" />
                <span>Hilton Hotel – Yaoundé</span>
              </div>
            </div>

            <p className="text-sm text-gray-500 leading-relaxed">
              Please keep your payment confirmation for event check-in.
            </p>

            <div className="border-t border-gray-100" />

            {/* WhatsApp help */}
            <div className="space-y-3">
              <p className="text-sm font-semibold text-gray-700">Need help?</p>
              <p className="text-sm text-gray-500">Contact us on WhatsApp:</p>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 shadow hover:shadow-md"
              >
                <MessageCircle size={18} fill="white" />
                Chat on WhatsApp
              </a>
              <p className="text-xs text-gray-400">+237 6 83 49 32 20</p>
            </div>

            <Link
              to="/"
              className="inline-block text-xs text-gray-400 hover:text-gray-600 transition underline underline-offset-2"
            >
              Return to homepage
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
