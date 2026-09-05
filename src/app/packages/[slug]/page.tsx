import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { packages, getPackageBySlug, CUSTOMIZE_NOTE, WHATSAPP_NUMBER, TELEGRAM_USERNAME, CATEGORY_LABELS, CATEGORY_TO_GROUP } from '@/data/packages';
import { buildFlow, buildFacts, SERVICE_SAFETY, SERVICE_INTEGRATION, SERVICE_GALLERY, SERVICE_FAQ, SERVICE_WHO_FOR } from '@/data/serviceContent';
import FAQAccordion from '@/components/shared/FAQAccordion';
import GalleryPlaceholder from '@/components/shared/GalleryPlaceholder';
import TestimonialPlaceholders from '@/components/shared/TestimonialPlaceholders';

export function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const pkg = getPackageBySlug(params.slug);
  if (!pkg) return {};
  return {
    title: `${pkg.name} – ${pkg.duration}`,
    description: pkg.shortDescription,
  };
}

const subNav = [
  { id: 'overview', label: 'Overview' },
  { id: 'flow', label: 'Flow & Ceremony' },
  { id: 'safety', label: 'Safety & Screening' },
  { id: 'integration', label: 'Integration' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'faq', label: 'FAQ' },
];

export default function PackageDetailPage({ params }: { params: { slug: string } }) {
  const pkg = getPackageBySlug(params.slug);
  if (!pkg) notFound();
  if (pkg.category === 'addons') notFound();

  const group = CATEGORY_TO_GROUP[pkg.category];
  const isCeremony = group === 'ayahuasca-ceremony';

  const waMsg = encodeURIComponent(`Hi Allpayacu! I'm interested in the ${pkg.name} (${pkg.duration}) package. Can you tell me more about availability and next steps?`);
  const waLink = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${waMsg}`;
  const tgLink = `https://t.me/${TELEGRAM_USERNAME}`;

  const flow = buildFlow(pkg);
  const facts = buildFacts(pkg);
  const flowSectionLabel = isCeremony ? 'Flow & Ceremony' : 'Daily Itinerary';
  const safetySectionLabel = isCeremony ? 'Safety & Screening' : 'Safety & Gear';

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-jungle-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-white/60 mb-4">
            <Link href="/packages" className="hover:text-white transition-colors">Packages</Link>
            <span>/</span>
            <span className="text-white/40">{CATEGORY_LABELS[pkg.category]}</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-earth-orange/20 text-earth-orange text-xs font-semibold px-3 py-1 rounded-full mb-4">
                {CATEGORY_LABELS[pkg.category]}
              </span>
              <h1 className="font-display text-4xl md:text-5xl text-white mb-3">{pkg.name}</h1>
              <p className="text-white/70 text-lg mb-6 leading-relaxed">{pkg.description}</p>
              <div className="flex flex-wrap gap-3">
                <div className="bg-white/10 rounded-xl px-4 py-3 text-center">
                  <p className="text-white/60 text-xs mb-1">Duration</p>
                  <p className="text-white font-bold text-xl">{pkg.duration}</p>
                </div>
                <div className="bg-white/10 rounded-xl px-4 py-3 text-center">
                  <p className="text-white/60 text-xs mb-1">Price</p>
                  <p className="text-white font-bold text-xl">${pkg.price.toLocaleString()}</p>
                  <p className="text-white/50 text-xs">{pkg.pricingType.replace('-', ' ')}</p>
                </div>
                <div className="bg-white/10 rounded-xl px-4 py-3 text-center">
                  <p className="text-white/60 text-xs mb-1">30% Deposit</p>
                  <p className="text-earth-orange font-bold text-xl">${Math.round(pkg.price * 0.3).toLocaleString()}</p>
                  <p className="text-white/50 text-xs">to confirm</p>
                </div>
              </div>
            </div>

            {/* Placeholder image block */}
            <div className="relative h-72 lg:h-96 rounded-2xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center">
              <div className="text-center text-white/30">
                <span className="text-6xl block mb-2">🌿</span>
                <span className="text-sm">Photo coming soon</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0">
          <svg viewBox="0 0 1440 40" className="w-full" preserveAspectRatio="none">
            <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Sticky sub-nav */}
      <nav aria-label="Package sections" className="sticky top-16 md:top-20 z-20 bg-white border-b border-stone-100 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-1">
          {subNav.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="whitespace-nowrap px-3.5 py-3.5 text-sm font-semibold text-stone-500 hover:text-jungle-600 border-b-2 border-transparent hover:border-earth-orange transition-colors"
            >
              {s.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Details */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: main content */}
            <div className="lg:col-span-2 space-y-14">
              <div id="overview" className="scroll-mt-32">
                <h2 className="font-display text-2xl text-stone-900 mb-5">Overview & who it&apos;s for</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
                  {facts.map((f) => (
                    <div key={f.k} className="bg-stone-50 rounded-xl px-4 py-3">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-stone-400">{f.k}</p>
                      <p className="text-sm font-semibold text-stone-900 mt-0.5">{f.v}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-jungle-50 border border-jungle-200 rounded-2xl p-5 text-jungle-700 text-sm leading-relaxed mb-8">
                  {SERVICE_WHO_FOR[group]}
                </div>

                <h3 className="font-display text-xl text-stone-900 mb-4">What&apos;s included</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pkg.included.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-stone-50 rounded-xl px-4 py-3">
                      <span className="text-jungle-500 font-bold">✓</span>
                      <span className="text-stone-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div id="flow" className="scroll-mt-32">
                <h2 className="font-display text-2xl text-stone-900 mb-5">{flowSectionLabel}</h2>
                <div className="border-l-2 border-stone-100 pl-6 space-y-6">
                  {flow.map((phase) => (
                    <div key={phase.day} className="relative">
                      <span className="absolute -left-[29px] top-1 w-2.5 h-2.5 rounded-full bg-earth-orange ring-4 ring-white" aria-hidden="true" />
                      <p className="text-xs font-bold uppercase tracking-wide text-earth-orange">{phase.day}</p>
                      <p className="font-semibold text-stone-900 mt-0.5">{phase.title}</p>
                      <p className="text-stone-500 text-sm mt-1 leading-relaxed">{phase.description}</p>
                    </div>
                  ))}
                </div>
                {isCeremony && (
                  <p className="text-xs text-stone-400 italic mt-5">
                    14D and 21D programs repeat this rhythm — ceremony, rest, integration — with more ceremonies and deeper dieta work between them.
                  </p>
                )}
              </div>

              <div id="safety" className="scroll-mt-32">
                <h2 className="font-display text-2xl text-stone-900 mb-5">{safetySectionLabel}</h2>
                <div className="space-y-3">
                  {SERVICE_SAFETY[group].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-jungle-50 text-jungle-600 flex items-center justify-center text-xs font-bold">✓</span>
                      <p className="text-stone-600 text-sm leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div id="integration" className="scroll-mt-32">
                <h2 className="font-display text-2xl text-stone-900 mb-5">Integration & Aftercare</h2>
                <p className="text-stone-600 text-sm leading-relaxed">{SERVICE_INTEGRATION[group]}</p>
              </div>

              <div id="gallery" className="scroll-mt-32">
                <h2 className="font-display text-2xl text-stone-900 mb-5">Gallery</h2>
                <GalleryPlaceholder captions={SERVICE_GALLERY[group]} />
              </div>

              <div id="testimonials" className="scroll-mt-32">
                <h2 className="font-display text-2xl text-stone-900 mb-5">Testimonials</h2>
                <TestimonialPlaceholders count={3} />
              </div>

              <div id="faq" className="scroll-mt-32">
                <h2 className="font-display text-2xl text-stone-900 mb-2">FAQ</h2>
                <FAQAccordion items={SERVICE_FAQ[group]} />
              </div>

              {/* Customise note */}
              <div className="bg-jungle-50 border border-jungle-200 rounded-2xl p-6">
                <p className="font-semibold text-jungle-700 mb-2">Customise this package</p>
                <p className="text-jungle-600 text-sm mb-4">{CUSTOMIZE_NOTE}</p>
                <div className="flex flex-wrap gap-3">
                  <a href={waLink} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white"
                    style={{ backgroundColor: '#25D366' }}>
                    WhatsApp
                  </a>
                  <a href={tgLink} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white"
                    style={{ backgroundColor: '#2AABEE' }}>
                    Telegram
                  </a>
                </div>
              </div>
            </div>

            {/* Right: booking sticky sidebar */}
            <div className="lg:sticky lg:top-44 lg:self-start">
              <div className="card p-6">
                <p className="font-display text-xl text-stone-900 mb-1">Reserve your spot</p>
                <p className="text-stone-500 text-sm mb-5">30% deposit secures your dates. Balance due on arrival.</p>

                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-500">Price per person</span>
                    <span className="font-semibold">${pkg.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-500">Deposit to confirm (30%)</span>
                    <span className="font-semibold text-earth-orange">${Math.round(pkg.price * 0.3).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-500">Balance on arrival</span>
                    <span className="font-semibold">${Math.round(pkg.price * 0.7).toLocaleString()}</span>
                  </div>
                </div>

                <a href={waLink} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-full text-sm font-semibold text-white mb-3"
                  style={{ backgroundColor: '#25D366' }}>
                  Ask on WhatsApp
                </a>
                <a href={tgLink} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-full text-sm font-semibold text-white"
                  style={{ backgroundColor: '#2AABEE' }}>
                  Ask on Telegram
                </a>

                <p className="text-xs text-stone-400 text-center mt-4">
                  No payment online. We confirm availability, then arrange your deposit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
