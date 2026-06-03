import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Calculator, GraduationCap, HeartPulse, Code2, 
  Plane, PiggyBank, HeartHandshake, Eye, QrCode, Smartphone,
  FileText, Activity, BookOpen, Clock, 
  Smile, ShieldCheck, CheckCircle2, Search,
  Image as ImageIcon, Zap, Triangle, Cuboid, FlaskConical, Thermometer, Radio, Box, Plug, 
  PieChart, Wifi, Gauge, Sparkles, Layers,
  Globe, User, ArrowRight, Palette, PenTool, Flame, Laptop,
  Facebook, Instagram, Youtube, Send, Music
} from 'lucide-react';

interface RelatedToolItem {
  id: string;
  nameAr: string;
  nameEn: string;
  descAr: string;
  descEn: string;
  icon: any;
  category: string;
  colorClass: string;
}

// Full registry of tools with high-fidelity icons and categories for perfect interlinking match
const ALL_TOOLS_DATABASE: RelatedToolItem[] = [
  // 1. Finance & Wealth
  { id: 'loan-calculator', nameAr: 'حاسبة القروض والتمويل', nameEn: 'Loan & EMI Calculator', descAr: 'احسب الأقساط الشهرية والفوائد المتراكمة بالتفصيل', descEn: 'Monthly loans with complete interest schedules', icon: Calculator, category: 'finance', colorClass: 'border-blue-500/20 text-blue-400 group-hover:border-blue-500/50' },
  { id: 'tax-calculator', nameAr: 'حاسبة ضريبة الدخل', nameEn: 'Income Tax', descAr: 'تقدير ضريبة الدخل والخصومات والمستويات السنوية', descEn: 'Estimate income tax & salary deductions', icon: Calculator, category: 'finance', colorClass: 'border-blue-500/20 text-blue-400 group-hover:border-blue-500/50' },
  { id: 'compound-interest', nameAr: 'حاسبة الفائدة المركبة', nameEn: 'Compound Interest', descAr: 'قوة الوقت في التوفير وبناء الثروات بذكاء', descEn: 'Savings growth & investment multipliers', icon: PiggyBank, category: 'finance', colorClass: 'border-indigo-500/20 text-indigo-400 group-hover:border-indigo-500/50' },
  { id: 'zakat-calculator', nameAr: 'حاسبة الزكاة الشرعية', nameEn: 'Zakat Calculator', descAr: 'احسب مال زكاتك، الذهب، والفضة والمقاعد الشرعية', descEn: 'Modern Zakat calculation on total assets', icon: HeartHandshake, category: 'finance', colorClass: 'border-emerald-500/20 text-emerald-400 group-hover:border-emerald-500/50' },
  { id: 'gold-calculator', nameAr: 'حاسبة أسعار الذهب والمصنعية', nameEn: 'Gold & Jewelry Calculator', descAr: 'حساب غرام الذهب مع المصنعية وضريبة القيمة المضافة', descEn: 'Verify gold piece costs with workmanship fees', icon: Flame, category: 'finance', colorClass: 'border-amber-500/20 text-amber-400 group-hover:border-amber-500/50' },
  { id: 'inflation-calculator', nameAr: 'حاسبة التضخم التاريخي', nameEn: 'Inflation Calculator', descAr: 'تأثير التضخم على القوة الشرائية للنقود عبر الزمن', descEn: 'Compare historical currency purchase power', icon: Gauge, category: 'finance', colorClass: 'border-cyan-500/20 text-cyan-400 group-hover:border-cyan-500/50' },
  { id: 'stock-profit', nameAr: 'أرباح وخسائر الأسهم والعمولات', nameEn: 'Stock Profit Optimizer', descAr: 'حساب المكسب المالي للتداول وصافي عوائد الصفقات', descEn: 'Calculate stock trades, break evens & fees', icon: PieChart, category: 'finance', colorClass: 'border-purple-500/20 text-purple-400 group-hover:border-purple-500/50' },
  { id: 'invoice-generator', nameAr: 'صانع الفواتير الفوري وبطاقة PDF', nameEn: 'Invoice Generator', descAr: 'أنشئ فواتير عملائك المهنية وتصدير فوري للملفات', descEn: 'Build and export custom invoice PDF files', icon: FileText, category: 'finance', colorClass: 'border-blue-500/20 text-blue-400 group-hover:border-blue-500/50' },

  // 2. Health & Family
  { id: 'bmi-calculator', nameAr: 'مؤشر كتلة الجسم BMI', nameEn: 'BMI & Weight Tracker', descAr: 'تحليل الوزن وحساب كتلة الجسم والوزن والدهون', descEn: 'Calculate body mass indices and ranges', icon: HeartPulse, category: 'health', colorClass: 'border-pink-500/20 text-pink-400 group-hover:border-pink-500/50' },
  { id: 'calorie-calculator', nameAr: 'حاسبة السعرات الحرارية المقررة', nameEn: 'Calorie & TDEE Planner', descAr: 'اعرف احتياجك لإنقاص الوزن أو زيادة كتلتك العضلية', descEn: 'Verify daily macronutrients for fitness goals', icon: Activity, category: 'health', colorClass: 'border-rose-500/20 text-rose-400 group-hover:border-rose-500/50' },
  { id: 'pregnancy-calculator', nameAr: 'حاسبة الحمل والولادة والأسابيع', nameEn: 'Pregnancy Progression', descAr: 'تتبع مراحل الجنين وموعد الولادة التقديري المتوقع', descEn: 'Calculate gestational weeks & due dates', icon: Smile, category: 'health', colorClass: 'border-purple-500/20 text-purple-400 group-hover:border-purple-500/50' },
  { id: 'water-calculator', nameAr: 'حاسبة كمية المياه وحاجيات الجفاف', nameEn: 'Water Intake Estimator', descAr: 'حساب عدد اللترات والأكواب المناسبة لوزنك يومياً', descEn: 'Determine hydration volumes tailored to workouts', icon: Activity, category: 'health', colorClass: 'border-sky-500/20 text-sky-400 group-hover:border-sky-500/50' },
  { id: 'workout-generator', nameAr: 'مولد التمارين والرياضة المنزلية', nameEn: 'At-Home Workout Generator', descAr: 'إعداد خطط نشطة للياقة والتدريب بدون مستلزمات', descEn: 'Get custom bodyweight fitness circuits', icon: Flame, category: 'health', colorClass: 'border-orange-500/20 text-orange-400 group-hover:border-orange-500/50' },
  { id: 'color-vision-test', nameAr: 'اختبار عمى الألوان وعيوب الإبصار', nameEn: 'Ishihara Color Vision Test', descAr: 'فحص النظر التفاعلي لتمييز درجات الألوان بأمان', descEn: 'Diagnostics of Dalonism using classical plates', icon: Eye, category: 'health', colorClass: 'border-emerald-500/20 text-emerald-400 group-hover:border-emerald-500/50' },

  // 3. Productivity & Text Utilities
  { id: 'word-counter', nameAr: 'حاسبة الكلمات والحروف والفقرات', nameEn: 'Word & Letter Counter', descAr: 'تحليل فوري لطول النصوص، عدد الكلمات وفترات القراءة', descEn: 'Detailed character stats and reading metrics', icon: FileText, category: 'productivity', colorClass: 'border-cyan-500/20 text-cyan-400 group-hover:border-cyan-500/50' },
  { id: 'online-notepad', nameAr: 'المفكرة المؤقتة التلقائية أونلاين', nameEn: 'Automated Scratchpad Notes', descAr: 'كتابة المقالات والفقرات وحفظها تلقائياً بالمتصفح', descEn: 'Write drafts safely with continuous autosave', icon: FileText, category: 'productivity', colorClass: 'border-blue-500/20 text-blue-400 group-hover:border-blue-500/50' },
  { id: 'pdf-compressor', nameAr: 'ضاغط حجم ملفات PDF الذكي', nameEn: 'PDF File Compressor', descAr: 'تقليص أحجام وثائق السفر والعمل مع الحفاظ على الجودة', descEn: 'Safely reduce high-res document page sizes', icon: FileText, category: 'productivity', colorClass: 'border-purple-500/20 text-purple-400 group-hover:border-purple-500/50' },
  { id: 'qr-suite', nameAr: 'أقوى صانع وقارئ رموز QR', nameEn: 'QR & Barcode Dynamic Suite', descAr: 'تخصيص ملصقات الاستجابة السريعة وقراءتها بالكاميرا', descEn: 'Generate fancy QR labels and scan codes', icon: QrCode, category: 'productivity', colorClass: 'border-cyan-500/20 text-cyan-400 group-hover:border-cyan-500/50' },
  { id: 'password-generator', nameAr: 'مولد كلمات المرور الآمنة لحساباتك', nameEn: 'Secure Passwords Creator', descAr: 'ابتكار كلمات مرور حصينة ومعقدة مع تشفير ملح الملح', descEn: 'Formulate randomized passwords & hash codes', icon: ShieldCheck, category: 'productivity', colorClass: 'border-indigo-505/20 text-indigo-400 group-hover:border-indigo-505/50' },

  // 4. Developers & Code
  { id: 'speed-test', nameAr: 'فحص سرعة الإنترنت والشبكة', nameEn: 'Bandwidth Internet Speed Test', descAr: 'قياس دقيق لسرعة الرفع والتحميل وزمن الاستجابة', descEn: 'Check realtime download & upload transfer rates', icon: Gauge, category: 'developers', colorClass: 'border-cyan-500/20 text-cyan-400 group-hover:border-cyan-500/50' },
  { id: 'ping-tester', nameAr: 'فاحص استقرارية وثبات الـ Ping', nameEn: 'Realtime Latency Diagnostics', descAr: 'معاينة تذبذب الشبكة والـ Jitter للألعاب ومكالمات الويب', descEn: 'Graph network latency patterns over interval tests', icon: Wifi, category: 'developers', colorClass: 'border-sky-500/20 text-sky-400 group-hover:border-sky-500/50' },
  { id: 'json-converter', nameAr: 'محلل ومحول ملفات JSON وبنية الشجر', nameEn: 'JSON To Dynamic XML & CSV Editor', descAr: 'صقل بيانات JSON، التحقق من التنسيق وتحويلها لـ CSV', descEn: 'Sanitize JSON maps and convert to sheet tables', icon: Code2, category: 'developers', colorClass: 'border-emerald-500/20 text-emerald-400 group-hover:border-emerald-500/50' },
  { id: 'image-color-picker', nameAr: 'مستخرج أكواد الألوان من صورك', nameEn: 'HEX/RGB Image Color Picker', descAr: 'تحديد بكسل الصورة واستخراج رمز اللون للبرمجة والتصميم', descEn: 'Examine files and target palette shades instantly', icon: Palette, category: 'developers', colorClass: 'border-purple-500/20 text-purple-400 group-hover:border-purple-500/50' },
  { id: 'color-contrast', nameAr: 'فاحص تباين الألوان الاحترافي', nameEn: 'Pro Color Contrast Checker', descAr: 'موازنة وتباين ألوان النصوص والتحقق من متطلبات الوصولية WCAG مسبقاً وبدائل ذكية', descEn: 'Audit text readability contrast ratio requirements against WCAG and download dynamic color fixes', icon: Palette, category: 'developers', colorClass: 'border-purple-500/20 text-purple-400 group-hover:border-purple-500/50' },
  { id: 'code-beautifier', nameAr: 'منسق ومجمّل الأكواد والبرمجيات', nameEn: 'Code Formatter & Beautifier', descAr: 'ترتيب تنسيق HTML, CSS, JS للحصول على بنية نظيفة', descEn: 'Tidy up or minify programming code structures', icon: Code2, category: 'developers', colorClass: 'border-blue-500/20 text-blue-400 group-hover:border-blue-500/50' },
  { id: 'webp-converter', nameAr: 'محول ومقلص مقاسات الصور WebP', nameEn: 'High-Speed WebP Converter', descAr: 'تحويل صور JPG/PNG إلى تنسيق WebP لزيادة سرعة السيو', descEn: 'Optimize page loads by compressing web assets', icon: ImageIcon, category: 'developers', colorClass: 'border-amber-500/20 text-amber-400 group-hover:border-amber-500/50' },

  // 5. Travel & Tourism
  { id: 'travel-wheel', nameAr: 'عجلة السفر وتحديد الوجهة العشوائية', nameEn: 'Vacation Destination Spin Wheel', descAr: 'اختر مدينة رحلتك القادمة ونشاطك القادم بطريقة مسلية', descEn: 'Let our interactive spin roulette pick your trip', icon: Layers, category: 'travel', colorClass: 'border-orange-500/20 text-orange-400 group-hover:border-orange-500/50' },
  { id: 'scratch-map', nameAr: 'خارطة الخدش التفاعلي للبلدان', nameEn: 'Visited Scratch World Map', descAr: 'لوّن وضع مسارات زياراتك على خارطة العالم والإحصاءات', descEn: 'Keep track of globetrotting metrics visually', icon: Globe, category: 'travel', colorClass: 'border-teal-500/20 text-teal-400 group-hover:border-teal-500/50' },
  { id: 'travel-dare', nameAr: 'مولد تحديات السفر والمغامرات المضحكة', nameEn: 'Extreme Holiday Dare Missions', descAr: 'احصل على أنشطة ومهمات غير تقليدية تكسر الملل في رحلتك', descEn: 'Enjoy odd activities to snap unforgettable photos', icon: Sparkles, category: 'travel', colorClass: 'border-pink-500/20 text-pink-400 group-hover:border-pink-500/50' },
  { id: 'trip-countdown', nameAr: 'العداد التنازلي وحقيبة السفر الذكية', nameEn: 'Trip Countdown & Packing Checklist', descAr: 'احسب الساعات المتبقية لسفرك مع حقيبة مقترحة للطقس', descEn: 'Secure packing lists tailored to trip seasons', icon: Clock, category: 'travel', colorClass: 'border-cyan-500/20 text-cyan-400 group-hover:border-cyan-500/50' },
  { id: 'travel-compatibility', nameAr: 'حاسبة توافق رفقاء السفر والطباع', nameEn: 'Companion Travel Compatibility Test', descAr: 'عاين اهتمامات رفقاء الرحلة لمنع النزاعات قبل السفر', descEn: 'Audit personal travel profiles with friends', icon: Sparkles, category: 'travel', colorClass: 'border-violet-500/20 text-violet-400 group-hover:border-violet-500/50' },
  { id: 'travel-slang', nameAr: 'قاموس العبارات والكلمات العامية للبلدان', nameEn: 'Localized Slang Travel Phrasebook', descAr: 'تعرف على الكلمات المحلية والتحيات للسكان الأصليين بسهولة', descEn: 'Browse colloquial structures for top tourist zones', icon: FileText, category: 'travel', colorClass: 'border-purple-500/20 text-purple-400 group-hover:border-purple-500/50' },

  // 6. Education & Fun science
  { id: 'gpa-calculator', nameAr: 'حاسبة المعدل التراكمي والفصلي', nameEn: 'College Semester GPA Planner', descAr: 'احسب نقاطك الأكاديمية ونسب المواد لوزنك المستقبلي', descEn: 'Convert and predict cumulative GPA indices', icon: GraduationCap, category: 'education', colorClass: 'border-cyan-500/20 text-cyan-400 group-hover:border-cyan-500/50' },
  { id: 'typing-speed-test', nameAr: 'اختبار قياس سرعة الكتابة الفوري', nameEn: 'Responsive Keyboard WPM Speed Test', descAr: 'تحد ذراعيك في الطباعة وحساب الكلمات الصحيحة بالدقيقة', descEn: 'Determine keystrokes analytics and text accuracy', icon: Laptop, category: 'education', colorClass: 'border-sky-500/20 text-sky-400 group-hover:border-sky-500/50' },
  { id: 'daily-study-schedule', nameAr: 'الجدول الدراسي المنظم وتثبيت المراجعة', nameEn: 'Daily Study Schedule Builder', descAr: 'رتب ساعات حصصك، واجباتك ومشاريعك في تقويم ديناميكي', descEn: 'Keep study timetables structured with streak counters', icon: Clock, category: 'education', colorClass: 'border-blue-500/20 text-blue-400 group-hover:border-blue-500/50' },
  { id: 'periodic-table', nameAr: 'الجدول الدوري للعناصر الكيميائية', nameEn: 'Interactive Periodic Table Elements', descAr: 'استكشاف الأوزان الذرية وتوزيعات الإلكترونات بتفاعل كامل', descEn: 'Check shell configurations and solid element groups', icon: FlaskConical, category: 'education', colorClass: 'border-indigo-505/20 text-indigo-400 group-hover:border-indigo-505/50' }
];

