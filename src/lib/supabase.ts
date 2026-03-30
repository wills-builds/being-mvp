import { createClient } from '@supabase/supabase-js'

const url = "placeholder"!
const anonKey = "placeholder"!

export const supabase = createClient(url, anonKey)

export function getServiceClient() {
  return createClient(url, "placeholder"!)
}
