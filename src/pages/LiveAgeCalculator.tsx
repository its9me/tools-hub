import React, { useState, useEffect } from 'react';
import { Share2, Info, Clock, CalendarDays, Hourglass, Activity } from 'lucide-react';
import ShareButtons from '../components/ShareButtons';

const translations = {
  ar: {
    title: "حاسبة العمر الدقيق المباشرة",
    subtitle: "شاهد عمرك يمضي بالسنوات، الشهور، الأيام، الساعات، الدقائق، وحتى الثواني بشكل حي ومباشر.",
    birthDate: "تاريخ الميلاد",
    birthTime: "وقت الميلاد (اختياري)",
    years: "سنة",
    months: "شهر",
    days: "يوم",
    hours: "ساعة",
    minutes: "دقيقة",
    seconds: "ثانية",
    totalDays: "إجمالي الأيام",
    totalWeeks: "إجمالي الأسابيع",
    totalHours: "إجمالي الساعات",
    shareWhatsapp: "مشاركة الأداة",
    aboutTitle: "عن الأداة",
    aboutP1: "تقوم هذه الأداة بحساب عمرك الزمني بدقة متناهية بناءً على تاريخ ووقت ميلادك، وتحديث الشاشة في الوقت الفعلي لكل ثانية تمضي. تذكرنا هذه الأداة بقيمة الوقت وأهمية استغلال كل لحظة. تتم جميع الحسابات محلياً في متصفحك.",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)"
  },
  en: {
    title: "Precise Live Age Calculator",
    subtitle: "Watch your age progress in years, months, days, hours, minutes, and seconds in real-time.",
    birthDate: "Date of Birth",
    birthTime: "Time of Birth (Optional)",
    years: "Years",
    months: "Months",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    totalDays: "Total Days",
    totalWeeks: "Total Weeks",
    totalHours: "Total Hours",
    shareWhatsapp: "Share Tool",
    aboutTitle: "About The Tool",
    aboutP1: "This tool calculates your exact chronological age based on your birth date and time, updating the screen in real-time. A great reminder of the value of time and every passing second. All calculations run safely in your browser.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)"
  }
};

