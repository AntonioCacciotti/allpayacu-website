'use client';

import type { Category } from '@/data/packages';

const ALL = 'all';
type FilterValue = Category | typeof ALL;

const filters: { value: FilterValue; label: string }[] = [
  { value: ALL, label: 'All Packages' },
  { value: 'tours', label: 'Amazon Tours' },
  { value: 'jungle-survival', label: 'Jungle Survival' },
  { value: 'ayahuasca-bora', label: 'Ayahuasca – Bora' },
  { value: 'ayahuasca-yagua', label: 'Ayahuasca – Yagua' },
  { value: 'addons', label: 'Add-ons' },
];

interface Props {
  active: FilterValue;
  onChange: (v: FilterValue) => void;
}

export default function PackageFilter({ active, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
            active === f.value
              ? 'bg-jungle-500 text-white border-jungle-500'
              : 'bg-white text-stone-600 border-stone-200 hover:border-jungle-500 hover:text-jungle-500'
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
