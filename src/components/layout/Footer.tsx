import Link from 'next/link';
import Image from 'next/image';
import { WHATSAPP_NUMBER, TELEGRAM_USERNAME } from '@/data/packages';

const footerPackages = [
  { label: 'Amazon Tours', href: '/packages?cat=tours' },
  { label: 'Jungle Survival', href: '/packages?cat=jungle-survival' },
  { label: 'Ayahuasca – Bora', href: '/packages?cat=ayahuasca-bora' },
  { label: 'Ayahuasca – Yagua', href: '/packages?cat=ayahuasca-yagua' },
  { label: 'Venue Rental', href: '/venue-rental' },
  { label: 'Add-ons & Activities', href: '/packages?cat=addons' },
];

const footerLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Footer() {
  return (
    <footer id="site-footer" className="bg-jungle-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image src="/logo.svg" alt="Allpayacu" width={52} height={52} />
              <span className="font-display font-bold text-xl">Allpayacu</span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed mb-4">
              Indigenous-owned Amazon retreats in Iquitos, Peru. Rooted in Yagua tradition.
            </p>
            <p className="text-jungle-cream font-display italic text-sm">
              &ldquo;For the People – For the Spirit – For the Jungle&rdquo;
            </p>
          </div>

          {/* Packages */}
          <div>
            <h4 className="font-semibold text-sm tracking-widest uppercase text-earth-orange mb-4">
              Packages
            </h4>
            <ul className="space-y-2">
              {footerPackages.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-stone-400 hover:text-white text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-sm tracking-widest uppercase text-earth-orange mb-4">
              Company
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-stone-400 hover:text-white text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm tracking-widest uppercase text-earth-orange mb-4">
              Contact Us
            </h4>
            <div className="space-y-3">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-stone-400 hover:text-white text-sm transition-colors"
              >
                <span className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: '#25D366' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                </span>
                WhatsApp
              </a>
              <a
                href={`https://t.me/${TELEGRAM_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-stone-400 hover:text-white text-sm transition-colors"
              >
                <span className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: '#2AABEE' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>
                </span>
                Telegram
              </a>
              <p className="text-stone-400 text-sm">📍 Iquitos, Loreto, Peru</p>
              <div className="flex gap-4 mt-2">
                <a href="https://instagram.com/allpayacu.adventures" target="_blank" rel="noopener noreferrer"
                  className="text-stone-400 hover:text-white transition-colors text-xs uppercase tracking-wider">
                  Instagram
                </a>
                <a href="https://facebook.com/allpayacu" target="_blank" rel="noopener noreferrer"
                  className="text-stone-400 hover:text-white transition-colors text-xs uppercase tracking-wider">
                  Facebook
                </a>
                <a href="https://tiktok.com/@allpayacu.adventures" target="_blank" rel="noopener noreferrer"
                  className="text-stone-400 hover:text-white transition-colors text-xs uppercase tracking-wider">
                  TikTok
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-jungle-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-stone-500 text-xs">
            © {new Date().getFullYear()} Allpayacu Adventures. All rights reserved.
          </p>
          <p className="text-stone-600 text-xs italic">
            allpa (earth) + yacu (water) — the relationship between land and river that sustains life.
          </p>
        </div>
      </div>
    </footer>
  );
}
