export default function Landing({ session }) {
  const { settings, setSettings, startSession } = session;

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col gap-8 mt-12">
      <div className="text-center">
        <div className="text-5xl mb-3">✏️</div>
        <h1 className="text-4xl font-bold text-violet-300 mb-2">Drawing Practice</h1>
        <p className="text-slate-400">AI-generated subjects, timed sessions, real variety.</p>
      </div>

      <div className="bg-[#1a1a2e] border border-violet-900/40 rounded-2xl p-6 flex flex-col gap-5">
        <h2 className="text-slate-300 font-semibold text-lg">Session settings</h2>

        <label className="flex flex-col gap-1">
          <span className="text-slate-400 text-sm">Minutes per subject</span>
          <div className="flex gap-2">
            {[1, 2, 3, 5, 10].map((m) => (
              <button
                key={m}
                onClick={() => setSettings((s) => ({ ...s, minutes: m }))}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  settings.minutes === m
                    ? 'bg-violet-600 text-white'
                    : 'bg-[#0f0f1a] text-slate-400 hover:text-white hover:bg-violet-900/40'
                }`}
              >
                {m}m
              </button>
            ))}
          </div>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-slate-400 text-sm">Number of subjects</span>
          <div className="flex gap-2">
            {[2, 4, 6, 8].map((n) => (
              <button
                key={n}
                onClick={() => setSettings((s) => ({ ...s, count: n }))}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  settings.count === n
                    ? 'bg-violet-600 text-white'
                    : 'bg-[#0f0f1a] text-slate-400 hover:text-white hover:bg-violet-900/40'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-slate-400 text-sm">Subject type</span>
          <div className="flex gap-2">
            {[
              { value: 'both', label: 'Mixed' },
              { value: 'living', label: 'Living' },
              { value: 'non-living', label: 'Objects' },
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setSettings((s) => ({ ...s, categoryMix: value }))}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  settings.categoryMix === value
                    ? 'bg-violet-600 text-white'
                    : 'bg-[#0f0f1a] text-slate-400 hover:text-white hover:bg-violet-900/40'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </label>
      </div>

      <button
        onClick={startSession}
        className="w-full py-4 bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white text-xl font-semibold rounded-2xl transition-colors shadow-lg shadow-violet-900/40"
      >
        Start Session
      </button>

      <p className="text-center text-slate-600 text-xs">
        Space = pause/resume · → = skip
      </p>
    </div>
  );
}
