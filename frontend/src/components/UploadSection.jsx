import { useState, useRef } from 'react';
import { Microscope, Trash2, FlaskConical, UploadCloud, AlertTriangle } from 'lucide-react';

export default function UploadSection({ onUpload, isAnalyzing }) {
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [sampleLoading, setSampleLoading] = useState(false);
  const [sampleIndex, setSampleIndex] = useState(0);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    if (file.type && typeof file.type === 'string' && !file.type.startsWith('image/')) return;
    setSelectedFile(file);
    try {
      setPreview(URL.createObjectURL(file));
    } catch (e) {
      console.warn('Could not create ObjectURL:', e);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer?.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleClick = () => {
    if (!isAnalyzing) fileInputRef.current?.click();
  };

  const handleInputChange = (e) => {
    const file = e.target?.files?.[0];
    if (file) handleFile(file);
  };

  const handleLoadSample = async (samplePath, filename) => {
    if (isAnalyzing || sampleLoading) return;
    setSampleLoading(true);
    try {
      const res = await fetch(samplePath);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      const file = new File([blob], filename, { type: blob.type || 'image/jpeg' });
      handleFile(file);
    } catch (err) {
      console.error('Failed to load sample:', err);
    } finally {
      setSampleLoading(false);
    }
  };

  const handleStartAnalysis = () => {
    if (selectedFile && !isAnalyzing) {
      onUpload(selectedFile);
    }
  };

  const handleClear = (e) => {
    e?.stopPropagation();
    setSelectedFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-10" id="upload-section">
      <div className="brutal-card p-6 md:p-8 bg-[#FFFFFF] shadow-brutal-xl">
        {/* Header Ribbon */}
        <div className="flex flex-wrap items-center justify-between border-b-3 border-[#0A0A0A] pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-black uppercase bg-[#FFE600] px-2.5 py-1 border-2 border-black shadow-brutal-sm">
              PHASE 01
            </span>
            <h2 className="font-archivo text-xl md:text-2xl text-[#0A0A0A] uppercase tracking-tight">
              SPECIMEN INTAKE PORTAL
            </h2>
          </div>
          <div className="font-mono text-xs text-gray-700 font-bold bg-[#FAF8F5] border border-black px-2 py-0.5 shadow-brutal-sm">
            DOC: SEC-AUDIT-2026
          </div>
        </div>

        {/* Upload Zone */}
        <div
          className={`relative border-4 border-dashed transition-all p-8 md:p-12 text-center cursor-pointer select-none ${
            dragOver
              ? 'border-[#0A0A0A] bg-[#FFE600] scale-[1.01]'
              : preview
              ? 'border-[#0A0A0A] bg-[#FAF8F5]'
              : 'border-[#0A0A0A] bg-[#FDFCF7] hover:bg-[#FFFDE6]'
          } ${isAnalyzing ? 'opacity-60 pointer-events-none' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleClick}
        >
          {/* Corner marks */}
          <div className="absolute top-2 left-2 font-mono text-xs text-[#0A0A0A] font-black">+</div>
          <div className="absolute top-2 right-2 font-mono text-xs text-[#0A0A0A] font-black">+</div>
          <div className="absolute bottom-2 left-2 font-mono text-xs text-[#0A0A0A] font-black">+</div>
          <div className="absolute bottom-2 right-2 font-mono text-xs text-[#0A0A0A] font-black">+</div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleInputChange}
          />

          {preview ? (
            <div className="flex flex-col items-center">
              {/* Mounted Specimen Card */}
              <div className="relative border-4 border-[#0A0A0A] bg-white p-3 shadow-brutal-lg max-w-md w-full">
                <div className="flex items-center justify-between font-mono text-[10px] uppercase font-bold text-gray-700 border-b-2 border-black pb-1.5 mb-2">
                  <span>[ SPECIMEN MOUNT ]</span>
                  <span className="text-[#00E676] bg-black px-1.5 py-0.5">● MOUNTED</span>
                </div>

                <img
                  src={preview}
                  alt="Specimen preview"
                  className="w-full max-h-72 object-contain bg-[#0A0A0A] border-2 border-black"
                />

                <div className="mt-2 flex items-center justify-between font-mono text-xs border-t-2 border-[#0A0A0A] pt-2 text-[#0A0A0A] font-bold">
                  <span>NAME: {selectedFile?.name?.slice(0, 22)}</span>
                  <span>{(selectedFile?.size / 1024).toFixed(1)} KB</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap gap-4 justify-center" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  onClick={handleStartAnalysis}
                  disabled={isAnalyzing}
                  className="brutal-btn text-base sm:text-lg shadow-brutal-lg hover:shadow-brutal-xl inline-flex items-center gap-2"
                >
                  <Microscope className="w-5 h-5" strokeWidth={2.5} />
                  INITIALIZE LEG COUNTING PROTOCOL
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  disabled={isAnalyzing}
                  className="brutal-btn brutal-btn-white text-sm inline-flex items-center gap-1.5"
                >
                  <Trash2 className="w-4 h-4 text-red-600" strokeWidth={2.5} />
                  DETACH SPECIMEN
                </button>
              </div>
            </div>
          ) : (
            <div className="py-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#FFE600] border-4 border-[#0A0A0A] shadow-brutal mb-4 transform -rotate-2">
                <UploadCloud className="w-10 h-10 text-[#0A0A0A]" strokeWidth={2.5} />
              </div>
              <h3 className="font-archivo text-2xl md:text-3xl text-[#0A0A0A] uppercase tracking-tight mb-2">
                DROP CENTIPEDE SPECIMEN HERE
              </h3>
              <p className="font-mono text-xs sm:text-sm text-gray-700 font-bold max-w-md mx-auto mb-4">
                Drag and drop a clear photograph of a centipede (not actual atta/millipede, homie!), or click anywhere inside this boundary.
              </p>
              <div className="inline-block bg-[#0A0A0A] text-[#FFE600] font-mono text-xs uppercase px-3 py-1.5 font-black shadow-brutal-sm">
                COMPATIBLE: JPG, PNG, WEBP // OPTICAL RESOLUTION PREFERRED
              </div>
            </div>
          )}
        </div>

        {/* Taxonomic Clarification Disclaimer (Centipedes vs Millipedes/Theratta) */}
        <div className="mt-4 bg-[#FFE600] border-3 border-[#0A0A0A] p-3.5 text-[#0A0A0A] font-mono text-xs shadow-brutal-sm flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-[#0A0A0A] shrink-0 mt-0.5" strokeWidth={2.5} />
          <div>
            <span className="font-black uppercase bg-[#0A0A0A] text-[#FFE600] px-2 py-0.5 mr-2 inline-block mb-1">
              ⚠️ TAXONOMIC ADVISORY: CENTIPEDES (പഴുതാര) ONLY
            </span>
            <p className="font-bold leading-relaxed text-gray-900">
              Look, in true <strong>USELESS PROJECT</strong> fashion, we proudly named the website <em>&ldquo;തേരട്ടയുടെ കാൽ&rdquo;</em> but we can&apos;t even count actual <strong>atta / theratta</strong> (millipede) legs, homie! Our AI only recognizes predatory <strong>CENTIPEDES (പഴുതാര / Chilopoda)</strong> with distinct outward-facing legs. Round curling millipedes have hundreds of dense microscopic legs that will cause the neural network to experience existential dread. <u>Centipede photos only!</u>
            </p>
          </div>
        </div>

        {/* Quick Sample Selector - Single Button */}
        {!preview && (
          <div className="mt-6 pt-4 border-t-2 border-black flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs">
            <span className="font-bold text-gray-700 uppercase">
              // NO SPECIMEN ON HAND? LOAD OFFICIAL ARCHIVE:
            </span>
            <button
              type="button"
              onClick={() => {
                const sampleNum = sampleIndex % 2 === 0 ? '1' : '2';
                setSampleIndex((prev) => prev + 1);
                handleLoadSample(`/samples/sample${sampleNum}.jpg`, `specimen_sample_${sampleNum}.jpg`);
              }}
              disabled={sampleLoading || isAnalyzing}
              className="brutal-btn brutal-btn-white text-xs px-4 py-2 inline-flex items-center gap-2 font-black"
            >
              <FlaskConical className="w-4 h-4 text-black" strokeWidth={2.5} />
              LOAD SPECIMEN
            </button>
          </div>
        )}

        {/* Warning Banner */}
        <div className="mt-4 bg-[#FF3333] border-3 border-[#0A0A0A] p-3.5 text-white font-mono text-xs flex items-center gap-3 shadow-brutal-sm">
          <AlertTriangle className="w-6 h-6 text-white shrink-0" strokeWidth={2.5} />
          <span className="font-bold uppercase tracking-wide">
            WARNING: COUNTING CENTIPEDE LEGS HAS NO DOCUMENTED ECONOMIC, PHILOSOPHICAL, OR SPIRITUAL BENEFIT TO HUMAN CIVILIZATION.
          </span>
        </div>
      </div>
    </section>
  );
}
