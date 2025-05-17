import express from "express"
import { connectDB } from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";
import dotenv from "dotenv";
import rateLimiter from "./config/middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(rateLimiter);// ca doit etre toujours avent pour bien fonctionner
//middleware
app.use(express.json()); // this will parse bodies: req.body


app.use("/api/notes",notesRoutes);

connectDB().then(() => {
    app.listen(PORT, ()=> {
        console.log(`server running on ${PORT}`);
    });
});

