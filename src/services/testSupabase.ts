import { supabase } from "@/src/lib/supabase";

export async function testConnection() {
  const { data, error } = await supabase
    .from("expenses")
    .select("*");

  console.log("DATA:", data);
  console.log("ERROR:", error);
}