// All course data - separated from logic for easy maintenance
const courses = {
    'system-design': {
        title: 'System Design Fundamentals',
        duration: '24 weeks',
        level: 'Intermediate',
        modules: [
            // Module 0 content loaded from modules/module0-prerequisites.js
            (typeof module0Prerequisites !== 'undefined' ? module0Prerequisites : {
                title: 'Module 0: System Design Foundations',
                lessons: [
                    { id: 'system-design-interview-framework', title: 'System Design Interview Framework', duration: '45 min', content: '<p>Loading...</p>', interviews: [] },
                    { id: 'back-of-envelope-estimation', title: 'Back-of-Envelope Estimation', duration: '40 min', content: '<p>Loading...</p>', interviews: [] },
                    { id: 'advanced-data-structures', title: 'Advanced Data Structures', duration: '55 min', content: '<p>Loading...</p>', interviews: [] }
                ]
            }),
            {
                title: 'Module 1: Core Foundations',
                lessons: [
                    {
                        id: 'scalability-101',
                        title: 'Scalability 101',
                        duration: '45 min',
                        content: `
                            <h2>What is Scalability?</h2>
                            <p>Scalability is one of the fundamental concepts in system design. It refers to the ability of a system to handle increasing amounts of work in a capable manner. More formally, it's the ability to expand your system's capacity to handle more users, more requests, and more data without the system falling apart or requiring fundamental redesigns.</p>

                            <p>Think of it this way: imagine you have a restaurant that can serve 50 customers per day. Now, your restaurant becomes very popular and you need to serve 500 customers per day. How do you handle this? Do you move to a bigger location? Do you hire more staff and open multiple locations? Do you optimize your kitchen to serve more people faster? These are all scalability decisions.</p>

                            <h3>Why is Scalability Important?</h3>
                            <p>When you build a software system, you rarely know exactly how many users you'll have. Your first version might handle 100 users fine. But what happens when you have 10,000 users? Or 1 million? If your system wasn't designed with scalability in mind, it might collapse under the load, resulting in:</p>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li>Slow response times (latency increases)</li>
                                <li>Failed requests (timeouts, errors)</li>
                                <li>Complete system downtime</li>
                                <li>Loss of users and revenue</li>
                            </ul>
                            <p>By planning for scalability from the beginning, you can grow your system smoothly as demand increases.</p>

                            <h2>Two Approaches to Scaling</h2>

                            <h3>1. Vertical Scaling (Scaling Up)</h3>
                            <p>Vertical scaling means adding more resources (CPU, RAM, storage) to your existing machines. It's like upgrading your car from a 4-cylinder engine to an 8-cylinder engine.</p>

                            <div class="code-block">Year 1: Your server
- CPU: 4 cores
- RAM: 16 GB
- Storage: 500 GB

Year 2 (with vertical scaling): Same server, but upgraded
- CPU: 32 cores
- RAM: 256 GB
- Storage: 2 TB</div>

                            <h4>Advantages of Vertical Scaling:</h4>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li><strong>Simple:</strong> You don't need to rewrite your code or change your architecture</li>
                                <li><strong>No distributed system complexity:</strong> Everything is on one machine, so no need to worry about network communication between servers</li>
                                <li><strong>Easy to implement:</strong> Just buy a bigger server and move your application to it</li>
                            </ul>

                            <h4>Disadvantages of Vertical Scaling:</h4>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li><strong>Hardware limit:</strong> You can't infinitely upgrade a single machine. The biggest server you can buy will eventually run out</li>
                                <li><strong>Single point of failure:</strong> If your one server goes down, your entire system is offline. No redundancy</li>
                                <li><strong>Cost:</strong> Really powerful servers are exponentially more expensive than medium servers. You're paying premium prices for that extra power</li>
                                <li><strong>Downtime:</strong> When you upgrade, you usually need to shut down the server, causing downtime</li>
                            </ul>

                            <p><strong>Real Example:</strong> Imagine you're running a database on a server. When you hit your server's RAM limit, you can't upgrade anymore without changing your entire system architecture. You might need to switch to distributed databases, which is a major change.</p>

                            <h3>2. Horizontal Scaling (Scaling Out)</h3>
                            <p>Horizontal scaling means adding more machines to your system and distributing the load among them. Instead of one powerful server, you have many medium servers working together.</p>

                            <div class="code-block">Year 1: Single server
[Server 1: Handles all requests]

Year 2 (with horizontal scaling): Multiple servers
[Load Balancer]
       ↓
[Server 1] [Server 2] [Server 3] [Server 4]
Each handles 1/4 of the requests</div>

                            <h4>Advantages of Horizontal Scaling:</h4>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li><strong>Virtually unlimited:</strong> Need to handle more traffic? Just add another server. You can keep adding servers as long as you need</li>
                                <li><strong>Fault tolerance:</strong> If one server fails, the others keep working. Your system stays online</li>
                                <li><strong>Better resource utilization:</strong> You can use many cheaper servers instead of one expensive one</li>
                                <li><strong>Geographic distribution:</strong> You can place servers in different locations to reduce latency for users</li>
                            </ul>

                            <h4>Disadvantages of Horizontal Scaling:</h4>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li><strong>Complexity:</strong> You now need to manage multiple servers. Code must be stateless, sessions must be shared, databases must be synced</li>
                                <li><strong>Network overhead:</strong> Servers need to communicate with each other and with a load balancer, adding latency</li>
                                <li><strong>Consistency challenges:</strong> Keeping data consistent across multiple servers is hard. You might get stale data in one server while another has fresh data</li>
                                <li><strong>Operational complexity:</strong> More servers means more things can go wrong. You need monitoring, logging, alerting for each server</li>
                            </ul>

                            <p><strong>Real Example:</strong> Netflix uses horizontal scaling. They have thousands of servers across the world. When you stream a movie, the request might go to a server near you (in your country or region). If that server goes down, your request automatically goes to another one. This is why Netflix rarely goes down.</p>

                            <h2>Real World Case Study: Instagram's Evolution</h2>

                            <h3>2010: The Beginning</h3>
                            <p>Instagram launched in October 2010 and became incredibly popular. By 2012, they had 100 million users. Here's how they scaled:</p>

                            <h4>Phase 1 (2010-2011): Vertical Scaling</h4>
                            <div class="code-block">Initial setup: ~14 servers
- A few web servers (Apache)
- A few application servers (Python/Django)
- One main database server (PostgreSQL)
- A few cache servers (Redis)</div>
                            <p>As users grew from 100K to 1M, they upgraded their servers. They bought bigger hardware, more RAM for the databases, faster CPUs. This worked for a while because growth was gradual and they could scale up as needed.</p>

                            <h4>Phase 2 (2011-2012): Transition to Horizontal Scaling</h4>
                            <p>Around 10 million users, vertical scaling wasn't enough. They started adding more servers:</p>
                            <div class="code-block">By 2012: ~300+ servers
- Multiple web servers across regions
- Load balancers distributing traffic
- Sharded databases (split data across multiple database servers)
- Cache servers replicated across regions</div>

                            <h3>Key Lessons from Instagram:</h3>
                            <ol style="margin: 1rem 0; margin-left: 2rem;">
                                <li><strong>Start simple:</strong> They didn't build a complex distributed system on day one. They started with vertical scaling, which is simpler</li>
                                <li><strong>Scale when needed:</strong> As they hit the limits of a single server, they gradually moved to horizontal scaling</li>
                                <li><strong>Different parts scale differently:</strong> Web servers were easily scaled horizontally. Databases were harder and required database sharding (splitting data across servers)</li>
                                <li><strong>Premature optimization is bad:</strong> If they had built a globally distributed system from the start with multiple databases, it would have been incredibly complex for their early user base</li>
                            </ol>

                            <h2>How to Choose: Vertical vs Horizontal</h2>
                            <table class="table">
                                <tr>
                                    <th>Factor</th>
                                    <th>Vertical Scaling</th>
                                    <th>Horizontal Scaling</th>
                                </tr>
                                <tr>
                                    <td>Cost</td>
                                    <td>Expensive for high power</td>
                                    <td>Cheaper (many medium servers)</td>
                                </tr>
                                <tr>
                                    <td>Complexity</td>
                                    <td>Simple, no code changes</td>
                                    <td>Complex, requires architecture changes</td>
                                </tr>
                                <tr>
                                    <td>Limit</td>
                                    <td>Hardware limit (~10x)</td>
                                    <td>Virtually unlimited</td>
                                </tr>
                                <tr>
                                    <td>Fault Tolerance</td>
                                    <td>Single point of failure</td>
                                    <td>Can survive server failures</td>
                                </tr>
                                <tr>
                                    <td>Geographic Distribution</td>
                                    <td>One location only</td>
                                    <td>Can be distributed globally</td>
                                </tr>
                                <tr>
                                    <td>Implementation Time</td>
                                    <td>Quick</td>
                                    <td>Takes time to implement</td>
                                </tr>
                            </table>

                            <h2>Summary</h2>
                            <p>Scalability is about preparing your system for growth. Vertical scaling is simple but has limits. Horizontal scaling is complex but virtually unlimited. Most successful systems start with vertical scaling and gradually move to horizontal scaling as they grow. The key is understanding your growth pattern and choosing the right approach at the right time.</p>
                        `,
                        interviews: [
                            {
                                question: "What's the difference between vertical and horizontal scaling?",
                                answer: "Vertical scaling (scaling up) means adding more resources (CPU, RAM) to existing servers. Horizontal scaling (scaling out) means adding more servers. Vertical is simpler but has hardware limits. Horizontal is more complex but virtually unlimited."
                            },
                            {
                                question: "When would you choose vertical scaling over horizontal?",
                                answer: "Choose vertical scaling when: you have a simple system that doesn't need distribution, you want to avoid operational complexity, cost is not a major concern, and your traffic growth is predictable and manageable. It's good for startups in early stages."
                            },
                            {
                                question: "What are the main challenges of horizontal scaling?",
                                answer: "Main challenges: code must be stateless, session management becomes complex, database consistency is harder to maintain, network communication between servers adds latency, and operational complexity increases with more servers to manage."
                            },
                            {
                                question: "How did Instagram handle scaling from 14 to 300+ servers?",
                                answer: "Instagram started with vertical scaling (upgrading server hardware). As they hit limits around 10M users, they transitioned to horizontal scaling with load balancers, multiple servers, and database sharding. They scaled gradually as needed rather than over-engineering from the start."
                            }
                        ]
                    },
                    {
                        id: 'latency-throughput',
                        title: 'Latency vs Throughput',
                        duration: '50 min',
                        content: `
                            <h2>Two Fundamental Metrics</h2>
                            <p>When designing systems, two metrics come up constantly: latency and throughput. Understanding the difference between them and how to optimize for each is crucial for building systems that feel fast and can handle load.</p>

                            <h2>What is Latency?</h2>
                            <p>Latency is the time it takes for a single request to complete from start to finish. It's the delay you perceive as a user. When you click a button and have to wait 2 seconds for the page to load, that 2 second wait is latency.</p>

                            <div class="code-block">User sends request: 00:00:00.000
Server receives request, processes it, sends response
User receives response: 00:00:00.200

Latency = 200 milliseconds (0.2 seconds)</div>

                            <h3>Why Latency Matters</h3>
                            <p>Latency directly affects user experience. Studies show that:</p>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li>100ms delay in page load time can drop conversions by 1%</li>
                                <li>1 second delay can reduce engagement significantly</li>
                                <li>Every 100ms faster = more user satisfaction</li>
                            </ul>
                            <p>That's why companies spend millions optimizing latency. A 100ms improvement across millions of users adds up to millions of hours saved daily.</p>

                            <h3>What Affects Latency?</h3>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li><strong>Network delay:</strong> Time for data to travel from user to server and back. Can be 10-100ms depending on distance</li>
                                <li><strong>Server processing time:</strong> Time the server spends processing the request. Could be 10-50ms for database queries, computations, etc.</li>
                                <li><strong>Database query time:</strong> If you need to query a database, this can be 5-100ms depending on the query</li>
                                <li><strong>Caching:</strong> If data is cached in memory, it's much faster (1-10ms) than fetching from disk (10-100ms)</li>
                                <li><strong>Geographic location:</strong> Data close to the user has lower latency. Data far away takes longer to reach</li>
                            </ul>

                            <div class="code-block">Latency breakdown for a typical web request:
Network latency (user → server): 30ms
Server processing: 20ms
Database query: 40ms
Server response time: 10ms
Network latency (server → user): 30ms
─────────────────
Total: 130ms</div>

                            <h2>What is Throughput?</h2>
                            <p>Throughput is how many requests your system can handle per unit of time. It's about capacity - how much work can you do simultaneously?</p>

                            <div class="code-block">In one second:
Your server can process 10,000 requests

Throughput = 10,000 QPS (Queries Per Second)
or 10k req/sec
or 36 million requests per hour</div>

                            <h3>Why Throughput Matters</h3>
                            <p>Throughput determines if your system can handle the load of many users. If you have 10,000 users online and your system can only handle 5,000 QPS, half of them will get errors or timeouts.</p>

                            <p>Throughput is especially important during peak times. On Black Friday, an e-commerce site might see 10x normal traffic. If you haven't designed for high throughput, your site will crash.</p>

                            <h3>What Affects Throughput?</h3>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li><strong>Server hardware:</strong> More CPU cores and RAM = can process more requests</li>
                                <li><strong>Number of servers:</strong> More servers = more total throughput</li>
                                <li><strong>Database throughput:</strong> Databases have limits on how many queries they can handle</li>
                                <li><strong>Connection limits:</strong> Your operating system limits concurrent connections (typically 65k per server)</li>
                                <li><strong>Code efficiency:</strong> Inefficient code uses more resources, reducing throughput</li>
                                <li><strong>I/O operations:</strong> Network calls, database queries, disk reads are slow and reduce throughput</li>
                            </ul>

                            <h2>The Relationship Between Latency and Throughput</h2>
                            <p>Latency and throughput are related but not the same. A system can have low latency but low throughput, or high latency with high throughput.</p>

                            <h3>Example 1: Low Latency, Low Throughput</h3>
                            <div class="code-block">System: Single server with 2 cores
- Each request takes 50ms (low latency) ✓
- But can only handle 100 requests/sec (low throughput) ✗

Problem: System is fast for individual requests, but can't handle many requests</div>

                            <h3>Example 2: High Latency, High Throughput</h3>
                            <div class="code-block">System: Batch processing with 100 servers
- Each request takes 5 seconds (high latency) ✗
- But can process 1 million requests/day (high throughput) ✓

Example use case: Nightly data processing. Individual request takes long, but you process huge volume</div>

                            <h3>Example 3: Low Latency, High Throughput (Ideal!)</h3>
                            <div class="code-block">System: Google Search
- Request completes in 50-200ms (low latency) ✓
- Handles billions of searches/day (high throughput) ✓

How? Multiple servers, caching, optimized code</div>

                            <h2>Real World Examples</h2>

                            <h3>Stock Trading System</h3>
                            <p>Latency is critical. A 1 millisecond delay can mean the difference between profit and loss. Throughput matters too, but traders care more about speed.</p>
                            <div class="code-block">Target: 1ms latency, 10k QPS</div>

                            <h3>Batch Data Processing (Spark, Hadoop)</h3>
                            <p>Throughput is critical. You might process millions of records overnight. Latency of 5 seconds per request is fine since you're doing batch processing.</p>
                            <div class="code-block">Target: 100k QPS, latency can be seconds</div>

                            <h3>Web Application (Instagram, Twitter)</h3>
                            <p>Both matter. Users expect responses in 200ms or less, but millions are using simultaneously.</p>
                            <div class="code-block">Target: 200ms latency, 1 million QPS</div>

                            <h2>Netflix's Approach</h2>
                            <p>Netflix optimizes differently for different use cases:</p>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li><strong>User-facing APIs:</strong> Optimized for latency. When you search for a movie or hit play, it should respond in less than 100ms. Uses caching, edge servers, optimized code</li>
                                <li><strong>Batch jobs:</strong> Optimized for throughput. Nightly jobs that analyze user behavior, generate recommendations, etc. These can take hours but process billions of data points</li>
                                <li><strong>Real-time analytics:</strong> Moderate latency but very high throughput. Need to track millions of events per second</li>
                            </ul>

                            <h2>How to Optimize for Each</h2>

                            <h3>To Reduce Latency:</h3>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li>Use caching (Redis, Memcached) to avoid database queries</li>
                                <li>Use CDNs to serve content from locations near users</li>
                                <li>Optimize database queries (indexes, query optimization)</li>
                                <li>Use lightweight protocols (gRPC instead of REST)</li>
                                <li>Keep servers geographically close to users</li>
                                <li>Parallelize operations where possible</li>
                            </ul>

                            <h3>To Increase Throughput:</h3>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li>Add more servers (horizontal scaling)</li>
                                <li>Use connection pooling to reuse connections</li>
                                <li>Batch operations (process multiple items at once)</li>
                                <li>Use message queues to decouple systems</li>
                                <li>Optimize code for efficiency (reduce CPU usage)</li>
                                <li>Use asynchronous I/O (non-blocking operations)</li>
                            </ul>

                            <h2>Summary</h2>
                            <p><strong>Latency</strong> = How fast a single request completes (user experience)</p>
                            <p><strong>Throughput</strong> = How many requests you can handle (capacity)</p>
                            <p>Different systems need different optimization. Understand your use case first, then optimize accordingly. Most systems need both low latency AND high throughput, which is challenging and why system design is hard.</p>
                        `,
                        interviews: [
                            {
                                question: "Define latency and throughput. Why do we care about both?",
                                answer: "Latency = time for one request to complete. Throughput = requests per second. Both matter: low latency for good user experience, high throughput to handle many users. You might have fast individual requests (low latency) but not enough capacity (low throughput), or vice versa."
                            },
                            {
                                question: "What's the latency breakdown for a typical web request?",
                                answer: "Network latency (30ms) + Server processing (20ms) + Database query (40ms) + Response time (10ms) + Network latency back (30ms) = 130ms total. Each component contributes to overall latency."
                            },
                            {
                                question: "How do you optimize for low latency?",
                                answer: "Use caching to avoid database queries, deploy servers geographically close to users, use CDNs for static content, optimize database queries with indexes, use lightweight protocols like gRPC, and parallelize operations where possible."
                            },
                            {
                                question: "How do you optimize for high throughput?",
                                answer: "Add more servers (horizontal scaling), use connection pooling, batch operations, implement message queues for decoupling, optimize code for CPU efficiency, and use asynchronous I/O for non-blocking operations."
                            }
                        ]
                    },
                    {
                        id: 'cap-theorem',
                        title: 'CAP Theorem',
                        duration: '55 min',
                        content: `
                            <h2>Understanding the CAP Theorem</h2>
                            <p>The CAP Theorem is one of the most important concepts in distributed systems. Proposed by Eric Brewer in 2000, it states that in any distributed system, you can have at most 2 out of 3 desirable properties. This is not a limitation of current technology, but a fundamental law of distributed computing.</p>

                            <h2>The Three Properties</h2>

                            <h3>1. Consistency (C)</h3>
                            <p>Consistency means all nodes in the system see the same data at the same time. Every read after a write gets the most recent value written.</p>

                            <div class="code-block">User A writes: account_balance = $100

Immediately after:
- User B reads: gets $100
- User C reads: gets $100
- Everyone sees the same data</div>

                            <h4>Why It Matters</h4>
                            <p>In a bank system, consistency is critical. If user A transfers $100 and the bank shows they still have $100 in one location but $0 in another, that's a disaster. Duplicates and losses of money are unacceptable.</p>

                            <h4>How to Achieve It</h4>
                            <p>To ensure consistency, you typically use:</p>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li><strong>Synchronous replication:</strong> When data is written, wait for all copies to be updated before confirming</li>
                                <li><strong>Distributed transactions:</strong> Use 2-phase commit or similar protocols to ensure all nodes update together</li>
                                <li><strong>Centralized system:</strong> Single server with all data (no distribution, just one point)</li>
                            </ul>

                            <p>The cost? All these methods are slow and reduce availability. You have to wait for all servers to confirm, which takes time and increases failure points.</p>

                            <h3>2. Availability (A)</h3>
                            <p>Availability means the system always responds to requests, even when parts of it fail. Every request to a non-failing node gets a response.</p>

                            <div class="code-block">Database server in London crashes
System is still available to users:
- Users in Tokyo still get responses (from Tokyo servers)
- Users in New York still get responses (from New York servers)
- System is UP even though one server is DOWN</div>

                            <h4>Why It Matters</h4>
                            <p>Uptime is money. If your system is down, users can't use it, you lose money, and users get frustrated. Companies measure availability in nines: 99% (36.5 hours downtime/year), 99.9% (8.7 hours downtime/year), 99.99% (52 minutes downtime/year).</p>

                            <h4>How to Achieve It</h4>
                            <p>To ensure availability, you need:</p>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li><strong>Replication:</strong> Data on multiple servers so if one fails, others serve requests</li>
                                <li><strong>Asynchronous updates:</strong> Don't wait for all servers to confirm updates, just do it fast</li>
                                <li><strong>Graceful degradation:</strong> If some parts fail, keep the system running (maybe with reduced functionality)</li>
                            </ul>

                            <p>The cost? You might have stale data or inconsistencies between servers.</p>

                            <h3>3. Partition Tolerance (P)</h3>
                            <p>Partition tolerance means the system continues to work even if the network is partitioned (split) and nodes can't communicate with each other.</p>

                            <div class="code-block">Network issue: Servers in Europe can't communicate with servers in US

Partition Tolerant System:
- Europe servers work independently
- US servers work independently
- System continues to function

Non-Partition Tolerant System:
- Would shut down completely
- Clients get errors</div>

                            <h4>Why It Matters</h4>
                            <p>Network failures happen. Cables get cut, routers fail, network congestion happens. You can't prevent network partitions, only prepare for them. If you can't tolerate partitions, your system is not suitable for distributed computing.</p>

                            <h4>How to Achieve It</h4>
                            <p>All distributed systems must handle partitions. The only way to not be partition tolerant is to have everything on one server (not distributed). So in practice, the choice is between C and A when a partition occurs.</p>

                            <h2>The Trade-off: You Can Only Pick 2</h2>

                            <h3>CA (Consistency + Availability)</h3>
                            <p><strong>What you sacrifice:</strong> Partition Tolerance</p>
                            <p><strong>Example:</strong> Single-server database with no replication. Fully consistent, always available (until it crashes), but can't tolerate any failure.</p>
                            <div class="code-block">System: PostgreSQL on one server
- User writes $100: stored
- All reads see $100: consistent ✓
- Server is up: available ✓
- Network partition: System DOWN ✗

If the server crashes, everything is gone.</div>

                            <h3>CP (Consistency + Partition Tolerance)</h3>
                            <p><strong>What you sacrifice:</strong> Availability</p>
                            <p><strong>Example:</strong> Traditional relational databases with strong consistency requirements. Stay consistent even during partitions, but might not be available.</p>
                            <div class="code-block">System: MongoDB with Replica Set in Consistency mode
- Network partition between servers
- Some servers can't talk to others
- CP choice: Stop accepting writes until partition heals
- Result: Available for reading but not writing ✓ Consistent ✗ Not fully available

Why? To ensure consistency, don't accept writes that might conflict.</div>

                            <p>Real example: During the 2012 Amazon outage, some databases chose CP. They stopped accepting requests to maintain consistency. Users got "Service Unavailable" errors, but their data was safe.</p>

                            <h3>AP (Availability + Partition Tolerance)</h3>
                            <p><strong>What you sacrifice:</strong> Consistency (eventually consistent)</p>
                            <p><strong>Example:</strong> DynamoDB, Cassandra, most NoSQL databases. Always available and work during partitions, but data might be inconsistent temporarily.</p>
                            <div class="code-block">System: DynamoDB across US and Europe
- Network partition: Europe and US can't talk
- Europe servers: Accept writes, respond to reads
- US servers: Accept writes, respond to reads
- Problem: They're writing different data
- Solution: When partition heals, sync data and resolve conflicts
- Result: Not immediately consistent, but available ✓ Partition tolerant ✓</div>

                            <p>This is called "eventual consistency" - data will eventually be consistent once the partition heals, but during the partition, you might read stale data.</p>

                            <h2>Real World Examples</h2>

                            <h3>Banks (CA)</h3>
                            <p>Banks used to prioritize Consistency and Availability. They would stop all operations during network issues rather than risk giving someone their money twice.</p>
                            <p>Modern banks are moving to AP systems but with better conflict resolution.</p>

                            <h3>Stock Exchanges (CA)</h3>
                            <p>Stock prices must be consistent. If two people see different prices, it's chaos. Exchanges prioritize CA and would rather be down than have inconsistent prices.</p>

                            <h3>Social Media (AP)</h3>
                            <p>Twitter, Facebook, Instagram are AP systems. If you post a tweet, it might take a few seconds to appear in your friend's feed (eventual consistency), but the system is always available. A few seconds of inconsistency is acceptable.</p>

                            <h3>Google Search (AP)</h3>
                            <p>Distributed across the world. When you search, you get results from the nearest data center. Results might be slightly stale but always available. Perfect AP system.</p>

                            <h2>The Modern Perspective</h2>
                            <p>The CAP theorem was published in 2000, and database technology has evolved. The theorem is still true, but how databases handle the trade-off has improved:</p>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li><strong>Tunable Consistency:</strong> Some systems let you choose consistency level per operation</li>
                                <li><strong>Causal Consistency:</strong> Compromise between eventual and strong consistency</li>
                                <li><strong>Better Conflict Resolution:</strong> Automatic conflict resolution during partitions</li>
                            </ul>

                            <h2>How to Choose for Your System</h2>
                            <table class="table">
                                <tr>
                                    <th>Type</th>
                                    <th>Consistency Critical?</th>
                                    <th>Availability Critical?</th>
                                    <th>Choice</th>
                                    <th>Example</th>
                                </tr>
                                <tr>
                                    <td>Financial</td>
                                    <td>Yes</td>
                                    <td>Important</td>
                                    <td>CP or CA</td>
                                    <td>Banking, Insurance</td>
                                </tr>
                                <tr>
                                    <td>Social</td>
                                    <td>Nice to have</td>
                                    <td>Yes</td>
                                    <td>AP</td>
                                    <td>Twitter, Instagram</td>
                                </tr>
                                <tr>
                                    <td>E-commerce</td>
                                    <td>Important</td>
                                    <td>Important</td>
                                    <td>CP with fallback</td>
                                    <td>Amazon</td>
                                </tr>
                            </table>

                            <h2>Summary</h2>
                            <p>CAP Theorem is fundamental to system design. It tells you that you cannot have everything. You must make conscious choices based on your use case. Understanding the implications helps you design systems that are robust and appropriate for their purpose.</p>
                        `,
                        interviews: [
                            {
                                question: "What does CAP Theorem stand for and what does it mean?",
                                answer: "CAP = Consistency, Availability, Partition Tolerance. It means in a distributed system, you can have at most 2 of the 3 properties. You cannot have all three simultaneously. This is a fundamental law, not a technology limitation."
                            },
                            {
                                question: "Define Consistency, Availability, and Partition Tolerance",
                                answer: "Consistency: All nodes see the same data at the same time. Availability: System always responds to requests even when parts fail. Partition Tolerance: System works even when network is split and nodes can't communicate."
                            },
                            {
                                question: "What are the three possible combinations (CA, CP, AP) and their trade-offs?",
                                answer: "CA: Consistent and available but can't tolerate partitions (single server). CP: Consistent and partition-tolerant but sacrifices availability (may be unavailable during partitions). AP: Available and partition-tolerant but sacrifices strong consistency (eventual consistency)."
                            },
                            {
                                question: "Give an example of a CA system, CP system, and AP system",
                                answer: "CA: Single PostgreSQL server. CP: MongoDB with strong consistency. AP: DynamoDB, Cassandra, Twitter. Most modern systems are AP because distributed systems must tolerate partitions by nature."
                            },
                            {
                                question: "Why would a bank choose CA over AP?",
                                answer: "Banks need strong consistency - money cannot be lost or duplicated. They prefer to be unavailable temporarily during network issues rather than show incorrect balances. AP's eventual consistency is unacceptable for financial transactions."
                            }
                        ]
                    },
                    {
                        id: 'availability-reliability',
                        title: 'Availability and Reliability',
                        duration: '45 min',
                        content: `
                            <h2>Understanding System Uptime</h2>
                            <p>Availability and reliability are two critical metrics in system design that determine how trustworthy and dependable your system is. While they're related, they measure different aspects of system health.</p>

                            <h2>What is Availability?</h2>
                            <p>Availability is the percentage of time your system is operational and accessible to users. It's measured as a percentage, often expressed in "nines".</p>

                            <div class="code-block">Availability = (Uptime / Total Time) × 100%

Example:
If your system is down 8.7 hours per year:
Uptime = 8760 - 8.7 = 8751.3 hours
Availability = (8751.3 / 8760) × 100% = 99.9%</div>

                            <h3>The Nines: Industry Standards</h3>
                            <table class="table">
                                <tr>
                                    <th>Availability</th>
                                    <th>Downtime per Year</th>
                                    <th>Downtime per Month</th>
                                    <th>Downtime per Week</th>
                                </tr>
                                <tr>
                                    <td>90% (one nine)</td>
                                    <td>36.5 days</td>
                                    <td>72 hours</td>
                                    <td>16.8 hours</td>
                                </tr>
                                <tr>
                                    <td>99% (two nines)</td>
                                    <td>3.65 days</td>
                                    <td>7.2 hours</td>
                                    <td>1.68 hours</td>
                                </tr>
                                <tr>
                                    <td>99.9% (three nines)</td>
                                    <td>8.7 hours</td>
                                    <td>43.8 minutes</td>
                                    <td>10.1 minutes</td>
                                </tr>
                                <tr>
                                    <td>99.99% (four nines)</td>
                                    <td>52.6 minutes</td>
                                    <td>4.4 minutes</td>
                                    <td>1.0 minutes</td>
                                </tr>
                                <tr>
                                    <td>99.999% (five nines)</td>
                                    <td>5.3 minutes</td>
                                    <td>26 seconds</td>
                                    <td>6 seconds</td>
                                </tr>
                            </table>

                            <h3>Real World Availability Targets</h3>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li><strong>Google Search:</strong> 99.99% (four nines) - Less than 1 hour of downtime per year</li>
                                <li><strong>Amazon AWS:</strong> 99.99% for most services</li>
                                <li><strong>Netflix:</strong> 99.9% (three nines) - About 8 hours of downtime per year</li>
                                <li><strong>Standard web apps:</strong> 99% to 99.9%</li>
                            </ul>

                            <h3>Why Each Nine is Expensive</h3>
                            <p>Going from 99% to 99.9% availability means reducing downtime from 3.65 days to 8.7 hours per year. This requires:</p>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li>Redundant servers in multiple locations</li>
                                <li>Automated failover mechanisms</li>
                                <li>24/7 monitoring and on-call engineers</li>
                                <li>Load balancers and health checks</li>
                                <li>Regular disaster recovery testing</li>
                            </ul>
                            <p>Each additional nine can cost 10x more in infrastructure and operational costs.</p>

                            <h2>What is Reliability?</h2>
                            <p>Reliability is the probability that your system will perform correctly over a specific period. It's about consistency and predictability.</p>

                            <div class="code-block">Reliability = Number of successful operations / Total operations

Example:
If your system processes 1 million requests:
- 999,000 succeed
- 1,000 fail
Reliability = 999,000 / 1,000,000 = 99.9%</div>

                            <h3>Key Difference: Availability vs Reliability</h3>
                            <div class="code-block">Scenario 1: High Availability, Low Reliability
System is always UP (99.99% availability)
But 10% of requests fail due to bugs
Result: Users can reach the system but it doesn't work correctly

Scenario 2: Low Availability, High Reliability
System is down often (95% availability)
When it's up, 100% of requests succeed
Result: Frustrating for users but predictable

Scenario 3: High Availability, High Reliability (Goal!)
System is always UP (99.99% availability)
99.99% of requests succeed
Result: Users can always reach it and it works correctly</div>

                            <h2>Building for High Availability</h2>

                            <h3>1. Redundancy</h3>
                            <p>Have multiple copies of every critical component:</p>
                            <div class="code-block">Single Point of Failure:
[User] → [Load Balancer] → [Server] → [Database]
If any component fails, system is down

With Redundancy:
                        [Server 1]
[User] → [LB 1] →      [Server 2]    → [DB Master]
         [LB 2] →      [Server 3]    → [DB Replica]
                        [Server 4]

If one component fails, others take over</div>

                            <h3>2. Failover Mechanisms</h3>
                            <p>Automatic detection and recovery from failures:</p>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li><strong>Health checks:</strong> Regular pings to verify services are working</li>
                                <li><strong>Automatic failover:</strong> If primary fails, secondary takes over instantly</li>
                                <li><strong>Load balancer detection:</strong> Remove unhealthy servers from rotation</li>
                                <li><strong>Database replication:</strong> Promote replica to master if master fails</li>
                            </ul>

                            <h3>3. Geographic Distribution</h3>
                            <p>Deploy across multiple regions to survive regional outages:</p>
                            <div class="code-block">Multi-Region Setup:
US-East: Servers + Database
US-West: Servers + Database
Europe: Servers + Database

If US-East goes down (datacenter power failure):
- Traffic automatically routes to US-West and Europe
- Users barely notice the outage</div>

                            <h3>4. Graceful Degradation</h3>
                            <p>When parts fail, reduce functionality instead of complete failure:</p>
                            <div class="code-block">Example: E-commerce site during database failure

Full Failure: Site shows error page (bad)

Graceful Degradation:
- Show product pages (cached data)
- Disable shopping cart temporarily
- Display message: "Checkout temporarily unavailable"
- System partially functional instead of completely down</div>

                            <h2>Building for High Reliability</h2>

                            <h3>1. Testing and Quality Assurance</h3>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li><strong>Unit tests:</strong> Test individual components</li>
                                <li><strong>Integration tests:</strong> Test components working together</li>
                                <li><strong>Load tests:</strong> Verify system handles expected traffic</li>
                                <li><strong>Chaos engineering:</strong> Intentionally break things to test recovery (Netflix's Chaos Monkey)</li>
                            </ul>

                            <h3>2. Monitoring and Alerting</h3>
                            <div class="code-block">Key Metrics to Monitor:
- Error rate (% of failed requests)
- Response time (latency)
- Throughput (requests per second)
- Resource utilization (CPU, memory, disk)
- Database query performance

Alert when:
- Error rate > 1%
- Latency > 500ms for 5 minutes
- CPU > 80% for 10 minutes</div>

                            <h3>3. Error Handling and Retries</h3>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li><strong>Retry logic:</strong> Automatically retry failed operations with exponential backoff</li>
                                <li><strong>Circuit breakers:</strong> Stop calling failing services to prevent cascading failures</li>
                                <li><strong>Timeouts:</strong> Don't wait forever for responses</li>
                                <li><strong>Fallbacks:</strong> Have backup plans when primary operations fail</li>
                            </ul>

                            <h3>4. Data Integrity</h3>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li><strong>Backups:</strong> Regular automated backups of all data</li>
                                <li><strong>Replication:</strong> Multiple copies of data across servers</li>
                                <li><strong>Checksums:</strong> Verify data hasn't been corrupted</li>
                                <li><strong>Transaction logs:</strong> Record all changes for recovery</li>
                            </ul>

                            <h2>Real World Case Study: AWS S3</h2>

                            <h3>Target: 99.999999999% (11 nines) Durability</h3>
                            <p>AWS S3 promises that if you store 10 million objects, you might lose 1 object every 10,000 years. How do they achieve this?</p>

                            <h4>Techniques Used:</h4>
                            <ol style="margin: 1rem 0; margin-left: 2rem;">
                                <li><strong>Replication:</strong> Every object stored in at least 3 different physical locations</li>
                                <li><strong>Checksums:</strong> Every read verifies data integrity</li>
                                <li><strong>Automatic healing:</strong> Continuously scans for and repairs corrupted data</li>
                                <li><strong>Versioning:</strong> Keep multiple versions to recover from accidental deletions</li>
                                <li><strong>Geographic distribution:</strong> Data spread across multiple data centers</li>
                            </ol>

                            <h2>Cost vs Availability Trade-off</h2>
                            <div class="code-block">Rough Cost Estimation:
99% availability: $1,000/month
99.9% availability: $5,000/month (5x cost)
99.99% availability: $25,000/month (25x cost)
99.999% availability: $100,000+/month (100x+ cost)

Why exponential?
- More redundant hardware
- More geographic regions
- More complex infrastructure
- 24/7 on-call engineers
- More sophisticated monitoring</div>

                            <h2>When to Prioritize What</h2>
                            <table class="table">
                                <tr>
                                    <th>System Type</th>
                                    <th>Availability Target</th>
                                    <th>Reliability Target</th>
                                    <th>Justification</th>
                                </tr>
                                <tr>
                                    <td>Banking Core</td>
                                    <td>99.99%</td>
                                    <td>99.999%</td>
                                    <td>Can't lose money, brief downtime acceptable</td>
                                </tr>
                                <tr>
                                    <td>Social Media</td>
                                    <td>99.9%</td>
                                    <td>99%</td>
                                    <td>Users tolerate occasional failures</td>
                                </tr>
                                <tr>
                                    <td>E-commerce</td>
                                    <td>99.95%</td>
                                    <td>99.9%</td>
                                    <td>Downtime = lost revenue</td>
                                </tr>
                                <tr>
                                    <td>Internal Tools</td>
                                    <td>99%</td>
                                    <td>95%</td>
                                    <td>Employees can work around issues</td>
                                </tr>
                            </table>

                            <h2>Summary</h2>
                            <p><strong>Availability</strong> = Is the system up and accessible?</p>
                            <p><strong>Reliability</strong> = Does the system work correctly when it's up?</p>
                            <p>Both are critical. High availability without reliability means users can reach a broken system. High reliability without availability means a perfect system nobody can use. The best systems have both, but it's expensive. Choose your targets based on business requirements and budget.</p>
                        `,
                        interviews: [
                            {
                                question: "What's the difference between availability and reliability?",
                                answer: "Availability = percentage of time the system is up and accessible. Reliability = probability the system works correctly when it's up. You can have high availability with low reliability (system is up but buggy) or low availability with high reliability (system is down often but perfect when up)."
                            },
                            {
                                question: "What does 99.9% availability mean in terms of downtime?",
                                answer: "99.9% availability (three nines) means maximum 8.7 hours of downtime per year, or about 43.8 minutes per month, or about 10.1 minutes per week. This is a common target for standard web applications."
                            },
                            {
                                question: "How do you achieve high availability?",
                                answer: "Use redundancy (multiple copies of components), implement automatic failover mechanisms, distribute geographically across regions, have health checks and monitoring, and implement graceful degradation when parts fail."
                            },
                            {
                                question: "Why is each additional 'nine' of availability exponentially more expensive?",
                                answer: "Each nine requires more redundant infrastructure, more geographic regions, more complex systems, 24/7 staffing, sophisticated monitoring, and automated recovery. Going from 99% to 99.9% might cost 5x more, and 99.99% might cost 25x more."
                            },
                            {
                                question: "What is graceful degradation? Give an example.",
                                answer: "Graceful degradation means reducing functionality instead of complete failure. Example: If an e-commerce database fails, instead of showing an error page, show cached product pages and disable checkout temporarily with a message. Users can still browse, just can't buy temporarily."
                            }
                        ]
                    }
                ]
            },
            {
                title: 'Module 2: Load Balancing & Networking',
                lessons: [
                    {
                        id: 'load-balancing-basics',
                        title: 'Load Balancing Fundamentals',
                        duration: '50 min',
                        content: `
                            <h2>What is Load Balancing?</h2>
                            <p>Load balancing is the process of distributing network traffic across multiple servers. Instead of sending all requests to a single server, a load balancer acts as a traffic cop, directing each request to the server best suited to handle it.</p>

                            <div class="code-block">Without Load Balancer:
All Users → Single Server (overwhelmed)

With Load Balancer:
            [Server 1] (25% traffic)
Users →  LB → [Server 2] (25% traffic)
            [Server 3] (25% traffic)
            [Server 4] (25% traffic)</div>

                            <h3>Why Load Balancing Matters</h3>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li><strong>Scalability:</strong> Handle more traffic by adding more servers</li>
                                <li><strong>Availability:</strong> If one server fails, others continue serving traffic</li>
                                <li><strong>Performance:</strong> No single server becomes a bottleneck</li>
                                <li><strong>Flexibility:</strong> Take servers offline for maintenance without downtime</li>
                            </ul>

                            <h2>Load Balancing Algorithms</h2>

                            <h3>1. Round Robin</h3>
                            <p>Requests are distributed sequentially across all servers.</p>
                            <div class="code-block">Requests: 1, 2, 3, 4, 5, 6
Server A: Requests 1, 4
Server B: Requests 2, 5
Server C: Requests 3, 6

Simple pattern: A → B → C → A → B → C...</div>

                            <h4>Pros:</h4>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li>Simple to implement</li>
                                <li>Works well when all servers have equal capacity</li>
                                <li>Fair distribution over time</li>
                            </ul>

                            <h4>Cons:</h4>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li>Doesn't consider server load</li>
                                <li>Doesn't account for different request complexity</li>
                                <li>All servers must have same capacity</li>
                            </ul>

                            <h3>2. Weighted Round Robin</h3>
                            <p>Like round robin, but servers with higher capacity receive more requests.</p>
                            <div class="code-block">Server A: Weight 1 (low capacity)
Server B: Weight 2 (medium capacity)
Server C: Weight 3 (high capacity)

Distribution:
Server A: 1 request
Server B: 2 requests
Server C: 3 requests
Then repeat...</div>

                            <h4>Use Case:</h4>
                            <p>When you have servers with different hardware specifications. Give newer, more powerful servers higher weights.</p>

                            <h3>3. Least Connections</h3>
                            <p>Send new requests to the server with the fewest active connections.</p>
                            <div class="code-block">Current state:
Server A: 5 active connections
Server B: 3 active connections
Server C: 8 active connections

New request → Goes to Server B (fewest connections)</div>

                            <h4>Pros:</h4>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li>Better for requests with varying processing times</li>
                                <li>Prevents overloading busy servers</li>
                                <li>More dynamic than round robin</li>
                            </ul>

                            <h4>Cons:</h4>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li>More complex to implement</li>
                                <li>Requires tracking active connections</li>
                                <li>Doesn't account for request complexity</li>
                            </ul>

                            <h3>4. Weighted Least Connections</h3>
                            <p>Combines least connections with server weights. Considers both current load and server capacity.</p>
                            <div class="code-block">Server A: Weight 1, 2 connections
Server B: Weight 2, 4 connections
Server C: Weight 3, 3 connections

Ratio: A=2/1=2, B=4/2=2, C=3/3=1
New request → Server C (lowest ratio)</div>

                            <h3>5. IP Hash</h3>
                            <p>Use the client's IP address to determine which server receives the request. Same client always goes to same server.</p>
                            <div class="code-block">Client IP: 192.168.1.100
Hash: hash(192.168.1.100) % 3 = 1
→ Always routes to Server B

Client IP: 192.168.1.101
Hash: hash(192.168.1.101) % 3 = 2
→ Always routes to Server C</div>

                            <h4>Pros:</h4>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li>Sticky sessions (same user → same server)</li>
                                <li>Good for applications with server-side state</li>
                                <li>Cache locality (user's cached data stays on same server)</li>
                            </ul>

                            <h4>Cons:</h4>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li>Uneven distribution if few clients</li>
                                <li>Adding/removing servers disrupts existing sessions</li>
                                <li>No failover (client stuck with dead server)</li>
                            </ul>

                            <h3>6. Least Response Time</h3>
                            <p>Send requests to the server with the fastest response time and fewest active connections.</p>
                            <div class="code-block">Server A: 5 connections, avg response 50ms
Server B: 3 connections, avg response 100ms
Server C: 8 connections, avg response 30ms

New request → Server A or C (best response time + connection balance)</div>

                            <h4>Best for:</h4>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li>Geographically distributed servers</li>
                                <li>Servers with varying network latency</li>
                                <li>Ensuring best user experience</li>
                            </ul>

                            <h2>Types of Load Balancers</h2>

                            <h3>Layer 4 (Transport Layer) Load Balancing</h3>
                            <p>Makes routing decisions based on IP address and TCP/UDP port.</p>
                            <div class="code-block">Request comes in:
Source: 192.168.1.100:45678
Destination: loadbalancer.com:80

Layer 4 LB:
- Looks at IP and port only
- Doesn't inspect packet contents
- Fast and efficient
- Routes to server</div>

                            <h4>Characteristics:</h4>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li>Fast (no deep packet inspection)</li>
                                <li>Low latency</li>
                                <li>Protocol agnostic (works with any TCP/UDP traffic)</li>
                                <li>Cannot make content-based routing decisions</li>
                            </ul>

                            <h3>Layer 7 (Application Layer) Load Balancing</h3>
                            <p>Makes routing decisions based on content of the request (URL, headers, cookies).</p>
                            <div class="code-block">Request: GET /api/users
Headers:
  Host: api.example.com
  User-Agent: Mobile
  Cookie: session_id=abc123

Layer 7 LB can route based on:
- URL: /api/* → API servers
- Header: Mobile → Mobile-optimized servers
- Cookie: Sticky session to same server</div>

                            <h4>Characteristics:</h4>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li>Intelligent routing (content-aware)</li>
                                <li>Can rewrite URLs, add/remove headers</li>
                                <li>SSL termination</li>
                                <li>Slower than Layer 4 (more processing)</li>
                                <li>More expensive</li>
                            </ul>

                            <h2>Health Checks</h2>
                            <p>Load balancers must know which servers are healthy before sending traffic.</p>

                            <h3>Types of Health Checks:</h3>

                            <h4>1. Passive Health Checks</h4>
                            <div class="code-block">Monitor actual traffic:
If Server A fails 3 requests in 10 seconds:
→ Mark as unhealthy
→ Stop sending traffic
→ Try again in 30 seconds</div>

                            <h4>2. Active Health Checks</h4>
                            <div class="code-block">Send periodic probes:
Every 5 seconds:
  GET /health endpoint
  Expect: 200 OK + response time < 1s

If 3 consecutive failures:
  → Mark server as down
  → Remove from rotation</div>

                            <h3>Health Check Best Practices:</h3>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li>Check frequently (every 5-10 seconds)</li>
                                <li>Require multiple failures before marking down (avoid false positives)</li>
                                <li>Check actual application health, not just server ping</li>
                                <li>Test database connectivity in health check</li>
                                <li>Have different endpoints for different check types</li>
                            </ul>

                            <h2>Real World Example: Netflix</h2>

                            <h3>Netflix's Load Balancing Strategy</h3>
                            <p>Netflix uses a multi-tier load balancing approach:</p>

                            <div class="code-block">Tier 1: DNS-based Geographic Load Balancing
User in Tokyo → Route to Tokyo region
User in London → Route to London region

Tier 2: Cloud Load Balancer (AWS ELB)
Distribute across multiple availability zones
Health checks every 30 seconds

Tier 3: Application-level Load Balancing (Zuul)
Content-based routing:
- /api/browse → Browse service
- /api/play → Playback service
- /api/billing → Billing service

Tier 4: Client-side Load Balancing (Ribbon)
Each service has multiple instances
Client chooses which instance to call
Avoid failed instances automatically</div>

                            <h3>Why Multi-Tier?</h3>
                            <ol style="margin: 1rem 0; margin-left: 2rem;">
                                <li><strong>Geographic optimization:</strong> Users get content from nearby regions (low latency)</li>
                                <li><strong>High availability:</strong> If one region fails, route to another</li>
                                <li><strong>Service isolation:</strong> Each microservice can scale independently</li>
                                <li><strong>Resilience:</strong> Client-side load balancing survives load balancer failures</li>
                            </ol>

                            <h2>Common Load Balancing Tools</h2>

                            <h3>Hardware Load Balancers:</h3>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li><strong>F5 BIG-IP:</strong> Enterprise-grade, very expensive, high performance</li>
                                <li><strong>Citrix ADC:</strong> Advanced traffic management, ~$20k+</li>
                            </ul>

                            <h3>Software Load Balancers:</h3>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li><strong>Nginx:</strong> Free, popular, Layer 7, great for HTTP/HTTPS</li>
                                <li><strong>HAProxy:</strong> Free, high performance, Layer 4 & 7</li>
                                <li><strong>Envoy:</strong> Modern, service mesh, used by Lyft, Uber</li>
                            </ul>

                            <h3>Cloud Load Balancers:</h3>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li><strong>AWS ELB/ALB/NLB:</strong> Managed, auto-scaling, integrated</li>
                                <li><strong>Google Cloud Load Balancing:</strong> Global, anycast, auto-scaling</li>
                                <li><strong>Azure Load Balancer:</strong> Layer 4, integrated with Azure</li>
                            </ul>

                            <h2>Best Practices</h2>

                            <ol style="margin: 1rem 0; margin-left: 2rem;">
                                <li><strong>Use multiple load balancers:</strong> Load balancer itself shouldn't be single point of failure</li>
                                <li><strong>Implement health checks:</strong> Don't send traffic to dead servers</li>
                                <li><strong>Use connection draining:</strong> When removing a server, finish existing connections gracefully</li>
                                <li><strong>Monitor metrics:</strong> Track server health, response times, error rates</li>
                                <li><strong>Plan for failover:</strong> What happens when a server or load balancer dies?</li>
                                <li><strong>Choose appropriate algorithm:</strong> Round robin for stateless, IP hash for stateful</li>
                                <li><strong>SSL termination at load balancer:</strong> Reduces load on application servers</li>
                            </ol>

                            <h2>Summary</h2>
                            <p>Load balancing is essential for scalable, highly available systems. Choose the right algorithm based on your use case: round robin for equal servers, least connections for varying request times, IP hash for sticky sessions. Layer 4 is fast but simple, Layer 7 is slower but intelligent. Always implement health checks and monitor your load balancers. In production, use multiple load balancers to avoid single points of failure.</p>
                        `,
                        interviews: [
                            {
                                question: "What is load balancing and why is it important?",
                                answer: "Load balancing distributes network traffic across multiple servers. It's important for scalability (handle more traffic), availability (survive server failures), performance (no bottlenecks), and flexibility (maintenance without downtime)."
                            },
                            {
                                question: "Explain round robin, least connections, and IP hash algorithms",
                                answer: "Round robin: Distribute requests sequentially to servers (A→B→C→A). Least connections: Send to server with fewest active connections. IP hash: Use client IP to determine server, ensuring same client always goes to same server (sticky sessions)."
                            },
                            {
                                question: "What's the difference between Layer 4 and Layer 7 load balancing?",
                                answer: "Layer 4: Routes based on IP/port only, fast, protocol-agnostic, no content inspection. Layer 7: Routes based on content (URL, headers, cookies), slower, intelligent routing, can modify requests, supports SSL termination."
                            },
                            {
                                question: "How do health checks work in load balancing?",
                                answer: "Active: Send periodic probes to /health endpoint, mark server down after consecutive failures. Passive: Monitor actual traffic, mark down if requests fail. Best practice: check frequently, require multiple failures before marking down, test actual application health."
                            },
                            {
                                question: "What are best practices for load balancer deployment?",
                                answer: "Use multiple load balancers (avoid single point of failure), implement robust health checks, use connection draining for graceful removal, monitor metrics continuously, choose appropriate algorithm, terminate SSL at load balancer, and plan for failover scenarios."
                            }
                        ]
                    },
                    {
                        id: 'dns-how-it-works',
                        title: 'DNS and How It Works',
                        duration: '45 min',
                        content: `
                            <h2>What is DNS?</h2>
                            <p>DNS (Domain Name System) is like the phonebook of the internet. When you type "google.com" in your browser, DNS translates that human-readable domain name into an IP address (like 142.250.185.46) that computers use to identify each other on the network.</p>

                            <div class="code-block">Without DNS:
You'd have to remember: 142.250.185.46 (Google)
                          172.217.14.206 (YouTube)
                          31.13.81.36 (Facebook)

With DNS:
You just type: google.com, youtube.com, facebook.com</div>

                            <h3>Why DNS Matters in System Design</h3>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li><strong>Load distribution:</strong> DNS can route users to different servers based on location</li>
                                <li><strong>Failover:</strong> If one server is down, DNS can redirect to backup servers</li>
                                <li><strong>Scalability:</strong> Easy to add new servers without users noticing</li>
                                <li><strong>Performance:</strong> Route users to geographically closest servers</li>
                            </ul>

                            <h2>How DNS Works: The Resolution Process</h2>
                            <p>When you type a URL, several DNS servers work together to find the IP address:</p>

                            <div class="code-block">Step-by-step DNS Resolution for www.example.com:

1. Browser checks its cache
   → "Do I already know example.com's IP?"

2. Operating System cache
   → Windows/Mac checks local DNS cache

3. Router cache
   → Home router might have cached it

4. ISP's DNS Resolver (Recursive Resolver)
   → Your internet provider's DNS server

5. Root Name Server
   → "I don't know example.com, but I know who handles .com"
   → Returns address of .com TLD server

6. TLD (Top Level Domain) Server
   → "I don't have example.com, but I know who does"
   → Returns address of example.com's nameserver

7. Authoritative Name Server
   → "Yes! example.com is at 93.184.216.34"
   → Returns final IP address

8. ISP caches result and returns to you
   → Future requests will be faster

Total time: 20-120ms for first request
Cached requests: 1-10ms</div>

                            <h2>DNS Hierarchy</h2>
                            <p>DNS is organized in a hierarchical tree structure:</p>

                            <div class="code-block">Root Level (.)
    ↓
Top-Level Domains (TLD)
.com  .org  .net  .edu  .gov  .uk  .in
    ↓
Second-Level Domains
google.com  amazon.com  facebook.com
    ↓
Subdomains
www.google.com  mail.google.com  drive.google.com</div>

                            <h3>Example Breakdown: mail.google.com</h3>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li><strong>mail</strong> = subdomain (specific service)</li>
                                <li><strong>google</strong> = second-level domain (company/organization)</li>
                                <li><strong>com</strong> = top-level domain (commercial)</li>
                            </ul>

                            <h2>DNS Record Types</h2>
                            <p>DNS stores different types of records for different purposes:</p>

                            <h3>A Record (Address Record)</h3>
                            <p>Maps domain name to IPv4 address</p>
                            <div class="code-block">example.com → 93.184.216.34</div>

                            <h3>AAAA Record</h3>
                            <p>Maps domain name to IPv6 address</p>
                            <div class="code-block">example.com → 2606:2800:220:1:248:1893:25c8:1946</div>

                            <h3>CNAME Record (Canonical Name)</h3>
                            <p>Alias of one domain to another</p>
                            <div class="code-block">www.example.com → example.com
blog.example.com → hosting.wordpress.com

Use case: Point multiple subdomains to the same server</div>

                            <h3>MX Record (Mail Exchange)</h3>
                            <p>Specifies mail servers for the domain</p>
                            <div class="code-block">example.com → mail.example.com (priority 10)
example.com → backup-mail.example.com (priority 20)

Lower priority number = higher priority</div>

                            <h3>TXT Record</h3>
                            <p>Stores text information, often for verification and security</p>
                            <div class="code-block">Uses:
- Domain ownership verification (Google, Facebook)
- Email authentication (SPF, DKIM)
- Security policies</div>

                            <h3>NS Record (Name Server)</h3>
                            <p>Specifies authoritative name servers for domain</p>
                            <div class="code-block">example.com → ns1.example.com
example.com → ns2.example.com</div>

                            <h2>DNS Caching and TTL</h2>
                            <p>DNS responses include a TTL (Time To Live) that tells caching servers how long to store the result:</p>

                            <div class="code-block">DNS Response:
example.com = 93.184.216.34
TTL = 3600 seconds (1 hour)

This means:
- Resolvers can cache this for 1 hour
- After 1 hour, must query again
- Reduces DNS load by 99%+ for popular sites</div>

                            <h3>TTL Trade-offs</h3>
                            <table class="table">
                                <tr>
                                    <th>TTL Value</th>
                                    <th>Pros</th>
                                    <th>Cons</th>
                                    <th>Use Case</th>
                                </tr>
                                <tr>
                                    <td>Low (60s)</td>
                                    <td>Fast updates, quick failover</td>
                                    <td>More DNS queries, higher load</td>
                                    <td>During migrations, testing</td>
                                </tr>
                                <tr>
                                    <td>Medium (3600s / 1hr)</td>
                                    <td>Balanced performance & flexibility</td>
                                    <td>1 hour to propagate changes</td>
                                    <td>Most production systems</td>
                                </tr>
                                <tr>
                                    <td>High (86400s / 24hr)</td>
                                    <td>Minimal DNS load, cost savings</td>
                                    <td>Slow to update, 24hr propagation</td>
                                    <td>Stable, rarely-changing systems</td>
                                </tr>
                            </table>

                            <h2>DNS in System Design: Real-World Uses</h2>

                            <h3>1. Geographic Load Distribution</h3>
                            <p>Route users to nearest server based on their location:</p>
                            <div class="code-block">User in USA queries example.com
→ DNS returns: 192.0.2.1 (US server)

User in Europe queries example.com
→ DNS returns: 198.51.100.1 (EU server)

User in Asia queries example.com
→ DNS returns: 203.0.113.1 (Asia server)

Same domain, different IPs based on location!</div>

                            <h3>2. Failover and High Availability</h3>
                            <div class="code-block">Health Check Setup:
Primary server: 192.0.2.1 (active)
Backup server: 192.0.2.2 (standby)

Normal operation:
example.com → 192.0.2.1

Primary server goes down:
DNS health check detects failure
DNS automatically updates:
example.com → 192.0.2.2

Failover time: 60 seconds (TTL dependent)</div>

                            <h3>3. Load Balancing with Round Robin DNS</h3>
                            <div class="code-block">Configure multiple A records:
example.com → 192.0.2.1
example.com → 192.0.2.2
example.com → 192.0.2.3

DNS returns all 3 IPs, client picks one (usually first)
Next query might return different order
→ Distributes load across servers

Limitation: No health checking, dumb rotation</div>

                            <h2>DNS Performance Optimization</h2>

                            <h3>1. Use DNS Prefetching</h3>
                            <div class="code-block">In HTML:
<link rel="dns-prefetch" href="//cdn.example.com">
<link rel="dns-prefetch" href="//api.example.com">

Browser resolves these domains before they're needed
Saves 20-120ms when actually loading resources</div>

                            <h3>2. Minimize DNS Lookups</h3>
                            <div class="code-block">Bad: Multiple domains
<img src="//cdn1.example.com/image1.jpg">
<img src="//cdn2.example.com/image2.jpg">
<img src="//cdn3.example.com/image3.jpg">
→ 3 DNS lookups = 60-360ms

Good: Single domain
<img src="//cdn.example.com/image1.jpg">
<img src="//cdn.example.com/image2.jpg">
<img src="//cdn.example.com/image3.jpg">
→ 1 DNS lookup = 20-120ms</div>

                            <h3>3. Use Anycast for DNS</h3>
                            <p>Anycast routes users to the nearest DNS server globally:</p>
                            <div class="code-block">Traditional DNS: Single server location
User in Australia → US DNS server = 200ms latency

Anycast DNS: Multiple servers, same IP
User in Australia → Sydney DNS server = 5ms latency
User in Europe → London DNS server = 5ms latency

Cloudflare's 1.1.1.1 uses anycast with 200+ locations</div>

                            <h2>Real-World Example: Netflix DNS Strategy</h2>

                            <h3>Problem</h3>
                            <p>Netflix needs to route 200+ million users to optimal servers for streaming, with minimal latency and high reliability.</p>

                            <h3>Solution</h3>
                            <div class="code-block">1. Custom DNS: Netflix built their own DNS infrastructure
   - Responds in under 10ms globally
   - Can handle 100 billion+ queries/day

2. Intelligent Routing:
   User in California → LA cache server (5ms away)
   User in New York → NYC cache server (5ms away)
   User in Tokyo → Tokyo cache server (5ms away)

3. Real-time Updates:
   - If LA server is overloaded → route to backup
   - If server goes down → instant DNS update
   - No user impact, seamless switching

4. Result:
   - 99.99% uptime
   - Average DNS resolution: 8ms globally
   - Users get content from nearest location</div>

                            <h2>DNS Security: Common Threats</h2>

                            <h3>DNS Spoofing (Cache Poisoning)</h3>
                            <p>Attacker inserts fake DNS records into cache:</p>
                            <div class="code-block">Normal:
bank.com → 192.0.2.1 (real bank)

After poisoning:
bank.com → 203.0.113.99 (attacker's server)
→ Users send passwords to attacker!</div>

                            <h4>Prevention: DNSSEC</h4>
                            <p>DNSSEC (DNS Security Extensions) adds cryptographic signatures to verify DNS responses are authentic and haven't been tampered with.</p>

                            <h3>DDoS Attacks on DNS</h3>
                            <div class="code-block">Attack scenario:
Millions of requests → DNS servers
DNS servers overwhelmed → can't respond
→ Website unreachable even though servers are fine

Real example: Dyn DNS attack (2016)
- Major DDoS attack on DNS provider Dyn
- Twitter, Netflix, GitHub, PayPal all went down
- Lasted several hours

Defense:
- Anycast DNS (distribute load globally)
- Rate limiting
- Multiple DNS providers
- DDoS protection (Cloudflare, AWS Shield)</div>

                            <h2>Best Practices for DNS in Production</h2>

                            <ol style="margin: 1rem 0; margin-left: 2rem;">
                                <li><strong>Use multiple DNS providers:</strong> Don't rely on single provider (AWS Route53 + Cloudflare)</li>
                                <li><strong>Set appropriate TTLs:</strong> 1 hour for stable systems, 60s during changes</li>
                                <li><strong>Monitor DNS performance:</strong> Track resolution times and failures</li>
                                <li><strong>Implement DNS health checks:</strong> Automatic failover if servers die</li>
                                <li><strong>Use anycast DNS:</strong> Low latency globally</li>
                                <li><strong>Enable DNSSEC:</strong> Protect against spoofing</li>
                                <li><strong>Plan for DNS changes:</strong> Lower TTL 24hrs before major changes</li>
                                <li><strong>Test failover:</strong> Regularly verify backup DNS works</li>
                            </ol>

                            <h2>Summary</h2>
                            <p>DNS is the foundation of internet navigation, translating human-readable names to IP addresses. In system design, DNS is crucial for load distribution, failover, and geographic routing. Understanding DNS helps you build systems that are fast globally, highly available, and can scale to millions of users. Key concepts: DNS resolution process, record types (A, CNAME, MX), caching with TTL, and using DNS for intelligent traffic routing.</p>
                        `,
                        interviews: [
                            {
                                question: "Explain the DNS resolution process step by step",
                                answer: "1) Browser checks cache, 2) OS checks cache, 3) Router checks cache, 4) ISP's DNS resolver checks, 5) If not cached: query root nameserver (returns TLD server), 6) Query TLD server (returns authoritative nameserver), 7) Query authoritative nameserver (returns IP), 8) Response cached and returned to browser. Takes 20-120ms for first query, 1-10ms for cached queries."
                            },
                            {
                                question: "What's the difference between A, CNAME, and MX records?",
                                answer: "A record: Maps domain to IPv4 address (example.com → 93.184.216.34). CNAME record: Alias of one domain to another (www.example.com → example.com). MX record: Specifies mail servers with priority (example.com → mail.example.com priority 10). A is for web servers, CNAME for aliases, MX for email routing."
                            },
                            {
                                question: "How does DNS enable geographic load distribution?",
                                answer: "DNS can return different IP addresses based on user location. User in USA gets US server IP, user in Europe gets EU server IP. Same domain name, different IPs. This reduces latency (users hit nearest server) and distributes load globally. Used by Netflix, Google, Amazon for optimal performance."
                            },
                            {
                                question: "What is TTL and how do you choose the right value?",
                                answer: "TTL (Time To Live) is how long DNS responses can be cached. Low TTL (60s): Fast updates but more DNS queries, use during migrations. Medium TTL (1 hour): Balanced, most production systems. High TTL (24 hours): Minimal DNS load but slow updates, use for stable systems. Trade-off between update speed and DNS server load."
                            },
                            {
                                question: "How did the Dyn DNS attack in 2016 take down major websites?",
                                answer: "Massive DDoS attack on DNS provider Dyn overwhelmed their DNS servers. Even though Twitter, Netflix, GitHub servers were running fine, users couldn't resolve domain names to IP addresses, making sites unreachable. Defense: Use multiple DNS providers, anycast DNS, rate limiting, and DDoS protection services."
                            }
                        ]
                    },
                    {
                        id: 'cdn-edge-computing',
                        title: 'CDN and Edge Computing',
                        duration: '50 min',
                        content: `
                            <h2>What is a CDN?</h2>
                            <p>A CDN (Content Delivery Network) is a geographically distributed network of servers that delivers content to users from the location closest to them. Instead of all users hitting one central server, they get content from the nearest CDN server, dramatically reducing latency and improving load times.</p>

                            <div class="code-block">Without CDN:
User in Tokyo → Server in California (150ms latency)
User in London → Server in California (140ms latency)
User in Sydney → Server in California (200ms latency)
All users experience high latency!

With CDN:
User in Tokyo → CDN server in Tokyo (5ms latency)
User in London → CDN server in London (5ms latency)
User in Sydney → CDN server in Sydney (5ms latency)
Fast for everyone!</div>

                            <h3>Why CDNs Matter</h3>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li><strong>Speed:</strong> Content served from nearest location = 10-20x faster</li>
                                <li><strong>Scalability:</strong> Distribute load across many servers globally</li>
                                <li><strong>Reliability:</strong> If one server fails, others take over</li>
                                <li><strong>Reduced cost:</strong> Save bandwidth on your origin server</li>
                                <li><strong>DDoS protection:</strong> CDNs can absorb and filter malicious traffic</li>
                            </ul>

                            <h2>How CDNs Work</h2>

                            <h3>Step-by-Step Process</h3>
                            <div class="code-block">1. User requests content: example.com/image.jpg

2. DNS routes to nearest CDN server (PoP - Point of Presence)

3. CDN server checks:
   → Do I have this file cached?

4a. Cache HIT (file is cached):
    → Serve directly from CDN
    → Total time: 10-50ms ✓

4b. Cache MISS (file not cached):
    → Request from origin server
    → Cache the file locally
    → Serve to user
    → Total time: 100-500ms (first user)
    → Next users get cache hit!

5. Cached content expires based on TTL
   → CDN checks origin for updates</div>

                            <h2>CDN Architecture</h2>

                            <h3>Points of Presence (PoPs)</h3>
                            <p>PoPs are CDN data centers distributed globally:</p>
                            <div class="code-block">Major CDN Providers:

Cloudflare:
- 300+ PoPs in 100+ countries
- Serves content within 50ms for 95% of users

Akamai:
- 350,000+ servers
- 135+ countries
- Delivers 30% of all web traffic

AWS CloudFront:
- 400+ PoPs
- Integrated with AWS services</div>

                            <h3>CDN Server Hierarchy</h3>
                            <div class="code-block">Edge Servers (Tier 1)
↓ Serve users directly
↓ Cache most popular content

Regional Servers (Tier 2)
↓ Aggregate traffic from multiple edge servers
↓ Cache less popular content

Origin Server (Your server)
↓ Source of truth
↓ Only hit for cache misses</div>

                            <h2>Types of Content CDNs Handle</h2>

                            <h3>Static Content</h3>
                            <p>Perfect for CDN caching:</p>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li>Images (JPEG, PNG, WebP)</li>
                                <li>Videos (MP4, WebM)</li>
                                <li>CSS and JavaScript files</li>
                                <li>Fonts</li>
                                <li>PDFs and documents</li>
                            </ul>

                            <h3>Dynamic Content Acceleration</h3>
                            <p>Modern CDNs can also accelerate dynamic content:</p>
                            <div class="code-block">Techniques:
- Route optimization (find fastest path to origin)
- TCP connection reuse
- HTTP/2 and HTTP/3 support
- Edge computing (run code at edge)

Example:
User → Edge server → Optimized route → Origin
Instead of: User → Internet → Origin

Result: 30-50% faster even for dynamic content!</div>

                            <h2>Cache Control and TTL</h2>

                            <h3>Setting Cache Headers</h3>
                            <div class="code-block">HTTP Headers:

Cache-Control: max-age=31536000
→ Cache for 1 year (static assets)

Cache-Control: max-age=3600
→ Cache for 1 hour (frequently changing)

Cache-Control: no-cache
→ Always validate with origin

Cache-Control: no-store
→ Never cache (sensitive data)</div>

                            <h3>Cache Strategy by Content Type</h3>
                            <table class="table">
                                <tr>
                                    <th>Content Type</th>
                                    <th>Cache Duration</th>
                                    <th>Reasoning</th>
                                </tr>
                                <tr>
                                    <td>Logo, favicon</td>
                                    <td>1 year</td>
                                    <td>Rarely changes, use versioning</td>
                                </tr>
                                <tr>
                                    <td>CSS/JS (versioned)</td>
                                    <td>1 year</td>
                                    <td>File name changes when updated</td>
                                </tr>
                                <tr>
                                    <td>Images</td>
                                    <td>1 week - 1 month</td>
                                    <td>Moderately static</td>
                                </tr>
                                <tr>
                                    <td>HTML pages</td>
                                    <td>1 hour - 1 day</td>
                                    <td>Frequently updated</td>
                                </tr>
                                <tr>
                                    <td>API responses</td>
                                    <td>1 min - 10 min</td>
                                    <td>Dynamic, but cacheable</td>
                                </tr>
                                <tr>
                                    <td>User-specific data</td>
                                    <td>No cache</td>
                                    <td>Private, varies per user</td>
                                </tr>
                            </table>

                            <h2>Edge Computing</h2>
                            <p>Edge computing takes CDN a step further - instead of just caching, you can run code at the edge servers!</p>

                            <h3>What You Can Do at the Edge</h3>
                            <div class="code-block">1. Request/Response Modification
   - Add security headers
   - A/B testing
   - Redirects based on geo-location

2. Authentication
   - Verify JWT tokens at edge
   - Don't hit origin for invalid requests

3. Image Optimization
   - Resize images on-the-fly
   - Convert to WebP format
   - Compress based on device

4. API Composition
   - Combine multiple API calls at edge
   - Return single response to client

5. Bot Detection
   - Filter malicious traffic before it hits origin</div>

                            <h3>Edge Computing Platforms</h3>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li><strong>Cloudflare Workers:</strong> Run JavaScript at 300+ locations</li>
                                <li><strong>AWS Lambda@Edge:</strong> Run Node.js/Python at CloudFront edge</li>
                                <li><strong>Fastly Compute@Edge:</strong> Run WebAssembly at edge</li>
                                <li><strong>Vercel Edge Functions:</strong> Serverless functions at edge</li>
                            </ul>

                            <h2>Real-World Example: Netflix</h2>

                            <h3>The Challenge</h3>
                            <p>Netflix streams to 230M+ subscribers globally. Average movie is 5GB. Bandwidth costs would be astronomical without CDN.</p>

                            <h3>Netflix's CDN Strategy: Open Connect</h3>
                            <div class="code-block">Netflix built their own CDN!

Open Connect Architecture:
1. 18,000+ servers in 1,000+ locations
2. Servers placed inside ISP networks
3. Content pre-positioned during off-peak hours

How it works:
- Popular movie releases → Pre-loaded overnight
- User hits play → Served from server in their ISP
- Latency: Under 10ms
- ISPs save bandwidth costs
- Netflix saves bandwidth costs
- Users get perfect streaming quality

Cost savings:
- Without CDN: $1B+/year in bandwidth
- With Open Connect: $100M/year
- Savings: 90%!</div>

                            <h2>CDN Performance Optimizations</h2>

                            <h3>1. Cache Hit Ratio</h3>
                            <div class="code-block">Goal: Maximize % of requests served from cache

Good cache hit ratio: 85-95%
Bad cache hit ratio: < 70%

To improve:
- Normalize URLs (example.com/?a=1&b=2 vs ?b=2&a=1)
- Set appropriate TTLs
- Cache more content types
- Use cache warming (pre-load popular content)</div>

                            <h3>2. Cache Warming</h3>
                            <p>Pre-load content to CDN before users request it:</p>
                            <div class="code-block">Use case: Product launch

Before launch:
- Push all product images to CDN
- Prime cache with product pages
- Load videos

Result:
- First users get cache hits
- No origin server overload
- Smooth launch!</div>

                            <h3>3. Smart Routing</h3>
                            <div class="code-block">CDN chooses optimal path:

Traditional: User → Internet → Origin
Smart routing: User → CDN backbone → Origin

CDN backbone is optimized private network:
- Lower latency
- Higher reliability
- Better throughput

Example:
Regular route: 200ms
Smart route: 80ms
60% improvement!</div>

                            <h2>CDN Security Features</h2>

                            <h3>DDoS Protection</h3>
                            <div class="code-block">How CDN protects against DDoS:

1. Distributed absorption:
   Attack traffic spread across 300+ servers
   Each server handles small portion

2. Traffic filtering:
   Identify malicious patterns
   Block at edge before reaching origin

3. Rate limiting:
   Limit requests per IP
   Stop bots and scrapers

Example: Cloudflare blocked 72 billion threats/day in 2023</div>

                            <h3>SSL/TLS Termination</h3>
                            <div class="code-block">CDN handles SSL:

User → HTTPS → CDN (terminates SSL) → HTTP → Origin

Benefits:
- Faster SSL handshake (closer to user)
- Reduce origin server CPU load
- CDN manages certificates
- Free SSL with providers like Cloudflare</div>

                            <h2>CDN vs Caching Comparison</h2>
                            <table class="table">
                                <tr>
                                    <th>Feature</th>
                                    <th>CDN</th>
                                    <th>Server-Side Cache</th>
                                </tr>
                                <tr>
                                    <td>Location</td>
                                    <td>Global (hundreds of locations)</td>
                                    <td>Single location (your datacenter)</td>
                                </tr>
                                <tr>
                                    <td>Latency</td>
                                    <td>5-50ms (very low)</td>
                                    <td>50-200ms (depends on distance)</td>
                                </tr>
                                <tr>
                                    <td>Scalability</td>
                                    <td>Infinite (distributed load)</td>
                                    <td>Limited (single server)</td>
                                </tr>
                                <tr>
                                    <td>Cost</td>
                                    <td>Pay per GB transferred</td>
                                    <td>Server costs only</td>
                                </tr>
                                <tr>
                                    <td>Best For</td>
                                    <td>Static assets, global users</td>
                                    <td>Dynamic data, database queries</td>
                                </tr>
                            </table>

                            <h2>When to Use CDN</h2>

                            <h3>Perfect Use Cases:</h3>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li>Global user base</li>
                                <li>Heavy static content (images, videos)</li>
                                <li>High traffic website</li>
                                <li>Need DDoS protection</li>
                                <li>Want to improve SEO (page speed matters)</li>
                            </ul>

                            <h3>When You Might Not Need CDN:</h3>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li>All users in single geographic region</li>
                                <li>Mostly dynamic, personalized content</li>
                                <li>Very low traffic site</li>
                                <li>Budget constraints (though many CDNs have free tiers)</li>
                            </ul>

                            <h2>Setting Up CDN: Quick Start</h2>

                            <h3>Option 1: Simple CDN (Cloudflare)</h3>
                            <div class="code-block">1. Sign up for Cloudflare (free tier available)
2. Point your domain's DNS to Cloudflare
3. Cloudflare automatically caches static content
4. Done! Your site is now on CDN

Time: 10 minutes
Cost: Free for basic features</div>

                            <h3>Option 2: AWS CloudFront</h3>
                            <div class="code-block">1. Create S3 bucket with your static files
2. Create CloudFront distribution
3. Point to S3 bucket as origin
4. Update DNS to point to CloudFront
5. Configure cache behaviors

Time: 30 minutes
Cost: Pay per GB (around $0.085/GB)</div>

                            <h2>Best Practices</h2>

                            <ol style="margin: 1rem 0; margin-left: 2rem;">
                                <li><strong>Use proper cache headers:</strong> Set max-age appropriately for each content type</li>
                                <li><strong>Version static assets:</strong> Use filenames like app.v123.js so you can cache forever</li>
                                <li><strong>Minimize cache keys:</strong> Normalize URLs to improve hit ratio</li>
                                <li><strong>Monitor cache hit ratio:</strong> Aim for 85%+ for static content</li>
                                <li><strong>Use cache purge carefully:</strong> Purging too often reduces benefits</li>
                                <li><strong>Enable compression:</strong> Gzip/Brotli at CDN level</li>
                                <li><strong>Use HTTP/2 or HTTP/3:</strong> Most CDNs support this automatically</li>
                                <li><strong>Set up monitoring:</strong> Track cache performance and errors</li>
                            </ol>

                            <h2>Summary</h2>
                            <p>CDNs are essential for modern web applications with global users. They dramatically reduce latency by serving content from nearby servers, improve scalability by distributing load, and enhance security with DDoS protection. Edge computing extends CDNs further by allowing code execution at edge locations. Major benefits include 10-20x faster content delivery, reduced bandwidth costs, and improved reliability. Every production application serving static assets should use a CDN.</p>
                        `,
                        interviews: [
                            {
                                question: "How does a CDN improve website performance?",
                                answer: "CDN reduces latency by serving content from servers geographically close to users. Instead of all users hitting one origin server (150-200ms latency), they get content from nearby CDN servers (5-50ms latency). This 10-20x speed improvement comes from cache hits, where content is already stored at the edge. CDNs also reduce origin server load, saving bandwidth costs."
                            },
                            {
                                question: "Explain the difference between cache HIT and cache MISS in CDN",
                                answer: "Cache HIT: CDN has the file cached locally, serves it directly to user (10-50ms, fast). Cache MISS: CDN doesn't have file, fetches from origin server, caches it, then serves to user (100-500ms, slower first time). Next requests for same file will be cache hits. Good CDNs aim for 85-95% hit ratio."
                            },
                            {
                                question: "What is edge computing and how is it different from CDN?",
                                answer: "Traditional CDN: Only caches and serves static content. Edge computing: Runs actual code (JavaScript, WebAssembly) at CDN edge servers. Can do request modification, authentication, image optimization, API composition, bot detection - all at the edge without hitting origin. Platforms: Cloudflare Workers, Lambda@Edge, Fastly Compute@Edge."
                            },
                            {
                                question: "How did Netflix save 90% on bandwidth costs with their CDN?",
                                answer: "Netflix built Open Connect, their own CDN with 18,000+ servers inside ISP networks. They pre-load popular content during off-peak hours. When users stream, content comes from servers in their ISP (under 10ms latency). Without CDN: $1B+/year bandwidth. With Open Connect: $100M/year. Saves them and ISPs money, users get perfect quality."
                            },
                            {
                                question: "How do CDNs provide DDoS protection?",
                                answer: "CDNs distribute attack traffic across hundreds of servers globally, so each server handles only a small portion. They filter malicious patterns at edge before reaching origin, implement rate limiting per IP, and have massive capacity to absorb attacks. Example: Cloudflare blocked 72 billion threats daily in 2023. Origin server stays protected behind CDN."
                            }
                        ]
                    }
                ]
            },
            {
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
            },
            {
                title: 'Module 4: Databases Part 1 - Foundations',
                lessons: [
                    {
                        id: 'sql-vs-nosql',
                        title: 'SQL vs NoSQL',
                        duration: '50 min',
                        content: `
                            <h2>The Fundamental Database Decision</h2>
                            <p>Choosing between SQL (relational) and NoSQL (non-relational) databases is one of the most important architectural decisions you'll make. Each has distinct strengths, weaknesses, and ideal use cases. Understanding when to use which can mean the difference between a system that scales smoothly and one that becomes a bottleneck.</p>

                            <h2>SQL Databases (Relational)</h2>

                            <h3>What are SQL Databases?</h3>
                            <p>SQL databases store data in structured tables with predefined schemas. Data is organized in rows and columns, and relationships between tables are established through foreign keys.</p>

                            <div class="code-block">Example: E-commerce Database

Users Table:
| user_id | name      | email           | created_at |
|---------|-----------|-----------------|------------|
| 1       | John Doe  | john@email.com  | 2024-01-01 |
| 2       | Jane Smith| jane@email.com  | 2024-01-02 |

Orders Table:
| order_id | user_id | total | status    | created_at |
|----------|---------|-------|-----------|------------|
| 101      | 1       | 99.99 | completed | 2024-01-15 |
| 102      | 2       | 149.50| pending   | 2024-01-16 |

Relationships:
Orders.user_id → Users.user_id (foreign key)</div>

                            <h3>Key Characteristics of SQL</h3>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li><strong>Structured schema:</strong> Define columns, data types before inserting data</li>
                                <li><strong>ACID transactions:</strong> Atomicity, Consistency, Isolation, Durability</li>
                                <li><strong>Relations:</strong> Join tables to query related data</li>
                                <li><strong>SQL language:</strong> Powerful querying with SELECT, JOIN, WHERE, etc.</li>
                                <li><strong>Normalization:</strong> Reduce redundancy by splitting data into multiple tables</li>
                            </ul>

                            <h3>Popular SQL Databases</h3>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li><strong>PostgreSQL:</strong> Feature-rich, open source, ACID compliant</li>
                                <li><strong>MySQL:</strong> Popular, fast, widely used (WordPress, Facebook)</li>
                                <li><strong>Oracle:</strong> Enterprise-grade, expensive, powerful</li>
                                <li><strong>SQL Server:</strong> Microsoft's database, Windows integration</li>
                                <li><strong>SQLite:</strong> Embedded, serverless, mobile apps</li>
                            </ul>

                            <h2>NoSQL Databases (Non-Relational)</h2>

                            <h3>What are NoSQL Databases?</h3>
                            <p>NoSQL databases store data in flexible formats without rigid schemas. They prioritize scalability, performance, and flexibility over strict consistency.</p>

                            <div class="code-block">Example: User Profile in MongoDB (Document)

{
  "_id": "user_123",
  "name": "John Doe",
  "email": "john@email.com",
  "address": {
    "street": "123 Main St",
    "city": "San Francisco",
    "zip": "94102"
  },
  "interests": ["coding", "gaming", "music"],
  "orders": [
    {
      "order_id": "101",
      "total": 99.99,
      "status": "completed",
      "items": [...]
    }
  ],
  "created_at": "2024-01-01T00:00:00Z"
}

Notice: No fixed schema, nested data, arrays - all in one document!</div>

                            <h3>Types of NoSQL Databases</h3>

                            <h4>1. Document Stores</h4>
                            <div class="code-block">Store data as JSON-like documents
Examples: MongoDB, Couchbase, Amazon DocumentDB

Best for:
- Content management systems
- User profiles
- Product catalogs
- Flexible, evolving schemas</div>

                            <h4>2. Key-Value Stores</h4>
                            <div class="code-block">Simple key → value mapping
Examples: Redis, DynamoDB, Riak

Best for:
- Caching
- Session storage
- Real-time data
- Simple lookups (user preferences, config)</div>

                            <h4>3. Column-Family Stores</h4>
                            <div class="code-block">Store data in column families, not rows
Examples: Cassandra, HBase, ScyllaDB

Best for:
- Time-series data
- Event logging
- Analytics
- Write-heavy workloads</div>

                            <h4>4. Graph Databases</h4>
                            <div class="code-block">Store data as nodes and relationships
Examples: Neo4j, Amazon Neptune, ArangoDB

Best for:
- Social networks (friends, connections)
- Recommendation engines
- Fraud detection
- Network/IT operations</div>

                            <h2>SQL vs NoSQL: Detailed Comparison</h2>

                            <table class="table">
                                <tr>
                                    <th>Feature</th>
                                    <th>SQL</th>
                                    <th>NoSQL</th>
                                </tr>
                                <tr>
                                    <td>Schema</td>
                                    <td>Fixed, predefined</td>
                                    <td>Flexible, dynamic</td>
                                </tr>
                                <tr>
                                    <td>Data Model</td>
                                    <td>Tables with rows/columns</td>
                                    <td>Documents, key-value, columns, graphs</td>
                                </tr>
                                <tr>
                                    <td>Scaling</td>
                                    <td>Vertical (scale up)</td>
                                    <td>Horizontal (scale out)</td>
                                </tr>
                                <tr>
                                    <td>Transactions</td>
                                    <td>ACID (strong)</td>
                                    <td>BASE (eventual consistency)</td>
                                </tr>
                                <tr>
                                    <td>Query Language</td>
                                    <td>SQL (standardized)</td>
                                    <td>Varies by database</td>
                                </tr>
                                <tr>
                                    <td>Joins</td>
                                    <td>Easy, powerful</td>
                                    <td>Limited or manual</td>
                                </tr>
                                <tr>
                                    <td>Data Integrity</td>
                                    <td>Strong (foreign keys, constraints)</td>
                                    <td>Weak (application-level)</td>
                                </tr>
                                <tr>
                                    <td>Performance</td>
                                    <td>Good for complex queries</td>
                                    <td>Excellent for simple queries at scale</td>
                                </tr>
                                <tr>
                                    <td>Use Cases</td>
                                    <td>Banking, ERP, CRM</td>
                                    <td>Social media, IoT, real-time apps</td>
                                </tr>
                            </table>

                            <h2>When to Use SQL</h2>

                            <h3>Perfect Use Cases:</h3>
                            <ol style="margin: 1rem 0; margin-left: 2rem;">
                                <li><strong>Complex relationships:</strong> Multiple tables with many joins</li>
                                <li><strong>ACID compliance required:</strong> Financial transactions, banking</li>
                                <li><strong>Structured data:</strong> Data fits well in tables</li>
                                <li><strong>Complex queries:</strong> Aggregations, analytics, reporting</li>
                                <li><strong>Data integrity critical:</strong> Foreign keys, constraints needed</li>
                            </ol>

                            <h3>Real-World Examples:</h3>
                            <div class="code-block">Banking System:
- Account balances (ACID critical!)
- Transactions (must be consistent)
- Complex queries (fraud detection)
- Strong data integrity needed
→ PostgreSQL, Oracle

E-commerce Platform:
- Inventory management
- Order processing
- User authentication
- Payment processing
→ MySQL, PostgreSQL

Enterprise Resource Planning (ERP):
- Employee records
- Payroll
- Complex reporting
- Data relationships
→ SQL Server, Oracle</div>

                            <h2>When to Use NoSQL</h2>

                            <h3>Perfect Use Cases:</h3>
                            <ol style="margin: 1rem 0; margin-left: 2rem;">
                                <li><strong>Massive scale:</strong> Billions of records, horizontal scaling</li>
                                <li><strong>Flexible schema:</strong> Data structure evolves frequently</li>
                                <li><strong>High throughput:</strong> Millions of writes/second</li>
                                <li><strong>Geo-distributed:</strong> Data across multiple data centers</li>
                                <li><strong>Simple queries:</strong> Get by ID, no complex joins</li>
                            </ol>

                            <h3>Real-World Examples:</h3>
                            <div class="code-block">Social Media (Twitter, Instagram):
- User profiles (flexible schema)
- Posts, tweets (billions of records)
- Timeline feeds (high read throughput)
- Global user base (geo-distributed)
→ MongoDB, Cassandra

IoT / Sensor Data:
- Millions of devices
- Time-series data
- Write-heavy (constant updates)
- Simple queries (latest readings)
→ Cassandra, InfluxDB

Content Management:
- Articles, blog posts
- Flexible content structure
- Fast reads
- Search-heavy
→ MongoDB, Elasticsearch

Real-Time Analytics:
- Click streams
- Event tracking
- High write volume
- Simple aggregations
→ Cassandra, DynamoDB</div>

                            <h2>ACID vs BASE</h2>

                            <h3>ACID (SQL Databases)</h3>
                            <div class="code-block">A - Atomicity: All or nothing
   Transaction succeeds completely or fails completely

C - Consistency: Data follows all rules
   Constraints, foreign keys maintained

I - Isolation: Transactions don't interfere
   Concurrent transactions isolated from each other

D - Durability: Changes are permanent
   Once committed, survives crashes

Example: Bank Transfer
BEGIN TRANSACTION;
  UPDATE accounts SET balance = balance - 100 WHERE id = 1;
  UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;

If power fails after first UPDATE:
- Both updates rollback (Atomicity)
- Money not lost (Consistency)
- Other transactions don't see partial state (Isolation)
- After commit, data is safe (Durability)</div>

                            <h3>BASE (NoSQL Databases)</h3>
                            <div class="code-block">BA - Basically Available
     System always responds (even if stale)

S - Soft state
    State may change over time (even without input)

E - Eventually consistent
    System will become consistent eventually

Example: Facebook Like Count
User likes post → Counter increments
- Might show old count briefly (Soft state)
- Eventually all servers show correct count (Eventually consistent)
- System always responds (Basically available)

Trade-off: Give up immediate consistency for availability and performance</div>

                            <h2>Real-World Case Studies</h2>

                            <h3>Instagram: Started SQL, Added NoSQL</h3>
                            <div class="code-block">2010-2011: PostgreSQL only
- Structured user data
- Good for starting
- Hit scaling limits at 10M users

2011+: Added Cassandra
- Store feed data (billions of posts)
- Horizontal scaling
- High write throughput

2024: Hybrid approach
- PostgreSQL: User accounts, relationships
- Cassandra: Feed data, photos metadata
- Redis: Caching, real-time features

Lesson: Use right tool for each job!</div>

                            <h3>Netflix: All-in on NoSQL</h3>
                            <div class="code-block">Challenge:
- 230M+ subscribers globally
- Billions of viewing events/day
- Need 99.99% availability

Solution: Cassandra
- Multi-datacenter replication
- Linear scalability
- No single point of failure
- Handles massive write volume

Why not SQL?
- Too hard to scale horizontally
- Single point of failure
- Can't handle write volume

Result: 99.99% uptime with Cassandra</div>

                            <h3>Uber: MongoDB for Geo Data</h3>
                            <div class="code-block">Challenge:
- Store driver locations (lat/long)
- Flexible schema (attributes change)
- Geospatial queries
- Real-time updates

Solution: MongoDB
- Geospatial indexes
- Flexible document model
- Fast writes for location updates
- Horizontal scaling

Also uses PostgreSQL for:
- Trip history
- Payment transactions
- Structured data

Hybrid: Best of both worlds!</div>

                            <h2>The Polyglot Persistence Approach</h2>
                            <p>Modern applications often use multiple databases for different needs:</p>

                            <div class="code-block">Example: E-commerce Platform

PostgreSQL:
- User accounts
- Order history
- Payment transactions
- Inventory management

MongoDB:
- Product catalog
- User reviews
- Flexible product attributes

Redis:
- Session storage
- Shopping cart
- Real-time inventory cache

Elasticsearch:
- Product search
- Full-text search
- Analytics

Each database chosen for specific strengths!</div>

                            <h2>Migration Considerations</h2>

                            <h3>SQL to NoSQL Migration</h3>
                            <div class="code-block">Challenges:
- Denormalize data (no more joins)
- Handle eventual consistency
- Rewrite queries
- Data migration

Example: User Orders
SQL (normalized):
  users table + orders table (join needed)

NoSQL (denormalized):
  Embed orders in user document
  Trade-off: Duplicate data, but faster reads</div>

                            <h3>NoSQL to SQL Migration</h3>
                            <div class="code-block">Challenges:
- Define rigid schema
- Normalize data
- Handle relationships
- Ensure data consistency

Why migrate back?
- Need complex queries
- ACID transactions required
- Data integrity issues
- Simpler data model</div>

                            <h2>Best Practices</h2>

                            <ol style="margin: 1rem 0; margin-left: 2rem;">
                                <li><strong>Start with SQL:</strong> Unless you have specific NoSQL needs</li>
                                <li><strong>Don't over-engineer:</strong> SQL scales to millions of users</li>
                                <li><strong>Use NoSQL when:</strong> Scale is critical or schema is very flexible</li>
                                <li><strong>Consider hybrid:</strong> Use both for different parts of your system</li>
                                <li><strong>Understand trade-offs:</strong> Consistency vs Availability</li>
                                <li><strong>Test thoroughly:</strong> Different databases have different performance characteristics</li>
                                <li><strong>Plan for scale:</strong> Consider future growth, not just current needs</li>
                                <li><strong>Monitor performance:</strong> Database is often the bottleneck</li>
                            </ol>

                            <h2>Decision Framework</h2>

                            <div class="code-block">Choose SQL if:
✓ Complex relationships between entities
✓ Need ACID transactions
✓ Data is structured and stable
✓ Complex queries and joins
✓ Strong data integrity requirements
✓ Vertical scaling sufficient

Choose NoSQL if:
✓ Massive scale (billions of records)
✓ Flexible/evolving schema
✓ High write throughput
✓ Horizontal scaling required
✓ Simple key-based queries
✓ Geo-distributed data
✓ Eventual consistency acceptable

Choose Both if:
✓ Large, complex application
✓ Different data access patterns
✓ Want best tool for each job
✓ Can manage multiple databases</div>

                            <h2>Summary</h2>
                            <p>SQL databases provide structure, ACID transactions, and powerful querying for complex relationships. NoSQL databases offer flexibility, horizontal scalability, and high performance for simple queries at massive scale. SQL is best for structured data with complex relationships and strong consistency needs (banking, ERP). NoSQL excels at flexible schemas, massive scale, and high throughput (social media, IoT). Modern applications often use both - polyglot persistence - choosing the right database for each specific need. Start with SQL unless you have specific requirements for NoSQL's strengths.</p>
                        `,
                        interviews: [
                            {
                                question: "What's the fundamental difference between SQL and NoSQL databases?",
                                answer: "SQL: Structured tables with fixed schemas, relationships via foreign keys, ACID transactions, powerful joins, vertical scaling. NoSQL: Flexible schema, various data models (document/key-value/column/graph), BASE (eventual consistency), horizontal scaling. SQL prioritizes consistency and structure, NoSQL prioritizes scalability and flexibility. Example: SQL for banking (ACID critical), NoSQL for social media (massive scale)."
                            },
                            {
                                question: "Explain ACID vs BASE. Why does this matter?",
                                answer: "ACID (SQL): Atomicity (all-or-nothing), Consistency (data rules enforced), Isolation (transactions don't interfere), Durability (changes permanent). BASE (NoSQL): Basically Available (always responds), Soft state (can change), Eventually consistent (becomes consistent over time). Matters because: ACID ensures strong consistency (critical for money), BASE enables high availability and performance (acceptable for likes/views). Trade-off: consistency vs availability."
                            },
                            {
                                question: "When would you choose NoSQL over SQL?",
                                answer: "Choose NoSQL when: 1) Massive scale (billions of records, horizontal scaling needed), 2) Flexible schema (data structure evolves), 3) High throughput (millions writes/sec), 4) Simple queries (get by ID, no joins), 5) Geo-distributed, 6) Eventual consistency acceptable. Examples: Social media feeds, IoT sensor data, real-time analytics, content management. SQL can't scale horizontally easily."
                            },
                            {
                                question: "Describe Instagram's hybrid SQL + NoSQL approach",
                                answer: "Instagram started with PostgreSQL for all data. At 10M+ users, added Cassandra for scalability. Current: PostgreSQL for structured data (user accounts, relationships), Cassandra for massive data (feed, photos metadata), Redis for caching. Hybrid approach: Use SQL for complex relationships and ACID needs, NoSQL for massive scale and high throughput. Right tool for each job."
                            },
                            {
                                question: "What is polyglot persistence? Give an example.",
                                answer: "Polyglot persistence: Using multiple database types in one application, each for its strengths. E-commerce example: PostgreSQL (orders, payments - ACID needed), MongoDB (product catalog - flexible schema), Redis (sessions, cart - fast access), Elasticsearch (search - full-text). Choose best database for each specific need rather than one-size-fits-all. Modern approach for complex apps."
                            }
                        ]
                    },
                    {
                        id: 'database-sharding',
                        title: 'Database Sharding',
                        duration: '55 min',
                        content: `
                            <h2>What is Database Sharding?</h2>
                            <p>Database sharding is a horizontal partitioning technique that splits a large database into smaller, more manageable pieces called "shards". Each shard contains a subset of the total data and runs on a separate database server. Think of it like splitting a massive library into multiple smaller libraries across different buildings - each building (shard) holds a portion of the books (data), but together they contain the complete collection.</p>

                            <p>Sharding becomes necessary when a single database server can no longer handle the load. As your data grows from gigabytes to terabytes, and your users grow from thousands to millions, vertical scaling (upgrading hardware) eventually hits a wall. Sharding is how companies like Instagram, Twitter, and Uber handle billions of rows of data.</p>

                            <h2>Why Shard? The Problem We're Solving</h2>

                            <h3>The Single Database Bottleneck</h3>
                            <div class="code-block">Single Database Problem:

[App Servers] → [Single Database Server]

Problems as you scale:
1. CPU bottleneck - too many queries to process
2. RAM bottleneck - can't fit working set in memory
3. Disk I/O bottleneck - can't read/write fast enough
4. Network bottleneck - too much data transfer
5. Backup/restore takes hours or days

Example: 100 million users, 1 billion records
- Database size: 5 TB
- Queries per second: 100,000
- Single server: $50,000/month, still slow</div>

                            <h3>After Sharding</h3>
                            <div class="code-block">Sharded Architecture:

[App Servers]
       ↓
[Shard Router / Query Router]
       ↓
   ┌───┴───┬────┬────┐
   ↓       ↓    ↓    ↓
[Shard 1][Shard 2][Shard 3][Shard 4]
25M users 25M users 25M users 25M users
1.25 TB   1.25 TB   1.25 TB   1.25 TB

Each shard:
- Handles 1/4 of the queries
- 1/4 of the data
- Independent backups
- Can be on commodity hardware</div>

                            <h2>Sharding Strategies</h2>

                            <h3>1. Hash-Based Sharding (Most Common)</h3>
                            <p>Apply a hash function to a shard key to determine which shard stores the data.</p>

                            <div class="code-block">Hash Function Example:

Shard key: user_id
Hash function: shard = user_id % number_of_shards

User 1234: 1234 % 4 = 2 → Shard 2
User 5678: 5678 % 4 = 2 → Shard 2
User 9999: 9999 % 4 = 3 → Shard 3

Pseudocode:
function getShard(user_id, num_shards) {
  return user_id % num_shards;
}

Pros:
✓ Even distribution of data
✓ Simple to implement
✓ Good for random access patterns

Cons:
✗ Adding shards requires resharding (expensive!)
✗ Range queries span multiple shards
✗ Related data might be on different shards</div>

                            <h4>Real Example: Instagram's Early Sharding</h4>
                            <div class="code-block">Instagram (2012):

Problem: 30 million users on PostgreSQL
Solution: Hash-based sharding

Shard key: user_id
Number of shards: Started with 1000 logical shards

Why 1000 logical shards?
- Physical servers: 50 (initially)
- Each server: 20 logical shards
- Can rebalance without changing hash function
- Future-proof for growth

SQL Example:
SELECT * FROM users WHERE user_id = 123456;

Step 1: Hash 123456 % 1000 = 456
Step 2: Logical shard 456 is on physical server 23
Step 3: Query server 23

Result: Query hits only 1 shard instead of scanning all data!</div>

                            <h3>2. Range-Based Sharding</h3>
                            <p>Divide data based on ranges of the shard key value.</p>

                            <div class="code-block">Range-Based Example:

Shard key: user_id

Shard 1: user_id 1 to 25,000,000
Shard 2: user_id 25,000,001 to 50,000,000
Shard 3: user_id 50,000,001 to 75,000,000
Shard 4: user_id 75,000,001 to 100,000,000

Query: Get users with ID between 24M and 26M
Result: Only query Shard 1 and Shard 2 (range spans)

Pros:
✓ Range queries are efficient
✓ Easy to add new shards (add new range)
✓ Simple logic, easy to understand

Cons:
✗ Uneven distribution if data isn't uniform
✗ Hotspots (newest users all on same shard)
✗ Requires monitoring for rebalancing</div>

                            <h4>Real Example: Twitter's Snowflake IDs</h4>
                            <div class="code-block">Twitter's Snowflake ID Structure:

64-bit ID: [Timestamp][Datacenter][Worker][Sequence]

Tweet ID: 1234567890123456789
Range sharding by time:

Shard 1: Tweets 2015-2017
Shard 2: Tweets 2018-2019
Shard 3: Tweets 2020-2021
Shard 4: Tweets 2022-2024

Benefit: Queries like "show recent tweets" only hit latest shards
Problem: Write-heavy on newest shard (solved with replication)</div>

                            <h3>3. Geographic/Directory-Based Sharding</h3>
                            <p>Shard data based on geographic location or maintain a lookup table.</p>

                            <div class="code-block">Geographic Sharding:

Shard by region:
- Shard US-East: Users in USA/Canada
- Shard EU-West: Users in Europe
- Shard Asia-Pacific: Users in Asia
- Shard South-America: Users in South America

Lookup:
user_id → region → shard_server

Pros:
✓ Low latency (data close to users)
✓ Regulatory compliance (GDPR - data in EU)
✓ Flexible - can use any sharding logic

Cons:
✗ Uneven distribution (more US users than others)
✗ Lookup table is single point of failure
✗ Cross-region queries are slow</div>

                            <h4>Real Example: Uber's Geo-Sharding</h4>
                            <div class="code-block">Uber's Ringpop Sharding:

Problem: Rides in different cities don't need to talk to each other
Solution: Shard by city

Shard SF: All rides/drivers in San Francisco
Shard NYC: All rides/drivers in New York
Shard LON: All rides/drivers in London

When user requests ride:
1. Detect user location: GPS coordinates
2. Map to city: San Francisco
3. Route to SF shard
4. All queries for that ride stay in SF shard

Benefits:
- Super fast queries (no cross-shard communication)
- Regional outages don't affect other cities
- Can deploy updates city-by-city
- Data residency compliance</div>

                            <h2>Choosing a Shard Key</h2>
                            <p>The shard key is the most critical decision in sharding. A bad shard key can make your system slower than before sharding!</p>

                            <h3>What Makes a Good Shard Key?</h3>
                            <table class="table">
                                <tr>
                                    <th>Characteristic</th>
                                    <th>Why It Matters</th>
                                    <th>Example</th>
                                </tr>
                                <tr>
                                    <td>High Cardinality</td>
                                    <td>Many unique values ensure even distribution</td>
                                    <td>✓ user_id (millions of values)<br>✗ country (only ~200 values)</td>
                                </tr>
                                <tr>
                                    <td>Even Distribution</td>
                                    <td>Prevents hotspots where one shard gets all traffic</td>
                                    <td>✓ UUID (random)<br>✗ signup_date (recent dates get all writes)</td>
                                </tr>
                                <tr>
                                    <td>Query Pattern Match</td>
                                    <td>Most queries should include the shard key</td>
                                    <td>✓ user_id (if queries are user-centric)<br>✗ last_login (rarely queried)</td>
                                </tr>
                                <tr>
                                    <td>Immutable</td>
                                    <td>Changing shard key means moving data between shards</td>
                                    <td>✓ user_id (never changes)<br>✗ email (users can change)</td>
                                </tr>
                            </table>

                            <div class="code-block">Bad Shard Key Example:

Shard by: timestamp (when record created)

Problem: All new writes go to the latest shard!

Timeline:
Hour 1: All writes → Shard 10 (100% load)
Hour 1: Shard 1-9 (0% load, wasted resources)

Result: Hotspot on Shard 10, others idle

Good Shard Key Example:

Shard by: user_id (with hash function)

Result: Writes distributed evenly across all shards
- Each shard gets ~equal writes
- No hotspots
- All resources utilized</div>

                            <h2>Challenges of Sharding</h2>

                            <h3>1. Cross-Shard Queries (The Biggest Pain)</h3>
                            <div class="code-block">Problem: Query data across multiple shards

Example: Get all orders over $1000

Without sharding:
SELECT * FROM orders WHERE amount > 1000;
→ One query, fast

With sharding (4 shards):
→ Query Shard 1: SELECT * FROM orders WHERE amount > 1000;
→ Query Shard 2: SELECT * FROM orders WHERE amount > 1000;
→ Query Shard 3: SELECT * FROM orders WHERE amount > 1000;
→ Query Shard 4: SELECT * FROM orders WHERE amount > 1000;
→ Merge results from all shards
→ Sort combined results
→ Return to app

Result: 4x network calls, slower response time</div>

                            <h3>2. Cross-Shard Joins</h3>
                            <div class="code-block">Problem: Joining data from different shards

Example: Get user and their orders

User 123 on Shard 1
Orders for User 123 on Shard 3

Without sharding:
SELECT users.name, orders.total
FROM users
JOIN orders ON users.id = orders.user_id
WHERE users.id = 123;
→ Single query, database handles join

With sharding:
→ Query Shard 1 for user 123
→ Query Shard 3 for orders (where user_id = 123)
→ Application does the join in memory
→ Return combined result

Solution: Denormalize data (store user info with orders)</div>

                            <h3>3. Resharding (Adding/Removing Shards)</h3>
                            <div class="code-block">Scenario: Growing from 4 shards to 8 shards

Old hash function: shard = user_id % 4
New hash function: shard = user_id % 8

Problem: Data needs to move!

User 10: 10 % 4 = 2 (Shard 2)
User 10: 10 % 8 = 2 (Shard 2) ✓ Same

User 11: 11 % 4 = 3 (Shard 3)
User 11: 11 % 8 = 3 (Shard 3) ✓ Same

User 12: 12 % 4 = 0 (Shard 0)
User 12: 12 % 8 = 4 (Shard 4) ✗ Needs to move!

Approximately 50% of data needs to move to new shards!

Solution: Consistent Hashing (covered in Module 9)
- Minimizes data movement when adding shards
- Only ~1/N data moves when adding Nth shard</div>

                            <h3>4. Distributed Transactions</h3>
                            <div class="code-block">Problem: Transaction spanning multiple shards

Example: Transfer money between users on different shards

BEGIN TRANSACTION;
  UPDATE accounts SET balance = balance - 100 WHERE user_id = 123; (Shard 1)
  UPDATE accounts SET balance = balance + 100 WHERE user_id = 456; (Shard 2)
COMMIT;

Without sharding: Database handles atomicity (all or nothing)

With sharding:
- What if Shard 1 succeeds but Shard 2 fails?
- User 123 loses $100, User 456 doesn't receive it!

Solution: Two-Phase Commit (2PC) or Saga Pattern
- Coordinator ensures both shards commit or both rollback
- Complex, slower, but maintains consistency</div>

                            <h2>Real-World Case Study: Stack Overflow</h2>

                            <h3>The Setup</h3>
                            <div class="code-block">Stack Overflow (2013):

Traffic: 30 million users/month
Data: Hundreds of millions of questions/answers
Database: SQL Server

Decision: Did NOT shard!

Why?
1. Vertical scaling sufficient (beefy servers)
2. Smart caching (Redis) reduced DB load by 90%
3. Read replicas handled read traffic
4. Sharding complexity not worth it (yet)

Architecture:
[App Servers]
      ↓
[Redis Cache] → 90% hits, never touch DB
      ↓
[Primary SQL Server] → Write + 10% reads
      ↓
[Read Replicas] → Handle read overflow

Result: Handled 50M+ users without sharding!</div>

                            <h3>Lesson: Don't Shard Until You Have To</h3>
                            <p>Stack Overflow proves that sharding isn't always necessary. Consider alternatives first:</p>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li><strong>Caching:</strong> Can eliminate 80-90% of database queries</li>
                                <li><strong>Read replicas:</strong> Handle read-heavy workloads</li>
                                <li><strong>Indexing:</strong> Optimize slow queries first</li>
                                <li><strong>Vertical scaling:</strong> Upgrade hardware before going distributed</li>
                                <li><strong>Archiving:</strong> Move old data to cheaper storage</li>
                            </ul>

                            <h2>Instagram's Sharding Evolution</h2>

                            <div class="code-block">2010: Single PostgreSQL Database
- 100,000 users
- Simple, worked fine

2011: Vertical Scaling (400M raised)
- Upgraded to powerful servers
- Added read replicas
- 10 million users

2012: Time to Shard (Facebook acquisition)
- 100+ million users
- 50+ GB new photos per day
- Single DB couldn't handle it

Sharding Strategy:
1. Shard key: user_id
2. Hash function: user_id % 1000 (1000 logical shards)
3. Physical servers: 50 (each hosting ~20 logical shards)
4. Can rebalance by moving logical shards between servers

Data Model Changes:
- Users table: Sharded by user_id
- Photos table: Sharded by user_id (photos stay with user)
- Relationships: Also sharded by user_id
- Denormalized data to avoid cross-shard joins

Benefits:
- Linear scalability (add more servers as needed)
- 10x improvement in response times
- Handled exponential user growth
- Each shard manageable size for backups</div>

                            <h2>When to Shard?</h2>

                            <table class="table">
                                <tr>
                                    <th>Signal</th>
                                    <th>Threshold</th>
                                    <th>Action</th>
                                </tr>
                                <tr>
                                    <td>Database Size</td>
                                    <td>&gt; 1 TB</td>
                                    <td>Consider sharding</td>
                                </tr>
                                <tr>
                                    <td>Query Throughput</td>
                                    <td>&gt; 10,000 QPS</td>
                                    <td>Try read replicas first</td>
                                </tr>
                                <tr>
                                    <td>Write Throughput</td>
                                    <td>&gt; 5,000 writes/sec</td>
                                    <td>Sharding likely needed</td>
                                </tr>
                                <tr>
                                    <td>Query Latency</td>
                                    <td>&gt; 100ms avg</td>
                                    <td>Optimize queries, then shard</td>
                                </tr>
                                <tr>
                                    <td>Single Table Size</td>
                                    <td>&gt; 100M rows</td>
                                    <td>Good candidate for sharding</td>
                                </tr>
                            </table>

                            <h2>Sharding Best Practices</h2>

                            <div class="code-block">1. Start with Logical Shards
   - More logical shards than physical servers
   - Example: 1000 logical shards on 50 servers
   - Easy to rebalance without changing hash function

2. Choose Shard Key Carefully
   - High cardinality (many unique values)
   - Immutable (never changes)
   - Matches query patterns (queries include shard key)

3. Denormalize Data
   - Store related data together in same shard
   - Avoid cross-shard joins
   - Duplicate data if needed

4. Use Consistent Hashing
   - Minimizes data movement when resharding
   - Standard in modern distributed systems

5. Monitor Shard Health
   - Track queries per shard
   - Monitor data distribution
   - Detect hotspots early

6. Have Resharding Strategy
   - Plan for growth before you need it
   - Test resharding process in staging
   - Automate as much as possible

7. Keep Code Shard-Aware
   - Application knows about sharding
   - Include shard key in queries
   - Route queries to correct shard</div>

                            <h2>Summary</h2>
                            <p>Database sharding is a powerful technique for scaling databases horizontally. By splitting data across multiple servers, you can handle massive amounts of data and traffic. However, sharding introduces complexity: cross-shard queries, distributed transactions, and resharding challenges. The key is choosing the right shard key and understanding when sharding is truly necessary. Many systems can scale far without sharding using caching, read replicas, and vertical scaling. When you do shard, plan carefully and design your application to work with the sharded architecture.</p>

                            <p><strong>Remember:</strong> Shard when you must, not when you can. The best shard is the one you don't need yet.</p>
                        `,
                        interviews: [
                            {
                                question: "What is database sharding and why would you use it?",
                                answer: "Sharding is horizontal partitioning that splits a database into smaller pieces (shards) across multiple servers. Use it when a single database can't handle the load due to data size (> 1TB), high write throughput (> 5K writes/sec), or when vertical scaling becomes too expensive. Each shard contains a subset of data and operates independently."
                            },
                            {
                                question: "Explain the difference between hash-based and range-based sharding.",
                                answer: "Hash-based sharding uses a hash function (e.g., user_id % num_shards) to distribute data evenly but makes range queries inefficient and resharding expensive. Range-based sharding divides data by ranges (e.g., user_id 1-25M on Shard 1) making range queries efficient but can create hotspots if data isn't uniformly distributed. Instagram uses hash-based; Twitter uses range-based for time-series data."
                            },
                            {
                                question: "What makes a good shard key?",
                                answer: "A good shard key has: 1) High cardinality (many unique values like user_id), 2) Even distribution (no hotspots), 3) Matches query patterns (queries include the shard key), 4) Immutable (never changes). Bad example: timestamp (creates hotspots on latest shard). Good example: user_id with hash function (even distribution, high cardinality)."
                            },
                            {
                                question: "What are the main challenges of sharding?",
                                answer: "Main challenges: 1) Cross-shard queries require querying multiple shards and merging results, 2) Cross-shard joins must be done in application code, 3) Resharding (adding shards) requires data migration, 4) Distributed transactions need 2PC or Saga patterns, 5) Increased operational complexity. Solution: Choose shard key that keeps related data together, denormalize data, use consistent hashing."
                            },
                            {
                                question: "When should you NOT shard your database?",
                                answer: "Don't shard if: 1) Database is under 1TB, 2) Caching can handle 80%+ of queries, 3) Read replicas can handle read traffic, 4) Vertical scaling hasn't been exhausted, 5) Query optimization hasn't been done. Stack Overflow handles 50M+ users without sharding using aggressive caching and read replicas. Sharding adds complexity - avoid it until absolutely necessary."
                            }
                        ]
                    },
                    {
                        id: 'database-replication',
                        title: 'Database Replication',
                        duration: '50 min',
                        content: `
                            <h2>What is Database Replication?</h2>
                            <p>Database replication is the process of copying and maintaining database data across multiple servers (replicas). Instead of having one single database server, you have multiple copies of your data running on different machines. Think of it like having photocopies of an important document stored in different locations - if one copy is destroyed, you still have the others.</p>

                            <p>Replication serves three primary purposes: improving read performance (distribute read queries across multiple servers), increasing availability (if one server fails, others keep running), and providing data backup/disaster recovery. Companies like Netflix, YouTube, and Amazon rely heavily on replication to serve millions of users simultaneously.</p>

                            <h2>Why Replicate? The Problems We're Solving</h2>

                            <h3>Single Database Problems</h3>
                            <div class="code-block">Single Database Server:

[App Servers] → [Single Database]

Problems:
1. Read Bottleneck
   - 100,000 read queries per second
   - Single DB can't handle the load
   - Slow response times

2. Single Point of Failure
   - Server goes down = entire app is down
   - Hardware failure = data loss
   - No disaster recovery

3. No Geographic Distribution
   - Users in Asia querying US server
   - High latency (200-500ms)
   - Poor user experience

Example Real Numbers:
- Database handles: 10,000 QPS (queries per second)
- Your app needs: 50,000 QPS
- Result: Database is bottleneck!</div>

                            <h3>With Replication</h3>
                            <div class="code-block">Primary-Replica Architecture:

              [App Servers]
                    ↓
         ┌──────────┴──────────┐
         ↓                     ↓
   [Primary DB]          [Replicas]
   (Writes only)         (Reads only)
         ↓                ↓    ↓    ↓
    Replication → [Replica 1][Replica 2][Replica 3]
                   US-East    US-West    EU

Benefits:
✓ Read scaling: 40,000 reads across replicas, 10,000 writes to primary
✓ High availability: Primary fails? Promote replica to primary
✓ Low latency: Users read from nearby replica
✓ Backup: Replicas serve as live backups</div>

                            <h2>Replication Strategies</h2>

                            <h3>1. Primary-Replica (Master-Slave) - Most Common</h3>
                            <p>One primary database handles all writes. Multiple replicas receive copies of the data and handle read queries.</p>

                            <div class="code-block">Architecture:

[Primary Database]
  ↓ (replication log)
  ├─→ [Replica 1] (reads)
  ├─→ [Replica 2] (reads)
  └─→ [Replica 3] (reads)

Write Flow:
1. App sends write to Primary
2. Primary writes to its database
3. Primary sends changes to Replicas
4. Replicas apply changes
5. Replicas now have updated data

Read Flow:
1. App sends read to any Replica (load balanced)
2. Replica returns data
3. Primary never touched (saves resources)

Pros:
✓ Simple to understand and implement
✓ Excellent for read-heavy workloads (90% reads, 10% writes)
✓ Replicas can be geographically distributed
✓ Easy to add more read replicas

Cons:
✗ Replication lag (replica might be slightly behind)
✗ Primary is single point of failure for writes
✗ Doesn't scale writes (all writes still go to one server)</div>

                            <h4>Real Example: YouTube</h4>
                            <div class="code-block">YouTube's Read-Heavy Workload:

Traffic Pattern:
- Reads (video views, comments, likes): 99%
- Writes (new uploads, comments): 1%

Architecture:
1 Primary Database (writes)
- New video uploads
- New comments
- User profile updates

50+ Read Replicas (reads)
- Video metadata lookups
- Comment retrieval
- User profile views
- Recommendation queries

Result:
- Primary handles: 10,000 writes/sec
- Each replica handles: 5,000 reads/sec
- Total capacity: 250,000 reads/sec + 10,000 writes/sec

Without replication: Single DB would need to handle 260,000 QPS
→ Impossible for single server!</div>

                            <h3>2. Primary-Primary (Multi-Master)</h3>
                            <p>Multiple databases can accept writes simultaneously. Changes are then synchronized between all primary databases.</p>

                            <div class="code-block">Architecture:

[Primary 1] ⟷ (bi-directional sync) ⟷ [Primary 2]
    ↓                                        ↓
[Replicas]                              [Replicas]

Write Flow:
1. App in US writes to Primary 1 (US)
2. App in EU writes to Primary 2 (EU)
3. Both primaries sync changes to each other
4. Conflict resolution if both modified same data

Example: User Profile Updates

Scenario: User 123 updates profile
- US server writes to Primary 1: name = "John Smith"
- EU server writes to Primary 2: name = "Jonathan Smith"
- Both writes happen at same time (race condition!)

Conflict Resolution Options:
a) Last-Write-Wins: Timestamp determines winner
b) First-Write-Wins: First write is kept
c) Application-level: Let app decide
d) Merge: Combine changes (complex!)

Pros:
✓ Writes can be distributed geographically
✓ No single point of failure for writes
✓ Better write performance (load distributed)
✓ Good for multi-region active-active setup

Cons:
✗ Complex conflict resolution
✗ Risk of data inconsistency
✗ Harder to implement and maintain
✗ Not suitable for all use cases</div>

                            <h4>Real Example: Google Spanner</h4>
                            <div class="code-block">Google Spanner (Multi-Master):

Use Case: Global database for Gmail, Google Ads

Setup:
- Primary databases in US, EU, Asia
- Each accepts writes for its region
- Synchronous replication between primaries
- Uses TrueTime API for global consistency

How It Works:
1. User in Japan writes to Asia primary
2. User in USA writes to US primary
3. Both primaries sync with each other
4. Atomic clocks + GPS ensure ordering
5. Consistent view across all regions

Result:
- Write latency: 50-100ms (includes sync)
- Read latency: < 10ms (local replica)
- Strongly consistent across the globe
- Can survive entire datacenter outage</div>

                            <h3>3. Synchronous vs Asynchronous Replication</h3>

                            <h4>Synchronous Replication</h4>
                            <div class="code-block">Synchronous Flow:

Write request arrives at Primary
   ↓
1. Primary writes to its disk
2. Primary sends to Replica 1
3. Wait for Replica 1 ACK
4. Primary sends to Replica 2
5. Wait for Replica 2 ACK
6. Return success to app

Timeline:
App Write Request → [50ms] → Success Response

Pros:
✓ Strong consistency (replicas always up-to-date)
✓ No data loss if primary fails
✓ Reads from replicas always show latest data

Cons:
✗ Slower writes (wait for replicas)
✗ If replica is slow/down, writes are slow/blocked
✗ Higher latency for users</div>

                            <h4>Asynchronous Replication</h4>
                            <div class="code-block">Asynchronous Flow:

Write request arrives at Primary
   ↓
1. Primary writes to its disk
2. Return success to app immediately
3. In background: Send to replicas
4. Replicas apply changes (eventually)

Timeline:
App Write Request → [5ms] → Success Response
Background: Replicas updated in 100-500ms

Pros:
✓ Fast writes (don't wait for replicas)
✓ Primary not affected by slow replicas
✓ Better user experience (low latency)

Cons:
✗ Replication lag (replicas behind primary)
✗ Risk of data loss if primary fails before replication
✗ Reads from replicas might show stale data</div>

                            <h4>Real Example: MySQL Replication</h4>
                            <div class="code-block">MySQL Default: Asynchronous

Scenario: E-commerce site

1. User posts product review
   Write to Primary: "Great product! 5 stars"
   Response to user: "Review posted!" (5ms)

2. User refreshes page immediately
   Read from Replica: Review not there yet (replication lag)
   User sees: No review (confusing!)

3. After 200ms: Replica catches up
   User refreshes again: Review appears

This is called "Read Your Own Writes" problem

Solutions:
a) Read from primary after write (sacrifices read scaling)
b) Sticky sessions (same user → same replica)
c) Add version numbers (read from replica with version >= X)
d) Accept eventual consistency (educate users)</div>

                            <h2>Replication Lag</h2>

                            <div class="code-block">What is Replication Lag?

Definition: Time difference between when data is written to
primary and when it appears on replicas

Example Timeline:
00:00.000 - Write reaches Primary
00:00.005 - Primary writes to disk
00:00.010 - Primary sends to Replicas
00:00.050 - Replica 1 receives (50ms lag)
00:00.100 - Replica 2 receives (100ms lag)
00:00.200 - Replica 3 receives (200ms lag)

Factors Affecting Lag:
1. Network latency (geographic distance)
2. Replica load (busy replicas apply changes slower)
3. Write volume (more writes = more to replicate)
4. Disk speed on replicas
5. Replication method (parallel vs serial)

Typical Lag:
- Same datacenter: 10-50ms
- Cross-region (US ↔ EU): 100-300ms
- Under heavy load: Can grow to seconds or minutes!</div>

                            <h3>Problems Caused by Replication Lag</h3>

                            <div class="code-block">1. Read Your Own Writes Problem

User posts comment → Write to Primary
User refreshes page → Read from Replica
Replica hasn't caught up yet → Comment missing!
User: "My comment disappeared!"

2. Moving Backwards in Time

Request 1: Read from Replica 1 (50ms lag) → Shows 10 comments
Request 2: Read from Replica 2 (200ms lag) → Shows 8 comments
User: "Comments are disappearing!"

3. Monotonic Reads Violation

User reads data: Post has 100 likes (from Replica 1)
User reads again: Post has 95 likes (from Replica 2 with more lag)
User: "Likes are decreasing?"

4. Causality Violations

Alice posts: "What's 2+2?"
Bob replies: "It's 4"
Charlie sees Bob's reply before seeing Alice's question
Charlie: "What is Bob talking about?"</div>

                            <h2>Real-World Case Study: Instagram</h2>

                            <div class="code-block">Instagram's Replication Strategy (2016):

Database: PostgreSQL (Primary-Replica)

Setup:
1 Primary (US-East)
- All writes (posts, likes, comments, follows)

12 Read Replicas
- 6 in US-East (low latency for US users)
- 3 in US-West (West coast users)
- 3 in EU (European users)

Traffic Pattern:
- Writes: 50,000/sec (handled by 1 primary)
- Reads: 600,000/sec (distributed across 12 replicas)
- Read/Write ratio: 12:1

Replication Method:
- Asynchronous (for performance)
- Typical lag: 50-200ms
- Acceptable for social media (eventual consistency OK)

Handling "Read Your Own Writes":
Solution: After user posts photo, read from PRIMARY for
next 5 seconds, then switch to replicas

Code:
if (user.lastWrite < 5_seconds_ago) {
  readFromReplica();
} else {
  readFromPrimary(); // Just wrote, ensure they see it
}

Result:
- User always sees their own posts immediately
- Other users might see post after 50-200ms delay
- Acceptable trade-off for performance</div>

                            <h2>Failover: When Primary Goes Down</h2>

                            <div class="code-block">Automatic Failover Process:

Normal Operation:
[Primary] → [Replica 1] [Replica 2] [Replica 3]

Primary Goes Down:
1. Health check detects primary is unreachable
2. Failover coordinator picks new primary (Replica 1)
3. Promote Replica 1 to Primary
4. Point all writes to new Primary
5. Remaining replicas now replicate from new Primary

Timeline:
00:00 - Primary crashes
00:30 - Health check detects failure (30 sec)
00:45 - Coordinator decides to promote Replica 1
01:00 - Replica 1 promoted to Primary
01:05 - App servers updated to use new Primary
01:10 - Service fully restored

Downtime: ~70 seconds

Challenges:
1. Which replica to promote?
   - Most up-to-date (least lag)
   - Healthiest (best performance)
   - Geographically optimal

2. Split-brain problem
   - Old primary comes back online
   - Now you have 2 primaries!
   - Data conflicts

3. Data loss
   - Writes that weren't replicated yet are lost
   - Example: Last 200ms of writes before crash</div>

                            <h4>Real Example: GitHub Outage (2018)</h4>
                            <div class="code-block">GitHub's 24-Hour Outage:

What Happened:
1. Network partition split Primary from Replicas
2. Failover system promoted Replica to Primary
3. Old Primary came back online (split-brain!)
4. Both accepted writes for 43 seconds
5. Data conflicts: same records modified differently

Result:
- Took 24 hours to reconcile data
- Some data lost permanently
- Wrote post-mortem and improved failover logic

Lessons:
- Fencing: Ensure old primary can't accept writes
- Quorum: Require majority agreement before promoting
- Testing: Regularly test failover procedures
- Monitoring: Detect split-brain immediately</div>

                            <h2>Replication Topologies</h2>

                            <h3>1. Star Topology (Most Common)</h3>
                            <div class="code-block">        [Primary]
           ↓
    ┌──────┼──────┐
    ↓      ↓      ↓
[Replica1][Replica2][Replica3]

All replicas connect directly to primary
Simple, easy to manage</div>

                            <h3>2. Chain Topology</h3>
                            <div class="code-block">[Primary] → [Replica1] → [Replica2] → [Replica3]

Each replica replicates to next
Reduces load on primary
Higher cumulative lag</div>

                            <h3>3. Tree Topology</h3>
                            <div class="code-block">        [Primary]
           ↓
      [Replica1]
       ↓       ↓
  [Replica2][Replica3]

Multi-level replication
Scales to many replicas
Used by YouTube, Facebook</div>

                            <h2>Best Practices</h2>

                            <div class="code-block">1. Monitor Replication Lag
   - Alert if lag > threshold (e.g., 5 seconds)
   - Track lag per replica
   - Automatic remediation (stop sending reads to lagging replica)

2. Choose Right Replication Method
   - Read-heavy? → Asynchronous with many replicas
   - Need consistency? → Synchronous or semi-synchronous
   - Multi-region? → Async with conflict resolution

3. Handle Replication Lag in Application
   - Read your own writes from primary
   - Sticky sessions for related requests
   - Accept eventual consistency where possible

4. Test Failover Regularly
   - Chaos engineering: Kill primary in production
   - Measure failover time
   - Practice makes perfect

5. Replica Maintenance
   - Keep replicas on separate hardware (different failure domain)
   - Distribute geographically for disaster recovery
   - Use replicas for backups (not primary)

6. Connection Pooling
   - Separate connection pools for primary vs replicas
   - Route writes to primary pool
   - Route reads to replica pool (with load balancing)</div>

                            <h2>When to Use Replication</h2>

                            <table class="table">
                                <tr>
                                    <th>Scenario</th>
                                    <th>Replication Type</th>
                                    <th>Why</th>
                                </tr>
                                <tr>
                                    <td>Read-Heavy App (Social Media)</td>
                                    <td>Primary-Replica (Async)</td>
                                    <td>Scale reads infinitely, tolerate lag</td>
                                </tr>
                                <tr>
                                    <td>Financial Transactions</td>
                                    <td>Primary-Replica (Sync)</td>
                                    <td>No data loss, strong consistency</td>
                                </tr>
                                <tr>
                                    <td>Multi-Region App</td>
                                    <td>Primary-Primary</td>
                                    <td>Low latency writes per region</td>
                                </tr>
                                <tr>
                                    <td>High Availability</td>
                                    <td>Primary-Replica (3+ replicas)</td>
                                    <td>Survive server failures</td>
                                </tr>
                                <tr>
                                    <td>Analytics/Reporting</td>
                                    <td>Dedicated Replica</td>
                                    <td>Heavy queries don't affect production</td>
                                </tr>
                            </table>

                            <h2>Summary</h2>
                            <p>Database replication is essential for building scalable, highly available systems. Primary-replica replication is the most common pattern, perfect for read-heavy workloads like YouTube and Instagram. Choose synchronous replication when consistency is critical (banking), or asynchronous when performance matters more (social media). Always monitor replication lag and handle it in your application code. Test failover procedures regularly - you don't want to discover problems during a real outage. Replication is your first tool for scaling reads and achieving high availability.</p>

                            <p><strong>Remember:</strong> Replication is about trade-offs. You can't have perfect consistency, low latency, and infinite scalability all at once. Choose the trade-offs that match your application's needs.</p>
                        `,
                        interviews: [
                            {
                                question: "Explain the difference between synchronous and asynchronous replication.",
                                answer: "Synchronous: Primary waits for replicas to confirm they've written the data before responding to the app. Guarantees replicas are up-to-date but slower (50ms writes). Used in banking/financial systems. Asynchronous: Primary responds immediately after writing locally, replicates to replicas in background. Faster (5ms writes) but replicas can lag behind. Used in social media, YouTube. Trade-off between consistency and performance."
                            },
                            {
                                question: "What is replication lag and what problems does it cause?",
                                answer: "Replication lag is the delay between writing to primary and data appearing on replicas (typically 10-300ms). Problems: 1) Read-your-own-writes (user doesn't see their own post), 2) Moving backwards in time (see 10 comments, then 8), 3) Causality violations (see reply before question). Solutions: Read from primary after writes, sticky sessions, or accept eventual consistency."
                            },
                            {
                                question: "Describe the failover process when a primary database fails.",
                                answer: "Process: 1) Health checks detect primary is down (30 sec), 2) Failover coordinator selects best replica (least lag, healthiest), 3) Promote replica to new primary, 4) Update application to route writes to new primary, 5) Remaining replicas replicate from new primary. Typical downtime: 60-90 seconds. Challenges: split-brain (old primary comes back), data loss (unreplicated writes), choosing right replica."
                            },
                            {
                                question: "Why did Instagram separate reads and writes to different database servers?",
                                answer: "Instagram had 600,000 reads/sec vs 50,000 writes/sec (12:1 ratio). One primary handles all writes, 12 read replicas handle all reads. This allows: 1) Infinite read scaling (add more replicas), 2) Primary dedicated to writes (not overloaded), 3) Geographic distribution (replicas near users = low latency), 4) Fault tolerance (replica fails → others continue). After user writes, they read from primary for 5 seconds to ensure they see their own post."
                            },
                            {
                                question: "When would you choose primary-primary replication over primary-replica?",
                                answer: "Choose primary-primary for multi-region applications needing low-latency writes in each region. Example: Google Spanner for Gmail - US users write to US primary, EU users to EU primary. Both primaries sync. Benefits: low write latency per region, no single point of failure for writes. Downsides: complex conflict resolution, risk of data inconsistency, harder to implement. Only use when write latency matters more than complexity. Most apps use primary-replica."
                            }
                        ]
                    },
                    {
                        id: 'database-indexing',
                        title: 'Database Indexing',
                        duration: '45 min',
                        content: `
                            <h2>What is a Database Index?</h2>
                            <p>A database index is a data structure that improves the speed of data retrieval operations. Think of it like an index in a book - instead of reading every page to find a topic, you look it up in the index which tells you exactly which page to go to. Without an index, the database must scan every row in a table to find the data you're looking for (called a "full table scan"). With an index, it can jump directly to the relevant rows.</p>

                            <p>Indexing is one of the most powerful performance optimization techniques. A well-designed index can turn a query that takes minutes into one that runs in milliseconds. Companies like Amazon, Google, and Facebook rely heavily on indexes to serve billions of queries per day at lightning speed.</p>

                            <h2>The Problem: Full Table Scans</h2>

                            <div class="code-block">Without Index: Full Table Scan

Table: users (10 million rows)
Query: SELECT * FROM users WHERE email = 'john@example.com';

Process:
1. Start at first row
2. Check if email = 'john@example.com'? No
3. Move to next row
4. Check if email = 'john@example.com'? No
5. Repeat for all 10 million rows...
6. Finally find match at row 8,234,567

Result:
- Rows scanned: 10,000,000
- Time: 30 seconds
- Disk I/O: Very high
- Terrible user experience!</div>

                            <h3>With Index: Direct Lookup</h3>
                            <div class="code-block">With Index on email column:

Query: SELECT * FROM users WHERE email = 'john@example.com';

Process:
1. Look up 'john@example.com' in index (like book index)
2. Index says: "This email is at row 8,234,567"
3. Jump directly to row 8,234,567
4. Return the data

Result:
- Rows scanned: 1
- Time: 5 milliseconds (6000x faster!)
- Disk I/O: Minimal
- Happy users!</div>

                            <h2>How Indexes Work: B-Tree Structure</h2>

                            <div class="code-block">B-Tree Index (Most Common):

Think of it as a tree structure that's sorted

                    [M]
                  /     \\
             [C-G]      [N-Z]
            /   |   \\      /   \\
         [A-B][D-F][H-L] [M-P][Q-Z]
           ↓    ↓    ↓    ↓    ↓
        [Data][Data][Data][Data][Data]

Example: Find email "john@example.com"
1. Start at root: J is between C-G and N-Z? → Go right (N-Z)
2. At level 2: J is between M-P and Q-Z? → Go left (M-P)
3. At leaf: Found "john@example.com" → Point to actual row

Operations: O(log n) time
- 1,000 rows: ~10 lookups
- 1,000,000 rows: ~20 lookups
- 1,000,000,000 rows: ~30 lookups

That's why indexes are so fast!</div>

                            <h2>Types of Indexes</h2>

                            <h3>1. Primary Key Index (Clustered)</h3>
                            <div class="code-block">Primary Key Index:

Table: users
Primary Key: user_id

CREATE TABLE users (
  user_id INT PRIMARY KEY,
  email VARCHAR(255),
  name VARCHAR(255)
);

Index is automatically created on user_id
Data is physically stored in primary key order

Physical Storage:
Row 1: user_id=1, email=..., name=...
Row 2: user_id=2, email=..., name=...
Row 3: user_id=3, email=..., name=...
...

Benefits:
✓ Super fast lookup by primary key
✓ Range queries are efficient (WHERE user_id BETWEEN 100 AND 200)
✓ Only one clustered index per table

Query Performance:
SELECT * FROM users WHERE user_id = 12345;
→ 1-2ms (instant)</div>

                            <h3>2. Secondary Index (Non-Clustered)</h3>
                            <div class="code-block">Secondary Index on email:

CREATE INDEX idx_email ON users(email);

Index Structure:
email (sorted)          → user_id (pointer to row)
----------------          --------
'alice@example.com'   → 5
'bob@example.com'     → 2
'charlie@example.com' → 8
'john@example.com'    → 12345
...

Query Process:
1. Look up email in index → Find user_id
2. Use user_id to lookup row in table

Query Performance:
SELECT * FROM users WHERE email = 'john@example.com';
→ 5-10ms (very fast)

Without index: 30 seconds (6000x slower!)</div>

                            <h3>3. Composite Index (Multi-Column)</h3>
                            <div class="code-block">Composite Index on (city, age):

CREATE INDEX idx_city_age ON users(city, age);

Index sorted by city first, then age within each city

Index Structure:
city        age     → user_id
--------    ---        ------
'Boston'    25      → 10
'Boston'    28      → 15
'Boston'    30      → 20
'Chicago'   22      → 5
'Chicago'   35      → 12
'New York'  27      → 8
...

Efficient Queries (uses index):
✓ WHERE city = 'Boston'
✓ WHERE city = 'Boston' AND age = 25
✓ WHERE city = 'Boston' AND age > 25

Inefficient Queries (can't use index fully):
✗ WHERE age = 25 (doesn't start with city)
✗ WHERE city = 'Boston' OR age = 25 (OR condition)

Rule: Index columns used left-to-right only!</div>

                            <h3>4. Unique Index</h3>
                            <div class="code-block">Unique Index on email:

CREATE UNIQUE INDEX idx_email ON users(email);

Enforces uniqueness + fast lookup

Benefits:
✓ Prevents duplicate emails
✓ Fast lookups
✓ Database enforces constraint

Example:
INSERT INTO users (email) VALUES ('john@example.com'); ✓ Success
INSERT INTO users (email) VALUES ('john@example.com'); ✗ Error: Duplicate!</div>

                            <h3>5. Full-Text Index</h3>
                            <div class="code-block">Full-Text Index for Search:

CREATE FULLTEXT INDEX idx_content ON articles(content);

For searching within text, not exact matches

Use Case: Blog search, documentation search

Query:
SELECT * FROM articles
WHERE MATCH(content) AGAINST ('database performance');

Finds articles containing those words (any order)

Without full-text index: Must use LIKE '%database%'
→ Extremely slow on large text fields</div>

                            <h2>Index Performance Trade-offs</h2>

                            <table class="table">
                                <tr>
                                    <th>Operation</th>
                                    <th>Without Index</th>
                                    <th>With Index</th>
                                </tr>
                                <tr>
                                    <td>SELECT (point lookup)</td>
                                    <td>O(n) - Scan all rows</td>
                                    <td>O(log n) - Fast lookup</td>
                                </tr>
                                <tr>
                                    <td>SELECT (range query)</td>
                                    <td>O(n) - Scan all rows</td>
                                    <td>O(log n + k) - k matching rows</td>
                                </tr>
                                <tr>
                                    <td>INSERT</td>
                                    <td>Fast - Just append</td>
                                    <td>Slower - Must update indexes</td>
                                </tr>
                                <tr>
                                    <td>UPDATE</td>
                                    <td>Find row + update</td>
                                    <td>Find row + update + update indexes</td>
                                </tr>
                                <tr>
                                    <td>DELETE</td>
                                    <td>Find row + delete</td>
                                    <td>Find row + delete + update indexes</td>
                                </tr>
                                <tr>
                                    <td>Storage</td>
                                    <td>Table only</td>
                                    <td>Table + Index (10-20% overhead)</td>
                                </tr>
                            </table>

                            <h2>When Indexes Hurt Performance</h2>

                            <div class="code-block">Problem: Too Many Indexes

Table: users (10 indexes)

INSERT new user:
1. Insert row into table (fast)
2. Update index 1 (time)
3. Update index 2 (time)
4. Update index 3 (time)
...
11. Update index 10 (time)

Result: INSERT is 10x slower!

Real Example:
- 0 indexes: 1000 inserts/sec
- 5 indexes: 500 inserts/sec
- 10 indexes: 200 inserts/sec

Lesson: Only create indexes you actually use!</div>

                            <h3>When NOT to Use Indexes</h3>
                            <div class="code-block">Don't Index When:

1. Small Tables (< 1000 rows)
   - Full scan is already fast
   - Index overhead not worth it

2. High Write, Low Read Tables
   - Logs, audit trails
   - Mostly INSERTs, rare SELECTs
   - Index slows writes, rarely helps reads

3. Columns with Low Cardinality
   - Boolean columns (true/false only)
   - Status columns (active/inactive)
   - Gender columns (M/F/Other)
   - Index doesn't help much (still scan many rows)

4. Columns Never Used in WHERE/JOIN
   - No query benefits
   - Pure overhead

Example: Don't index description or comments
→ Rarely searched, mostly full-text search instead</div>

                            <h2>Real-World Case Study: Stack Overflow</h2>

                            <div class="code-block">Stack Overflow Database Indexes:

Table: Posts (50 million+ rows)

Strategic Indexes:
1. PRIMARY KEY on PostId (clustered)
   - Fast lookup: "Show me question #12345"

2. INDEX on (PostTypeId, CreationDate)
   - Fast query: "Show recent questions"
   - PostTypeId=1 for questions, CreationDate sorted

3. INDEX on (OwnerUserId, CreationDate)
   - Fast query: "Show user's questions"
   - Used in profile pages

4. INDEX on (ParentId, Score)
   - Fast query: "Show top answers for question"
   - ParentId links answer to question

5. FULLTEXT INDEX on (Body)
   - Fast search: "Find posts about 'database indexing'"

Total Indexes: 12 (carefully chosen!)

Performance:
- Homepage: 20ms (uses PostTypeId + CreationDate index)
- Question page: 15ms (uses PostId primary key)
- User profile: 25ms (uses OwnerUserId index)
- Search: 50ms (uses fulltext index)

Stack Overflow serves 60M+ page views/day on modest hardware
Secret: Excellent indexing strategy!</div>

                            <h2>Index Maintenance</h2>

                            <div class="code-block">Indexes Degrade Over Time:

As data is inserted/updated/deleted:
- B-tree becomes unbalanced
- Fragmentation increases
- Performance slowly degrades

Solution: Rebuild/Reorganize Indexes

MySQL:
OPTIMIZE TABLE users;

PostgreSQL:
REINDEX TABLE users;

SQL Server:
ALTER INDEX idx_email ON users REBUILD;

When to Rebuild:
- Monthly for high-write tables
- Quarterly for low-write tables
- After bulk data loads
- When fragmentation > 30%

Signs You Need Rebuild:
- Queries getting slower over time
- Index size growing disproportionately
- Lots of deletes/updates</div>

                            <h2>Analyzing Query Performance</h2>

                            <h3>EXPLAIN: See If Index Is Used</h3>
                            <div class="code-block">MySQL EXPLAIN:

EXPLAIN SELECT * FROM users WHERE email = 'john@example.com';

Without Index:
+----+-------------+-------+------+------+---------+------+----------+-------------+
| id | select_type | table | type | key  | key_len | ref  | rows     | Extra       |
+----+-------------+-------+------+------+---------+------+----------+-------------+
|  1 | SIMPLE      | users | ALL  | NULL | NULL    | NULL | 10000000 | Using where |
+----+-------------+-------+------+------+---------+------+----------+-------------+

type: ALL means full table scan
rows: 10,000,000 - scanning entire table!

With Index:
+----+-------------+-------+------+-----------+---------+-------+------+-------+
| id | select_type | table | type | key       | key_len | ref   | rows | Extra |
+----+-------------+-------+------+-----------+---------+-------+------+-------+
|  1 | SIMPLE      | users | ref  | idx_email | 767     | const | 1    | NULL  |
+----+-------------+-------+------+-----------+---------+-------+------+-------+

type: ref means using index
key: idx_email - using our index!
rows: 1 - only scanning 1 row!

Result: 10,000,000x improvement!</div>

                            <h2>Common Indexing Patterns</h2>

                            <h3>1. Covering Index</h3>
                            <div class="code-block">Problem: Query needs columns not in index

Query: SELECT name, email FROM users WHERE email = 'john@example.com';

Index on email only:
1. Look up email in index → Find user_id
2. Go to table to get name (extra lookup)

Covering Index (email, name):
CREATE INDEX idx_email_name ON users(email, name);

Now:
1. Look up email in index → Find name in same index!
2. No need to go to table (faster!)

This is called a "covering index" - covers all query needs</div>

                            <h3>2. Prefix Index (For Long Strings)</h3>
                            <div class="code-block">Problem: Indexing long strings wastes space

email: 'verylongemailaddress@example.com' (255 characters max)

Solution: Index first N characters only

CREATE INDEX idx_email ON users(email(20));

Index stores: 'verylongemailaddress@...'

Benefits:
✓ Smaller index (faster, less memory)
✓ Still very selective (first 20 chars usually unique)

Trade-off:
✗ Range queries less efficient
✗ Not suitable for columns with similar prefixes</div>

                            <h3>3. Partial Index (Filter)</h3>
                            <div class="code-block">Problem: Only query active users

Table: 10M users (9M active, 1M inactive)
Query: SELECT * FROM users WHERE status = 'active' AND city = 'Boston';

Regular Index on (status, city): Waste of space (indexes inactive users too)

Partial Index (PostgreSQL):
CREATE INDEX idx_active_city ON users(city)
WHERE status = 'active';

Benefits:
✓ Smaller index (only 9M rows, not 10M)
✓ Faster queries (less to scan)
✓ Faster updates (inactive users don't update index)

Use Case: Soft deletes, archived data, tenant filtering</div>

                            <h2>Best Practices</h2>

                            <div class="code-block">1. Index Columns Used in WHERE, JOIN, ORDER BY
   - WHERE email = 'x' → Index email
   - JOIN ON orders.user_id = users.id → Index both
   - ORDER BY created_at → Index created_at

2. Composite Index Order Matters
   - Most selective column first
   - WHERE city = 'X' AND age = Y → (city, age) or (age, city)?
   - Depends on which filters more rows

3. Avoid Over-Indexing
   - Each index slows writes
   - Monitor index usage (find unused indexes)
   - Delete indexes that aren't used

4. Use Covering Indexes for Hot Queries
   - Identify most frequent queries
   - Create indexes that cover all columns
   - Avoid extra table lookups

5. Monitor and Rebuild Regularly
   - Check index fragmentation
   - Rebuild monthly/quarterly
   - Especially after bulk operations

6. Test Before and After
   - EXPLAIN query before index
   - Create index
   - EXPLAIN query after index
   - Measure actual performance improvement</div>

                            <h2>Summary</h2>
                            <p>Database indexes are essential for query performance. They turn slow full table scans into fast lookups using B-tree structures. The most common pattern is indexing columns used in WHERE clauses. Remember that indexes trade write performance for read performance - every index slows inserts and updates. Only create indexes you actually need, based on real query patterns. Use EXPLAIN to verify your queries are using indexes, and rebuild indexes regularly to maintain performance. A well-indexed database can handle millions of queries per second on modest hardware.</p>

                            <p><strong>Remember:</strong> Measure, don't guess. Use EXPLAIN to see if indexes are being used. Profile your slow queries, add targeted indexes, then verify the improvement. Index smart, not hard.</p>
                        `,
                        interviews: [
                            {
                                question: "How does a database index improve query performance?",
                                answer: "An index is a sorted data structure (usually B-tree) that allows O(log n) lookups instead of O(n) full table scans. Example: Finding a user by email in 10M rows takes 30 seconds without index (scan all rows), but only 5ms with index (jump directly to the row). For 1M rows, B-tree needs only ~20 lookups vs scanning 1M rows. Like a book index - instead of reading every page, you look it up and jump to the right page."
                            },
                            {
                                question: "What are the downsides of having too many indexes?",
                                answer: "Each index must be updated on INSERT/UPDATE/DELETE, slowing writes significantly. Real numbers: 0 indexes = 1000 inserts/sec, 10 indexes = 200 inserts/sec. Indexes also consume disk space (10-20% overhead per index). Over-indexing is wasteful - maintain only indexes that are actually used by queries. Best practice: Monitor index usage and delete unused indexes."
                            },
                            {
                                question: "Explain composite indexes and when they're useful.",
                                answer: "Composite index indexes multiple columns: CREATE INDEX idx_city_age ON users(city, age). Sorted by city first, then age within each city. Efficient for: WHERE city='X', WHERE city='X' AND age=Y. NOT efficient for: WHERE age=Y (doesn't start with city). Rule: Index columns are used left-to-right only. Use for queries that filter/join on multiple columns together. Order matters - put most selective column first."
                            },
                            {
                                question: "How would you identify if a query is using an index?",
                                answer: "Use EXPLAIN (MySQL/PostgreSQL) or EXPLAIN PLAN (Oracle). Look for: type='ALL' (bad - full table scan), key=NULL (no index used), rows=millions (scanning many rows). Good signs: type='ref' or 'range', key='index_name', rows=1 or few. Example: EXPLAIN SELECT * FROM users WHERE email='x'; If it shows rows=1 and key='idx_email', the index is working. Always EXPLAIN slow queries first."
                            },
                            {
                                question: "When should you NOT create an index?",
                                answer: "Don't index: 1) Small tables (<1000 rows) - full scan already fast, 2) High-write, low-read tables (logs) - index slows writes, rarely helps reads, 3) Low cardinality columns (boolean, gender) - doesn't filter many rows, 4) Columns never in WHERE/JOIN/ORDER BY. Example: Don't index 'description' text fields unless doing full-text search. Index overhead not worth it. Only index based on actual query patterns."
                            }
                        ]
                    }
                ]
            },
            {
                title: 'Module 5: Databases Part 2 - Advanced',
                lessons: [
                    {
                        id: 'database-types',
                        title: 'Database Types: Key-Value, Document, Column, Graph',
                        duration: '55 min',
                        content: `
                            <h2>NoSQL Database Types</h2>
                            <p>While SQL databases follow a rigid table structure, NoSQL databases come in four main flavors, each optimized for different use cases. Choosing the right database type is crucial - using a graph database for simple key lookups is overkill, while using a key-value store for complex relationships is a nightmare. Understanding these types helps you pick the right tool for the job.</p>

                            <p>The four main NoSQL types are: Key-Value (simplest, fastest), Document (flexible JSON), Column-Family (time-series, analytics), and Graph (relationships, connections). Each has distinct strengths and ideal use cases. Let's dive deep into each.</p>

                            <h2>1. Key-Value Stores</h2>
                            <p>The simplest NoSQL type. Think of it as a giant hash map: every piece of data has a unique key, and the database returns the value for that key. No queries, no joins, no complex operations - just fast lookups.</p>

                            <h3>How It Works</h3>
                            <div class="code-block">Key-Value Store Structure:

Key                    Value
------------------     ---------------------
"user:123"         →   {"name": "John", "age": 30}
"session:abc"      →   {"userId": 123, "loggedIn": true}
"counter:views"    →   1547832
"config:db"        →   {"host": "localhost", "port": 5432}

Operations:
SET key value      - Store value
GET key            - Retrieve value
DELETE key         - Remove value
EXISTS key         - Check if exists

That's it! No SELECT, no WHERE, no JOIN</div>

                            <h3>Popular Key-Value Databases</h3>

                            <h4>Redis</h4>
                            <div class="code-block">Redis: In-Memory Key-Value Store

Features:
- All data in RAM (extremely fast: <1ms latency)
- Optional persistence to disk
- Data structures: strings, lists, sets, sorted sets, hashes
- Pub/Sub messaging
- TTL (auto-expiration)

Use Cases:
✓ Caching (most common use)
✓ Session storage
✓ Real-time analytics
✓ Rate limiting
✓ Leaderboards (sorted sets)
✓ Pub/Sub messaging

Example: Twitter Timeline Cache
Key: "timeline:user:123"
Value: [tweet_789, tweet_456, tweet_123, ...]

Response time: <1ms (all in RAM)</div>

                            <h4>Amazon DynamoDB</h4>
                            <div class="code-block">DynamoDB: Distributed Key-Value Store

Features:
- Fully managed by AWS
- Infinite scalability
- Single-digit millisecond latency
- Automatic replication across 3 AZs
- Pay per request (serverless)

Use Cases:
✓ User profiles (millions of users)
✓ Shopping carts
✓ IoT data (device telemetry)
✓ Gaming state (player data)
✓ Mobile app backends

Example: Amazon.com Shopping Cart
Key: "cart:user:123"
Value: {items: [{product: "book", qty: 2}, ...]}

Scales to millions of requests/second</div>

                            <h3>When to Use Key-Value</h3>
                            <table class="table">
                                <tr>
                                    <th>✓ Use When</th>
                                    <th>✗ Don't Use When</th>
                                </tr>
                                <tr>
                                    <td>Fast lookups by key needed</td>
                                    <td>Need complex queries</td>
                                </tr>
                                <tr>
                                    <td>Caching frequently accessed data</td>
                                    <td>Need to query by value</td>
                                </tr>
                                <tr>
                                    <td>Session management</td>
                                    <td>Need joins between datasets</td>
                                </tr>
                                <tr>
                                    <td>Simple data model</td>
                                    <td>Need transactions across keys</td>
                                </tr>
                                <tr>
                                    <td>High read/write throughput</td>
                                    <td>Need aggregations (SUM, AVG)</td>
                                </tr>
                            </table>

                            <h2>2. Document Stores</h2>
                            <p>Document databases store data as JSON-like documents. Each document can have a different structure (schema-less), making them extremely flexible. Think of it as key-value on steroids - you can query inside the values.</p>

                            <h3>How It Works</h3>
                            <div class="code-block">Document Store Structure:

Collection: users

Document 1:
{
  "_id": "user_123",
  "name": "John Doe",
  "email": "john@example.com",
  "address": {
    "street": "123 Main St",
    "city": "Boston"
  },
  "interests": ["coding", "gaming"]
}

Document 2:
{
  "_id": "user_456",
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "company": "Tech Corp"
}

Notice: Different fields! No fixed schema required</div>

                            <h3>Popular Document Databases</h3>

                            <h4>MongoDB</h4>
                            <div class="code-block">MongoDB: Most Popular Document DB

Features:
- JSON-like documents (BSON format)
- Rich query language (find, aggregate, etc.)
- Indexing support
- Horizontal scaling (sharding)
- ACID transactions (since v4.0)

Use Cases:
✓ Content management systems
✓ E-commerce product catalogs
✓ User profiles (varying fields)
✓ Mobile app backends
✓ Real-time analytics

Query Example:
db.users.find({
  "address.city": "Boston",
  "interests": "coding"
})

Returns all users in Boston who like coding</div>

                            <h4>Real-World Example: Uber</h4>
                            <div class="code-block">Uber's Use of MongoDB (2014-2017):

Use Case: Trip Data

Document: Trip
{
  "_id": "trip_789",
  "rider": {
    "id": "user_123",
    "name": "John",
    "rating": 4.8
  },
  "driver": {
    "id": "driver_456",
    "name": "Jane",
    "car": "Toyota Prius",
    "rating": 4.9
  },
  "route": [
    {"lat": 42.36, "lng": -71.06, "time": "2024-01-15T10:00:00Z"},
    {"lat": 42.37, "lng": -71.05, "time": "2024-01-15T10:15:00Z"}
  ],
  "fare": 15.50,
  "status": "completed"
}

Benefits:
✓ Flexible schema (trips differ: pool, UberX, Eats)
✓ Nested data (no joins needed)
✓ Geospatial queries (find nearby drivers)
✓ Fast reads/writes

Later: Migrated to Postgres + Schemaless (custom)
Why? Need for consistency, better tooling</div>

                            <h3>When to Use Document Stores</h3>
                            <table class="table">
                                <tr>
                                    <th>✓ Use When</th>
                                    <th>✗ Don't Use When</th>
                                </tr>
                                <tr>
                                    <td>Flexible, evolving schema needed</td>
                                    <td>Need strict schema validation</td>
                                </tr>
                                <tr>
                                    <td>Nested/hierarchical data</td>
                                    <td>Complex multi-document transactions</td>
                                </tr>
                                <tr>
                                    <td>Rapid development/prototyping</td>
                                    <td>Heavy relational queries (many joins)</td>
                                </tr>
                                <tr>
                                    <td>Content management</td>
                                    <td>Strict consistency required</td>
                                </tr>
                                <tr>
                                    <td>Catalog data (products, articles)</td>
                                    <td>Complex aggregations across docs</td>
                                </tr>
                            </table>

                            <h2>3. Column-Family Stores</h2>
                            <p>Column-family databases store data in columns rather than rows. This sounds similar to SQL columns, but it's fundamentally different. Data is grouped by column, making aggregations and analytics extremely fast. Perfect for time-series data and write-heavy workloads.</p>

                            <h3>Row vs Column Storage</h3>
                            <div class="code-block">Row-Oriented Storage (SQL):

Disk Layout:
[user_1: id=1, name="John", age=30, city="Boston"]
[user_2: id=2, name="Jane", age=25, city="NYC"]
[user_3: id=3, name="Bob", age=35, city="Boston"]

Query: SELECT age FROM users WHERE city = "Boston"
Must read entire rows, then filter

Column-Oriented Storage:

Disk Layout:
[id: 1, 2, 3]
[name: "John", "Jane", "Bob"]
[age: 30, 25, 35]
[city: "Boston", "NYC", "Boston"]

Query: SELECT age FROM users WHERE city = "Boston"
Read only city and age columns!
Much less disk I/O → Faster</div>

                            <h3>Popular Column-Family Databases</h3>

                            <h4>Apache Cassandra</h4>
                            <div class="code-block">Cassandra: Distributed Column Store

Features:
- Linear scalability (add nodes = more throughput)
- No single point of failure
- Multi-datacenter replication
- Tunable consistency
- Optimized for writes (10K+ writes/sec per node)

Data Model:
CREATE TABLE user_events (
  user_id text,
  event_time timestamp,
  event_type text,
  data text,
  PRIMARY KEY (user_id, event_time)
);

Data stored clustered by user_id, sorted by event_time

Use Cases:
✓ Time-series data (logs, events, metrics)
✓ IoT sensor data
✓ Messaging apps (chat history)
✓ Recommendation engines
✓ Fraud detection</div>

                            <h4>Real-World Example: Netflix</h4>
                            <div class="code-block">Netflix's Use of Cassandra:

Use Case: User Viewing History

Schema:
CREATE TABLE viewing_history (
  user_id uuid,
  watch_date date,
  watch_time timestamp,
  title_id uuid,
  position int,
  device text,
  PRIMARY KEY ((user_id, watch_date), watch_time)
);

Data Example:
user_id=123 | watch_date=2024-01-15
  watch_time=10:00 | title="Stranger Things" | position=1547
  watch_time=14:30 | title="The Crown" | position=2891
  watch_time=19:00 | title="Black Mirror" | position=103

Scale:
- 200+ million users
- Billions of events per day
- 2500+ Cassandra nodes
- 420 TB of data
- 1+ trillion requests/day

Why Cassandra?
✓ Write-heavy (every view generates writes)
✓ Time-series data (sorted by time)
✓ High availability (global clusters)
✓ Linear scalability (just add nodes)</div>

                            <h4>Apache HBase</h4>
                            <div class="code-block">HBase: Hadoop's Column Store

Features:
- Built on top of Hadoop HDFS
- Petabyte-scale storage
- Real-time random read/write
- Strong consistency (unlike Cassandra)

Use Case: Facebook Messages

Problem: Store 135 billion+ messages
Solution: HBase

Table: messages
Row Key: user_id + timestamp
Column Families:
- message: {text, attachments}
- metadata: {from, to, read_status}

Query: Get messages for user 123 in last 7 days
Scan rows: user_123:* WHERE timestamp > 7_days_ago

Result: Scan only relevant rows, skip everything else</div>

                            <h3>When to Use Column-Family Stores</h3>
                            <table class="table">
                                <tr>
                                    <th>✓ Use When</th>
                                    <th>✗ Don't Use When</th>
                                </tr>
                                <tr>
                                    <td>Time-series data (logs, events)</td>
                                    <td>Need complex queries (joins)</td>
                                </tr>
                                <tr>
                                    <td>Write-heavy workloads</td>
                                    <td>Small dataset (<1GB)</td>
                                </tr>
                                <tr>
                                    <td>Analytics on massive datasets</td>
                                    <td>Frequent schema changes</td>
                                </tr>
                                <tr>
                                    <td>IoT sensor data</td>
                                    <td>ACID transactions required</td>
                                </tr>
                                <tr>
                                    <td>High availability critical</td>
                                    <td>Simple key-value lookups (use Redis)</td>
                                </tr>
                            </table>

                            <h2>4. Graph Databases</h2>
                            <p>Graph databases store data as nodes (entities) and edges (relationships). Unlike other databases where relationships are expensive (joins), graph databases make relationships first-class citizens. Perfect for social networks, recommendations, and fraud detection.</p>

                            <h3>How It Works</h3>
                            <div class="code-block">Graph Structure:

Nodes (Entities):
┌─────────────┐        ┌─────────────┐
│ Person:John │        │ Person:Jane │
│ age: 30     │        │ age: 28     │
└─────────────┘        └─────────────┘
       │                      │
       └──FRIENDS_WITH────────┘
              (since: 2015)

┌─────────────┐        ┌─────────────┐
│ Person:Bob  │        │ City:Boston │
│ age: 35     │        │ pop: 700K   │
└─────────────┘        └─────────────┘
       │                      │
       └────LIVES_IN───────────┘

Relationships are cheap to traverse!
Finding "John's friends" = Follow FRIENDS_WITH edge</div>

                            <h3>Popular Graph Databases</h3>

                            <h4>Neo4j</h4>
                            <div class="code-block">Neo4j: Most Popular Graph DB

Query Language: Cypher

Create Data:
CREATE (john:Person {name: "John", age: 30})
CREATE (jane:Person {name: "Jane", age: 28})
CREATE (john)-[:FRIENDS_WITH {since: 2015}]->(jane)

Query: Find John's friends
MATCH (john:Person {name: "John"})-[:FRIENDS_WITH]-(friend)
RETURN friend.name

Query: Friends of friends (2 hops)
MATCH (john:Person {name: "John"})-[:FRIENDS_WITH*2]-(fof)
RETURN DISTINCT fof.name

This would be nightmare with SQL joins!</div>

                            <h4>Real-World Example: LinkedIn</h4>
                            <div class="code-block">LinkedIn's Graph Database:

Use Case: Connection Recommendations

Graph Structure:
You ←→ Friend1 ←→ Friend2 ←→ Stranger

Query: "People You May Know"

Cypher (conceptual):
MATCH (you:Person {id: 123})-[:CONNECTED]-(friend)
      -[:CONNECTED]-(friendOfFriend)
WHERE NOT (you)-[:CONNECTED]-(friendOfFriend)
  AND friendOfFriend.id <> you.id
RETURN friendOfFriend, count(*) as mutualFriends
ORDER BY mutualFriends DESC
LIMIT 10

Finds: People 2 hops away (friends of friends)
Excludes: Direct connections
Returns: Top 10 by mutual friend count

In SQL: Nightmare of self-joins
In Graph DB: Natural query</div>

                            <h4>Real-World Example: Airbnb</h4>
                            <div class="code-block">Airbnb's Fraud Detection:

Use Case: Detect fake listings, scammers

Graph Structure:
[User] ←creates─ [Listing]
[User] ←uses─ [IP Address]
[User] ←uses─ [Phone Number]
[User] ←uses─ [Credit Card]

Fraud Pattern: Multiple accounts from same IP/phone
Query:
MATCH (user1:User)-[:USES]->(ip:IP)<-[:USES]-(user2:User)
WHERE user1 <> user2
  AND (user1)-[:CREATED]->(:Listing)
  AND (user2)-[:CREATED]->(:Listing)
RETURN user1, user2, ip

Finds: Different users sharing same IP, both listing properties
Flag: Potential fraud (one person, multiple fake accounts)

Why Graph DB?
✓ Complex relationship patterns
✓ Fast traversals (no expensive joins)
✓ Easy to add new fraud patterns</div>

                            <h4>Amazon Neptune</h4>
                            <div class="code-block">Neptune: AWS Graph Database

Features:
- Supports both property graphs (Gremlin) and RDF (SPARQL)
- Fully managed
- High availability (6 replicas)
- Fast queries (<10ms for simple traversals)

Use Case: Recommendation Engines

Graph:
[User] ─purchased→ [Product]
[Product] ─category→ [Category]
[Product] ─similar_to→ [Product]

Query: Recommend products
User purchased ProductA
→ ProductA similar to ProductB
→ Other users who bought ProductA also bought ProductC
→ Recommend: ProductB, ProductC</div>

                            <h3>When to Use Graph Databases</h3>
                            <table class="table">
                                <tr>
                                    <th>✓ Use When</th>
                                    <th>✗ Don't Use When</th>
                                </tr>
                                <tr>
                                    <td>Relationships are key data</td>
                                    <td>Simple key lookups</td>
                                </tr>
                                <tr>
                                    <td>Social networks (friends, followers)</td>
                                    <td>No relationship queries</td>
                                </tr>
                                <tr>
                                    <td>Recommendation engines</td>
                                    <td>Massive scans (analytics)</td>
                                </tr>
                                <tr>
                                    <td>Fraud detection (pattern matching)</td>
                                    <td>Simple aggregations</td>
                                </tr>
                                <tr>
                                    <td>Network topology</td>
                                    <td>High write throughput (use Cassandra)</td>
                                </tr>
                                <tr>
                                    <td>Multi-hop queries (friends of friends)</td>
                                    <td>Fixed, shallow relationships</td>
                                </tr>
                            </table>

                            <h2>Choosing the Right Database Type</h2>

                            <div class="code-block">Decision Tree:

Start Here:
│
├─ Need relationships? (friends, connections, recommendations)
│  → YES: Graph Database (Neo4j, Neptune)
│
├─ Need flexible JSON documents? (CMS, catalogs, user profiles)
│  → YES: Document Store (MongoDB, Couchbase)
│
├─ Time-series or massive writes? (logs, events, IoT)
│  → YES: Column-Family (Cassandra, HBase)
│
├─ Simple key lookups? (cache, sessions, counters)
│  → YES: Key-Value (Redis, DynamoDB)
│
└─ Complex transactions, strict schema?
   → SQL Database (Postgres, MySQL)</div>

                            <h2>Polyglot Persistence in Practice</h2>

                            <div class="code-block">Real Example: E-Commerce Platform

User Service:
- PostgreSQL: User accounts, authentication (ACID required)
- Redis: Session cache, shopping cart (fast access)

Product Service:
- MongoDB: Product catalog (flexible schema, varied products)
- Elasticsearch: Product search (full-text search)

Order Service:
- PostgreSQL: Order transactions (ACID critical)
- Cassandra: Order history (time-series, scalable reads)

Recommendation Service:
- Neo4j: User-Product relationships (recommendations)
- Redis: Trending products cache

Analytics:
- Cassandra: Event tracking (high write throughput)
- Redshift: Data warehouse (analytics queries)

Result: Use best database for each use case!</div>

                            <h2>Summary</h2>
                            <p>Different NoSQL database types excel at different tasks. Key-Value stores (Redis, DynamoDB) are fastest for simple lookups and caching. Document stores (MongoDB) offer flexibility and are great for catalogs and CMS. Column-family stores (Cassandra, HBase) handle massive write-heavy time-series data. Graph databases (Neo4j, Neptune) make relationship queries natural and fast. Most modern applications use multiple database types (polyglot persistence), choosing the best tool for each specific use case rather than forcing one database to do everything.</p>

                            <p><strong>Remember:</strong> Don't use a graph database for simple lookups, and don't use a key-value store for complex relationships. Match the database type to your query patterns and data model.</p>
                        `,
                        interviews: [
                            {
                                question: "Explain the difference between document stores and key-value stores.",
                                answer: "Key-value stores (Redis, DynamoDB) are simple: just GET/SET by key, can't query inside values. Document stores (MongoDB) store JSON documents and can query inside them: find({\"address.city\": \"Boston\"}). Document stores are like key-value with rich querying. Use key-value for caching/sessions (fast, simple), use document stores for product catalogs/CMS (flexible schema, complex queries)."
                            },
                            {
                                question: "Why would Netflix choose Cassandra over MongoDB for viewing history?",
                                answer: "Cassandra excels at time-series data with massive writes. Netflix has 200M+ users generating billions of viewing events daily. Cassandra provides: 1) Extremely high write throughput (10K+ writes/sec per node), 2) Data sorted by time (perfect for viewing history), 3) Linear scalability (add nodes = more capacity), 4) High availability. MongoDB is better for flexible documents, not time-series at Netflix's scale."
                            },
                            {
                                question: "What makes graph databases better than SQL for social networks?",
                                answer: "Graph databases make relationships first-class citizens. Finding \"friends of friends\" in Neo4j: MATCH (you)-[:FRIENDS*2]-(fof) is simple. In SQL, this requires expensive self-joins that get exponentially slower with each hop. Graph DBs traverse relationships in milliseconds regardless of depth. LinkedIn uses graphs for \"People You May Know\" because multi-hop relationship queries are natural and fast. SQL joins don't scale for relationship-heavy queries."
                            },
                            {
                                question: "Explain column-family storage and when it's better than row storage.",
                                answer: "Column storage groups data by column, not row. Query SELECT age FROM users reads only age column, not entire rows. Great for analytics: SUM(sales) over 1B rows reads only sales column. Row storage (SQL) must read all columns. Use column stores (Cassandra, HBase) for: 1) Analytics queries (aggregations), 2) Time-series data, 3) Write-heavy workloads. Facebook uses HBase for messages because time-range scans are fast."
                            },
                            {
                                question: "What is polyglot persistence and why is it beneficial?",
                                answer: "Polyglot persistence means using multiple database types in one application, each for its strength. E-commerce example: Postgres (orders - ACID), MongoDB (product catalog - flexible schema), Redis (cache - fast), Neo4j (recommendations - relationships), Cassandra (events - high writes). Benefits: Best tool for each job instead of forcing one database for everything. Trade-off: operational complexity (multiple databases to manage)."
                            }
                        ]
                    },
                    {
                        id: 'acid-vs-base',
                        title: 'ACID vs BASE',
                        duration: '45 min',
                        content: `
                            <h2>The Fundamental Trade-off</h2>
                            <p>ACID and BASE represent two fundamentally different philosophies for handling data consistency in databases. ACID prioritizes correctness and consistency - your data is always accurate, even if it means being slower or less available. BASE prioritizes availability and performance - your system is always responsive, even if data is temporarily inconsistent. Understanding this trade-off is crucial for choosing the right database and designing reliable systems.</p>

                            <p>Traditional SQL databases follow ACID. Modern NoSQL databases often follow BASE. Neither is "better" - they solve different problems. Banking systems need ACID (can't lose money!). Social media feeds can use BASE (okay if likes are slightly delayed). Let's dive deep into both.</p>

                            <h2>ACID: Strong Consistency</h2>
                            <p>ACID is an acronym for four properties that guarantee reliable database transactions.</p>

                            <h3>A - Atomicity</h3>
                            <p>Atomicity means transactions are "all or nothing". Either the entire transaction succeeds, or it fails completely. No partial updates allowed.</p>

                            <div class="code-block">Atomicity Example: Bank Transfer

Transaction: Transfer $100 from Alice to Bob

BEGIN TRANSACTION;
  UPDATE accounts SET balance = balance - 100 WHERE user = 'Alice';
  UPDATE accounts SET balance = balance + 100 WHERE user = 'Bob';
COMMIT;

Scenarios:

✓ Success: Both updates succeed
  Alice: $500 → $400
  Bob: $300 → $400
  Result: Money transferred

✗ Failure: Second update fails (network error)
  WITHOUT Atomicity:
    Alice: $500 → $400
    Bob: $300 → $300
    Result: $100 disappeared! (Bad!)

  WITH Atomicity:
    Alice: $500 → $500 (rolled back)
    Bob: $300 → $300
    Result: Transaction failed, but data is consistent

Guarantee: You never lose $100 mid-transaction</div>

                            <h3>C - Consistency</h3>
                            <p>Consistency means database constraints are always enforced. The database starts in a valid state and ends in a valid state.</p>

                            <div class="code-block">Consistency Example: Constraints

Database Constraint: balance >= 0 (no negative balances)

Transaction: Withdraw $600 from account with $500

UPDATE accounts SET balance = balance - 600 WHERE user = 'Alice';

Without Consistency:
  Alice balance: $500 → -$100 (violates constraint!)
  Database allows invalid state

With Consistency:
  Database checks: $500 - $600 = -$100 < 0
  Constraint violated!
  Transaction rejected, balance stays $500

Guarantee: Constraints always enforced, no invalid data</div>

                            <h3>I - Isolation</h3>
                            <p>Isolation means concurrent transactions don't interfere with each other. Each transaction feels like it's the only one running.</p>

                            <div class="code-block">Isolation Example: Concurrent Transactions

Initial: Account balance = $500

Transaction A: Withdraw $100
1. Read balance: $500
2. Calculate: $500 - $100 = $400
3. Write: $400

Transaction B: Withdraw $200 (runs concurrently)
1. Read balance: $500
2. Calculate: $500 - $200 = $300
3. Write: $300

Without Isolation (Interleaved):
A reads: $500
B reads: $500 (before A writes!)
A writes: $400
B writes: $300 (overwrites A's write!)
Final balance: $300
Problem: Lost $100 withdrawal! Should be $200

With Isolation (Serialized):
A reads: $500
A writes: $400
B reads: $400 (sees A's update)
B writes: $200
Final balance: $200 ✓ Correct

Guarantee: Transactions appear to run one at a time</div>

                            <h3>D - Durability</h3>
                            <p>Durability means once a transaction commits, the data is permanently saved, even if the system crashes.</p>

                            <div class="code-block">Durability Example: System Crash

Timeline:
10:00:00 - User purchases item for $50
10:00:01 - Transaction commits
10:00:02 - Success message shown to user
10:00:03 - **POWER OUTAGE - Server crashes**
10:05:00 - Server restarts

Without Durability:
  Restart: Transaction lost!
  User charged $50, but no record of purchase
  Database shows: No purchase

With Durability:
  Database wrote to disk/log before confirming
  Restart: Transaction replayed from log
  Database shows: Purchase confirmed

Guarantee: Committed data survives crashes</div>

                            <h2>BASE: Eventual Consistency</h2>
                            <p>BASE is an acronym for three properties that favor availability over immediate consistency.</p>

                            <h3>BA - Basically Available</h3>
                            <p>The system guarantees availability - it will always respond to requests, even if some nodes are down.</p>

                            <div class="code-block">Basically Available Example:

Setup: 3 database replicas (US-East, US-West, EU)

Scenario: US-East goes down

ACID System (Strong Consistency):
  Request arrives → US-East down → Can't guarantee consistency
  Options:
  a) Reject requests until US-East is back (downtime!)
  b) Return error (unavailable!)

BASE System (Basically Available):
  Request arrives → US-East down
  → Route to US-West (still available!)
  → May not have latest data, but responds

Result: System stays up, users get response</div>

                            <h3>S - Soft State</h3>
                            <p>The system state can change over time, even without new input, as data propagates across replicas.</p>

                            <div class="code-block">Soft State Example: Social Media Likes

User likes a post:
Time 0: User clicks like
Time 1: Write to nearest replica (US-East)
        US-East shows: 101 likes
        US-West shows: 100 likes (not updated yet)
Time 2: Replication to US-West
        US-East shows: 101 likes
        US-West shows: 101 likes (now consistent)

State "softly" changes as data propagates
User in California might see 100, then 101 seconds later
No new input, but state changed (replication)</div>

                            <h3>E - Eventual Consistency</h3>
                            <p>Given enough time with no new updates, all replicas will eventually converge to the same value.</p>

                            <div class="code-block">Eventual Consistency Example:

Social Media Post Updates:

T0: Alice posts: "Hello World"
    → Written to Primary database

T0+50ms: Replica 1 replicates: "Hello World"
T0+100ms: Replica 2 replicates: "Hello World"
T0+200ms: Replica 3 replicates: "Hello World"

Between T0 and T0+200ms:
- Users might see different versions
- Primary: "Hello World"
- Replica 3: (old post or nothing)

After T0+200ms: All replicas consistent

"Eventually" = typically milliseconds, but no guarantee
Under load, could be seconds</div>

                            <h2>ACID vs BASE: Real-World Examples</h2>

                            <h3>Example 1: Bank Transaction (Needs ACID)</h3>
                            <div class="code-block">Bank Transfer: $1000 from Account A to B

ACID Requirements:
✓ Atomicity: Both debit and credit succeed, or neither
✓ Consistency: No negative balances, totals match
✓ Isolation: Concurrent transfers don't interfere
✓ Durability: Money can't disappear after commit

What if we used BASE?
- User sees $1000 deducted immediately
- But recipient doesn't see it for 5 seconds
- User panics: "Where's my money?!"
- Unacceptable for financial transactions

Result: Banks use ACID databases (Postgres, Oracle)</div>

                            <h3>Example 2: Twitter Likes (Can Use BASE)</h3>
                            <div class="code-block">User Likes a Tweet:

Write goes to nearest replica:
- User in US → US replica
- User in EU → EU replica

Replication lag: 50-300ms

What users might see:
User A (US): 1,234 likes
User B (EU): 1,232 likes (2 likes behind)
After replication: Both see 1,234

Is this a problem? No!
- Likes aren't critical
- Small delay is acceptable
- High availability is more important
- 10x faster than waiting for global consistency

Result: Twitter uses BASE (Cassandra for tweets)</div>

                            <h3>Example 3: E-commerce Inventory (Hybrid)</h3>
                            <div class="code-block">E-commerce Inventory Management:

Scenario: 1 item left in stock, 2 users try to buy

ACID Approach (Strong Consistency):
BEGIN TRANSACTION;
  SELECT quantity FROM inventory WHERE product_id = 123 FOR UPDATE;
  -- Locks row, other transactions wait
  IF quantity > 0:
    UPDATE inventory SET quantity = quantity - 1;
    INSERT INTO orders ...;
  COMMIT;

Result: Only 1 user gets item (correct!)
Trade-off: Slower, less concurrent purchases

BASE Approach (Eventual Consistency):
-- No locks, both purchases succeed immediately
UPDATE inventory SET quantity = quantity - 1;
INSERT INTO orders ...;

Later: Check inventory
-- Inventory: -1 (oops, oversold!)

Resolution:
- Cancel one order
- Apologize, offer discount
- Or, keep "safety stock" to allow overselling

Why accept this?
- Much higher throughput (100x more purchases/sec)
- Occasional oversell worth the trade-off
- Amazon does this!</div>

                            <h2>The CAP Theorem Connection</h2>
                            <p>ACID vs BASE relates directly to the CAP Theorem. You must choose your priorities.</p>

                            <div class="code-block">CAP Theorem Reminder:
Pick 2 of 3:
- Consistency (all nodes see same data)
- Availability (system always responds)
- Partition Tolerance (works despite network splits)

ACID Systems: Choose CP (Consistency + Partition Tolerance)
- Prioritize correct data
- Sacrifice availability (may reject requests)
- Example: Traditional SQL databases
- Use case: Banking, financial transactions

BASE Systems: Choose AP (Availability + Partition Tolerance)
- Prioritize uptime
- Sacrifice immediate consistency
- Example: NoSQL databases (Cassandra, DynamoDB)
- Use case: Social media, content delivery</div>

                            <h2>When to Use ACID vs BASE</h2>

                            <table class="table">
                                <tr>
                                    <th>Factor</th>
                                    <th>Use ACID</th>
                                    <th>Use BASE</th>
                                </tr>
                                <tr>
                                    <td>Data Correctness</td>
                                    <td>Critical (finance, healthcare)</td>
                                    <td>Flexible (social media, metrics)</td>
                                </tr>
                                <tr>
                                    <td>Availability</td>
                                    <td>Can tolerate downtime</td>
                                    <td>Must be always available</td>
                                </tr>
                                <tr>
                                    <td>Performance</td>
                                    <td>Can accept slower writes</td>
                                    <td>Need high throughput</td>
                                </tr>
                                <tr>
                                    <td>Scale</td>
                                    <td>Vertical scaling acceptable</td>
                                    <td>Need horizontal scaling</td>
                                </tr>
                                <tr>
                                    <td>Use Cases</td>
                                    <td>Banking, e-commerce orders, reservations</td>
                                    <td>Social feeds, analytics, IoT data</td>
                                </tr>
                            </table>

                            <h3>ACID Use Cases</h3>
                            <div class="code-block">When ACID is Required:

✓ Financial Transactions
  - Bank transfers, payment processing
  - Stock trading
  - Accounting systems

✓ Inventory Management
  - Product stock levels
  - Seat reservations (flights, theaters)
  - Limited resource allocation

✓ User Authentication
  - Login/logout state
  - Password changes
  - Access control

✓ Healthcare Records
  - Patient data
  - Prescription records
  - Medical history

Databases: PostgreSQL, MySQL, Oracle, SQL Server</div>

                            <h3>BASE Use Cases</h3>
                            <div class="code-block">When BASE is Acceptable:

✓ Social Media
  - Likes, comments, shares (eventual okay)
  - News feeds
  - Follower counts

✓ Analytics & Metrics
  - Page views
  - User activity logs
  - A/B test data

✓ Content Delivery
  - Blog posts
  - Images, videos
  - Product catalogs (stale = okay)

✓ IoT & Telemetry
  - Sensor data
  - Application logs
  - Monitoring metrics

Databases: Cassandra, DynamoDB, Riak, CouchDB</div>

                            <h2>Real-World Case Study: Amazon</h2>

                            <div class="code-block">Amazon's Hybrid Approach:

Uses ACID for:
✓ Order Placement
  - PostgreSQL for order transactions
  - Strong consistency: Can't lose orders
  - Atomicity: All order steps succeed or fail together

✓ Payment Processing
  - Financial data requires ACID
  - Can't have partial payments
  - Durability critical

Uses BASE for:
✓ Product Recommendations
  - DynamoDB for user behavior
  - Eventual consistency acceptable
  - Recommendations can be slightly stale

✓ Shopping Cart
  - DynamoDB for cart data
  - High availability crucial
  - Okay if cart takes 100ms to sync across regions

✓ Product Reviews
  - Cassandra for review storage
  - Reviews can appear with slight delay
  - High write volume (millions daily)

Result: Right tool for each requirement!</div>

                            <h2>The Spectrum: Not Binary</h2>

                            <div class="code-block">ACID ←───────────────────────→ BASE

Strong                              Eventual
Consistency                         Consistency
    ↓                                   ↓
PostgreSQL                          DynamoDB
  ↓                                   ↓
PostgreSQL                          MongoDB
(Strict)                            (Tunable)
  ↓                                   ↓
MongoDB                             Cassandra
(w/transactions)                    (AP system)
  ↓                                   ↓
Cassandra                           Riak
(Tunable)                           (High availability)

Most systems are somewhere in the middle!
- MongoDB: Started BASE, added ACID transactions
- Cassandra: BASE, but tunable consistency
- DynamoDB: BASE, with strongly consistent reads option</div>

                            <h2>Consistency Levels in Practice</h2>

                            <div class="code-block">Cassandra's Tunable Consistency:

Write Options:
- ONE: Write to 1 replica (fastest, least durable)
- QUORUM: Write to majority (balanced)
- ALL: Write to all replicas (slowest, most durable)

Read Options:
- ONE: Read from 1 replica (fastest, may be stale)
- QUORUM: Read from majority (balanced)
- ALL: Read from all replicas (slowest, most consistent)

Strong Consistency: Write QUORUM + Read QUORUM
Eventual Consistency: Write ONE + Read ONE

Flexibility: Choose per query!</div>

                            <h2>Best Practices</h2>

                            <div class="code-block">1. Choose Based on Requirements
   - Don't use BASE for financial data
   - Don't use ACID for high-throughput logs

2. Consider Hybrid Approaches
   - ACID for critical transactions
   - BASE for read-heavy, less critical data
   - Example: Orders (ACID) + Analytics (BASE)

3. Understand Trade-offs
   - ACID: Consistency, slower, less scalable
   - BASE: Availability, faster, eventually consistent
   - No free lunch!

4. Test Failure Scenarios
   - What happens during network partition?
   - Can your app handle temporary inconsistency?
   - Plan for conflict resolution

5. Monitor Replication Lag
   - Track how long until consistency
   - Alert if lag exceeds threshold
   - Know your system's behavior</div>

                            <h2>Summary</h2>
                            <p>ACID and BASE represent different philosophies for data consistency. ACID guarantees correctness at all times through Atomicity, Consistency, Isolation, and Durability - perfect for banking, healthcare, and financial systems. BASE favors Basically Available, Soft state, and Eventual consistency - ideal for social media, analytics, and content delivery where high availability matters more than immediate consistency. Most modern systems use both: ACID databases for critical transactions, BASE databases for high-scale, less critical data. The key is matching the consistency model to your requirements, not blindly choosing one approach for everything.</p>

                            <p><strong>Remember:</strong> ACID and BASE aren't binary choices. Many databases offer tunable consistency. Choose strong consistency for money and reservations, eventual consistency for likes and views.</p>
                        `,
                        interviews: [
                            {
                                question: "Explain the Atomicity property of ACID with a real example.",
                                answer: "Atomicity means transactions are all-or-nothing. Example: Bank transfer - deduct $100 from Alice, add $100 to Bob. If Bob's account update fails mid-transaction, atomicity ensures Alice's deduction is rolled back. Without atomicity, Alice loses $100 and Bob doesn't receive it - money disappears. With atomicity, either both succeed or both fail, maintaining consistency. This is why banks use ACID databases."
                            },
                            {
                                question: "Why does Twitter use BASE while banks use ACID?",
                                answer: "Banks need strong consistency - money transfers must be immediate and exact, no missing funds allowed. Twitter handles likes/tweets which can be eventually consistent - if a like takes 100ms to show globally, it's acceptable. BASE gives Twitter: 1) High availability (always responsive), 2) Better performance (no locks), 3) Horizontal scalability (millions of tweets/sec). Banks can't tolerate even brief inconsistency; social media can."
                            },
                            {
                                question: "What is eventual consistency and when is it acceptable?",
                                answer: "Eventual consistency means replicas will converge to same value given time without updates (typically milliseconds). Example: Instagram post gets 100 likes. US users see 100, EU users see 98 for 200ms until replication completes. Acceptable for: social media, analytics, content delivery where slight delays don't matter. NOT acceptable for: banking, inventory (overselling), reservations where consistency is critical."
                            },
                            {
                                question: "Explain how Amazon uses both ACID and BASE.",
                                answer: "Amazon uses ACID for critical transactions: order placement (Postgres - can't lose orders), payment processing (financial data requires consistency). Uses BASE for scalability: product recommendations (DynamoDB - stale okay), shopping cart (high availability crucial), product reviews (Cassandra - millions of writes, reviews can be delayed). Hybrid approach: right database for each use case. Critical = ACID, high-scale + flexible = BASE."
                            },
                            {
                                question: "How does Cassandra provide tunable consistency?",
                                answer: "Cassandra lets you choose consistency per query. Write options: ONE (1 replica - fast), QUORUM (majority), ALL (all replicas - slow). Read options: same. Strong consistency: Write QUORUM + Read QUORUM (overlapping replicas guarantee latest data). Eventual consistency: Write ONE + Read ONE (fast but may be stale). This flexibility lets you choose consistency vs performance per use case in same database."
                            }
                        ]
                    },
                    {
                        id: 'consistency-models',
                        title: 'Database Consistency Models',
                        duration: '50 min',
                        content: `
                            <h2>Understanding Consistency Models</h2>
                            <p>Consistency models define what guarantees a distributed system makes about the order and visibility of operations. When you write data to one server, when do other servers see it? When you read data, which version do you get? These questions are answered by the consistency model. Understanding these models is crucial for designing distributed systems that behave correctly under failures and network delays.</p>

                            <p>There's a spectrum from strongest (linearizability) to weakest (eventual consistency). Stronger consistency is easier to reason about but slower and less available. Weaker consistency is faster and more available but requires careful application design. Let's explore the full spectrum.</p>

                            <h2>The Consistency Spectrum</h2>

                            <div class="code-block">Strongest ←──────────────────────→ Weakest
(Slow, Simple)                     (Fast, Complex)

Linearizability (Strongest)
    ↓
Sequential Consistency
    ↓
Causal Consistency
    ↓
Read Your Writes
    ↓
Monotonic Reads
    ↓
Eventual Consistency (Weakest)

Trade-off: Consistency ↔ Availability & Performance</div>

                            <h2>1. Linearizability (Strongest)</h2>
                            <p>Linearizability provides the illusion of a single copy of data. Operations appear to happen instantaneously at some point between their invocation and response. It's as if there's only one server, even though you have many.</p>

                            <div class="code-block">Linearizability Example:

Timeline:
T0: Client A writes X = 1
T1: Write completes
T2: Client B reads X → Must see X = 1 (not old value)
T3: Client C reads X → Must see X = 1

Guarantee: Once write completes, ALL subsequent reads see it

Real Example: Google Spanner
- Uses GPS + atomic clocks for global ordering
- Ensures linearizability across datacenters
- Write latency: 50-100ms (slow!)

When to use:
✓ Financial transactions (stock trades)
✓ Distributed locks
✓ Leader election

Trade-off: Very slow (waits for global consensus)</div>

                            <h2>2. Sequential Consistency</h2>
                            <p>Operations from all clients appear to execute in some sequential order that respects each client's order. Weaker than linearizability because operations don't need to respect real-time ordering.</p>

                            <div class="code-block">Sequential vs Linearizability:

Sequential Consistency:
T0: Client A writes X = 1
T1: Client B writes X = 2
T2: Client C reads X → Might see 1 or 2 (depends on order chosen)

Actual order could be: A then B, or B then A
But each client's operations stay in order

Linearizability:
T0: Client A writes X = 1 (completes at T1)
T2: Client B writes X = 2 (starts after T1)
T3: Client C reads X → MUST see 2 (respects real-time order)

Difference: Linearizability respects wall-clock time</div>

                            <h2>3. Causal Consistency</h2>
                            <p>Operations that are causally related are seen in the same order by all clients. But concurrent operations (no causal relationship) can be seen in different orders.</p>

                            <div class="code-block">Causal Consistency Example:

Alice posts: "What's 2+2?"  (Event A)
Bob replies: "It's 4"       (Event B - caused by A)

Causal relationship: B depends on A (reply to question)

Guarantee:
- Everyone sees A before B (respects causality)
- Alice: Sees her question, then Bob's reply ✓
- Charlie: Sees Alice's question, then Bob's reply ✓

Concurrent Events (No Causality):

Alice posts: "I love pizza"  (Event A)
Bob posts: "I love pasta"    (Event B - independent)

Different users might see different orders:
- User 1: Sees A then B
- User 2: Sees B then A
Both valid! (no causal relationship)

Real Example: Facebook Timeline
- Your comments on a post appear below the post (causality)
- But unrelated posts can appear in any order</div>

                            <h2>4. Read Your Writes</h2>
                            <p>After you write a value, your subsequent reads will see that value or a newer one. But other users might still see old values.</p>

                            <div class="code-block">Read Your Writes Example:

Scenario: User updates profile

T0: Alice updates status to "Busy"
T1: Write goes to Server 1
T2: Alice refreshes page → Reads from Server 1 → Sees "Busy" ✓
T3: Bob views Alice's profile → Reads from Server 2 (lagging)
                                → Sees old status "Available"
T4: Replication completes
T5: Bob refreshes → Now sees "Busy"

Implementation:
if (user.lastWrite < 5_seconds_ago) {
  readFromPrimary(); // Where they wrote
} else {
  readFromReplica(); // Can use faster replicas
}

Real Example: Instagram
- After you post a photo, you always see it
- But your followers might see it 100ms later
- Critical for good UX!</div>

                            <h2>5. Monotonic Reads</h2>
                            <p>If you read a value once, subsequent reads will never return an older value. You don't go backwards in time.</p>

                            <div class="code-block">Monotonic Reads Example:

Without Monotonic Reads (Bad):
T0: User reads post → 100 likes (from Replica 1, fresh)
T1: User refreshes → 95 likes (from Replica 2, stale!)
    User thinks: "Did people unlike?!"

With Monotonic Reads (Good):
T0: User reads post → 100 likes (from Replica 1)
T1: User refreshes → 105 likes (from same or newer replica)
    Never goes backward

Implementation: Sticky Sessions
- Route user to same replica
- Or track version numbers (only read >= last seen version)

session.lastVersion = 100;
if (replica.version >= session.lastVersion) {
  return readFromReplica();
} else {
  return readFromFreshReplica(); // Find newer replica
}</div>

                            <h2>6. Eventual Consistency (Weakest)</h2>
                            <p>If no new updates are made, eventually all replicas will converge to the same value. No guarantees about when or in what order.</p>

                            <div class="code-block">Eventual Consistency:

T0: Write X = 1 to Server A
T1: Server A has X = 1
    Server B still has X = 0 (old value)
    Server C still has X = 0 (old value)

T2: Replication starts
    Server B now has X = 1
    Server C still has X = 0

T3: Eventually (could be seconds)
    All servers have X = 1

"Eventually" = no time guarantee
- Normal case: milliseconds
- Under load: seconds
- Network partition: minutes or hours!

Read might return:
- Latest value (lucky!)
- Slightly old value (common)
- Very old value (under partition)</div>

                            <h2>Real-World Case Study: DynamoDB</h2>

                            <div class="code-block">DynamoDB: Eventual vs Strong Consistency

Default: Eventual Consistency
- Writes go to 3 replicas
- Returns success after 1 replica acknowledges
- Read from any replica (might be stale)
- Latency: 1-2ms (fast!)

Optional: Strongly Consistent Reads
- Must read from primary replica
- Guaranteed latest data
- Latency: 3-5ms (slower)

API:
// Eventual (default, fast)
getItem({
  TableName: 'Users',
  Key: {userId: 123}
});

// Strong (slower, consistent)
getItem({
  TableName: 'Users',
  Key: {userId: 123},
  ConsistentRead: true
});

When to use each:
- User profile: Eventual (stale profile = okay)
- Payment status: Strong (can't show wrong balance)
- Shopping cart: Eventual (slight delay = okay)
- Order confirmation: Strong (must be accurate)</div>

                            <h2>Combining Consistency Models</h2>

                            <div class="code-block">Hybrid Approach: Causal + Session Guarantees

Example: Social Media Comments

Causal Consistency:
- Reply always appears after original comment
- Prevents: Reply before question

+ Read Your Writes:
- User sees their own comments immediately
- Prevents: "Where's my comment?"

+ Monotonic Reads:
- Comment counts only increase
- Prevents: "Likes disappeared!"

Result: Good UX without full linearizability

Implementation:
- Use version vectors for causality tracking
- Sticky sessions for monotonic reads
- Primary reads for recent writes</div>

                            <h2>Consistency vs Performance</h2>

                            <table class="table">
                                <tr>
                                    <th>Model</th>
                                    <th>Read Latency</th>
                                    <th>Write Latency</th>
                                    <th>Availability</th>
                                </tr>
                                <tr>
                                    <td>Linearizability</td>
                                    <td>50-100ms</td>
                                    <td>50-100ms</td>
                                    <td>Low (waits for consensus)</td>
                                </tr>
                                <tr>
                                    <td>Sequential</td>
                                    <td>20-50ms</td>
                                    <td>20-50ms</td>
                                    <td>Medium</td>
                                </tr>
                                <tr>
                                    <td>Causal</td>
                                    <td>10-20ms</td>
                                    <td>10-20ms</td>
                                    <td>Medium-High</td>
                                </tr>
                                <tr>
                                    <td>Read Your Writes</td>
                                    <td>5-10ms</td>
                                    <td>5-10ms</td>
                                    <td>High</td>
                                </tr>
                                <tr>
                                    <td>Eventual</td>
                                    <td>1-2ms</td>
                                    <td>1-2ms</td>
                                    <td>Very High</td>
                                </tr>
                            </table>

                            <h2>Choosing the Right Model</h2>

                            <div class="code-block">Decision Framework:

Question 1: Can you tolerate stale reads?
NO → Need strong consistency (Linearizable or Sequential)
YES → Continue to Question 2

Question 2: Do operations have causal relationships?
YES → Causal Consistency
NO → Continue to Question 3

Question 3: Must users see their own writes immediately?
YES → Read Your Writes minimum
NO → Continue to Question 4

Question 4: Can users see data go backwards (decreasing counts)?
NO → Monotonic Reads minimum
YES → Eventual Consistency okay

Examples:
- Bank balance: Question 1 = NO → Linearizability
- Social comments: Question 2 = YES → Causal
- User profile: Question 3 = YES → Read Your Writes
- Analytics: Question 4 = YES → Eventual okay</div>

                            <h2>Best Practices</h2>

                            <div class="code-block">1. Choose Weakest Model That Works
   - Stronger = slower
   - Don't use linearizability for likes
   - Reserve strong consistency for critical data

2. Use Different Models for Different Data
   - User balance: Strong consistency
   - User profile: Read your writes
   - View counts: Eventual consistency

3. Handle Inconsistencies Gracefully
   - Show loading states
   - "Posting..." instead of immediate display
   - Optimistic UI updates

4. Monitor Consistency Lag
   - Track replication delay
   - Alert if exceeds thresholds
   - Know your system's behavior

5. Test Under Failures
   - What happens during network partition?
   - How does app behave with stale data?
   - Simulate scenarios in testing</div>

                            <h2>Summary</h2>
                            <p>Consistency models define what guarantees distributed systems provide about data visibility and ordering. The spectrum ranges from linearizability (strongest, slowest) to eventual consistency (weakest, fastest). Linearizability provides single-copy illusion perfect for financial systems. Causal consistency respects cause-effect relationships ideal for social media. Read-your-writes ensures users see their own updates. Eventual consistency offers maximum performance for metrics and analytics. Most real systems use multiple models - strong consistency for critical data, weaker models for less critical data. The key is choosing the weakest model that satisfies your requirements, as weaker models are faster and more available.</p>

                            <p><strong>Remember:</strong> You can't have strong consistency, low latency, and high availability all at once. Choose the model that matches your data's importance and your users' expectations.</p>
                        `,
                        interviews: [
                            {
                                question: "What's the difference between linearizability and sequential consistency?",
                                answer: "Linearizability respects real-time ordering - if operation A completes before B starts, all clients see A before B. Sequential consistency only requires operations appear in some order that respects each client's order, not real-time. Example: Two concurrent writes (A writes X=1, B writes X=2). Sequential: clients might see different orders. Linearizability: once A completes, everyone must see A before any later operation. Linearizability is stronger and slower."
                            },
                            {
                                question: "Explain causal consistency with a social media example.",
                                answer: "Causal consistency ensures causally related operations are seen in order. Example: Alice asks \"What's 2+2?\", Bob replies \"It's 4\". Bob's reply causally depends on Alice's question. Causal consistency ensures everyone sees question before reply - prevents seeing reply before question (confusing!). But independent posts (Alice posts about pizza, Bob about pasta) can appear in any order since no causal relationship. Facebook uses this for comments."
                            },
                            {
                                question: "Why is \"Read Your Writes\" important for user experience?",
                                answer: "Read-your-writes guarantees users see their own updates immediately. Without it: User posts comment, refreshes, doesn't see their comment → thinks it failed → posts again → duplicate comments. With it: User always sees their post after writing. Implementation: Route user's reads to same server they wrote to, or wait 5 seconds before using replicas. Instagram uses this - you always see your own photos immediately, even if followers see it 100ms later."
                            },
                            {
                                question: "What is monotonic reads and why prevent \"going backwards\"?",
                                answer: "Monotonic reads ensures you never see older data after seeing newer data. Without it: User sees post with 100 likes (from fresh replica), refreshes, sees 95 likes (from stale replica) → confusing. With it: Subsequent reads always return same or newer version. Implementation: Sticky sessions (same replica) or version tracking (only read from replica with version >= last seen). Prevents time-traveling backwards effect."
                            },
                            {
                                question: "How does DynamoDB offer both eventual and strong consistency?",
                                answer: "DynamoDB default: eventual consistency. Writes go to 3 replicas, returns after 1 ACK, reads from any replica (fast: 1-2ms, might be stale). Optional: strongly consistent reads (ConsistentRead: true) read from primary replica only, guaranteed latest (slower: 3-5ms). Use eventual for profiles (stale okay), strong for payments (accuracy critical). This flexibility lets you optimize per-query based on importance."
                            }
                        ]
                    }
                ]
            },
            {
                title: 'Module 6: Message Queues & Async Processing',
                lessons: [
                    {
                        id: 'message-queue-fundamentals',
                        title: 'Message Queue Fundamentals',
                        duration: '50 min',
                        content: `
                            <h2>What is a Message Queue?</h2>
                            <p>A message queue is a form of asynchronous communication between services where messages are stored in a queue until they can be processed. Think of it like a mailbox - the sender drops off a message and doesn't need to wait for the recipient to be home. The recipient can pick up and process the message whenever they're ready.</p>

                            <p>Message queues act as a buffer between producers (services that send messages) and consumers (services that receive and process messages). This decoupling is one of the most powerful patterns in distributed systems, enabling you to build scalable, fault-tolerant applications.</p>

                            <div class="code-block">Without Message Queue (Synchronous):
┌──────────┐    HTTP Request    ┌──────────┐
│ Service A │ ─────────────────► │ Service B │
└──────────┘ ◄───────────────── └──────────┘
              HTTP Response

Service A WAITS for Service B to respond
If Service B is down, Service A fails

With Message Queue (Asynchronous):
┌──────────┐    ┌─────────────┐    ┌──────────┐
│ Service A │───►│ Message Queue│───►│ Service B │
└──────────┘    └─────────────┘    └──────────┘

Service A sends message and continues working
Service B processes when ready
If Service B is down, messages wait in queue</div>

                            <h2>Why Use Message Queues?</h2>

                            <h3>1. Decoupling</h3>
                            <p>Services don't need to know about each other. The producer just sends messages to the queue, and the consumer just reads from it. You can change, update, or replace either service without affecting the other.</p>

                            <h3>2. Asynchronous Processing</h3>
                            <p>The producer doesn't wait for the consumer to process the message. This is crucial for operations that take a long time, like sending emails, processing videos, or generating reports.</p>

                            <div class="code-block">Example: User signs up for your service

Synchronous approach:
1. Create user account (50ms)
2. Send welcome email (500ms)    ← User waits
3. Generate avatar (200ms)       ← User waits
4. Notify analytics (100ms)      ← User waits
Total user wait: 850ms

Asynchronous with queue:
1. Create user account (50ms)
2. Push tasks to queue (5ms)     ← Done! User continues
Total user wait: 55ms

The queue handles email, avatar, and analytics in background</div>

                            <h3>3. Load Leveling</h3>
                            <p>Message queues act as a buffer during traffic spikes. If your system suddenly receives 10x the normal traffic, the queue holds the excess messages until your consumers can catch up.</p>

                            <div class="code-block">Normal traffic: 100 requests/sec
Your system capacity: 150 requests/sec ✓

Traffic spike: 500 requests/sec
Without queue: System crashes or returns errors
With queue: Messages buffer, processed at 150/sec
             Spike clears in ~3 seconds</div>

                            <h3>4. Reliability</h3>
                            <p>If a consumer crashes while processing a message, the message isn't lost. It stays in the queue and can be reprocessed when the consumer recovers.</p>

                            <h3>5. Scalability</h3>
                            <p>You can add more consumers to process messages faster. Each consumer pulls messages independently, allowing parallel processing.</p>

                            <h2>Core Components</h2>

                            <h3>Producer (Publisher)</h3>
                            <p>The service that creates and sends messages to the queue. Producers don't need to know who will consume the messages.</p>

                            <h3>Consumer (Subscriber)</h3>
                            <p>The service that reads and processes messages from the queue. Consumers can process messages at their own pace.</p>

                            <h3>Queue (Topic)</h3>
                            <p>The storage mechanism that holds messages until they're processed. Messages are typically processed in order (FIFO - First In, First Out).</p>

                            <h3>Broker</h3>
                            <p>The server that manages queues, receives messages from producers, and delivers them to consumers. Examples: Kafka broker, RabbitMQ server.</p>

                            <div class="code-block">Message Queue Architecture:

┌──────────────────────────────────────────────┐
│              Message Broker                   │
│  ┌────────────────────────────────────────┐  │
│  │            Queue / Topic                │  │
│  │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐      │  │
│  │  │ Msg │ │ Msg │ │ Msg │ │ Msg │ ...  │  │
│  │  │  1  │ │  2  │ │  3  │ │  4  │      │  │
│  │  └─────┘ └─────┘ └─────┘ └─────┘      │  │
│  └────────────────────────────────────────┘  │
│                                              │
└──────────────────────────────────────────────┘
       ▲                              │
       │ Publish                      │ Consume
       │                              ▼
┌──────────┐                    ┌──────────┐
│ Producer │                    │ Consumer │
│ Service  │                    │ Service  │
└──────────┘                    └──────────┘</div>

                            <h2>Message Delivery Guarantees</h2>
                            <p>One of the most important concepts in message queuing is delivery semantics - how do you ensure messages are processed correctly?</p>

                            <h3>At-Most-Once Delivery</h3>
                            <p>Messages are delivered zero or one time. The message might be lost, but it will never be processed twice. This is the fastest but least reliable option.</p>
                            <div class="code-block">Use case: Logging, metrics, non-critical events
Behavior: Send and forget
Risk: Message loss acceptable</div>

                            <h3>At-Least-Once Delivery</h3>
                            <p>Messages are guaranteed to be delivered at least once, but might be delivered multiple times. If the consumer crashes after processing but before acknowledging, the message will be redelivered.</p>
                            <div class="code-block">Use case: Most business applications
Behavior: Retry until acknowledged
Risk: Duplicate processing possible
Solution: Make consumers idempotent</div>

                            <h3>Exactly-Once Delivery</h3>
                            <p>Messages are delivered exactly one time - no loss, no duplicates. This is the hardest to achieve and typically requires coordination between the queue and the consumer.</p>
                            <div class="code-block">Use case: Financial transactions, billing
Behavior: Transactional delivery
Implementation: Complex, requires idempotency keys
Examples: Kafka with exactly-once semantics, SQS FIFO</div>

                            <h2>Queue-Based vs Log-Based Systems</h2>
                            <p>There are two fundamental architectures for message queuing systems:</p>

                            <h3>Queue-Based (Traditional)</h3>
                            <p>Messages are removed from the queue once consumed. Each message is processed by exactly one consumer. Examples: RabbitMQ, Amazon SQS.</p>
                            <div class="code-block">Queue-Based Model:
Before: [Msg1] [Msg2] [Msg3] [Msg4]
Consumer takes Msg1
After:  [Msg2] [Msg3] [Msg4]

Message is REMOVED after consumption
Only ONE consumer receives each message</div>

                            <h3>Log-Based (Event Streaming)</h3>
                            <p>Messages are appended to an immutable log and retained for a configurable period. Multiple consumers can read the same messages at different offsets. Examples: Apache Kafka, Amazon Kinesis.</p>
                            <div class="code-block">Log-Based Model:
Log: [Msg1] [Msg2] [Msg3] [Msg4] [Msg5] ...
           ↑              ↑
      Consumer A     Consumer B
      (offset 2)     (offset 4)

Messages are RETAINED (not removed)
Multiple consumers can read same messages
Consumers track their own position (offset)</div>

                            <table class="table">
                                <tr>
                                    <th>Feature</th>
                                    <th>Queue-Based</th>
                                    <th>Log-Based</th>
                                </tr>
                                <tr>
                                    <td>Message Retention</td>
                                    <td>Removed after consumption</td>
                                    <td>Retained based on policy</td>
                                </tr>
                                <tr>
                                    <td>Consumer Model</td>
                                    <td>Competing consumers</td>
                                    <td>Consumer groups with offsets</td>
                                </tr>
                                <tr>
                                    <td>Replay Capability</td>
                                    <td>No</td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>Throughput</td>
                                    <td>Moderate</td>
                                    <td>Very High</td>
                                </tr>
                                <tr>
                                    <td>Use Case</td>
                                    <td>Task queues, RPC</td>
                                    <td>Event streaming, analytics</td>
                                </tr>
                            </table>

                            <h2>Popular Message Queue Systems</h2>

                            <h3>Apache Kafka</h3>
                            <p>A distributed event streaming platform designed for high-throughput, low-latency data streaming. Kafka can handle millions of messages per second using sequential disk I/O.</p>
                            <div class="code-block">Kafka Architecture:
┌─────────────────────────────────────────┐
│           Kafka Cluster                  │
│  ┌─────────────────────────────────┐    │
│  │    Topic: "user-events"          │    │
│  │  ┌──────────┐ ┌──────────┐      │    │
│  │  │Partition 0│ │Partition 1│ ... │    │
│  │  └──────────┘ └──────────┘      │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘

Best for: Event streaming, real-time analytics
Used by: Netflix, Uber, LinkedIn, Spotify</div>

                            <h3>RabbitMQ</h3>
                            <p>An open-source message broker implementing AMQP (Advanced Message Queuing Protocol). Known for flexible routing, priority queues, and support for multiple protocols.</p>
                            <div class="code-block">RabbitMQ Architecture:
┌───────────────────────────────────────────┐
│           RabbitMQ Broker                  │
│  Producer → Exchange → Binding → Queue    │
│                                           │
│  Exchange Types:                          │
│  • Direct: Route by exact key             │
│  • Fanout: Broadcast to all queues        │
│  • Topic: Route by pattern matching       │
│  • Headers: Route by message headers      │
└───────────────────────────────────────────┘

Best for: Complex routing, task queues
Used by: Reddit, 9GAG, Trivago</div>

                            <h3>Amazon SQS</h3>
                            <p>A fully managed message queuing service by AWS. No infrastructure to manage - AWS handles scaling, availability, and maintenance.</p>
                            <div class="code-block">SQS Queue Types:
┌─────────────────────────────────────────┐
│ Standard Queue                           │
│ • Best-effort ordering                   │
│ • At-least-once delivery                 │
│ • Nearly unlimited throughput            │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ FIFO Queue                               │
│ • Strict ordering guaranteed             │
│ • Exactly-once processing                │
│ • 300 messages/sec (3000 with batching) │
└─────────────────────────────────────────┘

Best for: AWS applications, serverless
Used by: Capital One, BMW, Samsung</div>

                            <h2>Real-World Case Studies</h2>

                            <h3>Netflix: Billions of Events Daily</h3>
                            <p>Netflix uses Apache Kafka as the backbone of their event-driven architecture. Every play, pause, search, and rating generates events that flow through Kafka for real-time analytics and personalization.</p>
                            <div class="code-block">Netflix Kafka Usage:
• 700+ billion messages/day
• 6+ petabytes of data/day
• Powers real-time recommendations
• Enables A/B testing at scale
• Feeds machine learning pipelines</div>

                            <h3>Uber: Coordinating Millions of Rides</h3>
                            <p>Uber processes millions of ride requests daily using message queues. Events like ride requests, driver locations, and trip updates flow through Kafka to coordinate their 2,200+ microservices.</p>
                            <div class="code-block">Uber's Event Flow:
1. User requests ride → Event to Kafka
2. Dispatch service consumes event
3. Matches with nearby driver
4. Driver accepts → Event to Kafka
5. Trip service, billing, analytics all consume
6. Real-time ETA updates via Kafka Streams</div>

                            <h2>When to Use Message Queues</h2>

                            <h3>Good Use Cases</h3>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li><strong>Background jobs:</strong> Email sending, report generation, image processing</li>
                                <li><strong>Microservice communication:</strong> Decoupling services in distributed systems</li>
                                <li><strong>Event streaming:</strong> Real-time analytics, user activity tracking</li>
                                <li><strong>Load balancing:</strong> Distributing work across multiple consumers</li>
                                <li><strong>Retry mechanisms:</strong> Automatic retries for failed operations</li>
                            </ul>

                            <h3>When NOT to Use</h3>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li><strong>Simple, synchronous operations:</strong> Direct API calls are simpler</li>
                                <li><strong>When you need immediate response:</strong> Queues add latency</li>
                                <li><strong>Small applications:</strong> Adds unnecessary complexity</li>
                            </ul>

                            <h2>Summary</h2>
                            <p>Message queues are fundamental to building scalable, reliable distributed systems. They enable asynchronous communication, decouple services, and provide resilience against failures. Understanding when to use queue-based vs log-based systems, and choosing the right delivery guarantees, is crucial for system design interviews and real-world applications.</p>
                        `,
                        interviews: [
                            {
                                question: "What is a message queue and why would you use one?",
                                answer: "A message queue is an asynchronous communication mechanism where messages are stored until processed. Use cases include: decoupling services (producer/consumer don't need to know about each other), handling traffic spikes (queue buffers messages), enabling background processing (long tasks don't block users), and improving reliability (messages persist if consumers fail)."
                            },
                            {
                                question: "Explain the difference between at-most-once, at-least-once, and exactly-once delivery.",
                                answer: "At-most-once: Messages may be lost but never duplicated - fastest, used for non-critical data like logs. At-least-once: Messages guaranteed to arrive but may duplicate - requires idempotent consumers, most common for business apps. Exactly-once: No loss or duplicates - hardest to achieve, requires coordination between queue and consumer, used for financial transactions."
                            },
                            {
                                question: "What's the difference between Kafka and RabbitMQ?",
                                answer: "Kafka is log-based: messages are retained, supports replay, uses consumer offsets, optimized for high-throughput streaming (millions/sec), best for event streaming and analytics. RabbitMQ is queue-based: messages removed after consumption, supports complex routing patterns, moderate throughput, best for task queues and traditional messaging with flexible routing needs."
                            },
                            {
                                question: "How would you handle duplicate messages in an at-least-once delivery system?",
                                answer: "Make consumers idempotent - processing the same message multiple times produces the same result. Techniques include: 1) Use unique message IDs and track processed IDs in a database/cache, 2) Use database constraints (unique keys) to prevent duplicate inserts, 3) Design operations to be naturally idempotent (SET value vs INCREMENT), 4) Use exactly-once semantics if available (Kafka transactions, SQS FIFO deduplication)."
                            },
                            {
                                question: "When would you choose a message queue over direct API calls?",
                                answer: "Use queues when: operations are long-running (video processing), you need to handle traffic spikes (Black Friday sales), services have different availability requirements, you want loose coupling between services, or you need reliable delivery with retries. Use direct calls for: synchronous operations needing immediate response, simple CRUD operations, when added complexity isn't justified."
                            }
                        ]
                    },
                    {
                        id: 'pubsub-systems',
                        title: 'Pub/Sub Systems',
                        duration: '45 min',
                        content: `
                            <h2>What is Pub/Sub?</h2>
                            <p>Pub/Sub (Publish/Subscribe) is a messaging pattern where senders (publishers) don't send messages directly to specific receivers (subscribers). Instead, publishers categorize messages into topics, and subscribers express interest in specific topics. The messaging system delivers relevant messages to interested subscribers without publishers knowing who the subscribers are.</p>

                            <p>This pattern provides the highest level of decoupling among architectural components compared to synchronous patterns like RPC or point-to-point messaging.</p>

                            <div class="code-block">Point-to-Point Messaging:
┌──────────┐         ┌──────────┐
│ Service A │ ──────► │ Service B │
└──────────┘         └──────────┘
Service A knows about Service B directly

Pub/Sub Messaging:
┌──────────┐      ┌───────────┐      ┌──────────┐
│ Publisher │ ───► │   Topic   │ ───► │Subscriber│
└──────────┘      │ "orders"  │      │    1     │
                  └───────────┘      ├──────────┤
                        │            │Subscriber│
                        └──────────► │    2     │
                                     ├──────────┤
                                     │Subscriber│
                                     └──────────┘
Publisher doesn't know who subscribes</div>

                            <h2>How Pub/Sub Works</h2>

                            <h3>Core Components</h3>

                            <h4>1. Publisher</h4>
                            <p>A service that creates and sends messages to a topic. Publishers don't need to know about subscribers - they just publish events to the topic and move on.</p>

                            <h4>2. Topic</h4>
                            <p>A named channel where messages are sent. Topics act as the intermediary between publishers and subscribers. Think of it as a radio station broadcasting on a specific frequency.</p>

                            <h4>3. Subscription</h4>
                            <p>A named resource representing the stream of messages from a single topic to be delivered to a subscribing application. Each subscription receives a copy of every message published to the topic.</p>

                            <h4>4. Subscriber</h4>
                            <p>A service that receives and processes messages from subscriptions. Subscribers can process messages at their own pace.</p>

                            <div class="code-block">Pub/Sub Message Flow:

1. Publisher sends message to Topic
   Publisher → "New order #123" → Topic: orders

2. Topic delivers to ALL subscriptions
   Topic: orders
        ├──► Subscription: inventory → Inventory Service
        ├──► Subscription: billing  → Billing Service
        └──► Subscription: analytics → Analytics Service

3. Each subscriber gets a COPY of the message
   - Inventory reduces stock
   - Billing charges customer
   - Analytics logs event

All happen independently and in parallel!</div>

                            <h2>Pub/Sub vs Message Queues</h2>
                            <p>While often used interchangeably, Pub/Sub and Message Queues have distinct characteristics:</p>

                            <table class="table">
                                <tr>
                                    <th>Feature</th>
                                    <th>Message Queue</th>
                                    <th>Pub/Sub</th>
                                </tr>
                                <tr>
                                    <td>Message Delivery</td>
                                    <td>One consumer per message</td>
                                    <td>All subscribers get every message</td>
                                </tr>
                                <tr>
                                    <td>Consumer Model</td>
                                    <td>Competing consumers</td>
                                    <td>Independent subscribers</td>
                                </tr>
                                <tr>
                                    <td>Use Case</td>
                                    <td>Task distribution</td>
                                    <td>Event broadcasting</td>
                                </tr>
                                <tr>
                                    <td>Coupling</td>
                                    <td>Low</td>
                                    <td>Very low (highest decoupling)</td>
                                </tr>
                                <tr>
                                    <td>Scaling</td>
                                    <td>Add consumers to process faster</td>
                                    <td>Add subscribers for new features</td>
                                </tr>
                            </table>

                            <div class="code-block">Message Queue: Work distribution
┌────────────────────────────┐
│ Queue: process-payments    │
│ [Pay1] [Pay2] [Pay3] [Pay4]│
└────────────────────────────┘
    ↓       ↓       ↓
 Worker1 Worker2 Worker3
Each payment processed by ONE worker

Pub/Sub: Event broadcasting
┌─────────────────────────────┐
│ Topic: payment-completed     │
│ Payment #123 completed       │
└─────────────────────────────┘
    ↓           ↓           ↓
 Email       Analytics   Inventory
 Service     Service     Service
All services receive the same event</div>

                            <h2>Fan-Out Pattern</h2>
                            <p>One of the most powerful patterns in Pub/Sub is fan-out - one message triggers multiple independent processes. This enables building loosely coupled systems where adding new functionality is as simple as creating a new subscription.</p>

                            <div class="code-block">Fan-Out Example: E-commerce Order Placed

Event: "Order #456 placed for $150"
           │
    Topic: order-placed
           │
    ┌──────┼──────┬───────┬────────┐
    ↓      ↓      ↓       ↓        ↓
 Inventory Email  SMS   Analytics Fraud
 Service   Svc    Svc   Service   Detection

Each service:
• Has its own subscription
• Processes independently
• Can fail without affecting others
• Can be added/removed without changing publisher</div>

                            <h2>Popular Pub/Sub Systems</h2>

                            <h3>Google Cloud Pub/Sub</h3>
                            <p>A fully managed, serverless messaging service with global scale. Pub/Sub uses dynamic sharding that you don't see - you create topics and subscriptions, and Google handles all the complexity behind the scenes.</p>

                            <div class="code-block">Google Cloud Pub/Sub Architecture:
┌────────────────────────────────────────┐
│        Google Cloud Pub/Sub             │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │        Topic: user-events        │   │
│  └─────────────────────────────────┘   │
│           │           │                 │
│  ┌────────┴───┐ ┌─────┴────────┐       │
│  │Subscription│ │ Subscription │       │
│  │  "audit"   │ │  "analytics" │       │
│  └────────────┘ └──────────────┘       │
│                                         │
│  Features:                              │
│  • Auto-scaling (no partition math)    │
│  • ~100ms typical latency              │
│  • At-least-once delivery              │
│  • 7-day message retention             │
└────────────────────────────────────────┘

Subscription Types:
• Pull: Subscriber pulls messages
• Push: Pub/Sub pushes to HTTP endpoint
• BigQuery: Direct export to BigQuery
• Cloud Storage: Archive to GCS</div>

                            <h3>Apache Kafka (as Pub/Sub)</h3>
                            <p>While Kafka is primarily a distributed log, it supports Pub/Sub patterns through consumer groups. Each consumer group acts like an independent subscription, receiving all messages from a topic.</p>

                            <div class="code-block">Kafka Pub/Sub with Consumer Groups:

Topic: user-activity
Partitions: [P0] [P1] [P2]

Consumer Group: analytics
├── Consumer A (reads P0)
├── Consumer B (reads P1)
└── Consumer C (reads P2)
    → Gets ALL messages (distributed)

Consumer Group: recommendations
├── Consumer X (reads P0, P1)
└── Consumer Y (reads P2)
    → Gets ALL messages (different distribution)

Both groups receive complete data independently!</div>

                            <h3>Amazon SNS + SQS</h3>
                            <p>AWS achieves Pub/Sub by combining SNS (Simple Notification Service) for fan-out with SQS (Simple Queue Service) for durable message delivery to each subscriber.</p>

                            <div class="code-block">AWS SNS + SQS Pattern:

     Publisher
         │
         ↓
 ┌───────────────┐
 │  SNS Topic    │
 │ "order-events"│
 └───────────────┘
    │    │    │
    ↓    ↓    ↓
┌─────┐┌─────┐┌─────┐
│ SQS ││ SQS ││ SQS │
│Queue││Queue││Queue│
│  A  ││  B  ││  C  │
└─────┘└─────┘└─────┘
   │      │      │
   ↓      ↓      ↓
Service Service Service
   A       B       C

SNS: Broadcasts to all subscribed queues
SQS: Provides durability for each subscriber</div>

                            <h2>Kafka vs Google Pub/Sub</h2>
                            <p>Two leading Pub/Sub solutions with different philosophies:</p>

                            <table class="table">
                                <tr>
                                    <th>Feature</th>
                                    <th>Apache Kafka</th>
                                    <th>Google Pub/Sub</th>
                                </tr>
                                <tr>
                                    <td>Management</td>
                                    <td>Self-managed or managed (Confluent)</td>
                                    <td>Fully managed, serverless</td>
                                </tr>
                                <tr>
                                    <td>Scaling</td>
                                    <td>Manual partition management</td>
                                    <td>Automatic, transparent</td>
                                </tr>
                                <tr>
                                    <td>Ordering</td>
                                    <td>Per-partition ordering</td>
                                    <td>Per-message key ordering</td>
                                </tr>
                                <tr>
                                    <td>Throughput</td>
                                    <td>Very high (millions/sec)</td>
                                    <td>High (auto-scales)</td>
                                </tr>
                                <tr>
                                    <td>Replay</td>
                                    <td>Yes (offset-based)</td>
                                    <td>Yes (seek to timestamp)</td>
                                </tr>
                                <tr>
                                    <td>Best For</td>
                                    <td>High-volume streaming, full control</td>
                                    <td>Cloud-native, operational simplicity</td>
                                </tr>
                            </table>

                            <h2>Delivery Semantics in Pub/Sub</h2>

                            <h3>Push vs Pull Delivery</h3>
                            <div class="code-block">Pull Model:
┌────────────┐     "Any messages?"    ┌───────────┐
│ Subscriber │ ◄─────────────────────│   Topic   │
│            │         [Messages]     │           │
└────────────┘ ─────────────────────► └───────────┘
                  "Acknowledge"

• Subscriber controls pace
• Good for batch processing
• Can handle backpressure

Push Model:
┌────────────┐     [Messages]         ┌───────────┐
│ Subscriber │ ◄─────────────────────│   Topic   │
│ (webhook)  │                        │           │
└────────────┘                        └───────────┘

• Immediate delivery
• Good for real-time processing
• Requires webhook endpoint</div>

                            <h3>Message Acknowledgment</h3>
                            <p>Subscribers must acknowledge messages after successful processing. If not acknowledged within a deadline, the message is redelivered. This ensures at-least-once delivery.</p>

                            <div class="code-block">Acknowledgment Flow:

1. Topic delivers message to subscriber
2. Subscriber processes message
3. Subscriber sends ACK
4. Topic marks message as delivered

If step 3 doesn't happen (crash, timeout):
→ Message redelivered to same or different subscriber
→ Requires idempotent processing!</div>

                            <h2>Real-World Use Cases</h2>

                            <h3>Event Distribution</h3>
                            <p>When something happens in your system (user signup, order placed, payment received), broadcast the event to all interested services.</p>

                            <h3>Data Pipeline Ingestion</h3>
                            <p>Collect events from multiple sources (mobile apps, web, IoT devices) into a single topic, then distribute to analytics, storage, and processing systems.</p>

                            <h3>Microservice Communication</h3>
                            <p>Services publish domain events without knowing who consumes them. New services can subscribe to existing events without modifying publishers.</p>

                            <div class="code-block">Microservice Event Flow:

User Service publishes: "user.created"
   │
   ├──► Email Service: Send welcome email
   ├──► Analytics: Track new user
   ├──► Recommendations: Initialize profile
   └──► Billing: Set up account

Adding CRM integration?
Just subscribe to "user.created" - no changes needed!</div>

                            <h3>IoT Data Collection</h3>
                            <p>Millions of devices publish sensor data to topics. Analytics services, alerting systems, and storage all subscribe independently.</p>

                            <h2>Best Practices</h2>

                            <h3>Topic Design</h3>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li><strong>One topic per event type:</strong> "orders.created", "orders.shipped", not "orders.all"</li>
                                <li><strong>Use consistent naming:</strong> domain.action format (e.g., "payment.completed")</li>
                                <li><strong>Don't over-segment:</strong> Too many topics increases operational complexity</li>
                            </ul>

                            <h3>Message Design</h3>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li><strong>Include all necessary data:</strong> Subscribers shouldn't need to call back to publisher</li>
                                <li><strong>Use schema versioning:</strong> Avro, Protobuf, or JSON Schema for evolution</li>
                                <li><strong>Add metadata:</strong> Timestamp, correlation ID, source system</li>
                            </ul>

                            <h3>Subscriber Design</h3>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li><strong>Make processing idempotent:</strong> Same message processed twice = same result</li>
                                <li><strong>Handle poison messages:</strong> Move failing messages to dead letter queue</li>
                                <li><strong>Scale independently:</strong> Each subscription can have different consumer counts</li>
                            </ul>

                            <h2>Summary</h2>
                            <p>Pub/Sub is a powerful pattern for building decoupled, scalable systems. Unlike point-to-point messaging, Pub/Sub enables broadcasting events to multiple independent subscribers. This fan-out capability makes it ideal for event-driven architectures, microservices communication, and real-time data distribution. Choose between managed services like Google Pub/Sub for operational simplicity, or self-managed solutions like Kafka for maximum control and throughput.</p>
                        `,
                        interviews: [
                            {
                                question: "What is the Pub/Sub pattern and how does it differ from traditional message queues?",
                                answer: "Pub/Sub (Publish/Subscribe) is a messaging pattern where publishers send messages to topics without knowing about subscribers, and subscribers receive all messages from topics they're interested in. Key difference from message queues: in queues, one consumer processes each message (work distribution); in Pub/Sub, all subscribers receive every message (event broadcasting). Pub/Sub provides higher decoupling."
                            },
                            {
                                question: "Explain the fan-out pattern in Pub/Sub systems.",
                                answer: "Fan-out is when one published message triggers multiple independent processes. When a message is published to a topic, it's delivered to ALL subscriptions. Each subscriber processes the message independently. Example: 'order placed' event fans out to inventory (reduce stock), billing (charge customer), email (send confirmation), and analytics (log event) - all happening in parallel without knowing about each other."
                            },
                            {
                                question: "How would you choose between Kafka and Google Cloud Pub/Sub?",
                                answer: "Choose Kafka when: you need very high throughput (millions/sec), want full control over infrastructure, need complex stream processing (Kafka Streams), or require longer message retention. Choose Google Pub/Sub when: you want serverless/fully managed operations, need automatic scaling without partition management, prefer operational simplicity, or are building cloud-native on GCP. Kafka = control + power; Pub/Sub = simplicity + managed."
                            },
                            {
                                question: "What is the difference between push and pull delivery in Pub/Sub?",
                                answer: "Pull: Subscriber periodically asks 'any new messages?' and processes at its own pace. Good for batch processing and handling backpressure. Requires polling infrastructure. Push: System sends messages directly to subscriber's HTTP endpoint as they arrive. Good for real-time processing. Requires webhook endpoint and can overwhelm slow consumers. Most systems support both - use pull for high-volume batch, push for low-latency real-time."
                            },
                            {
                                question: "How do you ensure messages aren't lost in a Pub/Sub system?",
                                answer: "1) Message acknowledgment: Subscribers must ACK after successful processing; unACKed messages are redelivered. 2) Dead letter queues: Failed messages after max retries go to DLQ for investigation. 3) Message retention: Topics retain messages for configured period (hours/days). 4) Durable subscriptions: Subscription state persists even if subscriber is offline. 5) Idempotent consumers: Handle duplicate deliveries safely. Combine these for at-least-once delivery guarantee."
                            }
                        ]
                    },
                    {
                        id: 'event-driven-architecture',
                        title: 'Event-Driven Architecture',
                        duration: '55 min',
                        content: `
                            <h2>What is Event-Driven Architecture?</h2>
                            <p>Event-Driven Architecture (EDA) is a software design pattern where the flow of the program is determined by events - significant changes in state. Instead of services calling each other directly, they communicate by producing and consuming events. When something important happens (a user signs up, an order is placed, a payment succeeds), an event is emitted, and interested services react to it.</p>

                            <p>This architectural style enables building highly scalable, loosely coupled systems where services can evolve independently. Companies like Netflix, Uber, and LinkedIn process billions of events daily using EDA.</p>

                            <div class="code-block">Traditional Request-Response:
┌─────────┐  Request   ┌─────────┐  Request   ┌─────────┐
│ Order   │ ─────────► │Inventory│ ─────────► │ Payment │
│ Service │ ◄───────── │ Service │ ◄───────── │ Service │
└─────────┘  Response  └─────────┘  Response  └─────────┘

Services are tightly coupled, synchronous, and blocking

Event-Driven Architecture:
┌─────────┐
│ Order   │──► Event: "OrderCreated" ──┬──► Inventory Service
│ Service │                            ├──► Payment Service
└─────────┘                            ├──► Email Service
                                       └──► Analytics Service

Services react to events independently and asynchronously</div>

                            <h2>Core Concepts</h2>

                            <h3>Events</h3>
                            <p>An event is a record of something that happened. It's immutable (can't be changed) and represents a fact. Events are typically named in past tense because they describe something that already occurred.</p>

                            <div class="code-block">Event Examples:
• UserRegistered
• OrderPlaced
• PaymentCompleted
• InventoryUpdated
• EmailSent

Event Structure:
{
  "eventType": "OrderPlaced",
  "eventId": "evt-123-456",
  "timestamp": "2024-01-15T10:30:00Z",
  "source": "order-service",
  "data": {
    "orderId": "ord-789",
    "customerId": "cust-456",
    "items": [...],
    "totalAmount": 150.00
  },
  "metadata": {
    "correlationId": "req-abc-123",
    "version": "1.0"
  }
}</div>

                            <h3>Event Producers</h3>
                            <p>Services that detect state changes and emit events. A producer doesn't know or care who consumes its events - it simply publishes what happened.</p>

                            <h3>Event Consumers</h3>
                            <p>Services that subscribe to events and react to them. Consumers are independent - they can process events at their own pace, and new consumers can be added without changing producers.</p>

                            <h3>Event Broker</h3>
                            <p>The infrastructure that routes events from producers to consumers. Examples include Apache Kafka, RabbitMQ, Amazon EventBridge, and Google Pub/Sub.</p>

                            <h2>EDA Patterns</h2>

                            <h3>1. Event Notification</h3>
                            <p>The simplest pattern - events notify other services that something happened. The event contains minimal data, and consumers may need to query the producer for full details.</p>

                            <div class="code-block">Event Notification:
┌─────────────┐    "OrderPlaced: #123"    ┌─────────────┐
│Order Service│ ─────────────────────────►│  Inventory  │
└─────────────┘                           └─────────────┘
                                                 │
                                                 ▼
                                          "Get order details"
                                                 │
                                                 ▼
                                          ┌─────────────┐
                                          │Order Service│
                                          └─────────────┘

Pros: Small events, simple
Cons: Consumer must call back for data (coupling)</div>

                            <h3>2. Event-Carried State Transfer</h3>
                            <p>Events carry all the data consumers need. No callback required - consumers have everything they need in the event itself.</p>

                            <div class="code-block">Event-Carried State Transfer:
{
  "eventType": "OrderPlaced",
  "data": {
    "orderId": "ord-123",
    "customerId": "cust-456",
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "items": [
      {"productId": "prod-1", "name": "Widget", "qty": 2, "price": 25.00}
    ],
    "shippingAddress": {...},
    "totalAmount": 50.00
  }
}

Pros: No callback needed, true decoupling
Cons: Larger events, potential data duplication</div>

                            <h3>3. Event Sourcing</h3>
                            <p>Instead of storing current state, store the sequence of events that led to that state. The current state can be reconstructed by replaying all events.</p>

                            <div class="code-block">Traditional State Storage:
┌─────────────────────────────────┐
│ Account: acc-123                │
│ Balance: $500                   │
│ LastUpdated: 2024-01-15         │
└─────────────────────────────────┘

Event Sourcing:
┌─────────────────────────────────────────────┐
│ Event Log for acc-123:                       │
│ 1. AccountCreated    $0     (2024-01-01)    │
│ 2. MoneyDeposited    +$1000 (2024-01-05)    │
│ 3. MoneyWithdrawn    -$200  (2024-01-10)    │
│ 4. MoneyWithdrawn    -$300  (2024-01-15)    │
│ ─────────────────────────────────           │
│ Current Balance: $500 (computed from events)│
└─────────────────────────────────────────────┘

Benefits:
• Complete audit trail
• Can replay to any point in time
• Debug by replaying events
• Temporal queries ("balance on Jan 10?")</div>

                            <h3>4. CQRS (Command Query Responsibility Segregation)</h3>
                            <p>Separate the read model (queries) from the write model (commands). Often combined with Event Sourcing - writes append events, reads use optimized projections.</p>

                            <div class="code-block">CQRS Architecture:

                    Commands                    Queries
                       │                           │
                       ▼                           ▼
               ┌──────────────┐           ┌──────────────┐
               │ Write Model  │           │  Read Model  │
               │ (Event Store)│           │ (Projections)│
               └──────────────┘           └──────────────┘
                       │                           ▲
                       │     Events                │
                       └───────────────────────────┘

Write Side: Handles commands, validates, stores events
Read Side: Subscribes to events, builds optimized read views

Example:
• Write: "PlaceOrder" command → validates → stores OrderPlaced event
• Read: OrderPlaced event → updates order list projection
• Query: "Get my orders" → reads from optimized projection (fast!)</div>

                            <h2>Real-World Case Studies</h2>

                            <h3>Netflix: Processing Billions of Events</h3>
                            <p>Netflix uses event-driven architecture powered by Apache Kafka to process over 700 billion events per day. Their architecture enables:</p>

                            <div class="code-block">Netflix Event Flow:

User Actions (play, pause, search, rate)
              │
              ▼
     ┌───────────────┐
     │ Apache Kafka  │ (700B+ events/day)
     │   Cluster     │
     └───────────────┘
              │
     ┌────────┼────────┬─────────────┐
     ▼        ▼        ▼             ▼
Real-time   ML      Analytics    Billing
Recommend.  Training  Pipeline    System

Key Practices:
• Consumer microservices with Spring Kafka
• Keyed messages for event ordering
• Schema Registry (Avro) for data contracts
• UUID tracking for guaranteed delivery</div>

                            <h3>Uber: Coordinating 23 Million Daily Rides</h3>
                            <p>Uber's 2,200+ microservices communicate through events. Their event-driven architecture handles ride matching, pricing, fraud detection, and more.</p>

                            <div class="code-block">Uber Ride Flow:

1. Rider requests ride
   │
   ▼ Event: RideRequested
   │
2. Dispatch service matches driver
   │
   ▼ Event: DriverMatched
   │
3. Driver accepts
   │
   ▼ Event: RideAccepted
   │
   ├──► ETA Service (updates time)
   ├──► Pricing Service (calculates fare)
   ├──► Fraud Service (monitors anomalies)
   └──► Analytics (tracks metrics)

All services react independently to events</div>

                            <h2>Benefits of Event-Driven Architecture</h2>

                            <h3>1. Loose Coupling</h3>
                            <p>Services don't know about each other - they only know about events. You can add, remove, or modify services without changing others.</p>

                            <h3>2. Scalability</h3>
                            <p>Services can scale independently based on their event processing needs. High-volume consumers can have more instances than low-volume ones.</p>

                            <h3>3. Resilience</h3>
                            <p>If a service goes down, events are stored in the broker and processed when it recovers. Failures don't cascade through the system.</p>

                            <h3>4. Flexibility</h3>
                            <p>Easy to add new functionality - just create a new service that subscribes to existing events. No changes to existing services needed.</p>

                            <h3>5. Real-Time Processing</h3>
                            <p>Events can be processed as they happen, enabling real-time dashboards, alerts, and responses.</p>

                            <h2>Challenges and Solutions</h2>

                            <h3>Challenge 1: Eventual Consistency</h3>
                            <p>In EDA, data is eventually consistent - there's a delay between when an event is produced and when all consumers process it.</p>
                            <div class="code-block">Problem: User places order, immediately checks order status
         Order not yet visible (event still processing)

Solutions:
• Accept eventual consistency (update UI appropriately)
• Return command result synchronously, async for side effects
• Use read-your-writes consistency where critical</div>

                            <h3>Challenge 2: Event Ordering</h3>
                            <p>Events for the same entity might arrive out of order, especially with partitioned systems.</p>
                            <div class="code-block">Problem: "OrderShipped" processed before "OrderPlaced"

Solutions:
• Partition by entity ID (all events for order-123 go to same partition)
• Include sequence numbers in events
• Design consumers to handle out-of-order events</div>

                            <h3>Challenge 3: Duplicate Events</h3>
                            <p>At-least-once delivery means consumers might receive the same event multiple times.</p>
                            <div class="code-block">Problem: Payment processed twice

Solutions:
• Idempotent consumers (same event processed twice = same result)
• Track processed event IDs
• Use database constraints (unique keys)
• Design operations to be naturally idempotent</div>

                            <h3>Challenge 4: Debugging and Tracing</h3>
                            <p>Following a request across multiple asynchronous services is hard.</p>
                            <div class="code-block">Solutions:
• Correlation IDs: Include in all events for tracing
• Distributed tracing (OpenTelemetry, Jaeger)
• Centralized logging with correlation
• Event visualization tools</div>

                            <h2>The Saga Pattern</h2>
                            <p>How do you handle distributed transactions in EDA? The Saga pattern manages transactions across multiple services through a sequence of local transactions and compensating actions.</p>

                            <div class="code-block">Order Saga Example:

Happy Path:
1. Order Service: CreateOrder → OrderCreated
2. Payment Service: ProcessPayment → PaymentCompleted
3. Inventory Service: ReserveItems → ItemsReserved
4. Shipping Service: CreateShipment → ShipmentCreated
✓ Order Complete

Failure Path (Payment fails):
1. Order Service: CreateOrder → OrderCreated
2. Payment Service: ProcessPayment → PaymentFailed
3. Order Service: CancelOrder (compensating action)
✗ Order Cancelled, User notified

Types:
• Choreography: Services react to events independently
• Orchestration: Central coordinator manages the saga</div>

                            <h2>Best Practices</h2>

                            <h3>Event Design</h3>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li><strong>Use past tense:</strong> Events describe what happened (OrderPlaced, not PlaceOrder)</li>
                                <li><strong>Include all needed data:</strong> Avoid forcing consumers to call back</li>
                                <li><strong>Version your schemas:</strong> Use Avro/Protobuf with schema registry</li>
                                <li><strong>Add metadata:</strong> Timestamp, correlation ID, source, version</li>
                            </ul>

                            <h3>Consumer Design</h3>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li><strong>Idempotency:</strong> Handle duplicate events safely</li>
                                <li><strong>Graceful degradation:</strong> Handle missing/malformed events</li>
                                <li><strong>Dead letter queues:</strong> Move poison messages for investigation</li>
                                <li><strong>Monitoring:</strong> Track lag, errors, processing time</li>
                            </ul>

                            <h3>System Design</h3>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li><strong>Start simple:</strong> Don't over-architect from day one</li>
                                <li><strong>Domain-driven design:</strong> Define bounded contexts and domain events</li>
                                <li><strong>Observability:</strong> Distributed tracing, metrics, logging</li>
                                <li><strong>Test with chaos:</strong> Simulate failures, network partitions</li>
                            </ul>

                            <h2>Summary</h2>
                            <p>Event-Driven Architecture enables building scalable, resilient systems where services communicate through events rather than direct calls. Key patterns include Event Notification, Event-Carried State Transfer, Event Sourcing, and CQRS. While EDA introduces challenges like eventual consistency and debugging complexity, these can be addressed with proper patterns and tooling. Companies like Netflix and Uber demonstrate that EDA can handle billions of events daily when implemented correctly.</p>
                        `,
                        interviews: [
                            {
                                question: "What is Event-Driven Architecture and what are its main benefits?",
                                answer: "EDA is a design pattern where services communicate by producing and consuming events instead of direct calls. Benefits: 1) Loose coupling - services don't know about each other, 2) Scalability - services scale independently, 3) Resilience - failures don't cascade, events are buffered, 4) Flexibility - add new features by subscribing to existing events, 5) Real-time processing - react to events as they happen."
                            },
                            {
                                question: "Explain Event Sourcing and when you would use it.",
                                answer: "Event Sourcing stores the sequence of events that led to current state, rather than storing current state directly. Current state is computed by replaying events. Use cases: 1) Audit requirements (banking, compliance), 2) Temporal queries ('what was the balance on Jan 10?'), 3) Debugging (replay events to reproduce bugs), 4) Event replay for new consumers. Trade-offs: complexity, storage growth, eventual consistency."
                            },
                            {
                                question: "What is CQRS and how does it relate to Event Sourcing?",
                                answer: "CQRS (Command Query Responsibility Segregation) separates read and write models. Commands modify state (writes), Queries return data (reads). Often combined with Event Sourcing: writes append events to event store, events are projected to optimized read models. Benefits: optimize read/write independently, scale separately, different data models per use case. Use when read/write patterns differ significantly."
                            },
                            {
                                question: "How do you handle distributed transactions in Event-Driven Architecture?",
                                answer: "Use the Saga pattern - a sequence of local transactions with compensating actions for rollback. Two approaches: 1) Choreography - services react to events independently, each publishes next event, 2) Orchestration - central coordinator manages saga steps. Example: Order saga creates order, processes payment, reserves inventory. If payment fails, compensating actions cancel order and release inventory."
                            },
                            {
                                question: "What are the challenges of Event-Driven Architecture and how do you address them?",
                                answer: "1) Eventual consistency: Accept it, design UI appropriately, use sync responses where critical. 2) Event ordering: Partition by entity ID, include sequence numbers. 3) Duplicate events: Idempotent consumers, track processed event IDs. 4) Debugging: Correlation IDs, distributed tracing (OpenTelemetry), centralized logging. 5) Complexity: Start simple, use domain-driven design, invest in observability."
                            }
                        ]
                    }
                ]
            },
            {
                title: 'Module 7: APIs & Communication',
                lessons: [
                    {
                        id: 'rest-api-design',
                        title: 'REST API Design Best Practices',
                        duration: '50 min',
                        content: `
                            <h2>What is REST?</h2>
                            <p>REST (Representational State Transfer) is an architectural style for designing networked applications. It relies on a stateless, client-server communication protocol - almost always HTTP. REST APIs are the backbone of modern web services, powering everything from mobile apps to microservices.</p>

                            <p>A well-designed REST API is intuitive, consistent, and developer-friendly. Poor API design leads to confusion, bugs, and frustrated developers. Companies like Stripe, Twilio, and GitHub are renowned for their excellent API design.</p>

                            <div class="code-block">REST Principles:
1. Client-Server: Separation of concerns
2. Stateless: Each request contains all needed information
3. Cacheable: Responses can be cached
4. Uniform Interface: Consistent resource-based URLs
5. Layered System: Client can't tell if connected directly to server

Example REST API:
GET    /users           → List all users
GET    /users/123       → Get user 123
POST   /users           → Create a new user
PUT    /users/123       → Update user 123
DELETE /users/123       → Delete user 123</div>

                            <h2>URL Design</h2>

                            <h3>Use Nouns, Not Verbs</h3>
                            <p>URLs should represent resources (things), not actions. The HTTP method indicates the action.</p>

                            <div class="code-block">Bad:
GET  /getUsers
POST /createUser
POST /deleteUser/123

Good:
GET    /users          ← HTTP method indicates "get"
POST   /users          ← HTTP method indicates "create"
DELETE /users/123      ← HTTP method indicates "delete"</div>

                            <h3>Use Plural Nouns</h3>
                            <p>Keep it consistent - always use plural nouns for collections.</p>

                            <h3>Nest Resources Logically</h3>
                            <p>Use nesting to show relationships, but don't go too deep (max 2-3 levels).</p>

                            <div class="code-block">Good nesting:
GET /users/123/orders          ← Orders for user 123
GET /users/123/orders/456      ← Order 456 for user 123

Too deep (avoid):
GET /users/123/orders/456/items/789/reviews</div>

                            <h2>HTTP Methods and Status Codes</h2>

                            <table class="table">
                                <tr>
                                    <th>Method</th>
                                    <th>Purpose</th>
                                    <th>Idempotent?</th>
                                </tr>
                                <tr>
                                    <td>GET</td>
                                    <td>Retrieve resource(s)</td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>POST</td>
                                    <td>Create a new resource</td>
                                    <td>No</td>
                                </tr>
                                <tr>
                                    <td>PUT</td>
                                    <td>Replace entire resource</td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>PATCH</td>
                                    <td>Partial update</td>
                                    <td>No</td>
                                </tr>
                                <tr>
                                    <td>DELETE</td>
                                    <td>Remove resource</td>
                                    <td>Yes</td>
                                </tr>
                            </table>

                            <div class="code-block">HTTP Status Codes:
2xx Success:
200 OK              - Request succeeded
201 Created         - Resource created (POST)
204 No Content      - Success, no body (DELETE)

4xx Client Error:
400 Bad Request     - Invalid syntax/parameters
401 Unauthorized    - Authentication required
403 Forbidden       - Authenticated but not authorized
404 Not Found       - Resource doesn't exist
429 Too Many Requests - Rate limit exceeded

5xx Server Error:
500 Internal Error  - Generic server error
503 Service Unavailable - Server overloaded</div>

                            <h2>API Versioning</h2>
                            <p>Always version your API from day one. Breaking changes without versioning will anger every consumer.</p>

                            <div class="code-block">Versioning Strategies:
1. URL Path (Most Common): /v1/users
2. Query Parameter: /users?version=1
3. Header: API-Version: 2024-01-15
4. Stripe's Hybrid: URL major version + header date version</div>

                            <h2>Pagination</h2>
                            <p>Never return unbounded lists. Always paginate collections.</p>

                            <div class="code-block">Offset-Based: GET /users?limit=25&offset=50
• Simple, allows jumping to any page
• Slow for large offsets

Cursor-Based: GET /users?limit=25&cursor=abc123
• Uses pointer to last item
• Consistent, performant at any position
• Used by Twitter, Facebook, Slack</div>

                            <h2>Idempotency (Stripe's Approach)</h2>
                            <p>Stripe pioneered idempotency keys for safe retries:</p>

                            <div class="code-block">POST /v1/charges
Idempotency-Key: ord_12345_charge_attempt_1

How it works:
1. Client generates unique key (UUID or order ID)
2. Server stores key + response for first request
3. Same key = return stored response
4. Keys expire after 24 hours

Benefits: Safe retries, prevents double charges</div>

                            <h2>Error Handling</h2>
                            <div class="code-block">Good Error Response:
{
  "error": {
    "code": "validation_error",
    "message": "Invalid request parameters",
    "details": [
      {"field": "email", "message": "Invalid email format"}
    ],
    "request_id": "req_abc123"
  }
}</div>

                            <h2>Summary</h2>
                            <p>Great REST API design is about consistency, clarity, and developer experience. Use nouns for URLs, appropriate HTTP methods and status codes, version from day one, implement pagination, provide clear errors, and design for idempotency.</p>
                        `,
                        interviews: [
                            {
                                question: "What makes a good REST API design?",
                                answer: "Good REST API design includes: 1) Resource-based URLs using nouns not verbs, 2) Correct HTTP methods (GET for read, POST for create), 3) Appropriate status codes, 4) Versioning from day one, 5) Pagination for collections, 6) Clear error messages, 7) Idempotency support for safe retries."
                            },
                            {
                                question: "Explain idempotency and why it matters for APIs.",
                                answer: "Idempotency means multiple identical requests have the same effect as one request. It matters because network failures happen and clients need to retry safely. GET, PUT, DELETE are naturally idempotent. POST needs idempotency keys - unique IDs sent with request. Stripe uses 24-hour idempotency keys for all POST requests to prevent double charges."
                            },
                            {
                                question: "What are the different API versioning strategies?",
                                answer: "1) URL path (/v1/users) - most visible, easy to route. 2) Query parameter (?version=1) - keeps URL clean. 3) Header (API-Version: 2) - cleanest URLs but hidden. 4) Stripe's hybrid - URL for major version, header for date-based sub-versions. Create new versions for breaking changes only."
                            },
                            {
                                question: "Compare offset-based vs cursor-based pagination.",
                                answer: "Offset-based (?limit=25&offset=50): Simple, allows jumping to any page, but slow for large offsets and inconsistent with real-time data. Cursor-based (?cursor=abc123): Uses pointer to last item, consistent results, performant at any position, but can't jump to specific pages. Cursor-based preferred for real-time feeds."
                            }
                        ]
                    },
                    {
                        id: 'graphql-rest-grpc',
                        title: 'GraphQL vs REST vs gRPC',
                        duration: '55 min',
                        content: `
                            <h2>The API Landscape</h2>
                            <p>In 2025, most systems use a hybrid approach: REST for simplicity, GraphQL for frontend flexibility, and gRPC for high-performance microservices.</p>

                            <div class="code-block">Who uses what:
• Netflix: gRPC for streaming, GraphQL for recommendations, REST for accounts
• Uber: REST for drivers, gRPC for location, GraphQL for rider apps
• Airbnb: GraphQL for mobile apps, REST for partners</div>

                            <h2>REST (Representational State Transfer)</h2>
                            <div class="code-block">GET /users/123
Response: { "id": 123, "name": "John", "email": "john@example.com" }

Strengths: Simple, cacheable, huge ecosystem
Weaknesses: Over-fetching, under-fetching, fixed responses</div>

                            <h2>GraphQL</h2>
                            <p>Single endpoint where clients specify exactly what data they need.</p>

                            <div class="code-block">POST /graphql
query {
  user(id: 123) {
    name
    orders(limit: 5) { id, total }
  }
}

User + orders in ONE request, only requested fields!

Strengths: No over-fetching, single request, strongly typed
Weaknesses: Caching harder, N+1 problem, 25-35% higher server cost</div>

                            <h2>gRPC</h2>
                            <p>Uses Protocol Buffers (binary) over HTTP/2 for high-performance RPC.</p>

                            <div class="code-block">// user.proto
service UserService {
  rpc GetUser(UserRequest) returns (User);
  rpc ListOrders(Request) returns (stream Order);
}

Strengths: 10x faster than REST, streaming, strongly typed
Weaknesses: Not browser-friendly, binary harder to debug</div>

                            <h2>Performance Comparison</h2>
                            <table class="table">
                                <tr>
                                    <th>Metric</th>
                                    <th>REST</th>
                                    <th>GraphQL</th>
                                    <th>gRPC</th>
                                </tr>
                                <tr>
                                    <td>Latency</td>
                                    <td>250ms</td>
                                    <td>180ms</td>
                                    <td>25ms</td>
                                </tr>
                                <tr>
                                    <td>Throughput</td>
                                    <td>20K/sec</td>
                                    <td>15K/sec</td>
                                    <td>50K/sec</td>
                                </tr>
                            </table>

                            <h2>When to Use Each</h2>
                            <div class="code-block">Use REST: Simple CRUD, public APIs, need HTTP caching
Use GraphQL: Frontend flexibility, complex nested data, mobile apps
Use gRPC: Microservices, low latency critical, real-time streaming</div>

                            <h2>Netflix's Architecture</h2>
                            <div class="code-block">Client Apps → API Gateway
                    ↓
    REST (accounts) | GraphQL (recs) | gRPC (stream)
                    ↓
    Internal Microservices (gRPC everywhere)</div>

                            <h2>Summary</h2>
                            <p>No "best" API technology - each has its place. REST excels at simplicity. GraphQL shines for flexible data fetching. gRPC dominates high-performance microservices. Most modern systems use all three.</p>
                        `,
                        interviews: [
                            {
                                question: "When would you choose GraphQL over REST?",
                                answer: "Choose GraphQL when: 1) Frontend needs flexibility - different clients need different data, 2) Reducing over-fetching matters for mobile bandwidth, 3) Complex interconnected data with nested relationships, 4) Rapid iteration needed. REST is better for simple CRUD, public APIs, and when HTTP caching is important."
                            },
                            {
                                question: "Why use gRPC instead of REST for microservices?",
                                answer: "gRPC advantages: 1) 10x lower latency (binary Protocol Buffers vs JSON), 2) HTTP/2 multiplexing and streaming, 3) Strongly typed contracts via proto files, 4) 30-40% less bandwidth. Google saw 40x latency reduction internally. Use REST when you need browser support or simple debugging."
                            },
                            {
                                question: "How does Netflix use different API technologies?",
                                answer: "Netflix uses a hybrid stack: REST for account management (simple CRUD, easy caching), GraphQL for recommendations (complex nested data), gRPC for video streaming (low latency, real-time), and gRPC internally for all microservice communication."
                            },
                            {
                                question: "What are the main challenges of each API technology?",
                                answer: "REST: Over-fetching, under-fetching, rigid responses. GraphQL: N+1 query problem, harder caching, 25-35% higher server costs. gRPC: Not browser-friendly, binary harder to debug, steeper learning curve with proto files."
                            }
                        ]
                    },
                    {
                        id: 'api-gateway-rate-limiting',
                        title: 'API Gateway and Rate Limiting',
                        duration: '50 min',
                        content: `
                            <h2>What is an API Gateway?</h2>
                            <p>An API Gateway is the single entry point for all client requests. It handles authentication, rate limiting, routing, and monitoring.</p>

                            <div class="code-block">Without Gateway: Clients → Multiple Services (each handles auth)
With Gateway: Clients → Gateway → Services (centralized concerns)</div>

                            <h2>Gateway Functions</h2>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li><strong>Request Routing:</strong> Route to appropriate backend services</li>
                                <li><strong>Authentication:</strong> Validate tokens before reaching services</li>
                                <li><strong>Rate Limiting:</strong> Protect from overload</li>
                                <li><strong>Monitoring:</strong> Centralized logging and metrics</li>
                            </ul>

                            <h2>Rate Limiting Algorithms</h2>

                            <h3>Token Bucket (Most Popular)</h3>
                            <div class="code-block">Token Bucket:
• Bucket has max capacity (100 tokens)
• Tokens added at fixed rate (10/sec)
• Each request consumes 1 token
• No tokens = request rejected (429)

Benefits:
• Allows bursts up to bucket size
• Smooth rate over time
• Used by Amazon API Gateway</div>

                            <h3>Other Algorithms</h3>
                            <table class="table">
                                <tr>
                                    <th>Algorithm</th>
                                    <th>Burst</th>
                                    <th>Use Case</th>
                                </tr>
                                <tr>
                                    <td>Fixed Window</td>
                                    <td>Poor</td>
                                    <td>Simple limits</td>
                                </tr>
                                <tr>
                                    <td>Sliding Window</td>
                                    <td>Minimal</td>
                                    <td>General purpose</td>
                                </tr>
                                <tr>
                                    <td>Token Bucket</td>
                                    <td>Allows</td>
                                    <td>APIs (most popular)</td>
                                </tr>
                                <tr>
                                    <td>Leaky Bucket</td>
                                    <td>None</td>
                                    <td>Traffic shaping</td>
                                </tr>
                            </table>

                            <h2>Distributed Rate Limiting</h2>
                            <div class="code-block">Challenge: Multiple gateway nodes
Solution: Redis for centralized counter

All nodes increment same Redis counter
Use Lua scripts for atomic operations</div>

                            <h2>Best Practices</h2>
                            <div class="code-block">1. Tiered Limits:
   Free: 100/hour | Pro: 10,000/hour

2. Response Headers:
   X-RateLimit-Limit: 100
   X-RateLimit-Remaining: 45
   X-RateLimit-Reset: 1640000000

3. 429 Response:
   Retry-After: 30 seconds</div>

                            <h2>Netflix Zuul</h2>
                            <p>Netflix's Zuul handles 50+ billion requests/day with authentication, rate limiting, dynamic routing, and circuit breaker integration.</p>

                            <h2>Summary</h2>
                            <p>API Gateways centralize cross-cutting concerns. Token Bucket is the most popular rate limiting algorithm. Use Redis for distributed rate limiting. Always communicate limits via headers.</p>
                        `,
                        interviews: [
                            {
                                question: "What is an API Gateway and what problems does it solve?",
                                answer: "An API Gateway is a single entry point for all client requests. It solves: 1) Centralizes auth, rate limiting, logging, 2) Client simplification - one URL instead of many, 3) Protocol translation, 4) Load balancing and routing, 5) Security - single point for authentication and DDoS protection."
                            },
                            {
                                question: "Explain the Token Bucket algorithm for rate limiting.",
                                answer: "Token Bucket: Bucket holds tokens (max capacity e.g., 100). Tokens added at fixed rate (10/sec). Each request consumes one token. No tokens = 429 rejection. Benefits: allows bursts up to capacity, smooth average rate, simple to implement. Used by Amazon API Gateway."
                            },
                            {
                                question: "How do you implement rate limiting in a distributed system?",
                                answer: "Challenge: Multiple gateway nodes tracking separate counts. Solution: Use Redis for centralized counter - all nodes increment same counter atomically. Use Lua scripts for atomic token bucket operations. For high availability, use Redis Cluster."
                            },
                            {
                                question: "What headers should rate-limited API responses include?",
                                answer: "Standard headers: X-RateLimit-Limit (max requests), X-RateLimit-Remaining (requests left), X-RateLimit-Reset (Unix timestamp when limit resets). On 429: Retry-After header with seconds until retry. Helps clients implement proper backoff."
                            }
                        ]
                    }
                ]
            },
            {
                title: 'Module 8: Microservices Architecture',
                lessons: [
                    {
                        id: 'microservices-fundamentals',
                        title: 'Microservices Fundamentals',
                        duration: '50 min',
                        content: `
                            <h2>What are Microservices?</h2>
                            <p>Microservices architecture is an approach where an application is built as a collection of small, independent services. Each service runs in its own process, communicates via APIs, and can be deployed independently.</p>

                            <div class="code-block">Monolith: Single codebase, single DB, deploy everything
Microservices: Each service has own codebase, own DB, independent deployment

Netflix: 1000+ loosely coupled microservices
Amazon: "Two-pizza teams" owning services end-to-end</div>

                            <h2>Key Principles</h2>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li><strong>Single Responsibility:</strong> Each service does one thing well</li>
                                <li><strong>Database Per Service:</strong> No shared databases</li>
                                <li><strong>API Communication:</strong> REST, gRPC, or async messaging</li>
                                <li><strong>Decentralized Governance:</strong> Teams choose their tech stack</li>
                                <li><strong>Design for Failure:</strong> Expect and handle failures</li>
                            </ul>

                            <h2>Communication Patterns</h2>
                            <div class="code-block">Synchronous: REST/gRPC - need immediate response
Asynchronous: Kafka/RabbitMQ - decoupled, more resilient

Saga Pattern for distributed transactions:
1. OrderService creates order
2. PaymentService processes payment
3. InventoryService reserves items
If any fails → compensating actions (rollback)</div>

                            <h2>When NOT to Use</h2>
                            <p>Don't use for: Startups/MVPs, small teams (&lt;10 devs), simple CRUD apps. Start with modular monolith, extract services when complexity demands it.</p>
                        `,
                        interviews: [
                            {
                                question: "What are microservices and how do they differ from monoliths?",
                                answer: "Microservices are small, independent services with own codebase and database. Monolith: single codebase, single DB, deploy everything together. Microservices enable: independent deployment, independent scaling, polyglot tech, isolated failures. Trade-off: distributed system complexity."
                            },
                            {
                                question: "Explain the 'database per service' principle.",
                                answer: "Each service owns its data in its own database. No shared databases. Benefits: loose coupling, independent scaling, technology freedom. Trade-off: data consistency becomes harder - use eventual consistency and saga pattern."
                            },
                            {
                                question: "What is Amazon's 'two-pizza team' model?",
                                answer: "Teams of 6-10 people owning microservices completely. 'You build it, you run it' - team handles dev, test, ops, on-call. Benefits: clear ownership, fast decisions, autonomous teams."
                            }
                        ]
                    },
                    {
                        id: 'service-discovery-registry',
                        title: 'Service Discovery and Registry',
                        duration: '45 min',
                        content: `
                            <h2>The Problem</h2>
                            <p>In microservices, IPs change constantly (auto-scaling, deployments). Hardcoding addresses doesn't work. Service discovery solves dynamic addressing.</p>

                            <h2>Service Registry</h2>
                            <p>Database of available service instances. Services register on startup, clients query to find services.</p>

                            <h2>Discovery Patterns</h2>
                            <div class="code-block">Client-Side (Eureka):
Client queries registry, gets instance list, handles load balancing
Pros: Simple, client controls routing

Server-Side (Kubernetes):
Client calls load balancer, which queries registry
Pros: Simpler clients, decoupled from registry</div>

                            <h2>Popular Tools</h2>
                            <table class="table">
                                <tr><th>Tool</th><th>Type</th><th>Best For</th></tr>
                                <tr><td>Eureka</td><td>Client-side</td><td>Spring Cloud apps</td></tr>
                                <tr><td>Consul</td><td>Both</td><td>Multi-datacenter</td></tr>
                                <tr><td>Kubernetes</td><td>Server-side</td><td>K8s environments</td></tr>
                            </table>

                            <h2>Service Mesh</h2>
                            <p>Modern approach: sidecar proxies (Envoy/Istio) handle discovery, load balancing, security. App code doesn't handle discovery.</p>
                        `,
                        interviews: [
                            {
                                question: "What is service discovery and why is it needed?",
                                answer: "Service discovery solves dynamic addressing - IPs change constantly in microservices. Service registry stores available instances. Services register on startup, clients query to find services."
                            },
                            {
                                question: "Compare client-side vs server-side discovery.",
                                answer: "Client-side (Eureka): Client queries registry, handles load balancing. Server-side (K8s): Client calls load balancer which queries registry. Trade-off: control vs simplicity."
                            },
                            {
                                question: "What is a service mesh?",
                                answer: "Infrastructure layer using sidecar proxies (Envoy) for discovery, load balancing, mTLS. App code doesn't handle discovery. Examples: Istio, Consul Connect."
                            }
                        ]
                    },
                    {
                        id: 'circuit-breakers-resilience',
                        title: 'Circuit Breakers and Resilience Patterns',
                        duration: '55 min',
                        content: `
                            <h2>Cascade Failure Problem</h2>
                            <p>One slow service consumes all threads waiting, making the calling service effectively down. This cascades to all dependent services.</p>

                            <h2>Circuit Breaker Pattern</h2>
                            <div class="code-block">States:
CLOSED: Normal, forwarding requests, monitoring failures
OPEN: Threshold exceeded, fail fast, return fallback
HALF-OPEN: After timeout, test if service recovered

Configuration:
failure_threshold: 50%
timeout: 10s
half_open_requests: 5</div>

                            <h2>Related Patterns</h2>
                            <ul style="margin: 1rem 0; margin-left: 2rem;">
                                <li><strong>Retry:</strong> Exponential backoff for transient failures</li>
                                <li><strong>Timeout:</strong> Don't wait forever, fail fast</li>
                                <li><strong>Bulkhead:</strong> Isolate thread pools per dependency</li>
                                <li><strong>Fallback:</strong> Return cached/default when primary fails</li>
                            </ul>

                            <h2>Resilience4j (Modern)</h2>
                            <p>Netflix Hystrix is in maintenance mode. Use Resilience4j for new projects - lightweight, modular, actively maintained.</p>

                            <h2>Chaos Engineering</h2>
                            <p>Netflix Chaos Monkey: randomly kills production instances to test resilience. Forces engineers to build fault-tolerant systems.</p>
                        `,
                        interviews: [
                            {
                                question: "What is the circuit breaker pattern?",
                                answer: "Prevents cascade failures by failing fast. States: CLOSED (normal), OPEN (fail fast with fallback), HALF-OPEN (testing recovery). Trips when failure threshold exceeded."
                            },
                            {
                                question: "What is the bulkhead pattern?",
                                answer: "Isolates resources per dependency using separate thread pools. If Service B is slow, only its threads blocked; other services unaffected."
                            },
                            {
                                question: "What is Netflix's Chaos Monkey?",
                                answer: "Randomly kills production instances during business hours. Tests automatic recovery. Forces building resilient systems. Part of chaos engineering."
                            }
                        ]
                    }
                ]
            },
            {
                title: 'Module 9: Advanced System Design Patterns',
                lessons: [
                    {
                        id: 'distributed-consensus',
                        title: 'Distributed Consensus',
                        duration: '55 min',
                        content: `
                            <h2>The Consensus Problem</h2>
                            <p>In distributed systems, multiple nodes need to agree on a single value - even when some nodes fail. This is fundamental to leader election, state replication, and distributed transactions.</p>

                            <h2>Raft Algorithm</h2>
                            <p>Designed for understandability. Breaks consensus into: Leader election, Log replication, Safety.</p>

                            <div class="code-block">Leader Election:
1. Nodes start as Followers
2. Timeout → become Candidate
3. Request votes from others
4. Majority votes → become Leader
5. Leader sends heartbeats

Randomized timeouts (150-300ms) prevent split votes</div>

                            <h2>Raft vs Paxos</h2>
                            <p>Both solve consensus. Raft popular due to clarity. Used by etcd, Consul, CockroachDB. Kafka moving from ZooKeeper (Paxos) to KRaft (Raft).</p>
                        `,
                        interviews: [
                            {
                                question: "What is distributed consensus?",
                                answer: "Getting multiple nodes to agree on a single value despite failures. Used for leader election, log replication, distributed transactions. Solved by Paxos and Raft algorithms."
                            },
                            {
                                question: "Explain Raft leader election.",
                                answer: "Nodes start as followers. Timeout → become candidate, request votes. Majority → become leader. Leader sends heartbeats. Randomized timeouts prevent split votes."
                            }
                        ]
                    },
                    {
                        id: 'data-partitioning',
                        title: 'Data Partitioning Strategies',
                        duration: '50 min',
                        content: `
                            <h2>Why Partition?</h2>
                            <p>When data exceeds one server's capacity, split across multiple servers.</p>

                            <h2>Strategies</h2>
                            <div class="code-block">Range-Based: Partition by key ranges
• Good for sequential access
• Risk of hot spots

Hash-Based: hash(key) % N
• Even distribution
• Bad for range queries

Directory-Based: Lookup table
• Flexible but extra lookup</div>

                            <h2>Good Partition Keys</h2>
                            <p>High cardinality, even distribution, frequently queried, rarely changes. Avoid hot partition problem (celebrity data).</p>
                        `,
                        interviews: [
                            {
                                question: "What are data partitioning strategies?",
                                answer: "Range-based (sequential access), Hash-based (even distribution), Directory-based (flexible). Choose based on access patterns."
                            },
                            {
                                question: "What makes a good partition key?",
                                answer: "High cardinality, even distribution, frequently queried, rarely changes. Avoid hot spots from celebrity data."
                            }
                        ]
                    },
                    {
                        id: 'consistent-hashing',
                        title: 'Consistent Hashing',
                        duration: '45 min',
                        content: `
                            <h2>The Problem</h2>
                            <p>Simple hash(key) % N requires remapping ~80% data when nodes change.</p>

                            <h2>Solution: Ring</h2>
                            <div class="code-block">Consistent Hashing:
• Arrange nodes on a ring
• Keys hash to ring positions
• Key stored on nearest clockwise node

Adding node: Only K/N keys move (not 80%!)
Virtual nodes: 100-256 per physical for even distribution</div>

                            <h2>Used By</h2>
                            <p>DynamoDB, Cassandra, CDNs, load balancers for stable key-to-node mapping.</p>
                        `,
                        interviews: [
                            {
                                question: "What problem does consistent hashing solve?",
                                answer: "Simple hash % N remaps ~80% data on node change. Consistent hashing: nodes on ring, keys go to nearest clockwise node. Only K/N keys move when adding node."
                            },
                            {
                                question: "What are virtual nodes?",
                                answer: "Each physical node gets multiple ring positions (100-256). Benefits: even distribution, heterogeneous hardware support, faster rebalancing."
                            }
                        ]
                    },
                    {
                        id: 'distributed-transactions',
                        title: 'Distributed Transactions',
                        duration: '50 min',
                        content: `
                            <h2>Two-Phase Commit (2PC)</h2>
                            <p>Coordinator asks prepare (vote), then commit/abort. Problems: blocking, coordinator SPOF, slow.</p>

                            <h2>Saga Pattern</h2>
                            <div class="code-block">Saga: Sequence of local transactions
Each has compensating transaction for rollback

Choreography: Events, no coordinator, decoupled
Orchestration: Central coordinator, clear flow

If step fails → execute compensations in reverse</div>

                            <h2>Eventual Consistency</h2>
                            <p>Sagas provide BASE not ACID. Temporary inconsistency visible. Application must handle partial states.</p>
                        `,
                        interviews: [
                            {
                                question: "What is the Saga pattern?",
                                answer: "Sequence of local transactions with compensating transactions. Choreography (events) or Orchestration (coordinator). Provides eventual consistency, not ACID."
                            },
                            {
                                question: "What are 2PC problems?",
                                answer: "Blocking (resources locked), coordinator SPOF, slow (multiple round trips), not partition tolerant. Modern microservices use sagas instead."
                            }
                        ]
                    }
                ]
            },
            // Module 10 content loaded from modules/module10-observability.js
            (typeof module10Observability !== 'undefined' ? module10Observability : {
                title: 'Module 10: Observability & Security',
                lessons: [
                    { id: 'monitoring-logging-tracing', title: 'Monitoring, Logging, and Distributed Tracing', duration: '55 min', content: '<p>Loading...</p>', interviews: [] },
                    { id: 'security-best-practices', title: 'Security Best Practices in System Design', duration: '50 min', content: '<p>Loading...</p>', interviews: [] }
                ]
            }),
            // Module 11 content loaded from modules/module11-real-designs.js
            (typeof module11RealDesigns !== 'undefined' ? module11RealDesigns : {
                title: 'Module 11: Real-World System Designs',
                lessons: [
                    { id: 'design-url-shortener', title: 'Design URL Shortener', duration: '60 min', content: '<p>Loading...</p>', interviews: [] },
                    { id: 'design-social-feed', title: 'Design Social Media Feed', duration: '60 min', content: '<p>Loading...</p>', interviews: [] },
                    { id: 'design-video-streaming', title: 'Design Video Streaming', duration: '60 min', content: '<p>Loading...</p>', interviews: [] },
                    { id: 'design-ride-sharing', title: 'Design Ride Sharing', duration: '60 min', content: '<p>Loading...</p>', interviews: [] },
                    { id: 'design-ecommerce', title: 'Design E-commerce', duration: '60 min', content: '<p>Loading...</p>', interviews: [] },
                    { id: 'design-chat-app', title: 'Design Chat App', duration: '60 min', content: '<p>Loading...</p>', interviews: [] },
                    { id: 'design-search-engine', title: 'Design Search Engine', duration: '60 min', content: '<p>Loading...</p>', interviews: [] },
                    { id: 'design-file-storage', title: 'Design File Storage', duration: '60 min', content: '<p>Loading...</p>', interviews: [] }
                ]
            })
        ]
    },
    'data-engineering': {
        title: 'Data Engineering at Scale',
        duration: '14 weeks',
        level: 'Advanced',
        modules: [
            {
                title: 'Module 1: Basics',
                lessons: [
                    {
                        id: 'batch-vs-stream',
                        title: 'Batch vs Stream Processing',
                        duration: '50 min',
                        content: `<p>Content for batch vs stream processing...</p>`,
                        interviews: []
                    }
                ]
            }
        ]
    },
    'api-design': {
        title: 'API Design & REST',
        duration: '8 weeks',
        level: 'Beginner',
        modules: [
            {
                title: 'Module 1: REST Basics',
                lessons: [
                    {
                        id: 'rest-principles',
                        title: 'REST Principles',
                        duration: '40 min',
                        content: `<p>Content for REST principles...</p>`,
                        interviews: []
                    }
                ]
            }
        ]
    }
};
