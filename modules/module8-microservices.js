// Module 8: Microservices Architecture
// Contains: Microservices Fundamentals, Service Discovery, Circuit Breakers

const module8Microservices = {
    title: 'Module 8: Microservices Architecture',
    lessons: [
        {
            id: 'microservices-fundamentals',
            title: 'Microservices Fundamentals',
            duration: '50 min',
            content: `
                <h2>What are Microservices?</h2>
                <p>Microservices architecture is an approach where an application is built as a collection of small, independent services. Each service runs in its own process, communicates via APIs, and can be deployed independently. This contrasts with monolithic architecture where everything is built and deployed as a single unit.</p>

                <p>Netflix pioneered microservices at scale with over 1,000 loosely coupled services. Amazon, Uber, and Spotify followed, proving the pattern works for massive-scale applications.</p>

                <div class="code-block">Monolithic Architecture:
┌─────────────────────────────────────────────┐
│              Single Application              │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐       │
│  │  Users  │ │ Orders  │ │Payments │       │
│  └─────────┘ └─────────┘ └─────────┘       │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐       │
│  │Inventory│ │ Search  │ │Analytics│       │
│  └─────────┘ └─────────┘ └─────────┘       │
│                                             │
│            Single Database                  │
└─────────────────────────────────────────────┘

All code in one codebase, one deployment unit

Microservices Architecture:
┌─────────┐ ┌─────────┐ ┌─────────┐
│  User   │ │  Order  │ │ Payment │
│ Service │ │ Service │ │ Service │
│   DB    │ │   DB    │ │   DB    │
└─────────┘ └─────────┘ └─────────┘
     │           │           │
     └───────────┼───────────┘
                 │
          API Gateway
                 │
              Clients

Each service: own codebase, own DB, independent deployment</div>

                <h2>Monolith vs Microservices</h2>

                <table class="table">
                    <tr>
                        <th>Aspect</th>
                        <th>Monolith</th>
                        <th>Microservices</th>
                    </tr>
                    <tr>
                        <td>Deployment</td>
                        <td>All or nothing</td>
                        <td>Independent per service</td>
                    </tr>
                    <tr>
                        <td>Scaling</td>
                        <td>Scale entire app</td>
                        <td>Scale individual services</td>
                    </tr>
                    <tr>
                        <td>Technology</td>
                        <td>Single stack</td>
                        <td>Polyglot (mix technologies)</td>
                    </tr>
                    <tr>
                        <td>Team Structure</td>
                        <td>Large, coordinated teams</td>
                        <td>Small, autonomous teams</td>
                    </tr>
                    <tr>
                        <td>Complexity</td>
                        <td>Simple to start</td>
                        <td>Complex infrastructure</td>
                    </tr>
                    <tr>
                        <td>Failure Impact</td>
                        <td>Entire app down</td>
                        <td>Isolated to service</td>
                    </tr>
                </table>

                <h2>Key Principles</h2>

                <h3>1. Single Responsibility</h3>
                <p>Each service does one thing well. The service boundary should align with business capabilities.</p>

                <div class="code-block">Bad: UserService handles users, orders, AND payments
Good:
• UserService: User registration, profiles, authentication
• OrderService: Order creation, status, history
• PaymentService: Payment processing, refunds

Each service owns its domain completely</div>

                <h3>2. Database Per Service</h3>
                <p>Each service owns its data. No shared databases - this ensures loose coupling.</p>

                <div class="code-block">Anti-pattern: Shared Database
┌─────────┐  ┌─────────┐
│Service A│──│ Shared  │──│Service B│
└─────────┘  │   DB    │  └─────────┘
             └─────────┘
Tight coupling - can't change schema independently

Correct: Database per Service
┌─────────┐  ┌─────────┐  ┌─────────┐
│Service A│  │Service B│  │Service C│
│  [DB]   │  │  [DB]   │  │  [DB]   │
└─────────┘  └─────────┘  └─────────┘
Loose coupling - each owns its schema</div>

                <h3>3. API-First Communication</h3>
                <p>Services communicate through well-defined APIs (REST, gRPC, async messaging).</p>

                <h3>4. Decentralized Governance</h3>
                <p>Teams choose their own technology stack. Use the right tool for each job.</p>

                <div class="code-block">Netflix's Polyglot Services:
• Recommendation Engine: Python (ML libraries)
• Streaming Service: Java (performance)
• Analytics: Scala/Spark (data processing)
• CDN Edge: Node.js (I/O intensive)
• Mobile API: Kotlin (modern, concise)</div>

                <h3>5. Design for Failure</h3>
                <p>Services will fail. Design systems to handle partial failures gracefully.</p>

                <h2>Amazon's Two-Pizza Teams</h2>
                <p>Amazon pioneered the organizational model for microservices: teams small enough to feed with two pizzas (6-10 people).</p>

                <div class="code-block">Amazon's Model:
┌───────────────────────────────────────┐
│           Two-Pizza Team              │
│                                       │
│  • Own one or few microservices       │
│  • "You build it, you run it"         │
│  • Full-stack: dev, test, ops, on-call│
│  • Autonomous decision making         │
│  • Clear SLAs with other teams        │
└───────────────────────────────────────┘

Benefits:
• Clear ownership and accountability
• Fast decision making (no committees)
• Deep expertise in their domain
• Reduced coordination overhead</div>

                <h2>Netflix's 1000+ Microservices</h2>

                <div class="code-block">Netflix Architecture (2025):
┌─────────────────────────────────────────────┐
│                   Clients                    │
│  (iOS, Android, TV, Web, PlayStation, etc.) │
└─────────────────────────────────────────────┘
                      │
              ┌───────┴───────┐
              │  API Gateway  │
              │    (Zuul)     │
              └───────────────┘
                      │
         ┌────────────┼────────────┐
         ▼            ▼            ▼
    ┌─────────┐ ┌──────────┐ ┌─────────┐
    │GraphQL  │ │ Playback │ │ Search  │
    │Federation││ Service  │ │ Service │
    └─────────┘ └──────────┘ └─────────┘
         │            │            │
    ┌────┴────────────┴────────────┴────┐
    │      Internal Service Mesh         │
    │   (1000+ microservices, gRPC)      │
    └────────────────────────────────────┘
                      │
              ┌───────┴───────┐
              │ Apache Kafka  │
              │ (Event Bus)   │
              └───────────────┘

Key patterns:
• Federated GraphQL for API composition
• gRPC for internal service-to-service
• Kafka for async event streaming
• Service mesh for traffic management</div>

                <h2>Communication Patterns</h2>

                <h3>Synchronous (Request-Response)</h3>
                <div class="code-block">REST/gRPC:
┌─────────┐  Request   ┌─────────┐
│Service A│ ─────────► │Service B│
│         │ ◄───────── │         │
└─────────┘  Response  └─────────┘

Use when: Need immediate response
Challenge: Service B down = Service A fails</div>

                <h3>Asynchronous (Event-Driven)</h3>
                <div class="code-block">Message Queue/Event Bus:
┌─────────┐  Event    ┌─────────┐  Event    ┌─────────┐
│Service A│ ────────► │  Kafka  │ ────────► │Service B│
└─────────┘           └─────────┘           └─────────┘

Use when: Don't need immediate response
Benefit: Services decoupled, more resilient</div>

                <h2>Data Consistency Challenges</h2>

                <h3>The Saga Pattern</h3>
                <p>With database-per-service, you can't use traditional transactions. Sagas manage distributed transactions through a sequence of local transactions.</p>

                <div class="code-block">Order Saga (Choreography):

1. OrderService: Create order (PENDING)
   → Publish: OrderCreated event

2. PaymentService: Process payment
   → Success: Publish PaymentCompleted
   → Failure: Publish PaymentFailed

3. InventoryService: Reserve items
   → Success: Publish ItemsReserved
   → Failure: Publish ReservationFailed

4. OrderService: Listening for events
   → All success: Mark order COMPLETED
   → Any failure: Trigger compensating actions

Compensating actions (rollback):
• PaymentFailed → Cancel order
• ReservationFailed → Refund payment, cancel order</div>

                <h2>When NOT to Use Microservices</h2>

                <ul style="margin: 1rem 0; margin-left: 2rem;">
                    <li><strong>Startups/MVPs:</strong> Start with monolith, extract services later</li>
                    <li><strong>Small teams:</strong> Overhead isn't justified for &lt;10 developers</li>
                    <li><strong>Simple domains:</strong> CRUD apps don't need distributed complexity</li>
                    <li><strong>Tight coupling:</strong> If services need constant coordination</li>
                </ul>

                <div class="code-block">Martin Fowler's Advice:
"Don't even consider microservices unless you have a
system that's too complex to manage as a monolith."

Start with: Modular Monolith
• Well-defined module boundaries
• Can extract to services later
• Much simpler to build and operate</div>

                <h2>Summary</h2>
                <p>Microservices enable scaling large applications by breaking them into independent services. Key principles: single responsibility, database per service, API communication, decentralized governance, and design for failure. Netflix and Amazon prove it works at scale, but it's not for everyone. Start with a monolith and extract services when complexity demands it.</p>
            `,
            interviews: [
                {
                    question: "What are microservices and how do they differ from monolithic architecture?",
                    answer: "Microservices are small, independent services that communicate via APIs. Each service has its own codebase, database, and deployment. Monolith: single codebase, single database, deploy everything together. Microservices enable: independent deployment, independent scaling, polyglot technology, isolated failures. Trade-off: distributed system complexity."
                },
                {
                    question: "Explain the 'database per service' principle and why it matters.",
                    answer: "Each microservice owns its data in its own database. No shared databases between services. Why it matters: 1) Loose coupling - services can change schema independently, 2) Independent scaling - scale storage per service needs, 3) Technology freedom - choose right DB type per service (SQL, NoSQL, etc.), 4) Encapsulation - service owns its domain completely. Trade-off: data consistency becomes harder (eventual consistency, sagas)."
                },
                {
                    question: "What is Amazon's 'two-pizza team' model?",
                    answer: "Teams small enough to feed with two pizzas (6-10 people). Each team owns one or few microservices completely. Key principles: 'You build it, you run it' - team handles dev, test, ops, and on-call. Benefits: clear ownership, fast decisions (no committees), deep domain expertise, autonomous teams. Combined with clear SLAs between teams for service contracts."
                },
                {
                    question: "When should you NOT use microservices?",
                    answer: "Don't use microservices for: 1) Startups/MVPs - start with monolith, extract later, 2) Small teams (<10 devs) - overhead not justified, 3) Simple domains - CRUD apps don't need distribution, 4) Tightly coupled domains - if services need constant coordination. Martin Fowler: 'Don't consider microservices unless your system is too complex to manage as a monolith.'"
                },
                {
                    question: "How does Netflix handle communication between 1000+ microservices?",
                    answer: "Netflix uses: 1) Federated GraphQL for API composition at the edge, 2) gRPC for internal service-to-service (fast, typed), 3) Apache Kafka for async events, 4) Service mesh for traffic management. Pattern: sync calls for immediate needs, async events for decoupling. Circuit breakers (Resilience4j) prevent cascading failures."
                }
            ]
        },
        {
            id: 'service-discovery-registry',
            title: 'Service Discovery and Registry',
            duration: '45 min',
            content: `
                <h2>The Service Discovery Problem</h2>
                <p>In microservices, services need to find each other. But IP addresses change constantly - containers restart, auto-scaling adds/removes instances, deployments replace old with new. Hardcoding addresses doesn't work.</p>

                <div class="code-block">The Problem:
┌─────────────┐
│ Order Service│ needs to call User Service
└─────────────┘
       │
       ▼ But where is User Service?

Yesterday: 10.0.1.5:8080, 10.0.1.6:8080
Today:     10.0.2.10:8080, 10.0.2.11:8080, 10.0.2.12:8080
(scaled up, new IPs after deployment)

Hardcoded config won't work!</div>

                <h2>Service Registry</h2>
                <p>A service registry is a database of available service instances. Services register themselves on startup and deregister on shutdown. Clients query the registry to find services.</p>

                <div class="code-block">Service Registry Architecture:
┌─────────────────────────────────────────┐
│           Service Registry               │
│  ┌─────────────────────────────────┐    │
│  │ Service: user-service            │    │
│  │ Instances:                       │    │
│  │   - 10.0.1.5:8080 (healthy)     │    │
│  │   - 10.0.1.6:8080 (healthy)     │    │
│  │   - 10.0.1.7:8080 (unhealthy)   │    │
│  └─────────────────────────────────┘    │
│  ┌─────────────────────────────────┐    │
│  │ Service: order-service           │    │
│  │ Instances:                       │    │
│  │   - 10.0.2.10:8080 (healthy)    │    │
│  │   - 10.0.2.11:8080 (healthy)    │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘

Lifecycle:
1. Service starts → Registers with registry
2. Registry performs health checks
3. Client queries registry for instances
4. Service stops → Deregisters (or health check fails)</div>

                <h2>Discovery Patterns</h2>

                <h3>Client-Side Discovery</h3>
                <p>The client queries the registry and chooses which instance to call. Client handles load balancing.</p>

                <div class="code-block">Client-Side Discovery:
┌─────────────┐    1. Query    ┌──────────────┐
│   Client    │ ─────────────► │   Registry   │
│  (Order Svc)│ ◄───────────── │              │
└─────────────┘  2. Instance   └──────────────┘
       │            list              ▲
       │                              │ Register
       ▼ 3. Direct call               │
┌─────────────┐                ┌──────────────┐
│ User Service│ ◄──────────────│ User Service │
│ Instance 1  │                │ Instance 2   │
└─────────────┘                └──────────────┘

Used by: Netflix Eureka, Consul (client mode)

Pros: Simple, client controls load balancing
Cons: Client coupled to registry, language-specific</div>

                <h3>Server-Side Discovery</h3>
                <p>Client makes request to a load balancer/router, which queries the registry and forwards the request.</p>

                <div class="code-block">Server-Side Discovery:
┌─────────────┐    1. Request   ┌──────────────┐
│   Client    │ ───────────────►│Load Balancer │
│  (Order Svc)│ ◄───────────────│   / Router   │
└─────────────┘    4. Response  └──────────────┘
                                   │  ▲
                        2. Query   │  │ 3. Forward
                                   ▼  │
                              ┌──────────────┐
                              │   Registry   │
                              └──────────────┘
                                      ▲
                                      │ Register
                              ┌───────┴───────┐
                              ▼               ▼
                        ┌──────────┐   ┌──────────┐
                        │ Instance │   │ Instance │
                        │    1     │   │    2     │
                        └──────────┘   └──────────┘

Used by: Kubernetes, AWS ALB, Consul (server mode)

Pros: Client decoupled from registry, simpler clients
Cons: Extra network hop, load balancer is SPOF</div>

                <h2>Popular Service Discovery Tools</h2>

                <h3>Netflix Eureka</h3>
                <div class="code-block">Eureka (Client-Side Discovery):
┌────────────────────────────────────────┐
│           Eureka Server                 │
│  • Service registry database           │
│  • REST API for registration/query     │
│  • Self-preservation mode              │
│  • AP system (availability over        │
│    consistency)                        │
└────────────────────────────────────────┘

Features:
• Designed for AWS, handles zone awareness
• Self-preservation: if many instances fail
  health checks, assumes network issue
• Spring Cloud integration
• Peer replication for HA

Best for: Spring Boot apps, Netflix OSS stack</div>

                <h3>HashiCorp Consul</h3>
                <div class="code-block">Consul:
┌────────────────────────────────────────┐
│           Consul Cluster                │
│  • Service discovery                   │
│  • Health checking (TCP, HTTP, gRPC)   │
│  • Key-Value store (config)            │
│  • Service mesh (Consul Connect)       │
│  • Multi-datacenter support            │
└────────────────────────────────────────┘

Features:
• DNS and HTTP API for discovery
• Built-in health checks
• ACL for security
• Service mesh with mTLS

Best for: Multi-datacenter, infrastructure-agnostic</div>

                <h3>Kubernetes Service Discovery</h3>
                <div class="code-block">Kubernetes (Built-in):
┌────────────────────────────────────────┐
│        Kubernetes Cluster               │
│                                         │
│  ┌─────────────┐                       │
│  │ Service     │ ← Virtual IP (ClusterIP)
│  │ user-service│                       │
│  └─────────────┘                       │
│         │                              │
│    ┌────┼────┐                         │
│    ▼    ▼    ▼                         │
│  ┌───┐┌───┐┌───┐                       │
│  │Pod││Pod││Pod│ ← Actual instances   │
│  └───┘└───┘└───┘                       │
│                                         │
│  DNS: user-service.namespace.svc.cluster│
└────────────────────────────────────────┘

Features:
• DNS-based discovery (CoreDNS)
• kube-proxy for load balancing
• No external dependencies
• Automatic registration via Pod lifecycle

Best for: Kubernetes-native applications</div>

                <h2>Comparison</h2>

                <table class="table">
                    <tr>
                        <th>Tool</th>
                        <th>Type</th>
                        <th>Consistency</th>
                        <th>Best For</th>
                    </tr>
                    <tr>
                        <td>Eureka</td>
                        <td>Client-side</td>
                        <td>AP (available)</td>
                        <td>Spring Cloud apps</td>
                    </tr>
                    <tr>
                        <td>Consul</td>
                        <td>Both</td>
                        <td>CP (consistent)</td>
                        <td>Multi-DC, service mesh</td>
                    </tr>
                    <tr>
                        <td>Kubernetes</td>
                        <td>Server-side</td>
                        <td>Eventual</td>
                        <td>K8s environments</td>
                    </tr>
                    <tr>
                        <td>etcd</td>
                        <td>Key-value</td>
                        <td>CP (Raft)</td>
                        <td>K8s backend, config</td>
                    </tr>
                </table>

                <h2>Health Checks</h2>
                <p>The registry needs to know which instances are healthy. Unhealthy instances should not receive traffic.</p>

                <div class="code-block">Health Check Types:

1. HTTP Health Check:
   GET /health → 200 OK (healthy)
                 500 (unhealthy)

2. TCP Health Check:
   Can connect to port? → healthy
   Connection refused → unhealthy

3. Script/Command:
   Run custom script → exit 0 (healthy)
                      exit 1 (unhealthy)

4. gRPC Health Check:
   grpc.health.v1.Health/Check → SERVING

Configuration Example (Consul):
{
  "service": {
    "name": "user-service",
    "port": 8080,
    "check": {
      "http": "http://localhost:8080/health",
      "interval": "10s",
      "timeout": "2s"
    }
  }
}</div>

                <h2>Service Mesh</h2>
                <p>Modern approach: move service discovery, load balancing, and security into infrastructure layer (sidecar proxies).</p>

                <div class="code-block">Service Mesh Architecture:
┌─────────────────────────────────────────┐
│              Service A Pod               │
│  ┌─────────────┐  ┌─────────────────┐   │
│  │  Service A  │←→│  Sidecar Proxy  │   │
│  │  (app code) │  │  (Envoy/Istio)  │   │
│  └─────────────┘  └─────────────────┘   │
└─────────────────────────────────────────┘
                        │
                        │ mTLS, discovery,
                        │ load balancing
                        ▼
┌─────────────────────────────────────────┐
│              Service B Pod               │
│  ┌─────────────────┐  ┌─────────────┐   │
│  │  Sidecar Proxy  │←→│  Service B  │   │
│  │  (Envoy/Istio)  │  │  (app code) │   │
│  └─────────────────┘  └─────────────┘   │
└─────────────────────────────────────────┘

Benefits:
• App code doesn't handle discovery
• Automatic mTLS between services
• Traffic management (retries, timeouts)
• Observability (metrics, tracing)</div>

                <h2>2025 Perspective</h2>
                <div class="code-block">Recommendations:
• Kubernetes-native? Use built-in K8s discovery
• Multi-datacenter? Consul
• Spring Boot legacy? Eureka (but consider migrating)
• Need service mesh? Istio + Envoy, or Consul Connect

Trend: Service mesh adoption growing
       Application-level discovery declining</div>

                <h2>Summary</h2>
                <p>Service discovery solves the dynamic addressing problem in microservices. Choose client-side (Eureka) for control, server-side (K8s) for simplicity. Modern trend is service mesh, which moves discovery into infrastructure. Key requirement: robust health checks to ensure only healthy instances receive traffic.</p>
            `,
            interviews: [
                {
                    question: "What is service discovery and why is it needed in microservices?",
                    answer: "Service discovery solves the dynamic addressing problem - in microservices, IP addresses change constantly (auto-scaling, deployments, restarts). Hardcoding addresses won't work. Solution: service registry - a database of service instances. Services register on startup, clients query registry to find services. Enables dynamic scaling and deployment."
                },
                {
                    question: "Explain client-side vs server-side service discovery.",
                    answer: "Client-side (Eureka): Client queries registry directly, gets instance list, chooses which to call, handles load balancing. Pros: simple, client controls routing. Cons: coupled to registry. Server-side (K8s, Consul): Client calls load balancer, which queries registry and forwards request. Pros: simpler clients, decoupled. Cons: extra hop, LB is potential SPOF."
                },
                {
                    question: "Compare Eureka, Consul, and Kubernetes service discovery.",
                    answer: "Eureka: Client-side, AP (availability), best for Spring Boot. Consul: Both modes, CP (consistent), multi-datacenter, includes service mesh. Kubernetes: Built-in, server-side, DNS-based, no external deps. Choice depends on: K8s environment (use native), Spring apps (Eureka), multi-DC needs (Consul)."
                },
                {
                    question: "What is a service mesh and how does it handle service discovery?",
                    answer: "Service mesh moves discovery, load balancing, and security into infrastructure via sidecar proxies (Envoy). App code doesn't handle discovery - sidecar intercepts all traffic. Benefits: automatic mTLS, traffic management, observability. Examples: Istio, Consul Connect, Linkerd. Modern trend replacing application-level discovery."
                },
                {
                    question: "How do health checks work in service discovery?",
                    answer: "Registry performs health checks to track instance status. Types: HTTP (GET /health returns 200), TCP (can connect?), gRPC (health protocol), Script (custom command). Unhealthy instances removed from rotation. Configuration includes interval (how often), timeout (max wait), and deregister threshold (failures before removal)."
                }
            ]
        },
        {
            id: 'circuit-breakers-resilience',
            title: 'Circuit Breakers and Resilience Patterns',
            duration: '55 min',
            content: `
                <h2>The Cascade Failure Problem</h2>
                <p>In microservices, one failing service can bring down the entire system. When Service A calls Service B and B is slow or down, A's threads wait. If A has limited threads, they all get consumed waiting for B. Now A can't handle any requests - it's effectively down too. This cascades to every service that depends on A.</p>

                <div class="code-block">Cascade Failure:
┌─────────┐     ┌─────────┐     ┌─────────┐
│Client   │────►│Service A│────►│Service B│ ← SLOW!
└─────────┘     └─────────┘     └─────────┘
                     │              (5s timeout)
                     │
        All threads waiting for B...
        A can't serve other requests
        Now A is effectively DOWN
                     │
                     ▼
             Cascade to all services
             depending on A</div>

                <h2>The Circuit Breaker Pattern</h2>
                <p>Circuit breakers prevent cascade failures by "tripping" when a service is unhealthy. Instead of waiting for timeouts, the circuit breaker fails fast and returns a fallback response.</p>

                <div class="code-block">Circuit Breaker States:

CLOSED (Normal):
┌─────────┐ Request ┌───────────────┐ Forward ┌─────────┐
│ Client  │────────►│Circuit Breaker│────────►│ Service │
└─────────┘◄────────│   (CLOSED)    │◄────────└─────────┘
            Response└───────────────┘ Response

Monitoring: Track success/failure rates

OPEN (Failing Fast):
┌─────────┐ Request ┌───────────────┐    ╳    ┌─────────┐
│ Client  │────────►│Circuit Breaker│         │ Service │
└─────────┘◄────────│    (OPEN)     │         └─────────┘
          Fallback  └───────────────┘         (not called)

When failure threshold exceeded, stop calling service
Return fallback immediately (fail fast)

HALF-OPEN (Testing):
┌───────────────┐
│Circuit Breaker│ → Allow limited requests
│  (HALF-OPEN)  │ → If succeed: CLOSE
│               │ → If fail: stay OPEN
└───────────────┘

After timeout, test if service recovered</div>

                <h2>How It Works</h2>

                <div class="code-block">Circuit Breaker Configuration:

failure_threshold: 50%      # Trip if 50% requests fail
request_volume: 20          # Minimum requests before tripping
timeout: 10s               # Time in OPEN state before HALF-OPEN
half_open_requests: 5      # Requests to test in HALF-OPEN

Timeline:
Time 0:00 - CLOSED, forwarding requests
Time 0:30 - 15/20 requests failed (75%)
           → Threshold exceeded, trip to OPEN
Time 0:30-0:40 - OPEN, returning fallback immediately
Time 0:40 - Timeout elapsed → HALF-OPEN
Time 0:40 - Allow 5 test requests
           → 4/5 succeed → CLOSED
           → 3/5 fail → stay OPEN, reset timeout</div>

                <h2>Netflix Hystrix (Legacy) → Resilience4j (Modern)</h2>

                <div class="code-block">Hystrix (Netflix OSS, now in maintenance mode):
• Pioneered circuit breaker pattern
• Thread pool isolation
• Fallback support
• Dashboard for monitoring
• Used by Netflix, widely adopted

Resilience4j (Recommended for new projects):
• Lightweight, modular
• Functional programming style
• No external dependencies
• Works with any framework
• Actively maintained

Netflix's Statement (2018):
"For new internal projects, we leverage resilience4j"</div>

                <h3>Resilience4j Example</h3>
                <div class="code-block">// Configure circuit breaker
CircuitBreakerConfig config = CircuitBreakerConfig.custom()
    .failureRateThreshold(50)
    .waitDurationInOpenState(Duration.ofSeconds(10))
    .permittedNumberOfCallsInHalfOpenState(5)
    .minimumNumberOfCalls(20)
    .build();

CircuitBreaker circuitBreaker = CircuitBreaker.of("userService", config);

// Wrap the call
Supplier<User> supplier = CircuitBreaker
    .decorateSupplier(circuitBreaker, () -> userService.getUser(id));

// Execute with fallback
Try.ofSupplier(supplier)
    .recover(throwable -> User.defaultUser())
    .get();</div>

                <h2>Related Resilience Patterns</h2>

                <h3>1. Retry Pattern</h3>
                <p>Automatically retry failed requests with backoff.</p>

                <div class="code-block">Retry with Exponential Backoff:
Attempt 1: fails immediately
Wait 100ms
Attempt 2: fails
Wait 200ms (2x)
Attempt 3: fails
Wait 400ms (2x)
Attempt 4: succeeds!

Configuration:
• max_attempts: 4
• initial_interval: 100ms
• multiplier: 2.0
• max_interval: 10s

Important: Only retry idempotent operations!</div>

                <h3>2. Timeout Pattern</h3>
                <p>Don't wait forever - fail fast if service doesn't respond.</p>

                <div class="code-block">Timeout Configuration:
┌─────────┐  Request  ┌─────────┐
│ Client  │──────────►│ Service │
└─────────┘           └─────────┘
     │
     │ If no response in 2s:
     │ → Cancel request
     │ → Return timeout error
     │ → Don't consume thread
     ▼
Prevents thread starvation</div>

                <h3>3. Bulkhead Pattern</h3>
                <p>Isolate resources so one failure doesn't consume all capacity.</p>

                <div class="code-block">Bulkhead (Thread Pool Isolation):
┌─────────────────────────────────────────┐
│              Service A                   │
│                                         │
│  ┌─────────────┐  ┌─────────────┐      │
│  │ Thread Pool │  │ Thread Pool │      │
│  │ Service B   │  │ Service C   │      │
│  │ (10 threads)│  │ (10 threads)│      │
│  └─────────────┘  └─────────────┘      │
│                                         │
│  If Service B is slow:                  │
│  → Only its 10 threads blocked         │
│  → Service C still has 10 threads      │
│  → Rest of Service A unaffected        │
└─────────────────────────────────────────┘

Without Bulkhead: All threads blocked by B
With Bulkhead: Only B's threads affected</div>

                <h3>4. Rate Limiter</h3>
                <p>Limit the rate of outgoing requests to protect downstream services.</p>

                <h3>5. Fallback Pattern</h3>
                <p>Return alternative response when primary fails.</p>

                <div class="code-block">Fallback Strategies:

1. Cached Data:
   → Return last known good value
   → Example: Show cached product price

2. Default Value:
   → Return safe default
   → Example: Empty recommendations list

3. Alternative Service:
   → Call backup service
   → Example: Secondary payment processor

4. Graceful Degradation:
   → Reduced functionality
   → Example: Disable personalization, show generic content

Netflix Example:
If recommendation service fails:
→ Show trending/popular content instead
→ User still gets a response, just not personalized</div>

                <h2>Real-World: Netflix Resilience</h2>

                <div class="code-block">Netflix's Resilience Stack:
┌─────────────────────────────────────────┐
│          Netflix Service                 │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │     Adaptive Concurrency        │   │
│  │  (automatic limit adjustment)   │   │
│  └─────────────────────────────────┘   │
│                   │                     │
│  ┌────────┬───────┼───────┬────────┐   │
│  │Timeout │Circuit│Bulkhead│ Retry │   │
│  │ 2s     │Breaker│10 threads│ 3x   │   │
│  └────────┴───────┴───────┴────────┘   │
│                   │                     │
│  ┌─────────────────────────────────┐   │
│  │         Fallback                │   │
│  │  (cached/default response)      │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘

Key insight: Layers of protection
• Each layer catches different failure modes
• If one layer fails, next one catches it</div>

                <h2>Chaos Engineering</h2>
                <p>Netflix pioneered chaos engineering - intentionally injecting failures to test resilience.</p>

                <div class="code-block">Netflix Chaos Monkey:
• Randomly kills production instances
• Tests: Does system recover?
• Runs during business hours
• Engineers must build resilient systems

Chaos Kong:
• Simulates entire AWS region failure
• Tests multi-region failover

Principles:
1. Build hypothesis about steady state
2. Vary real-world events (kill instances, inject latency)
3. Run in production (with safeguards)
4. Automate experiments
5. Minimize blast radius</div>

                <h2>Implementation Best Practices</h2>

                <div class="code-block">1. Set appropriate thresholds:
   • Too sensitive: Circuit trips too often
   • Too lenient: Doesn't protect from failures
   • Start conservative, tune based on data

2. Monitor circuit breaker state:
   • Dashboard showing OPEN/CLOSED/HALF-OPEN
   • Alert when circuits trip
   • Track fallback usage

3. Design meaningful fallbacks:
   • Don't just return null
   • Provide degraded but useful response
   • Log fallback usage for analysis

4. Test failure scenarios:
   • Chaos engineering
   • Simulate slow services, timeouts
   • Verify fallbacks work correctly

5. Combine patterns:
   Circuit Breaker + Retry + Timeout + Bulkhead
   = Comprehensive resilience</div>

                <h2>Summary</h2>
                <p>Circuit breakers prevent cascade failures by failing fast when services are unhealthy. Combined with retries, timeouts, bulkheads, and fallbacks, they create resilient systems. Netflix's approach layers these patterns and validates them with chaos engineering. For new projects, use Resilience4j over the legacy Hystrix library.</p>
            `,
            interviews: [
                {
                    question: "What is the circuit breaker pattern and why is it important?",
                    answer: "Circuit breaker prevents cascade failures in microservices. Three states: CLOSED (normal, forwarding), OPEN (failing fast, returning fallback), HALF-OPEN (testing recovery). When failure threshold exceeded, circuit trips to OPEN - stops calling failing service, returns fallback immediately. Prevents one slow service from bringing down entire system."
                },
                {
                    question: "Explain the three states of a circuit breaker.",
                    answer: "CLOSED: Normal operation, requests forwarded, monitoring success/failure rates. OPEN: Threshold exceeded, requests fail fast with fallback, service not called. HALF-OPEN: After timeout, allow limited test requests - if succeed, close circuit; if fail, stay open. This allows automatic recovery detection."
                },
                {
                    question: "What is the bulkhead pattern?",
                    answer: "Bulkhead isolates resources to prevent one failure from consuming all capacity. Like ship bulkheads preventing total flooding. Implementation: separate thread pools per downstream service. If Service B is slow, only its 10 threads blocked; Service C still has 10 threads working. Without bulkhead, all threads could be consumed by one slow dependency."
                },
                {
                    question: "How do retries, timeouts, and circuit breakers work together?",
                    answer: "Layered protection: 1) Timeout prevents infinite waiting (2s max), 2) Retry handles transient failures (3 attempts with backoff), 3) Circuit breaker handles persistent failures (trips after threshold). Order matters: Timeout wraps single call, retry wraps timeout, circuit breaker wraps retry. Each catches different failure modes."
                },
                {
                    question: "What is Netflix's Chaos Monkey and why is it important?",
                    answer: "Chaos Monkey randomly kills production instances during business hours. Tests: does system recover automatically? Forces engineers to build resilient systems. Part of chaos engineering - intentionally inject failures to find weaknesses before they cause outages. Netflix also has Chaos Kong (simulates region failure). Key principle: test in production with safeguards."
                }
            ]
        }
    ]
};
