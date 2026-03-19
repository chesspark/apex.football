export interface Club {
  id: number;
  name: string;
  short_name: string;
  code: string;
  logo_url: string | null;
  stadium: string;
  stadium_lat: number;
  stadium_lng: number;
  city: string;
  country: string;
  founded: number | null;
  primary_color: string;
  secondary_color: string;
}

export interface Player {
  id: number;
  name: string;
  name_ar: string | null;
  club_id: number;
  nationality: string;
  nationality_code: string;
  date_of_birth: string | null;
  age: number | null;
  height_cm: number | null;
  weight_kg: number | null;
  position: string;
  shirt_number: number | null;
  photo_url: string | null;
  goals: number;
  assists: number;
  appearances: number;
  clean_sheets: number;
  yellow_cards: number;
  red_cards: number;
  minutes_played: number;
  rating: number;
  market_value_millions: number;
  preferred_foot: string;
  club?: Club;
}

export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  role: "user" | "admin" | "super_admin";
  created_at: string;
  updated_at: string;
}

export interface LiveMatch {
  id: number;
  home_club_id: number;
  away_club_id: number;
  home_score: number;
  away_score: number;
  status: "live" | "ht" | "ft" | "upcoming";
  minute: number | null;
  tournament: string;
  match_date: string;
  stadium: string | null;
  stadium_lat: number | null;
  stadium_lng: number | null;
  home_club?: Club;
  away_club?: Club;
}

export interface Database {
  public: {
    Tables: {
      clubs: { Row: Club; Insert: Omit<Club, "id">; Update: Partial<Club> };
      players: { Row: Player; Insert: Omit<Player, "id">; Update: Partial<Player> };
      live_matches: {
        Row: LiveMatch;
        Insert: Omit<LiveMatch, "id">;
        Update: Partial<Omit<LiveMatch, "id">>;
      };
      profiles: {
        Row: Profile;
        Insert: {
          id: string;
          email?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: "user" | "admin" | "super_admin";
        };
        Update: Partial<Omit<Profile, "id">>;
      };
    };
  };
}
