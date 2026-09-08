import {
    deleteBookService,
    getAllBooksService,
    getBookService,
    updateBookService
} from "../services/book.services.js";


// Get all books
export const getAllBooks = async (req, res) => {

    try {

        const result =
            await getAllBooksService();


        res.status(200).json({
            success: true,
            message: "Books fetched successfully",
            data: result
        });


    } catch (error) {

        console.log(
            "Get all books error:",
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


// Get single book
export const getBook = async (req, res) => {

    try {

        const { id } = req.params;


        const result =
            await getBookService(id);


        res.status(200).json({
            success: true,
            message: "Book fetched successfully",
            data: result
        });


    } catch (error) {

        console.log(
            "Get book error:",
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


export const updateBook = async (req, res) => {
    try {

        const { id } = req.params;

        const {
            title,
            price,
            description,
            publication_date,
            author_id
        } = req.body;

        const bookImage =
            req.file;

        const result = await updateBookService({
            bookId: id,
            title,
            price,
            description,
            publicationDate: publication_date,
            authorId: author_id,
            bookImage
        });

        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: result
        });

    } catch (error) {

        console.log(
            "Update book error:",
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

export const deleteBook = async (req, res) => {
    try {

        const { id } = req.params;

        await deleteBookService(id);

        res.status(200).json({
            success: true,
            message: "Book deleted successfully"
        });

    } catch (error) {

        console.log(
            "Delete book error:",
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
