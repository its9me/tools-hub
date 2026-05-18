import React, { useState } from 'react';
import { Search, Share2, Info, LayoutTemplate, Link as LinkIcon, Image as ImageIcon, Facebook, Twitter } from 'lucide-react';

const translations = {
  ar: {
    title: "فاحص العنوان والوصف (Meta Tags)",
    subtitle: "عاين بشكل حي كيف سيظهر موقعك في نتائج بحث جوجل ووسائل التواصل الاجتماعي.",
    titleInput: "عنوان الصفحة (Title)",
    descInput: "الوصف (Description)",
    urlInput: "رابط الصفحة (URL)",
    imageInput: "رابط الصورة (Image URL)",
    preview: "المعاينة الحية",
    chars: "حرف",
    optimalTitle: "المثالي: 50-60",
    optimalDesc: "المثالي: 150-160",
    tabs: {
      google: "جوجل",
      facebook: "فيسبوك",
      twitter: "تويتر (X)"
    },
    shareWhatsapp: "مشاركة الأداة",
    aboutTitle: "عن الأداة",
    aboutP1: "تسمح هذه الأداة بكتابة ومراجعة وسوم الميتا (Meta Tags) مثل العنوان والوصف لمعرفة كيف ستبدو الروابط عند مشاركتها على وسائل التواصل الاجتماعي أو عند ظهورها في محركات البحث مثل جوجل. تساعدك الأداة على ضبط طول النص ليتوافق مع المعايير وتجنب اقتطاع النصوص.",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)"
  },
  en: {
    title: "Meta Tags Previewer",
    subtitle: "Live preview how your website will look in Google search results and social media snippets.",
    titleInput: "Page Title",
    descInput: "Meta Description",
    urlInput: "Page URL",
    imageInput: "Image URL",
    preview: "Live Preview",
    chars: "chars",
    optimalTitle: "Optimal: 50-60",
    optimalDesc: "Optimal: 150-160",
    tabs: {
      google: "Google",
      facebook: "Facebook",
      twitter: "X (Twitter)"
    },
    shareWhatsapp: "Share Tool",
    aboutTitle: "About the Tool",
    aboutP1: "This tool allows you to write and review Meta Tags like Title and Description to see how your links will appear when shared on social media or in search engine results like Google. It helps you adjust text length to meet standards and avoid truncation.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)"
  }
};

