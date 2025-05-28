import { Link } from "react-router"; // ✅ Corriger aussi ici (voir point 2)
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { formatDate } from "../lib/utils";
import  api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note ,setNotes }) => {
  if (!note) return null;

  const handleDelete = async (e,id) => {
    e.preventDefault() // to get rid of the navigation behaviour. once we click on the icon
                      // we can be redirecting , but if we click the card and its children, we will be redirecting
  if (!window.confirm("are you sure you want to delete this note? "))
    return;   
  try {
    await api.delete(`notes/${id}`);
    setNotes((prev) => prev.filter(note => note._id !== id))// get ride of the deleted one(on filter la liste en enlevant la note effacer)
    toast.success("note deleted successfully");
  } catch (error) {
    console.log("error in handledelete" , error);
    toast.error("Failed to delete note");
  }                
  }

  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00ff9d]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button className="btn btn-ghost btn-xs text-error" onClick={(e) => handleDelete(e,note._id)}>
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
