import Link from 'next/link';
import { SERVICE_ICON } from '@/data/serviceContent';
import { venueRental } from '@/data/venueRental';

const cards = [
  {
    group: 'jungle-adventure' as const,
    title: 'Jungle Adventure',
    body: 'Amazon Tours and Jungle Survival immersions guided by May Arriaga, twenty years on this river. Wildlife, remote communities and real bush-craft — from a first three-day taste to a two-week deep immersion.',
    meta: '3–14 days · Amazon Tours & Jungle Survival',
    href: '/packages?group=jungle-adventure',
    cta: 'See jungle packages',
  },
  {
    group: 'ayahuasca-ceremony' as const,
    title: 'Ayahuasca Ceremony',
    body: 'Held in living Bora and Yagua lineage, with a facilitator, yoga & meditation guidance, and a psychotherapist on the team. Built for people who need more than a holiday — real screening, real aftercare.',
    meta: '7–21 days · Bora & Yagua lineage',
    href: '/packages?group=ayahuasca-ceremony',
    cta: 'See ceremony packages',
  },
];

export default function ThreeWaysIn() {
  return (
    <section id="three-ways-in" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="section-label mb-3">Three Ways In</p>
          <h2 className="section-title max-w-2xl mx-auto">
            One family, one stretch of river, three ways to arrive
          </h2>
          <p className="text-stone-500 mt-4 max-w-xl mx-auto text-sm">
            Everything below comes from the same lodge on Kukama territory outside Iquitos. Which door you come through depends on what you&apos;re here for.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((c) => (
            <div key={c.group} className="card p-7 flex flex-col gap-3 border border-stone-100">
              <div className="w-12 h-12 rounded-xl bg-jungle-50 flex items-center justify-center text-xl">
                {SERVICE_ICON[c.group]}
              </div>
              <h3 className="font-display font-semibold text-stone-900 text-xl">{c.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed flex-1">{c.body}</p>
              <p className="text-xs font-semibold text-stone-400 border-t border-stone-100 pt-3">{c.meta}</p>
              <Link href={c.href} className="text-sm font-semibold text-jungle-500 hover:underline">
                {c.cta} →
              </Link>
            </div>
          ))}

          <div className="card p-7 flex flex-col gap-3 border border-stone-100">
            <div className="w-12 h-12 rounded-xl bg-jungle-50 flex items-center justify-center text-xl">
              {venueRental.icon}
            </div>
            <h3 className="font-display font-semibold text-stone-900 text-xl">Venue Rental</h3>
            <p className="text-stone-500 text-sm leading-relaxed flex-1">
              Bring your own group. The lodge — beds, kitchen, ceremonial maloca, river access — is yours for the week. Built for yoga teachers, coaches and wellness facilitators who want an Amazon base without running the logistics.
            </p>
            <p className="text-xs font-semibold text-stone-400 border-t border-stone-100 pt-3">
              {venueRental.bedsToday} beds today, expanding to {venueRental.bedsExpanded} · Full-lodge booking
            </p>
            <Link href="/venue-rental" className="text-sm font-semibold text-jungle-500 hover:underline">
              Enquire about the lodge →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
