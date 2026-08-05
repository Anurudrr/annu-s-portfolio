const fs = require('fs');
let content = fs.readFileSync('src/redoyan/components/Character/Scene.tsx', 'utf-8');

if (!content.includes('.catch(')) {
  content = content.replace('        }\n      });\n\n      let mouse = { x: 0, y: 0 },', '        }\n      }).catch(err => {\n        console.error("loadCharacter failed:", err);\n        progress.clear();\n      });\n\n      let mouse = { x: 0, y: 0 },');
  fs.writeFileSync('src/redoyan/components/Character/Scene.tsx', content);
}
