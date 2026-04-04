import { supabase } from '../shared/supabaseClient'

export const getAudits = async (niche) => {
  const { data, error } = await supabase
    .from('hubs_content')
    .select('*')
    .eq('niche', niche)
    .order('published_at', { ascending: false })
  
  if (error) {
    console.error('Supabase Error:', error)
    return []
  }
  return data
}
