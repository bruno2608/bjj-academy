import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fputgsghwqeuedkettvp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwdXRnc2dod3FldWVka2V0dHZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3ODI5MDUsImV4cCI6MjA1OTM1ODkwNX0.phBxturvMvIugq8Vf-vBzGonnSz2ghhoEcKJojDH2_E';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
