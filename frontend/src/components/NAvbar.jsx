import { Link } from "react-router-dom";
import { useAuth } from "../context/admin/AuthContext";
import { ProfileDropdown } from "./ProfileDropdown";

import { SearchBar } from "./shop/SearchBar";

import { useCart } from "../context/shop/CartContext";
import { useWishlist } from "../context/shop/WishlistContext";
import { CART_PATH, WISHLIST_PATH } from "../constants/shop";

const navItems = [
  { label: "Home", hasCaret: true , path : "/"},
  { label: "Shop", hasCaret: true , path : "/authors"},
  { label: "Blogs", hasCaret: true , path : "/blogs" },
  { label: "Pages", hasCaret: true , path : "/books"},
  { label: "Contact", hasCaret: false , path : "/" },
]

const BookIcon = () => (
  <svg viewBox="0 0 64 64" aria-hidden="true" className="brand-svg">
    <path d="M8 17.5C8 15.6 9.6 14 11.5 14h20.5v36H11.5C9.6 50 8 48.4 8 46.5v-29Zm47 0c0-1.9-1.6-3.5-3.5-3.5H31.5v36h20.5c1.9 0 3.5-1.6 3.5-3.5v-29Z" fill="currentColor" opacity="0.95" />
    <path d="M18 18h11v28H18zm20 0h11v28H38z" fill="currentColor" opacity="0.3" />
    <path d="M20 25h7v3h-7zm0 7h7v3h-7zm0 7h7v3h-7zm22-14h7v3h-7zm0 7h7v3h-7zm0 7h7v3h-7z" fill="#f4f0ea" />
  </svg>
)

const IconCart = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="header-icon-svg">
    <path d="M3 5h2l2.2 9.1a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8L20 7H7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="10" cy="18.2" r="1.3" fill="currentColor" />
    <circle cx="17" cy="18.2" r="1.3" fill="currentColor" />
  </svg>
)

const IconHeart = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="header-icon-svg">
    <path d="M12 20.5s-7.5-4.7-9.2-9.1C1.7 8.3 4.1 4 8.3 4c2.1 0 3.4 1 3.7 1.7C12.3 5 13.6 4 15.7 4c4.2 0 6.6 4.3 5.5 7.4-1.7 4.4-9.2 9.1-9.2 9.1Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const IconUser = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="header-icon-svg">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const NAvbar = () => {

  const { isAuthenticated } = useAuth();

  const { itemCount } = useCart();

  const { count: wishlistCount } = useWishlist();

  return (
    <header className="navbar-shell">
      <div className="top-promo-bar">
        <button type="button" className="promo-arrow" aria-label="Previous deals">‹</button>
        <p>All books at least 50% of list prices every day</p>
        <button type="button" className="promo-arrow" aria-label="Next deals">›</button>
      </div>

      <div className="main-header-row">
        <div className="brand-block" aria-label="Bokifa home">
          <div className="brand-mark">
            <BookIcon />
          </div>
          <div className="brand-text">bokifa</div>
        </div>

        
        <div className="search-area !overflow-visible">
          <SearchBar />
        </div>

        <div className="header-actions">
          <button type="button" className="currency-button">
            <span>USD</span>
            <span className="currency-caret">▾</span>
          </button>
          <button type="button" className="currency-button">
            <span>ENGLISH</span>
            <span className="currency-caret">▾</span>
          </button>

          
          <Link to={WISHLIST_PATH} className="icon-button" aria-label="Wishlist">
            <IconHeart />
            <span className="icon-badge">{wishlistCount > 99 ? "99+" : wishlistCount}</span>
          </Link>

          
          <Link to={CART_PATH} className="icon-button" aria-label="Cart">
            <IconCart />
            <span className="icon-badge cart-badge">{itemCount > 99 ? "99+" : itemCount}</span>
          </Link>

          
          {isAuthenticated ? (
            <ProfileDropdown />
          ) : (
            <div className="auth-buttons">
              <a href="/login" className="auth-link">
                <IconUser />
                <span>Login</span>
              </a>
              <a href="/register" className="auth-link register-link">
                Register
              </a>
            </div>
          )}
        </div>
      </div>

      <nav className="main-nav" aria-label="Main navigation">
        <div className="nav-links">
          {navItems.map((item) => (
            <a key={item.label} href={item.path} className={`nav-link ${item.hasCaret ? "has-caret" : ""}`}>
              {item.label}
              {item.hasCaret && <span className="nav-caret">⌄</span>}
            </a>
          ))}
        </div>

        <div className="nav-phone">Need help? Call Us: +84 2500 888 33</div>
      </nav>
    </header>
  )
}
