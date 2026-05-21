import React, { useState, useMemo } from 'react';
import { Share2, Info, Baby, Search, Filter, BookOpen, User, Users } from 'lucide-react';

const translations = {
  ar: {
    title: "مصفاة أسماء الأطفال ومعانيها",
    subtitle: "ابحث عن الاسم المثالي لطفلك مع معاني الأسماء وأصولها. يمكنك الفلترة حسب الجنس، الأصل، أو الحرف الأول.",
    searchPlaceholder: "ابحث عن اسم...",
    gender: "الجنس",
    allGenders: "الكل",
    boy: "أولاد",
    girl: "بنات",
    origin: "أصل الاسم",
    allOrigins: "الكل",
    arabic: "عربي",
    turkish: "تركي",
    foreign: "أجنبي",
    letter: "الحرف الأول",
    allLetters: "الكل",
    results: "الأسماء المطابقة",
    noResults: "لم يتم العثور على أسماء تطابق بحثك.",
    shareWhatsapp: "مشاركة الأداة",
    aboutTitle: "عن الأداة",
    aboutP1: "أداة سهلة وسريعة لمساعدتك في اختيار اسم مولودك الجديد. تضم قاعدة بيانات واسعة بأسماء عربية، تركية، وأجنبية مع معانيها. تتيح لك الفلترة الذكية تصفح الأسماء حسب الحرف الأول، الجنس، أو أصل الاسم للعثور على الاسم الأنسب.",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)"
  },
  en: {
    title: "Baby Names Filter & Meanings",
    subtitle: "Find the perfect name for your child with meanings and origins. Filter by gender, origin, or first letter.",
    searchPlaceholder: "Search for a name...",
    gender: "Gender",
    allGenders: "All",
    boy: "Boys",
    girl: "Girls",
    origin: "Name Origin",
    allOrigins: "All",
    arabic: "Arabic",
    turkish: "Turkish",
    foreign: "Foreign",
    letter: "First Letter",
    allLetters: "All",
    results: "Matching Names",
    noResults: "No names found matching your criteria.",
    shareWhatsapp: "Share Tool",
    aboutTitle: "About The Tool",
    aboutP1: "A quick and easy tool to help you choose the perfect name for your newborn. It includes a comprehensive database of Arabic, Turkish, and Foreign names along with their meanings. Smart filtering allows you to browse by first letter, gender, or origin.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)"
  }
};

