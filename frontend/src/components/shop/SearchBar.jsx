

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useBooks } from "../../context/admin/BooksContext";
import { useRecentSearches } from "../../hooks/useRecentSearches";
import { SEARCH_SUGGESTION_LIMIT, STOREFRONT_PRODUCT_PATH } from "../../constants/shop";
import { getBookAuthor, getBookTitle, normalizeTerm } from "../../utils/bookSearch";

export const SearchBar = () => {

  const navigate = useNavigate();

  const { books } = useBooks();

  const { recentSearches, pushSearch, clearRecentSearches } = useRecentSearches();


  const [text, setText] = useState("");

  const [open, setOpen] = useState(false);

  const boxRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const term = normalizeTerm(text);
  const allBooks = Array.isArray(books) ? books : [];
  const suggestions = term
    ? allBooks
        .filter((book) => {
          const haystack = normalizeTerm(`${getBookTitle(book)} ${getBookAuthor(book)}`);
          return haystack.includes(term);
        })
        .slice(0, SEARCH_SUGGESTION_LIMIT)
    : [];


  const goToResults = (value) => {
    const clean = (value || "").trim();
    if (!clean) return;
    pushSearch(clean);
    setOpen(false);
    navigate(`${STOREFRONT_PRODUCT_PATH}?q=${encodeURIComponent(clean)}`);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    goToResults(text);
  };

  return (
    <div ref={boxRef} className="relative w-full">
      
      <form onSubmit={handleSubmit} className="search-area">
        
        <input
          type="text"
          value={text}
          onChange={(event) => {
            setText(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search our store..."
          aria-label="Search our store"
        />
        
        {text ? (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => setText("")}
            className="mr-1 flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-black/5"
          >
            <FaTimes aria-hidden="true" />
          </button>
        ) : null}
        
        <button type="submit" className="search-button">
          <FaSearch aria-hidden="true" />
          <span>Search</span>
        </button>
      </form>

      
      {open && (term || recentSearches.length > 0) ? (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-xl">
          
          {term ? (
            <div className="p-2">
              <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                Suggestions
              </p>
              {suggestions.length === 0 ? (
                <p className="px-3 py-2 text-sm text-gray-500">
                  No matches - press Enter to search anyway.
                </p>
              ) : (
                <ul>
                  {suggestions.map((book) => (
                    <li key={book.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setText(getBookTitle(book));
                          goToResults(getBookTitle(book));
                        }}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left hover:bg-gray-50"
                      >
                        {book.cover_image ? (
                          <img src={book.cover_image} alt="" className="h-10 w-8 rounded object-cover" />
                        ) : null}
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-medium text-gray-800">
                            {getBookTitle(book)}
                          </span>
                          <span className="block truncate text-xs text-gray-500">
                            {getBookAuthor(book)}
                          </span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : null}

          
          {!term && recentSearches.length > 0 ? (
            <div className="border-t border-black/5 p-2">
              <div className="flex items-center justify-between px-3 pb-1 pt-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Recent
                </p>
                <button
                  type="button"
                  onClick={clearRecentSearches}
                  className="text-xs font-medium text-red-500 hover:underline"
                >
                  Clear
                </button>
              </div>
              <div className="flex flex-wrap gap-2 px-3 pb-3">
                {recentSearches.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setText(item);
                      goToResults(item);
                    }}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

