"use client"
import { useState } from "react"
import useSignUp from "@/hooks/useSignup";
import Link from "next/link";
import { useRouter } from 'next/navigation'


const SignUp = () => {
    const router = useRouter()

    const [inputs, setInputs] = useState({
        fullName: '',
        username: '',
        password: '',
        confirmPassword: '',
    })
    const {loading , signup, signedUp} = useSignUp();
    
    

    const handleSubmit = async (e:any) => {
        e.preventDefault()
        
        await signup(inputs)  //implementing signup 
    }
    if(signedUp){
        router.push('/dashboard')
    }

  return (
    <div className="flex flex-col items-center justify-center mx-auto">
        <div className="rounded-lg w-full p-6 shadow-md bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
            <h1 className="text-3xl font-semibold text-center text-gray-800">
                SignUp
                <span className="text-blue-500"> GMeet</span>
            </h1>


            <form onSubmit={handleSubmit} className="mt-6 w-4/6 md:w-5/6 gap-2 flex justify-center flex-col mx-auto">
                <div className="">
                    <label className="label p-2">
                        <span className="text-base label-text">Full name</span>
                    </label>
                    <input type="text" placeholder="Enter your full name" className="w-full border p-2 rounded-md text-black input input-bordered h-10" 
                    value={inputs.fullName} 
                    onChange={(e) => setInputs({...inputs , fullName: e.target.value})}/>
                </div>

                <div className="">
                    <label className="label p-2">
                        <span className="text-base label-text">Username</span>
                    </label>
                    <input type="text" placeholder="Enter your username" className="w-full border p-2 rounded-md text-black input input-bordered h-10" 
                    value={inputs.username} 
                    onChange={(e) => setInputs({...inputs , username: e.target.value})}/>
                </div>

                <div className="">
                    <label className="label p-2">
                        <span className="text-base label-text">Password</span>
                    </label>
                    <input type="password" placeholder="Enter your passsword" className="w-full border p-2 rounded-md text-black input input-bordered h-10"
                    value={inputs.password} 
                    onChange={(e) => setInputs({...inputs , password: e.target.value})} />
                </div>
                <div className="">
                    <label className="label p-2">
                        <span className="text-base label-text">Confirm Password</span>
                    </label>
                    <input type="password" placeholder="Enter your passsword" className="w-full border p-2 rounded-md text-black input input-bordered h-10"
                    value={inputs.confirmPassword} 
                    onChange={(e) => setInputs({...inputs , confirmPassword: e.target.value})} />
                </div>
                <Link href="/auth/signin" className="text-sm hover:underline hover:text-blue-500 ">
                Already have an account?
                </Link>

                <div className="mt-6">
                    <button type="submit" disabled={loading}
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline">
                        SignUp
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default SignUp