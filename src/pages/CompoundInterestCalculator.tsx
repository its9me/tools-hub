import React, { useState, useMemo, useEffect } from 'react';
import { Calculator, Share2, TrendingUp, PiggyBank } from 'lucide-react';

const countries = [
  { id: 'IQ', nameAr: 'العراق', nameEn: 'Iraq', currencyAr: 'دينار', currencyEn: 'IQD', defaultRate: 8 },
  { id: 'SA', nameAr: 'السعودية', nameEn: 'Saudi Arabia', currencyAr: 'ريال', currencyEn: 'SAR', defaultRate: 3.5 },
  { id: 'EG', nameAr: 'مصر', nameEn: 'Egypt', currencyAr: 'جنيه', currencyEn: 'EGP', defaultRate: 15 },
  { id: 'AE', nameAr: 'الإمارات', nameEn: 'UAE', currencyAr: 'درهم', currencyEn: 'AED', defaultRate: 4 },
  { id: 'JO', nameAr: 'الأردن', nameEn: 'Jordan', currencyAr: 'دينار', currencyEn: 'JOD', defaultRate: 7 },
  { id: 'US', nameAr: 'أمريكا', nameEn: 'USA', currencyAr: 'دولار', currencyEn: 'USD', defaultRate: 5 },
  { id: 'UK', nameAr: 'بريطانيا', nameEn: 'UK', currencyAr: 'جنيه إسترليني', currencyEn: 'GBP', defaultRate: 5 },
  { id: 'CA', nameAr: 'كندا', nameEn: 'Canada', currencyAr: 'دولار كندي', currencyEn: 'CAD', defaultRate: 4.5 },
  { id: 'AU', nameAr: 'أستراليا', nameEn: 'Australia', currencyAr: 'دولار أسترالي', currencyEn: 'AUD', defaultRate: 4.5 },
  { id: 'DE', nameAr: 'ألمانيا', nameEn: 'Germany', currencyAr: 'يورو', currencyEn: 'EUR', defaultRate: 3.5 },
  { id: 'FR', nameAr: 'فرنسا', nameEn: 'France', currencyAr: 'يورو', currencyEn: 'EUR', defaultRate: 3 },
];

const translations = {
  ar: {
    title: "حاسبة الفائدة المركبة",
    subtitle: "احسب نمو مدخراتك واستثماراتك مع مرور الوقت باستخدام الفائدة المركبة.",
    country: "العملة",
    initialAmount: "المبلغ الأولي (رأس المال)",
    monthlyContribution: "المساهمة الشهرية (إيداع دوري)",
    interestRate: "نسبة الفائدة السنوية المتوقعة (%)",
    years: "مدة الاستثمار (بالسنوات)",
    calculate: "احسب العائد",
    futureValue: "القيمة المستقبلية للمدخرات",
    totalInvested: "إجمالي المبلغ المستثمر",
    totalInterest: "إجمالي الأرباح المشكلة بحكم الفائدة",
    shareWhatsapp: "مشاركة عبر واتساب",
    aboutTitle: "ما هي الفائدة المركبة؟",
    aboutP1: "الفائدة المركبة هي الفائدة التي يتم حسابها على رأس المال الأصلي بالإضافة إلى الفائدة المتراكمة من الفترات السابقة. تُعرف غالبًا بـ 'الفائدة على الفائدة'، وهي إحدى أقوى العوامل لتحقيق النمو المالي على المدى الطويل.",
    aboutH1: "العناصر الأساسية في الحساب:",
    list1: "المبلغ الأولي: المال الذي تبدأ به استثمارك.",
    list2: "المساهمات الشهرية: التزامك بإضافة مبلغ ثابت كل شهر مما يزيد من سرعة نمو المحفظة.",
    list3: "معدل العائد: نسبة الأرباح السنوية المتوقعة والتي تُطبق بشكل مركب.",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)",
    compoundFrequency: "تكرار الفائدة المركبة",
    monthly: "شهرياً",
    yearly: "سنوياً",
  },
  en: {
    title: "Compound Interest Calculator",
    subtitle: "Calculate how your savings and investments grow over time with compound interest.",
    country: "Currency",
    initialAmount: "Initial Investment",
    monthlyContribution: "Monthly Contribution",
    interestRate: "Estimated Annual Interest Rate (%)",
    years: "Investment Duration (Years)",
    calculate: "Calculate Returns",
    futureValue: "Future Savings Value",
    totalInvested: "Total Initial + Contributions",
    totalInterest: "Total Interest Earned",
    shareWhatsapp: "Share via WhatsApp",
    aboutTitle: "What is Compound Interest?",
    aboutP1: "Compound interest is the interest calculated on the initial principal, which also includes all of the accumulated interest from previous periods. It’s often known as 'interest on interest' and is a powerful tool for long-term wealth building.",
    aboutH1: "Key elements:",
    list1: "Initial Amount: The money you start your investment with.",
    list2: "Monthly Contributions: A steady amount added every month boosting growth.",
    list3: "Interest Rate: The annual percentage yield which compounds over time.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)",
    compoundFrequency: "Compound Frequency",
    monthly: "Monthly",
    yearly: "Yearly",
  }
};

