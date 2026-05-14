import React, { useState, useMemo } from 'react';
import { Calculator, Share2, TrendingDown, Info } from 'lucide-react';

const presetRates = [
  { id: 'custom', nameAr: 'مخصص', nameEn: 'Custom Rate', rate: 3 },
  { id: 'US', nameAr: 'أمريكا (متوسط 3%)', nameEn: 'USA (Avg 3%)', rate: 3 },
  { id: 'UK', nameAr: 'بريطانيا (متوسط 2.5%)', nameEn: 'UK (Avg 2.5%)', rate: 2.5 },
  { id: 'EU', nameAr: 'منطقة اليورو (متوسط 2%)', nameEn: 'Eurozone (Avg 2%)', rate: 2 },
  { id: 'IQ', nameAr: 'العراق (متوسط 4%)', nameEn: 'Iraq (Avg 4%)', rate: 4 },
  { id: 'EG', nameAr: 'مصر (متوسط 15%)', nameEn: 'Egypt (Avg 15%)', rate: 15 },
  { id: 'SA', nameAr: 'السعودية (متوسط 2%)', nameEn: 'Saudi Arabia (Avg 2%)', rate: 2 },
];

const translations = {
  ar: {
    title: "حاسبة التضخم",
    subtitle: "احسب تأثير التضخم على القوة الشرائية لأموالك مع مرور الوقت.",
    amount: "المبلغ",
    startYear: "سنة البداية",
    endYear: "سنة النهاية (أو السنة الحالية)",
    inflationRate: "متوسط معدل التضخم السنوي (%)",
    presets: "معدلات تضخم تقديرية",
    calculate: "احسب",
    futureValueTitle: "القيمة المعادلة لشرائها اليوم",
    futureValueDesc: "مبلغ التكلفة في سنة النهاية للحصول على نفس القوة الشرائية لسنة البداية.",
    purchasingPowerTitle: "انخفاض القوة الشرائية",
    purchasingPowerDesc: "ما يعادله المبلغ الأصلي في سنة النهاية من قوة شرائية فعلية.",
    lossText: "نسبة فقدان القيمة",
    shareWhatsapp: "مشاركة عبر واتساب",
    aboutTitle: "ما هو التضخم السنوي؟",
    aboutP1: "التضخم هو الارتفاع المستمر في المستوى العام لأسعار السلع والخدمات، مما يؤدي إلى انخفاض القوة الشرائية للعملة مع مرور الوقت. هذه الحاسبة توضح لك كم تحتاج من المال اليوم لشراء نفس ما كنت تشتريه في الماضي، أو العكس.",
    aboutH1: "أمثلة لنتائج الحاسبة:",
    list1: "القيمة المعادلة: إذا كانت السلعة تكلف 100$ في الماضي، فكم ستكلف اليوم بفعل التضخم.",
    list2: "القوة الشرائية: الـ 100$ التي كسبتها في الماضي، كم تساوي قوتها الشرائية الفعلية اليوم.",
    note: "تنويه: الأرقام الناتجة مبنية على معدل تضخم ثابت ومبسط، في حين أن نسب التضخم الحقيقية تتغير من سنة لأخرى حسب المؤشرات الاقتصادية (CPI).",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)"
  },
  en: {
    title: "Inflation Calculator",
    subtitle: "Calculate how inflation affects the purchasing power of your money over time.",
    amount: "Amount",
    startYear: "Start Year",
    endYear: "End Year (or current)",
    inflationRate: "Average Annual Inflation Rate (%)",
    presets: "Estimated Inflation Rates",
    calculate: "Calculate",
    futureValueTitle: "Equivalent Cost Today",
    futureValueDesc: "How much you need in the end year to buy what the amount bought in the start year.",
    purchasingPowerTitle: "Purchasing Power Decline",
    purchasingPowerDesc: "The actual purchasing power of the original amount in the end year.",
    lossText: "Value Loss Percentage",
    shareWhatsapp: "Share via WhatsApp",
    aboutTitle: "What is Annual Inflation?",
    aboutP1: "Inflation is the general increase in prices and fall in the purchasing value of money. This calculator shows you how much money you need today to match the buying power of the past.",
    aboutH1: "Understanding the results:",
    list1: "Equivalent Cost: If an item cost $100 in the past, how much it costs today due to inflation.",
    list2: "Purchasing Power: Your $100 from the past, what is its actual buying power today.",
    note: "Note: Results are based on a simplified fixed average inflation rate. In reality, historical inflation rates fluctuate yearly based on the Consumer Price Index (CPI).",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)"
  }
};

