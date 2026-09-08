import db from "../config/db.js";

// Get all books
export const getAllBooks = async () => {

    const [result] = await db.query(
        "CALL sp_get_all_books()"
    );

    return result[0];
};


// Get single book
export const getBookById = async (bookId) => {

    const [result] = await db.query(
        "CALL sp_get_book_by_id(?)",
        [bookId]
    );

    return result[0][0];
};

export const updateBook = async (
    bookId,
    title,
    price,
    description,
    publicationDate,
    coverImage,
    authorId
) => {

    const [result] = await db.query(
        "CALL sp_update_book(?, ?, ?, ?, ?, ?, ?)",
        [
            bookId,
            title,
            price,
            description,
            publicationDate,
            coverImage,
            authorId
        ]
    );

    return result;
};

export const deleteBook = async (bookId) => {

    const [result] = await db.query(
        "CALL sp_delete_book(?)",
        [bookId]
    );

    return result;
};