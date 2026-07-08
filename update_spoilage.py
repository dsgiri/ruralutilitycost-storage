import sys

code = """import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ThermometerSun, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { CalculatorPageLayout } from '../../components/layout/CalculatorPageLayout';
import { GrainFillGauge } from '../../components/ui/GrainFillGauge';

export function SpoilageRiskAssessor() {
  const [moisture, setMoisture] = useState('16.0');
  const [temperature, setTemperature] = useState('65');
  const [months, setMonths] = useState(6);
  const [hasAeration, setHasAeration] = useState(true);

  const results = useMemo(() => {
    const m = parseFloat(moisture);
    const t = parseFloat(temperature);
    
    if (isNaN(m) || isNaN(t)) return { valid: false };

    // A very simplified ASABE-style storage time estimate for corn
    // Base safe storage days at 15% and 50F is roughly 300 days
    // Every 1% moisture above 14% roughly cuts storage time in half
    // Every 10F above 50F roughly cuts storage time in half
    
    let baseDays = 300;
    
    // Moisture effect
    const moistureDiff = m - 14.0;
    if (moistureDiff > 0) {
        baseDays = baseDays / Math.pow(2, moistureDiff);
    }
    
    // Temp effect
    const tempDiff = t - 50.0;
    if (tempDiff > 0) {
        baseDays = baseDays / Math.pow(2, tempDiff / 10);
    }

    // Aeration benefit (simplified)
    if (hasAeration) {
        baseDays = baseDays * 1.5;
    }

    const safeMonths = baseDays / 30;
    
    let riskLevel = 'Low';
    let message = 'Safe for planned duration';
    let action = 'Monitor weekly for hot spots or crusting.';
    let fillPercentage = 33;
    let fillColor = 'bg-field-sage';

    if (months > safeMonths * 1.2) {
      riskLevel = 'High';
      message = 'High probability of spoilage';
      action = 'Core the bin immediately. Consider aeration or selling early.';
      fillPercentage = 100;
      fillColor = 'bg-harvest-rust';
    } else if (months > safeMonths * 0.8) {
      riskLevel = 'Medium';
      message = 'Approaching safe storage limit';
      action = 'Watch for condensation. Run fans if ambient temp drops.';
      fillPercentage = 66;
      fillColor = 'bg-grain-gold';
    }

    return { 
      valid: true, 
      riskLevel, 
      message, 
      action,
      fillPercentage,
      fillColor,
      safeMonths: Math.round(safeMonths * 10) / 10
    };
  }, [temperature, moisture, months, hasAeration]);

  const heroTool = (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-8">
      {/* Inputs Column */}
      <div className="lg:col-span-6 flex flex-col gap-5">
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-stone-200">
          <div className="flex items-center gap-3 mb-6">
            <ThermometerSun className="w-6 h-6 text-silo-steel" />
            <h2 className="font-display text-2xl font-bold text-ink">Storage Parameters</h2>
          </div>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-stone-800 mb-1">Average Moisture Content (%)</label>
              <input 
                type="number" value={moisture} onChange={(e) => setMoisture(e.target.value)}
                className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-silo-steel outline-none text-base font-medium font-mono" min="0" step="0.1"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-stone-800 mb-1">Average Grain Temperature (&deg;F)</label>
              <input 
                type="number" value={temperature} onChange={(e) => setTemperature(e.target.value)}
                className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-silo-steel outline-none text-base font-medium font-mono" min="0" step="1"
              />
            </div>
            
            <div>
              <label className="flex justify-between text-sm font-semibold text-stone-800 mb-3">
                <span>Months Planned in Storage</span>
                <span className="bg-stone-100 px-2 py-0.5 rounded text-stone-700">{months} months</span>
              </label>
              <input type="range" min="1" max="12" step="1" value={months} onChange={(e) => setMonths(parseInt(e.target.value))} className="w-full accent-silo-steel" />
            </div>
            
            <div className="pt-2 border-t border-stone-100">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-12 h-6 flex items-center bg-stone-300 rounded-full p-1 transition-colors ${hasAeration ? 'bg-silo-steel' : 'bg-stone-300'}`}>
                  <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform ${hasAeration ? 'translate-x-6' : ''}`}></div>
                </div>
                <input type="checkbox" className="hidden" checked={hasAeration} onChange={(e) => setHasAeration(e.target.checked)} />
                <span className="text-sm font-semibold text-stone-800 group-hover:text-black">Aeration / Monitoring in place?</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Results Column */}
      <div className="lg:col-span-6 flex flex-col gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-8 sm:p-10 border-2 border-stone-200 relative overflow-hidden flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="relative z-10 flex-1">
            <h3 className="text-stone-500 font-display font-bold uppercase tracking-widest text-sm mb-4">Risk Assessment</h3>
            
            {results.valid ? (
              <div>
                <div className="inline-block px-3 py-1 bg-stone-100 rounded text-sm font-bold uppercase tracking-widest mb-2 text-stone-700 border border-stone-200">
                  {results.riskLevel} Risk
                </div>
                <h4 className="font-display text-3xl font-bold text-ink mb-2 leading-tight">
                  {results.message}
                </h4>
                <p className="text-stone-600 mb-6 text-sm">Estimated safe storage time: <strong>{results.safeMonths} months</strong></p>
                
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
                  <p className="text-silo-steel font-bold text-xs uppercase tracking-wider mb-1">Recommended Action</p>
                  <p className="text-ink font-semibold">{results.action}</p>
                </div>
              </div>
            ) : (
              <p className="text-stone-500 italic">Please enter valid temperature and moisture values.</p>
            )}
          </div>
          
          <div className="shrink-0 flex flex-col items-center">
             <GrainFillGauge 
                fillPercentage={results.fillPercentage || 0} 
                fillColor={results.fillColor} 
                label={results.riskLevel}
             />
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-6 bg-silo-steel/5 rounded-2xl border border-silo-steel/20">
          <div>
            <h4 className="font-bold text-ink mb-1">Weighing the costs?</h4>
            <p className="text-sm text-stone-600">See if storing is financially worth the risk.</p>
          </div>
          <Link to="/store-or-sell-calculator" className="shrink-0 inline-flex items-center justify-center px-6 py-3 bg-silo-steel text-white font-semibold rounded-lg hover:bg-ink transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-silo-steel">
            Store or Sell <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-6 bg-white rounded-2xl border border-stone-200 shadow-sm mt-4">
          <div>
            <h4 className="font-bold text-ink mb-1">Need to verify bin capacity?</h4>
            <p className="text-sm text-stone-600">Calculate exactly how many bushels you have.</p>
          </div>
          <Link to="/grain-bin-estimator" className="shrink-0 inline-flex items-center justify-center px-6 py-3 bg-white border border-stone-200 text-ink font-semibold rounded-lg hover:bg-stone-50 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-stone-500">
            Grain Bin Estimator <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );

  const workedExample = (
    <>
      <p>Suppose you harvest corn at <strong>18% moisture</strong> and the grain enters the bin at <strong>60&deg;F</strong>. You plan to store it for <strong>6 months</strong> without aeration.</p>
      <ul>
        <li>Base safe storage time for 15% moisture at 50&deg;F is roughly 300 days.</li>
        <li>Every 1% above 14% moisture roughly cuts safe storage time in half. At 18%, safe storage time is divided by 16.</li>
        <li>Every 10&deg;F above 50&deg;F roughly cuts time in half. At 60&deg;F, safe storage time is halved again.</li>
      </ul>
      <p><strong>Result:</strong> Your estimated safe storage time is under 1 month. Leaving this crop for 6 months without aeration or drying will almost certainly result in <strong>high spoilage risk</strong> and crusting.</p>
    </>
  );

  const formulaSection = (
    <div>
      <p className="mb-4"><code>Safe Days ≈ Base Days / (2^(Moisture - 14)) / (2^((Temp - 50)/10))</code></p>
      <ul className="text-sm mt-4 text-stone-600 font-sans space-y-2">
        <li><strong>Base Days:</strong> Approximated at 300 days for 14% moisture corn at 50&deg;F.</li>
        <li><strong>Moisture factor:</strong> Grain life halves for every percentage point of moisture above safe baseline.</li>
        <li><strong>Temperature factor:</strong> Grain life halves for every 10 degrees (F) increase in temperature.</li>
      </ul>
    </div>
  );

  const assumptions = (
    <>
      <ul>
        <li><strong>Grain Type:</strong> This calculation uses a baseline roughly calibrated for yellow dent corn. Soybeans and wheat have different equilibrium moisture curves.</li>
        <li><strong>Aeration:</strong> Checking "Aeration in place" applies a flat 1.5x multiplier to safe storage time, assuming you use fans to drop the core temperature. Actual results depend heavily on your fan sizing (CFM/bu) and ambient weather.</li>
        <li><strong>Uniformity:</strong> The calculator assumes uniform moisture and temperature. In reality, a single "hot spot" or concentration of fines can spoil a bin even if the average moisture is safe.</li>
      </ul>
    </>
  );

  const faq = (
    <>
      <div className="bg-white p-6 rounded-xl border border-stone-200">
        <h3 className="font-display font-bold text-2xl text-ink mb-2">How long can grain be stored before it spoils?</h3>
        <p className="text-stone-600">It depends entirely on moisture and temperature. Corn at 15% moisture and 40&deg;F can easily store for over a year. That same corn at 20% moisture and 70&deg;F can begin molding in less than two weeks.</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-stone-200">
        <h3 className="font-display font-bold text-2xl text-ink mb-2">What happens if grain gets too warm?</h3>
        <p className="text-stone-600">Warm grain increases the respiration rate of the seed and exponentially increases mold and insect activity. Moisture migration will also occur as warm air rises, condensing on the cold roof and raining back down, causing crusting at the top of the bin.</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-stone-200">
        <h3 className="font-display font-bold text-2xl text-ink mb-2">How does aeration help?</h3>
        <p className="text-stone-600">Aeration serves primarily to cool the grain mass and equalize temperatures, stopping moisture migration. Unless you have high-capacity fans specifically sized for natural air drying, aeration is for temperature control, not moisture removal.</p>
      </div>
    </>
  );

  return (
    <CalculatorPageLayout 
      title="Spoilage Risk Assessor"
      description="Evaluate biological spoilage risk percentiles based on moisture, temperature, and storage duration."
      canonicalPath="/spoilage-risk-calculator"
      heroTool={heroTool}
      workedExample={workedExample}
      formulaSection={formulaSection}
      assumptions={assumptions}
      faq={faq}
    />
  );
}
"""

with open('src/pages/tools/SpoilageRiskAssessor.tsx', 'w') as f:
    f.write(code)
