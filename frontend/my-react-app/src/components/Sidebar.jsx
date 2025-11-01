import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='bg-blue-900 text-white h-full w-[20%] flex flex-col gap-10 p-2'>
      <div className='flex justify-center gap-3 items-center text-2xl p-4 font-bold'>
          <img src="FintrackrLogo.png" alt=""  className='w-[30%] h-full'/>
          FinTrackr
      </div>
      <div className='flex flex-col items-center'>
        <Link to="/" className='flex text-xl p-3 rounded-lg justify-start w-[90%] h-[40%] font-semibold hover:bg-blue-300 hover:text-black'>
            Home
        </Link>
        <Link to="/dashboard" className='flex text-xl p-3 rounded-lg justify-start w-[90%] h-[40%] font-semibold hover:bg-blue-300 hover:text-black'>
            Dashboard
        </Link>
        <Link to="/teleSetup" className='flex text-xl p-3 rounded-lg justify-start w-[90%] h-[40%] font-semibold hover:bg-blue-300 hover:text-black'>
            Telegram Setup
        </Link>
        <Link to="/login" className='flex text-xl p-3 rounded-lg justify-start w-[90%] h-[40%] font-semibold hover:bg-blue-300 hover:text-black'>
            Login
        </Link>
        <Link to="/signup" className='flex text-xl p-3 rounded-lg justify-start w-[90%] h-[40%] font-semibold hover:bg-blue-300 hover:text-black'>
            SignUp
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
