DROP TABLE IF EXISTS flux_boosts;
DROP TABLE IF EXISTS fluxes;
DROP TABLE IF EXISTS flux_authors;

CREATE TABLE flux_authors (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  handle VARCHAR(50) UNIQUE NOT NULL,
  display_name VARCHAR(100) NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX idx_flux_authors_handle ON flux_authors(handle);

CREATE TABLE fluxes (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  author_id INTEGER NOT NULL,
  parent_id INTEGER,
  reply_count INTEGER DEFAULT 0,
  boost_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (parent_id) REFERENCES fluxes(id) ON DELETE SET NULL,
  FOREIGN KEY (author_id) REFERENCES flux_authors(id) ON DELETE CASCADE
);

CREATE TABLE flux_boosts (
  id SERIAL PRIMARY KEY,
  flux_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (flux_id, user_id),
  FOREIGN KEY (flux_id) REFERENCES fluxes(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


# Here's a SQL query that fetches the latest up to 10 fluxes, including the author's handle, and provides information for pagination:

SELECT 
  f.id,
  f.content,
  fa.handle AS author_handle,
  f.parent_id,
  f.reply_count,
  f.boost_count,
  f.created_at,
  f.updated_at
FROM 
  fluxes f
JOIN 
  flux_authors fa ON f.author_id = fa.id
WHERE 
  f.deleted_at IS NULL
ORDER BY 
  f.created_at DESC
LIMIT 11;

# We use LIMIT 11 instead of 10. This allows us to fetch one extra record, which we can use to determine if there are more records available for the next batch.

# Fetch 11 records.
# If you get 11 records, use only the first 10 for display.
# The existence of the 11th record indicates there are more fluxes available for the next batch.
# Use the created_at value of the 10th record as the starting point for the next query.
# For pagination, you can modify the query to use a cursor-based approach:

SELECT 
  f.id,
  f.content,
  fa.handle AS author_handle,
  f.parent_id,
  f.reply_count,
  f.boost_count,
  f.created_at,
  f.updated_at
FROM 
  fluxes f
JOIN 
  flux_authors fa ON f.author_id = fa.id
WHERE 
  f.deleted_at IS NULL
  AND f.created_at < :last_created_at
ORDER BY 
  f.created_at DESC
LIMIT 11;

# Here is a query to get flux_authors for a list of handles:

SELECT 
  id,
  handle,
  display_name,
  avatar_url,
  created_at,
  updated_at
FROM 
  flux_authors
WHERE 
  handle = ANY($1::varchar[]);

const handles = ['user1', 'user2', 'user3'];
const result = await client.query(
  'SELECT id, handle, display_name, avatar_url, created_at, updated_at FROM flux_authors WHERE handle = ANY($1::varchar[])',
  [handles]
);
