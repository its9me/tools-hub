import React, { useState } from 'react';
import { HeartHandshake, User, ArrowRight, ArrowLeft, RefreshCcw, ShieldAlert, Sparkles, Plane, Map, Coffee, CheckCircle2 } from 'lucide-react';
import ShareButtons from '../components/ShareButtons';

const questions = [
  {
    id: 1,
    ar: 'متى تفضل الاستيقاظ أثناء السفر؟',
    en: 'When do you prefer to wake up while traveling?',
    options: [
      { id: 'a', ar: 'مبكراً جداً (6-8 صباحاً) للاستفادة من اليوم', en: 'Early bird (6-8 AM) to seize the day', score: 1 },
      { id: 'b', ar: 'في وقت معقول (9-10 صباحاً)', en: 'Reasonable time (9-10 AM)', score: 2 },
      { id: 'c', ar: 'متأخراً (بعد 11 صباحاً) أنا في إجازة!', en: 'Late (after 11 AM) I am on vacation!', score: 3 }
    ]
  },
  {
    id: 2,
    ar: 'كيف تخطط لرحلتك؟',
    en: 'How do you plan your trip?',
    options: [
      { id: 'a', ar: 'جدول دقيق بجدول زمني لكل ساعة', en: 'Detailed itinerary hour by hour', score: 1 },
      { id: 'b', ar: 'خطة عامة للأماكن مع مرونة في الوقت', en: 'General plan with flexibility', score: 2 },
      { id: 'c', ar: 'عفوية تامة.. نصل ونقرر!', en: 'Completely spontaneous.. we arrive and decide!', score: 3 }
    ]
  },
  {
    id: 3,
    ar: 'ما هو إيقاعك في السفر؟',
    en: 'What is your travel pace?',
    options: [
      { id: 'a', ar: 'سريع جداً.. أريد رؤية كل شيء!', en: 'Very fast.. I want to see everything!', score: 1 },
      { id: 'b', ar: 'متوازن بين الاستكشاف والراحة', en: 'Balanced between exploring and resting', score: 2 },
      { id: 'c', ar: 'بطيء جداً.. تهمني جودة اللحظة لا كثرة الأماكن', en: 'Very slow.. quality over quantity', score: 3 }
    ]
  },
  {
    id: 4,
    ar: 'ما هي ميزانيتك المفضلة للطعام؟',
    en: 'What is your food budget preference?',
    options: [
      { id: 'a', ar: 'أكل الشارع والمطاعم الرخيصة', en: 'Street food and cheap eats', score: 1 },
      { id: 'b', ar: 'مطاعم متوسطة مع تجربة أو اثنتين فاخرة', en: 'Mid-range with one or two fancy meals', score: 2 },
      { id: 'c', ar: 'مطاعم فاخرة ومقاهي راقية دائماً', en: 'Always fancy restaurants and cafes', score: 3 }
    ]
  },
  {
    id: 5,
    ar: 'أين تفضل السكن؟',
    en: 'Where do you prefer to stay?',
    options: [
      { id: 'a', ar: 'نزل اقتصادي (هوستل) / مكان للنوم فقط', en: 'Hostel / Just a place to sleep', score: 1 },
      { id: 'b', ar: 'شقة مريحة أو فندق متوسط', en: 'Comfortable apartment or mid-range hotel', score: 2 },
      { id: 'c', ar: 'منتجع أو فندق 5 نجوم للرفاهية', en: 'Resort or 5-star luxury hotel', score: 3 }
    ]
  },
  {
    id: 6,
    ar: 'بالنسبة للأمتعة والحقائب؟',
    en: 'Regarding luggage?',
    options: [
      { id: 'a', ar: 'حقيبة ظهر واحدة فقط (خفيف جداً)', en: 'Just a backpack (traveling very light)', score: 1 },
      { id: 'b', ar: 'حقيبة سفر متوسطة تكفي الحاجة', en: 'One medium checked bag', score: 2 },
      { id: 'c', ar: 'حقائب كثيرة للاستعداد لأي مناسبة وتسوق!', en: 'Many bags for every occasion and shopping!', score: 3 }
    ]
  },
  {
    id: 7,
    ar: 'كيف تقضي ليلتك في السفر؟',
    en: 'How do you spend your evenings?',
    options: [
      { id: 'a', ar: 'سهر طويل واستكشاف الحياة الليلية', en: 'Late night out and exploring nightlife', score: 1 },
      { id: 'b', ar: 'عشاء هادئ ومشي خفيف', en: 'Quiet dinner and a light walk', score: 2 },
      { id: 'c', ar: 'العودة مبكراً للفندق للراحة', en: 'Return early to the hotel to rest', score: 3 }
    ]
  },
  {
    id: 8,
    ar: 'إذا فاتكم القطار أو حدثت مشكلة غير متوقعة؟',
    en: 'If you miss the train or an unexpected issue occurs?',
    options: [
      { id: 'a', ar: 'أتوتر جداً وينعكس ذلك على يومي', en: 'I get very stressed and it ruins my day', score: 1 },
      { id: 'b', ar: 'أنزعج قليلاً لكن أبحث عن بديل بسرعة', en: 'Slightly annoyed but quick to find an alternative', score: 2 },
      { id: 'c', ar: 'أضحك وأعتبرها جزءاً من المغامرة!', en: 'Laugh and consider it part of the adventure!', score: 3 }
    ]
  },
  {
    id: 9,
    ar: 'ما هو هدفك الأساسي من السفر؟',
    en: 'What is your main goal for traveling?',
    options: [
      { id: 'a', ar: 'التعرف على ثقافات وتاريخ جديد وأنشطة كثيرة', en: 'Culture, history and lots of activities', score: 1 },
      { id: 'b', ar: 'الاسترخاء التام والهروب من ضغط العمل', en: 'Total relaxation and escape from work stress', score: 2 },
      { id: 'c', ar: 'التسوق والتصوير والكافيهات الجميلة', en: 'Shopping, photos, and aesthetic cafes', score: 3 }
    ]
  },
  {
    id: 10,
    ar: 'في الخلافات حول اختيار المطعم أو النشاط:',
    en: 'In disagreements over choosing a restaurant or activity:',
    options: [
      { id: 'a', ar: 'أتنازل غالباً لتجنب الجدال', en: 'I usually compromise to avoid arguments', score: 1 },
      { id: 'b', ar: 'نتناقش ونصل لحل وسط', en: 'We discuss and reach a middle ground', score: 2 },
      { id: 'c', ar: 'أصمم على رأيي لأن هذا ما خططت له', en: 'I stick to my opinion because I planned it', score: 3 }
    ]
  }
];

