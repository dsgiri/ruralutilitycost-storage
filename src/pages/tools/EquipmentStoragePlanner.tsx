import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Calculator, 
  ChevronDown, 
  Info, 
  RefreshCcw,
  Printer,
  Share2,
  Check,
  Plus,
  Trash2
} from 'lucide-react';
import { Link } from 'react-router-dom';

type EquipmentItem = {
  id: string;
  type: string;
  name: string;
  quantity: string;
  length: string;
  width: string;
};

const EQUIPMENT_TYPES = [
  'Tractor',
  'Combine',
  'Implement',
  'Utility vehicle',
  'Trailer / wagon',
  'Custom'
];

const DEFAULT_ITEM: Omit<EquipmentItem, 'id'> = {
  type: 'Tractor',
  name: '',
  quantity: '1',
  length: '',
  width: ''
};

const PLANNING_MODES = {
  tight: { label: 'Tight Storage (1.2x)', multiplier: 1.2 },
  standard: { label: 'Standard Storage (1.5x)', multiplier: 1.5 },
  comfortable: { label: 'Comfortable Storage (1.8x)', multiplier: 1.8 }
};

export function EquipmentStoragePlanner() {
  // Equipment List
  const [items, setItems] = useState<EquipmentItem[]>([
    { ...DEFAULT_ITEM, id: crypto.randomUUID() }
  ]);
  
  // Planning Allowances
  const [planningMode, setPlanningMode] = useState<keyof typeof PLANNING_MODES>('standard');
  const [growthPercent, setGrowthPercent] = useState('15');
  const [addServiceSpace, setAddServiceSpace] = useState(false);
  const [serviceSpaceArea, setServiceSpaceArea] = useState('400');

  const [isCopied, setIsCopied] = useState(false);

  const addItem = () => {
    setItems([...items, { ...DEFAULT_ITEM, id: crypto.randomUUID() }]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof EquipmentItem, value: string) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  // Calculations
  const results = useMemo(() => {
    let rawFootprint = 0;
    let validRows = 0;

    items.forEach(item => {
      const q = parseFloat(item.quantity);
      const l = parseFloat(item.length);
      const w = parseFloat(item.width);

      if (!isNaN(q) && !isNaN(l) && !isNaN(w) && q > 0 && l > 0 && w > 0) {
        rawFootprint += (l * w * q);
        validRows++;
      }
    });

    const hasValidInputs = validRows > 0;
    const multiplier = PLANNING_MODES[planningMode].multiplier;
    const factoredArea = rawFootprint * multiplier;
    
    const growth = parseFloat(growthPercent);
    const growthValid = !isNaN(growth) && growth >= 0;
    const growthArea = (growthValid && hasValidInputs) ? factoredArea * (growth / 100) : 0;
    
    const serviceArea = (addServiceSpace && !isNaN(parseFloat(serviceSpaceArea))) ? parseFloat(serviceSpaceArea) : 0;

    const recommendedArea = hasValidInputs ? factoredArea + growthArea + serviceArea : 0;

    // Suggest candidate buildings
    const candidates = [];
    if (recommendedArea >= 400) {
      const standardWidths = [20, 24, 30, 40, 50, 60, 80, 100];
      for (const w of standardWidths) {
        const minL = Math.ceil(recommendedArea / w / 10) * 10;
        if (minL >= w && minL <= w * 3) {
          candidates.push(`${w} × ${minL}`);
        }
      }
    }

    return {
      rawFootprint,
      recommendedArea,
      multiplier,
      growthArea,
      serviceArea,
      candidates: candidates.slice(0, 3), // Top 3 realistic candidates
      hasValidInputs
    };
  }, [items, planningMode, growthPercent, addServiceSpace, serviceSpaceArea]);

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

  const handleReset = () => {
    setItems([{ ...DEFAULT_ITEM, id: crypto.randomUUID() }]);
    setPlanningMode('standard');
    setGrowthPercent('15');
    setAddServiceSpace(false);
    setServiceSpaceArea('400');
  };

  return (
    <main className="w-full flex-1 overflow-y-auto bg-[#F9F9F8] text-stone-900 font-sans focus:outline-none" tabIndex={-1}>
      <Helmet>
        <title>Equipment Storage Planner | Storage Hub</title>
        <meta name="description" content="Estimate how much storage space you need for farm equipment, implements, and utility vehicles." />
      </Helmet>

      {/* Hero / Above the Fold */}
      <section className="bg-white border-b border-stone-200 pt-10 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold text-[#2d5d4b] uppercase tracking-widest mb-2">Equipment Storage Tool</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-4">
              Equipment Storage Planner
            </h1>
            <p className="text-lg text-stone-600 leading-relaxed">
              Estimate floor space requirements for machinery storage based on equipment dimensions and practical planning allowances.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Input Column */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-stone-900">Equipment List</h2>
                <button 
                  onClick={handleReset}
                  className="text-sm text-stone-500 hover:text-[#2d5d4b] flex items-center gap-1 transition-colors focus:outline-none focus:ring-2 focus:ring-[#2d5d4b] rounded px-1"
                  aria-label="Reset calculator inputs"
                >
                  <RefreshCcw className="w-4 h-4" aria-hidden="true" /> Reset
                </button>
              </div>

              <div className="space-y-4">
                {/* Equipment Table/List */}
                <div className="hidden sm:grid grid-cols-12 gap-4 pb-2 border-b border-stone-200 text-sm font-semibold text-stone-600">
                  <div className="col-span-2">Type</div>
                  <div className="col-span-3">Model/Notes <span className="text-stone-400 font-normal">(Opt.)</span></div>
                  <div className="col-span-2">Qty</div>
                  <div className="col-span-2">Length (ft)</div>
                  <div className="col-span-2">Width (ft)</div>
                  <div className="col-span-1"></div>
                </div>

                {items.map((item, index) => (
                  <div key={item.id} className="relative bg-stone-50 sm:bg-transparent p-4 sm:p-0 rounded-lg sm:rounded-none border sm:border-0 border-stone-200 grid grid-cols-1 sm:grid-cols-12 gap-4 items-end sm:items-center">
                    
                    <div className="sm:col-span-2">
                      <label className="block sm:hidden text-xs font-semibold text-stone-500 mb-1">Equipment Type</label>
                      <div className="relative">
                        <select
                          value={item.type}
                          onChange={(e) => updateItem(item.id, 'type', e.target.value)}
                          className="w-full px-3 py-2.5 bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#2d5d4b] focus:border-[#2d5d4b] outline-none text-base appearance-none"
                          aria-label={`Equipment type for row ${index + 1}`}
                        >
                          {EQUIPMENT_TYPES.map(t => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500 pointer-events-none" />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block sm:hidden text-xs font-semibold text-stone-500 mb-1">Model/Notes (Opt.)</label>
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                        className="w-full px-3 py-2.5 bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#2d5d4b] focus:border-[#2d5d4b] outline-none text-base"
                        placeholder="e.g. JD 8R"
                        aria-label={`Model or notes for row ${index + 1}`}
                      />
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-6 sm:col-span-6 gap-3 sm:gap-4">
                      <div className="sm:col-span-2">
                        <label className="block sm:hidden text-xs font-semibold text-stone-500 mb-1">Qty</label>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                          className="w-full px-3 py-2.5 bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#2d5d4b] focus:border-[#2d5d4b] outline-none text-base"
                          min="1"
                          step="1"
                          placeholder="1"
                          aria-label={`Quantity for row ${index + 1}`}
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block sm:hidden text-xs font-semibold text-stone-500 mb-1">Len (ft)</label>
                        <input
                          type="number"
                          value={item.length}
                          onChange={(e) => updateItem(item.id, 'length', e.target.value)}
                          className="w-full px-3 py-2.5 bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#2d5d4b] focus:border-[#2d5d4b] outline-none text-base"
                          min="0"
                          step="0.5"
                          placeholder="L"
                          aria-label={`Length for row ${index + 1}`}
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block sm:hidden text-xs font-semibold text-stone-500 mb-1">Wid (ft)</label>
                        <input
                          type="number"
                          value={item.width}
                          onChange={(e) => updateItem(item.id, 'width', e.target.value)}
                          className="w-full px-3 py-2.5 bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#2d5d4b] focus:border-[#2d5d4b] outline-none text-base"
                          min="0"
                          step="0.5"
                          placeholder="W"
                          aria-label={`Width for row ${index + 1}`}
                        />
                      </div>
                    </div>

                    <div className="absolute sm:static top-2 right-2 sm:col-span-1 flex justify-end">
                      <button
                        onClick={() => removeItem(item.id)}
                        disabled={items.length === 1}
                        className={`p-2 rounded-md transition-colors ${items.length === 1 ? 'text-stone-300 cursor-not-allowed' : 'text-stone-400 hover:text-rose-600 hover:bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-500'}`}
                        aria-label={`Remove row ${index + 1}`}
                      >
                        <Trash2 className="w-5 h-5 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  onClick={addItem}
                  className="w-full py-3 mt-2 border-2 border-dashed border-stone-300 text-stone-600 font-semibold rounded-lg hover:border-[#2d5d4b] hover:text-[#2d5d4b] hover:bg-[#2d5d4b]/5 transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#2d5d4b]"
                >
                  <Plus className="w-5 h-5" /> Add Equipment
                </button>
              </div>

              <fieldset className="pt-8 mt-8 border-t border-stone-200">
                <legend className="text-lg font-bold text-stone-900 mb-4">Planning Allowances</legend>
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="planningMode" className="block text-sm font-semibold text-stone-800 mb-2">Maneuvering Allowance</label>
                    <div className="relative">
                      <select 
                        id="planningMode"
                        value={planningMode}
                        onChange={(e) => setPlanningMode(e.target.value as any)}
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#2d5d4b] focus:border-[#2d5d4b] outline-none transition-shadow text-lg appearance-none pr-10"
                      >
                        {Object.entries(PLANNING_MODES).map(([key, mode]) => (
                          <option key={key} value={key}>{mode.label}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-500 pointer-events-none" aria-hidden="true" />
                    </div>
                    <p className="text-xs text-stone-500 mt-2">Space needed between machines and around doors for driving, hitching, and walking.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="growthPercent" className="block text-sm font-semibold text-stone-800 mb-2">Future Growth (%)</label>
                      <input 
                        type="number"
                        id="growthPercent"
                        value={growthPercent}
                        onChange={(e) => setGrowthPercent(e.target.value)}
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#2d5d4b] focus:border-[#2d5d4b] outline-none transition-shadow text-lg"
                        min="0"
                        step="5"
                      />
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <input
                          type="checkbox"
                          id="addServiceSpace"
                          checked={addServiceSpace}
                          onChange={(e) => setAddServiceSpace(e.target.checked)}
                          className="w-4 h-4 text-[#2d5d4b] rounded border-stone-300 focus:ring-[#2d5d4b]"
                        />
                        <label htmlFor="addServiceSpace" className="text-sm font-semibold text-stone-800">Dedicated Service Bay</label>
                      </div>
                      <div className="relative">
                        <input 
                          type="number"
                          value={serviceSpaceArea}
                          onChange={(e) => setServiceSpaceArea(e.target.value)}
                          disabled={!addServiceSpace}
                          className={`w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#2d5d4b] focus:border-[#2d5d4b] outline-none transition-shadow text-lg pr-16 ${!addServiceSpace ? 'opacity-50 cursor-not-allowed' : ''}`}
                          min="0"
                          step="50"
                          aria-label="Service space square footage"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500 font-medium pointer-events-none">sq ft</span>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>

          {/* Output Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className={`bg-[#2d5d4b] rounded-xl shadow-md p-8 sm:p-10 text-white relative overflow-hidden transition-opacity duration-300 ${results.hasValidInputs ? 'opacity-100' : 'opacity-90'}`} aria-live="polite">
              {/* Background decorative element */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 text-white/5 pointer-events-none" aria-hidden="true">
                <Calculator className="w-64 h-64" />
              </div>

              <div className="relative z-10">
                <h3 className="text-[#a5c5b5] font-bold uppercase tracking-widest text-sm mb-2">Recommended Building Area</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl sm:text-6xl font-extrabold tracking-tight">
                    {Math.round(results.recommendedArea).toLocaleString()}
                  </span>
                  <span className="text-xl sm:text-2xl text-[#a5c5b5] font-semibold">sq ft</span>
                </div>
                <p className="text-[#a5c5b5] text-sm leading-relaxed max-w-xs">
                  Estimated floor space needed, including your selected allowances and service areas.
                </p>

                <div className="mt-8 border-t border-[#3e7560] pt-6 flex justify-between items-end">
                  <div>
                    <span className="block text-[#a5c5b5] text-sm mb-1 font-semibold">Raw Equipment Footprint</span>
                    <span className="text-2xl font-bold">{Math.round(results.rawFootprint).toLocaleString()} <span className="text-base font-normal text-[#a5c5b5]">sq. ft.</span></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Candidate Buildings */}
            {results.candidates.length > 0 && results.hasValidInputs && (
              <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6">
                <h3 className="font-bold text-stone-900 mb-4 text-sm uppercase tracking-wider">Example Building Sizes</h3>
                <div className="flex flex-wrap gap-3">
                  {results.candidates.map(c => (
                    <div key={c} className="px-4 py-2 bg-stone-100 border border-stone-200 rounded-lg text-stone-800 font-semibold text-lg">
                      {c}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-stone-500 mt-4 leading-relaxed">
                  These are mathematical examples that could fit the recommended square footage. Actual dimensions depend on required door placements and building trusses.
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handlePrint}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-stone-200 text-stone-800 font-bold rounded-lg hover:border-stone-300 hover:bg-stone-50 transition-colors focus:outline-none focus:ring-2 focus:ring-stone-500"
              >
                <Printer className="w-5 h-5" aria-hidden="true" />
                Print Plan
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
                Planning Breakdown
              </h3>
              <ul className="space-y-3 text-sm text-stone-600">
                <li className="flex justify-between border-b border-stone-100 pb-2">
                  <span>Maneuvering Allowance:</span>
                  <span className="font-semibold text-stone-900">{results.multiplier}x multiplier</span>
                </li>
                <li className="flex justify-between border-b border-stone-100 pb-2">
                  <span>Future Growth Buffer:</span>
                  <span className="font-semibold text-stone-900">+{Math.round(results.growthArea).toLocaleString()} sq ft</span>
                </li>
                {addServiceSpace && (
                  <li className="flex justify-between pt-1">
                    <span>Service/Maintenance Space:</span>
                    <span className="font-semibold text-stone-900">+{results.serviceArea.toLocaleString()} sq ft</span>
                  </li>
                )}
              </ul>
              
              <div className="mt-6 bg-stone-50 p-4 rounded-lg text-sm text-stone-700 leading-relaxed border border-stone-200">
                <strong>Planning Note:</strong> A machine might have a 150 sq ft footprint, but you cannot park them wall-to-wall without aisles. The maneuvering multiplier prevents "Tetris" storage scenarios.
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
              <h3 className="text-2xl font-bold text-stone-900 mb-6">How This Planner Works</h3>
              <div className="prose prose-stone">
                <p>
                  This tool estimates total building floor space requirements based on the raw footprint of your machinery, multiplied by practical planning allowances.
                </p>
                <ul className="space-y-2 mt-4 text-stone-600 list-disc pl-5">
                  <li><strong>Raw Footprint:</strong> Length &times; Width &times; Quantity. This represents the absolute minimum floor space required if equipment were packed skin-to-skin.</li>
                  <li><strong>Maneuvering Allowance:</strong> We apply a multiplier (e.g., 1.5x) to the raw footprint. This accounts for aisles, walking clearance, door approaches, and turning radii.</li>
                  <li><strong>Future Growth:</strong> Adds a percentage buffer to the factored area. Tractors and implements tend to get larger when replaced.</li>
                  <li><strong>Service Bay:</strong> An optional flat square-footage addition for a dedicated maintenance or wash bay that won't be blocked by parked equipment.</li>
                </ul>
              </div>

              <h4 className="text-lg font-bold text-stone-900 mt-10 mb-4">How To Use</h4>
              <ol className="space-y-3 text-sm text-stone-600 list-decimal pl-5">
                <li>List all machinery, tractors, and implements you intend to store.</li>
                <li>Measure their maximum length and width (include hitches, duals, or attached headers).</li>
                <li>Select a Maneuvering Allowance based on how easily you want to retrieve equipment.</li>
                <li>Add a growth buffer and/or dedicated service space.</li>
                <li>Review the recommended square footage and example building sizes.</li>
              </ol>
            </div>

            {/* FAQs & Related Tools */}
            <div>
              <h3 className="text-2xl font-bold text-stone-900 mb-6">Frequently Asked Questions</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-stone-900 mb-2">Why is the recommended area larger than the raw equipment footprint?</h4>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    Machines cannot be parked with zero clearance. You need space to walk between them, pull them out without moving five other items, and safely maneuver near walls and structural poles.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 mb-2">Should I include future equipment growth?</h4>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    Yes. Almost all modern farm equipment is wider and longer than the generation it replaces. Building a shed exactly to the size of your current fleet often guarantees it will be too small in 5-10 years.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 mb-2">Does this estimate guarantee my equipment will fit?</h4>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    No. This is a square-footage estimator. A long, narrow building might have the right square footage but be impossible to turn a combine around in. You must verify actual layout and door placement with your builder.
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-bold text-stone-900 mt-10 mb-4">Related Storage Tools</h3>
              <div className="space-y-3">
                <Link to="/tools/grain-bin-capacity" className="block p-4 border border-stone-200 rounded-lg hover:border-[#2d5d4b] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2d5d4b]">
                  <span className="font-bold text-[#2d5d4b]">Grain Bin Capacity Estimator &rarr;</span>
                  <p className="text-sm text-stone-600 mt-1">Estimate dry grain capacity based on bin geometry.</p>
                </Link>
                <Link to="/tools/feed-storage-capacity" className="block p-4 border border-stone-200 rounded-lg hover:border-[#2d5d4b] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2d5d4b]">
                  <span className="font-bold text-[#2d5d4b]">Feed Storage Capacity Calculator &rarr;</span>
                  <p className="text-sm text-stone-600 mt-1">Estimate bunker, pile, and silo feed capacities.</p>
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
            This tool provides floor space planning estimates only. Actual equipment storage requirements vary with specific machine configurations, attachment lengths, access lanes, door widths, structural pole layout, and site constraints. Verify major building decisions and blueprints with an experienced contractor or engineer.
          </p>
        </div>
      </section>
    </main>
  );
}
