import React from 'react';

export function Contact() {
  return (
    <div className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-8 py-16 overflow-y-auto">
      <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-8">
        <h1 className="text-3xl font-light text-stone-800 mb-2">Compliance Support & Contact</h1>
        <p className="text-stone-500 mb-8 border-b pb-6 border-stone-100">
          Reach out to the master ecosystem support team for guidance on auditing procedures, regulatory technicalities, or software issues.
        </p>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-xs font-bold text-stone-600 mb-1 uppercase tracking-wide">Auditor / Operator Name</label>
              <input type="text" id="name" className="w-full rounded-md border-stone-300 border px-3 py-2 text-sm focus:ring-blue-600 focus:border-blue-600 text-stone-900" placeholder="e.g. Jane Doe" />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-stone-600 mb-1 uppercase tracking-wide">Official Email Address</label>
              <input type="email" id="email" className="w-full rounded-md border-stone-300 border px-3 py-2 text-sm focus:ring-blue-600 focus:border-blue-600 text-stone-900" placeholder="email@utility.gov" />
            </div>
          </div>
          
          <div>
            <label htmlFor="subject" className="block text-xs font-bold text-stone-600 mb-1 uppercase tracking-wide">PWS ID or Subject Designation</label>
            <input type="text" id="subject" className="w-full rounded-md border-stone-300 border px-3 py-2 text-sm focus:ring-blue-600 focus:border-blue-600 text-stone-900" placeholder="TX1234567 or General Inquiry" />
          </div>

          <div>
             <label htmlFor="priority" className="block text-xs font-bold text-stone-600 mb-1 uppercase tracking-wide">Protocol Priority</label>
             <select id="priority" className="w-full rounded-md border-stone-300 border px-3 py-2 text-sm focus:ring-blue-600 focus:border-blue-600 bg-white text-stone-900">
                <option>Routine Inquiry (Filing Complete)</option>
                <option>Action Required - System Defect</option>
                <option>Red Flag - Urgent MCL / Compliance Failure</option>
             </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-xs font-bold text-stone-600 mb-1 uppercase tracking-wide">Documentation Log</label>
            <textarea id="message" rows={5} className="w-full rounded-md border-stone-300 border px-3 py-2 text-sm focus:ring-blue-600 focus:border-blue-600 text-stone-900" placeholder="Describe the variance or request..."></textarea>
          </div>

          <button type="button" className="w-full flex justify-center py-3 px-4 border border-transparent rounded bg-stone-900 text-white text-[10px] font-bold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-900 uppercase tracking-widest transition-colors">
            Submit Protocol
          </button>
        </form>
      </div>
    </div>
  );
}
