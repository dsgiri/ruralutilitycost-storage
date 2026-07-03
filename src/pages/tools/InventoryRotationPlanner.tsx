import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Calculator, Calendar, AlertTriangle, Check, RefreshCcw, Printer, Share2, ArrowDownUp, Plus, Trash2, Info
} from 'lucide-react';
import { Link } from 'react-router-dom';

type Batch = {
  id: string;
  name: string;
  dateIn: string;
  shelfLifeDays: number;
  quantity: number;
};

export function InventoryRotationPlanner() {
  const [batches, setBatches] = useState<Batch[]>([
    { id: '1', name: 'Batch 1', dateIn: new Date().toISOString().split('T')[0], shelfLifeDays: 180, quantity: 1000 }
  ]);
  const [isCopied, setIsCopied] = useState(false);

  const addBatch = () => {
    const newId = Math.random().toString(36).substring(2, 9);
    setBatches([...batches, { id: newId, name: `Batch ${batches.length + 1}`, dateIn: new Date().toISOString().split('T')[0], shelfLifeDays: 180, quantity: 1000 }]);
  };

  const removeBatch = (id: string) => {
    setBatches(batches.filter(b => b.id !== id));
  };

  const updateBatch = (id: string, field: keyof Batch, value: string | number) => {
    setBatches(batches.map(b => b.id === id ? { ...b, [field]: value } : b));
  };

  const results = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const processed = batches.map(b => {
      const dIn = new Date(b.dateIn);
      const expirationDate = new Date(dIn);
      expirationDate.setDate(expirationDate.getDate() + (Number(b.shelfLifeDays) || 0));
      
      const daysRemaining = Math.ceil((expirationDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
      
      let status = 'good';
      if (daysRemaining < 0) status = 'expired';
      else if (daysRemaining <= 30) status = 'warning';

      return {
        ...b,
        expirationDate,
        daysRemaining,
        status
      };
    });

    processed.sort((a, b) => a.expirationDate.getTime() - b.expirationDate.getTime());

    return processed;
  }, [batches]);

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
    setBatches([{ id: '1', name: 'Batch 1', dateIn: new Date().toISOString().split('T')[0], shelfLifeDays: 180, quantity: 1000 }]);
  };

  return (
    <main className="w-full flex-1 overflow-y-auto bg-[#F9F9F8] text-stone-900 font-sans focus:outline-none" tabIndex={-1}>
      <Helmet>
        <title>Inventory Rotation Planner | Storage Hub</title>
        <meta name="description" content="Structure FIFO logistics to manage perishability and inventory flow constraints." />
      </Helmet>
      
      {/* Hero */}
      <section className="bg-white border-b border-stone-200 pt-10 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold text-[#2d5d4b] uppercase tracking-widest mb-2">Inventory Management</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-4">Inventory Rotation Planner</h1>
            <p className="text-lg text-stone-600 leading-relaxed mb-4">Plan FIFO (First-In, First-Out) logistics to minimize spoilage and manage perishability constraints.</p>
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
                  <Calculator className="w-5 h-5 text-[#2d5d4b]" />
                  Inventory Batches
                </h2>
                <button onClick={handleReset} className="text-sm text-stone-500 hover:text-[#2d5d4b] flex items-center gap-1 transition-colors focus:outline-none focus:ring-2 focus:ring-[#2d5d4b] rounded px-1">
                  <RefreshCcw className="w-4 h-4" /> Reset
                </button>
              </div>

              <div className="space-y-6">
                {batches.map((batch, index) => (
                  <div key={batch.id} className="p-4 bg-stone-50 border border-stone-200 rounded-lg relative">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-stone-800">Batch {index + 1}</h3>
                      {batches.length > 1 && (
                        <button onClick={() => removeBatch(batch.id)} className="text-rose-500 hover:text-rose-700 p-1 rounded focus:outline-none focus:ring-2 focus:ring-rose-500" aria-label="Remove batch">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-stone-800 mb-1">Batch Name / ID</label>
                        <input type="text" value={batch.name} onChange={(e) => updateBatch(batch.id, 'name', e.target.value)} className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#2d5d4b] outline-none text-sm" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-stone-800 mb-1">Quantity</label>
                        <input type="number" value={batch.quantity} onChange={(e) => updateBatch(batch.id, 'quantity', parseFloat(e.target.value))} className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#2d5d4b] outline-none text-sm" min="0" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-stone-800 mb-1">Date Received</label>
                        <input type="date" value={batch.dateIn} onChange={(e) => updateBatch(batch.id, 'dateIn', e.target.value)} className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#2d5d4b] outline-none text-sm" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-stone-800 mb-1">Estimated Shelf Life (Days)</label>
                        <input type="number" value={batch.shelfLifeDays} onChange={(e) => updateBatch(batch.id, 'shelfLifeDays', parseFloat(e.target.value))} className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#2d5d4b] outline-none text-sm" min="0" />
                      </div>
                    </div>
                  </div>
                ))}

                <button onClick={addBatch} className="w-full py-3 flex items-center justify-center gap-2 border-2 border-dashed border-stone-300 text-stone-600 font-bold rounded-lg hover:border-[#2d5d4b] hover:text-[#2d5d4b] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2d5d4b]">
                  <Plus className="w-4 h-4" /> Add Another Batch
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-stone-900 rounded-xl shadow-md p-6 sm:p-8 text-white">
              <h3 className="text-stone-400 font-bold uppercase tracking-widest text-sm mb-4 border-b border-stone-700 pb-2 flex items-center gap-2">
                <ArrowDownUp className="w-4 h-4" /> Recommended Rotation (FIFO)
              </h3>
              
              <div className="space-y-4">
                {results.map((batch, index) => (
                  <div key={batch.id} className={`p-4 rounded-lg border ${batch.status === 'expired' ? 'bg-rose-900/50 border-rose-700' : batch.status === 'warning' ? 'bg-amber-900/50 border-amber-700' : 'bg-stone-800 border-stone-700'}`}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-bold text-lg flex items-center gap-2">
                        <span className="flex items-center justify-center bg-stone-700 text-stone-300 w-6 h-6 rounded-full text-xs">{index + 1}</span>
                        {batch.name}
                      </div>
                      <span className="text-sm font-medium text-stone-400">Qty: {batch.quantity}</span>
                    </div>
                    <div className="text-sm text-stone-300 mb-2">
                      Received: {new Date(batch.dateIn).toLocaleDateString()}
                    </div>
                    <div className={`text-sm font-bold flex items-center gap-2 ${batch.status === 'expired' ? 'text-rose-400' : batch.status === 'warning' ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {batch.status === 'expired' && <AlertTriangle className="w-4 h-4" />}
                      {batch.status === 'warning' && <AlertTriangle className="w-4 h-4" />}
                      {batch.daysRemaining < 0 ? `Expired ${Math.abs(batch.daysRemaining)} days ago` : `Expires in ${batch.daysRemaining} days`}
                    </div>
                  </div>
                ))}
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
                <p>This planner uses a strict First-In, First-Out (FIFO) methodology, prioritizing batches based on their calculated expiration dates.</p>
                <p>Expiration dates are derived by adding the estimated shelf life to the received date. This does not account for specific environmental degradation factors (such as moisture, temperature, or insect activity) which may significantly shorten actual shelf life.</p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-stone-900 mb-6">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-stone-900 mb-1">What is FIFO?</h4>
                  <p className="text-sm text-stone-600 leading-relaxed">First-In, First-Out (FIFO) is an inventory management method where the oldest inventory items are sold or used first to avoid spoilage. This is critical for perishable agricultural commodities.</p>
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 mb-1">Why do some batches show warnings?</h4>
                  <p className="text-sm text-stone-600 leading-relaxed">The tool highlights batches that are within 30 days of their calculated expiration date (amber warning) or past expiration (red warning) to help you prioritize their use.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
