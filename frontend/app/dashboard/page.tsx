"use client"
import Navbar from '@/components/Navbar'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'


const Page = () => {

  const router = useRouter()
  const [roomName, setRoomName] = useState('')
  const accessToken = localStorage.getItem('user')

  useEffect(()=>{
    if (!accessToken) {
      router.push('/auth/signin');
    }
  },[accessToken, router])
      
  //sending user to the room based on the room name entered
  const joinRoom = () => {
    const targetRoomName=roomName || Math.random().toString(36).slice(2);
    router.push(`/room/${targetRoomName}?roomName=${targetRoomName}`);
  }

  return (
    <>
    <Navbar/>
    <div className="">

      <main className="flex flex-col gap-4 justify-center w-screen items-center ">
       <h1>Lets join a room!</h1>
       <input onChange={(e) => setRoomName(e.target.value)} value={roomName} className="w-96 border rounded-md" />
       <button onClick={joinRoom} type="button" className="p-3 text-black rounded-md bg-slate-400">Join Room</button>
      </main>
    </div>
    </>
  )
}

export default Page