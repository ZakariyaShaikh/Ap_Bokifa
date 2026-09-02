import crypto from "crypto";

export const generateTemporaryPassword = () => {
    return crypto.randomBytes(10).toString('base64').replace("/a-zA-Z0-9/g" , "").slice(0, 10)
};

export const generateOtp = () => {
    return crypto.randomInt(100000, 1000000).toString()
}