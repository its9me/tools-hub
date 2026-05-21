import React, { useState, useEffect } from 'react';
import { Share2, Info, Triangle, Calculator, RefreshCw, Layers } from 'lucide-react';

const translations = {
  ar: {
    title: "حاسبة المثلثات المتقدمة",
    subtitle: "أدخل 3 قيم معروفة (بما فيها ضلع واحد على الأقل) وسيتم إكمال باقي الأضلاع والزوايا مع رسم المثلث وحساب الدوال المثلثية.",
    sideA: "الضلع (a)",
    sideB: "الضلع (b)",
    sideC: "الضلع (c)",
    angleA: "الزاوية (A)",
    angleB: "الزاوية (B)",
    angleC: "الزاوية (C)",
    area: "المساحة",
    perimeter: "المحيط",
    results: "النتائج التلقائية",
    sin: "جا (Sin)",
    cos: "جتا (Cos)",
    tan: "ظا (Tan)",
    invalid: "يرجى إدخال 3 قيم صالحة (منها ضلع واحد) لتشكيل مثلث صحيح.",
    clear: "مسح الحقول",
    shareWhatsapp: "مشاركة الأداة",
    aboutTitle: "عن الأداة",
    aboutP1: "أداة هندسية متقدمة تستخدم قوانين الجيب وجيب التمام لحل المثلثات، مع رسم تفاعلي دقيق لنسب المثلث بناءً على أطوال الأضلاع والزوايا المحسوبة. مناسبة لطلاب الهندسة والرياضيات.",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)"
  },
  en: {
    title: "Advanced Triangle Calculator",
    subtitle: "Enter 3 known values (including at least one side) to calculate all sides, angles, area, and display an interactive drawing.",
    sideA: "Side (a)",
    sideB: "Side (b)",
    sideC: "Side (c)",
    angleA: "Angle (A)",
    angleB: "Angle (B)",
    angleC: "Angle (C)",
    area: "Area",
    perimeter: "Perimeter",
    results: "Automatic Results",
    sin: "Sin",
    cos: "Cos",
    tan: "Tan",
    invalid: "Please enter 3 valid values (including at least one side) to form a valid triangle.",
    clear: "Clear Fields",
    shareWhatsapp: "Share Tool",
    aboutTitle: "About The Tool",
    aboutP1: "An advanced engineering tool that uses the Laws of Sines and Cosines to solve triangles, with an accurate interactive SVG drawing based on the solved proportions. Useful for math & engineering students.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)"
  }
};

type TriangleData = {
  a: number | null;
  b: number | null;
  c: number | null;
  A: number | null;
  B: number | null;
  C: number | null;
};

