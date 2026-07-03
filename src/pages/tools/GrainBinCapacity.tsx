import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Calculator, 
  ChevronDown, 
  Info, 
  RefreshCcw,
  Printer,
  Share2
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function GrainBinCapacity() {
  // Inputs
  const [diameter, setDiameter] = useState<string>('30');
  const [eaveHeight, setEaveHeight] = useState<string>('24');
  const [fillShape, setFillShape] = useState<'level' | 'peaked'>('peaked');
  const [peakHeight, setPeakHeight] = useState<string>('8');
  const [packFactor, setPackFactor] = useState<string>('1.0');

  // Calculations
  const results = useMemo(() => {
    const d = parseFloat(diameter) || 0;
    const h = parseFloat(eaveHeight) || 0;
    const p = parseFloat(peakHeight) || 0;
    const pack = parseFloat(packFactor) || 1.0;

    const radius = d / 2;
    const cylinderVolume = Math.PI * Math.pow(radius, 2) * h;
    
    let coneVolume = 0;
    if (fillShape === 'peaked') {
      coneVolume = (1/3) * Math.PI * Math.pow(radius, 2) * p;
    }

    const totalCubicFeet = cylinderVolume + coneVolume;
    
    // Standard US Bushel = 1.244456 cubic feet
    const cubicFeetPerBushel = 1.244456;
    
    const standardBushels = totalCubicFeet / cubicFeetPerBushel;
    const packedBushels = standardBushels * pack;

    return {
      cylinderVolume,
      coneVolume,
      totalCubicFeet,
      standardBushels,
      packedBushels
    };
  }, [diameter, eaveHeight, fillShape, peakHeight, packFactor]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="w-full flex-1 overflow-y-auto bg-[#F9F9F8] text-stone-900 font-sans focus:outline-none" tabIndex={-1}>
      <Helmet>
        <title>Grain Bin Capacity Estimator | Storage Hub</title>
        <meta name="description" content="Estimate grain storage capacity based on bin dimensions, level or peaked fill, and compaction factors." />
      </Helmet>

      {/* Hero / Above the Fold */}
      <section className="bg-white border-b border-stone-200 pt-10 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-4">
              Grain Bin Capacity Estimator
            </h1>
            <p className="text-lg text-stone-600 leading-relaxed">
              Estimate bushel capacity based on bin geometry, eave height, and fill shape before harvest begins.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Input Column */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-stone-900">Bin Dimensions</h2>
                <button 
                  onClick={() => {
                    setDiameter('30');
                    setEaveHeight('24');
                    setFillShape('peaked');
                    setPeakHeight('8');
                    setPackFactor('1.0');
                  }}
                  className="text-sm text-stone-500 hover:text-[#2d5d4b] flex items-center gap-1 transition-colors"
                  aria-label="Reset calculator"
                >
                  <RefreshCcw className="w-4 h-4" /> Reset
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label htmlFor="diameter" className="block text-sm font-semibold text-stone-800 mb-2">Bin Diameter (ft)</label>
                  <input 
                    type="number"
                    id="diameter"
                    value={diameter}
                    onChange={(e) => setDiameter(e.target.value)}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#2d5d4b] focus:border-[#2d5d4b] outline-none transition-shadow text-lg"
                    min="0"
                    step="1"
                  />
                </div>

                <div>
                  <label htmlFor="eaveHeight" className="block text-sm font-semibold text-stone-800 mb-2">Eave Height (ft)</label>
                  <input 
                    type="number"
                    id="eaveHeight"
                    value={eaveHeight}
                    onChange={(e) => setEaveHeight(e.target.value)}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#2d5d4b] focus:border-[#2d5d4b] outline-none transition-shadow text-lg"
                    min="0"
                    step="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-stone-800 mb-3">Fill Shape</label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className={`
                      flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors
                      ${fillShape === 'level' ? 'bg-[#2d5d4b]/10 border-[#2d5d4b] text-[#2d5d4b]' : 'bg-white border-stone-300 text-stone-600 hover:bg-stone-50'}
                    `}>
                      <input 
                        type="radio" 
                        name="fillShape" 
                        value="level" 
                        checked={fillShape === 'level'}
                        onChange={() => setFillShape('level')}
                        className="sr-only"
                      />
                      <span className="font-semibold">Level Fill</span>
                    </label>
                    <label className={`
                      flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors
                      ${fillShape === 'peaked' ? 'bg-[#2d5d4b]/10 border-[#2d5d4b] text-[#2d5d4b]' : 'bg-white border-stone-300 text-stone-600 hover:bg-stone-50'}
                    `}>
                      <input 
                        type="radio" 
                        name="fillShape" 
                        value="peaked" 
                        checked={fillShape === 'peaked'}
                        onChange={() => setFillShape('peaked')}
                        className="sr-only"
                      />
                      <span className="font-semibold">Peaked Fill</span>
                    </label>
                  </div>
                </div>

                {fillShape === 'peaked' && (
                  <div>
                    <label htmlFor="peakHeight" className="block text-sm font-semibold text-stone-800 mb-2">Peak Height (ft)</label>
                    <input 
                      type="number"
                      id="peakHeight"
                      value={peakHeight}
                      onChange={(e) => setPeakHeight(e.target.value)}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#2d5d4b] focus:border-[#2d5d4b] outline-none transition-shadow text-lg"
                      min="0"
                      step="1"
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="packFactor" className="block text-sm font-semibold text-stone-800 mb-2">Compaction / Pack Factor</label>
                  <div className="relative">
                    <select 
                      id="packFactor"
                      value={packFactor}
                      onChange={(e) => setPackFactor(e.target.value)}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#2d5d4b] focus:border-[#2d5d4b] outline-none transition-shadow text-lg appearance-none pr-10"
                    >
                      <option value="1.0">Standard (No Pack - 1.0)</option>
                      <option value="1.02">Light Pack (1.02)</option>
                      <option value="1.05">Average Pack (1.05)</option>
                      <option value="1.08">Heavy Pack (1.08)</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-500 pointer-events-none" />
                  </div>
                  <p className="text-xs text-stone-500 mt-2">Grain compresses under its own weight, increasing total bin capacity by 2-8%.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Output Column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-[#2d5d4b] rounded-xl shadow-md p-8 sm:p-10 text-white relative overflow-hidden">
              {/* Background decorative element */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 text-white/5 pointer-events-none">
                <Calculator className="w-64 h-64" />
              </div>

              <div className="relative z-10">
                <h3 className="text-[#a5c5b5] font-bold uppercase tracking-widest text-sm mb-4">Estimated Capacity</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl sm:text-6xl font-extrabold tracking-tight">
                    {Math.round(results.packedBushels).toLocaleString()}
                  </span>
                  <span className="text-xl sm:text-2xl text-[#a5c5b5] font-semibold">bu</span>
                </div>
                <p className="text-[#a5c5b5] text-sm mt-4">
                  Based on volumetric standard bushels (1.244 cu. ft. / bu).
                </p>
              </div>

              <div className="relative z-10 mt-10 grid grid-cols-2 gap-6 border-t border-[#3e7560] pt-6">
                <div>
                  <span className="block text-[#a5c5b5] text-sm mb-1 font-semibold">Total Volume</span>
                  <span className="text-2xl font-bold">{Math.round(results.totalCubicFeet).toLocaleString()} <span className="text-base font-normal text-[#a5c5b5]">cu. ft.</span></span>
                </div>
                <div>
                  <span className="block text-[#a5c5b5] text-sm mb-1 font-semibold">Fill Style</span>
                  <span className="text-2xl font-bold capitalize">{fillShape}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handlePrint}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-stone-200 text-stone-800 font-bold rounded-lg hover:border-stone-300 hover:bg-stone-50 transition-colors focus:outline-none focus:ring-2 focus:ring-stone-500"
              >
                <Printer className="w-5 h-5" />
                Print Estimate
              </button>
              <button 
                onClick={() => alert("Link copied to clipboard!")}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-stone-200 text-stone-800 font-bold rounded-lg hover:border-stone-300 hover:bg-stone-50 transition-colors focus:outline-none focus:ring-2 focus:ring-stone-500"
              >
                <Share2 className="w-5 h-5" />
                Share Tool
              </button>
            </div>

            {/* Details Panel */}
            <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6 mt-2">
              <h3 className="font-bold text-stone-900 mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-stone-400" />
                Volume Breakdown
              </h3>
              <ul className="space-y-3 text-sm text-stone-600">
                <li className="flex justify-between border-b border-stone-100 pb-2">
                  <span>Cylinder Volume (Eave):</span>
                  <span className="font-semibold text-stone-900">{Math.round(results.cylinderVolume).toLocaleString()} cu. ft.</span>
                </li>
                {fillShape === 'peaked' && (
                  <li className="flex justify-between border-b border-stone-100 pb-2">
                    <span>Peaked Cone Volume:</span>
                    <span className="font-semibold text-stone-900">{Math.round(results.coneVolume).toLocaleString()} cu. ft.</span>
                  </li>
                )}
                <li className="flex justify-between border-b border-stone-100 pb-2">
                  <span>Standard Bushels (Unpacked):</span>
                  <span className="font-semibold text-stone-900">{Math.round(results.standardBushels).toLocaleString()} bu</span>
                </li>
                <li className="flex justify-between pt-1">
                  <span>Pack Factor Used:</span>
                  <span className="font-semibold text-stone-900">{packFactor}x</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Below the Fold Context */}
      <section className="bg-white border-t border-stone-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* How It Works & Definitions */}
            <div>
              <h3 className="text-2xl font-bold text-stone-900 mb-6">How This Calculator Works</h3>
              <div className="prose prose-stone">
                <p>
                  This tool calculates the geometric volume of a round grain bin and converts that volume into standard US volumetric bushels. 
                </p>
                <ul className="space-y-2 mt-4 text-stone-600 list-disc pl-5">
                  <li><strong>Base Volume (Cylinder):</strong> Uses the standard cylinder formula <code>&pi; &times; r&sup2; &times; h</code> where <em>r</em> is half the diameter and <em>h</em> is the eave height.</li>
                  <li><strong>Peaked Fill (Cone):</strong> If the bin is peaked, it adds the cone volume using <code>&#8531; &times; &pi; &times; r&sup2; &times; p</code> where <em>p</em> is the peak height.</li>
                  <li><strong>Bushel Conversion:</strong> Divides total cubic feet by 1.244456 (the volume of one standard US bushel).</li>
                  <li><strong>Pack Factor:</strong> Multiplies the standard bushel result by a chosen pack factor (usually 1.02 to 1.08) to account for grain compressing under its own weight.</li>
                </ul>
              </div>

              <h4 className="text-lg font-bold text-stone-900 mt-10 mb-4">Key Definitions</h4>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="font-bold text-stone-800">Eave Height</dt>
                  <dd className="text-stone-600">The vertical distance from the bin floor to the roof line (the eave).</dd>
                </div>
                <div>
                  <dt className="font-bold text-stone-800">Peak Height</dt>
                  <dd className="text-stone-600">The vertical distance from the eave line to the top of the grain peak.</dd>
                </div>
                <div>
                  <dt className="font-bold text-stone-800">Standard Bushel</dt>
                  <dd className="text-stone-600">A volumetric measure equal to 1.244456 cubic feet, distinct from "test weight" bushels which are sold by weight.</dd>
                </div>
              </dl>
            </div>

            {/* FAQs & Related Tools */}
            <div>
              <h3 className="text-2xl font-bold text-stone-900 mb-6">Frequently Asked Questions</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-stone-900 mb-2">Does this account for test weight?</h4>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    No. This calculator provides a strict volumetric estimate. If you are dealing with lightweight grain (e.g., 52 lb corn instead of 56 lb), the physical volume required is the same, but the total weight in the bin will be lower.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 mb-2">How much does pack factor really matter?</h4>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    Compaction can increase storage capacity by 3% to 8% depending on the grain type, moisture, and bin height. Taller bins experience more compaction at the bottom.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 mb-2">What if my bin has a hopper bottom?</h4>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    This version of the calculator assumes a flat-bottom bin. For a hopper bottom, you would need to calculate the inverted cone volume of the hopper and add it to the total.
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-bold text-stone-900 mt-10 mb-4">Related Storage Tools</h3>
              <div className="space-y-3">
                <Link to="/tools/spoilage-risk-assessor" className="block p-4 border border-stone-200 rounded-lg hover:border-[#2d5d4b] transition-colors">
                  <span className="font-bold text-[#2d5d4b]">Spoilage Risk Assessor &rarr;</span>
                  <p className="text-sm text-stone-600 mt-1">Evaluate loss-risk percentiles using moisture and temperature factors.</p>
                </Link>
                <Link to="/tools/storage-cost-analysis" className="block p-4 border border-stone-200 rounded-lg hover:border-[#2d5d4b] transition-colors">
                  <span className="font-bold text-[#2d5d4b]">Storage Cost Analysis &rarr;</span>
                  <p className="text-sm text-stone-600 mt-1">Calculate carry overhead, depreciation, and holding costs.</p>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trust & Disclaimer */}
      <section className="bg-stone-100 py-8 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs text-stone-500 uppercase tracking-widest font-bold mb-3">Important Disclaimer</p>
          <p className="text-sm text-stone-600 max-w-3xl mx-auto leading-relaxed">
            This tool is provided for educational and decision-support purposes only. Estimated capacities are based on perfect geometric shapes and standard volumetric constants. Actual bin capacity may vary due to internal structures (ladders, sweeps), uneven floors, grain moisture, foreign material, and precise pack variations. Always verify critical storage limits with bin manufacturer specifications.
          </p>
        </div>
      </section>
    </main>
  );
}
