--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.4 (Ubuntu 15.4-1.pgdg20.04+1)

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

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', 'd4b694fd-24b0-476e-bac4-46bf310c5109', '{"action":"user_confirmation_requested","actor_id":"2b2fd1cc-3f22-4bb9-a6f5-20352b5b4def","actor_username":"praveshjha5@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2023-11-17 06:56:37.034129+00', ''),
	('00000000-0000-0000-0000-000000000000', '6ef31530-f70a-4cfc-8dc0-8ef23a58946c', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"praveshjha5@gmail.com","user_id":"2b2fd1cc-3f22-4bb9-a6f5-20352b5b4def","user_phone":""}}', '2023-11-17 06:58:42.409772+00', ''),
	('00000000-0000-0000-0000-000000000000', '2602b4f9-9fc9-43ad-bbd2-a7c757928906', '{"action":"user_signedup","actor_id":"46e1f0ce-34cb-455b-88b9-dec52fde9e98","actor_username":"praveshjha5@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2023-11-17 06:59:26.833237+00', ''),
	('00000000-0000-0000-0000-000000000000', '6b89ce04-d391-4d23-8697-32e59c8d6a4e', '{"action":"login","actor_id":"46e1f0ce-34cb-455b-88b9-dec52fde9e98","actor_username":"praveshjha5@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-11-17 06:59:26.835621+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dc0d84fa-7fc4-46fc-b856-c3896c48378f', '{"action":"token_refreshed","actor_id":"46e1f0ce-34cb-455b-88b9-dec52fde9e98","actor_username":"praveshjha5@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-11-17 08:13:09.297432+00', ''),
	('00000000-0000-0000-0000-000000000000', '36ca9b8d-30f8-4758-a5e9-df51946eafd4', '{"action":"token_revoked","actor_id":"46e1f0ce-34cb-455b-88b9-dec52fde9e98","actor_username":"praveshjha5@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-11-17 08:13:09.298045+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f2c7a391-666e-43d9-bf77-7c300cd55c22', '{"action":"login","actor_id":"46e1f0ce-34cb-455b-88b9-dec52fde9e98","actor_username":"praveshjha5@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-11-17 08:14:35.861658+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cb2b2a96-4ad6-4ae9-84de-97f8ba16b230', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"praveshjha5@gmail.com","user_id":"46e1f0ce-34cb-455b-88b9-dec52fde9e98","user_phone":""}}', '2023-11-17 09:06:39.776784+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ea66e640-e43a-4ebe-945c-db288bc6818d', '{"action":"user_signedup","actor_id":"e0e7bd9a-2305-4f01-8b8b-f9f9f33bfe68","actor_username":"praveshjha5@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2023-11-18 06:22:37.046322+00', ''),
	('00000000-0000-0000-0000-000000000000', '5ac39619-323e-4009-89af-8c042a009e33', '{"action":"login","actor_id":"e0e7bd9a-2305-4f01-8b8b-f9f9f33bfe68","actor_username":"praveshjha5@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-11-18 06:22:37.048535+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bc78c997-67f3-4117-b1e2-bfde6dcf727f', '{"action":"token_refreshed","actor_id":"e0e7bd9a-2305-4f01-8b8b-f9f9f33bfe68","actor_username":"praveshjha5@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-11-25 05:54:08.698363+00', ''),
	('00000000-0000-0000-0000-000000000000', 'facbacfc-1292-4d3b-afa0-1971270bc0d1', '{"action":"token_revoked","actor_id":"e0e7bd9a-2305-4f01-8b8b-f9f9f33bfe68","actor_username":"praveshjha5@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-11-25 05:54:08.70092+00', ''),
	('00000000-0000-0000-0000-000000000000', '8f366bde-1c2e-47f6-b28f-ee33b8ac3b90', '{"action":"token_refreshed","actor_id":"e0e7bd9a-2305-4f01-8b8b-f9f9f33bfe68","actor_username":"praveshjha5@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-11-25 05:54:08.732203+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dbeff8a6-a9d0-4983-8449-7bec62c152b4', '{"action":"token_refreshed","actor_id":"e0e7bd9a-2305-4f01-8b8b-f9f9f33bfe68","actor_username":"praveshjha5@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-11-25 05:54:08.903501+00', ''),
	('00000000-0000-0000-0000-000000000000', '7e005fcd-391c-498d-b5c4-1d53168eb48a', '{"action":"token_refreshed","actor_id":"e0e7bd9a-2305-4f01-8b8b-f9f9f33bfe68","actor_username":"praveshjha5@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-11-25 05:54:09.010057+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd755b99d-1e18-4cf7-b67c-fe9e94a32094', '{"action":"token_refreshed","actor_id":"e0e7bd9a-2305-4f01-8b8b-f9f9f33bfe68","actor_username":"praveshjha5@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-11-25 05:54:09.11992+00', ''),
	('00000000-0000-0000-0000-000000000000', '5f8a1984-1e36-41c7-99b7-19ce14f7977c', '{"action":"token_refreshed","actor_id":"e0e7bd9a-2305-4f01-8b8b-f9f9f33bfe68","actor_username":"praveshjha5@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-11-25 05:54:09.269279+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b767eecb-115e-4b5b-b70e-f5d968c1c031', '{"action":"token_refreshed","actor_id":"e0e7bd9a-2305-4f01-8b8b-f9f9f33bfe68","actor_username":"praveshjha5@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-11-25 05:54:10.016915+00', ''),
	('00000000-0000-0000-0000-000000000000', '50709b8b-4a14-45e9-aa1d-c5c6e31df95b', '{"action":"token_refreshed","actor_id":"e0e7bd9a-2305-4f01-8b8b-f9f9f33bfe68","actor_username":"praveshjha5@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-11-25 05:54:10.121821+00', ''),
	('00000000-0000-0000-0000-000000000000', '4da4cae2-1d1a-42b9-94b6-5ccee019021b', '{"action":"user_signedup","actor_id":"925a5d0f-942e-4adf-b467-7a7ee2809285","actor_username":"praveshjha1996@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2023-11-25 05:55:27.282587+00', ''),
	('00000000-0000-0000-0000-000000000000', '47eced88-b611-4fc2-b80b-1f9e38e31608', '{"action":"login","actor_id":"925a5d0f-942e-4adf-b467-7a7ee2809285","actor_username":"praveshjha1996@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-11-25 05:55:27.284542+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd3a64017-f678-4670-bfc6-f3e8a1e9caf5', '{"action":"token_refreshed","actor_id":"e0e7bd9a-2305-4f01-8b8b-f9f9f33bfe68","actor_username":"praveshjha5@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-11-25 06:54:07.55811+00', ''),
	('00000000-0000-0000-0000-000000000000', '6e6cfed9-55ea-4fa7-adfa-6a16b3c6ae3f', '{"action":"token_revoked","actor_id":"e0e7bd9a-2305-4f01-8b8b-f9f9f33bfe68","actor_username":"praveshjha5@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-11-25 06:54:07.558698+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b8d1abe4-40c9-4fdc-8436-caf0e544cd21', '{"action":"token_refreshed","actor_id":"925a5d0f-942e-4adf-b467-7a7ee2809285","actor_username":"praveshjha1996@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-11-25 07:18:40.827125+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cc12167a-c121-47d5-b7d2-f2d085e9a9f5', '{"action":"token_revoked","actor_id":"925a5d0f-942e-4adf-b467-7a7ee2809285","actor_username":"praveshjha1996@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-11-25 07:18:40.827702+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a7e6db7a-fc33-4a3e-bdcb-a0f8aae91936', '{"action":"token_refreshed","actor_id":"925a5d0f-942e-4adf-b467-7a7ee2809285","actor_username":"praveshjha1996@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-11-25 10:00:06.143103+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c25e4098-534b-45e3-a992-4cce86dc6236', '{"action":"token_revoked","actor_id":"925a5d0f-942e-4adf-b467-7a7ee2809285","actor_username":"praveshjha1996@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-11-25 10:00:06.143715+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fe9f537b-e184-4f14-9168-fca8365d1bfe', '{"action":"token_refreshed","actor_id":"925a5d0f-942e-4adf-b467-7a7ee2809285","actor_username":"praveshjha1996@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-11-25 11:04:57.461425+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e7a5a97a-3246-4b8b-b4f2-2b24e2d5f3bd', '{"action":"token_revoked","actor_id":"925a5d0f-942e-4adf-b467-7a7ee2809285","actor_username":"praveshjha1996@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-11-25 11:04:57.46207+00', ''),
	('00000000-0000-0000-0000-000000000000', '3228fd37-f5e9-4217-baaf-44739b315ffc', '{"action":"token_refreshed","actor_id":"e0e7bd9a-2305-4f01-8b8b-f9f9f33bfe68","actor_username":"praveshjha5@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-11-25 11:26:47.738672+00', ''),
	('00000000-0000-0000-0000-000000000000', '0d825c5e-4584-4f80-8435-4f0b548df610', '{"action":"token_revoked","actor_id":"e0e7bd9a-2305-4f01-8b8b-f9f9f33bfe68","actor_username":"praveshjha5@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-11-25 11:26:47.739277+00', ''),
	('00000000-0000-0000-0000-000000000000', '1b56d541-b8bd-4b51-8e4f-be6d990d10db', '{"action":"token_refreshed","actor_id":"e0e7bd9a-2305-4f01-8b8b-f9f9f33bfe68","actor_username":"praveshjha5@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-11-25 12:55:44.158459+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd4a8ce93-01dd-41b4-a0c5-7e4a8e27f35a', '{"action":"token_revoked","actor_id":"e0e7bd9a-2305-4f01-8b8b-f9f9f33bfe68","actor_username":"praveshjha5@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-11-25 12:55:44.159472+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fc840634-7a01-4fb7-ada6-2af921224248', '{"action":"token_refreshed","actor_id":"e0e7bd9a-2305-4f01-8b8b-f9f9f33bfe68","actor_username":"praveshjha5@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-11-26 04:36:26.060894+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f7fb4827-1e10-40a3-8dbb-bc44be55d37a', '{"action":"token_revoked","actor_id":"e0e7bd9a-2305-4f01-8b8b-f9f9f33bfe68","actor_username":"praveshjha5@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-11-26 04:36:26.063634+00', ''),
	('00000000-0000-0000-0000-000000000000', '8bb62b06-2250-4bd6-a250-dbebf0f9ad4a', '{"action":"logout","actor_id":"e0e7bd9a-2305-4f01-8b8b-f9f9f33bfe68","actor_username":"praveshjha5@gmail.com","actor_via_sso":false,"log_type":"account"}', '2023-11-26 04:36:51.404578+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fbbc4028-15e1-4677-82a8-38031575b483', '{"action":"user_signedup","actor_id":"10f9ce4a-ce61-434b-997f-09479c8d139b","actor_username":"player1@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2023-11-26 04:37:28.611793+00', ''),
	('00000000-0000-0000-0000-000000000000', '9e7eacef-f5aa-457f-9414-1dcb7f148e60', '{"action":"login","actor_id":"10f9ce4a-ce61-434b-997f-09479c8d139b","actor_username":"player1@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-11-26 04:37:28.613837+00', ''),
	('00000000-0000-0000-0000-000000000000', '77de07b1-4236-401c-8b91-53dee43d1dbd', '{"action":"logout","actor_id":"10f9ce4a-ce61-434b-997f-09479c8d139b","actor_username":"player1@gmail.com","actor_via_sso":false,"log_type":"account"}', '2023-11-26 04:38:10.213447+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd9b8a296-09fa-49bc-87aa-b9838dc4c924', '{"action":"user_signedup","actor_id":"98b54c85-e0da-4f32-bcae-79fbcdca1104","actor_username":"player2@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2023-11-26 04:38:28.373965+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ffa7ba09-7e7c-43c2-92c9-e040f6e536a8', '{"action":"login","actor_id":"98b54c85-e0da-4f32-bcae-79fbcdca1104","actor_username":"player2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-11-26 04:38:28.376037+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bd3df015-a9b6-475f-8a81-50521a4f5cfe', '{"action":"logout","actor_id":"98b54c85-e0da-4f32-bcae-79fbcdca1104","actor_username":"player2@gmail.com","actor_via_sso":false,"log_type":"account"}', '2023-11-26 04:38:59.138519+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ff49585b-d1d3-484b-a4cc-3e4d84e10e34', '{"action":"user_signedup","actor_id":"005e6a4b-e78e-4b9a-ae88-30a2a9945c1f","actor_username":"player3@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2023-11-26 04:39:24.091659+00', ''),
	('00000000-0000-0000-0000-000000000000', '39ec6226-73c5-4cc4-8e50-7203891737c7', '{"action":"login","actor_id":"005e6a4b-e78e-4b9a-ae88-30a2a9945c1f","actor_username":"player3@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-11-26 04:39:24.093608+00', ''),
	('00000000-0000-0000-0000-000000000000', '65bb2bc8-ac0c-4607-be04-b7fd713263cc', '{"action":"logout","actor_id":"005e6a4b-e78e-4b9a-ae88-30a2a9945c1f","actor_username":"player3@gmail.com","actor_via_sso":false,"log_type":"account"}', '2023-11-26 04:40:19.56398+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e4367d26-04f0-4a54-a4a6-3e35f2b5d4d3', '{"action":"user_signedup","actor_id":"7136aed3-b2a5-4416-a43b-3f9b9bf92d0a","actor_username":"player4@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2023-11-26 04:40:53.599876+00', ''),
	('00000000-0000-0000-0000-000000000000', '9913977e-5f51-4680-9bca-b0ef51abb890', '{"action":"login","actor_id":"7136aed3-b2a5-4416-a43b-3f9b9bf92d0a","actor_username":"player4@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-11-26 04:40:53.601813+00', ''),
	('00000000-0000-0000-0000-000000000000', '1f849c0c-5a50-4030-b93b-afd24e68b9ef', '{"action":"logout","actor_id":"7136aed3-b2a5-4416-a43b-3f9b9bf92d0a","actor_username":"player4@gmail.com","actor_via_sso":false,"log_type":"account"}', '2023-11-26 04:41:37.354271+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ac6562d3-184b-4b56-a373-ad4fa47e2731', '{"action":"user_signedup","actor_id":"649020bb-0ed5-42cb-9fc6-0bdb2babf1fa","actor_username":"player5@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2023-11-26 04:41:56.591179+00', ''),
	('00000000-0000-0000-0000-000000000000', '7cab9113-94cb-43e8-a1e2-097ee76daa22', '{"action":"login","actor_id":"649020bb-0ed5-42cb-9fc6-0bdb2babf1fa","actor_username":"player5@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-11-26 04:41:56.593201+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f115e7f9-0b49-49ce-9dd0-f0206870f777', '{"action":"logout","actor_id":"649020bb-0ed5-42cb-9fc6-0bdb2babf1fa","actor_username":"player5@gmail.com","actor_via_sso":false,"log_type":"account"}', '2023-11-26 04:42:31.54576+00', ''),
	('00000000-0000-0000-0000-000000000000', '2ab628f9-c097-4f92-8f30-9daf34011d7f', '{"action":"user_signedup","actor_id":"711c2e68-9079-484f-b3b8-4ad90326b192","actor_username":"player6@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2023-11-26 04:42:48.384735+00', ''),
	('00000000-0000-0000-0000-000000000000', '2cce4f39-ac31-4d03-8fa0-4b76f6798ec7', '{"action":"login","actor_id":"711c2e68-9079-484f-b3b8-4ad90326b192","actor_username":"player6@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-11-26 04:42:48.389073+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd4f70614-3c49-4c9c-939c-0bacdaacbd11', '{"action":"logout","actor_id":"711c2e68-9079-484f-b3b8-4ad90326b192","actor_username":"player6@gmail.com","actor_via_sso":false,"log_type":"account"}', '2023-11-26 04:43:37.369905+00', ''),
	('00000000-0000-0000-0000-000000000000', '98969cf6-cc21-4f2d-bac6-6a229add66e6', '{"action":"user_signedup","actor_id":"f4e88942-65db-4602-b1c8-ed761085ffd7","actor_username":"player7@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2023-11-26 04:43:53.380439+00', ''),
	('00000000-0000-0000-0000-000000000000', '660bebdd-57bf-44bb-8163-4e26688bc266', '{"action":"login","actor_id":"f4e88942-65db-4602-b1c8-ed761085ffd7","actor_username":"player7@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-11-26 04:43:53.382456+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c99a39b1-3bb5-4301-9e87-b1e7eadbb918', '{"action":"logout","actor_id":"f4e88942-65db-4602-b1c8-ed761085ffd7","actor_username":"player7@gmail.com","actor_via_sso":false,"log_type":"account"}', '2023-11-26 04:44:33.579424+00', ''),
	('00000000-0000-0000-0000-000000000000', '557f5ce4-a65f-4fef-9a82-663f99d5d837', '{"action":"user_signedup","actor_id":"6f06def4-83fe-4eda-8ad3-f9593938ac7f","actor_username":"player8@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2023-11-26 04:44:49.076046+00', ''),
	('00000000-0000-0000-0000-000000000000', '1b09b08a-ec53-4364-a2e2-025e0f340768', '{"action":"login","actor_id":"6f06def4-83fe-4eda-8ad3-f9593938ac7f","actor_username":"player8@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-11-26 04:44:49.078056+00', ''),
	('00000000-0000-0000-0000-000000000000', '470b3ab5-bbe6-4d39-adc6-0a9fba4cb98e', '{"action":"logout","actor_id":"6f06def4-83fe-4eda-8ad3-f9593938ac7f","actor_username":"player8@gmail.com","actor_via_sso":false,"log_type":"account"}', '2023-11-26 04:45:33.960619+00', ''),
	('00000000-0000-0000-0000-000000000000', '0e156ead-dde5-4f2d-804e-3358c512399d', '{"action":"user_signedup","actor_id":"f2ce51f8-c98f-45a3-abe9-3538008c5f02","actor_username":"player9@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2023-11-26 04:45:52.693321+00', ''),
	('00000000-0000-0000-0000-000000000000', '783cc1d5-14c1-4176-a745-74f3041fb3b4', '{"action":"login","actor_id":"f2ce51f8-c98f-45a3-abe9-3538008c5f02","actor_username":"player9@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-11-26 04:45:52.695173+00', ''),
	('00000000-0000-0000-0000-000000000000', '33012f2c-659e-46ca-9e27-3803533e4521', '{"action":"logout","actor_id":"f2ce51f8-c98f-45a3-abe9-3538008c5f02","actor_username":"player9@gmail.com","actor_via_sso":false,"log_type":"account"}', '2023-11-26 04:46:21.702287+00', ''),
	('00000000-0000-0000-0000-000000000000', '6d62681e-d7c6-4ca3-aede-4e6cc3778a9d', '{"action":"user_signedup","actor_id":"1be5564a-ce90-4456-8a11-720bcc85307b","actor_username":"player10@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2023-11-26 04:46:41.157945+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c336bd36-2f88-4254-a28a-0c024392a4a5', '{"action":"login","actor_id":"1be5564a-ce90-4456-8a11-720bcc85307b","actor_username":"player10@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-11-26 04:46:41.160162+00', ''),
	('00000000-0000-0000-0000-000000000000', '247574e4-91a0-4b72-bf48-6fcde52790a0', '{"action":"logout","actor_id":"1be5564a-ce90-4456-8a11-720bcc85307b","actor_username":"player10@gmail.com","actor_via_sso":false,"log_type":"account"}', '2023-11-26 04:47:21.159366+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e458e05d-3f19-4db3-9d27-2d23c43f77d8', '{"action":"user_signedup","actor_id":"7fd91904-42e4-4856-bd4a-3f81f22f5dc0","actor_username":"player11@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2023-11-26 05:03:14.749146+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e6fda35f-58a9-47fe-a615-991d84aa252b', '{"action":"login","actor_id":"7fd91904-42e4-4856-bd4a-3f81f22f5dc0","actor_username":"player11@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-11-26 05:03:14.751387+00', ''),
	('00000000-0000-0000-0000-000000000000', '527dac6f-c26d-427b-82ff-e3b92fff48d6', '{"action":"logout","actor_id":"7fd91904-42e4-4856-bd4a-3f81f22f5dc0","actor_username":"player11@gmail.com","actor_via_sso":false,"log_type":"account"}', '2023-11-26 05:03:58.653088+00', ''),
	('00000000-0000-0000-0000-000000000000', '8b707bbf-b15e-4741-b345-99afe9bbdd47', '{"action":"user_signedup","actor_id":"626bc610-ac53-451e-ba4c-d5b042d162cb","actor_username":"player12@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2023-11-26 05:04:16.323367+00', ''),
	('00000000-0000-0000-0000-000000000000', '420a79d6-0775-483a-9a63-c229b1036005', '{"action":"login","actor_id":"626bc610-ac53-451e-ba4c-d5b042d162cb","actor_username":"player12@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-11-26 05:04:16.325533+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a9899ab7-3e26-4f47-9ed6-6d026f21812a', '{"action":"logout","actor_id":"626bc610-ac53-451e-ba4c-d5b042d162cb","actor_username":"player12@gmail.com","actor_via_sso":false,"log_type":"account"}', '2023-11-26 05:04:48.311619+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd2248a80-5b70-4ac6-8e32-2a885227c91f', '{"action":"login","actor_id":"e0e7bd9a-2305-4f01-8b8b-f9f9f33bfe68","actor_username":"praveshjha5@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-11-26 05:05:08.803863+00', ''),
	('00000000-0000-0000-0000-000000000000', '9be9702f-6cb6-46a5-943b-b70dc21585cc', '{"action":"login","actor_id":"925a5d0f-942e-4adf-b467-7a7ee2809285","actor_username":"praveshjha1996@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-11-26 05:09:05.713378+00', ''),
	('00000000-0000-0000-0000-000000000000', '45b049b1-10a2-4ee5-b587-f7aff69e6151', '{"action":"token_refreshed","actor_id":"e0e7bd9a-2305-4f01-8b8b-f9f9f33bfe68","actor_username":"praveshjha5@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-11-26 06:03:21.209955+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ce133a74-34d3-4491-abf9-837fe1530c01', '{"action":"token_revoked","actor_id":"e0e7bd9a-2305-4f01-8b8b-f9f9f33bfe68","actor_username":"praveshjha5@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-11-26 06:03:21.210576+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e777468d-3482-4d8a-82b0-5a7e4c85ed92', '{"action":"token_refreshed","actor_id":"925a5d0f-942e-4adf-b467-7a7ee2809285","actor_username":"praveshjha1996@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-11-26 06:14:05.858681+00', ''),
	('00000000-0000-0000-0000-000000000000', '99ec96fe-ff07-4915-b7f5-3565a1c69dd9', '{"action":"token_revoked","actor_id":"925a5d0f-942e-4adf-b467-7a7ee2809285","actor_username":"praveshjha1996@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-11-26 06:14:05.85926+00', ''),
	('00000000-0000-0000-0000-000000000000', '2d52d4d3-38ec-41aa-91d9-0253922f8a82', '{"action":"token_refreshed","actor_id":"925a5d0f-942e-4adf-b467-7a7ee2809285","actor_username":"praveshjha1996@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-11-26 06:14:06.107711+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bbc5b269-c9d5-4e63-8c65-041bd86dedc9', '{"action":"token_refreshed","actor_id":"925a5d0f-942e-4adf-b467-7a7ee2809285","actor_username":"praveshjha1996@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-11-26 06:14:06.196853+00', ''),
	('00000000-0000-0000-0000-000000000000', '0194d9ad-3bf6-4e19-9272-74d366722ae1', '{"action":"token_refreshed","actor_id":"925a5d0f-942e-4adf-b467-7a7ee2809285","actor_username":"praveshjha1996@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-11-26 06:14:09.349369+00', ''),
	('00000000-0000-0000-0000-000000000000', '260e8949-820e-4a0f-9dbe-990cf8f98164', '{"action":"token_refreshed","actor_id":"e0e7bd9a-2305-4f01-8b8b-f9f9f33bfe68","actor_username":"praveshjha5@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-11-26 08:16:00.01024+00', ''),
	('00000000-0000-0000-0000-000000000000', '6b28ff48-0214-47d3-bb71-510a81c90cb2', '{"action":"token_revoked","actor_id":"e0e7bd9a-2305-4f01-8b8b-f9f9f33bfe68","actor_username":"praveshjha5@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-11-26 08:16:00.011263+00', ''),
	('00000000-0000-0000-0000-000000000000', '3c98d570-cc04-4f7c-a571-a2bd7ce43486', '{"action":"token_refreshed","actor_id":"925a5d0f-942e-4adf-b467-7a7ee2809285","actor_username":"praveshjha1996@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-11-26 08:16:00.027818+00', ''),
	('00000000-0000-0000-0000-000000000000', '12bf0b13-517c-43a1-9dec-8ae28f5db80a', '{"action":"token_revoked","actor_id":"925a5d0f-942e-4adf-b467-7a7ee2809285","actor_username":"praveshjha1996@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-11-26 08:16:00.028804+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ee9019bf-c49a-4d3c-af7e-e1628db3ea70', '{"action":"token_refreshed","actor_id":"925a5d0f-942e-4adf-b467-7a7ee2809285","actor_username":"praveshjha1996@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-11-26 10:28:26.760032+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fe02e631-917b-4340-8107-80034d86d85b', '{"action":"token_revoked","actor_id":"925a5d0f-942e-4adf-b467-7a7ee2809285","actor_username":"praveshjha1996@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-11-26 10:28:26.760708+00', ''),
	('00000000-0000-0000-0000-000000000000', '4acfcb19-946f-4f2b-815d-a059aa7f3c0c', '{"action":"token_refreshed","actor_id":"e0e7bd9a-2305-4f01-8b8b-f9f9f33bfe68","actor_username":"praveshjha5@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-11-26 10:28:26.77403+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b091c43b-ccac-424d-948c-641cbe04f869', '{"action":"token_revoked","actor_id":"e0e7bd9a-2305-4f01-8b8b-f9f9f33bfe68","actor_username":"praveshjha5@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-11-26 10:28:26.77459+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f76aa124-88ab-441d-82da-d85f82ae9611', '{"action":"token_refreshed","actor_id":"e0e7bd9a-2305-4f01-8b8b-f9f9f33bfe68","actor_username":"praveshjha5@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-11-26 12:15:34.880866+00', ''),
	('00000000-0000-0000-0000-000000000000', '50ed0f00-fa15-4e4f-9de9-4d624cd5f2fa', '{"action":"token_revoked","actor_id":"e0e7bd9a-2305-4f01-8b8b-f9f9f33bfe68","actor_username":"praveshjha5@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-11-26 12:15:34.88236+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c942914d-fcc4-49ab-acc1-6e1fd5001f88', '{"action":"login","actor_id":"925a5d0f-942e-4adf-b467-7a7ee2809285","actor_username":"praveshjha1996@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-11-26 12:21:46.536255+00', ''),
	('00000000-0000-0000-0000-000000000000', '79d76421-2a91-4437-87f9-61dbbd6982a1', '{"action":"token_refreshed","actor_id":"e0e7bd9a-2305-4f01-8b8b-f9f9f33bfe68","actor_username":"praveshjha5@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-11-26 13:13:37.407146+00', ''),
	('00000000-0000-0000-0000-000000000000', '9ba4626d-83c6-4eb0-bc66-f83851d20891', '{"action":"token_revoked","actor_id":"e0e7bd9a-2305-4f01-8b8b-f9f9f33bfe68","actor_username":"praveshjha5@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-11-26 13:13:37.407753+00', ''),
	('00000000-0000-0000-0000-000000000000', '56916df8-3a59-40e6-9bb2-e11981b1205f', '{"action":"token_refreshed","actor_id":"925a5d0f-942e-4adf-b467-7a7ee2809285","actor_username":"praveshjha1996@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-11-26 13:20:02.816086+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b18733f1-b81a-4324-b660-476ccecde600', '{"action":"token_revoked","actor_id":"925a5d0f-942e-4adf-b467-7a7ee2809285","actor_username":"praveshjha1996@gmail.com","actor_via_sso":false,"log_type":"token"}', '2023-11-26 13:20:02.817479+00', ''),
	('00000000-0000-0000-0000-000000000000', 'de34eb56-dc0e-4449-9923-a16af9f2831e', '{"action":"logout","actor_id":"e0e7bd9a-2305-4f01-8b8b-f9f9f33bfe68","actor_username":"praveshjha5@gmail.com","actor_via_sso":false,"log_type":"account"}', '2023-11-26 13:49:34.48901+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ca82f280-8a97-4d2d-a343-04b60e2964e9', '{"action":"login","actor_id":"e0e7bd9a-2305-4f01-8b8b-f9f9f33bfe68","actor_username":"praveshjha5@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-11-26 13:50:50.974308+00', ''),
	('00000000-0000-0000-0000-000000000000', '72ab4548-2162-494d-ab30-7e0b250ef248', '{"action":"login","actor_id":"925a5d0f-942e-4adf-b467-7a7ee2809285","actor_username":"praveshjha1996@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-11-26 13:51:14.022737+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd45a59c8-e23b-4edc-aa80-9bf0a8270d02', '{"action":"logout","actor_id":"e0e7bd9a-2305-4f01-8b8b-f9f9f33bfe68","actor_username":"praveshjha5@gmail.com","actor_via_sso":false,"log_type":"account"}', '2023-11-26 13:57:15.876973+00', ''),
	('00000000-0000-0000-0000-000000000000', '16c505b0-9c47-4cc2-8c10-e34863600371', '{"action":"login","actor_id":"f4e88942-65db-4602-b1c8-ed761085ffd7","actor_username":"player7@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-11-26 13:57:41.953923+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."flow_state" ("id", "user_id", "auth_code", "code_challenge_method", "code_challenge", "provider_type", "provider_access_token", "provider_refresh_token", "created_at", "updated_at", "authentication_method") VALUES
	('c7a591ce-01f5-4354-adf5-e64e0e047c88', '2b2fd1cc-3f22-4bb9-a6f5-20352b5b4def', 'd1993f37-db04-4c31-8a4a-14621ce79362', 's256', 'lCC0fd85QaF8sbU4ypH3wHquE1jgXgLmY9jRL_xV1lQ', 'email', '', '', '2023-11-17 06:56:37.035015+00', '2023-11-17 06:56:37.035015+00', 'email/signup');


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at") VALUES
	('00000000-0000-0000-0000-000000000000', 'f4e88942-65db-4602-b1c8-ed761085ffd7', 'authenticated', 'authenticated', 'player7@gmail.com', '$2a$10$VfB5hHo3zYi/TYeJJFtWBu7D7yJiYD06zOXBAOrmrLy6L0r6fX0UO', '2023-11-26 04:43:53.380931+00', NULL, '', NULL, '', NULL, '', '', NULL, '2023-11-26 13:57:41.954489+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2023-11-26 04:43:53.376639+00', '2023-11-26 13:57:41.956575+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL),
	('00000000-0000-0000-0000-000000000000', '10f9ce4a-ce61-434b-997f-09479c8d139b', 'authenticated', 'authenticated', 'player1@gmail.com', '$2a$10$fb6b7eY4a/KJqW0qw/S1Fu55tZnRKz6rfOVMoL0kMLm7lgmm9Spd.', '2023-11-26 04:37:28.612239+00', NULL, '', NULL, '', NULL, '', '', NULL, '2023-11-26 04:37:28.614273+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2023-11-26 04:37:28.608925+00', '2023-11-26 04:37:28.615675+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL),
	('00000000-0000-0000-0000-000000000000', '7fd91904-42e4-4856-bd4a-3f81f22f5dc0', 'authenticated', 'authenticated', 'player11@gmail.com', '$2a$10$.eqx3bGBGnJ9VUKIyXwFJOXBHp3zv9tube84PBzkaQzFpxPW1M0OS', '2023-11-26 05:03:14.749628+00', NULL, '', NULL, '', NULL, '', '', NULL, '2023-11-26 05:03:14.751877+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2023-11-26 05:03:14.746367+00', '2023-11-26 05:03:14.753651+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL),
	('00000000-0000-0000-0000-000000000000', '98b54c85-e0da-4f32-bcae-79fbcdca1104', 'authenticated', 'authenticated', 'player2@gmail.com', '$2a$10$CHrm9qSpwnEZWl/c5kuKBeXojCFaq/tn4Qrb00HO4eeQFD4VHfHNa', '2023-11-26 04:38:28.374428+00', NULL, '', NULL, '', NULL, '', '', NULL, '2023-11-26 04:38:28.37647+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2023-11-26 04:38:28.371085+00', '2023-11-26 04:38:28.37806+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL),
	('00000000-0000-0000-0000-000000000000', '005e6a4b-e78e-4b9a-ae88-30a2a9945c1f', 'authenticated', 'authenticated', 'player3@gmail.com', '$2a$10$vmHNpnkGi2FCqGkxN5aFF.RgfEI9j5EYn8hib/Je2Ls.AocTKYoVS', '2023-11-26 04:39:24.092099+00', NULL, '', NULL, '', NULL, '', '', NULL, '2023-11-26 04:39:24.094032+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2023-11-26 04:39:24.088917+00', '2023-11-26 04:39:24.095527+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL),
	('00000000-0000-0000-0000-000000000000', '6f06def4-83fe-4eda-8ad3-f9593938ac7f', 'authenticated', 'authenticated', 'player8@gmail.com', '$2a$10$1h.U1XiY4XisXZHNbj36d.VngeNy51MLCAjoh2BnJp8OYqN0W4VAS', '2023-11-26 04:44:49.076505+00', NULL, '', NULL, '', NULL, '', '', NULL, '2023-11-26 04:44:49.0785+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2023-11-26 04:44:49.072719+00', '2023-11-26 04:44:49.080017+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL),
	('00000000-0000-0000-0000-000000000000', '7136aed3-b2a5-4416-a43b-3f9b9bf92d0a', 'authenticated', 'authenticated', 'player4@gmail.com', '$2a$10$rUIBszGFExvtQR34VGjBhecvtZXtsRWrJ9zgdYdMkgkrp0cUbit6W', '2023-11-26 04:40:53.600321+00', NULL, '', NULL, '', NULL, '', '', NULL, '2023-11-26 04:40:53.602281+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2023-11-26 04:40:53.597076+00', '2023-11-26 04:40:53.603775+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL),
	('00000000-0000-0000-0000-000000000000', '649020bb-0ed5-42cb-9fc6-0bdb2babf1fa', 'authenticated', 'authenticated', 'player5@gmail.com', '$2a$10$LMBl7VmliyuMBIpcTnwoIeA50SJQZnh5puaAHXOMleq48bqwxSJqC', '2023-11-26 04:41:56.591663+00', NULL, '', NULL, '', NULL, '', '', NULL, '2023-11-26 04:41:56.593653+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2023-11-26 04:41:56.588434+00', '2023-11-26 04:41:56.595006+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL),
	('00000000-0000-0000-0000-000000000000', '626bc610-ac53-451e-ba4c-d5b042d162cb', 'authenticated', 'authenticated', 'player12@gmail.com', '$2a$10$4IhRWiEs2BbgQS3Fj1J7Y.aWVYfOYjI0mNwFIeZdXsnLK7seFVLCS', '2023-11-26 05:04:16.323861+00', NULL, '', NULL, '', NULL, '', '', NULL, '2023-11-26 05:04:16.325986+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2023-11-26 05:04:16.320605+00', '2023-11-26 05:04:16.327545+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL),
	('00000000-0000-0000-0000-000000000000', 'f2ce51f8-c98f-45a3-abe9-3538008c5f02', 'authenticated', 'authenticated', 'player9@gmail.com', '$2a$10$Anae69XqJMse8oLbXHO1r.aqDFBuoGV.pR8XYn9Ins.JkA1QgOMr6', '2023-11-26 04:45:52.693799+00', NULL, '', NULL, '', NULL, '', '', NULL, '2023-11-26 04:45:52.695613+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2023-11-26 04:45:52.689921+00', '2023-11-26 04:45:52.697034+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL),
	('00000000-0000-0000-0000-000000000000', '711c2e68-9079-484f-b3b8-4ad90326b192', 'authenticated', 'authenticated', 'player6@gmail.com', '$2a$10$0HlBH9Jyd6tqNbb.MYWEieR33e9ejx3k9ZtiHY2L.ptP.2.8nkIp2', '2023-11-26 04:42:48.387649+00', NULL, '', NULL, '', NULL, '', '', NULL, '2023-11-26 04:42:48.389534+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2023-11-26 04:42:48.381295+00', '2023-11-26 04:42:48.392591+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL),
	('00000000-0000-0000-0000-000000000000', '1be5564a-ce90-4456-8a11-720bcc85307b', 'authenticated', 'authenticated', 'player10@gmail.com', '$2a$10$f1xn7rSpQ0rcOOkLCRYFWezz5UAY4q4NlaR6oSq1VdaXRc5vM2dSi', '2023-11-26 04:46:41.158539+00', NULL, '', NULL, '', NULL, '', '', NULL, '2023-11-26 04:46:41.160611+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2023-11-26 04:46:41.155233+00', '2023-11-26 04:46:41.16208+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL),
	('00000000-0000-0000-0000-000000000000', 'e0e7bd9a-2305-4f01-8b8b-f9f9f33bfe68', 'authenticated', 'authenticated', 'praveshjha5@gmail.com', '$2a$10$qTjT4r5oajfddKj95ZAsVuMscrXz4ZPGjVg2XbUmEB2mcUkwS/cS.', '2023-11-18 06:22:37.046816+00', NULL, '', NULL, '', NULL, '', '', NULL, '2023-11-26 13:50:50.974902+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2023-11-18 06:22:37.043339+00', '2023-11-26 13:50:50.977422+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL),
	('00000000-0000-0000-0000-000000000000', '925a5d0f-942e-4adf-b467-7a7ee2809285', 'authenticated', 'authenticated', 'praveshjha1996@gmail.com', '$2a$10$b8YTW/en8DlWUW2NUuJtFOGofuFmOtWhPEDvijGvRRLLKPrKPu8Ye', '2023-11-25 05:55:27.283061+00', NULL, '', NULL, '', NULL, '', '', NULL, '2023-11-26 13:51:14.023293+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2023-11-25 05:55:27.278416+00', '2023-11-26 13:51:14.02484+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at") VALUES
	('e0e7bd9a-2305-4f01-8b8b-f9f9f33bfe68', 'e0e7bd9a-2305-4f01-8b8b-f9f9f33bfe68', '{"sub": "e0e7bd9a-2305-4f01-8b8b-f9f9f33bfe68", "email": "praveshjha5@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2023-11-18 06:22:37.045548+00', '2023-11-18 06:22:37.045583+00', '2023-11-18 06:22:37.045583+00'),
	('925a5d0f-942e-4adf-b467-7a7ee2809285', '925a5d0f-942e-4adf-b467-7a7ee2809285', '{"sub": "925a5d0f-942e-4adf-b467-7a7ee2809285", "email": "praveshjha1996@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2023-11-25 05:55:27.281864+00', '2023-11-25 05:55:27.281908+00', '2023-11-25 05:55:27.281908+00'),
	('10f9ce4a-ce61-434b-997f-09479c8d139b', '10f9ce4a-ce61-434b-997f-09479c8d139b', '{"sub": "10f9ce4a-ce61-434b-997f-09479c8d139b", "email": "player1@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2023-11-26 04:37:28.611101+00', '2023-11-26 04:37:28.611133+00', '2023-11-26 04:37:28.611133+00'),
	('98b54c85-e0da-4f32-bcae-79fbcdca1104', '98b54c85-e0da-4f32-bcae-79fbcdca1104', '{"sub": "98b54c85-e0da-4f32-bcae-79fbcdca1104", "email": "player2@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2023-11-26 04:38:28.373233+00', '2023-11-26 04:38:28.373267+00', '2023-11-26 04:38:28.373267+00'),
	('005e6a4b-e78e-4b9a-ae88-30a2a9945c1f', '005e6a4b-e78e-4b9a-ae88-30a2a9945c1f', '{"sub": "005e6a4b-e78e-4b9a-ae88-30a2a9945c1f", "email": "player3@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2023-11-26 04:39:24.090982+00', '2023-11-26 04:39:24.091016+00', '2023-11-26 04:39:24.091016+00'),
	('7136aed3-b2a5-4416-a43b-3f9b9bf92d0a', '7136aed3-b2a5-4416-a43b-3f9b9bf92d0a', '{"sub": "7136aed3-b2a5-4416-a43b-3f9b9bf92d0a", "email": "player4@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2023-11-26 04:40:53.599141+00', '2023-11-26 04:40:53.599181+00', '2023-11-26 04:40:53.599181+00'),
	('649020bb-0ed5-42cb-9fc6-0bdb2babf1fa', '649020bb-0ed5-42cb-9fc6-0bdb2babf1fa', '{"sub": "649020bb-0ed5-42cb-9fc6-0bdb2babf1fa", "email": "player5@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2023-11-26 04:41:56.590523+00', '2023-11-26 04:41:56.590561+00', '2023-11-26 04:41:56.590561+00'),
	('711c2e68-9079-484f-b3b8-4ad90326b192', '711c2e68-9079-484f-b3b8-4ad90326b192', '{"sub": "711c2e68-9079-484f-b3b8-4ad90326b192", "email": "player6@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2023-11-26 04:42:48.383489+00', '2023-11-26 04:42:48.383521+00', '2023-11-26 04:42:48.383521+00'),
	('f4e88942-65db-4602-b1c8-ed761085ffd7', 'f4e88942-65db-4602-b1c8-ed761085ffd7', '{"sub": "f4e88942-65db-4602-b1c8-ed761085ffd7", "email": "player7@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2023-11-26 04:43:53.379673+00', '2023-11-26 04:43:53.379708+00', '2023-11-26 04:43:53.379708+00'),
	('6f06def4-83fe-4eda-8ad3-f9593938ac7f', '6f06def4-83fe-4eda-8ad3-f9593938ac7f', '{"sub": "6f06def4-83fe-4eda-8ad3-f9593938ac7f", "email": "player8@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2023-11-26 04:44:49.075347+00', '2023-11-26 04:44:49.075381+00', '2023-11-26 04:44:49.075381+00'),
	('f2ce51f8-c98f-45a3-abe9-3538008c5f02', 'f2ce51f8-c98f-45a3-abe9-3538008c5f02', '{"sub": "f2ce51f8-c98f-45a3-abe9-3538008c5f02", "email": "player9@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2023-11-26 04:45:52.691916+00', '2023-11-26 04:45:52.691952+00', '2023-11-26 04:45:52.691952+00'),
	('1be5564a-ce90-4456-8a11-720bcc85307b', '1be5564a-ce90-4456-8a11-720bcc85307b', '{"sub": "1be5564a-ce90-4456-8a11-720bcc85307b", "email": "player10@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2023-11-26 04:46:41.157227+00', '2023-11-26 04:46:41.15726+00', '2023-11-26 04:46:41.15726+00'),
	('7fd91904-42e4-4856-bd4a-3f81f22f5dc0', '7fd91904-42e4-4856-bd4a-3f81f22f5dc0', '{"sub": "7fd91904-42e4-4856-bd4a-3f81f22f5dc0", "email": "player11@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2023-11-26 05:03:14.748435+00', '2023-11-26 05:03:14.748478+00', '2023-11-26 05:03:14.748478+00'),
	('626bc610-ac53-451e-ba4c-d5b042d162cb', '626bc610-ac53-451e-ba4c-d5b042d162cb', '{"sub": "626bc610-ac53-451e-ba4c-d5b042d162cb", "email": "player12@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2023-11-26 05:04:16.32262+00', '2023-11-26 05:04:16.322654+00', '2023-11-26 05:04:16.322654+00');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip") VALUES
	('d586482d-9715-413b-be8a-2ff0c2ff9ae9', '925a5d0f-942e-4adf-b467-7a7ee2809285', '2023-11-26 05:09:05.714052+00', '2023-11-26 10:28:26.764182+00', NULL, 'aal1', NULL, '2023-11-26 10:28:26.764112', 'Mozilla/5.0 (Linux; Android 8.0.0; SM-G955U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36', '103.90.181.3'),
	('0eb6ca41-b4be-4fc2-a588-ff8e2d5a5820', '925a5d0f-942e-4adf-b467-7a7ee2809285', '2023-11-26 12:21:46.536946+00', '2023-11-26 13:20:02.820218+00', NULL, 'aal1', NULL, '2023-11-26 13:20:02.82015', 'Mozilla/5.0 (Linux; Android 8.0.0; SM-G955U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36', '103.90.181.3'),
	('205e6b68-68cc-4b30-8c8a-05d5ec952056', '925a5d0f-942e-4adf-b467-7a7ee2809285', '2023-11-26 13:51:14.023373+00', '2023-11-26 13:51:14.023373+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Linux; Android 8.0.0; SM-G955U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36', '103.90.181.3'),
	('f837a12c-580f-4348-ae9d-1c6d80bf3634', 'f4e88942-65db-4602-b1c8-ed761085ffd7', '2023-11-26 13:57:41.954554+00', '2023-11-26 13:57:41.954554+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Linux; Android 8.0.0; SM-G955U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36', '103.90.181.3'),
	('4d66a138-1434-4f0a-8146-8d37655185c2', '925a5d0f-942e-4adf-b467-7a7ee2809285', '2023-11-25 05:55:27.285057+00', '2023-11-25 11:04:57.465162+00', NULL, 'aal1', NULL, '2023-11-25 11:04:57.465094', 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36', '103.90.181.10');


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('4d66a138-1434-4f0a-8146-8d37655185c2', '2023-11-25 05:55:27.288033+00', '2023-11-25 05:55:27.288033+00', 'password', '7bd27db0-f406-4203-a381-0047753c2441'),
	('d586482d-9715-413b-be8a-2ff0c2ff9ae9', '2023-11-26 05:09:05.715892+00', '2023-11-26 05:09:05.715892+00', 'password', '5ee84d88-b1e1-416a-b2ff-e0e8be0409bc'),
	('0eb6ca41-b4be-4fc2-a588-ff8e2d5a5820', '2023-11-26 12:21:46.539746+00', '2023-11-26 12:21:46.539746+00', 'password', 'afa979aa-c858-4f0e-901d-a30946c9c5ca'),
	('205e6b68-68cc-4b30-8c8a-05d5ec952056', '2023-11-26 13:51:14.025088+00', '2023-11-26 13:51:14.025088+00', 'password', 'cc416341-16c5-4db6-be4a-d376f9b6d036'),
	('f837a12c-580f-4348-ae9d-1c6d80bf3634', '2023-11-26 13:57:41.956804+00', '2023-11-26 13:57:41.956804+00', 'password', '1927b834-d3db-4b29-ab4a-4fb7a854cb0e');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 6, 'mZ_VPhrUoYx7L0mS5y48jQ', '925a5d0f-942e-4adf-b467-7a7ee2809285', true, '2023-11-25 05:55:27.286567+00', '2023-11-25 07:18:40.828197+00', NULL, '4d66a138-1434-4f0a-8146-8d37655185c2'),
	('00000000-0000-0000-0000-000000000000', 8, 'IlcF8ckiaqGqXFksmasxHQ', '925a5d0f-942e-4adf-b467-7a7ee2809285', true, '2023-11-25 07:18:40.828543+00', '2023-11-25 10:00:06.144211+00', 'mZ_VPhrUoYx7L0mS5y48jQ', '4d66a138-1434-4f0a-8146-8d37655185c2'),
	('00000000-0000-0000-0000-000000000000', 9, 'fEVYl8tUsRvunf8o3Z0t2Q', '925a5d0f-942e-4adf-b467-7a7ee2809285', true, '2023-11-25 10:00:06.144553+00', '2023-11-25 11:04:57.462701+00', 'IlcF8ckiaqGqXFksmasxHQ', '4d66a138-1434-4f0a-8146-8d37655185c2'),
	('00000000-0000-0000-0000-000000000000', 10, '4yVwGgBmG5KwhmUkyBz9oQ', '925a5d0f-942e-4adf-b467-7a7ee2809285', false, '2023-11-25 11:04:57.46312+00', '2023-11-25 11:04:57.46312+00', 'fEVYl8tUsRvunf8o3Z0t2Q', '4d66a138-1434-4f0a-8146-8d37655185c2'),
	('00000000-0000-0000-0000-000000000000', 27, 'C0OEBdu70VjFi44N7nnCAw', '925a5d0f-942e-4adf-b467-7a7ee2809285', true, '2023-11-26 05:09:05.714649+00', '2023-11-26 06:14:05.859727+00', NULL, 'd586482d-9715-413b-be8a-2ff0c2ff9ae9'),
	('00000000-0000-0000-0000-000000000000', 29, '-WkzdsF0S-Lg1hXAC619Vg', '925a5d0f-942e-4adf-b467-7a7ee2809285', true, '2023-11-26 06:14:05.860014+00', '2023-11-26 08:16:00.029393+00', 'C0OEBdu70VjFi44N7nnCAw', 'd586482d-9715-413b-be8a-2ff0c2ff9ae9'),
	('00000000-0000-0000-0000-000000000000', 31, 'nqstZZHT_F0TFXXdWRW94w', '925a5d0f-942e-4adf-b467-7a7ee2809285', true, '2023-11-26 08:16:00.030219+00', '2023-11-26 10:28:26.761244+00', '-WkzdsF0S-Lg1hXAC619Vg', 'd586482d-9715-413b-be8a-2ff0c2ff9ae9'),
	('00000000-0000-0000-0000-000000000000', 32, '6acVSPUgvRhpnyQYsVilSQ', '925a5d0f-942e-4adf-b467-7a7ee2809285', false, '2023-11-26 10:28:26.761622+00', '2023-11-26 10:28:26.761622+00', 'nqstZZHT_F0TFXXdWRW94w', 'd586482d-9715-413b-be8a-2ff0c2ff9ae9'),
	('00000000-0000-0000-0000-000000000000', 35, '_5OYvyfQWbrjqXom8B5_tg', '925a5d0f-942e-4adf-b467-7a7ee2809285', true, '2023-11-26 12:21:46.537734+00', '2023-11-26 13:20:02.818126+00', NULL, '0eb6ca41-b4be-4fc2-a588-ff8e2d5a5820'),
	('00000000-0000-0000-0000-000000000000', 37, 'BC_uoRfT9CKqXC2Zt_6MVw', '925a5d0f-942e-4adf-b467-7a7ee2809285', false, '2023-11-26 13:20:02.818521+00', '2023-11-26 13:20:02.818521+00', '_5OYvyfQWbrjqXom8B5_tg', '0eb6ca41-b4be-4fc2-a588-ff8e2d5a5820'),
	('00000000-0000-0000-0000-000000000000', 39, 'V66i9QmDcjiG0U_W2N7vBw', '925a5d0f-942e-4adf-b467-7a7ee2809285', false, '2023-11-26 13:51:14.024048+00', '2023-11-26 13:51:14.024048+00', NULL, '205e6b68-68cc-4b30-8c8a-05d5ec952056'),
	('00000000-0000-0000-0000-000000000000', 40, 'RvBFC4U6OiwhEs4QQZaCsg', 'f4e88942-65db-4602-b1c8-ed761085ffd7', false, '2023-11-26 13:57:41.955233+00', '2023-11-26 13:57:41.955233+00', NULL, 'f837a12c-580f-4348-ae9d-1c6d80bf3634');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--



--
-- Data for Name: event_teams; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."profiles" ("name", "phone", "dob", "gender", "position", "user_id", "rating", "avatar_URL") VALUES
	('Pravesh Jha', '9540281134', '2023-11-18', 'Male', 'Defence', 'e0e7bd9a-2305-4f01-8b8b-f9f9f33bfe68', '1200', NULL),
	('Prav ', '8700502434', '2023-11-25', 'Male', 'Mid-Field', '925a5d0f-942e-4adf-b467-7a7ee2809285', '1200', NULL),
	('Player 1 ', '9876543211', '2023-11-26', 'Male', 'Goal-Keeper', '10f9ce4a-ce61-434b-997f-09479c8d139b', '1200', NULL),
	('Player2 ', '9876543212', '2023-11-26', 'Male', 'Defence', '98b54c85-e0da-4f32-bcae-79fbcdca1104', '1200', NULL),
	('Player3 ', '9876543213', '2023-11-26', 'Male', 'Mid-Field', '005e6a4b-e78e-4b9a-ae88-30a2a9945c1f', '1200', NULL),
	('Player4 ', '9876543214', '2023-11-26', 'Male', 'Attack', '7136aed3-b2a5-4416-a43b-3f9b9bf92d0a', '1200', NULL),
	('Player5 ', '9876543215', '2023-11-26', 'Male', 'Mid-Field', '649020bb-0ed5-42cb-9fc6-0bdb2babf1fa', '1200', NULL),
	('Player6 ', '9876543216', '2023-11-26', 'Male', 'Defence', '711c2e68-9079-484f-b3b8-4ad90326b192', '1200', NULL),
	('Player7 ', '9876543217', '2023-11-26', 'Male', 'Defence', 'f4e88942-65db-4602-b1c8-ed761085ffd7', '1200', NULL),
	('Player8 ', '9876543218', '2023-11-26', 'Male', 'Defence', '6f06def4-83fe-4eda-8ad3-f9593938ac7f', '1200', NULL),
	('Player9 ', '9876543219', '2023-11-26', 'Male', 'Mid-Field', 'f2ce51f8-c98f-45a3-abe9-3538008c5f02', '1200', NULL),
	('Player10 ', '9876543210', '2023-11-26', 'Male', 'Mid-Field', '1be5564a-ce90-4456-8a11-720bcc85307b', '1200', NULL),
	('Player11 ', '9876543111', '2023-11-26', 'Male', 'Attack', '7fd91904-42e4-4856-bd4a-3f81f22f5dc0', '1200', NULL),
	('Player12 ', '9876543112', '2023-11-26', 'Male', 'Attack', '626bc610-ac53-451e-ba4c-d5b042d162cb', '1200', NULL);


--
-- Data for Name: teams; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."teams" ("team_name", "format", "location", "team_admin", "rating", "team_id", "players", "events") VALUES
	('Real Madrid F.C.', '6v6', 'MRIS, Charmwood', 'e0e7bd9a-2305-4f01-8b8b-f9f9f33bfe68', '1000', '61dbcf9a-f2af-429b-8e26-0650c82d51f0', '{e0e7bd9a-2305-4f01-8b8b-f9f9f33bfe68,10f9ce4a-ce61-434b-997f-09479c8d139b,98b54c85-e0da-4f32-bcae-79fbcdca1104,005e6a4b-e78e-4b9a-ae88-30a2a9945c1f,7136aed3-b2a5-4416-a43b-3f9b9bf92d0a,649020bb-0ed5-42cb-9fc6-0bdb2babf1fa,711c2e68-9079-484f-b3b8-4ad90326b192}', NULL),
	('Liverpool F.C', '6v6', 'MRIS, Charmwood', '925a5d0f-942e-4adf-b467-7a7ee2809285', '1000', '8fd5d6fe-c3a5-4441-877a-4baa1aa2abad', '{925a5d0f-942e-4adf-b467-7a7ee2809285,f4e88942-65db-4602-b1c8-ed761085ffd7,6f06def4-83fe-4eda-8ad3-f9593938ac7f,f2ce51f8-c98f-45a3-abe9-3538008c5f02,1be5564a-ce90-4456-8a11-720bcc85307b,7fd91904-42e4-4856-bd4a-3f81f22f5dc0,626bc610-ac53-451e-ba4c-d5b042d162cb}', NULL);


--
-- Data for Name: matches; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."matches" ("match_id", "created_at", "format", "location", "date", "time", "opponent_name", "team_id", "opponent_id", "team_name", "match_status", "opponent_status", "match_official", "team_score", "opponent_score", "team_rating", "opponent_rating", "team_corner", "opponent_corner", "team_yellow_card", "opponent_yellow_card", "team_red_card", "opponent_red_card", "team_discipline", "opponent_discipline", "best_player", "team_match_rating", "opponent_match_rating", "match_type", "event_id") VALUES
	('62fa7ba8-63ae-4da9-9e68-c6e5fe8acb5d', '2023-11-25 05:56:43.050853+00', '6v6', 'MRIS, Charmwood', 'Sat 25 Nov', '17:00', 'Real Madrid F.C.', '8fd5d6fe-c3a5-4441-877a-4baa1aa2abad', '61dbcf9a-f2af-429b-8e26-0650c82d51f0', 'Liverpool F.C', 'pending', 'accepted', NULL, NULL, NULL, '1000', '1000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Rated', NULL);


--
-- Data for Name: lineup; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."lineup" ("created_at", "match_id", "team_id", "player_name", "player_position", "player_rating", "payment_status", "lineup_id", "player_id", "goals", "assists", "card", "match_rating") VALUES
	('2023-11-26 14:25:09.972515+00', '62fa7ba8-63ae-4da9-9e68-c6e5fe8acb5d', '8fd5d6fe-c3a5-4441-877a-4baa1aa2abad', 'Player7 ', 'Defence', '1200', 'pending', '7dfd535f-433f-4a69-bdc4-687b982fc840', 'eb35c622-fab3-4a05-a6a5-55e1984f73ce', NULL, NULL, NULL, NULL);


--
-- Data for Name: match_official; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: players; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."players" ("created_at", "team_id", "player_name", "player_position", "player_phone", "player_rating", "player_dob", "player_id", "avatar_URL", "team_name") VALUES
	('2023-11-25 05:54:43.127633+00', '61dbcf9a-f2af-429b-8e26-0650c82d51f0', 'Pravesh Jha', 'Defence', '9540281134', '1200', '2023-11-18', '7ba7bd81-04be-47ed-a8e3-bd918f0b4117', NULL, 'Real Madrid F.C.'),
	('2023-11-25 05:56:12.031441+00', '8fd5d6fe-c3a5-4441-877a-4baa1aa2abad', 'Prav ', 'Mid-Field', '8700502434', '1200', '2023-11-25', '9a375e41-7e8b-4f2c-a41a-65a269797837', NULL, 'Liverpool F.C'),
	('2023-11-26 05:06:51.81139+00', '61dbcf9a-f2af-429b-8e26-0650c82d51f0', 'Player 1 ', 'Goal-Keeper', '9876543211', '1200', '2023-11-26', 'fde04f27-cb09-4061-986e-9f4498e0d8c9', NULL, 'Real Madrid F.C.'),
	('2023-11-26 05:07:21.961221+00', '61dbcf9a-f2af-429b-8e26-0650c82d51f0', 'Player2 ', 'Defence', '9876543212', '1200', '2023-11-26', '0493b396-f98f-4873-9b41-a7e2051bdd49', NULL, 'Real Madrid F.C.'),
	('2023-11-26 05:07:37.520195+00', '61dbcf9a-f2af-429b-8e26-0650c82d51f0', 'Player3 ', 'Mid-Field', '9876543213', '1200', '2023-11-26', '4924df5b-88af-4075-8402-94d83ac944a6', NULL, 'Real Madrid F.C.'),
	('2023-11-26 05:07:47.267149+00', '61dbcf9a-f2af-429b-8e26-0650c82d51f0', 'Player4 ', 'Attack', '9876543214', '1200', '2023-11-26', 'f8755248-c19b-43f4-a957-db9c092a7460', NULL, 'Real Madrid F.C.'),
	('2023-11-26 05:07:56.647907+00', '61dbcf9a-f2af-429b-8e26-0650c82d51f0', 'Player5 ', 'Mid-Field', '9876543215', '1200', '2023-11-26', '1ca2b6aa-c440-4361-8b07-b191f91e2a97', NULL, 'Real Madrid F.C.'),
	('2023-11-26 05:08:07.616733+00', '61dbcf9a-f2af-429b-8e26-0650c82d51f0', 'Player6 ', 'Defence', '9876543216', '1200', '2023-11-26', 'f516caa9-fffd-4cdf-8294-5e4bd3742f36', NULL, 'Real Madrid F.C.'),
	('2023-11-26 05:09:22.837491+00', '8fd5d6fe-c3a5-4441-877a-4baa1aa2abad', 'Player7 ', 'Defence', '9876543217', '1200', '2023-11-26', 'eb35c622-fab3-4a05-a6a5-55e1984f73ce', NULL, 'Liverpool F.C'),
	('2023-11-26 05:09:31.147+00', '8fd5d6fe-c3a5-4441-877a-4baa1aa2abad', 'Player8 ', 'Defence', '9876543218', '1200', '2023-11-26', 'f0d0a4b0-eb1b-4427-a45a-e632586583d5', NULL, 'Liverpool F.C'),
	('2023-11-26 05:09:39.810182+00', '8fd5d6fe-c3a5-4441-877a-4baa1aa2abad', 'Player9 ', 'Mid-Field', '9876543219', '1200', '2023-11-26', '0bf409e9-11f1-4b5b-a204-4bea76c62c5e', NULL, 'Liverpool F.C'),
	('2023-11-26 05:09:48.658009+00', '8fd5d6fe-c3a5-4441-877a-4baa1aa2abad', 'Player10 ', 'Mid-Field', '9876543210', '1200', '2023-11-26', '72eb53eb-a51d-43e5-bda7-48f86c84f83b', NULL, 'Liverpool F.C'),
	('2023-11-26 05:09:58.127291+00', '8fd5d6fe-c3a5-4441-877a-4baa1aa2abad', 'Player11 ', 'Attack', '9876543111', '1200', '2023-11-26', '8ebc468a-78d7-4954-8b99-29c68ff4a0b0', NULL, 'Liverpool F.C'),
	('2023-11-26 05:10:07.948015+00', '8fd5d6fe-c3a5-4441-877a-4baa1aa2abad', 'Player12 ', 'Attack', '9876543112', '1200', '2023-11-26', '6267915c-aaf2-45bc-bb38-83ffe3db9beb', NULL, 'Liverpool F.C');


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 40, true);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
