import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Search, Eye, FileText, User, Calendar, X } from "lucide-react";
import Modal from "../../components/admin/Modal";
import ImageUpload from "../../components/admin/ImageUpload";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import { useToast } from "../../components/admin/Toast";
import { useBlogs } from "../../context/admin/BlogContext";

const STATUS_OPTS = [
  { value: "", label: "All Statuses" },
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
];

function fmtDate(d) {
  if (!d) return "—";
  try { return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }); }
  catch { return "—"; }
}

function BlogsSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="animate-pulse">
        <div className="bg-gray-50 px-6 py-4">
          <div className="flex gap-4">
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-4 w-16 bg-gray-200 rounded" />
            <div className="h-4 w-20 bg-gray-200 rounded" />
            <div className="h-4 w-16 bg-gray-200 rounded" />
          </div>
        </div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="px-6 py-4 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded bg-gray-200" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-48 bg-gray-200 rounded" />
                <div className="h-3 w-32 bg-gray-200 rounded" />
              </div>
              <div className="h-6 w-16 bg-gray-200 rounded-full" />
              <div className="h-4 w-16 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EmptyState({ onAdd }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
        <FileText className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">No data available</h3>
      <p className="text-gray-500 mb-4">Get started by writing your first blog post.</p>
      <button onClick={onAdd} className="inline-flex items-center gap-2 px-4 py-2 bg-[#0f5a45] text-white rounded-lg hover:bg-[#083f34] transition-colors">
        <Plus className="w-4 h-4" /> Add Blog
      </button>
    </div>
  );
}
function BlogForm({ blog, onClose, isEditing }) {
  const { success, error } = useToast();
  const { createBlog, updateBlog } = useBlogs();
  const [formData, setFormData] = useState({
    title: blog?.title || "",
    content: blog?.content || "",
    status: blog?.status || "draft",
  });
  const [featuredImage, setFeaturedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(blog?.featured_image || null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e = {};
    if (!formData.title.trim()) e.title = "Title is required";
    if (!formData.content.trim()) e.content = "Content is required";
    if (!featuredImage && !imagePreview) e.image = "Featured image is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("title", formData.title.trim());
      fd.append("content", formData.content.trim());
      fd.append("status", formData.status);
      if (featuredImage) fd.append("featured_image", featuredImage);
      
      if (isEditing && blog?.id) {
        await updateBlog(blog.id, fd);
        success("Blog updated successfully");
      } else {
        await createBlog(fd);
        success("Blog created successfully");
      }
      onClose(true);
    } catch (err) {
      error(err?.response?.data?.message || "Failed to save blog");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title <span className="text-red-500">*</span></label>
        <input type="text" value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter blog title"
          className={`w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5a45] ${errors.title ? "border-red-300" : "border-gray-300"}`}
        />
        {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Content <span className="text-red-500">*</span></label>
        <textarea value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          placeholder="Write your blog content here..." rows={12}
          className={`w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5a45] resize-y ${errors.content ? "border-red-300" : "border-gray-300"}`}
        />
        {errors.content && <p className="text-sm text-red-600 mt-1">{errors.content}</p>}
        <p className="text-xs text-gray-400 mt-1">{formData.content.length} characters</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Status <span className="text-red-500">*</span></label>
        <select value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5a45]"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        <p className="text-xs text-gray-400 mt-1">Drafts are not visible to readers until published.</p>
      </div>
      <div>
        <ImageUpload
          value={featuredImage}
          onChange={(f) => { setFeaturedImage(f); setImagePreview(null); }}
          preview={imagePreview}
          label="Featured Image"
          error={errors.image}
        />
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onClose} disabled={submitting}
          className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors">
          Cancel
        </button>
        <button type="submit" disabled={submitting}
          className="px-6 py-2.5 text-sm font-medium text-white bg-[#0f5a45] rounded-lg hover:bg-[#083f34] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2">
          {submitting && (
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          )}
          {isEditing ? "Update Blog" : "Create Blog"}
        </button>
      </div>
    </form>
  );
}

function BlogView({ blog, onClose }) {
  if (!blog) return null;
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{blog.title}</h2>
          <div className="flex items-center gap-3 mt-2">
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${blog.status === "published" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
              {blog.status}
            </span>
            <span className="text-sm text-gray-500">{blog.author_name || "Unknown"}</span>
          </div>
        </div>
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>
      {blog.featured_image && (
        <div className="rounded-xl overflow-hidden border border-gray-200">
          <img src={blog.featured_image} alt={blog.title} className="w-full h-72 object-cover"
            onError={(e) => { e.target.style.display = "none"; }} />
        </div>
      )}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{blog.content}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-1"><User className="w-4 h-4" /> Created By</div>
          <p className="font-medium text-gray-900">{blog.author_name || "—"}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-1"><Calendar className="w-4 h-4" /> Created</div>
          <p className="font-medium text-gray-900">{fmtDate(blog.created_at)}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-1"><Calendar className="w-4 h-4" /> Updated</div>
          <p className="font-medium text-gray-900">{fmtDate(blog.updated_at)}</p>
        </div>
      </div>
    </div>
  );
}


