import React, { useState, useEffect } from 'react';
import { Clock, Plus, Trash2, Calendar, MapPin, Edit3, Image as ImageIcon, Palmtree, Mountain, Building2, Snowflake, Sunrise } from 'lucide-react';

interface BucketListItem {
  id: string;
  text: string;
  done: boolean;
}

interface TripData {
  destination: string;
  targetDate: string;
  bgImage: string;
  bucketList: BucketListItem[];
}

const TEMPLATES = [
  {
    id: 'beach',
    nameAr: 'شاطئ وجزر',
    nameEn: 'Beach & Islands',
    url: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=1200&h=800',
    icon: Palmtree
  },
  {
    id: 'city',
    nameAr: 'مدينة ومباني',
    nameEn: 'City & Urban',
    url: 'https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?auto=format&fit=crop&q=80&w=1200&h=800',
    icon: Building2
  },
  {
    id: 'mountain',
    nameAr: 'جبال وطبيعة',
    nameEn: 'Mountains & Nature',
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200&h=800',
    icon: Mountain
  },
  {
    id: 'snow',
    nameAr: 'أجواء شتوية',
    nameEn: 'Winter & Snow',
    url: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?auto=format&fit=crop&q=80&w=1200&h=800',
    icon: Snowflake
  },
  {
    id: 'desert',
    nameAr: 'صحراء وثقافة',
    nameEn: 'Desert & Culture',
    url: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&q=80&w=1200&h=800',
    icon: Sunrise
  }
];

