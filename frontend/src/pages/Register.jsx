import { useState } from "react";
import { BookOpen, AlertCircle, User } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../services/admin/api";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email) {
      setError("Name and Email are required.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const result = await authService.register(name, email);
      if (result.success) {
        setSuccess(true);
        setTimeout(() => navigate("/login"), 3000);
      } else {
        setError(result.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        (err?.response
          ? `Registration failed (${err.response.status}). Please try again.`
          : "Network error. Please check your connection and try again.");
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
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-[#0f5a45] tracking-tight">Registration Successful!</h1>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
            <div className="flex items-start gap-3 mb-6 px-4 py-3 bg-green-50 border border-green-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <p className="text-sm text-green-700">A temporary password has been sent to your email.</p>
            </div>
            <p className="text-center text-gray-500">Redirecting to login page...</p>
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
          <p className="text-gray-500 mt-1">Create Your Account</p>
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
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" autoComplete="name" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5a45] focus:border-transparent transition-colors" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5a45] focus:border-transparent transition-colors" />
            </div>
            <button type="submit" disabled={loading} className="w-full py-2.5 bg-[#0f5a45] text-white rounded-lg font-medium hover:bg-[#083f34] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2">
              {loading && <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>}
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">Already have an account? <Link to="/login" className="text-[#0f5a45] font-medium hover:text-[#083f34] transition-colors">Sign In</Link></p>
          </div>
        </div>
        <p className="text-center text-sm text-gray-400 mt-6">By registering, you agree to our Terms of Service</p>
      </div>
    </div>
  );
}
