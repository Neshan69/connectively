-- Connectly messaging schema.
-- Run in Supabase SQL editor. Idempotent.

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.conversation_participants (
  conversation_id uuid not null references public.conversations (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (conversation_id, user_id)
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations (id) on delete cascade,
  sender_id uuid not null references auth.users (id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_cp_user on public.conversation_participants (user_id);
create index if not exists idx_messages_conv on public.messages (conversation_id, created_at);
create index if not exists idx_messages_sender on public.messages (sender_id);

-- updated_at trigger for conversations
create or replace function public.touch_conversation()
returns trigger language plpgsql as $$
begin
  update public.conversations set updated_at = now() where id = new.conversation_id;
  return new;
end;
$$;

drop trigger if exists on_message_insert on public.messages;
create trigger on_message_insert
  after insert on public.messages
  for each row execute function public.touch_conversation();

-- RLS
alter table public.conversations enable row level security;
alter table public.conversation_participants enable row level security;
alter table public.messages enable row level security;

-- conversations: only participants can read
drop policy if exists "conv_select_participant" on public.conversations;
create policy "conv_select_participant" on public.conversations for select
  using (exists (
    select 1 from public.conversation_participants cp
    where cp.conversation_id = conversations.id and cp.user_id = auth.uid()
  ));

drop policy if exists "conv_insert_authenticated" on public.conversations;
create policy "conv_insert_authenticated" on public.conversations for insert
  to authenticated with check (true);

-- participants
drop policy if exists "cp_select_participant" on public.conversation_participants;
create policy "cp_select_participant" on public.conversation_participants for select
  using (exists (
    select 1 from public.conversation_participants cp2
    where cp2.conversation_id = conversation_participants.conversation_id
      and cp2.user_id = auth.uid()
  ));

drop policy if exists "cp_insert_participant" on public.conversation_participants;
create policy "cp_insert_participant" on public.conversation_participants for insert
  to authenticated with check (user_id = auth.uid() or exists (
    select 1 from public.conversation_participants cp2
    where cp2.conversation_id = conversation_participants.conversation_id
      and cp2.user_id = auth.uid()
  ));

-- messages
drop policy if exists "msg_select_participant" on public.messages;
create policy "msg_select_participant" on public.messages for select
  using (exists (
    select 1 from public.conversation_participants cp
    where cp.conversation_id = messages.conversation_id and cp.user_id = auth.uid()
  ));

drop policy if exists "msg_insert_participant" on public.messages;
create policy "msg_insert_participant" on public.messages for insert
  to authenticated with check (
    sender_id = auth.uid()
    and exists (
      select 1 from public.conversation_participants cp
      where cp.conversation_id = messages.conversation_id and cp.user_id = auth.uid()
    )
  );

-- Enable realtime
alter publication supabase_realtime add table public.messages;
alter publication supabase_realtime add table public.conversations;
alter publication supabase_realtime add table public.conversation_participants;
