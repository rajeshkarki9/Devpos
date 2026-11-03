import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Layers, 
  GitPullRequest, 
  FileText, 
  FileCode, 
  Zap, 
  Globe, 
  CheckCircle2, 
  Copy, 
  Check, 
  ArrowRight, 
  GitMerge, 
  MessageSquare, 
  Sparkles,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import GitHubIcon from '../common/GitHubIcon';
import { GITHUB_TOPICS } from '../../data/githubGuidesData';
import { useLearning } from '../../context/LearningContext';

export default function GitHubLearning() {
  const { showToast } = useLearning();
  const [activeTab, setActiveTab] = useState('pr-sim');
  const [copiedKey, setCopiedKey] = useState(null);

  // Pull Request Simulator State
  const [prStep, setPrStep] = useState(0);
  const [prApproved, setPrApproved] = useState(false);
  const [prMerged, setPrMerged] = useState(false);

  // .gitignore Generator State
  const [selectedPresets, setSelectedPresets] = useState(['node', 'env', 'os']);

  // README Builder State
  const [readmeTitle, setReadmeTitle] = useState('My Awesome Project');
  const [readmeTagline, setReadmeTagline] = useState('A fast, modern full-stack web application.');
  const [readmeLicense, setReadmeLicense] = useState('MIT');

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast('Copied to clipboard!');
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const togglePreset = (id) => {
    setSelectedPresets(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  // Generate .gitignore text
  const generateGitignore = () => {
    const parts = [];
    if (selectedPresets.includes('node')) {
      parts.push('# Node & NPM Dependencies\nnode_modules/\nnpm-debug.log*\nyarn-debug.log*\nyarn-error.log*\n.pnpm-debug.log*');
    }
    if (selectedPresets.includes('env')) {
      parts.push('# Environment variables & Secrets\n.env\n.env.local\n.env.development.local\n.env.test.local\n.env.production.local\n*.pem');
    }
    if (selectedPresets.includes('build')) {
      parts.push('# Production Build Outputs\ndist/\nbuild/\nout/\n.next/\n.nuxt/');
    }
    if (selectedPresets.includes('python')) {
      parts.push('# Python bytecode & Virtual Environments\n__pycache__/\n*.py[cod]\n*$py.class\nvenv/\nenv/\n.venv/');
    }
    if (selectedPresets.includes('os')) {
      parts.push('# Operating System Files\n.DS_Store\nThumbs.db\nDesktop.ini');
    }
    if (selectedPresets.includes('editor')) {
      parts.push('# IDE / Editor configurations\n.vscode/*\n!.vscode/settings.json\n.idea/\n*.suo\n*.ntvs*');
    }
    return parts.join('\n\n') || '# Select presets to generate your .gitignore';
  };

  const tabs = [
    { id: 'pr-sim', label: 'Pull Request Simulator', icon: GitPullRequest },
    { id: 'vs', label: 'Git vs GitHub', icon: Layers },
    { id: 'gitignore', label: '.gitignore Generator', icon: FileCode },
    { id: 'readme', label: 'Interactive README Builder', icon: FileText },
    { id: 'actions', label: 'GitHub Actions (CI/CD)', icon: Zap },
    { id: 'hosting', label: 'GitHub Pages Hosting', icon: Globe }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="p-1.5 rounded-lg bg-git-50 dark:bg-git-950/60 text-git-600 dark:text-git-400">
            <GitHubIcon className="w-4 h-4" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-git-600 dark:text-git-400">
            Cloud Collaboration
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          GitHub Learning & Real-World Workflows
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
          Learn how software engineering teams collaborate on GitHub using Pull Requests, automated CI/CD pipelines, README documentation, and safe credentials management.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200 dark:border-slate-800">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
                isActive
                  ? 'bg-git-500 text-white border-git-600 shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Pull Request Simulator */}
      {activeTab === 'pr-sim' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <GitPullRequest className="w-5 h-5 text-git-500" />
                  Interactive Pull Request (PR) Lifecycle
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Walk through the exact 5 steps every software developer performs at tech companies.
                </p>
              </div>

              <button
                onClick={() => {
                  setPrStep(0);
                  setPrApproved(false);
                  setPrMerged(false);
                }}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                Reset Simulation
              </button>
            </div>

            {/* Stepper Progress */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 my-6">
              {[
                { title: '1. Create Branch', desc: 'git switch -c feature' },
                { title: '2. Commit & Push', desc: 'git push -u origin' },
                { title: '3. Open PR', desc: 'GitHub UI Proposal' },
                { title: '4. Code Review', desc: 'Teammate checks diff' },
                { title: '5. Merge into Main', desc: 'Shipped to production!' }
              ].map((s, idx) => {
                const isCurrent = prStep === idx;
                const isPassed = prStep > idx;
                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-2xl border text-xs transition ${
                      isPassed
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                        : isCurrent
                        ? 'bg-git-50 dark:bg-git-950/60 border-git-500 text-git-600 dark:text-git-400 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="font-bold flex items-center gap-1">
                      {isPassed ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : null}
                      <span>{s.title}</span>
                    </div>
                    <span className="text-[10px] opacity-80 font-mono block mt-0.5">{s.desc}</span>
                  </div>
                );
              })}
            </div>

            {/* Interactive Simulation Stage */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
              {prStep === 0 && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Step 1: Create an isolated Feature Branch locally
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Never write new code directly on the production "main" branch. Always branch off first!
                  </p>
                  <div className="p-3 bg-slate-900 text-git-400 rounded-xl font-mono text-xs">
                    $ git switch -c feature/dark-mode-toggle
                  </div>
                  <button
                    onClick={() => {
                      setPrStep(1);
                      showToast('Switched to feature/dark-mode-toggle');
                    }}
                    className="px-4 py-2 rounded-xl bg-git-500 text-white text-xs font-bold hover:bg-git-600 transition flex items-center gap-2"
                  >
                    <span>Run Branch Command</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {prStep === 1 && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Step 2: Commit your code and push branch to GitHub
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Publish your new branch to the cloud server so GitHub knows about it.
                  </p>
                  <div className="p-3 bg-slate-900 text-git-400 rounded-xl font-mono text-xs space-y-1">
                    <div>$ git add src/components/ThemeToggle.jsx</div>
                    <div>$ git commit -m "feat(theme): implement dark mode switch"</div>
                    <div>$ git push -u origin feature/dark-mode-toggle</div>
                  </div>
                  <button
                    onClick={() => {
                      setPrStep(2);
                      showToast('Pushed branch to GitHub!');
                    }}
                    className="px-4 py-2 rounded-xl bg-git-500 text-white text-xs font-bold hover:bg-git-600 transition flex items-center gap-2"
                  >
                    <span>Push to GitHub</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {prStep === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
                    <Sparkles className="w-4 h-4" />
                    <span>GitHub detected recent push: feature/dark-mode-toggle</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Step 3: Open Pull Request
                  </h4>
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-3">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold">Base & Compare</span>
                      <div className="font-mono text-xs mt-1 text-slate-700 dark:text-slate-300">
                        base: <strong className="text-blue-500">main</strong> ⬅ compare: <strong className="text-git-500">feature/dark-mode-toggle</strong>
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold">PR Title</span>
                      <div className="font-semibold text-sm text-slate-900 dark:text-white mt-1">
                        feat(theme): implement persistent dark mode switch with Tailwind
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setPrStep(3);
                      showToast('Pull Request #42 opened!');
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition flex items-center gap-2"
                  >
                    <span>Create Pull Request #42</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {prStep === 3 && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Step 4: Peer Code Review & CI Automation Checks
                  </h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span className="font-medium text-slate-800 dark:text-slate-200">GitHub Actions CI: All 18 automated unit tests passed</span>
                      </div>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase">Passed</span>
                    </div>

                    <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-[10px]">
                            ST
                          </div>
                          <span className="font-bold text-slate-900 dark:text-white">Senior Engineer (Sarah Taylor)</span>
                        </div>
                        <span className="text-[11px] text-slate-400">Reviewer</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-xs pl-8">
                        "Great clean component design! Verified contrast ratios on dark theme. LGTM! 🚀"
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setPrApproved(true);
                      setPrStep(4);
                      showToast('Code review approved! Ready to merge.');
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve Pull Request</span>
                  </button>
                </div>
              )}

              {prStep === 4 && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Step 5: Merge Pull Request into Main
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    All review requirements and CI tests have passed. Merge this branch safely into main.
                  </p>

                  {!prMerged ? (
                    <button
                      onClick={() => {
                        setPrMerged(true);
                        showToast('🎉 Pull Request merged into main branch!');
                      }}
                      className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition flex items-center gap-2 shadow-md shadow-purple-600/20"
                    >
                      <GitMerge className="w-4 h-4" />
                      <span>Merge Pull Request</span>
                    </button>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/50 border border-purple-300 dark:border-purple-800 text-purple-900 dark:text-purple-200 text-xs flex items-center gap-3"
                    >
                      <GitMerge className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0" />
                      <div>
                        <strong className="text-sm">Pull Request #42 successfully merged and closed!</strong>
                        <p className="mt-0.5 text-purple-700 dark:text-purple-300">
                          Production deploy pipeline triggered. You can safely delete the branch feature/dark-mode-toggle.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Git vs GitHub */}
      {activeTab === 'vs' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Git vs GitHub: Side-by-Side Comparison
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Never mix up Git and GitHub again. One is the tool; the other is the cloud platform.
            </p>
          </div>

          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3.5 font-bold text-slate-900 dark:text-white">Dimension</th>
                  <th className="p-3.5 font-bold text-git-600 dark:text-git-400">Git (The Software)</th>
                  <th className="p-3.5 font-bold text-blue-600 dark:text-blue-400">GitHub (The Platform)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {GITHUB_TOPICS[0].content.table.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="p-3.5 font-semibold text-slate-800 dark:text-slate-200">{row.feature}</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">{row.git}</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">{row.github}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: .gitignore Generator */}
      {activeTab === 'gitignore' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileCode className="w-5 h-5 text-git-500" />
                Interactive .gitignore Generator
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Select your tech stack to generate a bulletproof .gitignore file. Never leak secrets or massive dependencies!
              </p>
            </div>

            <button
              onClick={() => handleCopy(generateGitignore(), 'gitignore')}
              className="px-4 py-2 rounded-xl bg-git-500 hover:bg-git-600 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs shrink-0"
            >
              {copiedKey === 'gitignore' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>Copy .gitignore</span>
            </button>
          </div>

          {/* Preset Chips */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'node', label: 'Node / NPM (node_modules)' },
              { id: 'env', label: 'Secrets (.env, API keys)' },
              { id: 'build', label: 'Build Outputs (dist, build)' },
              { id: 'python', label: 'Python (__pycache__, venv)' },
              { id: 'os', label: 'macOS / Windows (.DS_Store)' },
              { id: 'editor', label: 'IDE (.vscode, .idea)' }
            ].map((preset) => {
              const active = selectedPresets.includes(preset.id);
              return (
                <button
                  key={preset.id}
                  onClick={() => togglePreset(preset.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                    active
                      ? 'bg-git-500 text-white border-git-600 shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>

          {/* Generated Code Area */}
          <div className="p-4 rounded-2xl bg-[#0d1117] border border-slate-800 text-xs font-mono text-emerald-400 whitespace-pre-wrap max-h-72 overflow-y-auto">
            {generateGitignore()}
          </div>
        </div>
      )}

      {/* Tab 4: Interactive README Builder */}
      {activeTab === 'readme' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-500" />
                Professional README.md Builder
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Customize title, tagline, and badges to generate a hiring-manager-ready README.
              </p>
            </div>

            <button
              onClick={() => {
                const markdown = `# ${readmeTitle}\n\n> ${readmeTagline}\n\n[![License: ${readmeLicense}](https://img.shields.io/badge/License-${readmeLicense}-yellow.svg)](https://opensource.org/licenses/${readmeLicense})\n[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)\n\n## 🚀 Quick Start\n\n\`\`\`bash\ngit clone https://github.com/developer/${readmeTitle.toLowerCase().replace(/\\s+/g, '-')}.git\ncd ${readmeTitle.toLowerCase().replace(/\\s+/g, '-')}\nnpm install\nnpm run dev\n\`\`\`\n\n## 🛠️ Tech Stack\n- React.js\n- Tailwind CSS\n- Git & GitHub\n\n## 📄 License\nThis project is licensed under the ${readmeLicense} License.`;
                handleCopy(markdown, 'readme');
              }}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs shrink-0"
            >
              {copiedKey === 'readme' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>Copy README.md</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Controls */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  value={readmeTitle}
                  onChange={(e) => setReadmeTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Tagline / Description
                </label>
                <textarea
                  value={readmeTagline}
                  onChange={(e) => setReadmeTagline(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  License
                </label>
                <select
                  value={readmeLicense}
                  onChange={(e) => setReadmeLicense(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="MIT">MIT License (Permissive & Most Popular)</option>
                  <option value="Apache-2.0">Apache 2.0</option>
                  <option value="GPL-3.0">GNU GPL v3</option>
                </select>
              </div>
            </div>

            {/* Live Markdown Preview */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-3 text-xs text-slate-700 dark:text-slate-300">
              <span className="text-[10px] uppercase font-bold text-slate-400 block pb-2 border-b border-slate-200 dark:border-slate-800">
                Live Markdown Preview
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">{readmeTitle}</h2>
              <blockquote className="border-l-2 border-blue-500 pl-3 italic text-slate-600 dark:text-slate-400">
                {readmeTagline}
              </blockquote>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 text-[10px] font-bold">
                  License: {readmeLicense}
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-[10px] font-bold">
                  PRs Welcome ✓
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 text-slate-200 font-mono text-[11px]">
                git clone https://github.com/dev/{readmeTitle.toLowerCase().replace(/\s+/g, '-')}.git
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: GitHub Actions */}
      {activeTab === 'actions' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              GitHub Actions & CI/CD Pipeline
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Automate unit testing, linting, and production deployment every time someone pushes to GitHub.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#0d1117] border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-slate-500 text-[11px]">
              <span>.github/workflows/ci.yml</span>
              <button
                onClick={() => handleCopy(GITHUB_TOPICS.find(t => t.id === 'github-actions')?.content.sampleYaml, 'actions')}
                className="text-slate-400 hover:text-white transition"
              >
                {copiedKey === 'actions' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <pre className="whitespace-pre-wrap leading-relaxed">
              {GITHUB_TOPICS.find(t => t.id === 'github-actions')?.content.sampleYaml}
            </pre>
          </div>
        </div>
      )}

      {/* Tab 6: GitHub Pages */}
      {activeTab === 'hosting' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-emerald-500" />
              Free Website Hosting with GitHub Pages
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Deploy your HTML/CSS/JavaScript websites or documentation online directly from your GitHub repository for free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { step: '1', title: 'Push Your Project', desc: 'Ensure your root directory has an index.html or build folder.' },
              { step: '2', title: 'Open Settings', desc: 'Navigate to your GitHub repository -> Settings -> Pages.' },
              { step: '3', title: 'Pick Source Branch', desc: 'Select "main" branch and "/ (root)" directory and click Save.' },
              { step: '4', title: 'Your Site is Live!', desc: 'Accessible worldwide at https://<username>.github.io/<repo-name>.' }
            ].map((s, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="w-6 h-6 rounded-full bg-emerald-500 text-white font-bold text-xs flex items-center justify-center">
                  {s.step}
                </span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white pt-2">{s.title}</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
