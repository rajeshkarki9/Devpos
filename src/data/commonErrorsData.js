export const COMMON_ERRORS = [
  {
    id: 'wrong-branch-committed',
    panicLevel: 'High',
    title: 'I committed to the wrong branch (e.g. directly to main)!',
    scenario: 'You wrote 3 commits on "main" when you should have created a feature branch.',
    solutionTitle: 'Move commits to a new branch without losing work',
    steps: [
      {
        cmd: 'git branch feature-my-feature',
        desc: 'Create new feature branch at current commit (retaining your commits).'
      },
      {
        cmd: 'git reset --hard HEAD~1',
        desc: 'Rewind main back 1 commit (or HEAD~3 if 3 commits).'
      },
      {
        cmd: 'git switch feature-my-feature',
        desc: 'Switch to your feature branch where your commits are safely preserved!'
      }
    ],
    explanation: 'Creating the feature branch copies the pointer to your latest commit. Resetting main rewinds main only, leaving your new branch untouched.'
  },
  {
    id: 'fix-last-commit-message',
    panicLevel: 'Low',
    title: 'I made a typo in my last commit message!',
    scenario: 'You committed with a typo or incomplete description.',
    solutionTitle: 'Amend the commit message',
    steps: [
      {
        cmd: 'git commit --amend -m "feat: your new correct message"',
        desc: 'Overwrites the message of the most recent local commit.'
      }
    ],
    explanation: 'As long as the commit has NOT been pushed to GitHub, amend safely rewrites the message.'
  },
  {
    id: 'forgot-file-in-commit',
    panicLevel: 'Low',
    title: 'I forgot to include a file in the last commit!',
    scenario: 'You just ran git commit, then realized you forgot to stage config.json.',
    solutionTitle: 'Add forgotten file into the last commit',
    steps: [
      {
        cmd: 'git add config.json',
        desc: 'Stage the forgotten file.'
      },
      {
        cmd: 'git commit --amend --no-edit',
        desc: 'Fold the staged file into the previous commit without altering the message.'
      }
    ],
    explanation: '--amend incorporates staged changes right into the HEAD commit.'
  },
  {
    id: 'merge-conflict-panic',
    panicLevel: 'Medium',
    title: 'I ran git merge and got hit with terrifying merge conflicts!',
    scenario: 'Terminal displays: "CONFLICT (content): Merge conflict in src/App.jsx Automatic merge failed".',
    solutionTitle: 'Abort the merge or safely resolve',
    steps: [
      {
        cmd: 'git merge --abort',
        desc: 'EMERGENCY CANCEL: Restores your project to the exact state before you started the merge.'
      },
      {
        cmd: '# OR to resolve: open the file in VS Code, choose "Accept Current Change" or "Accept Incoming Change", then:',
        desc: 'Choose the correct lines.'
      },
      {
        cmd: 'git add src/App.jsx && git commit -m "fix: resolve merge conflicts"',
        desc: 'Stages resolved file and completes the merge.'
      }
    ],
    explanation: 'git merge --abort is the magical undo button for any scary merge attempt.'
  },
  {
    id: 'pushed-secret-api-key',
    panicLevel: 'Critical',
    title: 'I accidentally committed and pushed a secret API key or password to GitHub!',
    scenario: 'You pushed a file containing a private Stripe, OpenAI, or database key to a public repository.',
    solutionTitle: 'Revoke key immediately, remove file, and rewrite history',
    steps: [
      {
        cmd: '# STEP 1 (IMMEDIATE): Revoke the key in your provider dashboard (AWS, Stripe, OpenAI).',
        desc: 'Assume bots already scraped it.'
      },
      {
        cmd: 'echo ".env" >> .gitignore && git rm --cached .env',
        desc: 'Untrack the secret file while keeping it locally.'
      },
      {
        cmd: 'git commit -m "security: untrack .env file"',
        desc: 'Commit the removal.'
      },
      {
        cmd: 'git push origin main',
        desc: 'Push removal to remote.'
      }
    ],
    explanation: 'GitHub repository history contains all past commits. Rotating/invalidating the leaked credential at the vendor dashboard is step #1!'
  },
  {
    id: 'detached-head-state',
    panicLevel: 'Medium',
    title: 'Git says: "You are in \'detached HEAD\' state"!',
    scenario: 'You checked out an old commit hash or tag directly and aren\'t on any branch.',
    solutionTitle: 'Safely save changes to a new branch or return home',
    steps: [
      {
        cmd: 'git switch -c rescue-experimental-work',
        desc: 'Saves any changes made in detached HEAD state onto a real branch.'
      },
      {
        cmd: '# OR if you just want to go back to normal main:',
        desc: 'Return to main branch:'
      },
      {
        cmd: 'git switch main',
        desc: 'Leaves detached HEAD state and returns to main.'
      }
    ],
    explanation: 'Detached HEAD simply means HEAD points to a commit hash directly rather than through a named branch pointer.'
  },
  {
    id: 'undo-hard-reset',
    panicLevel: 'Critical',
    title: 'I ran git reset --hard and lost my commits!',
    scenario: 'You accidentally wiped your recent commits using git reset --hard.',
    solutionTitle: 'Recover lost commits using git reflog',
    steps: [
      {
        cmd: 'git reflog',
        desc: 'Find the commit hash right before you ran reset (e.g., HEAD@{1} -> 7f201bc).'
      },
      {
        cmd: 'git reset --hard 7f201bc',
        desc: 'Rewinds your repository directly back to the lost commit!'
      }
    ],
    explanation: 'Git almost never deletes commit objects immediately. The reflog keeps records of where HEAD was for 30 to 90 days.'
  },
  {
    id: 'rejected-push-error',
    panicLevel: 'Medium',
    title: 'Git rejected my push: "error: failed to push some refs... Updates were rejected"',
    scenario: 'A teammate pushed commits to GitHub that your local machine does not have yet.',
    solutionTitle: 'Pull remote changes first, then push',
    steps: [
      {
        cmd: 'git pull --rebase origin main',
        desc: 'Replays your local commits cleanly on top of incoming remote commits.'
      },
      {
        cmd: 'git push origin main',
        desc: 'Pushes your commits now that your local branch is up to date.'
      }
    ],
    explanation: 'Git protects teammates by refusing to overwrite remote history unless you sync first.'
  }
];

