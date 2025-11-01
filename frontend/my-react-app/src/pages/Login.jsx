import React from 'react'
import Sidebar from '../components/Sidebar'
import LoginComp from '../components/LoginComp'
const Login = () => {
  return (
    <div className="flex w-screen h-screen">
        <Sidebar />
        <LoginComp/>
    </div>
  )
}

export default Login
