import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Calculator, 
  Droplets,
  AlertTriangle,
  Info,
  Calendar,
  ChevronDown,
  Printer,
  Share2,
  Check,
  RefreshCcw,
  ShieldAlert
} from 'lucide-react';
import { Link } from 'react-router-dom';

type TankShape = 'vertical_cylinder' | 'horizontal_cylinder' | 'rectangular';
type ColiformStatus = 'pending' | 'not_detected' | 'detected';
type SampleInterval = 'none' | 'monthly' | 'quarterly' | 'semiannual' | 'annual';

const TANK_SHAPES = [
  { id: 'vertical_cylinder', label: 'Vertical Cylinder' },
  { id: 'horizontal_cylinder', label: 'Horizontal Cylinder' },
  { id: 'rectangular', label: 'Rectangular Tank' }
];

const COLIFORM_OPTIONS = [
  { id: 'pending', label: 'Pending / Not entered' },
  { id: 'not_detected', label: 'Not Detected' },
  { id: 'detected', label: 'Detected' }
];

const INTERVAL_OPTIONS = [
  { id: 'none', label: 'Not scheduled' },
  { id: 'monthly', label: 'Monthly' },
  { id: 'quarterly', label: 'Quarterly' },
  { id: 'semiannual', label: 'Semiannual' },
  { id: 'annual', label: 'Annual' }
];

const CUFT_TO_GALLONS = 7.48052;
const ARSENIC_THRESHOLD = 0.010; // mg/L
const NITRATE_THRESHOLD = 10.0; // mg/L

