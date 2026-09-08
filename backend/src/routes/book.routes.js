import express from "express";

import {
    deleteBook,
    getAllBooks,
    getBook,
    updateBook
} from "../controller/book.controller.js";
import upload from "../config/multer.js";


const route = express.Router();


route.get(
    "/",
    getAllBooks
);


route.get(
    "/:id",
    getBook
);

route.put(
    "/update/:id",
    upload.single("book_image"),
    updateBook
);

route.delete(
    "/delete/:id",
    deleteBook
);


export default route;