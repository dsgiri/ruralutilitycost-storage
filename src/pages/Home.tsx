import React from 'react';
import { TOOLS } from '../data/tools';
import { ToolCard } from '../components/tools/ToolCard';
import { useFavorites } from '../hooks/useFavorites';
import { NavLink } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';
import { AdBox } from '../components/ads/AdBox';
import { trackClick } from '../lib/analytics';

export function Home() {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const favoriteTools = TOOLS.filter(t => favorites.includes(t.id));

  return (
    <div className="flex flex-col lg:flex-row w-full h-full overflow-hidden">
      <SEO 
        title="Storage Hub | Rural Utility Cost" 
        description="Estimate agricultural storage capacity, monitor EPA compliance thresholds, and track inventory for feed, grain, and water." 
        canonicalPath="/"
      />
      
      {/* Sidebar: Categories */}
      <aside className="w-full lg:w-64 bg-white border-b lg:border-b-0 lg:border-r border-stone-200 p-6 flex flex-col gap-8 shrink-0 lg:overflow-y-auto" aria-label="Tool Categories">
        <section>
          <h2 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-4">Categories</h2>
          <div className="space-y-1">
            <button 
              onClick={() => trackClick('category_all')}
              className="w-full text-left px-3 py-2 rounded-md text-xs font-medium bg-stone-100 text-stone-900 flex items-center justify-between min-h-[48px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={`View All Ledgers, ${TOOLS.length} total`}
            >
              <span>All Ledgers</span>
              <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-stone-200 shadow-sm">{TOOLS.length}</span>
            </button>
            <button onClick={() => trackClick('category_grain')} className="w-full text-left px-3 py-2 rounded-md text-xs font-medium text-stone-600 hover:bg-stone-50 transition-colors min-h-[48px] focus:outline-none focus:ring-2 focus:ring-blue-500">Grain Storage</button>
            <button onClick={() => trackClick('category_feed')} className="w-full text-left px-3 py-2 rounded-md text-xs font-medium text-stone-600 hover:bg-stone-50 transition-colors min-h-[48px] focus:outline-none focus:ring-2 focus:ring-blue-500">Feed Storage</button>
            <button onClick={() => trackClick('category_equipment')} className="w-full text-left px-3 py-2 rounded-md text-xs font-medium text-stone-600 hover:bg-stone-50 transition-colors min-h-[48px] focus:outline-none focus:ring-2 focus:ring-blue-500">Equipment Space</button>
            <button onClick={() => trackClick('category_tank')} className="w-full text-left px-3 py-2 rounded-md text-xs font-medium text-stone-600 hover:bg-stone-50 transition-colors min-h-[48px] focus:outline-none focus:ring-2 focus:ring-blue-500">Tank & Bin Capacity</button>
            <button onClick={() => trackClick('category_spoilage')} className="w-full text-left px-3 py-2 rounded-md text-xs font-medium text-stone-600 hover:bg-stone-50 transition-colors min-h-[48px] focus:outline-none focus:ring-2 focus:ring-blue-500">Spoilage Prevention</button>
            <button onClick={() => trackClick('category_water')} className="w-full text-left px-3 py-2 rounded-md text-xs font-medium text-stone-600 hover:bg-stone-50 transition-colors min-h-[48px] focus:outline-none focus:ring-2 focus:ring-blue-500">Water Quality & EPA</button>
          </div>
        </section>

        <section className="bg-stone-50 rounded-xl p-4 border border-stone-100">
          <h3 className="text-xs font-bold mb-2 text-stone-900">How Storage Tools Work</h3>
          <p className="text-[10px] text-stone-500 leading-relaxed italic mb-3">
            Our estimators use standardized volumetric equations and regional density coefficients to provide agricultural planning support.
          </p>
          <div className="flex items-center gap-2" aria-hidden="true">
            <div className="w-full h-1 bg-stone-200 rounded-full overflow-hidden"><div className="w-2/3 h-full bg-blue-500"></div></div>
            <span className="text-[9px] text-stone-400 whitespace-nowrap">64% Accuracy</span>
          </div>
        </section>

        <AdBox slotId="sidebar_ad" format="rectangle" className="mt-auto hidden lg:flex" />
      </aside>

      {/* Central Content Area */}
      <div className="flex-1 flex flex-col p-4 md:p-8 overflow-y-auto bg-[#fafafa]">
        {/* Hero */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-light text-stone-800 mb-2">Inventory & Capacity Hub</h1>
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
                  onToggleFavorite={(id) => {
                     trackClick(`favorite_toggle_${id}`);
                     toggleFavorite(id);
                  }} 
                />
              ))}
            </div>
          </div>

          {/* Side Column: Favorites & Stats */}
          <div className="space-y-6">
            <section aria-label="Pinned Favorites">
              <h2 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">My Favorites</h2>
              <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm">
                {favoriteTools.length > 0 ? (
                  favoriteTools.map(tool => (
                    <div key={tool.id} className="p-3 border-b border-stone-100 flex items-center justify-between last:border-0 odd:bg-stone-50/50">
                      <span className="text-[10px] font-bold text-stone-800 truncate pr-2">{tool.title}</span>
                      <button 
                        onClick={() => {
                          trackClick(`favorite_remove_${tool.id}`);
                          toggleFavorite(tool.id);
                        }} 
                        className="text-red-500 text-[10px] font-bold shrink-0 transition-colors hover:text-red-700 min-h-[32px] px-2 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                        aria-label={`Remove ${tool.title} from favorites`}
                      >
                        REMOVE
                      </button>
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

            <section className="bg-blue-900 text-white p-6 rounded-2xl relative overflow-hidden" aria-labelledby="forecast-heading">
              <div className="relative z-10">
                <h3 id="forecast-heading" className="text-sm font-bold mb-1">Utilization Forecast</h3>
                <p className="text-[10px] text-blue-200 mb-4 tracking-wide">Estimated regional capacity demand.</p>
                <div className="text-3xl font-light mb-2">82.4%</div>
                <div className="w-full h-1.5 bg-blue-800 rounded-full mb-1" aria-hidden="true">
                  <div className="w-[82%] h-full bg-blue-400 rounded-full"></div>
                </div>
                <span className="text-[9px] text-blue-300 uppercase tracking-tighter font-bold">Peak season approach: 14 days</span>
              </div>
              {/* Decorative SVG for grid texture */}
              <div className="absolute top-0 right-0 p-2 opacity-10" aria-hidden="true">
                <svg width="80" height="80" viewBox="0 0 20 20"><path d="M1 1h1v1H1V1zm2 0h1v1H3V1zm2 0h1v1H5V1z" fill="currentColor"/></svg>
              </div>
            </section>

            <AdBox slotId="sidebar_ad_mobile" className="lg:hidden" />
          </div>
        </div>
      </div>
    </div>
  );
}