export function TankVolumeAuditor() {
  // Tank Geometry State
  const [shape, setShape] = useState<TankShape>('vertical_cylinder');
  const [diameter, setDiameter] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [fillHeight, setFillHeight] = useState('');
  
  // Water Quality State
  const [arsenic, setArsenic] = useState('');
  const [nitrate, setNitrate] = useState('');
  const [coliform, setColiform] = useState<ColiformStatus>('pending');
  const [sampleDate, setSampleDate] = useState('');
  const [sampleInterval, setSampleInterval] = useState<SampleInterval>('none');

  const [isCopied, setIsCopied] = useState(false);

  // Math for calculations
  const calcResults = useMemo(() => {
    let totalCuFt = 0;
    let fillCuFt = 0;
    let hasValidTank = false;

    const d = parseFloat(diameter);
    const l = parseFloat(length);
    const w = parseFloat(width);
    const h = parseFloat(height);
    let fh = parseFloat(fillHeight);

    if (isNaN(fh) || fh < 0) fh = 0;

    if (shape === 'vertical_cylinder') {
      if (!isNaN(d) && !isNaN(h) && d > 0 && h > 0) {
        hasValidTank = true;
        const radius = d / 2;
        totalCuFt = Math.PI * Math.pow(radius, 2) * h;
        if (fh > 0) {
          fillCuFt = Math.PI * Math.pow(radius, 2) * Math.min(fh, h);
        }
      }
    } else if (shape === 'horizontal_cylinder') {
      if (!isNaN(d) && !isNaN(l) && d > 0 && l > 0) {
        hasValidTank = true;
        const radius = d / 2;
        totalCuFt = Math.PI * Math.pow(radius, 2) * l;
        
        if (fh > 0) {
          const effectiveFh = Math.min(fh, d);
          const r = radius;
          // Area of circular segment
          const theta = 2 * Math.acos((r - effectiveFh) / r);
          const area = 0.5 * Math.pow(r, 2) * (theta - Math.sin(theta));
          fillCuFt = area * l;
        }
      }
    } else if (shape === 'rectangular') {
      if (!isNaN(l) && !isNaN(w) && !isNaN(h) && l > 0 && w > 0 && h > 0) {
        hasValidTank = true;
        totalCuFt = l * w * h;
        if (fh > 0) {
          fillCuFt = l * w * Math.min(fh, h);
        }
      }
    }

    return {
      hasValidTank,
      totalCuFt,
      totalGallons: totalCuFt * CUFT_TO_GALLONS,
      fillCuFt,
      fillGallons: fillCuFt * CUFT_TO_GALLONS,
      hasFill: hasValidTank && !isNaN(parseFloat(fillHeight)) && parseFloat(fillHeight) > 0
    };
  }, [shape, diameter, length, width, height, fillHeight]);

  // Screening Results
  const screeningResults = useMemo(() => {
    let hasEntries = false;
    
    // Arsenic
    let arsenicStatus = 'not_entered';
    const asVal = parseFloat(arsenic);
    if (!isNaN(asVal) && asVal >= 0) {
      hasEntries = true;
      if (asVal > ARSENIC_THRESHOLD) arsenicStatus = 'above';
      else if (asVal >= ARSENIC_THRESHOLD * 0.9) arsenicStatus = 'near';
      else arsenicStatus = 'within';
    }

    // Nitrate
    let nitrateStatus = 'not_entered';
    const no3Val = parseFloat(nitrate);
    if (!isNaN(no3Val) && no3Val >= 0) {
      hasEntries = true;
      if (no3Val > NITRATE_THRESHOLD) nitrateStatus = 'above';
      else if (no3Val >= NITRATE_THRESHOLD * 0.9) nitrateStatus = 'near';
      else nitrateStatus = 'within';
    }

    // Coliform
    if (coliform !== 'pending') hasEntries = true;

    // Date
    let nextDateStr = '';
    if (sampleDate && sampleInterval !== 'none') {
      const d = new Date(sampleDate);
      if (!isNaN(d.getTime())) {
        if (sampleInterval === 'monthly') d.setMonth(d.getMonth() + 1);
        else if (sampleInterval === 'quarterly') d.setMonth(d.getMonth() + 3);
        else if (sampleInterval === 'semiannual') d.setMonth(d.getMonth() + 6);
        else if (sampleInterval === 'annual') d.setFullYear(d.getFullYear() + 1);
        nextDateStr = d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
      }
    }

    return {
      hasEntries,
      arsenicStatus,
      nitrateStatus,
      coliformStatus: coliform,
      nextDateStr
    };
  }, [arsenic, nitrate, coliform, sampleDate, sampleInterval]);

  const handlePrint = () => window.print();
  
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link', err);
    }
  };

  const handleReset = () => {
    setShape('vertical_cylinder');
    setDiameter('');
    setLength('');
    setWidth('');
    setHeight('');
    setFillHeight('');
    setArsenic('');
    setNitrate('');
    setColiform('pending');
    setSampleDate('');
    setSampleInterval('none');
  };

  const renderStatusBadge = (status: string, label: string) => {
    switch(status) {
      case 'within':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-stone-100 text-[#2d5d4b] border border-stone-200"><Check className="w-3.5 h-3.5" /> Below reference threshold &mdash; review recommended</span>;
      case 'near':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200"><AlertTriangle className="w-3.5 h-3.5" /> At or near reference threshold &mdash; confirm with lab</span>;
      case 'above':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-rose-50 text-rose-800 border border-rose-200"><ShieldAlert className="w-3.5 h-3.5" /> Above reference threshold &mdash; confirm with certified testing and regulator guidance</span>;
      case 'detected':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-rose-50 text-rose-800 border border-rose-200"><ShieldAlert className="w-3.5 h-3.5" /> Detected &mdash; confirm with certified testing and regulator guidance</span>;
      case 'not_detected':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-stone-100 text-[#2d5d4b] border border-stone-200"><Check className="w-3.5 h-3.5" /> Not detected &mdash; review recommended</span>;
      default:
        return <span className="inline-flex px-2.5 py-1 rounded-md text-xs font-medium bg-stone-100 text-stone-500 border border-stone-200">Not entered</span>;
    }
  };

  return (
    <main className="w-full flex-1 overflow-y-auto bg-[#F9F9F8] text-stone-900 font-sans focus:outline-none" tabIndex={-1}>
      <Helmet>
        <title>Tank Volume & EPA Auditor | Storage Hub</title>
        <meta name="description" content="Estimate tank capacity and screen water quality values against reference thresholds for agricultural storage." />
      </Helmet>

      {/* Hero */}
      <section className="bg-white border-b border-stone-200 pt-10 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold text-[#2d5d4b] uppercase tracking-widest mb-2">Tank Capacity & Water Screening Tool</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-4">
              Tank Volume & EPA Auditor
            </h1>
            <p className="text-lg text-stone-600 leading-relaxed mb-4">
              Estimate total tank volume, current fill levels, and screen basic water-quality test values against reference thresholds.
            </p>
            <div className="bg-stone-100 border-l-4 border-stone-400 p-4 text-sm text-stone-700">
              <strong>Note:</strong> This is a screening utility, not an official compliance determination system. Official determinations must rely on certified laboratory analysis and local regulatory guidance.
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Modules */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Inputs */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            
            {/* Volume Estimator */}
            <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-[#2d5d4b]" />
                  Tank Capacity Estimator
                </h2>
                <button 
                  onClick={handleReset}
                  className="text-sm text-stone-500 hover:text-[#2d5d4b] flex items-center gap-1 transition-colors focus:outline-none focus:ring-2 focus:ring-[#2d5d4b] rounded px-1"
                >
                  <RefreshCcw className="w-4 h-4" /> Reset All
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label htmlFor="shape" className="block text-sm font-semibold text-stone-800 mb-2">Tank Shape</label>
                  <div className="relative">
                    <select 
                      id="shape"
                      value={shape}
                      onChange={(e) => setShape(e.target.value as TankShape)}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#2d5d4b] focus:border-[#2d5d4b] outline-none text-base appearance-none"
                    >
                      {TANK_SHAPES.map(s => (
                        <option key={s.id} value={s.id}>{s.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-500 pointer-events-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(shape === 'vertical_cylinder' || shape === 'horizontal_cylinder') && (
                    <div>
                      <label htmlFor="diameter" className="block text-sm font-semibold text-stone-800 mb-2">Diameter (ft)</label>
                      <input 
                        type="number" id="diameter" value={diameter} onChange={(e) => setDiameter(e.target.value)}
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#2d5d4b] outline-none text-base" min="0" step="0.1" placeholder="e.g. 10"
                      />
                    </div>
                  )}

                  {(shape === 'horizontal_cylinder' || shape === 'rectangular') && (
                    <div>
                      <label htmlFor="length" className="block text-sm font-semibold text-stone-800 mb-2">Length (ft)</label>
                      <input 
                        type="number" id="length" value={length} onChange={(e) => setLength(e.target.value)}
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#2d5d4b] outline-none text-base" min="0" step="0.1" placeholder="e.g. 15"
                      />
                    </div>
                  )}

                  {(shape === 'rectangular') && (
                    <div>
                      <label htmlFor="width" className="block text-sm font-semibold text-stone-800 mb-2">Width (ft)</label>
                      <input 
                        type="number" id="width" value={width} onChange={(e) => setWidth(e.target.value)}
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#2d5d4b] outline-none text-base" min="0" step="0.1" placeholder="e.g. 8"
                      />
                    </div>
                  )}

                  {(shape === 'vertical_cylinder' || shape === 'rectangular') && (
                    <div>
                      <label htmlFor="height" className="block text-sm font-semibold text-stone-800 mb-2">Total Height (ft)</label>
                      <input 
                        type="number" id="height" value={height} onChange={(e) => setHeight(e.target.value)}
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#2d5d4b] outline-none text-base" min="0" step="0.1" placeholder="e.g. 12"
                      />
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-stone-200">
                  <label htmlFor="fillHeight" className="block text-sm font-semibold text-stone-800 mb-2">Current Liquid Fill Height (ft) <span className="font-normal text-stone-500">— Optional</span></label>
                  <input 
                    type="number" id="fillHeight" value={fillHeight} onChange={(e) => setFillHeight(e.target.value)}
                    className="w-full sm:w-1/2 px-4 py-3 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#2d5d4b] outline-none text-base" min="0" step="0.1" placeholder="Depth of liquid"
                  />
                  <p className="text-xs text-stone-500 mt-2">Enter liquid depth to estimate current filled volume.</p>
                </div>
              </div>
            </div>

            {/* Water Screening */}
            <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
                <Droplets className="w-5 h-5 text-[#2d5d4b]" />
                Water Quality Screening
              </h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="arsenic" className="block text-sm font-semibold text-stone-800 mb-2">Arsenic (mg/L)</label>
                    <div className="relative">
                      <input 
                        type="number" id="arsenic" value={arsenic} onChange={(e) => setArsenic(e.target.value)}
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#2d5d4b] outline-none text-base" min="0" step="0.001" placeholder="e.g. 0.005"
                      />
                    </div>
                    <p className="text-xs text-stone-500 mt-1">Screening reference: 0.010 mg/L</p>
                  </div>
                  <div>
                    <label htmlFor="nitrate" className="block text-sm font-semibold text-stone-800 mb-2">Nitrate (mg/L)</label>
                    <div className="relative">
                      <input 
                        type="number" id="nitrate" value={nitrate} onChange={(e) => setNitrate(e.target.value)}
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#2d5d4b] outline-none text-base" min="0" step="0.1" placeholder="e.g. 5.0"
                      />
                    </div>
                    <p className="text-xs text-stone-500 mt-1">Screening reference: 10.0 mg/L</p>
                  </div>
                </div>

                <div>
                  <label htmlFor="coliform" className="block text-sm font-semibold text-stone-800 mb-2">Total Coliform Status</label>
                  <div className="relative">
                    <select 
                      id="coliform" value={coliform} onChange={(e) => setColiform(e.target.value as ColiformStatus)}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#2d5d4b] outline-none text-base appearance-none"
                    >
                      {COLIFORM_OPTIONS.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-500 pointer-events-none" />
                  </div>
                </div>

                <fieldset className="pt-6 border-t border-stone-200">
                  <legend className="text-sm font-semibold text-stone-800 mb-4 flex items-center gap-2"><Calendar className="w-4 h-4 text-stone-500" /> Sampling Log Reminder</legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="sampleDate" className="block text-xs font-semibold text-stone-600 mb-1">Recent Sample Date</label>
                      <input 
                        type="date" id="sampleDate" value={sampleDate} onChange={(e) => setSampleDate(e.target.value)}
                        className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#2d5d4b] outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="sampleInterval" className="block text-xs font-semibold text-stone-600 mb-1">Sampling Interval</label>
                      <div className="relative">
                        <select 
                          id="sampleInterval" value={sampleInterval} onChange={(e) => setSampleInterval(e.target.value as SampleInterval)}
                          className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#2d5d4b] outline-none text-sm appearance-none"
                        >
                          {INTERVAL_OPTIONS.map(i => <option key={i.id} value={i.id}>{i.label}</option>)}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>

          </div>

          {/* Results Summary */}
          <div className="lg:col-span-5 flex flex-col gap-6" aria-live="polite">
            <div className={`bg-stone-900 rounded-xl shadow-md p-6 sm:p-8 text-white relative overflow-hidden transition-opacity duration-300 ${calcResults.hasValidTank ? 'opacity-100' : 'opacity-90'}`}>
              <h3 className="text-stone-400 font-bold uppercase tracking-widest text-sm mb-4 border-b border-stone-700 pb-2">Volume Estimate</h3>
              
              <div className="mb-6">
                <span className="block text-stone-400 text-sm mb-1">Total Tank Capacity</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                    {Math.round(calcResults.totalGallons).toLocaleString()}
                  </span>
                  <span className="text-lg text-stone-400 font-medium">gallons</span>
                </div>
                {calcResults.hasValidTank && (
                  <span className="text-sm text-stone-500 block mt-1">
                    {Math.round(calcResults.totalCuFt).toLocaleString()} cubic feet
                    {' '}&bull;{' '}
                    {Math.round(calcResults.totalGallons * 3.78541).toLocaleString()} liters
                  </span>
                )}
              </div>

              {calcResults.hasFill && (
                <div className="bg-stone-800 p-4 rounded-lg border border-stone-700">
                  <span className="block text-stone-300 text-sm font-semibold mb-1">Current Fill Volume</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-white">
                      {Math.round(calcResults.fillGallons).toLocaleString()}
                    </span>
                    <span className="text-sm text-stone-400">gallons</span>
                  </div>
                  <span className="text-xs text-stone-500 block mt-1">
                    {Math.round(calcResults.fillCuFt).toLocaleString()} cubic feet
                    {' '}&bull;{' '}
                    {Math.round(calcResults.fillGallons * 3.78541).toLocaleString()} liters
                  </span>
                </div>
              )}
            </div>

            {/* Screening Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
              <div className="bg-stone-50 px-6 py-4 border-b border-stone-200">
                <h3 className="font-bold text-stone-900 text-sm uppercase tracking-wider">Screening Summary</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex flex-col gap-1.5 pb-4 border-b border-stone-100">
                    <span className="text-sm font-semibold text-stone-600">Arsenic Screening</span>
                    <div>{renderStatusBadge(screeningResults.arsenicStatus, 'Arsenic')}</div>
                  </li>
                  <li className="flex flex-col gap-1.5 pb-4 border-b border-stone-100">
                    <span className="text-sm font-semibold text-stone-600">Nitrate Screening</span>
                    <div>{renderStatusBadge(screeningResults.nitrateStatus, 'Nitrate')}</div>
                  </li>
                  <li className="flex flex-col gap-1.5 pb-4 border-b border-stone-100">
                    <span className="text-sm font-semibold text-stone-600">Coliform Status</span>
                    <div>{renderStatusBadge(screeningResults.coliformStatus, 'Coliform')}</div>
                  </li>
                  {(screeningResults.arsenicStatus === 'above' || screeningResults.nitrateStatus === 'above' || screeningResults.coliformStatus === 'detected') && (
                    <li className="bg-rose-50 p-3 rounded text-sm text-rose-800 border border-rose-200">
                      <strong>Note:</strong> Entered values exceed reference screening thresholds. Confirm with certified testing and applicable regulatory guidance.
                    </li>
                  )}
                  {screeningResults.nextDateStr && (
                    <li className="flex justify-between items-center bg-stone-50 p-3 rounded border border-stone-200 mt-2">
                      <span className="text-sm font-semibold text-stone-700 flex items-center gap-2"><Calendar className="w-4 h-4 text-stone-500" /> Next Sample Due</span>
                      <span className="text-sm font-bold text-stone-900">{screeningResults.nextDateStr}</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handlePrint}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-stone-200 text-stone-800 font-bold rounded-lg hover:border-stone-300 hover:bg-stone-50 transition-colors focus:outline-none focus:ring-2 focus:ring-stone-500"
              >
                <Printer className="w-5 h-5" />
                Print Review
              </button>
              <button 
                onClick={handleShare}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-stone-200 text-stone-800 font-bold rounded-lg hover:border-stone-300 hover:bg-stone-50 transition-colors focus:outline-none focus:ring-2 focus:ring-stone-500"
              >
                {isCopied ? (
                  <><Check className="w-5 h-5 text-green-600" /> Copied!</>
                ) : (
                  <><Share2 className="w-5 h-5" /> Share Tool</>
                )}
              </button>
            </div>
            
          </div>
        </div>
      </section>

      {/* Assumptions and Documentation */}
      <section className="bg-white border-t border-stone-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            <div>
              <h3 className="text-2xl font-bold text-stone-900 mb-6">Assumptions & Limitations</h3>
              <div className="prose prose-stone text-stone-600 text-sm">
                <p><strong>Tank Volume:</strong> Calculated using standard geometric formulas (πr²h for cylinders, L×W×H for rectangles). All calculations assume interior dimensions without internal bracing, baffles, or wall-thickness deductions. Partial fill for horizontal cylinders uses circular segment area mathematics.</p>
                <p><strong>Screening References:</strong> Water quality screening flags compare your entered values against common reference thresholds (e.g., 0.010 mg/L for Arsenic, 10.0 mg/L for Nitrate). These are provided for informational screening only.</p>
                <p><strong>Regulatory Status:</strong> This tool is strictly a screening utility. It is not an official compliance determination system. Official compliance depends entirely on specific system classifications, certified laboratory analysis, and local regulatory interpretation.</p>
              </div>

              <h4 className="text-lg font-bold text-stone-900 mt-10 mb-4">How To Use</h4>
              <ol className="space-y-3 text-sm text-stone-600 list-decimal pl-5">
                <li>Select your tank's general shape and enter its dimensions in feet.</li>
                <li>Optionally enter the current liquid depth to estimate partial volume.</li>
                <li>In the Water Quality section, enter recent test results for Arsenic or Nitrate in mg/L.</li>
                <li>Set Coliform status based on your latest sampling.</li>
                <li>Use the sampling log reminder to track when your next routine test is due.</li>
                <li>Review the summary flags and consult a certified laboratory for official decisions.</li>
              </ol>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-stone-900 mb-6">Frequently Asked Questions</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-stone-900 mb-2">Can this tool estimate partial tank fills?</h4>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    Yes. If you enter a "Current Liquid Fill Height", the tool will calculate the approximate volume of liquid currently in the tank. This works for vertical cylinders, rectangular tanks, and horizontal cylinders.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 mb-2">Does this tool determine official EPA compliance?</h4>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    No. The tool flags values against reference thresholds, but official compliance requires certified laboratory protocols, proper chain-of-custody, and adherence to your specific local or state regulations.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 mb-2">What if my water test uses ppb (parts per billion)?</h4>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    This tool requires inputs in mg/L (parts per million). To convert ppb to mg/L, divide by 1000. For example, 10 ppb arsenic is 0.010 mg/L.
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-bold text-stone-900 mt-10 mb-4">Related Utilities</h3>
              <div className="space-y-3">
                <Link to="/tools/spoilage-risk-assessor" className="block p-4 border border-stone-200 rounded-lg hover:border-[#2d5d4b] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2d5d4b]">
                  <span className="font-bold text-[#2d5d4b]">Spoilage Risk Assessor &rarr;</span>
                  <p className="text-sm text-stone-600 mt-1">Evaluate grain and feed spoilage risk factors.</p>
                </Link>
                <Link to="/tools/feed-storage-capacity" className="block p-4 border border-stone-200 rounded-lg hover:border-[#2d5d4b] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2d5d4b]">
                  <span className="font-bold text-[#2d5d4b]">Feed Storage Capacity Calculator &rarr;</span>
                  <p className="text-sm text-stone-600 mt-1">Estimate bunker, pile, and silo feed capacities.</p>
                </Link>
                <Link to="/tools/storage-cost-analysis" className="block p-4 border border-stone-200 rounded-lg hover:border-[#2d5d4b] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2d5d4b]">
                  <span className="font-bold text-[#2d5d4b]">Storage Cost Analysis &rarr;</span>
                  <p className="text-sm text-stone-600 mt-1">Analyze overhead and holding costs for bulk storage.</p>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-stone-100 py-10 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs text-stone-500 uppercase tracking-widest font-bold mb-3">Important Disclaimer</p>
          <p className="text-sm text-stone-600 max-w-4xl mx-auto leading-relaxed">
            This tool provides planning and screening estimates only. Tank measurements, water-quality values, and threshold references shown here do not replace certified laboratory analysis, engineering review, or official regulatory guidance. Formal compliance status depends on applicable rules, certified testing protocols, and competent authority interpretation. Always consult with certified professionals before making operational or legal decisions.
          </p>
        </div>
      </section>
    </main>
  );
}
