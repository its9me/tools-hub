import React, { useState } from 'react';
import { FileCode2, Share2, Info, Copy, Download, Check, Globe, FileText, Plus, Trash2 } from 'lucide-react';

const translations = {
  ar: {
    title: "مولد Robots.txt و Sitemap",
    subtitle: "قم بإنشاء ملفات robots.txt و sitemap.xml لموقعك بسهولة لتحسين أرشفة محركات البحث.",
    tabRobots: "مولد Robots.txt",
    tabSitemap: "مولد Sitemap.xml",
    
    // Robots.txt
    allowAllBots: "السماح لجميع محركات البحث (User-agent: *)",
    disallowedPaths: "المسارات المحظورة (مسار واحد في كل سطر)",
    disallowedPlaceholder: "مثال:\n/admin/\n/private/\n/tmp/",
    sitemapUrl: "رابط خريطة الموقع (Sitemap URL)",
    sitemapPlaceholder: "https://example.com/sitemap.xml",
    generateRobots: "توليد ملف Robots.txt",
    
    // Sitemap.xml
    urlsList: "روابط الموقع (رابط واحد في كل سطر)",
    urlsPlaceholder: "https://example.com/\nhttps://example.com/about\nhttps://example.com/contact",
    changeFreq: "معدل التحديث الافتراضي (Change Frequency)",
    priority: "الأولوية الافتراضية (Priority)",
    generateSitemap: "توليد ملف Sitemap.xml",
    
    copy: "نسخ النص",
    copied: "تم النسخ!",
    download: "تحميل الملف",
    shareWhatsapp: "مشاركة الأداة",
    aboutTitle: "عن الأداة",
    aboutP1: "أداة ضرورية لأصحاب المواقع ومتخصصي الـ SEO لإنشاء ملفات تحكم بأرشفة الموقع. ملف robots.txt يخبر محركات البحث بالصفحات المسموح والممنوع فهرستها، بينما ملف sitemap.xml يقدم خريطة هيكلية لجميع روابط الموقع لتسهيل وسرعة الأرشفة.",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)"
  },
  en: {
    title: "Robots.txt & Sitemap Generator",
    subtitle: "Easily generate robots.txt and sitemap.xml files for your website to improve SEO crawling.",
    tabRobots: "Robots.txt Gen",
    tabSitemap: "Sitemap.xml Gen",
    
    // Robots.txt
    allowAllBots: "Allow all search engines (User-agent: *)",
    disallowedPaths: "Disallowed Paths (one per line)",
    disallowedPlaceholder: "Example:\n/admin/\n/private/\n/tmp/",
    sitemapUrl: "Sitemap URL",
    sitemapPlaceholder: "https://example.com/sitemap.xml",
    generateRobots: "Generate Robots.txt",
    
    // Sitemap.xml
    urlsList: "Website URLs (one per line)",
    urlsPlaceholder: "https://example.com/\nhttps://example.com/about\nhttps://example.com/contact",
    changeFreq: "Default Change Frequency",
    priority: "Default Priority",
    generateSitemap: "Generate Sitemap.xml",
    
    copy: "Copy Text",
    copied: "Copied!",
    download: "Download File",
    shareWhatsapp: "Share Tool",
    aboutTitle: "About The Tool",
    aboutP1: "An essential tool for webmasters and SEO specialists to create crawling control files. The robots.txt file tells search engines which pages are allowed or disallowed to be indexed, while the sitemap.xml provides a structural map of all site links for easier and faster indexing.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)"
  }
};

const frequencies = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'];
const priorities = ['0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9', '1.0'];

