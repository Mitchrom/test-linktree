import supabase from "../utils/supabaseClient";

export default async function deleteTableElement(tableName, tableWithId) {
    let data
    let error

    try {
        data = supabase.from(tableName).delete().eq("id", tableWithId)
    } catch (err) {
        error = err
    }

    return { data, error }
}