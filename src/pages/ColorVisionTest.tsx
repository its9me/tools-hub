import React, { useState, useEffect, useCallback } from 'react';
import { Eye, Share2, Info, Play, RotateCcw, Timer, Trophy } from 'lucide-react';

const translations = {
  ar: {
    title: "اختبار عمى الألوان (حدة البصر)",
    subtitle: "حدد المربع الذي يحمل لوناً مختلفاً. لديك 60 ثانية لتسجيل أعلى نقاط ممكنة.",
    start: "ابدأ الاختبار",
    score: "النتيجة:",
    timeLeft: "الوقت:",
    gameOver: "انتهى الوقت!",
    yourScore: "نتيجتك هي:",
    restart: "إعادة الاختبار",
    resultWeak: "رؤية ألوان ضعيفة (قد تحتاج فحص نظر)",
    resultNormal: "رؤية ألوان طبيعية",
    resultGood: "رؤية ألوان قوية جداً",
    resultExcellent: "رؤية ألوان خارقة (عين صقر!)",
    shareWhatsapp: "مشاركة النتيجة",
    aboutTitle: "عن الاختبار",
    aboutP1: "هذا الاختبار يعتمد على تمييز التدرجات اللونية بدقة (Color Acuity). يطلب منك تحديد المربع ذي اللون المختلف بين مجموعة المربعات. مع تقدمك في الاختبار، يزداد عدد المربعات ويقل الفرق بين الألوان، مما يتطلب دقة ملاحظة عالية لتمييز الفروق الدقيقة للأنماط اللونية.",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)"
  },
  en: {
    title: "Color Vision Test",
    subtitle: "Find the box with a different color. You have 60 seconds to score as high as possible.",
    start: "Start Test",
    score: "Score:",
    timeLeft: "Time:",
    gameOver: "Time's Up!",
    yourScore: "Your Score:",
    restart: "Restart Test",
    resultWeak: "Weak color vision (Consider an eye exam)",
    resultNormal: "Normal color vision",
    resultGood: "Very good color vision",
    resultExcellent: "Eagle eye! (Superb vision)",
    shareWhatsapp: "Share Result",
    aboutTitle: "About The Test",
    aboutP1: "This test measures your color acuity. You must identify the square with a slightly different color from the rest. As your score increases, the grid gets larger and the color difference becomes smaller, requiring high precision and visual acuity.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)"
  }
};

