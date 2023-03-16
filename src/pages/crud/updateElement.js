import supabase from "../utils/supabaseClient";

//module pour la mise à jour d'un élément de la table
//tableName = nom de la table choisie => string
//tableElements = éléments à changer => objet
//tableElementId = objet contenant en clé l'id de l'élément à mettre à jour => { id: ele.id }
export default async function updateTableElement(
  tableName,
  tableElements,
  tableElementId
) {
  // let data = {};
  // let error = {};

  try {
    const { data, error } = await supabase
      .from(tableName)
      .update(tableElements)
      .match(tableElementId);
    return data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour", error);
    return null;
  }
}
