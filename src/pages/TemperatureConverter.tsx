import React, { useState } from 'react';
import { Share2, Info, Thermometer, ThermometerSnowflake, ThermometerSun, RefreshCw } from 'lucide-react';

const translations = {
  ar: {
    title: "محول درجات الحرارة",
    subtitle: "تحويل لحظي وفوري بين وحدات القياس الحرارية المختلفة مع توضيح النقاط المرجعية.",
    celsius: "سيلزيوس (°C)",
    fahrenheit: "فهرنهايت (°F)",
    kelvin: "كلفن (K)",
    rankine: "رانكين (°R)",
    freeze: "التجمد (الماء)",
    boil: "الغليان (الماء)",
    clear: "مسح الحقول",
    shareWhatsapp: "مشاركة الأداة",
    aboutTitle: "عن الأداة",
    aboutP1: "أداة علمية دقيقة لتحويل درجات الحرارة بين مقاييس السيلزيوس، الفهرنهايت، الكلفن، والرانكين بشكل فوري. كما توفر عرضاً لنقاط تجمد وغليان الماء على كل مقياس كمرجع فيزيائي.",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)"
  },
  en: {
    title: "Temperature Converter",
    subtitle: "Instant conversion between different temperature scales with reference points.",
    celsius: "Celsius (°C)",
    fahrenheit: "Fahrenheit (°F)",
    kelvin: "Kelvin (K)",
    rankine: "Rankine (°R)",
    freeze: "Freezing Point (H₂O)",
    boil: "Boiling Point (H₂O)",
    clear: "Clear Fields",
    shareWhatsapp: "Share Tool",
    aboutTitle: "About The Tool",
    aboutP1: "An accurate scientific tool for converting temperatures between Celsius, Fahrenheit, Kelvin, and Rankine scales instantly. It also provides the freezing and boiling points of water on each scale as a physical reference.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)"
  }
};

