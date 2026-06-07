import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';

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

  return (
    <header className="bg-white border-b border-stone-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm z-10 w-full shrink-0">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 flex-shrink-0 bg-blue-700 rounded flex items-center justify-center text-white font-bold">R</div>
        <div className="flex flex-col">
          <span className="text-sm font-bold tracking-tight text-stone-800 uppercase">Rural Utility Cost</span>
          <span className="text-[10px] text-blue-600 font-medium tracking-widest -mt-1 uppercase">Storage Hub</span>
        </div>
      </div>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-5 items-center justify-center absolute left-1/2 -translate-x-1/2">
        <NavLink 
          to="/" 
          end
          className={({ isActive }) => cn("text-xs font-semibold transition-colors", isActive ? "text-blue-700 border-b-2 border-blue-700 pb-1" : "text-stone-500 hover:text-stone-900 pb-1")}
        >
          Home
        </NavLink>
        {externalLinks.map((link) => (
          <a
            key={link.name}
            href={link.path}
            className="text-xs font-semibold text-stone-500 hover:text-stone-900 pb-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.name}
          </a>
        ))}
        <NavLink 
          to="/favorites" 
          className={({ isActive }) => cn("text-xs font-semibold transition-colors", isActive ? "text-blue-700 border-b-2 border-blue-700 pb-1" : "text-stone-500 hover:text-stone-900 pb-1")}
        >
          My Favorites
        </NavLink>
      </nav>

      {/* Utilities */}
      <div className="hidden md:flex gap-4 items-center">
        <button className="text-stone-400 hover:text-stone-600 transition-colors">
          <Settings className="w-4 h-4" />
        </button>
        <span className="h-4 w-px bg-stone-200"></span>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-stone-400 hover:text-stone-600 transition-colors">GITHUB</a>
      </div>

      {/* Mobile menu button */}
      <div className="flex items-center md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center p-2 rounded-md text-stone-400 hover:text-stone-900 hover:bg-stone-50 focus:outline-none"
        >
          {isOpen ? <X className="block h-5 w-5" /> : <Menu className="block h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-stone-200 z-50 md:hidden shadow-lg">
          <div className="px-4 py-3 flex flex-col gap-3">
             <div className="border-b border-stone-100 pb-2">
               <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-2">Module Navigation</span>
               {internalLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) => cn("block py-2 text-sm font-semibold", isActive ? "text-blue-700" : "text-stone-600")}
                  >
                    {link.name}
                  </NavLink>
                ))}
             </div>
             <div>
               <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-2">Ecosystem Links</span>
               {externalLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.path}
                    onClick={() => setIsOpen(false)}
                    className="block py-2 text-sm font-semibold text-stone-600"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.name}
                  </a>
                ))}
             </div>
          </div>
        </div>
      )}
    </header>
  );
}
