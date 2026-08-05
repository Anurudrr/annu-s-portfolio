const fs = require("fs");
let buf = fs.readFileSync("public/models/character.enc");
let res = [];
for (let i = 0; i < buf.length; i++) {
  if (buf[i] === 0x0D && i + 1 < buf.length && buf[i + 1] === 0x0A) {
    // skip 0x0D
  } else {
    res.push(buf[i]);
  }
}
let newBuf = Buffer.from(res);
console.log("Old length:", buf.length, "New length:", newBuf.length, "Modulo 16:", newBuf.length % 16);
fs.writeFileSync("public/models/character.enc.fixed", newBuf);
