import React, { useState } from 'react';
import { Share2, Info, Activity, Radio, RefreshCw, Zap } from 'lucide-react';

const translations = {
  ar: {
    title: "حاسبة التردد والطول الموجي",
    subtitle: "تطبيق معادلات سرعة الضوء والصوت لحساب التردد والطول الموجي مع تحديد نوع الموجة بدقة.",
    waveType: "نوع الموجة وسرعتها (v)",
    light: "كهرومغناطيسية / ضوء (299,792,458 m/s)",
    sound: "صوتية في الهواء (343 m/s)",
    frequency: "التردد (f) بـ Hz",
    freqPlaceholder: "مثال: 5e14",
    wavelength: "الطول الموجي (λ) بـ m",
    wavePlaceholder: "مثال: 600e-9",
    spectrum: "النطاق الطيفي / نوع الموجة",
    clear: "مسح الحقول",
    formulaInfo: "المعادلة الأساسية",
    categories: {
      gamma: "أشعة غاما (Gamma Rays)",
      xray: "الأشعة السينية (X-Rays)",
      uv: "الأشعة فوق البنفسجية (Ultraviolet)",
      visible: "الضوء المرئي (Visible Light)",
      ir: "الأشعة تحت الحمراء (Infrared)",
      microwave: "موجات دقيقة (Microwaves)",
      radio: "موجات راديو (Radio Waves)",
      sound: "موجة صوتية ميكانيكية",
      unknown: "غير معروف"
    },
    shareWhatsapp: "مشاركة الأداة",
    aboutTitle: "عن الأداة",
    aboutP1: "أداة فيزيائية لحساب العلاقة العكسية بين التردد والطول الموجي بناءً على سرعة الموجة. تدعم الموجات الكهرومغناطيسية والصوتية وتقوم بتحديد نوع الطيف الكهرومغناطيسي (مثل: راديو، ضوء مرئي، أشعة سينية) بشكل تلقائي.",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)"
  },
  en: {
    title: "Frequency & Wavelength Calculator",
    subtitle: "Apply light and sound speed equations to calculate frequency and wavelength, and identify the wave type.",
    waveType: "Wave Type & Speed (v)",
    light: "Electromagnetic / Light (299,792,458 m/s)",
    sound: "Acoustic in Air (343 m/s)",
    frequency: "Frequency (f) in Hz",
    freqPlaceholder: "e.g. 5e14",
    wavelength: "Wavelength (λ) in m",
    wavePlaceholder: "e.g. 600e-9",
    spectrum: "Spectral Band / Wave Type",
    clear: "Clear Fields",
    formulaInfo: "Basic Formula",
    categories: {
      gamma: "Gamma Rays",
      xray: "X-Rays",
      uv: "Ultraviolet",
      visible: "Visible Light",
      ir: "Infrared",
      microwave: "Microwaves",
      radio: "Radio Waves",
      sound: "Mechanical Sound Wave",
      unknown: "Unknown"
    },
    shareWhatsapp: "Share Tool",
    aboutTitle: "About The Tool",
    aboutP1: "A physics tool to calculate the inverse relationship between frequency and wavelength based on wave speed. It supports both electromagnetic and acoustic waves, and automatically categorizes the electromagnetic spectrum (e.g., Radio, Visible Light, X-rays).",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)"
  }
};

const SPEED_LIGHT = 299792458; // m/s
const SPEED_SOUND = 343; // m/s

