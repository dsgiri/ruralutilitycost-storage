import React, { useState } from 'react';
import { SEO } from '../components/seo/SEO';
import { trackEvent } from '../lib/analytics';

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate validation and API request
    setTimeout(() => {
      alert("Form submitted correctly.");
      setIsSubmitting(false);
      trackEvent('submit', 'form', 'contact_protocol_form');
    }, 1000);
  };

  return (
    <div className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-8 py-16 overflow-y-auto">
      <SEO 
        title="Contact & Support | Rural Ops Tools"
        description="Contact the Rural Ops Tools support team for EPA auditing procedures, inventory tracking guidance, or technical issues."
        canonicalPath="/contact"
      />
      <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-light text-stone-800 mb-2">Compliance Support & Contact</h1>
        <p className="text-stone-500 mb-8 border-b pb-6 border-stone-100 text-sm sm:text-base">
          Reach out to the master ecosystem support team for guidance on auditing procedures, regulatory technicalities, or software issues.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-xs font-bold text-stone-600 mb-1 uppercase tracking-wide">Auditor / Operator Name</label>
              <input required type="text" id="name" className="w-full min-h-[48px] rounded-md border-stone-300 border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-stone-900 outline-none" placeholder="e.g. Jane Doe" />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-stone-600 mb-1 uppercase tracking-wide">Official Email Address</label>
              <input required type="email" id="email" className="w-full min-h-[48px] rounded-md border-stone-300 border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-stone-900 outline-none" placeholder="email@utility.gov" />
            </div>
          </div>
          
          <div>
            <label htmlFor="subject" className="block text-xs font-bold text-stone-600 mb-1 uppercase tracking-wide">PWS ID or Subject Designation</label>
            <input required type="text" id="subject" className="w-full min-h-[48px] rounded-md border-stone-300 border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-stone-900 outline-none" placeholder="TX1234567 or General Inquiry" />
          </div>

          <div>
             <label htmlFor="priority" className="block text-xs font-bold text-stone-600 mb-1 uppercase tracking-wide">Protocol Priority</label>
             <select id="priority" className="w-full min-h-[48px] rounded-md border-stone-300 border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white text-stone-900 outline-none">
                <option>Routine Inquiry (Filing Complete)</option>
                <option>Action Required - System Defect</option>
                <option>Red Flag - Urgent MCL / Compliance Failure</option>
             </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-xs font-bold text-stone-600 mb-1 uppercase tracking-wide">Documentation Log</label>
            <textarea required id="message" rows={5} className="w-full rounded-md border-stone-300 border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-stone-900 outline-none" placeholder="Describe the variance or request..."></textarea>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full min-h-[48px] flex items-center justify-center py-3 px-4 rounded bg-stone-900 text-white text-[10px] font-bold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-900 uppercase tracking-widest transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Protocol'}
          </button>
        </form>
      </div>
    </div>
  );
}
