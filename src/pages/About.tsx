import React from 'react';
import { SEO } from '../components/seo/SEO';

export function About() {
  return (
    <article className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-8 py-16 overflow-y-auto">
      <SEO 
        title="About Storage Hub | Rural Ops Tools"
        description="Learn about the Storage Hub, designed to give agricultural operators, technical auditors, and utility managers a secure sandbox for inventory tracking, capacity forecasting, and EPA compliance."
        canonicalPath="/about"
      />
      <div className="prose prose-stone max-w-none">
        <h1 className="text-stone-900 font-bold text-3xl md:text-4xl mb-6 tracking-tight">About Rural Ops Tools Storage Hub</h1>
        
        <div className="bg-white border border-stone-200 text-stone-800 p-6 rounded-xl mb-8 shadow-sm">
          <h2 className="text-xl font-bold mb-2 text-stone-900 border-b border-stone-100 pb-2">The Storage Planning Ecosystem</h2>
          <p className="font-medium tracking-wide leading-relaxed text-stone-600">
            The Storage Hub is an integrated component of the Rural Ops Tools master ecosystem. It functions as the primary planning ledger, providing agricultural operators, technical auditors, and utility managers a safe sandbox to forecast capacities, analyze holding costs, and identify compliance thresholds before irreversible operational decisions are made.
          </p>
        </div>

        <h3 className="text-2xl font-bold text-stone-900 mt-8 mb-4">Core Mission</h3>
        <p className="text-stone-600 mb-4 leading-relaxed">
          Our core mission is to replace scratchpad math with reliable, standardized screening tools. We support the management of Public Water Systems (PWS), agricultural grain holding reserves, feed logistics, and equipment storage planning. By integrating standard volumetric math with agricultural logistics and regulatory screening (like EPA/SDWA thresholds), we reduce guesswork in rural operations.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8 text-sm">
          <div className="border border-stone-200 p-5 rounded-xl bg-white shadow-sm hover:border-[#2d5d4b]/40 transition-colors">
             <h4 className="font-bold text-[#2d5d4b] uppercase text-[10px] tracking-widest mb-2 border-b border-stone-100 pb-2">Volumetric Accuracy</h4>
             <p className="text-stone-600 leading-relaxed">Tools convert physical dimensions into actionable capacities for Grain Bins, Feed Bunkers, Liquid Tanks, and Equipment sheds.</p>
          </div>
          <div className="border border-stone-200 p-5 rounded-xl bg-white shadow-sm hover:border-[#2d5d4b]/40 transition-colors">
             <h4 className="font-bold text-[#2d5d4b] uppercase text-[10px] tracking-widest mb-2 border-b border-stone-100 pb-2">Compliance & Screening</h4>
             <p className="text-stone-600 leading-relaxed">Strict screening flags alert users when Nitrate, Coliform, or Arsenic levels approach or exceed regulatory reference limits.</p>
          </div>
          <div className="border border-stone-200 p-5 rounded-xl bg-white shadow-sm hover:border-[#2d5d4b]/40 transition-colors">
             <h4 className="font-bold text-[#2d5d4b] uppercase text-[10px] tracking-widest mb-2 border-b border-stone-100 pb-2">Risk & Cost Management</h4>
             <p className="text-stone-600 leading-relaxed">Financial and biological calculators evaluate the overhead of carrying inventory versus the risk of moisture and temperature spoilage.</p>
          </div>
          <div className="border border-stone-200 p-5 rounded-xl bg-white shadow-sm hover:border-[#2d5d4b]/40 transition-colors">
             <h4 className="font-bold text-[#2d5d4b] uppercase text-[10px] tracking-widest mb-2 border-b border-stone-100 pb-2">System Integration</h4>
             <p className="text-stone-600 leading-relaxed">Inherits core styling, legal logic, and functional integrity from the broader Rural Ops Tools planning framework.</p>
          </div>
        </div>
      </div>
    </article>
  );
}
