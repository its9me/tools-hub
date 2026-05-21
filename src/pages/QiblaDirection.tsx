import React, { useState, useEffect, useCallback } from 'react';
import { Share2, Info, Compass, MapPin, AlertCircle, Smartphone } from 'lucide-react';

const MECCA_LAT = 21.422487;
const MECCA_LNG = 39.826206;

const toRadians = (degrees: number) => degrees * (Math.PI / 180);
const toDegrees = (radians: number) => radians * (180 / Math.PI);

const calculateQibla = (lat: number, lng: number) => {
  const phi1 = toRadians(lat);
  const lambda1 = toRadians(lng);
  const phi2 = toRadians(MECCA_LAT);
  const lambda2 = toRadians(MECCA_LNG);

  const deltaLambda = lambda2 - lambda1;

  const y = Math.sin(deltaLambda);
  const x = Math.cos(phi1) * Math.tan(phi2) - Math.sin(phi1) * Math.cos(deltaLambda);

  let qiblaDir = toDegrees(Math.atan2(y, x));
  return (qiblaDir + 360) % 360;
};

const translations = {
  ar: {
    title: "اتجاه القبلة التفاعلي",
    subtitle: "حدد اتجاه القبلة بدقة باستخدام بوصلة هاتفك وموقعك الجغرافي.",
    start: "بدء تحديد القبلة",
    grantPermission: "الرجاء منح صلاحية الوصول للموقع والبوصلة.",
    locating: "جاري تحديد الموقع...",
    qibla: "القبلة",
    distance: "المسافة إلى مكة",
    km: "كم",
    accuracy: "الدقة",
    meters: "متر",
    recalibrate: "يُرجى تحريك الهاتف على شكل رقم 8 (∞) لمعايرة البوصلة.",
    errorLocation: "تعذر الوصول للموقع. تأكد من تفعيل الـ GPS.",
    errorCompass: "يبدو أن جهازك لا يدعم مستشعر البوصلة أو يحتاج إلى إذن مسبق.",
    shareWhatsapp: "مشاركة الأداة",
    aboutTitle: "عن الأداة",
    aboutP1: "تستخدم هذه الأداة تقنيات المتصفح الحديثة (Geolocation API) لمعرفة موقعك، ومستشعر الحركة (DeviceOrientation) لقراءة مستشعرات البوصلة في هاتفك. بناءً عليه، يتم تطبيق معادلات رياضية لحساب الانحراف المطلوب وتوجيه السهم بشكل مباشر نحو مكة المكرمة. تعمل الأداة بشكل كامل داخل المتصفح وبدون إرسال بياناتك لأي سيرفر.",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)",
    notMobile: "للحصول على أفضل تجربة، يرجى استخدام هاتف ذكي."
  },
  en: {
    title: "Interactive Qibla Direction",
    subtitle: "Determine the exact Qibla direction using your phone's compass and location.",
    start: "Start Qibla Finder",
    grantPermission: "Please grant location and compass permissions.",
    locating: "Locating...",
    qibla: "Qibla",
    distance: "Distance to Mecca",
    km: "km",
    accuracy: "Accuracy",
    meters: "meters",
    recalibrate: "Please move your phone in a figure 8 (∞) to calibrate the compass.",
    errorLocation: "Unable to access location. Make sure GPS is enabled.",
    errorCompass: "Your device might not support a compass sensor or requires permission.",
    shareWhatsapp: "Share Tool",
    aboutTitle: "About The Tool",
    aboutP1: "This tool uses modern browser APIs (Geolocation API) to find your location and motion sensors (DeviceOrientation) to read your phone's compass. It then applies geographic mathematical formulas to calculate the exact angle and point the arrow directly to Mecca. All magic happens locally on your device without sending any data to a server.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)",
    notMobile: "For best results, please use a smartphone."
  }
};

