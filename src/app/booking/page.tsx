import type { Metadata } from 'next';
import BookingCalculator from '@/components/booking/BookingCalculator';

export const metadata: Metadata = {
  title: 'Book a Retreat',
  description: 'Calculate your deposit and reserve your Allpayacu jungle retreat or ayahuasca ceremony via WhatsApp or Telegram.',
};

export default function BookingPage({ searchParams }: { searchParams: { pkg?: string } }) {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-jungle-gradient text-white text-center px-4">
        <p className="section-label text-jungle-cream mb-3">Reserve</p>
        <h1 className="font-display text-4xl md:text-5xl text-white mb-4">Book Your Journey</h1>
        <p className="text-white/70 max-w-lg mx-auto">
          Select a package, enter your party size, and we&apos;ll calculate your total and 30% deposit.
          Then connect with us directly to confirm your dates.
        </p>
      </section>

      <div className="absolute inset-x-0" style={{ marginTop: '-1px' }}>
        <svg viewBox="0 0 1440 40" className="w-full" preserveAspectRatio="none" style={{ background: 'linear-gradient(135deg, #052919 0%, #083f24 40%, #0c6438 70%, #0a5430 100%)' }}>
          <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" fill="#f9fafb" />
        </svg>
      </div>

      <section className="py-16 bg-stone-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Calculator */}
            <BookingCalculator preselectedSlug={searchParams.pkg} />

            {/* Info panel */}
            <div className="space-y-6">
              <div className="card p-6">
                <h3 className="font-display text-xl text-stone-900 mb-4">How it works</h3>
                <ol className="space-y-4">
                  {[
                    { n: '1', t: 'Calculate', b: 'Select your package and number of guests. We show you the total, deposit (30%), and balance due on arrival.' },
                    { n: '2', t: 'Reserve', b: 'Tap WhatsApp or Telegram. A pre-filled message with your package details is sent directly to our team.' },
                    { n: '3', t: 'Confirm', b: 'We confirm availability and send deposit payment instructions. No payment is taken through this website.' },
                    { n: '4', t: 'Arrive', b: 'Pay the remaining 70% balance when you arrive at the eco-lodge. No hidden fees.' },
                  ].map((s) => (
                    <li key={s.n} className="flex items-start gap-4">
                      <span className="w-8 h-8 rounded-full bg-jungle-500 text-white flex items-center justify-center text-sm font-bold shrink-0">
                        {s.n}
                      </span>
                      <div>
                        <p className="font-semibold text-stone-900">{s.t}</p>
                        <p className="text-stone-500 text-sm">{s.b}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="card p-6 bg-jungle-50 border border-jungle-200">
                <h3 className="font-display text-lg text-jungle-700 mb-2">Transparent pricing</h3>
                <p className="text-jungle-600 text-sm leading-relaxed">
                  All prices shown are per person with no hidden fees. Accommodation, meals, guides, river transport, and activities are included as listed for each package. Only optional add-ons are charged separately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
