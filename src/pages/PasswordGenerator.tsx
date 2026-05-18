import React, { useState, useEffect, useCallback } from 'react';
import { Key, Copy, RefreshCw, Shield, ShieldAlert, ShieldCheck, Share2, Info, Check } from 'lucide-react';

const translations = {
  ar: {
    title: "مولد كلمات المرور",
    subtitle: "قم بتوليد كلمات مرور قوية وعشوائية لحماية حساباتك بضغطة زر.",
    lengthLabel: "طول كلمة المرور",
    uppercaseLabel: "حروف كبيرة (A-Z)",
    lowercaseLabel: "حروف صغيرة (a-z)",
    numbersLabel: "أرقام (0-9)",
    symbolsLabel: "رموز (!@#$%^&*)",
    generate: "توليد كلمة مرور جديدة",
    copy: "نسخ",
    copied: "تم النسخ!",
    strengthLabel: "قوة كلمة المرور:",
    strength: {
      weak: "ضعيفة",
      medium: "متوسطة",
      strong: "قوية"
    },
    shareWhatsapp: "مشاركة الأداة",
    errorEmpty: "يجب اختيار نوع واحد من الأحرف على الأقل",
    aboutTitle: "عن مولد كلمات المرور",
    aboutP1: "أداة مجانية تتيح لك إنشاء كلمات مرور معقدة وآمنة لضمان حماية قصوى لحساباتك الإلكترونية. الأداة تعمل بالكامل على متصفحك (Client-side)، مما يعني أن كلمات المرور التي يتم توليدها لا تُرسل أو تُخزن على أي خوادم، لضمان خصوصيتك وأمانك المطلق.",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)"
  },
  en: {
    title: "Password Generator",
    subtitle: "Generate strong, random passwords to protect your accounts with one click.",
    lengthLabel: "Password Length",
    uppercaseLabel: "Uppercase Letters (A-Z)",
    lowercaseLabel: "Lowercase Letters (a-z)",
    numbersLabel: "Numbers (0-9)",
    symbolsLabel: "Symbols (!@#$%^&*)",
    generate: "Generate New Password",
    copy: "Copy",
    copied: "Copied!",
    strengthLabel: "Password Strength:",
    strength: {
      weak: "Weak",
      medium: "Medium",
      strong: "Strong"
    },
    shareWhatsapp: "Share Tool",
    errorEmpty: "You must select at least one character type",
    aboutTitle: "About Password Generator",
    aboutP1: "A free tool that allows you to generate complex and secure passwords to ensure maximum protection for your online accounts. The tool runs entirely in your browser (client-side), meaning the generated passwords are never sent or stored on any servers, ensuring absolute privacy and security.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)"
  }
};

