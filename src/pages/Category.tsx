import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Code2, ArrowRight, ArrowLeft, Calculator, Bitcoin, HeartHandshake, Gem, TrendingDown, BarChart3, FileText, StickyNote, GraduationCap, Activity, BookOpen, Percent, CalendarDays, CalendarClock, HeartPulse, Flame, Baby, Droplet, Dumbbell, Eye } from 'lucide-react';

const categoryData: Record<string, { titleAr: string, titleEn: string, tools: any[] }> = {
  finance: {
    titleAr: 'المال والأعمال',
    titleEn: 'Finance & Business',
    tools: [
      { id: 'loan-calculator', nameAr: 'حاسبة القروض الشخصية', nameEn: 'Personal Loan Calculator', descAr: 'حساب القسط الشهري والفوائد للقروض', descEn: 'Calculate monthly EMI and interest for loans', icon: Calculator },
      { id: 'tax-calculator', nameAr: 'حاسبة ضريبة الدخل', nameEn: 'Income Tax Calculator', descAr: 'حساب ضريبة الدخل التقديرية للرواتب الدخل الحر', descEn: 'Estimate income tax for salary or freelance', icon: Calculator },
      { id: 'crypto-converter', nameAr: 'محول العملات الرقمية', nameEn: 'Crypto Converter', descAr: 'أسعار لحظية للعملات الرقمية', descEn: 'Real-time crypto to fiat prices', icon: Bitcoin },
      { id: 'compound-interest', nameAr: 'حاسبة الفائدة المركبة', nameEn: 'Compound Interest', descAr: 'حساب نمو المدخرات واستثماراتك بمرور الوقت', descEn: 'Calculate savings growth over time', icon: Calculator },
      { id: 'zakat-calculator', nameAr: 'حاسبة الزكاة', nameEn: 'Zakat Calculator', descAr: 'حساب زكاة المال والذهب والفضة وعروض التجارة', descEn: 'Calculate Zakat on your wealth accurately', icon: HeartHandshake },
      { id: 'gold-calculator', nameAr: 'حاسبة أسعار الذهب المصنعية', nameEn: 'Gold Jewelry Calculator', descAr: 'حساب سعر الذهب والمصنعية والضرائب', descEn: 'Calculate gold price with workmanship and tax', icon: Gem },
      { id: 'inflation-calculator', nameAr: 'حاسبة التضخم', nameEn: 'Inflation Calculator', descAr: 'تأثير التضخم على القوة الشرائية', descEn: 'Effect of inflation on purchasing power', icon: TrendingDown },
      { id: 'stock-profit', nameAr: 'حاسبة أرباح الأسهم', nameEn: 'Stock Profit', descAr: 'حساب أرباح وخسائر الأسهم والعمولات', descEn: 'Calculate stock profit, loss and commissions', icon: BarChart3 },
      { id: 'invoice-generator', nameAr: 'صانع الفواتير', nameEn: 'Invoice Generator', descAr: 'إنشاء فواتير احترافية للمستقلين', descEn: 'Create professional invoices for freelancers', icon: FileText }
    ]
  },
  productivity: {
    titleAr: 'الإنتاجية والنصوص',
    titleEn: 'Productivity & Text',
    tools: [
      { id: 'online-notepad', nameAr: 'دفتر الملاحظات الذكي', nameEn: 'Smart Notepad', descAr: 'اكتب واحفظ ملاحظاتك أونلاين', descEn: 'Write and save notes online', icon: StickyNote },
      { id: 'word-counter', nameAr: 'حاسبة الكلمات والحروف', nameEn: 'Word & Character Counter', descAr: 'عداد كلمات مع احصائيات متقدمة', descEn: 'Word counter with advanced stats', icon: Code2 },
      { id: 'date-converter', nameAr: 'محول التاريخ (ميلادي/هجري)', nameEn: 'Date Converter', descAr: 'تحويل التاريخ بين الميلادي والهجري', descEn: 'Convert between Gregorian and Hijri', icon: CalendarDays }
    ]
  },
  education: {
    titleAr: 'التعليم والدراسة',
    titleEn: 'Education & Study',
    tools: [
      { id: 'gpa-calculator', nameAr: 'حاسبة المعدل التراكمي', nameEn: 'GPA Calculator', descAr: 'حساب المعدل الفصلي والتراكمي لعدة أنظمة', descEn: 'Calculate semester and cumulative GPA', icon: GraduationCap },
      { id: 'physics-units', nameAr: 'محول الوحدات الفيزيائية', nameEn: 'Physics Unit Converter', descAr: 'تحويل وحدات السرعة والقوة والضغط', descEn: 'Convert speed, force, and pressure units', icon: Activity },
      { id: 'citation-generator', nameAr: 'مولد المراجع (APA, MLA)', nameEn: 'Citation Generator', descAr: 'توليد مراجع الأبحاث والمقالات بسهولة', descEn: 'Generate citations for papers easily', icon: BookOpen },
      { id: 'grade-percentage', nameAr: 'حاسبة النسبة المئوية للدرجات', nameEn: 'Grade Percentage Calculator', descAr: 'حساب النسبة المئوية للدرجات الامتحانية', descEn: 'Calculate exam grade percentage', icon: Percent },
      { id: 'daily-study-schedule', nameAr: 'مولد الجداول الدراسية', nameEn: 'Daily Study Schedule', descAr: 'منظم ومولد خطة دراسية يومية', descEn: 'Daily study schedule planner', icon: CalendarClock }
    ]
  },
  developers: {
    titleAr: 'المطورين والـ SEO',
    titleEn: 'Developers & SEO',
    tools: [
      { id: 'word-counter', nameAr: 'حاسبة الكلمات والحروف', nameEn: 'Word & Character Counter', descAr: 'عداد كلمات مع احصائيات متقدمة', descEn: 'Word counter with advanced stats', icon: Code2 }
    ]
  },
  health: {
    titleAr: 'الصحة واللياقة',
    titleEn: 'Health & Fitness',
    tools: [
      { id: 'bmi-calculator', nameAr: 'حاسبة التقييم الصحي (BMI)', nameEn: 'BMI Health Assessment', descAr: 'احسب مؤشر كتلة الجسم والوزن المثالي والأيض', descEn: 'Calculate BMI, Ideal Weight, and BMR', icon: HeartPulse },
      { id: 'calorie-calculator', nameAr: 'حاسبة السعرات الحرارية', nameEn: 'Calorie Calculator', descAr: 'احسب السعرات لإنقاص الوزن أو الحفاظ عليه', descEn: 'Calculate calories for weight loss or maintenance', icon: Flame },
      { id: 'pregnancy-calculator', nameAr: 'حاسبة الحمل والولادة', nameEn: 'Pregnancy Calculator', descAr: 'تتبع الحمل وحساب موعد الولادة (EDD)', descEn: 'Track pregnancy and calculate due date', icon: Baby },
      { id: 'water-calculator', nameAr: 'حاسبة كمية الماء', nameEn: 'Water Intake Calculator', descAr: 'كمية الماء المثالية حسب وزن الجسم', descEn: 'Ideal water intake based on body weight', icon: Droplet },
      { id: 'workout-generator', nameAr: 'مولد التمارين المنزلية', nameEn: 'Workout Generator', descAr: 'برامج تمارين عشوائية ومخصصة للمنزل', descEn: 'Randomized home workout programs', icon: Dumbbell },
      { id: 'color-vision-test', nameAr: 'اختبار عمى الألوان', nameEn: 'Color Vision Test', descAr: 'اختبر حدة بصرك وتمييزك للألوان', descEn: 'Test your color vision and acuity', icon: Eye }
    ]
  },
  // We can populate others later
};

