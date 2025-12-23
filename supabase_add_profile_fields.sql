-- Add profile fields to user_profiles table
-- Run this SQL to add avatar and display name support

-- Add avatar_url column (stores URL to user's avatar image)
alter table user_profiles 
add column if not exists avatar_url text;

-- Add display_name column (optional custom display name)
alter table user_profiles 
add column if not exists display_name text;

-- Add full_name column (optional full name)
alter table user_profiles 
add column if not exists full_name text;

