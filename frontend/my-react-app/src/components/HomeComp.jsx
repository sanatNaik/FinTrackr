import React from 'react'
import { Link } from 'react-router-dom'

const HomeComp = () => {
  return (
    <div className='flex flex-col justify-around bg-blue-900 h-full w-full p-10 text-xl text-white'>
            <div className='flex h-[40%] justify-center items-center'>
                    <div className='flex h-full w-[20%] justify-end items-center'>
                        <img src="fintrackrLogo.png" alt="" className='w-[70%]'/>
                    </div>
                    <div className='flex flex-col w-[80%] h-full gap-6 justify-center items-center'>
                        <div className='flex flex-col items-stretch justify-around gap-4 text-3xl'>
                            <div className='flex items-end gap-10'>
                                <span className='text-5xl font-bold'>FinTrackr </span>Your personal finance companion
                            </div>
                            <div className='flex text-lg'>
                                Effortlessly manage your money, track, and achieve your financial goals.
                            </div>
                        </div>
                        <div className='flex text-base h-[20%] w-[80%] justify-around items-center'>
                            <Link to="/signup" className='flex w-[40%] h-full justify-center items-center rounded-lg font-semibold text-black bg-white'>
                                Get Started
                            </Link>
                            <Link to="login" className='flex w-[40%] h-full justify-center items-center rounded-lg font-semibold text-white border-white border-2 bg-blue-900'>
                                Already have an Account
                            </Link>
                        </div>
                    </div>
            </div>
            <div className='flex flex-col w-full h-[40%] justify-around p-8 px-20 text-black'>
                    <div className='flex text-xl font-semibold p-4 text-white'>
                        Unlock your Financial Potential
                    </div>
                    <div className='flex justify-around items-center w-full h-[70%]'>
                        <div className='flex w-[30%] h-full bg-blue-50 rounded-lg p-3 text-sm'>
                            <div className='flex w-[30%] justify-center items-center'>
                                <img src="transactionRecord.png" alt="" className='w-[70%] h-[70%]'/>
                            </div>
                            <div className='flex flex-col w-[70%] justify-center items-start' >
                                <span className='font-bold'>Seamless Transaction Tracking</span>
                                <span>Record transactional data effortlessly</span>
                            </div>
                        </div>
                        <div className='flex w-[30%] h-full bg-blue-50 rounded-lg p-3 text-sm'>
                            <div className='flex w-[30%] justify-center items-center'>
                                <img src="balanceTracking.png" alt="" className='w-[70%] h-[70%]'/>
                            </div>
                            <div className='flex flex-col w-[70%] justify-center items-start' >
                                <span className='font-bold'>Realtime Financial Insights</span>
                                <span>Check expenses, incomes, balances across your accounts</span>
                            </div>
                        </div>
                        <div  className='flex w-[30%] h-full bg-blue-50 rounded-lg p-3 text-sm'>
                            <div className='flex w-[30%] justify-center items-center'>
                                <img src="telegram.png" alt="" className='w-[70%] h-[70%]'/>
                            </div>
                            <div className='flex flex-col w-[70%] justify-center items-start' >
                                <span className='font-bold'>Weekly Updates via Telegram</span>
                                <span>Use our telegram bot to get weekly summaries</span>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
  )
}

export default HomeComp

