// Module 4: Databases Part 1 - Foundations
// Contains: SQL vs NoSQL, Database Sharding, Database Replication, Database Indexing

const module4Databases1 = 
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
;
