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