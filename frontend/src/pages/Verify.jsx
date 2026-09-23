import { useState } from "react";
import { Mail, AlertCircle, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/admin/AuthContext";

export default function Verify() {
  const navigate = useNavigate();
  const { verifyOtp, pendingEmail } = useAuth();
  const [email, setEmail] = useState(pendingEmail || "");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !otp) {
      setError("Please enter both email and OTP.");
      return;
    }

    if (otp.length !== 6) {
      setError("OTP must be 6 digits.");
      return;
    }

    setLoading(true);
    try {
      const result = await verifyOtp(email, otp);
      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/change-password");
        }, 2000);
      } else {
        setError(result.message || "OTP verification failed.");
      }
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        (err?.response
          ? `Verification failed (${err.response.status}).`
          : "Network error. Please try again.");
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f3f1] px-4">
        <div className="w-full max-w-md text-center">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-xl bg-green-500 flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-[#0f5a45] tracking-tight">OTP Verified!</h1>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
            <p className="text-center text-gray-600 mb-6">
              Your account has been verified successfully.
            </p>
            <p className="text-center text-gray-500">
              Redirecting to set your new password...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f3f1] px-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-xl bg-[#0f5a45] flex items-center justify-center mb-4">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-[#0f5a45] tracking-tight">Verify OTP</h1>
          <p className="text-gray-500 mt-1">Enter the OTP sent to your email</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
          {error && (
            <div className="flex items-start gap-3 mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleVerify} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5a45] focus:border-transparent transition-colors"
              />
            </div>

            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                Verification Code
              </label>
              <input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="Enter 6-digit OTP"
                autoComplete="one-time-code"
                maxLength={6}
                required
                className="w-full px-4 py-2.5 text-center text-lg tracking-[0.5em] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5a45] focus:border-transparent transition-colors uppercase"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-[#0f5a45] text-white rounded-lg font-medium hover:bg-[#083f34] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              <a href="/login" className="text-[#0f5a45] font-medium hover:text-[#083f34]">
                Back to Login
              </a>
            </p>
          </div>
        </div>

        <p className="text-center text-sm text-gray-400 mt-6">
          After verification, you'll set a new password
        </p>
      </div>
    </div>
  );
}
