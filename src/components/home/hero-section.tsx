"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroCodePreview } from "@/components/home/hero-code-preview";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-24 pt-24 sm:px-6 sm:pt-32 lg:px-8">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.07) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(60% 55% at 50% 0%, black, transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-[-10%] h-[600px] w-[900px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(59,130,246,0.35), rgba(139,92,246,0.2), transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute right-[8%] top-[18%] h-64 w-64 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(34,211,238,0.4), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.span
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-brand-blue/30 bg-brand-blue/10 px-4 py-1.5 text-xs font-medium text-brand-blue"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Learn AI. Build Anything.
        </motion.span>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-4xl font-semibold leading-[1.1] tracking-tight text-text-primary sm:text-5xl lg:text-[4rem]"
        >
          Biến ý tưởng thành{" "}
          <span className="bg-gradient-to-r from-brand-blue via-brand-violet to-brand-cyan bg-clip-text text-transparent">
            sản phẩm thật
          </span>{" "}
          bằng sức mạnh AI
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mx-auto mt-6 max-w-2xl text-base text-text-secondary sm:text-lg"
        >
          Học Vibe Coding từ con số 0. Làm chủ công cụ AI, xây dựng website và đưa sản phẩm của
          bạn lên Internet.
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link href="/courses" className="w-full sm:w-auto">
            <Button size="lg" className="w-full shadow-lg shadow-brand-blue/20 sm:w-auto">
              Khám phá khóa học
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/register" className="w-full sm:w-auto">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto">
              <Play className="h-4 w-4" />
              Bắt đầu học ngay
            </Button>
          </Link>
        </motion.div>
      </div>

      <motion.div
        custom={4}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="relative mx-auto mt-16 max-w-4xl"
      >
        <HeroCodePreview />
      </motion.div>
    </section>
  );
}
