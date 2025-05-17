import mongoose from "mongoose";

//create a schema

const noteSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    {timestamps: true} // createdST, updateAt
);

//create model

const Note = mongoose.model("Note", noteSchema);

export default Note;
