import React, { useState } from 'react';
import { Share2, Info, Hash, Copy, Check, TrendingUp, Sparkles, Smartphone, Code2, Utensils, Dumbbell, Plane, Palette, Briefcase, Camera } from 'lucide-react';

const translations = {
  ar: {
    title: "مولد الهاشتاجات الذكي",
    subtitle: "احصل على أفضل الهاشتاجات النشطة لإنستقرام وتيك توك حسب مجالك لزيادة المشاهدات والتفاعل.",
    selectCategory: "اختر المجال:",
    generate: "توليد هاشتاجات جديدة",
    copyAll: "نسخ الكل",
    copied: "تم النسخ!",
    noCategory: "يرجى اختيار مجال أولاً",
    shareWhatsapp: "مشاركة الأداة",
    aboutTitle: "عن الأداة",
    aboutP1: "أداة ذكية لمساعدة منشئي المحتوى على منصات مثل إنستقرام وتيك توك في العثور على أفضل الهاشتاجات وأكثرها تفاعلاً. تعتمد الأداة على قاعدة بيانات ضخمة مقسمة حسب المجالات. يمكنك توليد مزيج عشوائي من الهاشتاجات القوية في مجالك بضغطة زر وتضمينها في منشوراتك لزيادة الوصول (Reach).",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)",
    categories: {
      viral: "شائع / تريند",
      tech: "تقنية وبرمجة",
      food: "طبخ ومطاعم",
      sports: "رياضة ولياقة",
      travel: "سفر وسياحة",
      art: "فن وتصميم",
      business: "بزنس وتحفيز",
      fashion: "موضة وأزياء"
    }
  },
  en: {
    title: "Smart Hashtag Generator",
    subtitle: "Get the best active hashtags for Instagram and TikTok based on your niche to boost views.",
    selectCategory: "Select Niche:",
    generate: "Generate Hashtags",
    copyAll: "Copy All",
    copied: "Copied!",
    noCategory: "Please select a category first",
    shareWhatsapp: "Share Tool",
    aboutTitle: "About The Tool",
    aboutP1: "A smart tool to help content creators on platforms like Instagram and TikTok find the best and most engaging hashtags. The tool relies on a large database categorized by niches. You can generate a random mix of strong hashtags in your niche with a single click and include them in your posts to increase reach.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)",
    categories: {
      viral: "Viral / Trending",
      tech: "Tech & Coding",
      food: "Food & Cooking",
      sports: "Sports & Fitness",
      travel: "Travel",
      art: "Art & Design",
      business: "Business & Motivation",
      fashion: "Fashion & Beauty"
    }
  }
};

const hashtagDB = {
  viral: ['#viral', '#trending', '#explore', '#explorepage', '#fyp', '#foryou', '#foryoupage', '#tiktok', '#instagram', '#love', '#instagood', '#like', '#follow', '#photography', '#beautiful', '#picoftheday', '#happy', '#cute', '#instadaily', '#reels', '#viralvideos', '#trend'],
  tech: ['#tech', '#technology', '#programming', '#coding', '#developer', '#coder', '#software', '#javascript', '#python', '#webdeveloper', '#computerscience', '#techgadgets', '#instatech', '#innovation', '#ai', '#artificialintelligence', '#machinelearning', '#cybersecurity', '#linux', '#html', '#css', '#reactjs', '#nodejs'],
  food: ['#food', '#foodporn', '#foodie', '#instafood', '#foodphotography', '#yummy', '#delicious', '#cooking', '#baking', '#chef', '#foodblogger', '#healthyfood', '#tasty', '#dinner', '#lunch', '#breakfast', '#dessert', '#restaurant', '#sweet', '#eat', '#foodlover', '#recipes', '#homemade'],
  sports: ['#sports', '#fitness', '#workout', '#gym', '#motivation', '#fit', '#training', '#health', '#lifestyle', '#healthy', '#bodybuilding', '#football', '#soccer', '#basketball', '#running', '#exercise', '#muscle', '#athlete', '#crossfit', '#sport', '#personaltrainer', '#fitnessmotivation'],
  travel: ['#travel', '#travelphotography', '#photography', '#nature', '#travelgram', '#love', '#photooftheday', '#instatravel', '#wanderlust', '#trip', '#adventure', '#traveling', '#vacation', '#landscape', '#explore', '#beautiful', '#holiday', '#picoftheday', '#naturephotography', '#tourism'],
  art: ['#art', '#artist', '#drawing', '#artwork', '#painting', '#illustration', '#sketch', '#digitalart', '#design', '#photography', '#artistsoninstagram', '#sketchbook', '#contemporaryart', '#creative', '#abstractart', '#graphicdesign', '#instaart', '#watercolor', '#portrait', '#beautiful'],
  business: ['#business', '#entrepreneur', '#motivation', '#success', '#marketing', '#money', '#mindset', '#inspiration', '#businessowner', '#leadership', '#startup', '#entrepreneurship', '#investment', '#finance', '#goals', '#smallbusiness', '#hustle', '#wealth', '#investing', '#quotes'],
  fashion: ['#fashion', '#style', '#ootd', '#fashionblogger', '#beauty', '#instafashion', '#model', '#photography', '#love', '#beautiful', '#outfit', '#makeup', '#shopping', '#lifestyle', '#fashionista', '#design', '#streetstyle', '#jewelry', '#dress', '#photooftheday']
};

