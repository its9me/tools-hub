import React, { useState, useEffect } from 'react';
import { Share2, Info, Dices, Hash, Wand2, RefreshCw, Settings2 } from 'lucide-react';

const translations = {
  ar: {
    title: "مولد أرقام الحظ العشوائية",
    subtitle: "قم بتوليد أرقام عشوائية لليانصيب، السحوبات، أو المسابقات بحركة تفاعلية.",
    minLabel: "الحد الأدنى",
    maxLabel: "الحد الأقصى",
    countLabel: "عدد الأرقام",
    uniqueLabel: "عدم تكرار الأرقام",
    generate: "توليد الأرقام",
    results: "أرقام الحظ الخاصة بك",
    shareWhatsapp: "مشاركة الأداة",
    errorRange: "الحد الأقصى يجب أن يكون أكبر من الحد الأدنى.",
    errorCount: "عدد الأرقام يجب أن يكون أكبر من صفر.",
    errorUnique: "النطاق المحدد لا يكفي لتوليد هذا العدد من الأرقام الفريدة.",
    aboutTitle: "عن الأداة",
    aboutP1: "أداة ذكية لتوليد أرقام عشوائية تماماً بالاعتماد على خوارزميات المتصفح (Math.random). يمكنك تحديد نطاق الأرقام (مثل من 1 إلى 100) وعددها لمعرفة الفائزين في مسابقة أو اختيار أرقام الحظ الخاصة بك.",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)"
  },
  en: {
    title: "Lucky Number Generator",
    subtitle: "Generate random numbers for lotteries, raffles, or contests with an interactive animation.",
    minLabel: "Minimum",
    maxLabel: "Maximum",
    countLabel: "Count",
    uniqueLabel: "Unique numbers (no duplicates)",
    generate: "Generate Numbers",
    results: "Your Lucky Numbers",
    shareWhatsapp: "Share Tool",
    errorRange: "Maximum must be greater than Minimum.",
    errorCount: "Number of items must be greater than zero.",
    errorUnique: "The specified range is not large enough to generate this many unique numbers.",
    aboutTitle: "About The Tool",
    aboutP1: "A smart tool to continuously generate completely random numbers using native browser algorithms (Math.random). You can define a custom range (e.g., 1 to 100) and the quantity of numbers to draw winners for a contest or pick your lucky numbers.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)"
  }
};