const namesDatabase = [
  // Boys, Arabic
  { name: "محمد", nameEn: "Mohammed", gender: "boy", origin: "arabic", meaningAr: "المحمود الخصال، المثني عليه", meaningEn: "Praiseworthy" },
  { name: "أحمد", nameEn: "Ahmed", gender: "boy", origin: "arabic", meaningAr: "كثير الحمد", meaningEn: "Highly praised" },
  { name: "علي", nameEn: "Ali", gender: "boy", origin: "arabic", meaningAr: "الشريف الرفيع القدر", meaningEn: "High, elevated" },
  { name: "عمر", nameEn: "Omar", gender: "boy", origin: "arabic", meaningAr: "الحياة الطويلة", meaningEn: "Long life" },
  { name: "يوسف", nameEn: "Yousef", gender: "boy", origin: "arabic", meaningAr: "الله يزيد ويضاعف", meaningEn: "God increases" },
  { name: "أمير", nameEn: "Amir", gender: "boy", origin: "arabic", meaningAr: "الحاكم، من يتولى الإمارة", meaningEn: "Prince, leader" },
  { name: "خالد", nameEn: "Khaled", gender: "boy", origin: "arabic", meaningAr: "الباقي، الدائم", meaningEn: "Eternal" },
  { name: "سعد", nameEn: "Saad", gender: "boy", origin: "arabic", meaningAr: "اليمن والبركة", meaningEn: "Happiness, lucky" },
  { name: "طارق", nameEn: "Tarek", gender: "boy", origin: "arabic", meaningAr: "الذي يدق الباب ليلاً", meaningEn: "He who knocks at night" },
  { name: "ريان", nameEn: "Rayan", gender: "boy", origin: "arabic", meaningAr: "المرتوي بعد العطش، باب في الجنة", meaningEn: "Watered, gate of paradise" },
  { name: "ياسين", nameEn: "Yassin", gender: "boy", origin: "arabic", meaningAr: "من فواتح السور في القرآن", meaningEn: "Quranic name" },
  { name: "زكريا", nameEn: "Zakaria", gender: "boy", origin: "arabic", meaningAr: "من يذكر الله", meaningEn: "God remembers" },
  { name: "يحيى", nameEn: "Yahya", gender: "boy", origin: "arabic", meaningAr: "يعيش", meaningEn: "He lives" },
  { name: "كريم", nameEn: "Karim", gender: "boy", origin: "arabic", meaningAr: "السخي، المعطاء", meaningEn: "Generous" },
  { name: "آدم", nameEn: "Adam", gender: "boy", origin: "arabic", meaningAr: "الإنسان الأول، الأسمر", meaningEn: "First man, of the earth" },

  // Girls, Arabic
  { name: "فاطمة", nameEn: "Fatima", gender: "girl", origin: "arabic", meaningAr: "التي فطمت ولدها", meaningEn: "Captivating, weaning" },
  { name: "مريم", nameEn: "Maryam", gender: "girl", origin: "arabic", meaningAr: "السيدة، بحر الأحزان", meaningEn: "Beloved, drop of the sea" },
  { name: "عائشة", nameEn: "Aisha", gender: "girl", origin: "arabic", meaningAr: "المرتاحة في حياتها", meaningEn: "Alive, well-living" },
  { name: "زينب", nameEn: "Zainab", gender: "girl", origin: "arabic", meaningAr: "شجرة حسنة المنظر", meaningEn: "Fragrant flower" },
  { name: "نور", nameEn: "Nour", gender: "girl", origin: "arabic", meaningAr: "الضياء", meaningEn: "Light" },
  { name: "ليلى", nameEn: "Layla", gender: "girl", origin: "arabic", meaningAr: "النشوة، نشوة الخمر", meaningEn: "Night, dark beauty" },
  { name: "سارة", nameEn: "Sarah", gender: "girl", origin: "arabic", meaningAr: "الأميرة، السيدة النبيلة", meaningEn: "Princess" },
  { name: "حلا", nameEn: "Hala", gender: "girl", origin: "arabic", meaningAr: "الشائقة، الحلوة", meaningEn: "Sweetness" },
  { name: "جود", nameEn: "Jood", gender: "girl", origin: "arabic", meaningAr: "الكرم والعطاء", meaningEn: "Generosity" },
  { name: "رؤى", nameEn: "Roa", gender: "girl", origin: "arabic", meaningAr: "ما يُرى في المنام من أحلام حسنة", meaningEn: "Visions, dreams" },
  { name: "شهد", nameEn: "Shahad", gender: "girl", origin: "arabic", meaningAr: "العسل الصافي", meaningEn: "Pure honey" },
  { name: "لين", nameEn: "Leen", gender: "girl", origin: "arabic", meaningAr: "النعومة، الشيء اللين", meaningEn: "Tenderness" },
  { name: "يارا", nameEn: "Yara", gender: "girl", origin: "arabic", meaningAr: "الصاحبة، المعشوقة", meaningEn: "Small butterfly, beloved" },
  { name: "ملك", nameEn: "Malak", gender: "girl", origin: "arabic", meaningAr: "مفرد ملائكة، الرونق", meaningEn: "Angel" },
  { name: "داليا", nameEn: "Dalia", gender: "girl", origin: "arabic", meaningAr: "زهرة الكرمة", meaningEn: "Grape vine" },

  // Boys, Turkish
  { name: "بوراك", nameEn: "Burak", gender: "boy", origin: "turkish", meaningAr: "البرق، دابة البراق", meaningEn: "Lightning, swift" },
  { name: "جان", nameEn: "Can", gender: "boy", origin: "turkish", meaningAr: "الروح، الحياة", meaningEn: "Soul, life" },
  { name: "أوزان", nameEn: "Ozan", gender: "boy", origin: "turkish", meaningAr: "الشاعر", meaningEn: "Poet" },
  { name: "كينان", nameEn: "Kenan", gender: "boy", origin: "turkish", meaningAr: "أرض كنعان، فلسطين", meaningEn: "Land of Canaan" },
  { name: "تيمور", nameEn: "Timur", gender: "boy", origin: "turkish", meaningAr: "الحديد، الصلب", meaningEn: "Iron" },

  // Girls, Turkish
  { name: "إيلين", nameEn: "Elin", gender: "girl", origin: "turkish", meaningAr: "نور الشمس", meaningEn: "Sunlight" },
  { name: "تولين", nameEn: "Tulin", gender: "girl", origin: "turkish", meaningAr: "هالة النور حول القمر", meaningEn: "Halo of the moon" },
  { name: "بانو", nameEn: "Banu", gender: "girl", origin: "turkish", meaningAr: "السيدة، الأميرة", meaningEn: "Lady, princess" },
  { name: "نيلان", nameEn: "Nilan", gender: "girl", origin: "turkish", meaningAr: "المرأة الشجاعة", meaningEn: "Brave woman" },
  { name: "هازال", nameEn: "Hazal", gender: "girl", origin: "turkish", meaningAr: "أوراق الشجر المتساقطة", meaningEn: "Falling leaves in autumn" },

  // Boys, Foreign
  { name: "مايكل", nameEn: "Michael", gender: "boy", origin: "foreign", meaningAr: "من يشبه الله", meaningEn: "Who is like God" },
  { name: "جون", nameEn: "John", gender: "boy", origin: "foreign", meaningAr: "الرب حنان", meaningEn: "God is gracious" },
  { name: "دانيال", nameEn: "Daniel", gender: "boy", origin: "foreign", meaningAr: "الله قاضي", meaningEn: "God is my judge" },
  { name: "ليام", nameEn: "Liam", gender: "boy", origin: "foreign", meaningAr: "الحامي القوي", meaningEn: "Strong protector" },
  { name: "نوح", nameEn: "Noah", gender: "boy", origin: "foreign", meaningAr: "الراحة، السلام", meaningEn: "Rest, peace" },
  { name: "ويليام", nameEn: "William", gender: "boy", origin: "foreign", meaningAr: "الحامي القوي الإرادة", meaningEn: "Strong-willed warrior" },
  { name: "جيمس", nameEn: "James", gender: "boy", origin: "foreign", meaningAr: "الذي يحل محل غيره", meaningEn: "Supplanter" },
  { name: "أوليفر", nameEn: "Oliver", gender: "boy", origin: "foreign", meaningAr: "شجرة الزيتون، رمز السلام", meaningEn: "Olive tree" },
  { name: "بنجامين", nameEn: "Benjamin", gender: "boy", origin: "foreign", meaningAr: "ابن اليمين (البركة)", meaningEn: "Son of the right hand" },
  { name: "إيليا", nameEn: "Elijah", gender: "boy", origin: "foreign", meaningAr: "الرب هو إلهي", meaningEn: "Yahweh is God" },
  { name: "لوكاس", nameEn: "Lucas", gender: "boy", origin: "foreign", meaningAr: "جالب النور", meaningEn: "Bringer of light" },
  { name: "ألكسندر", nameEn: "Alexander", gender: "boy", origin: "foreign", meaningAr: "المدافع عن الرجال", meaningEn: "Defender of men" },

  // Girls, Foreign
  { name: "إيما", nameEn: "Emma", gender: "girl", origin: "foreign", meaningAr: "الشاملة، الكاملة", meaningEn: "Universal, whole" },
  { name: "أوليفيا", nameEn: "Olivia", gender: "girl", origin: "foreign", meaningAr: "شجرة الزيتون", meaningEn: "Olive tree" },
  { name: "جوليا", nameEn: "Julia", gender: "girl", origin: "foreign", meaningAr: "الشباب، الحيوية", meaningEn: "Youthful" },
  { name: "لونا", nameEn: "Luna", gender: "girl", origin: "foreign", meaningAr: "القمر", meaningEn: "Moon" },
  { name: "إيزابيلا", nameEn: "Isabella", gender: "girl", origin: "foreign", meaningAr: "المكرسة لله", meaningEn: "Devoted to God" },
  { name: "صوفيا", nameEn: "Sophia", gender: "girl", origin: "foreign", meaningAr: "الحكمة", meaningEn: "Wisdom" },
  { name: "آيفا", nameEn: "Ava", gender: "girl", origin: "foreign", meaningAr: "الحياة، الطائر", meaningEn: "Life, bird" },
  { name: "ميا", nameEn: "Mia", gender: "girl", origin: "foreign", meaningAr: "الخاصة بي، المحبوبة", meaningEn: "Mine, beloved" },
  { name: "شارلوت", nameEn: "Charlotte", gender: "girl", origin: "foreign", meaningAr: "المرأة الحرة", meaningEn: "Free man/woman" },
  { name: "أميليا", nameEn: "Amelia", gender: "girl", origin: "foreign", meaningAr: "العمل الدؤوب، المجتهدة", meaningEn: "Work, industrious" },
  { name: "إيفلين", nameEn: "Evelyn", gender: "girl", origin: "foreign", meaningAr: "الحياة المرغوبة", meaningEn: "Desired life" },
  { name: "إليزابيث", nameEn: "Elizabeth", gender: "girl", origin: "foreign", meaningAr: "وعد الله", meaningEn: "Pledged to God" },
];