export default function MetaTagsPreviewer({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const defaultTitle = isAr ? 'أفضل موقع لتحميل البرامج والأدوات مجاناً | مثال للموقع' : 'Best Website for Free Software and Tools | Example';
  const defaultDesc = isAr ? 'اكتشف أحدث البرامج والأدوات المفيدة للمطورين والمصممين. تحميل سريع وآمن مع روابط مباشرة وتحديثات مستمرة لضمان حصولك على الأفضل دائماً.' : 'Discover the latest useful software and tools for developers and designers. Fast and secure downloads with direct links and continuous updates.';

  const [pageTitle, setPageTitle] = useState(defaultTitle);
  const [description, setDescription] = useState(defaultDesc);
  const [url, setUrl] = useState('https://example.com/tools/best-software');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80');

  const [activeTab, setActiveTab] = useState<'google' | 'facebook' | 'twitter'>('google');

  const getDomain = (urlStr: string) => {
    try {
      const u = new URL(urlStr.includes('http') ? urlStr : `https://${urlStr}`);
      return u.hostname;
    } catch {
      return urlStr || 'example.com';
    }
  };

  const getBreadcrumbs = (urlStr: string) => {
    try {
      const u = new URL(urlStr.includes('http') ? urlStr : `https://${urlStr}`);
      const path = u.pathname.split('/').filter(Boolean).map(p => decodeURIComponent(p)).join(' › ');
      return `https://${u.hostname} ${path ? '› ' + path : ''}`;
    } catch {
      return urlStr || 'example.com';
    }
  };

  // Truncate logic based on typical lengths (visually simulated)
  const truncGoogleTitle = pageTitle.length > 60 ? pageTitle.slice(0, 60) + '...' : pageTitle;
  const truncGoogleDesc = description.length > 160 ? description.slice(0, 155) + '...' : description;
  const truncSocialTitle = pageTitle.length > 70 ? pageTitle.slice(0, 65) + '...' : pageTitle;
  const truncSocialDesc = description.length > 120 ? description.slice(0, 115) + '...' : description;

  const validImageUrl = imageUrl.trim() || 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80';

  const generateShareText = () => {
    let str = isAr ? '*أداة فحص Meta Tags:*\n\n' : '*Meta Tags Previewer Tool:*\n\n';
    str += isAr ? `أداة رائعة لمراجعة كيف ستظهر روابطك على المنصات المختلفة.\n\nجربها هنا: ` : `A great tool to preview how your links will look across platforms.\n\nTry it here: `;
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
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="text-center relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-sky-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg text-white">
            <LayoutTemplate size={32} />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">{t.subtitle}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 relative z-10 mt-4">
          
          <div className="flex-1 flex flex-col gap-5 p-6 bg-slate-900/40 rounded-2xl border border-white/5">
             
             <div>
               <div className="flex justify-between items-end mb-2">
                 <label className="text-sm font-medium text-slate-300">{t.titleInput}</label>
                 <div className="text-xs text-right">
                    <span className={`font-bold ${pageTitle.length > 60 ? 'text-rose-400' : 'text-emerald-400'}`}>{pageTitle.length}</span> <span className="text-slate-500">{t.chars}</span>
                    <p className="text-slate-500">{t.optimalTitle}</p>
                 </div>
               </div>
               <input
                 type="text"
                 value={pageTitle}
                 onChange={(e) => setPageTitle(e.target.value)}
                 className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-sm text-slate-200 outline-none focus:ring-2 focus:ring-cyan-500/50"
                 placeholder="Page Title"
               />
             </div>
             
             <div>
               <div className="flex justify-between items-end mb-2">
                 <label className="text-sm font-medium text-slate-300">{t.descInput}</label>
                 <div className="text-xs text-right">
                    <span className={`font-bold ${description.length > 160 ? 'text-rose-400' : 'text-emerald-400'}`}>{description.length}</span> <span className="text-slate-500">{t.chars}</span>
                    <p className="text-slate-500">{t.optimalDesc}</p>
                 </div>
               </div>
               <textarea
                 value={description}
                 onChange={(e) => setDescription(e.target.value)}
                 className="w-full h-28 bg-slate-800 border border-white/10 rounded-xl p-3 text-sm text-slate-200 outline-none focus:ring-2 focus:ring-cyan-500/50 resize-none"
                 placeholder="Description..."
               />
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div>
                 <label className="text-sm font-medium text-slate-300 mb-2 flex items-center gap-1.5"><LinkIcon size={16}/> {t.urlInput}</label>
                 <input
                   type="text"
                   value={url}
                   onChange={(e) => setUrl(e.target.value)}
                   className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-sm text-slate-200 outline-none focus:ring-2 focus:ring-cyan-500/50 font-mono"
                   dir="ltr"
                 />
               </div>
               <div>
                 <label className="text-sm font-medium text-slate-300 mb-2 flex items-center gap-1.5"><ImageIcon size={16}/> {t.imageInput}</label>
                 <input
                   type="text"
                   value={imageUrl}
                   onChange={(e) => setImageUrl(e.target.value)}
                   className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-sm text-slate-200 outline-none focus:ring-2 focus:ring-cyan-500/50 font-mono"
                   dir="ltr"
                 />
               </div>
             </div>

          </div>

          <div className="flex-1 flex flex-col gap-4">
             <div className="flex items-center gap-2 p-1 bg-slate-900/50 rounded-xl border border-white/5">
                <button
                  onClick={() => setActiveTab('google')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-colors ${activeTab === 'google' ? 'bg-slate-800 text-sky-400 shadow' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  <Search size={16} />
                  {t.tabs.google}
                </button>
                <button
                  onClick={() => setActiveTab('facebook')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-colors ${activeTab === 'facebook' ? 'bg-[#1877f2]/20 text-[#1877f2] shadow' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  <Facebook size={16} />
                  {t.tabs.facebook}
                </button>
                <button
                  onClick={() => setActiveTab('twitter')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-colors ${activeTab === 'twitter' ? 'bg-slate-800 text-slate-200 shadow' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  <Twitter size={16} />
                  {t.tabs.twitter}
                </button>
             </div>
             
             <div className="min-h-[350px] p-4 bg-[#202124] rounded-2xl border border-white/10 flex flex-col" dir={isAr ? 'rtl' : 'ltr'}>
                
                {activeTab === 'google' && (
                  <div className="flex flex-col gap-1 w-full max-w-[600px] mt-4">
                     <div className="flex items-center gap-3">
                        <div className="w-7 h-7 bg-slate-700 rounded-full flex flex-shrink-0 items-center justify-center overflow-hidden">
                          {/* Fake Favicon */}
                          <span className="text-xs text-white font-bold">{getDomain(url).charAt(0).toUpperCase()}</span>
                        </div>
                        <div className="flex flex-col line-clamp-1">
                          <span className="text-sm text-[#dadce0] font-medium leading-none">{getDomain(url)}</span>
                          <span className="text-xs text-[#bdc1c6] leading-none mt-1">{getBreadcrumbs(url)}</span>
                        </div>
                     </div>
                     <h3 className="text-[20px] text-[#8ab4f8] font-medium hover:underline cursor-pointer mt-2 leading-[1.3] truncate max-w-full">
                       {truncGoogleTitle || 'Page Title'}
                     </h3>
                     <p className="text-sm text-[#bdc1c6] mt-1 leading-[1.58] break-words">
                       {truncGoogleDesc || 'Meta description will appear here...'}
                     </p>
                  </div>
                )}

                {activeTab === 'facebook' && (
                  <div className="w-full max-w-[500px] mx-auto mt-2 border border-[#3e4042] rounded overflow-hidden bg-[#242526] flex flex-col">
                    <div className="w-full aspect-[1.91/1] bg-slate-800">
                      <img src={validImageUrl} className="w-full h-full object-cover" alt="Preview" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80'; }} />
                    </div>
                    <div className="p-3 bg-[#242526] flex flex-col gap-1 border-t border-[#3e4042]">
                      <span className="text-[12px] text-[#b0b3b8] uppercase tracking-wide truncate">{getDomain(url)}</span>
                      <h3 className="text-[16px] text-[#e4e6eb] font-semibold leading-tight line-clamp-1">
                        {truncSocialTitle || 'Page Title'}
                      </h3>
                      <p className="text-[14px] text-[#b0b3b8] line-clamp-1">
                        {truncSocialDesc || 'Meta description will appear here...'}
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'twitter' && (
                  <div className="w-full max-w-[500px] mx-auto mt-2 border border-[#2f3336] rounded-2xl overflow-hidden bg-transparent flex flex-col">
                    <div className="w-full aspect-[1.91/1] bg-slate-800">
                      <img src={validImageUrl} className="w-full h-full object-cover" alt="Preview" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80'; }} />
                    </div>
                    <div className="p-3 border-t border-[#2f3336] flex flex-col gap-0.5">
                      <h3 className="text-[15px] text-[#e7e9ea] font-normal line-clamp-1">
                        {truncSocialTitle || 'Page Title'}
                      </h3>
                      <span className="text-[15px] text-[#71767b] truncate mt-0.5">{getDomain(url)}</span>
                    </div>
                  </div>
                )}

             </div>

             <div className="mt-2 text-center md:hidden">
                <a
                  href={`https://wa.me/?text=${generateShareText()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 rounded-xl text-sm font-bold text-white shadow-lg transition-all border border-white/5 w-full"
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
            <Info size={20} className="text-cyan-400"/>
            <h2 className="text-lg font-bold text-cyan-400">{t.aboutTitle}</h2>
        </div>
        <div className="space-y-4">
          <p>{t.aboutP1}</p>
        </div>
      </article>

    </div>
  );
}
