import React, { useState, useEffect, useMemo } from 'react';
import { Share2, Info, Clock, Globe, ArrowRightLeft, MapPin, Plus, Trash2, Calendar, Copy, Check, Sparkles, AlertCircle, ArrowUp, ArrowDown } from 'lucide-react';
import ShareButtons from '../components/ShareButtons';

const DEFAULT_CITIES = [
  { id: "baghdad", nameAr: "بغداد", nameEn: "Baghdad", tz: "Asia/Baghdad" },
  { id: "riyadh", nameAr: "الرياض", nameEn: "Riyadh", tz: "Asia/Riyadh" },
  { id: "mecca", nameAr: "مكة المكرمة", nameEn: "Mecca", tz: "Asia/Riyadh" },
  { id: "cairo", nameAr: "القاهرة", nameEn: "Cairo", tz: "Africa/Cairo" },
  { id: "dubai", nameAr: "دبي", nameEn: "Dubai", tz: "Asia/Dubai" },
  { id: "amman", nameAr: "عمان", nameEn: "Amman", tz: "Asia/Amman" },
  { id: "damascus", nameAr: "دمشق", nameEn: "Damascus", tz: "Asia/Damascus" },
  { id: "beirut", nameAr: "بيروت", nameEn: "Beirut", tz: "Asia/Beirut" },
  { id: "jerusalem", nameAr: "القدس", nameEn: "Jerusalem", tz: "Asia/Jerusalem" },
  { id: "kuwait", nameAr: "الكويت", nameEn: "Kuwait", tz: "Asia/Kuwait" },
  { id: "doha", nameAr: "الدوحة", nameEn: "Doha", tz: "Asia/Qatar" },
  { id: "muscat", nameAr: "مسقط", nameEn: "Muscat", tz: "Asia/Muscat" },
  { id: "tunis", nameAr: "تونس", nameEn: "Tunis", tz: "Africa/Tunis" },
  { id: "algiers", nameAr: "الجزائر", nameEn: "Algiers", tz: "Africa/Algiers" },
  { id: "rabat", nameAr: "الرباط", nameEn: "Rabat", tz: "Africa/Casablanca" },
  { id: "london", nameAr: "لندن", nameEn: "London", tz: "Europe/London" },
  { id: "paris", nameAr: "باريس", nameEn: "Paris", tz: "Europe/Paris" },
  { id: "berlin", nameAr: "برلين", nameEn: "Berlin", tz: "Europe/Berlin" },
  { id: "madrid", nameAr: "مدريد", nameEn: "Madrid", tz: "Europe/Madrid" },
  { id: "rome", nameAr: "روما", nameEn: "Rome", tz: "Europe/Rome" },
  { id: "moscow", nameAr: "موسكو", nameEn: "Moscow", tz: "Europe/Moscow" },
  { id: "istanbul", nameAr: "إسطنبول", nameEn: "Istanbul", tz: "Europe/Istanbul" },
  { id: "newyork", nameAr: "نيويورك", nameEn: "New York", tz: "America/New_York" },
  { id: "chicago", nameAr: "شيكاغو", nameEn: "Chicago", tz: "America/Chicago" },
  { id: "losangeles", nameAr: "لوس أنجلوس", nameEn: "Los Angeles", tz: "America/Los_Angeles" },
  { id: "toronto", nameAr: "تورونتو", nameEn: "Toronto", tz: "America/Toronto" },
  { id: "buenosaires", nameAr: "بوينس آيرس", nameEn: "Buenos Aires", tz: "America/Argentina/Buenos_Aires" },
  { id: "tokyo", nameAr: "طوكيو", nameEn: "Tokyo", tz: "Asia/Tokyo" },
  { id: "beijing", nameAr: "بكين", nameEn: "Beijing", tz: "Asia/Shanghai" },
  { id: "seoul", nameAr: "سيول", nameEn: "Seoul", tz: "Asia/Seoul" },
  { id: "mumbai", nameAr: "مومباي", nameEn: "Mumbai", tz: "Asia/Kolkata" },
  { id: "singapore", nameAr: "سنغافورة", nameEn: "Singapore", tz: "Asia/Singapore" },
  { id: "sydney", nameAr: "سيدني", nameEn: "Sydney", tz: "Australia/Sydney" },
  { id: "auckland", nameAr: "أوكلاند", nameEn: "Auckland", tz: "Pacific/Auckland" },
];

