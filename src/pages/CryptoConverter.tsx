import React, { useState, useEffect, useMemo } from 'react';
import { ArrowLeftRight, RefreshCw, Bitcoin, Share2, AlertCircle } from 'lucide-react';

const cryptos = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
  { id: 'tether', symbol: 'USDT', name: 'Tether' },
  { id: 'binancecoin', symbol: 'BNB', name: 'Binance Coin' },
  { id: 'solana', symbol: 'SOL', name: 'Solana' },
  { id: 'ripple', symbol: 'XRP', name: 'XRP' },
  { id: 'cardano', symbol: 'ADA', name: 'Cardano' },
  { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin' },
];

const fiats = [
  { id: 'USD', symbol: '$', nameAr: 'دولار أمريكي', nameEn: 'US Dollar', rate: 1 },
  { id: 'IQD', symbol: 'ع.د', nameAr: 'دينار عراقي', nameEn: 'Iraqi Dinar', rate: 1310 }, // Fallback rate
  { id: 'SAR', symbol: 'ر.س', nameAr: 'ريال سعودي', nameEn: 'Saudi Riyal', rate: 3.75 },
  { id: 'AED', symbol: 'د.إ', nameAr: 'درهم إماراتي', nameEn: 'UAE Dirham', rate: 3.67 },
  { id: 'EGP', symbol: 'ج.م', nameAr: 'جنيه مصري', nameEn: 'Egyptian Pound', rate: 47.9 },
  { id: 'EUR', symbol: '€', nameAr: 'يورو', nameEn: 'Euro', rate: 0.92 },
  { id: 'GBP', symbol: '£', nameAr: 'جنيه إسترليني', nameEn: 'British Pound', rate: 0.79 },
];

const translations = {
  ar: {
    title: "محول العملات الرقمية",
    subtitle: "أسعار لحظية للعملات الرقمية مقابل العملات المحلية والعالمية.",
    amount: "المبلغ",
    from: "من",
    to: "إلى",
    loading: "جاري تحديث الأسعار...",
    error: "حدث خطأ أثناء جلب الأسعار، يرجى المحاولة لاحقاً.",
    refresh: "تحديث الأسعار",
    lastUpdated: "آخر تحديث",
    shareWhatsapp: "مشاركة عبر واتساب",
    aboutTitle: "معلومات عن محول العملات الرقمية",
    aboutP1: "أداة تتيح لك تحويل قيم العملات المشفرة مثل البيتكوين (BTC) والإيثيريوم (ETH) إلى العملات المحلية مثل الدينار العراقي والريال السعودي والجنيه المصري لحظة بلحظة.",
    aboutH1: "مميزات الأداة:",
    list1: "أسعار مباشرة: يتم جلب أسعار العملات الرقمية من أسواق التداول المباشرة.",
    list2: "عملات متعددة: تدعم التحويل من وإلى أشهر العملات الرقمية وأهم العملات الورقية.",
    list3: "تحديث مستمر: يمكنك الضغط على زر تحديث الأسعار للحصول على أحدث سعر في السوق.",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)"
  },
  en: {
    title: "Crypto Currency Converter",
    subtitle: "Real-time cryptocurrency prices against local and global currencies.",
    amount: "Amount",
    from: "From",
    to: "To",
    loading: "Updating prices...",
    error: "Error fetching rates, please try again later.",
    refresh: "Refresh Prices",
    lastUpdated: "Last updated",
    shareWhatsapp: "Share via WhatsApp",
    aboutTitle: "About Crypto Converter",
    aboutP1: "A tool that allows you to instantly convert cryptocurrency values like Bitcoin (BTC) and Ethereum (ETH) to fiat currencies such as USD, EUR, IQD, and SAR.",
    aboutH1: "Tool Features:",
    list1: "Live Prices: Crypto prices are fetched directly from live trading markets.",
    list2: "Multiple Currencies: Supports top cryptocurrencies and major fiat currencies.",
    list3: "Continuous Updates: Click the refresh button to get the latest market rate.",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)"
  }
};

