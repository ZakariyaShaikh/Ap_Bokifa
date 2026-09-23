import { useState } from "react";
import { Plus, Pencil, Search, User, Mail, BookOpen, Trash2 } from "lucide-react";
import { useAuthors } from "../../context/admin/AuthorContext";
import Modal from "../../components/admin/Modal";
import ImageUpload from "../../components/admin/ImageUpload";
import { useToast } from "../../components/admin/Toast";

function AuthorsSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="animate-pulse">
        <div className="bg-gray-50 px-6 py-3">
          <div className="flex gap-4">
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
          </div>
        </div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="px-6 py-4 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-200"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                <div className="h-3 w-48 bg-gray-200 rounded"></div>
              </div>
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
        <User className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">No data available</h3>
      <p className="text-gray-500 mb-4">Get started by adding your first author.</p>
      <button onClick={onAdd} className="inline-flex items-center gap-2 px-4 py-2 bg-[#0f5a45] text-white rounded-lg hover:bg-[#083f34] transition-colors">
        <Plus className="w-4 h-4" /> Add Author
      </button>
    </div>
  );
}function BookInput({ book, index, onChange, onRemove, image, onImageChange, errors }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-medium text-gray-700">Book {index + 1}</h4>
        <button type="button" onClick={onRemove} className="text-red-500 hover:text-red-600 p-1 hover:bg-red-50 rounded transition-colors">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Book Image <span className="text-red-500">*</span></label>
          <ImageUpload value={image} onChange={onImageChange} error={errors?.image} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title <span className="text-red-500">*</span></label>
          <input type="text" value={book.title || ""} onChange={(e) => onChange("title", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5a45] ${errors?.title ? "border-red-300" : "border-gray-300"}`}
            placeholder="Enter book title" />
          {errors?.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price <span className="text-red-500">*</span></label>
          <input type="number" step="0.01" value={book.price || ""} onChange={(e) => onChange("price", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5a45] ${errors?.price ? "border-red-300" : "border-gray-300"}`}
            placeholder="0.00" />
          {errors?.price && <p className="text-sm text-red-600 mt-1">{errors.price}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Publication Date <span className="text-red-500">*</span></label>
          <input type="date" value={book.publication_date || ""} onChange={(e) => onChange("publication_date", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5a45] ${errors?.publication_date ? "border-red-300" : "border-gray-300"}`} />
          {errors?.publication_date && <p className="text-sm text-red-600 mt-1">{errors.publication_date}</p>}
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description <span className="text-red-500">*</span></label>
          <textarea value={book.description || ""} onChange={(e) => onChange("description", e.target.value)} rows={3}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5a45] resize-none ${errors?.description ? "border-red-300" : "border-gray-300"}`}
            placeholder="Enter book description" />
          {errors?.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
        </div>
      </div>
    </div>
  );
}
function AuthorForm({ author, onSubmit, onClose, isEditing = false }) {
  const { success, error } = useToast();
  const [formData, setFormData] = useState({ name: author?.name || "", email: author?.email || "", bio: author?.bio || "" });
  const [authorImage, setAuthorImage] = useState(null);
  const [books, setBooks] = useState(author?.books || []);
  const [bookImages, setBookImages] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) setFormErrors((prev) => ({ ...prev, [field]: null }));
  };

  const addBook = () => {
    setBooks((prev) => [...prev, { title: "", price: "", description: "", publication_date: "" }]);
    setBookImages((prev) => [...prev, null]);
  };

  const removeBook = (index) => {
    setBooks((prev) => prev.filter((_, i) => i !== index));
    setBookImages((prev) => prev.filter((_, i) => i !== index));
  };

  const updateBook = (index, field, value) => {
    setBooks((prev) => prev.map((book, i) => (i === index ? { ...book, [field]: value } : book)));
    if (formErrors[`book_${index}`]?.[field]) {
      setFormErrors((prev) => ({ ...prev, [`book_${index}`]: { ...prev[`book_${index}`], [field]: null } }));
    }
  };

  const updateBookImage = (index, file) => {
    setBookImages((prev) => prev.map((img, i) => (i === index ? file : img)));
    if (formErrors[`book_${index}`]?.image) {
      setFormErrors((prev) => ({ ...prev, [`book_${index}`]: { ...prev[`book_${index}`], image: null } }));
    }
  };
  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Author name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = "Invalid email format";

    if (!isEditing) {
      if (!authorImage) errors.authorImage = "Author image is required";
      if (books.length === 0) errors.books = "At least one book is required";
      else {
        books.forEach((book, index) => {
          const bookErrors = {};
          if (!book.title?.trim()) bookErrors.title = "Title is required";
          if (!book.price) bookErrors.price = "Price is required";
          if (!book.description?.trim()) bookErrors.description = "Description is required";
          if (!book.publication_date) bookErrors.publication_date = "Publication date is required";
          if (!bookImages[index]) bookErrors.image = "Book image is required";
          if (Object.keys(bookErrors).length > 0) errors[`book_${index}`] = bookErrors;
        });
      }
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      if (isEditing) {
        const fd = new FormData();
        fd.append("name", formData.name);
        fd.append("email", formData.email);
        fd.append("bio", formData.bio || "");
        if (authorImage) fd.append("author_image", authorImage);
        await onSubmit(author.id, fd);
        success("Author updated successfully");
      } else {
        const fd = new FormData();
        fd.append("name", formData.name);
        fd.append("email", formData.email);
        fd.append("bio", formData.bio || "");
        fd.append("author_image", authorImage);
        fd.append("books", JSON.stringify(books));
        bookImages.forEach((img) => fd.append("book_images", img));
        await onSubmit(fd);
        success("Author created successfully");
      }
      onClose();
    } catch (err) {
      error(err.response?.data?.message || "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Author Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Image {isEditing ? "(optional)" : <span className="text-red-500">*</span>}
            </label>
            <ImageUpload value={authorImage} onChange={setAuthorImage} preview={author?.profile_image} circular error={formErrors.authorImage} />
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name <span className="text-red-500">*</span></label>
              <input type="text" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5a45] ${formErrors.name ? "border-red-300" : "border-gray-300"}`} placeholder="Author name" />
              {formErrors.name && <p className="text-sm text-red-600 mt-1">{formErrors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
              <input type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5a45] ${formErrors.email ? "border-red-300" : "border-gray-300"}`} placeholder="author@example.com" />
              {formErrors.email && <p className="text-sm text-red-600 mt-1">{formErrors.email}</p>}
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea value={formData.bio} onChange={(e) => handleInputChange("bio", e.target.value)} rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5a45] resize-none" placeholder="Brief author biography..." />
          </div>
        </div>
      </div>
      {!isEditing && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Books</h3>
            <button type="button" onClick={addBook} className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-[#0f5a45] border border-[#0f5a45] rounded-lg hover:bg-[#0f5a45] hover:text-white transition-colors">
              <Plus className="w-4 h-4" /> Add Book
            </button>
          </div>
          {formErrors.books && <p className="text-sm text-red-600 mb-4">{formErrors.books}</p>}
          <div className="space-y-4">
            {books.map((book, index) => (
              <BookInput key={index} book={book} index={index} image={bookImages[index]}
                onChange={(field, value) => updateBook(index, field, value)}
                onImageChange={(file) => updateBookImage(index, file)}
                onRemove={() => removeBook(index)} errors={formErrors[`book_${index}`]} />
            ))}
            {books.length === 0 && (
              <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                <BookOpen className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Add at least one book for this author</p>
              </div>
            )}
          </div>
        </div>
      )}
      {isEditing && author?.books?.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Books by this Author</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {author.books.map((book) => (
              <div key={book.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex gap-3">
                  <img src={book.cover_image || "/placeholder.png"} alt={book.title} className="w-16 h-20 rounded object-cover bg-gray-200" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">{book.title}</h4>
                    <p className="text-sm text-gray-500">${book.price}</p>
                    <p className="text-xs text-gray-400 mt-1">{new Date(book.publication_date).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">Note: Books can only be added when creating a new author.</p>
        </div>
      )}

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <button type="button" onClick={onClose} disabled={submitting} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">Cancel</button>
        <button type="submit" disabled={submitting} className="px-4 py-2 text-sm font-medium text-white bg-[#0f5a45] rounded-lg hover:bg-[#083f34] disabled:opacity-50 flex items-center gap-2">
          {submitting ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              {isEditing ? "Updating..." : "Creating..."}
            </>
          ) : (isEditing ? "Update Author" : "Create Author")}
        </button>
      </div>
    </form>
  );
}
export default function Authors() {
  const { authors, loading, error: contextError, fetchAuthors, fetchAuthor, createAuthor, updateAuthor } = useAuthors();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const { error } = useToast();

  const handleCreateAuthor = async (formData) => {
    await createAuthor(formData);
    fetchAuthors();
  };

  const handleUpdateAuthor = async (id, formData) => {
    await updateAuthor(id, formData);
    fetchAuthors();
  };

  const handleEditClick = async (author) => {
    try {
      const data = await fetchAuthor(author.id);
      if (data) {
        setSelectedAuthor(data);
        setIsEditModalOpen(true);
      } else {
        error("Failed to load author details");
      }
    } catch {
      error("Failed to load author details");
    }
  };

  const filteredAuthors = (Array.isArray(authors) ? authors : []).filter((author) =>
    author.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    author.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-semibold text-gray-900">Authors</h1>
        </div>
        <AuthorsSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">Authors</h1>
        <button onClick={() => setIsAddModalOpen(true)} className="inline-flex items-center gap-2 px-4 py-2 bg-[#0f5a45] text-white rounded-lg hover:bg-[#083f34] transition-colors">
          <Plus className="w-4 h-4" /> Add Author
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search authors..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5a45] focus:border-transparent" />
      </div>
      {contextError && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          Failed to load authors: {contextError}
        </div>
      )}
      {filteredAuthors.length === 0 && !loading ? (
        <EmptyState onAdd={() => setIsAddModalOpen(true)} />
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Books</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredAuthors.map((author) => (
                  <tr key={author.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={author.profile_image || "/placeholder.png"} alt={author.name}
                          className="w-10 h-10 rounded-full bg-gray-200 object-cover" />
                        <div>
                          <p className="font-medium text-gray-900">{author.name}</p>
                          {author.bio && <p className="text-sm text-gray-500 truncate max-w-xs">{author.bio}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-4 h-4" />
                        {author.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{author.books?.length ?? author.book_count ?? "—"} book{(author.books?.length ?? author.book_count) !== 1 ? "s" : ""}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <span>{author.created_at ? new Date(author.created_at).toLocaleDateString() : "—"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => handleEditClick(author)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-[#0f5a45] hover:bg-gray-100 rounded-lg transition-colors">
                        <Pencil className="w-4 h-4" /> Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Author Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Author" size="lg">
        <AuthorForm
          author={null}
          onSubmit={handleCreateAuthor}
          onClose={() => setIsAddModalOpen(false)}
          isEditing={false}
        />
      </Modal>

      {/* Edit Author Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => { setIsEditModalOpen(false); setSelectedAuthor(null); }}
        title="Edit Author"
        size="lg"
      >
        <AuthorForm
          author={selectedAuthor}
          onSubmit={handleUpdateAuthor}
          onClose={() => { setIsEditModalOpen(false); setSelectedAuthor(null); }}
          isEditing={true}
        />
      </Modal>
    </div>
  );
}

