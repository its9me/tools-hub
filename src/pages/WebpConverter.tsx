import React, { useState, useRef, ChangeEvent } from 'react';
import { Image as ImageIcon, Share2, Info, Upload, Download, Settings2, RefreshCw } from 'lucide-react';

const translations = {
  ar: {
    title: "محول الصور إلى WebP",
    subtitle: "قم بتحويل صور PNG و JPG إلى صيغة WebP الحديثة والمضغوطة لتقليل حجمها وتسريع موقعك.",
    uploadBtn: "رفع صورة",
    dragDrop: "أو اسحب وأفلت الصورة هنا",
    quality: "جودة الصورة المنتجة (Quality)",
    convert: "تحويل إلى WebP",
    download: "تحميل الصورة",
    newImage: "صورة جديدة",
    originalSize: "الحجم الأصلي:",
    newSize: "الحجم الجديد:",
    shareWhatsapp: "مشاركة الأداة",
    aboutTitle: "عن الأداة",
    aboutP1: "صيغة WebP هي امتداد للصور تم تطويره بواسطة جوجل، يقدم ضغطاً فائقاً مع الحفاظ على جودة عالية مقارنة بصيغ PNG و JPEG. هذه الأداة تقوم بتحويل صورك محلياً في متصفحك (Client-side) عن طريق تقنية Canvas، بدون الحاجة لرفعها إلى أي خوادم خارجية، مما يعني سرعة وخصوصية تامة.",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)"
  },
  en: {
    title: "Image to WebP Converter",
    subtitle: "Convert PNG and JPG images to the modern, compressed WebP format to reduce file size and speed up your site.",
    uploadBtn: "Upload Image",
    dragDrop: "or drag and drop image here",
    quality: "Output Quality",
    convert: "Convert to WebP",
    download: "Download Image",
    newImage: "New Image",
    originalSize: "Original Size:",
    newSize: "New Size:",
    shareWhatsapp: "Share Tool",
    aboutTitle: "About The Tool",
    aboutP1: "WebP is an image format developed by Google that provides superior compression while maintaining high quality compared to PNG and JPEG. This tool converts your images locally in your browser using Canvas technology, without needing to upload them to any external servers, ensuring speed and absolute privacy.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)"
  }
};

