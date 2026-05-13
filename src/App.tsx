import React, { useState, useEffect } from 'react';
import { Share2 } from 'lucide-react';

const translations = {
  ar: {
    appName: "أدواتي",
    appNameSuffix: "Pro",
    home: "الرئيسية",
    otherTools: "أدوات أخرى",
    title: "حاسبة عدد الكلمات والحروف",
    subtitle: "أدخل أو انسخ النص الخاص بك في المربع أدناه لمعرفة التفاصيل بدقة ولحظياً.",
    words: "كلمة (Words)",
    chars: "حرف (Characters)",
    charsNoSpaces: "حرف (بدون مسافات)",
    placeholder: "اكتب أو انسخ النص هنا للبدء بالعد...",
    clearText: "مسح النص",
    shareWhatsapp: "مشاركة الأداة عبر واتساب",
    shareText: "استخدم هذه الأداة الرائعة لحساب عدد الكلمات والحروف في نصوصك مجاناً!",
    articleTitle: "تفاصيل الأداة: ما هي آلة حاسبة الكلمات والحروف؟",
    wordCounterBold: "حاسبة عدد الكلمات",
    articleP1Base: "(Word Counter) من أهم الأدوات الأساسية والمجانية التي يحتاجها صُناع المحتوى، الكُتّاب، المدونين، والمتخصصين في مجالات تحسين محركات البحث (SEO). في عالم التسويق الرقمي وكتابة المحتوى، يُعتبر طول المقال من العوامل المؤثرة بقوة في التصدر في نتائج البحث. تساعدك هذه الأداة على معرفة العدد الدقيق للكلمات والحروف في نصوصك بضغطة زر واحدة وبدون الحاجة لتثبيت برامج ثقيلة أومعقدة.",
    articleH2_1: "كيفية استخدام الأداة بفعالية",
    articleP2: "صُممت واجهة الأداة لتكون صديقة للمستخدم (User-Friendly) ولا تتطلب أي خبرة تقنية مسبقة. كل ما عليك فعله هو:",
    articleList1: "قم بنسخ النص الذي تريد فحصه من مستند وورد، ملف PDF، أو محرر نصوص.",
    articleList2: "ألصق النص في المربع المخصص في أعلى هذه الصفحة.",
    articleList3: "ستقوم خوارزمية الأداة فوراً وتحت جزء من الثانية بتحليل النص وعرض النتائج.",
    articleList4: "يمكنك التعديل والإضافة على النص مباشرة وستلاحظ تغير العدادات في الوقت الفعلي.",
    articleH2_2: "أهمية الأداة لتحسين محركات البحث (SEO)",
    articleP3: "تفضل محركات البحث مثل جوجل المحتوى الشامل الذي يغطي المواضيع من كل جوانبها. تتيح لك حاسبة الكلمات التأكد من أن مقالاتك تتجاوز الحد الأدنى الموصى به للمنافسة في الكلمات المفتاحية الصعبة (والذي يتراوح غالبًا بين 1000 إلى 2000 كلمة). إضافةً لذلك، الأداة مفيدة للغاية عند صياغة العناوين الوصفية (Meta Titles) والوصف (Meta Descriptions) بحيث تضمن عدم تجاوزك للحد الأقصى المسموح للأحرف حتى لا تقتطعها محركات البحث في صفحة النتائج.",
    articleH2_3: "الفوائد لمستخدمي منصات التواصل الاجتماعي",
    articleP4: "لكل منصة تواصل اجتماعي قوانينها وحدودها القصوى للحروف؛ مثلاً منصة X (تويتر سابقاً) تسمح بـ 280 حرفاً للتغريدة الواحدة. وهناك قيود مشابهة للتعليقات والنصوص الوصفية على انستغرام وفيسبوك ولينكد إن. باستخدام عداد الحروف الخاص بنا، يمكنك صياغة رسالتك أو حملتك الإعلانية بذكاء وحرفية لتوصيل فكرتك بالكامل لجمهورك دون التعرض لمواقف مزعجة باقتطاع نصف الكلام.",
    faqTitle: "الأسئلة الشائعة حول أداة حاسبة النصوص (FAQ)",
    faqQ1: "هل أداة حاسبة الكلمات مجانية بالكامل؟",
    faqA1: "نعم، الأداة مجانية 100% ولا تتطلب أي تسجيل أو اشتراك أو إعطاء بيانات شخصية لاستخدامها. يمكنك استخدامها لعدد غير محدود من المرات والنصوص.",
    faqQ2: "كيف يتم حساب عدد الكلمات والحروف بدقة؟",
    faqA2: "تعتمد الأداة على برمجة جافاسكريبت عالية الدقة، حيث تحسب الكلمات عن طريق تحليل الفراغات (المسافات) الفاصلة بين الكلمات المتتالية. كما تعزل الحروف لحسابها إما مع المسافات أو بدونها لتمنحك إحصائيات متكاملة في أجزاء من الثانية.",
    faqQ3: "هل يتم حفظ نصوصي أو تخزينها على الإنترنت؟",
    faqA3: "بالتأكيد لا. تم بناء هذه الأداة لتعمل بالكامل في متصفحك (الجهة التقنية: Client-side). هذا يضمن أن أياً من النصوص أو المستندات الخاصة بك لن يتم إرسالها لأي خادم (سيرفر) ولن تُخزّن أبداً، لتحظى بأقصى درجات الخصوصية والأمان.",
    footerCopyright: "جميع الحقوق محفوظة",
    footerPrivacy: "سياسة الخصوصية",
    footerTerms: "شروط الاستخدام",
    adTop: "إعلان AdSense",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "إعلان AdSense",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)",
  },
  en: {
    appName: "MyTools",
    appNameSuffix: "Pro",
    home: "Home",
    otherTools: "Other Tools",
    title: "Word and Character Counter",
    subtitle: "Enter or paste your text in the box below to see the details accurately and instantly.",
    words: "Words",
    chars: "Characters",
    charsNoSpaces: "Characters (No Spaces)",
    placeholder: "Type or paste text here to start counting...",
    clearText: "Clear Text",
    shareWhatsapp: "Share via WhatsApp",
    shareText: "Use this great tool to count words and characters in your texts for free!",
    articleTitle: "Tool Details: What is a Word and Character Counter?",
    wordCounterBold: "Word Counter",
    articleP1Base: "is one of the essential free tools for content creators, writers, bloggers, and SEO professionals. In digital marketing and content writing, article length heavily affects ranking in search results. This tool helps you know the exact number of words and characters in your texts with a single click, without needing heavy or complex software.",
    articleH2_1: "How to Use the Tool Effectively",
    articleP2: "The tool's interface is designed to be user-friendly and requires no prior technical experience. All you have to do is:",
    articleList1: "Copy the text you want to check from a Word document, PDF, or text editor.",
    articleList2: "Paste the text into the designated box at the top of this page.",
    articleList3: "The tool's algorithm will instantly analyze the text and display the results.",
    articleList4: "You can edit and add to the text directly, and you'll see the counters change in real-time.",
    articleH2_2: "The Importance of the Tool for SEO",
    articleP3: "Search engines like Google prefer comprehensive content that covers topics from all angles. The word counter allows you to ensure your articles exceed the recommended minimum to compete for difficult keywords (often ranging from 1000 to 2000 words). Furthermore, the tool is extremely useful when crafting Meta Titles and Meta Descriptions, ensuring you don't exceed the maximum character limit so search engines don't truncate them in the results page.",
    articleH2_3: "Benefits for Social Media Users",
    articleP4: "Every social media platform has its rules and maximum character limits; for example, X (formerly Twitter) allows 280 characters per tweet. There are similar restrictions for comments and descriptions on Instagram, Facebook, and LinkedIn. Using our character counter, you can smartly and professionally craft your message or ad campaign to fully deliver your idea to your audience without the annoying situation of having half your words cut off.",
    faqTitle: "Frequently Asked Questions about the Text Calculator (FAQ)",
    faqQ1: "Is the word counter tool completely free?",
    faqA1: "Yes, the tool is 100% free and does not require any registration, subscription, or personal data to use. You can use it an unlimited number of times for unlimited texts.",
    faqQ2: "How are words and characters calculated accurately?",
    faqA2: "The tool relies on high-precision JavaScript programming, counting words by analyzing the spaces between consecutive words. It also isolates characters to count them either with or without spaces, giving you comprehensive statistics in fractions of a second.",
    faqQ3: "Are my texts saved or stored online?",
    faqA3: "Absolutely not. This tool is built to run entirely in your browser (Client-side). This ensures that none of your texts or documents will be sent to any server or ever stored, providing you with maximum privacy and security.",
    footerCopyright: "All rights reserved",
    footerPrivacy: "Privacy Policy",
    footerTerms: "Terms of Use",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)",
  }
};