const translations = {
  ar: {
    title: "منسق واجتماعات المناطق الزمنية العالمية",
    subtitle: "خطط لاجتماعات فريقك العالمي بسهولة. قارن الساعات المشتركة والأنسب للجميع دون تعقيد التوقيت.",
    addLocation: "إضافة مدينة جديدة",
    selectCity: "اختر مدينة لإضافتها...",
    workingHoursSetting: "إعدادات ساعات العمل الافتراضية للجميع",
    from: "من الساعة",
    to: "إلى الساعة",
    anchorText: "اختر ساعة البدء (بتوقيت المدينة المضيفة):",
    selectedMeetingTime: "تفاصيل الاجتماع المقترح",
    duration: "مدة الاجتماع",
    hoursArr: ["1 ساعة", "2 ساعتان", "3 ساعات", "4 ساعات"],
    overlapScore: "مؤشر التوافق للوقت المحدد",
    suitability: {
      excellent: "ممتازة جداً (أوقات عمل مثالية للجميع)",
      good: "مناسبة (الجميع صاحٍ وضمن ساعات لائقة)",
      fair: "مقبولة (بعض الأطراف خارج ساعات العمل الرسمية ولكن مستيقظين)",
      poor: "غير مناسبة (الاجتماع يتداخل مع وقت نوم شخص ما)"
    },
    copyDetails: "نسخ التفاصيل والمشاركة",
    copied: "تم النسخ!",
    noCities: "يرجى إضافة مدينتين على الأقل لبدء التخطيط.",
    workingTime: "وقت العمل الرسمي",
    personalTime: "وقت مستيقظ / شخصي",
    sleepingTime: "وقت نوم",
    timelineLabel: "شريط الساعات التفاعلي في اليوم (24 ساعة)",
    currentLocalTime: "الوقت الحالي",
    addCustomCity: "أو اكتب مدينة مخصصة برمز التوقيت:",
    customNamePlaceholder: "اسم المدينة (مثال: دبلن)",
    offsetLabel: "فرق التوقيت UTC (مثال: +1 أو -5)",
    addBtn: "إضافة",
    meetingHost: "المدينة المستضيفة (الأساسية)",
    quickPresets: "تجميعات سريعة",
    presets: {
      mena: "الشرق الأوسط والخليج",
      global: "عمل حر عالمي (أمريكا + أوروبا + آسيا)",
      euroArab: "أوروبا والوطن العربي"
    },
    summaryTitle: "دعوة الاجتماع الجاهزة",
    riddleNote: "نصيحة: ابحث عن الساعة الخضراء الأشد وضوحاً في الجدول؛ لضمان تفاعل وحضور حيوي من جميع الأطراف.",
    aboutTitle: "عن الأداة وفكرة العمل",
    aboutDesc: "تم تصميم هذه الأداة لمساعدة المستقلين (Freelancers)، وقادة الفرق الموزعة عالمياً، ومسؤولي التوظيف لجدولة اللقاءات عن بعد بأريحية تامة. من خلال دمج فروق الساعات عبر شريط موحد متزامن، لن تحتاج مجدداً لحساب فروق الساعات ذهنياً أو الخوف من إيقاظ زملائك ليلاً."
  },
  en: {
    title: "Interactive World Meeting Planner",
    subtitle: "Plan global meetings with ease. Auto-detect & match timezone overlaps for distributed/freelancing teams.",
    addLocation: "Add a Location",
    selectCity: "Select a city to add...",
    workingHoursSetting: "Default Work Hours Setting",
    from: "Start",
    to: "End",
    anchorText: "Select Start Hour (based on Host City time):",
    selectedMeetingTime: "Proposed Meeting Plan",
    duration: "Meeting Duration",
    hoursArr: ["1 hour", "2 hours", "3 hours", "4 hours"],
    overlapScore: "Compatibility Index for Selected Hour",
    suitability: {
      excellent: "Excellent (Ideal working hours for everyone)",
      good: "Good (Everyone is awake and within decent hours)",
      fair: "Fair (Some participants are outside normal work hours but awake)",
      poor: "Poor (Meeting conflicts with someone's typical sleep time)"
    },
    copyDetails: "Copy Details & Share",
    copied: "Copied!",
    noCities: "Please add at least two cities to start planning.",
    workingTime: "Work Hours",
    personalTime: "Awake / Off Hours",
    sleepingTime: "Sleep Hours",
    timelineLabel: "Interactive 24-Hour Timeline Grid",
    currentLocalTime: "Current Time",
    addCustomCity: "Or input a custom city with custom UTC offset:",
    customNamePlaceholder: "City Name (e.g. Dublin)",
    offsetLabel: "UTC Offset (e.g., +1 or -5)",
    addBtn: "Add",
    meetingHost: "Host City (Anchor)",
    quickPresets: "Quick Presets",
    presets: {
      mena: "MENA & Gulf Reach",
      global: "Global Freelance (USA + Europe + Asia)",
      euroArab: "Europe & Arab World"
    },
    summaryTitle: "Generated Meeting Invitation",
    riddleNote: "Tip: Look for the greenest column segments in the grid to guarantee maximum engagement and live presence.",
    aboutTitle: "About this Tool & Utility",
    aboutDesc: "This tool is custom-crafted to assist remote freelancers, distributed developers, and global business operators. By synchronizing multiple timezone offsets onto a visual timeline, it completely eliminates mental timezone math and prevents scheduling slipups."
  }
};

interface CityItem {
  id: string;
  nameAr: string;
  nameEn: string;
  tz: string;
  isCustom?: boolean;
  customOffset?: number; // relative to UTC in hours
}

