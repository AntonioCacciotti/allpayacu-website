'use client';

import { useState } from 'react';
import type { FaqItem } from '@/data/serviceContent';

export default function FAQAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-stone-100">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.q}>
            <button
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
              className="w-full flex items-center justify-between gap-4 py-4 text-left font-semibold text-stone-900 text-sm"
            >
              {item.q}
              <span className={`text-stone-400 shrink-0 transition-transform duration-200 ${open ? 'rotate-45' : ''}`} aria-hidden="true">+</span>
            </button>
            {open && <p className="pb-4 text-stone-500 text-sm leading-relaxed">{item.a}</p>}
          </div>
        );
      })}
    </div>
  );
}
