import React, { useState } from 'react';
import { 
  FileText, 
  Printer, 
  Copy, 
  Check, 
  Search, 
  Terminal, 
  Sparkles 
} from 'lucide-react';
import { CHEAT_SHEET } from '../../data/cheatSheetData';
import { useLearning } from '../../context/LearningContext';

export default function CheatSheet() {
  const { showToast } = useLearning();
  const [copiedCmd, setCopiedCmd] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCopy = (cmd) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    showToast(`Copied "${cmd}" to clipboard!`);
    setTimeout(() => setCopiedCmd(null), 1800);
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredCategories = CHEAT_SHEET.map(cat => ({
    ...cat,
    commands: cat.commands.filter(c => 
      c.cmd.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.desc.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.commands.length > 0);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1.5 rounded-lg bg-git-50 dark:bg-git-950/60 text-git-600 dark:text-git-400">
              <FileText className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-git-600 dark:text-git-400">
              Quick Reference
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Git Command Cheat Sheet
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Clean, categorized cheat sheet of everyday Git commands. Bookmark this page or print it out as a desk reference.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition shadow-xs shrink-0"
        >
          <Printer className="w-4 h-4" />
          <span>Print Cheat Sheet</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter cheat sheet by command or action..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-git-500 transition shadow-xs"
        />
      </div>

      {/* Cheat Sheet Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCategories.map((cat, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs flex flex-col justify-between"
          >
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-3 mb-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span>{cat.category}</span>
                <span className="text-[10px] font-mono text-slate-400">{cat.commands.length} commands</span>
              </h3>

              <div className="space-y-3">
                {cat.commands.map((c, cIdx) => (
                  <div
                    key={cIdx}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-0.5 overflow-hidden">
                      <code className="text-git-600 dark:text-git-400 font-mono font-bold truncate block">
                        $ {c.cmd}
                      </code>
                      <span className="text-slate-500 dark:text-slate-400 text-[11px] block">
                        {c.desc}
                      </span>
                    </div>

                    <button
                      onClick={() => handleCopy(c.cmd)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition shrink-0"
                      title="Copy command"
                    >
                      {copiedCmd === c.cmd ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

