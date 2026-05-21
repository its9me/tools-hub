import React, { useState } from 'react';
import { Share2, Info, Hash, Braces, Binary, Code2, Copy, Check } from 'lucide-react';

const translations = {
  ar: {
    title: "محول الأنظمة العددية",
    subtitle: "أدخل الرقم في أي نظام (عشري، ثنائي، سداسي عشر، أو ثماني) وسيتم تحويله فوراً للأنظمة الأخرى.",
    decimal: "نظام عشري (Decimal - 10)",
    binary: "نظام ثنائي (Binary - 2)",
    hex: "سداسي عشر (Hex - 16)",
    octal: "نظام ثماني (Octal - 8)",
    copy: "نسخ",
    copied: "تم",
    invalid: "إدخال غير صالح",
    shareWhatsapp: "مشاركة الأداة",
    aboutTitle: "عن الأداة",
    aboutP1: "أداة أساسية للمبرمجين ومهندسي الحاسوب. تقوم بتحويل الأرقام بين الأنظمة العددية المختلفة (العشري، الثنائي، الثماني، والسداسي عشر) في الوقت الفعلي أثناء الكتابة. تدعم الأداة الأرقام الكبيرة نسبياً وتتعامل مع الإدخالات الخاطئة بذكاء.",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)"
  },
  en: {
    title: "Number Base Converter",
    subtitle: "Enter a number in any base (Decimal, Binary, Hex, or Octal) and convert it instantly.",
    decimal: "Decimal (Base 10)",
    binary: "Binary (Base 2)",
    hex: "Hexadecimal (Base 16)",
    octal: "Octal (Base 8)",
    copy: "Copy",
    copied: "Copied",
    invalid: "Invalid Input",
    shareWhatsapp: "Share Tool",
    aboutTitle: "About The Tool",
    aboutP1: "An essential tool for programmers and computer engineers. It converts numbers between different number systems (Decimal, Binary, Octal, and Hexadecimal) in real-time as you type. Handles invalid inputs gracefully.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)"
  }
};

