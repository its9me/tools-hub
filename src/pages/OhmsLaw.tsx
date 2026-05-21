import React, { useState } from 'react';
import { Share2, Info, Zap, RefreshCw, Activity, Cpu } from 'lucide-react';

const translations = {
  ar: {
    title: "حاسبة قانون أوم (Ohm's Law)",
    subtitle: "أدخل قيمتين فقط من الجهد، التيار، أو المقاومة وسيتم حساب القيمة الثالثة فوراً.",
    voltage: "الجهد الكهربائي (V)",
    voltagePlaceholder: "مثال: 12",
    current: "التيار الكهربائي (I)",
    currentPlaceholder: "مثال: 2",
    resistance: "المقاومة الكهربائية (R)",
    resistancePlaceholder: "مثال: 6",
    volts: "فولت (V)",
    amps: "أمبير (A)",
    ohms: "أوم (Ω)",
    clear: "مسح الحقول",
    formulaInfo: "المعادلات المستخدمة",
    shareWhatsapp: "مشاركة الأداة",
    aboutTitle: "عن الأداة",
    aboutP1: "أداة هندسية دقيقة لحساب قانون أوم. تتيح لك الأداة إدخال أية قيمتين لتستخرج القيمة الثالثة آلياً في الوقت الفعلي. مفيدة لمهندسي الكهرباء والإلكترونيات وطلاب العلوم لحساب الجهد أو التيار أو المقاومة بشكل سريع.",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)"
  },
  en: {
    title: "Ohm's Law Calculator",
    subtitle: "Enter any two values from Voltage, Current, or Resistance, and the third will be calculated instantly.",
    voltage: "Voltage (V)",
    voltagePlaceholder: "e.g. 12",
    current: "Current (I)",
    currentPlaceholder: "e.g. 2",
    resistance: "Resistance (R)",
    resistancePlaceholder: "e.g. 6",
    volts: "Volts (V)",
    amps: "Amps (A)",
    ohms: "Ohms (Ω)",
    clear: "Clear Fields",
    formulaInfo: "Formulas Used",
    shareWhatsapp: "Share Tool",
    aboutTitle: "About The Tool",
    aboutP1: "A precise engineering tool for Ohm's Law calculations. Enter any two values and get the third instantly in real-time. Extremely useful for electrical engineers, electronics hobbyists, and science students.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)"
  }
};

