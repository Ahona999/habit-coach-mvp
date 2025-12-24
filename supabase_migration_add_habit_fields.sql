-- Migration: Add frequency, preferred_time, color, and updated_at columns to habits table
-- Run this in Supabase SQL Editor if you already have a habits table

-- Add columns if they don't exist (for existing databases)
ALTER TABLE habits ADD COLUMN IF NOT EXISTS frequency text;
ALTER TABLE habits ADD COLUMN IF NOT EXISTS preferred_time text;
ALTER TABLE habits ADD COLUMN IF NOT EXISTS color text;
ALTER TABLE habits ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone DEFAULT now();

-- Update existing rows to have default values (optional, but recommended)
UPDATE habits 
SET 
  frequency = COALESCE(frequency, 'Daily'),
  preferred_time = COALESCE(preferred_time, 'Morning'),
  color = COALESCE(color, '#4f46e5'),
  updated_at = COALESCE(updated_at, created_at)
WHERE frequency IS NULL OR preferred_time IS NULL OR color IS NULL OR updated_at IS NULL;

