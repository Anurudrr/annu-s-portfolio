const fs = require('fs');
const b = fs.readFileSync('public/models/character.enc');
console.log(b.slice(0, 100).toString('hex'));
