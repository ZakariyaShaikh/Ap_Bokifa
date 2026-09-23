import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { blogService } from "../../services/admin/api";

const BlogContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useBlogs = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlogs must be used within a BlogProvider");
  }
  return context;
};

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await blogService.getAll();
      if (response?.success === false) {
        setBlogs([]);
        setError(response?.message || "Failed to fetch blogs");
        return;
      }
      if (Array.isArray(response)) setBlogs(response);
      else if (Array.isArray(response?.data)) setBlogs(response.data);
      else setBlogs([]);
    } catch (err) {
      setBlogs([]);
      setError(err?.response?.data?.message || err?.message || "Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBlogs();
  }, [fetchBlogs]);

  const createBlog = async (formData) => {
    const response = await blogService.create(formData);
    if (response?.success) await fetchBlogs();
    return response;
  };

  const updateBlog = async (id, formData) => {
    const response = await blogService.update(id, formData);
    if (response?.success) await fetchBlogs();
    return response;
  };

  const deleteBlog = async (id) => {
    const response = await blogService.delete(id);
    if (response?.success) {
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    }
    return response;
  };

  return (
    <BlogContext.Provider value={{ blogs, loading, error, fetchBlogs, createBlog, updateBlog, deleteBlog }}>
      {children}
    </BlogContext.Provider>
  );
};
