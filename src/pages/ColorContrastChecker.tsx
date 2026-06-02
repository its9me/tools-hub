import React, { useState, useEffect, useMemo } from 'react';
import { 
  Palette, RefreshCw, AlertCircle, CheckCircle, XCircle, 
  HelpCircle, Copy, Info, Eye, Type, Check, Sparkles, ChevronRight, 
  ChevronLeft, LayoutGrid, LayoutList, Share2, Award
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface ColorContrastCheckerProps {
  lang: 'ar' | 'en';
}

interface ColorRGB {
  r: number;
  g: number;
  b: number;
}

interface SuggestionPair {
  type: 'lighten' | 'darken' | 'bg_lighten' | 'bg_darken';
  textColor: string;
  bgColor: string;
  ratio: number;
  passesAA: boolean;
  passesAAA: boolean;
}

// Helper colors
const PRESETS = [
  { nameAr: 'تويلايت أزرق', nameEn: 'Blue Twilight', text: '#2bf1ff', bg: '#030825' },
  { nameAr: 'غابة الزمرد', nameEn: 'Emerald Forest', text: '#10b981', bg: '#062011' },
  { nameAr: 'غروب دافئ', nameEn: 'Warm Sunset', text: '#fdba74', bg: '#1c1917' },
  { nameAr: 'بنفسجي ملكي', nameEn: 'Purple Royal', text: '#e9d5ff', bg: '#2e1065' },
  { nameAr: 'برتقالي مشرق', nameEn: 'Electric Orange', text: '#ff7e3b', bg: '#030617' },
  { nameAr: 'إنتاجية ورق', nameEn: 'Paper & Ink', text: '#1e293b', bg: '#f8fafc' },
  { nameAr: 'الوضع الليلي الكلاسيكي', nameEn: 'Classic Dark', text: '#f1f5f9', bg: '#0f172a' },
  { nameAr: 'الحلوى والكرز', nameEn: 'Sweet Cherry', text: '#ffe4e6', bg: '#9f1239' },
];

export default function ColorContrastChecker({ lang }: ColorContrastCheckerProps) {
  const isAr = lang === 'ar';

  const [textColor, setTextColor] = useState('#2bf1ff');
  const [bgColor, setBgColor] = useState('#030825');
  const [sampleText, setSampleText] = useState(isAr ? 'سهولة القراءة والوصول للمواقع الإلكترونية أمر ضروري وهام لكل مستخدم.' : 'Designing for everyone makes products accessible and easier for all users.');
  const [copiedType, setCopiedType] = useState<string | null>(null);

  // Sync sample text when language changes, but keep user updates
  useEffect(() => {
    setSampleText(isAr 
      ? 'سهولة القراءة والوصول للمواقع الإلكترونية أمر ضروري وهام لكل مستخدم.' 
      : 'Designing for everyone makes products accessible and easier for all users.'
    );
  }, [lang, isAr]);

  // Core Math & Conversion Helpers
  const parseColor = (colorStr: string): ColorRGB | null => {
    let hex = colorStr.trim().replace(/^#/, '');
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length === 6) {
      const num = parseInt(hex, 16);
      return {
        r: (num >> 16) & 255,
        g: (num >> 8) & 255,
        b: num & 255
      };
    }
    // Try parsing rgb if typed
    const rgbMatch = colorStr.match(/rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i);
    if (rgbMatch) {
      return {
        r: Math.min(255, Math.max(0, parseInt(rgbMatch[1], 10))),
        g: Math.min(255, Math.max(0, parseInt(rgbMatch[2], 10))),
        b: Math.min(255, Math.max(0, parseInt(rgbMatch[3], 10)))
      };
    }
    return null;
  };

  const rgbToHex = (r: number, g: number, b: number): string => {
    const clamp = (val: number) => Math.min(255, Math.max(0, Math.round(val)));
    return "#" + ((1 << 24) + (clamp(r) << 16) + (clamp(g) << 8) + clamp(b)).toString(16).slice(1);
  };

  const getRelativeLuminance = (r: number, g: number, b: number): number => {
    const a = [r, g, b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const calculateContrast = (rgb1: ColorRGB, rgb2: ColorRGB): number => {
    const l1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
    const l2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);
    const brightest = Math.max(l1, l2);
    const darkest = Math.min(l1, l2);
    const ratio = (brightest + 0.05) / (darkest + 0.05);
    return Math.round(ratio * 100) / 100;
  };

  // Convert RGB to HSL for color suggestions
  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h: h * 360, s: s * 100, l: l * 100 };
  };

  const hslToRgb = (h: number, s: number, l: number): ColorRGB => {
    h /= 360; s /= 100; l /= 100;
    let r = l, g = l, b = l;

    if (s !== 0) {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  };

  // Safe color parsing with defaults on error
  const rgbText = useMemo(() => parseColor(textColor) || { r: 43, g: 241, b: 255 }, [textColor]);
  const rgbBg = useMemo(() => parseColor(bgColor) || { r: 3, g: 8, b: 37 }, [bgColor]);

  const contrastRatio = useMemo(() => {
    return calculateContrast(rgbText, rgbBg);
  }, [rgbText, rgbBg]);

  // WCAG evaluations
  const isNormalAAPass = contrastRatio >= 4.5;
  const isNormalAAAPass = contrastRatio >= 7.0;
  const isLargeAAPass = contrastRatio >= 3.0;
  const isLargeAAAPass = contrastRatio >= 4.5;

  // Swap Colors action
  const handleSwap = () => {
    const tempText = textColor;
    setTextColor(bgColor);
    setBgColor(tempText);
  };

  // Copy code utility
  const handleCopyValue = (val: string, type: 'text' | 'bg') => {
    navigator.clipboard.writeText(val);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 1800);
  };

  // Generate Smart Suggestions when contrast ratio is below 7.0
  const suggestions = useMemo<SuggestionPair[]>(() => {
    if (contrastRatio >= 7.0) return [];

    const result: SuggestionPair[] = [];
    const textHsl = rgbToHsl(rgbText.r, rgbText.g, rgbText.b);
    const bgHsl = rgbToHsl(rgbBg.r, rgbBg.g, rgbBg.b);

    // Technique 1: Vary Text lightness (Lighten text for dark background, Darken for light background)
    // We try to find first lighter and darker text variations that achieve AA or AAA
    let lighterText: string | null = null;
    let darkerText: string | null = null;

    // Search upwards (lighten)
    for (let l = Math.min(99, textHsl.l + 1); l <= 100; l += 1) {
      const candidateRgb = hslToRgb(textHsl.h, textHsl.s, l);
      const ratio = calculateContrast(candidateRgb, rgbBg);
      if (ratio >= 4.5 && !lighterText) {
        lighterText = rgbToHex(candidateRgb.r, candidateRgb.g, candidateRgb.b);
      }
      if (ratio >= 7.0) {
        lighterText = rgbToHex(candidateRgb.r, candidateRgb.g, candidateRgb.b);
        break; // found excellent contrast
      }
    }

    // Search downwards (darken)
    for (let l = Math.max(1, textHsl.l - 1); l >= 0; l -= 1) {
      const candidateRgb = hslToRgb(textHsl.h, textHsl.s, l);
      const ratio = calculateContrast(candidateRgb, rgbBg);
      if (ratio >= 4.5 && !darkerText) {
        darkerText = rgbToHex(candidateRgb.r, candidateRgb.g, candidateRgb.b);
      }
      if (ratio >= 7.0) {
        darkerText = rgbToHex(candidateRgb.r, candidateRgb.g, candidateRgb.b);
        break;
      }
    }

    // Technique 2: Same variation for background color (Lighter BG, Darker BG)
    let lighterBg: string | null = null;
    let darkerBg: string | null = null;

    // Search upwards (lighten BG)
    for (let l = Math.min(99, bgHsl.l + 1); l <= 100; l += 1) {
      const candidateRgb = hslToRgb(bgHsl.h, bgHsl.s, l);
      const ratio = calculateContrast(rgbText, candidateRgb);
      if (ratio >= 4.5 && !lighterBg) {
        lighterBg = rgbToHex(candidateRgb.r, candidateRgb.g, candidateRgb.b);
      }
      if (ratio >= 7.0) {
        lighterBg = rgbToHex(candidateRgb.r, candidateRgb.g, candidateRgb.b);
        break;
      }
    }

    // Search downwards (darken BG)
    for (let l = Math.max(1, bgHsl.l - 1); l >= 0; l -= 1) {
      const candidateRgb = hslToRgb(bgHsl.h, bgHsl.s, l);
      const ratio = calculateContrast(rgbText, candidateRgb);
      if (ratio >= 4.5 && !darkerBg) {
        darkerBg = rgbToHex(candidateRgb.r, candidateRgb.g, candidateRgb.b);
      }
      if (ratio >= 7.0) {
        darkerBg = rgbToHex(candidateRgb.r, candidateRgb.g, candidateRgb.b);
        break;
      }
    }

    // Populate valid and visually distinct proposal paths
    if (lighterText && lighterText !== textColor) {
      const newRgb = parseColor(lighterText)!;
      const ratio = calculateContrast(newRgb, rgbBg);
      result.push({
        type: 'lighten',
        textColor: lighterText,
        bgColor: bgColor,
        ratio,
        passesAA: ratio >= 4.5,
        passesAAA: ratio >= 7.0
      });
    }

    if (darkerText && darkerText !== textColor) {
      const newRgb = parseColor(darkerText)!;
      const ratio = calculateContrast(newRgb, rgbBg);
      result.push({
        type: 'darken',
        textColor: darkerText,
        bgColor: bgColor,
        ratio,
        passesAA: ratio >= 4.5,
        passesAAA: ratio >= 7.0
      });
    }

    if (lighterBg && lighterBg !== bgColor) {
      const newRgb = parseColor(lighterBg)!;
      const ratio = calculateContrast(rgbText, newRgb);
      result.push({
        type: 'bg_lighten',
        textColor: textColor,
        bgColor: lighterBg,
        ratio,
        passesAA: ratio >= 4.5,
        passesAAA: ratio >= 7.0
      });
    }

    if (darkerBg && darkerBg !== bgColor) {
      const newRgb = parseColor(darkerBg)!;
      const ratio = calculateContrast(rgbText, newRgb);
      result.push({
        type: 'bg_darken',
        textColor: textColor,
        bgColor: darkerBg,
        ratio,
        passesAA: ratio >= 4.5,
        passesAAA: ratio >= 7.0
      });
    }

    return result.slice(0, 3); // return at most 3 distinct proposals
  }, [contrastRatio, textColor, bgColor, rgbText, rgbBg]);

  // Color contrast category visual states
  let contrastColorClass = 'text-red-400';
  let contrastBgClass = 'bg-red-500/10 border-red-500/30';
  let contrastBadgeText = isAr ? 'ضعيف جداً ❌' : 'Very Poor ❌';

  if (contrastRatio >= 7.0) {
    contrastColorClass = 'text-emerald-400';
    contrastBgClass = 'bg-emerald-500/10 border-emerald-500/30';
    contrastBadgeText = isAr ? 'ممتاز وطبيعي (AAA) 🌟' : 'Outstanding (AAA) 🌟';
  } else if (contrastRatio >= 4.5) {
    contrastColorClass = 'text-cyan-400';
    contrastBgClass = 'bg-cyan-500/10 border-cyan-500/30';
    contrastBadgeText = isAr ? 'جيد جداً وسهل القراءة (AA) ✅' : 'Very Good (AA) ✅';
  } else if (contrastRatio >= 3.0) {
    contrastColorClass = 'text-amber-400';
    contrastBgClass = 'bg-amber-500/10 border-amber-500/30';
    contrastBadgeText = isAr ? 'مقبول للنصوص الكبيرة فقط (AA) ⚠️' : 'Acceptable for Large only ⚠️';
  }

  return (
    <div className="w-full h-full flex flex-col gap-6 animate-in fade-in duration-500">
      
      {/* breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-slate-400 self-start">
        <Link to="/" className="hover:text-white transition-colors">
          {isAr ? 'الرئيسية' : 'Home'}
        </Link>
        {isAr ? <ChevronLeft size={12} /> : <ChevronRight size={12} />}
        <Link to="/category/developers" className="hover:text-white transition-colors">
          {isAr ? 'أدوات المطورين والـ SEO' : 'Developers & SEO'}
        </Link>
        {isAr ? <ChevronLeft size={12} /> : <ChevronRight size={12} />}
        <span className="text-cyan-400 font-bold">{isAr ? 'فاحص تباين الألوان' : 'Color Contrast Checker'}</span>
      </div>

      {/* Header Info Banner */}
      <div className="relative p-6 sm:p-8 rounded-3xl border border-white/10 bg-gradient-to-tr from-[#0b0c2a]/95 to-[#1a123a]/90 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white shrink-0 shadow-[0_4px_20px_rgba(34,211,238,0.35)]">
              <Palette size={28} className="animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                {isAr ? 'فاحص ومحلل تباين الألوان المحترف' : 'Pro Color Contrast Checker'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
                {isAr 
                  ? 'أداة تضمن مواءمة وسهولة قراءة واجهة الويب الخاصة بك. قم بوضع الألوان، وتأكد من ملائمتها لمتطلبات WCAG 2.1 العالمية، والحصول على اقتراحات تعديل فورية في المعاينة الحية.'
                  : 'Ensure the readability of digital materials instantly. Input colors, audit compatibility with international WCAG rules, and apply calculated high-contrast alternative variations.'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs font-bold leading-none self-start md:self-auto shrink-0 animate-pulse">
            <Award size={14} />
            <span>{isAr ? 'متوافق بالكامل مع WCAG 2.1' : 'Fully Compliant WCAG 2.1'}</span>
          </div>
        </div>
      </div>

      {/* Main Workspace Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* LEFT COLUMN: Input Control Tower (40% Column Width equivalent) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          
          <div className="p-6 rounded-3xl border border-[#1b2554] bg-[#0b0f2a]/90 backdrop-blur-xl flex flex-col gap-5 shadow-[0_10px_35px_rgba(0,0,0,0.4)]">
            
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h3 className="text-xs font-bold tracking-wider uppercase text-slate-400 font-mono mt-1">
                {isAr ? 'لوحة التحكم والخلط' : 'Color Control Palette'}
              </h3>
              <button 
                onClick={handleSwap}
                title={isAr ? 'عكس الألوان' : 'Swap properties'}
                className="p-1 px-2.5 bg-cyan-950/40 border border-[#212b77] rounded-lg text-[11px] font-bold text-cyan-400 hover:bg-[#151c54] hover:text-cyan-300 transition-all active:scale-95 flex items-center gap-1"
              >
                <RefreshCw size={12} className="shrink-0" />
                <span>{isAr ? 'عكس الألوان' : 'Swap'}</span>
              </button>
            </div>

            {/* Input fields */}
            <div className="flex flex-col gap-4">
              
              {/* Text/Foreground color */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                  <span>{isAr ? 'لون النص والخطوط (Foreground)' : 'Text / Foreground Color'}</span>
                  <span className="text-[10px] text-slate-500 font-mono">HEX / RGB</span>
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative w-12 h-12 rounded-xl border border-white/10 overflow-hidden shrink-0 cursor-pointer hover:scale-105 transition-transform">
                    <input 
                      type="color"
                      value={textColor.startsWith('#') && textColor.length === 7 ? textColor : '#ffffff'}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="absolute inset-0 w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4 cursor-pointer"
                    />
                  </div>
                  <div className="relative flex-grow">
                    <input 
                      type="text"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      placeholder="#2bf1ff"
                      className="w-full bg-[#030617] border border-[#212b77] focus:border-[#3b4ecc] text-slate-200 text-sm font-mono rounded-xl py-3 px-4 focus:outline-none"
                    />
                    <button 
                      onClick={() => handleCopyValue(textColor, 'text')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                      title={isAr ? 'نسخ رمز اللون' : 'Copy HEX'}
                    >
                      {copiedType === 'text' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Background color */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                  <span>{isAr ? 'لون الخلفية (Background)' : 'Background Color'}</span>
                  <span className="text-[10px] text-slate-500 font-mono">HEX / RGB</span>
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative w-12 h-12 rounded-xl border border-white/10 overflow-hidden shrink-0 cursor-pointer hover:scale-105 transition-transform">
                    <input 
                      type="color"
                      value={bgColor.startsWith('#') && bgColor.length === 7 ? bgColor : '#000000'}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="absolute inset-0 w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4 cursor-pointer"
                    />
                  </div>
                  <div className="relative flex-grow">
                    <input 
                      type="text"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      placeholder="#030825"
                      className="w-full bg-[#030617] border border-[#212b77] focus:border-[#3b4ecc] text-slate-200 text-sm font-mono rounded-xl py-3 px-4 focus:outline-none"
                    />
                    <button 
                      onClick={() => handleCopyValue(bgColor, 'bg')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                      title={isAr ? 'نسخ رمز اللون' : 'Copy HEX'}
                    >
                      {copiedType === 'bg' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Quick Presets / Accessable Palettes templates */}
            <div className="flex flex-col gap-2 mt-2">
              <label className="text-xs font-bold text-slate-400">
                {isAr ? 'قوالب تباين وتدرجات ملائمة مقترحة:' : 'Popular Harmonious Key Presets:'}
              </label>
              <div className="grid grid-cols-2 gap-2 max-h-[180px] overflow-y-auto pr-1">
                {PRESETS.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setTextColor(p.text);
                      setBgColor(p.bg);
                    }}
                    className="flex flex-col bg-[#030617] hover:bg-[#13173d] border border-[#1b2554] p-2 rounded-xl text-left transition-all text-xs group hover:scale-[1.02] active:scale-95"
                  >
                    <span className="font-extrabold text-[10px] text-slate-300 truncate mb-1 bg-white/5 px-1.5 py-0.5 rounded mr-auto rtl:ml-auto rtl:mr-0">
                      {isAr ? p.nameAr : p.nameEn}
                    </span>
                    <div className="flex items-center gap-1.5 w-full mt-1">
                      <div className="w-3.5 h-3.5 rounded-full border border-white/10" style={{ backgroundColor: p.text }} title={`${isAr ? 'نص' : 'Text'}: ${p.text}`} />
                      <div className="w-3.5 h-3.5 rounded-full border border-white/10" style={{ backgroundColor: p.bg }} title={`${isAr ? 'خلفية' : 'BG'}: ${p.bg}`} />
                      <span className="text-[10px] font-mono text-slate-400 group-hover:text-cyan-400 transition-colors ml-auto">
                        {p.text}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Educational Quick Box */}
          <div className="p-5 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md flex gap-3 text-xs leading-relaxed text-slate-400">
            <Info className="text-cyan-400 shrink-0 mt-0.5" size={16} />
            <div className="flex flex-col gap-1.5">
              <span className="font-bold text-slate-200">{isAr ? 'معايير WCAG للتباين' : 'WCAG Standards Contrast Rule'}</span>
              <p>
                {isAr 
                  ? 'يعتمد معيار WCAG 2.1 بشكل رئيسي على نسب التباين الرياضية لضمان وصولية ذوي الإعاقة ونقص الإبصار: النسبة الأدنى المطلوبة للنصوص العادية هي 4.5:1 (المستوى AA) وللنصوص الكبيرة هي 3.0:1. للحصول على تباين مثالي ومستوى AAA يفضل استخدام نسبة 7.0:1 فما فوق.'
                  : 'WCAG 2.1 compliance details mathematical minimum ratios: 4.5:1 is required for normal text (Level AA) and 3:1 for large text. For the strict triple-A (AAA) access parameters, normal text requires at least 7.0:1 contrast ratio.'}
              </p>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Results Dashboard, Pass/Fail Cards & Suggestions (70% Column Width equivalent) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Main Contrast Display & Status */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
            
            {/* The Huge Ratio Dial Plate */}
            <div className={`md:col-span-5 rounded-3xl border flex flex-col items-center justify-center p-6 text-center ${contrastBgClass} transition-all duration-300 shadow-md`}>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                {isAr ? 'نسبة التباين المحسوبة' : 'CONTRAST RATIO'}
              </span>
              <div className={`text-4xl sm:text-5xl font-extrabold font-mono tracking-tight my-2.5 ${contrastColorClass} drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]`}>
                {contrastRatio}:1
              </div>
              <div className="px-3.5 py-1.5 bg-slate-900/60 rounded-full border border-white/10 text-[11px] font-bold text-slate-200">
                {contrastBadgeText}
              </div>
            </div>

            {/* Passes AA / AAA Checklist Grids */}
            <div className="md:col-span-7 p-5 rounded-3xl border border-white/5 bg-[#070a24]/90 flex flex-col justify-between gap-4">
              
              <div className="flex items-center gap-2 border-b border-white/5 pb-2.5">
                <LayoutGrid size={13} className="text-purple-400" />
                <span className="text-xs font-bold text-slate-300">{isAr ? 'جدول تقييم معايير المقروئية' : 'WCAG Evaluation Standings'}</span>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                
                {/* Normal Text Box */}
                <div className="p-3.5 rounded-2xl bg-[#030617] border border-[#1b2554] flex flex-col gap-2.5 text-xs">
                  <span className="font-extrabold text-slate-300 block border-b border-white/5 pb-1">
                    {isAr ? 'نص عادي (<18pt)' : 'Normal Text (<18pt)'}
                  </span>
                  
                  {/* Normal AA */}
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-slate-400">Level AA (4.5:1)</span>
                    <div className="flex items-center gap-1 font-bold shrink-0">
                      {isNormalAAPass ? (
                        <div className="text-emerald-400 flex items-center gap-1.5 bg-emerald-500/10 px-2 py-0.5 rounded text-[10px]">
                          <CheckCircle size={10} />
                          <span>Pass</span>
                        </div>
                      ) : (
                        <div className="text-red-400 flex items-center gap-1.5 bg-red-400/10 px-2 py-0.5 rounded text-[10px]">
                          <XCircle size={10} />
                          <span>Fail</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Normal AAA */}
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-slate-400">Level AAA (7.0:1)</span>
                    <div className="flex items-center gap-1 font-bold shrink-0">
                      {isNormalAAAPass ? (
                        <div className="text-emerald-400 flex items-center gap-1.5 bg-emerald-500/10 px-2 py-0.5 rounded text-[10px]">
                          <CheckCircle size={10} />
                          <span>Pass</span>
                        </div>
                      ) : (
                        <div className="text-red-400 flex items-center gap-1.5 bg-red-400/10 px-2 py-0.5 rounded text-[10px]">
                          <XCircle size={10} />
                          <span>Fail</span>
                        </div>
                      )}
                    </div>
                  </div>

                </div>

                {/* Large Text Box */}
                <div className="p-3.5 rounded-2xl bg-[#030617] border border-[#1b2554] flex flex-col gap-2.5 text-xs">
                  <span className="font-extrabold text-slate-300 block border-b border-white/5 pb-1">
                    {isAr ? 'نص كبير (>=18pt)' : 'Large Text (>=18pt)'}
                  </span>

                  {/* Large AA */}
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-slate-400">Level AA (3.0:1)</span>
                    <div className="flex items-center gap-1 font-bold shrink-0">
                      {isLargeAAPass ? (
                        <div className="text-emerald-400 flex items-center gap-1.5 bg-emerald-500/10 px-2 py-0.5 rounded text-[10px]">
                          <CheckCircle size={10} />
                          <span>Pass</span>
                        </div>
                      ) : (
                        <div className="text-red-400 flex items-center gap-1.5 bg-red-400/10 px-2 py-0.5 rounded text-[10px]">
                          <XCircle size={10} />
                          <span>Fail</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Large AAA */}
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-slate-400">Level AAA (4.5:1)</span>
                    <div className="flex items-center gap-1 font-bold shrink-0">
                      {isLargeAAAPass ? (
                        <div className="text-emerald-400 flex items-center gap-1.5 bg-emerald-500/10 px-2 py-0.5 rounded text-[10px]">
                          <CheckCircle size={10} />
                          <span>Pass</span>
                        </div>
                      ) : (
                        <div className="text-red-400 flex items-center gap-1.5 bg-red-400/10 px-2 py-0.5 rounded text-[10px]">
                          <XCircle size={10} />
                          <span>Fail</span>
                        </div>
                      )}
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Interactive Live Component Preview Sandbox */}
          <div className="p-6 rounded-3xl border border-[#1b2554] bg-[#0b0f2a]/95 flex flex-col gap-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <Eye size={14} className="text-cyan-400" />
                <span className="text-xs font-bold text-slate-300">{isAr ? 'البث الحي والمعاينة التفاعلية للتصاميم' : 'Live Interactive Component & Sample Preview'}</span>
              </div>
              
              {/* Custom Input preview typed text */}
              <input 
                type="text"
                value={sampleText}
                onChange={(e) => setSampleText(e.target.value)}
                maxLength={100}
                placeholder={isAr ? 'اكتب نصك الخاص للمعاينة هنا...' : 'Type custom text for live diagnostics...'}
                className="bg-[#030617] border border-[#212b77] focus:border-[#3b4ecc] text-slate-200 text-xs rounded-xl py-2 px-3 focus:outline-none w-full sm:w-64 max-w-full font-sans"
              />
            </div>

            {/* Live Canvas Box using current inline styling */}
            <div 
              className="p-6 rounded-2xl border border-white/10 transition-colors duration-300 shadow-inner flex flex-col gap-6" 
              style={{ backgroundColor: bgColor }}
            >
              {/* Sandbox 1: Text Typography Render */}
              <div className="flex flex-col gap-2">
                {/* Large Display Text */}
                <h4 
                  className="font-black tracking-tight leading-snug break-words" 
                  style={{ color: textColor, fontSize: '24px' }}
                >
                  {sampleText} [24px Large Text]
                </h4>
                {/* Normal Body Text */}
                <p 
                  className="leading-relaxed break-words" 
                  style={{ color: textColor, fontSize: '14px' }}
                >
                  {sampleText} [14px Normal Body Text] - {isAr ? 'هذا النص يحاكي فقرات ومحتوى صفحات المواقع لتقييم صعوبة ومقدار التعب الذي يصيب العينين أثناء مهارات البحث السريعة.' : 'This tests readability blocks at standard sizes so you can estimate user eye fatigue indicators during navigation sessions.'}
                </p>
              </div>

              {/* Sandbox 2: UI Buttons & components preview with actual applied styles */}
              <div className="flex flex-wrap gap-4 items-center p-4 rounded-xl border border-dashed border-white/10">
                
                {/* Simulated Core Call To Action Button with Applied parameters */}
                <button 
                  className="px-5 py-2.5 font-bold rounded-xl text-sm shadow hover:scale-105 transition-transform"
                  style={{ backgroundColor: textColor, color: bgColor }}
                >
                  {isAr ? 'زر الدعوة للإجراء (CTA)' : 'Call to Action Button'}
                </button>

                {/* Simulated Inverse Badge outline representation */}
                <div 
                  className="px-3 py-1 text-xs font-bold rounded-full border border-current"
                  style={{ color: textColor }}
                >
                  {isAr ? 'علامة تصنيف مخصصة' : 'Preview Category Badge'}
                </div>

                {/* Sample links */}
                <span 
                  className="text-xs font-bold underline cursor-pointer"
                  style={{ color: textColor }}
                >
                  {isAr ? 'رابط نشط فوري' : 'Interactive Hyperlink'}
                </span>

              </div>

            </div>

          </div>

          {/* SMART ACCESSIBILITY RECOMMENDATIONS: (Saved Alternatives / Fixes) */}
          {suggestions.length > 0 && (
            <div className="p-5 rounded-3xl border border-purple-500/20 bg-purple-500/5 backdrop-blur-md flex flex-col gap-3">
              <div className="flex items-center gap-2.5 border-b border-purple-500/10 pb-2">
                <Sparkles size={16} className="text-purple-400 animate-pulse" />
                <h4 className="text-xs font-black text-slate-200">
                  {isAr ? 'اقترحات ذكية لإنقاذ مستويات التباين الضعيفة:' : 'Calculated Color Rescue Alternatives (Guarantees Pass):'}
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {suggestions.map((sug, index) => (
                  <div 
                    key={index}
                    className="p-3 bg-slate-950/80 border border-[#1b2554] rounded-2xl flex flex-col justify-between gap-3 text-xs"
                  >
                    <div className="flex flex-col gap-1.5">
                      <span className="font-mono text-[#a78bfa] font-bold text-[10px] uppercase">
                        {sug.type === 'lighten' && (isAr ? 'تفتيح لون الخط 🔤' : 'Lighten Text 🔤')}
                        {sug.type === 'darken' && (isAr ? 'تغميق لون الخط 🔤' : 'Darken Text 🔤')}
                        {sug.type === 'bg_lighten' && (isAr ? 'تفتيح الخلفية 🖼️' : 'Lighten Background 🖼️')}
                        {sug.type === 'bg_darken' && (isAr ? 'تغميق الخلفية 🖼️' : 'Darken Background 🖼️')}
                      </span>
                      <div className="flex items-center gap-1.5 font-mono text-slate-300">
                        <span>{isAr ? 'نسبة:' : 'Contrast:'}</span>
                        <span className="font-extrabold text-cyan-400">{sug.ratio}:1</span>
                      </div>
                      <div className="flex gap-1.5 items-center mt-0.5">
                        <div className="w-4 h-4 rounded-full border border-white/10" style={{ backgroundColor: sug.textColor }} title="Text color" />
                        <div className="w-4 h-4 rounded-full border border-white/10" style={{ backgroundColor: sug.bgColor }} title="Bg color" />
                        <span className="text-[10px] text-slate-400 truncate font-mono">
                          {sug.textColor} / {sug.bgColor}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setTextColor(sug.textColor);
                        setBgColor(sug.bgColor);
                      }}
                      className="w-full py-1.5 bg-purple-950/40 hover:bg-[#2b1c4c] border border-purple-500/20 text-purple-300 rounded-lg text-[10px] font-bold transition-all hover:scale-[1.02] active:scale-95 text-center block"
                    >
                      {isAr ? 'تطبيق المقترح الفوري' : 'Apply Variation'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Structured Detailed Educational Guide */}
      <div className="p-6 rounded-3xl border border-white/5 bg-[#05071d]/95 flex flex-col gap-4 mt-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2">
          <Info size={16} className="text-cyan-400" />
          <span>{isAr ? 'دليل المصممين والمطورين لتباين الألوان وسهولة القراءة' : 'Designers & Developers Accessability Contrast Manual'}</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed text-slate-400">
          
          <div className="flex flex-col gap-2.5">
            <h4 className="font-bold text-slate-200">{isAr ? 'ما هو تباين الألوان (Color Contrast)؟' : 'What is Color Contrast?'}</h4>
            <p>
              {isAr 
                ? 'تباين الألوان هو الفرق في مستوى اللمعان والإشعاع والسطوع بين لون النص (Foreground) ولون الخلفية (Background) التي يوضع فوقها. يُحسب هذا رياضياً كنسبة تبدأ من 1:1 (لا يوجد تباين على الإطلاق، مثل كتابة نص أبيض على خلفية بيضاء) وتصل كحد أقصى إلى 21:1 (أقصى تباين ممكن مثل كتابة نص أسود داكن على خلفية بيضاء ناصعة).'
                : 'Color contrast is the difference in light luminance between any text or visual elements in the foreground and the immediate background behind it. Values range from 1:1 (zero contrast, e.g., white ink on white paper) up to 21:1 (maximum available visual safety, e.g., solid carbon black on pure glowing white).'}
            </p>
            <h4 className="font-bold text-slate-200 mt-2">{isAr ? 'لماذا يعد تباين الألوان هاماً للغاية للسيو (SEO)؟' : 'Why Contrast is Crucial for SEO & UX'}</h4>
            <p>
              {isAr 
                ? 'محرّكات البحث الكبرى مثل جوجل تدرج تجربة زائر الصفحة (Page Experience) وجاهزيتها لذوي الاحتياجات وبما يسمى سهولة الاستخدام وأدوات المعاينة (Mobile Usability / Accessibility) ضمن شروط تصنيف ورفع ترتيب المواقع في محرك البحث. المواقع التي تحوي نصوصاً ذات تباين ضعيف تتبوأ مراتب متدنية في غوغل لأنها تفشل في اختبارات الوصولية العامة.'
                : 'Search engines, especially Google Lighthouse, audit accessibility scores heavily. Websites with low color contrast ratios receive lower overall scores, leading to decreased performance rankings on SERP indexes because accessibility is a direct signal of layout quality.'}
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            <h4 className="font-bold text-slate-200">{isAr ? 'مستويات الامتثال للجنة معايير الويب الـ WCAG 2.1' : 'Understanding standard compliance levels (AA / AAA)'}</h4>
            <ul className="list-disc pl-4 rtl:pr-4 space-y-2">
              <li>
                <strong>Level AA (العادي والأساسي):</strong> 
                {isAr 
                  ? ' يتطلب نسبة تباين لا تقل عن 4.5:1 للنصوص والفقرات العادية، وهو الحد الأدنى المقبول لمعظم المستخدمين والشركات للوصول العام.'
                  : ' Requires a contrast ratio of at least 4.5:1 for normal-sized text. This is the global benchmark standard for all web entities.'}
              </li>
              <li>
                <strong>Level AAA (الصارم والمثالي):</strong> 
                {isAr 
                  ? ' يتطلب نسبة تباين 7.0:1 للمقروئية القصوى للفئات العمرية الكبيرة وذوي عمى الألوان الشديد ونقص الإبصار الفسيولوجي.'
                  : ' Demands 7.0:1 contrast ratios. This targets pristine readability settings recommended for public entities, senior citizens, and intense light conditions.'}
              </li>
              <li>
                <strong>{isAr ? 'النصوص الكبيرة (Large Text):' : 'Exception for Large Fonts:'}</strong> 
                {isAr 
                  ? ' يسمح بنسب تباين مرنة لأن الأحجام الكبيرة أسهل في القراءة: تطلب 3.0:1 للمستوى AA ونسبة 4.5:1 للمستوى الـ AAA.'
                  : ' Larger typography provides easier glyph differentiation. Thus, large fonts require only 3.0:1 for Level AA and 4.5:1 for strict Level AAA.'}
              </li>
            </ul>
          </div>

        </div>
      </div>

    </div>
  );
}
