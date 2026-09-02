import express from "express"
import dotenv from "dotenv";
import cors from "cors"
import authRoutes from './routes/auth.routes.js'
import authorRoutes from './routes/author.routes.js'
import cookieParser from "cookie-parser";




dotenv.config()







export const app = express();



app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));



app.use("/api/auth/v1" , authRoutes)
app.use("/api/admin/author/v1" , authorRoutes)








app.get("/" , (req , res) => {
    res.send("Sever is live")
});




