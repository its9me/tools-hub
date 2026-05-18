import React, { useState } from 'react';
import { Droplet, Share2, Info, Activity, GlassWater } from 'lucide-react';

const translations = {
  ar: {
    title: "حاسبة احتياج الماء اليومي",
    subtitle: "احسب كمية الماء المثالية التي يحتاجها جسمك يومياً بناءً على وزنك ومستوى نشاطك.",
    system: "نظام القياس",
    metric: "متري (كجم)",
    imperial: "إمبراطوري (رطل)",
    weight: "الوزن",
    weightKg: "كجم",
    weightLbs: "رطل",
    activity: "مستوى النشاط اليومي",
    activities: {
      sedentary: "خامل (بدون تمارين الرياضية)",
      light: "نشاط خفيف (30 دقيقة تمرين يومياً)",
      moderate: "نشاط معتدل (60 دقيقة تمرين يومياً)",
      active: "نشط جداً (90 دقيقة تمرين يومياً)",
      extreme: "نشاط فائق (120 دقيقة تمرين فأكثر يومياً)"
    },
    calc: "احسب الكمية",
    resultsTitle: "احتياجك اليومي من الماء",
    liters: "لتر",
    cups: "كوب (250 مل)",
    ml: "ملليلتر",
    shareWhatsapp: "مشاركة النتائج",
    aboutTitle: "عن حاسبة الماء",
    aboutP1: "الماء ضروري لبقاء جسمك رطباً وصحياً. تحسب هذه الأداة كمية الماء الأساسية بضرب وزن الجسم بـ 35 مل (للوضع الطبيعي)، ثم تضيف كميات إضافية لتعويض السوائل المفقودة عند ممارسة النشاط البدني. شرب الكمية الموصى بها يساعد على زيادة الطاقة، تحسين البشرة، ودعم وظائف الأعضاء الحيوية.",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)"
  },
  en: {
    title: "Daily Water Intake Calculator",
    subtitle: "Calculate your ideal daily water intake based on your weight and activity level.",
    system: "Measurement System",
    metric: "Metric (kg)",
    imperial: "Imperial (lbs)",
    weight: "Weight",
    weightKg: "kg",
    weightLbs: "lbs",
    activity: "Daily Activity Level",
    activities: {
      sedentary: "Sedentary (No exercise)",
      light: "Lightly active (30 mins exercise/day)",
      moderate: "Moderately active (60 mins exercise/day)",
      active: "Very active (90 mins exercise/day)",
      extreme: "Extra active (120+ mins exercise/day)"
    },
    calc: "Calculate Intake",
    resultsTitle: "Your Daily Water Goal",
    liters: "Liters",
    cups: "Cups (250ml)",
    ml: "Milliliters",
    shareWhatsapp: "Share Results",
    aboutTitle: "About Water Calculator",
    aboutP1: "Water is essential for keeping your body hydrated and healthy. This tool calculates your base water needs by multiplying your weight by 35ml (for a typical day), then adds extra amounts to replace lost fluids during physical activity. Drinking the recommended amount helps increase energy, improve skin, and support vital organ functions.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)"
  }
};

const activityModifiers = {
  sedentary: 0,
  light: 350,
  moderate: 700,
  active: 1050,
  extreme: 1400
};

