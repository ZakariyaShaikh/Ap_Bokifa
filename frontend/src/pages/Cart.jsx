

import { Link } from "react-router-dom";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useCart } from "../context/shop/CartContext";
import { formatMoney, formatItemCount } from "../utils/format";
import { getBookAuthor, getBookTitle } from "../utils/bookSearch";
import { BOOKS_PATH } from "../constants/shop";

export const Cart = () => {

  const {
    items,
    itemCount,
    subtotal,
    shipping,
    total,
    qualifiesForFreeShipping,
    amountToFreeShipping,
    increment,
    decrement,
    removeItem,
    clearCart,
  } = useCart();


  if (items.length === 0) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-16 text-center">
        <p className="text-5xl">🛒</p>
        <h1 className="mt-4 text-2xl font-bold text-gray-900">Your cart is empty</h1>
        <p className="mt-2 text-sm text-gray-500">
          Add some books and they will show up here.
        </p>
        <Link
          to={BOOKS_PATH}
          className="mt-6 inline-block rounded-full bg-[#0f5a45] px-8 py-3 text-sm font-semibold text-white hover:bg-[#0b4636]"
        >
          Browse books
        </Link>
      </div>
    );
  }


  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Shopping cart</h1>
          <p className="mt-1 text-sm text-gray-500">{formatItemCount(itemCount)}</p>
        </div>
        <button
          type="button"
          onClick={clearCart}
          className="text-sm font-medium text-red-600 hover:underline"
        >
          Clear cart
        </button>
      </div>

      
      <div className="mt-4 rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm">
        {qualifiesForFreeShipping ? (
          <p className="font-medium text-[#0f5a45]">You unlocked FREE shipping!</p>
        ) : (
          <p className="text-gray-600">
            Add <span className="font-bold">{formatMoney(amountToFreeShipping)}</span> more
            to unlock FREE shipping.
          </p>
        )}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
        
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.id} className="flex gap-4 rounded-2xl border border-black/10 bg-white p-4">
              
              {item.cover ? (
                <img
                  src={item.cover}
                  alt={getBookTitle(item)}
                  className="h-28 w-20 shrink-0 rounded-lg object-cover"
                />
              ) : (
                <div className="flex h-28 w-20 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">
                  No cover
                </div>
              )}

              
              <div className="flex min-w-0 flex-1 flex-col">
                <h2 className="truncate text-sm font-semibold text-gray-900">
                  {getBookTitle(item) || "Untitled"}
                </h2>
                <p className="truncate text-xs text-gray-500">{getBookAuthor(item) || "-"}</p>
                <p className="mt-1 text-base font-bold text-[#0f5a45]">
                  {formatMoney(Number(item.price) * Number(item.quantity))}
                </p>

                
                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="flex items-center gap-3 rounded-full border border-black/10 px-2 py-1">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => decrement(item.id)}
                      className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-gray-100"
                    >
                      <FaMinus size={12} aria-hidden="true" />
                    </button>
                    <span className="min-w-6 text-center text-sm font-bold">{item.quantity}</span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => increment(item.id)}
                      className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-gray-100"
                    >
                      <FaPlus size={12} aria-hidden="true" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="flex items-center gap-1 text-xs font-medium text-red-600 hover:underline"
                  >
                    <FaTrash aria-hidden="true" /> Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        
        <aside className="h-fit rounded-2xl border border-black/10 bg-white p-5">
          <h2 className="text-lg font-bold text-gray-900">Order summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-900">{formatMoney(subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className="font-semibold text-gray-900">
                {shipping === 0 ? "FREE" : formatMoney(shipping)}
              </span>
            </div>
            <div className="flex justify-between border-t border-black/10 pt-3 text-base font-bold text-gray-900">
              <span>Total</span>
              <span>{formatMoney(total)}</span>
            </div>
          </div>
          <button
            type="button"
            className="mt-5 w-full rounded-full bg-[#0f5a45] py-3 text-sm font-semibold text-white hover:bg-[#0b4636]"
          >
            Checkout (demo)
          </button>
          <Link
            to={BOOKS_PATH}
            className="mt-3 block text-center text-sm font-medium text-[#0f5a45] hover:underline"
          >
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
};
