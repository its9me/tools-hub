import React, { useState, useEffect, useMemo } from 'react';
import { Share2, Info, Clock, Globe, ArrowRightLeft, MapPin } from 'lucide-react';
import ShareButtons from '../components/ShareButtons';

const cities = [
  { id: "baghdad", nameAr: "بغداد", nameEn: "Baghdad", tz: "Asia/Baghdad" },
  { id: "riyadh", nameAr: "الرياض", nameEn: "Riyadh", tz: "Asia/Riyadh" },
  { id: "mecca", nameAr: "مكة المكرمة", nameEn: "Mecca", tz: "Asia/Riyadh" },
  { id: "cairo", nameAr: "القاهرة", nameEn: "Cairo", tz: "Africa/Cairo" },
  { id: "dubai", nameAr: "دبي", nameEn: "Dubai", tz: "Asia/Dubai" },
  { id: "amman", nameAr: "عمان", nameEn: "Amman", tz: "Asia/Amman" },
  { id: "damascus", nameAr: "دمشق", nameEn: "Damascus", tz: "Asia/Damascus" },
  { id: "beirut", nameAr: "بيروت", nameEn: "Beirut", tz: "Asia/Beirut" },
  { id: "jerusalem", nameAr: "القدس", nameEn: "Jerusalem", tz: "Asia/Jerusalem" },
  { id: "kuwait", nameAr: "الكويت", nameEn: "Kuwait", tz: "Asia/Kuwait" },
  { id: "doha", nameAr: "الدوحة", nameEn: "Doha", tz: "Asia/Qatar" },
  { id: "muscat", nameAr: "مسقط", nameEn: "Muscat", tz: "Asia/Muscat" },
  { id: "tunis", nameAr: "تونس", nameEn: "Tunis", tz: "Africa/Tunis" },
  { id: "algiers", nameAr: "الجزائر", nameEn: "Algiers", tz: "Africa/Algiers" },
  { id: "rabat", nameAr: "الرباط", nameEn: "Rabat", tz: "Africa/Casablanca" },
  { id: "london", nameAr: "لندن", nameEn: "London", tz: "Europe/London" },
  { id: "paris", nameAr: "باريس", nameEn: "Paris", tz: "Europe/Paris" },
  { id: "berlin", nameAr: "برلين", nameEn: "Berlin", tz: "Europe/Berlin" },
  { id: "madrid", nameAr: "مدريد", nameEn: "Madrid", tz: "Europe/Madrid" },
  { id: "rome", nameAr: "روما", nameEn: "Rome", tz: "Europe/Rome" },
  { id: "moscow", nameAr: "موسكو", nameEn: "Moscow", tz: "Europe/Moscow" },
  { id: "istanbul", nameAr: "إسطنبول", nameEn: "Istanbul", tz: "Europe/Istanbul" },
  { id: "newyork", nameAr: "نيويورك", nameEn: "New York", tz: "America/New_York" },
  { id: "chicago", nameAr: "شيكاغو", nameEn: "Chicago", tz: "America/Chicago" },
  { id: "losangeles", nameAr: "لوس أنجلوس", nameEn: "Los Angeles", tz: "America/Los_Angeles" },
  { id: "toronto", nameAr: "تورونتو", nameEn: "Toronto", tz: "America/Toronto" },
  { id: "buenosaires", nameAr: "بوينس آيرس", nameEn: "Buenos Aires", tz: "America/Argentina/Buenos_Aires" },
  { id: "tokyo", nameAr: "طوكيو", nameEn: "Tokyo", tz: "Asia/Tokyo" },
  { id: "beijing", nameAr: "بكين", nameEn: "Beijing", tz: "Asia/Shanghai" },
  { id: "seoul", nameAr: "سيول", nameEn: "Seoul", tz: "Asia/Seoul" },
  { id: "mumbai", nameAr: "مومباي", nameEn: "Mumbai", tz: "Asia/Kolkata" },
  { id: "singapore", nameAr: "سنغافورة", nameEn: "Singapore", tz: "Asia/Singapore" },
  { id: "sydney", nameAr: "سيدني", nameEn: "Sydney", tz: "Australia/Sydney" },
  { id: "auckland", nameAr: "أوكلاند", nameEn: "Auckland", tz: "Pacific/Auckland" },
];

