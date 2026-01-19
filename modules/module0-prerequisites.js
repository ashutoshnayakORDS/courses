// Module 0: Prerequisites & Interview Framework
// Essential foundational content for system design mastery

const module0Prerequisites = {
    title: 'Module 0: System Design Foundations',
    lessons: [
        {
            id: 'system-design-interview-framework',
            title: 'System Design Interview Framework',
            duration: '45 min',
            content: `
                <h2>The System Design Interview</h2>
                <p>System design interviews test your ability to design large-scale distributed systems. Unlike coding interviews, there's no single correct answer. Interviewers evaluate your thought process, communication skills, and technical depth.</p>

                <h3>What Interviewers Look For</h3>
                <ul>
                    <li><strong>Problem-solving approach:</strong> Can you break down ambiguous problems?</li>
                    <li><strong>Technical breadth:</strong> Do you know various technologies and trade-offs?</li>
                    <li><strong>Technical depth:</strong> Can you dive deep when needed?</li>
                    <li><strong>Communication:</strong> Can you explain complex ideas clearly?</li>
                    <li><strong>Collaboration:</strong> Do you ask clarifying questions and take feedback?</li>
                </ul>

                <h2>The 4-Step Framework (RECS)</h2>
                <p>Use this framework for every system design interview:</p>

                <div class="code-block">
┌─────────────────────────────────────────────────────────┐
│           THE RECS FRAMEWORK (45-60 minutes)            │
├─────────────────────────────────────────────────────────┤
│ R - Requirements (5-10 min)                             │
│     Clarify scope, functional & non-functional reqs    │
├─────────────────────────────────────────────────────────┤
│ E - Estimation (5 min)                                  │
│     Back-of-envelope calculations for scale            │
├─────────────────────────────────────────────────────────┤
│ C - Core Design (20-25 min)                             │
│     High-level architecture, API, data model           │
├─────────────────────────────────────────────────────────┤
│ S - Scale & Deep Dive (15-20 min)                       │
│     Handle scale, bottlenecks, edge cases              │
└─────────────────────────────────────────────────────────┘
</div>

                <h2>Step 1: Requirements (5-10 minutes)</h2>
                <p>NEVER start designing immediately. Always clarify requirements first.</p>

                <h3>Questions to Ask</h3>
                <div class="code-block">Functional Requirements:
- What are the core features?
- Who are the users? (B2B vs B2C)
- What actions can users perform?
- What's the primary use case?

Non-Functional Requirements:
- What's the expected scale? (users, requests/sec)
- What's the read/write ratio?
- What's the latency requirement?
- How important is availability vs consistency?
- Any data retention requirements?
- Geographic distribution needed?

Constraints:
- Any technology constraints?
- Budget considerations?
- Timeline?</div>

                <h3>Example: Design Twitter</h3>
                <div class="code-block">Clarifying questions you should ask:

1. "What features should we focus on?"
   → Tweet posting, timeline, follow/unfollow, search

2. "How many users?"
   → 500M total users, 200M daily active

3. "How many tweets per day?"
   → 500M tweets/day

4. "Read/write ratio?"
   → 1000:1 (timeline reads >> tweet writes)

5. "Latency requirements?"
   → Timeline: <200ms, Tweet: <500ms

6. "Global or single region?"
   → Global with emphasis on US, Europe, Asia</div>

                <h2>Step 2: Estimation (5 minutes)</h2>
                <p>Quick math to understand the scale. This shows interviewers you can think quantitatively.</p>

                <div class="code-block">Standard estimations to calculate:

1. Traffic (QPS - Queries Per Second)
   DAU × actions per user / 86,400 seconds

2. Storage
   Data per item × items per day × retention period

3. Bandwidth
   QPS × data size per request

4. Memory (for caching)
   Working set size × cache percentage

Example for Twitter:
- Tweets/sec: 500M / 86,400 ≈ 6,000 tweets/sec
- Timeline reads: 6,000 × 1000 = 6M reads/sec
- Storage/day: 500M tweets × 500 bytes = 250 GB/day
- 5 years: 250 GB × 365 × 5 = 450 TB</div>

                <h2>Step 3: Core Design (20-25 minutes)</h2>
                <p>This is the main part. Design the system architecture.</p>

                <h3>Start with High-Level Design</h3>
                <div class="code-block">Always draw these components:

1. Clients (Web, Mobile, API)
          │
          ▼
2. Load Balancer / API Gateway
          │
          ▼
3. Application Servers (stateless)
          │
    ┌─────┼─────┐
    ▼     ▼     ▼
4. Services (broken by domain)
    │     │     │
    ▼     ▼     ▼
5. Data Layer (databases, caches, queues)</div>

                <h3>Define APIs</h3>
                <div class="code-block">For Twitter:

POST /tweets
  body: { content, media_ids }
  returns: { tweet_id, created_at }

GET /timeline?user_id={id}&cursor={cursor}
  returns: { tweets: [...], next_cursor }

POST /follow
  body: { follower_id, followee_id }
  returns: { success: true }

GET /users/{id}
  returns: { user_id, name, followers_count, ... }</div>

                <h3>Design Data Model</h3>
                <div class="code-block">Users Table:
| user_id (PK) | name | email | created_at |

Tweets Table:
| tweet_id (PK) | user_id (FK) | content | media_url | created_at |

Follows Table:
| follower_id | followee_id | created_at |
| (PK: follower_id + followee_id) |

Choose database type:
- Relational (MySQL/PostgreSQL): Complex queries, ACID
- NoSQL (Cassandra/DynamoDB): High write throughput, scale
- Graph (Neo4j): Social connections
- Time-series (InfluxDB): Metrics, logs</div>

                <h2>Step 4: Scale & Deep Dive (15-20 minutes)</h2>
                <p>Address scalability challenges and dive deep into specific components.</p>

                <h3>Common Scaling Patterns</h3>
                <div class="code-block">1. Horizontal Scaling
   - Add more servers behind load balancer
   - Stateless services

2. Database Scaling
   - Read replicas for read-heavy workloads
   - Sharding for write-heavy or large data
   - Caching layer (Redis/Memcached)

3. Caching
   - CDN for static content
   - Application cache for computed results
   - Database query cache

4. Asynchronous Processing
   - Message queues (Kafka, RabbitMQ)
   - Background workers
   - Event-driven architecture

5. Data Partitioning
   - By user_id (hash-based)
   - By geography
   - By time (for time-series data)</div>

                <h3>Identify and Address Bottlenecks</h3>
                <div class="code-block">For Twitter timeline:

Bottleneck: Generating timeline for users following 1000s of people

Solutions to discuss:
1. Fan-out on write (push model)
   - Pre-compute timelines
   - Write tweet to all followers' timelines
   - Fast reads, expensive writes

2. Fan-out on read (pull model)
   - Compute timeline at read time
   - Query all followed users' tweets
   - Cheap writes, expensive reads

3. Hybrid approach (Twitter's solution)
   - Fan-out on write for normal users
   - Fan-out on read for celebrities
   - Balance write and read costs</div>

                <h2>Communication Tips</h2>

                <h3>Do's</h3>
                <ul>
                    <li>Think out loud - explain your reasoning</li>
                    <li>Ask clarifying questions</li>
                    <li>Discuss trade-offs for each decision</li>
                    <li>Start simple, then iterate</li>
                    <li>Use diagrams liberally</li>
                    <li>Acknowledge limitations of your design</li>
                </ul>

                <h3>Don'ts</h3>
                <ul>
                    <li>Don't jump into details without high-level design</li>
                    <li>Don't ignore the interviewer's hints</li>
                    <li>Don't be silent - always explain your thinking</li>
                    <li>Don't over-engineer for day 1</li>
                    <li>Don't forget about failure scenarios</li>
                </ul>

                <h2>Common Mistakes to Avoid</h2>
                <div class="code-block">1. Not clarifying requirements
   → You might solve the wrong problem

2. Skipping estimation
   → Design might not handle actual scale

3. Single point of failure
   → Always add redundancy

4. Ignoring data consistency
   → Discuss CAP trade-offs

5. Not addressing hot spots
   → Celebrity problem, popular items

6. Forgetting about failure modes
   → What happens when X fails?

7. Over-engineering
   → Start simple, add complexity as needed</div>

                <h2>Summary</h2>
                <p>Use the RECS framework: Requirements → Estimation → Core Design → Scale. Always clarify requirements first, do quick math, design iteratively, and discuss trade-offs. Communication is as important as the technical solution. Practice regularly with different system design problems.</p>
            `,
            interviews: [
                {
                    question: "How do you approach a system design interview?",
                    answer: "Use the RECS framework: 1) Requirements (5-10 min) - clarify functional and non-functional requirements, 2) Estimation (5 min) - back-of-envelope calculations for scale, 3) Core Design (20-25 min) - high-level architecture, APIs, data model, 4) Scale & Deep Dive (15-20 min) - address bottlenecks, scaling strategies. Always think out loud and discuss trade-offs."
                },
                {
                    question: "What questions should you ask before designing?",
                    answer: "Functional: What features? Who are users? Core use cases? Non-functional: Expected scale (users, QPS)? Read/write ratio? Latency requirements? Availability vs consistency priority? Data retention? Geographic distribution? These clarifications determine the entire design direction."
                },
                {
                    question: "What are common mistakes in system design interviews?",
                    answer: "1) Not clarifying requirements - solving wrong problem, 2) Skipping estimation - design may not handle scale, 3) Single points of failure - need redundancy, 4) Ignoring consistency - must discuss CAP trade-offs, 5) Not addressing hot spots - celebrity problem, 6) Forgetting failure modes, 7) Over-engineering for day 1."
                },
                {
                    question: "How do you handle a problem you've never seen before?",
                    answer: "Apply first principles: 1) Break into smaller known problems, 2) Identify similar systems you know, 3) Start with basic components (clients, servers, databases), 4) Add complexity incrementally, 5) Ask interviewer for hints if stuck. The framework works for any problem - requirements, estimation, design, scale."
                }
            ]
        },
        {
            id: 'back-of-envelope-estimation',
            title: 'Back-of-Envelope Estimation',
            duration: '40 min',
            content: `
                <h2>Why Estimation Matters</h2>
                <p>Back-of-envelope estimation is a critical skill in system design. It helps you understand scale, make informed architecture decisions, and identify potential bottlenecks before they become problems.</p>

                <h3>Powers of 2 - Memorize These</h3>
                <div class="code-block">
┌─────────────┬────────────────┬─────────────────┐
│   Power     │     Exact      │   Approximate   │
├─────────────┼────────────────┼─────────────────┤
│    2^10     │     1,024      │   1 Thousand    │
│    2^20     │   1,048,576    │   1 Million     │
│    2^30     │ 1,073,741,824  │   1 Billion     │
│    2^40     │       ~        │   1 Trillion    │
└─────────────┴────────────────┴─────────────────┘

Memory Sizes:
1 KB = 2^10 bytes = 1,024 bytes
1 MB = 2^20 bytes = ~1 million bytes
1 GB = 2^30 bytes = ~1 billion bytes
1 TB = 2^40 bytes = ~1 trillion bytes
1 PB = 2^50 bytes = 1,000 TB</div>

                <h3>Time Conversions</h3>
                <div class="code-block">
┌────────────────┬──────────────────────────────┐
│    Period      │         Seconds              │
├────────────────┼──────────────────────────────┤
│   1 minute     │         60                   │
│   1 hour       │       3,600                  │
│   1 day        │      86,400  (~100K)         │
│   1 week       │     604,800  (~600K)         │
│   1 month      │   2,592,000  (~2.5M)         │
│   1 year       │  31,536,000  (~32M)          │
└────────────────┴──────────────────────────────┘

Quick tricks:
- 1 day ≈ 100,000 seconds (for easy math)
- 1 month ≈ 2.5 million seconds
- 1 year ≈ 30 million seconds</div>

                <h2>Latency Numbers Every Developer Should Know</h2>
                <div class="code-block">
┌───────────────────────────────────┬─────────────┐
│           Operation               │   Latency   │
├───────────────────────────────────┼─────────────┤
│ L1 cache reference                │    0.5 ns   │
│ L2 cache reference                │      7 ns   │
│ Main memory reference             │    100 ns   │
│ SSD random read                   │    150 μs   │
│ Read 1 MB from memory             │    250 μs   │
│ Read 1 MB from SSD                │      1 ms   │
│ Disk seek                         │     10 ms   │
│ Read 1 MB from disk               │     20 ms   │
│ Send packet CA → Netherlands → CA │    150 ms   │
└───────────────────────────────────┴─────────────┘

Key insights:
- Memory is 1000x faster than SSD
- SSD is 10-20x faster than HDD
- Network round-trip can be 100+ ms
- Caching is CRITICAL for performance</div>

                <h2>Common Data Sizes</h2>
                <div class="code-block">
┌─────────────────────────────┬────────────────────┐
│         Data Type           │    Typical Size    │
├─────────────────────────────┼────────────────────┤
│ Character (ASCII)           │    1 byte          │
│ Character (UTF-8)           │    1-4 bytes       │
│ Integer                     │    4 bytes         │
│ Long / Double               │    8 bytes         │
│ UUID                        │    16 bytes        │
│ MD5 hash                    │    16 bytes        │
│ SHA-256 hash                │    32 bytes        │
│ URL (average)               │    100 bytes       │
│ Tweet (text only)           │    280 bytes       │
│ Image thumbnail             │    10 KB           │
│ Web page (HTML)             │    100 KB          │
│ Image (compressed)          │    200 KB - 2 MB   │
│ Video (1 min, 720p)         │    50 MB           │
│ Video (1 min, 1080p)        │    150 MB          │
└─────────────────────────────┴────────────────────┘</div>

                <h2>Traffic Estimation Template</h2>
                <div class="code-block">Given:
- Daily Active Users (DAU): X
- Actions per user per day: Y

Queries Per Second (QPS):
QPS = (DAU × Actions) / Seconds per day
QPS = (X × Y) / 86,400

Example: Twitter
- DAU: 200 million
- Tweets per user per day: 2
- Timeline views per user: 10

Write QPS (tweets):
= 200M × 2 / 86,400
= 400M / 86,400
≈ 4,600 tweets/second

Read QPS (timeline):
= 200M × 10 / 86,400
= 2B / 86,400
≈ 23,000 reads/second

Peak QPS (3x average):
Write: ~14,000/sec
Read: ~70,000/sec</div>

                <h2>Storage Estimation Template</h2>
                <div class="code-block">Formula:
Storage = Items × Size per item × Retention period

Example: Twitter (5 year retention)

Tweets:
- 400M tweets/day × 500 bytes = 200 GB/day
- Per year: 200 GB × 365 = 73 TB/year
- 5 years: 73 TB × 5 = 365 TB

Media (images/videos):
- 20% of tweets have media
- Average media: 500 KB
- 80M media/day × 500 KB = 40 TB/day
- 5 years: 40 TB × 365 × 5 = 73 PB

User data:
- 500M users × 1 KB = 500 GB

Total: ~365 TB text + 73 PB media</div>

                <h2>Bandwidth Estimation</h2>
                <div class="code-block">Formula:
Bandwidth = QPS × Data size per request

Example: Video streaming (Netflix)

Assumptions:
- 10 million concurrent viewers
- Average bitrate: 5 Mbps (HD)

Bandwidth = 10M × 5 Mbps = 50 Tbps

That's why Netflix has its own CDN (Open Connect)!

For API traffic:
- 70,000 timeline reads/sec
- 100 KB per timeline
- Bandwidth = 70K × 100 KB = 7 GB/sec = 56 Gbps</div>

                <h2>Cache Size Estimation</h2>
                <div class="code-block">Rule: Cache the "hot" data (80/20 rule)
- 20% of data serves 80% of requests

Formula:
Cache size = Daily traffic × Size per request × Cache ratio

Example: Twitter timeline cache

- 200M DAU × 10 timeline views = 2B views/day
- Unique timelines: ~200M (one per user)
- Active users needing cache: 20% = 40M users
- Timeline size: 1 KB (tweet IDs only)
- Cache size: 40M × 1 KB = 40 GB

Add buffer (2x): 80 GB Redis cluster</div>

                <h2>Server Estimation</h2>
                <div class="code-block">Assumptions (modern server):
- 1 web server: 10K-100K QPS (depending on complexity)
- 1 database server: 10K-50K QPS
- Memory: 64-256 GB RAM
- Storage: 1-10 TB SSD

Example: Handle 100K QPS

Web servers:
- Each handles 10K QPS
- Need: 100K / 10K = 10 servers
- Add redundancy (2x): 20 servers

Database:
- Each handles 20K QPS
- Need: 100K / 20K = 5 servers
- With replication (3x): 15 database servers

Cache:
- Redis: 100K+ QPS per node
- Need: 1-2 Redis nodes (with replicas: 4-6 nodes)</div>

                <h2>Quick Reference Cheat Sheet</h2>
                <div class="code-block">
┌─────────────────────────────────────────────────────┐
│           ESTIMATION CHEAT SHEET                     │
├─────────────────────────────────────────────────────┤
│ 1 day = ~100K seconds                               │
│ 1 month = ~2.5M seconds                             │
│ 1 year = ~30M seconds                               │
├─────────────────────────────────────────────────────┤
│ 1 million requests/day = ~12 QPS                    │
│ 100 million requests/day = ~1,200 QPS               │
│ 1 billion requests/day = ~12,000 QPS                │
├─────────────────────────────────────────────────────┤
│ 1 KB × 1M = 1 GB                                    │
│ 1 KB × 1B = 1 TB                                    │
│ 1 MB × 1M = 1 TB                                    │
├─────────────────────────────────────────────────────┤
│ 1 web server ≈ 10K-100K QPS                         │
│ 1 database ≈ 10K-50K QPS                            │
│ 1 Redis node ≈ 100K+ QPS                            │
├─────────────────────────────────────────────────────┤
│ Memory: 100ns                                       │
│ SSD: 100μs (1000x slower than memory)               │
│ HDD: 10ms (100x slower than SSD)                    │
│ Network: 50-150ms (round trip)                      │
└─────────────────────────────────────────────────────┘
</div>

                <h2>Practice Problems</h2>
                <div class="code-block">Problem 1: Design YouTube

Given:
- 2 billion users
- 1 billion video views/day
- 500 hours uploaded/minute
- Average video: 5 minutes, 50 MB

Calculate:
- View QPS: 1B / 86,400 ≈ 12,000 QPS
- Upload rate: 500 hours × 60 min = 30,000 minutes/minute
- Storage/day: 30,000 min × 50 MB/5 min = 300 TB/day
- Bandwidth (views): 12,000 × 10 MB = 120 GB/sec = 1 Tbps

---

Problem 2: Design WhatsApp

Given:
- 2 billion users
- 100 billion messages/day
- Average message: 100 bytes

Calculate:
- Message QPS: 100B / 86,400 ≈ 1.2 million/sec
- Storage/day: 100B × 100 bytes = 10 TB/day
- Storage/year: 10 TB × 365 = 3.6 PB/year</div>

                <h2>Summary</h2>
                <p>Back-of-envelope estimation is about getting the right order of magnitude, not exact numbers. Memorize key numbers (powers of 2, time conversions, latencies), use simple formulas (QPS = DAU × actions / 86,400), and always sanity-check your results. This skill distinguishes senior engineers who can reason about scale.</p>
            `,
            interviews: [
                {
                    question: "How do you estimate QPS for a system?",
                    answer: "QPS = (Daily Active Users × Actions per user) / 86,400 seconds. For example, 200M DAU with 10 actions each = 2B actions/day / 86,400 ≈ 23,000 QPS. Multiply by 3x for peak traffic estimation."
                },
                {
                    question: "What latency numbers should you know?",
                    answer: "Memory: 100ns, SSD: 150μs (1000x slower), HDD seek: 10ms (100x slower than SSD), Network round-trip: 50-150ms. Key insight: caching is critical because memory is 1000x faster than disk. These numbers inform architecture decisions."
                },
                {
                    question: "How do you estimate storage for a large-scale system?",
                    answer: "Storage = Items × Size per item × Retention period. For Twitter: 400M tweets/day × 500 bytes = 200 GB/day. For 5 years: 200 GB × 365 × 5 = 365 TB. Don't forget media storage which is usually 100x larger than text."
                },
                {
                    question: "How many servers do you need for 1 million QPS?",
                    answer: "Modern web server handles 10K-100K QPS depending on complexity. For 1M QPS: need 10-100 servers. Database handles 10K-50K QPS, so need 20-100 database servers. Redis handles 100K+ QPS per node. Always add 2x for redundancy."
                }
            ]
        },
        {
            id: 'advanced-data-structures',
            title: 'Advanced Data Structures for System Design',
            duration: '55 min',
            content: `
                <h2>Why Data Structures Matter in System Design</h2>
                <p>Choosing the right data structure can mean the difference between a system that handles millions of requests and one that crumbles under load. This lesson covers specialized data structures used in large-scale systems.</p>

                <h2>1. Bloom Filter</h2>
                <p>A space-efficient probabilistic data structure that tells you if an element is "possibly in the set" or "definitely not in the set."</p>

                <h3>How It Works</h3>
                <div class="code-block">Structure: Bit array of size m, with k hash functions

Add element:
1. Hash element with k different hash functions
2. Set bits at those k positions to 1

Check element:
1. Hash element with same k functions
2. If ALL k bits are 1 → "possibly present"
3. If ANY bit is 0 → "definitely not present"

Example (m=10, k=3):
Bit array: [0,0,0,0,0,0,0,0,0,0]

Add "apple":
hash1("apple") = 2
hash2("apple") = 5
hash3("apple") = 8
Result: [0,0,1,0,0,1,0,0,1,0]

Check "banana":
hash1("banana") = 1
hash2("banana") = 5
hash3("banana") = 7
Bits: [0,0,1,0,0,1,0,0,1,0]
       ↑     ✓     ↑
      pos1=0    pos7=0
→ "definitely not present" ✓</div>

                <h3>Properties</h3>
                <ul>
                    <li><strong>No false negatives:</strong> If it says "not present", it's definitely not there</li>
                    <li><strong>Possible false positives:</strong> Might say "present" when it's not</li>
                    <li><strong>Space efficient:</strong> ~10 bits per element for 1% false positive rate</li>
                    <li><strong>No deletion:</strong> Standard Bloom filter doesn't support deletion</li>
                </ul>

                <h3>Real-World Uses</h3>
                <div class="code-block">1. Database query optimization (HBase, Cassandra)
   Before expensive disk read:
   if (bloomFilter.mightContain(key)) {
     // Read from disk (might be false positive)
   } else {
     // Definitely not there, skip disk read!
   }

   Result: Avoid 90% of unnecessary disk reads

2. Web crawlers (Google)
   Before crawling URL:
   if (bloomFilter.mightContain(url)) {
     // Already crawled (probably)
   } else {
     // Definitely new, crawl it
   }

   Problem: 1 trillion URLs to track
   Without Bloom filter: 1T × 100 bytes = 100 TB
   With Bloom filter: 1T × 10 bits = 1.25 TB

3. Spam detection
   Check if email is from known spammer
   10M known spam addresses × 10 bits = 12.5 MB</div>

                <h2>2. HyperLogLog</h2>
                <p>Estimates the count of distinct elements in a dataset using minimal memory.</p>

                <h3>The Problem</h3>
                <div class="code-block">Count unique visitors to a website

Naive approach:
Store every visitor ID in a Set
1 billion visitors × 8 bytes = 8 GB memory!

HyperLogLog approach:
Use ~12 KB of memory
Estimate with ~2% error

Trade-off: Exact count vs memory efficiency</div>

                <h3>How It Works (Simplified)</h3>
                <div class="code-block">Key insight: Pattern in hash values

Hash each element to binary:
visitor_1 → 0001... (leading zeros: 3)
visitor_2 → 1010... (leading zeros: 0)
visitor_3 → 0000001... (leading zeros: 6)

Track maximum leading zeros seen.
More unique values → higher chance of seeing more leading zeros

If max leading zeros = n, estimate ≈ 2^n unique values

Example:
Max leading zeros seen: 20
Estimate: ~1 million unique values (2^20)

HyperLogLog uses multiple "buckets" to improve accuracy</div>

                <h3>Real-World Uses</h3>
                <div class="code-block">1. Redis PFADD/PFCOUNT commands
   PFADD visitors user1 user2 user3 ...
   PFCOUNT visitors → approximate count

   Memory: 12 KB regardless of count!

2. Google BigQuery
   COUNT(DISTINCT column) uses HyperLogLog

3. Analytics systems
   - Unique page views
   - Unique search queries
   - Unique users per feature</div>

                <h2>3. Count-Min Sketch</h2>
                <p>Estimates frequency of elements in a stream using sub-linear space.</p>

                <h3>How It Works</h3>
                <div class="code-block">Structure: 2D array (d rows × w columns) with d hash functions

Add element:
For each row i:
  col = hash_i(element) % w
  array[i][col]++

Query frequency:
For each row i:
  col = hash_i(element) % w
  counts.add(array[i][col])
return min(counts)  // Take minimum to reduce overcount

Example:
         col0  col1  col2  col3
row0:  [  0,    3,    0,    2  ]
row1:  [  1,    0,    2,    0  ]
row2:  [  0,    2,    1,    0  ]

Query "apple" hashes to: col1, col2, col1
Counts: 3, 2, 2
Estimated frequency: min(3, 2, 2) = 2</div>

                <h3>Properties</h3>
                <ul>
                    <li><strong>Never underestimates:</strong> Count >= actual frequency</li>
                    <li><strong>May overestimate:</strong> Due to hash collisions</li>
                    <li><strong>Sub-linear space:</strong> Fixed size regardless of stream length</li>
                </ul>

                <h3>Real-World Uses</h3>
                <div class="code-block">1. Finding heavy hitters (top-k frequent items)
   Track trending hashtags, popular products

2. Network traffic analysis
   Detect DDoS by tracking IP frequencies

3. Stream processing (Apache Flink, Spark)
   Approximate frequency counts in real-time</div>

                <h2>4. Skip List</h2>
                <p>A probabilistic data structure that allows O(log n) search, insert, and delete in a sorted sequence.</p>

                <h3>How It Works</h3>
                <div class="code-block">Multiple levels of linked lists with "express lanes"

Level 3: 1 ─────────────────────────────→ 9
Level 2: 1 ──────────→ 5 ────────────────→ 9
Level 1: 1 ───→ 3 ───→ 5 ───→ 7 ─────────→ 9
Level 0: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9

Search for 7:
1. Start at Level 3: 1 → 9 (overshoot, go down)
2. Level 2: 1 → 5 → 9 (overshoot at 5, go down)
3. Level 1: 5 → 7 (found!)

Average: O(log n) operations
vs linked list: O(n)</div>

                <h3>Why Skip List over Balanced Trees?</h3>
                <div class="code-block">Advantages:
1. Simpler implementation than Red-Black/AVL trees
2. Easier concurrent access (lock-free possible)
3. Cache-friendly for range queries
4. No rebalancing needed

Used by:
- Redis sorted sets (ZSET)
- LevelDB / RocksDB
- MemSQL</div>

                <h2>5. Merkle Tree</h2>
                <p>A tree where each leaf is a hash of data, and each non-leaf is a hash of its children. Used for efficient data verification.</p>

                <h3>How It Works</h3>
                <div class="code-block">                    Root Hash
                    /        \\
              Hash(AB)      Hash(CD)
              /    \\        /    \\
          Hash(A) Hash(B) Hash(C) Hash(D)
            |       |       |       |
          Data A  Data B  Data C  Data D

Properties:
1. Change any data → Root hash changes
2. Can verify any piece without full data
3. Can find exactly which piece changed

Verification:
To verify Data B:
1. Get Hash(A), Hash(CD), and Root from trusted source
2. Compute: Hash(B) → Hash(AB) → Root
3. Compare computed root with trusted root</div>

                <h3>Real-World Uses</h3>
                <div class="code-block">1. Git
   Every commit is a Merkle tree of files
   Change one file → new root hash

2. Bitcoin/Blockchain
   Verify transactions without full blockchain

3. Cassandra/DynamoDB anti-entropy
   Compare Merkle trees to find data differences
   Sync only the different branches

4. IPFS (InterPlanetary File System)
   Content-addressed storage using Merkle DAGs</div>

                <h2>6. Consistent Hashing Ring</h2>
                <p>Distributes data across nodes such that adding/removing nodes minimizes data movement.</p>

                <h3>How It Works</h3>
                <div class="code-block">Hash ring: 0 to 2^32 - 1 (circular)

                      0
                     /|\\
                   /  |  \\
                 /    |    \\
        Node C *     |     * Node A
               \\     |    /
                \\    |   /
                 \\   |  /
                  * Node B

Place nodes on ring using hash(node_id)
Place keys on ring using hash(key)
Key belongs to first node clockwise

Add new node:
- Only keys between new node and previous node move
- Minimal data movement!

Virtual nodes:
- Each physical node → multiple points on ring
- Better load distribution</div>

                <h3>Real-World Uses</h3>
                <div class="code-block">1. Amazon DynamoDB
2. Apache Cassandra
3. Discord (message routing)
4. Akamai CDN
5. Load balancers

Covered in detail in Module 9!</div>

                <h2>Quick Reference: When to Use What</h2>
                <table class="table">
                    <tr>
                        <th>Problem</th>
                        <th>Data Structure</th>
                        <th>Space</th>
                    </tr>
                    <tr>
                        <td>Set membership check</td>
                        <td>Bloom Filter</td>
                        <td>~10 bits/element</td>
                    </tr>
                    <tr>
                        <td>Count unique elements</td>
                        <td>HyperLogLog</td>
                        <td>~12 KB fixed</td>
                    </tr>
                    <tr>
                        <td>Frequency estimation</td>
                        <td>Count-Min Sketch</td>
                        <td>Fixed size</td>
                    </tr>
                    <tr>
                        <td>Sorted set operations</td>
                        <td>Skip List</td>
                        <td>O(n)</td>
                    </tr>
                    <tr>
                        <td>Data verification</td>
                        <td>Merkle Tree</td>
                        <td>O(n)</td>
                    </tr>
                    <tr>
                        <td>Distribute data to nodes</td>
                        <td>Consistent Hashing</td>
                        <td>O(nodes)</td>
                    </tr>
                </table>

                <h2>Summary</h2>
                <p>These advanced data structures trade exactness for space/time efficiency. Bloom filters save disk reads, HyperLogLog counts billions of uniques in 12KB, Count-Min Sketch tracks frequencies in streams, Skip Lists enable fast sorted operations, Merkle Trees verify data integrity, and Consistent Hashing enables scalable distribution. Knowing when to use each is a key skill for system design.</p>
            `,
            interviews: [
                {
                    question: "What is a Bloom filter and when would you use it?",
                    answer: "Bloom filter is a space-efficient probabilistic structure for set membership. It can say 'definitely not in set' or 'possibly in set' (may have false positives, never false negatives). Use for: avoiding expensive disk reads (check Bloom filter first), deduplication in web crawlers, spam detection. Space: ~10 bits per element for 1% false positive rate."
                },
                {
                    question: "How do you count unique visitors with limited memory?",
                    answer: "Use HyperLogLog algorithm. It estimates distinct count using only ~12 KB of memory regardless of cardinality, with ~2% error. Works by tracking patterns in hash values (leading zeros). Redis supports it with PFADD/PFCOUNT commands. Trade-off: approximate count vs exact count with massive memory savings."
                },
                {
                    question: "What is a Merkle tree and where is it used?",
                    answer: "Merkle tree is a hash tree where leaves are data hashes, and parents are hashes of children. Properties: any change propagates to root, can verify parts without full data. Used in: Git (commit verification), Bitcoin (transaction verification), Cassandra/DynamoDB (anti-entropy repair - compare trees to find differences and sync only changed parts)."
                },
                {
                    question: "Why does Redis use Skip Lists instead of balanced trees?",
                    answer: "Skip Lists: 1) Simpler implementation than Red-Black/AVL trees, 2) Easier concurrent access (can be lock-free), 3) Cache-friendly for range queries, 4) No complex rebalancing. Same O(log n) complexity. Redis uses for ZSET (sorted sets) where range queries are common."
                }
            ]
        }
    ]
};

// Export for use in courses.js
if (typeof window !== 'undefined') {
    window.module0Prerequisites = module0Prerequisites;
}