export default function QiblaDirection({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const [active, setActive] = useState(false);
  const [qiblaAngle, setQiblaAngle] = useState<number | null>(null);
  const [heading, setHeading] = useState<number | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Haversine formula for distance
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // km
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const startCompass = async () => {
    setErrorMsg(null);
    setActive(true);

    // Request Location
    if (!navigator.geolocation) {
      setErrorMsg(t.errorLocation);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy: locAcc } = pos.coords;
        setAccuracy(locAcc);
        setQiblaAngle(calculateQibla(latitude, longitude));
        setDistance(calculateDistance(latitude, longitude, MECCA_LAT, MECCA_LNG));
        
        requestDeviceOrientation();
      },
      (err) => {
        console.error(err);
        setErrorMsg(t.errorLocation);
      },
      { enableHighAccuracy: true }
    );
  };

  const requestDeviceOrientation = async () => {
    // For iOS 13+ devices requiring explicit permission
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const permissionState = await (DeviceOrientationEvent as any).requestPermission();
        if (permissionState === 'granted') {
          window.addEventListener('deviceorientationabsolute', handleOrientation as any, true);
          // Fallback to normal if absolute not widely perfectly supported
          window.addEventListener('deviceorientation', handleOrientation, true);
        } else {
          setErrorMsg(t.errorCompass);
        }
      } catch (err) {
        console.error(err);
        setErrorMsg(t.errorCompass);
      }
    } else {
      // Non-iOS 13+ devices
      window.addEventListener('deviceorientationabsolute', handleOrientation as any, true);
      window.addEventListener('deviceorientation', handleOrientation, true);
      
      // If we don't get events in 2 second, show warning
      setTimeout(() => {
        setHeading(h => h === null ? 0 : h);
      }, 2000);
    }
  };

  const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
    let alpha = event.alpha;
    let webkitCompassHeading = (event as any).webkitCompassHeading;

    if (webkitCompassHeading !== undefined && webkitCompassHeading !== null) {
      // iOS
      setHeading(webkitCompassHeading);
    } else if (alpha !== null) {
      // Android
      // Try resolving absolute heading via absolute deviceorientation, wait for 'deviceorientationabsolute'
      if ((event as any).absolute || typeof (event as any).absolute === 'undefined') {
          // Normal deviceorientation alpha is relative to Earth coordinates if absolute is true
          let compass = 360 - alpha;
          setHeading(compass);
      }
    }
  }, []);

  useEffect(() => {
    return () => {
      window.removeEventListener('deviceorientationabsolute', handleOrientation as any, true);
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, [handleOrientation]);

  const generateShareText = () => {
    let str = isAr ? '*أداة اتجاه القبلة:*\n\n' : '*Qibla Direction Tool:*\n\n';
    str += isAr ? `حدد اتجاه القبلة بدقة باستخدام بوصلة هاتفك.\n\nجربها هنا: ` : `Determine the exact Qibla direction using your phone.\n\nTry it here: `;
    return encodeURIComponent(str + window.location.href);
  };

  // The arrow rotation needs to point from the device's heading toward the Qibla angle.
  // compassHeading 0 = North, 90 = East, 180 = South, 270 = West
  // If Qibla is 135 (SE), and we are facing 90 (E), we need to rotate arrow 45 deg right.
  // formula: rotation = qiblaAngle - heading
  let arrowRotation = 0;
  if (qiblaAngle !== null && heading !== null) {
    arrowRotation = qiblaAngle - heading;
  }

  // Is device aligned within 5 degrees?
  const isAligned = Math.abs(arrowRotation % 360) < 5 || Math.abs(arrowRotation % 360) > 355;

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
      {/* Top AdSense */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm">
        <div className="text-[10px] uppercase tracking-widest mb-1">{t.adTop}</div>
        <p className="text-[10px]">{t.adTopDesc}</p>
      </div>

      <section className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl flex flex-col gap-8 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="text-center relative z-10 flex flex-col items-center">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg text-white transition-colors duration-500 ${isAligned ? 'bg-gradient-to-br from-emerald-400 to-green-600 shadow-emerald-500/50' : 'bg-gradient-to-br from-slate-600 to-slate-800'}`}>
            <Compass size={32} />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">{t.subtitle}</p>
        </div>

        <div className="flex flex-col relative z-10 w-full items-center">
          
          {!active ? (
             <div className="flex flex-col items-center gap-6 p-8 bg-slate-900/50 rounded-2xl border border-white/5 shadow-inner max-w-md w-full text-center">
                <Smartphone size={48} className="text-slate-500" />
                <p className="text-sm text-slate-300">
                    {t.grantPermission}
                    <br />
                    <span className="text-xs text-emerald-400 mt-2 block">{t.notMobile}</span>
                </p>
                <button 
                  onClick={startCompass}
                  className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-900/50 hover:-translate-y-1"
                >
                  {t.start}
                </button>
             </div>
          ) : (
            <div className="flex flex-col items-center w-full max-w-md">
                {errorMsg ? (
                   <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-start gap-3 w-full">
                       <AlertCircle size={20} className="shrink-0 mt-0.5" />
                       <p className="text-sm">{errorMsg}</p>
                   </div>
                ) : qiblaAngle === null ? (
                   <div className="text-emerald-400 flex flex-col items-center gap-4 animate-pulse">
                       <MapPin size={32} />
                       <p>{t.locating}</p>
                   </div>
                ) : (
                   <div className="flex flex-col items-center w-full gap-8">
                       
                       {/* Compass UI */}
                       <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-slate-700 bg-slate-900 shadow-2xl flex items-center justify-center p-4">
                           {/* Compass ring */}
                           <div className="absolute inset-0 rounded-full border border-white/5 m-4"></div>
                           <div className="absolute top-2 text-xs font-bold text-slate-500">N</div>
                           <div className="absolute bottom-2 text-xs font-bold text-slate-500">S</div>
                           <div className="absolute right-4 text-xs font-bold text-slate-500">E</div>
                           <div className="absolute left-4 text-xs font-bold text-slate-500">W</div>

                           {/* Needle Wrapper (rotates to point to Qibla relative to screen) */}
                           <div 
                             className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out"
                             style={{ transform: `rotate(${arrowRotation}deg)` }}
                           >
                              <div className="relative w-2 h-full flex flex-col items-center justify-between py-6">
                                  {/* Triangle Arrow head pointing UP */}
                                  <div className={`w-0 h-0 border-l-[16px] border-r-[16px] border-b-[40px] border-l-transparent border-r-transparent transition-colors duration-500 filter drop-shadow-[0_0_10px_rgba(52,211,153,0.5)] ${isAligned ? 'border-b-emerald-400' : 'border-b-amber-500'}`}></div>
                                  
                                  {/* Body of needle */}
                                  <div className={`w-1 h-2/3 bg-gradient-to-b transition-colors duration-500 ${isAligned ? 'from-emerald-400 to-transparent' : 'from-amber-500 to-transparent'}`}></div>

                                  <div className="w-1 h-1/4"></div>
                                  <div className="w-8 h-8 rounded-full bg-slate-800 shadow-xl border-2 border-slate-600 absolute top-1/2 -mt-4 -ml-3 z-10 flex items-center justify-center">
                                      <div className={`w-3 h-3 rounded-full ${isAligned ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,1)]' : 'bg-amber-500'}`}></div>
                                  </div>
                              </div>
                           </div>
                       </div>

                       {/* Status text */}
                       <div className="text-center flex flex-col gap-2">
                           <h3 className={`text-2xl font-bold transition-colors ${isAligned ? 'text-emerald-400' : 'text-slate-200'}`}>
                              {isAligned ? (isAr ? 'أنت متجه للقبلة' : 'Facing Qibla!') : t.qibla}
                           </h3>
                           <div className="flex gap-4 justify-center mt-2 text-sm text-slate-400 font-mono">
                               <div>
                                  <span className="block text-[10px] uppercase text-slate-500 mb-1">{t.distance}</span>
                                  {distance?.toFixed(0)} {t.km}
                               </div>
                               <div>
                                  <span className="block text-[10px] uppercase text-slate-500 mb-1">{t.accuracy}</span>
                                  ±{accuracy?.toFixed(0)} {t.meters}
                               </div>
                           </div>
                           <p className="text-xs text-slate-500 mt-4 max-w-xs mx-auto">
                              {t.recalibrate}
                           </p>
                       </div>

                   </div>
                )}
            </div>
          )}

        </div>
        
        <div className="hidden md:flex justify-center pt-4 relative z-10 w-full mt-2 border-t border-white/5">
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
            <Info size={20} className="text-emerald-500"/>
            <h2 className="text-lg font-bold text-emerald-500">{t.aboutTitle}</h2>
        </div>
        <div className="space-y-4">
          <p>{t.aboutP1}</p>
        </div>
      </article>

    </div>
  );
}
