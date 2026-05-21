import React, { useState } from 'react';
import { Share2, Info, Box, RefreshCw, Cylinder, Cone as ConeIcon, CircleDashed } from 'lucide-react';

const translations = {
  ar: {
    title: "حاسبة المساحات والأحجام",
    subtitle: "حساب دقيق للمساحات السطحية والأحجام للأشكال الهندسية ثلاثية الأبعاد مع عرض القوانين الرياضية المُستخدمة.",
    shape: "الشكل الهندسي",
    shapes: {
      sphere: "كرة",
      cylinder: "أسطوانة",
      cone: "مخروط",
      pyramid: "هرم رباعي"
    },
    radius: "نصف القطر (r)",
    height: "الارتفاع (h)",
    baseEdge: "طول ضلع القاعدة (a)",
    clear: "مسح الحقول",
    results: "النتائج الهندسية",
    volume: "الحجم (V)",
    surfaceArea: "المساحة السطحية الكلية (A)",
    lateralArea: "المساحة الجانبية",
    formulas: "القوانين الرياضية",
    shareWhatsapp: "مشاركة الأداة",
    aboutTitle: "عن الأداة",
    aboutP1: "أداة رياضية وهندسية متقدمة تهدف إلى حساب المساحات السطحية والأحجام للأشكال المعقدة (المخروط، الأسطوانة، الكرة، والهرم الرباعي) عبر إدخال الأبعاد المطلوبة. تتضمن أيضاً استعراض القوانين لتسهيل التعلم والتحقق.",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)"
  },
  en: {
    title: "Geometry Calculator",
    subtitle: "Accurately calculate surface areas and volumes of 3D geometric shapes with mathematical formulas.",
    shape: "Geometric Shape",
    shapes: {
      sphere: "Sphere",
      cylinder: "Cylinder",
      cone: "Cone",
      pyramid: "Square Pyramid"
    },
    radius: "Radius (r)",
    height: "Height (h)",
    baseEdge: "Base Edge (a)",
    clear: "Clear Fields",
    results: "Geometry Results",
    volume: "Volume (V)",
    surfaceArea: "Total Surface Area (A)",
    lateralArea: "Lateral Area",
    formulas: "Mathematical Formulas",
    shareWhatsapp: "Share Tool",
    aboutTitle: "About The Tool",
    aboutP1: "An advanced mathematical and engineering tool designed to calculate surface areas and volumes of complex 3D shapes (Cone, Cylinder, Sphere, Square Pyramid) by entering required dimensions. It also displays formulas to facilitate learning.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)"
  }
};

type ShapeType = 'sphere' | 'cylinder' | 'cone' | 'pyramid';

