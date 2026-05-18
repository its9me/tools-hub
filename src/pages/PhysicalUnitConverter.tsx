import React, { useState, useEffect } from 'react';
import { ArrowLeftRight, Activity, Share2, Info } from 'lucide-react';

const unitTypes = {
  speed: {
    id: 'speed',
    nameAr: 'السرعة',
    nameEn: 'Speed',
    units: [
      { id: 'm_s', nameAr: 'متر / ثانية (m/s)', nameEn: 'Meter/second (m/s)', factorToBase: 1 }, // Base
      { id: 'km_h', nameAr: 'كيلومتر / ساعة (km/h)', nameEn: 'Kilometer/hour (km/h)', factorToBase: 1 / 3.6 },
      { id: 'mph', nameAr: 'ميل / ساعة (mph)', nameEn: 'Miles/hour (mph)', factorToBase: 0.44704 },
      { id: 'knot', nameAr: 'عقدة (knot)', nameEn: 'Knot', factorToBase: 0.514444 },
      { id: 'ft_s', nameAr: 'قدم / ثانية (ft/s)', nameEn: 'Foot/second (ft/s)', factorToBase: 0.3048 },
    ]
  },
  force: {
    id: 'force',
    nameAr: 'القوة',
    nameEn: 'Force',
    units: [
      { id: 'N', nameAr: 'نيوتن (N)', nameEn: 'Newton (N)', factorToBase: 1 }, // Base
      { id: 'kN', nameAr: 'كيلونيوتن (kN)', nameEn: 'Kilonewton (kN)', factorToBase: 1000 },
      { id: 'dyne', nameAr: 'داين (dyne)', nameEn: 'Dyne (dyn)', factorToBase: 0.00001 },
      { id: 'lbf', nameAr: 'باوند قوة (lbf)', nameEn: 'Pound-force (lbf)', factorToBase: 4.4482216 },
      { id: 'kgf', nameAr: 'كيلوجرام قوة (kgf)', nameEn: 'Kilogram-force (kgf)', factorToBase: 9.80665 },
    ]
  },
  pressure: {
    id: 'pressure',
    nameAr: 'الضغط',
    nameEn: 'Pressure',
    units: [
      { id: 'Pa', nameAr: 'باسكال (Pa)', nameEn: 'Pascal (Pa)', factorToBase: 1 }, // Base
      { id: 'kPa', nameAr: 'كيلوباسكال (kPa)', nameEn: 'Kilopascal (kPa)', factorToBase: 1000 },
      { id: 'bar', nameAr: 'بار (bar)', nameEn: 'Bar', factorToBase: 100000 },
      { id: 'psi', nameAr: 'رطل لكل بوصة مربعة (psi)', nameEn: 'Pound/sq inch (psi)', factorToBase: 6894.75729 },
      { id: 'atm', nameAr: 'ضغط جوي (atm)', nameEn: 'Atmosphere (atm)', factorToBase: 101325 },
      { id: 'torr', nameAr: 'تور / ملم زئبق (Torr/mmHg)', nameEn: 'Torr (mmHg)', factorToBase: 133.322368 },
    ]
  }
};

const translations = {
  ar: {
    title: "محول الوحدات الفيزيائية",
    subtitle: "تحويل وحدات السرعة، القوة، والضغط بسهولة ودقة.",
    typeLabel: "نوع القياس",
    fromLabel: "من وحدة",
    toLabel: "إلى وحدة",
    valueLabel: "القيمة",
    resultLabel: "النتيجة",
    shareWhatsapp: "مشاركة النتيجة",
    aboutTitle: "عن محول الوحدات الفيزيائية",
    aboutP1: "أداة سريعة ودقيقة للطلاب والمهندسين لتحويل أكثر الوحدات الفيزيائية استخداماً: السرعة، القوة، والضغط. تعتمد الأداة على عوامل التحويل العالمية القياسية (SI).",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)"
  },
  en: {
    title: "Physics Unit Converter",
    subtitle: "Convert units for speed, force, and pressure easily and accurately.",
    typeLabel: "Measurement Type",
    fromLabel: "From Unit",
    toLabel: "To Unit",
    valueLabel: "Value",
    resultLabel: "Result",
    shareWhatsapp: "Share Result",
    aboutTitle: "About Physics Unit Converter",
    aboutP1: "A quick and accurate tool for students and engineers to convert commonly used physical units: Speed, Force, and Pressure. Based on standard International System of Units (SI) conversion factors.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)"
  }
};