// Extract unique first letters
const arabicLetters = ["ا","أ","إ","آ","ب","ت","ث","ج","ح","خ","د","ذ","ر","ز","س","ش","ص","ض","ط","ظ","ع","غ","ف","ق","ك","ل","م","ن","ه","و","ي"];
const englishLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

export default function BabyNames({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const [searchQuery, setSearchQuery] = useState('');
  const [filterGender, setFilterGender] = useState<'all' | 'boy' | 'girl'>('all');
  const [filterOrigin, setFilterOrigin] = useState<'all' | 'arabic' | 'turkish' | 'foreign'>('all');
  const [filterLetter, setFilterLetter] = useState<string>('all');

  const filteredNames = useMemo(() => {
    return namesDatabase.filter((item) => {
      // Name match
      const searchableName = isAr ? item.name : item.nameEn.toLowerCase();
      const query = searchQuery.toLowerCase();
      const matchesSearch = searchableName.includes(query);

      // Gender match
      const matchesGender = filterGender === 'all' || item.gender === filterGender;

      // Origin match
      const matchesOrigin = filterOrigin === 'all' || item.origin === filterOrigin;

      // Letter match (normalize alifs for Arabic)
      let matchesLetter = true;
      if (filterLetter !== 'all') {
        if (isAr) {
          const firstChar = item.name.charAt(0);
          // Normalize Alif forms (أ, إ, آ, ا)
          const isAlifGroup = ["ا","أ","إ","آ"].includes(firstChar);
          const isTargetAlifGroup = ["ا","أ","إ","آ"].includes(filterLetter);
          
          if (isTargetAlifGroup) {
            matchesLetter = isAlifGroup;
          } else {
            matchesLetter = firstChar === filterLetter;
          }
        } else {
            matchesLetter = item.nameEn.charAt(0).toUpperCase() === filterLetter;
        }
      }

      return matchesSearch && matchesGender && matchesOrigin && matchesLetter;
    });
  }, [namesDatabase, searchQuery, filterGender, filterOrigin, filterLetter, isAr]);

  const generateShareText = () => {
    let str = isAr ? '*مصفاة أسماء الأطفال:*\n\n' : '*Baby Names Filter:*\n\n';
    str += isAr ? `ابحث عن أجمل الأسماء ومعانيها لطفلك القادم.\n\nجربها هنا: ` : `Find the most beautiful names and their meanings for your baby.\n\nTry it here: `;
    return encodeURIComponent(str + window.location.href);
  };

  const getOriginLabel = (origin: string) => {
    switch (origin) {
        case 'arabic': return t.arabic;
        case 'turkish': return t.turkish;
        case 'foreign': return t.foreign;
        default: return origin;
    }
  };

  const lettersList = isAr ? arabicLetters : englishLetters;

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
      {/* Top AdSense */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm">
        <div className="text-[10px] uppercase tracking-widest mb-1">{t.adTop}</div>
        <p className="text-[10px]">{t.adTopDesc}</p>
      </div>

      <section className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl flex flex-col gap-8 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="text-center relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg text-white">
            <Baby size={32} />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">{t.subtitle}</p>
        </div>

        <div className="flex flex-col gap-6 relative z-10">
          
          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-4 bg-slate-900/50 p-6 rounded-2xl border border-white/5 shadow-inner">
             {/* Search */}
             <div className="flex-1">
                 <div className="relative">
                    <input 
                      type="text" 
                      placeholder={t.searchPlaceholder}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 pr-10 text-white outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-mono"
                    />
                    <Search size={18} className="absolute right-3 top-3.5 text-slate-500" />
                 </div>
             </div>

             {/* Filters */}
             <div className="flex-[2] flex flex-wrap gap-4">
                 <div className="flex flex-col gap-2 min-w-[120px] flex-1">
                     <label className="text-xs font-bold text-slate-400">{t.gender}</label>
                     <select 
                        value={filterGender}
                        onChange={(e) => setFilterGender(e.target.value as any)}
                        className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-white outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none cursor-pointer"
                     >
                         <option value="all">{t.allGenders}</option>
                         <option value="boy">{t.boy}</option>
                         <option value="girl">{t.girl}</option>
                     </select>
                 </div>
                 
                 <div className="flex flex-col gap-2 min-w-[120px] flex-1">
                     <label className="text-xs font-bold text-slate-400">{t.origin}</label>
                     <select 
                        value={filterOrigin}
                        onChange={(e) => setFilterOrigin(e.target.value as any)}
                        className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-white outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none cursor-pointer"
                     >
                         <option value="all">{t.allOrigins}</option>
                         <option value="arabic">{t.arabic}</option>
                         <option value="turkish">{t.turkish}</option>
                         <option value="foreign">{t.foreign}</option>
                     </select>
                 </div>

                 <div className="flex flex-col gap-2 min-w-[120px] flex-1 md:col-span-2 lg:col-span-1">
                     <label className="text-xs font-bold text-slate-400">{t.letter}</label>
                     <select 
                        value={filterLetter}
                        onChange={(e) => setFilterLetter(e.target.value)}
                        className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-white outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none cursor-pointer"
                     >
                         <option value="all">{t.allLetters}</option>
                         {lettersList.map((l) => (
                             <option key={l} value={l}>{l}</option>
                         ))}
                     </select>
                 </div>
             </div>
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-2 px-2">
             <div className="text-sm font-bold text-slate-300 flex items-center gap-2">
                 <Filter size={16} className="text-indigo-400" />
                 {t.results}
             </div>
             <div className="text-xs text-slate-500 font-mono bg-slate-800 px-2 py-1 rounded">
                 {filteredNames.length}
             </div>
          </div>

          {/* Results Grid */}
          {filteredNames.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 custom-scrollbar max-h-[600px] overflow-y-auto pr-2">
                  {filteredNames.map((item, idx) => (
                      <div key={idx} className="p-4 bg-slate-800/40 hover:bg-slate-800/80 border border-white/5 hover:border-indigo-500/30 rounded-xl transition-all shadow-sm flex flex-col gap-3 group">
                         <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                                <div className={`p-2 rounded-lg ${item.gender === 'boy' ? 'bg-blue-500/20 text-blue-400' : 'bg-pink-500/20 text-pink-400'}`}>
                                    {item.gender === 'boy' ? <User size={18} /> : <User size={18} />}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-100 leading-none">
                                        {isAr ? item.name : item.nameEn}
                                    </h3>
                                    <span className="text-[10px] text-slate-500 block mt-1 tracking-wider uppercase">
                                        {isAr ? item.nameEn : item.name}
                                    </span>
                                </div>
                            </div>
                            <span className="text-[10px] bg-slate-900/50 text-indigo-300/80 px-2 py-1 rounded">
                                {getOriginLabel(item.origin)}
                            </span>
                         </div>
                         <div className="text-sm text-slate-400 flex items-start gap-2 bg-slate-900/30 p-2 rounded-lg">
                            <BookOpen size={14} className="mt-0.5 opacity-50 shrink-0" />
                            <span>{isAr ? item.meaningAr : item.meaningEn}</span>
                         </div>
                      </div>
                  ))}
              </div>
          ) : (
              <div className="py-12 flex flex-col items-center justify-center text-slate-500 bg-slate-900/30 rounded-2xl border border-white/5 border-dashed">
                 <Users size={48} className="mb-4 opacity-50 text-slate-600" />
                 <p>{t.noResults}</p>
              </div>
          )}

        </div>
        
        <div className="hidden md:flex justify-center pt-4 relative z-10 w-full mt-2 border-t border-white/5">
            <a
              href={`https://wa.me/?text=${generateShareText()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 mt-4 px-8 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm font-bold text-white shadow-lg transition-all border border-white/10"
            >
              <Share2 size={16} />
              {t.shareWhatsapp}
            </a>
        </div>
      </section>

      {/* Middle AdSense */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm my-2">
        <div className="text-[10px] uppercase tracking-widest mb-1">{t.adMiddle}</div>
        <p className="text-[10px]">{t.adMiddleDesc}</p>
      </div>

      <article className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col gap-4 text-[13px] text-slate-300 leading-relaxed shadow-lg">
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-2">
            <Info size={20} className="text-indigo-400"/>
            <h2 className="text-lg font-bold text-indigo-400">{t.aboutTitle}</h2>
        </div>
        <div className="space-y-4">
          <p>{t.aboutP1}</p>
        </div>
      </article>

    </div>
  );
}
