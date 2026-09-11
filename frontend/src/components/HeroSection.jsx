import { AlertTriangle, Award, Microscope } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative w-full border-b-4 border-[#0A0A0A] bg-[#F5F3EB] overflow-hidden">
      {/* Top Warning Hazard Stripe Marquee (Enlarged & Slowed for Crystal-Clear Readability) */}
      <div className="w-full bg-[#FFE600] border-b-4 border-[#0A0A0A] py-3.5 overflow-hidden flex items-center select-none shadow-[inset_0_2px_0_rgba(255,255,255,0.4)]">
        <div className="animate-marquee font-mono font-black text-sm sm:text-base md:text-lg uppercase tracking-wider text-[#0A0A0A] flex items-center gap-10">
          <span className="inline-flex items-center gap-2 bg-[#0A0A0A] text-[#FFE600] px-3 py-1 font-archivo text-xs md:text-sm shadow-sm">
            <AlertTriangle className="w-4 h-4 text-[#FFE600] shrink-0" strokeWidth={3} />
            CLASSIFIED TELEMETRY
          </span>
          <span>DEPARTMENT OF ABSOLUTELY UNNECESSARY RESEARCH</span>
          <span className="text-[#FF3333] font-black">///</span>
          <span>PROJECT: THERATTAYUDE KAAL (തേരട്ടയുടെ കാൽ)</span>
          <span className="text-[#FF3333] font-black">///</span>
          <span>STATUS: HYPER-OPERATIONAL</span>
          <span className="text-[#FF3333] font-black">///</span>
          <span>CALIBRATED FOR CENTIPEDES (പഴുതാര) ONLY</span>
          <span className="text-[#FF3333] font-black">///</span>
          <span>SCIENTIFIC SIGNIFICANCE: ABSOLUTE ZERO</span>
          <span className="text-[#FF3333] font-black">///</span>
          <span>WARNING: HUMAN TIME WILL NOT BE REFUNDED</span>
          <span className="text-[#FF3333] font-black">///</span>
          <span className="inline-flex items-center gap-2 bg-[#0A0A0A] text-[#FFE600] px-3 py-1 font-archivo text-xs md:text-sm shadow-sm">
            <AlertTriangle className="w-4 h-4 text-[#FFE600] shrink-0" strokeWidth={3} />
            CLASSIFIED TELEMETRY
          </span>
          <span>DEPARTMENT OF ABSOLUTELY UNNECESSARY RESEARCH</span>
          <span className="text-[#FF3333] font-black">///</span>
          <span>PROJECT: THERATTAYUDE KAAL (തേരട്ടയുടെ കാൽ)</span>
          <span className="text-[#FF3333] font-black">///</span>
          <span>STATUS: HYPER-OPERATIONAL</span>
          <span className="text-[#FF3333] font-black">///</span>
          <span>CALIBRATED FOR CENTIPEDES (പഴുതാര) ONLY</span>
          <span className="text-[#FF3333] font-black">///</span>
          <span>SCIENTIFIC SIGNIFICANCE: ABSOLUTE ZERO</span>
          <span className="text-[#FF3333] font-black">///</span>
          <span>WARNING: HUMAN TIME WILL NOT BE REFUNDED</span>
          <span className="text-[#FF3333] font-black">///</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        {/* Main Brutalist Hero Card with Massive Depth & 4px Border */}
        <div className="brutal-card border-4 border-[#0A0A0A] p-6 md:p-12 relative bg-[#FFFFFF] shadow-[8px_8px_0px_#0A0A0A] md:shadow-[14px_14px_0px_#0A0A0A]">
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
                &ldquo;Counting the legs of a centipede&rdquo; — A Malayalam adage for the single most unnecessary task conceivable to human imagination. Calibrated strictly on predatory centipedes (പഴുതാര) via custom YOLOv8s deep vision (46.2% mAP50 precision).
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


        </div>
      </div>

      {/* Industrial Metric Ruler & Realistic Scolopendra Centipede Track */}
      <div className="w-full bg-[#FAF8F5] border-t-3 border-[#0A0A0A] pt-4 pb-2 relative overflow-hidden select-none">
        {/* Animated Centipede on track (Hover bug completely eliminated) */}
        <div className="w-full h-12 relative mb-1" title="Kerala Specimen (പഴുതാര) // Calibrated Metric Telemetry Track">
          <div className="animate-crawl absolute top-0 flex items-center pointer-events-none">
            <svg width="280" height="48" viewBox="0 0 280 48" className="centipede-body-wave overflow-visible">
              <defs>
                {/* Authentic Arthropod Amber-to-Mahogany Chitin Gradients */}
                <linearGradient id="tergiteGradA" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="60%" stopColor="#D97706" />
                  <stop offset="100%" stopColor="#B45309" />
                </linearGradient>
                <linearGradient id="tergiteGradB" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D97706" />
                  <stop offset="60%" stopColor="#B45309" />
                  <stop offset="100%" stopColor="#78350F" />
                </linearGradient>
                <linearGradient id="headCapsuleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C2410C" />
                  <stop offset="70%" stopColor="#9A3412" />
                  <stop offset="100%" stopColor="#431407" />
                </linearGradient>
              </defs>

              {/* Caudal Cerci / Tail Feelers (Elongated Rear Sensory Legs) */}
              <path
                d="M 22,20 Q 11,14 0,7"
                stroke="#B45309"
                strokeWidth="2.8"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="0" cy="7" r="1.5" fill="#0A0A0A" />

              <path
                d="M 22,28 Q 11,34 0,41"
                stroke="#B45309"
                strokeWidth="2.8"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="0" cy="41" r="1.5" fill="#0A0A0A" />

              {/* 18 Articulated Overlapping Chitinous Tergites with Jointed Walking Legs */}
              {Array.from({ length: 18 }).map((_, i) => {
                const segX = 22 + i * 11.2;
                const legX = segX + 5.6;
                const delay = (17 - i) * 0.038;
                const isEven = i % 2 === 0;

                return (
                  <g key={i}>
                    {/* Top Jointed Walking Leg: Coxa -> Femur -> Tarsus & Sharp Claw */}
                    <g
                      style={{
                        transformOrigin: `${legX}px 15px`,
                        animation: 'legPaddleTop 0.28s ease-in-out infinite',
                        animationDelay: `${delay}s`,
                      }}
                    >
                      {/* Jointed Leg Limbs */}
                      <polyline
                        points={`${legX},15 ${legX - 3},8 ${legX - 8},3 ${legX - 13},0`}
                        stroke="#B45309"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                      {/* Terminal Claw Tip */}
                      <circle cx={legX - 13} cy={0} r="1.2" fill="#0A0A0A" />
                    </g>

                    {/* Bottom Jointed Walking Leg: Coxa -> Femur -> Tarsus & Sharp Claw */}
                    <g
                      style={{
                        transformOrigin: `${legX}px 33px`,
                        animation: 'legPaddleBottom 0.28s ease-in-out infinite',
                        animationDelay: `${delay}s`,
                      }}
                    >
                      {/* Jointed Leg Limbs */}
                      <polyline
                        points={`${legX},33 ${legX - 3},40 ${legX - 8},45 ${legX - 13},48`}
                        stroke="#B45309"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                      {/* Terminal Claw Tip */}
                      <circle cx={legX - 13} cy={48} r="1.2" fill="#0A0A0A" />
                    </g>

                    {/* Sculpted Overlapping Tergite Chitin Plate */}
                    <rect
                      x={segX}
                      y="15"
                      width="12"
                      height="18"
                      rx="3.5"
                      fill={isEven ? 'url(#tergiteGradA)' : 'url(#tergiteGradB)'}
                      stroke="#0A0A0A"
                      strokeWidth="1.8"
                    />

                    {/* Medial Dorsal Spine Highlight (3D Specular Sheen) */}
                    <line
                      x1={segX + 2}
                      y1="24"
                      x2={segX + 10}
                      y2="24"
                      stroke="#FEF08A"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      opacity="0.65"
                    />

                    {/* Intersegmental Posterior Groove */}
                    <path
                      d={`M ${segX + 1},16 Q ${segX + 5},24 ${segX + 1},32`}
                      stroke="#0A0A0A"
                      strokeWidth="1.2"
                      opacity="0.35"
                      fill="none"
                    />
                  </g>
                );
              })}

              {/* Cephalic Head Capsule (Predatory Shield Armor) */}
              <path
                d="M 224,13 C 240,13 250,17 252,24 C 250,31 240,35 224,35 Z"
                fill="url(#headCapsuleGrad)"
                stroke="#0A0A0A"
                strokeWidth="2.4"
              />

              {/* Compound Eyes (Lateral Ocelli with Specular Glint) */}
              <circle cx="239" cy="18" r="2.4" fill="#0A0A0A" />
              <circle cx="240.2" cy="17.2" r="0.9" fill="#FFFFFF" />
              <circle cx="239" cy="30" r="2.4" fill="#0A0A0A" />
              <circle cx="240.2" cy="29.2" r="0.9" fill="#FFFFFF" />

              {/* Prehensile Poison Forcipules (Venom Jaws) */}
              <path
                d="M 244,15 Q 256,17 253,21"
                stroke="#0A0A0A"
                strokeWidth="2.8"
                fill="none"
                strokeLinecap="round"
              />
              <circle cx="253" cy="21" r="1.4" fill="#000000" />

              <path
                d="M 244,33 Q 256,31 253,27"
                stroke="#0A0A0A"
                strokeWidth="2.8"
                fill="none"
                strokeLinecap="round"
              />
              <circle cx="253" cy="27" r="1.4" fill="#000000" />

              {/* Long Articulated Whip Antennae */}
              <g style={{ transformOrigin: '246px 18px', animation: 'feelerTwitchTop 0.5s ease-in-out infinite' }}>
                <path
                  d="M 246,18 Q 262,11 278,3"
                  stroke="#F59E0B"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  fill="none"
                />
              </g>
              <g style={{ transformOrigin: '246px 30px', animation: 'feelerTwitchBottom 0.5s ease-in-out infinite' }}>
                <path
                  d="M 246,30 Q 262,37 278,45"
                  stroke="#F59E0B"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  fill="none"
                />
              </g>
            </svg>
          </div>
        </div>

        {/* Metric Ruler Tick Marks */}
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
