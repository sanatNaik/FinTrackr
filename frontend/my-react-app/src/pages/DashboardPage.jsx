import React from 'react'
import Sidebar from '../components/Sidebar'
import Dashboard from '../components/Dashboard'

const DashboardPage = () => {
  return (
    <div className="flex w-screen h-screen">
        <Sidebar />
        <Dashboard/>    
    </div>
  )
}

export default DashboardPage
