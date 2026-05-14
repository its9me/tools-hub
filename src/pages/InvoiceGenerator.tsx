import React, { useState, useMemo } from 'react';
import { FileText, Plus, Trash2, Printer, Share2, Info } from 'lucide-react';

const translations = {
  ar: {
    title: "صانع الفواتير",
    subtitle: "أنشئ فواتير احترافية لعملائك بسهولة وسرعة.",
    myInfo: "بياناتك (المستقل/الشركة)",
    clientInfo: "بيانات العميل",
    invoiceDetails: "تفاصيل الفاتورة",
    invoiceNo: "رقم الفاتورة",
    date: "تاريخ الفاتورة",
    dueDate: "تاريخ الاستحقاق",
    items: "عناصر الفاتورة",
    itemName: "الوصف",
    qty: "الكمية",
    price: "السعر",
    amount: "المجموع",
    addItem: "إضافة عنصر جديد",
    subtotal: "المجموع الفرعي",
    taxRate: "الضريبة (%)",
    discount: "خصم (مبلغ)",
    total: "الإجمالي النهائي",
    currency: "العملة",
    print: "طباعة / حفظ كـ PDF",
    shareWhatsapp: "مشاركة تفاصيل الفاتورة",
    aboutTitle: "كيف تستخدم صانع الفواتير؟",
    aboutP1: "أداة بسيطة للمستقلين وأصحاب الأعمال الحرة لإنشاء فواتير احترافية بدون برامج معقدة. يمكنك إدخال تفاصيل الخدمات أو المنتجات، حساب الضرائب والخصومات، ثم طباعتها أو حفظها كملف PDF بسهولة.",
    placeholderName: "الاسم",
    placeholderEmail: "البريد الإلكتروني",
    placeholderAddress: "العنوان / الهاتف",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)"
  },
  en: {
    title: "Invoice Generator",
    subtitle: "Create professional invoices for your clients quickly and easily.",
    myInfo: "Your Info (Freelancer/Company)",
    clientInfo: "Client Info",
    invoiceDetails: "Invoice Details",
    invoiceNo: "Invoice No.",
    date: "Date",
    dueDate: "Due Date",
    items: "Invoice Items",
    itemName: "Description",
    qty: "Qty",
    price: "Price",
    amount: "Amount",
    addItem: "Add Item",
    subtotal: "Subtotal",
    taxRate: "Tax (%)",
    discount: "Discount (Amount)",
    total: "Grand Total",
    currency: "Currency",
    print: "Print / Save as PDF",
    shareWhatsapp: "Share Invoice Details",
    aboutTitle: "How to use the Invoice Generator?",
    aboutP1: "A simple tool for freelancers and small business owners to create professional invoices without complex software. Enter service details, calculate taxes and discounts, then print or save as PDF.",
    placeholderName: "Name",
    placeholderEmail: "Email",
    placeholderAddress: "Address / Phone",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)"
  }
};

interface InvoiceItem {
  id: string;
  name: string;
  quantity: number | '';
  price: number | '';
}

