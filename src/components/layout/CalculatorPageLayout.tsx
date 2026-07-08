import React from 'react';
import { SEO } from '../seo/SEO';

interface FAQ {
  question: string;
  answer: string;
}

interface CalculatorPageLayoutProps {
  title: string;
  description: string;
  canonicalPath: string;
  heroTool: React.ReactNode;
  workedExample: React.ReactNode;
  formulaSection: React.ReactNode;
  assumptions: React.ReactNode;
  faq: React.ReactNode;
  faqsData?: FAQ[];
}

export function CalculatorPageLayout({
  title,
  description,
  canonicalPath,
  heroTool,
  workedExample,
  formulaSection,
  assumptions,
  faq,
  faqsData
}: CalculatorPageLayoutProps) {
  return (
    <main className="w-full flex-1 overflow-y-auto bg-bin-cream text-ink font-sans focus:outline-none" tabIndex={-1}>
      <SEO 
         title={`${title} | Rural Ops Tools`} 
         description={description} 
         canonicalPath={canonicalPath}
         faqs={faqsData}
      />
      
      {/* 1. Hero calculator tool */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 lg:pt-12 lg:pb-16">
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-silo-steel leading-tight mb-4 tracking-tight uppercase">
          {title}
        </h1>
        <p className="text-lg text-silo-steel/80 mb-8 max-w-2xl leading-relaxed">
          {description}
        </p>
        
        {heroTool}
      </section>

      {/* 2. Worked example */}
      <section className="bg-white py-12 lg:py-16 border-y border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-silo-steel mb-8">Worked Example</h2>
          <div className="prose prose-stone max-w-none prose-headings:font-display prose-headings:text-silo-steel">
            {workedExample}
          </div>
        </div>
      </section>

      {/* 3. Formula section */}
      <section className="bg-bin-cream py-12 lg:py-16 border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-silo-steel mb-8">How We Calculate This</h2>
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm mb-6">
            <div className="font-mono text-lg text-ink">
              {formulaSection}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Assumptions */}
      <section className="bg-white py-12 lg:py-16 border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-silo-steel mb-8">Assumptions & Defaults</h2>
          <div className="prose prose-stone max-w-none">
            {assumptions}
          </div>
        </div>
      </section>

      {/* 5. FAQ */}
      <section className="bg-bin-cream py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-silo-steel mb-10 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faq}
          </div>
        </div>
      </section>

      {/* Trust / Disclaimer Strip */}
      <section className="bg-silo-steel text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-y-4 gap-x-8 text-xs font-mono font-semibold uppercase tracking-widest text-center">
            <span>Estimates provided by Storage are for decision support only. Verify results independently.</span>
          </div>
        </div>
      </section>
    </main>
  );
}
