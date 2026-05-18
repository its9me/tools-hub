import React, { useState, useMemo } from 'react';
import { HeartPulse, Share2, Info, Activity, Scale, Dumbbell } from 'lucide-react';

const translations = {
  ar: {
    title: "حاسبة التقييم الصحي (BMI/BMR)",
    subtitle: "احسب مؤشر كتلة الجسم والوزن المثالي ومعدل الأيض الأساسي.",
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
    calc: "احسب النتائج",
    bmi: "مؤشر كتلة الجسم (BMI)",
    category: "التصنيف",
    idealWeight: "نطاق الوزن المثالي",
    bmr: "السعرات الحرارية للحفاظ على الوزن (BMR)",
    categories: {
      underweight: "نقص في الوزن",
      normal: "وزن طبيعي",
      overweight: "زيادة في الوزن",
      obese1: "سمنة - الدرجة الأولى",
      obese2: "سمنة - الدرجة الثانية",
      obese3: "سمنة مفرطة"
    },
    shareWhatsapp: "مشاركة النتائج",
    aboutTitle: "عن الحاسبة",
    aboutP1: "توفر هذه الحاسبة المتقدمة تقييماً شاملاً للياقتك البدنية. تقوم بحساب مؤشر كتلة الجسم (BMI) لتحديد ما إذا كان وزنك صحياً، وتوصي بنطاق الوزن المثالي بناءً على طولك. كما تحسب معدل الأيض الأساسي (BMR) لتقدير السعرات التي يحرقها جسمك وقت الراحة.",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)"
  },
  en: {
    title: "Health Assessment Calculator (BMI/BMR)",
    subtitle: "Calculate your Body Mass Index, Ideal Weight and Basal Metabolic Rate.",
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
    calc: "Calculate Results",
    bmi: "Body Mass Index (BMI)",
    category: "Category",
    idealWeight: "Ideal Weight Range",
    bmr: "Maintenance Calories (BMR)",
    categories: {
      underweight: "Underweight",
      normal: "Normal Weight",
      overweight: "Overweight",
      obese1: "Obesity Class 1",
      obese2: "Obesity Class 2",
      obese3: "Severe Obesity"
    },
    shareWhatsapp: "Share Results",
    aboutTitle: "About Calculator",
    aboutP1: "This advanced calculator provides a comprehensive assessment of your physical fitness. It calculates your BMI to determine if you have a healthy weight, recommends an ideal weight range based on your height, and calculates your Basal Metabolic Rate (BMR) to estimate the calories your body burns at rest.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)"
  }
};

