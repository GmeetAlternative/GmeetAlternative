"use client"
import { useState } from "react"
import useLogin from "@/hooks/useLogin";
import Link from "next/link";
import { useRouter } from 'next/navigation'

const Login = () => {
    const [username, setUsername ] = useState("");
    const [password, setPassword ] = useState("");
    const {loading, login, loggedIn} = useLogin()
    const router = useRouter()

    const handleSubmit = async (e:any) => {
        e.preventDefault()
        await login(username, password) //implementing login
        
    }
    if(loggedIn) {
      router.push('/dashboard')
  }
  

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
        <div className="rounded-lg w-full p-6 shadow-md bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
            <h1 className="text-3xl font-semibold text-center text-gray-800">
                Login
                <span className="text-blue-500"> GMeet</span>
            </h1>


            <form onSubmit={handleSubmit} className="mt-6 w-4/6 md:w-5/6 gap-2 flex justify-center flex-col mx-auto">
                <div className="">
                    <label className="label p-2">
                        <span className="text-base label-text">Username</span>
                    </label>
                    <input type="text"
                     placeholder="Enter your username"
                      className="w-full text-black border p-2 rounded-md input input-bordered h-10"
                      value= {username}
                      onChange={(e) => {setUsername(e.target.value)}} />
                </div>

                <div className="mb-6">
                    <label className="label p-2">
                        <span className="text-base label-text">Password</span>
                    </label>
                    <input type="password" 
                    placeholder="Enter your passsword" 
                    className="w-full text-black input border p-2 rounded-md input-bordered h-10"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}/>

                </div>
                <Link href="/auth/signup" className="text-sm hover:underline hover:text-blue-500">
                        Don&apos;t have an account yet?
                </Link>

                <div className="mt-6">
                    <button type="submit" disabled={loading} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline">
                        
                        {loading ? <span className="loading loading-spinner"></span> : "Login"}
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login