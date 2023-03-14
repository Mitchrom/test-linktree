import supabase from "../utils/supabaseClient";

//fct pour ajouter un élément à une table
//passer en paramètres une variable tableName = "nomDeLaTable" pour le nom de la table
//second paramètre un objet tableElements = {} content les infos de cette dernière

export default async function createTableElement(tableName, tableElements = {}) {
  let error = {};
  let data = undefined
  
  try {
      ({data} = await supabase.from(tableName).insert(tableElements).select());
  } catch (err) {
    error = err
  }

  return { data: data[0], error };
}
