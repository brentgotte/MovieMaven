import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zcxthaxfqdycxgfgwkoq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjeHRoYXhmcWR5Y3hnZmd3a29xIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYzMjYzOTIsImV4cCI6MjAxMTkwMjM5Mn0._Sw1HsT5sSsSMLw2jxPDvjZfA6n98GhmPQW9STLv0zc';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
