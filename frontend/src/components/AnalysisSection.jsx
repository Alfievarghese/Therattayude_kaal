import { useState, useEffect, useRef } from 'react';
import { Camera, AlertOctagon, Activity } from 'lucide-react';
import CentipedeSpinner from './CentipedeSpinner';

const STEPS = [
  'Specimen received. Assigning case number...',
  'Deploying YOLOv8 neural pathways...',
  'Counting legs in progress... please hold',
  'OFFICIAL COUNT CONFIRMED BY COMMITTEE',
];

export default function AnalysisSection({ result, isAnalyzing }) {
  const [currentStep, setCurrentStep] = useState(-1);
  const [counterValue, setCounterValue] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showAnnotated, setShowAnnotated] = useState(false);
  const randomIntervalRef = useRef(null);

  // Clear timers helper
  const clearRandomInterval = () => {
    if (randomIntervalRef.current) {
      clearInterval(randomIntervalRef.current);
      randomIntervalRef.current = null;
    }
  };

  // Phase 1: When user clicks analyze and we wait for backend API
  useEffect(() => {
    if (!isAnalyzing && !result) {
      setCurrentStep(-1);
      setCounterValue(0);
      setShowResult(false);
      setShowAnnotated(false);
      clearRandomInterval();
      return;
    }

    if (isAnalyzing && !result) {
      setCurrentStep(0);
      setShowResult(false);
      setShowAnnotated(false);
      clearRandomInterval();

      const t1 = setTimeout(() => setCurrentStep(1), 500);
      const t2 = setTimeout(() => {
        setCurrentStep(2);
        randomIntervalRef.current = setInterval(() => {
          setCounterValue(Math.floor(Math.random() * 50) + 5);
        }, 70);
      }, 1100);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearRandomInterval();
      };
    }
  }, [isAnalyzing, result]);

  // Phase 2: When result arrives, complete the progression and reveal verdict
  useEffect(() => {
    if (!result) return;

    clearRandomInterval();

    const target = result.leg_count;
    const totalTicks = 10;
    let tick = 0;

    setCurrentStep(2);

    const tickInterval = setInterval(() => {
      tick++;
      if (tick >= totalTicks) {
        clearInterval(tickInterval);
        setCounterValue(target);
        setCurrentStep(3); // Final completed step
        setShowResult(true);
        setShowAnnotated(true);
      } else {
        setCounterValue(Math.floor((target / totalTicks) * tick) + (Math.random() > 0.5 ? 1 : 0));
      }
    }, 40);

    return () => {
      clearInterval(tickInterval);
      clearRandomInterval();
    };
  }, [result]);

  useEffect(() => {
    return () => clearRandomInterval();
  }, []);

  if (!isAnalyzing && !result) return null;

  const avgConf = result?.confidences?.length
    ? (result.confidences.reduce((a, b) => a + b, 0) / result.confidences.length * 100).toFixed(1)
    : 0;

  const getFunMessage = (count) => {
    if (count === 0) return 'OUR SCIENTISTS CONCLUDE THIS CREATURE HAS TRANSCENDED PHYSICAL LEGS ENTIRELY.';
    if (count > 40) return 'CRITICAL ANOMALY: HYPER-PODIATRIC SPECIMEN DETECTED. MODEL HAVING CRISIS.';
    if (count === 1) return 'MONOPOD DETECTED. EXTREMELY RARE. PROBABLY AN ERROR IN THE MATRIX.';
    if (count < 5) return 'SUSPICIOUSLY FEW LEGS. SPECIMEN MAY BE CONCEALING THEM FROM AUTHORITIES.';
    return null;
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-8" id="analysis-section">
      <div className="brutal-card p-6 md:p-8 bg-[#FFFFFF] shadow-brutal-xl">
        {/* Top Telemetry Header */}
        <div className="flex flex-wrap items-center justify-between border-b-3 border-[#0A0A0A] pb-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="bg-[#FF3333] text-white font-mono text-xs font-black px-2.5 py-1 border-2 border-black shadow-brutal-sm">
              TELEMETRY BUS
            </span>
            <h2 className="font-archivo text-xl md:text-2xl text-[#0A0A0A] uppercase">
              AUTOMATED PODIATRIC AUDIT
            </h2>
          </div>
          <div className="font-mono text-xs font-bold text-gray-700">
            CASE: #{result?.submission_id ? result.submission_id.slice(0, 8).toUpperCase() : 'PENDING'}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: Viewfinder / Specimen Display */}
          <div className="border-4 border-[#0A0A0A] bg-[#0A0A0A] p-2 relative shadow-brutal">
            {/* Viewfinder HUD Overlays */}
            <div className="absolute top-4 left-4 z-30 font-mono text-[10px] text-[#FFE600] bg-black/80 border border-[#FFE600] px-2 py-0.5 font-bold">
              {showAnnotated ? 'FEED: ANNOTATED_YOLO_V8' : 'FEED: OPTICAL_SENSOR'}
            </div>
            <div className="absolute top-4 right-4 z-30 font-mono text-[10px] text-[#00E676] bg-black/80 border border-[#00E676] px-2 py-0.5 font-bold">
              {showResult ? '● LOCKED' : '● SCANNING'}
            </div>

            {/* Red Laser Scan line */}
            {isAnalyzing && !showAnnotated && <div className="scan-laser" />}

            {/* Image Container */}
            <div className="w-full aspect-square bg-[#1A1A1A] flex items-center justify-center relative overflow-hidden border border-neutral-800">
              {showAnnotated && result?.annotated_image_base64 ? (
                <img
                  src={`data:image/png;base64,${result.annotated_image_base64}`}
                  alt="Annotated centipede specimen"
                  className="w-full h-full object-contain"
                />
              ) : showResult ? (
                <div className="flex flex-col items-center justify-center p-6 text-center text-white font-mono text-xs">
                  <Camera className="w-8 h-8 text-[#FFE600] mb-2" strokeWidth={2.5} />
                  <p className="text-[#FFE600] font-bold uppercase">SPECIMEN AUDITED</p>
                  <p className="text-gray-400 mt-1">Appendages isolated & cataloged</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <CentipedeSpinner size={64} />
                  <p className="font-mono text-xs text-[#FFE600] font-bold mt-4 uppercase tracking-wider">
                    ANALYZING APPENDAGES...
                  </p>
                </div>
              )}
            </div>

            {/* Viewfinder Bottom Meta */}
            <div className="mt-2 flex items-center justify-between font-mono text-[10px] text-gray-400 px-1">
              <span>COORD: 09.9312° N, 76.2673° E</span>
              <span>GRID: 640x640 PIXELS</span>
            </div>
          </div>

          {/* Right: Telemetry Cockpit & Counter */}
          <div className="flex flex-col justify-between">
            {/* Steps Checklist */}
            <div className="space-y-2 mb-6">
              {STEPS.map((stepText, i) => {
                const isCompleted = showResult || currentStep > i;
                const isActive = !showResult && currentStep === i;

                return (
                  <div
                    key={i}
                    className={`border-2 border-[#0A0A0A] p-3 font-mono text-xs flex items-center gap-3 transition-colors ${
                      isCompleted && i === 3
                        ? 'bg-[#FFE600] text-black font-black shadow-brutal-sm'
                        : isCompleted
                        ? 'bg-[#E5E7EB] text-gray-800 font-bold'
                        : isActive
                        ? 'bg-[#FFE600] text-black font-black shadow-brutal-sm'
                        : 'bg-white text-gray-400 opacity-60'
                    }`}
                  >
                    <span className="font-mono font-bold text-sm">
                      {isCompleted ? '☑' : isActive ? '▶' : '☐'}
                    </span>
                    <span className="uppercase">
                      {stepText}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Giant Tally Readout */}
            <div className="border-4 border-[#0A0A0A] bg-[#FFE600] p-6 text-center shadow-brutal relative">
              <div className="font-mono text-xs uppercase font-bold text-black border-b-2 border-black pb-2 mb-3">
                // OFFICIAL LEG COUNT VERDICT (തേരട്ടയുടെ കാൽ) //
              </div>

              <div className="font-archivo text-7xl sm:text-8xl md:text-9xl text-[#0A0A0A] leading-none tracking-tighter">
                {counterValue}
              </div>

              <div className="font-archivo text-sm uppercase tracking-widest text-[#0A0A0A] mt-2 font-bold">
                CONFIRMED LEGS
              </div>
            </div>

            {/* Telemetry Metrics */}
            {showResult && (
              <div className="mt-6 space-y-3">
                <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                  <div className="bg-[#F3F4F6] border-2 border-black p-2.5 shadow-brutal-sm">
                    <div className="text-gray-500 font-bold">CERTAINTY INDEX</div>
                    <div className="font-archivo text-lg text-black mt-0.5">{avgConf}%</div>
                  </div>
                  <div className="bg-[#F3F4F6] border-2 border-black p-2.5 shadow-brutal-sm">
                    <div className="text-gray-500 font-bold">MARGIN OF ERROR</div>
                    <div className="font-archivo text-sm text-[#FF3333] mt-1">± SEVERAL LEGS</div>
                  </div>
                </div>

                {getFunMessage(result.leg_count) && (
                  <div className="border-2 border-black bg-[#FF3333] text-white p-3 font-mono text-xs font-bold shadow-brutal-sm flex items-center gap-2.5">
                    <AlertOctagon className="w-5 h-5 text-white shrink-0" strokeWidth={2.5} />
                    <span>{getFunMessage(result.leg_count)}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
