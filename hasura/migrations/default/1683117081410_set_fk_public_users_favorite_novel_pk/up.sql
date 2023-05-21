alter table "public"."users_favorite"
  add constraint "users_favorite_novel_pk_fkey"
  foreign key ("novel_pk")
  references "public"."novels"
  ("pk") on update restrict on delete restrict;
