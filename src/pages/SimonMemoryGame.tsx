import React, { useState, useEffect, useRef } from 'react';
import { Gamepad2, Play, RefreshCcw, Trophy, Volume2, VolumeX, BrainCircuit } from 'lucide-react';
import ShareButtons from '../components/ShareButtons';

const COLORS = [
  { id: 0, defaultBg: 'bg-emerald-600', activeBg: 'bg-emerald-300 shadow-[0_0_50px_rgba(52,211,153,1)] scale-105 z-10', baseSound: 415, rounded: 'rounded-tl-[3rem] md:rounded-tl-[5rem] rounded-tr-xl rounded-bl-xl rounded-br-sm' }, // Green (Top Left)
  { id: 1, defaultBg: 'bg-red-600', activeBg: 'bg-red-300 shadow-[0_0_50px_rgba(248,113,113,1)] scale-105 z-10', baseSound: 310, rounded: 'rounded-tr-[3rem] md:rounded-tr-[5rem] rounded-tl-xl rounded-br-xl rounded-bl-sm' }, // Red (Top Right)
  { id: 2, defaultBg: 'bg-amber-500', activeBg: 'bg-amber-200 shadow-[0_0_50px_rgba(251,191,36,1)] scale-105 z-10', baseSound: 252, rounded: 'rounded-bl-[3rem] md:rounded-bl-[5rem] rounded-tl-xl rounded-br-xl rounded-tr-sm' }, // Yellow (Bottom Left)
  { id: 3, defaultBg: 'bg-blue-600', activeBg: 'bg-blue-300 shadow-[0_0_50px_rgba(96,165,250,1)] scale-105 z-10', baseSound: 209, rounded: 'rounded-br-[3rem] md:rounded-br-[5rem] rounded-tr-xl rounded-bl-xl rounded-tl-sm' }  // Blue (Bottom Right)
];

