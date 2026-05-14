import React, { useState, useMemo } from 'react';
import { Calculator, Share2, HeartHandshake, Info } from 'lucide-react';

const currencies = [
  { id: 'IQD', nameAr: 'دينار عراقي', nameEn: 'Iraqi Dinar', symbol: 'ع.د', defaultGold: 105000, defaultSilver: 1200 },
  { id: 'SAR', nameAr: 'ريال سعودي', nameEn: 'Saudi Riyal', symbol: 'ر.س', defaultGold: 300, defaultSilver: 3.5 },
  { id: 'EGP', nameAr: 'جنيه مصري', nameEn: 'Egyptian Pound', symbol: 'ج.م', defaultGold: 3800, defaultSilver: 45 },
  { id: 'AED', nameAr: 'درهم إماراتي', nameEn: 'UAE Dirham', symbol: 'د.إ', defaultGold: 295, defaultSilver: 3.4 },
  { id: 'JOD', nameAr: 'دينار أردني', nameEn: 'Jordanian Dinar', symbol: 'د.أ', defaultGold: 56, defaultSilver: 0.65 },
  { id: 'USD', nameAr: 'دولار أمريكي', nameEn: 'US Dollar', symbol: '$', defaultGold: 80, defaultSilver: 0.9 },
  { id: 'EUR', nameAr: 'يورو', nameEn: 'Euro', symbol: '€', defaultGold: 74, defaultSilver: 0.85 },
];

const translations = {
  ar: {
    title: "حاسبة الزكاة",
    subtitle: "احسب زكاة مالك (النقد، الذهب، الفضة، وعروض التجارة) بدقة وسهولة.",
    currency: "العملة",
    pricesSettings: "أسعار الذهب والفضة اليوم",
    goldPrice: "سعر جرام الذهب عيار 24",
    silverPrice: "سعر جرام الفضة",
    moneyAndDebts: "الأموال والديون",
    cash: "الأموال النقدية والمدخرات",
    debtsOwedToYou: "الديون التي لك (مرجوة السداد)",
    debtsYouOwe: "الديون التي عليك (تخصم)",
    metals: "الذهب والفضة المدخرة",
    gold24: "ذهب عيار 24 (بالجرام)",
    gold21: "ذهب عيار 21 (بالجرام)",
    gold18: "ذهب عيار 18 (بالجرام)",
    silverGrams: "فضة (بالجرام)",
    tradeGoods: "عروض التجارة",
    tradeGoodsVal: "قيمة البضائع المعدة للتجارة",
    totalWealth: "إجمالي الوعاء الزكوي",
    nisabValue: "قيمة النصاب (85 جم ذهب 24)",
    zakatDue: "مقدار الزكاة الواجبة",
    notReached: "لم يبلغ النصاب",
    shareWhatsapp: "مشاركة عبر واتساب",
    aboutTitle: "معلومات عن زكاة المال",
    aboutP1: "الزكاة ركن من أركان الإسلام، وتجب في المال إذا بلغ النصاب (وهو ما يعادل قيمة 85 جراماً من الذهب الخالص عيار 24 أو 595 جراماً من الفضة) وحال عليه الحول (سنة هجرية كاملة).",
    aboutH1: "عناصر حساب الزكاة:",
    list1: "الذهب والفضة: تُحسب زكاتها إذا كانت للادخار وليس للاستعمال الشخصي المعتاد (حسب الفتوى). للذهب عيارات مختلفة تم تحويلها في هذه الحاسبة لتعادل عيار 24.",
    list2: "الديون: الديون المرجوة السداد تُضاف لوعاء الزكاة، والديون التي عليك للآخرين تُخصم منه.",
    list3: "عروض التجارة: تُقوم البضائع المعدة للبيع بسعر السوق الحالي (سعر البيع) يوم وجوب الزكاة.",
    note: "تنويه: نسبة الزكاة المعتمدة في هذه الحاسبة هي 2.5% (للأشهر القمرية/الهجرية). يُنصح باستشارة أهل العلم في الحالات الخاصة.",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)"
  },
  en: {
    title: "Zakat Calculator",
    subtitle: "Calculate Zakat on your wealth (Cash, Gold, Silver, Trade goods) accurately.",
    currency: "Currency",
    pricesSettings: "Today's Gold & Silver Prices",
    goldPrice: "Price of 1g Gold (24K)",
    silverPrice: "Price of 1g Silver",
    moneyAndDebts: "Cash & Debts",
    cash: "Cash and Savings",
    debtsOwedToYou: "Debts owed to you (expected)",
    debtsYouOwe: "Debts you owe (deducted)",
    metals: "Saved Gold & Silver",
    gold24: "24K Gold (grams)",
    gold21: "21K Gold (grams)",
    gold18: "18K Gold (grams)",
    silverGrams: "Silver (grams)",
    tradeGoods: "Trade Goods",
    tradeGoodsVal: "Value of Business Inventory",
    totalWealth: "Total Zakat-able Wealth",
    nisabValue: "Nisab Value (85g of 24K Gold)",
    zakatDue: "Zakat Due (2.5%)",
    notReached: "Nisab not reached",
    shareWhatsapp: "Share via WhatsApp",
    aboutTitle: "About Zakat",
    aboutP1: "Zakat is obligatory when your wealth reaches the Nisab (equivalent to 85 grams of 24K pure gold or 595 grams of silver) and one lunar year (Hawl) has passed.",
    aboutH1: "Calculation Elements:",
    list1: "Gold & Silver: Calculated if kept as wealth/savings. Different karats are converted to their 24K equivalent.",
    list2: "Debts: Good debts owed to you are added, while debts you owe are deducted from your total wealth.",
    list3: "Trade Goods: Inventory for sale should be valued at its current wholesale market price on the day Zakat is due.",
    note: "Note: The standard Zakat rate used here is 2.5% (Lunar year basis). For complex situations, please consult a scholar.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)"
  }
};

