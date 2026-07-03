import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Calculator, DollarSign, Check, RefreshCcw, Printer, Share2, Info
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function StorageCostAnalysis() {
  const [capacity, setCapacity] = useState('10000');
  const [facilityCost, setFacilityCost] = useState('25000');
  const [storedQty, setStoredQty] = useState('8000');
  const [commodityValue, setCommodityValue] = useState('5.50');
  const [interestRate, setInterestRate] = useState('6.0');
  const [monthsStored, setMonthsStored] = useState('6');
  const [monthlyOpCost, setMonthlyOpCost] = useState('150');
  const [isCopied, setIsCopied] = useState(false);

  const results = useMemo(() => {
    const cap = parseFloat(capacity);
    const cost = parseFloat(facilityCost);
    const qty = parseFloat(storedQty);
    const val = parseFloat(commodityValue);
    const rate = parseFloat(interestRate);
    const months = parseFloat(monthsStored);
    const opCost = parseFloat(monthlyOpCost);

    let valid = !isNaN(cap) && !isNaN(cost) && !isNaN(qty) && !isNaN(val) && !isNaN(rate) && !isNaN(months) && !isNaN(opCost) && qty > 0;

    let fixedCostPerUnit = 0;
    let variableOpCost = 0;
    let opportunityCost = 0;
    let totalCost = 0;
    let costPerUnit = 0;

    if (valid) {
      // Annualized facility cost (simple straight line depreciation over 15 years as example proxy)
      const annualFixedCost = cost / 15;
      const periodFixedCost = annualFixedCost * (months / 12);
      
      variableOpCost = opCost * months;
      opportunityCost = (qty * val) * (rate / 100) * (months / 12);
      
      totalCost = periodFixedCost + variableOpCost + opportunityCost;
      costPerUnit = totalCost / qty;
      fixedCostPerUnit = periodFixedCost / qty;
    }

    return { 
      valid, 
      totalCost, 
      costPerUnit, 
      fixedCostPerUnit, 
      variableOpCost, 
      opportunityCost 
    };
  }, [capacity, facilityCost, storedQty, commodityValue, interestRate, monthsStored, monthlyOpCost]);

  const handlePrint = () => window.print();
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };
  const handleReset = () => {
    setCapacity('10000');
    setFacilityCost('25000');
    setStoredQty('8000');
    setCommodityValue('5.50');
    setInterestRate('6.0');
    setMonthsStored('6');
    setMonthlyOpCost('150');
  };

  return (
    <main className="w-full flex-1 overflow-y-auto bg-[#F9F9F8] text-stone-900 font-sans focus:outline-none" tabIndex={-1}>
      <Helmet>
        <title>Storage Cost Analysis Matrix | Storage Hub</title>
        <meta name="description" content="Calculate carry overhead, depreciation, and opportunity costs of agricultural holding." />
      </Helmet>
      
      {/* Hero */}
      <section className="bg-white border-b border-stone-200 pt-10 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold text-[#2d5d4b] uppercase tracking-widest mb-2">Financial Planning</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-4">Storage Cost Analysis Matrix</h1>
            <p className="text-lg text-stone-600 leading-relaxed mb-4">Calculate carry overhead, depreciation proxies, and opportunity costs of holding agricultural commodities.</p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-[#2d5d4b]" />
                  Cost Parameters
                </h2>
                <button onClick={handleReset} className="text-sm text-stone-500 hover:text-[#2d5d4b] flex items-center gap-1 transition-colors focus:outline-none focus:ring-2 focus:ring-[#2d5d4b] rounded px-1">
                  <RefreshCcw className="w-4 h-4" /> Reset
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-stone-800 mb-2">Total Facility Investment ($)</label>
                  <input type="number" value={facilityCost} onChange={(e) => setFacilityCost(e.target.value)} className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#2d5d4b] outline-none text-base" min="0" step="1000" />
                  <p className="text-xs text-stone-500 mt-1">Total cost to build/buy the bin.</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-800 mb-2">Total Capacity (Units)</label>
                  <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#2d5d4b] outline-none text-base" min="0" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-800 mb-2">Stored Quantity (Units)</label>
                  <input type="number" value={storedQty} onChange={(e) => setStoredQty(e.target.value)} className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#2d5d4b] outline-none text-base" min="0" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-800 mb-2">Current Value per Unit ($)</label>
                  <input type="number" value={commodityValue} onChange={(e) => setCommodityValue(e.target.value)} className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#2d5d4b] outline-none text-base" min="0" step="0.01" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-800 mb-2">Interest/Capital Rate (%)</label>
                  <input type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#2d5d4b] outline-none text-base" min="0" step="0.1" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-800 mb-2">Monthly Operating Cost ($)</label>
                  <input type="number" value={monthlyOpCost} onChange={(e) => setMonthlyOpCost(e.target.value)} className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#2d5d4b] outline-none text-base" min="0" />
                  <p className="text-xs text-stone-500 mt-1">Electricity, insurance, repairs.</p>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-stone-800 mb-2">Months Stored</label>
                  <input type="number" value={monthsStored} onChange={(e) => setMonthsStored(e.target.value)} className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#2d5d4b] outline-none text-base" min="0" max="24" />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className={`bg-stone-900 rounded-xl shadow-md p-6 sm:p-8 text-white transition-opacity duration-300 ${results.valid ? 'opacity-100' : 'opacity-90'}`}>
              <h3 className="text-stone-400 font-bold uppercase tracking-widest text-sm mb-4 border-b border-stone-700 pb-2">Cost Breakdown</h3>
              
              <div className="mb-6">
                <span className="block text-stone-400 text-sm mb-1">Total Carry Cost</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                    ${Math.round(results.totalCost).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-stone-700">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-stone-400">Fixed Cost Proxy</span>
                  <span className="font-semibold">${Math.round(results.fixedCostPerUnit * parseFloat(storedQty) || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-stone-400">Variable Operating Cost</span>
                  <span className="font-semibold">${Math.round(results.variableOpCost).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-stone-400">Opportunity Cost (Interest)</span>
                  <span className="font-semibold">${Math.round(results.opportunityCost).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-stone-700">
                  <span className="text-stone-300 font-bold">Cost Per Unit</span>
                  <span className="text-xl font-bold text-white">${results.costPerUnit.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={handlePrint} className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-stone-200 text-stone-800 font-bold rounded-lg hover:border-stone-300 hover:bg-stone-50 transition-colors focus:outline-none focus:ring-2 focus:ring-stone-500">
                <Printer className="w-5 h-5" /> Print
              </button>
              <button onClick={handleShare} className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-stone-200 text-stone-800 font-bold rounded-lg hover:border-stone-300 hover:bg-stone-50 transition-colors focus:outline-none focus:ring-2 focus:ring-stone-500">
                {isCopied ? <><Check className="w-5 h-5 text-green-600" /> Copied!</> : <><Share2 className="w-5 h-5" /> Share</>}
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Below the Fold Details */}
      <section className="bg-white border-t border-stone-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-stone-900 mb-6">Assumptions & Methodology</h3>
              <div className="prose prose-stone text-stone-600 text-sm">
                <p><strong>Fixed Cost Proxy:</strong> Assumes a 15-year straight-line depreciation of the total facility investment without salvage value.</p>
                <p><strong>Opportunity Cost:</strong> Represents the interest that could have been earned if the commodity was sold and the proceeds invested (or debt paid down), scaled by the storage duration.</p>
                <p><strong>Variables:</strong> Assumes no physical shrink or quality loss during the storage period, which would add additional hidden costs.</p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-stone-900 mb-6">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-stone-900 mb-1">What is Carry Cost?</h4>
                  <p className="text-sm text-stone-600 leading-relaxed">Carry cost is the total expense associated with holding inventory over a period of time, including storage fees, insurance, interest, and physical loss.</p>
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 mb-1">Why include Opportunity Cost?</h4>
                  <p className="text-sm text-stone-600 leading-relaxed">If you sell a commodity at harvest, you gain cash immediately to pay down loans or invest. Holding the commodity means you forgo that financial benefit, which must be factored into the decision to store.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
