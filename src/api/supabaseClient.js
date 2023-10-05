import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qwjiorfvdwuxiiezpnio.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3amlvcmZ2ZHd1eGlpZXpwbmlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY0ODk2MzcsImV4cCI6MjAxMjA2NTYzN30.7DY0ZLaOVS1FmhXWe17Gv_mFwfuBc-LhtpXuHimdntg'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;