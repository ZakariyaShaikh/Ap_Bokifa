import imagekit from "../config/imageKit.js";

export const uploadToImageKit = async (file, folder) => {

    const result = await imagekit.upload({
        file: file.buffer,

        fileName: `${Date.now()}-${file.originalname}`,

        folder: folder
    });

    return result.url;
};