export default function BMICalculator({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const [sys, setSys] = useState<'metric'|'imperial'>('metric');
  const [gender, setGender] = useState<'male'|'female'>('male');
  const [age, setAge] = useState<string>('25');
  
  // Metric units
  const [cm, setCm] = useState<string>('175');
  const [kg, setKg] = useState<string>('70');
  
  // Imperial units
  const [ft, setFt] = useState<string>('5');
  const [inch, setInch] = useState<string>('9');
  const [lbs, setLbs] = useState<string>('154');

  const [results, setResults] = useState<{
    bmi: number;
    category: string;
    ideal: string;
    bmr: number;
    color: string;
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

    // BMI
    const heightInM = heightInCm / 100;
    const bmiVal = weightInKg / (heightInM * heightInM);

    // Category
    let catKey: keyof typeof t.categories = "normal";
    let color = "text-emerald-400";
    
    if (bmiVal < 18.5) {
      catKey = "underweight";
      color = "text-sky-400";
    } else if (bmiVal < 25) {
      catKey = "normal";
      color = "text-emerald-400";
    } else if (bmiVal < 30) {
      catKey = "overweight";
      color = "text-amber-400";
    } else if (bmiVal < 35) {
      catKey = "obese1";
      color = "text-orange-500";
    } else if (bmiVal < 40) {
      catKey = "obese2";
      color = "text-rose-500";
    } else {
      catKey = "obese3";
      color = "text-rose-600";
    }

    // Ideal Weight (BMI 18.5 - 24.9)
    const minIdealKg = 18.5 * (heightInM * heightInM);
    const maxIdealKg = 24.9 * (heightInM * heightInM);
    
    let idealRange = '';
    if (sys === 'metric') {
       idealRange = `${Math.round(minIdealKg)} - ${Math.round(maxIdealKg)} ${t.weightKg}`;
    } else {
       const minIdealLbs = minIdealKg * 2.20462;
       const maxIdealLbs = maxIdealKg * 2.20462;
       idealRange = `${Math.round(minIdealLbs)} - ${Math.round(maxIdealLbs)} ${t.weightLbs}`;
    }

    // BMR (Mifflin-St Jeor)
    let bmrVal = (10 * weightInKg) + (6.25 * heightInCm) - (5 * ageNum);
    bmrVal += (gender === 'male') ? 5 : -161;

    setResults({
      bmi: bmiVal,
      category: t.categories[catKey],
      ideal: idealRange,
      bmr: Math.round(bmrVal),
      color
    });
  };

  const generateShareText = () => {
    if (!results) return '';
    let str = isAr ? '*نتائج تقييمي الصحي:*\n\n' : '*My Health Assessment:*\n\n';
    str += `📊 ${t.bmi}: ${results.bmi.toFixed(1)} (${results.category})\n`;
    str += `⚖️ ${t.idealWeight}: ${results.ideal}\n`;
    str += `🔥 ${t.bmr}: ${results.bmr} kcal/day\n`;
    str += isAr ? `\n\nاحسب نتائجك هنا: ` : `\n\nCalculate yours here: `;
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
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="text-center relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <HeartPulse size={32} className="text-white" />
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
                     className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${sys === 'metric' ? 'bg-red-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
                   >
                     {t.metric}
                   </button>
                   <button 
                     onClick={() => { setSys('imperial'); setResults(null); }}
                     className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${sys === 'imperial' ? 'bg-red-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
                   >
                     {t.imperial}
                   </button>
                 </div>
               </div>

               <div>
                 <label className="block text-sm font-medium text-slate-300 mb-2">{t.gender}</label>
                 <div className="flex p-1 bg-slate-800 rounded-xl border border-white/5">
                   <button 
                     onClick={() => setGender('male')}
                     className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${gender === 'male' ? 'bg-slate-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
                   >
                     {t.male}
                   </button>
                   <button 
                     onClick={() => setGender('female')}
                     className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${gender === 'female' ? 'bg-slate-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
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
                   className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-sm text-slate-200 outline-none focus:ring-2 focus:ring-red-500/50"
                 />
               </div>

               <div>
                 <label className="block text-xs font-medium text-slate-400 mb-1">{t.height}</label>
                 {sys === 'metric' ? (
                   <div className="relative">
                     <input
                       type="number"
                       value={cm}
                       onChange={(e) => setCm(e.target.value)}
                       className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-sm text-slate-200 outline-none focus:ring-2 focus:ring-red-500/50 pr-12"
                       dir="ltr"
                     />
                     <span className="absolute right-4 top-3 text-sm text-slate-500">{t.heightCm}</span>
                   </div>
                 ) : (
                   <div className="flex gap-2" dir="ltr">
                     <div className="relative flex-1">
                       <input
                         type="number"
                         value={ft}
                         onChange={(e) => setFt(e.target.value)}
                         className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-sm text-slate-200 outline-none focus:ring-2 focus:ring-red-500/50 pr-10"
                       />
                       <span className="absolute right-3 top-3 text-sm text-slate-500">{t.heightFt}</span>
                     </div>
                     <div className="relative flex-1">
                       <input
                         type="number"
                         value={inch}
                         onChange={(e) => setInch(e.target.value)}
                         className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-sm text-slate-200 outline-none focus:ring-2 focus:ring-red-500/50 pr-10"
                       />
                       <span className="absolute right-3 top-3 text-sm text-slate-500">{t.heightIn}</span>
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
                       className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-sm text-slate-200 outline-none focus:ring-2 focus:ring-red-500/50 pr-12"
                       dir="ltr"
                     />
                     <span className="absolute right-4 top-3 text-sm text-slate-500">{t.weightKg}</span>
                   </div>
                 ) : (
                   <div className="relative">
                     <input
                       type="number"
                       value={lbs}
                       onChange={(e) => setLbs(e.target.value)}
                       className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-sm text-slate-200 outline-none focus:ring-2 focus:ring-red-500/50 pr-12"
                       dir="ltr"
                     />
                     <span className="absolute right-4 top-3 text-sm text-slate-500">{t.weightLbs}</span>
                   </div>
                 )}
               </div>

               <button 
                  onClick={calculate}
                  className="mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold transition-all shadow-lg shadow-red-600/20 active:scale-95"
               >
                 <Activity size={18} />
                 {t.calc}
               </button>

            </div>

          </div>

          <div className="flex flex-col gap-4">
             
             {results ? (
                <>
                  <div className="bg-slate-900/30 border border-white/5 p-6 rounded-2xl flex flex-col items-center justify-center text-center relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-4 opacity-5">
                       <HeartPulse size={120} />
                     </div>
                     <p className="text-slate-400 text-sm font-medium mb-2">{t.bmi}</p>
                     <div className={`text-6xl font-black tracking-tighter ${results.color}`}>
                       {results.bmi.toFixed(1)}
                     </div>
                     <p className={`font-bold mt-2 text-lg ${results.color}`}>{results.category}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="bg-slate-900/20 border border-white/5 p-4 rounded-xl flex flex-col items-center text-center">
                        <Scale size={24} className="text-slate-400 mb-2" />
                        <span className="text-xs text-slate-500 mb-1">{t.idealWeight}</span>
                        <span className="text-sm font-bold text-slate-200">{results.ideal}</span>
                     </div>
                     <div className="bg-slate-900/20 border border-white/5 p-4 rounded-xl flex flex-col items-center text-center">
                        <Dumbbell size={24} className="text-slate-400 mb-2" />
                        <span className="text-xs text-slate-500 mb-1">{t.bmr}</span>
                        <span className="text-sm font-bold text-slate-200">{results.bmr} <span className="text-[10px] font-normal text-slate-500">kcal</span></span>
                     </div>
                  </div>

                  <div className="mt-auto pt-4 flex justify-center">
                    <a
                      href={`https://wa.me/?text=${generateShareText()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm font-bold text-white shadow-lg transition-all border border-white/5 w-full"
                    >
                      <Share2 size={16} />
                      {t.shareWhatsapp}
                    </a>
                  </div>
                </>
             ) : (
                <div className="flex-1 min-h-[300px] border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-slate-500 bg-slate-900/20 relative">
                   <HeartPulse size={48} strokeWidth={1} className="mb-4 opacity-30" />
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
            <Info size={20} className="text-red-400"/>
            <h2 className="text-lg font-bold text-red-400">{t.aboutTitle}</h2>
        </div>
        <div className="space-y-4">
          <p>{t.aboutP1}</p>
        </div>
      </article>

    </div>
  );
}
