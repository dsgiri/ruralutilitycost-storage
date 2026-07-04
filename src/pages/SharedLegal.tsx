import React from 'react';
import { SEO } from '../components/seo/SEO';

export function SharedLegal({ type }: { type: 'legal' | 'license' | 'privacy' }) {
  const content = {
    legal: {
      title: 'Legal Disclaimer & Terms of Use',
      description: 'Review the legal disclaimers and terms of use for estimates and analytical capacities inside the Rural Ops Tools network.',
      body: 'Calculator results provided by the Rural Ops Tools Storage Hub are estimates and decision-support tools only. They do not constitute certified engineering plans, finalized lab results, or official EPA regulatory verdicts. Users must verify all important decisions independently. This module operates as part of the master ruralopstools.com ecosystem. Data entered into "Inspector Mode" calculators operates strictly within browser bounds unless otherwise stated in authenticated modules.'
    },
    license: {
      title: 'Open Source License',
      description: 'Review the Open Source MIT License constraints and data sharing policies utilized by the Rural Ops Tools modules.',
      body: 'This specific module and interface configuration is protected by standard MIT Licensing terms inherited from the ruralopstools.com open source repository constraints. Refer to the GitHub open source documentation for exhaustive replication rules.'
    },
    privacy: {
      title: 'Privacy Policy & Compliance Vault',
      description: 'Information regarding the strict data minimization and local device caching protocols designed to secure user inputs for compliance parameters.',
      body: 'We adhere to strict data-minimization practices. Your inputs for Feed Storage, Grain Tonnage constraints, or sensitive Water Tank Contamination logs (Arsenic, Nitrate) stay heavily restricted. The "Compliance Vault" utilizes device-level local storage (via localStorage) for pinning favorites. No data is serialized to external ad networks.'
    }
  };

  const selected = content[type];

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-8 py-16 overflow-y-auto">
       <SEO 
         title={`${selected.title} | Rural Ops Tools`}
         description={selected.description}
         canonicalPath={`/${type}`}
       />
       <div className="bg-white border-l-4 border-blue-600 p-6 sm:p-8 shadow-sm rounded-r-xl border-y border-r border-stone-200">
          <h1 className="text-2xl sm:text-3xl font-light text-stone-800 mb-6 flex items-center gap-3">
             {selected.title}
          </h1>
          <div className="prose prose-stone max-w-none">
             <p className="text-base sm:text-lg leading-relaxed text-stone-600">
                {selected.body}
             </p>
             <div className="mt-8 pt-8 border-t border-stone-100">
                <p className="text-[10px] font-mono text-stone-400 uppercase tracking-widest font-bold">
                   Governing Body: Rural Ops Tools Master Domain <br />
                   Effective Epoch: 2026-06-07 // AUDIT-READY
                </p>
             </div>
          </div>
       </div>
    </div>
  );
}
