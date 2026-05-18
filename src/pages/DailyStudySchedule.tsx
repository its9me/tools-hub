import React, { useState, useMemo, useEffect } from 'react';
import { CalendarClock, Plus, Trash2, Printer, Share2, Info, Clock } from 'lucide-react';

const translations = {
  ar: {
    title: "مولد الجدول الدراسي اليومي",
    subtitle: "نظم وقتك وموادك الدراسية خلال اليوم بكل سهولة.",
    subject: "المادة / المهمة",
    startTime: "وقت البدء",
    endTime: "وقت الانتهاء",
    add: "إضافة للمنظم",
    totalStudy: "إجمالي ساعات الدراسة",
    printText: "طباعة / حفظ PDF",
    shareWhatsapp: "مشاركة الجدول",
    emptySchedule: "الجدول فارغ. أضف مهامك لتبدأ تنظيم يومك!",
    aboutTitle: "عن منظم الخطة اليومية",
    aboutP1: "أداة فعالة للطلاب لتنظيم أوقات الدراسة وتوزيع المهام على مدار اليوم. تساعدك الخطة المرئية على الالتزام وتحقيق أقصى قدر من الإنتاجية، مع إمكانية طباعة الجدول أو مشاركته كخطط يومية.",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)"
  },
  en: {
    title: "Daily Study Schedule Generator",
    subtitle: "Organize your study time and subjects throughout the day easily.",
    subject: "Subject / Task",
    startTime: "Start Time",
    endTime: "End Time",
    add: "Add to Planner",
    totalStudy: "Total Study Hours",
    printText: "Print / Save PDF",
    shareWhatsapp: "Share Schedule",
    emptySchedule: "Schedule is empty. Add tasks to start organizing your day!",
    aboutTitle: "About Daily Planner",
    aboutP1: "An effective tool for students to organize study times and distribute tasks throughout the day. A visual plan helps you commit and maximize productivity, with the ability to print or share the schedule.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)"
  }
};

interface StudySession {
  id: string;
  subject: string;
  startTime: string;
  endTime: string;
  durationMins: number;
}

