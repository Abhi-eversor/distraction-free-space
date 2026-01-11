import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Services/api";
import "./Notes.css";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    const res = await API.get("/docs");
    setNotes(res.data);
  };

  const createNote = async () => {
    const title = prompt("Enter note name");
    if (!title) return;

    const res = await API.post("/docs/create", { title });
    setNotes(prev => [res.data, ...prev]);
    navigate(`/editor/${res.data._id}`);
  };

  const deleteNote = async (id) => {
    const ok = window.confirm("Delete this note?");
    if (!ok) return;

    await API.delete(`/docs/${id}`);
    setNotes(prev => prev.filter(note => note._id !== id));
  };

  return (
    <div className="notes-page">
      <div className="notes-header">
        <h1>My Notes</h1>
        <button className="new-note-btn" onClick={createNote}>
          + New Note
        </button>
      </div>

      {notes.length === 0 && <p className="empty">No notes yet</p>}

      <ul className="notes-list">
        {notes.map(note => (
          <li
            key={note._id}
            className="note-item"
            onClick={() => navigate(`/editor/${note._id}`)}
          >
            <div>
              <strong>{note.title || "Untitled"}</strong>
              <div className="note-time">
                Last edited: {new Date(note.updatedAt).toLocaleString()}
              </div>
            </div>

            <button
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation(); // IMPORTANT
                deleteNote(note._id);
              }}
            >
              🗑
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
