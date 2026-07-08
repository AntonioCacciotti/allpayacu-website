import Link from 'next/link';
import type { Package } from '@/data/packages';
import { CATEGORY_LABELS } from '@/data/packages';

const categoryColors: Record<string, string> = {
  tours: 'bg-jungle-100 text-jungle-700',
  'jungle-survival': 'bg-amber-100 text-amber-800',
  'ayahuasca-bora': 'bg-purple-100 text-purple-800',
  'ayahuasca-yagua': 'bg-rose-100 text-rose-800',
};

interface Props {
  pkg: Package;
  compact?: boolean;
}

export default function PackageCard({ pkg, compact = false }: Props) {
  const catColor = categoryColors[pkg.category] ?? 'bg-stone-100 text-stone-700';

  return (
    <div className="card flex flex-col overflow-hidden group">
      {/* Placeholder image */}
      <div className={`relative overflow-hidden ${compact ? 'h-36' : 'h-52'} bg-jungle-gradient`}>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <span className="text-jungle-cream/60 text-4xl mb-1">🌿</span>
          <span className="text-jungle-cream/80 font-display italic text-sm">{pkg.duration}</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-3 left-3">
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${catColor}`}>
            {CATEGORY_LABELS[pkg.category]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display font-semibold text-stone-900 text-lg leading-tight group-hover:text-jungle-500 transition-colors">
            {pkg.name}
          </h3>
          <div className="text-right shrink-0">
            <p className="text-jungle-500 font-bold text-xl">${pkg.price.toLocaleString()}</p>
            <p className="text-stone-400 text-xs">{pkg.pricingType.replace('-', ' ')}</p>
          </div>
        </div>

        <p className="text-stone-500 text-sm leading-relaxed mb-4 flex-1">{pkg.shortDescription}</p>

        {!compact && (
          <ul className="space-y-1 mb-4">
            {pkg.highlights.slice(0, 3).map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-stone-600">
                <span className="text-earth-orange mt-0.5 shrink-0">✓</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="flex items-center gap-2 mt-auto pt-2">
          <Link href={`/packages/${pkg.slug}`} className="btn-primary flex-1 justify-center text-xs">
            View Details
          </Link>
          <Link href={`/booking?pkg=${pkg.slug}`} className="btn-outline text-xs px-4 py-3">
            Book
          </Link>
        </div>
      </div>
    </div>
  );
}
