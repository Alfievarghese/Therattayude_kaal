import { useState, useEffect } from 'react';
import { Download, Printer, ZoomIn, ZoomOut, UserCheck } from 'lucide-react';
import CentipedeSpinner from './CentipedeSpinner';

const API_BASE = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/+$/, '') : '';

export default function CertificateSection({ submissionId }) {
  const [loading, setLoading] = useState(false);
  const [recipientName, setRecipientName] = useState('');
  const [activeName, setActiveName] = useState('');
  const [certUrl, setCertUrl] = useState(null);
  const [zoom, setZoom] = useState(false);

  const buildCertUrl = (name) => {
    if (!submissionId) return null;
    const base = `${API_BASE}/certificate/${submissionId}`;
    return name && name.trim() ? `${base}?name=${encodeURIComponent(name.trim())}` : base;
  };

  // Load live certificate preview as soon as submissionId is available
  useEffect(() => {
    if (!submissionId) return;
    setCertUrl(buildCertUrl(activeName));
  }, [submissionId, activeName]);

  const handleApplyName = (e) => {
    e?.preventDefault();
    setActiveName(recipientName);
  };

  const handleDownload = async () => {
    setLoading(true);
    try {
      const targetUrl = buildCertUrl(activeName);
      const res = await fetch(targetUrl);
      if (!res.ok) throw new Error('Failed to fetch certificate');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const safeName = activeName ? activeName.trim().replace(/\s+/g, '_').toLowerCase() : 'diploma';
      a.download = `certificate_${safeName}_${submissionId.slice(0, 8)}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Certificate download failed:', err);
    }
    setLoading(false);
  };

  const handlePrint = () => {
    const printWindow = window.open(certUrl, '_blank');
    printWindow?.focus();
    printWindow?.print();
  };

  if (!submissionId) return null;

  return (
    <section className="max-w-5xl mx-auto px-4 py-10" id="certificate-section">
      <div className="brutal-card p-6 md:p-8 bg-[#FFFFFF] shadow-brutal-xl">
        {/* Header Ribbon */}
        <div className="flex flex-wrap items-center justify-between border-b-3 border-[#0A0A0A] pb-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="bg-[#FFE600] text-black font-mono text-xs font-black px-2.5 py-1 border-2 border-black shadow-brutal-sm">
              PHASE 04
            </span>
            <h2 className="font-archivo text-xl md:text-2xl text-[#0A0A0A] uppercase tracking-tight">
              COMMENDATION OF COMPLETE FUTILITY
            </h2>
          </div>
          <div className="font-mono text-xs font-bold text-gray-700 bg-[#FAF8F5] border border-black px-2 py-0.5 shadow-brutal-sm">
            STATUS: DIPLOMA ISSUED
          </div>
        </div>

        <div className="text-center mb-6">
          <div className="inline-block bg-[#0A0A0A] text-[#FFE600] font-mono text-xs font-bold uppercase px-3 py-1 mb-2 shadow-brutal-sm">
            FORM TK-8001 // CERTIFICATION OF SQUANDERED COGNITION
          </div>
          <h3 className="font-archivo text-2xl sm:text-3xl text-[#0A0A0A] uppercase tracking-tight">
            OFFICIAL CERTIFICATE OF USELESS SCIENTIFIC ACHIEVEMENT
          </h3>
          <p className="font-mono text-xs sm:text-sm text-gray-700 font-bold max-w-xl mx-auto mt-2">
            Ratified by the Department of Absolutely Unnecessary Research (Kerala Division). Suitable for framing, refrigerator display, or evidence in court against claims of your productivity.
          </p>
        </div>

        {/* Personalized Candidate Name Input */}
        <form
          onSubmit={handleApplyName}
          className="mb-6 p-4 bg-[#FEF9C3] border-3 border-[#0A0A0A] shadow-brutal flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <div className="flex items-center gap-2 font-mono text-xs font-black uppercase text-[#0A0A0A] shrink-0">
            <UserCheck className="w-4 h-4 text-black" strokeWidth={2.5} />
            DIPLOMA RECIPIENT NAME:
          </div>
          <div className="flex w-full sm:w-auto items-center gap-2 flex-1 max-w-md">
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="e.g. SRI. ALBIN JOSEPH, ESQ."
              className="w-full bg-white border-2 border-[#0A0A0A] px-3 py-1.5 font-mono text-xs font-bold text-[#0A0A0A] placeholder-gray-400 focus:outline-none focus:bg-[#FFFDE6]"
            />
            <button
              type="submit"
              className="brutal-btn brutal-btn-white text-xs px-3 py-1.5 shrink-0 whitespace-nowrap"
            >
              ENGRAVE NAME
            </button>
          </div>
        </form>

        {/* Live Certificate Preview Frame */}
        <div className="border-4 border-[#0A0A0A] bg-[#FAF8F5] p-3 sm:p-4 shadow-brutal-lg relative group">

          <div className="flex items-center justify-between font-mono text-xs uppercase font-bold text-gray-700 border-b-2 border-black pb-2 mb-3">
            <span>[ LIVE DIPLOMA PREVIEW // HIGH-RES 1800x1200 ROYAL DIPLOMA ]</span>
            <button
              type="button"
              onClick={() => setZoom(!zoom)}
              className="text-black hover:underline cursor-pointer font-bold inline-flex items-center gap-1"
            >
              {zoom ? (
                <>
                  <ZoomOut className="w-3.5 h-3.5" strokeWidth={2.5} />
                  FIT VIEW
                </>
              ) : (
                <>
                  <ZoomIn className="w-3.5 h-3.5" strokeWidth={2.5} />
                  EXPAND VIEW
                </>
              )}
            </button>
          </div>

          <div className={`overflow-auto flex justify-center bg-white border-2 border-black p-2 ${zoom ? 'max-h-none' : 'max-h-[580px]'}`}>
            {certUrl ? (
              <img
                src={certUrl}
                alt="Official Royal Certificate of Useless Achievement"
                className="w-full h-auto object-contain border border-gray-300 shadow-sm"
              />
            ) : (
              <div className="py-20 flex flex-col items-center">
                <CentipedeSpinner size={48} />
                <p className="font-mono text-xs font-bold text-gray-600 mt-3 uppercase">
                  Rendering Diplomatic Parchment...
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center items-center">
          <button
            type="button"
            onClick={handleDownload}
            disabled={loading}
            className="brutal-btn text-base sm:text-lg shadow-brutal-lg hover:shadow-brutal-xl inline-flex items-center gap-2"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <CentipedeSpinner size={22} />
                PACKAGING CERTIFICATE...
              </span>
            ) : (
              <>
                <Download className="w-5 h-5" strokeWidth={2.5} />
                DOWNLOAD OFFICIAL HIGH-RES DIPLOMA (.PNG)
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="brutal-btn brutal-btn-white text-sm sm:text-base inline-flex items-center gap-2"
          >
            <Printer className="w-4 h-4 text-black" strokeWidth={2.5} />
            PRINT DIPLOMA
          </button>
        </div>

        <div className="mt-4 text-center font-mono text-[11px] text-gray-500 font-bold uppercase">
          // INCLUDES 3 OFFICIAL VERIFICATION SIGNATURES, CAUTION SIGNS & CRIME SCENE SPECIMEN EXHIBIT //
        </div>
      </div>
    </section>
  );
}