export default function TriangleCalculator({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const [inputs, setInputs] = useState<Record<keyof TriangleData, string>>({
    a: '', b: '', c: '', A: '', B: '', C: ''
  });

  const [computed, setComputed] = useState<TriangleData | null>(null);

  useEffect(() => {
    solveTriangle();
  }, [inputs]);

  const handleInputChange = (field: keyof TriangleData, value: string) => {
    // allow numbers and one decimal
    let cleanVal = value.replace(/[^0-9.]/g, '');
    const parts = cleanVal.split('.');
    if (parts.length > 2) cleanVal = parts[0] + '.' + parts.slice(1).join('');
    setInputs(prev => ({ ...prev, [field]: cleanVal }));
  };

  const solveTriangle = () => {
    let { a, b, c, A, B, C } = inputs;
    
    let aNum = a ? parseFloat(a) : null;
    let bNum = b ? parseFloat(b) : null;
    let cNum = c ? parseFloat(c) : null;
    let ANum = A ? parseFloat(A) : null;
    let BNum = B ? parseFloat(B) : null;
    let CNum = C ? parseFloat(C) : null;

    const toRad = (d: number) => d * Math.PI / 180;
    const toDeg = (r: number) => r * 180 / Math.PI;

    let prevMissing = -1;
    let loop = 0;
    
    while (loop < 10) {
      loop++;
      const vals = [aNum, bNum, cNum, ANum, BNum, CNum];
      let missing = vals.filter(x => x === null || isNaN(x)).length;
      if (missing === 0) break;
      if (missing === prevMissing) {
          setComputed(null);
          return;
      }
      prevMissing = missing;

      if (ANum && BNum && !CNum) CNum = 180 - ANum - BNum;
      if (ANum && CNum && !BNum) BNum = 180 - ANum - CNum;
      if (BNum && CNum && !ANum) ANum = 180 - BNum - CNum;

      if (aNum && bNum && cNum) {
        if (!ANum) ANum = toDeg(Math.acos((bNum*bNum + cNum*cNum - aNum*aNum)/(2*bNum*cNum)));
        if (!BNum) BNum = toDeg(Math.acos((aNum*aNum + cNum*cNum - bNum*bNum)/(2*aNum*cNum)));
        if (!CNum) CNum = 180 - ANum - BNum;
      }

      if (aNum && bNum && CNum && !cNum) cNum = Math.sqrt(aNum*aNum + bNum*bNum - 2*aNum*bNum*Math.cos(toRad(CNum)));
      if (aNum && cNum && BNum && !bNum) bNum = Math.sqrt(aNum*aNum + cNum*cNum - 2*aNum*cNum*Math.cos(toRad(BNum)));
      if (bNum && cNum && ANum && !aNum) aNum = Math.sqrt(bNum*bNum + cNum*cNum - 2*bNum*cNum*Math.cos(toRad(ANum)));

      if (ANum && BNum && CNum) {
        if (aNum && !bNum) bNum = aNum * Math.sin(toRad(BNum)) / Math.sin(toRad(ANum));
        if (aNum && !cNum) cNum = aNum * Math.sin(toRad(CNum)) / Math.sin(toRad(ANum));
        if (bNum && !aNum) aNum = bNum * Math.sin(toRad(ANum)) / Math.sin(toRad(BNum));
        if (bNum && !cNum) cNum = bNum * Math.sin(toRad(CNum)) / Math.sin(toRad(BNum));
        if (cNum && !aNum) aNum = cNum * Math.sin(toRad(ANum)) / Math.sin(toRad(CNum));
        if (cNum && !bNum) bNum = cNum * Math.sin(toRad(BNum)) / Math.sin(toRad(CNum));
      }

      if (aNum && bNum && ANum && !BNum) BNum = toDeg(Math.asin(bNum * Math.sin(toRad(ANum)) / aNum));
      if (aNum && bNum && BNum && !ANum) ANum = toDeg(Math.asin(aNum * Math.sin(toRad(BNum)) / bNum));
      if (aNum && cNum && ANum && !CNum) CNum = toDeg(Math.asin(cNum * Math.sin(toRad(ANum)) / aNum));
      if (aNum && cNum && CNum && !ANum) ANum = toDeg(Math.asin(aNum * Math.sin(toRad(CNum)) / cNum));
      if (bNum && cNum && BNum && !CNum) CNum = toDeg(Math.asin(cNum * Math.sin(toRad(BNum)) / bNum));
      if (bNum && cNum && CNum && !BNum) BNum = toDeg(Math.asin(bNum * Math.sin(toRad(CNum)) / cNum));
    }

    // Check validity
    if (!aNum || !bNum || !cNum || !ANum || !BNum || !CNum) { setComputed(null); return; }
    if (isNaN(aNum) || isNaN(bNum) || isNaN(cNum) || isNaN(ANum) || isNaN(BNum) || isNaN(CNum)) { setComputed(null); return; }
    
    // Triangle inequality
    if (aNum + bNum <= cNum + 0.001 || aNum + cNum <= bNum + 0.001 || bNum + cNum <= aNum + 0.001) { setComputed(null); return; }
    // Angle sum
    if (Math.abs(ANum + BNum + CNum - 180) > 0.5) { setComputed(null); return; }

    setComputed({ a: aNum, b: bNum, c: cNum, A: ANum, B: BNum, C: CNum });
  };

  const clearAll = () => {
    setInputs({ a: '', b: '', c: '', A: '', B: '', C: '' });
    setComputed(null);
  };

  const formatOutput = (n: number | null | undefined) => {
      if (n == null) return "---";
      return n.toFixed(2).replace(/\.00$/, '');
  };

  // derived metrics
  let area = 0, perimeter = 0;
  if (computed && computed.a && computed.b && computed.C) {
      area = 0.5 * computed.a * computed.b * Math.sin(computed.C * Math.PI / 180);
      perimeter = computed.a + computed.b + (computed.c || 0);
  }

  // Draw logic
  const renderSVG = () => {
    if (!computed || !computed.b || !computed.c || !computed.A) return null;
    const { b, c, A } = computed;
    
    // Scale triangle up to fit drawing area nicely
    const A_rad = A * Math.PI / 180;
    
    // Points
    const ptA = { x: 0, y: 0 };
    const ptB = { x: c, y: 0 };
    const ptC = { x: b * Math.cos(A_rad), y: b * Math.sin(A_rad) };
    
    // Bounding Box
    const minX = Math.min(ptA.x, ptB.x, ptC.x);
    const maxX = Math.max(ptA.x, ptB.x, ptC.x);
    const minY = Math.min(ptA.y, ptB.y, ptC.y);
    const maxY = Math.max(ptA.y, ptB.y, ptC.y);
    
    const width = maxX - minX;
    const height = maxY - minY;
    
    // Add padding (15%)
    const padX = width * 0.15 || 5;
    const padY = height * 0.15 || 5;
    
    const viewBox = `${minX - padX} ${minY - padY} ${width + 2*padX} ${height + 2*padY}`;

    // Calculate labels positions (middle of edges)
    const midA = { x: (ptB.x + ptC.x)/2, y: (ptB.y + ptC.y)/2 }; // opposite to A is side a
    const midB = { x: (ptA.x + ptC.x)/2, y: (ptA.y + ptC.y)/2 }; // opposite to B is side b
    const midC = { x: (ptA.x + ptB.x)/2, y: (ptA.y + ptB.y)/2 }; // opposite to C is side c

    // SVG coordinate system Y goes down, so we flip it visually for a standard math look
    // By applying a transform scale(1, -1) we can flip Y, but we need to flip text too.
    return (
      <div className="w-full h-48 md:h-64 flex justify-center items-center p-4 border border-white/5 bg-slate-900 rounded-xl shadow-inner mt-4">
        <svg viewBox={viewBox} className="w-full h-full text-indigo-400 drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]">
            {/* Draw Polygon */}
            <polygon 
               points={`${ptA.x},${ptA.y} ${ptB.x},${ptB.y} ${ptC.x},${ptC.y}`} 
               fill="currentColor" 
               fillOpacity="0.1" 
               stroke="currentColor" 
               strokeWidth={Math.max(width, height) * 0.015} 
               strokeLinejoin="round" 
            />
            {/* Vertices */}
            <circle cx={ptA.x} cy={ptA.y} r={Math.max(width, height) * 0.02} fill="#818cf8" />
            <circle cx={ptB.x} cy={ptB.y} r={Math.max(width, height) * 0.02} fill="#818cf8" />
            <circle cx={ptC.x} cy={ptC.y} r={Math.max(width, height) * 0.02} fill="#818cf8" />
            {/* Labels - we add offsets depending on vertex */}
            <text x={ptA.x - width*0.06} y={ptA.y} fontSize={Math.max(width, height) * 0.08} fill="#c7d2fe" fontWeight="bold">A</text>
            <text x={ptB.x + width*0.02} y={ptB.y} fontSize={Math.max(width, height) * 0.08} fill="#c7d2fe" fontWeight="bold">B</text>
            <text x={ptC.x} y={ptC.y + height*0.08} fontSize={Math.max(width, height) * 0.08} fill="#c7d2fe" fontWeight="bold">C</text>
            {/* Edge labels */}
            <text x={midA.x + width*0.03} y={midA.y + height*0.03} fontSize={Math.max(width, height) * 0.06} fill="#6366f1" fontWeight="bold">a</text>
            <text x={midB.x - width*0.03} y={midB.y + height*0.03} fontSize={Math.max(width, height) * 0.06} fill="#6366f1" fontWeight="bold">b</text>
            <text x={midC.x} y={midC.y - height*0.04} fontSize={Math.max(width, height) * 0.06} fill="#6366f1" fontWeight="bold">c</text>
        </svg>
      </div>
    );
  };

  const getTrig = (angleDeg: number | null | undefined, func: 'sin'|'cos'|'tan') => {
      if (!angleDeg) return "---";
      const rad = angleDeg * Math.PI / 180;
      let val = 0;
      if (func === 'sin') val = Math.sin(rad);
      if (func === 'cos') val = Math.cos(rad);
      if (func === 'tan') val = Math.tan(rad);
      return val.toFixed(3);
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
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="text-center relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg text-white">
            <Triangle size={32} />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10 w-full items-start">
          
          {/* Inputs Section */}
          <div className="flex flex-col gap-5 w-full bg-slate-900/40 p-6 rounded-2xl border border-white/5 shadow-inner">
             
             <div className="flex justify-between items-center mb-2 border-b border-white/10 pb-4">
                 <h3 className="font-bold text-slate-200 flex items-center gap-2">
                     <Layers size={18} className="text-indigo-400" />
                     {isAr ? 'مدخلات أطوال وزوايا المثلث' : 'Triangle Inputs'}
                 </h3>
                 <button onClick={clearAll} className="text-xs text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1 transition-colors">
                     <RefreshCw size={12}/>{t.clear}
                 </button>
             </div>

             <div className="grid grid-cols-2 gap-4">
                 {/* Sides */}
                 <div className="flex flex-col gap-3">
                     <div className="flex flex-col gap-1">
                         <label className="text-xs font-bold text-slate-400">{t.sideA}</label>
                         <input 
                           type="text" 
                           value={computed?.a ? formatOutput(computed.a) : inputs.a} 
                           onChange={(e) => handleInputChange('a', e.target.value)}
                           className="w-full bg-slate-800 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-mono text-sm"
                           dir="ltr"
                         />
                     </div>
                     <div className="flex flex-col gap-1">
                         <label className="text-xs font-bold text-slate-400">{t.sideB}</label>
                         <input 
                           type="text" 
                           value={computed?.b ? formatOutput(computed.b) : inputs.b} 
                           onChange={(e) => handleInputChange('b', e.target.value)}
                           className="w-full bg-slate-800 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-mono text-sm"
                           dir="ltr"
                         />
                     </div>
                     <div className="flex flex-col gap-1">
                         <label className="text-xs font-bold text-slate-400">{t.sideC}</label>
                         <input 
                           type="text" 
                           value={computed?.c ? formatOutput(computed.c) : inputs.c} 
                           onChange={(e) => handleInputChange('c', e.target.value)}
                           className="w-full bg-slate-800 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-mono text-sm"
                           dir="ltr"
                         />
                     </div>
                 </div>

                 {/* Angles */}
                 <div className="flex flex-col gap-3">
                     <div className="flex flex-col gap-1">
                         <label className="text-xs font-bold text-slate-400">{t.angleA} °</label>
                         <input 
                           type="text" 
                           value={computed?.A ? formatOutput(computed.A) : inputs.A} 
                           onChange={(e) => handleInputChange('A', e.target.value)}
                           className="w-full bg-slate-800 border border-white/10 rounded-lg p-2.5 text-indigo-200 outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-mono text-sm"
                           dir="ltr"
                         />
                     </div>
                     <div className="flex flex-col gap-1">
                         <label className="text-xs font-bold text-slate-400">{t.angleB} °</label>
                         <input 
                           type="text" 
                           value={computed?.B ? formatOutput(computed.B) : inputs.B} 
                           onChange={(e) => handleInputChange('B', e.target.value)}
                           className="w-full bg-slate-800 border border-white/10 rounded-lg p-2.5 text-indigo-200 outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-mono text-sm"
                           dir="ltr"
                         />
                     </div>
                     <div className="flex flex-col gap-1">
                         <label className="text-xs font-bold text-slate-400">{t.angleC} °</label>
                         <input 
                           type="text" 
                           value={computed?.C ? formatOutput(computed.C) : inputs.C} 
                           onChange={(e) => handleInputChange('C', e.target.value)}
                           className="w-full bg-slate-800 border border-white/10 rounded-lg p-2.5 text-indigo-200 outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-mono text-sm"
                           dir="ltr"
                         />
                     </div>
                 </div>
             </div>
             
             {!computed && Object.values(inputs).filter(x => x).length >= 3 && (
                <div className="text-rose-400 text-xs font-bold bg-rose-500/10 p-3 rounded-lg border border-rose-500/20 mt-2">
                    {t.invalid}
                </div>
             )}

          </div>

          {/* Results Area */}
          <div className="flex flex-col gap-5 w-full">
             
             <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 shadow-inner">
                 <h3 className="font-bold text-emerald-400 flex items-center gap-2 mb-4 border-b border-white/10 pb-4">
                     <Calculator size={18} />
                     {t.results}
                 </h3>
                 
                 <div className="grid grid-cols-2 gap-4 mb-4">
                     <div className="bg-slate-800 p-4 rounded-xl border border-white/5 flex flex-col items-center">
                         <span className="text-xs text-slate-400 font-bold uppercase mb-1">{t.area}</span>
                         <span className="text-xl font-bold text-white font-mono">{formatOutput(area)}</span>
                     </div>
                     <div className="bg-slate-800 p-4 rounded-xl border border-white/5 flex flex-col items-center">
                         <span className="text-xs text-slate-400 font-bold uppercase mb-1">{t.perimeter}</span>
                         <span className="text-xl font-bold text-white font-mono">{formatOutput(perimeter)}</span>
                     </div>
                 </div>

                 <div className="grid grid-cols-3 gap-2 overflow-hidden rounded-xl border border-white/5 bg-slate-800/50 text-center text-sm font-mono text-slate-300">
                     <div className="p-2 border-b border-r border-white/5 font-bold uppercase text-slate-400">Angle</div>
                     <div className="p-2 border-b border-r border-white/5">{t.sin}</div>
                     <div className="p-2 border-b border-white/5">{t.cos}</div>
                     
                     <div className="p-2 border-b border-r border-white/5 text-xs text-indigo-300 font-bold">A ({formatOutput(computed?.A)}°)</div>
                     <div className="p-2 border-b border-r border-white/5">{getTrig(computed?.A, 'sin')}</div>
                     <div className="p-2 border-b border-white/5">{getTrig(computed?.A, 'cos')}</div>
                     
                     <div className="p-2 border-b border-r border-white/5 text-xs text-indigo-300 font-bold">B ({formatOutput(computed?.B)}°)</div>
                     <div className="p-2 border-b border-r border-white/5">{getTrig(computed?.B, 'sin')}</div>
                     <div className="p-2 border-b border-white/5">{getTrig(computed?.B, 'cos')}</div>
                     
                     <div className="p-2 border-r border-white/5 text-xs text-indigo-300 font-bold">C ({formatOutput(computed?.C)}°)</div>
                     <div className="p-2 border-r border-white/5">{getTrig(computed?.C, 'sin')}</div>
                     <div className="p-2">{getTrig(computed?.C, 'cos')}</div>
                 </div>

                 {/* Visualizer */}
                 {renderSVG()}

             </div>
          </div>

        </div>
        
        <div className="hidden md:flex justify-center pt-4 relative z-10 w-full mt-4 border-t border-white/5">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(isAr ? 'اكتشف حاسبة المثلثات المتقدمة التفاعلية: ' : 'Check out this advanced interactive Triangle Calculator: ') + encodeURIComponent(window.location.href)}`}
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
            <Info size={20} className="text-indigo-400"/>
            <h2 className="text-lg font-bold text-indigo-400">{t.aboutTitle}</h2>
        </div>
        <div className="space-y-4">
          <p>{t.aboutP1}</p>
        </div>
      </article>

    </div>
  );
}
