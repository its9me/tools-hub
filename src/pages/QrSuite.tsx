import React, { useState, useRef, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Html5Qrcode } from 'html5-qrcode';
import { 
  QrCode, Camera, Link as LinkIcon, Wifi, Type, Download, 
  Palette, Image as ImageIcon, Copy, CheckCircle2, RotateCcw,
  StopCircle
} from 'lucide-react';

export default function QrSuite({ lang }: { lang: 'ar' | 'en' }) {
  const isAr = lang === 'ar';
  
  const [activeTab, setActiveTab] = useState<'generate' | 'scan'>('generate');
  
  // Generate State
  const [genType, setGenType] = useState<'text' | 'wifi'>('text');
  const [textValue, setTextValue] = useState('');
  
  // Wifi State
  const [wifiSsid, setWifiSsid] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');
  const [wifiEncryption, setWifiEncryption] = useState('WPA');
  const [wifiHidden, setWifiHidden] = useState(false);
  
  // Style State
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  
  // Scan State
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  const scannerRef = useRef<Html5Qrcode | null>(null);

  // Clean up scanner on unmount
  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  const getQRValue = () => {
    if (genType === 'text') return textValue;
    if (genType === 'wifi') {
      const escape = (str: string) => str.replace(/([\\;:"])/g, '\\$1');
      return `WIFI:T:${wifiEncryption};S:${escape(wifiSsid)};P:${escape(wifiPassword)};H:${wifiHidden};;`;
    }
    return '';
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogoUrl(url);
    }
  };

  const downloadQR = () => {
    const canvas = document.getElementById('qr-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    
    // Add padding to the downloaded image to make it look nicer
    const paddedCanvas = document.createElement('canvas');
    const padding = 20;
    paddedCanvas.width = canvas.width + padding * 2;
    paddedCanvas.height = canvas.height + padding * 2;
    const ctx = paddedCanvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, paddedCanvas.width, paddedCanvas.height);
      ctx.drawImage(canvas, padding, padding);
    }

    const pngUrl = paddedCanvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'qrcode.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const startScanner = async () => {
    try {
      setScanError(null);
      setScanResult(null);
      setIsScanning(true);
      
      const html5QrCode = new Html5Qrcode("reader");
      scannerRef.current = html5QrCode;
      
      await html5QrCode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
        },
        (decodedText) => {
          setScanResult(decodedText);
          stopScanner();
        },
        (errorMessage) => {
          // Ignore frequent frame errors
        }
      );
    } catch (err: any) {
      setScanError(isAr ? 'عذراً، لا يمكن الوصول للكاميرا. يرجى التأكد من إعطاء الصلاحيات.' : 'Camera access denied. Please grant permissions.');
      setIsScanning(false);
      console.error(err);
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
      } catch (err) {
        console.error("Failed to stop scanner", err);
      }
      scannerRef.current = null;
    }
    setIsScanning(false);
  };

  const copyResult = () => {
    if (scanResult) {
      navigator.clipboard.writeText(scanResult);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto w-full gap-8">
      {/* Top AdSense */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm">
        <div className="text-[10px] uppercase tracking-widest mb-1">{isAr ? 'مساحة إعلانية' : 'AdSense Ad'}</div>
        <p className="text-[10px]">{isAr ? 'AD_SPACE_728x90 (أعلى)' : 'AD_SPACE_728x90 (Top)'}</p>
      </div>
      <div className="w-full text-center space-y-3">
        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-emerald-500">
          {isAr ? 'أداة QR الشاملة' : 'All-in-One QR Suite'}
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
          {isAr 
            ? 'قم بتوليد رموز QR مخصصة للمقاطع، الروابط، وشبكات الواي فاي بسهولة، أو امسح أي رمز باستخدام كاميرا جهازك مباشرة.' 
            : 'Generate custom QR codes for links, text, and Wi-Fi, or scan existing codes directly using your device camera.'}
        </p>
      </div>

      {/* Main Tabs */}
      <div className="flex p-1 bg-slate-800/50 rounded-xl max-w-md w-full">
        <button
          onClick={() => { setActiveTab('generate'); stopScanner(); }}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'generate' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'
          }`}
        >
          <QrCode size={18} />
          {isAr ? 'إنشاء QR' : 'Generate QR'}
        </button>
        <button
          onClick={() => setActiveTab('scan')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'scan' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Camera size={18} />
          {isAr ? 'مسح QR' : 'Scan QR'}
        </button>
      </div>

      {activeTab === 'generate' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          {/* Controls */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col gap-6">
            
            {/* Generate Type Tabs */}
            <div className="flex gap-2 border-b border-white/10 pb-4">
               <button
                 onClick={() => setGenType('text')}
                 className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
                   genType === 'text' ? 'bg-white/10 text-emerald-400 font-bold' : 'text-slate-400 hover:bg-white/5'
                 }`}
               >
                 <Type size={16} />
                 {isAr ? 'نص / رابط' : 'Text / URL'}
               </button>
               <button
                 onClick={() => setGenType('wifi')}
                 className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
                   genType === 'wifi' ? 'bg-white/10 text-emerald-400 font-bold' : 'text-slate-400 hover:bg-white/5'
                 }`}
               >
                 <Wifi size={16} />
                 {isAr ? 'شبكة Wi-Fi' : 'Wi-Fi Network'}
               </button>
            </div>

            {/* Inputs based on type */}
            <div className="space-y-4">
              {genType === 'text' ? (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    {isAr ? 'أدخل النص أو الرابط' : 'Enter Text or URL'}
                  </label>
                  <textarea
                    value={textValue}
                    onChange={(e) => setTextValue(e.target.value)}
                    placeholder={isAr ? 'https://example.com أو أي نص...' : 'https://example.com or any text...'}
                    className={`w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 min-h-[120px] resize-y ${
                      textValue ? 'border-emerald-500/50' : ''
                    }`}
                    dir="auto"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      {isAr ? 'اسم الشبكة (SSID)' : 'Network Name (SSID)'}
                    </label>
                    <input
                      type="text"
                      value={wifiSsid}
                      onChange={(e) => setWifiSsid(e.target.value)}
                      placeholder={isAr ? 'اسم الواي فاي الخاص بك' : 'Your WiFi Name'}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-emerald-500"
                      dir="auto"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      {isAr ? 'كلمة المرور' : 'Password'}
                    </label>
                    <input
                      type="text"
                      value={wifiPassword}
                      onChange={(e) => setWifiPassword(e.target.value)}
                      placeholder={isAr ? 'اتركه فارغاً إن لم يكن هناك رقم سري' : 'Leave empty if no password'}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        {isAr ? 'نوع الحماية' : 'Encryption'}
                      </label>
                      <select
                        value={wifiEncryption}
                        onChange={(e) => setWifiEncryption(e.target.value)}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-emerald-500 appearance-none"
                      >
                        <option value="WPA">WPA/WPA2</option>
                        <option value="WEP">WEP</option>
                        <option value="nopass">None</option>
                      </select>
                    </div>
                    <div className="flex items-end pb-3">
                      <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-300">
                        <input
                          type="checkbox"
                          checked={wifiHidden}
                          onChange={(e) => setWifiHidden(e.target.checked)}
                          className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-900"
                        />
                        {isAr ? 'شبكة مخفية' : 'Hidden Network'}
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Customization Options */}
            <div className="pt-4 border-t border-white/10 space-y-4">
              <h4 className="text-sm font-bold text-slate-400">{isAr ? 'التخصيص (اختياري)' : 'Customization (Optional)'}</h4>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[120px]">
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    {isAr ? 'لون الرمز' : 'Foreground'}
                  </label>
                  <div className="flex items-center gap-2 bg-slate-950 border border-white/10 p-2 rounded-lg">
                    <input 
                      type="color" 
                      value={fgColor} 
                      onChange={(e) => setFgColor(e.target.value)}
                      className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent p-0"
                    />
                    <span className="text-xs text-slate-300 font-mono uppercase">{fgColor}</span>
                  </div>
                </div>
                
                <div className="flex-1 min-w-[120px]">
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    {isAr ? 'لون الخلفية' : 'Background'}
                  </label>
                  <div className="flex items-center gap-2 bg-slate-950 border border-white/10 p-2 rounded-lg">
                    <input 
                      type="color" 
                      value={bgColor} 
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent p-0"
                    />
                    <span className="text-xs text-slate-300 font-mono uppercase">{bgColor}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">
                  {isAr ? 'إضافة شعار (Logo) في المنتصف' : 'Add Logo in center'}
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-white/5 rounded-lg cursor-pointer transition-colors text-sm text-slate-300">
                    <ImageIcon size={16} />
                    {isAr ? 'اختر صورة' : 'Choose Image'}
                    <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                  </label>
                  {logoUrl && (
                    <button 
                      onClick={() => setLogoUrl(null)}
                      className="text-xs text-red-400 hover:text-red-300 px-3 py-2"
                    >
                      {isAr ? 'إزالة' : 'Remove'}
                    </button>
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* Result Preview */}
          <div className="bg-white rounded-3xl p-8 flex flex-col items-center justify-center relative shadow-xl overflow-hidden min-h-[400px]">
             {/* Decorative grid background for contrast */}
             <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:20px_20px]" />
             
             <div className="relative z-10 flex flex-col items-center gap-8 w-full">
                
                <div className={`p-4 rounded-xl shadow-sm transition-transform duration-300 ${!getQRValue() ? 'opacity-20 scale-95 blur-sm' : 'opacity-100 scale-100 bg-white'}`}>
                  <QRCodeCanvas
                    id="qr-canvas"
                    value={getQRValue() || 'https://example.com'}
                    size={240}
                    fgColor={fgColor}
                    bgColor={bgColor}
                    level="H"
                    includeMargin={false}
                    imageSettings={logoUrl ? {
                      src: logoUrl,
                      height: 48,
                      width: 48,
                      excavate: true,
                    } : undefined}
                  />
                </div>

                {!getQRValue() ? (
                  <p className="text-slate-400 text-center font-medium">
                    {isAr ? 'أدخل البيانات ليتم توليد الرمز' : 'Enter data to generate QR code'}
                  </p>
                ) : (
                  <button
                    onClick={downloadQR}
                    className="w-full max-w-xs py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
                  >
                    <Download size={20} />
                    {isAr ? 'تحميل (PNG)' : 'Download (PNG)'}
                  </button>
                )}
             </div>
          </div>
        </div>
      )}

      {activeTab === 'scan' && (
        <div className="w-full max-w-2xl bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4">
          
          {!isScanning && !scanResult && (
            <div className="flex flex-col items-center text-center p-12 py-16 gap-4 border-2 border-dashed border-white/10 rounded-2xl bg-black/20">
              <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex flex-col items-center justify-center text-emerald-400 mb-2">
                 <Camera size={36} />
              </div>
              <h3 className="text-xl font-bold text-slate-200">
                {isAr ? 'أعطِ الصلاحية للكاميرا لمسح الرمز' : 'Grant Camera Access to Scan'}
              </h3>
              <p className="text-slate-400 text-sm max-w-md">
                {isAr ? 'يتم قراءة الرمز محلياً داخل المتصفح، لا يتم إرسال أي صور لأي سيرفر' : 'Scanning is done locally in your browser. No images are sent to any server.'}
              </p>
              <button
                onClick={startScanner}
                className="mt-4 px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/20 transition-all"
              >
                {isAr ? 'تشغيل الكاميرا' : 'Start Camera'}
              </button>
              
              {scanError && (
                <p className="text-red-400 text-sm mt-4 p-3 bg-red-400/10 rounded-lg">{scanError}</p>
              )}
            </div>
          )}

          {isScanning && (
            <div className="space-y-4">
              <div className="flex justify-between items-center px-2">
                <span className="text-emerald-400 animate-pulse text-sm font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  {isAr ? 'جاري البحث عن كود...' : 'Scanning for QR code...'}
                </span>
                <button 
                  onClick={stopScanner}
                  className="text-red-400 hover:text-red-300 flex items-center gap-1 text-sm bg-red-400/10 px-3 py-1.5 rounded-lg"
                >
                  <StopCircle size={16} />
                  {isAr ? 'إيقاف' : 'Stop'}
                </button>
              </div>
              
              <div className="relative rounded-2xl overflow-hidden bg-black aspect-square max-w-sm mx-auto shadow-2xl border-4 border-emerald-500/50">
                <div id="reader" className="w-full h-full" />
                
                {/* Aim guides */}
                <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8">
                   <div className="flex justify-between">
                     <div className="w-8 h-8 border-t-4 border-l-4 border-emerald-500 rounded-tl-lg" />
                     <div className="w-8 h-8 border-t-4 border-r-4 border-emerald-500 rounded-tr-lg" />
                   </div>
                   <div className="flex justify-between">
                     <div className="w-8 h-8 border-b-4 border-l-4 border-emerald-500 rounded-bl-lg" />
                     <div className="w-8 h-8 border-b-4 border-r-4 border-emerald-500 rounded-br-lg" />
                   </div>
                </div>
              </div>
            </div>
          )}

          {scanResult && (
            <div className="flex flex-col items-center text-center p-8 gap-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex flex-col items-center justify-center text-emerald-400">
                 <CheckCircle2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-100">
                {isAr ? 'تم قراءة الرمز بنجاح!' : 'QR Code Scanned!'}
              </h3>
              
              <div className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 mt-2 mb-2 break-all text-slate-300 font-mono text-left">
                {scanResult}
              </div>
              
              <div className="flex flex-wrap items-center justify-center gap-3 w-full">
                <button
                  onClick={copyResult}
                  className="flex-1 min-w-[140px] py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-all border border-white/10"
                >
                  {copied ? <CheckCircle2 size={18} className="text-emerald-400" /> : <Copy size={18} />}
                  {copied ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ النص' : 'Copy Text')}
                </button>
                
                {scanResult.startsWith('http') && (
                  <a
                    href={scanResult}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[140px] py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-all"
                  >
                    <LinkIcon size={18} />
                    {isAr ? 'فتح الرابط' : 'Open Link'}
                  </a>
                )}
                
                <button
                  onClick={() => setScanResult(null)}
                  className="flex-1 min-w-[140px] py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <RotateCcw size={18} />
                  {isAr ? 'مسح رمز آخر' : 'Scan Another'}
                </button>
              </div>
            </div>
          )}

        </div>
      )}

      {/* Middle AdSense */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm my-2">
        <div className="text-[10px] uppercase tracking-widest mb-1">{isAr ? 'مساحة إعلانية' : 'AdSense Ad'}</div>
        <p className="text-[10px]">{isAr ? 'AD_SPACE_728x90 (وسط)' : 'AD_SPACE_728x90 (Middle)'}</p>
      </div>

    </div>
  );
}
