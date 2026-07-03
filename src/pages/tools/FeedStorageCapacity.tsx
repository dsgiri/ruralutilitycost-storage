import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Calculator, 
  ChevronDown, 
  Info, 
  RefreshCcw,
  Printer,
  Share2,
  Check
} from 'lucide-react';
import { Link } from 'react-router-dom';

const STORAGE_TYPE_LABELS: Record<string, string> = {
  bunker: 'Bunker / Trench',
  pile: 'Drive-over Pile',
  upright: 'Upright / Round Silo',
  bag: 'Silage Bag'
};

export function FeedStorageCapacity() {
  // Inputs
  const [storageType, setStorageType] = useState<'bunker' | 'pile' | 'upright' | 'bag'>('bunker');
  
  // Dimensions
  const [length, setLength] = useState('100');
  const [width, setWidth] = useState('40');
  const [height, setHeight] = useState('10');
  const [diameter, setDiameter] = useState('20');
  
  // Feed Assumptions
  const [feedType, setFeedType] = useState<'corn_silage' | 'haylage' | 'hmc' | 'custom'>('corn_silage');
  const [dmDensity, setDmDensity] = useState('15');
  const [dmPercent, setDmPercent] = useState('35');
  const [shrinkPercent, setShrinkPercent] = useState('10');

  const [isCopied, setIsCopied] = useState(false);

  const handleFeedTypeChange = (type: string) => {
    setFeedType(type as any);
    if (type === 'corn_silage') {
      setDmDensity('15');
      setDmPercent('35');
    } else if (type === 'haylage') {
      setDmDensity('13');
      setDmPercent('40');
    } else if (type === 'hmc') {
      setDmDensity('38');
      setDmPercent('70');
    }
  };

  const handleDensityChange = (val: string) => {
    setDmDensity(val);
    setFeedType('custom');
  };

  // Calculations
  const results = useMemo(() => {
    const parseInput = (val: string) => {
      const parsed = parseFloat(val);
      return isNaN(parsed) || parsed < 0 ? 0 : parsed;
    };

    const l = parseInput(length);
    const w = parseInput(width);
    const h = parseInput(height);
    const d = parseInput(diameter);
    const density = parseInput(dmDensity);
    const dm = parseInput(dmPercent);
    const shrink = parseInput(shrinkPercent);

    let volume = 0;
    let hasValidInputs = false;

    if (storageType === 'bunker' || storageType === 'pile') {
      volume = l * w * h;
      hasValidInputs = l > 0 && w > 0 && h > 0;
    } else if (storageType === 'upright') {
      const radius = d / 2;
      volume = Math.PI * Math.pow(radius, 2) * h;
      hasValidInputs = d > 0 && h > 0;
    } else if (storageType === 'bag') {
      const radius = d / 2;
      volume = Math.PI * Math.pow(radius, 2) * l;
      hasValidInputs = d > 0 && l > 0;
    }

    const isDmValid = dm > 0 && dm <= 100;
    const isShrinkValid = shrink >= 0 && shrink <= 100;

    const dmPounds = volume * density;
    const dmTons = dmPounds / 2000;
    
    // Avoid division by zero
    const asFedTons = isDmValid ? dmTons / (dm / 100) : 0;

    const usableDmTons = dmTons * (1 - shrink / 100);
    const usableAsFedTons = asFedTons * (1 - shrink / 100);

    return {
      volume,
      dmTons,
      asFedTons,
      usableDmTons,
      usableAsFedTons,
      hasValidInputs: hasValidInputs && density > 0 && isDmValid && isShrinkValid,
      densityUsed: density,
      dmPercentUsed: dm,
      shrinkPercentUsed: shrink
    };
  }, [storageType, length, width, height, diameter, dmDensity, dmPercent, shrinkPercent]);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link', err);
    }
  };

  return (
    <main className="w-full flex-1 overflow-y-auto bg-[#F9F9F8] text-stone-900 font-sans focus:outline-none" tabIndex={-1}>
      <Helmet>
        <title>Feed Storage Capacity Calculator | Storage Hub</title>
        <meta name="description" content="Estimate feed storage capacity using practical storage dimensions, density, and dry matter assumptions." />
      </Helmet>

      {/* Hero / Above the Fold */}
      <section className="bg-white border-b border-stone-200 pt-10 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold text-[#2d5d4b] uppercase tracking-widest mb-2">Feed Storage Tool</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-4">
              Feed Storage Capacity Calculator
            </h1>
            <p className="text-lg text-stone-600 leading-relaxed">
              Estimate feed volume and tonnage using practical storage dimensions, packing density, and dry matter assumptions.
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
                <h2 className="text-xl font-bold text-stone-900">Storage Parameters</h2>
                <button 
                  onClick={() => {
                    setStorageType('bunker');
                    setLength('100');
                    setWidth('40');
                    setHeight('10');
                    setDiameter('20');
                    setFeedType('corn_silage');
                    setDmDensity('15');
                    setDmPercent('35');
                    setShrinkPercent('10');
                  }}
                  className="text-sm text-stone-500 hover:text-[#2d5d4b] flex items-center gap-1 transition-colors focus:outline-none focus:ring-2 focus:ring-[#2d5d4b] rounded px-1"
                  aria-label="Reset calculator inputs"
                >
                  <RefreshCcw className="w-4 h-4" aria-hidden="true" /> Reset
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label htmlFor="storageType" className="block text-sm font-semibold text-stone-800 mb-2">Storage Type</label>
                  <div className="relative">
                    <select 
                      id="storageType"
                      value={storageType}
                      onChange={(e) => setStorageType(e.target.value as any)}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#2d5d4b] focus:border-[#2d5d4b] outline-none transition-shadow text-lg appearance-none pr-10"
                    >
                      <option value="bunker">Bunker / Trench</option>
                      <option value="pile">Drive-over Pile</option>
                      <option value="upright">Upright / Round Silo</option>
                      <option value="bag">Silage Bag</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-500 pointer-events-none" aria-hidden="true" />
                  </div>
                </div>

                {/* Conditional Geometry Inputs */}
                <fieldset>
                  <legend className="block text-sm font-semibold text-stone-800 mb-3">Storage Dimensions</legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(storageType === 'bunker' || storageType === 'pile' || storageType === 'bag') && (
                      <div>
                        <label htmlFor="length" className="block text-sm font-semibold text-stone-800 mb-2">Length (ft)</label>
                        <input 
                          type="number"
                          id="length"
                          value={length}
                          onChange={(e) => setLength(e.target.value)}
                          className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#2d5d4b] focus:border-[#2d5d4b] outline-none transition-shadow text-lg"
                          min="0"
                          step="1"
                          placeholder="0"
                        />
                      </div>
                    )}

                    {(storageType === 'bunker' || storageType === 'pile') && (
                      <div>
                        <label htmlFor="width" className="block text-sm font-semibold text-stone-800 mb-2">Width (ft)</label>
                        <input 
                          type="number"
                          id="width"
                          value={width}
                          onChange={(e) => setWidth(e.target.value)}
                          className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#2d5d4b] focus:border-[#2d5d4b] outline-none transition-shadow text-lg"
                          min="0"
                          step="1"
                          placeholder="0"
                        />
                      </div>
                    )}

                    {(storageType === 'bunker' || storageType === 'pile') && (
                      <div>
                        <label htmlFor="height" className="block text-sm font-semibold text-stone-800 mb-2">
                          {storageType === 'bunker' ? 'Average Depth (ft)' : 'Average Height (ft)'}
                        </label>
                        <input 
                          type="number"
                          id="height"
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                          className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#2d5d4b] focus:border-[#2d5d4b] outline-none transition-shadow text-lg"
                          min="0"
                          step="1"
                          placeholder="0"
                        />
                      </div>
                    )}

                    {(storageType === 'upright' || storageType === 'bag') && (
                      <div>
                        <label htmlFor="diameter" className="block text-sm font-semibold text-stone-800 mb-2">Diameter (ft)</label>
                        <input 
                          type="number"
                          id="diameter"
                          value={diameter}
                          onChange={(e) => setDiameter(e.target.value)}
                          className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#2d5d4b] focus:border-[#2d5d4b] outline-none transition-shadow text-lg"
                          min="0"
                          step="1"
                          placeholder="0"
                        />
                      </div>
                    )}

                    {storageType === 'upright' && (
                      <div>
                        <label htmlFor="height" className="block text-sm font-semibold text-stone-800 mb-2">Fill Height (ft)</label>
                        <input 
                          type="number"
                          id="height"
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                          className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#2d5d4b] focus:border-[#2d5d4b] outline-none transition-shadow text-lg"
                          min="0"
                          step="1"
                          placeholder="0"
                        />
                      </div>
                    )}
                  </div>
                </fieldset>

                <fieldset className="pt-6 border-t border-stone-100">
                  <legend className="text-lg font-bold text-stone-900 mb-4">Feed Assumptions</legend>
                  
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="feedType" className="block text-sm font-semibold text-stone-800 mb-2">Feed Type</label>
                      <div className="relative">
                        <select 
                          id="feedType"
                          value={feedType}
                          onChange={(e) => handleFeedTypeChange(e.target.value)}
                          className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#2d5d4b] focus:border-[#2d5d4b] outline-none transition-shadow text-lg appearance-none pr-10"
                        >
                          <option value="corn_silage">Corn Silage</option>
                          <option value="haylage">Haylage</option>
                          <option value="hmc">High-Moisture Corn</option>
                          <option value="custom">Custom Feed</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-500 pointer-events-none" aria-hidden="true" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="dmPercent" className="block text-sm font-semibold text-stone-800 mb-2">Dry Matter (%)</label>
                        <input 
                          type="number"
                          id="dmPercent"
                          value={dmPercent}
                          onChange={(e) => {
                            setDmPercent(e.target.value);
                            setFeedType('custom');
                          }}
                          className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#2d5d4b] focus:border-[#2d5d4b] outline-none transition-shadow text-lg"
                          min="0.1"
                          max="100"
                          step="0.1"
                          placeholder="35"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="dmDensity" className="block text-sm font-semibold text-stone-800 mb-2">DM Density (lbs/cu ft)</label>
                        <input 
                          type="number"
                          id="dmDensity"
                          value={dmDensity}
                          onChange={(e) => handleDensityChange(e.target.value)}
                          className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#2d5d4b] focus:border-[#2d5d4b] outline-none transition-shadow text-lg"
                          min="0"
                          step="0.1"
                          placeholder="15"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="shrinkPercent" className="block text-sm font-semibold text-stone-800 mb-2">Shrink / Storage Loss (%)</label>
                      <input 
                        type="number"
                        id="shrinkPercent"
                        value={shrinkPercent}
                        onChange={(e) => setShrinkPercent(e.target.value)}
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#2d5d4b] focus:border-[#2d5d4b] outline-none transition-shadow text-lg"
                        min="0"
                        max="100"
                        step="0.1"
                        placeholder="10"
                      />
                      <p className="text-xs text-stone-500 mt-2">Expected dry matter loss during fermentation, storage, and feed-out.</p>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>

          {/* Output Column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className={`bg-[#2d5d4b] rounded-xl shadow-md p-8 sm:p-10 text-white relative overflow-hidden transition-opacity duration-300 ${results.hasValidInputs ? 'opacity-100' : 'opacity-90'}`} aria-live="polite">
              {/* Background decorative element */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 text-white/5 pointer-events-none" aria-hidden="true">
                <Calculator className="w-64 h-64" />
              </div>

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-[#a5c5b5] font-bold uppercase tracking-widest text-sm mb-2">As-Fed Inventory</h3>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl sm:text-6xl font-extrabold tracking-tight">
                      {Math.round(results.asFedTons).toLocaleString()}
                    </span>
                    <span className="text-xl sm:text-2xl text-[#a5c5b5] font-semibold">tons</span>
                  </div>
                  <p className="text-[#a5c5b5] text-sm">
                    Gross estimated tonnage as stored.
                  </p>
                </div>

                <div>
                  <h3 className="text-[#a5c5b5] font-bold uppercase tracking-widest text-sm mb-2">Dry Matter Inventory</h3>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                      {Math.round(results.dmTons).toLocaleString()}
                    </span>
                    <span className="text-lg sm:text-xl text-[#a5c5b5] font-semibold">DM tons</span>
                  </div>
                  <p className="text-[#a5c5b5] text-sm">
                    Gross dry matter tonnage.
                  </p>
                </div>
              </div>

              <div className="relative z-10 mt-10 border-t border-[#3e7560] pt-6 flex justify-between items-end">
                <div>
                  <span className="block text-[#a5c5b5] text-sm mb-1 font-semibold">Total Volume</span>
                  <span className="text-2xl font-bold">{Math.round(results.volume).toLocaleString()} <span className="text-base font-normal text-[#a5c5b5]">cu. ft.</span></span>
                </div>
                <div className="text-right">
                  <span className="block text-[#a5c5b5] text-sm mb-1 font-semibold">Storage Type</span>
                  <span className="text-xl font-bold">{STORAGE_TYPE_LABELS[storageType]}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handlePrint}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-stone-200 text-stone-800 font-bold rounded-lg hover:border-stone-300 hover:bg-stone-50 transition-colors focus:outline-none focus:ring-2 focus:ring-stone-500"
              >
                <Printer className="w-5 h-5" aria-hidden="true" />
                Print Estimate
              </button>
              <button 
                onClick={handleShare}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-stone-200 text-stone-800 font-bold rounded-lg hover:border-stone-300 hover:bg-stone-50 transition-colors focus:outline-none focus:ring-2 focus:ring-stone-500"
              >
                {isCopied ? (
                  <>
                    <Check className="w-5 h-5 text-green-600" aria-hidden="true" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Share2 className="w-5 h-5" aria-hidden="true" />
                    Share Tool
                  </>
                )}
              </button>
            </div>

            {/* Details Panel */}
            <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6 mt-2">
              <h3 className="font-bold text-stone-900 mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-stone-400" aria-hidden="true" />
                Planning Details & Usable Capacity
              </h3>
              <ul className="space-y-3 text-sm text-stone-600">
                <li className="flex justify-between border-b border-stone-100 pb-2">
                  <span>Usable Dry Matter Tons (After Shrink):</span>
                  <span className="font-semibold text-stone-900">{Math.round(results.usableDmTons).toLocaleString()} tons</span>
                </li>
                <li className="flex justify-between border-b border-stone-100 pb-2">
                  <span>Usable As-Fed Tons (After Shrink):</span>
                  <span className="font-semibold text-stone-900">{Math.round(results.usableAsFedTons).toLocaleString()} tons</span>
                </li>
                <li className="flex justify-between border-b border-stone-100 pb-2">
                  <span>DM Density Used:</span>
                  <span className="font-semibold text-stone-900">{results.densityUsed} lbs / cu. ft.</span>
                </li>
                <li className="flex justify-between border-b border-stone-100 pb-2">
                  <span>Dry Matter % Used:</span>
                  <span className="font-semibold text-stone-900">{results.dmPercentUsed}%</span>
                </li>
                <li className="flex justify-between pt-1">
                  <span>Shrink / Loss Factor Used:</span>
                  <span className="font-semibold text-stone-900">{results.shrinkPercentUsed}%</span>
                </li>
              </ul>
              
              <div className="mt-6 bg-stone-50 p-4 rounded-lg text-sm text-stone-700 leading-relaxed border border-stone-200">
                <strong>Planning Note:</strong> The "usable" tons represent the estimated amount of feed that will actually be available to feed out, after accounting for {results.shrinkPercentUsed}% shrink (fermentation, spoilage, and loading losses).
              </div>
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
                  This tool calculates the geometric volume of common agricultural feed storage structures and converts that volume into dry matter and as-fed tonnage estimates based on density assumptions.
                </p>
                <ul className="space-y-2 mt-4 text-stone-600 list-disc pl-5">
                  <li><strong>Bunker / Trench:</strong> Estimated as a rectangular volume (<code>Length &times; Width &times; Average Depth</code>).</li>
                  <li><strong>Drive-over Pile:</strong> Approximated using a simplified rectangular volume. <em>Note: Actual pile volume varies heavily based on side slopes and ramps. This V1 calculator provides a simplified maximum bound.</em></li>
                  <li><strong>Upright Silo:</strong> Calculated as a cylinder (<code>&pi; &times; r&sup2; &times; Fill Height</code>).</li>
                  <li><strong>Silage Bag:</strong> Calculated as a cylinder laid horizontally.</li>
                  <li><strong>Tonnage Conversion:</strong> Total cubic feet is multiplied by Dry Matter Density (lbs DM / cu ft) to get total DM pounds, then divided by 2,000 to get DM tons. As-fed tons are derived by dividing DM tons by the DM percentage.</li>
                </ul>
              </div>

              <h4 className="text-lg font-bold text-stone-900 mt-10 mb-4">How To Use</h4>
              <ol className="space-y-3 text-sm text-stone-600 list-decimal pl-5">
                <li>Select your primary storage structure type.</li>
                <li>Enter the interior dimensions or fill dimensions.</li>
                <li>Select a common feed type to load default density and moisture assumptions, or enter your own custom values.</li>
                <li>Review the Gross Inventory and Usable Inventory figures.</li>
              </ol>
            </div>

            {/* FAQs & Related Tools */}
            <div>
              <h3 className="text-2xl font-bold text-stone-900 mb-6">Frequently Asked Questions</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-stone-900 mb-2">What is the difference between DM tons and As-Fed tons?</h4>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    <strong>Dry Matter (DM) tons</strong> measure the weight of the feed excluding all water. This is the true nutritional inventory. <strong>As-Fed tons</strong> measure the total physical weight of the feed including water, which is what you actually haul and mix.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 mb-2">Why does dry matter percentage affect the result?</h4>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    If your feed is wetter (lower DM %), it takes more total physical tons (as-fed) to provide the same amount of dry matter. Wet feed is also denser, packing tighter into the same cubic volume.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 mb-2">Should I include shrink in my estimate?</h4>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    Yes. Shrink accounts for fermentation loss, spoilage, face loss, and feed-out errors. Typical shrink ranges from 5-10% for upright silos and bags, and 10-20% for bunkers and piles depending on management.
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-bold text-stone-900 mt-10 mb-4">Related Storage Tools</h3>
              <div className="space-y-3">
                <Link to="/tools/grain-bin-capacity" className="block p-4 border border-stone-200 rounded-lg hover:border-[#2d5d4b] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2d5d4b]">
                  <span className="font-bold text-[#2d5d4b]">Grain Bin Capacity Estimator &rarr;</span>
                  <p className="text-sm text-stone-600 mt-1">Estimate dry grain capacity based on bin geometry.</p>
                </Link>
                <Link to="/tools/spoilage-risk-assessor" className="block p-4 border border-stone-200 rounded-lg hover:border-[#2d5d4b] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2d5d4b]">
                  <span className="font-bold text-[#2d5d4b]">Spoilage Risk Assessor &rarr;</span>
                  <p className="text-sm text-stone-600 mt-1">Evaluate loss-risk percentiles using moisture and temperature factors.</p>
                </Link>
                <Link to="/tools/storage-cost-analysis" className="block p-4 border border-stone-200 rounded-lg hover:border-[#2d5d4b] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2d5d4b]">
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
            This tool provides planning estimates only. Actual feed inventory varies with packing density, moisture variability, structural shapes, shrink, and measurement accuracy. Drive-over pile volumes in this version are simplified geometric approximations. Verify important operational and purchasing decisions independently.
          </p>
        </div>
      </section>
    </main>
  );
}

