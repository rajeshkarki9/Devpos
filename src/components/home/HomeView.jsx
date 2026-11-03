import React from 'react';
import { 
  GitBranch, 
  Terminal, 
  Play, 
  Workflow, 
  Award, 
  ShieldAlert, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  Layers, 
  FolderPlus, 
  GitMerge, 
  FileCode,
  Sparkles
} from 'lucide-react';
import GitHubIcon from '../common/GitHubIcon';
import HeroSection from './HeroSection';
import { useLearning } from '../../context/LearningContext';
import { LESSONS_DATA } from '../../data/lessonsData';
import { COMMANDS_DATA } from '../../data/commandsData';

export default function HomeView({ onNavigate }) {
  const { completedLessons } = useLearning();

  const totalLessons = LESSONS_DATA.length;
  const progressPercent = Math.round((completedLessons.length / totalLessons) * 100);

  const categories = [
    { id: 'commands', title: 'Git Fundamentals', desc: 'Core concept of snapshots, blobs, trees, and commits.', count: '5 Lessons', icon: Layers, color: 'text-git-500' },
    { id: 'commands', title: 'Git Installation & Setup', desc: 'Configuring user.name, user.email, and preferred editor.', count: '3 Lessons', icon: FolderPlus, color: 'text-amber-500' },
    { id: 'commands', title: 'Basic Git Commands', desc: 'Status, staging, committing, and inspecting logs.', count: '10 Commands', icon: Terminal, color: 'text-emerald-500' },
    { id: 'animations', title: 'Branching & Merging', desc: 'Isolated lines of work, pointer mechanics, and 3-way merges.', count: 'Interactive Demos', icon: GitBranch, color: 'text-blue-500' },
    { id: 'github', title: 'GitHub Fundamentals', desc: 'Account setup, SSH keys, public vs private repositories.', count: 'Cloud Guide', icon: GitHubIcon, color: 'text-purple-500' },
    { id: 'github', title: 'Collaboration & Pull Requests', desc: 'Code reviews, branch protections, and PR workflows.', count: 'PR Simulator', icon: GitMerge, color: 'text-rose-500' },
    { id: 'commands', title: 'Advanced Git Commands', desc: 'Rebasing, cherry-picking, stashing, and bisecting.', count: '8 Commands', icon: Sparkles, color: 'text-indigo-500' },
    { id: 'visualizer', title: 'Real-World Workflows', desc: 'GitHub Flow, Trunk-based dev, and release pipelines.', count: 'Visualizer', icon: Workflow, color: 'text-cyan-500' }
  ];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. Hero Section */}
      <HeroSection
        onStartLearning={() => onNavigate('roadmap')}
        onExploreCommands={() => onNavigate('commands')}
        onOpenTerminal={() => onNavigate('terminal')}
        onOpenDemos={() => onNavigate('animations')}
      />

      {/* 2. Learning Overview (8 Categories) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-git-600 dark:text-git-400">
            Structured Learning Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Everything You Need to Master Git & GitHub
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            From absolute zero to enterprise-grade Git fluency across 8 comprehensive domains.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                onClick={() => onNavigate(cat.id)}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs hover:shadow-lg hover:border-git-500/40 transition group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 ${cat.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400">
                      {cat.count}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-git-600 dark:group-hover:text-git-400 transition">
                    {cat.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400 group-hover:text-git-500 font-semibold">
                  <span>Explore Topic</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Learning Progress Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-tr from-slate-900 via-slate-900 to-slate-800 border border-slate-800 rounded-3xl p-6 sm:p-10 text-white shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-git-500/20 text-git-400 border border-git-500/30 text-xs font-semibold">
                <Award className="w-3.5 h-3.5" />
                <span>Your Active Progress</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Beginner to Advanced Learning Roadmap
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed max-w-lg">
                Complete lessons, verify your knowledge with interactive quizzes, and earn your mastery badge. You have completed {completedLessons.length} out of {totalLessons} curriculum units.
              </p>

              {/* Progress Bar */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Total Completion</span>
                  <span className="text-git-400 font-bold">{progressPercent}%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-git-500 to-amber-500 transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('roadmap')}
                  className="px-5 py-2.5 rounded-xl bg-git-500 hover:bg-git-600 text-white text-xs font-bold transition shadow-md shadow-git-500/25 flex items-center gap-2"
                >
                  <span>Continue Roadmap</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <span className="text-xs text-slate-400">Estimated remaining time: ~1.5 hours</span>
              </div>
            </div>

            {/* Quick Roadmap Milestones Cards */}
            <div className="lg:col-span-5 space-y-3">
              {[
                { level: 'Level 1: Beginner', desc: 'Git Init, Staging & Committing', count: '5 Lessons', done: completedLessons.length >= 5 },
                { level: 'Level 2: Intermediate', desc: 'Branches, Merges, Remotes & PRs', count: '5 Lessons', done: completedLessons.length >= 10 },
                { level: 'Level 3: Advanced', desc: 'Rebasing, Stashing & Emergency Fixes', count: '5 Lessons', done: completedLessons.length === 15 }
              ].map((m, idx) => (
                <div
                  key={idx}
                  onClick={() => onNavigate('roadmap')}
                  className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between text-xs cursor-pointer hover:bg-slate-800 transition"
                >
                  <div>
                    <h4 className="font-bold text-white">{m.level}</h4>
                    <p className="text-[11px] text-slate-400">{m.desc}</p>
                  </div>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                    m.done ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-300'
                  }`}>
                    {m.done ? 'Completed ✓' : m.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Features Teaser Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-git-600 dark:text-git-400">
            Interactive Tooling
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Learn by Doing, Not Just Reading
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Visual Demos */}
          <div
            onClick={() => onNavigate('animations')}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-git-500/40 hover:shadow-lg transition cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-git-50 dark:bg-git-950/60 flex items-center justify-center text-git-500">
                <Play className="w-5 h-5 fill-current" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Animated Command Demonstrations
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Watch `.git` folder initialization, files moving into the staging area, commit nodes spawning, and branches merging in real time.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1 text-xs font-bold text-git-500">
              <span>Try Animations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: Safe Terminal */}
          <div
            onClick={() => onNavigate('terminal')}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-git-500/40 hover:shadow-lg transition cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-500">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Safe Simulated Terminal Sandbox
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Experiment with real Git state (commits, branches, unstaged changes) without touching your operating system's files.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1 text-xs font-bold text-blue-500">
              <span>Open Terminal Simulator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: 4-Zone Workflow */}
          <div
            onClick={() => onNavigate('visualizer')}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-git-500/40 hover:shadow-lg transition cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 dark:bg-purple-950/60 flex items-center justify-center text-purple-500">
                <Workflow className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                4-Zone Architecture Visualizer
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Working Directory ➔ Staging Area ➔ Local Repo ➔ Remote GitHub. Watch packets flow across zones as you trigger commands.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1 text-xs font-bold text-purple-500">
              <span>View Workflow Visualizer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
