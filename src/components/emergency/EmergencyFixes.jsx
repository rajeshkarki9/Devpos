import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  Check, 
  Copy, 
  ChevronRight, 
  HelpCircle, 
  Flame, 
  Sparkles,
  LifeBuoy
} from 'lucide-react';
import { COMMON_ERRORS } from '../../data/commonErrorsData';
import { useLearning } from '../../context/LearningContext';

export default function EmergencyFixes() {
  const { showToast } = useLearning();
  const [copiedCmd, setCopiedCmd] = useState(null);
  const [selectedPanicLevel, setSelectedPanicLevel] = useState('all');

  const handleCopy = (cmd) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    showToast(`Copied fix command to clipboard!`);
    setTimeout(() => setCopiedCmd(null), 1800);
  };

  const filteredErrors = COMMON_ERRORS.filter(err => {
    if (selectedPanicLevel === 'all') return true;
    return err.panicLevel.toLowerCase() === selectedPanicLevel.toLowerCase();
  });

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
              <ShieldAlert className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              Emergency Panic Room
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Common Git Errors & Emergency Solutions
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Don't delete your repository and start over! Find instant step-by-step solutions for everyday Git emergencies, wrong-branch commits, detached HEAD states, and merge disasters.
          </p>
        </div>

        {/* Panic Filter */}
        <div className="flex items-center gap-1.5 shrink-0">
          {['all', 'Low', 'Medium', 'Critical'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedPanicLevel(lvl)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition ${
                selectedPanicLevel === lvl
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:text-rose-500'
              }`}
            >
              {lvl} {lvl !== 'all' && 'Panic'}
            </button>
          ))}
        </div>
      </div>

      {/* Emergency Cards Grid */}
      <div className="space-y-4">
        {filteredErrors.map((err) => {
          const isCritical = err.panicLevel === 'Critical';
          const isMedium = err.panicLevel === 'Medium';

          return (
            <div
              key={err.id}
              className={`p-6 rounded-3xl border transition shadow-xs ${
                isCritical
                  ? 'bg-white dark:bg-slate-900 border-rose-200 dark:border-rose-900/60'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
              }`}
            >
              {/* Card Top */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl shrink-0 ${
                    isCritical
                      ? 'bg-rose-100 dark:bg-rose-950/70 text-rose-600'
                      : isMedium
                      ? 'bg-amber-100 dark:bg-amber-950/70 text-amber-600'
                      : 'bg-blue-100 dark:bg-blue-950/70 text-blue-600'
                  }`}>
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    {err.title}
                  </h3>
                </div>

                <span className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full w-fit ${
                  isCritical
                    ? 'bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-300'
                    : isMedium
                    ? 'bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-300'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}>
                  {err.panicLevel} Panic
                </span>
              </div>

              {/* Scenario Description */}
              <div className="py-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                <strong className="text-slate-900 dark:text-slate-200">The Problem: </strong>
                {err.scenario}
              </div>

              {/* Step-by-Step Fix Terminal Code */}
              <div className="mt-2 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  The Safe Solution: {err.solutionTitle}
                </span>

                <div className="space-y-2">
                  {err.steps.map((st, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-[#0d1117] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <span className="text-slate-400 text-[11px] font-sans block">{st.desc}</span>
                        <code className="text-emerald-400 font-mono font-semibold block">$ {st.cmd}</code>
                      </div>

                      <button
                        onClick={() => handleCopy(st.cmd)}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition flex items-center gap-1.5 text-xs shrink-0 self-end sm:self-center"
                        title="Copy command"
                      >
                        {copiedCmd === st.cmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>Copy</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Explanation Note */}
              <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <strong className="text-slate-800 dark:text-slate-200">Why this works: </strong>
                {err.explanation}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

