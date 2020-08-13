--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

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

ALTER TABLE ONLY public.tables DROP CONSTRAINT "tables_tableId_key";
ALTER TABLE ONLY public.menus DROP CONSTRAINT "menus_itemId_key";
ALTER TABLE public."waitLists" ALTER COLUMN "waitId" DROP DEFAULT;
ALTER TABLE public.orders ALTER COLUMN "orderId" DROP DEFAULT;
ALTER TABLE public."orderItems" ALTER COLUMN "orderItemId" DROP DEFAULT;
ALTER TABLE public.menus ALTER COLUMN "itemId" DROP DEFAULT;
ALTER TABLE public.checks ALTER COLUMN "checkId" DROP DEFAULT;
DROP SEQUENCE public."waitLists_waitId_seq";
DROP TABLE public."waitLists";
DROP TABLE public.tables;
DROP SEQUENCE public."orders_orderId_seq";
DROP TABLE public.orders;
DROP SEQUENCE public."orderItems_orderItemId_seq";
DROP TABLE public."orderItems";
DROP SEQUENCE public."menus_itemId_seq";
DROP TABLE public.menus;
DROP SEQUENCE public."checks_checkId_seq";
DROP TABLE public.checks;
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: checks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.checks (
    "checkId" integer NOT NULL,
    "isPaid" boolean DEFAULT false NOT NULL,
    "tableId" integer NOT NULL,
    "taxRate" integer DEFAULT 7 NOT NULL,
    tip money,
    "createdAt" timestamp without time zone NOT NULL
);


--
-- Name: checks_checkId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."checks_checkId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: checks_checkId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."checks_checkId_seq" OWNED BY public.checks."checkId";


--
-- Name: menus; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.menus (
    "itemId" integer NOT NULL,
    item character varying(255) NOT NULL,
    cost numeric(100,2) NOT NULL,
    "salePrice" numeric(100,2) NOT NULL,
    "imageUrl" character varying(255)
);


--
-- Name: menus_itemId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."menus_itemId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: menus_itemId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."menus_itemId_seq" OWNED BY public.menus."itemId";


--
-- Name: orderItems; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."orderItems" (
    "orderItemId" integer NOT NULL,
    "orderId" integer NOT NULL,
    "itemId" integer NOT NULL,
    quantity integer DEFAULT 1 NOT NULL,
    "isCompleted" boolean DEFAULT false NOT NULL,
    discount integer,
    "createdAt" timestamp without time zone NOT NULL
);


--
-- Name: orderItems_orderItemId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."orderItems_orderItemId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orderItems_orderItemId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."orderItems_orderItemId_seq" OWNED BY public."orderItems"."orderItemId";


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    "orderId" integer NOT NULL,
    "isSent" boolean DEFAULT false NOT NULL,
    "tableId" integer NOT NULL,
    "orderedAt" timestamp without time zone NOT NULL,
    "checkId" integer
);


--
-- Name: orders_orderId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."orders_orderId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_orderId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."orders_orderId_seq" OWNED BY public.orders."orderId";


--
-- Name: tables; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tables (
    "tableId" integer NOT NULL,
    "tableStatus" integer DEFAULT 0 NOT NULL,
    "timeSeated" timestamp without time zone
);


--
-- Name: waitLists; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."waitLists" (
    "waitId" integer NOT NULL,
    name character varying(255) NOT NULL,
    "partySize" integer NOT NULL,
    "time" time with time zone NOT NULL,
    comment character varying(255),
    "isSeated" boolean DEFAULT false NOT NULL
);


--
-- Name: waitLists_waitId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."waitLists_waitId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: waitLists_waitId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."waitLists_waitId_seq" OWNED BY public."waitLists"."waitId";


--
-- Name: checks checkId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.checks ALTER COLUMN "checkId" SET DEFAULT nextval('public."checks_checkId_seq"'::regclass);


--
-- Name: menus itemId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menus ALTER COLUMN "itemId" SET DEFAULT nextval('public."menus_itemId_seq"'::regclass);