export default function SeoFilesGenerator({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const [activeTab, setActiveTab] = useState<'robots' | 'sitemap'>('robots');

  // Robots params
  const [allowAll, setAllowAll] = useState(true);
  const [disallowed, setDisallowed] = useState('');
  const [sitemapUrl, setSitemapUrl] = useState('');
  const [robotsOutput, setRobotsOutput] = useState('');

  // Sitemap params
  const [urlsStr, setUrlsStr] = useState('');
  const [freq, setFreq] = useState('monthly');
  const [priority, setPriority] = useState('0.5');
  const [sitemapOutput, setSitemapOutput] = useState('');

  const [copied, setCopied] = useState(false);

  const generateRobots = () => {
    let output = `User-agent: *\n`;
    if (!allowAll) {
      output += `Disallow: /\n`;
    } else {
      const paths = disallowed.split('\n').map(p => p.trim()).filter(Boolean);
      if (paths.length === 0) {
        output += `Disallow:\n`;
      } else {
        paths.forEach(p => {
          output += `Disallow: ${p}\n`;
        });
      }
    }
    
    if (sitemapUrl.trim()) {
      output += `\nSitemap: ${sitemapUrl.trim()}\n`;
    }
    setRobotsOutput(output);
    setCopied(false);
  };

  const generateSitemap = () => {
    const urls = urlsStr.split('\n').map(u => u.trim()).filter(Boolean);
    if (urls.length === 0) {
      setSitemapOutput('');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    
    urls.forEach(url => {
      xml += `  <url>\n`;
      xml += `    <loc>${url}</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += `    <changefreq>${freq}</changefreq>\n`;
      xml += `    <priority>${priority}</priority>\n`;
      xml += `  </url>\n`;
    });
    
    xml += `</urlset>`;
    setSitemapOutput(xml);
    setCopied(false);
  };

  const handleCopy = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (content: string, filename: string, type: string) => {
    if (!content) return;
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generateShareText = () => {
    let str = isAr ? '*مولد ملفات SEO (Robots و Sitemap):*\n\n' : '*Robots.txt & Sitemap Generator Tool:*\n\n';
    str += isAr ? `أداة مهمة لإنشاء ملفات الأرشفة والـ SEO لموقعك بسهولة.\n\nجربها هنا: ` : `An essential tool to easily generate SEO and crawling files for your site.\n\nTry it here: `;
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
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="text-center relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg text-white">
            <FileCode2 size={32} />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">{t.subtitle}</p>
        </div>

        <div className="flex items-center gap-2 p-1 bg-slate-900/50 rounded-xl border border-white/5 max-w-md mx-auto w-full relative z-10 mt-2">
            <button
              onClick={() => setActiveTab('robots')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-colors ${activeTab === 'robots' ? 'bg-slate-800 text-green-400 shadow' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <FileText size={16} />
              {t.tabRobots}
            </button>
            <button
              onClick={() => setActiveTab('sitemap')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-colors ${activeTab === 'sitemap' ? 'bg-slate-800 text-green-400 shadow' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Globe size={16} />
              {t.tabSitemap}
            </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 relative z-10 mt-2">
          
          <div className="flex-1 flex flex-col gap-5 p-6 bg-slate-900/40 rounded-2xl border border-white/5">
             
             {activeTab === 'robots' ? (
                <div className="flex flex-col gap-5 animate-in fade-in duration-300">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${allowAll ? 'bg-green-500 border-green-500' : 'bg-slate-800 border-slate-600 group-hover:border-slate-500'}`}>
                      {allowAll && <Check size={14} className="text-white" />}
                    </div>
                    <input
                      type="checkbox"
                      checked={allowAll}
                      onChange={(e) => setAllowAll(e.target.checked)}
                      className="hidden"
                    />
                    <span className="text-sm font-medium text-slate-300 select-none">{t.allowAllBots}</span>
                  </label>

                  {allowAll && (
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">{t.disallowedPaths}</label>
                      <textarea
                        value={disallowed}
                        onChange={(e) => setDisallowed(e.target.value)}
                        className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-sm text-slate-200 outline-none focus:ring-2 focus:ring-green-500/50 font-mono h-28 resize-y"
                        dir="ltr"
                        placeholder={t.disallowedPlaceholder}
                      />
                    </div>
                  )}

                  <div>
                     <label className="block text-sm font-medium text-slate-300 mb-2">{t.sitemapUrl}</label>
                     <input
                       type="url"
                       value={sitemapUrl}
                       onChange={(e) => setSitemapUrl(e.target.value)}
                       className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-sm text-slate-200 outline-none focus:ring-2 focus:ring-green-500/50 font-mono"
                       dir="ltr"
                       placeholder={t.sitemapPlaceholder}
                     />
                  </div>

                  <button 
                    onClick={generateRobots}
                    className="mt-2 flex items-center justify-center gap-2 py-3.5 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-all shadow-lg active:scale-95"
                  >
                    <FileText size={18} />
                    {t.generateRobots}
                  </button>
                </div>
             ) : (
                <div className="flex flex-col gap-5 animate-in fade-in duration-300">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">{t.urlsList}</label>
                    <textarea
                      value={urlsStr}
                      onChange={(e) => setUrlsStr(e.target.value)}
                      className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-sm text-slate-200 outline-none focus:ring-2 focus:ring-green-500/50 font-mono h-40 resize-y whitespace-pre"
                      dir="ltr"
                      placeholder={t.urlsPlaceholder}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div>
                       <label className="block text-sm font-medium text-slate-300 mb-2">{t.changeFreq}</label>
                       <select
                         value={freq}
                         onChange={(e) => setFreq(e.target.value)}
                         className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-sm text-slate-200 outline-none focus:ring-2 focus:ring-green-500/50 font-mono"
                         dir="ltr"
                       >
                         {frequencies.map(f => <option key={f} value={f}>{f}</option>)}
                       </select>
                     </div>
                     <div>
                       <label className="block text-sm font-medium text-slate-300 mb-2">{t.priority}</label>
                       <select
                         value={priority}
                         onChange={(e) => setPriority(e.target.value)}
                         className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-sm text-slate-200 outline-none focus:ring-2 focus:ring-green-500/50 font-mono"
                         dir="ltr"
                       >
                         {priorities.map(p => <option key={p} value={p}>{p}</option>)}
                       </select>
                     </div>
                  </div>

                  <button 
                    onClick={generateSitemap}
                    className="mt-2 flex items-center justify-center gap-2 py-3.5 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-all shadow-lg active:scale-95"
                  >
                    <Globe size={18} />
                    {t.generateSitemap}
                  </button>
                </div>
             )}

          </div>

          <div className="flex-1 flex flex-col gap-4">
             <div className="flex flex-col gap-2 relative h-full min-h-[300px]">
                <textarea
                  readOnly
                  value={activeTab === 'robots' ? robotsOutput : sitemapOutput}
                  className="w-full h-full min-h-[300px] bg-[#1e1e1e] border border-white/10 rounded-xl p-4 text-sm text-green-400 font-mono outline-none resize-none shadow-inner"
                  dir="ltr"
                  placeholder="Output will appear here..."
                />
                
                {(activeTab === 'robots' ? robotsOutput : sitemapOutput) && (
                  <div className="absolute top-2 right-2 flex flex-col gap-2">
                     <button
                       onClick={() => handleCopy(activeTab === 'robots' ? robotsOutput : sitemapOutput)}
                       className="flex items-center justify-center gap-1.5 p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors border border-white/10 shadow-lg"
                       title={t.copy}
                     >
                       {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                     </button>
                     <button
                       onClick={() => handleDownload(
                         activeTab === 'robots' ? robotsOutput : sitemapOutput,
                         activeTab === 'robots' ? 'robots.txt' : 'sitemap.xml',
                         activeTab === 'robots' ? 'text/plain' : 'application/xml'
                       )}
                       className="flex items-center justify-center gap-1.5 p-2.5 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors shadow-lg"
                       title={t.download}
                     >
                       <Download size={16} />
                     </button>
                  </div>
                )}
             </div>

             <div className="mt-2 text-center md:hidden">
                <a
                  href={`https://wa.me/?text=${generateShareText()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 rounded-xl text-sm font-bold text-white shadow-lg transition-all border border-white/5 w-full"
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
            <Info size={20} className="text-green-400"/>
            <h2 className="text-lg font-bold text-green-400">{t.aboutTitle}</h2>
        </div>
        <div className="space-y-4">
          <p>{t.aboutP1}</p>
        </div>
      </article>

    </div>
  );
}
