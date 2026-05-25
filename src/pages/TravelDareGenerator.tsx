import React, { useState } from 'react';
import { Flame, RefreshCcw, Camera, Utensils, MessageCircle, Map as MapIcon, Share2, Sparkles, Dices, Shuffle } from 'lucide-react';

const dares = [
  {
    id: 1,
    type: 'food',
    ar: 'جرب أكل الشارع الأكثر غراباً في هذه المدينة ولا تسأل عن المكونات إلا بعد أن تأكله!',
    en: 'Try the weirdest street food in this city and don\'t ask about the ingredients until after you eat it!'
  },
  {
    id: 2,
    type: 'photo',
    ar: 'التقط صورة (سيلفي) مع شخص غريب يرتدي قبعة حمراء.',
    en: 'Take a selfie with a stranger wearing a red hat.'
  },
  {
    id: 3,
    type: 'explore',
    ar: 'اسأل أحد السكان المحليين عن مكانه المفضل في المدينة وتوجه إليه فوراً دون بحث في جوجل.',
    en: 'Ask a local for their favorite hidden spot in the city and go there immediately without Googling.'
  },
  {
    id: 4,
    type: 'interaction',
    ar: 'تعلم 5 كلمات باللغة المحلية، وادخل إلى متجر واستخدمها كلها في جملة واحدة.',
    en: 'Learn 5 words in the local language, enter a shop, and try to use all of them in one sentence.'
  },
  {
    id: 5,
    type: 'explore',
    ar: 'اركب وسيلة نقل عامة (حافلة/قطار) وانزل في المحطة السابعة بالضبط مهما كان المكان.',
    en: 'Take public transport (bus/train) and get off at exactly the 7th stop, no matter where it is.'
  },
  {
    id: 6,
    type: 'food',
    ar: 'في المطعم القادم، اطلب من النادل أن يختار لك طبقه المفضل من القائمة وتناوله مهما كان.',
    en: 'At the next restaurant, ask the waiter to surprise you with their favorite dish on the menu and eat it.'
  },
  {
    id: 7,
    type: 'photo',
    ar: 'ابحث عن أقدم مبنى أو جدار في المنطقة والتقط صورة وأنت تقوم بحركة مضحكة أمامه.',
    en: 'Find the oldest building or wall in the area and take a picture doing a funny pose in front of it.'
  },
  {
    id: 8,
    type: 'explore',
    ar: 'ادخل إلى متجر هدايا واشترِ أغرب تذكار يمكنك العثور عليه بقيمة لا تتجاوز 2 دولار.',
    en: 'Go into a souvenir shop and buy the weirdest item you can find for under $2.'
  },
  {
    id: 9,
    type: 'interaction',
    ar: 'ابتسم وقل "مرحباً" بوضوح لـ 5 أشخاص غرباء في الشارع خلال 10 دقائق.',
    en: 'Smile and genuinely say "Hello" to 5 strangers on the street within 10 minutes.'
  },
  {
    id: 10,
    type: 'interaction',
    ar: 'ابحث عن عازف شارع، استمع إليه حتى ينهي مقطوعته بالكامل، ثم صفق له بحرارة.',
    en: 'Find a street musician, listen until they completely finish their song, and applaud enthusiastically.'
  },
  {
    id: 11,
    type: 'food',
    ar: 'اكسر القواعد: اطلب وتناول الحلوى (Dessert) كوجبة رئيسية قبل الغداء.',
    en: 'Break the rules: Order and eat dessert as your main course before lunch.'
  },
  {
    id: 12,
    type: 'photo',
    ar: 'التقط صورة احترافية لقط أو كلب شارع محلي وكأنه نجم عرض أزياء.',
    en: 'Take a professional-looking unposed photo of a local street cat or dog like a supermodel.'
  },
  {
    id: 13,
    type: 'fun',
    ar: 'ارقص لمدة 10 ثوانٍ في ساحة عامة أو مكان مزدحم دون أن تهتم بنظرات الناس.',
    en: 'Dance for 10 seconds in a public square or crowded place without caring who is watching.'
  },
  {
    id: 14,
    type: 'fun',
    ar: 'اعثر على كتاب باللغة المحلية في مكتبة وتظاهر بقراءته بتركيز شديد لمدة دقيقتين.',
    en: 'Find a book in the local language at a bookstore and pretend to read it with intense focus for 2 minutes.'
  },
  {
    id: 15,
    type: 'food',
    ar: 'اذهب إلى سوبر ماركت محلي واشترِ مشروباً غريباً لم تسمع به من قبل وجربه.',
    en: 'Go to a local supermarket, buy a weird beverage you\'ve never heard of before, and try it.'
  },
  {
    id: 16,
    type: 'interaction',
    ar: 'اذهب إلى سوق شعبي وحاول "المكاسرة" (التفاوض) على سعر شيء صغير ولو من باب المزاح.',
    en: 'Go to a local market and try to haggle for a small item, even just as a joke.'
  },
  {
    id: 17,
    type: 'fun',
    ar: 'ارتدِ قميصك أو سترتك بالمقلوب لمدة ساعة كاملة وتجول بها في الخارج.',
    en: 'Wear your shirt or jacket inside out for an entire hour while walking outside.'
  },
  {
    id: 18,
    type: 'photo',
    ar: 'اطلب من شخص غريب أن يلتقط لك صورة، ولكن قم بتسليمه هاتفك بالمقلوب.',
    en: 'Ask a stranger to take your picture, but hand them your phone upside down.'
  },
  {
    id: 19,
    type: 'explore',
    ar: 'امشِ في اتجاه واحد مستقيم لمدة 15 دقيقة دون الالتفات يساراً أو يميناً، ثم استكشف المكان الذي وصلت إليه.',
    en: 'Walk in one straight forward direction for 15 minutes without turning left or right, then explore where you end up.'
  },
  {
    id: 20,
    type: 'interaction',
    ar: 'اعرض التقاط صورة لمجموعة من السياح (أو الأصدقاء) يبدون وكأنهم يواجهون صعوبة في التقاط سيلفي.',
    en: 'Offer to take a photo for a group of tourists (or friends) who look like they are struggling to take a selfie.'
  }
];