const categories = [
  { id: 'viral', icon: Sparkles },
  { id: 'tech', icon: Code2 },
  { id: 'food', icon: Utensils },
  { id: 'sports', icon: Dumbbell },
  { id: 'travel', icon: Plane },
  { id: 'art', icon: Palette },
  { id: 'business', icon: Briefcase },
  { id: 'fashion', icon: Camera }
];

export default function HashtagGenerator({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const [activeCategory, setActiveCategory] = useState<string>('viral');
  const [generatedHashtags, setGeneratedHashtags] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generateMix = (categoryId: string) => {
    setActiveCategory(categoryId);
    const tags = hashtagDB[categoryId as keyof typeof hashtagDB] || [];
    // Shuffle and pick 15
    const shuffled = [...tags].sort(() => 0.5 - Math.random());
    setGeneratedHashtags(shuffled.slice(0, 15));
    setCopied(false);
  };

  const handleCopy = () => {
    if (generatedHashtags.length === 0) return;
    const text = generatedHashtags.join(' ');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate initial load
  React.useEffect(() => {
    generateMix('viral');
  }, []);

  const generateShareText = () => {
    let str = isAr ? '*مولد الهاشتاجات الذكي:*\n\n' : '*Smart Hashtag Generator:*\n\n';
    str += isAr ? `احصل على أفضل الهاشتاجات النشطة لزيادة التفاعل.\n\nجربها هنا: ` : `Get the best active hashtags to boost engagement.\n\nTry it here: `;
    return encodeURIComponent(str + window.location.href);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      {/* Top AdSense */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm">
        <div className="text-[10px] uppercase tracking-widest mb-1">{t.adTop}</div>
        <p className="text-[10px]">{t.adTopDesc}</p>
      </div>

      <section className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl flex flex-col gap-8 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="text-center relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg text-white">
            <Hash size={32} />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">{t.subtitle}</p>
        </div>

        <div className="flex flex-col gap-6 relative z-10">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => generateMix(cat.id)}
                  className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all ${
                    isActive 
                      ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]' 
                      : 'bg-slate-900/50 border-white/5 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <Icon size={24} />
                  <span className="text-xs font-bold text-center">
                    {t.categories[cat.id as keyof typeof t.categories]}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="bg-slate-900/80 rounded-2xl border border-white/5 p-6 flex flex-col gap-4 shadow-inner min-h-[250px]">
             <div className="flex justify-between items-center mb-2">
               <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                 <TrendingUp size={16} className="text-cyan-400"/>
                 {activeCategory ? t.categories[activeCategory as keyof typeof t.categories] : t.noCategory}
               </label>
               <button 
                 onClick={() => generateMix(activeCategory)}
                 className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 bg-cyan-950/30 py-1 px-3 rounded-full"
               >
                 <Sparkles size={12} />
                 {t.generate}
               </button>
             </div>
             
             {generatedHashtags.length > 0 ? (
               <div className="flex flex-wrap gap-2 content-start flex-1 bg-[#1e1e1e] p-4 rounded-xl border border-white/5 shadow-inner">
                 {generatedHashtags.map((tag, idx) => (
                   <span key={idx} className="text-sm text-slate-200 font-mono tracking-wide selection:bg-cyan-500/30">
                     <span className="text-cyan-500 opacity-70">#</span>{tag.replace('#', '')}
                   </span>
                 ))}
               </div>
             ) : (
               <div className="flex-1 flex items-center justify-center text-slate-500 text-sm">
                 {t.noCategory}
               </div>
             )}

             <div className="mt-2 flex justify-end">
               <button
                 onClick={handleCopy}
                 disabled={generatedHashtags.length === 0}
                 className="flex items-center justify-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:hover:bg-cyan-600 text-white font-bold rounded-xl transition-all shadow-lg active:scale-95"
               >
                 {copied ? <Check size={18} /> : <Copy size={18} />}
                 {copied ? t.copied : t.copyAll}
               </button>
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
