import React, { useEffect, useState } from "react";
import supabase from "@/pages/utils/supabaseClient";
import { useRouter } from "next/router";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState("");
  const router = useRouter();

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    else window.location.href = "/login";
  };

  return (
    <>
      <div className="fixed flex flex-row items-center w-full h-[70px] px-5 border border-black bg-white">
        <button className=" border border-black py-2 ml-4" onClick={logout}>
          Déconnexion
        </button>
      </div>
      <div className="w-full h-[100px]" />
    </>
  );
};

export default Navbar;
