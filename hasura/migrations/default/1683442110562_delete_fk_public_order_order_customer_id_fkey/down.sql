alter table "public"."order"
  add constraint "order_customer_id_fkey"
  foreign key ("customer_id")
  references "public"."customer"
  ("id") on update no action on delete no action;
