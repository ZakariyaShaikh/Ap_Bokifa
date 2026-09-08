import db from "../config/db.js";

export const createBlog = async (
    title,
    content,
    createdBy,
    status,
    featuredImage
) => {

    const [result] = await db.query(
        "CALL sp_create_blog(?, ?, ?, ?, ?)",
        [
            title,
            content,
            createdBy,
            status,
            featuredImage
        ]
    );

    return result[0][0];
};


export const getAllBlogs = async () => {

    const [result] = await db.query(
        "CALL sp_get_all_blogs()"
    );

    return result[0];
};


export const getBlogById = async (blogId) => {

    const [result] = await db.query(
        "CALL sp_get_blog_by_id(?)",
        [blogId]
    );

    return result[0][0];
};


export const updateBlog = async (
    blogId,
    title,
    content,
    status,
    featuredImage
) => {

    const [result] = await db.query(
        "CALL sp_update_blog(?, ?, ?, ?, ?)",
        [
            blogId,
            title,
            content,
            status,
            featuredImage
        ]
    );

    return result[0][0];
};


export const deleteBlog = async (blogId) => {

    const [result] = await db.query(
        "CALL sp_delete_blog(?)",
        [blogId]
    );

    return result[0][0];
};