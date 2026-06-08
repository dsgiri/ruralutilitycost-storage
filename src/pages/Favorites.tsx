import React from 'react';
import { TOOLS } from '../data/tools';
import { ToolCard } from '../components/tools/ToolCard';
import { useFavorites } from '../hooks/useFavorites';
import { HeartCrack } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';
import { trackClick } from '../lib/analytics';

export function Favorites() {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  
  const favoriteTools = TOOLS.filter(tool => favorites.includes(tool.id));

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-8 py-12 overflow-y-auto">
      <SEO 
        title="Pinned Ledgers | Rural Utility Cost" 
        description="Quick access to your saved storage compliance tools and capacity estimators." 
        canonicalPath="/favorites"
      />
      <div className="mb-8">
        <h1 className="text-3xl font-light text-stone-800 mb-2">My Pinned Ledgers</h1>
        <p className="text-sm text-stone-500 max-w-xl leading-relaxed">Customized fast-access to critical compliance dashboards and capacity estimators.</p>
      </div>

      {favoriteTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteTools.map((tool) => (
            <ToolCard 
              key={tool.id} 
              tool={tool} 
              isFavorite={isFavorite(tool.id)} 
              onToggleFavorite={(id) => {
                 trackClick(`unfavorite_${id}`);
                 toggleFavorite(id);
              }} 
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-10 sm:p-16 bg-white border border-stone-200 border-dashed rounded-xl text-center">
          <HeartCrack className="w-16 h-16 text-stone-300 mb-4" aria-hidden="true" />
          <h2 className="text-xl font-bold text-stone-600 mb-2">No ledgers pinned yet</h2>
          <p className="text-stone-500 max-w-md mb-6 text-sm">
            Click the heart icon on any auditor or capacity module from the home dashboard to add it to your pinned compliant tools list.
          </p>
          <NavLink 
            to="/" 
            className="px-6 py-3 min-h-[48px] flex items-center justify-center bg-stone-900 text-white font-bold rounded hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => trackClick('btn_browse_ledgers')}
          >
            Browse Ledgers
          </NavLink>
        </div>
      )}
    </div>
  );
}
