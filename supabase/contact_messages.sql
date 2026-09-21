-- Run this in the Supabase SQL Editor for this project.
-- Stores messages submitted through the portfolio's contact form.

create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  locale text,
  created_at timestamptz not null default now()
);

alter table contact_messages enable row level security;

create policy "Allow inserts from anon"
  on contact_messages for insert
  to anon
  with check (true);
