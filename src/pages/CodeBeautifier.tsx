import React, { useState, useEffect } from 'react';
import { Code2, Share2, Info, Copy, FileCode2, Paintbrush2, FileJson, Check, Wand2 } from 'lucide-react';

const translations = {
  ar: {
    title: "منسق الأكواد (Beautifier)",
    subtitle: "قم بترتيب وتنسيق أكواد CSS و JavaScript العشوائية وتلوينها بضغطة زر.",
    inputPlaceholder: "ضع الكود غير المنسق هنا...",
    formatBtn: "تنسيق الكود",
    copy: "نسخ الكود",
    copied: "تم النسخ!",
    langCss: "CSS",
    langJs: "JavaScript",
    shareWhatsapp: "مشاركة الأداة",
    aboutTitle: "عن الأداة",
    aboutP1: "أداة قوية للمطورين تعمل بالكامل داخل المتصفح، تستخدم خوارزميات تنظيم النصوص والـ Regular Expressions لإضافة الفراغات والمسافات البادئة والأسطر الجديدة للأكواد المصغرة (Minified). كما تقوم بتلوين الكود لجعله قابلاً للقراءة والفهم بسهولة.",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)"
  },
  en: {
    title: "Code Beautifier",
    subtitle: "Format and colorize your messy or minified CSS and JavaScript code instantly.",
    inputPlaceholder: "Paste unformatted code here...",
    formatBtn: "Format Code",
    copy: "Copy Code",
    copied: "Copied!",
    langCss: "CSS",
    langJs: "JavaScript",
    shareWhatsapp: "Share Tool",
    aboutTitle: "About The Tool",
    aboutP1: "A powerful, entirely client-side tool for developers that uses string manipulation algorithms and Regular Expressions to add spaces, indentations, and newlines to minified code. It also highlights syntax to make it readable and understandable easily.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)"
  }
};

const beautifyCode = (code: string, lang: 'css' | 'js') => {
  const strings: string[] = [];
  let sIdx = 0;
  let protectedCode = code;
  
  // Protect strings, comments, and specific blocks to avoid mangling them
  if (lang === 'js') {
    // Strings
    protectedCode = protectedCode.replace(/(["'`])(?:(?=(\\?))\2.)*?\1/g, (match) => {
      strings.push(match);
      return `__STR_${sIdx++}__`;
    });
    // For loops
    protectedCode = protectedCode.replace(/for\s*\(([^)]+)\)/g, (match) => {
      strings.push(match);
      return `__STR_${sIdx++}__`;
    });
    // Block Comments
    protectedCode = protectedCode.replace(/\/\*[\s\S]*?\*\//g, (match) => {
      strings.push(match);
      return `__STR_${sIdx++}__`;
    });
    // Line Comments
    protectedCode = protectedCode.replace(/\/\/.*$/gm, (match) => {
      strings.push(match);
      return `__STR_${sIdx++}__`;
    });
  } else {
     // CSS Strings
     protectedCode = protectedCode.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, (match) => {
      strings.push(match);
      return `__STR_${sIdx++}__`;
    });
    // CSS Comments
    protectedCode = protectedCode.replace(/\/\*[\s\S]*?\*\//g, (match) => {
      strings.push(match);
      return `__STR_${sIdx++}__`;
    });
  }

  let formatted = '';
  
  if (lang === 'css') {
    let indent = 0;
    protectedCode = protectedCode
      .replace(/\s+/g, ' ')
      .replace(/{\s+/g, '{')
      .replace(/}\s+/g, '}')
      .replace(/;\s+/g, ';');
      
    for (let i = 0; i < protectedCode.length; i++) {
      let char = protectedCode[i];
      if (char === '{') {
        formatted += ' {\n' + '  '.repeat(++indent);
      } else if (char === '}') {
        formatted += '\n' + '  '.repeat(--indent >= 0 ? indent : 0) + '}\n\n' + '  '.repeat(indent >= 0 ? indent : 0);
      } else if (char === ';') {
        formatted += ';\n' + '  '.repeat(indent >= 0 ? indent : 0);
      } else {
        formatted += char;
      }
    }
    
  } else {
    // JS Format
    let lines = protectedCode
      .replace(/\s+/g, ' ')
      .replace(/\{/g, ' {\n')
      .replace(/\}/g, '\n}\n')
      .replace(/;/g, ';\n')
      .split('\n');
      
    let indent = 0;
    let finalLines = [];
    
    for (let line of lines) {
      line = line.trim();
      if (!line) continue;
      
      if (line.startsWith('}')) {
        indent = Math.max(0, Math.floor(indent - 1));
      }
      
      finalLines.push('  '.repeat(indent) + line);
      
      if (line.endsWith('{')) {
        indent++;
      }
    }
    formatted = finalLines.join('\n');
  }

  // Restore protected blocks
  strings.forEach((str, idx) => {
    formatted = formatted.replace(`__STR_${idx}__`, str);
  });

  return formatted.trim();
};

