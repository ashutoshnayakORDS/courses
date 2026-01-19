// Module 7: APIs & Communication
// Contains: REST API Design, GraphQL vs REST vs gRPC, API Gateway and Rate Limiting

const module7APIs = {
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

                <div class="code-block">Bad (inconsistent):
GET /user/123
GET /orders

Good (consistent):
GET /users/123
GET /orders</div>

                <h3>Nest Resources Logically</h3>
                <p>Use nesting to show relationships, but don't go too deep (max 2-3 levels).</p>

                <div class="code-block">Good nesting:
GET /users/123/orders          ← Orders for user 123
GET /users/123/orders/456      ← Order 456 for user 123

Too deep (avoid):
GET /users/123/orders/456/items/789/reviews
Better: GET /order-items/789/reviews</div>

                <h2>HTTP Methods</h2>
                <p>Use HTTP methods correctly - they have specific meanings:</p>

                <table class="table">
                    <tr>
                        <th>Method</th>
                        <th>Purpose</th>
                        <th>Idempotent?</th>
                        <th>Safe?</th>
                    </tr>
                    <tr>
                        <td>GET</td>
                        <td>Retrieve resource(s)</td>
                        <td>Yes</td>
                        <td>Yes</td>
                    </tr>
                    <tr>
                        <td>POST</td>
                        <td>Create a new resource</td>
                        <td>No</td>
                        <td>No</td>
                    </tr>
                    <tr>
                        <td>PUT</td>
                        <td>Replace entire resource</td>
                        <td>Yes</td>
                        <td>No</td>
                    </tr>
                    <tr>
                        <td>PATCH</td>
                        <td>Partial update</td>
                        <td>No*</td>
                        <td>No</td>
                    </tr>
                    <tr>
                        <td>DELETE</td>
                        <td>Remove resource</td>
                        <td>Yes</td>
                        <td>No</td>
                    </tr>
                </table>

                <p><strong>Idempotent:</strong> Multiple identical requests have the same effect as one request.</p>
                <p><strong>Safe:</strong> The request doesn't modify server state.</p>

                <h2>HTTP Status Codes</h2>
                <p>Use appropriate status codes to communicate results clearly:</p>

                <div class="code-block">2xx Success:
200 OK              - Request succeeded
201 Created         - Resource created (POST)
204 No Content      - Success, no body (DELETE)

3xx Redirection:
301 Moved Permanently
304 Not Modified    - Cached response is valid

4xx Client Error:
400 Bad Request     - Invalid syntax/parameters
401 Unauthorized    - Authentication required
403 Forbidden       - Authenticated but not authorized
404 Not Found       - Resource doesn't exist
409 Conflict        - Resource conflict (duplicate)
422 Unprocessable   - Validation failed
429 Too Many Requests - Rate limit exceeded

5xx Server Error:
500 Internal Error  - Generic server error
502 Bad Gateway     - Upstream server error
503 Service Unavailable - Server overloaded</div>

                <h2>API Versioning</h2>
                <p>Always version your API from day one. Breaking changes without versioning will anger every consumer you have.</p>

                <h3>Versioning Strategies</h3>

                <div class="code-block">1. URL Path Versioning (Most Common):
GET /v1/users
GET /v2/users

Pros: Clear, visible in every request
Cons: Changes URL structure

2. Query Parameter:
GET /users?version=1

Pros: Keeps URL clean
Cons: Easy to forget, less visible

3. Header Versioning:
GET /users
Header: API-Version: 2024-01-15

Pros: URL stays clean
Cons: Hidden, harder to test

4. Stripe's Approach (Hybrid):
URL: /v1/users (major version)
Header: Stripe-Version: 2024-01-15 (date-based sub-version)

Pros: Best of both worlds
Cons: More complex to implement</div>

                <h3>When to Version</h3>
                <p>Create a new version for breaking changes:</p>
                <ul style="margin: 1rem 0; margin-left: 2rem;">
                    <li>Removing fields or endpoints</li>
                    <li>Changing field types (string → integer)</li>
                    <li>Changing authentication methods</li>
                    <li>Renaming fields</li>
                </ul>
                <p>Non-breaking changes usually don't need a new version:</p>
                <ul style="margin: 1rem 0; margin-left: 2rem;">
                    <li>Adding new fields (existing clients ignore them)</li>
                    <li>Adding new endpoints</li>
                    <li>Adding new optional parameters</li>
                </ul>

                <h2>Pagination</h2>
                <p>Never return unbounded lists. Always paginate collections.</p>

                <h3>Offset-Based Pagination</h3>
                <div class="code-block">GET /users?limit=25&offset=50

Response:
{
  "data": [...],
  "pagination": {
    "total": 1000,
    "limit": 25,
    "offset": 50,
    "has_more": true
  }
}

Pros: Simple, allows jumping to any page
Cons: Inconsistent with real-time data, slow for large offsets</div>

                <h3>Cursor-Based Pagination</h3>
                <div class="code-block">GET /users?limit=25&cursor=eyJpZCI6MTIzfQ==

Response:
{
  "data": [...],
  "pagination": {
    "next_cursor": "eyJpZCI6MTQ4fQ==",
    "has_more": true
  }
}

Pros: Consistent, performant at any position
Cons: Can't jump to specific page
Used by: Twitter, Facebook, Slack</div>

                <h2>Error Handling</h2>
                <p>Provide clear, actionable error messages:</p>

                <div class="code-block">Bad Error Response:
{
  "error": "Something went wrong"
}

Good Error Response:
{
  "error": {
    "code": "validation_error",
    "message": "Invalid request parameters",
    "details": [
      {
        "field": "email",
        "code": "invalid_format",
        "message": "Email must be a valid email address"
      },
      {
        "field": "age",
        "code": "out_of_range",
        "message": "Age must be between 0 and 150"
      }
    ],
    "request_id": "req_abc123",
    "documentation_url": "https://api.example.com/docs/errors"
  }
}</div>

                <h2>Idempotency</h2>
                <p>Idempotency means multiple identical requests have the same effect as a single request. This is crucial for handling network failures and retries safely.</p>

                <h3>Stripe's Idempotency Keys</h3>
                <p>Stripe pioneered the idempotency key pattern for POST requests:</p>

                <div class="code-block">POST /v1/charges
Idempotency-Key: ord_12345_charge_attempt_1
{
  "amount": 2000,
  "currency": "usd"
}

How it works:
1. Client generates unique key (UUID or derived from order ID)
2. Server stores key + response for first request
3. If same key is sent again, return stored response
4. Keys expire after 24 hours

Benefits:
• Safe retries after network failures
• Prevents double charges
• Client can retry without fear</div>

                <h3>Natural Idempotency</h3>
                <div class="code-block">Naturally idempotent operations:
• GET /users/123        - Always returns same user
• PUT /users/123        - Sets to same state
• DELETE /users/123     - Already deleted = still deleted

Operations needing idempotency keys:
• POST /charges         - Could create duplicate charges
• POST /orders          - Could create duplicate orders
• POST /emails/send     - Could send duplicate emails</div>

                <h2>Real-World Case Study: Stripe API</h2>
                <p>Stripe is widely considered the gold standard for API design:</p>

                <div class="code-block">Stripe API Design Principles:

1. Versioning from Day One
   - Maintained compatibility since 2011
   - URL version (v1) + date-based sub-versions
   - Header: Stripe-Version: 2024-01-15

2. Idempotency Built-in
   - All POST requests accept Idempotency-Key
   - Keys valid for 24 hours
   - Prevents double charges

3. Consistent Error Format
   {
     "error": {
       "type": "card_error",
       "code": "card_declined",
       "message": "Your card was declined",
       "param": "card_number"
     }
   }

4. Expandable Objects
   GET /charges/ch_123?expand[]=customer
   Returns charge with full customer object embedded

5. Excellent Documentation
   - Interactive examples
   - Code samples in multiple languages
   - Webhook testing tools</div>

                <h2>Security Best Practices</h2>

                <h3>Always Use HTTPS</h3>
                <p>Never transmit sensitive data over unencrypted connections.</p>

                <h3>Authentication</h3>
                <div class="code-block">Common patterns:
1. API Keys (simple, for server-to-server)
   Header: Authorization: Bearer sk_live_abc123

2. OAuth 2.0 (for user authorization)
   Header: Authorization: Bearer user_access_token

3. JWT (stateless, self-contained)
   Header: Authorization: Bearer eyJhbGciOiJIUzI1...

Best practices:
• Use short-lived tokens
• Implement token refresh
• Never expose secrets in URLs or logs</div>

                <h3>Input Validation</h3>
                <p>Validate all input on the server side. Never trust client data.</p>

                <h2>Summary</h2>
                <p>Great REST API design is about consistency, clarity, and developer experience. Use nouns for URLs, appropriate HTTP methods and status codes, version from day one, implement pagination, provide clear errors, and design for idempotency. Study APIs like Stripe, Twilio, and GitHub for inspiration.</p>
            `,
            interviews: [
                {
                    question: "What makes a good REST API design?",
                    answer: "Good REST API design includes: 1) Resource-based URLs using nouns not verbs (/users not /getUsers), 2) Correct HTTP methods (GET for read, POST for create, etc.), 3) Appropriate status codes (200, 201, 400, 404, etc.), 4) Versioning from day one, 5) Pagination for collections, 6) Clear error messages with codes and details, 7) Idempotency support for safe retries, 8) Consistent naming conventions."
                },
                {
                    question: "Explain idempotency and why it matters for APIs.",
                    answer: "Idempotency means multiple identical requests have the same effect as one request. It matters because: 1) Network failures happen - clients need to retry safely, 2) Prevents duplicate operations (double charges, duplicate orders), 3) GET, PUT, DELETE are naturally idempotent, 4) POST needs idempotency keys - unique IDs sent with request, server stores result and returns same response for duplicate keys. Stripe uses 24-hour idempotency keys for all POST requests."
                },
                {
                    question: "What are the different API versioning strategies?",
                    answer: "1) URL path (/v1/users) - most visible, easy to route. 2) Query parameter (?version=1) - keeps URL clean but easy to forget. 3) Header (API-Version: 2) - cleanest URLs but hidden. 4) Stripe's hybrid - URL for major version, header for date-based sub-versions. Create new versions for breaking changes (removed fields, type changes). Additive changes (new fields) don't need new versions."
                },
                {
                    question: "Compare offset-based vs cursor-based pagination.",
                    answer: "Offset-based (?limit=25&offset=50): Simple, allows jumping to any page, but slow for large offsets and inconsistent with real-time data (items can shift between pages). Cursor-based (?cursor=abc123): Uses pointer to last item, consistent results, performant at any position, but can't jump to specific pages. Cursor-based preferred for real-time feeds (Twitter, Facebook). Offset works for static data."
                },
                {
                    question: "How should API errors be structured?",
                    answer: "Good error responses include: 1) HTTP status code (400, 401, 404, etc.), 2) Error code (machine-readable like 'validation_error'), 3) Human-readable message, 4) Field-specific details for validation errors, 5) Request ID for debugging, 6) Documentation URL. Example: { error: { code: 'card_declined', message: 'Your card was declined', param: 'card_number', request_id: 'req_123' } }. Stripe's error format is the gold standard."
                }
            ]
        },
        {
            id: 'graphql-rest-grpc',
            title: 'GraphQL vs REST vs gRPC',
            duration: '55 min',
            content: `
                <h2>The API Landscape</h2>
                <p>In 2025, most systems use a hybrid approach: REST for simplicity, GraphQL for frontend flexibility, and gRPC for high-performance microservices. Understanding when to use each is crucial for system design.</p>

                <div class="code-block">API Technology Timeline:
2000: REST emerges (Roy Fielding's thesis)
2008: gRPC predecessor (Protocol Buffers released)
2015: GraphQL open-sourced by Facebook
2025: Hybrid stacks are the norm

Who uses what:
• Netflix: gRPC for streaming, GraphQL for recommendations, REST for accounts
• Uber: REST for drivers, gRPC for location, GraphQL for rider apps
• Airbnb: GraphQL for mobile apps, REST for partners
• Slack: GraphQL for web client, gRPC internally</div>

                <h2>REST (Representational State Transfer)</h2>

                <h3>How It Works</h3>
                <p>REST uses HTTP methods on resource URLs. Each endpoint returns a fixed data structure.</p>

                <div class="code-block">REST Example:

GET /users/123
Response:
{
  "id": 123,
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2024-01-15",
  "orders_count": 42
}

GET /users/123/orders
Response:
{
  "orders": [
    {"id": 1, "total": 99.99, "status": "delivered"},
    {"id": 2, "total": 149.99, "status": "shipped"}
  ]
}

To get user with orders: 2 requests needed</div>

                <h3>Strengths</h3>
                <ul style="margin: 1rem 0; margin-left: 2rem;">
                    <li><strong>Simple and well-understood:</strong> HTTP-based, easy to debug</li>
                    <li><strong>Cacheable:</strong> HTTP caching works out of the box</li>
                    <li><strong>Huge ecosystem:</strong> Tools, libraries, documentation</li>
                    <li><strong>Stateless:</strong> Each request is independent</li>
                </ul>

                <h3>Weaknesses</h3>
                <ul style="margin: 1rem 0; margin-left: 2rem;">
                    <li><strong>Over-fetching:</strong> Get more data than needed</li>
                    <li><strong>Under-fetching:</strong> Need multiple requests for related data</li>
                    <li><strong>Fixed response structure:</strong> Can't customize per client</li>
                    <li><strong>Versioning complexity:</strong> Breaking changes require new versions</li>
                </ul>

                <h2>GraphQL</h2>

                <h3>How It Works</h3>
                <p>GraphQL provides a single endpoint where clients specify exactly what data they need using a query language.</p>

                <div class="code-block">GraphQL Example:

POST /graphql
{
  query: \`
    query {
      user(id: 123) {
        name
        email
        orders(limit: 5) {
          id
          total
          status
        }
      }
    }
  \`
}

Response:
{
  "data": {
    "user": {
      "name": "John Doe",
      "email": "john@example.com",
      "orders": [
        {"id": 1, "total": 99.99, "status": "delivered"},
        {"id": 2, "total": 149.99, "status": "shipped"}
      ]
    }
  }
}

User + orders in ONE request, only requested fields!</div>

                <h3>Strengths</h3>
                <ul style="margin: 1rem 0; margin-left: 2rem;">
                    <li><strong>No over-fetching:</strong> Get exactly what you need</li>
                    <li><strong>Single request:</strong> Fetch related data in one query</li>
                    <li><strong>Strongly typed:</strong> Schema defines all types</li>
                    <li><strong>Introspection:</strong> API is self-documenting</li>
                    <li><strong>Frontend flexibility:</strong> Different clients can request different data</li>
                </ul>

                <h3>Weaknesses</h3>
                <ul style="margin: 1rem 0; margin-left: 2rem;">
                    <li><strong>Complexity:</strong> More complex to implement than REST</li>
                    <li><strong>Caching harder:</strong> POST requests, dynamic queries</li>
                    <li><strong>N+1 problem:</strong> Naive resolvers can cause performance issues</li>
                    <li><strong>Higher server cost:</strong> Query parsing adds 25-35% CPU overhead</li>
                </ul>

                <h2>gRPC (Google Remote Procedure Call)</h2>

                <h3>How It Works</h3>
                <p>gRPC uses Protocol Buffers (binary format) over HTTP/2 for high-performance RPC calls. You define services in .proto files, and code is generated for multiple languages.</p>

                <div class="code-block">gRPC Example:

// user.proto - Define the service
syntax = "proto3";

service UserService {
  rpc GetUser(UserRequest) returns (User);
  rpc ListOrders(OrdersRequest) returns (stream Order);
}

message UserRequest {
  int32 id = 1;
}

message User {
  int32 id = 1;
  string name = 2;
  string email = 3;
}

// Generated client code (Python)
user = stub.GetUser(UserRequest(id=123))
print(user.name)  # "John Doe"

// Streaming example - get orders as they're ready
for order in stub.ListOrders(OrdersRequest(user_id=123)):
    print(order.total)</div>

                <h3>Strengths</h3>
                <ul style="margin: 1rem 0; margin-left: 2rem;">
                    <li><strong>Extremely fast:</strong> Binary format, 67% faster than REST</li>
                    <li><strong>HTTP/2:</strong> Multiplexing, streaming, header compression</li>
                    <li><strong>Strongly typed:</strong> Code generation from proto files</li>
                    <li><strong>Bi-directional streaming:</strong> Real-time data</li>
                    <li><strong>Efficient:</strong> 30-40% less bandwidth than JSON</li>
                </ul>

                <h3>Weaknesses</h3>
                <ul style="margin: 1rem 0; margin-left: 2rem;">
                    <li><strong>Not browser-friendly:</strong> Needs gRPC-web or proxy</li>
                    <li><strong>Learning curve:</strong> Proto files, code generation</li>
                    <li><strong>Debugging harder:</strong> Binary format not human-readable</li>
                    <li><strong>Setup complexity:</strong> 15-20% higher initial costs</li>
                </ul>

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
                        <td>250ms avg</td>
                        <td>180ms (complex)</td>
                        <td>25ms</td>
                    </tr>
                    <tr>
                        <td>Throughput</td>
                        <td>20K req/sec</td>
                        <td>15K queries/sec</td>
                        <td>50K req/sec</td>
                    </tr>
                    <tr>
                        <td>Payload Size</td>
                        <td>Large (JSON)</td>
                        <td>Medium (custom)</td>
                        <td>Small (binary)</td>
                    </tr>
                    <tr>
                        <td>Bandwidth</td>
                        <td>Baseline</td>
                        <td>-60% (no over-fetch)</td>
                        <td>-40% (binary)</td>
                    </tr>
                </table>

                <div class="code-block">Real benchmarks:
• gRPC: 10x lower latency than REST for microservices
• Google internal: gRPC reduced latency from 200μs to 5μs (40x)
• GraphQL: Reduced mobile API calls by 60% at Airbnb
• Netflix: REST caching reduced latency from 200ms to 15ms</div>

                <h2>When to Use Each</h2>

                <h3>Use REST When:</h3>
                <ul style="margin: 1rem 0; margin-left: 2rem;">
                    <li>Building simple CRUD APIs</li>
                    <li>You need easy caching (HTTP cache headers)</li>
                    <li>API consumers are diverse (mobile, web, partners)</li>
                    <li>You want simplicity and wide tool support</li>
                    <li>Building public APIs (easier to understand)</li>
                </ul>

                <h3>Use GraphQL When:</h3>
                <ul style="margin: 1rem 0; margin-left: 2rem;">
                    <li>Frontend needs flexibility in data fetching</li>
                    <li>Multiple clients need different data shapes</li>
                    <li>Reducing mobile bandwidth is critical</li>
                    <li>You have complex, interconnected data</li>
                    <li>Rapid frontend iteration is needed</li>
                </ul>

                <h3>Use gRPC When:</h3>
                <ul style="margin: 1rem 0; margin-left: 2rem;">
                    <li>Microservice-to-microservice communication</li>
                    <li>Low latency is critical (trading, gaming)</li>
                    <li>Real-time streaming is needed</li>
                    <li>High throughput is required</li>
                    <li>You control both client and server</li>
                </ul>

                <h2>Real-World Architecture: Netflix</h2>

                <div class="code-block">Netflix's Hybrid API Stack:

┌─────────────────────────────────────────────────────┐
│                    Client Apps                       │
│     (iOS, Android, TV, Web, PlayStation, etc.)      │
└─────────────────────────────────────────────────────┘
                        │
         ┌──────────────┼──────────────┐
         ▼              ▼              ▼
    ┌─────────┐   ┌──────────┐   ┌─────────┐
    │  REST   │   │ GraphQL  │   │  gRPC   │
    │(Account)│   │ (Recs)   │   │(Stream) │
    └─────────┘   └──────────┘   └─────────┘
         │              │              │
         └──────────────┼──────────────┘
                        ▼
    ┌─────────────────────────────────────────────────┐
    │              Internal Microservices              │
    │                  (gRPC everywhere)               │
    └─────────────────────────────────────────────────┘

Why this mix?
• REST for accounts: Simple CRUD, easy caching
• GraphQL for recommendations: Complex nested data
• gRPC for streaming: Low latency, real-time
• gRPC internally: Fast service-to-service calls</div>

                <h2>Real-World Architecture: Uber</h2>

                <div class="code-block">Uber's API Architecture:

Driver App (REST):
• Simple requests (accept ride, update location)
• Works on low-end devices
• Easy to cache and offline support

Rider App (GraphQL):
• Complex data needs (nearby drivers, surge pricing, ETA)
• Different screens need different data
• Reduces API calls on mobile

Location Services (gRPC):
• Millions of location updates per second
• Sub-millisecond latency required
• Bi-directional streaming for real-time updates

Internal Services (gRPC):
• 2,200+ microservices
• High-throughput communication
• Strongly typed contracts</div>

                <h2>Migration Considerations</h2>

                <div class="code-block">REST → GraphQL Migration:
1. Start with GraphQL layer on top of REST
2. Gradually move resolvers to direct data access
3. Keep REST for simple endpoints
4. Use GraphQL for complex data aggregation

REST → gRPC Migration:
1. Define proto files matching REST contracts
2. Implement gRPC alongside REST
3. Route internal calls to gRPC
4. Keep REST for external/browser clients

Cost at Scale:
• REST: Baseline infrastructure cost
• GraphQL: +25-35% server cost (query parsing)
• gRPC: +15-20% setup cost, -30-40% bandwidth at scale
• Break-even for gRPC: ~10M requests/month</div>

                <h2>Summary</h2>
                <p>There's no "best" API technology - each has its place. REST excels at simplicity and caching. GraphQL shines for complex, flexible data fetching. gRPC dominates high-performance microservices. Most modern systems use all three: REST for public APIs, GraphQL for frontend flexibility, and gRPC for internal services.</p>
            `,
            interviews: [
                {
                    question: "When would you choose GraphQL over REST?",
                    answer: "Choose GraphQL when: 1) Frontend needs flexibility - different clients need different data shapes, 2) Reducing over-fetching matters - mobile bandwidth concerns, 3) Complex interconnected data - nested relationships, 4) Rapid iteration needed - frontend can change queries without backend changes. REST is better for simple CRUD, public APIs, and when HTTP caching is important. GraphQL adds ~25-35% server overhead but can reduce mobile API calls by 60%."
                },
                {
                    question: "Why would you use gRPC instead of REST for microservices?",
                    answer: "gRPC advantages for microservices: 1) 10x lower latency (binary Protocol Buffers vs JSON), 2) HTTP/2 multiplexing and streaming, 3) Strongly typed contracts via proto files, 4) 30-40% less bandwidth, 5) Code generation for multiple languages. Google saw 40x latency reduction (200μs to 5μs). Use REST when you need browser support, simple debugging, or HTTP caching. gRPC setup costs ~15-20% more initially but saves at scale."
                },
                {
                    question: "How does Netflix use different API technologies?",
                    answer: "Netflix uses a hybrid stack: 1) REST for account management - simple CRUD, easy caching, 2) GraphQL for recommendations - complex nested data, different clients need different fields, 3) gRPC for video streaming - low latency, real-time requirements, 4) gRPC internally for all microservice communication - fast service-to-service calls. This approach lets them optimize each use case: REST caching reduced latency from 200ms to 15ms for account data."
                },
                {
                    question: "What are the main challenges of each API technology?",
                    answer: "REST: Over-fetching (get more than needed), under-fetching (multiple requests), rigid response structure. GraphQL: N+1 query problem (naive resolvers), harder caching (POST, dynamic queries), 25-35% higher server costs. gRPC: Not browser-friendly (needs gRPC-web), binary format harder to debug, steeper learning curve (proto files, code generation), 15-20% higher initial setup costs."
                },
                {
                    question: "How would you design an API strategy for a new startup vs a large enterprise?",
                    answer: "Startup: Start with REST - simple, well-understood, fast to build, huge ecosystem. Add GraphQL when frontend complexity grows or mobile bandwidth matters. Consider gRPC only when you have clear performance requirements. Enterprise: Likely need all three - REST for public/partner APIs, GraphQL for frontend teams, gRPC for internal microservices. Key is clear boundaries: which technology for which use case, with API gateway to unify access."
                }
            ]
        },
        {
            id: 'api-gateway-rate-limiting',
            title: 'API Gateway and Rate Limiting',
            duration: '50 min',
            content: `
                <h2>What is an API Gateway?</h2>
                <p>An API Gateway is a server that acts as the single entry point for all client requests to your backend services. It handles cross-cutting concerns like authentication, rate limiting, routing, and monitoring - so individual services don't have to.</p>

                <div class="code-block">Without API Gateway:
┌────────┐     ┌─────────────┐
│ Client │────►│ User Service│
├────────┤     ├─────────────┤
│ Client │────►│Order Service│
├────────┤     ├─────────────┤
│ Client │────►│ Payment Svc │
└────────┘     └─────────────┘

Problems:
• Each service handles auth, rate limiting
• Clients need to know all service URLs
• No centralized monitoring

With API Gateway:
┌────────┐     ┌─────────────┐     ┌─────────────┐
│ Client │────►│ API Gateway │────►│ User Service│
├────────┤     │             │     ├─────────────┤
│ Client │────►│ • Auth      │────►│Order Service│
├────────┤     │ • Rate Limit│     ├─────────────┤
│ Client │────►│ • Routing   │────►│ Payment Svc │
└────────┘     │ • Logging   │     └─────────────┘
               └─────────────┘

Benefits:
• Single entry point
• Centralized cross-cutting concerns
• Services focus on business logic</div>

                <h2>API Gateway Functions</h2>

                <h3>1. Request Routing</h3>
                <p>Route requests to appropriate backend services based on URL path, headers, or other criteria.</p>

                <div class="code-block">Routing Rules:
/api/users/*     → User Service
/api/orders/*    → Order Service
/api/payments/*  → Payment Service
/api/v2/*        → New API Version Services

Advanced routing:
• A/B testing: 10% traffic to new version
• Canary deployments: gradual rollout
• Blue-green: instant switch between versions</div>

                <h3>2. Authentication & Authorization</h3>
                <p>Validate tokens, API keys, and permissions before requests reach services.</p>

                <div class="code-block">Authentication Flow:
1. Client sends request with token
   Header: Authorization: Bearer eyJ...

2. Gateway validates token
   • Check signature
   • Verify expiration
   • Extract user info

3. Gateway adds user context to request
   Header: X-User-ID: 123
   Header: X-User-Role: admin

4. Forward to backend service
   Service trusts gateway's validation</div>

                <h3>3. Rate Limiting</h3>
                <p>Protect services from overload and ensure fair usage.</p>

                <h3>4. Request/Response Transformation</h3>
                <p>Modify requests and responses (add headers, transform formats, aggregate responses).</p>

                <h3>5. Monitoring & Logging</h3>
                <p>Centralized logging, metrics, and distributed tracing.</p>

                <h2>Rate Limiting Deep Dive</h2>
                <p>Rate limiting controls how many requests a client can make in a given time period. It protects your services from abuse, ensures fair usage, and prevents cascade failures.</p>

                <h3>Why Rate Limiting Matters</h3>
                <div class="code-block">Without rate limiting:
• One bad actor can overwhelm your service
• Accidental infinite loops crash everything
• No protection against DDoS attacks
• Resource starvation for legitimate users

With rate limiting:
• Fair usage across all clients
• Protection against abuse
• Predictable resource allocation
• Graceful degradation under load</div>

                <h3>Rate Limiting Algorithms</h3>

                <h4>1. Fixed Window</h4>
                <div class="code-block">Fixed Window Counter:
Time:   |------ Minute 1 ------|------ Minute 2 ------|
Limit:  100 requests per minute

Requests: ████████████░░░░░░░░░░████████████████░░░░░░
          (75 requests)         (100 requests - limit)

Problem: Boundary burst
End of minute 1: 100 requests
Start of minute 2: 100 requests
= 200 requests in 2 seconds!</div>

                <h4>2. Sliding Window Log</h4>
                <div class="code-block">Sliding Window Log:
Store timestamp of every request
Check: count requests in last 60 seconds

Time: ─────────────────────────────────────────►
Requests:  ●  ●●  ●●●    ●●●●●●    ●●●
           └────── 60 second window ─────┘

Pros: Accurate, no boundary burst
Cons: Memory intensive (store all timestamps)</div>

                <h4>3. Sliding Window Counter</h4>
                <div class="code-block">Sliding Window Counter:
Combine fixed window counts with weighted average

Previous window: 80 requests (40% weight)
Current window:  30 requests (60% weight)
Weighted count: 80*0.4 + 30*0.6 = 50 requests

Pros: Memory efficient, smooth limiting
Cons: Approximate (not exact count)</div>

                <h4>4. Token Bucket (Most Popular)</h4>
                <div class="code-block">Token Bucket Algorithm:
┌─────────────────────────┐
│ Bucket (capacity: 100)  │
│ ●●●●●●●●●●●●●●●●●●●●●●  │ ← Tokens
│ ●●●●●●●●●●●●●●●●●●●●●●  │
│ ●●●●●●●●●●●●●●●●●●●●●●  │
└─────────────────────────┘
       ↑              ↓
  Refill           Consume
(10 tokens/sec)  (1 per request)

Rules:
• Bucket has max capacity (100 tokens)
• Tokens added at fixed rate (10/sec)
• Each request consumes 1 token
• If no tokens, request rejected (429)

Benefits:
• Allows bursts up to bucket size
• Smooth rate over time
• Easy to implement
• Used by Amazon API Gateway</div>

                <h4>5. Leaky Bucket</h4>
                <div class="code-block">Leaky Bucket Algorithm:
         ┌─────────────┐
Requests │  Queue      │
   ─────►│ ● ● ● ● ●   │
         │ ● ● ●       │
         └─────┬───────┘
               │ Process at
               ▼ fixed rate
         ┌─────────────┐
         │   Server    │
         └─────────────┘

Rules:
• Requests enter queue
• Processed at fixed rate (leak)
• Queue overflow = request rejected

Difference from Token Bucket:
• Token: Controls rate + allows bursts
• Leaky: Strict fixed rate, smooths traffic</div>

                <h3>Algorithm Comparison</h3>
                <table class="table">
                    <tr>
                        <th>Algorithm</th>
                        <th>Burst Handling</th>
                        <th>Memory</th>
                        <th>Accuracy</th>
                        <th>Use Case</th>
                    </tr>
                    <tr>
                        <td>Fixed Window</td>
                        <td>Poor</td>
                        <td>Low</td>
                        <td>Low</td>
                        <td>Simple limits</td>
                    </tr>
                    <tr>
                        <td>Sliding Log</td>
                        <td>None</td>
                        <td>High</td>
                        <td>Exact</td>
                        <td>Strict limits</td>
                    </tr>
                    <tr>
                        <td>Sliding Counter</td>
                        <td>Minimal</td>
                        <td>Low</td>
                        <td>Good</td>
                        <td>General purpose</td>
                    </tr>
                    <tr>
                        <td>Token Bucket</td>
                        <td>Allows</td>
                        <td>Low</td>
                        <td>Good</td>
                        <td>APIs (most popular)</td>
                    </tr>
                    <tr>
                        <td>Leaky Bucket</td>
                        <td>None</td>
                        <td>Medium</td>
                        <td>Good</td>
                        <td>Traffic shaping</td>
                    </tr>
                </table>

                <h2>Distributed Rate Limiting</h2>
                <p>When your API runs on multiple servers, rate limiting becomes more complex. You need to synchronize counts across nodes.</p>

                <div class="code-block">Challenge: Multiple API Gateway nodes
┌─────────┐     ┌──────────┐
│ Client  │────►│ Gateway 1│  Count: 50
└─────────┘     └──────────┘
┌─────────┐     ┌──────────┐
│ Client  │────►│ Gateway 2│  Count: 50
└─────────┘     └──────────┘

Problem: Each node sees 50 requests
Reality: Total is 100 requests (over limit!)

Solution: Centralized Counter (Redis)
┌─────────┐     ┌──────────┐
│ Gateway │────►│          │
└─────────┘     │  Redis   │  Count: 100
┌─────────┐     │ (shared) │
│ Gateway │────►│          │
└─────────┘     └──────────┘

All nodes increment same counter</div>

                <div class="code-block">Redis Rate Limiting (Token Bucket):

-- Lua script for atomic operation
local key = KEYS[1]
local capacity = tonumber(ARGV[1])
local refill_rate = tonumber(ARGV[2])
local now = tonumber(ARGV[3])

local bucket = redis.call('HMGET', key, 'tokens', 'last_refill')
local tokens = tonumber(bucket[1]) or capacity
local last_refill = tonumber(bucket[2]) or now

-- Calculate new tokens
local elapsed = now - last_refill
local new_tokens = math.min(capacity, tokens + elapsed * refill_rate)

if new_tokens >= 1 then
    redis.call('HMSET', key, 'tokens', new_tokens - 1, 'last_refill', now)
    return 1  -- Allowed
else
    return 0  -- Rate limited
end</div>

                <h2>Rate Limiting Best Practices</h2>

                <h3>1. Tiered Limits</h3>
                <div class="code-block">Different limits for different users:
• Free tier:     100 requests/hour
• Basic tier:   1,000 requests/hour
• Pro tier:    10,000 requests/hour
• Enterprise: 100,000 requests/hour

Different limits for different endpoints:
• /api/search:  10 requests/second (expensive)
• /api/users:  100 requests/second (cheap)
• /api/health: unlimited (monitoring)</div>

                <h3>2. Communicate Limits Clearly</h3>
                <div class="code-block">Response Headers (Standard):
HTTP/1.1 200 OK
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1640000000

When limited:
HTTP/1.1 429 Too Many Requests
Retry-After: 30
{
  "error": "rate_limit_exceeded",
  "message": "Too many requests",
  "retry_after_seconds": 30
}</div>

                <h3>3. Graceful Degradation</h3>
                <div class="code-block">Instead of hard rejection:
• Return cached data
• Reduce response quality
• Queue requests for later
• Serve static fallback</div>

                <h2>Real-World Case Studies</h2>

                <h3>Netflix Zuul Gateway</h3>
                <div class="code-block">Netflix Zuul Features:
┌─────────────────────────────────────────┐
│              Zuul Gateway               │
│                                         │
│  Pre-filters:                           │
│  • Authentication                       │
│  • Rate limiting                        │
│  • Request logging                      │
│                                         │
│  Routing:                               │
│  • Dynamic routing rules                │
│  • Load balancing                       │
│  • Circuit breaker integration          │
│                                         │
│  Post-filters:                          │
│  • Response transformation              │
│  • Error handling                       │
│  • Metrics collection                   │
└─────────────────────────────────────────┘

Scale: Handles 50+ billion requests/day</div>

                <h3>Amazon API Gateway</h3>
                <div class="code-block">AWS API Gateway Throttling:
• Uses Token Bucket algorithm
• Account-level: 10,000 requests/second
• Per-method: Configurable burst and rate

Throttling Hierarchy:
1. AWS account limits (regional)
2. API-level limits
3. Stage-level limits
4. Method-level limits
5. Usage plan limits (per API key)

Example configuration:
{
  "throttle": {
    "burstLimit": 500,    // Max concurrent
    "rateLimit": 1000     // Requests/second
  }
}</div>

                <h2>Implementing Your Own Gateway</h2>

                <div class="code-block">Simple API Gateway (Node.js concept):

// Rate limiter middleware
const rateLimiter = async (req, res, next) => {
  const key = \`rate:\${req.ip}\`;
  const limit = 100;
  const window = 60; // seconds

  const current = await redis.incr(key);
  if (current === 1) {
    await redis.expire(key, window);
  }

  res.setHeader('X-RateLimit-Limit', limit);
  res.setHeader('X-RateLimit-Remaining', Math.max(0, limit - current));

  if (current > limit) {
    return res.status(429).json({
      error: 'rate_limit_exceeded',
      retry_after: await redis.ttl(key)
    });
  }

  next();
};

// Apply to all routes
app.use(rateLimiter);</div>

                <h2>Popular API Gateway Solutions</h2>
                <table class="table">
                    <tr>
                        <th>Gateway</th>
                        <th>Type</th>
                        <th>Best For</th>
                    </tr>
                    <tr>
                        <td>Kong</td>
                        <td>Open Source</td>
                        <td>Kubernetes, plugins</td>
                    </tr>
                    <tr>
                        <td>AWS API Gateway</td>
                        <td>Managed</td>
                        <td>AWS ecosystem</td>
                    </tr>
                    <tr>
                        <td>Netflix Zuul</td>
                        <td>Open Source</td>
                        <td>JVM, Spring Cloud</td>
                    </tr>
                    <tr>
                        <td>Nginx</td>
                        <td>Open Source</td>
                        <td>Simple routing</td>
                    </tr>
                    <tr>
                        <td>Cloudflare</td>
                        <td>Managed</td>
                        <td>Edge, DDoS protection</td>
                    </tr>
                </table>

                <h2>Summary</h2>
                <p>API Gateways are essential for managing microservices at scale. They centralize cross-cutting concerns like authentication, rate limiting, and monitoring. For rate limiting, Token Bucket is the most popular algorithm, balancing burst handling with long-term rate control. At scale, use Redis or similar for distributed rate limiting. Always communicate limits clearly via headers and provide graceful degradation when limits are exceeded.</p>
            `,
            interviews: [
                {
                    question: "What is an API Gateway and what problems does it solve?",
                    answer: "An API Gateway is a single entry point for all client requests to backend services. It solves: 1) Cross-cutting concerns - centralizes auth, rate limiting, logging instead of each service implementing them, 2) Client simplification - one URL instead of knowing all service endpoints, 3) Protocol translation - can expose REST while services use gRPC, 4) Load balancing and routing, 5) Security - single point for authentication and DDoS protection."
                },
                {
                    question: "Explain the Token Bucket algorithm for rate limiting.",
                    answer: "Token Bucket: A bucket holds tokens (max capacity, e.g., 100). Tokens are added at fixed rate (e.g., 10/sec). Each request consumes one token. If no tokens available, request is rejected (429). Benefits: 1) Allows bursts up to bucket capacity, 2) Smooth average rate over time, 3) Simple to implement, 4) Used by Amazon API Gateway. Unlike Leaky Bucket which enforces strict rate, Token Bucket allows temporary bursts."
                },
                {
                    question: "How do you implement rate limiting in a distributed system?",
                    answer: "Challenge: Multiple gateway nodes each tracking separate counts. Solutions: 1) Centralized counter using Redis - all nodes increment same counter atomically, 2) Use Lua scripts for atomic token bucket operations, 3) Consider eventual consistency trade-offs - can use local counters synced periodically for less critical limits. For high availability, Redis Cluster or multiple Redis nodes with consistent hashing."
                },
                {
                    question: "What headers should you include in rate-limited API responses?",
                    answer: "Standard headers: X-RateLimit-Limit (max requests), X-RateLimit-Remaining (requests left), X-RateLimit-Reset (Unix timestamp when limit resets). On 429 response: Retry-After header (seconds until retry), error body with message and retry_after_seconds. This helps clients implement proper backoff and retry logic without guessing."
                },
                {
                    question: "Compare different rate limiting algorithms and when to use each.",
                    answer: "Fixed Window: Simple but allows boundary bursts (2x limit in 2 seconds). Sliding Window Log: Exact but memory intensive (stores all timestamps). Sliding Window Counter: Good balance, uses weighted average of two windows. Token Bucket: Most popular for APIs - allows bursts, smooth rate, low memory. Leaky Bucket: Strict fixed rate, good for traffic shaping. Use Token Bucket for general APIs, Leaky for strict rate requirements."
                }
            ]
        }
    ]
};
