import React, { useState, useMemo, useEffect } from 'react';
import { Calculator, Share2, Gem, Info } from 'lucide-react';

const currencies = [
  { id: 'IQD', nameAr: 'دينار عراقي', nameEn: 'Iraqi Dinar', symbol: 'ع.د', defaultPrc: 105000 },
  { id: 'SAR', nameAr: 'ريال سعودي', nameEn: 'Saudi Riyal', symbol: 'ر.س', defaultPrc: 300 },
  { id: 'EGP', nameAr: 'جنيه مصري', nameEn: 'Egyptian Pound', symbol: 'ج.م', defaultPrc: 3800 },
  { id: 'AED', nameAr: 'درهم إماراتي', nameEn: 'UAE Dirham', symbol: 'د.إ', defaultPrc: 295 },
  { id: 'JOD', nameAr: 'دينار أردني', nameEn: 'Jordanian Dinar', symbol: 'د.أ', defaultPrc: 56 },
  { id: 'USD', nameAr: 'دولار أمريكي', nameEn: 'US Dollar', symbol: '$', defaultPrc: 80 },
];

const karats = [
  { id: '24', nameAr: 'عيار 24', nameEn: '24 Karat', purity: 1.0 },
  { id: '22', nameAr: 'عيار 22', nameEn: '22 Karat', purity: 22/24 },
  { id: '21', nameAr: 'عيار 21', nameEn: '21 Karat', purity: 21/24 },
  { id: '18', nameAr: 'عيار 18', nameEn: '18 Karat', purity: 18/24 },
];

const translations = {
  ar: {
    title: "حاسبة أسعار الذهب والمصنعية",
    subtitle: "احسب التكلفة النهائية للذهب المشغول شاملة المصنعية والضريبة.",
    currency: "العملة",
    karat: "عيار الذهب",
    gramPrice: "سعر الجرام اليوم",
    weight: "الوزن (بالجرام)",
    workmanshipType: "حساب المصنعية",
    perGram: "لكل جرام",
    total: "إجمالي",
    workmanshipCost: "تكلفة المصنعية",
    taxRate: "نسبة الضريبة (%)",
    calculate: "احسب",
    goldValue: "قيمة الذهب الخالص",
    totalWorkmanship: "إجمالي المصنعية",
    taxValue: "قيمة الضريبة",
    finalPrice: "السعر النهائي",
    shareWhatsapp: "مشاركة عبر واتساب",
    aboutTitle: "كيف تُحسب أسعار الذهب المشغول؟",
    aboutP1: "سعر الذهب المشغول في المتاجر لا يعتمد فقط على السعر العالمي للذهب، بل يضاف إليه تكلفة صناعة وتشكيل القطعة الذهبية (المصنعية) والضرائب المقررة.",
    aboutH1: "شرح مبسط للمصطلحات:",
    list1: "سعر الجرام: سعر الذهب الخام حسب العيار اليوم.",
    list2: "المصنعية: أجرة الصائغ وتكلفة تصنيع القطعة الذهبية، وتختلف حسب تعقيد التصميم والماركة.",
    list3: "الضريبة: بعض الدول تفرض ضريبة قيمة مضافة (VAT) على الذهب أو على المصنعية فقط (لتبسيط الحساب هنا، الضريبة تُحسب على الإجمالي).",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)"
  },
  en: {
    title: "Gold Jewelry Calculator",
    subtitle: "Calculate the final cost of gold jewelry including workmanship and tax.",
    currency: "Currency",
    karat: "Gold Karat",
    gramPrice: "Today's Gram Price",
    weight: "Weight (grams)",
    workmanshipType: "Workmanship Calculation",
    perGram: "Per Gram",
    total: "Total Amount",
    workmanshipCost: "Workmanship Cost",
    taxRate: "Tax Rate (%)",
    calculate: "Calculate",
    goldValue: "Pure Gold Value",
    totalWorkmanship: "Total Workmanship",
    taxValue: "Tax Amount",
    finalPrice: "Final Price",
    shareWhatsapp: "Share via WhatsApp",
    aboutTitle: "How is Jewelry Price Calculated?",
    aboutP1: "The price of gold jewelry at the store depends not only on the global gold price, but also includes the cost of crafting the piece (workmanship) and applicable taxes.",
    aboutH1: "Simple explanation:",
    list1: "Gram Price: The raw gold price per karat today.",
    list2: "Workmanship: The jeweler's fee and crafting cost. It varies by design complexity and brand.",
    list3: "Tax: Some countries apply a Value Added Tax (VAT) on the total or just the workmanship.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)"
  }
};