const highlightSyntax = (code: string, lang: 'css' | 'js') => {
  if (!code) return '';
  let escaped = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  
  if (lang === 'css') {
    escaped = escaped
      // Comments
      .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="text-slate-500 italic">$1</span>')
      // Strings
      .replace(/(["']).*?\1/g, '<span class="text-green-400">$&</span>')
      // Properties
      .replace(/([a-zA-Z\-]+)(?=\s*:)/g, '<span class="text-sky-400">$1</span>')
      // Values
      .replace(/:\s*([^;]+)(?=;)/g, ': <span class="text-emerald-400">$1</span>')
      // Selectors
      .replace(/([^\{\}\n]+)(?=\s*\{)/g, '<span class="text-pink-400 font-bold">$1</span>');
  } else {
    escaped = escaped
      // Strings
      .replace(/(["'`])(?:(?=(\\?))\2.)*?\1/g, '<span class="text-green-400">$&</span>')
      // Line comments
      .replace(/(\/\/.*?$)/gm, '<span class="text-slate-500 italic">$1</span>')
      // Block comments
      .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="text-slate-500 italic">$1</span>')
      // Keywords
      .replace(/\b(const|let|var|function|if|else|for|while|return|class|import|export|from|new|this|async|await|try|catch|true|false|null|undefined)\b/g, '<span class="text-pink-400 font-bold">$1</span>')
      // Numbers
      .replace(/\b(\d+)\b/g, '<span class="text-amber-400">$1</span>')
      // Functions
      .replace(/\b([a-zA-Z_]\w*)(?=\s*\()/g, '<span class="text-sky-400">$1</span>');
  }
  
  return escaped;
};

export default function CodeBeautifier({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const [inputCode, setInputCode] = useState('');
  const [outputCode, setOutputCode] = useState('');
  const [highlightedHtml, setHighlightedHtml] = useState('');
  const [codeLang, setCodeLang] = useState<'css' | 'js'>('css');
  const [copied, setCopied] = useState(false);

  const handleFormat = () => {
    if (!inputCode.trim()) {
      setOutputCode('');
      setHighlightedHtml('');
      return;
    }
    const formatted = beautifyCode(inputCode, codeLang);
    setOutputCode(formatted);
    setHighlightedHtml(highlightSyntax(formatted, codeLang));
  };

  // Re-format if language changes and output exists
  useEffect(() => {
    if (outputCode) {
      handleFormat();
    }
  }, [codeLang]);

  const handleCopy = () => {
    if (!outputCode) return;
    navigator.clipboard.writeText(outputCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateShareText = () => {
    let str = isAr ? '*أداة تنسيق الأكواد Beautifier:*\n\n' : '*Code Beautifier Tool:*\n\n';
    str += isAr ? `رتب ونسق أكواد CSS و JS بسهولة وبضغطة زر.\n\nجربها هنا: ` : `Format and beautify CSS and JS codes easily.\n\nTry it here: `;
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
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-violet-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="text-center relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-violet-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg text-white">
            <Wand2 size={32} />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">{t.subtitle}</p>
        </div>

        <div className="flex items-center gap-2 p-1 bg-slate-900/50 rounded-xl border border-white/5 max-w-sm mx-auto w-full relative z-10 mt-2">
            <button
              onClick={() => setCodeLang('css')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-colors ${codeLang === 'css' ? 'bg-slate-800 text-sky-400 shadow' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Paintbrush2 size={16} />
              {t.langCss}
            </button>
            <button
              onClick={() => setCodeLang('js')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-colors ${codeLang === 'js' ? 'bg-slate-800 text-amber-400 shadow' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <FileJson size={16} />
              {t.langJs}
            </button>
        </div>

        <div className="flex flex-col lg:flex-row w-full gap-6 relative z-10 mt-2">
          
          <div className="flex-1 min-w-0 flex flex-col gap-4">
            <textarea
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              className="w-full flex-1 min-h-[350px] bg-slate-900/50 border border-white/10 rounded-2xl p-4 text-sm text-slate-200 font-mono outline-none focus:ring-2 focus:ring-violet-500/50 resize-y whitespace-pre overflow-auto"
              dir="ltr"
              placeholder={t.inputPlaceholder}
              spellCheck="false"
              wrap="off"
            />
            <button 
              onClick={handleFormat}
              className="flex items-center justify-center gap-2 py-3.5 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-xl transition-all shadow-lg active:scale-95"
            >
              <Wand2 size={18} />
              {t.formatBtn}
            </button>
          </div>

          <div className="flex-1 min-w-0 flex flex-col gap-4 relative">
             <div className="w-full flex-1 min-h-[350px] bg-[#1e1e1e] border border-white/10 rounded-2xl overflow-hidden shadow-inner relative flex flex-col">
                {/* Syntax Highlighted Div overlaying invisble text */}
                <div className="relative flex-1 bg-[#1e1e1e] overflow-auto">
                  <pre className="p-4 m-0 min-h-full w-fit min-w-full text-sm font-mono leading-relaxed whitespace-pre" dir="ltr">
                     <code dangerouslySetInnerHTML={{ __html: highlightedHtml || '<span class="text-slate-500">Formatted output will appear here...</span>' }} />
                  </pre>
                </div>
                
                {outputCode && (
                  <button
                    onClick={handleCopy}
                    className="absolute top-4 right-4 flex items-center justify-center gap-1.5 p-2 bg-slate-800/80 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors border border-white/10 shadow-lg backdrop-blur-md"
                    title={t.copy}
                  >
                    {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                  </button>
                )}
             </div>
             
             <div className="md:hidden">
                <a
                  href={`https://wa.me/?text=${generateShareText()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 rounded-xl text-sm font-bold text-white shadow-lg transition-all border border-white/5 w-full"
                >
                  <Share2 size={16} />
                  {t.shareWhatsapp}
                </a>
             </div>
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
            <Info size={20} className="text-violet-400"/>
            <h2 className="text-lg font-bold text-violet-400">{t.aboutTitle}</h2>
        </div>
        <div className="space-y-4">
          <p>{t.aboutP1}</p>
        </div>
      </article>

    </div>
  );
}
