const fs = require('fs');
let content = fs.readFileSync('src/redoyan/components/MainContainer.tsx', 'utf-8');

if (!content.includes('import Chat')) {
  content = content.replace('import PolaroidGallery from "../../components/PolaroidGallery";', 'import PolaroidGallery from "../../components/PolaroidGallery";\nimport Chat from "../../components/Chat";');
  content = content.replace('<PolaroidGallery />\n        </div>', '<PolaroidGallery />\n        </div>\n        <Chat />');
  fs.writeFileSync('src/redoyan/components/MainContainer.tsx', content);
}
