import React from 'react';
import { SEO } from '../seo/SEO';

interface GuidePageLayoutProps {
  title: string;
  description: string;
  canonicalPath: string;
  content: React.ReactNode;
}

export function GuidePageLayout({
  title,
  description,
  canonicalPath,
  content,
}: GuidePageLayoutProps) {
  return (
    <main className="w-full flex-1 overflow-y-auto bg-bin-cream text-ink font-sans focus:outline-none" tabIndex={-1}>
      <SEO 
         title={`${title} | Rural Ops Tools`} 
         description={description} 
         canonicalPath={canonicalPath}
      />
      
      <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-silo-steel leading-tight mb-6 tracking-tight uppercase">
          {title}
        </h1>
        <p className="text-xl text-silo-steel/80 mb-12 max-w-2xl leading-relaxed font-semibold">
          {description}
        </p>
        
        <div className="prose prose-lg prose-stone max-w-none prose-headings:font-display prose-headings:text-silo-steel">
          {content}
        </div>
      </section>

      {/* Trust / Disclaimer Strip */}
      <section className="bg-silo-steel text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-y-4 gap-x-8 text-xs font-mono font-semibold uppercase tracking-widest text-center">
            <span>Provided by Rural Ops Tools. For educational purposes.</span>
          </div>
        </div>
      </section>
    </main>
  );
}
