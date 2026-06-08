import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { trackPageView } from '../../lib/analytics';
import { AdBox } from '../ads/AdBox';

export function Layout() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  return (
    <div className="h-screen w-full flex flex-col bg-stone-50 font-sans text-stone-900 overflow-hidden">
      <Navbar />
      <div className="w-full shrink-0">
         <AdBox slotId="header_ad" className="min-h-[90px] max-w-5xl my-2 mx-auto" />
      </div>
      <main className="flex-1 flex overflow-hidden w-full" role="main" aria-label="Main Content">
        <Outlet />
      </main>
      <div className="w-full shrink-0">
         <AdBox slotId="footer_ad" className="min-h-[90px] max-w-[728px] my-2 mx-auto" />
      </div>
      <Footer />
    </div>
  );
}
