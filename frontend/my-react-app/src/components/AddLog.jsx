import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { fetchAccount } from "../api/accountAPI";

const AddLog = ({  onTransactionAdded,editTransaction,setEditTransaction,onRefresh }) => {
  const [type, setType] = useState("");
  const [amount,setAmount] = useState("");
  const [date,setDate] = useState("");
  const [selectedAccountId,setSelectedAccountId] = useState("");
  const [label,setLabel] = useState("");
  const [accountList,setAccountList] = useState([]);
  const [message,setMessage] = useState("");
  const token = localStorage.getItem("jwtToken");
  const API = process.env.REACT_APP_API_URL;

  const handleTransactionAdd = async (e) => {
        const token = localStorage.getItem("jwtToken");
        e.preventDefault();
        if(!type || !selectedAccountId || !date || amount===undefined){
            setMessage("Please fill in all required fields!");  
            return;
        }
        
        const selectedAccount = accountList.find(acc => acc._id === selectedAccountId);

        if(type==="expense" && selectedAccount.balance < Number(amount) ){
          alert("insufficient balance");
          return;
        }
        try {
            if (editTransaction) {
              await axios.put(
              `${API}/api/transaction/update/${editTransaction._id}`,
               { selectedAccountId, type, amount: Number(amount), date, label },
              { headers: { Authorization: `Bearer ${token}` } }
            );
            setMessage("Transaction updated successfully!");
            setEditTransaction(null);
            
            if (onTransactionAdded) onTransactionAdded();
            if (onRefresh) onRefresh(); 
      } else {
        await axios.post(
          `${API}/api/transaction/add`,
          { selectedAccountId, type, amount: Number(amount), date, label },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage("Transaction added successfully!");
        if (onTransactionAdded) onTransactionAdded();
      }
        // setMessage("Success");
        setSelectedAccountId("");
        setDate("");
        setType("");
        setAmount("");
        setLabel("");

        setTimeout(() => setMessage(""),3000);
        }catch(err){
            console.log(err);
            setMessage(err.response?.data?.message || "Failed to add ");
            setTimeout(() => setMessage(""),3000);
        }
    };
    useEffect(() => {
            const getAccounts = async () => {
                const data = await fetchAccount(token);
                setAccountList(data);
            };
            getAccounts();
    },[token]);

    useEffect(() => {
        if (editTransaction) {
            setDate(editTransaction.date.split("T")[0]);
            setType(editTransaction.type);
            setAmount(editTransaction.amount);
            setSelectedAccountId(editTransaction.accountId._id);
            setLabel(editTransaction.label);
        }
    }, [editTransaction]);
  return (
    <form onSubmit={handleTransactionAdd} action="" className='flex flex-col p-4 border-2 m-3 mb-3 h-[90%] w-full rounded-md justify-center'>
        <div className='text-lg font-bold'>
          Add Transaction
        </div>
          <p className='flex flex-col text-base'>
            Transaction Type:
            <div className='flex flex-col justify-center'>
              <label className={type === "expense" ? "bg-blue-300 text-black p-2 rounded-md" : "bg-white p-2"}>
                <input type="radio" name="myRadio" value="expense" checked={type === "expense"} onChange={() => setType("expense")}/>
                Expense
              </label>
              <label className={type === "income" ? "bg-blue-300 text-black p-2 rounded-md" : "bg-white p-2"}>
                <input type="radio" name="myRadio" value="income" checked={type === "income"} onChange={() => setType("income")}/>
                Income
              </label>
            </div>
          </p>
          <div className='flex flex-col gap-3'>
            <div className='flex flex-col text-base'>
            <label>Amount</label>
            <textarea 
            name="" 
            id=""
            value={amount}
            onChange = { (e) => setAmount(e.target.value)} 
            className='border-2 w-full h-[30px] rounded-md px-1 resize-none'></textarea>
          </div>
          <div className='flex flex-col  text-base'>
            <label htmlFor="">Date</label>
            <input 
            type="date" 
            value={date}
            onChange = { (e) =>setDate(e.target.value)}
            className='border-2 w-full h-[30px] rounded-md px-1 resize-none'/>
          </div>
          <div className='flex flex-col  text-base'>
            <label htmlFor="">Account</label>
            <select
              value={selectedAccountId}
              onChange={(e) => setSelectedAccountId(e.target.value)}
              className="border p-2 rounded-md"
            >
              <option value="">Select Account</option>
              {accountList.map((acc) => (
                <option key={acc._id} value={acc._id}>
                  {acc.account} — ₹{acc.balance}
                </option>
              ))}
            </select>
          </div>
          <div className='flex flex-col  text-base'>
            <label htmlFor="">Label</label>
            <input 
            type="text" 
            value = {label}
            onChange={(e) => setLabel(e.target.value)}
            className='border-2 w-full h-[30px] rounded-md px-1 resize-none'/>
          </div>
          <div className='flex justify-center items-center text-base'>
            <button 
            type = "submit"
            className='flex text-base font-semibold w-[80%] p-2 bg-blue-300 rounded-lg border-2 hover:bg-blue-400 justify-center items-center '>
                {editTransaction ? "Update Transaction" : "Add Transaction"}
            </button>
          </div>
          </div>
    </form>
  )
}
export default AddLog
