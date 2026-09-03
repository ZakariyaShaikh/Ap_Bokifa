import express from "express";
import { createAuthor, getAllAuthors, getAuthor, updateAuthor } from "../controller/author.controller.js";
import upload from "../config/multer.js";

const route = express.Router();

route.post(
  "/create",
  upload.fields([
    {
      name: "author_image",
      maxCount: 1,
    },
    {
      name: "book_images",
      maxCount: 20,
    },
  ]),
  createAuthor,
);

route.put("/update/:id", upload.single("author_image"), updateAuthor);

route.get(
    "/:id",
    getAuthor
);

route.get(
    "/",
    getAllAuthors
);


export default route;

