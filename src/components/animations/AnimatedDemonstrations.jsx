import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  Folder, 
  FileCode, 
  Database, 
  GitBranch, 
  GitCommit, 
  GitMerge, 
  Cloud, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Info
} from 'lucide-react';

const DEMO_COMMANDS = [
  {
    id: 'git-init',
    title: 'git init',
    commandText: 'git init',
    summary: 'Turn an ordinary directory into a Git repository by creating the hidden .git directory.',
    steps: [
      {
        step: 0,
        title: 'Ordinary Project Folder',
        description: 'Before running git init, your project folder contains normal files (index.html, styles.css) but has NO version control tracking.',
        state: 'uninitialized'
      },
      {
        step: 1,
        title: 'Running "git init"',
        description: 'Git analyzes the directory and allocates internal data structures.',
        state: 'initializing'
      },
      {
        step: 2,
        title: '.git Repository Created',
        description: 'A hidden directory named ".git" is created containing the internal object database, refs, HEAD pointer, and config. Your repository is now live!',
        state: 'initialized'
      }
    ]
  },
  {
    id: 'git-add',
    title: 'git add .',
    commandText: 'git add .',
    summary: 'Move modified and newly created files from Working Directory into the Staging Area (Index).',
    steps: [
      {
        step: 0,
        title: 'Working Directory Changes',
        description: 'You modified index.html and created style.css. They currently reside ONLY in your working directory and are untracked/unstaged.',
        state: 'unstaged'
      },
      {
        step: 1,
        title: 'Staging in Progress',
        description: 'Running "git add ." stages all file changes, computing SHA-1 hashes for their contents and writing blobs into the index.',
        state: 'staging'
      },
      {
        step: 2,
        title: 'Staged & Ready to Commit',
        description: 'All selected files now reside safely in the Staging Area (Index). They will be permanently locked into the next commit snapshot.',
        state: 'staged'
      }
    ]
  },
  {
    id: 'git-commit',
    title: 'git commit -m "feat: initial release"',
    commandText: 'git commit -m "feat: initial release"',
    summary: 'Package staged files into a permanent snapshot node on the Git timeline graph.',
    steps: [
      {
        step: 0,
        title: 'Staged Changes Ready',
        description: 'Your staging area contains the exact prepared changes waiting to be snapshotted.',
        state: 'ready'
      },
      {
        step: 1,
        title: 'Snapshot & SHA-1 Generation',
        description: 'Git bundles the staging area tree, signs it with your author identity, timestamp, and commit message, producing commit hash "7f201bc".',
        state: 'committing'
      },
      {
        step: 2,
        title: 'Commit Node Added to Graph',
        description: 'A new immutable commit node is appended to the branch timeline. HEAD and main advance forward to point to this new commit.',
        state: 'committed'
      }
    ]
  },
  {
    id: 'git-branch',
    title: 'git branch feature-login',
    commandText: 'git branch feature-login',
    summary: 'Create a new branch pointer pointing at the current commit without affecting main.',
    steps: [
      {
        step: 0,
        title: 'Single Main Branch',
        description: 'You are currently working on commit C1 on the "main" branch.',
        state: 'single-branch'
      },
      {
        step: 1,
        title: 'Creating Branch Pointer',
        description: 'Running "git branch feature-login" writes a new 41-byte pointer file pointing at commit C1.',
        state: 'branching'
      },
      {
        step: 2,
        title: 'Two Independent Branches',
        description: 'Both "main" and "feature-login" point to C1. You can now switch to feature-login and work without disturbing main.',
        state: 'branched'
      }
    ]
  },
  {
    id: 'git-merge',
    title: 'git merge feature-login',
    commandText: 'git merge feature-login',
    summary: 'Integrate the commits from feature-login back into the main branch.',
    steps: [
      {
        step: 0,
        title: 'Divergent Branches',
        description: 'Main has commit C2, while feature-login has commit C3. They have diverged since their common ancestor C1.',
        state: 'diverged'
      },
      {
        step: 1,
        title: '3-Way Merge Algorithm',
        description: 'Git analyzes common ancestor C1 and integrates changes from both C2 and C3 automatically.',
        state: 'merging'
      },
      {
        step: 2,
        title: 'Merge Commit Created (C4)',
        description: 'A new 3-way merge commit (C4) is created on main having both C2 and C3 as parent commits. All features are united!',
        state: 'merged'
      }
    ]
  },
  {
    id: 'git-push',
    title: 'git push origin main',
    commandText: 'git push origin main',
    summary: 'Transfer local commits up to the remote GitHub cloud repository.',
    steps: [
      {
        step: 0,
        title: 'Local Commits Ahead',
        description: 'Your local repository has 2 new commits (C2, C3) that do not exist yet on the remote GitHub repository.',
        state: 'local-ahead'
      },
      {
        step: 1,
        title: 'Uploading to GitHub',
        description: 'Commit objects, file trees, and blobs are serialized and transmitted securely over HTTPS/SSH.',
        state: 'uploading'
      },
      {
        step: 2,
        title: 'Remote Synchronized',
        description: 'origin/main on GitHub advances to match your local main. Your team and world can now view your code!',
        state: 'pushed'
      }
    ]
  },
  {
    id: 'git-pull',
    title: 'git pull origin main',
    commandText: 'git pull origin main',
    summary: 'Fetch new commits from GitHub and merge them directly into your local working branch.',
    steps: [
      {
        step: 0,
        title: 'Teammates Pushed Updates',
        description: 'Teammates published new commits (C4, C5) on GitHub. Your local computer is currently behind.',
        state: 'remote-ahead'
      },
      {
        step: 1,
        title: 'Fetching & Downloading',
        description: 'Git contacts origin, downloads the new commit objects, and updates origin/main tracking branch.',
        state: 'downloading'
      },
      {
        step: 2,
        title: 'Merged into Working Tree',
        description: 'Incoming commits are fast-forwarded or merged into your local files. Your working directory is 100% up to date.',
        state: 'pulled'
      }
    ]
  }
];

