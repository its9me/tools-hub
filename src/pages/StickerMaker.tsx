import React, { useState, useEffect, useRef } from 'react';
import { 
  Smile, Image as ImageIcon, Download, Scissors, Type, Sparkles, 
  RotateCw, Plus, Trash2, Eye, ShieldAlert, CheckCircle, Info, ShieldCheck, 
  Layers, Upload, Crop, Compass, RefreshCw, Palette, HelpCircle, FileCheck
} from 'lucide-react';
import ShareButtons from '../components/ShareButtons';

const translations = {
  ar: {
    title: "صانع الملصقات الاحترافي للواتساب وتليجرام",
    subtitle: "صمم ملصقات مخصصة، وأضف حدوداً بيضاء، واقتطع الأشكال، وأضف نصوص مضحكة ومؤثرات محلياً بدون خوادم وبسرعة فائقة.",
    uploadLabel: "اختر صورة للبدء (PNG, JPG, WebP)",
    dragDropText: "اسحب الصورة وأفلتها هنا أو اضغط للتصفح",
    sizeNote: "ملحوظة: التصدير سيكون بالأبعاد الرسمية (512x512 بكسل) وبصيغة شفافة بجودة فائقة.",
    settingsTitle: "إعدادات وتعديل الملصق",
    imageControls: "التحكم في الصورة",
    scaleLabel: "التكبير / التصغير",
    rotateLabel: "الروتيشن (دوران)",
    offsetX: "إزاحة أفقية (X)",
    offsetY: "إزاحة رأسية (Y)",
    
    effectsTitle: "المؤثرات والفلاتر",
    filterNormal: "طبيعي",
    filterGrayscale: "أبيض وأسود",
    filterSepia: "كلاسيكي (Sepia)",
    filterInvert: "عكس الألوان",
    filterBrightness: "السطوع",
    filterContrast: "التباين",
    
    maskTitle: "اقتطاع الأشكال (Shape Mask)",
    maskNone: "بدون اقتطاع (كامل الصورة)",
    maskCircle: "دائرة",
    maskRoundedRect: "مربع حواف دائرية",
    maskHeart: "قلب الحب",
    maskSpeech: "فقاعة كلام",
    maskStar: "نجمة متميزة",
    maskHexagon: "مضلع سداسي",

    removeBgTitle: "إزالة لون الخلفية (Color Key Keyer)",
    removeBgDesc: "اضغط على أي لون في معاينة الصورة أدناه لجعله شفافاً بالكامل (مثالي للخلفيات أحادية اللون).",
    bgRemoverActive: "تفعيل ميزة إزالة اللون",
    toleranceLabel: "نسبة التسامح مع اللون (Tolerance)",
    bgSelectionState: "اللون المحدد للشفافية: ",
    noBgSelected: "لم يتم تحديد لون بعد. انقر على الصورة الكبيرة لاختيار لون.",

    borderTitle: "الحدود الخارجية (Die-Cut Border)",
    borderTypeNone: "بدون حدود",
    borderWhite: "حدود بيضاء (Sticker Style)",
    borderCustom: "حدود ملونة مخصصة",
    borderColorLabel: "لون الحدود",
    borderSizeLabel: "سمك الحدود",

    textTitle: "إضافة نصوص للملصق (Meme Text)",
    topTextPlaceholder: "النص العلوي...",
    bottomTextPlaceholder: "النص السفلي...",
    fontSizeLabel: "حجم الخط",
    textColorLabel: "لون الخط",
    textStrokeColorLabel: "لون حدود الخط",
    textStrokeWidthLabel: "سمك حدود الخط",

    badgeTitle: "إضافة إيموجي / شارة تفاعلية (Emoji Overlay)",
    badgeNone: "بدون شارة",
    badgePlaceholder: "اختر إيموجي من القائمة لدمجه كملصق فرعي",
    badgeLabel: "إيموجي مدمج",
    badgeX: "موقع الشارة أفقي",
    badgeY: "موقع الشارة رأسي",
    badgeSize: "حجم الشارة",

    canvasBgType: "خلفية منطقة المعاينة",
    bgTransparent: "مربعات الشفافية",
    bgDark: "خلفية داكنة",
    bgLight: "خلفية فاتحة",

    waInstructionsTitle: "كيف تضيف الملصق إلى واتساب (WhatsApp)؟",
    waStep1: "1. قم بتنزيل الملصق كصورة PNG شفافة عبر زر التنزيل أدناه.",
    waStep2: "2. افتح تطبيقًا مجانيًا مثل Sticker.ly أو صانع الملصقات الرسمي على هاتفك.",
    waStep3: "3. اختر الصورة التي قمت بتنزيلها واضغط على 'إضافة إلى واتساب'.",
    
    tgInstructionsTitle: "كيف تضيف الملصق إلى تليجرام (Telegram)؟",
    tgStep1: "1. قم بتنزيل الملصق بصيغة PNG شفافة (تفاصيلها 512x512 مناسبة تماماً لقوانين تليجرام).",
    tgStep2: "2. افتح تطبيق تليجرام وابحث عن المعرف الرسمي لحفظ الملصقات: @Stickers",
    tgStep3: "3. أرسل الأمر /newpack للبدء، ثم أرسل الإيموجي المناسب، وأرفق كرت الصورة كـ 'ملف (File)' بدون ضغط.",

    downloadPng: "تحميل الملصق كـ PNG شفاف",
    downloadWebp: "تحميل الملصق كـ WebP شفاف",
    resetBtn: "إعادة تعيين التعديلات",
    shareMsg: "صممت ملصقي الشخصي للواتساب وتليجرام بجودة فائقة! جرب أداة صانع الملصقات المجانية الآن:",
    
    aboutTitle: "حول صانع الملصقات التفاعلي والسلس",
    aboutP1: "أداة صانع الملصقات هي تطبيق متكامل يعمل بنسبة 100% داخل المتصفح، صُمم خصيصاً للجيمرز والشباب والجروبات الذين يرغبون في تحويل صورهم وميمزاتهم إلى ملصقات واتساب وتليجرام بخطوة واحدة ودون إعلانات مزعجة.",
    aboutP2: "بفضل استخدام مكتبات الرسم المتقدمة على Canvas، يمكنك تدوير وتكبير الصورة، تطبيق فلاتر الألوان، اقتطاع الأشكال الذكية، وإضافة حد أبيض سميك (Die-Cut Effect) يشبه الملصقات المطبوعة الحقيقية. الأداة آمنة تماماً ولا تشارك صورك مع أي خوادم خارجية حفاظاً على الخصوصية والمثالية."
  },
  en: {
    title: "Pro WhatsApp & Telegram Sticker Builder",
    subtitle: "Design custom stickers, apply white borders, crop complex shapes, and inject fun subtitle memes. Processed 100% locally.",
    uploadLabel: "Choose an image to start (PNG, JPG, WebP)",
    dragDropText: "Drag and drop your image here or click to browse",
    sizeNote: "Format is automatically formatted to standard size specification (512x512 pixels) with alpha transparency.",
    settingsTitle: "Sticker Customization Studio",
    imageControls: "Image Position & Scale",
    scaleLabel: "Scale Factor",
    rotateLabel: "Rotation (Degrees)",
    offsetX: "Horizontal Offset (X)",
    offsetY: "Vertical Offset (Y)",

    effectsTitle: "Effects & Color Filters",
    filterNormal: "Normal / Reset",
    filterGrayscale: "Black & White",
    filterSepia: "Retro Sepia",
    filterInvert: "Invert Colors",
    filterBrightness: "Brightness",
    filterContrast: "Contrast",

    maskTitle: "Shape Cutout Mask",
    maskNone: "None (Full Picture Frame)",
    maskCircle: "Circle Mask",
    maskRoundedRect: "Rounded Rounded Canvas",
    maskHeart: "Love Heart Cutout",
    maskSpeech: "Comic Speech Bubble",
    maskStar: "Shining Star Emblem",
    maskHexagon: "Symmetric Hexagon",

    removeBgTitle: "Interactive Background Color Eraser",
    removeBgDesc: "Click any pixel in the large preview image below to turn that color completely transparent (great for solid backdrops).",
    bgRemoverActive: "Activate Color Eraser Keyer",
    toleranceLabel: "Color Detection Tolerance",
    bgSelectionState: "Chroma Key Color: ",
    noBgSelected: "No color picked yet. Click on the preview image to lock a background key.",

    borderTitle: "Die-Cut Sticker Border Outline",
    borderTypeNone: "No Border Outline",
    borderWhite: "Thick White Outline (Sticker Style)",
    borderCustom: "Custom Colored Outline",
    borderColorLabel: "Outline Color",
    borderSizeLabel: "Border Stroke Thickness",

    textTitle: "Meme Caption Text Overlays",
    topTextPlaceholder: "Top text caption...",
    bottomTextPlaceholder: "Bottom text caption...",
    fontSizeLabel: "Font Size",
    textColorLabel: "Text Color",
    textStrokeColorLabel: "Outline Color",
    textStrokeWidthLabel: "Outline Weight",

    badgeTitle: "Add Funny Emoji / Sticker Badge",
    badgeNone: "No Overlay Emoji",
    badgePlaceholder: "Insert built-in comic emoticons",
    badgeLabel: "Selected Badge",
    badgeX: "Badge Position X",
    badgeY: "Badge Position Y",
    badgeSize: "Badge Sizing scaling",

    canvasBgType: "Editor Preview Background",
    bgTransparent: "Alpha Grid Transparency",
    bgDark: "Solid Charcoal Backdrop",
    bgLight: "Solid White Backdrop",

    waInstructionsTitle: "How to export and load into WhatsApp?",
    waStep1: "1. Click download below to save the processed transparent PNG to your device.",
    waStep2: "2. Open any sticker pack app like 'Sticker.ly' or 'Sticker Maker' on your mobile phone.",
    waStep3: "3. Import your downloaded PNG file, crop if needed, and click 'Add to WhatsApp'.",

    tgInstructionsTitle: "How to export and load into Telegram?",
    tgStep1: "1. Download your sticker as PNG (it is encoded exactly to 512x512 specs corresponding to Telegram rules).",
    tgStep2: "2. Launch Telegram app and open the official bot channel: @Stickers",
    tgStep3: "3. Send /newpack command, then bind the preferred representative Emoji, and upload this PNG as an uncompressed 'File' attachment.",

    downloadPng: "Download Sticker as Transparent PNG",
    downloadWebp: "Download Sticker as Transparent WebP",
    resetBtn: "Reset Configurations",
    shareMsg: "Just designed my custom WhatsApp & Telegram stickers instantly using Pro Sticker Maker! Try this out here:",

    aboutTitle: "About the Sticker Maker Studio",
    aboutP1: "Sticker Maker Studio is a lightweight tool that runs entirely client-side. There are absolutely no uploads to any remote server, meaning complete confidentiality for your personal photos and memes.",
    aboutP2: "Featuring complex canvas operations, you can easily tweak rotation, scale, adjust hues/brightness, apply shapes, and generate a continuous thick white die-cut outline - imitating real physical sticker products. Safe, quick, and highly intuitive."
  }
};

