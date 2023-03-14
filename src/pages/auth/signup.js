import supabase from "../utils/supabaseClient";

//fonction pour l'inscription
//penser à mettrre l'email et le mdp e paramètres lors de son appel dans le code
export default async function registerWithEmail(email, password) {
    let data = {}
    let error = {}

    try {
        if (email && password) {
            data = supabase.auth.signUp({ email, password })
            if (data.error) alert(data.error)
        }
    } catch (err) {
        error = err
    }

    return { data, error }
}