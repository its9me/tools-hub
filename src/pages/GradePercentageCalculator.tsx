import React, { useState, useMemo } from 'react';
import { Percent, Share2, Info, CheckCircle, XCircle, Plus, Trash2 } from 'lucide-react';

const translations = {
  ar: {
    title: "حاسبة النسبة المئوية للدرجات",
    subtitle: "احسب النسبة المئوية والتقدير الحرفي لدرجاتك الامتحانية لعدة مواد.",
    subjectName: "اسم المادة (اختياري)",
    scoreLabel: "الدرجة",
    totalLabel: "الكلي",
    addSubject: "إضافة مادة",
    resultLabels: {
      percentage: "النسبة المئوية العامة",
      letterGrade: "التقدير",
      status: "الحالة"
    },
    status: {
      pass: "ناجح",
      fail: "راسب"
    },
    grades: {
      a: "ممتاز (A)",
      b: "جيد جداً (B)",
      c: "جيد (C)",
      d: "مقبول (D)",
      f: "راسب (F)"
    },
    shareWhatsapp: "مشاركة النتيجة",
    aboutTitle: "عن الحاسبة",
    aboutP1: "أداة سريعة وسهلة للطلاب والمعلمين لحساب النسبة المئوية للدرجات لعدة مواد، بناءً على مجموع الدرجات التي تم الحصول عليها مقارنة بمجموع الدرجات الكلية. تقوم الأداة أيضاً بعرض التقدير الحرفي المعتاد وتحديد حالة النجاح أو الرسوب العامة.",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)"
  },
  en: {
    title: "Grade Percentage Calculator",
    subtitle: "Calculate your test score percentage and letter grade for multiple subjects.",
    subjectName: "Subject (Optional)",
    scoreLabel: "Score",
    totalLabel: "Total",
    addSubject: "Add Subject",
    resultLabels: {
      percentage: "Overall Percentage",
      letterGrade: "Letter Grade",
      status: "Status"
    },
    status: {
      pass: "Pass",
      fail: "Fail"
    },
    grades: {
      a: "Excellent (A)",
      b: "Very Good (B)",
      c: "Good (C)",
      d: "Acceptable (D)",
      f: "Fail (F)"
    },
    shareWhatsapp: "Share Result",
    aboutTitle: "About Calculator",
    aboutP1: "A quick and easy tool for students and teachers to calculate the overall percentage of scores across multiple subjects based on the total points earned versus the total points possible. It also provides a standard letter grade and overall pass/fail status.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)"
  }
};

interface SubjectData {
  id: string;
  name: string;
  score: string;
  total: string;
}

