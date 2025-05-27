import React from "react";
import { Routes, Route } from "react-router-dom"; // ← Corrigé ici
import NoteDetailPage from "./pages/NoteDetailPage";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import toast from "react-hot-toast";

const App = () => {
  return (
    <div data-theme="forest">
      <button onClick={()=> toast.success("s")} className="text-red-500 p-4"> click me</button>
      <input type="checkbox" value="synthwave" className="toggle theme-controller" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;


