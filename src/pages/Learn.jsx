function Learn() {
  return (
    <main className="page">
      <section className="section-header">
        <p>Learn</p>
        <h1>How Image Vault Works</h1>
        <span>Simple explanation of encryption and steganography.</span>
      </section>

      <section className="info-grid">
        <div className="info-card">
          <h3>1. AES Encryption</h3>
          <p>The secret message is encrypted using a password key.</p>
        </div>

        <div className="info-card">
          <h3>2. Image Steganography</h3>
          <p>The encrypted message is hidden inside image pixels.</p>
        </div>

        <div className="info-card">
          <h3>3. Secure Decoding</h3>
          <p>The receiver uses the correct key to extract the message.</p>
        </div>
      </section>
    </main>
  );
}

export default Learn;