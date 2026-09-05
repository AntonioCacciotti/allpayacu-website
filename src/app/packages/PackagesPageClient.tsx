'use client';

import { useState, useMemo } from 'react';
import { packages, addOns, CUSTOMIZE_NOTE, GROUP_DISCOUNT_NOTE, CATEGORY_TO_GROUP, WHATSAPP_NUMBER, type Category, type ServiceGroup } from '@/data/packages';
import PackageCard from '@/components/packages/PackageCard';
import PackageFilter from '@/components/packages/PackageFilter';
import Link from 'next/link';

type FilterValue = Category | ServiceGroup | 'all';

export default function PackagesPageClient({ initial }: { initial: FilterValue }) {
  const [active, setActive] = useState<FilterValue>(initial);

  const filtered = useMemo(() => {
    if (active === 'all') return packages;
    if (active === 'jungle-adventure' || active === 'ayahuasca-ceremony') {
      return packages.filter((p) => p.category !== 'addons' && CATEGORY_TO_GROUP[p.category] === active);
    }
    return packages.filter((p) => p.category === active);
  }, [active]);

  const showAddons = active === 'all' || active === 'addons';

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-jungle-gradient text-white text-center px-4">
        <p className="section-label text-jungle-cream mb-3">All Experiences</p>
        <h1 className="font-display text-4xl md:text-5xl text-white mb-4">Our Packages</h1>
        <p className="text-white/70 max-w-xl mx-auto text-lg">
          From 3-day river adventures to 21-day ceremonial immersions — every journey is tailored to you.
        </p>
      </section>

      {/* Wave */}
      <div className="-mt-1 bg-jungle-gradient">
        <svg viewBox="0 0 1440 40" className="w-full" preserveAspectRatio="none">
          <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" fill="white" />
        </svg>
      </div>

      {/* Filters */}
      <section className="py-10 bg-white sticky top-16 md:top-20 z-30 shadow-sm border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PackageFilter active={active} onChange={(v) => setActive(v as FilterValue)} />
        </div>
      </section>

      {/* Package grid */}
      <section className="py-16 bg-stone-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {active !== 'addons' && filtered.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filtered.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          )}

          {/* Add-ons */}
          {showAddons && (
            <div className="mt-4">
              <h2 className="font-display text-2xl text-stone-900 mb-6">Add-ons & Activities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {addOns.map((addon) => {
                  const waMsg = encodeURIComponent(`Hi Allpayacu! I'm interested in adding the ${addon.name} to my trip. Can you tell me more?`);
                  const waLink = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${waMsg}`;
                  return (
                    <div key={addon.id} className="card p-6 flex flex-col gap-3">
                      <div className="flex items-start justify-between">
                        <h3 className="font-display font-semibold text-stone-900 text-lg">{addon.name}</h3>
                        <div className="text-right">
                          <p className="text-jungle-500 font-bold text-xl">${addon.price}</p>
                          <p className="text-stone-400 text-xs">{addon.pricingType.replace('-', ' ')}</p>
                        </div>
                      </div>
                      <p className="text-stone-500 text-sm">{addon.description}</p>
                      <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-primary text-xs mt-auto justify-center">
                        Ask on WhatsApp
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Customize + group note */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-stone-200 p-6">
              <p className="font-semibold text-stone-900 mb-2">Customise any package</p>
              <p className="text-stone-500 text-sm mb-4">{CUSTOMIZE_NOTE}</p>
              <div className="flex gap-3">
                <a href="https://wa.me/51965893257" target="_blank" rel="noopener noreferrer"
                  className="btn-primary text-xs">WhatsApp</a>
                <a href="https://t.me/allpayacu" target="_blank" rel="noopener noreferrer"
                  className="text-xs flex items-center gap-1 px-4 py-2 rounded-full font-semibold text-white" style={{ backgroundColor: '#2AABEE' }}>Telegram</a>
              </div>
            </div>
            <div className="bg-jungle-50 rounded-2xl border border-jungle-200 p-6">
              <p className="font-semibold text-jungle-700 mb-2">Travelling in a group?</p>
              <p className="text-jungle-600 text-sm mb-4">{GROUP_DISCOUNT_NOTE}</p>
              <Link href="/contact" className="btn-outline text-xs">Contact us for group rates</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
