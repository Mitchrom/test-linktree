import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import UpdateModal from "../../../components/UpdateModal";
import supabase from "../utils/supabaseClient";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState([]);
  const [isOpen, setIsOpen] = useState("")
  const [toUpdate, setToUpdate] = useState({})
  const router = useRouter();

  //récup infos user depuis router.asPath

  //récupère les infos de l'user authentifié (s'il est)
  useEffect(() => {
    // console.log(router.asPath.split('/')[2]);
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
        if (error) {
            throw error
        };
        setLinks(data);
        // console.log("data: ", data);
      } catch (error) {
        console.error(error);
      }
    };
    if (userId) getLinks();
  }, [userId]);

  //récupérer les infos de la ligne à modifier
  const getLink = (e) => {
    let interlude = parseFloat(e.target.id.split("-")[1])
    setToUpdate({...links[interlude]})
    setIsOpen(!isOpen)
  }

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
    let id = parseFloat(e.target.id.split("-")[1])
    try {
      console.log(links[id]);

      const { data, error } = await supabase
        .from("links")
        .delete()
        .eq("id", links[id].id);
      if (error) throw error;
      setLinks(links.filter((ele) => ele !== links[id]));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <Navbar />
      <div className="flex flex-col w-full justify-center items-center mt-4">
        {isAuthenticated && (
          <>
            <div className="mt-4">
              <input
                type="text"
                id="title"
                className="border border-gray-300 rounded-md"
                placeholder="Un lien random"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <input
                type="text"
                id="url"
                className="border border-gray-300 rounded-md"
                placeholder="google.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <button
              className="border-2 border-black rounded-md mt-4 px-4 hover:bg-black hover:text-white"
              onClick={addNewLInk}
            >
              Ajouter un nouveau lien
            </button>
          </>
        )}
        {links?.map((link, i) => (
          <div key={i} className="flex flex-row items-center mt-5">
            <div
              className="rounded-md bg-blue-400 hover:bg-blue-100 w-60 p-2 text-slate-100 hover:text-slate-900 font-semibold cursor-pointer shadow-xl"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = link.url;
              }}
            >
              <p>{link.title}</p>
            </div>
            <div className="flex flex-row items-center" >
              <div
                onClick={deleteLink}
                className="flex flex-row justify-center items-center w-fit h-fit ml-2 p-2 border border-black rounded-full cursor-pointer"
                id={`delete-${i}`}
              >
                X
              </div>
              <div
                onClick={getLink} 
                className="border border-black rounded-full ml-2 p-2 cursor-pointer"
                id={`update-${i}`}
              >
                Modifier
              </div>
            </div>
          </div>
        ))}
      </div>
      {isOpen ? <UpdateModal links={links} setLinks={setLinks} toUpdate={toUpdate} setToUpdate={setToUpdate} isOpen={isOpen} setIsOpen={setIsOpen} /> : null}
    </>
  );
}