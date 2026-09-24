import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useWishlist } from "../../context/shop/WishlistContext";

const VARIANTS = {
  overlay:
    "w-10 h-10 rounded-full bg-white/90 shadow-md border border-black/5 text-[#141414] hover:bg-white",
  inline:
    "px-4 py-2.5 rounded-full border border-[#0f5a45]/25 text-[#0f5a45] bg-white hover:bg-[#0f5a45]/5",
};

const ACTIVE_CLASS = "text-[#d9563d]";



export const WishlistButton = ({ book, variant = "overlay", className = "", label }) => {
  const { toggleItem, isWishlisted } = useWishlist();

  const active = isWishlisted(book?.id);
  const variantClass = VARIANTS[variant] || VARIANTS.overlay;

  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleItem(book);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={active}
      aria-label={active ? `Remove ${book?.title || "book"} from wishlist` : `Save ${book?.title || "book"} to wishlist`}
      title={active ? "Remove from wishlist" : "Add to wishlist"}
      className={`inline-flex items-center justify-center gap-2 text-sm font-medium transition-colors duration-200 ${
        active ? ACTIVE_CLASS : ""
      } ${variantClass} ${className}`}
    >
      {active ? <FaHeart aria-hidden="true" /> : <FaRegHeart aria-hidden="true" />}
      {label ? <span>{active ? "Saved" : label}</span> : null}
    </button>
  );
};
