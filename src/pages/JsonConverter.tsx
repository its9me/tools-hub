import React, { useState } from 'react';
import { FileJson, FileText, Code, Share2, Info, Copy, Download, Check, AlertCircle, ArrowRightLeft } from 'lucide-react';

const translations = {
  ar: {
    title: "محول JSON إلى CSV / XML",
    subtitle: "قم بتحويل نصوص وبيانات JSON إلى صيغة CSV (جداول) أو XML بسهولة.",
    inputLabel: "أدخل كود JSON هنا",
    outputLabel: "النتيجة",
    formatCsv: "تحويل إلى CSV",
    formatXml: "تحويل إلى XML",
    copy: "نسخ",
    copied: "تم النسخ!",
    download: "تحميل بالصيغة:",
    downloadCsv: "تحميل CSV",
    downloadXml: "تحميل XML",
    errorInvalidJson: "خطأ: كود JSON غير صالح. يرجى التحقق من الصيغة.",
    shareWhatsapp: "مشاركة الأداة",
    aboutTitle: "عن المحول",
    aboutP1: "أداة سريعة ومجانية للمطورين ومحللي البيانات لتحويل البيانات المهيكلة بصيغة JSON إلى صيغ أخرى مثل CSV و XML. تُسهل هذه الأداة عملية استيراد البيانات إلى جداول البيانات (مثل Excel) أو استخدامها في أنظمة تدعم XML.",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)"
  },
  en: {
    title: "JSON to CSV / XML Converter",
    subtitle: "Convert JSON data strings to CSV (tables) or XML formats easily.",
    inputLabel: "Enter JSON here",
    outputLabel: "Result",
    formatCsv: "Convert to CSV",
    formatXml: "Convert to XML",
    copy: "Copy",
    copied: "Copied!",
    download: "Download as:",
    downloadCsv: "Download CSV",
    downloadXml: "Download XML",
    errorInvalidJson: "Error: Invalid JSON string. Please check the format.",
    shareWhatsapp: "Share Tool",
    aboutTitle: "About The Converter",
    aboutP1: "A quick and free tool for developers and data analysts to convert structured JSON data into formats like CSV or XML. This makes it easier to import data into spreadsheets (like Excel) or use it in XML-supported systems.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)"
  }
};

const jsonToCsv = (jsonStr: string): string => {
  let obj = JSON.parse(jsonStr);
  if (!Array.isArray(obj)) {
    obj = [obj];
  }
  if (obj.length === 0) return '';

  const keys = Object.keys(obj[0]);
  const csvRows = [];
  csvRows.push(keys.join(','));

  for (const row of obj) {
    const values = keys.map(k => {
      let val = row[k];
      if (val === null || val === undefined) val = '';
      else if (typeof val === 'object') val = JSON.stringify(val);
      else val = String(val);

      if (val.includes(',') || val.includes('"') || val.includes('\n')) {
        val = `"${val.replace(/"/g, '""')}"`;
      }
      return val;
    });
    csvRows.push(values.join(','));
  }
  return csvRows.join('\n');
};

const objectToXml = (obj: any): string => {
  let xml = '';
  for (const prop in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, prop)) continue;
    let val = obj[prop];
    if (val === null || val === undefined) val = '';

    if (Array.isArray(val)) {
      for (const item of val) {
        xml += `<${prop}>`;
        if (typeof item === 'object' && item !== null) {
          xml += objectToXml(item);
        } else {
          xml += item;
        }
        xml += `</${prop}>`;
      }
    } else if (typeof val === 'object' && val !== null) {
      xml += `<${prop}>\n${objectToXml(val)}</${prop}>\n`;
    } else {
      xml += `<${prop}>${val}</${prop}>\n`;
    }
  }
  return xml;
};

const jsonToXml = (jsonStr: string): string => {
  const obj = JSON.parse(jsonStr);
  let xml = '<?xml version="1.0" encoding="UTF-8" ?>\n<root>\n';

  if (Array.isArray(obj)) {
    for (const item of obj) {
      xml += '<item>\n';
      if (typeof item === 'object' && item !== null) {
        xml += objectToXml(item);
      } else {
        xml += item;
      }
      xml += '</item>\n';
    }
  } else if (typeof obj === 'object' && obj !== null) {
    xml += objectToXml(obj);
  } else {
    xml += obj;
  }

  xml += '</root>';
  return xml;
};

