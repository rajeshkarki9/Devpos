import React from 'react';
import { motion } from 'framer-motion';
import { 
  GitBranch, 
  Terminal, 
  ArrowRight, 
  Play, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Layers,
  Award
} from 'lucide-react';

export default function HeroSection({ onStartLearning, onExploreCommands, onOpenTerminal, onOpenDemos }) {
  return (
    <section className="relative overflow-hidden py-12 md:py-20 lg:py-24">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-git-500/10 via-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hero Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-git-50 dark:bg-git-950/60 border border-git-200 dark:border-git-800 text-git-600 dark:text-git-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-git-500" />
              <span>Interactive Developer Education Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
              Master Git & GitHub, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-git-600 via-git-500 to-amber-500">
                One Command at a Time.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Tired of confusing terminal errors and memorizing commands? Learn version control visually with animated workflows, an interactive simulated terminal sandbox, and beginner-to-advanced lessons.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={onStartLearning}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-git-500 hover:bg-git-600 text-white font-bold text-sm transition shadow-lg shadow-git-500/25 flex items-center justify-center gap-2"
              >
                <span>Start Learning Course</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreCommands}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-git-500/40 text-slate-800 dark:text-slate-200 font-semibold text-sm transition shadow-xs flex items-center justify-center gap-2"
              >
                <Terminal className="w-4 h-4 text-git-500" />
                <span>Explore Git Commands</span>
              </button>
            </div>

            {/* Feature Highlights Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                No Terminal Setup Required
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Step-by-Step Visual Animations
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Safe Sandboxed CLI
              </span>
            </div>
          </div>

          {/* Right Column: Animated Branching & Terminal Teaser */}
          <div className="lg:col-span-5 space-y-4">
            {/* Interactive Animated Branching Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-git-500 animate-ping opacity-75" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    Live Commit Timeline
                  </span>
                </div>
                <span className="text-[10px] font-mono text-git-500 bg-git-50 dark:bg-git-950/60 px-2 py-0.5 rounded-full font-bold">
                  main (HEAD)
                </span>
              </div>

              {/* Animated SVG Graph */}
              <div className="h-36 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 320 120">
                  {/* Base branch line */}
                  <line x1="30" y1="60" x2="190" y2="60" stroke="#cbd5e1" strokeWidth="3" />
                  <circle cx="30" cy="60" r="10" fill="#94a3b8" />
                  <circle cx="90" cy="60" r="10" fill="#94a3b8" />
                  <circle cx="150" cy="60" r="10" fill="#38bdf8" />

                  {/* Feature branch line */}
                  <path d="M 90 60 Q 120 100 160 100 L 220 100" stroke="#f05032" strokeWidth="3" fill="none" />
                  <circle cx="160" cy="100" r="10" fill="#f05032" />
                  <circle cx="220" cy="100" r="10" fill="#f05032" />

                  {/* Merge line */}
                  <path d="M 220 100 Q 250 100 270 60" stroke="#10b981" strokeWidth="3" fill="none" strokeDasharray="3 3" />
                  <circle cx="270" cy="60" r="12" fill="#10b981" />

                  {/* Labels */}
                  <text x="30" y="42" textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="bold">init</text>
                  <text x="150" y="42" textAnchor="middle" fill="#0284c7" fontSize="9" fontWeight="bold">main</text>
                  <text x="220" y="118" textAnchor="middle" fill="#f05032" fontSize="9" fontWeight="bold">feature</text>
                  <text x="270" y="40" textAnchor="middle" fill="#059669" fontSize="9" fontWeight="bold">v1.0</text>
                </svg>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500">
                <span>Parallel development branches</span>
                <button
                  onClick={onOpenDemos}
                  className="font-bold text-git-500 hover:text-git-600 flex items-center gap-1"
                >
                  <span>Watch Demos</span>
                  <Play className="w-3 h-3 fill-current" />
                </button>
              </div>
            </div>

            {/* Simulated Terminal Preview Card */}
            <div 
              onClick={onOpenTerminal}
              className="bg-[#0c1017] border border-slate-800 rounded-3xl p-4 shadow-xl font-mono text-xs text-slate-300 cursor-pointer hover:border-git-500/50 transition group"
            >
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-slate-500 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="ml-1 text-slate-400">terminal — bash</span>
                </div>
                <span className="text-git-400 group-hover:underline">Click to test live ➔</span>
              </div>

              <div className="space-y-1 text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="text-git-400 font-bold">➜</span>
                  <span className="text-cyan-400">~/repo</span>
                  <span className="text-white font-semibold">git commit -m "feat: user login"</span>
                </div>
                <div className="text-emerald-400 pl-4">[main 7f201bc] feat: user login</div>
                <div className="text-slate-400 pl-4">2 files changed, 45 insertions(+)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

