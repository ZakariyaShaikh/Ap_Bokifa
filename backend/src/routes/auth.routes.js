import { changeTemPassword, login, register, verify } from "../controller/user.controller.js";
import express from "express";


 const route = express.Router();


route.post("/register" , register);
route.post("/login" , login);
route.post("/verify" , verify);
route.put("/change-tem" , changeTemPassword);

export default route;