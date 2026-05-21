import React, { useState, useRef, useCallback, ChangeEvent } from 'react';
import { Share2, Info, Upload, Download, Crop, Smartphone, Instagram, Facebook, Twitter, Youtube, Image as ImageIcon, RefreshCw } from 'lucide-react';
import Cropper from 'react-easy-crop';
import type { Area } from 'react-easy-crop';

const translations = {
  ar: {
    title: "مغير مقاسات الصور للسوشيال ميديا",
    subtitle: "قص وتغيير أبعاد صورك لتناسب منصات التواصل الاجتماعي (إنستقرام، فيسبوك، يوتيوب، تويتر) بسهولة وبدقة.",
    uploadBtn: "رفع صورة",
    dragDrop: "أو اسحب وأفلت الصورة هنا",
    selectSize: "اختر المقاس المطلوب:",
    download: "تحميل الصورة",
    newImage: "صورة جديدة",
    preview: "المعاينة:",
    shareWhatsapp: "مشاركة الأداة",
    aboutTitle: "عن الأداة",
    aboutP1: "أداة سريعة لضبط أبعاد صورك لتلائم منصات التواصل الاجتماعي بدون تعقيدات. تتم عملية القص (Crop) وتغيير الحجم محلياً في متصفحك بشكل آمن عبر تقنية Canvas، ولن يتم رفع صورتك لأي خادم خارجي.",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)",
    dimensions: "الأبعاد:",
  },
  en: {
    title: "Social Media Image Resizer",
    subtitle: "Crop and resize your images to fit social media platforms (Instagram, Facebook, YouTube, Twitter) easily.",
    uploadBtn: "Upload Image",
    dragDrop: "or drag and drop image here",
    selectSize: "Select Size:",
    download: "Download Image",
    newImage: "New Image",
    preview: "Preview:",
    shareWhatsapp: "Share Tool",
    aboutTitle: "About The Tool",
    aboutP1: "A fast tool to adjust your image dimensions for social media platforms. The cropping and resizing process happens locally and securely within your browser using Canvas technology, ensuring your image is never uploaded to any external server.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)",
    dimensions: "Dimensions:",
  }
};

const socialSizes = [
  { id: 'insta-sq', platform: 'Instagram', nameEn: 'Square Post', nameAr: 'منشور مربع', width: 1080, height: 1080, icon: Instagram, color: 'text-pink-500', bg: 'bg-pink-500/20', activeBg: 'bg-pink-500/30' },
  { id: 'insta-port', platform: 'Instagram', nameEn: 'Portrait', nameAr: 'منشور طولي', width: 1080, height: 1350, icon: Instagram, color: 'text-pink-400', bg: 'bg-pink-400/20', activeBg: 'bg-pink-400/30' },
  { id: 'story', platform: 'Stories', nameEn: 'Story / Reel', nameAr: 'ستوري / ريلز', width: 1080, height: 1920, icon: Smartphone, color: 'text-purple-400', bg: 'bg-purple-400/20', activeBg: 'bg-purple-400/30' },
  { id: 'fb-cover', platform: 'Facebook', nameEn: 'Cover', nameAr: 'غلاف فيسبوك', width: 820, height: 312, icon: Facebook, color: 'text-blue-500', bg: 'bg-blue-500/20', activeBg: 'bg-blue-500/30' },
  { id: 'tw-header', platform: 'Twitter', nameEn: 'Header', nameAr: 'غلاف تويتر', width: 1500, height: 500, icon: Twitter, color: 'text-sky-400', bg: 'bg-sky-400/20', activeBg: 'bg-sky-400/30' },
  { id: 'yt-thumb', platform: 'YouTube', nameEn: 'Thumbnail', nameAr: 'صورة مصغرة', width: 1280, height: 720, icon: Youtube, color: 'text-red-500', bg: 'bg-red-500/20', activeBg: 'bg-red-500/30' },
];

