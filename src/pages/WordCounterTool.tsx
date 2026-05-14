import React, { useState } from 'react';
import { Share2 } from 'lucide-react';

const translations = {
  ar: {
    title: "حاسبة الكلمات والحروف",
    subtitle: "أداة مجانية للكتّاب، المحررين، وخبراء SEO",
    placeholder: "ابدأ بكتابة أو لصق النص هنا...",
    words: "كلمة",
    chars: "حرف",
    charsNoSpaces: "حرف (بدون مسافات)",
    clearText: "مسح النص",
    shareWhatsapp: "مشاركة عبر واتساب",
    articleTitle: "أهمية أداة عداد الكلمات",
    wordCounterBold: "حاسبة الكلمات",
    articleP1Base: "من الأدوات الأساسية لأي شخص يعمل في كتابة المحتوى، سواء كنت طالباً تكتب بحثاً جامعياً، صحفياً يعد تقريراً، أو خبير SEO يهدف لتصدر نتائج محركات البحث.",
    articleH2_1: "لماذا تحتاج لعداد الكلمات؟",
    articleP2: "في عالم الويب، الدقة هي كل شيء. إليك بعض المواقف: ",
    articleList1: "منشورات تويتر (أكس) محدودة بـ 280 حرفاً.",
    articleList2: "العنوان التعريفي (Meta Title) لا يجب أن يتجاوز 60 حرفاً لـ SEO.",
    articleList3: "المقالات المتوافقة مع السيو يُفضل أن تتجاوز 1000 كلمة.",
    articleList4: "الواجبات الجامعية تطلب عدداً دقيقاً من الكلمات.",
    articleH2_2: "الأمان والخصوصية 100%",
    articleP3: "على عكس المواقع الأخرى، حاسبة الكلمات الخاصة بنا تُعالج النصوص داخل متصفحك (Client-side) ولا يتم تخزين أي شيء في خوادمنا ولا تُشارك مع أي طرف على الإطلاق.",
    articleH2_3: "كيف تحسب الكلمات والمسافات؟",
    articleP4: "تعتمد أداتنا على خوارزمية ذكية تتجاهل المسافات الزائدة وتعد الكلمات بشكل دقيق حتى إن كانت مختلطة بين لغات وأرقام ورموز.",
    faqTitle: "الأسئلة الشائعة",
    faqQ1: "هل هذه الأداة مجانية؟",
    faqA1: "نعم، أداة عداد الكلمات مجانية بالكامل ولن نطلب منك التسجيل أو الدفع لاستخدامها.",
    faqQ2: "ما هو الفرق بين الأحرف والأحرف بدون مسافات؟",
    faqA2: "الأحرف تعني كل نقرة على لوحة المفاتيح بما في ذلك زر المسافة. أما الحروف بدون مسافات فهي العدد الصافي للحروف والرموز فقط.",
    faqQ3: "هل تحفظون النصوص التي أقوم بوضعها في الأداة؟",
    faqA3: "إطلاقاً، لا تحتفظ أداتنا بأي نصوص ومعالجة البيانات تتم بداخل جهازك والمتصفح الخاص بك فقط.",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)"
  },
  en: {
    title: "Word and Character Counter",
    subtitle: "A free tool for writers, editors, and SEO experts",
    placeholder: "Start typing or paste your text here...",
    words: "Words",
    chars: "Chars",
    charsNoSpaces: "Chars (no spaces)",
    clearText: "Clear Text",
    shareWhatsapp: "Share via WhatsApp",
    articleTitle: "The Importance of Word Counter Tool",
    wordCounterBold: "Word Counter",
    articleP1Base: "is an essential tool for content creators, students, journalists, and SEO professionals aiming to rank higher in search results.",
    articleH2_1: "Why do you need a word counter?",
    articleP2: "In the digital world, accuracy is everything. Here are some scenarios:",
    articleList1: "Twitter (X) posts are limited to 280 characters.",
    articleList2: "Meta Titles should not exceed 60 characters for SEO.",
    articleList3: "SEO-friendly articles generally prefer 1000+ words.",
    articleList4: "Academic assignments demand precise word counts.",
    articleH2_2: "100% Security and Privacy",
    articleP3: "Unlike other websites, our word counter processes texts locally inside your browser (Client-side). No data is stored on our servers or shared with any third party.",
    articleH2_3: "How does it count words and spaces?",
    articleP4: "Our tool utilizes a smart algorithm that ignores extra spaces and accurately counts words, even if mixed with numbers and symbols.",
    faqTitle: "Frequently Asked Questions",
    faqQ1: "Is this tool free?",
    faqA1: "Yes, the word counter tool is completely free, and we require no registration or payment.",
    faqQ2: "What is the difference between characters and characters without spaces?",
    faqA2: "Characters imply every keystroke including the spacebar. Characters without spaces reflect only the letters, numbers, and symbols.",
    faqQ3: "Do you save the texts I input into the tool?",
    faqA3: "Absolutely not. Our tool retains zero text, and data processing fundamentally transpires locally on your device within your browser.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)"
  }
};

export default function WordCounterTool({ lang }: { lang: 'ar' | 'en' }) {
  const [text, setText] = useState('');
  const t = translations[lang];

  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const charCount = text.length;
  const charNoSpacesCount = text.replace(/\s/g, '').length;

  const currentUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent(
    lang === 'ar' 
      ? `استخدمت حاسبة الكلمات ووجدت أداة رائعة ومجانية، جربها الآن!\nالكلمات: ${wordCount}\nالحروف: ${charCount}\n`
      : `I just used this amazing free Word Counter tool. Check it out!\nWords: ${wordCount}\nChars: ${charCount}\n`
  );
  const whatsappUrl = `https://wa.me/?text=${shareText}${currentUrl}`;

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
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

      {/* FAQs Section */}
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
    </div>
  );
}
