import React, { useState, useEffect } from 'react';
import { Share2 } from 'lucide-react';
import { HashRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Category from './pages/Category';
import WordCounterTool from './pages/WordCounterTool';
import PersonalLoanCalculator from './pages/PersonalLoanCalculator';
import IncomeTaxCalculator from './pages/IncomeTaxCalculator';
import CryptoConverter from './pages/CryptoConverter';
import CompoundInterestCalculator from './pages/CompoundInterestCalculator';
import ZakatCalculator from './pages/ZakatCalculator';
import GoldJewelryCalculator from './pages/GoldJewelryCalculator';
import InflationCalculator from './pages/InflationCalculator';
import StockProfitCalculator from './pages/StockProfitCalculator';
import InvoiceGenerator from './pages/InvoiceGenerator';
import OnlineNotepad from './pages/OnlineNotepad';

import GPACalculator from './pages/GPACalculator';
import PhysicalUnitConverter from './pages/PhysicalUnitConverter';
import CitationGenerator from './pages/CitationGenerator';
import GradePercentageCalculator from './pages/GradePercentageCalculator';
import DateConverter from './pages/DateConverter';
import DailyStudySchedule from './pages/DailyStudySchedule';
import BMICalculator from './pages/BMICalculator';
import CalorieCalculator from './pages/CalorieCalculator';
import PregnancyCalculator from './pages/PregnancyCalculator';
import WaterCalculator from './pages/WaterCalculator';
import WorkoutGenerator from './pages/WorkoutGenerator';
import ColorVisionTest from './pages/ColorVisionTest';
import JsonConverter from './pages/JsonConverter';
import PasswordGenerator from './pages/PasswordGenerator';
import MetaTagsPreviewer from './pages/MetaTagsPreviewer';
import SeoFilesGenerator from './pages/SeoFilesGenerator';
import ImageColorPicker from './pages/ImageColorPicker';
import CodeBeautifier from './pages/CodeBeautifier';
import WebpConverter from './pages/WebpConverter';
import Base64Converter from './pages/Base64Converter';
import YoutubeCalculator from './pages/YoutubeCalculator';
import HashtagGenerator from './pages/HashtagGenerator';
import ImageResizer from './pages/ImageResizer';
import RoomCalculator from './pages/RoomCalculator';
import FuelCalculator from './pages/FuelCalculator';
import BabyNames from './pages/BabyNames';
import TimeDifference from './pages/TimeDifference';
import QiblaDirection from './pages/QiblaDirection';
import LuckyNumbers from './pages/LuckyNumbers';
import RandomPicker from './pages/RandomPicker';
import BookReadingTime from './pages/BookReadingTime';
import LiveAgeCalculator from './pages/LiveAgeCalculator';
import DailyRiddle from './pages/DailyRiddle';
import TypingSpeedTest from './pages/TypingSpeedTest';
import AsciiArt from './pages/AsciiArt';
import OhmsLaw from './pages/OhmsLaw';
import NumberBaseConverter from './pages/NumberBaseConverter';
import TriangleCalculator from './pages/TriangleCalculator';
import MaterialStrength from './pages/MaterialStrength';
import PeriodicTable from './pages/PeriodicTable';
import TemperatureConverter from './pages/TemperatureConverter';
import WaveCalculator from './pages/WaveCalculator';

const translations = {
  ar: {
    appName: "أدواتي",
    appNameSuffix: "Pro",
    home: "الرئيسية",
    otherTools: "الأقسام",
    footerCopyright: "جميع الحقوق محفوظة",
    footerPrivacy: "سياسة الخصوصية",
    footerTerms: "شروط الاستخدام",
    privacyTitle: "سياسة الخصوصية",
    privacyContent: [
      "نحن في 'أدواتي Pro' نولي اهتماماً كبيراً لخصوصيتك. توضح هذه السياسة كيف نتعامل مع معلوماتك عند استخدام الأداة:",
      "1. معالجة النصوص محلياً: تم تصميم حاسبة الكلمات لتعمل بالكامل داخل متصفحك (Client-Side). جميع النصوص التي تدخلها وتقوم بفحصها لا تخرج من جهازك، ولا نقوم بحفظها أو إرسالها لأي خوادم خارجية.",
      "2. جمع البيانات لتطوير الأداة: قد نستخدم تقنيات تحليل (مثل Google Analytics) لفهم تفاعل زوارنا مع الصفحة وتحسين تجربتهم. البيانات المجمعة تكون مجهولة الهوية وتتضمن نوع المتصفح ومصدر الزيارة.",
      "3. الإعلانات والملفات المؤقتة (Cookies): نستخدم Google AdSense لتقديم إعلانات قد تهمك. تعتمد هذه الخدمات على توظيف ملفات تعريف الارتباط لتحسين دقة الإعلانات المعروضة حسب اهتماماتك.",
      "4. تعديل السياسة: يحق لنا تحديث سياسة الخصوصية لتتوافق مع أي تغييرات تخص جمع البيانات وتطوير الموقع، وأي تعديل سيتم تحديثه في هذه الصفحة مباشرة."
    ],
    termsTitle: "شروط الاستخدام",
    termsContent: [
      "مرحباً بك في أداة 'أدواتي Pro'. باستخدامك لهذا الموقع، أنت توافق بشكل كامل على الشروط التالية:",
      "1. الاستخدام المجاني والمقبول: صُممت الأدوات لتكون مجانية وسهلة ليستخدمها الجميع. يمنع استخدام تقنيات تلقائية (Bawling أو Bots) لإغراق الموقع بالطلبات.",
      "2. حدود المسؤولية (إخلاء مسؤولية): نقدم الأداة \"كما هي\"، ونسعى دوماً لتقديم أقصى درجات الدقة، ولكننا لا نتحمل المسؤولية القانونية تجاه أي خسائر تجارية أو أضرار تنتج عن الاعتماد الكلي على نتائج الأداة.",
      "3. حقوق الملكية: الكود المصدري، تصميم الواجهة، والنصوص المكتوبة في هذا الموقع هي حقوق فكرية مملوكة ولا يحق استنساخها وتكرارها في مواقع أخرى.",
      "4. توفر الخدمة: لا نضمن توفر الأداة بنسبة 100% دون انقطاع لتحديث الصيانة الدورية.",
      "5. صلاحية الشروط: نحتفظ بالحق في تحديث الشروط والأحكام دون أي إشعار مسبق. الاستمرار في استخدام الموقع يعني الموافقة الضمنية على أي تغييرات مضافة."
    ],
  },
  en: {
    appName: "MyTools",
    appNameSuffix: "Pro",
    home: "Home",
    otherTools: "Categories",
    footerCopyright: "All rights reserved",
    footerPrivacy: "Privacy Policy",
    footerTerms: "Terms of Use",
    privacyTitle: "Privacy Policy",
    privacyContent: [
      "At 'MyTools Pro', we take your privacy very seriously. This policy delineates how we manage your information when you interact with our tool:",
      "1. Client-Side Processing: Many tools are designed strictly as client-side utilities running independently within your browser. The text you input never leaves your device.",
      "2. Data Collection for Improvement: We may integrate standard web analytics services (such as Google Analytics) to gain insights regarding user interaction across the site.",
      "3. Advertisements & Cookies: We utilize Google AdSense to offer relevant advertisements. AdSense relies on cookies to serve ads tailored implicitly to your browsing preferences.",
      "4. Policy Updates: We reserve the right to amend this Privacy Policy to align with new data practices or regulatory changes."
    ],
    termsTitle: "Terms of Use",
    termsContent: [
      "Welcome to 'MyTools Pro'. Access to or use of this website signifies your total agreement to comply with the stipulations detailed below:",
      "1. Acceptable and Free Use: This site is provided universally free for personal or professional use. Utilizing destructive practices or automated bots is strictly restricted.",
      "2. Limitations of Liability (Disclaimer): We provide this tool strictly on an \"AS IS\" basis. We assume no legal liability for any potential losses or disruptions traced back to reliance on app outcomes.",
      "3. Intellectual Property Rights: The distinct user interface design, text content, algorithms, and source codes featured remain our exclusive intellectual property.",
      "4. Service Availability: Absolute uninterrupted access or completely flawless uptime is not guaranteed.",
      "5. Validity of Terms: We hold the liberty to adapt or update the Terms of Use sporadically."
    ]
  }
};

function Layout({ children, lang, setLang, t }: any) {
  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col relative overflow-hidden ${lang === 'ar' ? 'rtl' : 'ltr'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Background blurred blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] bg-blue-600/20 rounded-full blur-[120px]"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 h-16 border-b border-white/10 backdrop-blur-md bg-white/5 px-4 sm:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <span className="text-slate-900 font-bold text-lg">{lang === 'ar' ? 'أد' : 'MT'}</span>
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-400 hidden sm:block">
            {t.appName} {t.appNameSuffix}
          </h1>
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6">
          <ul className="flex gap-4 sm:gap-6 text-sm font-medium text-slate-400 hidden sm:flex">
            <li><Link to="/" className="hover:text-slate-200 transition-colors">{t.home}</Link></li>
            <li><Link to="/" className="hover:text-slate-200 transition-colors">{t.otherTools}</Link></li>
          </ul>
          <button 
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs font-bold text-slate-200 transition-colors backdrop-blur-md"
          >
            {lang === 'ar' ? 'English' : 'العربية'}
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-grow max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 h-16 border-t border-white/10 backdrop-blur-md bg-white/5 px-4 sm:px-8 flex items-center justify-between text-[11px] text-slate-500 mt-auto">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-slate-400">{t.appName} {t.appNameSuffix}</span>
          <span className="hidden sm:inline">&copy; {new Date().getFullYear()} {t.footerCopyright}</span>
        </div>
        <div className="flex gap-3 text-[10px] sm:text-[11px]">
          <Link to="/privacy" className="hover:text-slate-300 transition-colors">{t.footerPrivacy}</Link>
          <span className="w-px h-3 bg-slate-800 self-center"></span>
          <Link to="/terms" className="hover:text-slate-300 transition-colors">{t.footerTerms}</Link>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const t = translations[lang];

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <Router>
      <Layout lang={lang} setLang={setLang} t={t}>
        <Routes>
          <Route path="/" element={<Home lang={lang} />} />
          <Route path="/category/:id" element={<Category lang={lang} />} />
          <Route path="/tool/word-counter" element={<WordCounterTool lang={lang} />} />
          <Route path="/tool/loan-calculator" element={<PersonalLoanCalculator lang={lang} />} />
          <Route path="/tool/tax-calculator" element={<IncomeTaxCalculator lang={lang} />} />
          <Route path="/tool/crypto-converter" element={<CryptoConverter lang={lang} />} />
          <Route path="/tool/compound-interest" element={<CompoundInterestCalculator lang={lang} />} />
          <Route path="/tool/zakat-calculator" element={<ZakatCalculator lang={lang} />} />
          <Route path="/tool/gold-calculator" element={<GoldJewelryCalculator lang={lang} />} />
          <Route path="/tool/inflation-calculator" element={<InflationCalculator lang={lang} />} />
          <Route path="/tool/stock-profit" element={<StockProfitCalculator lang={lang} />} />
          <Route path="/tool/invoice-generator" element={<InvoiceGenerator lang={lang} />} />
          <Route path="/tool/online-notepad" element={<OnlineNotepad lang={lang} />} />
          
          <Route path="/tool/gpa-calculator" element={<GPACalculator lang={lang} />} />
          <Route path="/tool/physics-units" element={<PhysicalUnitConverter lang={lang} />} />
          <Route path="/tool/citation-generator" element={<CitationGenerator lang={lang} />} />
          <Route path="/tool/grade-percentage" element={<GradePercentageCalculator lang={lang} />} />
          <Route path="/tool/date-converter" element={<DateConverter lang={lang} />} />
          <Route path="/tool/daily-study-schedule" element={<DailyStudySchedule lang={lang} />} />
          <Route path="/tool/bmi-calculator" element={<BMICalculator lang={lang} />} />
          <Route path="/tool/calorie-calculator" element={<CalorieCalculator lang={lang} />} />
          <Route path="/tool/pregnancy-calculator" element={<PregnancyCalculator lang={lang} />} />
          <Route path="/tool/water-calculator" element={<WaterCalculator lang={lang} />} />
          <Route path="/tool/workout-generator" element={<WorkoutGenerator lang={lang} />} />
          <Route path="/tool/color-vision-test" element={<ColorVisionTest lang={lang} />} />
          <Route path="/tool/json-converter" element={<JsonConverter lang={lang} />} />
          <Route path="/tool/password-generator" element={<PasswordGenerator lang={lang} />} />
          <Route path="/tool/meta-tags-previewer" element={<MetaTagsPreviewer lang={lang} />} />
          <Route path="/tool/seo-files-generator" element={<SeoFilesGenerator lang={lang} />} />
          <Route path="/tool/image-color-picker" element={<ImageColorPicker lang={lang} />} />
          <Route path="/tool/code-beautifier" element={<CodeBeautifier lang={lang} />} />
          <Route path="/tool/webp-converter" element={<WebpConverter lang={lang} />} />
          <Route path="/tool/base64-converter" element={<Base64Converter lang={lang} />} />
          <Route path="/tool/youtube-calculator" element={<YoutubeCalculator lang={lang} />} />
          <Route path="/tool/hashtag-generator" element={<HashtagGenerator lang={lang} />} />
          <Route path="/tool/image-resizer" element={<ImageResizer lang={lang} />} />
          <Route path="/tool/room-calculator" element={<RoomCalculator lang={lang} />} />
          <Route path="/tool/fuel-calculator" element={<FuelCalculator lang={lang} />} />
          <Route path="/tool/baby-names" element={<BabyNames lang={lang} />} />
          <Route path="/tool/time-difference" element={<TimeDifference lang={lang} />} />
          <Route path="/tool/qibla-direction" element={<QiblaDirection lang={lang} />} />
          <Route path="/tool/lucky-numbers" element={<LuckyNumbers lang={lang} />} />
          <Route path="/tool/random-picker" element={<RandomPicker lang={lang} />} />
          <Route path="/tool/book-reading-time" element={<BookReadingTime lang={lang} />} />
          <Route path="/tool/live-age-calc" element={<LiveAgeCalculator lang={lang} />} />
          <Route path="/tool/daily-riddle" element={<DailyRiddle lang={lang} />} />
          <Route path="/tool/typing-speed-test" element={<TypingSpeedTest lang={lang} />} />
          <Route path="/tool/ascii-art" element={<AsciiArt lang={lang} />} />
          <Route path="/tool/ohms-law" element={<OhmsLaw lang={lang} />} />
          <Route path="/tool/number-base-converter" element={<NumberBaseConverter lang={lang} />} />
          <Route path="/tool/triangle-calculator" element={<TriangleCalculator lang={lang} />} />
          <Route path="/tool/material-strength" element={<MaterialStrength lang={lang} />} />
          <Route path="/tool/periodic-table" element={<PeriodicTable lang={lang} />} />
          <Route path="/tool/temperature-converter" element={<TemperatureConverter lang={lang} />} />
          <Route path="/tool/wave-calculator" element={<WaveCalculator lang={lang} />} />
          
          <Route path="/privacy" element={
            <section className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-emerald-400 border-b border-white/10 pb-4 mb-6">{t.privacyTitle}</h2>
              <div className="space-y-4 text-slate-300 leading-relaxed text-sm">
                {t.privacyContent.map((paragraph, idx) => (
                  <p key={idx} className={idx === 0 ? "mb-6 text-base text-slate-200 font-medium" : ""}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          } />
          
          <Route path="/terms" element={
            <section className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-blue-400 border-b border-white/10 pb-4 mb-6">{t.termsTitle}</h2>
              <div className="space-y-4 text-slate-300 leading-relaxed text-sm">
                {t.termsContent.map((paragraph, idx) => (
                  <p key={idx} className={idx === 0 ? "mb-6 text-base text-slate-200 font-medium" : ""}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          } />
        </Routes>
      </Layout>
    </Router>
  );
}
