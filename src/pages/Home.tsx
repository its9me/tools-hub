import React from 'react';
import { 
  Calculator, GraduationCap, HeartPulse, Code2, 
  Share2, Home as HomeIcon, Gamepad2, FlaskConical, Plane, Bitcoin,
  PiggyBank, HeartHandshake, Gem, TrendingDown, BarChart3, FileText,
  StickyNote, Activity, BookOpen, Percent, CalendarDays, CalendarClock, Flame, Baby, Droplet, Dumbbell, Eye, ArrowRightLeft, Key, LayoutTemplate, FileCode2, Palette, Wand2, RefreshCw, Braces, Youtube, Hash, Crop, Ruler, Fuel
} from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  { 
    id: 'finance', 
    name: 'المال والأعمال', 
    icon: Calculator, 
    desc: 'حاسبات قروض، ضرائب، وعملات.', 
    color: 'from-blue-500 to-cyan-400' 
  },
  { 
    id: 'education', 
    name: 'التعليم والأكاديميا', 
    icon: GraduationCap, 
    desc: 'معدل تراكمي، مراجع (APA,MLA)، وحدات.', 
    color: 'from-amber-400 to-orange-500' 
  },
  { 
    id: 'health', 
    name: 'الصحة واللياقة', 
    icon: HeartPulse, 
    desc: 'كتلة الجسم والسعرات وموعد الولادة وكمية الماء وبرامج التمارين.', 
    color: 'from-rose-400 to-red-500' 
  },
  { 
    id: 'productivity', 
    name: 'الإنتاجية والنصوص', 
    icon: StickyNote, 
    desc: 'ملاحظات، عدد الكلمات، ومولد الفواتير.', 
    color: 'from-amber-400 to-orange-400' 
  },
  { 
    id: 'developers', 
    name: 'المطورين والـ SEO', 
    icon: Code2, 
    desc: 'نصوص وSEO وتنسيق الأكواد وBase64.', 
    color: 'from-emerald-400 to-green-500' 
  },
  { 
    id: 'social', 
    name: 'صناعة المحتوى', 
    icon: Share2, 
    desc: 'أرباح يوتيوب، وهاشتاجات.', 
    color: 'from-purple-500 to-fuchsia-400' 
  },
  { 
    id: 'lifestyle', 
    name: 'البيت واللايف ستايل', 
    icon: HomeIcon, 
    desc: 'تكاليف الطبخ، وترتيب المنزل.', 
    color: 'from-yellow-400 to-amber-500' 
  },
  { 
    id: 'entertainment', 
    name: 'الهوايات والترفيه', 
    icon: Gamepad2, 
    desc: 'ألعاب، قرعة، وغرائب.', 
    color: 'from-indigo-400 to-violet-500' 
  },
  { 
    id: 'science', 
    name: 'الهندسة والعلوم', 
    icon: FlaskConical, 
    desc: 'قوانين الفيزياء والرياضيات.', 
    color: 'from-teal-400 to-emerald-500' 
  },
  { 
    id: 'travel', 
    name: 'السياحة والسفر', 
    icon: Plane, 
    desc: 'ميزانية السفر وحاسبة المسافات.', 
    color: 'from-sky-400 to-blue-500' 
  }
];

