import React, { useState, useEffect } from 'react';
import { Share2, Info, Building2, Calculator, Hammer, RefreshCw, Cuboid } from 'lucide-react';

const translations = {
  ar: {
    title: "حاسبة مقاومة المواد",
    subtitle: "أدخل الأحمال والأبعاد لحساب الإجهاد والانفعال ومقدار التشوه للعمود المحوري.",
    force: "القوة المحورية (P) بـ kN",
    forcePlaceholder: "مثال: 500",
    area: "مساحة المقطع (A) بـ cm²",
    areaPlaceholder: "مثال: 400",
    length: "الطول الأصلي (L) بـ m",
    lengthPlaceholder: "مثال: 3",
    modulus: "معامل المرونة (E) بـ GPa",
    modulusPlaceholder: "اختر المادة أو أدخل قيمة",
    materials: {
      steel: "الحديد الصلب (200 GPa)",
      concrete: "الخرسانة (25 GPa)",
      wood: "الخشب (10 GPa)",
      custom: "استخدام قيمة مخصصة"
    },
    results: "النتائج الهندسية",
    stress: "الإجهاد المحوري (Stress)",
    strain: "الانفعال (Strain)",
    deformation: "مقدار التشوه (ΔL)",
    mpa: "MPa",
    mm: "mm",
    clear: "مسح الحقول",
    formulaInfo: "المعادلات المستخدمة",
    shareWhatsapp: "مشاركة الأداة",
    aboutTitle: "عن الأداة",
    aboutP1: "أداة هندسية لحساب مقاومة المواد والأعمدة الإنشائية. تعتمد على قوانين الميكانيكا الكلاسيكية (قانون هوك) لحساب الإجهاد (القوة على المساحة) والانفعال (مقدار التشوه بالنسبة للطول الكلي) للأجزاء المعرضة لقوى شد أو ضغط محورية. مفيدة لمهندسي البناء والمدني.",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)"
  },
  en: {
    title: "Material Strength Calculator",
    subtitle: "Enter loads and dimensions to calculate axial stress, strain, and deformation.",
    force: "Axial Force (P) in kN",
    forcePlaceholder: "e.g. 500",
    area: "Cross-sectional Area (A) in cm²",
    areaPlaceholder: "e.g. 400",
    length: "Original Length (L) in m",
    lengthPlaceholder: "e.g. 3",
    modulus: "Elastic Modulus (E) in GPa",
    modulusPlaceholder: "Select material or enter",
    materials: {
      steel: "Steel (200 GPa)",
      concrete: "Concrete (25 GPa)",
      wood: "Wood (10 GPa)",
      custom: "Custom Value"
    },
    results: "Engineering Results",
    stress: "Axial Stress (σ)",
    strain: "Strain (ε)",
    deformation: "Deformation (ΔL)",
    mpa: "MPa",
    mm: "mm",
    clear: "Clear Fields",
    formulaInfo: "Formulas Used",
    shareWhatsapp: "Share Tool",
    aboutTitle: "About The Tool",
    aboutP1: "An engineering tool to calculate material strength and structural mechanics based on Hooke's Law. It calculates stress (Force/Area) and strain (Change in Length/Original Length) for members under axial tension or compression. Useful for civil & structural engineers.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)"
  }
};

