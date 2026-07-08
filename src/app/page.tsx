import Hero from '@/components/home/Hero';
import ValueProp from '@/components/home/ValueProp';
import FeaturedPackages from '@/components/home/FeaturedPackages';
import TrustSignals from '@/components/home/TrustSignals';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Hero />
      <ValueProp />
      <FeaturedPackages />
      <TrustSignals />

      {/* Final CTA band */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="section-label mb-3">Begin</p>
          <h2 className="section-title mb-4">Ready to answer the call?</h2>
          <p className="text-stone-500 mb-8 max-w-xl mx-auto">
            Whether you&apos;re drawn by the jungle, the medicine, or the river — we&apos;re here to help you find the right path.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking" className="btn-primary text-base px-8 py-4">
              Calculate your retreat
            </Link>
            <Link href="/packages" className="btn-outline text-base px-8 py-4">
              Browse all packages
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
