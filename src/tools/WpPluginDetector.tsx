import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton } from "./ToolComponents";
import { Search, Star, Download, ExternalLink, Globe, Code, Plug, Calendar, User, Loader2, Shield, CheckCircle } from "lucide-react";

interface PluginInfo {
  name: string;
  slug: string;
  version: string;
  author: string;
  author_profile: string;
  short_description: string;
  description: string;
  icons: Record<string, string>;
  banners: Record<string, string>;
  homepage: string;
  rating: number;
  num_ratings: number;
  active_installs: number;
  downloaded: number;
  last_updated: string;
  tested: string;
  requires: string;
  requires_php: string;
  tags: Record<string, string>;
}

const WpPluginDetector = () => {
  const [url, setUrl] = useState("");
  const [pluginSlug, setPluginSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const [plugin, setPlugin] = useState<PluginInfo | null>(null);
  const [error, setError] = useState("");
  const [searchResults, setSearchResults] = useState<PluginInfo[]>([]);
  const [mode, setMode] = useState<"detect" | "search" | "lookup">("search");

  const commonPluginSlugs = [
    "yoast-seo", "woocommerce", "contact-form-7", "elementor", "wp-rocket",
    "wordfence", "jetpack", "akismet", "w3-total-cache", "wp-super-cache",
    "all-in-one-seo-pack", "wpforms-lite", "really-simple-ssl", "updraftplus",
    "wp-mail-smtp", "classic-editor", "litespeed-cache", "redirection",
    "google-site-kit", "rank-math-seo"
  ];

  const fetchPluginFromApi = async (slug: string): Promise<PluginInfo | null> => {
    try {
      const res = await fetch(
        `https://api.wordpress.org/plugins/info/1.2/?action=plugin_information&slug=${encodeURIComponent(slug)}`
      );
      if (!res.ok) return null;
      const data = await res.json();
      if (data.error) return null;
      return data as PluginInfo;
    } catch {
      return null;
    }
  };

  const searchPlugins = async (query: string): Promise<PluginInfo[]> => {
    try {
      const res = await fetch(
        `https://api.wordpress.org/plugins/info/1.2/?action=query_plugins&request[search]=${encodeURIComponent(query)}&request[per_page]=8&request[fields][icons]=true&request[fields][banners]=true&request[fields][active_installs]=true&request[fields][downloaded]=true&request[fields][rating]=true&request[fields][tested]=true`
      );
      if (!res.ok) return [];
      const data = await res.json();
      return data.plugins || [];
    } catch {
      return [];
    }
  };

  const extractPluginSlugs = (inputUrl: string): string[] => {
    const matches = inputUrl.match(/wp-content\/plugins\/([^/]+)/g);
    if (matches) {
      return matches.map((m) => m.replace("wp-content/plugins/", ""));
    }
    return [];
  };

  const handleDetect = async () => {
    if (!url) return;
    setLoading(true);
    setError("");
    setPlugin(null);
    setSearchResults([]);

    const slugs = extractPluginSlugs(url);
    if (slugs.length > 0) {
      const results: PluginInfo[] = [];
      for (const slug of slugs.slice(0, 8)) {
        const info = await fetchPluginFromApi(slug);
        if (info) results.push(info);
      }
      if (results.length > 0) {
        setSearchResults(results);
        setLoading(false);
        return;
      }
    }

    // Try detecting common plugins by domain search
    const domain = url.replace(/^https?:\/\//, "").replace(/\/$/, "").split("/")[0];
    const results = await searchPlugins(domain);
    if (results.length > 0) {
      setSearchResults(results);
    } else {
      setError("Could not auto-detect plugins. Try searching by name or looking up a specific plugin slug.");
    }
    setLoading(false);
  };

  const handleSearch = async () => {
    if (!pluginSlug) return;
    setLoading(true);
    setError("");
    setPlugin(null);
    setSearchResults([]);

    if (mode === "lookup") {
      const info = await fetchPluginFromApi(pluginSlug.toLowerCase().replace(/\s+/g, "-"));
      if (info) {
        setPlugin(info);
      } else {
        setError("Plugin not found on WordPress.org. Try searching instead.");
      }
    } else {
      const results = await searchPlugins(pluginSlug);
      if (results.length > 0) {
        setSearchResults(results);
      } else {
        setError("No plugins found matching your search.");
      }
    }
    setLoading(false);
  };

  const getPluginIcon = (p: PluginInfo) => {
    if (p.icons) {
      return p.icons["2x"] || p.icons["1x"] || p.icons["svg"] || p.icons["default"] || "";
    }
    return "";
  };

  const renderStars = (rating: number) => {
    const stars = Math.round(rating / 20);
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={13}
            className={i <= stars ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/30"}
          />
        ))}
        <span className="text-xs text-muted-foreground ml-1">({(rating / 20).toFixed(1)})</span>
      </div>
    );
  };

  const formatNumber = (n: number | undefined | null) => {
    if (n == null) return "N/A";
    if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
    if (n >= 1000) return (n / 1000).toFixed(1) + "K";
    return n.toString();
  };

  const PluginCard = ({ p, full = false }: { p: PluginInfo; full?: boolean }) => {
    const icon = getPluginIcon(p);
    const banner = p.banners?.high || p.banners?.low || "";

    return (
      <div className="glass rounded-xl overflow-hidden gradient-border">
        {full && banner && (
          <img src={banner} alt="" className="w-full h-32 object-cover" loading="lazy" />
        )}
        <div className="p-4 space-y-3">
          <div className="flex items-start gap-3">
            {icon ? (
              <img src={icon} alt={p.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" loading="lazy" />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Plug size={20} className="text-primary" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-foreground text-sm leading-tight">{p.name}</h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                <User size={10} /> {typeof p.author === "string" ? p.author.replace(/<[^>]*>/g, "") : "Unknown"}
              </p>
              {renderStars(p.rating)}
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-mono flex-shrink-0">
              v{p.version}
            </span>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            {p.short_description?.slice(0, 150)}{p.short_description?.length > 150 ? "..." : ""}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className="text-center p-2 rounded-lg bg-muted/30">
              <Download size={12} className="mx-auto text-primary mb-0.5" />
              <p className="text-[11px] font-bold text-foreground">{formatNumber(p.active_installs)}+</p>
              <p className="text-[9px] text-muted-foreground">Active</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-muted/30">
              <Globe size={12} className="mx-auto text-primary mb-0.5" />
              <p className="text-[11px] font-bold text-foreground">{formatNumber(p.downloaded)}</p>
              <p className="text-[9px] text-muted-foreground">Downloads</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-muted/30">
              <Shield size={12} className="mx-auto text-primary mb-0.5" />
              <p className="text-[11px] font-bold text-foreground">{p.tested || "N/A"}</p>
              <p className="text-[9px] text-muted-foreground">Tested Up To</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-muted/30">
              <Calendar size={12} className="mx-auto text-primary mb-0.5" />
              <p className="text-[11px] font-bold text-foreground">{p.last_updated?.split(" ")[0] || "N/A"}</p>
              <p className="text-[9px] text-muted-foreground">Updated</p>
            </div>
          </div>

          {full && (
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2 text-xs">
                {p.requires && (
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <CheckCircle size={12} className="text-primary" /> WP {p.requires}+
                  </span>
                )}
                {p.requires_php && (
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Code size={12} className="text-primary" /> PHP {p.requires_php}+
                  </span>
                )}
              </div>
            </div>
          )}

          {p.tags && Object.keys(p.tags).length > 0 && (
            <div className="flex flex-wrap gap-1">
              {Object.values(p.tags).slice(0, 6).map((tag, i) => (
                <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-accent/20 text-accent-foreground">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex gap-2 pt-1">
            <a
              href={`https://wordpress.org/plugins/${p.slug}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-1"
            >
              <ExternalLink size={12} /> WordPress.org
            </a>
            {!full && (
              <button
                onClick={() => { setPlugin(p); setSearchResults([]); }}
                className="flex-1 text-center py-2 rounded-lg bg-muted text-foreground text-xs font-medium hover:bg-muted/80 transition-colors"
              >
                View Details
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <ToolLayout>
      {/* Mode Tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-muted/30">
        {([
          { id: "detect" as const, label: "Detect from URL", icon: Globe },
          { id: "search" as const, label: "Search Plugins", icon: Search },
          { id: "lookup" as const, label: "Lookup by Slug", icon: Code },
        ]).map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => { setMode(id); setPlugin(null); setSearchResults([]); setError(""); }}
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
            label="WordPress Site Source (paste page source or URL with wp-content paths)"
            value={url}
            onChange={setUrl}
            placeholder="https://example.com/wp-content/plugins/yoast-seo/..."
          />
          <ToolButton onClick={handleDetect}>
            {loading ? <span className="flex items-center gap-2"><Loader2 size={16} className="animate-spin" /> Detecting...</span> : <span className="flex items-center gap-2"><Plug size={16} /> Detect Plugins</span>}
          </ToolButton>
        </>
      ) : (
        <>
          <ToolInput
            label={mode === "lookup" ? "Plugin Slug (e.g. yoast-seo)" : "Search WordPress Plugins"}
            value={pluginSlug}
            onChange={setPluginSlug}
            placeholder={mode === "lookup" ? "yoast-seo" : "SEO plugin..."}
          />
          <ToolButton onClick={handleSearch}>
            {loading ? <span className="flex items-center gap-2"><Loader2 size={16} className="animate-spin" /> Searching...</span> : <span className="flex items-center gap-2"><Search size={16} /> {mode === "lookup" ? "Lookup Plugin" : "Search"}</span>}
          </ToolButton>
        </>
      )}

      {/* Popular Plugins Quick Access */}
      {!loading && !plugin && searchResults.length === 0 && !error && mode === "search" && (
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">Popular plugins:</p>
          <div className="flex flex-wrap gap-1.5">
            {["yoast-seo", "woocommerce", "elementor", "contact-form-7", "wordfence", "jetpack", "rank-math-seo", "wpforms-lite"].map((slug) => (
              <button
                key={slug}
                onClick={() => { setPluginSlug(slug); setMode("lookup"); }}
                className="text-[11px] px-2.5 py-1 rounded-full bg-muted/50 text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
              >
                {slug}
              </button>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
          {error}
        </div>
      )}

      {plugin && <PluginCard p={plugin} full />}

      {searchResults.length > 0 && (
        <div>
          <p className="text-sm font-medium text-foreground mb-3">
            Found {searchResults.length} plugins:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {searchResults.map((p) => (
              <PluginCard key={p.slug} p={p} />
            ))}
          </div>
        </div>
      )}

      {!loading && !plugin && searchResults.length === 0 && !error && mode !== "search" && (
        <div className="text-center py-8 text-muted-foreground">
          <Plug size={32} className="mx-auto mb-3 opacity-40" />
          <p className="text-sm">Detect, search, or look up WordPress plugins.</p>
          <p className="text-xs mt-1">Uses the official WordPress.org Plugins API for real-time data.</p>
        </div>
      )}
    </ToolLayout>
  );
};

export default WpPluginDetector;
