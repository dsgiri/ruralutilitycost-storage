import sys

def update_store_vs_sell():
    code = """import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, ArrowRight } from 'lucide-react';
import { GuidePageLayout } from '../../components/layout/GuidePageLayout';

export function StoreVsSellDecisionFramework() {
  const content = (
    <>
      <p className="text-xl">
        Every harvest, the same question comes up: is it worth putting the crop in the bin and waiting for a better price, or taking the cash now? Here is the framework to make that decision without relying on gut feeling.
      </p>

      <h2>The True Cost of Storage</h2>
      <p>
        Storing grain is never free, even if the bin has been paid off for decades. To make an informed "store or sell" decision, you have to calculate your breakeven price. This is the minimum price you need to receive in the future to offset the costs of holding the grain today.
      </p>
      <p>
        The two main components of this cost are <strong>physical storage costs</strong> and <strong>opportunity costs</strong>.
      </p>

      <h3>1. Physical Storage Costs</h3>
      <p>
        These are the out-of-pocket and depreciative costs of putting grain in a bin. They include:
      </p>
      <ul>
        <li><strong>Bin Depreciation:</strong> Even if paid off, the bin has a lifespan and needs eventual replacement.</li>
        <li><strong>Operating Costs:</strong> The electricity to run aeration fans, insurance on the grain, and general maintenance.</li>
        <li><strong>Shrink and Quality Loss:</strong> Grain loses moisture and weight. A 1% shrink on 10,000 bushels is 100 bushels you can no longer sell.</li>
      </ul>

      <h3>2. Opportunity Cost (Interest)</h3>
      <p>
        This is the silent profit killer. When you store grain, you are tying up capital. If you sold the grain at harvest, you could use that cash to pay down an operating loan (saving interest) or put it in a high-yield account (earning interest). 
      </p>
      <p>
        If corn is $4.50 and your interest rate is 7%, holding 10,000 bushels costs you over $260 a month in interest alone.
      </p>

      <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm my-10 text-center not-prose">
        <h3 className="mt-0 mb-4 text-2xl font-display font-bold text-ink">Run Your Own Numbers</h3>
        <p className="text-stone-600 mb-6">Use our Store or Sell Calculator to find your exact breakeven price and see if storing is profitable under different market scenarios.</p>
        <Link to="/store-or-sell-calculator" className="inline-flex items-center justify-center px-6 py-3 bg-silo-steel text-white font-semibold rounded-lg hover:bg-ink transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-silo-steel no-underline">
          <Calculator className="w-5 h-5 mr-2" />
          Open the Calculator
        </Link>
      </div>

      <h2>The Breakeven Formula</h2>
      <p>
        The basic formula for figuring out your breakeven price is straightforward:
      </p>
      <blockquote className="bg-stone-50 border-l-4 border-silo-steel p-4 rounded-r-lg not-prose">
        <p className="font-mono text-sm text-ink mb-0"><strong>Breakeven Price</strong> = Current Cash Price + (Monthly Physical Cost/bu + Monthly Interest Cost/bu) &times; Months Stored</p>
      </blockquote>
      <p className="mt-6">
        Once you know this number, the decision becomes binary: do you strongly believe the market will rise above your breakeven price before you have to sell? If yes, store. If no, sell.
      </p>

      <h2>Don't Forget Spoilage Risk</h2>
      <p>
        Financials are only half the battle. If your grain goes out of condition, your breakeven math goes out the window. Always ensure your grain is at the proper moisture and temperature for the intended storage duration.
      </p>
      
      <div className="bg-field-sage/10 p-6 rounded-xl border border-field-sage/20 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 not-prose">
        <div>
          <h4 className="font-bold text-ink m-0">Check your spoilage risk</h4>
          <p className="text-sm text-stone-600 m-0 mt-1">Make sure your crop is safe to hold.</p>
        </div>
        <Link to="/spoilage-risk-calculator" className="shrink-0 inline-flex items-center justify-center px-5 py-2.5 bg-white border border-stone-200 text-ink font-semibold rounded-lg hover:bg-stone-50 transition-colors no-underline">
          Check Risk <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
    </>
  );

  return (
    <GuidePageLayout 
      title="Store vs. Sell: The Decision Framework"
      description="A practical framework for deciding whether to store grain or sell it at harvest based on breakeven costs."
      canonicalPath="/guides/store-vs-sell-decision-framework"
      content={content}
    />
  );
}
"""
    with open('src/pages/guides/StoreVsSellDecisionFramework.tsx', 'w') as f:
        f.write(code)

update_store_vs_sell()
