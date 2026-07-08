import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';
import { trackClick } from '../../lib/analytics';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const internalLinks = [
    { name: 'Calculators', path: '/' },
    { name: 'Guides', path: '/guides/store-vs-sell-decision-framework' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Legal', path: '/legal' },
  ];

  const externalLinks: any[] = [];

  const handleNavClick = (linkName: string) => {
    trackClick(`nav_${linkName}`);
    setIsOpen(false);
  };

  return (
    <header className="bg-white border-b border-stone-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm z-10 w-full shrink-0" role="banner">
      <NavLink to="/" onClick={() => handleNavClick('Home')} className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1 -ml-1">
        <div className="w-8 h-8 flex-shrink-0 bg-blue-700 rounded flex items-center justify-center text-white font-bold" aria-hidden="true">R</div>
        <div className="flex flex-col">
          <span className="text-sm font-bold tracking-tight text-stone-800 uppercase">Rural Ops Tools</span>
          <span className="text-[10px] text-blue-600 font-medium tracking-widest -mt-1 uppercase">Storage Hub</span>
        </div>
      </NavLink>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-5 items-center justify-end flex-1 mr-4" aria-label="Primary Navigation">
        {internalLinks.map((link) => (
          <NavLink 
            key={link.name}
            to={link.path} 
            onClick={() => handleNavClick(link.name)}
            className={({ isActive }) => cn("text-sm font-medium transition-colors flex items-center", isActive ? "text-stone-900" : "text-stone-500 hover:text-stone-900", "focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm px-1")}
          >
            {link.name}
          </NavLink>
        ))}
      </nav>

      {/* Mobile menu button */}
      <div className="flex items-center md:hidden">
        <button
          onClick={() => {
            trackClick('btn_mobile_menu');
            setIsOpen(!isOpen);
          }}
          className="inline-flex items-center justify-center p-2 rounded-md text-stone-400 hover:text-stone-900 hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[48px] min-w-[48px]"
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-stone-200 z-50 md:hidden shadow-lg">
          <nav className="px-4 py-3 flex flex-col gap-3" aria-label="Mobile Navigation">
             <div className="pb-2">
               {internalLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={() => handleNavClick(link.name)}
                    className={({ isActive }) => cn("block py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-2 min-h-[48px] flex items-center", isActive ? "text-blue-700 bg-stone-50" : "text-stone-600")}
                  >
                    {link.name}
                  </NavLink>
                ))}
             </div>
          </nav>
        </div>
      )}
    </header>
  );
}