export default function InflationCalculator({ lang }: { lang: 'ar' | 'en' }) {
  const currentYear = new Date().getFullYear();
  const [amount, setAmount] = useState<number | ''>(100);
  const [startYear, setStartYear] = useState<number | ''>(2014);
  const [endYear, setEndYear] = useState<number | ''>(currentYear);
  const [rate, setRate] = useState<number | ''>(3);
  const [preset, setPreset] = useState('US');

  const t = translations[lang];
  const isAr = lang === 'ar';

  const handlePresetChange = (val: string) => {
    setPreset(val);
    const found = presetRates.find(p => p.id === val);
    if (found && found.id !== 'custom') {
      setRate(found.rate);
    }
  };

  const results = useMemo(() => {
    let p = Number(amount) || 0;
    let sy = Number(startYear) || 2000;
    let ey = Number(endYear) || currentYear;
    let r = (Number(rate) || 0) / 100;

    let years = ey - sy;
    if (years < 0) years = 0;

    // How much it costs in End Year to buy what `p` bought in Start Year
    const futureEquivalent = p * Math.pow(1 + r, years);

    // How much purchasing power `p` stored from Start Year has in End Year
    const purchasingPower = p / Math.pow(1 + r, years);

    let lossPercent = 0;
    if (p > 0) {
        lossPercent = ((p - purchasingPower) / p) * 100;
    }

    return {
      futureEquivalent,
      purchasingPower,
      lossPercent,
      years
    };
  }, [amount, startYear, endYear, rate]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
    }).format(val);
  };

  const shareText = encodeURIComponent(
    isAr 
      ? `شاهد كيف أثر التضخم على القوة الشرائية!\nقيمة ${amount} في سنة ${startYear} تعادل ${formatCurrency(results.futureEquivalent)} في سنة ${endYear}!\nجرب حاسبة التضخم: `
      : `See how inflation eats your money!\n${amount} in ${startYear} is equivalent to ${formatCurrency(results.futureEquivalent)} in ${endYear}!\nTry the inflation calculator: `
  );
  const whatsappUrl = `https://wa.me/?text=${shareText}${encodeURIComponent(window.location.href)}`;

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      {/* Placeholder: Top AdSense */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm">
        <div className="text-[10px] uppercase tracking-widest mb-1">{t.adTop}</div>
        <p className="text-[10px]">{t.adTopDesc}</p>
      </div>

      <section className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl flex flex-col gap-6 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-rose-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="text-center relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-red-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <TrendingDown size={32} className="text-white" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
          
          {/* Input Panel */}
          <div className="flex flex-col gap-5">
            <div>
               <label className="block text-sm font-medium text-slate-300 mb-2">{t.amount}</label>
               <input
                 type="number"
                 value={amount}
                 onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : '')}
                 className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                 placeholder="100"
               />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">{t.startYear}</label>
                  <input
                    type="number"
                    value={startYear}
                    onChange={(e) => setStartYear(e.target.value ? Number(e.target.value) : '')}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                  />
               </div>
               <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">{t.endYear}</label>
                  <input
                    type="number"
                    value={endYear}
                    onChange={(e) => setEndYear(e.target.value ? Number(e.target.value) : '')}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                  />
               </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{t.presets}</label>
                <select
                  value={preset}
                  onChange={(e) => handlePresetChange(e.target.value)}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/50 mb-3"
                  dir={isAr ? 'rtl' : 'ltr'}
                >
                  {presetRates.map(p => (
                    <option key={p.id} value={p.id}>{isAr ? p.nameAr : p.nameEn}</option>
                  ))}
                </select>
            </div>

            <div className={`${preset !== 'custom' ? 'opacity-50' : ''}`}>
                <label className="block text-sm font-medium text-slate-300 mb-2">{t.inflationRate}</label>
                <div className="relative">
                <div className={`absolute inset-y-0 ${isAr ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center pointer-events-none text-slate-500 text-xs`}>
                    %
                </div>
                <input
                    type="number"
                    step="0.1"
                    value={rate}
                    onChange={(e) => {
                        setRate(e.target.value ? Number(e.target.value) : '');
                        setPreset('custom');
                    }}
                    className={`w-full bg-slate-900/50 border border-white/10 rounded-xl p-3 text-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-500/50 ${isAr ? 'pl-8' : 'pr-8'}`}
                    placeholder="3.0"
                />
                </div>
            </div>
          </div>

          {/* Result Panel */}
          <div className="bg-slate-900/60 border border-rose-500/10 rounded-2xl p-6 shadow-inner flex flex-col justify-center gap-6 relative overflow-hidden">
             
            <div>
              <p className="text-slate-400 text-sm font-medium mb-2 text-center">{t.futureValueTitle}</p>
              <div className="text-4xl md:text-5xl font-bold text-rose-400 mb-2 text-center">
                {formatCurrency(results.futureEquivalent)}
              </div>
              <p className="text-slate-500 text-xs text-center px-4">{t.futureValueDesc}</p>
            </div>

            <div className="h-px bg-white/5 w-full my-1"></div>

            <div>
              <p className="text-slate-400 text-sm font-medium mb-2 text-center">{t.purchasingPowerTitle}</p>
              <div className="text-2xl font-bold text-orange-400 mb-2 text-center">
                {formatCurrency(results.purchasingPower)}
              </div>
              <p className="text-slate-500 text-xs text-center px-4">{t.purchasingPowerDesc}</p>
            </div>

            <div className="bg-rose-950/20 border border-rose-900/30 rounded-xl p-3 text-center">
                <span className="text-sm text-slate-400">{t.lossText}: </span>
                <span className="text-rose-400 font-bold">{results.lossPercent.toFixed(1)}%</span>
            </div>

            {results.futureEquivalent > 0 && (
              <div className="mt-2 flex justify-center">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-500 rounded-xl text-sm font-bold text-slate-100 shadow-lg shadow-rose-600/20 transition-all active:scale-95"
                >
                  <Share2 size={18} />
                  {t.shareWhatsapp}
                </a>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Placeholder: Middle AdSense */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm my-2">
        <div className="text-[10px] uppercase tracking-widest mb-1">{t.adMiddle}</div>
        <p className="text-[10px]">{t.adMiddleDesc}</p>
      </div>

      {/* About Section */}
      <article className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col gap-4 text-[13px] text-slate-300 leading-relaxed shadow-lg">
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-2">
            <Info size={20} className="text-rose-400"/>
            <h2 className="text-lg font-bold text-rose-400">{t.aboutTitle}</h2>
        </div>
        <div className="space-y-4">
          <p>{t.aboutP1}</p>
          <h3 className="text-base font-bold text-emerald-300 mt-4">{t.aboutH1}</h3>
          <ul className="list-disc list-inside space-y-2 mx-4 text-slate-400">
            <li><strong className="text-slate-300">{t.list1.split(':')[0]}:</strong> {t.list1.split(':')[1]}</li>
            <li><strong className="text-slate-300">{t.list2.split(':')[0]}:</strong> {t.list2.split(':')[1]}</li>
          </ul>
          <div className="mt-6 p-4 bg-rose-900/20 border border-rose-500/20 rounded-xl text-rose-200/80 italic">
            {t.note}
          </div>
        </div>
      </article>
    </div>
  );
}
