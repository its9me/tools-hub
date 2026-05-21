import React, { useState } from 'react';
import { Share2, Info, PaintRoller, Grid, Maximize, Ruler, SplitSquareHorizontal, Layers, PlusSquare, MinusSquare } from 'lucide-react';

const translations = {
  ar: {
    title: "حاسبة مساحة الغرف (للطلاء والأرضيات)",
    subtitle: "احسب المساحة الإجمالية الصافية لمعرفة كمية الصبغ أو السيراميك المطلوبة مع حساب نسبة الهدر (10%).",
    length: "الطول (متر)",
    width: "العرض (متر)",
    height: "الارتفاع (متر)",
    doors: "عدد الأبواب",
    windows: "عدد النوافذ",
    results: "النتائج والكميات",
    paintNeeded: "الطلاء المطلوب (لتر)",
    tilesNeeded: "السيراميك المطلوب (متر²)",
    netWallArea: "مساحة الجدران الصافية",
    floorArea: "مساحة الأرضية (مع الهدر)",
    assumptions: "الافتراضات: الباب = 2 م²، النافذة = 1 م²، لتر الطلاء يغطي 10 م²، مع إضافة 10% هدر للمواد.",
    shareWhatsapp: "مشاركة الأداة",
    aboutTitle: "عن الأداة",
    aboutP1: "أداة هندسية مبسطة لحساب مساحات الغرف والجدران لاستخراج كمية المواد المطلوبة للتشطيبات (أصباغ وسيراميك). تقوم الأداة بخصم مساحة الأبواب والنوافذ وتضيف 10% كنسبة هدر قياسية لضمان عدم نقص المواد أثناء العمل.",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)"
  },
  en: {
    title: "Room Area Calculator",
    subtitle: "Calculate the net area to find out the amount of paint or flooring needed, including a 10% waste margin.",
    length: "Length (m)",
    width: "Width (m)",
    height: "Height (m)",
    doors: "Number of Doors",
    windows: "Number of Windows",
    results: "Results & Quantities",
    paintNeeded: "Paint Needed (Liters)",
    tilesNeeded: "Tiles Needed (m²)",
    netWallArea: "Net Wall Area",
    floorArea: "Floor Area (with waste)",
    assumptions: "Assumptions: Door = 2m², Window = 1m², 1L paint covers 10m², with 10% waste added.",
    shareWhatsapp: "Share Tool",
    aboutTitle: "About The Tool",
    aboutP1: "A simple engineering tool to calculate room and wall areas to determine the quantity of finishing materials (paint and tiles). The tool deducts door and window areas and adds a standard 10% waste margin to ensure you don't run short on materials.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)"
  }
};

