export const CHEAT_SHEET = [
  {
    category: 'Getting Started & Config',
    commands: [
      { cmd: 'git config --global user.name "Alex"', desc: 'Set global author name' },
      { cmd: 'git config --global user.email "a@ex.com"', desc: 'Set global email' },
      { cmd: 'git init', desc: 'Initialize local Git repository' },
      { cmd: 'git clone <url>', desc: 'Download remote repository' }
    ]
  },
  {
    category: 'Daily Working & Staging',
    commands: [
      { cmd: 'git status', desc: 'Check status of working tree' },
      { cmd: 'git diff', desc: 'Show unstaged differences' },
      { cmd: 'git add <file>', desc: 'Stage specific file' },
      { cmd: 'git add .', desc: 'Stage all modified & new files' },
      { cmd: 'git commit -m "msg"', desc: 'Commit staged changes' },
      { cmd: 'git commit --amend', desc: 'Modify the previous commit' }
    ]
  },
  {
    category: 'Branching & Switching',
    commands: [
      { cmd: 'git branch', desc: 'List all local branches' },
      { cmd: 'git switch -c <name>', desc: 'Create and switch to new branch' },
      { cmd: 'git switch <name>', desc: 'Switch to existing branch' },
      { cmd: 'git merge <branch>', desc: 'Merge branch into current branch' },
      { cmd: 'git branch -d <name>', desc: 'Safely delete merged branch' }
    ]
  },
  {
    category: 'Synchronizing with Remote',
    commands: [
      { cmd: 'git remote add origin <url>', desc: 'Add remote GitHub repository' },
      { cmd: 'git push -u origin <branch>', desc: 'Push local branch to remote' },
      { cmd: 'git pull origin <branch>', desc: 'Fetch and merge remote changes' },
      { cmd: 'git fetch origin', desc: 'Download remote commits without merging' }
    ]
  },
  {
    category: 'Undoing & Emergency Rescue',
    commands: [
      { cmd: 'git restore <file>', desc: 'Discard uncommitted changes in file' },
      { cmd: 'git restore --staged <file>', desc: 'Unstage a staged file' },
      { cmd: 'git reset --soft HEAD~1', desc: 'Undo last commit, keep changes staged' },
      { cmd: 'git revert <commit-hash>', desc: 'Safely undo pushed commit via new commit' },
      { cmd: 'git stash', desc: 'Temporarily shelve dirty changes' },
      { cmd: 'git stash pop', desc: 'Restore shelved changes' },
      { cmd: 'git reflog', desc: 'View complete history of HEAD movements' }
    ]
  }
];

