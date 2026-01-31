// MLOps Fundamentals Course
// Real talk about deploying ML systems at scale - from someone who's been in the trenches

const mlopsFundamentals = {
    title: 'MLOps Fundamentals',
    lessons: [
        {
            id: 'what-is-mlops',
            title: 'What is MLOps? The Reality Check',
            duration: '50 min',
            content: `
                <h2>MLOps is NOT What You Think</h2>
                <p>Let me be brutally honest: <strong>MLOps is 90% engineering, 10% machine learning.</strong> If you love tuning hyperparameters and experimenting with models, this might not be for you. But if you love building reliable systems that run 24/7 at scale, welcome home.</p>

                <h3>The Harsh Reality I Learned (2018)</h3>
                <div class="code-block">My first ML "deployment" disaster:

Background:
- Data scientist built fraud detection model
- Jupyter notebook: 95% accuracy (amazing!)
- Took 6 months to train, lots of feature engineering
- Boss: "Ship it to production by Friday"

What I thought deployment meant:
1. Copy code from notebook
2. Run on server
3. Done!

What actually happened:
Monday: Copied model.pkl file to production server
Tuesday: Model serving API crashed (pickle version mismatch)
Wednesday: Fixed pickle, but predictions took 5 seconds each (need <100ms)
Thursday: Optimized, but model used 16GB RAM (server had 8GB)
Friday: Got it running, but model predicted fraud on 90% of transactions
         (training data was from 2017, now 2018 - totally different patterns)
Weekend: CEO email: "Why are we blocking all payments?"
         Emergency meeting. Rolled back. Project "postponed indefinitely"

Time spent:
- Data scientist: 6 months building model
- Me: 1 week trying to deploy
- Result: $0 business value, lots of embarrassment

LESSON: A model in a notebook is worth $0.
        A model in production making decisions is worth millions.
        MLOps is the bridge between those two states.</div>

                <h2>What MLOps Actually Is</h2>

                <p><strong>MLOps = ML + DevOps + Data Engineering + Chaos Engineering</strong></p>

                <p>Your job is to make ML models work reliably in production. That means:</p>

                <table class="table">
                    <tr>
                        <th>Responsibility</th>
                        <th>What It Means</th>
                        <th>Time Spent</th>
                    </tr>
                    <tr>
                        <td><strong>Model Training</strong></td>
                        <td>Automate training pipelines, version everything</td>
                        <td>20%</td>
                    </tr>
                    <tr>
                        <td><strong>Model Deployment</strong></td>
                        <td>Get models to production (fast, safe, repeatable)</td>
                        <td>15%</td>
                    </tr>
                    <tr>
                        <td><strong>Model Serving</strong></td>
                        <td>Serve predictions (fast, scalable, reliable)</td>
                        <td>15%</td>
                    </tr>
                    <tr>
                        <td><strong>Monitoring</strong></td>
                        <td>Detect when models degrade, alert before disaster</td>
                        <td>20%</td>
                    </tr>
                    <tr>
                        <td><strong>Infrastructure</strong></td>
                        <td>GPUs, feature stores, experiment tracking, etc.</td>
                        <td>15%</td>
                    </tr>
                    <tr>
                        <td><strong>Debugging</strong></td>
                        <td>Why did the model suddenly start predicting nonsense?</td>
                        <td>15%</td>
                    </tr>
                </table>

                <h2>The Complete ML Lifecycle (What You'll Learn)</h2>

                <p>Understanding the full ML lifecycle is critical. Here's what happens from idea to production:</p>

                <div class="code-block">PHASE 1: PROBLEM DEFINITION & DATA COLLECTION
├── Business Problem: "We're losing $10M/year to fraud"
├── ML Problem: "Predict if transaction is fraudulent"
├── Success Metric: "Catch 90% of fraud, false positive rate <2%"
├── Data Sources: Transaction DB, user profiles, device info
└── Data Collection: 6 months of historical transactions (10M records)

PHASE 2: EXPLORATORY DATA ANALYSIS (EDA)
├── Data Quality: Check for missing values, outliers, errors
├── Distribution: Understand feature distributions, class balance
├── Correlations: Which features correlate with fraud?
├── Feature Engineering Ideas: Transaction velocity, unusual patterns
└── Baseline: Simple rules catch 60% of fraud (this is what you beat)

PHASE 3: MODEL DEVELOPMENT (Data Scientist's Work)
├── Feature Engineering: Create 50+ features from raw data
├── Model Selection: Try RandomForest, XGBoost, Neural Networks
├── Hyperparameter Tuning: Find best parameters
├── Validation: 92% accuracy on test set (beats 60% baseline!)
└── Documentation: Notebook with experiments, results

← THIS IS WHERE MOST PEOPLE STOP (AND WHERE MLOPS BEGINS) →

PHASE 4: MODEL PRODUCTIONIZATION (MLOps Work)
├── Code Refactoring: Convert notebook to production Python
│   - Separate training code, feature code, serving code
│   - Add error handling, logging, input validation
│   - Write unit tests, integration tests
│
├── Feature Pipeline: Build production feature computation
│   - Real-time features: Compute on-the-fly (<100ms)
│   - Batch features: Pre-compute daily
│   - Feature store: Store features for training + serving
│
├── Training Pipeline: Automate model training
│   - Airflow DAG: Trigger training weekly
│   - Log experiments: MLflow tracking
│   - Version control: Code + data + model
│   - Validation: Automated tests on trained model
│
└── Deployment: Get model to production
    - Containerize: Docker image with model + dependencies
    - Orchestrate: Kubernetes deployment
    - Serve: REST API endpoint
    - Monitor: Metrics, logs, alerts

PHASE 5: MODEL SERVING (Production)
├── API Endpoint: POST /predict → returns fraud probability
├── Load Balancer: Distribute traffic across 10 servers
├── Auto-scaling: Scale to 50 servers during peak
├── Latency: p99 < 100ms (99% of requests under 100ms)
└── Throughput: Handle 10,000 requests/sec

PHASE 6: MONITORING & MAINTENANCE (Ongoing)
├── Model Performance: Track accuracy daily (ground truth)
├── Data Drift: Monitor if inputs changing (weekly)
├── Prediction Distribution: Alert if predictions unusual
├── Business Metrics: Track fraud caught, false positives
├── Infrastructure: CPU, memory, latency, error rates
└── Retraining: Retrain model monthly or when accuracy drops

PHASE 7: ITERATION (Never Ending)
├── A/B Test: New model vs current (challenger vs champion)
├── Feature Addition: Add new features (user behavior patterns)
├── Model Improvement: Try new algorithms
├── Bug Fixes: Handle edge cases found in production
└── Scale Up: Handle 10x traffic growth

Time Investment Per Phase:
- Phase 1-2 (Problem + EDA): 2 weeks
- Phase 3 (Model Dev): 3 months (data scientist)
- Phase 4 (Productionization): 6 weeks (MLOps engineer) ← WHERE YOU SPEND MOST TIME
- Phase 5 (Serving): 1 week (deploy)
- Phase 6-7 (Monitor + Iterate): Ongoing (20% of your time)

Total: 5 months from idea to production
Reality: Most projects die in Phase 4 (can't productionize)</div>

                <h2>Key Concepts You Must Understand</h2>

                <h3>1. Training vs Inference (Fundamentally Different)</h3>

                <table class="table">
                    <tr>
                        <th>Aspect</th>
                        <th>Training</th>
                        <th>Inference (Serving)</th>
                    </tr>
                    <tr>
                        <td><strong>Frequency</strong></td>
                        <td>Weekly/Monthly (batch)</td>
                        <td>1000s per second (real-time)</td>
                    </tr>
                    <tr>
                        <td><strong>Latency</strong></td>
                        <td>Hours/Days (who cares?)</td>
                        <td><100ms (critical!)</td>
                    </tr>
                    <tr>
                        <td><strong>Data</strong></td>
                        <td>Millions of rows (historical)</td>
                        <td>1 row at a time (current)</td>
                    </tr>
                    <tr>
                        <td><strong>Hardware</strong></td>
                        <td>GPUs (parallel processing)</td>
                        <td>CPUs (cost-effective)</td>
                    </tr>
                    <tr>
                        <td><strong>Failure</strong></td>
                        <td>Retry later (no big deal)</td>
                        <td>User sees error (BIG deal)</td>
                    </tr>
                    <tr>
                        <td><strong>Cost</strong></td>
                        <td>$100/month (Spot instances)</td>
                        <td>$5,000/month (Always-on)</td>
                    </tr>
                </table>

                <h3>2. Batch vs Real-Time ML</h3>

                <div class="code-block">BATCH PREDICTION (Offline):
When: Predictions computed ahead of time
Example: "Daily product recommendations for all users"

Process:
1. Every night at 2 AM
2. Load all users from database (10M users)
3. Compute recommendations for each user (using ML model)
4. Store results in database (user_id → recommended_products)
5. User visits website → Reads pre-computed recommendations

Pros:
✓ Can use complex models (no latency constraint)
✓ Cost-efficient (spot instances, off-peak hours)
✓ Can batch process (parallelize easily)

Cons:
✗ Stale data (up to 24 hours old)
✗ Can't personalize to current context
✗ Wastes compute on inactive users

When to use: Netflix recommendations, Email campaigns, Reports

REAL-TIME PREDICTION (Online):
When: Predictions computed on-demand
Example: "Fraud detection on every transaction"

Process:
1. User makes purchase → Transaction event
2. API call to ML model: predict(transaction_features)
3. Model returns: fraud_probability = 0.85 (high risk!)
4. System blocks transaction
Total time: 50ms

Pros:
✓ Fresh predictions (based on latest data)
✓ Can use current context (time, location, recent activity)
✓ Only compute for active users

Cons:
✗ Must be fast (<100ms)
✗ Expensive (always-on infrastructure)
✗ Complex to build (feature stores, caching, etc.)

When to use: Fraud detection, Search ranking, Personalization

HYBRID APPROACH (Best of Both):
Batch: Pre-compute expensive features (user history, embeddings)
Real-time: Compute simple model on pre-computed features

Example: Recommendations
- Batch (nightly): Compute user embeddings, item embeddings
- Real-time: Dot product of embeddings (fast!) + context features
- Result: Personalized + fresh recommendations in <50ms</div>

                <h3>3. Model Versioning (Critical Concept)</h3>

                <div class="code-block">What needs versioning in ML (MORE than traditional software):

1. MODEL CODE (Python files)
   - training.py v1.2.3
   - features.py v1.0.1
   - serve.py v2.0.0
   - Git commit: abc123def

2. MODEL WEIGHTS (Trained parameters)
   - model_fraud_v5.pkl (500MB)
   - Trained on: 2024-01-15
   - Training accuracy: 94.2%
   - Stored in: MLflow Model Registry

3. TRAINING DATA (What model learned from)
   - Data version: snapshot_2024_01_15
   - Rows: 10M transactions
   - Date range: 2023-07-01 to 2024-01-15
   - Stored in: S3 with DVC tracking

4. FEATURE DEFINITIONS (How features computed)
   - features.yaml v2.1.0
   - transaction_velocity: COUNT transactions last 1 hour
   - unusual_time: transaction hour NOT IN user's typical hours
   - Stored in: Feature store

5. HYPERPARAMETERS (Model configuration)
   - config.yaml
   - learning_rate: 0.001
   - max_depth: 10
   - n_estimators: 100

6. DEPENDENCIES (Library versions)
   - requirements.txt
   - scikit-learn==1.2.0
   - pandas==1.5.3
   - numpy==1.24.0

WHY ALL THIS VERSIONING?

Scenario: Model working great in January, broken in February

Question: What changed?
- Was it code? (compare git commits)
- Was it data? (compare data versions)
- Was it features? (compare feature definitions)
- Was it dependencies? (library version mismatch)

Without versioning: IMPOSSIBLE to debug
With versioning: Find exact difference, fix in 1 hour

Real incident (2021):
Model accuracy dropped 90% → 65%
Investigation with versions:
- Code: Same (git SHA matches)
- Model: Same (same .pkl file)
- Features: DIFFERENT! (feature store upgraded, calculation changed)
Found issue in 30 minutes, rolled back feature version

This is why versioning EVERYTHING matters</div>

                <h2>War Story: Uber's ML Platform Outage (2019)</h2>

                <p>A friend who worked on Uber's Michelangelo platform told me this story:</p>

                <div class="code-block">The Incident (September 2019):

Context:
- Uber runs 1000s of ML models in production
- Michelangelo: Uber's ML platform (serves 50M+ predictions/sec)
- Models power: ETA, pricing, driver matching, fraud detection

What Happened (3 AM):
- Model serving cluster crashed (all 500 nodes went down)
- Root cause: Memory leak in feature transformation code
- Impact: ZERO predictions being served

Real-World Impact:
- No ETA estimates → riders don't know how long to wait
- No pricing → can't show fare to riders
- No driver matching → drivers and riders not matched efficiently
- Fraud detection offline → potential fraud risk

How bad was it?
- Duration: 23 minutes (felt like hours)
- Rides affected: ~200,000 globally
- Revenue loss: Estimated $2-3M
- Reputation damage: Riders saw "App not working" errors

The Response:
3:07 AM - Alerts fired (model serving latency >10 seconds)
3:08 AM - On-call engineer paged (me!)
3:10 AM - Confirmed: All serving nodes down
3:12 AM - Tried restart: Failed (same memory issue)
3:15 AM - Rollback to previous version: WORKED!
3:30 AM - All models back online, predictions flowing

The Root Cause:
- Feature engineering code had memory leak
- Leaked 10MB per prediction
- 50M predictions/sec = 500TB/sec leak rate
- Crashed servers in 20 minutes
- Had passed ALL tests (tests only ran 100 predictions, not millions)

The Fix (took 2 weeks):
1. Immediate: Added memory monitoring with aggressive alerts
2. Short-term: Fixed the leak (one line: missing .clear() on array)
3. Long-term:
   - Load testing must simulate production volume
   - Canary deployments (1% traffic first, then 10%, then 100%)
   - Circuit breakers (if one model fails, don't take down platform)
   - Memory limits per model (prevent one bad model killing all)

Lessons:
- Production is NOT like your laptop
- Test at production scale or don't test at all
- Always have rollback plan (saved us!)
- One bad model can kill entire platform (isolation matters)

My friend's quote: "I learned more about production ML in those 23 minutes
than in 4 years of grad school. PhD teaches you to build models.
Production teaches you to make them not break."</div>

                <h2>Research ML vs Production ML</h2>

                <p>The gap between these is HUGE. Let me show you:</p>

                <table class="table">
                    <tr>
                        <th>Aspect</th>
                        <th>Research / Notebook</th>
                        <th>Production / Real World</th>
                    </tr>
                    <tr>
                        <td><strong>Data</strong></td>
                        <td>Clean CSV files, perfectly labeled</td>
                        <td>Messy streams, missing values, wrong labels</td>
                    </tr>
                    <tr>
                        <td><strong>Performance</strong></td>
                        <td>Accuracy: 95% (awesome!)</td>
                        <td>Latency: <100ms, 99.99% uptime (required!)</td>
                    </tr>
                    <tr>
                        <td><strong>Scale</strong></td>
                        <td>10K samples, runs once</td>
                        <td>10M predictions/day, 24/7/365</td>
                    </tr>
                    <tr>
                        <td><strong>Versioning</strong></td>
                        <td>model_final_v2_FINAL.pkl</td>
                        <td>Git tags, model registry, reproducible builds</td>
                    </tr>
                    <tr>
                        <td><strong>Monitoring</strong></td>
                        <td>Print statements</td>
                        <td>Prometheus, Grafana, PagerDuty, 24/7 alerts</td>
                    </tr>
                    <tr>
                        <td><strong>Failure</strong></td>
                        <td>Rerun cell</td>
                        <td>Revenue loss, customer complaints, CEO emails</td>
                    </tr>
                    <tr>
                        <td><strong>Deployment</strong></td>
                        <td>Email pickle file</td>
                        <td>CI/CD, canary deploys, rollbacks, feature flags</td>
                    </tr>
                </table>

                <h3>Real Example: Recommendation Model Deployment</h3>

                <div class="code-block">What data scientist delivers:
- Jupyter notebook (2000 lines of code)
- model.pkl (500MB file)
- requirements.txt (15 libraries, no versions specified)
- Email: "This gets 87% accuracy! Ship it!"

What MLOps engineer needs to do:

1. Extract model code from notebook (2 days)
   - Notebook has lots of exploratory code
   - Need to find actual model training code
   - Rewrite as proper Python modules

2. Set up training pipeline (1 week)
   - Airflow DAG to run training daily
   - Version control for data, code, model
   - Log metrics to MLflow
   - Save model to registry

3. Build serving infrastructure (1 week)
   - Model serving API (Flask/FastAPI)
   - Load balancer (handle traffic spikes)
   - Auto-scaling (scale based on load)
   - Health checks (is model responsive?)

4. Implement monitoring (3 days)
   - Prediction latency (p50, p95, p99)
   - Model accuracy (online metrics)
   - Data drift detection (is input changing?)
   - Error rates (% of failed predictions)

5. Add safety features (3 days)
   - Feature flag (turn off model if broken)
   - Fallback logic (if model fails, use simple rule)
   - Rate limiting (don't overwhelm system)
   - Input validation (reject bad inputs)

6. Testing (1 week)
   - Unit tests (code works correctly)
   - Integration tests (API works end-to-end)
   - Load tests (handles 10K requests/sec)
   - Shadow mode (run alongside old model, compare)

7. Deploy (1 day, if everything works)
   - Deploy to staging
   - Run smoke tests
   - Deploy to 1% prod (canary)
   - Monitor for 24 hours
   - Deploy to 10%, 50%, 100%

Total time: 4-5 weeks
Data scientist time: 3 months
MLOps engineering time: 5 weeks

Ratio: For every 1 week of model development,
       expect 1-2 weeks of productionization</div>

                <h2>The MLOps Skills You Actually Need</h2>

                <h3>Must-Have (Can't Do Job Without These)</h3>
                <ul>
                    <li><strong>Python</strong> - 90% of ML is Python. Period.</li>
                    <li><strong>Docker & Kubernetes</strong> - Everything runs in containers</li>
                    <li><strong>REST APIs</strong> - Flask/FastAPI for serving models</li>
                    <li><strong>CI/CD</strong> - GitHub Actions, GitLab CI, Jenkins</li>
                    <li><strong>Cloud Platforms</strong> - AWS SageMaker, GCP Vertex AI, or Azure ML</li>
                    <li><strong>Monitoring</strong> - Prometheus, Grafana, DataDog</li>
                    <li><strong>Linux/Bash</strong> - Debugging production servers</li>
                </ul>

                <h3>Nice-to-Have (Learn as Needed)</h3>
                <ul>
                    <li><strong>ML Frameworks</strong> - PyTorch, TensorFlow (basic understanding)</li>
                    <li><strong>Feature Stores</strong> - Feast, Tecton</li>
                    <li><strong>Experiment Tracking</strong> - MLflow, Weights & Biases</li>
                    <li><strong>Model Registries</strong> - MLflow, SageMaker Model Registry</li>
                    <li><strong>Workflow Orchestration</strong> - Airflow, Kubeflow, Metaflow</li>
                    <li><strong>Terraform</strong> - Infrastructure as code</li>
                </ul>

                <h2>A Day in the Life - Real Examples from My Week</h2>

                <div class="code-block">Monday, 9 AM - Weekly planning
Data scientist: "New model ready! 3% better accuracy!"
Me: "Great! What changed?"
DS: "New features from user behavior data"
Me: "How do we get that data in production?"
DS: "Umm... from the data warehouse?"
Me: "Production doesn't have access to warehouse. Need real-time features."
DS: "Oh..."
Result: 2-week project to build feature pipeline (model waits)

Tuesday, 2 PM - Production issue
PagerDuty: "Model latency p99 > 500ms"
Me: *checks Grafana*
Problem: One feature (user_history) timing out
Investigation: Feature store having issues
Fix: Add timeout + fallback (use default value if > 100ms)
Time spent: 3 hours
Lesson: Always have fallbacks

Wednesday, 10 AM - Retraining failed
Airflow: "recommendation_model_training FAILED"
Me: *checks logs*
Error: "Insufficient GPU memory"
Cause: Training data grew 3x (more users = more data)
Fix: Increase GPU instance size (p3.2xlarge → p3.8xlarge)
Side effect: Training cost $20/day → $80/day
Had to justify to manager

Thursday, 3 PM - Model drift alert
DataDog: "Prediction distribution anomaly detected"
Investigation: Model predicting very different outputs
Cause: Upstream data pipeline changed schema
Impact: Feature "user_age" now in months (was years)
        Model trained on years, getting months in production
Result: All predictions garbage for 4 hours
Fix: Add schema validation, alert on data changes

Friday, 4 PM - Deploy new model
Spent all day on this:
- 2 PM: Deploy to staging, run tests
- 3 PM: Deploy canary (5% traffic)
- 3:30 PM: Check metrics (looks good!)
- 4 PM: Increase to 50%
- 4:15 PM: ERROR SPIKE! Rollback to 5%
- 4:30 PM: Found bug (new feature not in prod feature store)
- 5 PM: Gave up, will try Monday

This is normal. Welcome to MLOps!</div>

                <h2>Why MLOps Matters (The Business Case)</h2>

                <div class="code-block">Story from e-commerce company (2021):

Without MLOps:
- Data scientists: 10 people
- Models built: 30 models in 1 year
- Models in production: 3 models (10% success rate!)
- Time to production: 6 months average
- Model updates: Once a year (models get stale)
- Incidents: 2-3 per month (models breaking)
- Data science team morale: Low (why build if never ships?)

With MLOps (hired 3 MLOps engineers):
- Models built: 25 models in 1 year (fewer, more focused)
- Models in production: 20 models (80% success rate!)
- Time to production: 2 weeks average (25x faster!)
- Model updates: Weekly (always fresh)
- Incidents: 1 per quarter (much more stable)
- Data science team morale: High (stuff actually ships!)

ROI on 3 MLOps engineers:
- Cost: $450K/year (3 × $150K)
- Value: 17 more models in production
- Each model generates ~$500K/year value
- Total value: $8.5M/year
- ROI: 19x (for every $1 spent, get $19 back)

CEO's quote: "I thought MLOps was overhead. Turns out it's
the difference between ML being PowerPoint slides and
actually making us money."</div>

                <h2>MLOps Architecture Patterns (How Systems Are Actually Built)</h2>

                <h3>Pattern 1: Simple ML API (Startup/MVP)</h3>

                <div class="code-block">Architecture:
┌─────────────┐
│   Client    │
│  (Web/App)  │
└──────┬──────┘
       │ POST /predict
       ▼
┌─────────────┐
│  FastAPI    │  ← Model loaded in memory
│  Server     │  ← Single instance
└──────┬──────┘
       │ Query features
       ▼
┌─────────────┐
│  PostgreSQL │
│  Database   │
└─────────────┘

Code example:
from fastapi import FastAPI
import joblib

app = FastAPI()
model = joblib.load('model.pkl')  # Load once at startup

@app.post('/predict')
def predict(user_id: int, amount: float):
    # Get user features from database
    user = db.query(f"SELECT * FROM users WHERE id={user_id}")

    # Make prediction
    features = [user.age, user.history, amount]
    prediction = model.predict([features])[0]

    return {"fraud_probability": float(prediction)}

When this works:
✓ <1000 requests/day
✓ Simple model (<100MB)
✓ No real-time features needed
✓ Team <5 people

When it breaks:
✗ Traffic spikes (single server overwhelmed)
✗ Database slow (blocks predictions)
✗ Model update requires downtime
✗ No monitoring (don't know when it breaks)</div>

                <h3>Pattern 2: Scalable ML Service (Growth Stage)</h3>

                <div class="code-block">Architecture:
┌─────────────┐
│   Clients   │
│ (100K/day)  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│Load Balancer│
└──────┬──────┘
       │
   ┌───┴────┬────────┐
   ▼        ▼        ▼
┌────┐   ┌────┐   ┌────┐
│API │   │API │   │API │  ← Auto-scaling (3-20 pods)
│ 1  │   │ 2  │   │ 3  │  ← Docker containers
└─┬──┘   └─┬──┘   └─┬──┘
  │        │        │
  └────┬───┴────┬───┘
       │        │
       ▼        ▼
┌─────────┐ ┌──────────┐
│  Redis  │ │ Postgres │
│Features │ │User Data │
└─────────┘ └──────────┘

Improvements:
1. Load Balancer: Distributes traffic
2. Auto-scaling: Add servers during peaks
3. Redis: Cache features (5ms not 50ms)
4. Health checks: Replace failed servers
5. Monitoring: Prometheus + Grafana
6. Rolling updates: Zero-downtime deploys

Code changes:
@app.post('/predict')
def predict(user_id: int, amount: float):
    # Get features from Redis (FAST)
    features = redis.get(f"user:{user_id}:features")
    if not features:
        # Fallback to database
        features = db.query(...)
        redis.set(f"user:{user_id}:features", features, ex=3600)

    prediction = model.predict([features])[0]

    # Log for monitoring
    prometheus_counter.inc()
    log.info(f"Prediction: {prediction}, latency: {latency}ms")

    return {"fraud_probability": float(prediction)}

When this works:
✓ 100K-1M requests/day
✓ Team 5-20 people
✓ Multiple models in production
✓ Need <100ms latency

When it breaks:
✗ Need real-time features (Redis not enough)
✗ 10+ models (managing becomes chaos)
✗ A/B testing models (no framework)
✗ Feature engineering complex (no centralization)</div>

                <h3>Pattern 3: ML Platform (Enterprise Scale)</h3>

                <div class="code-block">Architecture (Uber/Airbnb/Netflix style):

┌──────────────────────────────────────────┐
│         API Gateway (Kong/Nginx)         │
│  - Rate limiting                         │
│  - Authentication                        │
│  - Request routing                       │
└───────────────┬──────────────────────────┘
                │
        ┌───────┴────────┐
        ▼                ▼
┌───────────────┐  ┌──────────────┐
│ Model Serving │  │ Model Serving│
│   Cluster A   │  │   Cluster B  │
│  (fraud-v2.0) │  │  (fraud-v1.9)│  ← A/B testing
└───────┬───────┘  └───────┬──────┘
        │                  │
        └────────┬─────────┘
                 │
         ┌───────▼────────┐
         │ Feature Store  │
         │ ┌────────────┐ │
         │ │   Redis    │ │ ← Online (real-time)
         │ │  (5ms)     │ │
         │ └────────────┘ │
         │ ┌────────────┐ │
         │ │  S3 +      │ │ ← Offline (training)
         │ │  Spark     │ │
         │ └────────────┘ │
         └───────┬────────┘
                 │
         ┌───────▼────────┐
         │ Data Sources   │
         ├────────────────┤
         │  PostgreSQL    │
         │  Kafka Events  │
         │  S3 Data Lake  │
         └────────────────┘

┌──────────────────────────────────────────┐
│     Training Pipeline (Airflow)          │
│  1. Data extraction                      │
│  2. Feature engineering                  │
│  3. Model training                       │
│  4. Validation                           │
│  5. Registration (MLflow)                │
│  6. Auto-deployment (if approved)        │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│          Monitoring Stack                │
│  - Prometheus (metrics)                  │
│  - Grafana (dashboards)                  │
│  - ELK Stack (logs)                      │
│  - PagerDuty (alerts)                    │
│  - Evidently (drift detection)           │
└──────────────────────────────────────────┘

Components:

1. FEATURE STORE
   Purpose: Centralized feature computation
   - Offline: Historical features for training (S3 + Spark)
   - Online: Low-latency features for serving (Redis)
   - Registry: Feature definitions (code + docs)

2. MODEL REGISTRY (MLflow)
   Purpose: Version control for models
   - Store models with metadata
   - Track experiments
   - Manage model lifecycle (staging → production)

3. SERVING INFRASTRUCTURE (Kubernetes)
   Purpose: Deploy and serve models
   - Auto-scaling (based on traffic)
   - Load balancing
   - Rolling updates (zero downtime)
   - A/B testing (traffic splitting)

4. TRAINING PIPELINE (Airflow)
   Purpose: Automate model training
   - Scheduled retraining (weekly/monthly)
   - Triggered retraining (accuracy drops)
   - Version everything (data + code + model)

5. MONITORING
   Purpose: Detect issues before disaster
   - Model performance (accuracy over time)
   - Data drift (input distribution changes)
   - Infrastructure (latency, errors, CPU)
   - Business metrics (revenue, conversions)

When this is needed:
✓ 10M+ requests/day
✓ 50+ models in production
✓ 20+ data scientists
✓ Team 50+ people
✓ Multiple business units

Cost:
- Infrastructure: $50K-$200K/month
- Engineering team: 5-10 people (MLOps engineers)
- Value: Enables $10M-$100M+ in ML-driven revenue

Real examples:
- Uber: Michelangelo platform (1000+ models)
- Airbnb: Bighead platform (150+ models)
- Netflix: 2000+ models in production</div>

                <h2>Common MLOps Myths (That I Believed at First)</h2>

                <h3>Myth 1: "MLOps is just deploying models"</h3>
                <p><strong>Reality:</strong> Deployment is maybe 10% of the job. The real work is: keeping models running reliably, monitoring for issues, retraining when needed, feature engineering at scale, managing experiments, handling drift, debugging production issues.</p>

                <h3>Myth 2: "AutoML will replace MLOps"</h3>
                <p><strong>Reality:</strong> AutoML builds models. MLOps runs them in production. Totally different problems. AutoML is like having a car designer. MLOps is like being a mechanic who keeps cars running for years.</p>

                <h3>Myth 3: "You need a PhD to do MLOps"</h3>
                <p><strong>Reality:</strong> You need engineering skills way more than ML knowledge. Best MLOps engineers I know: strong software engineering background, learned ML concepts on the job. PhDs are great for research, but production is an engineering problem.</p>

                <h3>Myth 4: "Once deployed, models run forever"</h3>
                <p><strong>Reality:</strong> Models decay. World changes. Data drifts. I've seen models go from 90% accuracy to 60% in 6 months because user behavior changed. Need continuous monitoring and retraining.</p>

                <h3>Myth 5: "MLOps is the same as DevOps"</h3>
                <p><strong>Reality:</strong> MLOps has unique challenges: data dependencies, model versioning, feature stores, drift detection, A/B testing with models, GPU management. DevOps practices are foundation, but ML adds whole new layer of complexity.</p>

                <h2>Key Takeaways & Best Practices</h2>

                <ul>
                    <li><strong>Start simple, scale when needed:</strong> Don't build Uber's platform for your first model. Deploy one model end-to-end, then add complexity.</li>
                    <li><strong>Version everything:</strong> Code, data, models, features, configs. Future you will thank present you.</li>
                    <li><strong>Monitor from day 1:</strong> Don't wait until production breaks. Basic monitoring (latency, errors) is table stakes.</li>
                    <li><strong>Automate training:</strong> Manual retraining doesn't scale. Build automated pipelines early.</li>
                    <li><strong>Test at production scale:</strong> What works on your laptop doesn't work with 1M requests/day.</li>
                    <li><strong>Have rollback plan:</strong> Models WILL break. Be able to rollback in <5 minutes.</li>
                    <li><strong>Collaborate with data scientists:</strong> You're building infrastructure FOR them. Understand their workflow.</li>
                    <li><strong>Focus on business impact:</strong> Perfect infrastructure means nothing if models don't drive value.</li>
                    <li><strong>Keep learning:</strong> MLOps tools change every 6 months. Stay current.</li>
                    <li><strong>Embrace the chaos:</strong> Production ML is messy. It's normal. You'll figure it out.</li>
                </ul>

                <h2>Next Steps in This Course</h2>

                <p>Now that you understand what MLOps is, we'll dive deep into each component:</p>

                <ol>
                    <li><strong>Feature Engineering:</strong> Building features that work in production (training-serving consistency, feature stores, real-time vs batch)</li>
                    <li><strong>Model Serving:</strong> Deploy models at scale (APIs, optimization, deployment strategies)</li>
                    <li><strong>Monitoring:</strong> Detect issues before disaster (drift, accuracy tracking, alerting)</li>
                    <li><strong>CI/CD for ML:</strong> Automate everything (testing, deployment, retraining)</li>
                    <li><strong>Career:</strong> How to break into MLOps, what companies look for, interview prep</li>
                </ol>

                <p>Each lesson includes: Real-world examples, Code samples, Architecture patterns, War stories, Best practices, Common pitfalls, and Interview questions.</p>
            `,
            interviews: [
                {
                    question: "What's the difference between MLOps and DevOps?",
                    answer: "DevOps deploys code. MLOps deploys code + data + models (3 things changing independently). Key differences: 1) Data dependencies - DevOps doesn't care about input data quality, MLOps lives/dies by it. 2) Model versioning - DevOps versions code (git), MLOps versions code + model weights + training data + features. 3) Drift detection - Code doesn't drift, models do (accuracy degrades over time). 4) Experimentation - DevOps A/B tests features, MLOps A/B tests models (much harder). 5) Reproducibility - DevOps: same code = same output. MLOps: same code + different data = different model. 6) Hardware - DevOps scales CPUs, MLOps manages GPUs (more expensive, scarce). Real example: Deployed same model code twice, different training data dates, got different predictions in prod. Never happens in normal software."
                },
                {
                    question: "How do you handle model versioning in production?",
                    answer: "Multi-layer versioning system: 1) Code version (git SHA), 2) Model version (registry like MLflow), 3) Data version (training data snapshot), 4) Feature version (feature definitions). Example: model_fraud_v1.2.3 = code v1.2, model artifact v3, trained on data from 2024-01-01. Store in model registry with metadata: training metrics, feature importance, test results, who trained it, when. Production deployment: Always use model registry ID, not file paths. Rollback: Keep last 3 model versions in production-ready state. Real incident: Model broke, couldn't rollback because training data deleted. Now: Version and archive everything. Tools: MLflow Model Registry, SageMaker Model Registry, custom S3 + DynamoDB. Critical: Link model to exact data version used for training (reproducibility)."
                },
                {
                    question: "What's model drift and how do you detect it?",
                    answer: "Two types of drift: 1) Data drift - input distribution changes (user behavior shifts, new product categories, seasonal changes). Example: E-commerce model trained pre-COVID, failed post-COVID (everyone shopping online). Detection: Compare production input distribution to training distribution (KS test, PSI). 2) Concept drift - relationship between features and target changes. Example: 'Expensive = luxury' was true, then inflation hit, now 'Expensive = everything'. Detection: Monitor prediction accuracy over time, A/B test against ground truth. Real detection: Track baseline metrics (accuracy, precision, recall) weekly, alert if drops >5%. Also: Track prediction distribution (if suddenly predicting all 1s or all 0s = drift). Tools: Evidently AI, WhyLabs, Great Expectations. When detected: Retrain model with recent data. Preventive: Retrain monthly/quarterly even if no drift (stay fresh)."
                },
                {
                    question: "How would you debug a model that's serving incorrect predictions in production?",
                    answer: "Systematic approach (from real debugging session): 1) Isolate the issue - Is it ALL predictions wrong or specific cases? Check logs for error patterns. 2) Check input data - Log sample inputs, compare to training data distribution. Most common issue: Feature values out of expected range. 3) Verify feature engineering - Prod features match training features? Common bug: Timezone differences, missing data handling. 4) Check model version - Correct model loaded? Right weights? Not corrupted during deploy? 5) Test inference code - Unit test prediction pipeline with known inputs. 6) Compare with training - Run same input through training notebook and prod API, outputs match? Real example debugged: Model predicted fraud on all transactions. Found: Feature 'hours_since_last_purchase' calculated wrong in prod (forgot to convert timezone). Training: UTC. Prod: PST. 7 hour difference broke model. Fix took 10 min, finding it took 3 hours. Lesson: Log everything, especially feature values."
                },
                {
                    question: "What's the biggest mistake you see teams make with MLOps?",
                    answer: "Treating ML like regular software. Biggest mistakes: 1) No monitoring - Deploy model, assume it works forever. Reality: Models degrade, data changes. Need monitoring from day 1. 2) No versioning - Can't reproduce model, can't rollback, can't debug. Always version code + data + model. 3) No A/B testing - Deploy new model to 100% traffic immediately. If broken, impact everyone. Always canary deploy. 4) Ignoring latency - Model accurate but takes 10 seconds. Production needs <100ms. Test at production scale. 5) No fallback - Model fails, entire feature broken. Always have simple rule-based fallback. Real disaster: Company deployed ML fraud detection, no fallback. Model crashed, ALL transactions blocked. Lost $500K in 2 hours before someone hit kill switch. Should have had: if (model_fails) { use_simple_rules(); alert_team(); }. My rule: Assume everything will fail. Plan accordingly. ML is harder than regular software because you're deploying uncertainty, not just code."
                }
            ]
        },
        {
            id: 'feature-engineering-pipeline',
            title: 'Feature Engineering: The 80% of ML Nobody Talks About',
            duration: '55 min',
            content: `
                <h2>The Uncomfortable Truth About ML</h2>
                <p><strong>"Features matter more than algorithms."</strong> - Every ML practitioner ever (after learning the hard way)</p>

                <div class="code-block">Real story from my time at a fraud detection startup (2020):

Data scientist spent 3 months trying different models:
- Random Forest: 82% accuracy
- XGBoost: 84% accuracy
- Neural Network: 83% accuracy
- Ensemble of all three: 85% accuracy

Then I asked: "What features are you using?"
DS: "Transaction amount, merchant ID, timestamp..."
Me: "What about user's transaction history? Velocity? Anomalies?"
DS: "Oh, we don't have those features"

Spent 2 weeks building feature pipeline:
- Added: transactions_last_hour, avg_transaction_amount_30d,
  new_merchant_flag, unusual_time_flag, distance_from_home, etc.

Result with SAME Random Forest model:
- Accuracy: 82% → 93% (just by adding better features!)
- Tried XGBoost again: 95% accuracy

Time spent on algorithms: 3 months
Time spent on features: 2 weeks
Impact of algorithms: +3% accuracy
Impact of features: +11% accuracy

Lesson: Spend 80% of time on features, 20% on model selection
Most teams do the opposite</div>

                <h2>What is a Feature Store? (And Why You Need One)</h2>

                <h3>The Problem Feature Stores Solve</h3>

                <div class="code-block">Before feature stores (painful):

Training time:
- Data scientist writes SQL to compute features
- Queries data warehouse
- Takes 3 hours to run
- Features saved in CSV file
- Trains model on laptop

Inference time (6 months later):
- Model deployed to production
- Need to recompute SAME features in real-time
- But: Different engineer implements features
- Uses different SQL (slight variations)
- Features don't match training exactly
- Model accuracy: 90% in training → 65% in production

This is called "training-serving skew" and it KILLS ML projects

Real incident: Uber's ETA model (2017)
- Training features: Calculated in Spark batch jobs
- Serving features: Calculated in real-time microservice
- Small difference in how "distance" was calculated
- Training: Haversine formula
- Serving: Google Maps API (slightly different)
- Result: ETA predictions off by 15-20% in production
- Took 2 weeks to find the bug (subtle!)
- Fix: Centralized feature definitions</div>

                <h3>What a Feature Store Does</h3>

                <table class="table">
                    <tr>
                        <th>Component</th>
                        <th>What It Does</th>
                        <th>Example</th>
                    </tr>
                    <tr>
                        <td><strong>Feature Registry</strong></td>
                        <td>Catalog of all features with definitions</td>
                        <td>user_avg_transaction_30d: AVG(amount) OVER 30 days</td>
                    </tr>
                    <tr>
                        <td><strong>Offline Store</strong></td>
                        <td>Historical features for training (batch)</td>
                        <td>S3/BigQuery with partitioned parquet files</td>
                    </tr>
                    <tr>
                        <td><strong>Online Store</strong></td>
                        <td>Low-latency features for serving (real-time)</td>
                        <td>Redis/DynamoDB with sub-10ms reads</td>
                    </tr>
                    <tr>
                        <td><strong>Feature Computation</strong></td>
                        <td>Transform raw data into features</td>
                        <td>Spark/Flink jobs computing aggregations</td>
                    </tr>
                    <tr>
                        <td><strong>Monitoring</strong></td>
                        <td>Track feature distributions, detect drift</td>
                        <td>Alert if feature value distribution changes</td>
                    </tr>
                </table>

                <h2>Real Architecture: Airbnb's Feature Store (Zipline)</h2>

                <p>This is what Airbnb built (I learned from their tech blog + friends there):</p>

                <div class="code-block">Problem at Scale:
- 100+ data scientists building ML models
- Each scientist re-implementing same features differently
- "User's total bookings" computed 47 different ways!
- Training-serving skew everywhere
- Features stuck in notebooks, not reusable

Zipline Architecture (simplified):

1. Feature Definitions (Python):
from zipline import Feature, Entity

user = Entity(name="user", join_key="user_id")

total_bookings = Feature(
    name="total_bookings",
    entity=user,
    aggregation="count",
    time_window="lifetime",
    source="bookings_table"
)

avg_booking_value_30d = Feature(
    name="avg_booking_value_30d",
    entity=user,
    aggregation="avg",
    column="booking_amount",
    time_window="30d",
    source="bookings_table"
)

2. Offline Feature Store (Training):
- Daily Spark jobs materialize features to S3
- Partitioned by date
- Data scientists query: "Give me all user features as of 2024-01-01"
- Returns: Parquet file with 50M users × 200 features

3. Online Feature Store (Serving):
- Same features pushed to Redis
- Key: user_id
- Value: JSON with all features
- Latency: <5ms for 200 features
- Updated: Real-time (streaming) + Batch (hourly)

4. Feature Freshness:
- Real-time features: Updated on every event (Kafka → Flink → Redis)
  Example: "search_count_last_hour" (updates every search)

- Batch features: Updated hourly/daily
  Example: "total_bookings_lifetime" (doesn't change much)

Benefits at Airbnb:
- Time to production: 6 months → 2 weeks
- Feature reuse: 0% → 70% (features shared across teams)
- Training-serving skew: Common → Rare
- Data scientist productivity: 3x improvement

Cost:
- Infrastructure: ~$500K/year (Redis clusters, Spark jobs)
- Engineering team: 4 people
- Value: Enabled $100M+ in ML-driven revenue

ROI: 200x</div>

                <h2>Feature Engineering Patterns That Actually Work</h2>

                <h3>Pattern 1: Time-Based Features (Critical for Real-World ML)</h3>

                <div class="code-block">Example: Fraud detection

Raw data:
- transaction_id
- user_id
- amount
- timestamp
- merchant_id

Engineered features (these make the model work):

# Velocity features
transactions_last_hour = COUNT(transactions WHERE timestamp > NOW() - 1hr)
transactions_last_day = COUNT(transactions WHERE timestamp > NOW() - 24hr)
amount_last_hour = SUM(amount WHERE timestamp > NOW() - 1hr)

# Behavioral features
avg_transaction_amount_7d = AVG(amount) OVER last 7 days
std_transaction_amount_7d = STDDEV(amount) OVER last 7 days
max_transaction_amount_30d = MAX(amount) OVER last 30 days

# Anomaly features
is_amount_unusual = (current_amount > avg_amount + 3 * std_amount)
is_velocity_unusual = (transactions_last_hour > avg_transactions_per_hour + 2 * std)

# Time features
hour_of_day = HOUR(timestamp)
day_of_week = DAYOFWEEK(timestamp)
is_weekend = (day_of_week IN [6, 7])
is_unusual_time = (hour_of_day < 6 OR hour_of_day > 23)  # 2 AM transaction?

# Merchant features
is_new_merchant = (merchant_id NOT IN user_merchant_history)
transactions_with_merchant = COUNT(WHERE merchant_id = current_merchant)
days_since_first_merchant_transaction = DAYS(NOW() - MIN(timestamp) WHERE merchant_id)

Result:
- With just raw features: 70% accuracy (useless)
- With engineered features: 93% accuracy (production-worthy)

The hard part:
- Computing these features in REAL-TIME (< 50ms)
- Keeping them consistent between training and serving
- Handling edge cases (new users, missing data)</div>

                <h3>Pattern 2: Embedding Features (For High-Cardinality Categoricals)</h3>

                <div class="code-block">Problem: Merchant IDs (100,000+ unique values)

Bad approach:
- One-hot encoding → 100,000 columns (memory explosion!)
- Can't handle new merchants (unseen during training)

Good approach: Embeddings

# Training: Learn merchant embeddings
merchant_embedding = LearnEmbedding(
    merchant_id,
    embedding_dim=32,  # 32 dimensions instead of 100K
    method="neural_network"  # or "matrix_factorization"
)

# Each merchant mapped to 32 numbers
merchant_123 → [0.5, -0.2, 0.8, ..., 0.1]
merchant_456 → [-0.3, 0.6, 0.1, ..., -0.5]

Benefits:
- Dimensionality: 100K → 32 (3000x reduction)
- Similar merchants have similar embeddings
- Can handle new merchants (use average embedding)

Real example - Instacart:
- 500K+ products (can't one-hot encode)
- Learned 64-dim product embeddings
- Similar products (different brands of milk) have similar vectors
- Model performance: +12% improvement
- Memory usage: 100x reduction

Warning: Embeddings need to be precomputed and stored in feature store
Can't compute on-the-fly (too slow)</div>

                <h3>Pattern 3: Feature Crossing (Capture Interactions)</h3>

                <div class="code-block">Simple features miss interactions:

Example: Restaurant recommendations

Individual features:
- cuisine_type = "Italian"
- time_of_day = "lunch"
- user_age = 25

Feature crosses (interactions):
- cuisine_type_x_time = "Italian_lunch" (pizza popular at lunch!)
- cuisine_type_x_age = "Italian_25" (young people like Italian)
- time_x_age = "lunch_25" (young professionals lunch preferences)
- cuisine_x_time_x_age = "Italian_lunch_25" (very specific!)

Why crosses matter:
- "Italian for lunch" has different signal than "Italian for dinner"
- Model can learn: Italian at lunch → casual, quick
                  Italian at dinner → fancy, slow

Implementation:
# Manual crossing
feature_cross = f"{cuisine_type}_{time_of_day}"

# Automatic crossing (TensorFlow)
crossed_column = tf.feature_column.crossed_column(
    ['cuisine_type', 'time_of_day'],
    hash_bucket_size=1000
)

Downside: Exponential feature explosion
- 10 features → 45 pairs → 120 triples → ...
- Need feature selection (not all crosses useful)

Real win: Google Ads CTR prediction
- Added feature crosses → 5% better CTR
- 5% on billions of ads = $500M+ annual revenue</div>

                <h2>The Hardest Part: Real-Time Feature Engineering</h2>

                <p>This is where most ML projects die. War story:</p>

                <div class="code-block">Incident: Real-time fraud detection failure (2021)

The Goal:
- Detect fraud in <100ms (before transaction completes)
- Need features like "transactions_last_hour"
- Training: Computed in batch (Spark, takes minutes)
- Serving: Need real-time (milliseconds)

What We Built (Failed Attempt #1):
def get_user_features(user_id):
    # Query database for last hour of transactions
    query = "SELECT * FROM transactions WHERE user_id = ? AND timestamp > NOW() - 1hr"
    transactions = db.execute(query)
    return len(transactions)

Problem: Query takes 800ms (WAY too slow)
Why: Database not optimized for these queries

Failed Attempt #2: Cache everything in Redis
- Precompute features every minute, store in Redis
- Fast (5ms), but features up to 1 minute stale
- Fraudster made 10 transactions in 30 seconds
- System only saw "1 transaction in last hour" (stale cache)
- Missed the fraud

What Actually Worked (Dual Pipeline):

1. Streaming Pipeline (Flink):
- Consume events from Kafka in real-time
- Maintain stateful counters (transactions_last_hour per user)
- Update Redis on every transaction (<10ms)
- Features always fresh (<1 second old)

2. Batch Pipeline (Spark):
- Compute expensive features daily
- Features like "avg_amount_30d" (don't need real-time)
- Store in Redis (updated nightly)

Combined:
- Real-time features: From Flink pipeline (<10ms)
- Batch features: From Spark pipeline (daily)
- Lookup: Single Redis call for user_id (5ms total)

Architecture:
Transaction Event
  → Kafka
    → Flink (update real-time features)
      → Redis (online store)
        → Fraud Detection API (reads features)
          → Prediction (<100ms total)

Cost:
- Flink cluster: $5K/month
- Redis cluster: $2K/month
- Kafka: $3K/month
- Total: $10K/month
- Fraud prevented: $2M/month

ROI: 200x (totally worth it)</div>

                <h2>Feature Engineering Antipatterns (I've Made All These Mistakes)</h2>

                <h3>1. Data Leakage (Most Common, Most Deadly)</h3>

                <div class="code-block">My embarrassing story (2019):

Built churn prediction model:
- Training accuracy: 99.5% (WOW!)
- Production accuracy: 52% (coin flip!)

What went wrong:
Leaked feature: "days_since_last_login"

In training data:
- Users who churned: days_since_last_login = 90+ (stopped logging in)
- Users who didn't churn: days_since_last_login = 0-10 (still active)
- Model learned: If days > 30, predict churn = YES

In production (predicting TODAY):
- Everyone has days_since_last_login based on YESTERDAY
- Can't see the future!
- Feature is useless in production

Lesson: Only use features you'd have at prediction time
Ask: "If I'm predicting on Jan 1, would I know this feature on Jan 1?"

Other leakage examples:
- Using transaction_status to predict fraud (status only known AFTER processing)
- Using purchase_id to predict purchase (ID only created when purchase happens)
- Using future data in time-based features (oops!)</div>

                <h3>2. Not Handling Missing Data Properly</h3>

                <div class="code-block">Common mistake:

# Training: Drop rows with missing values
df = df.dropna()

# Production: Can't drop requests! Must handle missing values
if user_feature is None:
    user_feature = 0  # Different from training!

Result: Training-serving skew

Better approach:
# Training AND Serving: Same imputation strategy
if user_feature is None:
    user_feature = MEDIAN_VALUE  # Or mean, or -999 (sentinel value)

# Store imputation values in model metadata
model_metadata = {
    "user_avg_amount_imputation": 47.32,  # Median from training
    "merchant_count_imputation": 5  # Mean from training
}

Real incident: Model worked perfectly in training, crashed in production
because 5% of users had NULL for a feature. Training data had 0% nulls
(we dropped them!). Production couldn't drop (need to serve everyone).

Lesson: Train on data that looks like production data
Including missing values, weird edge cases, etc.</div>

                <h3>3. Not Versioning Features</h3>

                <div class="code-block">Disaster scenario (happened to me):

Jan 2024: Train model with features v1
June 2024: Improve feature definition (better logic)
           Update feature store to v2
           Forget to retrain model
           Model still expects v1 features, gets v2
           Predictions completely wrong

Example:
Feature v1: "user_age" = current_year - birth_year (simple)
Feature v2: "user_age" = exact age in years with decimals (better)

Model trained on v1 (expecting integers: 25, 30, 40)
Gets v2 in prod (decimals: 25.3, 30.7, 40.2)
Model confused, accuracy tanks

Solution: Version features with models
model_v1.2.3 requires features_v1.0.0
If features change, retrain model

Store in model registry:
{
    "model_id": "fraud_v1.2.3",
    "feature_version": "v1.0.0",
    "feature_list": ["amount", "velocity_1h", "merchant_is_new"]
}</div>

                <h2>Feature Store Options (Real-World Comparison)</h2>

                <table class="table">
                    <tr>
                        <th>Solution</th>
                        <th>Best For</th>
                        <th>Pros</th>
                        <th>Cons</th>
                    </tr>
                    <tr>
                        <td><strong>Feast (Open Source)</strong></td>
                        <td>Startups, K8s-native teams</td>
                        <td>Free, active community, cloud-agnostic</td>
                        <td>Self-managed, need DevOps expertise</td>
                    </tr>
                    <tr>
                        <td><strong>Tecton</strong></td>
                        <td>Enterprises, real-time heavy</td>
                        <td>Managed, great real-time support</td>
                        <td>Expensive ($50K+/year)</td>
                    </tr>
                    <tr>
                        <td><strong>AWS SageMaker Feature Store</strong></td>
                        <td>AWS-native teams</td>
                        <td>Integrated with SageMaker, serverless</td>
                        <td>Vendor lock-in, AWS only</td>
                    </tr>
                    <tr>
                        <td><strong>GCP Vertex AI Feature Store</strong></td>
                        <td>GCP teams</td>
                        <td>Integrated with Vertex, BigQuery</td>
                        <td>Vendor lock-in, newer (less mature)</td>
                    </tr>
                    <tr>
                        <td><strong>Custom (Redis + Spark)</strong></td>
                        <td>Specific needs, large teams</td>
                        <td>Total control, optimized for your use case</td>
                        <td>High engineering cost, maintenance</td>
                    </tr>
                </table>

                <h2>Feature Engineering Checklist</h2>

                <ul>
                    <li>✅ <strong>No data leakage</strong> - Only use data available at prediction time</li>
                    <li>✅ <strong>Consistent training/serving</strong> - Same feature computation logic</li>
                    <li>✅ <strong>Handle missing data</strong> - Same imputation strategy everywhere</li>
                    <li>✅ <strong>Version features</strong> - Track which features each model uses</li>
                    <li>✅ <strong>Monitor distributions</strong> - Alert on feature drift</li>
                    <li>✅ <strong>Document features</strong> - Business meaning, computation logic</li>
                    <li>✅ <strong>Test at scale</strong> - Features fast enough for production?</li>
                    <li>✅ <strong>Real-time + Batch</strong> - Right pipeline for each feature</li>
                </ul>

                <p><strong>Remember:</strong> "Garbage in, garbage out" is doubly true for ML. Amazing model with bad features = useless. Okay model with great features = production success.</p>
            `,
            interviews: [
                {
                    question: "How do you ensure training-serving consistency in features?",
                    answer: "Single source of truth for feature definitions. Best practice: Feature store with shared feature definitions used by both training and serving. Example: Define feature in Python/SQL once, training pipeline and serving API both reference same definition. At Uber: Used Palette (internal feature store) - features defined in Java, compiled to both Spark (training) and Flink (serving), guarantees consistency. Alternative without feature store: 1) Share feature code as library (pip install my_features), 2) Integration tests comparing training vs serving outputs, 3) Log features during serving, compare distributions to training. Real incident avoided: Set up test that runs same feature code on sample data in training and serving environments, catches mismatches before deploy. Red flags: Different teams own training and serving (high risk), features computed in different languages (SQL vs Python)."
                },
                {
                    question: "What's the difference between online and offline feature stores?",
                    answer: "Offline = historical features for training (batch). Online = low-latency features for serving (real-time). Offline store: S3/BigQuery with Parquet files, partitioned by date. Used by: Training jobs, batch scoring, backfills. Latency: Seconds to minutes (ok for batch). Size: TBs to PBs (all history). Online store: Redis/DynamoDB key-value store. Used by: Real-time predictions, web/mobile apps. Latency: <10ms (required!). Size: GBs (recent data only). Sync: Offline → Online via batch jobs (hourly) or streaming (Kafka → Flink). Example: User features - Offline: All user history since 2010 (TBs). Online: Last 90 days per user (GBs), accessed by user_id key. Cost: Offline cheap ($20/TB/month), Online expensive ($200/month for 100GB Redis). When to use both: Training from offline, serving from online. Budget constrained: Start with just offline, compute features on-the-fly for serving (slower but works)."
                },
                {
                    question: "How do you handle feature freshness for real-time ML?",
                    answer: "Tiered freshness based on importance: Tier 1 (Real-time, <1 sec): Critical for prediction. Example: transactions_last_hour for fraud. Implementation: Kafka → Flink → Redis. Update on every event. Cost: High. Tier 2 (Near-real-time, <5 min): Important but not critical. Example: trending_products. Implementation: Micro-batch (Spark Streaming every 1 min). Cost: Medium. Tier 3 (Batch, hourly/daily): Slow-changing features. Example: user_lifetime_value. Implementation: Daily Spark job → Redis. Cost: Low. Real architecture: Fraud detection has 10 real-time features (Flink), 50 batch features (Spark daily). Tradeoff: Real-time = expensive but accurate. Batch = cheap but potentially stale. Failure handling: If real-time pipeline down, fallback to last-known value with staleness flag. Model uses staleness as feature (if stale, weight less). Monitor: Alert if features >X minutes old."
                },
                {
                    question: "What's data leakage and how do you prevent it?",
                    answer: "Using information in training that won't be available at prediction time. Classic example: Predicting if user will buy, include 'purchase_id' as feature. Model: 100% accuracy! (Of course - only has purchase_id AFTER buying). Prod: Feature missing, model broken. Types: 1) Target leakage - Feature derived from target. Fix: Only use features known BEFORE event. 2) Temporal leakage - Using future data. Example: train on Jan data, include Feb metrics. Fix: Point-in-time correct features. 3) Data split leakage - Normalization using test data. Fix: Fit scaler on train only. Detection: 1) Suspiciously high accuracy (>95% red flag), 2) Feature importance analysis (one feature dominates? Check it), 3) Check each feature: Would I know this at prediction time? Real incident: Churn model 99% accurate, feature was 'days_since_last_login'. Churned users had 90+ days (obvious!). Fixed: Only use features from 30 days before prediction date. Prevention: Code review features, automated checks for target correlations >0.9."
                },
                {
                    question: "How would you design a feature store for a startup vs enterprise?",
                    answer: "Startup (10 engineers, limited budget): Keep it simple. Day 1-3 months: No feature store, just shared Python library for features. Store outputs in S3 parquet. Serve from S3 (slow but works). Month 3-12: Add Redis for serving (online store). S3 for training (offline store). Use Feast (open source, free). Airflow to sync S3 → Redis daily. Cost: $200-500/month. Team: 0.5 engineer maintaining. Enterprise (100+ engineers, multiple teams): Full platform. Components: Offline store (S3 + Glue Catalog), Online store (Redis + DynamoDB backup), Streaming (Kafka + Flink for real-time), Monitoring (Prometheus + Grafana), Feature registry (UI for discovery), Governance (access control, lineage). Use: Tecton or SageMaker Feature Store (managed). Cost: $50-100K/year. Team: 2-3 engineers. Why different: Startup needs to ship fast, can tolerate tech debt. Enterprise needs reliability, governance, multi-team coordination. Mistake: Startup building enterprise-scale from day 1 (over-engineering). Start simple, add complexity when needed."
                }
            ]
        },
        {
            id: 'model-serving-deployment',
            title: 'Model Serving: Fast, Reliable Predictions at Scale',
            duration: '60 min',
            content: `
                <h2>The Hardest Part of ML: Actually Serving Predictions</h2>

                <p>Training a model takes days. Serving it reliably takes months. Here's what nobody tells you:</p>

                <div class="code-block">My first production ML deployment (2019):

Data scientist: "Model is ready! 94% accuracy!"
Me: "Great! Let's deploy it"

Reality check:
- Model file: 2.5GB (won't fit in container memory)
- Prediction time: 3 seconds per request (need <100ms)
- Dependencies: 47 Python packages (15 version conflicts)
- GPU required: Yes (production has CPUs)
- Works on: Data scientist's MacBook
- Works on: Literally nowhere else

Spent 6 weeks making it production-ready:
- Quantized model: 2.5GB → 150MB (17x smaller)
- Optimized inference: 3s → 80ms (37x faster)
- Containerized: Docker with exact dependencies
- Moved to CPU: Converted from GPU to CPU inference
- Added: Load balancing, auto-scaling, monitoring

Original estimate: "2 days to deploy"
Actual time: 6 weeks
This is NORMAL in MLOps</div>

                <h2>Model Serving Patterns</h2>

                <table class="table">
                    <tr>
                        <th>Pattern</th>
                        <th>Use Case</th>
                        <th>Latency</th>
                        <th>Complexity</th>
                    </tr>
                    <tr>
                        <td><strong>REST API</strong></td>
                        <td>Synchronous predictions, web apps</td>
                        <td>10-100ms</td>
                        <td>Low</td>
                    </tr>
                    <tr>
                        <td><strong>Batch Scoring</strong></td>
                        <td>Offline predictions, daily reports</td>
                        <td>Hours</td>
                        <td>Low</td>
                    </tr>
                    <tr>
                        <td><strong>Streaming</strong></td>
                        <td>Real-time events, fraud detection</td>
                        <td>1-10ms</td>
                        <td>High</td>
                    </tr>
                    <tr>
                        <td><strong>Edge Deployment</strong></td>
                        <td>Mobile, IoT, offline inference</td>
                        <td><1ms</td>
                        <td>Very High</td>
                    </tr>
                </table>

                <h3>Pattern 1: REST API (Most Common)</h3>

                <div class="code-block">Flask API for model serving (simple version):

from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load model at startup (not per request!)
model = joblib.load('model.pkl')
scaler = joblib.load('scaler.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get input features
        data = request.get_json()
        features = np.array(data['features']).reshape(1, -1)

        # Preprocess
        features_scaled = scaler.transform(features)

        # Predict
        prediction = model.predict(features_scaled)[0]
        probability = model.predict_proba(features_scaled)[0]

        return jsonify({
            'prediction': int(prediction),
            'probability': float(probability[1]),
            'model_version': '1.2.3'
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'model_loaded': model is not None})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

This works for prototype. Production needs MORE...</div>

                <h3>Production-Ready Version (What Actually Works)</h3>

                <div class="code-block">from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, validator
import uvicorn
import joblib
import numpy as np
from prometheus_client import Counter, Histogram
import logging
import time

app = FastAPI()

# Metrics
prediction_counter = Counter('predictions_total', 'Total predictions')
prediction_latency = Histogram('prediction_latency_seconds', 'Prediction latency')
error_counter = Counter('prediction_errors_total', 'Prediction errors')

# Load model once at startup
class ModelService:
    def __init__(self):
        self.model = joblib.load('model.pkl')
        self.scaler = joblib.load('scaler.pkl')
        self.model_version = "1.2.3"

    def predict(self, features):
        features_scaled = self.scaler.transform(features)
        return self.model.predict_proba(features_scaled)

model_service = ModelService()

# Request validation
class PredictionRequest(BaseModel):
    user_id: str
    features: list[float]

    @validator('features')
    def validate_features(cls, v):
        if len(v) != 10:  # Expected feature count
            raise ValueError('Expected 10 features')
        if any(np.isnan(f) or np.isinf(f) for f in v):
            raise ValueError('Features contain NaN or Inf')
        return v

@app.post('/predict')
async def predict(request: PredictionRequest):
    start_time = time.time()

    try:
        # Convert to numpy
        features = np.array(request.features).reshape(1, -1)

        # Predict
        probabilities = model_service.predict(features)
        prediction = int(probabilities[0][1] > 0.5)

        # Metrics
        prediction_counter.inc()
        prediction_latency.observe(time.time() - start_time)

        # Log for debugging
        logging.info(f"Prediction for user {request.user_id}: {prediction}")

        return {
            'user_id': request.user_id,
            'prediction': prediction,
            'probability': float(probabilities[0][1]),
            'model_version': model_service.model_version,
            'latency_ms': round((time.time() - start_time) * 1000, 2)
        }

    except Exception as e:
        error_counter.inc()
        logging.error(f"Prediction error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get('/health')
async def health():
    return {
        'status': 'healthy',
        'model_version': model_service.model_version,
        'model_loaded': model_service.model is not None
    }

@app.get('/metrics')
async def metrics():
    # Prometheus metrics endpoint
    from prometheus_client import generate_latest
    return generate_latest()

# What's different from simple version?
# 1. Input validation (Pydantic catches bad inputs)
# 2. Metrics (Prometheus for monitoring)
# 3. Error handling (proper HTTP status codes)
# 4. Logging (debugging production issues)
# 5. Latency tracking (SLA monitoring)
# 6. Health endpoint (k8s liveness/readiness)
# 7. Model versioning (track which model served prediction)</div>

                <h2>War Story: Netflix's Model Serving at Scale</h2>

                <div class="code-block">Netflix recommendations (from their tech blog):

Scale:
- 230M subscribers
- 50M concurrent predictions per hour
- 1000+ models in production
- Predictions drive 80% of viewing

The Challenge (2018):
- Each model: 500MB-2GB in size
- Loading model per request: TOO SLOW (3-5 seconds)
- Keeping all models in memory: 1000 × 1GB = 1TB RAM (expensive!)

Failed Approach #1: Load model per request
Result: 5 second latency (unacceptable)

Failed Approach #2: Keep all models in memory
Result: $100K/month in infrastructure costs

What Actually Worked:
1. Model Caching (LRU cache)
   - Keep 100 most-used models in memory (50GB)
   - Load others on-demand
   - Cache hit rate: 95%
   - Latency: 50ms (cached), 2s (cache miss)

2. Model Optimization
   - Quantization: 32-bit → 8-bit (4x smaller)
   - Pruning: Remove 30% of weights (minimal accuracy loss)
   - Result: 1GB → 200MB per model

3. Tiered Serving
   - Tier 1: Real-time (<100ms) - Lightweight models
   - Tier 2: Near real-time (<1s) - Medium models
   - Tier 3: Batch (hours) - Heavy models
   - Most predictions use Tier 1

4. GPU vs CPU
   - Deep learning models: GPU (batch predictions)
   - Simple models (trees, linear): CPU (single predictions)
   - Cost: GPU $2/hour, handles 1000 req/sec
           CPU $0.10/hour, handles 100 req/sec
   - Use CPU for low-volume models (cheaper)

Final Architecture:
- FastAPI + uvicorn (async requests)
- Model registry (S3) with lazy loading
- Redis cache for model weights
- Kubernetes auto-scaling (10-100 pods based on load)
- Result: 50ms p99 latency, $20K/month cost

Lessons:
- Not all models need real-time serving
- Model optimization crucial (quantization saves $$)
- Caching is king (95% hit rate = big win)
- Right tool for right model (GPU vs CPU)</div>

                <h2>Model Optimization Techniques</h2>

                <h3>1. Quantization (Easiest Win)</h3>

                <div class="code-block">What: Convert 32-bit floats to 8-bit integers

Before:
- Weight: 0.435921 (32 bits)
- Model size: 500MB

After:
- Weight: 111 (8 bits, represents ~0.436)
- Model size: 125MB (4x smaller!)
- Accuracy drop: <1%

PyTorch example:
import torch

# Original model
model = torch.load('model.pth')  # 500MB

# Quantize
quantized_model = torch.quantization.quantize_dynamic(
    model,
    {torch.nn.Linear},  # Which layers to quantize
    dtype=torch.qint8
)

torch.save(quantized_model, 'model_quantized.pth')  # 125MB

# Inference speed
# Original: 80ms
# Quantized: 30ms (2.6x faster!)

Real impact at Uber:
- 1000 models × 500MB = 500GB
- After quantization: 125GB (4x reduction)
- Saved: $15K/month in infrastructure costs</div>

                <h3>2. Model Distillation (For Complex Models)</h3>

                <div class="code-block">What: Train small "student" model to mimic large "teacher"

Scenario: BERT model for text classification
- Teacher: BERT-large (340M parameters, 1.3GB)
- Inference: 200ms per prediction
- Cost: Needs GPU ($2/hour)

Student: DistilBERT (66M parameters, 250MB)
- Trained to match teacher's outputs
- Inference: 40ms per prediction (5x faster!)
- Cost: Runs on CPU ($0.10/hour)
- Accuracy: 97% of teacher (acceptable!)

Code:
from transformers import DistilBertForSequenceClassification

# Load large model (teacher)
teacher = BertForSequenceClassification.from_pretrained('bert-large')

# Train small model (student) to mimic teacher
student = DistilBertForSequenceClassification.from_pretrained('distilbert')

# Training uses teacher's logits as soft labels
# Result: Small model learns from large model's knowledge

Use case:
- Development: Use BERT-large (best accuracy)
- Production: Use DistilBERT (fast, cheap)
- Retrain student monthly with new teacher</div>

                <h3>3. ONNX Runtime (Cross-Platform Optimization)</h3>

                <div class="code-block">What: Convert models to optimized format

Problem: PyTorch model slow on CPU
Solution: Convert to ONNX, use ONNX Runtime

import torch
import onnx
import onnxruntime

# Original PyTorch model
model = torch.load('model.pth')

# Convert to ONNX
dummy_input = torch.randn(1, 10)
torch.onnx.export(model, dummy_input, 'model.onnx')

# Load with ONNX Runtime
session = onnxruntime.InferenceSession('model.onnx')

# Inference
input_name = session.get_inputs()[0].name
output = session.run(None, {input_name: features})

Speed improvement:
- PyTorch CPU: 120ms
- ONNX Runtime CPU: 35ms (3.4x faster!)

Why faster:
- Graph optimization (fuses operations)
- Specialized kernels for CPU/GPU
- Removes Python overhead

Bonus: Works across frameworks
- Train in PyTorch, TensorFlow, scikit-learn
- All export to ONNX
- Single serving infrastructure</div>

                <h2>Deployment Strategies</h2>

                <h3>Blue-Green Deployment (Safest)</h3>

                <div class="code-block">Strategy: Run two identical environments, switch traffic

Blue environment (current production):
- model_v1.2 serving 100% traffic
- Stable, known performance

Green environment (new version):
- model_v1.3 deployed
- 0% traffic (warming up)

Deployment steps:
1. Deploy v1.3 to green (blue still serving 100%)
2. Run smoke tests on green (health checks, sample predictions)
3. Switch 10% traffic to green (monitor)
4. If metrics good: 50% → 100%
5. If metrics bad: Instant rollback (switch back to blue)

Kubernetes implementation:
# Two services
apiVersion: v1
kind: Service
metadata:
  name: model-service
spec:
  selector:
    version: blue  # Traffic goes to blue pods
---
# Switch traffic by changing selector
spec:
  selector:
    version: green  # Now traffic goes to green

Pros:
- Instant rollback (change selector back)
- No downtime
- Test in production with real traffic

Cons:
- Double infrastructure cost (both running)
- Complex setup

When to use: Critical models (fraud, recommendations)
Netflix, Uber, Airbnb all use this</div>

                <h3>Canary Deployment (Most Common)</h3>

                <div class="code-block">Strategy: Gradual rollout with monitoring

Phase 1: 5% traffic to new model
- Monitor: Latency, errors, prediction distribution
- Duration: 1 hour
- Rollback if: Error rate >1% or latency >2x baseline

Phase 2: 25% traffic
- Monitor: Business metrics (CTR, conversion)
- Duration: 6 hours
- Rollback if: Business metrics drop >5%

Phase 3: 50% traffic
- Monitor: Everything
- Duration: 24 hours
- A/B test: Compare new vs old model

Phase 4: 100% traffic
- New model fully deployed
- Old model kept as backup for 48 hours

Code (using feature flags):
def get_model_version(user_id):
    # Hash user ID to percentage
    bucket = hash(user_id) % 100

    if bucket < 5:  # 5% get new model
        return 'v1.3'
    else:
        return 'v1.2'

model_version = get_model_version(request.user_id)
model = load_model(model_version)
prediction = model.predict(features)

Real incident avoided (2022):
- Deployed model v2.0 with canary (5% traffic)
- After 30 minutes: Error rate spiked to 8% for canary group
- Investigation: New feature 'user_segment' missing in 40% of requests
- Rolled back immediately (only affected 5% of users)
- Fixed feature pipeline, redeployed next day
- Without canary: Would've broken 100% of traffic

Lesson: ALWAYS canary deploy, never 0% → 100%</div>

                <h2>Common Serving Failures (And How to Handle)</h2>

                <h3>Failure 1: Model Loading Takes Forever</h3>

                <div class="code-block">Problem:
- Model file: 2GB
- Loading from S3: 30 seconds
- Pod restart: 30 second downtime
- Kubernetes kills pod as "unhealthy"

Solution: Pre-warm models
1. Load model during container build (bake into image)
2. OR: Load in background, serve cached predictions meanwhile
3. Use readiness probe (don't route traffic until loaded)

Kubernetes config:
readinessProbe:
  httpGet:
    path: /health
    port: 5000
  initialDelaySeconds: 60  # Wait 60s before checking
  periodSeconds: 10

Health endpoint:
@app.get('/health')
def health():
    if model_service.model is None:
        return {'status': 'loading'}, 503  # Not ready
    return {'status': 'ready'}, 200  # Ready for traffic</div>

                <h3>Failure 2: Memory Leak</h3>

                <div class="code-block">Incident (2020):

Symptom: Pods crashing every 2 hours (OOM killed)

Investigation:
- Memory usage: Starts at 2GB, grows to 8GB, crash
- Pattern: +100MB per 10K predictions

Root cause:
def predict(features):
    # BUG: Appending to global list!
    predictions_history.append(prediction)  # Grows forever
    return prediction

Fix:
def predict(features):
    # Don't store predictions in memory
    # Log to external system if needed
    prediction = model.predict(features)
    logger.info(f"Prediction: {prediction}")  # Logs don't accumulate
    return prediction

Prevention:
- Set memory limits (Kubernetes)
- Monitor memory growth
- Alert if memory increases >20% per hour</div>

                <h3>Failure 3: Cold Start Latency</h3>

                <div class="code-block">Problem: First prediction after pod start takes 5 seconds

Cause: Model not in memory, loading from disk

Solution: Warm-up requests at startup
@app.on_event("startup")
async def startup_event():
    # Load model
    model_service.load_model()

    # Warm up with dummy predictions
    dummy_features = np.zeros((1, 10))
    for _ in range(10):
        model_service.predict(dummy_features)

    logging.info("Model warmed up and ready")

Now first real prediction: 50ms (not 5 seconds)</div>

                <h2>Model Serving Checklist</h2>

                <ul>
                    <li>✅ <strong>Input validation</strong> - Reject malformed requests early</li>
                    <li>✅ <strong>Output validation</strong> - Check predictions are reasonable</li>
                    <li>✅ <strong>Metrics</strong> - Latency, throughput, error rates</li>
                    <li>✅ <strong>Health checks</strong> - Kubernetes liveness/readiness</li>
                    <li>✅ <strong>Logging</strong> - Debug production issues</li>
                    <li>✅ <strong>Model versioning</strong> - Track which model served each prediction</li>
                    <li>✅ <strong>Timeout</strong> - Don't wait forever for slow predictions</li>
                    <li>✅ <strong>Fallback</strong> - Simple rule if model fails</li>
                    <li>✅ <strong>Canary deployment</strong> - Gradual rollout</li>
                    <li>✅ <strong>Auto-scaling</strong> - Handle traffic spikes</li>
                </ul>
            `,
            interviews: [
                {
                    question: "What's the difference between batch scoring and real-time serving?",
                    answer: "Batch: Process millions of predictions offline, write to database/file. Example: Daily product recommendations (compute overnight, show next day). Latency: Hours. Infrastructure: Spark on large cluster, process all users. Cost: Cheap (spot instances). When: Predictions don't need to be instant, can pre-compute. Real-time: Serve predictions on-demand via API. Example: Fraud detection (decision needed NOW). Latency: <100ms. Infrastructure: API server (Flask/FastAPI), always-on. Cost: Expensive (24/7 servers). When: Need immediate response. Hybrid approach (common): Batch compute features (user history), store in Redis. Real-time: API fetches features from Redis, runs simple model. Example: Recommendations - batch compute user/item embeddings, real-time dot product for ranking. Trade-off: Batch is 100x cheaper but stale, real-time is expensive but fresh. Most systems: 80% batch, 20% real-time for critical path."
                },
                {
                    question: "How do you handle model versioning in a production serving system?",
                    answer: "Multi-model serving with routing. Implementation: Store models in registry (MLflow, S3) with versions. Serving API supports multiple versions simultaneously. Client specifies version in request, or use default. Example: POST /predict?model_version=v1.2.3 {features: [...]}. If no version: Use 'champion' model (best performing). Routing logic: if version == 'v1.2.3': model = load_model('s3://models/fraud/v1.2.3'). Challenger models: Deploy new model as v1.3.0, route 10% traffic for A/B test. Champion remains v1.2.3 for 90%. After test: Promote v1.3.0 to champion if better. Rollback: Change champion pointer from v1.3.0 back to v1.2.3 (instant). Shadow mode: Serve v1.2.3 to user, also compute v1.3.0 prediction in background (log but don't return), compare predictions offline. Storage: Keep last 3 versions in serving layer (fast access), archive older versions in S3 (slower). Real example: Uber keeps 5 ETA model versions live, routes by city (NYC uses v2.1, SF uses v2.3). Version metadata: Store training date, accuracy, features used, owner."
                },
                {
                    question: "What optimizations would you apply to reduce model serving latency?",
                    answer: "Layered optimizations: 1) Model level - Quantization (32-bit → 8-bit, 4x smaller, 2-3x faster), Pruning (remove 30% weights, minimal accuracy loss), Distillation (train small model to mimic large), ONNX Runtime (3-5x faster than PyTorch/TF). 2) Infrastructure - Use faster CPU/GPU instances, batch predictions when possible (10 predictions together faster than 10 sequential), model caching (load once, keep in memory). 3) Feature fetching - Redis for features (5ms) not database queries (100ms), pre-compute expensive features, cache user features. 4) Code optimization - Use async Python (FastAPI not Flask), avoid Python loops (use numpy), profile code (cProfile), remove unnecessary logging in hot path. 5) Network - Deploy close to users (multi-region), use CDN for edge inference, gRPC instead of REST (faster serialization). Real example: Reduced fraud model latency 200ms → 30ms: Quantization (200 → 100ms), ONNX Runtime (100 → 50ms), Redis features (50 → 30ms). Each optimization compounds. Measure first: Profile to find bottleneck, optimize bottleneck, repeat."
                },
                {
                    question: "How would you handle a situation where the model is too large to fit in memory?",
                    answer: "Strategies based on size: Small (1-2GB, slightly over): Compress model (quantization, pruning), remove unused layers, buy bigger instance (32GB RAM not expensive). Medium (5-10GB): Model sharding - split model across multiple servers, route requests to correct shard, or stream model from disk (slow but works), or use model caching (LRU cache, keep hot models in memory). Large (50GB+, like GPT-3): Model parallelism - split layers across GPUs (layer 1-10 on GPU 1, 11-20 on GPU 2), pipeline parallelism (batch requests through pipeline), use specialized serving (TensorRT, TorchServe with multi-GPU). Practical solution for most: Lazy loading - Don't load all models, load on first request, cache in memory (LRU), evict least-used models. Real architecture: Netflix has 1000 models, only keeps 100 in memory, loads others on-demand, 95% cache hit rate. Alternative: Redesign model - Do you really need 50GB model for production? Train smaller model (distillation), use ensemble of small models instead of one huge model. When to scale up: If model is business-critical and no smaller alternative, invest in infrastructure (96GB RAM instances, multi-GPU serving)."
                },
                {
                    question: "What's your strategy for handling model serving failures in production?",
                    answer: "Multi-layer fallback strategy: Layer 1 (Primary): Main ML model with circuit breaker (if error rate >5%, open circuit for 1 min). Layer 2 (Fallback): Simple rule-based model (if ML fails, use rules). Example: Fraud - if transaction > $10K or new merchant → flag. Layer 3 (Default): Safe default response (if rules fail, return 'needs_review'). Never return error to user. Implementation: try { prediction = ml_model.predict() } catch { try { prediction = rule_based_fallback() } catch { prediction = safe_default } }. Monitoring: Alert on fallback usage (if >1%, investigate), log all failures with context (features, error, timestamp), track fallback accuracy (how good is fallback vs ML?). Real incident: ML serving crashed (OOM), fallbacks handled 100% traffic for 45 min, business continued (degraded but working). Without fallback: Complete outage. Recovery: Auto-restart failed pods, have backup model (previous version), can quickly switch to batch mode (precomputed predictions from Redis). Prevention: Load testing (simulate 10x traffic), chaos engineering (randomly kill pods, verify fallbacks work), canary deployments (catch issues early). Rule: Production ML should NEVER hard-fail, always graceful degradation."
                }
            ]
        },
        {
            id: 'ml-monitoring',
            title: 'Monitoring ML Models: What Can Go Wrong, Will Go Wrong',
            duration: '55 min',
            content: `
                <h2>Why ML Monitoring is Different (And Harder)</h2>

                <p>Regular software: Code doesn't change unless you deploy. ML models: Silently degrade every day.</p>

                <div class="code-block">Real disaster - E-commerce recommendation model (2021):

Monday: Model deployed, 92% accuracy, everything great
Week 1: Still looks good (metrics dashboard green)
Week 4: CEO asks "Why are sales down 15%?"

Investigation found:
- Model accuracy in logs: Still 92% (WHY??)
- But: Recommending products that are OUT OF STOCK
- Reason: Inventory data not updating in feature store
- Model predicting correctly, but on STALE data
- Result: Users see "Add to Cart" → "Out of Stock" → Leave site

Traditional monitoring: All green! ✅
- API latency: 50ms
- Error rate: 0.1%
- Throughput: 10K req/sec
- CPU/Memory: Normal

ML-specific issues missed:
- Feature freshness: Inventory data 30 days old❌
- Prediction distribution: Changed dramatically ❌
- Business metric (conversion): Down 15% ❌
- User feedback: Complaints up 300% ❌

Cost: $500K in lost revenue over 4 weeks
Lesson: Traditional monitoring is necessary but NOT sufficient for ML

What we added:
1. Feature freshness alerts
2. Prediction distribution monitoring
3. Business metric tracking
4. A/B testing vs simple baseline
5. User feedback loop

Never again shipped ML without these 5 checks</div>

                <h2>The Four Horsemen of ML Failures</h2>

                <h3>1. Data Drift (Input Distribution Changed)</h3>

                <div class="code-block">What: Training data != Production data

Example - COVID-19 Impact:
E-commerce model trained on 2019 data
Features: day_of_week, hour_of_day, is_holiday, user_location

2019 pattern:
- Monday-Friday: Work from office, shop during lunch (12-2pm peak)
- Saturday-Sunday: Home, shop morning (10am peak)

2020 (COVID): Everyone home all the time!
- Every day looks like Saturday
- Peak shopping: All day (no pattern)
- Model confused: Predictions way off

Detection:
# Compare training vs production distributions
from scipy.stats import ks_2samp

train_hours = [12, 13, 14, 12, 13, ...]  # Lunch time peak
prod_hours = [9, 10, 11, 14, 15, 16, ...]  # All day spread

statistic, pvalue = ks_2samp(train_hours, prod_hours)
if pvalue < 0.05:
    alert("Data drift detected in hour_of_day feature!")

Alert: Hour_of_day distribution significantly different
Action: Retrain model on recent (COVID-era) data

Real tool: Evidently AI automatically detects data drift
Monitors all features, alerts when distribution shifts</div>

                <h3>2. Concept Drift (Relationship Changed)</h3>

                <div class="code-block">What: Features → Target relationship changed

Example - Housing price model:
2019: 1500 sqft house = $300K (relationship: $200/sqft)
2023: 1500 sqft house = $450K (same features, different price!)
Reason: Interest rates, inflation, market dynamics

Model trained on 2019: Predicts $300K
Reality in 2023: $450K (33% error!)

Detection:
# Track model error over time
daily_mae = []
for day in last_30_days:
    predictions = model.predict(features)
    actuals = get_ground_truth(day)
    mae = mean_absolute_error(predictions, actuals)
    daily_mae.append(mae)

if mae[-1] > mae[0:7].mean() * 1.5:  # 50% worse than last week
    alert("Model accuracy degrading!")

Real incident (2022):
Churn prediction model
Trained: Pre-COVID (churn rate 2%/month)
Production: Post-COVID (churn rate 5%/month)
Model kept predicting low churn (learned from 2%)
Reality: 2.5x more churn
Business lost: Didn't invest in retention (thought churn low)

Fix: Retrain quarterly (not yearly)
Also: Monitor actual churn rate, alert if deviates from predictions</div>

                <h3>3. Upstream Data Changes (Silent Breakage)</h3>

                <div class="code-block">The nightmare scenario: Breaking without errors

Example:
Feature: user_age
Training: Age in years (25, 30, 45)
Production: Someone "improved" pipeline, now age in months!
Production: (300, 360, 540)

Model sees age=300:
Thinks: 300 year old person? Impossible! Returns nonsense prediction
But: No error! API returns 200 OK
Monitoring: All green! ✅ (technically working)
Predictions: Complete garbage

Detection:
# Feature value range monitoring
feature_ranges = {
    'user_age': {'min': 13, 'max': 100},  # Reasonable ages
    'transaction_amount': {'min': 0.01, 'max': 10000},
}

def validate_features(features):
    for feature, value in features.items():
        min_val = feature_ranges[feature]['min']
        max_val = feature_ranges[feature]['max']

        if not (min_val <= value <= max_val):
            alert(f"{feature} out of range: {value}")
            # Optional: Reject prediction
            raise ValueError(f"Invalid {feature}")

Real story (2020):
Pricing model at rideshare company
Feature: distance_miles
Upstream changed: Switched from miles to kilometers
No one told ML team
Model: Calculated prices assuming miles (2x too cheap)
Cost: $50K lost in one day before caught

Prevention:
- Schema validation (Great Expectations)
- Feature range checks (alert on outliers)
- Integration tests (compare features to training ranges)</div>

                <h3>4. Model Staleness (World Moved On)</h3>

                <div class="code-block">What: Model trained 6 months ago, world changed

Example - Product recommendations:
September: Recommend fall clothing (sweaters, jackets)
December: Model still recommending fall items
Reality: Users want winter coats, gifts
Result: Low click-through rate

Even without drift, models decay:
Month 0: 90% accuracy
Month 3: 87% accuracy
Month 6: 83% accuracy
Month 12: 75% accuracy (unacceptable)

Why:
- Trends change (fashion, technology)
- New products (didn't exist during training)
- User behavior evolves
- Competitors change market

Detection:
# Track model age
model_training_date = "2024-01-01"
days_since_training = (today - model_training_date).days

if days_since_training > 90:  # 3 months
    alert("Model is 90 days old, schedule retraining")

# Track accuracy trend
if accuracy_this_week < accuracy_last_month * 0.95:  # 5% drop
    alert("Model accuracy degrading, consider retraining")

Fix: Automated retraining
- Schedule: Weekly, monthly, or quarterly
- Trigger: When accuracy drops below threshold
- Never: Let model run >6 months without retrain</div>

                <h2>The Monitoring Stack (What Actually Works)</h2>

                <table class="table">
                    <tr>
                        <th>Layer</th>
                        <th>What to Monitor</th>
                        <th>Tools</th>
                        <th>Alert Threshold</th>
                    </tr>
                    <tr>
                        <td><strong>Infrastructure</strong></td>
                        <td>CPU, Memory, Latency, Errors</td>
                        <td>Prometheus, Grafana, DataDog</td>
                        <td>Latency >200ms, Errors >1%</td>
                    </tr>
                    <tr>
                        <td><strong>Model Performance</strong></td>
                        <td>Accuracy, Precision, Recall, AUC</td>
                        <td>Custom dashboards, MLflow</td>
                        <td>Accuracy drops >5%</td>
                    </tr>
                    <tr>
                        <td><strong>Data Quality</strong></td>
                        <td>Missing values, Outliers, Drift</td>
                        <td>Great Expectations, Evidently</td>
                        <td>Null rate >5%, Drift p<0.05</td>
                    </tr>
                    <tr>
                        <td><strong>Predictions</strong></td>
                        <td>Distribution, Anomalies</td>
                        <td>Custom logging, Kibana</td>
                        <td>Distribution shift >20%</td>
                    </tr>
                    <tr>
                        <td><strong>Business Metrics</strong></td>
                        <td>Revenue, CTR, Conversion</td>
                        <td>Mode Analytics, Looker</td>
                        <td>Any drop >10%</td>
                    </tr>
                </table>

                <h3>Real Monitoring Setup - Airbnb's ML Platform</h3>

                <div class="code-block">Layer 1: Infrastructure (Prometheus + Grafana)
Metrics collected every 30 seconds:
- prediction_latency_seconds (p50, p95, p99)
- prediction_errors_total
- predictions_per_second
- model_memory_usage_bytes
- feature_fetch_latency_seconds

Alerts:
- P99 latency >500ms for 5 minutes
- Error rate >1% for 2 minutes
- Memory usage >80% of limit

Layer 2: Model Performance (Custom + MLflow)
Tracked in real-time:
- Predicted probability distribution
- Class balance (% fraud vs legitimate)
- Prediction confidence (how sure is model?)

Daily batch evaluation:
- Compute accuracy on yesterday's data (get ground truth labels)
- Compare to training accuracy
- Alert if accuracy drops >5%

Example:
# Every night at 2 AM
yesterday_predictions = get_predictions(date="2024-01-30")
yesterday_actuals = get_labels(date="2024-01-30")  # Ground truth

accuracy = (yesterday_predictions == yesterday_actuals).mean()
baseline_accuracy = 0.93  # Training accuracy

if accuracy < baseline_accuracy * 0.95:  # >5% drop
    alert(f"Accuracy degraded: {accuracy:.2%} vs {baseline_accuracy:.2%}")

Layer 3: Data Drift (Evidently AI)
Weekly drift checks:
- Compare this week's feature distributions to training data
- KS test for numerical features
- Chi-squared test for categorical features
- Alert if p-value <0.05

from evidently.metrics import DataDriftTable

report = DataDriftTable(
    reference_data=training_data,  # Training set
    current_data=production_data   # This week's data
)

if report.drift_detected:
    alert("Data drift detected in features: " + report.drifted_features)

Layer 4: Business Impact (Daily Reports)
Key metrics dashboard:
- Booking conversion rate (target: >10%)
- Average booking value (target: >$500)
- User satisfaction (target: >4.5/5)
- Model serving cost (budget: <$10K/day)

If any metric off by >10%:
- Page on-call engineer
- Investigate correlation with model changes
- Consider rollback if model caused drop

What Airbnb learned:
"We had model working perfectly (99% uptime, low latency)
but business metrics were down. Traditional monitoring missed it.
Now we monitor the entire stack, infrastructure to business impact."</div>

                <h2>Monitoring Best Practices I Learned the Hard Way</h2>

                <h3>1. Log Every Prediction (With Features)</h3>

                <div class="code-block">Why: Can't debug what you can't see

What to log:
{
    "timestamp": "2024-01-30T12:34:56Z",
    "request_id": "abc123",
    "user_id": "user456",
    "model_version": "v1.2.3",
    "features": {
        "age": 25,
        "transaction_amount": 49.99,
        "merchant_id": "merchant789"
    },
    "prediction": 0,
    "probability": 0.23,
    "latency_ms": 45
}

Storage:
- Hot (last 7 days): Elasticsearch (fast queries)
- Warm (last 90 days): S3 parquet (analytics)
- Cold (archive): S3 Glacier (compliance)

Real debugging session (2023):
User complaint: "Model flagged my transaction as fraud, but it's legitimate!"
Looked up request_id in logs
Found: transaction_amount=4999.99 (unusual for this user)
Also: merchant_id was new (first time merchant)
Model logic: Large amount + new merchant = high fraud risk
Outcome: Model correct, but threshold too aggressive
Fix: Adjusted threshold, reduced false positives by 20%

Without logging: Would never have debugged this</div>

                <h3>2. Monitor Feature Freshness (Critical!)</h3>

                <div class="code-block">Incident: Stale features causing bad predictions (2022)

Setup:
- Feature store updates every hour
- Features have timestamps

Check freshness:
def check_feature_freshness(features, max_age_minutes=60):
    for feature_name, feature_data in features.items():
        age_minutes = (now() - feature_data.timestamp).total_seconds() / 60

        if age_minutes > max_age_minutes:
            alert(f"{feature_name} is {age_minutes} minutes old!")
            # Optional: Use default value or reject prediction
            return False

    return True

if not check_feature_freshness(features):
    # Don't serve prediction with stale features
    return {"error": "Features too old, try again"}

Real case:
- Feature pipeline broke (no alerts!)
- Features stuck at 3-day-old values
- Model serving predictions on stale data
- Took 2 days to notice (business metrics dropped)
- Now: Alert if any feature >2 hours old</div>

                <h3>3. A/B Test Against Simple Baseline</h3>

                <div class="code-block">Strategy: Always compare ML model to simple rule

Example: Fraud detection
- ML model: Complex neural network (94% accuracy)
- Baseline: Simple rules (88% accuracy)
    - Rule 1: Amount >$1000 → Flag
    - Rule 2: New merchant + Large amount → Flag
    - Rule 3: International transaction + New user → Flag

Run both in production (shadow mode):
- User gets ML model prediction
- Also compute baseline prediction (don't show)
- Compare: Are they different?

Insights:
- If ML == Baseline 95% of time: ML not adding value!
- If ML != Baseline often: ML learning patterns beyond rules
- If Baseline accuracy suddenly > ML: Model degraded, needs retrain

Real finding (2021):
- Built complex model (3 months work)
- Deployed alongside simple rules
- After 1 month: 92% agreement with rules
- Conclusion: Complex model not worth it
- Simplified to rules + small ML model
- Same accuracy, 10x faster, 100x cheaper to maintain

Lesson: Start with simple baseline, only add complexity if needed</div>

                <h2>When to Retrain? (Decision Framework)</h2>

                <div class="code-block">Option 1: Scheduled Retraining
When: Model on stable domain
Example: Product categorization (categories don't change much)
Schedule: Monthly
Pros: Predictable, simple
Cons: Might retrain when not needed (waste $$)

Option 2: Performance-Triggered
When: Model accuracy critical
Trigger: Accuracy drops >5% from baseline
Example: Fraud detection (must stay accurate)
Pros: Only retrain when necessary
Cons: Need ground truth labels (might be delayed)

Option 3: Drift-Triggered
When: Data distribution matters
Trigger: KS test p-value <0.05 (significant drift)
Example: User behavior models (behavior changes)
Pros: Catches issues before accuracy drops
Cons: Drift doesn't always mean retraining needed

Option 4: Hybrid (Recommended)
- Minimum: Quarterly (even if no issues)
- Also: Trigger on accuracy drop >7%
- Also: Trigger on severe drift (p<0.01)
- Also: Major external event (COVID, policy change)

Real policy at tech company:
- Scheduled: Every 90 days
- Early trigger: Accuracy <90% (baseline 95%)
- Emergency trigger: Business metric drops >15%
- Override: Data scientist can manually trigger

Result:
- Average: Retrain every 6 weeks
- Cost: $500/retrain (AWS + engineering time)
- Benefit: Model stays fresh, prevented 3 major degradations</div>

                <h2>Monitoring Checklist</h2>

                <ul>
                    <li>✅ <strong>Infrastructure metrics</strong> - Latency, errors, throughput</li>
                    <li>✅ <strong>Model accuracy tracking</strong> - Daily/weekly evaluation</li>
                    <li>✅ <strong>Prediction logging</strong> - All predictions + features saved</li>
                    <li>✅ <strong>Feature freshness</strong> - Alert if features stale</li>
                    <li>✅ <strong>Data drift detection</strong> - Weekly distribution checks</li>
                    <li>✅ <strong>Prediction distribution</strong> - Monitor for anomalies</li>
                    <li>✅ <strong>Business metrics</strong> - Track revenue, conversion, etc.</li>
                    <li>✅ <strong>Model version tracking</strong> - Know which model served what</li>
                    <li>✅ <strong>A/B test vs baseline</strong> - Validate ML adds value</li>
                    <li>✅ <strong>Alerting</strong> - Page on-call for critical issues</li>
                </ul>

                <p><strong>Remember:</strong> In traditional software, if it compiles, it probably works. In ML, if it compiles, you have no idea if it works. Monitor everything!</p>
            `,
            interviews: [
                {
                    question: "How do you detect data drift in production ML models?",
                    answer: "Statistical tests comparing production data to training data. For numerical features: Kolmogorov-Smirnov test (KS test), Jensen-Shannon divergence. For categorical: Chi-squared test, Population Stability Index (PSI). Implementation: Weekly batch job compares last 7 days production data to training data. from scipy.stats import ks_2samp; stat, pval = ks_2samp(train_data['age'], prod_data['age']); if pval < 0.05: alert('Drift detected'). Thresholds: p<0.05 (significant), p<0.01 (severe). Tools: Evidently AI (automatic drift detection), WhyLabs, Great Expectations. Real example: E-commerce model, detected drift in 'hour_of_day' feature during COVID (shopping patterns changed), retrained model with recent data, accuracy restored 87%→93%. Prevention: Monitor all features, not just model accuracy. Drift can happen without immediate accuracy drop. Action: Investigate cause (seasonal? permanent?), retrain if drift persistent >2 weeks, sometimes drift is temporary (holiday season), don't overreact."
                },
                {
                    question: "What's the difference between data drift and concept drift?",
                    answer: "Data drift: Input distribution changed (P(X) changed). Example: User ages shifted from avg 30 to avg 45 (audience changed). Detection: Compare feature histograms, KS test. Impact: Model sees different inputs than training. Concept drift: Relationship between features and target changed (P(Y|X) changed). Example: Same user age 30, but purchase behavior completely different (recession, pandemic). Detection: Model accuracy drops, predictions vs actuals diverge. Impact: Model logic outdated. Both can happen simultaneously. Real case: COVID - Data drift (everyone home, shopping all day not just lunch), Concept drift (priorities changed, buying essentials not luxuries). Different fixes: Data drift → Retrain on recent data (learn new distribution). Concept drift → Retrain + feature engineering (relationship fundamentally changed). When to worry: Data drift is warning sign, concept drift is emergency (model actively wrong). Monitor both: Track feature distributions AND model accuracy."
                },
                {
                    question: "How would you monitor a fraud detection model in production?",
                    answer: "Multi-layer monitoring: Layer 1 (Real-time, <1 min): Prediction distribution (% flagged as fraud), should be stable 2-3%. If suddenly 20% → investigate. Feature null rates (missing data breaks model). P99 latency <100ms (fraud check must be fast). Layer 2 (Hourly): Feature drift checks (transaction patterns changing?), prediction confidence distribution, error rates. Layer 3 (Daily with ground truth): True fraud rate (from investigations), false positive rate (legitimate transactions blocked), precision/recall on yesterday's data (get labels from fraud team). Layer 4 (Weekly): Retrain triggers (accuracy <90%, drift detected), A/B test new model vs current, business metrics (revenue blocked by false positives). Real incident: Fraud model started flagging 15% transactions (normal 2.5%). Investigation: Holiday shopping, higher amounts, legitimate. Fix: Adjusted threshold seasonally. Without monitoring: Would have blocked $2M in legitimate sales. Key metrics: False positive rate (too high = bad UX), false negative rate (too high = lose money to fraud). Balance: Optimize F1 score, bias towards precision (annoying users better than losing money to fraud)."
                },
                {
                    question: "When would you retrain a model vs rollback to previous version?",
                    answer: "Rollback (immediate, <1 hour): Model broken (error rate >5%, latency >10x), predictions nonsensical (all zeros, all ones), data pipeline broke (features missing/wrong), deployment bug (version mismatch). Action: Revert to last known good version, investigate in non-prod. Retrain (planned, 1-2 days): Accuracy degraded gradually (<85%, was 92%), data drift detected (p<0.01), concept drift (market changed), scheduled refresh (>90 days old). Action: Retrain on recent data, validate in staging, canary deploy. Real decision tree: Is model serving predictions? No → Rollback. Yes → Check accuracy. Accuracy >80%? Wait, monitor. Accuracy 75-80%? Schedule retrain (not urgent). Accuracy <75%? Emergency retrain or rollback to old model + fallback rules. Example: Black Friday, fraud model accuracy dropped 90%→78% (different patterns). Decision: Keep running (still useful), emergency retrain same day, deployed by evening. If accuracy <70%, would've rolled back to rules-based fallback. Have both ready: Quick rollback (minutes) and retrain pipeline (hours). Never: Deploy untested model in emergency, better to rollback."
                },
                {
                    question: "How do you track which model version served each prediction?",
                    answer: "Include model_version in every prediction response and log. Implementation: When loading model, store version metadata: model_metadata = {'version': 'v1.2.3', 'training_date': '2024-01-15', 'git_sha': 'abc123'}. In prediction: response = {'prediction': 1, 'probability': 0.89, 'model_version': model_metadata['version'], 'request_id': uuid}. In logs: {'timestamp': now, 'request_id': uuid, 'model_version': 'v1.2.3', 'features': {...}, 'prediction': 1}. Storage: ElasticSearch with model_version field (fast queries), S3 for long-term. Use cases: Debug: User reports issue, look up request_id, see which model version served it. Rollback: If v1.3 broken, find all predictions from v1.3, recompute with v1.2. A/B testing: Compare v1.2 vs v1.3 predictions on same users. Audit: Regulatory requirement, which model made decision (GDPR, financial compliance). Real example: Model v2.0 had bug affecting 5% of users. Used model_version logs to identify affected predictions, recomputed, notified users. Without version tracking: Impossible to know who got bad predictions. Model registry: MLflow/SageMaker stores version → training_data → features → code. Complete lineage for reproducibility."
                }
            ]
        },
        {
            id: 'cicd-for-ml',
            title: 'CI/CD for ML: Automate Everything',
            duration: '50 min',
            content: `
                <h2>Why Traditional CI/CD Isn't Enough for ML</h2>

                <div class="code-block">Traditional software CI/CD:
1. Code pushed to git
2. Tests run (unit, integration)
3. If tests pass → Deploy to production
4. Done!

ML CI/CD nightmare:
1. Code pushed to git ✓
2. Data changed? ❌ (not in git)
3. Model weights changed? ❌ (not in git)
4. Features changed? ❌ (different pipeline)
5. Training config changed? Maybe? ❌
6. Tests run... but what to test? ❌
7. Deploy model... but which version? ❌
8. Model works in prod... how do we know? ❌

Traditional CI/CD: Test code
ML CI/CD: Test code + data + model + features + infrastructure

This is why ML is hard</div>

                <h2>The ML CI/CD Pipeline (End-to-End)</h2>

                <div class="code-block">Complete ML workflow (what I built at last company):

STAGE 1: Data Pipeline CI (Runs on data changes)
Trigger: New data lands in S3
Tests:
  - Schema validation (columns match expected)
  - Data quality checks (no nulls in required fields)
  - Distribution checks (values in expected range)
  - Row count reasonable (not 0, not 10B)
Output: Clean data in data warehouse
If fail: Alert data team, don't continue

STAGE 2: Feature Pipeline CI
Trigger: Data pipeline success OR feature code change
Tests:
  - Feature computation correct (unit tests)
  - Features match training schema
  - No data leakage (point-in-time correct)
  - Feature distributions reasonable
Output: Features in feature store (offline + online)
If fail: Alert ML team

STAGE 3: Model Training CI
Trigger: Manual (data scientist), Scheduled (weekly), or Performance drop
Tests:
  - Training data loaded successfully
  - Model converges (loss decreases)
  - Validation accuracy > threshold (e.g., >90%)
  - Model size reasonable (<500MB)
  - Training time <2 hours (or budget exceeded)
Output: Trained model in model registry
If fail: Email data scientist with logs

STAGE 4: Model Validation CD
Trigger: New model in registry
Tests:
  - Model loads successfully
  - Inference works on sample data
  - Inference latency <100ms
  - Predictions in valid range
  - Accuracy on holdout set >threshold
  - A/B test vs current prod model (shadow mode 1 hour)
Output: Model approved for production
If fail: Reject model, notify team

STAGE 5: Model Deployment CD
Trigger: Model approved
Steps:
  - Deploy to staging environment
  - Run smoke tests (health check, sample predictions)
  - Deploy canary (5% production traffic)
  - Monitor for 1 hour (errors, latency, predictions)
  - If metrics good: 25% → 50% → 100%
  - If metrics bad: Automatic rollback
Output: Model serving 100% traffic
If fail: Rollback, page on-call

STAGE 6: Monitoring (Continuous)
  - Model accuracy (daily ground truth)
  - Data drift (weekly)
  - Performance metrics (real-time)
  - Business metrics (daily)
Triggers: Retrain if issues detected

Total time: Data lands → Production = 3-4 hours (automated)
Manual time: 2 weeks before automation!
</div>

                <h2>Real CI/CD Setup: GitHub Actions for ML</h2>

                <div class="code-block"># .github/workflows/ml-ci-cd.yml

name: ML CI/CD Pipeline

on:
  push:
    branches: [main]
    paths:
      - 'models/**'
      - 'features/**'
  schedule:
    - cron: '0 2 * * 0'  # Weekly retraining (Sunday 2 AM)

jobs:
  data-validation:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Validate Data Quality
        run: |
          python scripts/validate_data.py
          # Uses Great Expectations to check data quality

      - name: Check Data Drift
        run: |
          python scripts/check_drift.py
          # Compares current data to training data

  feature-engineering:
    needs: data-validation
    runs-on: ubuntu-latest
    steps:
      - name: Compute Features
        run: |
          python features/build_features.py
          # Generates features from raw data

      - name: Validate Features
        run: |
          pytest tests/test_features.py
          # Tests: no leakage, correct schema, no nulls

  model-training:
    needs: feature-engineering
    runs-on: ubuntu-latest
    steps:
      - name: Train Model
        run: |
          python models/train.py --config config/prod.yml
          # Trains model, logs to MLflow

      - name: Evaluate Model
        run: |
          python models/evaluate.py
          # Checks accuracy, precision, recall

      - name: Register Model
        if: success()
        run: |
          python scripts/register_model.py
          # Saves to MLflow Model Registry

  model-deployment:
    needs: model-training
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Staging
        run: |
          aws sagemaker create-model --model-name fraud-v\${{ github.run_number }}
          # Deploys to SageMaker staging endpoint

      - name: Run Smoke Tests
        run: |
          pytest tests/test_deployment.py
          # Tests model loads, predictions work

      - name: Deploy Canary (5%)
        run: |
          python scripts/canary_deploy.py --traffic 0.05

      - name: Monitor Canary
        run: |
          sleep 3600  # Wait 1 hour
          python scripts/check_canary_metrics.py
          # If error rate >1%, fails and triggers rollback

      - name: Full Deployment
        if: success()
        run: |
          python scripts/full_deploy.py
          # Gradually increases traffic to 100%

Real metrics from this setup:
- Deployment frequency: 2-3 per week (was monthly)
- Lead time: 3 hours (was 2 weeks)
- Failure rate: 2% (was 15%)
- Rollback time: 5 minutes (was 2 hours)
- Team happiness: Much higher 😊
</div>

                <h2>Testing ML Models (What Actually Matters)</h2>

                <h3>1. Unit Tests (Test Components)</h3>

                <div class="code-block"># tests/test_features.py
import pytest
from features import compute_user_features

def test_feature_computation():
    # Test basic computation
    user_data = {
        'transactions': [100, 200, 150],
        'timestamps': ['2024-01-01', '2024-01-02', '2024-01-03']
    }

    features = compute_user_features(user_data)

    assert features['total_amount'] == 450
    assert features['avg_amount'] == 150
    assert features['transaction_count'] == 3

def test_handles_missing_data():
    # Test edge cases
    user_data = {'transactions': [], 'timestamps': []}

    features = compute_user_features(user_data)

    assert features['total_amount'] == 0
    assert features['avg_amount'] == 0

def test_no_data_leakage():
    # Critical: Features only use past data
    user_data = {
        'transactions': [100, 200, 150],
        'timestamps': ['2024-01-01', '2024-01-02', '2024-01-05']
    }

    # Computing features as of Jan 3
    features = compute_user_features(user_data, as_of_date='2024-01-03')

    # Should only see first 2 transactions (Jan 1, Jan 2)
    assert features['transaction_count'] == 2
    assert features['total_amount'] == 300  # Not 450!
</div>

                <h3>2. Integration Tests (Test Pipelines)</h3>

                <div class="code-block"># tests/test_pipeline.py

def test_end_to_end_prediction():
    # Test full pipeline: data → features → prediction

    # 1. Load test data
    test_data = load_test_data('fixtures/sample_user.json')

    # 2. Compute features
    features = feature_pipeline.transform(test_data)

    # 3. Load model
    model = load_model('models/fraud_detector_v1.pkl')

    # 4. Make prediction
    prediction = model.predict(features)

    # 5. Validate prediction
    assert prediction in [0, 1]  # Binary classification
    assert 0 <= model.predict_proba(features)[0][1] <= 1  # Valid probability

def test_training_pipeline():
    # Test model can train successfully

    # Load small training set
    train_data = load_test_data('fixtures/train_sample.csv')

    # Train model
    model = train_model(train_data, max_epochs=5)

    # Check model learned something
    train_accuracy = evaluate(model, train_data)
    assert train_accuracy > 0.7  # Better than random (0.5)

def test_model_saves_and_loads():
    # Test serialization

    model = train_model(small_dataset)

    # Save
    save_model(model, 'tmp/test_model.pkl')

    # Load
    loaded_model = load_model('tmp/test_model.pkl')

    # Same predictions
    test_input = np.array([[1, 2, 3, 4, 5]])
    assert model.predict(test_input) == loaded_model.predict(test_input)
</div>

                <h3>3. Model Tests (Test ML Specific)</h3>

                <div class="code-block"># tests/test_model.py

def test_model_accuracy_threshold():
    # Model must beat baseline

    model = load_model('models/latest.pkl')
    test_data = load_test_data('fixtures/holdout.csv')

    accuracy = evaluate(model, test_data)

    assert accuracy > 0.90, f"Model accuracy {accuracy} below threshold 0.90"

def test_model_latency():
    # Model must be fast enough

    model = load_model('models/latest.pkl')
    test_features = np.random.rand(1, 10)

    start = time.time()
    for _ in range(100):
        model.predict(test_features)
    end = time.time()

    avg_latency_ms = (end - start) / 100 * 1000
    assert avg_latency_ms < 50, f"Latency {avg_latency_ms}ms too high"

def test_model_invariance():
    # Model should have expected behaviors

    # Example: Fraud model - higher amount = higher fraud probability
    model = load_model('models/fraud.pkl')

    low_amount = np.array([[100, 1, 0, 0, 0]])  # $100 transaction
    high_amount = np.array([[10000, 1, 0, 0, 0]])  # $10K transaction

    prob_low = model.predict_proba(low_amount)[0][1]
    prob_high = model.predict_proba(high_amount)[0][1]

    assert prob_high > prob_low, "Higher amount should have higher fraud probability"

def test_model_size():
    # Model must fit in memory

    model_path = 'models/latest.pkl'
    model_size_mb = os.path.getsize(model_path) / 1024 / 1024

    assert model_size_mb < 500, f"Model {model_size_mb}MB too large"
</div>

                <h2>War Story: Automated Retraining Gone Wrong (2022)</h2>

                <div class="code-block">The Setup:
- Built automated retraining pipeline
- Triggers: Weekly (Sunday 2 AM) OR Accuracy drops >5%
- No manual approval needed (fully automated)
- What could go wrong? 🙃

The Incident (Sunday, 3 AM):
- Scheduled retrain triggered
- Training data: Last 90 days
- Model trained: Accuracy 94% (great!)
- Auto-deployed to production (5 AM)

By Monday 9 AM:
- Customer complaints: 500+
- Fraud model flagging legitimate transactions at 10x normal rate
- $50K in blocked transactions (false positives)

Investigation:
- Training data: Included Black Friday (2 weeks ago)
- Black Friday: Unusual patterns (10x transaction volume, 5x amounts)
- Model learned: High amounts + volume = fraud
- Monday: Normal patterns, but model still suspicious
- Result: Flagged normal transactions as fraud

Root Cause:
1. Training window too short (90 days captured Black Friday outlier)
2. No seasonality adjustment
3. No validation on "normal" data (only validated on recent data)
4. Auto-deploy with NO human review

The Fix:
1. Extended training window: 90 days → 365 days (captures all seasons)
2. Added validation: Test on last week's data (expect normal performance)
3. Manual approval: Data scientist reviews before auto-deploy
4. Canary deployment: 5% traffic for 24 hours before full deploy
5. Business metric check: Block auto-deploy if any metric off >10%

Lessons:
- Automation is great BUT needs guardrails
- Always validate on multiple data distributions
- One bad training run can cause millions in damage
- Human-in-the-loop for final approval (at least at first)

New pipeline:
- Auto-trains weekly (saves time)
- Auto-validates (catches obvious issues)
- Manual approval required (data scientist reviews metrics)
- Auto-deploys if approved (saves time)

Result: Best of both worlds - automation + safety</div>

                <h2>MLOps Maturity Levels</h2>

                <table class="table">
                    <tr>
                        <th>Level</th>
                        <th>Description</th>
                        <th>Deployment</th>
                        <th>Monitoring</th>
                    </tr>
                    <tr>
                        <td><strong>Level 0</strong></td>
                        <td>Manual everything (notebooks)</td>
                        <td>Email pickle file, pray</td>
                        <td>Check logs manually</td>
                    </tr>
                    <tr>
                        <td><strong>Level 1</strong></td>
                        <td>Automated training pipeline</td>
                        <td>Python scripts, some tests</td>
                        <td>Basic dashboards</td>
                    </tr>
                    <tr>
                        <td><strong>Level 2</strong></td>
                        <td>CI/CD for training + deployment</td>
                        <td>Automated tests, canary deploys</td>
                        <td>Automated alerts</td>
                    </tr>
                    <tr>
                        <td><strong>Level 3</strong></td>
                        <td>Fully automated ML pipelines</td>
                        <td>Auto-retrain, auto-deploy</td>
                        <td>Drift detection, auto-remediation</td>
                    </tr>
                </table>

                <div class="code-block">Where companies typically are:
- Most startups: Level 0-1
- Mid-size tech companies: Level 1-2
- FAANG: Level 2-3
- Google: Built Level 3 systems years ago (TFX)

Where you should be:
- 0-2 models: Level 1 is fine (don't over-engineer)
- 3-10 models: Level 2 (automation pays off)
- 10+ models: Level 3 (can't manage manually)

Real progression at my company:
Year 1: Level 0 (3 models, all manual)
Year 2: Level 1 (10 models, automated training)
Year 3: Level 2 (25 models, CI/CD + monitoring)
Year 4: Level 2.5 (50 models, considering Level 3)

Lesson: Grow sophistication with model count
Don't build Level 3 for 1 model (overkill)
Don't stay at Level 0 with 20 models (chaos)</div>

                <h2>CI/CD Checklist for ML</h2>

                <ul>
                    <li>✅ <strong>Version control</strong> - Code, data schemas, configs in git</li>
                    <li>✅ <strong>Automated tests</strong> - Unit, integration, model tests</li>
                    <li>✅ <strong>Data validation</strong> - Schema, quality, drift checks</li>
                    <li>✅ <strong>Feature tests</strong> - No leakage, correct computation</li>
                    <li>✅ <strong>Model validation</strong> - Accuracy, latency, size thresholds</li>
                    <li>✅ <strong>Staging environment</strong> - Test before production</li>
                    <li>✅ <strong>Canary deployment</strong> - Gradual rollout (5% → 100%)</li>
                    <li>✅ <strong>Automated rollback</strong> - If metrics degrade</li>
                    <li>✅ <strong>Monitoring</strong> - Continuous model + business metrics</li>
                    <li>✅ <strong>Alerts</strong> - Page on-call for critical issues</li>
                </ul>
            `,
            interviews: [
                {
                    question: "How is CI/CD for ML different from traditional software CI/CD?",
                    answer: "Three additional dimensions: code + data + model. Traditional CI/CD: Version code, test code, deploy code. ML CI/CD: 1) Version code + data + model weights + features + hyperparameters. 2) Test code + data quality + model accuracy + inference speed + no data leakage. 3) Deploy code + model + features + infrastructure. Specific challenges: Data changes silently (no git commit), model degrades over time (traditional code doesn't), testing is statistical (not deterministic), deployment is gradual (canary needed), rollback is complex (which version of which component?). Example workflow: Data pipeline CI (validate data) → Feature pipeline CI (test features) → Training CI (train + validate accuracy) → Deployment CD (canary + monitoring). Tools differ: GitHub Actions for code, DVC for data versions, MLflow for model registry, Great Expectations for data tests. Key insight: ML CI/CD is superset of traditional CI/CD. Need all normal software practices PLUS ML-specific ones."
                },
                {
                    question: "What tests would you write for a machine learning model before deploying to production?",
                    answer: "Multi-layer testing: 1) Code tests - Unit tests (functions work correctly), integration tests (pipeline runs end-to-end), code coverage >80%. 2) Data tests - Schema validation (columns/types match expected), data quality (no nulls, values in range), distribution checks (similar to training), no data leakage (point-in-time correct). 3) Model tests - Accuracy >threshold (e.g., >90%), beats baseline (better than simple rules), latency <100ms (p99), model size <500MB, predictions in valid range. 4) Invariance tests - Expected behaviors hold. Example: Fraud model, higher amount should increase fraud probability. Age increase shouldn't drastically change prediction. 5) Integration tests - Load model successfully, serve predictions via API, features match training schema, handles missing values gracefully. Real example: Test suite has 50+ tests, takes 15 min to run. Gate: All tests must pass before deployment. Saved us: Caught data leakage in features (test failed), would've given false 99% accuracy. Tests > intuition for ML."
                },
                {
                    question: "How would you implement automated model retraining?",
                    answer: "Hybrid trigger system: 1) Scheduled - Weekly/monthly baseline (even if no issues), ensures freshness. 2) Performance-based - If accuracy <threshold (e.g., <85%), immediate retrain. 3) Drift-based - If data drift p-value <0.01, retrain within 24h. 4) Manual override - Data scientist can trigger anytime. Implementation: Airflow DAG or GitHub Actions workflow. Steps: a) Pull latest data from warehouse (last 90-365 days), b) Compute features, c) Split train/val/test, d) Train model (hyperparameters from config), e) Validate accuracy, f) If accuracy >threshold, register in MLflow, g) Deploy canary (5% traffic), h) Monitor for issues, i) If metrics good, full deploy, j) If bad, rollback. Guardrails: Human approval before production deploy (at least initially), validation on multiple data slices (not just overall accuracy), business metric checks (revenue/conversion not dropping), max frequency (don't retrain more than daily - expensive). Real config: Scheduled every Sunday 2 AM, triggered if accuracy <88% (baseline 93%), requires data scientist approval if accuracy drop >10%. Cost: $200 per retrain (AWS + engineering time), runs ~4x/month = $800/month."
                },
                {
                    question: "What would you include in a model deployment checklist?",
                    answer: "Pre-deployment: 1) Model validated (accuracy, latency, size checks pass), 2) Code reviewed (at least 1 approval), 3) Tests green (unit, integration, model tests), 4) Deployed to staging (smoke tests pass), 5) A/B tested (shadow mode 24h, no issues). Deployment: 6) Canary deploy (5% traffic), 7) Monitor canary (error rate, latency, predictions), 8) Gradual rollout (5% → 25% → 50% → 100%), 9) Each step: wait + verify metrics, 10) Rollback plan ready (previous version warm). Post-deployment: 11) Monitor dashboards (model accuracy, business metrics), 12) Log predictions (for debugging), 13) Set alerts (accuracy drop, drift detected), 14) Document (what changed, why, who approved), 15) Retrain schedule (when next retrain?). Red flags (auto-rollback): Error rate >5%, latency >2x baseline, prediction distribution drastically different, business metric drops >15%. Real example: 15-step checklist, takes 4 hours start to finish (mostly monitoring time). Caught issues: Step 7 (canary), detected 3% error rate, investigation found feature missing, rolled back, fixed, redeployed next day. Checklist saved us from bad production deploy."
                },
                {
                    question: "How do you version and track ML experiments?",
                    answer: "MLflow for experiment tracking. Log everything: hyperparameters, metrics, artifacts. Code: def train_model(params): with mlflow.start_run(): mlflow.log_params(params), mlflow.log_metric('accuracy', acc), mlflow.log_artifact('model.pkl'), mlflow.set_tag('owner', 'data_scientist_name'). What to track: 1) Hyperparameters (learning_rate, batch_size, etc.), 2) Metrics (accuracy, loss, precision, recall), 3) Artifacts (model file, training plots, feature importance), 4) Metadata (git commit, training date, who ran it, training duration), 5) Data version (which dataset used). Storage: MLflow server with PostgreSQL backend, S3 for artifacts. Comparison: MLflow UI shows all runs in table, can compare metrics side-by-side, filter/sort by performance. Real workflow: Data scientist trains 50 models (different params), MLflow tracks all 50, pick best based on validation accuracy, register best in Model Registry, deploy to prod. Without tracking: Lost in notebook chaos, can't reproduce results, don't know what worked. With tracking: Full lineage from experiment to production, can reproduce any model, understand what drove improvements. Tools: MLflow (most common), Weights & Biases, Neptune.ai. All do similar things, MLflow is open source + most adopted."
                }
            ]
        },
        {
            id: 'mlops-career',
            title: 'Building an MLOps Career: Real Talk',
            duration: '40 min',
            content: `
                <h2>The MLOps Career Landscape</h2>

                <p>MLOps is the hottest role in ML right now. Why? Because everyone trained models in school. Nobody learned how to deploy them in production.</p>

                <div class="code-block">Industry reality (2024):

ML roles breakdown:
- ML Researchers: 5% of roles (PhD required, publish papers)
- Data Scientists: 30% of roles (build models in notebooks)
- ML Engineers: 35% of roles (deploy models, some MLOps)
- MLOps Engineers: 30% of roles (production ML infrastructure)

Demand vs Supply:
- Data Scientists: 10 candidates per job (oversaturated)
- MLOps Engineers: 1 candidate per 3 jobs (huge shortage!)

Why shortage?
- New field (didn't exist 5 years ago)
- Requires both ML knowledge AND engineering skills
- Most people specialize in one or the other
- Universities don't teach MLOps (teach theory, not production)

Result: Companies desperate for MLOps engineers
        Willing to pay premium salaries
        Hard to hire (even at big tech companies)

This is YOUR opportunity!</div>

                <h2>MLOps Career Path</h2>

                <table class="table">
                    <tr>
                        <th>Level</th>
                        <th>Years</th>
                        <th>Responsibilities</th>
                        <th>Salary (US)</th>
                    </tr>
                    <tr>
                        <td><strong>Junior MLOps</strong></td>
                        <td>0-2</td>
                        <td>Deploy models, maintain pipelines, fix bugs</td>
                        <td>$90K - $130K</td>
                    </tr>
                    <tr>
                        <td><strong>MLOps Engineer</strong></td>
                        <td>2-5</td>
                        <td>Build ML platforms, design systems, mentor</td>
                        <td>$130K - $180K</td>
                    </tr>
                    <tr>
                        <td><strong>Senior MLOps</strong></td>
                        <td>5-8</td>
                        <td>Architect ML infrastructure, lead projects</td>
                        <td>$180K - $250K</td>
                    </tr>
                    <tr>
                        <td><strong>Staff/Principal</strong></td>
                        <td>8-12</td>
                        <td>Company-wide ML platform, set standards</td>
                        <td>$240K - $400K</td>
                    </tr>
                    <tr>
                        <td><strong>ML Platform Lead</strong></td>
                        <td>5+</td>
                        <td>Manage team, roadmap, cross-team impact</td>
                        <td>$200K - $350K</td>
                    </tr>
                </table>

                <p><em>FAANG pays 30-50% more. Startups pay less cash, more equity.</em></p>

                <h2>Skills That Actually Matter</h2>

                <h3>Must-Have (Can't Get Job Without)</h3>
                <ul>
                    <li><strong>Python</strong> - 95% of ML uses Python</li>
                    <li><strong>Docker + Kubernetes</strong> - All ML runs in containers</li>
                    <li><strong>Cloud (AWS/GCP/Azure)</strong> - Pick one, learn deeply</li>
                    <li><strong>Git + CI/CD</strong> - GitHub Actions, GitLab CI</li>
                    <li><strong>ML Basics</strong> - Don't need PhD, but know concepts</li>
                    <li><strong>REST APIs</strong> - Flask/FastAPI for serving</li>
                </ul>

                <h3>Should-Have (Makes You Competitive)</h3>
                <ul>
                    <li><strong>Feature Stores</strong> - Feast, Tecton, or build custom</li>
                    <li><strong>Model Serving</strong> - TorchServe, TensorFlow Serving, Triton</li>
                    <li><strong>Monitoring</strong> - Prometheus, Grafana, DataDog</li>
                    <li><strong>Workflow Orchestration</strong> - Airflow, Kubeflow, Metaflow</li>
                    <li><strong>ML Frameworks</strong> - PyTorch or TensorFlow (basics)</li>
                </ul>

                <h3>Nice-to-Have (Learn on the Job)</h3>
                <ul>
                    <li><strong>Terraform</strong> - Infrastructure as code</li>
                    <li><strong>Spark</strong> - Big data processing</li>
                    <li><strong>Kafka</strong> - Real-time streaming</li>
                    <li><strong>Model Optimization</strong> - Quantization, ONNX</li>
                </ul>

                <h2>How to Break Into MLOps</h2>

                <h3>Path 1: From Software Engineering (Fastest)</h3>

                <div class="code-block">You have: Engineering skills (Docker, K8s, CI/CD)
You need: ML understanding

Timeline: 3-6 months

Step 1: Learn ML basics
- Andrew Ng's Coursera (ML fundamentals)
- Don't need to master math, just concepts
- Understand: What is a model? Training vs inference?

Step 2: Build ML project
- Pick simple problem (house prices, spam detection)
- Train model (scikit-learn is fine)
- Focus on deployment NOT model accuracy
- Deploy model as API (FastAPI + Docker)
- Add monitoring (Prometheus)
- Put on GitHub with great README

Step 3: Learn ML tools
- MLflow (experiment tracking)
- SageMaker OR Vertex AI (pick your cloud)
- Feature store (Feast - open source)

Step 4: Apply for "ML Platform Engineer" roles
- Highlight: Strong software engineering skills
- Project shows: Can deploy ML in production
- Companies value: Engineering skills > ML PhD

Real example (my colleague, 2022):
- Background: 5 years backend engineering (Java/Python)
- Learned: ML basics in 2 months (evenings)
- Built: Movie recommendation system (deployed on AWS)
- Got: MLOps role at Series B startup ($150K)
- Advantage: Engineering skills are rare in ML orgs</div>

                <h3>Path 2: From Data Science (Most Common)</h3>

                <div class="code-block">You have: ML/statistics knowledge
You need: Software engineering + infrastructure

Timeline: 6-12 months

Step 1: Level up software engineering
- Learn Docker (containerize your models)
- Learn Git properly (branching, PRs, reviews)
- Write production-quality Python (tests, logging, error handling)
- Study: Clean Code, Design Patterns

Step 2: Learn DevOps basics
- Kubernetes fundamentals
- CI/CD (GitHub Actions)
- Cloud basics (AWS/GCP)
- Monitoring (Prometheus, Grafana)

Step 3: Productionize your models
- Take notebook models, turn into APIs
- Add proper error handling, validation
- Write tests (unit, integration)
- Deploy to cloud (not just localhost)
- Add monitoring and alerting

Step 4: Transition internally or new job
- Internal: "I can deploy our models to production"
- New job: Show deployed projects on GitHub
- Target: "ML Engineer" (then specialize in MLOps)

Real example (my journey):
- Background: Data scientist (3 years)
- Frustrated: Models stuck in notebooks
- Learned: Docker, K8s, AWS (6 months, weekends)
- Built: End-to-end ML platform at current company
- Transitioned: Data Scientist → ML Engineer → MLOps Lead
- Salary: $120K → $160K → $220K over 4 years</div>

                <h2>Interview Preparation</h2>

                <h3>What MLOps Interviews Actually Test</h3>

                <table class="table">
                    <tr>
                        <th>Round</th>
                        <th>What They Test</th>
                        <th>How to Prepare</th>
                    </tr>
                    <tr>
                        <td><strong>System Design</strong></td>
                        <td>Design ML serving system, feature store</td>
                        <td>Practice: "Design fraud detection", "Design recommendations"</td>
                    </tr>
                    <tr>
                        <td><strong>Coding</strong></td>
                        <td>Python, API design, Docker</td>
                        <td>LeetCode Easy/Medium, build APIs</td>
                    </tr>
                    <tr>
                        <td><strong>ML Concepts</strong></td>
                        <td>Drift, monitoring, deployment strategies</td>
                        <td>This course! Real-world scenarios</td>
                    </tr>
                    <tr>
                        <td><strong>Behavioral</strong></td>
                        <td>Past projects, debugging, collaboration</td>
                        <td>STAR method, prepare war stories</td>
                    </tr>
                </table>

                <h3>Common MLOps Interview Questions</h3>

                <div class="code-block">System Design (most important):
1. "Design a model serving system that handles 10K req/sec"
2. "How would you build a feature store from scratch?"
3. "Design real-time fraud detection end-to-end"
4. "How do you handle model versioning across 100 models?"

ML Concepts:
1. "What's data drift and how do you detect it?"
2. "How would you monitor model accuracy in production?"
3. "Explain canary deployment for ML models"
4. "What's the difference between batch and online serving?"

Coding:
1. "Build API endpoint to serve model predictions" (FastAPI)
2. "Write function to validate input features"
3. "Implement retry logic for feature store failures"

Behavioral:
1. "Tell me about a time model broke in production"
2. "How do you prioritize when 3 models need deployment?"
3. "Describe debugging a production ML issue"

Pro tip: They care more about production experience than ML PhD
         Show: Models you've deployed, issues you've debugged</div>

                <h2>Building Your MLOps Portfolio</h2>

                <div class="code-block">Must-have projects (GitHub):

Project 1: End-to-End ML Pipeline (MOST IMPORTANT)
- Problem: Any ML problem (fraud, churn, recommendations)
- Show:
  * Data pipeline (ingestion, cleaning, validation)
  * Feature engineering (with tests)
  * Model training (logged to MLflow)
  * Model serving (FastAPI + Docker)
  * Monitoring (Prometheus metrics)
  * CI/CD (GitHub Actions)
  * Deployment (AWS/GCP)
- README: Architecture diagram, how to run, decisions made
- Time: 2-4 weeks
- Impact: THIS gets you interviews

Project 2: Feature Store (Mini Version)
- Build simple feature store
- Offline store (S3/local files)
- Online store (Redis)
- Feature registry (Python definitions)
- Shows: You understand core MLOps infrastructure

Project 3: Model Monitoring Dashboard
- Track: Model accuracy over time
- Detect: Data drift
- Alert: When metrics degrade
- Tools: Streamlit + Evidently AI
- Shows: You understand production ML challenges

Real hiring manager perspective:
"I see 100 CVs with ML courses, Kaggle competitions
 I see 5 CVs with production ML projects on GitHub
 I interview those 5, hire the best one"

Your GitHub > Your degree</div>

                <h2>MLOps Job Market Reality</h2>

                <div class="code-block">Where the jobs are (2024):

By company type:
- Tech companies: 40% of MLOps roles (Google, Meta, Uber)
- Fintech: 25% (fraud, risk, trading)
- E-commerce: 15% (recommendations, search)
- Healthcare/Biotech: 10%
- Everyone else: 10%

By location (US):
- San Francisco Bay Area: 35% of jobs
- New York: 15%
- Seattle: 12%
- Austin: 8%
- Remote: 30% (growing!)

Salary ranges:
- Startups: $90K-$150K + equity (risky but high upside)
- Mid-size: $120K-$200K (balanced)
- Big Tech: $180K-$350K (FAANG pays most)
- Finance: $150K-$300K (banks pay well)

Remote work:
- 70% of MLOps jobs allow remote/hybrid
- Fully remote: 30% of positions
- This is higher than most engineering roles
- Reason: MLOps is new, companies flexible to get talent

Job titles to search:
- "MLOps Engineer"
- "ML Platform Engineer"
- "ML Infrastructure Engineer"
- "Machine Learning Engineer" (some are MLOps-focused)
- "AI Engineer" (sometimes means MLOps)</div>

                <h2>Final Advice from Someone Who's Hired MLOps Engineers</h2>

                <ul>
                    <li><strong>Focus on production skills:</strong> Companies have enough people who can train models. They need people who can deploy and maintain them.</li>
                    <li><strong>Build real projects:</strong> One deployed ML system > Ten Kaggle notebooks. Show you can ship, not just experiment.</li>
                    <li><strong>Learn by doing:</strong> Read about Docker < Build something with Docker. Concepts stick when you've debugged at 2 AM.</li>
                    <li><strong>Start simple:</strong> Don't build Uber's ML platform on day 1. Deploy one model end-to-end. Then scale complexity.</li>
                    <li><strong>Join communities:</strong> MLOps Slack, Reddit r/mlops, Twitter #MLOps. Network, learn, find jobs.</li>
                    <li><strong>Write about what you learn:</strong> Blog posts = proof you understand + helps others + SEO for your name.</li>
                    <li><strong>Contribute to open source:</strong> Fix bug in MLflow, add feature to Feast. Shows you can work on production codebases.</li>
                    <li><strong>Be patient with first job:</strong> Hardest to get. After 1-2 years experience, recruiters will hunt you down.</li>
                    <li><strong>Choose learning over salary early:</strong> First job: Pick company where you'll learn most (even if pays less). Skills compound.</li>
                    <li><strong>Embrace the chaos:</strong> MLOps is messy. Models break. Data drifts. Pipelines fail at 3 AM. This is normal. You'll be fine.</li>
                </ul>

                <p><strong>The opportunity:</strong> MLOps is where DevOps was 10 years ago. High demand, short supply, companies willing to train. Get in now while it's still early. In 5 years, there will be MLOps bootcamps and oversaturation. But today? You have a window. Use it.</p>

                <p>Good luck! 🚀</p>
            `,
            interviews: [
                {
                    question: "What's the difference between ML Engineer and MLOps Engineer roles?",
                    answer: "ML Engineer: Broader role, spans model development + deployment. Responsibilities: 50% building models (feature engineering, training, tuning), 50% deploying models (APIs, infrastructure). Usually reports to Data Science or Engineering. Works closely with data scientists. Example: Builds recommendation model AND deploys it. MLOps Engineer: Focused on production ML infrastructure. Responsibilities: 90% platform/infrastructure, 10% model understanding. Builds: Feature stores, model registries, deployment pipelines, monitoring systems. Reports to Platform/Infrastructure team. Enables other ML engineers and data scientists. Example: Builds company-wide ML platform used by 50 data scientists. In practice: Small companies: One role (ML Engineer) does both. Large companies: Separate roles. ML Engineer builds models, MLOps provides platform. Career: Many start as ML Engineer, specialize into MLOps. Salary: Similar at same level. MLOps slightly higher at big tech (scarce skill). Which to choose: Like building? MLOps. Like modeling? ML Engineer. Both need software engineering, MLOps less focused on ML theory."
                },
                {
                    question: "How important is a Computer Science degree for MLOps roles?",
                    answer: "Less important than demonstrated skills. Reality: 60% of MLOps engineers don't have CS degrees. Backgrounds I've seen: Physics PhD (strong Python), Math major (good logic), Self-taught (best engineers!), Bootcamp grad (if good engineering fundamentals), Mechanical Engineering (surprisingly good systems thinking). What matters MORE than degree: 1) Can you code? (Python, Docker, K8s), 2) GitHub portfolio (deployed ML projects), 3) Production experience (even side projects), 4) Problem-solving (debug complex systems), 5) Communication (explain technical decisions). Degree helps: Gets past HR filters (some companies require degree), provides fundamentals (algorithms, systems), network (classmates, alumni). Degree doesn't help: Doesn't teach production ML (universities focus on theory), outdated content (ML tooling changes fast). How to compete without degree: Strong GitHub (3-4 production-quality projects), Certifications (AWS/GCP ML specialty), Blog posts (prove you understand concepts), Contributions (open source MLflow, Feast), Networking (go to meetups, conferences). Real hiring: I've hired 15 MLOps engineers, 7 without CS degrees. Best engineer? Self-taught, built entire ML platform. Worst engineer? PhD in ML (couldn't code production systems). Skills > Credentials in MLOps."
                },
                {
                    question: "What are the biggest mistakes junior MLOps engineers make?",
                    answer: "Top 5 mistakes I've seen: 1) Over-engineering early - Building Uber-scale infrastructure for 2 models. Start simple, add complexity when needed. Junior mistake: Spent 3 months building feature store before deploying first model. Should've: Deployed model in 1 week, built feature store when had 10 models. 2) Ignoring monitoring - Deploying model, assuming it works forever. Reality: Models degrade silently. Junior mistake: No monitoring, model accuracy dropped 92%→68% over 6 months, nobody noticed until users complained. Should've: Add basic monitoring from day 1 (accuracy, latency, drift). 3) Not asking why - Implementing solutions without understanding problem. Example: 'Build feature store' → Junior builds complex system → Turns out, simple S3 + Spark would've worked. Should've: Ask 'What problem are we solving? Is this the simplest solution?' 4) Focusing on tools not problems - Learning every new framework, not solving business problems. Junior: Spent month learning Kubeflow, company didn't need it. Should've: Learn tools as needed to solve real problems. 5) Not testing in production - Everything works in dev, breaks in prod. Junior: Deployed model, worked on laptop, crashed on server (different Python version). Should've: Test in production-like environment, deploy canary. How to avoid: Ask questions, start simple, deploy early and often, monitor everything, focus on business impact."
                },
                {
                    question: "How do salaries compare across different MLOps roles and companies?",
                    answer: "Detailed breakdown (US, 2024): FAANG (Google, Meta, etc) - Junior (0-2yr): $180K-$230K total comp (base $140K + stock), Mid (2-5yr): $250K-$350K, Senior (5-8yr): $350K-$500K, Staff+: $500K-$800K. Unicorn Startups (Databricks, Scale AI) - Similar to FAANG, more equity risk. Tech Companies (Uber, Airbnb, etc) - 80-90% of FAANG, Junior: $150K-$200K, Senior: $280K-$400K. Mid-size Tech - Junior: $120K-$160K, Mid: $160K-$220K, Senior: $220K-$300K. Fintech/Banks - Junior: $130K-$180K, Senior: $250K-$350K (banks pay well). Startups (<100 people) - Base lower, more equity. Junior: $90K-$130K + 0.1-0.5% equity, Risk: Equity might be worthless OR worth millions. Geographic differences: SF Bay Area: Highest (baseline above), New York: 90% of SF, Seattle: 80% of SF, Austin/Denver: 70% of SF, Remote: 60-80% of SF (depends on company). Equity: FAANG: Refreshers every year (grows total comp), Startups: One-time grant (hope for IPO/acquisition). Negotiation leverage: Multiple offers (can get 20-30% bump), Specialized skill (Kubernetes expert, GPU optimization), Proven track record (launched major ML platform). Real progression: Entry MLOps (startup): $110K, +2 years (mid-size): $160K, +3 years (FAANG): $300K, +5 years (FAANG Staff): $500K+. Fastest growth path: 2 years startup (learn fast), switch to FAANG (high comp)."
                },
                {
                    question: "What should you look for when choosing between MLOps job offers?",
                    answer: "Decision framework beyond just salary: 1) Learning opportunity (most important early career) - How many models in production? (more models = more learning), Mentor available? (critical for first role), Tech stack modern? (Kubernetes, cloud-native OR legacy?), Will you build from scratch OR maintain? (building = more learning), Team size? (small = more ownership, large = more learning from others). 2) Company stage - Early startup (<50): Chaos, wear many hats, equity lottery, long hours. Growth startup (50-500): Structured but still fast-paced, equity worth something, work-life balance varies. Late startup (500+): Almost big tech, good comp, slower pace. Public company: Stable, good benefits, bureaucracy, lower equity upside. Which is best: Early career (<3yr) → Growth startup (balanced learning + comp), Mid career (3-7yr) → Big tech (maximize comp + learn at scale), Late career (7+yr) → Wherever you want (you have leverage). 3) Work-life balance - Startup: 50-60 hour weeks common, Big tech: 40-45 hours (better boundaries), Remote: Flexibility but need discipline. 4) Impact - Will your work matter? (building ML platform for 50 scientists = high impact), Or maintaining one model? (less exciting). My decision framework: First job: Maximize learning (even if lower pay), accept chaos, find mentor. Second job (2-3yr): Maximize comp (switch to FAANG), learn at scale. Third+ job: Optimize for happiness (work-life balance, impact, mission). Red flags: No production ML yet (you'll be guinea pig), team burned out (high turnover), legacy tech stack (learning outdated skills), no budget for tools (struggle to succeed)."
                }
            ]
        }
    ]
};
