alter table "public"."comments" drop constraint "comments_user_pk_fkey",
  add constraint "comments_user_pk_fkey"
  foreign key ("user_pk")
  references "public"."users"
  ("pk") on update restrict on delete restrict;
