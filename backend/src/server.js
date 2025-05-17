import express from "express"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001

connectDB();
// app.use("api/n")
app.listen(PORT, ()=> {
    console.log(`server running on ${PORT}`);
})
// mongodb+srv://joachimbangirahejb:iUMjYU2SrWjrKZUE@cluster0.kkmrqtb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0