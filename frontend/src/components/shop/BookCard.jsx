import { FaRegImage } from "react-icons/fa";
import { AddToCartButton } from "./AddToCartButton";
import { WishlistButton } from "./WishlistButton";
import { formatPriceCompact } from "../../utils/format";
import { getBookAuthor, getBookTitle } from "../../utils/bookSearch";


export const BookCard = ({ book, footer = null, children = null }) => {
  const cover = book?.cover_image || book?.cover;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-black/8 bg-white transition-shadow duration-200 hover:shadow-[0_18px_28px_rgba(0,0,0,0.08)]">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#f0efe9]">
        {cover ? (
          <img src={cover} alt={getBookTitle(book)} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-[#9a9a95]">
            <FaRegImage aria-hidden="true" size={26} />
            <span className="text-xs">No cover</span>
          </div>
        )}
        <div className="absolute right-3 top-3">
          <WishlistButton book={book} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-[#141414]" title={getBookTitle(book)}>
          {getBookTitle(book) || "Untitled"}
        </h3>
        <p className="mt-1 truncate text-xs text-[#6f6f6f]">{getBookAuthor(book) || "—"}</p>

        <p className="mt-3 text-lg font-bold text-[#0f5a45]">{formatPriceCompact(book?.price)}</p>

        {children}

        <div className="mt-auto pt-4">
          {footer ?? <AddToCartButton book={book} variant="soft" />}
        </div>
      </div>
    </article>
  );
};
