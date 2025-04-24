import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://goqdgkgxejbbitvaiqvn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvcWRna2d4ZWpiYml0dmFpcXZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0NTg1NTMsImV4cCI6MjA2MTAzNDU1M30.N_bBGfntvcc9wwwhWpCplSHR9WzZlqHMZeaqXpoIqMc'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;