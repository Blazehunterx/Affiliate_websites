import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zaqkctlrvebulnbvirzl.supabase.co'
const supabaseAnonKey = 'sb_publishable_piF2oDl8c9kNiJXFTJTskA_v0VZfoEi'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
