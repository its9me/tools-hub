import React, { useState, useEffect, useRef } from 'react';
import { Share2, Info, Keyboard, Timer, Percent, RefreshCw, Trophy } from 'lucide-react';

const texts = {
  ar: [
    "النجاح ليس مفتاح السعادة، بل السعادة هي مفتاح النجاح. إذا كنت تحب ما تفعله، فستكون ناجحاً.",
    "الوقت هو أثمن ما نملك، ومع ذلك فنحن نضيعه فيما لا يفيد. استثمر وقتك بحكمة تصل إلى أهدافك.",
    "العقل السليم في الجسم السليم، والرياضة اليومية هي الوقود الذي يمنحك الطاقة لمواجهة تحديات الحياة.",
    "القراءة تفتح آفاقاً جديدة وتغذي الروح والعقل، فلا تبخل على نفسك بدقائق يومية للقراءة والتأمل.",
    "العمل الجاد والمثابرة هما الطريق الوحيد لتحقيق الأحلام، فلا تستسلم عند أول عقبة تواجهك."
  ],
  en: [
    "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.",
    "Time is the most valuable thing a man can spend. Invest your time wisely and you will reach your goals seamlessly.",
    "A sound mind in a sound body. Daily exercise is the fuel that gives you the energy to face life's challenges.",
    "Reading opens new horizons and nourishes the soul and mind. Do not spare yourself a few daily minutes to read and reflect.",
    "Hard work and perseverance are the only way to achieve dreams. Do not give up at the first obstacle you face."
  ]
};

const translations = {
  ar: {
    title: "اختبار سرعة الكتابة",
    subtitle: "اختبر سرعة ودقة طباعتك على لوحة المفاتيح في دقيقة واحدة.",
    startTyping: "ابدأ بالكتابة هنا للبدء...",
    timeRemaining: "الوقت المتبقي",
    seconds: "ثانية",
    wpmTitle: "سرعة الكتابة",
    wpmUnit: "كلمة / الدقيقة",
    accuracyTitle: "الدقة",
    mistakesTitle: "الأخطاء",
    restart: "إعادة الاختبار",
    testFinished: "انتهى الوقت!",
    shareWhatsapp: "مشاركة النتيجة",
    aboutTitle: "عن الأداة",
    aboutP1: "أداة لتقييم سرعة كتابتك (WPM) بدقة. تبدأ الحسابات بمجرد كتابتك لأول حرف، وتحسب الكلمات المكتوبة بشكل صحيح خلال 60 ثانية لتعطيك النتيجة بدقة. أداة ممتازة للتدريب وتطوير مهارات الطباعة.",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)"
  },
  en: {
    title: "Typing Speed Test",
    subtitle: "Test your keyboard typing speed and accuracy in one minute.",
    startTyping: "Start typing here to begin...",
    timeRemaining: "Time Remaining",
    seconds: "sec",
    wpmTitle: "Typing Speed",
    wpmUnit: "WPM",
    accuracyTitle: "Accuracy",
    mistakesTitle: "Mistakes",
    restart: "Restart Test",
    testFinished: "Time's Up!",
    shareWhatsapp: "Share Result",
    aboutTitle: "About The Tool",
    aboutP1: "A tool to accurately evaluate your typing speed (WPM). Calculations begin as soon as you type the first character, and it counts words typed correctly within 60 seconds to give you an accurate result. Excellent tool for practicing and improving typing skills.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)"
  }
};

const TIME_LIMIT = 60;