export default function CompoundInterestCalculator({ lang }: { lang: 'ar' | 'en' }) {
  const [countryId, setCountryId] = useState('US');
  const [initialAmount, setInitialAmount] = useState<number | ''>(5000);
  const [monthlyContribution, setMonthlyContribution] = useState<number | ''>(200);
  const [rate, setRate] = useState<number | ''>(7);
  const [years, setYears] = useState<number | ''>(10);
  const [frequency, setFrequency] = useState<12 | 1>(12); // compounded monthly or yearly

  const t = translations[lang];
  const isAr = lang === 'ar';

  const selectedCountry = useMemo(() => countries.find(c => c.id === countryId) || countries[0], [countryId]);
  const currency = isAr ? selectedCountry.currencyAr : selectedCountry.currencyEn;

  const results = useMemo(() => {
    let P = Number(initialAmount) || 0;
    let PMT = Number(monthlyContribution) || 0;
    let r = (Number(rate) || 0) / 100;
    let t_years = Number(years) || 0;
    let n = frequency;

    if (t_years <= 0 || r < 0) {
      return { futureValue: P, totalInvested: P, totalInterest: 0 };
    }

    // Compound Interest for Principal
    // A1 = P(1 + r/n)^(nt)
    const principalFV = P * Math.pow(1 + r/n, n * t_years);

    // Compound Interest for Future Value of a Series
    // If contributions are monthly, and compounding is monthly (n=12), the formula aligns perfectly.
    // However, if compounding is yearly (n=1), we need to approximate or adjust since contributions are monthly.
    // For simplicity, we assume contributions happen at the end of each month.
    
    let seriesFV = 0;
    if (r > 0) {
        if (n === 12) {
             seriesFV = PMT * (Math.pow(1 + r/12, 12 * t_years) - 1) / (r/12);
        } else {
             // For yearly compounding, we calculate effective monthly rate or just compound each month's contribution linearly across the year then compound yearly.
             // Standard financial simplification: Calculate effective rate for period.
             const effectiveMonthlyRate = Math.pow(1 + r, 1/12) - 1;
             seriesFV = PMT * (Math.pow(1 + effectiveMonthlyRate, 12 * t_years) - 1) / effectiveMonthlyRate;
        }
    } else {
        seriesFV = PMT * 12 * t_years;
    }

    const futureValue = principalFV + seriesFV;
    const totalInvested = P + (PMT * 12 * t_years);
    const totalInterest = Math.max(0, futureValue - totalInvested);

    return {
      futureValue,
      totalInvested,
      totalInterest,
    };
  }, [initialAmount, monthlyContribution, rate, years, frequency]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
    }).format(val);
  };

  const currentUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent(
    isAr 
      ? `شاهد كيف تنمو مدخراتي عبر حاسبة الفائدة المركبة!\nالقيمة المستقبلية: ${formatCurrency(results.futureValue)} ${currency}\nجرب الحاسبة: `
      : `Watch my savings grow with the Compound Interest Calculator!\nFuture Value: ${formatCurrency(results.futureValue)} ${currency}\nTry it: `
  );
  const whatsappUrl = `https://wa.me/?text=${shareText}${currentUrl}`;

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      {/* Placeholder: Top AdSense */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm">
        <div className="text-[10px] uppercase tracking-widest mb-1">{t.adTop}</div>
        <p className="text-[10px]">{t.adTopDesc}</p>
      </div>

      {/* The Interactive Tool Section */}
      <section className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl flex flex-col gap-6">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-teal-500 to-emerald-400 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <PiggyBank size={32} className="text-white" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">{t.country}</label>
              <select
                value={countryId}
                onChange={(e) => {
                  setCountryId(e.target.value);
                }}
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                dir={isAr ? 'rtl' : 'ltr'}
              >
                {countries.map(c => (
                  <option key={c.id} value={c.id}>{isAr ? c.nameAr : c.nameEn} ({isAr ? c.currencyAr : c.currencyEn})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">{t.initialAmount}</label>
              <div className="relative">
                <div className={`absolute inset-y-0 ${isAr ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center pointer-events-none text-slate-500`}>
                  {currency}
                </div>
                <input
                  type="number"
                  value={initialAmount}
                  onChange={(e) => setInitialAmount(e.target.value ? Number(e.target.value) : '')}
                  className={`w-full bg-slate-900/50 border border-white/10 rounded-xl p-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 ${isAr ? 'pl-16' : 'pr-16'}`}
                  placeholder="5000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">{t.monthlyContribution}</label>
              <div className="relative">
                <div className={`absolute inset-y-0 ${isAr ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center pointer-events-none text-slate-500`}>
                  {currency}
                </div>
                <input
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(e.target.value ? Number(e.target.value) : '')}
                  className={`w-full bg-slate-900/50 border border-white/10 rounded-xl p-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 ${isAr ? 'pl-16' : 'pr-16'}`}
                  placeholder="200"
                />
              </div>
            </div>

            <div className="flex gap-4 flex-col sm:flex-row">
               <div className="flex-1">
                <label className="block text-sm font-medium text-slate-300 mb-2">{t.interestRate}</label>
                <div className="relative">
                    <div className={`absolute inset-y-0 ${isAr ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center pointer-events-none text-slate-500`}>
                    %
                    </div>
                    <input
                    type="number"
                    step="0.1"
                    value={rate}
                    onChange={(e) => setRate(e.target.value ? Number(e.target.value) : '')}
                    className={`w-full bg-slate-900/50 border border-white/10 rounded-xl p-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 ${isAr ? 'pl-10' : 'pr-10'}`}
                    placeholder="7"
                    />
                </div>
              </div>
              <div className="flex-1">
                 <label className="block text-sm font-medium text-slate-300 mb-2">{t.years}</label>
                 <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(e.target.value ? Number(e.target.value) : '')}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  placeholder="10"
                />
              </div>
            </div>

            <div>
               <label className="block text-sm font-medium text-slate-300 mb-2">{t.compoundFrequency}</label>
               <select
                value={frequency}
                onChange={(e) => setFrequency(Number(e.target.value) as 12 | 1)}
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                dir={isAr ? 'rtl' : 'ltr'}
              >
                <option value={12}>{t.monthly}</option>
                <option value={1}>{t.yearly}</option>
              </select>
            </div>
          </div>

          {/* Results */}
          <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 shadow-inner flex flex-col justify-center gap-6">
            <div className="text-center">
              <p className="text-slate-400 text-sm font-medium mb-2">{t.futureValue}</p>
              <div className="text-4xl md:text-5xl font-bold text-teal-400 mb-2">
                {formatCurrency(results.futureValue)}
              </div>
              <p className="text-emerald-500 text-sm">{currency}</p>
            </div>

            <div className="h-px bg-white/10 w-full my-2"></div>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">{t.totalInvested}</span>
                <span className="text-slate-200 font-semibold">{formatCurrency(results.totalInvested)} {currency}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">{t.totalInterest}</span>
                <span className="text-teal-400 font-semibold">+{formatCurrency(results.totalInterest)} {currency}</span>
              </div>
            </div>

            {/* Social Share */}
            {results.futureValue > 0 ? (
              <div className="mt-4 flex justify-center">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-500 rounded-xl text-sm font-bold text-slate-100 shadow-lg shadow-teal-600/20 transition-all active:scale-95"
                >
                  <Share2 size={18} />
                  {t.shareWhatsapp}
                </a>
              </div>
            ) : null}
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
            <TrendingUp size={20} className="text-teal-400"/>
            <h2 className="text-lg font-bold text-teal-400">{t.aboutTitle}</h2>
        </div>
        <div className="space-y-4">
          <p>{t.aboutP1}</p>
          <h3 className="text-base font-bold text-emerald-400 mt-4">{t.aboutH1}</h3>
          <ul className="list-disc list-inside space-y-2 mx-4 text-slate-400">
            <li>{t.list1}</li>
            <li>{t.list2}</li>
            <li>{t.list3}</li>
          </ul>
        </div>
      </article>
    </div>
  );
}
