import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Code2, ArrowRight, ArrowLeft, Calculator } from 'lucide-react';

const categoryData: Record<string, { titleAr: string, titleEn: string, tools: any[] }> = {
  finance: {
    titleAr: 'المال والأعمال',
    titleEn: 'Finance & Business',
    tools: [
      { id: 'loan-calculator', nameAr: 'حاسبة القروض الشخصية', nameEn: 'Personal Loan Calculator', descAr: 'حساب القسط الشهري والفوائد للقروض', descEn: 'Calculate monthly EMI and interest for loans', icon: Calculator },
      { id: 'tax-calculator', nameAr: 'حاسبة ضريبة الدخل', nameEn: 'Income Tax Calculator', descAr: 'حساب ضريبة الدخل التقديرية للرواتب الدخل الحر', descEn: 'Estimate income tax for salary or freelance', icon: Calculator }
    ]
  },
  developers: {
    titleAr: 'المطورين والـ SEO',
    titleEn: 'Developers & SEO',
    tools: [
      { id: 'word-counter', nameAr: 'حاسبة الكلمات والحروف', nameEn: 'Word & Character Counter', descAr: 'عداد كلمات مع احصائيات متقدمة', descEn: 'Word counter with advanced stats', icon: Code2 }
    ]
  },
  // We can populate others later
};

export default function Category({ lang }: { lang: 'ar' | 'en' }) {
  const { id } = useParams<{ id: string }>();
  const isAr = lang === 'ar';
  
  const category = id ? categoryData[id] : null;

  if (!category) {
    return (
      <div className="text-center py-20 text-slate-300">
        <h2 className="text-2xl font-bold mb-4">{isAr ? 'القسم غير موجود' : 'Category Not Found'}</h2>
        <Link to="/" className="text-emerald-400 hover:underline">{isAr ? 'العودة للرئيسية' : 'Return Home'}</Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-8">
      {/* Placeholder: Top AdSense */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm">
        <div className="text-[10px] uppercase tracking-widest mb-1">
          {isAr ? 'إعلان AdSense' : 'AdSense Ad'}
        </div>
        <p className="text-[10px]">AD_SPACE_728x90 (Top)</p>
      </div>

      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          {isAr ? category.titleAr : category.titleEn}
        </h1>
        <Link to="/" className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors">
          {isAr ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
          <span>{isAr ? 'عودة والأقسام' : 'Back to Categories'}</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {category.tools.length > 0 ? (
          category.tools.map(tool => {
            const Icon = tool.icon;
            return (
              <Link key={tool.id} to={`/tool/${tool.id}`} className="bg-white/5 border border-white/10 hover:bg-white/10 p-5 rounded-xl transition-colors flex flex-col gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Icon size={20} />
                </div>
                <h3 className="font-bold text-slate-100">{isAr ? tool.nameAr : tool.nameEn}</h3>
                <p className="text-xs text-slate-400">{isAr ? tool.descAr : tool.descEn}</p>
              </Link>
            )
          })
        ) : (
          <div className="col-span-full py-12 text-center text-slate-400 border border-dashed border-white/10 rounded-2xl">
            {isAr ? 'جاري إضافة الأدوات قريباً...' : 'Tools will be added soon...'}
          </div>
        )}
      </div>

      {/* Placeholder: Middle AdSense */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm mt-4">
        <div className="text-[10px] uppercase tracking-widest mb-1">
          {isAr ? 'إعلان AdSense' : 'AdSense Ad'}
        </div>
        <p className="text-[10px]">AD_SPACE_728x90 (Middle)</p>
      </div>
    </div>
  );
}