export default function TypingSpeedTest({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const [paragraph, setParagraph] = useState('');
  const [userInput, setUserInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'typing' | 'finished'>('idle');
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [mistakes, setMistakes] = useState(0);
  const [wpm, setWpm] = useState(0);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const getRandomText = () => {
    const list = isAr ? texts.ar : texts.en;
    return list[Math.floor(Math.random() * list.length)];
  };

  useEffect(() => {
    resetTest();
  }, [lang]);

  useEffect(() => {
    if (status === 'typing' && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && status === 'typing') {
      finishTest();
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeLeft, status]);

  const resetTest = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setParagraph(getRandomText());
    setUserInput('');
    setStatus('idle');
    setTimeLeft(TIME_LIMIT);
    setMistakes(0);
    setWpm(0);
    if (inputRef.current) inputRef.current.disabled = false;
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 100);
  };

  const calculateStats = (input: string) => {
    let currentMistakes = 0;
    const inputChars = input.split('');
    const paraChars = paragraph.split('');

    inputChars.forEach((char, index) => {
      if (char !== paraChars[index]) {
        currentMistakes++;
      }
    });

    setMistakes(currentMistakes);

    // WPM calculation: (total characters typed minus mistakes) / 5 (average word length) / time in minutes
    if (input.length > 0) {
      const timeElapsed = (TIME_LIMIT - timeLeft) || 1; // avoid division by zero
      const timeInMinutes = timeElapsed / 60;
      const netWPM = Math.round(((input.length - currentMistakes) / 5) / timeInMinutes);
      setWpm(netWPM < 0 ? 0 : netWPM);
    }
    
    if (input.length >= paragraph.length) {
      finishTest();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    
    if (status === 'idle') {
      setStatus('typing');
    }
    
    setUserInput(value);
    calculateStats(value);
  };

  const finishTest = () => {
    setStatus('finished');
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const renderText = () => {
    return paragraph.split('').map((char, i) => {
      let charClass = "text-slate-400"; // default
      if (i < userInput.length) {
        charClass = userInput[i] === char ? "text-emerald-400 bg-emerald-400/10" : "text-rose-400 bg-rose-400/20 underline";
      } else if (i === userInput.length && status !== 'finished') {
        charClass = "text-white bg-white/20 animate-pulse border-b-2 border-white"; // cursor
      }
      return <span key={i} className={`transition-colors ${charClass}`}>{char}</span>;
    });
  };

  const accuracy = userInput.length > 0 
    ? Math.max(0, Math.round(((userInput.length - mistakes) / userInput.length) * 100)) 
    : 100;

  const generateShareText = () => {
    let str = isAr ? '*اختبار سرعة الكتابة:*\n\n' : '*Typing Speed Test:*\n\n';
    str += isAr ? `سرعتي المكتشفة هي ${wpm} ك/دقيقة ودقتي ${accuracy}%\n\nتحدى سرعتك هنا: ` : `My typing speed is ${wpm} WPM with ${accuracy}% accuracy!\n\nChallenge yourself here: `;
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
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="text-center relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg text-white">
            <Keyboard size={32} />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">{t.subtitle}</p>
        </div>

        <div className="flex flex-col gap-8 relative z-10 w-full">
          
          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center shadow-inner">
                 <div className="flex items-center gap-2 text-indigo-400 mb-1">
                     <Timer size={18} />
                     <span className="text-xs font-bold uppercase">{t.timeRemaining}</span>
                 </div>
                 <div className="text-3xl font-black text-white font-mono flex items-baseline gap-1">
                    {timeLeft}
                    <span className="text-sm text-slate-400 font-normal">{t.seconds}</span>
                 </div>
             </div>

             <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center shadow-inner">
                 <div className="flex items-center gap-2 text-emerald-400 mb-1">
                     <Trophy size={18} />
                     <span className="text-xs font-bold uppercase">{t.wpmTitle}</span>
                 </div>
                 <div className="text-3xl font-black text-emerald-400 font-mono flex items-baseline gap-1">
                    {wpm}
                    <span className="text-xs text-emerald-500/70 font-normal uppercase">{t.wpmUnit}</span>
                 </div>
             </div>

             <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center shadow-inner">
                 <div className="flex items-center gap-2 text-blue-400 mb-1">
                     <Percent size={18} />
                     <span className="text-xs font-bold uppercase">{t.accuracyTitle}</span>
                 </div>
                 <div className="text-3xl font-black text-blue-400 font-mono">
                    {accuracy}%
                 </div>
             </div>

             <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center shadow-inner">
                 <div className="flex items-center gap-2 text-rose-400 mb-1">
                     <RefreshCw size={18} />
                     <span className="text-xs font-bold uppercase">{t.mistakesTitle}</span>
                 </div>
                 <div className="text-3xl font-black text-rose-400 font-mono">
                    {mistakes}
                 </div>
             </div>
          </div>

          {/* Typing Area */}
          <div className="relative w-full">
              {/* Text Display */}
              <div 
                 className={`w-full bg-slate-900 border ${status === 'finished' ? 'border-emerald-500/50' : 'border-indigo-500/30'} rounded-2xl p-6 text-xl md:text-2xl leading-relaxed text-slate-400 font-medium select-none shadow-inner`}
                 dir={isAr ? "rtl" : "ltr"}
                 style={{ minHeight: '160px' }}
              >
                  {renderText()}
              </div>

              {/* Hidden Input field overlaid */}
              {status !== 'finished' && (
                 <textarea
                   ref={inputRef}
                   value={userInput}
                   onChange={handleInputChange}
                   className="absolute inset-0 w-full h-full opacity-0 cursor-text resize-none"
                   placeholder={t.startTyping}
                   dir={isAr ? "rtl" : "ltr"}
                   autoComplete="off"
                   autoCorrect="off"
                   autoCapitalize="off"
                   spellCheck="false"
                 />
              )}

              {/* Finished Overlay */}
              {status === 'finished' && (
                 <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center gap-4 animate-in fade-in duration-300 border border-emerald-500/30">
                     <div className="text-2xl font-black text-emerald-400 drop-shadow-md">
                         {t.testFinished}
                     </div>
                     <p className="text-emerald-100 flex gap-4 text-lg font-mono">
                         <span>{wpm} WPM</span>
                         <span>•</span>
                         <span>{accuracy}%</span>
                     </p>
                     <button
                        onClick={resetTest}
                        className="mt-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg transition-colors flex items-center gap-2"
                     >
                         <RefreshCw size={18} />
                         {t.restart}
                     </button>
                 </div>
              )}
          </div>
          
          {/* Controls */}
          {status !== 'finished' && (
              <div className="flex justify-center">
                  <button
                     onClick={resetTest}
                     className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-bold shadow-sm transition-colors flex items-center gap-2 border border-white/5"
                  >
                     <RefreshCw size={16} />
                     {t.restart}
                  </button>
              </div>
          )}

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
            <Info size={20} className="text-indigo-400"/>
            <h2 className="text-lg font-bold text-indigo-400">{t.aboutTitle}</h2>
        </div>
        <div className="space-y-4">
          <p>{t.aboutP1}</p>
        </div>
      </article>

    </div>
  );
}