export default function AnimatedDemonstrations({ initialCommandId }) {
  const [selectedDemoId, setSelectedDemoId] = useState(initialCommandId || 'git-init');
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const demo = DEMO_COMMANDS.find(d => d.id === selectedDemoId) || DEMO_COMMANDS[0];
  const maxStep = demo.steps.length - 1;

  // Auto-play interval
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= maxStep) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2400);
    }
    return () => clearInterval(interval);
  }, [isPlaying, maxStep]);

  const handleSelectDemo = (id) => {
    setSelectedDemoId(id);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handleNext = () => {
    if (currentStep < maxStep) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handleRun = () => {
    setCurrentStep(maxStep);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Top Demo Selector Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {DEMO_COMMANDS.map((d) => {
          const isSelected = d.id === selectedDemoId;
          return (
            <button
              key={d.id}
              onClick={() => handleSelectDemo(d.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold whitespace-nowrap transition flex items-center gap-2 border ${
                isSelected
                  ? 'bg-git-500 text-white border-git-600 shadow-md shadow-git-500/20'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-git-500/50'
              }`}
            >
              <span>{d.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Animation Stage Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl overflow-hidden transition-colors">
        {/* Stage Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-base sm:text-lg font-bold text-git-600 dark:text-git-400">
                $ {demo.commandText}
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                Step {currentStep + 1} of {demo.steps.length}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {demo.summary}
            </p>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition"
              title="Previous Step"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold border border-slate-200 dark:border-slate-700 transition"
              title={isPlaying ? 'Pause Animation' : 'Auto Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4 text-amber-500" /> : <Play className="w-4 h-4 text-emerald-500" />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>

            <button
              onClick={handleNext}
              disabled={currentStep === maxStep}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition"
              title="Next Step"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleReset}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="Reset Animation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={handleRun}
              className="px-3.5 py-2 rounded-xl bg-git-500 hover:bg-git-600 text-white text-xs font-bold transition shadow-md shadow-git-500/20 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Run Command</span>
            </button>
          </div>
        </div>

        {/* Visual Animation Viewport */}
        <div className="relative min-h-[340px] sm:min-h-[400px] flex items-center justify-center p-6 bg-slate-100/60 dark:bg-slate-950/60 overflow-hidden">
          {/* Animated Demonstration Specific Views */}
          {selectedDemoId === 'git-init' && (
            <div className="w-full max-w-lg flex flex-col items-center">
              <div className="relative w-64 h-44 bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 rounded-2xl shadow-xl flex flex-col p-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <Folder className="w-5 h-5 text-amber-500" />
                    <span className="font-semibold text-xs text-slate-800 dark:text-slate-200">my-project/</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Regular Folder</span>
                </div>

                <div className="flex-1 flex flex-col justify-center space-y-2 py-2">
                  <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <FileCode className="w-4 h-4 text-blue-500" />
                    <span>index.html</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <FileCode className="w-4 h-4 text-emerald-500" />
                    <span>styles.css</span>
                  </div>
                </div>

                {/* Hidden .git folder animated entry */}
                <AnimatePresence>
                  {currentStep >= 1 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.7, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.7 }}
                      className="mt-auto p-2 rounded-xl bg-git-50 dark:bg-git-950/70 border border-git-500/60 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <Database className="w-4 h-4 text-git-500 animate-pulse" />
                        <span className="font-mono text-xs font-bold text-git-600 dark:text-git-400">.git/</span>
                      </div>
                      <span className="text-[10px] font-semibold text-git-600 dark:text-git-300 bg-git-100 dark:bg-git-900/60 px-1.5 py-0.5 rounded">
                        Repository Vault
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Git repository initialized! Tracking engine active.</span>
                </motion.div>
              )}
            </div>
          )}

          {selectedDemoId === 'git-add' && (
            <div className="w-full max-w-xl grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
              {/* Working Directory Box */}
              <div className="bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 rounded-2xl p-4 shadow-lg">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800 mb-3">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Working Directory</span>
                  <span className="text-[10px] text-slate-400">Hard Drive</span>
                </div>
                <div className="space-y-2">
                  <div className={`p-2 rounded-lg border text-xs flex items-center justify-between transition ${
                    currentStep === 0 ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 border-transparent'
                  }`}>
                    <span className="font-mono">index.html</span>
                    <span className="text-[10px] uppercase font-bold">{currentStep === 0 ? 'Modified' : 'Clean'}</span>
                  </div>
                  <div className={`p-2 rounded-lg border text-xs flex items-center justify-between transition ${
                    currentStep === 0 ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 border-transparent'
                  }`}>
                    <span className="font-mono">style.css</span>
                    <span className="text-[10px] uppercase font-bold">{currentStep === 0 ? 'Untracked' : 'Clean'}</span>
                  </div>
                </div>
              </div>

              {/* Staging Area Box */}
              <div className="bg-white dark:bg-slate-900 border-2 border-dashed border-git-500 rounded-2xl p-4 shadow-lg relative">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800 mb-3">
                  <span className="text-xs font-bold text-git-600 dark:text-git-400">Staging Area (Index)</span>
                  <span className="text-[10px] text-git-500">Ready to Commit</span>
                </div>
                {currentStep === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-400">
                    Empty staging area
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-2"
                  >
                    <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs flex items-center justify-between font-mono">
                      <span>index.html</span>
                      <span className="text-[10px] uppercase font-bold">Staged ✓</span>
                    </div>
                    <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs flex items-center justify-between font-mono">
                      <span>style.css</span>
                      <span className="text-[10px] uppercase font-bold">Staged ✓</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          )}

          {selectedDemoId === 'git-commit' && (
            <div className="w-full max-w-xl flex flex-col items-center">
              <div className="w-full flex items-center justify-center gap-6">
                {/* Previous Commit Node */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 border-2 border-slate-400 dark:border-slate-600 flex items-center justify-center font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
                    1c90a
                  </div>
                  <span className="text-[11px] text-slate-400 mt-2">Init</span>
                </div>

                {/* Connecting Line */}
                <div className="h-1 flex-1 bg-slate-300 dark:bg-slate-700 relative">
                  {currentStep >= 1 && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      className="absolute inset-0 bg-git-500"
                    />
                  )}
                </div>

                {/* New Commit Node */}
                <div className="flex flex-col items-center">
                  <AnimatePresence>
                    {currentStep >= 1 ? (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-14 h-14 rounded-full bg-git-500 border-4 border-white dark:border-slate-900 shadow-glow-git flex items-center justify-center font-mono text-xs font-bold text-white"
                      >
                        7f201
                      </motion.div>
                    ) : (
                      <div className="w-14 h-14 rounded-full border-2 border-dashed border-slate-400 dark:border-slate-700 flex items-center justify-center text-xs text-slate-400">
                        ?
                      </div>
                    )}
                  </AnimatePresence>
                  <span className="text-[11px] font-semibold text-git-600 dark:text-git-400 mt-2">
                    {currentStep >= 1 ? 'HEAD -> main' : 'Next Commit'}
                  </span>
                </div>
              </div>

              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md text-xs text-center max-w-md"
                >
                  <span className="font-semibold text-slate-800 dark:text-slate-100">Commit Message:</span>
                  <p className="font-mono text-git-500 font-bold mt-0.5">"feat: initial release"</p>
                  <p className="text-[11px] text-slate-400 mt-1">Snapshot permanently sealed into repository history.</p>
                </motion.div>
              )}
            </div>
          )}

          {selectedDemoId === 'git-branch' && (
            <div className="w-full max-w-lg flex flex-col items-center">
              <div className="relative w-full h-48 flex items-center justify-center">
                {/* SVG Graph */}
                <svg className="w-full h-full" viewBox="0 0 400 160">
                  {/* Base commit line */}
                  <line x1="60" y1="80" x2="180" y2="80" stroke="#94a3b8" strokeWidth="4" />
                  <circle cx="60" cy="80" r="14" fill="#64748b" />
                  <text x="60" y="84" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">C1</text>

                  <circle cx="180" cy="80" r="16" fill="#f05032" />
                  <text x="180" y="84" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">C2</text>

                  {/* Main Branch Label */}
                  <rect x="150" y="25" width="60" height="22" rx="6" fill="#1e293b" />
                  <text x="180" y="40" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">main</text>
                  <line x1="180" y1="47" x2="180" y2="64" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />

                  {/* Feature Branch Pointer */}
                  {currentStep >= 1 && (
                    <g>
                      <rect x="130" y="115" width="100" height="22" rx="6" fill="#f05032" />
                      <text x="180" y="130" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">feature-login</text>
                      <line x1="180" y1="96" x2="180" y2="115" stroke="#f05032" strokeWidth="2" strokeDasharray="3 3" />
                    </g>
                  )}
                </svg>
              </div>

              <div className="mt-2 text-center text-xs text-slate-500">
                {currentStep < 2 ? (
                  <span>Creating the lightweight pointer "feature-login" at commit C2.</span>
                ) : (
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    Both branches currently point to C2. You can switch to feature-login safely!
                  </span>
                )}
              </div>
            </div>
          )}

          {selectedDemoId === 'git-merge' && (
            <div className="w-full max-w-lg flex flex-col items-center">
              <svg className="w-full h-48" viewBox="0 0 420 180">
                {/* Main Branch Line */}
                <line x1="50" y1="70" x2="160" y2="70" stroke="#94a3b8" strokeWidth="4" />
                <circle cx="50" cy="70" r="14" fill="#64748b" />
                <text x="50" y="74" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">C1</text>

                {/* Main commit C2 */}
                <circle cx="160" cy="70" r="14" fill="#38bdf8" />
                <text x="160" y="74" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">C2</text>

                {/* Feature branch curve */}
                <path d="M 50 70 Q 100 130 160 130" stroke="#f05032" strokeWidth="3" fill="none" />
                <circle cx="160" cy="130" r="14" fill="#f05032" />
                <text x="160" y="134" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">C3</text>

                {/* Merge commit C4 */}
                {currentStep >= 1 && (
                  <g>
                    <line x1="160" y1="70" x2="280" y2="70" stroke="#94a3b8" strokeWidth="4" />
                    <path d="M 160 130 Q 220 130 280 70" stroke="#f05032" strokeWidth="3" fill="none" strokeDasharray={currentStep === 1 ? '4 4' : 'none'} />
                    <circle cx="280" cy="70" r="16" fill="#10b981" />
                    <text x="280" y="74" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">C4</text>

                    {/* Main Label on C4 */}
                    <rect x="250" y="20" width="60" height="22" rx="6" fill="#1e293b" />
                    <text x="280" y="35" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">main</text>
                  </g>
                )}
              </svg>

              <div className="text-center text-xs text-slate-500 mt-2">
                {currentStep === 2 ? (
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    Merge complete! C4 combines parents C2 (main) and C3 (feature-login).
                  </span>
                ) : (
                  <span>3-way merge uniting divergent branches.</span>
                )}
              </div>
            </div>
          )}

          {selectedDemoId === 'git-push' && (
            <div className="w-full max-w-xl flex items-center justify-between gap-6 px-4">
              {/* Local Workstation */}
              <div className="flex-1 bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 rounded-2xl p-4 shadow-md text-center">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 mx-auto flex items-center justify-center text-slate-700 dark:text-slate-300 mb-2">
                  <Database className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Local Laptop</h4>
                <p className="text-[11px] text-git-500 font-mono mt-1 font-semibold">Commits: C1, C2, C3</p>
              </div>

              {/* Transfer Pipe Animation */}
              <div className="relative w-36 h-12 flex items-center justify-center">
                <div className="w-full h-1 bg-slate-300 dark:bg-slate-700" />
                {currentStep >= 1 && (
                  <motion.div
                    initial={{ x: -40, opacity: 0 }}
                    animate={{ x: 40, opacity: 1 }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                    className="absolute px-2 py-1 rounded bg-git-500 text-white text-[10px] font-mono font-bold shadow-md"
                  >
                    C2, C3 ➔
                  </motion.div>
                )}
              </div>

              {/* GitHub Remote */}
              <div className="flex-1 bg-white dark:bg-slate-900 border-2 border-git-500/60 rounded-2xl p-4 shadow-md text-center">
                <div className="w-10 h-10 rounded-full bg-git-50 dark:bg-git-950/60 mx-auto flex items-center justify-center text-git-500 mb-2">
                  <Cloud className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">GitHub Cloud</h4>
                <p className="text-[11px] text-slate-500 font-mono mt-1 font-semibold">
                  {currentStep === 2 ? 'Commits: C1, C2, C3 ✓' : 'Commits: C1 only'}
                </p>
              </div>
            </div>
          )}

          {selectedDemoId === 'git-pull' && (
            <div className="w-full max-w-xl flex items-center justify-between gap-6 px-4">
              {/* GitHub Remote */}
              <div className="flex-1 bg-white dark:bg-slate-900 border-2 border-git-500/60 rounded-2xl p-4 shadow-md text-center">
                <div className="w-10 h-10 rounded-full bg-git-50 dark:bg-git-950/60 mx-auto flex items-center justify-center text-git-500 mb-2">
                  <Cloud className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">GitHub Cloud</h4>
                <p className="text-[11px] text-git-500 font-mono mt-1 font-semibold">Latest Commits: C4, C5</p>
              </div>

              {/* Transfer Pipe Animation (Right to Left) */}
              <div className="relative w-36 h-12 flex items-center justify-center">
                <div className="w-full h-1 bg-slate-300 dark:bg-slate-700" />
                {currentStep >= 1 && (
                  <motion.div
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: -40, opacity: 1 }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                    className="absolute px-2 py-1 rounded bg-blue-500 text-white text-[10px] font-mono font-bold shadow-md"
                  >
                    ⬅ C4, C5
                  </motion.div>
                )}
              </div>

              {/* Local Laptop */}
              <div className="flex-1 bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 rounded-2xl p-4 shadow-md text-center">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 mx-auto flex items-center justify-center text-slate-700 dark:text-slate-300 mb-2">
                  <Database className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Local Laptop</h4>
                <p className="text-[11px] text-slate-500 font-mono mt-1 font-semibold">
                  {currentStep === 2 ? 'Merged to C5 ✓' : 'At C3 (Behind)'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Step-by-Step Explanation Banner */}
        <div className="p-5 sm:p-6 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-git-50 dark:bg-git-950/60 text-git-600 dark:text-git-400 shrink-0 mt-0.5">
              <Info className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {demo.steps[currentStep].title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                {demo.steps[currentStep].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

