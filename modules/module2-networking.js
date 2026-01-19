// Module 2: Load Balancing & Networking
// Contains: Load Balancing Fundamentals, DNS and How It Works, CDN and Edge Computing

const module2Networking = {
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
};
