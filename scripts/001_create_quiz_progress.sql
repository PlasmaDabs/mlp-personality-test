-- create table for storing quiz progress
create table if not exists public.quiz_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  answers jsonb not null default '{}',
  current_section integer not null default 0,
  completed boolean not null default false,
  completed_at timestamp with time zone,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- enable row level security
alter table public.quiz_progress enable row level security;

-- create policies for crud operations
create policy "users can view their own quiz progress"
  on public.quiz_progress for select
  using (auth.uid() = user_id);

create policy "users can insert their own quiz progress"
  on public.quiz_progress for insert
  with check (auth.uid() = user_id);

create policy "users can update their own quiz progress"
  on public.quiz_progress for update
  using (auth.uid() = user_id);

create policy "users can delete their own quiz progress"
  on public.quiz_progress for delete
  using (auth.uid() = user_id);

-- create index for faster lookups
create index quiz_progress_user_id_idx on public.quiz_progress(user_id);

-- create function to auto-update updated_at
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- create trigger to auto-update updated_at
create trigger quiz_progress_updated_at
  before update on public.quiz_progress
  for each row
  execute function public.handle_updated_at();
