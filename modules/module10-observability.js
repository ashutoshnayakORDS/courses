// Module 10: Observability & Security
// Contains: Monitoring/Logging/Tracing, Security Best Practices

const module10Observability = {
    title: 'Module 10: Observability & Security',
    lessons: [
        {
            id: 'monitoring-logging-tracing',
            title: 'Monitoring, Logging, and Distributed Tracing',
            duration: '55 min',
            content: `
                <h2>The Three Pillars of Observability</h2>
                <p>In distributed systems, you can't fix what you can't see. Observability is the ability to understand your system's internal state from its external outputs. The three pillars are metrics, logs, and traces - each providing different insights.</p>

                <div class="code-block">The Three Pillars:

┌─────────────────────────────────────────────────────┐
│                  OBSERVABILITY                       │
├─────────────────┬─────────────────┬─────────────────┤
│     METRICS     │      LOGS       │     TRACES      │
├─────────────────┼─────────────────┼─────────────────┤
│ What happened?  │ Why did it      │ Where did it    │
│ (numbers)       │ happen? (events)│ happen? (flow)  │
├─────────────────┼─────────────────┼─────────────────┤
│ CPU: 85%        │ ERROR: DB conn  │ Request path:   │
│ Latency: 250ms  │ failed at 10:30 │ API→Auth→DB→    │
│ Requests: 1000/s│ User: john@...  │ Cache→Response  │
└─────────────────┴─────────────────┴─────────────────┘</div>

                <h2>Metrics</h2>
                <p>Metrics are numerical measurements collected over time. They tell you WHAT is happening in your system at aggregate level.</p>

                <h3>Types of Metrics</h3>
                <div class="code-block">Counter: Only increases (total requests, errors)
  http_requests_total: 1,000,000

Gauge: Can go up or down (temperature, queue size)
  active_connections: 250

Histogram: Distribution of values (latency buckets)
  request_duration_seconds:
    bucket{le="0.1"}: 50000  (50K requests < 100ms)
    bucket{le="0.5"}: 80000  (80K requests < 500ms)
    bucket{le="1.0"}: 95000  (95K requests < 1s)

Summary: Percentiles (p50, p99 latency)
  request_duration_p99: 450ms</div>

                <h3>The RED Method (Request-focused)</h3>
                <div class="code-block">For every service, measure:
• Rate: Requests per second
• Errors: Failed requests per second
• Duration: Time per request (latency)

Example Dashboard:
┌─────────────────────────────────────┐
│ Order Service                       │
│ Rate: 500 req/s  ████████████░░░    │
│ Errors: 0.1%     █░░░░░░░░░░░░░░    │
│ Duration p99: 120ms                 │
└─────────────────────────────────────┘</div>

                <h3>The USE Method (Resource-focused)</h3>
                <div class="code-block">For every resource (CPU, memory, disk), measure:
• Utilization: % time resource is busy
• Saturation: Amount of work queued
• Errors: Error count

Example:
CPU Utilization: 75%
CPU Saturation: 12 processes waiting
Disk Errors: 0</div>

                <h2>Logging</h2>
                <p>Logs are discrete events with context. They tell you WHY something happened with full detail.</p>

                <h3>Structured Logging</h3>
                <div class="code-block">Unstructured (Bad):
"User john@example.com failed to login at 2024-01-15 10:30:00"

Structured (Good):
{
  "timestamp": "2024-01-15T10:30:00Z",
  "level": "ERROR",
  "service": "auth-service",
  "event": "login_failed",
  "user_email": "john@example.com",
  "reason": "invalid_password",
  "ip_address": "192.168.1.100",
  "trace_id": "abc123",
  "span_id": "def456"
}

Benefits:
• Machine parseable
• Easy to query and filter
• Correlate with traces (trace_id)</div>

                <h3>Log Levels</h3>
                <div class="code-block">DEBUG: Detailed info for debugging
INFO:  Normal operations
WARN:  Something unexpected, not an error
ERROR: Something failed
FATAL: System cannot continue

Production typically: INFO and above
Debugging: Enable DEBUG temporarily</div>

                <h3>Centralized Logging</h3>
                <div class="code-block">Architecture:
┌─────────┐ ┌─────────┐ ┌─────────┐
│Service A│ │Service B│ │Service C│
└────┬────┘ └────┬────┘ └────┬────┘
     │           │           │
     └───────────┼───────────┘
                 │
          ┌──────▼──────┐
          │ Log Shipper │ (Fluentd, Filebeat)
          └──────┬──────┘
                 │
          ┌──────▼──────┐
          │ Log Storage │ (Elasticsearch, Loki)
          └──────┬──────┘
                 │
          ┌──────▼──────┐
          │   Search    │ (Kibana, Grafana)
          └─────────────┘

Popular stacks:
• ELK: Elasticsearch, Logstash, Kibana
• EFK: Elasticsearch, Fluentd, Kibana
• Grafana Loki + Promtail</div>

                <h2>Distributed Tracing</h2>
                <p>Traces show the path of a request through your distributed system. Essential for understanding latency and dependencies in microservices.</p>

                <h3>How Tracing Works</h3>
                <div class="code-block">Trace: Complete journey of a request
Span: Single operation within a trace

Request: GET /api/orders/123

Trace ID: abc-123
├── Span: API Gateway (20ms)
│   └── Span: Auth Service (15ms)
│       └── Span: Token Validation (10ms)
├── Span: Order Service (80ms)
│   ├── Span: Database Query (30ms)
│   └── Span: Cache Lookup (5ms)
└── Span: Response Serialization (5ms)

Total: 120ms

Context Propagation:
Request headers carry trace context:
traceparent: 00-abc123-def456-01
(version-traceId-spanId-flags)</div>

                <h3>Trace Visualization</h3>
                <div class="code-block">Waterfall View:
┌────────────────────────────────────────────┐
│ GET /api/orders/123                        │
├────────────────────────────────────────────┤
│ API Gateway     ████░░░░░░░░░░░░░░ 20ms   │
│   Auth          ███░░░░░░░░░░░░░░░ 15ms   │
│ Order Service   ░░░░████████████░░ 80ms   │
│   DB Query      ░░░░░░███████░░░░░ 30ms   │
│   Cache         ░░░░░░█░░░░░░░░░░░ 5ms    │
│ Serialize       ░░░░░░░░░░░░░░░░█░ 5ms    │
└────────────────────────────────────────────┘
                                   Total: 120ms

Identifies: Order Service DB query is bottleneck</div>

                <h2>OpenTelemetry (OTel)</h2>
                <p>OpenTelemetry is the industry standard for observability. It provides vendor-neutral instrumentation for traces, metrics, and logs.</p>

                <div class="code-block">OpenTelemetry Architecture:

Application Code
       │
       │ Instrumentation (auto/manual)
       ▼
┌──────────────────┐
│ OTel SDK         │
│ (Traces, Metrics,│
│  Logs)           │
└────────┬─────────┘
         │ OTLP Protocol
         ▼
┌──────────────────┐
│ OTel Collector   │ ← Single agent for all signals
└────────┬─────────┘
    ┌────┼────┐
    ▼    ▼    ▼
 Jaeger Prometheus Loki
 (traces)(metrics) (logs)

Benefits:
• Vendor neutral (no lock-in)
• Single instrumentation
• Automatic context propagation
• Wide language support</div>

                <h2>Alerting</h2>
                <div class="code-block">Alert Design:
• Actionable: Someone can fix it
• Urgent: Needs attention now
• Not noisy: Avoid alert fatigue

Good Alert:
"Error rate > 1% for 5 minutes on Order Service"
→ Clear, actionable, time-bound

Bad Alert:
"CPU > 50%"
→ Not necessarily a problem

Alert Routing:
Critical → PagerDuty → On-call engineer
Warning → Slack → Team channel
Info → Dashboard only</div>

                <h2>Real-World: Netflix Observability</h2>
                <div class="code-block">Netflix Stack:
• Metrics: Atlas (time-series database)
• Logging: ELK stack at massive scale
• Tracing: Custom distributed tracing
• Visualization: Custom dashboards

Scale:
• 2+ billion metrics per minute
• Petabytes of log data
• Traces across 1000+ microservices

Key Practice:
Every request gets a unique ID propagated
through all services for end-to-end tracing</div>

                <h2>Summary</h2>
                <p>Observability combines metrics (what), logs (why), and traces (where) to understand distributed systems. OpenTelemetry is the standard for vendor-neutral instrumentation. Use RED method for services, USE method for resources. Centralize logs, correlate with trace IDs, and design actionable alerts.</p>
            `,
            interviews: [
                {
                    question: "What are the three pillars of observability?",
                    answer: "Metrics (numerical measurements over time - what's happening), Logs (discrete events with context - why it happened), Traces (request flow through services - where it happened). Together they provide complete system visibility. OpenTelemetry unifies all three with vendor-neutral instrumentation."
                },
                {
                    question: "Explain distributed tracing and why it's important.",
                    answer: "Distributed tracing follows a request's path through microservices. Each service adds a span (operation) to the trace. Context propagation passes trace ID via headers. Important because: identifies latency bottlenecks, shows service dependencies, helps debug failures across services. Tools: Jaeger, Zipkin, OpenTelemetry."
                },
                {
                    question: "What is OpenTelemetry and why use it?",
                    answer: "OpenTelemetry is the industry standard for observability instrumentation. Benefits: 1) Vendor neutral - switch backends without code changes, 2) Unified instrumentation for traces, metrics, logs, 3) Automatic context propagation, 4) Wide language support. OTel Collector receives data and exports to various backends (Jaeger, Prometheus, etc.)."
                },
                {
                    question: "Explain the RED and USE methods for monitoring.",
                    answer: "RED method (for services): Rate (requests/sec), Errors (failures/sec), Duration (latency). Answers 'is the service healthy?' USE method (for resources): Utilization (% busy), Saturation (queue depth), Errors. Answers 'is the resource constrained?' Use both for complete picture."
                },
                {
                    question: "How do you correlate logs with traces?",
                    answer: "Include trace_id and span_id in log entries. When investigating a trace, query logs with that trace_id. Structured logging (JSON) makes this easy. Example: {level: 'ERROR', trace_id: 'abc123', message: '...'}. Tools like Grafana can link from trace span directly to related logs."
                }
            ]
        },
        {
            id: 'security-best-practices',
            title: 'Security Best Practices in System Design',
            duration: '50 min',
            content: `
                <h2>Security by Design</h2>
                <p>Security should be built into your system from the start, not bolted on later. The OWASP (Open Web Application Security Project) provides frameworks and guidelines for secure system design.</p>

                <div class="code-block">Security Principles:

1. Defense in Depth
   Multiple layers of security
   If one fails, others protect

2. Least Privilege
   Give minimum access needed
   Reduce blast radius of breach

3. Fail Secure
   Default to deny on errors
   Don't expose internals in errors

4. Zero Trust
   Never trust, always verify
   Authenticate every request</div>

                <h2>Authentication</h2>
                <p>Authentication verifies WHO you are. Get it wrong, and attackers can impersonate legitimate users.</p>

                <h3>Authentication Methods</h3>
                <div class="code-block">1. Username/Password
   • Most common, least secure alone
   • Always hash passwords (bcrypt, Argon2)
   • Never store plain text!

2. Multi-Factor Authentication (MFA)
   Something you know (password)
   + Something you have (phone, token)
   + Something you are (biometric)

3. OAuth 2.0 / OpenID Connect
   • Delegate auth to trusted provider
   • User logs in with Google/GitHub
   • Your app gets tokens, not passwords

4. API Keys
   • For service-to-service auth
   • Include in header, not URL
   • Rotate regularly</div>

                <h3>Password Security</h3>
                <div class="code-block">Password Storage:

WRONG:
password = "hunter2"
stored = password  // Plain text!

WRONG:
stored = md5(password)  // Fast hash, crackable

WRONG:
stored = sha256(password)  // No salt, rainbow tables

RIGHT:
stored = bcrypt(password, cost=12)
// Slow hash + salt + cost factor

// Or better:
stored = argon2id(password, memory=64MB, iterations=3)

Verification:
if bcrypt.verify(input, stored):
    login_success()
else:
    login_failed()  // Generic error, no hints</div>

                <h3>JWT (JSON Web Tokens)</h3>
                <div class="code-block">JWT Structure:
header.payload.signature

{
  "alg": "RS256",    // Algorithm
  "typ": "JWT"
}
.
{
  "sub": "user123",   // Subject (user ID)
  "exp": 1704067200,  // Expiration
  "iat": 1704063600,  // Issued at
  "roles": ["admin"]  // Custom claims
}
.
[signature]

Best Practices:
• Use RS256 (asymmetric) over HS256
• Short expiration (15 min)
• Include only necessary claims
• Validate: signature, exp, iss, aud
• Store in httpOnly cookies, not localStorage</div>

                <h2>Authorization</h2>
                <p>Authorization determines WHAT you can access. Broken access control is #1 on OWASP Top 10.</p>

                <h3>Authorization Models</h3>
                <div class="code-block">1. Role-Based Access Control (RBAC)
   Users have roles, roles have permissions

   User: Alice
   Role: Editor
   Permissions: read, write, publish

   Simple, but can explode in complexity

2. Attribute-Based Access Control (ABAC)
   Policies based on attributes

   Policy: "Allow if user.department == resource.department
            AND time.hour >= 9 AND time.hour <= 17"

   Flexible, but complex to manage

3. Relationship-Based (ReBAC)
   Access based on relationships

   "Allow if user is owner of document"
   "Allow if user is member of team that owns project"

   Used by: Google Zanzibar, Authzed</div>

                <h3>Common Authorization Flaws</h3>
                <div class="code-block">1. Insecure Direct Object Reference (IDOR)
   BAD: GET /api/invoices/123
   → User can guess IDs and access others' data

   FIX: Always check ownership
   if invoice.owner_id != current_user.id:
       return 403 Forbidden

2. Missing Function-Level Access Control
   BAD: Admin endpoint /api/admin/users
   → No check if user is admin

   FIX: Check permissions on every endpoint
   @require_role("admin")
   def admin_users():
       ...

3. Privilege Escalation
   BAD: User can modify their own role
   PUT /api/users/123 { "role": "admin" }

   FIX: Separate endpoints, strict validation
   Only admins can modify roles</div>

                <h2>API Security</h2>

                <h3>HTTPS Everywhere</h3>
                <div class="code-block">• All traffic over TLS 1.3
• No HTTP, redirect to HTTPS
• HSTS header: Strict-Transport-Security
• Certificate pinning for mobile apps</div>

                <h3>Rate Limiting</h3>
                <div class="code-block">Prevent abuse:
• Login attempts: 5 per minute per IP
• API calls: 1000 per hour per user
• Expensive operations: Strict limits

Response:
HTTP 429 Too Many Requests
Retry-After: 60</div>

                <h3>Input Validation</h3>
                <div class="code-block">Never trust client input!

SQL Injection:
BAD: query = "SELECT * FROM users WHERE id = " + user_input
     user_input = "1; DROP TABLE users;"

FIX: Use parameterized queries
     query = "SELECT * FROM users WHERE id = ?"
     execute(query, [user_input])

XSS (Cross-Site Scripting):
BAD: <div>Welcome, {user_name}</div>
     user_name = "<script>steal_cookies()</script>"

FIX: Escape output
     <div>Welcome, {escape(user_name)}</div>

Validate:
• Type (string, number)
• Length (max 255 chars)
• Format (email regex)
• Allowed values (enum)</div>

                <h2>Data Security</h2>

                <h3>Encryption</h3>
                <div class="code-block">At Rest:
• Encrypt sensitive data in database
• Use AES-256-GCM
• Manage keys securely (AWS KMS, HashiCorp Vault)

In Transit:
• TLS 1.3 for all connections
• mTLS for service-to-service

Key Management:
• Never hardcode keys in code
• Rotate keys regularly
• Use secrets manager
• Principle of least privilege for key access</div>

                <h3>Secrets Management</h3>
                <div class="code-block">BAD:
database_password = "hunter2"  // In code!
AWS_SECRET_KEY = "abc123"     // In environment

GOOD:
Use secrets manager:
• HashiCorp Vault
• AWS Secrets Manager
• Azure Key Vault
• Kubernetes Secrets (encrypted)

secret = vault.read("database/password")

Features:
• Audit access
• Automatic rotation
• Access policies
• Encryption at rest</div>

                <h2>OWASP Top 10 (2025)</h2>
                <div class="code-block">Most Critical Web Security Risks:

1. Broken Access Control
   → Enforce authorization everywhere

2. Cryptographic Failures
   → Use strong encryption, manage keys

3. Injection (SQL, NoSQL, Command)
   → Parameterized queries, input validation

4. Security Misconfiguration
   → Secure defaults, remove unused features

5. Vulnerable Components
   → Keep dependencies updated, scan for CVEs

6. Insecure Design
   → Threat modeling, security requirements

7. Software Supply Chain
   → Verify dependencies, sign releases

8. Identification & Auth Failures
   → MFA, secure session management

9. Security Logging Failures
   → Log security events, monitor anomalies

10. Server-Side Request Forgery (SSRF)
    → Validate URLs, allowlist destinations</div>

                <h2>Zero Trust Architecture</h2>
                <div class="code-block">Traditional: Trust internal network
"Castle and moat" - once inside, trusted

Zero Trust: Never trust, always verify
┌─────────────────────────────────────────┐
│         Every Request Verified          │
│                                         │
│  ┌─────────┐                           │
│  │ Service │                           │
│  │    A    │ ←─── Who are you?         │
│  └────┬────┘      What do you need?    │
│       │           Is this normal?       │
│       │                                 │
│  ┌────▼────┐                           │
│  │ Service │ ←─── Verify again!        │
│  │    B    │                           │
│  └─────────┘                           │
└─────────────────────────────────────────┘

Principles:
• Verify explicitly (authn + authz always)
• Least privilege access
• Assume breach (minimize blast radius)
• Encrypt everything
• Log everything</div>

                <h2>Summary</h2>
                <p>Security must be designed in from the start. Key practices: defense in depth, least privilege, fail secure, zero trust. Authentication (who) via OAuth/OIDC with MFA. Authorization (what) via RBAC/ABAC with ownership checks. Protect APIs with HTTPS, rate limiting, input validation. Encrypt data at rest and in transit. Follow OWASP Top 10 guidelines.</p>
            `,
            interviews: [
                {
                    question: "Explain the difference between authentication and authorization.",
                    answer: "Authentication verifies WHO you are (identity) - login with username/password, OAuth, MFA. Authorization determines WHAT you can access (permissions) - can this user read this resource? Authentication happens first, then authorization. Both must be enforced on every request."
                },
                {
                    question: "What is Zero Trust architecture?",
                    answer: "Zero Trust: 'Never trust, always verify.' Unlike traditional 'castle and moat' (trust internal network), Zero Trust verifies every request regardless of source. Principles: verify explicitly (always authn/authz), least privilege, assume breach, encrypt everything. Implemented with: identity verification, micro-segmentation, continuous monitoring."
                },
                {
                    question: "How should passwords be stored securely?",
                    answer: "Never plain text or fast hashes (MD5, SHA). Use: bcrypt (cost factor 12+), Argon2id (memory-hard), or scrypt. These are slow (prevent brute force) and include salt (prevent rainbow tables). Verification: hash input and compare to stored hash. Never reveal if username or password was wrong."
                },
                {
                    question: "What is SQL injection and how do you prevent it?",
                    answer: "SQL injection: attacker inserts SQL code in input that gets executed. Example: input '1; DROP TABLE users' in user_id field. Prevention: 1) Parameterized queries (placeholders, not concatenation), 2) ORM usage, 3) Input validation, 4) Least privilege DB accounts. Never build SQL strings with user input."
                },
                {
                    question: "What are the key items in OWASP Top 10?",
                    answer: "Top risks: 1) Broken Access Control - enforce authz everywhere, 2) Cryptographic Failures - strong encryption, 3) Injection - parameterized queries, 4) Security Misconfiguration - secure defaults, 5) Vulnerable Components - update dependencies. Also: Insecure Design, Auth Failures, Logging Failures, SSRF. Use as checklist for security review."
                }
            ]
        }
    ]
};
