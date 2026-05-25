import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

interface SEOContent {
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
}

const SEO_ROUTING_MAP: Record<string, SEOContent> = {
  // General Pages
  'home': {
    titleAr: 'أدوات Hub - منصة الأدوات والخدمات الذكية المجانية وحاسبات الويب',
    titleEn: 'Tools Hub - Free Smart Online Utilities & Web Calculators',
    descAr: 'منصة متكاملة تضم أكثر من 70 أداة تفاعلية سريعة ومجانية، حسابية، للمطورين، لتعليم وتصميم السيو والإنتاجية بدون تسجيل.',
    descEn: 'All-in-one suite loaded with 70+ speed-optimized utilities for calculations, developers, health, travel, SEO, design, and documents.'
  },
  'privacy': {
    titleAr: 'سياسة الخصوصية وأمان البيانات - أدوات Hub',
    titleEn: 'Privacy Policy & Data Security - Tools Hub',
    descAr: 'تعرف على سياسة الأمان والسرية التي نتبعها في حماية خصوصيتك ومعالجة بياناتك محلياً بالكامل دون الخروج من متصفحك.',
    descEn: 'Read about our data transmission policies, cookie configurations, and client-side processing structures built for total user privacy.'
  },
  'terms': {
    titleAr: 'شروط وأحكام الاستخدام - أدوات Hub',
    titleEn: 'Terms of Use & Fair Play Conditions - Tools Hub',
    descAr: 'شروط استخدام منصة أدوات Hub المجانية، قواعد الاستخدام العادل للاستفادة بأمان من حاسباتنا المتنوعة.',
    descEn: 'Learn more about the terms, fair play conditions, copyright protection, and limitations of liability of Tools Hub.'
  },

  // Calculators & Online Tools
  'word-counter': {
    titleAr: 'حاسبة الكلمات والحروف الذكية - عدّ كلماتك وفقراتك مجاناً',
    titleEn: 'Smart Word & Letter Counter - Realtime Text Analyzer',
    descAr: 'أداة سريعة لحساب عدد الكلمات، الحروف، الجمل، الفقرات ومؤشرات القراءة لنصوصك في الوقت الفعلي بأمان.',
    descEn: 'Analyze your texts instantaneously. Get total word count, character count without spacing, reading duration estimate, and paragraphs info.'
  },
  'loan-calculator': {
    titleAr: 'حاسبة القروض الشخصية والتمويل والفوائد بالتفصيل',
    titleEn: 'Personal & Mortgage Loan interest EMI Calculator',
    descAr: 'احسب قسط القرض الشهري والفوائد المتراكمة وجدول الاستهلاك الكامل للتمويل العقاري أو الشخصي بدقة وبسهولة.',
    descEn: 'Optimize your EMI planning. Calculate personal, auto, or home loans with comprehensive interest amortization schedules and charts.'
  },
  'tax-calculator': {
    titleAr: 'حاسبة ضريبة الدخل والخصومات والضرائب السنوية والشهرية',
    titleEn: 'Income Tax & Dynamic Wage Deductions Calculator',
    descAr: 'أداة ممتازة لتقدير مبالغ ضريبة الدخل السنوية والخصومات والتسهيلات الضريبية الخاصة بدخلك الشهري.',
    descEn: 'Instantly calculate income tax bands, net salaries, local deductions, and tax obligations on monthly basis.'
  },
  'crypto-converter': {
    titleAr: 'محول العملات الرقمية والبيتكوين والأسعار اللحظية المتقاطعة',
    titleEn: 'Live Cryptocurrency Cross Price Rates & Crypto Converter',
    descAr: 'حول بين مختلف العملات المشفرة مع أسعار حية ومباشرة للبيتكوين، الإيثيريوم والعملات البديلة مقابل العملات العالمية.',
    descEn: 'Cross-convert Bitcoin, Ethereum, Solana, and major altcoins instantly using live conversion price index feeds.'
  },
  'compound-interest': {
    titleAr: 'حاسبة الفائدة المركبة والنمو المالي وخطط الاستثمار العكسي',
    titleEn: 'Compound Interest & Retro Investing Growth Calculator',
    descAr: 'تعرف على قوة الفائدة المركبة وتأثير الوقت في مضاعفة مدخراتك واستثماراتك لبناء ثروة طويلة الأجل.',
    descEn: 'Visualize the exponential compounding of investments. Modify monthly contributions, compound frequency, and time horizons.'
  },
  'zakat-calculator': {
    titleAr: 'حاسبة الزكاة الشرعية لعام 2026 - احسب زكاة المال والذهب الدقيقة',
    titleEn: 'Zakat Calculator - Accurate Zakat on Wealth, Gold & Stocks',
    descAr: 'احسب مقدار زكاة المال، الذهب، الفضة، والأسهم الشرعية بدقة بناءً على نصاب الذهب الحالي في الأسواق.',
    descEn: 'Calculate your Zakat liabilities accurately. Automatically fetch gold value index for measuring nisab thresholds easily.'
  },
  'gold-calculator': {
    titleAr: 'حاسبة أسعار الذهب والمصنعية بالتفصيل والأعيرة الحالية',
    titleEn: 'Gold Jewelry Custom Value & Crafting Cost Calculator',
    descAr: 'احسب تكلفة المجوهرات والقطع الذهبية المستعملة أو الجديدة بما يشمل المصنعية والضريبة وسعر غرام الأعيرة المختلفة.',
    descEn: 'Formulate accurate pricing of gold jewelry by analyzing karat weight, current market prices, margins, and workmanship.'
  },
  'inflation-calculator': {
    titleAr: 'حاسبة التضخم وقوة الشراء التاريخية للعملات والمال',
    titleEn: 'Inflation & Historical Currency Buying Power Calculator',
    descAr: 'اكتشف تأثير التضخم على القوة الشرائية لنقودك ومقارنة قيمتها الفعلية على مدار السنوات السابقة.',
    descEn: 'Check historical inflation impact on money value. Estimate changing buying power of currency across custom time spans.'
  },
  'stock-profit': {
    titleAr: 'حاسبة أرباح وخسائر الأسهم والعملات والتداول والعمولات',
    titleEn: 'Stock Profit, Losses, Brokerage & Trade Fee Calculator',
    descAr: 'احسب المكسب أو الخسارة الصافية لصفقات شراء وبيع الأسهم، وصافي رصيدك بعد خصم عمولات شركة الوساطة والضرائب.',
    descEn: 'Evaluate financial indicators of stock trades. Compute purchase values, target breaks, commissions, and clean profit yield.'
  },
  'invoice-generator': {
    titleAr: 'صانع الفواتير الاحترافية الفوري - أنشئ فاتورة PDF مجاناً للعملاء',
    titleEn: 'Free Professional Invoice Generator - Export PDF Bills',
    descAr: 'برنامج بسيط وسريع لإنشاء فواتير المبيعات، الخدمات، والعمل الحر وتصديرها بصيغة PDF عالية الجودة بتصميم ممتاز.',
    descEn: 'Create, brand, and assemble gorgeous client invoices ready for printing or dynamic PDF exports securely within minutes.'
  },
  'online-notepad': {
    titleAr: 'المفكرة السحابية المؤقتة لحفظ الملاحظات والنصوص والمسودات',
    titleEn: 'Saved Cloud Scratchpad - Secure Text Notepad and Drafts',
    descAr: 'اكتب مذكراتك ومقالاتك مع الحفظ التلقائي للرموز والنصوص بلمح البصر دون الخوف من فقدانها عند إغلاق التصفح.',
    descEn: 'A fast browser-based text draft manager that auto-saves your logs instantly. Clean word metrics and simple offline backups.'
  },
  'gpa-calculator': {
    titleAr: 'حاسبة المعدل التراكمي والفصلي التفاعلية للجامعات والمدارس',
    titleEn: 'Semester & Cumulative GPA Calculator - GPA Scale Planner',
    descAr: 'احسب معدلك الفصلي والتراكمي (من 4.0 أو 5.0 أو مئوي) بسهولة مع تخزين تقديراتك للدراسة والمقاعد الدراسية.',
    descEn: 'Project your academic success. Check cumulative credits, compute semester grades, and convert between GPA scales smoothly.'
  },
  'physics-units': {
    titleAr: 'محول الوحدات الفيزيائية الشامل - الطول، الوزن، الطاقة، الضغط',
    titleEn: 'Multipurpose Physical Unit Converter - Area & Weight Converter',
    descAr: 'أقوى أداة للتحويل بين الوحدات الفيزيائية المختلفة (المتر، القدم، الكيلوغرام، الباوند، البار، الكلفن) بنقرة واحدة.',
    descEn: 'Translate dimensional quantities cleanly: speed, temperature, mass, distance, electrical forces, and pressure metrics.'
  },
  'citation-generator': {
    titleAr: 'منشئ المراجع والتوثيق العلمي الأكاديمي APA و MLA وكتابتها',
    titleEn: 'Academic Bibliography Reference & Citation Generator',
    descAr: 'وثّق مصادر أبحاثك وكتبك والمواقع الإلكترونية تلقائياً بطريقة APA 7th Edition أو MLA أو Chicago دون تعقيد.',
    descEn: 'Generate instant bibliographies for web articles, books, papers, and archives according to current standards.'
  },
  'grade-percentage': {
    titleAr: 'حاسبة درجات ونسب الاختبارات المئوية والتقديرات للمدرسين',
    titleEn: 'Exam Grade Percentage, Weight & Letter Score Class Calculator',
    descAr: 'أداة مساعدة للمدرسين والطلاب لحساب درجات الامتحانات الورقية بالنسبة المئوية والرمز والتعديل الفوري.',
    descEn: 'Calculate school exam levels, grade distribution targets, and overall class score percentages with dynamic grids.'
  },
  'date-converter': {
    titleAr: 'محول التاريخ الهجري والميلادي والشمسي وموقع الشهور المتبادل',
    titleEn: 'Universal Hijri & Gregorian Calendar Date Converter',
    descAr: 'تحويل التواريخ بشكل دقيق من هجري لميلادي وبالعكس، مع تفاصيل اليوم بالشهور وموضع الأيام في السنة.',
    descEn: 'Check and cross-convert Islamic lunar Hijri dates into Gregorian solar calendar parameters with absolute astronomical accuracy.'
  },
  'daily-study-schedule': {
    titleAr: 'منظم وجدول المذاكرة الدراسي اليومي وخطط مراجعة وحفظ الفصول',
    titleEn: 'Interactive Study Planner & Dynamic Class Timetable',
    descAr: 'أداة جميلة واحترافية لإنشاء خطة مراجعة وأوقات للمذاكرة الأسبوعية واليومية وزيادة تركيز التثبيت والاستعداد.',
    descEn: 'De-clutter your exams preparation: schedule course targets, specify study hours, check deadlines and maintain learning streaks.'
  },
  'bmi-calculator': {
    titleAr: 'حاسبة مؤشر كتلة الجسم BMI وتحليل الوزن والدهون بدقة',
    titleEn: 'Interactive BMI Mass Index & Perfect Weight Target Calculator',
    descAr: 'احسب كتلة جسمك وتعرف على الفئة الصحية لوزنك الحالي مع اقتراحات للوصول إلى الوزن المثالي وحرق السعرات.',
    descEn: 'Check your physical fat indices. Dynamic BMI ranges tailored for male, female, or general fitness diagnostics.'
  },
  'calorie-calculator': {
    titleAr: 'حاسبة السعرات الحرارية والوجبات والاحتياجات الغذائية والبروتينات',
    titleEn: 'Daily Calorie, Macro-Nutrient & BMR Estimator',
    descAr: 'اعرف السعرات الحرارية اللازمة لجسمك لإنقاص الوزن، تضخيم العضلات أو ثبات الوزن بالتفصيل من الكاربو والدهون.',
    descEn: 'Compute your BMR/TDEE limits: customize fitness goals to acquire precise proteins, carbohydrates, and healthy fats intake targets.'
  },
  'pregnancy-calculator': {
    titleAr: 'حاسبة الحمل وموعد الولادة التقديري وجدول أسابيع التطور',
    titleEn: 'Pregnancy Due Date & Gestational Weeks Progression Tracker',
    descAr: 'تتبعي فترة حملك بدقة، احسبي موعد ولادتك المنتظر وتعرفي على طور تطور الجنين في كل أسبوع وتحديد الأثلاث.',
    descEn: 'Track pregnancy milestones clearly: calculate approximate delivery date, current week index, zodiac signs and fetal growth hints.'
  },
  'water-calculator': {
    titleAr: 'حاسبة كمية شرب الماء اليومية اللازمة والصحة العامة للجفاف',
    titleEn: 'Daily Fluid hydration Requirements & Water Intake Calculator',
    descAr: 'اعرف كمية لترات أو أكواب المياه التي يجب شربها يومياً وفقاً لوزنك، وعوامل الجو الجاف، ومجهودك الرياضي.',
    descEn: 'Understand your hydration profiles. Calculate baseline daily water volume and additional intake triggered by sports workouts.'
  },
  'workout-generator': {
    titleAr: 'مولد التمارين والبرامج الرياضية المنزلية المخصصة مجاناً',
    titleEn: 'Smart Home Workout routine & Fitness Exercise Generator',
    descAr: 'أنشئ جدول تمارين رياضية للياقة أو التخسيس أو كمال الأجسام في المنزل بدون أدوات وبطرق تدريب حديثة.',
    descEn: 'Generate body-weight workouts focusing on targeted muscles (core, legs, arms) adapted to your fitness level.'
  },
  'color-vision-test': {
    titleAr: 'اختبار عمى الألوان تفاعلي - فحص النظر إيشيهارا للتأكد من الرؤية',
    titleEn: 'Color Blindness Online Ishihara Plates Vision Test',
    descAr: 'افحص رؤيتك للدرجات اللونية المختلفة بواسطة اختبار لوحات إيشيهارا المعتمدة عالمياً لمعاينة عمى الألوان.',
    descEn: 'Acquire immediate feedback on color perception using interactive, classic Ishihara visual plates diagnosing Daltonism.'
  },
  'json-converter': {
    titleAr: 'محلل ومحول ملفات JSON لـ XML و CSV ومخططات الشجرة المتميزة',
    titleEn: 'JSON Web Parser, JSON to XML, YAML & CSV Editor Converter',
    descAr: 'أقوى أداة متكاملة لفحص سلامة أكواد الـ JSON وتحويلها لصيغ مختلفة وتجميلها وعرضها بصيغة مرئية منظمة.',
    descEn: 'Parse, validate, format, and convert JSON structures seamlessly into clean CSV, XML, XML Schemas or human-friendly layout trees.'
  },
  'password-generator': {
    titleAr: 'صانع ومولد كلمات المرور القوية للمواقع وصانع الحماية المطلقة',
    titleEn: 'Secure Random Passwords & Private Keys Generator',
    descAr: 'ولد كلمات سر عشوائية ومعقدة لتأمين حساباتك من الاختراق والقرصنة مع تحديد الطول، الرموز، والأرقام المسموحة.',
    descEn: 'Formulate highly secure credentials and salt keys using multi-type character inclusion specs and security calculations.'
  },
  'meta-tags-previewer': {
    titleAr: 'معاين ومولد ميتاداتا Meta Tags لـ SEO ومحركات البحث فيسبوك وتويتر',
    titleEn: 'Dynamic Meta Tags & SERP Previewer for SEO audits',
    descAr: 'افحص كيف يظهر موقعك في نتائج محرك بحث جوجل والشبكات الاجتماعية، وولد ميتاداتا السيو المتطورة.',
    descEn: 'Inspect and preview how URL meta titles, descriptions, and OpenGraph variables look across Google SERPs, Facebook or X.'
  },
  'seo-files-generator': {
    titleAr: 'منشئ ملفات السيو Robots.txt و XML Sitemap لمواقع الويب مجاناً',
    titleEn: 'Robots.txt & XML XML-Sitemap Search Optimization Files Creator',
    descAr: 'ولد خرائط الفهرسة Sitemap وملحقات الروبوت لتسهيل الزحف وضمان ترقية رتبة موقعك في محركات البحث بسهولة.',
    descEn: 'Accelerate indexation of website. Build well-formed crawler directions and sitemap templates ready for submission.'
  },
  'image-color-picker': {
    titleAr: 'مستخرج ألوان الصور الذكي - حدد واستخرج أكواد لونا HEX/RGB بالتفصيل',
    titleEn: 'Online Image Color Code Picker, HEX & RGB Identifier',
    descAr: 'ارفع صورتك وحدد أي بكسل فيها للحصول على أكواد الألوان بنظام HEX الكاملي وتحديد تباين الشاشة.',
    descEn: 'Pick and lock exact color matching profiles directly from uploaded images. Get instant hex values, RGB codes, or HSL presets.'
  },
  'code-beautifier': {
    titleAr: 'منسق ومجمل الأكواد البرمجية - HTML، CSS، JavaScript، JSON',
    titleEn: 'Source Code Beautifier, Web Formatter & Code Minifier',
    descAr: 'أعد تنظيم نصوص أكوادك البرمجية المشوشة، جمل تباعد الأسطر، أو قم بضغط الأكواد وتقليل حجم الملفات بنقرة.',
    descEn: 'Optimize your programming workflow. Unify styling indents, format JS/CSS layouts, or bundle code into ultra-minified blocks.'
  },
  'webp-converter': {
    titleAr: 'تحويل الصور إلى صيغة WebP الحديثة والمدمجة مع الحفاظ على الجودة',
    titleEn: 'Modern Image converter to WebP Web-optimized format',
    descAr: 'حول صيغ الصور العادية PNG و JPG إلى WebP الذكية لتقليص أحجام صور موقعك وجعلها مناسبة لشروط جوجل.',
    descEn: 'Compress your website image load. Transform bulk JPEG and PNG assets into high-performance web WebP images.'
  },
  'base64-converter': {
    titleAr: 'محول تشفير وترميز Base64 للنصوص والصور بشكل عكسي سريع',
    titleEn: 'Base64 Text/Image Dynamic Encoder & Decoder online',
    descAr: 'حول النصوص وملفات الصور إلى ترميز Base64 الثنائي وفك تشفيرها فورا وبأمبل سرعة مع الحفظ الآمن محلياً.',
    descEn: 'Translate binaries into ascii characters. Convert any text or picture files to Base64 code patterns and decode reverse specs.'
  },
  'youtube-calculator': {
    titleAr: 'حاسبة أرباح وإحصائيات ومشاهدات قنوات اليوتيوب التقديرية بدقة',
    titleEn: 'Estimate YouTube Channel Profits & Revenue Metrics tool',
    descAr: 'ادخل الإحصائيات أو المشاهدات اليومية واحسب الأرباح التقديرية المتوقعة لقناتك على يوتيوب بناء على مؤشرات الـ CPM.',
    descEn: 'Discover YouTube monetization value. Formulate potential payouts based on page views, video length, and regional RPM rates.'
  },
  'hashtag-generator': {
    titleAr: 'مولد ومنشئ الهاشتاجات الترند الرائجة لمواقع التواصل الاجتماعي',
    titleEn: 'Dynamic Trending Hashtags & Social Reach Generator',
    descAr: 'احصل على الهاشتاجات النشطة والترند لإنستغرام، تيك توك، وإكس لزيادة انتشار منشوراتك ومتابعينك لليوم.',
    descEn: 'Generate highly relevant keywords and tag strings to maximize your posts exposure, likes and growth on instagram.'
  },
  'image-resizer': {
    titleAr: 'أداة تغيير مقاسات وأبعاد وتعديل حجم الصور سريعا أونلاين',
    titleEn: 'Simple Pixels & Percentages Image Dimensions Resizer',
    descAr: 'عدل مقاسات صورك حسب الطول والعرض بالبكسل أو النسبة المئوية للمنصات وقصها بدقة متناهية مجاناً.',
    descEn: 'Adjust scale, width and height values of banners, avatars, and logos. Crop files easily while preserving clean scaling ratios.'
  },
  'room-calculator': {
    titleAr: 'حاسبة أبعاد ومساحة الغرفة وكميات البلاط، السيراميك والدهانات',
    titleEn: 'Room Area, Wall Paint Volume, Tile & Ceramic Quantity Calculator',
    descAr: 'أداة هندسية لحساب مساحة الأرضية والجدران والكميات المطلوبة للبناء لتبليط أو دهان الغرف بدقة متكاملة.',
    descEn: 'Input layout dimensions to compute total flooring areas, wall dimensions, estimated tiles, grout volume, and gallons of paint.'
  },
  'fuel-calculator': {
    titleAr: 'حاسبة استهلاك وتكلفة وقود ومصروف بنزين وسولار الرحلة',
    titleEn: 'Trip Fuel Consumption, Mileage & Gasoline Cost Calculator',
    descAr: 'احسب كمية الوقود المستهلكة لرحلتك البرية وتكلفتها التقديرية وتوزيعها على المسافرين من محفظتك بسهولة.',
    descEn: 'Plan road trips on budget. Estimate fuel efficiency, complete gasoline cost, and shared driver expenses efficiently.'
  },
  'baby-names': {
    titleAr: 'مولد ومنتقي أسماء المواليد والذكور والإناث مع المعاني الكاملة',
    titleEn: 'Unique Baby Names Finder - Meaning Dictionary & Selection Filter',
    descAr: 'ابحث في مكتبة الأسماء العربية والإسلامية والعالمية للمواليد الجدد، مع معانيها الموثوقة ومولد الفلترة لليسر.',
    descEn: 'Browse beautiful origins, religious references, and specific traits of baby names with convenient customized filtering tools.'
  },
  'time-difference': {
    titleAr: 'حاسبة الفروق الزمنية والفرق بين التوقيت المحلي للمدن والعواصم',
    titleEn: 'Global Time Zone Difference & Local Multi-Clock Converter',
    descAr: 'قارن واحسب فارق الساعات والفرق الزمني بين بلدك وأي عاصمة حول العالم لجدولة اجتماعاتك وسفرك بدقة.',
    descEn: 'Quick hour conversions across any time zones. Plan digital meetings, discover daylight saving times shift, and sync schedules.'
  },
  'qibla-direction': {
    titleAr: 'تحديد اتجاه القبلة للصلاة الدقيق بالبوصلة وإحداثيات الخريطة',
    titleEn: 'Precise Qibla Direction online Compass with Coordinates',
    descAr: 'اعرف اتجاه القبلة للصلاة الصحيح من مكانك الحالي مباشرة باستخدام بوصلة المتصفح والخريطة ومقدار الانحراف.',
    descEn: 'Locate Kabah in Mecca from anywhere. Uses browser position metrics to compute accurate compass deviation angles instantly.'
  },
  'lucky-numbers': {
    titleAr: 'مولد أرقام الحظ اليومية وحسابات توافق الأرقام الكونية للمستقبل',
    titleEn: 'Personal Lucky Draw & Cosmos Numerology Numbers Generator',
    descAr: 'احسب أرقامك الحافلة بالحظ المالي والنجاح لليوم عن طريق أرقام تاريخ ميلادك والتحليل الفلكي وعوامل النجاح.',
    descEn: 'Generate lucky sequences for lottery tickets and casual draws utilizing customized range sizes and unique seed inputs.'
  },
  'random-picker': {
    titleAr: 'مولد القرعة والاختيار العشوائي الذكي وعجلة الأسماء والقرعة',
    titleEn: 'Dynamic Random Picker, Spin Name Wheel & Choice Raffle Generator',
    descAr: 'أداة متميزة لإدخال المجموعات والاختيار العشوائي، لف عجلة القرعة واختيار الفائزين بكل حيادية وموثوقية.',
    descEn: 'Conduct modern lucky draws. Input names list, select random counts, or rotate the animated wheel for impartial decisions.'
  },
  'book-reading-time': {
    titleAr: 'حاسبة وقت قراءة الكتب وعدد الكلمات لبرنامج المذاكرة اليومي',
    titleEn: 'Interactive Book Reading Time Estimator & Speed Tracker',
    descAr: 'احسب عدد الأيام والدقائق المطلوبة لإنهاء قراءة أي كتاب أو رواية بناء على سرعة قراءتك للكلمات بالدقيقة.',
    descEn: 'Project reading schedules easily: define word counts, specify daily browsing time, and find when your books will be finished.'
  },
  'live-age-calc': {
    titleAr: 'حاسبة العمر بالثواني والدقائق والساعات وموعد الميلاد القادم',
    titleEn: 'Interactive Live Age Calculator down to Seconds and Days',
    descAr: 'الأداة الأكثر شمولاً لحساب عمرك بالسنوات، الشهور، الأسابيع، الأيام، وحتى الرمز التفصيلي لميلادك القادم والأبراج.',
    descEn: 'Check biological lifetime progression: calculates exact age digits down to days, weekdays of birth, and countdown to next jubilee.'
  },
  'daily-riddle': {
    titleAr: 'ألغاز وفوازير ذكاء يومية مع الحل لتنشيط ذاكرة وفكر الكبار والشباب',
    titleEn: 'Solve Daily Brain Riddles, Logic Puzzles & Mind Boosters',
    descAr: 'تحد ثبات تفكيرك مع لغز اليوم التفاعلي، واطلع على الحل وولد باقة متميزة من الألغاز لتبهر بها من تحب.',
    descEn: 'Engage in mental gymnastics. Reveal logic riddles, practice dynamic sequence problem-solvers, and challenge your cognition.'
  },
  'typing-speed-test': {
    titleAr: 'اختبار سرعة الكتابة المتقدم وقياس الضربات بالدقيقة والدقة',
    titleEn: 'Typing Speed Test and Key Strokes metrics (WPM and Accuracy)',
    descAr: 'افحص سرعتك ودقتك في الكتابة على لوحة المفاتيح عبر اختبارات نصوص تفاعلية مع إحصائيات WPM المباشرة.',
    descEn: 'Calculate keyboard performance. Dynamic time horizons to verify total words per minute, strokes error rates, and grading.'
  },
  'ascii-art': {
    titleAr: 'تحويل الصور والكلمات إلى نصوص ASCII الفنية والرموز الفريدة',
    titleEn: 'Convert Text & Picture patterns into ASCII Art codes and drawings',
    descAr: 'برنامج تحويل الصور لرسومات نصية ولوحات كيبورد ممتازة وجميلة للمشاريع والرسائل التعبيرية بسرعة وسهولة.',
    descEn: 'Transform raster pictures and input strings into majestic vintage font characters or high-fidelity mono ascii matrices.'
  },
  'ohms-law': {
    titleAr: 'حاسبة قانون أوم والجهد والاستطاعة الكهربائية للمهندسين',
    titleEn: 'Ohm\'s Law, Resistance, Voltage, Current & Power Calculator',
    descAr: 'احسب المقاومة، الجهد، شدة التيار، والاستطاعة في الدوائر الكهربائية بدقة متناهية مع عرض قوانين الحل وتحديثها.',
    descEn: 'Solve electrical circuit variables. Input resistance, voltage, power, or current to calculate outputs dynamically.'
  },
  'number-base-converter': {
    titleAr: 'محول أنظمة الأعداد وقيم التشفير الثنائي والست عشري والعشري',
    titleEn: 'Binary, Octal, Decimal, Hexadecimal Number Base Converter',
    descAr: 'محول أنظمة العد المتبادل مع شرح خطوات فك التركيب من النظام الثنائي Binary إلى العشري والسداسي عشر بدقة.',
    descEn: 'Translate numeral bases instantaneously: handles fractions, conversion steps presentation, and dual formats smoothly.'
  },
  'triangle-calculator': {
    titleAr: 'حاسبة المثلثات الدقيقة لحساب الزوايا والأضلاع والمحيط والمساحة',
    titleEn: 'Triangle Angle, Pythagorean theorem, Side and Area Solver',
    descAr: 'حل جميع معادلات المثلث القائم والمتساوي، احسب المساحة والمحيط والارتفاع بالتحليل الرياضي لنظرية فيثاغورس.',
    descEn: 'Solve absolute geometric dimensions of triangles: handles right-angle, scalene, isosceles, and trigonometric laws.'
  },
  'material-strength': {
    titleAr: 'حاسبة متانة وقوة وهندسة المواد وتحمل العزم والانحناء والشد',
    titleEn: 'Material Strength, Stress, Strain & Structural Yield Calculator',
    descAr: 'أداة هندسية لحساب قيم الإجهاد والانفعال ومعامل المرونة والشد للمواد الانشائية والهياكل المعدنية والبلاستيكية.',
    descEn: 'Evaluate safe operating loads. Determine compression Stress, elastic deformation, shear forces, and fatigue indicators.'
  },
  'periodic-table': {
    titleAr: 'الجدول الدوري الحديث للعناصر الكيميائية وتفاصيل خصائصها التفاعلية',
    titleEn: 'Modern Interactive Periodic Table - Chemical Elements properties',
    descAr: 'تصفح الجدول الدوري بشكل تفاعلي حديث مع فئات تصنيف العناصر، أوزانها الذرية، وهيكلية توزيع الإلكترونات.',
    descEn: 'Explore group properties, electron shells configuration, melting blocks, atomic weight and density of elements.'
  },
  'temperature-converter': {
    titleAr: 'محول درجات الحرارة السريع سيليسيوس، فهرنهايت وكلفن ومطلق',
    titleEn: 'Celsius, Fahrenheit, Kelvin & Rankine Temperature Scaler Converter',
    descAr: 'حول قيم الحرارة بمرونة كاملة بين مختلف المقاييس والمعايرات مع الصيغ العلمية المعتمدة لخطوات النتيجة.',
    descEn: 'Translate thermodynamic levels seamlessly: converts Fahrenheit, Celsius, Kelvin, and Rankine formulas instantly.'
  },
  'wave-calculator': {
    titleAr: 'حاسبة طول الموجة والتردد والسرعة في الفيزياء والبث الترددي',
    titleEn: 'Physics Wave Frequency, Amplitude, Speed & Velocity Calculator',
    descAr: 'احسب طول الأمواج الكهرومغناطيسية والسمعية والتردد والسرعة بناءً على معامل الوسط وقرائن البث العلمي.',
    descEn: 'Evaluate wave equations: compute sound index, RF frequency spectrum propagation, wavelength, and speed patterns.'
  },
  'geometry-calculator': {
    titleAr: 'حاسبة المساحات والأحجام الهندسية للمجسمات ثلاثية الأبعاد والأشكال',
    titleEn: 'Geometry 2D/3D Shape Area, Perimeter & Volume Calculator formulas',
    descAr: 'احسب حجم ومساحة كافة الأشكال كالدائرة، الأسطوانة، الهرم، والمربع مع عرض قوانين الحل الرياضية.',
    descEn: 'Calculate properties of spheres, cones, boxes, cylinders, and complex shapes with comprehensive step walkthroughs.'
  },
  'power-led-calculator': {
    titleAr: 'حاسبة مقاومات الليد LED والجهد والتيار للدوائر الإلكترونية بأمان',
    titleEn: 'LED Resistor Protection & Series-Parallel Circuit Calculator',
    descAr: 'احسب قيمة المقاومة اللازمة لتشغيل الليد الفردي أو المربوط في مجموعة على التوالي لحمايته من التلف وتحديد استهلاك الطاقة.',
    descEn: 'Protect hardware from burning: calculate series resistor value, color bands sequence, and power dissipation wattage.'
  },
  'chart-generator': {
    titleAr: 'صانع ومولد الرسوم البيانية والمخططات أونلاين مجاناً وبأبعاد متمثلة',
    titleEn: 'Free Online Interactive Bar, Line, and Pie Chart Generator',
    descAr: 'أنشئ رسوماتك الإحصائية بنفسك ومثلها كخطوط، أعمدة، أو قطاع دائري عالي الجمالية وقم بتنزيلها كملف فوري.',
    descEn: 'Create eye-safe dynamic statistics graphics: choose chart type, customize colors, configure datasets, and export images.'
  },
  'size-converter': {
    titleAr: 'محول مقاسات الملابس والأحذية الرجالية والنسائية للتسوق العالمي أونلاين',
    titleEn: 'Global Clothing & Shoe Size Converter chart for online shopping',
    descAr: 'قارن وحول أحجام الثياب والأحذية حسب الأنظمة الأمريكية، الأوروبية، البريطانية، والآسيوية للتسوق الآمن.',
    descEn: 'Translate apparel size indexes from US/UK standards into European or Japanese measures for both adults and kids.'
  },
  'travel-wheel': {
    titleAr: 'عجلة السفر العشوائية - اختر وجهتك ونشاط رحلتك بطريقة تفاعلية مسلية',
    titleEn: 'Interactive Travel Destination Finder & Vacation Fortune Spin Wheel',
    descAr: 'مستشار السفر العشوائي الممتع لمساعدتك في اتخاذ قرارات السفر الصعبة واكتشاف عجائب الأنشطة والمغامرات الجذابة.',
    descEn: 'Rotate the gaming roulette to randomly propose unique trip highlights, travel concepts, and next vacation destinations.'
  },
  'scratch-map': {
    titleAr: 'خريطة السفر الفضية التفاعلية للخدش وتلوين البلدان التي قمت بزيارتها',
    titleEn: 'Interactive Travel Scratch Map - Mark and Track Countries Visited',
    descAr: 'لوّن وضع مسارات زياراتك على خارطة العالم ثلاثية الأبعاد التفاعلية والاحتفاظ بخرائط رحلاتك الشخصية بذكاء.',
    descEn: 'Track your globetrotting milestones. Scratch-off visited countries visually with clean localized percentage metrics.'
  },
  'travel-dare': {
    titleAr: 'مولد تحديات السفر والمهمات والمغامرات المجنونة والمضحكة للترحال والاستكشاف',
    titleEn: 'Fascinating Travel Dare & Extreme Vacation Holiday Missions Generator',
    descAr: 'أضف المزيد من الإثارة لرحلتك القادمة عبر مولد تحديات ومغامرات السفر الممتازة لرفع جودة الترفيه وكسر الملل.',
    descEn: 'Generate offbeat, exciting, and funny tasks to experiment with during your journeys to create unforgettable memories.'
  },
  'travel-compatibility': {
    titleAr: 'حاسبة فحص توافق وانسجام طباع رفقاء السفر والشركاء في الرحلات',
    titleEn: 'Travel Compatibility Test - Companion personality matching evaluator',
    descAr: 'أجر اختبار التوافق التفاعلي مع شريكك أو أصدقائك في السفر قبل الذهاب لضمان رحلة منسجمة تماماً وخالية من الخلاف.',
    descEn: 'Evaluate dynamic profiles: compare budget levels, wakefulness cycles, and travel interests to secure a smooth journey.'
  },
  'trip-countdown': {
    titleAr: 'عداد تنازلي للرحلات وحساب الوقت المتبقي لسفرك مع حقيبة التذكيرات',
    titleEn: 'Visual Trip Countdown & Smart Luggage Packing helper Checklist',
    descAr: 'تابع موعد انطلاق رحلتك بدقة تامة بالدقائق وصمم قائمة تفاعلية لأبرز ما في حقائب السفر أوتوماتيكياً حسب طبيعة الطقس.',
    descEn: 'Keep track of travel deadlines: dynamic countdown tracker paired with seasonal smart item packaging checklist builder.'
  },
  'travel-slang': {
    titleAr: 'قاموس الكلمات والمصطلحات العامية المحلية والعبارات الأساسية لكل بلد للسواح',
    titleEn: 'Global Slang Dictionary & Essential localized Travel Phrase-Book',
    descAr: 'ادرس الكلمات العامية والمجاملات والعبارات الأكثر تداولاً في الشارع لأكثر من 30 وجهة سياحية للتواصل اللبق.',
    descEn: 'Discover colloquial local slangs, conversational essentials, greeting models, and vocabulary before arriving at your tour.'
  },
  'memory-game': {
    titleAr: 'لعبة سايمون للألوان والأنماط المعرفية لتنشيط الذاكرة وتقوية عصب التفكير',
    titleEn: 'Simon Memory Color-sequence Brain training Game online',
    descAr: 'تحد ذكاءك وقوة تركيزك عبر محاكاة سلاسل الألوان والأصوات، فصّل أداءك واربح أرقاماً قياسية لمهارات عقلك.',
    descEn: 'Challenge your synapses. Try the fully responsive layout of Simon Color sequence matching game to boost mental persistence.'
  },
  'pdf-compressor': {
    titleAr: 'ضاغط حجم ملفات PDF الذكي - صغر الحجم وضغط الملف بأعلى جودة تامة',
    titleEn: 'Ultra PDF File Compressor - Secure Document size resizer tool',
    descAr: 'قلص حجم ملف بي دي إف PDF الثقيل بأمان محلي بلمح البصر دون فقدان السطوع والوضوح وتصدير مباشر.',
    descEn: 'Reduce bulky paper scan files. Safe internal client-side compression that maintains clear text layout definitions.'
  },
  'qr-suite': {
    titleAr: 'صانع وقارئ رموز الاستجابة السريعة QR والباركود أونلاين بنقرة واحدة',
    titleEn: 'Professional QR Code Creator & Barcode Scanner dynamic Suite',
    descAr: 'أنشئ أكواد QR ذكية مخصصة بالوجه والألوان، أو اقرأ وشرّح أي رمز باركود عبر كاميرا جهازك فورياً بامتياز.',
    descEn: 'Generate customized QR labels featuring colored layouts, logos, or utilize live camera to scan barcodes instantaneously.'
  },
  'ping-tester': {
    titleAr: 'فاحص استقرار خط الاتصال الـ Ping واللاغ في الوقت الفعلي برسومات بيانية',
    titleEn: 'Telecom Latency Diagnostics & Realtime Ping tester stability graph',
    descAr: 'افحص استقرار الإنترنت ومعدل الـ Ping ودرجة اللاغ بالتفصيل والمؤشرات الكافية للألعاب والعمل عن بعد بنظام دائم.',
    descEn: 'Check high frequency packet loss: logs network stability to local servers in live responsive charts.'
  },
  'sticker-maker': {
    titleAr: 'صانع ومصمم لاصقات ستيكرات الواتساب وقص خلفيات الصور بذكاء وسرعة',
    titleEn: 'Sticker Maker & Interactive transparent PNG Background Converter',
    descAr: 'اصنع وحول صورك لملصقات متحركة أو ملصقات واتساب وقص الخلفية واكتب عليها نصوصاً بهيجة بكل حرية.',
    descEn: 'Design unique message bubbles: drop files, trim outlines, append outlines, and download as clean transparent decals.'
  },
  'speed-test': {
    titleAr: 'فحص قياس سرعة الإنترنت الفعلي - اضغط وقم بالقياس والتحميل فوراً',
    titleEn: 'Interactive Broadband speed test - Network Bandwidth Diagnostic tool',
    descAr: 'قس كفاءة اتصال الإنترنت الحقيقي لديك، الرفع والتحميل ومعدل اهتزاز الشبكة Jitter بدقة وأمان.',
    descEn: 'Diagnose broadband health indexes securely: calculates precise download Mbps, upload speeds, and connection latency.'
  }
};

