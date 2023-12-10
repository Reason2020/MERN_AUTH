import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Signup = () => {
    const [ username, setUsername ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ errorMessage, setErrorMessage ] = useState(null);
    const [ successMessage, setSuccessMessage ] = useState(null);
    
    const { setUser, user } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        console.log("The user is currently: ", user);
        if (user) {
            navigate("/");
        }
    }, [ user ]);

    //handle signup
    const handleSignup = async (e) => {
        e.preventDefault();
        setSuccessMessage(null);
        setErrorMessage(null);

        try {
            //post request on the backend
            const { data } = await axios.post(
                "http://localhost:3001/api/users/signup", 
                {
                    username,
                    email,
                    password
                },
                {
                    withCredentials: true
                }
            );

            // setUser(data.user);
            setSuccessMessage(data.message);
            setUsername("");
            setEmail("");
            setPassword("");
            setTimeout(() => {
                navigate("/");
            }, 3000);
            
        } catch (err) {
            console.log("Signup error: ", err.response.data.message);
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
        <h2>Sign Up</h2>
        <form 
            onSubmit={handleSignup} 
            className='form'>
            <input 
                type='text'
                placeholder='Username'
                value={username}
                onChange={({ target }) => setUsername(target.value)} //{ target } = e
            />    

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

            <button type='Submit' className='form_action_btn'>Sign Up</button>
        </form>
        <p>Already have an account? <Link to={"/login"}>Log In</Link></p>
    </div>
  )
}

export default Signup