import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, Footprints, Shirt, Ruler } from 'lucide-react';

const sizeData: Record<string, any[]> = {
  shoes_men: [
    { us: "6", uk: "5.5", eu: "39", jp: "24", cm: "23.5" },
    { us: "6.5", uk: "6", eu: "39.5", jp: "24.5", cm: "24.1" },
    { us: "7", uk: "6.5", eu: "40", jp: "25", cm: "24.4" },
    { us: "7.5", uk: "7", eu: "40.5", jp: "25.5", cm: "24.8" },
    { us: "8", uk: "7.5", eu: "41", jp: "26", cm: "25.4" },
    { us: "8.5", uk: "8", eu: "41.5", jp: "26.5", cm: "25.7" },
    { us: "9", uk: "8.5", eu: "42", jp: "27", cm: "26.0" },
    { us: "9.5", uk: "9", eu: "42.5", jp: "27.5", cm: "26.7" },
    { us: "10", uk: "9.5", eu: "43", jp: "28", cm: "27.0" },
    { us: "10.5", uk: "10", eu: "44", jp: "28.5", cm: "27.3" },
    { us: "11", uk: "10.5", eu: "45", jp: "29", cm: "27.9" },
    { us: "11.5", uk: "11", eu: "45.5", jp: "29.5", cm: "28.3" },
    { us: "12", uk: "11.5", eu: "46", jp: "30", cm: "28.6" },
  ],
  shoes_women: [
    { us: "5", uk: "3", eu: "35", jp: "22", cm: "22.8" },
    { us: "5.5", uk: "3.5", eu: "35.5", jp: "22.5", cm: "23.1" },
    { us: "6", uk: "4", eu: "36", jp: "23", cm: "23.5" },
    { us: "6.5", uk: "4.5", eu: "37", jp: "23.5", cm: "23.8" },
    { us: "7", uk: "5", eu: "37.5", jp: "24", cm: "24.1" },
    { us: "7.5", uk: "5.5", eu: "38", jp: "24.5", cm: "24.5" },
    { us: "8", uk: "6", eu: "38.5", jp: "25", cm: "24.8" },
    { us: "8.5", uk: "6.5", eu: "39", jp: "25.5", cm: "25.1" },
    { us: "9", uk: "7", eu: "40", jp: "26", cm: "25.4" },
    { us: "9.5", uk: "7.5", eu: "40.5", jp: "26.5", cm: "25.7" },
    { us: "10", uk: "8", eu: "41", jp: "27", cm: "26.0" },
  ],
  clothes_men: [
    { intl: "S", us: "34-36", uk: "34-36", eu: "46", jp: "M" },
    { intl: "M", us: "38-40", uk: "38-40", eu: "48-50", jp: "L" },
    { intl: "L", us: "42-44", uk: "42-44", eu: "52-54", jp: "LL" },
    { intl: "XL", us: "46-48", uk: "46-48", eu: "56-58", jp: "3L" },
    { intl: "XXL", us: "50-52", uk: "50-52", eu: "60-62", jp: "4L" }
  ],
  clothes_women: [
    { intl: "XS", us: "2", uk: "6", eu: "34", jp: "7" },
    { intl: "S", us: "4-6", uk: "8-10", eu: "36-38", jp: "9-11" },
    { intl: "M", us: "8-10", uk: "12-14", eu: "40-42", jp: "13-15" },
    { intl: "L", us: "12-14", uk: "16-18", eu: "44-46", jp: "17-19" },
    { intl: "XL", us: "16-18", uk: "20-22", eu: "48-50", jp: "21-23" }
  ]
};

type Category = 'shoes_men' | 'shoes_women' | 'clothes_men' | 'clothes_women';

