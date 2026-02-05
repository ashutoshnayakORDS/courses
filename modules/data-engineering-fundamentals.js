// Data Engineering Fundamentals Course
// Beginner-friendly introduction to data engineering concepts

const dataEngineeringFundamentals = {
    title: 'Data Engineering Fundamentals',
    lessons: [
        {
            id: 'what-is-data',
            title: 'What is Data? - Understanding the Basics',
            duration: '40 min',
            content: `
                <h2>Let's Start Simple: What is Data?</h2>
                <p><strong>Data is just information.</strong> That's it. Nothing fancy, nothing scary. Data is any piece of information that you can write down, measure, or observe.</p>

                <h3>Data in Everyday Life</h3>
                <p>You work with data every single day without realizing it:</p>

                <div class="code-block">When you check the weather:
"It's 72°F outside"
- The number 72 is data
- The unit (Fahrenheit) is data
- The time you checked is data

When you make a grocery list:
"Buy 2 apples, 1 loaf of bread, 3 eggs"
- Item names are data (apples, bread, eggs)
- Quantities are data (2, 1, 3)
- Your shopping date is data

When you look at your phone:
"3 text messages, 12% battery"
- Message count is data
- Battery percentage is data
- Who sent the messages is data</div>

                <p>See? You already understand data. It's just information about things.</p>

                <h2>Types of Data (Simple Version)</h2>

                <h3>1. Numbers</h3>
                <p>Data that you can count or measure.</p>
                <div class="code-block">Examples:
- Your age: 25
- Temperature: 72°F
- Price: $49.99
- Distance: 5 miles
- Number of likes: 347</div>

                <h3>2. Text (Words)</h3>
                <p>Data that you can read or write.</p>
                <div class="code-block">Examples:
- Your name: "John Smith"
- Email address: "john@email.com"
- City: "New York"
- Product name: "iPhone 15"
- Review: "Great product!"</div>

                <h3>3. True/False</h3>
                <p>Data that has only two possible answers.</p>
                <div class="code-block">Examples:
- Are you logged in? Yes or No
- Is it raining? True or False
- Did you finish the task? Completed or Not Completed
- Is the item in stock? Available or Sold Out</div>

                <h3>4. Dates and Times</h3>
                <p>Data about when something happened.</p>
                <div class="code-block">Examples:
- Birthday: January 15, 1995
- Order time: 2:30 PM
- Sign up date: March 1, 2024
- Meeting schedule: Monday at 10:00 AM</div>

                <h2>Why Do We Care About Data?</h2>

                <h3>The Recipe Analogy</h3>
                <p>Think about baking a cake. You need:</p>

                <div class="code-block">Ingredients (Data):
- 2 cups flour
- 1 cup sugar
- 3 eggs
- 1 teaspoon vanilla

Instructions (What to do with data):
1. Mix flour and sugar
2. Add eggs
3. Add vanilla
4. Bake at 350°F for 30 minutes

Result (Value from data):
- A delicious cake!</div>

                <p>Without the exact measurements (data), your cake might fail. Too much flour? Dry cake. Too little sugar? Not sweet. <strong>Data is the ingredients that help us create something useful.</strong></p>

                <h3>Data Helps Us Make Decisions</h3>
                <p>Let's see how simple data helps you decide things:</p>

                <table class="table">
                    <tr>
                        <th>Question</th>
                        <th>Data You Need</th>
                        <th>Decision</th>
                    </tr>
                    <tr>
                        <td>Should I bring an umbrella?</td>
                        <td>Weather forecast: 80% chance of rain</td>
                        <td>Yes, bring umbrella</td>
                    </tr>
                    <tr>
                        <td>Which restaurant to visit?</td>
                        <td>Restaurant A: 4.5 stars, $20 average<br>Restaurant B: 3.2 stars, $15 average</td>
                        <td>Probably Restaurant A</td>
                    </tr>
                    <tr>
                        <td>Is my phone dying?</td>
                        <td>Battery: 5% remaining</td>
                        <td>Yes, charge it now!</td>
                    </tr>
                    <tr>
                        <td>Should I buy this product?</td>
                        <td>Reviews: 4.8/5 stars from 2,341 people</td>
                        <td>Probably a good choice</td>
                    </tr>
                </table>

                <h2>Data in the Digital World</h2>

                <h3>When You Use Apps, You Create Data</h3>
                <p>Every time you use your phone or computer, you're creating data:</p>

                <div class="code-block">Netflix:
- What show you watched: "Stranger Things"
- How long you watched: 45 minutes
- Did you finish the episode? No (paused at 34:23)
- Rating: 5 stars

Instagram:
- Photo you posted: image file
- Caption: "Beautiful sunset!"
- Time posted: 6:47 PM
- Location: Miami Beach
- Likes: 127
- Comments: 15

Amazon:
- Product you viewed: "Wireless Headphones"
- Price when you looked: $79.99
- Did you buy it? Not yet
- Items in your cart: 3 items
- Total cart value: $156.47</div>

                <h3>Why Companies Collect This Data</h3>
                <p>Companies use this data to:</p>
                <ul style="margin: 1rem 0; margin-left: 2rem;">
                    <li><strong>Understand you better:</strong> Netflix learns you like sci-fi shows, so it recommends more</li>
                    <li><strong>Improve their product:</strong> If 80% of users can't find a button, they redesign it</li>
                    <li><strong>Make money:</strong> Amazon shows you ads for products you might actually want</li>
                    <li><strong>Fix problems:</strong> If the app crashes for 1,000 users, they know something is wrong</li>
                </ul>

                <h2>Organized vs Messy Data</h2>

                <h3>The Messy Kitchen Example</h3>
                <p>Imagine two kitchens:</p>

                <div class="code-block">Messy Kitchen:
- Flour in 3 different containers (1 in pantry, 1 on counter, 1 in fridge)
- Sugar mixed with salt (can't tell which is which)
- Recipe cards scattered everywhere
- Some ingredients expired (but you don't know which ones)

Result: Cooking takes FOREVER. You can't find anything.
You might use expired ingredients and get sick!

---

Organized Kitchen:
- All flour in ONE labeled container
- Sugar and salt in separate, labeled jars
- Recipe cards in a neat folder
- Expiration dates clearly marked

Result: Cooking is fast and easy. Everything is where it should be.
You always use fresh ingredients!</div>

                <p><strong>This is exactly what happens with data!</strong> Messy data makes everything slow and causes mistakes. Organized data makes everything fast and accurate.</p>

                <h2>Real Example: Your Contact List</h2>

                <p>Look at your phone's contact list. That's organized data!</p>

                <div class="code-block">Messy way (imagine if your phone did this):
- Some contacts saved as "Mom", some as "Mother", some as "Mommy"
- Phone numbers with different formats: (123) 456-7890, 123-456-7890, 1234567890
- Some people saved twice with different numbers
- No way to search or sort

Organized way (how your phone actually works):
- Each contact has ONE entry
- Name stored separately: First Name, Last Name
- Phone numbers in consistent format
- Easy to search: just type "Mom"
- Easy to sort: alphabetically or by recent calls</div>

                <h2>Summary</h2>
                <ul style="margin: 1rem 0; margin-left: 2rem;">
                    <li>Data is just information - numbers, words, dates, true/false values</li>
                    <li>You work with data every day without realizing it</li>
                    <li>Data helps us make better decisions (like choosing a restaurant or checking the weather)</li>
                    <li>Digital apps collect data to understand users and improve products</li>
                    <li>Organized data is fast and accurate; messy data is slow and causes errors</li>
                </ul>

                <p>Now that you understand what data is, the next lesson will teach you what Data Engineering is all about!</p>
            `,
            interviews: [
                {
                    question: "What is data?",
                    answer: "Data is information that you can write down, measure, or observe. Examples include numbers (age, price), text (names, addresses), true/false values (yes/no questions), and dates/times (birthdays, appointment times)."
                },
                {
                    question: "What are the main types of data?",
                    answer: "The main types are: 1) Numbers (quantities, measurements), 2) Text (words, names, descriptions), 3) True/False (yes/no, on/off), and 4) Dates/Times (when things happened)."
                },
                {
                    question: "Why is organized data better than messy data?",
                    answer: "Organized data is faster to search, easier to understand, and less likely to cause errors. Like an organized kitchen versus a messy one - you can find what you need quickly and know ingredients are fresh. Messy data causes mistakes, is slow to work with, and might have duplicates or missing information."
                },
                {
                    question: "How do you create data when using apps?",
                    answer: "Every action creates data: watching a show on Netflix (what you watched, how long), posting on Instagram (photo, caption, time, location), shopping on Amazon (what you viewed, what you bought, when you bought it). Apps collect this to understand users and improve their service."
                },
                {
                    question: "Why do companies collect data?",
                    answer: "Companies collect data to: understand their users better (personalized recommendations), improve their products (fix bugs, redesign confusing features), make money (show relevant ads), and fix problems (detect crashes or issues affecting many users)."
                }
            ]
        },
        {
            id: 'what-is-data-engineering',
            title: 'What is Data Engineering? - The Foundation',
            duration: '45 min',
            content: `
                <h2>What is Data Engineering?</h2>
                <p>Remember how we learned that organized data is better than messy data? <strong>Data engineering is the job of organizing, moving, and managing data so that it's useful.</strong></p>

                <h3>The Water Pipes Analogy</h3>
                <p>Think of data like water in your house:</p>

                <div class="code-block">Your House Water System:
- Water Source: Water comes from a reservoir or well (where water starts)
- Pipes: Water flows through pipes to your house (how water moves)
- Water Treatment: Water is cleaned and filtered (making water safe)
- Faucets: Water comes out when you turn on the tap (using water)
- Storage: Water tank stores water for when you need it (keeping water ready)

A Data System (exactly the same idea!):
- Data Source: Data comes from apps, websites, sensors (where data starts)
- Data Pipelines: Data flows through connections (how data moves)
- Data Cleaning: Data is checked and fixed (making data accurate)
- Data Access: People can query/view data when needed (using data)
- Data Storage: Databases store data for later use (keeping data ready)</div>

                <p><strong>A data engineer is like a plumber.</strong> Plumbers make sure water flows reliably from the source to your faucet. Data engineers make sure data flows reliably from apps to where people need it.</p>

                <h2>Why Do We Need Data Engineers?</h2>

                <h3>Simple Example: Online Store</h3>
                <p>Let's say you run a simple online store that sells shoes. Here's what happens:</p>

                <div class="code-block">Customer buys a pair of shoes:

1. Customer clicks "Buy Now" on website
   → Creates data: order ID, customer name, shoe size, price, time

2. Payment is processed
   → Creates data: payment status, transaction ID, payment method

3. Warehouse ships the shoes
   → Creates data: shipping address, tracking number, carrier

4. Customer receives shoes
   → Creates data: delivery confirmation, delivery time

Now you have data in 4 different places!
- Website database
- Payment processor (like Stripe)
- Warehouse system
- Shipping company</div>

                <h3>The Problem Without Data Engineering</h3>
                <p>Your boss asks a simple question: <strong>"How many shoes did we sell this month?"</strong></p>

                <div class="code-block">Without a data engineer:

You have to manually:
1. Log into the website database → count orders
2. Log into payment system → count successful payments
3. Check warehouse system → count shipped items
4. Compare all three → they don't match! Why?
   - 5 orders were placed but payments failed
   - 2 orders were paid but not shipped yet
   - 1 order was returned

This takes you 4 HOURS to answer a simple question.
And the answer might still be wrong!</div>

                <div class="code-block">WITH a data engineer:

Data engineer builds a system that:
1. Automatically collects data from all 4 systems every hour
2. Combines them into one organized place
3. Cleans the data (removes duplicates, fixes errors)
4. Makes it easy to search

Now answering "How many shoes sold?" takes 10 SECONDS.
Boss: "How many shoes sold this month?"
You: *runs query* "1,247 pairs of shoes"
Boss: "Great! How about last month?"
You: *runs query* "1,089 pairs"
Boss: "Which shoe is most popular?"
You: *runs query* "Nike Air Max, 234 sold"

All in under 1 minute. This is the power of data engineering!</div>

                <h2>What Does a Data Engineer Do? (Three Main Jobs)</h2>

                <h3>Job 1: Collect Data (Data Ingestion)</h3>
                <p>Data engineers build systems to automatically collect data from different sources.</p>

                <div class="code-block">Example sources:
- Website: Customer clicks, page views, searches
- Mobile app: Button taps, screen views, crashes
- Payment system: Transactions, refunds, failed payments
- Warehouse: Inventory levels, shipments, returns
- Customer service: Support tickets, complaints, feedback

How data engineer collects it:
- Set up automatic connections (every hour, or every minute)
- Data flows automatically (like water through pipes)
- No manual copying or downloading needed</div>

                <h3>Job 2: Clean and Organize Data (Data Transformation)</h3>
                <p>Raw data is usually messy. Data engineers clean it up.</p>

                <div class="code-block">Example of messy data:

From website:
Customer name: "john smith"
Phone: "5551234567"
State: "NY"

From warehouse:
Customer name: "John Smith"
Phone: "(555) 123-4567"
State: "New York"

From payment:
Customer name: "JOHN SMITH"
Phone: "555-123-4567"
State: "ny"

Problem: Same customer, but written differently!
Computer thinks these are 3 different people.

Data engineer fixes this:
- Standardize name format: "John Smith"
- Standardize phone: "(555) 123-4567"
- Standardize state: "NY" (always use abbreviation)

Now computer knows it's the same person!</div>

                <h3>Job 3: Store Data (Data Storage)</h3>
                <p>Data engineers decide where to store data so it's fast and easy to find.</p>

                <div class="code-block">Like organizing a library:

Bad library (messy):
- Books thrown in random piles
- No system to find books
- Takes 1 hour to find a book

Good library (organized):
- Books sorted by category (Fiction, Science, History)
- Each book has a location code
- Index system to search
- Takes 30 seconds to find a book

Data storage works the same way:
- Organize data into categories (customers, orders, products)
- Create fast search systems
- Make it easy for people to find what they need</div>

                <h2>Real-World Examples</h2>

                <h3>Netflix: Recommendations</h3>
                <p>Ever wonder how Netflix knows what shows you might like?</p>

                <div class="code-block">What Netflix data engineers do:

1. Collect data from millions of users:
   - What shows you watch
   - When you pause or stop watching
   - What you rate 5 stars
   - What you add to your list

2. Organize this data:
   - Store viewing history for 230+ million users
   - Process data every few minutes
   - Make it searchable

3. Use data to recommend shows:
   - "You watched Stranger Things"
   - "Other people who watched Stranger Things also liked..."
   - Show you recommendations instantly

Without data engineers: Recommendations would be random or take forever to load.</div>

                <h3>Uber: Finding Nearby Drivers</h3>
                <div class="code-block">When you request an Uber:

1. Collect data:
   - Your location: "123 Main St, New York"
   - Nearby drivers: 47 drivers within 1 mile
   - Their locations: updated every 4 seconds
   - Traffic conditions: current wait times

2. Process data instantly:
   - Find closest available driver
   - Calculate estimated arrival time
   - Consider driver ratings

3. Show you the result:
   - "John will arrive in 3 minutes"
   - "Toyota Camry, license plate ABC-123"

All of this happens in under 2 seconds!
Data engineers build systems that handle millions of requests per day.</div>

                <h3>Spotify: Your Personalized Playlists</h3>
                <div class="code-block">Spotify's "Discover Weekly" playlist:

1. Collect your listening data:
   - Songs you play on repeat
   - Songs you skip
   - Artists you follow
   - Playlists you create

2. Combine with data from millions of users:
   - People with similar taste to you
   - What they're listening to
   - New songs they discovered

3. Create your personalized playlist:
   - 30 songs you've never heard
   - But likely to enjoy
   - Updated every Monday

This requires processing billions of song plays per week.
Data engineers make this possible!</div>

                <h2>The Data Engineer's Toolkit (Simple Overview)</h2>

                <h3>Tools Data Engineers Use</h3>
                <p>Don't worry about learning all these now - just know they exist:</p>

                <table class="table">
                    <tr>
                        <th>Tool Type</th>
                        <th>What It Does</th>
                        <th>Real-Life Comparison</th>
                    </tr>
                    <tr>
                        <td>Databases</td>
                        <td>Store organized data</td>
                        <td>Filing cabinet with labeled folders</td>
                    </tr>
                    <tr>
                        <td>Pipelines</td>
                        <td>Move data from one place to another</td>
                        <td>Conveyor belt in a factory</td>
                    </tr>
                    <tr>
                        <td>Warehouses</td>
                        <td>Store huge amounts of data for analysis</td>
                        <td>Giant library with millions of books</td>
                    </tr>
                    <tr>
                        <td>Schedulers</td>
                        <td>Run tasks automatically at set times</td>
                        <td>Alarm clock that runs tasks</td>
                    </tr>
                </table>

                <h2>Data Engineer vs Other Roles</h2>

                <table class="table">
                    <tr>
                        <th>Role</th>
                        <th>What They Do</th>
                        <th>Analogy</th>
                    </tr>
                    <tr>
                        <td><strong>Data Engineer</strong></td>
                        <td>Build systems to collect, move, and organize data</td>
                        <td>Plumber: Makes sure water (data) flows to the right places</td>
                    </tr>
                    <tr>
                        <td>Data Analyst</td>
                        <td>Look at data to answer business questions</td>
                        <td>Detective: Uses water (data) to solve mysteries</td>
                    </tr>
                    <tr>
                        <td>Data Scientist</td>
                        <td>Build models to predict future trends</td>
                        <td>Fortune teller: Uses water (data) to predict the future</td>
                    </tr>
                    <tr>
                        <td>Software Engineer</td>
                        <td>Build apps and websites users interact with</td>
                        <td>Architect: Designs the house where water is used</td>
                    </tr>
                </table>

                <p><strong>All these roles need data to do their jobs. Data engineers make sure everyone has the data they need!</strong></p>

                <h2>Summary</h2>
                <ul style="margin: 1rem 0; margin-left: 2rem;">
                    <li>Data engineering is about collecting, cleaning, and organizing data</li>
                    <li>Data engineers are like plumbers - they make sure data flows reliably</li>
                    <li>Three main jobs: Collect data (ingestion), Clean data (transformation), Store data (storage)</li>
                    <li>Real companies like Netflix, Uber, and Spotify rely heavily on data engineers</li>
                    <li>Data engineers build systems that make data easy and fast to use</li>
                </ul>

                <p>In the next lesson, we'll learn about <strong>data pipelines</strong> - how data actually moves from one place to another!</p>
            `,
            interviews: [
                {
                    question: "What is data engineering?",
                    answer: "Data engineering is the job of organizing, moving, and managing data so it's useful. Like a plumber ensures water flows reliably to your faucet, a data engineer ensures data flows reliably from sources (apps, websites) to where people need it."
                },
                {
                    question: "What are the three main jobs of a data engineer?",
                    answer: "1) Collect data (ingestion) - automatically gather data from different sources like websites, apps, payment systems. 2) Clean and organize data (transformation) - fix messy data, standardize formats, remove duplicates. 3) Store data (storage) - organize data so it's fast and easy to find, like organizing a library."
                },
                {
                    question: "Why is data engineering important for companies like Netflix?",
                    answer: "Netflix collects viewing data from 230+ million users (what you watch, when you pause, ratings). Data engineers organize this massive amount of data and process it quickly so Netflix can give you personalized recommendations instantly. Without data engineers, recommendations would be random or take forever to load."
                },
                {
                    question: "How does data engineering help answer business questions faster?",
                    answer: "Without data engineering, answering 'How many shoes did we sell?' requires manually checking multiple systems (website, payment, warehouse, shipping), taking hours and risking errors. With data engineering, all data is automatically collected, cleaned, and organized in one place, so the same question takes 10 seconds to answer accurately."
                },
                {
                    question: "What's the difference between a data engineer and a data analyst?",
                    answer: "Data engineers build the systems to collect, move, and organize data (like a plumber making sure water flows). Data analysts use that organized data to answer business questions and find insights (like a detective solving mysteries). Analysts need engineers to provide them with clean, organized data."
                }
            ]
        },
        {
            id: 'data-pipelines',
            title: 'Data Pipelines - How Data Flows',
            duration: '50 min',
            content: `
                <h2>What is a Data Pipeline?</h2>
                <p>A <strong>data pipeline</strong> is a system that automatically moves data from one place to another, step by step. Think of it like an assembly line in a factory.</p>

                <h3>The Assembly Line Analogy</h3>
                <p>Imagine a car factory:</p>

                <div class="code-block">Step 1: Raw Materials Arrive
- Steel, rubber, glass, plastic
- Everything is unorganized and raw

Step 2: Assembly Line Stations
- Station 1: Build the frame
- Station 2: Add the engine
- Station 3: Install wheels
- Station 4: Paint the car
- Station 5: Add seats and interior

Step 3: Quality Check
- Inspect everything works
- Fix any problems
- Polish and clean

Step 4: Finished Car
- Ready to drive
- Sent to showroom

Each step happens automatically, in order, every time.</div>

                <p><strong>A data pipeline works the same way!</strong> Raw data enters, goes through multiple processing steps, gets cleaned and organized, and comes out ready to use.</p>

                <h2>A Simple Data Pipeline Example</h2>

                <h3>E-Commerce Store: Processing Orders</h3>
                <p>Let's say you run an online store. Here's what happens when someone buys something:</p>

                <div class="code-block">Step 1: Data Arrives (Source)
Customer clicks "Buy Now"
Raw data created:
{
  "customer": "john123",
  "item": "shoes",
  "price": "49.99",
  "time": "1704067199"
}

Step 2: Clean the Data (Transform)
Fix the format:
{
  "customer_id": "john123",
  "product_name": "shoes",
  "price_usd": 49.99,
  "order_time": "2024-01-01 10:00:00"
}

Step 3: Add Extra Information (Enrich)
Look up customer details:
{
  "customer_id": "john123",
  "customer_name": "John Smith",
  "customer_email": "john@email.com",
  "product_name": "shoes",
  "price_usd": 49.99,
  "order_time": "2024-01-01 10:00:00"
}

Step 4: Store in Database (Destination)
Save to "orders" table
Now analysts can query: "How many shoes sold today?"</div>

                <h2>The Three Parts of Every Pipeline</h2>

                <h3>1. Extract (Get the Data)</h3>
                <p>Pull data from where it lives.</p>

                <div class="code-block">Sources you might extract from:
- Website database: User signups, orders, clicks
- Mobile app: Button taps, screens viewed
- Email service: Emails sent, opens, clicks
- Payment system: Transactions, refunds
- Spreadsheets: Manual uploads from sales team

Example:
Every hour, pull all new orders from the website database.</div>

                <h3>2. Transform (Clean and Organize)</h3>
                <p>Fix, clean, and organize the data.</p>

                <div class="code-block">Common transformations:

1. Fix formatting:
   "john smith" → "John Smith"
   "5551234567" → "(555) 123-4567"

2. Remove duplicates:
   Order #123 appears twice → Keep only one

3. Handle missing data:
   Email is blank → Fill with "no_email@unknown.com"

4. Combine data:
   Join customer info + order info → Complete record

5. Calculate new fields:
   Order total = price × quantity
   Age = current year - birth year</div>

                <h3>3. Load (Put Data Where It's Needed)</h3>
                <p>Save the cleaned data somewhere useful.</p>

                <div class="code-block">Common destinations:

- Data Warehouse: For analysis and reports
  Example: Store all orders for last 5 years

- Dashboard Database: For real-time displays
  Example: Today's sales total, updated every minute

- Email System: Trigger notifications
  Example: Send "Order confirmed" email to customer

- Analytics Tool: For business intelligence
  Example: Load into Tableau for sales charts</div>

                <p>These three steps together are called <strong>ETL: Extract, Transform, Load.</strong></p>

                <h2>Real Pipeline Example: YouTube Video Upload</h2>

                <p>Ever wonder what happens when you upload a video to YouTube? There's a complex pipeline running behind the scenes:</p>

                <div class="code-block">Step 1: Extract - You upload video
- Raw video file: large, uncompressed
- Your video might be 2 GB

Step 2: Transform - YouTube processes it
- Convert to multiple formats (1080p, 720p, 480p, 360p)
- Create thumbnail images
- Extract audio for different quality levels
- Scan video for copyrighted content
- Generate captions automatically

Step 3: Load - Store processed video
- Store video files in multiple locations worldwide
- Add to search index
- Update your channel page
- Notify subscribers

All of this happens automatically in 5-15 minutes!
Without a pipeline, YouTube would need employees to manually
process each upload. With 500 hours uploaded per minute,
that's impossible.</div>

                <h2>Pipeline Schedules: When Does It Run?</h2>

                <h3>1. Batch Processing (Scheduled)</h3>
                <p>Pipeline runs at specific times, processing all data at once.</p>

                <div class="code-block">Examples:

Daily at 3 AM:
- Process yesterday's sales
- Generate daily reports
- Send summary emails

Every hour:
- Pull new customer signups
- Update product inventory
- Sync with warehouse

Weekly on Sunday:
- Generate weekly sales report
- Calculate employee hours
- Backup all data

Use when: You don't need real-time data, can wait for scheduled updates.</div>

                <h3>2. Real-Time Processing (Streaming)</h3>
                <p>Pipeline runs continuously, processing data as it arrives.</p>

                <div class="code-block">Examples:

Uber: Driver locations
- Update every 4 seconds
- Show riders where driver is RIGHT NOW
- Can't wait for batch processing

Credit card fraud detection:
- Check every transaction immediately
- Block suspicious charges in milliseconds
- Waiting an hour could cost millions

Stock trading:
- Process trades instantly
- Prices change every second
- Real-time is critical

Use when: You need immediate results, can't wait for scheduled runs.</div>

                <h2>What Can Go Wrong?</h2>

                <h3>Common Pipeline Problems</h3>

                <div class="code-block">Problem 1: Source Changes
What happens:
- API changes format unexpectedly
- Database column renamed
- New required field added

Result: Pipeline breaks, data stops flowing

Example:
Payment API changed "amount" to "total_amount"
Your pipeline still looks for "amount"
Error: Field not found! Pipeline fails.

Fix: Add monitoring to detect changes early</div>

                <div class="code-block">Problem 2: Bad Data
What happens:
- User enters invalid phone number
- Price is negative
- Date is in the future

Result: Pipeline crashes or produces bad results

Example:
Customer enters phone: "CALL ME"
Your pipeline expects numbers only
Error: Cannot convert "CALL ME" to phone format

Fix: Add validation - check data before processing</div>

                <div class="code-block">Problem 3: Too Much Data
What happens:
- Sudden spike in traffic
- Black Friday sales rush
- Viral video causes huge traffic

Result: Pipeline slows down or crashes

Example:
Normal: 1,000 orders per hour (pipeline handles fine)
Black Friday: 50,000 orders per hour (pipeline crashes)

Fix: Design pipeline to scale up when needed</div>

                <h2>Building a Simple Pipeline (Conceptual Example)</h2>

                <p>Let's design a pipeline for a simple task: Track daily website visitors.</p>

                <div class="code-block">Goal: Answer "How many people visited our website today?"

Step 1: Extract (Every hour)
- Pull website logs from server
- Format: timestamp, IP address, page visited

Step 2: Transform
- Remove bot traffic (Google crawler, etc.)
- Remove duplicate IPs (same person refreshing)
- Count unique visitors
- Group by hour

Step 3: Load
- Store in "daily_visitors" table
- Columns: date, hour, visitor_count

Step 4: Use the Data
- Dashboard shows: "Today: 1,247 visitors"
- Compare to yesterday: "Up 12% from yesterday"

Pipeline runs automatically every hour.
You wake up, check dashboard, see results!</div>

                <h2>Pipeline Best Practices</h2>

                <table class="table">
                    <tr>
                        <th>Practice</th>
                        <th>Why It Matters</th>
                        <th>Example</th>
                    </tr>
                    <tr>
                        <td>Idempotent</td>
                        <td>Running twice produces same result</td>
                        <td>If pipeline runs twice on same data, don't create duplicates</td>
                    </tr>
                    <tr>
                        <td>Monitored</td>
                        <td>Know when something breaks</td>
                        <td>Get alert if pipeline hasn't run in 2 hours</td>
                    </tr>
                    <tr>
                        <td>Logged</td>
                        <td>Debug problems easily</td>
                        <td>Record: "Processed 1,000 records at 3:00 AM"</td>
                    </tr>
                    <tr>
                        <td>Tested</td>
                        <td>Catch bugs before production</td>
                        <td>Test with sample data before running on real data</td>
                    </tr>
                </table>

                <h2>Summary</h2>
                <ul style="margin: 1rem 0; margin-left: 2rem;">
                    <li>Data pipelines automatically move and process data from source to destination</li>
                    <li>Like an assembly line: raw data → processing → finished product</li>
                    <li>ETL = Extract (get data), Transform (clean data), Load (store data)</li>
                    <li>Batch processing runs on schedule (hourly, daily); streaming is real-time</li>
                    <li>Common problems: source changes, bad data, too much data</li>
                    <li>Good pipelines are monitored, logged, tested, and idempotent</li>
                </ul>

                <p>Next lesson: We'll learn about <strong>data storage</strong> - where all this data actually lives!</p>
            `,
            interviews: [
                {
                    question: "What is a data pipeline?",
                    answer: "A data pipeline is a system that automatically moves data from one place to another, step by step. Like an assembly line in a factory that takes raw materials and produces a finished car, a data pipeline takes raw data, processes it, cleans it, and delivers it ready to use."
                },
                {
                    question: "What does ETL stand for and what does it mean?",
                    answer: "ETL stands for Extract, Transform, Load. Extract means getting data from sources (databases, APIs, files). Transform means cleaning and organizing the data (fixing formats, removing duplicates, combining data). Load means putting the processed data somewhere useful (data warehouse, dashboard, analytics tool)."
                },
                {
                    question: "What's the difference between batch and real-time processing?",
                    answer: "Batch processing runs at specific scheduled times (like daily at 3 AM) and processes all data at once. Real-time (streaming) processing runs continuously, processing data immediately as it arrives. Use batch when you can wait for scheduled updates (daily reports). Use real-time when you need immediate results (fraud detection, Uber driver locations)."
                },
                {
                    question: "What are common problems that can break a data pipeline?",
                    answer: "Common problems: 1) Source changes - API changes format or field names unexpectedly. 2) Bad data - invalid input like text in a number field. 3) Too much data - sudden traffic spike overwhelms the pipeline. Fixes include monitoring to detect changes, validation to check data, and designing pipelines to scale."
                },
                {
                    question: "Why does YouTube need a data pipeline for video uploads?",
                    answer: "When you upload a video, YouTube's pipeline automatically: converts it to multiple formats (1080p, 720p, etc.), creates thumbnails, extracts audio, scans for copyright, generates captions, and stores copies worldwide. Without this automated pipeline, YouTube couldn't handle 500 hours of video uploaded per minute - manual processing would be impossible."
                }
            ]
        },
        {
            id: 'data-storage',
            title: 'Data Storage - Where Data Lives',
            duration: '50 min',
            content: `
                <h2>Where Does Data Live?</h2>
                <p>All that data we've been talking about needs to be stored somewhere. <strong>Data storage</strong> is like choosing the right container for your stuff - you wouldn't store shoes in the refrigerator or milk in your closet!</p>

                <h3>The Filing Cabinet Analogy</h3>
                <p>Think about organizing your home office:</p>

                <div class="code-block">Active Files (Daily Use):
- Today's bills to pay → On your desk
- Current project documents → Top drawer
- Phone numbers you use often → Sticky note on wall

Need: FAST access, small amount

---

Archive Files (Monthly/Yearly):
- Tax returns from past 5 years → Filing cabinet
- Old bank statements → Storage box
- Receipts organized by year → Labeled folders

Need: Organized storage, larger amount

---

Backup/Rarely Used:
- Documents from 10 years ago → Basement storage
- Old photos → Attic boxes
- Just-in-case paperwork → Garage shelves

Need: Cheap storage, huge amount</div>

                <p><strong>Data storage works exactly the same way!</strong> Different types of data need different types of storage.</p>

                <h2>Types of Data Storage</h2>

                <h3>1. Databases - The Filing Cabinet</h3>
                <p>Databases store organized data that you need to access quickly and frequently.</p>

                <div class="code-block">What databases are good for:
- User accounts (login info, passwords)
- Current orders (today's sales)
- Product catalog (what's in stock)
- Shopping carts (what customers are buying RIGHT NOW)

Why use databases:
✓ Very fast to find specific data
✓ Can update data easily
✓ Organized into tables and rows
✓ Good for "active" data you use constantly

Example - Online Store Database:

Table: customers
| ID  | Name        | Email            | Joined     |
|-----|-------------|------------------|------------|
| 1   | John Smith  | john@email.com   | 2024-01-15 |
| 2   | Jane Doe    | jane@email.com   | 2024-01-20 |

Table: orders
| Order ID | Customer ID | Product | Price | Date       |
|----------|-------------|---------|-------|------------|
| 1001     | 1           | Shoes   | 49.99 | 2024-01-25 |
| 1002     | 2           | Shirt   | 29.99 | 2024-01-26 |</div>

                <h3>2. Data Warehouses - The Library</h3>
                <p>Data warehouses store huge amounts of organized data for analysis and reporting.</p>

                <div class="code-block">What data warehouses are good for:
- Historical data (all sales from past 5 years)
- Complex analysis (which products sell best in winter?)
- Business reports (monthly revenue by region)
- Combining data from many sources

Why use data warehouses:
✓ Store massive amounts of data
✓ Optimized for complex queries
✓ Combine data from multiple databases
✓ Great for analytics and business intelligence

Example - Sales Analysis:
Query: "Show me total revenue by product category for each month in 2023"

Result:
| Month   | Electronics | Clothing | Books  |
|---------|-------------|----------|--------|
| Jan     | $125,000    | $78,000  | $45,000|
| Feb     | $134,000    | $82,000  | $43,000|
| ...

This query might scan millions of rows!
Data warehouse handles it in seconds.</div>

                <h3>3. Data Lakes - The Storage Unit</h3>
                <p>Data lakes store EVERYTHING - organized or not, structured or not. Cheap and massive.</p>

                <div class="code-block">What data lakes are good for:
- Raw logs (every click on website, billions of events)
- Images and videos (profile pictures, uploaded content)
- Backups (just-in-case copies of everything)
- Future analysis ("we might need this someday")

Why use data lakes:
✓ Very cheap to store massive amounts
✓ Can store any format (JSON, CSV, images, videos)
✓ No need to organize upfront
✓ Keep everything "just in case"

Example - Website Logs:
Store every single click on your website:
- 10 million clicks per day
- Raw JSON format
- Kept for 2 years
- Rarely accessed, but available if needed

Cost in data lake: ~$100/month
Same data in database: ~$10,000/month!</div>

                <h3>4. Caches - The Sticky Note</h3>
                <p>Caches store data temporarily for super-fast access. Like writing a phone number on a sticky note instead of looking it up in a phonebook.</p>

                <div class="code-block">What caches are good for:
- Frequently accessed data (product page views)
- Temporary data (shopping cart contents)
- API responses (weather data that changes hourly)
- Session information (user login status)

Why use caches:
✓ EXTREMELY fast (milliseconds)
✓ Reduces load on main database
✓ Temporary - data can disappear
✓ Good for data that's frequently read

Example - Product Page:
Without cache:
- User visits product page
- Query database for product details
- Query database for reviews
- Query database for related products
- Total time: 500ms

With cache:
- Check cache first
- If data is there (cache hit), return instantly
- Total time: 20ms

25x faster!</div>

                <h2>Comparing Storage Types</h2>

                <table class="table">
                    <tr>
                        <th>Type</th>
                        <th>Speed</th>
                        <th>Cost</th>
                        <th>Size</th>
                        <th>Use For</th>
                    </tr>
                    <tr>
                        <td><strong>Cache</strong></td>
                        <td>Fastest</td>
                        <td>Most expensive</td>
                        <td>Small (GB)</td>
                        <td>Frequently accessed data</td>
                    </tr>
                    <tr>
                        <td><strong>Database</strong></td>
                        <td>Fast</td>
                        <td>Expensive</td>
                        <td>Medium (TB)</td>
                        <td>Active operational data</td>
                    </tr>
                    <tr>
                        <td><strong>Data Warehouse</strong></td>
                        <td>Medium</td>
                        <td>Medium</td>
                        <td>Large (TB-PB)</td>
                        <td>Historical data, analytics</td>
                    </tr>
                    <tr>
                        <td><strong>Data Lake</strong></td>
                        <td>Slower</td>
                        <td>Cheapest</td>
                        <td>Huge (PB+)</td>
                        <td>Everything, raw data, backups</td>
                    </tr>
                </table>

                <p><em>Note: GB = Gigabyte (1,000 MB), TB = Terabyte (1,000 GB), PB = Petabyte (1,000 TB)</em></p>

                <h2>How Data is Organized: Tables</h2>

                <h3>Understanding Tables (Spreadsheet Style)</h3>
                <p>Most data is stored in <strong>tables</strong>, just like a spreadsheet:</p>

                <div class="code-block">Table: users
┌────┬─────────────┬──────────────────┬────────┬─────────────┐
│ ID │ Name        │ Email            │ Age    │ City        │
├────┼─────────────┼──────────────────┼────────┼─────────────┤
│ 1  │ John Smith  │ john@email.com   │ 28     │ New York    │
│ 2  │ Jane Doe    │ jane@email.com   │ 34     │ Los Angeles │
│ 3  │ Bob Wilson  │ bob@email.com    │ 45     │ Chicago     │
└────┴─────────────┴──────────────────┴────────┴─────────────┘

Vocabulary:
- Row (Record): One complete entry (one person)
- Column (Field): One type of information (all names)
- Cell: One piece of data (John's age: 28)
- Primary Key: Unique identifier (ID column)</div>

                <h3>Connecting Tables (Relationships)</h3>
                <p>Tables can reference each other:</p>

                <div class="code-block">Table: users
┌────┬─────────────┐
│ ID │ Name        │
├────┼─────────────┤
│ 1  │ John Smith  │
│ 2  │ Jane Doe    │
└────┴─────────────┘

Table: orders
┌──────────┬─────────────┬──────────┬────────┐
│ Order ID │ User ID     │ Product  │ Price  │
├──────────┼─────────────┼──────────┼────────┤
│ 1001     │ 1           │ Shoes    │ 49.99  │
│ 1002     │ 2           │ Shirt    │ 29.99  │
│ 1003     │ 1           │ Hat      │ 19.99  │
└──────────┴─────────────┴──────────┴────────┘

User ID in orders table connects to ID in users table.
This tells us: John Smith (ID 1) ordered Shoes AND Hat.</div>

                <h2>Real-World Example: Instagram's Data Storage</h2>

                <p>Instagram uses different storage types for different needs:</p>

                <div class="code-block">Cache (Redis):
- User feed (posts from people you follow)
- Loaded in milliseconds when you open the app
- Updates frequently as friends post new content

Database (PostgreSQL):
- User accounts (username, password, bio)
- Follower relationships (who follows who)
- Photo metadata (caption, timestamp, likes count)
- Needs fast read/write, updates constantly

Data Warehouse (Data warehouse):
- All posts from past 5 years
- Analyze: "Which filters are most popular?"
- Business intelligence: "How many daily active users?"
- Updated once per day, massive complex queries

Data Lake (Amazon S3):
- Actual photo/video files (billions of images)
- Raw logs (every tap, swipe, scroll)
- Backups of everything
- Cheap storage for huge amounts of data</div>

                <h2>Choosing the Right Storage</h2>

                <h3>Decision Tree</h3>

                <div class="code-block">Question 1: Do you need it RIGHT NOW, all the time?
YES → Use Cache (or Database)
  Example: Shopping cart, user session

NO → Go to Question 2

---

Question 2: Do you need to update it frequently?
YES → Use Database
  Example: Product inventory, user profiles

NO → Go to Question 3

---

Question 3: Do you need to run complex analysis on it?
YES → Use Data Warehouse
  Example: Sales reports, business intelligence

NO → Use Data Lake
  Example: Logs, backups, raw files</div>

                <h2>Summary</h2>
                <ul style="margin: 1rem 0; margin-left: 2rem;">
                    <li>Different data needs different storage: cache (fastest), database (active data), warehouse (analytics), lake (everything)</li>
                    <li>Caches are like sticky notes - temporary, fast access</li>
                    <li>Databases are like filing cabinets - organized, frequently used data</li>
                    <li>Data warehouses are like libraries - huge amounts of organized historical data</li>
                    <li>Data lakes are like storage units - cheap, massive, unorganized storage</li>
                    <li>Tables organize data in rows (records) and columns (fields)</li>
                </ul>

                <p>Next lesson: <strong>Data Quality</strong> - making sure your data is accurate and trustworthy!</p>
            `,
            interviews: [
                {
                    question: "What are the four main types of data storage?",
                    answer: "1) Cache - fastest, temporary storage for frequently accessed data (shopping carts, sessions). 2) Database - fast, organized storage for active data (user accounts, current orders). 3) Data Warehouse - large storage optimized for analytics (historical sales, business reports). 4) Data Lake - cheapest, massive storage for everything (logs, backups, raw files)."
                },
                {
                    question: "When should you use a cache versus a database?",
                    answer: "Use cache when you need extremely fast access (milliseconds) to frequently-read data that's okay to be temporary, like product page details or shopping cart contents. Use database when you need reliable, permanent storage for data that changes frequently and must be accurate, like user accounts or order information."
                },
                {
                    question: "What's the difference between a data warehouse and a data lake?",
                    answer: "Data warehouse stores organized, structured data optimized for complex queries and analytics (like sales analysis). Data lake stores everything in raw format - structured or not - and is much cheaper for massive amounts of data (like billions of log files or images). Warehouse is organized library, lake is storage unit."
                },
                {
                    question: "How do tables organize data?",
                    answer: "Tables organize data like spreadsheets: rows (records) represent individual entries (one person, one order), columns (fields) represent types of information (names, prices), cells contain individual data points. Tables can connect via primary keys (unique IDs) - for example, an orders table can reference a users table using user_id."
                },
                {
                    question: "How does Instagram use different storage types?",
                    answer: "Instagram uses: Cache (Redis) for user feeds that load instantly; Database (PostgreSQL) for user accounts and followers that update constantly; Data Warehouse for analyzing posts from years of history; Data Lake (S3) for billions of photo/video files and raw logs. Each storage type serves a different need for speed, cost, and data type."
                }
            ]
        },
        {
            id: 'data-quality',
            title: 'Data Quality - Keeping Data Clean and Accurate',
            duration: '50 min',
            content: `
                <h2>Why Data Quality Matters</h2>
                <p>You've probably heard the saying: <strong>"Garbage in, garbage out."</strong> If you put bad data into your system, you'll get bad results out. It's that simple.</p>

                <h3>The Recipe Disaster Example</h3>
                <p>Imagine following a cake recipe with bad data:</p>

                <div class="code-block">Original Recipe (Good Data):
- 2 cups flour
- 1 cup sugar
- 3 eggs
- 1 teaspoon vanilla
Result: Delicious cake!

Recipe with Bad Data:
- 2 cups flour (MISSING: is it self-rising or all-purpose?)
- 1 cup sugar (ERROR: written as "1 cuo suagr")
- 3 eggs (DUPLICATE: listed twice, you add 6 eggs)
- null vanilla (MISSING: you skip it)
Result: Disgusting, inedible mess!

Same with data: bad input = bad output.</div>

                <h2>Common Data Quality Problems</h2>

                <h3>1. Missing Data (Nulls)</h3>
                <p>Data that should be there... but isn't.</p>

                <div class="code-block">Example - Customer Database:

| ID | Name       | Email          | Phone       |
|----|------------|----------------|-------------|
| 1  | John Smith | john@email.com | 555-1234    |
| 2  | Jane Doe   | (empty)        | 555-5678    |
| 3  | Bob Wilson | bob@email.com  | (empty)     |

Problems this causes:
- Can't email Jane Doe (no email)
- Can't call Bob Wilson (no phone)
- Can't calculate "% of users with email"

How to handle:
- Require fields when collecting data
- Set defaults: email = "unknown@unknown.com"
- Skip records with missing critical data</div>

                <h3>2. Duplicate Data</h3>
                <p>Same information stored multiple times.</p>

                <div class="code-block">Example - Same Customer, Multiple Entries:

| ID | Name        | Email            |
|----|-------------|------------------|
| 1  | John Smith  | john@email.com   |
| 2  | JOHN SMITH  | john@email.com   |
| 3  | J. Smith    | john@email.com   |

Problems this causes:
- Count customers: 3 (wrong! should be 1)
- Send email: John gets 3 copies of same email
- Loyalty points: Split across 3 accounts

How to fix:
- Standardize names before storing
- Check for existing email before creating new account
- Merge duplicate records</div>

                <h3>3. Inconsistent Formats</h3>
                <p>Same type of data, stored in different ways.</p>

                <div class="code-block">Example - Phone Numbers:

| ID | Name       | Phone           |
|----|------------|-----------------|
| 1  | John       | (555) 123-4567  |
| 2  | Jane       | 555-123-4567    |
| 3  | Bob        | 5551234567      |
| 4  | Alice      | +1-555-123-4567 |

Problems this causes:
- Search for "555-123-4567": only finds Jane (misses others)
- Export to calling system: format errors
- Count area codes: can't parse inconsistent formats

How to fix:
- Choose ONE standard format
- Convert all data to that format
- Validate input when collecting data</div>

                <h3>4. Invalid Data</h3>
                <p>Data that doesn't make sense.</p>

                <div class="code-block">Example - Product Inventory:

| Product | Price  | Quantity |
|---------|--------|----------|
| Shoes   | $49.99 | 150      |
| Shirt   | $-25   | 50       | ❌ Negative price!
| Hat     | $19.99 | -10      | ❌ Negative inventory!
| Pants   | $ABC   | 75       | ❌ Price is text!

Other examples of invalid data:
- Birth date: February 30, 2024 (doesn't exist)
- Age: 250 years old (impossible)
- Email: "not-an-email" (wrong format)
- Temperature: -500°F (impossible)

How to fix:
- Validate input: price must be > 0
- Check ranges: age must be between 0-120
- Verify formats: email must contain "@"</div>

                <h3>5. Outdated Data</h3>
                <p>Data that was correct once, but not anymore.</p>

                <div class="code-block">Example - Customer Addresses:

| ID | Name | Address              | Last Updated |
|----|------|----------------------|--------------|
| 1  | John | 123 Old St, NYC      | 2019-01-15   |

Today: 2024
John moved 5 years ago!
Package shipped to wrong address = unhappy customer

How to fix:
- Prompt users to update info periodically
- Mark data with "last verified" date
- Remove or flag very old data</div>

                <h2>Data Validation: Catching Bad Data Early</h2>

                <h3>Input Validation (When Data Enters)</h3>
                <p>Check data as soon as it's created - before it gets stored.</p>

                <div class="code-block">Example - User Signup Form:

Email field:
✓ Must contain "@"
✓ Must contain "." after @
✓ Can't be empty
✓ Can't be longer than 255 characters
✓ Can't already exist in database

Age field:
✓ Must be a number
✓ Must be between 0-120
✓ Can't be empty

Password:
✓ At least 8 characters
✓ Must contain letter and number
✓ Can't be "password123"

If ANY check fails → Show error, don't save data!</div>

                <h3>Pipeline Validation (When Data Moves)</h3>
                <p>Check data as it flows through pipelines.</p>

                <div class="code-block">Example - E-commerce Order Pipeline:

Step 1: Extract orders from website
Check: Did we get data? Is it in expected format?
If not: Alert team, stop pipeline

Step 2: Transform - clean the data
Check: Are all required fields present?
Check: Are prices positive numbers?
Check: Are dates in valid range?
If not: Log problem, skip bad records

Step 3: Load to warehouse
Check: Did all records load successfully?
Check: Total count matches source?
If not: Alert team, investigate mismatch</div>

                <h2>Real-World Data Quality Disasters</h2>

                <h3>Example 1: The $440 Million Typo</h3>
                <div class="code-block">Knight Capital (Stock Trading Company) - August 2012

What happened:
- Engineers deployed new trading software
- Old test code accidentally activated
- Test code had a bug: interpreted trades incorrectly
- Started buying high and selling low (backwards!)

Result:
- Lost $440 million in 45 minutes
- Company nearly went bankrupt
- All because of bad data in production

Lesson: Validate data before using it for critical decisions!</div>

                <h3>Example 2: Mars Climate Orbiter Crash</h3>
                <div class="code-block">NASA - September 1999

What happened:
- Two teams building spacecraft
- Team A used metric units (meters)
- Team B used imperial units (feet)
- Nobody validated the data was consistent
- Orbiter flew too close to Mars

Result:
- $327 million spacecraft destroyed
- Mission failed
- All because of inconsistent data units

Lesson: Standardize data formats across all systems!</div>

                <h3>Example 3: UK Post Office Scandal</h3>
                <div class="code-block">UK Post Office - 2000-2014

What happened:
- New computer system had bugs
- Showed incorrect money shortfalls
- Post Office trusted the data
- Accused 700+ postmasters of theft
- Many went to prison or paid fake "debts"

Result:
- Lives ruined
- Wrongful convictions
- All because bad data was trusted without validation

Lesson: Always question data that doesn't make sense!</div>

                <h2>Data Quality Checklist</h2>

                <table class="table">
                    <tr>
                        <th>Quality Check</th>
                        <th>Question to Ask</th>
                        <th>Example</th>
                    </tr>
                    <tr>
                        <td><strong>Completeness</strong></td>
                        <td>Is all required data present?</td>
                        <td>All customers have email addresses</td>
                    </tr>
                    <tr>
                        <td><strong>Accuracy</strong></td>
                        <td>Is the data correct?</td>
                        <td>Phone numbers are real and valid</td>
                    </tr>
                    <tr>
                        <td><strong>Consistency</strong></td>
                        <td>Is data in same format everywhere?</td>
                        <td>All dates use YYYY-MM-DD format</td>
                    </tr>
                    <tr>
                        <td><strong>Validity</strong></td>
                        <td>Does data follow rules?</td>
                        <td>Age between 0-120, price > 0</td>
                    </tr>
                    <tr>
                        <td><strong>Uniqueness</strong></td>
                        <td>Are there duplicates?</td>
                        <td>Each email appears only once</td>
                    </tr>
                    <tr>
                        <td><strong>Timeliness</strong></td>
                        <td>Is data current?</td>
                        <td>Updated within last 30 days</td>
                    </tr>
                </table>

                <h2>Tools and Techniques</h2>

                <h3>1. Data Profiling</h3>
                <p>Analyze your data to understand its quality.</p>

                <div class="code-block">Example - Profile "email" column:

Total records: 10,000
Null/missing: 500 (5%)
Duplicates: 75 (0.75%)
Invalid format: 120 (no "@" symbol)
Valid emails: 9,305 (93%)

Action: Fix the 695 bad records!</div>

                <h3>2. Data Cleansing</h3>
                <p>Fix bad data automatically.</p>

                <div class="code-block">Common fixes:

Trim whitespace:
"  john@email.com  " → "john@email.com"

Standardize case:
"JOHN SMITH" → "John Smith"

Remove duplicates:
Keep first occurrence, delete the rest

Fill missing values:
Age = null → Age = 0 (or average age)

Fix typos:
"Califronia" → "California" (spell check)</div>

                <h3>3. Monitoring</h3>
                <p>Watch for quality problems continuously.</p>

                <div class="code-block">Set up alerts:

Alert if:
- More than 1% of emails are invalid
- Null values increase suddenly
- Duplicates exceed 100 per day
- Average order value drops by 50% (might be data error!)

Get notified immediately, fix before it spreads!</div>

                <h2>Summary</h2>
                <ul style="margin: 1rem 0; margin-left: 2rem;">
                    <li>Data quality matters - garbage in, garbage out</li>
                    <li>Common problems: missing data, duplicates, inconsistent formats, invalid values, outdated data</li>
                    <li>Validate data early: at input, during pipelines, before use</li>
                    <li>Real disasters cost millions due to bad data quality</li>
                    <li>Check for completeness, accuracy, consistency, validity, uniqueness, timeliness</li>
                    <li>Use profiling to understand quality, cleansing to fix problems, monitoring to prevent issues</li>
                </ul>

                <p>Final lesson: <strong>Real-World Data Engineering</strong> - putting it all together!</p>
            `,
            interviews: [
                {
                    question: "What does 'garbage in, garbage out' mean in data engineering?",
                    answer: "It means if you put bad data into your system, you'll get bad results out. Like following a recipe with wrong measurements - you'll get a terrible cake. If your data has errors (missing values, duplicates, wrong formats), any analysis or decisions based on that data will be wrong."
                },
                {
                    question: "What are the most common data quality problems?",
                    answer: "1) Missing data (null values where data should exist). 2) Duplicates (same record stored multiple times). 3) Inconsistent formats (phone numbers as '555-1234' vs '(555) 123-4567'). 4) Invalid data (negative prices, impossible dates). 5) Outdated data (addresses from 5 years ago)."
                },
                {
                    question: "When should you validate data?",
                    answer: "Validate at three points: 1) Input validation - when data first enters (user signup forms, check email format immediately). 2) Pipeline validation - as data moves through systems (check counts, formats). 3) Before use - before making critical decisions (verify data makes sense)."
                },
                {
                    question: "What happened in the Knight Capital data quality disaster?",
                    answer: "In August 2012, Knight Capital accidentally activated old test code with a bug that interpreted stock trades incorrectly - buying high and selling low (backwards). Because they didn't validate the data was correct, they lost $440 million in just 45 minutes and nearly went bankrupt. Lesson: validate data before using it for critical decisions."
                },
                {
                    question: "What are the six dimensions of data quality?",
                    answer: "1) Completeness - all required data present. 2) Accuracy - data is correct. 3) Consistency - same format everywhere. 4) Validity - follows rules (age 0-120). 5) Uniqueness - no duplicates. 6) Timeliness - data is current, not outdated. Check these dimensions to ensure high-quality data."
                }
            ]
        },
        {
            id: 'real-world-data-engineering',
            title: 'Real-World Data Engineering - Putting It All Together',
            duration: '55 min',
            content: `
                <h2>Bringing It All Together</h2>
                <p>We've learned the building blocks: what data is, pipelines, storage, and quality. Now let's see how real companies use all these concepts together to solve actual problems.</p>

                <h2>Case Study 1: Netflix - Personalized Recommendations</h2>

                <h3>The Challenge</h3>
                <p>Netflix has 230+ million subscribers watching billions of hours of content. How do they know what show to recommend to YOU?</p>

                <div class="code-block">The Data Challenge:
- 230 million users
- Each user watches different shows
- 500+ billion viewing events per day
- Need personalized recommendations in milliseconds
- System can't be down (24/7 availability)

If data engineering fails:
- Generic recommendations ("everyone watches this")
- Users don't find content they like
- Users cancel subscriptions
- Netflix loses billions in revenue</div>

                <h3>Netflix's Data Engineering Solution</h3>

                <h4>Step 1: Data Collection (Sources)</h4>
                <div class="code-block">What they collect every second:

From website/apps:
- What you watch (show name, episode)
- How long you watch (did you finish?)
- When you pause, rewind, fast-forward
- What you rate (thumbs up/down)
- What you search for
- What you add to your list
- What device you use (TV, phone, laptop)

From their systems:
- When servers are busy (peak times)
- Which CDN servers are fastest (by location)
- Error rates (crashes, buffering)</div>

                <h4>Step 2: Data Pipeline (Processing)</h4>
                <div class="code-block">Real-time Pipeline (Streaming):

User watches "Stranger Things" Episode 1
  ↓
Event created instantly:
{
  user_id: "12345",
  show: "Stranger Things",
  episode: 1,
  watch_time: "45:23",
  device: "Smart TV",
  timestamp: "2024-01-15 20:30:00"
}
  ↓
Sent to processing system (Apache Kafka)
  ↓
Transformed: cleaned, standardized
  ↓
Loaded into:
  - Real-time database (update your recommendations NOW)
  - Data warehouse (for later analysis)

All in under 2 seconds!

Batch Pipeline (Nightly):

Every night at 2 AM:
1. Process all of yesterday's views
2. Update recommendation models
3. Calculate trending shows
4. Generate reports for executives</div>

                <h4>Step 3: Data Storage (Where It Lives)</h4>
                <div class="code-block">Cache (Redis):
- Your personal feed/recommendations
- Loaded instantly when you open Netflix
- Updates every few minutes

Database (Cassandra):
- User profiles (name, preferences)
- Current watch progress
- Recently watched list

Data Warehouse (Redshift):
- All viewing history (5+ years)
- Analysis: "Which shows are binged most?"
- Business reports: "Revenue by region"

Data Lake (S3):
- Raw logs (every single event)
- Video files (thousands of movies/shows)
- Backups of everything</div>

                <h4>Step 4: Data Quality</h4>
                <div class="code-block">Quality checks Netflix runs:

1. Completeness:
   - Did we receive events from all regions?
   - Any gaps in the data stream?

2. Validity:
   - Watch time can't be negative
   - Episode number can't exceed total episodes
   - Timestamp must be recent (not from 1990)

3. Consistency:
   - User watched Episode 3 but not Episode 1? Flag it
   - Show duration doesn't match actual show? Error

If quality checks fail:
- Alert the on-call engineer
- Stop bad data from reaching recommendations
- Investigate and fix the source</div>

                <h3>The Result</h3>
                <div class="code-block">What you experience:

1. You finish watching "Stranger Things"
2. Within 2 seconds, recommendations update
3. Netflix shows you: "You might also like..."
   - Similar sci-fi shows
   - Shows other "Stranger Things" fans loved
   - Your recommendations are unique to YOU

Behind the scenes:
- Billions of events processed
- Multiple pipelines running
- Data quality constantly monitored
- All happening automatically

80% of content watched on Netflix comes from recommendations!
This is only possible with excellent data engineering.</div>

                <h2>Case Study 2: Airbnb - Search and Pricing</h2>

                <h3>The Challenge</h3>
                <p>When you search for a place to stay in Paris, Airbnb needs to show you the best options instantly. But there are millions of listings!</p>

                <div class="code-block">The Data Problem:

Inputs you provide:
- Location: "Paris, France"
- Dates: March 15-20, 2024
- Guests: 2 people
- Price range: $80-150/night

What Airbnb needs to consider:
- 7 million listings worldwide
- Listing availability (not double-booked)
- Host ratings and reviews
- Past booking patterns
- Seasonal pricing
- Your past stays (preferences)
- Neighborhood safety scores
- Distance to attractions

All results in under 300 milliseconds!</div>

                <h3>Airbnb's Data Solution</h3>

                <h4>Data Collection</h4>
                <div class="code-block">Data sources:

From guests:
- Searches (what you look for)
- Bookings (what you actually reserve)
- Reviews (how you rate stays)
- Wishlists (properties you save)

From hosts:
- Listing details (photos, description)
- Availability calendar
- Pricing (nightly rates)
- House rules

From external:
- Flight data (when people travel)
- Events (concerts, conferences)
- Weather forecasts
- Neighborhood demographics</div>

                <h4>Data Pipeline</h4>
                <div class="code-block">When you search:

Real-time Pipeline:
You type "Paris" → Search event created instantly
  ↓
Check availability database (which listings are free?)
  ↓
Check pricing database (what's the rate for these dates?)
  ↓
Check review database (which hosts have good ratings?)
  ↓
Run machine learning model (what would YOU like?)
  ↓
Return results ranked by relevance
  ↓
Total time: 300ms

Batch Pipeline (Overnight):
1. Update search index (new listings, changed prices)
2. Recalculate dynamic pricing (events, seasonality)
3. Process yesterday's reviews
4. Update recommendation models</div>

                <h4>Dynamic Pricing Example</h4>
                <div class="code-block">How Airbnb calculates suggested pricing:

Data inputs:
- Your listing: 2-bedroom apt in Paris
- Historical bookings: Usually $120/night
- Calendar: March 15-20, 2024
- External events: Fashion Week in Paris!
- Demand: 50,000 people looking for Paris stays
- Supply: Only 2,000 listings available

Analysis:
- Fashion Week = high demand
- Your location near event = premium
- Other similar listings: $180-220/night
- Your typical rate: $120

Suggested price: $195/night
(63% increase due to high demand)

This calculation happens for millions of listings daily!</div>

                <h3>Data Quality at Scale</h3>
                <div class="code-block">Quality checks Airbnb runs:

Problem: Fake listings (scammers)
Solution:
- Validate address exists (geocoding)
- Check photos aren't stolen (reverse image search)
- Verify host identity (ID verification)
- Monitor for suspicious patterns

Problem: Bad pricing data
Solution:
- Flag prices that don't make sense ($1/night luxury villa?)
- Compare to similar listings
- Check historical rates for consistency

Problem: Stale availability
Solution:
- Auto-sync with host calendars
- Mark listings inactive if not updated in 30 days
- Remove bookings for properties no longer available

Result: Users trust the platform, bookings increase!</div>

                <h2>Key Lessons from Real Companies</h2>

                <h3>Lesson 1: Start Simple, Scale Later</h3>
                <div class="code-block">Common pattern:

Year 1: Simple database
- One server
- MySQL database
- Works for 10,000 users

Year 2: Add caching
- Redis for frequent queries
- Faster response times
- Handles 100,000 users

Year 3: Add data warehouse
- Need historical analysis
- BigQuery for reports
- Handles 1 million users

Year 5: Distributed systems
- Multiple databases (sharding)
- Real-time + batch pipelines
- Data lakes for everything
- Handles 100 million users

Don't build for 100M users on day one!
Start simple, add complexity as needed.</div>

                <h3>Lesson 2: Data Quality is Critical</h3>
                <div class="code-block">Bad data costs real money:

Example: E-commerce
- 1% of prices are wrong (data error)
- $100 item shows as $10
- 1,000 people buy it
- Company loses $90,000

Example: Recommendations
- User sees irrelevant suggestions (bad data)
- User doesn't click anything
- User cancels subscription
- Company loses $15/month forever

Spend time on data quality = save money!</div>

                <h3>Lesson 3: Monitor Everything</h3>
                <div class="code-block">What to monitor:

Pipeline health:
- Is it running on schedule?
- How long does it take?
- Any errors or failures?

Data quality:
- Record counts match expected?
- Any sudden drops or spikes?
- Missing data percentages?

System performance:
- Query response times
- Storage usage growing?
- CPU/memory utilization

Set up alerts for anomalies!
Know about problems before users do.</div>

                <h2>Career Paths in Data Engineering</h2>

                <h3>Skills You Need</h3>
                <div class="code-block">Technical skills:

Beginner:
- SQL (query databases)
- Python or Java (write pipelines)
- Basic cloud (AWS, Azure, or Google Cloud)

Intermediate:
- Pipeline tools (Apache Airflow, dbt)
- Data warehouses (Snowflake, BigQuery)
- Version control (Git)

Advanced:
- Distributed systems (Spark, Kafka)
- Data modeling (schemas, optimization)
- Infrastructure (Kubernetes, Docker)

Non-technical skills:
- Communication (explain data to non-technical people)
- Problem-solving (debug complex issues)
- Attention to detail (catch data quality issues)</div>

                <h3>Typical Career Progression</h3>
                <div class="code-block">Junior Data Engineer (0-2 years)
Salary: $70K-100K
Tasks:
- Write SQL queries
- Build simple pipelines
- Fix data quality issues
- Learn the tools

Mid-Level Data Engineer (2-5 years)
Salary: $100K-150K
Tasks:
- Design pipelines independently
- Optimize performance
- Mentor junior engineers
- On-call rotations

Senior Data Engineer (5-10 years)
Salary: $150K-250K
Tasks:
- Architect data systems
- Make technical decisions
- Lead projects
- Define best practices

Staff/Principal Engineer (10+ years)
Salary: $250K-500K+
Tasks:
- Company-wide strategy
- Solve hardest problems
- Influence industry</div>

                <h2>Tools of the Trade (Overview)</h2>

                <table class="table">
                    <tr>
                        <th>Category</th>
                        <th>Popular Tools</th>
                        <th>What They Do</th>
                    </tr>
                    <tr>
                        <td>Databases</td>
                        <td>PostgreSQL, MySQL</td>
                        <td>Store structured data</td>
                    </tr>
                    <tr>
                        <td>Data Warehouses</td>
                        <td>Snowflake, BigQuery, Redshift</td>
                        <td>Analytics and reporting</td>
                    </tr>
                    <tr>
                        <td>Pipelines</td>
                        <td>Apache Airflow, dbt</td>
                        <td>Automate data workflows</td>
                    </tr>
                    <tr>
                        <td>Streaming</td>
                        <td>Apache Kafka, AWS Kinesis</td>
                        <td>Real-time data processing</td>
                    </tr>
                    <tr>
                        <td>Storage</td>
                        <td>AWS S3, Google Cloud Storage</td>
                        <td>Cheap storage for data lakes</td>
                    </tr>
                    <tr>
                        <td>Processing</td>
                        <td>Apache Spark, Python</td>
                        <td>Transform large datasets</td>
                    </tr>
                </table>

                <p><em>Don't feel overwhelmed! Start with SQL and Python, add tools as needed.</em></p>

                <h2>Summary</h2>
                <ul style="margin: 1rem 0; margin-left: 2rem;">
                    <li>Real companies combine all concepts: pipelines, storage, quality checks</li>
                    <li>Netflix uses data engineering for personalized recommendations (80% of views)</li>
                    <li>Airbnb uses data engineering for search and dynamic pricing</li>
                    <li>Start simple and scale as you grow - don't over-engineer early</li>
                    <li>Data quality directly impacts revenue - invest in it</li>
                    <li>Monitor everything - pipelines, quality, performance</li>
                    <li>Career path: learn SQL and Python, build from there</li>
                </ul>

                <h2>Next Steps</h2>
                <p>You now understand the fundamentals of data engineering! Here's what to do next:</p>

                <ol style="margin: 1rem 0; margin-left: 2rem;">
                    <li><strong>Practice SQL:</strong> Most critical skill - learn to query and manipulate data</li>
                    <li><strong>Learn Python:</strong> Widely used for data pipelines and processing</li>
                    <li><strong>Build a project:</strong> Create a simple pipeline (scrape website → clean data → store in database)</li>
                    <li><strong>Explore tools:</strong> Try free tiers of BigQuery, AWS, or Snowflake</li>
                    <li><strong>Keep learning:</strong> Take advanced courses on distributed systems, data modeling</li>
                </ol>

                <p>Remember: every expert was once a beginner. Start small, build projects, and keep learning. Good luck on your data engineering journey!</p>
            `,
            interviews: [
                {
                    question: "How does Netflix use data engineering for recommendations?",
                    answer: "Netflix collects billions of viewing events daily (what you watch, when you pause, ratings). Real-time pipelines process events in under 2 seconds, updating recommendations instantly. They use caching (Redis) for your feed, databases (Cassandra) for profiles, warehouses (Redshift) for analysis, and lakes (S3) for raw data. 80% of content watched comes from these data-driven recommendations."
                },
                {
                    question: "How does Airbnb use data engineering for search and pricing?",
                    answer: "When you search for 'Paris', Airbnb's real-time pipeline checks availability, pricing, and reviews across millions of listings in under 300ms. For dynamic pricing, they analyze historical bookings, external events (like Fashion Week), demand vs supply, and suggest optimal prices. Batch pipelines run overnight to update search indexes and recalculate pricing for all listings."
                },
                {
                    question: "What is the recommended approach for scaling data systems?",
                    answer: "Start simple and scale as needed. Year 1: simple database for 10K users. Year 2: add caching for 100K users. Year 3: add warehouse for 1M users. Year 5: distributed systems for 100M users. Don't build for 100M users on day one - it's too complex and expensive. Add complexity only when necessary."
                },
                {
                    question: "Why is data quality critical for businesses?",
                    answer: "Bad data costs real money. Example: If 1% of product prices are wrong ($100 item shows as $10), and 1,000 people buy it, the company loses $90,000. Or if recommendations are wrong due to bad data, users see irrelevant content, don't engage, and might cancel subscriptions. Investing in data quality prevents these expensive problems."
                },
                {
                    question: "What skills do you need to become a data engineer?",
                    answer: "Beginner: SQL (query databases), Python or Java (write pipelines), basic cloud (AWS/Azure/Google). Intermediate: pipeline tools (Airflow, dbt), data warehouses (Snowflake, BigQuery), Git. Advanced: distributed systems (Spark, Kafka), data modeling, infrastructure (Docker, Kubernetes). Also need communication skills to explain data to non-technical people."
                }
            ]
        }
    ]
};

