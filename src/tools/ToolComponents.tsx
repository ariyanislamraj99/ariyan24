import { useState, ReactNode } from "react";
import { Copy, Check } from "lucide-react";

export const ToolLayout = ({ children }: { children: ReactNode }) => (
  <div className="glass rounded-2xl p-6 gradient-border space-y-4">{children}</div>
);

export const ToolInput = ({
  label,
  value,
  onChange,
  placeholder,
  multiline,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
}) => (
  <div>
    <label className="text-sm font-medium text-foreground mb-1.5 block">{label}</label>
    {multiline ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono text-sm resize-y"
      />
    ) : (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
      />
    )}
  </div>
);

export const ToolOutput = ({ label, value }: { label: string; value: string }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-sm font-medium text-foreground">{label}</label>
        {value && (
          <button onClick={copy} className="flex items-center gap-1 text-xs text-primary hover:text-accent transition-colors">
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? "Copied!" : "Copy"}
          </button>
        )}
      </div>
      <pre className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground font-mono text-sm whitespace-pre-wrap break-all min-h-[60px] max-h-[300px] overflow-auto">
        {value || <span className="text-muted-foreground">Output will appear here...</span>}
      </pre>
    </div>
  );
};

export const ToolButton = ({
  onClick,
  children,
  variant = "primary",
}: {
  onClick: () => void;
  children: ReactNode;
  variant?: "primary" | "secondary";
}) => (
  <button
    onClick={onClick}
    className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
      variant === "primary"
        ? "gradient-bg text-primary-foreground hover:opacity-90 shadow-lg"
        : "bg-muted text-foreground hover:bg-muted/80"
    }`}
  >
    {children}
  </button>
);

export const ToolSelect = ({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) => (
  <div>
    <label className="text-sm font-medium text-foreground mb-1.5 block">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  </div>
);

export const ToolNumber = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) => (
  <div>
    <label className="text-sm font-medium text-foreground mb-1.5 block">{label}</label>
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      min={min}
      max={max}
      step={step}
      className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
    />
  </div>
);
