import Timer from './Timer';
import Reference from './Reference';

export default function DrawingScreen({ session }) {
  const { items, currentIndex, secondsLeft, paused, settings, advance, togglePause, error } = session;
  const item = items[currentIndex];
  const totalSeconds = settings.minutes * 60;

  if (!item) return null;

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
      {/* Progress */}
      <div className="flex items-center justify-between">
        <span className="text-slate-500 text-sm">
          Item <span className="text-violet-300 font-semibold">{currentIndex + 1}</span> of {items.length}
        </span>
        <div className="flex gap-1">
          {items.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 w-8 rounded-full transition-colors ${
                i < currentIndex ? 'bg-violet-600' : i === currentIndex ? 'bg-violet-400' : 'bg-slate-700'
              }`}
            />
          ))}
        </div>
        <span className={`text-xs px-2 py-0.5 rounded-full ${
          item.category === 'living' ? 'bg-emerald-900/40 text-emerald-400' : 'bg-blue-900/40 text-blue-400'
        }`}>
          {item.category}
        </span>
      </div>

      {error && (
        <div className="text-amber-400 text-xs bg-amber-900/20 border border-amber-800/40 rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      {/* Subject */}
      <div className="bg-[#1a1a2e] border border-violet-900/40 rounded-2xl p-6">
        <div className="text-slate-400 text-sm mb-1 uppercase tracking-wider">Draw</div>
        <h1 className="text-3xl font-bold text-violet-200 mb-1">{item.subject}</h1>
        <p className="text-slate-300 text-lg">{item.drawWhat}</p>
        {item.simplificationNote && (
          <p className="mt-2 text-slate-500 text-sm italic">
            ↳ {item.simplificationNote}
          </p>
        )}
      </div>

      {/* Timer + controls */}
      <div className="flex items-center justify-between gap-4">
        <Timer secondsLeft={secondsLeft} totalSeconds={totalSeconds} paused={paused} />
        <div className="flex flex-col gap-2 flex-1">
          <button
            onClick={togglePause}
            className="w-full py-3 rounded-xl bg-[#1a1a2e] border border-violet-900/40 hover:border-violet-500 text-slate-300 hover:text-white font-medium transition-colors"
          >
            {paused ? '▶ Resume' : '⏸ Pause'}
          </button>
          <button
            onClick={advance}
            className="w-full py-3 rounded-xl bg-violet-700/40 border border-violet-600/40 hover:bg-violet-600 text-violet-200 hover:text-white font-medium transition-colors"
          >
            {currentIndex + 1 >= items.length ? 'Finish →' : 'Next →'}
          </button>
        </div>
      </div>

      {/* Reference */}
      <Reference item={item} />

      {/* Tips */}
      <div className="bg-[#1a1a2e] border border-violet-900/40 rounded-2xl p-5">
        <h2 className="text-slate-400 text-sm uppercase tracking-wider mb-3">Construction tips</h2>
        <ul className="flex flex-col gap-2">
          {item.constructionTips?.map((tip, i) => (
            <li key={i} className="flex gap-3 text-slate-300 text-sm">
              <span className="text-violet-500 font-mono mt-0.5 shrink-0">{i + 1}.</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
