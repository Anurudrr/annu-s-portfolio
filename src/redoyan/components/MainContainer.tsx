import { PropsWithChildren, useEffect, useState } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import TechStackNew from "./TechStackNew";
import CallToAction from "./CallToAction";
import setSplitText from "./utils/splitText";
import { GitHubHeatmap } from "../../components/GitHubHeatmap";
import AlgoPlayground from "../../components/AlgoPlayground";
import PolaroidGallery from "../../components/PolaroidGallery";
import { MetroActivityList } from "../../components/MetroActivityList";
import { TerminalPalette } from "../../components/TerminalPalette";


const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );
  const [isMobile] = useState<boolean>(window.innerWidth <= 768);

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [isDesktopView]);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && !isMobile && children}
      <div className="container-main">
        <Landing />
        <About />
        <WhatIDo />
        <Career />
        <Work />
        
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
        <div style={{ padding: "80px 20px", maxWidth: "1200px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "40px", marginBottom: "40px", textAlign: "center", color: "#fff" }}>Recent <span style={{color: "var(--accentColor)"}}>Activity</span></h2>
            <MetroActivityList />
        </div>
        <TerminalPalette />

        <CallToAction />
        <Contact />
      </div>
    </div>
  );
};

export default MainContainer;
