import React from 'react';
import { StorageTool } from '../../types';
import { Heart } from 'lucide-react';
import { cn } from '../../lib/utils';
import { NavLink } from 'react-router-dom';

interface Props {
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
    <div className="bg-white border border-stone-200 p-4 rounded-xl shadow-sm hover:border-blue-300 transition-colors group flex flex-col h-full">
      <div className="flex justify-between items-start mb-2">
        <span className={cn("text-[10px] font-bold uppercase tracking-wide", getCategoryColor(tool.category))}>
          {tool.category}
        </span>
        <button 
          onClick={() => onToggleFavorite(tool.id)}
          className={cn("hover:text-red-500 transition-colors focus:outline-none", isFavorite ? "text-red-500" : "text-stone-300")}
          aria-label={isFavorite ? `Remove ${tool.title} from favorites` : `Add ${tool.title} to favorites`}
        >
          <Heart className={cn("w-4 h-4", isFavorite && "fill-current")} />
        </button>
      </div>
      <h3 className="font-bold text-stone-900 mb-1 leading-tight">{tool.title}</h3>
      <p className="text-xs text-stone-500 mb-4 flex-grow">{tool.description}</p>
      
      <div className="flex items-center justify-between mt-auto">
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
          className="px-4 py-1.5 bg-stone-900 text-white text-[10px] font-bold rounded hover:bg-blue-700 transition-colors whitespace-nowrap shrink-0 ml-2"
        >
          OPEN TOOL
        </NavLink>
      </div>
    </div>
  );
}
