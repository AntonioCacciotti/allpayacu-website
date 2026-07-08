'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { packages, CATEGORY_LABELS, type Category } from '@/data/packages';

const categories: Category[] = ['tours', 'jungle-survival', 'ayahuasca-bora', 'ayahuasca-yagua', 'addons'];

const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };

  const closeMega = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 150);
  };

  return (
    <header
      id="site-header"
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" id="nav-logo" aria-label="Allpayacu — go to homepage" className="flex items-center gap-3 shrink-0">
            <Image src="/logo.svg" alt="Allpayacu" width={48} height={48} priority />
            <span
              className={`font-display font-bold text-lg hidden sm:block transition-colors duration-300 ${
                scrolled ? 'text-jungle-700' : 'text-white'
              }`}
            >
              Allpayacu
            </span>
          </Link>

          {/* Desktop nav */}
          <nav id="desktop-nav" aria-label="Main navigation" className="hidden md:flex items-center gap-1">
            {/* Packages mega-menu trigger */}
            <button
              id="nav-packages-trigger"
              aria-label="Browse packages menu"
              aria-expanded={megaOpen}
              aria-controls="packages-mega-menu"
              onMouseEnter={openMega}
              onMouseLeave={closeMega}
              onClick={() => setMegaOpen((v) => !v)}
              className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                scrolled ? 'text-stone-700 hover:text-jungle-500' : 'text-white/90 hover:text-white'
              }`}
            >
              Packages
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${megaOpen ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                id={`nav-link-${l.label.toLowerCase()}`}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                  scrolled ? 'text-stone-700 hover:text-jungle-500' : 'text-white/90 hover:text-white'
                }`}
              >
                {l.label}
              </Link>
            ))}

            <Link
              href="/booking"
              id="nav-book-now"
              aria-label="Open booking calculator"
              className="ml-2 btn-primary text-xs"
            >
              Book Now
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-toggle"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className={`md:hidden p-2 rounded-md transition-colors ${scrolled ? 'text-stone-700' : 'text-white'}`}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mega-menu dropdown */}
      {megaOpen && (
        <div
          id="packages-mega-menu"
          role="region"
          aria-label="Packages menu"
          className="hidden md:block absolute top-full inset-x-0 bg-white shadow-2xl border-t border-stone-100"
          onMouseEnter={openMega}
          onMouseLeave={closeMega}
        >
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-5 gap-6">
              {categories.map((cat) => {
                const catPackages = packages.filter((p) => p.category === cat);
                if (cat === 'addons') return null;
                return (
                  <div key={cat} id={`mega-menu-${cat}`}>
                    <p className="section-label text-xs mb-3">{CATEGORY_LABELS[cat]}</p>
                    <ul className="space-y-2">
                      {catPackages.map((pkg) => (
                        <li key={pkg.id}>
                          <Link
                            href={`/packages/${pkg.slug}`}
                            id={`mega-menu-link-${pkg.id}`}
                            onClick={() => setMegaOpen(false)}
                            className="group flex items-start gap-2 text-sm text-stone-700 hover:text-jungle-500 transition-colors"
                          >
                            <span className="mt-0.5 text-earth-orange" aria-hidden="true">→</span>
                            <span className="font-medium">{pkg.duration} – {pkg.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}

              {/* Add-ons column */}
              <div id="mega-menu-addons">
                <p className="section-label text-xs mb-3">Add-ons</p>
                <Link
                  href="/packages?cat=addons"
                  id="mega-menu-link-addons"
                  onClick={() => setMegaOpen(false)}
                  className="text-sm text-jungle-500 hover:underline font-medium"
                >
                  View add-ons →
                </Link>
              </div>
            </div>

            <div id="mega-menu-footer" className="mt-6 pt-6 border-t border-stone-100 flex items-center justify-between">
              <p className="text-sm text-stone-500">
                Travelling with 5+ people?{' '}
                <Link
                  href="/contact"
                  id="mega-menu-group-rates"
                  onClick={() => setMegaOpen(false)}
                  className="text-jungle-500 font-semibold hover:underline"
                >
                  Ask about group rates
                </Link>
              </p>
              <Link
                href="/packages"
                id="mega-menu-view-all"
                onClick={() => setMegaOpen(false)}
                aria-label="View all packages"
                className="btn-primary text-xs"
              >
                View all packages
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <div id="mobile-menu" role="region" aria-label="Mobile navigation menu" className="md:hidden bg-white border-t border-stone-100 shadow-xl">
          <div className="px-4 py-4 space-y-1">
            <p className="section-label text-xs px-3 py-2">Packages</p>
            {categories.filter((c) => c !== 'addons').map((cat) => (
              <div key={cat} id={`mobile-menu-${cat}`} className="pl-3">
                <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">
                  {CATEGORY_LABELS[cat]}
                </p>
                {packages
                  .filter((p) => p.category === cat)
                  .map((pkg) => (
                    <Link
                      key={pkg.id}
                      href={`/packages/${pkg.slug}`}
                      id={`mobile-menu-link-${pkg.id}`}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center py-1.5 text-sm text-stone-700 hover:text-jungle-500"
                    >
                      {pkg.duration} – {pkg.name}
                    </Link>
                  ))}
              </div>
            ))}

            <div id="mobile-menu-nav-links" className="border-t border-stone-100 pt-3 mt-3 space-y-1">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  id={`mobile-nav-link-${l.label.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-semibold text-stone-700 hover:text-jungle-500"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/booking"
                id="mobile-nav-book-now"
                aria-label="Open booking calculator"
                onClick={() => setMenuOpen(false)}
                className="btn-primary mt-2 w-full justify-center"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
