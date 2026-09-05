'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { WHATSAPP_NUMBER } from '@/data/packages';
import { SERVICE_ICON } from '@/data/serviceContent';
import { venueRental } from '@/data/venueRental';

type MenuKey = 'jungle' | 'ayahuasca' | 'venue';

const navLinks = [
  { label: 'Gallery', href: '/gallery' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const waLink = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}`;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openDropdown = (key: MenuKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(key);
  };

  const closeDropdown = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 150);
  };

  const toggleDropdown = (key: MenuKey) => {
    setOpenMenu((v) => (v === key ? null : key));
  };

  const triggerClass = `flex items-center gap-1 px-3.5 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
    scrolled ? 'text-stone-700 hover:text-jungle-500' : 'text-white/90 hover:text-white'
  }`;
  const linkClass = `px-3.5 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
    scrolled ? 'text-stone-700 hover:text-jungle-500' : 'text-white/90 hover:text-white'
  }`;

  const Chevron = ({ open }: { open: boolean }) => (
    <svg
      className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );

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

          {/* Desktop nav — 3 separate service dropdowns, not one combined mega-menu */}
          <nav id="desktop-nav" aria-label="Main navigation" className="hidden lg:flex items-center gap-0.5">
            {/* Jungle Adventure */}
            <div className="relative" onMouseEnter={() => openDropdown('jungle')} onMouseLeave={closeDropdown}>
              <button
                id="nav-jungle-trigger"
                aria-label="Jungle Adventure menu"
                aria-expanded={openMenu === 'jungle'}
                aria-controls="jungle-menu"
                onClick={() => toggleDropdown('jungle')}
                className={triggerClass}
              >
                Jungle Adventure
                <Chevron open={openMenu === 'jungle'} />
              </button>
              {openMenu === 'jungle' && (
                <div id="jungle-menu" role="region" aria-label="Jungle Adventure menu" className="absolute left-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-stone-100 p-5">
                  <div className="w-9 h-9 rounded-lg bg-jungle-50 flex items-center justify-center text-base mb-3">
                    {SERVICE_ICON['jungle-adventure']}
                  </div>
                  <p className="text-xs text-stone-500 mb-4 leading-relaxed">
                    River navigation, wildlife and remote-community immersion, guided by twenty years on this river.
                  </p>
                  <ul className="space-y-2 mb-3">
                    <li>
                      <Link href="/packages?cat=tours" onClick={() => setOpenMenu(null)} className="text-sm font-medium text-stone-700 hover:text-jungle-500 transition-colors">
                        Amazon Tours (3–8 days)
                      </Link>
                    </li>
                    <li>
                      <Link href="/packages?cat=jungle-survival" onClick={() => setOpenMenu(null)} className="text-sm font-medium text-stone-700 hover:text-jungle-500 transition-colors">
                        Jungle Survival (7–14 days)
                      </Link>
                    </li>
                  </ul>
                  <Link href="/packages?group=jungle-adventure" onClick={() => setOpenMenu(null)} className="text-sm text-jungle-500 hover:underline font-medium">
                    View all jungle packages →
                  </Link>
                </div>
              )}
            </div>

            {/* Ayahuasca Ceremony */}
            <div className="relative" onMouseEnter={() => openDropdown('ayahuasca')} onMouseLeave={closeDropdown}>
              <button
                id="nav-ayahuasca-trigger"
                aria-label="Ayahuasca Ceremony menu"
                aria-expanded={openMenu === 'ayahuasca'}
                aria-controls="ayahuasca-menu"
                onClick={() => toggleDropdown('ayahuasca')}
                className={triggerClass}
              >
                Ayahuasca Ceremony
                <Chevron open={openMenu === 'ayahuasca'} />
              </button>
              {openMenu === 'ayahuasca' && (
                <div id="ayahuasca-menu" role="region" aria-label="Ayahuasca Ceremony menu" className="absolute left-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-stone-100 p-5">
                  <div className="w-9 h-9 rounded-lg bg-earth-orange/10 flex items-center justify-center text-base mb-3">
                    {SERVICE_ICON['ayahuasca-ceremony']}
                  </div>
                  <p className="text-xs text-stone-500 mb-4 leading-relaxed">
                    Held within living indigenous lineage, with full-time safety and integration support.
                  </p>
                  <ul className="space-y-2 mb-3">
                    <li>
                      <Link href="/packages?cat=ayahuasca-bora" onClick={() => setOpenMenu(null)} className="text-sm font-medium text-stone-700 hover:text-jungle-500 transition-colors">
                        Bora tradition — 7 / 14 / 21 days
                      </Link>
                    </li>
                    <li>
                      <Link href="/packages?cat=ayahuasca-yagua" onClick={() => setOpenMenu(null)} className="text-sm font-medium text-stone-700 hover:text-jungle-500 transition-colors">
                        Yagua tradition — 7 / 14 / 21 days
                      </Link>
                    </li>
                  </ul>
                  <Link href="/packages?group=ayahuasca-ceremony" onClick={() => setOpenMenu(null)} className="text-sm text-jungle-500 hover:underline font-medium">
                    View all ceremony packages →
                  </Link>
                </div>
              )}
            </div>

            {/* Venue Rental */}
            <div className="relative" onMouseEnter={() => openDropdown('venue')} onMouseLeave={closeDropdown}>
              <button
                id="nav-venue-trigger"
                aria-label="Venue Rental menu"
                aria-expanded={openMenu === 'venue'}
                aria-controls="venue-menu"
                onClick={() => toggleDropdown('venue')}
                className={triggerClass}
              >
                Venue Rental
                <Chevron open={openMenu === 'venue'} />
              </button>
              {openMenu === 'venue' && (
                <div id="venue-menu" role="region" aria-label="Venue Rental menu" className="absolute left-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-stone-100 p-5">
                  <div className="w-9 h-9 rounded-lg bg-stone-100 flex items-center justify-center text-base mb-3">
                    {venueRental.icon}
                  </div>
                  <p className="text-xs text-stone-500 mb-4 leading-relaxed">
                    Rent the whole lodge for your own group — yoga, coaching or wellness retreats.
                  </p>
                  <ul className="space-y-2 mb-3">
                    <li className="text-sm text-stone-500">
                      {venueRental.bedsToday} beds today, {venueRental.bedsExpanded} once expanded
                    </li>
                    <li className="text-sm text-stone-500">{venueRental.bookingUnit}</li>
                  </ul>
                  <Link href="/venue-rental" onClick={() => setOpenMenu(null)} className="text-sm text-jungle-500 hover:underline font-medium">
                    Enquire about the lodge →
                  </Link>
                </div>
              )}
            </div>

            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} id={`nav-link-${l.label.toLowerCase()}`} className={linkClass}>
                {l.label}
              </Link>
            ))}

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              id="nav-whatsapp-cta"
              aria-label="Chat with us on WhatsApp"
              className="ml-2 flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white transition-transform hover:scale-105 shrink-0"
              style={{ backgroundColor: '#25D366' }}
            >
              WhatsApp
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-toggle"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className={`lg:hidden p-2 rounded-md transition-colors ${scrolled ? 'text-stone-700' : 'text-white'}`}
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

      {/* Mobile menu */}
      {menuOpen && (
        <div id="mobile-menu" role="region" aria-label="Mobile navigation menu" className="lg:hidden bg-white border-t border-stone-100 shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="px-4 py-4 space-y-1">
            <p className="section-label text-xs px-3 py-2">Explore</p>

            <div id="mobile-menu-jungle-adventure" className="pl-3 mb-2">
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">Jungle Adventure</p>
              <Link href="/packages?cat=tours" onClick={() => setMenuOpen(false)} className="block py-1.5 text-sm text-stone-700 hover:text-jungle-500">Amazon Tours</Link>
              <Link href="/packages?cat=jungle-survival" onClick={() => setMenuOpen(false)} className="block py-1.5 text-sm text-stone-700 hover:text-jungle-500">Jungle Survival</Link>
            </div>

            <div id="mobile-menu-ayahuasca-ceremony" className="pl-3 mb-2">
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">Ayahuasca Ceremony</p>
              <Link href="/packages?cat=ayahuasca-bora" onClick={() => setMenuOpen(false)} className="block py-1.5 text-sm text-stone-700 hover:text-jungle-500">Bora tradition</Link>
              <Link href="/packages?cat=ayahuasca-yagua" onClick={() => setMenuOpen(false)} className="block py-1.5 text-sm text-stone-700 hover:text-jungle-500">Yagua tradition</Link>
            </div>

            <div id="mobile-menu-venue-rental" className="pl-3 mb-2">
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">Venue Rental</p>
              <Link href="/venue-rental" onClick={() => setMenuOpen(false)} className="block py-1.5 text-sm text-stone-700 hover:text-jungle-500">Rent the lodge</Link>
            </div>

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
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                id="mobile-nav-whatsapp-cta"
                aria-label="Chat with us on WhatsApp"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 mt-2 w-full py-3 rounded-full text-sm font-semibold text-white"
                style={{ backgroundColor: '#25D366' }}
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
