import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { Main } from "./layouts/Main"
import { Home } from "./pages/Home"
import { Books as PublicBooks } from "./pages/Books"
import { Author as PublicAuthors } from "./pages/Author"
import { Blogs as PublicBlogs } from "./pages/Blogs"
import { AuthProvider, useAuth } from "./context/admin/AuthContext"
import AdminLayout from "./layouts/admin/AdminLayout"
import Dashboard from "./pages/Admin/Dashboard"
import Authors from "./pages/Admin/Authors"
import Books from "./pages/Admin/Books"
import Blogs from "./pages/Admin/Blogs"
import Login from "./pages/Login"
import Register from "./pages/Register"
import UserDashboard from "./pages/UserDashboard"
import UserLayout from "./layouts/UserLayout"
import Verify from "./pages/Verify"
import ChangePassword from "./pages/ChangePassword"
import ErrorPage from "./pages/ErrorPage"
import { ToastProvider } from "./components/admin/Toast"
import { BooksProvider } from "./context/admin/BooksContext"
import { AuthorProvider } from "./context/admin/AuthorContext"
import { BlogProvider } from "./context/admin/BlogContext"

const AdminRoute = ({ children }) => {
  const { isAuthenticated, loading, isAdmin } = useAuth()
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-4 border-[#0f5a45] border-t-transparent animate-spin" />
          <p className="text-gray-500 text-sm">Loading...</p>
        </div>
      </div>
    )
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  // Authenticated but not an admin -> show the error page ("No route is exists")
  if (!isAdmin) {
    return <ErrorPage />
  }
  return children
}

const CustomerRoute = ({ children }) => {
  const { isAuthenticated, loading, isCustomer } = useAuth()
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-4 border-[#0f5a45] border-t-transparent animate-spin" />
          <p className="text-gray-500 text-sm">Loading...</p>
        </div>
      </div>
    )
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  // Admins are NEVER auto-redirected into /admin - send them home instead
  if (!isCustomer) {
    return <Navigate to="/" replace />
  }
  return children
}

export default function App() {
  return (
    <AuthProvider>
      <AuthorProvider>
        <BooksProvider>
          <BlogProvider>
          <ToastProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Main />}>
                  <Route index element={<Home />} />
                  <Route path="/books" element={<PublicBooks />} />
                  <Route path="/authors" element={<PublicAuthors />} />
                  <Route path="/blogs" element={<PublicBlogs />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify" element={<Verify />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <AdminLayout />
                    </AdminRoute>
                  }
                >
                  <Route index element={<Dashboard />} />
                  <Route path="authors" element={<Authors />} />
                  <Route path="books" element={<Books />} />
                  <Route path="blogs" element={<Blogs />} />
                </Route>
                <Route
                  path="/user"
                  element={
                    <CustomerRoute>
                      <UserLayout />
                    </CustomerRoute>
                  }
                >
                  <Route index element={<UserDashboard />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          </ToastProvider>
          </BlogProvider>
        </BooksProvider>
      </AuthorProvider>
    </AuthProvider>
  )
}