export default function WaveCalculator({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const [speedType, setSpeedType] = useState<'light' | 'sound'>('light');
  const [frequency, setFrequency] = useState('');
  const [wavelength, setWavelength] = useState('');

  const getSpeed = () => speedType === 'light' ? SPEED_LIGHT : SPEED_SOUND;

  const updateFromFrequency = (val: string) => {
    setFrequency(val);
    const f = parseFloat(val);
    if (!isNaN(f) && f > 0) {
      const w = getSpeed() / f;
      setWavelength(w.toExponential(4).replace(/\+/, ''));
    } else if (val === '') {
      setWavelength('');
    }
  };

  const updateFromWavelength = (val: string) => {
    setWavelength(val);
    const w = parseFloat(val);
    if (!isNaN(w) && w > 0) {
      const f = getSpeed() / w;
      setFrequency(f.toExponential(4).replace(/\+/, ''));
    } else if (val === '') {
      setFrequency('');
    }
  };

  const handleSpeedChange = (type: 'light' | 'sound') => {
    setSpeedType(type);
    // recalculate wavelength based on current frequency
    const f = parseFloat(frequency);
    if (!isNaN(f) && f > 0) {
      const speed = type === 'light' ? SPEED_LIGHT : SPEED_SOUND;
      const w = speed / f;
      setWavelength(w.toExponential(4).replace(/\+/, ''));
    }
  };

  const cleanInput = (val: string) => val.replace(/[^0-9.eE+-]/g, '');

  const getSpectrumCategory = () => {
    if (speedType === 'sound') {
      const f = parseFloat(frequency);
      if (isNaN(f)) return '';
      return t.categories.sound;
    }

    const f = parseFloat(frequency);
    if (isNaN(f)) return '';

    if (f >= 3e19) return t.categories.gamma;
    if (f >= 3e16) return t.categories.xray;
    if (f >= 7.5e14) return t.categories.uv;
    if (f >= 4e14) return t.categories.visible;
    if (f >= 3e11) return t.categories.ir;
    if (f >= 3e8) return t.categories.microwave;
    if (f > 0) return t.categories.radio;
    
    return t.categories.unknown;
  };

  const getSpectrumColor = () => {
    const cat = getSpectrumCategory();
    if (cat === t.categories.gamma) return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
    if (cat === t.categories.xray) return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20';
    if (cat === t.categories.uv) return 'text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20';
    if (cat === t.categories.visible) return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
    if (cat === t.categories.ir) return 'text-red-400 bg-red-500/10 border-red-500/20';
    if (cat === t.categories.microwave) return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
    if (cat === t.categories.radio) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    if (cat === t.categories.sound) return 'text-sky-400 bg-sky-500/10 border-sky-500/20';
    return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
  };

  const clearAll = () => {
    setFrequency('');
    setWavelength('');
  };

  const generateShareText = () => {
    let str = isAr ? '*حاسبة التردد والطول الموجي:*\n\n' : '*Wave Calculator:*\n\n';
    if (frequency && wavelength) {
      str += `Frequency (f) = ${frequency} Hz\n`;
      str += `Wavelength (λ) = ${wavelength} m\n`;
      str += `Type: ${getSpectrumCategory()}\n\n`;
    }
    str += isAr ? `احسب خصائص الموجات هنا: ` : `Calculate wave properties here: `;
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
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-violet-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="text-center relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-violet-400 to-fuchsia-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg text-white">
            <Radio size={32} />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10 w-full items-start">
          
          {/* Inputs Section */}
          <div className="flex flex-col gap-5 w-full bg-slate-900/40 p-6 rounded-2xl border border-white/5 shadow-inner">
             
             <div className="flex justify-between items-center mb-2 border-b border-white/10 pb-4">
                 <h3 className="font-bold text-slate-200 flex items-center gap-2">
                     <Activity size={18} className="text-violet-400" />
                     {isAr ? 'مدخلات الموجة' : 'Wave Inputs'}
                 </h3>
                 <button onClick={clearAll} className="text-xs text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1 transition-colors">
                     <RefreshCw size={12}/>{t.clear}
                 </button>
             </div>

             <div className="flex flex-col gap-4">
                 
                 {/* Speed Type */}
                 <div className="flex flex-col gap-2">
                     <label className="text-xs font-bold text-slate-400">{t.waveType}</label>
                     <div className="flex gap-2">
                        <button 
                           onClick={() => handleSpeedChange('light')}
                           className={`flex-1 py-3 px-2 rounded-xl text-xs font-bold border transition-colors ${speedType === 'light' ? 'bg-violet-500/20 border-violet-500/50 text-violet-300' : 'bg-slate-800 border-white/5 text-slate-400 hover:bg-slate-700'}`}
                        >
                           {t.light}
                        </button>
                        <button 
                           onClick={() => handleSpeedChange('sound')}
                           className={`flex-1 py-3 px-2 rounded-xl text-xs font-bold border transition-colors ${speedType === 'sound' ? 'bg-sky-500/20 border-sky-500/50 text-sky-300' : 'bg-slate-800 border-white/5 text-slate-400 hover:bg-slate-700'}`}
                        >
                           {t.sound}
                        </button>
                     </div>
                 </div>

                 {/* Frequency */}
                 <div className="flex flex-col gap-1">
                     <label className="text-xs font-bold text-slate-400">{t.frequency}</label>
                     <div className="relative">
                         <input 
                           type="text" 
                           value={frequency} 
                           onChange={(e) => updateFromFrequency(cleanInput(e.target.value))}
                           placeholder={t.freqPlaceholder}
                           className="w-full bg-slate-800 border border-white/10 rounded-xl p-4 pr-12 text-white outline-none focus:ring-2 focus:ring-violet-500/50 transition-all font-mono"
                           dir="ltr"
                         />
                         <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs font-bold bg-slate-900 px-1.5 py-0.5 rounded">Hz</span>
                     </div>
                 </div>

                 {/* Wavelength */}
                 <div className="flex flex-col gap-1">
                     <label className="text-xs font-bold text-slate-400">{t.wavelength}</label>
                     <div className="relative">
                         <input 
                           type="text" 
                           value={wavelength} 
                           onChange={(e) => updateFromWavelength(cleanInput(e.target.value))}
                           placeholder={t.wavePlaceholder}
                           className="w-full bg-slate-800 border border-white/10 rounded-xl p-4 pr-12 text-white outline-none focus:ring-2 focus:ring-violet-500/50 transition-all font-mono"
                           dir="ltr"
                         />
                         <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs font-bold bg-slate-900 px-1.5 py-0.5 rounded">m</span>
                     </div>
                 </div>

             </div>

          </div>

          {/* Visualization / Info Area */}
          <div className="flex flex-col gap-5 w-full">
             
             {/* Category & Spectrum result */}
             <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 shadow-inner flex flex-col gap-4">
                 <h3 className="font-bold text-slate-300 text-sm">{t.spectrum}</h3>
                 
                 <div className={`p-6 rounded-xl border flex items-center justify-center text-center transition-colors shadow-sm ${getSpectrumColor()}`}>
                     <span className="text-xl font-bold">{getSpectrumCategory() || '---'}</span>
                 </div>
                 
                 {/* Formula Display */}
                 <div className="mt-2 bg-slate-800 p-4 rounded-xl border border-white/5 flex flex-col items-center gap-2">
                     <div className="text-xs text-slate-400 font-bold uppercase">{t.formulaInfo}</div>
                     <div className="flex items-center gap-3 font-mono text-lg font-black text-white bg-slate-900 px-4 py-2 rounded-lg border border-white/10">
                         <span className="text-violet-400">v</span>
                         <span className="text-slate-500">=</span>
                         <span className="text-fuchsia-400">f</span>
                         <span className="text-slate-500">×</span>
                         <span className="text-sky-400">λ</span>
                     </div>
                     <div className="text-[10px] text-slate-500 mt-1 font-mono">
                         v = {speedType === 'light' ? 'c (' + SPEED_LIGHT + ')' : SPEED_SOUND} m/s
                     </div>
                 </div>

             </div>

          </div>

        </div>
        
        <div className="hidden md:flex justify-center pt-4 relative z-10 w-full mt-4 border-t border-white/5">
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
            <Info size={20} className="text-violet-400"/>
            <h2 className="text-lg font-bold text-violet-400">{t.aboutTitle}</h2>
        </div>
        <div className="space-y-4">
          <p>{t.aboutP1}</p>
        </div>
      </article>

    </div>
  );
}
