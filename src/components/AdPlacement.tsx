import React from 'react';

export default function AdPlacement({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full bg-[#0f1333] border border-white/5 rounded-2xl flex flex-col items-center justify-center text-slate-500 text-xs py-5 px-4 relative overflow-hidden ${className}`}>
      <span className="absolute top-2 right-3 text-[9px] uppercase tracking-wider text-slate-600 bg-black/20 px-2 py-0.5 rounded-full">Ad</span>
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-slate-600 animate-pulse"></span>
        <span>مساحة إعلانية مخصصة</span>
      </div>
    </div>
  );
}
