import React from 'react'
import Sidebar from '../components/Sidebar'
import SignupComp from '../components/SignupComp'

const SignUp = () => {
  return (
    <div className="flex w-screen h-screen">
        <Sidebar />
        <SignupComp/>
    </div>
  )
}

export default SignUp
