import React from 'react';
import { NavLink } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';
import { 
  ArrowRight, 
  Wheat, 
  Tractor, 
  ThermometerSun, 
  Database,
  Calculator,
  ChevronRight,
  CheckCircle2,
  Droplets,
  Repeat
} from 'lucide-react';

export function Home() {
  return (
    <main className="w-full flex-1 overflow-y-auto bg-[#F9F9F8] text-stone-900 font-sans focus:outline-none" tabIndex={-1}>
      <SEO 
        title="Storage | Rural Utility Cost" 
        description="Estimate capacity, manage inventory rotation, evaluate spoilage risk, and analyze storage costs with practical decision-support tools." 
        canonicalPath="/"
      />

      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-20 lg:pb-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
        <div className="flex-1 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-200/60 text-stone-700 text-xs font-bold uppercase tracking-widest mb-6 border border-stone-300/50">
            Storage Planning Tools
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 leading-tight mb-6 tracking-tight">
            Storage calculators for grain, feed, tanks, and operational planning.
          </h1>
          <p className="text-lg text-stone-600 mb-8 max-w-xl leading-relaxed">
            Estimate capacity, manage inventory rotation, evaluate spoilage risk, and analyze storage costs with practical decision-support tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <NavLink 
              to="/tools/grain-bin-capacity" 
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#2d5d4b] text-white font-semibold rounded min-h-[48px] hover:bg-[#234c3c] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2d5d4b] focus:ring-offset-2"
            >
              <Calculator className="w-5 h-5" aria-hidden="true" />
              <span>Open Grain Bin Estimator</span>
            </NavLink>
            <a 
              href="#calculators" 
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-stone-300 text-stone-700 font-semibold rounded min-h-[48px] hover:bg-stone-50 transition-colors focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2"
            >
              Browse calculators
            </a>
          </div>
        </div>

        {/* Hero Right: Mockup Card */}
        <div className="flex-1 w-full max-w-md lg:max-w-none lg:w-auto flex justify-center lg:justify-end" aria-hidden="true">
          <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-6 w-full max-w-sm relative">
            <div className="border-b border-stone-100 pb-4 mb-4 flex justify-between items-center">
              <h3 className="text-sm font-bold text-stone-800 uppercase tracking-wide">Capacity Estimate</h3>
              <span className="w-2 h-2 rounded-full bg-[#2d5d4b]"></span>
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Bin diameter</span>
                <span className="font-medium text-stone-900">30 ft</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Eave height</span>
                <span className="font-medium text-stone-900">22 ft</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Peak fill</span>
                <span className="font-medium text-stone-900">Yes</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Crop</span>
                <span className="font-medium text-stone-900">Corn</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Compaction</span>
                <span className="font-medium text-stone-900">5.5%</span>
              </div>
            </div>
            <div className="bg-[#fcfcfb] rounded-lg p-4 space-y-3 border border-stone-100">
              <div className="flex justify-between items-end">
                <span className="text-stone-600 font-semibold text-sm">Estimated Capacity</span>
                <span className="text-xl font-bold text-[#2d5d4b]">13,184 <span className="text-sm font-medium text-stone-500">bu</span></span>
              </div>
            </div>
            <div className="mt-4 text-center">
              <span className="text-xs text-stone-400 uppercase tracking-widest font-bold">Example estimate only</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section id="calculators" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-stone-200">
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight mb-3">Priority Planning Workflows</h2>
          <p className="text-stone-600 max-w-2xl text-lg">Start here for the most frequent storage decisions.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Top Priority 1 */}
          <div className="bg-white border-2 border-[#2d5d4b]/20 hover:border-[#2d5d4b]/50 rounded-2xl p-6 sm:p-8 flex flex-col shadow-sm transition-colors relative overflow-hidden group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-[#2d5d4b]/10 rounded-lg flex items-center justify-center text-[#2d5d4b] group-hover:bg-[#2d5d4b]/20 transition-colors">
                <Wheat className="w-6 h-6" aria-hidden="true" />
              </div>
              <span className="inline-flex items-center px-2.5 py-1 bg-[#2d5d4b]/10 text-[#2d5d4b] text-[10px] uppercase font-bold tracking-widest rounded-full">Most used</span>
            </div>
            <h3 className="text-2xl font-bold text-stone-900 mb-3">Grain Bin Capacity Estimator</h3>
            <p className="text-stone-600 mb-8 flex-1 leading-relaxed text-base">Don't guess on harvest volume. Estimate bushel capacity based on bin geometry, eave height, and compaction factors before harvest begins.</p>
            <NavLink 
              to="/tools/grain-bin-capacity" 
              className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3.5 bg-stone-900 text-white font-semibold rounded hover:bg-stone-800 transition-colors focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-2 min-h-[48px]"
              aria-label="Open Grain Bin Capacity Estimator"
            >
              Open Estimator <ChevronRight className="w-4 h-4 ml-1" aria-hidden="true" />
            </NavLink>
          </div>

          <div className="flex flex-col gap-4 lg:gap-6">
            {/* Priority 2 */}
            <div className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row gap-5 items-start sm:items-center hover:border-stone-300 transition-colors flex-1">
              <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center text-[#2d5d4b] shrink-0">
                <Database className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-stone-900 mb-1">Feed Storage Capacity</h3>
                <p className="text-sm text-stone-600 leading-relaxed">Calculate tonnage limits for dry and wet feed storage structures.</p>
              </div>
              <NavLink 
                to="/tools/feed-storage-capacity" 
                className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 bg-stone-100 text-stone-800 font-semibold rounded hover:bg-stone-200 transition-colors focus:outline-none focus:ring-2 focus:ring-stone-500 min-h-[48px] shrink-0"
                aria-label="Open Feed Storage Capacity tool"
              >
                Open tool
              </NavLink>
            </div>

            {/* Priority 3 */}
            <div className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row gap-5 items-start sm:items-center hover:border-stone-300 transition-colors flex-1">
              <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center text-[#2d5d4b] shrink-0">
                <ThermometerSun className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-stone-900 mb-1">Spoilage Risk Assessor</h3>
                <p className="text-sm text-stone-600 leading-relaxed">Evaluate loss-risk percentiles using moisture and temperature factors.</p>
              </div>
              <NavLink 
                to="/tools/spoilage-risk-assessor" 
                className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 bg-stone-100 text-stone-800 font-semibold rounded hover:bg-stone-200 transition-colors focus:outline-none focus:ring-2 focus:ring-stone-500 min-h-[48px] shrink-0"
                aria-label="Open Spoilage Risk Assessor tool"
              >
                Open tool
              </NavLink>
            </div>
            
            {/* Priority 4 */}
            <div className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row gap-5 items-start sm:items-center hover:border-stone-300 transition-colors flex-1">
              <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center text-[#2d5d4b] shrink-0">
                <Calculator className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-stone-900 mb-1">Storage Cost Analysis</h3>
                <p className="text-sm text-stone-600 leading-relaxed">Calculate carry overhead, depreciation, and holding costs.</p>
              </div>
              <NavLink 
                to="/tools/storage-cost-analysis" 
                className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 bg-stone-100 text-stone-800 font-semibold rounded hover:bg-stone-200 transition-colors focus:outline-none focus:ring-2 focus:ring-stone-500 min-h-[48px] shrink-0"
                aria-label="Open Storage Cost Analysis tool"
              >
                Open tool
              </NavLink>
            </div>
          </div>

        </div>
      </section>

      {/* Calculator Discovery Section */}
      <section className="bg-white border-t border-stone-200 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight mb-3">All Storage Calculators</h2>
            <p className="text-stone-600 max-w-2xl text-lg">Browser-based operational tools to estimate, plan, and verify agricultural storage.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            
            {/* 1 */}
            <NavLink to="/tools/feed-storage-capacity" className="group flex flex-col bg-[#fcfcfb] border border-stone-200 hover:border-[#2d5d4b]/40 rounded-xl p-5 transition-all hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2d5d4b]">
              <div className="w-10 h-10 mb-4 bg-white border border-stone-200 rounded flex items-center justify-center text-stone-600 group-hover:text-[#2d5d4b] group-hover:border-[#2d5d4b]/30 transition-colors">
                <Database className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-base font-bold text-stone-900 mb-2 leading-snug group-hover:text-[#2d5d4b] transition-colors">Feed Storage Capacity</h3>
              <p className="text-sm text-stone-600 mb-6 flex-1 leading-relaxed">Calculate maximum tonnage and volume constraints for dry and wet feed storage.</p>
              <div className="flex items-center text-[#2d5d4b] text-sm font-semibold">
                Open tool <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
              </div>
            </NavLink>

            {/* 2 */}
            <NavLink to="/tools/grain-bin-capacity" className="group flex flex-col bg-[#fcfcfb] border border-stone-200 hover:border-[#2d5d4b]/40 rounded-xl p-5 transition-all hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2d5d4b]">
              <div className="w-10 h-10 mb-4 bg-white border border-stone-200 rounded flex items-center justify-center text-stone-600 group-hover:text-[#2d5d4b] group-hover:border-[#2d5d4b]/30 transition-colors">
                <Wheat className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-base font-bold text-stone-900 mb-2 leading-snug group-hover:text-[#2d5d4b] transition-colors">Grain Bin Capacity</h3>
              <p className="text-sm text-stone-600 mb-6 flex-1 leading-relaxed">Estimate bushel capacity based on bin geometry and compaction factors.</p>
              <div className="flex items-center text-[#2d5d4b] text-sm font-semibold">
                Open tool <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
              </div>
            </NavLink>

            {/* 3 */}
            <NavLink to="/tools/equipment-storage-planner" className="group flex flex-col bg-[#fcfcfb] border border-stone-200 hover:border-[#2d5d4b]/40 rounded-xl p-5 transition-all hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2d5d4b]">
              <div className="w-10 h-10 mb-4 bg-white border border-stone-200 rounded flex items-center justify-center text-stone-600 group-hover:text-[#2d5d4b] group-hover:border-[#2d5d4b]/30 transition-colors">
                <Tractor className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-base font-bold text-stone-900 mb-2 leading-snug group-hover:text-[#2d5d4b] transition-colors">Equipment Storage Planner</h3>
              <p className="text-sm text-stone-600 mb-6 flex-1 leading-relaxed">Map square footage requirements for tractors, implements, and utility vehicles.</p>
              <div className="flex items-center text-[#2d5d4b] text-sm font-semibold">
                Open tool <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
              </div>
            </NavLink>

            {/* 4 */}
            <NavLink to="/tools/tank-volume-epa-auditor" className="group flex flex-col bg-[#fcfcfb] border border-stone-200 hover:border-[#2d5d4b]/40 rounded-xl p-5 transition-all hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2d5d4b]">
              <div className="w-10 h-10 mb-4 bg-white border border-stone-200 rounded flex items-center justify-center text-stone-600 group-hover:text-[#2d5d4b] group-hover:border-[#2d5d4b]/30 transition-colors">
                <Droplets className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-base font-bold text-stone-900 mb-2 leading-snug group-hover:text-[#2d5d4b] transition-colors">Tank Volume & EPA Auditor</h3>
              <p className="text-sm text-stone-600 mb-6 flex-1 leading-relaxed">Verify liquid tank capacity and log sampling period data against thresholds.</p>
              <div className="flex items-center text-[#2d5d4b] text-sm font-semibold">
                Open tool <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
              </div>
            </NavLink>

            {/* 5 */}
            <NavLink to="/tools/inventory-rotation-planner" className="group flex flex-col bg-[#fcfcfb] border border-stone-200 hover:border-[#2d5d4b]/40 rounded-xl p-5 transition-all hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2d5d4b]">
              <div className="w-10 h-10 mb-4 bg-white border border-stone-200 rounded flex items-center justify-center text-stone-600 group-hover:text-[#2d5d4b] group-hover:border-[#2d5d4b]/30 transition-colors">
                <Repeat className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-base font-bold text-stone-900 mb-2 leading-snug group-hover:text-[#2d5d4b] transition-colors">Inventory Rotation Planner</h3>
              <p className="text-sm text-stone-600 mb-6 flex-1 leading-relaxed">Structure FIFO logistics to manage perishability and inventory flow constraints.</p>
              <div className="flex items-center text-[#2d5d4b] text-sm font-semibold">
                Open tool <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
              </div>
            </NavLink>

            {/* 6 */}
            <NavLink to="/tools/spoilage-risk-assessor" className="group flex flex-col bg-[#fcfcfb] border border-stone-200 hover:border-[#2d5d4b]/40 rounded-xl p-5 transition-all hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2d5d4b]">
              <div className="w-10 h-10 mb-4 bg-white border border-stone-200 rounded flex items-center justify-center text-stone-600 group-hover:text-[#2d5d4b] group-hover:border-[#2d5d4b]/30 transition-colors">
                <ThermometerSun className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-base font-bold text-stone-900 mb-2 leading-snug group-hover:text-[#2d5d4b] transition-colors">Spoilage Risk Assessor</h3>
              <p className="text-sm text-stone-600 mb-6 flex-1 leading-relaxed">Track moisture, temperature, and biological parameters to evaluate loss-risk percentiles.</p>
              <div className="flex items-center text-[#2d5d4b] text-sm font-semibold">
                Open tool <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
              </div>
            </NavLink>

            {/* 7 */}
            <NavLink to="/tools/storage-cost-analysis" className="group flex flex-col bg-[#fcfcfb] border border-stone-200 hover:border-[#2d5d4b]/40 rounded-xl p-5 transition-all hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2d5d4b]">
              <div className="w-10 h-10 mb-4 bg-white border border-stone-200 rounded flex items-center justify-center text-stone-600 group-hover:text-[#2d5d4b] group-hover:border-[#2d5d4b]/30 transition-colors">
                <Calculator className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-base font-bold text-stone-900 mb-2 leading-snug group-hover:text-[#2d5d4b] transition-colors">Storage Cost Analysis Matrix</h3>
              <p className="text-sm text-stone-600 mb-6 flex-1 leading-relaxed">Calculate carry overhead, depreciation, and opportunity costs of agricultural holding.</p>
              <div className="flex items-center text-[#2d5d4b] text-sm font-semibold">
                Open tool <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
              </div>
            </NavLink>

          </div>
        </div>
      </section>

      {/* How Storage Helps Section */}
      <section className="bg-stone-100 py-16 lg:py-24 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight mb-4">How Storage supports operational planning</h2>
            <p className="text-stone-600 text-lg">Practical estimates for better holding, flow, and structural decisions.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="flex flex-col">
              <div className="w-10 h-10 rounded-full bg-white border border-stone-200 text-[#2d5d4b] flex items-center justify-center mb-5">
                <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">Estimate capacity before storage decisions</h3>
              <p className="text-stone-600 leading-relaxed text-sm">Use straightforward volume tools to match expected yield to bins, bags, or flat storage options before harvest pressure hits.</p>
            </div>
            <div className="flex flex-col">
              <div className="w-10 h-10 rounded-full bg-white border border-stone-200 text-[#2d5d4b] flex items-center justify-center mb-5">
                <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">Compare cost and loss tradeoffs</h3>
              <p className="text-stone-600 leading-relaxed text-sm">Calculate carry overhead, moisture shrink, and spoilage risk to weigh the value of storing versus moving commodities.</p>
            </div>
            <div className="flex flex-col">
              <div className="w-10 h-10 rounded-full bg-white border border-stone-200 text-[#2d5d4b] flex items-center justify-center mb-5">
                <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">Reduce guesswork in handling and rotation</h3>
              <p className="text-stone-600 leading-relaxed text-sm">Structure FIFO logistics and space mapping for feed, liquid tanks, and equipment without relying on scratchpad math.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / Disclaimer Strip */}
      <section className="bg-white py-8 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center lg:justify-between gap-y-4 gap-x-8 text-xs font-semibold uppercase tracking-widest text-center text-stone-500">
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#2d5d4b]" aria-hidden="true"></span> Decision-support only</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#2d5d4b]" aria-hidden="true"></span> Verify results independently</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#2d5d4b]" aria-hidden="true"></span> Built for practical rural planning</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#2d5d4b]" aria-hidden="true"></span> Part of Rural Utility Cost</span>
          </div>
        </div>
      </section>
      
    </main>
  );
}