export default function App() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [charNoSpacesCount, setCharNoSpacesCount] = useState(0);

  const t = translations[lang];

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    // Logic: Calculate word and character counts
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s+/g, '').length;
    
    setWordCount(words);
    setCharCount(chars);
    setCharNoSpacesCount(charsNoSpaces);
  }, [text]);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://example.com';
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(t.shareText + ' ' + shareUrl)}`;

  // JSON-LD Schemas for SEO
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": t.title,
    "operatingSystem": "All",
    "applicationCategory": "UtilitiesApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": t.faqQ1,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t.faqA1
        }
      },
      {
        "@type": "Question",
        "name": t.faqQ2,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t.faqA2
        }
      },
      {
        "@type": "Question",
        "name": t.faqQ3,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t.faqA3
        }
      }
    ]
  };

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col relative overflow-hidden ${lang === 'ar' ? 'rtl' : 'ltr'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Background blurred blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] bg-blue-600/20 rounded-full blur-[120px]"></div>
      </div>

      {/* SEO: JSON-LD injection */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Header */}
      <header className="relative z-10 h-16 border-b border-white/10 backdrop-blur-md bg-white/5 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <span className="text-slate-900 font-bold text-lg">{lang === 'ar' ? 'أد' : 'MT'}</span>
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-400 hidden sm:block">
            {t.appName} {t.appNameSuffix}
          </h1>
        </div>
        <nav className="flex items-center gap-4 sm:gap-6">
          <ul className="flex gap-4 sm:gap-6 text-sm font-medium text-slate-400 hidden sm:flex">
            <li><a href="#" className="hover:text-slate-200 transition-colors">{t.home}</a></li>
            <li><a href="#" className="hover:text-slate-200 transition-colors">{t.otherTools}</a></li>
          </ul>
          <button 
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs font-bold text-slate-200 transition-colors backdrop-blur-md"
          >
            {lang === 'ar' ? 'English' : 'العربية'}
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-grow max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
        
        {/* Placeholder: Top AdSense */}
        <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm">
          <div className="text-[10px] uppercase tracking-widest mb-1">{t.adTop}</div>
          <p className="text-[10px]">{t.adTopDesc}</p>
        </div>

        {/* The Interactive Tool Section */}
        <section className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl flex flex-col gap-6">
          <div className="text-center">
            <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
            <p className="text-sm text-slate-400">{t.subtitle}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900/50 border border-white/5 rounded-xl p-6 text-center shadow-inner">
              <span className="block text-3xl font-bold text-emerald-400 mb-1">{wordCount}</span>
              <span className="text-xs font-medium text-slate-400">{t.words}</span>
            </div>
            <div className="bg-slate-900/50 border border-white/5 rounded-xl p-6 text-center shadow-inner">
              <span className="block text-3xl font-bold text-blue-400 mb-1">{charCount}</span>
              <span className="text-xs font-medium text-slate-400">{t.chars}</span>
            </div>
            <div className="bg-slate-900/50 border border-white/5 rounded-xl p-6 text-center shadow-inner">
              <span className="block text-3xl font-bold text-emerald-400 mb-1">{charNoSpacesCount}</span>
              <span className="text-xs font-medium text-slate-400">{t.charsNoSpaces}</span>
            </div>
          </div>

          <div className="relative">
            <textarea
              className="w-full h-64 p-5 bg-slate-900/50 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all resize-y text-slate-200 text-sm md:text-base placeholder:text-slate-500 shadow-inner"
              placeholder={t.placeholder}
              value={text}
              onChange={(e) => setText(e.target.value)}
              dir={lang === 'ar' ? 'rtl' : 'ltr'}
            ></textarea>
            {text.length > 0 && (
              <button 
                onClick={() => setText('')}
                className={`absolute top-4 ${lang === 'ar' ? 'left-4' : 'right-4'} text-[11px] font-medium bg-white/5 hover:bg-white/10 text-slate-300 py-1.5 px-3 rounded-full transition-colors border border-white/10 backdrop-blur-md shadow-sm`}
              >
                {t.clearText}
              </button>
            )}
          </div>

          {/* Social Share */}
          <div className="mt-2 flex justify-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-sm font-bold text-slate-100 shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
            >
              <Share2 size={18} />
              {t.shareWhatsapp}
            </a>
          </div>
        </section>

        {/* Placeholder: Middle AdSense */}
        <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm my-2">
          <div className="text-[10px] uppercase tracking-widest mb-1">{t.adMiddle}</div>
          <p className="text-[10px]">{t.adMiddleDesc}</p>
        </div>

        {/* SEO Optimized Article Section */}
        <article className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col gap-4 text-[13px] text-slate-300 leading-relaxed shadow-lg">
          <h2 className="text-lg font-bold text-emerald-400 border-b border-white/10 pb-4 mb-2">{t.articleTitle}</h2>
          <div className="space-y-5">
            <p>
              {lang === 'ar' ? 'تُعد أداة ' : 'The '}
              <strong className="text-slate-200 font-semibold">{t.wordCounterBold}</strong> 
              {' '}{t.articleP1Base}
            </p>
            
            <h3 className="text-base font-bold text-blue-400 mt-6">{t.articleH2_1}</h3>
            <p>{t.articleP2}</p>
            <ul className="list-disc list-inside space-y-2 mx-4 text-slate-400">
              <li>{t.articleList1}</li>
              <li>{t.articleList2}</li>
              <li>{t.articleList3}</li>
              <li>{t.articleList4}</li>
            </ul>

            <h3 className="text-base font-bold text-blue-400 mt-6">{t.articleH2_2}</h3>
            <p>{t.articleP3}</p>

            <h3 className="text-base font-bold text-blue-400 mt-6">{t.articleH2_3}</h3>
            <p>{t.articleP4}</p>
          </div>
        </article>

        {/* FAQs Section Structured with Schema Layout */}
        <section className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg mb-4">
          <h2 className="text-lg font-bold text-emerald-400 border-b border-white/10 pb-4 mb-6">{t.faqTitle}</h2>
          <div className="space-y-4">
            <details className="group p-4 rounded-xl border border-white/5 bg-slate-900/40 cursor-pointer open:bg-slate-900/60 open:ring-1 open:ring-emerald-500/30 transition-all">
              <summary className="text-sm font-semibold text-slate-200 outline-none flex justify-between items-center">
                {t.faqQ1}
                <span className="text-emerald-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-[13px] text-slate-400 leading-relaxed">
                {t.faqA1}
              </p>
            </details>
            <details className="group p-4 rounded-xl border border-white/5 bg-slate-900/40 cursor-pointer open:bg-slate-900/60 open:ring-1 open:ring-emerald-500/30 transition-all">
              <summary className="text-sm font-semibold text-slate-200 outline-none flex justify-between items-center">
                {t.faqQ2}
                <span className="text-emerald-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-[13px] text-slate-400 leading-relaxed">
                {t.faqA2}
              </p>
            </details>
            <details className="group p-4 rounded-xl border border-white/5 bg-slate-900/40 cursor-pointer open:bg-slate-900/60 open:ring-1 open:ring-emerald-500/30 transition-all">
              <summary className="text-sm font-semibold text-slate-200 outline-none flex justify-between items-center">
                {t.faqQ3}
                <span className="text-emerald-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-[13px] text-slate-400 leading-relaxed">
                {t.faqA3}
              </p>
            </details>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="relative z-10 h-16 border-t border-white/10 backdrop-blur-md bg-white/5 px-4 sm:px-8 flex items-center justify-between text-[11px] text-slate-500 mt-auto">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-slate-400">{t.appName} {t.appNameSuffix}</span>
          <span className="hidden sm:inline">&copy; {new Date().getFullYear()} {t.footerCopyright}</span>
        </div>
        <div className="hidden md:flex gap-4">
          <span>Analytics ID: UA-998877-1</span>
          <span>Schema: SoftwareApplication</span>
        </div>
        <div className="flex gap-3 text-[10px] sm:text-[11px]">
          <span className="hover:text-slate-300 cursor-pointer transition-colors">{t.footerPrivacy}</span>
          <span className="w-px h-3 bg-slate-800 self-center"></span>
          <span className="hover:text-slate-300 cursor-pointer transition-colors">{t.footerTerms}</span>
        </div>
      </footer>
    </div>
  );
}