export default function TravelCompatibility({ lang }: { lang: 'ar' | 'en' }) {
  const isAr = lang === 'ar';
  
  const [step, setStep] = useState<'intro' | 'setup' | 'quiz' | 'pass' | 'results'>('intro');
  const [currentUser, setCurrentUser] = useState<1 | 2>(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  
  const [answers1, setAnswers1] = useState<number[]>([]);
  const [answers2, setAnswers2] = useState<number[]>([]);

  const handleStartSetup = () => setStep('setup');
  
  const handleStartQuiz = () => {
    if (!player1Name.trim()) setPlayer1Name(isAr ? 'الشخص الأول' : 'Person 1');
    if (!player2Name.trim()) setPlayer2Name(isAr ? 'الشخص الثاني' : 'Person 2');
    
    setStep('quiz');
    setCurrentUser(1);
    setCurrentQuestionIndex(0);
    setAnswers1([]);
    setAnswers2([]);
  };

  const handleAnswer = (score: number) => {
    if (currentUser === 1) {
      setAnswers1([...answers1, score]);
    } else {
      setAnswers2([...answers2, score]);
    }
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // End of quiz for current user
      if (currentUser === 1) {
        setStep('pass');
      } else {
        setStep('results');
      }
    }
  };

  const handlePassPhone = () => {
    setCurrentUser(2);
    setCurrentQuestionIndex(0);
    setStep('quiz');
  };

  const resetQuiz = () => {
    setStep('intro');
    setCurrentUser(1);
    setCurrentQuestionIndex(0);
    setPlayer1Name('');
    setPlayer2Name('');
    setAnswers1([]);
    setAnswers2([]);
  };

  // Calculate compatibility
  const calculateCompatibility = () => {
    let totalScore = 0;
    let maxScore = questions.length * 2; // Max diff per question is 2 (e.g., 3-1 = 2)

    let conflicts: { q: any, a1: number, a2: number }[] = [];

    for (let i = 0; i < questions.length; i++) {
        const diff = Math.abs(answers1[i] - answers2[i]);
        if (diff === 0) {
            totalScore += 2; // Perfect match
        } else if (diff === 1) {
            totalScore += 1; // Close match
        } else {
            // diff === 2 (Opposite) -> 0 points
            conflicts.push({
                q: questions[i],
                a1: answers1[i],
                a2: answers2[i]
            });
        }
    }

    const percentage = Math.round((totalScore / maxScore) * 100);
    return { percentage, conflicts };
  };

  const getResultMessage = (percentage: number) => {
    if (percentage >= 85) return isAr ? 'توأم روح السفر! انسجام مثالي 🤩' : 'Travel Soulmates! Perfect Harmony 🤩';
    if (percentage >= 65) return isAr ? 'شركاء ممتازون مع بعض التنازلات الجيدة 👍' : 'Great partners with some good compromises 👍';
    if (percentage >= 40) return isAr ? 'يحتاجان لتخطيط مسبق لتجنب الخلافات المضحكة 😅' : 'Need prep planning to avoid funny conflicts 😅';
    return isAr ? 'رحلة ملحمية مليئة بالدراما والمغامرات! 🥊' : 'An epic trip full of drama and adventure! 🥊';
  };

  return (
    <div className="flex flex-col gap-6 p-4 max-w-2xl mx-auto w-full">
      {/* Top AdSense */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm">
        <div className="text-[10px] uppercase tracking-widest mb-1">{isAr ? 'مساحة إعلانية' : 'AdSense Ad'}</div>
        <p className="text-[10px]">{isAr ? 'AD_SPACE_728x90 (أعلى)' : 'AD_SPACE_728x90 (Top)'}</p>
      </div>
      <div className="flex items-center gap-4 mb-2">
        <div className="w-12 h-12 bg-rose-500/20 text-rose-400 rounded-xl flex items-center justify-center shrink-0">
          <HeartHandshake size={28} />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-100">
            {isAr ? 'فاحص شركاء السفر' : 'Travel Compatibility Tester'}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            {isAr 
              ? 'هل أنتم متوافقون في السفر أم ستنتهي الرحلة بشجار؟' 
              : 'Are you compatible travelers or will the trip end in a fight?'}
          </p>
        </div>
      </div>

      {/* INTRO STEP */}
      {step === 'intro' && (
        <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-xl shadow-2xl text-center flex flex-col items-center animate-in fade-in zoom-in-95">
          <Plane size={64} className="text-rose-400 mb-6 drop-shadow-lg" />
          <h2 className="text-3xl font-black text-white mb-4">
            {isAr ? 'هل أنت مسافر مثالي؟' : 'Are You The Perfect Travel Partner?'}
          </h2>
          <p className="text-slate-400 max-w-md mx-auto mb-8 leading-relaxed">
            {isAr 
              ? 'أداة ممتعة للأصدقاء أو الأزواج. يجيب الشخص الأول على 10 أسئلة لمعرفة طباعه في السفر، ثم يمرر الهاتف للثاني. سنخبركم بمدى توافقكم وأين ستحدث الخلافات!'
              : 'A fun tool for friends or couples. Person 1 answers 10 questions about their travel habits, then passes the phone. We will tell you your compatibility and where you might clash!'}
          </p>
          <button 
            onClick={handleStartSetup}
            className="w-full sm:w-auto px-8 py-4 bg-rose-500 hover:bg-rose-400 text-white rounded-2xl font-bold text-lg transition-all shadow-lg shadow-rose-500/25 active:scale-95"
          >
            {isAr ? 'ابدأ الفحص الآن' : 'Start Tester Now'}
          </button>
        </div>
      )}

      {/* SETUP STEP */}
      {step === 'setup' && (
        <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl animate-in slide-in-from-right-8 fade-in">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            {isAr ? 'من سيسافر معاً؟' : 'Who is traveling together?'}
          </h2>
          
          <div className="space-y-6 max-w-md mx-auto">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                {isAr ? 'اسم الشخص الأول (المسافر 1):' : 'Person 1 Name:'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User size={18} className="text-slate-500" />
                </div>
                <input 
                  type="text" 
                  value={player1Name}
                  onChange={e => setPlayer1Name(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 pl-11 pr-4 py-3 rounded-xl text-white focus:border-rose-500 focus:outline-none transition-colors"
                  placeholder={isAr ? 'اكتب الاسم هنا...' : 'Enter name...'}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                {isAr ? 'اسم الشخص الثاني (المسافر 2):' : 'Person 2 Name:'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User size={18} className="text-slate-500" />
                </div>
                <input 
                  type="text" 
                  value={player2Name}
                  onChange={e => setPlayer2Name(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 pl-11 pr-4 py-3 rounded-xl text-white focus:border-rose-500 focus:outline-none transition-colors"
                  placeholder={isAr ? 'اكتب الاسم هنا...' : 'Enter name...'}
                />
              </div>
            </div>

            <button 
              onClick={handleStartQuiz}
              className="w-full mt-4 px-8 py-4 bg-rose-500 hover:bg-rose-400 text-white rounded-xl font-bold transition-all shadow-lg shadow-rose-500/25 active:scale-95"
            >
              {isAr ? 'التالي' : 'Next'}
            </button>
          </div>
        </div>
      )}

      {/* QUIZ STEP */}
      {step === 'quiz' && (
        <div className="bg-slate-900 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl animate-in fade-in">
          
          <div className="flex justify-between items-center mb-8">
             <div className="bg-slate-800 border border-white/5 px-4 py-2 rounded-full flex items-center gap-2">
                <User size={16} className="text-rose-400" />
                <span className="font-bold text-white text-sm">
                   {currentUser === 1 ? player1Name : player2Name} {isAr ? 'يجيب الآن...' : 'is answering...'}
                </span>
             </div>
             <div className="text-sm font-bold text-slate-500">
               {currentQuestionIndex + 1} / {questions.length}
             </div>
          </div>

          <div className="mb-8">
             <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-6">
                <div 
                  className="bg-rose-500 h-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
                ></div>
             </div>
             
             <h3 className="text-xl md:text-2xl font-bold text-white leading-relaxed">
               {isAr ? questions[currentQuestionIndex].ar : questions[currentQuestionIndex].en}
             </h3>
          </div>

          <div className="space-y-3">
             {questions[currentQuestionIndex].options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleAnswer(opt.score)}
                  className="w-full p-4 border border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 hover:border-rose-400/50 text-left transition-all group flex items-start gap-4"
                >
                  <div className="w-6 h-6 rounded-full border-2 border-slate-600 group-hover:border-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                     <div className="w-2.5 h-2.5 rounded-full bg-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <span className="text-slate-200 font-medium leading-tight">
                    {isAr ? opt.ar : opt.en}
                  </span>
                </button>
             ))}
          </div>
        </div>
      )}

      {/* PASS PHONE STEP */}
      {step === 'pass' && (
        <div className="bg-slate-900 border border-rose-500/30 rounded-3xl p-8 md:p-12 backdrop-blur-xl shadow-[0_0_50px_rgba(244,63,94,0.1)] text-center flex flex-col items-center animate-in zoom-in-95 fade-in">
          <div className="w-24 h-24 bg-rose-500/20 text-rose-400 rounded-full flex items-center justify-center mb-6 animate-pulse border-4 border-slate-900 shadow-lg relative">
             <HeartHandshake size={48} />
             <div className="absolute top-0 right-0 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center border-2 border-slate-900 text-white">
                <CheckCircle2 size={16} />
             </div>
          </div>
          <h2 className="text-3xl font-black text-white mb-4">
            {isAr ? 'عظيم يا' : 'Great Job,'} {player1Name}!
          </h2>
          <p className="text-xl text-slate-300 font-medium mb-8">
            {isAr 
              ? `الآن قم بتسليم الهاتف إلى (${player2Name}) ليجيب على نفس الأسئلة.`
              : `Now hand over the phone to (${player2Name}) to answer the same questions.`}
          </p>
          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl mb-8 flex items-start justify-center gap-3 w-full max-w-sm">
             <ShieldAlert size={20} className="text-blue-400 shrink-0 mt-0.5" />
             <p className="text-sm text-blue-300 text-left">
               {isAr ? 'تنبيه: لا تنظر لإجاباته ولا تغشش!' : 'Alert: Do not look at their answers!'}
             </p>
          </div>
          <button 
            onClick={handlePassPhone}
            className="px-10 py-4 bg-rose-500 hover:bg-rose-400 text-white rounded-2xl font-bold text-lg transition-all shadow-lg active:scale-95 flex items-center gap-2"
          >
            {isAr ? 'أنا جاهز (استلمت الهاتف)' : 'I\'m ready (Got the phone)'}
            <ArrowRight size={20} />
          </button>
        </div>
      )}

      {/* RESULTS STEP */}
      {step === 'results' && (() => {
        const { percentage, conflicts } = calculateCompatibility();
        
        let colorClass = 'text-green-400';
        let barClass = 'bg-green-400';
        if (percentage < 75) { colorClass = 'text-amber-400'; barClass = 'bg-amber-400'; }
        if (percentage < 50) { colorClass = 'text-rose-500'; barClass = 'bg-rose-500'; }

        return (
          <div className="space-y-6 animate-in slide-in-from-bottom-8 fade-in">
             <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl text-center">
                <h2 className="text-2xl font-bold text-slate-300 mb-8">
                  {isAr ? 'نتيجة التوافق بين' : 'Compatibility Between'}
                  <br />
                  <span className="text-white text-3xl">{player1Name} & {player2Name}</span>
                </h2>
                
                <div className="relative w-48 h-48 mx-auto mb-6">
                   <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" className="stroke-slate-800" strokeWidth="10" />
                      <circle cx="50" cy="50" r="45" fill="none" className={`stroke-current ${colorClass}`} strokeWidth="10" strokeDasharray={`${(percentage * 283) / 100} 283`} strokeLinecap="round" />
                   </svg>
                   <div className="absolute inset-0 flex flex-col items-center justify-center drop-shadow-md">
                      <span className={`text-5xl font-black ${colorClass}`}>{percentage}%</span>
                   </div>
                </div>
                
                <p className="text-xl font-bold text-white mb-2">
                  {getResultMessage(percentage)}
                </p>
             </div>

             {/* Conflict Analysis */}
             {conflicts.length > 0 && (
               <div className="bg-slate-900 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl">
                  <h3 className="text-lg font-bold text-rose-400 mb-6 flex items-center gap-2">
                    <ShieldAlert size={20} />
                    {isAr ? 'نقاط الاختلاف والتحذيرات:' : 'Points of Conflict & Warnings:'}
                  </h3>
                  
                  <div className="space-y-6">
                    {conflicts.map((conflict, idx) => (
                       <div key={idx} className="bg-white/5 border border-white/5 rounded-2xl p-5 border-l-4 border-l-rose-500">
                          <p className="text-slate-300 font-medium text-sm mb-4">
                            Q: {isAr ? conflict.q.ar : conflict.q.en}
                          </p>
                          <div className="flex flex-col md:flex-row gap-4 md:items-center">
                            <div className="flex-1 bg-slate-950/50 p-3 rounded-xl border border-white/5">
                               <span className="text-xs text-slate-500 block mb-1 font-bold">{player1Name}</span>
                               <span className="text-sm text-slate-200">
                                 {isAr ? conflict.q.options.find((o: any) => o.score === conflict.a1)?.ar : conflict.q.options.find((o: any) => o.score === conflict.a1)?.en}
                               </span>
                            </div>
                            <div className="flex shrink-0 items-center justify-center mx-auto text-slate-600 font-black px-2">VS</div>
                            <div className="flex-1 bg-slate-950/50 p-3 rounded-xl border border-white/5">
                               <span className="text-xs text-slate-500 block mb-1 font-bold">{player2Name}</span>
                               <span className="text-sm text-slate-200">
                                 {isAr ? conflict.q.options.find((o: any) => o.score === conflict.a2)?.ar : conflict.q.options.find((o: any) => o.score === conflict.a2)?.en}
                               </span>
                            </div>
                          </div>
                          <p className="text-xs text-rose-400 mt-3 flex gap-1 items-start">
                             <span className="font-black">!</span>
                             {isAr ? 'نصيحة: اتفقوا على هذه النقطة قبل حجز التذاكر لتجنب المشاكل.' : 'Tip: Agree on this point before booking to avoid issues.'}
                          </p>
                       </div>
                    ))}
                  </div>
               </div>
             )}

             <button 
                onClick={resetQuiz}
                className="w-full p-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
             >
                <RefreshCcw size={20} />
                {isAr ? 'إعادة الفحص لأشخاص آخرين' : 'Test Other Partners'}
             </button>

             <ShareButtons 
                text={isAr ? `اختبار شركاء السفر: نسبة التوافق بيني وبين ${player2Name} هي ${percentage}% ! \nالنتيجة: ${getResultMessage(percentage)}` : `Travel Compatibility: The match between me and ${player2Name} is ${percentage}% ! \nResult: ${getResultMessage(percentage)}`} 
                lang={lang} 
             />
          </div>
        );
      })()}

      {/* Middle AdSense */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm my-2">
        <div className="text-[10px] uppercase tracking-widest mb-1">{isAr ? 'مساحة إعلانية' : 'AdSense Ad'}</div>
        <p className="text-[10px]">{isAr ? 'AD_SPACE_728x90 (وسط)' : 'AD_SPACE_728x90 (Middle)'}</p>
      </div>
    </div>
  );
}
