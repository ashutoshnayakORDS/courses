// API Design Course - Module 1: REST Basics
// Fundamental REST principles, HTTP methods, status codes, and URL design

const apiModule1RestBasics = {
    title: 'Module 1: REST Basics',
    lessons: [
        {
            id: 'rest-principles',
            title: 'REST Principles & Architecture',
            duration: '50 min',
            content: `
                <h2>What is REST?</h2>
                <p>REST stands for Representational State Transfer. It's an architectural style for designing networked applications, particularly web services. REST was introduced by Roy Fielding in his 2000 doctoral dissertation and has become the dominant approach for building web APIs.</p>

                <p>Think of REST as a set of rules and conventions for how client and server should communicate over HTTP. It's not a protocol or a standard, but rather a set of constraints that, when followed, lead to scalable, maintainable, and easy-to-understand APIs.</p>

                <h3>The Restaurant Analogy</h3>
                <p>Imagine REST as ordering food at a restaurant:</p>
                <ul style="margin: 1rem 0; margin-left: 2rem;">
                    <li><strong>Resources (Menu Items):</strong> Each dish on the menu is a resource (e.g., "pizza", "burger")</li>
                    <li><strong>HTTP Methods (Actions):</strong> You can GET the menu, POST an order, PUT (update) your order, or DELETE an order</li>
                    <li><strong>Representations (Food Format):</strong> You can order the same pizza but get it sliced differently (JSON vs XML)</li>
                    <li><strong>Stateless:</strong> Each time you order, you need to tell the waiter your full request - they don't remember your previous orders</li>
                </ul>

                <h2>The Six REST Constraints</h2>

                <h3>1. Client-Server Architecture</h3>
                <p>The client (like your web browser or mobile app) and the server (the backend system) are separate entities. They can evolve independently without affecting each other.</p>

                <div class="code-block">Client (Frontend)          Server (Backend)
 |                           |
 |-------- Request --------->|
 |                           | [Process Request]
 |<------- Response ---------|
 |                           |

Benefits:
- Frontend team can update UI without touching backend
- Backend team can optimize database without affecting frontend
- Different clients (web, mobile, IoT) can use the same API</div>

                <p><strong>Real Example - Twitter:</strong> Twitter's API allows web browsers, iOS apps, Android apps, and third-party applications to all interact with the same backend. When Twitter redesigns their website, the mobile apps don't break.</p>

                <h3>2. Stateless Communication</h3>
                <p>Each request from client to server must contain ALL the information needed to understand and process the request. The server doesn't store any client context between requests.</p>

                <div class="code-block">❌ STATEFUL (NOT REST):
Request 1: Login with credentials
Request 2: Get my profile (server remembers you're logged in)
Request 3: Update profile (server still remembers)

✅ STATELESS (REST):
Request 1: Login → Get token
Request 2: Get my profile + token
Request 3: Update profile + token

Every request includes authentication token!</div>

                <h4>Why Stateless is Important:</h4>
                <ul style="margin: 1rem 0; margin-left: 2rem;">
                    <li><strong>Scalability:</strong> Any server can handle any request since no session data is stored</li>
                    <li><strong>Reliability:</strong> Server crashes don't lose session state</li>
                    <li><strong>Load Balancing:</strong> Easy to distribute requests across multiple servers</li>
                </ul>

                <h4>Common Fail Case:</h4>
                <div class="code-block">// ❌ BAD: Relying on server-side sessions
POST /api/login
{ "username": "john", "password": "***" }
→ Server stores session, returns session ID

GET /api/profile
→ Expects server to remember who you are (not RESTful!)

// ✅ GOOD: Stateless with tokens
POST /api/login
{ "username": "john", "password": "***" }
→ Returns JWT token

GET /api/profile
Headers: { "Authorization": "Bearer eyJhbGc..." }
→ Every request includes authentication</div>

                <h3>3. Cacheable</h3>
                <p>Responses must define themselves as cacheable or non-cacheable. If cacheable, the client can reuse the response data for equivalent requests later.</p>

                <div class="code-block">Example Response Headers:

// ✅ Cacheable (user profile changes rarely)
GET /api/users/123
Cache-Control: max-age=3600, public
→ Can be cached for 1 hour

// ❌ Non-cacheable (real-time stock price)
GET /api/stocks/AAPL/price
Cache-Control: no-cache, no-store, must-revalidate
→ Always fetch fresh data</div>

                <p><strong>Real Example - GitHub:</strong> When you fetch repository information, GitHub tells your browser it can cache that data for several minutes. But when you check notifications, it's marked as non-cacheable since notifications change frequently.</p>

                <h3>4. Uniform Interface</h3>
                <p>This is the most important constraint. REST APIs should have a consistent, uniform way of interacting with resources. This includes:</p>

                <h4>a) Resource Identification through URIs</h4>
                <div class="code-block">Resources are identified by URLs:
/users/123           → User with ID 123
/users/123/posts     → All posts by user 123
/posts/456           → Post with ID 456
/posts/456/comments  → All comments on post 456</div>

                <h4>b) Resource Manipulation through Representations</h4>
                <p>You work with representations of resources (usually JSON or XML), not the actual resource itself.</p>

                <div class="code-block">// JSON representation of a user
{
  "id": 123,
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2023-01-15T10:00:00Z"
}

// Same user, XML representation
&lt;user&gt;
  &lt;id&gt;123&lt;/id&gt;
  &lt;name&gt;John Doe&lt;/name&gt;
  &lt;email&gt;john@example.com&lt;/email&gt;
  &lt;created_at&gt;2023-01-15T10:00:00Z&lt;/created_at&gt;
&lt;/user&gt;</div>

                <h4>c) Self-Descriptive Messages</h4>
                <p>Each message includes enough information to describe how to process it.</p>

                <div class="code-block">GET /api/users/123 HTTP/1.1
Host: api.example.com
Accept: application/json
Authorization: Bearer token123

HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: max-age=3600

{
  "id": 123,
  "name": "John Doe"
}</div>

                <h4>d) HATEOAS (Hypermedia as the Engine of Application State)</h4>
                <p>Responses include links to related resources, guiding clients on what they can do next.</p>

                <div class="code-block">GET /api/users/123

{
  "id": 123,
  "name": "John Doe",
  "links": {
    "self": "/api/users/123",
    "posts": "/api/users/123/posts",
    "followers": "/api/users/123/followers",
    "following": "/api/users/123/following"
  }
}</div>

                <h3>5. Layered System</h3>
                <p>A client cannot tell whether it's connected directly to the end server or an intermediary. This allows for load balancers, caches, and security layers.</p>

                <div class="code-block">Client
  ↓
Load Balancer (Layer 1)
  ↓
API Gateway (Layer 2)
  ↓
Cache Server (Layer 3)
  ↓
Application Server (Layer 4)
  ↓
Database

Client only sees: https://api.example.com
Client doesn't know about all the layers in between</div>

                <p><strong>Real Example - Stripe:</strong> When you call Stripe's API, your request might go through their load balancer, CDN, API gateway, rate limiter, and finally their application servers. But you just call <code>https://api.stripe.com</code> and it all works transparently.</p>

                <h3>6. Code on Demand (Optional)</h3>
                <p>Servers can temporarily extend client functionality by transferring executable code (like JavaScript). This is the only optional constraint.</p>

                <div class="code-block">// Server can send JavaScript code to client
GET /api/calculator

Response:
{
  "function": "function calculate(a, b) { return a + b; }",
  "description": "Add two numbers"
}

// Client executes this code dynamically</div>

                <h2>RESTful Resource Design</h2>

                <h3>Resources vs Actions</h3>
                <p>In REST, everything is a resource. URLs should represent resources (nouns), not actions (verbs).</p>

                <div class="code-block">❌ BAD (Action-based, RPC style):
POST /api/createUser
POST /api/getUser
POST /api/updateUser
POST /api/deleteUser

✅ GOOD (Resource-based, RESTful):
POST   /api/users       (Create user)
GET    /api/users/123   (Get user)
PUT    /api/users/123   (Update user)
DELETE /api/users/123   (Delete user)

The HTTP method defines the action!</div>

                <h3>Resource Hierarchy</h3>
                <div class="code-block">// Top-level collection
GET /users              → All users

// Specific resource
GET /users/123          → User 123

// Nested collection
GET /users/123/posts    → All posts by user 123

// Specific nested resource
GET /users/123/posts/456 → Post 456 by user 123

// Three levels deep (generally avoid going deeper)
GET /users/123/posts/456/comments</div>

                <h2>Common Anti-Patterns (What NOT to Do)</h2>

                <h3>1. Using Verbs in URLs</h3>
                <div class="code-block">❌ BAD:
POST /api/createOrder
GET /api/getAllOrders
POST /api/updateOrder/123
POST /api/deleteOrder/123

✅ GOOD:
POST   /api/orders
GET    /api/orders
PUT    /api/orders/123
DELETE /api/orders/123</div>

                <h3>2. Not Using HTTP Methods Properly</h3>
                <div class="code-block">❌ BAD: Everything is POST
POST /api/users?action=get&id=123
POST /api/users?action=update&id=123
POST /api/users?action=delete&id=123

✅ GOOD: Use proper HTTP methods
GET    /api/users/123
PUT    /api/users/123
DELETE /api/users/123</div>

                <h3>3. Exposing Database Structure</h3>
                <div class="code-block">❌ BAD: Exposing internal database structure
GET /api/tbl_users
GET /api/user_profile_data
GET /api/db_transactions

✅ GOOD: Business-oriented resources
GET /api/users
GET /api/profiles
GET /api/transactions</div>

                <h3>4. Ignoring Status Codes</h3>
                <div class="code-block">❌ BAD: Always return 200
HTTP 200 OK
{
  "status": "error",
  "message": "User not found"
}

✅ GOOD: Use proper status codes
HTTP 404 Not Found
{
  "error": "User not found",
  "resource": "/api/users/999"
}</div>

                <h2>Real-World REST API Examples</h2>

                <h3>GitHub API</h3>
                <div class="code-block">// Get a repository
GET https://api.github.com/repos/facebook/react

// List issues
GET https://api.github.com/repos/facebook/react/issues

// Create an issue
POST https://api.github.com/repos/facebook/react/issues
{
  "title": "Bug in hooks",
  "body": "Description here..."
}

// Update an issue
PATCH https://api.github.com/repos/facebook/react/issues/123
{
  "state": "closed"
}</div>

                <h3>Twitter API</h3>
                <div class="code-block">// Get a tweet
GET https://api.twitter.com/2/tweets/1234567890

// Get user's tweets
GET https://api.twitter.com/2/users/12345/tweets

// Create a tweet
POST https://api.twitter.com/2/tweets
{
  "text": "Hello world!"
}

// Delete a tweet
DELETE https://api.twitter.com/2/tweets/1234567890</div>

                <h2>Summary</h2>
                <p>REST is an architectural style that uses HTTP methods, status codes, and URLs to create predictable, scalable APIs. The key principles are:</p>
                <ul style="margin: 1rem 0; margin-left: 2rem;">
                    <li>Resources (nouns) identified by URLs</li>
                    <li>HTTP methods (verbs) for actions</li>
                    <li>Stateless communication</li>
                    <li>Uniform interface</li>
                    <li>Proper use of status codes</li>
                    <li>Cacheable responses</li>
                </ul>
                <p>Following these principles leads to APIs that are easy to understand, maintain, and scale.</p>
            `,
            interviews: [
                {
                    question: "What does REST stand for and what are its main principles?",
                    answer: "REST stands for Representational State Transfer. Main principles: 1) Client-Server separation, 2) Stateless communication (each request contains all needed info), 3) Cacheable responses, 4) Uniform interface (consistent URL structure), 5) Layered system (intermediaries like load balancers), 6) Code on demand (optional)."
                },
                {
                    question: "Why is statelessness important in REST APIs?",
                    answer: "Statelessness means each request contains all needed information. Benefits: 1) Any server can handle any request (no session affinity), 2) Easy to scale horizontally, 3) Server crashes don't lose state, 4) Simplified load balancing. Each request includes auth tokens rather than relying on server-side sessions."
                },
                {
                    question: "What's wrong with URLs like POST /api/createUser or GET /api/getAllUsers?",
                    answer: "These are action-based URLs (RPC style), not resource-based (REST style). REST uses resources (nouns) in URLs and HTTP methods for actions. Should be: POST /api/users (create), GET /api/users (get all), GET /api/users/123 (get one). The HTTP method defines the action, not the URL."
                },
                {
                    question: "What is HATEOAS and why is it useful?",
                    answer: "HATEOAS (Hypermedia as Engine of Application State) means API responses include links to related resources. Example: GET /users/123 returns links to /users/123/posts, /users/123/followers. Benefits: self-documenting API, clients can discover available actions, reduces hardcoding of URLs in clients."
                },
                {
                    question: "How do REST APIs handle caching?",
                    answer: "REST APIs use HTTP cache headers in responses: Cache-Control, ETag, Last-Modified. Example: Cache-Control: max-age=3600 means cache for 1 hour. Cacheable data (user profiles) gets cache headers; real-time data (stock prices) uses Cache-Control: no-cache. This reduces server load and improves response times."
                },
                {
                    question: "Give an example of a non-RESTful anti-pattern and how to fix it.",
                    answer: "Anti-pattern: POST /api/users?action=delete&id=123 (using query params for actions). Fix: DELETE /api/users/123. Another: Returning HTTP 200 with {status: 'error'}. Fix: Use proper status codes like 404, 400, 500. REST uses HTTP features (methods, status codes) instead of reinventing them."
                }
            ]
        }
    ]
};
