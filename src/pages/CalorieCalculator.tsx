import React, { useState } from 'react';
import { Flame, Share2, Info, Activity, Target } from 'lucide-react';
import ShareButtons from '../components/ShareButtons';

const translations = {
  ar: {
    title: "حاسبة السعرات الحرارية",
    subtitle: "احسب احتياجك اليومي من السعرات لإنقاص وزنك أو الحفاظ عليه.",
    system: "نظام القياس",
    metric: "متري (كجم، سم)",
    imperial: "إمبراطوري (رطل، قدم/بوصة)",
    gender: "الجنس",
    male: "ذكر",
    female: "أنثى",
    age: "العمر (سنة)",
    height: "الطول",
    heightCm: "سم",
    heightFt: "قدم",
    heightIn: "بوصة",
    weight: "الوزن",
    weightKg: "كجم",
    weightLbs: "رطل",
    activity: "مستوى النشاط",
    activities: {
      sedentary: "خامل (قليل أو معدوم الحركة)",
      light: "نشاط خفيف (تمرين 1-3 أيام/أسبوع)",
      moderate: "نشاط معتدل (تمرين 3-5 أيام/أسبوع)",
      active: "نشط جداً (تمرين 6-7 أيام/أسبوع)",
      extreme: "نشاط فائق (وظيفة بدنية أو تمرين مرتين يومياً)"
    },
    calc: "احسب السعرات",
    resultsTitle: "الاحتياج اليومي (سعرة حرارية / يوم)",
    maintain: "الحفاظ على الوزن",
    mildLoss: "إنقاص وزن خفيف (0.25 كجم/أسبوع)",
    normalLoss: "إنقاص वजन طبيعي (0.5 كجم/أسبوع)",
    extremeLoss: "إنقاص وزن شديد (1 كجم/أسبوع)",
    gain: "زيادة الوزن (0.5 كجم/أسبوع)",
    shareWhatsapp: "مشاركة النتائج",
    aboutTitle: "عن الحاسبة",
    aboutP1: "تستخدم هذه الحاسبة معادلة Mifflin-St Jeor الدقيقة لحساب معدل الأيض الأساسي (BMR)، ثم تضربه في عامل النشاط البدني لتحديد إجمالي السعرات الحرارية التي تحرقها يومياً (TDEE). بناءً على هذه القيمة، يتم حساب السعرات المطلوبة لإنقاص الوزن بطريقة صحية أو الحفاظ عليه.",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)"
  },
  en: {
    title: "Calorie Calculator",
    subtitle: "Calculate your daily calorie needs to lose, maintain or gain weight.",
    system: "Measurement System",
    metric: "Metric (kg, cm)",
    imperial: "Imperial (lbs, ft/in)",
    gender: "Gender",
    male: "Male",
    female: "Female",
    age: "Age (Years)",
    height: "Height",
    heightCm: "cm",
    heightFt: "ft",
    heightIn: "in",
    weight: "Weight",
    weightKg: "kg",
    weightLbs: "lbs",
    activity: "Activity Level",
    activities: {
      sedentary: "Sedentary (little or no exercise)",
      light: "Lightly active (exercise 1-3 days/week)",
      moderate: "Moderately active (exercise 3-5 days/week)",
      active: "Very active (exercise 6-7 days/week)",
      extreme: "Extra active (physical job or exercise 2x/day)"
    },
    calc: "Calculate Calories",
    resultsTitle: "Daily Calorie Requirements",
    maintain: "Maintain Weight",
    mildLoss: "Mild Weight Loss (0.25 kg/week)",
    normalLoss: "Weight Loss (0.5 kg/week)",
    extremeLoss: "Extreme Weight Loss (1 kg/week)",
    gain: "Weight Gain (0.5 kg/week)",
    shareWhatsapp: "Share Results",
    aboutTitle: "About Calculator",
    aboutP1: "This calculator uses the highly accurate Mifflin-St Jeor equation to estimate your Basal Metabolic Rate (BMR), then applies your activity level to find your Total Daily Energy Expenditure (TDEE). From there, it calculates the optimal calorie targets for healthy weight loss or maintenance.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)"
  }
};

