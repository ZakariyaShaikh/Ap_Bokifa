import { app } from "./app.js";
import dotenv from "dotenv";
import db  from "./config/db.js";


dotenv.config();

const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    const connection = await db.getConnection();

    console.log("MySql connected successfully.");
    
    connection.release();

    app.listen(port, (req, res) => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error(`MySql server connection error : ${error.message}`);
  }
};

startServer();