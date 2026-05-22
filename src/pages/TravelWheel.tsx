import React, { useState } from 'react';
import { Compass, MapPin, Sparkles, RefreshCcw, Info, CheckCircle2 } from 'lucide-react';
import ShareButtons from '../components/ShareButtons';

const destinations = [
  {
    id: 0,
    color: '#0ea5e9', // Sky
    nameAr: 'جزر المالديف', nameEn: 'Maldives',
    categoryAr: '🏝️ جزر واسترخاء', categoryEn: '🏝️ Islands & Relax',
    tipsAr: ['أفضل وقت للزيارة: نوفمبر إلى إبريل', 'مناسبة جداً لشهر العسل والاسترخاء', 'استكشف عروض التزلج المائي والشعاب المرجانية'],
    tipsEn: ['Best time to visit: Nov to Apr', 'Perfect for honeymooners & relaxation', 'Explore water sports & coral reefs']
  },
  {
    id: 1,
    color: '#ef4444', // Red
    nameAr: 'اليابان', nameEn: 'Japan',
    categoryAr: '🗼 ثقافة وتطور', categoryEn: '🗼 Culture & Tech',
    tipsAr: ['استخدم بطاقة JR Pass لتوفير تكاليف القطارات', 'وجهة ممتازة لعشاق الطعام وتجربة طعام الشارع', 'الربيع (أزهار الساكورا) هو الأجمل والأكثر ازدحاماً'],
    tipsEn: ['Use JR Pass to save on train travel', 'Excellent destination for foodies and street food', 'Spring (Sakura bloom) is beautiful but crowded']
  },
  {
    id: 2,
    color: '#f59e0b', // Amber
    nameAr: 'تركيا', nameEn: 'Turkey',
    categoryAr: '🏰 تاريخ وتسوق', categoryEn: '🏰 History & Shopping',
    tipsAr: ['البازار الكبير في اسطنبول ممتاز للتسوق وشراء الهدايا', 'تجربة منطاد الهواء في كابادوكيا أسطورية ويجب تجربتها', 'الأكل التركي مميز بأسعار معقولة جداً'],
    tipsEn: ['Grand Bazaar in Istanbul is great for shopping', 'Hot air balloons in Cappadocia are legendary', 'Turkish food is amazing and reasonably priced']
  },
  {
    id: 3,
    color: '#8b5cf6', // Violet
    nameAr: 'سويسرا', nameEn: 'Switzerland',
    categoryAr: '🏔️ طبيعة خلابة', categoryEn: '🏔️ Stunning Nature',
    tipsAr: ['بطاقة Swiss Travel Pass تعطي خصومات هائلة ومريحة للتنقل', 'توقع ميزانية مرتفعة نوعاً ما للوجبات والسكن', 'زر مدينة إنترلاكن للقفز المظلي والأنشطة الجبلية'],
    tipsEn: ['Swiss Travel Pass offers huge discounts and convenience', 'Expect a relatively high budget for meals and stays', 'Visit Interlaken for paragliding & mountain activities']
  },
  {
    id: 4,
    color: '#10b981', // Emerald
    nameAr: 'تايلاند', nameEn: 'Thailand',
    categoryAr: '💰 أرخص دولة', categoryEn: '💰 Budget Destination',
    tipsAr: ['وجهة اقتصادية جداً بامتياز تناسب جميع الميزانيات', 'احذر من الأكل المحلي الحار جداً إذا لم تكن معتاداً عليه', 'جزيرة بوكيت خيار مثالي للأنشطة البحرية الممتعة'],
    tipsEn: ['Highly economical destination for all budgets', 'Be careful with very spicy local food', 'Phuket is an ideal choice for marine activities']
  },
  {
    id: 5,
    color: '#ec4899', // Pink
    nameAr: 'إيطاليا', nameEn: 'Italy',
    categoryAr: '🍕 فن وتذوق', categoryEn: '🍕 Art & Culinary',
    tipsAr: ['تجنب المطاعم المكلفة الموجودة في الساحات السياحية الكبرى مباشرة', 'الكولوسيوم والفاتيكان يحتاجان حجزاً مسبقاً بفترة طويلة', 'استعد للكثير من المشي الممتع في شوارع روما وفلورنسا'],
    tipsEn: ['Avoid expensive restaurants right in major tourist squares', 'Colosseum and Vatican require advance booking online', 'Prepare for lots of enjoyable walking in Rome & Florence']
  },
  {
    id: 6,
    color: '#eab308', // Yellow
    nameAr: 'مصر', nameEn: 'Egypt',
    categoryAr: '🐪 حضارة وتاريخ', categoryEn: '🐪 Heritage & History',
    tipsAr: ['فصل الشتاء (ديسمبر - فبرير) هو أفضل وألطف وقت للزيارة', 'احرص على التفاوض (المكاسرة) في الأسواق الشعبية للحصول على سعر عادل', 'الأهرامات والمتحف المصري الكبير تجربة تاريخية لا تُنسى'],
    tipsEn: ['Winter (Dec - Feb) is the best and coolest time to visit', 'Make sure to bargain in local markets for a fair price', 'Pyramids and the Grand Egyptian Museum are unforgettable']
  },
  {
    id: 7,
    color: '#14b8a6', // Teal
    nameAr: 'نيوزيلندا', nameEn: 'New Zealand',
    categoryAr: '⛰️ مغامرة خالصة', categoryEn: '⛰️ Pure Adventures',
    tipsAr: ['استأجر سيارة (كرفان) للتنقل براحة واستكشاف الطبيعة الساحرة', 'مدينة كوينزتاون تعتبر عاصمة المغامرات في العالم للأدرينالين', 'الطقس متقلب؛ كن مستعداً وتأكد من حالة الطقس دائماً'],
    tipsEn: ['Rent a campervan for mobility and exploring stunning nature', 'Queenstown is considered the adventure capital of the world', 'Weather is highly variable; always come prepared']
  },
  {
    id: 8,
    color: '#3b82f6', // Blue
    nameAr: 'العراق', nameEn: 'Iraq',
    categoryAr: '🕌 حضارة وأصالة', categoryEn: '🕌 Heritage & Authenticity',
    tipsAr: ['زور الأهوار في الجنوب لتجربة طبيعية فريدة', 'شارع المتنبي في بغداد مركز ثقافي رائع يفضل زيارته يوم الجمعة', 'الآثار في بابل وأور تأخذك في رحلة لعمق التاريخ'],
    tipsEn: ['Visit the Marshes in the south for a unique natural experience', 'Al-Mutanabbi Street in Baghdad is a wonderful cultural hub', 'Ruins in Babylon and Ur take you deep into history']
  },
  {
    id: 9,
    color: '#f97316', // Orange
    nameAr: 'إيران', nameEn: 'Iran',
    categoryAr: '🏔️ عمارة وطبيعة', categoryEn: '🏔️ Architecture & Nature',
    tipsAr: ['ساحة نقش جهان في أصفهان مبهرة بتفاصيلها المعمارية', 'جرب التزلج في جبال البرز بالقرب من طهران', 'الطعام الإيراني غني بالنكهات كالزعفران والرمان'],
    tipsEn: ['Naqsh-e Jahan Square in Isfahan has stunning architecture', 'Try skiing in the Alborz mountains near Tehran', 'Iranian food is rich in flavors like saffron and pomegranate']
  },
  {
    id: 10,
    color: '#a855f7', // Purple
    nameAr: 'لبنان', nameEn: 'Lebanon',
    categoryAr: '🌲 جبال وبحر', categoryEn: '🌲 Mountains & Sea',
    tipsAr: ['مغارة جعيتا من أجمل العجائب الطبيعية في العالم', 'التلفريك في حريصا يوفر إطلالات بانورامية مذهلة على البحر', 'استمتع بالمطبخ اللبناني الشهير عالمياً وتنوعه'],
    tipsEn: ['Jeita Grotto is one of the most beautiful natural wonders', 'Teleferique in Harissa offers incredible sea views', 'Enjoy the world-famous and diverse Lebanese cuisine']
  },
  {
    id: 11,
    color: '#84cc16', // Lime
    nameAr: 'بريطانيا', nameEn: 'UK',
    categoryAr: '👑 تاريخ ومتاحف', categoryEn: '👑 History & Museums',
    tipsAr: ['معظم المتاحف الكبرى في لندن مجانية الدخول', 'ريف كوتسوولدز يقدم تجربة إنجليزية كلاسيكية هادئة', 'استخدم قطارات الأنفاق (Tube) للتنقل السريع وتجنب الزحام'],
    tipsEn: ['Most major museums in London are free to enter', 'The Cotswolds offer a classic and peaceful English experience', 'Use the Tube for fast transport and avoiding traffic']
  }
];

