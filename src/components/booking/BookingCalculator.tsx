'use client';

import { useState, useMemo } from 'react';
import { packages, addOns, GROUP_DISCOUNT_THRESHOLD, GROUP_DISCOUNT_NOTE, CUSTOMIZE_NOTE, WHATSAPP_NUMBER, TELEGRAM_USERNAME, type Package, type AddOn } from '@/data/packages';

const DEPOSIT_RATE = 0.3;

function buildWhatsAppMessage(item: Package | AddOn, guests: number, total: number, deposit: number): string {
  const label = 'name' in item ? item.name : '';
  const remaining = total - deposit;
  return encodeURIComponent(
    `Hi Allpayacu! I'd like to reserve:\n\n` +
    `📦 Package: ${label}\n` +
    `👥 Guests: ${guests}\n` +
    `💵 Total: $${total.toLocaleString()}\n` +
    `💳 Deposit (30%): $${deposit.toLocaleString()}\n` +
    `🏕️ Remaining on arrival: $${remaining.toLocaleString()}\n\n` +
    `Please confirm availability and next steps. Thank you!`
  );
}

type Item = Package | AddOn;

export default function BookingCalculator({ preselectedSlug }: { preselectedSlug?: string }) {
  const allItems: Item[] = useMemo(() => [...packages, ...addOns], []);

  const [selectedSlug, setSelectedSlug] = useState<string>(
    preselectedSlug ?? packages[0].slug
  );
  const [guests, setGuests] = useState(1);

  const selectedItem = useMemo(
    () => allItems.find((i) => i.slug === selectedSlug) ?? packages[0],
    [selectedSlug, allItems]
  );

  const price = selectedItem.price;
  const pricingType = selectedItem.pricingType;
  const total = price * guests;
  const deposit = Math.round(total * DEPOSIT_RATE);
  const remaining = total - deposit;
  const isGroupSize = guests >= GROUP_DISCOUNT_THRESHOLD;

  const waMsg = buildWhatsAppMessage(selectedItem, guests, total, deposit);
  const waLink = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${waMsg}`;
  const tgLink = `https://t.me/${TELEGRAM_USERNAME}`;

  const perLabel = pricingType === 'per-session' ? 'session' : pricingType === 'per-activity' ? 'activity' : 'person';

  return (
    <div id="booking-calculator" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-lg w-full mx-auto">
      <h2 className="font-display text-2xl text-stone-900 mb-6">Reserve Your Journey</h2>

      {/* Package selector */}
      <div id="booking-package-selector" className="mb-5">
        <label htmlFor="booking-package-select" className="block text-sm font-semibold text-stone-700 mb-2">Select Package</label>
        <select
          id="booking-package-select"
          value={selectedSlug}
          onChange={(e) => { setSelectedSlug(e.target.value); setGuests(1); }}
          className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-jungle-500 bg-white"
        >
          <optgroup label="Amazon Tours">
            {packages.filter((p) => p.category === 'tours').map((p) => (
              <option key={p.slug} value={p.slug}>{p.duration} – {p.name} (${p.price.toLocaleString()}/person)</option>
            ))}
          </optgroup>
          <optgroup label="Jungle Survival">
            {packages.filter((p) => p.category === 'jungle-survival').map((p) => (
              <option key={p.slug} value={p.slug}>{p.duration} – {p.name} (${p.price.toLocaleString()}/person)</option>
            ))}
          </optgroup>
          <optgroup label="Ayahuasca – Bora">
            {packages.filter((p) => p.category === 'ayahuasca-bora').map((p) => (
              <option key={p.slug} value={p.slug}>{p.duration} – {p.name} (${p.price.toLocaleString()}/person)</option>
            ))}
          </optgroup>
          <optgroup label="Ayahuasca – Yagua">
            {packages.filter((p) => p.category === 'ayahuasca-yagua').map((p) => (
              <option key={p.slug} value={p.slug}>{p.duration} – {p.name} (${p.price.toLocaleString()}/person)</option>
            ))}
          </optgroup>
          <optgroup label="Add-ons & Activities">
            {addOns.map((a) => (
              <option key={a.slug} value={a.slug}>{a.name} (${a.price}/{a.pricingType.replace('per-', '')})</option>
            ))}
          </optgroup>
        </select>
      </div>

      {/* Guest stepper */}
      <div id="booking-guest-stepper" className="mb-6">
        <label className="block text-sm font-semibold text-stone-700 mb-2">
          Number of {perLabel === 'person' ? 'guests' : perLabel + 's'}
        </label>
        <div className="flex items-center gap-4">
          <button
            id="booking-guests-decrease"
            onClick={() => setGuests((g) => Math.max(1, g - 1))}
            className="w-11 h-11 rounded-full border-2 border-stone-200 flex items-center justify-center text-stone-600 hover:border-jungle-500 hover:text-jungle-500 transition-colors text-xl font-bold"
            aria-label="Decrease guest count"
          >
            −
          </button>
          <span className="text-2xl font-bold text-stone-900 min-w-[2rem] text-center">{guests}</span>
          <button
            id="booking-guests-increase"
            onClick={() => setGuests((g) => g + 1)}
            className="w-11 h-11 rounded-full border-2 border-stone-200 flex items-center justify-center text-stone-600 hover:border-jungle-500 hover:text-jungle-500 transition-colors text-xl font-bold"
            aria-label="Increase guest count"
          >
            +
          </button>
          <span className="text-sm text-stone-400">${price.toLocaleString()} per {perLabel}</span>
        </div>
      </div>

      {/* Price breakdown */}
      <div id="booking-price-breakdown" className="bg-stone-50 rounded-xl p-5 mb-5 space-y-3">
        <div className="flex justify-between text-sm text-stone-600">
          <span>${price.toLocaleString()} × {guests} {perLabel}{guests > 1 ? 's' : ''}</span>
          <span className="font-semibold">${total.toLocaleString()}</span>
        </div>
        <div className="border-t border-stone-200 pt-3 space-y-2">
          <div className="flex justify-between">
            <span className="font-semibold text-stone-900">Total</span>
            <span className="font-bold text-xl text-stone-900">${total.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-earth-orange">
            <span className="font-semibold">Deposit due to confirm (30%)</span>
            <span className="font-bold">${deposit.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-stone-500 text-sm">
            <span>Remaining due on arrival</span>
            <span>${remaining.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Group note */}
      {isGroupSize && (
        <div className="bg-jungle-50 border border-jungle-200 rounded-xl p-4 mb-5 text-sm text-jungle-700">
          <span className="font-semibold">Group of {guests}?</span> {GROUP_DISCOUNT_NOTE}
        </div>
      )}

      {/* Customize note */}
      <p className="text-xs text-stone-400 mb-5 text-center">{CUSTOMIZE_NOTE}</p>

      {/* CTA buttons */}
      <div id="booking-cta-buttons" className="flex flex-col sm:flex-row gap-3">
        <a
          id="booking-reserve-whatsapp"
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Reserve via WhatsApp — sends your booking summary"
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-semibold text-sm text-white transition-all hover:scale-105"
          style={{ backgroundColor: '#25D366' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
          Reserve via WhatsApp
        </a>
        <a
          id="booking-reserve-telegram"
          href={tgLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Reserve via Telegram"
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-semibold text-sm text-white transition-all hover:scale-105"
          style={{ backgroundColor: '#2AABEE' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>
          Reserve via Telegram
        </a>
      </div>

      <p className="text-xs text-stone-400 text-center mt-4">
        No payment taken online — your deposit is arranged after we confirm availability.
      </p>
    </div>
  );
}
