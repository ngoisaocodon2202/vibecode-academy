"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const PROMPT = "Xây dựng một landing page cho sản phẩm SaaS của tôi";
const DONE_LINES = [
  "Phân tích yêu cầu và thiết kế bố cục",
  "Tạo components: Header, Hero, Pricing, Footer",
  "Triển khai lên Internet thành công",
];
const TYPE_SPEED_MS = 28;

export function HeroCodePreview() {
  const [typedChars, setTypedChars] = useState(0);
  const promptDone = typedChars >= PROMPT.length;

  useEffect(() => {
    if (typedChars >= PROMPT.length) return;
    const timeout = setTimeout(() => setTypedChars((c) => c + 1), TYPE_SPEED_MS);
    return () => clearTimeout(timeout);
  }, [typedChars]);

  const promptStartDelay = PROMPT.length * (TYPE_SPEED_MS / 1000) + 0.3;

  return (
    <div className="relative rounded-2xl border border-border-subtle bg-bg-card/80 shadow-2xl shadow-black/40 backdrop-blur-sm">
      <div className="absolute -inset-px -z-10 rounded-2xl bg-gradient-to-r from-brand-blue/30 via-brand-violet/30 to-brand-cyan/30 opacity-60 blur-xl" />

      <div className="flex items-center gap-2 border-b border-border-subtle px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-error/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
        <span className="ml-3 flex items-center gap-1.5 text-xs text-text-secondary">
          <Sparkles className="h-3 w-3" />
          VibeCode AI Assistant
        </span>
      </div>

      <div className="flex min-h-[9.5rem] flex-col gap-3 p-6 text-left font-mono text-sm sm:p-8">
        <div className="text-text-primary">
          <span className="text-brand-cyan">{"> "}</span>
          {PROMPT.slice(0, typedChars)}
          {!promptDone && (
            <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-brand-blue" />
          )}
        </div>

        {promptDone &&
          DONE_LINES.map((line, idx) => (
            <motion.div
              key={line}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: promptStartDelay + idx * 0.3 }}
              className="flex items-center gap-2 text-success"
            >
              ✓ {line}
            </motion.div>
          ))}
      </div>
    </div>
  );
}
