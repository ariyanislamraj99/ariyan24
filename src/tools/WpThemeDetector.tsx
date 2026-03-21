import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton } from "./ToolComponents";
import { Search, Star, Download, ExternalLink, Globe, Code, Paintbrush, Calendar, User, Loader2 } from "lucide-react";

interface ThemeInfo {
  name: string;
  slug: string;
  version: string;
  author: string;
  description: string;
  screenshot_url: string;
  preview_url: string;
  homepage: string;
  rating: number;
  num_ratings: number;
  active_installs: number;
  downloaded: number;
  last_updated: string;
  tags: Record<string, string>;
}

const WpThemeDetector = () => {
  const [url, setUrl] = useState("");
  const [themeSlug, setThemeSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState<ThemeInfo | null>(null);
  const [error, setError] = useState("");
  const [searchResults, setSearchResults] = useState<ThemeInfo[]>([]);
  const [mode, setMode] = useState<"detect" | "search" | "lookup">("detect");

  const extractThemeSlug = (inputUrl: string): string | null => {
    // Try to extract from wp-content/themes/ pattern
    const themeMatch = inputUrl.match(/wp-content\/themes\/([^/]+)/);
    if (themeMatch) return themeMatch[1];

    // Try common theme slugs from URL patterns
    const cleanUrl = inputUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");
    const domain = cleanUrl.split("/")[0].replace("www.", "");
    return null;
  };

  const fetchThemeFromApi = async (slug: string): Promise<ThemeInfo | null> => {
    try {
      const res = await fetch(
        `https://api.wordpress.org/themes/info/1.2/?action=theme_information&slug=${encodeURIComponent(slug)}`
      );
      if (!res.ok) return null;
      const data = await res.json();
      if (data.error) return null;
      return data as ThemeInfo;
    } catch {
      return null;
    }
  };

  const searchThemes = async (query: string): Promise<ThemeInfo[]> => {
    try {
      const res = await fetch(
        `https://api.wordpress.org/themes/info/1.2/?action=query_themes&request[search]=${encodeURIComponent(query)}&request[per_page]=6&request[fields][screenshot_url]=true&request[fields][active_installs]=true&request[fields][downloaded]=true&request[fields][rating]=true`
      );
      if (!res.ok) return [];
      const data = await res.json();
      return data.themes || [];
    } catch {
      return [];
    }
  };

  const handleDetect = async () => {
    if (!url) return;
    setLoading(true);
    setError("");
    setTheme(null);
    setSearchResults([]);

    // Try extracting theme slug from URL
    const slug = extractThemeSlug(url);
    if (slug) {
      const info = await fetchThemeFromApi(slug);
      if (info) {
        setTheme(info);
        setLoading(false);
        return;
      }
    }

    // Try the domain name as a search term
    const domain = url.replace(/^https?:\/\//, "").replace(/\/$/, "").split("/")[0].replace("www.", "");
    const results = await searchThemes(domain);
    if (results.length > 0) {
      setSearchResults(results);
    } else {
      setError(
        "Could not auto-detect the theme. Try searching by theme name below, or look up a specific theme slug."
      );
    }
    setLoading(false);
  };

  const handleSearch = async () => {
    if (!themeSlug) return;
    setLoading(true);
    setError("");
    setTheme(null);
    setSearchResults([]);

    if (mode === "lookup") {
      const info = await fetchThemeFromApi(themeSlug.toLowerCase().replace(/\s+/g, "-"));
      if (info) {
        setTheme(info);
      } else {
        setError("Theme not found on WordPress.org. Try searching instead.");
      }
    } else {
      const results = await searchThemes(themeSlug);
      if (results.length > 0) {
        setSearchResults(results);
      } else {
        setError("No themes found matching your search.");
      }
    }
    setLoading(false);
  };

  const renderStars = (rating: number) => {
    const stars = Math.round(rating / 20);
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={14}
            className={i <= stars ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/30"}
          />
        ))}
        <span className="text-xs text-muted-foreground ml-1">({rating / 20}/5)</span>
      </div>
    );
  };

  const formatNumber = (n: number | undefined | null) => {
    if (n == null) return "N/A";
    if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
    if (n >= 1000) return (n / 1000).toFixed(1) + "K";
    return n.toString();
  };

  const ThemeCard = ({ t, full = false }: { t: ThemeInfo; full?: boolean }) => (
    <div className="glass rounded-xl overflow-hidden gradient-border">
      {t.screenshot_url && (
        <div className="relative group">
          <img
            src={t.screenshot_url}
            alt={t.name}
            className="w-full h-48 object-cover object-top"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            {t.preview_url && (
              <a
                href={t.preview_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity"
              >
                Live Preview
              </a>
            )}
            {t.homepage && (
              <a
                href={t.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-muted text-foreground text-xs font-medium hover:opacity-90 transition-opacity"
              >
                Homepage
              </a>
            )}
          </div>
        </div>
      )}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-bold text-foreground text-lg">{t.name}</h3>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <User size={12} /> {typeof t.author === "string" ? t.author.replace(/<[^>]*>/g, "") : "Unknown"}
            </p>
          </div>
          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-mono">
            v{t.version}
          </span>
        </div>

        {renderStars(t.rating)}

        <div className="grid grid-cols-3 gap-2">
          <div className="text-center p-2 rounded-lg bg-muted/30">
            <Download size={14} className="mx-auto text-primary mb-1" />
            <p className="text-xs font-bold text-foreground">{formatNumber(t.active_installs)}+</p>
            <p className="text-[10px] text-muted-foreground">Active</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-muted/30">
            <Globe size={14} className="mx-auto text-primary mb-1" />
            <p className="text-xs font-bold text-foreground">{formatNumber(t.downloaded)}</p>
            <p className="text-[10px] text-muted-foreground">Downloads</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-muted/30">
            <Calendar size={14} className="mx-auto text-primary mb-1" />
            <p className="text-xs font-bold text-foreground">{t.last_updated?.split(" ")[0] || "N/A"}</p>
            <p className="text-[10px] text-muted-foreground">Updated</p>
          </div>
        </div>

        {full && t.description && (
          <div className="text-sm text-muted-foreground leading-relaxed max-h-32 overflow-y-auto">
            <p dangerouslySetInnerHTML={{ __html: t.description.slice(0, 300) + (t.description.length > 300 ? "..." : "") }} />
          </div>
        )}

        {t.tags && Object.keys(t.tags).length > 0 && (
          <div className="flex flex-wrap gap-1">
            {Object.values(t.tags).slice(0, 8).map((tag, i) => (
              <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-accent/20 text-accent-foreground">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-2 pt-1">
          <a
            href={`https://wordpress.org/themes/${t.slug}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-1"
          >
            <ExternalLink size={12} /> WordPress.org
          </a>
          {!full && (
            <button
              onClick={() => { setTheme(t); setSearchResults([]); }}
              className="flex-1 text-center py-2 rounded-lg bg-muted text-foreground text-xs font-medium hover:bg-muted/80 transition-colors"
            >
              View Details
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <ToolLayout>
      {/* Mode Tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-muted/30">
        {([
          { id: "detect" as const, label: "Detect from URL", icon: Globe },
          { id: "search" as const, label: "Search Themes", icon: Search },
          { id: "lookup" as const, label: "Lookup by Slug", icon: Code },
        ]).map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => { setMode(id); setTheme(null); setSearchResults([]); setError(""); }}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
              mode === id ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon size={14} /> {label}
          </button>
        ))}
      </div>

      {mode === "detect" ? (
        <>
          <ToolInput
            label="WordPress Site URL"
            value={url}
            onChange={setUrl}
            placeholder="https://example.com or wp-content/themes/theme-slug/..."
          />
          <ToolButton onClick={handleDetect}>
            {loading ? <span className="flex items-center gap-2"><Loader2 size={16} className="animate-spin" /> Detecting...</span> : <span className="flex items-center gap-2"><Paintbrush size={16} /> Detect Theme</span>}
          </ToolButton>
        </>
      ) : (
        <>
          <ToolInput
            label={mode === "lookup" ? "Theme Slug (e.g. flavor, flavor)" : "Search WordPress Themes"}
            value={themeSlug}
            onChange={setThemeSlug}
            placeholder={mode === "lookup" ? "flavor" : "portfolio theme..."}
          />
          <ToolButton onClick={handleSearch}>
            {loading ? <span className="flex items-center gap-2"><Loader2 size={16} className="animate-spin" /> Searching...</span> : <span className="flex items-center gap-2"><Search size={16} /> {mode === "lookup" ? "Lookup Theme" : "Search"}</span>}
          </ToolButton>
        </>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
          {error}
        </div>
      )}

      {theme && <ThemeCard t={theme} full />}

      {searchResults.length > 0 && (
        <div>
          <p className="text-sm font-medium text-foreground mb-3">
            Found {searchResults.length} themes:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {searchResults.map((t) => (
              <ThemeCard key={t.slug} t={t} />
            ))}
          </div>
        </div>
      )}

      {!loading && !theme && searchResults.length === 0 && !error && (
        <div className="text-center py-8 text-muted-foreground">
          <Paintbrush size={32} className="mx-auto mb-3 opacity-40" />
          <p className="text-sm">Enter a WordPress site URL, search for themes, or look up by slug.</p>
          <p className="text-xs mt-1">Uses the official WordPress.org Themes API for real-time data.</p>
        </div>
      )}
    </ToolLayout>
  );
};

export default WpThemeDetector;
