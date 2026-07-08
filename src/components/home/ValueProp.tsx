const pillars = [
  {
    icon: '🌿',
    title: 'The Lineage',
    body: 'Held within living Yagua tradition — not a retreat brand, but a ceremonial space connected to the people and land it comes from.',
  },
  {
    icon: '🌊',
    title: 'The Place',
    body: 'One location, deep in the Peruvian Amazon near Iquitos. Accessible only by river. Dense, living forest shaped by water, weather, and time.',
  },
  {
    icon: '🦅',
    title: 'The People',
    body: 'Indigenous-owned and operated. Guided by Shaman Abelardo Campos and May Arriaga Chávez — born of this land and river.',
  },
  {
    icon: '🛡️',
    title: 'Safety First',
    body: 'Every participant goes through health screening and preparation. Your wellbeing is not a disclaimer — it is the foundation of everything we do.',
  },
];

export default function ValueProp() {
  return (
    <section id="value-prop" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="section-label mb-3">Why Allpayacu</p>
          <h2 className="section-title max-w-2xl mx-auto">
            What makes this different from every other retreat
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((p) => (
            <div key={p.title} className="text-center group">
              <div className="w-16 h-16 rounded-2xl bg-jungle-50 flex items-center justify-center text-2xl mx-auto mb-4 group-hover:bg-jungle-500 transition-colors duration-300 group-hover:scale-110 transform">
                <span className="group-hover:grayscale-0">{p.icon}</span>
              </div>
              <h3 className="font-display font-semibold text-stone-900 text-xl mb-2">{p.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>

        {/* Brand etymology */}
        <div className="mt-16 bg-jungle-gradient rounded-2xl p-8 md:p-12 text-center text-white">
          <p className="section-label text-jungle-cream mb-4">The Name</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 mb-6">
            <div>
              <p className="font-display text-3xl font-bold text-jungle-cream">allpa</p>
              <p className="text-white/60 text-sm mt-1">earth</p>
            </div>
            <div className="text-earth-orange text-3xl font-light">+</div>
            <div>
              <p className="font-display text-3xl font-bold text-jungle-cream">yacu</p>
              <p className="text-white/60 text-sm mt-1">water</p>
            </div>
          </div>
          <p className="text-white/70 max-w-lg mx-auto text-sm leading-relaxed">
            The relationship between land and river that sustains all life in the Amazon.
            This is not just a name — it is the foundation of everything we do here.
          </p>
        </div>
      </div>
    </section>
  );
}
