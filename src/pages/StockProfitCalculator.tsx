import React, { useState, useMemo } from 'react';
import { Share2, TrendingUp, BarChart3, Info } from 'lucide-react';

const translations = {
  ar: {
    title: "حاسبة أرباح وخسائر الأسهم",
    subtitle: "احسب صافي أرباحك أو خسائرك من تداول الأسهم مع احتساب العمولات والضرائب.",
    sharesCount: "عدد الأسهم",
    buyPrice: "سعر الشراء للسهم",
    sellPrice: "سعر البيع للسهم",
    buyCommission: "عمولة الشراء",
    sellCommission: "عمولة البيع",
    commissionType: "نوع العمولة",
    fixed: "مبلغ ثابت",
    percentage: "نسبة (%)",
    taxRate: "ضريبة الأرباح (٪) - إن وجدت",
    calculate: "احسب الأرباح",
    totalInvestment: "إجمالي التكلفة (مع العمولة)",
    totalRevenue: "إجمالي العائد (بعد العمولة)",
    netProfit: "صافي الربح / الخسارة",
    roi: "العائد على الاستثمار (ROI)",
    shareWhatsapp: "مشاركة عبر واتساب",
    aboutTitle: "كيف تحسب أرباح الأسهم؟",
    aboutP1: "تساعدك هذه الحاسبة في معرفة الربح الصافي من صفقاتك في سوق الأسهم، وتأخذ في الاعتبار أدق التفاصيل مثل العمولات والضرائب.",
    aboutH1: "شرح المصطلحات:",
    list1: "العمولة: المبلغ الذي يأخذه الوسيط المالي (البروكر) عند كل عملية بيع وشراء، وقد يكون مبلغاً ثابتاً أو نسبة مئوية.",
    list2: "ضريبة الأرباح (Capital Gains Tax): ضريبة تفرضها بعض الدول على صافي الربح المحقق من بيع الأسهم.",
    list3: "العائد على الاستثمار (ROI): نسبة الربح أو الخسارة مقارنة برأس المال المستثمر.",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)"
  },
  en: {
    title: "Stock Profit Calculator",
    subtitle: "Calculate your net profit or loss from stock trading including commissions and taxes.",
    sharesCount: "Number of Shares",
    buyPrice: "Buy Price per Share",
    sellPrice: "Sell Price per Share",
    buyCommission: "Buy Commission",
    sellCommission: "Sell Commission",
    commissionType: "Commission Type",
    fixed: "Fixed Amount",
    percentage: "Percentage (%)",
    taxRate: "Capital Gains Tax (%) - Optional",
    calculate: "Calculate Profit",
    totalInvestment: "Total Cost (incl. commission)",
    totalRevenue: "Total Revenue (after commission)",
    netProfit: "Net Profit / Loss",
    roi: "Return on Investment (ROI)",
    shareWhatsapp: "Share via WhatsApp",
    aboutTitle: "How to calculate stock profit?",
    aboutP1: "This calculator helps you find out the net profit from your stock trades, taking into account details like broker commissions and taxes.",
    aboutH1: "Terms Explained:",
    list1: "Commission: The fee charged by the broker for each buy and sell transaction, which can be a fixed amount or a percentage.",
    list2: "Capital Gains Tax: A tax imposed by some countries on the net profit realized from selling stocks.",
    list3: "Return on Investment (ROI): The percentage of profit or loss compared to the invested capital.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)"
  }
};

