import db from "../config/db.js";

export const createAuthorWithBooks = async (
    name,
    bio,
    email,
    profileImage,
    books
) => {

    const [result] = await db.query(
        "CALL sp_create_author_with_books(?, ?, ?, ?, ?)",
        [
            name,
            bio,
            email,
            profileImage,
            JSON.stringify(books)
        ]
    );

    return result[0][0];
};

export const getAuthorById = async (authorId) => {

    const [result] = await db.query(
        "CALL sp_get_author_by_id(?)",
        [authorId]
    );

    return result[0][0];
};


export const getAllAuthors = async () => {

    const [result] = await db.query(
        "CALL sp_get_all_authors()"
    );

    return result[0];
};

export const updateAuthor = async (
    authorId,
    name,
    bio,
    email,
    profileImage
) => {

    const [result] = await db.query(
        "CALL sp_update_author(?, ?, ?, ?, ?)",
        [
            authorId,
            name,
            bio,
            email,
            profileImage
        ]
    );

    return result;
};