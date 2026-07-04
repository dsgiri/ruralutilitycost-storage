import React from 'react';
import { NavLink } from 'react-router-dom';

export function Footer() {
  const links = [
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Legal', path: '/legal' },
    { name: 'License', path: '/license' },
    { name: 'Privacy', path: '/privacy' },
  ];

  return (
    <footer className="bg-white border-t border-stone-200 px-4 sm:px-8 py-4 sm:py-6 flex flex-col sm:flex-row gap-4 items-center justify-between text-[10px] text-stone-500 z-10 shrink-0" role="contentinfo">
      <nav aria-label="Footer Navigation" className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 uppercase font-bold tracking-tighter">
        {links.map((link) => (
          <NavLink 
            key={link.name} 
            to={link.path} 
            className="hover:text-stone-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1 min-h-[44px] flex items-center"
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
      <div className="text-center sm:text-right max-w-sm">
        <p className="leading-tight">
          Estimates provided by Storage are for decision support only. <span className="text-stone-400 font-normal">Verify results independently. Part of the Rural Ops Tools project.</span>
        </p>
      </div>
    </footer>
  );
}
