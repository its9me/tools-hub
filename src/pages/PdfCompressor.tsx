import React, { useState, useRef, useEffect } from 'react';
import { Upload, Download, Settings, AlertTriangle, FileText, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
// @ts-ignore
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { jsPDF } from 'jspdf';

// Setup pdf.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

export default function PdfCompressor({ lang }: { lang: 'ar' | 'en' }) {
  const isAr = lang === 'ar';
  
  // State
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(0.5); // 0.1 to 1.0 mapping linearly to UI
  const [scale, setScale] = useState(1.5); // Render scale
  const [isCompressing, setIsCompressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setOriginalSize(selectedFile.size);
      setCompressedUrl(null);
      setCompressedSize(0);
      setProgress(0);
      setError(null);
    } else if (selectedFile) {
      setError(isAr ? 'يرجى اختيار ملف PDF صحيح.' : 'Please select a valid PDF file.');
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
      setOriginalSize(droppedFile.size);
      setCompressedUrl(null);
      setCompressedSize(0);
      setProgress(0);
      setError(null);
    } else {
      setError(isAr ? 'يرجى اختيار ملف PDF صحيح.' : 'Please select a valid PDF file.');
    }
  };

  const compressPdf = async () => {
    if (!file) return;
    setIsCompressing(true);
    setProgress(0);
    setError(null);
    setCompressedUrl(null);
    setCompressedSize(0);
    
    try {
      const fileBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: fileBuffer }).promise;
      const totalPages = pdf.numPages;
      let newPdf: jsPDF | null = null;

      for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i);
        
        // Base viewport for physical dimensions (1 pt = 1/72 inch, 25.4 mm = 1 inch)
        const baseViewport = page.getViewport({ scale: 1.0 });
        const mmWidth = (baseViewport.width * 25.4) / 72;
        const mmHeight = (baseViewport.height * 25.4) / 72;
        
        // Render viewport with user-selected rendering scale
        // Higher scale = sharper text, but higher file size
        const renderViewport = page.getViewport({ scale: scale });
        const canvas = document.createElement('canvas');
        
        // Handling High DPI or large limits gracefully
        canvas.width = Math.floor(renderViewport.width);
        canvas.height = Math.floor(renderViewport.height);
        
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error("No canvas context");
        
        // Draw white background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        await page.render({ canvasContext: ctx, viewport: renderViewport }).promise;
        
        // Convert to highly compressed JPEG
        const imgData = canvas.toDataURL('image/jpeg', quality);
        
        if (i === 1) {
          newPdf = new jsPDF({
            orientation: mmWidth > mmHeight ? 'l' : 'p',
            unit: 'mm',
            format: [mmWidth, mmHeight]
          });
        } else if (newPdf) {
          newPdf.addPage([mmWidth, mmHeight], mmWidth > mmHeight ? 'l' : 'p');
        }
        
        if (newPdf) {
          newPdf.addImage(imgData, 'JPEG', 0, 0, mmWidth, mmHeight);
        }
        
        setProgress(Math.round((i / totalPages) * 100));
      }

      if (newPdf) {
        const pdfBlob = newPdf.output('blob');
        setCompressedSize(pdfBlob.size);
        setCompressedUrl(URL.createObjectURL(pdfBlob));
      }
    } catch (err: any) {
      console.error(err);
      setError(isAr ? 'حدث خطأ أثناء معالجة الملف، ربما الملف محمي بكلمة مرور أو تالف.' : 'An error occurred. The file might be password-protected or corrupted.');
    } finally {
      setIsCompressing(false);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const calculateReduction = () => {
    if (originalSize === 0 || compressedSize === 0) return 0;
    return Math.round(((originalSize - compressedSize) / originalSize) * 100);
  };

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto w-full gap-8">
      <div className="w-full text-center space-y-3">
        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-rose-600">
          {isAr ? 'ضاغط ومحسن ملفات PDF' : 'PDF Compressor'}
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
          {isAr 
            ? 'قم بضغط ملفات والسير الذاتية ذات الحجم الكبير لتصبح مناسبة للرفع على منصات التوظيف والجهات الحكومية بشكل آمن داخل متصفحك دون رفعها لسيرفرات.' 
            : 'Compress large CVs and documents securely in your browser without uploading to any servers.'}
        </p>
      </div>

      <div className="bg-amber-500/10 border border-amber-500/20 text-amber-200/90 rounded-xl p-4 flex gap-3 text-xs md:text-sm max-w-2xl w-full mx-auto">
        <AlertTriangle className="shrink-0 text-amber-500" size={20} />
        <p>
          {isAr 
            ? 'تنويه: هذه الأداة تقوم بتحويل صفحات الـ PDF إلى صور مضغوطة عالية الجودة لتقليل الحجم. هذا يعني أنه لن يكون من الممكن تحديد النصوص داخل الملف الناتج.'
            : 'Note: This tool converts PDF pages to highly compressed images to reduce size. Text will no longer be selectable in the output PDF.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {/* Upload & Controls */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col gap-6">
          <div 
            className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300
              ${file ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-slate-700 hover:border-blue-500/50 hover:bg-white/5'}`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
            />
            
            {file ? (
              <>
                <FileText className="text-emerald-400 mb-3" size={48} />
                <h3 className="text-slate-200 font-medium truncate max-w-full px-4 mb-2">{file.name}</h3>
                <span className="text-xs text-slate-500 bg-slate-800 px-3 py-1 rounded-full">
                  {formatSize(originalSize)}
                </span>
                <p className="text-xs text-slate-400 mt-4">{isAr ? 'اضغط لتغيير الملف' : 'Click to change file'}</p>
              </>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mb-4">
                  <Upload className="text-blue-400" size={32} />
                </div>
                <h3 className="text-slate-200 font-medium mb-2">
                  {isAr ? 'اسحب وأفلت الملف هنا' : 'Drag & drop your file here'}
                </h3>
                <p className="text-slate-400 text-sm mb-4">
                  {isAr ? 'أو اضغط لاختيار ملف (PDF)' : 'Or click to select a file (PDF)'}
                </p>
              </>
            )}
          </div>

          <div className="space-y-5">
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300 font-medium flex items-center gap-2">
                  <Settings size={16} className="text-slate-400" />
                  {isAr ? 'مستوى ضغط جودة الصور:' : 'Image Quality Level:'}
                </span>
                <span className="text-blue-400 font-mono">{Math.round(quality * 100)}%</span>
              </div>
              <input 
                type="range" 
                min="0.1" max="1" step="0.1" 
                value={quality} 
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                className="w-full accent-blue-500"
                disabled={isCompressing}
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300 font-medium flex items-center gap-2">
                  <Settings size={16} className="text-slate-400" />
                  {isAr ? 'حدة الخطوط والتفاصيل (Scale):' : 'Detail & Text Sharpness (Scale):'}
                </span>
                <span className="text-blue-400 font-mono">{scale}x</span>
              </div>
              <input 
                type="range" 
                min="0.5" max="3" step="0.25" 
                value={scale} 
                onChange={(e) => setScale(parseFloat(e.target.value))}
                className="w-full accent-emerald-500"
                disabled={isCompressing}
              />
              <p className="text-[11px] text-slate-500">
                {isAr ? 'رفع الدقة يحافظ على الحروف لكن يزيد حجم الملف.' : 'Higher scale preserves letters but increases file size.'}
              </p>
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-400 bg-red-400/10 p-3 rounded-xl border border-red-400/20">
              {error}
            </div>
          )}

          <button
            onClick={compressPdf}
            disabled={!file || isCompressing}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all
              ${!file || isCompressing ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/25'}`}
          >
            {isCompressing ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                {isAr ? `جاري الضغط... ${progress}%` : `Compressing... ${progress}%`}
              </>
            ) : (
              isAr ? 'بدء الضغط الآن' : 'Start Compression'
            )}
          </button>
        </div>

        {/* Results */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-emerald-500/20 rounded-3xl p-6 flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-200 border-b border-white/10 pb-4">
              {isAr ? 'النتيجة بعد الضغط' : 'Compression Result'}
            </h3>

            {compressedUrl ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="p-6 bg-slate-800/50 rounded-2xl border border-white/5 space-y-6">
                   
                   <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-1 items-center bg-slate-950 px-4 py-3 rounded-xl">
                        <span className="text-xs text-slate-500">{isAr ? 'الحجم الأصلي' : 'Original Size'}</span>
                        <span className="text-slate-300 font-mono line-through opacity-70">{formatSize(originalSize)}</span>
                      </div>
                      
                      <ArrowRight size={20} className="text-slate-600" />
                      
                      <div className="flex flex-col gap-1 items-center bg-emerald-500/10 px-4 py-3 rounded-xl border border-emerald-500/20">
                        <span className="text-xs text-emerald-500 font-medium">{isAr ? 'الحجم الجديد' : 'New Size'}</span>
                        <span className="text-emerald-400 font-bold font-mono">{formatSize(compressedSize)}</span>
                      </div>
                   </div>

                   <div className="flex items-center justify-center gap-2 text-emerald-400 font-medium bg-emerald-400/5 py-2 rounded-lg border border-emerald-400/10">
                     <CheckCircle2 size={18} />
                     {isAr ? `تم توفير نسبة ${calculateReduction()}%` : `Saved ${calculateReduction()}%`}
                   </div>

                   {compressedSize > 2000000 && (
                      <p className="text-xs text-center text-amber-400/80 bg-amber-400/5 py-2 rounded-lg">
                        {isAr ? 'يفضل تقليل جودة الصور أو دقة الخطوط للوصول لأقل من 2MB' : 'Try lowering Quality or Scale to reach < 2MB'}
                      </p>
                   )}
                </div>

                <a 
                  href={compressedUrl}
                  download={`compressed-${file?.name || 'document.pdf'}`}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/20"
                >
                  <Download size={20} />
                  {isAr ? 'تحميل الملف المضغوط' : 'Download Compressed PDF'}
                </a>
              </div>
            ) : (
               <div className="h-full flex flex-col items-center justify-center text-slate-500 gap-4 py-12">
                  <div className="w-20 h-20 rounded-full bg-slate-800/50 flex items-center justify-center">
                     <CheckCircle2 size={32} className="opacity-20" />
                  </div>
                  <p>{isAr ? 'ستظهر النتيجة هنا بعد الضغط' : 'Result will appear here'}</p>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