export default function ColorVisionTest({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  
  const [gridSize, setGridSize] = useState(2);
  const [colors, setColors] = useState<{ base: string, target: string }>({ base: '', target: '' });
  const [targetIndex, setTargetIndex] = useState(0);

  const generateLevel = useCallback((currentScore: number) => {
    // Determine grid size based on score (max 8x8)
    let newSize = 2 + Math.floor(currentScore / 4);
    if (newSize > 8) newSize = 8;
    setGridSize(newSize);

    // Generate colors
    const h = Math.floor(Math.random() * 360);
    const s = Math.floor(Math.random() * 40) + 40; // 40-80%
    const l = Math.floor(Math.random() * 40) + 30; // 30-70%

    // Decrease the lightness difference as score increases to make it harder
    // Starts at 25% difference, drops down to ~3% difference
    const difficultyDiff = Math.max(3, 25 - Math.floor(currentScore / 1.5));
    const targetL = l + difficultyDiff;

    setColors({
      base: `hsl(${h}, ${s}%, ${l}%)`,
      target: `hsl(${h}, ${s}%, ${targetL}%)`
    });

    // Pick random target square
    setTargetIndex(Math.floor(Math.random() * (newSize * newSize)));
  }, []);

  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setIsGameOver(false);
    setIsPlaying(true);
    generateLevel(0);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      setIsPlaying(false);
      setIsGameOver(true);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const handleSquareClick = (index: number) => {
    if (!isPlaying) return;
    
    if (index === targetIndex) {
      const newScore = score + 1;
      setScore(newScore);
      generateLevel(newScore);
    } else {
      // Penalty for wrong click? -1 or just do nothing. Let's just deduct 3 seconds!
      setTimeLeft(prev => Math.max(0, prev - 3));
      // Optional visual feedback for wrong click can be added later
    }
  };

  const getAssessment = (finalScore: number) => {
    if (finalScore < 15) return t.resultWeak;
    if (finalScore < 25) return t.resultNormal;
    if (finalScore < 35) return t.resultGood;
    return t.resultExcellent;
  };

  const generateShareText = () => {
    let str = isAr ? '*نتيجتي في اختبار حدة البصر (الألوان):*\n\n' : '*My Color Vision Test Score:*\n\n';
    str += `👁️ ${t.score} ${score}\n`;
    str += `🏆 ${getAssessment(score)}\n`;
    str += isAr ? `\n\nجرب الاختبار واختبر قوة ملاحظتك: ` : `\n\nTest your color vision here: `;
    return encodeURIComponent(str + window.location.href);
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
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <Eye size={32} className="text-white" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">{t.subtitle}</p>
        </div>

        <div className="flex flex-col justify-center items-center relative z-10 w-full mt-4">
          
          {!isPlaying && !isGameOver && (
             <div className="py-12 flex flex-col items-center justify-center">
                <button 
                  onClick={startGame}
                  className="flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 active:scale-95 transition-all text-lg"
                >
                  <Play size={24} fill="currentColor" />
                  {t.start}
                </button>
             </div>
          )}

          {isPlaying && (
            <div className="w-full flex flex-col items-center gap-6 animate-in fade-in duration-300">
               
               <div className="flex w-full max-w-md justify-between items-center bg-slate-900/50 p-4 rounded-xl border border-white/5 shadow-inner">
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-slate-400">{t.score}</span>
                    <span className="text-2xl font-black text-white">{score}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-medium text-slate-400">{t.timeLeft}</span>
                    <span className={`text-2xl font-black flex items-center gap-1.5 ${timeLeft <= 10 ? 'text-rose-500 animate-pulse' : 'text-indigo-400'}`}>
                      <Timer size={18} />
                      {timeLeft}s
                    </span>
                  </div>
               </div>

               <div 
                 className="grid gap-2 p-2 bg-slate-900/30 rounded-2xl border border-white/5"
                 style={{ 
                   gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
                   width: '100%',
                   maxWidth: '400px',
                   aspectRatio: '1/1'
                 }}
               >
                 {Array.from({ length: gridSize * gridSize }).map((_, i) => (
                   <button
                     key={i}
                     onClick={() => handleSquareClick(i)}
                     className="w-full h-full rounded-xl transition-transform active:scale-90"
                     style={{
                       backgroundColor: i === targetIndex ? colors.target : colors.base,
                       boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.05)'
                     }}
                     aria-label={`Square ${i}`}
                   />
                 ))}
               </div>

            </div>
          )}

          {isGameOver && (
            <div className="flex flex-col items-center gap-6 w-full max-w-md animate-in zoom-in-95 duration-300">
               <div className="w-full bg-slate-900/60 border border-indigo-500/30 p-8 rounded-2xl flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(99,102,241,0.15)] mt-4">
                  <Trophy size={48} className="text-yellow-400 mb-4" />
                  <p className="text-xl font-bold text-white mb-2">{t.gameOver}</p>
                  <p className="text-sm text-slate-400 mb-2">{t.yourScore}</p>
                  <div className="text-6xl font-black text-indigo-400 mb-4 tracking-tighter">
                    {score}
                  </div>
                  <div className="bg-indigo-500/10 text-indigo-300 px-4 py-2 rounded-lg font-medium border border-indigo-500/20 text-sm">
                    {getAssessment(score)}
                  </div>
               </div>

               <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <button 
                    onClick={startGame}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg active:scale-95"
                  >
                    <RotateCcw size={18} />
                    {t.restart}
                  </button>
                  <a
                    href={`https://wa.me/?text=${generateShareText()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-800 hover:bg-slate-700 border border-white/10 text-white font-bold rounded-xl transition-all active:scale-95"
                  >
                    <Share2 size={18} />
                    {t.shareWhatsapp}
                  </a>
               </div>
            </div>
          )}

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
