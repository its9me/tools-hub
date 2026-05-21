import React, { useState, useEffect } from 'react';
import { Share2, Info, Image as ImageIcon, Copy, Upload, SlidersHorizontal, Check } from 'lucide-react';

const CHARS_NORMAL = "       .:!/r(l1Z4H9W8$@";
const CHARS_INVERT = "@$8W9H4Z1l(r/!:.       ";

const translations = {
  ar: {
    title: "محول الصور إلى رسومات نصية",
    subtitle: "حول صورك المفضلة إلى لوحات فنية مذهلة مكونة من رموز نصية (ASCII Art).",
    uploadImage: "رفع صورة",
    resolution: "دقة التفاصيل (العرض)",
    invertColors: "عكس الألوان",
    copyArt: "نسخ الرسمة",
    copied: "تم النسخ!",
    shareWhatsapp: "مشاركة الأداة",
    aboutTitle: "عن الأداة",
    aboutP1: "أداة سحرية تقوم بقراءة درجات إضاءة كل بكسل في صورتك وتحويلها إلى أحرف ورموز نصية مشابهة لكثافة الإضاءة، لتنتج لوحة فنية مميزة (ASCII). تتم معالجة الصورة بالكامل داخل متصفحك للحفاظ على خصوصيتك ولا يتم رفعها لأي خادم.",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)"
  },
  en: {
    title: "ASCII Art Generator",
    subtitle: "Transform your favorite photos into stunning text-based art (ASCII Art).",
    uploadImage: "Upload Image",
    resolution: "Detail Level (Width)",
    invertColors: "Invert Colors",
    copyArt: "Copy Art",
    copied: "Copied!",
    shareWhatsapp: "Share Tool",
    aboutTitle: "About The Tool",
    aboutP1: "A magical tool that reads the brightness of each pixel in your image and converts it into text characters of similar visual density, producing a unique ASCII piece. The image is processed entirely in your browser for privacy and is not uploaded to any server.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)"
  }
};

export default function AsciiArt({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [ascii, setAscii] = useState<string>('');
  const [resolution, setResolution] = useState(100);
  const [invert, setInvert] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (imageSrc) {
      generateAscii();
    }
  }, [imageSrc, resolution, invert]);

  const generateAscii = () => {
    if (!imageSrc) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "Anonymous";
    
    img.onload = () => {
      const width = resolution;
      // Standard font aspect ratio correction (~0.55 multiplier) for typical monospace
      const height = Math.floor((img.height / img.width) * width * 0.55);
      
      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      let asciiStr = '';

      const charsStr = invert ? CHARS_INVERT : CHARS_NORMAL;
      
      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          const offset = (i * width + j) * 4;
          const r = data[offset];
          const g = data[offset + 1];
          const b = data[offset + 2];
          
          // Calculate perceived luminance (grayscale)
          const avg = (r * 0.299 + g * 0.587 + b * 0.114);
          
          const charIndex = Math.floor((avg / 255) * (charsStr.length - 1));
          asciiStr += charsStr[charIndex] || ' ';
        }
        asciiStr += '\n';
      }
      setAscii(asciiStr);
    };
    img.src = imageSrc;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(ascii).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
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
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="text-center relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-400 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg text-white">
            <ImageIcon size={32} />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">{t.subtitle}</p>
        </div>

        <div className="flex flex-col gap-8 relative z-10 w-full max-w-4xl mx-auto items-stretch">
          
          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-4">
             {/* Upload */}
             <div className="relative flex-1 group">
                 <input 
                   type="file" 
                   accept="image/*"
                   onChange={handleFileUpload}
                   className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                   title={t.uploadImage}
                 />
                 <div className="flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-r from-fuchsia-600 to-purple-500 hover:from-fuchsia-500 hover:to-purple-400 text-white font-bold rounded-xl shadow-lg transition-all border border-fuchsia-500/30 group-active:scale-95">
                     <Upload size={20} />
                     <span>{t.uploadImage}</span>
                 </div>
             </div>

             {/* Resolution & Settings Container */}
             <div className="flex-1 bg-slate-900/50 border border-white/5 rounded-xl p-4 flex flex-col gap-4 shadow-inner">
                 <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center text-sm font-medium text-slate-300">
                        <span className="flex items-center gap-2"><SlidersHorizontal size={16} className="text-fuchsia-400"/> {t.resolution}</span>
                        <span className="font-mono text-fuchsia-400 bg-fuchsia-500/10 px-2 py-0.5 rounded">{resolution}px</span>
                    </div>
                    <input 
                       type="range" 
                       min="20" 
                       max="200" 
                       step="10" 
                       value={resolution}
                       onChange={(e) => setResolution(parseInt(e.target.value))}
                       className="w-full accent-fuchsia-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                       dir="ltr"
                    />
                 </div>
                 
                 <div className="flex items-center justify-between border-t border-white/5 pt-3">
                     <span className="text-sm font-medium text-slate-300">{t.invertColors}</span>
                     <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          checked={invert}
                          onChange={(e) => setInvert(e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-fuchsia-500"></div>
                     </label>
                 </div>
             </div>
          </div>

          {/* ASCII Output Display */}
          {ascii && (
             <div className="relative group animate-in fade-in zoom-in-95 duration-500">
                 <button
                    onClick={copyToClipboard}
                    className="absolute top-4 right-4 z-20 bg-slate-800 hover:bg-fuchsia-600 text-white p-2.5 rounded-lg shadow-lg border border-white/10 transition-colors flex items-center justify-center"
                    title={t.copyArt}
                 >
                    {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
                 </button>
                 
                 <div className="bg-[#0f111a] p-4 md:p-6 rounded-2xl border border-white/10 shadow-y-xl overflow-hidden shadow-inner relative flex justify-center max-w-full">
                     {/* The pre tag renders the ascii. We use text-[6px] or [8px] depending on device to fit */}
                     <div className="overflow-auto max-h-[60vh] md:max-h-[70vh] w-full scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent custom-scrollbar flex justify-center">
                         <pre 
                            className="font-mono text-[6px] md:text-[8px] leading-[6px] md:leading-[8px] text-fuchsia-50 select-all custom-ascii-text"
                            dir="ltr"
                         >
                            {ascii}
                         </pre>
                     </div>
                 </div>
             </div>
          )}

        </div>
        
        <div className="hidden md:flex justify-center pt-4 relative z-10 w-full mt-2 border-t border-white/5">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(isAr ? 'حولت صورتي إلى رسمة نصية عبر أداة محول الصور المذهلة، جربها الآن: ' : 'I converted my photo into text art using this awesome tool, try it now: ') + encodeURIComponent(window.location.href)}`}
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
            <Info size={20} className="text-fuchsia-400"/>
            <h2 className="text-lg font-bold text-fuchsia-400">{t.aboutTitle}</h2>
        </div>
        <div className="space-y-4">
          <p>{t.aboutP1}</p>
        </div>
      </article>

      <style>{`
        .custom-ascii-text {
          white-space: pre;
          letter-spacing: 0px;
        }
        /* Style adjustments for custom switches */
        input:checked + div {
          background-color: #d946ef;
        }
        input:checked + div::after {
          transform: translateX(100%);
          border-color: white;
        }
      `}</style>

    </div>
  );
}
