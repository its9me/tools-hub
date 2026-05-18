import React, { useState, useMemo } from 'react';
import { BookOpen, Copy, Check, Info } from 'lucide-react';

const translations = {
  ar: {
    title: "مولد المراجع (Citation Generator)",
    subtitle: "قم بتوليد المراجع والأسانيد العلمية بصيغتي APA و MLA بسهولة للمقالات الأكاديمية.",
    styleLabel: "نمط التفقيط (Style)",
    sourceLabel: "نوع المصدر (Source)",
    book: "كتاب",
    website: "موقع إلكتروني",
    journal: "مقال علمي (Journal)",
    authorFirst: "الاسم الأول للمؤلف",
    authorLast: "اسم العائلة للمؤلف",
    pubYear: "سنة النشر",
    titleField: "العنوان",
    publisherInfo: "الناشر / اسم الموقع / المجلة",
    urlField: "الرابط (URL)",
    pagesField: "الصفحات (مثال: 12-24)",
    generate: "توليد المرجع",
    resultBox: "المرجع المولد:",
    copy: "نسخ",
    copied: "تم النسخ!",
    aboutTitle: "عن مولد المراجع",
    aboutP1: "أداة ضرورية للطلاب والباحثين لتكوين استشهادات دقيقة ومطابقة للمعايير الأكاديمية (APA و MLA). اختر نوع المصدر، وقم بتعبئة الحقول المطلوبة لتحصل على المرجع جاهزاً للنسخ واللصق.",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)"
  },
  en: {
    title: "Citation Generator",
    subtitle: "Generate academic citations in APA and MLA formats easily for your papers.",
    styleLabel: "Citation Style",
    sourceLabel: "Source Type",
    book: "Book",
    website: "Website",
    journal: "Journal Article",
    authorFirst: "Author First Name",
    authorLast: "Author Last Name",
    pubYear: "Publication Year",
    titleField: "Title",
    publisherInfo: "Publisher / Website / Journal Name",
    urlField: "URL",
    pagesField: "Pages (e.g., 12-24)",
    generate: "Generate Citation",
    resultBox: "Generated Citation:",
    copy: "Copy",
    copied: "Copied!",
    aboutTitle: "About Citation Generator",
    aboutP1: "An essential tool for students and researchers to create accurate citations following academic standards (APA & MLA). Select the source type, fill in the details, and get your citation ready to copy and paste.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)"
  }
};

type StyleType = 'APA' | 'MLA';
type SourceType = 'book' | 'website' | 'journal';

