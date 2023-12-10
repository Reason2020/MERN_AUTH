import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Login = () => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ successMessage, setSuccessMessage ] = useState(null);
    const [ errorMessage, setErrorMessage ] = useState(null);

    const { setUser, user } = useContext(AuthContext);

    const navigate = useNavigate();
    
    useEffect(() => {
        console.log("The user is currently: ", user);
        if (user) {
            navigate("/");
        }
    }, [ user ]);

    //handle form submit logic
    const handleLogin = async (e) => {
        e.preventDefault();

        //if there are error and success message states, remove them
        setErrorMessage(null);
        setSuccessMessage(null);
        
        try {
            const { data } = await axios.post(
                "http://localhost:3001/api/users/login",
                {
                    email,
                    password
                },
                {
                    withCredentials: true
                }
            )

            // setUser(data.user);
            setSuccessMessage(data.message);
            setEmail("");
            setPassword("");
            setTimeout(() => {
                navigate("/");
            }, 3000);
        } catch (err) {
            console.error(err.response.data.message);
            setErrorMessage(err.response.data.message);
        }
    }

  return (
    <div className="form_container">
        {successMessage && (
            <div className="success_message">
                <p>{successMessage}</p>
            </div>
        )}
        {errorMessage && (
            <div className="error_message">
                <p>{errorMessage}</p>
            </div>
        )}
        <h2>Log In</h2>
        <form 
            onSubmit={handleLogin} 
            className='form'>
            <input 
                type='email'
                placeholder='Email'
                value={email}
                onChange={({ target }) => setEmail(target.value)} //{ target } = e
            />

            <input 
                type='password'
                placeholder='Password'
                value={password}
                onChange={({ target }) => setPassword(target.value)}  // { target } = e
            />

            <button type='Submit' className='form_action_btn'>Log In</button>
        </form>
        <p>Don't have an account? <Link to={"/signup"}>Sign Up</Link></p>
    </div>
  )
}

export default Login