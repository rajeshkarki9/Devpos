import React, { useState, useRef, useEffect } from 'react';
import { 
  Terminal as TerminalIcon, 
  RotateCcw, 
  Trash2, 
  HelpCircle, 
  Play, 
  CheckCircle, 
  Sparkles,
  GitBranch,
  Folder,
  Layers
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

const INITIAL_FILES = {
  'index.html': { content: '<!DOCTYPE html><html><body><h1>Hello World</h1></body></html>', status: 'clean' },
  'styles.css': { content: 'body { font-family: sans-serif; background: #fff; }', status: 'clean' },
  'app.js': { content: 'console.log("App initialized");', status: 'modified' },
  'README.md': { content: '# My Project\nLearning Git like a pro!', status: 'untracked' }
};

const INITIAL_COMMITS = [
  {
    sha: '1c90a14',
    message: 'Initial commit: setup index.html & styles.css',
    author: 'Alex Morgan <alex@example.com>',
    date: '3 hours ago',
    files: ['index.html', 'styles.css']
  }
];

export default function InteractiveTerminal() {
  const { showToast } = useLearning();
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: 'Welcome to GitMastery Interactive Terminal Simulator v2.0.\nType "help" to see available commands or click the quick action chips below.'
    },
    {
      type: 'command',
      cmd: 'git status'
    },
    {
      type: 'output',
      lines: [
        { text: 'On branch main', color: 'text-slate-300' },
        { text: "Your branch is up to date with 'origin/main'.", color: 'text-slate-400' },
        { text: '', color: '' },
        { text: 'Changes not staged for commit:', color: 'text-slate-300' },
        { text: '  (use "git add <file>..." to update what will be committed)', color: 'text-slate-500' },
        { text: '\tmodified:   app.js', color: 'text-rose-400 font-semibold' },
        { text: '', color: '' },
        { text: 'Untracked files:', color: 'text-slate-300' },
        { text: '  (use "git add <file>..." to include in what will be committed)', color: 'text-slate-500' },
        { text: '\tREADME.md', color: 'text-rose-400 font-semibold' },
        { text: '', color: '' },
        { text: 'no changes added to commit (use "git add" to stage)', color: 'text-slate-400' }
      ]
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [cmdHistory, setCmdHistory] = useState(['git status']);
  const [historyIdx, setHistoryIdx] = useState(-1);

  // Simulated Git Engine State
  const [isRepo, setIsRepo] = useState(true);
  const [currentBranch, setCurrentBranch] = useState('main');
  const [branches, setBranches] = useState(['main', 'feature-auth']);
  const [commits, setCommits] = useState(INITIAL_COMMITS);
  const [files, setFiles] = useState(INITIAL_FILES);
  const [stagedFiles, setStagedFiles] = useState([]);
  const [stash, setStash] = useState([]);
  const [remoteOrigin, setRemoteOrigin] = useState('https://github.com/developer/my-awesome-app.git');

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const generateSha = () => {
    const chars = '0123456789abcdef';
    let result = '';
    for (let i = 0; i < 7; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const executeCommand = (rawCommand) => {
    const trimmed = rawCommand.trim();
    if (!trimmed) return;

    // Record command into terminal output
    const newHistory = [...history, { type: 'command', cmd: trimmed, branch: currentBranch }];
    setCmdHistory(prev => [trimmed, ...prev]);
    setHistoryIdx(-1);

    const parts = trimmed.split(' ').filter(Boolean);
    const primary = parts[0]?.toLowerCase();
    const sub = parts[1]?.toLowerCase();
    const arg1 = parts[2];
    const arg2 = parts[3];

    let outputLines = [];

    // Basic Shell commands
    if (primary === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    if (primary === 'help') {
      outputLines = [
        { text: 'GitMastery Interactive Sandbox Commands:', color: 'text-git-400 font-bold' },
        { text: '  git init                Initialize local repository', color: 'text-slate-300' },
        { text: '  git status              Check working directory & staged changes', color: 'text-slate-300' },
        { text: '  git add <file> | .      Stage changes for commit', color: 'text-slate-300' },
        { text: '  git commit -m "msg"     Commit staged snapshots', color: 'text-slate-300' },
        { text: '  git log [--oneline]     View commit timeline', color: 'text-slate-300' },
        { text: '  git branch [<name>]     List or create branches', color: 'text-slate-300' },
        { text: '  git switch <branch>     Switch between branches (-c to create)', color: 'text-slate-300' },
        { text: '  git merge <branch>      Merge branch into current branch', color: 'text-slate-300' },
        { text: '  git push                Upload commits to GitHub', color: 'text-slate-300' },
        { text: '  git pull                Pull latest remote commits', color: 'text-slate-300' },
        { text: '  git stash [pop]         Shelve / restore uncommitted changes', color: 'text-slate-300' },
        { text: '  git diff                Show modified lines', color: 'text-slate-300' },
        { text: '  ls                      List files in directory', color: 'text-slate-300' },
        { text: '  touch <filename>        Create a new simulated file', color: 'text-slate-300' },
        { text: '  clear                   Clear terminal output', color: 'text-slate-300' }
      ];
    } else if (primary === 'ls') {
      const fileNames = Object.keys(files).join('   ');
      outputLines = [{ text: fileNames, color: 'text-sky-300 font-mono' }];
    } else if (primary === 'touch') {
      const fileName = parts[1];
      if (!fileName) {
        outputLines = [{ text: 'touch: missing file operand', color: 'text-rose-400' }];
      } else {
        setFiles(prev => ({
          ...prev,
          [fileName]: { content: '', status: 'untracked' }
        }));
        outputLines = [{ text: `Created file "${fileName}" (untracked by Git)`, color: 'text-emerald-400' }];
      }
    } else if (primary === 'git') {
      if (!isRepo && sub !== 'init') {
        outputLines = [
          { text: 'fatal: not a git repository (or any of the parent directories): .git', color: 'text-rose-400' },
          { text: 'Hint: Run "git init" to start tracking this directory.', color: 'text-slate-400' }
        ];
      } else {
        switch (sub) {
          case 'init':
            setIsRepo(true);
            outputLines = [
              { text: `Initialized empty Git repository in /workspace/.git/`, color: 'text-emerald-400' },
              { text: `Default branch set to "${currentBranch}".`, color: 'text-slate-400' }
            ];
            break;

          case 'status': {
            const modified = Object.entries(files).filter(([_, f]) => f.status === 'modified' && !stagedFiles.includes(_));
            const untracked = Object.entries(files).filter(([_, f]) => f.status === 'untracked' && !stagedFiles.includes(_));

            outputLines.push({ text: `On branch ${currentBranch}`, color: 'text-slate-200 font-semibold' });
            if (remoteOrigin) {
              outputLines.push({ text: `Your branch is up to date with 'origin/${currentBranch}'.`, color: 'text-slate-400' });
            }
            outputLines.push({ text: '', color: '' });

            if (stagedFiles.length > 0) {
              outputLines.push({ text: 'Changes to be committed:', color: 'text-emerald-400 font-semibold' });
              outputLines.push({ text: '  (use "git restore --staged <file>..." to unstage)', color: 'text-slate-500' });
              stagedFiles.forEach(f => {
                outputLines.push({ text: `\tstaged:     ${f}`, color: 'text-emerald-400 font-semibold' });
              });
              outputLines.push({ text: '', color: '' });
            }

            if (modified.length > 0) {
              outputLines.push({ text: 'Changes not staged for commit:', color: 'text-rose-400 font-semibold' });
              outputLines.push({ text: '  (use "git add <file>..." to update what will be committed)', color: 'text-slate-500' });
              modified.forEach(([f]) => {
                outputLines.push({ text: `\tmodified:   ${f}`, color: 'text-rose-400 font-semibold' });
              });
              outputLines.push({ text: '', color: '' });
            }

            if (untracked.length > 0) {
              outputLines.push({ text: 'Untracked files:', color: 'text-rose-400 font-semibold' });
              outputLines.push({ text: '  (use "git add <file>..." to include in what will be committed)', color: 'text-slate-500' });
              untracked.forEach(([f]) => {
                outputLines.push({ text: `\t${f}`, color: 'text-rose-400 font-semibold' });
              });
              outputLines.push({ text: '', color: '' });
            }

            if (stagedFiles.length === 0 && modified.length === 0 && untracked.length === 0) {
              outputLines.push({ text: 'nothing to commit, working tree clean', color: 'text-emerald-400' });
            }
            break;
          }

          case 'add': {
            const target = parts[2];
            if (!target) {
              outputLines = [{ text: 'Nothing specified, nothing added. Maybe you wanted to say "git add ." ?', color: 'text-amber-400' }];
            } else if (target === '.' || target === '-A') {
              const allEligible = Object.keys(files);
              setStagedFiles(allEligible);
              outputLines = [{ text: `Staged ${allEligible.length} files into index. (Ready for commit)`, color: 'text-emerald-400' }];
            } else if (files[target]) {
              setStagedFiles(prev => Array.from(new Set([...prev, target])));
              outputLines = [{ text: `Staged "${target}" into staging area.`, color: 'text-emerald-400' }];
            } else {
              outputLines = [{ text: `fatal: pathspec '${target}' did not match any files`, color: 'text-rose-400' }];
            }
            break;
          }

          case 'commit': {
            if (stagedFiles.length === 0) {
              outputLines = [
                { text: 'On branch ' + currentBranch, color: 'text-slate-300' },
                { text: 'no changes added to commit (use "git add" to stage)', color: 'text-amber-400' }
              ];
            } else {
              // Extract commit message
              const msgMatch = trimmed.match(/-m\s+["'](.*?)["']/);
              const message = msgMatch ? msgMatch[1] : (parts.slice(2).join(' ') || 'Commit update');
              const newSha = generateSha();
              const newCommit = {
                sha: newSha,
                message,
                author: 'Alex Morgan <alex@example.com>',
                date: 'Just now',
                files: [...stagedFiles]
              };

              setCommits(prev => [newCommit, ...prev]);

              // Update file statuses to clean
              setFiles(prev => {
                const next = { ...prev };
                stagedFiles.forEach(f => {
                  if (next[f]) next[f].status = 'clean';
                });
                return next;
              });

              outputLines = [
                { text: `[${currentBranch} ${newSha}] ${message}`, color: 'text-emerald-400 font-bold' },
                { text: ` ${stagedFiles.length} files changed, ${stagedFiles.length * 12} insertions(+)`, color: 'text-slate-300' }
              ];
              setStagedFiles([]);
              showToast('🎉 Commit successfully created in local history!');
            }
            break;
          }

          case 'log': {
            if (commits.length === 0) {
              outputLines = [{ text: 'fatal: your current branch does not have any commits yet', color: 'text-rose-400' }];
            } else if (trimmed.includes('--oneline')) {
              commits.forEach((c, i) => {
                const isHead = i === 0 ? ` (HEAD -> ${currentBranch})` : '';
                outputLines.push({
                  text: `${c.sha}${isHead} ${c.message}`,
                  color: i === 0 ? 'text-amber-400 font-semibold' : 'text-slate-300'
                });
              });
            } else {
              commits.forEach((c, i) => {
                outputLines.push({
                  text: `commit ${c.sha}${i === 0 ? ` (HEAD -> ${currentBranch})` : ''}`,
                  color: 'text-amber-400 font-semibold'
                });
                outputLines.push({ text: `Author: ${c.author}`, color: 'text-slate-400' });
                outputLines.push({ text: `Date:   ${c.date}`, color: 'text-slate-500' });
                outputLines.push({ text: ``, color: '' });
                outputLines.push({ text: `    ${c.message}`, color: 'text-slate-200 font-medium' });
                outputLines.push({ text: ``, color: '' });
              });
            }
            break;
          }

          case 'branch': {
            const bName = parts[2];
            if (!bName) {
              // List branches
              branches.forEach(b => {
                if (b === currentBranch) {
                  outputLines.push({ text: `* ${b}`, color: 'text-emerald-400 font-bold' });
                } else {
                  outputLines.push({ text: `  ${b}`, color: 'text-slate-300' });
                }
              });
            } else if (parts[2] === '-d' || parts[2] === '-D') {
              const toDelete = parts[3];
              if (toDelete === currentBranch) {
                outputLines = [{ text: `error: Cannot delete branch '${toDelete}' checked out at current directory.`, color: 'text-rose-400' }];
              } else if (!branches.includes(toDelete)) {
                outputLines = [{ text: `error: branch '${toDelete}' not found.`, color: 'text-rose-400' }];
              } else {
                setBranches(prev => prev.filter(b => b !== toDelete));
                outputLines = [{ text: `Deleted branch ${toDelete} (was ${commits[0]?.sha || '0000000'}).`, color: 'text-emerald-400' }];
              }
            } else {
              // Create branch
              if (branches.includes(bName)) {
                outputLines = [{ text: `fatal: a branch named '${bName}' already exists`, color: 'text-rose-400' }];
              } else {
                setBranches(prev => [...prev, bName]);
                outputLines = [{ text: `Branch '${bName}' created. (Run "git switch ${bName}" to switch to it)`, color: 'text-emerald-400' }];
              }
            }
            break;
          }

          case 'switch':
          case 'checkout': {
            let targetBranch = parts[2];
            let isCreate = false;

            if (parts[2] === '-c' || parts[2] === '-b') {
              targetBranch = parts[3];
              isCreate = true;
            }

            if (!targetBranch) {
              outputLines = [{ text: 'fatal: missing branch name', color: 'text-rose-400' }];
            } else if (isCreate) {
              setBranches(prev => Array.from(new Set([...prev, targetBranch])));
              setCurrentBranch(targetBranch);
              outputLines = [{ text: `Switched to a new branch '${targetBranch}'`, color: 'text-emerald-400' }];
            } else if (branches.includes(targetBranch)) {
              setCurrentBranch(targetBranch);
              outputLines = [{ text: `Switched to branch '${targetBranch}'`, color: 'text-emerald-400' }];
            } else {
              outputLines = [
                { text: `error: pathspec '${targetBranch}' did not match any file(s) known to git`, color: 'text-rose-400' },
                { text: `Hint: Did you mean to create it with "git switch -c ${targetBranch}"?`, color: 'text-slate-400' }
              ];
            }
            break;
          }

          case 'merge': {
            const incoming = parts[2];
            if (!incoming) {
              outputLines = [{ text: 'fatal: No remote or branch specified to merge.', color: 'text-rose-400' }];
            } else if (!branches.includes(incoming)) {
              outputLines = [{ text: `merge: ${incoming} - not something we can merge`, color: 'text-rose-400' }];
            } else if (incoming === currentBranch) {
              outputLines = [{ text: 'Already up to date.', color: 'text-emerald-400' }];
            } else {
              const mergeSha = generateSha();
              const mergeCommit = {
                sha: mergeSha,
                message: `Merge branch '${incoming}' into ${currentBranch}`,
                author: 'Alex Morgan <alex@example.com>',
                date: 'Just now',
                files: ['app.js']
              };
              setCommits(prev => [mergeCommit, ...prev]);
              outputLines = [
                { text: `Updating ${commits[0]?.sha}..${mergeSha}`, color: 'text-slate-300' },
                { text: 'Fast-forward', color: 'text-emerald-400 font-semibold' },
                { text: ` app.js | 15 +++++++++++++++`, color: 'text-slate-400' },
                { text: ` 1 file changed, 15 insertions(+)`, color: 'text-slate-300' }
              ];
              showToast(`Merged branch ${incoming} into ${currentBranch}!`);
            }
            break;
          }

          case 'push': {
            outputLines = [
              { text: `Enumerating objects: 5, done.`, color: 'text-slate-400' },
              { text: `Counting objects: 100% (5/5), done.`, color: 'text-slate-400' },
              { text: `Writing objects: 100% (3/3), 320 bytes | 320.00 KiB/s, done.`, color: 'text-slate-400' },
              { text: `To ${remoteOrigin}`, color: 'text-slate-300' },
              { text: `   ${commits[1]?.sha || '1c90a14'}..${commits[0]?.sha || '7f201bc'}  ${currentBranch} -> ${currentBranch}`, color: 'text-emerald-400 font-semibold' }
            ];
            showToast('🚀 Pushed commits to GitHub remote!');
            break;
          }

          case 'pull': {
            outputLines = [
              { text: `remote: Enumerating objects: 4, done.`, color: 'text-slate-400' },
              { text: `remote: Counting objects: 100% (4/4), done.`, color: 'text-slate-400' },
              { text: `From ${remoteOrigin}`, color: 'text-slate-300' },
              { text: ` * branch            ${currentBranch}     -> FETCH_HEAD`, color: 'text-slate-400' },
              { text: `Already up to date.`, color: 'text-emerald-400 font-semibold' }
            ];
            break;
          }

          case 'stash': {
            const stashAction = parts[2];
            if (!stashAction || stashAction === 'push') {
              const modified = Object.entries(files).filter(([_, f]) => f.status === 'modified');
              if (modified.length === 0) {
                outputLines = [{ text: 'No local changes to save', color: 'text-slate-400' }];
              } else {
                setStash(prev => [{ id: prev.length, files: modified }, ...prev]);
                setFiles(prev => {
                  const next = { ...prev };
                  modified.forEach(([f]) => {
                    next[f].status = 'clean';
                  });
                  return next;
                });
                outputLines = [
                  { text: `Saved working directory and index state WIP on ${currentBranch}: ${commits[0]?.sha} ${commits[0]?.message}`, color: 'text-emerald-400' }
                ];
              }
            } else if (stashAction === 'pop') {
              if (stash.length === 0) {
                outputLines = [{ text: 'error: No stash entries found.', color: 'text-rose-400' }];
              } else {
                setFiles(prev => ({
                  ...prev,
                  'app.js': { content: '...', status: 'modified' }
                }));
                setStash(prev => prev.slice(1));
                outputLines = [
                  { text: `On branch ${currentBranch}`, color: 'text-slate-300' },
                  { text: 'Changes not staged for commit:', color: 'text-rose-400' },
                  { text: '\tmodified:   app.js', color: 'text-rose-400 font-semibold' },
                  { text: `Dropped refs/stash@{0}`, color: 'text-slate-400' }
                ];
              }
            } else if (stashAction === 'list') {
              if (stash.length === 0) {
                outputLines = [{ text: '(No active stashes)', color: 'text-slate-500' }];
              } else {
                stash.forEach((s, idx) => {
                  outputLines.push({ text: `stash@{${idx}}: WIP on ${currentBranch}: temporary shelved work`, color: 'text-amber-400' });
                });
              }
            }
            break;
          }

          case 'diff': {
            outputLines = [
              { text: 'diff --git a/app.js b/app.js', color: 'text-slate-300 font-bold' },
              { text: '--- a/app.js', color: 'text-rose-400' },
              { text: '+++ b/app.js', color: 'text-emerald-400' },
              { text: '@@ -1,1 +1,3 @@', color: 'text-cyan-400' },
              { text: '-console.log("App initialized");', color: 'text-rose-400 bg-rose-950/40' },
              { text: '+console.log("App initialized with auth!");', color: 'text-emerald-400 bg-emerald-950/40' },
              { text: '+export const isAuthenticated = true;', color: 'text-emerald-400 bg-emerald-950/40' }
            ];
            break;
          }

          default:
            outputLines = [
              { text: `git: '${sub}' is not a recognized git command.`, color: 'text-rose-400' },
              { text: 'Type "help" to see all supported commands.', color: 'text-slate-400' }
            ];
            break;
        }
      }
    } else {
      outputLines = [
        { text: `command not found: ${primary}. In this simulator, try Git commands like 'git status' or 'help'.`, color: 'text-rose-400' }
      ];
    }

    setHistory([...newHistory, { type: 'output', lines: outputLines }]);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIdx = Math.min(historyIdx + 1, cmdHistory.length - 1);
        setHistoryIdx(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInputVal('');
      }
    }
  };

  const handleResetSandbox = () => {
    setIsRepo(true);
    setCurrentBranch('main');
    setBranches(['main', 'feature-auth']);
    setCommits(INITIAL_COMMITS);
    setFiles(INITIAL_FILES);
    setStagedFiles([]);
    setStash([]);
    setHistory([
      {
        type: 'system',
        text: 'Sandbox reset to clean initial state.\nReady for your commands!'
      }
    ]);
    showToast('Terminal state reset', 'info');
  };

  const quickCommands = [
    'git status',
    'git add .',
    'git commit -m "feat: setup app"',
    'git branch',
    'git switch -c feature-cart',
    'git log --oneline',
    'git push',
    'git diff',
    'help'
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4">
      {/* Simulator Info Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-git-50 dark:bg-git-950/60 text-git-600 dark:text-git-400">
              <TerminalIcon className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Safe Interactive Git Terminal
            </h3>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              Live Sandbox
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Experiment freely without fear of breaking anything. Full file and commit state maintained.
          </p>
        </div>

        {/* Live State Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300">
            <GitBranch className="w-3.5 h-3.5 text-git-500" />
            <span>Branch: <strong className="text-git-500">{currentBranch}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300">
            <Layers className="w-3.5 h-3.5 text-blue-500" />
            <span>Commits: <strong>{commits.length}</strong></span>
          </div>
          <button
            onClick={handleResetSandbox}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition"
            title="Reset sandbox state"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset State</span>
          </button>
        </div>
      </div>

      {/* Terminal Window */}
      <div className="rounded-2xl overflow-hidden border border-slate-800 bg-[#0c1017] shadow-2xl font-mono text-sm">
        {/* macOS Style Window Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 cursor-pointer" onClick={() => setHistory([])} />
            <div className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 cursor-pointer" />
            <span className="ml-2 text-xs text-slate-400 font-sans font-medium flex items-center gap-1.5">
              <span>bash — developer@workstation: ~/my-awesome-app</span>
              <span className="text-[11px] px-1.5 py-0.2 rounded bg-slate-800 text-git-400">({currentBranch})</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setHistory([])}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title="Clear terminal screen"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div 
          onClick={() => inputRef.current?.focus()}
          className="p-4 sm:p-6 min-h-[360px] max-h-[520px] overflow-y-auto space-y-3 cursor-text text-slate-200"
        >
          {history.map((item, index) => {
            if (item.type === 'system') {
              return (
                <div key={index} className="text-xs text-slate-400 bg-slate-800/40 p-3 rounded-lg border border-slate-800 whitespace-pre-line leading-relaxed">
                  {item.text}
                </div>
              );
            }

            if (item.type === 'command') {
              return (
                <div key={index} className="flex items-start gap-2 text-slate-100">
                  <span className="text-git-400 font-bold select-none">➜</span>
                  <span className="text-cyan-400 select-none">~/app</span>
                  <span className="text-slate-500 text-xs select-none">({item.branch || currentBranch})</span>
                  <span className="font-semibold text-white">{item.cmd}</span>
                </div>
              );
            }

            if (item.type === 'output') {
              return (
                <div key={index} className="space-y-0.5 pl-5 text-xs sm:text-sm">
                  {item.lines.map((line, lIdx) => (
                    <div key={lIdx} className={`${line.color || 'text-slate-300'} whitespace-pre-wrap`}>
                      {line.text}
                    </div>
                  ))}
                </div>
              );
            }

            return null;
          })}

          {/* Active Input Line */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-git-400 font-bold select-none">➜</span>
            <span className="text-cyan-400 select-none">~/app</span>
            <span className="text-slate-500 text-xs select-none">({currentBranch})</span>
            <div className="relative flex-1 flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type git command..."
                className="w-full bg-transparent text-white focus:outline-none font-mono caret-git-400 text-sm"
                autoFocus
              />
            </div>
            <button
              onClick={() => executeCommand(inputVal)}
              className="px-2.5 py-1 rounded bg-git-600 hover:bg-git-500 text-white text-xs font-sans font-semibold transition flex items-center gap-1 shrink-0"
            >
              <Play className="w-3 h-3 fill-white" />
              <span>Run</span>
            </button>
          </div>

          <div ref={bottomRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-3 bg-[#12161f] border-t border-slate-800/80">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2 font-sans font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Quick Try Chips (click to run):</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {quickCommands.map((qCmd) => (
              <button
                key={qCmd}
                onClick={() => executeCommand(qCmd)}
                className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-mono border border-slate-700/60 transition"
              >
                {qCmd}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

