export const LESSON_LEVELS = [
  {
    id: 'beginner',
    title: 'Level 1 – Absolute Beginner',
    subtitle: 'Foundation & Everyday Basics',
    description: 'Learn what Git is, configure your identity, create repositories, and master staging and committing.',
    color: 'from-emerald-500 to-teal-600',
    badge: 'Beginner',
    time: '45 mins'
  },
  {
    id: 'intermediate',
    title: 'Level 2 – Intermediate',
    subtitle: 'Branches & Cloud Collaboration',
    description: 'Master branching strategies, merging code, connecting to GitHub, pushing, pulling, and working in teams.',
    color: 'from-blue-500 to-indigo-600',
    badge: 'Intermediate',
    time: '60 mins'
  },
  {
    id: 'advanced',
    title: 'Level 3 – Advanced',
    subtitle: 'History Manipulation & Emergency Rescue',
    description: 'Conquer rebasing, cherry-picking, stash magic, reset vs revert, and resolving scary merge conflicts.',
    color: 'from-purple-500 to-pink-600',
    badge: 'Advanced',
    time: '75 mins'
  }
];

export const LESSONS_DATA = [
  // LEVEL 1: BEGINNER
  {
    id: 'intro-vcs',
    level: 'beginner',
    levelLabel: 'Level 1',
    order: 1,
    title: 'Understanding Version Control & Git',
    estimatedTime: '8 mins',
    summary: 'Discover why developers cannot live without Git and how snapshots replace chaotic final_v2_really_final.zip files.',
    objectives: [
      'Understand what a Version Control System (VCS) is.',
      'Contrast Centralized vs Distributed Version Control.',
      'Learn how Git saves immutable snapshots of your code rather than differences.'
    ],
    sections: [
      {
        heading: 'The Problem with "final_v2_final.zip"',
        text: 'Before version control, developers and students backed up projects by duplicating folders: "website_v1", "website_v2", "website_final", "website_REAL_final". This created chaos: nobody knew what was changed, when, or why, and two people editing the same file would overwrite each other.'
      },
      {
        heading: 'Enter Git: The Distributed Snapshot Engine',
        text: 'Git was created in 2005 by Linus Torvalds (the creator of Linux). Unlike older systems that recorded delta file changes, Git takes an instantaneous snapshot of what all your files look like at that exact second. If a file hasn\'t changed, Git simply links to the previously stored file.'
      },
      {
        heading: 'Key Terminology to Remember',
        bulletList: [
          'Working Directory: Your actual files sitting on your hard drive where you write code.',
          'Staging Area (Index): The prep table where you decide which changes will be in the next snapshot.',
          'Commit: A permanent timestamped snapshot saved into the Git database.',
          'Repository (.git): The hidden vault inside your project holding all snapshots and history.'
        ]
      }
    ],
    quiz: {
      question: 'How does Git save your project history over time?',
      options: [
        'By saving entire new copies of the hard drive every minute.',
        'As a series of immutable snapshots of the project at points in time.',
        'By uploading all text directly into Google Drive.',
        'By deleting old files when you create new files.'
      ],
      correctAnswer: 1,
      explanation: 'Git treats data like a stream of snapshots. Every time you commit, Git records what all your files look like at that moment.'
    }
  },
  {
    id: 'installing-git',
    level: 'beginner',
    levelLabel: 'Level 1',
    order: 2,
    title: 'Installing & Verifying Git',
    estimatedTime: '7 mins',
    summary: 'Step-by-step instructions to install Git on Windows, macOS, and Linux, and test your installation.',
    objectives: [
      'Install Git on macOS using Homebrew or Xcode Command Line Tools.',
      'Install Git on Windows using Git for Windows (Git Bash).',
      'Verify installation using terminal commands.'
    ],
    sections: [
      {
        heading: 'Installation Guides by Operating System',
        codeBlock: `# On macOS (via Homebrew):
brew install git

# On Windows:
# Download the installer from https://git-scm.com/download/win
# Ensure "Git Bash Here" and standard UNIX tools are checked.

# On Ubuntu / Debian Linux:
sudo apt update
sudo apt install git -y`
      },
      {
        heading: 'Verifying Your Installation',
        text: 'Open your terminal (Terminal on Mac/Linux, or PowerShell / Git Bash on Windows) and run:',
        codeBlock: `git --version
# Expected: git version 2.40.0 (or newer)`
      }
    ],
    quiz: {
      question: 'Which terminal command proves Git is correctly installed and ready?',
      options: [
        'git start',
        'git --version',
        'run git',
        'install-git'
      ],
      correctAnswer: 1,
      explanation: 'Running "git --version" prints the installed Git release number, verifying Git is in your system PATH.'
    }
  },
  {
    id: 'git-configuration',
    level: 'beginner',
    levelLabel: 'Level 1',
    order: 3,
    title: 'Configuring Your Identity & Defaults',
    estimatedTime: '8 mins',
    summary: 'Teach Git who you are so every commit has your correct name, email, and preferred editor.',
    objectives: [
      'Set your global username and email.',
      'Configure the default branch name to "main".',
      'Learn how to inspect and edit your ~/.gitconfig file.'
    ],
    sections: [
      {
        heading: 'Setting Your Global Author Info',
        text: 'Every Git commit is permanently signed with your name and email. Run these two commands once on your machine:',
        codeBlock: `git config --global user.name "Your Full Name"
git config --global user.email "your.email@example.com"`
      },
      {
        heading: 'Setting Modern Defaults',
        text: 'Modern Git repositories default to branch name "main" rather than the legacy term "master". Set this once globally:',
        codeBlock: `git config --global init.defaultBranch main`
      },
      {
        heading: 'Checking Your Active Configuration',
        codeBlock: `git config --list --show-origin`
      }
    ],
    quiz: {
      question: 'What happens if you commit without setting user.name and user.email?',
      options: [
        'Git refuses to commit or guesses an ugly system username like "user@my-pc.localdomain".',
        'Git deletes your repository.',
        'GitHub permanently bans your computer.',
        'Your code cannot be compiled.'
      ],
      correctAnswer: 0,
      explanation: 'Git either halts requiring configuration or attributes commits to your raw local computer account.'
    }
  },
  {
    id: 'init-and-status',
    level: 'beginner',
    levelLabel: 'Level 1',
    order: 4,
    title: 'Initializing Repositories & Checking Status',
    estimatedTime: '10 mins',
    summary: 'Turn any ordinary project directory into a Git repository and use git status like a pro.',
    objectives: [
      'Initialize a repository using git init.',
      'Inspect the hidden .git directory structure.',
      'Interpret git status messages with total confidence.'
    ],
    sections: [
      {
        heading: 'Initializing with git init',
        text: 'Navigate into your project folder and run git init. This creates the hidden .git directory where Git keeps all version logs.',
        codeBlock: `cd my-first-project
git init`
      },
      {
        heading: 'Understanding git status',
        text: 'The git status command tells you what state your files are in: Untracked (Git has never seen this file), Modified (you changed it since last commit), or Staged (ready to be committed).',
        codeBlock: `git status`
      }
    ],
    quiz: {
      question: 'What folder does "git init" create inside your project?',
      options: [
        '.github',
        '.git',
        'node_modules',
        '.vcs'
      ],
      correctAnswer: 1,
      explanation: 'The hidden .git directory contains the complete internal database of objects, heads, and config.'
    }
  },
  {
    id: 'staging-committing',
    level: 'beginner',
    levelLabel: 'Level 1',
    order: 5,
    title: 'Staging & Committing Changes',
    estimatedTime: '12 mins',
    summary: 'Master the two-step workflow: stage specific changes with git add, then lock in snapshots with git commit.',
    objectives: [
      'Master the distinction between working directory, staging area, and repository.',
      'Use git add to stage individual files or all files.',
      'Craft professional, atomic commit messages following Conventional Commits.'
    ],
    sections: [
      {
        heading: 'The Staging Area: The Secret Power of Git',
        text: 'Why does Git require two steps (add then commit) instead of one? Because it lets you create clean, focused commits. If you fixed a bug in index.html and also started an unrelated style in styles.css, you can stage ONLY index.html and commit that first!'
      },
      {
        heading: 'The Workflow in Action',
        codeBlock: `# 1. Check current status
git status

# 2. Stage specific file
git add index.html

# 3. Commit with a meaningful message
git commit -m "feat(home): add welcome banner component"

# 4. Confirm clean state
git status`
      },
      {
        heading: 'Commit Message Best Practices',
        bulletList: [
          'Use imperative mood: "add feature" instead of "added feature".',
          'Keep subject line under 50 characters.',
          'Prefix with intent: feat:, fix:, docs:, refactor:, test:.'
        ]
      }
    ],
    quiz: {
      question: 'Why does Git have a Staging Area between your files and a Commit?',
      options: [
        'To slow down developers so they make fewer typos.',
        'To allow you to carefully choose exactly which changes go into the next atomic commit.',
        'Because hard drives cannot write files directly.',
        'To send files to the cloud automatically.'
      ],
      correctAnswer: 1,
      explanation: 'The staging area (index) gives you surgical control to craft clean, independent, logical commits.'
    }
  },

  // LEVEL 2: INTERMEDIATE
  {
    id: 'branches-explained',
    level: 'intermediate',
    levelLabel: 'Level 2',
    order: 6,
    title: 'Branching: Parallel Realities in Code',
    estimatedTime: '12 mins',
    summary: 'Understand lightweight Git branches, how HEAD points to branches, and how to create and switch branches effortlessly.',
    objectives: [
      'Understand how Git branches are just 41-byte pointer files, not heavyweight copies.',
      'Create and switch branches with git switch.',
      'Delete stale branches safely.'
    ],
    sections: [
      {
        heading: 'What is a Branch, Really?',
        text: 'In many old VCSs, branching meant copying every single file into a new directory. In Git, a branch is merely a 41-byte text file containing a SHA commit hash! Creating a branch is virtually instantaneous.'
      },
      {
        heading: 'Creating and Switching',
        codeBlock: `# View all current branches
git branch

# Create and switch in one modern command
git switch -c feature/payment-gateway

# Switch back to main
git switch main`
      }
    ],
    quiz: {
      question: 'What is a Git branch under the hood?',
      options: [
        'A full duplicate copy of every file on your computer.',
        'A lightweight, movable pointer to a specific commit.',
        'A cloud server on GitHub.',
        'A locked file that prevents other people from editing.'
      ],
      correctAnswer: 1,
      explanation: 'Branches in Git are simply movable pointers to commit hashes, making them nearly zero-cost to create and delete.'
    }
  },
  {
    id: 'merging-branches',
    level: 'intermediate',
    levelLabel: 'Level 2',
    order: 7,
    title: 'Merging: Fast-Forwards & 3-Way Merges',
    estimatedTime: '14 mins',
    summary: 'Bring independent branches back together. Learn the difference between fast-forward merges and 3-way merge commits.',
    objectives: [
      'Perform clean fast-forward merges.',
      'Understand how 3-way merges resolve divergent histories.',
      'Understand when and why merge conflicts occur.'
    ],
    sections: [
      {
        heading: 'Fast-Forward Merge',
        text: 'If the main branch has had no new commits since you branched off, Git simply slides the "main" pointer forward to match your feature branch. No extra commit is needed.'
      },
      {
        heading: '3-Way Merge',
        text: 'If both "main" and your feature branch received new commits simultaneously, Git finds their common ancestor and creates a new "Merge Commit" uniting both parents.'
      },
      {
        heading: 'Step-by-Step Merge',
        codeBlock: `# 1. Switch to destination branch
git switch main

# 2. Merge feature branch into main
git merge feature/payment-gateway

# 3. Clean up the merged branch
git branch -d feature/payment-gateway`
      }
    ],
    quiz: {
      question: 'When does Git perform a Fast-Forward merge?',
      options: [
        'Only when you type --fast on the command line.',
        'When the target branch has no divergent commits since the branch was created.',
        'When files have been deleted.',
        'When you have an active internet connection.'
      ],
      correctAnswer: 1,
      explanation: 'Git fast-forwards whenever the target branch tip is a direct ancestor of the incoming branch tip.'
    }
  },
  {
    id: 'remotes-and-github',
    level: 'intermediate',
    levelLabel: 'Level 2',
    order: 8,
    title: 'Remote Repositories: Connecting to GitHub',
    estimatedTime: '12 mins',
    summary: 'Link your local development environment to GitHub, configure origin remotes, and push your code to the cloud.',
    objectives: [
      'Understand the role of remote repositories.',
      'Connect local repos to GitHub via "git remote add origin".',
      'Push code and set up upstream tracking.'
    ],
    sections: [
      {
        heading: 'Git vs GitHub',
        text: 'Git is the local command-line tool running on your laptop. GitHub is a cloud hosting platform that stores Git repositories online, providing social coding features, code reviews, and issue tracking.'
      },
      {
        heading: 'Connecting to GitHub',
        codeBlock: `# Add GitHub repository as remote "origin"
git remote add origin https://github.com/your-username/my-project.git

# Verify connection
git remote -v

# Push and establish upstream tracking
git push -u origin main`
      }
    ],
    quiz: {
      question: 'What is "origin" in Git?',
      options: [
        'The first line of code in index.html.',
        'The conventional default alias name for your primary remote repository.',
        'The brand name of the Git software company.',
        'The username of the computer owner.'
      ],
      correctAnswer: 1,
      explanation: '"origin" is simply the default nickname Git assigns to the remote URL you cloned from or linked.'
    }
  },
  {
    id: 'push-pull-sync',
    level: 'intermediate',
    levelLabel: 'Level 2',
    order: 9,
    title: 'Pushing, Fetching, and Pulling',
    estimatedTime: '12 mins',
    summary: 'Keep your local work synchronized with remote teammates without losing local changes.',
    objectives: [
      'Differentiate between "git fetch" and "git pull".',
      'Understand the mechanics of git push.',
      'Prevent rejected push errors by syncing frequently.'
    ],
    sections: [
      {
        heading: 'git fetch vs git pull: The Golden Rule',
        text: 'git fetch downloads all the new commits and branches from GitHub into your local repository, but does NOT touch your working files. git pull runs git fetch AND immediately merges the changes into your active branch.'
      },
      {
        heading: 'Daily Synchronization Routine',
        codeBlock: `# 1. Morning routine: pull latest team changes
git pull origin main

# 2. Work locally, commit changes
git commit -m "feat: implement user settings"

# 3. Publish to GitHub
git push origin feature-settings`
      }
    ],
    quiz: {
      question: 'Which statement accurately describes "git fetch"?',
      options: [
        'It downloads remote commits without modifying your active working directory.',
        'It immediately overwrites and deletes your local changes.',
        'It uploads your changes to GitHub.',
        'It renames all local branches.'
      ],
      correctAnswer: 0,
      explanation: 'git fetch safely downloads new data without merging it into your active working branch.'
    }
  },
  {
    id: 'github-pull-requests',
    level: 'intermediate',
    levelLabel: 'Level 2',
    order: 10,
    title: 'GitHub Collaboration & Pull Requests',
    estimatedTime: '15 mins',
    summary: 'Learn the real-world GitHub Flow used by professional software companies: branch, push, open PR, review, merge.',
    objectives: [
      'Understand the GitHub Flow lifecycle.',
      'Create and submit a Pull Request (PR) on GitHub.',
      'Review code, address comments, and merge via GitHub UI.'
    ],
    sections: [
      {
        heading: 'What is a Pull Request?',
        text: 'A Pull Request (PR) is a formal proposal to merge code from a feature branch into the main production branch. It provides a web dashboard where teammates can inspect diffs, test code, run automated tests, and leave line-by-line feedback.'
      },
      {
        heading: 'The 5 Steps of GitHub Flow',
        bulletList: [
          '1. Create a branch: git switch -c feature/dark-theme',
          '2. Make commits: write code and commit locally.',
          '3. Push branch to GitHub: git push -u origin feature/dark-theme',
          '4. Open Pull Request on GitHub: write a clear description.',
          '5. Code Review & Merge: teammates approve, tests pass, click Merge!'
        ]
      }
    ],
    quiz: {
      question: 'What is the primary purpose of a Pull Request?',
      options: [
        'To ask GitHub for a refund.',
        'To propose changes, conduct code review, and run tests before merging into main.',
        'To compress your project files into a .zip archive.',
        'To delete your GitHub account.'
      ],
      correctAnswer: 1,
      explanation: 'Pull Requests facilitate peer code review, discussions, and continuous integration checks before code is merged.'
    }
  },

  // LEVEL 3: ADVANCED
  {
    id: 'rebasing-vs-merging',
    level: 'advanced',
    levelLabel: 'Level 3',
    order: 11,
    title: 'Rebase vs Merge: The History Debate',
    estimatedTime: '15 mins',
    summary: 'Demystify rebasing. Understand how interactive rebase squashes messy commits into pristine corporate history.',
    objectives: [
      'Understand how rebase replays commits onto a new base.',
      'Learn the Golden Rule of Rebasing (never rebase shared public branches).',
      'Use interactive rebase (git rebase -i) to squash and reword commits.'
    ],
    sections: [
      {
        heading: 'Rebasing in Plain English',
        text: 'Imagine your feature branch was started on Monday from commit A. By Friday, teammates added commits B and C to main. If you rebase, Git detaches your commits, updates your base to commit C, and replays your commits one by one on top.'
      },
      {
        heading: 'Interactive Rebase: Cleaning Up Before PR',
        codeBlock: `# Clean up the last 3 local commits before opening a PR
git rebase -i HEAD~3

# In the editor, you can change:
# pick -> keep commit
# squash / s -> melt commit into the one above it
# reword / r -> fix the commit message`
      }
    ],
    quiz: {
      question: 'What is the Golden Rule of Rebasing?',
      options: [
        'Always rebase every 5 minutes.',
        'Never rebase commits that have already been pushed to a shared public branch.',
        'Rebasing only works on Linux machines.',
        'You must always delete main before rebasing.'
      ],
      correctAnswer: 1,
      explanation: 'Rebasing rewrites commit hashes. If teammates have already based work on those commits, rewriting them causes severe divergence and headache.'
    }
  },
  {
    id: 'stash-magic',
    level: 'advanced',
    levelLabel: 'Level 3',
    order: 12,
    title: 'Git Stash: Pausing Work Gracefully',
    estimatedTime: '10 mins',
    summary: 'Never make half-baked "wip temp" commits again. Use the stash stack to pause, context-switch, and resume work.',
    objectives: [
      'Stash tracked and untracked files.',
      'Inspect stash lists and pop stored work.',
      'Apply stashes across different branches.'
    ],
    sections: [
      {
        heading: 'The Interruption Dilemma',
        text: 'You are 40% through building a complex shopping cart. Suddenly, production goes down and your team needs an urgent hotfix on main right now. Git will not let you switch branches if your modified files clash. What do you do?'
      },
      {
        heading: 'The Stash Solution',
        codeBlock: `# 1. Stash current work safely with a note (including untracked files)
git stash push -u -m "WIP: cart discounts"

# 2. Switch to main, fix the hotfix, commit and push
git switch main
# ... fix bug ...
git commit -m "fix: patch critical checkout bug"
git push

# 3. Return to feature branch and restore stashed work
git switch feature/cart
git stash pop`
      }
    ],
    quiz: {
      question: 'Which flag allows git stash to also save newly created (untracked) files?',
      options: [
        'git stash --all or -u',
        'git stash --force-all',
        'git stash --include-internet',
        'git stash --save-files'
      ],
      correctAnswer: 0,
      explanation: 'By default git stash only saves tracked files. Adding -u (--include-untracked) or -a (--all) also shelves new files.'
    }
  },
  {
    id: 'reset-revert-restore',
    level: 'advanced',
    levelLabel: 'Level 3',
    order: 13,
    title: 'Undoing Things: Reset vs Revert vs Restore',
    estimatedTime: '15 mins',
    summary: 'The ultimate guide to undoing any mistake in Git without losing sleep or code.',
    objectives: [
      'Choose the right undo command for every scenario.',
      'Master git reset --soft vs --hard.',
      'Safely revert pushed commits using git revert.'
    ],
    sections: [
      {
        heading: 'The Decision Matrix',
        bulletList: [
          'Discard uncommitted edits in a file? -> git restore <file>',
          'Unstage a file you added? -> git restore --staged <file>',
          'Undo last local commit (keep code staged)? -> git reset --soft HEAD~1',
          'Undo a commit that is ALREADY pushed to GitHub? -> git revert <commit-hash>'
        ]
      },
      {
        heading: 'Soft Reset vs Hard Reset',
        codeBlock: `# Soft reset: moves HEAD backwards 1 commit, keeps code in staging area
git reset --soft HEAD~1

# Hard reset (DANGER: destroys uncommitted edits!):
git reset --hard HEAD~1`
      }
    ],
    quiz: {
      question: 'Which command should you use to undo a commit that teammates have already pulled from GitHub?',
      options: [
        'git reset --hard HEAD~1',
        'git revert <commit-hash>',
        'git delete commit',
        'git clean -f'
      ],
      correctAnswer: 1,
      explanation: 'git revert creates a brand new forward commit that inverts the changes, leaving existing shared history intact.'
    }
  },
  {
    id: 'merge-conflicts',
    level: 'advanced',
    levelLabel: 'Level 3',
    order: 14,
    title: 'Resolving Merge Conflicts Without Fear',
    estimatedTime: '15 mins',
    summary: 'Learn what conflict markers (<<<<<<<, =======, >>>>>>>) mean and how to resolve them systematically.',
    objectives: [
      'Understand why merge conflicts happen (concurrent edits to the same lines).',
      'Decode conflict markers in your code editor.',
      'Resolve conflicts, stage the resolution, and complete the merge.'
    ],
    sections: [
      {
        heading: 'Why Conflicts Happen',
        text: 'A merge conflict is not an error! It is Git saying: "Two developers changed line 42 of index.html in different ways, and I don\'t know whose version you want to keep. Please pick one."'
      },
      {
        heading: 'Decoding Conflict Markers',
        codeBlock: `<<<<<<< HEAD (Current Change - on your branch)
const buttonColor = "bg-orange-500";
=======
const buttonColor = "bg-blue-600";
>>>>>>> feature-branding (Incoming Change)`
      },
      {
        heading: 'Resolving the Conflict',
        bulletList: [
          '1. Decide whether to keep Current, Incoming, or combine both.',
          '2. Delete the <<<<<<<, =======, >>>>>>> marker lines.',
          '3. Run "git add <file>" to mark it as resolved.',
          '4. Run "git commit" to finish the merge commit!'
        ]
      }
    ],
    quiz: {
      question: 'What should you do after manually editing a conflicted file to keep the desired code?',
      options: [
        'Run "git add <file>" and then "git commit".',
        'Delete the .git directory and clone again.',
        'Run "git drop".',
        'Turn off your computer.'
      ],
      correctAnswer: 0,
      explanation: 'After cleaning conflict markers, staging the file with git add tells Git the conflict is resolved.'
    }
  },
  {
    id: 'git-workflows',
    level: 'advanced',
    levelLabel: 'Level 3',
    order: 15,
    title: 'Real-World Team Git Workflows',
    estimatedTime: '12 mins',
    summary: 'Compare GitHub Flow, Git Flow, and Trunk-Based Development used by high-velocity tech teams.',
    objectives: [
      'Understand GitHub Flow for continuous delivery web apps.',
      'Understand Git Flow for scheduled release cycles (develop, release, hotfix).',
      'Understand Trunk-Based Development with feature flags used at Google and Meta.'
    ],
    sections: [
      {
        heading: '1. GitHub Flow (Most Popular)',
        text: 'Super lightweight: main is always deployable. Create short-lived feature branches, push and open PR, review, merge into main, deploy immediately.'
      },
      {
        heading: '2. Trunk-Based Development (Enterprise Speed)',
        text: 'Developers merge small commits into "main" (the trunk) multiple times a day. Long-lived feature branches are banned. New unfinished features are hidden behind Feature Flags in production.'
      },
      {
        heading: '3. Git Flow (Legacy / Mobile Apps)',
        text: 'Uses long-lived "develop" and "master" branches, alongside "feature/*", "release/*", and "hotfix/*" branches. Great for apps that have strict app store release schedules.'
      }
    ],
    quiz: {
      question: 'In GitHub Flow, what must always be true about the "main" branch?',
      options: [
        'It should always be deployable and stable.',
        'Developers should commit directly to main without reviews.',
        'It must be deleted every Friday.',
        'It must only contain markdown files.'
      ],
      correctAnswer: 0,
      explanation: 'GitHub Flow is built around the principle that main is always kept deployable and protected.'
    }
  }
];