export default function Blogs() {
  const { success, error } = useToast();
  const { blogs, loading, error: blogsError, fetchBlogs, deleteBlog } = useBlogs();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isDelOpen, setIsDelOpen] = useState(false);
  const [delId, setDelId] = useState(null);
  const [delLoading, setDelLoading] = useState(false);

  useEffect(() => {
    if (blogsError) error("Failed to load blogs. Please try again.");
  }, [blogsError, error]);

  const filtered = blogs.filter((b) => {
    const mS = !searchQuery
      || b.title?.toLowerCase().includes(searchQuery.toLowerCase())
      || b.author_name?.toLowerCase().includes(searchQuery.toLowerCase());
    const mF = !statusFilter || b.status === statusFilter;
    return mS && mF;
  });

  const openCreate = () => { setSelected(null); setIsCreateOpen(true); };
  const openEdit   = (b) => { setSelected(b); setIsEditOpen(true); };
  const openView   = (b) => { setSelected(b); setIsViewOpen(true); };
  const openDelete = (b) => { setSelected(b); setDelId(b.id); setIsDelOpen(true); };

  const handleDelete = async () => {
    setDelLoading(true);
    try {
      await deleteBlog(delId);
      success("Blog deleted successfully");
      setIsDelOpen(false);
      setSelected(null);
      setDelId(null);
    } catch (err) {
      error(err?.response?.data?.message || "Failed to delete blog");
    } finally {
      setDelLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">Blogs</h1>
        <button onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0f5a45] text-white rounded-lg hover:bg-[#083f34] transition-colors text-sm font-medium">
          <Plus className="w-4 h-4" /> Add Blog
        </button>
      </div>

      
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title or author..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5a45] focus:border-transparent text-sm"
          />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5a45] focus:border-transparent text-sm bg-white">
          {STATUS_OPTS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      
      {loading ? (
        <BlogsSkeleton />
      ) : blogsError ? (
        <div className="bg-white rounded-xl border border-red-200 shadow-sm p-12 text-center text-red-600">
          {blogsError}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState onAdd={openCreate} />
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((blog) => (
                  <tr key={blog.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {blog.featured_image ? (
                          <img src={blog.featured_image} alt={blog.title}
                            className="w-10 h-10 rounded-lg bg-gray-100 object-cover flex-shrink-0"
                            onError={(e) => { e.target.style.display = "none"; }} />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                            <FileText className="w-5 h-5 text-gray-400" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <button onClick={() => openView(blog)}
                            className="font-medium text-gray-900 hover:text-[#0f5a45] hover:underline transition-colors text-left block truncate max-w-xs">
                            {blog.title}
                          </button>
                          {blog.content && (
                            <p className="text-sm text-gray-500 truncate max-w-xs">
                              {String(blog.content).replace(/<[^>]*>/g, "").substring(0, 80)}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <User className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm truncate">{blog.author_name || "—"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${blog.status === "published" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                        {blog.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm whitespace-nowrap">{fmtDate(blog.created_at)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openView(blog)} title="View"
                          className="p-2 text-gray-400 hover:text-[#0f5a45] hover:bg-gray-100 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => openEdit(blog)} title="Edit"
                          className="p-2 text-gray-400 hover:text-[#0f5a45] hover:bg-gray-100 rounded-lg transition-colors">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => openDelete(blog)} title="Delete"
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      
      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Create New Blog" size="lg">
        <BlogForm blog={null} onClose={() => { setIsCreateOpen(false); fetchBlogs(); }} isEditing={false} />
      </Modal>

      
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Blog" size="lg">
        <BlogForm blog={selected} onClose={() => { setIsEditOpen(false); fetchBlogs(); }} isEditing={true} />
      </Modal>

      
      <Modal isOpen={isViewOpen} onClose={() => setIsViewOpen(false)} title="Blog Details" size="xl">
        <BlogView blog={selected} onClose={() => setIsViewOpen(false)} />
      </Modal>

      
      <ConfirmDialog
        isOpen={isDelOpen}
        onClose={() => { setIsDelOpen(false); setSelected(null); setDelId(null); }}
        onConfirm={handleDelete}
        title="Delete Blog"
        message={`Are you sure you want to delete "${selected?.title || "this blog"}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        loading={delLoading}
      />
    </div>
  );
}