export default function ImageResizer({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [selectedSizeId, setSelectedSizeId] = useState<string>('insta-sq');
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOriginalFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleDownload = async () => {
    if (!imageSrc || !croppedAreaPixels || !originalFile) return;
    const selected = socialSizes.find(s => s.id === selectedSizeId);
    if (!selected) return;

    try {
      const img = new Image();
      img.src = imageSrc;
      await new Promise(resolve => (img.onload = resolve));

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = selected.width;
      canvas.height = selected.height;

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.drawImage(
        img,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        canvas.width,
        canvas.height
      );

      const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
      const link = document.createElement('a');
      link.href = dataUrl;
      const originalName = originalFile.name.split('.')[0];
      const platformName = selected.platform.replace(/\s+/g, '-').toLowerCase();
      link.download = `${originalName}-${platformName}.jpg`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error(e);
    }
  };

  const resetAll = () => {
    setImageSrc(null);
    setOriginalFile(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
  };

  const generateShareText = () => {
    let str = isAr ? '*مغير مقاسات الصور للسوشيال ميديا:*\n\n' : '*Social Media Image Resizer:*\n\n';
    str += isAr ? `قص صورك لتناسب انستقرام ويوتيوب بدقة.\n\nجربها هنا: ` : `Crop your images to fit social media platforms perfectly.\n\nTry it here: `;
    return encodeURIComponent(str + window.location.href);
  };

  const activeSize = socialSizes.find(s => s.id === selectedSizeId);

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
      {/* Top AdSense */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm">
        <div className="text-[10px] uppercase tracking-widest mb-1">{t.adTop}</div>
        <p className="text-[10px]">{t.adTopDesc}</p>
      </div>

      <section className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl flex flex-col gap-6 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="text-center relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg text-white">
            <Crop size={32} />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">{t.subtitle}</p>
        </div>

        <div className="relative z-10 mt-4 flex flex-col gap-6 w-full">
          
          {!imageSrc ? (
            <div className="w-full max-w-3xl mx-auto min-h-[300px] border-2 border-dashed border-white/20 rounded-2xl flex flex-col items-center justify-center text-slate-400 bg-slate-900/40 relative hover:bg-slate-900/60 transition-colors">
               <input
                 type="file"
                 accept="image/*"
                 onChange={handleImageUpload}
                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
               />
               <ImageIcon size={48} strokeWidth={1} className="mb-4 opacity-50 text-indigo-400" />
               <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg flex items-center gap-2 transition-transform transform active:scale-95 mb-2 pointer-events-none">
                 <Upload size={18} />
                 {t.uploadBtn}
               </button>
               <p className="text-sm font-medium">{t.dragDrop}</p>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              
              {/* Controls */}
              <div className="flex-1 flex flex-col gap-6 max-w-sm w-full mx-auto lg:mx-0">
                <div className="flex flex-col gap-3">
                  <label className="text-sm font-bold text-slate-200">{t.selectSize}</label>
                  <div className="grid grid-cols-2 gap-3">
                    {socialSizes.map(size => {
                      const Icon = size.icon;
                      const isActive = selectedSizeId === size.id;
                      return (
                        <button
                          key={size.id}
                          onClick={() => setSelectedSizeId(size.id)}
                          className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all text-center ${
                            isActive 
                              ? `border-indigo-500/50 bg-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.15)]` 
                              : `border-white/5 bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-slate-200`
                          }`}
                        >
                           <div className={`p-2 rounded-lg ${isActive ? size.bg : 'bg-slate-700/50'} ${isActive ? size.color : 'text-slate-400'}`}>
                              <Icon size={20} />
                           </div>
                           <div>
                             <p className={`text-xs font-bold ${isActive ? 'text-slate-200' : 'text-slate-400'}`}>
                                {isAr ? size.nameAr : size.nameEn}
                             </p>
                             <p className="text-[10px] text-slate-500 font-mono mt-1">
                                {size.width} x {size.height}
                             </p>
                           </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="flex flex-col gap-3 mt-auto">
                   <button 
                     onClick={handleDownload}
                     className="w-full flex items-center justify-center gap-2 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg active:scale-95"
                   >
                     <Download size={18} />
                     {t.download}
                   </button>
                   <button 
                     onClick={resetAll}
                     className="w-full px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl transition-all shadow-lg active:scale-95 flex justify-center"
                   >
                     {t.newImage}
                   </button>
                </div>
              </div>

              {/* Preview */}
              <div className="flex-[2] flex flex-col gap-3">
                 <div className="flex justify-between items-center px-1">
                    <label className="text-sm font-bold text-slate-200">{t.preview}</label>
                    {activeSize && (
                      <span className="text-xs font-mono bg-slate-800 px-2 py-1 rounded text-slate-300">
                        {t.dimensions} {activeSize.width} x {activeSize.height}
                      </span>
                    )}
                 </div>
                 
                 <div className="w-full min-h-[300px] h-[400px] md:h-[500px] bg-slate-900/80 rounded-2xl border border-white/5 overflow-hidden shadow-inner p-4 relative checkerboard-bg">
                    <style>{`
                      .checkerboard-bg {
                        background-image: linear-gradient(45deg, #1e293b 25%, transparent 25%), linear-gradient(-45deg, #1e293b 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1e293b 75%), linear-gradient(-45deg, transparent 75%, #1e293b 75%);
                        background-size: 20px 20px;
                        background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
                      }
                    `}</style>
                    
                    <div className="absolute inset-4 rounded-xl overflow-hidden bg-black/50">
                      <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={activeSize ? activeSize.width / activeSize.height : 1}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                        objectFit="contain"
                      />
                    </div>
                 </div>
              </div>

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
            <Info size={20} className="text-indigo-400"/>
            <h2 className="text-lg font-bold text-indigo-400">{t.aboutTitle}</h2>
        </div>
        <div className="space-y-4">
          <p>{t.aboutP1}</p>
        </div>
      </article>

    </div>
  );
}
