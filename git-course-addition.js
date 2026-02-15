// This file contains additional Git course content to be manually integrated

// Add these lessons to Module 1 after the first lesson
// Add these additional modules after Module 1

// Additional lessons for Module 1 (add after 'what-is-git' lesson, before closing of Module 1)
,{
    id: 'basic-git-commands',
    title: 'Basic Git Commands and Your First Repository',
    duration: '60 min',
    content: `
        <h2>Creating Your First Repository</h2>
        <p>There are two ways to start working with a Git repository:</p>

        <h3>Method 1: Initialize a New Repository</h3>
        <p>Start a new Git repository in an existing project:</p>

        <div class="code-block"># Navigate to your project directory
cd /path/to/my-project

# Initialize Git repository
git init

# Output:
# Initialized empty Git repository in /path/to/my-project/.git/</div>

        <p>This creates a hidden <code>.git</code> directory that contains all the Git metadata and history. <strong>Never manually edit files in .git</strong> - use Git commands instead.</p>

        <h3>Method 2: Clone an Existing Repository</h3>
        <p>Download a copy of an existing repository from a remote server:</p>

        <div class="code-block"># Clone from GitHub
git clone https://github.com/username/repository.git

# Clone and rename the directory
git clone https://github.com/username/repository.git my-custom-name

# Clone using SSH (faster, more secure)
git clone git@github.com:username/repository.git</div>

        <p>Cloning automatically sets up the remote repository as "origin" and downloads all branches and history.</p>

        <h2>Checking Repository Status</h2>
        <p>The most frequently used Git command is <code>git status</code>. It shows you the current state of your working directory and staging area:</p>

        <div class="code-block">git status

# Output example:
On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   index.html

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        new-file.js

no changes added to commit (use "git add" and/or "git commit -a")</div>

        <p>This tells us:</p>
        <ul style="margin: 1rem 0; margin-left: 2rem;">
            <li>We're on the "main" branch</li>
            <li>index.html has been modified but not staged</li>
            <li>new-file.js is a new file that Git isn't tracking yet</li>
            <li>No changes are staged for commit</li>
        </ul>

        <h3>Short Status</h3>
        <div class="code-block">git status -s
# Or
git status --short

# Output:
 M index.html
?? new-file.js

# Legend:
# ?? = untracked
# A  = added to staging
# M  = modified
# D  = deleted
# MM = modified, staged, then modified again</div>

        <h2>Tracking Files: git add</h2>
        <p>To start tracking a new file or to stage changes, use <code>git add</code>:</p>

        <div class="code-block"># Add a specific file
git add index.html

# Add multiple files
git add index.html styles.css script.js

# Add all files in current directory
git add .

# Add all files in the repository
git add -A
# Or
git add --all

# Add all files with a specific extension
git add *.js

# Add all files in a directory
git add src/

# Interactive staging (choose what to stage)
git add -p
# Or
git add --patch</div>

        <h3>Understanding git add -p (Patch Mode)</h3>
        <p>Patch mode lets you stage portions of a file, not the whole file:</p>

        <div class="code-block">git add -p index.html

# Git will show each change and ask:
Stage this hunk [y,n,q,a,d,s,e,?]?

# Options:
# y - stage this hunk
# n - do not stage this hunk
# q - quit; do not stage this or remaining hunks
# a - stage this and all remaining hunks
# d - do not stage this or remaining hunks
# s - split the hunk into smaller hunks
# e - manually edit the hunk
# ? - print help</div>

        <h2>Committing Changes: git commit</h2>
        <p>Once you've staged your changes, you can commit them to the repository:</p>

        <div class="code-block"># Commit with inline message
git commit -m "Add user authentication feature"

# Commit with detailed message (opens editor)
git commit

# Stage all modified/deleted files and commit (skips git add)
git commit -a -m "Update homepage"
# Or
git commit -am "Update homepage"

# Amend the last commit (change message or add forgotten files)
git commit --amend

# Amend without changing the message
git commit --amend --no-edit</div>

        <h3>Writing Good Commit Messages</h3>
        <p>A good commit message makes collaboration easier. Follow this convention:</p>

        <div class="code-block"># Format:
# <type>: <subject>
#
# <body>
#
# <footer>

# Example:
feat: Add user login functionality

- Implement JWT authentication
- Add login form validation
- Create user session management
- Add password encryption with bcrypt

Closes #123</div>

        <h4>Common Commit Types:</h4>
        <ul style="margin: 1rem 0; margin-left: 2rem;">
            <li><strong>feat:</strong> New feature</li>
            <li><strong>fix:</strong> Bug fix</li>
            <li><strong>docs:</strong> Documentation changes</li>
            <li><strong>style:</strong> Code style changes (formatting, semicolons, etc.)</li>
            <li><strong>refactor:</strong> Code refactoring</li>
            <li><strong>test:</strong> Adding or updating tests</li>
            <li><strong>chore:</strong> Maintenance tasks, dependencies</li>
        </ul>

        <h4>Best Practices:</h4>
        <ul style="margin: 1rem 0; margin-left: 2rem;">
            <li>Use imperative mood: "Add feature" not "Added feature"</li>
            <li>First line should be 50 characters or less</li>
            <li>Separate subject from body with a blank line</li>
            <li>Wrap body at 72 characters</li>
            <li>Explain WHAT and WHY, not HOW (code shows how)</li>
        </ul>

        <h2>Viewing History: git log</h2>
        <p>See the commit history of your repository:</p>

        <div class="code-block"># Basic log
git log

# Output:
commit 24b9da6552252987aa493b52f8696cd6d3b00373
Author: John Doe <john@example.com>
Date:   Mon Jan 15 14:30:25 2024 -0500

    Add user authentication feature

commit 9fceb02d0ae598e95dc970b74767f19372d61af8
Author: Jane Smith <jane@example.com>
Date:   Sun Jan 14 10:15:00 2024 -0500

    Initial commit</div>

        <h3>Useful git log Options</h3>

        <div class="code-block"># One line per commit
git log --oneline

# Show last 5 commits
git log -5

# Show commits with diff
git log -p

# Show stats (files changed, insertions/deletions)
git log --stat

# Graphical representation
git log --graph --oneline --all

# Pretty format
git log --pretty=format:"%h - %an, %ar : %s"
# %h = short hash
# %an = author name
# %ar = author date, relative
# %s = subject

# Show commits by author
git log --author="John Doe"

# Show commits in date range
git log --since="2 weeks ago"
git log --after="2024-01-01" --before="2024-01-31"

# Show commits that modified a specific file
git log -- index.html

# Search commit messages
git log --grep="authentication"</div>

        <h2>Viewing Changes: git diff</h2>
        <p>See what has changed in your files:</p>

        <div class="code-block"># Show unstaged changes (working directory vs staging area)
git diff

# Show staged changes (staging area vs last commit)
git diff --staged
# Or
git diff --cached

# Show all changes (staged + unstaged)
git diff HEAD

# Compare specific file
git diff index.html

# Compare two commits
git diff commit1 commit2

# Compare two branches
git diff main feature-branch

# Show only file names that changed
git diff --name-only

# Show stat summary
git diff --stat</div>

        <h2>Ignoring Files: .gitignore</h2>
        <p>Some files shouldn't be tracked by Git (logs, dependencies, sensitive data). Create a <code>.gitignore</code> file:</p>

        <div class="code-block"># .gitignore file

# Dependencies
node_modules/
vendor/

# Build outputs
dist/
build/
*.o
*.exe

# Logs
*.log
logs/

# Environment variables (sensitive!)
.env
.env.local
config/secrets.yml

# IDE files
.vscode/
.idea/
*.swp

# OS files
.DS_Store
Thumbs.db

# Temporary files
*.tmp
*.temp
~*

# Specific file
config/database.yml</div>

        <h3>Gitignore Patterns</h3>
        <div class="code-block"># Ignore all .txt files
*.txt

# But track this specific .txt file
!important.txt

# Ignore all files in a directory
logs/

# Ignore files only in root
/TODO

# Ignore files in any directory named temp
**/temp/

# Ignore all .pdf files in doc/ and subdirectories
doc/**/*.pdf</div>

        <h3>Global Gitignore</h3>
        <p>Ignore files across all your repositories:</p>

        <div class="code-block"># Create global gitignore
touch ~/.gitignore_global

# Configure Git to use it
git config --global core.excludesfile ~/.gitignore_global

# Add your global ignores
echo ".DS_Store" >> ~/.gitignore_global
echo "*.swp" >> ~/.gitignore_global</div>

        <h2>Removing Files: git rm</h2>

        <div class="code-block"># Remove file from Git AND filesystem
git rm file.txt

# Remove file from Git but keep in filesystem
git rm --cached file.txt

# Remove directory recursively
git rm -r logs/

# Force removal (if file has changes)
git rm -f file.txt</div>

        <h2>Moving/Renaming Files: git mv</h2>

        <div class="code-block"># Rename file
git mv old-name.txt new-name.txt

# Move file to directory
git mv file.txt src/

# This is equivalent to:
mv old-name.txt new-name.txt
git rm old-name.txt
git add new-name.txt</div>

        <h2>Undoing Changes</h2>

        <h3>Unstage Files</h3>
        <div class="code-block"># Unstage specific file (keep changes in working directory)
git restore --staged file.txt
# Or (older way)
git reset HEAD file.txt

# Unstage all files
git restore --staged .</div>

        <h3>Discard Changes in Working Directory</h3>
        <div class="code-block"># Discard changes to specific file (DANGEROUS - cannot undo!)
git restore file.txt
# Or (older way)
git checkout -- file.txt

# Discard all changes
git restore .

# WARNING: This permanently deletes uncommitted changes!</div>

        <h3>Undo Last Commit (Keep Changes)</h3>
        <div class="code-block"># Undo commit, keep changes staged
git reset --soft HEAD~1

# Undo commit, keep changes unstaged
git reset --mixed HEAD~1
# Or just
git reset HEAD~1

# Undo commit and discard changes (DANGEROUS!)
git reset --hard HEAD~1</div>

        <h2>Practical Example Workflow</h2>

        <div class="code-block"># 1. Create a new project
mkdir my-project
cd my-project
git init

# 2. Create initial files
echo "# My Project" > README.md
echo "console.log('Hello');" > app.js

# 3. Check status
git status
# Untracked files: README.md, app.js

# 4. Stage files
git add README.md app.js

# 5. Check status again
git status
# Changes to be committed: new file README.md, new file app.js

# 6. Commit
git commit -m "Initial commit: Add README and app.js"

# 7. Make changes
echo "# Installation" >> README.md

# 8. Check what changed
git diff
# Shows the line you added

# 9. Stage and commit
git add README.md
git commit -m "docs: Add installation section to README"

# 10. View history
git log --oneline
# Shows your two commits</div>

        <h2>Summary</h2>
        <p>Key commands learned:</p>
        <ul style="margin: 1rem 0; margin-left: 2rem;">
            <li><strong>git init</strong> - Create new repository</li>
            <li><strong>git clone</strong> - Copy existing repository</li>
            <li><strong>git status</strong> - Check current state</li>
            <li><strong>git add</strong> - Stage changes</li>
            <li><strong>git commit</strong> - Save changes to repository</li>
            <li><strong>git log</strong> - View commit history</li>
            <li><strong>git diff</strong> - See what changed</li>
            <li><strong>git rm</strong> - Remove files</li>
            <li><strong>git mv</strong> - Move/rename files</li>
            <li><strong>git restore</strong> - Undo changes</li>
        </ul>
    `,
    interviews: [
        {
            question: 'What is the difference between git add . and git add -A?',
            answer: 'Both commands stage all changes, but with subtle differences: "git add ." stages all changes in the current directory and subdirectories (new files, modifications, deletions). "git add -A" (or --all) stages all changes in the entire repository regardless of your current directory. In Git 2.0+, they behave almost identically when run from the repository root. Best practice: use "git add -A" to be explicit about staging everything, or "git add ." to stage only current directory changes.'
        },
        {
            question: 'Explain the difference between git reset --soft, --mixed, and --hard.',
            answer: '"git reset" moves the HEAD pointer to a different commit. The three modes differ in what they do with changes: 1) --soft: Moves HEAD, keeps changes staged (in index) - useful for recommitting with a different message, 2) --mixed (default): Moves HEAD, unstages changes but keeps them in working directory - useful for modifying what you\'re about to commit, 3) --hard: Moves HEAD, discards all changes (DANGEROUS!) - working directory matches the commit. Example: "git reset --soft HEAD~1" undoes the last commit but keeps the changes staged.'
        },
        {
            question: 'How do you remove a file from Git but keep it in your filesystem?',
            answer: 'Use "git rm --cached filename". This removes the file from Git\'s index (stops tracking it) but keeps it in your working directory. This is useful when you accidentally committed a file that should be ignored (like .env or node_modules). Workflow: 1) git rm --cached .env, 2) Add .env to .gitignore, 3) git commit -m "Stop tracking .env". The file stays on your disk but won\'t be tracked by Git anymore.'
        },
        {
            question: 'What is the difference between git diff, git diff --staged, and git diff HEAD?',
            answer: '1) "git diff" shows unstaged changes - compares your working directory to the staging area (what would be added with git add), 2) "git diff --staged" (or --cached) shows staged changes - compares staging area to last commit (what would be committed), 3) "git diff HEAD" shows all changes (staged + unstaged) - compares working directory to last commit. Example workflow: Edit file → "git diff" shows changes → "git add file" → "git diff" shows nothing → "git diff --staged" shows the staged changes.'
        },
        {
            question: 'How does git commit --amend work and when should you use it?',
            answer: '"git commit --amend" modifies the most recent commit instead of creating a new one. It replaces the last commit with a new commit that includes staged changes. Use cases: 1) Fix commit message: "git commit --amend" opens editor to change message, 2) Add forgotten files: "git add forgotten.txt" then "git commit --amend --no-edit", 3) Combine small fixes into previous commit. WARNING: Never amend commits that have been pushed to a shared repository - it rewrites history and will cause conflicts for collaborators. Only amend local commits.'
        },
        {
            question: 'Explain the purpose of .gitignore and how pattern matching works.',
            answer: '.gitignore specifies files Git should ignore (not track). Patterns: 1) "*.log" ignores all .log files, 2) "build/" ignores the build directory, 3) "!important.log" negates previous patterns (track this file), 4) "**/temp/" ignores temp directories anywhere, 5) "/TODO" ignores TODO in root only, 6) "doc/**/*.pdf" ignores all PDFs in doc and subdirectories. Note: .gitignore only works for untracked files. If a file is already tracked, you must "git rm --cached" it first. You can also create a global .gitignore with "git config --global core.excludesfile ~/.gitignore_global".'
        }
    ]
}

// Due to file size constraints, additional comprehensive modules should be added here
// The full course should include:
// - Module 2: Branching and Merging
// - Module 3: Remote Repositories (GitHub/GitLab)
// - Module 4: Advanced Git Commands
// - Module 5: Git Internals
// - Module 6: Git Workflows and Best Practices
// - Module 7: Troubleshooting and Recovery

// Note: Add these modules using the same structure as shown above
