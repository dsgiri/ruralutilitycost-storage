const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// Find the grid section
const startStr = '        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">';
const endStr = '      </section>\n      {/* How Storage Helps Section */}';

const startIndex = code.indexOf(startStr);
const endIndex = code.indexOf(endStr);

if (startIndex === -1 || endIndex === -1) {
    console.log("Could not find the section to replace");
    process.exit(1);
}

const newGrid = `        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Top Priority 1 */}
          <div className="bg-white border-2 border-[#2d5d4b]/20 hover:border-[#2d5d4b]/50 rounded-2xl p-6 sm:p-8 flex flex-col shadow-sm transition-colors relative overflow-hidden group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-[#2d5d4b]/10 rounded-lg flex items-center justify-center text-[#2d5d4b] group-hover:bg-[#2d5d4b]/20 transition-colors">
                <Calculator className="w-6 h-6" aria-hidden="true" />
              </div>
              <span className="inline-flex items-center px-2.5 py-1 bg-[#2d5d4b]/10 text-[#2d5d4b] text-[10px] uppercase font-bold tracking-widest rounded-full">Most used</span>
            </div>
            <h3 className="text-2xl font-bold text-stone-900 mb-3">Store or Sell Calculator</h3>
            <p className="text-stone-600 mb-8 flex-1 leading-relaxed text-base">Find out exactly how much the market needs to rise to cover your storage and capital costs.</p>
            <NavLink 
              to="/store-or-sell-calculator" 
              className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3.5 bg-stone-900 text-white font-semibold rounded hover:bg-stone-800 transition-colors focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-2 min-h-[48px]"
              aria-label="Open Store or Sell Calculator"
            >
              Open Tool
            </NavLink>
          </div>

          {/* Top Priority 2 */}
          <div className="bg-white border border-stone-200 hover:border-[#2d5d4b]/40 rounded-2xl p-6 sm:p-8 flex flex-col shadow-sm transition-colors group">
            <div className="w-12 h-12 mb-4 bg-stone-100 rounded-lg flex items-center justify-center text-stone-600 group-hover:bg-[#2d5d4b]/10 group-hover:text-[#2d5d4b] transition-colors">
              <Wheat className="w-6 h-6" aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-bold text-stone-900 mb-3">Grain Bin Capacity</h3>
            <p className="text-stone-600 mb-8 flex-1 leading-relaxed text-base">Estimate bushel capacity based on bin geometry, eave height, and compaction factors.</p>
            <NavLink 
              to="/grain-bin-estimator" 
              className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3.5 bg-white border-2 border-stone-200 text-stone-700 font-semibold rounded hover:bg-stone-50 hover:border-stone-300 transition-colors focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2 min-h-[48px]"
            >
              Open Tool
            </NavLink>
          </div>
        </div>

        <div className="mt-12 mb-8 border-t border-stone-200 pt-12">
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight mb-3">More Tools & Guides</h2>
          <p className="text-stone-600">Additional calculators and operational frameworks.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          
          <NavLink to="/spoilage-risk-calculator" className="group flex flex-col bg-[#fcfcfb] border border-stone-200 hover:border-[#2d5d4b]/40 rounded-xl p-5 transition-all hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2d5d4b]">
            <div className="w-10 h-10 mb-4 bg-white border border-stone-200 rounded flex items-center justify-center text-stone-600 group-hover:text-[#2d5d4b] group-hover:border-[#2d5d4b]/30 transition-colors">
              <ThermometerSun className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="text-base font-bold text-stone-900 mb-2 leading-snug group-hover:text-[#2d5d4b] transition-colors">Spoilage Risk Assessor</h3>
            <p className="text-sm text-stone-600 mb-6 flex-1 leading-relaxed">Evaluate biological spoilage risk percentiles.</p>
            <div className="flex items-center text-[#2d5d4b] text-sm font-semibold">
              Open tool <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
            </div>
          </NavLink>

          <NavLink to="/guides/store-vs-sell-decision-framework" className="group flex flex-col bg-[#fcfcfb] border border-stone-200 hover:border-[#2d5d4b]/40 rounded-xl p-5 transition-all hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2d5d4b]">
            <div className="w-10 h-10 mb-4 bg-white border border-stone-200 rounded flex items-center justify-center text-stone-600 group-hover:text-[#2d5d4b] group-hover:border-[#2d5d4b]/30 transition-colors">
              <Database className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="text-base font-bold text-stone-900 mb-2 leading-snug group-hover:text-[#2d5d4b] transition-colors">Store vs. Sell Framework</h3>
            <p className="text-sm text-stone-600 mb-6 flex-1 leading-relaxed">A guide to the breakeven calculation.</p>
            <div className="flex items-center text-[#2d5d4b] text-sm font-semibold">
              Read guide <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
            </div>
          </NavLink>

          <NavLink to="/guides/hidden-cost-of-grain-storage" className="group flex flex-col bg-[#fcfcfb] border border-stone-200 hover:border-[#2d5d4b]/40 rounded-xl p-5 transition-all hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2d5d4b]">
            <div className="w-10 h-10 mb-4 bg-white border border-stone-200 rounded flex items-center justify-center text-stone-600 group-hover:text-[#2d5d4b] group-hover:border-[#2d5d4b]/30 transition-colors">
              <Calculator className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="text-base font-bold text-stone-900 mb-2 leading-snug group-hover:text-[#2d5d4b] transition-colors">Hidden Storage Costs</h3>
            <p className="text-sm text-stone-600 mb-6 flex-1 leading-relaxed">Why your true carry is higher than you think.</p>
            <div className="flex items-center text-[#2d5d4b] text-sm font-semibold">
              Read guide <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
            </div>
          </NavLink>

          <NavLink to="/guides/post-harvest-storage-checklist" className="group flex flex-col bg-[#fcfcfb] border border-stone-200 hover:border-[#2d5d4b]/40 rounded-xl p-5 transition-all hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2d5d4b]">
            <div className="w-10 h-10 mb-4 bg-white border border-stone-200 rounded flex items-center justify-center text-stone-600 group-hover:text-[#2d5d4b] group-hover:border-[#2d5d4b]/30 transition-colors">
              <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="text-base font-bold text-stone-900 mb-2 leading-snug group-hover:text-[#2d5d4b] transition-colors">Post-Harvest Checklist</h3>
            <p className="text-sm text-stone-600 mb-6 flex-1 leading-relaxed">Steps to lock down quality and plan marketing.</p>
            <div className="flex items-center text-[#2d5d4b] text-sm font-semibold">
              Read guide <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
            </div>
          </NavLink>
        </div>
`;

code = code.substring(0, startIndex) + newGrid + "\n" + code.substring(endIndex);
fs.writeFileSync('src/pages/Home.tsx', code);
