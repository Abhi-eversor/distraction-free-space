import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Services/api";
import "./Editor.css";

export default function Editor() {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("Saved");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");

    // Load existing content
    API.get("/api/docs").then((res) => {
      setContent(res.data.content || "");
    });
  }, []);

  // Auto-save every 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      API.post("/api/docs", { content });
      setStatus("Saved");
    }, 3000);

    setStatus("Saving...");
    return () => clearTimeout(timer);
  }, [content]);

  return (
    <div className="editor-layout">
      <div className="editor-header">
        <h2>Distraction-Free Space</h2>
        <span className="save-status">{status}</span>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>

      <textarea
        className="editor-textarea"
        placeholder="Start writing here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
}