export default function MaterialStrength({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const [force, setForce] = useState('');
  const [area, setArea] = useState('');
  const [length, setLength] = useState('');
  const [modulus, setModulus] = useState('200'); // Default to Steel 200 GPa
  const [matPreset, setMatPreset] = useState('steel');

  const [stress, setStress] = useState<number | null>(null);
  const [strain, setStrain] = useState<number | null>(null);
  const [deformation, setDeformation] = useState<number | null>(null);

  useEffect(() => {
    calculate();
  }, [force, area, length, modulus]);

  const handleMatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setMatPreset(val);
    if (val === 'steel') setModulus('200');
    if (val === 'concrete') setModulus('25');
    if (val === 'wood') setModulus('10');
    if (val === 'custom') setModulus('');
  };

  const calculate = () => {
    const p = parseFloat(force);
    const a = parseFloat(area);
    const l = parseFloat(length);
    const e = parseFloat(modulus);

    if (isNaN(p) || isNaN(a) || a === 0) {
      setStress(null);
      setStrain(null);
      setDeformation(null);
      return;
    }

    // Stress = P(kN) * 10 / A(cm²) => MPa
    const calculatedStress = (p * 10) / a;
    setStress(calculatedStress);

    if (isNaN(l) || isNaN(e) || e === 0) {
      setStrain(null);
      setDeformation(null);
      return;
    }

    // Strain = Stress(MPa) / (E(GPa) * 1000) => dimensionless
    const calculatedStrain = calculatedStress / (e * 1000);
    setStrain(calculatedStrain);

    // Deformation = Strain * L(m) => in mm: Strain * L * 1000
    const calcDef = calculatedStrain * l * 1000;
    setDeformation(calcDef);
  };

  const clearAll = () => {
    setForce('');
    setArea('');
    setLength('');
    setModulus('200');
    setMatPreset('steel');
    setStress(null);
    setStrain(null);
    setDeformation(null);
  };

  const formatNumber = (num: number | null) => {
    if (num === null) return "---";
    // If it's a very small number like strain
    if (Math.abs(num) < 0.0001 && num !== 0) {
      return num.toExponential(4);
    }
    return num.toFixed(4).replace(/\.?0+$/, '');
  };

  const generateShareText = () => {
    let str = isAr ? '*حاسبة مقاومة المواد:*\n\n' : '*Material Strength Calculator:*\n\n';
    if (stress !== null) {
      str += `Stress (σ) = ${formatNumber(stress)} MPa\n`;
      if (deformation !== null) str += `Deformation (ΔL) = ${formatNumber(deformation)} mm\n`;
      str += `\n`;
    }
    str += isAr ? `احسب الإجهاد والانفعال الميكانيكي بسهولة هنا: ` : `Calculate mechanical stress and strain easily here: `;
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
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="text-center relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg text-white">
            <Building2 size={32} />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10 w-full items-start">
          
          {/* Inputs Section */}
          <div className="flex flex-col gap-5 w-full bg-slate-900/40 p-6 rounded-2xl border border-white/5 shadow-inner">
             
             <div className="flex justify-between items-center mb-2 border-b border-white/10 pb-4">
                 <h3 className="font-bold text-slate-200 flex items-center gap-2">
                     <Cuboid size={18} className="text-orange-400" />
                     {isAr ? 'بيانات العمود / العينة' : 'Column / Specimen Data'}
                 </h3>
                 <button onClick={clearAll} className="text-xs text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1 transition-colors">
                     <RefreshCw size={12}/>{t.clear}
                 </button>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {/* Force */}
                 <div className="flex flex-col gap-1">
                     <label className="text-xs font-bold text-slate-400">{t.force}</label>
                     <div className="relative">
                         <input 
                           type="text" 
                           value={force} 
                           onChange={(e) => setForce(e.target.value.replace(/[^0-9.]/g, ''))}
                           placeholder={t.forcePlaceholder}
                           className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 pr-12 text-white outline-none focus:ring-2 focus:ring-orange-500/50 transition-all font-mono"
                           dir="ltr"
                         />
                         <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs font-bold bg-slate-900 px-1.5 py-0.5 rounded">kN</span>
                     </div>
                 </div>

                 {/* Area */}
                 <div className="flex flex-col gap-1">
                     <label className="text-xs font-bold text-slate-400">{t.area}</label>
                     <div className="relative">
                         <input 
                           type="text" 
                           value={area} 
                           onChange={(e) => setArea(e.target.value.replace(/[^0-9.]/g, ''))}
                           placeholder={t.areaPlaceholder}
                           className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 pr-12 text-white outline-none focus:ring-2 focus:ring-orange-500/50 transition-all font-mono"
                           dir="ltr"
                         />
                         <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs font-bold bg-slate-900 px-1.5 py-0.5 rounded">cm²</span>
                     </div>
                 </div>

                 {/* Length */}
                 <div className="flex flex-col gap-1">
                     <label className="text-xs font-bold text-slate-400">{t.length}</label>
                     <div className="relative">
                         <input 
                           type="text" 
                           value={length} 
                           onChange={(e) => setLength(e.target.value.replace(/[^0-9.]/g, ''))}
                           placeholder={t.lengthPlaceholder}
                           className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 pr-10 text-white outline-none focus:ring-2 focus:ring-orange-500/50 transition-all font-mono"
                           dir="ltr"
                         />
                         <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs font-bold bg-slate-900 px-1.5 py-0.5 rounded">m</span>
                     </div>
                 </div>

                 {/* Modulus (E) */}
                 <div className="flex flex-col gap-1">
                     <label className="text-xs font-bold text-slate-400">{t.modulus}</label>
                     <div className="flex gap-2">
                         <select
                           value={matPreset}
                           onChange={handleMatChange}
                           className="bg-slate-800 border border-white/10 rounded-xl p-3 text-sm text-slate-300 outline-none focus:ring-2 focus:ring-orange-500/50 transition-all cursor-pointer"
                         >
                           <option value="steel">{t.materials.steel}</option>
                           <option value="concrete">{t.materials.concrete}</option>
                           <option value="wood">{t.materials.wood}</option>
                           <option value="custom">{t.materials.custom}</option>
                         </select>
                         
                         {matPreset === 'custom' && (
                             <div className="relative w-full">
                               <input 
                                 type="text" 
                                 value={modulus} 
                                 onChange={(e) => setModulus(e.target.value.replace(/[^0-9.]/g, ''))}
                                 placeholder="E"
                                 className="w-full h-full bg-slate-800 border border-white/10 rounded-xl p-3 pr-12 text-white outline-none focus:ring-2 focus:ring-orange-500/50 transition-all font-mono"
                                 dir="ltr"
                               />
                               <span className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 text-xs font-bold bg-slate-900 px-1.5 py-0.5 rounded">GPa</span>
                             </div>
                         )}
                     </div>
                 </div>
             </div>

          </div>

          {/* Results & Formulas Area */}
          <div className="flex flex-col gap-5 w-full">
             
             {/* Results */}
             <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 shadow-inner">
                 <h3 className="font-bold text-yellow-400 flex items-center gap-2 mb-4 border-b border-white/10 pb-4">
                     <Hammer size={18} />
                     {t.results}
                 </h3>
                 
                 <div className="flex flex-col gap-4">
                     
                     <div className="bg-slate-800 p-4 rounded-xl border border-white/5 flex items-center justify-between shadow-sm">
                         <span className="text-sm text-slate-300 font-bold">{t.stress}</span>
                         <div className="flex items-baseline gap-2">
                             <span className="text-2xl font-black text-white font-mono">{formatNumber(stress)}</span>
                             <span className="text-xs text-orange-400 font-bold">{t.mpa}</span>
                         </div>
                     </div>

                     <div className="bg-slate-800 p-4 rounded-xl border border-white/5 flex items-center justify-between shadow-sm">
                         <span className="text-sm text-slate-300 font-bold">{t.strain}</span>
                         <div className="flex items-baseline gap-2">
                             <span className="text-2xl font-black text-white font-mono">{formatNumber(strain)}</span>
                         </div>
                     </div>

                     <div className="bg-slate-800 p-4 rounded-xl border border-white/5 flex items-center justify-between shadow-sm group hover:border-yellow-500/30 transition-colors">
                         <span className="text-sm text-slate-300 font-bold">{t.deformation}</span>
                         <div className="flex items-baseline gap-2">
                             <span className="text-2xl font-black text-white font-mono group-hover:text-yellow-400 transition-colors">{formatNumber(deformation)}</span>
                             <span className="text-xs text-yellow-400 font-bold">{t.mm}</span>
                         </div>
                     </div>

                 </div>
             </div>

             {/* Formulas Reference */}
             <div className="bg-slate-900/30 p-5 rounded-2xl border border-white/5 shadow-inner flex flex-col gap-3">
                 <h3 className="font-bold text-slate-400 text-sm">{t.formulaInfo}</h3>
                 <div className="flex flex-col gap-2 text-xs font-mono text-slate-500" dir="ltr">
                    <p><span className="text-orange-400 font-bold">σ (Stress)</span> = Force (P) / Area (A)</p>
                    <p><span className="text-sky-400 font-bold">ε (Strain)</span> = Stress (σ) / Modulus (E)</p>
                    <p><span className="text-yellow-400 font-bold">ΔL (Deformation)</span> = Strain (ε) × Length (L)</p>
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
            <Info size={20} className="text-orange-400"/>
            <h2 className="text-lg font-bold text-orange-400">{t.aboutTitle}</h2>
        </div>
        <div className="space-y-4">
          <p>{t.aboutP1}</p>
        </div>
      </article>

    </div>
  );
}