export default function TravelWheel({ lang }: { lang: 'ar' | 'en' }) {
  const isAr = lang === 'ar';
  
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<typeof destinations[0] | null>(null);

  const handleSpin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setResult(null); // Hide previous result

    const targetIndex = Math.floor(Math.random() * destinations.length);
    
    // Each slice is 360/8 = 45 degrees.
    // The center of slice index 0 is at 22.5 degrees.
    // To land a slice at the TOP (0/360 degrees), we need the wheel to rotate such that:
    // current_angle + target_center_angle = 360
    
    const sliceAngle = 360 / destinations.length;
    const targetCenterAngle = (targetIndex * sliceAngle) + (sliceAngle / 2);
    const newTargetAngle = 360 - targetCenterAngle; // Angle required to put target at top

    const currentAngle = rotation % 360;
    let distance = newTargetAngle - currentAngle;
    
    // Ensure we always spin forward
    if (distance < 0) {
      distance += 360;
    }
    
    const spins = 5; // Spin 5 full times
    const finalRotation = rotation + distance + (360 * spins);

    setRotation(finalRotation);

    // Wait for the animation to finish
    setTimeout(() => {
      setIsSpinning(false);
      setResult(destinations[targetIndex]);
    }, 4000);
  };

  // Build conic gradient string dynamically
  const gradientString = destinations.map((d, i) => {
    const start = i * (360 / destinations.length);
    const end = (i + 1) * (360 / destinations.length);
    return `${d.color} ${start}deg ${end}deg`;
  }).join(', ');

  return (
    <div className="flex flex-col gap-8 p-4 max-w-4xl mx-auto w-full items-center">
      
      {/* Header section */}
      <div className="flex flex-col items-center gap-3 text-center mb-4">
        <div className="w-16 h-16 bg-gradient-to-tr from-sky-500 to-indigo-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-sky-500/20">
          <Compass size={36} className={isSpinning ? 'animate-spin' : ''} />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
          {isAr ? 'وين أسافر؟ عجلة الحظ السياحية' : 'Where To Travel? The Travel Wheel'}
        </h1>
        <p className="text-slate-400 max-w-md">
          {isAr 
            ? 'متردد ولا تعرف أين تقضي إجازتك القادمة؟ دع عجلة الحظ السياحية تقرر عنك وتستعرض لك وجهتك المثالية مع أهم النصائح.'
            : 'Undecided on your next vacation? Let the travel wheel decide for you and reveal your perfect destination with top tips.'}
        </p>
      </div>

      <div className="w-full flex flex-col md:flex-row gap-12 items-center justify-center md:items-start min-h-[400px]">
        
        {/* WHeel Container */}
        <div className="relative flex justify-center items-center py-4 shrink-0">
          
          {/* Pointer */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center drop-shadow-2xl">
            <div className="w-8 h-8 rounded-full bg-white shadow-xl flex items-center justify-center border-4 border-slate-900 z-10 relative">
               <div className="w-2 h-2 rounded-full bg-slate-900" />
            </div>
            <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[20px] border-transparent border-t-white -mt-2 drop-shadow-md relative z-0" />
          </div>

          {/* The Spinning Wheel */}
          <div 
            className="relative rounded-full overflow-hidden w-[300px] h-[300px] md:w-[340px] md:h-[340px] shadow-[0_0_50px_rgba(14,165,233,0.15)] border-8 border-slate-900 bg-slate-900 ring-4 ring-white/10"
            style={{
              background: `conic-gradient(${gradientString})`,
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning ? 'transform 4s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none' // Only physical inertia ease-out on active spin
            }}
          >
            {destinations.map((dest, i) => {
              const sliceAngle = 360 / destinations.length;
              const rotationDegree = (i * sliceAngle) + (sliceAngle / 2); // Center text in its slice
              return (
                <div
                  key={dest.id}
                  className="absolute top-0 left-1/2 w-[80px] h-[150px] md:h-[170px] origin-bottom -translate-x-1/2 flex justify-center"
                  style={{ transform: `rotate(${rotationDegree}deg)` }}
                >
                  <span 
                    className="block mt-4 md:mt-6 text-center font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] px-2 text-sm md:text-base leading-tight"
                  >
                    {isAr ? dest.nameAr : dest.nameEn}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Center Spin Button */}
          <button
             onClick={handleSpin}
             disabled={isSpinning}
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-slate-900 border-[6px] border-slate-800 rounded-full z-30 flex items-center justify-center text-white font-extrabold text-lg md:text-xl hover:scale-110 hover:border-sky-500 transition-all active:scale-95 disabled:scale-100 disabled:opacity-80 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(0,0,0,0.8)] focus:outline-none"
             style={{ 'WebkitTapHighlightColor': 'transparent' } as any}
          >
            {isSpinning ? (isAr ? '...' : '...') : (isAr ? 'لف!' : 'SPIN')}
          </button>
        </div>

        {/* Results Container */}
        <div className="w-full max-w-md h-full flex flex-col justify-center">
          {result ? (
            <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl animate-in slide-in-from-right-8 fade-in duration-500">
              <div 
                className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-4 border shadow-inner"
                style={{ backgroundColor: `${result.color}20`, color: result.color, borderColor: `${result.color}40` }}
              >
                {isAr ? result.categoryAr : result.categoryEn}
              </div>
              
              <h2 className="text-3xl font-black text-white mb-2 tracking-tight">
                {isAr ? result.nameAr : result.nameEn}
              </h2>
              
              <div className="h-px w-full bg-white/10 my-4"></div>
              
              <h3 className="text-sm font-medium text-slate-400 mb-4 flex items-center gap-2 uppercase tracking-wide">
                <Sparkles size={16} className="text-amber-400" />
                {isAr ? '3 نصائح سريعة قبل السفر' : '3 Quick Travel Tips'}
              </h3>
              
              <ul className="space-y-4 mb-8">
                {(isAr ? result.tipsAr : result.tipsEn).map((tip, idx) => (
                  <li key={idx} className="flex gap-3 text-slate-200">
                    <CheckCircle2 size={20} className="text-sky-400 shrink-0 mt-0.5" />
                    <span className="text-sm leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={handleSpin}
                className="w-full py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCcw size={18} />
                {isAr ? 'لف مرة أخرى وجرب حظك' : 'Spin Again & Try Your Luck'}
              </button>

              <ShareButtons 
                 text={isAr ? `نصيبي من عجلة الحظ السياحية طلع: ${result.nameAr} !\n${result.categoryAr}` : `The travel wheel picked my next destination: ${result.nameEn} !\n${result.categoryEn}`} 
                 lang={lang} 
              />
            </div>
          ) : (
            <div className="h-full min-h-[350px] bg-white/[0.02] border border-dashed border-white/10 rounded-3xl p-8 flex flex-col text-center items-center justify-center text-slate-500">
              <MapPin size={48} className="opacity-20 mb-4" />
              <p className="text-lg font-medium">
                {isSpinning 
                  ? (isAr ? 'جاري البحث عن وجهتك القادمة...' : 'Finding your next destination...')
                  : (isAr ? 'اضغط على زر "لف!" لاكتشاف وجهتك السياحية القادمة' : 'Click "SPIN" to discover your next travel destination')}
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
