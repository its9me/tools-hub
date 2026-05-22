import React, { useState, useEffect } from 'react';
import { Calendar, ArrowLeftRight, Share2, Info, CalendarDays } from 'lucide-react';
import moment from 'moment-hijri';
import ShareButtons from '../components/ShareButtons';

const translations = {
  ar: {
    title: "محول التاريخ (ميلادي / هجري)",
    subtitle: "حول التاريخ من النظام الميلادي إلى الهجري وبالعكس بدقة.",
    convType: "نوع التحويل",
    gregToHijri: "ميلادي إلى هجري",
    hijriToGreg: "هجري إلى ميلادي",
    gregDate: "التاريخ الميلادي",
    hijriDate: "التاريخ الهجري",
    day: "اليوم",
    month: "الشهر",
    year: "السنة",
    result: "النتيجة",
    shareWhatsapp: "مشاركة النتيجة",
    hijriMonths: [
      "مُحَرَّم", "صَفَر", "رَبِيع ٱلْأَوَّل", "رَبِيع ٱلْآخِر",
      "جُمَادَىٰ ٱلْأُولَىٰ", "جُمَادَىٰ ٱلْآخِرَة", "رَجَب", "شَعْبَان",
      "رَمَضَان", "شَوَّال", "ذُو ٱلْقَعْدَة", "ذُو ٱلْحِجَّة"
    ],
    aboutTitle: "عن محول التاريخ",
    aboutP1: "أداة مفيدة لتحويل التواريخ بشكل دقيق بين التقويمين الميلادي (الگريگوري) والهجري (الإسلامي). يمكنك التبديل بين النظامين بسهولة والحصول على التاريخ المقابل فوراً.",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)"
  },
  en: {
    title: "Date Converter (Gregorian / Hijri)",
    subtitle: "Convert dates from Gregorian to Hijri and vice versa accurately.",
    convType: "Conversion Type",
    gregToHijri: "Gregorian to Hijri",
    hijriToGreg: "Hijri to Gregorian",
    gregDate: "Gregorian Date",
    hijriDate: "Hijri Date",
    day: "Day",
    month: "Month",
    year: "Year",
    result: "Result",
    shareWhatsapp: "Share Result",
    hijriMonths: [
      "Muharram", "Safar", "Rabi' I", "Rabi' II",
      "Jumada I", "Jumada II", "Rajab", "Sha'ban",
      "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"
    ],
    aboutTitle: "About Date Converter",
    aboutP1: "A useful tool to accurately convert dates between the Gregorian and Hijri (Islamic) calendars. Switch between the two systems easily and get the corresponding date instantly.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)"
  }
};