interface RelatedToolsProps {
  lang: 'ar' | 'en';
}

export default function RelatedTools({ lang }: RelatedToolsProps) {
  const location = useLocation();
  const isAr = lang === 'ar';

  const relatedTools = useMemo(() => {
    const path = location.pathname;
    // We are on a tool route e.g., '/tool/zakat-calculator' or '/tool/loan-calculator'
    if (!path.startsWith('/tool/')) return [];
    
    const currentId = path.replace('/tool/', '');
    
    // Find matched item in our registry to determine category
    const currentTool = ALL_TOOLS_DATABASE.find(t => t.id === currentId);
    const category = currentTool?.category || 'finance';

    // Get tools in the same category, excluding the current one
    let filtered = ALL_TOOLS_DATABASE.filter(t => t.id !== currentId && t.category === category);

    // If we have fewer than 4 related tools, fill up from other popular categories
    if (filtered.length < 4) {
      const extraTools = ALL_TOOLS_DATABASE.filter(
        t => t.id !== currentId && t.category !== category
      );
      // Shuffle slightly or deterministic slice
      filtered = [...filtered, ...extraTools].slice(0, 4);
    } else {
      filtered = filtered.slice(0, 4);
    }

    return filtered;
  }, [location.pathname]);

  if (relatedTools.length === 0) return null;

  return (
    <div className="w-full max-w-[1400px] mx-auto mt-12 mb-6 border-t border-[#141b44] pt-10 px-2 animate-in fade-in duration-500">
      {/* Advertising Sector Placement above Related Tools Section to maximize revenue */}
      <div className="w-full text-center text-xs text-slate-500 py-1 border border-white/5 bg-[#060821]/40 rounded-xl mb-8 flex flex-col items-center justify-center h-16 border-dashed">
        <span className="text-[10px] tracking-widest text-[#414b8a] uppercase font-bold mb-1">
          {isAr ? 'إعلان مخصص' : 'SPONSORED LINKS'}
        </span>
        <span className="text-[#5966b4] text-[11px] font-sans">
          {isAr ? 'عروض ذات صلة باهتمامك - تصفح المنتجات المالية والتكنولوجية المجانية' : 'Recommended offers related to your utility activity'}
        </span>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold text-[#f1f5f9] tracking-tight relative flex items-center gap-2">
            <Sparkles size={18} className="text-cyan-400 animate-pulse" />
            <span>{isAr ? 'أدوات مـوصى بها قد تفيدك' : 'Recommended Utilities For You'}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {isAr ? 'أدوات وحاسبات قمنا باختيارها بناء على نشاطك الحالي لتسريع وتيرة عملك.' : 'Hand-picked productivity additions relative to your active workspace.'}
          </p>
        </div>
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shrink-0 hidden sm:inline-block" />
      </div>

      {/* Grid of 4 beautifully designed links with custom boundaries */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {relatedTools.map((tool) => {
          const ToolIcon = tool.icon;
          return (
            <Link
              key={tool.id}
              to={`/tool/${tool.id}`}
              onClick={() => {
                // Smooth scroll up on click so they aren't stuck at the bottom of the page
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`group flex flex-col bg-[#080c26]/90 border ${tool.colorClass} rounded-2xl p-5 hover:bg-[#0d143d] transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="flex items-center gap-3.5 mb-3.5">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0 text-cyan-400 group-hover:bg-cyan-500/20 group-hover:scale-110 transition-all duration-300">
                  <ToolIcon size={20} />
                </div>
                <h3 className="text-sm font-bold text-slate-100 group-hover:text-cyan-300 leading-snug transition-colors">
                  {isAr ? tool.nameAr : tool.nameEn}
                </h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-sans line-clamp-2 mt-0.5">
                {isAr ? tool.descAr : tool.descEn}
              </p>
              
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-cyan-400/80 group-hover:text-cyan-300 mt-4 pt-3 border-t border-white/5 transition-colors">
                <span>{isAr ? 'ابدأ الاستخدام الآن' : 'Launch utility'}</span>
                <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 shrink-0" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
