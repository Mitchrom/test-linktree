import { useRouter } from "next/router";
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import logInWithEmail from "./auth/login";
import supabase from "./utils/supabaseClient";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();

  //connexion
  const handleLogin = async () => {
    const { error } = await logInWithEmail(email, password)
    if (!error) router.push('/dashboard')

  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-between border rounded-lg bg-neutral-300 w-60 h-80 mx-auto mt-20 p-2">
        <div>
          <div>
            <label htmlFor="email">Adresse Email</label>
            <input
              type="email"
              id="email"
              className="border border-gray-300 rounded-md ml-2 "
              placeholder="exemple@random.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              className="border border-gray-300 rounded-md ml-2 "
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="w-fit mx-auto">
          <button
            className="border border-black rounded-lg p-1"
            onClick={handleLogin}
          >
            Connexion
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
