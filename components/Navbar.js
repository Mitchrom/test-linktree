import React, { useEffect, useState } from "react";
import supabase from "@/pages/utils/supabaseClient";
import { useRouter } from "next/router";
import { styles } from "@/styles/style";
import logOut from "@/pages/auth/logout";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isUserNameSetted, setIsUserNameSetted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [newUserName, setNewUserName] = useState("")
  // const [user, setUser] = useState({});
  // const [userId, setUserId] = useState("");
  const router = useRouter();

  useEffect(() => {
    //vérifier si l'user est authentifié
    const getUser = async () => {
      const user = await supabase.auth.getUser();

      if (user.data.user !== null) {
        setIsAuthenticated(true);
        console.log(user);
      } else {
        setIsAuthenticated(false);
      }
    };
    getUser();
  }, []);

  //fonction logout
  //destructurer data au lieu de error parce que sinon il y a une erreur
  const logout = async () => {
    const { data } = await logOut()
  };

  return (
    <div className="relative" >
      <div className="fixed flex flex-row items-center w-full h-[70px] px-5 border border-black bg-white">
        {isAuthenticated ? (
          <div>
            <p>connecté</p>
            <button onClick={() => setIsOpen(!isOpen)} className={`${styles.button} text-xs`}>Username</button>
          </div>
          ) : <p>Invité</p>}
        <button className={`${styles.button} py-2 ml-4`} onClick={logout}>
          Déconnexion/Retour
        </button>
      </div>
      <div className="w-full h-[100px]" />
      <div className={isOpen ? styles.modal : "hidden"}>
        <h3 className="text-center">Changez votre nom d'utilisateur</h3>
        <div className="flex flex-col items-center" >
          <input type="text" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} className={`${styles.input} w-fit mt-4`} />
          <div className="flex flex-row" >
            <button onClick={() => setIsOpen(!isOpen)} className={`${styles.button} w-fit mt-4`}>Valider</button>
            <button onClick={() => setNewUserName("")} className={`${styles.button} w-fit mt-4`}>Effacer</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
