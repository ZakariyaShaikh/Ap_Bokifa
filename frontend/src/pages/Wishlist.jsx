

import { Link } from "react-router-dom";
import { FaHeartBroken } from "react-icons/fa";
import { useWishlist } from "../context/shop/WishlistContext";
import { useCart } from "../context/shop/CartContext";
import { BookCard } from "../components/shop/BookCard";
import { AddToCartButton } from "../components/shop/AddToCartButton";
import { BOOKS_PATH } from "../constants/shop";

export const Wishlist = () => {

  const { items, clearWishlist, removeItem } = useWishlist();

  const { addItem } = useCart();


  if (items.length === 0) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-16 text-center">
        <p className="flex justify-center text-5xl text-gray-300">
          <FaHeartBroken aria-hidden="true" />
        </p>
        <h1 className="mt-4 text-2xl font-bold text-gray-900">Your wishlist is empty</h1>
        <p className="mt-2 text-sm text-gray-500">
          Tap the heart on any book to save it here for later.
        </p>
        <Link
          to={BOOKS_PATH}
          className="mt-6 inline-block rounded-full bg-[#0f5a45] px-8 py-3 text-sm font-semibold text-white hover:bg-[#0b4636]"
        >
          Discover books
        </Link>
      </div>
    );
  }


  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My wishlist</h1>
          <p className="mt-1 text-sm text-gray-500">
            {items.length} {items.length === 1 ? "book" : "books"} saved
          </p>
        </div>
        <button
          type="button"
          onClick={clearWishlist}
          className="text-sm font-medium text-red-600 hover:underline"
        >
          Clear all
        </button>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {items.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            footer={
              <div className="flex flex-col gap-2">
                <AddToCartButton book={book} variant="soft" size="sm" />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      addItem(book, 1);
                      removeItem(book.id);
                    }}
                    className="flex-1 rounded-full bg-[#0f5a45] px-3 py-2 text-xs font-semibold text-white hover:bg-[#0b4636]"
                  >
                    Move to cart
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(book.id)}
                    className="flex-1 rounded-full border border-black/10 px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
};
