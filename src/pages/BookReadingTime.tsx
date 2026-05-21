import React, { useState, useEffect, useRef } from 'react';
import { Share2, Info, BookOpen, Clock, Timer, FileText, CalendarDays } from 'lucide-react';

const testTexts = {
  ar: "القراءة هي نافذة العقل على عوالم جديدة، تفتح أمامنا آفاق واسعة من المعرفة والتجارب التي تبني شخصياتنا وتثري ثقافتنا. من خلال الكتب، نسافر عبر الزمن، ونلتقي بأشخاص لم نكن لنلتقي بهم في حياتنا العادية، ونتعلم الدروس من تجارب الآخرين بكل سهولة. إن تخصيص وقت يومي للقراءة لا يحسن التركيز فقط، بل يقلل من التوتر ويزيد من سعة الخيال. لذلك، تعتبر القراءة من أهم العادات التي يمكن للإنسان أن يكتسبها لتطوير ذاته والنجاح في حياته.",
  en: "Reading is the mind's window to new worlds, opening wide horizons of knowledge and experiences that build our personalities and enrich our culture. Through books, we travel through time, meet people we would never meet in our ordinary lives, and easily learn lessons from others' experiences. Dedicating daily time to reading not only improves focus but also reduces stress and expands imagination. Therefore, reading is considered one of the most important habits a person can acquire for self-development and success in life."
};

const translations = {
  ar: {
    title: "حاسبة وقت قراءة كتاب",
    subtitle: "اختبر سرعة قراءتك الفعلية، ثم احسب عدد الساعات والأيام المطلوبة لإنهاء أي كتاب.",
    step1: "1. اختبار سرعة القراءة",
    step2: "2. حساب وقت الكتاب",
    startTest: "ابدأ القراءة المؤقتة",
    finishReading: "انتهيت من القراءة",
    yourSpeed: "سرعة قراءتك:",
    wpm: "كلمة / دقيقة",
    skipTest: "أو تجاوز الاختبار (استخدام متوسط 250 كلمة/دقيقة)",
    bookPages: "عدد صفحات الكتاب",
    wordsPerPage: "متوسط الكلمات في الصفحة",
    dailyMinutes: "دقائق القراءة يومياً",
    calculate: "تحديث الحسابات",
    totalTime: "إجمالي وقت القراءة",
    hoursP: "ساعة",
    minutesP: "دقيقة",
    daysToFinish: "الأيام المطلوبة للإنهاء",
    days: "يوم",
    shareWhatsapp: "مشاركة الأداة",
    aboutTitle: "عن الأداة",
    aboutP1: "أداة ذكية لاختبار سرعة القراءة الشخصية (بناءً على نص معياري وعداد زمني بالثواني)، ثم استخدام تلك السرعة لحساب الزمن الدقيق بالساعات والأيام لإنهاء كتاب معين. تتم جميع العمليات الحسابية داخل جهازك لضمان السرعة والخصوصية.",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)"
  },
  en: {
    title: "Book Reading Time Calculator",
    subtitle: "Test your actual reading speed, then calculate the hours and days required to finish any book.",
    step1: "1. Reading Speed Test",
    step2: "2. Calculate Book Time",
    startTest: "Start Reading Timer",
    finishReading: "I Finished Reading",
    yourSpeed: "Your Speed:",
    wpm: "Words / min",
    skipTest: "Or skip test (Use average 250 wpm)",
    bookPages: "Number of Book Pages",
    wordsPerPage: "Average Words per Page",
    dailyMinutes: "Daily Reading Minutes",
    calculate: "Update Calculations",
    totalTime: "Total Reading Time",
    hoursP: "Hour(s)",
    minutesP: "Minute(s)",
    daysToFinish: "Days Required to Finish",
    days: "Day(s)",
    shareWhatsapp: "Share Tool",
    aboutTitle: "About The Tool",
    aboutP1: "A smart tool to test your personal reading speed (based on a standard text and timer), then use that speed to calculate the exact hours and days needed to finish a specific book. All calculations are processed locally on your device.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)"
  }
};

