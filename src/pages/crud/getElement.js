import supabase from "../utils/supabaseClient";

//récupérer toutes les lignes d'une table
//tableName = "nomDeLaTable" => string
export async function getAllTableElements(tableName) {
  try {
    const { data: rows, error } = await supabase.from(tableName).select("*");
    if (error) throw new Error(error.message);
    return rows;
  } catch (error) {
    console.error("Erreur récup", error.message);
    return null;
  }
}

//récupérer une seule ligne
//tableName = "nomDeLaTable" => string
//tableElements = éléments de la ligne à récup => string
export async function getTableElements() {}
