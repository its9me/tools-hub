import React, { useState, useMemo } from 'react';
import { BookOpen, Search, Plane, Bed, Wallet, Sparkles, X, Coffee } from 'lucide-react';

type Category = 'all' | 'flights' | 'stay' | 'lifestyle' | 'money';

const slangData = [
  {
    id: 1,
    term: 'Red-eye flight',
    category: 'flights',
    meaningAr: 'رحلة العين الحمراء (رحلة طيران ليلية متأخرة)',
    meaningEn: 'A flight that departs late at night and arrives early morning.',
    exampleAr: 'أخذت "ريد-آي فلایت" ووصلت لروما عيوني حمراء كأني مصاص دماء! 🧛‍♂️',
    exampleEn: 'I took a red-eye flight to Rome and arrived looking like a vampire! 🧛‍♂️'
  },
  {
    id: 2,
    term: 'Jet-lagged',
    category: 'flights',
    meaningAr: 'مسطور من السفر (اضطراب الساعة البيولوجية بسبب اختلاف التوقيت)',
    meaningEn: 'Tired and confused after a long flight across different time zones.',
    exampleAr: 'تحدثني في الظهر لكن عقلي في طوكيو يعتقد أنها الثالثة فجراً، أنا جداً جيت-لاجد! 😵‍💫',
    exampleEn: 'You are talking to me at noon but my brain is in Tokyo thinking it\'s 3 AM, I am so jet-lagged! 😵‍💫'
  },
  {
    id: 3,
    term: 'Fleabag motel',
    category: 'stay',
    meaningAr: 'فندق الخرابة (فندق أو موتيل رخيص جداً ومتهالك وربما مليء بالحشرات)',
    meaningEn: 'A very cheap, dirty, and run-down motel or hotel.',
    exampleAr: 'حجزت أونلاين ولما وصلت لقيت نفسي في "فليباق موتيل"، السرير يشتكي مني! 🪳',
    exampleEn: 'Booked online and ended up in a fleabag motel, even the bed was complaining! 🪳'
  },
  {
    id: 4,
    term: 'Couchsurfing',
    category: 'stay',
    meaningAr: 'النوم على كنب الغرباء (تطبيق وإسلوب للإقامة مجاناً عند أشخاص محليين)',
    meaningEn: 'Staying for free at a local\'s house, usually sleeping on their couch.',
    exampleAr: 'عشان أوفر فلوس الإقامة، سويت "كوتش-سيرفينج" ونمت مع قطة المضيف! 🐈',
    exampleEn: 'To save money, I did couchsurfing and slept next to the host\'s cat! 🐈'
  },
  {
    id: 5,
    term: 'Tourist trap',
    category: 'money',
    meaningAr: 'فخ السياح (مكان زحمة وغالي استغلالاً للسياح ولا يقدم جودة حقيقية)',
    meaningEn: 'A crowded, overpriced place designed specifically to take tourists\' money.',
    exampleAr: 'المطعم اللي قدام برج إيفل مباشرة؟ أكبر "توريست تراب"، اشتريت ماء بسعر الذهب! 💸',
    exampleEn: 'That restaurant right in front of the Eiffel Tower? Huge tourist trap, bought water for the price of gold! 💸'
  },
  {
    id: 6,
    term: 'Glamping',
    category: 'stay',
    meaningAr: 'تخييم الدلع (تخييم فخم ومريح بمكيف وسرير، للناس اللي ما تحب التراب)',
    meaningEn: 'Glamorous camping. Camping with hotel-like amenities.',
    exampleAr: 'أنا ما أنام بخيمة بالبر، أنا حق "جلامبينج"، جيب لي مكيف وقهوة مختصة في الغابة! ⛺✨',
    exampleEn: 'I don\'t sleep in regular tents, I go glamping, bring me AC and specialty coffee in the woods! ⛺✨'
  },
  {
    id: 7,
    term: 'Digital Nomad',
    category: 'lifestyle',
    meaningAr: 'البدوي الرقمي (موظف أو فريلانسر يتنقل ويسافر ويشتغل من لابتوبه بأي مكان)',
    meaningEn: 'A person who earns a living working online while traveling frequently.',
    exampleAr: 'صديقي صار "ديجيتال نوماد"، يرسل لي إيميل العمل وهو يشرب جوز هند في بالي! 🥥💻',
    exampleEn: 'My friend became a digital nomad, sending work emails while sipping coconuts in Bali! 🥥💻'
  },
  {
    id: 8,
    term: 'Staycation',
    category: 'lifestyle',
    meaningAr: 'إجازة في الديرة (تأخذ إجازة بس تجلس في مدينتك، تروح فنادق وتريح كأنك مسافر)',
    meaningEn: 'A vacation spent in one\'s home country or city rather than traveling abroad.',
    exampleAr: 'مفلسين هالسنة؟ الحل هو "ستيكيشن"، نسوي أنفسنا سياح في حارتنا! 🏡😎',
    exampleEn: 'Broke this year? The solution is a staycation, playing tourist in our own neighborhood! 🏡😎'
  },
  {
    id: 9,
    term: 'Bumped',
    category: 'flights',
    meaningAr: 'انطرد من الرحلة (لما تبيع الخطوط تذاكر أكثر من الكراسي ويمنعونك من الصعود)',
    meaningEn: 'When an airline denies you boarding because the flight is overbooked.',
    exampleAr: 'ورحت المطار مستانس وبس انصدمت اني "بامبد" لأن الطيارة فل! 🚫✈️',
    exampleEn: 'Went to the airport excited just to find out I got bumped because it was overbooked! 🚫✈️'
  },
  {
    id: 10,
    term: 'Flashpacker',
    category: 'lifestyle',
    meaningAr: 'رحالة كشخة ورع (مثل الباك-باكر بس ميزانيته ممتازة ومعاه أجهزة لابتوب وكاميرات غالية)',
    meaningEn: 'A backpacker who travels with a bigger budget and expensive gadgets.',
    exampleAr: 'شايل حقيبة ظهر بس لابس رولكس وتصوّر ايفون برو؟ أنت "فلاش-باكر" طال عمرك! 📱💼',
    exampleEn: 'Backpacking but wearing a Rolex and shooting on an iPhone Pro? You\'re a flashpacker mate! 📱💼'
  },
  {
    id: 11,
    term: 'Off the beaten path',
    category: 'lifestyle',
    meaningAr: 'خارج المألوف (أماكن مخفية ما يروح لها السياح بكثرة، اكتشافات سرية)',
    meaningEn: 'Places that are not well-known or popular with typical tourists.',
    exampleAr: 'أكره الزحمة، أحب الأماكن "أوف ذا بيتن باث"، مثل مطعم ما يعرفه إلا العجايز في إيطاليا! 🍝👵',
    exampleEn: 'I hate crowds, I prefer places off the beaten path, like a restaurant only Italian grandmas know! 🍝👵'
  },
  {
    id: 12,
    term: 'Travel Bug',
    category: 'lifestyle',
    meaningAr: 'عدوى السفر (هوس وشغف السفر اللي يخليك تفكر بالرحلة الجاية وأنت لسه راجع)',
    meaningEn: 'A strong urge or desire to travel across the world.',
    exampleAr: 'انعضيت بـ "ترافل بق"، توني راجع من دبي وقاعد أدور تذاكر لليابان! 🐛✈️',
    exampleEn: 'I caught the travel bug, just got back from Dubai and already looking for flights to Japan! 🐛✈️'
  }
];

