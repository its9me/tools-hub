import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Code2, ArrowRight, ArrowLeft, Calculator, Bitcoin, HeartHandshake, Gem, TrendingDown, BarChart3, FileText, StickyNote, GraduationCap, Activity, BookOpen, Percent, CalendarDays, CalendarClock, HeartPulse, Flame, Baby, Droplet, Dumbbell, Eye, ArrowRightLeft, Key, LayoutTemplate, FileCode2, Palette, Wand2, RefreshCw, Braces, Youtube, Hash, Crop, Ruler, Fuel, Globe, Compass, Dices, Trophy, Hourglass, Lightbulb, Keyboard, Image as ImageIcon, Zap, Triangle, Cuboid, FlaskConical, Thermometer, Radio, Box, Plug, PieChart, Map, BrainCircuit, QrCode } from 'lucide-react';

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
  social: {
    titleAr: 'صناعة المحتوى',
    titleEn: 'Social & Content',
    tools: [
      { id: 'youtube-calculator', nameAr: 'حاسبة أرباح يوتيوب', nameEn: 'YouTube Calculator', descAr: 'تقدير أرباحك حسب المشاهدات', descEn: 'Estimate earnings by views', icon: Youtube },
      { id: 'hashtag-generator', nameAr: 'مولد الهاشتاجات', nameEn: 'Hashtag Generator', descAr: 'أقوى الهاشتاجات لإنستقرام وتيك توك', descEn: 'Best hashtags for Instagram & TikTok', icon: Hash },
      { id: 'image-resizer', nameAr: 'مقاسات الصور للسوشيال', nameEn: 'Social Image Resizer', descAr: 'قص وتعديل مقاسات الصور للمنصات', descEn: 'Resize images for social platforms', icon: Crop }
    ]
  },
  productivity: {
    titleAr: 'الإنتاجية والنصوص',
    titleEn: 'Productivity & Text',
    tools: [
      { id: 'qr-suite', nameAr: 'أداة QR الشاملة', nameEn: 'QR Suite', descAr: 'إنشاء وقراءة رموز QR بسرعة', descEn: 'Generate & scan QR codes instantly', icon: QrCode },
      { id: 'pdf-compressor', nameAr: 'ضاغط ومحسن PDF', nameEn: 'PDF Compressor', descAr: 'تقليل حجم ملفات PDF بأمان', descEn: 'Compress PDF size securely', icon: FileText },
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
      { id: 'daily-study-schedule', nameAr: 'مولد الجداول الدراسية', nameEn: 'Daily Study Schedule', descAr: 'منظم ومولد خطة دراسية يومية', descEn: 'Daily study schedule planner', icon: CalendarClock },
      { id: 'book-reading-time', nameAr: 'حاسبة وقت القراءة', nameEn: 'Book Reading Time', descAr: 'احسب الوقت لإنهاء كتاب', descEn: 'Test speed and calculate reading days', icon: BookOpen },
      { id: 'typing-speed-test', nameAr: 'اختبار سرعة الكتابة', nameEn: 'Typing Speed Test', descAr: 'احسب سرعتك في الكتابة (WPM)', descEn: 'Test your typing speed (WPM)', icon: Keyboard }
    ]
  },
  developers: {
    titleAr: 'المطورين والـ SEO',
    titleEn: 'Developers & SEO',
    tools: [
      { id: 'number-base-converter', nameAr: 'محول الأنظمة العددية', nameEn: 'Number Base Converter', descAr: 'محول للأرقام للنظام العشري والثنائي والسداسي عشر', descEn: 'Convert decimal, binary, hex, and octal', icon: Hash },
      { id: 'word-counter', nameAr: 'حاسبة الكلمات والحروف', nameEn: 'Word & Character Counter', descAr: 'عداد كلمات مع احصائيات متقدمة', descEn: 'Word counter with advanced stats', icon: Code2 },
      { id: 'json-converter', nameAr: 'محول JSON إلى CSV / XML', nameEn: 'JSON Converter', descAr: 'تحويل بيانات JSON بسهولة', descEn: 'Convert JSON data easily', icon: ArrowRightLeft },
      { id: 'password-generator', nameAr: 'مولد كلمات المرور', nameEn: 'Password Generator', descAr: 'توليد كلمات مرور قوية وعشوائية', descEn: 'Generate strong, random passwords', icon: Key },
      { id: 'meta-tags-previewer', nameAr: 'فاحص العنوان والوصف (Meta Tags)', nameEn: 'Meta Tags Previewer', descAr: 'معاينة ظهور موقعك في نتائج البحث ووسائل التواصل', descEn: 'Preview how your site looks on search and social media', icon: LayoutTemplate },
      { id: 'seo-files-generator', nameAr: 'مولد ملفات SEO', nameEn: 'SEO Files Generator', descAr: 'إنشاء ملفات Robots.txt و Sitemap', descEn: 'Generate Robots.txt and Sitemap', icon: FileCode2 },
      { id: 'image-color-picker', nameAr: 'مستخرج الألوان من الصور', nameEn: 'Image Color Picker', descAr: 'استخراج أكواد الألوان من أي صورة', descEn: 'Extract color codes from any image', icon: Palette },
      { id: 'code-beautifier', nameAr: 'منسق الأكواد', nameEn: 'Code Beautifier', descAr: 'تنسيق وتلوين CSS و JS بضغطة زر', descEn: 'Format & highlight CSS/JS instantly', icon: Wand2 },
      { id: 'webp-converter', nameAr: 'محول الصورة لـ WebP', nameEn: 'WebP Converter', descAr: 'تحويل الصور لصيغة WebP', descEn: 'Convert images to WebP', icon: RefreshCw },
      { id: 'base64-converter', nameAr: 'محول Base64', nameEn: 'Base64 Converter', descAr: 'تشفير وفك تشفير النصوص والصور', descEn: 'Encode/Decode Base64 strings and files', icon: Braces },
      { id: 'ascii-art', nameAr: 'محول الصور لرسومات نصية', nameEn: 'ASCII Art Generator', descAr: 'حول صورك لفن نصي', descEn: 'Convert images to ASCII text art', icon: ImageIcon },
      { id: 'chart-generator', nameAr: 'مولد المخططات البيانية', nameEn: 'Chart Generator', descAr: 'إنشاء رسوم بيانية وتحميلها', descEn: 'Generate and download charts', icon: PieChart }
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
  lifestyle: {
    titleAr: 'أدوات يومية وهندسية',
    titleEn: 'Daily & Home Tools',
    tools: [
      { id: 'room-calculator', nameAr: 'حاسبة مساحة الغرف', nameEn: 'Room Calculator', descAr: 'حساب مساحة وخامات الطلاء والأرضيات', descEn: 'Calculate room area, paint, and flooring', icon: Ruler },
      { id: 'fuel-calculator', nameAr: 'حاسبة وقود السيارات', nameEn: 'Fuel Economy Calculator', descAr: 'تكلفة واستهلاك الوقود', descEn: 'Car fuel consumption & cost', icon: Fuel },
      { id: 'baby-names', nameAr: 'مصفاة أسماء الأطفال', nameEn: 'Baby Names Filter', descAr: 'معاني الأسماء وأصولها', descEn: 'Find baby names & meanings', icon: Baby },
      { id: 'time-difference', nameAr: 'فرق الوقت بين المدن', nameEn: 'World Time Difference', descAr: 'حاسبة فرق التوقيت المباشر', descEn: 'Live time difference calculator', icon: Globe },
      { id: 'qibla-direction', nameAr: 'اتجاه القبلة', nameEn: 'Qibla Direction', descAr: 'بوصلة توجيه القبلة التفاعلية', descEn: 'Interactive compass to find Qibla', icon: Compass },
      { id: 'live-age-calc', nameAr: 'العمر الدقيق', nameEn: 'Live Age Calculator', descAr: 'حاسبة العمر الدقيق حتى الثواني', descEn: 'Calculate precise age down to seconds', icon: Hourglass }
    ]
  },
  entertainment: {
    titleAr: 'الهوايات والترفيه',
    titleEn: 'Hobbies & Entertainment',
    tools: [
      { id: 'lucky-numbers', nameAr: 'مولد أرقام الحظ', nameEn: 'Lucky Number Generator', descAr: 'توليد أرقام عشوائية لليانصيب', descEn: 'Generate random numbers', icon: Dices },
      { id: 'random-picker', nameAr: 'عجلة الحظ والقرعة', nameEn: 'Random Name Picker', descAr: 'تدوير العجلة لاختيار فائز عشوائي', descEn: 'Spin the wheel for a random winner', icon: Trophy },
      { id: 'daily-riddle', nameAr: 'لغز اليوم', nameEn: 'Daily Riddle', descAr: 'لغز جديد مخصص لكل يوم مع حله', descEn: 'New riddle every day with answer', icon: Lightbulb },
      { id: 'memory-game', nameAr: 'لعبة الذاكرة البصرية', nameEn: 'Visual Memory Game', descAr: 'أزرار ملونة تضيء بترتيب وعليك تكراره', descEn: 'Repeat the flashing colored buttons sequence', icon: BrainCircuit }
    ]
  },
  science: {
    titleAr: 'الهندسة والعلوم',
    titleEn: 'Science & Engineering',
    tools: [
      { id: 'ohms-law', nameAr: 'حاسبة قانون أوم', nameEn: "Ohm's Law Calculator", descAr: 'احسب الجهد، التيار، والمقاومة', descEn: 'Calculate V, I, R easily', icon: Zap },
      { id: 'triangle-calculator', nameAr: 'حاسبة المثلثات المتقدمة', nameEn: 'Advanced Triangle Calculator', descAr: 'حساب زوايا وأضلاع المثلث مع الرسم', descEn: 'Solve and draw triangles', icon: Triangle },
      { id: 'material-strength', nameAr: 'حاسبة مقاومة المواد', nameEn: 'Material Strength', descAr: 'حساب الإجهاد والانفعال للأعمدة', descEn: 'Calculate stress, strain, and deformation', icon: Cuboid },
      { id: 'periodic-table', nameAr: 'الجدول الدوري التفاعلي', nameEn: 'Interactive Periodic Table', descAr: 'تصفح عناصر الكيمياء بسهولة', descEn: 'Browse chemistry elements', icon: FlaskConical },
      { id: 'temperature-converter', nameAr: 'محول درجات الحرارة', nameEn: 'Temperature Converter', descAr: 'تحويل بين سيلزيوس، فهرنهايت والمزيد', descEn: 'Convert Celsius, Fahrenheit, Kelvin', icon: Thermometer },
      { id: 'wave-calculator', nameAr: 'حاسبة الأمواج والطيف', nameEn: 'Wave Calculator', descAr: 'حساب التردد، الطول الموجي، ونوع الطيف', descEn: 'Calculate frequency, wavelength & spectrum', icon: Radio },
      { id: 'geometry-calculator', nameAr: 'حاسبة المساحات والأحجام', nameEn: 'Geometry Calculator', descAr: 'حساب مساحات وأحجام الأشكال ثلاثية الأبعاد', descEn: 'Calculate 3D shapes volume and area', icon: Box },
      { id: 'power-led-calculator', nameAr: 'حاسبة الطاقة ودائرة LED', nameEn: 'Power & LED Calculator', descAr: 'حساب القدرة ومقاومة LED', descEn: 'Calculate power and LED resistor', icon: Plug }
    ]
  },
  travel: {
    titleAr: 'السياحة والسفر',
    titleEn: 'Travel & Tourism',
    tools: [
      { id: 'size-converter', nameAr: 'محول مقاسات الملابس والأحذية', nameEn: 'Clothing & Shoe Size Converter', descAr: 'تحويل مقاسات دولية فوراً', descEn: 'International size converter instantly', icon: ArrowRightLeft },
      { id: 'travel-wheel', nameAr: 'وين أسافر؟ (عجلة الحظ)', nameEn: 'Where to Travel? (Spinner)', descAr: 'حدد وجهتك السياحية القادمة ونصائح سريعة للمترددين', descEn: 'Decide your next destination and get quick tips', icon: Compass },
      { id: 'scratch-map', nameAr: 'تحدي الدول (الخريطة)', nameEn: 'Digital Scratch Map', descAr: 'حدد الدول التي زرتها وشارك النسبة المئوية لإنجازك', descEn: 'Track visited countries and share your achievement', icon: Map },
      { id: 'travel-dare', nameAr: 'تحديات السفر المجنونة', nameEn: 'Travel Dare Generator', descAr: 'تحديات عشوائية مضحكة للقيام بها أثناء سفرك', descEn: 'Random fun travel dares to do on your trip', icon: Dices },
      { id: 'travel-compatibility', nameAr: 'فاحص شركاء السفر', nameEn: 'Travel Compatibility Tester', descAr: 'شاهد نسبة التوافق للرحلة وتجنب الخلافات', descEn: 'Test travel compatibility and avoid conflicts', icon: HeartHandshake },
      { id: 'trip-countdown', nameAr: 'عداد رحلتي القادمة', nameEn: 'Next Trip Countdown', descAr: 'عداد تنازلي لرحلتك مع قائمة أمنيات (Bucket List)', descEn: 'Countdown to your trip with a bucket list', icon: CalendarClock },
      { id: 'travel-slang', nameAr: 'قاموس الـ Slang السياحي', nameEn: 'Street Travel Slang', descAr: 'تعرف على المصطلحات الدارجة في السفر والمطارات', descEn: 'Learn street travel slang and phrases', icon: BookOpen }
    ]
  }
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
