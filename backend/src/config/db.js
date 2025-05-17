import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        
        console.log("mongodb connected succesfully")
    } catch (error) {
        console.log("error connecting to mongodb",error);
        process.exit(1) // exit with failure if we put zero it means succes
    }
}
