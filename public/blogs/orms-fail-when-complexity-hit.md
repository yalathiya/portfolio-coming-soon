Let me share a real incident. I was trying to write a slightly complex query using ServiceStack.OrmLite. After nearly 2 hours of web crawling and experimentation, I realized that I couldn’t express the intended logic using the ORM with the same time & space complexity that I could achieve with a raw SQL query written in just 2 minutes. At that point, I asked myself: Why am I using an ORM? Just because it can generate SQL? But I can write more precise and intention-revealing queries myself.

ORMs take time to generate SQL that a developer could write directly - often with better control and performance predictability. Sure, ORMs are fine for simple CRUD operations, but the moment the logic becomes even slightly complex, the implementation time increases disproportionately. Beyond time cost, ORMs lack support for many essential SQL features, some of which are very basic: UNION, Tuples, CTEs, Window functions etc.. And my biggest headache - whenever I write ORM queries, I end up cross-verifying the generated SQL manually to ensure it matches my intent. What an underconfident developer! (: Jokes apart, I then looked into why ORMs are so hyped and came across the usual arguments:

## ORMs prevent SQL injection.
Yes & No - but not exclusive. SQL injection can be prevented using parameterized queries as well. Also, SQL injection is still possible with ORMs if used incorrectly.

## ORMs are database-agnostic.
Correct - but who actually switches production databases? In reality, almost no one migrates databases in production.

## ORMs help junior developers.
I disagree. It’s often easier to learn SQL directly than to learn SQL + ORM’s abstraction and syntax.

## ORMs help by auto-mapping models.
Partially true. If I’m fetching data from multiple tables with joins and selecting only a few fields, I often end up creating multiple DTOs just to support queries. 

Even most tech giants prefer custom query builders over full ORM implementations when dealing with complex systems/queries.
