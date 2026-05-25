import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { toPng } from 'html-to-image';
import { Download, RefreshCw, Trophy, Map as MapIcon, Share2 } from 'lucide-react';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Total approximate UN recognized countries
const TOTAL_COUNTRIES = 195;

export default function ScratchMap({ lang }: { lang: 'ar' | 'en' }) {
  const isAr = lang === 'ar';
  
  // State for visited countries, stored as array of country names or IDs
  const [visitedCounties, setVisitedCountries] = useState<string[]>([]);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('visitedCountries');
    if (saved) {
      try {
        setVisitedCountries(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse visited countries");
      }
    }
  }, []);

  // Save to localStorage when updated
  useEffect(() => {
    localStorage.setItem('visitedCountries', JSON.stringify(visitedCounties));
  }, [visitedCounties]);

  const handleCountryClick = (geo: any) => {
    const countryId = geo.id || geo.properties.ISO_A3 || geo.properties.name;
    if (!countryId) return;

    setVisitedCountries(prev => {
      if (prev.includes(countryId)) {
        return prev.filter(id => id !== countryId);
      } else {
        return [...prev, countryId];
      }
    });
  };

  const percentage = useMemo(() => {
    // 110m map has some extra territories, we'll cap the percentage at 100% just in case
    const calc = (visitedCounties.length / TOTAL_COUNTRIES) * 100;
    return Math.min(calc, 100).toFixed(1);
  }, [visitedCounties]);

  const handleDownloadImage = async () => {
    if (!mapRef.current) return;
    
    setIsExporting(true);
    try {
      const dataUrl = await toPng(mapRef.current, { 
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: '#0f172a' // slate-900 roughly
      });
      
      const link = document.createElement('a');
      link.download = 'my-travel-map.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export map', err);
    } finally {
      setIsExporting(false);
    }
  };

  const clearMap = () => {
    if (window.confirm(isAr ? 'هل أنت متأكد من مسح الخريطة؟' : 'Are you sure you want to clear the map?')) {
      setVisitedCountries([]);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4 max-w-5xl mx-auto w-full">
      {/* Top AdSense */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm">
        <div className="text-[10px] uppercase tracking-widest mb-1">{isAr ? 'مساحة إعلانية' : 'AdSense Ad'}</div>
        <p className="text-[10px]">{isAr ? 'AD_SPACE_728x90 (أعلى)' : 'AD_SPACE_728x90 (Top)'}</p>
      </div>
      <div className="flex items-center gap-4 mb-2">
        <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center shrink-0">
          <MapIcon size={28} />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-100">
            {isAr ? 'تحدي الدول (خريطة الخدش الرقمية)' : 'Digital Scratch Travel Map'}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            {isAr 
              ? 'اضغط على الدول التي زرتها لإنشاء خريطتك الخاصة ومعرفة كم استكشفت من العالم.' 
              : 'Click on the countries you have visited to build your personal map and see how much of the world you explored.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Map Container */}
        <div className="md:col-span-2 bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col relative">
          
          <div ref={mapRef} className="relative w-full h-[400px] md:h-[500px] bg-slate-900 pt-8 pb-4 px-4 flex flex-col justify-between">
            <div className="absolute top-6 left-6 z-10 pointer-events-none">
              <h2 className="text-2xl font-black text-white drop-shadow-md">
                 {isAr ? 'رحلاتي حول العالم' : 'My World Travels'}
              </h2>
              <p className="text-emerald-400 font-bold drop-shadow-sm">
                {visitedCounties.length} {isAr ? 'دولة تمت زيارتها' : 'Countries Visited'}
              </p>
            </div>
            
            <div className="flex-1 w-full flex items-center justify-center">
              <ComposableMap
                projectionConfig={{ scale: 140 }}
                width={800}
                height={400}
                style={{ width: "100%", height: "100%" }}
              >
                <ZoomableGroup center={[0, 10]}>
                  <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                      geographies.map((geo) => {
                        const countryId = geo.id || geo.properties.ISO_A3 || geo.properties.name;
                        const isVisited = visitedCounties.includes(countryId);
                        
                        return (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            onClick={() => handleCountryClick(geo)}
                            onMouseEnter={() => {
                              setHoveredCountry(geo.properties.name);
                            }}
                            onMouseLeave={() => {
                              setHoveredCountry(null);
                            }}
                            style={{
                              default: {
                                fill: isVisited ? "#10b981" : "#334155",
                                outline: "none",
                                stroke: "#0f172a",
                                strokeWidth: 0.5,
                                transition: "all 250ms"
                              },
                              hover: {
                                fill: isVisited ? "#34d399" : "#475569",
                                outline: "none",
                                stroke: "#0f172a",
                                strokeWidth: 0.5,
                                cursor: "pointer",
                                transition: "all 250ms"
                              },
                              pressed: {
                                fill: "#059669",
                                outline: "none"
                              }
                            }}
                          />
                        );
                      })
                    }
                  </Geographies>
                </ZoomableGroup>
              </ComposableMap>
            </div>

            {/* Branding/Watermark for export */}
            <div className="absolute bottom-4 right-4 z-10 pointer-events-none opacity-50 flex items-center gap-1.5">
               <Trophy size={14} className="text-emerald-400" />
               <span className="text-xs font-bold text-white tracking-widest">{percentage}% OF THE WORLD</span>
            </div>
          </div>
          
          {/* Tooltip outside export area */}
          <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-white font-medium text-sm transition-opacity duration-200" style={{ opacity: hoveredCountry ? 1 : 0 }}>
            {hoveredCountry || "Hover Data"}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl flex flex-col justify-between shadow-lg">
           
           <div>
              <div className="text-center mb-8">
                 <div className="w-24 h-24 mx-auto bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 rounded-full flex items-center justify-center border-4 border-emerald-500/30 mb-4 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
                    <span className="text-3xl font-black text-emerald-400">{percentage}%</span>
                 </div>
                 <h3 className="text-xl font-bold text-white mb-2">
                    {isAr ? `لقد زرت ${percentage}% من العالم` : `You explored ${percentage}% of the world`}
                 </h3>
                 <p className="text-slate-400 text-sm">
                    {isAr 
                       ? `مجموع الدول التي زرتها هو ${visitedCounties.length} دولة من أصل ${TOTAL_COUNTRIES} دولة تقريباً.` 
                       : `You have visited ${visitedCounties.length} countries out of approx ${TOTAL_COUNTRIES} countries.`}
                 </p>
              </div>

              <div className="space-y-3">
                 <button
                    onClick={handleDownloadImage}
                    disabled={isExporting}
                    className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-4 rounded-xl transition-colors disabled:opacity-70"
                 >
                    {isExporting ? <RefreshCw className="animate-spin" size={20} /> : <Download size={20} />}
                    {isExporting ? (isAr ? 'جاري التحميل...' : 'Downloading...') : (isAr ? 'تحميل الخريطة كصورة للمشاركة' : 'Download Map to Share')}
                 </button>
                 
                 <button
                    onClick={clearMap}
                    className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-4 rounded-xl transition-colors border border-white/5"
                 >
                    <RefreshCw size={20} />
                    {isAr ? 'مسح الخريطة والبدء من جديد' : 'Clear Map & Start Over'}
                 </button>
              </div>
           </div>

           <div className="mt-8 pt-6 border-t border-white/10">
              <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                 <Share2 size={16} className="text-emerald-400" />
                 {isAr ? 'شارك إنجازك' : 'Share your achievement'}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                 {isAr 
                  ? 'حمل الصورة الناتجة وشاركها على Instagram Stories أو أي منصة اجتماعية أخرى لتحدي أصدقائك من زار دولاً أكثر!'
                  : 'Download the generated image and share it on Instagram Stories or any other platform to challenge your friends!'}
              </p>
           </div>
        </div>

      </div>

      {/* Middle AdSense */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm my-2">
        <div className="text-[10px] uppercase tracking-widest mb-1">{isAr ? 'مساحة إعلانية' : 'AdSense Ad'}</div>
        <p className="text-[10px]">{isAr ? 'AD_SPACE_728x90 (وسط)' : 'AD_SPACE_728x90 (Middle)'}</p>
      </div>
    </div>
  );
}
