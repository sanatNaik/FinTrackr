import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const SignupComp = () => {
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    const navigate = useNavigate();
    const API = process.env.REACT_APP_API_URL;
    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API}/api/auth/signup`,{
                username,
                email,
                password,
            });

            navigate("/login");
        
        }catch(err){
            console.log(err);
            setError(err.response?.data?.message || "Signup Failed");
        }
    };

  return (
    <div className="flex w-[80%] h-full items-center justify-center bg-blue-100">
        <div className='flex flex-col h-[50%] w-[40%] justify-center items-center bg-blue-200 rounded-lg'>
                    <div className='flex justify-center items-center w-full h-[20%] font-bold text-xl'>
                        SignUp
                    </div>
                    <form onSubmit={handleSignup} className='flex flex-col w-full h-[80%] p-6 gap-4 justify-between'>
                        <div className='flex flex-col w-full h-[60%] justify-start text-lg gap-3'>
                            <div className='flex flex-col justify-around gap-1 h-[30%]'>
                               <input
                               type="text"
                               placeholder='Username'
                               value={username}
                               className='h-full p-2 rounded-md'
                               onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className='flex flex-col justify-around gap-1 h-[30%]'>
                               <input
                               type="email"
                               placeholder='Email'
                               value={email}
                               className='h-full p-2 rounded-md'
                               onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className='flex flex-col justify-around gap-1 h-[30%]'>
                               <input
                               type="password"
                               placeholder='Password'
                               value={password}
                               className='h-full p-2 rounded-md'
                               onChange={(e) => setPassword(e.target.value)}
                               />
                            </div>
                        </div>
                        <div className='flex w-full h-[20%] justify-center'>
                            <button
                            className='flex w-[60%] h-full bg-green-300 justify-center items-center rounded-lg font-semibold text-lg'
                            type="submit">
                                Signup
                            </button>
                        </div>
                        <div className='flex justify-center'>
                            Already have an account? 
                            <Link to="/login" className='text-blue-500'>
                                Login
                            </Link>
                        </div>
                    </form>
                </div>
    </div>
  )
}

export default SignupComp
