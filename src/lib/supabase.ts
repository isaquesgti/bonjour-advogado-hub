import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://ppbqhjimgngzylaipoza.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwYnFoamltZ25nenlsYWlwb3phIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4MTE4NjEsImV4cCI6MjA4ODM4Nzg2MX0.8YF676xUTusPjQPAFZRg-CNsS0F-_clsCnl8DIUiQ04"

export const supabase = createClient(supabaseUrl, supabaseKey)