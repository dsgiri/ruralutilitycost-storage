import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

interface GrainFillGaugeProps {
  fillPercentage: number; // 0 to 100
  fillColor?: string; // hex or tailwind class
  className?: string;
  label?: string;
}

export function GrainFillGauge({ fillPercentage, fillColor = 'bg-silo-steel', className, label }: GrainFillGaugeProps) {
  // Clamp percentage between 0 and 100
  const clampedFill = Math.min(Math.max(fillPercentage, 0), 100);

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="relative w-24 h-48 bg-stone-200 border-4 border-silo-steel overflow-hidden shadow-inner flex flex-col justify-end" style={{ borderBottomLeftRadius: '2rem', borderBottomRightRadius: '2rem', borderTopLeftRadius: '0.25rem', borderTopRightRadius: '0.25rem' }}>
        <motion.div 
          className={cn("w-full transition-colors duration-500", fillColor)}
          initial={{ height: 0 }}
          animate={{ height: `${clampedFill}%` }}
          transition={{ type: "spring", stiffness: 50, damping: 15 }}
        />
        
        {/* Roof / Eave lines purely decorative overlay */}
        <div className="absolute top-0 left-0 right-0 h-4 border-b-2 border-silo-steel/30 opacity-50"></div>
        <div className="absolute top-4 left-0 right-0 h-4 border-b-2 border-silo-steel/30 opacity-50"></div>
        <div className="absolute top-8 left-0 right-0 h-4 border-b-2 border-silo-steel/30 opacity-50"></div>
      </div>
      {label && <div className="mt-4 font-display font-bold text-lg text-silo-steel uppercase tracking-widest">{label}</div>}
    </div>
  );
}
