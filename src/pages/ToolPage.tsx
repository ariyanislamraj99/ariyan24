import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Copy, Check, RotateCw } from "lucide-react";
import { tools } from "@/data/toolsData";
import { useState, lazy, Suspense } from "react";

// Lazy load all tool implementations
const toolComponents: Record<string, React.LazyExoticComponent<any>> = {
  // Web
  "json-formatter": lazy(() => import("@/tools/JsonFormatter")),
  "url-encoder": lazy(() => import("@/tools/UrlEncoder")),
  "base64": lazy(() => import("@/tools/Base64Tool")),
  "qr-generator": lazy(() => import("@/tools/QrGenerator")),
  "html-formatter": lazy(() => import("@/tools/HtmlFormatter")),
  "css-minifier": lazy(() => import("@/tools/CssMinifier")),
  "js-minifier": lazy(() => import("@/tools/JsMinifier")),
  "html-minifier": lazy(() => import("@/tools/HtmlMinifier")),
  "meta-tag-generator": lazy(() => import("@/tools/MetaTagGenerator")),
  "robots-txt-generator": lazy(() => import("@/tools/RobotsTxtGenerator")),
  "htaccess-redirect": lazy(() => import("@/tools/HtaccessGenerator")),
  "open-graph-generator": lazy(() => import("@/tools/OpenGraphGenerator")),
  "favicon-generator": lazy(() => import("@/tools/FaviconGenerator")),
  "sitemap-generator": lazy(() => import("@/tools/SitemapGenerator")),
  "schema-generator": lazy(() => import("@/tools/SchemaGenerator")),
  // Image
  "image-resizer": lazy(() => import("@/tools/ImageResizer")),
  "image-compressor": lazy(() => import("@/tools/ImageCompressor")),
  "image-to-base64": lazy(() => import("@/tools/ImageToBase64")),
  "color-picker": lazy(() => import("@/tools/ColorPicker")),
  "image-cropper": lazy(() => import("@/tools/ImageCropper")),
  "image-flipper": lazy(() => import("@/tools/ImageFlipper")),
  "image-format-converter": lazy(() => import("@/tools/ImageFormatConverter")),
  "placeholder-image": lazy(() => import("@/tools/PlaceholderImage")),
  "gradient-generator": lazy(() => import("@/tools/GradientGenerator")),
  "svg-to-png": lazy(() => import("@/tools/SvgToPng")),
  "image-watermark": lazy(() => import("@/tools/ImageWatermark")),
  // SEO
  "keyword-density": lazy(() => import("@/tools/KeywordDensity")),
  "word-counter": lazy(() => import("@/tools/WordCounter")),
  "meta-length-checker": lazy(() => import("@/tools/MetaLengthChecker")),
  "slug-generator": lazy(() => import("@/tools/SlugGenerator")),
  "lorem-ipsum": lazy(() => import("@/tools/LoremIpsum")),
  "readability-checker": lazy(() => import("@/tools/ReadabilityChecker")),
  "heading-checker": lazy(() => import("@/tools/HeadingChecker")),
  "canonical-tag-gen": lazy(() => import("@/tools/CanonicalTagGen")),
  "og-preview": lazy(() => import("@/tools/OgPreview")),
  "xml-sitemap-validator": lazy(() => import("@/tools/SitemapValidator")),
  // YouTube
  "yt-thumbnail-downloader": lazy(() => import("@/tools/YtThumbnailDownloader")),
  "yt-timestamp-link": lazy(() => import("@/tools/YtTimestampLink")),
  "yt-embed-generator": lazy(() => import("@/tools/YtEmbedGenerator")),
  "yt-tag-generator": lazy(() => import("@/tools/YtTagGenerator")),
  "yt-title-generator": lazy(() => import("@/tools/YtTitleGenerator")),
  "yt-description-generator": lazy(() => import("@/tools/YtDescriptionGenerator")),
  "yt-channel-id": lazy(() => import("@/tools/YtChannelId")),
  "yt-video-id": lazy(() => import("@/tools/YtVideoId")),
  "yt-playlist-link": lazy(() => import("@/tools/YtPlaylistLink")),
  "yt-seo-checklist": lazy(() => import("@/tools/YtSeoChecklist")),
  "yt-hashtag-gen": lazy(() => import("@/tools/YtHashtagGen")),
  "yt-chapter-gen": lazy(() => import("@/tools/YtChapterGen")),
  "yt-end-screen-gen": lazy(() => import("@/tools/YtEndScreen")),
  "yt-ab-title": lazy(() => import("@/tools/YtAbTitle")),
  "yt-desc-optimizer": lazy(() => import("@/tools/YtDescOptimizer")),
  "yt-shorts-ideas": lazy(() => import("@/tools/YtShortsIdeas")),
  // Text
  "case-converter": lazy(() => import("@/tools/CaseConverter")),
  "text-repeater": lazy(() => import("@/tools/TextRepeater")),
  "text-reverser": lazy(() => import("@/tools/TextReverser")),
  "remove-duplicates": lazy(() => import("@/tools/RemoveDuplicates")),
  "line-counter": lazy(() => import("@/tools/LineCounter")),
  "text-diff": lazy(() => import("@/tools/TextDiff")),
  "string-replace": lazy(() => import("@/tools/StringReplace")),
  "random-string": lazy(() => import("@/tools/RandomString")),
  "text-to-binary": lazy(() => import("@/tools/TextToBinary")),
  "text-to-morse": lazy(() => import("@/tools/TextToMorse")),
  "whitespace-remover": lazy(() => import("@/tools/WhitespaceRemover")),
  "text-sorter": lazy(() => import("@/tools/TextSorter")),
  "text-truncator": lazy(() => import("@/tools/TextTruncator")),
  // Developer
  "regex-tester": lazy(() => import("@/tools/RegexTester")),
  "json-to-typescript": lazy(() => import("@/tools/JsonToTypescript")),
  "uuid-generator": lazy(() => import("@/tools/UuidGenerator")),
  "timestamp-converter": lazy(() => import("@/tools/TimestampConverter")),
  "jwt-decoder": lazy(() => import("@/tools/JwtDecoder")),
  "cron-expression": lazy(() => import("@/tools/CronExpression")),
  "chmod-calculator": lazy(() => import("@/tools/ChmodCalculator")),
  "html-entity": lazy(() => import("@/tools/HtmlEntity")),
  "diff-checker": lazy(() => import("@/tools/DiffChecker")),
  "markdown-preview": lazy(() => import("@/tools/MarkdownPreview")),
  "sql-formatter": lazy(() => import("@/tools/SqlFormatter")),
  // Converters
  "px-to-rem": lazy(() => import("@/tools/PxToRem")),
  "color-converter": lazy(() => import("@/tools/ColorConverter")),
  "number-base": lazy(() => import("@/tools/NumberBase")),
  "temperature": lazy(() => import("@/tools/TemperatureConverter")),
  "unit-converter": lazy(() => import("@/tools/UnitConverter")),
  "data-storage": lazy(() => import("@/tools/DataStorage")),
  "csv-to-json": lazy(() => import("@/tools/CsvToJson")),
  "json-to-csv": lazy(() => import("@/tools/JsonToCsv")),
  "markdown-to-html": lazy(() => import("@/tools/MarkdownToHtml")),
  "yaml-to-json": lazy(() => import("@/tools/YamlToJson")),
  "epoch-converter": lazy(() => import("@/tools/EpochConverter")),
  "roman-numeral": lazy(() => import("@/tools/RomanNumeral")),
  // Security
  "password-generator": lazy(() => import("@/tools/PasswordGenerator")),
  "password-strength": lazy(() => import("@/tools/PasswordStrength")),
  "hash-generator": lazy(() => import("@/tools/HashGenerator")),
  "encryption-tool": lazy(() => import("@/tools/EncryptionTool")),
  "csp-generator": lazy(() => import("@/tools/CspGenerator")),
  // Social
  "twitter-card-gen": lazy(() => import("@/tools/TwitterCardGen")),
  "social-image-resizer": lazy(() => import("@/tools/SocialImageResizer")),
  "hashtag-generator": lazy(() => import("@/tools/HashtagGenerator")),
  "emoji-picker": lazy(() => import("@/tools/EmojiPicker")),
  "bio-generator": lazy(() => import("@/tools/BioGenerator")),
  "link-shortener-gen": lazy(() => import("@/tools/UtmBuilder")),
  // Design
  "color-palette": lazy(() => import("@/tools/ColorPalette")),
  "box-shadow-gen": lazy(() => import("@/tools/BoxShadowGen")),
  "border-radius-gen": lazy(() => import("@/tools/BorderRadiusGen")),
  "glassmorphism-gen": lazy(() => import("@/tools/GlassmorphismGen")),
  "neumorphism-gen": lazy(() => import("@/tools/NeumorphismGen")),
  "text-shadow-gen": lazy(() => import("@/tools/TextShadowGen")),
  "font-pairing": lazy(() => import("@/tools/FontPairing")),
  "aspect-ratio-calc": lazy(() => import("@/tools/AspectRatioCalc")),
  "flexbox-gen": lazy(() => import("@/tools/FlexboxGen")),
  "grid-gen": lazy(() => import("@/tools/GridGen")),
  // WordPress
  "wp-security-header": lazy(() => import("@/tools/WpSecurityHeader")),
  "wp-htaccess-gen": lazy(() => import("@/tools/WpHtaccessGen")),
  "wp-robots-gen": lazy(() => import("@/tools/WpRobotsGen")),
  "wp-password-gen": lazy(() => import("@/tools/WpPasswordGen")),
  "wp-salt-gen": lazy(() => import("@/tools/WpSaltGen")),
  "wp-shortcode-gen": lazy(() => import("@/tools/WpShortcodeGen")),
  // PDF
  "pdf-page-counter": lazy(() => import("@/tools/PdfPageCounter")),
  "pdf-metadata-viewer": lazy(() => import("@/tools/PdfMetadataViewer")),
  "pdf-text-extractor": lazy(() => import("@/tools/PdfTextExtractor")),
  "pdf-word-counter": lazy(() => import("@/tools/PdfWordCounter")),
  "pdf-link-extractor": lazy(() => import("@/tools/PdfLinkExtractor")),
  "pdf-size-analyzer": lazy(() => import("@/tools/PdfSizeAnalyzer")),
  "pdf-password-gen": lazy(() => import("@/tools/PdfPasswordGen")),
  "pdf-watermark-gen": lazy(() => import("@/tools/PdfWatermarkGen")),
  "pdf-invoice-gen": lazy(() => import("@/tools/PdfInvoiceGen")),
  "pdf-resume-checker": lazy(() => import("@/tools/PdfResumeChecker")),
};

const ToolPage = () => {
  const { toolId } = useParams();
  const tool = tools.find((t) => t.id === toolId);
  const ToolComponent = toolId ? toolComponents[toolId] : null;

  if (!tool) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Tool Not Found</h1>
          <Link to="/tools" className="text-primary hover:underline">Back to Tools</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-glass/60 border-b border-glass-border/20">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <Link to="/tools" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={18} />
            <span className="text-sm hidden sm:inline">All Tools</span>
          </Link>
          <div className="flex items-center gap-3 flex-1">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <tool.icon size={16} className="text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-base font-bold text-foreground">{tool.name}</h1>
              <p className="text-xs text-muted-foreground">{tool.description}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-6 max-w-4xl">
        {ToolComponent ? (
          <Suspense
            fallback={
              <div className="flex items-center justify-center py-16">
                <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              </div>
            }
          >
            <ToolComponent />
          </Suspense>
        ) : (
          <div className="glass rounded-2xl p-8 text-center gradient-border">
            <p className="text-muted-foreground">This tool is coming soon!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolPage;
