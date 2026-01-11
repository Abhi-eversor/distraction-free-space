import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../Services/api";
import "./Editor.css";

export default function Editor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [status, setStatus] = useState("Saved");

  useEffect(() => {
    if (!id) return;
    API.get(`/docs/${id}`).then(res => {
      setContent(res.data.content || "");
    });
  }, [id]);

  useEffect(() => {
    if (!id) return;

    setStatus("Saving...");
    const timer = setTimeout(async () => {
      await API.put(`/docs/${id}`, { content });
      setStatus("Saved");
    }, 800);

    return () => clearTimeout(timer);
  }, [content, id]);

  return (
    <div className="editor-layout">
      {}
      <div className="editor-header">
        <div className="editor-left">
          <button
            className="back-btn"
            onClick={() => navigate("/notes")}
          >
            My Notes
          </button>

          <strong className="editor-title">
            Distraction-Free Space
          </strong>

          <span className="save-status">{status}</span>
        </div>

        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>

      {}
      <textarea
        className="editor-textarea"
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Start writing..."
      />
    </div>
  );
}
