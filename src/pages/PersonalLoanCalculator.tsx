import React, { useState, useEffect, useMemo } from 'react';
import { Calculator, Share2, DollarSign, Percent, Calendar } from 'lucide-react';

const countries = [
  { id: 'IQ', nameAr: 'العراق', nameEn: 'Iraq', currencyAr: 'دينار', currencyEn: 'IQD', defaultRate: 8 },
  { id: 'SA', nameAr: 'السعودية', nameEn: 'Saudi Arabia', currencyAr: 'ريال', currencyEn: 'SAR', defaultRate: 3.5 },
  { id: 'EG', nameAr: 'مصر', nameEn: 'Egypt', currencyAr: 'جنيه', currencyEn: 'EGP', defaultRate: 15 },
  { id: 'AE', nameAr: 'الإمارات', nameEn: 'UAE', currencyAr: 'درهم', currencyEn: 'AED', defaultRate: 4 },
  { id: 'JO', nameAr: 'الأردن', nameEn: 'Jordan', currencyAr: 'دينار', currencyEn: 'JOD', defaultRate: 7 },
  { id: 'US', nameAr: 'أمريكا', nameEn: 'USA', currencyAr: 'دولار', currencyEn: 'USD', defaultRate: 6 },
];

const translations = {
  ar: {
    title: "حاسبة القروض الشخصية",
    subtitle: "احسب القسط الشهري وإجمالي الفوائد لقرضك المالي وفقاً لدولتك.",
    country: "حدد الدولة",
    amount: "مبلغ القرض",
    interestRate: "نسبة الفائدة السنوية (%)",
    term: "مدة القرض",
    termYears: "سنوات",
    termMonths: "أشهر",
    calculate: "احسب الآن",
    monthlyPayment: "القسط الشهري",
    totalInterest: "إجمالي الفوائد",
    totalAmount: "إجمالي المبلغ المسدد",
    shareWhatsapp: "مشاركة عبر واتساب",
    aboutTitle: "كيف تعمل حاسبة القروض؟",
    aboutP1: "تساعدك حاسبة القروض الشخصية في معرفة الالتزامات المالية الشهرية وتقييم تكلفة القرض الإجمالية بناءً على قيمة الفائدة المطبقة في بلدك.",
    aboutH1: "العوامل المؤثرة على القرض:",
    list1: "مبلغ القرض (أصل الدين): المبلغ الأساسي الذي تحصل عليه.",
    list2: "نسبة الفائدة: التكلفة الإضافية التي يفرضها البنك، وتختلف بشكل كبير بين الدول.",
    list3: "مدة السداد: كلما طالت المدة، قلّ القسط الشهري ولكن زاد إجمالي الفائدة المدفوعة.",
    note: "ملاحظة: تعتمد هذه الحاسبة على نظام الفائدة المتناقصة (Reducing Balance) وهو الأكثر شيوعاً. قد تختلف الأرقام الفعلية قليلاً باختلاف الرسوم الإدارية للبنك.",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)"
  },
  en: {
    title: "Personal Loan Calculator",
    subtitle: "Calculate your monthly EMI and total interest based on your country's rates.",
    country: "Select Country",
    amount: "Loan Amount",
    interestRate: "Annual Interest Rate (%)",
    term: "Loan Term",
    termYears: "Years",
    termMonths: "Months",
    calculate: "Calculate Now",
    monthlyPayment: "Monthly Payment (EMI)",
    totalInterest: "Total Interest",
    totalAmount: "Total Amount Payable",
    shareWhatsapp: "Share via WhatsApp",
    aboutTitle: "How does the loan calculator work?",
    aboutP1: "The personal loan calculator helps you estimate your monthly financial obligations and assess the total cost of your loan based on interest rates applicable in your country.",
    aboutH1: "Factors affecting your loan:",
    list1: "Loan Amount (Principal): The base amount you borrow.",
    list2: "Interest Rate: The extra cost charged by the bank, which varies greatly by country.",
    list3: "Loan Term: Longer terms result in lower monthly payments but higher total interest paid.",
    note: "Note: This calculator uses the standard Reducing Balance method (EMI). Actual figures may vary slightly depending on bank processing fees.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)"
  }
};

