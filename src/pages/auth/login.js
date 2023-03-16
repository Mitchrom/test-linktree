import supabase from "../utils/supabaseClient";

//fonction pour la connexion
//penser à mettrre l'email et le mdp en paramètres lors de son appel dans le code
export default async function logInWithEmail(email, password){
    try {
        //possible de mettre un condition vérifiant que les variables email et passsword !== undefined
        //soit à ce niveau soit avant l'appel de la fonction dans le code
        //moi perso je le mettrais avant l'appel dans le code
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        // console.log("data: ", data);
        // console.log("erreur", error);
        if (error) alert(error)
        return { data, error }
    } catch (error) {
        console.error("Erreur lors de la connexion", error);
        return null
    }
}