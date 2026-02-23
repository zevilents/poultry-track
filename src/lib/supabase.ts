import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bekptahcteewjcmvpxdr.supabase.co';

// Ini Kunci Rahasia kamu yang lengkap (Tanpa Terpotong):
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJla3B0YWhjdGVld2pjbXZweGRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4MTA1NzEsImV4cCI6MjA4NzM4NjU3MX0.-_idUGrT45dN-7AmT4ywCEgcms_TqtbhOdq6kJmbCzQ';

export const supabase = createClient(supabaseUrl, supabaseKey);