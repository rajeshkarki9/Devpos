export const GITHUB_TOPICS = [
  {
    id: 'git-vs-github',
    title: 'Git vs GitHub',
    icon: 'Layers',
    summary: 'The difference between the command-line tool and the cloud collaboration platform.',
    content: {
      intro: 'One of the most frequent confusions for beginners is conflating Git with GitHub. They are related, but completely different things!',
      table: [
        { feature: 'What is it?', git: 'A distributed command-line Version Control System software.', github: 'A cloud hosting platform and web service built for Git repositories.' },
        { feature: 'Where it runs', git: 'Locally on your personal computer.', github: 'In the cloud on Microsoft/GitHub data center servers.' },
        { feature: 'Created by', git: 'Linus Torvalds in 2005 (Open Source).', github: 'Chris Wanstrath, PJ Hyett, Tom Preston-Werner in 2008 (Acquired by Microsoft in 2018).' },
        { feature: 'Internet required?', git: 'No. Works 100% offline without any internet connection.', github: 'Yes. Needs internet to push, pull, view PRs, and collaborate.' },
        { feature: 'User Interface', git: 'Terminal CLI (Command Line Interface).', github: 'Rich graphical web browser UI + Desktop apps + Mobile apps.' },
        { feature: 'Competitors', git: 'Mercurial, Subversion (SVN), Perforce.', github: 'GitLab, Bitbucket, AWS CodeCommit, SourceForge.' }
      ]
    }
  },
  {
    id: 'ssh-setup',
    title: 'Authentication & SSH Keys',
    icon: 'Key',
    summary: 'Authenticate securely without typing your password on every push.',
    content: {
      steps: [
        {
          step: 1,
          title: 'Generate an Ed25519 SSH Key',
          desc: 'Open your terminal and run:',
          code: 'ssh-keygen -t ed25519 -C "your_email@example.com"'
        },
        {
          step: 2,
          title: 'Start the SSH Agent & Add Key',
          desc: 'Ensure ssh-agent is running in your background:',
          code: 'eval "$(ssh-agent -s)"\nssh-add ~/.ssh/id_ed25519'
        },
        {
          step: 3,
          title: 'Copy Public Key to Clipboard',
          desc: 'Copy your public key (never share your private key without .pub!):',
          code: '# macOS:\npbcopy < ~/.ssh/id_ed25519.pub\n# Windows PowerShell:\nGet-Content ~/.ssh/id_ed25519.pub | Set-Clipboard'
        },
        {
          step: 4,
          title: 'Add to GitHub Settings',
          desc: 'Go to GitHub.com -> Settings -> SSH and GPG Keys -> New SSH Key, paste your key, and click "Add SSH Key".'
        }
      ]
    }
  },
  {
    id: 'repo-creation',
    title: 'Creating Repositories (Public vs Private)',
    icon: 'FolderGit2',
    summary: 'Set up new remote repositories with appropriate visibility, licensing, and documentation.',
    content: {
      types: [
        {
          type: 'Public Repository',
          desc: 'Anyone on the internet can see your code, fork it, and submit pull requests. Essential for portfolio projects and open-source packages.',
          recommendedFor: 'Showcases, tutorials, libraries, resume projects.'
        },
        {
          type: 'Private Repository',
          desc: 'Only you and collaborators you specifically invite can view or contribute to the repository.',
          recommendedFor: 'Commercial client projects, secret startup ideas, homework assignments.'
        }
      ]
    }
  },
  {
    id: 'readme-guide',
    title: 'Crafting an Awesome README.md',
    icon: 'FileText',
    summary: 'The face of your project. Learn the essential anatomy of a README that impresses hiring managers.',
    content: {
      sections: [
        { name: '1. Project Title & Catchy Tagline', desc: 'State what the project is in one sentence.' },
        { name: '2. Badges & Live Demo Link', desc: 'Deploy preview, build status, license tag, link to hosted site.' },
        { name: '3. Screenshots / GIF Walkthrough', desc: 'Visual proof of your working UI.' },
        { name: '4. Key Features List', desc: 'Highlight the coolest capabilities.' },
        { name: '5. Quick Start / Installation', desc: 'Exact commands to run the app locally (npm install, npm run dev).' },
        { name: '6. Tech Stack', desc: 'Icons or list of technologies used.' },
        { name: '7. License & Author', desc: 'MIT, Apache 2.0, contact links.' }
      ]
    }
  },
  {
    id: 'gitignore-mastery',
    title: 'Mastering .gitignore',
    icon: 'FileCode2',
    summary: 'Prevent API keys, dependencies, and temporary files from ever leaking to GitHub.',
    content: {
      rules: [
        'Place the .gitignore file at the root of your project.',
        'Never commit node_modules, .env, or secret API credentials.',
        'If a file was already committed before being added to .gitignore, untrack it with: git rm --cached <file>.'
      ]
    }
  },
  {
    id: 'fork-vs-clone',
    title: 'Forking vs Cloning',
    icon: 'GitFork',
    summary: 'Understand the distinct roles of forks and clones in open source contributions.',
    content: {
      fork: {
        title: 'Forking (GitHub Server Level)',
        desc: 'Creates a copy of someone else\'s repository on YOUR GitHub account in the cloud. You have full write permissions to your fork without affecting the original repository.'
      },
      clone: {
        title: 'Cloning (Local Computer Level)',
        desc: 'Downloads a repository (whether yours, a company repo, or an open-source project) from GitHub directly onto your local machine’s hard drive.'
      }
    }
  },
  {
    id: 'github-pages',
    title: 'Free Hosting with GitHub Pages',
    icon: 'Globe',
    summary: 'Host static HTML/CSS/JS websites, React apps, and documentation directly from your repository for free.',
    content: {
      steps: [
        '1. Push your build output or index.html to GitHub.',
        '2. Go to Repository Settings -> Pages tab.',
        '3. Select source branch (e.g. "main" or "gh-pages") and root folder / (root) or /docs.',
        '4. Click Save. Your website is live at: https://<username>.github.io/<repo-name>!'
      ]
    }
  },
  {
    id: 'github-actions',
    title: 'GitHub Actions & CI/CD Fundamentals',
    icon: 'Zap',
    summary: 'Automate testing, linting, building, and deploying your code whenever you push commits.',
    content: {
      explanation: 'GitHub Actions is an automation platform built right into GitHub. You write YAML files in .github/workflows/ to define triggers (like push or pull_request) and jobs (like running unit tests or deploying to production).',
      sampleYaml: `name: CI Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          
      - name: Install Dependencies
        run: npm ci
        
      - name: Run Tests
        run: npm test`
    }
  }
];

