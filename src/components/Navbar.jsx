import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  function logout() {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        <div className="brand-icon">IV</div>
        <div>
          <h2>Image Vault</h2>
          <p>Secure Hidden Communication</p>
        </div>
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/encode">Encode</Link>
        <Link to="/decode">Decode</Link>
        <Link to="/vault">Vault</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/learn">Learn</Link>
        <Link to="/about">About</Link>

        {isLoggedIn ? (
          <button className="logout-btn" onClick={logout}>Logout</button>
        ) : (
          <Link to="/login" className="login-link">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;