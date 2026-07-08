const testimonials = [
  {
    name: 'Sarah M.',
    country: 'United States',
    stars: 5,
    text: 'The most authentic experience I have ever had. Shaman Abelardo holds space with such depth and care. The jungle immersion with May was extraordinary — we saw pink river dolphins on our third day.',
    pkg: 'Yagua Ceremony – 7 Days',
  },
  {
    name: 'Marco T.',
    country: 'Italy',
    stars: 5,
    text: 'I have done ceremonies in other places but Allpayacu is different. You can feel that this is a living tradition, not a tourist product. The safety-first approach gave me full confidence to surrender to the process.',
    pkg: 'Bora Ceremony – 14 Days',
  },
  {
    name: 'Emma R.',
    country: 'United Kingdom',
    stars: 5,
    text: 'The Amazon Journey package was life-changing. The team\'s knowledge of the jungle, the river, and the wildlife is unparalleled. Indigenous-owned matters — you feel the authenticity in everything.',
    pkg: 'The Amazon Journey 7D/6N',
  },
];

const reviewPlatforms = [
  { name: 'TripAdvisor', badge: '⭐ Excellent' },
  { name: 'Google', badge: '4.9 / 5.0' },
  { name: 'Retreat.guru', badge: 'Verified' },
];

export default function TrustSignals() {
  return (
    <section id="trust-signals" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Review platform badges */}
        <div id="review-platform-badges" className="flex flex-wrap items-center justify-center gap-6 mb-16 py-6 border-y border-stone-100">
          {reviewPlatforms.map((p) => (
            <div key={p.name} className="flex items-center gap-2 text-stone-500">
              <span className="font-semibold text-stone-700">{p.name}</span>
              <span className="text-sm bg-stone-100 px-2 py-0.5 rounded-full">{p.badge}</span>
            </div>
          ))}
          <div className="text-stone-400 text-sm">· Verified reviews from real guests</div>
        </div>

        <div className="text-center mb-12">
          <p className="section-label mb-2">Guest Stories</p>
          <h2 className="section-title">What our guests say</h2>
        </div>

        <div id="testimonials-grid" className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.name} id={`testimonial-${t.name.toLowerCase().replace(/\s|\./g, '-')}`} className="card p-6 flex flex-col">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <span key={i} className="text-earth-orange text-lg">★</span>
                ))}
              </div>
              <p className="text-stone-600 text-sm leading-relaxed flex-1 mb-4 italic">&ldquo;{t.text}&rdquo;</p>
              <div className="border-t border-stone-100 pt-4">
                <p className="font-semibold text-stone-900 text-sm">{t.name}</p>
                <p className="text-stone-400 text-xs">{t.country} · {t.pkg}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Journey process */}
        <div id="journey-process" className="mt-20">
          <div className="text-center mb-12">
            <p className="section-label mb-2">The Process</p>
            <h2 className="section-title">Your path from here</h2>
          </div>

          <div className="relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-[16.66%] right-[16.66%] h-0.5 bg-gradient-to-r from-earth-orange to-jungle-500" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Preparation',
                  body: 'We guide you through health screening, dietary preparation, and intention-setting before you arrive.',
                },
                {
                  step: '02',
                  title: 'Retreat',
                  body: 'Ceremonies, jungle immersion, river navigation, and deep connection with the Amazon and its people.',
                },
                {
                  step: '03',
                  title: 'Integration',
                  body: 'We support you after you leave — with integration resources and follow-up calls to help the journey continue.',
                },
              ].map((s) => (
                <div key={s.step} className="text-center relative">
                  <div className="w-20 h-20 rounded-full bg-white border-4 border-jungle-500 flex items-center justify-center mx-auto mb-5 relative z-10">
                    <span className="font-display font-bold text-jungle-500 text-2xl">{s.step}</span>
                  </div>
                  <h3 className="font-display font-semibold text-stone-900 text-xl mb-2">{s.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed max-w-xs mx-auto">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