export default function GoldJewelryCalculator({ lang }: { lang: 'ar' | 'en' }) {
  const [currencyId, setCurrencyId] = useState('IQD');
  const [karatId, setKaratId] = useState('21');
  const [gramPrice, setGramPrice] = useState<number | ''>('');
  const [weight, setWeight] = useState<number | ''>('');
  
  const [workType, setWorkType] = useState<'per_gram' | 'total'>('per_gram');
  const [workmanship, setWorkmanship] = useState<number | ''>('');
  const [taxRate, setTaxRate] = useState<number | ''>(0); // 0, 5, 15 etc.

  const t = translations[lang];
  const isAr = lang === 'ar';

  const selectedCurrency = useMemo(() => currencies.find(c => c.id === currencyId) || currencies[0], [currencyId]);

  // Adjust default price purely based on currency selection as a basic default
  useEffect(() => {
     const kInfo = karats.find(k => k.id === karatId) || karats[2];
     // 24k default price = selectedCurrency.defaultPrc
     const approxPrice = selectedCurrency.defaultPrc * kInfo.purity;
     setGramPrice(Math.round(approxPrice * 10) / 10);
  }, [currencyId, karatId, selectedCurrency]);

  const results = useMemo(() => {
    let p = Number(gramPrice) || 0;
    let w = Number(weight) || 0;
    let wm = Number(workmanship) || 0;
    let tr = (Number(taxRate) || 0) / 100;

    const baseGoldValue = p * w;
    const totalWorkmanship = workType === 'per_gram' ? wm * w : wm;
    
    // Total subject to tax
    const subtotal = baseGoldValue + totalWorkmanship;
    const taxValue = subtotal * tr;
    
    const finalPrice = subtotal + taxValue;

    return {
      baseGoldValue,
      totalWorkmanship,
      taxValue,
      finalPrice
    };
  }, [gramPrice, weight, workType, workmanship, taxRate]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
    }).format(val);
  };

  const shareText = encodeURIComponent(
    isAr 
      ? `لقد استخدمت حاسبة الذهب والمصنعية لمعرفة السعر العادل للذهب!\nالسعر النهائي: ${formatCurrency(results.finalPrice)} ${selectedCurrency.symbol}\nجرب الحاسبة: `
      : `I just used the Gold Jewelry Calculator to find the fair price!\nFinal Price: ${formatCurrency(results.finalPrice)} ${selectedCurrency.symbol}\nTry it: `
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
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="text-center relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <Gem size={32} className="text-white" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
          
          {/* Input Panel */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4">
               <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{t.currency}</label>
                <select
                  value={currencyId}
                  onChange={(e) => setCurrencyId(e.target.value)}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                  dir={isAr ? 'rtl' : 'ltr'}
                >
                  {currencies.map(c => (
                    <option key={c.id} value={c.id}>{isAr ? c.nameAr : c.nameEn} ({c.symbol})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{t.karat}</label>
                <select
                  value={karatId}
                  onChange={(e) => setKaratId(e.target.value)}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                  dir={isAr ? 'rtl' : 'ltr'}
                >
                  {karats.map(k => (
                    <option key={k.id} value={k.id}>{isAr ? k.nameAr : k.nameEn}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">{t.gramPrice}</label>
                  <div className="relative">
                    <div className={`absolute inset-y-0 ${isAr ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center pointer-events-none text-slate-500 text-xs`}>
                     {selectedCurrency.symbol}
                    </div>
                    <input
                      type="number"
                      value={gramPrice}
                      onChange={(e) => setGramPrice(e.target.value ? Number(e.target.value) : '')}
                      className={`w-full bg-slate-900/50 border border-white/10 rounded-xl p-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 ${isAr ? 'pl-10' : 'pr-10'}`}
                    />
                  </div>
               </div>
               <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">{t.weight}</label>
                  <div className="relative">
                    <div className={`absolute inset-y-0 ${isAr ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center pointer-events-none text-slate-500 text-xs`}>
                     g
                    </div>
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value ? Number(e.target.value) : '')}
                      className={`w-full bg-slate-900/50 border border-white/10 rounded-xl p-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 ${isAr ? 'pl-10' : 'pr-10'}`}
                      placeholder="10.5"
                    />
                  </div>
               </div>
            </div>

            <div className="bg-slate-800/30 p-4 rounded-xl border border-white/5 space-y-4">
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-slate-200">{t.workmanshipCost}</label>
                    <div className="flex gap-1 p-1 bg-slate-900/80 rounded-lg text-xs">
                        <button onClick={()=>setWorkType('per_gram')} className={`px-3 py-1.5 rounded-md transition-colors ${workType==='per_gram' ? 'bg-yellow-500/20 text-yellow-400 font-bold' : 'text-slate-400'}`}>{t.perGram}</button>
                        <button onClick={()=>setWorkType('total')} className={`px-3 py-1.5 rounded-md transition-colors ${workType==='total' ? 'bg-yellow-500/20 text-yellow-400 font-bold' : 'text-slate-400'}`}>{t.total}</button>
                    </div>
                </div>
                <div className="relative">
                    <div className={`absolute inset-y-0 ${isAr ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center pointer-events-none text-slate-500 text-xs`}>
                     {selectedCurrency.symbol}
                    </div>
                    <input
                      type="number"
                      value={workmanship}
                      onChange={(e) => setWorkmanship(e.target.value ? Number(e.target.value) : '')}
                      className={`w-full bg-slate-900/50 border border-white/10 rounded-xl p-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 ${isAr ? 'pl-10' : 'pr-10'}`}
                      placeholder="5000"
                    />
                </div>
            </div>

             <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{t.taxRate}</label>
                <div className="relative">
                <div className={`absolute inset-y-0 ${isAr ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center pointer-events-none text-slate-500 text-xs`}>
                    %
                </div>
                <input
                    type="number"
                    value={taxRate}
                    onChange={(e) => setTaxRate(e.target.value ? Number(e.target.value) : '')}
                    className={`w-full bg-slate-900/50 border border-white/10 rounded-xl p-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 ${isAr ? 'pl-8' : 'pr-8'}`}
                    placeholder="0"
                />
                </div>
            </div>
          </div>

          {/* Result Panel */}
          <div className="lg:col-span-5 bg-slate-900/60 border border-yellow-500/10 rounded-2xl p-6 shadow-inner flex flex-col justify-between gap-6 relative overflow-hidden">
             
            <div>
              <p className="text-slate-400 text-sm font-medium mb-2 text-center">{t.finalPrice}</p>
              <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2 text-center">
                {formatCurrency(results.finalPrice)}
              </div>
              <p className="text-emerald-500 text-sm text-center">{selectedCurrency.symbol}</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                <span className="text-slate-400">{t.goldValue}</span>
                <span className="text-slate-200 font-semibold">{formatCurrency(results.baseGoldValue)}</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                <span className="text-slate-400">{t.totalWorkmanship}</span>
                <span className="text-yellow-400/80 font-semibold">{formatCurrency(results.totalWorkmanship)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">{t.taxValue} ({taxRate || 0}%)</span>
                <span className="text-rose-400/80 font-semibold">{formatCurrency(results.taxValue)}</span>
              </div>
            </div>

            {results.finalPrice > 0 && (
              <div className="mt-4 flex justify-center">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full gap-2 px-6 py-3 bg-yellow-600 hover:bg-yellow-500 rounded-xl text-sm font-bold text-slate-900 shadow-lg shadow-yellow-600/20 transition-all active:scale-95"
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
            <Info size={20} className="text-yellow-400"/>
            <h2 className="text-lg font-bold text-yellow-400">{t.aboutTitle}</h2>
        </div>
        <div className="space-y-4">
          <p>{t.aboutP1}</p>
          <h3 className="text-base font-bold text-emerald-300 mt-4">{t.aboutH1}</h3>
          <ul className="list-disc list-inside space-y-2 mx-4 text-slate-400">
            <li><strong className="text-slate-300">{t.list1.split(':')[0]}:</strong> {t.list1.split(':')[1]}</li>
            <li><strong className="text-slate-300">{t.list2.split(':')[0]}:</strong> {t.list2.split(':')[1]}</li>
            <li><strong className="text-slate-300">{t.list3.split(':')[0]}:</strong> {t.list3.split(':')[1]}</li>
          </ul>
        </div>
      </article>
    </div>
  );
}
