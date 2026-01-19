// Module 6: Message Queues & Async Processing
// Contains: Message Queue Fundamentals, Pub/Sub Systems, Event-Driven Architecture

const module6MessageQueues = {
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
};