export default function Home({ lang }: { lang: 'ar' | 'en' }) {
  const isAr = lang === 'ar';

  return (
    <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto">
      {/* Placeholder: Top AdSense */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm">
        <div className="text-[10px] uppercase tracking-widest mb-1">
          {isAr ? 'إعلان AdSense' : 'AdSense Ad'}
        </div>
        <p className="text-[10px]">AD_SPACE_728x90 (Top)</p>
      </div>

      {/* Hero Section */}
      <div className="text-center py-8">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
          {isAr ? 'أدواتي Pro' : 'MyTools Pro'}
        </h1>
        <p className="text-slate-300 max-w-2xl mx-auto text-lg">
          {isAr 
            ? 'مكتبتك الشاملة لأكثر من 900 أداة وتطبيق مصغر في كافة المجالات لتسهيل مهامك اليومية.' 
            : 'Your comprehensive library of over 900 tools and mini-apps across all fields to simplify your daily tasks.'}
        </p>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link 
              key={cat.id} 
              to={`/category/${cat.id}`}
              className="group relative flex flex-col items-center text-center p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300"
            >
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${cat.color} bg-opacity-20 shadow-lg shadow-black/20`}>
                <Icon className="text-white drop-shadow-md" size={32} />
              </div>
              <h2 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-emerald-400 transition-colors">
                {cat.name}
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                {cat.desc}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Recommended/Latest Tools (Demo) */}
      <div className="mt-6 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
        <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">
          {isAr ? 'أدوات شائعة مؤخراً' : 'Recently Popular Tools'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link 
            to="/tool/loan-calculator"
            className="flex-1 p-4 bg-slate-900/50 hover:bg-slate-800 border border-white/5 rounded-xl transition-colors flex items-center gap-4"
          >
            <div className="p-3 bg-blue-500/20 text-blue-400 rounded-lg">
              <Calculator size={24} />
            </div>
            <div className={`flex-1 ${isAr ? 'text-right' : 'text-left'}`}>
              <h4 className="text-sm font-bold text-slate-200">{isAr ? 'حاسبة القروض الشخصية' : 'Personal Loan Calculator'}</h4>
              <p className="text-xs text-slate-400 mt-1">{isAr ? 'إحسب القسط الشهري والفائدة لقرضك' : 'Calculate EMI & interest for your loan'}</p>
            </div>
          </Link>
          <Link 
            to="/tool/tax-calculator"
            className="flex-1 p-4 bg-slate-900/50 hover:bg-slate-800 border border-white/5 rounded-xl transition-colors flex items-center gap-4"
          >
            <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-lg">
              <Calculator size={24} />
            </div>
            <div className={`flex-1 ${isAr ? 'text-right' : 'text-left'}`}>
              <h4 className="text-sm font-bold text-slate-200">{isAr ? 'حاسبة ضريبة الدخل' : 'Income Tax Calculator'}</h4>
              <p className="text-xs text-slate-400 mt-1">{isAr ? 'احسب الضريبة المستحقة على راتبك' : 'Calculate tax for your salary'}</p>
            </div>
          </Link>
          <Link 
            to="/tool/crypto-converter"
            className="flex-1 p-4 bg-slate-900/50 hover:bg-slate-800 border border-white/5 rounded-xl transition-colors flex items-center gap-4"
          >
            <div className="p-3 bg-amber-500/20 text-amber-400 rounded-lg">
              <Bitcoin size={24} />
            </div>
            <div className={`flex-1 ${isAr ? 'text-right' : 'text-left'}`}>
              <h4 className="text-sm font-bold text-slate-200">{isAr ? 'محول العملات الرقمية' : 'Crypto Converter'}</h4>
              <p className="text-xs text-slate-400 mt-1">{isAr ? 'أسعار لحظية للعملات الرقمية' : 'Real-time cryptocurrency prices'}</p>
            </div>
          </Link>
          <Link 
            to="/tool/compound-interest"
            className="flex-1 p-4 bg-slate-900/50 hover:bg-slate-800 border border-white/5 rounded-xl transition-colors flex items-center gap-4"
          >
            <div className="p-3 bg-teal-500/20 text-teal-400 rounded-lg">
              <PiggyBank size={24} />
            </div>
            <div className={`flex-1 ${isAr ? 'text-right' : 'text-left'}`}>
              <h4 className="text-sm font-bold text-slate-200">{isAr ? 'حاسبة الفائدة المركبة' : 'Compound Interest'}</h4>
              <p className="text-xs text-slate-400 mt-1">{isAr ? 'حساب نمو المدخرات واستثماراتك' : 'Calculate your savings growth'}</p>
            </div>
          </Link>
          <Link 
            to="/tool/zakat-calculator"
            className="flex-1 p-4 bg-slate-900/50 hover:bg-slate-800 border border-white/5 rounded-xl transition-colors flex items-center gap-4"
          >
            <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-lg">
              <HeartHandshake size={24} />
            </div>
            <div className={`flex-1 ${isAr ? 'text-right' : 'text-left'}`}>
              <h4 className="text-sm font-bold text-slate-200">{isAr ? 'حاسبة الزكاة' : 'Zakat Calculator'}</h4>
              <p className="text-xs text-slate-400 mt-1">{isAr ? 'حساب زكاة المال وعروض التجارة' : 'Calculate Zakat on your wealth'}</p>
            </div>
          </Link>
          <Link 
            to="/tool/gold-calculator"
            className="flex-1 p-4 bg-slate-900/50 hover:bg-slate-800 border border-white/5 rounded-xl transition-colors flex items-center gap-4"
          >
            <div className="p-3 bg-yellow-500/20 text-yellow-400 rounded-lg">
              <Gem size={24} />
            </div>
            <div className={`flex-1 ${isAr ? 'text-right' : 'text-left'}`}>
              <h4 className="text-sm font-bold text-slate-200">{isAr ? 'حاسبة أسعار الذهب المصنعية' : 'Gold Jewelry Calculator'}</h4>
              <p className="text-xs text-slate-400 mt-1">{isAr ? 'حساب السعر شامل المصنعية' : 'Calculate price with workmanship'}</p>
            </div>
          </Link>
          <Link 
            to="/tool/inflation-calculator"
            className="flex-1 p-4 bg-slate-900/50 hover:bg-slate-800 border border-white/5 rounded-xl transition-colors flex items-center gap-4"
          >
            <div className="p-3 bg-rose-500/20 text-rose-400 rounded-lg">
              <TrendingDown size={24} />
            </div>
            <div className={`flex-1 ${isAr ? 'text-right' : 'text-left'}`}>
              <h4 className="text-sm font-bold text-slate-200">{isAr ? 'حاسبة التضخم' : 'Inflation Calculator'}</h4>
              <p className="text-xs text-slate-400 mt-1">{isAr ? 'تأثير التضخم على القوة الشرائية' : 'Effect of inflation on purchasing power'}</p>
            </div>
          </Link>
          <Link 
            to="/tool/stock-profit"
            className="flex-1 p-4 bg-slate-900/50 hover:bg-slate-800 border border-white/5 rounded-xl transition-colors flex items-center gap-4"
          >
            <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-lg">
              <BarChart3 size={24} />
            </div>
            <div className={`flex-1 ${isAr ? 'text-right' : 'text-left'}`}>
              <h4 className="text-sm font-bold text-slate-200">{isAr ? 'حاسبة أرباح الأسهم' : 'Stock Profit'}</h4>
              <p className="text-xs text-slate-400 mt-1">{isAr ? 'حساب أرباح وخسائر الأسهم والعمولات' : 'Calculate stock profit and loss'}</p>
            </div>
          </Link>
          <Link 
            to="/tool/invoice-generator"
            className="flex-1 p-4 bg-slate-900/50 hover:bg-slate-800 border border-white/5 rounded-xl transition-colors flex items-center gap-4"
          >
            <div className="p-3 bg-blue-500/20 text-blue-400 rounded-lg">
              <FileText size={24} />
            </div>
            <div className={`flex-1 ${isAr ? 'text-right' : 'text-left'}`}>
              <h4 className="text-sm font-bold text-slate-200">{isAr ? 'صانع الفواتير للمستقلين' : 'Invoice Generator'}</h4>
              <p className="text-xs text-slate-400 mt-1">{isAr ? 'سوي فواتير احترافية وحملها PDF' : 'Create professional invoices (PDF)'}</p>
            </div>
          </Link>
          <Link 
            to="/tool/youtube-calculator"
            className="flex-1 p-4 bg-slate-900/50 hover:bg-slate-800 border border-white/5 rounded-xl transition-colors flex items-center gap-4"
          >
            <div className="p-3 bg-red-500/20 text-red-500 rounded-lg">
               <Youtube size={24} />
            </div>
            <div className={`flex-1 ${isAr ? 'text-right' : 'text-left'}`}>
              <h4 className="text-sm font-bold text-slate-200">{isAr ? 'حاسبة أرباح يوتيوب' : 'YouTube Calculator'}</h4>
              <p className="text-xs text-slate-400 mt-1">{isAr ? 'احسب أرباحك التقديرية من المشاهدات' : 'Estimate your earnings by views'}</p>
            </div>
          </Link>
          <Link 
            to="/tool/hashtag-generator"
            className="flex-1 p-4 bg-slate-900/50 hover:bg-slate-800 border border-white/5 rounded-xl transition-colors flex items-center gap-4"
          >
            <div className="p-3 bg-cyan-500/20 text-cyan-400 rounded-lg">
               <Hash size={24} />
            </div>
            <div className={`flex-1 ${isAr ? 'text-right' : 'text-left'}`}>
              <h4 className="text-sm font-bold text-slate-200">{isAr ? 'مولد الهاشتاجات' : 'Hashtag Generator'}</h4>
              <p className="text-xs text-slate-400 mt-1">{isAr ? 'أقوى الهاشتاجات لإنستقرام وتيك توك' : 'Best hashtags for social'}</p>
            </div>
          </Link>
          <Link 
            to="/tool/image-resizer"
            className="flex-1 p-4 bg-slate-900/50 hover:bg-slate-800 border border-white/5 rounded-xl transition-colors flex items-center gap-4"
          >
            <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-lg">
               <Crop size={24} />
            </div>
            <div className={`flex-1 ${isAr ? 'text-right' : 'text-left'}`}>
              <h4 className="text-sm font-bold text-slate-200">{isAr ? 'مقاسات الصور' : 'Social Resizer'}</h4>
              <p className="text-xs text-slate-400 mt-1">{isAr ? 'قص الصور لمنصات السوشيال' : 'Crop images for social media'}</p>
            </div>
          </Link>
          <Link 
            to="/tool/room-calculator"
            className="flex-1 p-4 bg-slate-900/50 hover:bg-slate-800 border border-white/5 rounded-xl transition-colors flex items-center gap-4"
          >
            <div className="p-3 bg-orange-500/20 text-orange-400 rounded-lg">
               <Ruler size={24} />
            </div>
            <div className={`flex-1 ${isAr ? 'text-right' : 'text-left'}`}>
              <h4 className="text-sm font-bold text-slate-200">{isAr ? 'مساحة الغرف' : 'Room Calculator'}</h4>
              <p className="text-xs text-slate-400 mt-1">{isAr ? 'حساب كميات الطلاء والأرضيات' : 'Calculate paint and flooring quantities'}</p>
            </div>
          </Link>
          <Link 
            to="/tool/fuel-calculator"
            className="flex-1 p-4 bg-slate-900/50 hover:bg-slate-800 border border-white/5 rounded-xl transition-colors flex items-center gap-4"
          >
            <div className="p-3 bg-rose-500/20 text-rose-400 rounded-lg">
               <Fuel size={24} />
            </div>
            <div className={`flex-1 ${isAr ? 'text-right' : 'text-left'}`}>
              <h4 className="text-sm font-bold text-slate-200">{isAr ? 'توفير وقود السيارات' : 'Fuel Economy'}</h4>
              <p className="text-xs text-slate-400 mt-1">{isAr ? 'حساب استهلاك وتكلفة الوقود' : 'Calculate fuel consumption & cost'}</p>
            </div>
          </Link>
          <Link 
            to="/tool/word-counter"
            className="flex-1 p-4 bg-slate-900/50 hover:bg-slate-800 border border-white/5 rounded-xl transition-colors flex items-center gap-4"
          >
            <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-lg">
              <Code2 size={24} />
            </div>
            <div className={`flex-1 ${isAr ? 'text-right' : 'text-left'}`}>
              <h4 className="text-sm font-bold text-slate-200">{isAr ? 'حاسبة الكلمات والحروف' : 'Word & Character Counter'}</h4>
              <p className="text-xs text-slate-400 mt-1">{isAr ? 'أداة مجانية لعد الكلمات وتنسيق المقالات' : 'Free tool to count words and format articles'}</p>
            </div>
          </Link>
          <Link 
            to="/tool/online-notepad"
            className="flex-1 p-4 bg-slate-900/50 hover:bg-slate-800 border border-white/5 rounded-xl transition-colors flex items-center gap-4"
          >
            <div className="p-3 bg-amber-500/20 text-amber-400 rounded-lg">
              <StickyNote size={24} />
            </div>
            <div className={`flex-1 ${isAr ? 'text-right' : 'text-left'}`}>
              <h4 className="text-sm font-bold text-slate-200">{isAr ? 'دفتر الملاحظات الذكي' : 'Smart Notepad'}</h4>
              <p className="text-xs text-slate-400 mt-1">{isAr ? 'اكتب واحفظ ملاحظاتك أونلاين' : 'Write and save your notes online'}</p>
            </div>
          </Link>
          <Link 
            to="/tool/gpa-calculator"
            className="flex-1 p-4 bg-slate-900/50 hover:bg-slate-800 border border-white/5 rounded-xl transition-colors flex items-center gap-4"
          >
            <div className="p-3 bg-teal-500/20 text-teal-400 rounded-lg">
              <GraduationCap size={24} />
            </div>
            <div className={`flex-1 ${isAr ? 'text-right' : 'text-left'}`}>
              <h4 className="text-sm font-bold text-slate-200">{isAr ? 'حاسبة المعدل (GPA)' : 'GPA Calculator'}</h4>
              <p className="text-xs text-slate-400 mt-1">{isAr ? 'للأنظمة الجامعية العالمية' : 'For global university systems'}</p>
            </div>
          </Link>
          <Link 
            to="/tool/physics-units"
            className="flex-1 p-4 bg-slate-900/50 hover:bg-slate-800 border border-white/5 rounded-xl transition-colors flex items-center gap-4"
          >
            <div className="p-3 bg-fuchsia-500/20 text-fuchsia-400 rounded-lg">
              <Activity size={24} />
            </div>
            <div className={`flex-1 ${isAr ? 'text-right' : 'text-left'}`}>
              <h4 className="text-sm font-bold text-slate-200">{isAr ? 'محول الوحدات الفيزيائية' : 'Physics Unit Converter'}</h4>
              <p className="text-xs text-slate-400 mt-1">{isAr ? 'سرعة، قوة، ضغط' : 'Speed, Force, Pressure'}</p>
            </div>
          </Link>
          <Link 
            to="/tool/citation-generator"
            className="flex-1 p-4 bg-slate-900/50 hover:bg-slate-800 border border-white/5 rounded-xl transition-colors flex items-center gap-4"
          >
            <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-lg">
              <BookOpen size={24} />
            </div>
            <div className={`flex-1 ${isAr ? 'text-right' : 'text-left'}`}>
              <h4 className="text-sm font-bold text-slate-200">{isAr ? 'مولد المراجع (APA, MLA)' : 'Citation Generator'}</h4>
              <p className="text-xs text-slate-400 mt-1">{isAr ? 'توليد المراجع للأبحاث بسهولة' : 'Generate citations easily'}</p>
            </div>
          </Link>
          <Link 
            to="/tool/grade-percentage"
            className="flex-1 p-4 bg-slate-900/50 hover:bg-slate-800 border border-white/5 rounded-xl transition-colors flex items-center gap-4"
          >
            <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-lg">
              <Percent size={24} />
            </div>
            <div className={`flex-1 ${isAr ? 'text-right' : 'text-left'}`}>
              <h4 className="text-sm font-bold text-slate-200">{isAr ? 'نسبة الدرجات' : 'Grade Percentage'}</h4>
              <p className="text-xs text-slate-400 mt-1">{isAr ? 'حساب النسبة والتقدير' : 'Calculate percentage & grade'}</p>
            </div>
          </Link>
          <Link 
            to="/tool/date-converter"
            className="flex-1 p-4 bg-slate-900/50 hover:bg-slate-800 border border-white/5 rounded-xl transition-colors flex items-center gap-4"
          >
            <div className="p-3 bg-teal-500/20 text-teal-400 rounded-lg">
              <CalendarDays size={24} />
            </div>
            <div className={`flex-1 ${isAr ? 'text-right' : 'text-left'}`}>
              <h4 className="text-sm font-bold text-slate-200">{isAr ? 'محول التاريخ' : 'Date Converter'}</h4>
              <p className="text-xs text-slate-400 mt-1">{isAr ? 'ميلادي إلى هجري وبالعكس' : 'Gregorian to Hijri and vice versa'}</p>
            </div>
          </Link>
          <Link 
            to="/tool/daily-study-schedule"
            className="flex-1 p-4 bg-slate-900/50 hover:bg-slate-800 border border-white/5 rounded-xl transition-colors flex items-center gap-4"
          >
            <div className="p-3 bg-rose-500/20 text-rose-400 rounded-lg">
              <CalendarClock size={24} />
            </div>
            <div className={`flex-1 ${isAr ? 'text-right' : 'text-left'}`}>
              <h4 className="text-sm font-bold text-slate-200">{isAr ? 'مولد جدول دراسي' : 'Study Schedule'}</h4>
              <p className="text-xs text-slate-400 mt-1">{isAr ? 'نظم أوقات المذاكرة والمهام' : 'Organize study times & tasks'}</p>
            </div>
          </Link>
          <Link 
            to="/tool/bmi-calculator"
            className="flex-1 p-4 bg-slate-900/50 hover:bg-slate-800 border border-white/5 rounded-xl transition-colors flex items-center gap-4"
          >
            <div className="p-3 bg-red-500/20 text-red-500 rounded-lg">
              <HeartPulse size={24} />
            </div>
            <div className={`flex-1 ${isAr ? 'text-right' : 'text-left'}`}>
              <h4 className="text-sm font-bold text-slate-200">{isAr ? 'حاسبة التقييم الصحي' : 'BMI Assessment'}</h4>
              <p className="text-xs text-slate-400 mt-1">{isAr ? 'احسب كتلة الجسم والوزن المثالي' : 'Calculate BMI and Ideal Weight'}</p>
            </div>
          </Link>
          <Link 
            to="/tool/calorie-calculator"
            className="flex-1 p-4 bg-slate-900/50 hover:bg-slate-800 border border-white/5 rounded-xl transition-colors flex items-center gap-4"
          >
            <div className="p-3 bg-orange-500/20 text-orange-400 rounded-lg">
              <Flame size={24} />
            </div>
            <div className={`flex-1 ${isAr ? 'text-right' : 'text-left'}`}>
              <h4 className="text-sm font-bold text-slate-200">{isAr ? 'السعرات لإنقاص الوزن' : 'Calorie Calculator'}</h4>
              <p className="text-xs text-slate-400 mt-1">{isAr ? 'احسب سعراتك المطلوبة يومياً' : 'Calculate your daily calories'}</p>
            </div>
          </Link>
          <Link 
            to="/tool/pregnancy-calculator"
            className="flex-1 p-4 bg-slate-900/50 hover:bg-slate-800 border border-white/5 rounded-xl transition-colors flex items-center gap-4"
          >
            <div className="p-3 bg-pink-500/20 text-pink-400 rounded-lg">
              <Baby size={24} />
            </div>
            <div className={`flex-1 ${isAr ? 'text-right' : 'text-left'}`}>
              <h4 className="text-sm font-bold text-slate-200">{isAr ? 'حاسبة موعد الولادة' : 'Pregnancy Calculator'}</h4>
              <p className="text-xs text-slate-400 mt-1">{isAr ? 'تتبع الحمل وموعد الولادة المتوقع' : 'Track pregnancy and due date'}</p>
            </div>
          </Link>
          <Link 
            to="/tool/water-calculator"
            className="flex-1 p-4 bg-slate-900/50 hover:bg-slate-800 border border-white/5 rounded-xl transition-colors flex items-center gap-4"
          >
            <div className="p-3 bg-cyan-500/20 text-cyan-400 rounded-lg">
              <Droplet size={24} />
            </div>
            <div className={`flex-1 ${isAr ? 'text-right' : 'text-left'}`}>
              <h4 className="text-sm font-bold text-slate-200">{isAr ? 'حاسبة كمية الماء' : 'Water Intake'}</h4>
              <p className="text-xs text-slate-400 mt-1">{isAr ? 'احسب احتياجك اليومي من الماء' : 'Calculate daily water needs'}</p>
            </div>
          </Link>
          <Link 
            to="/tool/workout-generator"
            className="flex-1 p-4 bg-slate-900/50 hover:bg-slate-800 border border-white/5 rounded-xl transition-colors flex items-center gap-4"
          >
            <div className="p-3 bg-violet-500/20 text-violet-400 rounded-lg">
              <Dumbbell size={24} />
            </div>
            <div className={`flex-1 ${isAr ? 'text-right' : 'text-left'}`}>
              <h4 className="text-sm font-bold text-slate-200">{isAr ? 'مولد التمارين' : 'Workout Generator'}</h4>
              <p className="text-xs text-slate-400 mt-1">{isAr ? 'احصل على برامج تمارين متجددة' : 'Get randomized workout plans'}</p>
            </div>
          </Link>
          <Link 
            to="/tool/color-vision-test"
            className="flex-1 p-4 bg-slate-900/50 hover:bg-slate-800 border border-white/5 rounded-xl transition-colors flex items-center gap-4"
          >
            <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-lg">
              <Eye size={24} />
            </div>
            <div className={`flex-1 ${isAr ? 'text-right' : 'text-left'}`}>
              <h4 className="text-sm font-bold text-slate-200">{isAr ? 'اختبار عمى الألوان' : 'Color Vision Test'}</h4>
              <p className="text-xs text-slate-400 mt-1">{isAr ? 'اختبر حدة بصرك لتدرجات الألوان' : 'Test your color shade acuity'}</p>
            </div>
          </Link>
          <Link 
            to="/tool/json-converter"
            className="flex-1 p-4 bg-slate-900/50 hover:bg-slate-800 border border-white/5 rounded-xl transition-colors flex items-center gap-4"
          >
            <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-lg">
              <ArrowRightLeft size={24} />
            </div>
            <div className={`flex-1 ${isAr ? 'text-right' : 'text-left'}`}>
              <h4 className="text-sm font-bold text-slate-200">{isAr ? 'محول JSON' : 'JSON Converter'}</h4>
              <p className="text-xs text-slate-400 mt-1">{isAr ? 'تحويل JSON إلى CSV و XML' : 'Convert JSON to CSV / XML'}</p>
            </div>
          </Link>
          <Link 
            to="/tool/password-generator"
            className="flex-1 p-4 bg-slate-900/50 hover:bg-slate-800 border border-white/5 rounded-xl transition-colors flex items-center gap-4"
          >
            <div className="p-3 bg-green-500/20 text-green-400 rounded-lg">
              <Key size={24} />
            </div>
            <div className={`flex-1 ${isAr ? 'text-right' : 'text-left'}`}>
              <h4 className="text-sm font-bold text-slate-200">{isAr ? 'مولد كلمات المرور' : 'Password Generator'}</h4>
              <p className="text-xs text-slate-400 mt-1">{isAr ? 'توليد كلمات مرور قوية وعشوائية' : 'Generate strong, secure passwords'}</p>
            </div>
          </Link>
          <Link 
            to="/tool/meta-tags-previewer"
            className="flex-1 p-4 bg-slate-900/50 hover:bg-slate-800 border border-white/5 rounded-xl transition-colors flex items-center gap-4"
          >
            <div className="p-3 bg-cyan-500/20 text-cyan-400 rounded-lg">
              <LayoutTemplate size={24} />
            </div>
            <div className={`flex-1 ${isAr ? 'text-right' : 'text-left'}`}>
              <h4 className="text-sm font-bold text-slate-200">{isAr ? 'فاحص Meta Tags' : 'Meta Tags Preview'}</h4>
              <p className="text-xs text-slate-400 mt-1">{isAr ? 'معاينة العنوان والوصف للمواقع' : 'Preview title and desc tags'}</p>
            </div>
          </Link>
          <Link 
            to="/tool/seo-files-generator"
            className="flex-1 p-4 bg-slate-900/50 hover:bg-slate-800 border border-white/5 rounded-xl transition-colors flex items-center gap-4"
          >
            <div className="p-3 bg-green-500/20 text-green-400 rounded-lg">
              <FileCode2 size={24} />
            </div>
            <div className={`flex-1 ${isAr ? 'text-right' : 'text-left'}`}>
              <h4 className="text-sm font-bold text-slate-200">{isAr ? 'مولد ملفات SEO' : 'SEO Files'}</h4>
              <p className="text-xs text-slate-400 mt-1">{isAr ? 'توليد Robots.txt و Sitemap' : 'Generate Robots.txt & Sitemap'}</p>
            </div>
          </Link>
          <Link 
            to="/tool/image-color-picker"
            className="flex-1 p-4 bg-slate-900/50 hover:bg-slate-800 border border-white/5 rounded-xl transition-colors flex items-center gap-4"
          >
            <div className="p-3 bg-pink-500/20 text-pink-400 rounded-lg">
              <Palette size={24} />
            </div>
            <div className={`flex-1 ${isAr ? 'text-right' : 'text-left'}`}>
              <h4 className="text-sm font-bold text-slate-200">{isAr ? 'مستخرج ألوان الصور' : 'Color Picker'}</h4>
              <p className="text-xs text-slate-400 mt-1">{isAr ? 'استخراج الألوان من أي صورة' : 'Extract colors from images'}</p>
            </div>
          </Link>
          <Link 
            to="/tool/code-beautifier"
            className="flex-1 p-4 bg-slate-900/50 hover:bg-slate-800 border border-white/5 rounded-xl transition-colors flex items-center gap-4"
          >
            <div className="p-3 bg-violet-500/20 text-violet-400 rounded-lg">
              <Wand2 size={24} />
            </div>
            <div className={`flex-1 ${isAr ? 'text-right' : 'text-left'}`}>
              <h4 className="text-sm font-bold text-slate-200">{isAr ? 'منسق الأكواد' : 'Code Beautifier'}</h4>
              <p className="text-xs text-slate-400 mt-1">{isAr ? 'تنسيق وتلوين CSS و JS بضغطة زر' : 'Format CSS & JS codes'}</p>
            </div>
          </Link>
          <Link 
            to="/tool/webp-converter"
            className="flex-1 p-4 bg-slate-900/50 hover:bg-slate-800 border border-white/5 rounded-xl transition-colors flex items-center gap-4"
          >
            <div className="p-3 bg-orange-500/20 text-orange-400 rounded-lg">
              <RefreshCw size={24} />
            </div>
            <div className={`flex-1 ${isAr ? 'text-right' : 'text-left'}`}>
              <h4 className="text-sm font-bold text-slate-200">{isAr ? 'محول لـ WebP' : 'WebP Converter'}</h4>
              <p className="text-xs text-slate-400 mt-1">{isAr ? 'ضغط الصور وتحويلها لـ WebP' : 'Convert images to WebP'}</p>
            </div>
          </Link>
          <Link 
            to="/tool/base64-converter"
            className="flex-1 p-4 bg-slate-900/50 hover:bg-slate-800 border border-white/5 rounded-xl transition-colors flex items-center gap-4"
          >
            <div className="p-3 bg-fuchsia-500/20 text-fuchsia-400 rounded-lg">
              <Braces size={24} />
            </div>
            <div className={`flex-1 ${isAr ? 'text-right' : 'text-left'}`}>
              <h4 className="text-sm font-bold text-slate-200">{isAr ? 'محول Base64' : 'Base64 Converter'}</h4>
              <p className="text-xs text-slate-400 mt-1">{isAr ? 'تشفير وفك تشفير النصوص والصور' : 'Encode & decode in Base64'}</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Placeholder: Middle AdSense */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm mt-2">
        <div className="text-[10px] uppercase tracking-widest mb-1">
          {isAr ? 'إعلان AdSense' : 'AdSense Ad'}
        </div>
        <p className="text-[10px]">AD_SPACE_728x90 (Middle)</p>
      </div>
    </div>
  );
}
