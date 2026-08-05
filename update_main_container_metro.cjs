const fs = require('fs');
let content = fs.readFileSync('src/redoyan/components/MainContainer.tsx', 'utf-8');

if (!content.includes('import { MetroActivityList }')) {
  content = content.replace('import Chat from "../../components/Chat";', 'import Chat from "../../components/Chat";\nimport { MetroActivityList } from "../../components/MetroActivityList";');
  content = content.replace('<Chat />', '<div style={{ padding: "80px 20px", maxWidth: "1200px", margin: "0 auto" }}>\n            <h2 style={{ fontSize: "40px", marginBottom: "40px", textAlign: "center", color: "#fff" }}>Recent <span style={{color: "var(--accentColor)"}}>Activity</span></h2>\n            <MetroActivityList />\n        </div>\n        <Chat />');
  fs.writeFileSync('src/redoyan/components/MainContainer.tsx', content);
}
