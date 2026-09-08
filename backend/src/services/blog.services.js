
import {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
} from "../model/blog.model.js";

import { uploadToImageKit } from "../utils/imageKit.upload.js";


// ===============================
// CREATE BLOG
// ===============================

export const createBlogService = async ({
    title,
    content,
    createdBy,
    status,
    featuredImage
}) => {

    // Validate title
    if (!title || title.trim() === "") {
        const error = new Error("Blog title is required");
        error.statusCode = 400;
        throw error;
    }

    // Validate content
    if (!content || content.trim() === "") {
        const error = new Error("Blog content is required");
        error.statusCode = 400;
        throw error;
    }

    // Validate authenticated user
    if (!createdBy) {
        const error = new Error("Authenticated user is required");
        error.statusCode = 401;
        throw error;
    }

    // Default status
    if (!status) {
        status = "draft";
    }

    // Validate status
    if (!["draft", "published"].includes(status)) {
        const error = new Error(
            "Status must be either draft or published"
        );
        error.statusCode = 400;
        throw error;
    }

    // Validate featured image
    if (!featuredImage) {
        const error = new Error("Featured image is required");
        error.statusCode = 400;
        throw error;
    }

    // Upload image to ImageKit
    const featuredImageUrl = await uploadToImageKit(
        featuredImage,
        "/ap-bokifa/blogs"
    );

    // Create blog in database
    const result = await createBlog(
        title.trim(),
        content.trim(),
        createdBy,
        status,
        featuredImageUrl
    );

    return result;
};


// ===============================
// GET SINGLE BLOG
// ===============================

export const getBlogService = async (blogId) => {

    // Validate blog ID
    if (!blogId) {
        const error = new Error("Blog ID is required");
        error.statusCode = 400;
        throw error;
    }

    // Get blog
    const blog = await getBlogById(blogId);

    // Blog not found
    if (!blog) {
        const error = new Error("Blog not found");
        error.statusCode = 404;
        throw error;
    }

    return blog;
};


// ===============================
// GET ALL BLOGS
// ===============================

export const getAllBlogsService = async () => {

    const blogs = await getAllBlogs();

    return blogs;
};


// ===============================
// UPDATE BLOG
// ===============================

export const updateBlogService = async ({
    blogId,
    title,
    content,
    status,
    featuredImage
}) => {

    // Validate blog ID
    if (!blogId) {
        const error = new Error("Blog ID is required");
        error.statusCode = 400;
        throw error;
    }

    // Validate title
    if (!title || title.trim() === "") {
        const error = new Error("Blog title is required");
        error.statusCode = 400;
        throw error;
    }

    // Validate content
    if (!content || content.trim() === "") {
        const error = new Error("Blog content is required");
        error.statusCode = 400;
        throw error;
    }

    // Validate status
    if (!status || !["draft", "published"].includes(status)) {
        const error = new Error(
            "Status must be either draft or published"
        );
        error.statusCode = 400;
        throw error;
    }

    // Check whether blog exists
    const existingBlog = await getBlogById(blogId);

    if (!existingBlog) {
        const error = new Error("Blog not found");
        error.statusCode = 404;
        throw error;
    }

    // Keep existing image by default
    let featuredImageUrl = existingBlog.featured_image;

    // Upload new image only if provided
    if (featuredImage) {

        featuredImageUrl = await uploadToImageKit(
            featuredImage,
            "/ap-bokifa/blogs"
        );
    }

    // Update blog
    const result = await updateBlog(
        blogId,
        title.trim(),
        content.trim(),
        status,
        featuredImageUrl
    );

    return result;
};


// ===============================
// DELETE BLOG
// ===============================

export const deleteBlogService = async (blogId) => {

    // Validate blog ID
    if (!blogId) {
        const error = new Error("Blog ID is required");
        error.statusCode = 400;
        throw error;
    }

    // Check whether blog exists
    const existingBlog = await getBlogById(blogId);

    if (!existingBlog) {
        const error = new Error("Blog not found");
        error.statusCode = 404;
        throw error;
    }

    // Delete blog
    const result = await deleteBlog(blogId);

    return result;
};

