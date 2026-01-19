// Module 11: Real-World System Designs
// Contains 8 comprehensive system design case studies

const module11RealDesigns = {
    title: 'Module 11: Real-World System Designs',
    lessons: [
        {
            id: 'design-url-shortener',
            title: 'Design URL Shortener (like bit.ly)',
            duration: '60 min',
            content: `
                <h2>Problem Statement</h2>
                <p>Design a URL shortening service like bit.ly, TinyURL, or goo.gl. The service takes long URLs and creates short, unique aliases that redirect to the original URL.</p>

                <h3>Functional Requirements</h3>
                <ul>
                    <li>Given a URL, generate a shorter unique alias</li>
                    <li>When user accesses short URL, redirect to original</li>
                    <li>Optional: Custom short links</li>
                    <li>Optional: Link expiration</li>
                    <li>Analytics: Click count, geographic data</li>
                </ul>

                <h3>Non-Functional Requirements</h3>
                <ul>
                    <li>High availability (redirects must always work)</li>
                    <li>Low latency redirects (&lt;100ms)</li>
                    <li>Short URLs should not be predictable</li>
                </ul>

                <h2>Back-of-Envelope Estimation</h2>
                <div class="code-block">Assumptions:
- 100M new URLs per month
- Read:Write ratio = 100:1 (reads dominate)
- URL stored for 5 years

Traffic:
- Writes: 100M / (30 * 24 * 3600) ≈ 40 URLs/second
- Reads: 40 * 100 = 4000 redirects/second

Storage:
- Each URL entry: ~500 bytes (short URL, long URL, metadata)
- 5 years: 100M * 12 * 5 = 6 billion URLs
- Total: 6B * 500 bytes = 3 TB

Bandwidth:
- Writes: 40 * 500 bytes = 20 KB/s
- Reads: 4000 * 500 bytes = 2 MB/s</div>

                <h2>System Design</h2>

                <h3>High-Level Architecture</h3>
                <div class="code-block">
┌─────────┐     ┌──────────────┐     ┌─────────────┐
│ Client  │────▶│ Load Balancer│────▶│ App Servers │
└─────────┘     └──────────────┘     └──────┬──────┘
                                           │
                    ┌──────────────────────┼──────────────────────┐
                    │                      │                      │
                    ▼                      ▼                      ▼
            ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
            │    Cache     │      │   Database   │      │  Analytics   │
            │   (Redis)    │      │  (Cassandra) │      │   (Kafka)    │
            └──────────────┘      └──────────────┘      └──────────────┘
</div>

                <h3>URL Encoding: How to Generate Short URLs</h3>
                <p>The key challenge is generating unique, short identifiers. Several approaches:</p>

                <h4>Approach 1: Base62 Encoding</h4>
                <div class="code-block">Characters: a-z, A-Z, 0-9 = 62 characters

Length calculation:
- 6 chars: 62^6 = 56.8 billion combinations
- 7 chars: 62^7 = 3.5 trillion combinations

6 characters is enough for our 6 billion URLs!

Example:
Counter: 1234567890
Base62:  1LY7VK

Algorithm:
function toBase62(num) {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    while (num > 0) {
        result = chars[num % 62] + result;
        num = Math.floor(num / 62);
    }
    return result.padStart(6, '0');
}</div>

                <h4>Approach 2: MD5/SHA256 Hash</h4>
                <div class="code-block">Hash the long URL, take first 6-7 characters:

longURL = "https://example.com/very/long/path"
hash = MD5(longURL) = "a1b2c3d4e5f6..."
shortCode = hash[0:7] = "a1b2c3d"

Problem: Collisions possible!
Solution: Check DB, if exists, append counter and rehash</div>

                <h4>Approach 3: Distributed ID Generator (Recommended)</h4>
                <div class="code-block">Use a distributed unique ID generator:

Option A: Twitter Snowflake
- 64-bit ID: timestamp + machine ID + sequence
- Guaranteed unique across machines
- No coordination needed

Option B: Pre-generated Key Ranges
┌─────────────┐
│ Key Generator│
│ Service (KGS)│
└──────┬──────┘
       │ Assigns ranges
       ▼
┌──────────────────────────────────┐
│ Server 1    │ Server 2   │ ...  │
│ Keys: 1-1M  │ Keys: 1M-2M│      │
└──────────────────────────────────┘

Each server gets a range, uses keys locally
When range exhausted, request new range</div>

                <h3>Database Schema</h3>
                <div class="code-block">URL Table:
┌────────────────────────────────────────────────┐
│ short_code (PK) │ VARCHAR(7)                   │
│ original_url    │ VARCHAR(2048)                │
│ user_id         │ BIGINT (nullable)            │
│ created_at      │ TIMESTAMP                    │
│ expires_at      │ TIMESTAMP (nullable)         │
│ click_count     │ BIGINT DEFAULT 0             │
└────────────────────────────────────────────────┘

Why Cassandra/NoSQL?
- Simple key-value lookups (short_code → original_url)
- High write throughput
- Easy horizontal scaling
- No complex joins needed</div>

                <h3>Read Path (Redirect)</h3>
                <div class="code-block">User visits: https://short.ly/abc123

1. Request hits Load Balancer
2. Routes to App Server
3. Check Redis Cache for "abc123"
   - Cache HIT: Return original URL
   - Cache MISS: Query Cassandra
4. Return 301/302 redirect to original URL
5. Async: Update click analytics

┌────────┐    ┌─────────┐    ┌───────┐    ┌───────────┐
│ Client │───▶│  Cache  │───▶│  DB   │───▶│ Analytics │
└────────┘    │ (Redis) │    │       │    │  (Kafka)  │
   ▲          └────┬────┘    └───────┘    └───────────┘
   │               │
   └───────────────┘
   301 Redirect

301 vs 302:
- 301 (Permanent): Browser caches, fewer server hits
- 302 (Temporary): Every click hits server (better analytics)</div>

                <h3>Caching Strategy</h3>
                <div class="code-block">Cache the most accessed URLs:

Redis Cache:
- Key: short_code
- Value: original_url
- TTL: 24 hours (or based on access frequency)

Cache Policy: LRU (Least Recently Used)
- 80/20 rule: 20% of URLs get 80% of traffic
- Cache hot URLs, evict cold ones

Cache Size Estimation:
- Cache 20% of daily URLs
- 4000 reads/sec * 86400 sec = 345M reads/day
- Unique URLs: ~50M/day
- Cache 20%: 10M URLs * 500 bytes = 5 GB Redis</div>

                <h3>Handling High Availability</h3>
                <div class="code-block">Database Replication:
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Primary   │────▶│  Replica 1  │────▶│  Replica 2  │
│ (Cassandra) │     │             │     │             │
└─────────────┘     └─────────────┘     └─────────────┘

- Writes go to primary
- Reads distributed across replicas
- If primary fails, replica promotes

Multi-Region:
┌──────────────────┐     ┌──────────────────┐
│    US-East       │◀───▶│    US-West       │
│  ┌──────────┐    │     │   ┌──────────┐   │
│  │ Cassandra│    │     │   │ Cassandra│   │
│  └──────────┘    │     │   └──────────┘   │
└──────────────────┘     └──────────────────┘
      Async replication between regions</div>

                <h2>bit.ly Architecture (Real World)</h2>
                <div class="code-block">bit.ly handles 10+ billion clicks/month

Key decisions:
1. MySQL for URL storage (simple, reliable)
2. Memcached for caching (before Redis was popular)
3. Nginx for high-performance redirects
4. Kafka for click stream analytics
5. Hadoop for batch analytics

Optimizations:
- Custom Nginx module for fast redirects
- Bypasses application layer for cached URLs
- Sub-millisecond redirects for cached URLs</div>

                <h2>Summary</h2>
                <p>URL shortener is a classic system design problem that tests knowledge of: hashing/encoding, database design, caching, and scalability. Key insights: use distributed ID generation to avoid collisions, cache heavily (reads dominate), use NoSQL for simple key-value lookups, and consider 301 vs 302 trade-offs for analytics.</p>
            `,
            interviews: [
                {
                    question: "How would you generate unique short URLs without collisions?",
                    answer: "Three approaches: 1) Base62 encoding of auto-increment ID or distributed ID (Snowflake) - guaranteed unique, 2) Hash (MD5/SHA) of long URL, take first 6-7 chars, handle collisions by appending counter, 3) Pre-generated key service (KGS) that assigns key ranges to servers. Recommended: Snowflake IDs converted to Base62 - globally unique without coordination."
                },
                {
                    question: "Should you use 301 or 302 redirects?",
                    answer: "301 (permanent) tells browsers to cache the redirect - reduces server load but you lose analytics since cached redirects don't hit your server. 302 (temporary) means every click hits your server - more load but accurate click tracking. Most URL shorteners use 302 for analytics, or 301 with JavaScript tracking pixel."
                },
                {
                    question: "How would you handle a URL shortener at Twitter's scale?",
                    answer: "Twitter's t.co handles billions of redirects: 1) Heavy caching with Redis/Memcached for hot URLs, 2) Cassandra for storage (high write throughput, easy scaling), 3) Multiple data centers with async replication, 4) Custom Nginx module for sub-ms redirects bypassing app layer, 5) Kafka for async analytics processing."
                },
                {
                    question: "How do you prevent abuse (spam, malware links)?",
                    answer: "Multiple layers: 1) Rate limiting per IP/user, 2) Check URLs against malware databases (Google Safe Browsing), 3) CAPTCHA for anonymous users, 4) Monitor click patterns for suspicious activity, 5) Allow reporting malicious links, 6) Automatic expiration for unused links."
                }
            ]
        },
        {
            id: 'design-social-feed',
            title: 'Design Social Media Feed (like Twitter/Instagram)',
            duration: '60 min',
            content: `
                <h2>Problem Statement</h2>
                <p>Design a social media news feed system like Twitter's timeline, Facebook's news feed, or Instagram's home feed. Users follow others and see their posts in a personalized feed.</p>

                <h3>Functional Requirements</h3>
                <ul>
                    <li>Users can create posts (text, images, videos)</li>
                    <li>Users can follow/unfollow other users</li>
                    <li>Users see feed of posts from people they follow</li>
                    <li>Feed is sorted by time (or relevance)</li>
                    <li>Support likes, comments, shares</li>
                </ul>

                <h3>Non-Functional Requirements</h3>
                <ul>
                    <li>High availability</li>
                    <li>Feed generation latency &lt;500ms</li>
                    <li>Eventual consistency acceptable</li>
                    <li>Scale to 500M users, 1B+ posts</li>
                </ul>

                <h2>Back-of-Envelope Estimation</h2>
                <div class="code-block">Users: 500M total, 100M DAU
Posts: 50M new posts/day
Follows: Average user follows 200 people

Feed requests:
- 100M DAU * 10 feed loads/day = 1B feed requests/day
- 1B / 86400 = ~12,000 requests/second

Storage:
- Post: 1KB average (text + metadata)
- 50M posts/day * 365 * 5 years = 91B posts
- 91B * 1KB = 91 TB (posts only)
- Media stored separately in CDN</div>

                <h2>Two Approaches: Push vs Pull</h2>

                <h3>Pull Model (Fan-out on Read)</h3>
                <div class="code-block">When user requests feed:
1. Get list of users they follow
2. Fetch recent posts from each followed user
3. Merge and sort posts
4. Return top N posts

Timeline:
User A follows: [B, C, D, E, F] (5 users)
Request feed →
  Query posts from B: [post1, post2]
  Query posts from C: [post3]
  Query posts from D: [post4, post5]
  Query posts from E: []
  Query posts from F: [post6]
→ Merge all → Sort by time → Return

Pros:
✓ No storage overhead for feeds
✓ Fresh data (always fetches latest)
✓ Simple architecture

Cons:
✗ Slow for users following many people
✗ High read amplification
✗ Inconsistent latency</div>

                <h3>Push Model (Fan-out on Write)</h3>
                <div class="code-block">When user creates a post:
1. Get list of their followers
2. Push post to each follower's feed cache

User B posts →
  B has followers: [A, X, Y, Z] (1000 followers)
  Push to A's feed cache
  Push to X's feed cache
  Push to Y's feed cache
  ... (1000 pushes)

User A requests feed →
  Just read from A's pre-computed feed cache!

Pros:
✓ Fast feed reads (pre-computed)
✓ Consistent latency
✓ Simple read path

Cons:
✗ High write amplification (celebrity problem)
✗ Storage for feed caches
✗ Slight delay for new posts to appear</div>

                <h3>The Celebrity Problem</h3>
                <div class="code-block">Push model breaks for celebrities:

Lady Gaga: 80 million followers
Posts once → 80 million feed updates!

Time to fan-out: 80M / 10K writes/sec = 8000 seconds = 2+ hours!
Users don't see her post for hours - unacceptable!

Solution: Hybrid Approach (Twitter's solution)
- Regular users: Push model (pre-compute feeds)
- Celebrities (>10K followers): Pull model (fetch at read time)

Feed generation:
1. Read pre-computed feed (posts from regular followees)
2. Fetch recent posts from celebrity followees
3. Merge and return

This balances write amplification with read latency.</div>

                <h2>System Architecture</h2>
                <div class="code-block">
┌─────────┐    ┌─────────────┐    ┌──────────────────────────────┐
│  Client │───▶│ API Gateway │───▶│         App Servers          │
└─────────┘    └─────────────┘    └──────────────┬───────────────┘
                                                 │
                    ┌────────────────────────────┼────────────────────────────┐
                    │                            │                            │
                    ▼                            ▼                            ▼
           ┌───────────────┐           ┌───────────────┐           ┌───────────────┐
           │  Post Service │           │  Feed Service │           │ User Service  │
           │               │           │               │           │               │
           │ ┌───────────┐ │           │ ┌───────────┐ │           │ ┌───────────┐ │
           │ │ Posts DB  │ │           │ │Feed Cache │ │           │ │ Users DB  │ │
           │ │(Cassandra)│ │           │ │  (Redis)  │ │           │ │  (MySQL)  │ │
           │ └───────────┘ │           │ └───────────┘ │           │ └───────────┘ │
           └───────────────┘           └───────────────┘           └───────────────┘
                    │                            │
                    └────────────┬───────────────┘
                                 ▼
                         ┌─────────────┐
                         │   Kafka     │
                         │ (Fan-out)   │
                         └─────────────┘
</div>

                <h3>Post Creation Flow</h3>
                <div class="code-block">1. User creates post via API
2. Post Service:
   - Validate content
   - Store in Posts DB (Cassandra)
   - Upload media to CDN
   - Publish to Kafka

3. Fan-out Service (consumes from Kafka):
   - Get poster's followers
   - If poster is NOT celebrity:
     - Push post ID to each follower's feed (Redis)
   - If poster IS celebrity:
     - Skip (will be pulled at read time)

4. Notification Service:
   - Notify mentioned users
   - Send push notifications</div>

                <h3>Feed Generation Flow</h3>
                <div class="code-block">1. User requests home feed
2. Feed Service:
   a. Get pre-computed feed from Redis (post IDs)
   b. Get list of celebrity followees
   c. Fetch recent posts from celebrities (pull)
   d. Merge pre-computed + celebrity posts
   e. Sort by timestamp (or ranking score)
   f. Hydrate post IDs with full post data
   g. Return feed

Redis Feed Structure:
Key: feed:{user_id}
Value: Sorted Set of (post_id, timestamp)
  - ZADD feed:123 1609459200 "post_456"
  - ZREVRANGE feed:123 0 49 (get top 50 posts)</div>

                <h3>Database Design</h3>
                <div class="code-block">Posts Table (Cassandra):
┌────────────────────────────────────────────────┐
│ post_id      │ UUID (partition key)            │
│ user_id      │ BIGINT                          │
│ content      │ TEXT                            │
│ media_urls   │ LIST<TEXT>                      │
│ created_at   │ TIMESTAMP                       │
│ like_count   │ COUNTER                         │
└────────────────────────────────────────────────┘

User Timeline (for profile view):
Partition by user_id, cluster by created_at DESC
Efficient query: "Get user X's recent posts"

Followers Table:
┌────────────────────────────────────────────────┐
│ user_id      │ BIGINT (who is being followed)  │
│ follower_id  │ BIGINT (who is following)       │
│ created_at   │ TIMESTAMP                       │
└────────────────────────────────────────────────┘

Index both directions for:
- Get all followers of user X
- Get all users that X follows</div>

                <h2>Twitter's Architecture (Real World)</h2>
                <div class="code-block">Twitter Timeline Architecture:

1. Redis for feed caching
   - Each user's home timeline: last 800 tweet IDs
   - 300M users * 800 tweets * 8 bytes = ~2 TB Redis

2. Manhattan (Twitter's NoSQL)
   - Stores tweets, user data
   - Multi-tenant, strongly consistent

3. Fan-out Service
   - Processes 100K+ tweets/second
   - Hybrid push/pull for celebrities

4. Ranking Service
   - ML-based relevance scoring
   - Considers: recency, engagement, relationship

Optimizations:
- Tweets stored in memory (SSDs for overflow)
- Heavy use of Bloom filters for "seen tweets"
- Async fan-out via Kafka</div>

                <h2>Feed Ranking</h2>
                <div class="code-block">Beyond chronological: ML-based ranking

Features considered:
1. Recency: How old is the post?
2. Engagement: Likes, comments, shares
3. Relationship: How often do you interact with poster?
4. Content type: Photo vs text vs video
5. Creator quality: Spam score, verified status

Ranking Score = w1*recency + w2*engagement + w3*relationship + ...

Instagram's approach:
- "Interest": ML prediction of how much you'll like it
- "Recency": Prioritize newer posts
- "Relationship": Interaction history with poster

Trade-off: Engagement vs user satisfaction
- High engagement ≠ user happiness
- "Doomscrolling" controversy</div>

                <h2>Summary</h2>
                <p>Social feed design is fundamentally about the push vs pull trade-off. Pure push fails for celebrities (write amplification). Pure pull is slow for heavy followers. The hybrid approach (push for normal users, pull for celebrities) is used by Twitter, Instagram, and Facebook. Key technologies: Redis for feed caches, Kafka for async fan-out, and ML for feed ranking.</p>
            `,
            interviews: [
                {
                    question: "How does Twitter handle the celebrity problem?",
                    answer: "Twitter uses hybrid fan-out: Regular users (<10K followers) use push model - posts fan out to follower feeds on write. Celebrities use pull model - their posts are fetched at read time when followers load their feed. This avoids 80M writes when Lady Gaga tweets. Feed generation merges pre-computed feed (regular followees) with real-time fetched celebrity posts."
                },
                {
                    question: "How would you design feed storage for 500M users?",
                    answer: "Use Redis sorted sets for feed caches. Key: feed:{user_id}, Value: sorted set of (post_id, timestamp). Store last 800 post IDs per user (like Twitter). Total: 500M * 800 * 8 bytes ≈ 3TB Redis cluster. Use Cassandra for posts table partitioned by post_id. User timeline table partitioned by user_id for profile views."
                },
                {
                    question: "Push vs Pull - when would you choose each?",
                    answer: "Push when: followers count is low, read-heavy (users check feed often), latency critical. Pull when: high follower counts (celebrities), write-heavy, storage constrained. Most systems use hybrid: push for 99% of users (low followers), pull for 1% celebrities. The crossover threshold is typically 10K-100K followers."
                },
                {
                    question: "How do you handle feed ranking vs chronological?",
                    answer: "Chronological is simple (sort by timestamp) but misses relevant content. Ranked feeds use ML scoring: features include recency, engagement (likes/comments), user-poster relationship strength, content type preferences, and creator quality. Score = weighted sum of features. Trade-off: ranked feeds increase engagement but can create filter bubbles and 'doomscrolling'."
                }
            ]
        },
        {
            id: 'design-video-streaming',
            title: 'Design Video Streaming Platform (like Netflix/YouTube)',
            duration: '60 min',
            content: `
                <h2>Problem Statement</h2>
                <p>Design a video streaming platform like Netflix or YouTube that can serve millions of concurrent viewers with minimal buffering and adaptive quality.</p>

                <h3>Key Challenges</h3>
                <ul>
                    <li>Video files are huge (1-10 GB per movie)</li>
                    <li>Global audience with varying network speeds</li>
                    <li>Peak traffic (evening hours) vs off-peak</li>
                    <li>Minimize buffering while maximizing quality</li>
                </ul>

                <h2>Back-of-Envelope Estimation</h2>
                <div class="code-block">Netflix Scale:
- 200M subscribers
- 2 hours average viewing/day
- Concurrent viewers at peak: ~10M
- Bitrate: 5 Mbps average (HD)

Bandwidth:
- 10M viewers * 5 Mbps = 50 Tbps peak bandwidth!
- That's why Netflix is 15% of global internet traffic

Storage:
- 15,000 titles
- Each title: 10 versions (quality levels) * 2GB avg = 20GB
- Total: 15,000 * 20GB = 300 TB (just video files)
- Plus metadata, thumbnails, subtitles...</div>

                <h2>Video Processing Pipeline</h2>
                <div class="code-block">Upload → Transcode → Store → Distribute

1. UPLOAD
   - Creator uploads original video (4K, ProRes)
   - Stored in origin storage (S3)

2. TRANSCODE (Most Important Step)
   Original → Multiple versions:
   ┌─────────────────────────────────────┐
   │ 4K (2160p)  - 15 Mbps  - Fiber     │
   │ 1080p HD   - 5 Mbps   - Broadband  │
   │ 720p       - 3 Mbps   - WiFi       │
   │ 480p       - 1 Mbps   - Mobile     │
   │ 240p       - 0.5 Mbps - Slow conn  │
   └─────────────────────────────────────┘
   Each version also in multiple codecs:
   - H.264 (most compatible)
   - H.265/HEVC (50% smaller, newer devices)
   - VP9 (Google, royalty-free)
   - AV1 (newest, best compression)

3. CHUNKING
   Split video into 2-10 second segments
   Why? Adaptive bitrate streaming (ABR)

4. STORE & DISTRIBUTE
   Push to CDN edge servers worldwide</div>

                <h3>Adaptive Bitrate Streaming (ABR)</h3>
                <div class="code-block">The magic that prevents buffering:

Video split into chunks:
[Chunk 1][Chunk 2][Chunk 3][Chunk 4]...
  4 sec    4 sec    4 sec    4 sec

Each chunk available in multiple qualities:
Chunk 1: [4K] [1080p] [720p] [480p] [240p]
Chunk 2: [4K] [1080p] [720p] [480p] [240p]

Player dynamically selects quality per chunk:

User's bandwidth: Starts good → gets bad → recovers
Chunk 1: 1080p  (good bandwidth)
Chunk 2: 1080p  (still good)
Chunk 3: 480p   (bandwidth dropped!)
Chunk 4: 720p   (recovering)
Chunk 5: 1080p  (back to normal)

Result: Continuous playback, quality adapts
Better than: Fixed quality that buffers</div>

                <h2>System Architecture</h2>
                <div class="code-block">
                              ┌─────────────────────┐
                              │   Origin Storage    │
                              │       (S3)          │
                              └──────────┬──────────┘
                                         │
                              ┌──────────▼──────────┐
                              │    Transcoding      │
                              │    (EC2 Fleet)      │
                              └──────────┬──────────┘
                                         │
┌─────────────────────────────────────────────────────────────────┐
│                         CDN Layer                               │
│  ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐        │
│  │US-East  │   │US-West  │   │ Europe  │   │  Asia   │        │
│  │  Edge   │   │  Edge   │   │  Edge   │   │  Edge   │        │
│  └────┬────┘   └────┬────┘   └────┬────┘   └────┬────┘        │
└───────┼─────────────┼─────────────┼─────────────┼──────────────┘
        │             │             │             │
        ▼             ▼             ▼             ▼
    [Users]       [Users]       [Users]       [Users]
</div>

                <h3>Netflix Open Connect</h3>
                <div class="code-block">Netflix's Secret: Own CDN called Open Connect

Traditional CDN: Pay Akamai/CloudFlare per GB
Netflix: Built their own CDN!

Open Connect Appliances (OCAs):
- Custom servers with 100+ TB storage
- Placed INSIDE ISP data centers
- Netflix pays ISP = $0 egress
- ISP benefits: Less external traffic

Result:
- User in NYC requests "Stranger Things"
- Served from OCA at Verizon NYC datacenter
- Never leaves ISP network!
- Sub-millisecond latency

Scale: 17,000+ OCA servers globally
Capacity: 100+ Tbps</div>

                <h3>Video Delivery Flow</h3>
                <div class="code-block">1. User opens Netflix app
2. App requests manifest file from API
3. Manifest contains URLs for all quality chunks

Manifest Example (HLS format):
#EXTM3U
#EXT-X-STREAM-INF:BANDWIDTH=5000000
https://cdn.netflix.com/movie/1080p/playlist.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=3000000
https://cdn.netflix.com/movie/720p/playlist.m3u8

4. Player selects quality based on bandwidth
5. Requests chunks from nearest CDN edge
6. Plays chunk, pre-fetches next chunks
7. Continuously monitors bandwidth, adjusts quality</div>

                <h2>YouTube vs Netflix Architecture</h2>
                <div class="code-block">Key Difference: Content Type

Netflix:
- Professional content (movies, shows)
- Known catalog (15K titles)
- Pre-transcode everything
- Push to all CDN edges
- Optimize for binge-watching

YouTube:
- User-generated content
- 500 hours uploaded per MINUTE
- Can't pre-transcode everything
- On-demand transcoding for unpopular videos
- Long tail: Most videos have few views

YouTube's Approach:
- Popular videos: Pre-transcode, push to edge
- Long tail: Transcode on first view, cache
- "Viral detection": Auto-scale transcoding when video spikes</div>

                <h2>Summary</h2>
                <p>Video streaming at scale requires: 1) Aggressive transcoding into multiple qualities and codecs, 2) Chunking for adaptive bitrate streaming, 3) Distributed CDN close to users, 4) Netflix's secret weapon is Open Connect - their own CDN inside ISPs. The key insight is that video quality should dynamically adapt to network conditions to prevent buffering.</p>
            `,
            interviews: [
                {
                    question: "How does Netflix serve 200M users without buffering?",
                    answer: "Three key strategies: 1) Open Connect CDN - custom servers inside ISP datacenters, content never leaves ISP network, 2) Adaptive Bitrate Streaming - video chunked into segments, quality adjusts per chunk based on bandwidth, 3) Predictive caching - popular content pre-positioned at edges, ML predicts what you'll watch next and pre-loads it."
                },
                {
                    question: "Explain adaptive bitrate streaming (ABR).",
                    answer: "Video is split into 2-10 second chunks, each chunk encoded at multiple quality levels (4K, 1080p, 720p, etc.). Player monitors bandwidth in real-time and selects appropriate quality for each chunk. If bandwidth drops, next chunk downloads at lower quality - prevents buffering. When bandwidth recovers, quality increases. Result: continuous playback with dynamic quality."
                },
                {
                    question: "How would you handle 500 hours of video uploaded per minute (YouTube scale)?",
                    answer: "Can't pre-transcode everything. Strategy: 1) Initially transcode to 360p/720p for immediate availability, 2) Full transcode (all qualities) for videos that gain traction, 3) Popular videos get pushed to edge CDN, 4) Long-tail videos transcoded on-demand and cached, 5) Viral detection system triggers aggressive transcoding/distribution when video traffic spikes."
                },
                {
                    question: "Why does Netflix build their own CDN instead of using Akamai?",
                    answer: "Scale economics: At Netflix's scale (15% of internet traffic), paying per-GB to CDN providers would cost billions. Open Connect: custom servers inside ISP datacenters means traffic never leaves ISP network - zero transit costs. ISPs benefit from reduced external bandwidth. Netflix controls quality and can optimize for their specific use case (long-form video)."
                }
            ]
        },
        {
            id: 'design-ride-sharing',
            title: 'Design Ride Sharing System (like Uber/Lyft)',
            duration: '60 min',
            content: `
                <h2>Problem Statement</h2>
                <p>Design a ride-sharing service like Uber or Lyft. Users request rides, nearby drivers are matched, and both parties track the ride in real-time.</p>

                <h3>Functional Requirements</h3>
                <ul>
                    <li>Riders request rides with pickup/dropoff locations</li>
                    <li>Match riders with nearby available drivers</li>
                    <li>Real-time location tracking for both parties</li>
                    <li>Fare calculation and payment processing</li>
                    <li>Rating system for riders and drivers</li>
                </ul>

                <h2>Back-of-Envelope Estimation</h2>
                <div class="code-block">Uber Scale:
- 100M monthly active riders
- 5M drivers
- 20M rides/day
- ~1M concurrent rides at peak

Location Updates:
- Each driver sends location every 3 seconds
- 5M drivers * (1/3) = 1.7M location updates/second!

Storage:
- Ride record: ~1 KB
- 20M rides/day * 365 = 7.3B rides/year
- 7.3 TB/year for ride data</div>

                <h2>Core Challenge: Driver-Rider Matching</h2>
                <div class="code-block">The Matching Problem:

Rider requests ride at location (lat, lng)
Need to find: Nearest available drivers

Naive approach:
FOR each driver:
  IF driver.available:
    distance = calculateDistance(rider, driver)
    IF distance < 5 miles:
      candidates.add(driver)

Problem: O(n) for every request with 5M drivers!
1M requests/hour * 5M drivers = 5 trillion distance calculations/hour

Solution: Spatial Indexing</div>

                <h3>Geospatial Indexing Solutions</h3>
                <div class="code-block">Option 1: Geohash
- Divide world into grid cells
- Each cell has unique string ID
- "9q8yy" = San Francisco area

┌─────┬─────┬─────┐
│9q8yv│9q8yy│9q8yz│
├─────┼─────┼─────┤
│9q8yt│9q8yw│9q8yx│
├─────┼─────┼─────┤
│9q8ys│9q8yu│9q8yq│
└─────┴─────┴─────┘

Longer hash = smaller cell
9q8yy (5 chars) ≈ 5km x 5km
9q8yyk (6 chars) ≈ 1km x 1km

Driver location update:
1. Calculate geohash for driver location
2. Store: geohash → [driver_ids]

Find nearby drivers:
1. Calculate geohash for rider location
2. Get driver IDs from that cell + neighboring cells
3. Only calculate distance for those drivers

Result: O(1) cell lookup + O(k) for k drivers in cell</div>

                <div class="code-block">Option 2: Quadtree
- Recursively divide space into 4 quadrants
- Subdivide until cell has < N drivers

                World
        ┌───────┴───────┐
       NW              SE
    ┌───┴───┐       ┌───┴───┐
   NW  NE  SW SE   NW  NE  SW SE
                         │
                    [drivers here]

Lookup: Traverse tree from root to find cell
Insert: Navigate to cell, add driver
Cell splits when > threshold drivers

Uber uses Google S2 (similar concept)</div>

                <h2>System Architecture</h2>
                <div class="code-block">
┌──────────────────────────────────────────────────────────────────────┐
│                           API Gateway                                 │
└───────────────────────────────────┬──────────────────────────────────┘
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        │                           │                           │
        ▼                           ▼                           ▼
┌───────────────┐         ┌───────────────┐         ┌───────────────┐
│  Rider App    │         │ Driver App    │         │    Dispatch   │
│   Service     │         │   Service     │         │    Service    │
└───────┬───────┘         └───────┬───────┘         └───────┬───────┘
        │                         │                         │
        │                         │                         │
        ▼                         ▼                         ▼
┌───────────────────────────────────────────────────────────────────┐
│                        Location Service                            │
│            (Redis + Geohash/S2 for spatial queries)               │
└───────────────────────────────────────────────────────────────────┘
        │                         │                         │
        ▼                         ▼                         ▼
┌───────────────┐         ┌───────────────┐         ┌───────────────┐
│   Rides DB    │         │   Users DB    │         │  Payments     │
│  (Cassandra)  │         │   (MySQL)     │         │   Service     │
└───────────────┘         └───────────────┘         └───────────────┘
</div>

                <h3>Location Service Design</h3>
                <div class="code-block">Handle 1.7M location updates/second

Redis for real-time driver locations:
- Key: driver:{driver_id}
- Value: {lat, lng, status, timestamp}
- TTL: 30 seconds (auto-cleanup inactive)

Geospatial Index (Redis GEOADD):
- GEOADD drivers {lng} {lat} {driver_id}
- GEORADIUS drivers {lng} {lat} 5 km

Or custom geohash index:
- Key: geohash:{hash}
- Value: Set of driver_ids
- When driver moves: Remove from old cell, add to new

Scaling:
- Shard by city/region
- NYC drivers in one Redis cluster
- SF drivers in another</div>

                <h3>Ride Request Flow</h3>
                <div class="code-block">1. Rider requests ride
   → API Gateway → Rider Service

2. Rider Service → Dispatch Service
   - Pickup location
   - Dropoff location
   - Ride type (UberX, UberXL, etc.)

3. Dispatch Service → Location Service
   - "Find available drivers within 5km of pickup"
   - Location Service queries geohash index
   - Returns list of candidate driver IDs

4. Dispatch Service ranks candidates:
   - Distance to pickup
   - Driver rating
   - ETA
   - Driver acceptance rate

5. Send ride request to top driver
   - Driver has 15 seconds to accept
   - If declined/timeout → next driver
   - Max 3-5 attempts

6. Driver accepts → Create ride record
   - Update driver status: available → en_route
   - Notify rider with driver details</div>

                <h3>Real-Time Tracking</h3>
                <div class="code-block">During ride, both apps show live map:

Driver app:
- Sends location every 3 seconds
- → Location Service (updates Redis)
- → Kafka topic: ride_locations

Rider app:
- Subscribes to driver's location
- WebSocket connection to backend
- Backend consumes from Kafka
- Pushes updates to rider

Architecture:
Driver → Location Service → Kafka → WebSocket Server → Rider

Why Kafka?
- Decouple producer (driver) from consumers (riders)
- Handle bursts of location updates
- Replay capability for debugging</div>

                <h2>Uber's Architecture (Real World)</h2>
                <div class="code-block">Uber's Tech Stack:

1. Ringpop: Custom distributed system framework
   - Consistent hashing for driver sharding
   - Each server owns a set of drivers

2. Google S2: Geospatial indexing
   - Hierarchical cell system
   - Better than geohash at poles/edges

3. Schemaless: Custom MySQL sharding
   - Before they moved to Docstore
   - Eventually consistent

4. Kafka: Event streaming
   - 1 trillion+ messages/day
   - Location updates, ride events

5. H3: Uber's hexagonal grid system
   - Better than square grids for distance
   - Open-sourced

Key Insight: City-based sharding
- Each city is independent system
- NYC can go down without affecting SF
- Reduces blast radius</div>

                <h2>Summary</h2>
                <p>Ride-sharing systems are fundamentally about efficient spatial queries at massive scale. Key techniques: geohashing or quadtrees for spatial indexing, city-based sharding for isolation, Redis for real-time location data, WebSockets for live tracking. The matching algorithm balances distance, ETA, and driver preferences. Uber processes 1.7M location updates/second using these techniques.</p>
            `,
            interviews: [
                {
                    question: "How would you efficiently find nearby drivers?",
                    answer: "Use spatial indexing to avoid O(n) scans. Options: 1) Geohash - divide world into grid cells, store drivers by cell ID, query cell + neighbors, 2) Quadtree - recursively divide space, 3) Google S2/H3 - hierarchical cells. Store driver locations in Redis with GEOADD/GEORADIUS commands. Shard by city for scalability. Result: O(1) cell lookup instead of checking all drivers."
                },
                {
                    question: "How does Uber handle 1.7M location updates per second?",
                    answer: "1) Shard by city - each city's data on separate cluster, 2) Redis for hot location data with TTL auto-cleanup, 3) Batch updates - aggregate multiple updates before processing, 4) Kafka for async processing of location events, 5) Only track active drivers (on trip or available), 6) Reduce update frequency for idle drivers."
                },
                {
                    question: "How would you design the dispatch/matching algorithm?",
                    answer: "1) Query spatial index for drivers within radius of pickup, 2) Filter by availability and ride type, 3) Rank by: distance/ETA, driver rating, acceptance rate, 4) Send request to top candidate with timeout, 5) If declined, try next. Advanced: batch matching - collect requests over short window, run global optimization to minimize total wait time."
                },
                {
                    question: "How do you handle real-time location tracking for rider/driver?",
                    answer: "Driver app sends location updates to Location Service (every 3-5 sec). Updates published to Kafka topic. Rider app maintains WebSocket connection. Backend subscribes to Kafka, filters for relevant ride, pushes to rider via WebSocket. This decouples driver (producer) from rider (consumer), handles bursts, and enables replay for debugging."
                }
            ]
        },
        {
            id: 'design-ecommerce',
            title: 'Design E-commerce Platform (like Amazon)',
            duration: '60 min',
            content: `
                <h2>Problem Statement</h2>
                <p>Design an e-commerce platform like Amazon that handles product catalog, search, cart, checkout, and order management at massive scale.</p>

                <h3>Key Features</h3>
                <ul>
                    <li>Product catalog with millions of items</li>
                    <li>Search with filters and relevance ranking</li>
                    <li>Shopping cart (persistent across sessions)</li>
                    <li>Checkout with inventory management</li>
                    <li>Order tracking and fulfillment</li>
                </ul>

                <h2>Scale Estimation</h2>
                <div class="code-block">Amazon Scale:
- 300M+ active customers
- 12M+ products (Amazon only, 350M+ with marketplace)
- Peak: 100K orders/minute (Prime Day)
- 66% of shoppers start on Amazon

Traffic patterns:
- Black Friday/Cyber Monday: 10x normal
- Prime Day: 15x normal
- Must handle extreme spikes</div>

                <h2>System Architecture</h2>
                <div class="code-block">Microservices Architecture:

┌─────────────────────────────────────────────────────────┐
│                     API Gateway                          │
└────────────────────────┬────────────────────────────────┘
                         │
    ┌────────────────────┼────────────────────┐
    │                    │                    │
    ▼                    ▼                    ▼
┌────────┐         ┌──────────┐        ┌──────────┐
│Product │         │  Search  │        │  Cart    │
│Service │         │ Service  │        │ Service  │
└───┬────┘         └────┬─────┘        └────┬─────┘
    │                   │                   │
    ▼                   ▼                   ▼
┌────────┐         ┌──────────┐        ┌──────────┐
│MongoDB │         │Elastic-  │        │  Redis   │
│        │         │search    │        │          │
└────────┘         └──────────┘        └──────────┘

    ┌────────────────────┼────────────────────┐
    │                    │                    │
    ▼                    ▼                    ▼
┌────────┐         ┌──────────┐        ┌──────────┐
│Order   │         │ Payment  │        │Inventory │
│Service │         │ Service  │        │ Service  │
└───┬────┘         └────┬─────┘        └────┬─────┘
    │                   │                   │
    ▼                   ▼                   ▼
┌────────┐         ┌──────────┐        ┌──────────┐
│Postgres│         │  Stripe  │        │  Redis+  │
│        │         │          │        │  Postgres│
└────────┘         └──────────┘        └──────────┘</div>

                <h3>Product Catalog</h3>
                <div class="code-block">Schema (MongoDB for flexibility):
{
  _id: "PROD123",
  name: "Wireless Headphones",
  brand: "Sony",
  category: ["Electronics", "Audio"],
  price: 299.99,
  attributes: {
    color: "Black",
    wireless: true,
    battery_life: "30 hours"
  },
  images: ["url1", "url2"],
  seller_id: "SELLER456",
  inventory_count: 150,
  rating: 4.5,
  review_count: 2340
}

Why MongoDB?
- Flexible schema (different products have different attributes)
- Nested documents (attributes vary by category)
- Good read performance for catalog browsing</div>

                <h3>Search Service</h3>
                <div class="code-block">Elasticsearch for product search:

Features:
- Full-text search with relevance ranking
- Faceted search (filter by brand, price, rating)
- Autocomplete suggestions
- Typo tolerance ("wirless" → "wireless")

Index mapping:
{
  "name": { "type": "text", "analyzer": "english" },
  "brand": { "type": "keyword" },
  "category": { "type": "keyword" },
  "price": { "type": "float" },
  "rating": { "type": "float" }
}

Query example:
{
  "query": {
    "bool": {
      "must": { "match": { "name": "wireless headphones" } },
      "filter": [
        { "range": { "price": { "lte": 300 } } },
        { "term": { "brand": "Sony" } }
      ]
    }
  },
  "aggs": {
    "brands": { "terms": { "field": "brand" } }
  }
}</div>

                <h3>Shopping Cart</h3>
                <div class="code-block">Cart storage options:

Option 1: Redis (for logged-in users)
Key: cart:{user_id}
Value: Hash of product_id → quantity
TTL: 7 days

Option 2: Local storage (anonymous users)
Store in browser, sync on login

Cart merge on login:
1. User browses anonymously (cart in localStorage)
2. User logs in
3. Merge localStorage cart with server cart
4. Resolve conflicts (take max quantity)

Redis structure:
HSET cart:user123 prod456 2
HSET cart:user123 prod789 1
EXPIRE cart:user123 604800  # 7 days</div>

                <h3>Checkout & Inventory</h3>
                <div class="code-block">The hardest problem: Preventing overselling

Naive approach:
1. Check inventory: 5 items available
2. User orders 3 items
3. Decrement inventory: 5 - 3 = 2
Problem: Race condition! Two users can see 5, both order 3

Solution: Optimistic locking with version

UPDATE inventory
SET quantity = quantity - 3, version = version + 1
WHERE product_id = 'X' AND quantity >= 3 AND version = 5

If 0 rows updated → conflict, retry or fail

Better solution: Reserve then commit
1. Reserve inventory (soft lock)
2. Process payment
3. If payment succeeds → commit reservation
4. If payment fails → release reservation
5. Reservations expire after 10 minutes</div>

                <h2>Handling Flash Sales</h2>
                <div class="code-block">Problem: 1M users want 1000 items

Solution: Distributed rate limiting + queue

1. Pre-compute tokens (1000 tokens for 1000 items)
2. User clicks "Buy" → try to acquire token
3. Token acquired → enter checkout queue
4. No token → "Sold out" immediately

Token service (Redis):
DECR flash_sale:item123:tokens
If result >= 0: Got token!
If result < 0: Sold out (INCR to restore)

Queue processing:
- Kafka queue for checkout requests
- Process in order, 1000 at a time
- Confirm or release tokens</div>

                <h2>Summary</h2>
                <p>E-commerce at scale requires: microservices for independent scaling, Elasticsearch for product search, Redis for carts and inventory caching, optimistic locking or reservation system for inventory, and special handling for flash sales. Amazon's two-pizza teams own individual services end-to-end.</p>
            `,
            interviews: [
                {
                    question: "How do you prevent overselling during high-traffic sales?",
                    answer: "Use reservation pattern: 1) Reserve inventory (soft lock) before checkout, 2) Process payment, 3) Commit or release reservation. For flash sales: pre-compute tokens equal to inventory, users acquire tokens atomically (Redis DECR), no token = sold out. Queue checkout requests in Kafka, process in order. Reservations auto-expire if not completed."
                },
                {
                    question: "How would you design product search for millions of items?",
                    answer: "Use Elasticsearch: 1) Index products with full-text fields (name, description) and keyword fields (brand, category), 2) Relevance ranking based on text match + popularity + recency, 3) Faceted search with aggregations for filters, 4) Autocomplete with edge-ngram tokenizer, 5) Sync from MongoDB using change streams or Kafka."
                },
                {
                    question: "How do you handle shopping cart for anonymous vs logged-in users?",
                    answer: "Anonymous: Store cart in browser localStorage. Logged-in: Store in Redis with user_id key. On login: Merge both carts (take max quantity for conflicts). Redis cart has TTL (7-30 days). Guest checkout: Keep in localStorage until order placed, then create account with email."
                }
            ]
        },
        {
            id: 'design-chat-app',
            title: 'Design Chat Application (like WhatsApp/Slack)',
            duration: '60 min',
            content: `
                <h2>Problem Statement</h2>
                <p>Design a real-time messaging application like WhatsApp, Slack, or Discord. Support 1:1 chats, group chats, and real-time message delivery.</p>

                <h3>Requirements</h3>
                <ul>
                    <li>Real-time messaging (low latency)</li>
                    <li>1:1 and group conversations</li>
                    <li>Message persistence and history</li>
                    <li>Online/offline status</li>
                    <li>Read receipts</li>
                    <li>Push notifications for offline users</li>
                </ul>

                <h2>Scale Estimation</h2>
                <div class="code-block">WhatsApp Scale:
- 2B+ users
- 100B+ messages/day
- 1M+ messages/second at peak

Connection requirements:
- Each active user maintains persistent connection
- 500M concurrent connections at peak
- Each connection = memory on server</div>

                <h2>Core Architecture Decision: Push vs Pull</h2>
                <div class="code-block">Pull model: Client polls server periodically
- Simple but wasteful
- High latency (wait for next poll)
- Many empty requests

Push model: Server pushes to client immediately
- Real-time delivery
- Requires persistent connections
- More complex infrastructure

Chat apps use PUSH with WebSockets or long-polling</div>

                <h2>System Architecture</h2>
                <div class="code-block">
┌────────────────────────────────────────────────────────────────┐
│                        Load Balancer                            │
└────────────────────────────┬───────────────────────────────────┘
                             │
                             ▼
┌────────────────────────────────────────────────────────────────┐
│                   WebSocket Gateway                             │
│    ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│    │ Server 1 │  │ Server 2 │  │ Server 3 │  │ Server N │     │
│    │ 100K conn│  │ 100K conn│  │ 100K conn│  │ 100K conn│     │
│    └──────────┘  └──────────┘  └──────────┘  └──────────┘     │
└────────────────────────────┬───────────────────────────────────┘
                             │
           ┌─────────────────┼─────────────────┐
           │                 │                 │
           ▼                 ▼                 ▼
    ┌────────────┐   ┌────────────┐   ┌────────────┐
    │  Message   │   │ Presence   │   │   Push     │
    │  Service   │   │  Service   │   │ Notifier   │
    └─────┬──────┘   └─────┬──────┘   └────────────┘
          │                │
          ▼                ▼
    ┌────────────┐   ┌────────────┐
    │ Cassandra  │   │   Redis    │
    │ (messages) │   │ (presence) │
    └────────────┘   └────────────┘
</div>

                <h3>WebSocket Connection Management</h3>
                <div class="code-block">Challenge: User A on Server 1 messages User B on Server 3

Solutions:

1. Connection Registry (Redis)
   Key: user:{user_id}:connection
   Value: server_id (which server has their connection)

   Send message flow:
   a. User A sends message to User B
   b. Look up User B's server in Redis
   c. Route message to that server
   d. Server pushes to User B's WebSocket

2. Pub/Sub (Redis or Kafka)
   Each server subscribes to channels for its users

   Send message flow:
   a. User A sends message to User B
   b. Publish to channel "user:B:messages"
   c. User B's server receives from subscription
   d. Server pushes to User B's WebSocket</div>

                <h3>Message Storage</h3>
                <div class="code-block">Cassandra schema (optimized for chat):

messages_by_conversation:
  conversation_id (partition key)
  message_id (clustering key, TimeUUID, DESC)
  sender_id
  content
  created_at
  status (sent/delivered/read)

Query pattern: "Get last 50 messages in conversation X"
SELECT * FROM messages_by_conversation
WHERE conversation_id = 'conv123'
LIMIT 50;

Why Cassandra?
- Write-heavy (100B+ messages/day)
- Time-series pattern (messages ordered by time)
- Easy horizontal scaling
- No complex joins needed</div>

                <h3>Group Chat Optimization</h3>
                <div class="code-block">Problem: Group with 1000 members
Naive: Send message to 1000 WebSocket connections
Issue: High fan-out, slow delivery

Solution: Tiered delivery

1. Write message to Cassandra (single write)
2. Notify online members immediately (WebSocket)
3. Offline members get push notification
4. When offline user opens app, fetch from Cassandra

Group membership cached in Redis:
Key: group:{group_id}:members
Value: Set of user_ids

For very large groups (10K+ members):
- Don't push to all
- Users poll/pull on app open
- Only push to "active" members (messaged recently)</div>

                <h3>Read Receipts & Presence</h3>
                <div class="code-block">Presence (online/offline/typing):

Redis with TTL:
SETEX presence:user123 30 "online"
# Expires in 30 seconds

Client sends heartbeat every 20 seconds
If no heartbeat → user offline (key expires)

Typing indicator:
SETEX typing:conv456:user123 3 "1"
# Expires in 3 seconds, no typing

Read receipts:
1. User B reads message from User A
2. Update message status in Cassandra
3. Send receipt to User A via WebSocket

Optimization: Batch read receipts
Don't send individual receipts
Send "read up to message X" periodically</div>

                <h2>WhatsApp's Architecture</h2>
                <div class="code-block">WhatsApp handles 100B messages/day with ~50 engineers

Key decisions:
1. Erlang: Built on Erlang/BEAM VM
   - 2M connections per server (vs 100K typical)
   - Lightweight processes, excellent concurrency

2. Mnesia: Erlang's distributed database
   - In-memory with disk backup
   - Used for routing tables, presence

3. SQLite: On-device storage
   - Messages stored on phone
   - Server only relays, doesn't store long-term
   - End-to-end encryption means server CAN'T read

4. XMPP-based protocol
   - Modified for mobile efficiency
   - Binary protocol (smaller than JSON)</div>

                <h2>Summary</h2>
                <p>Chat systems require: persistent WebSocket connections for real-time delivery, connection registry or pub/sub for cross-server routing, Cassandra for write-heavy message storage, Redis for presence and ephemeral state. WhatsApp's efficiency comes from Erlang's lightweight processes and on-device storage (server is just a relay).</p>
            `,
            interviews: [
                {
                    question: "How do you deliver messages when sender and recipient are on different servers?",
                    answer: "Two approaches: 1) Connection registry in Redis - look up recipient's server, route message there directly, 2) Pub/Sub - each server subscribes to channels for its users, publish message to recipient's channel, their server receives and pushes via WebSocket. Pub/Sub scales better as it decouples servers."
                },
                {
                    question: "How would you handle a group chat with 10,000 members?",
                    answer: "Don't fan-out to all members. Strategy: 1) Write message once to Cassandra, 2) Only push to 'active' members (recently messaged), 3) Others see on app open (pull), 4) Send push notifications only to high-engagement members, 5) Track 'last seen' per user, only real-time push if recently active."
                },
                {
                    question: "How does WhatsApp handle 2B users with 50 engineers?",
                    answer: "Key efficiency: 1) Erlang/BEAM handles 2M connections per server (vs 100K typical) due to lightweight processes, 2) Messages stored on-device (SQLite), server just relays - no long-term storage cost, 3) End-to-end encryption means server can't read messages anyway, 4) Simple architecture - relay server, not complex application logic."
                }
            ]
        },
        {
            id: 'design-search-engine',
            title: 'Design Search Engine (like Google)',
            duration: '60 min',
            content: `
                <h2>Problem Statement</h2>
                <p>Design a web search engine that crawls the internet, indexes pages, and returns relevant results for user queries.</p>

                <h3>Core Components</h3>
                <ul>
                    <li>Web Crawler: Discover and fetch web pages</li>
                    <li>Indexer: Process and store page content</li>
                    <li>Query Processor: Search and rank results</li>
                    <li>Ranking Algorithm: Determine relevance</li>
                </ul>

                <h2>Scale of the Web</h2>
                <div class="code-block">Google's scale:
- 130 trillion pages indexed
- 8.5 billion searches/day
- ~100,000 searches/second
- Index size: Multiple petabytes
- Crawls billions of pages daily</div>

                <h2>Web Crawler Design</h2>
                <div class="code-block">Crawler Architecture:

┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  URL        │────▶│  Fetcher    │────▶│  Parser     │
│  Frontier   │     │  (HTTP)     │     │  (HTML)     │
└─────────────┘     └─────────────┘     └──────┬──────┘
      ▲                                        │
      │            ┌─────────────┐            │
      └────────────│  URL        │◀───────────┘
                   │  Extractor  │  (new URLs)
                   └─────────────┘

URL Frontier:
- Priority queue of URLs to crawl
- Politeness: Don't hammer same domain
- Freshness: Re-crawl important pages frequently
- Deduplication: Don't crawl same URL twice

Politeness constraints:
- robots.txt respect
- Crawl delay per domain (1-10 seconds)
- Separate queues per domain</div>

                <h3>Distributed Crawling</h3>
                <div class="code-block">Scale to billions of pages:

Partition by domain:
- Crawler 1: *.com domains A-M
- Crawler 2: *.com domains N-Z
- Crawler 3: *.org domains
- etc.

Consistent hashing:
- hash(domain) → crawler assignment
- Add/remove crawlers smoothly

Crawl rate:
- 1000 pages/second per crawler
- 1000 crawlers = 1M pages/second
- 86B pages/day

Store raw pages in distributed storage:
- HDFS or Google Colossus
- Compress (gzip): 10x reduction
- Version history for changes</div>

                <h2>Inverted Index</h2>
                <div class="code-block">The core data structure for search:

Forward index (document → words):
Doc1: [the, quick, brown, fox]
Doc2: [the, lazy, dog]
Doc3: [quick, fox, jumps]

Inverted index (word → documents):
the    → [Doc1, Doc2]
quick  → [Doc1, Doc3]
brown  → [Doc1]
fox    → [Doc1, Doc3]
lazy   → [Doc2]
dog    → [Doc2]
jumps  → [Doc3]

Search "quick fox":
- Look up "quick": [Doc1, Doc3]
- Look up "fox": [Doc1, Doc3]
- Intersect: [Doc1, Doc3]
- Return Doc1, Doc3

With positions (for phrase search):
quick → [Doc1:pos2, Doc3:pos1]
fox   → [Doc1:pos4, Doc3:pos2]
"quick fox" → Doc3 (positions adjacent)</div>

                <h3>Index Storage</h3>
                <div class="code-block">Challenge: 130 trillion pages, billions of terms

Sharding strategies:

1. Document-based sharding:
   - Shard by doc_id hash
   - Each shard has full inverted index for its docs
   - Query goes to ALL shards, merge results

2. Term-based sharding:
   - Shard by term hash
   - Each shard has posting lists for its terms
   - Query for "quick fox" → 2 shards
   - Better for single-term queries

Google uses document-based:
- Better for multi-term queries
- Each shard is self-contained
- Can return partial results if shards fail

Index format:
Term → [DocID:TF:Positions, ...]
Compressed with variable-byte encoding
Posting lists sorted by relevance (PageRank)</div>

                <h2>Ranking Algorithm</h2>
                <div class="code-block">Two main components:

1. Content relevance (TF-IDF):
   TF (Term Frequency): How often term appears in doc
   IDF (Inverse Doc Freq): How rare is term across all docs

   TF-IDF = TF * log(N / DF)

   "the" appears everywhere → low IDF → low score
   "cryptocurrency" is rare → high IDF → high score

2. PageRank (link analysis):
   Pages with more incoming links rank higher
   Links from important pages count more

   PageRank(A) = (1-d) + d * Σ(PageRank(B) / OutLinks(B))

   Where B = pages linking to A
   d = damping factor (0.85)

Combined score:
FinalScore = α * Relevance + β * PageRank + γ * Freshness + ...</div>

                <h3>Query Processing</h3>
                <div class="code-block">Query flow:

1. Query parsing:
   "best pizza NYC" →
   - Tokenize: [best, pizza, NYC]
   - Normalize: [best, pizza, nyc]
   - Expand: [best, pizza, new york city, nyc]

2. Index lookup:
   - Fetch posting lists for each term
   - Intersect for AND queries
   - Union for OR queries

3. Scoring:
   - Calculate relevance score per document
   - Apply PageRank boost
   - Apply freshness boost for news queries
   - Personalization factors

4. Return top K results:
   - Usually K = 10 for first page
   - Include snippets (matching text excerpts)

Latency target: <200ms for entire flow</div>

                <h2>Google's Architecture</h2>
                <div class="code-block">Google Search infrastructure:

1. Bigtable: Stores crawled pages
2. MapReduce/Spanner: Index building
3. GFS/Colossus: Distributed storage
4. Borg: Container orchestration

Index tiers:
- Tier 1: Most important pages (in memory)
- Tier 2: Important pages (SSD)
- Tier 3: Long tail (disk)

Query routing:
- Try Tier 1 first
- If not enough results, expand to Tier 2
- Rarely need Tier 3

Caching:
- Cache popular queries (20% of queries are repeated)
- Cache posting lists for common terms
- Significant latency reduction</div>

                <h2>Summary</h2>
                <p>Search engines have three main components: crawler (fetch pages), indexer (build inverted index), query processor (search and rank). Key data structure is inverted index mapping terms to documents. Ranking combines content relevance (TF-IDF) with link analysis (PageRank). Scale requires distributed crawling, sharded indexes, and tiered storage.</p>
            `,
            interviews: [
                {
                    question: "Explain the inverted index and why it's used for search.",
                    answer: "Inverted index maps terms to documents containing them: 'apple' → [doc1, doc5, doc99]. Enables O(1) lookup of which documents contain a term. For multi-term queries, intersect posting lists. Without it, you'd scan all documents for each query - O(n) vs O(k) where k is posting list length. Also stores positions for phrase queries."
                },
                {
                    question: "How does PageRank work?",
                    answer: "PageRank scores pages by incoming links. More links = higher rank. Links from high-ranked pages count more. Formula: PR(A) = (1-d) + d * sum(PR(B)/outlinks(B)) where B links to A. Intuition: Random web surfer probability of landing on page. Damping factor (0.85) handles dead ends. Computed iteratively until convergence."
                },
                {
                    question: "How would you design a web crawler to handle billions of pages?",
                    answer: "Distribute by domain hash - each crawler handles subset of domains. Use URL frontier with priority queue (important pages first) and politeness queue (per-domain rate limits). Respect robots.txt. Dedup URLs with Bloom filter. Store pages in distributed storage (HDFS). Re-crawl frequency based on page change rate. Handle failures with retry queue."
                }
            ]
        },
        {
            id: 'design-file-storage',
            title: 'Design Distributed File Storage (like Dropbox/Google Drive)',
            duration: '60 min',
            content: `
                <h2>Problem Statement</h2>
                <p>Design a cloud file storage service like Dropbox, Google Drive, or iCloud that syncs files across devices with offline support and collaboration features.</p>

                <h3>Requirements</h3>
                <ul>
                    <li>Upload/download files from any device</li>
                    <li>Sync changes across all devices</li>
                    <li>Offline access and sync when back online</li>
                    <li>File versioning and history</li>
                    <li>Sharing and collaboration</li>
                </ul>

                <h2>Scale Estimation</h2>
                <div class="code-block">Dropbox Scale:
- 700M+ registered users
- 15M+ paying customers
- 1.2+ billion files uploaded daily
- Exabytes of storage

Key insight: Most files are never accessed
- 80% of files have 0 downloads after upload
- Focus optimization on upload/sync, not retrieval</div>

                <h2>System Architecture</h2>
                <div class="code-block">
┌─────────────────────────────────────────────────────────────────┐
│                        Client (Desktop/Mobile)                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │ File Watcher│  │Chunker/Sync │  │ Local Cache │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                         API Gateway                              │
└────────────────────────────┬────────────────────────────────────┘
                             │
         ┌───────────────────┼───────────────────┐
         │                   │                   │
         ▼                   ▼                   ▼
  ┌────────────┐     ┌────────────┐     ┌────────────┐
  │  Metadata  │     │   Block    │     │   Sync     │
  │  Service   │     │  Service   │     │  Service   │
  └─────┬──────┘     └─────┬──────┘     └─────┬──────┘
        │                  │                  │
        ▼                  ▼                  ▼
  ┌────────────┐     ┌────────────┐     ┌────────────┐
  │  Postgres  │     │    S3 /    │     │  Kafka /   │
  │            │     │   Block    │     │  Redis     │
  └────────────┘     │   Store    │     └────────────┘
                     └────────────┘
</div>

                <h3>File Chunking</h3>
                <div class="code-block">Why chunk files?

1. Efficient sync: Only upload changed chunks
   File: 100MB, edit 1 byte
   Without chunking: Re-upload 100MB
   With chunking: Re-upload 4MB chunk

2. Deduplication: Same chunks across users
   1000 users upload same PDF
   Store once, reference 1000 times
   Dropbox saves 40%+ storage this way

3. Parallel upload/download:
   Large file split into chunks
   Upload 4 chunks simultaneously
   4x faster than sequential

Chunking algorithm:
Option 1: Fixed-size (4MB chunks)
  Simple but insertion shifts all chunks

Option 2: Content-defined chunking (CDC)
  Rolling hash (Rabin fingerprint)
  Chunk boundaries based on content
  Insertion only affects nearby chunks
  Dropbox uses this!</div>

                <h3>Sync Protocol</h3>
                <div class="code-block">File change sync flow:

1. Client detects file change (file watcher)
2. Chunk the file (CDC algorithm)
3. Hash each chunk (SHA-256)
4. Compare hashes with server
5. Upload only new/changed chunks
6. Update metadata (file → chunk mappings)
7. Notify other clients via sync service

Metadata structure:
{
  file_id: "abc123",
  user_id: "user456",
  path: "/Documents/report.pdf",
  size: 15728640,
  version: 7,
  chunks: [
    { hash: "a1b2c3...", size: 4194304, index: 0 },
    { hash: "d4e5f6...", size: 4194304, index: 1 },
    { hash: "g7h8i9...", size: 4194304, index: 2 },
    { hash: "j0k1l2...", size: 3145728, index: 3 }
  ],
  modified_at: "2024-01-15T10:30:00Z"
}</div>

                <h3>Deduplication</h3>
                <div class="code-block">Global deduplication across all users:

Upload flow:
1. Client computes chunk hash locally
2. Asks server: "Do you have chunk abc123?"
3. If YES: Skip upload, just reference
4. If NO: Upload chunk

Block storage:
┌─────────────────────────────────────────────┐
│  Chunk Hash (SHA-256)  │  Chunk Data        │
├─────────────────────────────────────────────┤
│  a1b2c3d4e5f6...       │  [4MB binary data] │
│  f7g8h9i0j1k2...       │  [4MB binary data] │
└─────────────────────────────────────────────┘

Reference counting:
- Track how many files reference each chunk
- When count = 0, garbage collect

Security concern: "Confirmation attack"
- Attacker uploads known file
- Dedup = victim has file
- Solution: Per-user encryption keys</div>

                <h3>Conflict Resolution</h3>
                <div class="code-block">Scenario: Same file edited on two offline devices

Device A: Edit paragraph 1
Device B: Edit paragraph 2
Both come online

Options:

1. Last-write-wins
   Simpler, may lose changes

2. Create conflict copies
   "report.pdf" and "report (conflicted copy).pdf"
   User manually merges
   Dropbox does this!

3. Operational transformation (for real-time collab)
   Track individual operations
   Transform and merge automatically
   Google Docs uses this

Vector clocks for versioning:
{
  version_vector: {
    device_A: 5,
    device_B: 3
  }
}
Concurrent edits detected when neither dominates</div>

                <h2>Dropbox Architecture</h2>
                <div class="code-block">Dropbox's evolution:

2007-2015: AWS
- S3 for block storage
- EC2 for services
- Expensive at scale

2015-2017: Magic Pocket (own infrastructure)
- Custom block storage system
- Exabyte-scale
- 90% cost reduction vs S3

Key components:
1. Blockserver: Stores encrypted chunks
2. Metaserver: File metadata, sync
3. Notification server: Change broadcasts (long-poll)

Sync protocol:
- Client maintains local SQLite database
- Server journal of all changes
- Client polls for changes since last cursor
- Delta sync: Only changed chunks</div>

                <h2>Summary</h2>
                <p>Distributed file storage relies on: chunking (content-defined for efficiency), deduplication (same chunks stored once), sync protocol (track changes, sync deltas), conflict resolution (conflict copies or OT). Dropbox's Magic Pocket shows that at scale, building custom storage beats cloud providers on cost.</p>
            `,
            interviews: [
                {
                    question: "How does Dropbox sync only changed parts of a file?",
                    answer: "Content-defined chunking (CDC): Use rolling hash to split file into chunks at content-dependent boundaries. When file changes, only nearby chunks affected. Hash each chunk (SHA-256), compare with server. Upload only chunks with new hashes. Server stores chunk → file mappings. Result: Edit 1 byte in 100MB file → upload only ~4MB chunk."
                },
                {
                    question: "Explain deduplication in cloud storage.",
                    answer: "Store each unique chunk once, reference from multiple files/users. Flow: Client hashes chunk locally, asks server 'do you have this?', if yes skip upload and add reference, if no upload. Reference counting tracks chunk usage, garbage collect when count=0. Dropbox saves 40%+ storage. Security concern: per-user encryption prevents confirmation attacks."
                },
                {
                    question: "How would you handle conflicts when same file edited offline on two devices?",
                    answer: "Options: 1) Last-write-wins (simple, lossy), 2) Create conflict copies (Dropbox approach - 'file (conflicted copy).pdf'), 3) Operational transformation for real-time merge (Google Docs). Detect conflicts using vector clocks - concurrent edits when neither version dominates. Most file sync services use conflict copies for simplicity."
                }
            ]
        }
    ]
};

// Export for use in courses.js
if (typeof window !== 'undefined') {
    window.module11RealDesigns = module11RealDesigns;
}
