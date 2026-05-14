import React from 'react';
import { 
  Calculator, GraduationCap, HeartPulse, Code2, 
  Share2, Home as HomeIcon, Gamepad2, FlaskConical, Plane, Bitcoin,
  PiggyBank, HeartHandshake, Gem, TrendingDown, BarChart3
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
    desc: 'معدلات تراكمية، وتحويل وحدات.', 
    color: 'from-amber-400 to-orange-500' 
  },
  { 
    id: 'health', 
    name: 'الصحة واللياقة', 
    icon: HeartPulse, 
    desc: 'حساب BMI، والسعرات الحرارية.', 
    color: 'from-rose-400 to-red-500' 
  },
  { 
    id: 'developers', 
    name: 'المطورين والـ SEO', 
    icon: Code2, 
    desc: 'أدوات النصوص، والأكواد، والسيو.', 
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
        <div className="flex flex-col sm:flex-row gap-4">
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
