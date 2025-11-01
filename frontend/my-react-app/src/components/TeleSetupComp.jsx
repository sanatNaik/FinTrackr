import React from 'react'
import { useState } from 'react';
import axios from 'axios';

const TeleSetupComp = () => {
    const token = localStorage.getItem("jwtToken");
    const [teleId,setTeleId] = useState("");
    const API = process.env.REACT_APP_API_URL;
    const handleTeleId = async (e) => {
        e.preventDefault();
        await axios.put(`/api/user/update`, 
            { teleId },
            { headers: { Authorization: `Bearer ${token}` } }
        );
    }
  return (
    <div className='flex flex-col w-[80%] h-full p-10 text-2xl justify-center items-center bg-blue-100'>
        <div className='flex h-[20%] justify-start items-center font-bold text-3xl'>
           Setting Up Weekly Telegram Updates
        </div>
        <div className='flex flex-col h-[70%] text-xl justify-start items-center'>
            <div className='flex flex-col text-xl gap-5'>
                <li>
                    Open Telegram and search for <a href="https://t.me/FinTrackrUpdate_bot" target="_blank">@FinTrackrUpdate_bot</a>
                </li>
                <li>
                    Send the message <span className='font-semibold'>/start</span> to the bot.
                </li>
                <li>
                    The bot will reply with your Telegram ID — copy it.
                </li>
                <li>
                  Return to FinTrackr, paste your <span className='font-semibold'>Telegram ID</span> below , and click Save.
                </li>
                <form onSubmit={handleTeleId} className='flex justify-start gap-5 w-full px-10 h-[15%]'>
                  <input
                    type="text"
                    placeholder="Enter Telegram ID"
                    value={teleId}
                    className='flex w-[30%] h-full rounded-md p-2' 
                    onChange={(e) => setTeleId(e.target.value)}
                  />
                  <button type="submit" className='flex w-[10%] h-full rounded-md justify-center items-center border-2 border-white font-semibold hover:bg-blue-50'>Save</button>
                </form>
                <li>
                  That’s it! You’ll automatically receive your weekly income & expense summary every Monday at 9:00 AM.
                </li>
            </div>
            
        </div>
    </div>
  )
}

export default TeleSetupComp
