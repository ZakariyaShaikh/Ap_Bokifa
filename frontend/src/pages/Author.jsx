

import { useAuthors } from "../context/admin/AuthorContext";
import { useBooks } from "../context/admin/BooksContext";

export const Author = () => {
  const { authors, loading: authorsLoading, error: authorsError } = useAuthors();
  const { books, loading: booksLoading, error: booksError } = useBooks();
  const authorList = Array.isArray(authors) ? authors : [];
  const bookList = Array.isArray(books) ? books : [];
  const loading = authorsLoading || booksLoading;
  const error = authorsError || booksError;

  const booksByAuthor = {};
  bookList.forEach((b) => {
    if (b.author_id == null) return;
    if (!booksByAuthor[b.author_id]) booksByAuthor[b.author_id] = [];
    booksByAuthor[b.author_id].push(b);
  });

  return (
    <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[50vh]">
      <h1 className="text-3xl font-serif text-gray-900 mb-8">Authors</h1>
      {loading ? (
        <p className="text-center text-gray-500 py-8">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-600 py-8">{error}</p>
      ) : authorList.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No data available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {authorList.map((author) => (
            <div key={author.id} className="bg-white rounded-xl border border-gray-100 p-6 flex gap-4 hover:shadow-lg transition-shadow">
              {author.profile_image ? (
                <img src={author.profile_image} alt={author.name} className="w-20 h-20 rounded-full object-cover bg-gray-100 flex-shrink-0" />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs flex-shrink-0">No image</div>
              )}
              <div className="min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">{author.name}</h3>
                {author.email ? <p className="text-xs text-gray-500 truncate">{author.email}</p> : null}
                {author.bio ? <p className="text-sm text-gray-600 mt-2 line-clamp-3">{author.bio}</p> : null}
                <p className="text-xs text-gray-500 mt-2">
                  {(booksByAuthor[author.id] || []).length} book{(booksByAuthor[author.id] || []).length === 1 ? "" : "s"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
