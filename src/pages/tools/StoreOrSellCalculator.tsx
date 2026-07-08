import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Info } from 'lucide-react';
import { CalculatorPageLayout } from '../../components/layout/CalculatorPageLayout';
import { GrainFillGauge } from '../../components/ui/GrainFillGauge';

export function StoreOrSellCalculator() {
  const [searchParams] = useSearchParams();
  const initialCapacity = searchParams.get('capacity') || '10000';
  
  const [cropType, setCropType] = useState('corn');
  const [currentPrice, setCurrentPrice] = useState('4.50');
  const [quantity, setQuantity] = useState(initialCapacity);
  const [annualFixedCost, setAnnualFixedCost] = useState('5000');
  const [monthlyOpCost, setMonthlyOpCost] = useState('200');
  const [interestRate, setInterestRate] = useState('7.0');
  const [monthsStored, setMonthsStored] = useState(6);
  const [expectedFuturePrice, setExpectedFuturePrice] = useState('');
  
  const [scenarioPriceDelta, setScenarioPriceDelta] = useState(0);

  const results = useMemo(() => {
    const p = parseFloat(currentPrice) || 0;
    const q = parseFloat(quantity) || 1;
    const fc = parseFloat(annualFixedCost) || 0;
    const op = parseFloat(monthlyOpCost) || 0;
    const rate = parseFloat(interestRate) / 100 || 0;
    const m = monthsStored || 1;

    const annualOpCost = op * 12;
    const monthlyStorageCostPerBu = (fc + annualOpCost) / q / 12;
    const interestCostPerBuMonth = (p * rate) / 12;
    
    const totalCostPerBuMonth = monthlyStorageCostPerBu + interestCostPerBuMonth;
    const totalCostOverPeriod = totalCostPerBuMonth * m;
    const breakevenPrice = p + totalCostOverPeriod;

    let verdict = null;
    const expP = parseFloat(expectedFuturePrice);
    if (!isNaN(expP)) {
      const profit = expP - breakevenPrice;
      verdict = {
        isProfitable: profit > 0,
        profit: profit,
        price: expP
      };
    }

    const scenarioPrice = p + scenarioPriceDelta;
    const scenarioProfit = scenarioPrice - breakevenPrice;
    
    // For gauge: how close is scenarioPrice to breakeven?
    // Let's say breakeven is 100%. If scenario price is 0, it's 0%. 
    const fillPercentage = breakevenPrice > 0 ? Math.min(100, Math.max(0, (scenarioPrice / breakevenPrice) * 100)) : 0;
    const fillColor = scenarioProfit >= 0 ? 'bg-field-sage' : 'bg-harvest-rust';

    return {
      monthlyStorageCostPerBu,
      interestCostPerBuMonth,
      totalCostOverPeriod,
      breakevenPrice,
      verdict,
      scenarioVerdict: {
        price: scenarioPrice,
        isProfitable: scenarioProfit > 0,
        profit: scenarioProfit
      },
      fillPercentage,
      fillColor
    };
  }, [currentPrice, quantity, annualFixedCost, monthlyOpCost, interestRate, monthsStored, expectedFuturePrice, scenarioPriceDelta]);

  // Adjust scenario slider when expected future price changes
  useEffect(() => {
    const p = parseFloat(currentPrice) || 0;
    const expP = parseFloat(expectedFuturePrice);
    if (!isNaN(expP) && p > 0) {
       setScenarioPriceDelta(expP - p);
    }
  }, [expectedFuturePrice, currentPrice]);


  const heroTool = (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-8">
      {/* Inputs Column */}
      <div className="lg:col-span-5 flex flex-col gap-5">
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-stone-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-silo-steel/10 flex items-center justify-center text-silo-steel">
              <span className="font-bold text-sm">1</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-ink">Market & Grain</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-stone-800 mb-1">Crop Type</label>
              <select value={cropType} onChange={(e) => setCropType(e.target.value)} className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-silo-steel outline-none text-base font-medium">
                <option value="corn">Corn</option>
                <option value="soybeans">Soybeans</option>
                <option value="wheat">Wheat</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-800 mb-1">Current Price ($)</label>
              <input type="number" step="0.01" value={currentPrice} onChange={(e) => setCurrentPrice(e.target.value)} className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-silo-steel outline-none text-base font-medium font-mono" />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-semibold text-stone-800 mb-1">Quantity Stored (bu)</label>
            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-silo-steel outline-none text-base font-medium font-mono" />
          </div>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-stone-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-silo-steel/10 flex items-center justify-center text-silo-steel">
              <span className="font-bold text-sm">2</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-ink">Storage Costs</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-stone-800 mb-1">Annual Fixed ($) <Info className="inline w-3 h-3 text-stone-400" title="Bin depreciation and fixed insurance" /></label>
              <input type="number" value={annualFixedCost} onChange={(e) => setAnnualFixedCost(e.target.value)} className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-silo-steel outline-none text-base font-medium font-mono" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-800 mb-1">Monthly Op ($) <Info className="inline w-3 h-3 text-stone-400" title="Aeration, handling, utilities" /></label>
              <input type="number" value={monthlyOpCost} onChange={(e) => setMonthlyOpCost(e.target.value)} className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-silo-steel outline-none text-base font-medium font-mono" />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-stone-800 mb-1">Interest Rate (%) <Info className="inline w-3 h-3 text-stone-400" title="Opportunity cost on capital tied up in grain" /></label>
            <input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-silo-steel outline-none text-base font-medium font-mono" />
          </div>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-stone-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-silo-steel/10 flex items-center justify-center text-silo-steel">
              <span className="font-bold text-sm">3</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-ink">Duration & Outlook</h2>
          </div>
          
          <div className="mb-6">
            <label className="flex justify-between text-sm font-semibold text-stone-800 mb-3">
              <span>Months Planning to Store</span>
              <span className="bg-stone-100 px-2 py-0.5 rounded text-stone-700">{monthsStored} months</span>
            </label>
            <input type="range" min="1" max="12" step="1" value={monthsStored} onChange={(e) => setMonthsStored(parseInt(e.target.value))} className="w-full accent-silo-steel" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-800 mb-1">Target Sale Price ($/bu) <span className="font-normal text-stone-500">(Optional)</span></label>
            <input type="number" step="0.01" value={expectedFuturePrice} onChange={(e) => setExpectedFuturePrice(e.target.value)} placeholder="e.g. 5.20" className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-silo-steel outline-none text-base font-medium font-mono" />
          </div>
        </div>
      </div>

      {/* Results Column */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        <div className="bg-silo-steel rounded-2xl shadow-xl p-8 sm:p-10 text-white relative overflow-hidden flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="relative z-10 flex-1">
            <h3 className="text-stone-400 font-display font-bold uppercase tracking-widest text-sm mb-2">Breakeven Price</h3>
            <p className="text-lg text-stone-300 mb-2">You need at least <strong className="text-white font-mono text-4xl sm:text-5xl ml-1 tracking-tight">${results.breakevenPrice.toFixed(2)}</strong>/bu</p>
            <p className="text-base text-stone-400 mb-8 max-w-lg">
              to break even on storing for {monthsStored} months.
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-stone-700/50">
              <div>
                <div className="text-stone-400 text-sm mb-1 flex items-center gap-1">Physical Cost</div>
                <div className="font-mono text-xl font-semibold">${results.monthlyStorageCostPerBu.toFixed(3)}<span className="text-sm text-stone-500 font-normal font-sans">/bu/mo</span></div>
              </div>
              <div>
                <div className="text-stone-400 text-sm mb-1 flex items-center gap-1">Interest Cost</div>
                <div className="font-mono text-xl font-semibold text-grain-gold">${results.interestCostPerBuMonth.toFixed(3)}<span className="text-sm text-stone-500 font-normal font-sans">/bu/mo</span></div>
              </div>
            </div>
          </div>

          <div className="shrink-0 flex flex-col items-center">
             <GrainFillGauge 
                fillPercentage={results.fillPercentage} 
                fillColor={results.fillColor} 
             />
             <div className="mt-4 text-center text-[10px] font-bold uppercase tracking-widest text-stone-400">
               {results.fillPercentage >= 100 ? 'At/Above Breakeven' : 'Below Breakeven'}
             </div>
          </div>
        </div>

        {/* Interactive Slider */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 sm:p-8">
          <h3 className="font-display text-2xl font-bold text-ink mb-4">What if the market moves?</h3>
          <p className="text-stone-600 mb-6 text-sm">Drag the slider to see how price changes affect your profitability after {monthsStored} months of storage.</p>
          
          <div className="mb-8">
            <div className="flex justify-between text-sm font-bold text-stone-700 mb-2">
              <span>Price drops</span>
              <span>Current Price</span>
              <span>Price rises</span>
            </div>
            <input 
               type="range" 
               min="-1" 
               max="2" 
               step="0.05"
               value={scenarioPriceDelta} 
               onChange={(e) => setScenarioPriceDelta(parseFloat(e.target.value))} 
               className="w-full accent-grain-gold"
            />
          </div>
          <div className="text-center p-6 bg-stone-50 rounded-xl border border-stone-100">
            <p className="text-stone-500 text-sm font-semibold uppercase tracking-wider mb-2">If price becomes <span className="font-mono text-ink">${results.scenarioVerdict.price.toFixed(2)}</span></p>
            <div className={`font-mono text-3xl sm:text-4xl font-bold tracking-tight ${results.scenarioVerdict.isProfitable ? 'text-field-sage' : 'text-harvest-rust'}`}>
              {results.scenarioVerdict.isProfitable ? '+' : '-'}${Math.abs(results.scenarioVerdict.profit).toFixed(2)}/bu
            </div>
            <p className="text-stone-600 mt-2 font-medium">
              {results.scenarioVerdict.isProfitable ? 'Net Profit' : 'Net Loss'} per bushel
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-6 bg-field-sage/10 rounded-2xl border border-field-sage/20">
          <div>
            <h4 className="font-bold text-ink mb-1">Check your Spoilage Risk</h4>
            <p className="text-sm text-stone-600">Ensure your crop is safe to hold for {monthsStored} months.</p>
          </div>
          <Link to="/spoilage-risk-calculator" className="shrink-0 inline-flex items-center justify-center px-6 py-3 bg-silo-steel text-white font-semibold rounded-lg hover:bg-ink transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-silo-steel">
            Check Risk <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

        <section className="bg-ink text-white mt-4 py-8 rounded-2xl px-6 sm:px-8 text-center border border-stone-800">
          <h2 className="font-display text-2xl font-bold mb-3">Prefer to work in Excel?</h2>
          <p className="text-stone-400 mb-6 max-w-xl mx-auto text-sm">Get the offline spreadsheet version of this calculator sent to your inbox. No spam, just the Excel file.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => { e.preventDefault(); alert("Thanks! Check your email for the Excel download."); }}>
            <input type="email" placeholder="Enter your email" required className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-grain-gold font-sans" />
            <button type="submit" className="px-6 py-3 bg-grain-gold text-ink font-bold rounded-lg hover:bg-yellow-500 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-offset-ink focus:ring-grain-gold uppercase tracking-wider text-sm">Get Excel</button>
          </form>
        </section>
      </div>
    </div>
  );

  const workedExample = (
    <>
      <p>Suppose you have <strong>10,000 bushels</strong> of corn and the current cash price is <strong>$4.50/bu</strong>. You plan to store it for <strong>6 months</strong>.</p>
      <ul>
        <li>Your bin depreciation and insurance (fixed costs) are $5,000/year.</li>
        <li>Your aeration and utility costs (operating costs) are $200/month.</li>
        <li>Your operating loan interest rate is 7.0%.</li>
      </ul>
      <p><strong>Step 1: Physical Storage Cost</strong><br/>
      Annual operating is $2,400. Total annual facility cost is $7,400. Divide by 10,000 bushels = $0.74/bu/year. Divide by 12 = <strong>$0.062/bu/month</strong>.</p>
      <p><strong>Step 2: Interest Cost (Opportunity Cost)</strong><br/>
      $4.50/bu × 7.0% = $0.315/bu/year. Divide by 12 = <strong>$0.026/bu/month</strong>.</p>
      <p><strong>Step 3: Total Cost & Breakeven</strong><br/>
      Total monthly cost is $0.088/bu. Over 6 months, that's $0.528/bu.<br/>
      Breakeven = $4.50 + $0.528 = <strong>$5.03/bu</strong>.</p>
    </>
  );

  const formulaSection = (
    <div>
      <p className="mb-4"><code>Breakeven price = Current price + (Total cost/bu/month × Months stored)</code></p>
      <p><code>Total cost/bu/month = Physical cost/mo + Interest cost/mo</code></p>
      <ul className="text-sm mt-4 text-stone-600 font-sans space-y-2">
        <li><strong>Physical cost/mo:</strong> (Annual fixed cost + (Monthly op cost × 12)) / Quantity / 12</li>
        <li><strong>Interest cost/mo:</strong> (Current price × Interest rate) / 12</li>
      </ul>
    </div>
  );

  const assumptions = (
    <>
      <ul>
        <li><strong>Bin capacity utilization:</strong> The formula distributes fixed costs across the actual <em>Quantity Stored</em> you enter, not the theoretical max capacity of the bin.</li>
        <li><strong>Interest on grain:</strong> We calculate interest based on the current cash price, representing the opportunity cost of not selling today and paying down an operating line or earning interest in the bank.</li>
        <li><strong>Shrink and quality loss:</strong> Not included in this basic breakeven. Check the Spoilage Risk tool to estimate quality hold duration.</li>
      </ul>
    </>
  );

  const faq = (
    <>
      <div className="bg-white p-6 rounded-xl border border-stone-200">
        <h3 className="font-display font-bold text-2xl text-ink mb-2">Should I store my corn or sell it now?</h3>
        <p className="text-stone-600">The decision comes down to your local basis, expected futures carry, and your exact carry costs. This calculator reveals your carry cost. If the market is not offering a premium higher than your breakeven, selling now is mathematically safer.</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-stone-200">
        <h3 className="font-display font-bold text-2xl text-ink mb-2">How much does it cost to store grain on farm per month?</h3>
        <p className="text-stone-600">While physical costs (fans, depreciation) often run 3-6 cents per bushel per month, the hidden cost is interest. At 7% interest on $5.00 corn, you are losing nearly 3 cents per bushel per month in opportunity cost alone. Total costs typically range from 6 to 12 cents per month.</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-stone-200">
        <h3 className="font-display font-bold text-2xl text-ink mb-2">Why is my interest cost so high?</h3>
        <p className="text-stone-600">Grain in a bin represents tied-up cash. If you sold it today, you could pay down a loan at 7-9% or put it in a high-yield account at 5%. Storing grain means you forfeit that return, which is a real financial cost that must be covered by a future price rally.</p>
      </div>
    </>
  );

  return (
    <CalculatorPageLayout 
      title="Store or Sell Calculator"
      description="Find out exactly how much the market needs to rise to cover your physical storage and capital opportunity costs."
      canonicalPath="/store-or-sell-calculator"
      heroTool={heroTool}
      workedExample={workedExample}
      formulaSection={formulaSection}
      assumptions={assumptions}
            faqsData={[
  { question: "Should I store my corn or sell it now?", answer: "The decision comes down to your local basis, expected futures carry, and your exact carry costs. This calculator reveals your carry cost. If the market is not offering a premium higher than your breakeven, selling now is mathematically safer." },
  { question: "How much does it cost to store grain on farm per month?", answer: "While physical costs (fans, depreciation) often run 3-6 cents per bushel per month, the hidden cost is interest. At 7% interest on $5.00 corn, you are losing nearly 3 cents per bushel per month in opportunity cost alone. Total costs typically range from 6 to 12 cents per month." },
  { question: "Why is my interest cost so high?", answer: "Grain in a bin represents tied-up cash. If you sold it today, you could pay down a loan at 7-9% or put it in a high-yield account at 5%. Storing grain means you forfeit that return, which is a real financial cost that must be covered by a future price rally." }
]}
      faq={faq}
    />
  );
}