export default function OhmsLaw({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const [v, setV] = useState('');
  const [i, setI] = useState('');
  const [r, setR] = useState('');
  
  // Track order of edited fields to determine which one needs to be calculated
  const [lastEdited, setLastEdited] = useState<string[]>([]);

  const handleFieldChange = (field: 'v' | 'i' | 'r', val: string) => {
    // Basic validation to allow only numbers and decimals
    let cleanVal = val.replace(/[^0-9.]/g, '');
    
    // Prevent multiple decimals
    const parts = cleanVal.split('.');
    if (parts.length > 2) {
      cleanVal = parts[0] + '.' + parts.slice(1).join('');
    }

    let newV = v, newI = i, newR = r;
    if (field === 'v') { newV = cleanVal; setV(cleanVal); }
    if (field === 'i') { newI = cleanVal; setI(cleanVal); }
    if (field === 'r') { newR = cleanVal; setR(cleanVal); }
    
    let newEdited = lastEdited.filter(f => f !== field);
    if (cleanVal !== '') {
      newEdited.unshift(field);
    }
    setLastEdited(newEdited);

    const vNum = parseFloat(newV);
    const iNum = parseFloat(newI);
    const rNum = parseFloat(newR);

    // If we have at least 2 active fields, compute the third
    if (newEdited.length >= 2) {
      const edit1 = newEdited[0];
      const edit2 = newEdited[1];
      const target = ['v', 'i', 'r'].find(x => x !== edit1 && x !== edit2);
      
      if (target === 'v' && !isNaN(iNum) && !isNaN(rNum)) {
        setV(+(iNum * rNum).toFixed(4) + '');
      } else if (target === 'i' && !isNaN(vNum) && !isNaN(rNum) && rNum !== 0) {
        setI(+(vNum / rNum).toFixed(4) + '');
      } else if (target === 'r' && !isNaN(vNum) && !isNaN(iNum) && iNum !== 0) {
        setR(+(vNum / iNum).toFixed(4) + '');
      }
    }
  };

  const handleClear = () => {
    setV('');
    setI('');
    setR('');
    setLastEdited([]);
  };

  const getTargetField = () => {
    if (lastEdited.length >= 2) {
      return ['v', 'i', 'r'].find(x => x !== lastEdited[0] && x !== lastEdited[1]);
    }
    return null;
  };

  const targetField = getTargetField();

  const generateShareText = () => {
    let str = isAr ? '*حاسبة قانون أوم:*\n\n' : "*Ohm's Law Calculator:*\n\n";
    if (v && i && r) {
      str += `V = ${v}V\nI = ${i}A\nR = ${r}Ω\n\n`;
    }
    str += isAr ? `احسب الجهد والتيار والمقاومة بسهولة هنا: ` : `Calculate Voltage, Current, and Resistance easily here: `;
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
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="text-center relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg text-white">
            <Zap size={32} />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">{t.subtitle}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 relative z-10 w-full items-start">
          
          {/* Inputs Section */}
          <div className="flex-1 flex flex-col gap-5 w-full">
             
             {/* Voltage (V) */}
             <div className="flex flex-col gap-2">
                 <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                    <Activity size={16} className="text-amber-400" />
                    {t.voltage}
                 </label>
                 <div className="relative">
                     <input 
                       type="text" 
                       value={v} 
                       onChange={(e) => handleFieldChange('v', e.target.value)} 
                       placeholder={t.voltagePlaceholder}
                       className={`w-full bg-slate-900 border ${targetField === 'v' && v !== '' ? 'border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.2)]' : 'border-white/10'} rounded-xl p-4 pr-16 text-white text-lg outline-none focus:ring-2 focus:ring-amber-500/50 transition-all font-mono`}
                       dir="ltr"
                     />
                     <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold bg-slate-800 px-3 py-1 rounded-lg">V</span>
                 </div>
             </div>

             {/* Current (I) */}
             <div className="flex flex-col gap-2">
                 <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                    <RefreshCw size={16} className="text-blue-400" />
                    {t.current}
                 </label>
                 <div className="relative">
                     <input 
                       type="text" 
                       value={i} 
                       onChange={(e) => handleFieldChange('i', e.target.value)} 
                       placeholder={t.currentPlaceholder}
                       className={`w-full bg-slate-900 border ${targetField === 'i' && i !== '' ? 'border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.2)]' : 'border-white/10'} rounded-xl p-4 pr-16 text-white text-lg outline-none focus:ring-2 focus:ring-amber-500/50 transition-all font-mono`}
                       dir="ltr"
                     />
                     <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold bg-slate-800 px-3 py-1 rounded-lg">A</span>
                 </div>
             </div>

             {/* Resistance (R) */}
             <div className="flex flex-col gap-2">
                 <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                    <Cpu size={16} className="text-fuchsia-400" />
                    {t.resistance}
                 </label>
                 <div className="relative">
                     <input 
                       type="text" 
                       value={r} 
                       onChange={(e) => handleFieldChange('r', e.target.value)} 
                       placeholder={t.resistancePlaceholder}
                       className={`w-full bg-slate-900 border ${targetField === 'r' && r !== '' ? 'border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.2)]' : 'border-white/10'} rounded-xl p-4 pr-16 text-white text-lg outline-none focus:ring-2 focus:ring-amber-500/50 transition-all font-mono`}
                       dir="ltr"
                     />
                     <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold bg-slate-800 px-3 py-1 rounded-lg">Ω</span>
                 </div>
             </div>
             
             <div className="flex justify-end mt-2">
                <button 
                  onClick={handleClear}
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-bold transition-all border border-white/5"
                >
                   {t.clear}
                </button>
             </div>

          </div>

          {/* Formulas and info */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
             <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 shadow-inner flex flex-col gap-4">
                 <h3 className="font-bold text-slate-200 border-b border-white/10 pb-3">{t.formulaInfo}</h3>
                 
                 <div className={`flex items-center gap-4 p-3 rounded-lg border ${targetField === 'v' ? 'bg-amber-500/10 border-amber-500/30' : 'bg-slate-800 border-white/5'}`}>
                     <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold font-mono">V</div>
                     <div className="text-slate-300 font-mono text-lg font-bold">= I × R</div>
                 </div>

                 <div className={`flex items-center gap-4 p-3 rounded-lg border ${targetField === 'i' ? 'bg-blue-500/10 border-blue-500/30' : 'bg-slate-800 border-white/5'}`}>
                     <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold font-mono">I</div>
                     <div className="text-slate-300 font-mono text-lg font-bold">= V / R</div>
                 </div>

                 <div className={`flex items-center gap-4 p-3 rounded-lg border ${targetField === 'r' ? 'bg-fuchsia-500/10 border-fuchsia-500/30' : 'bg-slate-800 border-white/5'}`}>
                     <div className="w-10 h-10 rounded-full bg-fuchsia-500/20 text-fuchsia-400 flex items-center justify-center font-bold font-mono">R</div>
                     <div className="text-slate-300 font-mono text-lg font-bold">= V / I</div>
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
            <Info size={20} className="text-amber-400"/>
            <h2 className="text-lg font-bold text-amber-400">{t.aboutTitle}</h2>
        </div>
        <div className="space-y-4">
          <p>{t.aboutP1}</p>
        </div>
      </article>

    </div>
  );
}
