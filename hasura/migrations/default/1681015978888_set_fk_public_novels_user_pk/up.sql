alter table "public"."novels"
  add constraint "novels_user_pk_fkey"
  foreign key ("user_pk")
  references "public"."users"
  ("pk") on update restrict on delete restrict;
