import { useState } from "react";
import { useContent } from "@/contexts/ContentContext";
import { Upload, Check, AlertCircle, CheckCircle } from "lucide-react";

type Step = 1 | 2 | 3;

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  paymentMethod: string;
  transactionId: string;
  notes: string;
  consent: boolean;
}

const WA_NUMBER = "237683493220";

const Register = () => {
  const { content } = useContent();
  const c = content!;

  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    paymentMethod: "",
    transactionId: "",
    notes: "",
    consent: false,
  });
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      setSubmitError("Invalid file type. Please use JPG, PNG, or PDF.");
      return;
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setSubmitError("File too large. Maximum size is 10MB.");
      return;
    }

    setProofFile(file);
    setSubmitError("");
  };

  const validateStep1 = () => {
    return (
      formData.fullName.trim() !== "" &&
      formData.email.trim() !== "" &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      formData.phone.trim() !== "" &&
      formData.country.trim() !== ""
    );
  };

  const validateStep2 = () => {
    return (
      formData.paymentMethod !== "" &&
      formData.transactionId.trim() !== "" &&
      proofFile !== null &&
      formData.consent
    );
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
      setSubmitError("");
    } else if (step === 2 && validateStep2()) {
      setStep(3);
      setSubmitError("");
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as Step);
      setSubmitError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep2()) {
      setSubmitError("Please complete all required fields.");
      return;
    }

    setSubmitSuccess(true);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      country: "",
      paymentMethod: "",
      transactionId: "",
      notes: "",
      consent: false,
    });
    setProofFile(null);
    setStep(1);
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen gradient-magenta flex items-center justify-center px-4">
        <div className="max-w-2xl w-full bg-white rounded-3xl p-8 md:p-12 shadow-2xl animate-fade-in-up">
          <div className="text-center">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Registration Received!
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              Your registration has been received. We are verifying your payment and will contact you shortly.
            </p>
            <p className="text-gray-500 text-sm mb-8">
              If you need urgent help, reach us on WhatsApp:{" "}
              <a
                href={`https://wa.me/${WA_NUMBER}`}
                className="font-semibold text-[#d4198a] hover:underline"
              >
                +237 6 83 49 32 20
              </a>
            </p>
            <button
              onClick={() => setSubmitSuccess(false)}
              className="bg-magenta hover:bg-magenta-dark text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 shadow-lg"
            >
              Register Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-magenta py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
            {c.registration.title}
          </h1>
          <p className="text-white/80 text-lg">{c.registration.subtitle}</p>
          <p className="text-white/90 text-2xl font-bold mt-4">{c.registration.fee}</p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center gap-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                    step >= s
                      ? "bg-white text-magenta shadow-lg"
                      : "bg-white/20 text-white/60"
                  }`}
                >
                  {step > s ? <Check size={20} /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-12 h-1 mx-2 transition-all duration-300 ${
                      step > s ? "bg-white" : "bg-white/20"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-2xl animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Info */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-xl focus:ring-2 focus:ring-magenta focus:border-magenta transition-all"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-xl focus:ring-2 focus:ring-magenta focus:border-magenta transition-all"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-xl focus:ring-2 focus:ring-magenta focus:border-magenta transition-all"
                    placeholder="+237 6 XX XX XX XX"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-xl focus:ring-2 focus:ring-magenta focus:border-magenta transition-all"
                    placeholder="e.g., Cameroon"
                    required
                  />
                </div>

                <button
                  type="button"
                  onClick={handleNextStep}
                  disabled={!validateStep1()}
                  className="w-full bg-magenta hover:bg-magenta-dark text-white py-4 rounded-full font-semibold text-lg transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-magenta"
                >
                  Continue to Payment Info
                </button>
              </div>
            )}

            {/* Step 2: Payment Info */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">Payment Information</h2>
                <p className="text-gray-600 mb-2">
                  Pay the registration fee using MTN Mobile Money or Orange Money, then upload your proof of payment below.
                </p>

                {/* USSD Payment Codes */}
                <div className="rounded-2xl overflow-hidden border border-[#e0c55d] mb-2">
                  <div
                    className="px-5 py-3 font-semibold text-sm text-white"
                    style={{ background: "linear-gradient(90deg, #d4198a, #c0157c)" }}
                  >
                    How to Pay
                  </div>
                  <div className="p-5 space-y-4 bg-gradient-to-br from-pink-50 to-yellow-50">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0 font-bold text-black text-sm">
                        MTN
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium mb-1">MTN Mobile Money</p>
                        <p className="font-mono text-base font-bold text-gray-900 tracking-wide">
                          *126*4*926667*<span className="text-[#d4198a]">Amount</span>#
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Dial this code and replace <em>Amount</em> with the fee</p>
                      </div>
                    </div>
                    <div className="border-t border-[#e0c55d]/40" />
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 font-bold text-white text-sm">
                        OM
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium mb-1">Orange Money</p>
                        <p className="font-mono text-base font-bold text-gray-900 tracking-wide">
                          #150*47*890422*<span className="text-[#d4198a]">Amount</span>#
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Dial this code and replace <em>Amount</em> with the fee</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Methods Display */}
                <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                  <h3 className="font-semibold text-gray-900 mb-2">Registration Fee:</h3>
                  {c.registration.paymentMethods.map((m: string) => (
                    <div key={m} className="bg-white p-3 rounded-lg text-sm font-mono text-gray-900 border border-gray-200">
                      {m}
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Method <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-xl focus:ring-2 focus:ring-magenta focus:border-magenta transition-all"
                    required
                  >
                    <option value="">Select payment method</option>
                    <option value="MTN">MTN Mobile Money</option>
                    <option value="Orange">Orange Money</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transaction ID / Reference <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="transactionId"
                    value={formData.transactionId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-xl focus:ring-2 focus:ring-magenta focus:border-magenta transition-all"
                    placeholder="Enter your transaction ID"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Proof of Payment <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-magenta transition-all">
                    <input
                      type="file"
                      id="proof"
                      accept="image/jpeg,image/jpg,image/png,application/pdf"
                      onChange={handleFileChange}
                      className="hidden"
                      required
                    />
                    <label htmlFor="proof" className="cursor-pointer">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-sm font-medium text-gray-700 mb-1">
                        {proofFile ? proofFile.name : "Click to upload"}
                      </p>
                      <p className="text-xs text-gray-500">JPG, PNG, or PDF (max 10MB)</p>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-xl focus:ring-2 focus:ring-magenta focus:border-magenta transition-all"
                    rows={3}
                    placeholder="Any special requirements or notes..."
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 text-magenta border-gray-300 rounded focus:ring-magenta"
                    required
                  />
                  <label htmlFor="consent" className="text-sm text-gray-600">
                    I consent to being contacted regarding this registration. <span className="text-red-500">*</span>
                  </label>
                </div>

                {submitError && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-800">{submitError}</p>
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-4 rounded-full font-semibold transition-all duration-200"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    disabled={!validateStep2()}
                    className="flex-1 bg-magenta hover:bg-magenta-dark text-white py-4 rounded-full font-semibold transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-magenta"
                  >
                    Review &amp; Submit
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Review Your Registration</h2>

                <div className="bg-gray-50 p-6 rounded-xl space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Full Name</p>
                    <p className="font-semibold text-gray-900">{formData.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold text-gray-900">{formData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-semibold text-gray-900">{formData.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Country</p>
                    <p className="font-semibold text-gray-900">{formData.country}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Payment Method</p>
                    <p className="font-semibold text-gray-900">{formData.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Transaction ID</p>
                    <p className="font-semibold text-gray-900">{formData.transactionId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Proof of Payment</p>
                    <p className="font-semibold text-gray-900">{proofFile?.name}</p>
                  </div>
                  {formData.notes && (
                    <div>
                      <p className="text-sm text-gray-600">Notes</p>
                      <p className="font-semibold text-gray-900">{formData.notes}</p>
                    </div>
                  )}
                </div>

                {submitError && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-800">{submitError}</p>
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-4 rounded-full font-semibold transition-all duration-200"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-magenta hover:bg-magenta-dark text-white py-4 rounded-full font-semibold text-lg transition-all duration-200 shadow-lg"
                  >
                    Secure My Seat
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Contact Help */}
        <div className="text-center mt-8 text-white/80 text-sm">
          <p>
            Need help? Contact us on WhatsApp:{" "}
            <a
              href={`https://wa.me/${WA_NUMBER}`}
              className="font-semibold hover:text-white transition-colors"
            >
              +237 6 83 49 32 20
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
