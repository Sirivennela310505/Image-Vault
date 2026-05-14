import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="clean-home">

      <section className="hero-section">
        <div className="hero-left">

          <p className="welcome-tag">
            Welcome to Image Vault
          </p>

         <h1>
         Secure. Encrypt. Protect hidden communication.
      </h1>

     <p className="hero-description">
      Image Vault is a secure image steganography platform that allows users
      to encrypt confidential messages and hide them inside images using
      AES encryption and LSB techniques.
      </p>
          

          <div className="hero-buttons">
            <Link to="/encode" className="primary-home-btn">
              Encode Message
            </Link>

            <Link to="/decode" className="secondary-home-btn">
              Decode Image
            </Link>
          </div>

        </div>

        <div className="hero-right">

          <div className="hero-preview-card">

            <div className="preview-header">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="preview-content">

              <div className="preview-icon">
                🔐
              </div>

              <h3>Protected Communication</h3>

              <p>
                AES Encryption + Image Steganography
              </p>

              <div className="security-line">
                <div></div>
              </div>

              <button>
                System Secured
              </button>

            </div>

          </div>

        </div>
      </section>

      <section className="explore-section">

        <div className="section-title">
          <h2>Explore Features</h2>

          <p>
            Access the core modules of Image Vault.
          </p>
        </div>

        <div className="feature-grid">

          <Link to="/encode" className="feature-box">
            <span>📤</span>
            <h3>Encode</h3>
            <p>Hide messages inside images securely.</p>
          </Link>

          <Link to="/decode" className="feature-box">
            <span>🔓</span>
            <h3>Decode</h3>
            <p>Reveal hidden messages using password.</p>
          </Link>

          <Link to="/vault" className="feature-box">
            <span>🗄️</span>
            <h3>Vault</h3>
            <p>Store and manage secured images.</p>
          </Link>

          <Link to="/dashboard" className="feature-box">
            <span>📊</span>
            <h3>Dashboard</h3>
            <p>Track encoding and decoding activity.</p>
          </Link>

        </div>

      </section>

      <section className="bottom-strip">

        <div>
          <h3>AES Encryption</h3>
          <p>Protects message data before hiding.</p>
        </div>

        <div>
          <h3>Steganography</h3>
          <p>Embeds encrypted data into image pixels.</p>
        </div>

        <div>
          <h3>Password Protection</h3>
          <p>Only the correct key can decode messages.</p>
        </div>

      </section>

    </main>
  );
}

export default Home;