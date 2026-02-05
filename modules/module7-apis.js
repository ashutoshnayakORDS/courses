// Module 7: APIs & Communication
// Beginner-friendly introduction building up to advanced concepts

const module7APIs = {
    title: 'Module 7: APIs & Communication',
    lessons: [
        {
            id: 'what-is-api',
            title: 'What is an API? - Understanding the Basics',
            duration: '45 min',
            content: \`
                <h2>Let's Start Simple: What is an API?</h2>
                <p><strong>API stands for Application Programming Interface.</strong> That's a fancy term, but the concept is actually very simple. Let's understand it step by step.</p>

                <h3>The Restaurant Analogy</h3>
                <p>Imagine you're at a restaurant:</p>

                <div class="code-block">You (Customer):
"I want a cheeseburger"

Waiter (API):
Takes your order to the kitchen

Kitchen (Server):
Makes the cheeseburger

Waiter (API):
Brings the cheeseburger back to you

You don't need to know:
- How to cook the burger
- Where ingredients are stored
- Kitchen equipment details

You just tell the waiter what you want, and you get it!</div>

                <p><strong>This is exactly how APIs work!</strong> An API is like a waiter that:</p>
                <ul>
                    <li>Takes your request</li>
                    <li>Tells the system what you want</li>
                    <li>Brings back the response</li>
                </ul>

                <h3>Real-World Example: Weather App</h3>
                <p>When you check the weather on your phone:</p>

                <div class="code-block">Your Phone App:
"What's the weather in New York?"

Weather API:
Sends request to weather service

Weather Service:
Looks up current weather

Weather API:
Sends back: "72°F, Sunny"

Your Phone:
Shows you the weather

You never see what happened behind the scenes!</div>

                <h3>Why Do We Need APIs?</h3>

                <p><strong>1. Sharing Data Between Apps</strong></p>
                <div class="code-block">Example: Instagram lets you log in with Facebook

Instagram (your app) → Facebook API → Facebook servers
"Is this person's login valid?"
Facebook replies: "Yes, here's their name and photo"

Without API: You'd need to create a Facebook account on Instagram
With API: Just click "Login with Facebook" - done!</div>

                <p><strong>2. Hiding Complexity</strong></p>
                <div class="code-block">Google Maps API:
You: "Show directions from A to B"
Google: Returns detailed route

You don't need to:
- Know how routing algorithms work
- Store all map data
- Handle traffic calculations

API does all the hard work for you!</div>

                <p><strong>3. Controlling Access</strong></p>
                <div class="code-block">Twitter API:
Allows: Reading tweets, posting tweets
Blocks: Deleting other people's tweets, accessing private messages

API controls what you can and cannot do</div>

                <h2>How Does an API Actually Work?</h2>

                <h3>The Request-Response Pattern</h3>
                <p>All APIs follow the same simple pattern:</p>

                <div class="code-block">STEP 1: You send a REQUEST
"Please give me information about user 123"

STEP 2: API processes it
Looks up user 123 in database

STEP 3: API sends a RESPONSE
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30
}

That's it! Request → Response</div>

                <h3>A Simple Real Example</h3>
                <p>Let's say you're building a website that shows movie information. You can use an API:</p>

                <div class="code-block">YOUR REQUEST:
"Give me information about the movie 'Inception'"

MOVIE API RESPONDS:
{
  "title": "Inception",
  "year": 2010,
  "director": "Christopher Nolan",
  "rating": 8.8,
  "poster": "http://example.com/inception.jpg"
}

YOUR WEBSITE:
Uses this data to display a nice movie card</div>

                <h2>Types of APIs (Simple Overview)</h2>

                <h3>1. Web APIs (Most Common)</h3>
                <p>Work over the internet using URLs (like websites)</p>
                <div class="code-block">Example:
https://api.weather.com/forecast?city=NewYork

Just like visiting a website, but instead of HTML,
you get data back (usually in a format called JSON)</div>

                <h3>2. Library APIs</h3>
                <p>Code libraries you include in your program</p>
                <div class="code-block">Example in Python:
import math
result = math.sqrt(16)  # Uses math API to calculate square root

The API is the math.sqrt() function you can call</div>

                <h3>3. Operating System APIs</h3>
                <p>Let programs interact with your computer</p>
                <div class="code-block">Example:
Your program wants to save a file
→ Calls OS API: "Please save this data to disk"
→ Operating system handles the complex disk operations</div>

                <p><strong>In this course, we focus on Web APIs</strong> because they're the most common for building modern applications.</p>

                <h2>What is JSON?</h2>
                <p>APIs usually send data in a format called JSON (JavaScript Object Notation). Don't worry - it's just a simple way to structure data.</p>

                <h3>JSON Looks Like This</h3>
                <div class="code-block">A simple user:
{
  "name": "Alice",
  "age": 25,
  "city": "New York"
}

A list of users:
[
  {
    "name": "Alice",
    "age": 25,
    "city": "New York"
  },
  {
    "name": "Bob",
    "age": 30,
    "city": "San Francisco"
  }
]

It's just like a spreadsheet, but in text format!</div>

                <h3>Why JSON?</h3>
                <ul>
                    <li><strong>Easy to read:</strong> Humans can understand it</li>
                    <li><strong>Easy to parse:</strong> Every programming language can read it</li>
                    <li><strong>Lightweight:</strong> Doesn't waste space with extra stuff</li>
                </ul>

                <h2>Making Your First API Request</h2>

                <h3>Using Your Browser</h3>
                <p>You can actually call APIs directly in your browser! Try this:</p>

                <div class="code-block">Open your browser and visit:
https://api.github.com/users/github

You'll see JSON data about the GitHub user!

{
  "login": "github",
  "id": 9919,
  "type": "Organization",
  "name": "GitHub",
  ...
}

Congratulations! You just made an API call!</div>

                <h3>What Just Happened?</h3>
                <div class="code-block">1. You typed a URL (the API endpoint)
2. Your browser sent a request to GitHub's servers
3. GitHub's API looked up the "github" user
4. GitHub sent back data in JSON format
5. Your browser displayed it

This is the foundation of how all APIs work!</div>

                <h2>Real-World API Examples</h2>

                <h3>Example 1: Payment APIs (Stripe)</h3>
                <div class="code-block">Your E-commerce Website:
"Charge this credit card $49.99"

Stripe API:
Processes the payment securely

Response:
"Payment successful! Transaction ID: 12345"

You don't have to:
- Store credit card numbers
- Handle payment security
- Deal with banks directly

Stripe API does all of that!</div>

                <h3>Example 2: Social Login (Facebook/Google)</h3>
                <div class="code-block">Your App:
"Let users log in with their Google account"

Google API:
Handles authentication

Returns:
"Yes, this is John Doe. Here's his email and profile picture"

You don't have to:
- Store passwords
- Handle "forgot password" flows
- Verify email addresses

Google API handles it all!</div>

                <h3>Example 3: Maps (Google Maps API)</h3>
                <div class="code-block">Your App:
"Show a map centered on Times Square, New York"

Google Maps API:
Returns map tiles and data

Your App:
Displays interactive map

You don't need to:
- Store map data (hundreds of terabytes!)
- Handle zoom levels
- Update roads when they change

Google does all the heavy lifting!</div>

                <h2>API Terminology (Simple Definitions)</h2>

                <table class="table">
                    <tr>
                        <th>Term</th>
                        <th>Simple Explanation</th>
                        <th>Analogy</th>
                    </tr>
                    <tr>
                        <td><strong>Endpoint</strong></td>
                        <td>A specific URL you can call</td>
                        <td>Like a phone number you can call</td>
                    </tr>
                    <tr>
                        <td><strong>Request</strong></td>
                        <td>Asking the API for something</td>
                        <td>Ordering food at a restaurant</td>
                    </tr>
                    <tr>
                        <td><strong>Response</strong></td>
                        <td>What the API sends back</td>
                        <td>The food arriving at your table</td>
                    </tr>
                    <tr>
                        <td><strong>Method</strong></td>
                        <td>The type of action (GET, POST, etc.)</td>
                        <td>Asking to "see the menu" vs "place an order"</td>
                    </tr>
                    <tr>
                        <td><strong>Parameter</strong></td>
                        <td>Extra information you send</td>
                        <td>"I want a burger WITH cheese and NO onions"</td>
                    </tr>
                    <tr>
                        <td><strong>Status Code</strong></td>
                        <td>Did it work? (200=success, 404=not found)</td>
                        <td>"Order ready!" vs "Sorry, we're out of that"</td>
                    </tr>
                </table>

                <h2>Your First API Call - Step by Step</h2>

                <p>Let's break down what happens when you call an API:</p>

                <div class="code-block">EXAMPLE: Getting information about a book

STEP 1: You make a request
URL: https://api.bookstore.com/books/12345
Meaning: "Give me information about book #12345"

STEP 2: Request travels over internet
Your computer → Internet → Bookstore's server

STEP 3: Server processes request
Server looks up book #12345 in database

STEP 4: Server sends response
{
  "id": 12345,
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "price": 12.99,
  "in_stock": true
}

STEP 5: Your app displays the data
Title: The Great Gatsby
Author: F. Scott Fitzgerald
Price: $12.99
[Add to Cart] button (because in_stock is true)

This whole process takes less than 1 second!</div>

                <h2>Why APIs Are Everywhere</h2>

                <div class="code-block">When you use any app, you're probably using multiple APIs:

Twitter App:
- Twitter API (to load tweets)
- Image hosting API (to load photos)
- Video API (to play videos)
- Location API (to tag where you are)
- Push notification API (to alert you)

Uber App:
- Maps API (to show your location)
- Payment API (to charge your card)
- SMS API (to send confirmation texts)
- Push notification API (to alert you)

Without APIs, every app would have to build EVERYTHING from scratch!
APIs let apps focus on their core features.</div>

                <h2>Common Misconceptions</h2>

                <h3>Myth 1: "APIs are only for programmers"</h3>
                <p><strong>False!</strong> You use APIs every day without knowing:</p>
                <ul>
                    <li>Weather widget on your phone? Uses a weather API</li>
                    <li>Embedding a YouTube video? Uses YouTube API</li>
                    <li>Login with Google button? Uses Google API</li>
                </ul>

                <h3>Myth 2: "You need to be an expert to understand APIs"</h3>
                <p><strong>False!</strong> The basic concept is simple: Request → Process → Response. That's it!</p>

                <h3>Myth 3: "All APIs are free"</h3>
                <p><strong>Not true!</strong> Some APIs are free, some charge money:</p>
                <div class="code-block">FREE APIs:
- GitHub API (first 60 requests per hour)
- Weather API (basic forecasts)
- Some Google Maps usage

PAID APIs:
- Stripe (payment processing) - takes a % of each transaction
- Twilio (SMS/calls) - charges per message
- Advanced Google Maps - charges after free tier</div>

                <h2>Summary: The Big Picture</h2>

                <p>Think of APIs as:</p>
                <ul>
                    <li><strong>Waiters</strong> - They take your order and bring food</li>
                    <li><strong>Translators</strong> - They let different programs talk to each other</li>
                    <li><strong>Middlemen</strong> - They connect you to services without revealing how they work</li>
                    <li><strong>Building blocks</strong> - They let you build complex apps by combining simple pieces</li>
                </ul>

                <p><strong>Key Takeaway:</strong> An API is just a way for one program to ask another program for something. It's like ordering food at a restaurant - you don't need to know how the kitchen works, you just ask for what you want and you get it!</p>

                <p>In the next lesson, we'll learn about <strong>REST APIs</strong> - the most popular type of web API, and how to design them properly.</p>
            \`,
            interviews: [
                {
                    question: "Explain what an API is in simple terms.",
                    answer: "An API (Application Programming Interface) is like a waiter in a restaurant. You (the customer) tell the waiter what you want, the waiter tells the kitchen (the server), the kitchen makes it, and the waiter brings it back to you. You don't need to know how the kitchen works. Similarly, an API lets one program ask another program for something without needing to know how it works internally. For example, when a weather app shows you the forecast, it asks a weather API for the data, and the API responds with temperature, conditions, etc."
                },
                {
                    question: "What is the request-response pattern?",
                    answer: "The request-response pattern is the basic way APIs work: 1) You send a REQUEST - 'Please give me information about user 123'. 2) The API processes it - looks up user 123 in the database. 3) The API sends a RESPONSE - returns the user's name, email, age, etc. It's like asking a librarian (request) for a specific book, they go find it (process), and bring it to you (response). This pattern is used by all web APIs."
                },
                {
                    question: "What is JSON and why do APIs use it?",
                    answer: "JSON (JavaScript Object Notation) is a simple text format for structuring data. It looks like: {\"name\": \"Alice\", \"age\": 25, \"city\": \"New York\"}. APIs use JSON because: 1) It's easy for humans to read, 2) Every programming language can parse it, 3) It's lightweight (no extra bloat). Think of it like a digital spreadsheet - it organizes data in a clear, structured way. When an API responds, it often sends data in JSON format so your app can easily understand and use it."
                },
                {
                    question: "Give a real-world example of how APIs are used.",
                    answer: "When you use Uber: 1) Maps API shows your current location and routes, 2) Payment API (like Stripe) charges your credit card, 3) SMS API sends you a confirmation text, 4) Push notification API alerts you when driver arrives. Without APIs, Uber would have to build its own mapping system (like Google Maps), payment processing (like Stripe), SMS service, etc. APIs let Uber focus on ride-sharing while using specialized services for everything else. This is why APIs are called 'building blocks' - you combine them to build complex apps quickly."
                },
                {
                    question: "What's the difference between a free API and a paid API?",
                    answer: "Free APIs: Often have usage limits. Example: GitHub API allows 60 requests per hour for free. Good for learning and small projects. Paid APIs: Charge money after free tier or per usage. Example: Stripe charges a percentage of each payment transaction (2.9% + 30¢). Twilio charges per SMS sent (fractions of a cent). Google Maps is free for basic usage, then charges per request after threshold. Companies charge because: 1) API costs them money to run (servers, bandwidth), 2) They provide valuable services (payment processing, maps data), 3) Heavy users pay, light users often stay free."
                }
            ]
        },
        {
            id: 'rest-api-basics',
            title: 'REST APIs - The Foundation',
            duration: '50 min',
            content: \`
                <h2>What is REST?</h2>
                <p>Now that you understand what an API is, let's learn about <strong>REST</strong> - the most popular way to build web APIs.</p>

                <p><strong>REST stands for REpresentational State Transfer.</strong> Don't worry about the fancy name! The concept is simple.</p>

                <h3>The Library Analogy</h3>
                <p>Think of REST API like organizing a library:</p>

                <div class="code-block">In a library:
- Books are organized by categories and numbers
- You can: Look at a book, Borrow a book, Return a book, Add a new book
- Each book has a unique location: "Fiction/Shelf 3/Book 42"

In a REST API:
- Data is organized as "resources" (like books)
- You can: GET (read), POST (create), PUT (update), DELETE (remove)
- Each resource has a unique URL: "/books/42"

Same concept, just digital!</div>

                <h2>The Five Basic Operations (HTTP Methods)</h2>
                <p>REST uses HTTP methods to tell the API what action you want. Think of them like verbs:</p>

                <h3>1. GET - Reading Data</h3>
                <p>GET means "show me" or "give me". You're just looking, not changing anything.</p>

                <div class="code-block">Real-World Examples:

GET /users
Meaning: "Show me all users"
Like: "Show me all books in the library"

GET /users/123
Meaning: "Show me user #123"
Like: "Show me the book on Shelf 3, Position 42"

GET /users/123/orders
Meaning: "Show me all orders for user #123"
Like: "Show me all books borrowed by this person"

Response you get back:
{
  "id": 123,
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "orders": [
    {"id": 1, "item": "Book", "price": 15.99},
    {"id": 2, "item": "Pen", "price": 2.99}
  ]
}</div>

                <h3>2. POST - Creating New Data</h3>
                <p>POST means "create a new one" or "add this".</p>

                <div class="code-block">Example: Creating a new user

POST /users

You send:
{
  "name": "Bob Smith",
  "email": "bob@example.com",
  "age": 30
}

API responds:
{
  "id": 124,  ← New user gets ID 124
  "name": "Bob Smith",
  "email": "bob@example.com",
  "age": 30,
  "created_at": "2024-01-15"
}

Like adding a new book to the library catalog</div>

                <h3>3. PUT - Updating Data (Complete Replacement)</h3>
                <p>PUT means "replace this entire thing with new data".</p>

                <div class="code-block">Example: Updating user #123

PUT /users/123

You send the COMPLETE new version:
{
  "name": "Alice Johnson-Smith",  ← Changed (got married)
  "email": "alice.smith@example.com",  ← Changed (new email)
  "age": 26  ← Changed (birthday)
}

API replaces everything with your new data

Like replacing an old book with a new edition</div>

                <h3>4. PATCH - Partial Update</h3>
                <p>PATCH means "just change these specific fields".</p>

                <div class="code-block">Example: Just updating email

PATCH /users/123

You send ONLY what changed:
{
  "email": "alice.new@example.com"
}

API updates just the email, everything else stays the same

Name still: "Alice Johnson"
Age still: 26
Email now: "alice.new@example.com"

Like fixing a typo in a book without reprinting the whole thing</div>

                <h3>5. DELETE - Removing Data</h3>
                <p>DELETE means "remove this".</p>

                <div class="code-block">Example: Deleting user #123

DELETE /users/123

API removes user #123 from the system

Response:
{
  "message": "User 123 deleted successfully"
}

Like removing a book from the library catalog</div>

                <h2>HTTP Methods Comparison</h2>

                <table class="table">
                    <tr>
                        <th>Method</th>
                        <th>What It Does</th>
                        <th>Real Life</th>
                        <th>Example</th>
                    </tr>
                    <tr>
                        <td><strong>GET</strong></td>
                        <td>Read/view data</td>
                        <td>Reading a book</td>
                        <td>GET /books/42</td>
                    </tr>
                    <tr>
                        <td><strong>POST</strong></td>
                        <td>Create new data</td>
                        <td>Adding a new book</td>
                        <td>POST /books</td>
                    </tr>
                    <tr>
                        <td><strong>PUT</strong></td>
                        <td>Replace entire resource</td>
                        <td>Replacing old book with new edition</td>
                        <td>PUT /books/42</td>
                    </tr>
                    <tr>
                        <td><strong>PATCH</strong></td>
                        <td>Update part of resource</td>
                        <td>Fixing a page in a book</td>
                        <td>PATCH /books/42</td>
                    </tr>
                    <tr>
                        <td><strong>DELETE</strong></td>
                        <td>Remove resource</td>
                        <td>Removing a book from catalog</td>
                        <td>DELETE /books/42</td>
                    </tr>
                </table>

                <h2>Understanding URLs in REST</h2>

                <h3>URLs Are Like Addresses</h3>
                <p>Just like your home has an address, every piece of data in a REST API has a URL:</p>

                <div class="code-block">Physical Address:
123 Main Street, Apartment 4B, New York

API Address (URL):
/users/123/orders/456

Breaking it down:
/users          ← Collection of all users (like "Main Street")
/users/123      ← Specific user #123 (like "Building 123")
/users/123/orders     ← All orders for user 123 (like "all apartments in building")
/users/123/orders/456 ← Specific order #456 for user 123 (like "Apartment 4B")</div>

                <h3>Good URL Design</h3>

                <div class="code-block">GOOD URLs (Clear and consistent):
GET /users              ← Get all users
GET /users/123          ← Get user 123
GET /users/123/orders   ← Get orders for user 123
POST /orders            ← Create a new order
DELETE /orders/456      ← Delete order 456

BAD URLs (Confusing):
GET /getAllUsers        ← Don't put the action in URL
GET /user/123           ← Inconsistent (should be "users" plural)
POST /createNewOrder    ← Redundant (POST already means "create")
GET /deleteOrder/456    ← Wrong! DELETE should be the method, not in URL</div>

                <h3>Why This Matters</h3>
                <p>Good URL design makes APIs easy to understand and use:</p>
                <div class="code-block">If you see: GET /products/789
You immediately know: "This gets product #789"

If you see: GET /products/789/reviews
You know: "This gets reviews for product #789"

It's self-documenting!</div>

                <h2>HTTP Status Codes - What They Mean</h2>
                <p>When an API responds, it includes a status code that tells you what happened. Think of them like traffic lights:</p>

                <h3>2xx - Success (Green Light 🟢)</h3>
                <div class="code-block">200 OK
"Everything worked! Here's your data"
Example: GET /users/123 found the user

201 Created
"I created the new thing you asked for"
Example: POST /users created a new user

204 No Content
"It worked, but there's nothing to send back"
Example: DELETE /users/123 deleted successfully</div>

                <h3>4xx - Client Error (Red Light 🔴 - Your Fault)</h3>
                <div class="code-block">400 Bad Request
"Your request doesn't make sense"
Example: You sent invalid data format

401 Unauthorized
"You need to log in first"
Example: Trying to access user data without authentication

403 Forbidden
"You're logged in, but you don't have permission"
Example: Trying to delete someone else's account

404 Not Found
"I can't find what you're looking for"
Example: GET /users/999999 but that user doesn't exist

429 Too Many Requests
"Slow down! You're making too many requests"
Example: API rate limit exceeded</div>

                <h3>5xx - Server Error (Red Light 🔴 - Server's Fault)</h3>
                <div class="code-block">500 Internal Server Error
"Something went wrong on our end"
Example: Database crashed, code has a bug

503 Service Unavailable
"We're temporarily down for maintenance"
Example: Server is overloaded or being updated</div>

                <h3>Status Code Analogy</h3>
                <div class="code-block">At a restaurant:

200 OK
= "Here's your burger!" (Success!)

404 Not Found
= "Sorry, we don't have that dish"

400 Bad Request
= "I don't understand your order"

401 Unauthorized
= "You need to be a member to order this"

500 Internal Server Error
= "The kitchen is on fire! We have problems!"</div>

                <h2>A Complete REST API Example</h2>
                <p>Let's build a simple blog API and see how all the pieces fit together:</p>

                <div class="code-block">BLOG POST API

1. Get all blog posts:
   GET /posts
   Response: [
     {"id": 1, "title": "First Post", "author": "Alice"},
     {"id": 2, "title": "Second Post", "author": "Bob"}
   ]

2. Get a specific post:
   GET /posts/1
   Response: {
     "id": 1,
     "title": "First Post",
     "content": "This is my first blog post!",
     "author": "Alice",
     "created_at": "2024-01-15"
   }

3. Create a new post:
   POST /posts
   Send: {
     "title": "My New Post",
     "content": "Hello world!",
     "author": "Charlie"
   }
   Response: {
     "id": 3,
     "title": "My New Post",
     "content": "Hello world!",
     "author": "Charlie",
     "created_at": "2024-01-16"
   }

4. Update a post:
   PATCH /posts/3
   Send: {"title": "My Updated Post"}
   Response: {
     "id": 3,
     "title": "My Updated Post",  ← Changed
     "content": "Hello world!",    ← Same
     "author": "Charlie",          ← Same
     "updated_at": "2024-01-17"
   }

5. Delete a post:
   DELETE /posts/3
   Response: {"message": "Post deleted"}</div>

                <h2>Why REST is Popular</h2>

                <h3>1. Simple to Understand</h3>
                <p>Uses familiar concepts: URLs (like websites), HTTP methods (GET, POST), and status codes.</p>

                <h3>2. Works Everywhere</h3>
                <p>Any device or programming language can use REST because it's built on standard web technologies.</p>

                <h3>3. Stateless = Simple</h3>
                <p>Each request is independent. The server doesn't remember previous requests.</p>

                <div class="code-block">Stateless Example:

Request 1: GET /users/123
Request 2: GET /users/123
Request 3: GET /users/123

Each request is completely independent
Server doesn't say "You already asked for this 2 times!"
Each request has all the information it needs

Like going to a store: Each time you buy something,
you show your money. The cashier doesn't remember
you bought milk yesterday.</div>

                <h3>4. Cacheable</h3>
                <p>Responses can be cached (saved temporarily) to make things faster:</p>

                <div class="code-block">First request: GET /users/123
Server responds: {"name": "Alice", ...}
Browser saves this for 5 minutes

Second request (within 5 minutes): GET /users/123
Browser uses saved data (much faster!)
No need to ask server again

Like taking a photo of the library catalog
instead of walking there every time</div>

                <h2>Common Mistakes Beginners Make</h2>

                <h3>Mistake 1: Using Wrong HTTP Method</h3>
                <div class="code-block">WRONG:
GET /deleteUser/123  ← Should be DELETE, not GET

RIGHT:
DELETE /users/123

Why: GET is for reading, DELETE is for deleting
The HTTP method should match the action</div>

                <h3>Mistake 2: Putting Actions in URL</h3>
                <div class="code-block">WRONG:
POST /createUser
GET /getUser/123
POST /updateUser/123

RIGHT:
POST /users          ← POST means "create"
GET /users/123       ← GET means "get"
PUT /users/123       ← PUT means "update"

The HTTP method tells you the action!</div>

                <h3>Mistake 3: Inconsistent Naming</h3>
                <div class="code-block">WRONG (Inconsistent):
GET /user/123    ← Singular
GET /orders      ← Plural
GET /Products    ← Capitalized

RIGHT (Consistent):
GET /users/123   ← Always plural
GET /orders
GET /products    ← Always lowercase

Pick a pattern and stick to it!</div>

                <h2>Summary</h2>

                <p>REST APIs are built on simple principles:</p>
                <ul>
                    <li><strong>Resources:</strong> Data is organized as resources (users, posts, orders)</li>
                    <li><strong>URLs:</strong> Each resource has a unique URL address</li>
                    <li><strong>HTTP Methods:</strong> GET (read), POST (create), PUT/PATCH (update), DELETE (remove)</li>
                    <li><strong>Status Codes:</strong> 2xx = success, 4xx = your error, 5xx = server error</li>
                    <li><strong>Stateless:</strong> Each request is independent</li>
                </ul>

                <p><strong>Key Takeaway:</strong> REST is just a organized way to structure web APIs. It's like organizing a library - everything has a place, and there are standard ways to interact with it (borrow, return, add, remove).</p>

                <p>In the next lesson, we'll learn how to design really good REST APIs with best practices!</p>
            \`,
            interviews: [
                {
                    question: "What does REST stand for and what is it?",
                    answer: "REST stands for REpresentational State Transfer. It's a style for building web APIs that uses standard web technologies (URLs, HTTP methods, status codes). Think of it like organizing a library - data is organized as 'resources' (like books), each resource has a unique URL (like a shelf location), and you interact with them using standard operations (GET to read, POST to create, PUT/PATCH to update, DELETE to remove). REST is popular because it's simple, works everywhere, and uses concepts web developers already know."
                },
                {
                    question: "Explain the difference between GET, POST, PUT, PATCH, and DELETE.",
                    answer: "GET = Read data without changing anything. Like looking at a book in library. Example: GET /users/123 retrieves user 123. POST = Create new data. Like adding a new book to library. Example: POST /users creates a new user. PUT = Replace entire resource. Like replacing old book with new edition. Example: PUT /users/123 replaces all user 123's data. PATCH = Update part of resource. Like fixing one page in a book. Example: PATCH /users/123 with {\"email\": \"new@email.com\"} changes only email. DELETE = Remove resource. Like removing book from library. Example: DELETE /users/123 deletes the user."
                },
                {
                    question: "What do HTTP status codes mean? Give examples.",
                    answer: "Status codes tell you what happened with your request. 2xx = Success (green light): 200 OK means 'here's your data', 201 Created means 'new resource created', 204 No Content means 'success but nothing to return'. 4xx = Client error (your fault): 400 Bad Request means 'invalid data sent', 401 Unauthorized means 'need to log in', 404 Not Found means 'resource doesn't exist', 429 Too Many Requests means 'rate limit exceeded'. 5xx = Server error (their fault): 500 Internal Server Error means 'server has a problem', 503 Service Unavailable means 'server is down/overloaded'. Like at a restaurant: 200 = 'here's your food!', 404 = 'we don't have that dish', 500 = 'kitchen is on fire!'"
                },
                {
                    question: "What makes a good REST API URL?",
                    answer: "Good REST URLs are: 1) Use nouns, not verbs: /users not /getUsers (HTTP method indicates action). 2) Use plural consistently: /users/123 not /user/123. 3) Show hierarchy: /users/123/orders means 'orders belonging to user 123'. 4) Keep it simple: max 2-3 levels deep. Bad examples: GET /getAllUsers (redundant), /user/123 (inconsistent singular), /users/123/orders/456/items/789/reviews (too deep). Good examples: GET /users (all users), GET /users/123 (specific user), GET /users/123/orders (user's orders), POST /orders (create order). URLs should be self-documenting - you should understand what they do just by reading them."
                },
                {
                    question: "What does 'stateless' mean in REST?",
                    answer: "Stateless means each API request is completely independent - the server doesn't remember previous requests. Every request must contain all information needed to process it. Example: Request 1: GET /users/123. Request 2: GET /users/123. The server treats these as separate, unrelated requests. It doesn't say 'you already asked for this!' Benefits: 1) Simpler to build (no session management), 2) Easier to scale (any server can handle any request), 3) More reliable (no state to lose). Analogy: Going to a store - each time you buy something, you show payment. Cashier doesn't remember you bought milk yesterday. Each transaction is independent."
                }
            ]
        }
    ]
};
