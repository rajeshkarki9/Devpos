import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Copy, 
  Check, 
  Bookmark, 
  Terminal, 
  Play, 
  AlertCircle, 
  Lightbulb, 
  CheckCircle2, 
  Sliders,
  HelpCircle
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

export default function CommandDetailModal({ command, onClose, onTryInTerminal, onTriggerDemo }) {
  const { isBookmarked, toggleBookmark, showToast } = useLearning();
  const [copied, setCopied] = React.useState(false);

  if (!command) return null;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast(`Copied "${text}" to clipboard!`);
    setTimeout(() => setCopied(false), 2000);
  };

  const bookmarked = isBookmarked(command.id);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4 bg-slate-50/50 dark:bg-slate-900/50">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-git-50 dark:bg-git-950/70 text-git-600 dark:text-git-400 border border-git-200 dark:border-git-800">
                  {command.category}
                </span>
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                  command.level === 'Beginner'
                    ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
                    : command.level === 'Intermediate'
                    ? 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400'
                    : 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400'
                }`}>
                  {command.level}
                </span>
              </div>
              <h2 className="text-2xl font-mono font-bold text-slate-900 dark:text-white">
                {command.name}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {command.simpleExplanation}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => toggleBookmark(command.id)}
                className={`p-2.5 rounded-xl border transition ${
                  bookmarked
                    ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                    : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                title={bookmarked ? 'Saved to bookmarks' : 'Add to bookmarks'}
              >
                <Bookmark className="w-4 h-4 fill-current" />
              </button>
              <button
                onClick={onClose}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm">
            {/* Syntax Code Box */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">
                Command Syntax
              </label>
              <div className="flex items-center justify-between p-3.5 bg-slate-900 text-git-400 font-mono rounded-xl border border-slate-800 shadow-inner">
                <span className="text-sm">$ {command.syntax}</span>
                <button
                  onClick={() => handleCopy(command.syntax)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                  title="Copy syntax"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* In Plain English Box */}
            <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60">
              <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold mb-1 text-xs uppercase tracking-wider">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>In Plain English (For Beginners)</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                {command.beginnerFriendly}
              </p>
            </div>

            {/* What & Why Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  What Does It Do?
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {command.whatItDoes}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-blue-500" />
                  Why & When to Use It
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  <strong>Why:</strong> {command.whyDevelopersUseIt}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                  <strong>When:</strong> {command.whenToUse}
                </p>
              </div>
            </div>

            {/* Parameters Table */}
            {command.parameters && command.parameters.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-git-500" />
                  Options & Flags
                </h4>
                <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-500">
                      <tr>
                        <th className="p-2.5 font-semibold">Flag / Parameter</th>
                        <th className="p-2.5 font-semibold">Description</th>
                        <th className="p-2.5 font-semibold">Required</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono">
                      {command.parameters.map((p, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                          <td className="p-2.5 font-bold text-git-600 dark:text-git-400">{p.flag}</td>
                          <td className="p-2.5 font-sans text-slate-600 dark:text-slate-300">{p.description}</td>
                          <td className="p-2.5 font-sans">
                            {p.required ? (
                              <span className="text-[10px] font-bold text-rose-500 uppercase">Yes</span>
                            ) : (
                              <span className="text-[10px] text-slate-400 uppercase">Optional</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Realistic Terminal Output */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">
                Realistic Terminal Execution & Expected Output
              </label>
              <div className="p-4 rounded-2xl bg-[#0d1117] border border-slate-800 text-xs font-mono text-slate-200 overflow-x-auto">
                <div className="flex items-center gap-2 pb-2 mb-2 border-b border-slate-800 text-slate-500">
                  <span className="text-rose-400">●</span>
                  <span className="text-amber-400">●</span>
                  <span className="text-emerald-400">●</span>
                  <span className="text-[11px] ml-2 font-sans">Terminal Output Example</span>
                </div>
                <div className="text-git-400 font-semibold mb-2">$ {command.example}</div>
                <pre className="whitespace-pre-wrap text-slate-300 leading-relaxed font-mono">
                  {command.expectedOutput}
                </pre>
              </div>
            </div>

            {/* Common Mistakes */}
            {command.commonMistakes && command.commonMistakes.length > 0 && (
              <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60">
                <div className="flex items-center gap-2 text-rose-700 dark:text-rose-300 font-bold mb-2 text-xs uppercase tracking-wider">
                  <AlertCircle className="w-4 h-4 text-rose-500" />
                  <span>Common Beginner Mistakes to Avoid</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 list-disc list-inside">
                  {command.commonMistakes.map((mistake, idx) => (
                    <li key={idx} className="leading-relaxed">{mistake}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Related:</span>
              {command.relatedCommands?.map((rc, idx) => (
                <span key={idx} className="font-mono text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                  {rc}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {command.hasDemo && (
                <button
                  onClick={() => {
                    onClose();
                    if (onTriggerDemo) onTriggerDemo(command.id);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <Play className="w-3.5 h-3.5 text-git-500" />
                  <span>View Animation</span>
                </button>
              )}

              <button
                onClick={() => {
                  onClose();
                  if (onTryInTerminal) onTryInTerminal(command.name);
                }}
                className="px-4 py-2 rounded-xl bg-git-500 hover:bg-git-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-git-500/20 transition"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Try in Sandbox Terminal</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

