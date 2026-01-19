// Module 1: Core Foundations
// Contains: Scalability, Latency vs Throughput, CAP Theorem, Availability & Reliability

const module1Foundations = {
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
        }
        // More lessons will be added here...
    ]
};
