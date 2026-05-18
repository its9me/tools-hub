import React, { useState, useMemo } from 'react';
import { GraduationCap, Plus, Trash2, Share2, Info } from 'lucide-react';

const globalSystems = [
    { id: '4.0', nameAr: 'نظام 4.0 (الأكثر شيوعاً أمريكياً وعالمياً)', nameEn: '4.0 Scale (Most Common Global)' },
    { id: '4.3', nameAr: 'نظام 4.3 (بعض الجامعات الأمريكية)', nameEn: '4.3 Scale (Some US Universities)' },
    { id: '5.0-ksa', nameAr: 'نظام 5.0 (السعودية وبعض الدول العربية)', nameEn: '5.0 Scale (KSA & Arab Region)' },
    { id: '5.0-mit', nameAr: 'نظام 5.0 (MIT وبعض الجامعات)', nameEn: '5.0 Scale (MIT & Others)' },
];

const gradeScales: Record<string, { label: string, value: number }[]> = {
  '4.0': [
    { label: 'A+ / A (4.0)', value: 4.0 },
    { label: 'A- (3.7)', value: 3.7 },
    { label: 'B+ (3.3)', value: 3.3 },
    { label: 'B (3.0)', value: 3.0 },
    { label: 'B- (2.7)', value: 2.7 },
    { label: 'C+ (2.3)', value: 2.3 },
    { label: 'C (2.0)', value: 2.0 },
    { label: 'C- (1.7)', value: 1.7 },
    { label: 'D+ (1.3)', value: 1.3 },
    { label: 'D (1.0)', value: 1.0 },
    { label: 'F (0.0)', value: 0.0 }
  ],
  '4.3': [
    { label: 'A+ (4.3)', value: 4.3 },
    { label: 'A (4.0)', value: 4.0 },
    { label: 'A- (3.7)', value: 3.7 },
    { label: 'B+ (3.3)', value: 3.3 },
    { label: 'B (3.0)', value: 3.0 },
    { label: 'B- (2.7)', value: 2.7 },
    { label: 'C+ (2.3)', value: 2.3 },
    { label: 'C (2.0)', value: 2.0 },
    { label: 'C- (1.7)', value: 1.7 },
    { label: 'D+ (1.3)', value: 1.3 },
    { label: 'D (1.0)', value: 1.0 },
    { label: 'F (0.0)', value: 0.0 }
  ],
  '5.0-ksa': [
    { label: 'A+ (5.0)', value: 5.0 },
    { label: 'A (4.75)', value: 4.75 },
    { label: 'B+ (4.5)', value: 4.5 },
    { label: 'B (4.0)', value: 4.0 },
    { label: 'C+ (3.5)', value: 3.5 },
    { label: 'C (3.0)', value: 3.0 },
    { label: 'D+ (2.5)', value: 2.5 },
    { label: 'D (2.0)', value: 2.0 },
    { label: 'F (1.0)', value: 1.0 }
  ],
  '5.0-mit': [
    { label: 'A (5.0)', value: 5.0 },
    { label: 'B (4.0)', value: 4.0 },
    { label: 'C (3.0)', value: 3.0 },
    { label: 'D (2.0)', value: 2.0 },
    { label: 'F (0.0)', value: 0.0 }
  ]
};

const translations = {
  ar: {
    title: "حاسبة المعدل التراكمي (GPA)",
    subtitle: "احسب معدلك الفصلي والتراكمي لعدة أنظمة جامعية عالمية وعربية بسهولة.",
    system: "نظام الجامعة",
    prevGpaOptional: "المعدل التراكمي السابق (اختياري)",
    prevCreditsOptional: "الساعات المنجزة مسبقاً (اختياري)",
    courseName: "اسم المادة",
    credits: "الساعات",
    grade: "التقدير",
    addCourse: "إضافة مادة",
    results: "النتائج",
    semesterGpa: "المعدل الفصلي",
    cumulativeGpa: "المعدل التراكمي",
    totalCredits: "ساعات الفصل",
    cumCredits: "إجمالي الساعات",
    shareWhatsapp: "مشاركة النتائج",
    aboutTitle: "كيف يتم حساب الـ GPA؟",
    aboutP1: "تقوم الحاسبة بضرب قيمة التقدير لكل مادة في عدد ساعاتها المعتمدة لإنتاج 'نقاط الجودة'، ثم يتم قسمة مجموع النقاط على إجمالي الساعات المعتمدة.",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)"
  },
  en: {
    title: "GPA Calculator",
    subtitle: "Calculate your semester and cumulative GPA for global university systems.",
    system: "Grading System",
    prevGpaOptional: "Previous Cumulative GPA (Optional)",
    prevCreditsOptional: "Previous Credits Earned (Optional)",
    courseName: "Course Name",
    credits: "Credits",
    grade: "Grade",
    addCourse: "Add Course",
    results: "Results",
    semesterGpa: "Semester GPA",
    cumulativeGpa: "Cumulative GPA",
    totalCredits: "Semester Credits",
    cumCredits: "Total Credits",
    shareWhatsapp: "Share Results",
    aboutTitle: "How is GPA calculated?",
    aboutP1: "The calculator multiplies the grade value of each course by its credits to produce 'quality points', and then divides the total quality points by the total amount of credits.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)"
  }
};

