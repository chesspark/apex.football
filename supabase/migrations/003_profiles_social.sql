-- Profils sociaux Apex Football + compatibilité fournisseurs OAuth (Google, Apple)
-- Exécuter après 001_profiles.sql

-- ─── Colonnes sociales ───
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS username TEXT,
  ADD COLUMN IF NOT EXISTS display_name TEXT,
  ADD COLUMN IF NOT EXISTS bio TEXT,
  ADD COLUMN IF NOT EXISTS favorite_club_slug TEXT,
  ADD COLUMN IF NOT EXISTS website_url TEXT,
  ADD COLUMN IF NOT EXISTS profile_public BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN NOT NULL DEFAULT false;

COMMENT ON COLUMN public.profiles.username IS 'Identifiant public unique (slug), minuscules';
COMMENT ON COLUMN public.profiles.favorite_club_slug IS 'Réf. optionnelle seed mastodontes ou club générique';

CREATE UNIQUE INDEX IF NOT EXISTS profiles_username_lower_idx
  ON public.profiles (lower(username))
  WHERE username IS NOT NULL AND length(trim(username)) > 0;

-- ─── Trigger : enrichir nom / avatar selon Google, Apple, etc. ───
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_name TEXT;
  v_display TEXT;
BEGIN
  v_name := COALESCE(
    NULLIF(trim(NEW.raw_user_meta_data->>'full_name'), ''),
    NULLIF(trim(
      COALESCE(NEW.raw_user_meta_data->>'given_name', '') || ' ' ||
      COALESCE(NEW.raw_user_meta_data->>'family_name', '')
    ), ''),
    CASE
      WHEN jsonb_typeof(NEW.raw_user_meta_data->'name') = 'object' THEN
        NULLIF(trim(
          COALESCE(NEW.raw_user_meta_data#>>'{name,firstName}', '') || ' ' ||
          COALESCE(NEW.raw_user_meta_data#>>'{name,lastName}', '')
        ), '')
      ELSE NULLIF(trim(NEW.raw_user_meta_data->>'name'), '')
    END,
    split_part(COALESCE(NEW.email, ''), '@', 1)
  );

  v_display := COALESCE(
    NULLIF(trim(NEW.raw_user_meta_data->>'full_name'), ''),
    NULLIF(trim(
      COALESCE(NEW.raw_user_meta_data->>'given_name', '') || ' ' ||
      COALESCE(NEW.raw_user_meta_data->>'family_name', '')
    ), ''),
    v_name
  );

  INSERT INTO public.profiles (
    id, email, full_name, avatar_url, display_name
  )
  VALUES (
    NEW.id,
    NEW.email,
    v_name,
    NEW.raw_user_meta_data->>'avatar_url',
    v_display
  );
  RETURN NEW;
END;
$$;

-- ─── Lecture publique sécurisée : fonction (pas d’email / rôle exposés) ───
CREATE OR REPLACE FUNCTION public.get_public_profile(p_username TEXT)
RETURNS TABLE (
  user_id UUID,
  username TEXT,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  favorite_club_slug TEXT,
  website_url TEXT,
  created_at TIMESTAMPTZ
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    p.id,
    p.username,
    p.display_name,
    p.avatar_url,
    p.bio,
    p.favorite_club_slug,
    p.website_url,
    p.created_at
  FROM public.profiles p
  WHERE lower(trim(p.username)) = lower(trim(p_username))
    AND p.profile_public = true
    AND p.username IS NOT NULL
    AND length(trim(p.username)) > 0
  LIMIT 1;
$$;

REVOKE ALL ON FUNCTION public.get_public_profile(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_public_profile(TEXT) TO anon, authenticated;

-- Les utilisateurs peuvent toujours lire / mettre à jour leur ligne (politiques 001)
-- Pas de SELECT anonyme direct sur profiles pour les autres comptes.
