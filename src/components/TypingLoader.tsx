import { useState, useEffect } from "react";

const phrases = [
  "Initializing portfolio...",
  "Loading components...",
  "Compiling assets...",
  "Rendering UI...",
  "Welcome!",
];

const TypingLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const phrase = phrases[phraseIndex];

    if (charIndex < phrase.length) {
      const timer = setTimeout(() => {
        setDisplayed((prev) => prev + phrase[charIndex]);
        setCharIndex((c) => c + 1);
      }, 40);
      return () => clearTimeout(timer);
    }

    // Pause at end of phrase
    const nextTimer = setTimeout(() => {
      if (phraseIndex < phrases.length - 1) {
        setPhraseIndex((p) => p + 1);
        setCharIndex(0);
        setDisplayed("");
        setProgress(((phraseIndex + 1) / phrases.length) * 100);
      } else {
        setProgress(100);
        setTimeout(onComplete, 400);
      }
    }, 300);

    return () => clearTimeout(nextTimer);
  }, [charIndex, phraseIndex, onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center gap-6 animate-fade-in">
      {/* Terminal-style container */}
      <div className="glass rounded-2xl p-8 max-w-md w-[90%] gradient-border">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-destructive/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-2 text-xs text-muted-foreground font-mono">terminal</span>
        </div>

        <div className="font-mono text-sm text-foreground min-h-[24px]">
          <span className="text-primary">→ </span>
          {displayed}
          <span className="inline-block w-2 h-4 bg-primary ml-0.5 animate-pulse" />
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-[90%] max-w-md">
        <div className="h-1 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full gradient-bg transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2 font-mono">
          {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
};

export default TypingLoader;
