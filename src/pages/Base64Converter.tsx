import React, { useState } from 'react';
import { Share2, Info, Copy, FileCode, Check, Image as ImageIcon, Braces, Lock, Unlock, Upload, Download } from 'lucide-react';

const translations = {
  ar: {
    title: "محول Base64",
    subtitle: "تشفير وفك تشفير النصوص والصور من وإلى صيغة Base64 بسهولة وسرعة.",
    tabText: "نصوص",
    tabFile: "ملفات / صور",
    encodeStr: "تشفير (Encode)",
    decodeStr: "فك التشفير (Decode)",
    inputLabel: "قم بإدخال النص هنا...",
    outputLabel: "النتيجة:",
    fileUpload: "رفع ملف أو صورة",
    dragDrop: "أو اسحب وأفلت الملف هنا",
    fileOutput: "كود Base64 للملف:",
    copy: "نسخ الكود",
    copySuccess: "تم النسخ!",
    errorDecode: "النص المدخل ليس كود Base64 صالحاً.",
    shareWhatsapp: "مشاركة الأداة",
    aboutTitle: "عن الأداة",
    aboutP1: "أداة مفيدة للمطورين تشفير وفك تشفير البيانات بصيغة Base64. يمكنك تحويل أي نص أو رفع صورة/ملف للحصول على كود Base64 فوراً الذي يمكن استخدامه في تضمين الصور داخل ملفات CSS أو HTML وغيرها. تعمل الأداة بشكل كامل داخل المتصفح لضمان خصوصيتك.",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)",
    fileEncodeStr: "تشفير ملف",
    fileDecodeStr: "فك تشفير ملف",
    base64InputLabel: "ضع كود Base64 هنا...",
    downloadFile: "تحميل الملف",
    invalidBase64File: "الكود المدخل غير صالح",
    filePreviewLabel: "معاينة الملف:",
    uploadAnother: "رفع ملف آخر"
  },
  en: {
    title: "Base64 Converter",
    subtitle: "Encode and decode text and images to and from Base64 rapidly and easily.",
    tabText: "Text",
    tabFile: "Files / Images",
    encodeStr: "Encode",
    decodeStr: "Decode",
    inputLabel: "Enter your text here...",
    outputLabel: "Result:",
    fileUpload: "Upload a File or Image",
    dragDrop: "or drag & drop file here",
    fileOutput: "Base64 Code:",
    copy: "Copy Code",
    copySuccess: "Copied!",
    errorDecode: "The input is not a valid Base64 string.",
    shareWhatsapp: "Share Tool",
    aboutTitle: "About The Tool",
    aboutP1: "A useful tool for developers to encode and decode Base64 data. You can convert any text or upload a file/image to get its Base64 string which can be used to embed images directly into HTML/CSS files. The tool works entirely within your browser for complete privacy.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)",
    fileEncodeStr: "Encode File",
    fileDecodeStr: "Decode to File",
    base64InputLabel: "Paste Base64 here...",
    downloadFile: "Download File",
    invalidBase64File: "Invalid Base64 string",
    filePreviewLabel: "File Preview:",
    uploadAnother: "Upload Another File"
  }
};

