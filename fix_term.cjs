const fs = require('fs');
let content = fs.readFileSync('src/redoyan/components/MainContainer.tsx', 'utf-8');

content = content.replace('<div style={{ padding: "80px 20px", maxWidth: "1200px", margin: "0 auto" }}>\n            <h2 style={{ fontSize: "40px", marginBottom: "40px", textAlign: "center", color: "#fff" }}>Interactive <span style={{color: "var(--accentColor)"}}>Terminal</span></h2>\n            <TerminalPalette />\n        </div>', '<TerminalPalette />');

fs.writeFileSync('src/redoyan/components/MainContainer.tsx', content);
