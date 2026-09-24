import { useState } from "react";
import { BookOpen, Eye, EyeOff, AlertCircle, Mail } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/admin/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated, user, pendingEmail, setPendingEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);


  if (isAuthenticated) {
    if (user?.role === "admin") {
      navigate("/", { replace: true });
    } else {
      navigate("/user/dashboard", { replace: true });
    }
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setVerificationSent(false);

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const result = await login(email, password);
      
      if (result.success) {
        if (result.requiresVerification) {

          setVerificationSent(true);
          setPendingEmail(email);
        } else {

          if (result.user?.role === "admin") {
            navigate("/");
          } else {
            navigate("/user/dashboard");
          }
        }
      } else {
        setError(result.message || "Login failed. Please try again.");
      }
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        (err?.response
          ? `Login failed (${err.response.status}). Please try again.`
          : "Network error. Please check your connection and try again.");
      setError(message);
    } finally {
      setLoading(false);
    }
  };


  if (verificationSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f3f1] px-4">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-xl bg-[#0f5a45] flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-[#0f5a45] tracking-tight">Verification Required</h1>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
            <div className="flex items-start gap-3 mb-6 px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <p className="text-sm text-blue-700">
                A verification OTP has been sent to your email. Please check your inbox and verify your account.
              </p>
            </div>

            <p className="text-center text-gray-500 mb-6">
              Redirecting to verification page...
            </p>

            <Link
              to="/verify"
              className="block w-full text-center py-2.5 bg-[#0f5a45] text-white rounded-lg font-medium hover:bg-[#083f34] transition-colors"
            >
              Go to Verification
            </Link>
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
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-[#0f5a45] tracking-tight">AP Bokifa</h1>
          <p className="text-gray-500 mt-1">Sign In</p>
        </div>

        
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
          {error && (
            <div className="flex items-start gap-3 mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
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
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5a45] focus:border-transparent transition-colors"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full px-4 py-2.5 pr-11 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5a45] focus:border-transparent transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-[#0f5a45] text-white rounded-lg font-medium hover:bg-[#083f34] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {loading && (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              )}
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-[#0f5a45] font-medium hover:text-[#083f34] transition-colors"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-sm text-gray-400 mt-6">
          Sign in as admin or customer
        </p>
      </div>
    </div>
  );
}