export default function PasswordGenerator({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState<'weak' | 'medium' | 'strong'>('strong');

  const calculateStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length > 8) score += 1;
    if (pwd.length > 12) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[a-z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    if (score < 3 || pwd.length < 8) return 'weak';
    if (score < 5) return 'medium';
    return 'strong';
  };

  const generatePassword = useCallback(() => {
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (charset === '') {
      setPassword('');
      setStrength('weak');
      return;
    }

    let newPassword = '';
    const randomValues = new Uint32Array(length);
    window.crypto.getRandomValues(randomValues);

    for (let i = 0; i < length; i++) {
      newPassword += charset[randomValues[i] % charset.length];
    }

    setPassword(newPassword);
    setStrength(calculateStrength(newPassword));
    setCopied(false);
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrengthUI = () => {
    switch (strength) {
      case 'weak': return { icon: <ShieldAlert size={20} className="text-rose-500" />, label: t.strength.weak, color: 'text-rose-500', barColor: 'bg-rose-500', barWidth: 'w-1/3' };
      case 'medium': return { icon: <Shield size={20} className="text-amber-500" />, label: t.strength.medium, color: 'text-amber-500', barColor: 'bg-amber-500', barWidth: 'w-2/3' };
      case 'strong': return { icon: <ShieldCheck size={20} className="text-emerald-500" />, label: t.strength.strong, color: 'text-emerald-500', barColor: 'bg-emerald-500', barWidth: 'w-full' };
    }
  };

  const strUI = getStrengthUI();

  const generateShareText = () => {
    let str = isAr ? '*أداة مولد كلمات المرور:*\n\n' : '*Password Generator Tool:*\n\n';
    str += isAr ? `أداة رائعة لإنشاء كلمات مرور قوية وعشوائية مجاناً.\n\nجربها هنا: ` : `A great free tool to generate strong, random passwords.\n\nTry it here: `;
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
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="text-center relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg text-white">
            <Key size={32} />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">{t.subtitle}</p>
        </div>

        <div className="flex flex-col max-w-xl mx-auto w-full gap-6 relative z-10 mt-4">
          
          <div className="flex flex-col gap-4">
            
            <div className="relative">
              <input
                type="text"
                readOnly
                value={password || t.errorEmpty}
                className={`w-full bg-slate-900 border ${password ? 'border-emerald-500/50' : 'border-rose-500/50'} rounded-xl p-5 text-xl tracking-wider font-mono text-center text-slate-100 outline-none pr-14 pl-14 shadow-inner overflow-hidden text-ellipsis`}
                dir="ltr"
              />
              <button
                onClick={handleCopy}
                disabled={!password}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-white/5 disabled:opacity-50"
                aria-label={t.copy}
              >
                {copied ? <Check size={20} className="text-emerald-400" /> : <Copy size={20} />}
              </button>
            </div>

            {password && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-sm font-medium">
                  <span className="text-slate-400">{t.strengthLabel}</span>
                  <div className="flex items-center gap-1.5">
                    {strUI.icon}
                    <span className={strUI.color}>{strUI.label}</span>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full ${strUI.barColor} ${strUI.barWidth} transition-all duration-300`}></div>
                </div>
              </div>
            )}

            <button 
              onClick={generatePassword}
              className="mt-2 flex items-center justify-center gap-2 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-lg active:scale-95"
            >
              <RefreshCw size={18} />
              {t.generate}
            </button>
          </div>

          <div className="flex flex-col gap-5 p-6 bg-slate-900/40 rounded-2xl border border-white/5">
             
             <div>
               <div className="flex justify-between items-center mb-4">
                 <label className="text-sm font-medium text-slate-300">{t.lengthLabel}</label>
                 <span className="text-lg font-bold text-emerald-400">{length}</span>
               </div>
               <input
                 type="range"
                 min="4"
                 max="64"
                 value={length}
                 onChange={(e) => setLength(parseInt(e.target.value))}
                 className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                 style={{ direction: 'ltr' }}
               />
               <div className="flex justify-between text-xs text-slate-500 mt-2 font-mono" dir="ltr">
                 <span>4</span>
                 <span>32</span>
                 <span>64</span>
               </div>
             </div>

             <div className="space-y-3 mt-2 border-t border-white/10 pt-4">
               {[
                 { label: t.uppercaseLabel, state: includeUppercase, setter: setIncludeUppercase },
                 { label: t.lowercaseLabel, state: includeLowercase, setter: setIncludeLowercase },
                 { label: t.numbersLabel, state: includeNumbers, setter: setIncludeNumbers },
                 { label: t.symbolsLabel, state: includeSymbols, setter: setIncludeSymbols },
               ].map((item, idx) => (
                 <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                   <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${item.state ? 'bg-emerald-500 border-emerald-500' : 'bg-slate-800 border-slate-600 group-hover:border-slate-500'}`}>
                     {item.state && <Check size={14} className="text-white" />}
                   </div>
                   <input
                     type="checkbox"
                     checked={item.state}
                     onChange={(e) => item.setter(e.target.checked)}
                     className="hidden"
                   />
                   <span className="text-sm text-slate-300 select-none">{item.label}</span>
                 </label>
               ))}
             </div>

          </div>

          <div className="text-center pt-2">
              <a
                href={`https://wa.me/?text=${generateShareText()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm font-bold text-white shadow-lg transition-all border border-white/10"
              >
                <Share2 size={16} />
                {t.shareWhatsapp}
              </a>
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
