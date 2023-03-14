import supabase from "../utils/supabaseClient";

export default async function logOut () {
    let data = {}

    try {
        data = await supabase.auth.signOut()
        if (data.error) throw data.error
        else window.location.href = "/"
    } catch (error) {
        console.error(error);
    }

    return { data }
}