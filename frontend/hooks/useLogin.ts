import { useState } from "react"
import toast from "react-hot-toast";

const useLogin = () => {
  const [loading, setLoading] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    const [testData,setTestData] = useState(false)
  const [testData1,setTestData1] = useState(false)
  const [testData2,setTestData2] = useState(false)
  const [testData3,setTestData3] = useState(false)
//adding useStates hooks
  //adding useStates hooks
  //adding useStates hooks
  //adding useStates hooks
  //adding useStates hooks
  //adding useStates hooks
  //adding useStates hooks
  //adding useStates hooks
  
  const login = async(username:string,password:string) => {

    const success = handleInputErrors( username,password)

        if (!success) return;
    setLoading(true)
    try {
        const res = await fetch("http://localhost:4000/api/auth/login" ,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        }) 
        const data = await res.json()
        if (data.error) {
            throw new Error(data.error)
        }
        setLoggedIn(true)
        localStorage.setItem("user", JSON.stringify(data));
        
    } catch (error:any) {
        setLoggedIn(false) 
        toast.error(error.message)
    }finally{
        setLoading(false);
    }
  }
  return { login, loading ,loggedIn}
}

export default useLogin

function handleInputErrors(username:string,password:string){
    if (!username ||!password ) {
        toast.error("Please fill in all fields")
        return false;
    }
    return true; 
}
