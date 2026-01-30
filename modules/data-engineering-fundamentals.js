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
        }
    ]
};
