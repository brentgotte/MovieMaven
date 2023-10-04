import supabase from "./supabaseClient";

export default async function getUsers() {
    const { data, error } = await supabase.from("users").select("*");
    return data;
}