export default function PersonalLoanCalculator({ lang }: { lang: 'ar' | 'en' }) {
  const [countryId, setCountryId] = useState('IQ');
  const [amount, setAmount] = useState<number | ''>('');
  const [rate, setRate] = useState<number | ''>(8);
  const [term, setTerm] = useState<number | ''>(5);
  const [termType, setTermType] = useState<'years' | 'months'>('years');
  
  const t = translations[lang];
  const isAr = lang === 'ar';
  
  const selectedCountry = useMemo(() => countries.find(c => c.id === countryId) || countries[0], [countryId]);
  const currency = isAr ? selectedCountry.currencyAr : selectedCountry.currencyEn;

  useEffect(() => {
    setRate(selectedCountry.defaultRate);
  }, [selectedCountry]);

  // Calculations
  const results = useMemo(() => {
    const p = Number(amount);
    const r = Number(rate) / 100 / 12;
    const n = termType === 'years' ? Number(term) * 12 : Number(term);
    
    if (!p || !r || !n || p <= 0 || r <= 0 || n <= 0) {
      return { monthly: 0, totalInterest: 0, totalAmount: 0 };
    }

    const monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalAmount = monthly * n;
    const totalInterest = totalAmount - p;

    return {
      monthly,
      totalInterest,
      totalAmount
    };
  }, [amount, rate, term, termType]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
    }).format(val);
  };

  const currentUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent(
    isAr 
      ? `حسبت قرضي بقيمة ${amount} ${currency}!\nالقسط الشهري: ${formatCurrency(results.monthly)} ${currency}\nجرب الحاسبة: `
      : `I just calculated my loan of ${amount} ${currency}!\nMonthly EMI: ${formatCurrency(results.monthly)} ${currency}\nTry it: `
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
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <Calculator size={32} className="text-white" />
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
                onChange={(e) => setCountryId(e.target.value)}
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                dir={isAr ? 'rtl' : 'ltr'}
              >
                {countries.map(c => (
                  <option key={c.id} value={c.id}>{isAr ? c.nameAr : c.nameEn} ({isAr ? c.currencyAr : c.currencyEn})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">{t.amount}</label>
              <div className="relative">
                <div className={`absolute inset-y-0 ${isAr ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center pointer-events-none text-slate-500`}>
                  {currency}
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : '')}
                  className={`w-full bg-slate-900/50 border border-white/10 rounded-xl p-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${isAr ? 'pl-16' : 'pr-16'}`}
                  placeholder="250000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">{t.interestRate}</label>
              <div className="relative">
                <div className={`absolute inset-y-0 ${isAr ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center pointer-events-none text-slate-500`}>
                  <Percent size={16} />
                </div>
                <input
                  type="number"
                  value={rate}
                  step="0.1"
                  onChange={(e) => setRate(e.target.value ? Number(e.target.value) : '')}
                  className={`w-full bg-slate-900/50 border border-white/10 rounded-xl p-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${isAr ? 'pl-10' : 'pr-10'}`}
                  placeholder="8.0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">{t.term}</label>
              <div className="flex gap-3">
                <input
                  type="number"
                  value={term}
                  onChange={(e) => setTerm(e.target.value ? Number(e.target.value) : '')}
                  className="flex-1 bg-slate-900/50 border border-white/10 rounded-xl p-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="5"
                />
                <select
                  value={termType}
                  onChange={(e) => setTermType(e.target.value as 'years' | 'months')}
                  className="w-32 bg-slate-900/50 border border-white/10 rounded-xl p-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  dir={isAr ? 'rtl' : 'ltr'}
                >
                  <option value="years">{t.termYears}</option>
                  <option value="months">{t.termMonths}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 shadow-inner flex flex-col justify-center gap-6">
            <div className="text-center">
              <p className="text-slate-400 text-sm font-medium mb-2">{t.monthlyPayment}</p>
              <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
                {formatCurrency(results.monthly)}
              </div>
              <p className="text-emerald-500 text-sm">{currency}</p>
            </div>

            <div className="h-px bg-white/10 w-full my-2"></div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-slate-400 text-xs mb-1">{t.totalInterest}</p>
                <p className="text-slate-200 font-semibold">{formatCurrency(results.totalInterest)} {currency}</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs mb-1">{t.totalAmount}</p>
                <p className="text-slate-200 font-semibold">{formatCurrency(results.totalAmount)} {currency}</p>
              </div>
            </div>

            {/* Social Share */}
            {amount && results.monthly > 0 ? (
              <div className="mt-4 flex justify-center">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-sm font-bold text-slate-100 shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
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
        <h2 className="text-lg font-bold text-blue-400 border-b border-white/10 pb-4 mb-2">{t.aboutTitle}</h2>
        <div className="space-y-4">
          <p>{t.aboutP1}</p>
          <h3 className="text-base font-bold text-emerald-400 mt-4">{t.aboutH1}</h3>
          <ul className="list-disc list-inside space-y-2 mx-4 text-slate-400">
            <li>{t.list1}</li>
            <li>{t.list2}</li>
            <li>{t.list3}</li>
          </ul>
          <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/20 rounded-xl text-blue-200/80 italic">
            {t.note}
          </div>
        </div>
      </article>
    </div>
  );
}
