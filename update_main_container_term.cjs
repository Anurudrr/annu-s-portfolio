const fs = require('fs');
let content = fs.readFileSync('src/redoyan/components/MainContainer.tsx', 'utf-8');

if (!content.includes('import TerminalPalette')) {
  content = content.replace('import { MetroActivityList } from "../../components/MetroActivityList";', 'import { MetroActivityList } from "../../components/MetroActivityList";\nimport TerminalPalette from "../../components/TerminalPalette";');
  content = content.replace('<MetroActivityList />\n        </div>', '<MetroActivityList />\n        </div>\n        <div style={{ padding: "80px 20px", maxWidth: "1200px", margin: "0 auto" }}>\n            <h2 style={{ fontSize: "40px", marginBottom: "40px", textAlign: "center", color: "#fff" }}>Interactive <span style={{color: "var(--accentColor)"}}>Terminal</span></h2>\n            <TerminalPalette />\n        </div>');
  fs.writeFileSync('src/redoyan/components/MainContainer.tsx', content);
}
