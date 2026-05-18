import React, { useState, useRef, useEffect, MouseEvent } from 'react';
import { Palette, Share2, Info, Upload, Copy, Check, Image as ImageIcon, MousePointer2 } from 'lucide-react';

const translations = {
  ar: {
    title: "مستخرج الألوان من الصور",
    subtitle: "ارفع أي صورة واضغط على أي جزء منها لاستخراج كود اللون بدقة (HEX & RGB).",
    uploadBtn: "رفع صورة",
    dragDrop: "أو اسحب وأفلت الصورة هنا",
    hoverColor: "اللون الحالي",
    selectedColor: "اللون المحدد",
    history: "الألوان المستخرجة:",
    rgb: "RGB",
    hex: "HEX",
    copyHex: "نسخ HEX",
    copyRgb: "نسخ RGB",
    copied: "تم",
    instructions: "مرر الماوس فوق الصورة لرؤية الألوان، واضغط لاستخراج اللون وحفظه.",
    shareWhatsapp: "مشاركة الأداة",
    aboutTitle: "عن الأداة",
    aboutP1: "أداة ضرورية للمصممين ومطوري الويب لاستخراج درجات الألوان الدقيقة من أي صورة. تقوم الأداة بمعالجة الصورة محلياً داخل المتصفح عبر تقنية HTML5 Canvas، مما يضمن سرعة عالية وخصوصية تامة حيث لا يتم رفع صورك لأي خوادم خارجية.",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)"
  },
  en: {
    title: "Image Color Picker",
    subtitle: "Upload any image and click anywhere to extract the exact color code (HEX & RGB).",
    uploadBtn: "Upload Image",
    dragDrop: "or drag and drop image here",
    hoverColor: "Current Color",
    selectedColor: "Selected Color",
    history: "Extracted Colors:",
    rgb: "RGB",
    hex: "HEX",
    copyHex: "Copy HEX",
    copyRgb: "Copy RGB",
    copied: "Copied!",
    instructions: "Hover over the image to preview colors, click to extract and save it.",
    shareWhatsapp: "Share Tool",
    aboutTitle: "About The Tool",
    aboutP1: "An essential tool for designers and web developers to extract exact color codes from any image. The tool processes the image locally in your browser using HTML5 Canvas, ensuring high speed and complete privacy as your images are never uploaded to any external servers.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)"
  }
};

const rgbToHex = (r: number, g: number, b: number) => {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('').toUpperCase();
};

