import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import resumeImg from '../assets/resume.jpg';

const ResumeModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState('prompt'); // 'prompt' or 'viewer'
  const [scale, setScale] = useState(1);

  // Reset step and zoom when modal closes or opens
  useEffect(() => {
    if (isOpen) {
      setStep('prompt');
      setScale(1);
    }
  }, [isOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.5));
  const handleResetZoom = () => setScale(1);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          onClick={(e) => {
            // Close if clicking directly on the backdrop
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          {step === 'prompt' ? (
            /* PROMPT MODAL */
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-[#141414] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-[0_0_60px_rgba(255,42,42,0.25)] text-white relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Background red glow circle */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#ff2a2a]/20 rounded-full blur-3xl pointer-events-none"></div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Icon Badge */}
              <div className="w-14 h-14 rounded-2xl bg-[#ff2a2a]/15 border border-[#ff2a2a]/30 flex items-center justify-center mb-6 text-[#ff2a2a] shadow-[0_0_20px_rgba(255,42,42,0.3)]">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>

              {/* Content */}
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-3">
                View my Resume
              </h3>
              <p className="text-white/70 text-sm sm:text-base mb-8 leading-relaxed font-medium">
                Would you like to take a look at my resume, qualifications, education timeline, and technical skills before we connect?
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setStep('viewer')}
                  className="flex-1 py-3.5 px-6 rounded-full bg-[#ff2a2a] hover:bg-red-600 text-white font-bold transition-all duration-300 shadow-[0_0_25px_rgba(255,42,42,0.5)] hover:shadow-[0_0_35px_rgba(255,42,42,0.8)] flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View
                </button>

                <a
                  href="#contact"
                  onClick={onClose}
                  className="py-3.5 px-6 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold transition-all duration-300 text-center flex items-center justify-center border border-white/10 cursor-pointer"
                >
                  Contact Directly
                </a>
              </div>
            </motion.div>
          ) : (
            /* IMAGE VIEWER MODAL */
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[100000] bg-black/95 flex flex-col items-center justify-between overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Navigation Bar */}
              <div className="w-full flex justify-between items-center px-4 sm:px-8 py-4 bg-[#111111]/90 border-b border-white/10 z-20 backdrop-blur-md shrink-0">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[#ff2a2a] animate-pulse"></span>
                  <span className="text-white font-bold tracking-wide text-xs sm:text-base truncate">
                    Abel Jones Mathew — Resume
                  </span>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Zoom Controls (Hidden on very small screens) */}
                  <div className="hidden sm:flex items-center bg-white/10 rounded-full p-1 border border-white/10">
                    <button
                      onClick={handleZoomOut}
                      title="Zoom Out"
                      className="p-1.5 hover:bg-white/15 rounded-full text-white transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="px-2 text-xs font-mono text-white/80 min-w-[45px] text-center">
                      {Math.round(scale * 100)}%
                    </span>
                    <button
                      onClick={handleZoomIn}
                      title="Zoom In"
                      className="p-1.5 hover:bg-white/15 rounded-full text-white transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>

                  {/* Reset Zoom */}
                  {scale !== 1 && (
                    <button
                      onClick={handleResetZoom}
                      className="hidden sm:block text-xs px-2.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                    >
                      Reset
                    </button>
                  )}

                  {/* Open in New Tab */}
                  <a
                    href={resumeImg}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open full image in new tab"
                    className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all flex items-center gap-1.5 border border-white/10"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span className="hidden sm:inline">New Tab</span>
                  </a>

                  {/* Download */}
                  <a
                    href={resumeImg}
                    download="Abel_Jones_Mathew_Resume.jpg"
                    title="Download Resume"
                    className="p-2 sm:px-3.5 sm:py-1.5 rounded-full bg-[#ff2a2a] hover:bg-red-600 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,42,42,0.4)]"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span className="hidden sm:inline">Download</span>
                  </a>

                  {/* Close Viewer */}
                  <button
                    onClick={onClose}
                    title="Close"
                    className="p-2 rounded-full bg-white/10 hover:bg-[#ff2a2a] text-white transition-all ml-1"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Image Container */}
              <div className="flex-1 w-full overflow-auto flex items-center justify-center p-4 sm:p-8">
                <div
                  className="transition-transform duration-200 ease-out flex items-center justify-center"
                  style={{ transform: `scale(${scale})` }}
                >
                  <img
                    src={resumeImg}
                    alt="Abel Jones Mathew Resume"
                    className="max-h-[82vh] w-auto max-w-full object-contain rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.9)] border border-white/15 bg-white select-none"
                    draggable={false}
                  />
                </div>
              </div>

              {/* Bottom Bar Info */}
              <div className="w-full py-2 bg-[#111111]/80 text-center text-white/50 text-[11px] font-mono border-t border-white/5 shrink-0">
                Press ESC to close | Scroll or use controls above to zoom
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResumeModal;
