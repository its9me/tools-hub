import React, { useState } from 'react';
import { Share2, Facebook, MessageCircle, Send, Instagram, Check } from 'lucide-react';

interface ShareButtonsProps {
  text: string;
  url?: string;
  lang: 'ar' | 'en';
}

export default function ShareButtons({ text, url = window.location.href, lang }: ShareButtonsProps) {
  const isAr = lang === 'ar';
  const [copied, setCopied] = useState(false);

  const encodedText = encodeURIComponent(`${text}\n\n${url}`);
  const encodedUrl = encodeURIComponent(url);

  const handleCopyForInstagram = () => {
    navigator.clipboard.writeText(`${text}\n\n${url}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodedText}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodeURIComponent(text)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodeURIComponent(text)}`
  };

  return (
    <div className="mt-6 pt-6 border-t border-white/10 w-full animate-in fade-in">
      <h4 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
        <Share2 size={16} className="text-indigo-400" />
        {isAr ? 'شارك نتيجتك:' : 'Share your result:'}
      </h4>
      <div className="flex flex-wrap gap-2 md:gap-3">
        <a 
          href={shareLinks.whatsapp} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 rounded-xl text-sm font-bold transition-colors border border-[#25D366]/20"
        >
          <MessageCircle size={18} /> WhatsApp
        </a>
        <a 
          href={shareLinks.telegram} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 bg-[#0088cc]/10 text-[#0088cc] hover:bg-[#0088cc]/20 rounded-xl text-sm font-bold transition-colors border border-[#0088cc]/20"
        >
          <Send size={18} /> Telegram
        </a>
        <a 
          href={shareLinks.facebook} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2]/20 rounded-xl text-sm font-bold transition-colors border border-[#1877F2]/20"
        >
          <Facebook size={18} /> Facebook
        </a>
        <button 
          onClick={handleCopyForInstagram}
          className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 bg-[#E1306C]/10 text-[#E1306C] hover:bg-[#E1306C]/20 rounded-xl text-sm font-bold transition-colors border border-[#E1306C]/20"
          title={isAr ? "الانستغرام لا يدعم مشاركة الروابط المباشرة، سيتم نسخ النص للمشاركة!" : "Instagram does not support direct link sharing, text will be copied!"}
        >
          {copied ? <Check size={18} /> : <Instagram size={18} />} 
          {copied ? (isAr ? 'تم النسخ!' : 'Copied!') : 'Instagram'}
        </button>
      </div>
    </div>
  );
}