export default function CitationGenerator({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const [style, setStyle] = useState<StyleType>('APA');
  const [source, setSource] = useState<SourceType>('book');
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [year, setYear] = useState('');
  const [title, setTitle] = useState('');
  const [publisher, setPublisher] = useState('');
  const [url, setUrl] = useState('');
  const [pages, setPages] = useState('');

  const [copied, setCopied] = useState(false);

  // Auto-generate as user types
  const generatedCitation = useMemo(() => {
    const fName = firstName.trim();
    const lName = lastName.trim();
    const yr = year.trim();
    const tTitle = title.trim();
    const pub = publisher.trim();
    const u = url.trim();
    const pgs = pages.trim();

    if (!lName && !tTitle) return '';

    if (style === 'APA') {
      const authorPart = lName ? `${lName}, ${fName ? fName.charAt(0) + '.' : ''}` : '';
      const yearPart = yr ? ` (${yr}).` : ' (n.d.).';
      
      if (source === 'book') {
        // Last, F. (Year). Title. Publisher.
        return `${authorPart}${authorPart ? yearPart : ''} ${tTitle ? `*${tTitle}*.` : ''} ${pub ? pub + '.' : ''}`.trim();
      } else if (source === 'website') {
        // Last, F. (Year). Title. Website. URL
        return `${authorPart}${authorPart ? yearPart : ''} ${tTitle ? `${tTitle}.` : ''} ${pub ? pub + '.' : ''} ${u ? u : ''}`.trim();
      } else if (source === 'journal') {
        // Last, F. (Year). Title. Journal, pages.
        return `${authorPart}${authorPart ? yearPart : ''} ${tTitle ? `${tTitle}.` : ''} ${pub ? `*${pub}*,` : ''} ${pgs ? pgs + '.' : ''}`.trim();
      }
    } else if (style === 'MLA') {
      const authorPart = lName ? `${lName}${fName ? ', ' + fName : ''}.` : '';
      
      if (source === 'book') {
        // Last, First. Title. Publisher, Year.
        return `${authorPart} ${tTitle ? `*${tTitle}*.` : ''} ${pub ? pub + ',' : ''} ${yr ? yr + '.' : ''}`.trim();
      } else if (source === 'website') {
        // Last, First. "Title." Website, Year, URL.
        return `${authorPart} ${tTitle ? `"${tTitle}."` : ''} ${pub ? `*${pub}*,` : ''} ${yr ? yr + ',' : ''} ${u ? u + '.' : ''}`.trim();
      } else if (source === 'journal') {
        // Last, First. "Title." Journal, Year, pp. pages.
        return `${authorPart} ${tTitle ? `"${tTitle}."` : ''} ${pub ? `*${pub}*,` : ''} ${yr ? yr + ',' : ''} ${pgs ? 'pp. ' + pgs + '.' : ''}`.trim();
      }
    }
    
    return '';
  }, [style, source, firstName, lastName, year, title, publisher, url, pages]);

  const copyToClipboard = async () => {
    if (!generatedCitation) return;
    
    // Convert markdown italics (*) to real italics if copying as rich text, 
    // but for simplicity we will just strip the * or leave them for text.
    // Actually, letting them copy the plain text with * is common, 
    // or we can remove the * for plain text clipboard.
    const plainText = generatedCitation.replace(/\*/g, '');
    
    try {
      await navigator.clipboard.writeText(plainText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const renderCitationHtml = (text: string) => {
    // simple bold/italic parser for *text* -> <i>text</i>
    if (!text) return null;
    const parts = text.split(/(\*[^*]+\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('*') && part.endsWith('*')) {
        return <i key={i}>{part.slice(1, -1)}</i>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      {/* Top AdSense */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm">
        <div className="text-[10px] uppercase tracking-widest mb-1">{t.adTop}</div>
        <p className="text-[10px]">{t.adTopDesc}</p>
      </div>

      <section className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl flex flex-col gap-6 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="text-center relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <BookOpen size={32} className="text-white" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 mt-4">
          
          <div className="space-y-4">
             <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">{t.styleLabel}</label>
                  <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value as StyleType)}
                    className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  >
                    <option value="APA">APA (7th Edition)</option>
                    <option value="MLA">MLA (9th Edition)</option>
                  </select>
               </div>
               <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">{t.sourceLabel}</label>
                  <select
                    value={source}
                    onChange={(e) => setSource(e.target.value as SourceType)}
                    className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  >
                    <option value="book">{t.book}</option>
                    <option value="website">{t.website}</option>
                    <option value="journal">{t.journal}</option>
                  </select>
               </div>
             </div>

             <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4 mt-2">
                <div>
                   <label className="block text-xs font-medium text-slate-400 mb-1">{t.authorFirst}</label>
                   <input
                     type="text"
                     value={firstName}
                     onChange={(e) => setFirstName(e.target.value)}
                     className="w-full bg-slate-900/50 border border-white/10 rounded-lg p-2.5 text-sm text-slate-200 outline-none focus:ring-1 focus:ring-indigo-500"
                   />
                </div>
                <div>
                   <label className="block text-xs font-medium text-slate-400 mb-1">{t.authorLast}</label>
                   <input
                     type="text"
                     value={lastName}
                     onChange={(e) => setLastName(e.target.value)}
                     className="w-full bg-slate-900/50 border border-white/10 rounded-lg p-2.5 text-sm text-slate-200 outline-none focus:ring-1 focus:ring-indigo-500"
                   />
                </div>
             </div>

             <div className="grid grid-cols-4 gap-4">
                <div className="col-span-3">
                   <label className="block text-xs font-medium text-slate-400 mb-1">{t.titleField}</label>
                   <input
                     type="text"
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
                     className="w-full bg-slate-900/50 border border-white/10 rounded-lg p-2.5 text-sm text-slate-200 outline-none focus:ring-1 focus:ring-indigo-500"
                   />
                </div>
                <div className="col-span-1">
                   <label className="block text-xs font-medium text-slate-400 mb-1">{t.pubYear}</label>
                   <input
                     type="text"
                     value={year}
                     onChange={(e) => setYear(e.target.value)}
                     className="w-full bg-slate-900/50 border border-white/10 rounded-lg p-2.5 text-sm text-slate-200 outline-none focus:ring-1 focus:ring-indigo-500"
                     placeholder="YYYY"
                   />
                </div>
             </div>

             <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">{t.publisherInfo}</label>
                <input
                  type="text"
                  value={publisher}
                  onChange={(e) => setPublisher(e.target.value)}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-lg p-2.5 text-sm text-slate-200 outline-none focus:ring-1 focus:ring-indigo-500"
                />
             </div>

             {(source === 'website' || source === 'journal') && (
                <div>
                   <label className="block text-xs font-medium text-slate-400 mb-1">{source === 'website' ? t.urlField : t.pagesField}</label>
                   <input
                     type="text"
                     value={source === 'website' ? url : pages}
                     onChange={(e) => source === 'website' ? setUrl(e.target.value) : setPages(e.target.value)}
                     className="w-full bg-slate-900/50 border border-white/10 rounded-lg p-2.5 text-sm text-slate-200 outline-none focus:ring-1 focus:ring-indigo-500"
                     dir="ltr"
                   />
                </div>
             )}
          </div>

          <div className="flex flex-col bg-slate-900/30 p-6 rounded-2xl border border-white/5 justify-center">
             
            <h3 className="text-sm font-bold text-slate-300 mb-4">{t.resultBox}</h3>
            
            <div className="min-h-[120px] bg-white/5 border border-white/10 rounded-xl p-4 text-slate-200 leading-relaxed font-serif break-words shadow-inner flex items-center justify-center text-center">
               {generatedCitation ? (
                 <div dir="ltr">{renderCitationHtml(generatedCitation)}</div>
               ) : (
                 <span className="text-slate-500 text-sm font-sans">Fill fields to generate citation...</span>
               )}
            </div>

            <div className="mt-6 flex justify-center">
               <button 
                 onClick={copyToClipboard}
                 disabled={!generatedCitation}
                 className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg active:scale-95 w-full justify-center ${generatedCitation ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20' : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5'}`}
               >
                 {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
                 {copied ? t.copied : t.copy}
               </button>
            </div>

          </div>

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