export default function SEOHandler({ lang }: { lang: 'ar' | 'en' }) {
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    const isAr = lang === 'ar';
    const path = location.pathname;

    let seoData: SEOContent | undefined = undefined;

    // Determine SEO Key based on path
    if (path === '/' || path === '') {
      seoData = SEO_ROUTING_MAP['home'];
    } else if (path === '/privacy') {
      seoData = SEO_ROUTING_MAP['privacy'];
    } else if (path === '/terms') {
      seoData = SEO_ROUTING_MAP['terms'];
    } else if (path.startsWith('/tool/')) {
      const toolId = path.replace('/tool/', '');
      seoData = SEO_ROUTING_MAP[toolId];
    } else if (path.startsWith('/category/')) {
      const categoryId = path.replace('/category/', '');
      
      const categoryTitles: Record<string, { arName: string; enName: string }> = {
        'finance': { arName: 'الخدمات المالية والحاسبات', enName: 'Financial Services & Calculators' },
        'productivity': { arName: 'أدوات الإنتاجية والنصوص والـ PDF', enName: 'Productivity, Text & PDF Tools' },
        'education': { arName: 'أدوات التعليم والمذاكرة والـ GPA', enName: 'Education, Study & GPA Tools' },
        'developers': { arName: 'أدوات المبرمجين وتطوير الويب والألوان', enName: 'Developer, Web & Color Utilities' },
        'health': { arName: 'الصحة واللياقة والـ BMI والسعرات', enName: 'Health, Wellness, Calories & BMI Tools' },
        'travel': { arName: 'أدوات السفر والرحلات والاستكشافات', enName: 'Travel, Trip Planner & Explorer Tools' }
      };

      const matchedCategory = categoryTitles[categoryId] || { arName: 'أقسام الأدوات', enName: 'Utilities Directory' };
      seoData = {
        titleAr: `${matchedCategory.arName} - تصنيف الأدوات الذكية في أدوات Hub`,
        titleEn: `${matchedCategory.enName} - Tools Hub Categories`,
        descAr: `تصفح باقة متميزة وحصرية من ${matchedCategory.arName}، كل الأدوات مبرمجة لتعمل بالسرعة واللغتان في أدوات Hub.`,
        descEn: `Explore premium web tools in ${matchedCategory.enName} category. Secure client-side processing, translation, and beautiful layouts.`
      };
    }

    // Default to Home if still not found
    if (!seoData) {
      seoData = SEO_ROUTING_MAP['home'];
    }

    // Update document title and description meta tag
    const resolvedTitle = isAr ? seoData.titleAr : seoData.titleEn;
    const resolvedDesc = isAr ? seoData.descAr : seoData.descEn;

    if (resolvedTitle) {
      document.title = resolvedTitle;
    }

    if (resolvedDesc) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', resolvedDesc);
    }
  }, [location.pathname, lang]);

  return null; // This component handles side effects only
}
