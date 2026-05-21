import React, { useState, useRef, useEffect } from 'react';
import { Share2, Info, RefreshCw, Trophy, Users, Upload } from 'lucide-react';
import confetti from 'canvas-confetti';

const colors = [
  '#f43f5e', '#ec4899', '#d946ef', '#a855f7', '#8b5cf6', 
  '#6366f1', '#3b82f6', '#0ea5e9', '#06b6d4', '#14b8a6', 
  '#10b981', '#22c55e', '#84cc16', '#eab308', '#f59e0b', 
  '#f97316', '#ef4444'
];

const translations = {
  ar: {
    title: "القرعة وعجلة الحظ",
    subtitle: "اكتب الأسماء وقم بتدوير العجلة لاختيار فائز عشوائياً بشكل عادل وممتع.",
    namesLabel: "قائمة الأسماء",
    namesPlaceholder: "أحمد\nمحمد\nسارة\nفاطمة\n(كل اسم في سطر)",
    spin: "تدوير العجلة!",
    spinning: "جاري الاختيار...",
    winner: "الفائز هو:",
    congrats: "ألف مبروك 🎉",
    shareWhatsapp: "مشاركة الأداة",
    errorEmpty: "الرجاء إدخال اسمين على الأقل.",
    uploadFile: "رفع ملف أسماء",
    aboutTitle: "عن الأداة",
    aboutP1: "عجلة حظ تفاعلية بالكامل، تتيح لك إدخال قائمة من الأسماء (أو العناصر) وتدوير العجلة لاختيار فائز عشوائياً. مثالية للسحوبات والمسابقات أو حتى للمساعدة في اتخاذ القرارات! تتم معالجة الأسماء محلياً في متصفحك للحفاظ على خصوصيتك.",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)",
    defaultItems: ["؟", "؟", "؟", "؟", "؟", "؟"]
  },
  en: {
    title: "Random Name Picker Wheel",
    subtitle: "Enter names and spin the wheel to pick a random winner fairly and interactively.",
    namesLabel: "List of Names",
    namesPlaceholder: "Alice\nBob\nCharlie\nDiana\n(One name per line)",
    spin: "Spin the Wheel!",
    spinning: "Picking...",
    winner: "The Winner is:",
    congrats: "Congratulations 🎉",
    shareWhatsapp: "Share Tool",
    errorEmpty: "Please enter at least 2 names.",
    uploadFile: "Upload Names File",
    aboutTitle: "About The Tool",
    aboutP1: "A fully interactive wheel of fortune that lets you input a list of names (or items) and spin to pick a random winner. Perfect for giveaways, contests, or even decision-making! All lists are processed locally in your browser for privacy.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)",
    defaultItems: ["?", "?", "?", "?", "?", "?"]
  }
};

