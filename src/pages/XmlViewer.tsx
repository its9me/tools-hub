import React, { useState, useRef, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { 
  FileCode, Upload, Search, Copy, Download, Trash2, 
  Wand2, Minimize, Check, AlertTriangle, Play,
  TrendingUp, Info, FileText, Share2, FolderOpen, 
  ChevronRight, ChevronDown, ListFilter, HelpCircle, Braces
} from 'lucide-react';

const SAMPLES = {
  bookstore: `<?xml version="1.0" encoding="UTF-8"?>
<bookstore name="Galaxy Books" location="Online Hub" timezone="UTC+3" xmlns:media="http://search.yahoo.com/mrss/">
  <!-- Best sellers list of 2026 -->
  <book category="GUIDES" id="bk101">
    <author>Al-Albabli, Ali</author>
    <title>SEO &amp; Web Mechanics for Founders</title>
    <publish_date>2026-03-12</publish_date>
    <price currency="USD">24.99</price>
    <media:thumbnail url="https://picsum.photos/200" width="100" height="150" />
    <summary>A deep technical deep-dive into Robots.txt, XML sitemaps, and indexing algorithms with zero-latency paradigms.</summary>
  </book>
  <book category="DEVELOPMENT" id="bk102">
    <author>DeepMind, Google</author>
    <title>Symphony of AI Coding Agents</title>
    <publish_date>2026-06-10</publish_date>
    <price currency="USD">49.99</price>
    <summary>A masterpiece teaching developer-agent frameworks and high-fidelity rapid full-stack crafting.</summary>
  </book>
  <book category="HEALTH" id="bk103">
    <author>Mellisa, S.</author>
    <title>The Circadian Fuel Optimization</title>
    <publish_date>2025-11-20</publish_date>
    <price currency="IQD">35000</price>
    <summary>Scientific approaches evaluating calorie metrics, hydration dynamics, and circadian sleep synchronization.</summary>
  </book>
</bookstore>`,
  rss: `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Hub Tools &amp; Web Solutions Feed</title>
    <link>https://hubtools.app</link>
    <description>Interactive free client-side applications for developers, students and digital workspace creators.</description>
    <language>ar-IQ</language>
    <lastBuildDate>Wed, 10 Jun 2026 12:00:00 GMT</lastBuildDate>
    <item>
      <title>XML File Viewer launch</title>
      <link>https://hubtools.app/tool/xml-viewer</link>
      <description>Read, parse, inspect, and beautify XML files locally inside the browser with zero remote connections.</description>
      <pubDate>Wed, 10 Jun 2026 10:00:00 GMT</pubDate>
      <guid>feed-item-v1-xml</guid>
    </item>
    <item>
      <title>Text Diff &amp; Line Suite update</title>
      <link>https://hubtools.app/tool/text-diff-suite</link>
      <description>Compare text content side by side, search changes, remove duplicates and sort lines instantly.</description>
      <pubDate>Mon, 08 Jun 2026 15:30:00 GMT</pubDate>
      <guid>feed-item-text-diff</guid>
    </item>
  </channel>
</rss>`,
  excelXml: `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
          xmlns:o="urn:schemas-microsoft-com:office:office"
          xmlns:x="urn:schemas-microsoft-com:office:excel"
          xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
          xmlns:html="http://www.w3.org/TR/REC-html40">
  <!-- Excel SpreadsheetML XML Format -->
  <DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">
    <Author>Ali Al-Albabli</Author>
    <Created>2026-06-10T12:00:00Z</Created>
    <Version>16.0</Version>
  </DocumentProperties>
  <Styles>
    <Style ss:ID="Default" ss:Name="Normal">
      <Alignment ss:Vertical="Bottom"/>
      <Font ss:FontName="Calibri" ss:Size="11" ss:Color="#FFFFFF"/>
    </Style>
    <Style ss:ID="sHeader">
      <Font ss:FontName="Calibri" ss:Size="11" ss:Color="#030712" ss:Bold="1"/>
      <Interior ss:Color="#06B6D4" ss:Pattern="Solid"/>
    </Style>
  </Styles>
  <Worksheet ss:Name="Spreadsheet 2026">
    <Table>
      <Row>
        <Cell ss:StyleID="sHeader"><Data ss:Type="String">Product</Data></Cell>
        <Cell ss:StyleID="sHeader"><Data ss:Type="String">Category</Data></Cell>
        <Cell ss:StyleID="sHeader"><Data ss:Type="String">Status</Data></Cell>
      </Row>
      <Row>
        <Cell><Data ss:Type="String">XML Suite Pro</Data></Cell>
        <Cell><Data ss:Type="String">Developers</Data></Cell>
        <Cell><Data ss:Type="String">Completed</Data></Cell>
      </Row>
      <Row>
        <Cell><Data ss:Type="String">Calculators Hub</Data></Cell>
        <Cell><Data ss:Type="String">Productivity</Data></Cell>
        <Cell><Data ss:Type="String">Active</Data></Cell>
      </Row>
    </Table>
  </Worksheet>
</Workbook>`
};

interface XmlNode {
  id: string;
  type: 'element' | 'text' | 'comment' | 'cdata';
  name: string;
  value?: string;
  attributes?: Record<string, string>;
  children?: XmlNode[];
  level: number;
}

interface XmlStats {
  elementsCount: number;
  attributesCount: number;
  commentsCount: number;
  maxDepth: number;
  tagFrequency: Record<string, number>;
  namespaces: string[];
}

export default function XmlViewer({ lang }: { lang: 'ar' | 'en' }) {
  const isAr = lang === 'ar';
  
  const [xmlInput, setXmlInput] = useState<string>(SAMPLES.bookstore);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [parsedTree, setParsedTree] = useState<XmlNode | null>(null);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const [stats, setStats] = useState<XmlStats | null>(null);
  
  const [copied, setCopied] = useState<boolean>(false);
  const [formattedMsg, setFormattedMsg] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'tree' | 'json' | 'stats'>('tree');
  
  // Node open/collapse dictionary
  const [collapsedNodes, setCollapsedNodes] = useState<Record<string, boolean>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Parse XML input whenever it changes
  useEffect(() => {
    const trimmedInput = xmlInput.trim();
    if (!trimmedInput) {
      setParsedTree(null);
      setErrorStatus(null);
      setStats(null);
      return;
    }

    // Binary XLS signature or general non-XML text check
    if (trimmedInput.charCodeAt(0) === 0xD0 || trimmedInput.charCodeAt(0) === 0x50 || (trimmedInput && !trimmedInput.startsWith('<'))) {
      setErrorStatus(isAr 
        ? "تنبيه: يبدو أن هذا ملف XLS أو XLSX ثنائي (Binary). هل قمت بنسخه ولصقه كنص؟ يرجى سحب وإفلات أو اختيار الملف مباشرة باستخدام وحدة الرفع بالأعلى حتى نقوم بتحويله وتنسيقه كشجرة XML تفاعلية محلياً."
        : "Note: This looks like binary XLS/XLSX spreadsheet bytes. Did you copy-paste raw text? Please upload or drop the actual spreadsheet file directly using the section above to inspect it as a clean local XML tree model."
      );
      setParsedTree(null);
      setStats(null);
      return;
    }

    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlInput, "text/xml");
      
      // Check for parsererror
      const parserErrorNode = xmlDoc.getElementsByTagName("parsererror")[0] || xmlDoc.querySelector("parsererror");
      if (parserErrorNode) {
        setErrorStatus(parserErrorNode.textContent || (isAr ? "صيغة XML غير صالحة." : "Invalid XML syntax format."));
        setParsedTree(null);
        setStats(null);
        return;
      }

      setErrorStatus(null);

      // Recursive node parser
      let nodeIdCounter = 0;
      const parseNode = (domNode: Node, level = 0): XmlNode => {
        const id = `node-${nodeIdCounter++}`;
        
        if (domNode.nodeType === Node.COMMENT_NODE) {
          return {
            id,
            type: 'comment',
            name: '#comment',
            value: domNode.nodeValue || '',
            level
          };
        }
        
        if (domNode.nodeType === Node.CDATA_SECTION_NODE) {
          return {
            id,
            type: 'cdata',
            name: '#cdata',
            value: domNode.nodeValue || '',
            level
          };
        }

        if (domNode.nodeType === Node.TEXT_NODE) {
          return {
            id,
            type: 'text',
            name: '#text',
            value: domNode.nodeValue || '',
            level
          };
        }

        if (domNode.nodeType === Node.ELEMENT_NODE) {
          const element = domNode as Element;
          const attributes: Record<string, string> = {};
          for (let i = 0; i < element.attributes.length; i++) {
            const attr = element.attributes[i];
            attributes[attr.name] = attr.value;
          }

          const children: XmlNode[] = [];
          for (let i = 0; i < element.childNodes.length; i++) {
            const parsedChild = parseNode(element.childNodes[i], level + 1);
            // clean useless spaces text nodes
            if (parsedChild.type === 'text' && !parsedChild.value?.trim()) {
              continue;
            }
            children.push(parsedChild);
          }

          return {
            id,
            type: 'element',
            name: element.tagName,
            attributes,
            children,
            level
          };
        }

        return {
          id,
          type: 'text',
          name: '#unknown',
          value: '',
          level
        };
      };

      const rootNode = parseNode(xmlDoc.documentElement, 0);
      setParsedTree(rootNode);

      // Compute statistics & metrics
      const calculatedStats: XmlStats = {
        elementsCount: 0,
        attributesCount: 0,
        commentsCount: 0,
        maxDepth: 0,
        tagFrequency: {},
        namespaces: []
      };

      const scanStats = (node: XmlNode) => {
        if (node.level > calculatedStats.maxDepth) {
          calculatedStats.maxDepth = node.level;
        }

        if (node.type === 'comment') {
          calculatedStats.commentsCount++;
        } else if (node.type === 'element') {
          calculatedStats.elementsCount++;
          
          const tagName = node.name;
          calculatedStats.tagFrequency[tagName] = (calculatedStats.tagFrequency[tagName] || 0) + 1;

          if (node.attributes) {
            const attrs = Object.keys(node.attributes);
            calculatedStats.attributesCount += attrs.length;
            attrs.forEach(attrName => {
              if (attrName.startsWith('xmlns') && node.attributes) {
                const nsVal = node.attributes[attrName];
                if (!calculatedStats.namespaces.includes(nsVal)) {
                  calculatedStats.namespaces.push(nsVal);
                }
              }
            });
          }
        }

        if (node.children) {
          node.children.forEach(scanStats);
        }
      };

      scanStats(rootNode);
      setStats(calculatedStats);

    } catch (err: any) {
      setErrorStatus(err?.message || (isAr ? "تحذير: حدث خطأ أثناء تحليل ملف الـ XML." : "Error parsing raw XML."));
      setParsedTree(null);
      setStats(null);
    }
  }, [xmlInput, isAr]);

  // Handle Drag & Drop events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      loadFile(files[0]);
    }
  };

  const escapeXml = (unsafe: string): string => {
    return unsafe.replace(/[<>&'"]/g, (c) => {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
        default: return c;
      }
    });
  };

  const convertWorkbookToXml = (workbook: XLSX.WorkBook): string => {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<Workbook>\n';
    
    workbook.SheetNames.forEach(sheetName => {
      const sheet = workbook.Sheets[sheetName];
      // Convert worksheets to clean arrays
      const rows: any[] = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" });
      const escapedSheetName = escapeXml(sheetName);
      
      xml += `  <Worksheet name="${escapedSheetName}">\n`;
      xml += '    <Table>\n';
      
      rows.forEach((row, rowIndex) => {
        // Only output rows if they have elements
        if (Array.isArray(row) && row.some(cell => String(cell).trim() !== "")) {
          xml += `      <Row index="${rowIndex + 1}">\n`;
          row.forEach((cell, cellIndex) => {
            const cellType = typeof cell === 'number' ? 'Number' : 'String';
            const cellVal = escapeXml(String(cell));
            xml += `        <CellCol_${cellIndex + 1} type="${cellType}">${cellVal}</CellCol_${cellIndex + 1}>\n`;
          });
          xml += '      </Row>\n';
        }
      });
      
      xml += '    </Table>\n';
      xml += '  </Worksheet>\n';
    });
    
    xml += '</Workbook>';
    return xml;
  };

  const loadFile = (file: File) => {
    const filenameLower = file.name.toLowerCase();
    const isExcelBin = filenameLower.endsWith('.xls') || 
                       filenameLower.endsWith('.xlsx') || 
                       filenameLower.endsWith('.ods') || 
                       filenameLower.endsWith('.csv');

    if (isExcelBin) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const buffer = e.target?.result as ArrayBuffer;
          const data = new Uint8Array(buffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const convertedXml = convertWorkbookToXml(workbook);
          setXmlInput(convertedXml);
        } catch (err: any) {
          setErrorStatus(isAr 
            ? `فشل في قراءة وتفسير ملف الإكسل: ${err?.message || 'خطأ غير معروف'}`
            : `Failed to parse Excel spreadsheet: ${err?.message || 'unknown error'}`
          );
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        if (typeof text === 'string') {
          // Check for signature of binary XLS/ZIP (.xlsx has 0x50 'P' i.e. ZIP, XLS has 0xD0)
          if (text.charCodeAt(0) === 0x50 || text.charCodeAt(0) === 0xD0) {
            const tryBinaryReader = new FileReader();
            tryBinaryReader.onload = (binaryEvent) => {
              try {
                const buffer = binaryEvent.target?.result as ArrayBuffer;
                const data = new Uint8Array(buffer);
                const workbook = XLSX.read(data, { type: 'array' });
                const convertedXml = convertWorkbookToXml(workbook);
                setXmlInput(convertedXml);
              } catch (xlsxErr) {
                // If it fails, fallback to keeping original text
                setXmlInput(text);
              }
            };
            tryBinaryReader.readAsArrayBuffer(file);
            return;
          }
          setXmlInput(text);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleFileUploadBtn = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      loadFile(files[0]);
    }
  };

  // Convert parsed XML Tree into a formatted JSON string
  const getJsonRepresentation = (): string => {
    if (!parsedTree) return '{}';
    
    // Convert to a simplified, user-friendly structured JSON object
    const simplifyNode = (node: XmlNode): any => {
      if (node.type === 'comment') {
        return { _comment: node.value };
      }
      if (node.type === 'text') {
        return node.value;
      }
      if (node.type === 'cdata') {
        return { _cdata: node.value };
      }

      const obj: any = {};
      
      // Node attributes
      if (node.attributes && Object.keys(node.attributes).length > 0) {
        obj._attributes = node.attributes;
      }

      // Children nodes
      if (node.children && node.children.length > 0) {
        // If there are child elements, let's group them or serialize them
        node.children.forEach(child => {
          if (child.type === 'text') {
            obj._text = child.value;
          } else {
            const childKey = child.name;
            const simplified = simplifyNode(child);
            
            if (obj[childKey]) {
              if (Array.isArray(obj[childKey])) {
                obj[childKey].push(simplified);
              } else {
                obj[childKey] = [obj[childKey], simplified];
              }
            } else {
              obj[childKey] = simplified;
            }
          }
        });
      }
      
      return obj;
    };

    const treeObj = { [parsedTree.name]: simplifyNode(parsedTree) };
    return JSON.stringify(treeObj, null, 2);
  };

  // DOM node traversal formatter to beautify string
  const handleBeautify = () => {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlInput, "text/xml");
      const parserErrorNode = xmlDoc.getElementsByTagName("parsererror")[0] || xmlDoc.querySelector("parsererror");
      if (parserErrorNode) {
        throw new Error(parserErrorNode.textContent || "Syntax Error");
      }

      const formatNode = (node: Node, indent = 0): string => {
        const spaces = '  '.repeat(indent);
        
        if (node.nodeType === Node.COMMENT_NODE) {
          return `${spaces}<!-- ${node.nodeValue?.trim()} -->`;
        }
        
        if (node.nodeType === Node.TEXT_NODE) {
          const val = node.nodeValue?.trim();
          return val ? `${spaces}${val}` : '';
        }
        
        if (node.nodeType === Node.CDATA_SECTION_NODE) {
          return `${spaces}<![CDATA[${node.nodeValue}]]>`;
        }
        
        if (node.nodeType === Node.ELEMENT_NODE) {
          const el = node as Element;
          let attrs = '';
          for (let i = 0; i < el.attributes.length; i++) {
            attrs += ` ${el.attributes[i].name}="${el.attributes[i].value}"`;
          }
          
          const filteredChildren = Array.from(el.childNodes).filter(child => {
            if (child.nodeType === Node.TEXT_NODE && !child.nodeValue?.trim()) return false;
            return true;
          });
          
          if (filteredChildren.length === 0) {
            return `${spaces}<${el.tagName}${attrs}/>`;
          }
          
          if (filteredChildren.length === 1 && filteredChildren[0].nodeType === Node.TEXT_NODE) {
            return `${spaces}<${el.tagName}${attrs}>${filteredChildren[0].nodeValue?.trim()}</${el.tagName}>`;
          }
          
          let childrenStr = '';
          filteredChildren.forEach(child => {
            const childFormatted = formatNode(child, indent + 1);
            if (childFormatted) {
              childrenStr += '\n' + childFormatted;
            }
          });
          
          return `${spaces}<${el.tagName}${attrs}>${childrenStr}\n${spaces}</${el.tagName}>`;
        }
        
        return '';
      };

      const beautified = '<?xml version="1.0" encoding="UTF-8"?>\n' + formatNode(xmlDoc.documentElement, 0);
      setXmlInput(beautified);
      setFormattedMsg(true);
      setTimeout(() => setFormattedMsg(false), 2000);
    } catch (err: any) {
      setErrorStatus(isAr ? "تحذير: لا يمكن تنسيق ملف تالف أو به أخطاء برمجية." : "Unable to format invalid or broken XML syntax.");
    }
  };

  const handleMinify = () => {
    try {
      const minified = xmlInput
        .replace(/>\s+</g, '><')
        .replace(/\s+/g, ' ')
        .trim();
      setXmlInput(minified);
    } catch (err) {
      // ignore
    }
  };

  const handleCopy = (txt: string) => {
    navigator.clipboard.writeText(txt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (content: string, filename: string, mime: string) => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Toggle single node expand/collapsed state
  const toggleNode = (id: string) => {
    setCollapsedNodes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAllNodes = () => {
    setCollapsedNodes({});
  };

  const collapseAllNodes = () => {
    const closedDict: Record<string, boolean> = {};
    const registerNode = (node: XmlNode) => {
      if (node.children && node.children.length > 0) {
        closedDict[node.id] = true;
        node.children.forEach(registerNode);
      }
    };
    if (parsedTree) {
      registerNode(parsedTree);
    }
    setCollapsedNodes(closedDict);
  };

  // Highlight matches of query in strings
  const highlightMatches = (text: string) => {
    if (!searchQuery) return <span>{text}</span>;
    const lowerQuery = searchQuery.toLowerCase();
    const lowerText = text.toLowerCase();
    
    if (!lowerText.includes(lowerQuery)) {
      return <span>{text}</span>;
    }
    
    const parts = [];
    let currentIndex = 0;
    while (currentIndex < text.length) {
      const idx = lowerText.indexOf(lowerQuery, currentIndex);
      if (idx === -1) {
        parts.push(text.slice(currentIndex));
        break;
      }
      if (idx > currentIndex) {
        parts.push(text.slice(currentIndex, idx));
      }
      parts.push(
        <mark key={idx} className="bg-cyan-400 text-slate-950 rounded px-0.5 font-bold animate-pulse">
          {text.slice(idx, idx + searchQuery.length)}
        </mark>
      );
      currentIndex = idx + searchQuery.length;
    }
    
    return <span>{parts}</span>;
  };

  // Recursive Tree Node Renderer Component
  const TreeNodeRenderer = ({ node }: { node: XmlNode }) => {
    const isCollapsed = collapsedNodes[node.id] || false;
    const isElement = node.type === 'element';
    const isComment = node.type === 'comment';
    const isText = node.type === 'text';
    const isCdata = node.type === 'cdata';
    const hasChildren = node.children && node.children.length > 0;
    
    // Check if search matches this node text tag or attributes
    const isMatched = searchQuery ? (
      node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (node.value && node.value.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (node.attributes && Object.entries(node.attributes).some(([key, val]) => 
        key.toLowerCase().includes(searchQuery.toLowerCase()) || val.toLowerCase().includes(searchQuery.toLowerCase())
      ))
    ) : false;

    if (isText) {
      const cleanVal = node.value?.trim();
      if (!cleanVal) return null;
      return (
        <div className="pl-6 py-0.5 text-xs text-slate-300 font-mono break-all leading-relaxed hover:bg-white/5 rounded px-2">
          {highlightMatches(cleanVal)}
        </div>
      );
    }

    if (isComment) {
      return (
        <div className="pl-6 py-0.5 text-xs text-emerald-400 font-mono italic leading-normal hover:bg-emerald-950/20 rounded px-2">
          &lt;!-- {highlightMatches(node.value || '')} --&gt;
        </div>
      );
    }

    if (isCdata) {
      return (
        <div className="pl-6 py-1 text-xs text-amber-400 font-mono leading-normal bg-amber-950/10 border border-amber-500/10 rounded px-3 my-1">
          <span className="text-amber-500 uppercase font-black text-[9px] block">CDATA</span>
          {highlightMatches(node.value || '')}
        </div>
      );
    }

    return (
      <div className={`flex flex-col select-none rounded ${isMatched ? 'bg-cyan-500/5 ring-1 ring-cyan-500/20' : ''}`}>
        
        {/* Row Container */}
        <div className="flex items-center gap-1.5 py-0.5 hover:bg-slate-900/50 rounded-lg group px-2 transition-colors">
          
          {/* Arrow click toggle */}
          {hasChildren ? (
            <button 
              onClick={() => toggleNode(node.id)}
              className="w-5 h-5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            >
              {isCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
            </button>
          ) : (
            <div className="w-5" />
          )}

          {/* Tag Name styled */}
          <span className="font-mono text-xs text-cyan-400 font-bold">
            &lt;{highlightMatches(node.name)}
          </span>

          {/* Attributes List */}
          {node.attributes && Object.entries(node.attributes).map(([key, val]) => (
            <span key={key} className="text-xs font-mono shrink-0 flex items-center gap-0.5">
              <span className="text-purple-400 font-medium">{highlightMatches(key)}</span>
              <span className="text-slate-500">=</span>
              <span className="text-amber-300">"{highlightMatches(val)}"</span>
            </span>
          ))}

          {/* Self closing tag or closing bracket */}
          {!hasChildren ? (
            <span className="font-mono text-xs text-cyan-400 font-bold">/&gt;</span>
          ) : (
            <span className="font-mono text-xs text-cyan-400 font-bold">&gt;</span>
          )}

          {/* Sneak peek elements count preview if collapsed */}
          {isCollapsed && hasChildren && (
            <button 
              onClick={() => toggleNode(node.id)} 
              className="text-[9px] bg-slate-800 text-slate-400 border border-slate-700/50 px-1.5 py-0.5 rounded font-mono hover:bg-slate-700 hover:text-white transition-colors"
            >
              ... {node.children?.length} {isAr ? 'عنصر' : 'nodes'}
            </button>
          )}
        </div>

        {/* Children Render Area */}
        {hasChildren && !isCollapsed && (
          <div className="border-l border-slate-800 pl-4 ml-4 flex flex-col gap-0.5 my-0.5">
            {node.children?.map((childNode) => (
              <TreeNodeRenderer key={childNode.id} node={childNode} />
            ))}
          </div>
        )}

        {/* Closing tag bracket */}
        {hasChildren && !isCollapsed && (
          <div className="pl-6 py-0.5 font-mono text-xs text-cyan-400/80 font-bold">
            &lt;/{node.name}&gt;
          </div>
        )}

      </div>
    );
  };

  return (
    <div className="flex flex-col gap-8">
      
      {/* HEADER ROW - Optimized for AEO/GEO Answer-First with conversational headings */}
      <div className="flex flex-col gap-2">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)] max-xs:w-10 max-xs:h-10 shrink-0 mt-1">
            <FileCode size={24} className="animate-pulse" />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-2 flex-wrap">
              {isAr ? 'كيف يعمل مستعرض ومحلل ملفات XML و Excel الذكي؟' : 'How does the interactive XML and Excel parser work?'}
              <span className="text-[10px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded-full font-black uppercase tracking-wider">
                {isAr ? 'تحليل فوري آمن' : 'Secure Live Mode'}
              </span>
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed max-w-3xl font-normal border-l-2 border-cyan-500/40 pl-3 rtl:border-l-0 rtl:border-r-2 rtl:pr-3">
              {isAr 
                ? 'مستعرض ملفات XML و Excel التفاعلي من Tools Hub هو تطبيق ويب مجاني يتيح للمطورين وأصحاب المواقع قراءة، فحص، وتنسيق الأكواد والملفات بصيغة XML أو Excel (XLS/XLSX) فوراً وبشكل آمن تماماً داخل المتصفح محلياً دون رفع البيانات لخادم خارجي، مع إمكانية تحويلها إلى JSON.' 
                : 'The interactive XML and Excel parser from Tools Hub is a free online tool that lets developers and creators inspect, beautify, validate, and search XML tags or Excel sheets (XLS/XLSX) locally. All operations run 100% in your browser safely without uploading files, with full JSON conversion capability.'
              }
            </p>
          </div>
        </div>
      </div>

      {/* DRAG AND DROP ZONE */}
      <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed p-6 text-center rounded-[2rem] transition-all cursor-pointer relative overflow-hidden group ${
          isDragging 
            ? 'border-cyan-400 bg-cyan-500/10 shadow-[0_0_20px_rgba(6,182,212,0.15)]Scale-98' 
            : 'border-slate-800 hover:border-cyan-500/40 bg-slate-950/30 hover:bg-[#070b24]/40'
        }`}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileUploadBtn} 
          accept=".xml,.rss,.atom,.gpx,.kml,.svg,.xaml,.xls,.xlsx,.ods,.csv" 
          className="hidden" 
        />
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-[40px] pointer-events-none group-hover:bg-cyan-500/10 transition-colors" />
        
        <div className="flex flex-col items-center gap-3 relative z-10">
          <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-all shadow-sm">
            <Upload size={20} className="group-hover:-translate-y-0.5 transition-transform" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
              {isAr ? 'قم بسحب وإفلات ملف الـ XML أو Excel هنا أو انقر للتصفح' : 'Drag & drop XML or Excel file here, or click to load'}
            </span>
            <span className="text-[10px] text-slate-500 font-mono tracking-wider">
              {isAr ? 'يدعم الملفات المحلية بصيغة XML, XLS, XLSX, CSV, ODS, GPX, KML, RSS' : 'Supports local files of type XML, XLS, XLSX, CSV, ODS, GPX, KML, RSS'}
            </span>
          </div>
        </div>
      </div>

      {/* SPLIT LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* INPUT EDITOR (LEFT 5 COLS) */}
        <div className="lg:col-span-5 flex flex-col gap-3 bg-[#050720]/95 border border-white/5 rounded-[2rem] p-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
            <div className="flex items-center gap-1.5 pl-1">
              <FileCode size={16} className="text-cyan-400" />
              <span className="text-xs font-bold text-white">
                {isAr ? 'الشيفرة المدخلة / الملصقة' : 'Raw XML / Paste Zone'}
              </span>
            </div>

            {/* SAMPLES LOADER */}
            <div className="flex items-center gap-1 flex-wrap">
              <span className="text-[10px] text-slate-500 font-bold font-mono">
                {isAr ? 'أمثلة:' : 'Samples:'}
              </span>
              <button 
                onClick={() => setXmlInput(SAMPLES.bookstore)}
                className="px-2 py-0.5 bg-slate-900 border border-white/5 text-[9px] font-black text-cyan-300 rounded hover:bg-slate-800 hover:text-white transition-all uppercase"
              >
                Bookstore
              </button>
              <button 
                onClick={() => setXmlInput(SAMPLES.rss)}
                className="px-2 py-0.5 bg-slate-900 border border-white/5 text-[9px] font-black text-cyan-300 rounded hover:bg-slate-800 hover:text-white transition-all uppercase"
              >
                RSS Feed
              </button>
              <button 
                onClick={() => setXmlInput(SAMPLES.excelXml)}
                className="px-2 py-0.5 bg-cyan-700/20 border border-cyan-500/30 text-[9px] font-black text-cyan-300 rounded hover:bg-cyan-800/40 hover:text-white transition-all uppercase flex items-center gap-0.5"
                title={isAr ? 'مثال جدول بيانات إكسل XML' : 'Excel XML Spreadsheet Sample'}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Excel XLS</span>
              </button>
            </div>
          </div>

          {/* CONSOLE ACTION BULLETS */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={handleBeautify}
              disabled={!xmlInput.trim()}
              className="px-3 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 text-cyan-300 text-[10px] font-bold rounded-lg flex items-center gap-1 transition-all shadow-sm"
            >
              <Wand2 size={12} />
              <span>{isAr ? 'تنسيق ذكي' : 'Beautify XML'}</span>
            </button>

            <button
              onClick={handleMinify}
              disabled={!xmlInput.trim()}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-white/5 text-slate-400 hover:text-white text-[10px] font-bold rounded-lg flex items-center gap-1 transition-all"
            >
              <Minimize size={12} />
              <span>{isAr ? 'ضغط وتقليص' : 'Minify XML'}</span>
            </button>

            <button
              onClick={() => handleCopy(xmlInput)}
              disabled={!xmlInput.trim()}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-white/5 text-slate-400 hover:text-white text-[10px] font-bold rounded-lg flex items-center gap-1 transition-all mr-auto rtl:mr-0 rtl:ml-auto"
            >
              <Copy size={12} />
              <span>{copied ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ' : 'Copy')}</span>
            </button>

            <button
              onClick={() => setXmlInput('')}
              disabled={!xmlInput.trim()}
              className="w-7 h-7 bg-red-950/20 border border-red-900/30 text-red-400 hover:bg-red-950/40 hover:text-red-300 rounded-lg flex items-center justify-center transition-colors shadow-sm"
              title={isAr ? 'مسح البيانات' : 'Clear Editor'}
            >
              <Trash2 size={12} />
            </button>
          </div>

          {/* TEXTAREA EDITOR */}
          <div className="relative">
            <textarea
              value={xmlInput}
              onChange={(e) => setXmlInput(e.target.value)}
              placeholder={isAr ? 'أدخل أو ألصق كود الـ XML هنا لمعالجة سريعة...' : 'Paste raw XML code hierarchy here...'}
              className="w-full h-[380px] bg-[#02030f]/90 border border-white/5 focus:border-cyan-500/30 p-3.5 rounded-xl text-xs font-mono text-cyan-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 leading-relaxed resize-y"
            />
            {formattedMsg && (
              <span className="absolute bottom-3 right-3 bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-[10px] px-2.5 py-1 rounded-lg font-bold shadow-md animate-pulse">
                {isAr ? 'تم تنسيق الكود بنجاح!' : 'Formatted Successfully!'}
              </span>
            )}
          </div>
        </div>

        {/* PARSED RENDERER (RIGHT 7 COLS) */}
        <div className="lg:col-span-7 flex flex-col gap-3 bg-[#050720]/95 border border-white/5 rounded-[2rem] p-4 shadow-xl">
          
          {/* TAB SWITCHERS Header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-2.5 flex-wrap gap-2">
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-white/5">
              <button
                onClick={() => setActiveTab('tree')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'tree' 
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/20' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FolderOpen size={13} />
                <span>{isAr ? 'مستعرض الشجرة' : 'Interactive Tree'}</span>
              </button>

              <button
                onClick={() => setActiveTab('json')}
                disabled={!parsedTree}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 disabled:opacity-40 ${
                  activeTab === 'json' 
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/20' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Braces size={13} />
                <span>{isAr ? 'تصدير JSON' : 'Export JSON'}</span>
              </button>

              <button
                onClick={() => setActiveTab('stats')}
                disabled={!stats}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 disabled:opacity-40 ${
                  activeTab === 'stats' 
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/20' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <TrendingUp size={13} />
                <span>{isAr ? 'الإحصائيات والبيانات' : 'XML Stats'}</span>
              </button>
            </div>

            {/* Tree Specific Commands */}
            {activeTab === 'tree' && parsedTree && (
              <div className="flex items-center gap-1">
                <button 
                  onClick={expandAllNodes}
                  className="px-2 py-1 bg-slate-900 hover:bg-slate-800 text-[10px] font-bold text-slate-400 hover:text-white rounded border border-white/5 transition-colors"
                >
                  {isAr ? 'توسيع الكل' : 'Expand All'}
                </button>
                <button 
                  onClick={collapseAllNodes}
                  className="px-2 py-1 bg-slate-900 hover:bg-slate-800 text-[10px] font-bold text-slate-400 hover:text-white rounded border border-white/5 transition-colors"
                >
                  {isAr ? 'طي الكل' : 'Collapse All'}
                </button>
              </div>
            )}
          </div>

          {/* PARSING ERROR BANNER */}
          {errorStatus && (
            <div className="border border-red-500/20 bg-red-950/25 p-4 rounded-2xl flex items-start gap-3 text-red-300 animate-in fade-in duration-300">
              <AlertTriangle className="shrink-0 text-red-500 animate-bounce mt-0.5" size={18} />
              <div className="flex flex-col gap-1 text-right rtl:text-right">
                <span className="text-xs font-black">{isAr ? 'حدث خطأ في قراءة ملف الـ XML' : 'Syntax Parsing Error Detected:'}</span>
                <p className="text-[11px] font-mono leading-relaxed select-text">{errorStatus}</p>
              </div>
            </div>
          )}

          {/* SEARCH BAR (Only active for Tree screen) */}
          {activeTab === 'tree' && parsedTree && (
            <div className="relative">
              <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-500 rtl:right-auto rtl:left-0 rtl:pl-3.5">
                <Search size={14} className="text-cyan-500/60" />
              </span>
              <input
                type="text"
                placeholder={isAr ? 'ابحث عن عناصر، كود، أو معاملات داخل الشجرة...' : 'Search inside nodes, keys, namespaces or tags...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-3.5 pr-10 rtl:pr-3.5 rtl:pl-10 py-2 bg-slate-950 border border-slate-900 focus:border-cyan-500/30 rounded-xl text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/20"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 hover:text-white text-[10px] font-mono uppercase bg-transparent border-0 outline-none rtl:left-auto rtl:right-0 rtl:pr-3.5"
                >
                  ✖
                </button>
              )}
            </div>
          )}

          {/* MAIN TABS WINDOW */}
          <div className="flex-1 min-h-[350px] relative">
            
            {/* 1. INTERACTIVE TREE VIEW */}
            {activeTab === 'tree' && (
              <div className="w-full h-[380px] bg-[#02030f]/90 border border-white/5 rounded-xl p-3.5 overflow-auto custom-scrollbar">
                {parsedTree ? (
                  <div className="flex flex-col gap-1">
                    <TreeNodeRenderer node={parsedTree} />
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-500 gap-2">
                    <FolderOpen size={28} className="text-slate-600 animate-pulse" />
                    <span className="text-xs font-bold">
                      {isAr ? 'يرجى إدخال ملف XML صالح في الحقل الجانبي لعرض شجرته' : 'Enter or upload valid XML syntax on the left to start'}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* 2. EXPORT JSON VIEW */}
            {activeTab === 'json' && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between bg-slate-950 p-2 border border-white/5 rounded-xl">
                  <span className="text-[10px] font-bold text-emerald-400 font-mono">
                    {isAr ? 'البيانات المنظمة بصيغة JSON' : 'PARSED STRUCTURED JSON'}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleCopy(getJsonRepresentation())}
                      className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-[10px] text-slate-400 hover:text-white border border-white/5 rounded transition-all flex items-center gap-1"
                    >
                      <Copy size={11} />
                      <span>{copied ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ' : 'Copy')}</span>
                    </button>
                    <button
                      onClick={() => handleDownload(getJsonRepresentation(), 'parsed_xml.json', 'application/json')}
                      className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-[10px] text-slate-400 hover:text-white border border-white/5 rounded transition-all flex items-center gap-1"
                    >
                      <Download size={11} />
                      <span>{isAr ? 'تحميل' : 'Download'}</span>
                    </button>
                  </div>
                </div>
                <textarea
                  readOnly
                  value={getJsonRepresentation()}
                  className="w-full h-[325px] bg-[#02030f]/90 border border-white/5 p-3.5 rounded-xl text-xs font-mono text-emerald-300 leading-relaxed focus:outline-none"
                />
              </div>
            )}

            {/* 3. XML DOCUMENT METRICS AND STATISTICS */}
            {activeTab === 'stats' && stats && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[380px] overflow-auto custom-scrollbar">
                
                {/* METRICS CARD */}
                <div className="bg-slate-950/60 border border-white/5 p-4 rounded-2xl flex flex-col gap-3.5">
                  <h3 className="text-xs font-black text-cyan-400 uppercase tracking-wider flex items-center gap-1.5 border-b border-white/5 pb-2">
                    <TrendingUp size={14} />
                    <span>{isAr ? 'المقاييس وعينات الحجم' : 'XML Document Bounds'}</span>
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-2 text-right rtl:text-right">
                    <div className="bg-[#02030f]/60 p-2.5 rounded-xl border border-white/5">
                      <span className="text-[10px] text-slate-500 block">{isAr ? 'عدد الأوسمة' : 'Total Tags'}</span>
                      <strong className="text-lg text-white font-mono">{stats.elementsCount}</strong>
                    </div>
                    <div className="bg-[#02030f]/60 p-2.5 rounded-xl border border-white/5">
                      <span className="text-[10px] text-slate-500 block">{isAr ? 'عدد المعاملات' : 'Attributes'}</span>
                      <strong className="text-lg text-white font-mono">{stats.attributesCount}</strong>
                    </div>
                    <div className="bg-[#02030f]/60 p-2.5 rounded-xl border border-white/5">
                      <span className="text-[10px] text-slate-500 block">{isAr ? 'التعليقات' : 'Comments'}</span>
                      <strong className="text-lg text-white font-mono">{stats.commentsCount}</strong>
                    </div>
                    <div className="bg-[#02030f]/60 p-2.5 rounded-xl border border-white/5">
                      <span className="text-[10px] text-slate-500 block">{isAr ? 'أقصى عمق للنظام' : 'Max Nesting Depth'}</span>
                      <strong className="text-lg text-white font-mono">{stats.maxDepth}</strong>
                    </div>
                  </div>

                  {stats.namespaces.length > 0 && (
                    <div className="flex flex-col gap-1 bg-[#02030f]/60 p-2.5 rounded-xl border border-white/5">
                      <span className="text-[10px] text-slate-500 block">{isAr ? 'مسارات الأسماء المستعملة (XMLNS)' : 'Active Namespaces'}</span>
                      <div className="flex flex-col gap-1 max-h-[80px] overflow-y-auto custom-scrollbar">
                        {stats.namespaces.map((ns, i) => (
                          <code key={i} className="text-[9px] text-amber-300 font-mono break-all">{ns}</code>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* TAG FREQUENCY CARD */}
                <div className="bg-slate-950/60 border border-white/5 p-4 rounded-2xl flex flex-col gap-3.5">
                  <h3 className="text-xs font-black text-cyan-400 uppercase tracking-wider flex items-center gap-1.5 border-b border-white/5 pb-2">
                    <ListFilter size={14} />
                    <span>{isAr ? 'الأوسمة الفريدة ونسب التكرار' : 'Tag Frequency distribution'}</span>
                  </h3>

                  <div className="flex flex-col gap-1.5 max-h-[260px] overflow-y-auto custom-scrollbar pr-1">
                    {Object.entries(stats.tagFrequency)
                      .sort((a, b) => b[1] - a[1])
                      .map(([tag, freq]) => (
                        <div key={tag} className="flex items-center justify-between text-xs font-mono bg-[#02030f]/60 px-3 py-1.5 rounded-lg border border-white/5 hover:border-cyan-500/20 transition-all">
                          <span className="text-cyan-300 font-bold">&lt;{tag}&gt;</span>
                          <span className="text-slate-400 font-bold bg-slate-900 border border-white/5 px-2 py-0.5 rounded-md text-[10px]">
                            {freq} {isAr ? 'مرات' : 'times'}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>

              </div>
            )}

          </div>

          {/* Action Export Row */}
          {parsedTree && (
            <div className="flex items-center justify-between bg-slate-950/80 p-3.5 border border-white/5 rounded-2xl flex-wrap gap-3">
              <span className="text-[10px] text-slate-500 font-mono">
                {isAr ? 'تم معالجة المستند بنجاح على متصفحك.' : 'Parsed document successfully on your client engine.'}
              </span>
              <button
                onClick={() => handleDownload(xmlInput, 'document_parsed.xml', 'text/xml')}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 rounded-xl text-xs font-black text-white transition-all shadow-[0_0_12px_rgba(6,182,212,0.15)] flex items-center gap-1.5"
              >
                <Download size={13} />
                <span>{isAr ? 'تحميل كملف XML منسق' : 'Download Beautified XML'}</span>
              </button>
            </div>
          )}

        </div>

      </div>

      {/* DETAILED INFORMATION SECTION ABOUT THE TOOL */}
      <div className="bg-[#050720]/95 border border-white/5 rounded-[2.5rem] p-6 md:p-10 shadow-2xl flex flex-col gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="flex items-center gap-3 border-b border-white/5 pb-4">
          <Info className="text-cyan-400" size={20} />
          <h2 className="text-lg md:text-xl font-bold text-white">
            {isAr ? 'عن مستعرض ومحلل ملفات XML' : 'About the XML File Viewer & Parser'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-slate-300 leading-relaxed text-right rtl:text-right">
          
          <div className="flex flex-col gap-3">
            <h3 className="font-extrabold text-cyan-300 text-sm">{isAr ? 'لماذا مستعرض XML محلي بنسبة ۱۰۰٪؟' : 'Why use a 100% offline local XML viewer?'}</h3>
            <p>
              {isAr 
                ? 'ملفات XML تحتوي في كثير من الأحيان على بيانات حساسة أو خاصة بالمطورين أو الشركات (مثل جداول المنتجات، الإعدادات، المواقع الجغرافية GPX، أو قواعد البيانات). إرسال هذه الملفات إلى خوادم مجهولة المصدر يشكل خطراً أمنياً على سرية معلوماتك.' 
                : 'XML files often hold sensitive datasets, application configs, system mappings, coordinate tracks (GPX), or client parameters. Uploading them to random sites creates a privacy vector.'
              }
            </p>
            <p>
              {isAr 
                ? 'تعتمد هذه الأداة كلياً على محرك التحليل المدمج في متصفحك (DOMParser API) محلياً دون رفع أي بايت واحد إلى شبكة الإنترنت، مما يمنحك سرعة قياسية تبلغ صفر ميلي ثانية للنقل وأماناً مطلقاً لبياناتك.' 
                : 'Our tool relies exclusively on the browser\'s compiled native XML Parser subsystem, resolving elements, comment arrays, CDATA blocks, and namespaces with zero overhead and full local privacy.'
              }
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-extrabold text-cyan-300 text-sm">{isAr ? 'الميزات والوظائف المتطورة المتاحة' : 'Advanced capabilities of the XML suite'}</h3>
            <ul className="list-disc pr-4 pl-0 space-y-1.5 text-slate-400 rtl:list-disc">
              <li>{isAr ? 'أداة ذكية لتنسيق ملفات XML التالفة أو غير المرتبة وفهرستها.' : 'A robust DOM-based indenting structure designed to clean up unformatted structures.'}</li>
              <li>{isAr ? 'ضغط واختصار الشيفرة (Minify) بضغطة زر مفيدة لمرحلة الإنتاج.' : 'Single-click compression of bulky XML elements optimal for deployment.'}</li>
              <li>{isAr ? 'مستعرض الشجرة التفاعلية لتوسيع وإغلاق مستويات وهياكل المستند برمجياً.' : 'Fully expanding and collapsing nodes equipped with accurate namespace highlights.'}</li>
              <li>{isAr ? 'البحث اللحظي ومطابقة الكلمات والمفاتيح داخل الأوسمة والمعاملات.' : 'Real-time tag searching focusing on matched query colors.'}</li>
              <li>{isAr ? 'تصدير كامل بنية المستند إلى مصفوفة JSON بتركيب منسق ونظيف.' : 'On-the-fly conversion of the entire document tree to formatted JSON structure.'}</li>
              <li>{isAr ? 'مستخرج فوري لإحصاءات المستند وفهرست تكرار الأوسمة.' : 'Complete metrics reports containing element counts, comment metrics, and active attribute statistics.'}</li>
            </ul>
          </div>

        </div>
      </div>

    </div>
  );
}
