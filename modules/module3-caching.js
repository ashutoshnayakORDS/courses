// Module 3: Caching
// Contains: Caching Fundamentals, Cache Strategies and Eviction Policies, Distributed Caching (Redis & Memcached)

const module3Caching = {
    title: 'Module 3: Caching',
    lessons: [
        {
            id: 'caching-fundamentals',
            title: 'Caching Fundamentals',
            duration: '45 min',
            content: `
                <h2>What is Caching?</h2>
                <p>Caching is the practice of storing frequently accessed data in a faster storage layer (cache) so you don't have to retrieve it from the slower original source every time. It's like keeping your frequently used kitchen items on the counter instead of in the basement.</p>

                <div class="code-block">Without Cache:
Every request → Database query (100ms)
100 requests = 10,000ms (10 seconds) total

With Cache:
First request → Database (100ms) → Store in cache
Next 99 requests → Cache (1ms each) = 99ms
Total: 199ms instead of 10,000ms
50x faster!</div>

                <h3>Why Caching Matters</h3>
                <ul style="margin: 1rem 0; margin-left: 2rem;">
                    <li><strong>Speed:</strong> Memory is 100-1000x faster than database</li>
                    <li><strong>Reduced database load:</strong> Fewer queries = database can handle more load</li>
                    <li><strong>Cost savings:</strong> Expensive computations done once, cached</li>
                    <li><strong>Better user experience:</strong> Faster responses = happier users</li>
                    <li><strong>Scalability:</strong> Handle more traffic without adding database capacity</li>
                </ul>

                <h2>Performance Numbers</h2>
                <table class="table">
                    <tr>
                        <th>Operation</th>
                        <th>Latency</th>
                        <th>Relative Speed</th>
                    </tr>
                    <tr>
                        <td>L1 Cache (CPU)</td>
                        <td>0.5 ns</td>
                        <td>Baseline</td>
                    </tr>
                    <tr>
                        <td>RAM Read</td>
                        <td>100 ns</td>
                        <td>200x slower than L1</td>
                    </tr>
                    <tr>
                        <td>Redis/Memcached</td>
                        <td>1 ms</td>
                        <td>2 million x slower than L1</td>
                    </tr>
                    <tr>
                        <td>SSD Read</td>
                        <td>16 ms</td>
                        <td>32 million x slower</td>
                    </tr>
                    <tr>
                        <td>Database Query</td>
                        <td>50-200 ms</td>
                        <td>100-400 million x slower</td>
                    </tr>
                    <tr>
                        <td>Network Request</td>
                        <td>100-500 ms</td>
                        <td>200 million - 1 billion x slower</td>
                    </tr>
                </table>

                <h2>Types of Caches</h2>

                <h3>1. Client-Side Caching</h3>
                <p>Caching in the user's browser:</p>
                <div class="code-block">Browser Cache:
- Stores images, CSS, JavaScript locally
- No network request needed
- Controlled by Cache-Control headers

Example:
First visit: Download style.css (100KB over network)
Next visit: Load from disk cache (0KB network)
Result: Instant load!

localStorage / sessionStorage:
- Store API responses locally
- Persist data across page reloads
- 5-10MB storage limit</div>

                <h3>2. CDN Caching</h3>
                <p>We covered this in the CDN lesson - content cached at edge servers globally.</p>

                <h3>3. Application-Level Caching</h3>
                <p>Caching in your application servers:</p>
                <div class="code-block">In-Memory Cache (within application):
const cache = new Map();

function getUserData(userId) {
  if (cache.has(userId)) {
    return cache.get(userId); // Return from cache (< 1ms)
  }

  const data = database.query(userId); // Hit database (100ms)
  cache.set(userId, data); // Store in cache
  return data;
}

Pros: Very fast (nanoseconds)
Cons: Lost on server restart, not shared across servers</div>

                <h3>4. Distributed Caching</h3>
                <p>Separate cache servers shared by all application servers:</p>
                <div class="code-block">Popular solutions: Redis, Memcached

[App Server 1] ↘
[App Server 2] → [Redis Cache] → [Database]
[App Server 3] ↗

Benefits:
- Shared across all servers
- Persists across app restarts
- Can scale independently
- Very fast (1-5ms)

Drawback: Extra network hop</div>

                <h3>5. Database Caching</h3>
                <div class="code-block">Query Cache:
Database caches query results

Index Cache:
Database caches index data in RAM

Buffer Pool:
Database keeps frequently accessed pages in memory

Most databases (MySQL, PostgreSQL) do this automatically!</div>

                <h2>Cache Hit vs Cache Miss</h2>

                <div class="code-block">Cache HIT:
User requests data → Check cache → Found!
Return from cache (1-5ms)

Cache MISS:
User requests data → Check cache → Not found
→ Fetch from database (100ms)
→ Store in cache
→ Return to user

Cache Hit Ratio = Hits / (Hits + Misses)

Good ratio: > 80%
Excellent ratio: > 95%</div>

                <h3>Calculating Performance Improvement</h3>
                <div class="code-block">Scenario:
Database query: 100ms
Cache query: 1ms
1000 requests/second

Without cache:
1000 requests × 100ms = 100,000ms = 100 seconds of DB time

With 90% cache hit ratio:
900 cache hits × 1ms = 900ms
100 cache misses × 100ms = 10,000ms
Total: 10,900ms = 10.9 seconds
9x faster!</div>

                <h2>What to Cache?</h2>

                <h3>Good Candidates for Caching:</h3>
                <ul style="margin: 1rem 0; margin-left: 2rem;">
                    <li><strong>Read-heavy data:</strong> Product catalogs, blog posts</li>
                    <li><strong>Expensive computations:</strong> Report generation, analytics</li>
                    <li><strong>Frequently accessed:</strong> User profiles, popular products</li>
                    <li><strong>Rarely changing:</strong> Configuration, reference data</li>
                    <li><strong>External API responses:</strong> Weather data, stock prices</li>
                </ul>

                <h3>Bad Candidates for Caching:</h3>
                <ul style="margin: 1rem 0; margin-left: 2rem;">
                    <li><strong>User-specific sensitive data:</strong> Credit card info, passwords</li>
                    <li><strong>Rapidly changing data:</strong> Stock tickers, live sports scores</li>
                    <li><strong>Data that must be consistent:</strong> Bank balances, inventory counts</li>
                    <li><strong>Rarely accessed data:</strong> Not worth caching</li>
                </ul>

                <h2>Cache Invalidation</h2>
                <p>Phil Karlton famously said: "There are only two hard things in Computer Science: cache invalidation and naming things."</p>

                <h3>The Problem</h3>
                <div class="code-block">Scenario:
1. User A updates profile picture
2. Cache still has old picture
3. User B sees old picture from cache
4. Stale data problem!

Solution: Invalidate cache when data changes</div>

                <h3>Invalidation Strategies</h3>

                <h4>1. TTL (Time To Live)</h4>
                <div class="code-block">Set expiration time on cached data:

cache.set("user:123", data, TTL=3600) // 1 hour

After 1 hour:
- Cache entry expires automatically
- Next request fetches fresh data
- Cache is refreshed

Pros: Simple, automatic cleanup
Cons: May serve stale data within TTL period</div>

                <h4>2. Write-Through Cache</h4>
                <div class="code-block">Write to cache AND database simultaneously:

function updateUser(userId, data) {
  database.update(userId, data); // Update DB
  cache.set(userId, data);        // Update cache
}

Pros: Cache always up-to-date
Cons: Slower writes (two operations)</div>

                <h4>3. Write-Behind (Write-Back) Cache</h4>
                <div class="code-block">Write to cache first, database later:

function updateUser(userId, data) {
  cache.set(userId, data);        // Update cache (fast)
  queue.add(() => {
    database.update(userId, data); // Update DB async
  });
}

Pros: Very fast writes
Cons: Risk of data loss if cache crashes</div>

                <h4>4. Cache-Aside (Lazy Loading)</h4>
                <div class="code-block">Application manages cache explicitly:

function getUser(userId) {
  // Try cache first
  let user = cache.get(userId);

  if (!user) {
    // Cache miss - fetch from DB
    user = database.query(userId);
    cache.set(userId, user);
  }

  return user;
}

function updateUser(userId, data) {
  database.update(userId, data);
  cache.delete(userId); // Invalidate
}

Pros: Simple, cache only what's needed
Cons: First request always slow (cache miss)</div>

                <h2>Real-World Example: Facebook</h2>

                <h3>The Scale</h3>
                <p>Facebook serves 3 billion users. Every like, comment, and post needs fast data access.</p>

                <h3>Facebook's Caching Strategy</h3>
                <div class="code-block">TAO (The Associations and Objects):
Facebook's distributed caching system

Architecture:
1. Memcached clusters in every datacenter
2. Billions of cache entries
3. Millions of queries per second
4. 99.9% cache hit ratio

Example query: "Show Bob's friends list"
- Check TAO cache (1ms) - HIT
- Return friends (total: 1ms)

Without cache:
- Query MySQL (100ms+)
- Would need 100x more database capacity

Cache savings:
- $100M+ in database infrastructure
- Subsecond responses globally</div>

                <h2>Common Caching Patterns</h2>

                <h3>Pattern 1: Cache Popular Items</h3>
                <div class="code-block">Track access frequency:
Top 20% of items = 80% of traffic (80/20 rule)

Cache only popular items:
- Trending products
- Viral posts
- Popular pages

Result: High hit ratio with small cache size</div>

                <h3>Pattern 2: Cache Computed Results</h3>
                <div class="code-block">Example: E-commerce search results

Query: "red shoes size 10"
Without cache:
1. Search database (50ms)
2. Apply filters (20ms)
3. Sort results (10ms)
4. Calculate recommendations (30ms)
Total: 110ms

With cache:
1. Check cache for "red shoes size 10"
2. Return cached results (1ms)

Cache expensive computations, not just database queries!</div>

                <h3>Pattern 3: Multi-Level Caching</h3>
                <div class="code-block">Layer 1: Browser cache (0ms network)
Layer 2: CDN (10ms)
Layer 3: Application cache (1ms)
Layer 4: Redis (5ms)
Layer 5: Database query cache (20ms)
Layer 6: Database (100ms)

Request waterfall:
Browser → CDN → App → Redis → DB Query Cache → DB

Most requests never reach the database!</div>

                <h2>Cache Warming</h2>
                <p>Pre-populate cache with expected data before users request it:</p>

                <div class="code-block">Use case: Product launch

Before launch (midnight):
- Load all product data into cache
- Pre-compute search results
- Cache product images

Launch (9 AM):
- All users get cache hits
- No database overload
- Fast experience from first request

Without warming:
- First users get slow responses
- Database gets hammered
- Potential downtime</div>

                <h2>Monitoring Cache Performance</h2>

                <h3>Key Metrics</h3>
                <div class="code-block">1. Hit Rate:
   hits / (hits + misses)
   Target: > 80%

2. Latency:
   Average time to retrieve from cache
   Target: < 5ms

3. Memory Usage:
   How much cache memory is used
   Watch for: Cache full = evictions

4. Eviction Rate:
   How often items are removed
   High eviction = cache too small

5. Connection Count:
   Active connections to cache server
   Monitor: Connection pool saturation</div>

                <h2>Best Practices</h2>

                <ol style="margin: 1rem 0; margin-left: 2rem;">
                    <li><strong>Set appropriate TTLs:</strong> Balance freshness vs hit rate</li>
                    <li><strong>Monitor hit ratios:</strong> Low hit rate = caching wrong things</li>
                    <li><strong>Cache at multiple levels:</strong> Browser, CDN, application, database</li>
                    <li><strong>Use cache keys wisely:</strong> Consistent, predictable key naming</li>
                    <li><strong>Handle cache failures gracefully:</strong> Always have fallback to database</li>
                    <li><strong>Don't cache everything:</strong> Cache what's frequently accessed</li>
                    <li><strong>Invalidate proactively:</strong> Don't serve stale data for critical info</li>
                    <li><strong>Size your cache appropriately:</strong> Monitor memory usage</li>
                </ol>

                <h2>Summary</h2>
                <p>Caching is one of the most effective ways to improve system performance and scalability. By storing frequently accessed data in fast memory, you can reduce database load by 80-99%, improve response times by 10-100x, and handle much more traffic with the same infrastructure. The key is choosing what to cache, setting appropriate TTLs, and monitoring hit ratios. Every production system should implement caching at multiple levels.</p>
            `,
            interviews: [
                {
                    question: "What is caching and why is it important in system design?",
                    answer: "Caching stores frequently accessed data in faster storage (memory) instead of retrieving from slower sources (database). Important because: 1) Memory is 100-1000x faster than database, 2) Reduces database load by 80-99%, 3) Improves response times 10-100x, 4) Enables handling more traffic, 5) Reduces costs. Example: Database query 100ms vs cache 1ms = 100x faster."
                },
                {
                    question: "Explain cache HIT vs cache MISS and why hit ratio matters",
                    answer: "Cache HIT: Data found in cache, served fast (1-5ms). Cache MISS: Data not in cache, fetch from database (100ms), then cache it. Hit ratio = hits / (hits + misses). Good ratio > 80%, excellent > 95%. With 90% hit ratio: 900 requests at 1ms + 100 at 100ms = 10.9s vs 100s without cache = 9x faster."
                },
                {
                    question: "What's the difference between write-through and write-behind caching?",
                    answer: "Write-through: Write to cache AND database simultaneously. Pros: Cache always fresh. Cons: Slower writes (two operations). Write-behind: Write to cache first, database asynchronously later. Pros: Very fast writes. Cons: Risk of data loss if cache crashes before DB write. Use write-through for critical data, write-behind for high-performance needs."
                },
                {
                    question: "How does Facebook achieve 99.9% cache hit ratio?",
                    answer: "Facebook uses TAO (distributed Memcached system) with: 1) Memcached clusters in every datacenter, 2) Billions of cache entries, 3) Cache social graph data (friends, posts, likes), 4) Millions of queries/second, all hitting cache. Result: Most requests served in 1ms from cache vs 100ms+ from MySQL. Saves $100M+ in database infrastructure."
                },
                {
                    question: "What are good vs bad candidates for caching?",
                    answer: "Good: Read-heavy data (product catalogs), expensive computations (reports), frequently accessed (user profiles), rarely changing (config), external APIs. Bad: Sensitive data (passwords), rapidly changing (stock tickers), must-be-consistent data (bank balances), rarely accessed data. Cache things that are read often and don't change frequently."
                }
            ]
        },
        {
            id: 'cache-strategies-eviction',
            title: 'Cache Strategies and Eviction Policies',
            duration: '50 min',
            content: `
                <h2>The Cache Eviction Problem</h2>
                <p>Caches have limited memory. When the cache is full and you need to add a new item, you must evict (remove) something. The question is: what do you remove? This decision dramatically affects cache performance.</p>

                <div class="code-block">Scenario:
Cache size: 3 items
Current cache: [A, B, C]
New item D arrives
Cache is full!

Question: Which item do we evict to make room for D?

Wrong choice → More cache misses → Slower system
Right choice → More cache hits → Faster system</div>

                <h2>Cache Eviction Policies</h2>

                <h3>1. LRU (Least Recently Used)</h3>
                <p>Evict the item that hasn't been accessed for the longest time.</p>

                <div class="code-block">Logic: Items accessed recently are likely to be accessed again soon

Example:
Cache: [A, B, C]
Access pattern: A, B, C, A, B, D

Step-by-step:
1. Access A → [A, B, C]
2. Access B → [A, B, C] (B moved to front)
3. Access C → [A, B, C] (C moved to front)
4. Access A → [A, B, C] (A moved to front)
5. Access B → [A, B, C] (B moved to front)
6. Access D → Cache full!
   → Evict C (least recently used)
   → Cache: [A, B, D]</div>

                <h4>LRU Implementation</h4>
                <div class="code-block">Data Structure: HashMap + Doubly Linked List

HashMap: O(1) lookup
Linked List: Track access order

Operations:
- Get(key): O(1) - Move to front of list
- Put(key, value): O(1) - Add to front, evict tail if full

Real-world: Redis supports LRU with approximation</div>

                <h4>When to Use LRU</h4>
                <ul style="margin: 1rem 0; margin-left: 2rem;">
                    <li>General-purpose caching (most common)</li>
                    <li>Web page caching</li>
                    <li>Database query results</li>
                    <li>When recent access predicts future access</li>
                </ul>

                <h3>2. LFU (Least Frequently Used)</h3>
                <p>Evict the item accessed the fewest times.</p>

                <div class="code-block">Logic: Items accessed frequently are valuable, keep them

Example:
Cache: [A(3), B(5), C(2)] (numbers = access count)
New item D arrives

Evict C (accessed only 2 times)
Cache: [A(3), B(5), D(1)]</div>

                <h4>LFU vs LRU</h4>
                <table class="table">
                    <tr>
                        <th>Scenario</th>
                        <th>LRU</th>
                        <th>LFU</th>
                        <th>Better Choice</th>
                    </tr>
                    <tr>
                        <td>Viral video (huge spike)</td>
                        <td>Keeps in cache</td>
                        <td>Evicts (low frequency)</td>
                        <td>LRU</td>
                    </tr>
                    <tr>
                        <td>Popular product page</td>
                        <td>Might evict if not recent</td>
                        <td>Keeps (high frequency)</td>
                        <td>LFU</td>
                    </tr>
                    <tr>
                        <td>Scanning large dataset once</td>
                        <td>Pollutes cache</td>
                        <td>Evicts quickly (low frequency)</td>
                        <td>LFU</td>
                    </tr>
                </table>

                <h4>When to Use LFU</h4>
                <ul style="margin: 1rem 0; margin-left: 2rem;">
                    <li>Long-term popular items (trending products)</li>
                    <li>Prevent cache pollution from scans</li>
                    <li>When access frequency matters more than recency</li>
                </ul>

                <h3>3. FIFO (First In First Out)</h3>
                <p>Evict the oldest item in cache, regardless of usage.</p>

                <div class="code-block">Logic: Simple queue - first item added is first evicted

Example:
Cache: [A, B, C] (A added first)
New item D arrives

Evict A (oldest)
Cache: [B, C, D]

Limitation: Doesn't consider usage patterns!</div>

                <h4>When to Use FIFO</h4>
                <ul style="margin: 1rem 0; margin-left: 2rem;">
                    <li>Simplicity is priority</li>
                    <li>All items have similar value</li>
                    <li>Low implementation overhead</li>
                    <li>Generally NOT recommended for production</li>
                </ul>

                <h3>4. Random Replacement</h3>
                <p>Evict a random item from cache.</p>

                <div class="code-block">Logic: No logic - pick randomly

Surprisingly effective in some cases!

Pros:
- O(1) eviction (very fast)
- No tracking overhead
- Simple implementation

Cons:
- No optimization
- Unpredictable performance

Used by: Redis (as an option)</div>

                <h3>5. TTL (Time To Live) Based</h3>
                <p>Items expire after a set time, automatically evicted.</p>

                <div class="code-block">Example:
cache.set("session:123", data, TTL=3600) // 1 hour

After 1 hour:
- Item automatically expires
- Evicted from cache
- No manual eviction needed

Perfect for: Session data, temporary tokens, API responses</div>

                <h2>Advanced Eviction Policies</h2>

                <h3>ARC (Adaptive Replacement Cache)</h3>
                <p>Combines LRU and LFU dynamically.</p>

                <div class="code-block">How it works:
- Maintains two lists: LRU and LFU
- Adapts based on workload
- Automatically tunes between recency and frequency

Better than pure LRU or LFU in mixed workloads

Used by: Some enterprise caching systems</div>

                <h3>2Q (Two Queue)</h3>
                <p>Uses two queues to prevent cache pollution:</p>

                <div class="code-block">Queue 1 (FIFO): New items
Queue 2 (LRU): Proven valuable items

New item → Queue 1 (FIFO)
If accessed again → Promoted to Queue 2 (LRU)

Benefit: Single-access items don't pollute main cache</div>

                <h2>Real-World Example: Redis Eviction</h2>

                <h3>Redis Supports Multiple Policies</h3>
                <div class="code-block">Configuration:
maxmemory-policy <policy>

Available policies:
1. noeviction - Return error when memory full
2. allkeys-lru - Evict any key, LRU
3. allkeys-lfu - Evict any key, LFU
4. allkeys-random - Evict random key
5. volatile-lru - Evict keys with TTL, LRU
6. volatile-lfu - Evict keys with TTL, LFU
7. volatile-random - Evict random key with TTL
8. volatile-ttl - Evict key with shortest TTL

Most common: allkeys-lru</div>

                <h3>Twitter's Use Case</h3>
                <div class="code-block">Problem:
Timeline caching for 500M users
Limited memory, must evict wisely

Solution:
- LRU for timeline caches
- Active users (access recently) → Stay in cache
- Inactive users → Evicted
- When inactive user returns → Cache miss → Rebuild timeline

Result:
- 95% hit rate for active users
- Memory used efficiently
- Inactive timelines not wasting space</div>

                <h2>Choosing the Right Policy</h2>

                <h3>Decision Framework</h3>
                <table class="table">
                    <tr>
                        <th>Use Case</th>
                        <th>Best Policy</th>
                        <th>Reasoning</th>
                    </tr>
                    <tr>
                        <td>General web caching</td>
                        <td>LRU</td>
                        <td>Recent access predicts future access</td>
                    </tr>
                    <tr>
                        <td>Popular content site</td>
                        <td>LFU</td>
                        <td>Popular items accessed frequently</td>
                    </tr>
                    <tr>
                        <td>Session storage</td>
                        <td>TTL</td>
                        <td>Sessions have natural expiration</td>
                    </tr>
                    <tr>
                        <td>Database query cache</td>
                        <td>LRU</td>
                        <td>Recently run queries likely to repeat</td>
                    </tr>
                    <tr>
                        <td>API rate limiting</td>
                        <td>TTL</td>
                        <td>Time-based windows</td>
                    </tr>
                    <tr>
                        <td>CDN edge cache</td>
                        <td>LFU or LRU</td>
                        <td>Mix of popular and recent content</td>
                    </tr>
                </table>

                <h2>Cache Stampede Problem</h2>
                <p>When popular cache entry expires, many requests hit database simultaneously.</p>

                <div class="code-block">Problem:
1. Popular item "ProductA" in cache (10k requests/sec)
2. Cache entry expires
3. Next 10k requests → All miss cache
4. All 10k → Hit database simultaneously
5. Database overwhelmed → Crashes

This is called "Cache Stampede" or "Thundering Herd"</div>

                <h3>Solutions</h3>

                <h4>1. Probabilistic Early Expiration</h4>
                <div class="code-block">Idea: Refresh popular items before they expire

if (item.popularity > threshold && random() < 0.1) {
  refreshCache(item); // Refresh early
}</div>

                <h4>2. Mutex/Lock</h4>
                <div class="code-block">First request gets lock to rebuild cache:

if (!cache.has(key)) {
  if (lock.acquire(key)) {
    data = database.query(key);
    cache.set(key, data);
    lock.release(key);
  } else {
    wait(); // Other requests wait
  }
}

Only ONE request hits database</div>

                <h4>3. Stale-While-Revalidate</h4>
                <div class="code-block">Serve stale data while refreshing in background:

if (cache.isExpired(key)) {
  returnStaleData(key); // Serve immediately
  asyncRefresh(key);     // Refresh in background
}

Users get instant response, cache updated async</div>

                <h2>Multi-Level Caching Strategy</h2>

                <div class="code-block">Level 1: L1 Cache (on application server)
- Policy: LRU
- Size: 100MB
- Hit rate: 60%
- Latency: <1ms

Level 2: Redis (distributed cache)
- Policy: LRU
- Size: 10GB
- Hit rate: 35% (of L1 misses)
- Latency: 2-5ms

Level 3: Database
- 5% of requests
- Latency: 50-100ms

Combined hit rate: 95% served from cache!</div>

                <h2>Performance Comparison</h2>

                <div class="code-block">Benchmark: 1 million requests, cache size 1000 items

LRU:
- Hit rate: 85%
- Avg latency: 8ms
- Implementation complexity: Medium

LFU:
- Hit rate: 83%
- Avg latency: 9ms
- Implementation complexity: High

FIFO:
- Hit rate: 70%
- Avg latency: 15ms
- Implementation complexity: Low

Random:
- Hit rate: 65%
- Avg latency: 18ms
- Implementation complexity: Very low

Winner for general use: LRU (best balance)</div>

                <h2>Best Practices</h2>

                <ol style="margin: 1rem 0; margin-left: 2rem;">
                    <li><strong>Start with LRU:</strong> Best general-purpose policy</li>
                    <li><strong>Monitor hit rates:</strong> If low, reconsider policy</li>
                    <li><strong>Use TTL for time-sensitive data:</strong> Sessions, tokens, temporary data</li>
                    <li><strong>Prevent cache stampede:</strong> Use locks or stale-while-revalidate</li>
                    <li><strong>Size cache appropriately:</strong> Too small = high eviction, too large = wasted memory</li>
                    <li><strong>Test different policies:</strong> Your workload may benefit from LFU or hybrid</li>
                    <li><strong>Don't cache everything:</strong> Only cache what's frequently accessed</li>
                    <li><strong>Set reasonable TTLs:</strong> Balance freshness and hit rate</li>
                </ol>

                <h2>Summary</h2>
                <p>Cache eviction policies determine what data stays in cache and what gets removed. LRU (Least Recently Used) is the most common and works well for general use cases. LFU (Least Frequently Used) is better for long-term popular content. TTL-based eviction is perfect for time-sensitive data like sessions. Advanced policies like ARC and 2Q can optimize mixed workloads. The right choice depends on your access patterns - monitor hit rates and adjust accordingly. Prevent cache stampede with locks or stale-while-revalidate patterns.</p>
            `,
            interviews: [
                {
                    question: "Explain LRU cache eviction policy and when to use it",
                    answer: "LRU (Least Recently Used) evicts items that haven't been accessed for the longest time. Assumes recently accessed items are likely to be accessed again. Implementation: HashMap for O(1) lookup + doubly linked list for access order. Best for: General-purpose caching, web pages, database queries. Example: Cache [A,B,C], access D → evict least recently used item. Most common policy, works well in 80% of cases."
                },
                {
                    question: "What's the difference between LRU and LFU? When would you choose each?",
                    answer: "LRU evicts least recently used, LFU evicts least frequently used. LRU: Better for viral/trending content (recent spike). LFU: Better for long-term popular content (prevents evicting popular items). Example: Viral video → LRU keeps it (recent). Popular product → LFU keeps it (high frequency). Choose LRU for general use, LFU when frequency matters more than recency."
                },
                {
                    question: "What is cache stampede and how do you prevent it?",
                    answer: "Cache stampede: Popular cache entry expires, thousands of requests simultaneously hit database, overwhelming it. Solutions: 1) Mutex/lock - first request rebuilds cache, others wait. 2) Stale-while-revalidate - serve stale data while refreshing async. 3) Probabilistic early expiration - refresh before expiry. Example: Product page cache expires, 10k req/sec → all hit DB → crash. Lock ensures only 1 DB query."
                },
                {
                    question: "How does Redis support different eviction policies?",
                    answer: "Redis has maxmemory-policy config with 8 options: allkeys-lru (evict any key, LRU - most common), allkeys-lfu (LFU), allkeys-random, volatile-lru (only keys with TTL), volatile-lfu, volatile-random, volatile-ttl (evict shortest TTL first), noeviction (return error when full). Choose based on workload: LRU for general, LFU for popular content, TTL for temporary data."
                },
                {
                    question: "Describe a multi-level caching strategy and its benefits",
                    answer: "Level 1: L1 cache (100MB, LRU, 60% hit, <1ms). Level 2: Redis (10GB, LRU, 35% hit of L1 misses, 2-5ms). Level 3: Database (5% requests, 50-100ms). Combined 95% hit rate! Benefits: Fast L1 for hot data, large L2 for warm data, DB only for cold data. Each level has different size/latency trade-offs. Result: 10-100x faster than DB-only."
                }
            ]
        },
        {
            id: 'distributed-caching',
            title: 'Distributed Caching: Redis & Memcached',
            duration: '55 min',
            content: `
                <h2>What is Distributed Caching?</h2>
                <p>Distributed caching uses separate cache servers that multiple application servers can access. Instead of each app server having its own cache, they share a common cache layer. This solves critical problems in scaled systems.</p>

                <div class="code-block">Without Distributed Cache:
[App Server 1] → Local Cache → Database
[App Server 2] → Local Cache → Database
[App Server 3] → Local Cache → Database

Problems:
- Cache not shared between servers
- Same data cached 3 times (waste)
- User hits different server → Cache miss
- Cache inconsistency between servers

With Distributed Cache:
[App Server 1] ↘
[App Server 2] → [Redis/Memcached] → Database
[App Server 3] ↗

Benefits:
- Shared cache across all servers
- Data cached once, used by all
- Consistent cache hits
- Memory used efficiently</div>

                <h2>Redis vs Memcached</h2>
                <p>The two most popular distributed caching systems, each with different strengths.</p>

                <h3>Memcached: Simple and Fast</h3>
                <div class="code-block">Released: 2003
Purpose: Pure key-value cache
Philosophy: Simple, fast, focused

Key Features:
- In-memory key-value store
- Multi-threaded
- Simple data types (strings only)
- LRU eviction
- No persistence
- Very fast (< 1ms latency)

Use case: Simple caching, high performance</div>

                <h3>Redis: Feature-Rich</h3>
                <div class="code-block">Released: 2009
Purpose: In-memory data structure store
Philosophy: More than just a cache

Key Features:
- Rich data types (strings, lists, sets, hashes, sorted sets)
- Single-threaded (but fast!)
- Persistence (snapshots + AOF)
- Pub/Sub messaging
- Transactions
- Lua scripting
- Replication
- Cluster mode

Use case: Caching + more (sessions, queues, leaderboards)</div>

                <h3>Side-by-Side Comparison</h3>
                <table class="table">
                    <tr>
                        <th>Feature</th>
                        <th>Memcached</th>
                        <th>Redis</th>
                    </tr>
                    <tr>
                        <td>Data Types</td>
                        <td>Strings only</td>
                        <td>Strings, lists, sets, hashes, sorted sets, bitmaps, hyperloglogs</td>
                    </tr>
                    <tr>
                        <td>Threading</td>
                        <td>Multi-threaded</td>
                        <td>Single-threaded</td>
                    </tr>
                    <tr>
                        <td>Persistence</td>
                        <td>No</td>
                        <td>Yes (RDB + AOF)</td>
                    </tr>
                    <tr>
                        <td>Replication</td>
                        <td>No</td>
                        <td>Yes (master-slave)</td>
                    </tr>
                    <tr>
                        <td>Max Value Size</td>
                        <td>1 MB</td>
                        <td>512 MB</td>
                    </tr>
                    <tr>
                        <td>Eviction Policies</td>
                        <td>LRU only</td>
                        <td>Multiple (LRU, LFU, TTL, random, etc.)</td>
                    </tr>
                    <tr>
                        <td>Use Cases</td>
                        <td>Pure caching</td>
                        <td>Caching + sessions + queues + pub/sub</td>
                    </tr>
                    <tr>
                        <td>Learning Curve</td>
                        <td>Simple</td>
                        <td>More complex</td>
                    </tr>
                </table>

                <h2>Redis Deep Dive</h2>

                <h3>Redis Data Types in Action</h3>

                <h4>1. Strings (Basic Cache)</h4>
                <div class="code-block">SET user:123 "John Doe"
GET user:123
→ "John Doe"

With TTL:
SETEX session:abc 3600 "user_data"
→ Expires in 1 hour

Counter:
INCR page_views
→ Atomic increment (thread-safe)</div>

                <h4>2. Hashes (Structured Data)</h4>
                <div class="code-block">Store user object:
HSET user:123 name "John" email "john@example.com" age 30

Get one field:
HGET user:123 name
→ "John"

Get all fields:
HGETALL user:123
→ {name: "John", email: "john@example.com", age: 30}

Update one field:
HSET user:123 age 31

Why use hashes?
- Store related data together
- Update individual fields
- Memory efficient</div>

                <h4>3. Lists (Queues, Recent Items)</h4>
                <div class="code-block">Task queue:
LPUSH tasks "send_email"
LPUSH tasks "process_payment"
RPOP tasks
→ "send_email" (FIFO queue)

Recent posts:
LPUSH recent_posts:user:123 "post_789"
LRANGE recent_posts:user:123 0 9
→ Get 10 most recent posts

List length:
LLEN tasks
→ Number of items in queue</div>

                <h4>4. Sets (Unique Items, Tags)</h4>
                <div class="code-block">User's interests:
SADD user:123:interests "coding" "gaming" "music"

Check membership:
SISMEMBER user:123:interests "coding"
→ 1 (true)

Get all:
SMEMBERS user:123:interests
→ ["coding", "gaming", "music"]

Set operations:
SINTER user:123:interests user:456:interests
→ Common interests

Online users:
SADD online_users "user:123"
SCARD online_users
→ Count online users</div>

                <h4>5. Sorted Sets (Leaderboards, Rankings)</h4>
                <div class="code-block">Game leaderboard:
ZADD leaderboard 1500 "player1"
ZADD leaderboard 2000 "player2"
ZADD leaderboard 1800 "player3"

Top 10 players:
ZREVRANGE leaderboard 0 9 WITHSCORES
→ Ranked by score

Player rank:
ZREVRANK leaderboard "player2"
→ 0 (first place)

Update score:
ZINCRBY leaderboard 100 "player1"

Perfect for: Leaderboards, priority queues, time-series data</div>

                <h2>Redis Architecture Patterns</h2>

                <h3>1. Simple Single Instance</h3>
                <div class="code-block">Setup:
[App Servers] → [Single Redis Instance]

Pros:
- Simple setup
- Low latency
- Good for small apps

Cons:
- Single point of failure
- Limited by single machine resources
- No high availability

Good for: Development, small production apps</div>

                <h3>2. Master-Slave Replication</h3>
                <div class="code-block">Setup:
                [Redis Master]
                ↓ (replication)
    [Slave 1]   [Slave 2]   [Slave 3]

Writes → Master
Reads → Slaves (distributed)

Benefits:
- Read scalability
- Data redundancy
- Automatic failover with Sentinel

Configuration:
# On slave
slaveof master-ip master-port

Replication is asynchronous!
- Master writes → Replicates to slaves
- Slight delay (milliseconds)</div>

                <h3>3. Redis Sentinel (High Availability)</h3>
                <div class="code-block">Sentinel monitors Redis instances:

[Sentinel 1]  [Sentinel 2]  [Sentinel 3]
        ↓           ↓            ↓
    [Master]    [Slave 1]    [Slave 2]

If master fails:
1. Sentinels detect failure (quorum)
2. Elect new master from slaves
3. Reconfigure slaves
4. Notify clients of new master

Automatic failover in ~30 seconds!

Minimum 3 Sentinels for quorum</div>

                <h3>4. Redis Cluster (Sharding)</h3>
                <div class="code-block">Horizontal scaling with data partitioning:

[Node 1: slots 0-5461]     [Node 2: slots 5462-10922]
[Node 3: slots 10923-16383]

Each node:
- Handles subset of keys
- Has slave for redundancy

Hash slot calculation:
HASH_SLOT = CRC16(key) mod 16384

Benefits:
- Multi-GB datasets
- Linear scalability
- Automatic sharding

Minimum 6 nodes (3 masters + 3 slaves)</div>

                <h2>Redis Persistence</h2>

                <h3>RDB (Redis Database Snapshots)</h3>
                <div class="code-block">Periodic snapshots to disk:

Configuration:
save 900 1    # Save if 1 key changed in 900s
save 300 10   # Save if 10 keys changed in 300s
save 60 10000 # Save if 10k keys changed in 60s

Process:
1. Fork background process
2. Write snapshot to .rdb file
3. Replace old snapshot

Pros:
- Fast recovery (single file)
- Compact
- Good for backups

Cons:
- Lose data since last snapshot
- Fork can be slow for large datasets</div>

                <h3>AOF (Append Only File)</h3>
                <div class="code-block">Log every write operation:

Configuration:
appendonly yes
appendfsync everysec  # Sync every second

Example AOF:
SET key1 "value1"
INCR counter
HSET user:1 name "John"

Pros:
- More durable (minimal data loss)
- Log is human-readable
- Auto-rewrite to compact

Cons:
- Larger files
- Slower recovery
- Slightly slower performance

Best: Use both RDB + AOF!</div>

                <h2>Real-World Examples</h2>

                <h3>Twitter: Timeline Cache</h3>
                <div class="code-block">Problem:
- 500M users
- Each user's timeline = expensive query
- Can't query database for every page load

Solution with Redis:
1. Store timeline in Redis List
   Key: timeline:user:123
   Value: [tweet_id_1, tweet_id_2, ...]

2. When user tweets:
   LPUSH timeline:follower:456 tweet_id
   → Update all followers' timelines

3. Load timeline:
   LRANGE timeline:user:123 0 19
   → Get 20 most recent tweets (1ms!)

Result:
- Timeline loads in < 10ms
- Database only for tweet content
- 99% cache hit rate</div>

                <h3>Stack Overflow: Session Store</h3>
                <div class="code-block">Problem:
- Millions of users
- Multiple web servers
- Need shared session storage

Solution with Redis:
1. Session data in Redis Hash
   Key: session:abc123
   Fields: {user_id, username, auth_token, ...}

2. Auto-expiration with TTL
   EXPIRE session:abc123 3600
   → 1 hour session timeout

3. Any server can access
   HGETALL session:abc123
   → Get full session (2ms)

Benefits:
- Shared across servers
- Fast access
- Auto-cleanup
- Simple failover with replication</div>

                <h3>Instagram: Rate Limiting</h3>
                <div class="code-block">Problem:
- Prevent API abuse
- Limit: 100 requests/hour per user

Solution with Redis:
1. Counter with TTL
   Key: ratelimit:user:123

2. On each request:
   INCR ratelimit:user:123
   EXPIRE ratelimit:user:123 3600

3. Check limit:
   GET ratelimit:user:123
   If > 100: Reject request

Atomic operations ensure accuracy!

Advanced: Sliding window with Sorted Set
ZADD ratelimit:user:123 timestamp request_id
ZREMRANGEBYSCORE ratelimit:user:123 0 (now - 3600)
ZCARD ratelimit:user:123
→ Exact count in last hour</div>

                <h2>Memcached Use Cases</h2>

                <h3>When to Choose Memcached</h3>
                <div class="code-block">Perfect for:
1. Pure caching (no persistence needed)
2. Simple key-value storage
3. Multi-threaded performance critical
4. Large values (up to 1MB)
5. Minimal operational overhead

Facebook's Usage:
- Thousands of Memcached servers
- TB of cached data
- Billions of requests/day
- Simple get/set operations
- Multi-get for batch requests

Configuration:
memcached -m 64000 -c 1024 -t 16
→ 64GB RAM, 1024 connections, 16 threads</div>

                <h2>Performance Optimization</h2>

                <h3>Connection Pooling</h3>
                <div class="code-block">Problem: Creating connections is expensive

Solution: Reuse connections
const pool = new Redis({
  maxConnections: 50,
  minConnections: 10
});

Benefits:
- Faster requests (no connection overhead)
- Limited resource usage
- Better throughput</div>

                <h3>Pipelining</h3>
                <div class="code-block">Send multiple commands at once:

Without pipelining:
SET key1 "value1" → RTT: 1ms
SET key2 "value2" → RTT: 1ms
SET key3 "value3" → RTT: 1ms
Total: 3ms

With pipelining:
pipeline.set("key1", "value1")
pipeline.set("key2", "value2")
pipeline.set("key3", "value3")
pipeline.exec()
→ Total: 1ms (one round-trip!)

10-100x faster for batch operations</div>

                <h3>Batch Operations</h3>
                <div class="code-block">Get multiple keys:
MGET key1 key2 key3
→ One command instead of three

Set multiple:
MSET key1 "val1" key2 "val2" key3 "val3"

Get hash fields:
HMGET user:123 name email age
→ One command for multiple fields</div>

                <h2>Common Pitfalls</h2>

                <h3>1. Key Naming Disasters</h3>
                <div class="code-block">Bad:
user123, user456, post789
→ Hard to manage, no pattern

Good:
user:123, user:456, post:789
→ Clear namespace

Even better:
user:123:profile
user:123:settings
post:789:comments
→ Hierarchical, organized</div>

                <h3>2. Memory Management</h3>
                <div class="code-block">Monitor memory:
INFO memory

Set max memory:
maxmemory 2gb
maxmemory-policy allkeys-lru

Without limits:
- Redis uses all RAM
- Server swaps to disk
- Performance dies</div>

                <h3>3. Hot Keys</h3>
                <div class="code-block">Problem: One key gets millions of requests
→ Single instance bottleneck

Solutions:
1. Client-side caching
2. Key sharding (split into multiple keys)
3. Replication (read from slaves)

Example:
Hot key: trending_post:123

Split to:
trending_post:123:shard1
trending_post:123:shard2
trending_post:123:shard3
→ Distribute load</div>

                <h2>Best Practices</h2>

                <ol style="margin: 1rem 0; margin-left: 2rem;">
                    <li><strong>Use Redis for most cases:</strong> More features, flexibility</li>
                    <li><strong>Use Memcached if:</strong> Pure caching, multi-threaded performance critical</li>
                    <li><strong>Enable persistence:</strong> RDB + AOF for production</li>
                    <li><strong>Use replication:</strong> Master-slave for high availability</li>
                    <li><strong>Set TTLs:</strong> Prevent memory bloat</li>
                    <li><strong>Monitor memory:</strong> Set maxmemory and eviction policy</li>
                    <li><strong>Use connection pooling:</strong> Reuse connections</li>
                    <li><strong>Batch operations:</strong> Use pipelining and MGET/MSET</li>
                    <li><strong>Proper key naming:</strong> Use namespaces (user:123:profile)</li>
                    <li><strong>Handle failures gracefully:</strong> Always have database fallback</li>
                </ol>

                <h2>Summary</h2>
                <p>Distributed caching with Redis or Memcached is essential for scaled applications. Redis offers rich data types, persistence, and replication - making it suitable for caching, sessions, queues, and real-time features. Memcached is simpler and faster for pure key-value caching. Redis Master-Slave provides high availability, Redis Cluster enables horizontal scaling. Use connection pooling, pipelining, and batch operations for optimal performance. Always set TTLs and monitor memory usage. Production systems should use replication for redundancy and proper eviction policies to prevent memory issues.</p>
            `,
            interviews: [
                {
                    question: "What's the difference between Redis and Memcached? When would you choose each?",
                    answer: "Redis: Rich data types (strings, lists, sets, hashes, sorted sets), persistence, replication, pub/sub, single-threaded. Memcached: Simple key-value only, multi-threaded, no persistence, pure caching. Choose Redis for: Sessions, queues, leaderboards, most use cases (90%). Choose Memcached for: Pure caching, multi-threaded performance critical, simplicity priority. Redis is more versatile, Memcached is simpler."
                },
                {
                    question: "Explain Redis data types and give real-world use cases",
                    answer: "Strings: Basic cache, counters (page views). Hashes: User objects (HSET user:123 name 'John'). Lists: Queues, recent items (LPUSH tasks 'job'). Sets: Tags, unique items (SADD user:likes 'post123'). Sorted Sets: Leaderboards, rankings (ZADD leaderboard 1500 'player1'). Each optimized for specific access patterns. Use right type for your data structure."
                },
                {
                    question: "How does Redis achieve high availability and scalability?",
                    answer: "High availability: Master-Slave replication with Sentinel for automatic failover. Master writes, slaves replicate. If master fails, Sentinel promotes slave (~30s failover). Scalability: Redis Cluster with sharding across nodes. 16,384 hash slots distributed. Each node handles subset of keys. Minimum 6 nodes (3 masters + 3 slaves). Linear scaling for multi-GB datasets."
                },
                {
                    question: "What's the difference between RDB and AOF persistence in Redis?",
                    answer: "RDB: Periodic snapshots to .rdb file. Fast recovery, compact, but lose data since last snapshot. Good for backups. AOF: Logs every write operation. More durable (minimal loss), human-readable, but larger files and slower recovery. Best practice: Use both! RDB for fast recovery + AOF for durability. Configure: appendonly yes + save intervals."
                },
                {
                    question: "How would you implement rate limiting with Redis?",
                    answer: "Simple counter: INCR ratelimit:user:123 + EXPIRE 3600. Check count before allowing request. Advanced sliding window: Use sorted set with ZADD ratelimit:user:123 timestamp request_id, ZREMRANGEBYSCORE to remove old, ZCARD for exact count. Atomic operations ensure accuracy under concurrent requests. Can implement per-user, per-IP, or per-API-key limits. Instagram uses this pattern."
                }
            ]
        }
    ]
};