export default function TravelSlangDictionary({ lang }: { lang: 'ar' | 'en' }) {
  const isAr = lang === 'ar';
  
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', labelAr: 'الكل', labelEn: 'All', icon: Sparkles },
    { id: 'flights', labelAr: 'مطارات وطيران', labelEn: 'Flights', icon: Plane },
    { id: 'stay', labelAr: 'سكن وإقامة', labelEn: 'Accommodation', icon: Bed },
    { id: 'money', labelAr: 'فلوس وفخاخ', labelEn: 'Money & Traps', icon: Wallet },
    { id: 'lifestyle', labelAr: 'أسلوب السفر', labelEn: 'Lifestyle', icon: Coffee }
  ];

  const filteredSlang = useMemo(() => {
    return slangData.filter(item => {
      const matchCat = activeCategory === 'all' || item.category === activeCategory;
      const matchSearch = item.term.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.meaningAr.includes(searchQuery) || 
                          item.meaningEn.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="flex flex-col gap-8 p-4 max-w-5xl mx-auto w-full">
      {/* Top AdSense */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm">
        <div className="text-[10px] uppercase tracking-widest mb-1">{isAr ? 'مساحة إعلانية' : 'AdSense Ad'}</div>
        <p className="text-[10px]">{isAr ? 'AD_SPACE_728x90 (أعلى)' : 'AD_SPACE_728x90 (Top)'}</p>
      </div>
      {/* Header section */}
      <div className="flex flex-col items-center gap-3 text-center mb-2 animate-in slide-in-from-top-4 fade-in">
        <div className="w-16 h-16 bg-gradient-to-tr from-amber-500 to-orange-500 text-white rounded-3xl flex items-center justify-center shadow-lg shadow-amber-500/20 rotate-3">
          <BookOpen size={32} />
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
          {isAr ? 'قاموس الـ Slang السياحي' : 'The Street Travel Slang'}
        </h1>
        <p className="text-slate-400 max-w-lg mt-2 text-sm md:text-base">
          {isAr 
            ? 'مصطلحات "الشارع" الدارجة في المطارات والفنادق وحياة الرحالة والتي لا يدرسونها في المدارس أبداً! تحدث كالمحليين.'
            : 'Street-smart travel acronyms and slang for airports, hotels, and backpackers that they don\'t teach you in school. Speak like a local.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT: Filters and Search */}
        <div className="lg:col-span-4 flex flex-col gap-6">
           <div className="bg-slate-900 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-xl sticky top-6">
              
              <div className="relative mb-6">
                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search size={18} className="text-slate-500" />
                 </div>
                 <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={isAr ? 'ابحث عن مصطلح...' : 'Search for slang...'}
                    className="w-full bg-slate-950 border border-white/10 pl-11 pr-10 py-4 rounded-xl text-white focus:border-amber-500 focus:outline-none transition-colors"
                 />
                 {searchQuery && (
                   <button 
                     onClick={() => setSearchQuery('')}
                     className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                   >
                      <X size={18} />
                   </button>
                 )}
              </div>

              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
                 {isAr ? 'التصنيفات' : 'Categories'}
              </h3>
              
              <div className="flex flex-col gap-2">
                 {categories.map(cat => {
                   const Icon = cat.icon;
                   const isActive = activeCategory === cat.id;
                   return (
                     <button
                       key={cat.id}
                       onClick={() => setActiveCategory(cat.id as Category)}
                       className={`flex items-center gap-3 w-full text-left p-4 rounded-xl font-medium transition-all ${
                         isActive 
                           ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 border' 
                           : 'bg-white/5 border border-transparent text-slate-300 hover:bg-white/10'
                       }`}
                     >
                       <Icon size={18} className={isActive ? 'text-amber-400' : 'text-slate-500'} />
                       {isAr ? cat.labelAr : cat.labelEn}
                     </button>
                   )
                 })}
              </div>

           </div>
        </div>
        
        {/* RIGHT: Results Grid */}
        <div className="lg:col-span-8">
           <div className="flex justify-between items-end mb-4 px-2">
              <h2 className="text-xl font-bold text-white">
                 {isAr ? 'المصطلحات' : 'Terms'} <span className="text-amber-500">({filteredSlang.length})</span>
              </h2>
           </div>

           {filteredSlang.length === 0 ? (
              <div className="bg-slate-900 border border-dashed border-white/10 rounded-3xl p-12 text-center flex flex-col items-center text-slate-500">
                 <Search size={48} className="opacity-20 mb-4" />
                 <p className="text-lg font-medium">
                   {isAr ? 'لم نجد أي مصطلحات تطابق بحثك!' : 'No slang terms found matching your search!'}
                 </p>
                 <button onClick={() => setSearchQuery('')} className="mt-4 text-amber-500 hover:text-amber-400 font-medium">
                    {isAr ? 'مسح البحث' : 'Clear search'}
                 </button>
              </div>
           ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
               {filteredSlang.map(item => (
                  <div key={item.id} className="bg-slate-900 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-lg hover:border-amber-500/30 transition-colors group">
                     <div className="flex items-start justify-between mb-4">
                        <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-amber-400 transition-colors">
                           {item.term}
                        </h3>
                        <span className="bg-white/5 text-slate-400 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider border border-white/5">
                           {isAr ? categories.find(c => c.id === item.category)?.labelAr : categories.find(c => c.id === item.category)?.labelEn}
                        </span>
                     </div>
                     
                     <div className="space-y-4">
                        <div>
                           <p className="text-slate-300 font-medium text-sm leading-relaxed mb-1">
                             <span className="text-amber-500 font-bold mr-1">{isAr ? 'المعنى:' : 'Meaning:'}</span>
                             {isAr ? item.meaningAr : item.meaningEn}
                           </p>
                        </div>
                        
                        <div className="bg-slate-950/50 p-4 rounded-xl border border-white/5 relative">
                           <div className="absolute top-2 left-2 opacity-10 font-serif text-4xl">"</div>
                           <p className="text-slate-400 text-sm leading-relaxed relative z-10 italic">
                             {isAr ? item.exampleAr : item.exampleEn}
                           </p>
                        </div>
                     </div>
                  </div>
               ))}
             </div>
           )}
        </div>
      </div>

      {/* Middle AdSense */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm my-2">
        <div className="text-[10px] uppercase tracking-widest mb-1">{isAr ? 'مساحة إعلانية' : 'AdSense Ad'}</div>
        <p className="text-[10px]">{isAr ? 'AD_SPACE_728x90 (وسط)' : 'AD_SPACE_728x90 (Middle)'}</p>
      </div>
    </div>
  );
}
