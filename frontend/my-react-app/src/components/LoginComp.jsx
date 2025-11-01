import React from 'react'
import { useState } from 'react';
import axios from 'axios';  
import { Link, useNavigate } from 'react-router-dom'

const LoginComp = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    const navigate = useNavigate();
    
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/auth/login",{
                email,
                password,
            });
            // If login successful, backend returns { token, userId }
            const { token, userId } = res.data;

            // Store token (in localStorage for simplicity)
            localStorage.setItem("jwtToken", token);
            localStorage.setItem("userId", userId);
            navigate("/dashboard");
        
        }catch(err){
            console.log(err);
            setError(err.response?.data?.message || "Login Failed");
        }
    };
  return (
    <div className="flex w-[80%] h-full items-center justify-center bg-blue-100">
        <div className='flex flex-col h-[50%] w-[40%] justify-center items-center bg-blue-200 rounded-lg'>
            <div className='flex justify-center items-center w-full h-[20%] font-bold text-xl'>
                Login
            </div>
            <form onSubmit={handleLogin} className='flex flex-col w-full h-[80%] p-6 gap-4 justify-between'>
                <div className='flex flex-col w-full h-[60%] justify-start text-lg gap-3'>
                    <div className='flex flex-col justify-around gap-1 h-[40%]'>
                       <input
                       type="email"
                       placeholder='Email'
                       value={email}
                       className='h-full p-2 rounded-md'
                       onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='flex flex-col justify-around gap-1 h-[40%]'>
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
                        Login
                    </button>
                </div>
                <div className='flex justify-center'>
                    Don't have an account? 
                    <Link to="/signup" className='text-blue-500'>
                        Signup
                    </Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default LoginComp
