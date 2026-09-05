import PackagesPageClient from './PackagesPageClient';
import type { Category, ServiceGroup } from '@/data/packages';

type FilterValue = Category | ServiceGroup | 'all';

const VALID_FILTERS: FilterValue[] = [
  'all',
  'addons',
  'tours',
  'jungle-survival',
  'ayahuasca-bora',
  'ayahuasca-yagua',
  'jungle-adventure',
  'ayahuasca-ceremony',
];

export default function PackagesPage({ searchParams }: { searchParams: { cat?: string; group?: string } }) {
  const requested = searchParams.group ?? searchParams.cat;
  const initial: FilterValue = VALID_FILTERS.includes(requested as FilterValue) ? (requested as FilterValue) : 'all';

  return <PackagesPageClient initial={initial} />;
}
