-- Atlas Football Database Schema

DROP TABLE IF EXISTS live_matches CASCADE;
DROP TABLE IF EXISTS players CASCADE;
DROP TABLE IF EXISTS clubs CASCADE;

CREATE TABLE clubs (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  short_name TEXT NOT NULL,
  code TEXT NOT NULL,
  logo_url TEXT,
  stadium TEXT NOT NULL,
  stadium_lat DOUBLE PRECISION NOT NULL,
  stadium_lng DOUBLE PRECISION NOT NULL,
  city TEXT NOT NULL,
  country TEXT DEFAULT 'England',
  founded INTEGER,
  primary_color TEXT NOT NULL DEFAULT '#000000',
  secondary_color TEXT NOT NULL DEFAULT '#FFFFFF'
);

CREATE TABLE players (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  name_ar TEXT,
  club_id INTEGER REFERENCES clubs(id) ON DELETE CASCADE,
  nationality TEXT NOT NULL,
  nationality_code TEXT NOT NULL DEFAULT '',
  date_of_birth DATE,
  age INTEGER,
  height_cm INTEGER,
  weight_kg INTEGER,
  position TEXT NOT NULL,
  shirt_number INTEGER,
  photo_url TEXT,
  goals INTEGER DEFAULT 0,
  assists INTEGER DEFAULT 0,
  appearances INTEGER DEFAULT 0,
  clean_sheets INTEGER DEFAULT 0,
  yellow_cards INTEGER DEFAULT 0,
  red_cards INTEGER DEFAULT 0,
  minutes_played INTEGER DEFAULT 0,
  rating DECIMAL(3,1) DEFAULT 0,
  market_value_millions DECIMAL(6,1) DEFAULT 0,
  preferred_foot TEXT DEFAULT 'Right'
);

CREATE TABLE live_matches (
  id SERIAL PRIMARY KEY,
  home_club_id INTEGER REFERENCES clubs(id) ON DELETE CASCADE,
  away_club_id INTEGER REFERENCES clubs(id) ON DELETE CASCADE,
  home_score INTEGER DEFAULT 0,
  away_score INTEGER DEFAULT 0,
  status TEXT DEFAULT 'upcoming',
  minute INTEGER,
  tournament TEXT DEFAULT 'Premier League',
  match_date TIMESTAMPTZ,
  stadium TEXT,
  stadium_lat DOUBLE PRECISION,
  stadium_lng DOUBLE PRECISION
);

-- Indexes
CREATE INDEX idx_players_club ON players(club_id);
CREATE INDEX idx_players_position ON players(position);
CREATE INDEX idx_players_nationality ON players(nationality_code);
CREATE INDEX idx_players_rating ON players(rating DESC);
CREATE INDEX idx_matches_status ON live_matches(status);

-- Enable RLS but allow public read
ALTER TABLE clubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE live_matches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read clubs" ON clubs FOR SELECT USING (true);
CREATE POLICY "Public read players" ON players FOR SELECT USING (true);
CREATE POLICY "Public read matches" ON live_matches FOR SELECT USING (true);