export default function WorldMeetingPlanner({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  // State: List of selected locations/cities
  const [selectedCities, setSelectedCities] = useState<CityItem[]>([
    { id: "newyork", nameAr: "نيويورك", nameEn: "New York", tz: "America/New_York" },
    { id: "london", nameAr: "لندن", nameEn: "London", tz: "Europe/London" },
    { id: "baghdad", nameAr: "بغداد", nameEn: "Baghdad", tz: "Asia/Baghdad" },
  ]);

  // Working Hours definitions
  const [workStart, setWorkStart] = useState<number>(9); // 9 AM
  const [workEnd, setWorkEnd] = useState<number>(17); // 5 PM
  const [anchorHour, setAnchorHour] = useState<number>(14); // Anchor meeting hour at Host city (default to 2:00 PM)
  const [duration, setDuration] = useState<number>(1); // Duration in hours

  // Custom city manual inputs
  const [customName, setCustomName] = useState<string>('');
  const [customOffset, setCustomOffset] = useState<string>('');

  // Dropdown list city selector
  const [selectedToSelect, setSelectedToSelect] = useState<string>('');

  // Copy success feedback
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Time tracking for "current time check"
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 10000);
    return () => clearInterval(timer);
  }, []);

  // Quick preset loader function
  const applyPreset = (presetKey: 'mena' | 'global' | 'euroArab') => {
    if (presetKey === 'mena') {
      setSelectedCities([
        { id: "cairo", nameAr: "القاهرة", nameEn: "Cairo", tz: "Africa/Cairo" },
        { id: "riyadh", nameAr: "الرياض", nameEn: "Riyadh", tz: "Asia/Riyadh" },
        { id: "dubai", nameAr: "دبي", nameEn: "Dubai", tz: "Asia/Dubai" }
      ]);
    } else if (presetKey === 'euroArab') {
      setSelectedCities([
        { id: "london", nameAr: "لندن", nameEn: "London", tz: "Europe/London" },
        { id: "paris", nameAr: "باريس", nameEn: "Paris", tz: "Europe/Paris" },
        { id: "baghdad", nameAr: "بغداد", nameEn: "Baghdad", tz: "Asia/Baghdad" },
        { id: "riyadh", nameAr: "الرياض", nameEn: "Riyadh", tz: "Asia/Riyadh" }
      ]);
    } else if (presetKey === 'global') {
      setSelectedCities([
        { id: "losangeles", nameAr: "لوس أنجلوس", nameEn: "Los Angeles", tz: "America/Los_Angeles" },
        { id: "newyork", nameAr: "نيويورك", nameEn: "New York", tz: "America/New_York" },
        { id: "london", nameAr: "لندن", nameEn: "London", tz: "Europe/London" },
        { id: "tokyo", nameAr: "طوكيو", nameEn: "Tokyo", tz: "Asia/Tokyo" }
      ]);
    }
  };

  // Safe offset lookup function for custom or timezone cities on a stable base date (avoiding DST issues for predefined tz)
  const getOffsetForCity = (city: CityItem, baseDate: Date): number => {
    if (city.isCustom && city.customOffset !== undefined) {
      return city.customOffset;
    }
    try {
      // Find timezone offset in hours on the select baseDate
      const tzString = baseDate.toLocaleString('en-US', { timeZone: city.tz, timeZoneName: 'short' });
      // To get offset rigorously, let's format both UTc and tz
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: city.tz,
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        hour12: false
      }).formatToParts(baseDate);

      const utcParts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'UTC',
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        hour12: false
      }).formatToParts(baseDate);

      const getVal = (p: Intl.DateTimeFormatPart[], type: string) => parseInt(p.find(x => x.type === type)?.value || '0', 10);
      
      const d = new Date(Date.UTC(getVal(parts, 'year'), getVal(parts, 'month') - 1, getVal(parts, 'day'), getVal(parts, 'hour'), getVal(parts, 'minute')));
      const dUtc = new Date(Date.UTC(getVal(utcParts, 'year'), getVal(utcParts, 'month') - 1, getVal(utcParts, 'day'), getVal(utcParts, 'hour'), getVal(utcParts, 'minute')));
      
      const diffHrs = (d.getTime() - dUtc.getTime()) / (1000 * 60 * 60);
      return diffHrs;
    } catch (e) {
      // fallback
      return 0;
    }
  };

  // Resolve calculations based on active Host city (First city in the list)
  const processedCities = useMemo(() => {
    const baseDate = new Date();
    // Round baseDate to previous midnight for safe hours grid
    baseDate.setHours(0, 0, 0, 0);

    return selectedCities.map(city => {
      const offset = getOffsetForCity(city, baseDate);
      return {
        ...city,
        offset,
        offsetStr: offset >= 0 ? `+${offset}` : `${offset}`
      };
    });
  }, [selectedCities]);

  const hostCity = processedCities[0];

  // Map 24 hours of the Host city to absolute hours to easily compute overlaps
  // At hostHour = h (0..23), we find the local hour in each selected city:
  // localHour = (h + cityOffset - hostOffset + 24) % 24
  const gridHours = useMemo(() => {
    if (!hostCity) return [];
    
    const hours = [];
    for (let h = 0; h < 24; h++) {
      const cityHours = processedCities.map(city => {
        const localHourFloat = (h + city.offset - hostCity.offset + 24) % 24;
        const localHour = Math.floor(localHourFloat);
        
        // Define status
        let status: 'work' | 'personal' | 'sleep' = 'sleep';
        if (localHour >= workStart && localHour < workEnd) {
          status = 'work';
        } else if (localHour >= 7 && localHour < 23) {
          status = 'personal';
        }

        return {
          cityId: city.id,
          cityName: isAr ? city.nameAr : city.nameEn,
          localHour,
          status,
          offsetStr: city.offsetStr
        };
      });

      // Compute general Compatibility score for this hour
      // A meeting at hour 'h' of duration 'duration'
      // Find maximum discomfort among all participants across meeting span
      let worstStatus: 'work' | 'personal' | 'sleep' = 'work';
      
      for (let offsetIndex = 0; offsetIndex < duration; offsetIndex++) {
        const checkH = (h + offsetIndex) % 24;
        
        processedCities.forEach(city => {
          const lHour = Math.floor((checkH + city.offset - hostCity.offset + 24) % 24);
          let currentStatus: 'work' | 'personal' | 'sleep' = 'sleep';
          if (lHour >= workStart && lHour < workEnd) {
            currentStatus = 'work';
          } else if (lHour >= 7 && lHour < 23) {
            currentStatus = 'personal';
          }

          if (currentStatus === 'sleep') {
            worstStatus = 'sleep';
          } else if (currentStatus === 'personal' && worstStatus !== 'sleep') {
            worstStatus = 'personal';
          }
        });
      }

      hours.push({
        hostHour: h,
        cityHours,
        worstStatus
      });
    }
    return hours;
  }, [processedCities, hostCity, workStart, workEnd, duration]);

  // Selected hour status mapping
  const activeHourDetails = useMemo(() => {
    if (!hostCity) return null;
    return gridHours.find(gh => gh.hostHour === anchorHour);
  }, [gridHours, anchorHour, hostCity]);

  // Helpers to add default cities
  const handleAddPredefinedCity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (!val) return;
    const item = DEFAULT_CITIES.find(c => c.id === val);
    if (item && !selectedCities.some(sc => sc.id === item.id)) {
      setSelectedCities([...selectedCities, item]);
    }
    setSelectedToSelect('');
  };

  // Helper to add custom city offset
  const handleAddCustomCity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;
    const parsedOffset = parseFloat(customOffset);
    if (isNaN(parsedOffset)) return;

    const newCustom: CityItem = {
      id: `custom-${Date.now()}`,
      nameAr: customName,
      nameEn: customName,
      tz: 'UTC',
      isCustom: true,
      customOffset: parsedOffset
    };

    setSelectedCities([...selectedCities, newCustom]);
    setCustomName('');
    setCustomOffset('');
  };

  // Move priority helper (promote to host or rearrange)
  const reorderCity = (index: number, direction: 'up' | 'down') => {
    const newCities = [...selectedCities];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < newCities.length) {
      const temp = newCities[index];
      newCities[index] = newCities[targetIndex];
      newCities[targetIndex] = temp;
      setSelectedCities(newCities);
    }
  };

  // Delete city
  const removeCity = (idStr: string) => {
    setSelectedCities(selectedCities.filter(sc => sc.id !== idStr));
  };

  // Generate invite text block
  const generatedInvite = useMemo(() => {
    if (selectedCities.length < 2 || !hostCity) return '';

    const hostName = isAr ? hostCity.nameAr : hostCity.nameEn;
    const dateStr = new Date().toLocaleDateString(isAr ? 'ar-EG' : 'en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
    
    let invite = isAr 
      ? `📅 دعوة اجتماع عالمي منسق\nالتاريخ: ${dateStr}\nالمدة: ${duration} ${duration > 2 ? 'ساعات' : 'ساعة'}\n\nساعات البدء المحلية للاجتماع في كل بلد:\n`
      : `📅 Synchronized Global Meeting Invitation\nDate: ${dateStr}\nDuration: ${duration} hour(s)\n\nLocal start times across matching locations:\n`;

    processedCities.forEach(city => {
      const startHr = (anchorHour + city.offset - hostCity.offset + 24) % 24;
      const endHr = (anchorHour + duration + city.offset - hostCity.offset + 24) % 24;

      const formatClock = (h: number) => {
        const fullHr = Math.floor(h);
        const mins = Math.floor((h % 1) * 60);
        const ampm = fullHr >= 12 ? (isAr ? 'م' : 'PM') : (isAr ? 'ص' : 'AM');
        const displayHr = fullHr % 12 === 0 ? 12 : fullHr % 12;
        const minsStr = mins < 10 ? `0${mins}` : mins;
        return `${displayHr}:${minsStr} ${ampm}`;
      };

      const cityLabel = isAr ? city.nameAr : city.nameEn;
      invite += ` - ${cityLabel} (UTC${city.offsetStr}): ${formatClock(startHr)} ➔ ${formatClock(endHr)}\n`;
    });

    invite += isAr 
      ? `\nتم التنسيق والجدولة بواسطة ميسر الاجتماعات في "أدوات Hub"` 
      : `\nPlanned seamlessly with World Meeting Planner on Tools Hub.`;

    return invite;
  }, [processedCities, hostCity, anchorHour, duration, isAr]);

  // Copy trigger
  const triggerCopy = () => {
    navigator.clipboard.writeText(generatedInvite);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 font-sans">
      
      {/* 1. Header Hero section */}
      <div className="text-center md:text-right py-3 border-b border-white/10 pb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-semibold uppercase tracking-wider mb-2.5 inline-block">
              {isAr ? 'أدوات الإنتاجية والسفر' : 'Productivity & Travel Tools'}
            </span>
            <h1 className="text-2xl md:text-4xl font-black text-white leading-tight">
              {t.title}
            </h1>
            <p className="text-sm text-slate-400 mt-2 max-w-3xl">
              {t.subtitle}
            </p>
          </div>
          <div className="flex md:self-start">
            <ShareButtons lang={lang} text={t.title} />
          </div>
        </div>
      </div>

      {/* 2. Top Banner Ad Placement Placeholder */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm">
        <div className="text-[10px] uppercase tracking-widest mb-1">{isAr ? 'إعلان AdSense' : 'AdSense Ad'}</div>
        <p className="text-[10px]">AD_SPACE_728x90 (Top)</p>
      </div>

      {/* 3. Outer Grid Layout */}
      {selectedCities.length < 1 ? (
        <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-12 text-center text-slate-400">
          <AlertCircle size={40} className="mx-auto text-amber-500/80 mb-4 animate-bounce" />
          <p className="text-sm font-semibold mb-4">{t.noCities}</p>
          <button 
            onClick={() => setSelectedCities([
              { id: "london", nameAr: "لندن", nameEn: "London", tz: "Europe/London" },
              { id: "baghdad", nameAr: "بغداد", nameEn: "Baghdad", tz: "Asia/Baghdad" }
            ])} 
            className="px-5 py-2.5 bg-cyan-700 hover:bg-cyan-600 rounded-xl text-white font-bold transition-colors"
          >
            {isAr ? 'تحميل التشكيلة الافتراضية' : 'Load Default Setup'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main timeline controller panel (9 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">

            {/* Quick configurations card */}
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col gap-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
                  <Sparkles size={14} className="text-cyan-400" />
                  {t.quickPresets}
                </span>
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => applyPreset('global')}
                    className="px-3 py-1 bg-white/5 hover:bg-white/10 text-[11px] rounded-lg border border-white/10 font-medium text-slate-300 transition-colors"
                  >
                    🚀 {t.presets.global}
                  </button>
                  <button 
                    onClick={() => applyPreset('mena')}
                    className="px-3 py-1 bg-white/5 hover:bg-white/10 text-[11px] rounded-lg border border-white/10 font-medium text-slate-300 transition-colors"
                  >
                    🌍 {t.presets.mena}
                  </button>
                  <button 
                    onClick={() => applyPreset('euroArab')}
                    className="px-3 py-1 bg-white/5 hover:bg-white/10 text-[11px] rounded-lg border border-white/10 font-medium text-slate-300 transition-colors"
                  >
                    ✈️ {t.presets.euroArab}
                  </button>
                </div>
              </div>

              {/* Slider Work Hour Setting parameters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/10 pt-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 font-bold">
                    {t.workingHoursSetting}
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <span className="text-[10px] text-slate-500 block mb-1">{t.from}</span>
                      <select 
                        value={workStart} 
                        onChange={(e) => setWorkStart(parseInt(e.target.value))}
                        className="w-full bg-[#12183c] border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                      >
                        {Array.from({ length: 24 }).map((_, i) => (
                          <option key={i} value={i}>
                            {i === 0 ? '12 AM' : i === 12 ? '12 PM' : i > 12 ? `${i - 12} PM` : `${i} AM`}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] text-slate-500 block mb-1">{t.to}</span>
                      <select 
                        value={workEnd} 
                        onChange={(e) => setWorkEnd(parseInt(e.target.value))}
                        className="w-full bg-[#12183c] border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                      >
                        {Array.from({ length: 24 }).map((_, i) => (
                          <option key={i} value={i}>
                            {i === 0 ? '12 AM' : i === 12 ? '12 PM' : i > 12 ? `${i - 12} PM` : `${i} AM`}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Duration select */}
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 font-bold">
                    {t.duration}
                  </label>
                  <div className="grid grid-cols-4 gap-1.5 mt-4">
                    {[1, 2, 3, 4].map(d => (
                      <button
                        key={d}
                        onClick={() => setDuration(d)}
                        className={`py-1.5 rounded-lg text-xs font-bold border transition-all ${
                          duration === d 
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/60 shadow-lg shadow-cyan-500/10'
                            : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        {isAr ? t.hoursArr[d - 1] : t.hoursArr[d - 1]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive synchronized timeline box */}
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col gap-5 shadow-2xl relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <h3 className="font-bold text-sm text-slate-200">{t.timelineLabel}</h3>
                </div>
                {/* Visual state legend */}
                <div className="flex items-center gap-3 text-[10px]">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <span className="w-2.5 h-2.5 rounded bg-emerald-500/30 border border-emerald-500/60 block" />
                    {t.workingTime}
                  </span>
                  <span className="flex items-center gap-1 text-amber-400">
                    <span className="w-2.5 h-2.5 rounded bg-amber-500/20 border border-amber-500/45 block" />
                    {t.personalTime}
                  </span>
                  <span className="flex items-center gap-1 text-rose-500">
                    <span className="w-2.5 h-2.5 rounded bg-rose-950/40 border border-rose-500/30 block" />
                    {t.sleepingTime}
                  </span>
                </div>
              </div>

              {/* The Timeline Table Row Blocks */}
              <div className="flex flex-col gap-3.5 overflow-x-auto pb-2 relative">
                {processedCities.map((city, cIndex) => {
                  const isHost = cIndex === 0;
                  return (
                    <div key={city.id} className="min-w-[700px] grid grid-cols-12 gap-3 items-center">
                      
                      {/* Left Header label: City status with info */}
                      <div className="col-span-3 flex flex-col justify-center">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={12} className={isHost ? 'text-amber-400' : 'text-slate-500'} />
                          <span className={`text-xs font-bold leading-tight ${isHost ? 'text-amber-300' : 'text-slate-100'}`}>
                            {isAr ? city.nameAr : city.nameEn}
                          </span>
                          {isHost && (
                            <span className="bg-amber-500/10 text-amber-400 text-[9px] px-1.5 py-0.5 rounded border border-amber-500/20">
                              {isAr ? 'المضيف' : 'Host'}
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5" dir="ltr">
                          <span>UTC{city.offsetStr}</span>
                        </div>
                      </div>

                      {/* 24-Hour timelines */}
                      <div className="col-span-9 grid grid-cols-24 gap-1">
                        {Array.from({ length: 24 }).map((_, hIndex) => {
                          // Compute local hour in this specific city at host timeline hour = hIndex
                          const localHourFloat = (hIndex + city.offset - hostCity.offset + 24) % 24;
                          const localHour = Math.floor(localHourFloat);

                          // State coloring class details
                          let statusClass = "bg-rose-950/20 border-rose-500/20 text-rose-400 hover:border-rose-400/40";
                          let localLabel = 'bg-rose-950/10';

                          if (localHour >= workStart && localHour < workEnd) {
                            statusClass = "bg-emerald-500/20 border-emerald-500/50 text-emerald-400 hover:border-emerald-400";
                            localLabel = 'bg-emerald-500/15';
                          } else if (localHour >= 7 && localHour < 23) {
                            statusClass = "bg-amber-500/10 border-amber-500/30 text-amber-400 hover:border-amber-400/60";
                            localLabel = 'bg-amber-500/10';
                          }

                          // Highlight if within current selection range
                          const isAnchorActive = anchorHour === hIndex;
                          const isDurationSpan = (hIndex >= anchorHour && hIndex < anchorHour + duration) || 
                                                 (anchorHour + duration > 24 && hIndex < (anchorHour + duration) % 24);

                          return (
                            <button
                              key={hIndex}
                              onClick={() => setAnchorHour(hIndex)}
                              title={`${isAr ? city.nameAr : city.nameEn}: ${localHour}:00 (Host: ${hIndex}:00)`}
                              className={`h-11 rounded-md border flex flex-col items-center justify-center transition-all ${statusClass} ${
                                isDurationSpan 
                                  ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-[#070a24] scale-105 z-10' 
                                  : isAnchorActive ? 'ring-2 ring-cyan-400 ring-offset-1 ring-offset-[#070a24]' : ''
                              }`}
                            >
                              <span className="text-[10px] font-bold font-mono">
                                {localHour}
                              </span>
                              <span className="text-[8px] opacity-60">
                                {localHour >= 12 ? 'pm' : 'am'}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                    </div>
                  );
                })}
              </div>

              {/* Indicator of interactive anchor controller */}
              <div className="border-t border-white/5 pt-4 flex flex-col gap-2">
                <span className="text-[11px] font-bold text-slate-400">{t.anchorText}</span>
                <div className="flex flex-wrap gap-1.5">
                  {Array.from({ length: 24 }).map((_, i) => {
                    const isSelected = anchorHour === i;
                    // Format AM/PM
                    const tLabel = i === 0 ? '12 AM' : i === 12 ? '12 PM' : i > 12 ? `${i - 12} PM` : `${i} AM`;
                    
                    // Match the compatibility status for badge color
                    const hourSuitability = gridHours[i]?.worstStatus || 'sleep';
                    const bulletClr = hourSuitability === 'work' ? 'bg-emerald-500' : hourSuitability === 'personal' ? 'bg-amber-400' : 'bg-rose-500';

                    return (
                      <button
                        key={i}
                        onClick={() => setAnchorHour(i)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-xl border flex items-center gap-1.5 transition-all ${
                          isSelected 
                            ? 'bg-cyan-500 text-white border-cyan-400 shadow-md scale-105 shadow-cyan-500/25'
                            : 'bg-[#11163e]/80 border-[#222c7a] hover:bg-[#1a215b] text-slate-300'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${bulletClr}`} />
                        <span>{tLabel}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Selected Meeting Proposal Panel details card */}
            {activeHourDetails && (
              <div className="bg-gradient-to-r from-cyan-950/20 to-purple-950/30 border border-cyan-500/20 p-6 rounded-2xl shadow-xl">
                <div className="flex items-start md:items-center justify-between flex-col md:flex-row gap-4 mb-4">
                  <div>
                    <h3 className="text-base font-extrabold text-cyan-300 flex items-center gap-2">
                      <Clock size={18} />
                      {t.selectedMeetingTime}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      {isAr ? 'بناءً على التوقيت المحلي لكل منطقة المحددة في الجدول' : 'Based on simultaneous clock alignments from the interactive grid.'}
                    </p>
                  </div>

                  {/* Compatibility score badge */}
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t.overlapScore}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`w-2.5 h-2.5 rounded-full ${
                        activeHourDetails.worstStatus === 'work' ? 'bg-emerald-500 animate-pulse' :
                        activeHourDetails.worstStatus === 'personal' ? 'bg-amber-500' : 'bg-rose-500'
                      }`} />
                      <span className={`text-xs font-black ${
                        activeHourDetails.worstStatus === 'work' ? 'text-emerald-400' :
                        activeHourDetails.worstStatus === 'personal' ? 'text-amber-400' : 'text-rose-400'
                      }`}>
                        {activeHourDetails.worstStatus === 'work' ? t.suitability.excellent :
                         activeHourDetails.worstStatus === 'personal' ? t.suitability.good :
                         t.suitability.poor}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Grid list of timings for each country */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {processedCities.map(city => {
                    const startH = (anchorHour + city.offset - hostCity.offset + 24) % 24;
                    const endH = (anchorHour + duration + city.offset - hostCity.offset + 24) % 24;

                    // Clock formatting helper
                    const getClockTime = (h: number) => {
                      const displayH = Math.floor(h);
                      const ampm = displayH >= 12 ? (isAr ? 'م' : 'PM') : (isAr ? 'ص' : 'AM');
                      const hr12 = displayH % 12 === 0 ? 12 : displayH % 12;
                      return `${hr12}:00 ${ampm}`;
                    };

                    const lHour = Math.floor(startH);
                    let itemStatus: 'work' | 'personal' | 'sleep' = 'sleep';
                    if (lHour >= workStart && lHour < workEnd) itemStatus = 'work';
                    else if (lHour >= 7 && lHour < 23) itemStatus = 'personal';

                    return (
                      <div key={city.id} className="bg-white/5 border border-white/10 rounded-xl p-3.5 flex flex-col gap-1.5 transition-all hover:bg-white/10">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-200">
                            {isAr ? city.nameAr : city.nameEn}
                          </span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            itemStatus === 'work' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                            itemStatus === 'personal' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                            'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          }`}>
                            {itemStatus === 'work' ? (isAr ? 'عمل' : 'Work') :
                             itemStatus === 'personal' ? (isAr ? 'شخصي' : 'Personal') :
                             (isAr ? 'نوم' : 'Sleep')}
                          </span>
                        </div>
                        <div className="text-sm font-extrabold text-cyan-300 mt-1" dir="ltr">
                          {getClockTime(startH)} ➔ {getClockTime(endH)}
                        </div>
                        <span className="text-[10px] text-slate-500" dir="ltr">
                          UTC{city.offsetStr} Offset
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Generated Text invite Summary block */}
                <div className="mt-5 border-t border-white/10 pt-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <Copy size={14} className="text-purple-400" />
                      {t.summaryTitle}
                    </span>
                    <button
                      onClick={triggerCopy}
                      className="px-3.5 py-1.5 bg-cyan-700 hover:bg-cyan-600 rounded-xl text-xs font-bold text-white transition-all flex items-center gap-1 shadow active:scale-95"
                    >
                      {isCopied ? <Check size={14} className="text-emerald-300" /> : <Copy size={13} />}
                      <span>{isCopied ? t.copied : t.copyDetails}</span>
                    </button>
                  </div>
                  <pre className="p-4 bg-slate-950/80 border border-white/5 rounded-xl text-[11px] font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap leading-relaxed text-right md:text-left">
                    {generatedInvite}
                  </pre>
                </div>

              </div>
            )}

            {/* Riddles notice block */}
            <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-start gap-3">
              <AlertCircle className="text-purple-400 shrink-0 mt-0.5" size={16} />
              <p className="text-xs text-purple-300 leading-relaxed font-semibold">
                {t.riddleNote}
              </p>
            </div>

          </div>

          {/* Sidebar Settings: Add or remove cities (3 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            
            {/* Add locations tool card */}
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col gap-4">
              <h3 className="font-extrabold text-sm text-slate-200 flex items-center gap-2">
                <Plus size={16} className="text-cyan-400" />
                {t.addLocation}
              </h3>

              {/* standard city select list */}
              <div>
                <label className="block text-[10px] uppercase text-slate-500 mb-1.5 font-bold">{isAr ? 'اختر من القائمة الشائعة' : 'Choose Popular City'}</label>
                <select
                  value={selectedToSelect}
                  onChange={handleAddPredefinedCity}
                  className="w-full bg-[#12183c] border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                >
                  <option value="">{t.selectCity}</option>
                  {DEFAULT_CITIES.filter(c => !selectedCities.some(sc => sc.id === c.id)).map(city => (
                    <option key={city.id} value={city.id}>
                      {isAr ? city.nameAr : city.nameEn} (UTC{city.tz})
                    </option>
                  ))}
                </select>
              </div>

              {/* Custom manual city details */}
              <form onSubmit={handleAddCustomCity} className="border-t border-white/10 pt-4 flex flex-col gap-3">
                <span className="text-[10px] text-slate-400 font-bold block">{t.addCustomCity}</span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder={t.customNamePlaceholder}
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    className="bg-[#12183c] border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none"
                  />
                  <input
                    type="number"
                    step="0.5"
                    min="-12"
                    max="14"
                    required
                    placeholder={t.offsetLabel}
                    value={customOffset}
                    onChange={(e) => setCustomOffset(e.target.value)}
                    className="bg-[#12183c] border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-1.5 bg-[#212a64] hover:bg-[#2c3886] rounded-xl text-xs font-bold text-cyan-300 transition-colors"
                >
                  {t.addBtn}
                </button>
              </form>
            </div>

            {/* active list of added locations with reorder capability */}
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col gap-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">
                {isAr ? 'المدن المشاركة بالترتيب' : 'Participating Locations'}
              </h3>
              <div className="flex flex-col gap-2">
                {selectedCities.map((city, idx) => {
                  const isHost = idx === 0;
                  return (
                    <div 
                      key={city.id} 
                      className={`flex items-center justify-between p-2.5 rounded-xl border transition-colors ${
                        isHost ? 'bg-amber-500/5 border-amber-500/20' : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                          {isAr ? city.nameAr : city.nameEn}
                          {isHost && (
                            <span className="text-[8px] px-1 bg-amber-500/20 text-amber-400 rounded">
                              {isAr ? 'رئيسي' : 'Host'}
                            </span>
                          )}
                        </span>
                        <span className="text-[9px] text-slate-500 mt-0.5" dir="ltr">
                          {city.isCustom ? `Custom Offset (${city.customOffset}h)` : city.tz}
                        </span>
                      </div>

                      {/* Controls action buttons */}
                      <div className="flex items-center gap-1">
                        <button 
                          disabled={idx === 0}
                          onClick={() => reorderCity(idx, 'up')}
                          className="p-1 hover:bg-white/5 rounded text-slate-400 disabled:opacity-20"
                          title={isAr ? 'رتب لأعلى' : 'Move Up'}
                        >
                          <ArrowUp size={13} />
                        </button>
                        <button 
                          disabled={idx === selectedCities.length - 1}
                          onClick={() => reorderCity(idx, 'down')}
                          className="p-1 hover:bg-white/5 rounded text-slate-400 disabled:opacity-30"
                          title={isAr ? 'رتب لأسفل' : 'Move Down'}
                        >
                          <ArrowDown size={13} />
                        </button>
                        <button 
                          onClick={() => removeCity(city.id)}
                          className="p-1 hover:bg-rose-950 text-rose-400 rounded transition-colors"
                          title={isAr ? 'حذف' : 'Delete'}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

            {/* About utility info block */}
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col gap-3">
              <h4 className="font-extrabold text-xs text-slate-300 flex items-center gap-1.5">
                <Info size={14} className="text-cyan-400" />
                {t.aboutTitle}
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {t.aboutDesc}
              </p>
            </div>

          </div>

        </div>
      )}

      {/* 4. Middle Banner Ad Placement Placeholder */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm mt-4">
        <div className="text-[10px] uppercase tracking-widest mb-1">{isAr ? 'إعلان AdSense' : 'AdSense Ad'}</div>
        <p className="text-[10px]">AD_SPACE_728x90 (Middle)</p>
      </div>

    </div>
  );
}
