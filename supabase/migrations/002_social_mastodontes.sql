-- Absolument Football — socle social + mastodontes (MVP)
-- Exécuter après 001_profiles.sql

-- ─── Mastodontes (snapshot seed — peut être alimenté par ETL plus tard) ───
CREATE TABLE IF NOT EXISTS public.mastodonte_clubs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  country TEXT NOT NULL,
  league TEXT,
  deloitte_revenue_m_eur NUMERIC,
  transfermarkt_squad_value_m_eur NUMERIC,
  composite_score NUMERIC,
  season_label TEXT DEFAULT '2025-26 (seed MVP)',
  source_notes TEXT,
  sort_order INT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS mastodonte_clubs_composite_idx ON public.mastodonte_clubs (composite_score DESC NULLS LAST);

ALTER TABLE public.mastodonte_clubs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "mastodonte_read_all"
  ON public.mastodonte_clubs FOR SELECT
  USING (true);

CREATE POLICY "mastodonte_write_service"
  ON public.mastodonte_clubs FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- ─── Posts sociaux ───
CREATE TABLE IF NOT EXISTS public.social_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  media_url TEXT,
  club_slug TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS social_posts_created_idx ON public.social_posts (created_at DESC);

ALTER TABLE public.social_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "social_posts_read_all"
  ON public.social_posts FOR SELECT
  USING (true);

CREATE POLICY "social_posts_insert_own"
  ON public.social_posts FOR INSERT
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "social_posts_update_own"
  ON public.social_posts FOR UPDATE
  USING (auth.uid() = author_id);

CREATE POLICY "social_posts_delete_own"
  ON public.social_posts FOR DELETE
  USING (auth.uid() = author_id);

-- ─── Fan clubs (socle) ───
CREATE TABLE IF NOT EXISTS public.fan_clubs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  club_slug TEXT,
  created_by UUID REFERENCES auth.users (id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.fan_club_members (
  fan_club_id UUID NOT NULL REFERENCES public.fan_clubs (id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member' CHECK (role IN ('member', 'mod', 'owner')),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (fan_club_id, user_id)
);

ALTER TABLE public.fan_clubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fan_club_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "fan_clubs_read_all" ON public.fan_clubs FOR SELECT USING (true);
CREATE POLICY "fan_clubs_insert_auth" ON public.fan_clubs FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "fan_club_members_read_all" ON public.fan_club_members FOR SELECT USING (true);
CREATE POLICY "fan_club_members_insert_own" ON public.fan_club_members FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "fan_club_members_delete_own" ON public.fan_club_members FOR DELETE USING (auth.uid() = user_id);

-- ─── Prédictions (MVP+) ───
-- live_match_id = id de public.live_matches (serial) quand la table existe (scripts/schema.sql / seed) ;
-- pas de FK ici pour ne pas casser un déploiement où seules les migrations 001+002 sont appliquées.
CREATE TABLE IF NOT EXISTS public.match_predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  live_match_id INT,
  home_score_pred INT NOT NULL,
  away_score_pred INT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, live_match_id)
);

ALTER TABLE public.match_predictions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "predictions_read_own" ON public.match_predictions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "predictions_insert_own" ON public.match_predictions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "predictions_update_own" ON public.match_predictions FOR UPDATE USING (auth.uid() = user_id);

COMMENT ON TABLE public.mastodonte_clubs IS 'Ranking Deloitte/TM démo — remplacer par données officielles en prod';
COMMENT ON TABLE public.social_posts IS 'Feed Absolument Football — MVP';
