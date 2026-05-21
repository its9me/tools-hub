import React, { useState } from 'react';
import { Share2, Info, Lightbulb, Zap, RefreshCw, Cpu } from 'lucide-react';

const translations = {
  ar: {
    title: "حاسبة الطاقة ومقاومة LED",
    subtitle: "حساب القدرة الكهربائية بالواط وقيمة المقاومة المطلوبة لحماية مصابيح LED بناءً على فولتية المصدر.",
    powerSection: "حاسبة القدرة الكهربائية",
    ledSection: "حاسبة مقاومة LED",
    voltage: "الجهد (V)",
    current: "التيار (I)",
    power: "القدرة (P)",
    sourceVoltage: "جهد المصدر (Vs)",
    ledVoltage: "جهد LED",
    ledCurrent: "تيار LED",
    resistance: "المقاومة المطلوبة",
    resistorPower: "قدرة المقاومة (استهلاك)",
    presets: {
      red: "أحمر (2.0V)",
      green: "أخضر (2.2V)",
      blue: "أزرق (3.3V)",
      white: "أبيض (3.3V)",
      custom: "مخصص"
    },
    volts: "V",
    amps: "A",
    mA: "mA",
    watts: "W",
    ohms: "Ω",
    clear: "مسح الحقول",
    shareWhatsapp: "مشاركة الأداة",
    aboutTitle: "عن الأداة",
    aboutP1: "أداة هندسية مزدوجة تتيح حساب القدرة الكهربائية (الواط) بناءً على الجهد والتيار، إضافة إلى حاسبة مخصصة لمعرفة قيمة المقاومة اللازمة لحماية مصابيح الـ LED من التلف وتحديد القدرة التي ستستهلكها المقاومة وتتبدد على شكل حرارة.",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)"
  },
  en: {
    title: "Power & LED Resistor Calc",
    subtitle: "Calculate electrical power in Watts and the required resistor value to protect LEDs.",
    powerSection: "Electrical Power Calculator",
    ledSection: "LED Resistor Calculator",
    voltage: "Voltage (V)",
    current: "Current (I)",
    power: "Power (P)",
    sourceVoltage: "Source Voltage (Vs)",
    ledVoltage: "LED Voltage (Vf)",
    ledCurrent: "LED Current (If)",
    resistance: "Required Resistance",
    resistorPower: "Resistor Power Rating",
    presets: {
      red: "Red (2.0V)",
      green: "Green (2.2V)",
      blue: "Blue (3.3V)",
      white: "White (3.3V)",
      custom: "Custom"
    },
    volts: "V",
    amps: "A",
    mA: "mA",
    watts: "W",
    ohms: "Ω",
    clear: "Clear Fields",
    shareWhatsapp: "Share Tool",
    aboutTitle: "About The Tool",
    aboutP1: "A dual engineering tool to calculate electrical power (Watts) based on voltage and current, as well as a dedicated calculator to find the correct resistor value to protect an LED, including the power dissipated by the resistor.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)"
  }
};

