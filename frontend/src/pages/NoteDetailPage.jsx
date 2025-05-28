// Importation des hooks React et outils de routing
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router"; // ✅ Corrigé ici

// Importation de l'instance Axios personnalisée
import api from "../lib/axios";

// Importation de la bibliothèque de notifications
import toast from "react-hot-toast";

// Importation des icônes
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const NoteDetailPage = () => {
  // Déclaration des états
  const [note, setNote] = useState(null); // Stocke les données de la note
  const [loading, setLoading] = useState(true); // Indique si la note est en cours de chargement
  const [saving, setSaving] = useState(false); // Peut être utilisé plus tard pour indiquer un enregistrement en cours

  const navigate = useNavigate(); // Pour rediriger l’utilisateur
  const { id } = useParams(); // Récupère l'ID de la note depuis l'URL

  // useEffect s'exécute lorsque le composant est monté
  useEffect(() => {
    const fetchNote = async () => {
      try {
        // Récupération des données de la note via l'API
        const res = await api.get(`/notes/${id}`);
        setNote(res.data); // Mise à jour de l'état "note"
      } catch (error) {
        console.log("Error in fetching note", error); // Affiche l'erreur en console
        toast.error("Failed to fetch the note"); // Affiche une notification d’erreur
      } finally {
        setLoading(false); // Fin du chargement dans tous les cas
      }
    };
    fetchNote(); // Appelle la fonction de récupération
  }, [id]);

  console.log({ id }); // Affiche l'ID dans la console pour le debug

  const handleDelete = async (e, id) => {
    e.preventDefault(); // to get rid of the navigation behaviour. once we click on the icon
    // we can be redirecting , but if we click the card and its children, we will be redirecting
    if (!window.confirm("are you sure you want to delete this note? ")) return;
    try {
      await api.delete(`notes/${id}`);

      toast.success("note deleted ");
      navigate("/");
    } catch (error) {
      console.log("error in handledelete", error);
      toast.error("Failed to delete note");
    }
  };

  const handleSave = async () => {
    if ((!note.title.trim() || !note.content.trim())) {
      toast.error("Please add a title or content");
      return;
    }
    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully  ");
      navigate("/");
    } catch (error) {
      console.log("Error saving the note :,error");
      toast.error("failed to update note");
    } finally {
      setSaving(false);
    }
  };

  // Si la note est encore en cours de chargement, affiche un spinner
  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Barre supérieure avec bouton retour et suppression */}
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="size-5" />
              Back to Notes
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline"
            >
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          {/* Formulaire d’édition de la note */}
          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered"
                  value={note?.title || ""} // ✅ Préviens les erreurs si note est null
                  // ✅ Ici, on met à jour la note de manière immuable :
                  // `...note` signifie "copier toutes les autres propriétés de l'objet note"
                  // Ensuite, on remplace juste la propriété `title`
                  // Cela évite de perdre d'autres champs comme `content`, `_id`, etc.
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-32"
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              </div>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Exportation du composant
export default NoteDetailPage;
