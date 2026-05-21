import React, { useState, useEffect, useRef } from 'react';
import { Share2, Info, BarChart3, PieChart, Plus, Trash2, Download, RefreshCw, Type, Hash } from 'lucide-react';

const translations = {
  ar: {
    title: "مُولد الرسوم البيانية",
    subtitle: "أدخل بياناتك لإنشاء مخططات شريطية أو دائرية احترافية، وقم بتحميلها كصور مباشرةً.",
    dataInput: "إدخال البيانات",
    chartType: "نوع المخطط",
    barChart: "شريطي (Bar)",
    pieChart: "دائري (Pie)",
    label: "الاسم / الفئة",
    value: "القيمة",
    addRow: "إضافة صف",
    download: "تحميل كصورة",
    clear: "مسح الكل",
    shareWhatsapp: "مشاركة الأداة",
    aboutTitle: "عن الأداة",
    aboutP1: "أداة تفاعلية لرسم المخططات البيانية (الشريطية والدائرية) تعتمد على تقنية تقنية Canvas لتقديم جودة عالية وأداء سريع. يمكنك إضافة البيانات وتعديلها وتحميل الرسمة النهائية كصورة شفافة بسهولة.",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)",
    downloadError: "حدث خطأ أثناء تحميل الصورة."
  },
  en: {
    title: "Chart Generator",
    subtitle: "Enter your data to generate professional bar or pie charts, and download them as images instantly.",
    dataInput: "Data Input",
    chartType: "Chart Type",
    barChart: "Bar Chart",
    pieChart: "Pie Chart",
    label: "Label / Category",
    value: "Value",
    addRow: "Add Row",
    download: "Download Image",
    clear: "Clear All",
    shareWhatsapp: "Share Tool",
    aboutTitle: "About The Tool",
    aboutP1: "An interactive chart generator using Canvas technology to deliver high-quality, instant visualizations (Bar and Pie charts). Easily customize your data and export the result as a transparent PNG image.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)",
    downloadError: "Error occurred while downloading image."
  }
};

const CHART_COLORS = [
  '#f43f5e', '#8b5cf6', '#0ea5e9', '#10b981', '#f59e0b', 
  '#ec4899', '#6366f1', '#06b6d4', '#84cc16', '#eab308',
  '#d946ef', '#3b82f6', '#14b8a6', '#22c55e', '#ef4444'
];

type DataItem = {
  id: string;
  label: string;
  value: string;
};

