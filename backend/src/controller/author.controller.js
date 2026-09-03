import { createAuthorService, getAllAuthorsService, getAuthorService, updateAuthorService } from "../services/author.services.js";

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

export const getAuthor = async (req, res) => {

    try {

        const { id } = req.params;


        const result = await getAuthorService(
            id
        );


        res.status(200).json({
            success: true,
            message: "Author fetched successfully",
            data: result
        });


    } catch (error) {

        console.log(
            "Get author error:",
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

export const updateAuthor = async (req, res) => {

    try {

        const { id } = req.params;


        const {
            name,
            bio,
            email
        } = req.body;


        const authorImage = req.file;


        const result = await updateAuthorService({
            authorId: id,
            name,
            bio,
            email,
            authorImage
        });


        res.status(200).json({
            success: true,
            message: "Author updated successfully",
            data: result
        });


    } catch (error) {

        console.log(
            "Update author error:",
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

export const getAllAuthors = async (req, res) => {

    try {

        const result = await getAllAuthorsService();


        res.status(200).json({
            success: true,
            message: "Authors fetched successfully",
            data: result
        });


    } catch (error) {

        console.log(
            "Get all authors error:",
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

