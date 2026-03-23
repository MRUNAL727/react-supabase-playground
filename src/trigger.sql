-- Creating triggers involve 2 parts:
--
-- A Function which will be executed (called the Trigger Function)
-- The actual Trigger object, with parameters around when the trigger should be run.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
insert into public.user_profiles (id, name, account_type)
values (
           new.id,
           coalesce(new.raw_user_meta_data ->> 'name', ''),
           coalesce(new.raw_user_meta_data ->> 'account_type', '')
       );

return NEW;
end;
$$;

create trigger on_auth_user_created
    after insert on auth.users
    for each row
    execute procedure public.handle_new_user();