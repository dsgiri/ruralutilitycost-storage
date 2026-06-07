import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function Layout() {
  return (
    <div className="h-screen w-full flex flex-col bg-stone-50 font-sans text-stone-900 overflow-hidden">
      <Navbar />
      <main className="flex-1 flex overflow-hidden">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
