import { createAuthorService } from "../services/author.services.js";

export const createAuthor = async (req, res) => {

    try {


        const {
            name,
            bio,
            email
        } = req.body;



        const authorImage =
            req.files?.author_image?.[0];


        const bookImages =
            req.files?.book_images || [];


        let books;

        try {

            books = JSON.parse(req.body.books);

        } catch (error) {

            const err = new Error(
                "Books must be valid JSON"
            );

            err.statusCode = 400;

            throw err;
        }


        const result = await createAuthorService({
            name,
            bio,
            email,
            authorImage,
            bookImages,
            books
        });



        res.status(201).json({
            success: true,
            message: "Author and books created successfully",
            data: result
        });

    } catch (error) {

        console.log(
            "Create author error:",
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