--
-- Name: orderItems orderItemId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."orderItems" ALTER COLUMN "orderItemId" SET DEFAULT nextval('public."orderItems_orderItemId_seq"'::regclass);


--
-- Name: orders orderId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN "orderId" SET DEFAULT nextval('public."orders_orderId_seq"'::regclass);


--
-- Name: waitLists waitId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."waitLists" ALTER COLUMN "waitId" SET DEFAULT nextval('public."waitLists_waitId_seq"'::regclass);


--
-- Data for Name: checks; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.checks ("checkId", "isPaid", "tableId", "taxRate", tip, "createdAt") FROM stdin;
34	t	1	7	\N	2020-08-12 21:51:02.05861
35	t	3	7	\N	2020-08-12 22:09:04.061371
37	t	9	7	\N	2020-08-12 22:28:37.885783
36	t	1	7	\N	2020-08-12 22:18:01.126096
38	t	2	7	\N	2020-08-12 22:36:00.92768
39	t	1	7	\N	2020-08-12 22:44:25.514847
40	t	1	7	\N	2020-08-12 22:52:35.295425
43	t	3	7	\N	2020-08-12 23:06:07.020965
44	t	3	7	\N	2020-08-12 23:51:07.721719
42	t	2	7	\N	2020-08-12 23:01:52.022525
41	t	1	7	\N	2020-08-12 22:53:29.020993
45	f	4	7	\N	2020-08-13 00:00:12.311824
46	t	7	7	\N	2020-08-13 00:00:16.710963
47	f	2	7	\N	2020-08-13 00:47:50.308039
48	t	5	7	\N	2020-08-13 00:48:26.668866
49	t	5	7	\N	2020-08-13 00:50:32.730737
50	f	1	7	\N	2020-08-13 10:24:43.688528
\.


--
-- Data for Name: menus; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.menus ("itemId", item, cost, "salePrice", "imageUrl") FROM stdin;
1	Gen Premium Streak	7.07	16.64	/images/gen-premiun-steak.png
2	Premium Chadol	7.99	13.35	/images/premium-chadol.png
3	Hawaiian Steak	5.51	15.26	/images/hawaiian-steak.png
4	Beef Bulgogi	5.69	11.78	/images/beef-bulgogi.png
5	Spice Pork Bulgogi	4.58	9.83	/images/spicy-pork-chop.png
6	Yangyum Galbi	3.62	10.12	/images/yangyum-galbi.png
7	Samgyubsal	3.89	9.56	/images/pork-belly.png
8	Spicy Samgyubsal	4.25	10.08	/images/spicy-pork.png
9	Red Wine Samgyubsal	4.53	10.44	/images/wine-pork.png
10	Cajun Samgyubsal	5.15	12.76	/images/cajun-pork.png
\.


