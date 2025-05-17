import express from "express"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

connectDB();
// app.use("api/n")
app.listen(5001, ()=> {
    console.log(`server running on 5000`);
})
// mongodb+srv://joachimbangirahejb:iUMjYU2SrWjrKZUE@cluster0.kkmrqtb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0