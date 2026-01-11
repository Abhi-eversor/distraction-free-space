import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../Services/api";
import "./Auth.css";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/editor");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-layout">
      {/* LEFT SIDE */}
      <div className="auth-left">
        <div className="auth-card animate-slide">
          <h2>Welcome Back</h2>

          {error && <p className="error-text">{error}</p>}

          <form onSubmit={handleSubmit}>
            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              name="password"
              type="text"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <button type="submit">Login</button>
          </form>

          <p className="switch-text">
            Don’t have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="auth-right">
        <div className="hero-text animate-fade">
          <h1>Distraction-Free Space</h1>
          <p>
            A calm place to think,<br />
            write, and let your thoughts flow.
          </p>
        </div>
      </div>
    </div>
  );
}
