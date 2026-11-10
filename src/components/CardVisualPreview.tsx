import React from 'react';

interface CardVisualPreviewProps {
  id: string;
  title?: string;
  category?: string;
  number?: string;
  thumbnailUrl?: string;
}

export const CardVisualPreview: React.FC<CardVisualPreviewProps> = ({
  id,
  title,
  category,
  number,
  thumbnailUrl,
}) => {
  // If custom thumbnail image is uploaded or linked, render it
  if (thumbnailUrl && thumbnailUrl.trim() !== '') {
    return (
      <div className="relative w-full h-44 sm:h-48 bg-slate-900 overflow-hidden select-none group">
        <img
          src={thumbnailUrl}
          alt={title || 'Motion style thumbnail'}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20 pointer-events-none" />
        <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 text-[10px] font-mono pointer-events-none">
          <span className="bg-[#dc4c38] text-white px-2 py-0.5 rounded-full font-bold shadow-xs">
            {number || '#NEW'}
          </span>
          <span className="bg-black/60 text-white backdrop-blur-xs px-2 py-0.5 rounded">
            {category || 'Motion Style'}
          </span>
        </div>
      </div>
    );
  }

  switch (id) {
    case 'creator-motion-graphics':
      return (
        <div className="relative w-full h-44 sm:h-48 bg-[#121214] overflow-hidden flex flex-col justify-center items-center p-5 select-none text-center">
          {/* Subtle noise and light leak */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            <span className="text-gray-300 font-extrabold tracking-wider text-sm sm:text-base uppercase font-mono">
              YOU DON'T NEED
            </span>

            {/* Strike-through text */}
            <div className="relative inline-block my-0.5">
              <span className="text-gray-400 font-black tracking-tight text-2xl sm:text-3xl uppercase font-sans">
                MORE SKILLS.
              </span>
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#d63f35] -translate-y-1/2 transform rounded-full" />
            </div>

            <div className="mt-2 text-sm sm:text-base text-gray-400 font-sans">
              you need{' '}
              <span className="text-[#facc15] font-serif italic text-lg sm:text-xl font-normal tracking-wide">
                more reps.
              </span>
            </div>
          </div>
        </div>
      );

    case 'chalk-talk':
      return (
        <div className="relative w-full h-44 sm:h-48 bg-[#2d4538] overflow-hidden p-4 select-none text-white/90">
          {/* Chalk texture */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:12px_12px]" />

          {/* Top coordinates & chalk multiplier */}
          <div className="relative z-10 flex justify-between items-start text-[11px] font-mono text-emerald-100/70">
            <span className="italic">you</span>
            <span className="text-[#fca5a5] font-serif text-sm tracking-wider">×37.8</span>
          </div>

          {/* Chalkboard graph */}
          <div className="relative h-28 w-full mt-1">
            {/* Axes */}
            <div className="absolute left-4 bottom-4 w-5/6 h-[1px] bg-emerald-200/40" />
            <div className="absolute left-4 bottom-4 h-24 w-[1px] bg-emerald-200/40" />

            {/* SVG Curve */}
            <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 200 100">
              <path
                d="M 16 85 Q 90 82, 140 30 T 175 14"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="1.8"
                strokeDasharray="2 1"
                className="opacity-90"
              />
              {/* Highlight circle */}
              <circle
                cx="175"
                cy="14"
                r="6.5"
                fill="none"
                stroke="#fca5a5"
                strokeWidth="1.6"
              />
            </svg>

            <span className="absolute bottom-0 right-6 text-[10px] text-emerald-100/60 font-mono">
              same <span className="text-white font-bold">365</span> days
            </span>
          </div>

          {/* Chalk sticks & eraser bottom left */}
          <div className="absolute bottom-2 left-4 flex items-center space-x-1.5 opacity-80">
            <div className="w-5 h-2 bg-amber-800 rounded-sm" />
            <div className="w-4 h-1.5 bg-[#fef08a] rounded-xs" />
            <div className="w-4 h-1.5 bg-[#f472b6] rounded-xs" />
          </div>
        </div>
      );

    case 'clean-tech':
      return (
        <div className="relative w-full h-44 sm:h-48 bg-[#edf2f7] overflow-hidden p-4 select-none flex items-center justify-between">
          {/* Subtle dot grid */}
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:14px_14px]" />

          {/* Left text column */}
          <div className="relative z-10 w-1/2 pr-2">
            <h4 className="text-slate-900 font-bold text-sm sm:text-base leading-tight">
              It{' '}
              <span className="bg-[#2563eb] text-white px-1.5 py-0.5 rounded text-xs sm:text-sm font-semibold tracking-wide inline-block shadow-xs">
                checks
              </span>{' '}
              its own work.
            </h4>
            <div className="mt-3">
              <span className="block text-[9px] uppercase tracking-wider text-slate-500 font-semibold">
                STEPS TAKEN
              </span>
              <span className="text-lg font-black text-blue-600 leading-none">14</span>
              <span className="block text-[10px] text-slate-500">from one prompt</span>
            </div>
          </div>

          {/* Right UI Card */}
          <div className="relative z-10 w-1/2 bg-white rounded-lg shadow-sm border border-slate-200/80 p-2.5 text-[10px] scale-95 origin-right">
            <div className="flex justify-between items-center mb-1.5 pb-1 border-b border-slate-100">
              <span className="font-bold text-slate-800 text-[10px]">Competitor summary</span>
              <span className="text-[8px] bg-slate-100 text-slate-600 px-1 rounded">FINAL</span>
            </div>

            <div className="space-y-1 text-slate-600 text-[9px]">
              <div className="flex justify-between items-center">
                <span>Orbit</span>
                <span className="w-12 h-1.5 bg-blue-500 rounded-full" />
              </div>
              <div className="flex justify-between items-center">
                <span>Lumen</span>
                <span className="w-9 h-1.5 bg-blue-400 rounded-full" />
              </div>
              <div className="flex justify-between items-center">
                <span>Kite</span>
                <span className="w-14 h-1.5 bg-blue-600 rounded-full" />
              </div>
              <div className="flex justify-between items-center">
                <span>Northstar</span>
                <span className="w-10 h-1.5 bg-blue-500 rounded-full" />
              </div>
            </div>

            <div className="mt-2 pt-1 border-t border-slate-100 flex justify-end">
              <span className="inline-flex items-center text-[8px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200">
                ✓ Checked
              </span>
            </div>
          </div>
        </div>
      );

    case 'software-walkthrough':
      return (
        <div className="relative w-full h-44 sm:h-48 bg-gradient-to-br from-[#c8e8de] to-[#a3c9be] overflow-hidden p-3 select-none flex items-center justify-between">
          {/* Left automation node */}
          <div className="relative z-10 w-[52%] space-y-2">
            <div className="bg-white/95 rounded-lg p-2 shadow-sm border border-emerald-900/10 text-[10px]">
              <span className="text-[8px] font-bold text-emerald-700 uppercase tracking-wider block">
                WHEN
              </span>
              <p className="font-semibold text-slate-800 text-[10px] leading-tight">
                New form reply <span className="text-slate-400 font-normal">Contact form</span>
              </p>
            </div>

            <div className="flex justify-center -my-1">
              <div className="w-0.5 h-3 bg-emerald-600/40" />
            </div>

            <div className="bg-white/95 rounded-lg p-2 shadow-sm border border-emerald-900/10 text-[10px]">
              <span className="text-[8px] font-bold text-emerald-700 uppercase tracking-wider block">
                THEN
              </span>
              <p className="font-semibold text-slate-800 text-[10px] leading-tight">
                Add a row to a sheet
              </p>
              <div className="mt-1 flex gap-1">
                <span className="bg-slate-100 text-[8px] px-1 py-0.2 rounded text-slate-600">Name</span>
                <span className="bg-slate-100 text-[8px] px-1 py-0.2 rounded text-slate-600">Email</span>
              </div>
            </div>

            <div className="pt-0.5">
              <span className="inline-block bg-slate-900 text-white text-[9px] font-semibold px-2 py-0.5 rounded-full shadow-xs">
                Turn it on
              </span>
            </div>
          </div>

          {/* Right sheet preview with realistic cursor */}
          <div className="relative z-10 w-[44%] bg-white rounded-lg shadow-md border border-slate-200/90 overflow-hidden text-[9px]">
            <div className="bg-emerald-600 text-white px-2 py-1 font-bold text-[9px] flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-300 rounded-xs" />
              Leads
            </div>
            <div className="p-1.5 space-y-1">
              <div className="border-b border-slate-100 pb-0.5">
                <p className="font-semibold text-slate-800 text-[9px]">Maya Chen</p>
                <p className="text-slate-400 text-[8px]">maya@chen.io</p>
              </div>
              <div className="border-b border-slate-100 pb-0.5 opacity-70">
                <p className="font-medium text-slate-800 text-[9px]">Sam Ortiz</p>
              </div>
              <div className="opacity-50">
                <p className="font-medium text-slate-800 text-[9px]">Priya Nair</p>
              </div>
            </div>

            {/* Mouse Pointer */}
            <div className="absolute top-7 right-4 pointer-events-none drop-shadow">
              <svg className="w-4 h-4 text-slate-900" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 2v18l5-5 5 11 3-1-5-11 7-1L4 2z" />
              </svg>
            </div>
          </div>
        </div>
      );

    case 'data-story':
      return (
        <div className="relative w-full h-44 sm:h-48 bg-[#181c24] overflow-hidden p-4 select-none text-white">
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <span className="text-[8px] font-mono tracking-widest text-amber-500/80 uppercase block">
                WORLD POPULATION
              </span>
              <h4 className="text-xs sm:text-sm font-semibold text-white tracking-tight">
                How we got to 8 billion
              </h4>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono font-bold text-amber-400 block">8,000,000,000</span>
              <span className="text-[8px] text-gray-400 font-mono">1804 - 2022</span>
            </div>
          </div>

          {/* Exponential curve chart */}
          <div className="relative h-24 w-full mt-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 240 80">
              {/* Grid line */}
              <line x1="0" y1="70" x2="240" y2="70" stroke="#334155" strokeWidth="1" />
              {/* Curve */}
              <path
                d="M 10 68 Q 130 65, 170 45 T 230 10"
                fill="none"
                stroke="#f97316"
                strokeWidth="2.2"
              />
              <circle cx="230" cy="10" r="3.5" fill="#f97316" />
            </svg>

            {/* Floating metric callout */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-slate-900/90 border border-amber-500/30 rounded px-2 py-0.5 text-center">
              <span className="text-amber-400 text-[10px] font-bold block">+6 billion</span>
              <span className="text-[8px] text-slate-400">in just 95 years</span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[8px] text-slate-500 font-mono">
              <span>1B - 1804</span>
              <span>2B - 1927</span>
              <span>1998</span>
              <span>2022</span>
            </div>
          </div>
        </div>
      );

    case 'warm-canvas':
      return (
        <div className="relative w-full h-44 sm:h-48 bg-[#e8e4dc] overflow-hidden p-3 select-none flex items-center justify-between">
          {/* Left slides and title */}
          <div className="relative z-10 w-3/5 space-y-2">
            <div className="inline-block bg-white/90 px-2 py-0.5 rounded-full text-[9px] font-medium text-slate-800 shadow-2xs">
              Not just <span className="text-blue-600 font-semibold">one style</span>
            </div>

            {/* Tilted cards stack */}
            <div className="flex gap-1.5 pt-1">
              <div className="w-16 h-12 bg-zinc-900 rounded p-1 shadow-sm text-[6px] text-white flex flex-col justify-center items-center -rotate-2">
                <span className="font-bold text-[6px]">YOU DON'T NEED</span>
                <span className="text-yellow-400 text-[5px]">more reps</span>
              </div>
              <div className="w-16 h-12 bg-[#2d4538] rounded p-1 shadow-sm text-[6px] text-white flex flex-col justify-center items-center rotate-2">
                <span className="text-[#fca5a5] text-[6px]">Chalk Talk</span>
                <div className="w-8 h-0.5 bg-emerald-200/50 mt-1" />
              </div>
            </div>
          </div>

          {/* Right Talking Head Portrait */}
          <div className="relative z-10 w-2/5 flex justify-end">
            <div className="relative w-20 h-28 sm:w-24 sm:h-32 rounded-xl overflow-hidden bg-slate-800 border-2 border-white shadow-md">
              {/* Creator portrait mockup */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-800 to-slate-700 flex flex-col items-center justify-end pb-2">
                {/* Person avatar depiction */}
                <div className="w-10 h-10 rounded-full bg-slate-300 border-2 border-slate-600 mb-1 flex items-center justify-center overflow-hidden">
                  <div className="w-8 h-8 rounded-full bg-amber-800/80 mt-1" />
                </div>
                {/* Microphone */}
                <div className="w-3 h-4 bg-zinc-900 rounded-t-sm border border-zinc-500 shadow" />
                <span className="text-[7px] text-slate-300 mt-1 font-mono">LIVE FEED</span>
              </div>
            </div>
          </div>
        </div>
      );

    case 'editorial-vector':
      return (
        <div className="relative w-full h-44 sm:h-48 bg-gradient-to-tr from-[#312e81] via-[#4338ca] to-[#6366f1] overflow-hidden p-4 select-none text-white flex flex-col justify-between">
          <div className="relative z-10 flex justify-between items-center text-[10px] font-mono">
            <span className="bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded text-white">SYSTEM DESIGN</span>
            <span className="text-indigo-200">60 FPS</span>
          </div>

          {/* Isometric illustration nodes */}
          <div className="relative z-10 flex items-center justify-center py-2">
            <div className="relative w-36 h-20">
              {/* Isometric box 1 */}
              <div className="absolute left-2 top-4 w-12 h-10 bg-indigo-300 rounded transform skew-y-6 shadow-lg border border-white/30 flex items-center justify-center text-[8px] font-bold text-indigo-950">
                API
              </div>
              {/* Connecting line */}
              <div className="absolute left-14 top-8 w-10 h-0.5 bg-cyan-300 shadow-[0_0_8px_#22d3ee]" />
              {/* Isometric box 2 */}
              <div className="absolute left-24 top-1 w-12 h-12 bg-cyan-400 rounded transform -skew-y-6 shadow-lg border border-white/30 flex items-center justify-center text-[8px] font-bold text-slate-950">
                QUEUE
              </div>
            </div>
          </div>

          <div className="relative z-10 flex justify-between items-center text-[9px] text-indigo-200">
            <span>Modular Layers</span>
            <span className="text-white font-medium">3D Vector Assets</span>
          </div>
        </div>
      );

    default:
      return (
        <div className="relative w-full h-44 sm:h-48 bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#334155] overflow-hidden p-4 select-none text-white flex flex-col justify-between">
          <div className="relative z-10 flex justify-between items-center text-[10px] font-mono">
            <span className="bg-[#dc4c38] text-white px-2 py-0.5 rounded-full font-bold">
              {number || '#NEW'}
            </span>
            <span className="text-slate-300 bg-white/10 px-2 py-0.5 rounded">
              {category || 'Motion Style'}
            </span>
          </div>

          <div className="relative z-10 text-center py-2">
            <h4 className="font-editorial text-lg sm:text-xl font-bold text-white tracking-tight line-clamp-1">
              {title || 'Custom Template'}
            </h4>
            <div className="mt-1 flex items-center justify-center gap-1.5 text-[10px] text-amber-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>CUSTOM PROMPT BLUEPRINT</span>
            </div>
          </div>

          <div className="relative z-10 flex justify-between items-center text-[9px] text-slate-400">
            <span>Tailored Prompt</span>
            <span className="text-amber-300 font-medium">Active</span>
          </div>
        </div>
      );
  }
};
