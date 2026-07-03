import React from 'react';
import { SEO } from '../components/seo/SEO';

export function About() {
  return (
    <article className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-8 py-16 overflow-y-auto">
      <SEO 
        title="About Storage Vault | Rural Utility Cost"
        description="Learn about the Compliance Vault Ecosystem, designed to give technical auditors, farmers, and utility managers a secure sandbox for inventory tracking and EPA compliance."
        canonicalPath="/about"
      />
      <div className="prose prose-stone max-w-none">
        <h1 className="text-stone-800 font-light text-3xl md:text-4xl mb-6">About Rural Utility Cost Storage</h1>
        
        <div className="bg-white border border-stone-200 text-stone-800 p-6 rounded-xl mb-8 shadow-sm">
          <h2 className="text-xl font-bold mb-2 text-stone-900 border-b border-stone-100 pb-2">The Compliance Vault Ecosystem</h2>
          <p className="font-light tracking-wide leading-relaxed text-stone-600">
            The Storage app is an integrated component of the Rural Utility Cost master ecosystem. It functions as the primary "Compliance Ledger," providing technical auditors, farmers, and utility managers a safe sandbox to forecast capacities and identify compliance thresholds before irreversible operational decisions are made.
          </p>
        </div>

        <h3 className="text-2xl font-bold text-stone-800 mt-8 mb-4">Core Mission</h3>
        <p className="text-stone-600 mb-4">
          Our core mission is managing Public Water Systems (PWS), agricultural grain holding reserves, and operational fleet tracking under strict compliance benchmarks such as the Safe Drinking Water Act (SDWA) and the Lead & Copper Rule (LCRR/LCRI).
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8 text-sm">
          <div className="border border-stone-200 p-5 rounded-xl bg-white shadow-sm">
             <h4 className="font-bold text-blue-700 uppercase text-[10px] tracking-widest mb-2 border-b border-stone-100 pb-2">Data Veracity</h4>
             <p className="text-stone-500">Every calculated metric is treated as a formal record subject to "Verification Chain" auditing.</p>
          </div>
          <div className="border border-stone-200 p-5 rounded-xl bg-white shadow-sm">
             <h4 className="font-bold text-blue-700 uppercase text-[10px] tracking-widest mb-2 border-b border-stone-100 pb-2">Contaminant Warnings</h4>
             <p className="text-stone-500">Strict Red Flag alerts when Nitrate, Coliform, or Arsenic limits exceed the specified MCL defined by TCEQ RG-211 reporting.</p>
          </div>
          <div className="border border-stone-200 p-5 rounded-xl bg-white shadow-sm">
             <h4 className="font-bold text-blue-700 uppercase text-[10px] tracking-widest mb-2 border-b border-stone-100 pb-2">Inventory Deflation</h4>
             <p className="text-stone-500">Tools calculate risk metrics for biological spoilage across grain and feed silos.</p>
          </div>
          <div className="border border-stone-200 p-5 rounded-xl bg-white shadow-sm">
             <h4 className="font-bold text-blue-700 uppercase text-[10px] tracking-widest mb-2 border-b border-stone-100 pb-2">System Integration</h4>
             <p className="text-stone-500">Inherits core styling, legal logic, and functional integrity from ruralutilitycost.com.</p>
          </div>
        </div>

      </div>
    </article>
  );
}