export default function Category({ lang }: { lang: 'ar' | 'en' }) {
  const { id } = useParams<{ id: string }>();
  const isAr = lang === 'ar';
  
  const category = id ? categoryData[id] : null;

  if (!category) {
    return (
      <div className="text-center py-20 text-slate-300">
        <h2 className="text-2xl font-bold mb-4">{isAr ? 'القسم غير موجود' : 'Category Not Found'}</h2>
        <Link to="/" className="text-emerald-400 hover:underline">{isAr ? 'العودة للرئيسية' : 'Return Home'}</Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-8">
      {/* Placeholder: Top AdSense */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm">
        <div className="text-[10px] uppercase tracking-widest mb-1">
          {isAr ? 'إعلان AdSense' : 'AdSense Ad'}
        </div>
        <p className="text-[10px]">AD_SPACE_728x90 (Top)</p>
      </div>

      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          {isAr ? category.titleAr : category.titleEn}
        </h1>
        <Link to="/" className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors">
          {isAr ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
          <span>{isAr ? 'عودة والأقسام' : 'Back to Categories'}</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {category.tools.length > 0 ? (
          category.tools.map(tool => {
            const Icon = tool.icon;
            return (
              <Link key={tool.id} to={`/tool/${tool.id}`} className="bg-white/5 border border-white/10 hover:bg-white/10 p-5 rounded-xl transition-colors flex flex-col gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Icon size={20} />
                </div>
                <h3 className="font-bold text-slate-100">{isAr ? tool.nameAr : tool.nameEn}</h3>
                <p className="text-xs text-slate-400">{isAr ? tool.descAr : tool.descEn}</p>
              </Link>
            )
          })
        ) : (
          <div className="col-span-full py-12 text-center text-slate-400 border border-dashed border-white/10 rounded-2xl">
            {isAr ? 'جاري إضافة الأدوات قريباً...' : 'Tools will be added soon...'}
          </div>
        )}
      </div>

      {/* Placeholder: Middle AdSense */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm mt-4">
        <div className="text-[10px] uppercase tracking-widest mb-1">
          {isAr ? 'إعلان AdSense' : 'AdSense Ad'}
        </div>
        <p className="text-[10px]">AD_SPACE_728x90 (Middle)</p>
      </div>
    </div>
  );
}
