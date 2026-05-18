import React, { useState, useMemo } from 'react';
import { Percent, Share2, Info, CheckCircle, XCircle } from 'lucide-react';

const translations = {
  ar: {
    title: "حاسبة النسبة المئوية للدرجات",
    subtitle: "احسب النسبة المئوية والتقدير الحرفي لدرجاتك الامتحانية.",
    scoreLabel: "الدرجة الحاصل عليها",
    totalLabel: "الدرجة الكلية",
    resultLabels: {
      percentage: "النسبة المئوية",
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
    aboutP1: "أداة سريعة وسهلة للطلاب والمعلمين لحساب النسبة المئوية للدرجات، بناءً على الدرجة التي تم الحصول عليها مقارنة بالدرجة الكلية للامتحان. تقوم الأداة أيضاً بعرض التقدير الحرفي المعتاد (A, B, C, D, F) وتحديد حالة النجاح أو الرسوب.",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)"
  },
  en: {
    title: "Grade Percentage Calculator",
    subtitle: "Calculate your test score percentage and letter grade easily.",
    scoreLabel: "Earned Score",
    totalLabel: "Total Score",
    resultLabels: {
      percentage: "Percentage",
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
    aboutP1: "A quick and easy tool for students and teachers to calculate the percentage of a score based on the points earned versus the total points possible. It also provides a standard letter grade (A, B, C, D, F) and pass/fail status.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)"
  }
};

export default function GradePercentageCalculator({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const [score, setScore] = useState<string>('85');
  const [total, setTotal] = useState<string>('100');

  const results = useMemo(() => {
    const s = Number(score);
    const tNum = Number(total);

    if (tNum === 0 || isNaN(s) || isNaN(tNum) || score === '' || total === '') {
      return { percentage: 0, grade: '-', status: 'none', color: 'text-slate-400' };
    }

    const percentage = (s / tNum) * 100;
    
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
      color
    };
  }, [score, total, t]);

  const shareText = encodeURIComponent(
    isAr 
      ? `نتيجتي:\nالدرجة: ${score} من ${total}\nالنسبة: ${results.percentage.toFixed(2)}%\nالتقدير: ${results.grade}\nاحسب نتيجتك عبر: `
      : `My Grade:\nScore: ${score} out of ${total}\nPercentage: ${results.percentage.toFixed(2)}%\nGrade: ${results.grade}\nCalculate here: `
  );
  const whatsappUrl = `https://wa.me/?text=${shareText}${encodeURIComponent(window.location.href)}`;

  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto">
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

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          
          <div className="flex flex-col gap-5 p-6 bg-slate-900/40 rounded-2xl border border-white/5">
             <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{t.scoreLabel}</label>
                <input
                  type="number"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-lg font-bold text-slate-200 outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-center"
                />
             </div>
             
             <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{t.totalLabel}</label>
                <input
                  type="number"
                  value={total}
                  onChange={(e) => setTotal(e.target.value)}
                  className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-lg font-bold text-slate-200 outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-center"
                />
             </div>
          </div>

          <div className="flex flex-col justify-center items-center p-6 bg-slate-900/30 rounded-2xl border border-white/5 relative">
            <div className="text-center mb-6">
              <p className="text-slate-400 text-sm font-medium mb-2">{t.resultLabels.percentage}</p>
              <div className={`text-6xl font-black tracking-tighter ${results.color}`}>
                {results.percentage.toFixed(1)}%
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full border-t border-white/10 pt-4">
               <div className="text-center">
                 <p className="text-slate-500 text-xs mb-1">{t.resultLabels.letterGrade}</p>
                 <p className={`font-bold text-lg ${results.color}`}>{results.grade}</p>
               </div>
               <div className="text-center border-l border-white/10 pl-4" style={isAr ? { borderLeft: 'none', borderRight: '1px solid rgba(255,255,255,0.1)', paddingLeft: 0, paddingRight: '1rem' } : {}}>
                 <p className="text-slate-500 text-xs mb-1">{t.resultLabels.status}</p>
                 <div className="flex items-center justify-center gap-1.5">
                   {results.isPass !== undefined && (
                     results.isPass ? <CheckCircle size={16} className="text-emerald-500" /> : <XCircle size={16} className="text-rose-500" />
                   )}
                   <p className={`font-bold text-lg ${results.color}`}>{results.status}</p>
                 </div>
               </div>
            </div>
          </div>

        </div>

        <div className="flex justify-center pt-2 relative z-10">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 border border-emerald-500/50 rounded-xl text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
          >
            <Share2 size={18} />
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
