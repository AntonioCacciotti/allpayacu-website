import type { Metadata } from 'next';
import { WHATSAPP_NUMBER, TELEGRAM_USERNAME } from '@/data/packages';
import { venueRental } from '@/data/venueRental';
import FAQAccordion from '@/components/shared/FAQAccordion';
import GalleryPlaceholder from '@/components/shared/GalleryPlaceholder';

export const metadata: Metadata = {
  title: 'Venue Rental',
  description: 'Rent the whole Allpayacu lodge for your own yoga, coaching or wellness group — a turnkey Amazon retreat venue.',
};

export default function VenueRentalPage() {
  const waMsg = encodeURIComponent("Hi Allpayacu! I'm interested in renting the lodge for my group. Can you tell me more about availability and rates?");
  const waLink = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${waMsg}`;
  const tgLink = `https://t.me/${TELEGRAM_USERNAME}`;

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-jungle-gradient text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-earth-orange/20 text-earth-orange text-xs font-semibold px-3 py-1 rounded-full mb-4">
            Venue Rental
          </span>
          <h1 className="font-display text-4xl md:text-5xl text-white mb-4 max-w-xl mx-auto">
            Rent the whole lodge for your group
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            A turnkey Amazon retreat venue for yoga teachers, coaches and wellness facilitators. You bring the guests
            and the program — we bring the lodge, the kitchen and the river.
          </p>
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-earth text-base px-8 py-4">
            Check availability
          </a>
        </div>
        <div className="absolute bottom-0 inset-x-0">
          <svg viewBox="0 0 1440 40" className="w-full" preserveAspectRatio="none">
            <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" fill="white" />
          </svg>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {/* Key facts */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-stone-50 rounded-xl p-4 text-center">
              <p className="font-display text-2xl text-jungle-600 font-bold">{venueRental.bedsToday}</p>
              <p className="text-xs text-stone-500 mt-1">Beds today</p>
            </div>
            <div className="bg-stone-50 rounded-xl p-4 text-center">
              <p className="font-display text-2xl text-jungle-600 font-bold">{venueRental.bedsExpanded}</p>
              <p className="text-xs text-stone-500 mt-1">Beds once expanded</p>
            </div>
            <div className="bg-stone-50 rounded-xl p-4 text-center">
              <p className="font-display text-2xl text-jungle-600 font-bold">{venueRental.minStay}</p>
              <p className="text-xs text-stone-500 mt-1">Typical minimum</p>
            </div>
            <div className="bg-stone-50 rounded-xl p-4 text-center">
              <p className="font-display text-lg text-jungle-600 font-bold">Full-lodge</p>
              <p className="text-xs text-stone-500 mt-1">Booking unit</p>
            </div>
          </div>

          {/* Included / who for */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div>
              <h2 className="font-display text-xl text-stone-900 mb-4">What&apos;s included</h2>
              <ul className="space-y-3">
                {venueRental.included.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-stone-600">
                    <span className="mt-0.5 text-earth-orange shrink-0">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-xl text-stone-900 mb-4">Who it&apos;s for</h2>
              <ul className="space-y-3">
                {venueRental.whoFor.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-stone-600">
                    <span className="mt-0.5 text-earth-orange shrink-0">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Gallery */}
          <div>
            <h2 className="font-display text-xl text-stone-900 mb-4">Gallery</h2>
            <GalleryPlaceholder captions={venueRental.gallery} />
          </div>

          {/* FAQ */}
          <div>
            <h2 className="font-display text-xl text-stone-900 mb-2">FAQ</h2>
            <FAQAccordion items={venueRental.faq} />
          </div>

          {/* Inquiry CTA — no calculator, rate depends on group size/season/length */}
          <div className="bg-jungle-50 border border-jungle-200 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-semibold text-jungle-700 mb-1">Tell us your dates and group size</p>
              <p className="text-jungle-600 text-sm max-w-md">
                Rates depend on group size, season and length of stay — we quote directly, no online booking.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
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
      </section>
    </>
  );
}
