import sys

code = """import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calculator, Info } from 'lucide-react';
import { CalculatorPageLayout } from '../../components/layout/CalculatorPageLayout';
import { GrainFillGauge } from '../../components/ui/GrainFillGauge';

export function GrainBinCapacity() {
  const [diameter, setDiameter] = useState('30');
  const [eaveHeight, setEaveHeight] = useState('24');
  const [fillShape, setFillShape] = useState<'level' | 'peaked'>('peaked');
  const [peakHeight, setPeakHeight] = useState('8');
  const [packFactor, setPackFactor] = useState('1.05');
  
  // Adding current fill height to make the fill gauge map naturally
  const [currentFill, setCurrentFill] = useState('24');

  const results = useMemo(() => {
    const d = parseFloat(diameter) || 0;
    const h = parseFloat(eaveHeight) || 0;
    const p = parseFloat(peakHeight) || 0;
    const pack = parseFloat(packFactor) || 1.0;
    const fill = parseFloat(currentFill) || 0;

    const radius = d / 2;
    
    // Total max capacity
    const maxCylVol = Math.PI * Math.pow(radius, 2) * h;
    let maxConeVol = 0;
    if (fillShape === 'peaked') {
      maxConeVol = (Math.PI * Math.pow(radius, 2) * p) / 3;
    }
    const maxTotalVolFt3 = maxCylVol + maxConeVol;
    const maxBushels = (maxTotalVolFt3 * 0.80356) * pack;

    // Current filled capacity
    let filledCylVol = 0;
    let filledConeVol = 0;
    
    if (fill <= h) {
       filledCylVol = Math.PI * Math.pow(radius, 2) * fill;
    } else {
       filledCylVol = Math.PI * Math.pow(radius, 2) * h;
       const coneFill = fill - h;
       // volume of a frustum or partial cone...
       // simpler approximation for a partial peak:
       const peakRatio = Math.min(coneFill / (p || 1), 1);
       // Volume of filled part of cone = total cone - empty top cone
       // Empty top cone radius ratio is (1 - peakRatio)
       if (fillShape === 'peaked' && p > 0) {
           const emptyTopConeVol = maxConeVol * Math.pow(1 - peakRatio, 3);
           filledConeVol = maxConeVol - emptyTopConeVol;
       }
    }
    
    const currentTotalVolFt3 = filledCylVol + filledConeVol;
    const currentBushels = (currentTotalVolFt3 * 0.80356) * pack;
    
    const fillPercentage = maxBushels > 0 ? (currentBushels / maxBushels) * 100 : 0;

    return {
      maxBushels: Math.round(maxBushels),
      currentBushels: Math.round(currentBushels),
      fillPercentage: Math.max(0, Math.min(100, fillPercentage))
    };
  }, [diameter, eaveHeight, fillShape, peakHeight, packFactor, currentFill]);


  const heroTool = (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-8">
      {/* Inputs Column */}
      <div className="lg:col-span-6 flex flex-col gap-5">
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-stone-200">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="w-6 h-6 text-silo-steel" />
            <h2 className="font-display text-2xl font-bold text-ink">Bin Geometry</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-stone-800 mb-1">Diameter (ft)</label>
              <input type="number" value={diameter} onChange={(e) => setDiameter(e.target.value)} className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-silo-steel outline-none text-base font-medium font-mono" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-800 mb-1">Eave Height (ft)</label>
              <input type="number" value={eaveHeight} onChange={(e) => setEaveHeight(e.target.value)} className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-silo-steel outline-none text-base font-medium font-mono" />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-semibold text-stone-800 mb-1">Fill Shape</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="fillShape" checked={fillShape === 'peaked'} onChange={() => setFillShape('peaked')} className="w-4 h-4 text-silo-steel focus:ring-silo-steel" />
                <span className="text-sm font-medium">Peaked</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="fillShape" checked={fillShape === 'level'} onChange={() => setFillShape('level')} className="w-4 h-4 text-silo-steel focus:ring-silo-steel" />
                <span className="text-sm font-medium">Level</span>
              </label>
            </div>
          </div>

          {fillShape === 'peaked' && (
            <div className="mb-4">
              <label className="block text-sm font-semibold text-stone-800 mb-1">Peak Height (ft) <Info className="inline w-3 h-3 text-stone-400" title="Height from eave to peak" /></label>
              <input type="number" value={peakHeight} onChange={(e) => setPeakHeight(e.target.value)} className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-silo-steel outline-none text-base font-medium font-mono" />
            </div>
          )}

          <div className="mb-4 pt-4 border-t border-stone-100">
            <label className="flex justify-between text-sm font-semibold text-stone-800 mb-3">
              <span>Current Fill Height (ft)</span>
              <span className="bg-stone-100 px-2 py-0.5 rounded text-stone-700 font-mono">{currentFill} ft</span>
            </label>
            <input 
              type="range" 
              min="0" 
              max={parseFloat(eaveHeight || '0') + (fillShape === 'peaked' ? parseFloat(peakHeight || '0') : 0)} 
              step="1" 
              value={currentFill} 
              onChange={(e) => setCurrentFill(e.target.value)} 
              className="w-full accent-silo-steel" 
            />
          </div>

          <div className="mt-4 pt-4 border-t border-stone-100">
            <label className="block text-sm font-semibold text-stone-800 mb-1">Pack Factor <Info className="inline w-3 h-3 text-stone-400" title="1.0 to 1.1 typical for compaction" /></label>
            <input type="number" step="0.01" value={packFactor} onChange={(e) => setPackFactor(e.target.value)} className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-silo-steel outline-none text-base font-medium font-mono" />
          </div>
        </div>
      </div>

      {/* Results Column */}
      <div className="lg:col-span-6 flex flex-col gap-6">
        <div className="bg-silo-steel rounded-2xl shadow-xl p-8 sm:p-10 text-white relative overflow-hidden flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="relative z-10 flex-1">
            <h3 className="text-stone-400 font-display font-bold uppercase tracking-widest text-sm mb-2">Estimated Volume</h3>
            <p className="text-lg text-stone-300 mb-2">You currently have <strong className="text-white font-mono text-4xl sm:text-5xl ml-1 tracking-tight">{results.currentBushels.toLocaleString()}</strong></p>
            <p className="text-base text-stone-400 mb-8 max-w-lg">
              bushels in this bin.
            </p>
            
            <div className="pt-6 border-t border-stone-700/50">
              <div className="text-stone-400 text-sm mb-1 flex items-center gap-1">Maximum Capacity</div>
              <div className="font-mono text-xl font-semibold text-grain-gold">{results.maxBushels.toLocaleString()}<span className="text-sm text-stone-500 font-normal font-sans"> bu</span></div>
            </div>
          </div>

          <div className="shrink-0 flex flex-col items-center">
             <GrainFillGauge 
                fillPercentage={results.fillPercentage} 
                fillColor={results.fillPercentage > 95 ? 'bg-harvest-rust' : 'bg-field-sage'} 
             />
             <div className="mt-4 text-center text-[10px] font-bold uppercase tracking-widest text-stone-400">
               {results.fillPercentage.toFixed(0)}% Full
             </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-6 bg-grain-gold/10 rounded-2xl border border-grain-gold/20">
          <div>
            <h4 className="font-bold text-ink mb-1">Know your capacity</h4>
            <p className="text-sm text-stone-600">Now find out if storing is financially worth it.</p>
          </div>
          <Link to={`/store-or-sell-calculator?capacity=${results.currentBushels}`} className="shrink-0 inline-flex items-center justify-center px-6 py-3 bg-grain-gold text-ink font-semibold rounded-lg hover:bg-yellow-500 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-grain-gold">
            Store or Sell? <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-6 bg-white rounded-2xl border border-stone-200 shadow-sm mt-4">
          <div>
            <h4 className="font-bold text-ink mb-1">Check your Spoilage Risk</h4>
            <p className="text-sm text-stone-600">Ensure your crop is safe to hold.</p>
          </div>
          <Link to="/spoilage-risk-calculator" className="shrink-0 inline-flex items-center justify-center px-6 py-3 bg-white border border-stone-200 text-ink font-semibold rounded-lg hover:bg-stone-50 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-stone-500">
            Spoilage Risk <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );

  const workedExample = (
    <>
      <p>Suppose you have a bin that is <strong>30 ft in diameter</strong> and <strong>24 ft to the eave</strong>, filled to the eave (level). Your pack factor is <strong>1.05</strong>.</p>
      <ul>
        <li>Radius = 15 ft.</li>
        <li>Volume in cubic feet = &pi; &times; (15)<sup>2</sup> &times; 24 = 16,964.6 ft<sup>3</sup>.</li>
      </ul>
      <p><strong>Step 1: Convert to Bushels</strong><br/>
      One cubic foot holds approximately 0.80356 standard Winchester bushels. 16,964.6 &times; 0.80356 = 13,632 bushels.</p>
      <p><strong>Step 2: Apply Pack Factor</strong><br/>
      Grain settles and packs tighter at the bottom. Multiply by your pack factor (1.05) = <strong>14,314 bushels</strong>.</p>
    </>
  );

  const formulaSection = (
    <div>
      <p className="mb-4"><code>Bushels = (Cylinder Vol + Cone Vol) × 0.80356 × Pack Factor</code></p>
      <ul className="text-sm mt-4 text-stone-600 font-sans space-y-2">
        <li><strong>Cylinder Vol:</strong> &pi; × Radius<sup>2</sup> × Eave Height</li>
        <li><strong>Cone Vol:</strong> (&pi; × Radius<sup>2</sup> × Peak Height) / 3</li>
        <li><strong>0.80356:</strong> The standard conversion factor of cubic feet to Winchester bushels.</li>
      </ul>
    </div>
  );

  const assumptions = (
    <>
      <ul>
        <li><strong>Test Weight:</strong> Standard test weight is assumed. If your crop has a low test weight, actual bushels by weight will be lower than this volumetric estimate.</li>
        <li><strong>Pack Factor:</strong> Grain compaction increases the deeper the bin. A factor of 1.05 (5% compaction) is a common standard, but heavy grain in large bins can exceed 1.10.</li>
        <li><strong>Bin Geometry:</strong> Assumes a standard flat-bottom cylinder with a simple conical roof. Hopper bottom bins will have slightly different capacity geometry.</li>
      </ul>
    </>
  );

  const faq = (
    <>
      <div className="bg-white p-6 rounded-xl border border-stone-200">
        <h3 className="font-display font-bold text-2xl text-ink mb-2">How accurate is a bin capacity estimate?</h3>
        <p className="text-stone-600">Estimates are usually within 3-5% of actual. The biggest variable is the pack factor, which changes based on test weight, moisture, and how the grain was dropped into the bin (e.g. using a spreader vs a single spout).</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-stone-200">
        <h3 className="font-display font-bold text-2xl text-ink mb-2">What is grain pack factor?</h3>
        <p className="text-stone-600">Grain at the bottom of a bin is crushed slightly by the weight of the grain above it, removing air space. This means a 40-foot tall bin holds slightly more bushels than two 20-foot tall bins of the same diameter.</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-stone-200">
        <h3 className="font-display font-bold text-2xl text-ink mb-2">How do I measure the peak height?</h3>
        <p className="text-stone-600">Peak height is the vertical distance from the eave (top of the straight wall) to the top of the grain cone. You can estimate this by knowing the angle of repose for your grain (typically 22-28 degrees for corn and soybeans).</p>
      </div>
    </>
  );

  return (
    <CalculatorPageLayout 
      title="Grain Bin Capacity Estimator"
      description="Estimate bushel capacity based on bin geometry, eave height, and compaction factors."
      canonicalPath="/grain-bin-estimator"
      heroTool={heroTool}
      workedExample={workedExample}
      formulaSection={formulaSection}
      assumptions={assumptions}
      faq={faq}
    />
  );
}
"""

with open('src/pages/tools/GrainBinCapacity.tsx', 'w') as f:
    f.write(code)