export default function StockProfitCalculator({ lang }: { lang: 'ar' | 'en' }) {
  const [sharesCount, setSharesCount] = useState<number | ''>(100);
  const [buyPrice, setBuyPrice] = useState<number | ''>(150);
  const [sellPrice, setSellPrice] = useState<number | ''>(175);
  
  const [commissionType, setCommissionType] = useState<'fixed' | 'percentage'>('fixed');
  const [buyCommission, setBuyCommission] = useState<number | ''>(5);
  const [sellCommission, setSellCommission] = useState<number | ''>(5);
  
  const [taxRate, setTaxRate] = useState<number | ''>(0);

  const t = translations[lang];
  const isAr = lang === 'ar';

  const results = useMemo(() => {
    let q = Number(sharesCount) || 0;
    let bp = Number(buyPrice) || 0;
    let sp = Number(sellPrice) || 0;
    let bc = Number(buyCommission) || 0;
    let sc = Number(sellCommission) || 0;
    let tax = (Number(taxRate) || 0) / 100;

    const initialCost = q * bp;
    const finalValue = q * sp;

    const actualBuyCommission = commissionType === 'percentage' ? initialCost * (bc / 100) : bc;
    const actualSellCommission = commissionType === 'percentage' ? finalValue * (sc / 100) : sc;

    const totalInvestment = initialCost + actualBuyCommission;
    const totalRevenue = finalValue - actualSellCommission;

    const grossProfit = totalRevenue - totalInvestment;
    const taxAmount = grossProfit > 0 ? grossProfit * tax : 0;
    const netProfit = grossProfit - taxAmount;

    const roi = totalInvestment > 0 ? (netProfit / totalInvestment) * 100 : 0;

    return {
      totalInvestment,
      totalRevenue,
      netProfit,
      roi,
      taxAmount,
      isProfit: netProfit >= 0
    };
  }, [sharesCount, buyPrice, sellPrice, buyCommission, sellCommission, commissionType, taxRate]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
    }).format(val);
  };

  const shareText = encodeURIComponent(
    isAr 
      ? `حاسبة أرباح الأسهم: العائد ${results.roi.toFixed(2)}% | صافي الربح والخسارة: ${formatCurrency(results.netProfit)}!\nجرب حاسبة الأسهم: `
      : `Stock Profit Calculator: ROI ${results.roi.toFixed(2)}% | Net Profit: ${formatCurrency(results.netProfit)}!\nTry the stock calculator: `
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
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="text-center relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <BarChart3 size={32} className="text-white" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 mt-4">
          
          {/* Input Panel */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div>
               <label className="block text-sm font-medium text-slate-300 mb-2">{t.sharesCount}</label>
               <input
                 type="number"
                 value={sharesCount}
                 onChange={(e) => setSharesCount(e.target.value ? Number(e.target.value) : '')}
                 className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                 placeholder="100"
               />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">{t.buyPrice}</label>
                  <input
                    type="number"
                    value={buyPrice}
                    onChange={(e) => setBuyPrice(e.target.value ? Number(e.target.value) : '')}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  />
               </div>
               <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">{t.sellPrice}</label>
                  <input
                    type="number"
                    value={sellPrice}
                    onChange={(e) => setSellPrice(e.target.value ? Number(e.target.value) : '')}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  />
               </div>
            </div>

            <div className="bg-slate-800/30 p-4 rounded-xl border border-white/5 space-y-4">
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-slate-200">{t.commissionType}</label>
                    <div className="flex gap-1 p-1 bg-slate-900/80 rounded-lg text-xs">
                        <button onClick={()=>setCommissionType('fixed')} className={`px-3 py-1.5 rounded-md transition-colors ${commissionType==='fixed' ? 'bg-indigo-500/20 text-indigo-400 font-bold' : 'text-slate-400'}`}>{t.fixed}</button>
                        <button onClick={()=>setCommissionType('percentage')} className={`px-3 py-1.5 rounded-md transition-colors ${commissionType==='percentage' ? 'bg-indigo-500/20 text-indigo-400 font-bold' : 'text-slate-400'}`}>{t.percentage}</button>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs text-slate-400 mb-1">{t.buyCommission}</label>
                        <input
                            type="number"
                            value={buyCommission}
                            onChange={(e) => setBuyCommission(e.target.value ? Number(e.target.value) : '')}
                            className={`w-full bg-slate-900/50 border border-white/10 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50`}
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-slate-400 mb-1">{t.sellCommission}</label>
                        <input
                            type="number"
                            value={sellCommission}
                            onChange={(e) => setSellCommission(e.target.value ? Number(e.target.value) : '')}
                            className={`w-full bg-slate-900/50 border border-white/10 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50`}
                        />
                    </div>
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
                    className={`w-full bg-slate-900/50 border border-white/10 rounded-xl p-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${isAr ? 'pl-8' : 'pr-8'}`}
                    placeholder="0"
                />
                </div>
            </div>
          </div>

          {/* Result Panel */}
          <div className="lg:col-span-5 bg-slate-900/60 border border-indigo-500/10 rounded-2xl p-6 shadow-inner flex flex-col justify-between gap-6 relative overflow-hidden">
             
            <div>
              <p className="text-slate-400 text-sm font-medium mb-2 text-center">{t.netProfit}</p>
              <div className={`text-4xl md:text-5xl font-bold mb-2 text-center ${results.isProfit ? 'text-emerald-400' : 'text-rose-400'}`}>
                {results.netProfit > 0 ? '+' : ''}{formatCurrency(results.netProfit)}
              </div>
              <div className="flex justify-center">
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold ${results.isProfit ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                    <TrendingUp size={16} className={results.isProfit ? '' : 'rotate-180'} />
                    {results.roi.toFixed(2)}% ROI
                </div>
              </div>
            </div>

            <div className="h-px bg-white/5 w-full my-1"></div>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                <span className="text-slate-400">{t.totalInvestment}</span>
                <span className="text-slate-200 font-semibold">{formatCurrency(results.totalInvestment)}</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                <span className="text-slate-400">{t.totalRevenue}</span>
                <span className="text-slate-200 font-semibold">{formatCurrency(results.totalRevenue)}</span>
              </div>
            </div>

            {(results.totalInvestment > 0 || results.totalRevenue > 0) && (
              <div className="mt-2 flex justify-center">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-sm font-bold text-slate-100 shadow-lg shadow-indigo-600/20 transition-all active:scale-95 w-full"
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
            <Info size={20} className="text-indigo-400"/>
            <h2 className="text-lg font-bold text-indigo-400">{t.aboutTitle}</h2>
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
