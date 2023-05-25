alter table "public"."ai_novels"
  add constraint "ai_novels_category_pk_fkey"
  foreign key ("category_pk")
  references "public"."categories"
  ("pk") on update restrict on delete restrict;
