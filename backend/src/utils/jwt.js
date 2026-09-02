import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()

export const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_REFRESH_SECRET_KEY,
    {
      expiresIn: "7d",
    },
  );
};

export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_ACCESS_SECRET_KEY,
    {
      expiresIn: "15m",
    },
  );
};