export default function GPACalculator({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const [system, setSystem] = useState('4.0');
  const [prevGpa, setPrevGpa] = useState<number | ''>('');
  const [prevCredits, setPrevCredits] = useState<number | ''>('');

  const [courses, setCourses] = useState([
    { id: '1', name: '', credits: 3, gradeIndex: 0 },
    { id: '2', name: '', credits: 3, gradeIndex: 1 },
    { id: '3', name: '', credits: 3, gradeIndex: 3 },
  ]);

  const addCourse = () => {
    setCourses([...courses, { id: crypto.randomUUID(), name: '', credits: 3, gradeIndex: 0 }]);
  };

  const removeCourse = (id: string) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  const updateCourse = (id: string, field: string, value: any) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  // Reset grades when system changes, if out of bound
  const handleSystemChange = (val: string) => {
    setSystem(val);
    const maxIdx = gradeScales[val].length - 1;
    setCourses(courses.map(c => ({
       ...c,
       gradeIndex: c.gradeIndex > maxIdx ? maxIdx : c.gradeIndex
    })));
  };

  const results = useMemo(() => {
    let semPoints = 0;
    let semCredits = 0;
    
    const scales = gradeScales[system];

    for (const c of courses) {
      const creds = Number(c.credits) || 0;
      if (creds > 0) {
        semCredits += creds;
        const scaleVal = scales[c.gradeIndex]?.value || 0;
        semPoints += (creds * scaleVal);
      }
    }

    const semesterGpa = semCredits > 0 ? semPoints / semCredits : 0;

    const pGpa = Number(prevGpa) || 0;
    const pCreds = Number(prevCredits) || 0;

    let cumCredits = semCredits + pCreds;
    let cumPoints = semPoints + (pGpa * pCreds);

    const cumulativeGpa = cumCredits > 0 ? cumPoints / cumCredits : 0;

    return {
      semesterGpa,
      semCredits,
      cumulativeGpa,
      cumCredits
    };
  }, [courses, system, prevGpa, prevCredits]);

  const shareText = encodeURIComponent(
    isAr 
      ? `حاسبت معدلي التراكمي!\nالمعدل الفصلي: ${results.semesterGpa.toFixed(2)}\nالمعدل التراكمي: ${results.cumulativeGpa.toFixed(2)}\nاحسب معدلك عبر: `
      : `I just calculated my GPA!\nSemester GPA: ${results.semesterGpa.toFixed(2)}\nCumulative GPA: ${results.cumulativeGpa.toFixed(2)}\nCalculate yours here: `
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
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-teal-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="text-center relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <GraduationCap size={32} className="text-white" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10 mt-4">
          
          <div className="col-span-1 lg:col-span-2 flex flex-col gap-5">
            {/* Settings */}
            <div className="bg-slate-900/40 p-4 rounded-xl border border-white/5 space-y-4">
               <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">{t.system}</label>
                  <select
                    value={system}
                    onChange={(e) => handleSystemChange(e.target.value)}
                    className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                    dir={isAr ? 'rtl' : 'ltr'}
                  >
                    {globalSystems.map(s => (
                      <option key={s.id} value={s.id}>{isAr ? s.nameAr : s.nameEn}</option>
                    ))}
                  </select>
               </div>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">{t.prevGpaOptional}</label>
                    <input
                      type="number"
                      step="0.01"
                      value={prevGpa}
                      onChange={(e) => setPrevGpa(e.target.value ? Number(e.target.value) : '')}
                      className="w-full bg-slate-800 border border-white/10 rounded-lg p-2.5 text-sm text-slate-200 outline-none focus:ring-1 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">{t.prevCreditsOptional}</label>
                    <input
                      type="number"
                      value={prevCredits}
                      onChange={(e) => setPrevCredits(e.target.value ? Number(e.target.value) : '')}
                      className="w-full bg-slate-800 border border-white/10 rounded-lg p-2.5 text-sm text-slate-200 outline-none focus:ring-1 focus:ring-teal-500"
                    />
                  </div>
               </div>
            </div>

            {/* Courses Table */}
            <div>
              <div className="flex border-b border-white/10 pb-2 mb-2 text-xs font-bold text-slate-400">
                <div className="flex-[2] px-2">{t.courseName}</div>
                <div className="flex-1 px-2 text-center">{t.credits}</div>
                <div className="flex-1 px-2 text-center">{t.grade}</div>
                <div className="w-8"></div>
              </div>
              
              <div className="space-y-2">
                {courses.map((course) => (
                  <div key={course.id} className="flex items-center gap-2 group">
                    <div className="flex-[2]">
                       <input 
                         type="text" 
                         value={course.name} 
                         onChange={(e)=>updateCourse(course.id, 'name', e.target.value)} 
                         className="w-full bg-slate-900/50 border border-white/5 hover:border-white/10 focus:border-teal-500/50 rounded-lg p-2 text-sm text-slate-200 outline-none transition-colors"
                         placeholder={`Course...`}
                       />
                    </div>
                    <div className="flex-1">
                       <input 
                         type="number" 
                         value={course.credits} 
                         onChange={(e)=>updateCourse(course.id, 'credits', e.target.value ? Number(e.target.value) : '')} 
                         className="w-full text-center bg-slate-900/50 border border-white/5 hover:border-white/10 focus:border-teal-500/50 rounded-lg p-2 text-sm text-slate-200 outline-none transition-colors"
                       />
                    </div>
                    <div className="flex-1">
                       <select
                         value={course.gradeIndex}
                         onChange={(e)=>updateCourse(course.id, 'gradeIndex', Number(e.target.value))}
                         className="w-full bg-slate-900/50 border border-white/5 hover:border-white/10 focus:border-teal-500/50 rounded-lg p-2 text-sm text-slate-200 outline-none transition-colors"
                         dir="ltr"
                       >
                         {gradeScales[system].map((g, idx) => (
                           <option key={idx} value={idx}>{g.label}</option>
                         ))}
                       </select>
                    </div>
                    <div className="w-8 flex justify-center">
                       <button onClick={()=>removeCourse(course.id)} className="text-slate-500 hover:text-rose-400 p-1 rounded-md transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                         <Trash2 size={16} />
                       </button>
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={addCourse} className="mt-4 flex items-center gap-1.5 text-sm text-teal-400 hover:text-teal-300 font-medium px-2 py-1 rounded-lg hover:bg-teal-400/10 transition-colors">
                <Plus size={16} /> {t.addCourse}
              </button>
            </div>
          </div>

          <div className="col-span-1 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-8 flex flex-col gap-6 justify-center">
             
            <div className="text-center">
              <p className="text-slate-400 text-sm font-medium mb-2">{t.semesterGpa}</p>
              <div className="text-5xl font-black text-teal-400 tracking-tighter mb-2">
                {results.semesterGpa.toFixed(2)}
              </div>
              <p className="text-slate-500 text-xs">{t.totalCredits}: <strong>{results.semCredits}</strong></p>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

            <div className="text-center">
              <p className="text-slate-400 text-sm font-medium mb-2">{t.cumulativeGpa}</p>
              <div className="text-4xl font-black text-emerald-400 tracking-tighter mb-2">
                {results.cumulativeGpa.toFixed(2)}
              </div>
              <p className="text-slate-500 text-xs">{t.cumCredits}: <strong>{results.cumCredits}</strong></p>
            </div>

            <div className="mt-4 flex justify-center">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-500 rounded-xl text-sm font-bold text-white shadow-lg shadow-teal-600/20 transition-all active:scale-95 w-full"
                >
                  <Share2 size={18} />
                  {t.shareWhatsapp}
                </a>
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
            <Info size={20} className="text-teal-400"/>
            <h2 className="text-lg font-bold text-teal-400">{t.aboutTitle}</h2>
        </div>
        <div className="space-y-4">
          <p>{t.aboutP1}</p>
        </div>
      </article>

    </div>
  );
}