export default function LuckyNumbers({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const [min, setMin] = useState<string>('1');
  const [max, setMax] = useState<string>('100');
  const [count, setCount] = useState<string>('1');
  const [unique, setUnique] = useState<boolean>(true);
  
  const [numbers, setNumbers] = useState<number[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const generateRandom = () => {
    setErrorMsg(null);
    const minVal = parseInt(min);
    const maxVal = parseInt(max);
    const countVal = parseInt(count);

    if (isNaN(minVal) || isNaN(maxVal) || isNaN(countVal)) return;
    
    if (maxVal <= minVal) {
      setErrorMsg(t.errorRange);
      return;
    }
    if (countVal <= 0) {
      setErrorMsg(t.errorCount);
      return;
    }
    if (unique && (maxVal - minVal + 1) < countVal) {
      setErrorMsg(t.errorUnique);
      return;
    }

    setIsGenerating(true);
    setNumbers(Array(countVal).fill(0));

    // Animation frames for excitement
    let iterations = 0;
    const maxIterations = 20; // Runs for 20 frames
    const interval = setInterval(() => {
      const tempNums: number[] = [];
      for (let i = 0; i < countVal; i++) {
        tempNums.push(Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal);
      }
      setNumbers(tempNums);
      iterations++;
      
      if (iterations >= maxIterations) {
        clearInterval(interval);
        
        // Generate final actual values
        const finalNums: number[] = [];
        if (unique) {
          const pool: number[] = [];
          for (let i = minVal; i <= maxVal; i++) pool.push(i);
          for (let i = 0; i < countVal; i++) {
            const randomIndex = Math.floor(Math.random() * pool.length);
            finalNums.push(pool[randomIndex]);
            pool.splice(randomIndex, 1);
          }
        } else {
          for (let i = 0; i < countVal; i++) {
            finalNums.push(Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal);
          }
        }
        setNumbers(finalNums);
        setIsGenerating(false);
      }
    }, 50); // 50ms per frame
  };

  const generateShareText = () => {
    let str = isAr ? '*مولد أرقام الحظ:*\n\n' : '*Lucky Number Generator:*\n\n';
    str += isAr ? `جرب حظك واحصل على أرقام عشوائية لليانصيب أو المسابقات.\n\nجربه هنا: ` : `Generate completely random numbers for lotteries or contests.\n\nTry it here: `;
    return encodeURIComponent(str + window.location.href);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
      {/* Top AdSense */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm">
        <div className="text-[10px] uppercase tracking-widest mb-1">{t.adTop}</div>
        <p className="text-[10px]">{t.adTopDesc}</p>
      </div>

      <section className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl flex flex-col gap-8 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-violet-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="text-center relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-violet-400 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg text-white">
            <Dices size={32} />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">{t.subtitle}</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 relative z-10 w-full items-start">
          
          {/* Controls */}
          <div className="flex-1 w-full flex flex-col gap-5 bg-slate-900/50 p-6 rounded-2xl border border-white/5 shadow-inner">
             
             <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-300">{t.minLabel}</label>
                  <div className="relative">
                    <input 
                      type="number"
                      value={min} 
                      onChange={(e) => setMin(e.target.value)} 
                      className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-white outline-none focus:ring-2 focus:ring-violet-500/50 transition-all font-mono text-center"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-300">{t.maxLabel}</label>
                  <div className="relative">
                    <input 
                      type="number"
                      value={max} 
                      onChange={(e) => setMax(e.target.value)} 
                      className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-white outline-none focus:ring-2 focus:ring-violet-500/50 transition-all font-mono text-center"
                      dir="ltr"
                    />
                  </div>
                </div>
             </div>

             <div className="flex flex-col gap-2">
               <label className="text-sm font-bold text-slate-300">{t.countLabel}</label>
               <div className="relative">
                 <input 
                   type="number" 
                   min="1"
                   value={count} 
                   onChange={(e) => setCount(e.target.value)} 
                   className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 pl-10 text-white outline-none focus:ring-2 focus:ring-violet-500/50 transition-all font-mono"
                   dir="ltr"
                 />
                 <Hash size={16} className="absolute left-3 top-3.5 text-slate-500" />
               </div>
             </div>

             <label className="flex items-center gap-3 cursor-pointer group p-3 bg-slate-800 hover:bg-slate-750 border border-white/5 rounded-xl transition-colors">
                <div className="relative flex items-center justify-center">
                    <input 
                        type="checkbox" 
                        checked={unique} 
                        onChange={(e) => setUnique(e.target.checked)}
                        className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${unique ? 'bg-violet-500' : 'bg-slate-700 border border-slate-600'}`}>
                        {unique && <Hash size={12} className="text-white" />}
                    </div>
                </div>
                <span className="text-sm font-medium text-slate-300 select-none group-hover:text-white transition-colors">{t.uniqueLabel}</span>
             </label>

             {errorMsg && (
                <div className="text-sm font-bold text-red-400 bg-red-400/10 border border-red-400/20 p-3 rounded-lg text-center">
                    {errorMsg}
                </div>
             )}

             <button 
                onClick={generateRandom}
                disabled={isGenerating}
                className="w-full py-4 mt-2 bg-gradient-to-r from-violet-600 to-purple-500 hover:from-violet-500 hover:to-purple-400 text-white font-bold rounded-xl shadow-lg shadow-violet-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
             >
                {isGenerating ? <RefreshCw size={20} className="animate-spin" /> : <Wand2 size={20} />}
                {t.generate}
             </button>

          </div>

          {/* Results Area */}
          <div className="flex-[1.5] w-full flex flex-col gap-4">
             <div className="flex items-center justify-between px-2">
                 <h3 className="text-lg font-bold text-slate-200">{t.results}</h3>
                 <Settings2 size={18} className="text-slate-500" />
             </div>
             
             {numbers.length > 0 ? (
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {numbers.map((num, i) => (
                        <div 
                          key={i} 
                          className={`
                            aspect-square rounded-2xl flex items-center justify-center text-3xl font-mono font-bold shadow-lg border relative overflow-hidden transition-all duration-300
                            ${isGenerating 
                                ? 'bg-slate-800 text-slate-500 border-white/5 scale-95' 
                                : 'bg-gradient-to-br from-violet-500/20 to-purple-600/20 text-violet-300 border-violet-500/30 scale-100 hover:scale-105 hover:border-violet-400/50 hover:from-violet-500/30 hover:to-purple-600/30'}
                          `}
                        >
                            {/* Inner glow effect for final state */}
                            {!isGenerating && (
                                <div className="absolute inset-0 bg-white/5 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none"></div>
                            )}
                            <span className={isGenerating ? 'opacity-50 animate-pulse' : 'animate-in fade-in zoom-in duration-500 drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]'}>
                                {num}
                            </span>
                        </div>
                    ))}
                 </div>
             ) : (
                 <div className="py-20 flex flex-col items-center justify-center text-slate-500 bg-slate-900/30 rounded-2xl border border-white/5 border-dashed">
                     <Dices size={48} className="mb-4 opacity-30" />
                     <p className="text-sm font-medium">الأرقام ستظهر هنا</p>
                 </div>
             )}
          </div>

        </div>
        
        <div className="hidden md:flex justify-center pt-4 relative z-10 w-full mt-2 border-t border-white/5">
            <a
              href={`https://wa.me/?text=${generateShareText()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 mt-4 px-8 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm font-bold text-white shadow-lg transition-all border border-white/10"
            >
              <Share2 size={16} />
              {t.shareWhatsapp}
            </a>
        </div>
      </section>

      {/* Middle AdSense */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm my-2">
        <div className="text-[10px] uppercase tracking-widest mb-1">{t.adMiddle}</div>
        <p className="text-[10px]">{t.adMiddleDesc}</p>
      </div>

      <article className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col gap-4 text-[13px] text-slate-300 leading-relaxed shadow-lg">
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-2">
            <Info size={20} className="text-violet-400"/>
            <h2 className="text-lg font-bold text-violet-400">{t.aboutTitle}</h2>
        </div>
        <div className="space-y-4">
          <p>{t.aboutP1}</p>
        </div>
      </article>

    </div>
  );
}
