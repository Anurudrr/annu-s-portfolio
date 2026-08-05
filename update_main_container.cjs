const fs = require('fs');
let content = fs.readFileSync('src/redoyan/components/MainContainer.tsx', 'utf-8');

const imports = `
import { GitHubHeatmap } from "../../components/GitHubHeatmap";
import AlgoPlayground from "../../components/AlgoPlayground";
import PolaroidGallery from "../../components/PolaroidGallery";
`;

content = content.replace('import setSplitText from "./utils/splitText";', 'import setSplitText from "./utils/splitText";' + imports);

const components = `
        <TechStackNew />
        <div style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '40px', marginBottom: '40px', textAlign: 'center', color: '#fff' }}>Open Source <span style={{color: 'var(--accentColor)'}}>Activity</span></h2>
            <GitHubHeatmap />
        </div>
        <div style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '40px', marginBottom: '40px', textAlign: 'center', color: '#fff' }}>Algorithm <span style={{color: 'var(--accentColor)'}}>Visualizer</span></h2>
            <AlgoPlayground />
        </div>
        <div style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '40px', marginBottom: '40px', textAlign: 'center', color: '#fff' }}>Life <span style={{color: 'var(--accentColor)'}}>In Polaroids</span></h2>
            <PolaroidGallery />
        </div>
`;

content = content.replace('<TechStackNew />', components);

fs.writeFileSync('src/redoyan/components/MainContainer.tsx', content);
