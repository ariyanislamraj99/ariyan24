import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowLeft, Wrench, ChevronRight } from "lucide-react";
import { tools, categories, ToolCategory } from "@/data/toolsData";

const ToolsPage = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<ToolCategory | "all">("all");

  const filtered = useMemo(() => {
    return tools.filter((t) => {
      const matchesSearch =
        !search ||
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase());
      const matchesCat = activeCategory === "all" || t.category === activeCategory;
      return matchesSearch && matchesCat;
    });
  }, [search, activeCategory]);

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: tools.length };
    categories.forEach((c) => {
      map[c.id] = tools.filter((t) => t.category === c.id).length;
    });
    return map;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-glass/60 border-b border-glass-border/20">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={18} />
            <span className="text-sm hidden sm:inline">Back</span>
          </Link>
          <div className="flex items-center gap-2 flex-1">
            <Wrench size={20} className="text-primary" />
            <h1 className="text-lg font-bold text-foreground">Web Tools</h1>
            <span className="text-xs text-muted-foreground ml-1">({tools.length}+ tools)</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-6">
        {/* Search */}
        <div className="relative max-w-xl mx-auto mb-8">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
              activeCategory === "all"
                ? "gradient-bg text-primary-foreground shadow-lg"
                : "bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            All ({counts.all})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeCategory === cat.id
                  ? "gradient-bg text-primary-foreground shadow-lg"
                  : "bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <cat.icon size={12} />
              {cat.label} ({counts[cat.id]})
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {filtered.map((tool) => (
            <Link
              key={tool.id}
              to={tool.implemented ? `/tools/${tool.id}` : "#"}
              className={`group glass rounded-xl p-5 gradient-border transition-all duration-300 ${
                tool.implemented
                  ? "hover:shadow-glass-strong hover:-translate-y-1 cursor-pointer"
                  : "opacity-60 cursor-not-allowed"
              }`}
              onClick={(e) => !tool.implemented && e.preventDefault()}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <tool.icon size={18} className="text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-foreground truncate">{tool.name}</h3>
                    {!tool.implemented && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground shrink-0">
                        Soon
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{tool.description}</p>
                </div>
                {tool.implemented && (
                  <ChevronRight size={14} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
                )}
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Search size={48} className="mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground">No tools found matching "{search}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolsPage;
