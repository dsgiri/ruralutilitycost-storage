import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  ThermometerSun, Calculator, AlertTriangle, Check, RefreshCcw, Printer, Share2, Droplets, Info
} from 'lucide-react';
import { Link } from 'react-router-dom';

const COMMODITIES = [
  { id: 'corn', label: 'Shelled Corn' },
  { id: 'wheat', label: 'Wheat' },
  { id: 'soybeans', label: 'Soybeans' }
];

export function SpoilageRiskAssessor() {
  const [commodity, setCommodity] = useState('corn');
  const [temperature, setTemperature] = useState('65');
  const [moisture, setMoisture] = useState('16');
  const [isCopied, setIsCopied] = useState(false);

  const results = useMemo(() => {
    const temp = parseFloat(temperature);
    const moist = parseFloat(moisture);
    let valid = !isNaN(temp) && !isNaN(moist);

    let riskScore = 0;
    if (valid) {
      // Basic screening formula for risk scoring
      const tempFactor = Math.max(0, (temp - 40) / 10);
      const moistFactor = Math.max(0, (moist - 13));
      riskScore = tempFactor * moistFactor;
    }

    let riskLevel = 'Low Risk';
    let message = 'Conditions appear safe for standard storage durations. Continue routine monitoring.';
    let colorClass = 'text-[#2d5d4b]';
    let bgClass = 'bg-stone-100 border-stone-200';
    let icon = <Check className="w-8 h-8 text-[#2d5d4b] mb-4" />;

    if (riskScore > 25) {
      riskLevel = 'High Risk';
      message = 'High risk of rapid spoilage and biological activity. Immediate aeration or drying is strongly recommended.';
      colorClass = 'text-rose-700';
      bgClass = 'bg-rose-50 border-rose-200';
      icon = <AlertTriangle className="w-8 h-8 text-rose-600 mb-4" />;
    } else if (riskScore > 10) {
      riskLevel = 'Moderate Risk';
      message = 'Moderate risk of quality loss. Monitor bins closely and consider aeration to cool the grain.';
      colorClass = 'text-amber-700';
      bgClass = 'bg-amber-50 border-amber-200';
      icon = <AlertTriangle className="w-8 h-8 text-amber-600 mb-4" />;
    }

    return { valid, riskLevel, message, colorClass, bgClass, icon, riskScore };
  }, [commodity, temperature, moisture]);

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
    setCommodity('corn');
    setTemperature('65');
    setMoisture('16');
  };

  return (
    <main className="w-full flex-1 overflow-y-auto bg-[#F9F9F8] text-stone-900 font-sans focus:outline-none" tabIndex={-1}>
      <Helmet>
        <title>Spoilage Risk Assessor | Storage Hub</title>
        <meta name="description" content="Evaluate grain and feed spoilage risk factors based on moisture and temperature." />
      </Helmet>
      
      {/* Hero */}
      <section className="bg-white border-b border-stone-200 pt-10 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold text-[#2d5d4b] uppercase tracking-widest mb-2">Quality & Risk</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-4">Spoilage Risk Assessor</h1>
            <p className="text-lg text-stone-600 leading-relaxed mb-4">Track moisture, temperature, and basic parameters to evaluate spoilage risk percentiles for bulk stored grain.</p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                  <ThermometerSun className="w-5 h-5 text-[#2d5d4b]" />
                  Storage Parameters
                </h2>
                <button onClick={handleReset} className="text-sm text-stone-500 hover:text-[#2d5d4b] flex items-center gap-1 transition-colors focus:outline-none focus:ring-2 focus:ring-[#2d5d4b] rounded px-1">
                  <RefreshCcw className="w-4 h-4" /> Reset
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-stone-800 mb-2">Commodity Type</label>
                  <select 
                    value={commodity} 
                    onChange={(e) => setCommodity(e.target.value)}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#2d5d4b] outline-none text-base"
                  >
                    {COMMODITIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-stone-800 mb-2">Average Grain Temperature (&deg;F)</label>
                  <input 
                    type="number" value={temperature} onChange={(e) => setTemperature(e.target.value)}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#2d5d4b] outline-none text-base" min="0" step="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-stone-800 mb-2">Average Moisture Content (%)</label>
                  <input 
                    type="number" value={moisture} onChange={(e) => setMoisture(e.target.value)}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#2d5d4b] outline-none text-base" min="0" step="0.1"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className={`p-8 rounded-xl border-2 ${results.valid ? results.bgClass : 'bg-stone-50 border-stone-200'} transition-colors duration-300`}>
              <h3 className="text-stone-500 font-bold uppercase tracking-widest text-sm mb-6 pb-2 border-b border-stone-200/50">Risk Assessment</h3>
              
              {results.valid ? (
                <div className="flex flex-col items-center text-center py-6">
                  {results.icon}
                  <div className={`text-4xl font-extrabold tracking-tight mb-4 ${results.colorClass}`}>
                    {results.riskLevel}
                  </div>
                  <p className="text-stone-700 font-medium max-w-sm leading-relaxed">
                    {results.message}
                  </p>
                </div>
              ) : (
                <div className="py-12 text-center text-stone-500 italic">
                  Please enter valid temperature and moisture values to view the risk assessment.
                </div>
              )}
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
                <p>This risk assessor uses a simplified scoring model based on the intersection of temperature and moisture. Real-world allowable storage time (AST) drops logarithmically as temperature and moisture increase.</p>
                <p><strong>Disclaimer:</strong> This is a decision-support screening tool. Fungal growth, mycotoxin development, and insect activity can occur in localized pockets even if averages appear safe. Always rely on routine physical inspection and proper aeration management.</p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-stone-900 mb-6">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-stone-900 mb-1">What is considered safe moisture?</h4>
                  <p className="text-sm text-stone-600 leading-relaxed">For long-term storage (over 6 months) of corn, 13% to 14% is generally considered safe. For soybeans, 11% to 12% is preferred. Short-term storage can tolerate higher moisture levels if aerated.</p>
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 mb-1">Why does temperature matter so much?</h4>
                  <p className="text-sm text-stone-600 leading-relaxed">Fungi and insects require heat to reproduce. Cooling grain below 50&deg;F dramatically reduces biological activity and extends the safe storage life of the crop.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
