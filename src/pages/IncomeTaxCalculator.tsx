import React, { useState, useMemo, useEffect } from 'react';
import { Calculator, Share2, Briefcase, User, Wallet } from 'lucide-react';

const countries = [
  { id: 'IQ', nameAr: 'العراق', nameEn: 'Iraq', currencyAr: 'دينار', currencyEn: 'IQD' },
  { id: 'SA', nameAr: 'السعودية', nameEn: 'Saudi Arabia', currencyAr: 'ريال', currencyEn: 'SAR' },
  { id: 'EG', nameAr: 'مصر', nameEn: 'Egypt', currencyAr: 'جنيه', currencyEn: 'EGP' },
  { id: 'AE', nameAr: 'الإمارات', nameEn: 'UAE', currencyAr: 'درهم', currencyEn: 'AED' },
  { id: 'JO', nameAr: 'الأردن', nameEn: 'Jordan', currencyAr: 'دينار', currencyEn: 'JOD' },
  { id: 'US', nameAr: 'أمريكا', nameEn: 'USA', currencyAr: 'دولار', currencyEn: 'USD' },
  { id: 'UK', nameAr: 'بريطانيا', nameEn: 'UK', currencyAr: 'جنيه إسترليني', currencyEn: 'GBP' },
  { id: 'CA', nameAr: 'كندا', nameEn: 'Canada', currencyAr: 'دولار كندي', currencyEn: 'CAD' },
  { id: 'AU', nameAr: 'أستراليا', nameEn: 'Australia', currencyAr: 'دولار أسترالي', currencyEn: 'AUD' },
  { id: 'DE', nameAr: 'ألمانيا', nameEn: 'Germany', currencyAr: 'يورو', currencyEn: 'EUR' },
  { id: 'FR', nameAr: 'فرنسا', nameEn: 'France', currencyAr: 'يورو', currencyEn: 'EUR' },
];

const translations = {
  ar: {
    title: "حاسبة ضريبة الدخل",
    subtitle: "احسب الضريبة المستحقة على راتبك أو دخلك كصاحب عمل حر بشكل تقريبي.",
    country: "حدد الدولة",
    incomeType: "نوع الدخل",
    employee: "موظف (راتب)",
    freelancer: "عمل حر / مستقل",
    incomeAmount: "الدخل",
    cycle: "دورة الدخل",
    monthly: "شهري",
    yearly: "سنوي",
    calculate: "احسب الآن",
    grossIncome: "الدخل الإجمالي",
    totalTax: "الضريبة المقدرة",
    netIncome: "صافي الدخل",
    shareWhatsapp: "مشاركة عبر واتساب",
    aboutTitle: "معلومات عن ضريبة الدخل",
    aboutP1: "توفر هذه الحاسبة تقديراً لضريبة الدخل الشخصية بناءً على القوانين الضريبية العامة لكل دولة. تختلف الشرائح الضريبية من دولة لأخرى وقد تتم إضافة استقطاعات أخرى مثل التأمينات الاجتماعية.",
    aboutH1: "ملاحظات هامة حول بعض الدول:",
    list1: "السعودية والإمارات: لا توجد ضريبة دخل على رواتب الأفراد (المواطنين والمقيمين)، لكن قد تطبق اشتراكات التأمينات الاجتماعية أو ضريبة القيمة المضافة (للمهن الحرة).",
    list2: "مصر، الأردن، والعراق: تعتمد ضريبة الدخل على نظام الشرائح التصاعدية حيث يتم إعفاء جزء من الدخل (حد الإعفاء) وتزداد النسبة مع زيادة الدخل.",
    note: "تنويه: الأرقام الناتجة هي تقديرات إسترشادية مبسطة وقد تختلف عن القيمة الفعلية المطلوبة من مصلحة الضرائب نتيجة للإعفاءات الشخصية والعائلية والتحديثات المستمرة على القوانين.",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)"
  },
  en: {
    title: "Income Tax Calculator",
    subtitle: "Estimate the tax due on your salary or freelance income.",
    country: "Select Country",
    incomeType: "Income Type",
    employee: "Employee (Salary)",
    freelancer: "Freelancer / Self-Employed",
    incomeAmount: "Income Amount",
    cycle: "Income Cycle",
    monthly: "Monthly",
    yearly: "Yearly",
    calculate: "Calculate Now",
    grossIncome: "Gross Income",
    totalTax: "Estimated Tax",
    netIncome: "Net Income",
    shareWhatsapp: "Share via WhatsApp",
    aboutTitle: "About Income Tax",
    aboutP1: "This calculator provides a rough estimate of personal income tax based on the general tax brackets of each country. Other deductions like social security may apply.",
    aboutH1: "Important notes by country:",
    list1: "Saudi Arabia & UAE: Currently, there is no personal income tax on salaries. However, social insurance contributions or VAT (for freelancers) might apply.",
    list2: "Egypt, Jordan, Iraq: Income tax typically follows a progressive bracket system with a basic tax-free allowance.",
    note: "Disclaimer: Results are simplified indicative estimates and may differ from your actual tax liability due to specific personal allowances and frequent legal updates.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)"
  }
};

