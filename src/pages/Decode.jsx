import { useState } from "react";
import { decodeImage } from "../utils/steganography";

function Decode() {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [key, setKey] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  function handleImage(e) {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setImage(URL.createObjectURL(selectedFile));
    setMessage("");
    setStatus("");
  }

  async function handleDecode() {
    if (!file || !key) {
      setStatus("Please upload secured image and enter password.");
      return;
    }

    try {
      setStatus("Extracting hidden message...");
      const decoded = await decodeImage(file, key);
      setMessage(decoded);
      setStatus("Message decoded successfully.");

const history =
  JSON.parse(localStorage.getItem("vaultHistory")) || [];

history.push({
  type: "decode",
  message: `Decoded hidden message successfully`,
  time: new Date().toLocaleString(),
});

localStorage.setItem("vaultHistory", JSON.stringify(history));
    } catch (error) {
      setStatus(error);
      setMessage("");
    }
  }

  function copyMessage() {
    navigator.clipboard.writeText(message);
    setStatus("Message copied to clipboard.");
  }

  return (
    <main className="page">
      <section className="section-header">
        <p>Decode</p>
        <h1>Extract Hidden Message</h1>
        <span>
          Upload the secured PNG image and enter the correct password to reveal the hidden message.
        </span>
      </section>

      <section className="tool-layout">
        <div className="tool-card">
          <label>Upload Secured Image</label>
          <input type="file" accept="image/png,image/*" onChange={handleImage} />

          <label>Password Key</label>
          <input
            type="password"
            placeholder="Enter decryption password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />

          <button className="primary-button" onClick={handleDecode}>
            Decode Message
          </button>

          {status && <p className="result-message">{status}</p>}
        </div>

        <div className="preview-box">
          <h3>Secured Image Preview</h3>
          {image ? <img src={image} alt="Encoded Preview" /> : <p>No encoded image selected</p>}

          <label>Extracted Message</label>
          <textarea readOnly value={message} placeholder="Hidden message will appear here..." />

          {message && (
            <button className="primary-button" onClick={copyMessage}>
              Copy Message
            </button>
          )}
        </div>
      </section>
    </main>
  );
}

export default Decode;