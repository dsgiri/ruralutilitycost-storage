import React from 'react';
import { StorageTool } from '../../types';
import { Heart } from 'lucide-react';
import { cn } from '../../lib/utils';
import { NavLink } from 'react-router-dom';
import { trackClick } from '../../lib/analytics';

interface Props {
  key?: React.Key;
  tool: StorageTool;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export function ToolCard({ tool, isFavorite, onToggleFavorite }: Props) {
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Spoilage Reduction': return 'text-red-600';
      case 'Water Quality & EPA Compliance': return 'text-blue-700';
      case 'Feed Storage': return 'text-amber-700';
      default: return 'text-blue-600';
    }
  };

  return (
    <article className="bg-white border border-stone-200 p-4 rounded-xl shadow-sm hover:border-blue-300 transition-colors group flex flex-col h-full focus-within:ring-2 focus-within:ring-blue-500">
      <div className="flex justify-between items-start mb-2">
        <span className={cn("text-[10px] font-bold uppercase tracking-wide", getCategoryColor(tool.category))} aria-label={`Category: ${tool.category}`}>
          {tool.category}
        </span>
        <button 
          onClick={() => onToggleFavorite(tool.id)}
          className={cn("hover:text-red-500 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 rounded p-1 -m-1 min-h-[32px] min-w-[32px] flex items-center justify-center", isFavorite ? "text-red-500" : "text-stone-300")}
          aria-label={isFavorite ? `Remove ${tool.title} from favorites` : `Add ${tool.title} to favorites`}
          aria-pressed={isFavorite}
        >
          <Heart className={cn("w-5 h-5", isFavorite && "fill-current")} aria-hidden="true" />
        </button>
      </div>
      <h3 className="font-bold text-stone-900 mb-1 leading-tight">{tool.title}</h3>
      <p className="text-xs text-stone-500 mb-4 flex-grow">{tool.description}</p>
      
      <div className="flex items-center justify-between mt-auto pt-2">
        <div className="flex items-center gap-2">
           {tool.verificationStatus === 'Pending Human Verification' ? (
             <>
               <div className="w-12 h-2 bg-stone-200 rounded-full overflow-hidden"><div className="w-1/3 h-full bg-amber-400"></div></div>
               <span className="text-[10px] text-stone-400 truncate max-w-[80px]">Review</span>
             </>
           ) : tool.verificationStatus === 'Red Flag - MCL Exceeded' ? (
             <>
               <div className="w-12 h-2 bg-stone-200 rounded-full overflow-hidden"><div className="w-full h-full bg-red-600 animate-pulse"></div></div>
               <span className="text-[10px] text-stone-400 truncate max-w-[80px]">MCL Hit</span>
             </>
           ) : (
             <>
               <div className="px-2 py-1 bg-stone-100 rounded text-[10px] font-mono font-bold text-stone-700 truncate max-w-[100px]">{tool.primaryOutcome}</div>
             </>
           )}
        </div>
        
        <NavLink 
          to={tool.path}
          onClick={() => trackClick(`launch_${tool.id}`)}
          className="px-4 py-2 bg-stone-900 text-white text-[10px] font-bold rounded hover:bg-blue-700 transition-colors whitespace-nowrap shrink-0 ml-2 min-h-[36px] flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
          aria-label={`Open ${tool.title} Tool`}
        >
          OPEN TOOL
        </NavLink>
      </div>
    </article>
  );
}
