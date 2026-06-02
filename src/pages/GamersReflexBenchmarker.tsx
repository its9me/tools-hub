import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Zap, 
  MousePointer, 
  Trophy, 
  Activity, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  HelpCircle, 
  Play, 
  TrendingUp, 
  ChevronRight, 
  Award, 
  Dices,
  Flame,
  User,
  Tv,
  Gamepad2,
  AlertTriangle,
  Info
} from 'lucide-react';
import ShareButtons from '../components/ShareButtons';

// --- GAMERS RGB ESCORTS BENCHMARKS ---
// Reaction time values in ms, CPS values in Click-Per-Seconds
const PRO_PLAYERS = [
  { name: "TenZ (Valorant)", roleAr: "لاعب شوتر محترف", roleEn: "Valorant Pro Aim", reaction: 135, cps: 11.8, badge: "Aim King" },
  { name: "s1mple (CS2)", roleAr: "قناص الأساطير الأسرع", roleEn: "CS2 Legendary Awper", reaction: 142, cps: 9.5, badge: "CS GOAT" },
  { name: "Faker (LoL)", roleAr: "ملك ألعاب الـ MOBA", roleEn: "League of Legends Legend", reaction: 155, cps: 13.0, badge: "Demon King" },
  { name: "Shroud (Apex/FPS)", roleAr: "إله التصويب التلقائي", roleEn: "FPS Precision Master", reaction: 148, cps: 10.2, badge: "Aim Bot" },
  { name: "Standard Gamer", roleAr: "لاعب هاوي نشط", roleEn: "Casual Active Gamer", reaction: 180, cps: 7.2, badge: "Silver III" },
  { name: "Average Human", roleAr: "معدل طبيعي للبشر", roleEn: "Universal Average Human", reaction: 250, cps: 5.8, badge: "Recruit" }
];

// Audio synthesizer wrapper using Web Audio API so we don't need external source assets
class GameAudioEngine {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;

  constructor() {
    this.muted = false;
  }

  private initCtx() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  isMuted() {
    return this.muted;
  }

  playTick() {
    if (this.muted) return;
    try {
      this.initCtx();
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, this.ctx!.currentTime);
      gain.gain.setValueAtTime(0.08, this.ctx!.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + 0.08);

      osc.start();
      osc.stop(this.ctx!.currentTime + 0.08);
    } catch (e) {
      // Ignored browser blocking policies
    }
  }

  playError() {
    if (this.muted) return;
    try {
      this.initCtx();
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, this.ctx!.currentTime);
      osc.frequency.linearRampToValueAtTime(80, this.ctx!.currentTime + 0.3);
      gain.gain.setValueAtTime(0.12, this.ctx!.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + 0.3);

      osc.start();
      osc.stop(this.ctx!.currentTime + 0.3);
    } catch (e) {
      // Ignored
    }
  }

  playTriggerSuccess() {
    if (this.muted) return;
    try {
      this.initCtx();
      const now = this.ctx!.currentTime;
      // High-pitched synth chime
      const osc1 = this.ctx!.createOscillator();
      const osc2 = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx!.destination);

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(880, now); // A5

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1320, now); // E6

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc1.start();
      osc2.start();
      osc1.stop(now + 0.25);
      osc2.stop(now + 0.25);
    } catch (e) {
      // Ignored
    }
  }

  playClickPluck() {
    if (this.muted) return;
    try {
      this.initCtx();
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.type = 'square';
      osc.frequency.setValueAtTime(1000, this.ctx!.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, this.ctx!.currentTime + 0.1);
      gain.gain.setValueAtTime(0.06, this.ctx!.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + 0.12);

      osc.start();
      osc.stop(this.ctx!.currentTime + 0.12);
    } catch (e) {
      // Ignored
    }
  }

  playFinalChime() {
    if (this.muted) return;
    try {
      this.initCtx();
      const now = this.ctx!.currentTime;
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
      osc.frequency.setValueAtTime(1046.50, now + 0.3); // C6

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc.start();
      osc.stop(now + 0.52);
    } catch (e) {
      // Ignored
    }
  }
}

