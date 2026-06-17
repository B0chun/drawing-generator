export default function Reference({ item }) {
  if (!item) return null;

  return (
    <div className="bg-[#1a1a2e] border border-violet-900/40 rounded-2xl overflow-hidden">
      {item.referenceType === 'diagram' && item.diagramSvg ? (
        <div
          className="w-full flex items-center justify-center p-2 bg-[#1e1b4b]"
          dangerouslySetInnerHTML={{ __html: item.diagramSvg }}
          style={{ minHeight: 200 }}
        />
      ) : item.referenceType === 'image' && item.imageUrl ? (
        <img
          src={item.imageUrl}
          alt={item.subject}
          className="w-full object-cover max-h-72"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      ) : (
        <div className="flex items-center justify-center p-8 text-slate-500 text-sm">
          Use the reference link below ↓
        </div>
      )}

      {item.searchLink && (
        <a
          href={item.searchLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-3 text-violet-400 hover:text-violet-300 text-sm border-t border-violet-900/30 transition-colors"
        >
          <span>🔍</span>
          <span>Find reference photos</span>
          <span className="ml-auto text-slate-600">↗</span>
        </a>
      )}
    </div>
  );
}