export default function DateConverter({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const [mode, setMode] = useState<'g2h' | 'h2g'>('g2h');
  
  // Gregorian input
  const [gregDate, setGregDate] = useState(moment().format('YYYY-MM-DD'));
  
  // Hijri input
  const [hDay, setHDay] = useState(moment().format('iD'));
  const [hMonth, setHMonth] = useState(moment().format('iM'));
  const [hYear, setHYear] = useState(moment().format('iYYYY'));

  // Results
  const [resHijriStr, setResHijriStr] = useState('');
  const [resGregStr, setResGregStr] = useState('');

  useEffect(() => {
    if (mode === 'g2h') {
      if (gregDate) {
        const m = moment(gregDate, 'YYYY-MM-DD');
        if (m.isValid()) {
          const d = m.format('iD');
          const mm = parseInt(m.format('iM'), 10) - 1;
          const y = m.format('iYYYY');
          setResHijriStr(`${d} ${t.hijriMonths[mm]} ${y}`);
        } else {
          setResHijriStr('');
        }
      }
    } else {
      if (hDay && hMonth && hYear) {
        const m = moment(`${hYear}/${hMonth}/${hDay}`, 'iYYYY/iM/iD');
        if (m.isValid()) {
          setResGregStr(m.format('YYYY-MM-DD'));
        } else {
          setResGregStr('');
        }
      }
    }
  }, [gregDate, hDay, hMonth, hYear, mode, t]);

  const swapMode = () => {
    if (mode === 'g2h') {
      const m = moment(gregDate, 'YYYY-MM-DD');
      if (m.isValid()) {
        setHDay(m.format('iD'));
        setHMonth(m.format('iM'));
        setHYear(m.format('iYYYY'));
      }
      setMode('h2g');
    } else {
      const m = moment(`${hYear}/${hMonth}/${hDay}`, 'iYYYY/iM/iD');
      if (m.isValid()) {
         setGregDate(m.format('YYYY-MM-DD'));
      }
      setMode('g2h');
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto">
      {/* Top AdSense */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm">
        <div className="text-[10px] uppercase tracking-widest mb-1">{t.adTop}</div>
        <p className="text-[10px]">{t.adTopDesc}</p>
      </div>

      <section className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl flex flex-col gap-6 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-teal-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="text-center relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <Calendar size={32} className="text-white" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400">{t.subtitle}</p>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center bg-slate-900/20 p-6 rounded-2xl border border-white/5 mt-4">
          
          {/* Left Side */}
          <div className="flex flex-col gap-4">
             <h3 className="text-sm font-bold text-slate-300 mb-2 text-center">
               {mode === 'g2h' ? t.gregDate : t.hijriDate}
             </h3>
             
             {mode === 'g2h' ? (
                <input
                  type="date"
                  value={gregDate}
                  onChange={(e) => setGregDate(e.target.value)}
                  className="w-full bg-slate-800 border border-white/10 rounded-xl p-4 text-center text-slate-200 outline-none focus:ring-2 focus:ring-teal-500 transition-all font-mono"
                />
             ) : (
                <div className="flex gap-2">
                   <select 
                     value={hDay}
                     onChange={(e) => setHDay(e.target.value)}
                     className="w-1/4 bg-slate-800 border border-white/10 rounded-xl p-3 text-center text-slate-200 outline-none focus:ring-2 focus:ring-teal-500 font-mono"
                   >
                     {Array.from({length: 30}, (_, i) => i + 1).map(d => (
                       <option key={d} value={d}>{d}</option>
                     ))}
                   </select>
                   <select 
                     value={hMonth}
                     onChange={(e) => setHMonth(e.target.value)}
                     className="w-1/2 bg-slate-800 border border-white/10 rounded-xl p-3 text-center text-slate-200 outline-none focus:ring-2 focus:ring-teal-500"
                   >
                     {t.hijriMonths.map((m, i) => (
                       <option key={i+1} value={i+1}>{m}</option>
                     ))}
                   </select>
                   <input 
                     type="number"
                     value={hYear}
                     onChange={(e) => setHYear(e.target.value)}
                     className="w-1/4 bg-slate-800 border border-white/10 rounded-xl p-3 text-center text-slate-200 outline-none focus:ring-2 focus:ring-teal-500 font-mono"
                     placeholder="YYYY"
                   />
                </div>
             )}
          </div>

          <div className="flex justify-center my-4 md:my-0">
             <button 
                onClick={swapMode}
                className="w-12 h-12 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-slate-400 hover:text-teal-400 hover:border-teal-500/50 transition-colors shadow-lg active:scale-95"
             >
               <ArrowLeftRight size={20} />
             </button>
          </div>

          {/* Right Side (Result) */}
          <div className="flex flex-col gap-4">
             <h3 className="text-sm font-bold text-slate-300 mb-2 text-center">
               {mode === 'g2h' ? t.hijriDate : t.gregDate}
             </h3>
             <div className="w-full h-[58px] bg-teal-900/20 border border-teal-500/30 rounded-xl p-4 flex items-center justify-center text-center">
                <span className="text-lg font-bold text-teal-400">
                  {mode === 'g2h' ? resHijriStr : resGregStr}
                </span>
             </div>
          </div>
          
        </div>

        <div className="flex justify-center pt-2 relative z-10 w-full mb-4">
           <ShareButtons 
             text={isAr ? `تحويل التاريخ:\n${mode === 'g2h' ? `${gregDate} ⬅️ ${resHijriStr}` : `${hDay} ${t.hijriMonths[parseInt(hMonth)-1]} ${hYear} ⬅️ ${resGregStr}`}` : `Date Conversion:\n${mode === 'g2h' ? `${gregDate} ⬅️ ${resHijriStr}` : `${hDay} ${t.hijriMonths[parseInt(hMonth)-1]} ${hYear} ⬅️ ${resGregStr}`}`}
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
            <Info size={20} className="text-teal-400"/>
            <h2 className="text-lg font-bold text-teal-400">{t.aboutTitle}</h2>
        </div>
        <div className="space-y-4">
          <p>{t.aboutP1}</p>
        </div>
      </article>
    </div>
  );
}
