import axios from "axios";

export const fetchTransactions = async (token) => {
    try{
        const res = await axios.get("/api/transaction/get",{
            headers: { 
                Authorization: `Bearer ${token}`
            },
        });
        return res.data.transactions;
    }catch (err) {
        console.error("Failed to fetch transactions",err);
        return [];
    }
};