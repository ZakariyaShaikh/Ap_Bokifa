import { NewsletterBar } from './NewsletterBar';

const footerColumns = [
  {
    title: "Category",
    links: ["Action Books", "Comedy", "Drama", "Horror", "Kids Books", "Top 50 Books"],
  },
  {
    title: "Useful links",
    links: ["Secure Shopping", "Privacy Policy", "Terms Of Use", "Shipping Policy", "Returns Policy", "Payment Option"],
  },
  {
    title: "Explore",
    links: ["About us", "Store Locator", "Kids Club", "Blogs"],
  },
  {
    title: "Get in touch",
    links: ["Careers", "Become a Franchisee", "Contact Us"],
  },
]

const paymentBadges = ["PayPal", "VISA", "MasterCard", "Stripe", "G Pay", "Discover"]

const BookMark = () => (
  <svg viewBox="0 0 64 64" aria-hidden="true" className="footer-mark-svg">
    <path d="M8 17.5C8 15.6 9.6 14 11.5 14h20.5v36H11.5C9.6 50 8 48.4 8 46.5v-29Zm47 0c0-1.9-1.6-3.5-3.5-3.5H31.5v36h20.5c1.9 0 3.5-1.6 3.5-3.5v-29Z" fill="currentColor" opacity="0.95"/>
    <path d="M18 18h11v28H18zm20 0h11v28H38z" fill="currentColor" opacity="0.3"/>
    <path d="M20 25h7v3h-7zm0 7h7v3h-7zm0 7h7v3h-7zm22-14h7v3h-7zm0 7h7v3h-7zm0 7h7v3h-7z" fill="#f4f0ea"/>
  </svg>
)

export const Footer = () => {
  return (
    <footer className="footer-shell">
      <NewsletterBar />
      <div className="footer-top">
        <div className="footer-brand-block">
          <div className="footer-brand-row">
            <div className="footer-brand-mark">
              <BookMark />
            </div>
            <div className="footer-brand-name">bokifa</div>
          </div>

          <p className="footer-description">
            Bokifa draws book lovers of all ages into a community,
            engage with booklovers and meet their favourite literary personalities.
          </p>

          <div className="footer-phone">+(84) - 1800 - 4635</div>
          <div className="footer-email">contact@example.com</div>

          <div className="footer-mini-badge" aria-label="Featured book badge">
            <span className="mini-badge-text">THE MIGHTY</span>
            <span className="mini-badge-text second-line">BED</span>
          </div>
        </div>

        <div className="footer-column-group">
          {footerColumns.map((column) => (
            <div key={column.title} className="footer-column">
              <h4>{column.title}</h4>
              <ul>
                {column.links.map((link) => (
                  <li key={link}><a href="#">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="footer-bottom-bar">
        <div className="copyright">Copyright © 2025 Bokifa. All rights reserved</div>

        <div className="payment-list" aria-label="Accepted payment methods">
          {paymentBadges.map((badge) => (
            <span key={badge} className="payment-badge">{badge}</span>
          ))}
        </div>

        <button type="button" className="scroll-top" aria-label="Scroll to top">
          ↑
        </button>
      </div>
    </footer>
  )
}
