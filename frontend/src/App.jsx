import { useState, useEffect, useRef } from 'react';
import { Zap, RefreshCw, Terminal } from 'lucide-react';
import HeroSection from './components/HeroSection';
import UploadSection from './components/UploadSection';
import AnalysisSection from './components/AnalysisSection';
import RecountSection from './components/RecountSection';
import CertificateSection from './components/CertificateSection';
import Leaderboard from './components/Leaderboard';
import Preloader from './components/Preloader';

const API_BASE = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/+$/, '') : '';

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [sealClicks, setSealClicks] = useState(0);
  const analysisSectionRef = useRef(null);

  // Dynamic Browser Tab title
  useEffect(() => {
    if (!result) {
      document.title = 'Therattayude Kaal // DECLASSIFIED TELEMETRY';
      return;
    }

    let flip = false;
    const interval = setInterval(() => {
      flip = !flip;
      document.title = flip
        ? `[ ${result.leg_count} LEGS DETECTED ]`
        : 'Therattayude Kaal // AUDIT';
    }, 2500);

    return () => {
      clearInterval(interval);
      document.title = 'Therattayude Kaal';
    };
  }, [result]);

  // Easter Egg: Web Audio Dramatic Sound
  const playDramaticSound = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const playTone = (freq, delay, duration, type = 'sawtooth') => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime + delay);
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + delay + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(audioCtx.currentTime + delay);
        osc.stop(audioCtx.currentTime + delay + duration);
      };

      // Dramatic fanfare brass chord
      [130.81, 164.81, 196.00, 261.63].forEach((f, i) => {
        playTone(f, 0, 1.8, 'sawtooth');
      });
      playTone(523.25, 0.15, 1.2, 'square');
      playTone(659.25, 0.3, 1.0, 'square');
    } catch (e) {
      console.log('Web Audio API not allowed or supported', e);
    }
  };

  const handleSealClick = () => {
    const next = sealClicks + 1;
    setSealClicks(next);
    if (next >= 5) {
      setSealClicks(0);
      playDramaticSound();
    }
  };

  const handleUpload = async (uploadedFile) => {
    setFile(uploadedFile);
    setResult(null);
    setIsAnalyzing(true);

    setTimeout(() => {
      analysisSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 250);

    try {
      const formData = new FormData();
      formData.append('file', uploadedFile);

      const res = await fetch(`${API_BASE}/detect`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      setResult(data);
      setIsAnalyzing(false);

      setTimeout(() => {
        window.dispatchEvent(new Event('refreshLeaderboard'));
      }, 1500);
    } catch (err) {
      console.error('Detection failed:', err);
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
    setIsAnalyzing(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FDFCF7] text-[#0A0A0A] flex flex-col justify-between relative">
      {/* High-Tech Centipede Boot Sequence */}
      {showPreloader && (
        <Preloader onComplete={() => setShowPreloader(false)} />
      )}

      {/* Top Floating Control Bar */}
      <div className="sticky top-0 z-40 bg-[#0A0A0A] text-white border-b-3 border-[#0A0A0A] px-4 py-1.5 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse" />
          <span className="text-[#FFE600] font-black uppercase tracking-wider hidden sm:inline">
            KERALA PODIATRIC TELEMETRY
          </span>
          <span className="text-gray-400 text-[11px]">
            [ YOLOv8 ARTHROPOD SCANNER ONLINE ]
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowPreloader(true)}
            className="text-[11px] bg-[#FFE600] text-black font-black px-2.5 py-1 border border-black shadow-[2px_2px_0px_0px_#FFF] hover:translate-x-[1px] hover:translate-y-[1px] cursor-pointer uppercase transition-all inline-flex items-center gap-1.5"
            title="Re-run the retro laboratory boot sequence"
          >
            <Zap className="w-3 h-3 text-black fill-black" />
            REBOOT SYSTEM
          </button>
        </div>
      </div>

      <div>
        {/* Hero Section with Easter Egg wrapper */}
        <div onClick={handleSealClick}>
          <HeroSection />
        </div>

        {/* Upload Portal */}
        <UploadSection onUpload={handleUpload} isAnalyzing={isAnalyzing} />

        {/* Live Analysis Terminal */}
        <div ref={analysisSectionRef}>
          <AnalysisSection result={result} isAnalyzing={isAnalyzing} />
        </div>

        {/* Recount & Certificate Sections (Post-Result) */}
        {result && (
          <>
            <RecountSection submissionId={result.submission_id} />
            <CertificateSection submissionId={result.submission_id} />

            {/* Reset Button */}
            <div className="text-center py-6">
              <button
                type="button"
                onClick={handleReset}
                className="brutal-btn brutal-btn-white text-sm inline-flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4 text-black" strokeWidth={2.5} />
                AUDIT ANOTHER SPECIMEN
              </button>
            </div>
          </>
        )}

        {/* Persistent Leaderboard */}
        <Leaderboard />
      </div>

      {/* Industrial Neobrutalist Footer */}
      <footer className="w-full bg-[#0A0A0A] text-white border-t-4 border-[#0A0A0A] mt-16 py-10 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <p className="font-malayalam text-xl md:text-2xl font-black text-[#FFE600] mb-1">
              തേരട്ടയുടെ കാൽ എണ്ണുന്നത് പോലെ
            </p>
            <p className="font-mono text-xs text-gray-400 font-bold uppercase">
              DEPARTMENT OF ABSOLUTELY UNNECESSARY RESEARCH — KERALA DIVISION
            </p>
            <p className="font-mono text-[11px] text-gray-500 mt-1">
              No centipedes were harmed during this calculation. Several were mildly perplexed.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <button
              type="button"
              onClick={() => setShowPreloader(true)}
              className="text-[11px] text-[#FFE600] hover:underline font-mono uppercase cursor-pointer inline-flex items-center gap-1.5"
            >
              <Terminal className="w-3.5 h-3.5" strokeWidth={2.5} />
              [ RE-RUN SYSTEM BOOT SEQUENCE ]
            </button>
            <div className="font-mono text-xs tracking-widest text-[#FFE600] select-none">
              ||| | |||| || | ||| |||| | ||
            </div>
            <div className="font-mono text-[10px] text-gray-400 uppercase">
              BUILD: NEOPODIATRY-2026.09.11 // V2.5
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
