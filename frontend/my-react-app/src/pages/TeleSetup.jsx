import React from 'react'
import Sidebar from '../components/Sidebar'
import TeleSetupComp from '../components/TeleSetupComp'

const TeleSetup = () => {
  return (
    <div className="flex w-screen h-screen">
       <Sidebar/>
       <TeleSetupComp/>
    </div>
  )
}

export default TeleSetup
