import { useState } from "react";
import { Lock, AlertCircle, CheckCircle, Eye, EyeOff } from "lucide-react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/admin/AuthContext";

export default function ChangePassword() {
  const navigate = useNavigate();
  const { changeTempPassword, pendingEmail, setPendingEmail, isAuthenticated, user, loading: authLoading } = useAuth();


  const isLoggedInMode = isAuthenticated;
  const email = isLoggedInMode ? user?.email || "" : pendingEmail || "";
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !newPassword || !confirmPassword) { setError("Please fill in all fields."); return; }
    if (newPassword.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (newPassword.length > 12) { setError("Password cannot exceed 12 characters."); return; }
    if (newPassword !== confirmPassword) { setError("Passwords do not match."); return; }
    setLoading(true);
    try {
      const result = await changeTempPassword(email, newPassword);
      if (result.success) { setSuccess(true); setPendingEmail(null); if (!isLoggedInMode) { setTimeout(() => navigate("/login"), 2000); } }
      else { setError(result.message || "Failed to change password."); }
    } catch (err) {
      setError(err?.response?.data?.message || "Network error. Please try again.");
    } finally { setLoading(false); }
  };


  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f3f1] px-4">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }


  if (!isLoggedInMode && !pendingEmail && !success) {
    return <Navigate to="/login" replace />;
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f3f1] px-4">
        <div className="w-full max-w-md text-center">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-xl bg-green-500 flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-white"/>
            </div>
            <h1 className="text-3xl font-bold text-[#0f5a45]">Password Changed!</h1>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
            <p className="text-center text-gray-600 mb-6">Your password has been changed successfully.</p>
            {isLoggedInMode ? (
              <button type="button" onClick={() => navigate("/")} className="w-full py-2.5 bg-[#0f5a45] text-white rounded-lg font-medium hover:bg-[#083f34] transition-colors">Go Home</button>
            ) : (
              <p className="text-center text-gray-500">Redirecting to login...</p>
            )}
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
            <Lock className="w-8 h-8 text-white"/>
          </div>
          <h1 className="text-3xl font-bold text-[#0f5a45]">{isLoggedInMode ? "Change Password" : "Set Your Password"}</h1>
          <p className="text-gray-500">{isLoggedInMode ? "Update the password for your account" : "Create a new password for your account"}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
          {error && <div className="flex items-start gap-3 mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-lg"><AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5"/><p className="text-sm text-red-700">{error}</p></div>}
          <form onSubmit={handleSubmit} className="space-y-5">
            {isLoggedInMode ? (
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input id="email" type="email" value={email} readOnly className="w-full px-4 py-2.5 border border-gray-200 bg-gray-50 text-gray-500 rounded-lg cursor-not-allowed"/>
              </div>
            ) : (
              <input type="hidden" value={email} readOnly/>
            )}
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <div className="relative">
                <input id="newPassword" type={showPassword?"text":"password"} value={newPassword} onChange={e=>setNewPassword(e.target.value)} placeholder="Enter new password" autoComplete="new-password" required className="w-full px-4 py-2.5 pr-11 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5a45]"/>
                <button type="button" onClick={()=>setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{showPassword?<EyeOff className="w-5 h-5"/>:<Eye className="w-5 h-5"/>}</button>
              </div>
              <p className="mt-1 text-xs text-gray-500">Password must be 8-12 characters</p>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input id="confirmPassword" type="password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} placeholder="Confirm new password" autoComplete="new-password" required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5a45]"/>
            </div>
            <button type="submit" disabled={loading} className="w-full py-2.5 bg-[#0f5a45] text-white rounded-lg font-medium hover:bg-[#083f34] disabled:opacity-50">{loading?"Changing Password...":(isLoggedInMode?"Change Password":"Set Password")}</button>
          </form>
          <div className="mt-6 text-center"><p className="text-sm text-gray-500">{isLoggedInMode ? (<button type="button" onClick={() => navigate(-1)} className="text-[#0f5a45] font-medium">Back</button>) : (<a href="/login" className="text-[#0f5a45] font-medium">Back to Login</a>)}</p></div>
        </div>
        <p className="text-center text-sm text-gray-400 mt-6">Enter a new password to secure your account</p>
      </div>
    </div>
  );
}