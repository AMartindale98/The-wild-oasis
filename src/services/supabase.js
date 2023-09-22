import { createClient } from "@supabase/supabase-js";

//row level security allows us to put the key so publically like this. we activated rls to be read only for everyone so they can't just change or mess with the data
export const supabaseUrl = "https://bqzrvbsqcftnaxeavfth.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxenJ2YnNxY2Z0bmF4ZWF2ZnRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ1NDEzNjAsImV4cCI6MjAxMDExNzM2MH0.0HW5UzZTl6o0K5-XlP4N-1dxi5F49h-qeSRtQgJry20";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
