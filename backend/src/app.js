import express from "express"
import dotenv from "dotenv";
import cors from "cors"
import authRoutes from './routes/auth.routes.js'
import authorRoutes from './routes/author.routes.js'
import bookRoutes from "./routes/book.routes.js"
import cookieParser from "cookie-parser";
import blogRoutes from "./routes/blog.routes.js";




dotenv.config()







export const app = express();



app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));



app.use("/api/auth/v1" , authRoutes)
app.use("/api/admin/author/v1" , authorRoutes)
app.use("/api/admin/books/v1" , bookRoutes)
app.use("/api/admin/blogs/v1" , blogRoutes)








app.get("/" , (req , res) => {
    res.send("Sever is live")
});




