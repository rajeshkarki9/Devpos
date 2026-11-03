export const COMMAND_CATEGORIES = [
  { id: 'config', name: 'Configuration', count: 3, icon: 'Settings' },
  { id: 'init', name: 'Repository Initialization', count: 2, icon: 'FolderPlus' },
  { id: 'tracking', name: 'Tracking Changes', count: 3, icon: 'FileSearch' },
  { id: 'staging', name: 'Staging & Committing', count: 3, icon: 'CheckSquare' },
  { id: 'history', name: 'Viewing History', count: 3, icon: 'History' },
  { id: 'branching', name: 'Branch Management', count: 4, icon: 'GitBranch' },
  { id: 'merging', name: 'Merging & Rebasing', count: 3, icon: 'GitMerge' },
  { id: 'remotes', name: 'Remote Repositories', count: 3, icon: 'Globe' },
  { id: 'sync', name: 'Pulling & Pushing', count: 3, icon: 'ArrowUpDown' },
  { id: 'undo', name: 'Undoing Changes', count: 3, icon: 'RotateCcw' },
  { id: 'stashing', name: 'Stashing', count: 3, icon: 'Archive' },
  { id: 'tags', name: 'Tags & Releases', count: 2, icon: 'Tag' },
  { id: 'advanced', name: 'Advanced Git', count: 3, icon: 'Cpu' },
];

