import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
    const { setUser, user } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = async () => {
        await axios.get(
            "http://localhost:3001/api/users/logout",
            {
                withCredentials: true
            }
        ) 
        setUser(null);
        navigate("/login");
    }

  return (
    <nav className="navbar">
        <h2>Auth App</h2>
        {user && (
            <button 
                onClick={handleLogout}
                className='logout_btn'>
                Logout
            </button>
        )}
    </nav>
  )
}

export default Navbar