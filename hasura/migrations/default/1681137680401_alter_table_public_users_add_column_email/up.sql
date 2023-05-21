alter table "public"."users" add column "email" text
 not null unique default 'test@gmail.com';
