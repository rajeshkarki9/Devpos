import React from 'react';
import { GitBranch, Heart, Sparkles, BookOpen, Terminal, ShieldAlert } from 'lucide-react';
import GitHubIcon from '../common/GitHubIcon';

export default function Footer({ onNavigate }) {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 transition-colors mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-git-500 flex items-center justify-center text-white shadow-xs">
                <GitBranch className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                Git<span className="text-git-500">Mastery</span>
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              The premier interactive learning platform engineered for beginners and growing engineers. Master Git and GitHub with visual animations, live simulated terminal sandbox, and structured curriculum.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                <Sparkles className="w-3.5 h-3.5 text-git-500" />
                Zero Setup Required
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                <Terminal className="w-3.5 h-3.5 text-blue-500" />
                Safe Sandboxed CLI
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Learning Sections
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button onClick={() => onNavigate('commands')} className="hover:text-git-500 transition">
                  Git Command Explorer
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('animations')} className="hover:text-git-500 transition">
                  Animated Workflow Demos
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terminal')} className="hover:text-git-500 transition">
                  Interactive Terminal Simulator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('visualizer')} className="hover:text-git-500 transition">
                  4-Stage Workflow Visualizer
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('github')} className="hover:text-git-500 transition">
                  GitHub Collaboration Guides
                </button>
              </li>
            </ul>
          </div>

          {/* Emergency & References */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Developer Tools
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button onClick={() => onNavigate('emergency')} className="hover:text-rose-500 transition flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
                  Emergency Panic Fixes
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('roadmap')} className="hover:text-git-500 transition flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                  15-Lesson Course Roadmap
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('cheatsheet')} className="hover:text-git-500 transition">
                  Printable Cheat Sheet
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('glossary')} className="hover:text-git-500 transition">
                  Git Glossary (A-Z)
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} GitMastery Platform. Built with modern React, Tailwind CSS & Framer Motion.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-500">
              Press <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 border rounded font-mono text-[10px]">Ctrl+K</kbd> to search anytime
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
