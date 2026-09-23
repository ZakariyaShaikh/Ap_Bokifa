

import { Link } from "react-router-dom";
import { useBooks } from "../context/admin/BooksContext";

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
            <div key={book.id} className="bg-white rounded-lg border border-gray-100 p-4 hover:shadow-lg transition-shadow">
              {book.cover_image ? (
                <img src={book.cover_image} alt={book.title} className="w-full h-64 object-cover rounded-md bg-gray-100" />
              ) : (
                <div className="w-full h-64 rounded-md bg-gray-100 flex items-center justify-center text-gray-400 text-sm">No image</div>
              )}
              <h3 className="mt-3 text-sm font-semibold text-gray-800 truncate">{book.title}</h3>
              <p className="text-xs text-gray-500 mt-1 truncate">{book.author_name || "—"}</p>
              <p className="text-base font-bold text-green-700 mt-2">
                {book.price === null || book.price === undefined || book.price === "" ? "—" : `$${book.price}`}
              </p>
              {book.author_id ? (
                <Link to={`/authors`} className="text-xs text-gray-500 underline">View author</Link>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
