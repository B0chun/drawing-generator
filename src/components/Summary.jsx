export default function Summary({ session }) {
  const { items, settings, startSession } = session;

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col gap-6 mt-8">
      <div className="text-center">
        <div className="text-5xl mb-3">🎉</div>
        <h1 className="text-3xl font-bold text-violet-300 mb-1">Session complete!</h1>
        <p className="text-slate-400">
          {items.length} subjects · {settings.minutes} min each
        </p>
      </div>

      <div className="bg-[#1a1a2e] border border-violet-900/40 rounded-2xl divide-y divide-violet-900/30">
        {items.map((item, i) => (
          <div key={item.id} className="px-5 py-4 flex gap-4 items-start">
            <span className="text-violet-500 font-mono text-sm w-5 shrink-0 mt-0.5">{i + 1}</span>
            <div className="flex-1 min-w-0">
              <div className="text-slate-200 font-medium">{item.subject}</div>
              <div className="text-slate-500 text-sm">{item.drawWhat}</div>
              {item.simplificationNote && (
                <div className="text-slate-600 text-xs italic mt-0.5">{item.simplificationNote}</div>
              )}
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${
              item.category === 'living' ? 'bg-emerald-900/40 text-emerald-400' : 'bg-blue-900/40 text-blue-400'
            }`}>
              {item.category}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={startSession}
        className="w-full py-4 bg-violet-600 hover:bg-violet-500 text-white text-xl font-semibold rounded-2xl transition-colors shadow-lg shadow-violet-900/40"
      >
        New Session
      </button>
    </div>
  );
}
