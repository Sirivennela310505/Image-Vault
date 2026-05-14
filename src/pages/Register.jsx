import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  function handleRegister(e) {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setError("Please fill all fields.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    localStorage.setItem("vaultUser", JSON.stringify(form));
    localStorage.setItem("isLoggedIn", "true");

    navigate("/dashboard");
  }

  return (
    <main className="page auth-page">
      <div className="auth-card">
        <div className="auth-icon">🔐</div>

        <h1>Create Account</h1>
        <p>Register to manage your secured images and vault activity.</p>

        <form onSubmit={handleRegister}>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Create password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          {error && <p className="auth-error">{error}</p>}

          <button className="primary-button">Create Account</button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
}

export default Register;