export default function SimonMemoryGame({ lang }: { lang: 'ar' | 'en' }) {
  const isAr = lang === 'ar';
  
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [status, setStatus] = useState<'idle' | 'playing' | 'waiting' | 'gameOver'>('idle');
  const [level, setLevel] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [activeColor, setActiveColor] = useState<number | null>(null);
  
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Audio Context
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const savedScore = localStorage.getItem('simonHighScore');
    if (savedScore) {
      setHighScore(parseInt(savedScore, 10));
    }
  }, []);

  const playSound = (freq: number, type: 'sine' | 'square' | 'triangle' = 'sine') => {
    if (!soundEnabled) return;
    
    try {
        if (!audioCtxRef.current) {
          audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        
        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') {
          ctx.resume();
        }
        
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        osc.start();
        gainNode.gain.setValueAtTime(1, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4);
        osc.stop(ctx.currentTime + 0.4);
    } catch (err) {
        console.error('Audio play failed', err);
    }
  };

  const startGame = () => {
    setSequence([]);
    setUserSequence([]);
    setLevel(0);
    setStatus('playing');
    setActiveColor(null);
    setTimeout(() => {
      nextRound([]);
    }, 600);
  };

  const nextRound = (currentSeq: number[]) => {
    const nextColor = Math.floor(Math.random() * 4);
    const newSeq = [...currentSeq, nextColor];
    setSequence(newSeq);
    setUserSequence([]);
    setLevel(newSeq.length);
    playSequence(newSeq);
  };

  const playSequence = async (seq: number[]) => {
    setStatus('playing');
    for (let i = 0; i < seq.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 300)); // gap between flashes
      activateButton(seq[i]);
      await new Promise(resolve => setTimeout(resolve, 500)); // duration of flash
      setActiveColor(null);
    }
    setStatus('waiting');
  };

  const activateButton = (colorId: number) => {
    setActiveColor(colorId);
    playSound(COLORS[colorId].baseSound);
  };

  const handleColorClick = (colorId: number) => {
    if (status !== 'waiting') return;
    
    activateButton(colorId);
    setTimeout(() => {
      if (activeColor === colorId) setActiveColor(null);
    }, 200);

    const newUserSeq = [...userSequence, colorId];
    setUserSequence(newUserSeq);

    if (colorId !== sequence[newUserSeq.length - 1]) {
      // Wrong move
      setStatus('gameOver');
      playSound(150, 'square'); // Error sound
      setTimeout(() => playSound(100, 'square'), 150);
      
      const targetScore = level - 1;
      if (targetScore > highScore) {
        setHighScore(targetScore);
        localStorage.setItem('simonHighScore', targetScore.toString());
      }
      return;
    }

    if (newUserSeq.length === sequence.length) {
      setStatus('playing');
      setTimeout(() => {
        nextRound(sequence);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4 max-w-2xl mx-auto w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-sky-500/20 text-sky-400 rounded-xl flex items-center justify-center shrink-0">
            <BrainCircuit size={28} />
            </div>
            <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-100 tracking-tight">
                {isAr ? 'لعبة الذاكرة البصرية' : 'Visual Memory Game'}
            </h1>
            <p className="text-sm text-slate-400 mt-1">
                {isAr ? 'كرر تسلسل الألوان. إلى أي مستوى ستصل؟' : 'Repeat the color sequence. How far can you go?'}
            </p>
            </div>
        </div>
        <button 
           onClick={() => setSoundEnabled(!soundEnabled)}
           className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
           title={isAr ? (soundEnabled ? 'كتم الصوت' : 'تشغيل الصوت') : (soundEnabled ? 'Mute' : 'Unmute')}
        >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} className="opacity-50" />}
        </button>
      </div>

      {/* Main Game Interface */}
      <div className="bg-slate-900 border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-xl shadow-2xl flex flex-col items-center">
         
         <div className="flex w-full justify-between items-center mb-8 px-4">
             <div className="text-center">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-widest block mb-1">
                   {isAr ? 'المستوى' : 'Level'}
                </span>
                <span className="text-3xl font-black text-white">{level}</span>
             </div>
             <div className="text-center">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-widest block mb-1 flex items-center justify-center gap-1">
                   <Trophy size={12} className="text-yellow-500" />
                   {isAr ? 'أعلى مستوى' : 'High Score'}
                </span>
                <span className="text-3xl font-black text-yellow-500">{highScore}</span>
             </div>
         </div>

         {/* The Simon Game Board */}
         <div className="relative w-fit mx-auto mt-4 mb-8">
            <div className="grid grid-cols-2 gap-3 md:gap-4 bg-slate-950 p-4 rounded-full shadow-inner border-4 border-slate-800">
                {COLORS.map(color => (
                    <button
                      key={color.id}
                      onMouseDown={() => handleColorClick(color.id)}
                      onTouchStart={(e) => {
                          e.preventDefault();
                          handleColorClick(color.id);
                      }}
                      className={`w-28 h-28 md:w-36 md:h-36 transition-all duration-150 ${color.rounded} ${
                        activeColor === color.id ? color.activeBg : color.defaultBg
                      } ${status !== 'waiting' ? 'cursor-default' : 'cursor-pointer hover:brightness-110 active:brightness-125'} border-4 border-black/20`}
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    />
                ))}
            </div>
            
            {/* Center Circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-28 md:h-28 bg-slate-900 rounded-full border-[6px] border-slate-950 flex flex-col items-center justify-center shadow-2xl z-20">
                {status === 'idle' && (
                    <button onClick={startGame} className="flex flex-col items-center justify-center text-sky-400 hover:text-sky-300 hover:scale-110 transition-all">
                       <Play size={28} className="ml-1" />
                       <span className="text-[10px] font-bold mt-1 uppercase">
                         {isAr ? 'العب' : 'Play'}
                       </span>
                    </button>
                )}
                {status === 'gameOver' && (
                    <button onClick={startGame} className="flex flex-col items-center justify-center text-red-500 hover:text-red-400 hover:scale-110 transition-all">
                       <RefreshCcw size={28} />
                       <span className="text-[10px] font-bold mt-1 uppercase">
                         {isAr ? 'أعد' : 'Retry'}
                       </span>
                    </button>
                )}
                {(status === 'playing' || status === 'waiting') && (
                    <div className="flex flex-col items-center justify-center text-slate-300">
                       <span className="text-4xl font-black">{level}</span>
                    </div>
                )}
            </div>
         </div>

         {/* Game Status Message */}
         <div className="h-8 flex items-center justify-center">
            {status === 'gameOver' && (
               <p className="text-red-400 font-bold animate-in fade-in zoom-in slide-in-from-bottom-2">
                 {isAr ? 'انتهت اللعبة! تسلسل خاطئ.' : 'Game Over! Wrong sequence.'}
               </p>
            )}
            {status === 'playing' && level > 0 && (
               <p className="text-sky-400 font-bold animate-pulse">
                 {isAr ? 'انتبه للتسلسل...' : 'Watch the sequence...'}
               </p>
            )}
            {status === 'waiting' && (
               <p className="text-emerald-400 font-bold">
                 {isAr ? 'دورك الآن!' : 'Your turn!'}
               </p>
            )}
         </div>
      </div>

      {status === 'gameOver' && level - 1 > 0 && (
         <div className="w-full">
            <ShareButtons 
               text={isAr ? `لعبت الذاكرة البصرية ووصلت للمستوى ${level - 1}! 🧠✨\nهل يمكنك التغلب على ذاكرتي؟` : `I played the Visual Memory Game and reached level ${level - 1}! 🧠✨\nCan you beat my memory?`} 
               lang={lang} 
            />
         </div>
      )}
    </div>
  );
}
