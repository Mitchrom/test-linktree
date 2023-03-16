import supabase from "../utils/supabaseClient";

//fct pour supprimer un élément d'une table
//passer en paramètres une variable tableName = "nomDeLaTable" pour le nom de la table
//second paramètre un objet tableWithId = number, l'id de l'élément à supprimer

export default async function deleteTableElement(tableName, tableWithId) {
  let error = {};
  let data = {};

  try {
    data = await supabase.from(tableName).delete().eq("id", tableWithId);
    console.log(data);
  } catch (err) {
    error = err;
  }

  return { data, error };
}
