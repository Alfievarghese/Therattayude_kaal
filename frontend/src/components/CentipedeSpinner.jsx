export default function CentipedeSpinner({ size = 48, dark = false, className = '' }) {
  const strokeColor = dark ? '#00E676' : '#0A0A0A';
  const subStrokeColor = dark ? '#FFE600' : '#0A0A0A';
  const legColor = dark ? '#FFE600' : '#0A0A0A';
  const footDotColor = dark ? '#00E5FF' : '#FF3333';
  const radarSweepColor = dark ? '#00E676' : '#FFE600';
  const reticleColor = dark ? '#FFFFFF' : '#0A0A0A';
  const antennaColor = dark ? '#FFE600' : '#0A0A0A';

  // Leg coordinates along horizontal axis
  const legXCoords = [31, 39, 47, 55, 63];

  return (
    <div
      className={`inline-block relative ${className}`}
      style={{ width: size, height: size }}
      role="status"
      aria-label="Analyzing appendages"
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className="w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Radar Sweep Gradient Cone */}
          <linearGradient
            id={`radarSweepGrad-${dark ? 'dark' : 'light'}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor={radarSweepColor} stopOpacity={dark ? 0.45 : 0.55} />
            <stop offset="60%" stopColor={radarSweepColor} stopOpacity={dark ? 0.12 : 0.15} />
            <stop offset="100%" stopColor={radarSweepColor} stopOpacity="0" />
          </linearGradient>

          {/* Glow filter for dark telemetry mode */}
          {dark && (
            <filter id="radarGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          )}
        </defs>

        {/* 1. Static Targeting Brackets [ ] and Precision Crosshairs */}
        <g className="animate-reticle-pulse" opacity={dark ? 0.85 : 0.6}>
          {/* Corner HUD Brackets */}
          <path
            d="M 17 25 L 17 17 L 25 17"
            stroke={reticleColor}
            strokeWidth="2.2"
            strokeLinecap="square"
          />
          <path
            d="M 75 17 L 83 17 L 83 25"
            stroke={reticleColor}
            strokeWidth="2.2"
            strokeLinecap="square"
          />
          <path
            d="M 17 75 L 17 83 L 25 83"
            stroke={reticleColor}
            strokeWidth="2.2"
            strokeLinecap="square"
          />
          <path
            d="M 75 83 L 83 83 L 83 75"
            stroke={reticleColor}
            strokeWidth="2.2"
            strokeLinecap="square"
          />

          {/* Precision Cardinal Ticks */}
          <line x1="50" y1="3" x2="50" y2="7" stroke={reticleColor} strokeWidth="2" strokeLinecap="square" />
          <line x1="50" y1="93" x2="50" y2="97" stroke={reticleColor} strokeWidth="2" strokeLinecap="square" />
          <line x1="3" y1="50" x2="7" y2="50" stroke={reticleColor} strokeWidth="2" strokeLinecap="square" />
          <line x1="93" y1="50" x2="97" y2="50" stroke={reticleColor} strokeWidth="2" strokeLinecap="square" />
        </g>

        {/* 2. Counter-Rotating Inner Telemetry Ring */}
        <g className="animate-radar-counter">
          <circle
            cx="50"
            cy="50"
            r="38"
            stroke={subStrokeColor}
            strokeWidth="1.4"
            strokeDasharray="3 5"
            opacity={dark ? 0.75 : 0.55}
          />
          {/* Small cardinal calibration nodes */}
          <circle cx="50" cy="12" r="1.5" fill={subStrokeColor} />
          <circle cx="50" cy="88" r="1.5" fill={subStrokeColor} />
          <circle cx="12" cy="50" r="1.5" fill={subStrokeColor} />
          <circle cx="88" cy="50" r="1.5" fill={subStrokeColor} />
        </g>

        {/* 3. Outer Rotating Radar Reticle Ring with Sweep Beam */}
        <g className="animate-radar-sweep">
          {/* Outer Segmented Radar Ring */}
          <circle
            cx="50"
            cy="50"
            r="44"
            stroke={strokeColor}
            strokeWidth="2.5"
            strokeDasharray="14 6 4 6"
            filter={dark ? 'url(#radarGlow)' : undefined}
          />

          {/* Sweeping Radar Cone Wedge */}
          <path
            d="M 50 50 L 50 6 A 44 44 0 0 0 18.9 18.9 Z"
            fill={`url(#radarSweepGrad-${dark ? 'dark' : 'light'})`}
          />

          {/* Leading Radar Sweep Beam Line */}
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="6"
            stroke={strokeColor}
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Glowing Optical Sensor Blip at Sweep Head */}
          <circle
            cx="50"
            cy="6"
            r="3"
            fill={dark ? '#00E676' : '#FF3333'}
            stroke={dark ? '#FFFFFF' : '#0A0A0A'}
            strokeWidth="1.2"
          />
        </g>

        {/* 4. Active Centipede Specimen Under Optical Analysis (Horizontal Orientation) */}
        <g className="spinner-specimen-wave">
          {/* Caudal Cerci / Tail Feelers (Rear Left) */}
          <path
            d="M 23 48 Q 15 44 8 38"
            stroke={antennaColor}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 23 52 Q 15 56 8 62"
            stroke={antennaColor}
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Top Jointed Walking Legs with Optical Detection Dots */}
          {legXCoords.map((x, i) => (
            <g
              key={`top-leg-${i}`}
              className="spinner-leg-top"
              style={{
                transformOrigin: `${x}px 43px`,
                animationDelay: `${i * 0.045}s`,
              }}
            >
              {/* Jointed Leg Polyline (Coxa -> Femur -> Tarsus) */}
              <polyline
                points={`${x},43 ${x - 3},34 ${x - 6},25`}
                stroke={legColor}
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Telemetry Tracking Detection Ring/Dot on Leg Tip */}
              <circle
                cx={x - 6}
                cy={25}
                r="1.8"
                fill={footDotColor}
                stroke={dark ? '#000000' : '#0A0A0A'}
                strokeWidth="0.8"
                className="animate-foot-ping"
                style={{ animationDelay: `${i * 0.08}s` }}
              />
            </g>
          ))}

          {/* Bottom Jointed Walking Legs with Optical Detection Dots */}
          {legXCoords.map((x, i) => (
            <g
              key={`bot-leg-${i}`}
              className="spinner-leg-bottom"
              style={{
                transformOrigin: `${x}px 57px`,
                animationDelay: `${i * 0.045 + 0.025}s`,
              }}
            >
              {/* Jointed Leg Polyline */}
              <polyline
                points={`${x},57 ${x - 3},66 ${x - 6},75`}
                stroke={legColor}
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Telemetry Tracking Detection Ring/Dot on Leg Tip */}
              <circle
                cx={x - 6}
                cy={75}
                r="1.8"
                fill={footDotColor}
                stroke={dark ? '#000000' : '#0A0A0A'}
                strokeWidth="0.8"
                className="animate-foot-ping"
                style={{ animationDelay: `${i * 0.08 + 0.04}s` }}
              />
            </g>
          ))}

          {/* Segmented Exoskeleton Tergite Plates */}
          {/* Segment 1 (Rear) */}
          <ellipse cx="27" cy="50" rx="6.5" ry="6" fill="#FFE600" stroke="#0A0A0A" strokeWidth="2.2" />
          <ellipse cx="27" cy="50" rx="3.5" ry="3" fill="#FF3333" />

          {/* Segment 2 */}
          <ellipse cx="36" cy="50" rx="7" ry="7" fill="#F59E0B" stroke="#0A0A0A" strokeWidth="2.2" />
          <ellipse cx="36" cy="50" rx="3.5" ry="3.5" fill="#FF3333" />

          {/* Segment 3 (Midsection) */}
          <ellipse cx="46" cy="50" rx="7.5" ry="7.5" fill="#FFE600" stroke="#0A0A0A" strokeWidth="2.2" />
          <ellipse cx="46" cy="50" rx="4" ry="4" fill="#FF3333" />

          {/* Segment 4 */}
          <ellipse cx="56" cy="50" rx="7" ry="7" fill="#F59E0B" stroke="#0A0A0A" strokeWidth="2.2" />
          <ellipse cx="56" cy="50" rx="3.5" ry="3.5" fill="#FF3333" />

          {/* Segment 5 */}
          <ellipse cx="65" cy="50" rx="6.5" ry="6.5" fill="#FFE600" stroke="#0A0A0A" strokeWidth="2.2" />
          <ellipse cx="65" cy="50" rx="3" ry="3" fill="#FF3333" />

          {/* Cephalic Head Plate */}
          <circle cx="74" cy="50" r="7" fill="#FFE600" stroke="#0A0A0A" strokeWidth="2.2" />

          {/* Head Glint / Compound Eyes */}
          <circle cx="76.5" cy="47" r="1.8" fill="#0A0A0A" />
          <circle cx="77.2" cy="46.5" r="0.7" fill="#FFFFFF" />
          <circle cx="76.5" cy="53" r="1.8" fill="#0A0A0A" />
          <circle cx="77.2" cy="52.5" r="0.7" fill="#FFFFFF" />

          {/* Forcipules / Poison Fangs */}
          <path
            d="M 78 47 Q 83 48 82 50 Q 83 52 78 53"
            stroke="#0A0A0A"
            strokeWidth="1.8"
            fill="none"
          />

          {/* Whip-Like Antennae (Head Right) */}
          <path
            d="M 79 46 Q 88 41 95 33"
            stroke={antennaColor}
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M 79 54 Q 88 59 95 67"
            stroke={antennaColor}
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}