export default function TemperatureConverter({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const [celsius, setCelsius] = useState('');
  const [fahrenheit, setFahrenheit] = useState('');
  const [kelvin, setKelvin] = useState('');
  const [rankine, setRankine] = useState('');

  const formatNumber = (num: number) => {
    return Number.isInteger(num) ? num.toString() : num.toFixed(3).replace(/\.?0+$/, '');
  };

  const cleanInput = (val: string) => {
    let cleanVal = val.replace(/[^0-9.-]/g, '');
    const parts = cleanVal.split('.');
    if (parts.length > 2) cleanVal = parts[0] + '.' + parts.slice(1).join('');
    // Ensure only one minus sign at the start
    if (cleanVal.indexOf('-') > 0) cleanVal = cleanVal.replace(/-/g, '');
    return cleanVal;
  };

  const updateFromCelsius = (cValue: string) => {
    setCelsius(cValue);
    const c = parseFloat(cValue);
    if (isNaN(c)) {
      setFahrenheit(''); setKelvin(''); setRankine('');
      return;
    }
    setFahrenheit(formatNumber((c * 9/5) + 32));
    setKelvin(formatNumber(c + 273.15));
    setRankine(formatNumber((c + 273.15) * 9/5));
  };

  const updateFromFahrenheit = (fValue: string) => {
    setFahrenheit(fValue);
    const f = parseFloat(fValue);
    if (isNaN(f)) {
      setCelsius(''); setKelvin(''); setRankine('');
      return;
    }
    const c = (f - 32) * 5/9;
    setCelsius(formatNumber(c));
    setKelvin(formatNumber(c + 273.15));
    setRankine(formatNumber(f + 459.67));
  };

  const updateFromKelvin = (kValue: string) => {
    setKelvin(kValue);
    const k = parseFloat(kValue);
    if (isNaN(k)) {
      setCelsius(''); setFahrenheit(''); setRankine('');
      return;
    }
    const c = k - 273.15;
    setCelsius(formatNumber(c));
    setFahrenheit(formatNumber((c * 9/5) + 32));
    setRankine(formatNumber(k * 9/5));
  };

  const updateFromRankine = (rValue: string) => {
    setRankine(rValue);
    const r = parseFloat(rValue);
    if (isNaN(r)) {
      setCelsius(''); setFahrenheit(''); setKelvin('');
      return;
    }
    const k = r * 5/9;
    const c = k - 273.15;
    setKelvin(formatNumber(k));
    setCelsius(formatNumber(c));
    setFahrenheit(formatNumber(r - 459.67));
  };

  const handleClear = () => {
    setCelsius('');
    setFahrenheit('');
    setKelvin('');
    setRankine('');
  };

  const generateShareText = () => {
    let str = isAr ? '*محول درجات الحرارة:*\n\n' : '*Temperature Converter:*\n\n';
    if (celsius) {
      str += `°C: ${celsius}\n°F: ${fahrenheit}\nK: ${kelvin}\n°R: ${rankine}\n\n`;
    }
    str += isAr ? `قم بتحويل الحرارة فورياً هنا: ` : `Convert temperatures instantly here: `;
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
          <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-rose-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg text-white">
            <Thermometer size={32} />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 w-full">
          
          {/* Celsius */}
          <div className="flex flex-col gap-2 relative group">
              <label className="text-sm font-bold text-slate-300 flex items-center justify-between">
                 <div className="flex items-center gap-2">
                     <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-black">C</span>
                     {t.celsius}
                 </div>
              </label>
              <div className="relative">
                  <input 
                    type="text" 
                    value={celsius} 
                    onChange={(e) => updateFromCelsius(cleanInput(e.target.value))} 
                    placeholder="0"
                    className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 pr-12 text-white text-lg outline-none focus:ring-2 focus:ring-red-500/50 transition-all font-mono shadow-inner"
                    dir="ltr"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">°C</span>
              </div>
              <div className="flex items-center justify-between mt-1 px-1">
                  <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-medium">
                      <ThermometerSnowflake size={14} /> <span>0 °C {t.freeze}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-orange-400 font-medium">
                      <ThermometerSun size={14} /> <span dir="ltr">100 °C {t.boil}</span>
                  </div>
              </div>
          </div>

          {/* Fahrenheit */}
          <div className="flex flex-col gap-2 relative group">
              <label className="text-sm font-bold text-slate-300 flex items-center justify-between">
                 <div className="flex items-center gap-2">
                     <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-xs font-black">F</span>
                     {t.fahrenheit}
                 </div>
              </label>
              <div className="relative">
                  <input 
                    type="text" 
                    value={fahrenheit} 
                    onChange={(e) => updateFromFahrenheit(cleanInput(e.target.value))} 
                    placeholder="32"
                    className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 pr-12 text-white text-lg outline-none focus:ring-2 focus:ring-red-500/50 transition-all font-mono shadow-inner"
                    dir="ltr"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">°F</span>
              </div>
              <div className="flex items-center justify-between mt-1 px-1">
                  <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-medium">
                      <ThermometerSnowflake size={14} /> <span dir="ltr">32 °F {t.freeze}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-orange-400 font-medium">
                      <ThermometerSun size={14} /> <span dir="ltr">212 °F {t.boil}</span>
                  </div>
              </div>
          </div>

          {/* Kelvin */}
          <div className="flex flex-col gap-2 relative group">
              <label className="text-sm font-bold text-slate-300 flex items-center justify-between">
                 <div className="flex items-center gap-2">
                     <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-black">K</span>
                     {t.kelvin}
                 </div>
              </label>
              <div className="relative">
                  <input 
                    type="text" 
                    value={kelvin} 
                    onChange={(e) => updateFromKelvin(cleanInput(e.target.value))} 
                    placeholder="273.15"
                    className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 pr-12 text-white text-lg outline-none focus:ring-2 focus:ring-red-500/50 transition-all font-mono shadow-inner"
                    dir="ltr"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">K</span>
              </div>
              <div className="flex items-center justify-between mt-1 px-1">
                  <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-medium">
                      <ThermometerSnowflake size={14} /> <span dir="ltr">273.15 K {t.freeze}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-orange-400 font-medium">
                      <ThermometerSun size={14} /> <span dir="ltr">373.15 K {t.boil}</span>
                  </div>
              </div>
          </div>

          {/* Rankine */}
          <div className="flex flex-col gap-2 relative group">
              <label className="text-sm font-bold text-slate-300 flex items-center justify-between">
                 <div className="flex items-center gap-2">
                     <span className="w-6 h-6 rounded-full bg-fuchsia-500/20 text-fuchsia-400 flex items-center justify-center text-xs font-black">R</span>
                     {t.rankine}
                 </div>
              </label>
              <div className="relative">
                  <input 
                    type="text" 
                    value={rankine} 
                    onChange={(e) => updateFromRankine(cleanInput(e.target.value))} 
                    placeholder="491.67"
                    className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 pr-12 text-white text-lg outline-none focus:ring-2 focus:ring-red-500/50 transition-all font-mono shadow-inner"
                    dir="ltr"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">°R</span>
              </div>
              <div className="flex items-center justify-between mt-1 px-1">
                  <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-medium">
                      <ThermometerSnowflake size={14} /> <span dir="ltr">491.67 °R {t.freeze}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-orange-400 font-medium">
                      <ThermometerSun size={14} /> <span dir="ltr">671.67 °R {t.boil}</span>
                  </div>
              </div>
          </div>

        </div>
        
        <div className="flex justify-center md:hidden pt-2">
            <button onClick={handleClear} className="flex items-center gap-2 text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 px-4 py-2 rounded-lg text-sm font-bold border border-rose-500/20 transition-all">
                <RefreshCw size={14} /> {t.clear}
            </button>
        </div>

        <div className="hidden md:flex justify-center pt-4 relative z-10 w-full mt-2 border-t border-white/5 items-center gap-4">
            <button onClick={handleClear} className="flex items-center gap-2 text-slate-400 hover:text-white mt-4 bg-slate-800/50 hover:bg-slate-700 px-6 py-3 rounded-xl text-sm font-bold border border-white/10 transition-all">
                <RefreshCw size={16} /> {t.clear}
            </button>
            <a
              href={`https://wa.me/?text=${generateShareText()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 mt-4 px-8 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm font-bold text-white shadow-lg transition-all border border-white/10"
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
