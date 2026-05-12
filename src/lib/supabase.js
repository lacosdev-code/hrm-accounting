import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const isValidUrl = supabaseUrl && supabaseUrl.startsWith('http')

if (!isValidUrl) {
  console.warn('⚠️ Supabase URL belum diset di .env file. Aplikasi akan berjalan dengan data dummy.')
}

export const supabase = isValidUrl ? createClient(supabaseUrl, supabaseAnonKey || '') : null