const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export default function WebpConverter({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [webpDataUrl, setWebpDataUrl] = useState<string | null>(null);
  const [webpSize, setWebpSize] = useState<number | null>(null);
  const [quality, setQuality] = useState<number>(0.8);
  const [isConverting, setIsConverting] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOriginalFile(file);
      setWebpDataUrl(null);
      setWebpSize(null);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const convertToWebp = () => {
    if (!imageSrc || !canvasRef.current) return;
    setIsConverting(true);
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      ctx?.drawImage(img, 0, 0);
      
      const dataUrl = canvas.toDataURL('image/webp', quality);
      setWebpDataUrl(dataUrl);
      
      // Calculate approximate size from base64 (string length * 3/4)
      const sizeInBytes = Math.round((dataUrl.length - 'data:image/webp;base64,'.length) * 3 / 4);
      setWebpSize(sizeInBytes);
      
      setIsConverting(false);
    };
    img.src = imageSrc;
  };

  const handleDownload = () => {
    if (!webpDataUrl || !originalFile) return;
    const link = document.createElement('a');
    link.href = webpDataUrl;
    
    const originalName = originalFile.name.split('.')[0];
    link.download = `${originalName}.webp`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetAll = () => {
    setImageSrc(null);
    setOriginalFile(null);
    setWebpDataUrl(null);
    setWebpSize(null);
  };

  const generateShareText = () => {
    let str = isAr ? '*محول الصور إلى WebP:*\n\n' : '*Image to WebP Converter:*\n\n';
    str += isAr ? `أداة مجانية وسريعة لتقليل حجم الصور وتحويلها لصيغة ويب بي.\n\nجربها هنا: ` : `A free and fast tool to reduce image size and convert to WebP.\n\nTry it here: `;
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
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="text-center relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg text-white">
            <RefreshCw size={32} />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">{t.subtitle}</p>
        </div>

        {/* Hidden Canvas for Processing */}
        <canvas ref={canvasRef} className="hidden" />

        <div className="relative z-10 mt-4 flex flex-col gap-6 max-w-3xl mx-auto w-full">
          
          {!imageSrc ? (
            <div className="w-full flex-1 min-h-[300px] border-2 border-dashed border-white/20 rounded-2xl flex flex-col items-center justify-center text-slate-400 bg-slate-900/40 relative hover:bg-slate-900/60 transition-colors">
               <input
                 type="file"
                 accept="image/png, image/jpeg, image/jpg"
                 onChange={handleImageUpload}
                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
               />
               <ImageIcon size={48} strokeWidth={1} className="mb-4 opacity-50 text-orange-400" />
               <button className="px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl shadow-lg flex items-center gap-2 transition-transform transform active:scale-95 mb-2 pointer-events-none">
                 <Upload size={18} />
                 {t.uploadBtn}
               </button>
               <p className="text-sm font-medium">{t.dragDrop}</p>
               <p className="text-xs text-slate-500 mt-2">يدعم PNG و JPG</p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                 
                 <div className="flex-1 w-full flex flex-col gap-3">
                    <div className="w-full aspect-video bg-slate-900/80 rounded-2xl border border-white/5 overflow-hidden shadow-inner flex items-center justify-center p-2 relative group">
                       <img src={imageSrc} alt="Original" className="max-w-full max-h-full object-contain rounded-lg" />
                    </div>
                    {originalFile && (
                      <div className="flex justify-between items-center px-2">
                        <span className="text-sm text-slate-400 truncate max-w-[200px]">{originalFile.name}</span>
                        <span className="text-sm font-bold text-slate-300">{formatBytes(originalFile.size)}</span>
                      </div>
                    )}
                 </div>

                 {webpDataUrl && (
                   <div className="flex-1 w-full flex flex-col gap-3">
                      <div className="w-full aspect-video bg-slate-900/80 rounded-2xl border border-white/5 overflow-hidden shadow-inner flex items-center justify-center p-2">
                         <img src={webpDataUrl} alt="WebP Output" className="max-w-full max-h-full object-contain rounded-lg" />
                      </div>
                      <div className="flex justify-between items-center px-2">
                        <span className="text-sm text-green-400 font-medium">output.webp</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-500">
                             {originalFile && webpSize && (
                               `(وفرت ${Math.max(0, Math.round(100 - (webpSize / originalFile.size * 100)))}%)`
                             )}
                          </span>
                          <span className="text-sm font-bold text-green-400">{webpSize ? formatBytes(webpSize) : ''}</span>
                        </div>
                      </div>
                   </div>
                 )}
              </div>

              {!webpDataUrl ? (
                <div className="p-6 bg-slate-900/50 rounded-2xl border border-white/5 flex flex-col gap-6">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <label className="text-sm font-medium text-slate-300 flex items-center gap-2"><Settings2 size={16} className="text-orange-400"/> {t.quality}</label>
                      <span className="text-lg font-bold text-orange-400">{Math.round(quality * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="1"
                      step="0.05"
                      value={quality}
                      onChange={(e) => setQuality(parseFloat(e.target.value))}
                      className="w-full accent-orange-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                      style={{ direction: 'ltr' }}
                    />
                  </div>

                  <div className="flex gap-3 mt-2">
                    <button 
                      onClick={resetAll}
                      className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl transition-all shadow-lg active:scale-95"
                    >
                      إلغاء
                    </button>
                    <button 
                      onClick={convertToWebp}
                      disabled={isConverting}
                      className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl transition-all shadow-lg active:scale-95 disabled:opacity-50"
                    >
                      <RefreshCw size={18} className={isConverting ? 'animate-spin' : ''} />
                      {t.convert}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-3 justify-center mt-2">
                  <button 
                    onClick={resetAll}
                    className="flex-1 sm:flex-none px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl transition-all shadow-lg active:scale-95 flex justify-center"
                  >
                    {t.newImage}
                  </button>
                  <button 
                    onClick={handleDownload}
                    className="flex-[2] sm:flex-none sm:w-64 flex items-center justify-center gap-2 py-3.5 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-all shadow-lg active:scale-95"
                  >
                    <Download size={18} />
                    {t.download}
                  </button>
                </div>
              )}

            </div>
          )}

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
            <Info size={20} className="text-orange-400"/>
            <h2 className="text-lg font-bold text-orange-400">{t.aboutTitle}</h2>
        </div>
        <div className="space-y-4">
          <p>{t.aboutP1}</p>
        </div>
      </article>

    </div>
  );
}
