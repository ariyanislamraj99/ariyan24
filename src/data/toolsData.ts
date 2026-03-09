import {
  Globe, Image, Search, Youtube, Palette, Type, Code, FileText, Lock, Hash, FileEdit,
  Link, Mail, QrCode, Timer, Calculator, Ruler, RefreshCw, Binary, Shield,
  FileCode, Smartphone, Zap, Eye, Layers, Download, Upload, Scissors,
  RotateCw, Maximize, Minimize, Copy, Shuffle, AlignLeft, AlignCenter,
  Braces, Database, Cpu, Terminal, BookOpen, PenTool, Paintbrush, Wand2,
  ScanLine, Regex, Clock, Calendar, DollarSign, Percent, Scale, Thermometer,
  Gauge, Wifi, HardDrive, Monitor, Printer, Camera, Video, Music, Mic,
  MapPin, Navigation, Flag, Star, Heart, Bookmark, Tag, Filter, List,
  Grid, BarChart, PieChart, TrendingUp, Activity, Award, Target,
  CheckCircle, XCircle, AlertTriangle, Info, HelpCircle, Settings,
  Wrench, Key
} from "lucide-react";

export type ToolCategory = "web" | "image" | "seo" | "youtube" | "text" | "developer" | "converter" | "security" | "social" | "design" | "wordpress" | "pdf";

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: any;
  implemented: boolean;
}

export const categories: { id: ToolCategory; label: string; icon: any }[] = [
  { id: "web", label: "Web Tools", icon: Globe },
  { id: "image", label: "Image Tools", icon: Image },
  { id: "seo", label: "SEO Tools", icon: Search },
  { id: "youtube", label: "YouTube Tools", icon: Youtube },
  { id: "text", label: "Text Tools", icon: Type },
  { id: "developer", label: "Developer Tools", icon: Code },
  { id: "converter", label: "Converters", icon: RefreshCw },
  { id: "security", label: "Security Tools", icon: Shield },
  { id: "social", label: "Social Media", icon: Heart },
  { id: "design", label: "Design Tools", icon: Palette },
  { id: "wordpress", label: "WordPress", icon: Layers },
  { id: "pdf", label: "PDF Tools", icon: FileText },
];

