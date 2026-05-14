function About() {
  return (
    <main className="page">
      <section className="section-header">
        <p>About Image Vault</p>

        <h1>Secure Hidden Communication Platform</h1>

        <span>
          Image Vault is a cybersecurity-based web application designed to
          protect confidential communication using encryption and image
          steganography.
        </span>
      </section>

      <section className="about-grid">
        <div className="about-card">
          <h2>Project Overview</h2>

          <p>
            Image Vault allows users to securely hide confidential text messages
            inside digital images. The system combines AES encryption with
            LSB-based image steganography to provide an additional layer of
            protection for sensitive communication.
          </p>

          <p>
            Before embedding, messages are encrypted using a password key. The
            encrypted content is then hidden inside image pixels without visibly
            affecting image quality.
          </p>
        </div>

        <div className="about-card">
          <h2>Core Objectives</h2>

          <ul>
            <li>Protect confidential communication</li>
            <li>Combine encryption with data hiding</li>
            <li>Provide secure image-based message sharing</li>
            <li>Create an easy-to-use cybersecurity tool</li>
            <li>Demonstrate practical steganography concepts</li>
          </ul>
        </div>

        <div className="about-card">
          <h2>Technologies Used</h2>

          <div className="tech-stack">
            <span>React</span>
            <span>JavaScript</span>
            <span>CSS</span>
            <span>CryptoJS</span>
            <span>AES Encryption</span>
            <span>LSB Steganography</span>
            <span>Canvas API</span>
            <span>Vite</span>
          </div>
        </div>

        <div className="about-card">
          <h2>Security Workflow</h2>

          <div className="workflow">
            <div>Upload Image</div>
            <div>Encrypt Message</div>
            <div>Hide Data</div>
            <div>Download Secured Image</div>
            <div>Decode Using Password</div>
          </div>
        </div>

        <div className="about-card full-width">
          <h2>Why Image Vault?</h2>

          <p>
            Traditional communication methods expose sensitive information
            directly. Image Vault improves privacy by hiding encrypted messages
            inside images, making the communication appear like a normal image
            transfer.
          </p>

          <p>
            This project demonstrates practical applications of cybersecurity,
            encryption, and digital steganography in a clean and user-friendly
            interface.
          </p>
        </div>
      </section>
    </main>
  );
}

export default About;