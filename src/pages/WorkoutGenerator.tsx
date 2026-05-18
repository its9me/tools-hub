import React, { useState } from 'react';
import { Dumbbell, Share2, Info, Timer, Zap, RefreshCw, CheckCircle2, Target } from 'lucide-react';

const translations = {
  ar: {
    title: "مولد تمارين منزلية",
    subtitle: "توليد برنامج تمارين عشوائي يمكنك القيام به في المنزل بدون معدات.",
    focusLabel: "التركيز",
    difficultyLabel: "المستوى",
    durationLabel: "المدة",
    generate: "توليد التمارين",
    focusOptions: {
      full: "شامل (Full Body)",
      upper: "الجزء العلوي (Upper Body)",
      lower: "الجزء السفلي (Lower Body)",
      core: "عضلات البطن (Core & Abs)",
      cardio: "كارديو (Cardio)"
    },
    difficultyOptions: {
      beginner: "مبتدئ",
      intermediate: "متوسط",
      advanced: "متقدم"
    },
    durationOptions: {
      short: "15 دقيقة",
      medium: "30 دقيقة",
      long: "45 دقيقة"
    },
    workoutPlan: "خطة التمرين:",
    rounds: "الجولات",
    workTime: "وقت التمرين",
    restTime: "وقت الراحة",
    exercisesList: "التمارين:",
    shareWhatsapp: "مشاركة التمرين",
    aboutTitle: "عن مولد التمارين",
    aboutP1: "صُممت هذه الأداة لكسر الروتين الرياضي وتوفير برامج تمارين منزلية متجددة يومياً لا تحتاج لأي معدات. تعتمد التمارين على وزن الجسم (Calisthenics) وتُقسم لفترات زمنية بطريقة التمارين المتقطعة عالية الكثافة (HIIT) أو الدائرية (Circuit) لضمان أقصى حرق وأفضل نتيجة.",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)"
  },
  en: {
    title: "Home Workout Generator",
    subtitle: "Generate a random, no-equipment workout plan you can do at home.",
    focusLabel: "Focus Area",
    difficultyLabel: "Difficulty",
    durationLabel: "Duration",
    generate: "Generate Workout",
    focusOptions: {
      full: "Full Body",
      upper: "Upper Body",
      lower: "Lower Body",
      core: "Core & Abs",
      cardio: "Cardio"
    },
    difficultyOptions: {
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced"
    },
    durationOptions: {
      short: "15 Minutes",
      medium: "30 Minutes",
      long: "45 Minutes"
    },
    workoutPlan: "Workout Plan:",
    rounds: "Rounds",
    workTime: "Work Time",
    restTime: "Rest Time",
    exercisesList: "Exercises:",
    shareWhatsapp: "Share Workout",
    aboutTitle: "About Workout Generator",
    aboutP1: "This tool is designed to break your fitness routine by providing fresh, randomized home workouts that require no equipment. It relies on bodyweight exercises (Calisthenics) and uses interval training (HIIT or Circuit format) to ensure maximum burn and optimal results.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)"
  }
};

const exercisesList = {
  upper: {
    beginner: ["Kneeling Push-ups", "Wall Push-ups", "Arm Circles", "Plank Shoulder Taps", "Punches", "Inchworms"],
    intermediate: ["Standard Push-ups", "Tricep Dips", "Pike Push-ups", "Plank Up-Downs", "Diamond Push-ups (Kneeling)", "Bear Crawls"],
    advanced: ["Diamond Push-ups", "Decline Push-ups", "Explosive Push-ups", "Handstand Hold", "Spiderman Push-ups", "Typewriter Push-ups"]
  },
  lower: {
    beginner: ["Bodyweight Squats", "Forward Lunges", "Calf Raises", "Glute Bridges", "Side Leg Raises", "Donkey Kicks"],
    intermediate: ["Jump Squats", "Walking Lunges", "Curtsy Lunges", "Single-leg Glute Bridges", "Bulgarian Split Squats", "Sumo Squats"],
    advanced: ["Pistol Squats", "Jumping Lunges", "Tuck Jumps", "Box Jumps", "Squat Jacks", "Shrimp Squats"]
  },
  core: {
    beginner: ["Standard Crunches", "Forearm Plank", "Bird Dog", "Sit-ups", "Flutter Kicks", "Heel Touches"],
    intermediate: ["Bicycle Crunches", "Russian Twists", "Side Plank", "Straight Leg Raises", "Mountain Climbers", "Reverse Crunches"],
    advanced: ["V-Ups", "Hollow Body Hold", "Plank Jacks", "Dragon Flags (Tuck)", "L-Sit Hold", "Windshield Wipers"]
  },
  cardio: {
    beginner: ["Jumping Jacks", "High Knees (Marching)", "Butt Kicks", "Step Jacks", "Shadow Boxing", "Side Shuffles"],
    intermediate: ["Burpees (No Jump)", "Mountain Climbers", "Skater Jumps", "Fast High Knees", "Jumping Jacks", "Fast Feet"],
    advanced: ["Full Burpees", "Double Unders (Simulated)", "Sprint in Place", "Speed Skaters", "Tuck Jumps", "Broad Jumps"]
  }
};

