import React, { useState, useEffect, useRef } from 'react';
import { 
  Wifi, Activity, Play, Square, Settings, Server, Sparkles, RefreshCw, 
  Volume2, VolumeX, AlertTriangle, Check, Copy, CheckCircle, Info, Zap, Globe, Gauge
} from 'lucide-react';
import ShareButtons from '../components/ShareButtons';

const translations = {
  ar: {
    title: "فاحص استقرار الشبكة والـ Ping للالعاب والعمل",
    subtitle: "قياس حقيقي للـ Ping والـ Jitter واستقرار الاتصال بالملي ثانية بدون سيرفرات معقدة.",
    pingLabel: "وقت الاستجابة (Ping)",
    jitterLabel: "مؤشر التذبذب (Jitter)",
    packetLossLabel: "فقدان البيانات (Packet Loss)",
    averageLabel: "متوسط الـ Ping",
    minLabel: "أقل Ping",
    maxLabel: "أعلى Ping",
    speedTestLabel: "فحص سرعة التحميل",
    speedMeasurement: "ميغابت/ثانية",
    speedTesting: "جاري فحص السرعة...",
    startTest: "بدء الفحص المستمر",
    stopTest: "إيقاف الفحص",
    singleTest: "فحص لمرة واحدة",
    customServerLabel: "عنوان مخصص (HTTP URL)",
    serverSelectLabel: "اختر خادم القياس",
    intervalLabel: "معدل التحديث (ملي ثانية)",
    soundToggle: "صوت التنبيه للـ Ping",
    statusReady: "الشبكة جاهزة للفحص",
    statusRunning: "جاري فحص استقرار الاتصال المباشر...",
    statusStopped: "تم إيقاف الفحص",
    connectionRating: "تقييم جودة الاتصال",
    ratingExcellent: "ممتاز جداً - استقرار تام",
    ratingGood: "جيد - مستقر",
    ratingFair: "مقبول - قد تواجه تقطيعاً خفيفاً",
    ratingPoor: "ضعيف - اتصال غير مستقر",
    ratingUnstable: "سيء جداً - فقدان عالي للبيانات",
    gamingTitle: "ملاءمة الاتصال للألعاب والعمل",
    gamingFps: "ألعاب الفريمات والمنظور الأول (FPS/Valorant/CS:GO)",
    gamingMmo: "ألعاب الموبا والقصصية (MOBA/League of Legends/MMO)",
    streaming: "البث التلفزيون بدقة 4K والمكالمات المرئية",
    browsing: "التصفح العام ومواقع التواصل الاجتماعي",
    gamingExcellent: "ممتاز (مثالي للمنافسة العالمية)",
    gamingPlayable: "مقبول (مستقر بما فيه الكفاية)",
    gamingLaggy: "فيه تأخير ولج (صعب تلعب)",
    gamingUnplayable: "غير قابل للعب (لا تجرب!)",
    shareMessage: "فحصت استقرار اتصالي على أدواتي Pro! الـ Ping الحالي: {ping}ms والـ Jitter: {jitter}ms. الاستقرار: {status}!",
    chartTitle: "مخطط استقرار الاستجابة المباشر (Ping History)",
    aboutTitle: "حول أداة فحص الـ Ping واستقرار الشبكة",
    aboutP1: "هذه الأداة مصممة خصيصاً للجيمرز ومقدمي البث المباشر والمستقلين الذين يعتمد عملهم على اتصال ثابت ومستقر. على عكس اختبارات السرعة التقليدية التي تقيس السرعة القصوى فقط، تركز هذه الأداة على 'ثبات الإشارة واستقرار الاستجابة'.",
    aboutP2: "يقوم الفاحص بإرسال حزم طلبات مصغرة ومتتابعة (HTTP GET/HEAD) نحو خوادم CDN عالمية وسريعة جداً (مثل Cloudflare) ذات زمن استجابة متناهي الصغر، ثم يقيس بدقة فائقة الوقت المستغرق بالملي ثانية. كما تحسب الأداة الـ Jitter وهو الفرق التراكمي بين الاستجابات المتتالية - فكلما قل الـ Jitter، زاد ثبات اللعبة والاتصال وصار البينغ ثابت بدون قفزات (Spikes).",
    customUrlPlaceholder: "مثال: https://cloudflare.com/cdn-cgi/trace",
    invalidUrlError: "الرجاء إدخال رابط HTTP/HTTPS صالح يدعم CORS أو متصل بالإنترنت.",
    speedResult: "سرعة التحميل التقديرية",
    runSpeedTestBtn: "قياس سرعة التحميل المباشرة",
    speedReadyText: "جاهز للفحص (سعة الملف 600KB من CDN)",
  },
  en: {
    title: "Pure JS Network Ping & Jitter Tester",
    subtitle: "Real-time latency, jitter, and packet loss measurements in milliseconds with no complex servers.",
    pingLabel: "Response Time (Ping)",
    jitterLabel: "Latency Variation (Jitter)",
    packetLossLabel: "Packet Loss",
    averageLabel: "Avg Ping",
    minLabel: "Min Ping",
    maxLabel: "Max Ping",
    speedTestLabel: "Download Speed Test",
    speedMeasurement: "Mbps",
    speedTesting: "Measuring speed...",
    startTest: "Start Continuous Test",
    stopTest: "Stop Test",
    singleTest: "Single Test Scan",
    customServerLabel: "Custom URL (HTTP)",
    serverSelectLabel: "Measure Target Endpoint",
    intervalLabel: "Ping Interval (ms)",
    soundToggle: "Ping Audio Tones",
    statusReady: "Network ready for testing",
    statusRunning: "Testing connection stability...",
    statusStopped: "Test stopped",
    connectionRating: "Connection Quality Rating",
    ratingExcellent: "Excellent - Fully Stable",
    ratingGood: "Good - Stable Connection",
    ratingFair: "Fair - Minor inconsistencies",
    ratingPoor: "Poor - Unstable latency",
    ratingUnstable: "Critical - High packet loss & lag",
    gamingTitle: "Connection Fitness for Usage",
    gamingFps: "Competitive/FPS Gaming (Valorant, CS:GO, FIFA)",
    gamingMmo: "MOBA & MMO Strategy (League of Legends, WoW)",
    streaming: "4K UHD Streaming & Video Calls (Netflix, Zoom)",
    browsing: "General Web Browsing & Social Media",
    gamingExcellent: "Excellent (Ideal for competitive play)",
    gamingPlayable: "Playable (Sufficiently stable)",
    gamingLaggy: "Laggy (Disadvantageous latency)",
    gamingUnplayable: "Unplayable (Heavy teleports or disconnects)",
    shareMessage: "Tested my network stability on MyTools Pro! Ping: {ping}ms, Jitter: {jitter}ms. Rating: {status}!",
    chartTitle: "Live Ping Response History",
    aboutTitle: "About The Ping & Jitter Tester",
    aboutP1: "This tool is crafted specifically for gamers, broadcasters, and remote professionals. While traditional speed tests measure peak bandwidth, this tester measures connection quality and consistency.",
    aboutP2: "The engine fires consecutive ultra-lightweight HTTP request packets (GET/HEAD) towards lightning-fast global edge nodes (like Cloudflare CDNs) with cache-busting strings. It monitors the precise response round-trip time (RTT). It also calculates Jitter—the statistical variation of consecutive latency packets. Low jitter prevents stuttering in online games and choppy audio/video on calls.",
    customUrlPlaceholder: "e.g., https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/11.1.9/sweetalert2.all.min.js",
    invalidUrlError: "Please provide a valid HTTP/HTTPS endpoint URL.",
    speedResult: "Estimated Download Speed",
    runSpeedTestBtn: "Measure Real-time Download Speed",
    speedReadyText: "Ready to measure (Fetches a 600KB file via global CDN)",
  }
};