export default function WaterCalculator({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const [sys, setSys] = useState<'metric'|'imperial'>('metric');
  
  const [kg, setKg] = useState<string>('70');
  const [lbs, setLbs] = useState<string>('154');

  const [activity, setActivity] = useState<keyof typeof activityModifiers>('sedentary');

  const [results, setResults] = useState<{
    totalMl: number;
    liters: number;
    cups: number;
  } | null>(null);

  const calculate = () => {
    let weightInKg = 0;
    
    if (sys === 'metric') {
      weightInKg = parseFloat(kg);
    } else {
      weightInKg = parseFloat(lbs) * 0.453592;
    }

    if (isNaN(weightInKg) || weightInKg <= 0) return;

    // Base requirement: 35 ml per kg of body weight
    let baseMl = weightInKg * 35;
    
    // Add extra requirement based on activity
    let totalMl = baseMl + activityModifiers[activity];

    setResults({
      totalMl: Math.round(totalMl),
      liters: parseFloat((totalMl / 1000).toFixed(2)),
      cups: Math.round(totalMl / 250)
    });
  };

  const generateShareText = () => {
    if (!results) return '';
    let str = isAr ? '*احتياجي اليومي من الماء:*\n\n' : '*My Daily Water Intake Goal:*\n\n';
    str += `💧 ${results.liters} ${t.liters}\n`;
    str += `🚰 ${results.cups} ${t.cups}\n`;
    str += isAr ? `\n\nاحسب احتياجك هنا: ` : `\n\nCalculate yours here: `;
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
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="text-center relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <Droplet size={32} className="text-white" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10 mt-4">
          
          <div className="flex flex-col gap-5 p-6 bg-slate-900/40 rounded-2xl border border-white/5">
            
            <div className="flex flex-col gap-4">
               <div>
                 <label className="block text-sm font-medium text-slate-300 mb-2">{t.system}</label>
                 <div className="flex p-1 bg-slate-800 rounded-xl border border-white/5">
                   <button 
                     onClick={() => { setSys('metric'); setResults(null); }}
                     className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors ${sys === 'metric' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
                   >
                     {t.metric}
                   </button>
                   <button 
                     onClick={() => { setSys('imperial'); setResults(null); }}
                     className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors ${sys === 'imperial' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
                   >
                     {t.imperial}
                   </button>
                 </div>
               </div>

               <div>
                 <label className="block text-sm font-medium text-slate-300 mb-2">{t.weight}</label>
                 {sys === 'metric' ? (
                   <div className="relative">
                     <input
                       type="number"
                       value={kg}
                       onChange={(e) => setKg(e.target.value)}
                       className="w-full bg-slate-800 border border-white/10 rounded-xl p-3.5 text-lg font-bold text-slate-200 outline-none focus:ring-2 focus:ring-cyan-500/50 pr-12"
                       dir="ltr"
                     />
                     <span className="absolute right-4 top-4 text-sm text-slate-500 font-medium">{t.weightKg}</span>
                   </div>
                 ) : (
                   <div className="relative">
                     <input
                       type="number"
                       value={lbs}
                       onChange={(e) => setLbs(e.target.value)}
                       className="w-full bg-slate-800 border border-white/10 rounded-xl p-3.5 text-lg font-bold text-slate-200 outline-none focus:ring-2 focus:ring-cyan-500/50 pr-12"
                       dir="ltr"
                     />
                     <span className="absolute right-4 top-4 text-sm text-slate-500 font-medium">{t.weightLbs}</span>
                   </div>
                 )}
               </div>

               <div>
                 <label className="block text-sm font-medium text-slate-300 mb-2">{t.activity}</label>
                 <select
                   value={activity}
                   onChange={(e) => setActivity(e.target.value as keyof typeof activityModifiers)}
                   className="w-full bg-slate-800 border border-white/10 rounded-xl p-3.5 text-sm font-medium text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat"
                   style={{ backgroundPosition: isAr ? 'left 1rem center' : 'right 1rem center' }}
                   dir={isAr ? 'rtl' : 'ltr'}
                 >
                   <option value="sedentary">{t.activities.sedentary}</option>
                   <option value="light">{t.activities.light}</option>
                   <option value="moderate">{t.activities.moderate}</option>
                   <option value="active">{t.activities.active}</option>
                   <option value="extreme">{t.activities.extreme}</option>
                 </select>
               </div>

               <button 
                  onClick={calculate}
                  className="mt-2 flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition-all shadow-lg shadow-cyan-600/20 active:scale-95"
               >
                 <Activity size={18} />
                 {t.calc}
               </button>

            </div>

          </div>

          <div className="flex flex-col gap-4">
             
             {results ? (
                <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-300 h-full">
                  <div className="bg-slate-900/30 border border-cyan-500/20 p-6 rounded-2xl flex flex-col items-center justify-center text-center relative overflow-hidden flex-1 shadow-[0_0_30px_rgba(6,182,212,0.1)]">
                     <div className="absolute top-0 right-0 p-4 opacity-5">
                       <Droplet size={120} />
                     </div>
                     <p className="text-cyan-400 text-sm font-medium mb-3">{t.resultsTitle}</p>
                     <div className="flex items-baseline gap-2">
                       <span className="text-6xl font-black tracking-tighter text-white">
                         {results.liters}
                       </span>
                       <span className="text-xl font-bold text-cyan-500">{t.liters}</span>
                     </div>
                     <p className="text-slate-400 text-sm mt-2">{results.totalMl} {t.ml}</p>
                  </div>

                  <div className="bg-slate-900/40 border border-white/5 p-4 rounded-xl flex items-center gap-4">
                     <div className="p-3 bg-cyan-500/10 rounded-lg">
                       <GlassWater size={32} className="text-cyan-400" />
                     </div>
                     <div className="flex flex-col">
                        <span className="text-xs text-slate-400 font-medium">{isAr ? 'يعادل تقريباً' : 'Equivalent to approx.'}</span>
                        <span className="text-lg font-bold text-slate-100">{results.cups} {t.cups}</span>
                     </div>
                  </div>

                  <div className="pt-2">
                    <a
                      href={`https://wa.me/?text=${generateShareText()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm font-bold text-white shadow-lg transition-all border border-white/5 w-full"
                    >
                      <Share2 size={18} />
                      {t.shareWhatsapp}
                    </a>
                  </div>
                </div>
             ) : (
                <div className="flex-1 min-h-[300px] border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-slate-500 bg-slate-900/20 relative">
                   <Droplet size={48} strokeWidth={1} className="mb-4 opacity-30 text-cyan-400" />
                   <p className="text-sm font-medium">{isAr ? 'أدخل بياناتك لعرض النتائج' : 'Enter your details to view results'}</p>
                </div>
             )}

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
