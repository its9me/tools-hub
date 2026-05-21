import React, { useState, useEffect } from 'react';
import { Share2, Info, Lightbulb, Lock, Unlock, Calendar as CalendarIcon } from 'lucide-react';

const riddles = [
  { ar: { q: "شيء كلما زاد نقص، ما هو؟", a: "العمر" }, en: { q: "What gets smaller as it grows older?", a: "A candle (or age)" } },
  { ar: { q: "شيء يمشي بلا أرجل ويبكي بلا عيون، ما هو؟", a: "السحاب" }, en: { q: "I have no legs, but I walk. I have no eyes, but I cry. What am I?", a: "A cloud" } },
  { ar: { q: "ما هو الشيء الذي لا يتكلم وإذا أكل صدق وإذا جاع كذب؟", a: "الساعة" }, en: { q: "What has hands but cannot clap?", a: "A clock" } },
  { ar: { q: "شيء له أسنان كثيرة ولكنه لا يعض؟", a: "المشط" }, en: { q: "What has teeth but cannot bite?", a: "A comb" } },
  { ar: { q: "كلما كثر لدينا غلا، وكلما قل رخص، ما هو؟", a: "العقل" }, en: { q: "The more you have of it, the less you see. What is it?", a: "Darkness" } },
  { ar: { q: "ما هو الشيء الذي كلما أخذت منه كبر؟", a: "الحفرة" }, en: { q: "The more you take, the more you leave behind. What are they?", a: "Footsteps" } },
  { ar: { q: "يخترق الزجاج ولا يكسره، ما هو؟", a: "الضوء" }, en: { q: "What goes through glass without breaking it?", a: "Light" } },
  { ar: { q: "يوجد في وسط مكة، ما هو؟", a: "حرف الكاف" }, en: { q: "What comes once in a minute, twice in a moment, but never in a thousand years?", a: "The letter M" } },
  { ar: { q: "ابن الماء وإذا وضع فيه مات؟", a: "الثلج" }, en: { q: "What is made of water but if you put it into water it will die?", a: "An ice cube" } },
  { ar: { q: "حامل ومحمول، نصفه ناشف ونصفه مبلول، ما هو؟", a: "السفينة" }, en: { q: "What has a bottom at the top?", a: "Your legs" } },
  { ar: { q: "ما هو الشيء الذي يجري ولا يمشي؟", a: "النهر" }, en: { q: "What runs but never walks, has a mouth but never talks?", a: "A river" } },
  { ar: { q: "يسمع بلا أذن ويتكلم بلا لسان، ما هو؟", a: "الهاتف / الراديو" }, en: { q: "I speak without a mouth and hear without ears.", a: "An echo" } },
  { ar: { q: "مدينة حمراء أسوارها خضراء وسكانها عبيد مفاتيحها من حديد؟", a: "البطيخة" }, en: { q: "It's tall when it's young and short when it's old.", a: "Pencil" } },
  { ar: { q: "طائر يلد ولا يبيض، ما هو؟", a: "الوطواط (الخفاش)" }, en: { q: "What has a neck but no head?", "a": "A bottle" } },
  { ar: { q: "شيء نأكله قبل أن يولد ونأكله بعد الموت، ما هو؟", a: "الدجاجة" }, en: { q: "What gets wetter as it dries?", a: "A towel" } },
  { ar: { q: "ما هو الشيء الذي كلما خطى خطوة فقد شيئاً من ذيله؟", a: "إبرة الخياطة" }, en: { q: "What can you hold in your right hand, but never in your left hand?", a: "Your left hand" } },
  { ar: { q: "ما هو الشيء الذي يقرصك ولا تراه؟", a: "الجوع" }, en: { q: "What kind of band never plays music?", a: "A rubber band" } },
  { ar: { q: "له عين واحدة ولكنه لا يرى، ما هو؟", a: "الإبرة" }, en: { q: "What has one eye but can’t see?", "a": "A needle" } },
  { ar: { q: "ليس شجرة، لكن له أوراق؛ وليس إنساناً، لكنه يتحدث؟", a: "الكتاب" }, en: { q: "It has keys but can't open locks.", a: "A piano" } },
  { ar: { q: "ينام مرتدياً حذاءه ولا يفارقه، ما هو؟", a: "الحصان" }, en: { q: "What goes up but never comes back down?", a: "Your age" } },
  { ar: { q: "أخضر في الساحة، أسود في السوق، أحمر في البيت؟", a: "الشاي" }, en: { q: "What begins with T, ends with T, and has T in it?", a: "A teapot" } },
  { ar: { q: "حيوان لا يشرب الماء وإذا شرب يموت؟", a: "فأر الكنغر" }, en: { q: "What thrives when it is fed but dies when it is watered?", a: "A fire" } },
  { ar: { q: "ما هو البيت الذي ليس فيه أبواب ولا نوافذ؟", a: "بيت الشعر" }, en: { q: "I belong to you, but everyone else uses me. What am I?", a: "Your name" } },
  { ar: { q: "من هو الخال الوحيد لأولاد عمتك؟", a: "أبوك" }, en: { q: "I shave every day, but my beard stays the same. What am I?", a: "A barber" } },
  { ar: { q: "ما هو الشيء الذي يوجد في القطب الشمالي ولا يوجد في القطب الجنوبي؟", a: "حرف الشين" }, en: { q: "I have branches, but no fruit, trunk or leaves. What am I?", a: "A bank" } },
  { ar: { q: "شيء بحجم الكف ويركض في العالم كله؟", a: "الرسالة أو الهاتف" }, en: { q: "What has words, but never speaks?", a: "A book" } },
  { ar: { q: "ما هو الشيء الذي لا يمكن استخدامه إلا إذا كسرته؟", a: "البيضة" }, en: { q: "What has to be broken before you can use it?", a: "An egg" } },
  { ar: { q: "عقرب لا يلدغ ولا يمكنه أن يسمك، ما هو؟", a: "عقرب الساعة" }, en: { q: "If you drop me I’m sure to crack, but give me a smile and I’ll always smile back.", a: "A mirror" } },
  { ar: { q: "أطول من الجبال وأخف من الريش، ما هو؟", a: "الظل" }, en: { q: "What is full of holes but still holds water?", a: "A sponge" } },
  { ar: { q: "شيء نراه في الدقيقة مرتين وفي القرن مرة، ما هو؟", a: "حرف القاف" }, en: { q: "Forward I am heavy, but backward I am not. What am I?", a: "The word NOT" } },
  { ar: { q: "يرتفع ولا ينزل، ما هو؟", a: "العمر" }, en: { q: "What invention lets you look right through a wall?", a: "A window" } },
];

