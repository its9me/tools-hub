import React, { useState } from 'react';
import { Share2, Info, Youtube, DollarSign, BarChart2, TrendingUp, Calendar, Clock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const translations = {
  ar: {
    title: "حاسبة أرباح اليوتيوب التقديرية",
    subtitle: "احسب أرباحك المتوقعة من اليوتيوب بناءً على عدد المشاهدات اليومية ونسبة الـ RPM.",
    dailyViews: "عدد المشاهدات اليومية المتوقعة",
    rpm: "الربح لكل 1000 مشاهدة (RPM)",
    rpmDesc: "يتراوح عادة بين 0.5$ إلى 5$ حسب المحتوى والدول",
    dailyEarnings: "الأرباح اليومية",
    monthlyEarnings: "الأرباح الشهرية",
    yearlyEarnings: "الأرباح السنوية",
    earningsChartTitle: "توقعات الأرباح التراكمية (لمدة عام)",
    shareWhatsapp: "مشاركة الأداة",
    aboutTitle: "عن الأداة",
    aboutP1: "هذه الأداة تساعد منشئي المحتوى على يوتيوب في تقدير أرباحهم المحتملة. تعتمد الآلية على معادلة بسيطة تأخذ عدد المشاهدات وتضربها في الـ RPM (الأرباح لكل ألف مشاهدة) المتوقع. يُرجى ملاحظة أن هذه الأرقام تقديرية وقد تختلف بناءً على عوامل عديدة مثل نوع الإعلانات، متوسط مدة المشاهدة، والمنطقة الجغرافية للجمهور.",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)"
  },
  en: {
    title: "YouTube Earnings Calculator",
    subtitle: "Calculate your estimated YouTube earnings based on daily views and RPM.",
    dailyViews: "Expected Daily Views",
    rpm: "Earnings per 1,000 views (RPM)",
    rpmDesc: "Usually ranges from $0.5 to $5 depending on content and geography",
    dailyEarnings: "Daily Earnings",
    monthlyEarnings: "Monthly Earnings",
    yearlyEarnings: "Yearly Earnings",
    earningsChartTitle: "Cumulative Earnings Projection (1 Year)",
    shareWhatsapp: "Share Tool",
    aboutTitle: "About The Tool",
    aboutP1: "This tool helps YouTube content creators estimate their potential earnings. It uses a simple formula that multiplies the number of views by the expected RPM (Revenue Per Mille). Please note that these figures are estimated and can vary based on several factors such as ad types, average watch duration, and the audience's geographical region.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)"
  }
};

export default function YoutubeCalculator({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const [views, setViews] = useState<number>(10000);
  const [rpm, setRpm] = useState<number>(1.5);

  const dailyEarnings = (views / 1000) * rpm;
  const monthlyEarnings = dailyEarnings * 30;
  const yearlyEarnings = dailyEarnings * 365;

  const chartData = [];
  let cumulative = 0;
  for (let i = 1; i <= 12; i++) {
    cumulative += monthlyEarnings;
    chartData.push({
      month: isAr ? `شهر ${i}` : `Month ${i}`,
      earnings: Math.round(cumulative)
    });
  }

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat(lang === 'ar' ? 'ar-EG' : 'en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(val);
  };

  const formatNumber = (val: number) => {
    return new Intl.NumberFormat(lang === 'ar' ? 'ar-EG' : 'en-US').format(val);
  };

  const handleViewsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setViews(parseInt(e.target.value));
  };

  const handleRpmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRpm(parseFloat(e.target.value));
  };

  const generateShareText = () => {
    let str = isAr ? '*حاسبة أرباح اليوتيوب:*\n\n' : '*YouTube Earnings Calculator:*\n\n';
    str += isAr ? `احسب أرباحك المتوقعة من اليوتيوب بسهولة.\n\nجربها هنا: ` : `Estimate your YouTube earnings easily.\n\nTry it here: `;
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
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="text-center relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center mb-4 shadow-lg text-white">
            <Youtube size={32} />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">{t.subtitle}</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 lg:gap-10 relative z-10">
          
          {/* Controls */}
          <div className="flex-1 flex flex-col gap-6 bg-slate-900/50 p-6 rounded-2xl border border-white/5 shadow-inner">
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-slate-200">{t.dailyViews}</label>
                <div className="px-3 py-1 bg-slate-800 rounded-lg text-red-400 font-bold font-mono">
                  {formatNumber(views)}
                </div>
              </div>
              <input
                type="range"
                min="100"
                max="1000000"
                step="500"
                value={views}
                onChange={handleViewsChange}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-500"
                style={{ direction: 'ltr' }}
              />
              <div className="flex justify-between text-xs text-slate-500 font-mono">
                <span>100</span>
                <span>1,000,000</span>
              </div>
            </div>

            <hr className="border-white/5" />

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-slate-200">
                  {t.rpm}
                </label>
                <div className="px-3 py-1 bg-slate-800 rounded-lg text-emerald-400 font-bold font-mono">
                  {formatCurrency(rpm)}
                </div>
              </div>
              <p className="text-xs text-slate-400">{t.rpmDesc}</p>
              <input
                type="range"
                min="0.1"
                max="20"
                step="0.1"
                value={rpm}
                onChange={handleRpmChange}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                style={{ direction: 'ltr' }}
              />
              <div className="flex justify-between text-xs text-slate-500 font-mono">
                <span>$0.1</span>
                <span>$20.0</span>
              </div>
            </div>

          </div>

          {/* Results Summary */}
          <div className="flex-1 flex flex-col gap-4">
             <div className="p-5 bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl border border-white/10 flex items-center gap-4 shadow-lg">
                <div className="p-3 bg-red-500/20 text-red-400 rounded-xl">
                  <Clock size={24} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">{t.dailyEarnings}</p>
                  <p className="text-xl font-bold text-white tracking-widest">{formatCurrency(dailyEarnings)}</p>
                </div>
             </div>

             <div className="p-5 bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl border border-white/10 flex items-center gap-4 shadow-lg">
                <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl">
                  <Calendar size={24} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">{t.monthlyEarnings}</p>
                  <p className="text-2xl font-bold text-emerald-400 tracking-widest">{formatCurrency(monthlyEarnings)}</p>
                </div>
             </div>

             <div className="p-5 bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl border border-white/10 flex items-center gap-4 shadow-lg">
                <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">{t.yearlyEarnings}</p>
                  <p className="text-2xl font-bold text-blue-400 tracking-widest">{formatCurrency(yearlyEarnings)}</p>
                </div>
             </div>
          </div>

        </div>

        {/* Chart */}
        <div className="w-full bg-slate-900/30 rounded-2xl border border-white/5 p-4 md:p-6 relative z-10 flex flex-col pt-6">
           <h3 className="text-sm font-bold text-slate-300 mb-6 flex items-center gap-2">
             <BarChart2 size={18} className="text-red-400" />
             {t.earningsChartTitle}
           </h3>
           <div className="w-full h-64 md:h-80" dir="ltr">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                 <defs>
                   <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                 <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                 <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                 <Tooltip 
                   contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }}
                   itemStyle={{ color: '#34d399', fontWeight: 'bold' }}
                   formatter={(value: number) => [`$${value}`, isAr ? 'الأرباح' : 'Earnings']}
                   labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                 />
                 <Area type="monotone" dataKey="earnings" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorEarnings)" />
               </AreaChart>
             </ResponsiveContainer>
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
