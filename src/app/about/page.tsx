import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Allpayacu is an indigenous-owned Amazon retreat centre rooted in Yagua tradition. Meet Shaman Abelardo Campos and guide May Arriaga Chávez.',
};

const team = [
  {
    name: 'Shaman Abelardo Campos',
    role: 'Ceremonial Guide',
    description:
      'Abelardo Campos is the ceremonial anchor of Allpayacu. Holding decades of lineage knowledge in Bora and Yagua tradition, he guides each ceremony with precision, care, and deep connection to the plant. His work is not performance — it is living inheritance.',
    emoji: '🌿',
  },
  {
    name: 'May Arriaga Chávez',
    role: 'Jungle Guide & Co-founder',
    description:
      'May is the daughter of this river and this forest. She leads jungle immersion, river navigation, and wildlife encounters with the knowledge of someone who grew up here. She is also the bridge between guests and the community — translator, host, and guardian of the experience.',
    emoji: '🌊',
  },
];

const values = [
  {
    title: 'Indigenous Ownership',
    body: 'Allpayacu is indigenous-owned and operated. The work remains connected to the people and land it comes from — not extracted for outside profit.',
  },
  {
    title: 'Living Tradition',
    body: 'We do not sell a product. We hold a space within a living ceremonial lineage. The Yagua and Bora traditions are not frameworks — they are ongoing relationships with the forest.',
  },
  {
    title: 'Responsible Tourism',
    body: 'We minimise disturbance to the endangered flora and fauna of the Amazon. Small groups, low footprint, and deep respect for the ecosystem guide every decision.',
  },
  {
    title: 'Safety First',
    body: 'Every participant goes through health screening and preparation before arrival. We have first aid support on site. Your wellbeing is not a disclaimer — it is the foundation of everything we do.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-jungle-gradient text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <p className="section-label text-jungle-cream mb-3">Our Story</p>
          <h1 className="font-display text-4xl md:text-6xl text-white mb-6 leading-tight">
            For the People.<br />For the Spirit.<br />For the Jungle.
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Allpayacu was born from a deep commitment to authentic Amazonian experience — adventure, ceremony, and conservation, all in one place.
          </p>
        </div>

        <div className="absolute bottom-0 inset-x-0">
          <svg viewBox="0 0 1440 40" className="w-full" preserveAspectRatio="none">
            <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <p className="section-label mb-3">The Name</p>
              <h2 className="section-title mb-4">allpa + yacu</h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                In the Quechua language spoken across the Amazon, <strong>allpa</strong> means earth and <strong>yacu</strong> means water. Together they name the relationship between land and river that sustains all life here.
              </p>
              <p className="text-stone-600 leading-relaxed">
                This is not just a name — it is a philosophy. Everything we do at Allpayacu is in service of that relationship: between the human and the forest, the participant and the plant, the visitor and the community.
              </p>
            </div>
            <div className="bg-jungle-gradient rounded-2xl p-10 text-center text-white">
              <div className="flex justify-center gap-8 mb-6">
                <div>
                  <p className="font-display text-4xl font-bold text-jungle-cream">allpa</p>
                  <p className="text-white/60 text-sm mt-1">earth</p>
                </div>
                <div className="text-earth-orange text-4xl font-light self-center">+</div>
                <div>
                  <p className="font-display text-4xl font-bold text-jungle-cream">yacu</p>
                  <p className="text-white/60 text-sm mt-1">water</p>
                </div>
              </div>
              <p className="text-white/60 text-sm italic">
                The relationship between land and river that sustains life.
              </p>
            </div>
          </div>

          <div className="prose max-w-none text-stone-600 space-y-4">
            <p>
              We are based in Iquitos, Loreto — the largest city in the world not accessible by road, deep in the Peruvian Amazon. Our eco-lodge sits on the river, accessible only by boat, surrounded by primary forest.
            </p>
            <p>
              Allpayacu runs two complementary operations: an adventure and jungle tourism program led by May Arriaga Chávez, and a ceremonial ayahuasca retreat program guided by Shaman Abelardo Campos. They are not separate businesses — they are one relationship with the same land.
            </p>
            <p>
              We are an experienced, but humble company. We are not trying to scale. We are trying to go deeper.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-label mb-2">The Guides</p>
            <h2 className="section-title">Who you&apos;ll journey with</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {team.map((t) => (
              <div key={t.name} className="card p-8 flex gap-6">
                <div className="w-16 h-16 rounded-2xl bg-jungle-gradient flex items-center justify-center text-3xl shrink-0">
                  {t.emoji}
                </div>
                <div>
                  <p className="font-display font-semibold text-stone-900 text-xl">{t.name}</p>
                  <p className="text-earth-orange text-sm font-semibold mb-3">{t.role}</p>
                  <p className="text-stone-600 text-sm leading-relaxed">{t.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-label mb-2">How We Work</p>
            <h2 className="section-title">Our commitments</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-stone-50 rounded-2xl p-6 border border-stone-100">
                <h3 className="font-display font-semibold text-stone-900 text-lg mb-2">{v.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-jungle-gradient text-center text-white px-4">
        <h2 className="font-display text-3xl mb-4">Ready to connect?</h2>
        <p className="text-white/70 mb-8 max-w-md mx-auto">
          Whether you have questions about the ceremony, the jungle, or logistics — we are here.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="btn-earth">Contact Us</Link>
          <Link href="/packages" className="btn-outline border-white text-white hover:bg-white hover:text-jungle-700">
            View Packages
          </Link>
        </div>
      </section>
    </>
  );
}
