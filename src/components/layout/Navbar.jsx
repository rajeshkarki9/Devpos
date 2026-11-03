import React, { useState } from 'react';
import { 
  GitBranch, 
  Search, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Bookmark, 
  Award, 
  Terminal, 
  Play, 
  Workflow, 
  AlertTriangle, 
  FileText,
  Compass
} from 'lucide-react';
import GitHubIcon from '../common/GitHubIcon';
import { useTheme } from '../../context/ThemeContext';
import { useLearning } from '../../context/LearningContext';
import { LESSONS_DATA } from '../../data/lessonsData';

export default function Navbar({ activeSection, onNavigate, onOpenSearch }) {
  const { theme, toggleTheme } = useTheme();
  const { completedLessons, bookmarkedCommands } = useLearning();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalLessons = LESSONS_DATA.length;
  const progressPercent = Math.round((completedLessons.length / totalLessons) * 100) || 0;

  const navItems = [
    { id: 'home', label: 'Home', icon: GitBranch },
    { id: 'commands', label: 'Commands', icon: Terminal },
    { id: 'animations', label: 'Visual Demos', icon: Play },
    { id: 'terminal', label: 'Interactive Terminal', icon: Compass },
    { id: 'visualizer', label: 'Workflow', icon: Workflow },
    { id: 'github', label: 'GitHub Guides', icon: GitHubIcon },
    { id: 'roadmap', label: 'Course', icon: Award },
    { id: 'emergency', label: 'Panic Fixes', icon: AlertTriangle },
    { id: 'cheatsheet', label: 'Cheat Sheet', icon: FileText }
  ];

  const handleNavClick = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-git-600 via-git-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-git-500/25">
              <GitBranch className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                  Git<span className="text-git-500">Mastery</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-git-50 dark:bg-git-950/60 text-git-600 dark:text-git-400 border border-git-200 dark:border-git-800">
                  Interactive
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                Zero to Advanced Developer Platform
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    isActive
                      ? 'bg-git-50 dark:bg-git-950/50 text-git-600 dark:text-git-400 border border-git-200 dark:border-git-800/80 shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-git-500' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 hover:bg-slate-200/70 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-700/60 transition"
              title="Search commands, lessons, errors (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden md:inline font-medium">Quick Search</span>
              <kbd className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-slate-500">
                ⌘K
              </kbd>
            </button>

            {/* Learning Progress Indicator */}
            <button
              onClick={() => handleNavClick('roadmap')}
              className="hidden lg:flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700/60 hover:border-git-500/40 transition"
              title="View Learning Course Progress"
            >
              <div className="w-4 h-4 rounded-full border-2 border-slate-300 dark:border-slate-600 border-t-git-500 animate-spin-none relative flex items-center justify-center">
                <div
                  className="absolute inset-0 rounded-full border-2 border-git-500"
                  style={{ clipPath: `polygon(0 0, 100% 0, 100% ${progressPercent}%, 0 ${progressPercent}%)` }}
                />
              </div>
              <span className="font-semibold text-slate-900 dark:text-white">{progressPercent}%</span>
              <span className="text-slate-400 text-[11px]">({completedLessons.length}/{totalLessons})</span>
            </button>

            {/* Bookmarks Counter */}
            <button
              onClick={() => handleNavClick('commands')}
              className="relative p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title={`${bookmarkedCommands.length} Bookmarked Commands`}
            >
              <Bookmark className="w-4 h-4" />
              {bookmarkedCommands.length > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-4 h-4 px-1 rounded-full bg-git-500 text-white text-[10px] font-bold">
                  {bookmarkedCommands.length}
                </span>
              )}
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Open mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-1 shadow-lg">
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Navigation Menu
            </span>
            <span className="text-xs font-bold text-git-500">
              Progress: {progressPercent}% ({completedLessons.length}/{totalLessons})
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? 'bg-git-500 text-white'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
