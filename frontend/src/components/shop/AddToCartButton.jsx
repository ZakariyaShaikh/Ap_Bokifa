import { FaCheck, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../context/shop/CartContext";

const VARIANTS = {
  solid: "bg-[#0f5a45] text-white hover:bg-[#0b4636]",
  soft: "bg-[#f3f0eb] text-[#141414] border border-black/10 hover:bg-[#e9e4df]",
  overlay: "bg-[#0b4f40] text-white hover:bg-[#0f5a45]",
  ghost: "bg-transparent text-[#0f5a45] border border-[#0f5a45]/30 hover:bg-[#0f5a45]/5",
};

const SIZES = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};


const BADGE_CLASSES = {
  solid: "bg-white/20 text-white",
  overlay: "bg-white/20 text-white",
  soft: "bg-[#0f5a45]/10 text-[#0f5a45]",
  ghost: "bg-[#0f5a45]/10 text-[#0f5a45]",
};



export const AddToCartButton = ({
  book,
  variant = "solid",
  size = "md",
  className = "",
  showQuantity = true,
}) => {
  const { addItem, getQuantity } = useCart();

  const quantityInCart = getQuantity(book?.id);

  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    addItem(book, 1);
  };

  const variantClass = VARIANTS[variant] || VARIANTS.solid;
  const sizeClass = SIZES[size] || SIZES.md;

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Add ${book?.title || "book"} to cart`}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 ${variantClass} ${sizeClass} ${className}`}
    >
      {quantityInCart > 0 ? <FaCheck aria-hidden="true" /> : <FaShoppingCart aria-hidden="true" />}
      <span>{quantityInCart > 0 ? "In cart" : "Add to cart"}</span>
      {showQuantity && quantityInCart > 0 ? (
        <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${BADGE_CLASSES[variant] || BADGE_CLASSES.solid}`}>
          {quantityInCart}
        </span>
      ) : null}
    </button>
  );
};