export default function ClothingShoeSizeConverter({ lang }: { lang: 'ar' | 'en' }) {
  const isAr = lang === 'ar';
  
  const [activeCategory, setActiveCategory] = useState<Category>('shoes_men');
  const [fromSystem, setFromSystem] = useState<string>('eu');
  const [inputValue, setInputValue] = useState<string>('');

  const currentData = sizeData[activeCategory];
  const isShoes = activeCategory.startsWith('shoes');
  
  // Available systems for current category
  const availableSystems = isShoes ? ['eu', 'us', 'uk', 'jp', 'cm'] : ['intl', 'eu', 'us', 'uk', 'jp'];
  
  // Validate fromSystem on category change
  useEffect(() => {
    if (!availableSystems.includes(fromSystem)) {
      setFromSystem(availableSystems[0]);
    }
  }, [activeCategory, fromSystem, availableSystems]);

  const tabs = [
    { id: 'shoes_men', labelAr: 'أحذية رجالي', labelEn: 'Men\'s Shoes', icon: Footprints },
    { id: 'shoes_women', labelAr: 'أحذية نسائي', labelEn: 'Women\'s Shoes', icon: Footprints },
    { id: 'clothes_men', labelAr: 'ملابس رجالي', labelEn: 'Men\'s Clothing', icon: Shirt },
    { id: 'clothes_women', labelAr: 'ملابس نسائي', labelEn: 'Women\'s Clothing', icon: Shirt },
  ];

  const handleCategoryChange = (cat: Category) => {
    setActiveCategory(cat);
    setInputValue('');
  };

  // Find the matched row based on input
  // Exact match checking ignoring case and spaces
  const matchedRow = currentData.find(row => 
    String(row[fromSystem]).toLowerCase() === inputValue.toLowerCase().trim()
  );

  const systemLabels: Record<string, string> = {
    us: isAr ? 'أمريكي (US)' : 'US',
    uk: isAr ? 'بريطاني (UK)' : 'UK',
    eu: isAr ? 'أوروبي (EU)' : 'EU',
    jp: isAr ? 'ياباني (JP)' : 'JP',
    cm: isAr ? 'سم (CM)' : 'CM',
    intl: isAr ? 'دولي (Intl)' : 'International',
  };

  // Options for current selected system to show as chips
  const currentOptions = currentData.map(row => String(row[fromSystem]));

  const handleSystemChange = (sys: string) => {
    setFromSystem(sys);
    setInputValue('');
  };

  return (
    <div className="flex flex-col gap-6 p-4 max-w-6xl mx-auto w-full">
      <div className="flex items-center gap-4 mb-2">
        <div className="w-12 h-12 bg-sky-500/20 text-sky-400 rounded-xl flex items-center justify-center shrink-0">
          <ArrowRightLeft size={28} />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-100">
            {isAr ? 'محول مقاسات الملابس والأحذية' : 'Clothing & Shoe Size Converter'}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            {isAr 
              ? 'أدخل مقاسك المعتاد بأي نظام ليظهر لك ما يعادله عالمياً' 
              : 'Enter your typical size in any standard to instantly view global equivalents'}
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleCategoryChange(tab.id as Category)}
              className={`py-4 px-4 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all border shadow-sm ${
                isActive 
                  ? 'bg-sky-500/10 border-sky-500/30 text-sky-400 shadow-sky-500/5' 
                  : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-slate-300'
              }`}
            >
              <Icon size={28} />
              <span className="font-semibold">{isAr ? tab.labelAr : tab.labelEn}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4 items-start">
        
        {/* LEFT: Input Section */}
        <div className="lg:col-span-5 bg-slate-900/40 rounded-3xl border border-white/10 p-6 md:p-8 backdrop-blur-xl shadow-lg">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Ruler className="text-sky-400" />
            {isAr ? 'حدد مقاسك' : 'Determine your size'}
          </h3>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-400 mb-3">
              {isAr ? '1. ما هو النظام الذي تعرف مقاسك فيه؟' : '1. Which standard do you know your size in?'}
            </label>
            <div className="flex flex-wrap gap-2">
              {availableSystems.map(sys => (
                <button
                  key={sys}
                  onClick={() => handleSystemChange(sys)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                    fromSystem === sys
                      ? 'bg-slate-800 border-sky-400/50 text-white shadow-md'
                      : 'bg-slate-950/50 border-white/5 text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                  }`}
                >
                  {systemLabels[sys]}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-2">
            <label className="block text-sm font-medium text-slate-400 mb-3">
              {isAr ? '2. اكتب أو اختر المقاس:' : '2. Enter or select size:'}
            </label>
            <input 
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={isAr ? 'مثال: 42 أو M' : 'e.g. 42 or M'}
              className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-2xl font-black text-center text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all placeholder:text-slate-700 placeholder:font-normal shadow-inner"
            />
          </div>

          {/* Quick Selection Chips */}
          <div className="mt-6">
            <p className="text-xs text-slate-500 mb-3 text-center">
               {isAr ? 'أو اختر سريعاً من القائمة' : 'Or select quickly from the list'}
            </p>
            <div className="flex flex-wrap gap-2 justify-center max-h-[160px] overflow-y-auto p-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pr-2">
              {currentOptions.map(opt => (
                <button
                  key={opt}
                  onClick={() => setInputValue(opt)}
                  className={`min-w-[48px] px-3 py-2 rounded-xl text-sm border font-bold transition-all ${
                    inputValue.trim().toLowerCase() === opt.toLowerCase() 
                      ? 'bg-sky-500/20 border-sky-400 text-sky-400 shadow-sm'
                      : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10 hover:border-white/20'
                  } active:scale-95`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* RIGHT: Results Section */}
        <div className="lg:col-span-7 pt-0 lg:pt-0 flex flex-col h-full justify-center">
          {!inputValue ? (
              <div className="h-full min-h-[250px] flex flex-col items-center justify-center p-8 bg-slate-900/20 rounded-3xl border border-dashed border-white/10 text-slate-500">
                <Shirt size={48} className="mb-4 opacity-20" />
                <p className="text-lg text-center font-medium max-w-xs leading-relaxed">
                  {isAr ? 'أدخل مقاسك في القسم الأول لعرض النتيجة' : 'Enter your size in the first section to view the result'}
                </p>
              </div>
          ) : matchedRow ? (
              <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-6 animate-in fade-in zoom-in-95 duration-300 ease-out">
                {availableSystems.filter(sys => sys !== fromSystem).map((sys, idx) => {
                   const gradients = [
                     'from-emerald-500/20 to-teal-500/5',
                     'from-blue-500/20 to-indigo-500/5',
                     'from-purple-500/20 to-fuchsia-500/5',
                     'from-orange-500/20 to-amber-500/5',
                     'from-pink-500/20 to-rose-500/5'
                   ];
                   const accentColors = [
                     'bg-emerald-400', 'bg-blue-400', 'bg-purple-400', 'bg-orange-400', 'bg-pink-400'
                   ];
                   const gradient = gradients[idx % gradients.length];
                   const accent = accentColors[idx % accentColors.length];
                   
                   return (
                     <div key={sys} className={`bg-gradient-to-br ${gradient} border border-white/10 p-6 md:p-8 rounded-3xl flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden group`}>
                       <span className="text-sm md:text-base font-bold text-slate-300 mb-2">{systemLabels[sys]}</span>
                       <span className="text-4xl md:text-5xl font-black text-white group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">
                         {matchedRow[sys]}
                       </span>
                       <div className={`absolute bottom-0 left-0 w-full h-1.5 ${accent} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}></div>
                     </div>
                   );
                })}
              </div>
          ) : (
              <div className="h-full min-h-[250px] flex flex-col items-center justify-center p-8 bg-red-500/5 rounded-3xl border border-dashed border-red-500/20 text-red-400/80">
                <span className="text-5xl mb-4">🤔</span>
                <p className="text-lg text-center font-medium max-w-xs leading-relaxed">
                  {isAr ? 'عذراً، المقاس المدخل غير موجود في المعايير القياسية.' : 'Sorry, the entered size is not found in standard measurements.'}
                </p>
                <p className="text-sm mt-4 text-red-400/60 text-center">
                  {isAr ? 'يرجى مراجعة الأرقام المتاحة أسفل الحقل' : 'Please review the available options below the input'}
                </p>
              </div>
          )}
        </div>
      </div>
      
    </div>
  );
}
