import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Folder, 
  Layers, 
  Database, 
  Cloud, 
  ArrowRight, 
  RotateCcw, 
  FileText, 
  Check, 
  Plus, 
  GitCommit, 
  GitBranch,
  Sparkles,
  Info
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

export default function WorkflowVisualizer() {
  const { showToast } = useLearning();

  // State of files across the 4 zones
  const [workingDirFiles, setWorkingDirFiles] = useState([
    { id: 'f1', name: 'App.jsx', status: 'modified' },
    { id: 'f2', name: 'Navbar.jsx', status: 'untracked' }
  ]);
  const [stagedFiles, setStagedFiles] = useState([
    { id: 'f3', name: 'index.html', status: 'staged' }
  ]);
  const [localCommits, setLocalCommits] = useState([
    { id: 'c1', sha: '1c90a14', message: 'Initial project setup' },
    { id: 'c2', sha: '4b61fa0', message: 'Setup Tailwind design system' }
  ]);
  const [remoteCommits, setRemoteCommits] = useState([
    { id: 'c1', sha: '1c90a14', message: 'Initial project setup' }
  ]);

  const [activeAction, setActiveAction] = useState(null);
  const [actionLog, setActionLog] = useState('Select an action button below to watch files travel across the 4 Git zones.');

  const handleGitAdd = () => {
    if (workingDirFiles.length === 0) {
      showToast('No modified or untracked files to stage', 'info');
      return;
    }
    setActiveAction('add');
    setActionLog('git add . -> Files moved from Working Directory into Staging Area (Index). Computed SHA-1 blobs.');
    setStagedFiles(prev => [...prev, ...workingDirFiles.map(f => ({ ...f, status: 'staged' }))]);
    setWorkingDirFiles([]);
    showToast('Files moved into Staging Area!');
  };

  const handleGitCommit = () => {
    if (stagedFiles.length === 0) {
      showToast('Staging Area is empty! Run "git add" first.', 'error');
      return;
    }
    setActiveAction('commit');
    const newSha = Math.random().toString(16).substring(2, 9);
    const newCommit = {
      id: 'c' + (localCommits.length + 1),
      sha: newSha,
      message: `feat: implement ${stagedFiles[0]?.name || 'components'}`
    };
    setActionLog(`git commit -m "..." -> Staged files sealed into snapshot commit ${newSha} in Local Repository.`);
    setLocalCommits(prev => [...prev, newCommit]);
    setStagedFiles([]);
    showToast(`Created commit ${newSha}!`);
  };

  const handleGitPush = () => {
    if (localCommits.length === remoteCommits.length) {
      showToast('Remote is already up to date with local commits!', 'info');
      return;
    }
    setActiveAction('push');
    setActionLog('git push origin main -> Transferred local commits to GitHub Cloud Remote repository.');
    setRemoteCommits([...localCommits]);
    showToast('Pushed commits to GitHub!');
  };

  const handleGitRestore = () => {
    if (workingDirFiles.length === 0) {
      showToast('Working directory is already clean', 'info');
      return;
    }
    setActiveAction('restore');
    setActionLog('git restore . -> Discarded uncommitted changes in Working Directory. Reverted to HEAD.');
    setWorkingDirFiles([]);
    showToast('Discarded working changes', 'info');
  };

  const handleGitReset = () => {
    if (localCommits.length <= 1) {
      showToast('Cannot reset initial commit', 'info');
      return;
    }
    setActiveAction('reset');
    const lastCommit = localCommits[localCommits.length - 1];
    setActionLog(`git reset --soft HEAD~1 -> Rewound commit ${lastCommit.sha}. Files returned safely to Staging Area.`);
    setLocalCommits(prev => prev.slice(0, -1));
    setStagedFiles(prev => [...prev, { id: 'f-restored', name: 'restored-feature.js', status: 'staged' }]);
    showToast('Rewound commit, preserved in staging area');
  };

  const handleModifyFile = () => {
    const randomId = 'f' + Date.now();
    const newFile = { id: randomId, name: `feature-${Math.floor(Math.random() * 100)}.js`, status: 'modified' };
    setWorkingDirFiles(prev => [...prev, newFile]);
    setActionLog('Code Editor: Developer wrote and saved code changes in Working Directory.');
    showToast('New edits made in working directory');
  };

  const handleResetWorkflow = () => {
    setWorkingDirFiles([
      { id: 'f1', name: 'App.jsx', status: 'modified' },
      { id: 'f2', name: 'Navbar.jsx', status: 'untracked' }
    ]);
    setStagedFiles([
      { id: 'f3', name: 'index.html', status: 'staged' }
    ]);
    setLocalCommits([
      { id: 'c1', sha: '1c90a14', message: 'Initial project setup' },
      { id: 'c2', sha: '4b61fa0', message: 'Setup Tailwind design system' }
    ]);
    setRemoteCommits([
      { id: 'c1', sha: '1c90a14', message: 'Initial project setup' }
    ]);
    setActionLog('Workflow reset to initial state.');
    showToast('Workflow diagram reset', 'info');
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Visualizer Title and Description */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-git-50 dark:bg-git-950/60 text-git-600 dark:text-git-400">
              <Layers className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Interactive 4-Zone Git Architecture Visualizer
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Understand how code travels from your text editor across the Staging Area, Local Repository, and GitHub Cloud.
          </p>
        </div>

        <button
          onClick={handleResetWorkflow}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Pipeline</span>
        </button>
      </div>

      {/* The 4 Architecture Zones */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
        {/* Zone 1: Working Directory */}
        <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col min-h-[300px]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Folder className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-bold text-slate-900 dark:text-white">1. Working Dir</span>
            </div>
            <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              Disk
            </span>
          </div>

          <p className="text-[11px] text-slate-400 my-2">Your actual files where you write code.</p>

          <div className="flex-1 space-y-2 mt-1">
            <AnimatePresence>
              {workingDirFiles.map((f) => (
                <motion.div
                  key={f.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className={`p-2.5 rounded-xl border text-xs flex items-center justify-between font-mono ${
                    f.status === 'modified'
                      ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300'
                      : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/60 text-amber-700 dark:text-amber-300'
                  }`}
                >
                  <span>{f.name}</span>
                  <span className="text-[9px] uppercase font-bold px-1 py-0.2 rounded bg-white dark:bg-slate-900">
                    {f.status}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
            {workingDirFiles.length === 0 && (
              <div className="py-12 text-center text-xs text-slate-400 italic">
                Working directory clean ✓
              </div>
            )}
          </div>

          <button
            onClick={handleModifyFile}
            className="mt-3 w-full py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center justify-center gap-1 transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Simulate Edit File</span>
          </button>
        </div>

        {/* Zone 2: Staging Area (Index) */}
        <div className="bg-white dark:bg-slate-900 border-2 border-dashed border-git-500/60 rounded-2xl p-4 shadow-sm flex flex-col min-h-[300px]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-git-500" />
              <span className="text-xs font-bold text-git-600 dark:text-git-400">2. Staging Area</span>
            </div>
            <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-git-50 dark:bg-git-950/60 text-git-600 dark:text-git-400">
              Index
            </span>
          </div>

          <p className="text-[11px] text-slate-400 my-2">The prep table for the next snapshot.</p>

          <div className="flex-1 space-y-2 mt-1">
            <AnimatePresence>
              {stagedFiles.map((f) => (
                <motion.div
                  key={f.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center justify-between font-mono"
                >
                  <span>{f.name}</span>
                  <span className="text-[9px] uppercase font-bold px-1 py-0.2 rounded bg-emerald-200 dark:bg-emerald-900">
                    Staged ✓
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
            {stagedFiles.length === 0 && (
              <div className="py-12 text-center text-xs text-slate-400 italic">
                Staging area empty
              </div>
            )}
          </div>
        </div>

        {/* Zone 3: Local Repository (HEAD) */}
        <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col min-h-[300px]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-bold text-slate-900 dark:text-white">3. Local Repo</span>
            </div>
            <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              .git
            </span>
          </div>

          <p className="text-[11px] text-slate-400 my-2">Permanent commit history on laptop.</p>

          <div className="flex-1 space-y-2 mt-1 overflow-y-auto max-h-[190px]">
            {localCommits.map((c, idx) => (
              <div
                key={c.id}
                className={`p-2 rounded-xl border text-xs ${
                  idx === localCommits.length - 1
                    ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-300 dark:border-blue-800 text-blue-900 dark:text-blue-200'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold">{c.sha}</span>
                  {idx === localCommits.length - 1 && (
                    <span className="text-[9px] uppercase font-bold text-git-500">{'HEAD -> main'}</span>
                  )}
                </div>
                <p className="text-[11px] truncate mt-0.5">{c.message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Zone 4: Remote Repository (GitHub) */}
        <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col min-h-[300px]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Cloud className="w-4 h-4 text-purple-500" />
              <span className="text-xs font-bold text-slate-900 dark:text-white">4. GitHub Cloud</span>
            </div>
            <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
              Origin
            </span>
          </div>

          <p className="text-[11px] text-slate-400 my-2">Cloud backup and team collaboration.</p>

          <div className="flex-1 space-y-2 mt-1 overflow-y-auto max-h-[190px]">
            {remoteCommits.map((c) => (
              <div
                key={c.id}
                className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-xs text-purple-900 dark:text-purple-200"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold">{c.sha}</span>
                  <span className="text-[9px] uppercase font-bold text-purple-500">origin/main</span>
                </div>
                <p className="text-[11px] truncate mt-0.5">{c.message}</p>
              </div>
            ))}
            {localCommits.length > remoteCommits.length && (
              <div className="p-2 rounded-xl border border-dashed border-amber-400 bg-amber-50 dark:bg-amber-950/30 text-[11px] text-amber-700 dark:text-amber-300 text-center font-medium">
                {localCommits.length - remoteCommits.length} commit(s) ahead of GitHub!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
          <Sparkles className="w-4 h-4 text-git-500" />
          <span>Execute Git Operations:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleGitAdd}
            className="px-3.5 py-2 rounded-xl bg-git-50 dark:bg-git-950/60 hover:bg-git-100 text-git-600 dark:text-git-400 border border-git-300 dark:border-git-800 text-xs font-mono font-bold transition flex items-center gap-1.5"
          >
            <span>git add .</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleGitCommit}
            className="px-3.5 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-blue-600 dark:text-blue-400 border border-blue-300 dark:border-blue-800 text-xs font-mono font-bold transition flex items-center gap-1.5"
          >
            <span>git commit -m "..."</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleGitPush}
            className="px-3.5 py-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 text-purple-600 dark:text-purple-400 border border-purple-300 dark:border-purple-800 text-xs font-mono font-bold transition flex items-center gap-1.5"
          >
            <span>git push origin main</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleGitRestore}
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-mono font-bold transition"
            title="Discard changes in working directory"
          >
            git restore .
          </button>

          <button
            onClick={handleGitReset}
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-mono font-bold transition"
            title="Undo last commit back to staging"
          >
            git reset --soft HEAD~1
          </button>
        </div>

        {/* Live Action Explanation */}
        <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
          <Info className="w-4 h-4 text-git-500 shrink-0" />
          <span>{actionLog}</span>
        </div>
      </div>
    </div>
  );
}
