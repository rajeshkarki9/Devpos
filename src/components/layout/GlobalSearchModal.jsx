import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Terminal, BookOpen, AlertTriangle, HelpCircle, ArrowRight, CornerDownLeft } from 'lucide-react';
import { COMMANDS_DATA } from '../../data/commandsData';
import { LESSONS_DATA } from '../../data/lessonsData';
import { COMMON_ERRORS } from '../../data/commonErrorsData';
import { GLOSSARY_TERMS } from '../../data/glossaryData';

export default function GlobalSearchModal({ isOpen, onClose, onSelectCommand, onNavigateSection }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // open modal
          document.dispatchEvent(new CustomEvent('open-search-modal'));
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  // Filter commands
  const matchingCommands = trimmed
    ? COMMANDS_DATA.filter(
        c =>
          c.name.toLowerCase().includes(trimmed) ||
          c.syntax.toLowerCase().includes(trimmed) ||
          c.simpleExplanation.toLowerCase().includes(trimmed)
      ).slice(0, 5)
    : COMMANDS_DATA.slice(0, 4);

  // Filter lessons
  const matchingLessons = trimmed
    ? LESSONS_DATA.filter(
        l =>
          l.title.toLowerCase().includes(trimmed) ||
          l.summary.toLowerCase().includes(trimmed)
      ).slice(0, 3)
    : [];

  // Filter errors
  const matchingErrors = trimmed
    ? COMMON_ERRORS.filter(
        err =>
          err.title.toLowerCase().includes(trimmed) ||
          err.scenario.toLowerCase().includes(trimmed)
      ).slice(0, 2)
    : [];

  // Filter glossary
  const matchingGlossary = trimmed
    ? GLOSSARY_TERMS.filter(
        g =>
          g.term.toLowerCase().includes(trimmed) ||
          g.definition.toLowerCase().includes(trimmed)
      ).slice(0, 3)
    : [];

  const handleCommandClick = (cmd) => {
    onClose();
    if (onSelectCommand) onSelectCommand(cmd);
    if (onNavigateSection) onNavigateSection('commands');
  };

  const handleLessonSelect = (lessonId) => {
    onClose();
    if (onNavigateSection) onNavigateSection('roadmap', { lessonId });
  };

  const handleSectionSelect = (section) => {
    onClose();
    if (onNavigateSection) onNavigateSection(section);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-10"
        >
          {/* Search Header */}
          <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
            <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Git commands, lessons, errors, concepts (e.g., commit, merge, revert)..."
              className="w-full bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none text-base"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 mr-2"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
              ESC
            </kbd>
          </div>

          {/* Results Container */}
          <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
            {/* Commands Section */}
            {matchingCommands.length > 0 && (
              <div>
                <div className="flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  <Terminal className="w-3.5 h-3.5 text-git-500" />
                  <span>Git Commands</span>
                </div>
                <div className="mt-1 space-y-1">
                  {matchingCommands.map((cmd) => (
                    <button
                      key={cmd.id}
                      onClick={() => handleCommandClick(cmd)}
                      className="w-full flex items-center justify-between p-3 rounded-xl text-left hover:bg-slate-50 dark:hover:bg-slate-800/70 border border-transparent hover:border-slate-200 dark:hover:border-slate-700/60 transition group"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-git-600 dark:group-hover:text-git-400">
                            {cmd.name}
                          </span>
                          <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                            {cmd.level}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                          {cmd.simpleExplanation}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-git-500 shrink-0 ml-3 transition" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Lessons Section */}
            {matchingLessons.length > 0 && (
              <div>
                <div className="flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                  <span>Interactive Lessons</span>
                </div>
                <div className="mt-1 space-y-1">
                  {matchingLessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      onClick={() => handleLessonSelect(lesson.id)}
                      className="w-full flex items-center justify-between p-3 rounded-xl text-left hover:bg-slate-50 dark:hover:bg-slate-800/70 border border-transparent hover:border-slate-200 dark:hover:border-slate-700/60 transition group"
                    >
                      <div>
                        <span className="text-sm font-medium text-slate-900 dark:text-slate-100 group-hover:text-blue-500">
                          {lesson.title}
                        </span>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                          {lesson.summary}
                        </p>
                      </div>
                      <span className="text-xs text-slate-400 shrink-0 ml-3">{lesson.estimatedTime}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Common Errors Section */}
            {matchingErrors.length > 0 && (
              <div>
                <div className="flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-rose-500">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Emergency Fixes</span>
                </div>
                <div className="mt-1 space-y-1">
                  {matchingErrors.map((err) => (
                    <button
                      key={err.id}
                      onClick={() => handleSectionSelect('emergency')}
                      className="w-full flex items-center justify-between p-3 rounded-xl text-left hover:bg-slate-50 dark:hover:bg-slate-800/70 border border-transparent hover:border-slate-200 dark:hover:border-slate-700/60 transition group"
                    >
                      <div>
                        <span className="text-sm font-medium text-rose-600 dark:text-rose-400">
                          {err.title}
                        </span>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                          {err.solutionTitle}
                        </p>
                      </div>
                      <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300">
                        {err.panicLevel} Panic
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Glossary Section */}
            {matchingGlossary.length > 0 && (
              <div>
                <div className="flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                  <span>Glossary Terms</span>
                </div>
                <div className="mt-1 space-y-1">
                  {matchingGlossary.map((g) => (
                    <button
                      key={g.term}
                      onClick={() => handleSectionSelect('glossary')}
                      className="w-full flex items-center justify-between p-3 rounded-xl text-left hover:bg-slate-50 dark:hover:bg-slate-800/70 border border-transparent hover:border-slate-200 dark:hover:border-slate-700/60 transition group"
                    >
                      <div>
                        <span className="text-sm font-medium text-amber-600 dark:text-amber-400 font-mono">
                          {g.term}
                        </span>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                          {g.definition}
                        </p>
                      </div>
                      <span className="text-[10px] text-slate-400 uppercase">{g.category}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {matchingCommands.length === 0 &&
              matchingLessons.length === 0 &&
              matchingErrors.length === 0 &&
              matchingGlossary.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    No results found for "<span className="font-mono text-git-500">{query}</span>"
                  </p>
                  <p className="text-xs text-slate-400 mt-1">Try searching for status, commit, branch, push, stash, or rebase.</p>
                </div>
              )}
          </div>

          {/* Search Footer */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 dark:bg-slate-950/50 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded shadow-xs">↑↓</kbd>
                Navigate
              </span>
              <span className="flex items-center gap-1">
                <CornerDownLeft className="w-3 h-3" />
                Select
              </span>
            </div>
            <span>GitMastery Universal Explorer</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

