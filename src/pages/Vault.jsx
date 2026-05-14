import { useEffect, useState } from "react";

function Vault() {
  const [vaultImages, setVaultImages] = useState([]);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const VAULT_PIN = "1234";

  useEffect(() => {
    const storedVault =
      JSON.parse(localStorage.getItem("vaultImages")) || [];

    setVaultImages(storedVault);
  }, []);

  function unlockVault() {
    if (pin === VAULT_PIN) {
      setIsUnlocked(true);
      setError("");
    } else {
      setError("Incorrect security PIN.");
    }
  }

  function deleteImage(index) {
    const updated = [...vaultImages];

    updated.splice(index, 1);

    setVaultImages(updated);

    localStorage.setItem("vaultImages", JSON.stringify(updated));
  }

  if (!isUnlocked) {
    return (
      <main className="page">
        <div className="vault-lock-screen">
          <div className="lock-card">
            <div className="lock-icon">🔒</div>

            <h1>Secure Vault Access</h1>

            <p>
              Enter the security PIN to access encrypted images stored inside
              Image Vault.
            </p>

            <input
              type="password"
              placeholder="Enter Vault PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />

            <button onClick={unlockVault}>
              Unlock Vault
            </button>

            {error && <span>{error}</span>}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <section className="section-header">
        <p>Secure Storage</p>

        <h1>Your Vault</h1>

        <span>
          Store and manage your encrypted secure images safely.
        </span>
      </section>

      {vaultImages.length === 0 ? (
        <div className="empty-vault">
          <span>🔒</span>

          <h2>Vault is Empty</h2>

          <p>
            Encoded images will automatically appear here after encryption.
          </p>
        </div>
      ) : (
        <div className="vault-grid">
          {vaultImages.map((item, index) => (
            <div key={index} className="vault-card">
              <img src={item.url} alt="Vault" />

              <div className="vault-content">
                <h3>Secured Image</h3>

                <p>{item.time}</p>

                <div className="vault-actions">
                  <a href={item.url} download={item.name}>
                    Download
                  </a>

                  <button onClick={() => deleteImage(index)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Vault;