CREATE TABLE "public"."categories" ("pk" integer NOT NULL, "name" text NOT NULL DEFAULT 'name', PRIMARY KEY ("pk") , UNIQUE ("pk"));COMMENT ON TABLE "public"."categories" IS E'カテゴリー';
