

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useBooks } from "../context/admin/BooksContext";
import { useRecentSearches } from "../hooks/useRecentSearches";
import { BookCard } from "../components/shop/BookCard";
import { AddToCartButton } from "../components/shop/AddToCartButton";
import {
  DEFAULT_FILTERS,
  SORT_OPTIONS,
  collectAuthorOptions,
  getMaxCataloguePrice,
  searchBooks,
} from "../utils/bookSearch";
import { formatPrice } from "../utils/format";

export const Search = () => {

  const [params, setParams] = useSearchParams();
  const urlQuery = params.get("q") || "";


  const { books, loading, error } = useBooks();

  const { pushSearch } = useRecentSearches();


  const [authorId, setAuthorId] = useState(DEFAULT_FILTERS.authorId);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sortBy, setSortBy] = useState(DEFAULT_FILTERS.sortBy);


  useEffect(() => {
    if (urlQuery.trim()) pushSearch(urlQuery.trim());
  }, [urlQuery, pushSearch]);


  const authorOptions = useMemo(() => collectAuthorOptions(books), [books]);

  const catalogueMax = useMemo(() => getMaxCataloguePrice(books), [books]);


  const results = useMemo(() => {
    return searchBooks(books, { query: urlQuery, authorId, maxPrice, sortBy });
  }, [books, urlQuery, authorId, maxPrice, sortBy]);


  const handleQuerySubmit = (event) => {
    event.preventDefault();
    const value = new FormData(event.target).get("q") || "";
    setParams(value.trim() ? { q: value.trim() } : {});
  };


  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      
      <h1 className="text-3xl font-bold text-gray-900">
        {urlQuery ? `Results for "${urlQuery}"` : "Search books"}
      </h1>
      <p className="mt-1 text-sm text-gray-500">
        {results.length} {results.length === 1 ? "book" : "books"} found
      </p>

      
      <form
        onSubmit={handleQuerySubmit}
        className="mt-6 flex flex-col gap-3 rounded-2xl border border-black/10 bg-white p-4 sm:flex-row sm:items-center"
      >
        
        <input
          name="q"
          defaultValue={urlQuery}
          key={urlQuery}
          placeholder="Search by title, author, ISBN..."
          className="w-full flex-1 rounded-full border border-black/10 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-[#0f5a45]"
        />
        
        <select
          value={authorId}
          onChange={(event) => setAuthorId(event.target.value)}
          className="rounded-full border border-black/10 bg-gray-50 px-4 py-2.5 text-sm"
        >
          <option value="all">All authors</option>
          {authorOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name} ({option.count})
            </option>
          ))}
        </select>
        
        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
          className="rounded-full border border-black/10 bg-gray-50 px-4 py-2.5 text-sm"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-full bg-[#0f5a45] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#0b4636]"
        >
          Search
        </button>
      </form>

      
      {catalogueMax > 0 ? (
        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-black/10 bg-white px-4 py-3">
          <label htmlFor="maxPrice" className="text-sm font-medium text-gray-700">
            Max price: {maxPrice === null ? "Any" : formatPrice(maxPrice)}
          </label>
          <input
            id="maxPrice"
            type="range"
            min="0"
            max={catalogueMax}
            value={maxPrice === null ? catalogueMax : maxPrice}
            onChange={(event) => setMaxPrice(Number(event.target.value))}
            className="w-full accent-[#0f5a45]"
          />
          <button
            type="button"
            onClick={() => setMaxPrice(null)}
            className="text-xs font-medium text-gray-500 underline hover:text-gray-800"
          >
            Reset
          </button>
        </div>
      ) : null}

      
      <div className="mt-8">
        {loading ? (
          <p className="py-10 text-center text-gray-500">Loading books...</p>
        ) : error ? (
          <p className="py-10 text-center text-red-600">{error}</p>
        ) : results.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-black/15 bg-white px-6 py-16 text-center">
            <p className="text-lg font-semibold text-gray-800">No books found</p>
            <p className="mt-1 text-sm text-gray-500">Try a different title or author.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {results.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                footer={<AddToCartButton book={book} variant="soft" size="sm" />}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
