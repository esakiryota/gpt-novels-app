alter table "public"."comments" drop constraint "comments_novel_pk_fkey",
  add constraint "comments_novel_pk_fkey"
  foreign key ("novel_pk")
  references "public"."novels"
  ("pk") on update cascade on delete cascade;