export default function NumberBaseConverter({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const [dec, setDec] = useState('');
  const [bin, setBin] = useState('');
  const [hex, setHex] = useState('');
  const [oct, setOct] = useState('');

  const [copiedField, setCopiedField] = useState<string | null>(null);

  const updateFields = (value: string, base: number) => {
    if (!value.trim()) {
      setDec('');
      setBin('');
      setHex('');
      setOct('');
      return;
    }

    // Clean input based on base
    let cleanVal = value.trim();
    if (base === 16) {
      cleanVal = cleanVal.replace(/[^0-9a-fA-F]/g, '');
    } else if (base === 10) {
      cleanVal = cleanVal.replace(/[^0-9-]/g, '');
    } else if (base === 8) {
      cleanVal = cleanVal.replace(/[^0-7]/g, '');
    } else if (base === 2) {
      cleanVal = cleanVal.replace(/[^0-1]/g, '');
    }

    // Parse to BigInt to handle large numbers safely
    let num: bigint;
    try {
      if (cleanVal === '' || cleanVal === '-') {
        // Just update current field visually if it's intermediate
        if (base === 10) setDec(value);
        if (base === 2) setBin(value);
        if (base === 16) setHex(value);
        if (base === 8) setOct(value);
        
        ['dec', 'bin', 'hex', 'oct'].filter(k => k !== getFieldName(base)).forEach(k => {
           if (k === 'dec') setDec('');
           if (k === 'bin') setBin('');
           if (k === 'hex') setHex('');
           if (k === 'oct') setOct('');
        });
        return;
      }
      
      if (base === 16) {
        num = BigInt("0x" + cleanVal);
      } else if (base === 8) {
        num = BigInt("0o" + cleanVal);
      } else if (base === 2) {
        num = BigInt("0b" + cleanVal);
      } else {
        num = BigInt(cleanVal);
      }

    } catch (e) {
      // Invalid parsing
      if (base === 10) setDec(value);
      if (base === 2) setBin(value);
      if (base === 16) setHex(value);
      if (base === 8) setOct(value);

      ['dec', 'bin', 'hex', 'oct'].filter(k => k !== getFieldName(base)).forEach(k => {
         if (k === 'dec') setDec(t.invalid);
         if (k === 'bin') setBin(t.invalid);
         if (k === 'hex') setHex(t.invalid);
         if (k === 'oct') setOct(t.invalid);
      });
      return;
    }

    setDec(num.toString(10));
    setBin(num.toString(2));
    setHex(num.toString(16).toUpperCase());
    setOct(num.toString(8));
    
    // Override typed field if user typed lowercase hex or padding
    if (base === 10) setDec(cleanVal);
    if (base === 2) setBin(cleanVal);
    if (base === 16) setHex(cleanVal.toUpperCase());
    if (base === 8) setOct(cleanVal);
  };

  const getFieldName = (base: number) => {
      switch(base) {
          case 10: return 'dec';
          case 2: return 'bin';
          case 16: return 'hex';
          case 8: return 'oct';
          default: return '';
      }
  };

  const handleCopy = (text: string, field: string) => {
      if (!text || text === t.invalid) return;
      navigator.clipboard.writeText(text).then(() => {
          setCopiedField(field);
          setTimeout(() => setCopiedField(null), 2000);
      });
  };

  const generateShareText = () => {
    let str = isAr ? '*محول الأنظمة العددية (للمبرمجين):*\n\n' : '*Number Base Converter:*\n\n';
    if (dec && dec !== t.invalid) {
      str += `DEC: ${dec}\nBIN: ${bin}\nHEX: ${hex}\nOCT: ${oct}\n\n`;
    }
    str += isAr ? `حمل أي رقم فورياً هنا: ` : `Convert any number instantly here: `;
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
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="text-center relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg text-white">
            <Braces size={32} />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 w-full">
          
          {/* Decimal */}
          <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-300 flex items-center justify-between">
                 <div className="flex items-center gap-2">
                     <Hash size={16} className="text-emerald-400" />
                     {t.decimal}
                 </div>
                 <button 
                    onClick={() => handleCopy(dec, 'dec')}
                    className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors"
                 >
                    {copiedField === 'dec' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    {copiedField === 'dec' ? t.copied : t.copy}
                 </button>
              </label>
              <input 
                type="text" 
                value={dec} 
                onChange={(e) => updateFields(e.target.value, 10)} 
                placeholder="0"
                className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 text-white text-lg outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-mono shadow-inner"
                dir="ltr"
              />
          </div>

          {/* Hexadecimal */}
          <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-300 flex items-center justify-between">
                 <div className="flex items-center gap-2">
                     <Code2 size={16} className="text-fuchsia-400" />
                     {t.hex}
                 </div>
                 <button 
                    onClick={() => handleCopy(hex, 'hex')}
                    className="text-xs text-slate-400 hover:text-fuchsia-400 flex items-center gap-1 transition-colors"
                 >
                    {copiedField === 'hex' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    {copiedField === 'hex' ? t.copied : t.copy}
                 </button>
              </label>
              <input 
                type="text" 
                value={hex} 
                onChange={(e) => updateFields(e.target.value, 16)} 
                placeholder="0"
                className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 text-white text-lg outline-none focus:ring-2 focus:ring-fuchsia-500/50 transition-all font-mono shadow-inner uppercase"
                dir="ltr"
              />
          </div>

          {/* Binary */}
          <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm font-bold text-slate-300 flex items-center justify-between">
                 <div className="flex items-center gap-2">
                     <Binary size={16} className="text-blue-400" />
                     {t.binary}
                 </div>
                 <button 
                    onClick={() => handleCopy(bin, 'bin')}
                    className="text-xs text-slate-400 hover:text-blue-400 flex items-center gap-1 transition-colors"
                 >
                    {copiedField === 'bin' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    {copiedField === 'bin' ? t.copied : t.copy}
                 </button>
              </label>
              <textarea 
                value={bin} 
                onChange={(e) => updateFields(e.target.value, 2)} 
                placeholder="0"
                rows={3}
                className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 text-white text-lg outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-mono shadow-inner resize-none break-all"
                dir="ltr"
              />
          </div>

          {/* Octal */}
          <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm font-bold text-slate-300 flex items-center justify-between">
                 <div className="flex items-center gap-2">
                     <span className="font-mono text-amber-400 font-bold bg-amber-500/10 px-1.5 py-0.5 rounded text-xs">8</span>
                     {t.octal}
                 </div>
                 <button 
                    onClick={() => handleCopy(oct, 'oct')}
                    className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1 transition-colors"
                 >
                    {copiedField === 'oct' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    {copiedField === 'oct' ? t.copied : t.copy}
                 </button>
              </label>
              <input 
                type="text" 
                value={oct} 
                onChange={(e) => updateFields(e.target.value, 8)} 
                placeholder="0"
                className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 text-white text-lg outline-none focus:ring-2 focus:ring-amber-500/50 transition-all font-mono shadow-inner"
                dir="ltr"
              />
          </div>

        </div>
        
        <div className="hidden md:flex justify-center pt-4 relative z-10 w-full mt-2 border-t border-white/5">
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
            <Info size={20} className="text-emerald-400"/>
            <h2 className="text-lg font-bold text-emerald-400">{t.aboutTitle}</h2>
        </div>
        <div className="space-y-4">
          <p>{t.aboutP1}</p>
        </div>
      </article>

    </div>
  );
}
