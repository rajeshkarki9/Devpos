import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Terminal, 
  Bookmark, 
  Play, 
  Copy, 
  Check, 
  Filter, 
  SlidersHorizontal, 
  Sparkles, 
  X,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { COMMANDS_DATA, COMMAND_CATEGORIES } from '../../data/commandsData';
import CommandDetailModal from './CommandDetailModal';
import { useLearning } from '../../context/LearningContext';

export default function CommandExplorer({ onNavigateToTerminal, onNavigateToDemos }) {
  const { isBookmarked, toggleBookmark, showToast, bookmarkedCommands } = useLearning();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [onlyBookmarks, setOnlyBookmarks] = useState(false);
  const [selectedCommand, setSelectedCommand] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // Filter commands
  const filteredCommands = useMemo(() => {
    return COMMANDS_DATA.filter((cmd) => {
      // Category filter
      if (selectedCategory !== 'all' && cmd.category !== selectedCategory) {
        return false;
      }
      // Level filter
      if (selectedLevel !== 'all' && cmd.level !== selectedLevel) {
        return false;
      }
      // Bookmarks filter
      if (onlyBookmarks && !bookmarkedCommands.includes(cmd.id)) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = cmd.name.toLowerCase().includes(q);
        const matchesSyntax = cmd.syntax.toLowerCase().includes(q);
        const matchesDesc = cmd.simpleExplanation.toLowerCase().includes(q);
        return matchesName || matchesSyntax || matchesDesc;
      }
      return true;
    });
  }, [searchQuery, selectedCategory, selectedLevel, onlyBookmarks, bookmarkedCommands]);

  const handleCopy = (e, cmd) => {
    e.stopPropagation();
    navigator.clipboard.writeText(cmd.syntax);
    setCopiedId(cmd.id);
    showToast(`Copied "${cmd.syntax}" to clipboard!`);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleBookmarkToggle = (e, id) => {
    e.stopPropagation();
    toggleBookmark(id);
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1.5 rounded-lg bg-git-50 dark:bg-git-950/60 text-git-600 dark:text-git-400">
              <Terminal className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-git-600 dark:text-git-400">
              The Comprehensive Library
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Git Command Explorer
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Explore commonly used Git commands organized across 13 core categories. Every command features parameter tables, practical examples, realistic terminal output, and beginner explanations.
          </p>
        </div>

        {/* Counter and Bookmark Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setOnlyBookmarks(!onlyBookmarks)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition ${
              onlyBookmarks
                ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-amber-400'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${onlyBookmarks ? 'fill-current' : ''}`} />
            <span>Saved Bookmarks ({bookmarkedCommands.length})</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by command name, flag, or keyword (e.g. status, commit, branch, merge)..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-slate-900 dark:text-slate-100 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-git-500 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Difficulty Level Dropdown */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            {['all', 'Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`flex-1 sm:flex-none px-3 py-2 rounded-xl text-xs font-semibold capitalize transition ${
                  selectedLevel === lvl
                    ? 'bg-git-500 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* 13 Categories Pills Carousel */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition border ${
              selectedCategory === 'all'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700/60 hover:text-slate-900'
            }`}
          >
            All Categories ({COMMANDS_DATA.length})
          </button>
          {COMMAND_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition border ${
                  isSelected
                    ? 'bg-git-500 text-white border-git-600 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700/60 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Commands Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCommands.map((cmd) => {
          const bookmarked = isBookmarked(cmd.id);
          const isCopied = copiedId === cmd.id;

          return (
            <div
              key={cmd.id}
              onClick={() => setSelectedCommand(cmd)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 shadow-xs hover:shadow-lg hover:border-git-500/40 transition group cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Badges & Actions */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {cmd.category}
                    </span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      cmd.level === 'Beginner'
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                        : cmd.level === 'Intermediate'
                        ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                        : 'bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400'
                    }`}>
                      {cmd.level}
                    </span>
                  </div>

                  {/* Bookmark Button */}
                  <button
                    onClick={(e) => handleBookmarkToggle(e, cmd.id)}
                    className={`p-1.5 rounded-lg transition ${
                      bookmarked
                        ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/50'
                        : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                    title={bookmarked ? 'Saved to bookmarks' : 'Save bookmark'}
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Command Name */}
                <h3 className="font-mono text-base font-bold text-slate-900 dark:text-white group-hover:text-git-600 dark:group-hover:text-git-400 transition">
                  {cmd.name}
                </h3>

                {/* Plain Description */}
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {cmd.simpleExplanation}
                </p>

                {/* Code Syntax Snippet */}
                <div className="mt-4 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between font-mono text-xs text-slate-800 dark:text-slate-200">
                  <span className="truncate text-git-600 dark:text-git-400 font-semibold">$ {cmd.syntax}</span>
                  <button
                    onClick={(e) => handleCopy(e, cmd)}
                    className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-white transition ml-2 shrink-0"
                    title="Copy command"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Bottom Quick Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium flex items-center gap-1 group-hover:text-slate-600 dark:group-hover:text-slate-300">
                  <span>Explore parameters</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>

                {cmd.hasDemo && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-git-500 bg-git-50 dark:bg-git-950/60 px-2 py-0.5 rounded-full">
                    <Play className="w-3 h-3 fill-current" />
                    Demo
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredCommands.length === 0 && (
        <div className="py-16 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
          <Terminal className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            No matching commands found
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            Try adjusting your search query, clearing filters, or resetting category selection.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedLevel('all');
              setOnlyBookmarks(false);
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-git-500 text-white text-xs font-semibold shadow-xs"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Detailed Command Modal */}
      <CommandDetailModal
        command={selectedCommand}
        onClose={() => setSelectedCommand(null)}
        onTryInTerminal={(cmdName) => {
          setSelectedCommand(null);
          if (onNavigateToTerminal) onNavigateToTerminal(cmdName);
        }}
        onTriggerDemo={(demoId) => {
          setSelectedCommand(null);
          if (onNavigateToDemos) onNavigateToDemos(demoId);
        }}
      />
    </div>
  );
}