export default function LiveAgeCalculator({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  // Default to 20 years ago today
  const defaultDate = new Date();
  defaultDate.setFullYear(defaultDate.getFullYear() - 20);
  
  const [bDate, setBDate] = useState<string>(defaultDate.toISOString().split('T')[0]);
  const [bTime, setBTime] = useState<string>('00:00');

  const [age, setAge] = useState({
    years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0, millis: 0
  });

  const [totals, setTotals] = useState({
    days: 0, weeks: 0, hours: 0
  });

  useEffect(() => {
    let animationFrameId: number;

    const calculateAge = () => {
      if (!bDate) return;
      
      const birth = new Date(`${bDate}T${bTime || '00:00'}`);
      const now = new Date();
      
      if (isNaN(birth.getTime()) || birth > now) {
        setAge({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0, millis: 0 });
        setTotals({ days: 0, weeks: 0, hours: 0 });
        animationFrameId = requestAnimationFrame(calculateAge);
        return;
      }

      let years = now.getFullYear() - birth.getFullYear();
      let months = now.getMonth() - birth.getMonth();
      let days = now.getDate() - birth.getDate();
      let hours = now.getHours() - birth.getHours();
      let minutes = now.getMinutes() - birth.getMinutes();
      let seconds = now.getSeconds() - birth.getSeconds();
      let millis = now.getMilliseconds() - birth.getMilliseconds();

      if (millis < 0) {
        millis += 1000;
        seconds--;
      }
      if (seconds < 0) {
        seconds += 60;
        minutes--;
      }
      if (minutes < 0) {
        minutes += 60;
        hours--;
      }
      if (hours < 0) {
        hours += 24;
        days--;
      }
      if (days < 0) {
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
        months--;
      }
      if (months < 0) {
        months += 12;
        years--;
      }

      setAge({ years, months, days, hours, minutes, seconds, millis });

      const diffTime = Math.abs(now.getTime() - birth.getTime());
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const diffWeeks = Math.floor(diffDays / 7);
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      
      setTotals({ days: diffDays, weeks: diffWeeks, hours: diffHours });

      animationFrameId = requestAnimationFrame(calculateAge);
    };

    calculateAge();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [bDate, bTime]);

  const generateShareText = () => {
    let str = isAr ? '*حاسبة العمر الدقيق:*\n\n' : '*Precise Age Calculator:*\n\n';
    str += isAr ? `عمري الآن هو ${age.years} سنة و ${age.months} شهر و ${age.days} أيام!\nاحسب عمرك بالثواني هنا: ` : `My age is ${age.years} years, ${age.months} months, and ${age.days} days!\nCalculate your exact age here: `;
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
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="text-center relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg text-white">
            <Hourglass size={32} />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10 w-full items-start">
          
          {/* Controls */}
          <div className="flex flex-col gap-5 bg-slate-900/50 p-6 rounded-2xl border border-white/5 shadow-inner">
             <div className="flex items-center gap-2 mb-2 border-b border-white/10 pb-4">
                 <CalendarDays size={20} className="text-cyan-400" />
                 <h3 className="font-bold text-slate-200">{isAr ? 'بيانات الميلاد' : 'Birth Details'}</h3>
             </div>

             <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-300">{t.birthDate}</label>
                <input 
                  type="date"
                  value={bDate} 
                  onChange={(e) => setBDate(e.target.value)} 
                  className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-white outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all font-mono"
                  dir="ltr"
                />
             </div>

             <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-300">{t.birthTime}</label>
                <input 
                  type="time" 
                  value={bTime} 
                  onChange={(e) => setBTime(e.target.value)} 
                  className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-white outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all font-mono"
                  dir="ltr"
                />
             </div>
          </div>

          {/* Results Area */}
          <div className="lg:col-span-2 w-full flex flex-col gap-6">
             
             {/* Main Realtime Display */}
             <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 shadow-inner flex flex-col items-center justify-center relative overflow-hidden">
                 
                 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 w-full">
                    {/* Years */}
                    <div className="flex flex-col items-center justify-center bg-slate-800 border border-white/10 rounded-xl py-4 shadow-lg shadow-cyan-500/5">
                        <span className="text-3xl font-black text-cyan-400 font-mono tracking-wider">{age.years}</span>
                        <span className="text-xs text-slate-400 mt-1 uppercase">{t.years}</span>
                    </div>
                    {/* Months */}
                    <div className="flex flex-col items-center justify-center bg-slate-800 border border-white/10 rounded-xl py-4 shadow-lg shadow-cyan-500/5">
                        <span className="text-3xl font-black text-cyan-400 font-mono tracking-wider">{age.months}</span>
                        <span className="text-xs text-slate-400 mt-1 uppercase">{t.months}</span>
                    </div>
                    {/* Days */}
                    <div className="flex flex-col items-center justify-center bg-slate-800 border border-white/10 rounded-xl py-4 shadow-lg shadow-cyan-500/5">
                        <span className="text-3xl font-black text-cyan-400 font-mono tracking-wider">{age.days}</span>
                        <span className="text-xs text-slate-400 mt-1 uppercase">{t.days}</span>
                    </div>
                    {/* Hours */}
                    <div className="flex flex-col items-center justify-center bg-slate-800 border border-white/10 rounded-xl py-4 shadow-lg shadow-cyan-500/5">
                        <span className="text-3xl font-black text-cyan-200 font-mono tracking-wider">{age.hours}</span>
                        <span className="text-xs text-slate-400 mt-1 uppercase">{t.hours}</span>
                    </div>
                    {/* Minutes */}
                    <div className="flex flex-col items-center justify-center bg-slate-800 border border-white/10 rounded-xl py-4 shadow-lg shadow-cyan-500/5">
                        <span className="text-3xl font-black text-white font-mono tracking-wider">{String(age.minutes).padStart(2, '0')}</span>
                        <span className="text-xs text-slate-400 mt-1 uppercase">{t.minutes}</span>
                    </div>
                    {/* Seconds & Millis */}
                    <div className="flex flex-col items-center justify-center bg-gradient-to-b from-cyan-600 to-blue-600 border border-cyan-400/30 rounded-xl py-4 shadow-lg shadow-cyan-500/20 relative overflow-hidden">
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-black text-white font-mono tracking-wider drop-shadow-md">
                             {String(age.seconds).padStart(2, '0')}
                          </span>
                          <span className="text-xs font-mono text-cyan-200">
                             .{String(age.millis).padStart(3, '0').substring(0, 2)}
                          </span>
                        </div>
                        <span className="text-xs text-cyan-100 mt-1 uppercase font-bold">{t.seconds}</span>
                    </div>
                 </div>
                 
             </div>

             {/* Secondary Stats */}
             <div className="grid grid-cols-3 gap-4">
                 <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col items-center text-center transition-all hover:bg-white/10">
                     <span className="text-slate-400 text-xs mb-1 uppercase tracking-widest">{t.totalDays}</span>
                     <span className="text-lg font-bold text-slate-200 font-mono">
                         {totals.days.toLocaleString()}
                     </span>
                 </div>
                 <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col items-center text-center transition-all hover:bg-white/10">
                     <span className="text-slate-400 text-xs mb-1 uppercase tracking-widest">{t.totalWeeks}</span>
                     <span className="text-lg font-bold text-slate-200 font-mono">
                         {totals.weeks.toLocaleString()}
                     </span>
                 </div>
                 <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col items-center text-center transition-all hover:bg-white/10">
                     <span className="text-slate-400 text-xs mb-1 uppercase tracking-widest">{t.totalHours}</span>
                     <span className="text-lg font-bold text-slate-200 font-mono">
                         {totals.hours.toLocaleString()}
                     </span>
                 </div>
             </div>

          </div>

        </div>
        
        <div className="flex justify-center pt-4 relative z-10 w-full mt-2 border-none">
            <ShareButtons 
              text={isAr ? `حاسبة العمر الدقيق:\nعمري الآن هو ${age.years} سنة و ${age.months} شهر و ${age.days} أيام!` : `Precise Age Calculator:\nMy age is ${age.years} years, ${age.months} months, and ${age.days} days!`} 
              lang={lang} 
            />
        </div>
      </section>

      {/* Middle AdSense */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm my-2">
        <div className="text-[10px] uppercase tracking-widest mb-1">{t.adMiddle}</div>
        <p className="text-[10px]">{t.adMiddleDesc}</p>
      </div>

      <article className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col gap-4 text-[13px] text-slate-300 leading-relaxed shadow-lg">
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-2">
            <Info size={20} className="text-cyan-400"/>
            <h2 className="text-lg font-bold text-cyan-400">{t.aboutTitle}</h2>
        </div>
        <div className="space-y-4">
          <p>{t.aboutP1}</p>
        </div>
      </article>

    </div>
  );
}
