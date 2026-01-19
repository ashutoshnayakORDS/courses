import React, { useState } from 'react';
import { ChevronRight, BookOpen, Code, Database, Zap, Users, ArrowLeft, CheckCircle, Clock, BarChart3, Home } from 'lucide-react';

// ============================================
// COURSE CONTENT DATA - Fully Modular
// ============================================

const COURSES = {
  'system-design': {
    id: 'system-design',
    title: 'System Design Fundamentals',
    subtitle: 'Learn to architect scalable systems like Google, Netflix, and Uber',
    description: 'Master the principles behind world-class distributed systems. From monoliths to microservices, understand the trade-offs that separate good designs from great ones.',
    duration: '16 weeks',
    level: 'Intermediate',
    color: 'from-blue-600 to-blue-400',
    icon: BarChart3,
    modules: [
      {
        id: 'foundations',
        title: 'Module 1: Foundations',
        lessons: [
          {
            id: 'scalability-101',
            title: 'Lesson 1.1: Scalability 101',
            duration: '45 min',
            content: `
              <h3>What is Scalability?</h3>
              <p>Scalability is the ability of your system to handle increasing load without proportionally increasing resources or degrading performance. Let's break this down:</p>
              
              <h4>Vertical Scaling (Scale Up)</h4>
              <p>Add more power to existing machines. Buy a bigger server.</p>
              <div class="code-block">
# Before: 1 server, 4 cores
server_cpu = 4
server_ram = 16GB

# After: 1 server, 32 cores
server_cpu = 32
server_ram = 256GB
              </div>
              <strong>Pros:</strong> Simple, no code changes<br/>
              <strong>Cons:</strong> Limited ceiling, expensive, single point of failure
              
              <h4>Horizontal Scaling (Scale Out)</h4>
              <p>Add more machines to distribute the load.</p>
              <div class="code-block">
# Before: 1 server handling all requests
servers = [Server1(4cores, 16GB)]

# After: Distribute across multiple servers
servers = [Server1, Server2, Server3, Server4]
load_balancer = RoundRobin(servers)
              </div>
              <strong>Pros:</strong> Virtually unlimited, fault tolerant, better resource utilization<br/>
              <strong>Cons:</strong> Complex, requires architectural changes, networking overhead
              
              <h4>The Real-World Example: Instagram</h4>
              <p>2010: ~14 servers, scaling vertically. 2012: Millions of concurrent users, 300+ servers horizontally scaled across data centers.</p>
              <p>They couldn't have succeeded by buying bigger machines. The answer was building systems that could work across multiple machines seamlessly.</p>
            `
          },
          {
            id: 'latency-throughput',
            title: 'Lesson 1.2: Latency vs Throughput',
            duration: '50 min',
            content: `
              <h3>Two Metrics That Define Everything</h3>
              
              <h4>Latency: The Time to Respond</h4>
              <p>How long does it take to complete a single request?</p>
              <div class="code-block">
Request sent at: 00:00:00.000
Response received: 00:00:00.150
Latency = 150ms
              </div>
              
              <h4>Throughput: The Volume You Handle</h4>
              <p>How many requests can you handle per unit time?</p>
              <div class="code-block">
Requests handled in 1 second: 10,000
Throughput = 10,000 QPS (Queries Per Second)
              </div>
              
              <h4>Why Both Matter</h4>
              <table class="comparison-table">
                <tr>
                  <th>Scenario</th>
                  <th>Latency</th>
                  <th>Throughput</th>
                  <th>Impact</th>
                </tr>
                <tr>
                  <td>Stock Trading</td>
                  <td>1ms (critical)</td>
                  <td>10K QPS</td>
                  <td>Microseconds matter. Speed = money</td>
                </tr>
                <tr>
                  <td>Batch Processing</td>
                  <td>5 seconds (ok)</td>
                  <td>100K QPS</td>
                  <td>Process volume efficiently</td>
                </tr>
                <tr>
                  <td>User Web Page</td>
                  <td>200ms (target)</td>
                  <td>5K QPS</td>
                  <td>Fast enough for good UX</td>
                </tr>
              </table>
              
              <h4>The Trade-off</h4>
              <p>Sometimes you can't have both. If you optimize for latency (keep servers ready), you waste throughput capacity. If you optimize for throughput (batch requests), you increase latency.</p>
              <p><strong>Netflix's Choice:</strong> They prioritize latency for user-facing APIs (video streaming starts fast) but optimize for throughput in batch jobs (data analysis runs overnight).</p>
            `
          },
          {
            id: 'consistency-availability',
            title: 'Lesson 1.3: CAP Theorem - Choose 2 of 3',
            duration: '55 min',
            content: `
              <h3>The CAP Theorem Explained</h3>
              <p>Brewer's Theorem (2000): In a distributed system, you can guarantee at most 2 of 3 properties:</p>
              
              <h4>1. Consistency (C)</h4>
              <p>All nodes see the same data at the same time. If you write a value, all reads immediately get the new value.</p>
              <div class="code-block">
User writes: balance = $100
Millisecond 0: All servers updated to $100
Millisecond 1: User reads from any server → gets $100
              </div>
              
              <h4>2. Availability (A)</h4>
              <p>The system always responds, even if some nodes fail.</p>
              <div class="code-block">
Database crashed in London
System still serves requests from Tokyo and New York
User gets a response (might be stale data)
              </div>
              
              <h4>3. Partition Tolerance (P)</h4>
              <p>The system works even if the network is split (nodes can't talk to each other).</p>
              
              <h4>What Real Systems Choose</h4>
              <table class="comparison-table">
                <tr>
                  <th>System Type</th>
                  <th>Choice</th>
                  <th>Why</th>
                </tr>
                <tr>
                  <td>Banks (ACID)</td>
                  <td>CA (Consistency + Availability)</td>
                  <td>Money can't be lost. They accept single-region failures.</td>
                </tr>
                <tr>
                  <td>NoSQL (MongoDB)</td>
                  <td>CP (Consistency + Partition)</td>
                  <td>Sacrifice availability temporarily to stay consistent</td>
                </tr>
                <tr>
                  <td>Eventually Consistent (DynamoDB)</td>
                  <td>AP (Availability + Partition)</td>
                  <td>Always available, but data syncs across regions</td>
                </tr>
              </table>
              
              <h4>Real-World: AWS DynamoDB Outage (Dec 2012)</h4>
              <p>A network partition happened. DynamoDB chose Availability and Partition tolerance - it kept accepting writes across regions. When the partition healed, conflicts had to be resolved. Some users experienced stale reads.</p>
              <p>But the system never went down. That was the trade-off they accepted.</p>
            `
          }
        ]
      },
      {
        id: 'building-blocks',
        title: 'Module 2: Building Blocks',
        lessons: [
          {
            id: 'load-balancing',
            title: 'Lesson 2.1: Load Balancing Strategies',
            duration: '50 min',
            content: `
              <h3>Distributing Traffic Across Servers</h3>
              <p>You've got 100K concurrent users and 10 servers. How do you distribute them fairly?</p>
              
              <h4>1. Round Robin</h4>
              <p>Send requests to servers in order: 1, 2, 3, 4, 5, ..., 10, 1, 2, 3...</p>
              <div class="code-block">
Request 1 → Server 1
Request 2 → Server 2
Request 3 → Server 3
...
Request 11 → Server 1
              </div>
              <strong>Pros:</strong> Simple, fair<br/>
              <strong>Cons:</strong> Ignores server load, slow servers get overwhelmed
              
              <h4>2. Least Connections</h4>
              <p>Send new requests to the server with the fewest active connections.</p>
              <div class="code-block">
Server 1: 50 active connections
Server 2: 120 active connections
Server 3: 45 active connections

New request → Server 3 (lowest)
              </div>
              <strong>Pros:</strong> Adapts to server speed<br/>
              <strong>Cons:</strong> Overhead to track connections
              
              <h4>3. Consistent Hashing</h4>
              <p>Hash the user ID to determine which server gets their requests.</p>
              <div class="code-block">
user_id = 12345
hash(12345) % num_servers = 7
Request → Server 7

Same user always goes to Server 7 (useful for caching)
              </div>
              <strong>Pros:</strong> User session affinity, cache locality<br/>
              <strong>Cons:</strong> Imbalanced if data isn't uniform
              
              <h4>Real Example: Uber</h4>
              <p>Uses consistent hashing to route ride requests to regional servers. User 12345 in San Francisco always hits the SFO server, so local cache of regional data is always warm.</p>
            `
          },
          {
            id: 'databases',
            title: 'Lesson 2.2: Choosing the Right Database',
            duration: '60 min',
            content: `
              <h3>SQL vs NoSQL: When to Use Each</h3>
              
              <h4>Relational (SQL)</h4>
              <p>Structured data with relationships. ACID transactions.</p>
              <div class="code-block">
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE
);

CREATE TABLE orders (
  id INT PRIMARY KEY,
  user_id INT FOREIGN KEY,
  amount DECIMAL(10,2)
);
              </div>
              <strong>Best for:</strong> Financial systems, user accounts, anything where consistency matters<br/>
              <strong>Scaling issue:</strong> Hard to shard, joins are expensive
              
              <h4>NoSQL (Key-Value / Document)</h4>
              <p>Flexible schema, distributed by design.</p>
              <div class="code-block">
{
  "user_id": 12345,
  "name": "Alice",
  "preferences": {
    "theme": "dark",
    "notifications": true
  },
  "recent_searches": ["python", "javascript"]
}
              </div>
              <strong>Best for:</strong> User profiles, caching, logs, rapid iteration<br/>
              <strong>Pro:</strong> Easy to scale horizontally
              
              <h4>Decision Matrix</h4>
              <table class="comparison-table">
                <tr>
                  <th>Question</th>
                  <th>SQL</th>
                  <th>NoSQL</th>
                </tr>
                <tr>
                  <td>Do you need ACID transactions?</td>
                  <td>✓ Yes</td>
                  <td>Eventually consistent</td>
                </tr>
                <tr>
                  <td>Is schema stable?</td>
                  <td>✓ Yes</td>
                  <td>Flexible</td>
                </tr>
                <tr>
                  <td>Need to shard across regions?</td>
                  <td>Hard</td>
                  <td>✓ Built-in</td>
                </tr>
                <tr>
                  <td>Scaling beyond 1TB?</td>
                  <td>Pain</td>
                  <td>✓ Easy</td>
                </tr>
              </table>
              
              <h4>Instagram's Evolution</h4>
              <p>Started with PostgreSQL for user data (structured). As scale grew, added Cassandra for photo metadata (distributed). Now hybrid: SQL for accounts, NoSQL for content.</p>
            `
          },
          {
            id: 'caching',
            title: 'Lesson 2.3: Caching Strategies',
            duration: '55 min',
            content: `
              <h3>Making Your System Blazingly Fast</h3>
              <p>CPU is 1ns. Memory is 100ns. Disk is 10ms. Network is 100ms+. Caching bridges these gaps.</p>
              
              <h4>Cache Levels</h4>
              <div class="code-block">
L1: Browser Cache (user's computer) - instant
L2: CDN Cache (edge servers) - milliseconds
L3: Application Cache (Redis) - microseconds
L4: Database (disk) - milliseconds
              </div>
              
              <h4>Cache Invalidation Strategies</h4>
              
              <p><strong>1. TTL (Time-To-Live)</strong></p>
              <p>Cache for X seconds, then refresh.</p>
              <div class="code-block">
cache.set("user:123", user_data, ttl=3600)
# After 1 hour, automatically evicted
              </div>
              <p>Good for: Weather data, stock prices, user profiles</p>
              
              <p><strong>2. Event-Based Invalidation</strong></p>
              <p>When data changes, invalidate cache.</p>
              <div class="code-block">
user.update(name="Bob")
cache.delete("user:123")  # Immediately gone
              </div>
              <p>Good for: Critical data that must be fresh</p>
              
              <p><strong>3. LRU (Least Recently Used)</strong></p>
              <p>When cache is full, evict least recently accessed items.</p>
              <div class="code-block">
cache_size = 1000
access order: A, B, C, A, D, B, E
# If full, C is evicted (used least recently)
              </div>
              <p>Good for: Limited cache memory</p>
              
              <h4>The Thundering Herd Problem</h4>
              <p>Cache expires, 10,000 users simultaneously hit the database for the same data. Crashes!</p>
              <div class="code-block">
# Bad: All requests wait for DB
cache expires at 3:00pm
1000 requests at 3:00:00.001 → all hit DB
# Solution: probabilistic early expiration
if random() < 0.01:
  refresh_cache()  # One thread refreshes early
              </div>
              
              <h4>Twitter's Case</h4>
              <p>Caches tweets heavily. But when a famous person tweets, millions request it simultaneously. They use probabilistic refresh: 1% of cache hits trigger a background refresh, preventing the herd.</p>
            `
          }
        ]
      }
    ]
  },
  'data-engineering': {
    id: 'data-engineering',
    title: 'Data Engineering at Scale',
    subtitle: 'Master the systems that power big data analytics',
    description: 'Learn how companies like Uber, Airbnb, and Amazon process petabytes of data. Master pipelines, warehousing, and real-time analytics.',
    duration: '14 weeks',
    level: 'Advanced',
    color: 'from-green-600 to-green-400',
    icon: Database,
    modules: [
      {
        id: 'data-basics',
        title: 'Module 1: Data Fundamentals',
        lessons: [
          {
            id: 'batch-vs-streaming',
            title: 'Lesson 1.1: Batch vs Stream Processing',
            duration: '50 min',
            content: `
              <h3>Two Paradigms of Data Processing</h3>
              
              <h4>Batch Processing</h4>
              <p>Collect data for a period, process it all at once.</p>
              <div class="code-block">
# Collect events from yesterday
events = database.query("SELECT * FROM events WHERE date = '2024-01-10'")

# Process 10 million events
results = spark.process(events)

# Write results
warehouse.save(results)
              </div>
              <strong>Latency:</strong> Hours<br/>
              <strong>Volume:</strong> Petabytes<br/>
              <strong>Examples:</strong> Daily reports, ML training, data cleanup
              
              <h4>Stream Processing</h4>
              <p>Process events as they arrive, continuously.</p>
              <div class="code-block">
stream = kafka_topic("user-events")
for event in stream:
    enriched = enrich(event)
    anomaly_score = model.predict(enriched)
    if anomaly_score > 0.9:
        alert_team()
              </div>
              <strong>Latency:</strong> Milliseconds<br/>
              <strong>Volume:</strong> Thousands of events/sec<br/>
              <strong>Examples:</strong> Real-time fraud detection, dashboard updates, alerting
              
              <h4>Uber's Case</h4>
              <p>Uses both. Batch: nightly ML model training on millions of rides to predict surge pricing. Stream: Immediate processing of current ride requests for real-time matching.</p>
            `
          }
        ]
      }
    ]
  },
  'api-design': {
    id: 'api-design',
    title: 'API Design & REST Fundamentals',
    subtitle: 'Design APIs that developers love',
    description: 'Learn RESTful design principles, versioning, rate limiting, and authentication. Build APIs used by millions.',
    duration: '8 weeks',
    level: 'Beginner',
    color: 'from-purple-600 to-purple-400',
    icon: Code,
    modules: [
      {
        id: 'rest-basics',
        title: 'Module 1: REST Fundamentals',
        lessons: [
          {
            id: 'rest-principles',
            title: 'Lesson 1.1: REST Principles',
            duration: '40 min',
            content: `
              <h3>Building Intuitive APIs</h3>
              
              <h4>Resource-Oriented Design</h4>
              <p>Think of your API as manipulating resources, not actions.</p>
              <div class="code-block">
# Bad: Action-oriented
POST /api/createUser
POST /api/deleteUser
GET /api/getUserDetails

# Good: Resource-oriented
POST /api/users
DELETE /api/users/123
GET /api/users/123
              </div>
              
              <h4>HTTP Methods</h4>
              <table class="comparison-table">
                <tr>
                  <th>Method</th>
                  <th>Purpose</th>
                  <th>Idempotent</th>
                </tr>
                <tr>
                  <td>GET</td>
                  <td>Read resource</td>
                  <td>✓ Yes</td>
                </tr>
                <tr>
                  <td>POST</td>
                  <td>Create resource</td>
                  <td>No</td>
                </tr>
                <tr>
                  <td>PUT</td>
                  <td>Replace resource</td>
                  <td>✓ Yes</td>
                </tr>
                <tr>
                  <td>PATCH</td>
                  <td>Partial update</td>
                  <td>No</td>
                </tr>
                <tr>
                  <td>DELETE</td>
                  <td>Delete resource</td>
                  <td>✓ Yes</td>
                </tr>
              </table>
              
              <h4>Stripe's API Design</h4>
              <p>One of the best APIs in the world. Uses resource-oriented principles consistently. All developers know what to expect.</p>
            `
          }
        ]
      }
    ]
  }
};

