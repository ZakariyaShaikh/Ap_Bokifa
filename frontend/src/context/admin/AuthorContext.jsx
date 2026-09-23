import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { authorService } from "../../services/admin/api";

const AuthorContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthors = () => {
  const context = useContext(AuthorContext);
  if (!context) {
    throw new Error("useAuthors must be used within an AuthorProvider");
  }
  return context;
};

export const AuthorProvider = ({ children }) => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAuthors = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await authorService.getAll();
      if (response?.success === false) {
        setAuthors([]);
        setError(response?.message || "Failed to fetch authors");
        return;
      }
      if (Array.isArray(response)) setAuthors(response);
      else if (Array.isArray(response?.data)) setAuthors(response.data);
      else setAuthors([]);
    } catch (err) {
      setAuthors([]);
      setError(err?.response?.data?.message || err?.message || "Failed to fetch authors");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAuthors();
  }, [fetchAuthors]);

  const fetchAuthor = useCallback(async (id) => {
    try {
      const response = await authorService.getById(id);
      if (response.success) {
        return response.data;
      }
      return null;
    } catch (err) {
      setError(err?.message || "Failed to fetch author");
      return null;
    }
  }, []);

  const createAuthor = useCallback(async (formData) => {
    const response = await authorService.create(formData);
    if (response.success) {
      setAuthors((prev) => [...prev, response.data]);
    }
    return response;
  }, []);

  const updateAuthor = useCallback(async (id, formData) => {
    const response = await authorService.update(id, formData);
    if (response.success) {
      setAuthors((prev) =>
        prev.map((author) => (author.id === id ? response.data : author))
      );
    }
    return response;
  }, []);

  return (
    <AuthorContext.Provider
      value={{
        authors,
        loading,
        error,
        fetchAuthors,
        fetchAuthor,
        createAuthor,
        updateAuthor,
      }}
    >
      {children}
    </AuthorContext.Provider>
  );
};