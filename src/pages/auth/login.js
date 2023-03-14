import supabase from "../utils/supabaseClient";

//fonction pour la connexion
//penser à mettrre l'email et le mdp e paramètres lors de son appel dans le code
export default async function logInWithEmail(email, password){
    let data = {}
    let error = {} 
    try {
        if (email && password) {
            data = await supabase.auth.signInWithPassword({ email, password })
            if (data.error) alert(data.error)
        }
    } catch (err) {
        error = err
    }
    return { data, error }
}