const activityMultipliers = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  extreme: 1.9
};

export default function CalorieCalculator({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const [sys, setSys] = useState<'metric'|'imperial'>('metric');
  const [gender, setGender] = useState<'male'|'female'>('male');
  const [age, setAge] = useState<string>('25');
  
  const [cm, setCm] = useState<string>('175');
  const [kg, setKg] = useState<string>('75');
  
  const [ft, setFt] = useState<string>('5');
  const [inch, setInch] = useState<string>('9');
  const [lbs, setLbs] = useState<string>('165');

  const [activity, setActivity] = useState<keyof typeof activityMultipliers>('moderate');

  const [results, setResults] = useState<{
    maintain: number;
    mildLoss: number;
    normalLoss: number;
    extremeLoss: number;
    gain: number;
  } | null>(null);

  const calculate = () => {
    let weightInKg = 0;
    let heightInCm = 0;
    
    if (sys === 'metric') {
      weightInKg = parseFloat(kg);
      heightInCm = parseFloat(cm);
    } else {
      weightInKg = parseFloat(lbs) * 0.453592;
      const totalInches = (parseFloat(ft) * 12) + parseFloat(inch);
      heightInCm = totalInches * 2.54;
    }

    const ageNum = parseInt(age);

    if (isNaN(weightInKg) || isNaN(heightInCm) || isNaN(ageNum) || heightInCm === 0 || weightInKg === 0) return;

    // BMR (Mifflin-St Jeor)
    let bmrVal = (10 * weightInKg) + (6.25 * heightInCm) - (5 * ageNum);
    bmrVal += (gender === 'male') ? 5 : -161;

    // TDEE
    const tdee = bmrVal * activityMultipliers[activity];

    setResults({
      maintain: Math.round(tdee),
      mildLoss: Math.round(tdee * 0.90), // ~10% deficit
      normalLoss: Math.round(tdee * 0.80), // ~20% deficit
      extremeLoss: Math.round(tdee * 0.61), // ~39% deficit or TDEE - 1000
      gain: Math.round(tdee * 1.15) // ~15% surplus
    });
  };

  const generateShareText = () => {
    if (!results) return '';
    let str = isAr ? '*احتياجي اليومي من السعرات:*\n\n' : '*My Daily Calorie Needs:*\n\n';
    str += `⚖️ ${t.maintain}: ${results.maintain} kcal\n`;
    str += `📉 ${t.normalLoss}: ${results.normalLoss} kcal\n`;
    str += `🔥 ${t.extremeLoss}: ${results.extremeLoss} kcal\n`;
    str += isAr ? `\n\nاحسب سعراتك هنا: ` : `\n\nCalculate yours here: `;
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
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="text-center relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <Flame size={32} className="text-white" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10 mt-4">
          
          <div className="flex flex-col gap-5 p-6 bg-slate-900/40 rounded-2xl border border-white/5">
            
            <div className="flex flex-col gap-3">
               <div>
                 <label className="block text-sm font-medium text-slate-300 mb-2">{t.system}</label>
                 <div className="flex p-1 bg-slate-800 rounded-xl border border-white/5">
                   <button 
                     onClick={() => { setSys('metric'); setResults(null); }}
                     className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${sys === 'metric' ? 'bg-orange-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
                   >
                     {t.metric}
                   </button>
                   <button 
                     onClick={() => { setSys('imperial'); setResults(null); }}
                     className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${sys === 'imperial' ? 'bg-orange-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
                   >
                     {t.imperial}
                   </button>
                 </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="block text-sm font-medium text-slate-300 mb-2">{t.gender}</label>
                   <div className="flex p-1 bg-slate-800 rounded-lg border border-white/5 h-[44px]">
                     <button 
                       onClick={() => setGender('male')}
                       className={`flex-1 text-sm font-medium rounded-md transition-colors ${gender === 'male' ? 'bg-slate-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
                     >
                       {t.male}
                     </button>
                     <button 
                       onClick={() => setGender('female')}
                       className={`flex-1 text-sm font-medium rounded-md transition-colors ${gender === 'female' ? 'bg-slate-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
                     >
                       {t.female}
                     </button>
                   </div>
                 </div>
                 <div>
                   <label className="block text-xs font-medium text-slate-400 mb-1">{t.age}</label>
                   <input
                     type="number"
                     value={age}
                     onChange={(e) => setAge(e.target.value)}
                     className="w-full bg-slate-800 border border-white/10 rounded-lg p-2.5 text-sm text-slate-200 outline-none focus:ring-2 focus:ring-orange-500/50 h-[44px]"
                   />
                 </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="block text-xs font-medium text-slate-400 mb-1">{t.height}</label>
                   {sys === 'metric' ? (
                     <div className="relative">
                       <input
                         type="number"
                         value={cm}
                         onChange={(e) => setCm(e.target.value)}
                         className="w-full bg-slate-800 border border-white/10 rounded-lg p-2.5 text-sm text-slate-200 outline-none focus:ring-2 focus:ring-orange-500/50 pr-10 h-[44px]"
                         dir="ltr"
                       />
                       <span className="absolute right-3 top-3 text-xs text-slate-500">{t.heightCm}</span>
                     </div>
                   ) : (
                     <div className="flex gap-2" dir="ltr">
                       <div className="relative flex-1">
                         <input
                           type="number"
                           value={ft}
                           onChange={(e) => setFt(e.target.value)}
                           className="w-full bg-slate-800 border border-white/10 rounded-lg p-2.5 text-sm text-slate-200 outline-none focus:ring-2 focus:ring-orange-500/50 pr-8 h-[44px]"
                         />
                         <span className="absolute right-2 top-3 text-xs text-slate-500">{t.heightFt}</span>
                       </div>
                       <div className="relative flex-1">
                         <input
                           type="number"
                           value={inch}
                           onChange={(e) => setInch(e.target.value)}
                           className="w-full bg-slate-800 border border-white/10 rounded-lg p-2.5 text-sm text-slate-200 outline-none focus:ring-2 focus:ring-orange-500/50 pr-8 h-[44px]"
                         />
                         <span className="absolute right-2 top-3 text-xs text-slate-500">{t.heightIn}</span>
                       </div>
                     </div>
                   )}
                 </div>

                 <div>
                   <label className="block text-xs font-medium text-slate-400 mb-1">{t.weight}</label>
                   {sys === 'metric' ? (
                     <div className="relative">
                       <input
                         type="number"
                         value={kg}
                         onChange={(e) => setKg(e.target.value)}
                         className="w-full bg-slate-800 border border-white/10 rounded-lg p-2.5 text-sm text-slate-200 outline-none focus:ring-2 focus:ring-orange-500/50 pr-10 h-[44px]"
                         dir="ltr"
                       />
                       <span className="absolute right-3 top-3 text-xs text-slate-500">{t.weightKg}</span>
                     </div>
                   ) : (
                     <div className="relative">
                       <input
                         type="number"
                         value={lbs}
                         onChange={(e) => setLbs(e.target.value)}
                         className="w-full bg-slate-800 border border-white/10 rounded-lg p-2.5 text-sm text-slate-200 outline-none focus:ring-2 focus:ring-orange-500/50 pr-10 h-[44px]"
                         dir="ltr"
                       />
                       <span className="absolute right-3 top-3 text-xs text-slate-500">{t.weightLbs}</span>
                     </div>
                   )}
                 </div>
               </div>

               <div>
                 <label className="block text-sm font-medium text-slate-300 mb-2">{t.activity}</label>
                 <select
                   value={activity}
                   onChange={(e) => setActivity(e.target.value as keyof typeof activityMultipliers)}
                   className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50 appearance-none h-[48px]"
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
                  className="mt-4 flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold transition-all shadow-lg shadow-orange-600/20 active:scale-95"
               >
                 <Target size={18} />
                 {t.calc}
               </button>

            </div>

          </div>

          <div className="flex flex-col gap-4">
             
             {results ? (
                <div className="flex flex-col gap-3 animate-in fade-in zoom-in-95 duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">{t.resultsTitle}</h3>
                  
                  {/* Maintain */}
                  <div className="bg-slate-800/80 border border-white/10 p-4 rounded-xl flex items-center justify-between">
                     <span className="text-sm font-medium text-slate-300">{t.maintain}</span>
                     <div className="flex items-baseline gap-1">
                       <span className="text-xl font-bold text-orange-400">{results.maintain}</span>
                       <span className="text-xs text-slate-500 font-normal">kcal</span>
                     </div>
                  </div>

                  {/* Normal Loss */}
                  <div className="bg-emerald-900/20 border border-emerald-500/30 p-4 rounded-xl flex items-center justify-between">
                     <span className="text-sm font-medium text-emerald-100">{t.normalLoss}</span>
                     <div className="flex items-baseline gap-1">
                       <span className="text-xl font-bold text-emerald-400">{results.normalLoss}</span>
                       <span className="text-xs text-emerald-500/70 font-normal">kcal</span>
                     </div>
                  </div>

                  {/* Mild Loss */}
                  <div className="bg-slate-800/50 border border-white/5 p-3 rounded-xl flex items-center justify-between opacity-80">
                     <span className="text-xs font-medium text-slate-400">{t.mildLoss}</span>
                     <div className="flex items-baseline gap-1">
                       <span className="text-base font-bold text-emerald-300">{results.mildLoss}</span>
                       <span className="text-[10px] text-slate-500 font-normal">kcal</span>
                     </div>
                  </div>

                  {/* Extreme Loss */}
                  <div className="bg-rose-900/10 border border-rose-500/20 p-3 rounded-xl flex items-center justify-between opacity-80">
                     <span className="text-xs font-medium text-slate-400">{t.extremeLoss}</span>
                     <div className="flex items-baseline gap-1">
                       <span className="text-base font-bold text-rose-400">{results.extremeLoss}</span>
                       <span className="text-[10px] text-slate-500 font-normal">kcal</span>
                     </div>
                  </div>

                  {/* Gain */}
                  <div className="bg-sky-900/10 border border-sky-500/20 p-3 rounded-xl flex items-center justify-between opacity-80 mt-2">
                     <span className="text-xs font-medium text-slate-400">{t.gain}</span>
                     <div className="flex items-baseline gap-1">
                       <span className="text-base font-bold text-sky-400">{results.gain}</span>
                       <span className="text-[10px] text-slate-500 font-normal">kcal</span>
                     </div>
                  </div>

                  <div className="mt-4 pt-2 flex justify-center border-t border-white/10 w-full">
                     <ShareButtons
                       text={isAr ? `احتياجي من السعرات:\n🔥 الحفاظ: ${results.maintain} سعرة\n📉 لتخسيس الوزن: ${results.normalLoss} سعرة` : `My Calorie Needs:\n🔥 Maintain: ${results.maintain} kcal\n📉 Weight Loss: ${results.normalLoss} kcal`}
                       lang={lang}
                     />
                  </div>
                </div>
             ) : (
                <div className="flex-1 min-h-[300px] border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-slate-500 bg-slate-900/20 relative">
                   <Target size={48} strokeWidth={1} className="mb-4 opacity-30 text-orange-400" />
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
            <Info size={20} className="text-orange-400"/>
            <h2 className="text-lg font-bold text-orange-400">{t.aboutTitle}</h2>
        </div>
        <div className="space-y-4">
          <p>{t.aboutP1}</p>
        </div>
      </article>

    </div>
  );
}
