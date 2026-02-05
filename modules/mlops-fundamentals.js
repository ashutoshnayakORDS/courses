// MLOps Fundamentals Course
// Beginner-friendly progression: What is ML → How it works → Design → Implement → Maintain

const mlopsFundamentals = {
    title: 'MLOps Fundamentals',
    lessons: [
        {
            id: 'what-is-machine-learning',
            title: 'What is Machine Learning? - Understanding the Basics',
            duration: '45 min',
            content: `
                <h2>What is Machine Learning?</h2>
                <p>You've probably heard "machine learning" and "AI" everywhere. It sounds intimidating. It's not. <strong>Machine learning is simply teaching computers to learn from examples.</strong> That's the whole idea.</p>

                <h3>Regular Programs vs Machine Learning</h3>
                <p>Let's understand the difference by comparing how programs normally work vs how machine learning works:</p>

                <div class="code-block">Regular Computer Program:
YOU teach the computer the rules.

Example: Sorting fruits by color

You write:
IF color is red  → put in "red" box
IF color is blue → put in "blue" box
IF color is green → put in "green" box

Computer follows YOUR rules exactly.
You had to think of every rule yourself.

---

Machine Learning Program:
The computer LEARNS the rules from examples.

You show it 1,000 pictures of fruits:
- 500 labeled "red"    (apples, cherries)
- 300 labeled "green"  (limes, green apples)
- 200 labeled "blue"   (blueberries)

The computer figures out the pattern BY ITSELF.
You never had to write a single rule!

Now show it a new fruit it's never seen:
Computer: "That's red!"</div>

                <h3>A Simpler Way to Think About It</h3>
                <p>Think about how YOU learned to recognize dogs as a child:</p>

                <div class="code-block">When you were a toddler:

Someone showed you a dog and said "Dog!"
Then showed you another dog: "Dog!"
Then showed you another dog: "Dog!"

After seeing many dogs, you could say:
"That's a dog!" — even for dogs you'd never seen before.

Nobody gave you a list of rules:
- Has 4 legs
- Has a tail
- Has fur
- Etc.

You LEARNED the pattern from examples.

That's EXACTLY how machine learning works!
Show it examples → It learns the pattern → It recognizes new things</div>

                <h2>Machine Learning You Already Use Every Day</h2>

                <p>You're already using machine learning constantly without realizing it:</p>

                <h3>1. Spam Filter in Your Email</h3>
                <div class="code-block">How it works:

Thousands of emails labeled:
- "Buy cheap pills!" → SPAM
- "Your order shipped" → NOT SPAM
- "You won $1,000,000!" → SPAM
- "Meeting at 3 PM" → NOT SPAM

The email app LEARNED what spam looks like.

Now when a new email arrives:
- Looks like spam patterns → Goes to Spam folder
- Looks normal → Goes to Inbox

You never had to write rules!
The machine learned from millions of examples.</div>

                <h3>2. Netflix Recommendations</h3>
                <div class="code-block">How it works:

Netflix sees what you watch:
- You watched 3 sci-fi shows: ✓✓✓
- You skipped 2 romance movies: ✗✗
- You rated "Stranger Things" 5 stars: ★★★★★

Machine learning figures out:
"This person likes sci-fi with action"

Next time you open Netflix:
"Here are shows YOU specifically might like"
(Different from what your friend sees!)</div>

                <h3>3. Your Phone's Face Unlock</h3>
                <div class="code-block">How it works:

When you set up Face ID:
- Phone takes 30,000+ photos of your face
- Learns what YOUR face looks like
- From every angle, in different lighting

When you try to unlock:
- Phone sees a face
- Compares to what it learned
- "That's them!" → Unlocks
- "Not them!" → Stays locked

This is machine learning in action!</div>

                <h3>4. Autocomplete on Your Keyboard</h3>
                <div class="code-block">When you type "I am go":
Your keyboard suggests: "going"

How does it know?
- It learned from BILLIONS of messages people typed
- "I am go" almost always becomes "I am going"
- So it predicts "going"

It's not magic — it's patterns learned from data!</div>

                <h3>5. Voice Assistants (Siri, Google Assistant, Alexa)</h3>
                <div class="code-block">When you say "Hey Siri, what's the weather?"

1. Voice recognition: "Hey Siri" → detected (learned from millions of voices)
2. Speech understanding: "what's the weather?" → understood (learned from millions of phrases)
3. Response: Gives you weather info

Every step uses machine learning!</div>

                <h2>What Machine Learning CAN'T Do</h2>

                <h3>Common Misconceptions</h3>
                <div class="code-block">Myth 1: ML is magic
Reality: It's just math and patterns.
It ONLY knows what it learned from data.
No data → No learning.

Myth 2: ML always gives the right answer
Reality: It gives PREDICTIONS, not certainties.
Your spam filter sometimes gets it wrong (missed spam).
That's normal and expected.

Myth 3: ML understands like humans
Reality: ML finds patterns in numbers.
A spam filter doesn't "understand" English.
It just matches patterns it's seen before.

Myth 4: ML can work with any amount of data
Reality: It needs ENOUGH examples to learn from.
Showing a kid 3 pictures of dogs isn't enough
to recognize all dogs. ML is the same.</div>

                <h2>The Three Basic Ingredients of Machine Learning</h2>

                <div class="code-block">Ingredient 1: DATA (Examples to learn from)
- Emails labeled spam or not spam
- Photos labeled "cat" or "not cat"
- Houses with price information
More data = better learning

Ingredient 2: ALGORITHM (The learning method)
- This is the set of instructions that tell
  the computer HOW to learn
- Think of it as the "study method"
- Different algorithms work better for different problems

Ingredient 3: COMPUTE (Processing power)
- A regular laptop can do simple ML
- Big companies use thousands of powerful computers
- More compute = can learn from more data faster</div>

                <h2>Two Types of Machine Learning</h2>

                <h3>1. Supervised Learning (Learning with a Teacher)</h3>
                <div class="code-block">How it works:
- You give the computer examples WITH answers
- Computer learns to predict the answer for new examples

Real examples:
- Spam filter: emails labeled "spam" or "not spam"
- House prices: houses with known prices
- Image recognition: photos labeled "cat" or "dog"

Like: A student studying with an answer key.
They see question + answer → Learn the pattern.</div>

                <h3>2. Unsupervised Learning (Learning Without a Teacher)</h3>
                <div class="code-block">How it works:
- You give the computer examples WITHOUT answers
- Computer finds patterns on its own

Real examples:
- Customer grouping: Group customers by shopping habits
  (You don't tell it the groups — it discovers them)
- Anomaly detection: Find unusual transactions
  (You don't define what "unusual" means)

Like: Looking at a pile of clothes and sorting them
into groups by yourself (by color, size, type).</div>

                <h2>Summary</h2>
                <ul style="margin: 1rem 0; margin-left: 2rem;">
                    <li>Machine learning = teaching computers to learn from examples (not by writing rules)</li>
                    <li>You already use ML daily: spam filters, recommendations, face unlock, autocomplete</li>
                    <li>Three ingredients: Data (examples), Algorithm (study method), Compute (processing power)</li>
                    <li>Supervised learning: learns with answers provided. Unsupervised: finds patterns on its own</li>
                    <li>ML gives predictions, not certainties — it can be wrong sometimes</li>
                </ul>

                <p>Next lesson: We'll look at <strong>how machines actually learn</strong>, and what a "model" really is!</p>
            `,
            interviews: [
                {
                    question: "What is machine learning in simple terms?",
                    answer: "Machine learning is teaching computers to learn patterns from examples, rather than programming explicit rules. Instead of writing 'if red, put in red box', you show it thousands of red things and it figures out what 'red' looks like on its own."
                },
                {
                    question: "How does a spam filter use machine learning?",
                    answer: "A spam filter is shown millions of emails labeled 'spam' or 'not spam'. It learns the patterns that distinguish spam (words, sender patterns, formatting). When a new email arrives, it uses what it learned to predict whether it's spam. It never had explicit rules — it learned them from examples."
                },
                {
                    question: "What are the three basic ingredients of machine learning?",
                    answer: "1) Data — the examples the computer learns from. 2) Algorithm — the 'study method' that tells the computer how to learn patterns. 3) Compute — the processing power needed to crunch through data. More data and compute generally leads to better learning."
                },
                {
                    question: "What's the difference between supervised and unsupervised learning?",
                    answer: "Supervised learning has labeled examples (like spam/not spam emails) — the computer learns with an answer key. Unsupervised learning has no labels — the computer finds patterns on its own, like grouping customers into similar categories without being told what the groups should be."
                },
                {
                    question: "What are common misconceptions about machine learning?",
                    answer: "ML is not magic or all-knowing. It only knows patterns from its training data. It gives predictions, not certainties (spam filters sometimes get it wrong). It doesn't 'understand' like humans — it matches numerical patterns. And it needs enough data to learn from."
                }
            ]
        },
        {
            id: 'how-ml-models-learn',
            title: 'How ML Models Learn - Training, Testing, and Predictions',
            duration: '50 min',
            content: `
                <h2>What is a "Model"?</h2>
                <p>You keep hearing "machine learning model." What does that actually mean? <strong>A model is just a set of patterns the computer learned.</strong> Think of it as a recipe the machine figured out on its own.</p>

                <h3>The Recipe Analogy</h3>
                <div class="code-block">A human learns to make cookies:
- Tries 100 different recipes
- Tastes each one
- Figures out the BEST recipe
- Remembers: "2 cups flour, 1 cup sugar, 15 min bake"
- That remembered recipe = the "model"

A machine learning model works the same way:
- Tries many different patterns
- Checks which patterns work best
- Remembers the BEST pattern
- That remembered pattern = the "model"

Now whenever you need cookies (prediction):
- Use the recipe (model) → Get cookies (answer)!</div>

                <p>The model is the OUTPUT of the learning process. Once it's learned, it can make predictions instantly.</p>

                <h2>The Three Phases of Machine Learning</h2>

                <h3>Phase 1: Training (Learning)</h3>
                <p>This is where the model actually learns. You feed it examples, and it figures out patterns.</p>

                <div class="code-block">Example: Predicting House Prices

Training Data (Examples):
| Bedrooms | Bathrooms | Sq Feet | Price       |
|----------|-----------|---------|-------------|
| 2        | 1         | 1,000   | $200,000    |
| 3        | 2         | 1,500   | $350,000    |
| 4        | 3         | 2,200   | $500,000    |
| 1        | 1         | 600     | $120,000    |
| ... (hundreds more rows) ...

The computer looks at all these examples and learns:
- More bedrooms = higher price
- More square feet = higher price
- More bathrooms = higher price
- How much each factor matters

This learning process = TRAINING</div>

                <h3>Phase 2: Testing (Checking if It Learned Well)</h3>
                <p>Before you trust the model, you need to check: did it actually learn correctly?</p>

                <div class="code-block">Testing Process:

1. Split data into two groups:
   - Training set (80%): What the model learns FROM
   - Test set  (20%):  What the model is TESTED ON

Like a school test:
- Textbook chapters (training) — you study these
- Exam questions (test) — questions you've never seen

Example with houses:
Training: 800 houses (model learns from these)
Test: 200 houses (model tries to predict these prices)

Results:
House with 3 bed, 2 bath, 1500 sq ft:
- Real price:      $350,000
- Model predicted: $345,000  ← Close! Good!

House with 2 bed, 1 bath, 900 sq ft:
- Real price:      $180,000
- Model predicted: $175,000  ← Very close! Great!

If predictions are close to real prices → Model is good!
If predictions are way off → Model needs improvement.</div>

                <h3>Phase 3: Prediction (Using What It Learned)</h3>
                <p>Once the model is trained and tested, you use it to make predictions on NEW data.</p>

                <div class="code-block">New house comes on market:
- 3 bedrooms
- 2 bathrooms
- 1,800 sq feet
- Price: ???

Feed to model → Model predicts: $420,000

No human calculated this.
The model used the patterns it learned
from the 800 training houses to make this prediction.

This takes MILLISECONDS.</div>

                <h2>A Complete Real-World Example: Email Spam Detection</h2>

                <p>Let's walk through the full process with a spam filter:</p>

                <div class="code-block">Step 1: COLLECT DATA
Thousands of emails, each labeled:
- "Buy cheap pills now!" → SPAM
- "Meeting tomorrow at 2pm" → NOT SPAM
- "You won a free iPhone!" → SPAM
- "Invoice attached for review" → NOT SPAM
- ... (millions of examples)

Step 2: PREPARE DATA
Convert emails to numbers (computers only understand numbers):
- Count of certain words (buy, free, won, meeting, invoice)
- Length of email
- Does it have a link? (yes=1, no=0)
- Is sender known? (yes=1, no=0)

Email "Buy cheap pills now!" becomes:
[buy=1, free=0, won=0, has_link=1, known_sender=0]

Step 3: TRAIN
Feed 900,000 labeled emails to the algorithm.
Algorithm finds patterns:
- "buy" + "has_link" + "unknown_sender" → likely spam
- "invoice" + "known_sender" → likely not spam

Step 4: TEST
Feed 100,000 NEW emails (with labels, to check accuracy):
- 99,200 correctly classified → 99.2% accurate!
- That's good enough → Model is ready

Step 5: PREDICT (Production)
New email arrives: "Congratulations! Claim your prize!"
Model sees: [congratulations=1, claim=1, prize=1, known_sender=0]
Model predicts: SPAM (99% confident)
Email goes to spam folder.</div>

                <h2>Why Models Get Things Wrong</h2>

                <h3>The Model Never Saw That Before</h3>
                <div class="code-block">Example: Spam filter trained in 2020
Scammers create NEW types of spam in 2024:
- "Your crypto wallet was hacked"
- "AI generated income opportunity"

The model never saw these patterns before!
It might let them through to inbox.

Solution: Retrain the model with new examples regularly.</div>

                <h3>Not Enough Data</h3>
                <div class="code-block">Example: House price predictor
Trained on houses in New York City.

Now predicting prices in rural Texas.
Very different patterns!
Predictions will be way off.

Solution: Include diverse data in training.</div>

                <h3>Bad Training Data</h3>
                <div class="code-block">Example: Spam filter with bad labels
Someone accidentally labeled real emails as spam:
- "Your order has shipped" → labeled SPAM (wrong!)

Now the model thinks shipping emails are spam.
Real customers' important emails go to spam folder!

Solution: Clean your training data!</div>

                <h2>More Data = Better Model (Usually)</h2>

                <div class="code-block">Predicting whether an email is spam:

10 training emails:
Accuracy: 50% (basically guessing)

100 training emails:
Accuracy: 70% (learning something)

1,000 training emails:
Accuracy: 85% (getting better)

10,000 training emails:
Accuracy: 95% (pretty good!)

1,000,000 training emails:
Accuracy: 99.5% (excellent!)

This is why big tech companies collect SO much data —
more data helps their models learn better.</div>

                <h2>Model Confidence</h2>
                <p>Models don't just say "yes" or "no" — they give a confidence score:</p>

                <div class="code-block">Spam filter sees new email:

"Congratulations! You won!"
Prediction: SPAM
Confidence: 95%

"Hello, quick question about the project"
Prediction: NOT SPAM
Confidence: 88%

"Your account has been verified"
Prediction: NOT SPAM
Confidence: 62% (less sure!)

You can set a threshold:
- If confidence > 80% → Take action
- If confidence 50-80% → Maybe review manually
- If confidence < 50% → Unsure, needs human check</div>

                <h2>Retraining: Teaching the Model Again</h2>

                <div class="code-block">Models need regular retraining because the world changes:

Spam Spam filter:
- 2020: "Buy Viagra" is common spam
- 2024: Nobody sends that anymore
- 2024: "Crypto scam" is common now
- Old model misses new spam patterns!
- RETRAIN with new data → Model learns new patterns

Netflix recommendations:
- January: Users watch holiday movies
- March: Users watch spring/comedy movies
- Preferences change over time!
- RETRAIN regularly → Better recommendations

Weather prediction:
- Climate patterns shift year by year
- RETRAIN with recent weather data → More accurate forecasts</div>

                <h2>Summary</h2>
                <ul style="margin: 1rem 0; margin-left: 2rem;">
                    <li>A "model" is a set of patterns the computer learned from data — like a recipe it figured out itself</li>
                    <li>Three phases: Training (learn from examples) → Testing (check accuracy) → Prediction (use on new data)</li>
                    <li>Split data: 80% for training, 20% for testing</li>
                    <li>More data generally means a better model</li>
                    <li>Models give confidence scores, not just yes/no answers</li>
                    <li>Models need retraining as the real world changes</li>
                </ul>

                <p>Now that you understand how ML works, the next lesson covers <strong>why turning a model into something millions of people can use is harder than it sounds</strong>. That's where MLOps comes in!</p>
            `,
            interviews: [
                {
                    question: "What is a machine learning model?",
                    answer: "A model is a set of patterns the computer learned from training data. Like a recipe the machine figured out on its own. Once trained, you can feed new data to the model and it makes predictions instantly based on the patterns it learned."
                },
                {
                    question: "What are the three phases of machine learning?",
                    answer: "1) Training — Feed the model thousands of examples with known answers. It learns patterns (e.g., which features predict house prices). 2) Testing — Show the model new examples it hasn't seen to check if predictions are accurate. 3) Prediction — Use the trained model on real new data to make instant predictions."
                },
                {
                    question: "Why do we split data into training and test sets?",
                    answer: "The training set (80%) teaches the model. The test set (20%) checks if the model actually learned well — like a school exam uses questions you haven't practiced. If you tested on the same data you trained on, the model would just memorize answers instead of learning real patterns."
                },
                {
                    question: "Why do ML models sometimes give wrong answers?",
                    answer: "Common reasons: 1) The model never saw that type of data before (spam filter vs new spam types). 2) Not enough or diverse training data. 3) Bad training data with wrong labels. 4) The real world changed since training (patterns shift over time). Solutions: more data, retraining, better data quality."
                },
                {
                    question: "What is model confidence and why does it matter?",
                    answer: "Confidence is how certain the model is about its prediction (e.g., 95% spam vs 62% not spam). High confidence means the model is sure. Low confidence means it's uncertain. You can set thresholds: act on high-confidence predictions automatically, flag low-confidence ones for human review."
                }
            ]
        },
        {
            id: 'from-experiment-to-production',
            title: 'From Experiment to Production - Why MLOps Exists',
            duration: '50 min',
            content: `
                <h2>The Journey of an ML Model</h2>
                <p>A data scientist builds a model on their laptop that works perfectly. They show it to the boss: "Look, 95% accurate!" The boss says: "Great, put it on our website so all our customers can use it."</p>
                <p>And then... everything goes wrong.</p>
                <p><strong>MLOps is the set of practices and tools that make this journey work.</strong></p>

                <h3>The Kitchen vs Restaurant Analogy</h3>
                <div class="code-block">A data scientist's work = Cooking in your kitchen
- Cook for yourself (1 person)
- Use your one favorite recipe
- Mess up? Try again, no big deal
- Take as long as you need
- Nobody notices if it's slightly wrong

MLOps = Running a restaurant
- Cook for 10,000 customers per DAY
- Need dozens of recipes working simultaneously
- Mess up? Customers get sick. BAD.
- Must be fast (food in 10 minutes, not 3 hours)
- Every single plate must be good
- Someone must watch the kitchen 24/7

Going from kitchen → restaurant is HARD.
That's the gap MLOps fills!</div>

                <h2>What Actually Happens (Real Scenario)</h2>

                <h3>The Experiment Phase (Kitchen)</h3>
                <div class="code-block">Data scientist (Sarah) builds a recommendation model:

Week 1: Download some data
- Grab movie ratings from database
- 100,000 users worth of data

Week 2: Explore and experiment
- Try different approaches
- Model A: 72% accuracy
- Model B: 78% accuracy  ← better!
- Model C: 81% accuracy  ← even better!

Week 3: Refine Model C
- Clean up the code
- 85% accuracy!
- "This is great, let's ship it!"

Sarah is happy. Model works on her laptop. Done!

...or is it?</div>

                <h3>Reality Check: What Needs to Happen Next</h3>
                <div class="code-block">To serve this model to real users, you need:

1. Where will it run?
   - Sarah's laptop? No way.
   - Needs a server that's always on
   - Needs to handle 10,000 requests per second

2. How fast does it need to respond?
   - Sarah tested on her laptop (slow is fine)
   - Real users want answers in 200 milliseconds
   - If it takes 5 seconds → users leave

3. What if it crashes?
   - On Sarah's laptop: restart it
   - In production: 10,000 users get errors!
   - Need a backup plan

4. How do you know if it's working?
   - Sarah checked manually
   - Need automatic monitoring
   - What if accuracy drops from 85% to 50%?

5. What if the data changes?
   - Sarah used last month's data
   - Real data changes every day
   - Model might become useless in weeks

6. Who's responsible when it breaks?
   - Need an on-call plan
   - Clear process for fixing problems

These are the problems MLOps solves!</div>

                <h2>The Three Worlds of ML</h2>

                <div class="code-block">World 1: EXPERIMENT (Data Scientist's Laptop)
- Messy code, quick and dirty
- "Does this idea work?"
- Speed of trying ideas matters most
- If it fails, no one cares

World 2: DEVELOPMENT (Team Works Together)
- Clean up the code
- Write tests
- Version control (save your work in Git)
- Make sure others can understand it

World 3: PRODUCTION (Real Users, Real Stakes)
- Must run 24/7, no breaks
- Must be fast
- Must be monitored
- Must handle failures gracefully
- Small errors cost real money

MLOps = The bridge from World 1 → World 3</div>

                <h2>Real Examples: Why MLOps Matters</h2>

                <h3>Netflix: From Notebook to 230 Million Users</h3>
                <div class="code-block">Netflix recommendation model:

Experiment:
- Data scientist trains model on laptop
- Tests on 10,000 users → 80% accuracy
- "Great, let's ship it!"

Production challenges they had to solve:
1. Speed: Recommendations must load in milliseconds
   - Laptop: Takes 2 seconds (fine for testing)
   - Production: Must be under 100ms for each user

2. Scale: 230 million users simultaneously
   - Can't run on one computer
   - Need thousands of servers

3. Freshness: What you watched 5 minutes ago
   should affect your recommendations NOW
   - Can't wait and batch-update once a day
   - Need real-time data processing

4. Personalization: Each user gets different results
   - 230 million DIFFERENT recommendations
   - Can't pre-compute all of them

MLOps made all of this possible.</div>

                <h3>Uber: Driver Matching in 2 Seconds</h3>
                <div class="code-block">Uber's driver-rider matching:

The model:
- Predicts which driver will give best experience
- Considers: distance, driver rating, traffic, ETA

Experiment results:
- Works great in testing!
- 90% accuracy on test data

Production reality:
- Must match within 2 seconds (user won't wait longer)
- Millions of matches happening simultaneously
- If it takes too long → user cancels → Uber loses money
- Model uses real-time location data (changes every 4 seconds)

Without MLOps:
- Model would be too slow
- Wouldn't handle the scale
- Nobody would know if it broke</div>

                <h3>Facebook: Content Ranking</h3>
                <div class="code-block">Facebook's News Feed model:

What it does:
- Decides which posts you see first
- Out of thousands of posts from friends

The MLOps challenge:
- 2 billion daily active users
- Each user sees a custom feed
- Must decide in under 100ms
- A bad model = users see irrelevant content
  → Users leave the platform
  → Billions in ad revenue at risk

One wrong deployment:
- Facebook accidentally deployed bad model in 2017
- News feed showed irrelevant content for 30 minutes
- Affected millions of users
- Required emergency rollback

MLOps: Catch these problems before they reach users.</div>

                <h2>What MLOps Actually Includes</h2>

                <div class="code-block">MLOps is like a toolkit for production ML:

Tool 1: PIPELINE AUTOMATION
"Run training automatically instead of manually"
Like: Setting up auto-pay instead of paying bills by hand

Tool 2: MODEL VERSIONING
"Keep track of all your model versions"
Like: Google Docs "version history" for models

Tool 3: DEPLOYMENT
"Put the model on servers for users"
Like: Publishing a book (not just writing it)

Tool 4: MONITORING
"Watch the model 24/7 for problems"
Like: Security cameras watching a store

Tool 5: A/B TESTING
"Test new model vs old model safely"
Like: Testing two restaurant menus with real customers

Tool 6: RETRAINING
"Update the model when it gets stale"
Like: Refreshing a textbook with current information</div>

                <h2>The MLOps Lifecycle (Simple Version)</h2>

                <div class="code-block">
1. DATA          → Collect and prepare training data
     ↓
2. TRAIN         → Train the model (find patterns)
     ↓
3. TEST          → Check if it works well
     ↓
4. DEPLOY        → Put it where real users can use it
     ↓
5. MONITOR       → Watch for problems
     ↓
6. RETRAIN       → Update model when needed
     ↓
   (Back to step 1 — it's a cycle!)

This cycle repeats over and over.
Good MLOps makes each step smooth and automatic.</div>

                <h2>Summary</h2>
                <ul style="margin: 1rem 0; margin-left: 2rem;">
                    <li>A model working on a laptop ≠ a model working for millions of users</li>
                    <li>MLOps bridges the gap: from experiment (kitchen) to production (restaurant)</li>
                    <li>Production challenges: speed, scale, monitoring, reliability, data freshness</li>
                    <li>Real companies (Netflix, Uber, Facebook) face these challenges daily</li>
                    <li>MLOps tools: pipeline automation, versioning, deployment, monitoring, A/B testing, retraining</li>
                    <li>The MLOps lifecycle is a cycle: Data → Train → Test → Deploy → Monitor → Retrain → repeat</li>
                </ul>

                <p>Next lesson: We'll learn <strong>how to actually design ML systems</strong> — the architecture behind the scenes!</p>
            `,
            interviews: [
                {
                    question: "Why can't you just run an ML model on a data scientist's laptop?",
                    answer: "A laptop can't handle production requirements: it can't serve millions of requests per second, it goes offline, it's too slow for real-time predictions, and nobody monitors it. Production needs dedicated servers, fast response times (under 200ms), redundancy for failures, and 24/7 monitoring — things a laptop can't provide."
                },
                {
                    question: "What is the difference between ML experimentation and production?",
                    answer: "Experimentation (kitchen): messy code, one developer, no performance requirements, failure has no consequence. Production (restaurant): clean code, serves millions of users, must be fast and reliable, monitored 24/7, failures cost real money. MLOps bridges this gap."
                },
                {
                    question: "What challenges did Netflix face moving recommendations to production?",
                    answer: "Netflix needed: 1) Speed — load recommendations in milliseconds. 2) Scale — serve 230 million users simultaneously on thousands of servers. 3) Freshness — update recommendations based on what you just watched. 4) Personalization — each of 230M users gets different recommendations. All of this required strong MLOps."
                },
                {
                    question: "What are the main components of MLOps?",
                    answer: "Pipeline automation (automatic training), model versioning (track all versions), deployment (put models on production servers), monitoring (watch for problems 24/7), A/B testing (safely test new models), and retraining (update models when they become stale). These tools make production ML reliable."
                },
                {
                    question: "What is the MLOps lifecycle?",
                    answer: "It's a repeating cycle: 1) Collect and prepare data → 2) Train the model → 3) Test its accuracy → 4) Deploy to production → 5) Monitor for problems → 6) Retrain when needed → back to step 1. This cycle keeps running continuously to keep ML models accurate and useful over time."
                }
            ]
        },
        {
            id: 'designing-ml-systems',
            title: 'Designing ML Systems - Architecture and Structure',
            duration: '55 min',
            content: `
                <h2>How ML Systems Are Built</h2>
                <p>Now that you understand WHY MLOps exists, let's look at HOW you actually design an ML system. Think of it like designing a house — you need to plan the rooms, how they connect, and how information flows.</p>

                <h3>The Three Main Parts</h3>
                <div class="code-block">Every ML system has three main parts:

1. TRAINING SYSTEM
   "The Kitchen"
   - Where models learn from data
   - Runs periodically (daily, weekly)
   - Needs lots of computing power

2. SERVING SYSTEM
   "The Waiter"
   - Where users get predictions
   - Runs 24/7, must be fast
   - Handles millions of requests

3. MONITORING SYSTEM
   "The Health Inspector"
   - Watches everything for problems
   - Alerts when something goes wrong
   - Checks data quality constantly

All three must work together smoothly!</div>

                <h2>Part 1: The Training System</h2>

                <h3>How Data Flows Through Training</h3>
                <div class="code-block">Raw Data → Clean Data → Features → Model

Step 1: Raw Data (Messy)
- User clicks, purchases, ratings
- From websites, apps, databases
- Mixed formats, some missing values

Step 2: Clean Data
- Remove bad/missing entries
- Standardize formats
- "What the model will study"

Step 3: Features (Key Information)
- Extract the important signals
- "What should the model pay attention to?"
- Example: "user_age", "items_viewed_today", "time_of_day"

Step 4: Train the Model
- Feed cleaned features + known answers to algorithm
- Algorithm learns the patterns
- Output: a trained model file</div>

                <h3>Feature Engineering (The Secret Ingredient)</h3>
                <p>Features are like the ingredients in your recipe. Picking the right features makes a HUGE difference.</p>

                <div class="code-block">Example: Predicting if someone will buy a product

BAD features (not useful):
- User's first name length (who cares?)
- Day of the week they signed up (irrelevant)

GOOD features (actually useful):
- Number of items they browsed today → likely interested
- Time since they last bought something → might be ready
- Their average spend → budget indicator
- How many similar items they've liked → taste match

Better features = Better predictions
This is often MORE important than the algorithm itself!</div>

                <h3>Feature Stores: Solving a Big Problem</h3>
                <div class="code-block">Problem: Multiple teams computing the same features differently.

Team A (recommendations): computes "user_age" as: current_year - birth_year
Team B (fraud detection):  computes "user_age" as: days_since_signup / 365

Same feature name, different calculations!
Results: inconsistent predictions, bugs, confusion.

Feature Store = A shared library of features:
- One place to define "user_age"
- All teams use the SAME definition
- Features computed once, reused everywhere
- Like a shared ingredient pantry for all kitchens

Popular feature stores: Feast (open source), Tecton, AWS SageMaker</div>

                <h2>Part 2: The Serving System</h2>

                <h3>How Predictions Are Delivered</h3>
                <div class="code-block">User request → Server → Model → Prediction → Response

Example: "Show me recommendations"

1. User opens Netflix app
2. Request goes to Netflix server:
   "User ID 12345 wants recommendations"
3. Server prepares features:
   "This user likes sci-fi, watched 3 shows today"
4. Features sent to MODEL
5. Model makes prediction:
   "Show these 20 shows"
6. Response sent back to user
7. User sees recommendations

Total time: 100-200 milliseconds
That's less time than it takes you to blink!</div>

                <h3>Batch vs Real-Time Serving</h3>
                <div class="code-block">Two ways to serve predictions:

BATCH SERVING (Pre-computed):
- Calculate predictions ahead of time
- Store results in database
- When user requests: just look up the answer

Example: Netflix movie ratings
- Every night: predict ratings for ALL users + ALL movies
- Store: "User 123 would rate Stranger Things: 4.8 stars"
- When user opens app: just look up pre-computed ratings
- Super fast! (just a database lookup)
- Works when predictions don't need to be instant

---

REAL-TIME SERVING (Computed on demand):
- Wait for user request
- Run the model RIGHT NOW
- Return prediction

Example: Uber driver matching
- Wait for user to request a ride
- RIGHT NOW: find best driver nearby
- Can't pre-compute (you don't know when user will need ride)
- Must be very fast (under 2 seconds)</div>

                <h3>Scaling the Serving System</h3>
                <div class="code-block">What if 100,000 users request predictions simultaneously?

Solution: Run MULTIPLE copies of the model:

                [User] →
[User] → [Load Balancer] → [Model Copy 1]
[User] →                  → [Model Copy 2]
[User] →                  → [Model Copy 3]
                           → [Model Copy 4]

Load balancer distributes requests evenly.
If one copy crashes → others keep working.
Need more capacity? → Add another copy.

This is called HORIZONTAL SCALING.</div>

                <h2>Part 3: The Monitoring System</h2>

                <h3>What to Watch</h3>
                <div class="code-block">Monitoring checks four things:

1. Is the MODEL still accurate?
   - Was 95% accurate when deployed
   - Is it still 95% accurate today?
   - If dropped to 70% → Something is wrong!

2. Is the INPUT DATA normal?
   - Data coming in looks different from training data?
   - Age suddenly all showing as 0? (data bug!)
   - New categories appearing unexpectedly?

3. Is the SYSTEM healthy?
   - Response times fast enough?
   - Any errors happening?
   - CPU/memory usage normal?

4. Are BUSINESS metrics good?
   - Are users clicking recommendations?
   - Are conversions happening?
   - Revenue normal for this time period?</div>

                <h3>Dashboards and Alerts</h3>
                <div class="code-block">A monitoring dashboard shows:

┌─────────────────────────────────────┐
│     ML Model Health Dashboard       │
│                                     │
│  Model Accuracy:  95.2%  ✓ Normal   │
│  Requests/sec:    12,450 ✓ Normal   │
│  Response Time:   145ms  ✓ Normal   │
│  Error Rate:      0.1%   ✓ Normal   │
│  Data Freshness:  5 min  ✓ Normal   │
│                                     │
└─────────────────────────────────────┘

If something goes wrong:

┌─────────────────────────────────────┐
│     ML Model Health Dashboard       │
│                                     │
│  Model Accuracy:  67.3%  🔴 ALERT!  │
│  Requests/sec:    12,450 ✓ Normal   │
│  Response Time:   145ms  ✓ Normal   │
│  Error Rate:      0.1%   ✓ Normal   │
│  Data Freshness:  3 hrs  🔴 STALE!  │
│                                     │
└─────────────────────────────────────┘

Alerts go to the on-call engineer immediately!</div>

                <h2>Putting It All Together: Netflix Architecture (Simplified)</h2>

                <div class="code-block">Netflix's ML system (simplified):

DATA COLLECTION:
User watches a show → event logged → stored in data lake

TRAINING (Nightly):
Data lake → clean → features → train model → save new model

SERVING (Real-time):
User opens app → request → load features → run model → show recommendations

MONITORING (Continuous):
Watch accuracy → watch data quality → watch system health → alert if problems

The flow:
┌──────────┐    ┌──────────┐    ┌──────────┐
│  DATA    │ → │ TRAINING │ →  │  MODEL   │
│          │    │          │    │ (saved)  │
└──────────┘    └──────────┘    └────┬─────┘
                                     │
                                     ▼
┌──────────┐    ┌──────────┐    ┌──────────┐
│   USER   │ ←  │ SERVING  │ ←  │  MODEL   │
│  SEES IT │    │ SYSTEM   │    │  LOADED  │
└──────────┘    └──────────┘    └──────────┘
                     │
                     ▼
              ┌──────────┐
              │MONITORING│
              │  (24/7)  │
              └──────────┘</div>

                <h2>Design Decisions: What to Choose?</h2>

                <h3>Decision 1: Batch or Real-Time?</h3>
                <div class="code-block">Ask yourself: "Does the user need the answer RIGHT NOW?"

YES → Real-time serving
   Examples: Uber matching, fraud detection, chatbots
   Challenge: Must be very fast

NO → Batch serving (pre-compute)
   Examples: Netflix recommendations, product suggestions
   Benefit: Much simpler to build</div>

                <h3>Decision 2: How Often to Retrain?</h3>
                <div class="code-block">Retrain schedule depends on how fast data changes:

Changes fast → Retrain often
   Fraud detection: new scam patterns daily → retrain daily
   Stock predictions: market changes hourly → retrain hourly

Changes slowly → Retrain less often
   Movie recommendations: taste changes monthly → retrain weekly
   House prices: change yearly → retrain monthly</div>

                <h3>Decision 3: One Model or Many?</h3>
                <div class="code-block">One model for everything:
   Simple to manage
   One team responsible
   But might not be great at anything specific

Separate models for different things:
   Each can be optimized for its task
   Different teams can work independently
   But more complex to manage

Netflix uses DOZENS of models:
- One for "What to show on homepage"
- One for "Similar to what you just watched"
- One for "New releases you might like"
- One for "Trending in your region"
Each model specialized for its purpose.</div>

                <h2>Tracking Your Work: Versioning and Experiments</h2>

                <h3>The Problem: "Which Model Is in Production?"</h3>
                <div class="code-block">Real scenario at a company:

Engineer: "The model is performing badly in production."
Manager: "Which model version is running?"
Engineer: "Uh... model_final_v3_actually_final.pkl?"
Manager: "What data was it trained on?"
Engineer: "I think... last month's data? Or was it two months ago?"
Manager: "What were the hyperparameters?"
Engineer: "Let me check... uh... I can't find my notes."

This happens ALL THE TIME in ML teams.
Without proper tracking, you have NO IDEA what's running in production!</div>

                <h3>Model Versioning: Tracking Every Model You Train</h3>
                <div class="code-block">Just like code needs Git, models need versioning.

Every time you train a model, save:
1. The model file itself (.pkl, .h5, .pt)
2. When it was trained (timestamp)
3. What data it was trained on (data version)
4. What code was used (Git commit hash)
5. Hyperparameters (learning rate, etc.)
6. Performance metrics (accuracy, precision, recall)
7. Who trained it

Example model version:
┌─────────────────────────────────────┐
│  Model: spam-detector               │
│  Version: v2.3.1                    │
│  Trained: 2024-01-15 10:30 AM       │
│  Data: emails_jan2024_cleaned.csv   │
│  Code: git commit abc123f           │
│  Accuracy: 97.2%                    │
│  Trained by: sarah@company.com      │
│  Status: In Production ✓            │
└─────────────────────────────────────┘

Now everyone knows EXACTLY what's running!</div>

                <h3>Model Registry: The Central Repository</h3>
                <div class="code-block">A Model Registry is like GitHub, but for ML models.

Popular model registries:
- MLflow Model Registry (most popular, open source)
- Weights & Biases (W&B)
- AWS SageMaker Model Registry
- Azure ML Model Registry

What it stores:
┌────────────────────────────────────────┐
│         spam-detector Models          │
├────────────────────────────────────────┤
│  v1.0  →  Archived (old)              │
│  v2.0  →  Staging (testing)           │
│  v2.1  →  Staging (testing)           │
│  v2.2  →  Production ✓ (currently live)│
│  v2.3  →  Development (training)      │
└────────────────────────────────────────┘

When you deploy v2.3 to production:
1. Mark v2.3 as "Production"
2. Mark v2.2 as "Archived"
3. Everyone can see what changed
4. Easy to rollback to v2.2 if v2.3 fails

The registry answers:
- What model is in production?
- What models have we trained?
- How did performance change over time?
- Can we roll back to a previous version?</div>

                <h3>MLflow Example: Tracking a Model</h3>
                <div class="code-block">Simple Python example using MLflow:

import mlflow

# Start tracking this experiment
mlflow.start_run()

# Log parameters (hyperparameters)
mlflow.log_param("learning_rate", 0.01)
mlflow.log_param("num_trees", 100)

# Train your model (your code here)
model = train_random_forest(data)

# Log metrics (performance)
mlflow.log_metric("accuracy", 0.95)
mlflow.log_metric("precision", 0.93)

# Save the model to registry
mlflow.sklearn.log_model(model, "spam_detector")

mlflow.end_run()

Now this model is tracked forever!
You can view all experiments in MLflow's web UI.</div>

                <h3>Data Versioning: Tracking Training Data</h3>
                <div class="code-block">Problem: Models are trained on data. Data changes. How do you know which data was used?

Scenario:
January: Trained model on jan_data.csv → 95% accuracy
March: Retrained on mar_data.csv → 87% accuracy

What changed in the data?
Without data versioning → You have NO IDEA
With data versioning → You can compare and see exactly what changed

Data Version Control (DVC) is like Git for data:

$ dvc add training_data.csv
$ git add training_data.csv.dvc
$ git commit -m "Training data for v2.3"
$ dvc push  # Uploads data to cloud storage

Now your data is versioned alongside your code!

Benefits:
✓ Reproduce any experiment (same code + same data = same model)
✓ Compare different data versions
✓ Roll back to previous data if needed
✓ Team members can access exact data you used</div>

                <h3>Experiment Tracking: Comparing Models Side-by-Side</h3>
                <div class="code-block">You train 20 models with different settings.
Which one was best? Without tracking → you probably forgot!

Experiment tracking tools:
- MLflow (most popular, free)
- Weights & Biases (W&B) (beautiful UI)
- TensorBoard (for deep learning)

What you track per experiment:
┌────────────────────────────────────────────────────┐
│  Experiment: Improve Spam Detection                │
├────────────────────────────────────────────────────┤
│  Run 1: lr=0.001, trees=50  → accuracy: 94.2%     │
│  Run 2: lr=0.01,  trees=50  → accuracy: 95.1% ✓   │
│  Run 3: lr=0.01,  trees=100 → accuracy: 95.3% ✓✓  │
│  Run 4: lr=0.1,   trees=100 → accuracy: 91.8%     │
└────────────────────────────────────────────────────┘

Run 3 is the best! Deploy that one.

You can also track:
- Training time (how long each experiment took)
- Loss curves (how loss decreased during training)
- Confusion matrices
- Sample predictions</div>

                <h3>Putting It All Together: A Complete Workflow</h3>
                <div class="code-block">Day 1: Train a model
  → Track experiment in MLflow
  → Log hyperparameters, metrics, training time
  → Version the training data with DVC
  → Save model to Model Registry as v2.4

Day 5: Model v2.4 performs well in staging
  → Promote v2.4 to "Production" status in registry
  → Deploy to servers
  → Start monitoring

Day 30: Accuracy drops from 95% to 88%
  → Check Model Registry: v2.4 is still in production
  → Check data version: training data was from December
  → Current data: January (different patterns!)
  → Solution: Retrain with January data → create v2.5

Day 32: Deploy v2.5
  → Mark v2.5 as "Production"
  → Keep v2.4 available for quick rollback if needed

This is professional MLOps!</div>

                <h2>Summary</h2>
                <ul style="margin: 1rem 0; margin-left: 2rem;">
                    <li>ML systems have three parts: Training (the kitchen), Serving (the waiter), Monitoring (the health inspector)</li>
                    <li>Training: Data → Clean → Features → Model. Feature selection matters as much as the algorithm</li>
                    <li>Feature stores solve the problem of teams computing the same features differently</li>
                    <li>Serving can be batch (pre-computed answers) or real-time (computed on demand)</li>
                    <li>Monitoring watches model accuracy, input data, system health, and business metrics</li>
                    <li>Key design decisions: batch vs real-time, how often to retrain, one model vs many</li>
                    <li>Model versioning tracks every model you train with all metadata (data used, hyperparameters, performance)</li>
                    <li>Model Registry is the central repository where all models are stored and tracked (which is in production, staging, archived)</li>
                    <li>Data versioning (DVC) tracks changes in training data, making experiments reproducible</li>
                    <li>Experiment tracking (MLflow, W&B) helps compare different model runs to find the best one</li>
                </ul>

                <p>Next lesson: <strong>How to actually deploy and test ML models</strong> — the hands-on implementation side!</p>
            `,
            interviews: [
                {
                    question: "What are the three main parts of an ML system?",
                    answer: "1) Training system (the kitchen) — where models learn from data, runs periodically, needs computing power. 2) Serving system (the waiter) — delivers predictions to users in real-time, must be fast and scalable. 3) Monitoring system (the health inspector) — watches for problems 24/7, alerts on accuracy drops or data issues."
                },
                {
                    question: "What is feature engineering and why is it important?",
                    answer: "Feature engineering is selecting which data points the model should pay attention to. Good features (like 'items_viewed_today' for purchase prediction) make models much more accurate. Bad features (like 'user's first name length') add noise. Often, choosing better features matters more than changing the algorithm itself."
                },
                {
                    question: "What is a feature store and why is it needed?",
                    answer: "A feature store is a shared library where teams define and compute features consistently. Without it, different teams might compute 'user_age' differently, causing inconsistent predictions. A feature store ensures everyone uses the same definitions, computes features once, and reuses them across models."
                },
                {
                    question: "What's the difference between batch and real-time serving?",
                    answer: "Batch serving pre-computes predictions ahead of time (e.g., Netflix computes all movie ratings nightly — super fast at lookup time). Real-time serving computes predictions on demand when requested (e.g., Uber driver matching can't be pre-computed since you don't know when someone needs a ride). Choose based on whether predictions need to be instant."
                },
                {
                    question: "What four things should you monitor in an ML system?",
                    answer: "1) Model accuracy — is it still performing as well as when deployed? 2) Input data quality — is incoming data normal or has something changed? 3) System health — response times, error rates, CPU usage. 4) Business metrics — are users clicking, converting, and generating revenue as expected?"
                },
                {
                    question: "What is a Model Registry and why is it important?",
                    answer: "A Model Registry is a central repository that tracks all trained models with their metadata (version, training date, data used, hyperparameters, performance). It shows which model is in Production, Staging, or Archived. Essential for answering: 'What model is currently running?' and enabling quick rollbacks when deployments fail. Popular tools: MLflow, Weights & Biases, AWS SageMaker."
                },
                {
                    question: "What information should you track for each model version?",
                    answer: "For each model version, track: 1) The model file itself, 2) Training timestamp, 3) Data version used for training, 4) Code version (git commit), 5) Hyperparameters, 6) Performance metrics (accuracy, etc.), 7) Who trained it, 8) Current status (Production/Staging/Archived). This makes every model reproducible and debuggable."
                },
                {
                    question: "What is data versioning and why do you need it?",
                    answer: "Data versioning tracks changes in training data over time, similar to Git for code. Tools like DVC (Data Version Control) let you version datasets, making experiments reproducible. Without it, you can't recreate old models or understand why performance changed. Example: 'Model v2.3 trained on jan_data.csv got 95% accuracy' — with data versioning, you can retrieve that exact dataset later."
                },
                {
                    question: "What is experiment tracking and how does it help?",
                    answer: "Experiment tracking records every training run with its hyperparameters, metrics, and artifacts. Tools like MLflow and Weights & Biases let you compare runs side-by-side to find the best model. Example: You try 20 different learning rates — experiment tracking shows which one gave the highest accuracy. Without it, you'd forget which settings worked best."
                }
            ]
        },
        {
            id: 'deploying-testing-models',
            title: 'Deploying and Testing ML Models - How to Ship Safely',
            duration: '55 min',
            content: `
                <h2>Getting Your Model to Users</h2>
                <p>You've trained a model, tested it, and it looks great. Now comes the tricky part: <strong>getting it to real users without breaking anything.</strong> This is where deployment strategies come in.</p>

                <h3>Why Deployment is Risky</h3>
                <div class="code-block">What can go wrong when you deploy a new model:

1. The model works differently on real data
   - Training data ≠ real-world data
   - Edge cases you didn't test

2. The model is too slow
   - Worked fast on your server
   - Production server is different

3. The model gives bad predictions for certain users
   - Works great for most people
   - Terrible for a specific group

4. You can't easily tell if it's working
   - No automatic checking
   - By the time you notice, millions affected

Solution: Deploy CAREFULLY, test BEFORE full release,
have a plan to ROLL BACK if something goes wrong.</div>

                <h2>Deployment Strategy 1: Blue-Green Deployment</h2>

                <h3>The Idea: Two Copies, Switch Instantly</h3>
                <div class="code-block">Think of it like two identical restaurants:

Blue Restaurant: Currently serving all customers (OLD model)
Green Restaurant: Ready with the NEW model (tested, waiting)

When you're confident in Green:
→ Switch ALL traffic from Blue to Green instantly
→ If something goes wrong: switch BACK to Blue instantly

       Before Switch:
       Users → Blue Restaurant (OLD model) ✓
       Green Restaurant (NEW model, waiting)

       After Switch:
       Users → Green Restaurant (NEW model) ✓
       Blue Restaurant (OLD model, on standby)

       If problem:
       Users → Blue Restaurant (OLD model) ← instant rollback!

Benefits:
✓ Very fast rollback (switch back in seconds)
✓ Zero downtime during switch
✓ Simple to understand

Downsides:
✗ Need to run TWO copies (costs more)
✗ All users switch at once (100% risk)</div>

                <h2>Deployment Strategy 2: Canary Deployment</h2>

                <h3>The Idea: Test with a Small Group First</h3>
                <p>Named after canary birds in coal mines — they'd detect danger before miners went in.</p>

                <div class="code-block">Step 1: Deploy new model to 1% of users
→ 99% still use the old model
→ 1% (the "canary") uses the new model
→ Watch CAREFULLY for problems

Step 2: If canary is healthy, expand to 5%
→ 95% old model, 5% new model
→ Watch for more problems

Step 3: Expand to 25%
Step 4: Expand to 50%
Step 5: Expand to 100%

       Start:    ████████████████████ (100% old)
       1%:       █████████████████▓██ (99% old, 1% new)
       10%:      ██████████████████░░ (90% old, 10% new)
       50%:      ██████████░░░░░░░░░░ (50% old, 50% new)
       100%:     ░░░░░░░░░░░░░░░░░░░░ (100% new)

Benefits:
✓ Problems caught early (only 1% affected)
✓ Gradual, controlled rollout
✓ Easy to stop if something's wrong

Example: Netflix deploys recommendation changes like this.
First test with 10,000 users. If good → expand to millions.</div>

                <h2>Deployment Strategy 3: Shadow Deployment</h2>

                <h3>The Idea: Run the New Model Silently</h3>
                <div class="code-block">Both models run simultaneously, but only the OLD one shows results to users.
The NEW model runs in the background, making predictions nobody sees.
You compare both models' predictions to see how the new one would have done.

How it works:
User request → OLD model → Shows result to user
            → NEW model → Prediction saved (but NOT shown)

After a week, compare:
OLD model predictions vs NEW model predictions vs actual outcomes

If NEW model would have been better → Deploy it!
If NEW model would have been worse → Don't deploy!

Benefits:
✓ Zero risk to users (they never see new model's output)
✓ Real production data (not just test data)
✓ Can run for days/weeks before deciding

Use this for HIGH STAKES models (fraud detection, medical, finance).</div>

                <h2>A/B Testing: The Scientific Way</h2>

                <h3>What is A/B Testing?</h3>
                <p>A/B testing is showing two different versions to two random groups and measuring which one works better. Companies use this ALL the time.</p>

                <div class="code-block">Example: New recommendation model for Netflix

Group A (50% of users): See OLD recommendations
Group B (50% of users): See NEW recommendations

You don't tell users which group they're in.
Both groups don't know an experiment is running.

After 1 week, measure:
Group A: 22% of users clicked a recommendation
Group B: 28% of users clicked a recommendation

Group B (new model) is clearly better!
→ Roll out new model to everyone.

Key rules:
- Groups must be RANDOM (not age-based or location-based)
- Groups must be BIG ENOUGH (statistical significance)
- Run long enough to see real patterns
- Measure the RIGHT metrics</div>

                <h3>What Metrics to Watch</h3>
                <div class="code-block">Good metrics to track in A/B tests:

For recommendations:
- Click-through rate: Did users click suggestions?
- Watch time: Did users actually watch the content?
- Time to first action: How quickly did they engage?

For fraud detection:
- False positives: Blocked legitimate transactions? (bad!)
- False negatives: Missed real fraud? (bad!)
- Detection speed: How fast was fraud caught?

For price predictions:
- Prediction accuracy: How close to actual price?
- User satisfaction: Did users find the price fair?

AVOID "vanity metrics":
- Don't just count "predictions made" (that's your system, not the model)
- Measure things that actually MATTER to the business</div>

                <h2>Testing ML Models Before Deployment</h2>

                <h3>Testing Pyramid: Multiple Layers of Safety</h3>
                <div class="code-block">Layer 1: Unit Tests (Quick Checks)
"Does each small piece work?"
- Does the preprocessing code handle missing data?
- Does the feature calculator return correct values?
- Does the model output the right format?

Layer 2: Integration Tests
"Do the pieces work TOGETHER?"
- Does data flow correctly from source to model?
- Does the prediction service return results?
- Does the monitoring system receive events?

Layer 3: Model Tests
"Is the MODEL actually good?"
- Is accuracy above our minimum threshold (e.g., 90%)?
- Does it work well for all user groups? (fairness)
- Does it handle edge cases? (empty input, unusual values)

Layer 4: Load Tests
"Can it handle LOTS of users?"
- Send 100,000 fake requests per second
- Does it stay fast? Does it crash?
- Does response time stay under 200ms?

All layers must pass before deployment!</div>

                <h3>Model Cards: Documenting What Your Model Does</h3>
                <div class="code-block">A Model Card is like a nutrition label for ML models:

Model: Spam Detector v2.3
Created: January 15, 2024
Purpose: Classify incoming emails as spam or not spam

Performance:
- Overall accuracy: 97.2%
- Precision: 96.8% (of emails it marks spam, 96.8% are actually spam)
- Recall: 97.5% (of actual spam, it catches 97.5%)

Known Limitations:
- Struggles with emails in languages other than English
- May miss new types of spam not in training data
- Less accurate for very short emails (< 10 words)

Training Data:
- 5 million emails from 2023
- 60% spam, 40% legitimate
- English language only

Who to contact: sarah@company.com

Why this matters: Everyone who uses this model
knows exactly what it does and doesn't do!</div>

                <h2>Optimizing Your Model: Hyperparameter Tuning</h2>

                <h3>What Are Hyperparameters?</h3>
                <div class="code-block">Hyperparameters are the settings you choose BEFORE training.

The model LEARNS parameters during training (like weights).
But YOU must choose hyperparameters (like learning rate).

Example hyperparameters:
- Learning rate: How fast the model learns (0.001? 0.01? 0.1?)
- Number of trees: In a random forest (50? 100? 500?)
- Batch size: How many examples to process at once (32? 64? 128?)
- Number of layers: In a neural network (3? 5? 10?)

Bad hyperparameters → Bad model (even with great data!)
Good hyperparameters → Good model

Problem: How do you find the best hyperparameters?</div>

                <h3>Method 1: Grid Search (Try Everything)</h3>
                <div class="code-block">Grid search tries EVERY combination systematically.

Example: Finding best learning rate and number of trees

Learning rates to try: [0.001, 0.01, 0.1]
Number of trees to try: [50, 100, 200]

Grid search tries ALL 9 combinations:
┌─────────────────────────────────────────┐
│ lr=0.001, trees=50   → accuracy: 92.1% │
│ lr=0.001, trees=100  → accuracy: 93.4% │
│ lr=0.001, trees=200  → accuracy: 93.8% │
│ lr=0.01,  trees=50   → accuracy: 94.5% │
│ lr=0.01,  trees=100  → accuracy: 95.2% ✓│
│ lr=0.01,  trees=200  → accuracy: 95.1% │
│ lr=0.1,   trees=50   → accuracy: 91.3% │
│ lr=0.1,   trees=100  → accuracy: 92.8% │
│ lr=0.1,   trees=200  → accuracy: 93.1% │
└─────────────────────────────────────────┘

Best: lr=0.01, trees=100 → 95.2% accuracy

Pros:
✓ Simple to understand
✓ Guaranteed to find the best in the grid

Cons:
✗ VERY slow (3 values × 3 values = 9 trainings)
✗ Gets exponentially slower with more hyperparameters
  (4 hyperparameters with 5 values each = 625 trainings!)</div>

                <h3>Method 2: Random Search (Try Randomly)</h3>
                <div class="code-block">Random search picks hyperparameter combinations randomly.

Instead of trying ALL 625 combinations:
→ Try 50 random combinations
→ Pick the best one

Why this works:
- Most hyperparameters don't matter much
- A few are VERY important
- Random search finds good values for important ones faster

Example: 50 random tries
┌─────────────────────────────────────────┐
│ Try 1:  lr=0.023, trees=147 → 94.1%    │
│ Try 2:  lr=0.008, trees=83  → 93.7%    │
│ Try 3:  lr=0.051, trees=192 → 92.8%    │
│ ...                                     │
│ Try 23: lr=0.012, trees=95  → 95.4% ✓  │
│ ...                                     │
│ Try 50: lr=0.089, trees=210 → 91.2%    │
└─────────────────────────────────────────┘

Found 95.4% accuracy in 50 tries (much faster than grid search!)

Pros:
✓ Much faster than grid search
✓ Often finds good values quickly

Cons:
✗ Might miss the absolute best
✗ Still requires many training runs</div>

                <h3>Method 3: Bayesian Optimization (Smart Search)</h3>
                <div class="code-block">Bayesian optimization learns from previous tries.

How it works (simplified):
1. Try a few random combinations
2. Build a model of "which areas look promising"
3. Try combinations in promising areas
4. Update the model
5. Repeat until satisfied

Example:
Try 1: lr=0.01, trees=50   → 94.5%
Try 2: lr=0.1,  trees=200  → 91.3%

Model thinks: "Lower learning rates seem better"

Try 3: lr=0.005, trees=100 → 95.1%  ← Tried a similar area
Try 4: lr=0.008, trees=120 → 95.3%  ← Even better!
Try 5: lr=0.007, trees=110 → 95.5%  ← Found it!

Instead of 50 random tries, found great hyperparameters in 5!

Pros:
✓ MUCH faster than random or grid search
✓ Learns from each experiment
✓ Focuses on promising areas

Cons:
✗ More complex to set up
✗ Needs special libraries (Optuna, Hyperopt, Ray Tune)

Best for: Deep learning models that take hours to train</div>

                <h3>Practical Tips for Hyperparameter Tuning</h3>
                <div class="code-block">1. Start with defaults
   Most libraries have reasonable defaults. Try those first.

2. Tune the most important hyperparameters first
   Learning rate usually matters MOST. Start there.

3. Use a validation set
   Never tune on your test set! Use a separate validation set.

4. Don't overtune
   A model that's 95.2% vs 95.3% doesn't matter.
   Diminishing returns after a certain point.

5. Track everything
   Use MLflow or W&B to track all experiments.
   You'll forget which settings you tried!

6. Use early stopping
   If accuracy stops improving after 10 epochs, stop training.
   Saves time during hyperparameter search.</div>

                <h2>Understanding Your Model: Explainability</h2>

                <h3>Why Explainability Matters</h3>
                <div class="code-block">Scenario 1: Your model rejects a loan application
Applicant: "Why was I rejected?"
You: "The model said so."
Applicant: "But WHY?"
You: "Uh... I don't know. The model is a black box."

This is a LEGAL and ETHICAL problem!

Scenario 2: Your model's accuracy drops
You: "Why did performance drop?"
Your model: [black box silence]
You: "I have no idea what went wrong..."

Without explainability:
- Can't debug models when they fail
- Can't comply with regulations (EU's GDPR requires explanations)
- Can't build user trust
- Can't catch bias or unfairness</div>

                <h3>Feature Importance: Which Features Matter?</h3>
                <div class="code-block">Feature importance shows which features the model uses most.

Example: Predicting house prices

Feature Importance:
┌────────────────────────────────┐
│ Square footage:    45% ████████│
│ Location:          30% ██████  │
│ Number of bedrooms:15% ███     │
│ Age of house:       8% ██      │
│ Paint color:        2% ▏       │
└────────────────────────────────┘

Insight: Paint color barely matters! Location and size matter most.

If the model suddenly performs badly:
→ Check if square footage data is corrupted
→ That's the most important feature!

Most ML libraries provide feature importance built-in:
- sklearn: model.feature_importances_
- XGBoost: model.get_score()
- LightGBM: model.feature_importance()</div>

                <h3>SHAP: Explaining Individual Predictions</h3>
                <div class="code-block">SHAP (SHapley Additive exPlanations) explains WHY a specific prediction was made.

Example: Loan application rejected

Applicant A:
Base prediction: 50% approval chance
+ Income is high:        +25% ✓
+ Credit score is good:  +20% ✓
+ Debt is very high:     -40% ✗
+ Age is appropriate:    +5%  ✓
= Final prediction: 60% → REJECTED

Why rejected? DEBT was the deciding factor (-40%)

Applicant B:
Base prediction: 50%
+ Income is very high:   +35% ✓
+ Credit score is good:  +20% ✓
+ Debt is moderate:      -5%  ✗
+ Age is appropriate:    +5%  ✓
= Final prediction: 105% → APPROVED

Now you can tell the applicant EXACTLY why:
"Your debt-to-income ratio was too high. Reducing debt by $5,000 would likely result in approval."

This is MUCH better than "computer says no"!</div>

                <h3>LIME: Local Explanations</h3>
                <div class="code-block">LIME (Local Interpretable Model-agnostic Explanations) explains
predictions by creating a simple model around one prediction.

Example: Spam detection

Email: "Congratulations! You won $1,000,000! Click here to claim!"

Model: 99.8% SPAM

LIME explanation — which words mattered most:
┌──────────────────────────────────┐
│ "won"             → +35% SPAM    │
│ "$1,000,000"      → +30% SPAM    │
│ "congratulations" → +20% SPAM    │
│ "click here"      → +15% SPAM    │
│ "claim"           → +10% SPAM    │
└──────────────────────────────────┘

If the model starts misclassifying normal emails:
→ Check if normal emails contain these trigger words
→ The model might be overfitting to specific words

LIME works for ANY model (neural networks, random forests, etc.)</div>

                <h3>When to Use Each Explainability Method</h3>
                <div class="code-block">Feature Importance:
Use when: You want to understand the model overall
Question: "What features matter most in general?"
Example: "Location matters more than paint color for house prices"

SHAP:
Use when: You need to explain individual predictions
Question: "Why was THIS specific prediction made?"
Example: "Your loan was rejected because of high debt"
Required for: Regulatory compliance, user trust

LIME:
Use when: You have a complex black-box model
Question: "What drove this one prediction?"
Example: "This email was spam because of the word 'won'"
Best for: Debugging individual weird predictions

Real-world usage:
- Financial services: MUST use SHAP or LIME (regulations)
- Healthcare: MUST explain diagnoses (liability)
- Recommendations: Feature importance is enough
- Debugging: All three are useful!</div>

                <h2>CI/CD for Machine Learning</h2>

                <h3>What is CI/CD? (Quick Explanation)</h3>
                <div class="code-block">CI = Continuous Integration
"Automatically check code when someone changes it"

CD = Continuous Delivery
"Automatically deliver code to production when tests pass"

For regular software:
Developer writes code → automatic tests → if tests pass → deploy

For ML, it's more complex:
Developer changes code → test code → test data → train model →
test model → if everything passes → deploy model

Example pipeline:

1. Engineer updates training code on Monday
2. Automatically: run unit tests (2 minutes)
3. Automatically: retrain model with new code (1 hour)
4. Automatically: test model accuracy (30 minutes)
5. Automatically: if accuracy > 90% → deploy to canary
6. Watch canary for 1 hour
7. If metrics good → deploy to everyone

All of this happens without manual intervention!</div>

                <h2>Rolling Back: When Things Go Wrong</h2>

                <div class="code-block">What happens when you deploy a bad model:

1. DETECT the problem (monitoring alerts)
   "Accuracy dropped from 95% to 60%!"

2. DECIDE to rollback (within minutes)
   "Something is clearly wrong, revert!"

3. ROLLBACK to previous model
   Switch traffic back to old model
   Should take < 1 minute

4. INVESTIGATE what went wrong
   Look at logs, data, model behavior
   Find root cause

5. FIX the problem
   Fix the code or data issue
   Retrain model

6. REDEPLOY carefully
   Use canary deployment this time

The faster you can rollback, the less damage a bad model does.
Good MLOps = rollback in under 1 minute.</div>

                <h2>Real Example: How Stripe Deploys Fraud Models</h2>

                <div class="code-block">Stripe (payment processor) deploys fraud detection models:

Step 1: Train model with recent fraud data
Step 2: Test model offline (shadow mode for 2 weeks)
   - Model runs on real transactions but doesn't act
   - Compare its predictions vs actual fraud
Step 3: Deploy to 1% of transactions (canary)
   - Watch for 48 hours
   - False positive rate normal? Detection rate improved?
Step 4: Gradually expand to 100%
Step 5: Monitor continuously

Why so careful?
- Wrong prediction = blocking a real customer's payment
- Missing fraud = losing real money
- Both are very expensive mistakes
- Slow and careful deployment protects everyone</div>

                <h2>Summary</h2>
                <ul style="margin: 1rem 0; margin-left: 2rem;">
                    <li>Deployment is risky — models can behave differently on real data</li>
                    <li>Blue-green: two copies, switch instantly. Best for: fast rollback</li>
                    <li>Canary: deploy to small group first, expand gradually. Best for: catching problems early</li>
                    <li>Shadow: run new model silently, compare to old. Best for: zero-risk testing</li>
                    <li>A/B testing: show two versions to random groups, measure which is better</li>
                    <li>Testing pyramid: unit tests → integration tests → model tests → load tests</li>
                    <li>Model cards document what a model does, its limitations, and performance</li>
                    <li>Hyperparameter tuning: Grid search (try everything), Random search (faster), Bayesian optimization (smartest)</li>
                    <li>Model explainability: Feature importance (overall), SHAP (individual predictions), LIME (local explanations)</li>
                    <li>Explainability is required for debugging, regulatory compliance, and building user trust</li>
                    <li>CI/CD automates the whole pipeline from code change to deployment</li>
                </ul>

                <p>Final lesson: <strong>Keeping your models healthy</strong> long after they're deployed!</p>
            `,
            interviews: [
                {
                    question: "What is canary deployment and why is it preferred for ML models?",
                    answer: "Canary deployment gradually rolls out a new model: start with 1% of users, expand to 5%, 25%, 50%, 100% only if each step looks good. If problems appear, stop the rollout. It's preferred because it limits the blast radius — if the model is bad, only a small percentage of users are affected before you catch the problem."
                },
                {
                    question: "What is shadow deployment?",
                    answer: "Shadow deployment runs the new model in the background alongside the old one. Users only see the old model's predictions. The new model's predictions are saved and compared to real outcomes. After enough time, you can see how the new model would have performed without any risk to users. Best for high-stakes models like fraud detection."
                },
                {
                    question: "How does A/B testing work for ML models?",
                    answer: "Split users randomly into two groups: Group A sees the old model, Group B sees the new model. Run for enough time to get statistically significant results. Measure key metrics (click-through rate, conversions, etc.). If Group B's metrics are meaningfully better, deploy the new model to everyone."
                },
                {
                    question: "What are the layers of testing for ML models?",
                    answer: "Testing pyramid: 1) Unit tests — check individual components work correctly. 2) Integration tests — check components work together. 3) Model tests — check accuracy, fairness across user groups, edge cases. 4) Load tests — simulate thousands of concurrent users to check performance under pressure. All layers must pass before deployment."
                },
                {
                    question: "How is CI/CD different for ML compared to regular software?",
                    answer: "Regular CI/CD: code change → test code → deploy. ML CI/CD adds: code change → test code → retrain model → test model accuracy → test fairness → deploy with canary. ML has extra steps because changing code or data means retraining, and the model itself needs evaluation. Also needs rollback capability if model quality drops."
                },
                {
                    question: "What are hyperparameters and why do they matter?",
                    answer: "Hyperparameters are settings chosen BEFORE training (like learning rate, number of trees, batch size). Unlike parameters that the model learns, hyperparameters must be set by you. Bad hyperparameters lead to poor models even with good data. Good hyperparameters can dramatically improve accuracy."
                },
                {
                    question: "What's the difference between grid search, random search, and Bayesian optimization?",
                    answer: "Grid search tries EVERY combination systematically — thorough but very slow. Random search tries random combinations — much faster, often good enough. Bayesian optimization learns from previous tries and focuses on promising areas — fastest and smartest, but more complex to set up. Use random search for quick tuning, Bayesian for expensive deep learning models."
                },
                {
                    question: "What is SHAP and when should you use it?",
                    answer: "SHAP (SHapley Additive exPlanations) explains individual predictions by showing how each feature contributed. Example: 'Your loan was rejected because high debt (-40%) outweighed good income (+25%) and credit score (+20%).' Use SHAP when you need to explain specific predictions for regulatory compliance, user trust, or debugging edge cases."
                },
                {
                    question: "Why is model explainability important?",
                    answer: "1) Regulatory compliance — EU GDPR and financial regulations require explanations. 2) Debugging — can't fix what you don't understand. 3) User trust — 'computer says no' isn't acceptable. 4) Detecting bias — spot if model discriminates unfairly. 5) Business insight — learn which features drive predictions to improve products."
                }
            ]
        },
        {
            id: 'keeping-models-healthy',
            title: 'Keeping Models Healthy - Monitoring, Drift, and Incident Response',
            duration: '55 min',
            content: `
                <h2>Models Don't Stay Good Forever</h2>
                <p>Here's the thing nobody tells you at first: <strong>a model that was 95% accurate when you deployed it might drop to 60% accurate three months later.</strong> The real world changes. Your model doesn't.</p>

                <h3>Why Models Degrade</h3>
                <div class="code-block">Real world changes, model doesn't (unless you update it):

Example 1: Spam Filter
January: Spammers use "Buy cheap pills"
March: Nobody sends that anymore
March: Spammers now use "Crypto opportunity"
Your model: Still looking for old spam patterns!
Result: New spam gets through to inbox

Example 2: Price Prediction
Training data: Prices from 2022
Reality: Prices changed 30% due to inflation
Your model: Still predicts 2022 prices
Result: Predictions are way off

Example 3: Recommendation System
Training data: User preferences from before COVID
Reality: People's entertainment habits changed drastically
Your model: Recommends old-style content
Result: Users don't engage, click less

This is called DRIFT. It's the #1 enemy of production ML models.</div>

                <h2>Two Types of Drift</h2>

                <h3>Data Drift: The Input Changed</h3>
                <div class="code-block">Data drift = the data coming INTO the model looks different
from what it was trained on.

Example: User age distribution

During training (data from 2020):
- Average user age: 35
- Most users: age 25-45

In production (data from 2024):
- Average user age: 28
- Most users: age 18-30
- App became popular with younger people!

The MODEL still expects users to be 25-45.
Now it gets 18-30 year olds.
Predictions might be wrong because the inputs changed!

How to detect: Compare incoming data distribution
to training data distribution regularly.</div>

                <h3>Concept Drift: The Rules Changed</h3>
                <div class="code-block">Concept drift = the RELATIONSHIP between inputs and outputs changed.

Even if the data looks the same, the correct answer is different now.

Example: Fraud Detection

In 2020: Large purchase from a new country = probably fraud
In 2024: People travel more, this is normal now
Same input (large purchase, new country) →
Different correct answer (not fraud anymore!)

Example: COVID Impact on Everything
January 2020: Many people go to gyms → health conscious
April 2020: Nobody goes to gyms → COVID lockdowns
Same behavior (gym visits) → completely different meaning

Concept drift is HARDER to detect because the input data
might look completely normal!</div>

                <h2>How to Monitor for Drift</h2>

                <h3>Statistical Monitoring (Simple Explanation)</h3>
                <div class="code-block">Method 1: Watch the averages

Training data average age: 35
Production data average age:
- Day 1: 35.2 → Normal ✓
- Day 15: 34.8 → Normal ✓
- Day 30: 32.1 → Hmm, dropping...
- Day 45: 28.5 → Alert! Significant change! 🔴

Method 2: Watch the distribution shape

Training: Most users aged 25-45 (bell curve)
Production: Now users are aged 18-30 (shifted left)
→ Distribution changed! Alert!

Method 3: Watch the model's confidence

Model confidence on average:
- Day 1: 94% confident → Normal ✓
- Day 15: 91% confident → Slightly lower
- Day 30: 78% confident → Alert! Losing confidence! 🔴

When confidence drops, model is seeing unfamiliar data.</div>

                <h3>Business Metric Monitoring</h3>
                <div class="code-block">Don't just watch the model — watch what USERS do:

Recommendation model metrics:
- Click-through rate: 25% → 24% → 22% → 18% 🔴
  Users clicking less = recommendations getting worse

Fraud model metrics:
- Blocked transactions: 0.5% → 0.5% → 0.5% → 0.8%
  More blocks might mean MORE fraud (drift!) or false positives

Price prediction:
- User complaints: 10/day → 12/day → 25/day → 45/day 🔴
  Users complaining about prices = predictions way off

Business metrics often catch problems BEFORE
technical metrics do!</div>

                <h2>When to Retrain Your Model</h2>

                <div class="code-block">Three triggers for retraining:

1. SCHEDULED (Planned)
   "Retrain every Monday at 2 AM regardless"
   Simple and reliable
   Used by: most recommendation systems

2. PERFORMANCE-TRIGGERED (Smart)
   "If accuracy drops below 90%, retrain immediately"
   More reactive, catches sudden changes
   Used by: fraud detection systems

3. DRIFT-TRIGGERED (Proactive)
   "If input data distribution changes significantly, retrain"
   Catches drift before it hurts accuracy
   Used by: advanced ML teams

Most companies use a combination of all three!</div>

                <h2>Incident Response: When Things Go Wrong</h2>

                <h3>The Process (Step by Step)</h3>
                <div class="code-block">Step 1: DETECT (Automated)
   Monitoring system spots a problem
   "Accuracy dropped from 95% to 65%!"
   Alert sent to on-call engineer
   Time: Seconds to minutes

Step 2: TRIAGE (Assess)
   Engineer looks at the alert
   "How bad is this? How many users affected?"
   "Is it getting worse or stable?"
   Time: 5-10 minutes

Step 3: MITIGATE (Stop the Bleeding)
   Fix the immediate problem
   Option A: Roll back to previous model
   Option B: Disable the feature temporarily
   Option C: Add a filter to catch bad predictions
   Time: Minutes to 30 minutes

Step 4: INVESTIGATE (Find Root Cause)
   "WHY did this happen?"
   Check logs, data, model behavior
   "Was it data drift? A deployment error? A bug?"
   Time: Hours

Step 5: FIX (Prevent It Happening Again)
   Fix the actual problem
   Update monitoring to catch it earlier
   Write documentation

Step 6: POST-MORTEM (Learn)
   Write up what happened, why, and what to do differently
   Share with the team
   Update procedures</div>

                <h3>Real Incident: Zillow's $420 Million Mistake</h3>
                <div class="code-block">What happened:

Zillow used ML to predict house prices ("Zillow Offers").
They'd buy houses at predicted prices and resell them.

The model:
- Trained to predict house prices
- Worked great during testing
- Seemed accurate on paper

What went wrong:
- The model didn't account for market changes properly
- COVID caused massive housing market shifts
- Model kept predicting OLD prices
- Zillow bought thousands of houses at prices too high
- When market dropped, houses worth LESS than purchased

The cost:
- Lost $420 MILLION
- Had to shut down the entire program
- Laid off 25% of employees
- All because the ML model's predictions went wrong
  and nobody caught it in time

Lessons:
1. Monitor model predictions against REAL outcomes
2. Have business limits (don't buy if price seems too high)
3. Human oversight is critical for high-stakes decisions
4. Data drift can be catastrophic if unchecked</div>

                <h3>Real Incident: Twitter's Bias Problem</h3>
                <div class="code-block">What happened:

Twitter's algorithm ranked timeline content.
The model was trained to maximize engagement.

The problem:
- Model learned that controversial content gets more clicks
- Started promoting inflammatory, divisive content
- Certain political viewpoints were amplified unfairly

How they discovered it:
- Users complained publicly
- Researchers studied the algorithm
- Internal team audited model behavior

The fix:
- Retrained with fairness constraints
- Added human review for sensitive content
- Made algorithm more transparent

Lesson:
- ML models can learn UNINTENDED behaviors
- "More engagement" doesn't always mean "better"
- Test for bias and fairness, not just accuracy!</div>

                <h2>Best Practices Checklist</h2>

                <table class="table">
                    <tr>
                        <th>Practice</th>
                        <th>What It Means</th>
                        <th>Why It Matters</th>
                    </tr>
                    <tr>
                        <td>Monitor accuracy daily</td>
                        <td>Check if model is still performing well</td>
                        <td>Catch drift before users notice</td>
                    </tr>
                    <tr>
                        <td>Watch business metrics</td>
                        <td>Track user clicks, conversions, complaints</td>
                        <td>Real impact on the business, not just the model</td>
                    </tr>
                    <tr>
                        <td>Retrain regularly</td>
                        <td>Update model with fresh data</td>
                        <td>Keeps predictions relevant as the world changes</td>
                    </tr>
                    <tr>
                        <td>Have a rollback plan</td>
                        <td>Can revert to previous model in minutes</td>
                        <td>Minimize damage from bad deployments</td>
                    </tr>
                    <tr>
                        <td>Test for fairness</td>
                        <td>Check model works equally for all groups</td>
                        <td>Avoid discriminatory outcomes</td>
                    </tr>
                    <tr>
                        <td>Log everything</td>
                        <td>Record inputs, outputs, and decisions</td>
                        <td>Debug problems quickly when they arise</td>
                    </tr>
                    <tr>
                        <td>Set alerts</td>
                        <td>Automatic notifications when metrics go wrong</td>
                        <td>Respond to problems in minutes, not days</td>
                    </tr>
                </table>

                <h2>The Full MLOps Journey — Start to Finish</h2>

                <div class="code-block">You now understand the COMPLETE journey:

1. UNDERSTAND DATA (Lesson 1-2 in Data Engineering)
   → Data is the foundation of everything

2. UNDERSTAND ML (Lessons 1-2 in this course)
   → Learn what models are and how they learn

3. SEE WHY MLOPS MATTERS (Lesson 3)
   → Kitchen to restaurant gap

4. DESIGN THE SYSTEM (Lesson 4)
   → Training + Serving + Monitoring architecture

5. DEPLOY SAFELY (Lesson 5)
   → Blue-green, canary, shadow, A/B testing

6. KEEP IT HEALTHY (This lesson)
   → Monitor drift, retrain, incident response

This is the loop that runs continuously at companies
like Netflix, Google, Uber, Amazon, and thousands more.
Now you understand how it all works!</div>

                <h2>Summary</h2>
                <ul style="margin: 1rem 0; margin-left: 2rem;">
                    <li>Models degrade over time — the real world changes but the model doesn't (until you retrain it)</li>
                    <li>Two types of drift: Data drift (inputs changed) and Concept drift (the rules changed)</li>
                    <li>Monitor data distributions, model confidence, and business metrics for early warning signs</li>
                    <li>Retrain on schedule, when performance drops, or when drift is detected</li>
                    <li>Incident response: Detect → Triage → Mitigate → Investigate → Fix → Learn</li>
                    <li>Real disasters (Zillow $420M, Twitter bias) show what happens without proper MLOps</li>
                    <li>Best practices: monitor, retrain, have rollback plans, test for fairness, log everything</li>
                </ul>

                <h2>Next Steps</h2>
                <p>You now understand MLOps from the ground up! Here's how to continue learning:</p>
                <ol style="margin: 1rem 0; margin-left: 2rem;">
                    <li><strong>Learn Python:</strong> The most common language for ML and MLOps</li>
                    <li><strong>Practice with real datasets:</strong> Try Kaggle challenges to build models</li>
                    <li><strong>Explore cloud platforms:</strong> AWS SageMaker, Google Vertex AI, or Azure ML offer free trials</li>
                    <li><strong>Build a small project:</strong> Train a model, deploy it, and monitor it — end to end</li>
                    <li><strong>Study the tools:</strong> MLflow (experiment tracking), Kubeflow (ML pipelines), Prometheus (monitoring)</li>
                </ol>

                <p>Every ML system in the world follows these principles. You now have the foundation to understand and build them!</p>
            `,
            interviews: [
                {
                    question: "What is drift in machine learning and why does it matter?",
                    answer: "Drift is when a model becomes less accurate over time because the real world changes. It matters because a model that was 95% accurate at deployment might drop to 60% months later if not monitored. Two types: Data drift (input data distribution changed) and Concept drift (the relationship between inputs and correct answers changed)."
                },
                {
                    question: "What's the difference between data drift and concept drift?",
                    answer: "Data drift: the INPUT data changes (e.g., user demographics shift from average age 35 to average age 28). Concept drift: the RULES change even if input data looks similar (e.g., traveling internationally used to signal fraud, but after COVID it became normal). Concept drift is harder to detect."
                },
                {
                    question: "What happened with Zillow's $420 million ML mistake?",
                    answer: "Zillow used ML to predict house prices for auto-buying. The model didn't properly account for COVID market shifts — it kept predicting old prices. Zillow bought thousands of houses at prices that became too high, losing $420M when the market dropped. Lessons: monitor predictions vs real outcomes, set business limits, have human oversight for high-stakes decisions."
                },
                {
                    question: "What should be monitored in a production ML system?",
                    answer: "Four areas: 1) Model performance metrics (accuracy, precision, recall). 2) Input data quality and distribution (detect data drift). 3) System health (latency, error rates, CPU). 4) Business metrics (click rates, conversions, user complaints). Business metrics often catch problems before technical metrics do."
                },
                {
                    question: "What are the steps in ML incident response?",
                    answer: "Six steps: 1) Detect — automated monitoring spots the problem and alerts. 2) Triage — assess severity and impact. 3) Mitigate — roll back to previous model or disable feature. 4) Investigate — find root cause from logs and data. 5) Fix — resolve the actual issue. 6) Post-mortem — document what happened and how to prevent recurrence."
                }
            ]
        }
    ]
};
