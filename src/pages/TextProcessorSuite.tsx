import React, { useState, useMemo, useEffect } from 'react';
import { 
  FileText, 
  Trash2, 
  ArrowUpDown, 
  Copy, 
  Check, 
  RefreshCw, 
  Sparkles, 
  Play, 
  Sliders, 
  Share2, 
  Layers, 
  HelpCircle, 
  CaseSensitive, 
  CornerDownLeft, 
  Info,
  ChevronRight,
  Database,
  Shuffle
} from 'lucide-react';
import ShareButtons from '../components/ShareButtons';

// --- SAMPLE DATA PRESETS FOR INSTANT DEMOS ---
const SAMPLES = {
  diff: {
    original: `// original user profile settings
{
  "id": "usr_94a081bc",
  "username": "gamer3000",
  "email": "contact@tools_hub.live",
  "verified": false,
  "theme": "dark",
  "roles": [
    "member",
    "beta-tester"
  ],
  "reflexHistory": [140, 155, 148]
}`,
    modified: `// updated user profile settings
{
  "id": "usr_94a081bc",
  "username": "gamer3000_pro",
  "email": "contact@tools_hub.live",
  "verified": true,
  "theme": "nebula-glow",
  "roles": [
    "member",
    "moderator",
    "esports-partner"
  ],
  "reflexHistory": [135, 142, 140]
}`
  },
  duplicates: `apple
banana
orange
apple
banana
watermelon
Orange
apple
grape
banana`,
  sort: `Zechariah
Benjamin
Alexander
Sophia
Oliver
Emma
Liam
Noah`
};

// --- DIFF ENGINE ---
// Interface representing a single matched or mismatched line
interface DiffResult {
  type: 'added' | 'removed' | 'unchanged';
  text: string;
  lineA?: number;
  lineB?: number;
}

/**
 * Robust Longest Common Subsequence line-by-line diff.
 * Optimized with size gating to avoid lagging on huge inputs.
 */
function computeLineDiff(originalText: string, modifiedText: string): { 
  diffs: DiffResult[]; 
  stats: { added: number; removed: number; unchanged: number; similarity: number } 
} {
  const linesA = originalText.split(/\r?\n/);
  const linesB = modifiedText.split(/\r?\n/);
  
  const n = linesA.length;
  const m = linesB.length;
  
  // High volume fallback: simple comparison if dynamic programming matrix gets too huge (> 500,000 cells)
  if (n * m > 500000) {
    const diffs: DiffResult[] = [];
    let added = 0;
    let removed = 0;
    let unchanged = 0;
    
    // Simple line-by-line mismatch indicator as safe fallback
    const maxLen = Math.max(n, m);
    for (let i = 0; i < maxLen; i++) {
      if (i < n && i < m) {
        if (linesA[i] === linesB[i]) {
          diffs.push({ type: 'unchanged', text: linesA[i], lineA: i + 1, lineB: i + 1 });
          unchanged++;
        } else {
          diffs.push({ type: 'removed', text: linesA[i], lineA: i + 1 });
          diffs.push({ type: 'added', text: linesB[i], lineB: i + 1 });
          removed++;
          added++;
        }
      } else if (i < n) {
        diffs.push({ type: 'removed', text: linesA[i], lineA: i + 1 });
        removed++;
      } else {
        diffs.push({ type: 'added', text: linesB[i], lineB: i + 1 });
        added++;
      }
    }
    
    const similarity = Math.round((unchanged / Math.max(1, maxLen)) * 100);
    return { diffs, stats: { added, removed, unchanged, similarity } };
  }

  // standard LCS DP implementation
  const memo: number[][] = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
  
  // Fill DP Table
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (linesA[i - 1] === linesB[j - 1]) {
        memo[i][j] = memo[i - 1][j - 1] + 1;
      } else {
        memo[i][j] = Math.max(memo[i - 1][j], memo[i][j - 1]);
      }
    }
  }
  
  // Reconstruct Diff via backtracking
  const diffs: DiffResult[] = [];
  let i = n;
  let j = m;
  let addedCount = 0;
  let removedCount = 0;
  let unchangedCount = 0;
  
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && linesA[i - 1] === linesB[j - 1]) {
      diffs.push({
        type: 'unchanged',
        text: linesA[i - 1],
        lineA: i,
        lineB: j
      });
      unchangedCount++;
      i--;
      j--;
    } else if (j > 0 && (i === 0 || memo[i][j - 1] >= memo[i - 1][j])) {
      diffs.push({
        type: 'added',
        text: linesB[j - 1],
        lineB: j
      });
      addedCount++;
      j--;
    } else if (i > 0 && (j === 0 || memo[i][j - 1] < memo[i - 1][j])) {
      diffs.push({
        type: 'removed',
        text: linesA[i - 1],
        lineA: i
      });
      removedCount++;
      i--;
    }
  }
  
  // Backtracking gave them to us reversed
  diffs.reverse();
  
  // Compute percentage similarity
  const totalSteps = Math.max(1, n, m);
  const similarity = Math.min(100, Math.round((unchangedCount / totalSteps) * 100));

  return {
    diffs,
    stats: {
      added: addedCount,
      removed: removedCount,
      unchanged: unchangedCount,
      similarity
    }
  };
}

