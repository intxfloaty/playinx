alter table "public"."lineup" alter column "player_id" drop default;

alter table "public"."players" add column "player_user_id" uuid null;

alter table "public"."players" add constraint "players_player_user_id_fkey" FOREIGN KEY (player_user_id) REFERENCES profiles(user_id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."players" validate constraint "players_player_user_id_fkey";
