import CryptoJS from "crypto-js";

function textToBinary(text) {
  return text
    .split("")
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
    .join("");
}

function binaryToText(binary) {
  let text = "";
  for (let i = 0; i < binary.length; i += 8) {
    text += String.fromCharCode(parseInt(binary.slice(i, i + 8), 2));
  }
  return text;
}

export function getImageCapacity(width, height) {
  return Math.floor((width * height * 3) / 8) - 20;
}

export function encodeImage(file, message, password) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = () => {
      img.src = reader.result;
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;

      const encrypted = CryptoJS.AES.encrypt(message, password).toString();
      const payload = encrypted.length.toString().padStart(10, "0") + encrypted;
      const binaryMessage = textToBinary(payload);

      const capacityBits = Math.floor((pixels.length / 4) * 3);

      if (binaryMessage.length > capacityBits) {
        reject("Message is too large for this image.");
        return;
      }

      let bitIndex = 0;

      for (let i = 0; i < pixels.length && bitIndex < binaryMessage.length; i++) {
        if ((i + 1) % 4 !== 0) {
          pixels[i] = (pixels[i] & 254) | Number(binaryMessage[bitIndex]);
          bitIndex++;
        }
      }

      ctx.putImageData(imageData, 0, 0);

      canvas.toBlob((blob) => {
        resolve({
          blob,
          url: URL.createObjectURL(blob),
          encryptedLength: encrypted.length,
        });
      }, "image/png");
    };

    reader.onerror = () => reject("Failed to read image.");
    reader.readAsDataURL(file);
  });
}

export function decodeImage(file, password) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = () => {
      img.src = reader.result;
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;

      let binary = "";

      for (let i = 0; i < pixels.length; i++) {
        if ((i + 1) % 4 !== 0) {
          binary += pixels[i] & 1;
        }
      }

      const lengthText = binaryToText(binary.slice(0, 80));
      const encryptedLength = parseInt(lengthText);

      if (!encryptedLength || encryptedLength <= 0) {
        reject("No hidden message found.");
        return;
      }

      const encryptedBinary = binary.slice(80, 80 + encryptedLength * 8);
      const encryptedText = binaryToText(encryptedBinary);

      try {
        const bytes = CryptoJS.AES.decrypt(encryptedText, password);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);

        if (!decrypted) {
          reject("Wrong password or invalid image.");
          return;
        }

        resolve(decrypted);
      } catch {
        reject("Failed to decode message.");
      }
    };

    reader.onerror = () => reject("Failed to read image.");
    reader.readAsDataURL(file);
  });
}