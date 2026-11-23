"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const LINES = [
  { text: "> Xây dựng một landing page cho sản phẩm SaaS của tôi", kind: "prompt" },
  { text: "✓ Phân tích yêu cầu và thiết kế bố cục", kind: "done" },
  { text: "✓ Tạo components: Header, Hero, Pricing, Footer", kind: "done" },
  { text: "✓ Triển khai lên Internet thành công", kind: "done" },
];

export function HeroCodePreview() {
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

      <div className="flex flex-col gap-3 p-6 text-left font-mono text-sm sm:p-8">
        {LINES.map((line, idx) => (
          <motion.div
            key={line.text}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + idx * 0.25 }}
            className={
              line.kind === "prompt"
                ? "text-text-primary"
                : "flex items-center gap-2 text-success"
            }
          >
            {line.text}
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 + LINES.length * 0.25 }}
          className="mt-1 h-4 w-2 animate-pulse bg-brand-blue"
        />
      </div>
    </div>
  );
}
