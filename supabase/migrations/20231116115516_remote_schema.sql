
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE OR REPLACE FUNCTION "public"."add_event_to_team"("p_team_id" "uuid", "p_event_id" "text") RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  UPDATE teams
  SET events = array_append(events, p_event_id)
  WHERE team_id = p_team_id;
END;
$$;

ALTER FUNCTION "public"."add_event_to_team"("p_team_id" "uuid", "p_event_id" "text") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."add_player_to_team"("p_team_id" "uuid", "p_user_id" "text") RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  UPDATE teams
  SET players = array_append(players, p_user_id)
  WHERE team_id = p_team_id;
END;
$$;

ALTER FUNCTION "public"."add_player_to_team"("p_team_id" "uuid", "p_user_id" "text") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."add_team_to_event"("p_team_id" "text", "p_team_admin" "text", "p_team_name" "text", "p_payment_status" "text", "p_event_id" "uuid") RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  UPDATE events
  SET teams = teams || jsonb_build_object('teamId', p_team_id, 'teamAdmin', p_team_admin, 'teamName', p_team_name, 'paymentStatus', p_payment_status)
  WHERE id = p_event_id;
END;
$$;

ALTER FUNCTION "public"."add_team_to_event"("p_team_id" "text", "p_team_admin" "text", "p_team_name" "text", "p_payment_status" "text", "p_event_id" "uuid") OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."event_teams" (
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "team_name" "text" NOT NULL,
    "team_id" "uuid" NOT NULL,
    "team_admin" "text" NOT NULL,
    "event_id" "uuid" NOT NULL,
    "payment_status" "text" NOT NULL,
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "event_name" "text",
    "team_rating" "text" NOT NULL,
    "players" "text"[] NOT NULL,
    "event_type" "text",
    "perf_status" "text"
);

ALTER TABLE "public"."event_teams" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."events" (
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "location" "text" NOT NULL,
    "type" "text" NOT NULL,
    "category" "text" NOT NULL,
    "name" "text" NOT NULL,
    "format" "text" NOT NULL,
    "start_date" "text" NOT NULL,
    "prize_money" "text",
    "entry_fee" "text",
    "teams" "jsonb" DEFAULT '[]'::"jsonb" NOT NULL,
    "status" "text" DEFAULT 'filling slots'::"text" NOT NULL,
    "banner_image_URL" "text" NOT NULL,
    "description" "text",
    "event_admin" "uuid" NOT NULL
);

ALTER TABLE "public"."events" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."lineup" (
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "match_id" "uuid" NOT NULL,
    "team_id" "uuid" NOT NULL,
    "player_name" "text" NOT NULL,
    "player_position" "text" NOT NULL,
    "player_rating" "text" NOT NULL,
    "payment_status" "text" DEFAULT 'pending'::"text" NOT NULL,
    "lineup_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "player_id" "uuid" DEFAULT "auth"."uid"() NOT NULL,
    "goals" "text",
    "assists" "text",
    "card" "text",
    "match_rating" "text"
);

ALTER TABLE "public"."lineup" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."match_official" (
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" "text" NOT NULL,
    "id" "uuid" DEFAULT "auth"."uid"() NOT NULL,
    "location" "text" NOT NULL
);

ALTER TABLE "public"."match_official" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."matches" (
    "match_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "format" "text" NOT NULL,
    "location" "text" NOT NULL,
    "date" "text" NOT NULL,
    "time" "text" NOT NULL,
    "opponent_name" "text",
    "team_id" "uuid" NOT NULL,
    "opponent_id" "uuid",
    "team_name" "text" NOT NULL,
    "match_status" "text" DEFAULT 'pending'::"text",
    "opponent_status" "text" DEFAULT 'pending'::"text" NOT NULL,
    "match_official" "text",
    "team_score" "text",
    "opponent_score" "text",
    "team_rating" "text" NOT NULL,
    "opponent_rating" "text",
    "team_corner" "text",
    "opponent_corner" "text",
    "team_yellow_card" "text",
    "opponent_yellow_card" "text",
    "team_red_card" "text",
    "opponent_red_card" "text",
    "team_discipline" "text",
    "opponent_discipline" "text",
    "best_player" "text",
    "team_match_rating" "text",
    "opponent_match_rating" "text",
    "match_type" "text" NOT NULL,
    "event_id" "uuid"
);

ALTER TABLE "public"."matches" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."players" (
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "team_id" "uuid" NOT NULL,
    "player_name" "text" NOT NULL,
    "player_position" "text" NOT NULL,
    "player_phone" "text" NOT NULL,
    "player_rating" "text" NOT NULL,
    "player_dob" "text" NOT NULL,
    "player_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "avatar_URL" "text",
    "team_name" "text"
);

ALTER TABLE "public"."players" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "name" "text" NOT NULL,
    "phone" "text" NOT NULL,
    "dob" "text" NOT NULL,
    "gender" "text" NOT NULL,
    "position" "text" NOT NULL,
    "user_id" "uuid" DEFAULT "auth"."uid"() NOT NULL,
    "rating" "text" NOT NULL,
    "avatar_URL" "text"
);

ALTER TABLE "public"."profiles" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."teams" (
    "team_name" "text" NOT NULL,
    "format" "text" NOT NULL,
    "location" "text" NOT NULL,
    "team_admin" "uuid" NOT NULL,
    "rating" "text" NOT NULL,
    "team_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "players" "text"[],
    "events" "text"[]
);

ALTER TABLE "public"."teams" OWNER TO "postgres";

ALTER TABLE ONLY "public"."matches"
    ADD CONSTRAINT "Matches_pkey" PRIMARY KEY ("match_id");

