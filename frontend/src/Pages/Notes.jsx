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
    try {
      const res = await API.get("/docs");
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const createNote = async () => {
    const title = prompt("Enter note name");
    if (!title) return;

    const res = await API.post("/docs/create", { title });
    setNotes(prev => [res.data, ...prev]);
    navigate(`/editor/${res.data._id}`);
  };

  return (
    <div className="notes-page">
      {/* Header */}
      <div className="notes-header">
        <h1>My Notes</h1>
        <button onClick={createNote}>+ New Note</button>
      </div>

      {/* Notes List */}
      {notes.length === 0 ? (
        <p className="empty-text">No notes yet</p>
      ) : (
        <ul className="notes-list">
          {notes.map(note => (
            <li
              key={note._id}
              className="note-item"
              onClick={() => navigate(`/editor/${note._id}`)}
            >
              <strong>{note.title || "Untitled"}</strong>
              <span>
                Last edited: {new Date(note.updatedAt).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