const POPULAR_EMOJIS = [
  "😎", "👑", "🔥", "💬", "🎮", "💀", "💥", "❤️", "🔔", "⚠️", "💩", "🦄", "🐶", "🍕", "✨", "🌟", "👾", "👽", "🎉", "💯"
];

export default function StickerMaker({ lang }: { lang: 'ar' | 'en' }) {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string>("sticker");
  const [dragActive, setDragActive] = useState(false);

  // Position control states
  const [scale, setScale] = useState<number>(1.0);
  const [rotation, setRotation] = useState<number>(0);
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);

  // Color key transparency states
  const [eraserActive, setEraserActive] = useState<boolean>(false);
  const [chromaKeyColor, setChromaKeyColor] = useState<{ r: number; g: number; b: number } | null>(null);
  const [chromaTolerance, setChromaTolerance] = useState<number>(35);

  // Shape mask
  const [shapeMask, setShapeMask] = useState<'none' | 'circle' | 'rounded' | 'heart' | 'speech' | 'star' | 'hexagon'>('none');

  // Filters
  const [filterType, setFilterType] = useState<'normal' | 'grayscale' | 'sepia' | 'invert'>('normal');
  const [brightness, setBrightness] = useState<number>(100); // %
  const [contrast, setContrast] = useState<number>(100); // %

  // Border outline
  const [borderType, setBorderType] = useState<'none' | 'white' | 'custom'>('none');
  const [borderColor, setBorderColor] = useState<string>("#ffffff");
  const [borderSize, setBorderSize] = useState<number>(16);

  // Text overlay
  const [topText, setTopText] = useState<string>("");
  const [bottomText, setBottomText] = useState<string>("");
  const [fontSize, setFontSize] = useState<number>(36);
  const [textColor, setTextColor] = useState<string>("#ffffff");
  const [textStrokeColor, setTextStrokeColor] = useState<string>("#000000");
  const [textStrokeWidth, setTextStrokeWidth] = useState<number>(6);

  // Emoji badges
  const [badgeEmoji, setBadgeEmoji] = useState<string>("");
  const [badgeX, setBadgeX] = useState<number>(350);
  const [badgeY, setBadgeY] = useState<number>(120);
  const [badgeSize, setBadgeSize] = useState<number>(60);

  // Preview Grid Backdrop State
  const [editorBg, setEditorBg] = useState<'transparent' | 'dark' | 'light'>('transparent');

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const sourceImageRef = useRef<HTMLImageElement | null>(null);
  const displayCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Trigger file browser
  const handleSelectFile = () => {
    fileInputRef.current?.click();
  };

  const loadFile = (file: File) => {
    if (!file) return;
    const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.')) || "sticker";
    setImageName(nameWithoutExt);

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImageSrc(e.target.result as string);
        // Reset translation and position state on new file load
        setScale(0.85);
        setRotation(0);
        setOffsetX(0);
        setOffsetY(0);
        setChromaKeyColor(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      loadFile(e.target.files[0]);
    }
  };

  // Drag handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      loadFile(e.dataTransfer.files[0]);
    }
  };

  // Reset all parameters
  const handleReset = () => {
    setScale(1.0);
    setRotation(0);
    setOffsetX(0);
    setOffsetY(0);
    setEraserActive(false);
    setChromaKeyColor(null);
    setChromaTolerance(35);
    setShapeMask('none');
    setFilterType('normal');
    setBrightness(100);
    setContrast(100);
    setBorderType('none');
    setBorderColor("#ffffff");
    setBorderSize(16);
    setTopText("");
    setBottomText("");
    setFontSize(36);
    setTextColor("#ffffff");
    setTextStrokeColor("#000000");
    setTextStrokeWidth(6);
    setBadgeEmoji("");
    setBadgeX(350);
    setBadgeY(120);
    setBadgeSize(60);
  };

  // Handle color click coordinates on preview canvas directly to register Chroma Key
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!eraserActive || !displayCanvasRef.current || !sourceImageRef.current) return;
    
    const canvas = displayCanvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    // Calculate click coordinates mapped directly to 512x512 specs
    const clickX = Math.round(((e.clientX - rect.left) / rect.width) * canvas.width);
    const clickY = Math.round(((e.clientY - rect.top) / rect.height) * canvas.height);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const imgData = ctx.getImageData(clickX, clickY, 1, 1).data;
      setChromaKeyColor({
        r: imgData[0],
        g: imgData[1],
        b: imgData[2]
      });
    } catch (err) {
      console.error("Failed to fetch clicked color coordinates due to security or canvas state: ", err);
    }
  };

  // Main drawing engine compiling everything to a 512x512 Canvas
  useEffect(() => {
    if (!displayCanvasRef.current) return;
    const canvas = displayCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Standard high fidelity sticker specifications (Must be exactly 512x512 pixels)
    canvas.width = 512;
    canvas.height = 512;

    // Clear with fully transparent background
    ctx.clearRect(0, 0, 512, 512);

    if (!imageSrc) {
      // Draw placeholder text when empty
      ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
      ctx.font = "14px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(isAr ? "قم برفع صورة لعرض التعديلات المباشرة" : "Upload an image to start customization preview", 256, 256);
      return;
    }

    // Set up source image preloader to verify load state
    const img = new Image();
    img.src = imageSrc;
    img.crossOrigin = "anonymous";
    img.onload = () => {
      // 1. Create a separate virtual canvas for the raw image after processing Chroma Key Transparency
      const chromaCanvas = document.createElement('canvas');
      chromaCanvas.width = img.width;
      chromaCanvas.height = img.height;
      const chromaCtx = chromaCanvas.getContext('2d');
      if (!chromaCtx) return;

      chromaCtx.drawImage(img, 0, 0);

      if (chromaKeyColor) {
        try {
          const imgData = chromaCtx.getImageData(0, 0, img.width, img.height);
          const data = imgData.data;
          const { r: kr, g: kg, b: kb } = chromaKeyColor;
          
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            
            // Calculate Euclidian distance of colors
            const diff = Math.sqrt(
              Math.pow(r - kr, 2) +
              Math.pow(g - kg, 2) +
              Math.pow(b - kb, 2)
            );

            if (diff < chromaTolerance) {
              data[i + 3] = 0; // complete alpha transparency strip!
            }
          }
          chromaCtx.putImageData(imgData, 0, 0);
        } catch (e) {
          console.error("Chroma key matrix extraction failed: ", e);
        }
      }

      // 2. Compute translation values & draw to a temporary layout canvas centered at (256, 256)
      const layoutCanvas = document.createElement('canvas');
      layoutCanvas.width = 512;
      layoutCanvas.height = 512;
      const layoutCtx = layoutCanvas.getContext('2d');
      if (!layoutCtx) return;

      // Draw the image transformed to centered state
      layoutCtx.save();
      layoutCtx.translate(256 + offsetX, 256 + offsetY);
      layoutCtx.rotate((rotation * Math.PI) / 180);

      // Apply Filters directly to context for live image quality adjustments
      let filterString = `brightness(${brightness}%) contrast(${contrast}%)`;
      if (filterType === 'grayscale') filterString += " grayscale(100%)";
      else if (filterType === 'sepia') filterString += " sepia(100%)";
      else if (filterType === 'invert') filterString += " invert(100%)";
      layoutCtx.filter = filterString;

      // Draw keeping aspect ratio fitted with scaling
      const imgRatio = chromaCanvas.width / chromaCanvas.height;
      let drawW = 380; // Standard sticker target size fitting comfortably inside 512 specs
      let drawH = 380;
      if (imgRatio > 1) {
        drawH = 380 / imgRatio;
      } else {
        drawW = 380 * imgRatio;
      }

      // Apply zoom scale
      drawW *= scale;
      drawH *= scale;

      layoutCtx.drawImage(chromaCanvas, -drawW / 2, -drawH / 2, drawW, drawH);
      layoutCtx.restore();

      // Apply shape crop cutout mask on layout outcome if configured
      if (shapeMask !== 'none') {
        const maskedCanvas = document.createElement('canvas');
        maskedCanvas.width = 512;
        maskedCanvas.height = 512;
        const maskedCtx = maskedCanvas.getContext('2d');
        if (!maskedCtx) return;

        maskedCtx.save();
        maskedCtx.beginPath();
        if (shapeMask === 'circle') {
          maskedCtx.arc(256, 256, 170 * scale, 0, 2 * Math.PI);
        } else if (shapeMask === 'rounded') {
          const radius = 40 * scale;
          const w = 340 * scale;
          const h = 340 * scale;
          const x = 256 - w / 2;
          const y = 256 - h / 2;
          maskedCtx.roundRect(x, y, w, h, radius);
        } else if (shapeMask === 'heart') {
          const w = 360 * scale;
          const h = 360 * scale;
          const x = 256 - w / 2;
          const y = 256 - h / 2 + 30;
          // Draw Love Heart curves
          maskedCtx.moveTo(256, y + h * 0.3);
          maskedCtx.bezierCurveTo(256 - w * 0.4, y - h * 0.1, x, y + h * 0.4, 256, y + h * 0.85);
          maskedCtx.bezierCurveTo(256 + w * 0.4, y + h * 0.4, 256 + w * 0.4, y - h * 0.1, 256, y + h * 0.3);
        } else if (shapeMask === 'speech') {
          const w = 340 * scale;
          const h = 260 * scale;
          const x = 256 - w / 2;
          const y = 256 - h / 2 - 20;
          const r = 30 * scale;
          maskedCtx.roundRect(x, y, w, h, r);
          // Tail
          maskedCtx.moveTo(256 - 40 * scale, y + h);
          maskedCtx.lineTo(256 - 90 * scale, y + h + 50 * scale);
          maskedCtx.lineTo(256, y + h);
        } else if (shapeMask === 'hexagon') {
          const size = 180 * scale;
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const hx = 256 + size * Math.cos(angle);
            const hy = 256 + size * Math.sin(angle);
            if (i === 0) maskedCtx.moveTo(hx, hy);
            else maskedCtx.lineTo(hx, hy);
          }
          maskedCtx.closePath();
        } else if (shapeMask === 'star') {
          const spikes = 5;
          const outerRadius = 180 * scale;
          const innerRadius = 90 * scale;
          let rot = Math.PI / 2 * 3;
          let sx = 256;
          let sy = 256;
          const step = Math.PI / spikes;

          maskedCtx.moveTo(256, 256 - outerRadius);
          for (let i = 0; i < spikes; i++) {
            sx = 256 + Math.cos(rot) * outerRadius;
            sy = 256 + Math.sin(rot) * outerRadius;
            maskedCtx.lineTo(sx, sy);
            rot += step;

            sx = 256 + Math.cos(rot) * innerRadius;
            sy = 256 + Math.sin(rot) * innerRadius;
            maskedCtx.lineTo(sx, sy);
            rot += step;
          }
          maskedCtx.lineTo(256, 256 - outerRadius);
          maskedCtx.closePath();
        }

        maskedCtx.clip();
        maskedCtx.drawImage(layoutCanvas, 0, 0);
        maskedCtx.restore();

        // Overwrite standard layout canvas with masked outcome
        layoutCtx.clearRect(0, 0, 512, 512);
        layoutCtx.drawImage(maskedCanvas, 0, 0);
      }

      // 3. Draw outline / custom border behind the layout result if set
      if (borderType !== 'none') {
        const borderSizePx = borderSize;
        const strokeColorStr = borderType === 'white' ? "#ffffff" : borderColor;

        // Perform multiple offsets of layout mask to generate continuous thick border silhouette
        const borderCanvas = document.createElement('canvas');
        borderCanvas.width = 512;
        borderCanvas.height = 512;
        const borderCtx = borderCanvas.getContext('2d');
        if (borderCtx) {
          borderCtx.drawImage(layoutCanvas, 0, 0);
          
          // Force color of silhouette
          borderCtx.globalCompositeOperation = 'source-in';
          borderCtx.fillStyle = strokeColorStr;
          borderCtx.fillRect(0, 0, 512, 512);

          // Render compiled offsets on parent ctx
          ctx.save();
          // Draw stencil silhouette offsets in circular resolution (36 directions for flawless smoothness)
          for (let angle = 0; angle < 360; angle += 10) {
            const rad = (angle * Math.PI) / 180;
            const dx = Math.cos(rad) * borderSizePx;
            const dy = Math.sin(rad) * borderSizePx;
            ctx.drawImage(borderCanvas, dx, dy);
          }
          ctx.restore();
        }
      }

      // 4. Draw image onto the active context
      ctx.drawImage(layoutCanvas, 0, 0);

      // 5. Draw Dynamic text captions (Top and Bottom texts)
      ctx.save();
      ctx.font = `bold ${fontSize}px "Space Grotesk", "Impact", "Arial Black", sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Styled stroke border around text
      ctx.lineWidth = textStrokeWidth;
      ctx.strokeStyle = textStrokeColor;
      ctx.fillStyle = textColor;

      if (topText.trim()) {
        const tx = 256;
        const ty = 70;
        ctx.strokeText(topText, tx, ty);
        ctx.fillText(topText, tx, ty);
      }

      if (bottomText.trim()) {
        const bx = 256;
        const by = 440;
        ctx.strokeText(bottomText, bx, by);
        ctx.fillText(bottomText, bx, by);
      }
      ctx.restore();

      // 6. Draw Sticker Emoji Overlay badge if configured
      if (badgeEmoji) {
        ctx.save();
        ctx.font = `${badgeSize}px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(badgeEmoji, badgeX, badgeY);
        ctx.restore();
      }
    };
  }, [
    imageSrc, scale, rotation, offsetX, offsetY,
    chromaKeyColor, chromaTolerance, eraserActive,
    shapeMask, filterType, brightness, contrast,
    borderType, borderColor, borderSize,
    topText, bottomText, fontSize, textColor, textStrokeColor, textStrokeWidth,
    badgeEmoji, badgeX, badgeY, badgeSize, isAr
  ]);

  // Handle direct downloads to files
  const downloadSticker = (format: 'png' | 'webp') => {
    if (!displayCanvasRef.current || !imageSrc) return;
    const canvas = displayCanvasRef.current;
    
    try {
      const mime = format === 'webp' ? 'image/webp' : 'image/png';
      const dataUrl = canvas.toDataURL(mime, 0.95);
      
      const link = document.createElement('a');
      link.download = `${imageName}_sticker.${format}`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Downloader generated error: ", err);
    }
  };

  const shareTextMessage = t.shareMsg;

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-300">
      
      {/* Top Header Card Info Banner */}
      <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative overflow-hidden">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 bg-indigo-500/20 text-indigo-400 rounded-lg">
              <Smile size={20} className="animate-pulse" />
            </span>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{isAr ? 'عالم التعبير والمشاركة' : 'Sticker Creative Hub'}</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2">{t.title}</h2>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed max-w-2xl">{t.subtitle}</p>
        </div>
      </div>

      {/* Main Grid: Split controls and Viewports */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Interactive workspace: Controls Panel (Col size: 7) */}
        <div className="lg:col-span-7 flex flex-col gap-6">

          {/* Loader drag drop zone */}
          {!imageSrc ? (
            <div 
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={handleSelectFile}
              className={`p-12 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-4 text-center cursor-pointer transition-all ${
                dragActive 
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 scale-[1.01]' 
                  : 'border-white/10 bg-white/5 hover:bg-white/10 text-slate-400 hover:border-white/20'
              }`}
            >
              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/*"
                onChange={handleFileChange}
                className="hidden" 
              />
              <div className="p-4 bg-white/5 text-slate-200 rounded-full">
                <Upload size={32} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-slate-200">{t.uploadLabel}</span>
                <span className="text-xs text-slate-500">{t.dragDropText}</span>
              </div>
              <span className="text-[11px] text-slate-500 max-w-xs">{t.sizeNote}</span>
            </div>
          ) : (
            
            // Edit Panel
            <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col gap-6">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Scissors size={18} className="text-indigo-400" />
                  <span>{t.settingsTitle}</span>
                </h3>
                <button
                  onClick={handleReset}
                  className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[11px] font-bold text-slate-300 transition-colors flex items-center gap-1.5"
                >
                  <RefreshCw size={12} />
                  {t.resetBtn}
                </button>
              </div>

              {/* SECTION: Sliders (Sizing, Rotation, translation offset X/Y) */}
              <div className="flex flex-col gap-4">
                <span className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                  <Compass size={14} />
                  {t.imageControls}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-900/40 p-4 rounded-xl border border-white/5">
                  {/* Sizing scale */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-xs font-semibold text-slate-300">
                      <span>{t.scaleLabel}</span>
                      <span className="font-mono text-indigo-400">{Math.round(scale * 100)}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0.2" 
                      max="2.5" 
                      step="0.05"
                      value={scale}
                      onChange={(e) => setScale(parseFloat(e.target.value))}
                      className="w-full accent-indigo-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Rotation angle */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-xs font-semibold text-slate-300">
                      <span>{t.rotateLabel}</span>
                      <span className="font-mono text-indigo-400">{rotation}°</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="360" 
                      step="5"
                      value={rotation}
                      onChange={(e) => setRotation(parseInt(e.target.value))}
                      className="w-full accent-indigo-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Offset displacement X */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-xs font-semibold text-slate-300">
                      <span>{t.offsetX}</span>
                      <span className="font-mono text-indigo-400">{offsetX}px</span>
                    </div>
                    <input 
                      type="range" 
                      min="-250" 
                      max="250" 
                      step="2"
                      value={offsetX}
                      onChange={(e) => setOffsetX(parseInt(e.target.value))}
                      className="w-full accent-indigo-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Offset displacement Y */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-xs font-semibold text-slate-300">
                      <span>{t.offsetY}</span>
                      <span className="font-mono text-indigo-400">{offsetY}px</span>
                    </div>
                    <input 
                      type="range" 
                      min="-250" 
                      max="250" 
                      step="2"
                      value={offsetY}
                      onChange={(e) => setOffsetY(parseInt(e.target.value))}
                      className="w-full accent-indigo-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION: Background Color keyed Transparency eraser */}
              <div className="flex flex-col gap-3 border-t border-white/5 pt-4">
                <span className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                  <Layers size={14} />
                  {t.removeBgTitle}
                </span>
                
                <p className="text-[11px] text-slate-400 leading-relaxed bg-slate-900/30 p-2.5 rounded-lg border border-white/5">
                  {t.removeBgDesc}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <button
                    onClick={() => setEraserActive(!eraserActive)}
                    className={`py-2 px-4 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all ${
                      eraserActive 
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' 
                        : 'bg-white/5 text-slate-300 border-white/5 hover:bg-white/10'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${eraserActive ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`} />
                    <span>{t.bgRemoverActive}</span>
                  </button>

                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="font-semibold">{t.bgSelectionState}</span>
                    {chromaKeyColor ? (
                      <div className="flex items-center gap-1.5">
                        <span 
                          className="w-4 h-4 rounded-full border border-white/20 shadow-md inline-block" 
                          style={{ backgroundColor: `rgb(${chromaKeyColor.r}, ${chromaKeyColor.g}, ${chromaKeyColor.b})` }}
                        />
                        <span className="font-mono text-[10px] text-white">rgb({chromaKeyColor.r},{chromaKeyColor.g},{chromaKeyColor.b})</span>
                        <button 
                          onClick={() => setChromaKeyColor(null)}
                          className="text-red-400 hover:text-red-300 p-0.5"
                          title="Clear Key color"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ) : (
                      <span className="text-slate-500 italic text-[11px]">{t.noBgSelected}</span>
                    )}
                  </div>
                </div>

                {chromaKeyColor && (
                  <div className="flex flex-col gap-1 mt-1">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>{t.toleranceLabel}</span>
                      <span className="font-mono text-indigo-400">{chromaTolerance}</span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="150" 
                      step="2"
                      value={chromaTolerance}
                      onChange={(e) => setChromaTolerance(parseInt(e.target.value))}
                      className="w-full accent-indigo-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>
                )}
              </div>

              {/* SECTION: Shape Cutout Mask Selector */}
              <div className="flex flex-col gap-3 border-t border-white/5 pt-4">
                <span className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                  <Crop size={14} />
                  {t.maskTitle}
                </span>

                <div className="flex flex-wrap gap-1.5">
                  {([
                    { id: 'none', label: t.maskNone },
                    { id: 'circle', label: t.maskCircle },
                    { id: 'rounded', label: t.maskRoundedRect },
                    { id: 'heart', label: t.maskHeart },
                    { id: 'speech', label: t.maskSpeech },
                    { id: 'hexagon', label: t.maskHexagon },
                    { id: 'star', label: t.maskStar }
                  ] as const).map(m => (
                    <button
                      key={m.id}
                      onClick={() => setShapeMask(m.id)}
                      className={`py-1.5 px-3 rounded-lg text-xs font-bold border transition-colors ${
                        shapeMask === m.id
                          ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40'
                          : 'bg-white/5 text-slate-400 border-transparent hover:bg-white/10'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* SECTION: Border Stroke Styles (White outline vs Custom color outline) */}
              <div className="flex flex-col gap-3 border-t border-white/5 pt-4">
                <span className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                  <Palette size={14} />
                  {t.borderTitle}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    onClick={() => setBorderType('none')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                      borderType === 'none'
                        ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40'
                        : 'bg-white/5 text-slate-400 border-transparent hover:bg-white/10'
                    }`}
                  >
                    {t.borderTypeNone}
                  </button>
                  <button
                    onClick={() => setBorderType('white')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                      borderType === 'white'
                        ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40'
                        : 'bg-white/5 text-slate-400 border-transparent hover:bg-white/10'
                    }`}
                  >
                    {t.borderWhite}
                  </button>
                  <button
                    onClick={() => setBorderType('custom')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                      borderType === 'custom'
                        ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40'
                        : 'bg-white/5 text-slate-400 border-transparent hover:bg-white/10'
                    }`}
                  >
                    {t.borderCustom}
                  </button>
                </div>

                {borderType !== 'none' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-900/40 p-4 rounded-xl border border-white/5 mt-1">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-slate-400 font-semibold">{t.borderSizeLabel}</label>
                      <div className="flex items-center gap-3">
                        <input 
                          type="range" 
                          min="3" 
                          max="30" 
                          step="1"
                          value={borderSize}
                          onChange={(e) => setBorderSize(parseInt(e.target.value))}
                          className="flex-grow accent-indigo-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
                        />
                        <span className="text-xs font-mono font-bold text-indigo-400">{borderSize}px</span>
                      </div>
                    </div>

                    {borderType === 'custom' && (
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-slate-400 font-semibold">{t.borderColorLabel}</label>
                        <div className="flex items-center gap-2">
                          <input 
                            type="color" 
                            value={borderColor}
                            onChange={(e) => setBorderColor(e.target.value)}
                            className="bg-transparent border-none cursor-pointer w-8 h-8 rounded"
                          />
                          <input 
                            type="text" 
                            value={borderColor}
                            onChange={(e) => setBorderColor(e.target.value)}
                            className="bg-slate-900 border border-white/10 rounded-lg px-2 py-1 text-xs text-white font-mono flex-grow focus:outline-none"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* SECTION: Color Filter / Hues Preset Filters */}
              <div className="flex flex-col gap-3 border-t border-white/5 pt-4">
                <span className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                  <Sparkles size={14} />
                  {t.effectsTitle}
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {([
                    { id: 'normal', label: t.filterNormal },
                    { id: 'grayscale', label: t.filterGrayscale },
                    { id: 'sepia', label: t.filterSepia },
                    { id: 'invert', label: t.filterInvert }
                  ] as const).map(item => (
                    <button
                      key={item.id}
                      onClick={() => setFilterType(item.id)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-bold border text-center transition-colors ${
                        filterType === item.id
                          ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40'
                          : 'bg-white/5 text-slate-400 border-transparent hover:bg-white/10'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                {/* Brightness / Contrast range adjustments */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-900/40 p-4 rounded-xl border border-white/5 mt-1">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-xs text-slate-400 font-semibold">
                      <span>{t.filterBrightness}</span>
                      <span className="font-mono text-indigo-400">{brightness}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="50" 
                      max="180" 
                      step="5"
                      value={brightness}
                      onChange={(e) => setBrightness(parseInt(e.target.value))}
                      className="w-full accent-indigo-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-xs text-slate-400 font-semibold">
                      <span>{t.filterContrast}</span>
                      <span className="font-mono text-indigo-400">{contrast}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="50" 
                      max="180" 
                      step="5"
                      value={contrast}
                      onChange={(e) => setContrast(parseInt(e.target.value))}
                      className="w-full accent-indigo-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION: Subtitle Meme Custom Caption Editor */}
              <div className="flex flex-col gap-3 border-t border-white/5 pt-4">
                <span className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                  <Type size={14} />
                  {t.textTitle}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={topText}
                    onChange={(e) => setTopText(e.target.value)}
                    placeholder={t.topTextPlaceholder}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                  <input
                    type="text"
                    value={bottomText}
                    onChange={(e) => setBottomText(e.target.value)}
                    placeholder={t.bottomTextPlaceholder}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-900/40 p-4 rounded-xl border border-white/5 mt-1">
                  
                  {/* Font Sizing */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-xs text-slate-400 font-semibold">
                      <span>{t.fontSizeLabel}</span>
                      <span className="font-mono text-indigo-400">{fontSize}px</span>
                    </div>
                    <input 
                      type="range" 
                      min="16" 
                      max="72" 
                      step="2"
                      value={fontSize}
                      onChange={(e) => setFontSize(parseInt(e.target.value))}
                      className="w-full accent-indigo-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Text Color */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-400 font-semibold">{t.textColorLabel}</label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="color" 
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="bg-transparent border-none cursor-pointer w-7 h-7 rounded"
                      />
                      <input 
                        type="text" 
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="bg-slate-900 border border-white/10 rounded-lg px-2 py-1 text-[10px] text-white font-mono flex-grow focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Text Stroke Color */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-400 font-semibold">{t.textStrokeColorLabel}</label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="color" 
                        value={textStrokeColor}
                        onChange={(e) => setTextStrokeColor(e.target.value)}
                        className="bg-transparent border-none cursor-pointer w-7 h-7 rounded"
                      />
                      <input 
                        type="text" 
                        value={textStrokeColor}
                        onChange={(e) => setTextStrokeColor(e.target.value)}
                        className="bg-slate-900 border border-white/10 rounded-lg px-2 py-1 text-[10px] text-white font-mono flex-grow focus:outline-none"
                      />
                    </div>
                  </div>

                </div>
              </div>

              {/* SECTION: Custom Emoji Sub-Badge Sticker Overlays */}
              <div className="flex flex-col gap-3 border-t border-white/5 pt-4">
                <span className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                  <Smile size={14} />
                  {t.badgeTitle}
                </span>

                <div className="flex flex-wrap gap-2 p-3 bg-slate-900/40 rounded-xl border border-white/5">
                  <button
                    onClick={() => setBadgeEmoji("")}
                    className={`py-1 px-3.5 rounded-lg text-xs font-bold border text-center transition-colors ${
                      !badgeEmoji
                        ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                        : 'bg-white/5 text-slate-400 border-transparent hover:bg-white/10'
                    }`}
                  >
                    {t.badgeNone}
                  </button>

                  <div className="flex flex-wrap gap-1">
                    {POPULAR_EMOJIS.map(item => (
                      <button
                        key={item}
                        onClick={() => {
                          setBadgeEmoji(item);
                          // Assign centered default offset relative to badge properties
                          setBadgeX(350);
                          setBadgeY(150);
                        }}
                        className={`text-xl p-1.5 rounded-lg hover:bg-white/15 transition-all transform hover:scale-110 ${
                          badgeEmoji === item ? 'bg-indigo-500/20 ring-2 ring-indigo-500/50' : 'bg-transparent'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {badgeEmoji && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-900/40 p-4 rounded-xl border border-white/5 mt-1">
                    {/* Badge Sizing */}
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>{t.badgeSize}</span>
                        <span className="font-mono text-indigo-400">{badgeSize}px</span>
                      </div>
                      <input 
                        type="range" 
                        min="25" 
                        max="140" 
                        step="2"
                        value={badgeSize}
                        onChange={(e) => setBadgeSize(parseInt(e.target.value))}
                        className="w-full accent-indigo-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
                      />
                    </div>

                    {/* Badge X */}
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>{t.badgeX}</span>
                        <span className="font-mono text-indigo-400">{badgeX}px</span>
                      </div>
                      <input 
                        type="range" 
                        min="20" 
                        max="490" 
                        step="4"
                        value={badgeX}
                        onChange={(e) => setBadgeX(parseInt(e.target.value))}
                        className="w-full accent-indigo-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
                      />
                    </div>

                    {/* Badge Y */}
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>{t.badgeY}</span>
                        <span className="font-mono text-indigo-400">{badgeY}px</span>
                      </div>
                      <input 
                        type="range" 
                        min="20" 
                        max="490" 
                        step="4"
                        value={badgeY}
                        onChange={(e) => setBadgeY(parseInt(e.target.value))}
                        className="w-full accent-indigo-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Image Input file hidden tag storage ref */}
              <img 
                ref={sourceImageRef}
                src={imageSrc} 
                alt="Original Source"
                className="hidden"
                crossOrigin="anonymous"
              />

            </div>
          )}

        </div>

        {/* Right Active Preview: Live Interactive Canvas (Col size: 5) */}
        <div className="lg:col-span-5 flex flex-col gap-6">

          {/* Canvas Previewer box holding 512x512 resolution representation */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col items-center gap-4">
            
            {/* Checkerboard preview backgrounds selector */}
            <div className="w-full flex justify-between items-center pb-2 border-b border-white/10 text-xs">
              <span className="font-bold text-slate-300">{t.canvasBgType}:</span>
              
              <div className="flex gap-1">
                <button
                  onClick={() => setEditorBg('transparent')}
                  className={`py-1 px-2.5 rounded text-[10px] font-bold border transition-colors ${
                    editorBg === 'transparent'
                      ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
                      : 'bg-white/5 text-slate-400 border-transparent hover:bg-white/10'
                  }`}
                >
                  {t.bgTransparent}
                </button>
                <button
                  onClick={() => setEditorBg('dark')}
                  className={`py-1 px-2.5 rounded text-[10px] font-bold border transition-colors ${
                    editorBg === 'dark'
                      ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
                      : 'bg-white/5 text-slate-400 border-transparent hover:bg-white/10'
                  }`}
                >
                  {t.bgDark}
                </button>
                <button
                  onClick={() => setEditorBg('light')}
                  className={`py-1 px-2.5 rounded text-[10px] font-bold border transition-colors ${
                    editorBg === 'light'
                      ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
                      : 'bg-white/5 text-slate-400 border-transparent hover:bg-white/10'
                  }`}
                >
                  {t.bgLight}
                </button>
              </div>
            </div>

            {/* Core interactive preview frame drawing */}
            <div className="w-full max-w-[340px] aspect-square relative rounded-xl border border-white/15 overflow-hidden shadow-2xl flex items-center justify-center">
              
              {/* Conditional grid background styling for optimal transparency outline adjustments */}
              {editorBg === 'transparent' ? (
                <div className="absolute inset-0 bg-[linear-gradient(45deg,#1e293b_25%,transparent_25%),linear-gradient(-45deg,#1e293b_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#1e293b_75%),linear-gradient(-45deg,transparent_75%,#1e293b_75%)] bg-[size:16px_16px] bg-[position:0_0,0_8px,8px_-8px,-8px_0] bg-slate-950/60 z-0 opacity-80" />
              ) : editorBg === 'dark' ? (
                <div className="absolute inset-0 bg-slate-900 z-0" />
              ) : (
                <div className="absolute inset-0 bg-white z-0" />
              )}

              {/* Main Canvas Node */}
              <canvas
                ref={displayCanvasRef}
                onClick={handleCanvasClick}
                className={`relative z-10 w-full h-full block cursor-crosshair ${
                  eraserActive && imageSrc ? 'ring-2 ring-emerald-400/50' : ''
                }`}
                title={eraserActive && imageSrc ? (isAr ? "انقر على لون من الصورة الكبيرة لحذفه وجعله شفافاً" : "Click anywhere on image to key-out background color") : ""}
              />
            </div>

            {/* Clear manual loader link trigger if already uploaded image is set */}
            {imageSrc && (
              <div className="w-full flex flex-col gap-2 mt-2">
                
                {/* Download PNG button */}
                <button
                  onClick={() => downloadSticker('png')}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 font-bold text-slate-900 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-[0.99] transition-transform"
                >
                  <Download size={15} />
                  <span>{t.downloadPng}</span>
                </button>

                {/* Download WebP option */}
                <button
                  onClick={() => downloadSticker('webp')}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 font-bold text-white border border-indigo-400/20 rounded-xl text-[11px] flex items-center justify-center gap-2 active:scale-[0.99] transition-transform"
                >
                  <FileCheck size={14} />
                  <span>{t.downloadWebp}</span>
                </button>

                {/* Reset Image option */}
                <button
                  onClick={() => {
                    setImageSrc(null);
                    handleReset();
                  }}
                  className="w-full py-2 bg-red-500/15 hover:bg-red-500/25 border border-red-500/20 text-red-400 rounded-xl text-[11px] font-bold transition-all"
                >
                  {isAr ? "حذف الصورة واختيار أخرى" : "Delete Image & Select Another"}
                </button>
              </div>
            )}

          </div>

          {/* Social share widget integration */}
          {imageSrc && (
            <ShareButtons text={shareTextMessage} lang={lang} />
          )}

        </div>

      </div>

      {/* Step by Step integration instructions for Telegram & WhatsApp */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
        
        {/* WhatsApp guide card */}
        <div className="p-5 rounded-2xl border border-white/10 bg-emerald-950/15 backdrop-blur-xl flex flex-col gap-3">
          <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2 pb-2 border-b border-emerald-500/10">
            <span className="p-1 bg-emerald-500/20 rounded-md text-emerald-400">🔥</span>
            <span>{t.waInstructionsTitle}</span>
          </h4>
          <ul className="text-xs text-slate-300 leading-relaxed space-y-2.5">
            <li>{t.waStep1}</li>
            <li>{t.waStep2}</li>
            <li>{t.waStep3}</li>
          </ul>
        </div>

        {/* Telegram guide card */}
        <div className="p-5 rounded-2xl border border-white/10 bg-indigo-950/15 backdrop-blur-xl flex flex-col gap-3">
          <h4 className="text-sm font-bold text-indigo-400 flex items-center gap-2 pb-2 border-b border-indigo-500/10">
            <span className="p-1 bg-indigo-500/20 rounded-md text-indigo-400">⚡</span>
            <span>{t.tgInstructionsTitle}</span>
          </h4>
          <ul className="text-xs text-slate-300 leading-relaxed space-y-2.5">
            <li>{t.tgStep1}</li>
            <li>{t.tgStep2}</li>
            <li>{t.tgStep3}</li>
          </ul>
        </div>

      </div>

      {/* About Section explaining algorithmic background operations */}
      <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col gap-4 mt-2">
        <h3 className="text-md font-bold text-indigo-400 flex items-center gap-2 border-b border-white/5 pb-2">
          <Info size={18} />
          <span>{t.aboutTitle}</span>
        </h3>
        <p className="text-xs md:text-sm text-slate-400 leading-relaxed">{t.aboutP1}</p>
        <p className="text-xs md:text-sm text-slate-400 leading-relaxed">{t.aboutP2}</p>
      </div>

    </div>
  );
}