const translations = {
  ar: {
    title: "مقارن النصوص الذكي وأدوات تهيئة السطور ✍️",
    subtitle: "قارن بين النصوص واكتشف الفروق جنباً إلى جنب، احذف العناصر المكررة، ورتّب أسطر القوائم بكل سهولة محلياً وبأمان تام.",
    diffTab: "⚡ مقارنة الفروقات (Text Diff)",
    duplicatesTab: "🗑️ حذف الأسطر المكررة",
    sortTab: "🔢 فرز وترتيب القوائم",
    
    // Diff view
    originalLabel: "النص الأصلي (Original)",
    modifiedLabel: "النص الجديد / المعدل (Modified)",
    diffPlaceholder1: "أدخل أو الصق النص الأصلي هنا للمقارنة...",
    diffPlaceholder2: "أدخل أو الصق النص المعدل أو المحدّث هنا...",
    sideBySide: "عرض جانباً إلى جنب (Side-by-side)",
    inlineView: "عرض مدمج متداخل (Inline)",
    additions: "إضافات",
    deletions: "حذوفات",
    unchanged: "مطابق",
    identicalAlert: "تهانينا! النصان متطابقان بنسبة 100% ولا توجد أي فروقات متباينة.",
    loadSampleBtn: "تحميل نموذج تجربة",
    clearBtn: "مسح الحقول",
    copiedBtn: "نسخ",
    copiedFeedback: "تم النسخ! 🎉",
    
    // Diff Stats
    statsHeader: "إحصائيات مقارنة الملفات",
    totalLinesA: "أسطر النص القديم:",
    totalLinesB: "أسطر النص الجديد:",
    addedMetric: "أسطر مضافة (+):",
    removedMetric: "أسطر محذوفة (-):",
    similarityScore: "نسبة التشابه الكلي:",

    // Duplicates tool
    dupsInputLabel: "أدخل أو الصق الكلمات أو الأسطر المراد تصفيتها:",
    dupsPlaceholder: "اكتب الأسطر هنا (مثلاً: قائمة أسماء، بريد إلكتروني، عناوين IP، أكواد، إلخ)...",
    caseSensitiveOpt: "تحسس حالة الأحرف الانجليزية (A != a)",
    trimOpt: "تجاهل المسافات الفارغة الزائدة في الأطراف",
    removeEmptyOpt: "تجاهل وحذف جميع الأسطر الفارغة",
    processDupsBtn: "حذف السطور المكررة والتصفية",
    dupsStatsHeader: "إحصائيات التنظيف",
    origCount: "إجمالي السطور الأصلي:",
    dupLinesRemoved: "السطور المكررة المحذوفة:",
    finalLinesLeft: "السطور الفريدة المتبقية:",
    copyFilteredBtn: "نسخ قائمة النصوص الناتجة",

    // Sort tool
    sortInputLabel: "أدخل الأسطر المراد إعادة ترتيبها وفرزها:",
    sortPlaceholder: "أدخل أسطر القائمة هنا ليتم فرزها...",
    sortTypeLabel: "أختر أسلوب الترتيب والفرز:",
    sortAsc: "أبجدياً: تصاعدي (أ - ي / A - Z)",
    sortDesc: "أبجدياً: تنازلي (ي - أ / Z - A)",
    sortNumAsc: "عددياً: من الأصغر للأكبر (0 - 9)",
    sortNumDesc: "عددياً: من الأكبر للأصغر (9 - 0)",
    sortLenAsc: "حسب طول السطر: الأقصر أولاً",
    sortLenDesc: "حسب طول السطر: الأطول أولاً",
    sortReverseList: "عكس ترتيب الأسطر الحالي",
    sortShuffleList: "ترتيب عشوائي (خربشة الأسطر / Shuffle)",
    ignoreCaseSort: "تجاهل حالة الأحرف أثناء الفرز والتصنيف",
    processSortBtn: "فرز وترتيب القائمة الآن",
    sortStatsHeader: "نظام الفرز المعتمد",
    copySortedBtn: "نسخ القائمة المرتبة",

    // General Information
    shareLabel: "شارك أداة معالجة النصوص الذكية ✨",
    aboutTitle: "معالجة فائقة السرعة على متصفحك مباشرة 🛡️",
    aboutText: "تجري جميع عمليات تتبع الفروق وحذف التكرار والفرز للبيانات محلياً 100% وبسرية مطلقة داخل متصفحك دون إرسالها إلى أي خواديم خارجية، مما يضمن خصوصية تامة وغير محدودة لكلمات المرور، ملفات الإعدادات، أو المحتويات السرية الخاصة بك.",
    instructionFooter: "هل ترغب في مشاركة هذه الأداة الرائعة والمفيدة؟ استخدام الرابط المباشر للمشاركة أدناه."
  },
  en: {
    title: "Pro Text Diff & Line Formatting Suite ✍️",
    subtitle: "Compare text to detect visual differences, eliminate duplicate entries, and sort text lines instantly with local browser security.",
    diffTab: "⚡ Text Diff Checker",
    duplicatesTab: "🗑️ Remove Duplicate Lines",
    sortTab: "🔢 Sort Lines Alphabetically",
    
    // Diff view
    originalLabel: "Original Text (Before)",
    modifiedLabel: "Modified Text (After)",
    diffPlaceholder1: "Insert original text configuration file here...",
    diffPlaceholder2: "Insert modified or newly updated text file here...",
    sideBySide: "Side-by-Side Panel View",
    inlineView: "Inline Merged Display",
    additions: "Additions",
    deletions: "Deletions",
    unchanged: "Unchanged",
    identicalAlert: "Hooray! The text segments are 100% identical. No variances discovered.",
    loadSampleBtn: "Load Demo Sample",
    clearBtn: "Clear Inputs",
    copiedBtn: "Copy",
    copiedFeedback: "Copied! 🎉",
    
    // Diff Stats
    statsHeader: "Comparison Metrics",
    totalLinesA: "Original Line Count:",
    totalLinesB: "Changed Line Count:",
    addedMetric: "Inserted Lines (+):",
    removedMetric: "Deleted Lines (-):",
    similarityScore: "Total Structural Similarity:",

    // Duplicates tool
    dupsInputLabel: "Enter or paste your catalog list (line by line):",
    dupsPlaceholder: "Enter list items here (e.g. emails, usernames, duplicate keys, lists)...",
    caseSensitiveOpt: "English Case-Sensitive Comparison (A vs a)",
    trimOpt: "Trim whitespace padding on both ends of lines",
    removeEmptyOpt: "Discard entirely blank/empty lines",
    processDupsBtn: "Purge Duplicated Lines",
    dupsStatsHeader: "Deduplication Breakdown",
    origCount: "Initial Line Count:",
    dupLinesRemoved: "Duplicates Destroyed:",
    finalLinesLeft: "Clean Unique Lines:",
    copyFilteredBtn: "Copy Filtered Result",

    // Sort tool
    sortInputLabel: "Enter lines of list you want to sort and format:",
    sortPlaceholder: "Raw list entries here...",
    sortTypeLabel: "Select sorting rule direction:",
    sortAsc: "Alphabetical: Ascending (A - Z)",
    sortDesc: "Alphabetical: Descending (Z - A)",
    sortNumAsc: "Numerical: Low to High (0 - 9)",
    sortNumDesc: "Numerical: High to Low (9 - 0)",
    sortLenAsc: "Line Length: Shortest to Longest",
    sortLenDesc: "Line Length: Longest to Shortest",
    sortReverseList: "Reverse list line order",
    sortShuffleList: "Randomize list (Shuffle)",
    ignoreCaseSort: "Ignore alphabetic lowercase/uppercase case",
    processSortBtn: "Sort List Lines Now",
    sortStatsHeader: "Sorting Parameters",
    copySortedBtn: "Copy Sorted List",

    // General Information
    shareLabel: "Share Intelligent Text Suite ✨",
    aboutTitle: "Secure Localized Client-Side Mechanics 🛡️",
    aboutText: "Every text analysis, formatting, or sorting calculation is calculated completely client-side in JS memory. No payload is ever delivered online. This keeps proprietary log metrics, YAML arrays, JSON settings and private lists entirely secure.",
    instructionFooter: "Want to tell fellow developers about this tool? Share using the social buttons below."
  }
};

