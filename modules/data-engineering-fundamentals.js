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
        },
        {
            id: 'data-modeling',
            title: 'Data Modeling: Making Data Usable',
            duration: '50 min',
            content: \`
                <h2>Why Data Modeling Matters</h2>
                <p>Raw data is like ingredients. Data modeling is the recipe. You can have the best ingredients, but without a good recipe, you get a mess.</p>

                <p>A good data model makes queries fast, data easy to understand, and mistakes hard to make. A bad model? Slow queries, confused users, and constant "why don't these numbers match?" questions.</p>

                <h2>Normalized vs Denormalized: The Core Tradeoff</h2>

                <h3>Normalization (OLTP - Transactional Databases)</h3>

                <div class="code-block">What It Is:
- Break data into many small tables
- Minimize redundancy
- Each fact stored once

Example - E-commerce (Normalized):

orders
- order_id
- user_id (foreign key to users)
- created_at

order_items
- item_id
- order_id (foreign key to orders)
- product_id (foreign key to products)
- quantity
- price

users
- user_id
- name
- email

products
- product_id
- name
- category

Benefits:
✓ No data duplication
✓ Easy to update (change user email once)
✓ Data integrity (foreign keys enforce consistency)
✓ Saves storage

Downsides:
✗ Queries require many JOINs
✗ Slow for analytics
✗ Complex queries

Best For: Production databases, OLTP workloads</div>

                <h3>Denormalization (OLAP - Analytics Databases)</h3>

                <div class="code-block">What It Is:
- Combine data into fewer, wider tables
- Duplicate data intentionally
- Optimize for reads

Example - Same E-commerce (Denormalized):

fact_orders
- order_id
- user_id
- user_name          ← duplicated
- user_email         ← duplicated
- product_id
- product_name       ← duplicated
- product_category   ← duplicated
- quantity
- price
- order_date

Benefits:
✓ Fast queries (no JOINs needed)
✓ Simple to understand
✓ Great for analytics/reporting

Downsides:
✗ Data duplication
✗ Takes more storage
✗ Updates are complex (change user name in many places)

Best For: Data warehouses, analytics, reporting</div>

                <h3>The Real-World Approach</h3>

                <div class="code-block">Production DB (Normalized):
orders → order_items → products → users
- Many tables, normalized
- Fast writes, consistent data

Analytics Warehouse (Denormalized):
fact_orders (everything in one table)
- Copied from production DB nightly
- Denormalized for fast reads
- Some duplication acceptable

Result:
✓ Production DB stays fast (normalized)
✓ Warehouse enables fast analytics (denormalized)
✓ Best of both worlds</div>

                <h2>Star Schema: The Analytics Standard</h2>

                <p>Star schema is the most common pattern for data warehouses. Named because it looks like a star: one central fact table surrounded by dimension tables.</p>

                <h3>Anatomy of a Star Schema</h3>

                <div class="code-block">Center: FACT Table (metrics/events/transactions)
- Contains measurements/metrics
- Contains foreign keys to dimensions
- Many rows (millions to billions)

Points: DIMENSION Tables (context/attributes)
- Describes who/what/where/when
- Relatively few rows (thousands to millions)
- Contains descriptive attributes

Example - Retail Sales:

FACT: fact_sales
- sale_id
- date_id (FK → dim_date)
- product_id (FK → dim_product)
- store_id (FK → dim_store)
- customer_id (FK → dim_customer)
- quantity
- revenue
- cost

DIM: dim_date
- date_id
- date
- day_of_week
- month
- quarter
- year
- is_holiday

DIM: dim_product
- product_id
- product_name
- category
- brand
- price

DIM: dim_store
- store_id
- store_name
- city
- state
- region

DIM: dim_customer
- customer_id
- name
- age_group
- income_bracket
- join_date</div>

                <h3>Why Star Schema Works</h3>

                <div class="code-block">Query Example: "Revenue by product category last quarter"

SELECT
  p.category,
  SUM(s.revenue) as total_revenue
FROM fact_sales s
JOIN dim_product p ON s.product_id = p.product_id
JOIN dim_date d ON s.date_id = d.date_id
WHERE d.quarter = 'Q4' AND d.year = 2024
GROUP BY p.category
ORDER BY total_revenue DESC;

Benefits:
✓ Only 2 JOINs (not 10+)
✓ Query is readable
✓ Warehouse can optimize (pre-aggregate)
✓ Business users can write this

Performance:
- Without optimization: 5-10 seconds
- With materialized aggregate: < 1 second</div>

                <h3>Real Example: Walmart's Star Schema</h3>

                <div class="code-block">Scale:
- 500M+ transactions per day
- 100,000+ products
- 5,000+ stores
- 10+ years of history

Fact Table: fact_transactions (billions of rows)
- Contains: sale_id, date_id, product_id, store_id, quantity, amount

Dimension Tables:
- dim_date: 3,650 rows (10 years of dates)
- dim_product: 100,000 rows
- dim_store: 5,000 rows
- dim_time: 86,400 rows (every second of day)

Key Optimizations:
1. Fact table partitioned by date (query only needed dates)
2. Dimensions pre-joined and cached
3. Common queries materialized (pre-computed)

Query Performance:
"Top 10 products this week": < 2 seconds (scanning 3.5M rows)
"Sales trend by region last year": < 5 seconds (with aggregation)

Without star schema? Same queries would take minutes.</div>

                <h2>Slowly Changing Dimensions (SCD)</h2>

                <p>What happens when dimension data changes? Customer moves to new state. Product gets new category. Store changes region.</p>

                <h3>Type 1: Overwrite (No History)</h3>

                <div class="code-block">Approach: Just update the record

Example:
Customer moves from CA to NY

Before:
customer_id | name  | state
1001        | Alice | CA

After:
customer_id | name  | state
1001        | Alice | NY

Result:
✓ Simple
✓ Current data always correct
✗ Lost history (can't analyze by old state)

Use When:
- History doesn't matter (fixing typos)
- State changes are rare
- Simplicity preferred</div>

                <h3>Type 2: Add New Row (Full History)</h3>

                <div class="code-block">Approach: Keep old row, add new row with dates

Example:
Customer moves from CA to NY

Before:
id | customer_id | name  | state | valid_from | valid_to   | is_current
1  | 1001        | Alice | CA    | 2020-01-01 | NULL       | TRUE

After:
id | customer_id | name  | state | valid_from | valid_to   | is_current
1  | 1001        | Alice | CA    | 2020-01-01 | 2024-01-15 | FALSE
2  | 1001        | Alice | NY    | 2024-01-15 | NULL       | TRUE

Query for current:
SELECT * FROM dim_customer WHERE is_current = TRUE

Query for point-in-time (what state on 2023-06-01?):
SELECT * FROM dim_customer
WHERE customer_id = 1001
  AND valid_from <= '2023-06-01'
  AND (valid_to > '2023-06-01' OR valid_to IS NULL)

Result:
✓ Complete history preserved
✓ Can analyze trends over time
✗ More complex queries
✗ Table grows larger

Use When:
- History matters for analysis
- Need point-in-time reporting
- Audit requirements</div>

                <h3>Type 3: Add Column (Limited History)</h3>

                <div class="code-block">Approach: Add columns for previous value

Example:
customer_id | name  | current_state | previous_state | effective_date
1001        | Alice | NY            | CA             | 2024-01-15

Result:
✓ Simple (one row per customer)
✓ Can see previous value
✗ Only tracks one change
✗ Limited history

Use When:
- Only need last value
- Changes are rare
- Don't need full history</div>

                <h3>Real Example: LinkedIn's SCD Type 2</h3>

                <div class="code-block">Problem: User changes job title, company

Requirement: Analyze "how many software engineers in 2023 became managers?"

Solution: SCD Type 2 on dim_user

dim_user_profile:
- profile_id
- user_id
- job_title
- company
- valid_from
- valid_to
- is_current

When user updates profile:
1. Set current row's valid_to = today, is_current = FALSE
2. Insert new row with new data, valid_from = today, is_current = TRUE

Analysis Query:
-- Who was a Software Engineer in 2023 and is now a Manager?
WITH engineers_2023 AS (
  SELECT user_id
  FROM dim_user_profile
  WHERE job_title LIKE '%Software Engineer%'
    AND valid_from <= '2023-01-01'
    AND valid_to >= '2023-12-31'
),
managers_now AS (
  SELECT user_id
  FROM dim_user_profile
  WHERE job_title LIKE '%Manager%'
    AND is_current = TRUE
)
SELECT COUNT(DISTINCT e.user_id)
FROM engineers_2023 e
JOIN managers_now m ON e.user_id = m.user_id;

Result: Can track career progression over time</div>

                <h2>Kimball vs Inmon: Two Schools of Thought</h2>

                <h3>Kimball (Bottom-Up, Dimensional)</h3>

                <div class="code-block">Approach:
- Start with business process
- Build star schemas per department
- Create data marts
- Conformed dimensions across marts

Architecture:
Source Systems → Staging → Data Marts (stars) → Reports

Example:
- Sales mart (fact_sales + dimensions)
- Inventory mart (fact_inventory + dimensions)
- Shared dimensions (dim_product, dim_date)

Pros:
✓ Faster to deliver (one mart at a time)
✓ Business-friendly (denormalized)
✓ Each mart can evolve independently

Cons:
✗ Data duplication across marts
✗ Ensuring consistency is hard
✗ Can become messy over time

Popular With: Agile teams, smaller companies</div>

                <h3>Inmon (Top-Down, Normalized)</h3>

                <div class="code-block">Approach:
- Build enterprise data warehouse (normalized)
- Then create data marts from warehouse
- Single source of truth

Architecture:
Source Systems → Staging → EDW (normalized) → Data Marts → Reports

Example:
- Normalized warehouse (3NF)
- Department-specific marts derived from warehouse
- Ensures consistency

Pros:
✓ Single source of truth
✓ Consistency guaranteed
✓ Better long-term architecture

Cons:
✗ Takes longer to build
✗ More upfront design needed
✗ Can be over-engineered

Popular With: Large enterprises, regulated industries</div>

                <h3>Modern Reality: Hybrid + ELT</h3>

                <div class="code-block">What Actually Works:

1. Raw Layer (Lake): Dump everything, normalized
2. Warehouse Layer: dbt transforms into star schemas
3. Mart Layer: Materialized views for specific use cases

Best of Both:
✓ Raw data preserved (Inmon idea)
✓ Fast iteration (Kimball idea)
✓ Transform with SQL (modern ELT)
✓ Version controlled (dbt)

Example with dbt:

-- models/staging/stg_orders.sql
SELECT
  order_id,
  user_id,
  created_at::date as order_date,
  amount
FROM raw.orders

-- models/marts/fact_orders.sql
SELECT
  o.order_id,
  o.user_id,
  d.date_id,
  o.amount
FROM {{ ref('stg_orders') }} o
JOIN {{ ref('dim_date') }} d ON o.order_date = d.date

Result:
- Version controlled transformations
- Easy to iterate and change
- Can rebuild entire warehouse from scratch
- Best practices enforced</div>

                <h2>Common Data Modeling Mistakes</h2>

                <h3>1. Over-Normalization in Warehouse</h3>

                <div class="code-block">Mistake: Apply OLTP normalization to warehouse

Bad:
fact_sales → order_items → orders → users → addresses → cities → states

Query:
SELECT state, SUM(revenue)
FROM fact_sales
JOIN order_items ON ...
JOIN orders ON ...
JOIN users ON ...
JOIN addresses ON ...
JOIN cities ON ...
JOIN states ON ...
GROUP BY state

Result: 6 JOINs for simple query, takes 30 seconds

Better:
fact_sales (includes state_id → dim_state)

Query:
SELECT s.state_name, SUM(f.revenue)
FROM fact_sales f
JOIN dim_state s ON f.state_id = s.state_id
GROUP BY s.state_name

Result: 1 JOIN, takes 2 seconds

Lesson: Denormalize in warehouse, it's OK to duplicate data</div>

                <h3>2. Not Planning for Growth</h3>

                <div class="code-block">Mistake: Design for today's data size

Example:
fact_sales (1M rows today)
- No partitioning
- No indexes
- Works fine!

2 Years Later:
fact_sales (500M rows)
- Queries timeout
- Can't add partition (need to rebuild)
- Massive effort to fix

Better: Design from day 1
CREATE TABLE fact_sales (
  ...columns...
)
PARTITION BY RANGE (order_date) (
  PARTITION p2024_q1 VALUES LESS THAN ('2024-04-01'),
  PARTITION p2024_q2 VALUES LESS THAN ('2024-07-01'),
  ...
);

Result:
- Queries only scan needed partitions
- Can drop old partitions easily
- Scales to billions of rows</div>

                <h3>3. Too Many Dimensions</h3>

                <div class="code-block">Mistake: Create dimension for everything

Bad:
fact_sales
- date_id
- time_id
- product_id
- store_id
- customer_id
- employee_id
- promotion_id
- payment_method_id
- shipping_method_id
- weather_id
- traffic_source_id

Result:
- 10+ dimensions
- Most rarely used
- JOINs become complex
- Users confused

Better:
- Core dimensions (date, product, store, customer)
- Less important data as columns in fact table
- Create dimension only if queried frequently

Rule of thumb: 3-7 dimensions per fact table</div>

                <h2>Data Modeling Tools</h2>

                <table class="table">
                    <tr>
                        <th>Tool</th>
                        <th>Use Case</th>
                        <th>Learning Curve</th>
                    </tr>
                    <tr>
                        <td><strong>dbt</strong></td>
                        <td>SQL transformations, version control, testing</td>
                        <td>Low (if you know SQL)</td>
                    </tr>
                    <tr>
                        <td><strong>Dataform</strong></td>
                        <td>Like dbt, native to BigQuery</td>
                        <td>Low</td>
                    </tr>
                    <tr>
                        <td><strong>LookML</strong></td>
                        <td>Modeling for Looker BI tool</td>
                        <td>Medium</td>
                    </tr>
                    <tr>
                        <td><strong>ER/Studio</strong></td>
                        <td>Visual data modeling, documentation</td>
                        <td>High</td>
                    </tr>
                </table>

                <h2>Checklist for Good Data Model</h2>

                <ul>
                    <li>✅ <strong>Understandable</strong> - Non-technical users can grasp it</li>
                    <li>✅ <strong>Performant</strong> - Common queries run in < 5 seconds</li>
                    <li>✅ <strong>Scalable</strong> - Works with 10x data growth</li>
                    <li>✅ <strong>Maintainable</strong> - Easy to add new columns/tables</li>
                    <li>✅ <strong>Documented</strong> - Every table/column has description</li>
                    <li>✅ <strong>Tested</strong> - Data quality checks in place</li>
                    <li>✅ <strong>Versioned</strong> - Schema changes tracked in git</li>
                </ul>

                <p>Remember: <strong>The best data model is one that users actually use</strong>. Perfection is the enemy of done. Start simple, iterate based on real usage.</p>
            \`,
            interviews: [
                {
                    question: "How do you handle many-to-many relationships in a star schema?",
                    answer: "Create a bridge table (factless fact table). Example: Students-to-Courses is many-to-many. Create fact_enrollments with student_id, course_id, enrollment_date. This becomes your fact table. Then can analyze: 'how many students per course', 'how many courses per student'. Alternative: Denormalize into array column if warehouse supports (BigQuery ARRAY, Snowflake ARRAY). Trade-off: Bridge table is more flexible, arrays are simpler for specific queries."
                },
                {
                    question: "When should you use a surrogate key vs natural key?",
                    answer: "Use surrogate keys (auto-generated IDs) in warehouse dimensions. Why: 1) Natural keys can change (SSN, email), surrogate never changes, 2) Natural keys might be composite (first_name + last_name + DOB), surrogate is single column, 3) Natural keys have meaning (can change), surrogate is meaningless (stable), 4) Handles SCD Type 2 cleanly (same natural key, different surrogate keys). Exception: Use natural key if truly immutable (country_code, date). Example: dim_customer has surrogate customer_key (1,2,3...) and natural customer_id from source."
                },
                {
                    question: "How do you model data when business rules frequently change?",
                    answer: "Use configuration tables instead of hard-coded logic. Example: Tax rates change by state. Bad: Hard-code in SQL (CASE WHEN state='CA' THEN 0.0725). Good: Create dim_tax_rates(state, rate, effective_from, effective_to). Query joins to get correct rate. When rates change: INSERT new row, don't modify code. Also: Use SCD Type 2 for changing business rules. Keep history of what rule applied when. Can reprocess historical data with rules that were active at the time."
                },
                {
                    question: "What's the difference between a fact table and a dimension table?",
                    answer: "Facts = measurements/metrics (what you analyze). Dimensions = context (how you slice/dice). Facts: numeric, additive, many rows, change frequently. Examples: sales_amount, quantity, duration. Dimensions: descriptive, categorical, fewer rows, change slowly. Examples: product_name, customer_city, date. Rule: If you use it in GROUP BY → dimension. If you use it in SUM/AVG/COUNT → fact. Exception: Degenerate dimensions (transaction_id in fact table, not separate dimension)."
                },
                {
                    question: "How do you test data models before deploying to production?",
                    answer: "Multi-layer testing: 1) Schema tests (columns exist, data types correct), 2) Data quality tests (no nulls in required fields, values in range), 3) Business logic tests (revenue = quantity × price), 4) Historical comparison (row counts match source), 5) Performance tests (queries under SLA). Use dbt tests: uniqueness, not_null, relationships, accepted_values. Also: Deploy to dev warehouse first, run subset of queries, compare results with production, get stakeholder approval, then deploy to prod. Never deploy untested model to production."
                }
            ]
        },
        {
            id: 'data-quality-testing',
            title: 'Data Quality: Trust But Verify',
            duration: '50 min',
            content: \`
                <h2>Why Data Quality Matters</h2>
                <p>Here's a painful truth: <strong>Bad data is worse than no data</strong>. With no data, people know they don't know. With bad data, they make wrong decisions confidently.</p>

                <h3>Real Disaster Story - Uber's $100M Mistake</h3>
                <div class="code-block">The Problem:
Uber's pricing algorithm relied on driver location data
Data quality issue: GPS coordinates occasionally flipped lat/long
Result: Surge pricing in wrong areas, drivers sent to wrong locations
Impact: Millions in lost revenue, angry customers and drivers

Root Cause: No validation that latitude was -90 to 90
Fix: Data quality checks on every GPS coordinate
Lesson: One missing validation = millions lost</div>

                <h2>The Six Dimensions of Data Quality</h2>

                <h3>1. Accuracy - Is the data correct?</h3>
                <p><strong>Real example from retail company:</strong></p>
                <div class="code-block">Problem: Product prices in warehouse didn't match website
Source: Website shows $29.99
Warehouse: $2999 (missing decimal point)

Detection:
SELECT product_id, price
FROM products
WHERE price > 10000  -- No product should cost $10k
OR price < 0.01      -- No product should cost $0

Fix: Add validation at ingestion
- Check price range makes sense
- Alert if price changes >50% in one day
- Require manual approval for big price changes</div>

                <h3>2. Completeness - Is all data present?</h3>
                <div class="code-block">Check for missing critical fields:

SELECT
    COUNT(*) as total_orders,
    COUNT(customer_email) as orders_with_email,
    COUNT(*) - COUNT(customer_email) as missing_emails,
    ROUND(100.0 * COUNT(customer_email) / COUNT(*), 2) as completeness_pct
FROM orders
WHERE order_date = CURRENT_DATE;

Alert if: completeness_pct < 95%

Real case: Marketing can't email 20% of customers
Impact: $2M annual revenue lost
Root cause: Email field not required in checkout form</div>

                <h3>3. Consistency - Does data agree across sources?</h3>
                <p><strong>Netflix example:</strong></p>
                <div class="code-block">Data from 3 sources:
- Application DB: 150M active subscribers
- Billing system: 148M paid subscriptions
- Analytics warehouse: 152M users

Which is right? They should match!

Investigation found:
- App DB counts free trials (not paid yet)
- Billing excludes paused accounts (still active)
- Warehouse had duplicates from botched migration

Solution:
1. Define "active subscriber" clearly
2. Add reconciliation job (runs daily)
3. Alert if sources differ by >1%
4. Weekly manual review</div>

                <h3>4. Timeliness - Is data fresh enough?</h3>
                <div class="code-block">Check data freshness:

SELECT
    MAX(updated_at) as last_update,
    TIMESTAMPDIFF(MINUTE, MAX(updated_at), NOW()) as minutes_stale
FROM user_activity_summary;

-- Alert if data is >2 hours old
IF minutes_stale > 120 THEN
    ALERT("User activity data is stale!")
END IF

Real example from fraud detection:
- Credit card fraud needs real-time data
- Batch updates every 24 hours = too slow
- Fraud happens in minutes, not days
- Solution: Stream processing with Kafka (< 1 min latency)</div>

                <h3>5. Validity - Does data follow business rules?</h3>
                <div class="code-block">Business rules validation:

-- Age should be realistic
SELECT * FROM users WHERE age < 13 OR age > 120;

-- Email format
SELECT * FROM users WHERE email NOT LIKE '%@%.%';

-- Future dates (common bug!)
SELECT * FROM orders WHERE order_date > CURRENT_DATE;

-- Negative quantities
SELECT * FROM line_items WHERE quantity <= 0;

-- Referential integrity
SELECT o.order_id
FROM orders o
LEFT JOIN customers c ON o.customer_id = c.customer_id
WHERE c.customer_id IS NULL;  -- Orphaned orders!</div>

                <h3>6. Uniqueness - No unwanted duplicates?</h3>
                <p><strong>Airbnb's duplicate problem:</strong></p>
                <div class="code-block">Issue: Same listing appearing multiple times in search
Cause: ETL job ran twice due to retry logic
Impact: Confused users, skewed analytics

Detection query:
SELECT
    listing_id,
    COUNT(*) as duplicate_count
FROM listings
GROUP BY listing_id
HAVING COUNT(*) > 1;

Prevention:
1. Add UNIQUE constraint on listing_id
2. Use UPSERT instead of INSERT
3. Idempotent pipeline design
4. Deduplication step before loading</div>

                <h2>Data Quality Framework</h2>

                <h3>Great Expectations - Industry Standard Tool</h3>
                <div class="code-block">Python example:

import great_expectations as gx

# Create expectation suite
suite = gx.ExpectationSuite(name="orders_suite")

# Define expectations
suite.expect_column_values_to_not_be_null("customer_id")
suite.expect_column_values_to_be_between("amount", min_value=0, max_value=100000)
suite.expect_column_values_to_be_in_set("status", ["pending", "paid", "shipped", "delivered"])
suite.expect_column_values_to_match_regex("email", "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$")

# Validate data
results = gx.validate(dataframe, expectation_suite=suite)

if not results.success:
    send_alert("Data quality check failed!")
    stop_pipeline()  # Don't load bad data!</div>

                <h3>Building a Data Quality Pipeline</h3>
                <div class="code-block">Quality gates in data pipeline:

1. SOURCE VALIDATION (at ingestion)
   ├── Schema matches expected
   ├── No malformed records
   └── File size reasonable (not 0 bytes or unexpectedly huge)

2. TRANSFORMATION VALIDATION
   ├── Row count: output ≈ input (within threshold)
   ├── No unexpected nulls
   └── Numeric values in expected ranges

3. LOAD VALIDATION
   ├── Primary keys unique
   ├── Foreign keys valid
   └── No data loss (count source vs target)

4. POST-LOAD VALIDATION
   ├── Reconciliation with source
   ├── Business metric sanity checks
   └── Historical comparison (similar to yesterday?)

If ANY check fails → STOP pipeline → Alert engineer</div>

                <h2>Data Quality Metrics to Track</h2>

                <table class="table">
                    <tr>
                        <th>Metric</th>
                        <th>How to Calculate</th>
                        <th>Good Threshold</th>
                    </tr>
                    <tr>
                        <td><strong>Null Rate</strong></td>
                        <td>(NULL count / total rows) × 100</td>
                        <td>< 5% for critical fields</td>
                    </tr>
                    <tr>
                        <td><strong>Duplicate Rate</strong></td>
                        <td>(Duplicate rows / total rows) × 100</td>
                        <td>0% for unique keys</td>
                    </tr>
                    <tr>
                        <td><strong>Freshness</strong></td>
                        <td>Current time - last update time</td>
                        <td>Depends on use case</td>
                    </tr>
                    <tr>
                        <td><strong>Schema Drift</strong></td>
                        <td>Compare current vs expected schema</td>
                        <td>0 unexpected changes</td>
                    </tr>
                    <tr>
                        <td><strong>Volume Anomaly</strong></td>
                        <td>Compare today's row count vs 7-day average</td>
                        <td>Within 20% of average</td>
                    </tr>
                </table>

                <h2>Monitoring & Alerting Strategy</h2>

                <h3>What to Alert On</h3>
                <div class="code-block">CRITICAL ALERTS (wake someone up):
❌ Pipeline completely failed
❌ Data freshness > 4 hours (for real-time systems)
❌ Zero rows loaded (should have data)
❌ Revenue metric drops to $0
❌ >50% of records failing validation

WARNING ALERTS (check during work hours):
⚠️ Data freshness > 2 hours
⚠️ Null rate increased by 10%
⚠️ Row count differs from yesterday by >30%
⚠️ Schema change detected
⚠️ Processing time doubled

INFO (just log it):
ℹ️ Small validation failures (<1%)
ℹ️ Expected schema evolution
ℹ️ Successful pipeline runs</div>

                <h3>Real Monitoring Setup - Airflow + Slack</h3>
                <div class="code-block">Python example in Airflow DAG:

from airflow.operators.python_operator import PythonOperator
from airflow.providers.slack.operators.slack_webhook import SlackWebhookOperator

def check_data_quality(**context):
    # Run quality checks
    null_rate = check_null_rate('orders', 'customer_id')
    duplicate_rate = check_duplicates('orders', 'order_id')

    if null_rate > 0.05:  # >5% nulls
        raise Exception(f"Null rate too high: {null_rate}")

    if duplicate_rate > 0:
        raise Exception(f"Duplicates found: {duplicate_rate}")

    return "Quality checks passed"

# Task in DAG
quality_check = PythonOperator(
    task_id='check_quality',
    python_callable=check_data_quality,
    on_failure_callback=send_slack_alert  # Alert if fails
)

# Alert function
def send_slack_alert(context):
    slack_msg = f"""
    :x: Data Quality Check Failed
    DAG: {context['dag_run'].dag_id}
    Task: {context['task_instance'].task_id}
    Error: {context['exception']}
    Log: {context['task_instance'].log_url}
    """
    SlackWebhookOperator(
        task_id='slack_alert',
        http_conn_id='slack_webhook',
        message=slack_msg
    ).execute(context)</div>

                <h2>Common Data Quality Mistakes</h2>

                <h3>1. Testing in Production</h3>
                <div class="code-block">WRONG:
Load data to production → Find issues → Fix and reload

RIGHT:
Load to staging → Run quality checks → Fix issues → Load to production

Lesson from Stripe:
- All data goes through staging first
- Automated tests run (takes 15 minutes)
- Manual approval for big changes
- Zero production data quality incidents in 2 years</div>

                <h3>2. No Baseline Metrics</h3>
                <div class="code-block">WRONG:
"This data looks okay" (subjective)

RIGHT:
Track historical metrics, detect anomalies

Example:
Orders table usually has:
- 10,000-12,000 rows per day
- 2-3% null emails
- 0 duplicates

Today:
- 8,500 rows (15% drop - investigate!)
- 8% null emails (3x normal - alert!)
- 12 duplicates (should be 0 - fix!)</div>

                <h3>3. Ignoring Data Lineage</h3>
                <div class="code-block">Problem: Bad data in report, but where did it come from?

Without lineage:
- Check 20+ tables manually
- Hours/days to find root cause
- Might miss the actual source

With lineage (tools like dbt, DataHub):
revenue_report
  ← agg_daily_revenue
    ← fact_transactions
      ← stg_stripe_payments  ← ❌ SOURCE OF BUG
      ← stg_paypal_payments

Found root cause in minutes, not hours</div>

                <h2>Data Quality Checklist</h2>

                <ul>
                    <li>✅ <strong>Schema validation</strong> - Every field expected exists</li>
                    <li>✅ <strong>Null checks</strong> - Critical fields not null</li>
                    <li>✅ <strong>Range checks</strong> - Values within bounds</li>
                    <li>✅ <strong>Uniqueness</strong> - Primary keys unique</li>
                    <li>✅ <strong>Referential integrity</strong> - Foreign keys valid</li>
                    <li>✅ <strong>Freshness</strong> - Data updated recently</li>
                    <li>✅ <strong>Volume</strong> - Row count reasonable</li>
                    <li>✅ <strong>Distribution</strong> - Values distributed normally</li>
                    <li>✅ <strong>Reconciliation</strong> - Matches source system</li>
                    <li>✅ <strong>Business rules</strong> - Domain-specific validations</li>
                </ul>

                <p><strong>Remember:</strong> Data quality is not a one-time setup. It's an ongoing process. Monitor, measure, and improve continuously.</p>
            \`,
            interviews: [
                {
                    question: "How would you detect a sudden drop in data volume in a pipeline?",
                    answer: "Implement volume anomaly detection: 1) Calculate baseline (7-day or 30-day average row count), 2) Compare today's count to baseline, 3) Alert if difference > threshold (e.g., 30%). SQL: SELECT COUNT(*) as today, (SELECT AVG(row_count) FROM daily_stats WHERE date >= CURRENT_DATE - 7) as avg_last_7_days, ABS(COUNT(*) - avg) / avg * 100 as pct_diff FROM current_table. Also check: a) Is source system down? b) Is it weekend/holiday (expected drop)? c) Is pipeline running on schedule? d) Check logs for errors. Tools: Great Expectations, Monte Carlo, Datafold."
                },
                {
                    question: "What's the difference between data validation and data quality?",
                    answer: "Validation = checking if data meets rules (binary: pass/fail). Quality = measuring how good data is (spectrum: 0-100%). Validation: Is email format correct? Is age > 0? Is foreign key valid? Quality: What % of emails are valid? What's the null rate? How fresh is data? Analogy: Validation is like spell-check (wrong/right). Quality is like grammar score (could be better). In practice: Use validation to reject bad data at ingestion. Use quality metrics to monitor trends and improve over time. Both are needed."
                },
                {
                    question: "How do you handle PII (Personal Identifiable Information) in data quality testing?",
                    answer: "Never use production PII in testing. Strategies: 1) Anonymize in test environment (hash emails, mask SSNs), 2) Generate synthetic data with same statistical properties, 3) Use data masking tools (Delphix, Tonic.ai), 4) Subset production data without PII columns. Example: Instead of testing 'john@example.com', test 'user_***@domain.com'. For testing uniqueness: hash the value, test hash uniqueness. For regex testing: use format check without logging actual value. GDPR/CCPA compliance: PII should never leave production environment. Quality checks run in production, results (not data) exported."
                },
                {
                    question: "What happens when quality checks fail but stakeholders need the data urgently?",
                    answer: "This is a tough spot. Framework: 1) Assess severity (Is data usable with caveats? Or completely wrong?), 2) Calculate risk (Wrong decision from bad data vs no decision from no data), 3) If loading anyway: Add warnings to reports, email stakeholders with known issues, track which decisions were made with bad data, 4) Fix root cause ASAP, 5) Reload correct data when available. Real example: Revenue report has 5% missing transactions. Options: a) Don't publish (stakeholders blind), b) Publish with big warning 'Underreported by ~5%'. Usually: Publish with caveat > no data. But: For compliance/finance data, never compromise. Better to miss deadline than report wrong numbers to SEC."
                },
                {
                    question: "How would you design a data quality dashboard for executives?",
                    answer: "Keep it simple, not technical. Show: 1) Overall health score (0-100, green/yellow/red), 2) Critical issues count (needs immediate action), 3) Trend over time (improving or degrading?), 4) Business impact (which reports affected). Avoid: Technical jargon (null rate, schema drift), raw metrics without context. Example tiles: '✅ Data Quality: 96% (Excellent)', '⚠️ 2 pipelines need attention', '📈 +4% improvement this month', 'Affected: Customer Dashboard, Revenue Report'. Click for details → show which specific checks failed, recommended action, owner. Update: Real-time or daily. Deliver: Email morning summary, Slack channel for alerts, dashboard always available."
                }
            ]
        },
        {
            id: 'orchestration-airflow',
            title: 'Orchestration: Making Pipelines Reliable',
            duration: '55 min',
            content: \`
                <h2>Why You Need Orchestration</h2>
                <p>Let me tell you what happens without orchestration:</p>

                <div class="code-block">No orchestration = Chaos:

# Monday morning cron jobs:
0 2 * * * python extract_users.py
0 3 * * * python extract_orders.py
0 4 * * * python transform_data.py
0 5 * * * python load_to_warehouse.py

What could go wrong?
❌ extract_orders.py fails → transform still runs (on old data)
❌ Database is slow → extract takes 90 min → transform starts before extract finishes
❌ Need to rerun failed job → Have to SSH to server, run manually
❌ Six months later → Nobody remembers what order things should run
❌ Developer leaves → Knowledge lost forever</div>

                <p><strong>Orchestration solves this</strong>: Manages dependencies, handles failures, provides monitoring, and makes pipelines reproducible.</p>

                <h2>Apache Airflow - Industry Standard</h2>

                <h3>Core Concepts in 5 Minutes</h3>

                <table class="table">
                    <tr>
                        <th>Concept</th>
                        <th>What It Is</th>
                        <th>Real Example</th>
                    </tr>
                    <tr>
                        <td><strong>DAG</strong></td>
                        <td>Directed Acyclic Graph - your workflow</td>
                        <td>Daily customer report pipeline</td>
                    </tr>
                    <tr>
                        <td><strong>Task</strong></td>
                        <td>Single unit of work</td>
                        <td>Extract users from MySQL</td>
                    </tr>
                    <tr>
                        <td><strong>Operator</strong></td>
                        <td>Template for a task</td>
                        <td>PythonOperator, BashOperator, SQLOperator</td>
                    </tr>
                    <tr>
                        <td><strong>Dependency</strong></td>
                        <td>Task A must finish before Task B</td>
                        <td>Extract before Transform</td>
                    </tr>
                    <tr>
                        <td><strong>Schedule</strong></td>
                        <td>When to run</td>
                        <td>Daily at 2 AM, Every hour, Manual trigger</td>
                    </tr>
                </table>

                <h3>Your First Airflow DAG</h3>

                <div class="code-block"># dags/daily_user_pipeline.py
from airflow import DAG
from airflow.operators.python_operator import PythonOperator
from airflow.operators.postgres_operator import PostgresOperator
from datetime import datetime, timedelta

# Default arguments for all tasks
default_args = {
    'owner': 'data-team',
    'depends_on_past': False,  # Don't wait for previous run
    'start_date': datetime(2024, 1, 1),
    'email': ['data-team@company.com'],
    'email_on_failure': True,
    'email_on_retry': False,
    'retries': 3,  # Retry 3 times if task fails
    'retry_delay': timedelta(minutes=5),
}

# Define the DAG
dag = DAG(
    'daily_user_pipeline',
    default_args=default_args,
    description='Extract, transform, load user data',
    schedule_interval='0 2 * * *',  # 2 AM daily
    catchup=False,  # Don't backfill past dates
)

# Task 1: Extract from MySQL
def extract_users():
    import pandas as pd
    from sqlalchemy import create_engine

    engine = create_engine('mysql://user:pass@host/db')
    df = pd.read_sql('SELECT * FROM users WHERE updated_at >= CURDATE()', engine)
    df.to_csv('/tmp/users.csv', index=False)
    print(f"Extracted {len(df)} users")

extract_task = PythonOperator(
    task_id='extract_users',
    python_callable=extract_users,
    dag=dag,
)

# Task 2: Transform data
def transform_users():
    import pandas as pd

    df = pd.read_csv('/tmp/users.csv')

    # Data cleaning
    df['email'] = df['email'].str.lower()  # Lowercase emails
    df['signup_date'] = pd.to_datetime(df['signup_date'])
    df = df.dropna(subset=['email'])  # Remove rows with no email

    df.to_csv('/tmp/users_clean.csv', index=False)
    print(f"Transformed {len(df)} users")

transform_task = PythonOperator(
    task_id='transform_users',
    python_callable=transform_users,
    dag=dag,
)

# Task 3: Load to warehouse
load_task = PostgresOperator(
    task_id='load_to_warehouse',
    postgres_conn_id='warehouse',  # Configured in Airflow UI
    sql="""
        COPY staging.users FROM '/tmp/users_clean.csv'
        WITH (FORMAT CSV, HEADER true);

        INSERT INTO prod.users
        SELECT * FROM staging.users
        ON CONFLICT (user_id) DO UPDATE
        SET email = EXCLUDED.email,
            updated_at = CURRENT_TIMESTAMP;
    """,
    dag=dag,
)

# Define dependencies
extract_task >> transform_task >> load_task  # Linear flow</div>

                <h2>Real-World Airflow Patterns</h2>

                <h3>Pattern 1: Fan-Out (Parallel Processing)</h3>
                <div class="code-block"># Extract from multiple sources in parallel

extract_mysql = PythonOperator(task_id='extract_mysql', ...)
extract_mongodb = PythonOperator(task_id='extract_mongodb', ...)
extract_api = PythonOperator(task_id='extract_api', ...)
transform = PythonOperator(task_id='transform', ...)

# All extracts run in parallel, then transform waits for all
[extract_mysql, extract_mongodb, extract_api] >> transform

Benefits:
- 3x faster (parallel vs sequential)
- Used by: Spotify (extract from 50+ services)</div>

                <h3>Pattern 2: Fan-In (Merge Results)</h3>
                <div class="code-block"># Process different customer segments, then merge

process_premium = PythonOperator(task_id='process_premium', ...)
process_free = PythonOperator(task_id='process_free', ...)
process_trial = PythonOperator(task_id='process_trial', ...)
merge_all = PythonOperator(task_id='merge_all', ...)

# All processing happens in parallel, merge waits for all
[process_premium, process_free, process_trial] >> merge_all

Benefits:
- Isolate failures (if premium fails, free/trial still succeed)
- Used by: Netflix (process different content types)</div>

                <h3>Pattern 3: Dynamic Task Generation</h3>
                <div class="code-block"># When you don't know tasks ahead of time

from airflow.operators.python_operator import PythonOperator

def get_countries():
    # Fetch list of countries dynamically
    return ['US', 'UK', 'IN', 'DE', 'FR']  # Could be from DB

countries = get_countries()

# Create one task per country
for country in countries:
    PythonOperator(
        task_id=f'process_{country}',
        python_callable=process_country,
        op_kwargs={'country': country},
        dag=dag,
    )

Real use case - Airbnb:
- Process each market separately
- New market added → Automatically gets pipeline
- No code changes needed</div>

                <h2>Handling Failures Gracefully</h2>

                <h3>Retry Strategy</h3>
                <div class="code-block"># Different retry strategies for different tasks

# Critical task - retry aggressively
critical_task = PythonOperator(
    task_id='send_to_partners',
    python_callable=send_data,
    retries=10,  # Try 10 times
    retry_delay=timedelta(minutes=2),
    retry_exponential_backoff=True,  # 2min, 4min, 8min...
    max_retry_delay=timedelta(hours=1),
)

# Optional task - fail fast
optional_task = PythonOperator(
    task_id='send_slack_notification',
    python_callable=notify_slack,
    retries=1,  # Try once
    trigger_rule='all_done',  # Run even if upstream failed
)

Lessons from production:
- API calls: Retry with backoff (service might be temporarily down)
- Database writes: Retry immediately (might be transient deadlock)
- File operations: Don't retry (if file missing, retrying won't help)</div>

                <h3>Graceful Degradation</h3>
                <div class="code-block"># Don't let optional tasks block critical ones

extract = PythonOperator(task_id='extract_data', ...)
transform = PythonOperator(task_id='transform', ...)
load = PythonOperator(task_id='load_to_warehouse', ...)
send_email = PythonOperator(
    task_id='send_summary_email',
    trigger_rule='all_success',  # Only if everything succeeded
)
update_monitoring = PythonOperator(
    task_id='update_dashboard',
    trigger_rule='all_done',  # Run even if load failed
)

# Critical path
extract >> transform >> load

# Optional
load >> send_email  # Email only if successful
load >> update_monitoring  # Dashboard shows status either way</div>

                <h2>Monitoring & Alerting</h2>

                <h3>What Spotify Monitors</h3>
                <table class="table">
                    <tr>
                        <th>Metric</th>
                        <th>Alert Threshold</th>
                        <th>Action</th>
                    </tr>
                    <tr>
                        <td>Task duration</td>
                        <td>>2x normal</td>
                        <td>Investigate performance</td>
                    </tr>
                    <tr>
                        <td>Failure rate</td>
                        <td>>5% for a DAG</td>
                        <td>Page on-call engineer</td>
                    </tr>
                    <tr>
                        <td>Queue length</td>
                        <td>>100 tasks waiting</td>
                        <td>Scale workers</td>
                    </tr>
                    <tr>
                        <td>Scheduler lag</td>
                        <td>>5 minutes</td>
                        <td>Restart scheduler</td>
                    </tr>
                </table>

                <h3>SLA (Service Level Agreement) Monitoring</h3>
                <div class="code-block"># Set SLA for time-sensitive pipelines

dag = DAG(
    'morning_report',
    default_args={
        'sla': timedelta(hours=1),  # Must complete within 1 hour
    },
    schedule_interval='0 6 * * *',  # 6 AM daily
)

# If task takes >1 hour → Email alert
# Executives need report by 7 AM for morning meeting

Real example - Financial trading firm:
- Market data must load by 9:30 AM (market open)
- SLA: 15 minutes
- Miss SLA → Can't trade → Millions lost
- Solution: Multiple redundant pipelines, failover</div>

                <h2>Testing Airflow DAGs</h2>

                <div class="code-block"># tests/test_user_pipeline.py
import pytest
from airflow.models import DagBag

def test_dag_loads():
    """DAG should load without errors"""
    dagbag = DagBag(dag_folder='dags/', include_examples=False)
    assert len(dagbag.import_errors) == 0, "DAG import errors"

def test_task_count():
    """Should have expected number of tasks"""
    dagbag = DagBag(dag_folder='dags/')
    dag = dagbag.get_dag('daily_user_pipeline')
    assert len(dag.tasks) == 3, "Should have 3 tasks"

def test_dependencies():
    """Tasks should have correct dependencies"""
    dagbag = DagBag(dag_folder='dags/')
    dag = dagbag.get_dag('daily_user_pipeline')

    extract = dag.get_task('extract_users')
    transform = dag.get_task('transform_users')

    assert transform in extract.downstream_list

def test_schedule():
    """Should run daily at 2 AM"""
    dagbag = DagBag(dag_folder='dags/')
    dag = dagbag.get_dag('daily_user_pipeline')
    assert dag.schedule_interval == '0 2 * * *'

Run tests before deploying:
pytest tests/
If tests pass → Deploy to production</div>

                <h2>Common Orchestration Mistakes</h2>

                <h3>1. Not Idempotent Pipelines</h3>
                <div class="code-block">BAD (not idempotent):
INSERT INTO users SELECT * FROM staging_users;
-- Running twice = duplicate data!

GOOD (idempotent):
DELETE FROM users WHERE date = '2024-01-01';
INSERT INTO users SELECT * FROM staging_users WHERE date = '2024-01-01';
-- Running multiple times = same result

Or better:
MERGE INTO users USING staging_users
ON users.user_id = staging_users.user_id
WHEN MATCHED THEN UPDATE
WHEN NOT MATCHED THEN INSERT;

Why: Airflow will retry failed tasks
If not idempotent → Retries create duplicates</div>

                <h3>2. Putting Too Much Logic in DAG File</h3>
                <div class="code-block">BAD:
# DAG file has 1000 lines of business logic
def transform_users():
    # 500 lines of transformation code here...

GOOD:
# DAG file is thin wrapper
from src.transforms import transform_users

transform_task = PythonOperator(
    task_id='transform_users',
    python_callable=transform_users,  # Imported from separate module
)

Why:
- DAG file parsed every 30 seconds (Airflow scheduler)
- Heavy logic slows down scheduler
- Can't unit test code in DAG file easily</div>

                <h3>3. No Resource Limits</h3>
                <div class="code-block">BAD:
# No memory/CPU limits
# 10 tasks start simultaneously
# Server runs out of memory
# Everything crashes

GOOD:
# DAG level
dag = DAG(
    'resource_intensive',
    max_active_runs=1,  # Only one DAG run at a time
    concurrency=3,  # Max 3 tasks in parallel
)

# Airflow config
parallelism = 32  # Max tasks across all DAGs
dag_concurrency = 16  # Max tasks per DAG
worker_concurrency = 4  # Max tasks per worker

Netflix lesson:
- Started with no limits
- Black Friday: 1000s of DAGs triggered
- Cluster crashed
- Now: Strict limits, auto-scaling</div>

                <h2>Airflow Alternatives</h2>

                <table class="table">
                    <tr>
                        <th>Tool</th>
                        <th>Best For</th>
                        <th>Pros</th>
                        <th>Cons</th>
                    </tr>
                    <tr>
                        <td><strong>Airflow</strong></td>
                        <td>Complex workflows</td>
                        <td>Flexible, huge ecosystem</td>
                        <td>Complex setup</td>
                    </tr>
                    <tr>
                        <td><strong>Prefect</strong></td>
                        <td>Python-heavy teams</td>
                        <td>Pythonic, modern UI</td>
                        <td>Smaller community</td>
                    </tr>
                    <tr>
                        <td><strong>Dagster</strong></td>
                        <td>Data testing focus</td>
                        <td>Great testing, type safety</td>
                        <td>Learning curve</td>
                    </tr>
                    <tr>
                        <td><strong>dbt</strong></td>
                        <td>SQL transformations</td>
                        <td>Simple, SQL-based</td>
                        <td>Only SQL, no API calls</td>
                    </tr>
                    <tr>
                        <td><strong>AWS Step Functions</strong></td>
                        <td>AWS-native workloads</td>
                        <td>Serverless, no ops</td>
                        <td>Vendor lock-in</td>
                    </tr>
                </table>

                <p><strong>Industry usage:</strong> Airbnb, Uber, Lyft, Twitter → Airflow. dbt Labs → Dagster. Startups → Prefect or AWS Step Functions.</p>

                <h2>Orchestration Checklist</h2>

                <ul>
                    <li>✅ <strong>Idempotent tasks</strong> - Safe to rerun</li>
                    <li>✅ <strong>Proper dependencies</strong> - Clear task order</li>
                    <li>✅ <strong>Retry logic</strong> - Handles transient failures</li>
                    <li>✅ <strong>Monitoring</strong> - Alerts on failures</li>
                    <li>✅ <strong>SLAs</strong> - Time-sensitive pipelines tracked</li>
                    <li>✅ <strong>Resource limits</strong> - Prevents overload</li>
                    <li>✅ <strong>Testing</strong> - DAGs tested before deploy</li>
                    <li>✅ <strong>Documentation</strong> - Each DAG has description</li>
                    <li>✅ <strong>Version control</strong> - DAGs in git</li>
                    <li>✅ <strong>Logging</strong> - Detailed logs for debugging</li>
                </ul>
            \`,
            interviews: [
                {
                    question: "How would you backfill data for the past 30 days in Airflow?",
                    answer: "Use Airflow's backfill command: 'airflow dags backfill -s 2024-01-01 -e 2024-01-30 daily_user_pipeline'. This runs DAG for each day. Important: 1) Set catchup=False in DAG to prevent automatic backfill on deploy, 2) Set max_active_runs=1 to run sequentially (avoid overwhelming system), 3) Test on single day first: -s 2024-01-01 -e 2024-01-01, 4) Monitor resources (30 runs can spike CPU/memory), 5) Consider: Is data available for past dates? Will source systems handle 30 simultaneous queries? Alternative: Clear failed task instances in UI → Airflow reruns them. For large backfills: Split into chunks, run during off-peak hours."
                },
                {
                    question: "What's the difference between depends_on_past and wait_for_downstream?",
                    answer: "depends_on_past: Current run waits for same task in previous run. Example: DAG runs daily, Jan 2 task waits for Jan 1 task to succeed. Use when: Data is cumulative (need yesterday's data). wait_for_downstream: Current run waits for ALL downstream tasks of previous run. Example: Jan 2 extract waits for Jan 1 extract AND Jan 1 transform AND Jan 1 load. Use when: Strict sequential processing needed. Real case: Financial reconciliation (Jan 2 can't start until Jan 1 completely done). Most times: Don't use either. Let runs happen independently. Only use for specific business needs."
                },
                {
                    question: "How do you handle slowly changing source data in scheduled pipelines?",
                    answer: "Problem: DAG runs at 2 AM, extracts data. But source DB gets updates until 3 AM. Solution 1) Add buffer time (run at 4 AM, ensures all data present). Solution 2) Use watermarks (track last processed timestamp, extract WHERE updated_at > last_watermark). Solution 3) Event-driven (source system sends signal when done, triggers DAG). Solution 4) Incremental with lookback (extract last 2 hours of data, handles late arrivals). Example from payments: Stripe webhooks arrive late due to retries. Extract with 1-hour lookback, dedup in warehouse. Best: Combine watermarks + lookback. Worst: Fixed schedule without buffer (guarantees missing data)."
                },
                {
                    question: "When would you choose Luigi over Airflow?",
                    answer: "Luigi pros: Simpler (just Python), no separate scheduler (runs as daemon), easier to debug (plain Python), lighter weight. Airflow pros: Better UI, more operators, better monitoring, bigger community, enterprise features (RBAC, pools). Choose Luigi when: Small team, simple pipelines, Python-heavy, don't need fancy UI, running on single machine. Choose Airflow when: Complex dependencies, multiple teams, need monitoring/alerting, cloud deployment, 100+ pipelines. Reality: Most companies start with Luigi/cron, migrate to Airflow as complexity grows. Spotify, Lyft used Luigi initially, now Airflow. New projects: Start with Airflow or Prefect."
                },
                {
                    question: "How do you prevent DAGs from running simultaneously?",
                    answer: "Set max_active_runs=1 in DAG definition: dag = DAG('pipeline', max_active_runs=1). This ensures only one run at a time. If DAG triggered while running, next run queues. Use when: 1) Pipeline modifies same tables (prevent conflicts), 2) Resource-intensive (don't want parallel runs), 3) Order matters (must finish before starting new run). Alternative: Use Pools for shared resources. Create pool 'warehouse_connection' with 1 slot. All tasks using warehouse take from this pool. Real example: ETL to Redshift has max_active_runs=1 (prevent COPY conflicts). But analytics queries can run in parallel (different pool). Don't overuse: Most DAGs benefit from parallel runs (faster catch-up)."
                }
            ]
        },
        {
            id: 'cloud-platforms',
            title: 'Cloud Data Platforms: AWS, GCP, Azure',
            duration: '60 min',
            content: \`
                <h2>Why Cloud? The Honest Truth</h2>
                <p>Ten years ago, every company built their own data centers. Today, only giants like Google and Amazon do. Why?</p>

                <div class="code-block">On-Premise Data Center:
Initial: $500K for servers + $200K for storage
Annual: $100K electricity + $150K maintenance + 2 full-time ops engineers
Scaling: 6 months to buy, rack, configure new servers
Disaster recovery: Build duplicate data center ($500K+)
Total 3-year cost: ~$2.5M + enormous complexity

Cloud:
Initial: $0
Pay as you go: ~$5K/month starting (scales up/down)
Scaling: Click button, instant
Disaster recovery: Built-in
Total 3-year cost: ~$180K-$500K (depending on usage)

Winner: Cloud for 99% of companies</div>

                <h2>The Big Three Cloud Platforms</h2>

                <h3>AWS (Amazon Web Services) - 32% Market Share</h3>
                <p><strong>Best for:</strong> Companies that need everything, mature services, most third-party integrations</p>

                <table class="table">
                    <tr>
                        <th>Service</th>
                        <th>What It Does</th>
                        <th>When to Use</th>
                    </tr>
                    <tr>
                        <td><strong>S3</strong></td>
                        <td>Object storage (data lake)</td>
                        <td>Store raw files, logs, backups</td>
                    </tr>
                    <tr>
                        <td><strong>Redshift</strong></td>
                        <td>Data warehouse</td>
                        <td>SQL analytics, BI dashboards</td>
                    </tr>
                    <tr>
                        <td><strong>Glue</strong></td>
                        <td>ETL service</td>
                        <td>Transform data, crawl schemas</td>
                    </tr>
                    <tr>
                        <td><strong>Athena</strong></td>
                        <td>Query S3 with SQL</td>
                        <td>Ad-hoc analysis without loading to warehouse</td>
                    </tr>
                    <tr>
                        <td><strong>Kinesis</strong></td>
                        <td>Real-time streaming</td>
                        <td>Process live events (clickstream, IoT)</td>
                    </tr>
                    <tr>
                        <td><strong>EMR</strong></td>
                        <td>Managed Spark/Hadoop</td>
                        <td>Big data processing (PB scale)</td>
                    </tr>
                </table>

                <p><strong>Real AWS Architecture - E-commerce Company:</strong></p>
                <div class="code-block">Data Sources:
├── MySQL (orders, products) → AWS DMS → S3
├── Application logs → Kinesis Firehose → S3
├── Third-party APIs → Lambda → S3
└── Mobile apps → Kinesis Data Streams → Lambda → S3

S3 Data Lake (raw data):
├── /orders/2024/01/01/*.parquet
├── /logs/2024/01/01/*.json
└── /api-data/stripe/2024-01-01.csv

Glue ETL:
├── Crawls S3, builds catalog
├── Runs Spark jobs (transform data)
└── Outputs to S3 (cleaned data)

Redshift Warehouse:
├── COPY from S3 (cleaned data)
├── dim_customers, dim_products, fact_orders
└── Queries from Tableau, Looker

Athena:
└── Ad-hoc queries on S3 (exploratory analysis)

Cost (500GB data, 10M rows/day):
- S3: $12/month
- Redshift (dc2.large, 1 node): $180/month
- Glue: $50/month
- Athena: $25/month (5 TB scanned)
Total: ~$270/month</div>

                <h3>GCP (Google Cloud Platform) - 11% Market Share</h3>
                <p><strong>Best for:</strong> Analytics-heavy workloads, ML/AI, companies that love BigQuery</p>

                <table class="table">
                    <tr>
                        <th>Service</th>
                        <th>What It Does</th>
                        <th>Why Special</th>
                    </tr>
                    <tr>
                        <td><strong>BigQuery</strong></td>
                        <td>Serverless data warehouse</td>
                        <td>Blazing fast, petabyte-scale, pay-per-query</td>
                    </tr>
                    <tr>
                        <td><strong>Cloud Storage</strong></td>
                        <td>Object storage (like S3)</td>
                        <td>Cheaper egress, better with BigQuery</td>
                    </tr>
                    <tr>
                        <td><strong>Dataflow</strong></td>
                        <td>Stream/batch processing (Apache Beam)</td>
                        <td>Unified batch + streaming</td>
                    </tr>
                    <tr>
                        <td><strong>Pub/Sub</strong></td>
                        <td>Messaging/streaming</td>
                        <td>Global, exactly-once delivery</td>
                    </tr>
                    <tr>
                        <td><strong>Dataproc</strong></td>
                        <td>Managed Spark/Hadoop</td>
                        <td>Faster startup than EMR</td>
                    </tr>
                    <tr>
                        <td><strong>Vertex AI</strong></td>
                        <td>ML platform</td>
                        <td>Best ML integration</td>
                    </tr>
                </table>

                <p><strong>Real GCP Architecture - Media Company (Spotify-like):</strong></p>
                <div class="code-block">Data Sources:
├── User events (plays, skips) → Pub/Sub → Dataflow → BigQuery
├── PostgreSQL (users, playlists) → Dataflow → BigQuery
└── Cloud Storage (audio files, metadata)

BigQuery Warehouse:
├── Streaming inserts (real-time events)
├── Partitioned by date (efficient queries)
├── Clustered by user_id (fast user lookups)
└── Materialized views (pre-aggregated metrics)

dbt on BigQuery:
├── Transforms raw → staging → marts
├── Incremental models (only new data)
└── Tests + documentation

Looker Studio:
└── Dashboards query BigQuery directly

Cost (1TB data, 100M events/day):
- BigQuery storage: $20/month (active), $10/month (long-term)
- BigQuery queries: $200/month (4TB scanned)
- Pub/Sub: $40/month
- Dataflow: $150/month
Total: ~$420/month

BigQuery magic:
- Query 1TB in 10 seconds
- No indexes needed
- Auto-scales to petabytes
- Pay only for queries run</div>

                <h3>Azure - 23% Market Share</h3>
                <p><strong>Best for:</strong> Enterprises using Microsoft stack, hybrid cloud</p>

                <table class="table">
                    <tr>
                        <th>Service</th>
                        <th>AWS Equivalent</th>
                        <th>GCP Equivalent</th>
                    </tr>
                    <tr>
                        <td><strong>Synapse Analytics</strong></td>
                        <td>Redshift</td>
                        <td>BigQuery</td>
                    </tr>
                    <tr>
                        <td><strong>Data Lake Storage</strong></td>
                        <td>S3</td>
                        <td>Cloud Storage</td>
                    </tr>
                    <tr>
                        <td><strong>Data Factory</strong></td>
                        <td>Glue</td>
                        <td>Dataflow</td>
                    </tr>
                    <tr>
                        <td><strong>Event Hubs</strong></td>
                        <td>Kinesis</td>
                        <td>Pub/Sub</td>
                    </tr>
                    <tr>
                        <td><strong>Databricks</strong></td>
                        <td>EMR</td>
                        <td>Dataproc</td>
                    </tr>
                </table>

                <h2>How to Choose?</h2>

                <table class="table">
                    <tr>
                        <th>Scenario</th>
                        <th>Best Choice</th>
                        <th>Why</th>
                    </tr>
                    <tr>
                        <td>Startup, need to move fast</td>
                        <td>GCP (BigQuery)</td>
                        <td>Simplest, least ops</td>
                    </tr>
                    <tr>
                        <td>Enterprise, Microsoft shop</td>
                        <td>Azure</td>
                        <td>Integrates with Office, AD</td>
                    </tr>
                    <tr>
                        <td>Need every service imaginable</td>
                        <td>AWS</td>
                        <td>Most mature, most options</td>
                    </tr>
                    <tr>
                        <td>ML/AI heavy</td>
                        <td>GCP</td>
                        <td>Best ML tools (TensorFlow native)</td>
                    </tr>
                    <tr>
                        <td>Gaming, media streaming</td>
                        <td>AWS</td>
                        <td>Best CDN (CloudFront), low latency</td>
                    </tr>
                    <tr>
                        <td>Financial services, compliance</td>
                        <td>AWS or Azure</td>
                        <td>More compliance certifications</td>
                    </tr>
                </table>

                <h2>Cloud Data Pipeline - Real Example</h2>

                <p><strong>Airbnb's AWS Data Platform (Simplified):</strong></p>

                <div class="code-block"># Step 1: Ingest data from various sources

# MySQL (listings, bookings) → S3
aws dms create-replication-task \\
  --replication-instance arn:aws:dms:us-east-1:... \\
  --source-endpoint mysql-prod \\
  --target-endpoint s3-data-lake

# Application logs → Kinesis → S3
import boto3
kinesis = boto3.client('kinesis')
kinesis.put_record(
    StreamName='user-events',
    Data=json.dumps({'user_id': 123, 'event': 'search', 'ts': '2024-01-01 12:00:00'}),
    PartitionKey='123'
)

# Kinesis Firehose → S3 (batches and saves)
# Automatic: Every 5 minutes or 5MB

# Step 2: Transform with Glue (PySpark)
from awsglue.context import GlueContext
from pyspark.context import SparkContext

sc = SparkContext()
glueContext = GlueContext(sc)

# Read from S3
df = glueContext.create_dynamic_frame.from_catalog(
    database="raw_data",
    table_name="bookings"
)

# Transform
df = df.filter(lambda x: x['booking_status'] == 'confirmed')
df = df.rename_field('booking_ts', 'booking_timestamp')

# Write back to S3 (cleaned)
glueContext.write_dynamic_frame.from_options(
    frame=df,
    connection_type="s3",
    connection_options={"path": "s3://cleaned-data/bookings/"},
    format="parquet"
)

# Step 3: Load to Redshift
COPY bookings
FROM 's3://cleaned-data/bookings/'
IAM_ROLE 'arn:aws:iam::123456789012:role/RedshiftRole'
FORMAT AS PARQUET;

# Step 4: Query with analysts
SELECT
    listing_city,
    COUNT(*) as bookings,
    SUM(price) as revenue
FROM bookings
WHERE booking_date >= '2024-01-01'
GROUP BY listing_city
ORDER BY revenue DESC;

Result:
- Paris: 12,450 bookings, $2.4M revenue
- New York: 11,230 bookings, $3.1M revenue
- Tokyo: 9,870 bookings, $1.8M revenue</div>

                <h2>Cloud Cost Optimization</h2>

                <h3>Biggest Cost Mistakes</h3>

                <div class="code-block">MISTAKE 1: Scanning entire table when you need 1 day

-- BAD (scans 1 TB every time)
SELECT * FROM events
WHERE event_date = '2024-01-01';

Cost: $5 per query (BigQuery: $5/TB)

-- GOOD (scans 10 GB)
SELECT * FROM events
WHERE event_date = '2024-01-01'
  AND _PARTITIONDATE = '2024-01-01';  -- Use partition filter

Cost: $0.05 per query (100x cheaper!)

Airbnb saved $1M/year by partitioning tables</div>

                <div class="code-block">MISTAKE 2: Leaving warehouse running 24/7

-- Redshift costs $180/month per node
-- Running 24/7 when only used 9am-6pm (weekdays)
-- Actual usage: 40 hours/week out of 168 hours (24%)

Solution:
- Pause Redshift nights/weekends
- Use serverless (BigQuery, Athena) for unpredictable workloads
- Resize down during off-peak

Lyft saved $400K/year with auto-pause</div>

                <div class="code-block">MISTAKE 3: Not using compression

-- Uncompressed data in S3: 500 GB
-- Storage: $12/month
-- Data transfer: $45/month (pulling to Redshift)

-- Compressed (gzip or Parquet): 100 GB (5x smaller)
-- Storage: $2.40/month
-- Data transfer: $9/month

Savings: $45.60/month → $546/year
For 10TB data → $10K/year saved</div>

                <h3>Cost Optimization Checklist</h3>
                <ul>
                    <li>✅ <strong>Partition tables</strong> by date (most important!)</li>
                    <li>✅ <strong>Use columnar formats</strong> (Parquet, ORC) not CSV</li>
                    <li>✅ <strong>Compress data</strong> (gzip, snappy)</li>
                    <li>✅ <strong>Right-size instances</strong> (don't over-provision)</li>
                    <li>✅ <strong>Delete old data</strong> (archive to cheaper storage)</li>
                    <li>✅ <strong>Use spot instances</strong> for batch jobs (70% cheaper)</li>
                    <li>✅ <strong>Reserved instances</strong> for predictable workloads (40% off)</li>
                    <li>✅ <strong>Monitor costs</strong> (AWS Cost Explorer, GCP Billing)</li>
                    <li>✅ <strong>Set budgets and alerts</strong> (prevent surprises)</li>
                    <li>✅ <strong>Turn off dev/test resources</strong> nights/weekends</li>
                </ul>

                <h2>Multi-Cloud Strategy</h2>

                <div class="code-block">Reality check:
- 87% of enterprises use multi-cloud
- Not because it's better (it's more complex)
- Because: Different teams chose different clouds, acquisitions, avoiding vendor lock-in

Real example - Large retailer:
- Marketing data: GCP (BigQuery for analytics)
- Finance data: Azure (Microsoft Excel integration)
- Operations data: AWS (legacy systems)
- Result: 3x complexity, 3x cost, 3x headcount

Lesson: Pick ONE cloud for data
Use others only if absolutely necessary
Complexity cost > savings from negotiation leverage</div>

                <h2>Serverless vs. Provisioned</h2>

                <table class="table">
                    <tr>
                        <th>Aspect</th>
                        <th>Serverless (BigQuery, Athena)</th>
                        <th>Provisioned (Redshift, Synapse)</th>
                    </tr>
                    <tr>
                        <td>Cost model</td>
                        <td>Pay per query</td>
                        <td>Pay per hour (always running)</td>
                    </tr>
                    <tr>
                        <td>Best for</td>
                        <td>Unpredictable, spiky workloads</td>
                        <td>Steady, 24/7 querying</td>
                    </tr>
                    <tr>
                        <td>Scaling</td>
                        <td>Automatic, instant</td>
                        <td>Manual resize (minutes-hours)</td>
                    </tr>
                    <tr>
                        <td>Maintenance</td>
                        <td>Zero (fully managed)</td>
                        <td>Patching, vacuuming, tuning</td>
                    </tr>
                    <tr>
                        <td>Performance</td>
                        <td>Consistent (shared resources)</td>
                        <td>Dedicated (can be faster)</td>
                    </tr>
                </table>

                <p><strong>Rule of thumb:</strong> If you're querying <1TB per day → Serverless is cheaper. If >5TB per day → Provisioned is cheaper.</p>
            \`,
            interviews: [
                {
                    question: "How would you migrate 10TB of data from on-premise to cloud?",
                    answer: "Multi-step approach: 1) Network assessment (can 10TB fit in transfer window? 100Mbps = 10 days). 2) If network too slow, use physical device (AWS Snowball, Azure Data Box - ship hard drive). 3) During migration: a) Initial bulk load (all historical data), b) CDC (Change Data Capture) for ongoing changes, c) Cutover window (stop writes, sync final changes, switch to cloud). 4) Validation (row counts, checksums match). Real timeline: Planning 2 weeks, initial transfer 1-4 weeks, CDC setup 1 week, testing 1 week, cutover 1 day. Mistake to avoid: Starting migration without CDC (data stale by time you finish). Tools: AWS DMS, Fivetran, Stitch Data."
                },
                {
                    question: "BigQuery vs Redshift - when to use which?",
                    answer: "BigQuery: Best for ad-hoc analytics, unpredictable workloads, don't want to manage infrastructure. Pros: Zero ops, petabyte scale, fast. Cons: Expensive for high query volume. Redshift: Best for predictable 24/7 workloads, cost-sensitive (large scale), need control over performance. Pros: Cheaper at scale, dedicated resources, more control. Cons: Need DBA, manual scaling. Real numbers: 100 users, 1000 queries/day, 1TB data → BigQuery $500/mo, Redshift $200/mo. But BigQuery has zero ops cost (no DBA), Redshift needs engineer time. Verdict: Most startups choose BigQuery (speed to value). Large enterprises use Redshift (cost at scale). Many use both (BigQuery for analysts, Redshift for production dashboards)."
                },
                {
                    question: "How do you handle PII and compliance (GDPR, HIPAA) in cloud?",
                    answer: "Multi-layer approach: 1) Encryption: At rest (AWS KMS, GCP KMS) and in transit (TLS). 2) Access control: IAM policies (least privilege), MFA required, audit all access. 3) Data masking: PII masked in non-prod environments (email → e***@domain.com). 4) Data residency: EU data stays in EU region (GDPR requirement). 5) Right to deletion: Automate user data deletion (GDPR: 30 days). 6) Audit logs: CloudTrail (AWS), Audit Logs (GCP) - who accessed what when. 7) Compliance: Choose certified services (HIPAA compliant, SOC 2). Real example: Healthcare company - encrypt all PHI with customer-managed keys, data in us-east-1 only, auto-delete on request, quarterly audits. Mistake: Storing PII in logs (goes to different storage, harder to delete)."
                },
                {
                    question: "What's the biggest cloud cost surprise you've seen?",
                    answer: "Data transfer costs (egress). Storage is cheap. Compute is predictable. But moving data OUT of cloud is expensive. Real example: Company stored 100TB in S3 ($2,300/mo). Analysts downloaded 50TB/month for local processing. Data transfer: $4,500/mo! Solution: Process data IN cloud (use EMR/Athena), only download results (1GB not 50TB). Another surprise: Cross-region transfer. Moving 10TB from us-east-1 to eu-west-1 = $200. Keep data in ONE region. Third surprise: CloudWatch logs. Company had verbose logging, generated 5TB logs/month, $2,500 in storage + ingestion. Solution: Sample logs (not every request), shorter retention. Prevention: Set billing alerts, review monthly costs, use cost calculators before deploying."
                },
                {
                    question: "How do you test cloud infrastructure changes without breaking production?",
                    answer: "Infrastructure as Code (IaC) + environments: 1) Define infrastructure in code (Terraform, CloudFormation). 2) Have 3 environments: dev, staging, prod. 3) Test in dev first (cheap, can break). 4) Promote to staging (replica of prod). 5) Run smoke tests, load tests. 6) If success, apply to prod. 7) Use blue-green deployment (keep old infra running, switch traffic gradually). Example: Upgrading Redshift - Create new cluster (green), copy data from old (blue), test queries on green, switch apps to green, monitor for issues, delete blue after 1 week. For pipelines: Backfill in dev (test on small date range), then staging (1 week data), then prod (all history). Always: Have rollback plan, backup data before changes, change during off-peak hours. Netflix approach: Chaos engineering (intentionally break things in prod to test resilience)."
                }
            ]
        },
        {
            id: 'performance-optimization',
            title: 'Performance: Making Queries Fast',
            duration: '55 min',
            content: \`
                <h2>Why Performance Matters</h2>
                <p>A slow query isn't just annoying. It costs real money and productivity.</p>

                <div class="code-block">Real Cost of Slow Queries:

Scenario: Executive dashboard takes 5 minutes to load
Impact:
- 20 executives check it 3 times/day
- 20 × 3 × 5 min = 300 minutes/day wasted = 5 hours
- Average exec salary: $150/hour
- Daily cost: $750
- Annual cost: $187,500 just waiting for one dashboard!

Facebook's rule: "Every 100ms slower = 1% fewer users"
Amazon's finding: "Every 100ms slower = 1% less revenue"

Lesson: Performance is a feature, not nice-to-have</div>

                <h2>The Query Performance Hierarchy</h2>

                <p>Fix these in order. Don't optimize indexes if you're scanning wrong data.</p>

                <h3>Level 1: Scan Less Data (Biggest Impact)</h3>

                <div class="code-block">-- BAD: Scanning entire table (1 billion rows)
SELECT * FROM orders
WHERE order_date = '2024-01-01';

Execution: 120 seconds
Cost (BigQuery): $5

-- GOOD: Partition pruning (1 day = 1M rows)
SELECT * FROM orders
WHERE order_date = '2024-01-01'
  AND _PARTITIONDATE = '2024-01-01';  -- Partition filter

Execution: 1.2 seconds (100x faster!)
Cost: $0.05 (100x cheaper!)

How partitioning works:
- Data physically split by date
- Query only reads relevant partition
- Like searching one file cabinet drawer, not entire warehouse

Partitioning strategies:
- Time-series data: Partition by date (most common)
- Geographic data: Partition by region
- Tenant data: Partition by customer_id (multi-tenant SaaS)</div>

                <h3>Level 2: Clustering (10-100x improvement)</h3>

                <div class="code-block">-- After partitioning, cluster by commonly filtered columns

CREATE TABLE orders (
    order_id BIGINT,
    customer_id BIGINT,
    order_date DATE,
    amount DECIMAL
)
PARTITION BY order_date
CLUSTER BY customer_id;  -- Data sorted by customer

-- Query for specific customer
SELECT * FROM orders
WHERE order_date = '2024-01-01'  -- Partition pruning
  AND customer_id = 12345;       -- Cluster pruning

Execution: 0.3 seconds (4x faster than just partitioning)

Why: Data for same customer is stored together
Query only reads relevant blocks

Clustering tips:
- Cluster by columns in WHERE clause
- Up to 4 clustering columns (order matters!)
- Most selective first
- Example: CLUSTER BY country, city, customer_id</div>

                <h3>Level 3: Columnar Format (5-10x improvement)</h3>

                <div class="code-block">CSV vs Parquet benchmark (1GB data, 10M rows):

-- CSV (row format)
Size: 1 GB
Query time (SELECT country, COUNT(*)): 45 seconds
Compression: None
Reads: Entire file (all columns)

-- Parquet (columnar format)
Size: 100 MB (10x smaller due to compression)
Query time: 4 seconds (11x faster)
Compression: Automatic (Snappy)
Reads: Only 'country' column (not all columns)

Why columnar is faster:
1. Read only needed columns (not entire row)
2. Better compression (similar values together)
3. Predicate pushdown (filter before reading)
4. Vectorized processing (CPU-efficient)

When to use:
- Parquet: Analytics (read few columns from many rows)
- CSV: Row-oriented apps (read all columns of few rows)
- JSON: Nested/schemaless data
- Avro: Write-heavy, schema evolution</div>

                <h3>Level 4: Indexing (2-100x for specific queries)</h3>

                <div class="code-block">-- Traditional databases (PostgreSQL, MySQL)

-- Query: Find user by email (1M users)
SELECT * FROM users WHERE email = 'john@example.com';

No index: Full table scan (1M rows read)
Time: 5 seconds

-- Create index
CREATE INDEX idx_users_email ON users(email);

With index: B-tree lookup (log2(1M) = 20 comparisons)
Time: 0.05 seconds (100x faster!)

When to index:
✅ Columns in WHERE clause (especially unique lookups)
✅ Foreign keys (JOIN columns)
✅ Columns in ORDER BY
✅ Columns in GROUP BY (sometimes helps)

When NOT to index:
❌ Low cardinality columns (boolean, status with 3 values)
❌ Columns never used in WHERE
❌ Tables with heavy INSERT/UPDATE (indexes slow writes)

Real mistake - Over-indexing:
Company had 40 indexes on 10-column table
INSERTs took 10 seconds (updating all indexes)
Removed to 5 indexes → INSERT time: 0.1 seconds</div>

                <h2>Query Optimization Patterns</h2>

                <h3>Pattern 1: Avoid SELECT *</h3>

                <div class="code-block">-- BAD: Fetching 50 columns when you need 3
SELECT * FROM orders
WHERE order_date = '2024-01-01';

Time: 10 seconds
Data scanned: 10 GB

-- GOOD: Only needed columns
SELECT order_id, customer_id, amount
FROM orders
WHERE order_date = '2024-01-01';

Time: 2 seconds (5x faster)
Data scanned: 2 GB (5x less)

Why: Columnar databases (BigQuery, Redshift) charge per byte scanned
Less columns = less data = faster + cheaper

Real example - Uber:
Changed SELECT * to specific columns across 100 queries
Result: 40% cost reduction on BigQuery</div>

                <h3>Pattern 2: Push Filters Down</h3>

                <div class="code-block">-- BAD: Filter after joining (processes all data first)
SELECT o.*, c.name
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
WHERE o.order_date = '2024-01-01';

Execution:
1. JOIN all orders (100M rows) with customers (10M rows)
2. Then filter to 1 day (1M rows)

-- GOOD: Filter before joining
SELECT o.*, c.name
FROM (
    SELECT * FROM orders
    WHERE order_date = '2024-01-01'  -- Filter early!
) o
JOIN customers c ON o.customer_id = c.customer_id;

Execution:
1. Filter to 1M orders first
2. Then JOIN (much smaller dataset)

Modern query engines do this automatically (query optimization)
But not always! Manual filtering helps.</div>

                <h3>Pattern 3: Avoid Functions on Indexed Columns</h3>

                <div class="code-block">-- BAD: Function prevents index usage
SELECT * FROM users
WHERE LOWER(email) = 'john@example.com';

-- Index on 'email' is useless (can't use it!)
-- Full table scan required

-- GOOD: Lowercase the search term instead
SELECT * FROM users
WHERE email = 'john@example.com';

-- Index is used → Fast

Alternative: Create function-based index
CREATE INDEX idx_email_lower ON users(LOWER(email));

-- Now this is fast
SELECT * FROM users
WHERE LOWER(email) = 'john@example.com';</div>

                <h3>Pattern 4: Use Approximate Aggregates</h3>

                <div class="code-block">-- Need approximate count? Don't scan everything

-- EXACT (slow for big tables)
SELECT COUNT(DISTINCT user_id) FROM events;
Time: 120 seconds
Result: 1,234,567

-- APPROXIMATE (HyperLogLog algorithm)
SELECT APPROX_COUNT_DISTINCT(user_id) FROM events;
Time: 5 seconds (24x faster!)
Result: 1,234,511 (~99.99% accurate)

Use approximate when:
- Don't need exact count (dashboards showing "~1.2M users")
- 1% error acceptable
- Speed more important than precision

Functions:
- APPROX_COUNT_DISTINCT (cardinality)
- APPROX_QUANTILES (percentiles)
- APPROX_TOP_COUNT (top N items)

Google uses this for Analytics (trillions of events)</div>

                <h2>Join Optimization</h2>

                <h3>Join Strategies</h3>

                <table class="table">
                    <tr>
                        <th>Strategy</th>
                        <th>When to Use</th>
                        <th>Performance</th>
                    </tr>
                    <tr>
                        <td><strong>Broadcast Join</strong></td>
                        <td>One table small (<1GB), other large</td>
                        <td>Fastest (no shuffle)</td>
                    </tr>
                    <tr>
                        <td><strong>Shuffle Hash Join</strong></td>
                        <td>Both tables medium-large</td>
                        <td>Medium (shuffle cost)</td>
                    </tr>
                    <tr>
                        <td><strong>Sort-Merge Join</strong></td>
                        <td>Both tables huge (sorted)</td>
                        <td>Slower but scalable</td>
                    </tr>
                    <tr>
                        <td><strong>Nested Loop Join</strong></td>
                        <td>No other option (avoid if possible)</td>
                        <td>Slowest (O(n²))</td>
                    </tr>
                </table>

                <div class="code-block">Example - Slow join:

SELECT o.*, c.name
FROM orders o  -- 100M rows
JOIN customers c ON o.customer_id = c.customer_id  -- 10M rows

Problem: Shuffle 100M rows across network
Time: 10 minutes

Solution: Broadcast small table (customers)
-- Hint to database
SELECT /*+ BROADCAST(c) */ o.*, c.name
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id;

Result: Copy customers (small) to all nodes
Time: 30 seconds (20x faster)</div>

                <h2>Monitoring Query Performance</h2>

                <h3>Key Metrics to Track</h3>

                <table class="table">
                    <tr>
                        <th>Metric</th>
                        <th>Good Threshold</th>
                        <th>Action if Exceeded</th>
                    </tr>
                    <tr>
                        <td>Query execution time</td>
                        <td><5 seconds (interactive)</td>
                        <td>Optimize query, add indexes</td>
                    </tr>
                    <tr>
                        <td>Data scanned</td>
                        <td><100GB per query</td>
                        <td>Partition table, select fewer columns</td>
                    </tr>
                    <tr>
                        <td>Rows returned</td>
                        <td><10,000 (for dashboards)</td>
                        <td>Add LIMIT, aggregate in database</td>
                    </tr>
                    <tr>
                        <td>Concurrent queries</td>
                        <td><50 active queries</td>
                        <td>Queue system, scale warehouse</td>
                    </tr>
                    <tr>
                        <td>Slow query frequency</td>
                        <td><5% queries over SLA</td>
                        <td>Investigate slow queries, optimize</td>
                    </tr>
                </table>

                <h3>Query Profiling - Finding Bottlenecks</h3>

                <div class="code-block">-- PostgreSQL
EXPLAIN ANALYZE
SELECT * FROM orders WHERE order_date = '2024-01-01';

Output:
Seq Scan on orders (cost=0..10000 rows=1000 width=100)
  Filter: (order_date = '2024-01-01')
  Planning time: 0.5 ms
  Execution time: 5234 ms  ← SLOW!

Look for:
- "Seq Scan" (full table scan - add index)
- High "rows" (scanning too much - add filters)
- "Sort" or "Hash" (memory operations - may need more RAM)

-- BigQuery
SELECT
    job_id,
    query,
    total_bytes_processed,
    total_slot_ms,
    creation_time
FROM \`region-us\`.INFORMATION_SCHEMA.JOBS_BY_PROJECT
WHERE creation_time > TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 DAY)
  AND total_bytes_processed > 1000000000  -- >1GB queries
ORDER BY total_slot_ms DESC  -- Most expensive first
LIMIT 10;

Action: Optimize top 10 expensive queries</div>

                <h2>Caching Strategies</h2>

                <h3>Multi-Layer Caching</h3>

                <div class="code-block">Layers (from fastest to slowest):

1. Application cache (Redis, Memcached)
   - TTL: 5 minutes
   - Use for: Frequently accessed, slow-changing data
   - Example: Product catalog, user profiles
   - Speed: <1ms

2. Query result cache (BigQuery, Snowflake)
   - TTL: 24 hours
   - Use for: Identical queries
   - Example: Daily dashboard (same query run 100x/day)
   - Speed: 10ms

3. Materialized views
   - Refresh: Hourly/daily
   - Use for: Complex aggregations
   - Example: Pre-computed daily metrics
   - Speed: 100ms (reads pre-aggregated data)

4. Source database
   - No cache
   - Always fresh, always slow
   - Speed: 5-60 seconds

Real architecture - E-commerce:
- User profile → Redis (5 min TTL)
- Product catalog → Redis (15 min TTL)
- Daily sales → Materialized view (refresh 1 AM)
- Historical orders → Direct query (no cache)</div>

                <h2>Performance Checklist</h2>

                <ul>
                    <li>✅ <strong>Partition tables by date</strong> (scan less data)</li>
                    <li>✅ <strong>Cluster by filter columns</strong> (co-locate related data)</li>
                    <li>✅ <strong>Use columnar format</strong> (Parquet, ORC)</li>
                    <li>✅ <strong>Compress data</strong> (smaller = faster)</li>
                    <li>✅ <strong>Select only needed columns</strong> (no SELECT *)</li>
                    <li>✅ <strong>Push filters down</strong> (filter before join)</li>
                    <li>✅ <strong>Index appropriately</strong> (not too many, not too few)</li>
                    <li>✅ <strong>Use approximate aggregates</strong> (when exact not needed)</li>
                    <li>✅ <strong>Cache expensive queries</strong> (materialized views)</li>
                    <li>✅ <strong>Monitor slow queries</strong> (optimize top 10)</li>
                    <li>✅ <strong>Profile queries</strong> (EXPLAIN ANALYZE)</li>
                    <li>✅ <strong>Set query timeouts</strong> (kill runaway queries)</li>
                </ul>

                <p><strong>Remember:</strong> "Premature optimization is the root of all evil. But never optimizing is the root of expensive bills and angry users."</p>
            \`,
            interviews: [
                {
                    question: "A query that used to take 5 seconds now takes 5 minutes. How do you debug?",
                    answer: "Systematic approach: 1) Check if data volume increased (table now 100x bigger? Partitions working?), 2) Check query plan (EXPLAIN - did it change? Index broken? Statistics outdated?), 3) Check system resources (is warehouse overloaded? Too many concurrent queries?), 4) Check recent changes (code deploy? Schema change? New index?), 5) Compare old vs new metrics (data scanned, rows processed). Real example: Company query slowed down. Found: Table grew from 1M to 100M rows, partition wasn't being used (query had CAST(order_date) which disabled partition pruning). Fix: Remove CAST, query back to 5 seconds. Tools: Query history, execution plans, monitoring dashboards."
                },
                {
                    question: "How do you decide between adding an index vs materializing a view?",
                    answer: "Index: Speeds up lookups (WHERE, JOIN). Good for point queries (find specific rows). Cost: Slower writes (must update index). Use when: Need real-time data, many different query patterns. Materialized view: Pre-computes aggregations (SUM, COUNT, JOIN). Good for complex analytics. Cost: Stale data (refreshed periodically), storage space. Use when: Same complex query run often, can tolerate 1-hour staleness, aggregating billions of rows. Example: User lookup by email → Index (need real-time). Daily sales report (same query 100x/day) → Materialized view (refresh nightly). Both: For frequently joined tables (index on join column, mat view for common aggregations)."
                },
                {
                    question: "What's the difference between LIMIT and partitioning for making queries faster?",
                    answer: "They solve different problems. LIMIT: Reduces RETURNED rows (but still SCANS full table). SELECT * FROM orders LIMIT 100 → Scans 100M rows, returns 100. Doesn't make query faster (still reads everything). Use: Pagination, sampling results. Partitioning: Reduces SCANNED rows (physically skips irrelevant data). SELECT * FROM orders WHERE _PARTITIONDATE = '2024-01-01' → Scans 1M rows (one day), not 100M. Makes query 100x faster. Use: Time-series data, large tables. Common mistake: Using LIMIT 100 thinking it's optimization. Reality: Database still does full scan, throws away 99.9% of results. Correct: Partition + filter, then LIMIT."
                },
                {
                    question: "How would you optimize a JOIN between a 1 billion row table and a 10 million row table?",
                    answer: "Broadcast join strategy: 1) Smaller table (10M rows) is 'broadcast' to all compute nodes. 2) Each node has full copy of small table in memory. 3) Large table (1B rows) is partitioned across nodes. 4) Each node joins its partition locally (no network shuffle). Implementation: Modern warehouses do this automatically, but can hint: SELECT /*+ BROADCAST(small_table) */ ... Benefit: Avoids shuffling 1B rows across network. Requirement: Small table must fit in memory (~10GB max). If both tables huge: Sort-merge join (partition both by join key, sort, merge). Real numbers: 1B x 10M join - Broadcast: 2 min, Shuffle: 30 min. Alternative: Denormalize (avoid join altogether by pre-joining data)."
                },
                {
                    question: "What performance considerations are different for streaming vs batch processing?",
                    answer: "Batch: Optimize for throughput (max rows/second), latency doesn't matter (run overnight). Techniques: Large batch sizes (100K rows), sequential scans, aggressive compression, sort-merge joins. Cost-optimized (use spot instances). Streaming: Optimize for latency (each event processed quickly), throughput secondary. Techniques: Small batch sizes (100 events), indexed lookups, simpler joins, less compression. Need predictable performance (no spot instances). Example - Batch ETL: Load 100M rows in 1 hour → 27K rows/sec throughput, individual row latency irrelevant. Example - Fraud detection: Process each transaction in <100ms → Low throughput (few thousand/sec) but real-time. Architectural difference: Batch uses scan-friendly columnar stores (Parquet). Streaming uses key-value stores (Cassandra, DynamoDB) for fast random access."
                }
            ]
        },
        {
            id: 'real-world-career',
            title: 'Building a Data Engineering Career: Real Talk',
            duration: '45 min',
            content: \`
                <h2>The Data Engineering Career Path</h2>
                <p>Let me share what a real data engineering career looks like, from someone who's been through it all.</p>

                <h3>Career Progression (Typical Timeline)</h3>

                <table class="table">
                    <tr>
                        <th>Level</th>
                        <th>Years</th>
                        <th>What You Do</th>
                        <th>Salary Range (US)</th>
                    </tr>
                    <tr>
                        <td><strong>Junior</strong></td>
                        <td>0-2</td>
                        <td>Write SQL, build simple pipelines, fix data quality issues</td>
                        <td>$70K - $110K</td>
                    </tr>
                    <tr>
                        <td><strong>Mid-level</strong></td>
                        <td>2-5</td>
                        <td>Design pipelines, optimize queries, mentor juniors</td>
                        <td>$110K - $160K</td>
                    </tr>
                    <tr>
                        <td><strong>Senior</strong></td>
                        <td>5-8</td>
                        <td>Architect systems, lead projects, make technical decisions</td>
                        <td>$150K - $220K</td>
                    </tr>
                    <tr>
                        <td><strong>Staff/Principal</strong></td>
                        <td>8-12</td>
                        <td>Set standards, cross-team impact, research new tech</td>
                        <td>$200K - $350K</td>
                    </tr>
                    <tr>
                        <td><strong>Engineering Manager</strong></td>
                        <td>5+</td>
                        <td>Hire, mentor, roadmap planning (less coding)</td>
                        <td>$160K - $280K</td>
                    </tr>
                </table>

                <p><em>Note: FAANG (Meta, Google, Netflix) pays 50-100% more. Startups pay less but offer equity.</em></p>

                <h2>Skills That Actually Matter</h2>

                <h3>Must-Have Skills (Learn These First)</h3>

                <div class="code-block">1. SQL (90% of your job)
   - Window functions (RANK, ROW_NUMBER, LAG/LEAD)
   - Complex JOINs (multiple tables, subqueries)
   - Query optimization (EXPLAIN, indexes)
   - Practice: LeetCode SQL, HackerRank

2. Python (for everything SQL can't do)
   - pandas (data manipulation)
   - requests (API calls)
   - sqlalchemy (database connections)
   - airflow/prefect (orchestration)
   - NOT needed: Deep learning, computer vision

3. One Cloud Platform (pick AWS or GCP)
   - Data warehouse (Redshift or BigQuery)
   - Object storage (S3 or GCS)
   - Orchestration (Airflow, Step Functions)
   - Get certified: AWS Data Analytics or GCP Data Engineer

4. Git (version control)
   - Branch, merge, pull requests
   - Code reviews
   - Every company uses this

5. Data Modeling (dimensional modeling)
   - Star schema, fact/dimension tables
   - Read: "The Data Warehouse Toolkit" by Kimball</div>

                <h3>Nice-to-Have Skills (Learn After Basics)</h3>

                <div class="code-block">- Spark (for big data processing)
- Kafka (for real-time streaming)
- dbt (for SQL transformations)
- Docker (for containerization)
- Terraform (for infrastructure as code)
- Scala or Java (for Spark development)

When to learn:
- Apply for big data roles → Learn Spark
- Streaming-heavy company → Learn Kafka
- Modern data stack shop → Learn dbt</div>

                <h2>How to Get Your First Data Engineering Job</h2>

                <h3>Path 1: From Data Analyst (Easiest)</h3>

                <div class="code-block">Many data engineers start as analysts
Timeline: 1-2 years

Step 1: Excel at current analyst job
- Write complex SQL queries
- Build dashboards (Tableau, Looker)
- Understand business metrics deeply

Step 2: Take on engineering tasks
- "This report is slow, can I optimize it?"
- "Can I automate this manual process?"
- "I'll set up a pipeline for this data"

Step 3: Learn engineering tools (nights/weekends)
- Python (pandas, sqlalchemy)
- Airflow (build personal project)
- Cloud (AWS/GCP free tier)

Step 4: Internal transfer or new job
- Show projects you built
- Demonstrate impact (reduced query time, automated process)

Real example:
Data analyst at e-commerce company
Built automated inventory pipeline in Airflow
Saved team 10 hours/week manual work
Promoted to Data Engineer in 14 months</div>

                <h3>Path 2: From Software Engineer (Fastest)</h3>

                <div class="code-block">You have coding skills, learn data tools
Timeline: 3-6 months

Learn:
1. SQL (most important!)
2. Data warehousing concepts (star schema, dimensional modeling)
3. Orchestration (Airflow)
4. One cloud platform (AWS/GCP)

Build project:
- Scrape data from API (Twitter, Reddit)
- Load to cloud database (PostgreSQL on AWS RDS)
- Transform with Airflow
- Analyze in Jupyter notebook
- Put on GitHub, write blog post

Apply for:
- Junior Data Engineer roles
- Data Platform Engineer
- Analytics Engineer

Advantage: You know how to code (big plus!)
Challenge: Learn data concepts (not just coding)</div>

                <h3>Path 3: From Bootcamp/Self-Taught (Hardest)</h3>

                <div class="code-block">No experience? Build portfolio
Timeline: 6-12 months

Core curriculum:
1. SQL (3 months) - SQLBolt, LeetCode SQL
2. Python (2 months) - DataCamp, Codecademy
3. Data warehousing (1 month) - Read Kimball book
4. Cloud (2 months) - AWS/GCP certification
5. Orchestration (1 month) - Airflow tutorials

Build 3 projects:
Project 1: Simple ETL
- Extract from public API (weather, stocks)
- Load to PostgreSQL
- Visualize in matplotlib

Project 2: Data warehouse
- Build star schema
- Load sample data (e-commerce, retail)
- Write analytical queries

Project 3: Production-like pipeline
- Airflow DAG (scheduled daily)
- Multiple data sources
- Quality checks
- Deployed on cloud (AWS/GCP)
- Documented on GitHub

Apply for:
- Junior/Associate roles
- Startups (more willing to take risk)
- Contract/freelance (build experience)

First job will be hard to get
But after 1 year experience, job market opens up</div>

                <h2>Interview Preparation</h2>

                <h3>What Interviews Actually Test</h3>

                <table class="table">
                    <tr>
                        <th>Round</th>
                        <th>What They Test</th>
                        <th>How to Prepare</th>
                    </tr>
                    <tr>
                        <td><strong>SQL Round</strong></td>
                        <td>Window functions, JOINs, subqueries</td>
                        <td>LeetCode SQL (50 problems), HackerRank</td>
                    </tr>
                    <tr>
                        <td><strong>Coding Round</strong></td>
                        <td>Python scripting, data structures</td>
                        <td>LeetCode Easy/Medium (data structures)</td>
                    </tr>
                    <tr>
                        <td><strong>System Design</strong></td>
                        <td>Design data pipeline, warehouse schema</td>
                        <td>This course! + read case studies</td>
                    </tr>
                    <tr>
                        <td><strong>Behavioral</strong></td>
                        <td>Past projects, conflict resolution, teamwork</td>
                        <td>STAR method, prepare stories</td>
                    </tr>
                </table>

                <h3>Common Interview Questions</h3>

                <div class="code-block">SQL (80% of interviews ask this):
1. "Find second highest salary" (window functions)
2. "Find users who haven't made purchase" (LEFT JOIN, NULL)
3. "Calculate running total" (SUM OVER)
4. "Deduplicate records" (ROW_NUMBER, PARTITION BY)
5. "Find top 3 products per category" (RANK, PARTITION BY)

System Design (senior roles):
1. "Design a data pipeline for e-commerce analytics"
2. "Build real-time fraud detection system"
3. "Design data warehouse for SaaS company"
4. "Handle 1 million events per second"

Python (mid-level+):
1. "Parse JSON API response, load to database"
2. "Read CSV, clean data, write to Parquet"
3. "Implement retry logic for API calls"

Cloud (varies):
1. "How would you migrate 10TB data to cloud?"
2. "Compare Redshift vs BigQuery"
3. "Design disaster recovery strategy"</div>

                <h2>Companies & Culture</h2>

                <h3>Types of Data Engineering Roles</h3>

                <div class="code-block">1. Product Analytics (Consumer Tech)
   Companies: Meta, Uber, Airbnb, Netflix
   Work: Build pipelines for product metrics (DAU, retention)
   Stakeholders: Product managers, analysts
   Tech: Often real-time (Kafka, Flink)
   Pace: Fast (ship features weekly)
   Pay: Highest ($$$)

2. Business Intelligence (Enterprise)
   Companies: Banks, retail, healthcare
   Work: Data warehouses, BI dashboards, reports
   Stakeholders: Executives, business teams
   Tech: Traditional (SQL, Tableau, ETL)
   Pace: Slower (quarterly projects)
   Pay: Mid-range ($$)

3. Data Platform (Infrastructure)
   Companies: All big tech companies
   Work: Build data infrastructure (tools other engineers use)
   Stakeholders: Other data engineers, scientists
   Tech: Cutting edge (Spark, Airflow, custom tools)
   Pace: Medium (foundational work)
   Pay: High ($$$)

4. ML Engineering (AI/ML Heavy)
   Companies: AI startups, tech companies
   Work: Feature pipelines, model deployment, data for ML
   Stakeholders: Data scientists, ML engineers
   Tech: Python-heavy (Spark, TensorFlow data)
   Pace: Fast (research-driven)
   Pay: Highest ($$$$)</div>

                <h3>How to Choose a Company</h3>

                <table class="table">
                    <tr>
                        <th>Company Type</th>
                        <th>Pros</th>
                        <th>Cons</th>
                    </tr>
                    <tr>
                        <td><strong>Big Tech (FAANG)</strong></td>
                        <td>High pay, great benefits, resume boost, cutting-edge tech</td>
                        <td>Hard to get in, bureaucracy, narrow scope</td>
                    </tr>
                    <tr>
                        <td><strong>Startup (< 50 people)</strong></td>
                        <td>Huge impact, broad scope, equity upside, fast pace</td>
                        <td>Lower pay, long hours, equity might be worthless</td>
                    </tr>
                    <tr>
                        <td><strong>Mid-size (500-5000)</strong></td>
                        <td>Balance of impact & stability, decent pay, good learning</td>
                        <td>Less prestigious, mid-tier tech</td>
                    </tr>
                    <tr>
                        <td><strong>Enterprise (10K+)</strong></td>
                        <td>Stability, good work-life balance, benefits</td>
                        <td>Slow pace, legacy tech, bureaucracy</td>
                    </tr>
                </table>

                <h2>Continuous Learning</h2>

                <h3>Stay Current (Tech Changes Fast)</h3>

                <div class="code-block">Read Weekly:
- Data Engineering Weekly (newsletter)
- Hacker News (news.ycombinator.com)
- Company engineering blogs (Netflix, Uber, Airbnb)

Follow These People on Twitter/LinkedIn:
- Maxime Beauchemin (Airflow creator)
- Tristan Handy (dbt creator)
- Joe Reis (Data Engineering book author)

Listen to Podcasts:
- Data Engineering Podcast
- Analytics Engineering Podcast

Attend Conferences (or watch talks):
- Data Council
- Spark Summit
- AWS re:Invent

Contribute to Open Source:
- Fix bug in Airflow
- Add feature to dbt
- Write documentation

Side Projects:
- Build something you'd use
- Scrape data, analyze, share insights
- Write blog posts about what you learn</div>

                <h2>Common Career Mistakes</h2>

                <h3>Mistake 1: Tool Chasing</h3>
                <div class="code-block">WRONG: "I need to learn Spark, Kafka, Flink, dbt, Airflow, Dagster..."

RIGHT: "I'll master SQL and Python first, then learn tools as needed"

Reality:
- Tools change every 2-3 years
- Fundamentals (SQL, data modeling) last decades
- Companies use different tools
- Strong fundamentals → Learn any tool in 2 weeks</div>

                <h3>Mistake 2: Not Talking to Users</h3>
                <div class="code-block">BAD: Build perfect pipeline, nobody uses it

GOOD: Talk to analysts/PMs → Understand needs → Build what's needed

Example:
Engineer spent 3 months building real-time pipeline
Stakeholders actually needed daily batch (real-time not required)
Wasted effort

Always: Validate requirements before building</div>

                <h3>Mistake 3: Over-Engineering</h3>
                <div class="code-block">WRONG: Build Kafka + Spark streaming for 1000 events/day

RIGHT: Batch job in Python (runs in 10 seconds)

Rule: Use simplest solution that works
Can always add complexity later
Premature optimization = wasted time</div>

                <h2>Work-Life Balance Reality</h2>

                <div class="code-block">Typical week as Data Engineer:

Good weeks (50%):
- 40 hours
- Build new features
- Solve interesting problems
- Learn new things

Bad weeks (30%):
- 50-60 hours
- Pipeline breaks at 2 AM (on-call)
- Data quality issues
- Firefighting

Great weeks (20%):
- 30 hours
- Pipelines running smoothly
- Mostly code reviews and planning
- Time for learning

On-call reality:
- Most companies: 1 week every 6-8 weeks
- Expectation: Respond within 30 min
- Frequency: 2-3 pages per week
- Impact: Stressful but manageable

Work from home:
- Most data engineering is remote-friendly
- 80% of companies allow hybrid/remote
- Less collaboration needed than software eng</div>

                <h2>Final Advice from Someone Who's Been There</h2>

                <ul>
                    <li><strong>Start simple:</strong> Don't try to learn everything at once. SQL + Python + one cloud platform is enough to get first job.</li>
                    <li><strong>Build projects:</strong> GitHub portfolio > certifications > resume keywords.</li>
                    <li><strong>Network:</strong> Data engineering community is small and helpful. Join Slack groups, go to meetups.</li>
                    <li><strong>Write:</strong> Blog about what you learn. Teaches you deeply, helps others, shows expertise.</li>
                    <li><strong>Be patient:</strong> First job is hardest. After 1-2 years experience, recruiters will find you.</li>
                    <li><strong>Prioritize learning:</strong> Early career, choose companies where you'll learn most (not highest pay).</li>
                    <li><strong>Ask questions:</strong> Nobody knows everything. Admitting "I don't know" is strength, not weakness.</li>
                    <li><strong>Document everything:</strong> Your future self (and teammates) will thank you.</li>
                    <li><strong>Focus on impact:</strong> Doesn't matter how elegant your code if nobody uses it.</li>
                    <li><strong>Enjoy the journey:</strong> Data engineering is challenging but rewarding. You're building systems that power decisions. That's pretty cool.</li>
                </ul>

                <h2>Next Steps After This Course</h2>

                <div class="code-block">Immediate (This Week):
1. Pick one cloud platform (AWS or GCP)
2. Sign up for free tier
3. Build first pipeline (any public data source)

Short-term (This Month):
1. Complete LeetCode SQL problems (50 easy, 25 medium)
2. Build 3 portfolio projects
3. Write blog post about what you learned
4. Join data engineering Slack communities

Medium-term (3 Months):
1. Get cloud certification (AWS Data Analytics or GCP Data Engineer)
2. Contribute to open source (Airflow, dbt)
3. Apply to 5-10 jobs per week
4. Network with data engineers on LinkedIn

Long-term (1 Year):
1. Get first data engineering job (or transition internally)
2. Learn company's data stack deeply
3. Take on increasingly complex projects
4. Mentor junior engineers
5. Build specialization (streaming, ML, data platform)

You got this! 🚀</div>
            \`,
            interviews: [
                {
                    question: "What's the difference between a Data Engineer, Data Analyst, and Data Scientist?",
                    answer: "Data Analyst: Answers business questions using existing data. Tools: SQL, Excel, Tableau. Output: Dashboards, reports. Example: 'Why did sales drop 10% last month?' Data Scientist: Builds predictive models, runs experiments. Tools: Python (scikit-learn, TensorFlow), statistics. Output: ML models, A/B test results. Example: 'Which users will churn next month?' Data Engineer: Builds infrastructure for data. Tools: SQL, Python, Airflow, Spark. Output: Pipelines, data warehouses. Example: 'Make sales data available for analysis.' Flow: Engineers build pipelines → Analysts use data → Scientists build models on data. Career: Analyst is easiest entry (less technical). Engineer needs coding. Scientist needs stats/ML. Pay: Similar at senior levels ($150K-$250K). Demand: Data Engineer highest (2:1 ratio vs scientists)."
                },
                {
                    question: "How important are certifications for getting a data engineering job?",
                    answer: "Certifications help but aren't required. Reality: 1) For first job: Helpful (proves you know basics when no experience). 2) For experienced engineers: Less important (projects and experience matter more). 3) For cloud roles: AWS/GCP certification shows you know platform (good signal). Most valuable: AWS Certified Data Analytics, GCP Professional Data Engineer, dbt Certification. Least valuable: Generic 'Data Science' certificates from random online platforms. Better than certification: GitHub portfolio with 3 real projects. Real hiring: Managers glance at certifications (5 seconds), deep read projects/experience (5 minutes). Recommendation: If entry-level, get cloud cert ($300, 2 weeks study). If experienced, skip unless employer pays. Best ROI: Build projects, not collect certificates."
                },
                {
                    question: "Should I specialize in batch or streaming early in my career?",
                    answer: "Start with batch, learn streaming later. Why: 1) Batch is 80% of data engineering jobs (most companies don't need real-time). 2) Batch is simpler (easier to debug, reason about). 3) Batch fundamentals transfer to streaming (reverse is harder). 4) Streaming jobs need more experience (junior roles are rare). Timeline: Years 1-2: Master batch (SQL, Airflow, data warehousing). Years 3-5: Add streaming if needed (Kafka, Flink). Exception: If joining company that's streaming-heavy (fintech, adtech), learn both. Real market: 10 batch jobs for every 1 streaming job. Most 'real-time' requirements can be solved with fast batch (every 5 minutes). True streaming (sub-second latency) is rare. Advice: Be T-shaped - broad in batch, specialize in streaming later if interested."
                },
                {
                    question: "How do I negotiate a data engineering job offer?",
                    answer: "Negotiation is expected, don't skip it. Research: 1) Check levels.fyi for your level/location. 2) Know market rate (don't anchor to current salary). Strategy: 1) Get multiple offers (huge leverage - 'Company X offered $Y'). 2) Negotiate total comp (base + bonus + equity), not just base. 3) Ask for specific number (not 'Can you do better?'). 4) Be pleasant but firm ('I'm excited about role, but need $X to move forward'). 5) Negotiate over email (gives time to think). What to negotiate: Base salary (+$10K is standard ask), Signing bonus (easier than base), Equity (if startup), Start date (if need time), Remote work (if hybrid). Mistakes: Accepting first offer (always negotiate), Revealing current salary (say 'I'm looking for $X'), Being aggressive (polite persistence wins). Real result: 80% of candidates who negotiate get 5-15% more. That's $5K-$20K for one conversation."
                },
                {
                    question: "What's the biggest difference between working at a startup vs big tech as a data engineer?",
                    answer: "Startup (< 200 people): Pros: Huge scope (you build everything), Fast impact (ship in days), Wear many hats (data eng + analytics + some ML), Direct access to leadership, Equity upside. Cons: Scrappy (manual work, not perfect), Chaos (priorities change weekly), Longer hours (50-60/wk), Lower pay ($100K-$140K), Risk (startup might fail). Big Tech (FAANG): Pros: High pay ($150K-$350K), Cutting-edge tech (Kafka, Flink), Mentorship (senior engineers), Brand name (resume boost), Stability. Cons: Narrow scope (one piece of pipeline), Slow (weeks for code review), Bureaucracy (meetings), Politics (promotion committees). Recommendation: Early career (0-3 years): Big tech or mid-size (learn best practices). Mid career (3-7 years): Startup (use skills, build from scratch, equity upside). Late career (7+ years): Wherever you want (you have leverage). Reality: Most people alternate (2 years startup, 3 years big tech, repeat)."
                }
            ]
        }
    ]
};
