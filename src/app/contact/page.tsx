import type { Metadata } from 'next';
import { WHATSAPP_NUMBER, TELEGRAM_USERNAME } from '@/data/packages';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Reach out to Allpayacu via WhatsApp or Telegram. We\'re based in Iquitos, Peru.',
};

const faqs = [
  {
    q: 'Where exactly is Allpayacu located?',
    a: 'We are based in Iquitos, Loreto, Peru — the largest city in the world not accessible by road. Our eco-lodge is accessible only by river, surrounded by primary Amazon forest.',
  },
  {
    q: 'How do I get to the eco-lodge?',
    a: 'You fly into Iquitos (IQT). We arrange all river transport from Iquitos to the lodge. The journey itself is part of the experience.',
  },
  {
    q: 'Is ayahuasca safe?',
    a: 'All ceremony participants complete a health screening before arrival. We have first aid support on site. Certain medications and health conditions are contraindicated — we review this with every guest individually.',
  },
  {
    q: 'Do I need experience with plant medicine?',
    a: 'No. Both first-time and experienced participants are welcome. Our preparation process is thorough regardless of your background.',
  },
  {
    q: 'Can I combine a tour with an ayahuasca retreat?',
    a: 'Yes — this is one of the things that makes Allpayacu unique. Many guests combine jungle adventure programs with ceremonial work. Contact us to design a combined itinerary.',
  },
  {
    q: 'How far in advance should I book?',
    a: 'We recommend booking at least 4–6 weeks in advance for ceremony retreats to allow time for preparation and dietary guidance. Tours can often be arranged on shorter notice.',
  },
];

export default function ContactPage() {
  const waLink = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}`;
  const tgLink = `https://t.me/${TELEGRAM_USERNAME}`;

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-jungle-gradient text-white relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="section-label text-jungle-cream mb-3">Get in Touch</p>
          <h1 className="font-display text-4xl md:text-5xl text-white mb-4">We&apos;re here to connect</h1>
          <p className="text-white/70 text-lg">
            Reach out on WhatsApp or Telegram — we respond quickly and speak English, Spanish, and Portuguese.
          </p>
        </div>

        <div className="absolute bottom-0 inset-x-0">
          <svg viewBox="0 0 1440 40" className="w-full" preserveAspectRatio="none">
            <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" fill="white" />
          </svg>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* WhatsApp */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group card p-8 flex flex-col items-center text-center gap-4 hover:border-[#25D366] border-2 border-transparent transition-all"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform" style={{ backgroundColor: '#25D366' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
              </div>
              <div>
                <h3 className="font-display font-semibold text-stone-900 text-xl mb-1">WhatsApp</h3>
                <p className="text-stone-500 text-sm mb-2">Tap to open a chat</p>
                <p className="font-semibold text-stone-700">{WHATSAPP_NUMBER}</p>
              </div>
              <span className="text-sm font-semibold text-[#25D366] mt-auto">Open WhatsApp →</span>
            </a>

            {/* Telegram */}
            <a
              href={tgLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group card p-8 flex flex-col items-center text-center gap-4 hover:border-[#2AABEE] border-2 border-transparent transition-all"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform" style={{ backgroundColor: '#2AABEE' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>
              </div>
              <div>
                <h3 className="font-display font-semibold text-stone-900 text-xl mb-1">Telegram</h3>
                <p className="text-stone-500 text-sm mb-2">Message us anytime</p>
                <p className="font-semibold text-stone-700">@{TELEGRAM_USERNAME}</p>
              </div>
              <span className="text-sm font-semibold text-[#2AABEE] mt-auto">Open Telegram →</span>
            </a>
          </div>

          {/* Location */}
          <div className="card p-6 mb-16 flex flex-col sm:flex-row items-center gap-6">
            <div className="text-4xl">📍</div>
            <div>
              <h3 className="font-semibold text-stone-900 mb-1">Location</h3>
              <p className="text-stone-600 text-sm">
                Iquitos, Loreto, Peru. Our eco-lodge is accessible only by river — we arrange all transport from Iquitos city. Fly into Iquitos International Airport (IQT).
              </p>
            </div>
          </div>

          {/* FAQ */}
          <div>
            <div className="text-center mb-10">
              <p className="section-label mb-2">FAQ</p>
              <h2 className="section-title">Common questions</h2>
            </div>

            <div className="space-y-4">
              {faqs.map((f) => (
                <details key={f.q} className="group card p-6 cursor-pointer">
                  <summary className="flex items-center justify-between font-semibold text-stone-900 list-none">
                    {f.q}
                    <svg className="w-5 h-5 text-stone-400 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-4 text-stone-600 text-sm leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
