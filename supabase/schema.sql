create table if not exists public.portfolio_content (
  id text primary key check (id = 'home'),
  content jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.portfolio_admins (
  user_id uuid primary key references auth.users (id) on delete cascade
);

alter table public.portfolio_content enable row level security;
alter table public.portfolio_admins enable row level security;

grant select on public.portfolio_content to anon, authenticated;
grant insert, update on public.portfolio_content to authenticated;
grant select on public.portfolio_admins to authenticated;

drop policy if exists "Anyone can read portfolio content" on public.portfolio_content;
create policy "Anyone can read portfolio content"
  on public.portfolio_content for select
  to anon, authenticated
  using (true);

drop policy if exists "Portfolio admins can publish content" on public.portfolio_content;
create policy "Portfolio admins can publish content"
  on public.portfolio_content for insert
  to authenticated
  with check (
    exists (
      select 1 from public.portfolio_admins
      where user_id = (select auth.uid())
    )
  );

drop policy if exists "Portfolio admins can update content" on public.portfolio_content;
create policy "Portfolio admins can update content"
  on public.portfolio_content for update
  to authenticated
  using (
    exists (
      select 1 from public.portfolio_admins
      where user_id = (select auth.uid())
    )
  )
  with check (
    exists (
      select 1 from public.portfolio_admins
      where user_id = (select auth.uid())
    )
  );

drop policy if exists "Admins can read their own access row" on public.portfolio_admins;
create policy "Admins can read their own access row"
  on public.portfolio_admins for select
  to authenticated
  using (user_id = (select auth.uid()));

create or replace function public.set_portfolio_content_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_portfolio_content_updated_at on public.portfolio_content;
create trigger set_portfolio_content_updated_at
  before update on public.portfolio_content
  for each row execute function public.set_portfolio_content_updated_at();
