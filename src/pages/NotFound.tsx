import React from 'react';
import { NavLink } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';

export function NotFound() {
  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-8 py-16 overflow-y-auto text-center flex flex-col items-center justify-center min-h-[60vh]">
      <SEO 
        title="Page Not Found | Rural Ops Tools"
        description="The requested page could not be found."
        canonicalPath="/404"
      />
      <h1 className="text-4xl sm:text-6xl font-black text-stone-800 mb-6">404 - NOT FOUND</h1>
      <p className="text-stone-600 mb-8 max-w-md mx-auto">
        The compliance ledger, module, or document you are attempting to access has been relocated or does not exist.
      </p>
      <NavLink 
        to="/" 
        className="px-6 py-3 min-h-[48px] inline-flex items-center justify-center bg-stone-900 text-white font-bold rounded hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-900 uppercase tracking-widest text-[10px]"
      >
        Return to Storage Hub
      </NavLink>
    </div>
  );
}
