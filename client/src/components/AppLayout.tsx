// ABC Filters iOS App — App Layout Wrapper
// Provides the outer shell: splash screen, status bar, content area, bottom tab bar
import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'wouter';
import { BottomTabBar } from './BottomTabBar';
import { CartDrawer } from './CartDrawer';
import { SplashScreen } from './SplashScreen';
import { Capacitor } from '@capacitor/core';

// Pages that should NOT show the bottom tab bar
const HIDE_TAB_BAR_PATHS = ['/product/'];

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const [location] = useLocation();
  const isNative = Capacitor.isNativePlatform();
  const [showSplash, setShowSplash] = useState(true);

  const hideTabBar = HIDE_TAB_BAR_PATHS.some((p) => location.startsWith(p));

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  // On iOS native, set status bar style
  useEffect(() => {
    if (isNative) {
      import('@capacitor/status-bar').then(({ StatusBar, Style }) => {
        StatusBar.setStyle({ style: Style.Dark }).catch(() => {});
        StatusBar.setBackgroundColor({ color: '#000000' }).catch(() => {});
      });
    }
  }, [isNative]);

  return (
    <>
      {/* Premium animated splash screen — shown once on launch */}
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      <div
        className="min-h-screen bg-background"
        style={{
          paddingTop: isNative ? 'env(safe-area-inset-top, 44px)' : '0',
          opacity: showSplash ? 0 : 1,
          transition: 'opacity 0.3s ease',
        }}
      >
        {/* Main content */}
        <main
          className="min-h-screen"
          style={{
            paddingBottom: hideTabBar ? '0' : 'calc(83px + env(safe-area-inset-bottom, 34px))',
          }}
        >
          {children}
        </main>

        {/* Bottom tab bar — hidden on product detail pages */}
        {!hideTabBar && <BottomTabBar />}

        {/* Cart drawer — always available */}
        <CartDrawer />
      </div>
    </>
  );
};
