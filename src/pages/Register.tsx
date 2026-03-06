import { ExternalLink, MessageCircle, CheckCircle, Calendar, MapPin, Lock } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const PAYUNIT_URL = "https://lk.payunit.net/pay/2077d448-7372-4399-bb8a-f01126aa4b7e";
const WA_URL = "https://wa.me/237683493220";

const benefits = [
  "Full access to the 2-Day E-Woman Conference",
  "Official E-Woman Conference Magazine",
  "Networking Coffee Breaks",
  "Access to all conference sessions",
  "Networking with women leaders",
];

const Register = () => {
  return (
    <div className="min-h-screen gradient-magenta py-16 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10 animate-fade-in-up">
          <p className="text-white text-xs uppercase tracking-widest mb-3">E-Woman Conference 2026</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Secure Your Seat
          </h1>
          <div className="w-16 h-1 bg-white/40 mx-auto rounded-full" />
        </div>

        {/* Main Card */}
        <div
          className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          {/* Event Info Banner */}
          <div
            className="px-8 py-5 text-white space-y-2"
            style={{ background: "linear-gradient(90deg, #d4198a 0%, #c0157c 100%)" }}
          >
            <h2 className="font-display text-xl font-bold">E-Woman Conference 2026</h2>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-white text-sm">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="flex-shrink-0" />
                March 13–14, 2026
              </span>
              <span className="hidden sm:inline text-white">•</span>
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="flex-shrink-0" />
                Hilton Hotel – Yaoundé
              </span>
            </div>
          </div>

          <div className="px-8 py-8 space-y-8">

            {/* Ticket Benefits */}
            <div>
              <h3 className="font-display text-lg font-bold text-gray-900 mb-4">
                Your <span className="text-[#d4198a]">50,000 FCFA</span> Ticket Includes
              </h3>
              <ul className="space-y-3">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-[#d4198a] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100" />

            {/* Fee Display */}
            <div className="text-center">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Registration Fee</p>
              <p className="font-display text-4xl font-bold text-gray-900">50,000 FCFA</p>
            </div>

            {/* What happens next */}
            <div className="bg-gray-50 rounded-2xl px-6 py-5">
              <h4 className="text-sm font-bold text-gray-700 mb-3">What happens next</h4>
              <ol className="space-y-2">
                {[
                  "Click the secure PayUnit payment button below",
                  "Complete payment with MTN or Orange Money",
                  "You'll be redirected to your confirmation page",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full text-white text-xs flex items-center justify-center font-bold mt-0.5"
                      style={{ background: "#d4198a" }}
                    >
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            {/* CTA Button + Trust Line */}
            <div className="text-center space-y-3">
              <a
                href={PAYUNIT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full bg-[#d4198a] hover:bg-[#c0157c] text-white py-5 px-8 rounded-full font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                onClick={() => trackEvent("register_payunit_click")}
              >
                Secure Your Seat – Pay 50,000 FCFA
                <ExternalLink size={18} />
              </a>

              <p className="text-xs text-gray-400 flex items-center justify-center gap-1.5">
                <Lock size={13} className="text-green-500" />
                Secure payment powered by PayUnit
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100" />

            {/* WhatsApp Support */}
            <div className="text-center space-y-3">
              <p className="text-sm font-semibold text-gray-700">Need help with registration?</p>
              <p className="text-sm text-gray-500">Contact us on WhatsApp:</p>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 shadow hover:shadow-md"
                onClick={() => trackEvent("register_whatsapp_click")}
              >
                <MessageCircle size={18} fill="white" />
                Chat on WhatsApp
              </a>
              <p className="text-xs text-gray-400">+237 6 83 49 32 20</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;
