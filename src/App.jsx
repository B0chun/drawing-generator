import { useSession } from './useSession';
import Landing from './components/Landing';
import DrawingScreen from './components/DrawingScreen';
import Summary from './components/Summary';

export default function App() {
  const session = useSession();

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-slate-200 flex flex-col items-center px-4 py-8">
      {session.phase === 'landing' && <Landing session={session} />}
      {session.phase === 'loading' && (
        <div className="flex flex-col items-center justify-center flex-1 gap-4 mt-24">
          <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 text-lg">Generating your session…</p>
        </div>
      )}
      {session.phase === 'drawing' && <DrawingScreen session={session} />}
      {session.phase === 'summary' && <Summary session={session} />}
    </div>
  );
}