export default function GradePercentageCalculator({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const [subjects, setSubjects] = useState<SubjectData[]>([
    { id: '1', name: '', score: '85', total: '100' }
  ]);

  const addSubject = () => {
    setSubjects([...subjects, { id: crypto.randomUUID(), name: '', score: '', total: '100' }]);
  };

  const removeSubject = (id: string) => {
    setSubjects(subjects.filter(s => s.id !== id));
  };

  const updateSubject = (id: string, field: keyof SubjectData, value: string) => {
    setSubjects(subjects.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const results = useMemo(() => {
    let totalScoreValue = 0;
    let totalMaxScoreValue = 0;
    let validSubjects = 0;

    subjects.forEach(subj => {
      const s = Number(subj.score);
      const tt = Number(subj.total);
      if (!isNaN(s) && !isNaN(tt) && tt > 0 && subj.score !== '' && subj.total !== '') {
        totalScoreValue += s;
        totalMaxScoreValue += tt;
        validSubjects++;
      }
    });

    if (validSubjects === 0 || totalMaxScoreValue === 0) {
      return { percentage: 0, grade: '-', status: 'none', color: 'text-slate-400', totalScore: 0, totalMax: 0 };
    }

    const percentage = (totalScoreValue / totalMaxScoreValue) * 100;
    
    let gradeKey: keyof typeof t.grades = 'f';
    let status: 'pass' | 'fail' = 'fail';
    let color = 'text-rose-500';

    if (percentage >= 90) {
      gradeKey = 'a';
      status = 'pass';
      color = 'text-emerald-500';
    } else if (percentage >= 80) {
      gradeKey = 'b';
      status = 'pass';
      color = 'text-teal-400';
    } else if (percentage >= 70) {
      gradeKey = 'c';
      status = 'pass';
      color = 'text-amber-400';
    } else if (percentage >= 60) {
      gradeKey = 'd';
      status = 'pass';
      color = 'text-orange-400';
    }

    return {
      percentage,
      grade: t.grades[gradeKey],
      status: status === 'pass' ? t.status.pass : t.status.fail,
      isPass: status === 'pass',
      color,
      totalScore: totalScoreValue,
      totalMax: totalMaxScoreValue
    };
  }, [subjects, t]);

  const shareText = encodeURIComponent(
    isAr 
      ? `نتيجتي الإجمالية:\nالمجموع: ${results.totalScore} من ${results.totalMax}\nالنسبة: ${results.percentage.toFixed(2)}%\nالتقدير: ${results.grade}\nاحسب نتيجتك عبر: `
      : `My Overall Grade:\nTotal: ${results.totalScore} out of ${results.totalMax}\nPercentage: ${results.percentage.toFixed(2)}%\nGrade: ${results.grade}\nCalculate here: `
  );
  const whatsappUrl = `https://wa.me/?text=${shareText}${encodeURIComponent(window.location.href)}`;

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      {/* Top AdSense */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm">
        <div className="text-[10px] uppercase tracking-widest mb-1">{t.adTop}</div>
        <p className="text-[10px]">{t.adTopDesc}</p>
      </div>

      <section className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl flex flex-col gap-6 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="text-center relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <Percent size={32} className="text-white" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400">{t.subtitle}</p>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-8 mt-4">
          
          <div className="lg:col-span-3 flex flex-col gap-3">
             <div className="bg-slate-900/40 rounded-2xl border border-white/5 p-4 sm:p-6 flex flex-col gap-4">
               {subjects.map((subj, idx) => (
                 <div key={subj.id} className="flex flex-col sm:flex-row gap-3 items-end sm:items-center bg-slate-800/50 p-3 rounded-xl border border-white/5 relative group">
                   <div className="flex-1 w-full">
                     <label className="block text-xs font-medium text-slate-400 mb-1">{t.subjectName}</label>
                     <input
                       type="text"
                       value={subj.name}
                       onChange={(e) => updateSubject(subj.id, 'name', e.target.value)}
                       className="w-full bg-slate-800 border border-white/10 rounded-lg p-2.5 text-sm md:text-base text-slate-200 outline-none focus:ring-2 focus:ring-emerald-500/50 placeholder:text-slate-600 font-medium h-[42px]"
                       placeholder={isAr ? `مادة ${idx + 1}` : `Subject ${idx + 1}`}
                     />
                   </div>
                   <div className="w-full sm:w-24">
                     <label className="block text-xs font-medium text-slate-400 mb-1">{t.scoreLabel}</label>
                     <input
                       type="number"
                       value={subj.score}
                       onChange={(e) => updateSubject(subj.id, 'score', e.target.value)}
                       className="w-full bg-slate-800 border border-white/10 rounded-lg p-2.5 text-sm md:text-base font-bold text-slate-200 outline-none focus:ring-2 focus:ring-emerald-500/50 text-center h-[42px]"
                     />
                   </div>
                   <div className="w-full sm:w-24">
                     <label className="block text-xs font-medium text-slate-400 mb-1">{t.totalLabel}</label>
                     <input
                       type="number"
                       value={subj.total}
                       onChange={(e) => updateSubject(subj.id, 'total', e.target.value)}
                       className="w-full bg-slate-800 border border-white/10 rounded-lg p-2.5 text-sm md:text-base font-bold text-slate-200 outline-none focus:ring-2 focus:ring-emerald-500/50 text-center h-[42px]"
                     />
                   </div>
                   {subjects.length > 1 && (
                     <button
                       onClick={() => removeSubject(subj.id)}
                       className="absolute top-2 left-2 sm:static sm:top-auto sm:left-auto p-2 text-slate-500 hover:text-rose-400 bg-slate-900/80 hover:bg-slate-800 rounded-lg transition-colors border border-white/5 h-[42px] mt-0 sm:mt-[20px]"
                     >
                       <Trash2 size={16} />
                     </button>
                   )}
                 </div>
               ))}
               
               <button
                 onClick={addSubject}
                 className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-dashed border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 font-medium transition-all"
               >
                 <Plus size={18} />
                 {t.addSubject}
               </button>
             </div>
          </div>

          <div className="lg:col-span-2 flex flex-col justify-center gap-4">
             <div className="flex flex-col justify-center items-center p-6 bg-slate-900/50 rounded-2xl border border-emerald-500/20 relative shadow-[0_0_20px_rgba(16,185,129,0.1)] h-full">
                <div className="text-center mb-6 w-full">
                  <p className="text-slate-400 text-sm font-medium mb-2">{t.resultLabels.percentage}</p>
                  <div className={`text-6xl md:text-7xl font-black tracking-tighter ${results.color}`}>
                    {results.percentage.toFixed(1)}%
                  </div>
                  <p className="text-xs text-slate-500 mt-2 font-medium">
                     {isAr ? `إجمالي الدرجات: ${results.totalScore} / ${results.totalMax}` : `Total Score: ${results.totalScore} / ${results.totalMax}`}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full border-t border-white/10 pt-4">
                   <div className="text-center">
                     <p className="text-slate-500 text-xs mb-1 font-medium">{t.resultLabels.letterGrade}</p>
                     <p className={`font-bold text-xl ${results.color}`}>{results.grade}</p>
                   </div>
                   <div className="text-center border-l border-white/10 pl-4" style={isAr ? { borderLeft: 'none', borderRight: '1px solid rgba(255,255,255,0.1)', paddingLeft: 0, paddingRight: '1rem' } : {}}>
                     <p className="text-slate-500 text-xs mb-1 font-medium">{t.resultLabels.status}</p>
                     <div className="flex items-center justify-center gap-1.5">
                       {results.isPass !== undefined && (
                         results.isPass ? <CheckCircle size={18} className="text-emerald-500" /> : <XCircle size={18} className="text-rose-500" />
                       )}
                       <p className={`font-bold text-xl ${results.color}`}>{results.status}</p>
                     </div>
                   </div>
                </div>

                <div className="mt-8 pt-4 w-full">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 border border-emerald-500/50 rounded-xl text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
                  >
                    <Share2 size={18} />
                    {t.shareWhatsapp}
                  </a>
                </div>
             </div>
          </div>

        </div>

      </section>

      {/* Middle AdSense */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm my-2">
        <div className="text-[10px] uppercase tracking-widest mb-1">{t.adMiddle}</div>
        <p className="text-[10px]">{t.adMiddleDesc}</p>
      </div>

      <article className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col gap-4 text-[13px] text-slate-300 leading-relaxed shadow-lg">
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-2">
            <Info size={20} className="text-emerald-400"/>
            <h2 className="text-lg font-bold text-emerald-400">{t.aboutTitle}</h2>
        </div>
        <div className="space-y-4">
          <p>{t.aboutP1}</p>
        </div>
      </article>

    </div>
  );
}