export default function TextProcessorSuite({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const [activeTab, setActiveTab] = useState<'diff' | 'duplicates' | 'sort'>('diff');

  // --- COPIED POPUP FEEDBACK TIMERS ---
  const [copyState, setCopyState] = useState<{ [key: string]: boolean }>({});
  const triggerCopyFeedback = (key: string) => {
    setCopyState(prev => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setCopyState(prev => ({ ...prev, [key]: false }));
    }, 2000);
  };

  // ==========================================
  // --- 1. DIFF STATE & ENGINE HANDLERS ---
  // ==========================================
  const [originalText, setOriginalText] = useState<string>('');
  const [modifiedText, setModifiedText] = useState<string>('');
  const [diffViewMode, setDiffViewMode] = useState<'side' | 'inline'>('side');

  // Calculate high performance diff metrics dynamically with useMemo
  const diffData = useMemo(() => {
    if (!originalText && !modifiedText) {
      return { diffs: [], stats: { added: 0, removed: 0, unchanged: 0, similarity: 100 } };
    }
    return computeLineDiff(originalText, modifiedText);
  }, [originalText, modifiedText]);

  const loadDiffSample = () => {
    setOriginalText(SAMPLES.diff.original);
    setModifiedText(SAMPLES.diff.modified);
  };

  const copyDiffInput = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    triggerCopyFeedback(key);
  };

  const clearDiffForm = () => {
    setOriginalText('');
    setModifiedText('');
  };


  // ==========================================
  // --- 2. DUPLICATES ENGINE & ACTIONS ---
  // ==========================================
  const [dupsInput, setDupsInput] = useState<string>('');
  const [dupsOutput, setDupsOutput] = useState<string>('');
  
  // Duplication Settings
  const [dupsCaseSensitive, setDupsCaseSensitive] = useState<boolean>(false);
  const [dupsTrim, setDupsTrim] = useState<boolean>(true);
  const [dupsRemoveEmpty, setDupsRemoveEmpty] = useState<boolean>(true);
  
  // Duplication stats tracked
  const [dupsStats, setDupsStats] = useState<{ original: number; duplicates: number; final: number } | null>(null);

  const processDeduplication = () => {
    if (!dupsInput.trim()) {
      setDupsOutput('');
      setDupsStats(null);
      return;
    }

    const lines = dupsInput.split(/\r?\n/);
    const originalCount = lines.length;
    
    // Maintain map for unique identification, storing normalized keys and corresponding real entries
    const seen = new Set<string>();
    const uniqueLines: string[] = [];

    lines.forEach(line => {
      let normalized = line;
      if (dupsTrim) normalized = normalized.trim();
      if (!dupsCaseSensitive) normalized = normalized.toLowerCase();

      // If we exclude empty lines, skip if it matches
      if (dupsRemoveEmpty && !normalized) {
        return;
      }

      if (!seen.has(normalized)) {
        seen.add(normalized);
        uniqueLines.push(line);
      }
    });

    const finalResult = uniqueLines.join('\n');
    setDupsOutput(finalResult);

    // Compute difference to show statistics
    const duplicatesCount = originalCount - uniqueLines.length;
    setDupsStats({
      original: originalCount,
      duplicates: duplicatesCount >= 0 ? duplicatesCount : 0,
      final: uniqueLines.length
    });
  };

  const loadDupsSample = () => {
    setDupsInput(SAMPLES.duplicates);
  };

  const copyDupsResult = () => {
    if (!dupsOutput) return;
    navigator.clipboard.writeText(dupsOutput);
    triggerCopyFeedback('duplicates_out');
  };


  // ==========================================
  // --- 3. SORT LINES ENGINE & ACTIONS ---
  // ==========================================
  const [sortInput, setSortInput] = useState<string>('');
  const [sortOutput, setSortOutput] = useState<string>('');
  const [sortRule, setSortRule] = useState<'asc' | 'desc' | 'numAsc' | 'numDesc' | 'lenAsc' | 'lenDesc' | 'reverse' | 'shuffle'>('asc');
  const [ignoreCaseSort, setIgnoreCaseSort] = useState<boolean>(false);
  const [sortCount, setSortCount] = useState<number>(0);

  const processSorting = () => {
    if (!sortInput.trim()) {
      setSortOutput('');
      setSortCount(0);
      return;
    }

    const lines = sortInput.split(/\r?\n/);
    const lineCount = lines.length;

    // Helper comparison methods
    const compareAlphabetical = (a: string, b: string) => {
      const valA = ignoreCaseSort ? a.toLowerCase() : a;
      const valB = ignoreCaseSort ? b.toLowerCase() : b;
      return valA.localeCompare(valB, lang === 'ar' ? 'ar' : 'en');
    };

    const extractNumber = (str: string) => {
      const match = str.match(/-?\d+(\.\d+)?/);
      return match ? parseFloat(match[0]) : 0;
    };

    let resultLines = [...lines];

    switch (sortRule) {
      case 'asc':
        resultLines.sort(compareAlphabetical);
        break;
      case 'desc':
        resultLines.sort((a, b) => compareAlphabetical(b, a));
        break;
      case 'numAsc':
        resultLines.sort((a, b) => extractNumber(a) - extractNumber(b));
        break;
      case 'numDesc':
        resultLines.sort((a, b) => extractNumber(b) - extractNumber(a));
        break;
      case 'lenAsc':
        resultLines.sort((a, b) => a.length - b.length);
        break;
      case 'lenDesc':
        resultLines.sort((a, b) => b.length - a.length);
        break;
      case 'reverse':
        resultLines.reverse();
        break;
      case 'shuffle':
        // Knuth-Fisher-Yates shuffle
        for (let idx = resultLines.length - 1; idx > 0; idx--) {
          const rand = Math.floor(Math.random() * (idx + 1));
          [resultLines[idx], resultLines[rand]] = [resultLines[rand], resultLines[idx]];
        }
        break;
      default:
        break;
    }

    setSortOutput(resultLines.join('\n'));
    setSortCount(lineCount);
  };

  const loadSortSample = () => {
    setSortInput(SAMPLES.sort);
  };

  const copySortResult = () => {
    if (!sortOutput) return;
    navigator.clipboard.writeText(sortOutput);
    triggerCopyFeedback('sort_out');
  };

  // Run automatically on input change with sensible feel
  useEffect(() => {
    if (sortRule) {
      processSorting();
    }
  }, [sortInput, sortRule, ignoreCaseSort]);

  // Run on options or input change too
  useEffect(() => {
    processDeduplication();
  }, [dupsInput, dupsCaseSensitive, dupsTrim, dupsRemoveEmpty]);

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 font-sans text-slate-100">
      
      {/* HEADER SECTION WITH MODERN CARD GRADIENT */}
      <div className="relative border-b border-white/10 pb-6 rounded-3xl overflow-hidden bg-slate-950/20 p-6 md:p-8">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute -bottom-10 left-12 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="text-right md:text-right w-full md:w-auto">
            <span className="px-3 py-1 bg-gradient-to-r from-cyan-500/15 to-indigo-500/15 text-cyan-300 border border-cyan-500/25 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 inline-flex items-center gap-1.5 shadow-[0_0_12px_rgba(6,182,212,0.1)]">
              <FileText size={13} className="animate-pulse" />
              {isAr ? 'مجموعة معالجة النصوص للمطورين' : 'DEVELOPER CORE STRING SUITE'}
            </span>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {t.title}
            </h1>
            <p className="text-sm text-slate-400 mt-2 max-w-3xl leading-relaxed">
              {t.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* TOP DECORATIVE SYSTEM BAR PLACEHOLDER */}
      <div className="w-full h-20 bg-slate-900/40 rounded-xl flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm relative overflow-hidden">
        <span className="absolute top-2 left-3 text-[9px] text-slate-600 font-mono">TEXT_SUITE_TOP_LEADER</span>
        <div className="text-[10px] uppercase tracking-widest mb-1 text-slate-500">{isAr ? 'مساحة إعلانية' : 'Sponsor Platform banner'}</div>
        <p className="text-[9px] text-slate-600">AD_BANNER_728_PLACEHOLDER</p>
      </div>

      {/* CORE NAVIGATION TAB BLOCK */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <button
          onClick={() => setActiveTab('diff')}
          className={`py-4 px-5 rounded-2xl font-bold text-sm transition-all border flex flex-col items-start gap-2 text-right ${
            activeTab === 'diff'
              ? 'bg-gradient-to-b from-cyan-950/40 to-slate-950/80 text-cyan-300 border-cyan-500/40 shadow-lg shadow-cyan-950/15'
              : 'bg-slate-900/30 text-slate-400 border-white/5 hover:bg-white/5'
          }`}
        >
          <div className="flex items-center justify-between w-full">
            <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider ${activeTab === 'diff' ? 'bg-cyan-500/25 text-cyan-200' : 'bg-slate-800 text-slate-500'}`}>
              MYERS_LCS // LIVE
            </span>
            <FileText size={16} className={activeTab === 'diff' ? 'text-cyan-400' : 'text-slate-500'} />
          </div>
          <span className="text-base font-extrabold">{t.diffTab}</span>
        </button>

        <button
          onClick={() => setActiveTab('duplicates')}
          className={`py-4 px-5 rounded-2xl font-bold text-sm transition-all border flex flex-col items-start gap-2 text-right ${
            activeTab === 'duplicates'
              ? 'bg-gradient-to-b from-indigo-950/40 to-slate-950/80 text-indigo-300 border-indigo-500/40 shadow-lg shadow-indigo-950/15'
              : 'bg-slate-900/30 text-slate-400 border-white/5 hover:bg-white/5'
          }`}
        >
          <div className="flex items-center justify-between w-full">
            <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider ${activeTab === 'duplicates' ? 'bg-indigo-500/25 text-indigo-200' : 'bg-slate-800 text-slate-500'}`}>
              DEDUPLICATION // LOCAL
            </span>
            <Trash2 size={16} className={activeTab === 'duplicates' ? 'text-indigo-400' : 'text-slate-500'} />
          </div>
          <span className="text-base font-extrabold">{t.duplicatesTab}</span>
        </button>

        <button
          onClick={() => setActiveTab('sort')}
          className={`py-4 px-5 rounded-2xl font-bold text-sm transition-all border flex flex-col items-start gap-2 text-right ${
            activeTab === 'sort'
              ? 'bg-gradient-to-b from-purple-950/40 to-slate-950/80 text-purple-300 border-purple-500/40 shadow-lg shadow-purple-950/15'
              : 'bg-slate-900/30 text-slate-400 border-white/5 hover:bg-white/5'
          }`}
        >
          <div className="flex items-center justify-between w-full">
            <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider ${activeTab === 'sort' ? 'bg-purple-500/25 text-purple-200' : 'bg-slate-800 text-slate-500'}`}>
              ALPHABETICAL // DIRECT
            </span>
            <ArrowUpDown size={16} className={activeTab === 'sort' ? 'text-purple-400' : 'text-slate-500'} />
          </div>
          <span className="text-base font-extrabold">{t.sortTab}</span>
        </button>
      </div>

      {/* ACTIVE TAB WORKSPACE PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Playfield Area Grid (9 columns on xl screens) */}
        <div className="lg:col-span-9 flex flex-col gap-6">

          {/* TAB 1: TEXT DIFF WORKFLOW */}
          {activeTab === 'diff' && (
            <div className="flex flex-col gap-6">
              
              {/* Diff inputs boxes */}
              <div className="bg-slate-900/40 border border-white/10 p-5 md:p-6 rounded-3xl flex flex-col gap-4">
                
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <Sliders size={15} className="text-cyan-400" />
                    <h3 className="text-sm font-bold text-slate-100">{isAr ? 'الإدخالات وتجهيز الموازنة' : 'Configure Text Input Areas'}</h3>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={loadDiffSample}
                      className="px-3 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/35 rounded-xl text-xs font-bold transition-all"
                    >
                      {t.loadSampleBtn}
                    </button>
                    <button
                      onClick={clearDiffForm}
                      className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 rounded-xl text-xs font-bold transition-all"
                    >
                      {t.clearBtn}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Original Input Text */}
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-slate-300">{t.originalLabel}</label>
                      {originalText && (
                        <button
                          onClick={() => copyDiffInput(originalText, 'orig_in')}
                          className="text-[10px] text-cyan-400 bg-cyan-400/5 px-2 py-0.5 rounded hover:bg-cyan-400/10 flex items-center gap-1 transition-all"
                        >
                          {copyState['orig_in'] ? <Check size={11} /> : <Copy size={11} />}
                          {copyState['orig_in'] ? t.copiedFeedback : `${t.copiedBtn}`}
                        </button>
                      )}
                    </div>
                    <textarea
                      rows={8}
                      value={originalText}
                      onChange={(e) => setOriginalText(e.target.value)}
                      placeholder={t.diffPlaceholder1}
                      className="w-full text-xs font-mono p-3 bg-slate-950/80 border border-white/10 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors resize-y leading-relaxed text-left"
                      dir="ltr"
                    />
                    <div className="text-[10px] text-slate-500 font-mono text-left">
                      Total Lines: {originalText ? originalText.split('\n').length : 0}
                    </div>
                  </div>

                  {/* Modified Input Text */}
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-slate-300">{t.modifiedLabel}</label>
                      {modifiedText && (
                        <button
                          onClick={() => copyDiffInput(modifiedText, 'mod_in')}
                          className="text-[10px] text-cyan-400 bg-cyan-400/5 px-2 py-0.5 rounded hover:bg-cyan-400/10 flex items-center gap-1 transition-all"
                        >
                          {copyState['mod_in'] ? <Check size={11} /> : <Copy size={11} />}
                          {copyState['mod_in'] ? t.copiedFeedback : `${t.copiedBtn}`}
                        </button>
                      )}
                    </div>
                    <textarea
                      rows={8}
                      value={modifiedText}
                      onChange={(e) => setModifiedText(e.target.value)}
                      placeholder={t.diffPlaceholder2}
                      className="w-full text-xs font-mono p-3 bg-slate-950/80 border border-white/10 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors resize-y leading-relaxed text-left"
                      dir="ltr"
                    />
                    <div className="text-[10px] text-slate-500 font-mono text-left">
                      Total Lines: {modifiedText ? modifiedText.split('\n').length : 0}
                    </div>
                  </div>
                </div>

              </div>

              {/* View Layout Toggle */}
              <div className="flex items-center justify-between bg-slate-950/40 p-4 rounded-2xl border border-white/5">
                <span className="text-xs text-slate-400 font-bold">{isAr ? 'خيار العرض:' : 'Visual Diff Arrangement:'}</span>
                <div className="flex bg-slate-900 border border-white/10 rounded-xl p-0.5">
                  <button
                    onClick={() => setDiffViewMode('side')}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      diffViewMode === 'side'
                        ? 'bg-cyan-500/20 text-cyan-300 font-extrabold'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {t.sideBySide}
                  </button>
                  <button
                    onClick={() => setDiffViewMode('inline')}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      diffViewMode === 'inline'
                        ? 'bg-cyan-500/20 text-cyan-300 font-extrabold'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {t.inlineView}
                  </button>
                </div>
              </div>

              {/* Rendered Visual Differences Outputs */}
              <div className="bg-slate-900/40 border border-white/10 p-5 md:p-6 rounded-3xl flex flex-col gap-4">
                
                <h4 className="text-sm font-extrabold text-slate-200 border-b border-white/5 pb-3 flex items-center justify-between">
                  <span>{isAr ? 'تفصيل الفروقات البصرية 🔮' : 'High Resolution Diff Map'}</span>
                  <div className="flex items-center gap-4 text-xs font-bold">
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-emerald-500/20 border border-emerald-500/40 rounded" /> <span className="text-[10px] text-emerald-400">{t.additions}</span></span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-rose-500/20 border border-rose-500/40 rounded" /> <span className="text-[10px] text-rose-400">{t.deletions}</span></span>
                  </div>
                </h4>

                {(!originalText && !modifiedText) ? (
                  <div className="py-12 text-center text-slate-600 text-xs font-mono border border-dashed border-white/5 rounded-2xl">
                    {isAr ? 'أدخل نصوصاً بالأعلى لعرض الفروقات البصرية بوضوح هنا...' : 'Awaiting original and modified inputs to compute visual diff structure...'}
                  </div>
                ) : (
                  <>
                    {diffData.stats.similarity === 100 && (
                      <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-xl text-xs font-bold text-center">
                        {t.identicalAlert}
                      </div>
                    )}

                    {/* Side by side rendering mode */}
                    {diffViewMode === 'side' ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        {/* Side A: Original with removals */}
                        <div className="flex flex-col gap-2">
                          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold font-mono">Original Stream (- removals)</span>
                          <div className="bg-slate-950/80 rounded-2xl border border-white/5 overflow-hidden text-left" dir="ltr">
                            <pre className="p-4 font-mono text-xs overflow-x-auto max-h-[450px] leading-relaxed text-slate-300">
                              {diffData.diffs
                                .filter(d => d.type !== 'added')
                                .map((d, index) => (
                                  <div 
                                    key={index} 
                                    className={`flex items-start ${d.type === 'removed' ? 'bg-rose-500/10 text-rose-300 border-l-2 border-rose-500' : 'opacity-85'}`}
                                  >
                                    <span className="w-10 select-none text-slate-600 text-right pr-2 text-[10px] font-bold shrink-0">{d.lineA}</span>
                                    <span className="select-none text-rose-500 font-bold pr-2">{d.type === 'removed' ? '-' : ' '}</span>
                                    <span className="whitespace-pre-wrap break-all">{d.text || <br />}</span>
                                  </div>
                                ))}
                            </pre>
                          </div>
                        </div>

                        {/* Side B: Modified with additions */}
                        <div className="flex flex-col gap-2">
                          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold font-mono">Modified Stream (+ additions)</span>
                          <div className="bg-slate-950/80 rounded-2xl border border-white/5 overflow-hidden text-left" dir="ltr">
                            <pre className="p-4 font-mono text-xs overflow-x-auto max-h-[450px] leading-relaxed text-slate-300">
                              {diffData.diffs
                                .filter(d => d.type !== 'removed')
                                .map((d, index) => (
                                  <div 
                                    key={index} 
                                    className={`flex items-start ${d.type === 'added' ? 'bg-emerald-500/10 text-emerald-300 border-l-2 border-emerald-500' : 'opacity-85'}`}
                                  >
                                    <span className="w-10 select-none text-slate-600 text-right pr-2 text-[10px] font-bold shrink-0">{d.lineB}</span>
                                    <span className="select-none text-emerald-500 font-bold pr-2">{d.type === 'added' ? '+' : ' '}</span>
                                    <span className="whitespace-pre-wrap break-all">{d.text || <br />}</span>
                                  </div>
                                ))}
                            </pre>
                          </div>
                        </div>

                      </div>
                    ) : (
                      // Inline merged rendering mode
                      <div className="bg-slate-950/80 rounded-2xl border border-white/5 overflow-hidden text-left" dir="ltr">
                        <pre className="p-4 font-mono text-xs overflow-x-auto max-h-[450px] leading-relaxed text-slate-300">
                          {diffData.diffs.map((d, index) => (
                            <div 
                              key={index} 
                              className={`flex items-start ${
                                d.type === 'added' ? 'bg-emerald-500/10 text-emerald-300 border-l-2 border-emerald-500' :
                                d.type === 'removed' ? 'bg-rose-500/10 text-rose-300 border-l-2 border-rose-500' :
                                'opacity-80'
                              }`}
                            >
                              <span className="w-12 select-none text-slate-600 text-right pr-2 text-[9px] font-bold shrink-0">
                                {d.type === 'added' ? `+ Line ${d.lineB}` : d.type === 'removed' ? `- Line ${d.lineA}` : `${d.lineA} → ${d.lineB}`}
                              </span>
                              <span className="select-none font-bold px-2 text-[11px]">
                                {d.type === 'added' ? '+' : d.type === 'removed' ? '-' : ' '}
                              </span>
                              <span className="whitespace-pre-wrap break-all">{d.text || <br />}</span>
                            </div>
                          ))}
                        </pre>
                      </div>
                    )}
                  </>
                )}

              </div>

            </div>
          )}


          {/* TAB 2: REMOVE DUPLICATE LINES */}
          {activeTab === 'duplicates' && (
            <div className="flex flex-col gap-6">
              
              <div className="bg-slate-900/40 border border-white/10 p-5 md:p-6 rounded-3xl flex flex-col gap-4">
                
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <Database size={15} className="text-indigo-400" />
                    <h3 className="text-sm font-bold text-slate-100">{t.dupsInputLabel}</h3>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={loadDupsSample}
                      className="px-3 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/35 rounded-xl text-xs font-bold transition-all"
                    >
                      {t.loadSampleBtn}
                    </button>
                    <button
                      onClick={() => setDupsInput('')}
                      className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 rounded-xl text-xs font-bold transition-all"
                    >
                      {isAr ? 'مسح المدخلات' : 'Clear Raw Text'}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                  
                  {/* Left Controls list (5 cols) */}
                  <div className="md:col-span-5 flex flex-col gap-4 bg-slate-950/40 p-4 rounded-2xl border border-white/5">
                    
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                      {isAr ? 'خيارات الفحص والإهمال' : 'Filtering Configuration Parameters'}
                    </span>

                    <label className="flex items-start gap-2.5 cursor-pointer select-none">
                      <input 
                        type="checkbox" 
                        checked={dupsCaseSensitive}
                        onChange={(e) => setDupsCaseSensitive(e.target.checked)}
                        className="mt-1 accent-indigo-500"
                      />
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-bold text-slate-200">{t.caseSensitiveOpt}</span>
                        <span className="text-[10px] text-slate-500">{isAr ? 'يعتبر Apple و apple سطرين مختلفين' : 'Distinguishes case casing variations'}</span>
                      </div>
                    </label>

                    <label className="flex items-start gap-2.5 cursor-pointer select-none border-t border-white/5 pt-3">
                      <input 
                        type="checkbox" 
                        checked={dupsTrim}
                        onChange={(e) => setDupsTrim(e.target.checked)}
                        className="mt-1 accent-indigo-500"
                      />
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-bold text-slate-200">{t.trimOpt}</span>
                        <span className="text-[10px] text-slate-500">{isAr ? 'تجاهل أي مسافات قبل السطور أو بعدها' : 'Strips spacing formatting side-pads'}</span>
                      </div>
                    </label>

                    <label className="flex items-start gap-2.5 cursor-pointer select-none border-t border-white/5 pt-3">
                      <input 
                        type="checkbox" 
                        checked={dupsRemoveEmpty}
                        onChange={(e) => setDupsRemoveEmpty(e.target.checked)}
                        className="mt-1 accent-indigo-500"
                      />
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-bold text-slate-200">{t.removeEmptyOpt}</span>
                        <span className="text-[10px] text-slate-500">{isAr ? 'عدم تضمين الأسطر التي تحتوي مسافات فارغة فقط' : 'Skips and discards entirely raw lines'}</span>
                      </div>
                    </label>

                  </div>

                  {/* Right raw list textarea (7 cols) */}
                  <div className="md:col-span-7 flex flex-col gap-2">
                    <textarea
                      rows={9}
                      value={dupsInput}
                      onChange={(e) => setDupsInput(e.target.value)}
                      placeholder={t.dupsPlaceholder}
                      className="w-full text-xs font-mono p-3.5 bg-slate-950/80 border border-white/10 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 transition-all text-left resize-y leading-relaxed"
                      dir="ltr"
                    />
                  </div>

                </div>

              </div>

              {/* Deduplication Output Workspace */}
              <div className="bg-slate-900/40 border border-white/10 p-5 md:p-6 rounded-3xl flex flex-col gap-4">
                
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <h4 className="text-sm font-bold text-slate-200">{isAr ? 'النتيجة بعد مسح الأسطر المكررة' : 'Duplication Clean Result List'}</h4>
                  {dupsOutput && (
                    <button
                      onClick={copyDupsResult}
                      className="px-3 py-1.5 bg-indigo-500/20 hover:bg-indigo-300/30 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                    >
                      {copyState['duplicates_out'] ? <Check size={13} className="text-indigo-400" /> : <Copy size={13} />}
                      <span>{copyState['duplicates_out'] ? t.copiedFeedback : t.copyFilteredBtn}</span>
                    </button>
                  )}
                </div>

                {!dupsOutput ? (
                  <div className="py-12 text-center text-slate-600 text-xs font-mono border border-dashed border-white/5 rounded-2xl">
                    {isAr ? 'ادخل نصوص مكررة في الأعلى لمسح التكرار تلقائياً وعرض المخرجات الفريدة هنا...' : 'Input catalog text above to strip duplicates locally...'}
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <textarea
                      rows={8}
                      readOnly
                      value={dupsOutput}
                      className="w-full text-xs font-mono p-3 bg-slate-950/80 border border-white/5 rounded-xl text-indigo-200 focus:outline-none text-left"
                      dir="ltr"
                    />
                    
                    {/* Unique statistical metrics shown if parsed */}
                    {dupsStats && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-indigo-950/20 p-4 rounded-xl border border-indigo-500/20 text-xs">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-slate-400">{t.origCount}</span>
                          <span className="text-base font-extrabold text-slate-200">{dupsStats.original}</span>
                        </div>
                        <div className="flex flex-col gap-0.5 border-t sm:border-t-0 sm:border-l border-white/5 sm:pl-3 pt-2 sm:pt-0">
                          <span className="text-rose-400 font-bold">{t.dupLinesRemoved}</span>
                          <span className="text-base font-extrabold text-rose-300 font-mono">-{dupsStats.duplicates}</span>
                        </div>
                        <div className="flex flex-col gap-0.5 border-t sm:border-t-0 sm:border-l border-white/5 sm:pl-3 pt-2 sm:pt-0">
                          <span className="text-emerald-400 font-bold">{t.finalLinesLeft}</span>
                          <span className="text-base font-extrabold text-emerald-300 font-mono">{dupsStats.final}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

              </div>

            </div>
          )}


          {/* TAB 3: SORT LISTS LINES */}
          {activeTab === 'sort' && (
            <div className="flex flex-col gap-6">
              
              <div className="bg-slate-900/40 border border-white/10 p-5 md:p-6 rounded-3xl flex flex-col gap-4">
                
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <ArrowUpDown size={15} className="text-purple-400" />
                    <h3 className="text-sm font-bold text-slate-100">{t.sortInputLabel}</h3>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={loadSortSample}
                      className="px-3 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/35 rounded-xl text-xs font-bold transition-all"
                    >
                      {t.loadSampleBtn}
                    </button>
                    <button
                      onClick={() => setSortInput('')}
                      className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 rounded-xl text-xs font-bold transition-all"
                    >
                      {isAr ? 'مسح السطور' : 'Clear Grid Lines'}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                  
                  {/* Left list params (5 cols) */}
                  <div className="md:col-span-5 flex flex-col gap-4 bg-slate-950/40 p-4 rounded-2xl border border-white/5">
                    
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                      {t.sortTypeLabel}
                    </span>

                    <div className="flex flex-col gap-2">
                      <select
                        value={sortRule}
                        onChange={(e: any) => setSortRule(e.target.value)}
                        className="w-full bg-[#111326] border border-white/10 rounded-xl p-2 text-xs font-semibold text-purple-300 focus:outline-none focus:border-purple-500/50"
                      >
                        <option value="asc">{t.sortAsc}</option>
                        <option value="desc">{t.sortDesc}</option>
                        <option value="numAsc">{t.sortNumAsc}</option>
                        <option value="numDesc">{t.sortNumDesc}</option>
                        <option value="lenAsc">{t.sortLenAsc}</option>
                        <option value="lenDesc">{t.sortLenDesc}</option>
                        <option value="reverse">{t.sortReverseList}</option>
                        <option value="shuffle">{t.sortShuffleList}</option>
                      </select>
                    </div>

                    <label className="flex items-start gap-2.5 cursor-pointer select-none border-t border-white/5 pt-3">
                      <input 
                        type="checkbox" 
                        checked={ignoreCaseSort}
                        onChange={(e) => setIgnoreCaseSort(e.target.checked)}
                        className="mt-1 accent-purple-500"
                        disabled={sortRule === 'numAsc' || sortRule === 'numDesc' || sortRule === 'reverse' || sortRule === 'shuffle'}
                      />
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-bold text-slate-200">{t.ignoreCaseSort}</span>
                        <span className="text-[10px] text-slate-500">{isAr ? 'تجاهل الأحرف الكبيرة والصغيرة (A == a)' : 'Discards casing values comparison priority'}</span>
                      </div>
                    </label>

                  </div>

                  {/* Right Sort list input textarea (7 cols) */}
                  <div className="md:col-span-7 flex flex-col gap-2">
                    <textarea
                      rows={9}
                      value={sortInput}
                      onChange={(e) => setSortInput(e.target.value)}
                      placeholder={t.sortPlaceholder}
                      className="w-full text-xs font-mono p-3.5 bg-slate-950/80 border border-white/10 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:border-purple-500/50 transition-all text-left resize-y leading-relaxed"
                      dir="ltr"
                    />
                  </div>

                </div>

              </div>

              {/* Sort output results preview block */}
              <div className="bg-slate-900/40 border border-white/10 p-5 md:p-6 rounded-3xl flex flex-col gap-4">
                
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <h4 className="text-sm font-bold text-slate-200">{isAr ? 'القائمة الجديدة المرتبة والمفروزة' : 'Sorted Result Output'}</h4>
                  {sortOutput && (
                    <button
                      onClick={copySortResult}
                      className="px-3 py-1.5 bg-purple-500/20 hover:bg-purple-300/30 text-purple-300 border border-purple-500/30 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                    >
                      {copyState['sort_out'] ? <Check size={13} className="text-purple-400" /> : <Copy size={13} />}
                      <span>{copyState['sort_out'] ? t.copiedFeedback : t.copySortedBtn}</span>
                    </button>
                  )}
                </div>

                {!sortOutput ? (
                  <div className="py-12 text-center text-slate-600 text-xs font-mono border border-dashed border-white/5 rounded-2xl">
                    {isAr ? 'أدخل أسطر القائمة في الأعلى وسوف يتم الترتيب والفرز التلقائي فوراً...' : 'Provide alphanumeric array lines above to sort instantly...'}
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <textarea
                      rows={8}
                      readOnly
                      value={sortOutput}
                      className="w-full text-xs font-mono p-3 bg-slate-950/80 border border-white/5 rounded-xl text-purple-200 focus:outline-none text-left"
                      dir="ltr"
                    />
                    
                    <div className="bg-purple-950/20 p-4 rounded-xl border border-purple-500/20 text-xs text-slate-400 flex justify-between items-center">
                      <span>{isAr ? 'إجمالي السطور التي جرى معالجتها:' : 'Total Lines Processed:'}</span>
                      <span className="text-sm font-mono font-extrabold text-purple-300">{sortCount}</span>
                    </div>
                  </div>
                )}

              </div>

            </div>
          )}


          {/* 5. Sub-bottom secure local privacy notice */}
          <div className="bg-slate-900/40 border border-white/10 p-5 md:p-6 rounded-3xl flex flex-col gap-3">
            <h4 className="font-extrabold text-sm text-slate-200 flex items-center gap-2">
              <Info size={16} className="text-cyan-400" />
              {t.aboutTitle}
            </h4>
            <p className="text-xs text-slate-450 leading-relaxed">
              {t.aboutText}
            </p>
          </div>

        </div>

        {/* Dynamic Sidebar Right Section (3 columns on xl screens) */}
        <div className="lg:col-span-3 flex flex-col gap-6">

          {/* Quick analysis overview widgets */}
          {activeTab === 'diff' && (
            <div className="bg-gradient-to-b from-slate-900 via-[#0a0c1a] to-[#0c0d1b] border border-white/10 p-5 rounded-3xl flex flex-col gap-4">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1.5 border-b border-white/5 pb-3">
                <Sparkles size={13} className="text-cyan-400" />
                {t.statsHeader}
              </h3>

              <div className="flex flex-col gap-3.5 text-xs text-slate-300">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">{t.totalLinesA}</span>
                  <span className="font-mono font-bold text-slate-200">{originalText ? originalText.split('\n').length : 0}</span>
                </div>
                
                <div className="flex justify-between items-center border-t border-white/5 pt-3">
                  <span className="text-slate-500">{t.totalLinesB}</span>
                  <span className="font-mono font-bold text-slate-200">{modifiedText ? modifiedText.split('\n').length : 0}</span>
                </div>

                <div className="flex justify-between items-center border-t border-white/5 pt-3 text-emerald-400">
                  <span className="text-slate-500">{t.addedMetric}</span>
                  <span className="font-mono font-bold">+{diffData.stats.added}</span>
                </div>

                <div className="flex justify-between items-center border-t border-white/5 pt-3 text-rose-400">
                  <span className="text-slate-500">{t.removedMetric}</span>
                  <span className="font-mono font-bold">-{diffData.stats.removed}</span>
                </div>

                {/* Accuracy/Similarity rating radial bar */}
                <div className="flex flex-col gap-1.5 border-t border-white/5 pt-4">
                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-500">
                    <span>{t.similarityScore}</span>
                    <span className="font-mono text-cyan-400">{diffData.stats.similarity}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 border border-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-300"
                      style={{ width: `${diffData.stats.similarity}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Share widget element */}
          <div className="bg-slate-900/40 border border-white/10 p-5 rounded-3xl flex flex-col gap-4 text-right md:text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              {t.shareLabel}
            </span>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isAr ? 'انشر هذه الخدمة لزملائك للاستفادة من المكنة الرائعة.' : 'Share this high performance client formatting utility.'}
            </p>
            <div className="pt-2">
              <ShareButtons lang={lang} text={isAr ? `جرب أداة مقارنة النصوص وحذف التكرار والترتيب مع "أدوات Hub" محلياً ومجاناً!` : `Check out this 100% private text comparison and line ordering generator on Tools Hub!`} />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
