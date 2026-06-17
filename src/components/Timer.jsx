export default function Timer({ secondsLeft, totalSeconds, paused }) {
  const mins = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const secs = String(secondsLeft % 60).padStart(2, '0');
  const progress = totalSeconds > 0 ? secondsLeft / totalSeconds : 1;
  const urgent = secondsLeft <= 30 && secondsLeft > 0;
  const circumference = 2 * Math.PI * 54;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" stroke="#1e1b4b" strokeWidth="8" fill="none" />
          <circle
            cx="60" cy="60" r="54"
            stroke={urgent ? '#ef4444' : '#7c3aed'}
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.9s linear, stroke 0.3s' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-mono font-bold tabular-nums ${urgent ? 'text-red-400' : 'text-violet-200'}`}>
            {mins}:{secs}
          </span>
          {paused && <span className="text-xs text-slate-500 mt-1">paused</span>}
        </div>
      </div>
    </div>
  );
}
