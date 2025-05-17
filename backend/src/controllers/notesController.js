import Note from "../../models/Notes.js";

export async function getAllNotes(_, res) {
  try {
    const notes = await Note.find().sort({createdAt:-1});// pour afficher le dernier enregistrer, -1 wil sort in desc . order (newest first)
    res.status(200).json(notes);
  } catch (error) {
    console.error("error in getallnotes controller", error);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });

    const savedNote = await newNote.save();
    res.status(200).json(savedNote);
  } catch (error) {
    console.error("error in createnote controller ", error);
    res.status(500).json({ message: "internal sever error" });
  }
}

export async function getNoteById (req,res) {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({message: "Note not found !"});
        }
        res.json(note);
    } catch (error) {
        console.error("error in getnotebyId controller ", error);
        res.status(500).json({ message: "internal sever error" });
    }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      {
        new: true,
      }
    );
    if (!updatedNote)
      return res.status(404).json({ message: "note not found!" });

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("error in updatenote controller ", error);
    res.status(500).json({ message: "internal sever error" });
  }
}

export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(
      req.params.id,
      
    );
    if (!deletedNote) {
      return res.status(404).json({ message: "note not found!" });
    }
    res.status(200).json({ message: "note deleted!" });
  } catch (error) {
    console.error("error in deletenote controller ", error);
    res.status(500).json({ message: "internal sever error" });
  }
}
