import React, { useState, useEffect } from 'react';
import { StickyNote, Plus, Trash2, Download, Info, Search, Copy, Check, Pin, PinOff, Palette } from 'lucide-react';

const translations = {
  ar: {
    title: "دفتر الملاحظات الذكي",
    subtitle: "اكتب، احفظ، وحمل ملاحظاتك بسهولة. يتم حفظ البيانات في متصفحك.",
    newNote: "ملاحظة جديدة",
    noNotes: "لا توجد ملاحظات. ابدأ بكتابة أول ملاحظة لك!",
    untitledNote: "ملاحظة بدون عنوان",
    delete: "حذف",
    download: "تنزيل",
    contentPlaceholder: "ابدأ الكتابة هنا...",
    aboutTitle: "عن دفتر الملاحظات",
    aboutP1: "أداة بسيطة تتيح لك كتابة وحفظ ملاحظاتك أونلاين. تعتمد الأداة على حفظ الملاحظات محلياً في متصفحك (Local Storage)، مما يعني أن بياناتك آمنة ولا يتم رفعها لأي خوادم خارجية وتظل متاحة حتى بعد إغلاق المتصفح أو الجهاز ما دام متصفحك يحتفظ ببيانات الموقع.",
    search: "بحث في الملاحظات...",
    copy: "نسخ",
    copied: "تم النسخ!",
    words: "كلمة",
    chars: "حرف",
    pin: "تثبيت",
    unpin: "إلغاء التثبيت",
    adTop: "مساحة إعلانية",
    adTopDesc: "AD_SPACE_728x90 (أعلى)",
    adMiddle: "مساحة إعلانية",
    adMiddleDesc: "AD_SPACE_728x90 (وسط)"
  },
  en: {
    title: "Smart Notepad",
    subtitle: "Write, save, and download your notes easily. Data is saved in your browser.",
    newNote: "New Note",
    noNotes: "No notes yet. Start writing your first note!",
    untitledNote: "Untitled Note",
    delete: "Delete",
    download: "Download",
    contentPlaceholder: "Start typing here...",
    aboutTitle: "About Notepad",
    aboutP1: "A simple tool that lets you write and save notes. It uses your browser's local storage, meaning your notes are safe, not uploaded to any external servers, and remain available even if you close the browser, as long as site data is not cleared.",
    search: "Search notes...",
    copy: "Copy",
    copied: "Copied!",
    words: "words",
    chars: "chars",
    pin: "Pin",
    unpin: "Unpin",
    adTop: "AdSense Ad",
    adTopDesc: "AD_SPACE_728x90 (Top)",
    adMiddle: "AdSense Ad",
    adMiddleDesc: "AD_SPACE_728x90 (Middle)"
  }
};

interface Note {
  id: string;
  content: string;
  updatedAt: number;
  pinned?: boolean;
  color?: string;
}

const noteColors = [
  'bg-slate-900/40', // Default
  'bg-amber-900/20',
  'bg-rose-900/20',
  'bg-indigo-900/20',
  'bg-emerald-900/20'
];

