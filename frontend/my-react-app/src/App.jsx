import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar.jsx'
import Dashboard from './components/Dashboard.jsx';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import ProtectedRoute from './components/ProtectedRoutes.jsx';
import TeleSetup from './pages/TeleSetup.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard"
         element={
          <ProtectedRoute> 
            <DashboardPage />
          </ProtectedRoute>
         }/>
        <Route path="/teleSetup" element={<TeleSetup />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}


export default App