export default function InvoiceGenerator({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const [currency, setCurrency] = useState('$');
  const [invoiceNo, setInvoiceNo] = useState('INV-001');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState('');

  const [fromName, setFromName] = useState('');
  const [fromEmail, setFromEmail] = useState('');
  const [fromAddress, setFromAddress] = useState('');

  const [toName, setToName] = useState('');
  const [toEmail, setToEmail] = useState('');
  const [toAddress, setToAddress] = useState('');

  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', name: 'تصميم موقع إلكتروني', quantity: 1, price: 500 }
  ]);

  const [taxRate, setTaxRate] = useState<number | ''>(0);
  const [discount, setDiscount] = useState<number | ''>(0);

  const addItem = () => {
    setItems([...items, { id: Math.random().toString(), name: '', quantity: 1, price: 0 }]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const totals = useMemo(() => {
    const subtotal = items.reduce((acc, item) => {
      const q = Number(item.quantity) || 0;
      const p = Number(item.price) || 0;
      return acc + (q * p);
    }, 0);

    const taxAmount = subtotal * ((Number(taxRate) || 0) / 100);
    const totalDiscount = Number(discount) || 0;
    const total = Math.max(0, subtotal + taxAmount - totalDiscount);

    return { subtotal, taxAmount, total };
  }, [items, taxRate, discount]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(val);
  };

  const handlePrint = () => {
    window.print();
  };

  const shareText = encodeURIComponent(
    isAr 
      ? `تم إصدار فاتورة جديدة (${invoiceNo})\nالقيمة الإجمالية: ${formatCurrency(totals.total)} ${currency}\nيرجى مراجعتها.`
      : `New invoice generated (${invoiceNo})\nTotal Amount: ${formatCurrency(totals.total)} ${currency}\nPlease review.`
  );
  const whatsappUrl = `https://wa.me/?text=${shareText}`;

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto print:max-w-none print:m-0 print:gap-0">
      
      {/* Hide taking up space during print */}
      <div className="print:hidden w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm">
        <div className="text-[10px] uppercase tracking-widest mb-1">{t.adTop}</div>
        <p className="text-[10px]">{t.adTopDesc}</p>
      </div>

      <div className="print:hidden text-center flex flex-col items-center">
         <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <FileText size={32} className="text-white" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400">{t.subtitle}</p>
      </div>

      {/* Control Panel (Hidden on Print) */}
      <div className="print:hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-slate-900/60 p-4 border border-white/10 rounded-2xl">
         <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">{t.invoiceNo}</label>
            <input type="text" value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-2 text-sm text-slate-200 outline-none focus:ring-1 focus:ring-blue-500" />
         </div>
         <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">{t.date}</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-2 text-sm text-slate-200 outline-none focus:ring-1 focus:ring-blue-500 [color-scheme:dark]" />
         </div>
         <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">{t.dueDate}</label>
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-2 text-sm text-slate-200 outline-none focus:ring-1 focus:ring-blue-500 [color-scheme:dark]" />
         </div>
         <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">{t.currency}</label>
            <input type="text" value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-2 text-sm text-slate-200 outline-none focus:ring-1 focus:ring-blue-500" placeholder="$ / IQD / SAR" />
         </div>
      </div>

      {/* Printable Invoice Container */}
      <section className="bg-white print:bg-transparent print:shadow-none print:border-none rounded-2xl border border-white/10 shadow-2xl overflow-hidden text-slate-800">
        <div className="p-8 md:p-12 print:p-0">
          
          {/* Invoice Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-8 mb-12">
            <div className="w-full sm:w-1/2 flex flex-col gap-3">
               <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">{t.myInfo}</h3>
               <input type="text" value={fromName} onChange={(e)=>setFromName(e.target.value)} placeholder={t.placeholderName} className="font-bold text-xl bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 outline-none w-full pb-1 transition-colors print:border-none" />
               <input type="text" value={fromEmail} onChange={(e)=>setFromEmail(e.target.value)} placeholder={t.placeholderEmail} className="text-sm bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 outline-none w-full pb-1 transition-colors print:border-none text-slate-600" />
               <input type="text" value={fromAddress} onChange={(e)=>setFromAddress(e.target.value)} placeholder={t.placeholderAddress} className="text-sm bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 outline-none w-full pb-1 transition-colors print:border-none text-slate-600" />
            </div>

            <div className="w-full sm:w-1/2 flex flex-col gap-3 sm:items-end">
               <h1 className="text-4xl font-black text-slate-900 tracking-tight uppercase mb-2">INVOICE</h1>
               <div className="text-sm text-slate-500 flex gap-2">
                 <span className="font-semibold">{t.invoiceNo}:</span> <span>{invoiceNo}</span>
               </div>
               <div className="text-sm text-slate-500 flex gap-2">
                 <span className="font-semibold">{t.date}:</span> <span>{date}</span>
               </div>
               {dueDate && (
                 <div className="text-sm text-slate-500 flex gap-2">
                   <span className="font-semibold">{t.dueDate}:</span> <span>{dueDate}</span>
                 </div>
               )}
            </div>
          </div>

          {/* Client Details */}
          <div className="mb-12">
             <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">{t.clientInfo}</h3>
             <div className="w-full sm:w-1/2 flex flex-col gap-3">
               <input type="text" value={toName} onChange={(e)=>setToName(e.target.value)} placeholder={t.placeholderName} className="font-bold text-lg bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 outline-none w-full pb-1 transition-colors print:border-none" />
               <input type="text" value={toEmail} onChange={(e)=>setToEmail(e.target.value)} placeholder={t.placeholderEmail} className="text-sm bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 outline-none w-full pb-1 transition-colors print:border-none text-slate-600" />
               <input type="text" value={toAddress} onChange={(e)=>setToAddress(e.target.value)} placeholder={t.placeholderAddress} className="text-sm bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 outline-none w-full pb-1 transition-colors print:border-none text-slate-600" />
             </div>
          </div>

          {/* Items Table */}
          <div className="w-full mb-8">
            <div className="flex border-y border-slate-200 py-3 text-sm font-bold text-slate-700 bg-slate-50/50">
              <div className="flex-[3] px-2">{t.itemName}</div>
              <div className="flex-1 px-2 text-center">{t.qty}</div>
              <div className="flex-1 px-2 text-center">{t.price}</div>
              <div className="flex-1 px-2 text-center">{t.amount}</div>
              <div className="w-10 print:hidden"></div>
            </div>

            <div className="flex flex-col">
              {items.map((item, index) => (
                <div key={item.id} className="flex items-center border-b border-slate-100 py-2 group">
                   <div className="flex-[3] px-2">
                     <input type="text" value={item.name} onChange={(e)=>updateItem(item.id, 'name', e.target.value)} placeholder="Item description" className="w-full text-sm bg-transparent border border-transparent hover:border-slate-200 focus:border-blue-500 outline-none p-1 rounded transition-colors print:border-none" />
                   </div>
                   <div className="flex-1 px-2">
                     <input type="number" value={item.quantity} onChange={(e)=>updateItem(item.id, 'quantity', e.target.value ? Number(e.target.value) : '')} className="w-full text-sm text-center bg-transparent border border-transparent hover:border-slate-200 focus:border-blue-500 outline-none p-1 rounded transition-colors print:border-none" />
                   </div>
                   <div className="flex-1 px-2">
                     <input type="number" value={item.price} onChange={(e)=>updateItem(item.id, 'price', e.target.value ? Number(e.target.value) : '')} className="w-full text-sm text-center bg-transparent border border-transparent hover:border-slate-200 focus:border-blue-500 outline-none p-1 rounded transition-colors print:border-none" />
                   </div>
                   <div className="flex-1 px-2 text-sm text-center font-medium">
                      {(Number(item.quantity) || 0) * (Number(item.price) || 0)} {currency}
                   </div>
                   <div className="w-10 flex justify-center print:hidden">
                      <button onClick={()=>removeItem(item.id)} className="text-slate-300 hover:text-rose-500 transition-colors p-1 opacity-0 group-hover:opacity-100 focus:opacity-100">
                        <Trash2 size={16} />
                      </button>
                   </div>
                </div>
              ))}
            </div>

            <button onClick={addItem} className="print:hidden mt-4 flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium px-2">
              <Plus size={16} /> {t.addItem}
            </button>
          </div>

          {/* Totals Section */}
          <div className="flex flex-col sm:flex-row justify-end items-start pt-6">
            <div className="w-full sm:w-1/2 lg:w-1/3 flex flex-col gap-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">{t.subtotal}</span>
                <span className="font-medium text-slate-700">{formatCurrency(totals.subtotal)} {currency}</span>
              </div>
              <div className="flex justify-between items-center text-sm print:hidden">
                <span className="text-slate-500">{t.taxRate}</span>
                <input type="number" value={taxRate} onChange={(e)=>setTaxRate(e.target.value ? Number(e.target.value) : '')} className="w-20 text-right bg-slate-50 border border-slate-200 rounded p-1 text-sm outline-none focus:border-blue-500" placeholder="0" />
              </div>
              {taxRate !== '' && taxRate > 0 && (
                <div className="flex justify-between items-center text-sm hidden print:flex">
                  <span className="text-slate-500">{t.taxRate} ({taxRate}%)</span>
                  <span className="font-medium text-slate-700">{formatCurrency(totals.taxAmount)} {currency}</span>
                </div>
              )}

              <div className="flex justify-between items-center text-sm print:hidden">
                <span className="text-slate-500">{t.discount}</span>
                <div className="relative w-24">
                  <input type="number" value={discount} onChange={(e)=>setDiscount(e.target.value ? Number(e.target.value) : '')} className={`w-full text-right bg-slate-50 border border-slate-200 rounded p-1 text-sm outline-none focus:border-blue-500 ${isAr ? 'pl-6' : 'pr-6'}`} placeholder="0" />
                  <span className={`absolute top-1/2 -translate-y-1/2 text-slate-400 text-xs ${isAr ? 'left-2' : 'right-2'}`}>{currency}</span>
                </div>
              </div>
              {discount !== '' && discount > 0 && (
                 <div className="flex justify-between items-center text-sm hidden print:flex">
                  <span className="text-slate-500">{t.discount}</span>
                  <span className="font-medium text-slate-700">- {formatCurrency(Number(discount))} {currency}</span>
                </div>
              )}

              <div className="flex justify-between items-center bg-blue-50/50 p-4 rounded-xl mt-2 border border-blue-100">
                 <span className="font-bold text-slate-900">{t.total}</span>
                 <span className="font-bold text-xl text-blue-600">{formatCurrency(totals.total)} {currency}</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Action Buttons (Hidden on Print) */}
      <div className="print:hidden flex flex-col sm:flex-row justify-center gap-4 mt-4">
        <button
          onClick={handlePrint}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-900 rounded-xl text-sm font-bold shadow-md transition-all active:scale-95 border border-slate-200"
        >
          <Printer size={18} className="text-blue-600" />
          {t.print}
        </button>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-md transition-all active:scale-95"
        >
          <Share2 size={18} />
          {t.shareWhatsapp}
        </a>
      </div>

       {/* About Section */}
       <article className="print:hidden p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col gap-4 text-[13px] text-slate-300 leading-relaxed shadow-lg mt-4">
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-2">
            <Info size={20} className="text-blue-400"/>
            <h2 className="text-lg font-bold text-blue-400">{t.aboutTitle}</h2>
        </div>
        <div className="space-y-4">
          <p>{t.aboutP1}</p>
        </div>
      </article>

    </div>
  );
}
