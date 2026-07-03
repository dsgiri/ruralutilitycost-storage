import React from 'react';
import { NavLink } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';
import { 
  ArrowRight, 
  Wheat, 
  Tractor, 
  Container, 
  ThermometerSun, 
  Database,
  Calculator,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';

export function Home() {
  return (
    <div className="w-full flex-1 overflow-y-auto bg-[#F9F9F8] text-stone-900 font-sans">
      <SEO 
        title="Storage Hub | Rural Utility Cost" 
        description="Estimate capacity, moisture shrink, drying impact, storage cost factors, and operational storage decisions with practical browser-based tools." 
        canonicalPath="/"
      />

      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-20 lg:pb-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
        <div className="flex-1 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-200/50 text-stone-600 text-xs font-semibold uppercase tracking-wider mb-6 border border-stone-200">
            Storage Planning Tools
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 leading-tight mb-6 tracking-tight">
            Storage calculators for grain, feed, bins, and spoilage planning.
          </h1>
          <p className="text-lg text-stone-600 mb-8 max-w-xl leading-relaxed">
            Estimate capacity, moisture shrink, drying impact, storage cost factors, and operational storage decisions with practical browser-based tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <NavLink 
              to="/tools/grain-bin-capacity" 
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#2d5d4b] text-white font-medium rounded min-h-[48px] hover:bg-[#234c3c] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2d5d4b] focus:ring-offset-2"
            >
              <Calculator className="w-5 h-5" />
              Open Grain Bin Calculator
            </NavLink>
            <a 
              href="#categories" 
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-stone-300 text-stone-700 font-medium rounded min-h-[48px] hover:bg-stone-50 transition-colors focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2"
            >
              Browse Categories
            </a>
          </div>
        </div>

        {/* Hero Right: Mockup Card */}
        <div className="flex-1 w-full max-w-md lg:max-w-none lg:w-auto flex justify-center lg:justify-end">
          <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-6 w-full max-w-sm relative">
            <div className="border-b border-stone-100 pb-4 mb-4">
              <h3 className="text-sm font-bold text-stone-800 uppercase tracking-wide">Capacity Estimate</h3>
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Bin diameter</span>
                <span className="font-medium text-stone-900">30 ft</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Eave height</span>
                <span className="font-medium text-stone-900">20 ft</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Peak fill</span>
                <span className="font-medium text-stone-900">yes</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Crop</span>
                <span className="font-medium text-stone-900">Corn</span>
              </div>
            </div>
            <div className="bg-[#fcfcfb] rounded-lg p-4 space-y-3 border border-stone-100">
              <div className="flex justify-between text-sm">
                <span className="text-stone-600 font-medium">Capacity</span>
                <span className="font-bold text-stone-900">12,119 bu</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-600 font-medium">Shrink adj.</span>
                <span className="font-bold text-red-700">-4.8%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-600 font-medium">Dry bushels</span>
                <span className="font-bold text-[#2d5d4b]">11,537 bu</span>
              </div>
              <div className="pt-3 border-t border-stone-200 flex justify-between items-center">
                <span className="text-stone-800 font-semibold">Estimated value</span>
                <span className="text-lg font-bold text-stone-900">$54,798</span>
              </div>
            </div>
            <div className="mt-4 text-center">
              <span className="text-[10px] text-stone-400 uppercase tracking-widest font-semibold">Example estimate only</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid Section */}
      <section id="categories" className="bg-white border-t border-stone-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-stone-900 tracking-tight">Browse storage categories</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            
            <a href="#" className="group block bg-[#fcfcfb] border border-stone-200 hover:border-[#2d5d4b]/40 rounded-lg p-6 transition-all hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2d5d4b]">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-white border border-stone-200 rounded flex items-center justify-center text-stone-600 group-hover:text-[#2d5d4b] group-hover:border-[#2d5d4b]/30 transition-colors">
                  <Wheat className="w-5 h-5" />
                </div>
                <ArrowRight className="w-5 h-5 text-stone-300 group-hover:text-[#2d5d4b] transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">Grain Storage</h3>
              <p className="text-sm text-stone-600 leading-relaxed">Capacity, moisture, drying, and handling estimates for bins, bags, and bulk grain.</p>
            </a>

            <a href="#" className="group block bg-[#fcfcfb] border border-stone-200 hover:border-[#2d5d4b]/40 rounded-lg p-6 transition-all hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2d5d4b]">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-white border border-stone-200 rounded flex items-center justify-center text-stone-600 group-hover:text-[#2d5d4b] group-hover:border-[#2d5d4b]/30 transition-colors">
                  <Database className="w-5 h-5" />
                </div>
                <ArrowRight className="w-5 h-5 text-stone-300 group-hover:text-[#2d5d4b] transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">Feed Storage</h3>
              <p className="text-sm text-stone-600 leading-relaxed">Feed volume, inventory planning, space needs, and storage loss estimation.</p>
            </a>

            <a href="#" className="group block bg-[#fcfcfb] border border-stone-200 hover:border-[#2d5d4b]/40 rounded-lg p-6 transition-all hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2d5d4b]">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-white border border-stone-200 rounded flex items-center justify-center text-stone-600 group-hover:text-[#2d5d4b] group-hover:border-[#2d5d4b]/30 transition-colors">
                  <Tractor className="w-5 h-5" />
                </div>
                <ArrowRight className="w-5 h-5 text-stone-300 group-hover:text-[#2d5d4b] transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">Equipment Space</h3>
              <p className="text-sm text-stone-600 leading-relaxed">Estimate shed space, machinery footprint, and storage layout needs.</p>
            </a>

            <a href="#" className="group block bg-[#fcfcfb] border border-stone-200 hover:border-[#2d5d4b]/40 rounded-lg p-6 transition-all hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2d5d4b]">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-white border border-stone-200 rounded flex items-center justify-center text-stone-600 group-hover:text-[#2d5d4b] group-hover:border-[#2d5d4b]/30 transition-colors">
                  <Container className="w-5 h-5" />
                </div>
                <ArrowRight className="w-5 h-5 text-stone-300 group-hover:text-[#2d5d4b] transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">Tank & Bin Capacity</h3>
              <p className="text-sm text-stone-600 leading-relaxed">Quick volume and capacity checks for tanks, bins, hoppers, and bulk containers.</p>
            </a>

            <a href="#" className="group block bg-[#fcfcfb] border border-stone-200 hover:border-[#2d5d4b]/40 rounded-lg p-6 transition-all hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2d5d4b]">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-white border border-stone-200 rounded flex items-center justify-center text-stone-600 group-hover:text-[#2d5d4b] group-hover:border-[#2d5d4b]/30 transition-colors">
                  <ThermometerSun className="w-5 h-5" />
                </div>
                <ArrowRight className="w-5 h-5 text-stone-300 group-hover:text-[#2d5d4b] transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">Spoilage Prevention</h3>
              <p className="text-sm text-stone-600 leading-relaxed">Estimate storage-risk factors related to moisture, time, airflow, and temperature exposure.</p>
            </a>

          </div>
        </div>
      </section>

      {/* Featured Calculators Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-stone-900 tracking-tight">Start with the most-used tools</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          
          {/* Tool 1 - Emphasized */}
          <div className="bg-white border-[3px] border-[#2d5d4b]/10 rounded-xl p-6 sm:p-8 relative overflow-hidden flex flex-col h-full shadow-sm hover:border-[#2d5d4b]/30 transition-colors group">
            <div className="absolute top-0 right-0 bg-[#2d5d4b] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-bl-lg">Most Popular</div>
            <h3 className="text-xl font-bold text-stone-900 mb-3 pr-20">Grain Bin Capacity Calculator</h3>
            <p className="text-stone-600 mb-6 flex-1 text-sm leading-relaxed">Estimate round-bin capacity in bushels using diameter, eave height, and fill assumptions.</p>
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="inline-flex items-center px-2 py-1 bg-stone-100 text-stone-600 text-[10px] uppercase font-bold rounded">Fast estimate</span>
              <span className="inline-flex items-center px-2 py-1 bg-stone-100 text-stone-600 text-[10px] uppercase font-bold rounded">No login</span>
              <span className="inline-flex items-center px-2 py-1 bg-stone-100 text-stone-600 text-[10px] uppercase font-bold rounded">Field-ready</span>
            </div>
            <NavLink 
              to="/tools/grain-bin-capacity" 
              className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-[#2d5d4b] text-white font-medium rounded hover:bg-[#234c3c] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2d5d4b] focus:ring-offset-2 min-h-[48px]"
            >
              View tool <ChevronRight className="w-4 h-4 ml-1 -mr-1" />
            </NavLink>
          </div>

          <div className="flex flex-col gap-4 lg:gap-6">
            {/* Tool 2 */}
            <div className="bg-white border border-stone-200 rounded-xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row gap-4 items-start sm:items-center hover:border-stone-300 transition-colors">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-stone-900 mb-2">Moisture Shrink Calculator</h3>
                <p className="text-sm text-stone-600 mb-3 leading-relaxed">Convert wet grain to market moisture and estimate shrink-adjusted bushels.</p>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2 py-0.5 bg-stone-100 text-stone-500 text-[10px] uppercase font-bold rounded">Fast estimate</span>
                </div>
              </div>
              <NavLink 
                to="/tools/moisture-shrink" 
                className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-stone-100 text-stone-700 font-medium rounded hover:bg-stone-200 transition-colors focus:outline-none focus:ring-2 focus:ring-stone-500 min-h-[48px] shrink-0"
              >
                View tool
              </NavLink>
            </div>

            {/* Tool 3 */}
            <div className="bg-white border border-stone-200 rounded-xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row gap-4 items-start sm:items-center hover:border-stone-300 transition-colors">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-stone-900 mb-2">Flat Storage Capacity Calculator</h3>
                <p className="text-sm text-stone-600 mb-3 leading-relaxed">Estimate storage volume and bushel capacity for flat storage, piles, and rectangular spaces.</p>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2 py-0.5 bg-stone-100 text-stone-500 text-[10px] uppercase font-bold rounded">Field-ready</span>
                </div>
              </div>
              <NavLink 
                to="/tools/flat-storage" 
                className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-stone-100 text-stone-700 font-medium rounded hover:bg-stone-200 transition-colors focus:outline-none focus:ring-2 focus:ring-stone-500 min-h-[48px] shrink-0"
              >
                View tool
              </NavLink>
            </div>

            {/* Tool 4 */}
            <div className="bg-white border border-stone-200 rounded-xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row gap-4 items-start sm:items-center hover:border-stone-300 transition-colors">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-stone-900 mb-2">Grain Drying Cost Calculator</h3>
                <p className="text-sm text-stone-600 mb-3 leading-relaxed">Estimate the cost impact of drying grain based on moisture points and per-bushel cost assumptions.</p>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2 py-0.5 bg-stone-100 text-stone-500 text-[10px] uppercase font-bold rounded">No login</span>
                </div>
              </div>
              <NavLink 
                to="/tools/drying-cost" 
                className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-stone-100 text-stone-700 font-medium rounded hover:bg-stone-200 transition-colors focus:outline-none focus:ring-2 focus:ring-stone-500 min-h-[48px] shrink-0"
              >
                View tool
              </NavLink>
            </div>
          </div>

        </div>
      </section>

      {/* How Storage Helps Section */}
      <section className="bg-white py-16 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-stone-900 tracking-tight">How Storage supports better farm decisions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center sm:text-left flex flex-col items-center sm:items-start">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-stone-100 text-[#2d5d4b] mb-5">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-3">Plan capacity before harvest</h3>
              <p className="text-stone-600 leading-relaxed text-sm">Quick estimates help match expected volume to bins, bags, flat storage, or temporary holding options.</p>
            </div>
            <div className="text-center sm:text-left flex flex-col items-center sm:items-start">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-stone-100 text-[#2d5d4b] mb-5">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-3">Compare storage-related tradeoffs</h3>
              <p className="text-stone-600 leading-relaxed text-sm">Use simple numbers to compare moisture, drying, spoilage, or holding assumptions before committing.</p>
            </div>
            <div className="text-center sm:text-left flex flex-col items-center sm:items-start">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-stone-100 text-[#2d5d4b] mb-5">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-3">Reduce guesswork in handling</h3>
              <p className="text-stone-600 leading-relaxed text-sm">Turn rough dimensions and operating assumptions into clearer planning numbers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / Disclaimer Strip */}
      <section className="bg-stone-900 text-stone-400 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-y-3 gap-x-8 text-xs font-medium uppercase tracking-widest text-center">
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#2d5d4b]"></span> Decision-support only</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#2d5d4b]"></span> Verify results independently</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#2d5d4b]"></span> Built for practical rural planning</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#2d5d4b]"></span> Part of the Rural Utility Cost project</span>
          </div>
        </div>
      </section>
      
    </div>
  );
}
