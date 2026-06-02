import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Code2, ArrowRight, ArrowLeft, Calculator, Bitcoin, HeartHandshake, Gem, TrendingDown, BarChart3, FileText, StickyNote, GraduationCap, Activity, BookOpen, Percent, CalendarDays, CalendarClock, HeartPulse, Flame, Baby, Droplet, Dumbbell, Eye, ArrowRightLeft, Key, LayoutTemplate, FileCode2, Palette, Wand2, RefreshCw, Braces, Youtube, Hash, Crop, Ruler, Fuel, Globe, Compass, Dices, Trophy, Hourglass, Lightbulb, Keyboard, Image as ImageIcon, Zap, Triangle, Cuboid, FlaskConical, Thermometer, Radio, Box, Plug, PieChart, Map, BrainCircuit, QrCode, Wifi, Smile, Gauge } from 'lucide-react';

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
  photos: {
    titleAr: 'أدوات الصور',
    titleEn: 'Image & Photo Tools',
    tools: [
      { id: 'image-resizer', nameAr: 'مقاسات الصور للسوشيال', nameEn: 'Social Image Resizer', descAr: 'قص وتعديل مقاسات الصور للمنصات الرياضية والشبكات', descEn: 'Resize images for social platforms accurately', icon: Crop },
      { id: 'image-color-picker', nameAr: 'مستخرج الألوان من الصور', nameEn: 'Image Color Picker', descAr: 'استخراج أكواد الألوان من أي صورة', descEn: 'Extract color codes from any image', icon: Palette },
      { id: 'webp-converter', nameAr: 'محول الصورة لـ WebP', nameEn: 'WebP Converter', descAr: 'تحويل الصور لصيغة WebP لزيادة سرعة السيو', descEn: 'Convert images to WebP to speed up page load', icon: RefreshCw },
      { id: 'sticker-maker', nameAr: 'صانع ملصقات الواتساب وتليجرام', nameEn: 'WhatsApp & Telegram Sticker Maker', descAr: 'صمم ملصقات مخصصة ومضحكة، وأضف حدوداً بيضاء، واقتص الأشكال محلياً', descEn: 'Design custom stickers, apply white borders, crop shapes and download instantly', icon: Smile },
      { id: 'ascii-art', nameAr: 'محول الصور لرسومات نصية', nameEn: 'ASCII Art Generator', descAr: 'حول صورك لفن نصي', descEn: 'Convert images to ASCII text art', icon: ImageIcon },
      { id: 'base64-converter', nameAr: 'محول Base64', nameEn: 'Base64 Converter', descAr: 'تشفير وفك تشفير النصوص والصور', descEn: 'Encode/Decode Base64 strings and files', icon: Braces }
    ]
  },
  pdf: {
    titleAr: 'أدوات PDF والمستندات',
    titleEn: 'PDF & Document Tools',
    tools: [
      { id: 'pdf-compressor', nameAr: 'ضاغط ومحسن PDF', nameEn: 'PDF Compressor', descAr: 'تقليل حجم ملفات PDF بأمان ومعاينة الحجم قبل وبعد وتحميلها', descEn: 'Compress PDF size securely with file metrics', icon: FileText },
      { id: 'invoice-generator', nameAr: 'صانع الفواتير', nameEn: 'Invoice Generator', descAr: 'إنشاء فواتير احترافية للمستقلين والشركات وتحميلها PDF', descEn: 'Create and download professional invoices as PDF', icon: FileText },
      { id: 'online-notepad', nameAr: 'دفتر الملاحظات الذكي', nameEn: 'Smart Notepad', descAr: 'اكتب واحفظ ملاحظاتك أونلاين تلقائياً مع خيار النسخ والتنزيل', descEn: 'Write and save notes with automatic local backup', icon: StickyNote },
      { id: 'qr-suite', nameAr: 'أداة QR الشاملة', nameEn: 'QR Suite', descAr: 'إنشاء وقراءة رموز الاستجابة السريعة QR للمواقع أو الواي فاي والنصوص', descEn: 'Generate & scan functional QR codes instantly', icon: QrCode },
      { id: 'world-meeting-planner', nameAr: 'منسق ومخطط الاجتماعات والمناطق الزمنية العالمية', nameEn: 'Interactive World Meeting Planner', descAr: 'مخطط زمني ذكي للمناطق الزمنية، تنسيق واختيار المواعيد المشتركة لفرق العمل الحر والعمل عن بعد', descEn: 'Coordinate and plan multi-timezone meetings and working overlap ranges seamlessly', icon: Globe }
    ]
  },
  developers: {
    titleAr: 'أدوات المطورين والـ SEO',
    titleEn: 'Developers & SEO',
    tools: [
      { id: 'text-diff-suite', nameAr: 'مقارن وتدقيق فروق النصوص والسطور', nameEn: 'Pro Text Diff & Line Suite', descAr: 'مقارنة نصين بأسلوب side-by-side مذهل، وحذف الأسطر المكررة، وترتيب السطور أبجدياً ورقمياً', descEn: 'Compare texts to detect side-by-side diffs, eliminate duplicate lines and sort lists', icon: FileText },
      { id: 'json-converter', nameAr: 'محول JSON إلى CSV / XML', nameEn: 'JSON Converter', descAr: 'تحويل بيانات JSON وتنسيقها وعرضها محلياً للبرمجة والمشاريع', descEn: 'Convert and parse JSON data with structured view', icon: ArrowRightLeft },
      { id: 'password-generator', nameAr: 'مولد كلمات المرور', nameEn: 'Password Generator', descAr: 'توليد كلمات مرور قوية وعشوائية ومخصصة لحساباتك', descEn: 'Generate strong, secure, and random passwords', icon: Key },
      { id: 'meta-tags-previewer', nameAr: 'فاحص العنوان والوصف (Meta Tags)', nameEn: 'Meta Tags Previewer', descAr: 'معاينة ظهور موقعك في نتائج البحث ووسائل التواصل الاجتماعي', descEn: 'Preview how your site looks on search engines and social media platforms', icon: LayoutTemplate },
      { id: 'seo-files-generator', nameAr: 'مولد ملفات SEO', nameEn: 'SEO Files Generator', descAr: 'إنشاء ملفات Robots.txt و Sitemap بضغطة زر مفصلة', descEn: 'Create robust Robots.txt and Sitemap files easily', icon: FileCode2 },
      { id: 'number-base-converter', nameAr: 'محول الأنظمة العددية', nameEn: 'Number Base Converter', descAr: 'محول للأرقام للنظام العشري والثنائي والسداسي عشر', descEn: 'Convert decimal, binary, hex, and octal', icon: Hash },
      { id: 'code-beautifier', nameAr: 'منسق الأكواد', nameEn: 'Code Beautifier', descAr: 'تنسيق وتلوين CSS و JS بضغطة زر', descEn: 'Format & highlight CSS/JS instantly', icon: Wand2 },
      { id: 'base64-converter', nameAr: 'محول Base64', nameEn: 'Base64 Converter', descAr: 'تشفير وفك تشفير النصوص والصور', descEn: 'Encode/Decode Base64 strings and files', icon: Braces },
      { id: 'ohms-law', nameAr: 'حاسبة قانون أوم', nameEn: "Ohm's Law Calculator", descAr: 'احسب الجهد، التيار، والمقاومة', descEn: 'Calculate V, I, R easily', icon: Zap },
      { id: 'power-led-calculator', nameAr: 'حاسبة الطاقة ودائرة LED', nameEn: 'Power & LED Calculator', descAr: 'حساب القدرة ومقاومة LED لحماية المكونات', descEn: 'Calculate power and LED series resistor', icon: Plug }
    ]
  },
  calculators: {
    titleAr: 'الآلات الحاسبة المتنوعة',
    titleEn: 'Calculators Hub',
    tools: [
      { id: 'loan-calculator', nameAr: 'حاسبة القروض الشخصية', nameEn: 'Personal Loan Calculator', descAr: 'حساب القسط الشهري والفوائد للقروض', descEn: 'Calculate monthly EMI and interest for loans', icon: Calculator },
      { id: 'tax-calculator', nameAr: 'حاسبة ضريبة الدخل', nameEn: 'Income Tax Calculator', descAr: 'حساب ضريبة الدخل التقديرية للرواتب الدخل الحر', descEn: 'Estimate income tax for salary or freelance', icon: Calculator },
      { id: 'compound-interest', nameAr: 'حاسبة الفائدة المركبة', nameEn: 'Compound Interest', descAr: 'حساب نمو المدخرات واستثماراتك بمرور الوقت', descEn: 'Calculate savings growth over time', icon: Calculator },
      { id: 'zakat-calculator', nameAr: 'حاسبة الزكاة', nameEn: 'Zakat Calculator', descAr: 'حساب زكاة المال والذهب والفضة وعروض التجارة', descEn: 'Calculate Zakat on your wealth accurately', icon: HeartHandshake },
      { id: 'gpa-calculator', nameAr: 'حاسبة المعدل التراكمي', nameEn: 'GPA Calculator', descAr: 'حساب المعدل الفصلي والتراكمي لعدة أنظمة دراسية', descEn: 'Calculate semester and cumulative GPA', icon: GraduationCap },
      { id: 'grade-percentage', nameAr: 'حاسبة النسبة المئوية للدرجات', nameEn: 'Grade Percentage Calculator', descAr: 'حساب النسبة المئوية للدرجات الامتحانية والتحويل', descEn: 'Calculate exam grade percentage and letters', icon: Percent },
      { id: 'bmi-calculator', nameAr: 'حاسبة التقييم الصحي (BMI)', nameEn: 'BMI Health Assessment', descAr: 'احسب مؤشر كتلة الجسم والوزن المثالي والأيض للياقتك', descEn: 'Calculate BMI, Ideal Weight, and BMR parameters', icon: HeartPulse },
      { id: 'calorie-calculator', nameAr: 'حاسبة السعرات الحرارية', nameEn: 'Calorie Calculator', descAr: 'احسب السعرات لإنقاص الوزن أو الحفاظ عليه وتخطيط الغذاء', descEn: 'Calculate calories for weight loss or maintenance', icon: Flame },
      { id: 'water-calculator', nameAr: 'حاسبة كمية الماء', nameEn: 'Water Intake Calculator', descAr: 'كمية الماء المثالية حسب وزن الجسم والتمارين اليومية', descEn: 'Ideal water intake based on body weight', icon: Droplet },
      { id: 'triangle-calculator', nameAr: 'حاسبة المثلثات المتقدمة', nameEn: 'Advanced Triangle Calculator', descAr: 'حساب زوايا وأضلاع المثلث مع الرسم التفاعلي', descEn: 'Solve and draw triangles dynamically', icon: Triangle },
      { id: 'geometry-calculator', nameAr: 'حاسبة المساحات والأحجام', nameEn: 'Geometry Calculator', descAr: 'حساب مساحات وأحجام الأشكال ثلاثية الأبعاد والمقاطع هندسياً', descEn: 'Calculate 3D shapes volume and area', icon: Box },
      { id: 'room-calculator', nameAr: 'حاسبة مساحة الغرف والخامات', nameEn: 'Room Area & Paint Estimator', descAr: 'حساب مساحة وخامات الطلاء والأرضيات والصفائح', descEn: 'Calculate room area, paint, and flooring sheets', icon: Ruler },
      { id: 'fuel-calculator', nameAr: 'حاسبة وقود السيارات', nameEn: 'Fuel Economy Calculator', descAr: 'تكلفة واستهلاك الوقود للمسافات المختلفة', descEn: 'Car fuel consumption and cost metrics', icon: Fuel },
      { id: 'live-age-calc', nameAr: 'العمر الدقيق والوقت', nameEn: 'Live Precise Age Calculator', descAr: 'حاسبة العمر الدقيق بالسنوات والأشهر حتى الثواني والعداد التنازلي', descEn: 'Calculate precise age down to seconds in real time', icon: Hourglass }
    ]
  },
  writing: {
    titleAr: 'أدوات النصوص والكتابة',
    titleEn: 'Writing & Text Tools',
    tools: [
      { id: 'word-counter', nameAr: 'حاسبة الكلمات والحروف', nameEn: 'Word & Character Counter', descAr: 'عداد كلمات وحروف متطور مع المانشتات الإحصائية والفقرات وقراءة الوقت', descEn: 'Word counter with advanced reading and structural stats', icon: Code2 },
      { id: 'online-notepad', nameAr: 'دفتر الملاحظات الذكي', nameEn: 'Smart Notepad', descAr: 'اكتب واحفظ ملاحظاتك أونلاين تلقائياً مع خيار النسخ الفوري', descEn: 'Write and save notes with automatic local backup', icon: StickyNote },
      { id: 'citation-generator', nameAr: 'مولد المراجع (APA, MLA)', nameEn: 'Citation Generator', descAr: 'توليد مراجع الأبحاث والمقالات بسهولة لمختلف مصادر المعلومات', descEn: 'Generate academic citation references easily', icon: BookOpen },
      { id: 'typing-speed-test', nameAr: 'اختبار سرعة الكتابة', nameEn: 'Typing Speed Test', descAr: 'احسب سرعتك في الكتابة (WPM) ونسبة الأخطاء والدقة تفاعلياً', descEn: 'Test your typing speed (WPM) with instant metrics', icon: Keyboard },
      { id: 'book-reading-time', nameAr: 'حاسبة وقت القراءة والمطالعة', nameEn: 'Reading Time Calculator', descAr: 'احسب الوقت والأيام اللازمة لقرائة كتاب ومعاينة سرعة القراءة', descEn: 'Test reading speed and calculate reading days', icon: BookOpen }
    ]
  },
  health: {
    titleAr: 'الصحة واللياقة',
    titleEn: 'Health & Fitness',
    tools: [
      { id: 'bmi-calculator', nameAr: 'حاسبة التقييم الصحي (BMI)', nameEn: 'BMI Health Assessment', descAr: 'احسب مؤشر كتلة الجسم والوزن المثالي والأيض والمقاييس الجسدية', descEn: 'Calculate BMI, Ideal Weight, and BMR metrics', icon: HeartPulse },
      { id: 'calorie-calculator', nameAr: 'حاسبة السعرات الحرارية', nameEn: 'Calorie Calculator', descAr: 'احسب السعرات لإنقاص الوزن أو الحفاظ عليه وتخطيط الغذاء', descEn: 'Calculate calories for weight loss or maintenance', icon: Flame },
      { id: 'pregnancy-calculator', nameAr: 'حاسبة الحمل والولادة', nameEn: 'Pregnancy Calculator', descAr: 'تتبع الحمل وحساب موعد الولادة (EDD) وعمر الجنين بالأسابيع', descEn: 'Track pregnancy phases and calculate due date', icon: Baby },
      { id: 'water-calculator', nameAr: 'حاسبة كمية الماء', nameEn: 'Water Intake Calculator', descAr: 'كمية الماء المثالية حسب وزن الجسم النشاط البدني والمناخ', descEn: 'Ideal water intake based on body weight', icon: Droplet },
      { id: 'workout-generator', nameAr: 'مولد التمارين المنزلية', nameEn: 'Workout Generator', descAr: 'برامج تمارين عشوائية ومخصصة للمنزل بدون وزن أو بالأوزان', descEn: 'Randomized home workout routines generator', icon: Dumbbell },
      { id: 'color-vision-test', nameAr: 'اختبار عمى الألوان وعيوب الإبصار', nameEn: 'Ishihara Color Vision Test', descAr: 'اختبر حدة بصرك وتمييزك للألوان بواسطة لوحات إيشيهارا', descEn: 'Test color vision diagnostics & acuity', icon: Eye }
    ]
  },
  education: {
    titleAr: 'أدوات التعليم والدراسة',
    titleEn: 'Education Tools',
    tools: [
      { id: 'gpa-calculator', nameAr: 'حاسبة المعدل التراكمي', nameEn: 'GPA Calculator', descAr: 'حساب المعدل الفصلي والتراكمي لعدة أنظمة جامعية ومدرسية', descEn: 'Calculate semester and cumulative GPA indices', icon: GraduationCap },
      { id: 'physics-units', nameAr: 'محول الوحدات الفيزيائية والكيميائية', nameEn: 'Physical Unit Converter', descAr: 'تحويل وحدات السرعة، القوة، الضغط، الحجم، والوزن هندسياً', descEn: 'Convert physical units for academic programs', icon: Activity },
      { id: 'citation-generator', nameAr: 'مولد المراجع (APA, MLA)', nameEn: 'Citation Generator', descAr: 'توليد مراجع الأبحاث والمقالات للتأطير الأكاديمي', descEn: 'Generate citation references for papers correctly', icon: BookOpen },
      { id: 'grade-percentage', nameAr: 'حاسبة النسبة المئوية للدرجات', nameEn: 'Grade Percentage Calculator', descAr: 'حساب النسبة المئوية للدرجات وتخصيص مستويات التقديرات', descEn: 'Calculate exam grade percentage and scales', icon: Percent },
      { id: 'daily-study-schedule', nameAr: 'مولد الجداول الدراسية ومنظم الخطة', nameEn: 'Daily Study Calendar Planner', descAr: 'منظم ومولد خطة دراسية يومية لحصصك ومراجعاتك الدراسية', descEn: 'Draft study calendar templates on daily routines', icon: CalendarClock },
      { id: 'book-reading-time', nameAr: 'حاسبة وقت القراءة والمطالعة', nameEn: 'Reading Time Calculator', descAr: 'احسب الوقت والأيام اللازمة لقرائة كتاب ومعاينة سرعة القراءة', descEn: 'Test reading speed and calculate reading days', icon: BookOpen },
      { id: 'typing-speed-test', nameAr: 'اختبار سرعة الكتابة والطباعة', nameEn: 'Typing Speed Test', descAr: 'احسب سرعتك في الكتابة باللوحة (WPM) والدقة', descEn: 'Check typing statistics and speed (WPM)', icon: Keyboard },
      { id: 'periodic-table', nameAr: 'الجدول الدوري التفاعلي', nameEn: 'Interactive Periodic Table', descAr: 'تصفح عناصر الكيمياء بسهولة واستكشاف المجموعات والأوزان الذرية', descEn: 'Browse chemistry elements and atomic weights', icon: FlaskConical }
    ]
  },
  network: {
    titleAr: 'أدوات الشبكة والإنترنت',
    titleEn: 'Network & Speed Tools',
    tools: [
      { id: 'speed-test', nameAr: 'فحص سرعة الإنترنت الاحترافي', nameEn: 'Pro Internet Speed Test', descAr: 'قياس دقيق لسرعات الرفع والتحميل وزمن استجابة الشبكة (البينغ) في الزمن الحقيقي', descEn: 'High-precision real-time metrics for upload, download, and ping curves', icon: Gauge },
      { id: 'ping-tester', nameAr: 'فاحص الـ Ping واستقرار الاتصال', nameEn: 'Ping & Network Stability Tester', descAr: 'قياس سرعة التحميل والـ Ping والـ Jitter واستقرار الألعاب مباشرة برسم بياني', descEn: 'Measure Live Ping, Jitter, download speed, and stability for online gaming', icon: Wifi }
    ]
  },
  travel: {
    titleAr: 'السياحة والسفر',
    titleEn: 'Travel & Tourism',
    tools: [
      { id: 'size-converter', nameAr: 'محول مقاسات الملابس والأحذية', nameEn: 'Clothing & Shoe Size Converter', descAr: 'تحويل مقاسات دولية فوراً للملابس والأحذية بين البلدان', descEn: 'International size converter instantly for global travel products', icon: ArrowRightLeft },
      { id: 'travel-wheel', nameAr: 'وين أسافر؟ (عجلة الحظ التفاعلية)', nameEn: 'Where to Travel? (Spinner)', descAr: 'حدد وجهتك السياحية القادمة ونصائح سريعة للمترددين ببدائل عشوائية مفصلة', descEn: 'Decide your next destination and get quick tips', icon: Compass },
      { id: 'scratch-map', nameAr: 'تحدي الدول (خريطة الخدش الرقمية)', nameEn: 'Digital Scratch Map Challenge', descAr: 'حدد الدول التي زرتها وشارك النسبة المئوية لإنجازك مع أصدقائك بلمسات تفاعلية', descEn: 'Track visited countries and share your achievement percentage on map', icon: Map },
      { id: 'travel-dare', nameAr: 'تحديات السفر المغنونة', nameEn: 'Travel Dare Generator', descAr: 'تحديات عشوائية مضحكة ومثيرة للقيام بها أثناء سفرك وحفظ الذكريات', descEn: 'Random fun travel dares to do on your trip with checklist', icon: Dices },
      { id: 'travel-compatibility', nameAr: 'فاحص شركاء السفر والطباع', nameEn: 'Travel Compatibility Tester', descAr: 'شاهد نسبة التوافق للرحلة مع أصدقائك وتجنب الخلافات عبر فحص التفضيلات', descEn: 'Test travel compatibility and avoid conflicts through customized traits', icon: HeartHandshake },
      { id: 'trip-countdown', nameAr: 'عداد رحلتي القادمة وتخطيط الأغراض', nameEn: 'Next Trip Countdown', descAr: 'عداد تنازلي لرحلتك مع قائمة أمنيات (Bucket List) وأغراض السفر', descEn: 'Countdown to your trip with packing items bucket list', icon: CalendarClock },
      { id: 'travel-slang', nameAr: 'قاموس الـ Slang السياحي للبلدان', nameEn: 'Street Travel Slang Phrasebook', descAr: 'تعرف على المصطلحات الدارجة في السفر والمطارات والكلمات الأكثر استخداماً شعبياً', descEn: 'Learn street travel slang, airports abbreviations, and daily phrases', icon: BookOpen },
      { id: 'world-meeting-planner', nameAr: 'منسق ومخطط الاجتماعات والمناطق الزمنية العالمية', nameEn: 'Interactive World Meeting Planner', descAr: 'مخطط زمني ذكي للمناطق الزمنية، تنسيق واختيار المواعيد المشتركة لفرق العمل الحر والعمل عن بعد', descEn: 'Coordinate and plan multi-timezone meetings and working overlap ranges seamlessly', icon: Globe }
    ]
  },
  design: {
    titleAr: 'أدوات التصميم والألوان',
    titleEn: 'Design & Visual Palette',
    tools: [
      { id: 'image-color-picker', nameAr: 'مستخرج الألوان من الصور', nameEn: 'Image Color Picker', descAr: 'استخراج أكواد الألوان من أي صورة بنقرة واحدة HEX/RGB', descEn: 'Extract custom palette shades from image files instantly', icon: Palette },
      { id: 'color-contrast', nameAr: 'فاحص تباين الألوان الاحترافي', nameEn: 'Pro Color Contrast Checker', descAr: 'فحص موازنة تباين الألوان ومعايير WCAG ومعاينة حية وتوفير بدائل وحلول تباين ذكية', descEn: 'Check color contrast ratios against WCAG standard & suggest alternatives', icon: Palette },
      { id: 'color-vision-test', nameAr: 'اختبار عمى الألوان وعيوب الإبصار', nameEn: 'Ishihara Color Vision Test', descAr: 'اختبر حدة بصرك وتمييزك للألوان بواسطة لوحات إيشيهارا', descEn: 'Test color vision diagnostics & acuity', icon: Eye },
      { id: 'chart-generator', nameAr: 'مولد المخططات البيانية والرسوم', nameEn: 'Dynamic Chart Generator', descAr: 'إنشاء رسوم بيانية تفاعلية (دائري، خطي، أعمدة) وتحميلها كصور عالية الدقة', descEn: 'Generate and download charts in high resolution', icon: PieChart },
      { id: 'ascii-art', nameAr: 'محول الصور لرسومات نصية وحروف', nameEn: 'ASCII Art Generator', descAr: 'حول صورك لفن نصي بحروف مبعثرة وجميلة بلمح البصر', descEn: 'Convert images to ASCII text art with customizable density', icon: ImageIcon }
    ]
  },
  lifestyle: {
    titleAr: 'أدوات يومية وهندسية وبدائل الترفيه',
    titleEn: 'Daily Life, Hobbies & Home Tools',
    tools: [
      { id: 'room-calculator', nameAr: 'حاسبة مساحة الغرف والخامات', nameEn: 'Room Area & Paint Estimator', descAr: 'حساب مساحة وخامات الطلاء والأرضيات والصفائح', descEn: 'Calculate room area, paint, and flooring sheets', icon: Ruler },
      { id: 'fuel-calculator', nameAr: 'حاسبة وقود السيارات', nameEn: 'Fuel Economy Calculator', descAr: 'تكلفة واستهلاك الوقود للمسافات المختلفة', descEn: 'Car fuel consumption and cost metrics', icon: Fuel },
      { id: 'baby-names', nameAr: 'مصفاة أسماء الأطفال ومعانيها', nameEn: 'Baby Names Filter & Meanings', descAr: 'البحث عن معاني الأسماء وأصولها وتصفية حسب الحرف الأول والجنس', descEn: 'Find baby names, filter by gender, first letters, and learn meanings', icon: Baby },
      { id: 'time-difference', nameAr: 'فرق الوقت بين مدن ودول العالم', nameEn: 'World Time Difference Calculator', descAr: 'حاسبة فرق التوقيت المباشر وتتبع رحلات الطيران ومكالمات الويب العالمية', descEn: 'Live time difference calculator between international cities', icon: Globe },
      { id: 'qibla-direction', nameAr: 'بوصلة اتجاه القبلة وصوت الأذان', nameEn: 'Interactive Qibla Compass', descAr: 'بوصلة تفاعلية مباشرة تعين اتجاه مكة وتحديد سمت الكعبة', descEn: 'Interactive compass to locate Qibla direction dynamically', icon: Compass },
      { id: 'live-age-calc', nameAr: 'العمر الدقيق وتفاصيل الولادة', nameEn: 'Live Precise Age Calculator', descAr: 'حاسبة العمر الدقيق بالسنوات والأشهر حتى الثواني والعداد التنازلي للتأريخ القادم', descEn: 'Calculate precise age down to seconds in real time', icon: Hourglass },
      { id: 'lucky-numbers', nameAr: 'مولد أرقام الحظ المتنوعة', nameEn: 'Lucky Number Generator', descAr: 'توليد أرقام عشوائية مخصصة لليانصيب والقرعة والرياضة والقرار السريع', descEn: 'Generate random numbers with tailored ranges', icon: Dices },
      { id: 'random-picker', nameAr: 'عجلة الحظ والقرعة العشوائية', nameEn: 'Interactive Random Name Picker', descAr: 'تدوير العجلة لاختيار فائز عشوائي وتوثيق السحب والقرعات السريعة', descEn: 'Spin the wheel for a random winner with customizable boards', icon: Trophy },
      { id: 'daily-riddle', nameAr: 'لغز اليوم التفاعلي والمبهر', nameEn: 'Daily Riddle Game', descAr: 'لغز جديد كلياً مخصص لكل يوم مع كشف الإجابة لتعزيز حدة التفكير', descEn: 'New interactive riddle every day with answer check', icon: Lightbulb },
      { id: 'memory-game', nameAr: 'لعبة الذاكرة البصرية التفاعلية وسايمون', nameEn: 'Visual Simon Memory Game', descAr: 'أزرار ملونة تضيء بترتيب متسلسل هندسي وعليك تكراره لرفع مهارات الانتباه', descEn: 'Repeat the flashing colored buttons sequence with incremental score tracker', icon: BrainCircuit },
      { id: 'gamers-reflex', nameAr: 'فاحص سرعة الاستجابة والنقر للاعبين', nameEn: 'Gamers Reflex & CPS Benchmarker', descAr: 'أداة لقياس واختبار سرعة ردة الفعل واستقرار معدل النقر والـ CPS مع مقارنات لاعبي الـ eSports والمحترفين', descEn: 'Test reaction speed & click precision tailored for eSports players alongside pro leaderboards', icon: Trophy }
    ]
  },
  social: {
    titleAr: 'صناعة المحتوى والسوشيال ميديا',
    titleEn: 'Social Media & Content Creation',
    tools: [
      { id: 'youtube-calculator', nameAr: 'حاسبة أرباح يوتيوب وتأطير المشاهدات', nameEn: 'YouTube Views Earnings Predictor', descAr: 'تقدير أرباح القناة المالية حسب أرقام المشاهدات ومستويات RPM الافتراضية', descEn: 'Estimate earnings by views, CPM, and structural parameters', icon: Youtube },
      { id: 'hashtag-generator', nameAr: 'مولد الهاشتاجات والكلمات المفتاحية', nameEn: 'Instagram & TikTok Hashtag Generator', descAr: 'توليد أقوى الهاشتاجات المتصدرة لإنستقرام والمنشورات لزيادة التفاعل', descEn: 'Extract and generate best trending hashtags for Instagram & TikTok', icon: Hash },
      { id: 'image-resizer', nameAr: 'مقاسات الصور السريعة للمنصات الاجتماعية', nameEn: 'Social Media Image Resizer', descAr: 'قص وتعديل مقاسات الصور لجميع منصات التواصل الاجتماعي ومقاييس الأبعاد الافتراضية', descEn: 'Resize, crop and adjust images for social networks profiles', icon: Crop }
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