const translations = {
  ar: {
    title: "حاسبة الفرق الزمني بين المدن",
    subtitle: "احسب فرق الوقت وقارن التوقيت المحلي بدقة بين مدينتين حول العالم.",
    city1: "المدينة الأولى",
    city2: "المدينة الثانية",
    selectCity: "اختر مدينة...",
    timeDifference: "الفرق الزمني",
    ahead: "تسبق",
    behind: "متأخرة عن",
    sameTime: "نفس التوقيت",
    hours: "ساعة",
    minutes: "دقيقة",
    shareWhatsapp: "مشاركة الأداة",
    aboutTitle: "عن الأداة",
    aboutP1: "أداة تعتمد على دوال الوقت الأصلية في المتصفح لقياس الفروق الزمنية بين أشهر المدن العالمية وعرض الوقت اللحظي محلياً دون أي اتصال بخوادم خارجية، مما يضمن دقة عالية وحفاظاً على الخصوصية.",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)"
  },
  en: {
    title: "World Time Difference Calculator",
    subtitle: "Calculate the exact time difference and compare local times between any two cities worldwide.",
    city1: "First City",
    city2: "Second City",
    selectCity: "Select a city...",
    timeDifference: "Time Difference",
    ahead: "ahead of",
    behind: "behind",
    sameTime: "Same time",
    hours: "hour(s)",
    minutes: "minute(s)",
    shareWhatsapp: "Share Tool",
    aboutTitle: "About The Tool",
    aboutP1: "A tool utilizing native browser time APIs (Intl.DateTimeFormat) to calculate precise time differences between major world cities in real-time, functioning completely offline without server calls to ensure accuracy and privacy.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)"
  }
};

