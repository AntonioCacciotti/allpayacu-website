import type { Metadata } from 'next';
import { SERVICE_ICON } from '@/data/serviceContent';
import { venueRental } from '@/data/venueRental';
import TestimonialPlaceholders from '@/components/shared/TestimonialPlaceholders';

export const metadata: Metadata = {
  title: 'Testimonials',
  description: 'Guest reviews from jungle adventures, ayahuasca ceremonies and venue-rental bookings at Allpayacu.',
};

// Layout-only, grouped by service — no fabricated review text until real
// Google/Tripadvisor reviews are supplied (see TestimonialPlaceholders).
const groups = [
  {
    key: 'jungle-adventure' as const,
    title: 'Jungle Adventure',
  },
  {
    key: 'ayahuasca-ceremony' as const,
    title: 'Ayahuasca Ceremony',
  },
];

export default function TestimonialsPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-jungle-gradient text-white text-center px-4">
        <p className="section-label text-jungle-cream mb-3">Testimonials</p>
        <h1 className="font-display text-4xl md:text-5xl text-white mb-4">What guests say</h1>
        <p className="text-white/70 max-w-xl mx-auto text-lg">
          Real Google and Tripadvisor reviews will replace these placeholders once they&apos;re sent over.
        </p>
      </section>

      <div className="-mt-1 bg-jungle-gradient">
        <svg viewBox="0 0 1440 40" className="w-full" preserveAspectRatio="none">
          <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" fill="white" />
        </svg>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {groups.map((g) => (
            <div key={g.key}>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-9 h-9 rounded-lg bg-jungle-50 flex items-center justify-center text-base">{SERVICE_ICON[g.key]}</span>
                <h2 className="font-display text-2xl text-stone-900">{g.title}</h2>
              </div>
              <TestimonialPlaceholders count={3} />
            </div>
          ))}

          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-9 h-9 rounded-lg bg-stone-100 flex items-center justify-center text-base">{venueRental.icon}</span>
              <h2 className="font-display text-2xl text-stone-900">Venue Rental</h2>
            </div>
            <TestimonialPlaceholders count={3} />
          </div>
        </div>
      </section>
    </>
  );
}
