export default function CentipedeSpinner({ size = 48 }) {
  return (
    <div
      className="inline-block relative"
      style={{ width: size, height: size }}
      role="status"
      aria-label="Processing"
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className="animate-spin-mechanical"
      >
        {/* Outer mechanical gear teeth */}
        <circle
          cx="50"
          cy="50"
          r="44"
          fill="none"
          stroke="#0A0A0A"
          strokeWidth="3"
          strokeDasharray="6 4"
        />

        {/* Centipede segmented body */}
        <ellipse
          cx="50"
          cy="50"
          rx="24"
          ry="11"
          fill="#FFE600"
          stroke="#0A0A0A"
          strokeWidth="3"
        />
        <ellipse
          cx="50"
          cy="50"
          rx="15"
          ry="7"
          fill="#FF3333"
          stroke="#0A0A0A"
          strokeWidth="2"
        />

        {/* Head */}
        <circle
          cx="76"
          cy="50"
          r="7"
          fill="#FFE600"
          stroke="#0A0A0A"
          strokeWidth="3"
        />
        <circle cx="79" cy="48" r="2" fill="#0A0A0A" />

        {/* Antennae */}
        <line
          x1="81"
          y1="47"
          x2="92"
          y2="36"
          stroke="#0A0A0A"
          strokeWidth="2.5"
          strokeLinecap="square"
        />
        <line
          x1="81"
          y1="46"
          x2="89"
          y2="31"
          stroke="#0A0A0A"
          strokeWidth="2.5"
          strokeLinecap="square"
        />

        {/* Top legs */}
        {[30, 38, 46, 54, 62, 70].map((x, i) => (
          <line
            key={`t-${i}`}
            className="spinner-leg"
            x1={x}
            y1="40"
            x2={x - 4}
            y2="24"
            stroke="#0A0A0A"
            strokeWidth="3"
            strokeLinecap="square"
            style={{
              transformOrigin: `${x}px 40px`,
              animationDelay: `${i * 0.04}s`,
            }}
          />
        ))}

        {/* Bottom legs */}
        {[30, 38, 46, 54, 62, 70].map((x, i) => (
          <line
            key={`b-${i}`}
            className="spinner-leg"
            x1={x}
            y1="60"
            x2={x - 4}
            y2="76"
            stroke="#0A0A0A"
            strokeWidth="3"
            strokeLinecap="square"
            style={{
              transformOrigin: `${x}px 60px`,
              animationDelay: `${i * 0.04 + 0.02}s`,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
