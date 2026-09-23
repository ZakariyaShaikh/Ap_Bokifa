import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../../services/admin/api";

const AuthContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [pendingEmail, setPendingEmail] = useState(null);

  const logout = () => {
    // Clear memory storage
    setAccessToken(null);
    setUser(null);
    setIsAuthenticated(false);
    setPendingEmail(null);
    // Clear cookies
    document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  };

  const checkAuth = async () => {
    const savedToken = localStorage.getItem("accessToken");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      try {
        setAccessToken(savedToken);
        setUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
      } catch {
        logout();
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email, password) => {
    const response = await authService.login(email, password);

    if (response.success) {
      // Check if user needs verification
      if (response.requiresVerification) {
        // Store email for verification flow
        setPendingEmail(email);
        return { 
          success: true, 
          requiresVerification: true,
          message: response.message 
        };
      }

      // Store access token in memory
      setAccessToken(response.accessToken);
      // Store user data in memory
      setUser(response.user);
      setIsAuthenticated(true);
      // Also store in localStorage for persistence
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("user", JSON.stringify(response.user));
      return { success: true, user: response.user };
    }

    return { success: false, message: response.message };
  };

  const register = async (name, email) => {
    const response = await authService.register(name, email);
    return response;
  };

  const verifyOtp = async (email, otp) => {
    const response = await authService.verifyOtp(email, otp);
    return response;
  };

  const changeTempPassword = async (email, newPassword) => {
    const response = await authService.changeTempPassword(email, newPassword);
    return response;
  };

  // Get the current access token
  const getAccessToken = () => {
    return accessToken || localStorage.getItem("accessToken");
  };

  const isAdmin = user?.role === "admin";
  const isCustomer = user?.role === "customer";

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        isAdmin,
        isCustomer,
        accessToken,
        login,
        register,
        verifyOtp,
        changeTempPassword,
        logout,
        checkAuth,
        getAccessToken,
        pendingEmail,
        setPendingEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};