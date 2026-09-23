import { useState } from "react";
import { Pencil, Trash2, Search, BookOpen } from "lucide-react";
import { useBooks } from "../../context/admin/BooksContext";
import { useAuthors } from "../../context/admin/AuthorContext";
import Modal from "../../components/admin/Modal";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import ImageUpload from "../../components/admin/ImageUpload";
import { useToast } from "../../components/admin/Toast";

function BooksSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Books</h1>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center text-gray-500">Loading books...</div>
    </div>
  );
}

function EmptyBooks() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
        <BookOpen className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">No data available</h3>
      <p className="text-gray-500">Books are added together with a new author.</p>
    </div>
  );
}
function BookEditForm({ book, authors, onSubmit, onClose }) {
  const { success, error } = useToast();
  const [title, setTitle] = useState(book?.title || "");
  const [price, setPrice] = useState(book?.price || "");
  const [authorId, setAuthorId] = useState(book?.author_id || "");
  const [desc, setDesc] = useState(book?.description || "");
  const [pubDate, setPubDate] = useState(book?.publication_date ? String(book.publication_date).slice(0, 10) : "");
  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) { setFormError("Title is required"); return; }
    if (!price) { setFormError("Price is required"); return; }
    if (!authorId) { setFormError("Author is required"); return; }
    setFormError(""); setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("title", title.trim());
      fd.append("price", price);
      fd.append("author_id", authorId);
      fd.append("description", desc || "");
      if (pubDate) fd.append("publication_date", pubDate);
      if (image) fd.append("book_image", image);
      await onSubmit(book.id, fd);
      success("Book updated successfully");
      onClose();
    } catch (err) { error(err?.response?.data?.message || "Failed to update book"); }
    finally { setSubmitting(false); }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <ImageUpload value={image} onChange={setImage} preview={book?.cover_image} label="Cover Image (optional)" />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5a45]" placeholder="Book title" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
          <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5a45]" placeholder="0.00" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Publication Date</label>
          <input type="date" value={pubDate} onChange={(e) => setPubDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5a45]" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Author *</label>
        <select value={authorId} onChange={(e) => setAuthorId(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5a45]">
          <option value="">Select author</option>
          {authors.map((a) => (<option key={a.id} value={a.id}>{a.name}</option>))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5a45] resize-none" placeholder="Book description" />
      </div>
      {formError && <p className="text-sm text-red-600">{formError}</p>}
      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
        <button type="submit" disabled={submitting} className="px-4 py-2 text-sm text-white bg-[#0f5a45] rounded-lg hover:bg-[#083f34] disabled:opacity-50">{submitting ? "Updating..." : "Update Book"}</button>
      </div>
    </form>
  );
}
export default function Books() {
  const { books, loading, error: booksError, fetchBooks, updateBook, deleteBook, getBook } = useBooks();
  const { authors } = useAuthors();
  const { success, error } = useToast();
  const [search, setSearch] = useState("");
  const [editBook, setEditBook] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [delId, setDelId] = useState(null);
  const [delOpen, setDelOpen] = useState(false);
  const [delLoading, setDelLoading] = useState(false);
  const authorNameById = {};
  (Array.isArray(authors) ? authors : []).forEach((a) => { authorNameById[a.id] = a.name; });
  const resolveAuthor = (b) => b.author_name || authorNameById[b.author_id] || "—";
  const filtered = (Array.isArray(books) ? books : []).filter((b) =>
    b.title?.toLowerCase().includes(search.toLowerCase()) ||
    resolveAuthor(b).toLowerCase().includes(search.toLowerCase())
  );
  const openEdit = async (b) => {
    try {
      const res = await getBook(b.id);
      if (res?.success) { setEditBook(res.data); setEditOpen(true); }
      else { setEditBook(b); setEditOpen(true); }
    } catch { setEditBook(b); setEditOpen(true); }
  };
  const handleUpdate = async (id, fd) => { await updateBook(id, fd); fetchBooks(); };
  const handleDelete = async () => {
    if (!delId) return;
    setDelLoading(true);
    try {
      await deleteBook(delId);
      success("Book deleted successfully");
      setDelOpen(false); setDelId(null);
    } catch (err) { error(err?.response?.data?.message || "Failed to delete book"); }
    finally { setDelLoading(false); }
  };
  if (loading) return <BooksSkeleton />;
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">Books</h1>
      </div>
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search books..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5a45]" />
      </div>
      {booksError && (<div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">Failed to load books: {booksError}</div>)}
      {filtered.length === 0 ? (<EmptyBooks />) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Book</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Author</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((book) => (
                  <tr key={book.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {book.cover_image ? (<img src={book.cover_image} alt={book.title} className="w-10 h-14 rounded object-cover bg-gray-100" />) : (<div className="w-10 h-14 rounded bg-gray-100 flex items-center justify-center"><BookOpen className="w-5 h-5 text-gray-400" /></div>)}
                        <div><p className="font-medium text-gray-900">{book.title}</p></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{resolveAuthor(book)}</td>
                    <td className="px-6 py-4 font-medium">${book.price}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => openEdit(book)} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-[#0f5a45] hover:bg-gray-100 rounded-lg"><Pencil className="w-4 h-4" /> Edit</button>
                        <button onClick={() => { setDelId(book.id); setDelOpen(true); }} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /> Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <Modal isOpen={editOpen} onClose={() => { setEditOpen(false); setEditBook(null); }} title="Edit Book" size="lg">
        {editBook && (<BookEditForm book={editBook} authors={Array.isArray(authors) ? authors : []} onSubmit={handleUpdate} onClose={() => { setEditOpen(false); setEditBook(null); }} />)}
      </Modal>
      <ConfirmDialog isOpen={delOpen} onClose={() => { setDelOpen(false); setDelId(null); }} onConfirm={handleDelete} title="Delete Book" message="Are you sure you want to delete this book? This cannot be undone." confirmText="Delete" loading={delLoading} />
    </div>
  );
}