const translations = {
  ar: {
    title: "فاحص سرعة الاستجابة والنقر للاعبين 🎮",
    subtitle: "قس واختبر سرعة ردة الفعل ودقة التصويب المطلوبة في ألعاب الـ eSports التنافسية وقارن مستواك بالمحترفين.",
    reactionTab: "⚡ اختبار رد الفعل (Reaction Time)",
    cpsTab: "🖱️ اختبار سرعة النقر (CPS Test)",
    reactionInstructions: "انقر على لوحة اللعب بالأسفل عندما يتحول لونها من الأحمر إلى الأخضر المتوهج بأسرع ما يمكن!",
    cpsInstructions: "اضغط على زر النقر بأقصى سرعة ممكنة فور بدء العد التنازلي!",
    proComparison: "⚔️ لوحة مقارنة المحترفين واللاعبين",
    soundToggle: "أصوات المؤثرات (RGB Sound)",
    reactionStartBtn: "ابدأ اختبار رد الفعل",
    waitingState: "انتظر اللون الأخضر...",
    clickNow: "انقر الآن!!!",
    earlyAlert: "تسرعت كثيراً! 🚫 نقرة مبكرة غير صالحة. تم إعادة تصفير الوقت.",
    clickToWait: "انقر لبدء التحضير لردة الفعل",
    yourScore: "نتيجة اختبارك:",
    rank: "التصنيف التقديري لك:",
    cpsScore: "معدل نقراتك (CPS):",
    totalClicks: "إجمالي النقرات:",
    durationSetting: "الزمن المحدد لاختبار CPS:",
    seconds: "ثوانٍ",
    startCpsGame: "ابدأ النقر للعد التنازلي!",
    clickingArea: "منطقة النقر المكثف 🔥",
    cpsClickBtn: "اضغط هنا بسرعة!",
    resetBtn: "إعادة تعيين",
    congratsTitle: "تحليل أدائك التقني",
    shareMessage: "مستواي التنافسي في رد الفعل وقوة النقر:",
    averageReflex: "متوسط سرعة استجابتك",
    averageCps: "أفضل معدل CPS أحرزته",
    proReactionBench: "مقارنة زمن رد الفعل (الأقل أفضل ⏱️)",
    proCpsBench: "مقارنة معدل النقرات CPS (الأعلى أفضل 🚀)",
    aboutTitle: "فلسفة التدريب وردة الفعل في الـ eSports",
    aboutDesc: "تتطلب الألعاب السريعة مثل Shooter و Valorant و League of Legends سرعات استجابة تقل عن 150ms ومتوسط نقرات مستقر لتوجيه الضربات بدقة متناهية. تمنحك هذه الأداة بيئة تفاعلية ممتازة لتمرين عضلات يدك وعصبك البصري مع حاسبة ذكية لحفظ نقاط استقرارك.",
    howToReactionTitle: "كيف تقرأ النتائج؟",
    howToReactionDesc: "السرعات تحت الـ 160ms تعادل تصنيفات محترفي البطولات العالمية. السرعة العادية لدى البشر تتراوح بين 200ms إلى 260ms. إذا أحرزت أعلى من 300ms ربما تشعر ببعض التعب أو الإجهاد اليوم!",
    reflexUnit: "ملي ثانية (ms)",
    cpsUnit: "نقرة بالشريحة (CPS)",
    statusLegend: "التصنيف المقارن",
    gameStats: "أرقامك المسجلة هذا اليوم",
    clearHistory: "مسح السجلات",
    noHistory: "لا توجد سجلات منجزة بعد.",
    aimMaster: "سيد التصويب الذكي",
    clickLord: "جنرال النقر السريع",
    eSportsReady: "محترف بطولات جاهز للتعاقد!",
    aimBotStatus: "مشتبه به كـ Aim-bot 🤖",
    casualStatus: "لاعب هاوي (يحتاج للمزيد من التمرين)",
    noobStatus: "مبتدئ (القهوة قد تساعدك الآن!)",
    reflexRank: "تصنيف ردة الفعل",
    cpsRank: "تصنيف سرعة النقر",
    tryAgain: "حاول مجدداً",
    yourLastTries: "سجل محاولاتك السريعة الأخيرة:"
  },
  en: {
    title: "Gamers Reflex & Click Speed Benchmarker 🎮",
    subtitle: "Test and benchmark your optical reaction speed & click precision tailored for competitive eSports and shooters.",
    reactionTab: "⚡ Reaction Time Test",
    cpsTab: "🖱️ Click Speed Test (CPS)",
    reactionInstructions: "Click/tap the panel below immediately when it transitions from red/preparing to glowing neon green!",
    cpsInstructions: "Smash the click target as fast as possible once the countdown trigger fires!",
    proComparison: "⚔️ Pro eSports Benchmarks & Leaderboard",
    soundToggle: "Acoustic SFX FX",
    reactionStartBtn: "Click To Begin Reaction Test",
    waitingState: "HOLD ON... WAIT FOR GREEN",
    clickNow: "CLICK NOW!!!!",
    earlyAlert: "Too early! 🚫 Invalid pre-emptive click. Time penalized and reset.",
    clickToWait: "Click the pad to initialize countdown...",
    yourScore: "Your Score:",
    rank: "Estimated Rank:",
    cpsScore: "Your Speed Rate (CPS):",
    totalClicks: "Total Clicks:",
    durationSetting: "CPS Speed Assessment Interval:",
    seconds: "Seconds",
    startCpsGame: "Tap here to initiate countdown!",
    clickingArea: "Smash Clicking Arena 🔥",
    cpsClickBtn: "CLICK HERE TO INITIATE / CLASH!",
    resetBtn: "Reset Trial",
    congratsTitle: "Performance Insight & Analysis",
    shareMessage: "My competitive Esports reflex and CPS Benchmarks details:",
    averageReflex: "Mean Optical Reaction",
    averageCps: "Highest Steady CPS",
    proReactionBench: "Reaction Time Benchmarks (Lower is better ⏱️)",
    proCpsBench: "Click Speed Benchmarks (Higher is better 🚀)",
    aboutTitle: "Reactions & Speed Mechanics in eSports",
    aboutDesc: "Dynamic sports games require quick adjustments under 150ms and steady muscular activation patterns. This gaming controller checks your active hand-eye coordination with high-resolution visual cues and audio clicks to benchmark your raw hardware limits.",
    howToReactionTitle: "Result Classification",
    howToReactionDesc: "Speeds below 160ms match elite competitive tier specs. Overall generic average for humans hovers around 210ms-250ms. If you score higher than 300ms, a coffee might be advisable to fuel your attention levels!",
    reflexUnit: "milliseconds (ms)",
    cpsUnit: "Clicks/sec (CPS)",
    statusLegend: "Tier Rating",
    gameStats: "Your Session Achievements",
    clearHistory: "Clear Stats History",
    noHistory: "No attempts submitted yet this session.",
    aimMaster: "Reflex Masterclass",
    clickLord: "Rapid Trigger General",
    eSportsReady: "Tournament Grade Spec!",
    aimBotStatus: "Suspicious Aim-bot Tier 🤖",
    casualStatus: "Casual Active Elite",
    noobStatus: "Recruit Class (Practice More!)",
    reflexRank: "Reflex Grading",
    cpsRank: "CPS Performance Score",
    tryAgain: "Retry Speed Run",
    yourLastTries: "Your Latest Attempt Logs:"
  }
};

