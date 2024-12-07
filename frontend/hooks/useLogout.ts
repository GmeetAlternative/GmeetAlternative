"use client"
import { useState } from "react"

const useLogout = () => {
  const [loading, setLoading] = useState(false);
    const [loggedout, setIsLoggedout ] = useState(false);

  const logout = async() => {
    setLoading(true);
    //implementing logout feature
    try {
        const res = await fetch("http://localhost:4000/api/auth/logout" , {
            method : "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json();
        if (data.error) {
            throw new Error(data.error);
        }
        localStorage.removeItem("user");
        setIsLoggedout(true); 
    } catch (error:any) {
        console.error(error.message);
    }finally{
        setLoading(false);
    }
  }
  return { logout, loading , loggedout};
}

export default useLogout