import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { bookService } from "../../services/admin/api";

const BooksContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useBooks = () => {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error("useBooks must be used within a BooksProvider");
  }
  return context;
};

const normalizeList = (response) => {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  return [];
};

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await bookService.getAll();
      if (response?.success === false) {
        setBooks([]);
        setError(response?.message || "Failed to fetch books");
        return;
      }
      setBooks(normalizeList(response));
    } catch (err) {
      setBooks([]);
      setError(err?.response?.data?.message || err?.message || "Failed to fetch books");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBooks();
  }, [fetchBooks]);

  const updateBook = async (id, formData) => {
    const response = await bookService.update(id, formData);
    if (response.success) {
      setBooks((prev) =>
        prev.map((book) => (book.id === id ? response.data : book))
      );
    }
    return response;
  };

  const deleteBook = async (id) => {
    const response = await bookService.delete(id);
    if (response.success) {
      setBooks((prev) => prev.filter((book) => book.id !== id));
    }
    return response;
  };

  const getBook = async (id) => {
    const response = await bookService.getById(id);
    return response;
  };

  return (
    <BooksContext.Provider
      value={{
        books,
        loading,
        error,
        fetchBooks,
        updateBook,
        deleteBook,
        getBook,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};