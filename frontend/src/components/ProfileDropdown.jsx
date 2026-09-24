import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "../context/admin/AuthContext";

const UserAvatar = ({ name, size = 40 }) => {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";
  return (
    <div
      className="user-avatar"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
      title={name}
    >
      {initials}
    </div>
  );
};

export const ProfileDropdown = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const closeMenu = () => setIsProfileOpen(false);

  const handleNavigate = (path) => {
    closeMenu();
    navigate(path);
  };

  const handleLogout = () => {

    closeMenu();
    logout();
    navigate("/login");
  };


  const profilePath = user?.role === "admin" ? "/admin" : "/user";

  return (
    <div className="profile-menu">
      <button
        type="button"
        className="icon-button user-icon-button"
        aria-label="Profile menu"
        aria-expanded={isProfileOpen}
        onClick={() => setIsProfileOpen(!isProfileOpen)}
      >
        {user?.profile_image ? (
          <img
            src={user.profile_image}
            alt="Profile"
            className="user-avatar"
            style={{ width: 40, height: 40, objectFit: "cover" }}
          />
        ) : (
          <UserAvatar name={user?.name || user?.email} />
        )}
        <ChevronDown
          className={`profile-caret${isProfileOpen ? " open" : ""}`}
          size={14}
        />
      </button>

      {isProfileOpen && (
        <>
          
          <div className="profile-dropdown-overlay" onClick={closeMenu} />
          <div className="profile-dropdown" role="menu">
            <div className="profile-dropdown-header">
              <p className="profile-dropdown-name">
                {user?.name || user?.email}
              </p>
              <p className="profile-dropdown-role">{user?.role}</p>
            </div>

            <button
              type="button"
              className="profile-dropdown-item"
              role="menuitem"
              onClick={() => handleNavigate(profilePath)}
            >
              <User size={16} />
              <span>Profile</span>
            </button>

            <button
              type="button"
              className="profile-dropdown-item"
              role="menuitem"
              onClick={() => handleNavigate("/change-password")}
            >
              <Lock size={16} />
              <span>Change Password</span>
            </button>

            <button
              type="button"
              className="profile-dropdown-item logout"
              role="menuitem"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};