const SERVERS = [
  { id: 'cdnjs', name: 'Cloudflare cdnjs (Multi-region CDN)', url: 'https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/11.1.9/sweetalert2.all.min.js' },
  { id: 'google', name: 'Google Ajax CDN (Fast & Lightweight)', url: 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js' },
  { id: 'microsoft', name: 'Microsoft Enterprise CDN', url: 'https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.6.0.min.js' },
  { id: 'cloudflare', name: 'Cloudflare 1.1.1.1 Trace API', url: 'https://cloudflare.com/cdn-cgi/trace' }
];

export default function PingTester({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  // Test Control State
  const [isRunning, setIsRunning] = useState(false);
  const [selectedServer, setSelectedServer] = useState(SERVERS[0].id);
  const [useCustomUrl, setUseCustomUrl] = useState(false);
  const [customUrl, setCustomUrl] = useState('');
  const [urlError, setUrlError] = useState('');
  const [pingInterval, setPingInterval] = useState(1000); // ms
  const [isSoundOn, setIsSoundOn] = useState(false);

  // Measurements Metrics state
  const [currentPing, setCurrentPing] = useState<number | null>(null);
  const [jitter, setJitter] = useState<number>(0);
  const [pingHistory, setPingHistory] = useState<(number | null)[]>([]); // null means packet loss
  const [minPing, setMinPing] = useState<number | null>(null);
  const [maxPing, setMaxPing] = useState<number | null>(null);
  const [avgPing, setAvgPing] = useState<number | null>(null);
  const [packetsSent, setPacketsSent] = useState<number>(0);
  const [packetsReceived, setPacketsReceived] = useState<number>(0);
  const [packetsLost, setPacketsLost] = useState<number>(0);

  // Speed Test State
  const [speedTestActive, setSpeedTestActive] = useState(false);
  const [downloadSpeed, setDownloadSpeed] = useState<number | null>(null);
  const [speedProgress, setSpeedProgress] = useState<number>(0);

  // Audio Context Ref for synthetic beep
  const audioContextRef = useRef<AudioContext | null>(null);

  // Canvas Reference
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Refs for tracking mutable statistics within the request loop
  const statsRef = useRef({
    history: [] as (number | null)[],
    sent: 0,
    received: 0,
    lost: 0,
    pingsOnly: [] as number[],
  });

  // Reset metrics
  const resetStats = () => {
    statsRef.current = {
      history: [],
      sent: 0,
      received: 0,
      lost: 0,
      pingsOnly: []
    };
    setCurrentPing(null);
    setJitter(0);
    setPingHistory([]);
    setMinPing(null);
    setMaxPing(null);
    setAvgPing(null);
    setPacketsSent(0);
    setPacketsReceived(0);
    setPacketsLost(0);
  };

  // Synthesize soft computer beep sound
  const playPingBeep = (latency: number) => {
    if (!isSoundOn) return;
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Pitch is higher for low ping (better) and lower for high ping (worse)
      // Cap frequency between 400Hz and 1000Hz
      const pitch = Math.max(380, Math.min(1100, 1000 - (latency * 2)));
      osc.frequency.value = pitch;

      osc.type = 'sine';
      
      // Gentle decay to avoid clicks
      gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.1);
    } catch (e) {
      console.error("Audio Synthesis Error: ", e);
    }
  };

  // Get current active target URL
  const getTargetUrl = () => {
    if (useCustomUrl) {
      if (!customUrl.trim()) return null;
      if (!customUrl.startsWith('http://') && !customUrl.startsWith('https://')) {
        return `https://${customUrl.trim()}`;
      }
      return customUrl.trim();
    }
    const srv = SERVERS.find(s => s.id === selectedServer);
    return srv ? srv.url : SERVERS[0].url;
  };

  // Execute a single ping
  const triggerPing = async (url: string) => {
    const busterUrl = `${url}${url.includes('?') ? '&' : '?'}cb=${Date.now()}`;
    const startTime = performance.now();
    statsRef.current.sent += 1;
    setPacketsSent(statsRef.current.sent);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 1200); // 1.2 seconds timeout limit

    try {
      await fetch(busterUrl, {
        method: 'GET', // GET handles opaque responses with full Edge traversal
        mode: 'no-cors',
        cache: 'no-store',
        signal: controller.signal
      });

      const endTime = performance.now();
      clearTimeout(timeoutId);
      const latency = Math.round(endTime - startTime);

      statsRef.current.received += 1;
      statsRef.current.pingsOnly.push(latency);
      statsRef.current.history.push(latency);

      // Jitter calculation: average absolute difference between consecutive ping observations
      let calculatedJitter = JitterCalc(statsRef.current.pingsOnly);

      // Bounds
      const minVal = Math.min(...statsRef.current.pingsOnly);
      const maxVal = Math.max(...statsRef.current.pingsOnly);
      const avgVal = Math.round(statsRef.current.pingsOnly.reduce((a, b) => a + b, 0) / statsRef.current.pingsOnly.length);

      setCurrentPing(latency);
      setJitter(calculatedJitter);
      setMinPing(minVal);
      setMaxPing(maxVal);
      setAvgPing(avgVal);
      setPacketsReceived(statsRef.current.received);
      
      // Store history up to 35 logs
      if (statsRef.current.history.length > 35) {
        statsRef.current.history.shift();
      }
      setPingHistory([...statsRef.current.history]);

      // Sound feedback
      playPingBeep(latency);

    } catch (err: any) {
      clearTimeout(timeoutId);
      statsRef.current.lost += 1;
      statsRef.current.history.push(null); // represent lost packet
      
      if (statsRef.current.history.length > 35) {
        statsRef.current.history.shift();
      }
      setPingHistory([...statsRef.current.history]);
      setPacketsLost(statsRef.current.lost);
      setCurrentPing(null);
    }
  };

  // Calc Jitter
  const JitterCalc = (arr: number[]) => {
    if (arr.length < 2) return 0;
    let sumDiff = 0;
    for (let i = 1; i < arr.length; i++) {
      sumDiff += Math.abs(arr[i] - arr[i - 1]);
    }
    return Math.round(sumDiff / (arr.length - 1));
  };

  // Continuous Ping Core Loop Effect
  useEffect(() => {
    if (!isRunning) return;

    const url = getTargetUrl();
    if (!url) {
      setIsRunning(false);
      return;
    }

    // Fire immediately
    triggerPing(url);

    // Set interval loop
    const id = setInterval(() => {
      triggerPing(url);
    }, pingInterval);

    return () => {
      clearInterval(id);
    };
  }, [isRunning, selectedServer, useCustomUrl, customUrl, pingInterval]);

  // Canvas plotter for real-time history curves
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear and match high DPI
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;

    // Horizontals
    const gridRows = 4;
    for (let i = 1; i < gridRows; i++) {
      const y = (height / gridRows) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();

      // Label
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.font = '9px monospace';
      const labelValue = Math.round(200 - (200 / gridRows) * i);
      ctx.fillText(`${labelValue} ms`, isAr ? width - 40 : 8, y - 4);
    }

    if (pingHistory.length === 0) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.font = '13px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(isAr ? 'اضغط بدء الفحص لعرض مخطط الاستقرار المباشر' : 'Click Start to load the live stability plotter', width / 2, height / 2);
      ctx.textAlign = 'start';
      return;
    }

    const maxGraphHeightValue = 200; // Cap visual range to 200ms for high graph resolution
    const pointsCount = 35;
    const stepX = width / (pointsCount - 1);

    // Plot values
    const coordinates: { x: number; y: number; isLost: boolean }[] = [];

    for (let i = 0; i < pointsCount; i++) {
      // align history right if we don't have enough points yet
      const historyIndex = i - (pointsCount - pingHistory.length);
      const val = historyIndex >= 0 ? pingHistory[historyIndex] : undefined;

      const x = i * stepX;
      
      if (val === undefined) {
        continue;
      }

      if (val === null) {
        // Lost packet spike to max
        coordinates.push({ x, y: height, isLost: true });
      } else {
        const normalizedVal = Math.min(val, maxGraphHeightValue);
        const y = height - (normalizedVal / maxGraphHeightValue) * (height - 20) - 10;
        coordinates.push({ x, y, isLost: false });
      }
    }

    if (coordinates.length === 0) return;

    // Draw gradient area below line
    const areaGrd = ctx.createLinearGradient(0, 0, 0, height);
    areaGrd.addColorStop(0, 'rgba(16, 185, 129, 0.25)'); // Emerald green
    areaGrd.addColorStop(1, 'rgba(16, 185, 129, 0.00)');

    ctx.beginPath();
    ctx.moveTo(coordinates[0].x, height);
    
    for (let i = 0; i < coordinates.length; i++) {
      if (coordinates[i].isLost) {
        // Red spike bottom to top
        ctx.lineTo(coordinates[i].x, 3);
        ctx.lineTo(coordinates[i].x + 2, 3);
        ctx.lineTo(coordinates[i].x + 3, height);
      } else {
        ctx.lineTo(coordinates[i].x, coordinates[i].y);
      }
    }
    ctx.lineTo(coordinates[coordinates.length - 1].x, height);
    ctx.closePath();
    ctx.fillStyle = areaGrd;
    ctx.fill();

    // Draw main glowing path
    ctx.beginPath();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#10b981'; // Emerald/green
    ctx.shadowColor = '#10b981';
    ctx.shadowBlur = 6;

    let startedPath = false;
    for (let i = 0; i < coordinates.length; i++) {
      if (coordinates[i].isLost) {
        ctx.stroke(); // finish segment
        startedPath = false;
        
        // Draw red packet loss line indicator
        ctx.strokeStyle = '#ef4444'; // Red for lost packet
        ctx.beginPath();
        ctx.moveTo(coordinates[i].x, height);
        ctx.lineTo(coordinates[i].x, 10);
        ctx.stroke();

        ctx.strokeStyle = '#10b981'; // restore emerald
        continue;
      }

      if (!startedPath) {
        ctx.beginPath();
        ctx.moveTo(coordinates[i].x, coordinates[i].y);
        startedPath = true;
      } else {
        ctx.lineTo(coordinates[i].x, coordinates[i].y);
      }
    }
    if (startedPath) {
      ctx.stroke();
    }
    
    // Reset shadow
    ctx.shadowBlur = 0;

    // Draw active dot at endpoint
    const lastCoord = coordinates[coordinates.length - 1];
    if (lastCoord && !lastCoord.isLost) {
      ctx.beginPath();
      ctx.fillStyle = '#ffffff';
      ctx.arc(lastCoord.x, lastCoord.y, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = '#059669';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

  }, [pingHistory, isAr]);

  // Run dynamic Download Speed Test (JS CDN Fetch)
  const runSpeedTest = async () => {
    if (speedTestActive) return;
    setSpeedTestActive(true);
    setDownloadSpeed(null);
    setSpeedProgress(10);

    const testUrl = `https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js?cb=${Date.now()}`;
    const startTime = performance.now();

    try {
      const response = await fetch(testUrl, { cache: 'no-store' });
      setSpeedProgress(40);

      if (!response.ok) throw new Error("Internal CDN Response Error");
      
      const reader = response.body?.getReader();
      let totalBytes = 0;
      const totalExpected = 604160; // Approximate size of three.min.js in bytes (~600KB)

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          totalBytes += value.length;

          // dynamic progression up to 95%
          const percentage = Math.round((totalBytes / totalExpected) * 50) + 40;
          setSpeedProgress(Math.min(95, percentage));
        }
      } else {
        const blob = await response.blob();
        totalBytes = blob.size;
      }

      const endTime = performance.now();
      const durationSeconds = (endTime - startTime) / 1000;
      setSpeedProgress(100);

      if (durationSeconds > 0) {
        const sizeInBits = totalBytes * 8;
        const mbps = (sizeInBits / durationSeconds) / (1024 * 1024);
        setDownloadSpeed(Number(mbps.toFixed(2)));
      }
    } catch (err) {
      console.error(err);
      setDownloadSpeed(0); // Represent network failure/throttle
    } finally {
      setTimeout(() => {
        setSpeedTestActive(false);
        setSpeedProgress(0);
      }, 500);
    }
  };

  // Connection Stability Grading Logic
  const getQualityGrading = () => {
    const total = packetsSent;
    const lossRate = total > 0 ? (packetsLost / total) * 100 : 0;
    
    if (total < 1 || currentPing === null) {
      return {
        badge: isAr ? 'انتظار الكفاءة' : 'Awaiting Metrics',
        color: 'text-slate-400 bg-slate-800/60 border-slate-700',
        fpsVerdict: isAr ? 'انتظار البينغ' : 'Awaiting Latency',
        mmoVerdict: isAr ? 'انتظار البينغ' : 'Awaiting Latency',
        streamingVerdict: isAr ? 'قيد الحساب' : 'Awaiting bandwidth',
        desc: isAr ? 'ابدأ الفحص لمشاهدة تحليل ثبات إشارتك' : 'Begin testing to evaluate signal efficiency'
      };
    }

    if (lossRate > 15) {
      return {
        badge: t.ratingUnstable,
        color: 'text-red-400 bg-red-950/40 border-red-500/30 shadow-red-500/10 shadow-md',
        fpsVerdict: t.gamingUnplayable,
        mmoVerdict: t.gamingUnplayable,
        streamingVerdict: t.gamingUnplayable,
        desc: isAr ? 'فقدان بيانات عالي جداً! تصفح مزود الخدمة أو خط الإشارة الخاص بك.' : 'Extreme packet drops. Check your physical cables or contact your ISP.'
      };
    }

    const testPing = avgPing !== null ? avgPing : currentPing;

    if (testPing < 35 && jitter < 5) {
      return {
        badge: t.ratingExcellent,
        color: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30 shadow-emerald-500/10 shadow-md',
        fpsVerdict: t.gamingExcellent,
        mmoVerdict: t.gamingExcellent,
        streamingVerdict: t.gamingExcellent,
        desc: isAr ? 'اتصالك مثالي وخيالي للـ FPS والمنافسات العالمية بدون أي تقطيع أو تلي بورت.' : 'Perfect connection consistency. Ideal for competitive fast-reaction gaming.'
      };
    } else if (testPing < 65 && jitter < 12) {
      return {
        badge: t.ratingGood,
        color: 'text-green-400 bg-green-950/40 border-green-500/35 shadow-green-500/15 shadow-sm',
        fpsVerdict: t.gamingPlayable,
        mmoVerdict: t.gamingExcellent,
        streamingVerdict: t.gamingExcellent,
        desc: isAr ? 'الاتصال ممتاز ومستقر بما يكفي لألعاب الأونلاين بجودة عالية ومكالمات صافية.' : 'Highly reliable connection. Smooth for standard gaming and HD calls.'
      };
    } else if (testPing < 110 && jitter < 22) {
      return {
        badge: t.ratingFair,
        color: 'text-yellow-400 bg-yellow-950/30 border-yellow-500/30',
        fpsVerdict: t.gamingLaggy,
        mmoVerdict: t.gamingPlayable,
        streamingVerdict: t.gamingExcellent,
        desc: isAr ? 'تأخير متوسط. اللعب مقبول، لكن قد تواجه قفزات (Delays) متقطعة أثناء الضغط.' : 'Acceptable latency, but minor ping spikes may impact high-paced action.'
      };
    } else {
      return {
        badge: t.ratingPoor,
        color: 'text-amber-500 bg-amber-950/30 border-amber-500/20',
        fpsVerdict: t.gamingUnplayable,
        mmoVerdict: t.gamingLaggy,
        streamingVerdict: t.gamingPlayable,
        desc: isAr ? 'البينغ مرتفع جداً والاتصال المتذبذب يفسد تجربة اللعب الجماعي ومكالمات الـ Discord.' : 'High response latency and packet jitter. Severe delay in multiplayer lobbies.'
      };
    }
  };

  const quality = getQualityGrading();

  // Handle running local simple single round scan
  const triggerSingleScan = async () => {
    if (isRunning) return;
    const url = getTargetUrl();
    if (!url) return;
    resetStats();
    for (let i = 0; i < 6; i++) {
      await triggerPing(url);
      await new Promise(r => setTimeout(r, 400));
    }
  };

  // Construct sharing text
  const shareText = currentPing !== null 
    ? t.shareMessage.replace('{ping}', String(currentPing)).replace('{jitter}', String(jitter)).replace('{status}', quality.badge)
    : (isAr ? "فاص استقرار شبكة الإنترنت والـ Ping" : "Web Network Stability & Latency Tester");

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-300">
      
      {/* Top Header Card */}
      <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative overflow-hidden">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg">
              <Wifi size={20} className="animate-pulse" />
            </span>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">{isAr ? 'أداة حية ومباشرة' : 'Live Client Tool'}</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2">{t.title}</h2>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed max-w-2xl">{t.subtitle}</p>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Column Left: Network Config Details */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col gap-4">
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2 border-b border-white/10 pb-2">
              <Settings size={18} className="text-indigo-400" />
              <span>{isAr ? 'إعدادات الفحص المقترحة' : 'Test Configurations'}</span>
            </h3>

            {/* Target Server Switcher */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                <Server size={14} />
                <span>{t.serverSelectLabel}</span>
              </label>
              
              <div className="flex gap-2 mb-1">
                <button
                  onClick={() => setUseCustomUrl(false)}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all border ${
                    !useCustomUrl 
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' 
                    : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10'
                  }`}
                >
                  {isAr ? "خوادم عامة" : "Public CDNs"}
                </button>
                <button
                  onClick={() => setUseCustomUrl(true)}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all border ${
                    useCustomUrl 
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' 
                    : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10'
                  }`}
                >
                  {isAr ? "سيرفر مخصص" : "Custom Host"}
                </button>
              </div>

              {!useCustomUrl ? (
                <div className="flex flex-col gap-1.5">
                  {SERVERS.map(srv => (
                    <button
                      key={srv.id}
                      onClick={() => {
                        setSelectedServer(srv.id);
                        if (isRunning) resetStats();
                      }}
                      className={`w-full text-right ${isAr ? 'text-right' : 'text-left'} p-2.5 rounded-xl text-xs transition-colors border flex items-center justify-between ${
                        selectedServer === srv.id
                          ? 'bg-white/10 border-indigo-500/50 text-white'
                          : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10'
                      }`}
                    >
                      <span className="font-medium truncate max-w-[200px]">{srv.name}</span>
                      <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-slate-400">DNS</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    value={customUrl}
                    onChange={(e) => {
                      setCustomUrl(e.target.value);
                      setUrlError('');
                    }}
                    placeholder={t.customUrlPlaceholder}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                  {urlError && <div className="text-[10px] text-red-400">{urlError}</div>}
                </div>
              )}
            </div>

            {/* Test Interval Selection */}
            <div className="flex flex-col gap-2 mt-1">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>{t.intervalLabel}</span>
                <span className="font-mono text-emerald-400 font-bold">{pingInterval}ms</span>
              </label>
              <input
                type="range"
                min="300"
                max="3000"
                step="100"
                value={pingInterval}
                onChange={(e) => setPingInterval(Number(e.target.value))}
                className="w-full accent-emerald-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Tone Toggle Options */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5 mt-2">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">
                  {isSoundOn ? <Volume2 size={16} className="text-emerald-400" /> : <VolumeX size={16} />}
                </span>
                <span className="text-xs font-semibold text-slate-300">{t.soundToggle}</span>
              </div>
              <button
                onClick={() => setIsSoundOn(!isSoundOn)}
                className={`w-11 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none ${
                  isSoundOn ? 'bg-emerald-500' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full shadow-md transform duration-200 ${
                    isSoundOn ? (isAr ? '-translate-x-5' : 'translate-x-5') : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Active Control Action Trigger buttons */}
            <div className="flex flex-col gap-2 mt-4">
              {isRunning ? (
                <button
                  onClick={() => setIsRunning(false)}
                  className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 active:scale-[0.98] transition-transform"
                >
                  <Square size={16} fill="currentColor" />
                  <span>{t.stopTest}</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    const url = getTargetUrl();
                    if (!url) {
                      setUrlError(t.invalidUrlError);
                      return;
                    }
                    resetStats();
                    setIsRunning(true);
                  }}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-900 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-transform"
                >
                  <Play size={16} fill="currentColor" />
                  <span>{t.startTest}</span>
                </button>
              )}

              <button
                disabled={isRunning || speedTestActive}
                onClick={triggerSingleScan}
                className="w-full py-2.5 bg-white/5 hover:bg-white/10 disabled:opacity-50 text-slate-200 border border-white/15 rounded-xl text-xs font-bold transition-all"
              >
                {t.singleTest}
              </button>
            </div>
          </div>
        </div>

        {/* Column Right: Active Dashboard readout and Graphs plots */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Main Gauges Display Board */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Gauge Component 1: Latency Ping Response */}
            <div className="p-5 rounded-2xl border border-white/10 bg-slate-900/60 flex flex-col items-center justify-between text-center relative overflow-hidden min-h-[160px]">
              <div className="absolute top-2 right-2 text-slate-500">
                <Gauge size={14} />
              </div>
              <span className="text-xs font-bold text-slate-400 mb-2">{t.pingLabel}</span>
              
              <div className="flex flex-col items-center justify-center my-2">
                <span className={`text-4xl sm:text-5xl font-extrabold font-mono tracking-tighter ${
                  currentPing === null ? 'text-slate-500' :
                  currentPing < 35 ? 'text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.3)]' :
                  currentPing < 65 ? 'text-green-400' :
                  currentPing < 110 ? 'text-yellow-400' : 'text-amber-500'
                }`}>
                  {currentPing !== null ? currentPing : '--'}
                </span>
                <span className="text-[10px] text-slate-500 font-semibold uppercase mt-1">ms (milliseconds)</span>
              </div>

              <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                {currentPing !== null && currentPing < 35 ? (
                  <span className="text-emerald-400 font-bold">🎮 Fast Response</span>
                ) : currentPing !== null && currentPing >= 110 ? (
                  <span className="text-amber-500 font-bold">⚠️ Warning Latency</span>
                ) : (
                  <span>Ready state</span>
                )}
              </div>
            </div>

            {/* Gauge Component 2: Jitter Jitter */}
            <div className="p-5 rounded-2xl border border-white/10 bg-slate-900/60 flex flex-col items-center justify-between text-center min-h-[160px]">
              <span className="text-xs font-bold text-slate-400 mb-2">{t.jitterLabel}</span>
              
              <div className="flex flex-col items-center justify-center my-2">
                <span className={`text-4xl sm:text-5xl font-extrabold font-mono tracking-tighter ${
                  jitter === 0 ? 'text-slate-500' :
                  jitter < 4 ? 'text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.2)]' :
                  jitter < 12 ? 'text-green-400' :
                  jitter < 22 ? 'text-yellow-400' : 'text-amber-500'
                }`}>
                  {packetsSent > 1 ? jitter : '--'}
                </span>
                <span className="text-[10px] text-slate-500 font-semibold uppercase mt-1">ms (variation)</span>
              </div>

              <span className="text-[10px] text-slate-400 mt-1">
                {jitter > 15 ? (isAr ? 'تذبذب عالي (تقطيع)' : 'High Jitter (Stutter)') : (isAr ? 'إشارة مستقرة' : 'Stable Signal')}
              </span>
            </div>

            {/* Gauge Component 3: Packet Drops */}
            <div className="p-5 rounded-2xl border border-white/10 bg-slate-900/60 flex flex-col items-center justify-between text-center min-h-[160px]">
              <span className="text-xs font-bold text-slate-400 mb-2">{t.packetLossLabel}</span>
              
              <div className="flex flex-col items-center justify-center my-2">
                <span className={`text-4xl sm:text-5xl font-extrabold font-mono tracking-tighter ${
                  packetsSent === 0 ? 'text-slate-500' :
                  packetsLost === 0 ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {packetsSent > 0 ? `${((packetsLost / packetsSent) * 100).toFixed(1)}%` : '0.0%'}
                </span>
                <span className="text-[10px] text-slate-500 font-semibold uppercase mt-1">
                  {packetsLost} {isAr ? 'مفقودة' : 'lost'} / {packetsSent} {isAr ? 'مرسلة' : 'sent'}
                </span>
              </div>

              <span className="text-[10px] text-slate-400 mt-1">
                {packetsLost > 0 ? (isAr ? 'تخبط خط الإشارة!' : 'Detected frame loss') : (isAr ? 'خالي من الفقدان (مستقر)' : 'No Loss (Excellent)')}
              </span>
            </div>

          </div>

          {/* Real-time Dynamic Canvas Plotter Curve */}
          <div className="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col gap-3">
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <h4 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Activity size={14} className="text-emerald-400" />
                <span>{t.chartTitle}</span>
              </h4>
              <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                {isRunning ? t.statusRunning : t.statusStopped}
              </span>
            </div>
            
            <div className="w-full relative bg-slate-950/45 rounded-xl border border-white/5 p-1 h-[200px]">
              <canvas 
                ref={canvasRef} 
                width={650} 
                height={190} 
                className="w-full h-full block" 
              />
            </div>

            {/* Minimum / Maximum / Average stats footer banner */}
            <div className="grid grid-cols-3 gap-2 text-center mt-1">
              <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                <div className="text-[10px] text-slate-400 font-semibold mb-0.5">{t.minLabel}</div>
                <div className="text-sm font-bold text-slate-200 font-mono">{minPing !== null ? `${minPing} ms` : '--'}</div>
              </div>
              <div className="emerald-gradient-card bg-white/5 p-2.5 rounded-xl border border-white/5">
                <div className="text-[10px] text-slate-400 font-semibold mb-0.5">{t.averageLabel}</div>
                <div className="text-sm font-bold text-emerald-400 font-mono">{avgPing !== null ? `${avgPing} ms` : '--'}</div>
              </div>
              <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                <div className="text-[10px] text-slate-400 font-semibold mb-0.5">{t.maxLabel}</div>
                <div className="text-sm font-bold text-slate-200 font-mono">{maxPing !== null ? `${maxPing} ms` : '--'}</div>
              </div>
            </div>
          </div>

          {/* Connection Verdict Suitability Analysis for gamers */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="p-1 px-2.5 rounded-full text-xs font-bold border flex items-center gap-1.5 bg-slate-900 border-white/10">
                <Zap size={13} className="text-amber-400" />
                {t.connectionRating}
              </span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${quality.color}`}>
                {quality.badge}
              </span>
            </div>
            
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed mb-6 bg-slate-900/40 p-3 rounded-xl border border-white/5">
              {quality.desc}
            </p>

            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
              {t.gamingTitle}:
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg shrink-0 text-xs font-bold">FPS</div>
                <div className="flex-grow">
                  <h5 className="text-xs font-bold text-slate-200">{t.gamingFps}</h5>
                  <p className="text-[11px] text-slate-400 mt-1">{quality.fpsVerdict}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg shrink-0 text-xs font-bold">MOBA</div>
                <div className="flex-grow">
                  <h5 className="text-xs font-bold text-slate-200">{t.gamingMmo}</h5>
                  <p className="text-[11px] text-slate-400 mt-1">{quality.mmoVerdict}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                <div className="p-2 bg-red-500/20 text-red-400 rounded-lg shrink-0 text-xs">UHD</div>
                <div className="flex-grow">
                  <h5 className="text-xs font-bold text-slate-200">{t.streaming}</h5>
                  <p className="text-[11px] text-slate-400 mt-1">{quality.streamingVerdict}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                <div className="p-2 bg-green-500/20 text-green-400 rounded-lg shrink-0 text-xs">WEB</div>
                <div className="flex-grow">
                  <h5 className="text-xs font-bold text-slate-200">{t.browsing}</h5>
                  <p className="text-[11px] text-slate-400 mt-1">{isAr ? 'ممتاز (سلس جداً)' : 'Excellent (Seamless)'}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Download Speed Estimator Module */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div className="flex-1">
              <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-1.5">
                <Gauge size={16} className="text-emerald-400" />
                <span>{t.speedTestLabel}</span>
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed max-w-sm">{t.speedReadyText}</p>
              
              {downloadSpeed !== null && (
                <div className="mt-2 text-xs text-emerald-400 font-bold flex items-center gap-1.1">
                  <CheckCircle size={14} />
                  <span>{t.speedResult}: {downloadSpeed} {t.speedMeasurement}</span>
                </div>
              )}
            </div>

            <div className="w-full sm:w-auto shrink-0 flex flex-col gap-2 min-w-[200px]">
              {speedTestActive ? (
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-[11px] text-slate-400 font-mono">
                    <span>{t.speedTesting}</span>
                    <span>{speedProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 transition-all duration-300 rounded-full"
                      style={{ width: `${speedProgress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <button
                  onClick={runSpeedTest}
                  disabled={isRunning}
                  className="w-full py-2.5 px-4 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 hover:border-emerald-500/40 rounded-xl text-xs font-bold transition-all disabled:opacity-40"
                >
                  {t.runSpeedTestBtn}
                </button>
              )}
            </div>
          </div>

          {/* Share Results Trigger */}
          <ShareButtons text={shareText} lang={lang} />
          
        </div>
      </div>

      {/* Explanatory Info Card */}
      <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col gap-4 mt-2">
        <h3 className="text-md font-bold text-emerald-400 flex items-center gap-2 border-b border-white/5 pb-2">
          <Info size={18} />
          <span>{t.aboutTitle}</span>
        </h3>
        <p className="text-xs md:text-sm text-slate-400 leading-relaxed">{t.aboutP1}</p>
        <p className="text-xs md:text-sm text-slate-400 leading-relaxed">{t.aboutP2}</p>
      </div>

    </div>
  );
}