export default function IncomeTaxCalculator({ lang }: { lang: 'ar' | 'en' }) {
  const [countryId, setCountryId] = useState('EG');
  const [incomeType, setIncomeType] = useState<'employee' | 'freelancer'>('employee');
  const [income, setIncome] = useState<number | ''>('');
  const [cycle, setCycle] = useState<'monthly' | 'yearly'>('monthly');
  
  const t = translations[lang];
  const isAr = lang === 'ar';
  
  const selectedCountry = useMemo(() => countries.find(c => c.id === countryId) || countries[0], [countryId]);
  const currency = isAr ? selectedCountry.currencyAr : selectedCountry.currencyEn;

  // Simple Mock Tax Calculation
  const results = useMemo(() => {
    let rawIncome = Number(income);
    if (!rawIncome || rawIncome <= 0) {
      return { initialAnnual: 0, taxAnnual: 0, netAnnual: 0, netMonthly: 0 };
    }

    let annualIncome = cycle === 'monthly' ? rawIncome * 12 : rawIncome;
    let taxAnnual = 0;

    // Simplified Tax logic per country (Rough estimates for demo purposes)
    if (countryId === 'AE' || (countryId === 'SA' && incomeType === 'employee')) {
      taxAnnual = 0; // No income tax
    } else if (countryId === 'SA' && incomeType === 'freelancer') {
      // Assuming 15% VAT roughly or flat corporate-like deduction for simplicity
      taxAnnual = annualIncome * 0.15;
    } else if (countryId === 'EG') {
      // Egypt (Progressive) rough estimation
      let taxable = annualIncome - 40000; // Basic exemption approx
      if (taxable > 0) {
        if (taxable <= 15000) taxAnnual += taxable * 0.10;
        else if (taxable <= 30000) taxAnnual += 15000 * 0.10 + (taxable - 15000) * 0.15;
        else taxAnnual += 15000 * 0.10 + 15000 * 0.15 + (taxable - 30000) * 0.20;
      }
    } else if (countryId === 'IQ') {
      // Iraq (approx 15% flat after 3M IQD yearly exemption)
      let taxable = annualIncome - 3000000;
      if (taxable > 0) {
        taxAnnual = taxable * (incomeType === 'freelancer' ? 0.15 : 0.10);
      }
    } else if (countryId === 'JO') {
      // Jordan (approx progressive after 9000 JOD exemption)
      let taxable = annualIncome - 9000;
      if (taxable > 0) {
        taxAnnual = taxable * 0.05; // simplified
      }
    } else if (countryId === 'US') {
      let taxable = annualIncome - 13850;
      if (taxable > 0) taxAnnual = taxable * 0.22;
    } else if (countryId === 'UK') {
      let taxable = annualIncome - 12570;
      if (taxable > 0) taxAnnual = taxable * 0.20;
    } else if (countryId === 'CA') {
      let taxable = annualIncome - 15000;
      if (taxable > 0) taxAnnual = taxable * 0.20;
    } else if (countryId === 'AU') {
      let taxable = annualIncome - 18200;
      if (taxable > 0) taxAnnual = taxable * 0.32;
    } else if (countryId === 'DE') {
      let taxable = annualIncome - 10908;
      if (taxable > 0) taxAnnual = taxable * 0.35;
    } else if (countryId === 'FR') {
      let taxable = annualIncome - 10777;
      if (taxable > 0) taxAnnual = taxable * 0.30;
    }

    if (taxAnnual < 0) taxAnnual = 0;
    
    let netAnnual = annualIncome - taxAnnual;

    return {
      initialAnnual: annualIncome,
      taxAnnual,
      netAnnual,
      netMonthly: netAnnual / 12
    };
  }, [income, cycle, countryId, incomeType]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
    }).format(val);
  };

  const currentUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent(
    isAr 
      ? `تم حساب الضريبة على الدخل المقدرة بلدي!\nالدخل الصافي شهرياً: ${formatCurrency(results.netMonthly)} ${currency}\nجرب حاسبة الضرائب: `
      : `I just calculated my estimated income tax!\nMonthly Net: ${formatCurrency(results.netMonthly)} ${currency}\nTry it out: `
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
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-indigo-500 to-purple-400 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <Wallet size={32} className="text-white" />
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
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                dir={isAr ? 'rtl' : 'ltr'}
              >
                {countries.map(c => (
                  <option key={c.id} value={c.id}>{isAr ? c.nameAr : c.nameEn} ({isAr ? c.currencyAr : c.currencyEn})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">{t.incomeType}</label>
              <div className="flex gap-2 p-1 bg-slate-900/50 border border-white/10 rounded-xl">
                <button
                  onClick={() => setIncomeType('employee')}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition-colors ${incomeType === 'employee' ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
                >
                  <Briefcase size={16} />
                  {t.employee}
                </button>
                <button
                  onClick={() => setIncomeType('freelancer')}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition-colors ${incomeType === 'freelancer' ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
                >
                  <User size={16} />
                  {t.freelancer}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">{t.incomeAmount}</label>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <div className={`absolute inset-y-0 ${isAr ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center pointer-events-none text-slate-500`}>
                    {currency}
                  </div>
                  <input
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(e.target.value ? Number(e.target.value) : '')}
                    className={`w-full bg-slate-900/50 border border-white/10 rounded-xl p-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${isAr ? 'pl-16' : 'pr-16'}`}
                    placeholder="5000"
                  />
                </div>
                <select
                  value={cycle}
                  onChange={(e) => setCycle(e.target.value as 'monthly' | 'yearly')}
                  className="w-32 bg-slate-900/50 border border-white/10 rounded-xl p-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  dir={isAr ? 'rtl' : 'ltr'}
                >
                  <option value="monthly">{t.monthly}</option>
                  <option value="yearly">{t.yearly}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 shadow-inner flex flex-col justify-center gap-6">
            <div className="text-center">
              <p className="text-slate-400 text-sm font-medium mb-2">{t.netIncome} ({t.monthly})</p>
              <div className="text-4xl md:text-5xl font-bold text-indigo-400 mb-2">
                {formatCurrency(results.netMonthly)}
              </div>
              <p className="text-emerald-500 text-sm">{currency}</p>
            </div>

            <div className="h-px bg-white/10 w-full my-2"></div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-slate-400 text-xs mb-1">{t.grossIncome} ({t.yearly})</p>
                <p className="text-slate-200 font-semibold">{formatCurrency(results.initialAnnual)} {currency}</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs mb-1">{t.totalTax} ({t.yearly})</p>
                <p className="text-rose-400 font-semibold">{formatCurrency(results.taxAnnual)} {currency}</p>
              </div>
            </div>

            {/* Social Share */}
            {income && results.initialAnnual > 0 ? (
              <div className="mt-4 flex justify-center">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-sm font-bold text-slate-100 shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
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
        <h2 className="text-lg font-bold text-indigo-400 border-b border-white/10 pb-4 mb-2">{t.aboutTitle}</h2>
        <div className="space-y-4">
          <p>{t.aboutP1}</p>
          <h3 className="text-base font-bold text-emerald-400 mt-4">{t.aboutH1}</h3>
          <ul className="list-disc list-inside space-y-2 mx-4 text-slate-400">
            <li>{t.list1}</li>
            <li>{t.list2}</li>
          </ul>
          <div className="mt-6 p-4 bg-indigo-900/20 border border-indigo-500/20 rounded-xl text-indigo-200/80 italic">
            {t.note}
          </div>
        </div>
      </article>
    </div>
  );
}
