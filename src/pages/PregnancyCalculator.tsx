import React, { useState, useEffect } from 'react';
import { Baby, Share2, Info, CalendarHeart, Clock } from 'lucide-react';
import moment from 'moment';

const translations = {
  ar: {
    title: "حاسبة موعد الولادة والحمل",
    subtitle: "تتبعي مراحل حملك واعرفي موعد ولادتك المتوقع بدقة.",
    lmpLabel: "أول يوم في آخر دورة شهرية",
    cycleLength: "طول الدورة الشهرية (أيام)",
    calc: "احسبي موعد الولادة",
    dueDate: "موعد الولادة المتوقع",
    currentWeek: "أسبوع الحمل الحالي",
    trimester: "المرحلة (الثلث)",
    daysRemaining: "الأيام المتبقية للولادة",
    progress: "نسبة تقدم الحمل",
    trimesters: {
      first: "الثلث الأول (الأسابيع 1-13)",
      second: "الثلث الثاني (الأسابيع 14-27)",
      third: "الثلث الثالث (الأسابيع 28-40)"
    },
    shareWhatsapp: "مشاركة موعد الولادة",
    aboutTitle: "عن حاسبة الحمل",
    aboutP1: "تستخدم هذه الحاسبة قاعدة نايجل (Naegele's rule) لحساب موعد الولادة التقريبي بناءً على تاريخ آخر دورة شهرية. يمكنك أيضاً تتبع في أي أسبوع أنتِ، ومعرفة المرحلة الحالية من الحمل، ومقدار الوقت المتبقي للقاء طفلك.",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)",
    notPregnant: "يرجى تحديد تاريخ دورة سابق لليوم الحاضر للحصول على نتائج صحيحة."
  },
  en: {
    title: "Pregnancy Due Date Calculator",
    subtitle: "Track your pregnancy progress and estimate your due date accurately.",
    lmpLabel: "First day of Last Menstrual Period (LMP)",
    cycleLength: "Average Cycle Length (Days)",
    calc: "Calculate Due Date",
    dueDate: "Estimated Due Date",
    currentWeek: "Current Week",
    trimester: "Trimester",
    daysRemaining: "Days Remaining to Birth",
    progress: "Pregnancy Progress",
    trimesters: {
      first: "First Trimester (Weeks 1-13)",
      second: "Second Trimester (Weeks 14-27)",
      third: "Third Trimester (Weeks 28-40)"
    },
    shareWhatsapp: "Share Due Date",
    aboutTitle: "About Pregnancy Calculator",
    aboutP1: "This calculator uses Naegele's rule to estimate your due date based on the first day of your last menstrual period. You can also track which week of pregnancy you are currently in, the current trimester, and how much time is left until you meet your baby.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)",
    notPregnant: "Please select an LMP date in the past to get valid results."
  }
};