export default function ImageColorPicker({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  
  const [hoverColor, setHoverColor] = useState<{r: number, g: number, b: number, hex: string} | null>(null);
  const [selectedColors, setSelectedColors] = useState<{r: number, g: number, b: number, hex: string}[]>([]);
  const [copiedType, setCopiedType] = useState<{index: number, type: 'hex' | 'rgb'} | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target?.result as string);
        setSelectedColors([]);
        setHoverColor(null);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (imageSrc && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        // Calculate aspect ratio to fit canvas while maintaining proportions
        const maxWidth = canvas.parentElement?.clientWidth || 800;
        const maxHeight = 500;
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;
        ctx?.clearRect(0, 0, width, height);
        ctx?.drawImage(img, 0, 0, width, height);
      };
      img.src = imageSrc;
    }
  }, [imageSrc]);

  const getColorData = (e: MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const pixelData = ctx.getImageData(x, y, 1, 1).data;
    const r = pixelData[0];
    const g = pixelData[1];
    const b = pixelData[2];
    const hex = rgbToHex(r, g, b);

    return { r, g, b, hex };
  };

  const handleMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
    const color = getColorData(e);
    if (color) {
      setHoverColor(color);
    }
  };

  const handleMouseLeave = () => {
    setHoverColor(null);
  };

  const handleCanvasClick = (e: MouseEvent<HTMLCanvasElement>) => {
    const color = getColorData(e);
    if (color) {
      // Add to front of array, max 10 colors
      setSelectedColors(prev => [color, ...prev].slice(0, 10));
    }
  };

  const copyToClipboard = (text: string, index: number, type: 'hex' | 'rgb') => {
    navigator.clipboard.writeText(text);
    setCopiedType({ index, type });
    setTimeout(() => {
      setCopiedType(null);
    }, 2000);
  };

  const generateShareText = () => {
    let str = isAr ? '*أداة استخراج الألوان من الصور:*\n\n' : '*Image Color Picker Tool:*\n\n';
    str += isAr ? `أداة سهلة وسريعة لاستخراج الأكواد اللونية من أي صورة.\n\nجربها هنا: ` : `A fast and easy tool to extract color codes from any image.\n\nTry it here: `;
    return encodeURIComponent(str + window.location.href);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
      {/* Top AdSense */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm">
        <div className="text-[10px] uppercase tracking-widest mb-1">{t.adTop}</div>
        <p className="text-[10px]">{t.adTopDesc}</p>
      </div>

      <section className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl flex flex-col gap-6 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="text-center relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg text-white">
            <Palette size={32} />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">{t.subtitle}</p>
        </div>

        <div className="relative z-10 mt-4 flex flex-col gap-6">
          
          {!imageSrc ? (
            <div className="w-full flex-1 min-h-[300px] border-2 border-dashed border-white/20 rounded-2xl flex flex-col items-center justify-center text-slate-400 bg-slate-900/40 relative hover:bg-slate-900/60 transition-colors">
               <input
                 type="file"
                 accept="image/*"
                 onChange={handleImageUpload}
                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
               />
               <ImageIcon size={48} strokeWidth={1} className="mb-4 opacity-50 text-pink-400" />
               <button className="px-6 py-3 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-xl shadow-lg flex items-center gap-2 transition-transform transform active:scale-95 mb-2 pointer-events-none">
                 <Upload size={18} />
                 {t.uploadBtn}
               </button>
               <p className="text-sm font-medium">{t.dragDrop}</p>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-6">
              
              <div className="flex-1 flex flex-col items-center gap-4">
                 <div className="w-full bg-slate-900/80 rounded-2xl border border-white/5 p-2 overflow-hidden shadow-inner flex flex-col items-center max-w-full">
                    <canvas
                      ref={canvasRef}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                      onClick={handleCanvasClick}
                      className="max-w-full rounded-xl cursor-crosshair border border-white/10"
                      style={{ maxHeight: '500px' }}
                    />
                 </div>
                 <div className="flex items-center gap-2 text-sm text-slate-400 bg-slate-900/50 px-4 py-2 rounded-lg border border-white/5">
                   <MousePointer2 size={16} className="text-pink-400" />
                   {t.instructions}
                 </div>
              </div>

              <div className="w-full lg:w-80 flex flex-col gap-4">
                 {/* Live preview color */}
                 <div className="bg-slate-900/50 rounded-2xl border border-white/5 p-4 flex flex-col gap-3">
                   <h3 className="text-sm font-bold text-slate-300">{t.hoverColor}</h3>
                   <div className="flex items-center gap-4">
                     <div 
                       className="w-16 h-16 rounded-xl border border-white/20 shadow-inner"
                       style={{ backgroundColor: hoverColor ? hoverColor.hex : 'transparent' }}
                     />
                     <div className="flex flex-col gap-1 flex-1 font-mono text-sm text-slate-300 min-w-0" dir="ltr">
                        <span>{hoverColor ? hoverColor.hex : '---'}</span>
                        <span className="truncate">{hoverColor ? `rgb(${hoverColor.r}, ${hoverColor.g}, ${hoverColor.b})` : '---'}</span>
                     </div>
                   </div>
                 </div>

                 <div className="flex-1 bg-slate-900/50 rounded-2xl border border-white/5 p-4 flex flex-col gap-4 max-h-[400px] overflow-y-auto">
                   <div className="flex items-center justify-between">
                     <h3 className="text-sm font-bold text-slate-300">{t.history}</h3>
                     {selectedColors.length > 0 && (
                       <button onClick={() => {setImageSrc(null); setHoverColor(null); setSelectedColors([]);}} className="text-xs text-pink-400 hover:text-pink-300 font-medium">
                         {t.uploadBtn}
                       </button>
                     )}
                   </div>
                   
                   <div className="flex flex-col gap-3">
                     {selectedColors.map((color, index) => (
                       <div key={index} className="flex flex-col gap-2 p-3 bg-slate-800/80 rounded-xl border border-white/5 group">
                         <div className="flex items-center gap-3">
                           <div 
                             className="w-10 h-10 rounded-lg border border-white/20 shadow-inner shrink-0"
                             style={{ backgroundColor: color.hex }}
                           />
                           <div className="flex flex-col gap-1 flex-1 font-mono text-[13px]" dir="ltr">
                             <div className="flex items-center justify-between text-slate-200">
                               <span>{color.hex}</span>
                               <button 
                                 onClick={() => copyToClipboard(color.hex, index, 'hex')}
                                 className="text-slate-500 hover:text-pink-400 focus:outline-none"
                                 title={t.copyHex}
                               >
                                 {copiedType?.index === index && copiedType?.type === 'hex' ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                               </button>
                             </div>
                             <div className="flex items-center justify-between text-slate-400">
                               <span className="truncate pr-2">rgb({color.r},{color.g},{color.b})</span>
                               <button 
                                 onClick={() => copyToClipboard(`rgb(${color.r}, ${color.g}, ${color.b})`, index, 'rgb')}
                                 className="text-slate-500 hover:text-pink-400 focus:outline-none shrink-0"
                                 title={t.copyRgb}
                               >
                                 {copiedType?.index === index && copiedType?.type === 'rgb' ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                               </button>
                             </div>
                           </div>
                         </div>
                       </div>
                     ))}
                   </div>
                   
                   {selectedColors.length === 0 && (
                     <div className="flex-1 flex items-center justify-center text-slate-500 text-sm">
                       لا توجد ألوان محددة بعد
                     </div>
                   )}
                 </div>
              </div>

            </div>
          )}

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
