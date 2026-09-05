import type { Metadata } from 'next';
import { SERVICE_ICON } from '@/data/serviceContent';
import { venueRental } from '@/data/venueRental';
import GalleryPlaceholder from '@/components/shared/GalleryPlaceholder';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Photos from jungle adventures, ayahuasca ceremonies and the venue-rental lodge at Allpayacu.',
};

// Placeholder captions until real photos are supplied — swap in images with
// no layout change needed once they're ready (see GalleryPlaceholder).
const galleries = [
  {
    key: 'jungle-adventure' as const,
    title: 'Jungle Exploration',
    blurb: 'River navigation, wildlife and remote-community life on Amazon Tours and Jungle Survival trips.',
    captions: ['River canoe', 'Wildlife spotting', 'Jungle camp', 'Village visit'],
  },
  {
    key: 'ayahuasca-ceremony' as const,
    title: 'Ayahuasca Ceremony',
    blurb: 'The maloca, the lodge and the forest that hold every Bora and Yagua ceremony.',
    captions: ['Ceremonial maloca', 'Eco-lodge room', 'Integration circle', 'Forest trail'],
  },
];

export default function GalleryPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-jungle-gradient text-white text-center px-4">
        <p className="section-label text-jungle-cream mb-3">Gallery</p>
        <h1 className="font-display text-4xl md:text-5xl text-white mb-4">See Allpayacu</h1>
        <p className="text-white/70 max-w-xl mx-auto text-lg">
          Jungle adventure, ceremony and the venue-rental lodge — placeholder tiles for now, real photos to follow.
        </p>
      </section>

      <div className="-mt-1 bg-jungle-gradient">
        <svg viewBox="0 0 1440 40" className="w-full" preserveAspectRatio="none">
          <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" fill="white" />
        </svg>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {galleries.map((g) => (
            <div key={g.key}>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-9 h-9 rounded-lg bg-jungle-50 flex items-center justify-center text-base">{SERVICE_ICON[g.key]}</span>
                <h2 className="font-display text-2xl text-stone-900">{g.title}</h2>
              </div>
              <p className="text-stone-500 text-sm mb-5 max-w-2xl">{g.blurb}</p>
              <GalleryPlaceholder captions={g.captions} />
            </div>
          ))}

          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-9 h-9 rounded-lg bg-stone-100 flex items-center justify-center text-base">{venueRental.icon}</span>
              <h2 className="font-display text-2xl text-stone-900">Venue Rental</h2>
            </div>
            <p className="text-stone-500 text-sm mb-5 max-w-2xl">
              The lodge itself — bungalows, chill-out areas and the river — available for full-lodge bookings.
            </p>
            <GalleryPlaceholder captions={venueRental.gallery} />
          </div>
        </div>
      </section>
    </>
  );
}