export default function BookReadingTime({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const [readingSpeed, setReadingSpeed] = useState<number | null>(null);
  
  // Test State
  const [testActive, setTestActive] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState<number>(0);
  
  // Calculator State
  const [pages, setPages] = useState<string>('300');
  const [wordsPerPage, setWordsPerPage] = useState<string>('250');
  const [dailyMinutes, setDailyMinutes] = useState<string>('30');
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startTest = () => {
    setTestActive(true);
    setReadingSpeed(null);
    setElapsed(0);
    setStartTime(Date.now());
    timerRef.current = setInterval(() => {
      setElapsed(Date.now() - (startTime || Date.now()));
    }, 100);
  };

  const finishTest = () => {
    setTestActive(false);
    if (timerRef.current) clearInterval(timerRef.current);
    
    if (startTime) {
      const timeInMinutes = (Date.now() - startTime) / 60000;
      const text = isAr ? testTexts.ar : testTexts.en;
      const wordCount = text.trim().split(/\s+/).length;
      
      const speed = Math.round(wordCount / timeInMinutes);
      // Ensure reasonable limits
      setReadingSpeed(Math.max(50, Math.min(speed, 2000)));
    }
  };

  const skipTest = () => {
    setTestActive(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setReadingSpeed(250);
  };

  const speedToUse = readingSpeed || 250;
  
  let totalMinutes = 0;
  let totalHours = 0;
  let daysReq = 0;

  const p = parseInt(pages) || 0;
  const wpp = parseInt(wordsPerPage) || 0;
  const daily = parseInt(dailyMinutes) || 0;
  
  if (p > 0 && wpp > 0 && speedToUse > 0) {
      const totalWords = p * wpp;
      totalMinutes = totalWords / speedToUse;
      totalHours = Math.floor(totalMinutes / 60);
      const remainingMinutes = Math.floor(totalMinutes % 60);
      
      if (daily > 0) {
          daysReq = Math.ceil(totalMinutes / daily);
      }
  }
  
  const formattedHours = Math.floor(totalMinutes / 60);
  const formattedMins = Math.floor(totalMinutes % 60);

  const generateShareText = () => {
    let str = isAr ? '*حاسبة وقت قراءة كتاب:*\n\n' : '*Book Reading Time Calculator:*\n\n';
    str += isAr ? `عرفت إن سرعتي في القراءة ${speedToUse} كلمة/د، وأحتاج ${daysReq} يوم لإنهاء كتابي!\n\nجربها هنا: ` : `My reading speed is ${speedToUse} WPM, and I need ${daysReq} days to finish my book!\n\nTry it here: `;
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
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="text-center relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg text-white">
            <BookOpen size={32} />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 w-full items-start">
          
          {/* Step 1: Speed Test */}
          <div className="flex flex-col gap-5 bg-slate-900/50 p-6 rounded-2xl border border-white/5 shadow-inner">
             <div className="flex items-center gap-2 mb-2 border-b border-white/10 pb-4">
                 <Timer size={20} className="text-amber-400" />
                 <h3 className="font-bold text-slate-200">{t.step1}</h3>
             </div>

             {readingSpeed !== null && !testActive ? (
                <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-xl flex flex-col items-center justify-center text-center">
                    <span className="text-sm text-amber-200/80 mb-2">{t.yourSpeed}</span>
                    <div className="text-4xl font-black text-amber-400 mb-1">{readingSpeed}</div>
                    <span className="text-xs text-amber-200/60 font-bold tracking-widest uppercase">{t.wpm}</span>
                    
                    <button 
                       onClick={() => setReadingSpeed(null)}
                       className="mt-6 text-sm text-slate-400 hover:text-white transition-colors underline underline-offset-4"
                    >
                        إعادة الاختبار
                    </button>
                </div>
             ) : (
                <div className="flex flex-col gap-4">
                    {testActive ? (
                       <div className="animate-in fade-in zoom-in duration-300">
                           <div className="text-sm leading-relaxed text-slate-300 bg-slate-800 p-4 rounded-xl border border-white/5 shadow-inner select-none">
                              {isAr ? testTexts.ar : testTexts.en}
                           </div>
                           <div className="flex justify-between items-center mt-4 mb-2">
                               <div className="font-mono text-amber-400">
                                  {(elapsed / 1000).toFixed(1)}s
                               </div>
                           </div>
                           <button 
                              onClick={finishTest}
                              className="w-full py-4 mt-2 bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-500 hover:to-orange-400 text-white font-bold rounded-xl shadow-lg shadow-amber-500/30 transition-all flex justify-center items-center gap-2"
                           >
                              {t.finishReading}
                           </button>
                       </div>
                    ) : (
                       <div className="flex flex-col gap-4">
                           <button 
                              onClick={startTest}
                              className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl border border-white/10 transition-all flex justify-center items-center gap-2"
                           >
                              <BookOpen size={20} className="text-amber-400" />
                              {t.startTest}
                           </button>
                           
                           <button 
                              onClick={skipTest}
                              className="text-sm text-slate-400 hover:text-slate-200 py-2 transition-colors"
                           >
                              {t.skipTest}
                           </button>
                       </div>
                    )}
                </div>
             )}

          </div>

          {/* Step 2: Calculator */}
          <div className="flex flex-col gap-5 bg-slate-900/50 p-6 rounded-2xl border border-white/5 shadow-inner">
             
             <div className="flex items-center gap-2 mb-2 border-b border-white/10 pb-4">
                 <FileText size={20} className="text-orange-400" />
                 <h3 className="font-bold text-slate-200">{t.step2}</h3>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-300">{t.bookPages}</label>
                  <input 
                    type="number"
                    value={pages} 
                    onChange={(e) => setPages(e.target.value)} 
                    className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-white outline-none focus:ring-2 focus:ring-orange-500/50 transition-all font-mono"
                    dir="ltr"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-300">{t.wordsPerPage}</label>
                  <input 
                    type="number"
                    value={wordsPerPage} 
                    onChange={(e) => setWordsPerPage(e.target.value)} 
                    className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-white outline-none focus:ring-2 focus:ring-orange-500/50 transition-all font-mono"
                    dir="ltr"
                  />
                </div>
             </div>

             <div className="flex flex-col gap-2">
               <label className="text-sm font-bold text-slate-300">{t.dailyMinutes}</label>
               <input 
                 type="number" 
                 value={dailyMinutes} 
                 onChange={(e) => setDailyMinutes(e.target.value)} 
                 className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-white outline-none focus:ring-2 focus:ring-orange-500/50 transition-all font-mono"
                 dir="ltr"
               />
             </div>

             {/* Results */}
             <div className="mt-4 flex flex-col gap-4">
                 <div className="bg-slate-800 border border-white/5 rounded-xl p-4 flex items-center justify-between">
                     <div className="flex items-center gap-3 text-slate-300">
                         <Clock size={20} className="text-slate-500" />
                         <span className="font-medium text-sm">{t.totalTime}</span>
                     </div>
                     <div className="font-bold text-slate-200" dir="ltr">
                         {formattedHours > 0 ? `${formattedHours} ${t.hoursP} ` : ''} 
                         {formattedMins} {t.minutesP}
                     </div>
                 </div>

                 <div className="bg-gradient-to-br from-amber-500/20 to-orange-600/20 border border-amber-500/30 rounded-xl p-4 flex items-center justify-between shadow-lg">
                     <div className="flex items-center gap-3 text-amber-200/80">
                         <CalendarDays size={20} className="text-amber-400" />
                         <span className="font-bold text-sm">{t.daysToFinish}</span>
                     </div>
                     <div className="font-black text-xl text-amber-400" dir="ltr">
                         {daysReq > 0 ? daysReq : '-'} {t.days}
                     </div>
                 </div>
             </div>

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
            <Info size={20} className="text-amber-400"/>
            <h2 className="text-lg font-bold text-amber-400">{t.aboutTitle}</h2>
        </div>
        <div className="space-y-4">
          <p>{t.aboutP1}</p>
        </div>
      </article>

    </div>
  );
}