// Helper to expand riddles logically if we want more, but repeating using modulo over the days of the year achieves picking a daily specific riddle safely.
// Doing dayOfYear % riddles.length gives us a deterministic rotating riddle for the entire year.

const translations = {
  ar: {
    title: "لغز اليوم",
    subtitle: "تحدى عقلك يومياً مع لغز جديد مخصص لتاريخ اليوم.",
    showAnswer: "إظهار الحل",
    hideAnswer: "إخفاء الحل",
    riddlePrefix: "لغز اليوم (",
    shareWhatsapp: "تحدى أصدقاءك",
    aboutTitle: "عن الأداة",
    aboutP1: "أداة ذكية تقدم لك لغزاً متجدداً في كل يوم من أيام السنة (بناءً على تاريخ جهازك). قم بتحدي نفسك وأصدقائك في معرفة الحل قبل الضغط على الزر، وعد غداً لتكتشف اللغز الجديد!",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)",
    todayIs: "اليوم:"
  },
  en: {
    title: "Daily Riddle",
    subtitle: "Challenge your mind daily with a new riddle specific to today's date.",
    showAnswer: "Show Answer",
    hideAnswer: "Hide Answer",
    riddlePrefix: "Riddle of the Day (",
    shareWhatsapp: "Challenge Friends",
    aboutTitle: "About The Tool",
    aboutP1: "A smart tool that presents a new riddle every day of the year (based on your device's date). Challenge yourself and your friends to guess the answer before clicking the button, and come back tomorrow for a new one!",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)",
    todayIs: "Today:"
  }
};