export default function GamersReflexBenchmarker({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const audioRef = useRef<GameAudioEngine | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Initialize audio engine on mount
  useEffect(() => {
    audioRef.current = new GameAudioEngine();
  }, []);

  // Sync mute setting
  const toggleMute = () => {
    if (audioRef.current) {
      const isMutedNow = audioRef.current.toggleMute();
      setSoundEnabled(!isMutedNow);
    }
  };

  // State: Tab selection
  const [activeTab, setActiveTab] = useState<'reaction' | 'cps'>('reaction');

  // --- REACTION STATE MACHINE ---
  // states: 'idle' (waiting for user to click to prepare), 'waiting' (red screen, waiting for sudden green), 'ready' (green screen, counting ms), 'result' (shows ms), 'penalized' (clicked early)
  const [reactionState, setReactionState] = useState<'idle' | 'waiting' | 'ready' | 'result' | 'penalized'>('idle');
  const [reactionMs, setReactionMs] = useState<number | null>(null);
  const [historyReflex, setHistoryReflex] = useState<number[]>([]);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  // Clean timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleStartReactionTest = () => {
    if (audioRef.current) audioRef.current.playTick();
    setReactionState('waiting');
    
    // Generate randomized delay between 1.5 and 5 seconds
    const randomDelay = 1500 + Math.random() * 3500;
    
    if (timerRef.current) clearTimeout(timerRef.current);
    
    timerRef.current = setTimeout(() => {
      setReactionState('ready');
      startTimeRef.current = performance.now();
      if (audioRef.current) audioRef.current.playTriggerSuccess();
    }, randomDelay);
  };

  const handleReactionPadClick = () => {
    if (reactionState === 'idle') {
      handleStartReactionTest();
    } else if (reactionState === 'waiting') {
      // Early click mistake! Cheat/early penalty
      if (timerRef.current) clearTimeout(timerRef.current);
      setReactionState('penalized');
      if (audioRef.current) audioRef.current.playError();
    } else if (reactionState === 'ready') {
      const clickTime = performance.now();
      const difference = Math.round(clickTime - startTimeRef.current);
      
      setReactionMs(difference);
      setReactionState('result');
      setHistoryReflex(prev => [difference, ...prev.slice(0, 4)]);
      if (audioRef.current) audioRef.current.playFinalChime();
    }
  };

  const resetReactionToIdle = () => {
    if (audioRef.current) audioRef.current.playTick();
    setReactionState('idle');
  };

  // --- CPS STATE MACHINE ---
  const [cpsInterval, setCpsInterval] = useState<number>(5); // Default 5 seconds option
  const [cpsClicks, setCpsClicks] = useState<number>(0);
  const [cpsState, setCpsState] = useState<'idle' | 'running' | 'finished'>('idle');
  const [timeLeft, setTimeLeft] = useState<number>(5);
  const [cpsScore, setCpsScore] = useState<number | null>(null);
  const [historyCps, setHistoryCps] = useState<number[]>([]);

  const cpsTimerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Clean timer on unmount
  useEffect(() => {
    return () => {
      if (cpsTimerRef.current) clearTimeout(cpsTimerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, []);

  const handleCpsClick = () => {
    if (cpsState === 'idle') {
      // Initialize click speed game
      setCpsClicks(1);
      setCpsState('running');
      setTimeLeft(cpsInterval);
      if (audioRef.current) audioRef.current.playClickPluck();

      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      if (cpsTimerRef.current) clearTimeout(cpsTimerRef.current);

      const startTime = Date.now();
      const endTime = startTime + cpsInterval * 1000;

      countdownIntervalRef.current = setInterval(() => {
        const remaining = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
        setTimeLeft(remaining);
      }, 100);

      cpsTimerRef.current = setTimeout(() => {
        setCpsState('finished');
        if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
        
        // Final math
        setCpsState('finished');
        if (audioRef.current) audioRef.current.playFinalChime();
      }, cpsInterval * 1000);

    } else if (cpsState === 'running') {
      setCpsClicks(prev => prev + 1);
      if (audioRef.current) audioRef.current.playClickPluck();
    }
  };

  // Compute live/finished CPS speed
  const calculatedCps = useMemo(() => {
    if (cpsState === 'finished') {
      const score = parseFloat((cpsClicks / cpsInterval).toFixed(1));
      return score;
    }
    return 0;
  }, [cpsClicks, cpsInterval, cpsState]);

  // Insert finished score into logs history
  useEffect(() => {
    if (cpsState === 'finished' && calculatedCps > 0) {
      setCpsScore(calculatedCps);
      setHistoryCps(prev => [calculatedCps, ...prev.slice(0, 4)]);
    }
  }, [cpsState, calculatedCps]);

  const resetCpsGame = () => {
    if (audioRef.current) audioRef.current.playTick();
    setCpsClicks(0);
    setCpsState('idle');
    setTimeLeft(cpsInterval);
    setCpsScore(null);
  };

  // Adjust countdown range when changing dropdown interval options
  const handleIntervalChange = (val: number) => {
    setCpsInterval(val);
    setTimeLeft(val);
    resetCpsGame();
  };

  // --- STATS GRADING DECISION MATHS ---
  const reflexGrade = (val: number) => {
    if (val < 130) return { title: t.aimBotStatus, color: "text-rose-400 bg-rose-500/10 border-rose-500/35" };
    if (val < 155) return { title: t.aimMaster, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/35" };
    if (val < 185) return { title: t.eSportsReady, color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/35" };
    if (val < 240) return { title: t.casualStatus, color: "text-amber-400 bg-amber-500/10 border-amber-500/35" };
    return { title: t.noobStatus, color: "text-slate-400 bg-white/5 border-white/10" };
  };

  const cpsGrade = (val: number) => {
    if (val > 12) return { title: t.aimBotStatus, color: "text-rose-400 bg-rose-500/10 border-rose-500/35" };
    if (val > 9.5) return { title: t.clickLord, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/35" };
    if (val > 7.5) return { title: t.eSportsReady, color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/35" };
    if (val > 5.5) return { title: t.casualStatus, color: "text-amber-400 bg-amber-500/10 border-amber-500/35" };
    return { title: t.noobStatus, color: "text-slate-400 bg-white/5 border-white/10" };
  };

  // High-fidelity structured copy text summary representation
  const textSummary = useMemo(() => {
    const reflexText = reactionMs ? `⚡ ${reactionMs} ms (${reflexGrade(reactionMs).title})` : 'N/A';
    const cpsText = cpsScore ? `🖱️ ${cpsScore} CPS (${cpsGrade(cpsScore).title})` : 'N/A';
    
    return isAr
      ? `📈 تقرير فاحص سرعة الاستجابة والنقر لـ Esports:\n- ردة الفعل: ${reflexText}\n- سرعة النقر الكلية: ${cpsText}\n\nتحدّى مهارات التحكم والتركيز عبر "أدوات Hub" والعب الآن!`
      : `📈 Gaming Hand-Eye Reflex Trial scorecard:\n- Optical Reaction: ${reflexText}\n- Clicking power (CPS): ${cpsText}\n\nBenchmark your own eSports specs on Tools Hub now!`;
  }, [reactionMs, cpsScore, isAr]);

  const clearSessionStats = () => {
    if (audioRef.current) audioRef.current.playError();
    setHistoryReflex([]);
    setHistoryCps([]);
    setReactionMs(null);
    setCpsScore(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 font-sans text-slate-100">
      
      {/* 1. RGB Header Layout with animated HUD aura */}
      <div className="relative border-b border-white/10 pb-6 rounded-t-3xl overflow-hidden bg-slate-950/20 p-6 md:p-8">
        {/* Aesthetic background laser elements */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute -bottom-12 left-10 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="text-right md:text-right w-full md:w-auto">
            <span className="px-3 py-1 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-full text-xs font-black uppercase tracking-widest mb-3 inline-flex items-center gap-1.5 shadow-[0_0_10px_rgba(6,182,212,0.15)]">
              <Gamepad2 size={13} className="animate-spin" />
              {isAr ? 'منصة الألعاب وإحصائيات الـ Esports' : 'COMPETITIVE GAMING SUITE'}
            </span>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {t.title}
            </h1>
            <p className="text-sm text-slate-400 mt-2 max-w-3xl leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          {/* Sound controller toggle block */}
          <div className="flex items-center gap-3 self-end md:self-center">
            <button
              onClick={toggleMute}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                soundEnabled 
                  ? 'bg-purple-950/50 border-purple-500/40 text-purple-300 shadow-[0_0_12px_rgba(139,92,246,0.2)]'
                  : 'bg-slate-900 border-white/5 text-slate-500'
              }`}
            >
              {soundEnabled ? <Volume2 size={14} className="animate-bounce" /> : <VolumeX size={14} />}
              <span>{t.soundToggle}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Top Banner Ad Placement Placeholder */}
      <div className="w-full h-20 bg-slate-900/40 rounded-xl flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm relative overflow-hidden">
        <span className="absolute top-2 left-3 text-[9px] text-slate-600 font-mono">GAMERS_BENCH_728X90_TOP</span>
        <div className="text-[10px] uppercase tracking-widest mb-1 text-slate-500">{isAr ? 'إعلان AdSense' : 'AdSense Sponsor Slot'}</div>
        <p className="text-[10px] text-slate-600">AD_SPACE_MIDDLE_PREVIEW</p>
      </div>

      {/* 3. Competitive Mode Navigation tab buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => { if (audioRef.current) audioRef.current.playTick(); setActiveTab('reaction'); }}
          className={`py-4 rounded-2xl font-bold text-sm transition-all border flex flex-col items-center justify-center gap-2 ${
            activeTab === 'reaction'
              ? 'bg-gradient-to-b from-rose-950/40 to-[#0c0d1c]/90 text-rose-300 border-rose-500/50 shadow-xl shadow-rose-950/20'
              : 'bg-slate-900/30 text-slate-400 border-white/5 hover:bg-white/5'
          }`}
        >
          <Zap size={20} className={activeTab === 'reaction' ? "text-rose-400 animate-pulse" : "text-slate-500"} />
          <span>{t.reactionTab}</span>
        </button>

        <button
          onClick={() => { if (audioRef.current) audioRef.current.playTick(); setActiveTab('cps'); }}
          className={`py-4 rounded-2xl font-bold text-sm transition-all border flex flex-col items-center justify-center gap-2 ${
            activeTab === 'cps'
              ? 'bg-gradient-to-b from-cyan-950/40 to-[#0c0d1c]/90 text-cyan-300 border-cyan-500/50 shadow-xl shadow-cyan-950/20'
              : 'bg-slate-900/30 text-slate-400 border-white/5 hover:bg-white/5'
          }`}
        >
          <MousePointer size={20} className={activeTab === 'cps' ? "text-cyan-400 animate-bounce" : "text-slate-500"} />
          <span>{t.cpsTab}</span>
        </button>
      </div>

      {/* 4. Active Area Testing */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Interactive Gameplay Field (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {activeTab === 'reaction' ? (
            // --- REACTION VIEW PANEL ---
            <div className="bg-slate-900/40 border border-white/10 rounded-3xl p-5 md:p-6 flex flex-col gap-5">
              <div className="flex items-center gap-2 border-b border-white/5 pb-4">
                <Zap size={16} className="text-rose-400" />
                <h3 className="text-sm font-bold text-slate-200">{isAr ? 'نوافذ فحص استجابة عصب اليد' : 'Optical Pulse Coordinate Capture'}</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5">
                {t.reactionInstructions}
              </p>

              {/* REACTION BOARD TARGET CONTAINER - HIGH VALUE RGB EFFECT */}
              <div 
                onClick={handleReactionPadClick}
                className={`w-full h-80 rounded-2xl flex flex-col items-center justify-center cursor-pointer select-none relative overflow-hidden transition-all duration-100 ${
                  reactionState === 'idle' 
                    ? 'bg-slate-950/90 border border-dashed border-slate-700/60 hover:bg-slate-900 shadow-inner' :
                  reactionState === 'waiting'
                    ? 'bg-rose-950/80 border-2 border-rose-500 shadow-[0_0_20px_rgba(239,68,68,0.2)] animate-pulse' :
                  reactionState === 'ready'
                    ? 'bg-emerald-500/90 border-4 border-emerald-400 shadow-[0_0_35px_rgba(16,185,129,0.7)] text-emerald-950 font-black scale-[0.99]' :
                  reactionState === 'result'
                    ? 'bg-cyan-950/40 border border-cyan-500/40 text-cyan-300' :
                  'bg-amber-950/40 border border-amber-500/45 text-amber-300'
                }`}
              >
                {/* HUD Overlay elements inside board */}
                <div className="absolute top-4 left-4 text-[9px] font-mono opacity-30 uppercase tracking-widest">
                  SYS_COORD_REFLEX // RUNNING
                </div>
                
                {reactionState === 'idle' && (
                  <div className="text-center p-6 flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700/80 animate-bounce">
                      <Play size={24} className="text-slate-400 translate-x-[2px]" />
                    </div>
                    <span className="text-sm font-extrabold text-slate-300">{t.clickToWait}</span>
                    <button className="px-5 py-2.5 bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500/20 rounded-xl text-xs font-bold transition-all">
                      {t.reactionStartBtn}
                    </button>
                  </div>
                )}

                {reactionState === 'waiting' && (
                  <div className="text-center tracking-wider flex flex-col items-center gap-3">
                    <span className="w-4 h-4 rounded-full bg-rose-500 animate-ping mb-2" />
                    <span className="text-base font-black text-rose-400 uppercase animate-pulse">{t.waitingState}</span>
                    <span className="text-xs text-rose-500 opacity-60 font-medium">{isAr ? 'لا تنقر الآن!' : 'DO NOT CLICK EARLY!'}</span>
                  </div>
                )}

                {reactionState === 'ready' && (
                  <div className="text-center animate-in scale-105 duration-75">
                    <span className="text-xl md:text-3xl font-black uppercase text-[#0d160f] tracking-widest animate-bounce">
                      {t.clickNow}
                    </span>
                  </div>
                )}

                {reactionState === 'result' && reactionMs !== null && (
                  <div className="text-center p-6 flex flex-col items-center gap-3">
                    <div className="px-4 py-1.5 bg-cyan-500/20 border border-cyan-500/30 rounded-xl text-xs font-bold text-cyan-300">
                      {t.yourScore}
                    </div>
                    <span className="text-5xl font-black font-mono tracking-tight text-white mb-2">
                      {reactionMs} <span className="text-xs font-bold">ms</span>
                    </span>
                    <div className={`px-4 py-2 rounded-xl text-xs font-bold border ${reflexGrade(reactionMs).color}`}>
                      👑 {t.rank} {reflexGrade(reactionMs).title}
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); resetReactionToIdle(); }}
                      className="mt-4 flex items-center gap-1.5 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold text-slate-300 border border-white/10 transition-colors"
                    >
                      <RotateCcw size={13} />
                      <span>{t.tryAgain}</span>
                    </button>
                  </div>
                )}

                {reactionState === 'penalized' && (
                  <div className="text-center p-6 flex flex-col items-center gap-3">
                    <AlertTriangle size={36} className="text-amber-500 animate-bounce" />
                    <p className="text-xs font-bold text-amber-300 max-w-sm px-4 leading-relaxed">
                      {t.earlyAlert}
                    </p>
                    <button 
                      onClick={(e) => { e.stopPropagation(); resetReactionToIdle(); }}
                      className="mt-2 flex items-center gap-1.5 px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 rounded-xl text-xs font-bold text-amber-300 border border-amber-500/30 transition-colors"
                    >
                      <RotateCcw size={13} />
                      <span>{isAr ? 'أعد المحاولة' : 'Reset Phase'}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* History logs check list for Reflex */}
              {historyReflex.length > 0 && (
                <div className="bg-slate-950/40 p-4 rounded-2xl border border-white/5">
                  <h4 className="text-xs font-bold text-slate-400 mb-2">{t.yourLastTries}</h4>
                  <div className="flex flex-wrap gap-2">
                    {historyReflex.map((val, i) => (
                      <span key={i} className="px-3 py-1.5 bg-rose-500/5 border border-rose-500/20 rounded-lg text-xs font-mono font-bold text-rose-300 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-rose-400 rounded-full" />
                        #{historyReflex.length - i}: {val} ms
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>
          ) : (
            // --- CPS ASSESSMENT VIEW ---
            <div className="bg-slate-900/40 border border-white/10 rounded-3xl p-5 md:p-6 flex flex-col gap-5">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                  <MousePointer size={16} className="text-cyan-400" />
                  <h3 className="text-sm font-bold text-slate-200">{t.clickingArea}</h3>
                </div>
                
                {/* Duration settings dropdown select options */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400 font-bold">{t.durationSetting}</span>
                  <div className="flex bg-[#12183c] border border-white/10 rounded-xl p-0.5">
                    {[5, 10].map(s => (
                      <button
                        key={s}
                        disabled={cpsState === 'running'}
                        onClick={() => handleIntervalChange(s)}
                        className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                          cpsInterval === s
                            ? 'bg-cyan-500/20 text-cyan-300 font-extrabold'
                            : 'text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        {s} {isAr ? 'ث' : 'Sec'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5">
                {t.cpsInstructions}
              </p>

              {/* CLICK ATTACK TARGET PAD */}
              <div
                onClick={handleCpsClick}
                className={`w-full h-80 rounded-2xl flex flex-col items-center justify-center cursor-pointer select-none relative overflow-hidden transition-all duration-75 ${
                  cpsState === 'idle' 
                    ? 'bg-slate-950/90 border border-dashed border-slate-700/60 hover:bg-slate-900' :
                  cpsState === 'running'
                    ? 'bg-cyan-500/10 border-2 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.3)] active:bg-cyan-500/20 active:scale-[0.98]' :
                  'bg-indigo-950/40 border border-indigo-500/40 text-indigo-300'
                }`}
              >
                
                {/* HUD Live status header inside */}
                {cpsState === 'running' && (
                  <div className="absolute top-4 inset-x-4 flex justify-between items-center px-2 font-mono text-[10px] text-cyan-400/80">
                    <span>SECTOR_SPEEDOMETER // RUNNING</span>
                    <span className="animate-pulse flex items-center gap-1">
                      <Flame size={11} className="text-orange-400" />
                      LIVE CPS: {(cpsClicks / (cpsInterval - timeLeft || 0.1)).toFixed(1)}
                    </span>
                  </div>
                )}

                {cpsState === 'idle' && (
                  <div className="text-center p-6 flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700/80 animate-pulse">
                      <MousePointer size={22} className="text-cyan-400" />
                    </div>
                    <span className="text-sm font-extrabold text-slate-300">{t.startCpsGame}</span>
                    <button className="px-5 py-2.5 bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-300/30 rounded-xl text-xs font-bold transition-all">
                      {t.cpsClickBtn}
                    </button>
                  </div>
                )}

                {cpsState === 'running' && (
                  <div className="text-center flex flex-col items-center gap-2">
                    <span className="text-5xl font-black font-mono text-cyan-300 tracking-wider">
                      {cpsClicks}
                    </span>
                    <span className="text-xs font-bold text-slate-400 uppercase">
                      {isAr ? 'نقرة إجمالية' : 'Total Clicks'}
                    </span>
                    <div className="mt-4 px-4 py-1.5 bg-slate-950/80 border border-white/5 rounded-xl flex items-center gap-2">
                      <span className="text-[10px] text-slate-500">{isAr ? 'الزمن المتبقي:' : 'Time Left:'}</span>
                      <span className="text-xs font-bold font-mono text-amber-400">{timeLeft}s</span>
                    </div>
                  </div>
                )}

                {cpsState === 'finished' && cpsScore !== null && (
                  <div className="text-center p-6 flex flex-col items-center gap-3">
                    <div className="px-4 py-1.5 bg-cyan-500/20 border border-cyan-500/30 rounded-xl text-xs font-bold text-cyan-300">
                      {isAr ? 'معدل نقاط النقر النهائي' : 'CPS Scoring Outcome'}
                    </div>
                    <span className="text-5xl font-black font-mono tracking-tight text-white mb-2">
                      {cpsScore} <span className="text-xs font-extrabold text-slate-400">CPS</span>
                    </span>
                    <span className="text-xs font-medium text-slate-400">
                      {t.totalClicks} <span className="font-bold text-slate-200">{cpsClicks}</span> ({cpsInterval} {t.seconds})
                    </span>
                    <div className={`px-4 py-2 rounded-xl text-xs font-extrabold border mt-2 ${cpsGrade(cpsClicks / cpsInterval).color}`}>
                      👑 {cpsGrade(cpsClicks / cpsInterval).title}
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); resetCpsGame(); }}
                      className="mt-4 flex items-center gap-1.5 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold text-slate-300 border border-white/10 transition-colors"
                    >
                      <RotateCcw size={13} />
                      <span>{t.tryAgain}</span>
                    </button>
                  </div>
                )}

              </div>

              {/* History logs block for CPS */}
              {historyCps.length > 0 && (
                <div className="bg-slate-950/40 p-4 rounded-2xl border border-white/5">
                  <h4 className="text-xs font-bold text-slate-400 mb-2">{t.yourLastTries}</h4>
                  <div className="flex flex-wrap gap-2">
                    {historyCps.map((val, i) => (
                      <span key={i} className="px-3 py-1.5 bg-cyan-500/5 border border-cyan-500/20 rounded-lg text-xs font-mono font-bold text-cyan-300 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                        #{historyCps.length - i}: {val} CPS
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* eSports Comparison Leaderboard details block (Replaces heavy charts with beautiful tailored mobile-fit comparative layouts) */}
          <div className="bg-slate-900/40 border border-white/10 rounded-3xl p-5 md:p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-2">
                <Trophy size={16} className="text-amber-400" />
                <h3 className="text-sm font-bold text-slate-200">{t.proComparison}</h3>
              </div>
              <span className="text-[10px] text-slate-500 font-mono tracking-wider">REFLEX_VS_PROS</span>
            </div>

            {/* Reaction time benchmark list */}
            <div>
              <h4 className="text-xs font-black text-slate-300 uppercase tracking-widest mb-3 text-right md:text-right">
                {t.proReactionBench}
              </h4>
              <div className="flex flex-col gap-2.5">
                {PRO_PLAYERS.map((pro, index) => {
                  const isUserScoreHigher = reactionMs !== null && pro.reaction > reactionMs;
                  const isUserActiveScore = false; // logic below

                  return (
                    <div key={index} className="flex flex-col gap-1.5 p-3 rounded-xl bg-white/5 border border-white/5">
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="text-slate-400 font-bold">{index + 1}.</span>
                          <span className="font-extrabold text-slate-200">{pro.name}</span>
                          <span className="text-[9px] px-1.5 py-0.5 bg-slate-800 rounded font-medium text-slate-400">{isAr ? pro.roleAr : pro.roleEn}</span>
                        </div>
                        <span className="font-mono font-extrabold text-rose-400">{pro.reaction} ms</span>
                      </div>
                      
                      {/* Responsive bar width visualizer */}
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden relative">
                        <div 
                          className="h-full rounded-full bg-gradient-to-r from-red-500 via-rose-500 to-amber-500"
                          style={{ width: `${Math.min(100, Math.max(10, (pro.reaction / 350) * 100))}%` }}
                        />
                      </div>
                    </div>
                  );
                })}

                {/* Inject current user scoring for reflex comparison directly into layout dynamically */}
                {reactionMs !== null && (
                  <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/40 relative overflow-hidden mt-2">
                    <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-rose-400 to-pink-500" />
                    <div className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                        <span className="font-black text-rose-200">{isAr ? "نتيجة ردة فعلك أنت" : "YOUR REACTION TIME"}</span>
                      </div>
                      <span className="font-mono font-extrabold text-rose-300">{reactionMs} ms</span>
                    </div>
                    {/* Visualizer mapping relative to maximum score range */}
                    <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden relative mt-2 border border-rose-500/20">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-rose-400 to-pink-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]" 
                        style={{ width: `${Math.min(100, Math.max(5, (reactionMs / 350) * 100))}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* CPS trigger benchmark list */}
            <div className="border-t border-white/5 pt-6">
              <h4 className="text-xs font-black text-slate-300 uppercase tracking-widest mb-3 text-right md:text-right">
                {t.proCpsBench}
              </h4>
              <div className="flex flex-col gap-2.5">
                {PRO_PLAYERS.map((pro, index) => (
                  <div key={index} className="flex flex-col gap-1.5 p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-400 font-bold">{index + 1}.</span>
                        <span className="font-extrabold text-slate-200">{pro.name}</span>
                        <span className="text-[10px] text-cyan-400/80 font-mono">[{pro.badge}]</span>
                      </div>
                      <span className="font-mono font-extrabold text-cyan-400">{pro.cps} CPS</span>
                    </div>
                    
                    {/* Responsive bar width visualizer */}
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-cyan-600 to-cyan-400"
                        style={{ width: `${Math.min(100, Math.max(5, (pro.cps / 15) * 100))}%` }}
                      />
                    </div>
                  </div>
                ))}

                {/* Inject current user scoring for CPS comparison directly */}
                {cpsScore !== null && (
                  <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/40 relative overflow-hidden mt-2">
                    <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-cyan-400 to-cyan-600" />
                    <div className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        <span className="font-black text-cyan-200">{isAr ? "نقراتك في الثانية أنت" : "YOUR CLICK SPEED RATINGS"}</span>
                      </div>
                      <span className="font-mono font-extrabold text-cyan-300">{cpsScore} CPS</span>
                    </div>
                    {/* Visualizer mapping relative to max */}
                    <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden relative mt-2 border border-cyan-500/20">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-cyan-600 shadow-[0_0_8px_rgba(6,182,212,0.6)]" 
                        style={{ width: `${Math.min(100, Math.max(5, (cpsScore / 15) * 100))}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* High quality about guide details */}
          <div className="bg-slate-900/40 border border-white/10 p-5 md:p-6 rounded-3xl flex flex-col gap-3">
            <h4 className="font-extrabold text-sm text-slate-200 flex items-center gap-2">
              <Info size={16} className="text-purple-400" />
              {t.aboutTitle}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t.aboutDesc}
            </p>
          </div>

        </div>

        {/* Right Sidebar stats and analytics details (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">

          {/* Result Insights Card with Custom Grading */}
          <div className="bg-gradient-to-b from-slate-900/60 to-[#0e1124] border border-white/10 p-5 rounded-3xl flex flex-col gap-4">
            <h3 className="font-extrabold text-sm text-slate-200 flex items-center gap-2">
              <Award size={16} className="text-cyan-400" />
              {t.congratsTitle}
            </h3>

            {/* Reflex summary metrics in sidebar */}
            <div className="flex flex-col gap-1.5 border-b border-white/5 pb-4">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">{t.averageReflex}</span>
              {reactionMs !== null ? (
                <div className="flex flex-col gap-1">
                  <span className="text-2xl font-black text-rose-300 font-mono">{reactionMs} ms</span>
                  <div className={`mt-1 text-[10px] px-2 py-0.5 rounded border inline-block ${reflexGrade(reactionMs).color} w-fit font-bold`}>
                    🛡️ {reflexGrade(reactionMs).title}
                  </div>
                </div>
              ) : (
                <span className="text-xs text-slate-500 font-medium">{isAr ? "لم تجرِ الاختبار بعد" : "No reflex data Captured"}</span>
              )}
            </div>

            {/* CPS summary metrics in sidebar */}
            <div className="flex flex-col gap-1.5 border-b border-white/5 pb-4 font-sans">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">{t.averageCps}</span>
              {cpsScore !== null ? (
                <div className="flex flex-col gap-1">
                  <span className="text-2xl font-black text-cyan-300 font-mono">{cpsScore} CPS</span>
                  <div className={`mt-1 text-[10px] px-2 py-0.5 rounded border inline-block ${cpsGrade(cpsScore).color} w-fit font-bold`}>
                    🛡️ {cpsGrade(cpsScore).title}
                  </div>
                </div>
              ) : (
                <span className="text-xs text-slate-500 font-medium">{isAr ? "لم تجرِ الاختبار بعد" : "No Click values Captured"}</span>
              )}
            </div>

            {/* Quick classification tip insight */}
            <div className="bg-slate-950/80 p-3.5 rounded-xl border border-white/5 flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{t.howToReactionTitle}</span>
              <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">
                {t.howToReactionDesc}
              </p>
            </div>
          </div>

          {/* Game score keeping parameters history */}
          <div className="bg-slate-900/40 border border-white/10 p-5 rounded-3xl flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">{t.gameStats}</span>
              {(historyReflex.length > 0 || historyCps.length > 0) && (
                <button 
                  onClick={clearSessionStats} 
                  className="text-[10px] text-rose-400 hover:underline font-bold"
                >
                  {t.clearHistory}
                </button>
              )}
            </div>

            {historyReflex.length === 0 && historyCps.length === 0 ? (
              <p className="text-[11px] text-slate-500 italic py-4 text-center">{t.noHistory}</p>
            ) : (
              <div className="flex flex-col gap-3">
                {historyReflex.slice(0, 3).map((v, i) => (
                  <div key={i} className="flex justify-between items-center text-xs bg-white/5 p-2.5 rounded-xl border border-white/5">
                    <span className="text-slate-400 font-medium">{isAr ? `ردة فعل #${i+1}` : `Reflex Trial #${i+1}`}</span>
                    <span className="font-mono text-rose-400 font-black">{v} ms</span>
                  </div>
                ))}
                {historyCps.slice(0, 3).map((v, i) => (
                  <div key={i} className="flex justify-between items-center text-xs bg-white/5 p-2.5 rounded-xl border border-white/5">
                    <span className="text-slate-400 font-medium">{isAr ? `سرعة النقر #${i+1}` : `CPS Trial #${i+1}`}</span>
                    <span className="font-mono text-cyan-400 font-black">{v} CPS</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Interactive Share panel directly embedded */}
          <div className="bg-slate-900/40 border border-white/10 p-5 rounded-3xl">
            <ShareButtons lang={lang} text={textSummary} />
          </div>

        </div>

      </div>

      {/* 5. Middle Banner Ad Placement Placeholder */}
      <div className="w-full h-20 bg-slate-900/40 rounded-xl flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm relative overflow-hidden mt-4">
        <span className="absolute top-2 left-3 text-[9px] text-slate-600 font-mono">GAMERS_BENCH_728X90_BOTTOM</span>
        <div className="text-[10px] uppercase tracking-widest mb-1 text-slate-500">{isAr ? 'إعلان AdSense' : 'AdSense Sponsor Slot'}</div>
        <p className="text-[10px] text-slate-600 font-bold">AD_SPACE_BOTTOM_SECTION_PREVIEW</p>
      </div>

    </div>
  );
}
