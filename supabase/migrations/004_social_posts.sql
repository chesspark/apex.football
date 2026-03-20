-- Fil social Apex.Football — posts publics, snapshot auteur (pas d’exposition profiles en masse)
-- Exécuter après 003_profiles_social.sql

CREATE TABLE IF NOT EXISTS public.social_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  author_username TEXT,
  author_display_name TEXT,
  author_avatar_url TEXT,
  body TEXT NOT NULL CHECK (char_length(trim(body)) > 0 AND char_length(body) <= 5000),
  club_slug TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS social_posts_created_idx ON public.social_posts (created_at DESC);
CREATE INDEX IF NOT EXISTS social_posts_author_idx ON public.social_posts (author_id);
CREATE INDEX IF NOT EXISTS social_posts_club_slug_idx ON public.social_posts (club_slug) WHERE club_slug IS NOT NULL;

COMMENT ON TABLE public.social_posts IS 'Fil social MVP — snapshot auteur à l’insertion';

-- Snapshot depuis profiles (évite JOIN RLS sur profiles pour le fil)
CREATE OR REPLACE FUNCTION public.social_posts_set_author_snapshot()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  SELECT
    NULLIF(trim(p.username), ''),
    COALESCE(NULLIF(trim(p.display_name), ''), NULLIF(trim(p.full_name), ''), 'Supporter'),
    p.avatar_url
  INTO NEW.author_username, NEW.author_display_name, NEW.author_avatar_url
  FROM public.profiles p
  WHERE p.id = NEW.author_id;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS social_posts_author_snapshot ON public.social_posts;
CREATE TRIGGER social_posts_author_snapshot
  BEFORE INSERT ON public.social_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.social_posts_set_author_snapshot();

CREATE OR REPLACE FUNCTION public.social_posts_touch_updated()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS social_posts_updated ON public.social_posts;
CREATE TRIGGER social_posts_updated
  BEFORE UPDATE ON public.social_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.social_posts_touch_updated();

ALTER TABLE public.social_posts ENABLE ROW LEVEL SECURITY;

-- Lecture publique (anon + auth) pour le fil
CREATE POLICY "social_posts_select_all"
  ON public.social_posts FOR SELECT
  USING (true);

CREATE POLICY "social_posts_insert_own"
  ON public.social_posts FOR INSERT
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "social_posts_update_own"
  ON public.social_posts FOR UPDATE
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "social_posts_delete_own"
  ON public.social_posts FOR DELETE
  USING (auth.uid() = author_id);
