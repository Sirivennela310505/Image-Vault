import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("vaultUser"));

    if (!storedUser) {
      setError("No account found. Please register first.");
      return;
    }

    if (storedUser.email === email && storedUser.password === password) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
    } else {
      setError("Invalid email or password.");
    }
  }

  return (
    <main className="page auth-page">
      <div className="auth-card">
        <div className="auth-icon">🔓</div>

        <h1>Login</h1>
        <p>Access your secure dashboard and encrypted image vault.</p>

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="auth-error">{error}</p>}

          <button className="primary-button">Login</button>
        </form>

        <p className="auth-switch">
          New to Image Vault? <Link to="/register">Create account</Link>
        </p>
      </div>
    </main>
  );
}

export default Login;