export default function ZakatCalculator({ lang }: { lang: 'ar' | 'en' }) {
  const [currencyId, setCurrencyId] = useState('IQD');
  const t = translations[lang];
  const isAr = lang === 'ar';

  const selectedCurrency = useMemo(() => currencies.find(c => c.id === currencyId) || currencies[0], [currencyId]);

  // Settings
  const [goldPrice, setGoldPrice] = useState<number | ''>(selectedCurrency.defaultGold);
  const [silverPrice, setSilverPrice] = useState<number | ''>(selectedCurrency.defaultSilver);

  // Wealth
  const [cash, setCash] = useState<number | ''>('');
  const [debtsOwedToYou, setDebtsOwedToYou] = useState<number | ''>('');
  const [debtsYouOwe, setDebtsYouOwe] = useState<number | ''>('');
  const [tradeGoods, setTradeGoods] = useState<number | ''>('');

  // Metals
  const [gold24, setGold24] = useState<number | ''>('');
  const [gold21, setGold21] = useState<number | ''>('');
  const [gold18, setGold18] = useState<number | ''>('');
  const [silver, setSilver] = useState<number | ''>('');

  // Update default prices when currency changes
  React.useEffect(() => {
    setGoldPrice(selectedCurrency.defaultGold);
    setSilverPrice(selectedCurrency.defaultSilver);
  }, [selectedCurrency]);

  const results = useMemo(() => {
    const gp = Number(goldPrice) || 0;
    const sp = Number(silverPrice) || 0;

    // Convert all gold to 24k value equivalent
    const g24 = Number(gold24) || 0;
    const g21 = Number(gold21) || 0;
    const g18 = Number(gold18) || 0;
    
    // (Actual weight * karat / 24) * 24k price
    const goldValue = (g24 + (g21 * 21 / 24) + (g18 * 18 / 24)) * gp;
    const silverValue = (Number(silver) || 0) * sp;

    const baseWealth = (Number(cash) || 0) + (Number(debtsOwedToYou) || 0) + (Number(tradeGoods) || 0) + goldValue + silverValue;
    const totalWealth = Math.max(0, baseWealth - (Number(debtsYouOwe) || 0));

    // Calculate Nisab based on Gold (85 grams of 24k)
    // Could also use silver (595 grams) but gold is standard for cash today
    const nisab = 85 * gp;
    const hasReachedNisab = totalWealth >= nisab;

    const zakatDue = hasReachedNisab ? totalWealth * 0.025 : 0;

    return {
      totalWealth,
      nisab,
      hasReachedNisab,
      zakatDue
    };
  }, [goldPrice, silverPrice, cash, debtsOwedToYou, debtsYouOwe, tradeGoods, gold24, gold21, gold18, silver]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
    }).format(val);
  };

  const shareText = encodeURIComponent(
    isAr 
      ? `لقد استخدمت حاسبة الزكاة الذكية لمعرفة الوعاء الزكوي بدقة!\nتأكد من زكاة مالك عبر الرابط: `
      : `I just used the Zakat Calculator to accurately measure my Zakat due. Try it out: `
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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="text-center relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <HeartHandshake size={32} className="text-white" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400">{t.subtitle}</p>
        </div>

        <div className="flex justify-center my-2 relative z-10">
          <div className="w-full max-w-sm">
            <label className="block text-sm font-medium text-slate-300 mb-2 text-center">{t.currency}</label>
            <select
              value={currencyId}
              onChange={(e) => setCurrencyId(e.target.value)}
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-center"
              dir={isAr ? 'rtl' : 'ltr'}
            >
              {currencies.map(c => (
                <option key={c.id} value={c.id}>{isAr ? c.nameAr : c.nameEn} ({c.symbol})</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
          {/* Prices Settings */}
          <div className="bg-slate-900/40 p-5 rounded-2xl border border-white/5 col-span-1 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2 text-emerald-400 font-semibold mb-1 flex items-center gap-2">
              <Info size={16} />
              {t.pricesSettings}
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">{t.goldPrice}</label>
              <div className="relative">
                <div className={`absolute inset-y-0 ${isAr ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center pointer-events-none text-slate-500 text-xs`}>
                  {selectedCurrency.symbol}
                </div>
                <input type="number" value={goldPrice} onChange={(e) => setGoldPrice(e.target.value ? Number(e.target.value) : '')} className={`w-full bg-slate-800/50 border border-white/10 rounded-lg p-2 text-slate-200 focus:ring-1 focus:ring-emerald-500/50 outline-none ${isAr ? 'pl-10' : 'pr-10'}`} />
              </div>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">{t.silverPrice}</label>
              <div className="relative">
                <div className={`absolute inset-y-0 ${isAr ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center pointer-events-none text-slate-500 text-xs`}>
                  {selectedCurrency.symbol}
                </div>
                <input type="number" value={silverPrice} onChange={(e) => setSilverPrice(e.target.value ? Number(e.target.value) : '')} className={`w-full bg-slate-800/50 border border-white/10 rounded-lg p-2 text-slate-200 focus:ring-1 focus:ring-emerald-500/50 outline-none ${isAr ? 'pl-10' : 'pr-10'}`} />
              </div>
            </div>
          </div>

          {/* Money & Debts */}
          <div className="bg-slate-900/40 p-5 rounded-2xl border border-white/5 flex flex-col gap-4">
            <h3 className="text-emerald-400 font-semibold">{t.moneyAndDebts}</h3>
            <div>
              <label className="block text-sm text-slate-400 mb-1">{t.cash}</label>
              <input type="number" value={cash} onChange={(e) => setCash(e.target.value ? Number(e.target.value) : '')} placeholder="0" className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-2.5 text-slate-200 focus:ring-1 focus:ring-emerald-500/50 outline-none" />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">{t.debtsOwedToYou}</label>
              <input type="number" value={debtsOwedToYou} onChange={(e) => setDebtsOwedToYou(e.target.value ? Number(e.target.value) : '')} placeholder="0" className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-2.5 text-slate-200 focus:ring-1 focus:ring-emerald-500/50 outline-none" />
            </div>
            <div>
              <label className="block text-sm text-rose-400/80 mb-1">{t.debtsYouOwe}</label>
              <input type="number" value={debtsYouOwe} onChange={(e) => setDebtsYouOwe(e.target.value ? Number(e.target.value) : '')} placeholder="0" className="w-full bg-rose-950/20 border border-rose-900/30 rounded-lg p-2.5 text-slate-200 focus:ring-1 focus:ring-rose-500/50 outline-none" />
            </div>
          </div>

          {/* Metals & Trade Goods */}
          <div className="flex flex-col gap-4">
            <div className="bg-slate-900/40 p-5 rounded-2xl border border-white/5 flex flex-col gap-4">
              <h3 className="text-emerald-400 font-semibold">{t.metals}</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-amber-500/80 mb-1">{t.gold24}</label>
                  <input type="number" value={gold24} onChange={(e) => setGold24(e.target.value ? Number(e.target.value) : '')} placeholder="0" className="w-full bg-slate-800/50 border border-amber-500/20 rounded-lg p-2 text-slate-200 focus:ring-1 focus:ring-amber-500/50 outline-none" />
                </div>
                <div>
                  <label className="block text-xs text-amber-400/80 mb-1">{t.gold21}</label>
                  <input type="number" value={gold21} onChange={(e) => setGold21(e.target.value ? Number(e.target.value) : '')} placeholder="0" className="w-full bg-slate-800/50 border border-amber-500/20 rounded-lg p-2 text-slate-200 focus:ring-1 focus:ring-amber-500/50 outline-none" />
                </div>
                <div>
                  <label className="block text-xs text-amber-300/80 mb-1">{t.gold18}</label>
                  <input type="number" value={gold18} onChange={(e) => setGold18(e.target.value ? Number(e.target.value) : '')} placeholder="0" className="w-full bg-slate-800/50 border border-amber-500/20 rounded-lg p-2 text-slate-200 focus:ring-1 focus:ring-amber-500/50 outline-none" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">{t.silverGrams}</label>
                  <input type="number" value={silver} onChange={(e) => setSilver(e.target.value ? Number(e.target.value) : '')} placeholder="0" className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-2 text-slate-200 focus:ring-1 focus:ring-slate-400/50 outline-none" />
                </div>
              </div>
            </div>

            <div className="bg-slate-900/40 p-5 rounded-2xl border border-white/5 flex flex-col gap-4">
              <h3 className="text-emerald-400 font-semibold">{t.tradeGoods}</h3>
              <div>
                <label className="block text-sm text-slate-400 mb-1">{t.tradeGoodsVal}</label>
                <input type="number" value={tradeGoods} onChange={(e) => setTradeGoods(e.target.value ? Number(e.target.value) : '')} placeholder="0" className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-2 text-slate-200 focus:ring-1 focus:ring-emerald-500/50 outline-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Results Area */}
        <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 md:p-8 mt-4 shadow-xl relative z-10 text-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            <div className={`flex flex-col items-center justify-center p-4 border border-white/5 rounded-xl ${isAr ? 'md:border-l' : 'md:border-r'}`}>
              <span className="text-slate-400 text-sm mb-1">{t.totalWealth}</span>
              <div className="text-2xl font-bold text-slate-200">{formatCurrency(results.totalWealth)} <span className="text-sm font-normal">{selectedCurrency.symbol}</span></div>
              
              <div className="mt-4 pt-4 border-t border-white/5 w-full">
                <span className="text-slate-500 text-xs">{t.nisabValue}: {formatCurrency(results.nisab)} {selectedCurrency.symbol}</span>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
              <span className="text-emerald-400 text-sm font-medium mb-1">{t.zakatDue}</span>
              {results.hasReachedNisab ? (
                <div className="text-4xl font-bold text-emerald-400">{formatCurrency(results.zakatDue)} <span className="text-base font-normal">{selectedCurrency.symbol}</span></div>
              ) : (
                <div className="text-xl font-medium text-slate-400 mt-2">{t.notReached}</div>
              )}
            </div>
          </div>

          {results.hasReachedNisab && results.zakatDue > 0 && (
            <div className="mt-6 flex justify-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-sm font-bold text-slate-100 shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
              >
                <Share2 size={18} />
                {t.shareWhatsapp}
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Placeholder: Middle AdSense */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm my-2">
        <div className="text-[10px] uppercase tracking-widest mb-1">{t.adMiddle}</div>
        <p className="text-[10px]">{t.adMiddleDesc}</p>
      </div>

      {/* About Section */}
      <article className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col gap-4 text-[13px] text-slate-300 leading-relaxed shadow-lg">
        <h2 className="text-lg font-bold text-emerald-400 border-b border-white/10 pb-4 mb-2">{t.aboutTitle}</h2>
        <div className="space-y-4">
          <p>{t.aboutP1}</p>
          <h3 className="text-base font-bold text-emerald-300 mt-4">{t.aboutH1}</h3>
          <ul className="list-disc list-inside space-y-2 mx-4 text-slate-400">
            <li>{t.list1}</li>
            <li>{t.list2}</li>
            <li>{t.list3}</li>
          </ul>
          <div className="mt-6 p-4 bg-emerald-900/20 border border-emerald-500/20 rounded-xl text-emerald-200/80 italic">
            {t.note}
          </div>
        </div>
      </article>
    </div>
  );
}
