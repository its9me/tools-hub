import { 
  Calculator, GraduationCap, HeartPulse, Code2, 
  Plane, PiggyBank, HeartHandshake, Eye, QrCode,
  FileText, Activity, BookOpen, Clock, 
  Smile, ShieldCheck, CheckCircle2, Trophy,
  Image as ImageIcon, Zap, Triangle, Cuboid, FlaskConical, Thermometer, Radio, Box, Plug, 
  PieChart, Wifi, Gauge, Sparkles, Layers,
  Globe, Palette, PenTool, Flame,
  Bitcoin, Gem, TrendingDown, BarChart3, StickyNote, Percent, CalendarClock,
  Baby, Droplet, Dumbbell, ArrowRightLeft, Key, LayoutTemplate, FileCode2, Wand2, RefreshCw,
  Braces, Hash, Crop, Ruler, Fuel, Compass, Dices, Hourglass, Keyboard, Map
} from 'lucide-react';

export interface ToolItem {
  id: string;
  nameAr: string;
  nameEn: string;
  descAr: string;
  descEn: string;
  icon: any;
  cat: string;
}

export const ALL_TOOLS_REGISTRY: ToolItem[] = [
  // Finance & Business
  { id: 'loan-calculator', nameAr: 'حاسبة القروض الشخصية', nameEn: 'Personal Loan Calculator', descAr: 'حساب القسط الشهري والفوائد للقروض بالتفصيل', descEn: 'Calculate monthly EMI and interest for loans in detail', icon: Calculator, cat: 'finance' },
  { id: 'tax-calculator', nameAr: 'حاسبة ضريبة الدخل', nameEn: 'Income Tax Calculator', descAr: 'حساب ضريبة الدخل التقديرية للرواتب والدخل الحر', descEn: 'Estimate income tax for salary or freelance income', icon: Calculator, cat: 'finance' },
  { id: 'crypto-converter', nameAr: 'محول العملات الرقمية', nameEn: 'Crypto Converter', descAr: 'أسعار لحظية للعملات الرقمية مقابل العملات العالمية', descEn: 'Real-time crypto to fiat currency conversion prices', icon: Bitcoin, cat: 'finance' },
  { id: 'compound-interest', nameAr: 'حاسبة الفائدة المركبة', nameEn: 'Compound Interest Calculator', descAr: 'نمو المدخرات والاستثمار العكسي بمرور الوقت', descEn: 'Savings growth & compound investment over time', icon: Calculator, cat: 'finance' },
  { id: 'zakat-calculator', nameAr: 'حاسبة الزكاة الدقيقة', nameEn: 'Zakat Calculator', descAr: 'حساب زكاة المال والذهب والفضة وعروض التجارة', descEn: 'Calculate Zakat on your wealth, gold, and silver accurately', icon: HeartHandshake, cat: 'finance' },
  { id: 'gold-calculator', nameAr: 'حاسبة أسعار الذهب والمصنعية', nameEn: 'Gold Jewelry Calculator', descAr: 'حساب سعر الذهب والمصنعية والضرائب والخصومات', descEn: 'Calculate gold price with workmanship, tax, and purity', icon: Gem, cat: 'finance' },
  { id: 'inflation-calculator', nameAr: 'حاسبة التضخم المالي', nameEn: 'Inflation Calculator', descAr: 'تأثير التضخم على القوة الشرائية للمال عبر السنوات', descEn: 'Effect of inflation on purchasing power of money over time', icon: TrendingDown, cat: 'finance' },
  { id: 'stock-profit', nameAr: 'حاسبة أرباح وخسائر الأسهم', nameEn: 'Stock Profit Calculator', descAr: 'حساب أرباح وخسائر الأسهم والصفقات والتداول والعمولات', descEn: 'Calculate stock profit, loss, trades and broker commissions', icon: BarChart3, cat: 'finance' },
  { id: 'invoice-generator', nameAr: 'صانع الفواتير الاحترافي', nameEn: 'Invoice Generator', descAr: 'إنشاء فواتير احترافية للعملاء والمستقلين والشركات', descEn: 'Create professional invoices for clients, freelancers and businesses', icon: FileText, cat: 'finance' },

  // Image & Photos
  { id: 'image-resizer', nameAr: 'مقاسات الصور السريعة للسوشيال ميديا', nameEn: 'Social Image Resizer', descAr: 'قص وتعديل مقاسات الصور للمنصات المختلفة بدقة', descEn: 'Resize and crop images for social platforms accurately', icon: Crop, cat: 'photos' },
  { id: 'image-color-picker', nameAr: 'مستخرج الألوان من الصور', nameEn: 'Image Color Picker', descAr: 'استخراج أكواد الألوان HEX و RGB من أي صورة بنقرة واحدة', descEn: 'Extract custom palette shades and hex color codes from images', icon: Palette, cat: 'photos' },
  { id: 'webp-converter', nameAr: 'محول الصور إلى صيغة WebP', nameEn: 'WebP Image Converter', descAr: 'تحويل الصور لصيغة WebP لزيادة سرعة الموقع وتحسين السيو', descEn: 'Convert images to WebP to speed up page load and boost SEO', icon: RefreshCw, cat: 'photos' },
  { id: 'sticker-maker', nameAr: 'صانع ملصقات واتساب وتليجرام', nameEn: 'WhatsApp & Telegram Sticker Maker', descAr: 'تصميم ملصقات مخصصة ومضحكة محلياً مع حدود وأشكال دائرية', descEn: 'Design custom stickers, apply borders, crop shapes and download instantly', icon: Smile, cat: 'photos' },
  { id: 'ascii-art', nameAr: 'محول الصور لرسومات نصية ASCII', nameEn: 'ASCII Art Generator', descAr: 'تحويل صورك المفضلة إلى لوحات فنية نصية بحروف ورموز', descEn: 'Convert images to ASCII text art with customizable density', icon: ImageIcon, cat: 'photos' },
  { id: 'base64-converter', nameAr: 'محول التشفير Base64', nameEn: 'Base64 Encoder/Decoder', descAr: 'تشفير وفك تشفير النصوص والصور والملفات لصيغة Base64', descEn: 'Encode/Decode Base64 strings, texts, and images offline', icon: Braces, cat: 'photos' },

  // PDF & Documents
  { id: 'pdf-compressor', nameAr: 'ضاغط ومحسن ملفات PDF', nameEn: 'PDF Compressor', descAr: 'تقليل حجم ملفات PDF بأمان ومعاينة الحجم قبل وبعد وتحميلها', descEn: 'Compress PDF size securely with file metrics and instant download', icon: FileText, cat: 'pdf' },
  { id: 'online-notepad', nameAr: 'دفتر الملاحظات الذكي التلقائي', nameEn: 'Smart Offline Notepad', descAr: 'اكتب ملاحظاتك مع حفظ تلقائي محلي وخيار التنزيل والنسخ', descEn: 'Write and save notes with automatic local backup and download', icon: StickyNote, cat: 'pdf' },
  { id: 'qr-suite', nameAr: 'أداة QR الشاملة للرموز', nameEn: 'QR Suite Generator & Scanner', descAr: 'إنشاء وقراءة رموز الاستجابة السريعة للمواقع، النصوص، والواي فاي', descEn: 'Generate & scan functional QR codes for URLs, WiFi, and texts', icon: QrCode, cat: 'pdf' },
  { id: 'world-meeting-planner', nameAr: 'منسق ومخطط الاجتماعات العالمية', nameEn: 'World Meeting Planner', descAr: 'مخطط زمني ذكي للمناطق الزمنية لتنسيق اجتماعات فرق العمل عن بعد', descEn: 'Coordinate and plan multi-timezone meetings and working overlap ranges', icon: Globe, cat: 'pdf' },

  // Developers & SEO
  { id: 'text-diff-suite', nameAr: 'مقارن وتدقيق فروق النصوص والسطور', nameEn: 'Pro Text Diff & Line Suite', descAr: 'مقارنة نصين بأسلوب side-by-side، حذف الأسطر المكررة، وترتيبها أبجدياً', descEn: 'Compare texts to detect side-by-side diffs, eliminate duplicate lines and sort lists', icon: FileText, cat: 'developers' },
  { id: 'xml-viewer', nameAr: 'مستعرض ومحلل ملفات XML و Excel', nameEn: 'XML File Viewer & Parser', descAr: 'عرض وفحص وتنسيق ملفات XML و Excel التفاعلية وتحويلها لـ JSON محلياً', descEn: 'Parse, inspect, format, validate, and convert XML or Excel to JSON offline', icon: Code2, cat: 'developers' },
  { id: 'json-converter', nameAr: 'محلل ومحول بيانات JSON', nameEn: 'JSON Converter Parser', descAr: 'تحويل بيانات JSON وتنسيقها وعرضها محلياً للبرمجة والمشاريع لـ CSV / XML', descEn: 'Convert, beautify, and parse JSON data with structured tree view', icon: ArrowRightLeft, cat: 'developers' },
  { id: 'password-generator', nameAr: 'مولد كلمات المرور الآمنة القوية', nameEn: 'Password Generator', descAr: 'توليد كلمات مرور قوية وعشوائية ومخصصة لحساباتك لمنع الاختراق', descEn: 'Generate strong, secure, and custom-length random passwords', icon: Key, cat: 'developers' },
  { id: 'meta-tags-previewer', nameAr: 'فاحص العنوان والوصف Meta Tags', nameEn: 'Meta Tags Previewer', descAr: 'معاينة ظهور موقعك في نتائج البحث جوجل ومنصات التواصل الاجتماعي', descEn: 'Preview how your site looks on Google search and social media cards', icon: LayoutTemplate, cat: 'developers' },
  { id: 'seo-files-generator', nameAr: 'مولد ملفات السيو Robots & Sitemap', nameEn: 'SEO Files Generator', descAr: 'إنشاء ملفات Robots.txt و Sitemap مخصصة ومفصلة بنقرة واحدة', descEn: 'Create robust Robots.txt and Sitemap files easily for search engines', icon: FileCode2, cat: 'developers' },
  { id: 'number-base-converter', nameAr: 'محول الأنظمة العددية البرمجية', nameEn: 'Number Base Converter', descAr: 'محول للأرقام بين النظام العشري، الثنائي، السداسي عشر، والثماني', descEn: 'Convert numbers between decimal, binary, hex, and octal systems', icon: Hash, cat: 'developers' },
  { id: 'code-beautifier', nameAr: 'منسق وملون الأكواد البرمجية', nameEn: 'Code Beautifier & Formatter', descAr: 'تنسيق وتجميل وتلوين أكواد CSS و JavaScript بضغطة زر فورية', descEn: 'Format & highlight CSS/JS instantly inside the browser', icon: Wand2, cat: 'developers' },
  { id: 'ohms-law', nameAr: 'حاسبة قانون أوم الكهربائي', nameEn: "Ohm's Law Calculator", descAr: 'احسب الجهد، التيار، المقاومة، والقدرة الكهربائية للمقاومات', descEn: 'Calculate voltage, current, resistance, and electrical power easily', icon: Zap, cat: 'developers' },
  { id: 'power-led-calculator', nameAr: 'حاسبة الطاقة ودائرة المقاومة لـ LED', nameEn: 'Power & LED Resistor Calculator', descAr: 'حساب القدرة ومقاومة LED لحماية المكونات الإلكترونية', descEn: 'Calculate power and LED series resistor for custom circuits', icon: Plug, cat: 'developers' },

  // Calculators Hub
  { id: 'gpa-calculator', nameAr: 'حاسبة المعدل التراكمي والفصلي', nameEn: 'GPA Calculator', descAr: 'حساب المعدل الفصلي والتراكمي لعدة أنظمة جامعية ومدرسية', descEn: 'Calculate semester and cumulative GPA indices for school or university', icon: GraduationCap, cat: 'calculators' },
  { id: 'grade-percentage', nameAr: 'حاسبة النسبة المئوية للدرجات', nameEn: 'Grade Percentage Calculator', descAr: 'حساب النسبة المئوية للدرجات الامتحانية والتحويل والتقديرات', descEn: 'Calculate exam grade percentage, weight, scale, and letter score', icon: Percent, cat: 'calculators' },
  { id: 'triangle-calculator', nameAr: 'حاسبة المثلثات المتقدمة والرسم', nameEn: 'Advanced Triangle Calculator', descAr: 'حساب زوايا وأضلاع ومساحة المثلث مع الرسم الهندسي التفاعلي', descEn: 'Solve, compute sides/angles, and draw triangles dynamically', icon: Triangle, cat: 'calculators' },
  { id: 'geometry-calculator', nameAr: 'حاسبة الأشكال الهندسية والمساحات', nameEn: 'Geometry Calculator 3D', descAr: 'حساب مساحات وأحجام الأشكال ثلاثية الأبعاد والمقاطع هندسياً', descEn: 'Calculate volumes and surface areas of 3D geometric shapes', icon: Box, cat: 'calculators' },
  { id: 'room-calculator', nameAr: 'حاسبة مساحة الغرف والخامات والطلاء', nameEn: 'Room Area & Paint Estimator', descAr: 'حساب مساحة وخامات الطلاء والأرضيات والصفائح والغرف', descEn: 'Calculate room area, paint volume, and flooring sheets needed', icon: Ruler, cat: 'calculators' },
  { id: 'fuel-calculator', nameAr: 'حاسبة وقود وتكلفة رحلات السيارات', nameEn: 'Fuel Economy Calculator', descAr: 'تكلفة واستهلاك وقود السيارات للمسافات المختلفة وكفاءة الاستهلاك', descEn: 'Car fuel consumption, trip costs, and economy metrics helper', icon: Fuel, cat: 'calculators' },
  { id: 'live-age-calc', nameAr: 'حاسبة العمر الدقيق بالثواني والوقت', nameEn: 'Live Precise Age Calculator', descAr: 'حاسبة العمر الدقيق بالسنوات والأشهر حتى الثواني مع عداد تنازلي', descEn: 'Calculate precise age down to seconds in real time with countdowns', icon: Hourglass, cat: 'calculators' },

  // Writing & Text
  { id: 'word-counter', nameAr: 'حاسبة الكلمات والحروف والفقرات', nameEn: 'Word & Character Counter', descAr: 'عداد كلمات وحروف متطور مع المانشتات الإحصائية وقراءة الوقت والتحليل', descEn: 'Word counter with advanced reading speeds and structural text stats', icon: Code2, cat: 'writing' },
  { id: 'citation-generator', nameAr: 'مولد المراجع العلمي الأكاديمي', nameEn: 'Academic Citation Generator', descAr: 'توليد مراجع الأبحاث والمقالات للتأطير الأكاديمي APA, MLA, Chicago', descEn: 'Generate bibliographies and citation references for papers correctly', icon: BookOpen, cat: 'writing' },
  { id: 'typing-speed-test', nameAr: 'اختبار سرعة الكتابة والطباعة التفاعلي', nameEn: 'Interactive Typing Speed Test', descAr: 'احسب سرعتك في الكتابة باللوحة (WPM) ونسبة الأخطاء والدقة تفاعلياً', descEn: 'Check typing statistics, speed (Words Per Minute), and accuracy', icon: Keyboard, cat: 'writing' },
  { id: 'book-reading-time', nameAr: 'حاسبة وقت القراءة والمطالعة للكتب', nameEn: 'Reading Time Calculator', descAr: 'احسب الوقت والأيام اللازمة لقرائة كتاب ومعاينة سرعة القراءة الشخصية', descEn: 'Test reading speed and calculate days or hours needed to finish a book', icon: BookOpen, cat: 'writing' },

  // Health & Fitness
  { id: 'bmi-calculator', nameAr: 'حاسبة مؤشر كتلة الجسم والوزن المثالي', nameEn: 'BMI Health Assessment', descAr: 'احسب مؤشر كتلة الجسم والوزن المثالي والأيض والمقاييس الجسدية للياقتك', descEn: 'Calculate BMI, Ideal Weight, body fat class, and BMR metrics', icon: HeartPulse, cat: 'health' },
  { id: 'calorie-calculator', nameAr: 'حاسبة السعرات الحرارية والاحتياج اليومي', nameEn: 'Calorie & TDEE Calculator', descAr: 'احسب السعرات لإنقاص الوزن أو الحفاظ عليه وتخطيط الغذاء والبروتينات', descEn: 'Calculate calories for weight loss, maintenance, or muscle gain', icon: Flame, cat: 'health' },
  { id: 'pregnancy-calculator', nameAr: 'حاسبة الحمل والولادة وأسابيع الجنين', nameEn: 'Pregnancy Due Date Tracker', descAr: 'تتبع الحمل وحساب موعد الولادة (EDD) وعمر الجنين بالأسابيع والتطور اليومي', descEn: 'Track pregnancy phases, milestones, and calculate estimated due date', icon: Baby, cat: 'health' },
  { id: 'water-calculator', nameAr: 'حاسبة كمية شرب الماء اليومية', nameEn: 'Water Intake Calculator', descAr: 'كمية الماء المثالية حسب وزن الجسم، وعوامل الجو، ومجهودك الرياضي', descEn: 'Ideal daily water intake based on body weight, weather, and workouts', icon: Droplet, cat: 'health' },
  { id: 'workout-generator', nameAr: 'مولد التمارين والبرامج الرياضية المنزلية', nameEn: 'Home Workout Generator', descAr: 'برامج تمارين عشوائية ومخصصة للمنزل بدون وزن أو بالأوزان للياقتك', descEn: 'Randomized home workout routines generator for all fitness levels', icon: Dumbbell, cat: 'health' },
  { id: 'color-vision-test', nameAr: 'اختبار عمى الألوان وعيوب الإبصار', nameEn: 'Ishihara Color Vision Test', descAr: 'اختبر حدة بصرك وتمييزك للألوان بواسطة لوحات إيشيهارا التفاعلية', descEn: 'Test color vision diagnostics, deficiency, and visual acuity', icon: Eye, cat: 'health' },

  // Network & Speed
  { id: 'speed-test', nameAr: 'فحص سرعة الإنترنت الاحترافي', nameEn: 'Pro Internet Speed Test', descAr: 'قياس دقيق لسرعات الرفع والتحميل وزمن استجابة الشبكة (البينغ) في الزمن الحقيقي', descEn: 'High-precision real-time metrics for upload, download, and ping curves', icon: Gauge, cat: 'network' },
  { id: 'ping-tester', nameAr: 'فاحص الـ Ping واستقرار الاتصال للألعاب', nameEn: 'Ping & Network Stability Tester', descAr: 'قياس سرعة التحميل والـ Ping والـ Jitter واستقرار الألعاب مباشرة برسم بياني', descEn: 'Measure Live Ping, Jitter, download speed, and stability for online gaming', icon: Wifi, cat: 'network' },

  // Travel & Tourism
  { id: 'size-converter', nameAr: 'محول مقاسات الملابس والأحذية العالمية', nameEn: 'Clothing & Shoe Size Converter', descAr: 'تحويل مقاسات دولية فوراً للملابس والأحذية بين البلدان لسهولة السفر والتسوق', descEn: 'International size converter instantly for global travel products', icon: ArrowRightLeft, cat: 'travel' },
  { id: 'travel-wheel', nameAr: 'وين أسافر؟ عجلة الحظ السياحية تفاعلية', nameEn: 'Where to Travel? (Spinner)', descAr: 'حدد وجهتك السياحية القادمة ونصائح سريعة للمترددين ببدائل عشوائية مفصلة', descEn: 'Decide your next destination and get quick travel suggestions and tips', icon: Compass, cat: 'travel' },
  { id: 'scratch-map', nameAr: 'خريطة الخدش الرقمية وتحدي الدول', nameEn: 'Digital Scratch Map Challenge', descAr: 'حدد الدول التي زرتها وشارك النسبة المئوية لإنجازك مع أصدقائك بلمسات تفاعلية', descEn: 'Track visited countries and share your achievement percentage on map', icon: Map, cat: 'travel' },
  { id: 'travel-dare', nameAr: 'مولد تحديات السفر والمغامرة', nameEn: 'Travel Dare Generator', descAr: 'تحديات عشوائية مضحكة ومثيرة للقيام بها أثناء سفرك وحفظ الذكريات اللطيفة', descEn: 'Random fun travel dares to do on your trip with checklist tasks', icon: Dices, cat: 'travel' },
  { id: 'travel-compatibility', nameAr: 'فاحص توافق شركاء السفر والطباع', nameEn: 'Travel Compatibility Tester', descAr: 'شاهد نسبة التوافق للرحلة مع أصدقائك وتجنب الخلافات عبر فحص التفضيلات', descEn: 'Test travel compatibility and avoid conflicts through customized traits', icon: HeartHandshake, cat: 'travel' },
  { id: 'trip-countdown', nameAr: 'عداد رحلتي وتخطيط قائمة الأغراض والشنطة', nameEn: 'Next Trip Countdown & Packing List', descAr: 'عداد تنازلي لرحلتك مع قائمة أمنيات (Bucket List) وتجهيز أغراض السفر والشنطة', descEn: 'Countdown to your trip with packing items bucket list builder', icon: CalendarClock, cat: 'travel' },
  { id: 'travel-slang', nameAr: 'قاموس مصطلحات وSlang السياحة الشائع', nameEn: 'Street Travel Slang Phrasebook', descAr: 'تعرف على المصطلحات الدارجة في السفر والمطارات والكلمات الأكثر استخداماً شعبياً', descEn: 'Learn street travel slang, airports abbreviations, and daily travel phrases', icon: BookOpen, cat: 'travel' },

  // Design & Visuals
  { id: 'chart-generator', nameAr: 'مولد المخططات والرسوم البيانية التفاعلي', nameEn: 'Dynamic Chart Generator', descAr: 'إنشاء رسوم بيانية تفاعلية (دائري، خطي، أعمدة) وتحميلها كصور عالية الدقة', descEn: 'Generate, customize, and download charts in high resolution instantly', icon: PieChart, cat: 'design' },

  // Education & Extras
  { id: 'periodic-table', nameAr: 'الجدول الدوري التفاعلي لعناصر الكيمياء', nameEn: 'Interactive Periodic Table', descAr: 'تصفح عناصر الكيمياء بسهولة واستكشاف المجموعات والأوزان الذرية بدقة', descEn: 'Browse chemistry elements, active groups, structures, and atomic weights', icon: FlaskConical, cat: 'education' },
  { id: 'baby-names', nameAr: 'مولد ومقترح أسماء المواليد ومعانيها', nameEn: 'Baby Names Generator & Meanings', descAr: 'اكتشف أسماء مواليد ذكور وإناث جميلة مع معانيها وأصلها والتصفية الذكية', descEn: 'Explore beautiful baby names with detailed meanings, origins, and smart filters', icon: Baby, cat: 'education' },
  { id: 'time-difference', nameAr: 'حاسبة فروق التوقيت والمناطق الزمنية', nameEn: 'Time Difference Calculator', descAr: 'حساب فارق الوقت بدقة بين المدن والدول حول العالم للمواعيد والسفر', descEn: 'Calculate precise time differences between major global cities easily', icon: Clock, cat: 'education' },
  { id: 'qibla-direction', nameAr: 'بوصلة اتجاه القبلة الدقيق بخرائط جوجل', nameEn: 'Precise Qibla Direction Finder', descAr: 'تحديد اتجاه القبلة الدقيق من موقعك ومكة المكرمة مباشرة على الخريطة', descEn: 'Find accurate Qibla direction from your current location towards Makkah', icon: Compass, cat: 'education' },
  { id: 'lucky-numbers', nameAr: 'مولد الأرقام المحظوظة والعشوائية التفاعلي', nameEn: 'Lucky Numbers Generator', descAr: 'ولد أرقام حظك اليومية للألعاب، السحب، والقرارات بناءً على تفضيلاتك', descEn: 'Generate daily lucky numbers, lottery picks, and random figures seamlessly', icon: Hash, cat: 'education' },
  { id: 'random-picker', nameAr: 'القرعة العشوائية وعجلة الأسماء والقرارات', nameEn: 'Random Choice Picker Wheel', descAr: 'صانع القرعة العشوائية وتدوير عجلة الأسماء لاتخاذ القرارات بطريقة مرحة', descEn: 'Input choices, roll dice, and spin names wheel to make random decisions', icon: Compass, cat: 'education' },
  { id: 'daily-riddle', nameAr: 'الفوازير والحلول وألغاز الذكاء اليومية', nameEn: 'Daily Riddle & Mind Trainer', descAr: 'نشط عقلك مع ألغاز يومية ممتعة، وتحديات تفكير منطقي مع حلول مخفية', descEn: 'Exercise your brain with daily fun riddles and logical puzzles with answers', icon: Smile, cat: 'education' }
];
