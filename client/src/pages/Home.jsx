import React, { useContext, useEffect, useState } from 'react'
import AuthContextProvider, { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const {
        user, 
        setUser
    } = useContext(AuthContext);
    const [ tokenVerified, setTokenVerified ] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const { data } = await axios.get(
                    "http://localhost:3001/api/users/verifytoken",
                    {
                        withCredentials: true
                    }
                );

                setTokenVerified(true);
                setUser(data.user);
            } catch (err) {
                console.log(("Error verifying token"));
                console.error(err);
                navigate("/login");
            }
        }

        if (!tokenVerified && !user) {
            verifyToken();
        }
        
    }, [ user, tokenVerified ]);

    console.log();

  return (
    <div>
        <h2>Hello, {user}</h2>
    </div>
  )
}

export default Home