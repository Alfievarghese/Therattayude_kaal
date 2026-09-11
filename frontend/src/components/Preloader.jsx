import { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [legCount, setLegCount] = useState(0);
  const [logs, setLogs] = useState([]);
  const [isOpening, setIsOpening] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const bootMessages = [
    { at: 10, text: 'INITIATING KERALA REPROBATE PODIATRIC SUBSYSTEM...' },
    { at: 28, text: 'MOUNTING YOLOv8s HIGH-ACCURACY PODIATRIC MATRIX...' },
    { at: 45, text: 'RETRIEVING FOLKLORIC PRECEPT: "തേരട്ടയുടെ കാൽ എണ്ണൽ"...' },
    { at: 65, text: 'CONNECTING TO HON. MANDI MASALA (SUPREME ARBITER)...' },
    { at: 82, text: 'CONFIRMING 0.0000% SOCIOECONOMIC UTILITY... [VERIFIED]' },
    { at: 96, text: 'READY TO SQUANDER TIME AND COGNITIVE RESOURCES.' },
  ];

  // Sound generator using Web Audio API
  const playBootSound = (type = 'tick') => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      if (type === 'tick') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(520 + progress * 5, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.035);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.035);
      } else if (type === 'launch') {
        [261.63, 329.63, 392.00, 523.25].forEach((freq, idx) => {
          const o = audioCtx.createOscillator();
          const g = audioCtx.createGain();
          o.type = 'triangle';
          o.frequency.setValueAtTime(freq, audioCtx.currentTime + idx * 0.05);
          g.gain.setValueAtTime(0.15, audioCtx.currentTime + idx * 0.05);
          g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + idx * 0.05 + 0.3);
          o.connect(g);
          g.connect(audioCtx.destination);
          o.start(audioCtx.currentTime + idx * 0.05);
          o.stop(audioCtx.currentTime + idx * 0.05 + 0.35);
        });
      }
    } catch {
      // AudioContext fallback
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsReady(true);
          return 100;
        }
        const next = Math.min(100, prev + Math.floor(Math.random() * 6) + 3);
        setLegCount(Math.min(100, Math.floor((next / 100) * 100)));

        bootMessages.forEach((msg) => {
          if (next >= msg.at && prev < msg.at) {
            setLogs((l) => [...l, msg.text]);
            playBootSound('tick');
          }
        });

        return next;
      });
    }, 60);

    return () => clearInterval(timer);
  }, []);

  const handleLaunch = () => {
    playBootSound('launch');
    setIsOpening(true);
    setTimeout(() => {
      onComplete();
    }, 650);
  };

  // Auto launch after completing
  useEffect(() => {
    if (isReady) {
      const autoTimer = setTimeout(() => {
        handleLaunch();
      }, 500);
      return () => clearTimeout(autoTimer);
    }
  }, [isReady]);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-mono select-none bg-[#F4F4EE]">
      {/* Top Shutter Blast Door (Crisp Light Theme) */}
      <div
        className={`absolute inset-x-0 top-0 h-1/2 bg-[#FFFFFF] border-b-6 border-[#0A0A0A] z-20 transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          isOpening ? '-translate-y-full' : 'translate-y-0'
        } flex flex-col justify-end p-6 md:p-10 shadow-lg`}
      >
        <div className="max-w-4xl w-full mx-auto">
          {/* Hazard Caution Bar */}
          <div className="h-4 w-full bg-[repeating-linear-gradient(45deg,#FFE600,#FFE600_14px,#0A0A0A_14px,#0A0A0A_28px)] border-2 border-[#0A0A0A] mb-4 shadow-[3px_3px_0px_0px_#0A0A0A]" />

          <div className="flex items-center justify-between border-b-3 border-[#0A0A0A] pb-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="w-3.5 h-3.5 bg-[#FF2E93] inline-block animate-ping rounded-full border border-black" />
              <span className="text-[#0A0A0A] font-black text-xs md:text-sm tracking-wider uppercase bg-[#FFE600] px-2 py-0.5 border-2 border-black shadow-[2px_2px_0px_0px_#0A0A0A]">
                PODIATRIC TELEMETRY OS v8.4 // BOOT MATRIX
              </span>
            </div>
            <button
              type="button"
              onClick={handleLaunch}
              className="text-xs text-black font-black hover:bg-[#FFE600] border-2 border-[#0A0A0A] px-3 py-1 bg-white shadow-[2px_2px_0px_0px_#0A0A0A] hover:translate-x-[1px] hover:translate-y-[1px] cursor-pointer uppercase transition-all"
            >
              SKIP [ESC] &gt;&gt;
            </button>
          </div>

          <div className="text-center md:text-left">
            <p className="font-malayalam text-2xl md:text-3xl font-black text-[#0A0A0A] mb-1">
              തേരട്ടയുടെ കാൽ എണ്ണൽ സിസ്റ്റം
            </p>
            <h1 className="font-archivo text-xl md:text-3xl text-[#0A0A0A] font-black uppercase tracking-tight">
              DEPARTMENT OF ABSOLUTELY UNNECESSARY RESEARCH
            </h1>
          </div>
        </div>
      </div>

      {/* Center Neobrutalist Terminal Console (Light Paper Aesthetic) */}
      <div
        className={`absolute inset-0 z-30 flex flex-col items-center justify-center p-4 transition-opacity duration-300 ${
          isOpening ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="max-w-2xl w-full bg-[#FFFFFF] border-4 border-[#0A0A0A] shadow-[12px_12px_0px_0px_#0A0A0A] p-6 md:p-8 relative">
          {/* Neobrutalist Pink Stamp Badge */}
          <div className="absolute -top-3.5 -right-3.5 bg-[#FF2E93] text-white font-black text-[11px] px-2.5 py-1 border-2 border-[#0A0A0A] shadow-[3px_3px_0px_0px_#0A0A0A] rotate-3 uppercase">
            ★ CLASSIFIED SCIENTIFIC FUTILITY ★
          </div>

          {/* Animated Crawling Centipede Stage (Light Warm Canvas) */}
          <div className="my-4 overflow-hidden py-3 bg-[#FEF9C3] border-3 border-[#0A0A0A] shadow-[4px_4px_0px_0px_#0A0A0A] relative">
            <div className="absolute top-1 left-2 text-[9px] font-black uppercase tracking-wider text-[#0A0A0A]/70">
              [ LIVE SPECIMEN CRAWL TELEMETRY ]
            </div>
            <svg
              className="w-full max-w-[480px] h-14 mx-auto"
              viewBox="0 0 500 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Sinuous Crawling Centipede with Realistic Jointed Anatomy */}
              {Array.from({ length: 18 }).map((_, i) => {
                const cx = 35 + i * 24;
                const waveOffset = Math.sin((progress * 0.22) + i * 0.45) * 5.5;
                const cy = 30 + waveOffset;
                const isHead = i === 17;
                const isTail = i === 0;

                // Dynamic walking leg paddle phases
                const legWalkPhase = (progress * 0.35) - (i * 0.5);
                const legOffsetTop = Math.sin(legWalkPhase) * 7;
                const legOffsetBottom = Math.cos(legWalkPhase) * 7;

                return (
                  <g key={i}>
                    {/* Tail Caudal Cerci (Anal feelers) */}
                    {isTail && (
                      <>
                        <path
                          d={`M ${cx - 6} ${cy - 2} Q ${cx - 16} ${cy - 8 + Math.sin(progress * 0.2) * 3} ${cx - 28} ${cy - 12}`}
                          stroke="#0A0A0A"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          fill="none"
                        />
                        <path
                          d={`M ${cx - 6} ${cy + 2} Q ${cx - 16} ${cy + 8 + Math.sin(progress * 0.2) * 3} ${cx - 28} ${cy + 12}`}
                          stroke="#0A0A0A"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          fill="none"
                        />
                      </>
                    )}

                    {/* Top Jointed Leg (Body -> Knee -> Claws) */}
                    <polyline
                      points={`${cx},${cy - 6} ${cx - 3 + legOffsetTop * 0.7},${cy - 14} ${cx - 7 + legOffsetTop},${cy - 22}`}
                      stroke="#0A0A0A"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />

                    {/* Bottom Jointed Leg (Body -> Knee -> Claws) */}
                    <polyline
                      points={`${cx},${cy + 6} ${cx - 3 + legOffsetBottom * 0.7},${cy + 14} ${cx - 7 + legOffsetBottom},${cy + 22}`}
                      stroke="#0A0A0A"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />

                    {/* Tergite Segment Body Plate */}
                    <ellipse
                      cx={cx}
                      cy={cy}
                      rx={isHead ? 12 : 10}
                      ry={isHead ? 11 : 8.5}
                      fill={isHead ? '#FF2E93' : (i % 2 === 0 ? '#FFE600' : '#F59E0B')}
                      stroke="#0A0A0A"
                      strokeWidth="2.5"
                    />
                    {/* Medial Segment Highlight */}
                    {!isHead && (
                      <line
                        x1={cx - 5}
                        y1={cy}
                        x2={cx + 5}
                        y2={cy}
                        stroke="#0A0A0A"
                        strokeWidth="1.2"
                        opacity="0.3"
                      />
                    )}

                    {/* Head Cephalic Structure */}
                    {isHead && (
                      <>
                        {/* Poison Claws / Forcipules */}
                        <path
                          d={`M ${cx + 7} ${cy - 7} Q ${cx + 14} ${cy - 5} ${cx + 12} ${cy - 1}`}
                          stroke="#0A0A0A"
                          strokeWidth="2"
                          strokeLinecap="round"
                          fill="none"
                        />
                        <path
                          d={`M ${cx + 7} ${cy + 7} Q ${cx + 14} ${cy + 5} ${cx + 12} ${cy + 1}`}
                          stroke="#0A0A0A"
                          strokeWidth="2"
                          strokeLinecap="round"
                          fill="none"
                        />

                        {/* Twitching Whip-Like Antennae */}
                        <path
                          d={`M ${cx + 6} ${cy - 5} Q ${cx + 17} ${cy - 13 + Math.sin(progress * 0.3) * 3} ${cx + 30} ${cy - 18 + Math.cos(progress * 0.3) * 5}`}
                          stroke="#0A0A0A"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          fill="none"
                        />
                        <path
                          d={`M ${cx + 6} ${cy + 5} Q ${cx + 17} ${cy + 13 + Math.sin(progress * 0.3) * 3} ${cx + 30} ${cy + 18 + Math.cos(progress * 0.3) * 5}`}
                          stroke="#0A0A0A"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          fill="none"
                        />

                        {/* Compound Eyes with Glint */}
                        <circle cx={cx + 5} cy={cy - 4} r="2" fill="#0A0A0A" />
                        <circle cx={cx + 5.8} cy={cy - 4.5} r="0.8" fill="#FFFFFF" />
                        <circle cx={cx + 5} cy={cy + 4} r="2" fill="#0A0A0A" />
                        <circle cx={cx + 5.8} cy={cy + 3.5} r="0.8" fill="#FFFFFF" />
                      </>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Progress Counters */}
          <div className="flex items-end justify-between mb-2">
            <div>
              <span className="text-[11px] text-gray-700 font-bold uppercase tracking-wider block">
                CALIBRATING LEGS:
              </span>
              <span className="text-xl md:text-2xl font-black text-[#0A0A0A] bg-[#FFE600] px-2 py-0.5 border-2 border-black shadow-[2px_2px_0px_0px_#0A0A0A] inline-block">
                {String(legCount).padStart(3, '0')} / 100 LEGS
              </span>
            </div>
            <div className="text-right">
              <span className="font-archivo text-3xl md:text-5xl font-black text-[#0A0A0A]">
                {progress}%
              </span>
            </div>
          </div>

          {/* Chunky Neobrutalist Progress Bar */}
          <div className="h-7 w-full bg-[#F3F4F6] border-3 border-[#0A0A0A] p-0.5 mb-4 shadow-[4px_4px_0px_0px_#0A0A0A]">
            <div
              className="h-full bg-[#FFE600] transition-all duration-75 relative overflow-hidden border border-black"
              style={{ width: `${progress}%` }}
            >
              {/* Hazard Stripes Pattern inside progress */}
              <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#0A0A0A,#0A0A0A_10px,#FFE600_10px,#FFE600_20px)] opacity-25" />
            </div>
          </div>

          {/* Light Tactical Terminal Diagnostic Log */}
          <div className="bg-[#FAF8F5] border-3 border-[#0A0A0A] p-3.5 h-26 overflow-hidden flex flex-col justify-end text-[11px] text-[#0A0A0A] font-mono shadow-[3px_3px_0px_0px_#0A0A0A]">
            {logs.slice(-4).map((log, idx) => (
              <div key={idx} className="truncate font-bold">
                <span className="text-[#FF2E93] mr-1.5 font-black">&gt;&gt;</span>
                {log}
              </div>
            ))}
            <div className="flex items-center text-gray-700 font-bold">
              <span className="text-[#FF2E93] mr-1.5 font-black">&gt;&gt;</span>
              <span>SYNCHRONIZING PODIATRIC SENSORS</span>
              <span className="inline-block w-2.5 h-3.5 bg-[#0A0A0A] ml-1.5 animate-pulse" />
            </div>
          </div>

          {/* Enter Portal Button */}
          <div className="mt-5 text-center">
            <button
              type="button"
              onClick={handleLaunch}
              className={`w-full py-3.5 px-6 font-archivo font-black text-sm md:text-base uppercase tracking-wider border-3 border-[#0A0A0A] cursor-pointer transition-all duration-150 inline-flex items-center justify-center gap-2 ${
                isReady
                  ? 'bg-[#FFE600] text-[#0A0A0A] shadow-[6px_6px_0px_0px_#0A0A0A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0px_0px_#0A0A0A]'
                  : 'bg-gray-200 text-gray-600 opacity-70 pointer-events-none'
              }`}
            >
              {isReady ? (
                <>
                  <Zap className="w-5 h-5 text-black fill-black" />
                  ENTER RESEARCH PORTAL
                </>
              ) : (
                'INITIALIZING TELEMETRY...'
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Shutter Blast Door (Crisp Light Theme) */}
      <div
        className={`absolute inset-x-0 bottom-0 h-1/2 bg-[#FFFFFF] border-t-6 border-[#0A0A0A] z-20 transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          isOpening ? 'translate-y-full' : 'translate-y-0'
        } flex flex-col justify-start p-6 md:p-10 shadow-lg`}
      >
        <div className="max-w-4xl w-full mx-auto">
          <div className="flex items-center justify-between border-t-3 border-[#0A0A0A] pt-3 mt-4 text-[11px] text-[#0A0A0A] uppercase font-mono font-bold">
            <span className="bg-[#FFE600] px-2 py-0.5 border border-black shadow-[2px_2px_0px_0px_#0A0A0A]">
              CHILOPODA PODIATRIC PROTOCOL // MANDI MASALA O.B.E.
            </span>
            <span className="text-gray-600">ZERO PURPOSE • MAXIMUM CERTAINTY</span>
          </div>
          {/* Hazard Caution Bar */}
          <div className="h-4 w-full bg-[repeating-linear-gradient(45deg,#FFE600,#FFE600_14px,#0A0A0A_14px,#0A0A0A_28px)] border-2 border-[#0A0A0A] mt-4 shadow-[3px_3px_0px_0px_#0A0A0A]" />
        </div>
      </div>
    </div>
  );
}
