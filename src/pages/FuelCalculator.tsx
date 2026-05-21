import React, { useState } from 'react';
import { Share2, Info, Fuel, Car, Navigation, DollarSign, Activity, AlertCircle, BarChart } from 'lucide-react';

const translations = {
  ar: {
    title: "حاسبة استهلاك وقود السيارات",
    subtitle: "احسب معدل استهلاك سيارتك للوقود وتكلفة الكيلومتر الواحد لتقييم كفاءتها.",
    distance: "المسافة المقطوعة (كم)",
    fuelVolume: "كمية الوقود المستهلكة (لتر)",
    fuelPrice: "سعر لتر الوقود",
    calculate: "حساب الاستهلاك",
    results: "تحليل الاستهلاك",
    rate: "معدل الاستهلاك",
    rateUnit: "لتر / 100 كم",
    cost: "تكلفة الكيلومتر الواحد",
    costUnit: "عملة / كم",
    distancePerLiter: "المسافة لكل لتر",
    distanceUnit: "كم / لتر",
    comparison: "مقارنة الاستهلاك",
    excellent: "ممتاز (اقتصادي جداً: أقل من 6 لتر/100كم)",
    good: "جيد (متوسط: 6 - 9 لتر/100كم)",
    high: "مرتفع (فوق المتوسط: 9 - 13 لتر/100كم)",
    veryHigh: "مرتفع جداً (غير اقتصادي: أكثر من 13 لتر/100كم)",
    shareWhatsapp: "مشاركة الأداة",
    aboutTitle: "عن الأداة",
    aboutP1: "أداة تساعدك على معرفة مدى كفاءة استهلاك سيارتك للوقود. من خلال إدخال المسافة وسعر وكمية الوقود، يتم حساب معدل الاستهلاك القياسي (لتر لكل 100 كم) بالإضافة إلى تكلفة الكيلومتر الواحد، مما يساعدك على إدارة ميزانيتك ومقارنة أداء سيارتك مع المعايير العامة للاقتصاد في الوقود.",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)"
  },
  en: {
    title: "Car Fuel Economy Calculator",
    subtitle: "Calculate your car's fuel consumption rate and cost per kilometer to evaluate its efficiency.",
    distance: "Distance Traveled (km)",
    fuelVolume: "Fuel Consumed (Liters)",
    fuelPrice: "Fuel Price (per Liter)",
    calculate: "Calculate",
    results: "Consumption Analysis",
    rate: "Consumption Rate",
    rateUnit: "Liters / 100 km",
    cost: "Cost per Kilometer",
    costUnit: "per km",
    distancePerLiter: "Distance per Liter",
    distanceUnit: "km / Liter",
    comparison: "Efficiency Comparison",
    excellent: "Excellent (Very Economy: < 6 L/100km)",
    good: "Good (Average: 6 - 9 L/100km)",
    high: "High (Above Average: 9 - 13 L/100km)",
    veryHigh: "Very High (Not Economy: > 13 L/100km)",
    shareWhatsapp: "Share Tool",
    aboutTitle: "About The Tool",
    aboutP1: "A tool to help you find out how fuel-efficient your car is. By entering the distance, fuel quantity, and price, it calculates the standard consumption rate (liters per 100 km) and the cost per kilometer. This helps you manage your budget and compare your car's performance against standard fuel economy benchmarks.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)"
  }
};

