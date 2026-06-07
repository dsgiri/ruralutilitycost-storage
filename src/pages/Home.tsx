import React from 'react';
import { TOOLS } from '../data/tools';
import { ToolCard } from '../components/tools/ToolCard';
import { useFavorites } from '../hooks/useFavorites';
import { NavLink } from 'react-router-dom';

export function Home() {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const favoriteTools = TOOLS.filter(t => favorites.includes(t.id));

  return (
    <div className="flex w-full h-full">
      {/* Sidebar: Categories */}
      <aside className="w-64 bg-white border-r border-stone-200 p-6 hidden lg:flex flex-col gap-8 shrink-0 overflow-y-auto">
        <section>
          <h3 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-4">Categories</h3>
          <div className="space-y-1">
            <button className="w-full text-left px-3 py-2 rounded-md text-xs font-medium bg-stone-100 text-stone-900 flex items-center justify-between">
              <span>All Ledgers</span>
              <span className="text-[10px] bg-white px-1.5 py-0.5 rounded border border-stone-200 shadow-sm">{TOOLS.length}</span>
            </button>
            <button className="w-full text-left px-3 py-2 rounded-md text-xs font-medium text-stone-600 hover:bg-stone-50 transition-colors">Grain Storage</button>
            <button className="w-full text-left px-3 py-2 rounded-md text-xs font-medium text-stone-600 hover:bg-stone-50 transition-colors">Feed Storage</button>
            <button className="w-full text-left px-3 py-2 rounded-md text-xs font-medium text-stone-600 hover:bg-stone-50 transition-colors">Equipment Space</button>
            <button className="w-full text-left px-3 py-2 rounded-md text-xs font-medium text-stone-600 hover:bg-stone-50 transition-colors">Tank & Bin Capacity</button>
            <button className="w-full text-left px-3 py-2 rounded-md text-xs font-medium text-stone-600 hover:bg-stone-50 transition-colors">Spoilage Prevention</button>
            <button className="w-full text-left px-3 py-2 rounded-md text-xs font-medium text-stone-600 hover:bg-stone-50 transition-colors">Water Quality & EPA</button>
          </div>
        </section>

        <section className="mt-auto bg-stone-50 rounded-xl p-4 border border-stone-100">
          <h4 className="text-xs font-bold mb-2 text-stone-900">How Storage Tools Work</h4>
          <p className="text-[10px] text-stone-500 leading-relaxed italic mb-3">
            Our estimators use standardized volumetric equations and regional density coefficients to provide agricultural planning support.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-full h-1 bg-stone-200 rounded-full overflow-hidden"><div className="w-2/3 h-full bg-blue-500"></div></div>
            <span className="text-[9px] text-stone-400 whitespace-nowrap">64% Accuracy</span>
          </div>
        </section>
      </aside>

      {/* Central Content Area */}
      <div className="flex-1 flex flex-col p-4 sm:p-8 overflow-y-auto bg-[#fafafa]">
        {/* Hero */}
        <div className="mb-8">
          <h1 className="text-3xl font-light text-stone-800 mb-2">Inventory & Capacity Hub</h1>
          <p className="text-sm text-stone-500 max-w-xl leading-relaxed">
            Part of the <span className="font-semibold text-stone-700">Rural Utility Cost</span> ecosystem. Estimate storage limits, manage seasonal inventory, and reduce spoilage for farm inputs.
          </p>
        </div>

        <div className="flex-1 grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
          {/* Featured Tools Grid */}
          <div className="xl:col-span-2 space-y-4">
            <h2 className="text-xs font-bold text-stone-400 uppercase tracking-widest">Recommended Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TOOLS.map((tool) => (
                <ToolCard 
                  key={tool.id} 
                  tool={tool} 
                  isFavorite={isFavorite(tool.id)} 
                  onToggleFavorite={toggleFavorite} 
                />
              ))}
            </div>
          </div>

          {/* Side Column: Favorites & Stats */}
          <div className="space-y-6">
            <section>
              <h2 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">My Favorites</h2>
              <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm">
                {favoriteTools.length > 0 ? (
                  favoriteTools.map(tool => (
                    <div key={tool.id} className="p-3 border-b border-stone-100 flex items-center justify-between last:border-0 odd:bg-stone-50/50">
                      <span className="text-[10px] font-bold text-stone-800 truncate pr-2">{tool.title}</span>
                      <button onClick={() => toggleFavorite(tool.id)} className="text-red-500 text-[10px] font-bold shrink-0 transition-colors hover:text-red-700">REMOVE</button>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-stone-400 text-[10px]">
                    No tools saved. Click the heart icon on any card.
                  </div>
                )}
                <div className="p-4 text-center text-stone-400 border-t border-stone-100 italic text-[10px]">
                  Storage uses <span className="font-mono bg-stone-100 px-1 rounded">localStorage</span> to keep your favorites saved.
                </div>
              </div>
            </section>

            <section className="bg-blue-900 text-white p-6 rounded-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-sm font-bold mb-1">Utilization Forecast</h3>
                <p className="text-[10px] text-blue-200 mb-4 tracking-wide">Estimated regional capacity demand.</p>
                <div className="text-3xl font-light mb-2">82.4%</div>
                <div className="w-full h-1.5 bg-blue-800 rounded-full mb-1">
                  <div className="w-[82%] h-full bg-blue-400 rounded-full"></div>
                </div>
                <span className="text-[9px] text-blue-300 uppercase tracking-tighter font-bold">Peak season approach: 14 days</span>
              </div>
              {/* Decorative SVG for grid texture */}
              <div className="absolute top-0 right-0 p-2 opacity-10">
                <svg width="80" height="80" viewBox="0 0 20 20"><path d="M1 1h1v1H1V1zm2 0h1v1H3V1zm2 0h1v1H5V1z" fill="currentColor"/></svg>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
