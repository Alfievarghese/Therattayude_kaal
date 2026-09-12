import { useState, useEffect, useRef } from 'react';
import { Zap } from 'lucide-react';
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
      <header className="sticky top-0 z-40 bg-[#0A0A0A] text-white border-b-3 border-[#0A0A0A] px-3 sm:px-6 py-2 flex items-center justify-between text-xs font-mono select-none">
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Department Designation Badge */}
          <div className="flex items-center">
            <span className="bg-[#FFE600] text-black font-archivo text-[11px] font-black px-2.5 py-0.5 border-2 border-black shadow-[2px_2px_0px_0px_#FFFFFF] tracking-wider uppercase">
              KPT-SYS // V3.0
            </span>
          </div>

          {/* Live Scanner Telemetry State */}
          <div className="flex items-center gap-2 pl-1 border-l-2 border-neutral-800">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E676] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00E676]" />
            </span>
            <span className="text-[#FFE600] font-bold tracking-wider text-[11px] sm:text-xs">
              KERALA PODIATRIC TELEMETRY
            </span>
            <span className="hidden md:inline text-neutral-400 text-[10px] tracking-wide">
              [ YOLOv8s // 150-EPOCH ARTHROPOD CORE ]
            </span>
          </div>
        </div>

        {/* Quick Jumps & Controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden lg:flex items-center gap-4 text-[11px] text-neutral-400">
            <a href="#upload-section" className="hover:text-[#FFE600] transition-colors font-bold">
              [ INTAKE ]
            </a>
            <a href="#leaderboard-section" className="hover:text-[#FFE600] transition-colors font-bold">
              [ REGISTRY ]
            </a>
            <span className="text-neutral-600">|</span>
            <span className="text-[#FF3333] font-bold">
              CLASSIFICATION: 100% POINTLESS
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowPreloader(true)}
            className="text-[11px] bg-[#FFE600] text-black font-archivo font-black px-3 py-1 border-2 border-black shadow-[2px_2px_0px_0px_#FFFFFF] hover:translate-x-[1px] hover:translate-y-[1px] cursor-pointer uppercase transition-all inline-flex items-center gap-1.5 active:translate-x-[2px] active:translate-y-[2px]"
            title="Re-run the laboratory boot diagnostics sequence"
          >
            <Zap className="w-3.5 h-3.5 text-black fill-black" />
            <span>REBOOT SYSTEM</span>
          </button>
        </div>
      </header>

      <div>
        {/* Hero Section with Easter Egg wrapper */}
        <div onClick={handleSealClick}>
          <HeroSection />
        </div>

        {/* Upload Portal */}
        <UploadSection
          onUpload={handleUpload}
          isAnalyzing={isAnalyzing}
        />

        {/* Detection Analysis with Simulated Stepper & Counter */}
        <div ref={analysisSectionRef}>
          <AnalysisSection
            result={result}
            isAnalyzing={isAnalyzing}
          />
        </div>

        {/* Interactive Recount / Dispute Section */}
        {result && (
          <RecountSection
            submissionId={result.submission_id}
            initialLegCount={result.leg_count}
          />
        )}

        {/* Ultra-Luxurious Royal Scientific Diploma */}
        {result && (
          <CertificateSection
            submissionId={result.submission_id}
          />
        )}

        {/* Persistent Leaderboard */}
        <Leaderboard />
      </div>
    </div>
  );
}
