// Containerization, Docker & Kubernetes Course
// Beginner-friendly progression with hands-on build walkthroughs

const containerizationFundamentals = {
    title: 'Containerization Fundamentals',
    lessons: [
        {
            id: 'what-is-a-container',
            title: 'What is a Container? - The Basics',
            duration: '45 min',
            content: `
                <h2>The Problem: "It Works on My Machine"</h2>
                <p>If you've ever worked with software, you've heard this. It's one of the most frustrating things in development. Let's understand exactly what's happening — and why containers fix it.</p>

                <div class="code-block">The Scene:

Developer Sarah: "I finished the new feature. Works perfectly!"
Developer Mike: "Let me test it..."
Mike: "...it's completely broken. Nothing works."
Sarah: "But it works on MY machine!"

What's actually happening behind the scenes:

Sarah's laptop:
- macOS Ventura
- Python 3.11.2
- numpy version 1.24.3
- pandas version 2.0.1

Mike's laptop:
- Windows 11
- Python 3.9.7      ← different version!
- numpy version 1.21.0  ← older version!
- pandas: NOT INSTALLED ← missing entirely!

The app needs Python 3.11 + numpy 1.24 + pandas 2.0.
Mike has none of that. So it breaks.

This happens hundreds of times every day
across every software company in the world.</div>

                <h2>What is a Container?</h2>
                <p><strong>A container is a box that holds your app AND everything it needs to run.</strong> The computer running the container doesn't need to have anything installed. Everything is already inside the box.</p>

                <h3>The Shipping Container Analogy</h3>
                <div class="code-block">Before shipping containers (1950s):

A ship arrives at port with cargo:
- 200 wooden crates (different sizes)
- 50 metal barrels
- 30 wooden boxes (fragile!)
- 12 oversized furniture pieces

Loading this ship took WEEKS.
Each item needed special handling.
Different trucks couldn't carry different items.
Warehouses needed custom shelving for each shape.

After shipping containers (1960s):

Same cargo, but now everything is packed
into STANDARD 20-foot metal boxes.

The ship doesn't care what's inside each box.
The truck doesn't care what's inside.
The warehouse doesn't care what's inside.
The crane lifts every box the same way.

Result: Loading a ship went from WEEKS to DAYS.
Shipping costs dropped 90%.

Software containers = the same idea.
Your app + its dependencies = packed into a standard box.
Any server can run that box. No special setup needed.</div>

                <h3>What's Actually Inside a Software Container?</h3>
                <div class="code-block">Let's say you built a weather app in Python.

Your container holds EXACTLY this:

┌──────────────────────────────────────┐
│            Your Container            │
│                                      │
│  📁 /app/                            │
│     📄 weather_app.py    ← your code │
│     📄 config.json       ← settings  │
│                                      │
│  📦 Python 3.11.2        ← runtime   │
│  📦 requests 2.28.1      ← library   │
│  📦 numpy 1.24.3         ← library   │
│                                      │
│  🐧 Linux (tiny version) ← base OS   │
│                                      │
└──────────────────────────────────────┘

That's it. Everything needed. Nothing extra.

Now run this container on:
- Sarah's Mac? ✓ Works.
- Mike's Windows? ✓ Works.
- A cloud server? ✓ Works.
- A different cloud server? ✓ Works.

The host machine doesn't need Python installed.
The host machine doesn't need numpy installed.
Everything is INSIDE the container.</div>

                <h2>Why Companies Switched to Containers</h2>

                <h3>Problem 1: The Environment Nightmare</h3>
                <div class="code-block">A real scenario at a tech company:

Developer laptop:   Ubuntu 22.04, Node 18.12, npm 8.19
CI/CD server:       Ubuntu 20.04, Node 16.14, npm 7.24
Staging server:     CentOS 7,    Node 14.20, npm 6.14
Production server:  Ubuntu 22.04, Node 18.15, npm 8.21

Same app. Four different environments.
App works on laptop. Fails on CI.
Passes CI. Crashes in staging.
Passes staging. Blows up in production.

Every bug hunt becomes: "Is it our code, or the environment?"

With containers: ONE environment everywhere.
All four use the same container.
Same Node version. Same npm version. Same Linux.
Bug in code? It's YOUR code. Environment? Impossible.</div>

                <h3>Problem 2: Deployment Used to Take Forever</h3>
                <div class="code-block">Before containers — deploying one app:

Step 1: SSH into production server
Step 2: Stop the old version of the app
Step 3: Backup old files (just in case)
Step 4: Download new code
Step 5: Install dependencies (npm install / pip install)
Step 6: Update config files
Step 7: Run database migrations
Step 8: Start the app
Step 9: Check if it actually works
Step 10: If broken, roll back to step 3 backup

Time: 30 minutes to 2 hours. Per app.
If something goes wrong: another 1-2 hours debugging.

With containers:

Step 1: docker run my-app:v2.1

Time: 5 seconds.
If broken: docker run my-app:v2.0  (roll back in 5 seconds)</div>

                <h3>Problem 3: Servers Were Expensive and Wasteful</h3>
                <div class="code-block">Before containers — a company with 20 apps:

Each app gets its own server (standard practice).
Each server: 16 GB RAM, 4 CPUs.
Most apps use: 1 GB RAM, 0.5 CPU.

20 servers × 16 GB = 320 GB allocated
20 apps × 1 GB   =  20 GB actually used
Waste: 300 GB of RAM sitting idle!

Cost: 20 servers × $500/month = $10,000/month

With containers — same 20 apps:

All 20 apps run on 2 servers.
Each container gets exactly what it needs.
2 servers × 16 GB = 32 GB allocated
20 apps × 1 GB   = 20 GB actually used
Waste: 12 GB (much better!)

Cost: 2 servers × $500/month = $1,000/month
Saved: $9,000/month. $108,000/year.</div>

                <h2>Containers in the Real World — Right Now</h2>

                <div class="code-block">These apps you use EVERY DAY run on containers:

Netflix:
- 1,000+ containers across thousands of servers
- Each microservice (login, streaming, recommendations)
  is its own container
- They deploy 50+ times per day
- If one container crashes, others keep going

Uber:
- Driver matching runs in containers
- Payment processing in separate containers
- Surge pricing calculation in its own container
- Real-time location tracking in its own container
- Each piece scales independently

LinkedIn:
- Switched to containers in 2017
- Reduced deployment time from 2 hours to 15 minutes
- Server costs dropped by 40%

GitHub:
- Runs their CI/CD (GitHub Actions) entirely on containers
- Every time you push code, a container spins up,
  runs your tests, and shuts down
- Millions of containers per day

You've been benefiting from containers
without knowing it.</div>

                <h2>Summary</h2>
                <ul style="margin: 1rem 0; margin-left: 2rem;">
                    <li>Containers package your app + everything it needs into one portable box</li>
                    <li>They solve the "works on my machine" problem — same container = same environment everywhere</li>
                    <li>They make deployment fast (seconds vs hours) and rollback instant</li>
                    <li>They save massive amounts of money by sharing servers efficiently</li>
                    <li>Every major tech company (Netflix, Uber, LinkedIn, GitHub) runs on containers</li>
                </ul>

                <p>Next lesson: containers vs the older way — <strong>Virtual Machines</strong> — and exactly why containers won.</p>
            `,
            interviews: [
                {
                    question: "What is a software container and what goes inside it?",
                    answer: "A container is a standardized box that holds your application code, all libraries and dependencies it needs, the specific runtime version (Python 3.11, Node 18, etc.), and a minimal operating system. Everything needed to run the app — nothing more. This means it runs identically on any machine without any setup."
                },
                {
                    question: "Explain the 'works on my machine' problem with a concrete example.",
                    answer: "Developer A has Python 3.11 and numpy 1.24. Developer B has Python 3.9 and no numpy installed. Code that works on A's machine crashes on B's because it depends on Python 3.11 features and numpy. Without containers, every team member and every server needs the exact same software versions — which is nearly impossible to maintain."
                },
                {
                    question: "How did LinkedIn benefit from switching to containers?",
                    answer: "LinkedIn reduced deployment time from 2 hours to 15 minutes and cut server costs by 40%. Containers let them run more apps on fewer servers (no wasted resources), deploy faster (no manual setup), and maintain consistent environments across development, staging, and production."
                },
                {
                    question: "Why are containers cheaper than traditional servers?",
                    answer: "Traditional approach: each app gets its own server, most of which sits idle (a 16 GB server running a 1 GB app wastes 15 GB). Containers share servers — 20 apps can run on 2 servers instead of 20. Only the resources actually used are allocated. A company with 20 apps might go from $10,000/month to $1,000/month."
                },
                {
                    question: "Name three real companies using containers and what they use them for.",
                    answer: "Netflix: 1,000+ containers for microservices (streaming, recommendations, login), deploys 50+ times/day. Uber: separate containers for driver matching, payments, surge pricing, location tracking. GitHub: runs GitHub Actions (CI/CD) on containers — millions of containers per day to run developer tests."
                }
            ]
        },
        {
            id: 'vms-vs-containers',
            title: 'Virtual Machines vs Containers - What Changed and Why',
            duration: '50 min',
            content: `
                <h2>Before Containers There Were Virtual Machines</h2>
                <p>Virtual Machines (VMs) solved a similar problem before containers existed. They're still used today — but containers are better for most things. Let's understand both so you can see exactly why, and know when each one is the right choice.</p>

                <h3>What is a Virtual Machine? (Actually Explained)</h3>
                <p>A VM is a full computer simulated in software. It has its own operating system, its own disk, its own network card — all faked by software called a <strong>hypervisor</strong>.</p>

                <div class="code-block">Your physical server (16 GB RAM, 8 CPUs):
┌──────────────────────────────────────────────┐
│              Physical Server                 │
│                                              │
│  ┌────────────────┐  ┌────────────────┐     │
│  │     VM 1       │  │     VM 2       │     │
│  │                │  │                │     │
│  │  Windows 11    │  │  Ubuntu 22.04  │     │  ← each VM has its OWN OS
│  │  4 GB RAM      │  │  4 GB RAM      │     │  ← each gets a share of RAM
│  │  2 CPUs        │  │  2 CPUs        │     │  ← each gets CPUs
│  │                │  │                │     │
│  │  App: IIS Web  │  │  App: Nginx    │     │  ← apps inside VMs
│  │  App: SQL DB   │  │  App: Node API │     │
│  └────────────────┘  └────────────────┘     │
│                                              │
│  Hypervisor (VMware / VirtualBox / Hyper-V) │  ← manages the VMs
│  Host OS: Linux                             │  ← the real OS
│  Physical Hardware                          │
└──────────────────────────────────────────────┘

VM 1 thinks it IS a Windows computer.
VM 2 thinks it IS an Ubuntu computer.
Neither knows they're sharing physical hardware.</div>

                <h3>What is a Container? (Side by Side)</h3>
                <div class="code-block">Same physical server (16 GB RAM, 8 CPUs):
┌──────────────────────────────────────────────┐
│              Physical Server                 │
│                                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐    │
│  │Container │ │Container │ │Container │    │
│  │   A      │ │   B      │ │   C      │    │  ← NO separate OS
│  │          │ │          │ │          │    │     each is ~200 MB
│  │ Node App │ │ Python   │ │ Java App │    │
│  │ 500 MB   │ │ App      │ │ 800 MB   │    │
│  │          │ │ 300 MB   │ │          │    │
│  └──────────┘ └──────────┘ └──────────┘    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐    │
│  │Container │ │Container │ │Container │    │
│  │   D      │ │   E      │ │   F      │    │
│  │ Redis    │ │ Postgres │ │ Worker   │    │
│  └──────────┘ └──────────┘ └──────────┘    │
│                                              │
│  ONE Shared OS: Linux                       │  ← containers share this
│  Physical Hardware                          │
└──────────────────────────────────────────────┘

6 containers on the same server that only fit 2 VMs.
Each container shares the host OS instead of having its own.</div>

                <h2>The Detailed Comparison</h2>

                <table class="table">
                    <tr>
                        <th>What</th>
                        <th>Virtual Machine</th>
                        <th>Container</th>
                    </tr>
                    <tr>
                        <td><strong>Includes its own OS?</strong></td>
                        <td>Yes — full copy (2-4 GB)</td>
                        <td>No — shares host OS</td>
                    </tr>
                    <tr>
                        <td><strong>Total size</strong></td>
                        <td>2-20 GB per VM</td>
                        <td>50-500 MB per container</td>
                    </tr>
                    <tr>
                        <td><strong>Startup time</strong></td>
                        <td>1-5 minutes (booting OS)</td>
                        <td>1-5 seconds</td>
                    </tr>
                    <tr>
                        <td><strong>How many per server?</strong></td>
                        <td>3-10 (limited by RAM)</td>
                        <td>50-500+ (very lightweight)</td>
                    </tr>
                    <tr>
                        <td><strong>Isolation level</strong></td>
                        <td>Very strong (separate OS)</td>
                        <td>Good (separate processes)</td>
                    </tr>
                    <tr>
                        <td><strong>Portability</strong></td>
                        <td>Possible but heavy</td>
                        <td>Excellent — runs anywhere</td>
                    </tr>
                    <tr>
                        <td><strong>Best for</strong></td>
                        <td>Running different OSes, max security</td>
                        <td>App deployment, microservices, speed</td>
                    </tr>
                </table>

                <h2>Why This Difference Matters — A Real Numbers Example</h2>

                <div class="code-block">A company runs 30 small web services.
Each service uses about 200 MB of RAM when running.

--- Using Virtual Machines ---
Each VM needs: 200 MB (app) + 3,500 MB (Windows/Linux OS) = 3,700 MB
30 VMs need: 30 × 3,700 MB = 111,000 MB = ~111 GB RAM

Server with 128 GB RAM: fits 30 VMs (barely)
Cost: 3 servers (for redundancy) × $2,000/month = $6,000/month

--- Using Containers ---
Each container needs: 200 MB (app only, no duplicate OS)
30 containers need: 30 × 200 MB = 6,000 MB = 6 GB RAM
Plus one shared OS: 1 GB
Total: 7 GB RAM

Server with 16 GB RAM: fits all 30 containers easily
Cost: 1 server × $500/month = $500/month

Saving: $5,500/month = $66,000/year
Same 30 apps. Same performance. Fraction of the cost.</div>

                <h2>When VMs Are Still the Right Choice</h2>

                <div class="code-block">Containers aren't always better. Here's when you'd pick VMs:

1. Running untrusted code (from strangers)
   A security flaw in containers CAN (rarely) let one
   container escape and affect others on the same server.
   VMs have a stronger barrier. Cloud providers use VMs
   to isolate your server from other customers.

2. You need a completely different OS
   Your server runs Linux. You need to run a Windows app.
   You can't put a Windows app in a Linux container.
   You CAN run a Windows VM on a Linux server.

3. Legacy apps that need a full OS
   Some old enterprise software literally requires
   a full Windows installation. Can't containerize it.

Real-world: Most companies use BOTH.
- VMs to isolate the big infrastructure
- Containers running INSIDE those VMs for the apps

Example: AWS EC2 (VMs) running Docker containers inside them.</div>

                <h2>A Real Migration Story</h2>

                <div class="code-block">Shopify (2018) — migrating from VMs to containers:

Before (VMs):
- 1,200 VMs running across data centers
- Each VM: 4 GB RAM minimum (most of it wasted on OS)
- Deploying a new version: 45-minute deployment window
- Scaling up for Black Friday: days of manual prep

After (Containers):
- Same apps, now in containers
- Startup time: seconds (not minutes)
- Deploying: rolling updates, zero downtime
- Black Friday scaling: auto-scale in real-time

Results:
- Reduced server count by 60%
- Deployment time: 45 minutes → under 1 minute
- Black Friday 2018: handled 3× more traffic than 2017
  without adding any servers
- Engineers spent less time on infrastructure,
  more time building features</div>

                <h2>Summary</h2>
                <ul style="margin: 1rem 0; margin-left: 2rem;">
                    <li>VMs simulate a full computer (including OS). Containers share the host OS and only include the app</li>
                    <li>VMs: 2-20 GB each, minutes to start. Containers: 50-500 MB each, seconds to start</li>
                    <li>A server that fits 5 VMs can fit 50-500 containers</li>
                    <li>VMs still win for maximum security isolation and running different OSes</li>
                    <li>Most real companies use VMs for infrastructure, containers inside them for apps</li>
                    <li>Shopify cut server count 60% and deployment from 45 min to under 1 min by switching</li>
                </ul>

                <p>Next: <strong>Docker</strong> — the actual tool. We'll look at exactly what you install, what commands exist, and what each one does.</p>
            `,
            interviews: [
                {
                    question: "Explain the difference between VMs and containers using a concrete resource example.",
                    answer: "30 apps each using 200 MB RAM. As VMs: each needs 3.7 GB (200 MB app + 3.5 GB OS) = 111 GB total, needing multiple expensive servers. As containers: each needs 200 MB + one shared OS (1 GB) = 7 GB total, fitting on one cheap server. Same apps, 16× less RAM, fraction of the cost."
                },
                {
                    question: "What is a hypervisor and what does it do?",
                    answer: "A hypervisor is software that creates and manages Virtual Machines. It sits between the physical hardware and the VMs, giving each VM its own slice of CPU, RAM, and storage. It makes each VM think it has its own dedicated hardware. Examples: VMware, VirtualBox, Microsoft Hyper-V."
                },
                {
                    question: "Give a real scenario where you MUST use VMs instead of containers.",
                    answer: "1) Running untrusted code from external users — VMs provide stronger isolation if a container escape vulnerability is found. 2) Running a Windows application on a Linux server — you can't put a Windows app in a Linux container, but you can run a Windows VM. 3) Legacy enterprise software that requires a full OS installation."
                },
                {
                    question: "How did Shopify benefit from migrating to containers?",
                    answer: "Shopify reduced server count by 60%, cut deployment time from 45 minutes to under 1 minute, and handled 3× more Black Friday traffic without adding servers. Containers eliminated wasted OS overhead, enabled zero-downtime deployments, and allowed automatic scaling in real-time."
                },
                {
                    question: "If a company runs VMs AND containers, how does that typically work?",
                    answer: "The VMs provide the infrastructure layer — isolated, secure machines managed by cloud providers (like AWS EC2). Inside those VMs, containers run the actual applications. This gives you VM-level security isolation from other customers while getting container-level speed, efficiency, and portability for your apps."
                }
            ]
        },
        {
            id: 'what-is-docker',
            title: 'What is Docker? - Every Concept Explained',
            duration: '55 min',
            content: `
                <h2>Docker Is the Tool. Containers Are the Concept.</h2>
                <p>Containers as an idea existed before Docker (Linux had cgroups and namespaces since 2007). But they were impossibly complicated to use. Docker, released in 2013, made containers as simple as typing one command. That's why Docker and containers are used interchangeably — Docker made them mainstream.</p>

                <h2>Install Docker — What You Actually Get</h2>

                <div class="code-block">When you install Docker Desktop (on Mac or Windows),
you get three things:

1. Docker Engine — the thing that actually runs containers
   (runs silently in the background)

2. Docker CLI — the command-line tool YOU type commands into
   (this is what you'll use day-to-day)

3. Docker Desktop App — a GUI to see what's running
   (optional, nice to have)

To check if Docker is installed and working:
$ docker --version
Docker version 24.0.5, build ced099d

$ docker ps
CONTAINER ID   IMAGE   COMMAND   CREATED   STATUS   PORTS   NAMES
(empty — nothing running yet, that's fine)</div>

                <h2>The Three Things You Need to Know</h2>

                <h3>1. Image — The Blueprint</h3>
                <p>An image is a frozen snapshot of everything a container needs. It doesn't run. It just sits there, ready to be turned into a container whenever you want.</p>

                <div class="code-block">Think of an image like a master copy of a DVD.
The DVD itself doesn't play anything.
But you can copy it as many times as you want,
and each copy plays the same movie.

Image = the master DVD
Container = a playing copy

You can make 100 containers from 1 image.
Each container is independent — one can crash,
the others keep running fine.

How to see your images:
$ docker images
REPOSITORY    TAG      IMAGE ID       CREATED        SIZE
node          18       abc123def456   2 weeks ago    370MB
python        3.11     def456ghi789   3 weeks ago    220MB

"node:18" means: the Node.js image, version 18.
"python:3.11" means: the Python image, version 3.11.</div>

                <h3>2. Container — The Running Instance</h3>
                <div class="code-block">A container is what happens when you RUN an image.
It's the image, turned on, doing its job.

$ docker run node:18
(this creates a container from the node:18 image)

To see running containers:
$ docker ps
CONTAINER ID   IMAGE    COMMAND        CREATED        STATUS     PORTS   NAMES
a1b2c3d4e5f6   node:18  "node"         10 secs ago    Up 10s             happy_darwin

To stop it:
$ docker stop a1b2c3d4e5f6

To see ALL containers (running + stopped):
$ docker ps -a
CONTAINER ID   IMAGE    COMMAND   CREATED       STATUS              NAMES
a1b2c3d4e5f6   node:18  "node"    15 secs ago   Exited (0) 5s ago   happy_darwin

"Exited" means stopped. The container still exists,
it just isn't running.

To delete it permanently:
$ docker rm a1b2c3d4e5f6</div>

                <h3>3. Dockerfile — The Recipe</h3>
                <p>A Dockerfile is a plain text file (literally called "Dockerfile", no extension) that tells Docker how to build an image. Every line is one instruction. Docker executes them top to bottom.</p>

                <div class="code-block">Here's a Dockerfile and what EVERY line means:

FROM python:3.11-slim

Why "python:3.11-slim" and not just "python:3.11"?
- python:3.11 = full image (400+ MB, includes extra stuff)
- python:3.11-slim = stripped down version (150 MB)
- Same Python, less bloat. Always use slim when possible.
- "FROM" = "start with this as our base"

---

WORKDIR /app

This creates a folder called /app inside the container
and makes it the "current directory."
All future COPY and RUN commands happen here.
Like doing: mkdir /app && cd /app

---

COPY requirements.txt .

Copies requirements.txt from YOUR computer
into /app/ inside the container.
The "." means "current directory" (/app).
We copy THIS file first (not all files) for a reason
we'll explain soon.

---

RUN pip install -r requirements.txt

Runs this command DURING the build process.
pip install downloads and installs all the Python
packages listed in requirements.txt.
This only runs once when you BUILD the image.
Not every time you run the container.

---

COPY . .

NOW copy everything else (your actual app code)
into /app/. We did this AFTER requirements.txt
for caching reasons (explained next).

---

EXPOSE 8000

Documents that this container will use port 8000.
Doesn't actually DO anything by itself —
you still need -p when running. But it's good practice
to document what port your app uses.

---

CMD ["python", "app.py"]

The command to run when the container starts.
"python app.py" = start our application.
This runs EVERY time someone does "docker run".</div>

                <h2>Layer Caching — Why Build Order Matters</h2>
                <p>This is one of the most important Docker tricks. Understanding it will save you a LOT of time.</p>

                <div class="code-block">Docker builds images in LAYERS. Each line in your
Dockerfile = one layer.

Layer 1: FROM python:3.11-slim     (base, downloaded once)
Layer 2: WORKDIR /app              (creates folder)
Layer 3: COPY requirements.txt .   (copies one file)
Layer 4: RUN pip install ...       (installs packages — SLOW, 30-60 sec)
Layer 5: COPY . .                  (copies your app code)
Layer 6: CMD ["python", "app.py"]  (just a label, instant)

Here's the MAGIC:
Docker CACHES every layer.
If a layer hasn't changed, Docker SKIPS rebuilding it.

Scenario A: You change app.py (your code)
- Layers 1-4: CACHED (skipped, instant)
- Layer 5: REBUILDS (new code)
- Layer 6: REBUILDS
- Total build time: 2 seconds

Scenario B: You change requirements.txt (new dependency)
- Layers 1-3: CACHED
- Layer 4: REBUILDS (pip install runs again — 30-60 sec)
- Layer 5: REBUILDS
- Layer 6: REBUILDS

THIS is why we COPY requirements.txt BEFORE the app code.
Your code changes every day. Your dependencies change rarely.
Put the rarely-changing stuff first = faster builds 99% of the time.

If we put COPY . . before pip install:
Every single code change would trigger pip install again.
Every build would take 60 seconds instead of 2 seconds.</div>

                <h2>Docker Hub — Where Images Live</h2>

                <div class="code-block">Docker Hub (hub.docker.com) is the central library.

Official images (maintained by Docker):
- node:18          ← Node.js runtime
- python:3.11      ← Python runtime
- nginx:latest     ← Web server
- postgres:15      ← PostgreSQL database
- redis:7          ← In-memory cache
- ubuntu:22.04     ← Linux operating system
- alpine:3.18      ← Tiny Linux (only 5 MB!)

Community images (made by other developers):
- tensorflow/tensorflow     ← Machine learning
- wordpress                 ← CMS platform
- mongo                     ← MongoDB database

YOUR images (you upload them):
- yourusername/my-app:v1.0  ← your custom app

To download (pull) an image:
$ docker pull nginx
Pulling from library/nginx
...
Status: Downloaded newer image for nginx:latest

Now "nginx" is on your computer, ready to run.</div>

                <h2>Common Mistakes and How to Avoid Them</h2>

                <div class="code-block">Mistake 1: Forgetting to use .dockerignore
You have node_modules/ (500 MB of files) on your computer.
COPY . . copies EVERYTHING including node_modules.
Your image goes from 100 MB to 600 MB for no reason.

Fix: Create a .dockerignore file (next to Dockerfile):
  node_modules/
  .git/
  .env
  *.log

Docker ignores these files during COPY. Same as .gitignore.

---

Mistake 2: Using "latest" tag
FROM node:latest    ← BAD
FROM node:18        ← GOOD

"latest" changes over time. Your build today works.
6 months later, "latest" is Node 20. Your app might break.
Always pin to a specific version.

---

Mistake 3: Running as root
By default, containers run as root user.
Root can do ANYTHING — security risk.

Fix: Add to your Dockerfile:
  RUN useradd -m appuser
  USER appuser

Now the container runs as "appuser", not root.</div>

                <h2>Summary</h2>
                <ul style="margin: 1rem 0; margin-left: 2rem;">
                    <li>Docker Engine runs containers. Docker CLI is what you type commands into. Dockerfile is the recipe</li>
                    <li>Image = frozen blueprint (doesn't run). Container = running instance of an image</li>
                    <li>Every Dockerfile line creates a layer. Layers are cached — unchanged layers are skipped on rebuild</li>
                    <li>Put rarely-changing things (dependencies) before frequently-changing things (your code) in the Dockerfile</li>
                    <li>Always use specific version tags (node:18 not node:latest). Always use .dockerignore. Don't run as root</li>
                </ul>

                <p>Next lesson: we build real containers from scratch. Two complete projects, step by step, with every command and what to expect.</p>
            `,
            interviews: [
                {
                    question: "What's the difference between an image and a container? Use a concrete example.",
                    answer: "An image is like a master DVD — it's a frozen blueprint that doesn't do anything by itself. A container is like playing that DVD — it's a running instance. You run 'docker run node:18' and that creates a container from the node:18 image. You can run 10 containers from the same image simultaneously, each independent."
                },
                {
                    question: "Explain Docker layer caching. Why does build order in a Dockerfile matter?",
                    answer: "Each Dockerfile line creates a cached layer. If a layer hasn't changed, Docker skips it on rebuild. So if you COPY requirements.txt and run pip install BEFORE copying your app code, then when you change only your code, Docker skips the slow pip install step (cached). If you did it the other way around, every code change would trigger a full reinstall of dependencies."
                },
                {
                    question: "What is .dockerignore and why do you need it?",
                    answer: "It's like .gitignore for Docker. It tells Docker which files to skip when copying into the image. Without it, COPY . . would include node_modules (500+ MB), .git folder, .env files with secrets, log files — bloating your image and potentially leaking secrets. Always create one."
                },
                {
                    question: "Why should you never use 'latest' as an image tag?",
                    answer: "'latest' points to whatever version is newest RIGHT NOW. Build today with node:latest gets Node 18. Six months later, node:latest might be Node 20. Your app could break with the newer version and you'd have no idea why. Always pin: node:18, python:3.11, nginx:1.25."
                },
                {
                    question: "What are the three security basics for Docker containers?",
                    answer: "1) Use .dockerignore to prevent secrets (.env files) from getting into images. 2) Don't run as root — add a non-root user with 'USER appuser'. 3) Pin base image versions and keep them updated for security patches. These three steps cover most common container security issues."
                }
            ]
        },
        {
            id: 'docker-in-action',
            title: 'Docker in Action - Two Real Projects, Built From Scratch',
            duration: '70 min',
            content: `
                <h2>Let's Build Real Things</h2>
                <p>Enough theory. We're going to build two complete Docker projects from scratch. Every single file. Every command. What the output looks like. What happens if something goes wrong. Follow along.</p>

                <h2>Project 1: A Node.js Todo API</h2>

                <h3>Step 1: The App Files (What We're Dockerizing)</h3>
                <p>First, here's the actual application. Read each file, understand what it does, THEN we'll containerize it.</p>

                <div class="code-block">📁 todo-api/
   📄 package.json
   📄 server.js
   📄 Dockerfile          ← we'll write this
   📄 .dockerignore       ← we'll write this

---
📄 package.json — this is Node.js's dependency file.
It lists what libraries our app needs.

{
  "name": "todo-api",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}

What this says:
- App name: todo-api
- To start it, run: node server.js
- It needs one library: "express" version 4.18.x
  (Express is a web framework — makes building APIs easy)</div>

                <div class="code-block">📄 server.js — the actual application logic.

const express = require('express');   // Load Express library
const app = express();                // Create a web app
app.use(express.json());              // Allow JSON request bodies

// In-memory storage (resets when server restarts)
let todos = [];
let nextId = 1;

// GET /todos — return all todos
app.get('/todos', (req, res) => {
  res.json(todos);                    // Send back the list
});

// POST /todos — create a new todo
app.post('/todos', (req, res) => {
  const todo = {
    id: nextId++,                     // Auto-increment ID
    text: req.body.text,              // Text from request
    done: false                       // Starts as not done
  };
  todos.push(todo);                   // Add to our list
  res.status(201).json(todo);         // Send back the new todo
});

// PUT /todos/:id — mark a todo as done
app.put('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ error: 'Not found' });
  todo.done = true;
  res.json(todo);
});

// DELETE /todos/:id — remove a todo
app.delete('/todos/:id', (req, res) => {
  todos = todos.filter(t => t.id !== parseInt(req.params.id));
  res.status(204).send();             // 204 = deleted, no content
});

// Health check — Kubernetes uses this to check if app is alive
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log('Todo API running on port ' + PORT);
});

What this app does:
- GET  /todos      → list all todos
- POST /todos      → create a todo (send: {"text":"Buy milk"})
- PUT  /todos/1    → mark todo #1 as done
- DELETE /todos/1  → delete todo #1
- GET  /health     → health check (returns "ok")</div>

                <h3>Step 2: Write the Dockerfile</h3>
                <div class="code-block">📄 Dockerfile

# Start with Node.js 18 (slim = smaller image)
FROM node:18-slim

# Where our app will live inside the container
WORKDIR /app

# Copy dependency list first (for layer caching)
COPY package.json ./

# Install dependencies (this is the slow step — ~30 sec)
# We do this BEFORE copying code so it caches
RUN npm install

# NOW copy our actual application code
COPY server.js ./

# Our app listens on port 3000
EXPOSE 3000

# Don't run as root — create a safer user
RUN useradd -m appuser
USER appuser

# Start the app when container runs
CMD ["node", "server.js"]

---
Why node:18-slim and not node:18?
  node:18      = 370 MB (includes build tools we don't need)
  node:18-slim = 180 MB (just the runtime)
  We only NEED the runtime to run our app.
  Smaller image = faster to download, less attack surface.</div>

                <h3>Step 3: Write .dockerignore</h3>
                <div class="code-block">📄 .dockerignore

node_modules/
.env
*.log
.git/

Why each line:
- node_modules/  → 50+ MB of installed packages.
                   Docker will install fresh ones via npm install.
                   Including these would bloat the image.
- .env          → environment variables file.
                   Might contain API keys or passwords.
                   NEVER put secrets in a Docker image.
- *.log         → log files from development. Not needed.
- .git/         → git history. Not needed in production.</div>

                <h3>Step 4: Build the Image</h3>
                <div class="code-block">Open your terminal. Navigate to the todo-api folder.

$ cd todo-api
$ docker build -t todo-api .

The "." at the end means "look for Dockerfile in THIS folder."
The "-t todo-api" names our image "todo-api".

What you'll see (first time):
[+] Building 45.2s (10/10) FINISHED
 => [internal] load build context                          0.1s
 => [1/6] FROM docker.io/library/node:18-slim             12.3s   ← downloading base
 => [2/6] WORKDIR /app                                     0.0s
 => [3/6] COPY package.json ./                             0.0s
 => [4/6] RUN npm install                                 28.4s   ← installing express
 => [5/6] COPY server.js ./                                0.0s
 => [6/6] RUN useradd -m appuser                           0.1s
 => exporting to image                                     0.2s

Image is built! Now build it AGAIN (change nothing):

$ docker build -t todo-api .
[+] Building 0.1s (10/10) FINISHED
 => [internal] load build context                          0.0s
 => [1/6] FROM docker.io/library/node:18-slim    CACHED    0.0s   ← cached!
 => [2/6] WORKDIR /app                           CACHED    0.0s   ← cached!
 => [3/6] COPY package.json ./                   CACHED    0.0s   ← cached!
 => [4/6] RUN npm install                        CACHED    0.0s   ← cached! (skipped!)
 => [5/6] COPY server.js ./                      CACHED    0.0s   ← cached!
 => [6/6] RUN useradd -m appuser                 CACHED    0.0s   ← cached!

0.1 seconds. Everything was cached. See why layer order matters?</div>

                <h3>Step 5: Run the Container</h3>
                <div class="code-block">$ docker run -p 3000:3000 -d --name my-todos todo-api

What each flag means:
  -p 3000:3000   → map host port 3000 to container port 3000
  -d             → run in background (detached mode)
  --name my-todos → give it a friendly name instead of random

Output:
  7f3a2b1c4d5e6a...  (container ID — Docker's unique identifier)

Check it's running:
$ docker ps
CONTAINER ID   IMAGE     COMMAND          CREATED        STATUS     PORTS                  NAMES
7f3a2b1c4d5e   todo-api  "node server.js" 5 seconds ago  Up 5 secs  0.0.0.0:3000->3000/tcp my-todos

"Up 5 secs" = it's running. "0.0.0.0:3000->3000" = port mapping active.</div>

                <h3>Step 6: Test the API</h3>
                <div class="code-block">Now let's actually USE the API. Open a new terminal.

--- Test 1: Create a todo ---
$ curl -X POST http://localhost:3000/todos \
       -H "Content-Type: application/json" \
       -d '{"text": "Buy groceries"}'

Response:
{"id":1,"text":"Buy groceries","done":false}

What happened: We sent a POST request with JSON body.
The container received it, created a todo, sent it back.

--- Test 2: Create another todo ---
$ curl -X POST http://localhost:3000/todos \
       -H "Content-Type: application/json" \
       -d '{"text": "Walk the dog"}'

Response:
{"id":2,"text":"Walk the dog","done":false}

--- Test 3: List all todos ---
$ curl http://localhost:3000/todos

Response:
[{"id":1,"text":"Buy groceries","done":false},
 {"id":2,"text":"Walk the dog","done":false}]

--- Test 4: Mark todo #1 as done ---
$ curl -X PUT http://localhost:3000/todos/1

Response:
{"id":1,"text":"Buy groceries","done":true}

--- Test 5: Delete todo #2 ---
$ curl -X DELETE http://localhost:3000/todos/2

Response: (empty, status 204 = successfully deleted)

--- Test 6: List todos again ---
$ curl http://localhost:3000/todos

Response:
[{"id":1,"text":"Buy groceries","done":true}]

Todo #2 is gone. Todo #1 is marked done. It works!

--- Test 7: Health check ---
$ curl http://localhost:3000/health

Response:
{"status":"ok","timestamp":"2024-01-15T10:30:00.000Z"}</div>

                <h3>Step 7: Debugging — When Things Go Wrong</h3>
                <div class="code-block">Essential commands for when you need to debug:

--- See what the container is printing (logs) ---
$ docker logs my-todos
Todo API running on port 3000

If your app crashes, the error message is here.

--- See logs in REAL TIME (streaming) ---
$ docker logs -f my-todos
(keeps showing new logs as they appear, Ctrl+C to stop)

--- Get inside the container (like SSH) ---
$ docker exec -it my-todos sh
# ls
server.js  node_modules  package.json
# cat server.js
(shows your code)
# exit
(back to your normal terminal)

This is incredibly useful for debugging.
You can check if files exist, check environment variables,
run commands inside the container.

--- Check container details ---
$ docker inspect my-todos
[
  {
    "Id": "7f3a2b1c...",
    "State": { "Status": "running" },
    "Config": { "Image": "todo-api" },
    "NetworkSettings": { "Ports": { "3000/tcp": [...] } }
  }
]

--- Stop and clean up ---
$ docker stop my-todos      (stop it)
$ docker rm my-todos        (delete it)
$ docker rmi todo-api       (delete the image)</div>

                <h2>Project 2: A Python Flask App with Docker Compose</h2>

                <h3>The Setup — Multiple Services Working Together</h3>
                <div class="code-block">This project has THREE containers working together:
1. Flask app (Python web app)  — the main application
2. PostgreSQL database         — stores data permanently
3. Redis cache                 — speeds up repeated requests

📁 flask-app/
   📄 app.py              ← the Flask application
   📄 requirements.txt    ← Python dependencies
   📄 Dockerfile          ← builds the Flask container
   📄 docker-compose.yml  ← runs ALL containers together
   📄 .dockerignore</div>

                <div class="code-block">📄 requirements.txt — Python's dependency file

flask==3.0.0          ← Web framework (like Express for Python)
psycopg2-binary==2.9.9  ← PostgreSQL database driver
redis==5.0.0          ← Redis client library

Each line = one package. The version after == is pinned.
"psycopg2-binary" lets Python talk to PostgreSQL.
"redis" lets Python talk to Redis.</div>

                <div class="code-block">📄 app.py — the Flask application

from flask import Flask, jsonify, request
import redis
import os

app = Flask(__name__)

# Connect to Redis using the service name from docker-compose
# "redis" here matches the service name in docker-compose.yml
redis_client = redis.Redis(host='redis', port=6379, decode_responses=True)

# GET /items — returns items (cached in Redis)
@app.route('/items')
def get_items():
    # Check Redis cache first
    cached = redis_client.get('items_cache')
    if cached:
        return jsonify({"items": cached.split(','), "source": "cache"})

    # If not cached, create some items (in real app, this would be from DB)
    items = ["laptop", "phone", "headphones"]
    # Store in Redis cache for 60 seconds
    redis_client.setex('items_cache', 60, ','.join(items))
    return jsonify({"items": items, "source": "database"})

# GET /health — health check
@app.route('/health')
def health():
    # Check if Redis is reachable
    redis_client.ping()
    return jsonify({"status": "ok"})

if __name__ == '__main__':
    # 0.0.0.0 means "listen on all network interfaces"
    # (important in containers — localhost won't work!)
    app.run(host='0.0.0.0', port=5000)

KEY LESSON: In containers, listen on 0.0.0.0, NOT localhost.
localhost inside a container means "inside THIS container."
0.0.0.0 means "accept connections from outside."</div>

                <div class="code-block">📄 Dockerfile

FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY app.py .
EXPOSE 5000
RUN useradd -m appuser
USER appuser
CMD ["python", "app.py"]

"--no-cache-dir" on pip install = don't cache downloaded packages
inside the image. Saves 50-100 MB of space.</div>

                <div class="code-block">📄 docker-compose.yml — THE IMPORTANT FILE

version: '3.8'
services:
  flask:                              # Service name: "flask"
    build: .                          # Build from Dockerfile in this folder
    ports:
      - "5000:5000"                   # Expose to your browser
    depends_on:                       # Start these FIRST:
      - redis                         #   redis must be up before flask
    environment:                      # Environment variables:
      - FLASK_ENV=production          #   tells Flask it's production mode

  redis:                              # Service name: "redis"
    image: redis:7-alpine             # Use official Redis image (alpine = tiny)
    # No ports needed — flask talks to redis INTERNALLY
    # No Dockerfile needed — we use the official image as-is

---
Line-by-line explanation:

"services:" = define the containers that make up this app

"flask:" = first container, named "flask"
  "build: ." = look for a Dockerfile in current folder, build it
  "ports: - '5000:5000'" = forward port 5000 to the container
  "depends_on: - redis" = don't start flask until redis is running
  "environment:" = set environment variables inside the container

"redis:" = second container, named "redis"
  "image: redis:7-alpine" = use this pre-built image directly
  "alpine" version = only 5 MB instead of 100 MB. Same Redis.
  We don't expose ports because only flask needs to talk to it.
  External users can't reach redis directly — only flask can.</div>

                <h3>Building and Running</h3>
                <div class="code-block">$ cd flask-app
$ docker compose up --build

What happens:
1. Docker reads docker-compose.yml
2. Sees two services: flask and redis
3. Pulls redis:7-alpine (it's pre-built, no Dockerfile needed)
4. Builds flask image from our Dockerfile
5. Starts redis container first (flask depends on it)
6. Starts flask container

Output:
[+] Building 32.1s (8/8) FINISHED
[+] Running 2/2
 ✓ Container flask-app-redis-1   Started   0.3s
 ✓ Container flask-app-flask-1   Started   0.5s

Two containers running. One command.</div>

                <h3>Testing the Multi-Container Setup</h3>
                <div class="code-block">--- First request (cache miss) ---
$ curl http://localhost:5000/items

Response:
{"items": ["laptop", "phone", "headphones"], "source": "database"}

"source": "database" means Redis had no cached data.
The app fetched items and STORED them in Redis (60-second cache).

--- Second request (within 60 seconds) ---
$ curl http://localhost:5000/items

Response:
{"items": ["laptop", "phone", "headphones"], "source": "cache"}

"source": "cache" means Redis had the data. No database hit.
This is what caching looks like in practice.
The second request is dramatically faster.

--- Health check ---
$ curl http://localhost:5000/health

Response:
{"status": "ok"}

This confirms Flask can reach Redis. If Redis was down,
this would return an error.</div>

                <h3>What Happens When Something Breaks</h3>
                <div class="code-block">Let's kill the redis container and see what happens:

$ docker stop flask-app-redis-1

Now try the health check:
$ curl http://localhost:5000/health

Response:
{"error": "Redis connection refused"}
(or a 500 Internal Server Error)

The Flask app tried to ping Redis, couldn't reach it.
This is how you DETECT broken dependencies in production.
Health checks catch this automatically.

Restart Redis:
$ docker start flask-app-redis-1

Try again:
$ curl http://localhost:5000/health
{"status": "ok"}

Back to normal. This is exactly how production monitoring works:
- Health endpoint checks all dependencies
- If anything is down, health check fails
- Kubernetes (or your monitoring tool) sees the failure
- Alerts go out. Team investigates.</div>

                <h2>Docker Compose Commands You'll Use Daily</h2>

                <table class="table">
                    <tr>
                        <th>Command</th>
                        <th>What It Does</th>
                        <th>When to Use</th>
                    </tr>
                    <tr>
                        <td>docker compose up</td>
                        <td>Start all containers</td>
                        <td>Starting your dev environment</td>
                    </tr>
                    <tr>
                        <td>docker compose up --build</td>
                        <td>Rebuild images, then start</td>
                        <td>After changing Dockerfile or code</td>
                    </tr>
                    <tr>
                        <td>docker compose down</td>
                        <td>Stop and remove containers</td>
                        <td>Done for the day</td>
                    </tr>
                    <tr>
                        <td>docker compose logs -f</td>
                        <td>See real-time logs from ALL containers</td>
                        <td>Debugging issues</td>
                    </tr>
                    <tr>
                        <td>docker compose ps</td>
                        <td>Show status of all containers</td>
                        <td>Quick status check</td>
                    </tr>
                    <tr>
                        <td>docker compose restart flask</td>
                        <td>Restart just the flask container</td>
                        <td>After changing code (hot reload)</td>
                    </tr>
                </table>

                <h2>Summary</h2>
                <ul style="margin: 1rem 0; margin-left: 2rem;">
                    <li>Project 1 (Todo API): Single container. Dockerfile with layer caching. Full CRUD API tested with curl</li>
                    <li>Project 2 (Flask + Redis): Multi-container with docker-compose. Services talk by name. Health checks detect failures</li>
                    <li>Always listen on 0.0.0.0 in containers, never localhost</li>
                    <li>Key debugging commands: docker logs, docker exec -it, docker inspect</li>
                    <li>Health endpoints (/health) that check all dependencies are essential for production</li>
                </ul>

                <p>You can now build and run real containers. Next: <strong>Kubernetes</strong> — what to do when you have thousands of these.</p>
            `,
            interviews: [
                {
                    question: "Walk through building a Node.js container from scratch. What files do you need and what does each one do?",
                    answer: "You need: package.json (lists dependencies like express), server.js (the actual app code), Dockerfile (build instructions: FROM node:18-slim, WORKDIR, COPY package.json, RUN npm install, COPY code, CMD to start), .dockerignore (excludes node_modules, .env, .git). Build with 'docker build -t myapp .' and run with 'docker run -p 3000:3000 myapp'."
                },
                {
                    question: "Why must apps inside containers listen on 0.0.0.0 instead of localhost?",
                    answer: "Inside a container, localhost (127.0.0.1) means 'inside this container only'. If your app listens on localhost:3000, requests from outside the container can't reach it — even with port mapping. 0.0.0.0 means 'accept connections on all network interfaces', which is how external traffic reaches the app through the port mapping."
                },
                {
                    question: "Explain how docker-compose handles dependencies between containers.",
                    answer: "'depends_on: - redis' tells Docker Compose to start the redis container before starting the flask container. The flask app references redis by its service name ('redis') as the hostname. Docker automatically creates a network where services can reach each other by name. No IP addresses needed."
                },
                {
                    question: "What is a health check endpoint and why is it critical?",
                    answer: "A health check endpoint (like GET /health) checks if the app and all its dependencies are working. It pings Redis, checks database connections, etc. If anything is down, it returns an error. Kubernetes and monitoring tools call this regularly — if it fails, they know the container is unhealthy and restart it or alert the team."
                },
                {
                    question: "What debugging commands would you use if a container's API started returning errors?",
                    answer: "1) 'docker logs my-container' to see error messages. 2) 'docker logs -f my-container' for real-time streaming logs. 3) 'docker exec -it my-container sh' to get a shell inside and manually check files, run commands. 4) 'docker inspect my-container' for full configuration details. Start with logs — 90% of issues are visible there."
                }
            ]
        },
        {
            id: 'what-is-kubernetes',
            title: 'What is Kubernetes? - Managing Containers at Scale',
            duration: '60 min',
            content: `
                <h2>Docker Alone Has a Limit</h2>
                <p>Docker runs containers on ONE machine. That's fine for development, fine for a small app. But when your app gets popular — thousands of users, multiple servers, containers crashing at 3 AM — you need something that manages all of that automatically. That's Kubernetes.</p>

                <div class="code-block">What Docker does:
  Build containers. Run containers. One machine.

What Docker CANNOT do:
  - Spread containers across multiple servers
  - Restart a crashed container automatically
  - Add more containers when traffic spikes
  - Balance traffic across running containers
  - Deploy new versions without downtime

What Kubernetes does:
  ALL of the above. Automatically. At any scale.</div>

                <h2>The Core Kubernetes Concepts — With Real YAML</h2>

                <h3>Concept 1: Pods — The Basic Unit</h3>
                <p>A Pod is one or more containers that are tightly coupled. Usually it's just one container. Kubernetes manages Pods, not individual containers.</p>

                <div class="code-block">📄 pod.yaml — a simple Pod definition

apiVersion: v1           # Kubernetes API version
kind: Pod                # We're defining a Pod
metadata:
  name: todo-pod         # Name of this Pod (must be unique)
  labels:                # Labels = tags for organizing
    app: todo            # We'll use this to find it later
spec:                    # The actual Pod specification
  containers:            # List of containers in this Pod
  - name: todo-api       # Container name
    image: todo-api:1.0  # Docker image to use
    ports:
    - containerPort: 3000  # Port the container listens on

---
To create this Pod:
$ kubectl apply -f pod.yaml

To check it:
$ kubectl get pods
NAME        READY   STATUS    RESTARTS   AGE
todo-pod    1/1     Running   0          10s

"1/1" = 1 container ready out of 1 total
"Running" = it's alive and working
"0" restarts = hasn't crashed

To see details:
$ kubectl describe pod todo-pod
Name:         todo-pod
Status:       Running
Containers:
  todo-api:
    Image:    todo-api:1.0
    Port:     3000/TCP
    Ready:    true

To delete it:
$ kubectl delete pod todo-pod</div>

                <h3>Concept 2: Deployments — The Smarter Way</h3>
                <p>You almost never create Pods directly. You create a Deployment instead. A Deployment manages Pods for you — it creates them, restarts them if they crash, and updates them.</p>

                <div class="code-block">📄 deployment.yaml

apiVersion: apps/v1
kind: Deployment
metadata:
  name: todo-deployment
  labels:
    app: todo
spec:
  replicas: 3                    # Run 3 copies (Pods) of this app
  selector:
    matchLabels:
      app: todo                  # This Deployment manages Pods with label "app: todo"
  template:                      # This is the Pod template — every Pod looks like this
    metadata:
      labels:
        app: todo                # Every Pod gets this label
    spec:
      containers:
      - name: todo-api
        image: todo-api:1.0
        ports:
        - containerPort: 3000
        resources:               # Resource limits (important!)
          requests:              # Minimum resources needed
            memory: "64Mi"       # 64 megabytes of RAM minimum
            cpu: "100m"          # 100 millicores (0.1 CPU) minimum
          limits:                # Maximum resources allowed
            memory: "128Mi"      # 128 MB max — if exceeded, container restarts
            cpu: "250m"          # 250 millicores max
        readinessProbe:          # "Is this Pod ready to receive traffic?"
          httpGet:
            path: /health        # Call our health endpoint
            port: 3000
          initialDelaySeconds: 5 # Wait 5 seconds before first check
          periodSeconds: 10      # Check every 10 seconds
        livenessProbe:           # "Is this Pod still alive?"
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 15
          periodSeconds: 20

---
What readinessProbe does:
  Before sending traffic to a Pod, K8s calls GET /health.
  If it returns 200 OK → Pod is ready, send it traffic.
  If it fails → Pod is NOT ready, don't send it traffic.
  (e.g., a new Pod is starting up, not ready for 10 seconds)

What livenessProbe does:
  While a Pod is running, K8s keeps calling GET /health.
  If it stops returning 200 OK → Pod is stuck/broken.
  K8s KILLS the Pod and starts a new one automatically.
  This is the self-healing mechanism.

What resources do:
  "requests" = how much the Pod needs. K8s won't put a Pod
  on a Node that doesn't have this much available.
  "limits" = the maximum. If the Pod uses more → killed.
  Without limits, one bad Pod could consume ALL server memory.</div>

                <div class="code-block">Deploy it:
$ kubectl apply -f deployment.yaml

Check Pods:
$ kubectl get pods
NAME                          READY   STATUS    RESTARTS   AGE
todo-deployment-abc12-xyz01   1/1     Running   0          5s
todo-deployment-abc12-xyz02   1/1     Running   0          5s
todo-deployment-abc12-xyz03   1/1     Running   0          5s

Three Pods running! Kubernetes named them automatically
(deployment name + random suffix).

Now let's see self-healing in action:
$ kubectl delete pod todo-deployment-abc12-xyz02

$ kubectl get pods
NAME                          READY   STATUS    RESTARTS   AGE
todo-deployment-abc12-xyz01   1/1     Running   0          30s
todo-deployment-abc12-xyz03   1/1     Running   0          30s
todo-deployment-abc12-xyz04   1/1     Running   0          3s   ← NEW!

We deleted one. Kubernetes noticed and created a replacement
within seconds. That's self-healing.</div>

                <h3>Concept 3: Services — Stable Network Addresses</h3>
                <div class="code-block">📄 service.yaml

apiVersion: v1
kind: Service
metadata:
  name: todo-service
spec:
  selector:                    # Which Pods does this Service route to?
    app: todo                  # Pods with label "app: todo"
  ports:
  - port: 80                   # The port the Service listens on
    targetPort: 3000           # The port on the Pod to forward to
  type: LoadBalancer           # Makes it accessible from outside

---
What this does:

Without Service:
  Pod 1: 10.244.1.1:3000  ← changes every time Pod restarts
  Pod 2: 10.244.1.2:3000
  Pod 3: 10.244.1.3:3000
  How does a user know which IP to use? They change!

With Service:
  Service: my-app.example.com:80  ← STABLE address, never changes
       ├→ Pod 1: 10.244.1.1:3000
       ├→ Pod 2: 10.244.1.2:3000
       └→ Pod 3: 10.244.1.3:3000

User hits my-app.example.com:80.
Service distributes traffic across all 3 Pods evenly.
If Pod 2 crashes, Service automatically stops sending it traffic.

"type: LoadBalancer" = creates an external IP address
that the internet can reach. Cloud providers (AWS, GCP)
handle the actual load balancer setup for you.</div>

                <h3>Concept 4: ConfigMaps — Configuration Without Code Changes</h3>
                <div class="code-block">📄 configmap.yaml

apiVersion: v1
kind: ConfigMap
metadata:
  name: todo-config
data:
  PORT: "3000"
  LOG_LEVEL: "info"
  MAX_CONNECTIONS: "100"

---
Why not just hardcode these in your app?
Because in production, you might need to change them
WITHOUT rebuilding the container.

ConfigMaps let you:
- Change config values instantly
- Apply changes without redeploying
- Keep config separate from code

Use them in your Deployment:
  containers:
  - name: todo-api
    env:                         # Load config as environment variables
    - name: PORT
      valueFrom:
        configMapKeyRef:
          name: todo-config      # Which ConfigMap
          key: PORT              # Which key

Now in your app:
  const PORT = process.env.PORT || 3000;
  // Reads PORT from environment, defaults to 3000</div>

                <h2>Kubernetes in Action — A Full Walkthrough</h2>

                <div class="code-block">Deploy everything and watch it work:

$ kubectl apply -f deployment.yaml
$ kubectl apply -f service.yaml
$ kubectl apply -f configmap.yaml

Check everything:
$ kubectl get all
NAME                                    READY   STATUS    RESTARTS   AGE
pod/todo-deployment-abc12-xyz01         1/1     Running   0          30s
pod/todo-deployment-abc12-xyz02         1/1     Running   0          30s
pod/todo-deployment-abc12-xyz03         1/1     Running   0          30s
deployment.apps/todo-deployment         3/3     3 available            30s
service/todo-service                    LoadBalancer   ...            30s

Everything is running.

--- Rolling Update (deploy new version) ---
Change image version in deployment.yaml:
  image: todo-api:2.0    (was 1.0)

$ kubectl apply -f deployment.yaml

Watch the update happen:
$ kubectl get pods -w
NAME                          READY   STATUS         RESTARTS
todo-deployment-abc12-xyz01   1/1     Running        0
todo-deployment-abc12-xyz02   1/1     Running        0
todo-deployment-abc12-xyz03   1/1     Running        0
todo-deployment-def34-xyz04   0/1     ContainerCreating  0    ← v2.0 starting
todo-deployment-def34-xyz04   1/1     Running        0         ← v2.0 ready!
todo-deployment-abc12-xyz01   1/1     Terminating    0         ← v1.0 stopping
todo-deployment-abc12-xyz01   0/0     Terminated     0         ← v1.0 gone
todo-deployment-def34-xyz05   0/1     ContainerCreating  0
...

It swaps them ONE AT A TIME. Users never see downtime.

--- Auto-Scaling ---
$ kubectl autoscale deployment todo-deployment \
         --min=2 --max=10 --cpu-percent=70

This creates a HorizontalPodAutoscaler.
If CPU > 70% → add a Pod (up to 10 max).
If CPU < 70% with extra Pods → remove one (down to 2 min).</div>

                <h2>Summary</h2>
                <ul style="margin: 1rem 0; margin-left: 2rem;">
                    <li>Pods = the unit K8s manages. Deployments = smarter Pod managers (replicas, updates, self-healing)</li>
                    <li>Services = stable network addresses that load-balance across Pods</li>
                    <li>readinessProbe checks if a Pod is ready for traffic. livenessProbe checks if it's still alive</li>
                    <li>Resource requests/limits prevent one bad Pod from consuming everything</li>
                    <li>ConfigMaps separate configuration from code — change config without rebuilding</li>
                    <li>Rolling updates swap containers one at a time. Zero downtime.</li>
                </ul>

                <p>Final lesson: how all of this runs at Google, Airbnb, and Spotify — and the full code-to-production pipeline.</p>
            `,
            interviews: [
                {
                    question: "What's the difference between a Pod and a Deployment in Kubernetes?",
                    answer: "A Pod is the basic unit — one or more containers running together. A Deployment manages Pods: it creates the specified number of replicas, restarts crashed ones automatically, and handles rolling updates. You almost never create Pods directly. You create a Deployment and it manages the Pods for you."
                },
                {
                    question: "Explain readinessProbe and livenessProbe. What happens if each one fails?",
                    answer: "readinessProbe checks if a Pod is ready to receive traffic (calls /health). If it fails, Kubernetes stops sending traffic to that Pod but doesn't restart it (it might still be starting up). livenessProbe checks if a Pod is still alive during runtime. If it fails, Kubernetes kills and restarts the Pod — this is the self-healing mechanism."
                },
                {
                    question: "Why do you need resource requests and limits on containers?",
                    answer: "Requests tell K8s the minimum resources needed — it won't schedule a Pod on a Node without enough. Limits set the maximum — if a Pod exceeds its memory limit, it's killed (prevents one runaway container from crashing the whole server). Without limits, a memory leak could consume all server RAM and take down every other Pod on that Node."
                },
                {
                    question: "What is a Service in Kubernetes and why do you need one?",
                    answer: "A Service provides a stable network address for Pods. Pods get new IP addresses every time they restart, so you can't hardcode IPs. A Service has one stable address, automatically discovers Pods via labels, and load-balances traffic across them. It also stops sending traffic to unhealthy Pods."
                },
                {
                    question: "Explain how a rolling update works in Kubernetes.",
                    answer: "When you change the image version in a Deployment, K8s doesn't stop all Pods at once. It creates one new Pod (v2), waits until it passes readinessProbe, THEN terminates one old Pod (v1). Repeats until all Pods are v2. At every point, healthy Pods are serving traffic. Users never experience downtime."
                }
            ]
        },
        {
            id: 'kubernetes-real-world',
            title: 'Kubernetes in the Real World - Full Stack Deployment',
            duration: '60 min',
            content: `
                <h2>The Full Picture: Code to Production</h2>
                <p>You've learned containers, Docker, and Kubernetes individually. Now let's put it all together the way a real company does it. This is the complete pipeline — from a developer writing code on a laptop to that code running for millions of users.</p>

                <h2>The Complete Architecture</h2>

                <div class="code-block">Here's what a production deployment looks like:

Developer          CI/CD            Cloud Infrastructure
   │                 │                      │
   ▼                 ▼                      ▼
┌──────┐     ┌───────────┐     ┌─────────────────────┐
│ Code │────▶│  GitHub   │────▶│   Load Balancer     │
│      │ push│  Actions  │     │   (AWS/GCP)         │
│ +    │     │  (tests,  │     └──────────┬──────────┘
│ Docker│    │   build,  │               │
│ files│     │   push)   │     ┌──────────▼──────────┐
└──────┘     └───────────┘     │  Kubernetes Cluster │
                                │                     │
              ┌─────────┐      │  ┌─────┐ ┌─────┐   │
              │ Docker  │◀─────│  │Pod 1│ │Pod 2│   │
              │   Hub   │      │  └─────┘ └─────┘   │
              │(images) │      │  ┌─────┐ ┌─────┐   │
              └─────────┘      │  │Pod 3│ │Pod 4│   │
                                │  └─────┘ └─────┘   │
                                │                     │
                                │  ┌─────────────┐   │
                                │  │  Database   │   │
                                │  │  (managed)  │   │
                                │  └─────────────┘   │
                                └─────────────────────┘</div>

                <h2>Step by Step: What Happens When Code Ships</h2>

                <h3>Step 1: Developer Writes and Tests Locally</h3>
                <div class="code-block">Developer's machine:

$ git clone github.com/company/todo-app
$ docker compose up --build     # Start everything locally
$ curl http://localhost:3000/todos  # Test it works

# Make changes to server.js
# Test again locally
# Everything works

$ git add .
$ git commit -m "Add search feature to todos"
$ git push origin feature/search   # Push to GitHub

That push triggers everything that follows.</div>

                <h3>Step 2: CI/CD Pipeline Runs Automatically</h3>
                <div class="code-block">📄 .github/workflows/deploy.yml
(GitHub Actions — runs automatically on every push)

name: Build and Deploy
on:
  push:
    branches: [main]             # Only deploy from "main" branch

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest       # Runs on a fresh Ubuntu container!
    steps:
    - uses: actions/checkout@v4  # Download the code

    - name: Run Tests            # Step 1: Make sure code works
      run: |
        npm install
        npm test                 # If tests fail, pipeline STOPS here

    - name: Build Docker Image   # Step 2: Build the container
      run: |
        docker build -t mycompany/todo-api:\${{ github.sha }} .
        # github.sha = unique commit ID (e.g., "a3f7b2c")
        # So each commit gets its own image version

    - name: Push to Docker Hub   # Step 3: Upload to registry
      run: |
        docker push mycompany/todo-api:\${{ github.sha }}

    - name: Deploy to Kubernetes # Step 4: Update K8s deployment
      run: |
        kubectl set image deployment/todo-deployment \
          todo-api=mycompany/todo-api:\${{ github.sha }}
        # This triggers a rolling update in Kubernetes

---
The whole pipeline runs in ~3-5 minutes.
If tests fail → pipeline stops, no deployment.
If build fails → pipeline stops, no deployment.
Only if EVERYTHING passes → code reaches production.</div>

                <h3>Step 3: Kubernetes Handles the Deployment</h3>
                <div class="code-block">After kubectl set image runs:

$ kubectl rollout status deployment/todo-deployment
Waiting for deployment "todo-deployment" rollout to finish:
  1 out of 3 updated...
  2 out of 3 updated...
  3 out of 3 updated...
  3 of 3 updated deployment replicas are available.
rollout successfully finished

What happened under the hood:
1. K8s saw the new image version
2. Created Pod with new image
3. Waited for readinessProbe to pass
4. Started sending traffic to new Pod
5. Terminated one old Pod
6. Repeated for all 3 Pods
7. All Pods now running new version

If the new version was BAD (readinessProbe fails):
$ kubectl rollout undo deployment/todo-deployment
→ Rolls back to previous version instantly.</div>

                <h2>Case Study: How Google Runs Search</h2>

                <div class="code-block">Google Search handles 8.5 BILLION searches per day.
That's ~100,000 searches per second.

The architecture (simplified):

1. User types "weather in New York"
2. Request hits Google's load balancer
   (one of many, spread across the world)
3. Load balancer picks the nearest data center
4. Inside that data center, Kubernetes routes the request

Inside Kubernetes:
  a) Query Parsing Pod  → understands what you're asking
  b) Index Lookup Pods  → finds relevant web pages
     (thousands of Pods, each with a piece of the index)
  c) Ranking Pods       → decides which results matter most
  d) Ads Pods           → finds relevant ads
  e) Response Pods      → assembles everything into HTML

5. Response sent back. Total time: 200-500 milliseconds.

Google deploys updates to Search MULTIPLE TIMES per day.
Each update goes through:
  - Automated tests
  - Canary deployment (1% of traffic)
  - Gradual rollout (10% → 50% → 100%)
  - Automatic rollback if error rate increases

If any step fails → automatic rollback.
Users never see a bad version.</div>

                <h2>Case Study: Airbnb's Black Friday Scaling</h2>

                <div class="code-block">Airbnb's traffic is unpredictable. Travel peaks happen.

Normal Tuesday in January:
  ~50 Pods running the search service
  Traffic: 10,000 searches/minute
  CPU usage: 30%

Black Friday (travel planning rush):
  Traffic jumps to 200,000 searches/minute (20x!)
  
What happens automatically:
  10:00 AM: CPU hits 70% → auto-scaler adds 5 Pods (55 total)
  10:15 AM: Still climbing → adds 10 more (65 total)
  11:00 AM: Peak → 120 Pods running
  
  Each new Pod:
  1. Starts in ~10 seconds
  2. Passes readinessProbe
  3. Starts receiving traffic
  
  No engineer intervened. No manual scaling.
  Kubernetes handled 20x traffic increase automatically.

Saturday afternoon (traffic drops):
  Auto-scaler removes Pods as CPU drops below threshold.
  Back to 50-60 Pods by evening.
  
  Airbnb SAVED money by scaling down after the rush.
  They only paid for the Pods they actually needed.</div>

                <h2>Monitoring: How You Know Things Are Working</h2>

                <div class="code-block">Production isn't "deploy and forget." You need to WATCH.

Key metrics to monitor:

1. Pod Health
   $ kubectl get pods --all-namespaces
   Shows all Pods. Any in "CrashLoopBackOff"? Fix those.
   Any with high RESTARTS? Something is wrong.

2. Resource Usage
   $ kubectl top pods
   NAME                          CPU(cores)   MEMORY(bytes)
   todo-deployment-abc-xyz01     50m          45Mi
   todo-deployment-abc-xyz02     120m         67Mi     ← using more CPU
   todo-deployment-abc-xyz03     45m          42Mi

   If one Pod is using way more than others → investigate.

3. Events (what happened recently)
   $ kubectl get events --sort-by='.lastTimestamp'
   LAST SEEN   TYPE     REASON           OBJECT            MESSAGE
   5m          Normal   Scheduled        Pod/todo-xyz04    Successfully assigned to node-2
   3m          Normal   Started          Pod/todo-xyz04    Started container todo-api
   1m          Warning  Unhealthy        Pod/todo-xyz03    Liveness probe failed: HTTP 500
   30s         Normal   Killing          Pod/todo-xyz03    Container killed (liveness probe failed)
   10s         Normal   Created          Pod/todo-xyz05    Created container todo-api

   This tells the STORY of what happened.
   Pod xyz03 failed its liveness probe → K8s killed it → created xyz05.

4. Application Logs
   $ kubectl logs todo-deployment-abc-xyz01
   Shows the container's output.
   $ kubectl logs -l app=todo --tail=100
   Shows last 100 lines from ALL Pods with label "app: todo".</div>

                <h2>What Happens When Production Goes Wrong</h2>

                <div class="code-block">Real scenario: 2 AM, on-call engineer's phone rings.

Alert: "todo-api error rate > 5%"

Step 1: Check what's happening
$ kubectl get pods
NAME                          READY   STATUS             RESTARTS
todo-deployment-abc-xyz01     1/1     Running            0
todo-deployment-abc-xyz02     0/1     CrashLoopBackOff   5     ← THIS ONE
todo-deployment-abc-xyz03     1/1     Running            0

"CrashLoopBackOff" = container keeps crashing and restarting.
K8s is trying to fix it but it keeps dying.

Step 2: See WHY it's crashing
$ kubectl logs todo-deployment-abc-xyz02 --previous
Error: Cannot connect to database
  at DatabaseClient.connect (db.js:45)
  Connection refused: host=db.example.com port=5432

The database is unreachable! That's the root cause.

Step 3: Check the database
$ kubectl get pods -l app=postgres
NAME              READY   STATUS      RESTARTS
postgres-pod-1    0/1     OOMKilled   3

"OOMKilled" = Out Of Memory Killed.
The database Pod ran out of memory and got killed.

Step 4: Fix the database (increase memory limit)
Edit the postgres deployment: memory limit 512Mi → 1Gi
$ kubectl apply -f postgres-deployment.yaml

Step 5: Verify
$ kubectl get pods
NAME                          READY   STATUS    RESTARTS
todo-deployment-abc-xyz01     1/1     Running   0
todo-deployment-abc-xyz02     1/1     Running   0        ← recovered!
todo-deployment-abc-xyz03     1/1     Running   0
postgres-pod-1                1/1     Running   0        ← recovered!

Everything is green. Problem solved.
Total resolution: 15 minutes.</div>

                <h2>The Tools You'll Actually Use</h2>

                <table class="table">
                    <tr>
                        <th>Tool</th>
                        <th>What It Does</th>
                        <th>When You Use It</th>
                    </tr>
                    <tr>
                        <td><strong>kubectl</strong></td>
                        <td>Command-line for Kubernetes</td>
                        <td>Every day — deploy, check, debug</td>
                    </tr>
                    <tr>
                        <td><strong>Helm</strong></td>
                        <td>Package manager for K8s apps</td>
                        <td>Installing complex apps (databases, monitoring)</td>
                    </tr>
                    <tr>
                        <td><strong>GitHub Actions</strong></td>
                        <td>CI/CD automation</td>
                        <td>Auto-test and deploy on every commit</td>
                    </tr>
                    <tr>
                        <td><strong>Prometheus + Grafana</strong></td>
                        <td>Metrics collection + dashboards</td>
                        <td>Monitoring app health and performance</td>
                    </tr>
                    <tr>
                        <td><strong>EKS / GKE / AKS</strong></td>
                        <td>Managed Kubernetes on cloud</td>
                        <td>Running K8s without managing the control plane</td>
                    </tr>
                </table>

                <h2>Summary</h2>
                <ul style="margin: 1rem 0; margin-left: 2rem;">
                    <li>Production pipeline: code → tests → Docker build → push image → K8s rolling update → monitor</li>
                    <li>Google deploys Search multiple times per day with canary rollouts and automatic rollback</li>
                    <li>Airbnb handles 20× traffic spikes automatically with Kubernetes auto-scaling — no human intervention</li>
                    <li>Monitoring is not optional — kubectl get pods, logs, events, and top are your daily tools</li>
                    <li>Production incidents are debugged with kubectl logs and describe — the tools tell you what broke and why</li>
                    <li>A typical incident can be resolved in 15 minutes with the right Kubernetes tooling</li>
                </ul>

                <h2>Your Next Steps</h2>
                <ol style="margin: 1rem 0; margin-left: 2rem;">
                    <li><strong>Install Docker Desktop</strong> — start running containers today</li>
                    <li><strong>Build Project 1 from Lesson 4</strong> — the Todo API. Do it yourself, don't just read</li>
                    <li><strong>Build Project 2</strong> — Flask + Redis with docker-compose</li>
                    <li><strong>Install minikube or kind</strong> — run Kubernetes locally on your laptop</li>
                    <li><strong>Deploy your Todo API to local K8s</strong> — write the Deployment and Service YAML</li>
                    <li><strong>Get CKA certified</strong> — Certified Kubernetes Administrator is one of the most valuable certs in tech</li>
                </ol>

                <p>You now understand the full stack. Every app you use — Netflix, Uber, LinkedIn, Spotify — runs on exactly this. You have the foundation to build on.</p>
            `,
            interviews: [
                {
                    question: "Walk through the full CI/CD pipeline from code change to production.",
                    answer: "Developer pushes code to GitHub → GitHub Actions triggers automatically → runs tests (if fail, stops) → builds Docker image tagged with commit ID → pushes image to Docker Hub → runs kubectl set image to update the Kubernetes Deployment → K8s does a rolling update (new Pods start, readiness checked, old Pods terminated one by one) → monitoring watches error rates. If anything fails, automatic rollback."
                },
                {
                    question: "How would you debug a production incident where Pods are in CrashLoopBackOff?",
                    answer: "1) kubectl get pods — see which Pods are crashing. 2) kubectl logs <pod-name> --previous — see the crash error message. 3) kubectl describe pod <name> — see events and why it's failing. 4) Check dependencies — if logs say 'connection refused', check if the database/Redis/etc. Pods are healthy. 5) kubectl get events — see the timeline of what happened. Fix the root cause, not just the symptom."
                },
                {
                    question: "How did Airbnb handle a 20x traffic spike without manual intervention?",
                    answer: "Kubernetes HorizontalPodAutoscaler watched CPU usage. When it crossed 70%, it added Pods automatically (up to the configured max of 120). Each new Pod started in ~10 seconds, passed readiness checks, and started receiving traffic. When traffic dropped, it removed excess Pods. No engineer had to do anything — the entire scale-up and scale-down was automatic."
                },
                {
                    question: "What is OOMKilled and what causes it?",
                    answer: "OOMKilled means 'Out Of Memory Killed.' When a container exceeds its memory limit (set in the resource limits section of the Deployment), the Linux kernel kills it. Kubernetes sees it died and tries to restart it. If it keeps running out of memory, it enters CrashLoopBackOff. Fix: increase the memory limit in the Deployment YAML, or fix the memory leak in the code."
                },
                {
                    question: "Why do you tag Docker images with git commit hashes instead of version numbers like v1, v2?",
                    answer: "Git commit hashes (like 'a3f7b2c') are unique per commit and immutable — they always refer to the exact same code. Version numbers like 'v1' can be overwritten (someone could push a new image with the same v1 tag). With commit hashes, you always know exactly which code is running, can roll back precisely, and CI/CD can automatically tag without manual version management."
                }
            ]
        }
    ]
};
