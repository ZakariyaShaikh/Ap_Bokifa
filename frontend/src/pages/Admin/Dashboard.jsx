import { Users, BookOpen, FileText, Eye, User } from "lucide-react";
import { useAuthors } from "../../context/admin/AuthorContext";
import { useBooks } from "../../context/admin/BooksContext";
import { useBlogs } from "../../context/admin/BlogContext";
import { useEffect } from "react";

const StatCard = ({ title, value, icon: Icon }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <span className="text-sm font-medium text-gray-500">{title}</span>
      <div className="w-10 h-10 rounded-lg bg-[#0f5a45]/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-[#0f5a45]" />
      </div>
    </div>
    <div className="text-2xl font-bold text-gray-900">{value}</div>
  </div>
);

export default function Dashboard() {
  const { authors, loading: authorsLoading, error: authorsError, fetchAuthors } = useAuthors();
  const { books, loading: booksLoading, error: booksError, fetchBooks } = useBooks();
  const { blogs, loading: blogsLoading, error: blogsError, fetchBlogs } = useBlogs();

  useEffect(() => {
    fetchAuthors();
    fetchBooks();
    fetchBlogs();
  }, [fetchAuthors, fetchBooks, fetchBlogs]);

  const loading = authorsLoading || booksLoading || blogsLoading;
  const authorList = Array.isArray(authors) ? authors : [];
  const bookList = Array.isArray(books) ? books : [];
  const blogList = Array.isArray(blogs) ? blogs : [];
  const authorCount = authorList.length;
  const bookCount = bookList.length;
  const blogCount = blogList.length;
  const publishedCount = blogList.filter((b) => b.status === "published").length;

  const authorNameById = {};
  authorList.forEach((a) => { authorNameById[a.id] = a.name; });
  const resolveAuthorName = (book) =>
    book.author_name || authorNameById[book.author_id] || "—";

  const recentAuthors = authorList.slice(0, 5);
  const recentBooks = bookList.slice(0, 6);

  if (loading) return <div className="text-center py-10">Loading dashboard...</div>;

  const fmtDate = (d) => {
    if (!d) return "—";
    try { return new Date(d).toLocaleDateString(); } catch { return "—"; }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Authors" value={authorCount} icon={Users} />
        <StatCard title="Total Books" value={bookCount} icon={BookOpen} />
        <StatCard title="Total Blogs" value={blogCount} icon={FileText} />
        <StatCard title="Published" value={publishedCount} icon={Eye} />
      </div>

      {(authorsError || booksError || blogsError) && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          {authorsError && <p>Failed to load authors: {authorsError}</p>}
          {booksError && <p>Failed to load books: {booksError}</p>}
          {blogsError && <p>Failed to load blogs: {blogsError}</p>}
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Authors</h2>
          <span className="text-sm text-gray-500">{authorCount} total</span>
        </div>
        {authorsLoading ? (
          <p className="px-6 py-8 text-center text-gray-500">Loading authors...</p>
        ) : authorsError ? (
          <p className="px-6 py-8 text-center text-red-600">Failed to load authors</p>
        ) : recentAuthors.length === 0 ? (
          <p className="px-6 py-8 text-center text-gray-500">No data available</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {recentAuthors.map((author) => (
              <li key={author.id} className="px-6 py-4 flex items-center gap-4">
                {author.profile_image ? (
                  <img src={author.profile_image} alt={author.name} className="w-10 h-10 rounded-full object-cover bg-gray-100" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{author.name}</p>
                  <p className="text-sm text-gray-500 truncate">{author.email || "—"}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Books</h2>
          <span className="text-sm text-gray-500">{bookCount} total</span>
        </div>
        {booksLoading ? (
          <p className="px-6 py-8 text-center text-gray-500">Loading books...</p>
        ) : booksError ? (
          <p className="px-6 py-8 text-center text-red-600">Failed to load books</p>
        ) : recentBooks.length === 0 ? (
          <p className="px-6 py-8 text-center text-gray-500">No data available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
            {recentBooks.map((book) => (
              <div key={book.id} className="border border-gray-200 rounded-lg p-4 flex gap-3">
                {book.cover_image ? (
                  <img src={book.cover_image} alt={book.title} className="w-14 h-20 rounded object-cover bg-gray-100" />
                ) : (
                  <div className="w-14 h-20 rounded bg-gray-100 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-gray-400" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{book.title}</p>
                  <p className="text-sm text-gray-500 truncate">{resolveAuthorName(book)}</p>
                  <p className="text-sm font-medium text-gray-900 mt-1">{book.price != null ? `$${book.price}` : "—"}</p>
                  {book.publication_date && (
                    <p className="text-xs text-gray-400 mt-1">{fmtDate(book.publication_date)}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}