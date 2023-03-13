import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import supabase from "./utils/supabaseClient";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState([]);
  const [images, setImages] = useState([]);
  const router = useRouter();

  //récupère les infos de l'user authentifié (s'il est)
  useEffect(() => {
    const getUser = async () => {
      const user = await supabase.auth.getUser();

      if (user) {
        const userId = user.data.user?.id;
        setIsAuthenticated(true);
        setUserId(userId);
      } else {
        setIsAuthenticated(false);
      }
    };
    getUser();
  }, []);

  //récupère les liens présents dans la bdd (appartenant à l'user précédemment authentifié)
  useEffect(() => {
    const getLinks = async () => {
      try {
        const { data, error } = await supabase
          .from("links")
          .select("id, title, url")
          .eq("user_id", userId);
        if (error) throw error;
        setLinks(data);
        // console.log("data: ", data);
      } catch (error) {
        console.error(error);
      }
    };
    if (userId) getLinks();
  }, [userId]);

  //ajouter un nouveau lien dans la bdd
  const addNewLInk = async () => {
    try {
      if (title && url && userId) {
        const { data, error } = await supabase
          .from("links")
          .insert({
            title,
            url,
            user_id: userId,
          })
          .select();
        if (error) throw error;
        console.log("data: ", data);
        if (links) {
          setLinks([...data, ...links])
          setTitle("")
          setUrl("")
        };
      }
    } catch (error) {
      console.error(error);
    }
  };

  //supprimer lien de la bdd
  const deleteLink = async (e) => {
    try {
      console.log(links[e.target.id]);

      const { data, error } = await supabase
        .from("links")
        .delete()
        .eq("id", links[e.target.id].id);
      if (error) throw error;
      setLinks(links.filter((ele) => ele !== links[e.target.id]));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="text-center" >Bienvenue</h1>
      <div  className="flex flex-row justify-between w-fit mx-auto p-4 mt-4">
      <button onClick={() => router.push("/signup")} className="border border-slate-500 rounded-lg p-2" >Inxcription</button>
      <button onClick={() => router.push("/login")} className="border border-slate-500 rounded-lg p-2" >Connexion</button>
      <button onClick={() => router.push("/dashboard")} className="border border-slate-500 rounded-lg p-2" >Accéder en tant qu'invité</button>
      </div>
    </>
  );
}