export default function RandomPicker({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const [text, setText] = useState<string>('');
  const [rotation, setRotation] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [showWinner, setShowWinner] = useState<boolean>(false);
  const [winningName, setWinningName] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Parse lines avoiding empties
  const rawList = text.split('\n').map(l => l.trim()).filter(l => l);
  const items = rawList.length >= 2 ? rawList : (rawList.length === 1 ? [...rawList, "؟"] : t.defaultItems);

  const sliceAngle = 360 / items.length;
  
  const gradientParts = items.map((_, i) => {
    const color = colors[i % colors.length];
    return `${color} ${i * sliceAngle}deg ${(i + 1) * sliceAngle}deg`;
  });
  const conicGradient = `conic-gradient(${gradientParts.join(', ')})`;

  const spinWheel = () => {
    if (rawList.length < 2) {
      setErrorMsg(t.errorEmpty);
      return;
    }
    setErrorMsg(null);
    setShowWinner(false);
    setIsSpinning(true);

    const randomIndex = Math.floor(Math.random() * items.length);
    const winner = items[randomIndex];
    setWinningName(winner);

    const centerAngle = (randomIndex * sliceAngle) + (sliceAngle / 2);
    const spins = 5 + Math.floor(Math.random() * 5); // 5 to 9 extra rotations
    const targetAngleOffset = 360 - centerAngle; 
    
    // Calculate new rotation to avoid reversing direction
    const baseRotation = Math.ceil(rotation / 360) * 360;
    const nextRotation = baseRotation + (spins * 360) + targetAngleOffset;
    
    setRotation(nextRotation);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = event.target?.result as string;
        // Optionally append or replace. We will replace current text or append. Let's replace.
        setText(fileContent.trim());
      };
      reader.readAsText(file);
    }
  };

  const handleTransitionEnd = () => {
    if (isSpinning) {
      setIsSpinning(false);
      setShowWinner(true);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#a855f7', '#ec4899', '#3b82f6', '#10b981', '#f59e0b']
      });
    }
  };

  const generateShareText = () => {
    let str = isAr ? '*أداة القرعة وعجلة الحظ:*\n\n' : '*Random Name Picker Wheel:*\n\n';
    str += isAr ? `اكتب مجموعة أسماء ودور العجلة لاختيار فائز 🎁\n\nجربها هنا: ` : `Enter names and spin the wheel to pick a winner 🎁\n\nTry it here: `;
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
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="text-center relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg text-white">
            <Trophy size={32} />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">{t.subtitle}</p>
        </div>

        <div className="flex flex-col-reverse lg:flex-row gap-8 relative z-10 w-full items-center lg:items-stretch">
          
          {/* Wheel Area */}
          <div className="flex-[1.5] w-full flex flex-col items-center justify-center gap-6 relative">
             <div className="relative w-72 h-72 md:w-96 md:h-96 shrink-0">
                
                {/* Outer Ring & Center Pivot drop shadows */}
                <div className="absolute inset-0 rounded-full shadow-[0_0_40px_rgba(0,0,0,0.5)] bg-slate-800 ring-8 ring-slate-700/50"></div>
                
                {/* The Needle at 12 o'clock */}
                <div className="absolute -top-4 left-1/2 -mt-2 -ml-5 w-10 h-12 z-30 flex flex-col items-center drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] filter">
                  <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-t-[32px] border-l-transparent border-r-transparent border-t-amber-400"></div>
                  <div className="absolute top-0 w-8 h-2 bg-amber-500 rounded-full shadow-inner"></div>
                </div>

                {/* The Wheel */}
                <div 
                  className="w-full h-full rounded-full overflow-hidden relative"
                  style={{ 
                    background: conicGradient,
                    transform: `rotate(${rotation}deg)`,
                    transitionDuration: isSpinning ? '6s' : '0s',
                    transitionTimingFunction: 'cubic-bezier(0.2, 0.9, 0.2, 1)'
                  }}
                  onTransitionEnd={handleTransitionEnd}
                >
                   {items.map((item, i) => {
                      const angle = (i * sliceAngle) + (sliceAngle / 2);
                      return (
                        <div 
                          key={i} 
                          className="absolute inset-0 z-10 pointer-events-none" 
                          style={{ transform: `rotate(${angle - 90}deg)` }}
                        >
                           <div className="absolute top-1/2 right-0 w-1/2 -mt-4 h-8 flex items-center justify-end pr-5 md:pr-10">
                              <span 
                                className="truncate font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] text-sm md:text-base max-w-[85%]"
                                dir="auto"
                              >
                                {item}
                              </span>
                           </div>
                        </div>
                      )
                   })}
                </div>

                {/* Center Pivot */}
                <div className="absolute top-1/2 left-1/2 -ml-6 -mt-6 w-12 h-12 bg-slate-800 rounded-full border-4 border-slate-600 shadow-[0_0_15px_rgba(0,0,0,0.8)] z-20 flex items-center justify-center">
                    <div className="w-4 h-4 bg-slate-500 rounded-full shadow-inner"></div>
                </div>
             </div>

             {/* Winner Popover */}
             <div className={`transition-all duration-500 transform ${showWinner ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                {showWinner && winningName && (
                   <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-2xl shadow-xl shadow-pink-500/20 text-center border border-white/20 animate-in bounce-in zoom-in">
                       <p className="text-sm font-medium text-pink-100 mb-1">{t.winner}</p>
                       <h3 className="text-2xl font-black drop-shadow-md">{winningName}</h3>
                       <p className="text-xs font-bold text-pink-200 mt-2">{t.congrats}</p>
                   </div>
                )}
             </div>

          </div>

          {/* Controls Area */}
          <div className="flex-1 w-full max-w-sm flex flex-col gap-4 bg-slate-900/50 p-6 rounded-2xl border border-white/5 shadow-inner">
             <div className="flex items-center gap-2 mb-2 border-b border-white/10 pb-4">
                 <Users size={20} className="text-pink-400" />
                 <h3 className="font-bold text-slate-200">{t.namesLabel}</h3>
                 <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full mr-auto font-mono">
                     {rawList.length}
                 </span>
                 
                 <div className="relative">
                     <input 
                       type="file" 
                       accept=".txt,.csv"
                       onChange={handleFileUpload}
                       className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                       title={t.uploadFile}
                     />
                     <button className="flex items-center justify-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 py-1 px-3 rounded-lg transition-colors border border-white/10">
                         <Upload size={14} />
                         <span className="hidden sm:inline">{t.uploadFile}</span>
                     </button>
                 </div>
             </div>

             <textarea 
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={t.namesPlaceholder}
                className="w-full bg-slate-800/80 border border-white/10 rounded-xl p-4 text-white text-sm outline-none focus:ring-2 focus:ring-pink-500/50 transition-all font-mono resize-none h-48 md:h-64 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
                dir="auto"
             ></textarea>

             {errorMsg && (
                <div className="text-sm font-bold text-red-400 bg-red-400/10 border border-red-400/20 p-3 rounded-lg text-center">
                    {errorMsg}
                </div>
             )}

             <button 
                onClick={spinWheel}
                disabled={isSpinning || rawList.length < 1}
                className="w-full py-4 mt-2 bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-500 hover:to-rose-400 text-white font-bold rounded-xl shadow-lg shadow-pink-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
             >
                <RefreshCw size={20} className={isSpinning ? 'animate-spin' : ''} />
                {isSpinning ? t.spinning : t.spin}
             </button>
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
            <Info size={20} className="text-pink-400"/>
            <h2 className="text-lg font-bold text-pink-400">{t.aboutTitle}</h2>
        </div>
        <div className="space-y-4">
          <p>{t.aboutP1}</p>
        </div>
      </article>

    </div>
  );
}