export const tools: Tool[] = [
  // ═══════════════════════════════════════
  // WEB TOOLS
  // ═══════════════════════════════════════
  { id: "html-formatter", name: "HTML Formatter", description: "Format and beautify HTML code", category: "web", icon: FileCode, implemented: true },
  { id: "css-minifier", name: "CSS Minifier", description: "Minify CSS code to reduce file size", category: "web", icon: Minimize, implemented: true },
  { id: "js-minifier", name: "JS Minifier", description: "Minify JavaScript code", category: "web", icon: Minimize, implemented: true },
  { id: "html-minifier", name: "HTML Minifier", description: "Minify HTML markup", category: "web", icon: Minimize, implemented: true },
  { id: "json-formatter", name: "JSON Formatter", description: "Format and validate JSON data", category: "web", icon: Braces, implemented: true },
  { id: "url-encoder", name: "URL Encoder/Decoder", description: "Encode or decode URL strings", category: "web", icon: Link, implemented: true },
  { id: "base64", name: "Base64 Encoder/Decoder", description: "Encode or decode Base64 strings", category: "web", icon: Binary, implemented: true },
  { id: "qr-generator", name: "QR Code Generator", description: "Generate QR codes from text or URLs", category: "web", icon: QrCode, implemented: true },
  { id: "meta-tag-generator", name: "Meta Tag Generator", description: "Generate HTML meta tags for SEO", category: "seo", icon: Tag, implemented: true },
  { id: "robots-txt-generator", name: "Robots.txt Generator", description: "Create robots.txt files", category: "seo", icon: FileText, implemented: true },
  { id: "htaccess-redirect", name: ".htaccess Redirect Generator", description: "Generate .htaccess redirect rules", category: "web", icon: RefreshCw, implemented: true },
  { id: "open-graph-generator", name: "Open Graph Generator", description: "Generate Open Graph meta tags", category: "seo", icon: Globe, implemented: true },
  { id: "favicon-generator", name: "Favicon Generator", description: "Create favicon from text/emoji", category: "web", icon: Star, implemented: true },
  { id: "sitemap-generator", name: "Sitemap XML Generator", description: "Generate XML sitemaps", category: "seo", icon: List, implemented: true },
  { id: "schema-generator", name: "Schema Markup Generator", description: "Generate JSON-LD structured data", category: "seo", icon: Database, implemented: true },
  
  // ═══════════════════════════════════════
  // IMAGE TOOLS
  // ═══════════════════════════════════════
  { id: "image-resizer", name: "Image Resizer", description: "Resize images to custom dimensions", category: "image", icon: Maximize, implemented: true },
  { id: "image-compressor", name: "Image Compressor", description: "Compress images to reduce file size", category: "image", icon: Minimize, implemented: true },
  { id: "image-to-base64", name: "Image to Base64", description: "Convert images to Base64 strings", category: "image", icon: Binary, implemented: true },
  { id: "color-picker", name: "Color Picker", description: "Pick colors and get HEX, RGB, HSL values", category: "image", icon: Paintbrush, implemented: true },
  { id: "image-cropper", name: "Image Cropper", description: "Crop images to specific areas", category: "image", icon: Scissors, implemented: true },
  { id: "image-flipper", name: "Image Flipper/Rotator", description: "Flip or rotate images", category: "image", icon: RotateCw, implemented: true },
  { id: "image-format-converter", name: "Image Format Converter", description: "Convert between PNG, JPG, WebP", category: "image", icon: RefreshCw, implemented: true },
  { id: "placeholder-image", name: "Placeholder Image Generator", description: "Generate placeholder images", category: "image", icon: Image, implemented: true },
  { id: "gradient-generator", name: "CSS Gradient Generator", description: "Create beautiful CSS gradients", category: "image", icon: Palette, implemented: true },
  { id: "svg-to-png", name: "SVG to PNG Converter", description: "Convert SVG files to PNG", category: "image", icon: Image, implemented: true },
  { id: "screenshot-mockup", name: "Screenshot Mockup", description: "Place screenshots in device mockups", category: "image", icon: Monitor, implemented: false },
  { id: "image-watermark", name: "Image Watermark", description: "Add text watermarks to images", category: "image", icon: PenTool, implemented: true },
  
  // ═══════════════════════════════════════
  // SEO TOOLS
  // ═══════════════════════════════════════
  { id: "keyword-density", name: "Keyword Density Checker", description: "Analyze keyword density in text", category: "seo", icon: Search, implemented: true },
  { id: "word-counter", name: "Word Counter", description: "Count words, characters, sentences", category: "seo", icon: Hash, implemented: true },
  { id: "meta-length-checker", name: "Meta Tag Length Checker", description: "Check title & description length", category: "seo", icon: Ruler, implemented: true },
  { id: "slug-generator", name: "URL Slug Generator", description: "Generate SEO-friendly URL slugs", category: "seo", icon: Link, implemented: true },
  { id: "lorem-ipsum", name: "Lorem Ipsum Generator", description: "Generate placeholder text", category: "seo", icon: AlignLeft, implemented: true },
  { id: "readability-checker", name: "Readability Checker", description: "Check text readability score", category: "seo", icon: Eye, implemented: true },
  { id: "heading-checker", name: "Heading Structure Checker", description: "Analyze heading hierarchy from HTML", category: "seo", icon: AlignCenter, implemented: true },
  { id: "canonical-tag-gen", name: "Canonical Tag Generator", description: "Generate canonical URL tags", category: "seo", icon: Tag, implemented: true },
  { id: "og-preview", name: "Social Media Preview", description: "Preview how links appear on social media", category: "seo", icon: Eye, implemented: true },
  { id: "xml-sitemap-validator", name: "Sitemap Validator", description: "Validate XML sitemap structure", category: "seo", icon: CheckCircle, implemented: true },
  
  // ═══════════════════════════════════════
  // YOUTUBE TOOLS
  // ═══════════════════════════════════════
  { id: "yt-thumbnail-downloader", name: "YouTube Thumbnail Downloader", description: "Download YouTube video thumbnails", category: "youtube", icon: Download, implemented: true },
  { id: "yt-timestamp-link", name: "YouTube Timestamp Link", description: "Generate timestamp links for videos", category: "youtube", icon: Clock, implemented: true },
  { id: "yt-embed-generator", name: "YouTube Embed Generator", description: "Generate embed code for videos", category: "youtube", icon: Code, implemented: true },
  { id: "yt-tag-generator", name: "YouTube Tag Generator", description: "Generate tags for videos from keywords", category: "youtube", icon: Tag, implemented: true },
  { id: "yt-title-generator", name: "YouTube Title Generator", description: "Generate catchy video titles", category: "youtube", icon: Type, implemented: true },
  { id: "yt-description-generator", name: "YouTube Description Template", description: "Create video description templates", category: "youtube", icon: FileText, implemented: true },
  { id: "yt-channel-id", name: "YouTube Channel ID Finder", description: "Extract channel ID from URL", category: "youtube", icon: Search, implemented: true },
  { id: "yt-video-id", name: "YouTube Video ID Extractor", description: "Extract video ID from any YouTube URL", category: "youtube", icon: Hash, implemented: true },
  { id: "yt-playlist-link", name: "YouTube Playlist Link Generator", description: "Generate playlist URLs", category: "youtube", icon: List, implemented: true },
  { id: "yt-seo-checklist", name: "YouTube SEO Checker", description: "Score your video's SEO optimization", category: "youtube", icon: CheckCircle, implemented: true },
  { id: "yt-hashtag-gen", name: "YouTube Hashtag Generator", description: "Generate optimized YouTube hashtags", category: "youtube", icon: Hash, implemented: true },
  { id: "yt-chapter-gen", name: "YouTube Chapter Generator", description: "Create chapter timestamps for videos", category: "youtube", icon: Clock, implemented: true },
  { id: "yt-end-screen-gen", name: "YouTube End Screen Generator", description: "Create end screen CTA scripts", category: "youtube", icon: Target, implemented: true },
  { id: "yt-ab-title", name: "YouTube A/B Title Generator", description: "Generate title variations for testing", category: "youtube", icon: Shuffle, implemented: true },
  { id: "yt-desc-optimizer", name: "YouTube Description Optimizer", description: "Analyze and optimize video descriptions", category: "youtube", icon: Eye, implemented: true },
  { id: "yt-shorts-ideas", name: "YouTube Shorts Ideas Generator", description: "Generate Shorts video ideas from topics", category: "youtube", icon: Zap, implemented: true },
  
  // ═══════════════════════════════════════
  // TEXT TOOLS
  // ═══════════════════════════════════════
  { id: "case-converter", name: "Case Converter", description: "Convert text between cases", category: "text", icon: Type, implemented: true },
  { id: "text-repeater", name: "Text Repeater", description: "Repeat text multiple times", category: "text", icon: Copy, implemented: true },
  { id: "text-reverser", name: "Text Reverser", description: "Reverse any text string", category: "text", icon: RefreshCw, implemented: true },
  { id: "remove-duplicates", name: "Remove Duplicate Lines", description: "Remove duplicate lines from text", category: "text", icon: Filter, implemented: true },
  { id: "line-counter", name: "Line Counter", description: "Count lines in text", category: "text", icon: List, implemented: true },
  { id: "text-diff", name: "Text Diff Checker", description: "Compare two texts side by side", category: "text", icon: AlignCenter, implemented: true },
  { id: "string-replace", name: "Find & Replace", description: "Find and replace text in bulk", category: "text", icon: RefreshCw, implemented: true },
  { id: "random-string", name: "Random String Generator", description: "Generate random strings", category: "text", icon: Shuffle, implemented: true },
  { id: "text-to-binary", name: "Text to Binary", description: "Convert text to binary and back", category: "text", icon: Binary, implemented: true },
  { id: "text-to-morse", name: "Morse Code Translator", description: "Convert text to Morse code", category: "text", icon: Zap, implemented: true },
  { id: "whitespace-remover", name: "Whitespace Remover", description: "Remove extra whitespace from text", category: "text", icon: Minimize, implemented: true },
  { id: "text-sorter", name: "Text Line Sorter", description: "Sort lines alphabetically", category: "text", icon: List, implemented: true },
  { id: "text-truncator", name: "Text Truncator", description: "Truncate text to specific length", category: "text", icon: Scissors, implemented: true },
  
  // ═══════════════════════════════════════
  // DEVELOPER TOOLS
  // ═══════════════════════════════════════
  { id: "regex-tester", name: "Regex Tester", description: "Test regular expressions", category: "developer", icon: Regex, implemented: true },
  { id: "json-to-typescript", name: "JSON to TypeScript", description: "Convert JSON to TypeScript interfaces", category: "developer", icon: FileCode, implemented: true },
  { id: "uuid-generator", name: "UUID Generator", description: "Generate unique UUIDs", category: "developer", icon: Key, implemented: true },
  { id: "timestamp-converter", name: "Unix Timestamp Converter", description: "Convert timestamps to dates", category: "developer", icon: Clock, implemented: true },
  { id: "jwt-decoder", name: "JWT Decoder", description: "Decode JSON Web Tokens", category: "developer", icon: Lock, implemented: true },
  { id: "cron-expression", name: "Cron Expression Generator", description: "Build and explain cron expressions", category: "developer", icon: Timer, implemented: true },
  { id: "chmod-calculator", name: "Chmod Calculator", description: "Calculate Unix file permissions", category: "developer", icon: Shield, implemented: true },
  { id: "html-entity", name: "HTML Entity Encoder", description: "Encode/decode HTML entities", category: "developer", icon: Code, implemented: true },
  { id: "diff-checker", name: "Code Diff Checker", description: "Compare two code snippets", category: "developer", icon: AlignCenter, implemented: true },
  { id: "markdown-preview", name: "Markdown Preview", description: "Preview Markdown in real-time", category: "developer", icon: BookOpen, implemented: true },
  { id: "sql-formatter", name: "SQL Formatter", description: "Format and beautify SQL queries", category: "developer", icon: Database, implemented: true },
  { id: "css-to-tailwind", name: "CSS to Tailwind", description: "Convert CSS to Tailwind classes", category: "developer", icon: Wand2, implemented: false },
  { id: "npm-package-search", name: "NPM Package Info", description: "Search npm package information", category: "developer", icon: Layers, implemented: false },
  
  // ═══════════════════════════════════════
  // CONVERTERS
  // ═══════════════════════════════════════
  { id: "px-to-rem", name: "PX to REM Converter", description: "Convert pixels to rem units", category: "converter", icon: Ruler, implemented: true },
  { id: "color-converter", name: "Color Converter", description: "Convert between HEX, RGB, HSL", category: "converter", icon: Palette, implemented: true },
  { id: "number-base", name: "Number Base Converter", description: "Convert between binary, octal, decimal, hex", category: "converter", icon: Hash, implemented: true },
  { id: "temperature", name: "Temperature Converter", description: "Convert between °C, °F, K", category: "converter", icon: Thermometer, implemented: true },
  { id: "unit-converter", name: "Unit Converter", description: "Convert between various units", category: "converter", icon: Scale, implemented: true },
  { id: "data-storage", name: "Data Storage Converter", description: "Convert between bytes, KB, MB, GB", category: "converter", icon: HardDrive, implemented: true },
  { id: "csv-to-json", name: "CSV to JSON", description: "Convert CSV data to JSON", category: "converter", icon: RefreshCw, implemented: true },
  { id: "json-to-csv", name: "JSON to CSV", description: "Convert JSON data to CSV", category: "converter", icon: RefreshCw, implemented: true },
  { id: "markdown-to-html", name: "Markdown to HTML", description: "Convert Markdown to HTML", category: "converter", icon: Code, implemented: true },
  { id: "yaml-to-json", name: "YAML to JSON", description: "Convert YAML to JSON and back", category: "converter", icon: RefreshCw, implemented: true },
  { id: "epoch-converter", name: "Epoch Converter", description: "Convert epoch time to date", category: "converter", icon: Calendar, implemented: true },
  { id: "roman-numeral", name: "Roman Numeral Converter", description: "Convert to/from Roman numerals", category: "converter", icon: Hash, implemented: true },
  
  // ═══════════════════════════════════════
  // SECURITY TOOLS
  // ═══════════════════════════════════════
  { id: "password-generator", name: "Password Generator", description: "Generate secure random passwords", category: "security", icon: Key, implemented: true },
  { id: "password-strength", name: "Password Strength Checker", description: "Check password strength", category: "security", icon: Shield, implemented: true },
  { id: "hash-generator", name: "Hash Generator (MD5/SHA)", description: "Generate MD5, SHA-1, SHA-256 hashes", category: "security", icon: Lock, implemented: true },
  { id: "ssl-checker", name: "SSL Certificate Info", description: "Check SSL certificate details", category: "security", icon: Shield, implemented: false },
  { id: "ip-lookup", name: "IP Address Lookup", description: "Get your public IP and details", category: "security", icon: Globe, implemented: false },
  { id: "encryption-tool", name: "Text Encryption/Decryption", description: "Encrypt and decrypt text (AES)", category: "security", icon: Lock, implemented: true },
  { id: "csp-generator", name: "CSP Header Generator", description: "Generate Content-Security-Policy", category: "security", icon: Shield, implemented: true },
  
  // ═══════════════════════════════════════
  // SOCIAL MEDIA TOOLS
  // ═══════════════════════════════════════
  { id: "twitter-card-gen", name: "Twitter Card Generator", description: "Generate Twitter Card meta tags", category: "seo", icon: Tag, implemented: true },
  { id: "social-image-resizer", name: "Social Image Resizer", description: "Resize for Facebook, Twitter, IG, LinkedIn", category: "social", icon: Image, implemented: true },
  { id: "hashtag-generator", name: "Hashtag Generator", description: "Generate hashtags from keywords", category: "social", icon: Hash, implemented: true },
  { id: "emoji-picker", name: "Emoji Picker & Copy", description: "Browse and copy emojis", category: "social", icon: Star, implemented: true },
  { id: "bio-generator", name: "Social Media Bio Generator", description: "Create professional social bios", category: "social", icon: PenTool, implemented: true },
  { id: "link-shortener-gen", name: "UTM Link Builder", description: "Build UTM tracking links", category: "seo", icon: Link, implemented: true },
  
  // ═══════════════════════════════════════
  // DESIGN TOOLS
  // ═══════════════════════════════════════
  { id: "color-palette", name: "Color Palette Generator", description: "Generate harmonious color palettes", category: "design", icon: Palette, implemented: true },
  { id: "box-shadow-gen", name: "Box Shadow Generator", description: "Create CSS box shadows visually", category: "design", icon: Layers, implemented: true },
  { id: "border-radius-gen", name: "Border Radius Generator", description: "Generate CSS border-radius", category: "design", icon: Maximize, implemented: true },
  { id: "glassmorphism-gen", name: "Glassmorphism Generator", description: "Create glassmorphism CSS effects", category: "design", icon: Eye, implemented: true },
  { id: "neumorphism-gen", name: "Neumorphism Generator", description: "Create neumorphism CSS effects", category: "design", icon: Layers, implemented: true },
  { id: "text-shadow-gen", name: "Text Shadow Generator", description: "Create CSS text shadows", category: "design", icon: Type, implemented: true },
  { id: "font-pairing", name: "Font Pairing Suggestions", description: "Get font pairing recommendations", category: "design", icon: Type, implemented: true },
  { id: "aspect-ratio-calc", name: "Aspect Ratio Calculator", description: "Calculate aspect ratios", category: "design", icon: Maximize, implemented: true },
  { id: "flexbox-gen", name: "Flexbox Generator", description: "Visual CSS flexbox builder", category: "design", icon: Grid, implemented: true },
  { id: "grid-gen", name: "CSS Grid Generator", description: "Visual CSS grid builder", category: "design", icon: Grid, implemented: true },

  // ═══════════════════════════════════════
  // WORDPRESS TOOLS
  // ═══════════════════════════════════════
  { id: "wp-theme-detector", name: "WP Theme Detector", description: "Detect WordPress theme from URL", category: "wordpress", icon: ScanLine, implemented: false },
  { id: "wp-plugin-detector", name: "WP Plugin Detector", description: "Detect WordPress plugins from URL", category: "wordpress", icon: Layers, implemented: false },
  { id: "wp-security-header", name: "WP Security Headers", description: "Generate WordPress security headers", category: "wordpress", icon: Shield, implemented: true },
  { id: "wp-htaccess-gen", name: "WP .htaccess Generator", description: "Generate WordPress .htaccess rules", category: "wordpress", icon: FileText, implemented: true },
  { id: "wp-robots-gen", name: "WP Robots.txt Generator", description: "Generate WordPress robots.txt", category: "wordpress", icon: FileText, implemented: true },
  { id: "wp-password-gen", name: "WP Password Generator", description: "Generate WordPress-safe passwords", category: "wordpress", icon: Key, implemented: true },
  { id: "wp-salt-gen", name: "WP Salt Key Generator", description: "Generate WordPress security salts", category: "wordpress", icon: Lock, implemented: true },
  { id: "wp-shortcode-gen", name: "WP Shortcode Generator", description: "Generate common WP shortcodes", category: "wordpress", icon: Code, implemented: true },

  // ═══════════════════════════════════════
  // PDF TOOLS
  // ═══════════════════════════════════════
  { id: "pdf-page-counter", name: "PDF Page Counter", description: "Count pages in a PDF file", category: "pdf", icon: FileText, implemented: true },
  { id: "pdf-metadata-viewer", name: "PDF Metadata Viewer", description: "View PDF file metadata and properties", category: "pdf", icon: Info, implemented: true },
  { id: "pdf-text-extractor", name: "PDF Text Extractor", description: "Extract readable text from PDF files", category: "pdf", icon: AlignLeft, implemented: true },
  { id: "pdf-word-counter", name: "PDF Word Counter", description: "Count words and characters in PDF", category: "pdf", icon: Hash, implemented: true },
  { id: "pdf-link-extractor", name: "PDF Link Extractor", description: "Extract all URLs from a PDF file", category: "pdf", icon: Link, implemented: true },
  { id: "pdf-size-analyzer", name: "PDF Size Analyzer", description: "Analyze PDF file size and composition", category: "pdf", icon: HardDrive, implemented: true },
  { id: "pdf-password-gen", name: "PDF Password Generator", description: "Generate strong passwords for PDF files", category: "pdf", icon: Key, implemented: true },
  { id: "pdf-watermark-gen", name: "PDF Watermark Generator", description: "Generate watermark CSS/HTML for PDFs", category: "pdf", icon: PenTool, implemented: true },
  { id: "pdf-invoice-gen", name: "PDF Invoice Generator", description: "Create printable invoices as PDF", category: "pdf", icon: FileText, implemented: true },
  { id: "pdf-resume-checker", name: "PDF Resume Checker", description: "Check resume PDF for best practices", category: "pdf", icon: CheckCircle, implemented: true },
  { id: "pdf-compare", name: "PDF Comparison Tool", description: "Compare two PDF files side by side", category: "pdf", icon: AlignCenter, implemented: true },
  { id: "pdf-table-extractor", name: "PDF Table Extractor", description: "Extract tables from PDF files", category: "pdf", icon: Grid, implemented: true },
  { id: "pdf-image-extractor", name: "PDF Image Analyzer", description: "Analyze and list images in PDF files", category: "pdf", icon: Image, implemented: true },
  { id: "pdf-bookmark-gen", name: "PDF Bookmark Generator", description: "Generate bookmark structure for PDFs", category: "pdf", icon: Bookmark, implemented: true },
  { id: "pdf-merge-helper", name: "PDF Merge Helper", description: "Generate merge commands for PDFs", category: "pdf", icon: Layers, implemented: true },
  { id: "pdf-split-helper", name: "PDF Split Helper", description: "Generate split commands by page range", category: "pdf", icon: Scissors, implemented: true },
  { id: "pdf-editor", name: "PDF Editor", description: "Annotate, highlight, reorder & delete PDF pages", category: "pdf", icon: FileEdit, implemented: true },

  // ═══════════════════════════════════════
  // ADVANCED YOUTUBE TOOLS
  // ═══════════════════════════════════════
  { id: "yt-keyword-research", name: "YouTube Keyword Research", description: "Generate keyword ideas from seed terms", category: "youtube", icon: Search, implemented: true },
  { id: "yt-competitor-analyzer", name: "YouTube Competitor Analyzer", description: "Analyze competing YouTube channels", category: "youtube", icon: BarChart, implemented: true },
  { id: "yt-upload-checklist", name: "YouTube Upload Checklist", description: "Pre-upload optimization checklist", category: "youtube", icon: CheckCircle, implemented: true },
  { id: "yt-playlist-optimizer", name: "YouTube Playlist Optimizer", description: "Optimize playlist for discoverability", category: "youtube", icon: List, implemented: true },
  { id: "yt-comment-templates", name: "YouTube Comment Templates", description: "Ready-to-use comment reply templates", category: "youtube", icon: Type, implemented: true },
  { id: "yt-analytics-calc", name: "YouTube Analytics Calculator", description: "Calculate engagement rates and metrics", category: "youtube", icon: Calculator, implemented: true },
  { id: "yt-title-optimizer", name: "YouTube Title Optimizer", description: "Score and optimize video titles with rules", category: "youtube", icon: Target, implemented: true },
  { id: "yt-description-builder", name: "YouTube Description Builder", description: "Build descriptions from smart templates", category: "youtube", icon: FileText, implemented: true },
  { id: "yt-seo-scorer", name: "YouTube Video SEO Scorer", description: "Score your video's overall SEO health", category: "youtube", icon: Activity, implemented: true },

  // ═══════════════════════════════════════
  // SEO AI-LIKE TOOLS (TEMPLATE-BASED)
  // ═══════════════════════════════════════
  { id: "seo-content-analyzer", name: "SEO Content Analyzer", description: "Analyze content for SEO best practices", category: "seo", icon: Activity, implemented: true },
  { id: "seo-onpage-checker", name: "On-Page SEO Checker", description: "Check HTML page for on-page SEO factors", category: "seo", icon: CheckCircle, implemented: true },
  { id: "seo-keyword-planner", name: "SEO Keyword Planner", description: "Generate keyword ideas by intent & niche", category: "seo", icon: Target, implemented: true },
];
