import { useState, useEffect } from 'react';
import { Crown, Bug, Trophy } from 'lucide-react';
import CentipedeSpinner from './CentipedeSpinner';

const API_BASE = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/+$/, '') : '';

export default function Leaderboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch(`${API_BASE}/leaderboard`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error('Leaderboard fetch failed:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  useEffect(() => {
    const handler = () => fetchLeaderboard();
    window.addEventListener('refreshLeaderboard', handler);
    return () => window.removeEventListener('refreshLeaderboard', handler);
  }, []);

  return (
    <section className="max-w-5xl mx-auto px-4 py-12" id="leaderboard-section">
      <div className="brutal-card p-6 md:p-8 bg-[#FFFFFF] shadow-brutal-xl">
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between border-b-3 border-[#0A0A0A] pb-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="bg-[#FFE600] text-black font-mono text-xs font-black px-2.5 py-1 border-2 border-black shadow-brutal-sm">
              REGISTRY
            </span>
            <h2 className="font-archivo text-2xl md:text-3xl text-[#0A0A0A] uppercase">
              HALL OF LEGS // GLOBAL LEADERBOARD
            </h2>
          </div>
          <div className="font-mono text-xs font-bold text-gray-700">
            METRIC: TOP PODIATRIC COUNTS
          </div>
        </div>

        {/* Aggregate Stats Ribbons */}
        {data && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="border-3 border-[#0A0A0A] bg-[#FAF8F5] p-4 shadow-brutal-sm">
              <div className="font-mono text-[10px] uppercase font-bold text-gray-600">
                TOTAL APPENDAGES CATALOGED
              </div>
              <div className="font-archivo text-3xl text-[#0A0A0A] mt-1">
                {data.total_legs?.toLocaleString() || 0}
              </div>
            </div>
            <div className="border-3 border-[#0A0A0A] bg-[#FAF8F5] p-4 shadow-brutal-sm">
              <div className="font-mono text-[10px] uppercase font-bold text-gray-600">
                LIVES IMPROVED
              </div>
              <div className="font-archivo text-3xl text-[#FF3333] mt-1">
                {data.lives_improved || 0}
              </div>
            </div>
            <div className="border-3 border-[#0A0A0A] bg-[#FAF8F5] p-4 shadow-brutal-sm">
              <div className="font-mono text-[10px] uppercase font-bold text-gray-600">
                ACADEMIC UTILITY
              </div>
              <div className="font-archivo text-3xl text-gray-800 mt-1">
                NULL
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="py-12 text-center flex flex-col items-center justify-center">
            <CentipedeSpinner size={48} />
            <p className="font-mono text-xs font-bold text-gray-700 mt-4 uppercase">
              QUERYING ARCHIVE OF FUTILITY...
            </p>
          </div>
        ) : !data || data.entries.length === 0 ? (
          <div className="border-3 border-dashed border-[#0A0A0A] p-8 text-center bg-[#F9FAFB]">
            <Bug className="w-12 h-12 text-gray-400 mx-auto mb-2" strokeWidth={2} />
            <p className="font-archivo text-lg uppercase text-[#0A0A0A]">
              NO SPECIMENS IN ARCHIVE
            </p>
            <p className="font-mono text-xs text-gray-600 mt-1">
              Be the premier pioneer to upload a centipede and claim the throne of pointlessness.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto border-3 border-[#0A0A0A] shadow-brutal">
            <table className="w-full text-left border-collapse font-mono text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#FFE600] border-b-3 border-[#0A0A0A] text-[#0A0A0A]">
                  <th className="p-3 font-archivo uppercase border-r-2 border-[#0A0A0A]">RANK</th>
                  <th className="p-3 font-archivo uppercase border-r-2 border-[#0A0A0A]">LEGS DETECTED</th>
                  <th className="p-3 font-archivo uppercase border-r-2 border-[#0A0A0A]">DATE LOGGED</th>
                  <th className="p-3 font-archivo uppercase">SPECIMEN THUMBNAIL</th>
                </tr>
              </thead>
              <tbody>
                {data.entries.map((entry, i) => (
                  <tr
                    key={entry.submission_id}
                    className={`border-b-2 border-[#0A0A0A] hover:bg-[#FFFDE6] transition-colors ${
                      i === 0 ? 'bg-[#FFFBEA]' : i % 2 === 0 ? 'bg-white' : 'bg-[#FAF8F5]'
                    }`}
                  >
                    <td className="p-3 font-bold border-r-2 border-[#0A0A0A]">
                      {i === 0 ? (
                        <div className="inline-flex items-center gap-2">
                          <span className="bg-[#FFE600] border border-black px-2 py-0.5 text-xs font-archivo shadow-brutal-sm inline-flex items-center gap-1.5">
                            <Crown className="w-4 h-4 text-black fill-[#FFE600]" strokeWidth={2.5} />
                            #1 WORLD RECORD
                          </span>
                        </div>
                      ) : (
                        <span className="font-archivo text-base">#{i + 1}</span>
                      )}
                    </td>

                    <td className="p-3 font-bold border-r-2 border-[#0A0A0A]">
                      <span className="font-archivo text-xl sm:text-2xl text-[#0A0A0A]">
                        {entry.leg_count}
                      </span>
                      <span className="text-[10px] text-gray-600 uppercase ml-1">LEGS</span>
                    </td>

                    <td className="p-3 text-gray-700 font-bold border-r-2 border-[#0A0A0A]">
                      {new Date(entry.timestamp).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>

                    <td className="p-3">
                      {entry.thumbnail_base64 ? (
                        <img
                          src={`data:image/png;base64,${entry.thumbnail_base64}`}
                          alt="Specimen thumbnail"
                          className="w-14 h-14 object-cover border-2 border-[#0A0A0A] bg-black shadow-brutal-sm"
                        />
                      ) : (
                        <div className="w-14 h-14 border-2 border-[#0A0A0A] bg-gray-200 flex items-center justify-center text-[10px] text-gray-500 font-bold">
                          NO IMG
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
