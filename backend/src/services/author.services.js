import { createAuthorWithBooks, getAllAuthors, getAuthorById, updateAuthor } from "../model/author.model.js";
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

export const getAuthorService = async (authorId) => {

    if (!authorId) {

        const error = new Error(
            "Author ID is required"
        );

        error.statusCode = 400;

        throw error;
    }


    const author = await getAuthorById(
        authorId
    );


    if (!author) {

        const error = new Error(
            "Author not found"
        );

        error.statusCode = 404;

        throw error;
    }


    return author;
};

export const updateAuthorService = async ({
    authorId,
    name,
    bio,
    email,
    authorImage
}) => {

    // Validate author ID
    if (!authorId) {
        const error = new Error(
            "Author ID is required"
        );

        error.statusCode = 400;
        throw error;
    }


    // Validate name
    if (!name || name.trim() === "") {
        const error = new Error(
            "Author name is required"
        );

        error.statusCode = 400;
        throw error;
    }


    // Validate email
    if (!email || email.trim() === "") {
        const error = new Error(
            "Author email is required"
        );

        error.statusCode = 400;
        throw error;
    }


    // Get existing author
    const existingAuthor = await getAuthorById(
        authorId
    );


    if (!existingAuthor) {
        const error = new Error(
            "Author not found"
        );

        error.statusCode = 404;
        throw error;
    }


    // Keep existing image
    let profileImageUrl =
        existingAuthor.profile_image;


    // Replace image only if new image is provided
    if (authorImage) {

        profileImageUrl = await uploadToImageKit(
            authorImage,
            "/ap-bokifa/authors"
        );
    }


    // Update author
    const result = await updateAuthor(
        authorId,
        name,
        bio,
        email,
        profileImageUrl
    );


    return result;
};

export const getAllAuthorsService = async () => {

    const authors = await getAllAuthors();

    return authors;
};