export default function DailyRiddle({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const [dateStr, setDateStr] = useState('');
  const [riddleIndex, setRiddleIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const now = new Date();
    // Format date string
    const dStr = now.toLocaleDateString(isAr ? 'ar-EG' : 'en-US', {
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
    });
    setDateStr(dStr);

    // Calculate Day of the Year
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    // Deterministic index
    setRiddleIndex(dayOfYear % riddles.length);
  }, [isAr]);

  const currentRiddle = isAr ? riddles[riddleIndex].ar : riddles[riddleIndex].en;

  const generateShareText = () => {
    let str = isAr ? `*لغز اليوم (رقم ${riddleIndex + 1}):*\n\n` : `*Daily Riddle (#${riddleIndex + 1}):*\n\n`;
    str += `🤔 ${currentRiddle.q}\n\n`;
    str += isAr ? `هل يمكنك حله؟ جرب الأداة هنا: ` : `Can you solve it? Check the answer here: `;
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
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-yellow-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="text-center relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg text-white">
            <Lightbulb size={32} />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">{t.subtitle}</p>
        </div>

        <div className="flex flex-col gap-8 relative z-10 w-full max-w-2xl mx-auto">
          
          <div className="flex items-center justify-center gap-2 text-slate-400 bg-slate-900/50 py-3 px-6 rounded-full border border-white/5 w-max mx-auto shadow-inner">
             <CalendarIcon size={18} className="text-yellow-500" />
             <span className="text-sm font-medium">{t.todayIs} {dateStr}</span>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-white/10 shadow-xl overflow-hidden">
             
             {/* Question Area */}
             <div className="p-8 md:p-10 text-center relative">
                 <span className="absolute top-4 right-4 text-[100px] font-serif text-white/5 leading-none select-none">"</span>
                 <p className="text-2xl md:text-3xl font-bold text-yellow-50 leading-relaxed relative z-10" dir="auto">
                    {currentRiddle.q}
                 </p>
             </div>

             {/* Divider */}
             <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

             {/* Answer Area */}
             <div className="p-6 md:p-8 bg-black/20 flex flex-col items-center justify-center min-h-[160px]">
                 {showAnswer ? (
                     <div className="animate-in fade-in zoom-in duration-300 text-center flex flex-col items-center">
                         <span className="text-sm font-bold text-yellow-500 mb-2 uppercase tracking-widest bg-yellow-500/10 px-3 py-1 rounded-full">{isAr ? 'الإجابة الصحيحة' : 'Correct Answer'}</span>
                         <h3 className="text-3xl md:text-4xl font-black text-white drop-shadow-md" dir="auto">
                             {currentRiddle.a}
                         </h3>
                     </div>
                 ) : (
                     <button 
                        onClick={() => setShowAnswer(true)}
                        className="group flex flex-col items-center gap-3"
                     >
                         <div className="w-16 h-16 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-yellow-400 group-hover:border-yellow-400/50 group-hover:shadow-[0_0_20px_rgba(234,179,8,0.2)] transition-all duration-300">
                             <Lock size={24} className="group-hover:hidden" />
                             <Unlock size={24} className="hidden group-hover:block" />
                         </div>
                         <span className="font-bold text-slate-300 group-hover:text-yellow-400 transition-colors">
                             {t.showAnswer}
                         </span>
                     </button>
                 )}
             </div>
          </div>

        </div>
        
        <div className="flex justify-center pt-4 relative z-10 w-full mt-2 border-t border-white/5">
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
            <Info size={20} className="text-yellow-400"/>
            <h2 className="text-lg font-bold text-yellow-400">{t.aboutTitle}</h2>
        </div>
        <div className="space-y-4">
          <p>{t.aboutP1}</p>
        </div>
      </article>

    </div>
  );
}