const typeIcons: Record<string, any> = {
  food: Utensils,
  photo: Camera,
  explore: MapIcon,
  interaction: MessageCircle,
  fun: Flame
};

const typeColors: Record<string, string> = {
  food: 'from-orange-500 to-amber-500',
  photo: 'from-blue-500 to-cyan-500',
  explore: 'from-emerald-500 to-teal-500',
  interaction: 'from-purple-500 to-pink-500',
  fun: 'from-rose-500 to-red-500'
};

export default function TravelDareGenerator({ lang }: { lang: 'ar' | 'en' }) {
  const isAr = lang === 'ar';
  
  const [currentDare, setCurrentDare] = useState<typeof dares[0] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [history, setHistory] = useState<number[]>([]);

  const generateDare = () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    setCurrentDare(null);

    // Provide a rolling effect
    setTimeout(() => {
      // Pick a random dare that isn't the last one
      let availableDares = dares;
      if (history.length > 0) {
         const lastDareId = history[history.length - 1];
         availableDares = dares.filter(d => d.id !== lastDareId);
      }
      
      const randomIdx = Math.floor(Math.random() * availableDares.length);
      const selected = availableDares[randomIdx];
      
      setCurrentDare(selected);
      setHistory(prev => [...prev, selected.id]);
      setIsGenerating(false);
    }, 600); // 600ms fake loading for suspense
  };

  const handleShare = async () => {
    if (!currentDare) return;
    
    const text = isAr 
      ? `تحدي السفر الخاص بي اليوم:\n\n"${currentDare.ar}"\n\nهل تجرؤ على فعله؟ 🎒✈️` 
      : `My travel dare for today:\n\n"${currentDare.en}"\n\nDo you dare? 🎒✈️`;
      
    if (navigator.share) {
      try {
        await navigator.share({
          title: isAr ? 'تحدي السفر' : 'Travel Dare',
          text: text,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(text);
      alert(isAr ? 'تم نسخ التحدي!' : 'Dare copied to clipboard!');
    }
  };

  const IconComponent = currentDare ? typeIcons[currentDare.type] : Flame;
  const gradientClass = currentDare ? typeColors[currentDare.type] : 'from-slate-600 to-slate-500';

  return (
    <div className="flex flex-col gap-8 p-4 max-w-3xl mx-auto w-full items-center">
      {/* Top AdSense */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm">
        <div className="text-[10px] uppercase tracking-widest mb-1">{isAr ? 'مساحة إعلانية' : 'AdSense Ad'}</div>
        <p className="text-[10px]">{isAr ? 'AD_SPACE_728x90 (أعلى)' : 'AD_SPACE_728x90 (Top)'}</p>
      </div>
      
      {/* Header section */}
      <div className="flex flex-col items-center gap-3 text-center mb-2">
        <div className="w-16 h-16 bg-gradient-to-tr from-rose-500 to-orange-500 text-white rounded-3xl flex items-center justify-center shadow-lg shadow-rose-500/20 rotate-12">
          <Dices size={36} />
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400 tracking-tight">
          {isAr ? 'تحديات السفر المجنونة' : 'The Travel Dare Generator'}
        </h1>
        <p className="text-slate-400 max-w-md mt-2 text-sm md:text-base">
          {isAr 
            ? 'هل مللت من الروتين السياحي؟ اضغط على الزر لتحصل على تحدٍ عشوائي ممتع أو غريب لتقوم به لتصنع ذكريات لا تُنسى ومحتوى رائع!'
            : 'Tired of the tourist routine? Tap the button to get a random, funny, or crazy dare to do on your trip and make unforgettable memories!'}
        </p>
      </div>

      {/* Main Card */}
      <div className="w-full relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 to-orange-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative bg-slate-900 border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-xl shadow-2xl overflow-hidden min-h-[350px] flex flex-col justify-center items-center text-center">
           
           {isGenerating ? (
             <div className="flex flex-col flex-1 items-center justify-center gap-6 animate-pulse">
                <Shuffle size={64} className="text-slate-500 animate-spin" />
                <h2 className="text-2xl font-bold text-slate-400">
                  {isAr ? 'جاري اختيار التحدي...' : 'Picking a dare...'}
                </h2>
             </div>
           ) : currentDare ? (
             <div className="flex flex-col flex-1 items-center justify-center gap-6 w-full animate-in zoom-in-95 fade-in duration-300">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${gradientClass} flex items-center justify-center shadow-lg border-4 border-slate-900 absolute -top-10`}>
                  <IconComponent size={32} className="text-white" />
                </div>
                
                <div className="mt-8 mb-4">
                  <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/5 border border-white/10 mb-4 text-slate-300`}>
                    {isAr && currentDare.type === 'food' ? 'تحدي طعام 🍽️' : 
                     isAr && currentDare.type === 'photo' ? 'تحدي تصوير 📸' : 
                     isAr && currentDare.type === 'explore' ? 'تحدي استكشاف 🗺️' : 
                     isAr && currentDare.type === 'interaction' ? 'تحدي تفاعل 💬' : 
                     isAr && currentDare.type === 'fun' ? 'تحدي جنون 🤪' : 
                     currentDare.type.toUpperCase() + ' DARE'}
                  </span>
                  
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight md:leading-snug">
                     "{isAr ? currentDare.ar : currentDare.en}"
                  </h2>
                </div>
                
             </div>
           ) : (
             <div className="flex flex-col flex-1 items-center justify-center gap-6 w-full text-slate-500">
                 <Sparkles size={64} className="opacity-20 mb-2" />
                 <h2 className="text-2xl font-medium">
                   {isAr ? 'جاهز للمغامرة؟' : 'Ready for an adventure?'}
                 </h2>
                 <p className="text-sm max-w-xs">
                   {isAr ? 'اضغط على الزر بالأسفل لتوليد أول تحدي لك في هذه الرحلة' : 'Click the button below to generate your first dare for this trip'}
                 </p>
             </div>
           )}

        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm mt-4">
         <button
            onClick={generateDare}
            disabled={isGenerating}
            className={`flex-1 py-4 px-6 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all ${
              isGenerating || !currentDare
                ? 'bg-rose-500 hover:bg-rose-400 text-white shadow-lg shadow-rose-500/25'
                : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
            } active:scale-95`}
         >
            <Shuffle size={24} className={isGenerating ? 'animate-spin' : ''} />
            {currentDare ? (isAr ? 'تحدي آخر!' : 'Next Dare!') : (isAr ? 'توليد تحدي!' : 'Generate Dare!')}
         </button>

         {currentDare && (
            <button
               onClick={handleShare}
               className="py-4 px-6 rounded-2xl bg-rose-500 hover:bg-rose-400 text-white font-bold transition-all flex hidden sm:flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-rose-500/25"
               title={isAr ? 'مشاركة كقصة/ستوري' : 'Share as Story/Text'}
            >
               <Share2 size={24} />
            </button>
         )}
         {currentDare && (
            <button
               onClick={handleShare}
               className="py-4 px-6 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all sm:hidden flex items-center justify-center gap-2 border border-white/5"
            >
               <Share2 size={20} />
               {isAr ? 'شارك التحدي' : 'Share Dare'}
            </button>
         )}
      </div>

      {/* Completion Counter */}
      {history.length > 0 && (
         <div className="mt-8 flex items-center gap-2 text-slate-400 bg-white/5 px-6 py-3 rounded-full border border-white/5 animate-in fade-in">
            <Flame className="text-orange-500" size={20} />
            <span className="font-medium text-sm">
               {isAr ? `تحديات شفتها: ${history.length}` : `Dares seen: ${history.length}`}
            </span>
         </div>
      )}

      {/* Middle AdSense */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm my-2">
        <div className="text-[10px] uppercase tracking-widest mb-1">{isAr ? 'مساحة إعلانية' : 'AdSense Ad'}</div>
        <p className="text-[10px]">{isAr ? 'AD_SPACE_728x90 (وسط)' : 'AD_SPACE_728x90 (Middle)'}</p>
      </div>
    </div>
  );
}
