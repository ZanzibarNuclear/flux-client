CREATE TABLE fluxes (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  user_id INTEGER NOT NULL,
  parent_id INTEGER,
  reply_count INTEGER DEFAULT 0,
  boost_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  FOREIGN KEY (parent_id) REFERENCES fluxes(id) ON DELETE SET NULL;
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