export default function PowerLedCalculator({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  // Power Calc State
  const [pVoltage, setPVoltage] = useState('');
  const [pCurrent, setPCurrent] = useState('');

  // LED Calc State
  const [vs, setVs] = useState('9');
  const [vfPreset, setVfPreset] = useState('red');
  const [vfCustom, setVfCustom] = useState('2.0');
  const [ledCurrent, setLedCurrent] = useState('20'); // mA

  const cleanInput = (val: string) => val.replace(/[^0-9.]/g, '');

  const pPower = (parseFloat(pVoltage) || 0) * (parseFloat(pCurrent) || 0);

  const ledVf = vfPreset === 'custom' ? (parseFloat(vfCustom) || 0) : parseFloat(parseFloat(vfCustom).toString() || '0');
  
  const handleVfPreset = (val: string) => {
    setVfPreset(val);
    if (val === 'red') setVfCustom('2.0');
    else if (val === 'green') setVfCustom('2.2');
    else if (val === 'blue') setVfCustom('3.3');
    else if (val === 'white') setVfCustom('3.3');
  };

  const calculateLed = () => {
    const sourceV = parseFloat(vs) || 0;
    const forwardV = parseFloat(vfCustom) || 0;
    const currentA = (parseFloat(ledCurrent) || 0) / 1000; // convert mA to A

    if (sourceV <= forwardV || currentA <= 0) {
      return { R: 0, P: 0 };
    }

    const R = (sourceV - forwardV) / currentA;
    const P = Math.pow(currentA, 2) * R;

    return { MathR: R, MathP: P };
  };

  const { MathR, MathP } = calculateLed() || { MathR: 0, MathP: 0 };

  const formatNumber = (num: number) => {
    if (!num) return '0';
    return num.toFixed(2).replace(/\.00$/, '');
  };

  const clearPower = () => {
    setPVoltage('');
    setPCurrent('');
  };

  const clearLed = () => {
    setVs('9');
    setVfPreset('red');
    setVfCustom('2.0');
    setLedCurrent('20');
  };
  
  const isPowerActive = pPower > 0;
  const isLedActive = MathR && MathR > 0;

  const generateShareText = () => {
    let str = isAr ? '*حاسبة الطاقة ومقاومة LED:*\n\n' : '*Power & LED Calculator:*\n\n';
    if (isPowerActive) {
      str += `Power: ${formatNumber(pPower)} W\n\n`;
    }
    if (isLedActive) {
      str += `LED Resistor: ${formatNumber(MathR)} Ω\nResistor Power: ${formatNumber(MathP)} W\n\n`;
    }
    str += isAr ? `احسب القيم الإلكترونية هنا: ` : `Calculate electronic values here: `;
    return encodeURIComponent(str + window.location.href);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
      {/* Top AdSense */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm">
        <div className="text-[10px] uppercase tracking-widest mb-1">{t.adTop}</div>
        <p className="text-[10px]">{t.adTopDesc}</p>
      </div>

      <section className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl flex flex-col gap-8 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="text-center relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg text-white">
            <Lightbulb size={32} />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10 w-full items-start">
          
          {/* Power Calculator */}
          <div className="flex flex-col gap-5 w-full bg-slate-900/40 p-6 rounded-2xl border border-white/5 shadow-inner">
             
             <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-4">
                 <h3 className="font-bold text-slate-200 flex items-center gap-2">
                     <Zap size={18} className="text-amber-400" />
                     {t.powerSection}
                 </h3>
                 <button onClick={clearPower} className="text-xs text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1 transition-colors">
                     <RefreshCw size={12}/>{t.clear}
                 </button>
             </div>

             <div className="flex flex-col gap-4">
                 <div className="flex flex-col gap-1">
                     <label className="text-xs font-bold text-slate-400">{t.voltage}</label>
                     <div className="relative">
                         <input 
                           type="text" 
                           value={pVoltage} 
                           onChange={(e) => setPVoltage(cleanInput(e.target.value))}
                           placeholder="0"
                           className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 pr-10 text-white outline-none focus:ring-2 focus:ring-amber-500/50 transition-all font-mono"
                           dir="ltr"
                         />
                         <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs font-bold bg-slate-900 px-1.5 py-0.5 rounded">{t.volts}</span>
                     </div>
                 </div>

                 <div className="flex flex-col gap-1">
                     <label className="text-xs font-bold text-slate-400">{t.current}</label>
                     <div className="relative">
                         <input 
                           type="text" 
                           value={pCurrent} 
                           onChange={(e) => setPCurrent(cleanInput(e.target.value))}
                           placeholder="0"
                           className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 pr-10 text-white outline-none focus:ring-2 focus:ring-amber-500/50 transition-all font-mono"
                           dir="ltr"
                         />
                         <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs font-bold bg-slate-900 px-1.5 py-0.5 rounded">{t.amps}</span>
                     </div>
                 </div>

                 <div className="mt-2 bg-amber-500/10 p-4 rounded-xl border border-amber-500/20 flex justify-between items-center">
                    <span className="text-sm font-bold text-amber-300">{t.power}</span>
                    <div className="flex items-baseline gap-1" dir="ltr">
                        <span className="text-2xl font-black text-white font-mono">{formatNumber(pPower)}</span>
                        <span className="text-amber-400 text-sm font-bold">{t.watts}</span>
                    </div>
                 </div>
             </div>
          </div>

          {/* LED Calculator */}
          <div className="flex flex-col gap-5 w-full bg-slate-900/40 p-6 rounded-2xl border border-white/5 shadow-inner">
             
             <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-4">
                 <h3 className="font-bold text-slate-200 flex items-center gap-2">
                     <Cpu size={18} className="text-cyan-400" />
                     {t.ledSection}
                 </h3>
                 <button onClick={clearLed} className="text-xs text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1 transition-colors">
                     <RefreshCw size={12}/>{t.clear}
                 </button>
             </div>

             <div className="flex flex-col gap-4">
                 
                 {/* Vs */}
                 <div className="flex flex-col gap-1">
                     <label className="text-xs font-bold text-slate-400">{t.sourceVoltage}</label>
                     <div className="relative">
                         <input 
                           type="text" 
                           value={vs} 
                           onChange={(e) => setVs(cleanInput(e.target.value))}
                           placeholder="9"
                           className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 pr-10 text-white outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all font-mono"
                           dir="ltr"
                         />
                         <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs font-bold bg-slate-900 px-1.5 py-0.5 rounded">{t.volts}</span>
                     </div>
                 </div>
                 
                 {/* Vf */}
                 <div className="flex flex-col gap-1">
                     <label className="text-xs font-bold text-slate-400">{t.ledVoltage}</label>
                     <div className="flex gap-2">
                        <select 
                           value={vfPreset}
                           onChange={(e) => handleVfPreset(e.target.value)}
                           className="bg-slate-800 border border-white/10 rounded-xl p-3 text-sm text-slate-200 outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all cursor-pointer flex-1"
                        >
                           <option value="red">{t.presets.red}</option>
                           <option value="green">{t.presets.green}</option>
                           <option value="blue">{t.presets.blue}</option>
                           <option value="white">{t.presets.white}</option>
                           <option value="custom">{t.presets.custom}</option>
                        </select>

                        {vfPreset === 'custom' && (
                            <div className="relative w-32">
                               <input 
                                 type="text" 
                                 value={vfCustom} 
                                 onChange={(e) => setVfCustom(cleanInput(e.target.value))}
                                 placeholder="2.0"
                                 className="w-full h-full bg-slate-800 border border-white/10 rounded-xl p-3 pr-8 text-white outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all font-mono text-sm"
                                 dir="ltr"
                               />
                               <span className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 text-[10px] font-bold">{t.volts}</span>
                            </div>
                        )}
                     </div>
                 </div>

                 {/* If */}
                 <div className="flex flex-col gap-1">
                     <label className="text-xs font-bold text-slate-400">{t.ledCurrent}</label>
                     <div className="relative">
                         <input 
                           type="text" 
                           value={ledCurrent} 
                           onChange={(e) => setLedCurrent(cleanInput(e.target.value))}
                           placeholder="20"
                           className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 pr-10 text-white outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all font-mono"
                           dir="ltr"
                         />
                         <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs font-bold bg-slate-900 px-1.5 py-0.5 rounded">{t.mA}</span>
                     </div>
                 </div>

                 {/* Results LED */}
                 <div className="mt-2 grid grid-cols-2 gap-3">
                     <div className="bg-cyan-500/10 p-3 rounded-xl border border-cyan-500/20 flex flex-col justify-center items-center gap-1 text-center">
                         <span className="text-[10px] font-bold text-cyan-300 uppercase">{t.resistance}</span>
                         <div className="flex items-baseline gap-1" dir="ltr">
                             <span className="text-xl font-black text-white font-mono">{MathR > 0 ? formatNumber(MathR) : '---'}</span>
                             <span className="text-cyan-400 text-xs font-bold">{t.ohms}</span>
                         </div>
                     </div>
                     <div className="bg-slate-800 p-3 rounded-xl border border-white/5 flex flex-col justify-center items-center gap-1 text-center">
                         <span className="text-[10px] font-bold text-slate-400 uppercase">{t.resistorPower}</span>
                         <div className="flex items-baseline gap-1" dir="ltr">
                             <span className="text-xl font-black text-white font-mono">{MathR > 0 ? formatNumber(MathP) : '---'}</span>
                             <span className="text-slate-500 text-xs font-bold">{t.watts}</span>
                         </div>
                     </div>
                 </div>

             </div>
          </div>

        </div>
        
        <div className="hidden md:flex justify-center pt-4 relative z-10 w-full mt-4 border-t border-white/5">
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
            <Info size={20} className="text-amber-400"/>
            <h2 className="text-lg font-bold text-amber-400">{t.aboutTitle}</h2>
        </div>
        <div className="space-y-4">
          <p>{t.aboutP1}</p>
        </div>
      </article>

    </div>
  );
}
