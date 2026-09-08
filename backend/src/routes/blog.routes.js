import express from "express";

import {
    createBlog,
    getAllBlogs,
    getBlog,
    updateBlog,
    deleteBlog
} from "../controller/blog.controller.js";

import {
    protect
} from "../middleware/auth.middleware.js";

import {
    adminOnly
} from "../middleware/admin.middleware.js";

import upload from "../config/multer.js";

const route = express.Router();


route.post(
    "/create",
    protect,
    adminOnly,
    upload.single("featured_image"),
    createBlog
);

route.put(
    "/update/:id",
    protect,
    adminOnly,
    upload.single("featured_image"),
    updateBlog
);

route.delete(
    "/delete/:id",
    protect,
    adminOnly,
    deleteBlog
);

route.get(
    "/:id",
    getBlog
);

route.get(
    "/",
    getAllBlogs
);

export default route;