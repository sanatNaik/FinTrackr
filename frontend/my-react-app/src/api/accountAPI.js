import axios from "axios";

export const fetchAccount = async (token) => {
    try{
        const res = await axios.get("http://localhost:5000/api/accounts/get",{
            headers: { 
                Authorization: `Bearer ${token}`
            },
        });
        return res.data;
    }catch (err) {
        console.error("Failed to fetch transactions",err);
        return [];
    }
};