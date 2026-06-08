import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';
import { trackClick } from '../../lib/analytics';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const internalLinks = [
    { name: 'Home', path: '/' },
    { name: 'My Favorites', path: '/favorites' },
  ];

  const externalLinks = [
    { name: 'Plan', path: 'https://plan.ruralutilitycost.com' },
    { name: 'Forecast', path: 'https://forecast.ruralutilitycost.com' },
    { name: 'What If', path: 'https://whatif.ruralutilitycost.com' },
  ];

  const handleNavClick = (linkName: string) => {
    trackClick(`nav_${linkName}`);
    setIsOpen(false);
  };

  return (
    <header className="bg-white border-b border-stone-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm z-10 w-full shrink-0" role="banner">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 flex-shrink-0 bg-blue-700 rounded flex items-center justify-center text-white font-bold" aria-hidden="true">R</div>
        <div className="flex flex-col">
          <span className="text-sm font-bold tracking-tight text-stone-800 uppercase">Rural Utility Cost</span>
          <span className="text-[10px] text-blue-600 font-medium tracking-widest -mt-1 uppercase">Storage Hub</span>
        </div>
      </div>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-5 items-center justify-center absolute left-1/2 -translate-x-1/2" aria-label="Primary Navigation">
        <NavLink 
          to="/" 
          end
          onClick={() => handleNavClick('Home')}
          className={({ isActive }) => cn("text-xs font-semibold transition-colors min-h-[48px] flex items-center", isActive ? "text-blue-700 border-b-2 border-blue-700" : "text-stone-500 hover:text-stone-900", "focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm px-1")}
        >
          Home
        </NavLink>
        {externalLinks.map((link) => (
          <a
            key={link.name}
            href={link.path}
            onClick={() => handleNavClick(link.name)}
            className="text-xs font-semibold text-stone-500 hover:text-stone-900 min-h-[48px] flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm px-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.name}
          </a>
        ))}
        <NavLink 
          to="/favorites" 
          onClick={() => handleNavClick('My Favorites')}
          className={({ isActive }) => cn("text-xs font-semibold transition-colors min-h-[48px] flex items-center", isActive ? "text-blue-700 border-b-2 border-blue-700" : "text-stone-500 hover:text-stone-900", "focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm px-1")}
        >
          My Favorites
        </NavLink>
      </nav>

      {/* Utilities */}
      <div className="hidden md:flex gap-4 items-center">
        <button 
           className="text-stone-400 hover:text-stone-600 transition-colors min-h-[48px] flex items-center justify-center px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md" 
           aria-label="Settings"
           onClick={() => trackClick('btn_settings')}
        >
          <Settings className="w-5 h-5" />
        </button>
        <span className="h-4 w-px bg-stone-200" aria-hidden="true"></span>
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-[10px] font-bold text-stone-400 hover:text-stone-600 transition-colors min-h-[48px] flex items-center justify-center px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
          onClick={() => trackClick('link_github')}
        >
          GITHUB
        </a>
      </div>

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
             <div className="border-b border-stone-100 pb-2">
               <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-2" aria-hidden="true">Module Navigation</span>
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
             <div>
               <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-2" aria-hidden="true">Ecosystem Links</span>
               {externalLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.path}
                    onClick={() => handleNavClick(link.name)}
                    className="block py-3 text-sm font-semibold text-stone-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-2 min-h-[48px] flex items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.name}
                  </a>
                ))}
             </div>
          </nav>
        </div>
      )}
    </header>
  );
}
