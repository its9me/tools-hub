import React, { useState, useEffect } from 'react';
import { BookOpen, Search, Sparkles, ChevronRight, ChevronLeft, Calculator, FileText, HeartPulse, Palette, ExternalLink, ShieldCheck, GraduationCap, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const ARTICLES = [
  {
    id: 'zakat-guide',
    cat: 'finance',
    icon: Calculator,
    titleAr: 'دليل حساب الزكاة الشرعية لعام 1447هـ - 2026م: الأنصبة، شروط الوجوب وكيفية الحساب الدقيق',
    titleEn: 'Comprehensive Islamic Zakat Guide: Nisab Benchmarks, Calculation Rules & Jurisprudence',
    readTimeAr: 'قراءة في 6 دقائق',
    readTimeEn: '6 min read',
    summaryAr: 'تفصيل فقهي وعام حول زكاة الأموال، عروض التجارة، نصاب الذهب والفضة، وشروط مرور الحول الهيدروجيني أو القمري بالتفصيل.',
    summaryEn: 'An in-depth legal study of Zakat on wealth, business assets, gold and silver Nisab requirements with real-world examples.',
    contentAr: `
الزكاة هي الركن الثالث من أركان الإسلام، وهي عبادة مالية فرضها الله سبحانه وتعالى لتطهير النفوس ومواساة الفقراء والمساكين. تكمن أهمية الحاسبة المخصصة للزكاة في تبسيط العمليات الحسابية المتداخلة وضمان أقصى درجات الدقة والتقوى عند إخراج الحق المعلوم.

### أولاً: شروط وجوب الزكاة في السمت الشرعي
لكي تجب الزكاة في أموال المسلم، لابد من استيفاء شروط شرعية محددة وهي:
1. **بلوغ النصاب**: وهو الحد الأدنى من المال الذي تفرض فيه الزكاة.
2. **مرور الحول**: أن يمر عام هجري كامل (354 يوماً) على ملكية النصاب في يد المزكي.
3. **الملك التام**: أن يكون المال مستقراً في يد صاحبه وتحت تصرفه الكامل.

### ثانياً: كيفية تقدير نصاب الذهب والفضة والعملات الورقية
* **نصاب الذهب**: يعادل شرعاً **85 جراماً** من الذهب الخالص (عيار 24)، أو ما يعادله قيمةً في عيار 21 و18.
* **نصاب الفضة**: يعادل شرعاً **595 جراماً** من الفضة الخالصة.
* **نصاب العملات النقدية**: يتم تقييم العملات الورقية بالاعتماد على نصاب الفضة أو الذهب (والأحظ للفقير وهو نصاب الفضة في الفتاوى المعاصرة لتدني قيمته مقارنة بالذهب). فإذا بلغت القيمة الإجمالية للمدخرات ما يعادل قيمة 595 جراماً من الفضة الفورية، وجب الحساب بعد مرور الحول.

### ثالثاً: المعادلة الحسابية المعتمدة
لحساب المقدار الواجب إخراجه (وهو ربع العشر أو 2.5%):
$$\\text{مقدار الزكاة} = \\text{المال الإجمالي الخاضع للزكاة} \\times 0.025$$
أو ببساطة تقسيم إجمالي المال على 40.

إن استخدام حاسبة الزكاة الذكية يتيح لك إدخال قيمة النقد المتوفر، غرامات الذهب والفضة الخاصة بك، وديونك المستحقة القبض، والالتزامات المالية والخصومات للحصول على تصفية دقيقة وفورية تواكب الموازنة الشرعية.
`,
    contentEn: `
Zakat constitutes the third pillar of Islam, representing a fundamental spiritual obligation designed to purify wealth and establish social equilibrium. Our computational tool automates these multi-layered and intricate calculations, guaranteeing precision.

### 1. Fundamental Prerequisites of Zakat (Eligibility)
For an individual's wealth to be subject to Zakat, specific conditions must simultaneously be met:
* **Absolute Ownership (Milkiyyah Tammah)**: The contributor must have full, unencumbered possession of the assets.
* **Minimum Threshold Value (Nisab)**: The cumulative wealth must exceed a critical value determined by gold or silver.
* **Maturity of Holding (Hawl)**: A consecutive lunar year must lapse while the assets remain above the Nisab.

### 2. Nisab Threshold Evaluation
In contemporary financial markets, Nisab is based on standard precious metal benchmarks:
* **Gold Benchmark**: Equivalent to **85 grams** of pure, 24-karat gold.
* **Silver Benchmark**: Equivalent to **595 grams** of pure silver.
* **Fiat Currency Conversion**: Contemporary Islamic jurisprudence typically recommends utilizing the silver standard as it extends broader charity to vulnerable communities.

### 3. The Mathematical Formula
Zakat is universally assessed at a fixed premium of **2.5%** (one-fortieth) of accumulated net assets:
$$\\text{Zakat Amount} = \\text{Total Eligible Net Assets} \\times 0.025$$

Using the specialized smart Zakat utility simplifies this process by deducting relevant short-term liabilities from your gross holdings automatically.
`
  },
  {
    id: 'bmi-science-guide',
    cat: 'health',
    icon: HeartPulse,
    titleAr: 'ما هو مؤشر كتلة الجسم (BMI): دليلك لتفسير الوزن المثالي، حرق الدهون والمخاطر الصحية',
    titleEn: 'Physical Body Mass Index (BMI) Demystified: Health Assessment and Category Classification',
    readTimeAr: 'قراءة في 5 دقائق',
    readTimeEn: '5 min read',
    summaryAr: 'دراسة شاملة حول كيفية حساب مؤشر كتلة الجسم بدقة وما هي الفروقات بين الرجال والنساء والمخاطر المترتبة على السمنة والنحافة.',
    summaryEn: 'An academic look at the biological significance of Body Mass Index calculation, limitations in muscular builds, and lifestyle tips.',
    contentAr: `
يعتبر **مؤشر كتلة الجسم (Body Mass Index - BMI)** أحد أكثر الأدوات الطبية العالمية استخداماً لتقدير كمية الدهون التقريبية في جسم الإنسان وتحديد مدى ملاءمة الوزن للطول.

### أولاً: كيف يتم حساب مؤشر كتلة الجسم رياضياً؟
تعتمد الحاسبة على معادلة عالمية موحدة ترتبط بالوزن (بالكيلوجرام) والطول (بالمتر):
$$\\text{BMI} = \\frac{\\text{الوزن بالتفصيل بالكيلوجرام}}{\\text{(الطول بالمتر)}^2}$$

### ثانياً: تفسير نتائج مؤشر كتلة الجسم (منظمة الصحة العالمية WHO)
تنقسم النتائج المسجلة سريرياً إلى التصنيفات التالية:
* **أقل من 18.5**: نحافة قد تتطلب مراجعة النمط الغذائي وصحة الهضم.
* **من 18.5 إلى 24.9**: وزن مثالي وصحي ومثالي جداً للنشاط البشري.
* **من 25 إلى 29.9**: زيادة في الوزن (مرحلة ما قبل السمنة).
* **30 فأكثر**: سمنة تتطلب الرعاية وتنظيم النشاط البدني لتقليص خطر الإصابة بالسكري وأمراض القلب الشريانية.

### ثالثاً: ما هي الاستثناءات الهامة؟
رغم الكفاءة العالية للـ BMI، إلا أنه لا يعمل كأداة تشخيص مطلقة في الحالات التالية:
1. **لاعبي كمال الأجسام والمحترفين**: تظهر لديهم قراءة عالية جداً (سمنة) بسبب الكثافة العضلية العالية وليس الدهون.
2. **النساء الحوامل والأطفال**: تتطلب فئاتهم مخططات مئوية مخصصة بالكامل لمواكبة التغير الفيزيولوجي الطبيعي للنمو وضغط السوائل الجسدية.
`,
    contentEn: `
**Body Mass Index (BMI)** serves as a widely accepted clinical screening instrument designed to quickly categorize an individual's weight relative to their height, helping predict potential risk factors for cardiometabolic health.

### 1. The Mathematical Formula representing BMI
The standard international equation utilizing metric values divides mass by the squared height of the human frame:
$$\\text{BMI} = \\frac{\\text{Weight (kg)}}{\\text{Height (m)}^2}$$

### 2. Standardized WHO Health Classifications
Clinical outputs yield structured physiological profiles categorized globally:
* **Underweight (< 18.5)**: Higher risks of nutritional deficiencies or underlying endocrine discrepancies.
* **Normal Weight (18.5 - 24.9)**: Correlates strongly with optimized metabolic wellness.
* **Overweight (25.0 - 29.9)**: Indicates moderate elevates in visceral adipose storage risks.
* **Obese (≥ 30.0)**: Poses direct epidemiological associations with Type 2 Diabetes, obstructive sleep apnea, and hypertension.

### 3. Limitations in Diagnostic Applicability
While BMI metrics provide extremely useful epidemiological statistics, they do not account for muscle density versus adipose distribution. High-performance athletes and bodybuilders frequently output high "obese" indexes despite exceptionally low true body fat percentages.
`
  },
  {
    id: 'contrast-accessibility-guide',
    cat: 'design',
    icon: Palette,
    titleAr: 'دليل تباين الألوان الاحترافي ومعايير WCAG لتصميم واجهات مستخدم مريحة للعين',
    titleEn: 'Color Contrast Theory & WCAG Compliance Guidelines for Designers and Developers',
    readTimeAr: 'قراءة في 8 دقائق',
    readTimeEn: '8 min read',
    summaryAr: 'كيف تساهم نسب التباين الصحيحة في تسهيل قراءة المواقع لضعاف البصر والمصابين بعمى الألوان لتلبية متطلبات محركات البحث المتطورة.',
    summaryEn: 'Understanding the algorithms of relative luminance under WCAG, minimum contrast targets, and accessible web color matching.',
    contentAr: `
تعد سهولة الوصول الرقمي (**Digital Accessibility**) من أهم معايير جودة المواقع الإلكترونية الحديثة. فالتصميم غير المتناسب لتباين الألوان لا يضر فقط بتجربة المستخدم، بل يؤدي لتصنيف منخفض لصفحاتك عبر محركات البحث ومراجعي Google Lighthouse.

### أولاً: ما هي معايير WCAG لتباين الألوان؟
تحدد مبادئ النفاذ إلى محتوى الويب (**WCAG 2.1**) مستويين رئيسيين لنسب التباين المقبولة:
1. **المستوى AA**: يتطلب تحقيق نسبة تباين لا تقل عن **4.5:1** للنصوص العادية، ونسبة **3:1** للنصوص الكبيرة والأيقونات.
2. **المستوى AAA**: وهو المستوى الأكثر صرامة، ويتطلب تباينًا لا يقل عن **7:1** للنصوص العادية، ونسبة **4.5:1** للنصوص الكبيرة.

### ثانياً: كيف يتم احتساب التباين؟
يعتمد الحساب على معادلة رياضية تحلل السطوع النسبي للون النص مقابل لون الخلفية:
$$L = 0.2126 \\times R + 0.7152 \\times G + 0.0722 \\times B$$
حيث يتم حساب التباين بقسمة السطوع النسبي للون الأفتح على لون الأغمق مضافاً إليهما قيمة تصحيح المسار الثابتة.

### ثالثاً: فوائد تلبية شروط التباين
* **تحسين تصفح المصابين بضعف الإبصار وعمى الألوان**: يمثلون أكثر من 8% من سكان العالم.
* **تجربة قراءة مميزة تحت ضوء الشمس الساطع**: تضمن استقرار ونمو بقاء الزوار داخل موقعك دون تعب للعين.
* **تحسين محركات البحث SEO**: تعطي خوارزميات جوجل الأولوية للمواقع الخالية من مشاكل التباين وضعف الخطوط لخدمة كافة فئات المستهلكين.
`,
    contentEn: `
Enforcing sufficient **Color Contrast** represents a fundamental pillar of modern inclusive Web Design. It ensures that digital interfaces remain completely legible to all individuals, including those with visual impairments.

### 1. WCAG 2.1 Color Contrast Classifications
The Worldwide Web Consortium (W3C) establishes concrete, rigorous mathematical grades:
* **AA Standard (Baseline Compliance)**: Demands a contrast threshold of **4.5:1** for standard paragraph text and **3:1** for stylized bold icons or display headings (size ≥ 18pt or 14pt bold).
* **AAA Standard (Premium Accessibility)**: Demands a contrast threshold of **7:1** for standard paragraph body text and **4.5:1** for larger header elements.

### 2. Relative Luminance Calculation Algorithms
Contrast calculations are derived by converting sRGB hues into linear relative luminance:
$$L = 0.2126 \\times R + 0.7152 \\times G + 0.0722 \\times B$$
This ratio translates closely with how the human eye interprets primary red, green, and blue light components differently.

### 3. Tangible SEO and Commercial Growth Outcomes
Beyond ethical considerations, search engines prioritize accessible interfaces. Sites suffering from poor text contrast trigger substantial high bounce rates and face direct index penalties inside Webmaster audits.
`
  },
  {
    id: 'diff-algorithms-guide',
    cat: 'developers',
    icon: FileText,
    titleAr: 'ما وراء كواليس حاسبة فروقات النصوص: كيف تعمل خوارزميات تتبع الأسطر والمطابقة؟',
    titleEn: 'Decoding Diff Algorithms: The Mathematics and Dynamic Programming Behind Text Comparisons',
    readTimeAr: 'قراءة في 7 دقائق',
    readTimeEn: '7 min read',
    summaryAr: 'فهم خوارزمية Myers وأطول تسلسل مشترك LCS لإيجاد التعديلات والإضافات البرمجية محلياً في المتصفح.',
    summaryEn: 'A deep dive into Longest Common Subsequence (LCS) matrix systems, memory constraints, and local comparison logic.',
    contentAr: `
يقابل المبرمجون يومياً أدوات الفروقات للتحقق من أسطر الكود وحل تضارب التعديلات (Merge Conflicts) في بروتوكولات مثل Git. تعتمد هذه الأدوات على خلفية رياضية شيقة لمعالجة البيانات دون المساس بأدائها.

### أولاً: مشكلة أطول تسلسل مشترك (Longest Common Subsequence - LCS)
للمقارنة بين نص أصلي ونموذج معدل، تسعى الأداة لتحديد الأجزاء المشتركة الأطول التي لم تتغير. وتعمل المعادلة على موازنة مصفوفة ثنائية الأبعاد لحساب تماثل الحروف أو الأسطر:
$$DP[i][j] = \\begin{cases} DP[i-1][j-1] + 1 & \\text{if } A[i] = B[j] \\\\ \\max(DP[i-1][j], DP[i][j-1]) & \\text{otherwise} \\end{cases}$$

### ثانياً: خوارزمية Myers وتكامل الأداء
تعد خوارزمية Myers المعيار الفعلي لمقارنات Git، حيث تبحث عن أقصر مسار تحرير (Shortest Edit Script) لتحويل الملف A للملف B بأقل عدد من العمليات البرمجية المتمثلة في الحذف (-) أو الإضافة (+).

### ثالثاً: الخصوصية المطلقة لمعالجة النصوص محلياً
في حاسبة **Text Diff Suite** التي قمنا بتصميمها، تجري جميع هذه الحسابات المعقدة داخل ميزان ذاكرة متصفحك مباشرة عن طريق لغة JavaScript. يعني هذا أن أكواد الإعدادات الخاصة ببيئات الإنتاج الصارمة ومفاتيح التطبيقات والـ API لا يتم إرسالها للإنترنت وتظل مشفرة في جهازك بشكل تام، مما يحميك من ثغرات تسريب البيانات أو اعتراضها عبر خوادم مجهولة المصدر.
`,
    contentEn: `
Analyzing changes between code files or checking document revisions relies on highly sophisticated computational concepts. Understanding these underlying processes reveals how tools compute changes without freezing user platforms.

### 1. The Longest Common Subsequence (LCS) Problem
At the core of direct text diff utilities is the LCS problem, resolved via dynamic programming matrices:
$$DP[i][j] = \\begin{cases} DP[i-1][j-1] + 1 & \\text{if } A[i] = B[j] \\\\ \\max(DP[i-1][j], DP[i][j-1]) & \\text{otherwise} \\end{cases}$$
The software uses this grid structure to trace matching components down the file, thereby locating exactly where insertions and deletions occurred.

### 2. Myers' Edit Graph Algorithm
Myers' algorithm models the comparison task as finding the shortest edit script (SES) in a graph, moving along diagonal matching lines to compute differences utilizing minimal O(ND) time constraints.

### 3. Securing Private Credentials Local to the User
By running Myers LCS algorithms entirely on client-side JS threads, your confidential API tokens, environment files, or proprietary intellectual scripts never leave your machine, preventing information leakage.
`
  },
  {
    id: 'gpa-academic-guide',
    cat: 'education',
    icon: GraduationCap,
    titleAr: 'دليل حساب المعدل التراكمي (GPA): كيف تحسب معدلك الجامعي والوزن الأكاديمي للمواد الفصولية',
    titleEn: 'Academic GPA Evaluation Blueprint: Weight Coefficients, Credit Values and Grade Multipliers',
    readTimeAr: 'قراءة في 7 دقائق',
    readTimeEn: '7 min read',
    summaryAr: 'تفصيل رياضي شامل لمعايير حساب المعدل الفصلي والتراكمي من فئة 4.0 و5.0 وكيف تؤثر الساعات المعتمدة على تقييم أداء الطالب.',
    summaryEn: 'An academic breakdown of cumulative grade assessment, weighting algorithms, and historical standard variations.',
    contentAr: `
يتم تمثيل الأداء الأكاديمي لطلاب التعليم العالي بالاعتماد على **المعدل الفصلي (SGPA)** و **المعدل التراكمي (CGPA)**. إن فهم الآلية الرياضية لتقدير هذه المقاييس يتيح للطلاب التخطيط المسبق لتأمين مقاعد دراسات عليا أو شروط منح متفوقة.

### أولاً: مفهوم الساعات المعتمدة (Credit Hours)
الساعات المعتمدة هي المعامل (Coefficient) الرياضي الذي يقدر ثقل ومجموع وقت المادة أسبوعياً. فمثلاً، مادة بوزن 3 ساعات معتمدة تؤثر على مجموع وفئات المعدل بثلاثة أضعاف مادة بوزن ساعة واحدة فقط.

### ثانياً: كيفية التحويل من التقدير الحرفي إلى قيمة النقاط
تعتمد الجامعات سلم نقاط موحد، وفيما يلي ترتيب النقاط للنظام الرباعي (4.0 Scale) الشهير:
* **الأمتياز المرتفع (A+)**: يعادل 4.0 نقاط.
* **الأمتياز (A)**: يعادل 3.75 نقطة.
* **جيد جداً مرتفع (B+)**: يعادل 3.5 نقطة.
* **جيد جداً (B)**: يعادل 3.0 نقاط.
* **جيد مرتفع (C+)**: يعادل 2.5 نقطة.
* **جيد (C)**: يعادل 2.0 نقطة.

### ثالثاً: المعادلة الرياضية للمعدل الفصلي والتراكمي
يتم حساب المعدل في المتصفح باستخدام ضرب ضربي لكل مادة:
$$\\text{المعدل} = \\frac{\\sum (\\text{نقاط المادة} \\times \\text{ساعاتها المعتمدة})}{\\sum \\text{مجموع الساعات المعتمدة}}$$

على سبيل المثال، إذا سجل الطالب مادتين في الفصل الدراسي:
1. مادة الرياضيات (3 ساعات معتمدة) وحصل فيها على امتياز (4.0 نقاط).
2. مادة الفيزياء (4 ساعات معتمدة) وحصل فيها على جيد جداً (3.0 نقاط).
يكون مجموع النقاط المرجحة = $(3 \\times 4.0) + (4 \\times 3.0) = 12 + 12 = 24$.
مجموع الساعات الكلية = $3 + 4 = 7$ ساعات.
المعدل الفصلي = $24 / 7 = 3.42$ من 4.0.

إن حاسبة المعدل الأكاديمي لدينا تتيح لك إدخال معدلك السابق التراكمي ونقاط المواد الحالية لتحديث مستواك لحظياً ودون أخطاء بشرية.
`,
    contentEn: `
Universal higher-education institutions assess student proficiency via the **Grade Point Average (GPA)** standard. Demystifying the weight parameters allows scholars to forecast academic achievements and project competitive graduate applications.

### 1. The Core Variable: Credit Hours
A Class credit hour represents the mathematical coefficient reflecting the curriculum load. Therefore, a specialized course weighted at 4 credits carries four times the gravity of a 1-credit course during cumulative weight distributions.

### 2. Conversions to Point Values (4.0 Evaluation Scale)
Standardized point mapping maps direct letter grades to grade points:
* **Grade A+ (Distinction)**: Yields a point value of **4.0**
* **Grade B+ (Very Good High)**: Yields a point value of **3.5**
* **Grade B (Very Good)**: Yields a point value of **3.0**
* **Grade C (Good)**: Yields a point value of **2.0**

### 3. Cumulative Computational Equation
Calculating academic GPA involves dividing total achieved point-products by overall registered hours:
$$\\text{GPA} = \\frac{\\sum (\\text{Grade Points} \\times \\text{Credit Hours})}{\\sum \\text{Total Credit Hours}}$$

Deploying this dynamically inside the GPACalculator ensures that rounding errors are avoided, allowing complex semester trajectories to be structured instantly.
`
  },
  {
    id: 'compound-interest-guide',
    cat: 'finance',
    icon: TrendingUp,
    titleAr: 'قوة النماء الأسّي وعلم الفائدة المركبة: كيف تساهم الرياضيات في تخطيط الثروات المستدامة؟',
    titleEn: 'The Geometry of Exponential Compounding: Mathematical Models for Wealth Development',
    readTimeAr: 'قراءة في 6 دقائق',
    readTimeEn: '6 min read',
    summaryAr: 'شرح رياضي مبسط وجريء لمعادلة الفوائد والادخار المركب، والفرق المالي الهائل بين النماء الخطي والنمو المركب المتسارع.',
    summaryEn: 'An empirical examination of compounding intervals, geometric growth algorithms, and long-term capital forecasting rules.',
    contentAr: `
أطلق عالم الفيزياء الشهير ألبرت أينشتاين على **الفائدة المركبة** وصف "الأعجوبة الثامنة في العالم"، حيث يتعدى أثرها المالي كل الحسابات التقليدية البسيطة عبر تحويل الأرباح إلى أصول تولد أرباحاً إضافية في حلقة نمو مغلقة.

### أولاً: الفرق الحاسم بين الفائدة البسيطة والمركبة
* **الفائدة البسيطة**: يحسب العائد فيها فقط على رأس المال الأساسي المستثمر طيلة الفترة الزمنية دون تغير في قيمة الأصل.
* **الفائدة المركبة**: يتم دمج الأرباح الدورية المحققة وإعادة إضافتها إلى رأس المال الأصلي بشكل دوري، مما يجعل تضاعف رأس المال أسرع وأكثر مرونة بمرور السنين.

### ثانياً: المعادلة الرياضية للفائدة المركبة
المعادلة الرسمية المعتمدة لحساب القيمة المستقبلية الإجمالية للمبلغ المدخر هي:
$$A = P \\left(1 + \\frac{r}{n}\\right)^{nt}$$
حيث تمثل الرموز التالية:
* **$A$**: القيمة المستقبلية الإجمالية للمال بالتعديل.
* **$P$**: رأس المال الأولي المستثمر (Principal).
* **$r$**: معدل العائد السنوي كنسبة مئوية عشريّة.
* **$n$**: عدد فترات إضافة وتدقيق الأرباح بالسنة (شهري، ربع سنوي، سنوي).
* **$t$**: عدد السنوات الإجمالية للاستثمار المستقر.

### ثالثاً: تأثير تكرار احتساب الفوائد
كلما زاد عدد فترات الإضافة في السنة ($n$)، زاد معدل نمو رأس المال تسارعاً. فمثلاً حساب الفائدة المضافة شهرياً يدر عائدًا كليًا أكبر بكثير من حسابها السنوي العادي لنفس رأس المال ونسبة الأرباح المعتمدة.

تسعى حاسبتنا المالية لتسهيل تفكيك هذه المتغيرات وبثها بيانيًا لتدعم خطط مدخرات التقاعد أو تسديد القروض بدقة متناهية.
`,
    contentEn: `
In financial mathematics, **Compounding Interest** represents a geometric series where earnings generated on top of initial capital are systematically reinvested to yield further interest over time.

### 1. Linear vs. Exponential Accumulation
* **Simple Interest**: Generates profits solely on the baseline investment value, growing linearly.
* **Compound Interest**: Periodically integrates accrued earnings back into the core principal, producing exponential capital acceleration profiles.

### 2. Standard Thermodynamic Calculation Formula
The universal equation for compound interest projection is defined as follows:
$$A = P \\left(1 + \\frac{r}{n}\\right)^{nt}$$
Where:
* **$A$**: Ultimate accumulated total balance.
* **$P$**: Initial baseline capital (Principal).
* **$r$**: Annual interest rate (coefficient).
* **$n$**: Reinvestment compounding frequency per year.
* **$t$**: Total duration computed in full years.

Our interactive Compound Interest modeling suite handles these dynamic exponents instantly, giving you comprehensive charts detailing active asset growth curves.
`
  },
  {
    id: 'calorie-burn-guide',
    cat: 'health',
    icon: HeartPulse,
    titleAr: 'الديناميكا الحرارية لجسم الإنسان: معادلات التمثيل الغذائي (BMR) وحساب الطاقة اليومية بدقة',
    titleEn: 'Human Thermodynamics Demystified: BMR Metabolic Formulas and Calories Balance Study',
    readTimeAr: 'قراءة في 8 دقائق',
    readTimeEn: '8 min read',
    summaryAr: 'كيف يقدر جسمك الطاقة المستهلكة في حالة السكون التام وما هو أثر النشاط البدني والمجهود على معدلات حرق السعرات اليومية الحقيقية.',
    summaryEn: 'An analytical scientific review of daily energy consumption, BMR baselines, and weight alteration mechanisms.',
    contentAr: `
يعتمد بقاء الكائنات الحية ونشاطها اليومي على استهلاك الطاقة الكيميائية الكامنة في المغذيات وتحويلها إلى طاقة حركية وحرارية زمرية. لفهم كيفية إدارة الوزن وسرعة التمثيل الغذائي، يجب دراسة وحساب مستويات الطاقة المستهلكة بدقّة.

### أولاً: حساب معدل الأيض الأساسي (Basal Metabolic Rate - BMR)
الـ BMR هو كمية الطاقة التي يحرقها جسمك للبقاء على قيد الحياة وتأمين عمل الرئتين، القلب ودورات الدماغ تحت ظروف السكون التام وبدون مجهود حركي أو هضمي.
توفر العلوم الرياضية معيار **Harris-Benedict** المحدث لتقدير هذا المعدل:
* **للذكور**:
$$BMR = 88.362 + (13.397 \\times \\text{الوزن بالتفصيل كجم}) + (4.799 \\times \\text{الطول سم}) - (5.677 \\times \\text{العمر بالسنوات})$$
* **للإناث**:
$$BMR = 447.593 + (9.247 \\times \\text{الوزن بالتفصيل كجم}) + (3.098 \\times \\text{الطول سم}) - (4.330 \\times \\text{العمر بالسنوات})$$

### ثانياً: حساب احتياج الطاقة الكلي اليومي (TDEE)
لتحديد إجمالي السعرات التي تستهلكها في يومك مع المجهود الحركي، نقوم بضرب الـ BMR في معامل النشاط البدني (Activity Factor):
1. **خامل (مكتب وركون)**: $BMR \\times 1.2$
2. **نشاط خفيف (تمرين بسيط 1-3 أيام)**: $BMR \\times 1.375$
3. **نشاط متوسط (تمرين شاق 3-5 أيام)**: $BMR \\times 1.55$
4. **نشاط عالي جداً (رياضة يومية ومجهود بدني جاف)**: $BMR \\times 1.725$

### ثالثاً: إدارة الميزان الغذائي
* **إنقاص الوزن**: تستهلك سعرات حرارية أقل بقيمة 300 إلى 500 سعرة حرارية من قيمة الـ TDEE الفعلي الخاص بك.
* **زيادة الوزن والكتلة**: تضيف فائض سعرات يتراوح بين 300 إلى 500 سعرة حرارية لتحفيز البناء النسيجي العضلي.

يسهل تطبيق حساب السعرات التفاعلي هذه الخطوات لنيل حياة متوازنة وصحية مبنية على لغة الأرقام.
`,
    contentEn: `
Biological systems operate on metabolic systems that convert carbohydrate, protein, and lipid molecules into chemical energy (ATP). Understanding how to calculate this energy balance is the essential step toward managing total weight and target physical metrics.

### 1. Evaluating Basal Metabolic Rate (BMR)
Your BMR represents the threshold quantity of energy required to sustain vital organ functionality (respiration, cardiac cycles, cellular repairs) in a thermoneutral environment at absolute physical rest.
Modern calculators implement the revised **Harris-Benedict equation**:
* **For Men**:
$$BMR = 88.362 + (13.397 \\times \\text{Weight in kg}) + (4.799 \\times \\text{Height in cm}) - (5.677 \\times \\text{Age in years})$$
* **For Women**:
$$BMR = 447.593 + (9.247 \\times \\text{Weight in kg}) + (3.098 \\times \\text{Height in cm}) - (4.330 \\times \\text{Age in years})$$

### 2. Computing Total Daily Energy Expenditure (TDEE)
To evaluate your dynamic physical footprint, baseline BMR is multiplied by weight multipliers corresponding to daily lifestyle parameters:
* **Sedentary Desk Job**: $BMR \\times 1.2$
* **Moderately Active (Sports 3-5 Days/week)**: $BMR \\times 1.55$
* **Athlete Level (Demanding Manual Labor)**: $BMR \\times 1.725$

Using our integrated nutritional tools allows you to maintain stable target balance tracking client-side with full precision.
`
  },
  {
    id: 'qibla-math-guide',
    cat: 'finance',
    icon: Calculator,
    titleAr: 'حساب اتجاه القبلة علمياً: هندسة زوايا السمت الكروية وإتجاه الشمال المغناطيسي والتقويم الفلكي',
    titleEn: 'The Geometry of Qibla Mathematics: Great-Circle Calculations and Geodesic Bearing Formulae',
    readTimeAr: 'قراءة في 5 دقائق',
    readTimeEn: '5 min read',
    summaryAr: 'شرح فلكي ورياضياتي لكيفية موازنة خطوط الطول والعرض للوصول إلى زاوية السمت الدقيقة لمكة المكرمة كروياً.',
    summaryEn: 'An exploration of spherical trigonometry, latitude coordinates, and magnetic variance calculating geographical heading.',
    contentAr: `
أن صياغة تطبيق حاسب اتجاه القبلة تعتمد على مادة علمية متطورة تسمى **علم الهندسة الكروية (Spherical Trigonometry)**، وهي فرع من الرياضيات يتعامل مع المثلثات المرسومة على أسطح المجسمات الكروية مثل كوكب الأرض بدلاً من السطوح المستوية العادية.

### أولاً: إحداثيات المواقع وبنية المسار الدائري الأعظم
تعرف الكعبة المشرفة في مكة المكرمة بإحداثيات كونية ثابتة ومستقرة:
* **خط عرض مكة ($\\phi_k$)**: $21.4225^\\circ$ شمالاً (N).
* **خط طول مكة ($\\lambda_k$)**: $39.8261^\\circ$ شرقاً (E).

تتطلع الحاسبة لاستقبال خطوط عرضك وطولك الحاليين تمهيداً لحساب خط الطول الفاصل بين موقعك الحالي ومكة المكرمة:
$$\\Delta \\lambda = \\lambda_k - \\lambda_{\\text{current}}$$

### ثانياً: معادلة حساب اتجاه السمت (Azimuth Heading)
يتم حساب زاوية السمت (القبلة من الشمال الجغرافي) بالمعادلة الكروية التالية:
$$q = \\operatorname{atan2}\\left(\\sin(\\Delta \\lambda), \\cos(\\phi_{\\text{current}}) \\tan(\\phi_k) - \\sin(\\phi_{\\text{current}}) \\cos(\\Delta \\lambda)\\right)$$
هذه المعادلة الدقيقة تعطي اتجاه السمت الحقيقي لقبلتك بالدرجات من اتجاه الشمال باتجاه عقارب الساعة للوصول لزاوية آمنة.

### ثالثاً: أهمية حساب الزاوية بدقة
* **تجاوز التشوهات الخرائطية**: إن استخدام الخرائط المسطحة العادية (مثل إسقاط ميركاتور) قد يوحي باتجاه قبلة خاطئ وغير منطقي، في حين أن المسار الدائري الأعظم المعتمد في التطبيق يصحح الخطأ الحسابي تماماً ويناسب الكروية الحقيقية للأرض.
* **الفرق بين الشمال الجغرافي والشمال المغناطيسي**: تواجه البوصلات تداخلاً بسبب المجال المغناطيسي المتغير كروياً (Magnetic Declination). يتميز الفلك الذكي هنا بأنه يربط الإحداثيات لتأكيد مسار قطب الأرض الجغرافي الحقيقي لحرية تامة في العبادات.
`,
    contentEn: `
Determining geodesic headings on an ellipsoid sphere like planet Earth requires **Spherical Trigonometry**. Modern software calculates the directional bearing of the Great-Circle line pointing back directly toward the Kaaba in Makkah.

### 1. Core Geographical Benchmarks
The Kaaba benchmark values are globally standardized:
* **Kaaba Latitude ($\\phi_k$)**: $21.4225^circ$ North
* **Kaaba Longitude ($\\lambda_k$)**: $39.8261^circ$ East

Using these parameters, we evaluate the longitude variance against your user geolocation coordinates:
$$\\Delta \\lambda = \\lambda_k - \\lambda_{\\text{current}}$$

### 2. Geodesic Azimuth Angle Equation
To calculate the bearing direction from geo-north (clockwise azimuth), we utilize the standard 'atan2' mathematical function:
$$q = \\operatorname{atan2}\\left(\\sin(\\Delta \\lambda), \\cos(\\phi_{\\text{current}}) \\tan(\\phi_k) - \\sin(\\phi_{\\text{current}}) \\cos(\\Delta \\lambda)\\right)$$

The dynamic client-side processor handles these math algorithms seamlessly to yield instantaneous directional paths on a compass.
`
  },
  {
    id: 'loan-math-guide',
    cat: 'finance',
    icon: TrendingUp,
    titleAr: 'دليل جدولة سداد القروض وبنية الأقساط: معادلات الفائدة المتناقصة وهندسة التمويل الشخصي',
    titleEn: 'Decoupling Debt Amortization Schedules: Mathematical Models for Loans and Diminishing Interests',
    readTimeAr: 'قراءة في 8 دقائق',
    readTimeEn: '8 min read',
    summaryAr: 'تفصيل رياضي دقيق لكيفية حساب القسط الشهري الثابت وتوزيع الدفعة بين سداد أصل القرض والفوائد المتناقصة عبر الزمن.',
    summaryEn: 'An academic analysis of amortization formulas, interest rate conversions, and debt payoff optimization algorithms.',
    contentAr: `
عندما يتقدم الفرد لطلب تمويل شخصي أو عقاري، يتم تنظيم آلية السداد وفق ما يُعرف برياضياً باسم **جدول الإطفاء (Amortization Schedule)**. يوزع هذا الجدول الأقساط الشهرية بطريقة ذكية تغطي كلاً من الفائدة وأصل الدين.

### أولاً: حساب القسط الشهري الثابت (Equated Monthly Installment - EMI)
يتم حساب القسط الشهري الثابت بالاعتماد على صيغة الفائدة المتناقصة باستخدام المعادلة الرياضية التالية:
$$EM = P \\times \\frac{r(1+r)^n}{(1+r)^n - 1}$$
حيث تمثل الرموز المالية ما يلي:
* **$EM$**: قيمة القسط الشهري الثابت المطلوب سداده.
* **$P$**: القيمة الإجمالية لأصل القرض الأساسي (Principal).
* **$r$**: معدل الفائدة الشهري (وهو الفائدة السنوية مقسومة على 12 شهراً، معبراً عنها كرقم عشري).
* **$n$**: إجمالي عدد الأقساط الشهرية (فترة السداد بالأشهر).

### ثانياً: كيفية توزيع القسط بين أصل القرض والفوائد
على الرغم من ثبات قيمة القسط الشهري ($EM$) طيلة فترة القرض، إلا أن نسب توزيعه تتغير داخلياً على النحو التالي:
1. **جزء الفائدة (Interest Portion)**: يتم احتسابه بضرب رصيد القرض المتبقي في ذلك الشهر بمعدل الفائدة الشهري ($r$). وبالتالي، يكون جزء الفائدة في الأقساط الأولى كبيراً جداً، ثم يتناقص تدريجياً مع تراجع رصيد القرض المتبقي.
2. **جزء أصل القرض (Principal Portion)**: وهو الجزء المتبقي من القسط الذي يذهب لتخفيض أصل الدين الفعلي، ويساوي:
$$\\text{مسدد أصل الدين} = EM - \\text{جزء الفائدة}$$

### ثالثاً: أهمية فهم الفائدة المتناقصة مقارنة بالفائدة الثابتة
تخدع الفائدة الثابتة (Flat Rate) المقترضين في بعض الأحيان، حيث تظهر بنسبة أقل من الفائدة المتناقصة (Reducing Rate) ظاهرياً، إلا أنها تحسب الأرباح على كامل المبلغ الأساسي طيلة الفترة دون اعتبار لتسديد أجزاء منه، مما يرفع التكلفة الإجمالية الحقيقية للتمويل.

تساعدك حاسبة القروض الذكية المدمجة لدينا على تعرية هذه الأرقام وفهم كلفة التمويل الدقيقة وإنشاء جدول إطفاء فوري يظهر تراجع أصل الدين شهراً بشهر.
`,
    contentEn: `
When executing personal or corporate debt strategies, amortization structures define how structured financial payments systematically distribute between dynamic interests and the underlying loan principal.

### 1. The Fixed Monthly Installment Amortization Formula (EMI)
Financial computing systems evaluate continuous monthly repayments using the standard amortization equation:
$$EM = P \\times \\frac{r(1+r)^n}{(1+r)^n - 1}$$
Where:
* **$EM$**: Fixed Monthly Equated Repayment installment.
* **$P$**: Core borrowed capital sum (Principal).
* **$r$**: Periodic monthly rate (annual interest divider by 12, as a decimal).
* **$n$**: Total number of structured monthly payment cycles.

### 2. Distributing Payments Between Interest and Principal
While the cumulative monthly outflow remains constant, the balance composition is dynamic:
* **Interest Reduction**: Computed directly on the outstanding remaining principal. Early schedules heavily feature interest overheads.
* **Capital Depreciation**: Computed as the remaining offset of the installment, directly lowering the overall debt layer.

Our comprehensive Loan Calculation platform automates this amortization sequence, providing transparent tables that demonstrate exactly how debt diminishes of over time.
`
  },
  {
    id: 'hydration-science-guide',
    cat: 'health',
    icon: HeartPulse,
    titleAr: 'علم الهيدرات ووظائف الخلايا: كيف تحسب احتياجك اليومي من الماء بناء على المتغيرات الحيوية والمجهود',
    titleEn: 'Cellular Hydration Physiology: Scientific Methods for Calculating Optimal Daily Water Requirements',
    readTimeAr: 'قراءة في 6 دقائق',
    readTimeEn: '6 min read',
    summaryAr: 'كيف ينظم الجسم الضغط الأسموزي وتوازن السوائل، والصيغ الطبية لحساب كمية الماء المثالية لتفادي الجفاف وتحسين التمثيل الغذائي.',
    summaryEn: 'An academic study on fluid exchange, physiological water consumption formulas, and external climate adjusters.',
    contentAr: `
الماء هو عصب الحياة وسيتوبلازم الخلايا الحية. يمثل الماء ما بين 55% إلى 60% من كتلة جسم الإنسان البالغ، ويلعب دوراً مصيرياً في نقل المواد الغذائية، ضبط حرارة السوائل الجسدية، وتشحيم المفاصل.

### أولاً: آلية فقدان وبناء توازن السوائل (Osmotic Homeostasis)
يفقد الجسم السوائل والترطيب باستمرار عبر التنفس، التعرق، والإخراج البولي. لمواكبة هذا الفقد، يفرز الدماغ هرمونات لتوليد الشعور بالعطش. ولكن الاعتماد على العطش وحده قد لا يكون كافياً لتجنب مستويات الجفاف الخفيف (Mild Dehydration) التي تؤدي لضعف التركيز وآلام الرأس.

### ثانياً: الصيغة الطبية القياسية لحساب كمية المياه الأساسية
تعتمد الصيغة القياسية للعلماء والمنظمات الصحية لتحديد كمية الماء اليومية الأساسية بناءً على وزن الجسم:
$$\\text{كمية الماء (مل)} = \\text{الوزن (كيلوجرام)} \\times 35$$
على سبيل المثال، للشخص الذي يزن 70 كجم:
$$70 \\times 35 = 2450 \\text{ مل} \\quad (\\text{أي حوالي 2.45 لتر يومياً})$$

### ثالثاً: معاملات ضبط البيئة والنشاط البدني
يتطلب الحساب تكييف الصيغة وفق معاملات مضافة:
1. **المجهود البدني والتمرين**: يضاف **350 مل** لكل 30 دقيقة تمرين قاسي أو نشاط معزز للتعرق.
2. **الطقس والمناخ الخارجي**: في البيئات شديدة الحرارة أو الجافة يوصى بإضافة **500 مل** إلى **1000 مل** للحفاظ على استقرار نشاط الكلى.

تأتي حاسبة السوائل لدينا لتجمع هذه البيانات وتسهل تتبع احتياجك الحقيقي لضمان كفاءة وصحة كاملة لجهازك الدوري والتنفسي.
`,
    contentEn: `
Water sustains intracellular structures and guides metabolic reactions. Composing approximately 60% of adult body mass, fluid regulation represents a physiological process managed closely by hypothalamic sensing.

### 1. Cellular Water Exchange Mechanics
The human body continuously depletes water volume via respiration, skin vapor, and gastrointestinal output. Waiting until thirst is felt is chemically delayed; subtle dehydration triggers cognitive fatigue and lower kidney filtration rates.

### 2. Standard Quantitative Hydration Formulas
To calculate baseline water requirements, physiologists implement weight coefficients:
$$\\text{Water Target (ml)} = \\text{Weight (kg)} \\times 35$$
For a person weighing 80 kilograms:
$$80 \\times 35 = 2800 \\text{ ml} \\quad (\\text{approx. 2.8 Liters per day})$$

### 3. Modifying Coefficients for Athletics and Climate
The biological target dynamically increases with metabolic changes:
* **Physical Exertion**: Supplement **350 ml** for every consecutive 30-minute interval of intense cardiovascular muscular work.
* **High Ambient Temperature**: Supplement **500 - 1000 ml** depending on sweat rate and relative humidity profiles.

Using our scientific hydration calculator automatically factors in exercise length and climatic adjustments to support metabolic wellness.
`
  },
  {
    id: 'gold-karat-finance-guide',
    cat: 'finance',
    icon: Calculator,
    titleAr: 'رياضيات ونقاء سبائك الذهب: كيف تحسب القيمة الصافية للعيارات والتسعير الشرائي والصياغة',
    titleEn: 'Evaluating Gold Alloy Purity and Karats: Mathematical Guidelines for Jewelry Pricing and Valuation',
    readTimeAr: 'قراءة في 7 دقائق',
    readTimeEn: '7 min read',
    summaryAr: 'كيف يتم قياس نقاء الذهب عالمياً وعلاقة ذلك بنسب المعادن المضافة وحساب سعر قطعة الذهب بالمصنعية بدقة متناهية.',
    summaryEn: 'An industry overview of golden percentages, karat mathematical systems, and factoring production overheads.',
    contentAr: `
يُعرف الذهب تاريخياً ومالياً بأنه الملاذ الآمن الأكثر استقراراً وقوة لحفظ قيمة المدخرات عبر القرون. عند التعامل بالذهب، سواء بغرض الاستثمار أو الزينة، يجب الإلمام بنظام حساب الحيازة العياري ونسب نقاء السبائك بدقة.

### أولاً: النظام الرياضي لحساب عيارات الذهب
يتم قياس نقاء الذهب بالاعتماد على **نظام الأربعة وعشرين قيراطاً (24 Karats Scale)**. يُقصد بالذهب ذو عيار 24 أنه ذهب نقي وصافي بنسبة تقارب 99.9%، بينما تحتوي العيارات الأدنى على خليط من معادن أخرى مثل النحاس والفضة لزيادة صلابة القطعة وتسهيل تشكيلها.

صيغة حساب نسبة الذهب الصافي في أي عيار هي:
$$\\text{نسبة الذهب} = \\frac{\\text{رقم العيار}}{24}$$

تطبيقات هذه النسبة على العيارات الشائعة:
* **عيار 22**: يحتوي على $22 / 24 = 91.6\\%$ من الذهب الخالص.
* **عيار 21**: يحتوي على $21 / 24 = 87.5\\%$ من الذهب الخالص.
* **عيار 18**: يحتوي على $18 / 24 = 75.0\\%$ من الذهب الخالص.

### ثانياً: كيفية حساب السعر الحقيقي لقطعة الذهب بالمصنعية
يقع الكثير من المشترين في حيرة من أمرهم بسبب عدم معرفة كلفة الصياغة والمصنعية المضافة وضريبة القيمة المضافة. وتوفر الحاسبة النموذجية المعادلة التالية لحل هذه العقدة:
$$\\text{السعر الإجمالي لقطعة الذهب} = \\left( \\text{الوزن بالجرام} \\times \\text{سعر جرام العيار اليومي} \\right) + \\text{أجور المصنعية وصناعة الصائغ} + \\text{الضرائب المطبقة}$$

### ثالثاً: كيف تحدد قيمة الاستثمار الأمثل؟
إذا كان غرضك الأساسي هو الادخار للمستقبل والاستثمار طويل المدى، فإن شراء **السبائك الذهبية (Gold Bullion)** أو **الجنيهات الذهبية** من عيار 24 يعد الخيار الأذكى والأوفر، نظراً لانخفاض أجر المصنعية المفروض عليها عند الشراء بشكل هائل مقارنة بالمشغولات والحلي الفنية المكتظة بالأشكال البصرية والأرباح والضرائب.

تتيح لك حاسبة الذهب الذكية في موقعنا متابعة وتطبيق هذه المعاملات وتحديث فروقات العيارات للحفاظ على سلامة أوقياتك المالية.
`,
    contentEn: `
Gold has maintained its historic value status across centuries of financial systems. In both physical investing and consumer transactions, understanding karat purities and standard merchant margins helps protect capital purchases.

### 1. The Mathematics of Karat Metrics
Purity scales standardize pure gold around a baseline value of **24 Karats**. This metrics means a 24k bar contains 99.9% pure golden element. Downward values signify that copper, silver, or zinc alloy additives have been mixed to improve resilience.

The exact purity calculation behaves as follows:
$$\\text{Purity Percentage} = \\frac{\\text{Karat Rating}}{24}$$

Practical results yields these precise ratios:
* **22 Karat Gold**: Yields $22 / 24 = 91.6\\%$ metal purity.
* **21 Karat Gold**: Yields $21 / 24 = 87.5\\%$ metal purity.
* **18 Karat Gold**: Yields $18 / 24 = 75.0\\%$ metal purity.

### 2. Computing Complete Purchase Costs
To evaluate retail quotes, consumers must break down raw gold weight, standard merchant markups, and local taxation:
$$\\text{Total Price} = \\left( \\text{Weight in Grams} \\times \\text{Karat Gram Price} \\right) + \\text{Making Charges} + \\text{Applicable Taxes}$$

Our Gold Purity calculation system handles these conversions instantly client-side, enabling safe asset tracking in real-time.
`
  },
  {
    id: 'typing-speed-guide',
    cat: 'education',
    icon: BookOpen,
    titleAr: 'العلوم الإدراكية لسرعة الرقن والطباعة: حساب الكلمات بالدقيقة (WPM) والذاكرة الحركية',
    titleEn: 'The Cognitive Science of Typing Velocity: WPM Metrics, Muscle Memory, and Spatial Kinematics',
    readTimeAr: 'قراءة في 6 دقائق',
    readTimeEn: '6 min read',
    summaryAr: 'دليل تطبيقي وعلمي يوضح كيف تتشكل الذاكرة العضلية أثناء الطباعة باللمس، وكيف يقيس اختبار سرعة الكتابة معدل الأخطاء والمعدل الصافي.',
    summaryEn: 'An educational dive into tactile response loops, neuro-muscular spatial mapping, and structural WPM calculation formulas.',
    contentAr: `
تعد مهارة الطباعة باللمس (Touch Typing) واحدة من أهم المهارات الإنتاجية في العصر الرقمي الحديث. إن ممارسة مهارة الكتابة السريعة ودراسة الآلية العلمية لتطورها تساهم بشكل مباشر في صقل وقت العمل الإبداعي وتقليل التعب الذهني والجسدي المصاحب لاستخدام الحواسب تلقائياً.

### أولاً: كفاءة الذاكرة الحركية وسرعة تدفق الإشارات (Muscle Memory)
عند البدء بتعلم الطباعة من دون النظر للوحة المفاتيح (Keyboard)، يبني الفص الجداري في الدماغ خريطة مكانية كاملة للأزرار. بمرور الوقت مع التمارين المستمرة، يتحول التركيز من "أين يقع الحرف؟" إلى الكلمة المطلوبة ككل، حيث تتولى الذاكرة العضلية إرسال الأوامر الحركية للأصابع مباشرة وبسرعة هائلة ودقة مستقرة.

### ثانياً: المعادلة الحسابية لسرعة الطباعة (WPM)
يتم احتساب سرعة الطباعة بمقياس **الكلمات في الدقيقة (Words Per Minute - WPM)**. وفي عالم القياسات، لا تعتبر "الكلمة" مدخلاً لغوياً عشوائياً، بل تساوي برمجياً وتاريخياً مصفوفة من خمسة نقرات تعبيرية (5 Keystrokes) تشمل الفراغات وعلامات الترقيم.

المصطلحات الرياضية لحساب السرعة:
1. **الكلمات الإجمالية (Gross WPM)**:
$$Gross\\ WPM = \\frac{\\text{إجمالي النقرات} / 5}{\\text{الوقت المستغرق بالدقائق}}$$

2. **الكلمات الصافية (Net WPM)**: وهي المقياس الحقيقي الذي نعتمد عليه في تطبيقنا، حيث يخصم الأخطاء لضمان الدقة والأمانة العلمية:
$$Net\\ WPM = Gross\\ WPM - \\frac{\\text{الأخطاء غير المصححة}}{\\text{الوقت المستغرق بالدقائق}}$$

### ثالثاً: جودة الجلسة المريحة وصحة الكتابة
لا يمكن تطوير سرعة طباعة صحية ومتفوقة دون الاهتمام بزوايا الجلوس:
* حافظ على استقامة الظهر بزاوية 90 درجة مع الأرض.
* اجعل المعصمين في وضع مواز للوحة المفاتيح لتجنب الضغط على نفق الرسغ (Carpal Tunnel).
* قم بتدريب أصابع اليدين العشرة بالكامل بدلاً من الاعتماد على إصبعين أو ثلاثة لتقليل العبء الكلي وتوليد الإيقاع الموحد.

يوفر اختبار سرعة الكتابة المتاح لدينا واجهة تلوين بصرية متقاطعة وتفاعلية لمساعدتك في قياس وتحرير كفاءتك الإنتاجية ومعدل تقدمك بدقة.
`,
    contentEn: `
Tactile response and motor coordination form the baseline of interface communication. Touch Typing represents an essential modern cognitive skill where finger routing becomes automatic, maximizing creative feedback.

### 1. Neuro-Muscular Spatial Mapping (Muscle Memory)
As individuals practice typing, the brain builds an internal spatial map of layout configurations. Repetition establishes deep somatic reflex loops, eliminating visual eye movements and shifting concentration strictly to creative language outputs.

### 2. Standardized Word-per-Minute Computational Formula (WPM)
While typical language counts words based on spaces, typing standards define a "Word" as an arbitrary five keystroke string (including spaces and punctuation).

Math metrics evaluate speed parameters:
* **Gross WPM Protocol**:
$$Gross\\ WPM = \\frac{\\text{Cumulative Keystrokes} / 5}{\\text{Time elapsed in minutes}}$$

* **Net WPM Protocol**: Subtracts error frequencies to measure absolute performance:
$$Net\\ WPM = Gross\\ WPM - \\frac{\\text{Uncorrected Error Count}}{\\text{Time elapsed in minutes}}$$

Our custom test metrics analyze active input streams dynamically, providing interactive visual feedback to speed up typing efficiency.
`
  },
  {
    id: 'zakat-sharia-guide',
    cat: 'finance',
    icon: Calculator,
    titleAr: 'فقه ورياضيات الزكاة الشرعية: دليل حساب النصاب، تقييم الأصول وتوزيع الفريضة المالية',
    titleEn: 'Feqh and Mathematical Framework of Zakat: Wealth Thresholds (Nisab), Valuation Rules and Asset Types',
    readTimeAr: 'قراءة في 8 دقائق',
    readTimeEn: '8 min read',
    summaryAr: 'تفصيل فقهي وحسابي شامل لمعايير نصاب الزكاة الشرعية في النقود والذهب وتجارة الاستثمار وكيفية تقدير النسبة المقررة.',
    summaryEn: 'An analytical breakdown of Zakat financial jurisprudence, evaluating gold and fiat currencies on asset thresholds (Nisab).',
    contentAr: `
تعد **الزكاة** فريضة شرعية وركناً أساسياً من أركان الإسلام الخمسة، ولها دور تنموي واقتصادي حاسم في تدوير الأموال ومنع احتكارها وتطوير الضمان الاجتماعي في المجتمع المسلم.

### أولاً: حساب النصاب الشرعي للأموال
نصاب الزكاة هو الحد الأدنى من المال الذي إذا ملكه الشخص وحال عليه الحول (عام هجري كامل)، وجب عليه إخراج الزكاة من ماله.
* **نصاب الذهب**: يعادل **85 جراماً** من الذهب الصافي (عيار 24).
* **نصاب الفضة**: يعادل **595 جراماً** من الفضة النقية.
* **نصاب العملات الورقية**: يقدر بقيمة نصاب الذهب الحالي في الأسواق. فمثلاً، إذا كان سعر جرام الذهب عيار 24 الصافي اليوم هو 80 دولاراً، يكون النصاب المالي الفعلي:
$$\\text{نصاب النقود} = 85 \\times 80 = 6800 \\text{ دولار}$$

### ثانياً: شروط وجوب إخراج الزكاة
لكي تصبح الزكاة مفروضة شرعاً على المال، يجب أن تتوفر في المال الشروط التالية:
1. **الملك التام**: أن يكون المال ملكاً خاصاً وتحت تصرف صاحبه بالكامل.
2. **النماء**: أن يكون المال قابلاً للنماء والاستثمار (مثل النقد والأسهم والذهب والتجارة).
3. **بلوغ النصاب**: أن تتعدى قيمت المال الإجمالية حد النصاب المقر علمياً وشرعياً.
4. **دوران الحول**: عبور عام قمري (هجري) كامل على ملكية المال دون تراجع رصيده الإجمالي تحت حد النصاب في أي فترة من فترات الحول.

### ثالثاً: النسبة المقررة للزكاة وكيفية الحساب
النسبة الشرعية المقررة لزكاة النقدين والذهب وعروض التجارة هي **ربع العشر (2.5%)** من إجمالي قيمة المال المدخر.
معادلة إخراج الزكاة:
$$\\text{قيمة الزكاة المستحقة} = \\text{المال الإجمالي الخاضع للزكاة} \\times \\frac{2.5}{100} \\quad (\\text{أو بالقسمة على } 40)$$

يسخر تطبيق الحاسبة الشرعية للزكاة لتبسيط إدخال أصولك الذهبية، الفضية، المحافظ النقدية، والأصول المتداولة في الأسواق مع مراعاة الديون الصادرة ومقارنتها تلقائياً بأسعار الذهب والفضة اليومية لحساب زكاتك بسلامة وطمأنينة.
`,
    contentEn: `
**Zakat** represents a foundational financial pillar in Islamic jurisprudence designed to optimize capital circulation, combat hoarding, and support socio-economic redistribution.

### 1. Determining Financial Thresholds (Nisab)
The "Nisab" constitutes the absolute baseline value that triggers a Zakat obligation if maintained throughout a complete Hijri lunar year (Hawl).
* **Gold Benchmark**: Standardized at **85 Grams** of pure gold (24-karat equivalent).
* **Silver Benchmark**: Standardized at **595 Grams** of pure silver.
* **Currency Standard**: Calculated dynamically using current gold market prices. If gold value rests at $80/gram:
$$\\text{Nisab Threshold} = 85 \\times 80 = \\$6,800$$

### 2. Fundamental Obligation Prerequisites
Five spiritual and physical criteria validate Zakat eligibility:
1. **Complete Legal Ownership (Milk Tamm)**: Assets must be fully owned and legally accessible.
2. **Appreciating Profile (Namaa)**: Assets must be liquid or capable of yield generation (currencies, gold, investment stocks).
3. **Nisab Compliance**: The asset value must equal or exceed the currency/gold baseline.
4. **Lunar Year Completion (Hawl)**: Assets must stay above the Nisab limit for 354 continuous days.

### 3. Calculating the Standard Contribution Ratio
The standardized Sharia-compliant levy is precisely **2.5%** (one-fortieth) of the cumulative eligible assets:
$$\\text{Zakat Liability} = \\text{Total Eligible Assets} \\times 0.025 \\quad (\\text{or division by 40})$$

Our comprehensive Zakat calculator automatically estimates values across cash holdings, gold weights, and business commodities, deducting liabilities to yield safe computations under Islamic rules.
`
  },
  {
    id: 'bmi-metrics-guide',
    cat: 'health',
    icon: HeartPulse,
    titleAr: 'الفيزيولوجيا الرياضية لمؤشر كتلة الجسم (BMI): حساب نسب الدهون ومقاييس البنية الجسدية',
    titleEn: 'Mathematical Physiology of Body Mass Index (BMI): Density Parameters and Adiposity Metrics',
    readTimeAr: 'قراءة في 7 دقائق',
    readTimeEn: '7 min read',
    summaryAr: 'دراسة طبية ورياضية لمعايير مؤشر كتلة الجسم وسلبيات الاقتصار عليه من دون موازنة الكتلة العضلية ونسبة السوائل الحيوية.',
    summaryEn: 'A health-oriented review of body composition algorithms, density evaluations, and proper waist-to-height index metrics.',
    contentAr: `
يعد **مؤشر كتلة الجسم (Body Mass Index - BMI)** أداة إحصائية وفسيولوجية هامة تستخدم لتقدير فئة وزن الإنسان، وتحديد مستويات النحافة أو زيادة الوزن وعلاقة ذالك بالمخاطر الصحية المختلفة مثل الأمراض القلبية ومتلازمات السكري.

### أولاً: المعادلة الحسابية لمؤشر كتلة الجسم
تأسس هذا المؤشر رياضياً بالاعتماد على دراسات الباحث البلجيكي أدولف كوتيليه في القرن التاسع عشر، وهو يعبر عن تناسب كتلة الجسم مع مربع الطول بالمعادلة البسيطة التالية:
$$BMI = \\frac{\\text{الوزن (كيلوجرام)}}{\\text{الطول (متر)}^2}$$

على سبيل المثال، للشخص الذي يزن 75 كجم ويبلغ طوله 1.75 متر:
$$1.75^2 = 3.0625 \\implies BMI = \\frac{75}{3.0625} = 24.49$$

### ثانياً: الفئات التصنيفية لنتائج المؤشر (WHO Guidelines)
وضعت منظمة الصحة العالمية تصنيفات واضحة مفسرة وموحدة لمقياس الـ BMI كالتالي:
* **قصور حاد في الوزن (Underweight)**: أقل من 18.5.
* **الوزن الطبيعي والمثالي (Normal Weight)**: يتراوح بين 18.5 و24.9.
* **زيادة في الوزن (Overweight)**: يتراوح بين 25.0 و29.9.
* **السمنة المفرطة (Obesity)**: 30.0 أو أعلى.

### ثالثاً: عيوب ومحدوديات الاعتماد الفردي على الـ BMI
على الرغم من كفائته الإحصائية، يواجه نظام الـ BMI قصوراً كبيراً في بعض الحالات:
1. **الرياضيون ولاعبو كمال الأجسام**: يمتلك الرياضيون كتلة عضلية كثيفة تزن أكثر من الدهون العادية. عند حساب المؤشر لهم قد يصنفون كأشخاص يعانون من "السمنة" رغم تدني نسب الدهون لديهم لتقل عن 12%!
2. **كبار السن**: قد يواجهون تراجعاً في الكتلة العضلية (Sarcopenia) واستبدالها بالدهون، مما قد يعطي مؤشر كتلة جسم طبيعياً وخادعاً رغم عدم توازن تركيب أجسامهم الداخلي.

لذلك، ننصح دائماً باستخدام حاسبة الـ BMI المتاحة في موقعنا رفقة قياسات محيط الخصر ونسب الدهون المتخلفة للحصول على رؤية فسيولوجية صحية دقيقة وشاملة.
`,
    contentEn: `
**Body Mass Index (BMI)** serves as a standardized biostatistical metric for evaluating global weight classifications relative to human stature. Developed for epidemiologic classification, it assesses the relative risk profiles of obesity-related pathology.

### 1. Mathematical Derivation of BMI
Originally designed by Adolphe Quetelet, the formula correlates physical mass directly to the square of a person\\'s height:
$$BMI = \\frac{\\text{Weight (kg)}}{\\text{Height (m)}^2}$$

For instance, an individual weighing 85 kilograms at a height of 1.80 meters:
$$1.80^2 = 3.24 \\implies BMI = \\frac{85}{3.24} = 26.23$$

### 2. Clinical Classifications (WHO Standards)
The World Health Organization (WHO) divides adult BMI scores into distinct categories:
* **Underweight**: Below **18.5** (indicates potential nutrient deficiency states).
* **Normal Range**: **18.5 to 24.9** (associated with low mortality indicators).
* **Overweight**: **25.0 to 29.9** (elevated lipid-linked risk factors).
* **Obese Class**: **30.0 and above** (requires systemic metabolic assessment).

### 3. Structural Limits of BMI Modeling
While statistically useful for populations, BMI has clinical caveats:
* **Muscular Athletes**: Muscles feature high bone-and-density weight parameters. A bodybuilder with low levels of body fat can be erroneously cataloged as "Obese" under standard BMI metrics.
* **Geriatric Adaptation**: Height shrinkage and muscle distribution changes in elderly patients degrade BMI reliability.

Our interactive BMI platform incorporates multiple analytical indicators, providing high-quality visual metrics for physiological health trackers.
`
  },
  {
    id: 'seo-optimization-guide',
    cat: 'developers',
    icon: ShieldCheck,
    titleAr: 'هندسة أرشفة محركات البحث (SEO): بروتوكولات حجب الزحف وهياكل ملفات robots.txt و sitemap',
    titleEn: 'Search Engine Optimization (SEO) Crawler Architecture: Robots.txt Protocols and XML Sitemap Hierarchies',
    readTimeAr: 'قراءة في 8 دقائق',
    readTimeEn: '8 min read',
    summaryAr: 'كيف تعمل روبوتات جوجل ومحركات البحث في زحف وفهرسة المواقع، والآلية الفعالة لتنسيق خرائط XML وملفات التوجيه.',
    summaryEn: 'A master developer guide to search engine crawler architectures, sitemap prioritization weights, and crawl budget optimizations.',
    contentAr: `
يعتمد نجاح ونمو المواقع على الويب بشكل حاسم على ظهورها وتصدرها في نتائج البحث العضوية (Organic Search). لفهم كيف تقرأ محركات البحث مثل Google موقعك، يتعين عليك دراسة بنية الزحف (Crawlability) والفهرسة (Indexability).

### أولاً: كواليس محركات البحث: كيف يعمل الزاحف (web spider)؟
يقوم محرك البحث بإرسال خوارزميات برمجية تسمى الروبوتات أو العناكب (مثل Googlebot) لزيارة صفحات الويب. تعمل هذه الروبوتات بثلاثة أدوار أساسية ومتكاملة:
1. **الزحف (Crawling)**: اكتشاف الروابط وتحديث قواعد الرسوم البيانية للويب.
2. **الفهرسة (Indexing)**: تخزين محتويات الصفحات وفهم الكلمات الدلالية والأكواد المصاحبة لها.
3. **الترتيب (Ranking)**: موازنة مئات العوامل (سرعة الموقع، جودة المحتوى، وضوح الروابط) لتحديد موقع الصفحة الأنسب لكل كلمة بحث.

### ثانياً: ملف التوجيه الموحد robots.txt
يعد ملف **robots.txt** وثيقة التحكم والتواصل الأولى مع زواحف الويب. يتم وضعه في الجذر الرئيسي للموقع (root) لتوجيه عناكب البحث حول الصفحات التي يمنع زحفها أو يسمح بها.

الأوامر الأساسية لبناء ملف robots.txt:
* **User-agent**: تحديد محرك البحث (مثل Googlebot أو استخدام * لتطبيق الأمر على جميع الروبوتات).
* **Disallow**: منع الزحف لروابط حساسة مثل لوحات التحكم (/admin) أو الجلسات المؤقتة.
* **Allow**: السماح بالوصول لروابط فرعية تقع داخل مجلد ممنوع الزحف ككل.

مثال:
\`\`\`txt
User-agent: *
Disallow: /admin/
Allow: /admin/public-assets/
\`\`\`

### ثالثاً: خريطة الموقع sitemap.xml
تمثل **sitemap.xml** وثيقة هيكلية مكتوبة بلغة XML تقدم سرداً جغرافياً لجميع روابط موقعك الفعالة والهامَّة مع إرسال أولويات الأرشفة ونسبة التحديث لكل صفحة. يساعد تواجدها على توفير ميزانية الزحف (Crawl Budget) وحماية موقعك من تداعيات الصفحات اليتيمة (Orphan Pages) التي تفتقر لروابط داخلية تشير إليها.

تساعدك أودات توليد ملفات السيو المدمجة لدينا على صياغة وتجربة هذين الملفين في ثوان معدودة بأسس معيارية وصفر أخطاء لدعم تفوقك في محركات البحث.
`,
    contentEn: `
Organic traffic represents a major driver of sustainable web ecosystems. Search engine optimization relies on making a web application perfectly traversable for automated search engines spiders.

### 1. Web Crawler Mechanics
Search indices deploy web crawlers (such as Googlebot) to parse dynamic web nodes. This process involves:
1. **Discovery (Crawling)**: Following hyperlinked nodes to build and map global web topologies.
2. **Analysis (Indexing)**: Evaluating raw structural codes, semantic content, and metadata within relational index databases.
3. **Retrieval (Ranking)**: Applying highly complex mathematical scoring algorithms to yield fast, highly relevant search results.

### 2. The Robots.txt Architecture
The robots.txt standard represents the gatekeeper file placed in your application's root directory. It informs crawler threads which specific directories must be excluded from active crawlers to optimize resource usage.

Standard structural configurations include:
* **User-agent**: Sets target search crawlers (e.g., using "*" for universal search bots).
* **Disallow**: Completely hides structural pathways (e.g., preventing scraping of backend "/admin" files).
* **Allow**: Grants granular override access to folders inside restricted branches.

### 3. XML Sitemap Hierarchies
An XML Sitemap represents a structured blueprint of your web layout. Providing crawl crawlers with direct pathways to canonical URLs avoids wasting your application's allocated "Crawl Budget" and ensures proper indexing of isolated nested views.

Our SEO Files generator handles files formulation instantly, preparing production-ready robots.txt templates and conforming XML structures for major search console submissions.
`
  }
];

export default function Guides({ lang }: { lang: 'ar' | 'en' }) {
  const isAr = lang === 'ar';
  const t = {
    title: isAr ? 'مركز المعرفة والشروحات الشاملة لأدوات Hub 📚' : 'Tools Hub Knowledge Base & Detailed Guides 📚',
    subtitle: isAr ? 'مقالات وأدلة تعليمية غنية بالتفاصيل الفقهية، التقنية والعلمية تساعدك على فهم وحساب بياناتك بذكاء.' : 'In-depth academic, technical, and educational articles explaining calculations and design guidelines.',
    searchPlaceholder: isAr ? 'البحث عن المقالات أو الشروحات...' : 'Search articles and educational guides...',
    readTime: isAr ? 'وقت القراءة:' : 'Read Time:',
    category: isAr ? 'الفئة:' : 'Category:',
    noResults: isAr ? 'لم نعثر على مقالات توافق بحثك.' : 'No knowledge articles matched your query.',
    aboutBannerTitle: isAr ? 'لماذا ينفرد محتوى أدوات Hub دائمًا؟' : 'Why Does Tools Hub Content Stand Out?',
    aboutBannerText: isAr ? 'نلتزم هنا بتقديم أفضل جودة وموثوقية ملموسة للمحتوى. نقوم بصياغة الشروحات بالتعاون مع المبرمجين والمتخصصين لضمان دقة القوانين وتطبيق أفضل ممارسات النفاذ العالمي والخصوصية الرقمية.' : 'We are committed to delivering the highest quality parameters. Outlining structural rules with experienced developers ensures complete alignment with privacy standards, WCAG benchmarks, and accurate computational outcomes.',
    readMore: isAr ? 'اقرأ المقالة كاملة' : 'Read Full Exhaustive Article',
    finance: isAr ? 'المالية الإسلامية والمعاملات' : 'Islamic Finance & General Wealth',
    health: isAr ? 'العلوم الطبية والصحة الفيزيائية' : 'Physical Medicine & Body Science',
    design: isAr ? 'تصميم واجهات المستخدم ومقاييس ويب' : 'User Interface & Web Architectures',
    developers: isAr ? 'البرمجة والخوارزميات المعقدة' : 'Software Engineering & Advanced Math',
    education: isAr ? 'التعليم والتطوير الأكاديمي' : 'Academic Education & GPA Systems',
    metaTitle: isAr ? 'شروحات وأبحاث أدوات Hub - دليل شامل ومعرفة علمية موثوقة' : 'Detailed Guides & Scientific Research - Tools Hub'
  };

  const [search, setSearch] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [activeCat, setActiveCat] = useState('all');

  // Turn automatic featured article rotating on
  useEffect(() => {
    const timer = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % ARTICLES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleSelectArticle = (art: any | null) => {
    setSelectedArticle(art);
    if (art) {
      setTimeout(() => {
        const el = document.getElementById('detailed-article-card');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    }
  };

  const filteredArticles = ARTICLES.filter(art => {
    const term = search.toLowerCase();
    const matchesSearch = (
      art.titleAr.toLowerCase().includes(term) ||
      art.titleEn.toLowerCase().includes(term) ||
      art.summaryAr.toLowerCase().includes(term) ||
      art.summaryEn.toLowerCase().includes(term)
    );
    const matchesCategory = activeCat === 'all' || art.cat === activeCat;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-8 text-slate-200 font-sans pb-16 animate-in fade-in duration-500">
      
      {/* HEADER HERO CAPsULE */}
      <div className="relative border border-white/10 p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-[#0c122b]/95 to-[#030615]/98 overflow-hidden shadow-2xl">
        <div className="absolute top-[-30%] right-[-10%] w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-30%] left-[-10%] w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="flex flex-col lg:flex-row gap-8 items-center justify-between relative z-10">
          <div className="max-w-3xl flex flex-col items-start text-right">
            <span className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-purple-300 border border-purple-500/30 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-flex items-center gap-1.5 shadow-[0_0_12px_rgba(168,85,247,0.15)]">
              <BookOpen size={13} className="animate-pulse" />
              {isAr ? 'مستندات المعرفة الرسمية' : 'OFFICIAL TOOLS DOCUMENTATION'}
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300 leading-tight">
              {t.title}
            </h1>
            <p className="text-base text-slate-400 mt-4 leading-relaxed">
              {t.subtitle}
            </p>
          </div>
          
          <div className="w-full lg:w-80 shrink-0">
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full bg-slate-950/80 border border-white/10 rounded-2xl py-4 px-12 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
              <Search size={16} className="text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>
      </div>

      {/* FEATURED ARTICLES CAROUSEL FRAME */}
      {ARTICLES.length > 0 && (() => {
        const feat = ARTICLES[featuredIndex] || ARTICLES[0];
        const FeatIcon = feat.icon;
        
        return (
          <div className="relative border border-cyan-500/30 p-6 md:p-8 rounded-[2rem] bg-gradient-to-br from-[#121e56] via-[#070b24] to-[#030514] overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.12)] border-t-cyan-400/50 border-b-indigo-500/40 animate-in fade-in duration-500">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-[60px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/5 rounded-full blur-[60px] pointer-events-none" />

            <div className="flex flex-col gap-4 relative z-10">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[10px] font-black uppercase rounded-lg flex items-center gap-1.5 shadow-[0_0_8px_rgba(6,182,212,0.1)]">
                  <Sparkles size={11} className="animate-spin text-cyan-400" />
                  <span>{isAr ? 'المقالة الموصى بها والمميزة' : 'RECOMMENDED FEATURED STUDY'}</span>
                </span>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setFeaturedIndex((prev) => (prev - 1 + ARTICLES.length) % ARTICLES.length)}
                    className="w-8 h-8 rounded-full bg-slate-950/80 hover:bg-slate-900 text-slate-400 hover:text-white border border-white/5 flex items-center justify-center transition-colors shadow-sm"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button 
                    onClick={() => setFeaturedIndex((prev) => (prev + 1) % ARTICLES.length)}
                    className="w-8 h-8 rounded-full bg-slate-950/80 hover:bg-slate-900 text-slate-400 hover:text-white border border-white/5 flex items-center justify-center transition-colors shadow-sm"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              <div className="min-h-[140px] flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1 flex flex-col items-start gap-2.5 text-right rtl:text-right">
                  <span className="text-[10px] font-bold text-cyan-400 font-mono tracking-wider uppercase bg-cyan-950/40 px-2.5 py-0.5 rounded-full border border-cyan-800/20">
                    {t[feat.cat as keyof typeof t] || feat.cat}
                  </span>
                  <h2 
                    onClick={() => handleSelectArticle(feat)}
                    className="text-lg md:text-2xl font-black text-white hover:text-cyan-300 transition-colors cursor-pointer select-none"
                  >
                    {isAr ? feat.titleAr : feat.titleEn}
                  </h2>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-4xl line-clamp-2 md:line-clamp-3">
                    {isAr ? feat.summaryAr : feat.summaryEn}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col items-stretch sm:items-center md:items-end justify-center shrink-0 gap-3">
                  <span className="text-xs text-slate-500 font-mono text-center md:text-right">
                    {t.readTime} <strong>{isAr ? feat.readTimeAr : feat.readTimeEn}</strong>
                  </span>
                  <button
                    onClick={() => handleSelectArticle(feat)}
                    className="px-5 py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 rounded-xl text-xs font-black text-white transition-all shadow-[0_0_15px_rgba(6,182,212,0.15)] flex items-center justify-center gap-1.5"
                  >
                    <span>{isAr ? 'اقرأ كامل البحث الآن' : 'Explore Scientific Study'}</span>
                    <ChevronRight size={14} className={isAr ? 'rotate-180 font-bold' : 'font-bold'} />
                  </button>
                </div>
              </div>

              {/* DOTS NAVIGATION INDICATOR */}
              <div className="flex items-center justify-center gap-1.5 mt-2">
                {ARTICLES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setFeaturedIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${featuredIndex === i ? 'w-6 bg-cyan-400' : 'w-2 bg-slate-700/60'}`}
                  />
                ))}
              </div>

            </div>
          </div>
        );
      })()}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LIST OF GUIDES (Left 5 columns or right 7 columns) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#5c689a]">{isAr ? 'فهرس الشروحات والبحوث' : 'Indexed Analytical Studies'}</span>
            <span className="text-[10px] font-bold text-slate-500 font-mono">({filteredArticles.length})</span>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1 px-1">
            <button 
              onClick={() => setActiveCat('all')} 
              className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all ${activeCat === 'all' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-slate-900/60 text-slate-400 border border-transparent hover:text-slate-300'}`}
            >
              {isAr ? 'الكل' : 'All'}
            </button>
            {['finance', 'health', 'design', 'developers', 'education'].map((c) => (
              <button 
                key={c}
                onClick={() => setActiveCat(c)} 
                className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all ${activeCat === c ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-slate-900/60 text-slate-400 border border-transparent hover:text-slate-300'}`}
              >
                {t[c as keyof typeof t] || c}
              </button>
            ))}
          </div>

          {/* Inline custom stylesheet to format scrollbars perfectly  */}
          <style dangerouslySetInnerHTML={{__html: `
            .custom-scrollbar::-webkit-scrollbar {
              width: 5px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: rgba(255, 255, 255, 0.08);
              border-radius: 99px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: rgba(6, 182, 212, 0.35);
            }
          `}} />
          
          <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-1.5 custom-scrollbar scroll-smooth">
            {filteredArticles.map((art) => {
              const ArtIcon = art.icon;
              const isSelected = selectedArticle?.id === art.id;
              
              return (
                <button
                  key={art.id}
                  onClick={() => handleSelectArticle(art)}
                  className={`p-4 rounded-2xl border text-right transition-all flex flex-col gap-2.5 ${
                    isSelected 
                      ? 'bg-[#131b40]/80 border-cyan-500/50 shadow-md shadow-cyan-950/20' 
                      : 'bg-slate-900/40 border-white/5 hover:bg-slate-900/90 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[10px] font-bold text-cyan-400 font-mono tracking-wider uppercase">
                      {art.id.replace('-guide', '')}
                    </span>
                    <div className={`w-7 h-7 rounded-lg ${isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-500'} flex items-center justify-center shrink-0`}>
                      <ArtIcon size={14} />
                    </div>
                  </div>

                  <h3 className="text-sm font-extrabold text-slate-100 max-w-full leading-snug">
                    {isAr ? art.titleAr : art.titleEn}
                  </h3>
                  
                  <div className="flex items-center justify-between w-full text-[11px] text-slate-500 border-t border-white/5 pt-2 mt-1">
                    <span>{t.readTime} <strong className="text-slate-400 font-medium">{isAr ? art.readTimeAr : art.readTimeEn}</strong></span>
                    <span className="flex items-center gap-1 font-semibold text-slate-400">
                      <span>{isAr ? 'عرض' : 'View'}</span>
                      <ChevronRight size={12} className={isAr ? 'rotate-180' : ''} />
                    </span>
                  </div>
                </button>
              );
            })}

            {filteredArticles.length === 0 && (
              <div className="py-12 text-center text-slate-500 text-xs border border-dashed border-white/5 rounded-2xl">
                {t.noResults}
              </div>
            )}
          </div>

          {/* INFORMATIONAL INFO CARD ON SIDEBAR */}
          <div className="bg-[#0b0e26]/60 border border-white/5 p-5 rounded-2xl flex flex-col gap-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>{isAr ? 'منهجية دقيقة 100%' : 'Empirical Accuracy Standard'}</span>
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {isAr 
                ? 'تتم مراجعة ومعايرة محتوى موقعنا بالاعتماد على المراجع الطبية الموثوقة والأنصبة المحدثة دوريًا لتوفير أداة خدمية آمنة في بيئتك.' 
                : 'All algorithm procedures and computational standards strictly align with clinical metrics and updated economic values to maintain optimal integrity.'}
            </p>
          </div>
        </div>

        {/* DETAILED EXPANDED VIEW AREA (Right 8 columns) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {selectedArticle ? (
            <article id="detailed-article-card" className="bg-[#050720]/95 border border-white/10 rounded-[2.5rem] p-6 md:p-10 shadow-2xl flex flex-col gap-6 relative overflow-hidden scroll-mt-6">
              <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-500/5 blur-[60px] rounded-full pointer-events-none" />
              
              <div className="flex flex-col gap-3 border-b border-white/10 pb-6">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[10px] font-black uppercase rounded-lg">
                    {t[selectedArticle.cat as keyof typeof t] || selectedArticle.cat}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {t.readTime} {isAr ? selectedArticle.readTimeAr : selectedArticle.readTimeEn}
                  </span>
                </div>
                
                <h2 className="text-xl md:text-3xl font-black text-white leading-tight">
                  {isAr ? selectedArticle.titleAr : selectedArticle.titleEn}
                </h2>
              </div>

              {/* BODY COPY WITH RICH PARAGRAPHS - MANUALLY FORMATTED FOR STUNNING READABLE BLOG */}
              <div className="text-sm text-slate-300 leading-relaxed max-w-none flex flex-col gap-4 text-right rtl:text-right font-sans markdown-body prose prose-invert">
                {isAr ? (
                  <div className="whitespace-pre-wrap break-words prose-headings:text-white prose-p:my-2">
                    {selectedArticle.contentAr.split('###').map((section, idx) => {
                      if (idx === 0) return <p key={idx} className="text-slate-300 text-base font-medium leading-relaxed mb-4">{section.trim()}</p>;
                      const lines = section.split('\n');
                      const header = lines[0].trim();
                      const content = lines.slice(1).join('\n').trim();
                      return (
                        <div key={idx} className="mt-4 flex flex-col gap-2">
                          <h3 className="text-base font-extrabold text-cyan-300 mt-2 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                            {header}
                          </h3>
                          <div className="whitespace-pre-wrap text-slate-300 text-sm leading-relaxed">{content}</div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="whitespace-pre-wrap break-words text-left ltr:text-left">
                    {selectedArticle.contentEn.split('###').map((section, idx) => {
                      if (idx === 0) return <p key={idx} className="text-slate-300 text-base font-medium leading-relaxed mb-4">{section.trim()}</p>;
                      const lines = section.split('\n');
                      const header = lines[0].trim();
                      const content = lines.slice(1).join('\n').trim();
                      return (
                        <div key={idx} className="mt-4 flex flex-col gap-2">
                          <h3 className="text-base font-extrabold text-cyan-300 mt-2 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                            {header}
                          </h3>
                          <div className="whitespace-pre-wrap text-slate-300 text-sm leading-relaxed">{content}</div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* FOOTER OF ARTICLE */}
              <div className="border-t border-white/5 pt-6 mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-[11px] text-slate-500 font-mono">
                  DOX_ID_REF_KEY: {selectedArticle.id.toUpperCase()} // APPROVED
                </p>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-4 py-2 bg-slate-900 border border-white/10 hover:bg-slate-850 rounded-xl text-xs font-bold text-slate-300 self-end sm:self-auto transition-colors"
                >
                  {isAr ? '✕ إغلاق المقالة' : '✕ Close Document'}
                </button>
              </div>
            </article>
          ) : (
            // DEFAULT VIEW SCREEN INDICATOR (FIRST ARTICLE PRELOADED)
            <div className="bg-[#050720]/95 border border-white/5 rounded-[2.5rem] p-10 md:p-14 text-center flex flex-col items-center justify-center gap-6 min-h-[400px] shadow-lg relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />
              
              <div className="w-16 h-16 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/25 flex items-center justify-center animate-bounce-slow">
                <BookOpen size={28} />
              </div>

              <div className="max-w-md flex flex-col gap-2">
                <h3 className="text-lg md:text-xl font-extrabold text-white">
                  {isAr ? 'تصفح وقارئ المقالات والأدلة التعليمية' : 'Comprehensive Interactive Knowledge Reader'}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {isAr 
                    ? 'اختر أي من المقالات العلمية أو الفصول التوضيحية من الفهرس الجانبي لبدء قرائتها بوضوح وفهم المعادلات والقوانين الخاصة بالحاسبة.' 
                    : 'Select any analytical study or explanatory manual from the left listing to load rich historical parameters and mathematical formulas.'}
                </p>
              </div>

              <button
                onClick={() => handleSelectArticle(ARTICLES[0])}
                className="px-5 py-2.5 bg-gradient-to-r from-cyan-500/15 to-indigo-500/15 border border-cyan-500/30 rounded-xl text-xs font-extrabold text-cyan-300 hover:from-cyan-500/25 hover:to-indigo-500/25 transition-all shadow-[0_0_15px_rgba(6,182,212,0.1)] flex items-center gap-1.5"
              >
                <Sparkles size={13} />
                <span>{isAr ? 'اقرأ المقالة الأولى تلقائياً' : 'Load Featured Zakat Study'}</span>
              </button>
            </div>
          )}

          {/* ADSense COMPLIANT ABOUT BOX */}
          <div className="bg-gradient-to-r from-cyan-950/20 to-purple-950/20 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[60px] rounded-full pointer-events-none" />
            
            <div className="flex flex-col gap-3 text-right rtl:text-right">
              <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                <Sparkles size={15} className="text-cyan-400 animate-pulse" />
                <span>{t.aboutBannerTitle}</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t.aboutBannerText}
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
