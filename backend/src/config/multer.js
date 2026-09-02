import multer from "multer";
import path from "path";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {

    console.log("File name:", file.originalname);
    console.log("File MIME type:", file.mimetype);

    const allowedMimeTypes = [
        "image/jpeg",
        "image/png",
        "image/webp"
    ];

    const allowedExtensions = [
        ".jpg",
        ".jpeg",
        ".png",
        ".webp"
    ];

    const extension = path.extname(file.originalname).toLowerCase();

    if (
        allowedMimeTypes.includes(file.mimetype) ||
        (
            file.mimetype === "application/octet-stream" &&
            allowedExtensions.includes(extension)
        )
    ) {
        cb(null, true);
    } else {
        cb(
            new Error(
                "Only jpeg, png, and webp file types are allowed."
            ),
            false
        );
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

export default upload;