export default function Base64Converter({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const [activeTab, setActiveTab] = useState<'text' | 'file'>('text');
  const [textMode, setTextMode] = useState<'encode' | 'decode'>('encode');
  const [fileMode, setFileMode] = useState<'encode' | 'decode'>('encode');
  
  const [inputText, setInputText] = useState('');
  const [base64FileInput, setBase64FileInput] = useState('');
  const [fileBase64, setFileBase64] = useState<string>('');
  const [fileName, setFileName] = useState('');
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isImage, setIsImage] = useState(false);
  const [copied, setCopied] = useState(false);

  // Encode text with unicode support
  const encodeBase64 = (str: string) => {
    try {
      return btoa(unescape(encodeURIComponent(str)));
    } catch {
      return '';
    }
  };

  // Decode text with unicode support
  const decodeBase64 = (str: string) => {
    if (!str.trim()) return '';
    try {
      return decodeURIComponent(escape(atob(str)));
    } catch {
      return null; // Error
    }
  };

  let textResult = '';
  let isError = false;
  if (inputText) {
    if (textMode === 'encode') {
      textResult = encodeBase64(inputText);
    } else {
      const decoded = decodeBase64(inputText.trim());
      if (decoded === null) {
        isError = true;
      } else {
        textResult = decoded;
      }
    }
  }

  let isDecodedFileValid = false;
  let decodedFileMime = '';
  let decodedFileExt = '';
  let decodedFileSrc = '';
  let isDecodedFileImage = false;

  if (activeTab === 'file' && fileMode === 'decode' && base64FileInput.trim()) {
    try {
      let b64 = base64FileInput.trim();
      let mime = 'application/octet-stream';
      
      if (b64.startsWith('data:')) {
        const parts = b64.split(',');
        const match = parts[0].match(/data:(.*?);/);
        if (match && match[1]) {
          mime = match[1];
        }
        b64 = parts[1];
        decodedFileSrc = base64FileInput.trim();
      } else {
        if (b64.startsWith('iVBORw')) mime = 'image/png';
        else if (b64.startsWith('/9j/')) mime = 'image/jpeg';
        else if (b64.startsWith('JVBERi0')) mime = 'application/pdf';
        else if (b64.startsWith('R0lGOD')) mime = 'image/gif';
        else if (b64.startsWith('UklGR')) mime = 'image/webp';
        
        decodedFileSrc = `data:${mime};base64,${b64}`;
      }
      
      atob(b64.substring(0, 100)); // validate head
      isDecodedFileValid = true;
      decodedFileMime = mime;
      isDecodedFileImage = mime.startsWith('image/');
      decodedFileExt = mime.split('/')[1] || 'bin';
      if (decodedFileExt === 'jpeg') decodedFileExt = 'jpg';
    } catch {
      isDecodedFileValid = false;
    }
  }

  const handleDownloadDecodedFile = () => {
    if (!isDecodedFileValid || !decodedFileSrc) return;
    const link = document.createElement('a');
    link.href = decodedFileSrc;
    link.download = `decoded_file.${decodedFileExt}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const isImg = file.type.startsWith('image/');
      setIsImage(isImg);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setFileBase64(result);
        if (isImg) {
          setFilePreview(result);
        } else {
          setFilePreview(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCopy = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateShareText = () => {
    let str = isAr ? '*محول تشفير Base64:*\n\n' : '*Base64 Converter Tool:*\n\n';
    str += isAr ? `أداة بسيطة لتشفير وفك تشفير النصوص والصور بصيغة Base64.\n\nجربها هنا: ` : `A simple tool to encode and decode text and images in Base64.\n\nTry it here: `;
    return encodeURIComponent(str + window.location.href);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
      {/* Top AdSense */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm">
        <div className="text-[10px] uppercase tracking-widest mb-1">{t.adTop}</div>
        <p className="text-[10px]">{t.adTopDesc}</p>
      </div>

      <section className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl flex flex-col gap-6 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="text-center relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-400 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg text-white">
            <Braces size={32} />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">{t.subtitle}</p>
        </div>

        <div className="flex items-center gap-2 p-1 bg-slate-900/50 rounded-xl border border-white/5 max-w-md mx-auto w-full relative z-10 mt-2">
            <button
              onClick={() => setActiveTab('text')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-colors ${activeTab === 'text' ? 'bg-slate-800 text-fuchsia-400 shadow' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <FileCode size={16} />
              {t.tabText}
            </button>
            <button
              onClick={() => setActiveTab('file')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-colors ${activeTab === 'file' ? 'bg-slate-800 text-fuchsia-400 shadow' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <ImageIcon size={16} />
              {t.tabFile}
            </button>
        </div>

        <div className="relative z-10 mt-2 w-full max-w-4xl mx-auto">
           {activeTab === 'text' ? (
              <div className="flex flex-col md:flex-row gap-6 animate-in fade-in duration-300">
                {/* Text Input Side */}
                <div className="flex-1 flex flex-col gap-4">
                   <div className="flex items-center gap-2 p-1 bg-slate-800/80 rounded-xl border border-white/5 w-fit">
                     <button
                       onClick={() => setTextMode('encode')}
                       className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-colors ${textMode === 'encode' ? 'bg-fuchsia-600/20 text-fuchsia-400' : 'text-slate-400 hover:text-slate-200'}`}
                     >
                       <Lock size={14} />
                       {t.encodeStr}
                     </button>
                     <button
                       onClick={() => setTextMode('decode')}
                       className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-colors ${textMode === 'decode' ? 'bg-fuchsia-600/20 text-fuchsia-400' : 'text-slate-400 hover:text-slate-200'}`}
                     >
                       <Unlock size={14} />
                       {t.decodeStr}
                     </button>
                   </div>
                   
                   <textarea
                     value={inputText}
                     onChange={(e) => setInputText(e.target.value)}
                     placeholder={t.inputLabel}
                     className="w-full flex-1 min-h-[250px] bg-slate-900/50 border border-white/10 rounded-2xl p-4 text-sm text-slate-200 font-mono outline-none focus:ring-2 focus:ring-fuchsia-500/50 resize-y"
                     dir="ltr"
                   />
                </div>

                {/* Output Side */}
                <div className="flex-1 flex flex-col gap-2 relative">
                   <label className="text-sm font-medium text-slate-300 px-1 py-1">{t.outputLabel}</label>
                   
                   {isError ? (
                     <div className="w-full flex-1 min-h-[250px] bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 flex items-center justify-center text-rose-400 text-sm">
                       {t.errorDecode}
                     </div>
                   ) : (
                     <textarea
                       readOnly
                       value={textResult}
                       className="w-full flex-1 min-h-[250px] bg-[#1e1e1e] border border-white/10 rounded-2xl p-4 text-sm text-fuchsia-300 font-mono outline-none resize-y shadow-inner cursor-text"
                       dir="ltr"
                       placeholder="Result will appear here..."
                     />
                   )}
                   
                   {textResult && !isError && (
                     <button
                       onClick={() => handleCopy(textResult)}
                       className="absolute top-10 right-3 flex items-center justify-center gap-1.5 p-2 bg-slate-800/80 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors border border-white/10 shadow-lg backdrop-blur-md z-20"
                       title={t.copy}
                     >
                       {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                     </button>
                   )}
                </div>
              </div>
           ) : (
              <div className="flex flex-col gap-6 animate-in fade-in duration-300">
                <div className="flex items-center gap-2 p-1 bg-slate-800/80 rounded-xl border border-white/5 w-fit">
                  <button
                    onClick={() => setFileMode('encode')}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-colors ${fileMode === 'encode' ? 'bg-fuchsia-600/20 text-fuchsia-400' : 'text-slate-400 hover:text-slate-200'}`}
                  >
                    <Lock size={14} />
                    {t.fileEncodeStr}
                  </button>
                  <button
                    onClick={() => setFileMode('decode')}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-colors ${fileMode === 'decode' ? 'bg-fuchsia-600/20 text-fuchsia-400' : 'text-slate-400 hover:text-slate-200'}`}
                  >
                    <Unlock size={14} />
                    {t.fileDecodeStr}
                  </button>
                </div>

                {fileMode === 'encode' ? (
                  <>
                    {!fileBase64 ? (
                      <div className="w-full min-h-[250px] border-2 border-dashed border-white/20 rounded-2xl flex flex-col items-center justify-center text-slate-400 bg-slate-900/40 relative hover:bg-slate-900/60 transition-colors">
                         <input
                           type="file"
                           onChange={handleFileUpload}
                           className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                         />
                         <Upload size={48} strokeWidth={1} className="mb-4 opacity-50 text-fuchsia-400" />
                         <button className="px-6 py-3 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold rounded-xl shadow-lg flex items-center gap-2 transition-transform transform active:scale-95 mb-2 pointer-events-none">
                           {t.fileUpload}
                         </button>
                         <p className="text-sm font-medium">{t.dragDrop}</p>
                      </div>
                    ) : (
                      <div className="flex flex-col md:flex-row gap-6">
                         <div className="md:w-1/3 flex flex-col gap-4">
                            <div className="w-full bg-slate-900/80 rounded-2xl border border-white/5 p-4 flex flex-col items-center justify-center gap-3">
                               {isImage && filePreview ? (
                                 <img src={filePreview} alt="Preview" className="max-w-full max-h-48 rounded-lg object-contain shadow-md" />
                               ) : (
                                 <div className="w-24 h-24 bg-slate-800 rounded-xl flex items-center justify-center text-slate-500">
                                   <FileCode size={40} />
                                 </div>
                               )}
                               <span className="text-xs text-slate-400 truncate w-full text-center">{fileName}</span>
                               <button 
                                 onClick={() => { setFileBase64(''); setFilePreview(null); setFileName(''); setIsImage(false); }}
                                 className="text-xs text-fuchsia-400 hover:text-fuchsia-300"
                               >
                                 {t.uploadAnother}
                               </button>
                            </div>
                         </div>
                         <div className="flex-1 flex flex-col gap-2 relative">
                            <label className="text-sm font-medium text-slate-300 px-1">{t.fileOutput}</label>
                            <textarea
                              readOnly
                              value={fileBase64}
                              className="w-full flex-1 min-h-[250px] bg-[#1e1e1e] border border-white/10 rounded-2xl p-4 text-xs text-fuchsia-300 font-mono outline-none resize-y shadow-inner"
                              dir="ltr"
                            />
                            <button
                              onClick={() => handleCopy(fileBase64)}
                              className="absolute top-8 right-3 flex items-center justify-center gap-1.5 p-2 bg-slate-800/80 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors border border-white/10 shadow-lg backdrop-blur-md z-20"
                              title={t.copy}
                            >
                              {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                            </button>
                         </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 flex flex-col gap-2">
                       <label className="text-sm font-medium text-slate-300 px-1">{t.base64InputLabel}</label>
                       <textarea
                         value={base64FileInput}
                         onChange={(e) => setBase64FileInput(e.target.value)}
                         placeholder={t.base64InputLabel}
                         className="w-full flex-1 min-h-[250px] bg-slate-900/50 border border-white/10 rounded-2xl p-4 text-sm text-slate-200 font-mono outline-none focus:ring-2 focus:ring-fuchsia-500/50 resize-y whitespace-pre-wrap"
                         dir="ltr"
                         spellCheck="false"
                       />
                    </div>
                    
                    <div className="md:w-1/3 flex flex-col gap-4">
                       <div className="w-full h-full bg-slate-900/80 rounded-2xl border border-white/5 p-4 flex flex-col items-center justify-center gap-4 min-h-[250px]">
                          {base64FileInput.trim() ? (
                            isDecodedFileValid ? (
                              <>
                                {isDecodedFileImage ? (
                                  <img src={decodedFileSrc} alt="Decoded Preview" className="max-w-full max-h-48 rounded-lg object-contain shadow-md bg-[#1e1e1e]" />
                                ) : (
                                  <div className="w-24 h-24 bg-slate-800 rounded-xl flex items-center justify-center text-fuchsia-400">
                                    <FileCode size={40} />
                                  </div>
                                )}
                                <span className="text-xs text-slate-400">.{decodedFileExt.toUpperCase()} ({decodedFileMime})</span>
                                <button
                                  onClick={handleDownloadDecodedFile}
                                  className="w-full flex items-center justify-center gap-2 py-3 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold rounded-xl transition-all shadow-lg active:scale-95 mt-2"
                                >
                                  <Download size={16} />
                                  {t.downloadFile}
                                </button>
                              </>
                            ) : (
                              <div className="text-rose-400 text-sm text-center px-4">
                                {t.invalidBase64File}
                              </div>
                            )
                          ) : (
                            <div className="text-slate-500 text-sm text-center">
                              {t.filePreviewLabel}
                            </div>
                          )}
                       </div>
                    </div>
                  </div>
                )}
              </div>
           )}
        </div>
        
        <div className="hidden md:flex justify-center pt-4 relative z-10 w-full mt-2">
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
      </section>

      {/* Middle AdSense */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm my-2">
        <div className="text-[10px] uppercase tracking-widest mb-1">{t.adMiddle}</div>
        <p className="text-[10px]">{t.adMiddleDesc}</p>
      </div>

      <article className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col gap-4 text-[13px] text-slate-300 leading-relaxed shadow-lg">
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-2">
            <Info size={20} className="text-fuchsia-400"/>
            <h2 className="text-lg font-bold text-fuchsia-400">{t.aboutTitle}</h2>
        </div>
        <div className="space-y-4">
          <p>{t.aboutP1}</p>
        </div>
      </article>

    </div>
  );
}