export default function OnlineNotepad({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const savedNotes = localStorage.getItem('online_notepad_notes');
    if (savedNotes) {
      const parsed = JSON.parse(savedNotes);
      setNotes(parsed);
      if (parsed.length > 0) {
        setActiveNoteId(parsed[0].id);
      }
    } else {
      // Create initial empty note
      const newNote = { id: crypto.randomUUID(), content: '', updatedAt: Date.now(), pinned: false, color: noteColors[0] };
      setNotes([newNote]);
      setActiveNoteId(newNote.id);
    }
  }, []);

  useEffect(() => {
    if (notes.length > 0) {
       localStorage.setItem('online_notepad_notes', JSON.stringify(notes));
    }
  }, [notes]);

  const handleAddNote = () => {
    const newNote = { id: crypto.randomUUID(), content: '', updatedAt: Date.now(), pinned: false, color: noteColors[0] };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
    setSearchQuery('');
  };

  const handleUpdateNote = (val: string) => {
    if (!activeNoteId) return;
    setNotes(notes.map(n => 
      n.id === activeNoteId 
        ? { ...n, content: val, updatedAt: Date.now() } 
        : n
    ));
  };

  const handleDeleteNote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedNotes = notes.filter(n => n.id !== id);
    setNotes(updatedNotes);
    
    if (updatedNotes.length > 0) {
      if (activeNoteId === id) {
        setActiveNoteId(updatedNotes[0].id);
      }
    } else {
      setActiveNoteId(null);
      localStorage.removeItem('online_notepad_notes');
    }
  };

  const togglePin = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotes(notes.map(n => n.id === id ? { ...n, pinned: !n.pinned, updatedAt: Date.now() } : n));
  };

  const changeColor = (id: string, color: string) => {
    setNotes(notes.map(n => n.id === id ? { ...n, color, updatedAt: Date.now() } : n));
  };

  const downloadTxt = (n: Note) => {
    const lines = n.content.split('\n');
    const title = lines[0]?.trim() || t.untitledNote;
    const blob = new Blob([n.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = async (content: string) => {
    if (!content) return;
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const filteredAndSortedNotes = notes
    .filter(n => n.content.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (a.pinned === b.pinned) {
        return b.updatedAt - a.updatedAt;
      }
      return a.pinned ? -1 : 1;
    });

  const activeNote = notes.find(n => n.id === activeNoteId);

  const wordCount = activeNote?.content.trim().split(/\s+/).filter(w => w.length > 0).length || 0;
  const charCount = activeNote?.content.length || 0;

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto">
      {/* AdSpace Top */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm">
        <div className="text-[10px] uppercase tracking-widest mb-1">{t.adTop}</div>
        <p className="text-[10px]">{t.adTopDesc}</p>
      </div>

      <div className="text-center flex flex-col items-center">
         <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <StickyNote size={32} className="text-white" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2">{t.title}</h2>
          <p className="text-sm text-slate-400">{t.subtitle}</p>
      </div>

      <section className="bg-slate-900/60 rounded-2xl border border-white/10 shadow-2xl flex flex-col md:flex-row overflow-hidden min-h-[600px]">
         
         {/* Sidebar */}
         <div className={`w-full md:w-1/3 lg:w-1/4 bg-slate-900/80 border-b md:border-b-0 ${isAr ? 'md:border-l border-white/10' : 'md:border-r border-white/10'} flex flex-col max-h-[300px] md:max-h-[700px]`}>
            <div className="p-4 border-b border-white/5 flex justify-between items-center bg-slate-900/50">
               <span className="font-bold text-slate-300">{t.title}</span>
               <button 
                  onClick={handleAddNote}
                  className="flex items-center gap-1 bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                >
                 <Plus size={16} />
                 <span className="hidden md:inline">{t.newNote}</span>
               </button>
            </div>
            
            <div className="p-2 border-b border-white/5 relative bg-slate-900/40">
              <input
                type="text"
                placeholder={t.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full bg-slate-800/80 border border-white/5 rounded-lg py-2 text-sm text-slate-200 outline-none focus:border-amber-500/50 transition-colors ${isAr ? 'pr-9 pl-3' : 'pl-9 pr-3'}`}
              />
              <Search size={16} className={`absolute top-1/2 -translate-y-1/2 text-slate-500 ${isAr ? 'right-5' : 'left-5'}`} />
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
              {filteredAndSortedNotes.length === 0 ? (
                <div className="p-4 text-center text-sm text-slate-500">
                  {searchQuery ? t.noNotes : t.noNotes}
                </div>
              ) : (
                filteredAndSortedNotes.map(note => {
                  const firstLine = note.content.split('\n')[0].trim();
                  const title = firstLine || t.untitledNote;
                  const isActive = activeNoteId === note.id;
                  
                  return (
                    <div 
                      key={note.id}
                      onClick={() => setActiveNoteId(note.id)}
                      className={`flex flex-col p-3 rounded-xl cursor-pointer transition-colors group ${isActive ? 'bg-amber-500/10 border border-amber-500/30' : 'hover:bg-slate-800/80 border border-transparent'}`}
                    >
                      <div className="flex items-center justify-between min-w-0">
                         <div className={`text-sm truncate font-medium flex items-center gap-1.5 ${isActive ? 'text-amber-400' : 'text-slate-300'}`}>
                           {note.pinned && <Pin size={12} className="text-amber-500 flex-shrink-0" />}
                           <span className="truncate">{title}</span>
                         </div>
                         
                         <div className={`flex gap-1 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                           <button 
                             onClick={(e) => handleDeleteNote(note.id, e)}
                             className="text-slate-500 hover:text-rose-400 p-1 rounded transition-colors"
                             title={t.delete}
                           >
                             <Trash2 size={14} />
                           </button>
                         </div>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">
                        {new Date(note.updatedAt).toLocaleDateString(isAr ? 'ar-EG' : 'en-US')}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
         </div>

         {/* Editor */}
         <div className={`flex-1 flex flex-col relative ${activeNote?.color || 'bg-slate-900/40'} transition-colors duration-300`}>
            {activeNote ? (
              <>
                <div className="p-3 border-b border-white/5 flex flex-wrap justify-between items-center gap-2 bg-slate-950/20">
                  <div className="flex gap-2 items-center">
                    <button 
                      onClick={(e) => togglePin(activeNote.id, e)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors border border-white/5 ${activeNote.pinned ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 hover:bg-slate-700 text-slate-400'}`}
                    >
                       {activeNote.pinned ? <PinOff size={16} /> : <Pin size={16} />}
                       <span className="hidden sm:inline">{activeNote.pinned ? t.unpin : t.pin}</span>
                    </button>
                    
                    <div className="flex gap-1 ml-2 mr-2">
                       {noteColors.map(color => (
                         <button 
                            key={color}
                            onClick={() => changeColor(activeNote.id, color)}
                            className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${color} ${activeNote.color === color ? 'border-white/50 shadow-sm' : 'border-transparent'}`}
                            title={t.colors}
                         />
                       ))}
                    </div>
                  </div>

                  <div className="flex gap-2 items-center">
                    <button 
                      onClick={() => copyToClipboard(activeNote.content)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-lg transition-colors border border-white/5"
                    >
                       {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                       <span className="hidden sm:inline">{copied ? t.copied : t.copy}</span>
                    </button>
                    <button 
                      onClick={() => downloadTxt(activeNote)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 flex-shrink-0 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-lg transition-colors border border-white/5"
                    >
                       <Download size={16} />
                       <span className="hidden sm:inline">{t.download}</span>
                    </button>
                  </div>
                </div>
                
                <textarea
                  value={activeNote.content}
                  onChange={(e) => handleUpdateNote(e.target.value)}
                  placeholder={t.contentPlaceholder}
                  className="flex-1 w-full bg-transparent text-slate-200 p-6 md:p-8 outline-none resize-none leading-relaxed text-base focus:ring-0 custom-scrollbar"
                  dir="auto"
                  spellCheck="false"
                ></textarea>

                <div className="px-4 py-2 bg-slate-950/40 border-t border-white/5 text-xs text-slate-400 flex gap-4">
                  <span>{wordCount} {t.words}</span>
                  <span>{charCount} {t.chars}</span>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-500 h-full p-8 text-center gap-4 bg-slate-900/40">
                 <StickyNote size={48} className="opacity-20" />
                 <p>{t.noNotes}</p>
                 <button 
                  onClick={handleAddNote}
                  className="flex items-center gap-2 bg-amber-500 text-slate-900 hover:bg-amber-400 px-6 py-2.5 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-amber-500/20 mt-2"
                >
                 <Plus size={20} />
                 {t.newNote}
               </button>
              </div>
            )}
         </div>

      </section>

      {/* AdSpace Middle */}
      <div className="w-full h-20 bg-slate-800/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 shadow-sm my-2">
        <div className="text-[10px] uppercase tracking-widest mb-1">{t.adMiddle}</div>
        <p className="text-[10px]">{t.adMiddleDesc}</p>
      </div>

       {/* About Section */}
       <article className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col gap-4 text-[13px] text-slate-300 leading-relaxed shadow-lg mb-8">
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-2">
            <Info size={20} className="text-amber-400"/>
            <h2 className="text-lg font-bold text-amber-400">{t.aboutTitle}</h2>
        </div>
        <div className="space-y-4">
          <p>{t.aboutP1}</p>
        </div>
      </article>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