export default function DailyStudySchedule({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [subject, setSubject] = useState('');
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('09:00');

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('study_schedule_sessions');
    if (saved) {
      try {
         setSessions(JSON.parse(saved));
      } catch(e) {}
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('study_schedule_sessions', JSON.stringify(sessions));
  }, [sessions]);

  const calculateDuration = (start: string, end: string) => {
    if (!start || !end) return 0;
    const [h1, m1] = start.split(':').map(Number);
    const [h2, m2] = end.split(':').map(Number);
    let mins1 = h1 * 60 + m1;
    let mins2 = h2 * 60 + m2;
    if (mins2 < mins1) mins2 += 24 * 60; // crossed midnight
    return mins2 - mins1;
  };

  const handleAdd = () => {
    if (!subject.trim() || !startTime || !endTime) return;
    const duration = calculateDuration(startTime, endTime);
    if (duration <= 0) return;

    const newSession: StudySession = {
      id: crypto.randomUUID(),
      subject: subject.trim(),
      startTime,
      endTime,
      durationMins: duration
    };

    const newSessions = [...sessions, newSession].sort((a, b) => {
       const [ah] = a.startTime.split(':').map(Number);
       const [bh] = b.startTime.split(':').map(Number);
       return ah - bh;
    });

    setSessions(newSessions);
    setSubject('');
    
    // Auto increment start time for next task
    setStartTime(endTime);
    // add 1 hour
    const [h, m] = endTime.split(':').map(Number);
    const nextH = (h + 1) % 24;
    setEndTime(`${nextH.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
  };

  const removeSession = (id: string) => {
    setSessions(sessions.filter(s => s.id !== id));
  };

  const totalMinutes = useMemo(() => {
    return sessions.reduce((acc, curr) => acc + curr.durationMins, 0);
  }, [sessions]);

  const formatDuration = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h > 0 && m > 0) return isAr ? `${h} ساعة و ${m} دقيقة` : `${h}h ${m}m`;
    if (h > 0) return isAr ? `${h} ساعة` : `${h}h`;
    return isAr ? `${m} دقيقة` : `${m}m`;
  };

  const handlePrint = () => {
    window.print();
  };

  const generateShareText = () => {
    let str = isAr ? '*جدولي الدراسي اليومي:*\n\n' : '*My Daily Study Schedule:*\n\n';
    sessions.forEach(s => {
      str += `🕒 ${s.startTime} - ${s.endTime} ➡️ 📖 ${s.subject}\n`;
    });
    str += `\n⏱️ ${t.totalStudy}: ${formatDuration(totalMinutes)}`;
    str += isAr ? `\n\nنظم وقتك عبر: ` : `\n\nOrganize yours here: `;
    return encodeURIComponent(str + window.location.href);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto printable-area">
      {/* Top AdSense */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm no-print">
        <div className="text-[10px] uppercase tracking-widest mb-1">{t.adTop}</div>
        <p className="text-[10px]">{t.adTopDesc}</p>
      </div>

      <section className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl flex flex-col gap-6 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-rose-500/10 rounded-full blur-[80px] pointer-events-none no-print"></div>

        <div className="text-center relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-red-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <CalendarClock size={32} className="text-white" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400 no-print">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10 mt-4">
          
          <div className="col-span-1 lg:col-span-1 flex flex-col gap-4 no-print bg-slate-900/40 p-5 rounded-2xl border border-white/5">
             <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{t.subject}</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                  placeholder="e.g. Math, Reading, Break..."
                />
             </div>
             
             <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">{t.startTime}</label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full bg-slate-800 border border-white/10 rounded-xl p-2.5 text-sm text-slate-200 outline-none focus:ring-2 focus:ring-rose-500/50 min-h-[44px]"
                  />
               </div>
               <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">{t.endTime}</label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full bg-slate-800 border border-white/10 rounded-xl p-2.5 text-sm text-slate-200 outline-none focus:ring-2 focus:ring-rose-500/50 min-h-[44px]"
                  />
               </div>
             </div>

             <button 
                onClick={handleAdd}
                disabled={!subject.trim()}
                className={`mt-2 flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold transition-all ${subject.trim() ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/20 active:scale-95' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
             >
               <Plus size={18} />
               {t.add}
             </button>
          </div>

          <div className="col-span-1 lg:col-span-2 flex flex-col gap-4">
             
             <div className="flex justify-between items-end border-b border-white/10 pb-4 mb-2 no-print">
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 font-medium">{t.totalStudy}</span>
                  <span className="text-xl font-black text-rose-400">{formatDuration(totalMinutes)}</span>
                </div>
                <div className="flex gap-2">
                   <button 
                     onClick={handlePrint}
                     disabled={sessions.length === 0}
                     className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-300 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors border border-white/5"
                   >
                     <Printer size={16} /> <span className="hidden sm:inline">{t.printText}</span>
                   </button>
                   <a 
                     href={`https://wa.me/?text=${generateShareText()}`}
                     target="_blank"
                     rel="noopener noreferrer"
                     className={`px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-lg ${sessions.length === 0 ? 'pointer-events-none opacity-50' : ''}`}
                   >
                     <Share2 size={16} /> <span className="hidden sm:inline">{t.shareWhatsapp}</span>
                   </a>
                </div>
             </div>

             {/* Print Header only visible when printing */}
             <div className="hidden print:flex flex-col mb-6 border-b border-black pb-4 text-black">
                <h1 className="text-2xl font-black">{t.title}</h1>
                <p className="text-sm font-medium mt-1">{t.totalStudy}: {formatDuration(totalMinutes)}</p>
             </div>

             <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-2 pb-4 pt-2">
                {sessions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-slate-500 p-8 text-center gap-4 border-2 border-dashed border-slate-700/50 rounded-2xl">
                     <Clock size={40} className="opacity-20" />
                     <p className="text-sm">{t.emptySchedule}</p>
                  </div>
                ) : (
                  sessions.map((session, index) => (
                    <div key={session.id} className="group flex flex-col sm:flex-row sm:items-center bg-slate-900/60 print:bg-white border border-white/5 print:border-black/20 hover:border-white/10 rounded-xl p-4 gap-4 transition-all">
                       <div className="flex items-center gap-3 w-40 flex-shrink-0">
                          <div className="w-1.5 h-10 rounded-full bg-rose-500 print:bg-black"></div>
                          <div className="flex flex-col">
                             <span className="text-sm font-bold text-slate-200 print:text-black">{session.startTime}</span>
                             <span className="text-xs text-slate-500 print:text-black/60 font-medium">to {session.endTime}</span>
                          </div>
                       </div>
                       
                       <div className="flex flex-1 items-center justify-between min-w-0 bg-slate-950/40 print:bg-transparent rounded-lg px-4 py-3 sm:py-0 sm:bg-transparent sm:px-0 border border-slate-800/50 sm:border-transparent">
                          <div className="flex flex-col truncate">
                            <span className="text-base font-semibold text-slate-100 print:text-black truncate">{session.subject}</span>
                            <span className="text-xs text-rose-400 print:text-black/60 mt-0.5">{formatDuration(session.durationMins)}</span>
                          </div>
                          <button 
                            onClick={() => removeSession(session.id)}
                            className="p-2 text-slate-500 hover:text-rose-400 bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors border border-white/5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 no-print"
                          >
                            <Trash2 size={16} />
                          </button>
                       </div>
                    </div>
                  ))
                )}
             </div>

          </div>

        </div>
      </section>

      {/* Middle AdSense */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm my-2 no-print">
        <div className="text-[10px] uppercase tracking-widest mb-1">{t.adMiddle}</div>
        <p className="text-[10px]">{t.adMiddleDesc}</p>
      </div>

      <article className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col gap-4 text-[13px] text-slate-300 leading-relaxed shadow-lg no-print">
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-2">
            <Info size={20} className="text-rose-400"/>
            <h2 className="text-lg font-bold text-rose-400">{t.aboutTitle}</h2>
        </div>
        <div className="space-y-4">
          <p>{t.aboutP1}</p>
        </div>
      </article>
      
      <style>{`
        @media print {
          body { visibility: hidden; background: white; }
          .printable-area { visibility: visible; position: absolute; left: 0; top: 0; width: 100%; max-width: 100%; margin: 0; padding: 20px; }
          .no-print { display: none !important; }
        }
      `}</style>
    </div>
  );
}