export default function TimeDifference({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const [city1Id, setCity1Id] = useState<string>('baghdad');
  const [city2Id, setCity2Id] = useState<string>('newyork');
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const city1 = cities.find(c => c.id === city1Id) || cities[0];
  const city2 = cities.find(c => c.id === city2Id) || cities[1];

  const { diffText, c1TimeInfo, c2TimeInfo } = useMemo(() => {
    const c1Tz = city1.tz;
    const c2Tz = city2.tz;

    const locale = isAr ? 'ar-EG-u-nu-latn' : 'en-US';

    const formatterTime = new Intl.DateTimeFormat(locale, {
      timeZone: c1Tz,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
    const formatterTime2 = new Intl.DateTimeFormat(locale, {
      timeZone: c2Tz,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
    const formatterDate = new Intl.DateTimeFormat(locale, {
      timeZone: c1Tz,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const formatterDate2 = new Intl.DateTimeFormat(locale, {
      timeZone: c2Tz,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const d1Str = time.toLocaleString('en-US', { timeZone: c1Tz, year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
    const d2Str = time.toLocaleString('en-US', { timeZone: c2Tz, year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
    
    const dt1 = new Date(d1Str);
    const dt2 = new Date(d2Str);
    
    let diffMs = dt1.getTime() - dt2.getTime();
    let isAhead = diffMs > 0;
    
    if (diffMs < 0) {
      diffMs = Math.abs(diffMs);
    }
    
    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    
    let comparisonText = "";
    if (h === 0 && m === 0) {
        comparisonText = t.sameTime;
    } else {
        const hText = h > 0 ? `${h} ${t.hours}` : "";
        const mText = m > 0 ? `${m} ${t.minutes}` : "";
        const combined = [hText, mText].filter(Boolean).join(` ${isAr ? 'و' : 'and'} `);
        
        if (isAr) {
            comparisonText = `${isAhead ? t.ahead : t.behind} بـ ${combined}`;
        } else {
            comparisonText = `${combined} ${isAhead ? t.ahead : t.behind}`;
        }
    }

    return {
      diffText: comparisonText,
      c1TimeInfo: { time: formatterTime.format(time), date: formatterDate.format(time) },
      c2TimeInfo: { time: formatterTime2.format(time), date: formatterDate2.format(time) }
    };
  }, [time, city1, city2, isAr, t]);

  const generateShareText = () => {
    let str = isAr ? '*حاسبة الفرق الزمني:*\n\n' : '*Time Difference Calculator:*\n\n';
    str += isAr ? `قارن الوقت بين ${city1.nameAr} و ${city2.nameAr} بدقة.\n\nجربها هنا: ` : `Compare current time between ${city1.nameEn} and ${city2.nameEn} accurately.\n\nTry it here: `;
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
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="text-center relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg text-white">
            <Globe size={32} />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">{t.subtitle}</p>
        </div>

        <div className="flex flex-col gap-8 relative z-10">
          
          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="flex flex-col gap-2 p-5 bg-slate-900/50 rounded-2xl border border-white/5 shadow-inner">
                <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                   <MapPin size={16} className="text-cyan-400" />
                   {t.city1}
                </label>
                <select 
                   value={city1Id}
                   onChange={(e) => setCity1Id(e.target.value)}
                   className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-white outline-none focus:ring-2 focus:ring-cyan-500/50 appearance-none cursor-pointer"
                >
                    {cities.map((c) => (
                        <option key={c.id} value={c.id}>{isAr ? c.nameAr : c.nameEn}</option>
                    ))}
                </select>
             </div>

             <div className="flex flex-col gap-2 p-5 bg-slate-900/50 rounded-2xl border border-white/5 shadow-inner">
                <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                   <MapPin size={16} className="text-fuchsia-400" />
                   {t.city2}
                </label>
                <select 
                   value={city2Id}
                   onChange={(e) => setCity2Id(e.target.value)}
                   className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-white outline-none focus:ring-2 focus:ring-fuchsia-500/50 appearance-none cursor-pointer"
                >
                    {cities.map((c) => (
                        <option key={c.id} value={c.id}>{isAr ? c.nameAr : c.nameEn}</option>
                    ))}
                </select>
             </div>
          </div>

          {/* Visualization */}
          <div className="flex flex-col items-center">
             
             {/* Difference Badge */}
             <div className="mb-6 px-6 py-2 bg-slate-800/80 rounded-full border border-white/10 flex items-center gap-3 shadow-lg z-20">
                <ArrowRightLeft size={16} className="text-slate-400" />
                <span className="text-sm font-medium text-slate-200">
                    <span className="font-bold text-indigo-400">{isAr ? city1.nameAr : city1.nameEn}</span>
                    {' '}{diffText}{' '}
                    <span className="font-bold text-indigo-400">{isAr ? city2.nameAr : city2.nameEn}</span>
                </span>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                
                {/* Clock 1 */}
                <div className="p-6 md:p-8 bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border border-cyan-500/20 rounded-3xl flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden">
                   <Clock size={120} className="absolute -right-4 -top-4 opacity-5 text-cyan-400 rotate-12" />
                   <h3 className="text-xl font-bold text-cyan-400 mb-2 relative z-10">{isAr ? city1.nameAr : city1.nameEn}</h3>
                   <div className="font-mono text-4xl lg:text-5xl font-bold text-white tracking-widest relative z-10 mb-2" dir="ltr">
                       {c1TimeInfo.time}
                   </div>
                   <p className="text-sm text-cyan-200/60 relative z-10">{c1TimeInfo.date}</p>
                   <div className="inline-block mt-3 px-3 py-1 bg-cyan-950/50 rounded-lg text-xs font-mono text-cyan-400/80 border border-cyan-500/10">
                       {city1.tz}
                   </div>
                </div>

                {/* Clock 2 */}
                <div className="p-6 md:p-8 bg-gradient-to-br from-fuchsia-900/40 to-purple-900/40 border border-fuchsia-500/20 rounded-3xl flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden">
                   <Clock size={120} className="absolute -left-4 -bottom-4 opacity-5 text-fuchsia-400 -rotate-12" />
                   <h3 className="text-xl font-bold text-fuchsia-400 mb-2 relative z-10">{isAr ? city2.nameAr : city2.nameEn}</h3>
                   <div className="font-mono text-4xl lg:text-5xl font-bold text-white tracking-widest relative z-10 mb-2" dir="ltr">
                       {c2TimeInfo.time}
                   </div>
                   <p className="text-sm text-fuchsia-200/60 relative z-10">{c2TimeInfo.date}</p>
                   <div className="inline-block mt-3 px-3 py-1 bg-fuchsia-950/50 rounded-lg text-xs font-mono text-fuchsia-400/80 border border-fuchsia-500/10">
                       {city2.tz}
                   </div>
                </div>

             </div>
          </div>

        </div>
        
        <div className="flex justify-center pt-4 relative z-10 w-full mt-4 border-none">
             <ShareButtons 
                text={isAr ? `الفرق الزمني:\nالآن أتحقق من فرق الوقت بين ${city1.nameAr} و ${city2.nameAr} بدقة.\nالنتيجة: ${city1.nameAr} ${diffText} ${city2.nameAr}` : `Time Difference:\nI'm checking the time difference between ${city1.nameEn} and ${city2.nameEn}.\nResult: ${city1.nameEn} ${diffText} ${city2.nameEn}`} 
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
