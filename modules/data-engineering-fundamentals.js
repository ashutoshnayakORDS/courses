// Data Engineering Fundamentals Course
// Built from years of experience at scale - teaching the craft properly

const dataEngineeringFundamentals = {
    title: 'Data Engineering Fundamentals',
    lessons: [
        {
            id: 'what-is-data-engineering',
            title: 'What is Data Engineering? The Real Picture',
            duration: '45 min',
            content: \`
                <h2>What Does a Data Engineer Actually Do?</h2>
                <p>Let me tell you what I wish someone had told me on day one: <strong>Data engineering is plumbing</strong>. Not glamorous, but absolutely critical. Without good plumbing, everything else fails.</p>

                <p>Your job as a data engineer is to make sure data flows reliably from where it's created to where it's needed. That's it. But like all simple things, the devil is in the details.</p>

                <h3>The Reality Check</h3>
                <p>Here's what you'll actually spend your time doing:</p>
                <ul>
                    <li><strong>80% of your time:</strong> Debugging why data pipelines broke, dealing with schema changes, handling edge cases</li>
                    <li><strong>15% of your time:</strong> Building new data pipelines and infrastructure</li>
                    <li><strong>5% of your time:</strong> The cool stuff (optimizing queries, designing architectures)</li>
                </ul>

                <h2>A Day in the Life - Real Example</h2>

                <div class="code-block">Monday, 9 AM - You walk in
Data scientist: "The user engagement dashboard is broken"
You: *checks logs*
Problem: Someone changed 'user_id' to 'userId' in the API response
Impact: 47 downstream reports showing zeros
Fix time: 2 hours (finding it: 30 min, fixing: 10 min, testing: 1hr 20min)

Tuesday, 11 AM - Product manager calls
PM: "Can we add revenue data to the customer dashboard?"
You: "Sure, it's in the transactions table"
PM: "Great, need it by tomorrow"
Reality: Revenue data is split across 3 systems, in different timezones,
with inconsistent currency formats. Takes you 2 days.

Wednesday - SUCCESS!
Your pipeline that processes 10M events/day has been running for 6 months
without a single failure. Nobody notices. This is the job.</div>

                <h2>The Three Pillars of Data Engineering</h2>

                <h3>1. Data Ingestion - Getting Data In</h3>
                <p>This is where data enters your system. Could be from:</p>
                <ul>
                    <li><strong>Application databases</strong> - MySQL, PostgreSQL (users, orders, products)</li>
                    <li><strong>APIs</strong> - Third-party services (Stripe payments, Salesforce CRM)</li>
                    <li><strong>Streams</strong> - Real-time events (user clicks, sensor data, logs)</li>
                    <li><strong>Files</strong> - CSV uploads, S3 dumps, Excel sheets (yes, really)</li>
                </ul>

                <p><strong>Real example from e-commerce company I worked at:</strong></p>
                <div class="code-block">Problem: Need to analyze customer orders
Data sources:
- Orders table (MySQL) - transactional data
- Payment events (Stripe webhook) - payment status
- Inventory system (separate PostgreSQL) - stock levels
- Shipping API (FedEx) - delivery status
- Customer service (Zendesk API) - support tickets

Result: One "simple" order analysis requires data from 5 systems.
Each with different formats, update frequencies, and failure modes.</div>

                <h3>2. Data Transformation - Making Data Useful</h3>
                <p>Raw data is messy. Your job is to clean and structure it.</p>

                <div class="code-block">Raw data from API:
{
  "usr": "john_doe",
  "ts": 1704067199000,
  "evt": "purchase",
  "amt": "$49.99",
  "cur": "USD"
}

What you need to fix:
❌ "usr" should be "user_id" (inconsistent naming)
❌ Timestamp is Unix milliseconds (need readable date)
❌ Amount has dollar sign (need numeric)
❌ Currency is string (need standardization)

After transformation:
{
  "user_id": "john_doe",
  "event_date": "2024-01-01 00:00:00",
  "event_type": "purchase",
  "amount_usd": 49.99,
  "currency_code": "USD"
}</div>

                <h3>3. Data Storage - Keeping Data Accessible</h3>
                <p>Where you put data matters. A lot.</p>

                <table class="table">
                    <tr>
                        <th>Storage Type</th>
                        <th>Use Case</th>
                        <th>Example</th>
                    </tr>
                    <tr>
                        <td><strong>OLTP Database</strong><br>(PostgreSQL, MySQL)</td>
                        <td>Live application data, fast writes</td>
                        <td>User profiles, current orders</td>
                    </tr>
                    <tr>
                        <td><strong>Data Warehouse</strong><br>(Snowflake, BigQuery)</td>
                        <td>Analytics, complex queries, historical data</td>
                        <td>Sales reports, user behavior analysis</td>
                    </tr>
                    <tr>
                        <td><strong>Data Lake</strong><br>(S3, Azure Data Lake)</td>
                        <td>Raw data storage, cheap, flexible</td>
                        <td>Log files, backups, unstructured data</td>
                    </tr>
                    <tr>
                        <td><strong>Cache</strong><br>(Redis, Memcached)</td>
                        <td>Fast reads, temporary data</td>
                        <td>Session data, API responses</td>
                    </tr>
                </table>

                <h2>Real-World Case Study: Netflix's Data Pipeline</h2>

                <h3>The Problem</h3>
                <p>Netflix has 250 million users watching shows. They need to know:</p>
                <ul>
                    <li>What show is trending (real-time)</li>
                    <li>What to recommend next (personalized)</li>
                    <li>When to allocate server capacity (predictive)</li>
                    <li>How to improve content (analytics)</li>
                </ul>

                <h3>The Data Scale</h3>
                <div class="code-block">Events per day: ~500 BILLION
- Every play/pause: logged
- Every search: logged
- Every recommendation shown: logged
- Every thumbnail loaded: logged

Data generated: ~1 petabyte per day
That's 1,000,000 GB EVERY DAY</div>

                <h3>The Solution (Simplified)</h3>
                <div class="code-block">1. Ingestion (Real-time)
   User clicks play → Event sent to Kafka

2. Processing (Stream + Batch)
   Stream: Update "now trending" (Apache Flink)
   Batch: Daily aggregations for reports (Apache Spark)

3. Storage
   Hot data (recent): ElasticSearch (fast queries)
   Warm data (monthly): S3 + Presto (analytics)
   Cold data (archive): Glacier (compliance)

4. Serving
   Dashboards: Tableau reading from Snowflake
   ML models: SageMaker reading from S3
   Real-time APIs: Reading from Redis cache</div>

                <h3>Key Lessons from Netflix</h3>
                <ol>
                    <li><strong>Start simple</strong> - They didn't build this overnight. Started with MySQL and batch jobs.</li>
                    <li><strong>Separate hot/warm/cold data</strong> - Don't query petabytes when you need last hour's data</li>
                    <li><strong>Stream AND batch</strong> - Real-time for alerts, batch for deep analysis</li>
                    <li><strong>Schema evolution</strong> - Old events still work when you add new fields</li>
                </ol>

                <h2>The Tools You'll Actually Use</h2>

                <h3>Essential Tools (Learn These First)</h3>
                <ul>
                    <li><strong>SQL</strong> - 70% of your job. Master it. Window functions, CTEs, query optimization.</li>
                    <li><strong>Python</strong> - Scripting, data manipulation, automation. Pandas, requests, boto3.</li>
                    <li><strong>Git</strong> - Version control for code AND config. Non-negotiable.</li>
                    <li><strong>Docker</strong> - Containerization. Everything runs in containers now.</li>
                </ul>

                <h3>Data Tools (Learn As Needed)</h3>
                <ul>
                    <li><strong>Airflow</strong> - Workflow orchestration. Schedule and monitor pipelines.</li>
                    <li><strong>dbt</strong> - Transform data in warehouse. SQL-based, version controlled.</li>
                    <li><strong>Kafka</strong> - Event streaming. Real-time data pipelines.</li>
                    <li><strong>Spark</strong> - Big data processing. When Pandas isn't enough.</li>
                </ul>

                <h2>The Hard Truths Nobody Tells You</h2>

                <h3>1. Data is ALWAYS Messy</h3>
                <p>You'll spend more time cleaning data than analyzing it. Get comfortable with it.</p>

                <div class="code-block">Common issues you'll face EVERY WEEK:
- Null values where there shouldn't be any
- Duplicate records (same order ID appearing twice)
- Timezone confusion (Is this UTC? PST? User's local time?)
- Schema drift (Someone added a field without telling you)
- Data quality issues (Negative quantities, future dates, impossible values)</div>

                <h3>2. Pipelines WILL Break</h3>
                <p>Not "might break". WILL break. Plan for it.</p>

                <div class="code-block">Why pipelines break:
- Source system went down (happens weekly)
- API rate limits hit (didn't know they existed)
- Disk full (data grew faster than expected)
- Memory error (edge case you never tested)
- Network timeout (cloud provider issue)
- Schema change (upstream team didn't notify you)</div>

                <h3>3. You're Building for People Who Don't Understand Data</h3>
                <p>Your stakeholders will ask impossible questions:</p>
                <ul>
                    <li>"Can we see real-time revenue?" (Yes, with 5-minute delay minimum)</li>
                    <li>"Why don't these numbers match?" (Different definitions, time zones, rounding)</li>
                    <li>"Can we add this field?" (Sure, but it'll take 2 weeks to backfill)</li>
                </ul>

                <h2>Your First Month Goals</h2>

                <h3>Week 1: Understand the Data Landscape</h3>
                <ul>
                    <li>Map all data sources (databases, APIs, files)</li>
                    <li>Identify key stakeholders (who needs what data)</li>
                    <li>Learn existing pipelines (even if poorly documented)</li>
                </ul>

                <h3>Week 2-3: Build Something Small</h3>
                <p>Don't try to build the perfect system. Build something that works:</p>
                <div class="code-block">Example first project:
"Daily report of new user signups"

Simple pipeline:
1. Query users table for yesterday's signups
2. Send count to Slack channel
3. Schedule with cron job

Then improve:
- Add error handling
- Send alert if count drops >20%
- Store history for trending
- Add breakdown by source (organic vs paid)</div>

                <h3>Week 4: Learn from Failures</h3>
                <p>Your pipeline will break. When it does:</p>
                <ol>
                    <li>Don't panic - this is normal</li>
                    <li>Check the logs - 90% of issues are obvious in logs</li>
                    <li>Fix it quickly - data SLAs matter</li>
                    <li>Document the fix - you'll see this again</li>
                    <li>Add monitoring - prevent next time</li>
                </ol>

                <h2>Summary: The Mindset</h2>
                <p>Data engineering isn't about the coolest tech or fanciest algorithms. It's about:</p>
                <ul>
                    <li><strong>Reliability</strong> - Data must flow, every day, on time</li>
                    <li><strong>Scalability</strong> - What works for 1M rows must work for 1B rows</li>
                    <li><strong>Maintainability</strong> - Code you write today will run for years</li>
                    <li><strong>Pragmatism</strong> - Perfect is the enemy of done</li>
                </ul>

                <p>Remember: <strong>Good data engineering is invisible</strong>. When pipelines run smoothly, nobody notices. That's success.</p>

                <p>Now let's learn how to build reliable, scalable data systems. Starting with the basics: how data actually moves.</p>
            \`,
            interviews: [
                {
                    question: "What's the difference between a Data Engineer and a Data Scientist?",
                    answer: "Data Engineers build and maintain the infrastructure (pipelines, databases, ETL). Data Scientists analyze data and build models. Think of it this way: DE builds the kitchen and keeps ingredients fresh, DS cooks the meals. You can't cook without a kitchen, and a kitchen is useless without a chef. Both are critical, different skills."
                },
                {
                    question: "Why can't we just query the production database directly for analytics?",
                    answer: "Multiple reasons: 1) Performance - complex analytical queries slow down your app, 2) Schema mismatch - production optimized for writes (OLTP), analytics needs read optimization (OLAP), 3) Data combination - analytics needs data from multiple sources, not just one DB, 4) Historical data - production DB only keeps recent data, analytics needs years of history, 5) Safety - analysts can't accidentally break production."
                },
                {
                    question: "What makes a good data pipeline?",
                    answer: "Five key qualities: 1) Idempotent - running twice gives same result (handle duplicates), 2) Monitored - you know when it breaks, 3) Recoverable - can replay/backfill if needed, 4) Documented - next engineer understands it, 5) Tested - validates data quality. Bonus: incremental processing (don't reprocess everything daily)."
                },
                {
                    question: "How do you handle schema changes in production?",
                    answer: "Use versioned schemas and backward compatibility. When adding fields: make them optional/nullable initially, update pipelines to handle both old and new schemas, migrate data gradually, never drop fields immediately (deprecate first for 6+ months). Use tools like Avro/Protobuf for schema evolution. Always have rollback plan."
                },
                {
                    question: "What's the difference between ETL and ELT?",
                    answer: "ETL = Extract, Transform, Load (transform BEFORE loading). Traditional, used when compute was expensive. ELT = Extract, Load, Transform (load raw, transform IN warehouse). Modern approach with cloud warehouses (Snowflake/BigQuery) that can handle heavy transforms. ELT is better because: raw data preserved, transforms are reversible, warehouse handles scale, easier to debug."
                }
            ],
        },
        {
            id: 'data-pipelines-etl',
            title: 'Building Bulletproof Data Pipelines',
            duration: '60 min',
            content: \`
                <h2>What is a Data Pipeline?</h2>
                <p>A data pipeline is code that moves data from point A to point B, transforming it along the way. Sounds simple, right? Wrong. This is where 90% of your headaches will come from.</p>

                <p>Think of it like a factory assembly line for data:</p>
                <ul>
                    <li><strong>Input</strong>: Raw materials (source data)</li>
                    <li><strong>Processing</strong>: Assembly steps (transformations)</li>
                    <li><strong>Output</strong>: Finished product (clean, usable data)</li>
                    <li><strong>Quality Control</strong>: Testing at each step</li>
                </ul>

                <h2>The Anatomy of a Production Pipeline</h2>

                <p>Let me show you a REAL pipeline I built at an e-commerce company:</p>

                <div class="code-block">Business Need: "Daily sales report by 9 AM"

Source Data:
- Orders from PostgreSQL (transactional DB)
- Payment status from Stripe API
- Product catalog from MongoDB
- Shipping data from FedEx API

Pipeline Steps:
1. Extract (6 AM - 7 AM)
   - Query yesterday's orders from PostgreSQL
   - Fetch payment confirmations from Stripe
   - Get product details from MongoDB
   - Pull shipping status from FedEx

2. Transform (7 AM - 8 AM)
   - Join orders with payments (handle partial refunds)
   - Enrich with product names and categories
   - Calculate revenue (gross, net, fees)
   - Add shipping status
   - Handle timezone conversions (stores in different regions)

3. Load (8 AM - 8:30 AM)
   - Insert into Snowflake data warehouse
   - Update materialized views
   - Send summary to Slack
   - Trigger dashboard refresh

4. Validate (8:30 AM - 9 AM)
   - Check row counts match
   - Verify revenue totals (compare with Stripe dashboard)
   - Alert if anomalies detected</div>

                <h3>What Actually Went Wrong (First Month)</h3>

                <div class="code-block">Week 1: Pipeline ran fine
Week 2: Failed at 6:30 AM
Reason: PostgreSQL backup ran at same time, table locked
Fix: Changed schedule to 6:15 AM

Week 3: Data looked weird
Reason: Stripe API added new payment type (Buy Now Pay Later)
Fix: Updated code to handle new payment_type field

Week 4: Pipeline succeeded but numbers wrong
Reason: FedEx API sometimes returns cached data
Fix: Added validation to check if shipping data is fresh

This is NORMAL. Expect to fix something every week for first 2 months.</div>

                <h2>ETL vs ELT: The Great Debate</h2>

                <h3>ETL (Extract, Transform, Load) - The Old Way</h3>

                <div class="code-block">Flow: Source → Transform (on ETL server) → Warehouse

Example:
1. Extract 10M rows from MySQL
2. Clean data on ETL server (Python/Spark)
   - Remove duplicates
   - Fix data types
   - Calculate aggregations
3. Load 8M clean rows into warehouse

Pros:
✓ Cleaner data in warehouse
✓ Less warehouse compute costs
✓ Good when warehouse is expensive/slow

Cons:
✗ Can't reprocess without re-extracting
✗ ETL server needs lots of resources
✗ Harder to debug (transforms happen in black box)</div>

                <h3>ELT (Extract, Load, Transform) - The Modern Way</h3>

                <div class="code-block">Flow: Source → Warehouse → Transform (in warehouse)

Example:
1. Extract 10M rows from MySQL
2. Load ALL 10M rows into warehouse (raw)
3. Transform using SQL/dbt IN the warehouse
   - Create clean tables
   - Build aggregations
   - Generate reports

Pros:
✓ Raw data preserved (can reprocess anytime)
✓ Warehouse handles scaling
✓ Easy to debug (all SQL is version controlled)
✓ Fast iteration (no deploy needed for SQL changes)

Cons:
✗ More warehouse storage needed
✗ Requires good warehouse (Snowflake/BigQuery)
✗ Can't transform data warehouse can't handle</div>

                <h3>When to Use What?</h3>

                <table class="table">
                    <tr>
                        <th>Scenario</th>
                        <th>Use This</th>
                        <th>Why</th>
                    </tr>
                    <tr>
                        <td>Modern cloud warehouse (Snowflake, BigQuery)</td>
                        <td><strong>ELT</strong></td>
                        <td>Warehouse can handle it, keep raw data</td>
                    </tr>
                    <tr>
                        <td>Complex transformations (ML, image processing)</td>
                        <td><strong>ETL</strong></td>
                        <td>Can't do this in SQL</td>
                    </tr>
                    <tr>
                        <td>Data privacy/compliance (PII scrubbing)</td>
                        <td><strong>ETL</strong></td>
                        <td>Never store sensitive data raw</td>
                    </tr>
                    <tr>
                        <td>High data volume, expensive warehouse</td>
                        <td><strong>ETL</strong></td>
                        <td>Pre-filter/aggregate to save costs</td>
                    </tr>
                    <tr>
                        <td>Need fast iteration, many analysts</td>
                        <td><strong>ELT</strong></td>
                        <td>SQL is easier to change than Python</td>
                    </tr>
                </table>

                <h2>Idempotency: The Most Important Concept</h2>

                <p><strong>Idempotent</strong> means: Running the pipeline twice gives the same result. This is CRITICAL.</p>

                <h3>Why It Matters</h3>

                <div class="code-block">Scenario: Pipeline fails at step 3 (out of 5)

Without Idempotency:
- Rerun pipeline
- Steps 1-2 run again (duplicate data!)
- Step 3 succeeds
- Steps 4-5 complete
Result: ❌ Duplicate records in warehouse

With Idempotency:
- Rerun pipeline
- Steps 1-2 detect already processed, skip
- Step 3 succeeds
- Steps 4-5 complete
Result: ✓ Correct data, no duplicates</div>

                <h3>How to Make Pipelines Idempotent</h3>

                <div class="code-block">❌ BAD: Append only
INSERT INTO sales_daily
SELECT * FROM orders WHERE date = '2024-01-01';

Problem: If you run twice, you get duplicate rows

✓ GOOD: Delete and insert
DELETE FROM sales_daily WHERE date = '2024-01-01';
INSERT INTO sales_daily
SELECT * FROM orders WHERE date = '2024-01-01';

Result: Running multiple times = same result

✓ BETTER: Upsert (merge)
MERGE INTO sales_daily AS target
USING (SELECT * FROM orders WHERE date = '2024-01-01') AS source
ON target.order_id = source.order_id
WHEN MATCHED THEN UPDATE SET ...
WHEN NOT MATCHED THEN INSERT ...;

Result: Handles updates AND inserts correctly</div>

                <h2>Real-World Case Study: Airbnb's Airflow</h2>

                <h3>The Problem</h3>
                <p>Airbnb has thousands of data pipelines:</p>
                <ul>
                    <li>Pricing calculations (update every hour)</li>
                    <li>Search ranking (refresh every 15 minutes)</li>
                    <li>Host payouts (daily)</li>
                    <li>Fraud detection (real-time)</li>
                    <li>Analytics reports (daily/weekly/monthly)</li>
                </ul>

                <p>They needed a way to:</p>
                <ul>
                    <li>Schedule these pipelines reliably</li>
                    <li>Handle dependencies (pipeline B needs pipeline A's output)</li>
                    <li>Retry failures automatically</li>
                    <li>Monitor and alert on issues</li>
                </ul>

                <h3>The Solution: Apache Airflow</h3>

                <p>Airbnb built Airflow (now open-source, used by thousands of companies).</p>

                <div class="code-block">Key Concepts:

1. DAG (Directed Acyclic Graph)
   - Defines pipeline steps and dependencies
   - Written in Python

2. Tasks
   - Individual steps (extract, transform, load)
   - Can retry on failure

3. Operators
   - Pre-built task types (SQL, Python, Bash, etc.)

4. Scheduler
   - Runs DAGs on schedule
   - Handles retries and alerts

Example Airflow DAG:
from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime, timedelta

default_args = {
    'owner': 'data-eng',
    'retries': 3,
    'retry_delay': timedelta(minutes=5),
}

dag = DAG(
    'daily_sales_report',
    default_args=default_args,
    schedule_interval='0 6 * * *',  # 6 AM daily
    start_date=datetime(2024, 1, 1),
)

extract = PythonOperator(
    task_id='extract_orders',
    python_callable=extract_orders_from_db,
    dag=dag,
)

transform = PythonOperator(
    task_id='transform_data',
    python_callable=clean_and_aggregate,
    dag=dag,
)

load = PythonOperator(
    task_id='load_to_warehouse',
    python_callable=load_to_snowflake,
    dag=dag,
)

validate = PythonOperator(
    task_id='validate_data',
    python_callable=run_data_quality_checks,
    dag=dag,
)

# Define dependencies
extract >> transform >> load >> validate</div>

                <h3>Lessons from Airbnb</h3>
                <ol>
                    <li><strong>Start with cron, graduate to Airflow</strong> - Don't over-engineer early</li>
                    <li><strong>Make tasks atomic</strong> - Each task does ONE thing</li>
                    <li><strong>Always include validation</strong> - Last task checks data quality</li>
                    <li><strong>Set up alerts</strong> - Know when things break (they will)</li>
                    <li><strong>Document in code</strong> - Comments explain WHY, not what</li>
                </ol>

                <h2>Error Handling: The Unglamorous Truth</h2>

                <h3>Types of Failures You'll See</h3>

                <div class="code-block">1. Transient Failures (retry will work)
   - Network timeout
   - Database locked
   - API rate limit
   Fix: Retry with exponential backoff

2. Data Quality Failures (bad data)
   - Null values in required fields
   - Invalid formats (date as string)
   - Unexpected values (negative quantities)
   Fix: Validate and alert, don't retry

3. Schema Changes (upstream broke contract)
   - New required field added
   - Field renamed
   - Data type changed
   Fix: Make schema flexible, version control

4. Infrastructure Failures (system down)
   - Source database crashed
   - Warehouse out of capacity
   - S3 region outage
   Fix: Wait and retry, have runbook</div>

                <h3>Retry Strategy That Actually Works</h3>

                <div class="code-block">def extract_with_retry(source, max_retries=3):
    for attempt in range(max_retries):
        try:
            data = fetch_from_source(source)
            validate_data(data)  # Fail fast if data is bad
            return data

        except NetworkError as e:
            # Transient - retry with backoff
            if attempt < max_retries - 1:
                wait_time = 2 ** attempt * 60  # 1min, 2min, 4min
                logger.warning(f"Retry {attempt + 1}/{max_retries} after {wait_time}s")
                time.sleep(wait_time)
            else:
                alert_team(f"Pipeline failed after {max_retries} retries")
                raise

        except DataValidationError as e:
            # Bad data - don't retry, alert immediately
            alert_team(f"Data quality issue: {e}")
            raise

        except Exception as e:
            # Unknown error - log and fail
            logger.error(f"Unexpected error: {e}", exc_info=True)
            alert_team(f"Unknown pipeline error: {e}")
            raise</div>

                <h2>Monitoring & Alerting</h2>

                <p>If you can't measure it, you can't fix it. Here's what to monitor:</p>

                <h3>Pipeline Health Metrics</h3>

                <table class="table">
                    <tr>
                        <th>Metric</th>
                        <th>What to Track</th>
                        <th>Alert Threshold</th>
                    </tr>
                    <tr>
                        <td>Success Rate</td>
                        <td>% of successful runs</td>
                        <td>< 95% (weekly)</td>
                    </tr>
                    <tr>
                        <td>Duration</td>
                        <td>How long pipeline takes</td>
                        <td>> 2x normal time</td>
                    </tr>
                    <tr>
                        <td>Data Volume</td>
                        <td>Rows processed</td>
                        <td>> 50% change from average</td>
                    </tr>
                    <tr>
                        <td>Data Freshness</td>
                        <td>Time since last update</td>
                        <td>> SLA (e.g., 2 hours old)</td>
                    </tr>
                    <tr>
                        <td>Data Quality</td>
                        <td>Null rates, duplicates</td>
                        <td>Any increase > 10%</td>
                    </tr>
                </table>

                <h3>Alerting Best Practices</h3>

                <div class="code-block">❌ DON'T: Alert on everything
Result: Alert fatigue, ignored alerts

✓ DO: Alert on business impact
Examples:
- "Revenue report missing" (impacts business)
- "Dashboard not updated" (users affected)
- "Payment pipeline failed" (critical system)

❌ DON'T: Alert entire team
Result: Diffusion of responsibility

✓ DO: Alert specific owner
- On-call rotation
- Clear escalation path
- Runbooks for common issues

❌ DON'T: Just send "Pipeline failed"
Result: No context, slow response

✓ DO: Include context
Example alert:
"🚨 daily_sales_report failed
Step: transform_data
Error: Column 'payment_status' not found
Last success: 2024-01-15 06:00
Runbook: https://wiki/runbooks/sales-pipeline
Logs: https://logs/pipeline-123"</div>

                <h2>Your First Pipeline: Step by Step</h2>

                <p>Let's build a simple but production-ready pipeline together:</p>

                <h3>Goal</h3>
                <p>Daily report of user signups by source (organic, paid, referral)</p>

                <h3>Step 1: Start Simple (v1)</h3>

                <div class="code-block"># simple_signup_report.py
import psycopg2
import datetime

# Extract
conn = psycopg2.connect("dbname=users host=localhost")
yesterday = (datetime.datetime.now() - datetime.timedelta(days=1)).date()

query = """
    SELECT source, COUNT(*) as signups
    FROM users
    WHERE created_at::date = %s
    GROUP BY source
"""

cursor = conn.cursor()
cursor.execute(query, (yesterday,))
results = cursor.fetchall()

# Print report
print(f"Signups for {yesterday}:")
for source, count in results:
    print(f"  {source}: {count}")

conn.close()</div>

                <h3>Step 2: Make it Robust (v2)</h3>

                <div class="code-block"># Better version with error handling and logging
import psycopg2
import datetime
import logging
import sys

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def extract_signups(date):
    """Extract signup counts by source for given date"""
    try:
        conn = psycopg2.connect(
            "dbname=users host=localhost",
            connect_timeout=10
        )

        query = """
            SELECT
                COALESCE(source, 'unknown') as source,
                COUNT(*) as signups
            FROM users
            WHERE created_at::date = %s
            GROUP BY source
        """

        cursor = conn.cursor()
        cursor.execute(query, (date,))
        results = cursor.fetchall()

        conn.close()
        logger.info(f"Extracted {len(results)} rows for {date}")
        return results

    except psycopg2.Error as e:
        logger.error(f"Database error: {e}")
        sys.exit(1)

def validate_data(results, date):
    """Check if data looks reasonable"""
    total = sum(count for _, count in results)

    if total == 0:
        logger.warning(f"Zero signups for {date} - unusual!")
        return False

    if total > 10000:
        logger.warning(f"Unusually high signups: {total}")
        return False

    logger.info(f"Validation passed: {total} total signups")
    return True

def main():
    yesterday = (datetime.datetime.now() - datetime.timedelta(days=1)).date()

    # Extract
    results = extract_signups(yesterday)

    # Validate
    if not validate_data(results, yesterday):
        logger.error("Validation failed, aborting")
        sys.exit(1)

    # Report
    print(f"\\nSignup Report - {yesterday}")
    print("-" * 30)
    for source, count in sorted(results):
        print(f"{source:15s}: {count:5d}")

    logger.info("Pipeline completed successfully")

if __name__ == "__main__":
    main()</div>

                <h3>Step 3: Add Persistence (v3)</h3>

                <div class="code-block"># Now load to warehouse for historical tracking

def load_to_warehouse(results, date):
    """Load results to Snowflake for historical analysis"""
    import snowflake.connector

    conn = snowflake.connector.connect(
        user='etl_user',
        password='...',
        account='company',
        warehouse='ETL_WH',
        database='ANALYTICS',
        schema='REPORTS'
    )

    cursor = conn.cursor()

    # Idempotent: delete existing data for this date
    cursor.execute(
        "DELETE FROM daily_signups WHERE report_date = %s",
        (date,)
    )

    # Insert new data
    cursor.executemany(
        """INSERT INTO daily_signups (report_date, source, signup_count)
           VALUES (%s, %s, %s)""",
        [(date, source, count) for source, count in results]
    )

    conn.commit()
    cursor.close()
    conn.close()

    logger.info(f"Loaded {len(results)} rows to warehouse")</div>

                <h2>Summary: Pipeline Checklist</h2>

                <p>Before you call a pipeline "production-ready", it must have:</p>

                <ul>
                    <li>✅ <strong>Idempotency</strong> - Can run multiple times safely</li>
                    <li>✅ <strong>Error handling</strong> - Retries transient failures, alerts on real issues</li>
                    <li>✅ <strong>Logging</strong> - Can debug when things go wrong</li>
                    <li>✅ <strong>Validation</strong> - Checks data quality before loading</li>
                    <li>✅ <strong>Monitoring</strong> - Tracks duration, row counts, success rate</li>
                    <li>✅ <strong>Alerts</strong> - Notifies right person with context</li>
                    <li>✅ <strong>Documentation</strong> - README with purpose, schedule, dependencies</li>
                    <li>✅ <strong>Tests</strong> - Unit tests for transforms, integration tests for pipeline</li>
                </ul>

                <p>Remember: <strong>A working pipeline in production is better than a perfect pipeline in development</strong>. Ship it, then improve it.</p>
            \`,
            interviews: [
                {
                    question: "How do you handle a pipeline that takes 6 hours to run but needs to complete in 4 hours?",
                    answer: "Options in order: 1) Parallelize - split work across multiple workers (easiest win), 2) Incremental processing - only process new/changed data, not full refresh, 3) Optimize queries - add indexes, partition tables, reduce data scanned, 4) Upgrade resources - bigger instance, more memory (last resort, costs money). Real example: Partitioned by date, processed each month in parallel, went from 6hrs to 1.5hrs."
                },
                {
                    question: "Pipeline succeeded but loaded wrong data. How do you fix it?",
                    answer: "1) Stop the pipeline immediately (prevent more bad data), 2) Identify scope (which dates affected, how many rows), 3) Preserve bad data (rename table to _backup for investigation), 4) Fix the bug, 5) Backfill correct data (reprocess affected dates), 6) Validate fix (compare row counts, spot check values), 7) Root cause analysis (why didn't tests catch this?), 8) Add validation to prevent recurrence. Never delete data before understanding what went wrong."
                },
                {
                    question: "When would you choose batch processing over stream processing?",
                    answer: "Choose batch when: 1) Can tolerate latency (hourly/daily updates fine), 2) Need to process ALL data together (aggregations, joins across full dataset), 3) Source data is batched (daily DB dumps), 4) Lower complexity needed (batch is simpler), 5) Cost matters (batch processes less data by waiting to batch). Example: Daily sales reports = batch. Real-time fraud detection = stream. Most companies start with batch, add streaming only where real-time truly needed."
                },
                {
                    question: "How do you test data pipelines?",
                    answer: "Three levels: 1) Unit tests - test individual functions (transform logic, data cleaning), 2) Integration tests - test pipeline end-to-end with sample data, 3) Data quality tests - validate output (row counts, null checks, value ranges). Use tools: pytest for Python, Great Expectations for data quality, dbt test for SQL transforms. Test in staging environment with production-like data (anonymized). Don't test in production - have separate dev/staging warehouses."
                },
                {
                    question: "Pipeline is slow but you don't know why. How do you debug?",
                    answer: "Systematic approach: 1) Add timing logs to each step (identify bottleneck), 2) Check resource usage (CPU, memory, network), 3) Profile queries (EXPLAIN PLAN for SQL), 4) Check data volume (did input size increase?), 5) Look for blocking (locks, waiting on dependencies). Tools: Python cProfile, SQL EXPLAIN, CloudWatch/DataDog metrics. Real example: Pipeline slow due to one step waiting for table lock - changed schedule to avoid contention, fixed."
                }
            ]
        },
        {
            id: 'batch-vs-stream',
            title: 'Batch vs Stream: When Real-Time Actually Matters',
            duration: '55 min',
            content: \`
                <h2>The Real Question: Do You REALLY Need Real-Time?</h2>
                <p>Here's a truth that will save you months of work: <strong>Most "real-time" requirements aren't actually real-time</strong>. I've seen teams build complex streaming systems for data that updates once an hour.</p>

                <p>Before you build a streaming pipeline, ask: "What happens if this data is 5 minutes old? 1 hour old? 1 day old?"</p>

                <h3>Real-Time vs Near Real-Time vs Batch</h3>

                <table class="table">
                    <tr>
                        <th>Type</th>
                        <th>Latency</th>
                        <th>Use Cases</th>
                        <th>Complexity</th>
                    </tr>
                    <tr>
                        <td><strong>True Real-Time</strong></td>
                        <td>< 1 second</td>
                        <td>Fraud detection, stock trading, IoT alerts</td>
                        <td>Very High</td>
                    </tr>
                    <tr>
                        <td><strong>Near Real-Time</strong></td>
                        <td>1-5 minutes</td>
                        <td>Dashboards, trending topics, recommendations</td>
                        <td>High</td>
                    </tr>
                    <tr>
                        <td><strong>Micro-Batch</strong></td>
                        <td>5-15 minutes</td>
                        <td>Metrics, monitoring, aggregations</td>
                        <td>Medium</td>
                    </tr>
                    <tr>
                        <td><strong>Batch</strong></td>
                        <td>Hours to Days</td>
                        <td>Reports, analytics, ML training</td>
                        <td>Low</td>
                    </tr>
                </table>

                <h2>Batch Processing: The Workhorse</h2>

                <p>95% of data engineering is batch processing. It's not sexy, but it's reliable, cost-effective, and easy to debug.</p>

                <h3>How Batch Works</h3>

                <div class="code-block">Classic Daily Batch:

1. Wait for trigger (time-based or event-based)
   - Runs at 2 AM daily
   - Or: when file lands in S3

2. Process ALL relevant data
   - Yesterday's transactions
   - All orders from last week
   - Full customer table

3. Write results
   - Update data warehouse
   - Generate reports
   - Send notifications

Characteristics:
✓ Simple to reason about
✓ Easy to reprocess if failed
✓ Can leverage full dataset for context
✗ Hours of latency
✗ Processes some data unnecessarily</div>

                <h3>Real Example: Stripe's Daily Settlement</h3>

                <div class="code-block">Problem: Calculate daily payouts to merchants

Why Batch Works:
- Payouts happen once per day (no need for real-time)
- Need ALL transactions to calculate fees accurately
- Regulatory requirements need complete day's data
- Reconciliation easier with batch boundaries

Pipeline:
00:00 - Day ends, transactions finalize
01:00 - Extract all transactions for day
02:00 - Calculate fees, refunds, chargebacks
03:00 - Aggregate by merchant
04:00 - Generate payout instructions
05:00 - Send to banks
06:00 - Merchants receive payout summary email

Result: Batch is PERFECT here. Real-time would add complexity with zero benefit.</div>

                <h3>When Batch Makes Sense</h3>
                <ul>
                    <li><strong>Reporting & Analytics</strong> - Daily/weekly/monthly reports</li>
                    <li><strong>ML Training</strong> - Models trained on full historical data</li>
                    <li><strong>Data Aggregation</strong> - Rollups, summaries, statistics</li>
                    <li><strong>ETL Jobs</strong> - Daily loads from transactional DBs</li>
                    <li><strong>Compliance & Auditing</strong> - End-of-day reconciliation</li>
                </ul>

                <h2>Stream Processing: When Latency Matters</h2>

                <p>Stream processing handles data as it arrives, event by event. It's powerful but complex.</p>

                <h3>How Streaming Works</h3>

                <div class="code-block">Event Stream Flow:

1. Events published to stream (Kafka, Kinesis)
   User clicks button → Event to Kafka
   Sensor sends reading → Event to Kafka
   Payment processed → Event to Kafka

2. Stream processor consumes events in real-time
   - Processes each event individually
   - Maintains stateful computations
   - Outputs results immediately

3. Results available instantly
   - Update real-time dashboard
   - Trigger alert
   - Send to another system

Characteristics:
✓ Low latency (milliseconds to seconds)
✓ Immediate insights
✓ Can react to events as they happen
✗ Complex to implement correctly
✗ Hard to debug
✗ Expensive (always running)</div>

                <h3>Real Example: Uber's Surge Pricing</h3>

                <div class="code-block">Problem: Adjust prices based on real-time supply & demand

Why Streaming Required:
- Demand changes by the second (concert ends, thousands need rides)
- Supply moves constantly (drivers accept/complete rides)
- Prices must update immediately (batch would be hours late)

Architecture:
Events:
- Ride request → Kafka
- Ride accepted → Kafka
- Ride completed → Kafka
- Driver location update (every 30s) → Kafka

Stream Processing (Apache Flink):
- Calculate riders waiting per area (last 5 min window)
- Calculate available drivers per area (last 30s)
- Compute ratio → determine surge multiplier
- Publish price updates → API servers

Result: Prices update every 30-60 seconds based on real-time conditions.

Why Batch Won't Work:
- By the time batch runs (hourly?), concert crowd dispersed
- Surge pricing loses effectiveness with delay
- Business requires immediate response</div>

                <h2>The Hidden Costs of Streaming</h2>

                <p>Before you jump into streaming, understand what you're signing up for:</p>

                <h3>1. Operational Complexity</h3>

                <div class="code-block">Batch Pipeline:
- Runs once a day
- Fails → rerun tomorrow
- Debug with SQL queries on tables
- Monitoring: did it finish on time?

Streaming Pipeline:
- Runs 24/7/365
- Fails → data loss? catchup needed?
- Debug with event traces and logs
- Monitoring: throughput, lag, error rates, state size, checkpoints
- Need: on-call rotation, runbooks, auto-scaling
- Cost: infrastructure never sleeps</div>

                <h3>2. State Management</h3>

                <p>Streaming often needs to remember things (stateful processing):</p>

                <div class="code-block">Example: Count events per user in last 1 hour

Batch Approach:
SELECT user_id, COUNT(*)
FROM events
WHERE timestamp > NOW() - INTERVAL '1 hour'
GROUP BY user_id

Simple! Database handles everything.

Streaming Approach:
- Store state in memory/disk (user → count)
- Update state for each event
- Expire old events from state
- Handle failures (checkpoint state)
- Scale state across multiple machines
- Compact state to prevent growth

Much more complex!</div>

                <h3>3. Exactly-Once Processing</h3>

                <p>This is the HARD problem in streaming:</p>

                <div class="code-block">Scenario: Count payments for revenue tracking

At-Most-Once (fast, lossy):
- Process event → increment counter → ack event
- If crash between increment and ack → event lost
- Result: Revenue UNDERREPORTED

At-Least-Once (simple, duplicates):
- Process event → increment counter → ack event
- If crash after increment before ack → event reprocessed
- Result: Revenue OVERREPORTED

Exactly-Once (complex, correct):
- Use distributed transactions
- Idempotent processing
- State snapshots
- Requires: Kafka + Flink/Spark with specific config
- Result: Correct revenue (but complex to achieve)</div>

                <h2>The Middle Ground: Micro-Batching</h2>

                <p>Often the best solution is micro-batching: small batches processed frequently.</p>

                <div class="code-block">Micro-Batch Example: Process every 5 minutes

Instead of:
- Processing each event (streaming complexity)
- OR waiting 24 hours (too slow)

Do this:
- Buffer events for 5 minutes
- Process batch of events
- Repeat every 5 minutes

Benefits:
✓ Near real-time (5 min latency acceptable for many cases)
✓ Simpler than true streaming
✓ Can use batch tools (SQL, Spark)
✓ Easier to debug and reprocess

Use Cases:
- Dashboards (5 min stale data is fine)
- Alerting (not life-critical)
- Aggregations (metrics, KPIs)
- Data warehouse updates</div>

                <h3>Real Example: Twitter's Trending Topics</h3>

                <div class="code-block">Problem: Show trending hashtags

Approach: Micro-batch every 2 minutes

Pipeline:
1. Collect all tweets for 2 minutes
2. Count hashtag mentions
3. Compare with previous window
4. Identify rising hashtags
5. Update trending list

Why Not True Streaming:
- Don't need second-by-second updates
- 2-minute delay acceptable for users
- Easier to implement and debug
- Can smooth out noise/spam

Why Not Daily Batch:
- Trends happen fast (events, news breaks)
- Daily too slow to capture viral moments
- Users expect recent trends

Result: Sweet spot between complexity and freshness</div>

                <h2>Technology Choices</h2>

                <h3>Batch Processing Tools</h3>

                <table class="table">
                    <tr>
                        <th>Tool</th>
                        <th>Best For</th>
                        <th>Scale</th>
                    </tr>
                    <tr>
                        <td><strong>Python + Pandas</strong></td>
                        <td>Small data (< 10GB), quick scripts</td>
                        <td>Single machine</td>
                    </tr>
                    <tr>
                        <td><strong>SQL (dbt)</strong></td>
                        <td>Data warehouse transforms, ELT</td>
                        <td>Warehouse handles scale</td>
                    </tr>
                    <tr>
                        <td><strong>Apache Spark</strong></td>
                        <td>Large data (TB+), complex transforms</td>
                        <td>Distributed cluster</td>
                    </tr>
                    <tr>
                        <td><strong>AWS Glue</strong></td>
                        <td>Serverless ETL, AWS ecosystem</td>
                        <td>Auto-scaling</td>
                    </tr>
                </table>

                <h3>Stream Processing Tools</h3>

                <table class="table">
                    <tr>
                        <th>Tool</th>
                        <th>Best For</th>
                        <th>Complexity</th>
                    </tr>
                    <tr>
                        <td><strong>Apache Kafka</strong></td>
                        <td>Event streaming backbone</td>
                        <td>Medium (just publish/subscribe)</td>
                    </tr>
                    <tr>
                        <td><strong>Apache Flink</strong></td>
                        <td>True streaming, exactly-once, stateful</td>
                        <td>High</td>
                    </tr>
                    <tr>
                        <td><strong>Spark Streaming</strong></td>
                        <td>Micro-batching, Spark ecosystem</td>
                        <td>Medium</td>
                    </tr>
                    <tr>
                        <td><strong>AWS Kinesis</strong></td>
                        <td>Managed streaming, AWS native</td>
                        <td>Medium</td>
                    </tr>
                    <tr>
                        <td><strong>Kafka Streams</strong></td>
                        <td>Simple streaming apps, no cluster needed</td>
                        <td>Low-Medium</td>
                    </tr>
                </table>

                <h2>Case Study: LinkedIn's Journey</h2>

                <h3>Early Days (2008): All Batch</h3>

                <div class="code-block">Architecture:
- MySQL for user profiles
- Daily dumps to Hadoop
- MapReduce jobs for analytics
- Reports next day

Problems:
- Analytics always 24 hours stale
- Can't show real-time metrics
- Slow feature iteration</div>

                <h3>Hybrid Approach (2011): Kafka Introduced</h3>

                <div class="code-block">Why they built Kafka:
- Needed to move data between systems in real-time
- Activity tracking (profile views, searches, messages)
- Log aggregation from thousands of servers

Architecture:
- User actions → Kafka (real-time)
- Kafka → Multiple consumers:
  - Real-time: Analytics dashboard (last hour metrics)
  - Near real-time: Recommendations (update every 5 min)
  - Batch: Data warehouse (hourly dumps from Kafka)

Result:
- Real-time where needed (dashboards, monitoring)
- Batch for heavy analytics (still running daily)
- Kafka as central nervous system</div>

                <h3>Lessons Learned</h3>

                <ol>
                    <li><strong>Start with batch</strong> - LinkedIn ran on batch for 3+ years successfully</li>
                    <li><strong>Add streaming incrementally</strong> - Didn't rewrite everything, added where valuable</li>
                    <li><strong>Use both together</strong> - Streaming for recent data, batch for deep analysis</li>
                    <li><strong>Build infrastructure first</strong> - Kafka made streaming feasible, don't jump to streaming without solid foundation</li>
                </ol>

                <h2>Decision Framework: Batch or Stream?</h2>

                <h3>Choose Batch When:</h3>
                <ul>
                    <li>✅ Latency requirement > 1 hour</li>
                    <li>✅ Data has natural boundaries (daily, weekly)</li>
                    <li>✅ Need complete dataset for processing (aggregations, joins)</li>
                    <li>✅ Team new to data engineering</li>
                    <li>✅ Limited ops resources</li>
                    <li>✅ Cost is a concern</li>
                </ul>

                <h3>Choose Streaming When:</h3>
                <ul>
                    <li>✅ Latency requirement < 5 minutes</li>
                    <li>✅ Need immediate action (fraud, alerts)</li>
                    <li>✅ Data is continuous (sensors, logs, user events)</li>
                    <li>✅ Business value of real-time is clear</li>
                    <li>✅ Team has streaming expertise</li>
                    <li>✅ Budget for 24/7 operations</li>
                </ul>

                <h3>Real Talk: Start With Batch</h3>

                <p>I've never regretted starting with batch. I've often regretted premature streaming.</p>

                <div class="code-block">Progression that works:

Phase 1 (Month 1-3): Daily batch
- Get data flowing
- Understand requirements
- Build trust with stakeholders

Phase 2 (Month 4-6): Hourly batch
- Business asks for fresher data
- Optimize batch to run faster
- Still simple, just more frequent

Phase 3 (Month 7+): Streaming (if truly needed)
- Clear business case for real-time
- Team comfortable with batch patterns
- Infrastructure in place (Kafka, monitoring)
- Start with one use case, prove value

Most companies stay in Phase 1-2 forever. And that's perfectly fine.</div>

                <h2>Practical Example: Building Both</h2>

                <h3>Scenario: E-commerce Order Analytics</h3>

                <p><strong>Requirement:</strong> Track order metrics</p>

                <h4>Batch Solution (Daily)</h4>

                <div class="code-block">-- Run at 1 AM daily
INSERT INTO order_metrics_daily
SELECT
  DATE(created_at) as order_date,
  COUNT(*) as total_orders,
  SUM(amount) as total_revenue,
  AVG(amount) as avg_order_value,
  COUNT(DISTINCT user_id) as unique_customers
FROM orders
WHERE DATE(created_at) = CURRENT_DATE - INTERVAL '1 day'
GROUP BY DATE(created_at);

Pros:
✓ Simple SQL
✓ Easy to understand
✓ Cheap to run
✓ Can backfill easily

Cons:
✗ Metrics stale until next day
✗ Can't see today's performance until tomorrow</div>

                <h4>Streaming Solution (Real-time)</h4>

                <div class="code-block">// Kafka Streams application
StreamsBuilder builder = new StreamsBuilder();

KStream<String, Order> orders = builder.stream("orders");

orders
    .groupByKey()
    .windowedBy(TimeWindows.of(Duration.ofHours(1)))
    .aggregate(
        OrderMetrics::new,
        (key, order, metrics) -> metrics.add(order),
        Materialized.with(Serdes.String(), orderMetricsSerde)
    )
    .toStream()
    .to("order-metrics-hourly");

Pros:
✓ Real-time metrics (updated every second)
✓ Can alert on anomalies immediately
✓ Dashboard shows current performance

Cons:
✗ Complex code
✗ Need Kafka infrastructure
✗ State management
✗ 24/7 operations
✗ Higher cost</div>

                <h4>Hybrid Solution (Best of Both)</h4>

                <div class="code-block">Architecture:

Real-time (Last 24 hours):
- Orders → Kafka → Streaming aggregation
- Updates every minute
- Shows in dashboard for current day
- Stored in Redis (TTL 24 hours)

Batch (Historical):
- Daily job at 1 AM
- Processes yesterday's complete data
- Loads to data warehouse
- Used for all historical analysis

Dashboard query:
SELECT * FROM order_metrics_daily
WHERE date < CURRENT_DATE
UNION ALL
SELECT * FROM redis_realtime_metrics
WHERE date = CURRENT_DATE

Result:
✓ Real-time for today (when stakeholders care most)
✓ Batch for history (cheap, reliable)
✓ Best of both worlds</div>

                <h2>Summary: The Pragmatic Approach</h2>

                <p><strong>Start simple</strong>: Daily batch gets you 90% of the value</p>
                <p><strong>Increase frequency</strong>: If needed, go hourly before going streaming</p>
                <p><strong>Add streaming</strong>: Only when there's clear business value</p>
                <p><strong>Use hybrid</strong>: Combine batch and stream for best results</p>

                <p>Remember: <strong>Technology should serve the business need, not the other way around</strong>. Real-time is exciting, but reliability and correctness matter more.</p>
            \`,
            interviews: [
                {
                    question: "How would you migrate from batch to streaming without downtime?",
                    answer: "Parallel run approach: 1) Keep batch running (don't turn off), 2) Build streaming pipeline alongside, 3) Compare outputs for 2-4 weeks (batch vs stream metrics), 4) Fix discrepancies, tune streaming, 5) Gradually switch traffic (10% users see streaming, 90% see batch), 6) Monitor closely for correctness and performance, 7) Full cutover only when confident, 8) Keep batch as backup for 1 month. Never do big-bang migration - too risky."
                },
                {
                    question: "What causes lag in stream processing and how do you fix it?",
                    answer: "Lag = producer rate > consumer rate. Causes: 1) Slow processing (optimize code, add indexes), 2) Under-resourced (add partitions, scale consumers), 3) Backpressure (downstream system slow), 4) Large state (compact state, use rocksdb), 5) GC pauses (tune JVM). Fix systematically: measure producer/consumer rates, identify bottleneck, scale appropriately. Monitor lag continuously - alert when > SLA."
                },
                {
                    question: "How do you handle late-arriving events in streaming?",
                    answer: "Use watermarks and allowed lateness. Example: events can arrive up to 1 hour late. Set watermark = event_time - 1hr. Process events normally within window + 1hr grace period. After grace period: either 1) Drop late events (log for monitoring), 2) Process in separate 'late data' pipeline, 3) Reprocess window (if exactly-once critical). Twitter uses 5-min grace, financial systems use longer. Trade-off: longer grace = more state to maintain."
                },
                {
                    question: "When would you choose Kafka over a database for storing data?",
                    answer: "Kafka is NOT a database, it's a message broker with retention. Use Kafka for: 1) Event streaming (pub/sub to multiple consumers), 2) Decoupling systems (producer doesn't know consumers), 3) Replay capability (reprocess events from beginning), 4) High throughput writes (millions events/sec). Use database for: 1) Queries (JOINs, complex queries), 2) Point lookups (get user by ID), 3) Transactions (ACID guarantees), 4) Long-term storage. Often use both: Kafka for transport, DB for storage."
                },
                {
                    question: "How do you test streaming applications?",
                    answer: "Three levels: 1) Unit tests - test processing logic with mock events, 2) Integration tests - run mini Kafka cluster (testcontainers), send events, verify outputs, 3) Staging tests - deploy to staging, replay production events, compare results. Also: property-based testing (generate random events, check invariants), chaos testing (kill consumers, verify recovery). Hard part: testing exactly-once semantics and state recovery - need comprehensive integration tests."
                }
            ]
        },
        {
            id: 'warehouses-vs-lakes',
            title: 'Data Warehouses vs Data Lakes: The Storage Showdown',
            duration: '50 min',
            content: \`
                <h2>The Storage Dilemma</h2>
                <p>You have data. Lots of it. Where do you put it? This is one of the most important decisions you'll make as a data engineer.</p>

                <p>The answer isn't "warehouse" or "lake" - it's usually <strong>both</strong>. Let me explain why.</p>

                <h2>Data Warehouse: The Structured Approach</h2>

                <h3>What It Is</h3>
                <p>A data warehouse is a database optimized for analytics. Think of it as a library where every book (data) is cataloged, organized, and easy to find.</p>

                <div class="code-block">Characteristics:
✓ Structured data (tables, schemas)
✓ Clean, transformed data (ready to query)
✓ Optimized for reads/analytics
✓ SQL-based queries
✓ Business users can self-serve
✓ Enforces data quality

Examples: Snowflake, Google BigQuery, Amazon Redshift, Azure Synapse</div>

                <h3>When Warehouses Shine</h3>

                <table class="table">
                    <tr>
                        <th>Use Case</th>
                        <th>Why Warehouse Works</th>
                    </tr>
                    <tr>
                        <td>BI Dashboards</td>
                        <td>Fast SQL queries, aggregations pre-computed</td>
                    </tr>
                    <tr>
                        <td>Business Reports</td>
                        <td>Clean data, analysts can query with SQL</td>
                    </tr>
                    <tr>
                        <td>KPI Tracking</td>
                        <td>Optimized for aggregations and joins</td>
                    </tr>
                    <tr>
                        <td>Ad-hoc Analysis</td>
                        <td>Interactive queries return in seconds</td>
                    </tr>
                </table>

                <h3>Real Example: Airbnb's Redshift Warehouse</h3>

                <div class="code-block">Data Sources → Warehouse Structure:

Sources (messy, distributed):
- MySQL: bookings, users, listings
- MongoDB: reviews, photos
- APIs: payment status, verification

Warehouse Tables (clean, denormalized):
- fact_bookings: booking_id, user_id, listing_id, price, dates
- dim_users: user_id, name, join_date, verified, location
- dim_listings: listing_id, host_id, property_type, amenities
- fact_searches: search_id, user_id, location, dates, filters

Benefits:
✓ Analysts query with simple SQL
✓ Joins are fast (optimized for analytics)
✓ Historical data readily available
✓ Data quality enforced (schema validation)

Example Query (runs in < 5 seconds):
SELECT
  listing.property_type,
  COUNT(*) as bookings,
  AVG(booking.price) as avg_price
FROM fact_bookings booking
JOIN dim_listings listing ON booking.listing_id = listing.listing_id
WHERE booking.created_at >= '2024-01-01'
GROUP BY listing.property_type
ORDER BY bookings DESC;</div>

                <h2>Data Lake: The Flexible Approach</h2>

                <h3>What It Is</h3>
                <p>A data lake stores raw data in its original format. Think of it as a warehouse where you dump everything - you'll organize it later.</p>

                <div class="code-block">Characteristics:
✓ Any data type (structured, semi-structured, unstructured)
✓ Raw/unprocessed data (as-is from source)
✓ Cheap storage (S3, ADLS, GCS)
✓ Schema-on-read (define schema when querying)
✓ Great for data scientists/engineers
✓ Flexible, future-proof

Examples: Amazon S3 + Athena, Azure Data Lake, Google Cloud Storage</div>

                <h3>When Data Lakes Work Best</h3>

                <table class="table">
                    <tr>
                        <th>Use Case</th>
                        <th>Why Lake Works</th>
                    </tr>
                    <tr>
                        <td>Log Storage</td>
                        <td>Cheap storage for massive volumes</td>
                    </tr>
                    <tr>
                        <td>ML Training Data</td>
                        <td>Raw data needed for feature engineering</td>
                    </tr>
                    <tr>
                        <td>Archival</td>
                        <td>Keep everything, decide use later</td>
                    </tr>
                    <tr>
                        <td>Unstructured Data</td>
                        <td>Images, videos, PDFs, JSON</td>
                    </tr>
                </table>

                <h3>Real Example: Netflix's S3 Data Lake</h3>

                <div class="code-block">What They Store (Petabytes):

/raw/
  /events/
    /2024/01/15/user-clicks/*.parquet
    /2024/01/15/video-streams/*.parquet
  /logs/
    /application/*.json.gz
    /server/*.log
  /images/
    /thumbnails/*.jpg
  /experiments/
    /ab-tests/*.json

Why Lake Works:
✓ Stores raw events (can reprocess with new logic)
✓ Cheap (S3 costs ~$0.023/GB vs Snowflake ~$40/TB/month)
✓ Flexible schema (JSON events can have varying fields)
✓ ML teams read directly for training
✓ Athena queries when needed (not frequent)

Cost Comparison:
100 TB in S3: ~$2,300/month
100 TB in Snowflake: ~$4,000/month (storage) + compute
Winner: Lake for archival/infrequent access</div>

                <h2>The Lakehouse: Best of Both Worlds</h2>

                <p>Modern approach: combine lake's flexibility with warehouse's performance.</p>

                <h3>How It Works</h3>

                <div class="code-block">Technology: Delta Lake, Apache Iceberg, Apache Hudi

Architecture:
1. Store data in data lake (S3/ADLS)
2. Add metadata layer on top
   - ACID transactions
   - Schema enforcement
   - Time travel
   - Data quality checks

3. Query with warehouse-like performance
   - Databricks, Dremio, Starburst
   - SQL interface
   - Fast queries

Result:
✓ Lake's low cost
✓ Lake's flexibility
✓ Warehouse's query speed
✓ Warehouse's data quality

Trade-off:
✗ More complex to set up
✗ Newer technology (less mature)
✗ Need specialized tools</div>

                <h3>Real Example: Uber's Lakehouse on Delta</h3>

                <div class="code-block">Evolution:

2015: All in MySQL + Hadoop
- Slow queries
- ETL takes hours
- Can't handle scale

2017: Migrate to Data Lake (S3 + Presto)
- Cheaper storage
- Faster processing
- But: data quality issues, no ACID

2020: Implement Delta Lake
- Keep data in S3 (cheap)
- Add Delta format (ACID, schema)
- Query with Presto/Spark
- Achieves warehouse speed with lake cost

Benefits:
✓ Reduced storage costs 60%
✓ Query performance 3x faster
✓ Time travel (audit/rollback)
✓ ACID for data quality</div>

                <h2>The Practical Decision Tree</h2>

                <h3>Start With This Question</h3>

                <p><strong>"Who will query this data?"</strong></p>

                <div class="code-block">If analysts/business users need to query:
→ Use Data Warehouse
Reason: They need SQL, fast queries, clean data

If data scientists/engineers query occasionally:
→ Use Data Lake
Reason: They can handle raw data, don't need instant queries

If both groups need access:
→ Use BOTH (lake + warehouse)
Architecture:
- Raw data → Lake (S3)
- Processed data → Warehouse (Snowflake)
- ELT: Load from lake to warehouse nightly</div>

                <h3>Modern Best Practice Architecture</h3>

                <div class="code-block">The Three-Tier Approach:

Tier 1: Data Lake (Bronze/Raw)
- S3 buckets
- Raw data as-is from sources
- Cheap, scalable
- Keep forever
- Example: /raw/orders/2024/01/15/*.json

Tier 2: Data Lake (Silver/Cleaned)
- Still in S3
- Cleaned, validated, deduplicated
- Parquet format (columnar, compressed)
- Example: /processed/orders/2024/01/15/*.parquet

Tier 3: Data Warehouse (Gold/Business)
- Snowflake/BigQuery
- Aggregated, denormalized for business use
- Optimized tables for dashboards
- Example: dim_customers, fact_orders

Data Flow:
Source → Raw Lake (Bronze) → Clean Lake (Silver) → Warehouse (Gold)

Who Uses What:
- Engineers: Bronze + Silver (debugging, reprocessing)
- Data Scientists: Silver (ML features, training)
- Analysts: Gold (reports, dashboards)
- Execs: Gold (KPIs, metrics)</div>

                <h2>Cost Comparison: Real Numbers</h2>

                <p>Let's compare costs for a mid-size company (10 TB data, 50 queries/day):</p>

                <h3>Scenario 1: All Warehouse (Snowflake)</h3>

                <div class="code-block">Storage: 10 TB × $40/TB = $400/month
Compute: X-Large cluster × 8 hrs/day × $4/hr × 30 days = $960/month
Total: ~$1,360/month

Pros:
✓ Fast queries (< 5 seconds)
✓ Analysts happy
✓ Simple architecture

Cons:
✗ Expensive for inactive data
✗ Less flexible for ML workloads</div>

                <h3>Scenario 2: All Lake (S3 + Athena)</h3>

                <div class="code-block">Storage: 10 TB × $23/TB = $230/month
Queries: 50 queries/day × $5/TB scanned × 0.1 TB avg × 30 = $750/month
Total: ~$980/month

Pros:
✓ Cheap storage
✓ Pay only when querying
✓ Flexible for any data type

Cons:
✗ Slower queries (10-30 seconds)
✗ Analysts need technical skills
✗ No optimization without work</div>

                <h3>Scenario 3: Hybrid (Lake + Warehouse)</h3>

                <div class="code-block">Lake Storage: 10 TB raw × $23/TB = $230/month
Warehouse Storage: 2 TB processed × $40/TB = $80/month
Warehouse Compute: Small cluster × 4 hrs/day × $2/hr × 30 = $240/month
Total: ~$550/month

Pros:
✓ Best cost (40% cheaper than all-warehouse)
✓ Fast queries on important data
✓ Raw data preserved in lake
✓ Flexibility for ML + analytics

Cons:
✗ More complexity (two systems)
✗ Need ETL to sync lake → warehouse

Winner: Hybrid for most companies!</div>

                <h2>Common Mistakes to Avoid</h2>

                <h3>1. The "Data Swamp" (Bad Lake)</h3>

                <div class="code-block">Mistake: Dump everything in S3 with no organization

Result:
- No one knows what data exists
- No documentation
- Duplicate data everywhere
- Can't find anything
- "Data swamp" instead of "data lake"

Prevention:
✓ Organize with clear folder structure (/source/table/year/month/day/)
✓ Metadata catalog (AWS Glue, Hive Metastore)
✓ Naming conventions enforced
✓ Documentation for each dataset
✓ Data quality checks
✓ Lifecycle policies (archive old data)</div>

                <h3>2. Over-Engineering Early</h3>

                <div class="code-block">Mistake: Start with complex lakehouse before understanding needs

Better Progression:
Week 1-4: Start with CSV files in S3
- Simple, works immediately
- Learn what users actually need

Month 2-3: Add Parquet + partitioning
- Faster queries
- Lower costs
- Still simple

Month 4-6: Introduce warehouse for key tables
- Analysts query warehouse
- Engineers still use lake

Month 7+: Consider lakehouse if both needed
- Only if clear ROI
- Team ready for complexity

Don't: Build perfect system before understanding problems</div>

                <h3>3. Not Planning for Growth</h3>

                <div class="code-block">Mistake: Design for current data size

Reality Check:
Year 1: 100 GB data
Year 2: 2 TB data (20x growth)
Year 3: 50 TB data (25x growth)

Plan Ahead:
✓ Use partitioning from day 1 (by date)
✓ Choose columnar formats (Parquet not CSV)
✓ Set up data lifecycle (archive cold data)
✓ Compression always on
✓ Monitor costs monthly

Example partitioning:
/events/year=2024/month=01/day=15/*.parquet

Query only specific partition (fast + cheap):
SELECT * FROM events
WHERE year = '2024' AND month = '01' AND day = '15'</div>

                <h2>Case Study: Evolution of Spotify's Data Platform</h2>

                <h3>2010: PostgreSQL Only</h3>
                <div class="code-block">Scale: < 1M users
Storage: Application database
Analytics: SQL queries on production DB

Problems:
- Queries slow down app
- Can't keep historical data
- Running out of space</div>

                <h3>2012: Add Hadoop (Data Lake)</h3>
                <div class="code-block">Scale: 10M users
Storage: Hadoop HDFS for logs & events
Analytics: MapReduce jobs (batch)

Improvements:
✓ Can store everything
✓ Process large datasets
✓ App DB not impacted

New Problems:
- Hard to query (need to write MapReduce)
- No real-time analytics
- Data quality issues</div>

                <h3>2015: Add Data Warehouse</h3>
                <div class="code-block">Scale: 50M users
Storage: Lake (HDFS) + Warehouse (custom)
Analytics: Warehouse for BI, Lake for ML

Architecture:
- Raw events → Hadoop
- Processed data → Warehouse
- Analysts use warehouse
- DS/engineers use lake

Improvements:
✓ Analysts self-serve with SQL
✓ ML team has raw data
✓ Best of both worlds</div>

                <h3>2020: Cloud Migration</h3>
                <div class="code-block">Scale: 400M users
Storage: GCS (lake) + BigQuery (warehouse)
Analytics: Both, depending on use case

Modern Setup:
- GCS for raw storage (petabytes)
- BigQuery for analytics (TB of curated data)
- Streaming from Kafka to both
- Costs optimized (right tool for right job)

Key Lessons:
1. Started simple (just PostgreSQL)
2. Added complexity only when needed
3. Hybrid approach (not all-in on one)
4. Migrated gradually (no big bang)
5. Cloud gave them scale + flexibility</div>

                <h2>Your Action Plan</h2>

                <h3>Starting Today (< 10 GB data)</h3>
                <div class="code-block">Start With:
- CSV files in S3
- OR small PostgreSQL database
- OR Google Sheets (seriously!)

Query With:
- SQL in PostgreSQL
- Athena for S3
- Python + Pandas

When to Upgrade:
- Data > 100 GB
- Queries too slow
- Multiple people need access</div>

                <h3>Growing (10 GB - 1 TB)</h3>
                <div class="code-block">Add:
- Data warehouse (Snowflake/BigQuery)
- Parquet files in S3 (not CSV)
- dbt for transformations

Architecture:
Source → S3 (raw) → Warehouse (processed) → Dashboards

Cost: $500-2000/month depending on usage</div>

                <h3>Scale (> 1 TB)</h3>
                <div class="code-block">Mature Architecture:
- Lake: S3 (multi-tier: bronze/silver/gold)
- Warehouse: Snowflake/BigQuery (key tables)
- Catalog: AWS Glue / Databricks Unity
- Orchestration: Airflow
- Transform: dbt + Spark

Cost: $5k-50k/month depending on scale

When to Consider Lakehouse:
- Need warehouse performance + lake flexibility
- Budget for Databricks/Dremio
- Team has expertise

Otherwise: Stick with lake + warehouse hybrid</div>

                <h2>Summary: The Simple Truth</h2>

                <p><strong>Data Warehouse</strong>: For analysts who need fast SQL queries on clean data</p>
                <p><strong>Data Lake</strong>: For cheap storage of raw data and ML workloads</p>
                <p><strong>Both Together</strong>: What most companies actually need</p>
                <p><strong>Lakehouse</strong>: When you outgrow the hybrid and budget allows</p>

                <p>Start simple. Add complexity only when current solution breaks. Focus on delivering value, not building the perfect architecture.</p>
            \`,
            interviews: [
                {
                    question: "Why can't we just query the data lake directly for dashboards?",
                    answer: "You CAN, but: 1) Slow - scanning raw files takes 30-60 seconds vs warehouse's 1-2 seconds, 2) Expensive - scanning entire dataset costs more than warehouse's indexed queries, 3) No optimization - can't pre-aggregate or index, 4) Inconsistent performance - depends on file size/format, 5) Complex for analysts - need to understand file formats, partitioning. Exception: If queries are rare (weekly reports), data lake queries are fine. For interactive dashboards (50+ queries/day), warehouse is worth it."
                },
                {
                    question: "How do you prevent a data lake from becoming a data swamp?",
                    answer: "Governance from day 1: 1) Folder structure - enforce naming (/source/table/year/month/day), 2) Metadata catalog - document every dataset (AWS Glue, Alation), 3) Data quality - validate on ingestion, reject bad data, 4) Access control - not everyone writes everywhere, 5) Lifecycle policies - archive/delete old data automatically, 6) Monitoring - track what's used, delete unused, 7) Documentation - README for each dataset. Also: periodic cleanup sprints, data ownership (every dataset has an owner)."
                },
                {
                    question: "When would you choose BigQuery over Snowflake?",
                    answer: "Choose BigQuery if: 1) Already on GCP (native integration), 2) Pay-per-query model preferred (vs Snowflake's compute cluster), 3) Separate large infrequent queries (BigQuery's serverless better), 4) ML integration needed (BigQuery ML built-in). Choose Snowflake if: 1) Multi-cloud needed, 2) Predictable costs preferred (dedicated compute), 3) Lots of concurrent queries (Snowflake's warehouse model better), 4) Need time travel > 7 days (Snowflake: 90 days, BigQuery: 7 days). Both are excellent - choice often driven by existing cloud provider."
                },
                {
                    question: "How do you migrate from an old data warehouse to a new one without breaking dashboards?",
                    answer: "Dual-write strategy: 1) Set up new warehouse in parallel, 2) Start writing new data to BOTH old and new, 3) Backfill historical data to new warehouse, 4) Validate: compare queries old vs new (same results?), 5) Migrate dashboards one-by-one (A/B test first), 6) Monitor for 2-4 weeks, 7) Only decommission old when 100% traffic on new. Key: Never do big-bang cutover. Timeline: 3-6 months for large orgs. Alternative: Use BI tool abstraction layer (dbt semantic layer, Looker LookML) - change source without changing dashboards."
                },
                {
                    question: "What's the ROI calculation for choosing warehouse vs lake for a specific use case?",
                    answer: "Compare total cost: Lake = Storage + Query cost. Warehouse = Storage + Compute cost. Example: 1TB data, 100 queries/day. Lake: $23/mo storage + (100 queries × $5/TB × 0.1TB scanned × 30 days) = $1,523/mo. Warehouse: $40/mo storage + (small cluster 2hrs/day × $2/hr × 30) = $160/mo. Warehouse wins! But if 10 queries/month: Lake $23, Warehouse still $160. Lake wins. Rule: Frequent queries (>10/day) = warehouse. Rare queries = lake. Also factor: analyst time (warehouse faster = less waiting = more value)."
                }
            ]
        }
    ]
};