export default function GeometryCalculator({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const [shape, setShape] = useState<ShapeType>('cylinder');
  const [radius, setRadius] = useState('');
  const [height, setHeight] = useState('');
  const [baseEdge, setBaseEdge] = useState('');

  const cleanInput = (val: string) => val.replace(/[^0-9.]/g, '');

  const getResults = () => {
    let V = 0;
    let SA = 0;
    let LA = 0;
    let formulas = { V: '', SA: '', LA: '' };

    const r = parseFloat(radius) || 0;
    const h = parseFloat(height) || 0;
    const a = parseFloat(baseEdge) || 0;

    if (shape === 'sphere') {
      if (r > 0) {
        V = (4 / 3) * Math.PI * Math.pow(r, 3);
        SA = 4 * Math.PI * Math.pow(r, 2);
      }
      formulas = {
        V: 'V = (4/3) π r³',
        SA: 'A = 4 π r²',
        LA: ''
      };
    } else if (shape === 'cylinder') {
      if (r > 0 && h > 0) {
        V = Math.PI * Math.pow(r, 2) * h;
        LA = 2 * Math.PI * r * h;
        SA = LA + 2 * Math.PI * Math.pow(r, 2);
      }
      formulas = {
        V: 'V = π r² h',
        LA: 'L.A. = 2 π r h',
        SA: 'A = 2 π r h + 2 π r²'
      };
    } else if (shape === 'cone') {
      if (r > 0 && h > 0) {
        V = (1 / 3) * Math.PI * Math.pow(r, 2) * h;
        const l = Math.sqrt(Math.pow(r, 2) + Math.pow(h, 2)); // slant height
        LA = Math.PI * r * l;
        SA = LA + Math.PI * Math.pow(r, 2);
      }
      formulas = {
        V: 'V = (1/3) π r² h',
        LA: 'L.A. = π r l ,  l = √(r² + h²)',
        SA: 'A = π r l + π r²'
      };
    } else if (shape === 'pyramid') {
      if (a > 0 && h > 0) {
        V = (Math.pow(a, 2) * h) / 3;
        const l = Math.sqrt(Math.pow(a / 2, 2) + Math.pow(h, 2)); // slant height
        LA = 2 * a * l;
        SA = LA + Math.pow(a, 2);
      }
      formulas = {
        V: 'V = (a² h) / 3',
        LA: 'L.A. = 2 a l ,  l = √((a/2)² + h²)',
        SA: 'A = a² + 2 a l'
      };
    }

    return { V, SA, LA, formulas };
  };

  const { V, SA, LA, formulas } = getResults();

  const handleClear = () => {
    setRadius('');
    setHeight('');
    setBaseEdge('');
  };

  const formatNumber = (num: number) => {
    if (!num) return '---';
    return num.toFixed(3).replace(/\\.0+$/, '');
  };

  const generateShareText = () => {
    let str = isAr ? '*حاسبة المساحات والأحجام:*\n\n' : '*Geometry Calculator:*\n\n';
    if (V > 0) {
      str += `Shape: ${t.shapes[shape]}\n`;
      str += `Volume: ${formatNumber(V)}\n`;
      str += `Surface Area: ${formatNumber(SA)}\n\n`;
    }
    str += isAr ? `احسب الأشكال الهندسية هنا: ` : `Calculate 3D shapes easily here: `;
    return encodeURIComponent(str + window.location.href);
  };

  const renderShapeIcon = () => {
    if (shape === 'cylinder') return <Cylinder size={32} />;
    if (shape === 'cone') return <ConeIcon size={32} />;
    if (shape === 'sphere') return <CircleDashed size={32} />;
    return <Box size={32} />;
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
        <div className="absolute top-0 right-1/3 w-64 h-64 bg-teal-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="text-center relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg text-white">
            {renderShapeIcon()}
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10 w-full items-start">
          
          {/* Inputs */}
          <div className="flex flex-col gap-5 w-full bg-slate-900/40 p-6 rounded-2xl border border-white/5 shadow-inner">
             
             <div className="flex justify-between items-center mb-2 border-b border-white/10 pb-4">
                 <h3 className="font-bold text-slate-200 flex items-center gap-2">
                     <Box size={18} className="text-teal-400" />
                     {isAr ? 'الأبعاد' : 'Dimensions'}
                 </h3>
                 <button onClick={handleClear} className="text-xs text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1 transition-colors">
                     <RefreshCw size={12}/>{t.clear}
                 </button>
             </div>

             <div className="flex flex-col gap-4">
                 <div className="flex flex-col gap-2">
                     <label className="text-xs font-bold text-slate-400">{t.shape}</label>
                     <select 
                        value={shape}
                        onChange={(e) => {
                            setShape(e.target.value as ShapeType);
                            handleClear();
                        }}
                        className="bg-slate-800 border border-white/10 rounded-xl p-3 text-sm text-slate-200 outline-none focus:ring-2 focus:ring-teal-500/50 transition-all cursor-pointer"
                     >
                        <option value="cylinder">{t.shapes.cylinder}</option>
                        <option value="cone">{t.shapes.cone}</option>
                        <option value="sphere">{t.shapes.sphere}</option>
                        <option value="pyramid">{t.shapes.pyramid}</option>
                     </select>
                 </div>

                 {/* Dynamic Inputs */}
                 {(shape === 'sphere' || shape === 'cylinder' || shape === 'cone') && (
                     <div className="flex flex-col gap-1">
                         <label className="text-xs font-bold text-slate-400">{t.radius}</label>
                         <input 
                           type="text" 
                           value={radius} 
                           onChange={(e) => setRadius(cleanInput(e.target.value))}
                           placeholder="0"
                           className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-white outline-none focus:ring-2 focus:ring-teal-500/50 transition-all font-mono"
                           dir="ltr"
                         />
                     </div>
                 )}

                 {shape === 'pyramid' && (
                     <div className="flex flex-col gap-1">
                         <label className="text-xs font-bold text-slate-400">{t.baseEdge}</label>
                         <input 
                           type="text" 
                           value={baseEdge} 
                           onChange={(e) => setBaseEdge(cleanInput(e.target.value))}
                           placeholder="0"
                           className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-white outline-none focus:ring-2 focus:ring-teal-500/50 transition-all font-mono"
                           dir="ltr"
                         />
                     </div>
                 )}

                 {(shape === 'cylinder' || shape === 'cone' || shape === 'pyramid') && (
                     <div className="flex flex-col gap-1">
                         <label className="text-xs font-bold text-slate-400">{t.height}</label>
                         <input 
                           type="text" 
                           value={height} 
                           onChange={(e) => setHeight(cleanInput(e.target.value))}
                           placeholder="0"
                           className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-white outline-none focus:ring-2 focus:ring-teal-500/50 transition-all font-mono"
                           dir="ltr"
                         />
                     </div>
                 )}
             </div>
          </div>

          {/* Results Area */}
          <div className="flex flex-col gap-5 w-full">
             <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 shadow-inner flex flex-col gap-4">
                 <h3 className="font-bold text-emerald-400 flex items-center gap-2 mb-2 border-b border-white/10 pb-4">
                     {t.results}
                 </h3>

                 <div className="grid grid-cols-1 gap-3">
                     <div className="bg-slate-800 p-4 rounded-xl border border-white/5 flex items-center justify-between shadow-sm">
                         <span className="text-sm text-slate-300 font-bold">{t.volume}</span>
                         <span className="text-xl font-bold text-white font-mono break-all">{formatNumber(V)}</span>
                     </div>
                     <div className="bg-slate-800 p-4 rounded-xl border border-white/5 flex items-center justify-between shadow-sm">
                         <span className="text-sm text-slate-300 font-bold">{t.surfaceArea}</span>
                         <span className="text-xl font-bold text-white font-mono break-all">{formatNumber(SA)}</span>
                     </div>
                     {LA > 0 && (
                         <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5 flex items-center justify-between shadow-sm">
                             <span className="text-sm text-slate-400 font-bold">{t.lateralArea}</span>
                             <span className="text-lg font-bold text-white/80 font-mono break-all">{formatNumber(LA)}</span>
                         </div>
                     )}
                 </div>

                 {/* Formulas */}
                 <div className="mt-2 flex flex-col gap-2">
                     <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.formulas}</span>
                     <div className="bg-slate-950/40 p-4 rounded-xl border border-white/5 flex flex-col gap-2 font-mono text-sm text-teal-300/80" dir="ltr">
                         <div>{formulas.V}</div>
                         {formulas.LA && <div>{formulas.LA}</div>}
                         <div>{formulas.SA}</div>
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
            <Info size={20} className="text-teal-400"/>
            <h2 className="text-lg font-bold text-teal-400">{t.aboutTitle}</h2>
        </div>
        <div className="space-y-4">
          <p>{t.aboutP1}</p>
        </div>
      </article>

    </div>
  );
}
