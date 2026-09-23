

import { useBlogs } from "../context/admin/BlogContext";

const fmtDate = (d) => {
  if (!d) return "";
  try {
    return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return "";
  }
};

export const Blogs = () => {
  const { blogs, loading, error } = useBlogs();
  const list = Array.isArray(blogs) ? blogs : [];

  return (
    <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[50vh]">
      <h1 className="text-3xl font-serif text-gray-900 mb-8">Blogs</h1>
      {loading ? (
        <p className="text-center text-gray-500 py-8">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-600 py-8">{error}</p>
      ) : list.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No data available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((blog) => (
            <article key={blog.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
              {blog.featured_image ? (
                <img src={blog.featured_image} alt={blog.title} className="w-full aspect-[3/2] object-cover bg-gray-100" />
              ) : (
                <div className="w-full aspect-[3/2] bg-gray-100 flex items-center justify-center text-gray-400 text-sm">No image</div>
              )}
              <div className="p-5">
                <p className="text-[11px] font-bold tracking-widest uppercase text-gray-500">
                  {[blog.status, fmtDate(blog.created_at)].filter(Boolean).join(" / ")}
                </p>
                <h3 className="text-xl font-serif text-gray-900 mt-2 line-clamp-2">{blog.title}</h3>
                {blog.content ? (
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">{blog.content}</p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