// ============================================
// MODULAR COMPONENTS
// ============================================

const CourseCard = ({ course, onClick }) => {
  const Icon = course.icon;
  return (
    <div
      onClick={onClick}
      className={`bg-gradient-to-br ${course.color} rounded-xl p-6 text-white cursor-pointer hover:shadow-2xl transform hover:scale-105 transition-all duration-300`}
    >
      <Icon className="w-12 h-12 mb-4" />
      <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
      <p className="text-sm opacity-90 mb-4">{course.subtitle}</p>
      <div className="flex items-center justify-between text-xs opacity-75">
        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4" /> {course.duration}
        </span>
        <span>{course.level}</span>
      </div>
    </div>
  );
};

const HomePage = ({ onSelectCourse }) => {
  const courseList = Object.values(COURSES);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="px-4 py-16 sm:py-24 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <BookOpen className="w-16 h-16 text-blue-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            System Design Academy
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8">
            Learn system design like you're at Google, Microsoft, or Amazon. From fundamentals to case studies, master the architecture behind world-scale systems.
          </p>
          <p className="text-gray-400">
            Expert-crafted courses based on 30 years of architectural experience
          </p>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">
            Featured Courses
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courseList.map(course => (
              <CourseCard
                key={course.id}
                course={course}
                onClick={() => onSelectCourse(course.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CoursePage = ({ course, onBack, onSelectLesson }) => {
  const progress = 25;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className={`bg-gradient-to-r ${course.color} text-white`}>
        <div className="max-w-6xl mx-auto px-4 py-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 mb-6 hover:opacity-80 transition"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Courses
          </button>
          <h1 className="text-4xl font-bold mb-2">{course.title}</h1>
          <p className="text-lg opacity-90 mb-6">{course.subtitle}</p>
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              {course.duration}
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              {course.level}
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              {course.modules.length} Modules
            </div>
          </div>
        </div>
      </div>

      {/* Course Description */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <p className="text-gray-700 text-lg mb-8">{course.description}</p>
      </div>

      {/* Modules & Lessons */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        {course.modules.map((module, moduleIdx) => (
          <div key={module.id} className="mb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">
              {module.title}
            </h2>
            <div className="space-y-3">
              {module.lessons.map((lesson, lessonIdx) => (
                <div
                  key={lesson.id}
                  onClick={() => onSelectLesson(course.id, module.id, lesson.id)}
                  className="bg-white p-6 rounded-lg border-l-4 border-blue-500 hover:shadow-lg cursor-pointer transition-all hover:translate-x-1"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">
                        {lesson.title}
                      </h3>
                      <p className="text-gray-500 text-sm flex items-center gap-1">
                        <Clock className="w-4 h-4" /> {lesson.duration}
                      </p>
                    </div>
                    <ChevronRight className="text-gray-400 w-5 h-5 flex-shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const LessonPage = ({ course, module, lesson, onBack, onNextLesson }) => {
  const allLessons = module.lessons;
  const currentIdx = allLessons.findIndex(l => l.id === lesson.id);
  const hasNext = currentIdx < allLessons.length - 1;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 transition"
          >
            <ArrowLeft className="w-5 h-5" /> Back
          </button>
          <h1 className="text-3xl font-bold text-slate-800">{lesson.title}</h1>
          <p className="text-gray-500 mt-2 flex items-center gap-1">
            <Clock className="w-4 h-4" /> {lesson.duration}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg p-8 shadow-sm">
          {/* Render rich HTML content */}
          <div
            className="prose prose-sm sm:prose max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: lesson.content }}
          />
        </div>

        {/* Navigation */}
        <div className="mt-12 flex items-center justify-between">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
          >
            ← Previous
          </button>
          
          {hasNext && (
            <button
              onClick={() => onNextLesson(allLessons[currentIdx + 1].id)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center gap-2"
            >
              Next → <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Progress */}
        <div className="mt-8 text-center text-gray-500">
          <p className="text-sm">
            Lesson {currentIdx + 1} of {allLessons.length}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${((currentIdx + 1) / allLessons.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// MAIN APP WITH ROUTING
// ============================================

export default function SystemDesignAcademy() {
  const [view, setView] = useState('home'); // 'home' | 'course' | 'lesson'
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const [selectedLessonId, setSelectedLessonId] = useState(null);

  const selectedCourse = selectedCourseId ? COURSES[selectedCourseId] : null;
  const selectedModule = selectedCourse
    ? selectedCourse.modules.find(m => m.id === selectedModuleId)
    : null;
  const selectedLesson = selectedModule
    ? selectedModule.lessons.find(l => l.id === selectedLessonId)
    : null;

  const handleSelectCourse = (courseId) => {
    setSelectedCourseId(courseId);
    setSelectedModuleId(COURSES[courseId].modules[0].id);
    setView('course');
  };

  const handleSelectLesson = (courseId, moduleId, lessonId) => {
    setSelectedCourseId(courseId);
    setSelectedModuleId(moduleId);
    setSelectedLessonId(lessonId);
    setView('lesson');
  };

  const handleBackToCourse = () => {
    setView('course');
    setSelectedLessonId(null);
  };

  const handleBackToHome = () => {
    setView('home');
    setSelectedCourseId(null);
    setSelectedModuleId(null);
    setSelectedLessonId(null);
  };

  const handleNextLesson = (nextLessonId) => {
    setSelectedLessonId(nextLessonId);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <style>{`
        .prose h3 {
          font-size: 1.5rem;
          font-weight: bold;
          margin-top: 1.5rem;
          margin-bottom: 1rem;
          color: #1f2937;
        }
        .prose h4 {
          font-size: 1.1rem;
          font-weight: 600;
          margin-top: 1.25rem;
          margin-bottom: 0.75rem;
          color: #374151;
        }
        .prose p {
          margin-bottom: 1rem;
          line-height: 1.75;
        }
        .prose strong {
          font-weight: 600;
          color: #1f2937;
        }
        .code-block {
          background-color: #1f2937;
          color: #e5e7eb;
          padding: 1rem;
          border-radius: 0.5rem;
          font-family: monospace;
          font-size: 0.9rem;
          overflow-x: auto;
          margin: 1rem 0;
          line-height: 1.5;
          border-left: 3px solid #3b82f6;
        }
        .comparison-table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          overflow: hidden;
        }
        .comparison-table th {
          background-color: #f3f4f6;
          padding: 0.75rem;
          text-align: left;
          font-weight: 600;
          color: #1f2937;
          border-bottom: 2px solid #e5e7eb;
        }
        .comparison-table td {
          padding: 0.75rem;
          border-bottom: 1px solid #e5e7eb;
          color: #374151;
        }
        .comparison-table tr:last-child td {
          border-bottom: none;
        }
      `}</style>

      {view === 'home' && <HomePage onSelectCourse={handleSelectCourse} />}
      {view === 'course' && selectedCourse && (
        <CoursePage
          course={selectedCourse}
          onBack={handleBackToHome}
          onSelectLesson={handleSelectLesson}
        />
      )}
      {view === 'lesson' && selectedCourse && selectedModule && selectedLesson && (
        <LessonPage
          course={selectedCourse}
          module={selectedModule}
          lesson={selectedLesson}
          onBack={handleBackToCourse}
          onNextLesson={handleNextLesson}
        />
      )}
    </div>
  );
}
