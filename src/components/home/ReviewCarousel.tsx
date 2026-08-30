// Demo-only reviews — fabricated placeholder content for presentation purposes.
type ReviewSource = 'google' | 'tripadvisor';

interface Review {
  source: ReviewSource;
  name: string;
  location: string;
  text: string;
}

const reviews: Review[] = [
  {
    source: 'google',
    name: 'Hannah Weaver',
    location: 'Portland, USA',
    text: 'From the airport pickup in Iquitos to the last ceremony, everything was handled with care. Being indigenous-owned is not a slogan here — you feel it in every conversation.',
  },
  {
    source: 'tripadvisor',
    name: 'Lukas Brandt',
    location: 'Munich, Germany',
    text: 'The safety-first approach is real. Health screening beforehand, an experienced facilitator in every session, and genuine integration support after I flew home.',
  },
  {
    source: 'google',
    name: 'Priya Nair',
    location: 'Bangalore, India',
    text: 'Six days in the jungle with the Yagua family. We saw pink river dolphins, learned about medicinal plants, and the ceremonies were held with incredible depth.',
  },
  {
    source: 'tripadvisor',
    name: 'Marco Ferretti',
    location: 'Bologna, Italy',
    text: 'I have sat in ceremony in three countries. Allpayacu felt like a living tradition rather than a tourist product. Small group, honest guidance, no pressure.',
  },
  {
    source: 'google',
    name: 'Sophie Laurent',
    location: 'Lyon, France',
    text: 'The team communicated clearly on WhatsApp for weeks before arrival, answered every question about preparation and diet, and never once rushed me.',
  },
  {
    source: 'tripadvisor',
    name: 'David Okafor',
    location: 'London, UK',
    text: 'A genuinely life-changing week. The balance of jungle immersion, river navigation and ceremony was perfect, and the aftercare calls made the difference.',
  },
  {
    source: 'google',
    name: 'Emily Carter',
    location: 'Melbourne, Australia',
    text: 'Respectful, grounded and professional. The shaman held space beautifully and the cooks looked after my dietary needs the entire stay. Cannot recommend enough.',
  },
  {
    source: 'tripadvisor',
    name: 'Tomás Herrera',
    location: 'Madrid, Spain',
    text: 'Everything was transparent — pricing, schedule, what to expect. Deposit and payment were simple to arrange directly with the family. Five stars.',
  },
  {
    source: 'google',
    name: 'Anna Kowalski',
    location: 'Warsaw, Poland',
    text: 'The Amazon Journey package exceeded every expectation. Their knowledge of the forest and wildlife is unmatched and the ceremonies were profound.',
  },
  {
    source: 'tripadvisor',
    name: 'James Sullivan',
    location: 'Dublin, Ireland',
    text: 'Traveled solo and never felt anything but safe and welcomed. This is a family sharing their home and their lineage. An unforgettable experience.',
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="Rated 5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="text-earth-orange text-sm leading-none" aria-hidden="true">
          ★
        </span>
      ))}
    </div>
  );
}

function GoogleMark() {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600">
      <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
        <path
          fill="#4285F4"
          d="M23.06 12.25c0-.85-.08-1.67-.22-2.45H12v4.64h6.19c-.27 1.44-1.08 2.66-2.3 3.48v2.9h3.72c2.18-2 3.45-4.96 3.45-8.47z"
        />
        <path
          fill="#34A853"
          d="M12 24c3.12 0 5.73-1.03 7.64-2.79l-3.72-2.9c-1.03.69-2.35 1.1-3.92 1.1-3.01 0-5.56-2.03-6.47-4.77H1.68v3C3.58 21.42 7.48 24 12 24z"
        />
        <path
          fill="#FBBC05"
          d="M5.53 14.64c-.23-.69-.36-1.42-.36-2.28s.13-1.59.36-2.28v-3H1.68A11.99 11.99 0 0 0 .4 12c0 1.94.46 3.77 1.28 5.28l3.85-3z"
        />
        <path
          fill="#EA4335"
          d="M12 4.75c1.7 0 3.22.58 4.42 1.72l3.3-3.3C17.72 1.2 15.11 0 12 0 7.48 0 3.58 2.58 1.68 6.36l3.85 3C6.44 6.78 8.99 4.75 12 4.75z"
        />
      </svg>
      Google
    </span>
  );
}

function TripAdvisorMark() {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600">
      <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
        <circle cx="12" cy="13" r="10.5" fill="#34E0A1" />
        <circle cx="8" cy="13.5" r="3.4" fill="#fff" />
        <circle cx="16" cy="13.5" r="3.4" fill="#fff" />
        <circle cx="8" cy="13.5" r="1.5" fill="#000" />
        <circle cx="16" cy="13.5" r="1.5" fill="#000" />
        <path
          d="M12 8.2c1.7-1.15 3.9-1.8 6.3-1.8-1 1.05-1.6 2.2-1.7 3.5M12 8.2C10.3 7.05 8.1 6.4 5.7 6.4c1 1.05 1.6 2.2 1.7 3.5"
          fill="none"
          stroke="#000"
          strokeWidth="1"
        />
      </svg>
      Tripadvisor
    </span>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="shrink-0 w-[280px] sm:w-[320px] bg-white rounded-xl shadow-xl p-3.5 flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        {review.source === 'google' ? <GoogleMark /> : <TripAdvisorMark />}
        <Stars />
      </div>
      <p className="text-stone-600 text-xs leading-snug italic line-clamp-2">
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="mt-auto pt-1.5 border-t border-stone-100">
        <p className="font-semibold text-stone-900 text-xs">
          {review.name}
          <span className="font-normal text-stone-400"> · {review.location}</span>
        </p>
      </div>
    </article>
  );
}

export default function ReviewCarousel() {
  return (
    <div
      id="hero-reviews"
      aria-label="Guest reviews"
      className="absolute inset-x-0 bottom-0 z-20 pb-6 sm:pb-10 pointer-events-none"
    >
      <div className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]">
        <div className="flex w-max animate-marquee motion-reduce:animate-none group-hover:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              className="flex shrink-0 gap-5 pr-5"
              aria-hidden={copy === 1}
            >
              {reviews.map((review, i) => (
                <li key={i} className="pointer-events-auto">
                  <ReviewCard review={review} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
