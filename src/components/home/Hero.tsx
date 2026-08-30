import Link from 'next/link';
import ReviewCarousel from '@/components/home/ReviewCarousel';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(160deg, #052919 0%, #083f24 30%, #0c6438 55%, #1a5c3a 75%, #0a3d1f 100%)',
        }}
      />

      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #e5852a22 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, #99242a22 0%, transparent 40%),
                            radial-gradient(circle at 60% 80%, #fff9ae11 0%, transparent 40%)`,
        }}
      />

      <div className="absolute bottom-0 inset-x-0">
        <svg viewBox="0 0 1440 80" className="w-full" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" />
        </svg>
      </div>

      <div id="hero-content" className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto pt-20">
        <h1 id="hero-headline" className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6">
          A Traditional{' '}
          <em className="not-italic" style={{ color: '#fff9ae' }}>Ayahuasca</em>{' '}
          Retreat in the Peruvian Amazon
        </h1>

        <p id="hero-subheadline" className="text-white/75 text-lg sm:text-xl max-w-2xl mx-auto mb-4 leading-relaxed">
          Rooted in Yagua tradition. Held within a living lineage, in the only jungle that could hold it.
        </p>

        <p id="hero-manifesto" className="font-display italic text-jungle-cream/70 text-base mb-10">
          &ldquo;For the People — For the Spirit — For the Jungle&rdquo;
        </p>

        <div id="hero-ctas" className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/packages" id="hero-cta-explore" aria-label="Explore all packages" className="btn-earth text-base px-8 py-4">
            Explore Packages
          </Link>
          <Link href="/booking" id="hero-cta-booking" aria-label="Go to booking calculator" className="btn-outline border-white text-white hover:bg-white hover:text-jungle-700 text-base px-8 py-4">
            Begin Your Journey
          </Link>
        </div>

        <div id="hero-scroll-indicator" className="mt-16 flex flex-col items-center gap-2 text-white/40" aria-hidden="true">
          <span className="text-xs tracking-widest uppercase">Scroll to explore</span>
          <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <ReviewCarousel />
    </section>
  );
}
