import supabase from "../utils/supabaseClient";

//ici deux fct
//une pour récupérer la session en cours
export async function getCurrentUser() {
    try {
        const user = await supabase.auth.getUser()
        console.log(user);
        return { user }
    } catch (error) {
        console.error("Erreur lors de la récupération des infos de la session actuelle", error);
        return null
    }
}
//l'autre récupère tous les users dans un arrray d'objets (pas important)