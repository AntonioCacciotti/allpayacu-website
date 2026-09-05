export default function GalleryPlaceholder({ captions }: { captions: string[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {captions.map((caption) => (
        <div
          key={caption}
          className="aspect-[4/3] rounded-xl border-2 border-dashed border-stone-300 bg-stone-50 flex flex-col items-center justify-center gap-2 text-center px-2"
        >
          <span className="text-xl" aria-hidden="true">🖼️</span>
          <span className="text-xs font-semibold text-stone-400 leading-tight">{caption}</span>
        </div>
      ))}
    </div>
  );
}
