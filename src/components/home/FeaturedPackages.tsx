import Link from 'next/link';
import { getFeaturedPackages } from '@/data/packages';
import PackageCard from '@/components/packages/PackageCard';

export default function FeaturedPackages() {
  const featured = getFeaturedPackages();

  return (
    <section id="featured-packages" className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="section-label mb-2">Experiences</p>
            <h2 className="section-title">Featured Packages</h2>
          </div>
          <Link href="/packages" className="btn-outline shrink-0">
            View all packages →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        {/* Customize CTA */}
        <div id="featured-packages-customize-cta" className="mt-10 p-6 bg-white rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-stone-900 mb-1">Can&apos;t find exactly what you need?</p>
            <p className="text-stone-500 text-sm">All packages can be tailored — contact us to customise your itinerary.</p>
          </div>
          <div id="featured-packages-chat-buttons" className="flex gap-3 shrink-0">
            <a
              id="featured-packages-whatsapp-btn"
              href="https://wa.me/51965893257"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp to customise a package"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:scale-105"
              style={{ backgroundColor: '#25D366' }}
            >
              WhatsApp
            </a>
            <a
              id="featured-packages-telegram-btn"
              href="https://t.me/allpayacu"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on Telegram to customise a package"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:scale-105"
              style={{ backgroundColor: '#2AABEE' }}
            >
              Telegram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
