// Layout-only testimonial slots — no fabricated review text, per instruction
// to hold off on testimonial copy until real Google/Tripadvisor reviews are supplied.
export default function TestimonialPlaceholders({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="border border-stone-100 rounded-xl bg-stone-50 p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-stone-400 tracking-wide">{i % 2 === 0 ? 'GOOGLE' : 'TRIPADVISOR'}</span>
            <span className="text-stone-300 text-xs tracking-widest">☆☆☆☆☆</span>
          </div>
          <p className="text-stone-400 text-xs italic leading-relaxed">Review pending — real guest review to go here.</p>
          <p className="text-stone-400 text-[11px] font-semibold border-t border-dashed border-stone-200 pt-2">Name · Location</p>
        </div>
      ))}
    </div>
  );
}