export default function PhysicalUnitConverter({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const [measurementType, setMeasurementType] = useState<keyof typeof unitTypes>('speed');
  
  const [fromUnit, setFromUnit] = useState(unitTypes.speed.units[1].id); // km/h generally default
  const [toUnit, setToUnit] = useState(unitTypes.speed.units[0].id); // m/s default
  
  const [fromValue, setFromValue] = useState<string>('1');
  const [toValue, setToValue] = useState<string>('');

  useEffect(() => {
    // Reset units when type changes
    const currentUnits = unitTypes[measurementType].units;
    setFromUnit(currentUnits[1]?.id || currentUnits[0].id);
    setToUnit(currentUnits[0].id);
  }, [measurementType]);

  useEffect(() => {
    calculateConversion(fromValue, fromUnit, toUnit, 'forward');
  }, [fromValue, fromUnit, toUnit, measurementType]);

  const calculateConversion = (val: string, fromId: string, toId: string, direction: 'forward' | 'backward') => {
    if (val === '' || isNaN(Number(val))) {
      if (direction === 'forward') setToValue('');
      else setFromValue('');
      return;
    }

    const units = unitTypes[measurementType].units;
    const fromUnitObj = units.find(u => u.id === fromId);
    const toUnitObj = units.find(u => u.id === toId);

    if (!fromUnitObj || !toUnitObj) return;

    const numVal = Number(val);
    
    if (direction === 'forward') {
      const baseVal = numVal * fromUnitObj.factorToBase;
      const result = baseVal / toUnitObj.factorToBase;
      setToValue(formatNumber(result));
    } else {
      const baseVal = numVal * toUnitObj.factorToBase;
      const result = baseVal / fromUnitObj.factorToBase;
      setFromValue(formatNumber(result));
    }
  };

  const formatNumber = (num: number) => {
    // Avoid scientific notation for reasonable bounds, but allow for very small/large
    if (Math.abs(num) < 0.000001 && num !== 0) return num.toExponential(4);
    if (Math.abs(num) > 10000000) return num.toExponential(4);
    
    // Convert to string and remove trailing zeros if it has decimals
    let str = num.toFixed(6);
    str = str.replace(/\.?0+$/, '');
    return str;
  };

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromValue(e.target.value);
    calculateConversion(e.target.value, fromUnit, toUnit, 'forward');
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToValue(e.target.value);
    calculateConversion(e.target.value, fromUnit, toUnit, 'backward');
  };

  const getUnitName = (targetUnitId: string, type: keyof typeof unitTypes) => {
     const tUnit = unitTypes[type].units.find(u => u.id === targetUnitId);
     if (!tUnit) return '';
     return isAr ? tUnit.nameAr : tUnit.nameEn;
  };

  const swapUnits = () => {
    const tempF = fromUnit;
    const tempT = toUnit;
    setFromUnit(tempT);
    setToUnit(tempF);
    
    // Also swap values to keep it mathematically correct
    const tempFv = fromValue;
    setFromValue(toValue);
    calculateConversion(toValue, tempT, tempF, 'forward');
  };

  const shareText = encodeURIComponent(
    isAr 
      ? `محول الوحدات الفيزيائية:\n${fromValue} ${getUnitName(fromUnit, measurementType)} = ${toValue} ${getUnitName(toUnit, measurementType)}\nاحسبها هنا: `
      : `Physics Unit Converter:\n${fromValue} ${getUnitName(fromUnit, measurementType)} = ${toValue} ${getUnitName(toUnit, measurementType)}\nCalculate here: `
  );
  const whatsappUrl = `https://wa.me/?text=${shareText}${encodeURIComponent(window.location.href)}`;

  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto">
      {/* Top AdSense */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm">
        <div className="text-[10px] uppercase tracking-widest mb-1">{t.adTop}</div>
        <p className="text-[10px]">{t.adTopDesc}</p>
      </div>

      <section className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl flex flex-col gap-6 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="text-center relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <Activity size={32} className="text-white" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400">{t.subtitle}</p>
        </div>

        <div className="relative z-10 space-y-6 mt-4">
          
          <div className="flex justify-center">
            <div className="bg-slate-900/40 p-2 rounded-xl flex flex-wrap gap-2 justify-center border border-white/5">
              {(Object.keys(unitTypes) as Array<keyof typeof unitTypes>).map((typeKey) => (
                <button
                  key={typeKey}
                  onClick={() => setMeasurementType(typeKey)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${measurementType === typeKey ? 'bg-fuchsia-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
                >
                  {isAr ? unitTypes[typeKey].nameAr : unitTypes[typeKey].nameEn}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center bg-slate-900/20 p-6 rounded-2xl border border-white/5">
            
            <div className="flex flex-col gap-3">
               <div>
                 <select
                    value={fromUnit}
                    onChange={(e) => setFromUnit(e.target.value)}
                    className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50"
                    dir={isAr ? 'rtl' : 'ltr'}
                  >
                    {unitTypes[measurementType].units.map(u => (
                      <option key={u.id} value={u.id}>{isAr ? u.nameAr : u.nameEn}</option>
                    ))}
                  </select>
               </div>
               <input
                 type="number"
                 value={fromValue}
                 onChange={handleFromChange}
                 placeholder={t.valueLabel}
                 className="w-full bg-slate-800 border border-white/10 rounded-xl p-4 text-xl text-center font-bold text-slate-200 outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all"
               />
            </div>

            <div className="flex justify-center">
              <button 
                 onClick={swapUnits}
                 className="w-12 h-12 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-slate-400 hover:text-fuchsia-400 hover:border-fuchsia-500/50 transition-colors shadow-lg active:scale-95"
              >
                <ArrowLeftRight size={20} />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <div>
                 <select
                    value={toUnit}
                    onChange={(e) => setToUnit(e.target.value)}
                    className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50"
                    dir={isAr ? 'rtl' : 'ltr'}
                  >
                    {unitTypes[measurementType].units.map(u => (
                      <option key={u.id} value={u.id}>{isAr ? u.nameAr : u.nameEn}</option>
                    ))}
                  </select>
               </div>
               <input
                 type="number"
                 value={toValue}
                 onChange={handleToChange}
                 placeholder={t.resultLabel}
                 className="w-full bg-fuchsia-900/20 border border-fuchsia-500/30 rounded-xl p-4 text-xl text-center font-bold text-fuchsia-400 outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all"
               />
            </div>

          </div>

          <div className="flex justify-center pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-fuchsia-600 hover:bg-fuchsia-500 rounded-xl text-sm font-bold text-white shadow-lg shadow-fuchsia-600/20 transition-all active:scale-95"
            >
              <Share2 size={18} />
              {t.shareWhatsapp}
            </a>
          </div>

        </div>
      </section>

      {/* Middle AdSense */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm my-2">
        <div className="text-[10px] uppercase tracking-widest mb-1">{t.adMiddle}</div>
        <p className="text-[10px]">{t.adMiddleDesc}</p>
      </div>

      <article className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col gap-4 text-[13px] text-slate-300 leading-relaxed shadow-lg">
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-2">
            <Info size={20} className="text-fuchsia-400"/>
            <h2 className="text-lg font-bold text-fuchsia-400">{t.aboutTitle}</h2>
        </div>
        <div className="space-y-4">
          <p>{t.aboutP1}</p>
        </div>
      </article>

    </div>
  );
}