type FocusType = 'full' | 'upper' | 'lower' | 'core' | 'cardio';
type DifficultyType = 'beginner' | 'intermediate' | 'advanced';
type DurationType = 'short' | 'medium' | 'long';

export default function WorkoutGenerator({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const [focus, setFocus] = useState<FocusType>('full');
  const [difficulty, setDifficulty] = useState<DifficultyType>('beginner');
  const [duration, setDuration] = useState<DurationType>('short');

  const [workout, setWorkout] = useState<{
    exercises: string[];
    rounds: number;
    workSecs: number;
    restSecs: number;
  } | null>(null);

  const shuffleArray = (array: string[]) => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  const generateWorkout = () => {
    let pool: string[] = [];

    if (focus === 'full') {
      const upper = exercisesList.upper[difficulty];
      const lower = exercisesList.lower[difficulty];
      const core = exercisesList.core[difficulty];
      const cardio = exercisesList.cardio[difficulty];
      pool = [...upper, ...lower, ...core, ...cardio];
    } else {
      pool = [...exercisesList[focus][difficulty]];
    }

    pool = shuffleArray(pool);

    let numExercises = 5;
    let rounds = 3;
    let workSecs = 30;
    let restSecs = 15;

    // Adjust params based on duration
    if (duration === 'short') { // ~15 mins
      numExercises = 5;
      rounds = 3;
      // 5 exercises * 45s (work+rest) = 225s per round. 3 rounds = 675s = ~11 mins + rests between rounds.
    } else if (duration === 'medium') { // ~30 mins
      numExercises = 6;
      rounds = 4;
      workSecs = 40;
      restSecs = 20;
    } else if (duration === 'long') { // ~45 mins
      numExercises = 8;
      rounds = 5;
      workSecs = 45;
      restSecs = 15;
    }

    // Adjust params based on difficulty slightly
    if (difficulty === 'beginner') {
      workSecs = duration === 'short' ? 30 : 40;
      restSecs = duration === 'short' ? 20 : 30;
    } else if (difficulty === 'advanced') {
      workSecs = duration === 'short' ? 45 : 50;
      restSecs = duration === 'short' ? 15 : 10;
    }

    // Select required number of exercises
    let selectedExercises: string[] = [];
    while (selectedExercises.length < numExercises) {
      if (pool.length === 0) {
        // refill if we run out (unlikely but safe)
        pool = shuffleArray(focus === 'full' 
          ? [...exercisesList.upper[difficulty], ...exercisesList.lower[difficulty], ...exercisesList.core[difficulty], ...exercisesList.cardio[difficulty]] 
          : [...exercisesList[focus][difficulty]]
        );
      }
      selectedExercises.push(pool.pop()!);
    }

    setWorkout({
      exercises: selectedExercises,
      rounds,
      workSecs,
      restSecs
    });
  };

  const generateShareText = () => {
    if (!workout) return '';
    let str = isAr ? '*تمرين منزلي اليوم:*\n\n' : '*My Home Workout Today:*\n\n';
    str += `⏱️ ${t.durationOptions[duration]} | 💪 ${t.difficultyOptions[difficulty]}\n\n`;
    str += `🔄 ${t.rounds}: ${workout.rounds}\n`;
    str += `⏳ ${workout.workSecs}s ON / ${workout.restSecs}s OFF\n\n`;
    workout.exercises.forEach((ex, idx) => {
      str += `${idx + 1}. ${ex}\n`;
    });
    str += isAr ? `\n\nولد تمرينك من هنا: ` : `\n\nGenerate your workout here: `;
    return encodeURIComponent(str + window.location.href);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      {/* Top AdSense */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm">
        <div className="text-[10px] uppercase tracking-widest mb-1">{t.adTop}</div>
        <p className="text-[10px]">{t.adTopDesc}</p>
      </div>

      <section className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl flex flex-col gap-6 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-violet-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="text-center relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-violet-400 to-fuchsia-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <Dumbbell size={32} className="text-white" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10 mt-4">
          
          <div className="flex flex-col gap-5 p-6 bg-slate-900/40 rounded-2xl border border-white/5">
            
            <div className="flex flex-col gap-4">
               <div>
                 <label className="block text-sm font-medium text-slate-300 mb-2">{t.focusLabel}</label>
                 <select
                   value={focus}
                   onChange={(e) => setFocus(e.target.value as FocusType)}
                   className="w-full bg-slate-800 border border-white/10 rounded-xl p-3.5 text-sm font-medium text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500/50 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat"
                   style={{ backgroundPosition: isAr ? 'left 1rem center' : 'right 1rem center' }}
                   dir={isAr ? 'rtl' : 'ltr'}
                 >
                   <option value="full">{t.focusOptions.full}</option>
                   <option value="upper">{t.focusOptions.upper}</option>
                   <option value="lower">{t.focusOptions.lower}</option>
                   <option value="core">{t.focusOptions.core}</option>
                   <option value="cardio">{t.focusOptions.cardio}</option>
                 </select>
               </div>

               <div>
                 <label className="block text-sm font-medium text-slate-300 mb-2">{t.difficultyLabel}</label>
                 <div className="flex p-1 bg-slate-800 rounded-xl border border-white/5">
                   {(['beginner', 'intermediate', 'advanced'] as DifficultyType[]).map(level => (
                     <button 
                       key={level}
                       onClick={() => setDifficulty(level)}
                       className={`flex-1 py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-colors ${difficulty === level ? 'bg-violet-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
                     >
                       {t.difficultyOptions[level]}
                     </button>
                   ))}
                 </div>
               </div>

               <div>
                 <label className="block text-sm font-medium text-slate-300 mb-2">{t.durationLabel}</label>
                 <div className="flex p-1 bg-slate-800 rounded-xl border border-white/5">
                   {(['short', 'medium', 'long'] as DurationType[]).map(dur => (
                     <button 
                       key={dur}
                       onClick={() => setDuration(dur)}
                       className={`flex-1 py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-colors ${duration === dur ? 'bg-fuchsia-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
                     >
                       {t.durationOptions[dur]}
                     </button>
                   ))}
                 </div>
               </div>

               <button 
                  onClick={generateWorkout}
                  className="mt-2 flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-bold transition-all shadow-lg shadow-violet-600/20 active:scale-95"
               >
                 <RefreshCw size={18} className={workout ? "" : "animate-pulse"} />
                 {t.generate}
               </button>

            </div>

          </div>

          <div className="flex flex-col gap-4">
             
             {workout ? (
                <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-300 h-full">
                  <div className="bg-slate-900/50 border border-violet-500/30 p-5 rounded-2xl flex flex-col gap-5 shadow-[0_0_20px_rgba(139,92,246,0.1)]">
                     
                     <div className="flex justify-between items-center border-b border-white/10 pb-4">
                       <h3 className="text-lg font-bold text-white flex items-center gap-2">
                         <Target size={20} className="text-fuchsia-400" />
                         {t.workoutPlan}
                       </h3>
                       <span className="bg-slate-800 text-slate-300 text-xs px-2.5 py-1 rounded-full font-medium border border-white/5">
                         {t.durationOptions[duration]}
                       </span>
                     </div>

                     <div className="grid grid-cols-3 gap-3">
                       <div className="bg-slate-800/80 rounded-xl p-3 flex flex-col items-center justify-center text-center border border-white/5">
                         <RefreshCw size={18} className="text-violet-400 mb-1" />
                         <span className="text-[10px] text-slate-400">{t.rounds}</span>
                         <span className="text-lg font-bold text-slate-200">{workout.rounds}</span>
                       </div>
                       <div className="bg-slate-800/80 rounded-xl p-3 flex flex-col items-center justify-center text-center border border-white/5">
                         <Zap size={18} className="text-rose-400 mb-1" />
                         <span className="text-[10px] text-slate-400">{t.workTime}</span>
                         <span className="text-lg font-bold text-slate-200">{workout.workSecs}s</span>
                       </div>
                       <div className="bg-slate-800/80 rounded-xl p-3 flex flex-col items-center justify-center text-center border border-white/5">
                         <Timer size={18} className="text-sky-400 mb-1" />
                         <span className="text-[10px] text-slate-400">{t.restTime}</span>
                         <span className="text-lg font-bold text-slate-200">{workout.restSecs}s</span>
                       </div>
                     </div>

                     <div className="flex flex-col gap-2">
                        <span className="text-xs font-bold text-slate-400 mb-1">{t.exercisesList}</span>
                        <div className="flex flex-col gap-2">
                          {workout.exercises.map((ex, idx) => (
                            <div key={idx} className="flex items-center gap-3 bg-slate-950/40 p-3 rounded-xl border border-white/5">
                              <div className="flex items-center justify-center w-6 h-6 rounded-md bg-violet-500/20 text-violet-400 text-xs font-bold shrink-0">
                                {idx + 1}
                              </div>
                              <span className="text-sm font-semibold text-slate-200">{ex}</span>
                            </div>
                          ))}
                        </div>
                     </div>

                  </div>

                  <div className="mt-auto pt-2">
                    <a
                      href={`https://wa.me/?text=${generateShareText()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm font-bold text-white shadow-lg transition-all border border-white/5 w-full"
                    >
                      <Share2 size={18} />
                      {t.shareWhatsapp}
                    </a>
                  </div>

                </div>
             ) : (
                <div className="flex-1 min-h-[300px] border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-slate-500 bg-slate-900/20 relative">
                   <Dumbbell size={48} strokeWidth={1} className="mb-4 opacity-30 text-violet-400" />
                   <p className="text-sm font-medium">{isAr ? 'اضغط على "توليد التمارين" لبدء خطتك' : 'Click "Generate Workout" to start'}</p>
                </div>
             )}

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
            <Info size={20} className="text-violet-400"/>
            <h2 className="text-lg font-bold text-violet-400">{t.aboutTitle}</h2>
        </div>
        <div className="space-y-4">
          <p>{t.aboutP1}</p>
        </div>
      </article>

    </div>
  );
}
