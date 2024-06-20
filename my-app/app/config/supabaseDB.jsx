// // import { createClient } from '@supabase/supabase-js';
// // const supabase = createClient("https://wjvztrsptgbjgfwwvwfb.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indqdnp0cnNwdGdiamdmd3d2d2ZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg0NDA4OTQsImV4cCI6MjAzNDAxNjg5NH0.ZAvY3-hX-YGfFTvHZlflYWM-d6uUM30SCMpQ5GnMoMc");

// // export default supabase;
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://wjvztrsptgbjgfwwvwfb.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indqdnp0cnNwdGdiamdmd3d2d2ZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg0NDA4OTQsImV4cCI6MjAzNDAxNjg5NH0.ZAvY3-hX-YGfFTvHZlflYWM-d6uUM30SCMpQ5GnMoMc"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})