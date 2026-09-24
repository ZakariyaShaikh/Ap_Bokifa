import { useAuth } from "../context/admin/AuthContext";
import { BookOpen, User, Mail, Shield } from "lucide-react";
import { Link } from "react-router-dom";

export default function UserDashboard() {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto">
      
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#0f5a45] flex items-center justify-center">
            <User className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.name || "Customer"}!
            </h1>
            <p className="text-gray-500">
              Manage your account and view your orders
            </p>
          </div>
        </div>
      </div>

      
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-[#0f5a45]" />
          Account Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Full Name</p>
            <p className="font-medium text-gray-900">{user?.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Email</p>
            <p className="font-medium text-gray-900 flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-400" />
              {user?.email}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Role</p>
            <p className="font-medium text-gray-900 flex items-center gap-2">
              <Shield className="w-4 h-4 text-gray-400" />
              {user?.role === "admin" ? "Admin" : "Customer"}
            </p>
          </div>
        </div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Link
          to="/books"
          className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow"
        >
          <div className="w-10 h-10 rounded-lg bg-[#0f5a45] flex items-center justify-center mb-3">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <h3 className="font-semibold text-gray-900">Browse Books</h3>
          <p className="text-sm text-gray-500 mt-1">
            Explore our collection of books
          </p>
        </Link>
      </div>

      
      <div className="border-t border-gray-200 pt-6">
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}