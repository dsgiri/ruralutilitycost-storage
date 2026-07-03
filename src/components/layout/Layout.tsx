import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { trackPageView } from '../../lib/analytics';

export function Layout() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  return (
    <div className="h-screen w-full flex flex-col bg-stone-50 font-sans text-stone-900 overflow-hidden">
      <Navbar />
      <main className="flex-1 flex overflow-hidden w-full" role="main" aria-label="Main Content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