export const COMMANDS_DATA = [
  // 1. Configuration
  {
    id: 'git-config-user',
    name: 'git config --global user.name',
    category: 'config',
    level: 'Beginner',
    syntax: 'git config --global user.name "Your Name"',
    simpleExplanation: 'Sets the author name associated with all your future Git commits on this machine.',
    whatItDoes: 'Writes your identity to the global Git configuration file (~/.gitconfig), attributing all your commits with this name.',
    whyDevelopersUseIt: 'Git records who made each change. Without this, coworkers or GitHub will not know who authored the commits.',
    whenToUse: 'Right after installing Git on a new computer, or when updating your display name.',
    parameters: [
      { flag: '--global', description: 'Applies to all repositories on your current computer profile.', required: false },
      { flag: '--local', description: 'Applies only to the current repository directory.', required: false },
      { flag: '--system', description: 'Applies to all users on the operating system.', required: false }
    ],
    example: 'git config --global user.name "Alex Morgan"\ngit config --global user.email "alex@example.com"',
    expectedOutput: `(No output on success; updates ~/.gitconfig silently)\n\n# To verify run:\n$ git config user.name\nAlex Morgan`,
    commonMistakes: [
      'Using smart curly quotes from word processors instead of standard ASCII quotes.',
      'Forgetting that this does not automatically link to your GitHub account without the matching email.'
    ],
    relatedCommands: ['git config --list', 'git config user.email'],
    beginnerFriendly: 'Think of this like writing your name on the inside cover of your school notebook so everyone knows who the notes belong to.'
  },
  {
    id: 'git-config-list',
    name: 'git config --list',
    category: 'config',
    level: 'Beginner',
    syntax: 'git config --list [--show-origin]',
    simpleExplanation: 'Prints all currently active Git settings and where they came from.',
    whatItDoes: 'Reads system, global, and local configuration files and prints all key-value configuration pairs.',
    whyDevelopersUseIt: 'To inspect and verify your settings, check which email/username Git is using, or troubleshoot alias or SSH issues.',
    whenToUse: 'When you are unsure if Git is configured correctly, or when author identity seems wrong.',
    parameters: [
      { flag: '--show-origin', description: 'Shows the exact file path where each setting is stored.', required: false },
      { flag: '--global', description: 'Displays only the global user-level configurations.', required: false }
    ],
    example: 'git config --list',
    expectedOutput: `user.name=Alex Morgan\nuser.email=alex@example.com\ncore.editor=code --wait\ninit.defaultBranch=main\ncolor.ui=auto`,
    commonMistakes: [
      'Panic when duplicate keys appear: Git evaluates local over global settings.'
    ],
    relatedCommands: ['git config user.name', 'git config --get'],
    beginnerFriendly: 'Like opening your profile settings page to see all your active preferences at a glance.'
  },
  {
    id: 'git-config-editor',
    name: 'git config --global core.editor',
    category: 'config',
    level: 'Intermediate',
    syntax: 'git config --global core.editor "code --wait"',
    simpleExplanation: 'Configures which text editor opens when Git needs you to write a commit message or resolve an interactive rebase.',
    whatItDoes: 'Replaces the default terminal editor (often Vim or Nano) with your favorite editor like VS Code.',
    whyDevelopersUseIt: 'Beginners frequently get stuck inside Vim and cannot exit; setting VS Code makes editing messages intuitive and stress-free.',
    whenToUse: 'During initial developer workstation setup.',
    parameters: [
      { flag: '"code --wait"', description: 'Tells VS Code to wait for you to close the message tab before continuing.', required: true }
    ],
    example: 'git config --global core.editor "code --wait"',
    expectedOutput: `(Silent success; saves to configuration)`,
    commonMistakes: [
      'Omitting "--wait", which causes Git to believe the editor closed immediately and abort with an empty message.'
    ],
    relatedCommands: ['git config --global user.name'],
    beginnerFriendly: 'Tells Git: "Whenever you need me to type words, open VS Code instead of trapping me in the ancient terminal editor!"'
  },

  // 2. Repository Initialization
  {
    id: 'git-init',
    name: 'git init',
    category: 'init',
    level: 'Beginner',
    syntax: 'git init [directory-name]',
    simpleExplanation: 'Turns any regular project folder into a brand new Git repository.',
    whatItDoes: 'Creates a hidden .git folder inside the target directory containing the internal database, objects, refs, and configuration.',
    whyDevelopersUseIt: 'To start version controlling a new coding project from scratch on your local machine.',
    whenToUse: 'At the very beginning of a new project before making any commits.',
    parameters: [
      { flag: '-b <name>', description: 'Sets the initial default branch name (e.g. -b main).', required: false },
      { flag: '[directory-name]', description: 'Initializes Git inside a new subdirectory instead of current folder.', required: false }
    ],
    example: 'mkdir my-awesome-app\ncd my-awesome-app\ngit init -b main',
    expectedOutput: `Initialized empty Git repository in /Users/developer/my-awesome-app/.git/`,
    commonMistakes: [
      'Running git init inside your Desktop or User root folder by mistake. Always make sure you are inside your specific project folder!',
      'Running git init repeatedly: harmless, but unnecessary once .git exists.'
    ],
    relatedCommands: ['git clone', 'git status'],
    hasDemo: true,
    beginnerFriendly: 'Like putting a security camera and a timestamped logbook inside your folder. From now on, you can snapshot anything that happens here.'
  },
  {
    id: 'git-clone',
    name: 'git clone',
    category: 'init',
    level: 'Beginner',
    syntax: 'git clone <repository-url> [target-directory]',
    simpleExplanation: 'Downloads a complete copy of an existing remote Git repository (e.g. from GitHub) onto your computer.',
    whatItDoes: 'Copies all commits, branches, files, and Git history from the remote server, establishes origin remote tracking, and checks out the default branch.',
    whyDevelopersUseIt: 'To start working on an open-source project or join an existing team codebase.',
    whenToUse: 'When you want to work on a project that is already hosted on GitHub or GitLab.',
    parameters: [
      { flag: '--depth 1', description: 'Performs a shallow clone, downloading only the most recent commit (great for huge repositories).', required: false },
      { flag: '-b <branch>', description: 'Clones and immediately checks out a specific branch.', required: false }
    ],
    example: 'git clone https://github.com/facebook/react.git',
    expectedOutput: `Cloning into 'react'...\nremote: Enumerating objects: 245102, done.\nremote: Counting objects: 100% (245/245), done.\nremote: Compressing objects: 100% (142/142), done.\nReceiving objects: 100% (245102/245102), 125.43 MiB | 12.40 MiB/s, done.\nResolving deltas: 100% (172340/172340), done.`,
    commonMistakes: [
      'Forgetting to "cd <folder-name>" after cloning before running other git commands.',
      'Using SSH URL without having added your SSH public key to GitHub.'
    ],
    relatedCommands: ['git init', 'git remote add'],
    beginnerFriendly: 'Like downloading a digital backup of someone else’s entire project, including every previous version and draft they ever saved.'
  },

  // 3. Tracking Changes
  {
    id: 'git-status',
    name: 'git status',
    category: 'tracking',
    level: 'Beginner',
    syntax: 'git status [-s]',
    simpleExplanation: 'Shows the current state of your working directory and staging area.',
    whatItDoes: 'Scans your files to identify what has been changed, what is staged for the next commit, and what files are untracked by Git.',
    whyDevelopersUseIt: 'It is the most used command in Git. It prevents blind commits and keeps you informed about where your files stand.',
    whenToUse: 'Constantly: before adding files, before committing, before switching branches, and before pushing.',
    parameters: [
      { flag: '-s / --short', description: 'Outputs a concise summary with two-letter status indicators (e.g., M = modified, ?? = untracked).', required: false },
      { flag: '-b', description: 'Shows branch and tracking info even in short format.', required: false }
    ],
    example: 'git status',
    expectedOutput: `On branch main\nYour branch is up to date with 'origin/main'.\n\nChanges to be committed:\n  (use "git restore --staged <file>..." to unstage)\n\t\x1b[32mmodified:   src/App.jsx\x1b[0m\n\nChanges not staged for commit:\n  (use "git add <file>..." to update what will be committed)\n\t\x1b[31mmodified:   package.json\x1b[0m\n\nUntracked files:\n  (use "git add <file>..." to include in what will be committed)\n\t\x1b[31msrc/components/Header.jsx\x1b[0m`,
    commonMistakes: [
      'Assuming files are automatically committed just because they were saved in the code editor.',
      'Misinterpreting "Changes not staged for commit" vs "Changes to be committed".'
    ],
    relatedCommands: ['git diff', 'git add', 'git log'],
    hasDemo: true,
    beginnerFriendly: 'Think of it as asking Git: "What’s the situation right now? What have I changed since my last checkpoint?"'
  },
  {
    id: 'git-diff',
    name: 'git diff',
    category: 'tracking',
    level: 'Intermediate',
    syntax: 'git diff [file] [--staged]',
    simpleExplanation: 'Shows exact line-by-line differences between your current code and the last commit or staging area.',
    whatItDoes: 'Compares text contents and displays added lines in green with a plus (+) and removed lines in red with a minus (-).',
    whyDevelopersUseIt: 'To review your exact changes and catch bugs or unwanted console.logs before staging or committing.',
    whenToUse: 'Before staging files to do a self-code-review.',
    parameters: [
      { flag: '--staged / --cached', description: 'Shows changes that have already been staged with git add.', required: false },
      { flag: 'branch1..branch2', description: 'Compares changes between two branches.', required: false }
    ],
    example: 'git diff src/App.jsx',
    expectedOutput: `diff --git a/src/App.jsx b/src/App.jsx\nindex a1b2c3d..e4f5g6h 100644\n--- a/src/App.jsx\n+++ b/src/App.jsx\n@@ -12,4 +12,5 @@ function App() {\n-  const greeting = "Hello";\n+  const greeting = "Welcome to GitMastery";\n+  console.log("Ready!");\n   return <div>{greeting}</div>;\n }`,
    commonMistakes: [
      'Running git diff and seeing nothing because changes were already staged (use "git diff --staged" to see staged changes!).'
    ],
    relatedCommands: ['git status', 'git show'],
    beginnerFriendly: 'Like putting your old document and new document side-by-side with a red and green highlighter marking every alteration.'
  },
  {
    id: 'git-show',
    name: 'git show',
    category: 'tracking',
    level: 'Intermediate',
    syntax: 'git show [commit-hash]',
    simpleExplanation: 'Inspects a specific commit, showing its author, date, message, and full code diff.',
    whatItDoes: 'Retrieves the snapshot corresponding to the given commit SHA and displays its metadata and code diff.',
    whyDevelopersUseIt: 'To understand what a teammate or past-you changed in a particular commit.',
    whenToUse: 'When reviewing past commits or inspecting changes identified by git log.',
    parameters: [
      { flag: '--stat', description: 'Shows only file names and line count summary instead of full diff.', required: false }
    ],
    example: 'git show 9f3a12b',
    expectedOutput: `commit 9f3a12b489a23910c2e399c6870d8a9f6d5004e1\nAuthor: Alex Morgan <alex@example.com>\nDate:   Mon Nov 2 14:32:00 2026 -0400\n\n    feat: implement dark mode toggle switch\n\n--- a/src/Theme.js\n+++ b/src/Theme.js\n@@ -1,3 +1,5 @@\n+export const isDark = true;`,
    commonMistakes: [
      'Thinking git show modifies any files; it is strictly a read-only inspection command.'
    ],
    relatedCommands: ['git log', 'git diff'],
    beginnerFriendly: 'Like clicking on an old receipt in your bank app to view every single line item and timestamp.'
  },

  // 4. Staging & Committing
  {
    id: 'git-add',
    name: 'git add',
    category: 'staging',
    level: 'Beginner',
    syntax: 'git add <file> | git add .',
    simpleExplanation: 'Moves modified or new files from your working directory into the staging area (index).',
    whatItDoes: 'Marks specific file modifications to be bundled into your next permanent snapshot (commit).',
    whyDevelopersUseIt: 'Git lets you craft atomic, clean commits by choosing precisely which files or lines to include.',
    whenToUse: 'Whenever you have finished a small piece of work and want to prepare it for committing.',
    parameters: [
      { flag: '.', description: 'Stages all changes and new files across the entire repository.', required: false },
      { flag: '-p / --patch', description: 'Interactive mode: review and stage individual code hunks line by line.', required: false },
      { flag: '-u', description: 'Stages modified and deleted files, but ignores new untracked files.', required: false }
    ],
    example: 'git add src/App.jsx package.json',
    expectedOutput: `(No output on success; run "git status" to see files turned green under "Changes to be committed")`,
    commonMistakes: [
      'Using "git add ." blindly and accidentally staging secret credentials, .env files, or node_modules (always use a .gitignore!).',
      'Thinking git add saves your changes permanently (it only stages them; you still need git commit).'
    ],
    relatedCommands: ['git status', 'git commit', 'git restore --staged'],
    hasDemo: true,
    beginnerFriendly: 'Imagine packing a shipping box. You pick which items go inside the box before taping it shut and printing the shipping label.'
  },
  {
    id: 'git-commit',
    name: 'git commit',
    category: 'staging',
    level: 'Beginner',
    syntax: 'git commit -m "Your descriptive message"',
    simpleExplanation: 'Permanently records a snapshot of your staged changes into Git history with an explanatory message.',
    whatItDoes: 'Creates a new commit object containing a SHA-1 hash, tree structure, author identity, timestamp, parent commit reference, and message.',
    whyDevelopersUseIt: 'Commits are your project’s permanent milestones. You can always inspect or travel back to any commit.',
    whenToUse: 'When you finish a logical unit of work (bug fix, new button, refactored function).',
    parameters: [
      { flag: '-m "<message>"', description: 'Sets the commit message directly from the command line.', required: true },
      { flag: '-a', description: 'Automatically stages all tracked modified files before committing.', required: false },
      { flag: '--amend', description: 'Modifies the very last commit (updates message or adds newly staged files).', required: false }
    ],
    example: 'git commit -m "feat(auth): add email validation on signup"',
    expectedOutput: `[main 7f201bc] feat(auth): add email validation on signup\n 2 files changed, 45 insertions(+), 3 deletions(-)\n create mode 100644 src/utils/validation.js`,
    commonMistakes: [
      'Writing vague messages like "update", "fix bug", or "stuff". Good commit messages explain WHAT and WHY.',
      'Attempting to commit without staging anything first, leading to "no changes added to commit".'
    ],
    relatedCommands: ['git add', 'git status', 'git log'],
    hasDemo: true,
    beginnerFriendly: 'Like pressing "Save Game" in a video game checkpoint. If your game crashes later, you can always reload from this checkpoint.'
  },
  {
    id: 'git-commit-amend',
    name: 'git commit --amend',
    category: 'staging',
    level: 'Intermediate',
    syntax: 'git commit --amend [--no-edit]',
    simpleExplanation: 'Modifies the most recent commit by adding new staged changes or fixing the commit message.',
    whatItDoes: 'Replaces the tip of the current branch with a new commit that incorporates your adjustments without creating an extra commit.',
    whyDevelopersUseIt: 'To fix a small typo or include a forgotten file without cluttering the commit history with "oops fix typo".',
    whenToUse: 'Immediately after committing if you realize you made a typo in the message or forgot one file.',
    parameters: [
      { flag: '--no-edit', description: 'Keeps the existing commit message without reopening the editor.', required: false }
    ],
    example: 'git add forgotten-file.js\ngit commit --amend --no-edit',
    expectedOutput: `[main 3c8e91d] feat(auth): add email validation on signup\n Date: Mon Nov 2 14:32:00 2026\n 3 files changed, 52 insertions(+), 3 deletions(-) `,
    commonMistakes: [
      'Amending a commit that has already been pushed to a shared remote branch (it rewrites history and breaks coworkers\' repos!).'
    ],
    relatedCommands: ['git commit', 'git reset'],
    beginnerFriendly: 'Like quickly opening an unsealed envelope you just addressed to drop in a forgotten coupon before mailing it.'
  },

  // 5. Viewing History
  {
    id: 'git-log',
    name: 'git log',
    category: 'history',
    level: 'Beginner',
    syntax: 'git log [--oneline] [--graph]',
    simpleExplanation: 'Displays the chronological commit history of the current repository branch.',
    whatItDoes: 'Traverses the commit graph from HEAD backwards and outputs commit SHAs, authors, dates, and commit messages.',
    whyDevelopersUseIt: 'To understand the evolution of the project, see recent work, find commit hashes, and investigate who changed what.',
    whenToUse: 'When you want to see what was done recently or retrieve a specific commit hash.',
    parameters: [
      { flag: '--oneline', description: 'Compresses each commit into a single neat line with short SHA and title.', required: false },
      { flag: '--graph', description: 'Draws an ASCII visual graph of branches and merge commits.', required: false },
      { flag: '-n <number>', description: 'Limits output to the last N commits (e.g., git log -n 5).', required: false }
    ],
    example: 'git log --oneline --graph --decorate',
    expectedOutput: `* 7f201bc (HEAD -> main, origin/main) feat(auth): add email validation on signup\n* e89b21a feat: create registration form component\n* 4b61fa0 refactor: convert navbar to tailwind\n* 1c90a14 Initial commit`,
    commonMistakes: [
      'Getting stuck in the git log screen! (Press "q" on your keyboard to exit the pager).'
    ],
    relatedCommands: ['git show', 'git diff', 'git blame'],
    hasDemo: true,
    beginnerFriendly: 'Like looking through the historical receipts or journal entries of every single version ever recorded in the project.'
  },
  {
    id: 'git-blame',
    name: 'git blame',
    category: 'history',
    level: 'Intermediate',
    syntax: 'git blame <file-path>',
    simpleExplanation: 'Annotates each line in a file with the commit and author that last modified it.',
    whatItDoes: 'Examines history line-by-line and prints author, date, and commit SHA for every line of code.',
    whyDevelopersUseIt: 'Despite the harsh name, it is used to discover WHY a certain line was written and read its original commit message.',
    whenToUse: 'When encountering weird or unfamiliar code and needing context on its purpose.',
    parameters: [
      { flag: '-L <start>,<end>', description: 'Limits blame output to a specific range of line numbers.', required: false }
    ],
    example: 'git blame -L 10,13 src/utils/auth.js',
    expectedOutput: `7f201bc4 (Alex Morgan 2026-11-02 14:32:00 -0400 10) export function validateEmail(email) {\ne89b21a0 (Sam Taylor  2026-10-28 09:15:22 -0400 11)   const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\ne89b21a0 (Sam Taylor  2026-10-28 09:15:22 -0400 12)   return regex.test(email);\n7f201bc4 (Alex Morgan 2026-11-02 14:32:00 -0400 13) }`,
    commonMistakes: [
      'Thinking "blame" is for blaming people negatively; it is meant for tracing context and commit rationales.'
    ],
    relatedCommands: ['git log', 'git show'],
    beginnerFriendly: 'Like looking at a shared Google Doc revision history to see exactly which classmate wrote paragraph 3.'
  },
  {
    id: 'git-reflog',
    name: 'git reflog',
    category: 'history',
    level: 'Advanced',
    syntax: 'git reflog',
    simpleExplanation: 'The developer safety net: records every time HEAD moved in your local repository.',
    whatItDoes: 'Maintains a private chronological log of all pointer movements (commits, checkouts, rebases, resets), even lost commits.',
    whyDevelopersUseIt: 'To recover "deleted" commits or recover from disastrous mistakes when you think code is gone forever.',
    whenToUse: 'Whenever you accidentally ran a hard reset, deleted a branch with unmerged commits, or lost work during a rebase.',
    parameters: [
      { flag: 'show <branch>', description: 'Shows reflog history specifically for a designated branch.', required: false }
    ],
    example: 'git reflog',
    expectedOutput: `7f201bc HEAD@{0}: commit: feat(auth): add email validation\ne89b21a HEAD@{1}: checkout: moving from feature-login to main\n4b61fa0 HEAD@{2}: reset: moving to HEAD~1\n1c90a14 HEAD@{3}: commit: initial commit`,
    commonMistakes: [
      'Assuming reflog exists on remote GitHub; reflog is completely local to your individual computer.'
    ],
    relatedCommands: ['git reset --hard', 'git cherry-pick'],
    beginnerFriendly: 'The ultimate "Ctrl+Z for Git". Even if you tell Git to delete a branch, Git remembers where it was in the reflog for up to 90 days.'
  },

  // 6. Branch Management
  {
    id: 'git-branch',
    name: 'git branch',
    category: 'branching',
    level: 'Beginner',
    syntax: 'git branch [-a] [-d <branch-name>]',
    simpleExplanation: 'Lists, creates, or deletes branches in your local repository.',
    whatItDoes: 'Manipulates movable pointers that point to specific commit snapshots in your Git graph.',
    whyDevelopersUseIt: 'Branches allow you to work on features or bug fixes in complete isolation without disrupting the main production code.',
    whenToUse: 'When you want to see what branches exist, start a new task, or clean up old merged branches.',
    parameters: [
      { flag: '<new-branch-name>', description: 'Creates a new branch pointing at current commit.', required: false },
      { flag: '-a', description: 'Lists both local and remote-tracking branches.', required: false },
      { flag: '-d <name>', description: 'Safely deletes a branch that has already been merged.', required: false },
      { flag: '-D <name>', description: 'Forces deletion of a branch even if it contains unmerged commits.', required: false }
    ],
    example: 'git branch -a\ngit branch feature-payment',
    expectedOutput: `* \x1b[32mmain\x1b[0m\n  feature-login\n  remotes/origin/HEAD -> origin/main\n  remotes/origin/main`,
    commonMistakes: [
      'Running "git branch <name>" and expecting you are now on that branch! (Creating a branch does not switch to it; use git switch).',
      'Using spaces in branch names (use hyphens or slashes like "feature/user-auth").'
    ],
    relatedCommands: ['git switch', 'git checkout', 'git merge'],
    hasDemo: true,
    beginnerFriendly: 'Think of creating a branch like making a photocopy of a blueprint. You can draw crazy experiments on your copy without ruining the original.'
  },
  {
    id: 'git-switch',
    name: 'git switch',
    category: 'branching',
    level: 'Beginner',
    syntax: 'git switch [-c] <branch-name>',
    simpleExplanation: 'Switches your working directory between different branches.',
    whatItDoes: 'Moves the HEAD pointer to the specified branch and updates all project files in your directory to match that branch snapshot.',
    whyDevelopersUseIt: 'Modern replacement for git checkout that does one single job cleanly without confusing options.',
    whenToUse: 'Whenever you want to work on a different branch or start a new branch.',
    parameters: [
      { flag: '-c <name>', description: 'Creates a brand new branch AND switches to it in one step.', required: false },
      { flag: '-', description: 'Switches back to the previous branch you were on (quick toggle).', required: false }
    ],
    example: 'git switch -c feature-shopping-cart',
    expectedOutput: `Switched to a new branch 'feature-shopping-cart'`,
    commonMistakes: [
      'Switching branches with uncommitted modified files that clash with files on the target branch.'
    ],
    relatedCommands: ['git branch', 'git checkout', 'git stash'],
    hasDemo: true,
    beginnerFriendly: 'Like changing television channels. You hop from the "main" broadcast over to the "feature" channel with a single click.'
  },
  {
    id: 'git-checkout',
    name: 'git checkout',
    category: 'branching',
    level: 'Intermediate',
    syntax: 'git checkout [-b] <branch-or-commit>',
    simpleExplanation: 'Traditional Git command used to switch branches, check out historical commits, or restore files.',
    whatItDoes: 'Updates HEAD and working files to match a branch, tag, or specific historical commit hash.',
    whyDevelopersUseIt: 'Widely used in legacy tutorials and documentation across thousands of StackOverflow answers.',
    whenToUse: 'When switching branches or exploring historical commits in "detached HEAD" state.',
    parameters: [
      { flag: '-b <name>', description: 'Creates and checks out a new branch.', required: false },
      { flag: '<commit-hash>', description: 'Time-travels to view an old commit in detached HEAD mode.', required: false }
    ],
    example: 'git checkout -b feature-dark-mode',
    expectedOutput: `Switched to a new branch 'feature-dark-mode'`,
    commonMistakes: [
      'Confusing branch switching with discarding file changes (which checkout also historically did before "git restore").'
    ],
    relatedCommands: ['git switch', 'git restore'],
    beginnerFriendly: 'The classic Swiss Army knife of Git. Today, "git switch" and "git restore" are preferred for clarity, but checkout is still everywhere.'
  },

  // 7. Merging & Rebasing
  {
    id: 'git-merge',
    name: 'git merge',
    category: 'merging',
    level: 'Intermediate',
    syntax: 'git merge <branch-name> [--no-ff]',
    simpleExplanation: 'Combines independent lines of development into your current branch.',
    whatItDoes: 'Finds the common ancestor of both branches and creates either a Fast-Forward pointer move or a dedicated 3-way Merge Commit.',
    whyDevelopersUseIt: 'To bring completed features from a feature branch back into the main branch or update your feature branch with main.',
    whenToUse: 'When a feature is finished and tested and ready to join main.',
    parameters: [
      { flag: '--no-ff', description: 'Forces creation of a merge commit even if fast-forward is possible (preserves branch shape).', required: false },
      { flag: '--abort', description: 'Cancels the merge process and restores original pre-merge state if conflicts get overwhelming.', required: false }
    ],
    example: '# First make sure you are on main:\ngit switch main\ngit merge feature-login',
    expectedOutput: `Updating 4b61fa0..7f201bc\nFast-forward\n src/components/Login.jsx | 85 ++++++++++++++++++++++++++++++++++++++++++\n 1 file changed, 85 insertions(+)\n create mode 100644 src/components/Login.jsx`,
    commonMistakes: [
      'Forgetting to run "git pull" on main first to make sure your local main is up to date before merging.',
      'Panicking during a merge conflict (just remember you can always run "git merge --abort").'
    ],
    relatedCommands: ['git rebase', 'git branch', 'git status'],
    hasDemo: true,
    beginnerFriendly: 'Like merging two streams of water into a single river. All changes from the tributary flow into the main stream.'
  },
  {
    id: 'git-rebase',
    name: 'git rebase',
    category: 'merging',
    level: 'Advanced',
    syntax: 'git rebase <base-branch> [-i]',
    simpleExplanation: 'Re-applies your branch’s commits on top of the newest tip of another base branch for a clean, linear history.',
    whatItDoes: 'Temporarily stashes your branch’s unique commits, moves the branch pointer to the target base, and replays each commit sequentially.',
    whyDevelopersUseIt: 'Produces a clean, straight-line Git commit history without cluttered merge bubbles or duplicate merge commits.',
    whenToUse: 'To update your feature branch with the newest changes from main before submitting a Pull Request.',
    parameters: [
      { flag: '-i / --interactive', description: 'Interactive mode: squash, reword, drop, or reorder commits.', required: false },
      { flag: '--continue', description: 'Proceeds to next commit after resolving any intermediate conflicts.', required: false },
      { flag: '--abort', description: 'Safely bails out of rebase and returns branch to original untouched state.', required: false }
    ],
    example: 'git switch feature-login\ngit rebase main',
    expectedOutput: `Successfully rebased and updated refs/heads/feature-login.`,
    commonMistakes: [
      'The Golden Rule of Rebasing: NEVER rebase a public branch that teammates have pulled or branched off of.',
      'Forgetting to resolve conflicts commit-by-commit during multi-commit rebases.'
    ],
    relatedCommands: ['git merge', 'git cherry-pick'],
    hasDemo: true,
    beginnerFriendly: 'Instead of tying two branches together with a knot, rebase lifts your entire branch off its old foundation and plants it neatly onto the newest foundation.'
  },
  {
    id: 'git-cherry-pick',
    name: 'git cherry-pick',
    category: 'merging',
    level: 'Advanced',
    syntax: 'git cherry-pick <commit-hash>',
    simpleExplanation: 'Picks an individual commit from any branch and applies its exact changes onto your current branch.',
    whatItDoes: 'Calculates the diff introduced by that specific commit and replays it as a new commit on HEAD.',
    whyDevelopersUseIt: 'Great for backporting critical hotfixes or rescuing a single valuable commit from an abandoned experimental branch.',
    whenToUse: 'When you need just one fix from another branch without merging the other 20 unrelated commits.',
    parameters: [
      { flag: '-n / --no-commit', description: 'Applies changes to working tree and staging area without creating a commit automatically.', required: false }
    ],
    example: 'git switch main\ngit cherry-pick 9f3a12b',
    expectedOutput: `[main a82b4c1] fix(security): sanitize user input in auth form\n Date: Mon Nov 2 15:20:00 2026\n 1 file changed, 12 insertions(+), 2 deletions(-)`,
    commonMistakes: [
      'Cherry-picking commits that rely heavily on prior commits from that branch, causing unexpected conflicts.'
    ],
    relatedCommands: ['git rebase', 'git merge'],
    beginnerFriendly: 'Just like picking one delicious strawberry out of a fruit basket without having to eat the entire basket.'
  },

  // 8. Remote Repositories
  {
    id: 'git-remote',
    name: 'git remote',
    category: 'remotes',
    level: 'Beginner',
    syntax: 'git remote [-v]',
    simpleExplanation: 'Manages and inspects connections to remote repositories like GitHub.',
    whatItDoes: 'Displays names and URLs of remote servers configured for pulling and pushing.',
    whyDevelopersUseIt: 'To verify whether your local repository is connected to GitHub and verify correct fetch/push addresses.',
    whenToUse: 'When setting up a project or checking remote links.',
    parameters: [
      { flag: '-v / --verbose', description: 'Shows exact fetch and push URLs for each remote name.', required: false }
    ],
    example: 'git remote -v',
    expectedOutput: `origin  https://github.com/developer/my-awesome-app.git (fetch)\norigin  https://github.com/developer/my-awesome-app.git (push)`,
    commonMistakes: [
      'Assuming "origin" is a magical keyword; it is simply the standard default nickname for your primary remote repository.'
    ],
    relatedCommands: ['git remote add', 'git push', 'git fetch'],
    beginnerFriendly: 'Like your phone’s contact book. "origin" is the nickname, and the GitHub URL is the phone number.'
  },
  {
    id: 'git-remote-add',
    name: 'git remote add',
    category: 'remotes',
    level: 'Beginner',
    syntax: 'git remote add <name> <url>',
    simpleExplanation: 'Links your local repository to a remote repository hosted on GitHub, GitLab, or Bitbucket.',
    whatItDoes: 'Saves the specified URL under an alias (usually "origin") in your repository config.',
    whyDevelopersUseIt: 'Required whenever you created a local repository with git init and now want to host or backup your code on GitHub.',
    whenToUse: 'Right after creating an empty repository on GitHub for an existing local project.',
    parameters: [
      { flag: '<name>', description: 'The alias name, virtually always "origin".', required: true },
      { flag: '<url>', description: 'The HTTPS or SSH repository clone URL.', required: true }
    ],
    example: 'git remote add origin https://github.com/developer/my-awesome-app.git',
    expectedOutput: `(Silent success; saves to local config)`,
    commonMistakes: [
      'Typing "fatal: remote origin already exists". Fix it by running "git remote set-url origin <new-url>".'
    ],
    relatedCommands: ['git remote', 'git push -u origin main'],
    beginnerFriendly: 'Plugging in the cable between your personal laptop and the cloud server.'
  },

  // 9. Pulling & Pushing
  {
    id: 'git-push',
    name: 'git push',
    category: 'sync',
    level: 'Beginner',
    syntax: 'git push [-u <remote> <branch>]',
    simpleExplanation: 'Uploads your local commits to a remote repository on GitHub.',
    whatItDoes: 'Transfers commit objects, trees, and blobs to the remote server and moves the remote branch pointer forward.',
    whyDevelopersUseIt: 'To publish your code to GitHub, share changes with teammates, and backup your work safely in the cloud.',
    whenToUse: 'After making one or more local commits that you want to share or backup.',
    parameters: [
      { flag: '-u / --set-upstream', description: 'Links local branch to remote branch so future commands just need "git push".', required: false },
      { flag: '--force-with-lease', description: 'Safer force push: overwrites remote only if no teammates pushed in the meantime.', required: false }
    ],
    example: 'git push -u origin main',
    expectedOutput: `Enumerating objects: 5, done.\nCounting objects: 100% (5/5), done.\nWriting objects: 100% (3/3), 320 bytes | 320.00 KiB/s, done.\nTotal 3 (delta 1), reused 0 (delta 0)\nTo https://github.com/developer/my-awesome-app.git\n * [new branch]      main -> main\nBranch 'main' set up to track remote branch 'main' from 'origin'.`,
    commonMistakes: [
      'Getting rejected because remote has newer commits you haven’t pulled yet. (Always run "git pull" first!).',
      'Using raw "git push --force" on shared branches which deletes coworkers\' work.'
    ],
    relatedCommands: ['git pull', 'git fetch', 'git remote'],
    hasDemo: true,
    beginnerFriendly: 'Like uploading your finished homework document to the school cloud drive so your teacher and group can see it.'
  },
  {
    id: 'git-pull',
    name: 'git pull',
    category: 'sync',
    level: 'Beginner',
    syntax: 'git pull [<remote> <branch>]',
    simpleExplanation: 'Fetches new commits from the remote GitHub repository and instantly merges them into your current branch.',
    whatItDoes: 'Combines two operations under the hood: git fetch (downloading data) + git merge (merging downloaded data into local branch).',
    whyDevelopersUseIt: 'To keep your local project synchronized with changes teammates pushed to GitHub.',
    whenToUse: 'At the start of every work day, or before pushing your own new commits.',
    parameters: [
      { flag: '--rebase', description: 'Rebases your local commits on top of incoming remote commits instead of creating a merge commit.', required: false }
    ],
    example: 'git pull origin main',
    expectedOutput: `remote: Enumerating objects: 7, done.\nremote: Counting objects: 100% (7/7), done.\nUnpacking objects: 100% (5/5), 1.2 KiB | 1.20 MiB/s, done.\nFrom https://github.com/developer/my-awesome-app\n * branch            main     -> FETCH_HEAD\nUpdating 7f201bc..d4a19b2\nFast-forward\n src/App.jsx | 12 +++++++++++-\n 1 file changed, 11 insertions(+), 1 deletion(-)`,
    commonMistakes: [
      'Running git pull with uncommitted dirty changes that conflict with incoming commits.'
    ],
    relatedCommands: ['git fetch', 'git push', 'git merge'],
    hasDemo: true,
    beginnerFriendly: 'Like refreshing your email inbox: downloads the newest messages and shows them right on your screen.'
  },
  {
    id: 'git-fetch',
    name: 'git fetch',
    category: 'sync',
    level: 'Intermediate',
    syntax: 'git fetch [<remote>]',
    simpleExplanation: 'Downloads all new commits, branches, and tags from remote without modifying your working files.',
    whatItDoes: 'Updates remote tracking references (like origin/main) without touching your active local branches or working directory.',
    whyDevelopersUseIt: 'The safe way to inspect what teammates have published on GitHub before deciding how to merge it into your code.',
    whenToUse: 'When you want to see if updates exist without risking merge conflicts in your active working code.',
    parameters: [
      { flag: '--all', description: 'Fetches updates from all configured remotes.', required: false },
      { flag: '--prune', description: 'Removes local references to branches that were deleted on GitHub.', required: false }
    ],
    example: 'git fetch origin\ngit log HEAD..origin/main --oneline',
    expectedOutput: `remote: Enumerating objects: 4, done.\nremote: Total 4 (delta 2), reused 4 (delta 2)\nFrom https://github.com/developer/my-awesome-app\n   7f201bc..e89b21a  main       -> origin/main`,
    commonMistakes: [
      'Thinking git fetch updates your files; remember git fetch ONLY downloads data—it never touches your local files until you merge or pull.'
    ],
    relatedCommands: ['git pull', 'git merge'],
    beginnerFriendly: 'Like downloading a package to your front porch. It is safely delivered to your house, but you haven’t opened it inside your living room yet.'
  },

  // 10. Undoing Changes
  {
    id: 'git-restore',
    name: 'git restore',
    category: 'undo',
    level: 'Beginner',
    syntax: 'git restore [--staged] <file-path>',
    simpleExplanation: 'Discards uncommitted changes in your working directory or unstages files.',
    whatItDoes: 'Replaces file contents with the version from the staging area or HEAD commit.',
    whyDevelopersUseIt: 'Modern, safe, unambiguous command introduced to replace the confusing dual role of git checkout.',
    whenToUse: 'When you made experimental edits that didn’t work and want to reset the file back to clean state.',
    parameters: [
      { flag: '--staged', description: 'Unstages a file (removes it from staging area while keeping your changes in the file).', required: false },
      { flag: '.', description: 'Restores all modified files in the current directory.', required: false }
    ],
    example: '# Unstage a file:\ngit restore --staged config.json\n\n# Discard changes in a file:\ngit restore src/broken-feature.js',
    expectedOutput: `(Silent success; file reverted to clean state)`,
    commonMistakes: [
      'Discarding changes with git restore without realizing that unstaged edits cannot be recovered by Git!'
    ],
    relatedCommands: ['git status', 'git reset'],
    beginnerFriendly: 'The real "Revert to Last Saved Version" button for individual files.'
  },
  {
    id: 'git-reset',
    name: 'git reset',
    category: 'undo',
    level: 'Intermediate',
    syntax: 'git reset [--soft | --mixed | --hard] <commit>',
    simpleExplanation: 'Moves your current branch pointer backwards to a previous commit in history.',
    whatItDoes: 'Rewinds HEAD to a prior snapshot, with configurable behavior on whether your staged and working files are preserved.',
    whyDevelopersUseIt: 'To undo the last 1 or 2 commits if you made a mistake or want to reorganize them.',
    whenToUse: 'When you committed too early or committed to the wrong branch locally.',
    parameters: [
      { flag: '--soft', description: 'Rewinds commit history but keeps all your changed code STAGED in index (safest).', required: false },
      { flag: '--mixed', description: 'Default: rewinds commit and unstages changes, keeping files modified in working tree.', required: false },
      { flag: '--hard', description: 'DANGER: completely wipes out commits, staging area, and all uncommitted working files.', required: false }
    ],
    example: '# Undo last commit but keep your changes safely staged:\ngit reset --soft HEAD~1',
    expectedOutput: `(HEAD is now moved back 1 commit; your changes remain intact)`,
    commonMistakes: [
      'Using "git reset --hard" without understanding it will permanently erase uncommitted work.',
      'Resetting commits that were already pushed to a public remote branch.'
    ],
    relatedCommands: ['git revert', 'git restore', 'git reflog'],
    hasDemo: true,
    beginnerFriendly: 'Like rewinding a movie tape. With --soft, you keep your popcorn and notes; with --hard, you throw away everything back to that scene.'
  },
  {
    id: 'git-revert',
    name: 'git revert',
    category: 'undo',
    level: 'Intermediate',
    syntax: 'git revert <commit-hash>',
    simpleExplanation: 'Creates a brand new commit that performs the exact inverse of an earlier commit.',
    whatItDoes: 'Calculates the opposite diff of a past commit and records it as a new commit, preserving history integrity.',
    whyDevelopersUseIt: 'The ONLY safe way to undo a commit that has already been pushed to a shared remote repository like GitHub.',
    whenToUse: 'When a bug made it to production and you must safely rollback without rewriting shared Git history.',
    parameters: [
      { flag: '--no-edit', description: 'Accepts the auto-generated revert commit message without opening an editor.', required: false }
    ],
    example: 'git revert 7f201bc',
    expectedOutput: `[main c9318ef] Revert "feat(auth): add email validation on signup"\n 2 files changed, 3 insertions(+), 45 deletions(-)`,
    commonMistakes: [
      'Using git reset instead of git revert on public branches. Reset breaks coworkers; revert creates a safe forward undo commit.'
    ],
    relatedCommands: ['git reset', 'git log'],
    beginnerFriendly: 'Instead of ripping an old page out of the company ledger book (which looks suspicious), you write a new entry that cancels out the old transaction.'
  },

  // 11. Stashing
  {
    id: 'git-stash',
    name: 'git stash',
    category: 'stashing',
    level: 'Intermediate',
    syntax: 'git stash [push -m "note"]',
    simpleExplanation: 'Temporarily shelves (stashes) your uncommitted changes so you have a completely clean working directory.',
    whatItDoes: 'Saves your dirty working tree and index changes onto a local storage stack and resets your working directory to HEAD.',
    whyDevelopersUseIt: 'When you are midway through a feature and your boss urgently asks you to switch branches to fix a critical bug.',
    whenToUse: 'Whenever you need to switch branches quickly without committing incomplete, half-baked code.',
    parameters: [
      { flag: '-u / --include-untracked', description: 'Also stashes newly created files that haven\'t been tracked yet.', required: false },
      { flag: '-m "<message>"', description: 'Attaches a descriptive note to the stash item.', required: false }
    ],
    example: 'git stash push -m "WIP: login form validation"',
    expectedOutput: `Saved working directory and index state WIP on main: 7f201bc feat(auth): add email validation on signup`,
    commonMistakes: [
      'Forgetting that untracked new files are NOT stashed by default unless you pass "-u".'
    ],
    relatedCommands: ['git stash pop', 'git stash list', 'git stash drop'],
    hasDemo: true,
    beginnerFriendly: 'Like putting all the messy papers on your desk into a drawer and closing it so your desk is clean. When you are ready, you open the drawer and pull them back out.'
  },
  {
    id: 'git-stash-pop',
    name: 'git stash pop',
    category: 'stashing',
    level: 'Intermediate',
    syntax: 'git stash pop [stash@{n}]',
    simpleExplanation: 'Applies the stashed changes back into your working directory and removes them from the stash stack.',
    whatItDoes: 'Restores the most recent stash (or designated index) to your working files and deletes it from the stash list.',
    whyDevelopersUseIt: 'To resume work on the task you paused earlier.',
    whenToUse: 'When you return to your feature branch after finishing the emergency interruption.',
    parameters: [
      { flag: 'stash@{n}', description: 'Pops a specific stash entry instead of the most recent one.', required: false }
    ],
    example: 'git stash pop',
    expectedOutput: `On branch feature-login\nChanges not staged for commit:\n  modified:   src/components/Login.jsx\n\nDropped refs/stash@{0} (a8f3b41...)`,
    commonMistakes: [
      'Popping onto a different branch with conflicting code, causing stash merge conflicts.'
    ],
    relatedCommands: ['git stash apply', 'git stash list'],
    beginnerFriendly: 'Opening the drawer, taking your messy papers back out, and throwing away the storage box.'
  },
  {
    id: 'git-stash-list',
    name: 'git stash list',
    category: 'stashing',
    level: 'Intermediate',
    syntax: 'git stash list',
    simpleExplanation: 'Lists all stored stash entries with their identifiers and notes.',
    whatItDoes: 'Iterates through the stash reflog and displays stash@{0}, stash@{1}, etc.',
    whyDevelopersUseIt: 'To check what uncommitted work you stored away in the past and find the right stash identifier.',
    whenToUse: 'When you have stashed work multiple times and want to review what is saved.',
    parameters: [],
    example: 'git stash list',
    expectedOutput: `stash@{0}: On main: WIP: login form validation\nstash@{1}: WIP on feature-cart: 4b61fa0 refactor navbar`,
    commonMistakes: [
      'Accumulating dozens of forgotten stashes. Stashes should be temporary; clean them up with "git stash clear" or "git stash drop".'
    ],
    relatedCommands: ['git stash pop', 'git stash drop'],
    beginnerFriendly: 'Checking the labels on the boxes in your storage closet.'
  },

  // 12. Tags
  {
    id: 'git-tag',
    name: 'git tag',
    category: 'tags',
    level: 'Intermediate',
    syntax: 'git tag [-a <tag-name> -m "msg"]',
    simpleExplanation: 'Marks a specific point in Git history as important, typically used for version releases (e.g., v1.0.0).',
    whatItDoes: 'Creates an immutable pointer to a commit. Unlike branches, tags never change or move when new commits are created.',
    whyDevelopersUseIt: 'To mark software releases, changelog milestones, and semantic versions (SemVer) for deployment.',
    whenToUse: 'Whenever releasing a new version of your software to production or publishing a package.',
    parameters: [
      { flag: '-a <name>', description: 'Creates an annotated tag with author, date, and message (recommended).', required: false },
      { flag: '-m "<msg>"', description: 'Sets the tag annotation release note message.', required: false },
      { flag: '-l "<pattern>"', description: 'Lists tags matching a wildcard pattern (e.g., -l "v1.*").', required: false }
    ],
    example: 'git tag -a v1.0.0 -m "Release version 1.0.0: Initial public launch"',
    expectedOutput: `(Tag created locally; run "git tag" to see it in list)`,
    commonMistakes: [
      'Assuming "git push" sends tags to GitHub. Tags are NOT pushed by default! You must run "git push origin v1.0.0" or "git push --tags".'
    ],
    relatedCommands: ['git push --tags', 'git show <tag-name>'],
    beginnerFriendly: 'Like putting a gold medal bookmark on a specific page of a history book. While regular bookmarks move, this one stays forever on page 100.'
  },
  {
    id: 'git-push-tags',
    name: 'git push --tags',
    category: 'tags',
    level: 'Intermediate',
    syntax: 'git push origin --tags',
    simpleExplanation: 'Pushes all your locally created tags to the remote GitHub repository.',
    whatItDoes: 'Transfers tag refs to the remote server, triggering GitHub Releases and automated release workflows.',
    whyDevelopersUseIt: 'Because regular git push commands intentionally do not transmit local tags.',
    whenToUse: 'Right after creating a new release tag locally.',
    parameters: [
      { flag: 'origin <tag-name>', description: 'Pushes one specific tag instead of all tags.', required: false }
    ],
    example: 'git push origin --tags',
    expectedOutput: `Total 0 (delta 0), reused 0 (delta 0)\nTo https://github.com/developer/my-awesome-app.git\n * [new tag]         v1.0.0 -> v1.0.0`,
    commonMistakes: [
      'Pushing experimental test tags unintentionally when using the broad --tags flag.'
    ],
    relatedCommands: ['git tag', 'git push'],
    beginnerFriendly: 'Broadcasting your release milestone to GitHub so everyone can download the official v1.0.0 release.'
  },

  // 13. Advanced Git
  {
    id: 'git-bisect',
    name: 'git bisect',
    category: 'advanced',
    level: 'Advanced',
    syntax: 'git bisect <start | bad | good | reset>',
    simpleExplanation: 'Uses binary search to find the exact commit that introduced a bug in your codebase.',
    whatItDoes: 'Splits commit history in half iteratively: tests a midpoint commit, asks you if it is good or bad, and pinpoints the culprit in log2(N) steps.',
    whyDevelopersUseIt: 'When a feature worked 2 months ago and is broken today, but nobody knows which of the 500 commits broke it.',
    whenToUse: 'For hunting down elusive regression bugs in large codebases.',
    parameters: [
      { flag: 'start', description: 'Begins a bisect session.', required: true },
      { flag: 'bad', description: 'Marks current (or specified) commit as containing the bug.', required: true },
      { flag: 'good <commit>', description: 'Marks an older known commit where the bug did not exist.', required: true }
    ],
    example: 'git bisect start\ngit bisect bad HEAD\ngit bisect good v1.0.0',
    expectedOutput: `Bisecting: 12 revisions left to test after this (roughly 4 steps)\n[8a2bc41] refactor(api): change payload serializer`,
    commonMistakes: [
      'Forgetting to run "git bisect reset" when done, leaving your repository stranded in a detached HEAD state.'
    ],
    relatedCommands: ['git log', 'git blame'],
    beginnerFriendly: 'The "Number Guessing Game" for bugs. If a bug happened between commit 1 and commit 100, Git tests commit 50, then 25, then 12. In 7 quick checks, it finds the exact buggy commit!'
  },
  {
    id: 'git-worktree',
    name: 'git worktree',
    category: 'advanced',
    level: 'Advanced',
    syntax: 'git worktree add <path> <branch>',
    simpleExplanation: 'Allows you to check out and work on multiple Git branches simultaneously in separate folders from one repo.',
    whatItDoes: 'Creates an additional working directory linked to the same underlying .git storage database.',
    whyDevelopersUseIt: 'Run long tests or dev servers on branch A while simultaneously writing code on branch B without stash juggling.',
    whenToUse: 'When you need to review a coworker\'s PR or run an intense build without interrupting your current local changes.',
    parameters: [
      { flag: 'add <path> <branch>', description: 'Creates a new directory and checks out that branch into it.', required: true },
      { flag: 'list', description: 'Lists all active linked worktrees.', required: false },
      { flag: 'remove <path>', description: 'Cleans up a linked worktree.', required: false }
    ],
    example: 'git worktree add ../hotfix-folder hotfix-branch',
    expectedOutput: `Preparing worktree (checking out 'hotfix-branch')\nHEAD is now at 7f201bc fix(urgent): patch auth bypass`,
    commonMistakes: [
      'Attempting to check out the same branch in two different worktrees at the same time (Git disallows this to prevent race conflicts).'
    ],
    relatedCommands: ['git switch', 'git stash'],
    beginnerFriendly: 'Like having two monitors showing two separate branches of the exact same repository at the same instant.'
  },
  {
    id: 'git-submodule',
    name: 'git submodule',
    category: 'advanced',
    level: 'Advanced',
    syntax: 'git submodule add <url> [path]',
    simpleExplanation: 'Embeds an external Git repository inside a subfolder of your own Git repository.',
    whatItDoes: 'Tracks an exact commit hash of an external repository as a sub-tree reference.',
    whyDevelopersUseIt: 'To include shared libraries, design systems, or third-party engines while keeping their Git histories independent.',
    whenToUse: 'When building monolithic architectures that consume independent open-source or shared repositories.',
    parameters: [
      { flag: 'update --init --recursive', description: 'Clones and initializes all nested submodules after cloning the parent repo.', required: false }
    ],
    example: 'git submodule add https://github.com/company/shared-ui.git libs/shared-ui',
    expectedOutput: `Cloning into 'c:/Users/developer/my-awesome-app/libs/shared-ui'...\ndone.\n[main 3c189ab] Added submodule libs/shared-ui`,
    commonMistakes: [
      'Cloning a repo with submodules and wondering why the submodule folder is empty! (You must pass "git clone --recursive" or "git submodule update --init").'
    ],
    relatedCommands: ['git clone --recursive'],
    beginnerFriendly: 'Like putting a framed picture of another artist inside your art gallery, with a note citing where to find their original studio.'
  }
];