ALTER TABLE ONLY "public"."event_teams"
    ADD CONSTRAINT "event_teams_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."lineup"
    ADD CONSTRAINT "lineup_pkey" PRIMARY KEY ("lineup_id");

ALTER TABLE ONLY "public"."players"
    ADD CONSTRAINT "players_pkey" PRIMARY KEY ("player_id");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_avatar_URL_key" UNIQUE ("avatar_URL");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("user_id");

ALTER TABLE ONLY "public"."teams"
    ADD CONSTRAINT "teams_pkey" PRIMARY KEY ("team_id");

ALTER TABLE ONLY "public"."teams"
    ADD CONSTRAINT "teams_team_id_key" UNIQUE ("team_id");

ALTER TABLE ONLY "public"."events"
    ADD CONSTRAINT "tournaments_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."lineup"
    ADD CONSTRAINT "lineup_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "public"."matches"("match_id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."matches"
    ADD CONSTRAINT "matches_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."matches"
    ADD CONSTRAINT "matches_opponent_id_fkey" FOREIGN KEY ("opponent_id") REFERENCES "public"."teams"("team_id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."matches"
    ADD CONSTRAINT "matches_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("team_id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."players"
    ADD CONSTRAINT "players_avatar_URL_fkey" FOREIGN KEY ("avatar_URL") REFERENCES "public"."profiles"("avatar_URL") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."players"
    ADD CONSTRAINT "players_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("team_id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."teams"
    ADD CONSTRAINT "teams_team_admin_fkey" FOREIGN KEY ("team_admin") REFERENCES "public"."profiles"("user_id") ON DELETE CASCADE;

CREATE POLICY "Enable insert for authenticated users only" ON "public"."players" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."profiles" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."teams" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable select for authenticated users only" ON "public"."players" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "Enable select for authenticated users only" ON "public"."profiles" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "Enable select for authenticated users only" ON "public"."teams" FOR SELECT USING (true);

CREATE POLICY "Enable update for authenticated users based on user_id" ON "public"."profiles" FOR UPDATE TO "authenticated" USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));

CREATE POLICY "Enable update for authenticated users only" ON "public"."teams" FOR UPDATE TO "authenticated" USING (true) WITH CHECK (true);

CREATE POLICY "enable insert for authenticated users only" ON "public"."event_teams" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "enable insert for authenticated users only" ON "public"."events" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "enable insert for authenticated users only" ON "public"."matches" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "enable select for authenticated users only" ON "public"."event_teams" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "enable select for authenticated users only" ON "public"."events" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "enable select for authenticated users only" ON "public"."matches" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "enable select, insert, update, delete for authenticated users" ON "public"."lineup" TO "authenticated" USING (true) WITH CHECK (true);

CREATE POLICY "enable update for authenticated users" ON "public"."matches" FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "enable update for authenticated users only" ON "public"."event_teams" FOR UPDATE TO "authenticated" USING (true) WITH CHECK (true);

CREATE POLICY "enable update for authenticated users only" ON "public"."events" FOR UPDATE TO "authenticated" USING (true) WITH CHECK (true);

ALTER TABLE "public"."event_teams" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."events" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."lineup" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."match_official" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."matches" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."players" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."teams" ENABLE ROW LEVEL SECURITY;

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."add_event_to_team"("p_team_id" "uuid", "p_event_id" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."add_event_to_team"("p_team_id" "uuid", "p_event_id" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."add_event_to_team"("p_team_id" "uuid", "p_event_id" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."add_player_to_team"("p_team_id" "uuid", "p_user_id" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."add_player_to_team"("p_team_id" "uuid", "p_user_id" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."add_player_to_team"("p_team_id" "uuid", "p_user_id" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."add_team_to_event"("p_team_id" "text", "p_team_admin" "text", "p_team_name" "text", "p_payment_status" "text", "p_event_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."add_team_to_event"("p_team_id" "text", "p_team_admin" "text", "p_team_name" "text", "p_payment_status" "text", "p_event_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."add_team_to_event"("p_team_id" "text", "p_team_admin" "text", "p_team_name" "text", "p_payment_status" "text", "p_event_id" "uuid") TO "service_role";

GRANT ALL ON TABLE "public"."event_teams" TO "anon";
GRANT ALL ON TABLE "public"."event_teams" TO "authenticated";
GRANT ALL ON TABLE "public"."event_teams" TO "service_role";

GRANT ALL ON TABLE "public"."events" TO "anon";
GRANT ALL ON TABLE "public"."events" TO "authenticated";
GRANT ALL ON TABLE "public"."events" TO "service_role";

GRANT ALL ON TABLE "public"."lineup" TO "anon";
GRANT ALL ON TABLE "public"."lineup" TO "authenticated";
GRANT ALL ON TABLE "public"."lineup" TO "service_role";

GRANT ALL ON TABLE "public"."match_official" TO "anon";
GRANT ALL ON TABLE "public"."match_official" TO "authenticated";
GRANT ALL ON TABLE "public"."match_official" TO "service_role";

GRANT ALL ON TABLE "public"."matches" TO "anon";
GRANT ALL ON TABLE "public"."matches" TO "authenticated";
GRANT ALL ON TABLE "public"."matches" TO "service_role";

GRANT ALL ON TABLE "public"."players" TO "anon";
GRANT ALL ON TABLE "public"."players" TO "authenticated";
GRANT ALL ON TABLE "public"."players" TO "service_role";

GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";

GRANT ALL ON TABLE "public"."teams" TO "anon";
GRANT ALL ON TABLE "public"."teams" TO "authenticated";
GRANT ALL ON TABLE "public"."teams" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
