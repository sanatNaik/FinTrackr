import React, { useEffect } from 'react'
import AddLog from './AddLog'
import AddAccount from './AddAccount'
import AccountDetail from './AccountDetail'
import { Link } from 'react-router-dom'
import { useState,onRefresh } from 'react'
import axios from 'axios'
import { fetchTransactions } from '../api/transactionAPI.js'
import { fetchAccount } from "../api/accountAPI.js"

const Dashboard = () => {
    const [selected,setSelected] = useState("");
    const [transactions,setTransactions] = useState([]);
    const [accountsList,setAccountsList] = useState([]);
    const [editTransaction, setEditTransaction] = useState(null);
    const [deleteTransaction,setDeleteTransaction] = useState(null);
    const [editAccount, setEditAccount] = useState(null);
    const API = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem("jwtToken");
    const now = new Date();
    const currMonth = now.getMonth();
    const currYear = now.getFullYear();

    const monthlyTx = transactions.filter((tx) => {
        const txDate = new Date(tx.date);
        return txDate.getMonth() === currMonth && txDate.getFullYear() === currYear;
    });

    const monthlyIncome = monthlyTx
        .filter((tx) => tx.type === "income")
        .reduce((sum, tx) => sum + Number(tx.amount || 0), 0);
    const monthlyExpense = monthlyTx
        .filter((tx) => tx.type === "expense")
        .reduce((sum, tx) => sum + Number(tx.amount || 0), 0);

    const getTransactions = async () => {
        const data = await fetchTransactions(token);
        setTransactions(data);
    };
    const getAccounts = async () => {
        const data = await fetchAccount(token);
        setAccountsList(data);
    };
    const handleEdit = (tx) => {
        setEditTransaction(tx);
    };
    const handleAccountEdit = (ax) => {
        setEditAccount(ax);
    }
    const handleTransactionDelete = async(tx) => {
        try {
            await axios.delete(
              `${API}/api/transaction/delete/${tx._id}`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            if (onRefresh) onRefresh(); 
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(() => {
        getTransactions();
    }, [token]);

    useEffect(() => {
        getAccounts();
    },[token]);

    const totalBalance = accountsList.reduce((sum, acc) => sum + Number(acc.balance || 0), 0);

  return (
    <div className='flex w-[80%]    '>
        <div className='flex flex-col w-[80%] h-full text-2xl p-4 items-center justify-between border-r-2'>
            <div className='flex flex-col w-full h-[10%] text-2xl font-bold justify-around '>
                <div className='flex text-xl w-full h-[20%] p-4'>
                    Dashboard
                </div>
            </div>
            <div className='flex text-lg items-around w-[90%] gap-10'>
                <button onClick={()=>setSelected("transaction")}
                    className={`p-2 hover:text-blue-100 hover:border-b-2 hover:border-blue-100 ${
                        selected==="account" ?" ": "border-b-2 border-black"}`}>
                    Transactions
                </button>
                <button
                    onClick={()=>setSelected("account")}
                    className={`p-2 hover:text-blue-100 hover:border-b-2 hover:border-blue-100 ${
                        selected==="account" ? "border-b-2 border-black" : ""}`}>
                    Accounts
                </button>
            </div>
            <div className={`flex w-full h-[80%] rounded-lg items-start`}>
                <div className={`flex w-full h-full justify-between ${selected==="account"?"hidden":"block"}`}>
                    <div className='w-[70%] h-full overflow-y-scroll overflow-x-clip'>
                        <table className='w-full m-3 table-auto border-collapse overflow-y-scroll'>
                        <thead className='border-b-2'>
                            <tr className='text-sm'>
                                <th className='pb-3'>Date</th>
                                <th className='pb-3'>Type</th>
                                <th className='pb-3'>Amount</th>
                                <th className='pb-3'>Account</th>
                                <th className='pb-3'>Notes</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(tx => (
                                <tr key={tx._id} 
                                className='align-top even:bg-white odd:bg-gray-50 max-h-[100px]'>
                                    <td className='text-center border-b text-base p-2 align-top'>{new Date(tx.date).toLocaleDateString('en-GB')}</td>
                                    <td className='text-center border-b  text-base p-2 align-top'>{tx.type}</td>
                                    <td className='text-center border-b  text-base p-2 align-top'>{tx.amount}</td>
                                    <td className='text-center border-b  text-base p-2 align-top'>{tx.accountId.account}</td>
                                    <td className='text-center border-b  text-base p-2 align-top'>{tx.label}</td>
                                    <td>
                                        <button 
                                            className="text-blue-600 hover:underline align-middle text-sm w-[20px] h-[20px]"
                                            onClick={() => handleEdit(tx)}
                                            >
                                            <img src="/public/edit.webp" alt="" />
                                        </button>
                                    </td>
                                    <td>
                                        <button 
                                            className="text-blue-600 hover:underline align-middle text-sm w-[20px] h-[20px]"
                                            onClick={() => handleTransactionDelete(tx)}
                                            >
                                            <img src="/public/deleteicon.png" alt="" />
                                        </button>
                                    </td>

                                </tr>
                                ))}
                        </tbody>
                        </table>    
                    </div>
                    <div className='flex items-end w-[30%] h-full justify-start'>
                        <AddLog onTransactionAdded={() => getTransactions()} editTransaction={editTransaction} setEditTransaction={setEditTransaction}/>   
                    </div>
                </div>
                <div className={`flex w-full h-full justify-around items-center ${selected==="account"?"block":"hidden"}`}>
                    <div className='w-[60%] h-full overflow-y-scroll overflow-x-clip'>
                        <table className='w-full m-6 table-auto border-collapse'>
                        <thead className='border-b-2'>
                            <tr className='text-sm'>
                                <th className='pb-3'>Account</th>
                                <th className='pb-3'>Type</th>
                                <th className='pb-3'>Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accountsList.map(ax => (
                                <tr key={ax._id} 
                                className='align-top even:bg-white odd:bg-gray-50 max-h-[100px]'>
                                    <td className='text-center border-b  text-base p-2 align-top'>{ax.account}</td>
                                    <td className='text-center border-b  text-base p-2 align-top'>{ax.type}</td>
                                    <td className='text-center border-b  text-base p-2 align-top'>{ax.balance}</td>
                                    <td>
                                        <button 
                                            className="text-blue-600 hover:underline align-middle text-sm w-[25px] h-[25px]"
                                            onClick={() => handleAccountEdit(ax)}
                                            >
                                            <img src="/public/edit.webp" alt="" />
                                        </button>
                                    </td>
                                </tr>
                                ))}
                        </tbody>
                        </table>
                    </div>
                    <AddAccount onAccountAdded={() => getAccounts() } editAccount={editAccount} setEditAccount={setEditAccount}/>
                </div>
            </div>
        </div>
        <div className='flex flex-col w-[20%] h-full justify-center'>
            <div className='flex flex-col w-full h-[60%] justify-between items-center'>
                    <div className='flex flex-col w-[80%] h-[30%] text-sm justify-center items-center border-2 rounded-md p-2 gap-4'>
                        <span className='font-semibold'>Total Balance</span>
                        <span className='text-xl font-bold text-blue-600'>₹{totalBalance.toLocaleString()}</span>
                    </div>
                    <div className='flex flex-col w-[80%] h-[30%] text-sm justify-center items-center border-2 rounded-md p-2 gap-4'>
                        <span className='font-semibold'>Monthly Expense</span>
                        <span className='text-xl font-bold text-blue-600'>₹{monthlyExpense.toLocaleString()}</span>
                    </div>
                    <div className='flex flex-col w-[80%] h-[30%] text-sm justify-center items-center border-2 rounded-md p-2 gap-4'>
                        <span className='font-semibold'>Monthly Income</span>
                        <span className='text-xl font-bold text-blue-600'>₹{monthlyIncome.toLocaleString()}</span>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard
