export default function TopCornerCentipede() {
  return (
    <div
      className="flex items-center gap-1.5 bg-[#1F1F1F] border border-[#FFE600] px-2 py-0.5 shadow-[2px_2px_0px_0px_#FFE600] select-none"
      title="Specimen Telemetry: Continuous Podiatric Loop Active"
    >
      <span className="text-[9px] font-black text-[#FFE600] tracking-tighter uppercase hidden md:inline">
        SPECIMEN #01
      </span>
      <div className="w-[72px] h-[18px] relative overflow-hidden bg-black/70 flex items-center border border-black/40">
        <div className="animate-top-corner-crawl absolute top-0.5 flex items-center">
          <svg width="80" height="15" viewBox="0 0 80 15" fill="none">
            {/* Rear anal legs */}
            <line x1="6" y1="6" x2="1" y2="3" stroke="#FFE600" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="6" y1="9" x2="1" y2="12" stroke="#FFE600" strokeWidth="1.2" strokeLinecap="round" />

            {/* 10 Articulated Segments with Animated Walking Legs */}
            {Array.from({ length: 10 }).map((_, i) => {
              const x = 8 + i * 5.8;
              const delay = (9 - i) * 0.025;
              return (
                <g key={i}>
                  {/* Top Walking Leg */}
                  <line
                    x1={x + 2}
                    y1="4.5"
                    x2={x - 1}
                    y2="1"
                    stroke="#FFE600"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    style={{
                      transformOrigin: `${x + 2}px 4.5px`,
                      animation: `legPaddleTop 0.18s ease-in-out infinite`,
                      animationDelay: `${delay}s`,
                    }}
                  />
                  {/* Bottom Walking Leg */}
                  <line
                    x1={x + 2}
                    y1="10.5"
                    x2={x - 1}
                    y2="14"
                    stroke="#FFE600"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    style={{
                      transformOrigin: `${x + 2}px 10.5px`,
                      animation: `legPaddleBottom 0.18s ease-in-out infinite`,
                      animationDelay: `${delay}s`,
                    }}
                  />
                  {/* Segment Body */}
                  <rect
                    x={x}
                    y="4.5"
                    width="5.2"
                    height="6"
                    rx="1.5"
                    fill={i % 2 === 0 ? '#FFE600' : '#F59E0B'}
                    stroke="#0A0A0A"
                    strokeWidth="0.8"
                  />
                </g>
              );
            })}

            {/* Head */}
            <ellipse cx="68" cy="7.5" rx="3.5" ry="3" fill="#C2410C" stroke="#0A0A0A" strokeWidth="0.8" />
            <circle cx="69" cy="6.2" r="0.8" fill="#FFFFFF" />

            {/* Antennae */}
            <path d="M 70 6.5 Q 74 4 78 2" stroke="#FFE600" strokeWidth="1" strokeLinecap="round" />
            <path d="M 70 8.5 Q 74 11 78 13" stroke="#FFE600" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}
