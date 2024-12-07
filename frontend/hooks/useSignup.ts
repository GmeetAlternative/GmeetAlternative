import { useState } from "react"
import toast from "react-hot-toast";


interface Inputs{
    fullName: string,
    username: string,
    password: string,
    confirmPassword: string,
}

const useSignUp = () => {
    
    const [signedUp, setSignedUp] = useState(false)
 
    const [loading, setLoading] = useState(false);


    const signup = async( { fullName, username,password,confirmPassword}: Inputs) => {
        const success = handleInputErrors({ fullName, username,password,confirmPassword})

        if (!success) return;

        setLoading(true);
        //sending registration credentials to backend
        try {
            const res = await fetch("http://localhost:4000/api/auth/signup" , {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fullName,
                    username,
                    password,
                    confirmPassword,
                    
                })
            })

            const data = await res.json();
            console.log(data);
            if (data.error) {
                throw new Error(data.error);
            }
            //set to localstorage
            localStorage.setItem("user", JSON.stringify(data));
            
            toast.success("Account created successfully");
            setSignedUp(true)


            
        } catch (error:any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return { signup, loading, signedUp };
}

export default useSignUp

const handleInputErrors = ({ fullName, username, password, confirmPassword }: Inputs) => {
    if (!fullName ||!username ||!password ||!confirmPassword) {
        toast.error("Please fill in all fields")
        return false;
    }
    if (password!==confirmPassword){
        toast.error("Passwords do not match")
         return false;
    }
    if (password.length <6){
        toast.error("Password must be at least 6 characters")
        return false;
    }
    return true; 
}