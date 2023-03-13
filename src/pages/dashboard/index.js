import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar';
import supabase from '../utils/supabaseClient';

const Dashboard = () => {
    const router = useRouter()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState("")

    useEffect(() => {
        // console.log(router.asPath.split('/')[2]);
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

    return (
        <div>
            <Navbar />
            {/* {isAuthenticated ? <p>connecté</p> : <p>Invité</p>} */}
            <h1>Choisissez un arbre à consulter (pseudo)</h1>
            <input className='border border-black' type="text" value={user} onChange={(e) => setUser(e.target.value)} />
            <button className='border border-black' onClick={(e) => router.push(`/dashboard/${user}`) } >Valider</button>
        </div>
    );
};

export default Dashboard;