export default function FuelCalculator({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const [distance, setDistance] = useState<string>('300');
  const [fuelVolume, setFuelVolume] = useState<string>('25');
  const [fuelPrice, setFuelPrice] = useState<string>('1.5');

  const dist = parseFloat(distance) || 0;
  const vol = parseFloat(fuelVolume) || 0;
  const price = parseFloat(fuelPrice) || 0;

  let ratePer100 = 0;
  let kmPerLiter = 0;
  let costPerKm = 0;

  if (dist > 0 && vol > 0) {
    ratePer100 = (vol / dist) * 100;
    kmPerLiter = dist / vol;
    costPerKm = (vol * price) / dist;
  }

  const getEfficiencyStatus = (rate: number) => {
    if (rate <= 0.1) return null;
    if (rate < 6) return { text: t.excellent, color: 'text-emerald-400', bg: 'bg-emerald-500/20', bar: 'bg-emerald-500', width: '25%' };
    if (rate <= 9) return { text: t.good, color: 'text-teal-400', bg: 'bg-teal-500/20', bar: 'bg-teal-500', width: '50%' };
    if (rate <= 13) return { text: t.high, color: 'text-orange-400', bg: 'bg-orange-500/20', bar: 'bg-orange-500', width: '75%' };
    return { text: t.veryHigh, color: 'text-red-400', bg: 'bg-red-500/20', bar: 'bg-red-500', width: '100%' };
  };

  const status = getEfficiencyStatus(ratePer100);

  const generateShareText = () => {
    let str = isAr ? '*حاسبة استهلاك وقود السيارات:*\n\n' : '*Car Fuel Economy Calculator:*\n\n';
    str += isAr ? `اكتشف معدل استهلاك سيارتك وتكلفة الكيلومتر الواحد.\n\nجربها هنا: ` : `Discover your car's fuel consumption and cost per km.\n\nTry it here: `;
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
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-rose-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="text-center relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-red-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg text-white">
            <Fuel size={32} />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">{t.subtitle}</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 relative z-10">
          
          {/* Inputs section */}
          <div className="flex-[4] flex flex-col gap-5 bg-slate-900/50 p-6 rounded-2xl border border-white/5 shadow-inner">
             <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-300">{t.distance}</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      min="0"
                      step="1"
                      value={distance} 
                      onChange={(e) => setDistance(e.target.value)} 
                      className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 pl-10 text-white outline-none focus:ring-2 focus:ring-rose-500/50 transition-all font-mono"
                      dir="ltr"
                    />
                    <Navigation size={16} className="absolute left-3 top-3.5 text-slate-500" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-300">{t.fuelVolume}</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      min="0"
                      step="0.1"
                      value={fuelVolume} 
                      onChange={(e) => setFuelVolume(e.target.value)} 
                      className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 pl-10 text-white outline-none focus:ring-2 focus:ring-rose-500/50 transition-all font-mono"
                      dir="ltr"
                    />
                    <Fuel size={16} className="absolute left-3 top-3.5 text-slate-500" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-300">{t.fuelPrice}</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      min="0"
                      step="0.01"
                      value={fuelPrice} 
                      onChange={(e) => setFuelPrice(e.target.value)} 
                      className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 pl-10 text-white outline-none focus:ring-2 focus:ring-rose-500/50 transition-all font-mono"
                      dir="ltr"
                    />
                    <DollarSign size={16} className="absolute left-3 top-3.5 text-slate-500" />
                  </div>
                </div>
             </div>
          </div>

          {/* Results section */}
          <div className="flex-[5] flex flex-col gap-4">
             <h3 className="text-lg font-bold text-slate-200 mb-2">{t.results}</h3>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="p-5 bg-gradient-to-br from-rose-500/10 to-red-600/10 rounded-2xl border border-rose-500/20 flex flex-col gap-2 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 opacity-10">
                      <Fuel size={60} />
                    </div>
                    <div className="flex items-center gap-2 text-rose-400 mb-1 z-10">
                       <Activity size={18} />
                       <span className="text-sm font-bold">{t.rate}</span>
                    </div>
                    <div className="z-10">
                       <span className="text-3xl font-bold text-rose-400 tracking-wider font-mono">
                         {ratePer100 > 0 ? ratePer100.toFixed(1) : '0.0'}
                       </span>
                       <span className="text-xs text-rose-400/70 ml-1">{t.rateUnit}</span>
                    </div>
                 </div>

                 <div className="p-5 bg-gradient-to-br from-indigo-500/10 to-blue-600/10 rounded-2xl border border-indigo-500/20 flex flex-col gap-2 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 opacity-10">
                      <DollarSign size={60} />
                    </div>
                    <div className="flex items-center gap-2 text-indigo-400 mb-1 z-10">
                       <DollarSign size={18} />
                       <span className="text-sm font-bold">{t.cost}</span>
                    </div>
                    <div className="z-10">
                       <span className="text-3xl font-bold text-indigo-400 tracking-wider font-mono">
                         {costPerKm > 0 ? costPerKm.toFixed(2) : '0.00'}
                       </span>
                       <span className="text-xs text-indigo-400/70 ml-1">{t.costUnit}</span>
                    </div>
                 </div>
             </div>

             <div className="p-4 bg-slate-900/50 rounded-2xl border border-white/5 flex flex-col gap-3 shadow-inner">
                <div className="flex justify-between items-center text-sm">
                   <span className="text-slate-400 flex items-center gap-2"><Navigation size={14}/> {t.distancePerLiter}</span>
                   <span className="font-mono text-slate-200 font-bold">{kmPerLiter > 0 ? kmPerLiter.toFixed(1) : '0.0'} {t.distanceUnit}</span>
                </div>
             </div>

             {/* Efficiency Visualization */}
             {status && (
               <div className="p-5 bg-slate-800/80 rounded-2xl border border-white/5 flex flex-col gap-3 relative overflow-hidden">
                  <div className="flex items-center gap-2 text-slate-300 font-bold text-sm mb-1">
                     <BarChart size={18} className="text-slate-400"/>
                     {t.comparison}
                  </div>
                  
                  <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden flex shadow-inner">
                     <div className={`h-full ${status.bar} transition-all duration-1000 ease-out`} style={{ width: status.width }}></div>
                  </div>
                  
                  <div className={`flex items-start gap-2 mt-2 px-3 py-2 rounded-lg ${status.bg} border border-white/5`}>
                     <AlertCircle size={16} className={`mt-0.5 ${status.color}`} />
                     <p className={`text-sm font-bold ${status.color}`}>
                        {status.text}
                     </p>
                  </div>
               </div>
             )}

          </div>

        </div>
        
        <div className="hidden md:flex justify-center pt-4 relative z-10 w-full mt-2">
            <a
              href={`https://wa.me/?text=${generateShareText()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm font-bold text-white shadow-lg transition-all border border-white/10"
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
            <Info size={20} className="text-rose-400"/>
            <h2 className="text-lg font-bold text-rose-400">{t.aboutTitle}</h2>
        </div>
        <div className="space-y-4">
          <p>{t.aboutP1}</p>
        </div>
      </article>

    </div>
  );
}
