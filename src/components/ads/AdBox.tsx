import React, { useEffect, useRef } from 'react';

interface AdBoxProps {
  slotId?: string;
  className?: string;
  format?: 'auto' | 'fluid' | 'rectangle';
}

export function AdBox({ slotId = '1234567890', className, format = 'auto' }: AdBoxProps) {
  const adRef = useRef<HTMLModElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      try {
        if (typeof window !== 'undefined' && window.adsbygoogle) {
          window.adsbygoogle.push({});
          initialized.current = true;
        }
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }
  }, []);

  return (
    <div className={`ad-container bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-400 text-xs text-center overflow-hidden ${className || ''}`} data-ad-status="unfilled" aria-hidden="true" style={{ minHeight: '100px', margin: '20px auto' }}>
      <ins className="adsbygoogle"
           style={{ display: 'block', width: '100%' }}
           data-ad-client="ca-PUB-YOUR_CLIENT_ID"
           data-ad-slot={slotId}
           data-ad-format={format}
           data-full-width-responsive="true"
           ref={adRef}></ins>
    </div>
  );
}
