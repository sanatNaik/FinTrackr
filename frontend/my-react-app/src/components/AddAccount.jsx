    import React from 'react'
    import { useState , useEffect} from 'react';
    import axios from 'axios';

    const AddAccount = ({ onAccountAdded,editAccount,setEditAccount,onRefresh }) => {
        const [selected,setSelected] = useState("");
        const [message,setMessage] = useState("");
        const [account,setAccount] = useState("");
        const [type,setType] = useState("");
        const [balance,setBalance] = useState(0);
        const token = localStorage.getItem("jwtToken");
        const API = process.env.REACT_APP_API_URL;
        const handleAccountAdd = async (e) => {
            e.preventDefault();
            if(!account || !type || balance===undefined){
                setMessage("Please fill in all required fields!");
                return;
            }   
            try {
                if(editAccount){
                    console.log(editAccount);
                    const res = await axios.put(`${API}/api/accounts/update/${editAccount._id}`,
                    {account,type,balance:Number(balance)},
                    {
                    headers:{
                        Authorization:`Bearer ${token}`,
                    },
                });
                
                setMessage("Transaction updated successfully!");
                setEditAccount(null);
                if (onRefresh) onRefresh();
                if(onAccountAdded) onAccountAdded();
                }else{
                    const res = await axios.post(`${API}/api/accounts/add`,
                    {account,type,balance:Number(balance)},
                    {
                    headers:{
                        Authorization:`Bearer ${token}`,
                    },
                });
                if(onAccountAdded) onAccountAdded();
            }
            setMessage("Success");
            setAccount("");
            setType("");
            setBalance(0);
            setEditAccount(null);
            setTimeout(() => setMessage(""),3000);
            }catch(err){
                console.log(err);
                setMessage(err.response?.data?.message || "Failed to add account");
                setTimeout(() => setMessage(""),3000);
            }
        };
        useEffect(() => {
            if(editAccount){
                console.log(editAccount);
                console.log("working");
                setAccount(editAccount.account);
                setType(editAccount.type);
                setBalance(String(editAccount.balance));
            }
        }, [editAccount]);
        return (
        
        <div className='w-[30%] h-[60%] flex justify-center items-center font-semibold'>
        <div className='text-lg w-full h-full flex flex-col p-4 border-2 rounded-md'>
                <div className='flex justify-center'>
                    Account
                </div>
                <form action="" onSubmit={handleAccountAdd} className='flex flex-col h-full justify-around text-sm'>
                    <div className='flex flex-col gap-3'>
                        <div className='flex flex-col text-base'>
                            <label>Account</label>
                            <textarea 
                            name="" 
                            id=""   
                            value={account}
                            className='border-2 w-full h-[30px] rounded-md px-1 resize-none'
                            onChange={(e) => setAccount(e.target.value)}></textarea>
                        </div>
                        <div className='flex flex-col text-base'>
                            <label htmlFor="">Select Type</label>
                            <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="border p-2 rounded-md"
                            >
                                <option value="Cash">Cash</option>
                                <option value="Bank">Bank</option>
                                <option value="Card">Card</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className='flex flex-col  text-base'>
                            <label htmlFor="">Balance</label>
                            <input 
                            type="number"
                            value={balance}
                            className='border-2 w-full h-[30px] rounded-md px-1 resize-none'
                            onChange={(e) => setBalance(e.target.value)}/>
                        </div>
                        <div className='flex justify-center items-center text-base'>
                            <button 
                            type = "submit"
                            className='flex text-base font-semibold w-[80%] p-2 bg-blue-300 rounded-lg border-2 hover:bg-blue-400 justify-center items-center '>
                            {editAccount ? "Update Account" : "Add Account"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
    }

    export default AddAccount
