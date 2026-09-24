import { Link } from "react-router-dom";
import { useBooks } from "../context/admin/BooksContext";

import { BookCard } from "../components/shop/BookCard";

export const Books = () => {

  const { books, loading, error } = useBooks();
  const list = Array.isArray(books) ? books : [];

  return (
    <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[50vh]">
      <h1 className="text-3xl font-serif text-gray-900 mb-8">Books</h1>
      {loading ? (
        <p className="text-center text-gray-500 py-8">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-600 py-8">{error}</p>
      ) : list.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No data available</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          
          
          {list.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
      
      <p className="mt-8 text-center text-sm text-gray-500">
        Looking for someone specific?{" "}
        <Link to="/authors" className="underline">
          View authors
        </Link>
      </p>
    </div>
  );
};