export default function PregnancyCalculator({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const [lmp, setLmp] = useState(moment().subtract(4, 'weeks').format('YYYY-MM-DD'));
  const [cycleLength, setCycleLength] = useState('28');
  
  const [results, setResults] = useState<{
    dueDate: string;
    currentWeekStr: string;
    daysRemaining: number;
    trimesterStr: string;
    progressPercentage: number;
    isValid: boolean;
  } | null>(null);

  const calculate = () => {
    const lmpDate = moment(lmp);
    const today = moment().startOf('day');
    
    if (!lmpDate.isValid()) return;

    // Standard Naegele's rule assumes a 28-day cycle with ovulation on day 14.
    // If cycle is longer or shorter, we adjust the due date standardly by (cycle - 28) days.
    const cycleAdj = parseInt(cycleLength) - 28;
    const dueDate = lmpDate.clone().add(280 + cycleAdj, 'days');
    
    const totalPregnancyDays = 280 + cycleAdj;
    let daysPassed = today.diff(lmpDate, 'days');
    
    if (daysPassed < 0) {
      setResults({ dueDate: '', currentWeekStr: '', daysRemaining: 0, trimesterStr: '', progressPercentage: 0, isValid: false });
      return;
    }

    if (daysPassed > totalPregnancyDays) daysPassed = totalPregnancyDays;

    const weeksPassed = Math.floor(daysPassed / 7);
    const daysRemainder = daysPassed % 7;
    
    const daysRemaining = totalPregnancyDays - daysPassed;
    const progressPercentage = Math.min((daysPassed / totalPregnancyDays) * 100, 100);

    let trimesterStr = t.trimesters.first;
    if (weeksPassed >= 28) {
      trimesterStr = t.trimesters.third;
    } else if (weeksPassed >= 14) {
      trimesterStr = t.trimesters.second;
    }

    let currentWeekStr = '';
    if (isAr) {
      currentWeekStr = `الأسبوع ${weeksPassed}`;
      if (daysRemainder > 0) currentWeekStr += ` و ${daysRemainder} يوم`;
    } else {
      currentWeekStr = `Week ${weeksPassed}`;
      if (daysRemainder > 0) currentWeekStr += ` + ${daysRemainder} days`;
    }

    setResults({
      dueDate: dueDate.format('YYYY-MM-DD'),
      currentWeekStr,
      daysRemaining,
      trimesterStr,
      progressPercentage,
      isValid: true
    });
  };

  useEffect(() => {
    calculate();
  }, [lmp, cycleLength]);

  const generateShareText = () => {
    if (!results || !results.isValid) return '';
    let str = isAr ? '*موعد ولادتي المتوقع:*\n\n' : '*My Estimated Due Date:*\n\n';
    str += `📅 ${results.dueDate}\n`;
    str += `👶 ${results.currentWeekStr} (${results.trimesterStr})\n`;
    str += `⏳ ${isAr ? 'متبقي' : 'Remaining'}: ${results.daysRemaining} ${isAr ? 'يوم' : 'days'}\n`;
    str += isAr ? `\n\nاحسبي موعدك هنا: ` : `\n\nCalculate yours here: `;
    return encodeURIComponent(str + window.location.href);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      {/* Top AdSense */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm">
        <div className="text-[10px] uppercase tracking-widest mb-1">{t.adTop}</div>
        <p className="text-[10px]">{t.adTopDesc}</p>
      </div>

      <section className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl flex flex-col gap-6 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="text-center relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <Baby size={32} className="text-white" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 mt-4">
          
          <div className="flex flex-col gap-6 p-6 bg-slate-900/40 rounded-2xl border border-white/5">
             <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{t.lmpLabel}</label>
                <input
                  type="date"
                  value={lmp}
                  onChange={(e) => setLmp(e.target.value)}
                  className="w-full bg-slate-800 border border-white/10 rounded-xl p-4 text-slate-200 outline-none focus:ring-2 focus:ring-pink-500/50 transition-all font-mono"
                  style={{ colorScheme: 'dark' }}
                />
             </div>
             
             <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{t.cycleLength}</label>
                <input
                  type="number"
                  value={cycleLength}
                  onChange={(e) => setCycleLength(e.target.value)}
                  className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-lg font-bold text-slate-200 outline-none focus:ring-2 focus:ring-pink-500/50 transition-all text-center"
                />
             </div>
          </div>

          <div className="flex flex-col justify-center gap-6">
            
            {results ? (
              results.isValid ? (
                <>
                  <div className="p-6 bg-slate-900/40 rounded-2xl border border-pink-500/30 flex flex-col items-center text-center relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-4 opacity-5">
                       <CalendarHeart size={100} />
                     </div>
                     <p className="text-pink-400 text-sm font-medium mb-1">{t.dueDate}</p>
                     <p className="text-3xl font-black text-white">{results.dueDate}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="bg-slate-900/20 border border-white/5 p-4 rounded-xl flex flex-col items-center text-center">
                        <span className="text-xs text-slate-500 mb-1">{t.currentWeek}</span>
                        <span className="text-sm font-bold text-slate-200">{results.currentWeekStr}</span>
                     </div>
                     <div className="bg-slate-900/20 border border-white/5 p-4 rounded-xl flex flex-col items-center text-center">
                        <span className="text-xs text-slate-500 mb-1">{t.trimester}</span>
                        <span className="text-sm font-bold text-slate-200">{results.trimesterStr}</span>
                     </div>
                  </div>

                  <div className="flex flex-col gap-2 mt-2">
                     <div className="flex justify-between items-end">
                       <span className="text-xs font-medium text-slate-400">{t.progress}</span>
                       <span className="text-xs font-bold text-pink-400">{results.progressPercentage.toFixed(1)}%</span>
                     </div>
                     <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-white/5">
                        <div 
                          className="h-full bg-gradient-to-r from-pink-500 to-rose-400 transition-all duration-1000 ease-out rounded-full"
                          style={{ width: `${results.progressPercentage}%` }}
                        ></div>
                     </div>
                     <p className="text-center text-xs text-slate-500 mt-1">
                       <Clock size={12} className="inline mr-1 opacity-70" />
                       {results.daysRemaining > 0 ? `${results.daysRemaining} ${isAr ? 'يوم متبقي' : 'days left'}` : (isAr ? 'موعد ولادتك اليوم أو قد فات!' : 'Due date reached or passed!')}
                     </p>
                  </div>

                  <div className="mt-2 flex justify-center">
                    <a
                      href={`https://wa.me/?text=${generateShareText()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-pink-600 hover:bg-pink-500 rounded-xl text-sm font-bold text-white shadow-lg shadow-pink-600/20 transition-all active:scale-95 w-full"
                    >
                      <Share2 size={18} />
                      {t.shareWhatsapp}
                    </a>
                  </div>
                </>
              ) : (
                <div className="flex-1 min-h-[300px] border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-rose-400 bg-slate-900/20 p-6 text-center">
                   <p className="text-sm font-medium">{t.notPregnant}</p>
                </div>
              )
            ) : null}

          </div>

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
