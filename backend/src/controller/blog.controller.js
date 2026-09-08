import {
    createBlogService,
    getAllBlogsService,
    getBlogService,
    updateBlogService,
    deleteBlogService
} from "../services/blog.services.js";

export const createBlog = async (req, res) => {

    try {

        const {
            title,
            content,
            status
        } = req.body;

        const featuredImage = req.file;

        const result = await createBlogService({

            title,
            content,
            status,

            // IMPORTANT
            // Don't get this from req.body
            createdBy: req.user.id,

            featuredImage
        });

        res.status(201).json({
            success: true,
            message: "Blog created successfully",
            data: result
        });

    } catch (error) {

        console.log(
            "Create blog error:",
            error
        );

        res.status(
            error.statusCode || 500
        ).json({
            success: false,
            message:
                error.message ||
                "Internal server error"
        });
    }
};

export const getBlog = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await getBlogService(id);

        res.status(200).json({
            success: true,
            message: "Blog fetched successfully",
            data: result
        });

    } catch (error) {

        console.log(
            "Get blog error:",
            error
        );

        res.status(
            error.statusCode || 500
        ).json({
            success: false,
            message:
                error.message ||
                "Internal server error"
        });
    }
};

export const getAllBlogs = async (req, res) => {

    try {

        const result = await getAllBlogsService();

        res.status(200).json({
            success: true,
            message: "Blogs fetched successfully",
            data: result
        });

    } catch (error) {

        console.log(
            "Get all blogs error:",
            error
        );

        res.status(
            error.statusCode || 500
        ).json({
            success: false,
            message:
                error.message ||
                "Internal server error"
        });
    }
};

export const updateBlog = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            title,
            content,
            status
        } = req.body;

        const featuredImage = req.file;

        const result = await updateBlogService({

            blogId: id,
            title,
            content,
            status,
            featuredImage
        });

        res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            data: result
        });

    } catch (error) {

        console.log(
            "Update blog error:",
            error
        );

        res.status(
            error.statusCode || 500
        ).json({
            success: false,
            message:
                error.message ||
                "Internal server error"
        });
    }
};

export const deleteBlog = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await deleteBlogService(id);

        res.status(200).json({
            success: true,
            message: "Blog deleted successfully",
            data: result
        });

    } catch (error) {

        console.log(
            "Delete blog error:",
            error
        );

        res.status(
            error.statusCode || 500
        ).json({
            success: false,
            message:
                error.message ||
                "Internal server error"
        });
    }
};