export default function JsonConverter({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const [input, setInput] = useState<string>('[\n  {\n    "name": "Ali",\n    "age": 25,\n    "city": "Baghdad"\n  },\n  {\n    "name": "Sarah",\n    "age": 22,\n    "city": "Dubai"\n  }\n]');
  const [output, setOutput] = useState<string>('');
  const [outputType, setOutputType] = useState<'csv' | 'xml' | null>(null);
  const [error, setError] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const handleConvert = (type: 'csv' | 'xml') => {
    setError('');
    setCopied(false);
    try {
      if (!input.trim()) {
        setOutput('');
        setOutputType(null);
        return;
      }
      
      // Validate JSON first
      JSON.parse(input);

      if (type === 'csv') {
        setOutput(jsonToCsv(input));
      } else {
        setOutput(jsonToXml(input));
      }
      setOutputType(type);
    } catch (err) {
      setError(t.errorInvalidJson);
      setOutput('');
      setOutputType(null);
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!output || !outputType) return;
    const blob = new Blob([output], { type: outputType === 'csv' ? 'text/csv;charset=utf-8;' : 'application/xml;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `converted_data.${outputType}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generateShareText = () => {
    let str = isAr ? '*أداة تحويل JSON إلى CSV/XML:*\n\n' : '*JSON to CSV/XML Converter Tool:*\n\n';
    str += isAr ? `أداة سهلة وسريعة للمطورين لتحويل البيانات.\n\nجربها هنا: ` : `A quick & easy tool for developers to convert structured data.\n\nTry it here: `;
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
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="text-center relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg text-white">
            <ArrowRightLeft size={32} />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">{t.subtitle}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 relative z-10 mt-4">
          
          <div className="flex-1 flex flex-col gap-3">
             <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <FileJson size={16} className="text-emerald-400" />
                {t.inputLabel}
             </label>
             <textarea
               value={input}
               onChange={(e) => {
                 setInput(e.target.value);
                 if (error) setError('');
               }}
               className="w-full h-64 md:h-96 bg-slate-900 border border-white/10 rounded-xl p-4 text-sm text-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-y"
               dir="ltr"
               placeholder="[{...}, {...}]"
             />
             
             {error && (
               <div className="flex items-center gap-2 p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm rounded-xl">
                 <AlertCircle size={16} />
                 {error}
               </div>
             )}

             <div className="grid grid-cols-2 gap-3 mt-2">
                <button 
                  onClick={() => handleConvert('csv')}
                  className="flex items-center justify-center gap-2 py-3 bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/30 font-bold rounded-xl transition-all shadow-md active:scale-95"
                >
                  <FileText size={18} />
                  {t.formatCsv}
                </button>
                <button 
                  onClick={() => handleConvert('xml')}
                  className="flex items-center justify-center gap-2 py-3 bg-slate-800 hover:bg-slate-700 text-teal-400 border border-teal-500/30 font-bold rounded-xl transition-all shadow-md active:scale-95"
                >
                  <Code size={18} />
                  {t.formatXml}
                </button>
             </div>
          </div>

          <div className="flex-1 flex flex-col gap-3">
             <div className="flex items-center justify-between">
               <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  {outputType === 'xml' ? <Code size={16} className="text-teal-400" /> : <FileText size={16} className="text-emerald-400" />}
                  {t.outputLabel} {outputType && `(${outputType.toUpperCase()})`}
               </label>
               {output && (
                 <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-white/10 rounded-lg text-xs font-medium transition-colors"
                    >
                      {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      {copied ? t.copied : t.copy}
                    </button>
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-medium transition-colors"
                    >
                      <Download size={14} />
                      {t.download} {outputType.toUpperCase()}
                    </button>
                 </div>
               )}
             </div>
             
             <textarea
               readOnly
               value={output}
               className="w-full h-64 md:h-96 bg-slate-900 border border-white/10 rounded-xl p-4 text-sm text-slate-300 font-mono outline-none resize-y"
               dir="ltr"
               placeholder={t.outputLabel}
             />

             <div className="mt-2 text-center md:hidden">
                <a
                  href={`https://wa.me/?text=${generateShareText()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-sm font-bold text-white shadow-lg transition-all border border-white/5 w-full"
                >
                  <Share2 size={16} />
                  {t.shareWhatsapp}
                </a>
             </div>
          </div>

        </div>
        
        <div className="hidden md:flex justify-center pt-4 relative z-10">
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
