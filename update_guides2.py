import sys

def update_hidden_cost():
    code = """import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, ArrowRight } from 'lucide-react';
import { GuidePageLayout } from '../../components/layout/GuidePageLayout';

export function HiddenCostOfGrainStorage() {
  const content = (
    <>
      <h2>The Silent Profit Killer: Interest on Tied-Up Capital</h2>
      <p>
        When we ask operators "how much does it cost to store your grain per month?" we usually hear answers related to aeration fans, insurance, or maybe bin depreciation. But the largest line item is almost always invisible: <strong>interest</strong>.
      </p>
      <p>
        Grain in a bin is cash that is not in the bank. If you sell at harvest, you get cash. You can use that cash to pay down a 7% or 8% operating loan, or put it in an account earning 5%. When you choose to store the grain, you are actively choosing to forgo that interest benefit. This is your opportunity cost.
      </p>
      
      <h3>Let's run the math</h3>
      <p>
        Imagine you have 50,000 bushels of corn, and the cash price at harvest is $4.50. That is $225,000 sitting in the bin.
      </p>
      <p>
        If you have an operating loan at 7.5%, holding that corn costs you <strong>$1,406 every single month</strong> in interest alone. That is nearly 3 cents per bushel, per month, before you even turn on an aeration fan or factor in shrink. Over a 6-month storage period, you need the market to rally almost 17 cents just to pay the banker for the privilege of holding your own grain.
      </p>

      <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm my-10 text-center not-prose">
        <h3 className="mt-0 mb-4 font-display text-2xl font-bold text-ink">Calculate Your Exact Holding Costs</h3>
        <p className="text-stone-600 mb-6">Stop guessing. Input your crop price, bin costs, and interest rate to see your true monthly carry cost.</p>
        <Link to="/store-or-sell-calculator" className="inline-flex items-center justify-center px-6 py-3 bg-silo-steel text-white font-semibold rounded-lg hover:bg-ink transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-silo-steel no-underline">
          <Calculator className="w-5 h-5 mr-2" />
          Find Your Breakeven
        </Link>
      </div>

      <h2>Physical Shrink and Quality Loss</h2>
      <p>
        The second hidden cost is physical shrink. Grain is sold by weight, not strict volume. As grain dries in the bin, it loses weight. If you put in 50,000 bushels at 16% moisture and it dries down to 14% over the winter, you have less weight to sell in the spring. 
      </p>
      <p>
        Furthermore, insect activity, fungal growth, and general degradation can result in dockage at the elevator. Even a small dockage fee or a minor moisture shrink can wipe out a 10-cent market rally.
      </p>

      <h2>Operating and Depreciation Costs</h2>
      <p>
        Finally, you have the hard costs:
      </p>
      <ul>
        <li><strong>Electricity:</strong> Running large aeration fans, especially during warmer autumn days, adds up on the utility bill.</li>
        <li><strong>Insurance:</strong> You still have to insure the asset while it sits on your farm.</li>
        <li><strong>Depreciation:</strong> Bins rust, sweeps break, and concrete cracks. A portion of the bin's capital cost must be assigned to every bushel you store.</li>
      </ul>

      <h2>The Bottom Line</h2>
      <p>
        On-farm storage provides massive logistical advantages during a fast-paced harvest. You avoid elevator lines and keep the combines moving. But once the dust settles, keeping the grain in those bins becomes a financial decision. 
      </p>
      <p>
        Before you lock the bin doors for the winter, make sure you know exactly how much the market needs to rally to justify the wait.
      </p>

      <div className="bg-grain-gold/10 p-6 rounded-xl border border-grain-gold/20 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 not-prose">
        <div>
          <h4 className="font-bold text-ink m-0">Need to calculate your bin capacity?</h4>
          <p className="text-sm text-stone-600 m-0 mt-1">Figure out exactly how many bushels you have stored.</p>
        </div>
        <Link to="/grain-bin-estimator" className="shrink-0 inline-flex items-center justify-center px-5 py-2.5 bg-white border border-stone-200 text-ink font-semibold rounded-lg hover:bg-stone-50 transition-colors no-underline">
          Grain Bin Estimator <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
    </>
  );

  return (
    <GuidePageLayout 
      title="The Hidden Costs of Grain Storage"
      description="Discover the true cost of storing grain on-farm per month, leading with the often-underestimated interest on tied-up capital."
      canonicalPath="/guides/hidden-cost-of-grain-storage"
      content={content}
    />
  );
}
"""
    with open('src/pages/guides/HiddenCostOfGrainStorage.tsx', 'w') as f:
        f.write(code)

update_hidden_cost()