export default function RoomCalculator({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const [length, setLength] = useState<string>('4');
  const [width, setWidth] = useState<string>('4');
  const [height, setHeight] = useState<string>('3');
  const [doors, setDoors] = useState<number>(1);
  const [windows, setWindows] = useState<number>(1);

  const l = parseFloat(length) || 0;
  const w = parseFloat(width) || 0;
  const h = parseFloat(height) || 0;

  // Constants
  const DOOR_AREA = 2.0; // sq meters
  const WINDOW_AREA = 1.0; // sq meters
  const PAINT_COVERAGE = 10; // 10 sq meters per liter
  const WASTE_MULTIPLIER = 1.1; // 10% waste

  // Calculations
  const grossWallArea = 2 * (l * h) + 2 * (w * h);
  const deductions = (doors * DOOR_AREA) + (windows * WINDOW_AREA);
  const netWallArea = Math.max(0, grossWallArea - deductions);
  const paintNeeded = (netWallArea * WASTE_MULTIPLIER) / PAINT_COVERAGE;

  const grossFloorArea = l * w;
  const tilesNeeded = grossFloorArea * WASTE_MULTIPLIER;

  const generateShareText = () => {
    let str = isAr ? '*حاسبة مساحة الغرف:*\n\n' : '*Room Area Calculator:*\n\n';
    str += isAr ? `احسب كمية الطلاء والأرضيات لغرفتك بدقة.\n\nجربها هنا: ` : `Calculate paint and flooring quantities for your room accurately.\n\nTry it here: `;
    return encodeURIComponent(str + window.location.href);
  };

  const handleIncrement = (setter: React.Dispatch<React.SetStateAction<number>>, val: number) => {
    setter(val + 1);
  };

  const handleDecrement = (setter: React.Dispatch<React.SetStateAction<number>>, val: number) => {
    if (val > 0) setter(val - 1);
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
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg text-white">
            <Ruler size={32} />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">{t.subtitle}</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 relative z-10">
          
          {/* Inputs section */}
          <div className="flex-1 flex flex-col gap-5 bg-slate-900/50 p-6 rounded-2xl border border-white/5 shadow-inner">
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-300">{t.length}</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      min="0"
                      step="0.1"
                      value={length} 
                      onChange={(e) => setLength(e.target.value)} 
                      className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 pl-10 text-white outline-none focus:ring-2 focus:ring-orange-500/50 transition-all font-mono"
                      dir="ltr"
                    />
                    <Maximize size={16} className="absolute left-3 top-3.5 text-slate-500" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-300">{t.width}</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      min="0"
                      step="0.1"
                      value={width} 
                      onChange={(e) => setWidth(e.target.value)} 
                      className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 pl-10 text-white outline-none focus:ring-2 focus:ring-orange-500/50 transition-all font-mono"
                      dir="ltr"
                    />
                    <Maximize size={16} className="absolute left-3 top-3.5 text-slate-500 transform rotate-90" />
                  </div>
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm font-bold text-slate-300">{t.height}</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      min="0"
                      step="0.1"
                      value={height} 
                      onChange={(e) => setHeight(e.target.value)} 
                      className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 pl-10 text-white outline-none focus:ring-2 focus:ring-orange-500/50 transition-all font-mono"
                      dir="ltr"
                    />
                    <SplitSquareHorizontal size={16} className="absolute left-3 top-3.5 text-slate-500" />
                  </div>
                </div>
             </div>

             <hr className="border-white/5 my-2" />

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-300">{t.doors}</label>
                  <div className="flex items-center gap-3 bg-slate-800 border border-white/10 rounded-xl p-1">
                    <button onClick={() => handleDecrement(setDoors, doors)} className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors">
                      <MinusSquare size={20} />
                    </button>
                    <div className="flex-1 text-center font-mono font-bold">{doors}</div>
                    <button onClick={() => handleIncrement(setDoors, doors)} className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors">
                      <PlusSquare size={20} />
                    </button>
                  </div>
               </div>

               <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-300">{t.windows}</label>
                  <div className="flex items-center gap-3 bg-slate-800 border border-white/10 rounded-xl p-1">
                    <button onClick={() => handleDecrement(setWindows, windows)} className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors">
                      <MinusSquare size={20} />
                    </button>
                    <div className="flex-1 text-center font-mono font-bold">{windows}</div>
                    <button onClick={() => handleIncrement(setWindows, windows)} className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors">
                      <PlusSquare size={20} />
                    </button>
                  </div>
               </div>
             </div>

          </div>

          {/* Results section */}
          <div className="flex-1 flex flex-col gap-4">
             <h3 className="text-lg font-bold text-slate-200 mb-2">{t.results}</h3>
             
             <div className="p-5 bg-gradient-to-br from-amber-500/10 to-orange-600/10 rounded-2xl border border-orange-500/20 flex flex-col gap-4 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <PaintRoller size={80} />
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-orange-500/20 text-orange-400 rounded-xl">
                    <PaintRoller size={24} />
                  </div>
                  <div className="relative z-10">
                    <p className="text-sm text-slate-300 font-medium">{t.paintNeeded}</p>
                    <p className="text-3xl font-bold text-orange-400 tracking-wider font-mono">
                      {paintNeeded.toFixed(1)} <span className="text-sm font-normal text-slate-400">Liters</span>
                    </p>
                  </div>
                </div>
                <div className="bg-orange-950/30 px-3 py-2 rounded-lg text-xs text-orange-300 border border-orange-500/10 w-fit">
                   {t.netWallArea}: <span className="font-mono">{netWallArea.toFixed(1)} m²</span>
                </div>
             </div>

             <div className="p-5 bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl border border-white/10 flex flex-col gap-4 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 p-4 opacity-10">
                  <Grid size={80} />
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-3 bg-teal-500/20 text-teal-400 rounded-xl">
                    <Layers size={24} />
                  </div>
                  <div className="relative z-10">
                    <p className="text-sm text-slate-300 font-medium">{t.tilesNeeded}</p>
                    <p className="text-3xl font-bold text-teal-400 tracking-wider font-mono">
                      {tilesNeeded.toFixed(1)} <span className="text-sm font-normal text-slate-400">m²</span>
                    </p>
                  </div>
                </div>
                <div className="bg-slate-900/50 px-3 py-2 rounded-lg text-xs text-slate-400 border border-white/5 w-fit">
                   {t.floorArea}: <span className="font-mono">{grossFloorArea.toFixed(1)} m² <span className="text-[10px]">(+10%)</span></span>
                </div>
             </div>

             <p className="text-[11px] text-slate-500 mt-2 bg-slate-900/30 p-3 rounded-lg border border-white/5">
                {t.assumptions}
             </p>
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
