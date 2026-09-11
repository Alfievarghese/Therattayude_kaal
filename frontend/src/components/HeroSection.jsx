import { AlertTriangle, Award, Microscope, ShieldAlert, Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative w-full border-b-4 border-[#0A0A0A] bg-[#FFFFFF] overflow-hidden">
      {/* Top Warning Hazard Stripe Marquee */}
      <div className="w-full bg-[#FFE600] border-b-3 border-[#0A0A0A] py-2 overflow-hidden flex items-center select-none">
        <div className="animate-marquee font-mono font-bold text-xs md:text-sm uppercase tracking-widest text-[#0A0A0A] flex items-center gap-8">
          <span className="inline-flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-[#0A0A0A] shrink-0" strokeWidth={3} />
            DEPARTMENT OF ABSOLUTELY UNNECESSARY RESEARCH
          </span>
          <span>///</span>
          <span>PROJECT: THERATTAYUDE KAAL (തേരട്ടയുടെ കാൽ)</span>
          <span>///</span>
          <span>STATUS: HYPER-OPERATIONAL</span>
          <span>///</span>
          <span>OBJECTIVE: COUNT CENTIPEDE LEGS</span>
          <span>///</span>
          <span>SCIENTIFIC SIGNIFICANCE: ABSOLUTE ZERO</span>
          <span>///</span>
          <span>WARNING: HUMAN TIME WILL NOT BE REFUNDED</span>
          <span>///</span>
          <span className="inline-flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-[#0A0A0A] shrink-0" strokeWidth={3} />
            DEPARTMENT OF ABSOLUTELY UNNECESSARY RESEARCH
          </span>
          <span>///</span>
          <span>PROJECT: THERATTAYUDE KAAL (തേരട്ടയുടെ കാൽ)</span>
          <span>///</span>
          <span>STATUS: HYPER-OPERATIONAL</span>
          <span>///</span>
          <span>OBJECTIVE: COUNT CENTIPEDE LEGS</span>
          <span>///</span>
          <span>SCIENTIFIC SIGNIFICANCE: ABSOLUTE ZERO</span>
          <span>///</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        {/* Main Brutalist Hero Card */}
        <div className="brutal-card p-6 md:p-12 relative bg-[#FFFFFF] shadow-brutal-xl">
          {/* Decorative Corner Crosshairs */}
          <div className="crosshair-corner crosshair-tl" />
          <div className="crosshair-corner crosshair-tr" />
          <div className="crosshair-corner crosshair-bl" />
          <div className="crosshair-corner crosshair-br" />

          {/* Top Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-3 border-[#0A0A0A] pb-4 mb-8 font-mono text-xs md:text-sm">
            <div className="flex items-center gap-2 bg-[#FFE600] border-2 border-[#0A0A0A] px-3 py-1 font-bold shadow-brutal-sm">
              <span className="inline-block w-2.5 h-2.5 bg-[#FF3333] border border-black rounded-full animate-pulse" />
              LIVE TELEMETRY // DOC-ID #TK-2026-X
            </div>
            <div className="flex items-center gap-4 text-gray-700 font-bold">
              <span>REF: MALAYALAM PROVERB ARCHIVE</span>
              <span className="hidden sm:inline">|</span>
              <span className="hidden sm:inline">CLASSIFICATION: DECLASSIFIED</span>
            </div>
          </div>

          {/* Title Area */}
          <div className="text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              {/* Stamp Badge */}
              <div className="inline-block mb-3">
                <span className="stamp-badge bg-[#FF3333] text-white border-[#0A0A0A] shadow-brutal-sm text-xs md:text-sm inline-flex items-center gap-1.5">
                  <Award className="w-4 h-4" strokeWidth={2.5} />
                  100% CERTIFIED FUTILE
                </span>
              </div>

              {/* Malayalam Title */}
              <h1 className="font-malayalam text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#0A0A0A] leading-none mb-3">
                തേരട്ടയുടെ കാൽ
              </h1>

              {/* English Transliteration */}
              <div className="inline-block bg-[#0A0A0A] text-[#FFE600] px-4 py-1 font-archivo text-2xl sm:text-3xl md:text-4xl uppercase tracking-tighter shadow-brutal-sm mb-4">
                THERATTAYUDE KAAL
              </div>

              {/* Tagline */}
              <p className="font-mono text-sm sm:text-base text-gray-800 font-bold max-w-xl leading-relaxed">
                &ldquo;Counting the legs of a centipede&rdquo; — A Malayalam adage for the single most unnecessary task conceivable to human imagination. Upgraded to custom YOLOv8s deep vision (46.2% mAP50 precision).
              </p>
            </div>

            {/* Official Bureaucratic Seal (Interactive Easter Egg) */}
            <div className="flex flex-col items-center">
              <div
                className="group w-28 h-28 sm:w-32 sm:h-32 bg-[#FFE600] border-4 border-[#0A0A0A] shadow-brutal-lg flex flex-col items-center justify-center cursor-pointer hover:rotate-3 active:scale-95 transition-transform select-none"
                title="Click repeatedly for official bureaucratic audio confirmation"
              >
                <Microscope className="w-10 h-10 text-[#0A0A0A] transition-transform group-hover:scale-110" strokeWidth={2.5} />
                <span className="font-archivo text-[10px] tracking-widest mt-1.5 text-center font-black">
                  OFFICIAL SEAL
                </span>
                <span className="font-mono text-[8px] text-gray-800">
                  KL-DIV-EST-2026
                </span>
              </div>
              <span className="font-mono text-[10px] text-gray-500 mt-2 font-bold uppercase">
                [ Click seal 5x for sound ]
              </span>
            </div>
          </div>

          {/* Utilitarian Data Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t-3 border-[#0A0A0A] font-mono text-xs">
            <div className="bg-[#F3F4F6] border-2 border-[#0A0A0A] p-3 shadow-brutal-sm">
              <div className="text-gray-500 font-bold uppercase text-[10px]">DETECTION ENGINE</div>
              <div className="font-archivo text-sm text-[#0A0A0A] mt-0.5 font-black">YOLOv8s (SMALL)</div>
            </div>
            <div className="bg-[#F3F4F6] border-2 border-[#0A0A0A] p-3 shadow-brutal-sm">
              <div className="text-gray-500 font-bold uppercase text-[10px]">TARGET CLASS</div>
              <div className="font-archivo text-sm text-[#0A0A0A] mt-0.5">centipede_leg</div>
            </div>
            <div className="bg-[#F3F4F6] border-2 border-[#0A0A0A] p-3 shadow-brutal-sm">
              <div className="text-gray-500 font-bold uppercase text-[10px]">UTILITY LEVEL</div>
              <div className="font-archivo text-sm text-[#FF3333] mt-0.5">0.00% (STRICT)</div>
            </div>
            <div className="bg-[#F3F4F6] border-2 border-[#0A0A0A] p-3 shadow-brutal-sm">
              <div className="text-gray-500 font-bold uppercase text-[10px]">DIVISION</div>
              <div className="font-archivo text-sm text-[#0A0A0A] mt-0.5">KERALA HQ</div>
            </div>
          </div>
        </div>
      </div>

      {/* Industrial Metric Ruler & Crawling Centipede Track */}
      <div className="w-full bg-[#FAF8F5] border-t-3 border-[#0A0A0A] pt-4 pb-2 relative overflow-hidden select-none">
        {/* Animated Centipede on track */}
        <div className="w-full h-10 relative pointer-events-auto mb-1 cursor-grab" title="Live Centipede Specimen — Hover to accelerate crawl telemetry">
          <div className="animate-crawl absolute top-0 flex items-center">
            <svg width="240" height="38" viewBox="0 0 240 38" className="centipede-body-wave">
              {/* Caudal Cerci (Anal Legs pointing backwards) */}
              <polyline points="18,16 9,13 1,9" stroke="#0A0A0A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <polyline points="18,21 9,24 1,28" stroke="#0A0A0A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />

              {/* 16 Articulated Tergite Body Segments with Metachronal Jointed Walking Legs */}
              {Array.from({ length: 16 }).map((_, i) => {
                const segX = 18 + i * 11;
                const legX = segX + 5;
                const delay = (15 - i) * 0.032;
                return (
                  <g key={i}>
                    {/* Upper Jointed Leg (Coxa -> Femur -> Tarsus) */}
                    <g style={{ transformOrigin: `${legX}px 11px`, animation: 'legPaddleTop 0.28s ease-in-out infinite', animationDelay: `${delay}s` }}>
                      <polyline
                        points={`${legX},11 ${legX - 4},5 ${legX - 9},1`}
                        stroke="#0A0A0A"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </g>
                    {/* Lower Jointed Leg (Coxa -> Femur -> Tarsus) */}
                    <g style={{ transformOrigin: `${legX}px 26px`, animation: 'legPaddleBottom 0.28s ease-in-out infinite', animationDelay: `${delay}s` }}>
                      <polyline
                        points={`${legX},26 ${legX - 4},32 ${legX - 9},36`}
                        stroke="#0A0A0A"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </g>
                    {/* Tergite Shell Plate */}
                    <rect
                      x={segX}
                      y="11"
                      width="12"
                      height="15"
                      rx="3"
                      fill={i % 2 === 0 ? '#FFE600' : '#F59E0B'}
                      stroke="#0A0A0A"
                      strokeWidth="2"
                    />
                    {/* Dorsal Medial Ridge Accent */}
                    <line x1={segX + 2} y1="18.5" x2={segX + 10} y2="18.5" stroke="#0A0A0A" strokeWidth="1" opacity="0.35" />
                  </g>
                );
              })}

              {/* Cephalic Head Plate */}
              <path
                d="M 194,10 C 205,10 213,13 214,18.5 C 213,24 205,27 194,27 Z"
                fill="#FF2E93"
                stroke="#0A0A0A"
                strokeWidth="2.5"
              />
              {/* Compound Eye spots */}
              <circle cx="204" cy="14" r="2" fill="#0A0A0A" />
              <circle cx="205" cy="13.5" r="0.8" fill="#FFFFFF" />
              <circle cx="204" cy="23" r="2" fill="#0A0A0A" />
              <circle cx="205" cy="22.5" r="0.8" fill="#FFFFFF" />

              {/* Forcipules / Poison Claws */}
              <path d="M 208,12 Q 215,14 213,17" stroke="#0A0A0A" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M 208,25 Q 215,23 213,20" stroke="#0A0A0A" strokeWidth="2" fill="none" strokeLinecap="round" />

              {/* Twitching Sensory Antennae */}
              <g style={{ transformOrigin: '212px 14px', animation: 'feelerTwitchTop 0.45s ease-in-out infinite' }}>
                <path d="M 212,14 Q 224,9 237,3" stroke="#0A0A0A" strokeWidth="2" fill="none" strokeLinecap="round" />
              </g>
              <g style={{ transformOrigin: '212px 23px', animation: 'feelerTwitchBottom 0.45s ease-in-out infinite' }}>
                <path d="M 212,23 Q 224,28 237,34" stroke="#0A0A0A" strokeWidth="2" fill="none" strokeLinecap="round" />
              </g>
            </svg>
          </div>
        </div>

        {/* Ruler tick marks */}
        <div className="w-full flex justify-between px-2 font-mono text-[9px] text-gray-500 border-t-2 border-[#0A0A0A] pt-1">
          {['0cm', '10cm', '20cm', '30cm', '40cm', '50cm', '60cm', '70cm', '80cm', '90cm', '100cm'].map((mark, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="h-2 w-0.5 bg-[#0A0A0A] mb-0.5" />
              <span>{mark}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
