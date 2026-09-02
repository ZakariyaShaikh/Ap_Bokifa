import { createAuthorWithBooks } from "../model/author.model.js";
import { uploadToImageKit } from "../utils/imageKit.upload.js";

export const createAuthorService = async ({
    name,
    bio,
    email,
    authorImage,
    bookImages,
    books
}) => {


    if (!name || name.trim() === "") {
        const error = new Error("Author name is required");
        error.statusCode = 400;
        throw error;
    }

    if (!email || email.trim() === "") {
        const error = new Error("Author email is required");
        error.statusCode = 400;
        throw error;
    }


    if (!Array.isArray(books) || books.length === 0) {
        const error = new Error("At least one book is required");
        error.statusCode = 400;
        throw error;
    }



    if (!authorImage) {
        const error = new Error("Author image is required");
        error.statusCode = 400;
        throw error;
    }


    if (!bookImages || bookImages.length !== books.length) {

        const error = new Error(
            "Number of book images must match number of books"
        );

        error.statusCode = 400;

        throw error;
    }



    const profileImageUrl = await uploadToImageKit(
        authorImage,
        "/ap-bokifa/authors"
    );



    const booksWithImages = [];

    for (let i = 0; i < books.length; i++) {

        const bookImageUrl = await uploadToImageKit(
            bookImages[i],
            "/ap-bokifa/books"
        );

        booksWithImages.push({
            ...books[i],
            cover_image: bookImageUrl
        });
    }



    const result = await createAuthorWithBooks(
        name,
        bio,
        email,
        profileImageUrl,
        booksWithImages
    );


    return result;
};