# PostgreSQL Query Optimization Techniques

Query performance can make or break your application. Let's explore practical techniques for optimizing PostgreSQL queries.

## Understanding EXPLAIN

The `EXPLAIN` command shows the execution plan PostgreSQL chooses.

### Basic EXPLAIN

```sql
EXPLAIN SELECT * FROM users WHERE email = 'yalathiya.it@gmail.com';
```

### EXPLAIN ANALYZE

Actually runs the query and shows real timing:

```sql
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'yalathiya.it@gmail.com';
```

### Reading EXPLAIN Output

```
Seq Scan on users  (cost=0.00..180.00 rows=1 width=100)
  Filter: (email = 'yalathiya.it@gmail.com')
```

- **Seq Scan**: Sequential scan (reading every row)
- **cost**: Estimated startup and total cost
- **rows**: Estimated rows returned
- **width**: Average row width in bytes

## Index Strategies

### 1. B-Tree Indexes (Default)

```sql
-- Create index
CREATE INDEX idx_users_email ON users(email);

-- Composite index for multiple columns
CREATE INDEX idx_users_name_age ON users(last_name, first_name, age);
```

### 2. Partial Indexes

Index only rows that match a condition:

```sql
-- Index only active users
CREATE INDEX idx_active_users 
ON users(email) 
WHERE status = 'active';

-- Query that uses the partial index
SELECT * FROM users 
WHERE email = 'yalathiya.it@gmail.com' 
AND status = 'active';
```

### 3. Expression Indexes

```sql
-- Index on computed value
CREATE INDEX idx_users_lower_email 
ON users(LOWER(email));

-- Query using the expression index
SELECT * FROM users 
WHERE LOWER(email) = 'yalathiya.it@gmail.com';
```

### 4. GIN Indexes for Arrays and JSONB

```sql
-- For array columns
CREATE INDEX idx_tags ON posts USING gin(tags);

SELECT * FROM posts WHERE tags @> ARRAY['postgresql', 'optimization'];

-- For JSONB columns
CREATE INDEX idx_metadata ON users USING gin(metadata);

SELECT * FROM users WHERE metadata @> '{"premium": true}';
```

## Query Optimization Techniques

### 1. Avoid SELECT *

```sql
-- Bad: Fetches all columns
SELECT * FROM users WHERE id = 1;

-- Good: Fetch only needed columns
SELECT id, email, name FROM users WHERE id = 1;
```

### 2. Use EXISTS Instead of IN

```sql
-- Less efficient
SELECT * FROM users 
WHERE id IN (SELECT user_id FROM orders WHERE total > 1000);

-- More efficient
SELECT * FROM users u
WHERE EXISTS (
    SELECT 1 FROM orders o 
    WHERE o.user_id = u.id AND o.total > 1000
);
```

### 3. Optimize JOINs

```sql
-- Ensure JOIN columns are indexed
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_users_id ON users(id);

-- Efficient JOIN
SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name;
```

### 4. Limit and Offset Optimization

```sql
-- Slow for large offsets
SELECT * FROM orders 
ORDER BY created_at DESC 
LIMIT 10 OFFSET 10000;

-- Faster: Use keyset pagination
SELECT * FROM orders 
WHERE created_at < '2024-01-01 00:00:00'
ORDER BY created_at DESC 
LIMIT 10;
```

## Advanced Techniques

### 1. Common Table Expressions (CTEs)

```sql
WITH high_value_orders AS (
    SELECT user_id, SUM(total) as total_spent
    FROM orders
    WHERE total > 1000
    GROUP BY user_id
)
SELECT u.name, hvo.total_spent
FROM users u
JOIN high_value_orders hvo ON u.id = hvo.user_id
ORDER BY hvo.total_spent DESC;
```

### 2. Window Functions

```sql
-- Get top 3 orders per user
WITH ranked_orders AS (
    SELECT 
        user_id,
        total,
        ROW_NUMBER() OVER (
            PARTITION BY user_id 
            ORDER BY total DESC
        ) as rank
    FROM orders
)
SELECT * FROM ranked_orders WHERE rank <= 3;
```

### 3. Materialized Views

```sql
-- Create materialized view for expensive query
CREATE MATERIALIZED VIEW user_statistics AS
SELECT 
    u.id,
    u.name,
    COUNT(o.id) as order_count,
    SUM(o.total) as total_spent,
    AVG(o.total) as avg_order_value
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name;

-- Create index on materialized view
CREATE INDEX idx_user_stats_id ON user_statistics(id);

-- Refresh when needed
REFRESH MATERIALIZED VIEW user_statistics;

-- Query the materialized view
SELECT * FROM user_statistics WHERE total_spent > 10000;
```

## Vacuum and Analyze

### Regular Maintenance

```sql
-- Update statistics for query planner
ANALYZE users;

-- Reclaim space and update statistics
VACUUM ANALYZE users;

-- Full vacuum (requires table lock)
VACUUM FULL users;
```

### Auto-vacuum Configuration

```sql
-- Check autovacuum settings
SHOW autovacuum;

-- Configure per table
ALTER TABLE users SET (
    autovacuum_vacuum_scale_factor = 0.1,
    autovacuum_analyze_scale_factor = 0.05
);
```

## Connection Pooling

### Using pgBouncer

```ini
[databases]
mydb = host=localhost port=5432 dbname=mydb

[pgbouncer]
listen_port = 6432
listen_addr = *
auth_type = md5
auth_file = /etc/pgbouncer/userlist.txt
pool_mode = transaction
max_client_conn = 1000
default_pool_size = 25
```

### Python Connection Pool

```python
from psycopg2 import pool

connection_pool = pool.SimpleConnectionPool(
    minconn=5,
    maxconn=20,
    host='localhost',
    database='mydb',
    user='user',
    password='password'
)

def execute_query(query, params):
    conn = connection_pool.getconn()
    try:
        with conn.cursor() as cur:
            cur.execute(query, params)
            return cur.fetchall()
    finally:
        connection_pool.putconn(conn)
```

## Monitoring Queries

### Enable Query Logging

```sql
-- Log slow queries
ALTER SYSTEM SET log_min_duration_statement = 1000; -- 1 second
SELECT pg_reload_conf();
```

### Find Slow Queries

```sql
-- Using pg_stat_statements extension
CREATE EXTENSION pg_stat_statements;

-- Top 10 slowest queries
SELECT 
    query,
    mean_exec_time,
    calls,
    total_exec_time
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;
```

### Index Usage Statistics

```sql
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan,
    idx_tup_read,
    idx_tup_fetch
FROM pg_stat_user_indexes
WHERE idx_scan = 0
AND indexname NOT LIKE 'pg_%';
```

## Best Practices Checklist

1. ✅ Index foreign keys
2. ✅ Use EXPLAIN ANALYZE for slow queries
3. ✅ Avoid N+1 query problems
4. ✅ Use connection pooling
5. ✅ Run VACUUM ANALYZE regularly
6. ✅ Monitor query performance
7. ✅ Use appropriate index types
8. ✅ Keep statistics up to date
9. ✅ Optimize JOIN order
10. ✅ Use batching for bulk operations

## Conclusion

Query optimization is an iterative process:

1. Measure: Use EXPLAIN ANALYZE
2. Index: Add appropriate indexes
3. Rewrite: Optimize query structure
4. Monitor: Track performance over time
5. Maintain: Regular VACUUM and ANALYZE

Remember: premature optimization is the root of all evil. Profile first, then optimize.
