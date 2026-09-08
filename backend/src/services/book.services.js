import {
    deleteBook,
    getAllBooks,
    getBookById,
    updateBook
} from "../model/book.model.js";
import { uploadToImageKit } from "../utils/imageKit.upload.js";


// Get all books
export const getAllBooksService = async () => {

    const books = await getAllBooks();

    return books;
};


// Get single book
export const getBookService = async (bookId) => {

    if (!bookId) {

        const error = new Error(
            "Book ID is required"
        );

        error.statusCode = 400;

        throw error;
    }


    const book = await getBookById(
        bookId
    );


    if (!book) {

        const error = new Error(
            "Book not found"
        );

        error.statusCode = 404;

        throw error;
    }


    return book;
};

export const updateBookService = async ({
    bookId,
    title,
    price,
    description,
    publicationDate,
    authorId,
    bookImage
}) => {

    if (!bookId) {
        const error = new Error("Book ID is required");
        error.statusCode = 400;
        throw error;
    }

    if (!title || title.trim() === "") {
        const error = new Error("Book title is required");
        error.statusCode = 400;
        throw error;
    }

    if (!price) {
        const error = new Error("Book price is required");
        error.statusCode = 400;
        throw error;
    }

    if (!authorId) {
        const error = new Error("Author ID is required");
        error.statusCode = 400;
        throw error;
    }

    // Get existing book
    const existingBook = await getBookById(bookId);

    if (!existingBook) {
        const error = new Error("Book not found");
        error.statusCode = 404;
        throw error;
    }

    let coverImage = existingBook.cover_image;

    // Upload new image only if user provided one
    if (bookImage) {
        coverImage = await uploadToImageKit(
            bookImage,
            "/ap-bokifa/books"
        );
    }

    const result = await updateBook(
        bookId,
        title,
        price,
        description,
        publicationDate,
        coverImage,
        authorId
    );

    return result;
};

export const deleteBookService = async (bookId) => {

    if (!bookId) {
        const error = new Error("Book ID is required");
        error.statusCode = 400;
        throw error;
    }

    const existingBook = await getBookById(bookId);

    if (!existingBook) {
        const error = new Error("Book not found");
        error.statusCode = 404;
        throw error;
    }

    const result = await deleteBook(bookId);

    return result;
};