import { useState } from "react";
import { encodeImage, getImageCapacity } from "../utils/steganography";

function Encode() {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [key, setKey] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [imageInfo, setImageInfo] = useState(null);
  const [strength, setStrength] = useState("");
  const [encodedUrl, setEncodedUrl] = useState("");
  const [status, setStatus] = useState("");
  const [dragActive, setDragActive] = useState(false);

  function checkStrength(password) {
    if (!password) setStrength("");
    else if (password.length < 6) setStrength("Weak");
    else if (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    ) setStrength("Strong");
    else setStrength("Medium");
  }

  function processImage(selectedFile) {
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      setStatus("Please upload a valid image file.");
      return;
    }

    const imageUrl = URL.createObjectURL(selectedFile);

    setFile(selectedFile);
    setImage(imageUrl);
    setEncodedUrl("");
    setStatus("");

    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      setCapacity(getImageCapacity(img.width, img.height));
      setImageInfo({
        width: img.width,
        height: img.height,
        type: selectedFile.type,
        size: (selectedFile.size / 1024).toFixed(2),
        name: selectedFile.name,
      });
    };
  }

  function handleImage(e) {
    processImage(e.target.files[0]);
  }

  function handleDragOver(e) {
    e.preventDefault();
    setDragActive(true);
  }

  function handleDragLeave(e) {
    e.preventDefault();
    setDragActive(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragActive(false);
    processImage(e.dataTransfer.files[0]);
  }

  async function handleEncode() {
    if (!file || !message || !key) {
      setStatus("Please upload image, enter message, and password.");
      return;
    }

    if (message.length > capacity) {
      setStatus("Message is too large for this image.");
      return;
    }

    try {
      setStatus("Encrypting and hiding message...");

      const result = await encodeImage(file, message, key);
      setEncodedUrl(result.url);

      const vault = JSON.parse(localStorage.getItem("vaultImages")) || [];
      vault.push({
        url: result.url,
        name: "secured-image.png",
        time: new Date().toLocaleString(),
      });
      localStorage.setItem("vaultImages", JSON.stringify(vault));

      const history = JSON.parse(localStorage.getItem("vaultHistory")) || [];
      history.push({
        type: "encode",
        message: "Encoded message into secured image",
        time: new Date().toLocaleString(),
      });
      localStorage.setItem("vaultHistory", JSON.stringify(history));

      setStatus("Message hidden successfully. Download the secured image.");
    } catch (error) {
      setStatus(String(error));
    }
  }

  return (
    <main className="page">
      <section className="section-header">
        <p>Encode</p>
        <h1>Hide a Secret Message</h1>
        <span>
          Drag and drop an image, check capacity, enter your message, add a
          strong password, and generate a secured image.
        </span>
      </section>

      <section className="tool-layout">
        <div className="tool-card">
          <label>Upload Cover Image</label>

          <div
            className={`drop-zone ${dragActive ? "active" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <span>📤</span>
            <h3>Drag & Drop Image Here</h3>
            <p>or click below to choose from your device</p>
            <input type="file" accept="image/*" onChange={handleImage} />
          </div>

          {imageInfo && (
            <div className="image-info">
              <p><strong>File:</strong> {imageInfo.name}</p>
              <p><strong>Resolution:</strong> {imageInfo.width} × {imageInfo.height}</p>
              <p><strong>Type:</strong> {imageInfo.type}</p>
              <p><strong>Size:</strong> {imageInfo.size} KB</p>
              <p><strong>Estimated Capacity:</strong> {capacity} characters</p>
            </div>
          )}

          <label>Secret Message</label>
          <textarea
            placeholder="Enter your confidential message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          <div className="status-box">
            <p>Message Length: {message.length} characters</p>
            <p>
              Remaining Space:{" "}
              {capacity ? Math.max(capacity - message.length, 0) : 0} characters
            </p>
          </div>

          {capacity > 0 && message.length > capacity && (
            <p className="warning">Message exceeds image storage capacity.</p>
          )}

          <label>Password Key</label>
          <input
            type="password"
            placeholder="Enter encryption password"
            value={key}
            onChange={(e) => {
              setKey(e.target.value);
              checkStrength(e.target.value);
            }}
          />

          {strength && (
            <div className={`strength ${strength.toLowerCase()}`}>
              Password Strength: {strength}
            </div>
          )}

          <button className="primary-button" onClick={handleEncode}>
            Encrypt & Hide Message
          </button>

          {encodedUrl && (
            <a
              className="download-btn"
              href={encodedUrl}
              download="image-vault-secured.png"
            >
              Download Secured Image
            </a>
          )}

          {status && <p className="result-message">{status}</p>}
        </div>

        <div className="preview-box">
          <h3>Original Image Preview</h3>

          {image ? (
            <img src={image} alt="Original Preview" />
          ) : (
            <div className="empty-preview">
              <span>🖼️</span>
              <p>No image selected</p>
              <small>Your uploaded image preview will appear here</small>
            </div>
          )}

          {encodedUrl && (
            <>
              <h3>Secured Image Preview</h3>
              <img src={encodedUrl} alt="Secured Preview" />

              <div className="compare-section">
                <h3>Before vs After Comparison</h3>

                <div className="compare-grid">
                  <div>
                    <p>Original Image</p>
                    <img src={image} alt="Original" />
                  </div>

                  <div>
                    <p>Secured Image</p>
                    <img src={encodedUrl} alt="Secured" />
                  </div>
                </div>

                <div className="quality-note">
                  Visual appearance is preserved while encrypted data is hidden inside the image.
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

export default Encode;