export default function ChartGenerator({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';
  
  const [chartType, setChartType] = useState<'bar' | 'pie'>('bar');
  const [data, setData] = useState<DataItem[]>([
    { id: '1', label: isAr ? 'منتج أ' : 'Product A', value: '30' },
    { id: '2', label: isAr ? 'منتج ب' : 'Product B', value: '50' },
    { id: '3', label: isAr ? 'منتج ج' : 'Product C', value: '20' }
  ]);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const addRow = () => {
    setData([...data, { id: Math.random().toString(36).substr(2, 9), label: '', value: '' }]);
  };

  const updateRow = (id: string, field: 'label' | 'value', val: string) => {
    setData(data.map(item => item.id === id ? { ...item, [field]: val } : item));
  };

  const removeRow = (id: string) => {
    if (data.length <= 1) return;
    setData(data.filter(item => item.id !== id));
  };

  const clearData = () => {
    setData([{ id: Math.random().toString(36).substr(2, 9), label: '', value: '' }]);
  };

  const drawChart = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvas size
    const width = 800;
    const height = 500;
    
    // Support high DPI
    const ratio = window.devicePixelRatio || 1;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    ctx.scale(ratio, ratio);

    // Clear background
    ctx.clearRect(0, 0, width, height);

    // Filter valid data
    const validData = data
      .map(d => ({ label: d.label || (isAr ? 'بدون اسم' : 'Unnamed'), value: parseFloat(d.value) }))
      .filter(d => !isNaN(d.value) && d.value >= 0);

    if (validData.length === 0) {
      ctx.fillStyle = '#64748b';
      ctx.font = '20px "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(isAr ? 'لا توجد بيانات صالحة للعرض' : 'No valid data to display', width / 2, height / 2);
      return;
    }

    if (chartType === 'bar') {
      const padding = { top: 40, right: 40, bottom: 60, left: 60 };
      const chartWidth = width - padding.left - padding.right;
      const chartHeight = height - padding.top - padding.bottom;
      
      const maxVal = Math.max(...validData.map(d => d.value), 10);
      
      // Draw Axes
      ctx.beginPath();
      ctx.moveTo(padding.left, padding.top);
      ctx.lineTo(padding.left, height - padding.bottom);
      ctx.lineTo(width - padding.right, height - padding.bottom);
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw Grid Lines (Y-Axis)
      const steps = 5;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.font = '12px "Inter", sans-serif';
      ctx.fillStyle = '#94a3b8';

      for (let i = 0; i <= steps; i++) {
        const val = (maxVal / steps) * i;
        const y = height - padding.bottom - (chartHeight / steps) * i;
        
        ctx.fillText(val.toFixed(0), padding.left - 10, y);
        
        if (i > 0) {
          ctx.beginPath();
          ctx.moveTo(padding.left, y);
          ctx.lineTo(width - padding.right, y);
          ctx.strokeStyle = '#1e293b';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Draw Bars
      const barWidth = (chartWidth / validData.length) * 0.6;
      const spacing = (chartWidth / validData.length) * 0.4;
      
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';

      validData.forEach((item, index) => {
        const barHeight = (item.value / maxVal) * chartHeight;
        const x = padding.left + spacing/2 + index * (barWidth + spacing);
        const y = height - padding.bottom - barHeight;

        // Draw Bar
        ctx.fillStyle = CHART_COLORS[index % CHART_COLORS.length];
        
        // Add rounded corners to top of bars
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, [4, 4, 0, 0]);
        ctx.fill();

        // Draw Label
        ctx.fillStyle = '#94a3b8';
        ctx.font = '12px "Inter", sans-serif';
        // Truncate label if too long
        let labelText = item.label;
        if (labelText.length > 10) labelText = labelText.substring(0, 8) + '..';
        ctx.fillText(labelText, x + barWidth / 2, height - padding.bottom + 10);
        
        // Draw Value on top of bar
        ctx.fillStyle = '#e2e8f0';
        ctx.fillText(item.value.toString(), x + barWidth / 2, y - 20);
      });

    } else if (chartType === 'pie') {
      const centerX = width / 2 - 100; // shift left to make room for legend
      const centerY = height / 2;
      const radius = Math.min(width, height) / 2 - 60;
      
      const total = validData.reduce((acc, curr) => acc + curr.value, 0);
      
      let startAngle = -0.5 * Math.PI; // Start at top
      
      validData.forEach((item, index) => {
        const sliceAngle = (item.value / total) * 2 * Math.PI;
        const endAngle = startAngle + sliceAngle;
        
        const color = CHART_COLORS[index % CHART_COLORS.length];
        ctx.fillStyle = color;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fill();
        
        // Draw slice border
        ctx.strokeStyle = '#0f172a'; // slate-950
        ctx.lineWidth = 2;
        ctx.stroke();

        startAngle = endAngle;
      });

      // Draw Legend
      const legendX = centerX + radius + 40;
      const legendYStart = centerY - (validData.length * 24) / 2;
      
      ctx.textAlign = isAr ? 'right' : 'left';
      ctx.textBaseline = 'middle';
      ctx.font = '14px "Inter", sans-serif';

      validData.forEach((item, index) => {
        const y = legendYStart + index * 24;
        
        // Legend Color Box
        ctx.fillStyle = CHART_COLORS[index % CHART_COLORS.length];
        if (isAr) {
          ctx.fillRect(legendX + 150, y - 6, 12, 12);
        } else {
          ctx.fillRect(legendX, y - 6, 12, 12);
        }
        
        // Legend Text
        ctx.fillStyle = '#cbd5e1';
        const percent = ((item.value / total) * 100).toFixed(1);
        const text = `${item.label} (${percent}%)`;
        
        if (isAr) {
          ctx.fillText(text, legendX + 140, y);
        } else {
          ctx.fillText(text, legendX + 20, y);
        }
      });
    }
  };

  useEffect(() => {
    drawChart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, chartType]);

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = `chart-${Date.now()}.png`;
      a.click();
    } catch (err) {
      alert(t.downloadError);
    }
  };

  const generateShareText = () => {
    let str = isAr ? '*مُولد الرسوم البيانية:*\n\n' : '*Chart Generator:*\n\n';
    str += isAr ? `ارسم بياناتك وحملها كصور بضغطة زر هنا: ` : `Draw your data and download as images instantly here: `;
    return encodeURIComponent(str + window.location.href);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto">
      {/* Top AdSense */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm">
        <div className="text-[10px] uppercase tracking-widest mb-1">{t.adTop}</div>
        <p className="text-[10px]">{t.adTopDesc}</p>
      </div>

      <section className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl flex flex-col gap-8 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="text-center relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg text-white">
            <PieChart size={32} />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">{t.subtitle}</p>
        </div>

        {/* Controls Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 relative z-10 w-full items-start">
          
          {/* Data Input Panel */}
          <div className="flex flex-col gap-5 w-full bg-slate-900/40 p-6 rounded-2xl border border-white/5 shadow-inner">
             
             <div className="flex justify-between items-center mb-2 border-b border-white/10 pb-4">
                 <h3 className="font-bold text-slate-200 flex items-center gap-2 text-sm">
                     <BarChart3 size={16} className="text-pink-400" />
                     {t.dataInput}
                 </h3>
                 <button onClick={clearData} className="text-xs text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1 transition-colors">
                     <RefreshCw size={12}/>{t.clear}
                 </button>
             </div>

             {/* Chart Type Selector */}
             <div className="flex flex-col gap-2 mb-2">
                <label className="text-xs font-bold text-slate-400">{t.chartType}</label>
                <div className="flex gap-2 bg-slate-950 p-1 rounded-xl border border-white/5">
                   <button 
                      onClick={() => setChartType('bar')}
                      className={`flex-1 py-2 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors ${chartType === 'bar' ? 'bg-pink-500/20 text-pink-300 shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
                   >
                       <BarChart3 size={14}/> {t.barChart}
                   </button>
                   <button 
                      onClick={() => setChartType('pie')}
                      className={`flex-1 py-2 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors ${chartType === 'pie' ? 'bg-pink-500/20 text-pink-300 shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
                   >
                       <PieChart size={14}/> {t.pieChart}
                   </button>
                </div>
             </div>

             {/* Data Rows */}
             <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-2 -mr-2">
                {data.map((row, i) => (
                    <div key={row.id} className="flex gap-2 items-center">
                        <div className="flex-1 relative">
                            <input 
                              type="text" 
                              value={row.label}
                              onChange={(e) => updateRow(row.id, 'label', e.target.value)}
                              placeholder={t.label}
                              className="w-full bg-slate-800 border border-white/10 rounded-lg py-2 px-3 pl-8 text-sm text-white outline-none focus:ring-1 focus:ring-pink-500/50 transition-all font-medium"
                            />
                            <Type size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                        </div>
                        <div className="w-[100px] relative">
                            <input 
                              type="text" 
                              value={row.value}
                              onChange={(e) => updateRow(row.id, 'value', e.target.value.replace(/[^0-9.-]/g, ''))}
                              placeholder={t.value}
                              className="w-full bg-slate-800 border border-white/10 rounded-lg py-2 px-3 pl-7 text-sm text-white outline-none focus:ring-1 focus:ring-pink-500/50 transition-all font-mono"
                              dir="ltr"
                            />
                            <Hash size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
                        </div>
                        <button 
                          onClick={() => removeRow(row.id)}
                          disabled={data.length <= 1}
                          className="p-2 text-slate-500 hover:text-rose-400 disabled:opacity-30 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                    </div>
                ))}
             </div>

             <button 
                onClick={addRow}
                className="mt-2 w-full py-3 border border-dashed border-white/20 rounded-xl text-slate-400 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all flex items-center justify-center gap-2 text-sm font-bold"
             >
                <Plus size={16} /> {t.addRow}
             </button>

          </div>

          {/* Canvas Preview Panel */}
          <div className="flex flex-col gap-4 w-full h-full">
             <div className="bg-slate-950 p-4 rounded-2xl border border-white/10 shadow-lg flex-1 flex flex-col items-center justify-center overflow-hidden min-h-[300px]">
                 <div className="w-full max-w-[800px] aspect-[8/5] relative">
                     <canvas 
                        ref={canvasRef}
                        className="w-full h-full object-contain"
                        style={{ display: 'block' }} // Remove weird descender spacing
                     />
                 </div>
             </div>

             <div className="flex justify-end mt-2">
                 <button 
                    onClick={downloadCanvas}
                    className="flex items-center gap-2 bg-pink-600 hover:bg-pink-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all"
                 >
                    <Download size={18} /> {t.download}
                 </button>
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
            <Info size={20} className="text-pink-400"/>
            <h2 className="text-lg font-bold text-pink-400">{t.aboutTitle}</h2>
        </div>
        <div className="space-y-4">
          <p>{t.aboutP1}</p>
        </div>
      </article>

    </div>
  );
}