export default function TripCountdown({ lang }: { lang: 'ar' | 'en' }) {
  const isAr = lang === 'ar';
  
  const [tripData, setTripData] = useState<TripData | null>(null);
  
  // Setup Form states
  const [isSettingUp, setIsSettingUp] = useState(true);
  const [inputDest, setInputDest] = useState('');
  const [inputDate, setInputDate] = useState('');
  const [inputBg, setInputBg] = useState(TEMPLATES[0].url);

  // Countdown specific states
  const [timeLeft, setTimeLeft] = useState<{ d: number, h: number, m: number, s: number } | null>(null);
  const [isPassed, setIsPassed] = useState(false);

  // Wishlist
  const [newItemText, setNewItemText] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('tripCountdownData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTripData(parsed);
        setIsSettingUp(false);
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    if (tripData) {
      localStorage.setItem('tripCountdownData', JSON.stringify(tripData));
    } else {
      localStorage.removeItem('tripCountdownData');
    }
  }, [tripData]);

  useEffect(() => {
    if (!tripData || isSettingUp) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(tripData.targetDate).getTime();
      const difference = target - now;

      if (difference <= 0) {
        setIsPassed(true);
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
      } else {
        setIsPassed(false);
        setTimeLeft({
          d: Math.floor(difference / (1000 * 60 * 60 * 24)),
          h: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          m: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          s: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [tripData, isSettingUp]);

  const handleCreateTrip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputDest.trim() || !inputDate) return;

    setTripData({
      destination: inputDest,
      targetDate: inputDate,
      bgImage: inputBg,
      bucketList: []
    });
    setIsSettingUp(false);
  };

  const handleEditTrip = () => {
    if (tripData) {
      setInputDest(tripData.destination);
      setInputDate(tripData.targetDate);
      setInputBg(tripData.bgImage);
    }
    setIsSettingUp(true);
  };

  const addBucketItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim() || !tripData) return;
    
    const newItem: BucketListItem = {
      id: Date.now().toString(),
      text: newItemText.trim(),
      done: false
    };

    setTripData({
      ...tripData,
      bucketList: [...tripData.bucketList, newItem]
    });
    setNewItemText('');
  };

  const toggleBucketItem = (id: string) => {
    if (!tripData) return;
    setTripData({
      ...tripData,
      bucketList: tripData.bucketList.map(item => 
        item.id === id ? { ...item, done: !item.done } : item
      )
    });
  };

  const deleteBucketItem = (id: string) => {
    if (!tripData) return;
    setTripData({
      ...tripData,
      bucketList: tripData.bucketList.filter(item => item.id !== id)
    });
  };

  if (isSettingUp) {
    return (
      <div className="flex flex-col p-4 max-w-3xl mx-auto w-full animate-in fade-in zoom-in-95 gap-6">
        {/* Top AdSense */}
        <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm">
          <div className="text-[10px] uppercase tracking-widest mb-1">{isAr ? 'مساحة إعلانية' : 'AdSense Ad'}</div>
          <p className="text-[10px]">{isAr ? 'AD_SPACE_728x90 (أعلى)' : 'AD_SPACE_728x90 (Top)'}</p>
        </div>

        <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-indigo-500/20 text-indigo-400 rounded-xl flex items-center justify-center shrink-0">
              <Clock size={28} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                {isAr ? 'رحلتي القادمة' : 'My Next Trip'}
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                {isAr ? 'أدخل تفاصيل وجهتك واضبط العد التنازلي' : 'Enter your destination details and set the countdown'}
              </p>
            </div>
          </div>

          <form onSubmit={handleCreateTrip} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                  <MapPin size={16} /> {isAr ? 'الوجهة' : 'Destination'}
                </label>
                <input
                  type="text"
                  required
                  value={inputDest}
                  onChange={(e) => setInputDest(e.target.value)}
                  placeholder={isAr ? 'مثال: باريس، لندن، المالديف...' : 'e.g. Paris, London, Maldives...'}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                  <Calendar size={16} /> {isAr ? 'تاريخ الرحلة' : 'Travel Date'}
                </label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={inputDate}
                  onChange={(e) => setInputDate(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-indigo-500 transition-colors [&::-webkit-calendar-picker-indicator]:invert"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <ImageIcon size={16} /> {isAr ? 'اختر قالب الخلفية' : 'Choose Background Template'}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {TEMPLATES.map(tmp => {
                  const Icon = tmp.icon;
                  const isSelected = inputBg === tmp.url;
                  return (
                    <button
                      key={tmp.id}
                      type="button"
                      onClick={() => setInputBg(tmp.url)}
                      className={`relative h-24 rounded-xl overflow-hidden group border-2 transition-all ${
                        isSelected ? 'border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'border-transparent hover:border-white/20'
                      }`}
                    >
                      <img src={tmp.url} alt={tmp.nameEn} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-2 bg-slate-900/40">
                         <Icon size={20} className={isSelected ? 'text-indigo-400' : 'text-white'} />
                         <span className={`text-[10px] mt-1 font-bold text-center leading-tight ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                           {isAr ? tmp.nameAr : tmp.nameEn}
                         </span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="pt-4 flex gap-3">
              <button
                type="submit"
                className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/25 active:scale-95"
              >
                {isAr ? 'بدء العداد' : 'Start Countdown'}
              </button>
              {tripData && (
                <button
                  type="button"
                  onClick={() => setIsSettingUp(false)}
                  className="py-4 px-6 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-all border border-white/5 active:scale-95"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Middle AdSense */}
        <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm my-2">
          <div className="text-[10px] uppercase tracking-widest mb-1">{isAr ? 'مساحة إعلانية' : 'AdSense Ad'}</div>
          <p className="text-[10px]">{isAr ? 'AD_SPACE_728x90 (وسط)' : 'AD_SPACE_728x90 (Middle)'}</p>
        </div>
      </div>
    );
  }

  if (!tripData) return null;

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      {/* Top AdSense */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm">
        <div className="text-[10px] uppercase tracking-widest mb-1">{isAr ? 'مساحة إعلانية' : 'AdSense Ad'}</div>
        <p className="text-[10px]">{isAr ? 'AD_SPACE_728x90 (أعلى)' : 'AD_SPACE_728x90 (Top)'}</p>
      </div>

      <div className="flex flex-col -m-4 md:m-0 h-[calc(100vh-8rem)] min-h-[600px] relative rounded-none md:rounded-3xl overflow-hidden animate-in fade-in duration-700">
      
      {/* Background Image Setup */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 transition-all duration-1000 scale-105"
        style={{ backgroundImage: `url(${tripData.bgImage})` }}
      />
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-900/30 z-0" />

      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex flex-col p-6 md:p-10 overflow-y-auto">
        
        {/* Header Actions */}
        <div className="flex justify-end mb-4">
           <button 
             onClick={handleEditTrip}
             className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-white text-sm font-bold flex items-center gap-2 transition-all active:scale-95"
           >
             <Edit3 size={16} />
             {isAr ? 'تعديل الرحلة' : 'Edit Trip'}
           </button>
        </div>

        {/* Main Countdown Center */}
        <div className="flex flex-col items-center justify-center flex-1 mt-4 mb-12 text-center drop-shadow-2xl">
           <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 font-bold tracking-widest text-sm mb-6 backdrop-blur-md uppercase">
              <MapPin size={16} /> {tripData.destination}
           </div>
           
           {isPassed ? (
              <div className="animate-in zoom-in slide-in-from-bottom-4 duration-500">
                 <h2 className="text-5xl md:text-7xl font-black text-white mb-4">
                   {isAr ? 'لقد حان الوقت!' : 'It\'s Time!'}
                 </h2>
                 <p className="text-xl md:text-2xl text-indigo-300 font-medium">
                   {isAr ? 'رحلة سعيدة إلى' : 'Have a great trip to'} {tripData.destination} ✈️
                 </p>
              </div>
           ) : timeLeft ? (
              <div className="flex gap-4 md:gap-8 justify-center items-center">
                 <div className="flex flex-col items-center">
                    <div className="w-20 h-24 md:w-32 md:h-36 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center mb-3 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                       <span className="text-5xl md:text-7xl font-black text-white tabular-nums tracking-tighter">
                         {String(timeLeft.d).padStart(2, '0')}
                       </span>
                    </div>
                    <span className="text-slate-300 font-bold text-xs md:text-sm uppercase tracking-widest">
                       {isAr ? 'يوم' : 'Days'}
                    </span>
                 </div>
                 <span className="text-4xl text-white/30 font-light -mt-8">:</span>

                 <div className="flex flex-col items-center">
                    <div className="w-20 h-24 md:w-32 md:h-36 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center mb-3 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                       <span className="text-5xl md:text-7xl font-black text-white tabular-nums tracking-tighter">
                         {String(timeLeft.h).padStart(2, '0')}
                       </span>
                    </div>
                    <span className="text-slate-300 font-bold text-xs md:text-sm uppercase tracking-widest">
                       {isAr ? 'ساعة' : 'Hours'}
                    </span>
                 </div>
                 <span className="text-4xl text-white/30 font-light -mt-8">:</span>

                 <div className="flex flex-col items-center hidden sm:flex">
                    <div className="w-20 h-24 md:w-32 md:h-36 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center mb-3 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                       <span className="text-5xl md:text-7xl font-black text-white tabular-nums tracking-tighter">
                         {String(timeLeft.m).padStart(2, '0')}
                       </span>
                    </div>
                    <span className="text-slate-300 font-bold text-xs md:text-sm uppercase tracking-widest">
                       {isAr ? 'دقيقة' : 'Mins'}
                    </span>
                 </div>
                 
                 <div className="flex flex-col items-center sm:hidden">
                    <div className="w-20 h-24 bg-indigo-500/20 backdrop-blur-xl border border-indigo-400/30 rounded-2xl flex items-center justify-center mb-3 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden">
                       <span className="text-5xl font-black text-indigo-100 tabular-nums tracking-tighter">
                         {String(timeLeft.m).padStart(2, '0')}
                       </span>
                       <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/20 to-transparent"></div>
                    </div>
                    <span className="text-indigo-300 font-bold text-xs uppercase tracking-widest">
                       {isAr ? 'دقيقة' : 'Mins'}
                    </span>
                 </div>
              </div>
           ) : (
              <div className="text-white">...</div>
           )}
        </div>

        {/* Wishlist / Bucket List */}
        <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-end pb-8">
           <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl h-fit">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                 <span className="text-2xl">📝</span> 
                 {isAr ? 'قائمة الأمنيات (Bucket List)' : 'My Bucket List'}
              </h3>

              <div className="space-y-3 mb-6 max-h-[250px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
                 {tripData.bucketList.length === 0 ? (
                    <div className="text-center p-6 bg-white/5 rounded-2xl border border-dashed border-white/10 text-slate-400">
                       {isAr ? 'ماذا تتمنى أن تفعل هناك؟ اكتب أهدافك 🎯' : 'What do you wish to do there? Write your goals 🎯'}
                    </div>
                 ) : (
                   tripData.bucketList.map(item => (
                     <div 
                       key={item.id} 
                       className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                         item.done 
                           ? 'bg-emerald-500/10 border-emerald-500/20 opacity-70' 
                           : 'bg-white/5 border-white/10 hover:bg-white/10'
                       }`}
                     >
                        <div 
                          className="flex items-center gap-3 cursor-pointer flex-1"
                          onClick={() => toggleBucketItem(item.id)}
                        >
                           <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                              item.done ? 'bg-emerald-500 border-emerald-500 text-slate-900' : 'border-slate-500'
                           }`}>
                              {item.done && <Plus size={14} className="rotate-45" style={{ transform: 'rotate(45deg) scale(1.3)' }} />}
                           </div>
                           <span className={`text-sm md:text-base font-medium transition-all ${item.done ? 'text-slate-400 line-through' : 'text-slate-200'}`}>
                              {item.text}
                           </span>
                        </div>
                        <button 
                          onClick={() => deleteBucketItem(item.id)}
                          className="text-slate-500 hover:text-red-400 transition-colors p-2 shrink-0"
                        >
                           <Trash2 size={18} />
                        </button>
                     </div>
                   ))
                 )}
              </div>

              <form onSubmit={addBucketItem} className="relative">
                 <input 
                   type="text" 
                   value={newItemText}
                   onChange={e => setNewItemText(e.target.value)}
                   placeholder={isAr ? 'أضف أمنية أو مهمة جديدة...' : 'Add a new wish or task...'}
                   className="w-full bg-slate-950/80 border border-white/10 rounded-2xl py-4 pl-4 pr-16 text-white text-sm focus:outline-none focus:border-indigo-500 shadow-inner placeholder:text-slate-500"
                 />
                 <button 
                   type="submit"
                   disabled={!newItemText.trim()}
                   className="absolute right-2 top-2 bottom-2 aspect-square bg-indigo-500 text-white rounded-xl flex items-center justify-center hover:bg-indigo-400 disabled:bg-slate-700 disabled:text-slate-500 transition-all"
                 >
                    <Plus size={20} />
                 </button>
              </form>
           </div>
        </div>
        
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
