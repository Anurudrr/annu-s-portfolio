const crypto = require("crypto");
const fs = require("fs");

const password = "Character3D#@";
const key = crypto.createHash("sha256").update(password).digest();

const fileData = fs.readFileSync("public/models/character.enc");
const iv = fileData.slice(0, 16);
const encrypted = fileData.slice(16);

try {
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(encrypted);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  console.log("Decrypted length:", decrypted.length);
} catch(e) {
  console.error("Decryption failed:", e.message);
}
