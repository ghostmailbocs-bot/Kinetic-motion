import React, { useState, useEffect } from 'react';
import { PromptTemplate, buildGeneratedPrompt } from '../data/promptTemplates';
import { Check, Copy, X, ChevronLeft, ChevronRight, Eye, Code } from 'lucide-react';

interface PromptModalProps {
  template: PromptTemplate | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export const PromptModal: React.FC<PromptModalProps> = ({
  template,
  isOpen,
  onClose,
  onNavigate,
  hasPrev,
  hasNext,
}) => {
  const [hasVoiceover, setHasVoiceover] = useState<boolean>(false);
  const [topic, setTopic] = useState<string>('');
  const [storyboardFirst, setStoryboardFirst] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(false);

  // Sync default topic when switching templates
  useEffect(() => {
    if (template) {
      setTopic(template.defaultTopic);
      setCopied(false);
    }
  }, [template]);

  // Handle ESC key to close and Arrow keys to navigate
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && hasPrev && document.activeElement?.tagName !== 'TEXTAREA') {
        onNavigate('prev');
      } else if (e.key === 'ArrowRight' && hasNext && document.activeElement?.tagName !== 'TEXTAREA') {
        onNavigate('next');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, hasPrev, hasNext, onClose, onNavigate]);

  if (!isOpen || !template) return null;

  const currentGeneratedPrompt = buildGeneratedPrompt(template, {
    voiceover: hasVoiceover,
    topic,
    storyboardFirst,
  });

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(currentGeneratedPrompt);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = currentGeneratedPrompt;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2600);
    } catch (err) {
      console.error('Failed to copy to clipboard', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Card */}
      <div
        className="relative bg-white w-full max-w-2xl rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 transition-all transform animate-scaleUp max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Top Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-20 cursor-pointer"
          title="Close dialog (Esc)"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-4 sm:space-y-5">
          {/* Custom Thumbnail Banner if set */}
          {template.thumbnailUrl && template.thumbnailUrl.trim() !== '' && (
            <div className="w-full h-40 sm:h-48 rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs mb-3 -mt-1 bg-slate-900">
              <img
                src={template.thumbnailUrl}
                alt={template.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Style Category & Number */}
          <div className="text-xs sm:text-sm font-semibold text-[#dc4c38] tracking-wide">
            {template.number} {template.category}
          </div>

          {/* Title */}
          <h2
            id="modal-title"
            className="text-2xl sm:text-3xl lg:text-4xl font-editorial font-bold text-[#122033] tracking-tight leading-tight -mt-1"
          >
            {template.title}
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed font-sans">
            {template.shortDescription}
          </p>

          {/* How It Explains Container */}
          <div className="bg-[#f0f4f9] rounded-xl p-4 sm:p-5 text-sm sm:text-[14.5px] leading-relaxed text-slate-700 border border-slate-200/60">
            <span className="font-bold text-slate-900">How it explains: </span>
            {template.howItExplains}
          </div>

          {/* Thin Divider */}
          <div className="h-px bg-slate-200/80 my-4 sm:my-5" />

          {/* Make it yours section */}
          <div>
            <h3 className="text-xl sm:text-2xl font-editorial font-bold text-[#122033] mb-3">
              Make it yours
            </h3>

            {/* Voiceover Toggles */}
            <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200/80">
              <button
                type="button"
                onClick={() => setHasVoiceover(false)}
                className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                  !hasVoiceover
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                No voiceover
              </button>
              <button
                type="button"
                onClick={() => setHasVoiceover(true)}
                className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                  hasVoiceover
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                With voiceover
              </button>
            </div>

            {/* Helper Text */}
            <p className="text-xs sm:text-[13px] text-slate-500 mt-2 font-sans">
              {!hasVoiceover
                ? 'A standalone video with the full mix: music, impacts and effects, no narration.'
                : 'Includes spoken voiceover script, timed narration cues, sound design markers, and pacing aligned with voice beats.'}
            </p>
          </div>

          {/* Topic or Script Input */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label htmlFor="topic-input" className="block text-xs sm:text-sm font-bold text-slate-800">
                Topic or script
              </label>
              {topic !== template.defaultTopic && (
                <button
                  type="button"
                  onClick={() => setTopic(template.defaultTopic)}
                  className="text-[11px] text-slate-500 hover:text-[#dc4c38] transition cursor-pointer"
                >
                  Reset to example
                </button>
              )}
            </div>

            <textarea
              id="topic-input"
              rows={3}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. How to land your first client with AI automations"
              className="w-full px-3.5 py-2.5 text-sm sm:text-base border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e68863]/60 focus:border-[#e68863] text-slate-800 placeholder-slate-400 transition resize-y font-sans shadow-2xs"
            />
          </div>

          {/* Checkbox: Storyboard First */}
          <div className="pt-1">
            <label className="flex items-start gap-2.5 cursor-pointer select-none group">
              <input
                type="checkbox"
                checked={storyboardFirst}
                onChange={(e) => setStoryboardFirst(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#122033] focus:ring-[#e68863] accent-[#122033] cursor-pointer"
              />
              <span className="text-xs sm:text-[13.5px] text-slate-700 leading-snug group-hover:text-slate-900 transition">
                <strong className="text-slate-900 font-semibold">Storyboard first:</strong> Claude sketches
                every beat as still frames and waits for your OK before building.
              </span>
            </label>
          </div>

          {/* Prompt Preview Toggle Accordion */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition cursor-pointer py-1"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showPreview ? 'Hide full prompt blueprint' : 'View generated prompt text'}</span>
            </button>

            {showPreview && (
              <div className="mt-2 p-3 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs overflow-x-auto max-h-48 border border-slate-800 whitespace-pre-wrap leading-relaxed select-text">
                <div className="flex justify-between items-center pb-2 mb-2 border-b border-slate-700 text-slate-400">
                  <span className="flex items-center gap-1 text-[11px]">
                    <Code className="w-3.5 h-3.5" /> Generated Claude/AI Prompt
                  </span>
                  <span className="text-[10px]">{currentGeneratedPrompt.length} chars</span>
                </div>
                {currentGeneratedPrompt}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="px-5 py-4 sm:px-8 sm:py-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3 mt-auto">
          {/* Navigation Buttons: Previous / Next */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate('prev')}
              disabled={!hasPrev}
              className={`px-3.5 sm:px-4 py-2 rounded-full border text-xs sm:text-sm font-semibold flex items-center gap-1 transition-all ${
                hasPrev
                  ? 'border-slate-300 text-slate-700 bg-white hover:bg-slate-100 active:scale-95 cursor-pointer shadow-2xs'
                  : 'border-slate-200 text-slate-300 bg-slate-100/50 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-4 h-4 -ml-0.5" />
              Previous
            </button>
            <button
              type="button"
              onClick={() => onNavigate('next')}
              disabled={!hasNext}
              className={`px-3.5 sm:px-4 py-2 rounded-full border text-xs sm:text-sm font-semibold flex items-center gap-1 transition-all ${
                hasNext
                  ? 'border-slate-300 text-slate-700 bg-white hover:bg-slate-100 active:scale-95 cursor-pointer shadow-2xs'
                  : 'border-slate-200 text-slate-300 bg-slate-100/50 cursor-not-allowed'
              }`}
            >
              Next
              <ChevronRight className="w-4 h-4 -mr-0.5" />
            </button>
          </div>

          {/* Copy Prompt Button */}
          <button
            type="button"
            onClick={handleCopy}
            className={`px-5 sm:px-7 py-2 sm:py-2.5 rounded-full font-semibold text-xs sm:text-sm text-white shadow-sm flex items-center gap-2 transition-all cursor-pointer active:scale-95 ${
              copied
                ? 'bg-emerald-600 hover:bg-emerald-700'
                : 'bg-[#e5825a] hover:bg-[#d97349]'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 animate-bounce" />
                <span>Copied prompt!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy prompt</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
