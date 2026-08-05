import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import { Preloader } from '../design/components/Preloader';
import { DesignNav } from '../design/components/DesignNav';
import { DesignCursor } from '../design/components/DesignCursor';
import { AnimatePresence } from 'motion/react';

export function DesignLayout(): React.ReactElement {
  const [showPreloader, setShowPreloader] = useState(
    () => !sessionStorage.getItem('hasSeenDesignPreloader')
  );

  useEffect(() => {
    if (showPreloader) {
      sessionStorage.setItem('hasSeenDesignPreloader', 'true');
    }
  }, [showPreloader]);

  useEffect(() => {
    if (showPreloader) {
      const timer = setTimeout(() => {
        setShowPreloader(false);
      }, 4000); // 4 seconds total for greetings + curve wipe
      return () => clearTimeout(timer);
    }
  }, [showPreloader]);

  return (
    <ReactLenis root>
      <div className="theme-design" style={{ backgroundColor: 'hsl(var(--background))', cursor: 'none' }}>
        <DesignCursor />
        <AnimatePresence mode="wait">
          {showPreloader && <Preloader key="preloader" />}
        </AnimatePresence>
        <DesignNav />
        <Outlet />
      </div>
    </ReactLenis>
  );
}

