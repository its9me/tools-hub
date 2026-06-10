import React, { useState, useMemo } from 'react';
import { 
  Calculator, GraduationCap, HeartPulse, Code2, 
  Plane, PiggyBank, HeartHandshake, Eye, QrCode, Smartphone,
  FileText, Activity, BookOpen, Clock, 
  Smile, ShieldCheck, CheckCircle2, Search, Trophy,
  Image as ImageIcon, Zap, Triangle, Cuboid, FlaskConical, Thermometer, Radio, Box, Plug, 
  PieChart, Wifi, Gauge, Sparkles, Layers,
  Globe, User, ArrowRight, Palette, PenTool, Flame, Laptop,
  Facebook, Instagram, Youtube, Send, Music
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import AdPlacement from '../components/AdPlacement';

// Comprehensive index of all tools for instant smart search
const ALL_TOOLS_REGISTRY = [
  // Finance
  { id: 'loan-calculator', nameAr: 'حاسبة القروض', nameEn: 'Loan Calculator', descAr: 'القسط الشهري والفوائد بالتفصيل', descEn: 'Monthly EMI and compound interest', icon: Calculator, cat: 'finance' },
  { id: 'tax-calculator', nameAr: 'حاسبة ضريبة الدخل', nameEn: 'Income Tax', descAr: 'حساب ضريبة الدخل والخصومات', descEn: 'Estimate income tax & deductions', icon: Calculator, cat: 'finance' },
  { id: 'compound-interest', nameAr: 'الفائدة المركبة', nameEn: 'Compound Interest', descAr: 'نمو المدخرات والاستثمار العكسي', descEn: 'Savings growth & investment', icon: Calculator, cat: 'finance' },
  { id: 'zakat-calculator', nameAr: 'حاسبة الزكاة', nameEn: 'Zakat Calculator', descAr: 'حساب زكاة المال والذهب الدقيق', descEn: 'Calculate Zakat on wealth', icon: HeartHandshake, cat: 'finance' },
  { id: 'invoice-generator', nameAr: 'صانع الفواتير', nameEn: 'Invoice Generator', descAr: 'إنشاء فواتير احترافية للعملاء', descEn: 'Create professional client invoices', icon: FileText, cat: 'finance' },
  { id: 'stock-profit', nameAr: 'أرباح وخسائر الأسهم', nameEn: 'Stock Profit', descAr: 'حساب صفقات التداول بنقرة واحدة', descEn: 'Calculate stock trades & fees', icon: PieChart, cat: 'finance' },

  // Social & Productivity
  { id: 'image-resizer', nameAr: 'مقاسات الصور السريعة', nameEn: 'Image Resizer', descAr: 'تعديل مقاسات الصور للمنصات', descEn: 'Resize images for social hubs', icon: ImageIcon, cat: 'social' },
  { id: 'qr-suite', nameAr: 'أداة QR الذكية', nameEn: 'QR Suite', descAr: 'إنشاء وقراءة رموز الاستجابة السريعة', descEn: 'Generate & scan interactive QRs', icon: QrCode, cat: 'productivity' },
  { id: 'pdf-compressor', nameAr: 'ضاغط PDF الفوري', nameEn: 'PDF Compressor', descAr: 'تقليل حجم ملفات PDF بأمان وبسرعة', descEn: 'Compress PDF size securely', icon: FileText, cat: 'productivity' },
  { id: 'word-counter', nameAr: 'حاسبة الكلمات والحروف', nameEn: 'Word Counter', descAr: 'عداد كلمات وجمل ذكي ومتطور', descEn: 'Smart word & sentence counter stats', icon: Code2, cat: 'productivity' },
  { id: 'online-notepad', nameAr: 'المفكرة السحابية المؤقتة', nameEn: 'Online Notepad', descAr: 'اكتب واحفظ ملاحظاتك أوتوماتيكياً', descEn: 'Auto-saved cloud scratchpad', icon: FileText, cat: 'productivity' },

  // Education
  { id: 'gpa-calculator', nameAr: 'حاسبة المعدل التراكمي', nameEn: 'GPA Calculator', descAr: 'حساب المعدل الفصلي والتراكمي', descEn: 'Calculate cumulative & semester GPA', icon: GraduationCap, cat: 'education' },
  { id: 'typing-speed-test', nameAr: 'اختبار سرعة الكتابة', nameEn: 'Typing Speed', descAr: 'احسب سرعتك بالكتابة بالدقيقة', descEn: 'Calculate writing speed (WPM)', icon: BookOpen, cat: 'education' },
  { id: 'daily-study-schedule', nameAr: 'الجدول الدراسي المنظم', nameEn: 'Study Planner', descAr: 'منظم خطة وجداول المذاكرة اليومية', descEn: 'Organize study plans & routines', icon: Clock, cat: 'education' },

  // Developers
  { id: 'speed-test', nameAr: 'فحص سرعة الإنترنت', nameEn: 'Internet Speed Test', descAr: 'قياس دقيق لسرعة الرفع والتحميل والـ Ping', descEn: 'High-precision broadband metrics', icon: Gauge, cat: 'developers' },
  { id: 'ping-tester', nameAr: 'فاحص استقرار الـ Ping', nameEn: 'Ping stability tester', descAr: 'التحقق من جودة الاتصال وثبات السرعة', descEn: 'Check network stability in live charts', icon: Wifi, cat: 'developers' },
  { id: 'json-converter', nameAr: 'محلل ومحول JSON', nameEn: 'JSON Converter Parser', descAr: 'تحويل بيانات JSON لـ XML أو CSV', descEn: 'Convert JSON formatted structures', icon: Code2, cat: 'developers' },
  { id: 'image-color-picker', nameAr: 'مستخرج ألوان الصور', nameEn: 'Color Picker', descAr: 'استخراج أكواد HEX/RGB من الصور', descEn: 'Extract and pick hex colors from files', icon: Palette, cat: 'developers' },
  { id: 'color-contrast', nameAr: 'فاحص تباين الألوان', nameEn: 'Color Contrast Checker', descAr: 'فحص موازنة تباين الألوان ومعايير WCAG ومعاينة حية وتوفير بدائل وحلول', descEn: 'Check color contrast ratios against WCAG standard & suggest alternatives', icon: Palette, cat: 'developers' },
  { id: 'text-diff-suite', nameAr: 'مقارن ومكتشف فروق النصوص والسطور', nameEn: 'Text Diff & Line Suite', descAr: 'مقارنة فوريّة ذكية للنصوص والمستندات محلياً، مع محو السطور المكررة وفرزها وتصفيتها', descEn: 'Compare texts to detect side-by-side diffs, eliminate duplicate lines and sort lists', icon: FileText, cat: 'developers' },
  { id: 'xml-viewer', nameAr: 'مستعرض ومحلل ملفات XML', nameEn: 'XML File Viewer & Parser', descAr: 'قراءة وفحص وتنسيق ملفات XML التفاعلية وتصديرها بصيغة JSON محلياً', descEn: 'Parse, inspect, format, query, and transform XML to JSON offline', icon: Code2, cat: 'developers' },

  // Health
  { id: 'bmi-calculator', nameAr: 'مؤشر كتلة الجسم BMI', nameEn: 'BMI Assessment', descAr: 'تحليل الوزن والدهون بشكل كامل', descEn: 'Calculate physical body mass index', icon: HeartPulse, cat: 'health' },
  { id: 'calorie-calculator', nameAr: 'حاسبة السعرات والوجبات', nameEn: 'Calorie Counter', descAr: 'احسب السعرات لإنقاص أو الحفاظ على الوزن', descEn: 'Estimate daily calorie metrics', icon: Activity, cat: 'health' },
  { id: 'world-meeting-planner', nameAr: 'منسق ومخطط الاجتماعات والمناطق الزمنية العالمية', nameEn: 'Interactive World Meeting Planner', descAr: 'تنسيق واختيار الموعد الأمثل والمشترك لفرق العمل الحر والعمل عن بعد', descEn: 'Coordinate and plan multi-timezone meetings and working overlap ranges seamlessly', icon: Globe, cat: 'travel' },
  { id: 'gamers-reflex', nameAr: 'فاحص سرعة الاستجابة والنقر للاعبين', nameEn: 'Gamers Reflex & CPS Benchmarker', descAr: 'أداة لقياس واختبار سرعة ردة الفعل واستقرار معدل النقر والـ CPS مع مقارنات لاعبي الـ eSports والمحترفين', descEn: 'Test reaction speed & click precision tailored for eSports players alongside pro leaderboards', icon: Trophy, cat: 'lifestyle' }
];

// 12 Premium high-fidelity Category Cards exactly styled to match Image 1
const CATEGORY_CARDS = [
  { id: 'photos', nameAr: 'أدوات الصور', nameEn: 'Image Tools', icon: ImageIcon, mapCat: 'photos', cardBg: 'bg-gradient-to-b from-[#1c3c9c]/80 to-[#0e2154]/95 border-[#1e44b8]', iconBg: 'bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] shadow-[0_0_15px_rgba(37,99,235,0.5)]' },
  { id: 'pdf', nameAr: 'أدوات PDF', nameEn: 'PDF Tools', icon: FileText, mapCat: 'pdf', cardBg: 'bg-gradient-to-b from-[#5c24ab]/80 to-[#2b0c53]/95 border-[#6324c4]', iconBg: 'bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] shadow-[0_0_15px_rgba(139,92,246,0.5)]' },
  { id: 'developers', nameAr: 'أدوات المطورين', nameEn: 'Developer Tools', icon: Code2, mapCat: 'developers', cardBg: 'bg-gradient-to-b from-[#0d6b38]/80 to-[#06331a]/95 border-[#159a4f]', iconBg: 'bg-gradient-to-r from-[#10b981] to-[#047857] shadow-[0_0_15px_rgba(16,185,129,0.5)]' },
  { id: 'calculators', nameAr: 'الحاسبات', nameEn: 'Calculators', icon: Calculator, mapCat: 'calculators', cardBg: 'bg-gradient-to-b from-[#aa6600]/80 to-[#4a2e00]/95 border-[#db8700]', iconBg: 'bg-gradient-to-r from-[#f59e0b] to-[#b45309] shadow-[0_0_15px_rgba(245,158,11,0.5)]' },
  
  { id: 'writing', nameAr: 'أدوات الكتابة', nameEn: 'Writing Tools', icon: PenTool, mapCat: 'writing', cardBg: 'bg-gradient-to-b from-[#183474]/80 to-[#0c1a3a]/95 border-[#214caf]', iconBg: 'bg-gradient-to-r from-[#3b82f6] to-[#1d4ed8] shadow-[0_0_15px_rgba(59,130,246,0.5)]' },
  { id: 'health', nameAr: 'الصحة واللياقة', nameEn: 'Health & Fitness', icon: HeartPulse, mapCat: 'health', cardBg: 'bg-gradient-to-b from-[#941c3c]/80 to-[#470a1a]/95 border-[#c82452]', iconBg: 'bg-gradient-to-r from-[#ec4899] to-[#be185d] shadow-[0_0_15px_rgba(236,72,153,0.5)]' },
  { id: 'education', nameAr: 'أدوات التعليم', nameEn: 'Education Tools', icon: GraduationCap, mapCat: 'education', cardBg: 'bg-gradient-to-b from-[#0e5c98]/80 to-[#072d4c]/95 border-[#1c84d4]', iconBg: 'bg-gradient-to-r from-[#06b6d4] to-[#0369a1] shadow-[0_0_15px_rgba(6,182,212,0.5)]' },
  { id: 'finance', nameAr: 'المالية', nameEn: 'Finance Tools', icon: PiggyBank, mapCat: 'finance', cardBg: 'bg-gradient-to-b from-[#0f1f4e]/80 to-[#07102b]/95 border-[#162e7a]', iconBg: 'bg-gradient-to-r from-[#1d4ed8] to-[#1e3a8a] shadow-[0_0_15px_rgba(29,78,216,0.5)]' },
  
  { id: 'network', nameAr: 'أدوات الشبكة', nameEn: 'Network Tools', icon: Wifi, mapCat: 'network', cardBg: 'bg-gradient-to-b from-[#40127e]/80 to-[#1b053c]/95 border-[#5c1cba]', iconBg: 'bg-gradient-to-r from-[#8b5cf6] to-[#4c1d95] shadow-[0_0_15px_rgba(139,92,246,0.5)]' },
  { id: 'travel', nameAr: 'السفر والطيران', nameEn: 'Travel & Tourism', icon: Plane, mapCat: 'travel', cardBg: 'bg-gradient-to-b from-[#aa4400]/80 to-[#4a2100]/95 border-[#db5c00]', iconBg: 'bg-gradient-to-r from-[#f97316] to-[#c2410c] shadow-[0_0_15px_rgba(249,115,22,0.5)]' },
  { id: 'design', nameAr: 'أدوات التصميم', nameEn: 'Design Tools', icon: Palette, mapCat: 'design', cardBg: 'bg-gradient-to-b from-[#0a488e]/80 to-[#04244c]/95 border-[#126ecf]', iconBg: 'bg-gradient-to-r from-[#06b6d4] to-[#2563eb] shadow-[0_0_15px_rgba(6,182,212,0.5)]' },
  { id: 'more', nameAr: 'والمزيد...', nameEn: 'And More...', icon: Layers, mapCat: 'lifestyle', cardBg: 'bg-gradient-to-b from-[#08123c]/80 to-[#030821]/95 border-[#121f5e]', iconBg: 'bg-[#122678]/80 text-[#8aa4f7]' },
];

export default function Home({ lang }: { lang: 'ar' | 'en' }) {
  const isAr = lang === 'ar';
  const [searchQuery, setSearchQuery] = useState('');

  // Dual-language localized feature structures for Left Brand Panel
  const FEATURES = useMemo(() => [
    { text: isAr ? 'سريعة' : 'Fast', desc: isAr ? 'تنجز أكثر' : 'Finish More', icon: Zap, iconBg: 'bg-cyan-500/15', textClr: 'text-cyan-400' },
    { text: isAr ? 'آمنة' : 'Secure', desc: isAr ? 'خصوصيتك أولاً' : 'Privacy First', icon: ShieldCheck, iconBg: 'bg-blue-500/15', textClr: 'text-sky-400' },
    { text: isAr ? 'ذكية' : 'Smart', desc: isAr ? 'أدوات متطورة' : 'Advanced Tools', icon: Sparkles, iconBg: 'bg-purple-500/15', textClr: 'text-purple-400' },
    { text: isAr ? 'مجانية' : 'Free', desc: isAr ? 'بدون تسجيل' : 'No Signup Req.', icon: CheckCircle2, iconBg: 'bg-emerald-500/15', textClr: 'text-emerald-400' }
  ], [isAr]);

  const filteredTools = useMemo(() => {
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      return ALL_TOOLS_REGISTRY.filter(tool => 
        tool.nameAr.toLowerCase().includes(query) || 
        tool.nameEn.toLowerCase().includes(query) || 
        tool.descAr.toLowerCase().includes(query) || 
        tool.descEn.toLowerCase().includes(query) || 
        tool.id.includes(query)
      );
    }
    return [];
  }, [searchQuery]);

  return (
    <div className="w-full h-full flex flex-col gap-6 animate-in fade-in duration-500 pb-10">
      
      {/* 1. Header Banner Ad Placement Placeholder (Retained Exactly) */}
      <div className="w-full max-w-[1400px] mx-auto">
        <AdPlacement className="w-full h-24 bg-[#0a0d24]/90 border border-[#212b77]/30 hover:border-[#2b3899] rounded-2xl flex items-center justify-center text-slate-400 transition-colors" />
      </div>

      {/* 2. Main Central Hub Panel Container */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-10 rounded-[2.5rem] border border-[#1d2459] bg-[#05071d]/95 backdrop-blur-xl shadow-[0_0_100px_rgba(5,7,29,0.95)] overflow-hidden flex flex-col xl:flex-row gap-8 lg:gap-14">
        
        {/* Futuristic layout background nodes */}
        <div className="absolute inset-0 z-[-1] pointer-events-none">
          <div className="absolute top-[20%] left-[-15%] w-[45%] h-[45%] bg-blue-600/5 rounded-full blur-[140px]" />
          <div className="absolute bottom-[20%] right-[-15%] w-[45%] h-[45%] bg-purple-600/5 rounded-full blur-[140px]" />
        </div>

        {/* ================= LEFT PANEL: HIGH FIDELITY BRAND INFO CARD ================= */}
        <div className="xl:w-5/12 flex flex-col items-center xl:items-stretch gap-6">
          
          {/* Orbital Graphics Area (Ref. Image 1 Circular Core Logo Container) */}
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 mx-auto flex items-center justify-center">
            
            {/* Spinning background dotted orbit tracks */}
            <div className="absolute inset-2 border border-dashed border-cyan-500/20 rounded-full animate-[spin_60s_linear_infinite]" />
            <div className="absolute inset-8 border border-cyan-500/5 rounded-full" />
            <div className="absolute inset-14 border border-purple-500/10 rounded-full animate-[spin_32s_linear_infinite]" />
            <div className="absolute inset-0 border border-transparent border-t-purple-500/20 border-b-cyan-500/10 rounded-full animate-spin-slow" />

            {/* Glowing circular backdrop for the central Logo */}
            <div className="absolute w-44 h-44 rounded-full bg-[#030617]/90 border-2 border-indigo-500/20 shadow-[0_0_50px_rgba(33,82,202,0.25)] flex items-center justify-center z-10">
              <Logo size={120} glow={true} className="animate-pulse-slow" />
            </div>

            {/* floating glassmorphic badges with glowing 3D-like icons (Ref. Image 1 around circular container) */}
            {/* Top-Left: Code/Developers Badge */}
            <div className="absolute top-2 left-2 z-20 w-11 h-11 rounded-xl bg-slate-900/90 border border-[#c084fc]/30 backdrop-blur-md flex items-center justify-center shadow-[0_0_15px_rgba(192,132,252,0.2)] hover:scale-110 transition-transform duration-305">
              <Code2 size={20} className="text-[#c084fc] drop-shadow-[0_0_6px_rgba(192,132,252,0.6)]" />
            </div>

            {/* Top-Right: Images/Design Badge */}
            <div className="absolute top-2 right-2 z-20 w-11 h-11 rounded-xl bg-slate-900/90 border border-cyan-400/30 backdrop-blur-md flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:scale-110 transition-transform duration-305">
              <ImageIcon size={20} className="text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.6)]" />
            </div>

            {/* Bottom-Left: Calculators Badge */}
            <div className="absolute bottom-2 left-2 z-20 w-11 h-11 rounded-xl bg-slate-900/90 border border-emerald-400/30 backdrop-blur-md flex items-center justify-center shadow-[0_0_15px_rgba(52,211,153,0.2)] hover:scale-110 transition-transform duration-305">
              <Calculator size={19} className="text-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.6)] animate-pulse" />
            </div>

            {/* Bottom-Right: PDF/Documents Badge */}
            <div className="absolute bottom-2 right-2 z-20 w-11 h-11 rounded-xl bg-slate-900/90 border border-[#fb923c]/30 backdrop-blur-md flex items-center justify-center shadow-[0_0_15px_rgba(251,146,96,0.2)] hover:scale-110 transition-transform duration-305">
              <FileText size={19} className="text-[#fb923c] drop-shadow-[0_0_6px_rgba(251,146,96,0.6)]" />
            </div>

          </div>

          {/* Core Brand Title and Slogan (Ref. Image 1 core titles) */}
          <div className="text-center flex flex-col items-center">
            <h2 className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-200 tracking-wider font-sans drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
              TOOLS HUB
            </h2>
            
            <div className="flex items-center gap-2.5 mt-2">
              <div className="w-6 h-px bg-cyan-500/50" />
              <span className="text-[11px] font-bold text-slate-400 tracking-[0.2em] uppercase font-mono">
                {isAr ? 'منصة واحدة لكل احتياجاتك' : 'ALL TOOLS ONE HUB'}
              </span>
              <div className="w-6 h-px bg-purple-500/50" />
            </div>
          </div>

          {/* 4 Sleek Dark Feature Plates (Ref. Image 1 4 features listed side-by-side or stacked grid) */}
          <div className="w-full grid grid-cols-2 gap-3 mt-2">
            {FEATURES.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div 
                  key={idx}
                  className="rounded-2xl border border-[#1b2554] bg-[#0b0f2a]/90 p-3 flex items-center gap-2.5 hover:bg-[#121944] hover:border-[#222f77] transition-all hover:-translate-y-0.5"
                >
                  <div className={`w-9 h-9 rounded-xl shrink-0 ${item.iconBg} flex items-center justify-center ${item.textClr}`}>
                    <IconComponent size={16} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[12px] font-bold text-slate-200 truncate leading-tight">{item.text}</span>
                    <span className="text-[10px] text-slate-400 truncate mt-0.5 leading-tight">{item.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Futuristic Rounded Active Pill Capsule (Ref. Image 1 bottom wide capsule) */}
          <div className="w-full bg-gradient-to-r from-cyan-950/25 via-[#1a0e3a]/30 to-cyan-950/25 border border-[#2b276d] hover:border-[#38338e] py-3.5 px-6 rounded-full flex items-center justify-center gap-2.5 text-xs font-bold text-[#b8ceff] tracking-wide shadow-[0_0_30px_rgba(99,102,241,0.15)] mt-1 animate-pulse select-none">
            <Globe size={15} className="text-cyan-400 animate-spin-slow" />
            <span>
              {isAr ? 'أدوات ذكية لكل احتياجاتك اليومية' : 'Smart tools ready for your daily workflow'}
            </span>
          </div>

        </div>


        {/* ================= RIGHT PANEL: 4x3 CATEGORY TILES GRID ================= */}
        <div className="xl:w-7/12 flex flex-col justify-center">
          
          {/* Decorative Panel Header */}
          <div className="mb-4 flex items-center justify-between border-b border-white/5 pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {isAr ? 'تصفح البرامج حسب الفئة' : 'Browse Utilities by Directory'}
            </h3>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          </div>

          {/* The 4x3 Grid (Styled to fit Image 1 design language) */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4 auto-rows-fr">
            {CATEGORY_CARDS.map((cat, idx) => {
              const IconComp = cat.icon;
              return (
                <Link 
                  to={`/category/${cat.mapCat}`}
                  key={cat.id + idx}
                  className="group flex flex-col bg-[#0b0f2a]/95 border border-[#1b2554] hover:border-[#32459c] rounded-[1.25rem] p-3 pb-2.5 transition-all duration-300 hover:bg-[#0f153a] hover:-translate-y-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.35)]"
                >
                  {/* Aspect-ratio container for the solid gradient plate */}
                  <div className={`w-full aspect-[1.15] rounded-xl flex items-center justify-center mb-3 relative overflow-hidden ${cat.cardBg}`}>
                    
                    {/* Glass sheen overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-70 pointer-events-none" />
                    
                    {/* High-contrast centered inner icon badge */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-[0_5px_12px_rgba(0,0,0,0.45)] ${cat.iconBg}`}>
                      <IconComp size={24} className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]" />
                    </div>
                  </div>

                  {/* Tile Typography Footer */}
                  <span className="text-[12px] sm:text-xs font-bold text-center text-slate-100 mt-1 tracking-wide group-hover:text-cyan-300 transition-colors">
                    {isAr ? cat.nameAr : cat.nameEn}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Panoramic learning center promotion card (Google AdSense compliance boost) */}
          <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-[#170c3a]/50 via-[#0d2a54]/50 to-[#0b0f2a]/95 border border-[#3e2e8c]/35 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-right rtl:text-right">
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center shrink-0">
                <BookOpen size={18} />
              </div>
              <div className="min-w-0 flex flex-col">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  {isAr ? 'مركز الشروحات والبحوث العلمية لأدوات Hub 📚' : 'Learning Hub & Scientific Guides 📚'}
                  <span className="text-[9px] bg-cyan-500/20 text-cyan-400 px-1.5 py-0.5 rounded font-black tracking-wider uppercase">NEW</span>
                </span>
                <span className="text-[10px] text-slate-400 truncate mt-0.5">
                  {isAr ? 'شروحات شاملة لزكاة المال، حساب المعدل، تباين الألوان ومقارنة النصوص.' : 'Detailed mathematical rules, Zakat frameworks, and UI accessibility guides.'}
                </span>
              </div>
            </div>
            <Link 
              to="/guides" 
              onMouseEnter={() => window.preloadTool?.('guides')}
              onFocus={() => window.preloadTool?.('guides')}
              onTouchStart={() => window.preloadTool?.('guides')}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl text-xs font-bold shrink-0 transition-opacity flex items-center gap-1 shadow-md shadow-cyan-950/20"
            >
              <span>{isAr ? 'استكشف المقالات والأدلة' : 'Read Articles'}</span>
              <ArrowRight size={12} className={isAr ? 'rotate-180' : ''} />
            </Link>
          </div>

        </div>

      </div>


      {/* ================= ADVERTISING SECTOR MIDDLE CONTENT (Retained Exactly) ================= */}
      <div className="w-full max-w-[1400px] mx-auto my-2">
        <AdPlacement className="w-full h-20 bg-[#070a24]/90 border border-dashed border-cyan-500/10 hover:border-cyan-500/20 rounded-2xl flex items-center justify-center text-slate-500 transition-colors" />
      </div>


      {/* ================= SEARCH SECTOR AND INSTANT UTILITIES DRAWER ================= */}
      <div className="w-full max-w-[1400px] mx-auto my-1.5">
        <div className="rounded-[2.25rem] border border-[#1d2459]/80 bg-[#060925]/95 p-6 sm:p-8 shadow-xl relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-44 h-44 bg-purple-500/5 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-44 h-44 bg-cyan-500/5 blur-[80px] rounded-full pointer-events-none" />

          {/* Heading with search icon */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                <Search size={18} className="text-cyan-400" />
                <span>{isAr ? 'البحث الذكي عن الأدوات' : 'Rapid Utilities Explorer'}</span>
              </h3>
              <p className="text-xs text-slate-400">
                {isAr ? 'اكتب اسم الأداة أو الكلمة المفتاحية للوصول الفوري والبدء الفوري.' : 'Quick query utility indexing database.'}
              </p>
            </div>

            {/* Premium Input form with inline Search Icon */}
            <div className="relative w-full md:w-80">
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isAr ? 'ابحث هنا...' : 'Search hub...'}
                className="w-full bg-[#0a0d2a] border border-[#212b77] focus:border-[#3b4ecc] text-slate-200 text-xs rounded-full py-3 px-10 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 shadow-inner"
              />
              <Search size={14} className="text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Conditional Query Results drawer */}
          {searchQuery.trim() !== '' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[440px] overflow-y-auto pr-1 animate-in slide-in-from-top-1">
              {filteredTools.length > 0 ? (
                filteredTools.map((tool) => {
                  const ToolIcon = tool.icon;
                  return (
                    <Link 
                      key={tool.id} 
                      to={`/tool/${tool.id}`}
                      onMouseEnter={() => window.preloadTool?.(tool.id)}
                      onFocus={() => window.preloadTool?.(tool.id)}
                      onTouchStart={() => window.preloadTool?.(tool.id)}
                      className="bg-[#0b1030]/80 border border-[#212b77]/40 hover:border-cyan-500/40 p-3.5 rounded-2xl flex items-center gap-3 transition-colors hover:bg-[#0f1642] group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-cyan-500/15 text-cyan-400 flex items-center justify-center shrink-0">
                        <ToolIcon size={16} />
                      </div>
                      <div className="min-w-0 flex flex-col">
                        <span className="text-xs font-bold text-slate-200 truncate group-hover:text-white">{isAr ? tool.nameAr : tool.nameEn}</span>
                        <span className="text-[10px] text-slate-400 truncate mt-0.5">{isAr ? tool.descAr : tool.descEn}</span>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <div className="col-span-full py-12 text-center text-slate-500 text-xs border border-dashed border-white/5 rounded-2xl">
                  {isAr ? 'عذراً، لم نعثر على نتائج موازية لطلبك.' : 'No modules indexed with requested name.'}
                </div>
              )}
            </div>
          ) : (
            /* Elegant prompt to begin exploring */
            <div className="py-6 text-center text-[11px] text-[#5c689a] border border-[#1b2554]/20 bg-[#030617]/50 rounded-2xl">
              {isAr ? 'أدخل اسم الأداة في خانة البحث لعرض قائمة سريعة متجاوبة.' : 'Type any query value inside search parameter box.'}
            </div>
          )}

        </div>
      </div>


      {/* ================= ADVERTISING SECTOR BOTTOM CONTENT (Retained Exactly) ================= */}
      <div className="w-full max-w-[1400px] mx-auto my-1.5">
        <AdPlacement className="w-full h-20 bg-[#070a24]/90 border border-dashed border-purple-500/10 hover:border-purple-500/20 rounded-2xl flex items-center justify-center text-slate-500 transition-colors" />
      </div>


      {/* ================= 3. BOTTOM METRICS AND BRANDED SOCIAL CARD (Ref. Image 1 Footer Capsule) ================= */}
      <div className="w-full max-w-[1400px] mx-auto">
        <div className="rounded-[2.5rem] border border-[#232857] bg-[#0c102a]/95 backdrop-blur-md p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_10px_40px_rgba(0,0,0,0.4)]">
          
          {/* Left / Main Section: 4 Metrics items */}
          <div className="w-full md:w-8/12 grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Stat Item 1 (Zap Logo) */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border border-purple-500/20 bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                <Zap size={20} className="drop-shadow-[0_0_8px_rgba(168,85,247,0.6)] animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-white font-mono leading-none tracking-wide">+200</span>
                <span className="text-[11px] text-slate-400 font-semibold mt-1.5">{isAr ? 'أداة مفيدة' : 'Useful Tools'}</span>
              </div>
            </div>

            {/* Stat Item 2 (User Logo) */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border border-blue-500/20 bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                <User size={18} className="drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-white font-mono leading-none tracking-wide">+500K</span>
                <span className="text-[11px] text-slate-400 font-semibold mt-1.5">{isAr ? 'مستخدم راضي' : 'Happy Users'}</span>
              </div>
            </div>

            {/* Stat Item 3 (Always active marker) */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border border-cyan-500/20 bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0 font-mono font-black text-xs leading-none shadow-[0_0_15px_rgba(34,211,238,0.15)]">
                24/7
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-white font-mono leading-none tracking-wide">24/7</span>
                <span className="text-[11px] text-slate-400 font-semibold mt-1.5">{isAr ? 'متاح دائماً' : 'Always Online'}</span>
              </div>
            </div>

            {/* Stat Item 4 (Verification Shield check) */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border border-emerald-500/20 bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                <ShieldCheck size={18} className="drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-white font-mono leading-none tracking-wide">100%</span>
                <span className="text-[11px] text-slate-400 font-semibold mt-1.5">{isAr ? 'آمن وسهل الاستخدام' : 'Safe & Simple'}</span>
              </div>
            </div>

          </div>

          {/* Socials & Domain Card (Ref. Image 1 bottom right sector) */}
          <div className="w-full md:w-4/12 flex flex-col items-center md:items-end gap-2 text-center md:text-right border-t border-[#1b2554] md:border-t-0 pt-4 md:pt-0 pl-0 md:pl-6 rtl:md:pr-6 rtl:md:pl-0 font-sans">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex items-center gap-1.5 text-cyan-400 font-bold text-lg font-mono tracking-wider">
                <Globe size={18} className="animate-spin-slow text-cyan-400" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 font-extrabold uppercase">tools hub</span>
              </div>
              <div className="flex items-center gap-2 ml-2 rtl:mr-2">
                {/* Facebook, Instagram, Telegram, Youtube, TikTok */}
                <a href="https://www.facebook.com/DNBbanka" target="_blank" rel="noreferrer" title="Facebook" className="w-7 h-7 bg-[#1877f2]/10 hover:bg-[#1877f2]/20 border border-[#1877f2]/30 rounded-full flex items-center justify-center text-[#1877f2] transition-all hover:scale-110 shadow-[0_0_8px_rgba(24,119,242,0.15)]">
                  <Facebook size={12} strokeWidth={2.5} />
                </a>
                <a href="https://www.instagram.com/tools_hub.live" target="_blank" rel="noreferrer" title="Instagram" className="w-7 h-7 bg-gradient-to-tr from-[#f9ce34]/10 via-[#ee2a7b]/10 to-[#6228d7]/10 hover:from-[#f9ce34]/20 hover:to-[#6228d7]/20 border border-[#ee2a7b]/35 rounded-full flex items-center justify-center text-[#ee2a7b] transition-all hover:scale-110 shadow-[0_0_8px_rgba(238,42,123,0.15)]">
                  <Instagram size={12} strokeWidth={2.5} />
                </a>
                <a href="https://t.me/too1shub" target="_blank" rel="noreferrer" title="Telegram" className="w-7 h-7 bg-[#0088cc]/10 hover:bg-[#0088cc]/20 border border-[#0088cc]/30 rounded-full flex items-center justify-center text-[#0088cc] transition-all hover:scale-110 shadow-[0_0_8px_rgba(0,136,204,0.15)]">
                  <Send size={12} strokeWidth={2.5} className="rotate-45 -translate-x-[1px] translate-y-[0.5px]" />
                </a>
                <a href="https://www.youtube.com/@Tools-hub-k3k" target="_blank" rel="noreferrer" title="YouTube" className="w-7 h-7 bg-[#ff0000]/10 hover:bg-[#ff0000]/20 border border-[#ff0000]/30 rounded-full flex items-center justify-center text-[#ff0000] transition-all hover:scale-110 shadow-[0_0_8px_rgba(255,0,0,0.15)]">
                  <Youtube size={12} strokeWidth={2.5} />
                </a>
                <a href="https://www.tiktok.com/@a.716" target="_blank" rel="noreferrer" title="TikTok" className="w-7 h-7 bg-[#010101]/30 hover:bg-[#010101]/50 border border-[#fe2c55]/40 rounded-full flex items-center justify-center text-[#fe2c55] transition-all hover:scale-110 shadow-[0_0_8px_rgba(254,44,85,0.15)]">
                  <Music size={12} strokeWidth={2.5} />
                </a>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              {isAr 
                ? 'تابعنا للحصول على أحدث الأدوات والنصائح يومياً 💜' 
                : 'Follow us to get the latest smart tools and tips daily! 💜'}
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