export default function CryptoConverter({ lang }: { lang: 'ar' | 'en' }) {
  const [cryptoId, setCryptoId] = useState('bitcoin');
  const [fiatId, setFiatId] = useState('USD');
  const [amount, setAmount] = useState<number | ''>(1);
  const [mode, setMode] = useState<'crypto_to_fiat' | 'fiat_to_crypto'>('crypto_to_fiat');
  
  const [cryptoPricesUsd, setCryptoPricesUsd] = useState<Record<string, number>>({});
  const [fiatRatesUsd, setFiatRatesUsd] = useState<Record<string, number>>({});
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const t = translations[lang];
  const isAr = lang === 'ar';

  const fetchData = async () => {
    setLoading(true);
    setError(false);
    try {
      // Fetch Crypto to USD
      let newCryptoPrices: Record<string, number> = {};
      try {
        const cryptoRes = await fetch('https://api.binance.com/api/v3/ticker/price');
        const cryptoData = await cryptoRes.json();
        const symbolMap: Record<string, string> = {
          'bitcoin': 'BTCUSDT',
          'ethereum': 'ETHUSDT',
          'tether': 'USDCUSDT',
          'binancecoin': 'BNBUSDT',
          'solana': 'SOLUSDT',
          'ripple': 'XRPUSDT',
          'cardano': 'ADAUSDT',
          'dogecoin': 'DOGEUSDT',
        };
        
        if (Array.isArray(cryptoData)) {
          Object.entries(symbolMap).forEach(([id, symbol]) => {
              const coin = cryptoData.find((c: any) => c.symbol === symbol);
              if (coin) {
                  newCryptoPrices[id] = parseFloat(coin.price);
              }
          });
          newCryptoPrices['tether'] = 1; // Default fallback for USDT
        } else {
           throw new Error('Binance missing data');
        }
      } catch (err) {
        // Fallback to CoinCap
        const cryptoRes = await fetch('https://api.coincap.io/v2/assets?limit=20');
        const cryptoData = await cryptoRes.json();
        if (cryptoData.data) {
          cryptoData.data.forEach((coin: any) => {
            newCryptoPrices[coin.id] = parseFloat(coin.priceUsd);
          });
        }
      }
      setCryptoPricesUsd(newCryptoPrices);

      // Fetch Fiat Rates via ExchangeRate-API (Free, no key)
      let currentFiatRates: Record<string, number> = {};
      try {
        const fiatRes = await fetch('https://open.er-api.com/v6/latest/USD');
        const fiatData = await fiatRes.json();
        if (fiatData.rates) {
          currentFiatRates = fiatData.rates;
        } else {
          throw new Error('missing rates');
        }
      } catch (err) {
        const fiatRes2 = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const fiatData2 = await fiatRes2.json();
        if (fiatData2.rates) {
          currentFiatRates = fiatData2.rates;
        }
      }
      
      if (Object.keys(currentFiatRates).length > 0) {
        setFiatRatesUsd(currentFiatRates);
      } else {
        // Fallback to static rates if APIs fail completely
        const staticRates: Record<string, number> = {};
        fiats.forEach(f => staticRates[f.id] = f.rate);
        setFiatRatesUsd(staticRates);
      }

      setLastUpdated(new Date());
    } catch (err) {
      console.error(err);
      setError(true);
      // Fallback
      const staticRates: Record<string, number> = {};
      fiats.forEach(f => staticRates[f.id] = f.rate);
      setFiatRatesUsd((prev) => Object.keys(prev).length ? prev : staticRates);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const currentCrypto = cryptos.find(c => c.id === cryptoId);
  const currentFiat = fiats.find(f => f.id === fiatId);

  const result = useMemo(() => {
    if (!amount || amount <= 0 || !currentCrypto || !currentFiat) return 0;
    
    // Get Crypto Price in USD
    const cryptoUsd = cryptoPricesUsd[currentCrypto.id] || 0;
    // Get Fiat Rate (1 USD = X Fiat)
    const fiatRate = fiatRatesUsd[currentFiat.id] || currentFiat.rate;

    if (cryptoUsd === 0 || fiatRate === 0) return 0;

    if (mode === 'crypto_to_fiat') {
      // e.g., 1 BTC = 64000 USD -> 64000 * 1310 IQD
      return Number(amount) * cryptoUsd * fiatRate;
    } else {
      // e.g., 1000 IQD -> 1000 / 1310 USD -> / 64000 BTC
      return (Number(amount) / fiatRate) / cryptoUsd;
    }
  }, [amount, cryptoId, fiatId, mode, cryptoPricesUsd, fiatRatesUsd]);

  const toggleMode = () => {
    setMode(prev => prev === 'crypto_to_fiat' ? 'fiat_to_crypto' : 'crypto_to_fiat');
  };

  const formatOutput = (val: number) => {
    if (val === 0) return '0.00';
    if (val < 0.0001) return val.toFixed(8);
    if (val < 1) return val.toFixed(4);
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(val);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(val);
  };

  const currentCryptoRateInFiat = useMemo(() => {
    const cryptoUsd = cryptoPricesUsd[cryptoId] || 0;
    const fiatRate = fiatRatesUsd[fiatId] || fiats.find(f=>f.id === fiatId)?.rate || 1;
    return cryptoUsd * fiatRate;
  }, [cryptoId, fiatId, cryptoPricesUsd, fiatRatesUsd]);

  const shareText = encodeURIComponent(
    isAr 
      ? `أسعار العملات الرقمية لحظياً!\n1 ${currentCrypto?.symbol} = ${formatCurrency(currentCryptoRateInFiat)} ${currentFiat?.symbol}\nحوّل الآن: `
      : `Live Crypto Prices!\n1 ${currentCrypto?.symbol} = ${formatCurrency(currentCryptoRateInFiat)} ${currentFiat?.symbol}\nConvert now: `
  );
  const whatsappUrl = `https://wa.me/?text=${shareText}${encodeURIComponent(window.location.href)}`;

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      {/* Placeholder: Top AdSense */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm">
        <div className="text-[10px] uppercase tracking-widest mb-1">{t.adTop}</div>
        <p className="text-[10px]">{t.adTopDesc}</p>
      </div>

      <section className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl flex flex-col gap-6 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="text-center relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <Bitcoin size={32} className="text-white" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400">{t.subtitle}</p>
        </div>

        {error && (
          <div className="bg-rose-500/20 border border-rose-500/50 p-4 rounded-xl flex items-center gap-3 text-rose-200 text-sm">
            <AlertCircle size={20} />
            <p>{t.error}</p>
          </div>
        )}

        <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 shadow-inner relative z-10">
          <div className="flex flex-col md:flex-row items-end gap-4 md:gap-6">
            
            {/* Input Side */}
            <div className="flex-1 w-full space-y-4">
              <label className="block text-sm font-medium text-slate-300">{t.from}</label>
              
              <div className="flex gap-2">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : '')}
                  className="w-2/3 bg-slate-800/50 border border-white/10 rounded-xl p-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-xl font-semibold"
                  placeholder="1.00"
                />
                {mode === 'crypto_to_fiat' ? (
                  <select
                    value={cryptoId}
                    onChange={(e) => setCryptoId(e.target.value)}
                    className="w-1/3 bg-slate-800/50 border border-white/10 rounded-xl p-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 font-medium"
                    dir="ltr"
                  >
                    {cryptos.map(c => (
                      <option key={c.id} value={c.id}>{c.symbol}</option>
                    ))}
                  </select>
                ) : (
                  <select
                    value={fiatId}
                    onChange={(e) => setFiatId(e.target.value)}
                    className="w-1/3 bg-slate-800/50 border border-white/10 rounded-xl p-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 font-medium"
                    dir={isAr ? 'rtl' : 'ltr'}
                  >
                    {fiats.map(f => (
                      <option key={f.id} value={f.id}>{f.symbol} - {isAr ? f.nameAr : f.id}</option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center pb-2">
              <button
                onClick={toggleMode}
                className="w-12 h-12 bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 rounded-full flex items-center justify-center transition-all border border-amber-500/30 shadow-md"
              >
                <ArrowLeftRight size={20} />
              </button>
            </div>

            {/* Output Side */}
            <div className="flex-1 w-full space-y-4">
              <label className="block text-sm font-medium text-slate-300">{t.to}</label>
              
              <div className="flex gap-2">
                <div className="w-2/3 bg-slate-900 border border-white/10 rounded-xl p-3 flex items-center text-slate-100 text-xl font-bold overflow-hidden">
                  {formatOutput(result)}
                </div>
                {mode === 'fiat_to_crypto' ? (
                  <select
                    value={cryptoId}
                    onChange={(e) => setCryptoId(e.target.value)}
                    className="w-1/3 bg-slate-800/50 border border-white/10 rounded-xl p-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 font-medium"
                    dir="ltr"
                  >
                    {cryptos.map(c => (
                      <option key={c.id} value={c.id}>{c.symbol}</option>
                    ))}
                  </select>
                ) : (
                  <select
                    value={fiatId}
                    onChange={(e) => setFiatId(e.target.value)}
                    className="w-1/3 bg-slate-800/50 border border-white/10 rounded-xl p-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 font-medium"
                    dir={isAr ? 'rtl' : 'ltr'}
                  >
                    {fiats.map(f => (
                      <option key={f.id} value={f.id}>{f.symbol} - {isAr ? f.nameAr : f.id}</option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          </div>

          {/* Rate info & controls */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-4">
            <div className="text-sm font-medium text-slate-400 bg-slate-900/80 py-1.5 px-4 rounded-lg">
              1 {currentCrypto?.symbol} = {formatCurrency(currentCryptoRateInFiat)} {currentFiat?.id}
            </div>
            
            <div className="flex items-center gap-4 text-xs text-slate-500">
              {loading ? (
                <span className="flex items-center gap-2 text-amber-400"><RefreshCw size={14} className="animate-spin" /> {t.loading}</span>
              ) : (
                <span className="flex items-center gap-2">
                  {t.lastUpdated}: {lastUpdated?.toLocaleTimeString()}
                </span>
              )}
              <button 
                onClick={fetchData}
                disabled={loading}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded-md transition-colors border border-white/10"
              >
                <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                {t.refresh}
              </button>
            </div>
          </div>
        </div>

        {/* Share */}
        {currentCryptoRateInFiat > 0 && (
          <div className="mt-2 flex justify-center relative z-10">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-sm font-bold text-slate-100 shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
            >
              <Share2 size={18} />
              {t.shareWhatsapp}
            </a>
          </div>
        )}
      </section>

      {/* Placeholder: Middle AdSense */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm my-2">
        <div className="text-[10px] uppercase tracking-widest mb-1">{t.adMiddle}</div>
        <p className="text-[10px]">{t.adMiddleDesc}</p>
      </div>

      {/* About Section */}
      <article className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col gap-4 text-[13px] text-slate-300 leading-relaxed shadow-lg">
        <h2 className="text-lg font-bold text-amber-400 border-b border-white/10 pb-4 mb-2">{t.aboutTitle}</h2>
        <div className="space-y-4">
          <p>{t.aboutP1}</p>
          <h3 className="text-base font-bold tracking-wide text-slate-200 mt-4">{t.aboutH1}</h3>
          <ul className="list-disc list-inside space-y-2 mx-4 text-slate-400">
            <li>{t.list1}</li>
            <li>{t.list2}</li>
            <li>{t.list3}</li>
          </ul>
        </div>
      </article>
    </div>
  );
}
