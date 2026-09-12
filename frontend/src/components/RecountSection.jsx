import { useState } from 'react';
import { RotateCcw, Scale, RefreshCw } from 'lucide-react';
import CentipedeSpinner from './CentipedeSpinner';

const API_BASE = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/+$/, '') : '';

export default function RecountSection({ submissionId }) {
  const [loading, setLoading] = useState(false);
  const [recountData, setRecountData] = useState(null);
  const [revealStep, setRevealStep] = useState(-1);

  const handleRecount = async () => {
    setLoading(true);
    setRecountData(null);
    setRevealStep(-1);

    try {
      const res = await fetch(`${API_BASE}/recount/${submissionId}`, { method: 'POST' });
      const data = await res.json();
      setRecountData(data);
      setLoading(false);

      setTimeout(() => setRevealStep(0), 400);
      setTimeout(() => setRevealStep(1), 1100);
      setTimeout(() => setRevealStep(2), 1800);
      setTimeout(() => setRevealStep(3), 2600);
    } catch (err) {
      console.error('Recount failed:', err);
      setLoading(false);
    }
  };

  if (!submissionId) return null;

  return (
    <section className="max-w-4xl mx-auto px-4 py-8" id="recount-section">
      <div className="brutal-card p-6 md:p-8 bg-[#FFFFFF] shadow-brutal-lg text-center">
        {/* Header Tag */}
        <div className="inline-block bg-[#0A0A0A] text-[#FFE600] font-mono text-xs font-bold uppercase px-3 py-1 mb-4 shadow-brutal-sm">
          DISPUTED SPECIMEN TRIBUNAL
        </div>

        <h3 className="font-archivo text-2xl md:text-3xl text-[#0A0A0A] uppercase mb-2">
          WE DON&rsquo;T TRUST THIS COUNT EITHER
        </h3>
        <p className="font-mono text-xs sm:text-sm text-gray-700 font-bold max-w-xl mx-auto mb-6">
          Demand an immediate triple-tier recount across fluctuating algorithmic confidence thresholds.
        </p>

        {!recountData && !loading && (
          <div>
            <button
              onClick={handleRecount}
              className="brutal-btn brutal-btn-red text-base md:text-lg inline-flex items-center gap-2"
            >
              <RotateCcw className="w-5 h-5" strokeWidth={2.5} />
              DEMAND COMMITTEE RECOUNT (HIGH DRAMA)
            </button>
            <div className="font-mono text-[11px] text-gray-500 font-bold mt-3 uppercase">
              [ RERUNS MODEL AT CONFIDENCE = 0.10, 0.15, 0.20 ]
            </div>
          </div>
        )}

        {loading && (
          <div className="py-8 flex flex-col items-center justify-center">
            <CentipedeSpinner size={52} />
            <p className="font-archivo text-base text-[#0A0A0A] mt-4 uppercase">
              CONVENING PODIATRIC EMERGENCY COMMITTEE...
            </p>
            <p className="font-mono text-xs text-gray-600 mt-1">
              Squabbling over leg boundaries in progress
            </p>
          </div>
        )}

        {recountData && (
          <div className="mt-4 text-left">
            {/* 3 Attempts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {recountData.attempts.map((attempt, i) => {
                const isRevealed = revealStep >= i;
                return (
                  <div
                    key={i}
                    className={`border-3 border-[#0A0A0A] p-4 text-center transition-all ${
                      isRevealed
                        ? 'bg-[#FFFDE6] shadow-brutal opacity-100 scale-100'
                        : 'bg-gray-100 border-dashed opacity-30 scale-95'
                    }`}
                  >
                    <div className="font-mono text-xs uppercase font-bold text-gray-600 mb-1">
                      AUDIT TIER 0{i + 1}
                    </div>
                    <div className="font-archivo text-4xl text-[#0A0A0A]">
                      {isRevealed ? attempt.leg_count : '??'}
                    </div>
                    <div className="font-mono text-[10px] text-gray-500 font-bold uppercase mt-1">
                      THRESHOLD: {attempt.confidence_threshold}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Democratic Consensus Verdict */}
            {revealStep >= 3 && (
              <div className="border-4 border-[#0A0A0A] bg-[#FFE600] p-6 shadow-brutal">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#0A0A0A] pb-3 mb-3">
                  <span className="font-archivo text-lg uppercase text-[#0A0A0A] inline-flex items-center gap-2">
                    <Scale className="w-5 h-5 text-black" strokeWidth={2.5} />
                    OFFICIAL COMMITTEE CONSENSUS
                  </span>
                  <span className="stamp-badge bg-[#0A0A0A] text-white text-xs">
                    VERDICT RATIFIED
                  </span>
                </div>

                <div className="font-mono text-sm sm:text-base text-gray-900 font-bold">
                  DEMOCRATIC MAJORITY CONSENSUS:{' '}
                  <span className="font-archivo text-2xl text-[#0A0A0A] bg-white px-2 py-0.5 border-2 border-black inline-block ml-1">
                    {recountData.consensus} LEGS
                  </span>
                </div>

                {recountData.dissenting_counts.length > 0 && (
                  <p className="font-mono text-xs text-gray-800 font-bold mt-3 bg-white/70 border border-black p-2">
                    NOTE: Dissenting count(s) of [{recountData.dissenting_counts.join(', ')}] have been thoroughly filed, archived, and permanently disregarded.
                  </p>
                )}

                <div className="mt-4 pt-3 border-t-2 border-[#0A0A0A] flex justify-end">
                  <button
                    onClick={() => {
                      setRecountData(null);
                      setRevealStep(-1);
                    }}
                    className="brutal-btn brutal-btn-white text-xs inline-flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" strokeWidth={2.5} />
                    STILL IN DENIAL? RECOUNT AGAIN
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