--
-- Data for Name: orderItems; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."orderItems" ("orderItemId", "orderId", "itemId", quantity, "isCompleted", discount, "createdAt") FROM stdin;
69	26	2	5	f	0	2020-08-12 21:51:02.067622
70	27	1	1	f	0	2020-08-12 22:09:04.071817
71	27	2	1	f	0	2020-08-12 22:09:04.071817
72	27	3	1	f	0	2020-08-12 22:09:04.071817
73	28	2	6	f	0	2020-08-12 22:18:01.133267
74	29	2	1	f	0	2020-08-12 22:28:37.89001
75	29	5	1	f	0	2020-08-12 22:28:37.89001
76	29	8	1	f	0	2020-08-12 22:28:37.89001
77	30	3	4	f	0	2020-08-12 22:36:00.931347
78	31	3	2	f	0	2020-08-12 22:44:25.521608
79	32	2	6	f	0	2020-08-12 22:52:35.29898
80	33	2	1	f	0	2020-08-12 22:53:29.027493
81	33	3	1	f	0	2020-08-12 22:53:29.027493
82	34	2	4	f	0	2020-08-12 23:01:52.02885
83	35	1	1	f	0	2020-08-12 23:06:07.02901
86	36	2	6	f	0	2020-08-12 23:51:07.729012
85	35	3	1	f	0	2020-08-12 23:06:07.02901
84	35	2	1	f	0	2020-08-12 23:06:07.02901
87	37	2	2	f	0	2020-08-13 00:00:12.315762
88	38	1	1	f	0	2020-08-13 00:00:16.720463
89	38	3	1	f	0	2020-08-13 00:00:16.720463
90	39	1	1	f	0	2020-08-13 00:47:50.316186
91	39	2	1	f	0	2020-08-13 00:47:50.316186
92	39	3	1	f	0	2020-08-13 00:47:50.316186
93	39	4	1	f	0	2020-08-13 00:47:50.316186
94	40	1	1	f	0	2020-08-13 00:48:26.675123
95	40	2	1	f	0	2020-08-13 00:48:26.675123
96	40	4	1	f	0	2020-08-13 00:48:26.675123
97	40	6	1	f	0	2020-08-13 00:48:26.675123
98	41	2	1	f	0	2020-08-13 00:50:32.733914
99	41	5	1	f	0	2020-08-13 00:50:32.733914
100	41	6	1	f	0	2020-08-13 00:50:32.733914
101	42	1	1	f	0	2020-08-13 10:24:43.699519
102	42	2	1	f	0	2020-08-13 10:24:43.699519
103	42	3	1	f	0	2020-08-13 10:24:43.699519
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders ("orderId", "isSent", "tableId", "orderedAt", "checkId") FROM stdin;
26	f	1	2020-08-12 21:51:02.065632	34
27	f	3	2020-08-12 22:09:04.069577	35
28	f	1	2020-08-12 22:18:01.131332	36
29	f	9	2020-08-12 22:28:37.888093	37
30	f	2	2020-08-12 22:36:00.929638	38
31	f	1	2020-08-12 22:44:25.519666	39
32	f	1	2020-08-12 22:52:35.297314	40
33	f	1	2020-08-12 22:53:29.025767	41
34	f	2	2020-08-12 23:01:52.027061	42
35	f	3	2020-08-12 23:06:07.026699	43
36	f	3	2020-08-12 23:51:07.726654	44
37	f	4	2020-08-13 00:00:12.314075	45
38	f	7	2020-08-13 00:00:16.715811	46
39	f	2	2020-08-13 00:47:50.314379	47
40	f	5	2020-08-13 00:48:26.67347	48
41	f	5	2020-08-13 00:50:32.732436	49
42	f	1	2020-08-13 10:24:43.697939	50
\.


--
-- Data for Name: tables; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tables ("tableId", "tableStatus", "timeSeated") FROM stdin;
10	0	\N
5	0	\N
6	0	\N
8	0	\N
9	0	\N
3	0	\N
4	1	2020-08-12 23:58:48.841716
7	0	\N
1	1	2020-08-13 00:13:28.874744
2	1	2020-08-13 00:47:44.236472
\.


--
-- Data for Name: waitLists; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."waitLists" ("waitId", name, "partySize", "time", comment, "isSeated") FROM stdin;
3	Kevin	5	08:15:25.878813-07	4th of july no mask	f
4	Julius	3	08:16:25.878813-07	Three musketeers	f
2	Jason	4	08:10:25.878813-07	Family of 4	f
5	uzair	3	00:05:21.441828-07	anime haha	f
\.


--
-- Name: checks_checkId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."checks_checkId_seq"', 50, true);


--
-- Name: menus_itemId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."menus_itemId_seq"', 11, true);


--
-- Name: orderItems_orderItemId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."orderItems_orderItemId_seq"', 103, true);


--
-- Name: orders_orderId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."orders_orderId_seq"', 42, true);


--
-- Name: waitLists_waitId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."waitLists_waitId_seq"', 5, true);


--
-- Name: menus menus_itemId_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menus
    ADD CONSTRAINT "menus_itemId_key" UNIQUE ("itemId");


--
-- Name: tables tables_tableId_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tables
    ADD CONSTRAINT "tables_tableId_key" UNIQUE ("tableId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

