import sys

def update_checklist():
    code = """import React from 'react';
import { Link } from 'react-router-dom';
import { CheckSquare, ArrowRight, Calculator } from 'lucide-react';
import { GuidePageLayout } from '../../components/layout/GuidePageLayout';

export function PostHarvestStorageChecklist() {
  const content = (
    <>
      <h2>1. Verify Your Total Stored Capacity</h2>
      <p>
        You cannot manage what you have not measured. Before you start planning your winter marketing strategy, you need an accurate count of what is actually in the bins. Do not rely solely on combine yield monitors — verify with physical bin measurements.
      </p>
      <ul>
        <li>Measure the eave height and peak height of the grain.</li>
        <li>Note the bin diameter.</li>
        <li>Apply a pack factor to account for grain compression (usually 3% to 8% for taller bins).</li>
      </ul>
      
      <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm my-6 not-prose">
        <h4 className="flex items-center gap-2 mt-0 mb-2 font-display font-bold text-ink">
          <Calculator className="w-5 h-5 text-silo-steel" />
          Quick Tool
        </h4>
        <p className="text-sm text-stone-600 mb-4">Calculate exact volumetric bushels using our free estimator.</p>
        <Link to="/grain-bin-estimator" className="text-silo-steel font-bold hover:underline">Open Grain Bin Estimator &rarr;</Link>
      </div>

      <h2>2. Lock Down Temperature and Moisture</h2>
      <p>
        Grain goes out of condition when temperature and moisture create an environment for fungi and insects to thrive. Your immediate post-harvest goal is to cool the grain mass as quickly as ambient temperatures allow.
      </p>
      <ul>
        <li><strong>Core the bins:</strong> Pull the center core to remove fines and broken kernels that restrict airflow.</li>
        <li><strong>Cool it down:</strong> Run aeration fans to drop the grain temperature below 50&deg;F (or lower depending on your climate). Insects go dormant at lower temperatures.</li>
        <li><strong>Check moisture:</strong> Ensure corn is 14% to 15% and soybeans are 11% to 12% if you plan to hold them into the spring or summer.</li>
      </ul>

      <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm my-6 not-prose">
        <h4 className="flex items-center gap-2 mt-0 mb-2 font-display font-bold text-ink">
          <CheckSquare className="w-5 h-5 text-silo-steel" />
          Spoilage Risk Check
        </h4>
        <p className="text-sm text-stone-600 mb-4">Input your current temperature and moisture to see how long your grain will safely hold.</p>
        <Link to="/spoilage-risk-calculator" className="text-silo-steel font-bold hover:underline">Run Spoilage Risk Assessor &rarr;</Link>
      </div>

      <h2>3. Calculate Your Monthly Holding Cost</h2>
      <p>
        Storing grain is essentially a speculative investment that the market price will rise faster than your storage costs. To make smart marketing decisions, you need to know your "burn rate."
      </p>
      <p>
        Factor in bin depreciation, insurance, electricity for fans, and most importantly: <strong>interest on tied-up capital</strong>. If you could have sold the grain to pay off a 7% operating loan, that 7% is now a direct cost against your stored bushels.
      </p>

      <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm my-10 text-center not-prose">
        <h3 className="mt-0 mb-4 font-display text-2xl font-bold text-ink">Find Your Breakeven Price</h3>
        <p className="text-stone-600 mb-6">See exactly how much the market needs to rise to justify holding the crop in the bin.</p>
        <Link to="/store-or-sell-calculator" className="inline-flex items-center justify-center px-6 py-3 bg-silo-steel text-white font-semibold rounded-lg hover:bg-ink transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-silo-steel no-underline">
          Open Store or Sell Calculator
        </Link>
      </div>

      <h2>4. Set a Marketing Plan (And Stick To It)</h2>
      <p>
        Once the grain is safe and you know your breakeven cost, write down your target sale prices. Do not let emotions drive the sale. If the market hits your target and covers your storage costs with a profit, execute the sale.
      </p>
      <ul>
        <li>Set automated target orders with your elevator.</li>
        <li>Monitor local basis levels — sometimes a strong local basis is worth more than waiting for a futures rally.</li>
        <li>Keep checking the bins weekly. A crusted roof or a bad smell means the marketing plan just accelerated: sell it before you lose it.</li>
      </ul>
    </>
  );

  return (
    <GuidePageLayout 
      title="Post-Harvest Storage Checklist"
      description="The combines are parked, but the work isn't over. Use this checklist to lock down your grain quality and ensure your marketing plan aligns with your storage costs."
      canonicalPath="/guides/post-harvest-storage-checklist"
      content={content}
    />
  );
}
"""
    with open('src/pages/guides/PostHarvestStorageChecklist.tsx', 'w') as f:
        f.write(code)

update_checklist()
