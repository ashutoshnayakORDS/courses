// Module 9: Advanced System Design Patterns
// Contains: Distributed Consensus, Data Partitioning, Consistent Hashing, Distributed Transactions

const module9AdvancedPatterns = {
    title: 'Module 9: Advanced System Design Patterns',
    lessons: [
        {
            id: 'distributed-consensus',
            title: 'Distributed Consensus',
            duration: '55 min',
            content: `
                <h2>The Consensus Problem</h2>
                <p>In distributed systems, multiple nodes need to agree on a single value - even when some nodes fail or messages are lost. This is the consensus problem, fundamental to building reliable distributed systems.</p>

                <div class="code-block">Why Consensus Matters:
• Leader election: Who is the master?
• State machine replication: What's the next command?
• Atomic broadcast: What order do messages execute?
• Distributed transactions: Did the transaction commit?

Without consensus:
• Split-brain: Multiple leaders, data diverges
• Inconsistent reads: Different nodes return different values
• Lost updates: Writes disappear</div>

                <h2>The Two Generals Problem</h2>
                <p>The impossibility of guaranteed consensus with unreliable communication.</p>

                <div class="code-block">Scenario:
Two armies must attack together to win.
General A sends messenger: "Attack at dawn"
                    ↓
            [Unreliable channel]
            (messenger might be captured)
                    ↓
General B receives... or doesn't?

If B received, B sends confirmation
But confirmation might also be lost
A doesn't know if B knows
B doesn't know if A knows B knows
...infinite regress

Impossibility: Perfect consensus impossible
              with unreliable communication

Solution: Probabilistic consensus (good enough)</div>

                <h2>Paxos Algorithm</h2>
                <p>Developed by Leslie Lamport in 1998, Paxos is foundational but famously difficult to understand.</p>

                <div class="code-block">Paxos Roles:
• Proposers: Propose values
• Acceptors: Vote on proposals
• Learners: Learn decided values

Paxos Phases:
Phase 1: Prepare
┌──────────┐   Prepare(n)    ┌──────────┐
│ Proposer │ ───────────────►│ Acceptor │
│          │ ◄───────────────│          │
└──────────┘   Promise(n)    └──────────┘

"I want to propose with ballot n"
"I promise not to accept lower ballots"

Phase 2: Accept
┌──────────┐  Accept(n,v)    ┌──────────┐
│ Proposer │ ───────────────►│ Acceptor │
│          │ ◄───────────────│          │
└──────────┘   Accepted      └──────────┘

"Accept value v with ballot n"
"Accepted" (if still highest ballot)

Consensus reached when majority accepts!</div>

                <h2>Raft Algorithm</h2>
                <p>Designed in 2014 to be "understandable Paxos." Now the most popular consensus algorithm in production.</p>

                <div class="code-block">Raft Key Insight:
Break consensus into three subproblems:
1. Leader election
2. Log replication
3. Safety

Node States:
┌──────────┐    ┌───────────┐    ┌──────────┐
│ Follower │ ──►│ Candidate │ ──►│  Leader  │
└──────────┘    └───────────┘    └──────────┘
     ▲                                  │
     └──────────────────────────────────┘
           (loses election or term ends)</div>

                <h3>Leader Election</h3>
                <div class="code-block">Leader Election Flow:

1. All nodes start as Followers
2. Follower doesn't hear from leader (timeout)
3. Becomes Candidate, increments term
4. Votes for itself, requests votes from others

┌────────┐   RequestVote    ┌────────┐
│Candidate│ ───────────────►│Follower│
│ Term 5  │ ◄───────────────│        │
└────────┘   Grant Vote     └────────┘

5. If majority votes: become Leader
6. If loses: back to Follower
7. Leader sends periodic heartbeats

Key: Randomized timeouts prevent split votes
     (150-300ms random range)</div>

                <h3>Log Replication</h3>
                <div class="code-block">Log Replication:

Client: "Set x = 5"
         │
         ▼
┌────────────────┐
│     Leader     │
│ Log: [x=5]     │ ← Append to local log
└────────────────┘
         │
         │ AppendEntries
         ▼
┌────────┐ ┌────────┐ ┌────────┐
│Follower│ │Follower│ │Follower│
│Log:[x=5]│ │Log:[x=5]│ │Log:[x=5]│
└────────┘ └────────┘ └────────┘

Once majority has entry:
→ Commit entry
→ Apply to state machine
→ Respond to client</div>

                <h2>Paxos vs Raft</h2>
                <table class="table">
                    <tr>
                        <th>Aspect</th>
                        <th>Paxos</th>
                        <th>Raft</th>
                    </tr>
                    <tr>
                        <td>Understandability</td>
                        <td>Complex</td>
                        <td>Designed for clarity</td>
                    </tr>
                    <tr>
                        <td>Leader</td>
                        <td>Any node can propose</td>
                        <td>Strong leader required</td>
                    </tr>
                    <tr>
                        <td>Log entries</td>
                        <td>Can have gaps</td>
                        <td>Strictly ordered</td>
                    </tr>
                    <tr>
                        <td>Voting</td>
                        <td>Vote for any candidate</td>
                        <td>Only up-to-date candidates</td>
                    </tr>
                    <tr>
                        <td>Adoption (2025)</td>
                        <td>Legacy systems</td>
                        <td>Most new systems</td>
                    </tr>
                </table>

                <h2>Real-World Implementations</h2>
                <div class="code-block">Systems using Raft:
• etcd (Kubernetes): Cluster state storage
• Consul: Service discovery, config
• CockroachDB: Distributed SQL
• TiKV/TiDB: Distributed database
• Kafka KRaft: Replacing ZooKeeper

Systems using Paxos:
• Google Spanner: Global distributed DB
• Google Chubby: Lock service
• Apache ZooKeeper: Zab (Paxos variant)
• Amazon DynamoDB: Internal coordination</div>

                <h2>Kafka's Move to KRaft</h2>
                <div class="code-block">Before: Kafka + ZooKeeper
┌──────────┐     ┌───────────┐
│  Kafka   │────►│ ZooKeeper │
│ Brokers  │     │ (Paxos)   │
└──────────┘     └───────────┘
• External dependency
• Operational complexity
• Scaling limitations

After: Kafka KRaft (2025)
┌────────────────────────┐
│    Kafka Brokers       │
│   (built-in Raft)      │
│                        │
│   No ZooKeeper needed! │
└────────────────────────┘
• Simplified architecture
• Better performance
• Easier operations</div>

                <h2>Summary</h2>
                <p>Consensus algorithms allow distributed systems to agree on values despite failures. Raft has become the standard due to its understandability, replacing complex Paxos in most new systems. Key applications: leader election, replicated state machines, distributed databases. Modern systems like Kafka are moving from ZooKeeper (Paxos-based) to built-in Raft.</p>
            `,
            interviews: [
                {
                    question: "What is distributed consensus and why is it important?",
                    answer: "Consensus is the problem of getting multiple nodes to agree on a single value despite failures. Important for: leader election, log replication, distributed transactions. Without consensus: split-brain (multiple leaders), inconsistent reads, lost updates. Solved by algorithms like Paxos and Raft."
                },
                {
                    question: "Explain the Raft consensus algorithm.",
                    answer: "Raft breaks consensus into 3 parts: 1) Leader election - randomized timeouts, candidate requests votes, majority wins. 2) Log replication - leader appends to log, replicates to followers, commits when majority has entry. 3) Safety - only nodes with up-to-date logs can become leader. Designed for understandability over Paxos."
                },
                {
                    question: "How does leader election work in Raft?",
                    answer: "1) Nodes start as followers, 2) Timeout without heartbeat → become candidate, 3) Increment term, vote for self, request votes, 4) If majority votes → become leader, 5) Leader sends heartbeats to maintain authority. Randomized timeouts (150-300ms) prevent split votes. Only candidates with up-to-date logs get votes."
                },
                {
                    question: "Compare Paxos and Raft. Why is Raft more popular?",
                    answer: "Both solve consensus. Paxos: complex, any node can propose, logs can have gaps. Raft: designed for clarity, strong leader, strictly ordered logs. Raft popular because: easier to understand and implement correctly, better tooling, same safety guarantees. Used by etcd, Consul, CockroachDB. Paxos still in Google Spanner, ZooKeeper."
                },
                {
                    question: "Why is Kafka moving from ZooKeeper to KRaft?",
                    answer: "ZooKeeper (Paxos-based) was external dependency adding operational complexity. KRaft embeds Raft directly in Kafka brokers. Benefits: simplified architecture (no separate cluster), better performance, easier operations, improved scaling. Represents industry trend of building consensus into applications rather than external services."
                }
            ]
        },
        {
            id: 'data-partitioning',
            title: 'Data Partitioning Strategies',
            duration: '50 min',
            content: `
                <h2>Why Partition Data?</h2>
                <p>When data grows beyond what one server can handle, you need to split it across multiple servers. Data partitioning (sharding) distributes data to improve performance, availability, and scalability.</p>

                <div class="code-block">Single Database Problem:
┌─────────────────────────────┐
│      Single Database         │
│  1 billion users            │
│  10 TB data                 │
│  100K queries/sec           │
└─────────────────────────────┘
• CPU maxed out
• Memory insufficient
• Disk I/O saturated
• Single point of failure

Partitioned Database:
┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
│ Shard 1 │ │ Shard 2 │ │ Shard 3 │ │ Shard 4 │
│ 250M    │ │ 250M    │ │ 250M    │ │ 250M    │
│ users   │ │ users   │ │ users   │ │ users   │
└─────────┘ └─────────┘ └─────────┘ └─────────┘
• Load distributed
• Linear scaling
• Fault isolation</div>

                <h2>Partitioning Strategies</h2>

                <h3>1. Range-Based Partitioning</h3>
                <div class="code-block">Range Partitioning:
Partition by ranges of a key (e.g., user ID)

Shard 1: Users 1 - 1,000,000
Shard 2: Users 1,000,001 - 2,000,000
Shard 3: Users 2,000,001 - 3,000,000
...

Pros:
• Simple to understand
• Range queries efficient (users 100-200)
• Good for time-series (partition by date)

Cons:
• Hot spots if access not uniform
• Uneven distribution (new users always hit last shard)
• Rebalancing difficult

Best for: Time-series data, sequential access</div>

                <h3>2. Hash-Based Partitioning</h3>
                <div class="code-block">Hash Partitioning:
shard = hash(user_id) % num_shards

user_id = 12345
hash(12345) = 987654321
987654321 % 4 = 1  → Shard 1

Pros:
• Even distribution (hash spreads data)
• No hot spots for random access
• Simple calculation

Cons:
• Range queries expensive (scan all shards)
• Adding shards = massive data movement
  hash(key) % 4 ≠ hash(key) % 5

Best for: Key-value access, no range queries</div>

                <h3>3. Directory-Based Partitioning</h3>
                <div class="code-block">Directory Service:
┌─────────────────────────────┐
│     Partition Directory      │
│  user_123 → Shard 2         │
│  user_456 → Shard 1         │
│  user_789 → Shard 3         │
└─────────────────────────────┘
        │
   ┌────┼────┐
   ▼    ▼    ▼
[Shard1][Shard2][Shard3]

Pros:
• Flexible: any mapping strategy
• Easy rebalancing (update directory)
• Can optimize placement

Cons:
• Directory is single point of failure
• Extra lookup for every query
• Directory must be highly available

Best for: Complex partitioning needs, custom logic</div>

                <h3>4. Geographic Partitioning</h3>
                <div class="code-block">Geographic Partitioning:
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│   US-East   │ │   EU-West   │ │  Asia-Pac   │
│   Region    │ │   Region    │ │   Region    │
│ US users    │ │ EU users    │ │ Asia users  │
└─────────────┘ └─────────────┘ └─────────────┘

Route by user location for:
• Lower latency (data near users)
• Data residency compliance (GDPR)
• Regulatory requirements

Best for: Global applications, compliance</div>

                <h2>Choosing Partition Keys</h2>
                <div class="code-block">Good Partition Keys:
• High cardinality (many unique values)
• Even distribution (no hot spots)
• Frequently used in queries
• Rarely changes

Examples:
Good: user_id, order_id, device_id
Bad:  country (skewed), status (few values)

Hot Partition Problem:
┌─────────┐ ┌─────────┐ ┌─────────┐
│ Shard 1 │ │ Shard 2 │ │ Shard 3 │
│   10%   │ │   10%   │ │   80%   │ ← HOT!
└─────────┘ └─────────┘ └─────────┘

Celebrity problem: One popular user's data
causes hot partition. Solutions:
• Add random suffix to key
• Sub-partition hot data
• Application-level load balancing</div>

                <h2>Cross-Shard Operations</h2>
                <div class="code-block">Challenge: Query spans multiple shards

Query: "Get all orders for user 123"
If orders partitioned by order_id:
→ Must query ALL shards (scatter-gather)
→ Expensive!

Solutions:
1. Partition by user_id (orders with user)
2. Denormalize (store user info in each order)
3. Secondary index (global index across shards)
4. Application-level joins

Cross-shard transactions even harder:
→ Two-phase commit (slow, blocking)
→ Saga pattern (eventual consistency)
→ Avoid if possible (design around it)</div>

                <h2>Rebalancing</h2>
                <div class="code-block">When to Rebalance:
• Adding new shards (growth)
• Removing failed shards
• Uneven distribution (hot spots)

Rebalancing Strategies:

1. Fixed partitions (Cassandra, DynamoDB):
   Create many partitions upfront (1000)
   Assign multiple partitions per node
   Moving = reassigning partitions, not data

2. Dynamic partitioning (MongoDB):
   Split partitions when too large
   Merge partitions when too small

3. Consistent hashing:
   Minimal data movement when nodes change
   (Covered in next lesson)</div>

                <h2>Real-World Examples</h2>
                <div class="code-block">Cassandra:
• Hash partitioning (consistent hashing)
• Partition key determines node
• Clustering key for sorting within partition
• Example: partition by user_id, cluster by timestamp

DynamoDB:
• Partition key (hash) for distribution
• Sort key for ordering within partition
• Auto-splits partitions when needed
• Example: partition=user_id, sort=order_date

MongoDB:
• Range or hash sharding
• Config servers track chunk locations
• Automatic chunk balancing
• Example: shard by customer_id</div>

                <h2>Summary</h2>
                <p>Data partitioning is essential for scaling beyond one server. Choose strategy based on access patterns: range for sequential access, hash for random access, directory for flexibility. Key selection is crucial - avoid hot spots. Cross-shard operations are expensive - design to minimize them. Plan for rebalancing from the start.</p>
            `,
            interviews: [
                {
                    question: "What are the main data partitioning strategies?",
                    answer: "1) Range-based: partition by key ranges (good for sequential access, bad for hot spots). 2) Hash-based: hash(key) % shards (even distribution, bad for range queries). 3) Directory-based: lookup table maps keys to shards (flexible but extra lookup). 4) Geographic: partition by location (low latency, compliance). Choose based on access patterns."
                },
                {
                    question: "What makes a good partition key?",
                    answer: "Good partition keys have: high cardinality (many unique values), even distribution (no hot spots), frequently used in queries, rarely changes. Examples: user_id, order_id. Bad: country (skewed), status (few values). Avoid 'celebrity problem' where one key gets disproportionate traffic."
                },
                {
                    question: "What is the hot partition problem and how do you solve it?",
                    answer: "Hot partition: one shard receives disproportionate traffic (e.g., celebrity user's data). Solutions: 1) Add random suffix to partition key (key_1, key_2), 2) Sub-partition hot data across multiple shards, 3) Application-level load balancing, 4) Cache hot data. Prevention: choose high-cardinality keys with even distribution."
                },
                {
                    question: "How do you handle cross-shard queries?",
                    answer: "Cross-shard queries are expensive (scatter-gather pattern). Solutions: 1) Partition by query pattern (if querying by user, partition by user_id), 2) Denormalization (duplicate data), 3) Global secondary indexes, 4) Application-level joins. Cross-shard transactions: use saga pattern or two-phase commit. Best: design to minimize cross-shard operations."
                },
                {
                    question: "Compare hash partitioning vs range partitioning.",
                    answer: "Hash: hash(key) % shards. Pros: even distribution, no hot spots. Cons: range queries scan all shards, adding shards moves most data. Range: key ranges per shard. Pros: efficient range queries, simple. Cons: hot spots if access skewed, uneven distribution. Use hash for random access (key-value), range for sequential access (time-series)."
                }
            ]
        },
        {
            id: 'consistent-hashing',
            title: 'Consistent Hashing',
            duration: '45 min',
            content: `
                <h2>The Problem with Simple Hashing</h2>
                <p>Simple hash partitioning (hash(key) % N) has a critical flaw: when the number of nodes changes, almost all data must be moved.</p>

                <div class="code-block">Simple Hashing Problem:

With 4 nodes: hash(key) % 4
key "user_123": hash → 987654 % 4 = 2 → Node 2
key "user_456": hash → 123456 % 4 = 0 → Node 0

Add 1 node (now 5): hash(key) % 5
key "user_123": hash → 987654 % 5 = 4 → Node 4 (MOVED!)
key "user_456": hash → 123456 % 5 = 1 → Node 1 (MOVED!)

~80% of data must be remapped!
Massive data migration, cache invalidation, downtime</div>

                <h2>Consistent Hashing Solution</h2>
                <p>Consistent hashing minimizes data movement when nodes are added or removed. Instead of N% calculation, it arranges nodes on a ring.</p>

                <div class="code-block">Consistent Hashing Ring:

              0°
              │
        ┌─────●─────┐
       /    Node A   \\
      /               \\
   270°●               ●90°
   Node D           Node B
      \\               /
       \\    Node C   /
        └─────●─────┘
             180°

Keys also hash to positions on ring.
Key is stored on first node clockwise from its position.

Key "user_123" → hashes to 45° → stored on Node B (90°)
Key "user_456" → hashes to 200° → stored on Node D (270°)</div>

                <h3>Adding a Node</h3>
                <div class="code-block">Adding Node E at 135°:

Before:
Node A (0°) handles: 270° - 0°
Node B (90°) handles: 0° - 90°
Node C (180°) handles: 90° - 180°
Node D (270°) handles: 180° - 270°

After adding Node E (135°):
Node B (90°) handles: 0° - 90°
Node E (135°) handles: 90° - 135° ← Takes from C
Node C (180°) handles: 135° - 180°
Node D (270°) handles: 180° - 270°
Node A (0°) handles: 270° - 0°

Only keys between 90°-135° move!
That's only ~12% of data, not 80%</div>

                <h3>Removing a Node</h3>
                <div class="code-block">Removing Node B:

Before: Node B (90°) handles 0° - 90°
After:  Node C takes over 0° - 90°

Only Node B's data moves to Node C
Other nodes unaffected!</div>

                <h2>Virtual Nodes (VNodes)</h2>
                <p>Problem: With few physical nodes, distribution can be uneven. Solution: Each physical node gets multiple positions on the ring (virtual nodes).</p>

                <div class="code-block">Without Virtual Nodes:
              0°
              │
        ┌─────●─────┐  Node A handles 50% of ring!
       /    Node A   \\  (180° segment)
      /               \\
     ●                 ●
   Node B            (empty)
      \\               /
       \\             /
        └─────●─────┘
            Node C

With Virtual Nodes (3 per physical):
              0°
              │
        ┌───A1─B2─────┐
       /              \\
      C1              A2
     /                 \\
    B1                 C2
      \\               /
       A3───B3───C3──/

Each node handles ~33% of ring
Much better distribution!</div>

                <div class="code-block">Virtual Nodes Benefits:
1. Even distribution regardless of node count
2. Heterogeneous hardware: powerful nodes get more vnodes
3. Faster rebalancing: move vnodes incrementally
4. Better fault tolerance: one node's data spreads across many

Typical: 100-256 vnodes per physical node</div>

                <h2>Replication with Consistent Hashing</h2>
                <div class="code-block">Replication Factor = 3:
Store data on the key's node AND next 2 clockwise nodes

Key "user_123" at 45°:
• Primary: Node B (90°)
• Replica 1: Node C (180°)
• Replica 2: Node D (270°)

              0°
              │
        ┌─────A─────┐
       /    (not)    \\
      /               \\
    D●       45°       ●B ← Primary
   (R2)      key       (P)
      \\               /
       \\             /
        └─────C─────┘
             (R1)

Node failure: Replicas take over immediately
             No data loss!</div>

                <h2>Real-World Implementations</h2>

                <h3>Amazon DynamoDB</h3>
                <div class="code-block">DynamoDB's Consistent Hashing:
• Each table has partitions on ring
• Partition key hashed to ring position
• Data replicated to 3 nodes across AZs
• Adding capacity = adding nodes, minimal disruption

Design: "Dynamo" paper (2007) popularized
        consistent hashing for databases</div>

                <h3>Apache Cassandra</h3>
                <div class="code-block">Cassandra:
• Token ring with vnodes (default 256)
• Partitioner hashes partition key
• Replication across nodes based on ring position
• Adding node: takes range from neighbors

nodetool status:
UN  10.0.1.1  256 tokens  rack1
UN  10.0.1.2  256 tokens  rack2
UN  10.0.1.3  256 tokens  rack3</div>

                <h3>CDNs and Load Balancers</h3>
                <div class="code-block">CDN Cache Servers:
Hash(URL) → determines which cache server
Adding cache server: minimal cache invalidation

Load Balancers:
Hash(client_ip) → sticky sessions
Adding backend: only some sessions move</div>

                <h2>Implementation Considerations</h2>
                <div class="code-block">Hash Functions:
• Must be deterministic
• Should distribute uniformly
• Popular: MD5, SHA-1, MurmurHash, xxHash

Data Structures:
• Sorted map/tree for O(log n) lookup
• Find first node ≥ hash(key)
• Binary search on sorted list of node positions

Handling Hot Keys:
Even with consistent hashing, one key = one node
Celebrity problem still exists
Solution: Add random suffix, multiple copies</div>

                <h2>Summary</h2>
                <p>Consistent hashing solves the redistribution problem when nodes change. By arranging nodes on a ring and assigning keys to the nearest clockwise node, only K/N keys move when adding a node (vs. nearly all with simple hashing). Virtual nodes ensure even distribution. Used by DynamoDB, Cassandra, and CDNs for scalable distributed systems.</p>
            `,
            interviews: [
                {
                    question: "What problem does consistent hashing solve?",
                    answer: "Simple hashing (hash % N) requires remapping ~80% of data when nodes change. Consistent hashing arranges nodes on a ring - keys go to nearest clockwise node. When adding a node, only K/N keys move (K=total keys, N=nodes). Enables dynamic scaling with minimal data movement."
                },
                {
                    question: "Explain how consistent hashing works.",
                    answer: "1) Arrange nodes on a hash ring (0-360° or 0-2^32). 2) Hash keys to positions on ring. 3) Key stored on first node clockwise from key's position. 4) Adding node: only keys between new node and predecessor move. 5) Removing node: its keys move to successor. Minimal data movement compared to modulo hashing."
                },
                {
                    question: "What are virtual nodes and why are they used?",
                    answer: "Virtual nodes: each physical node gets multiple positions on the ring (typically 100-256). Benefits: 1) Even distribution regardless of node count, 2) Heterogeneous hardware support (more vnodes for powerful nodes), 3) Faster rebalancing (move vnodes incrementally), 4) Better fault tolerance (one node's data spreads across many successors)."
                },
                {
                    question: "How does replication work with consistent hashing?",
                    answer: "With replication factor N, data stored on key's primary node AND next N-1 clockwise nodes. Example: RF=3, key at 45°, nodes at 90°, 180°, 270° → stored on all three. Benefits: node failure doesn't lose data (replicas available), reads can go to any replica. Used by Cassandra, DynamoDB."
                },
                {
                    question: "Where is consistent hashing used in practice?",
                    answer: "Databases: DynamoDB, Cassandra, Riak (partition distribution). Caches: Memcached, Redis cluster (key routing). CDNs: Route URLs to cache servers (minimal invalidation on server add). Load balancers: Session affinity (sticky sessions). Any system needing stable key-to-node mapping with dynamic nodes."
                }
            ]
        },
        {
            id: 'distributed-transactions',
            title: 'Distributed Transactions',
            duration: '50 min',
            content: `
                <h2>The Problem</h2>
                <p>In distributed systems, a single business operation may span multiple services or databases. Ensuring atomicity (all or nothing) across distributed components is challenging.</p>

                <div class="code-block">E-commerce Order:
1. OrderService: Create order
2. PaymentService: Charge credit card
3. InventoryService: Reserve items
4. ShippingService: Create shipment

What if Payment succeeds but Inventory fails?
• Order created but items not reserved
• Customer charged but can't fulfill
• Inconsistent state!</div>

                <h2>Two-Phase Commit (2PC)</h2>
                <p>Classic protocol for distributed transactions. A coordinator manages the commit across participants.</p>

                <div class="code-block">Two-Phase Commit:

Phase 1: Prepare (Voting)
┌─────────────┐
│ Coordinator │ ──── "Prepare to commit" ────►
└─────────────┘
       │
       │    ┌───────────┐
       ├───►│Participant│───► "Vote: YES/NO"
       │    │    A      │
       │    └───────────┘
       │    ┌───────────┐
       └───►│Participant│───► "Vote: YES/NO"
            │    B      │
            └───────────┘

If ALL vote YES → Phase 2: Commit
If ANY votes NO → Phase 2: Abort

Phase 2: Commit/Abort
┌─────────────┐
│ Coordinator │ ──── "Commit" or "Abort" ────►
└─────────────┘
       │
       ├───► Participant A: Commit/Rollback
       └───► Participant B: Commit/Rollback</div>

                <h3>2PC Problems</h3>
                <div class="code-block">2PC Issues:

1. Blocking: Participants lock resources until commit/abort
   If coordinator crashes after prepare, participants stuck

2. Coordinator SPOF: Single point of failure
   Coordinator down = system blocked

3. Performance: Synchronous, slow
   2+ network round trips
   Lock contention

4. Not partition tolerant:
   Network partition → can't reach consensus

Modern microservices avoid 2PC!</div>

                <h2>Saga Pattern</h2>
                <p>Alternative to 2PC for microservices. A saga is a sequence of local transactions with compensating actions for rollback.</p>

                <div class="code-block">Saga vs 2PC:

2PC: One big transaction, coordinated commit
Saga: Sequence of small transactions

┌───────────────────────────────────────────────┐
│                   SAGA                         │
│                                               │
│  T1 ───► T2 ───► T3 ───► T4                  │
│                                               │
│  If T3 fails:                                 │
│  C2 ◄─── C1 ◄───                             │
│  (compensating transactions)                  │
└───────────────────────────────────────────────┘

Each Ti is a local ACID transaction
Ci is the compensating transaction for Ti</div>

                <h3>Choreography vs Orchestration</h3>
                <div class="code-block">Choreography (Event-Driven):
Services react to events, no central coordinator

Order → OrderCreated event
           │
           ├──► PaymentService: Process payment
           │         │
           │    PaymentCompleted event
           │         │
           │         └──► InventoryService: Reserve
           │                   │
           │              ItemsReserved event
           │                   │
           │                   └──► ShippingService
           │
           └── (If PaymentFailed: Compensate)

Pros: Decoupled, no SPOF
Cons: Hard to track, complex failure handling</div>

                <div class="code-block">Orchestration (Central Coordinator):
Saga orchestrator manages the flow

┌──────────────────┐
│ Saga Orchestrator │
└──────────────────┘
    │  1. Create order
    ├──────────────────► OrderService
    │
    │  2. Process payment
    ├──────────────────► PaymentService
    │
    │  3. Reserve inventory
    ├──────────────────► InventoryService
    │
    │  4. Create shipment
    └──────────────────► ShippingService

If step 3 fails:
    │  Compensate 2: Refund payment
    ├──────────────────► PaymentService
    │
    │  Compensate 1: Cancel order
    └──────────────────► OrderService

Pros: Clear flow, easier debugging
Cons: Orchestrator is central point</div>

                <h2>Implementing Compensating Transactions</h2>
                <div class="code-block">Designing Compensations:

Transaction: CreateOrder
Compensation: CancelOrder

Transaction: ChargePayment
Compensation: RefundPayment

Transaction: ReserveInventory
Compensation: ReleaseInventory

Transaction: SendEmail
Compensation: ??? (Can't unsend!)
→ Some actions aren't compensatable
→ Design: Put non-compensatable actions last

Guidelines:
1. Every transaction needs a compensation
2. Compensations must be idempotent
3. Order compensations in reverse
4. Handle partial failures
5. Non-compensatable actions go last</div>

                <h2>Eventual Consistency</h2>
                <div class="code-block">Sagas provide eventual consistency, not ACID:

ACID (Traditional):
• Atomicity: All or nothing
• Consistency: Valid state transitions
• Isolation: Transactions don't interfere
• Durability: Committed data persists

Saga (BASE):
• Basically Available
• Soft state (may change without input)
• Eventually consistent

Implications:
• Temporary inconsistency is visible
• Application must handle partial states
• UI should reflect "processing" states</div>

                <h2>Real-World Example: Uber</h2>
                <div class="code-block">Uber Ride Saga:

Happy Path:
1. CreateRideRequest
2. MatchDriver → DriverMatched
3. DriverAccepts → RideAccepted
4. RideCompletes → ProcessPayment
5. PaymentSucceeds → RideCompleted

Failure Scenarios:
• NoDriverAvailable → Cancel request, notify rider
• DriverCancels → Release driver, find new driver
• PaymentFails → Retry payment, or mark for follow-up

Uber uses orchestration pattern with
distributed saga coordinator (Cadence/Temporal)</div>

                <h2>Tools for Sagas</h2>
                <div class="code-block">Saga Orchestration Frameworks:

Temporal (formerly Cadence by Uber):
• Workflow as code
• Automatic retries, timeouts
• State persistence
• Used by: Uber, Netflix, Stripe

Axon Framework:
• Event sourcing + CQRS
• Saga management
• Java ecosystem

AWS Step Functions:
• Serverless workflow orchestration
• Visual workflow designer
• Built-in error handling</div>

                <h2>Summary</h2>
                <p>Distributed transactions are hard. 2PC provides strong consistency but blocks and doesn't scale. Sagas provide eventual consistency through local transactions and compensations. Choose choreography for loose coupling or orchestration for clear control flow. Design compensating transactions carefully - some actions can't be undone. Use frameworks like Temporal for complex saga orchestration.</p>
            `,
            interviews: [
                {
                    question: "What is the two-phase commit protocol and what are its problems?",
                    answer: "2PC: Coordinator asks participants to prepare (vote yes/no), then sends commit/abort. Problems: 1) Blocking - participants lock resources until decision, 2) Coordinator SPOF - crash leaves participants stuck, 3) Slow - multiple network round trips, 4) Not partition tolerant. Modern microservices use sagas instead."
                },
                {
                    question: "Explain the Saga pattern for distributed transactions.",
                    answer: "Saga: sequence of local transactions, each with a compensating transaction for rollback. If step fails, execute compensations in reverse. Two styles: Choreography (services react to events, decoupled) and Orchestration (central coordinator manages flow). Provides eventual consistency, not ACID. Example: Order saga with CreateOrder, ChargePayment, ReserveInventory steps."
                },
                {
                    question: "Compare choreography vs orchestration for sagas.",
                    answer: "Choreography: Services publish/subscribe to events, no central coordinator. Pros: decoupled, no SPOF. Cons: hard to track flow, complex debugging. Orchestration: Central coordinator directs each step. Pros: clear flow, easier debugging, explicit error handling. Cons: coordinator is central point. Choose based on complexity and team preferences."
                },
                {
                    question: "What are compensating transactions and how do you design them?",
                    answer: "Compensating transactions undo the effects of a completed transaction. Design rules: 1) Every transaction needs compensation (CreateOrder → CancelOrder), 2) Must be idempotent, 3) Execute in reverse order, 4) Some actions not compensatable (SendEmail) - put these last, 5) Handle partial failures. Compensation != rollback - it's a new transaction that reverses effects."
                },
                {
                    question: "How does eventual consistency in sagas differ from ACID?",
                    answer: "ACID: Atomicity (all-or-nothing), Consistency, Isolation, Durability. Sagas provide BASE: Basically Available, Soft state, Eventually consistent. Difference: temporary inconsistency is visible during saga execution. Application must handle partial states, UI should show 'processing'. Trade-off: availability and scalability over strict consistency."
                }
            ]
        }
    ]
};
