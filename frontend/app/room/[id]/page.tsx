"use client"
import { useEffect, useRef, useState } from 'react';
import useSocket from '../../../hooks/useSocket';
import {useRouter, useSearchParams } from 'next/navigation';
import handleRoomCreated from '@/utils/handleRoomCreated';
import handleRoomJoined from '@/utils/handleRoomJoined';
import initiateCall from '@/utils/initiateCall';
import onPeerLeave from '@/utils/onPeerLeave';
import handleReceivedOffer from '@/utils/handleReceivedOffer';
import handleAnswer from '@/utils/handleAnswer';
import handlerNewIceCandidateMsg from '@/utils/handlerNewIceCandidateMsg';
import leaveRoom from '@/utils/leaveRoom';
import createPeerConnection from '@/utils/createPeerConnection';
import handleICECandidateEvent from '@/utils/handleIceCandidateEvent';
import handleTrackEvent from '@/utils/handleTrackEvent';
import toggleMic from '@/utils/toggleMic';
import toggleCamera from '@/utils/toggleCamera';
import handleScreenShare from '@/utils/handleScreenShare';
import stopAudioRecording from '@/utils/stopAudioRecording';
import endMeeting from '@/utils/endMeeting';


const Room = () => {
  const [micActive, setMicActive] = useState(true);
  const [cameraActive, setCameraActive] = useState(true);
  const url: string = process.env.NEXT_PUBLIC_SIGNALING_SERVER_URL as string
  const socket = useSocket(url);
  const router=useRouter();
  const param = useSearchParams();
  const mediaRecorder=useRef<MediaRecorder|null>(null);
  const audioChunks=useRef<Blob[]|null>(null);
  const audioBlob=useRef<Blob|null>(null);
  const userVideoRef = useRef<HTMLVideoElement | null>(null);
  const peerVideoRef = useRef<HTMLVideoElement | null>(null);
  const screenShareRef = useRef<HTMLVideoElement>(null);
  const rtcConnectionRef = useRef<RTCPeerConnection | null>(null);
  const userStreamRef = useRef<MediaStream | null>(null);
  const hostRef = useRef<boolean>(false);
  const roomNameParam:string|null=param.get('roomName');
  const roomName:string=roomNameParam?roomNameParam:"";
  const [summary,setSummary]:[string|null,(summary:string|null)=>void]=useState<string|null>(null);

  useEffect(() => {
    if (socket != null) {
      socket.emit('join', roomName);
      socket.on("created", () => handleRoomCreated(hostRef,userStreamRef, userVideoRef,mediaRecorder,audioChunks,audioBlob,summary,setSummary)); //handling new room creation
      socket.on("joined", () => handleRoomJoined(userStreamRef, userVideoRef, socket, roomName,mediaRecorder,audioChunks,audioBlob,summary,setSummary)); //handling joining of a room already created
      socket.on("ready", () => initiateCall(hostRef, rtcConnectionRef, userStreamRef, socket, roomName, () =>
        createPeerConnection(
          (event) => handleICECandidateEvent(event, socket, roomName),
          (event) => handleTrackEvent(event, peerVideoRef)
        )
      )); // handling initialisation of call
      socket.on("leave", () => onPeerLeave(hostRef, peerVideoRef, rtcConnectionRef)); //handling a user leaving the call
      socket.on("offer", (offer) => handleReceivedOffer(offer, hostRef, rtcConnectionRef, userStreamRef, socket, roomName, () =>
        createPeerConnection(
          (event) => handleICECandidateEvent(event, socket, roomName),
          (event) => handleTrackEvent(event, peerVideoRef)
        )
      )); // handling offer receival
      socket.on('answer', (answer)=>handleAnswer(answer,rtcConnectionRef)); //handling answering of offer recieved
      socket.on('ice-candidate', (incoming) => handlerNewIceCandidateMsg(incoming, rtcConnectionRef)); //handling new ice candidate message

      return () => {
        socket.disconnect();
      };
    } else {
      console.log("Failed to fetch Socket");
    }
  }, [roomName, socket, summary]);

  
  

  return (
    <div>
      {summary ? <>
        <div className='flex flex-col p-10 '>
          <h3 className='font-bold text-3xl mb-4'>Meeting Summary:</h3>
          <p className='text-lg'>{summary}</p>
          <button className=' mt-4 bg-red-400 text-black rounded-lg p-3 w-40' onClick={() => {router.push("/dashboard")}}>Go to Dashboard</button>
        </div>
      </> : <>
      <div className='flex gap-5 flex-wrap m-4'>
      <video autoPlay ref={screenShareRef} style={{ display: 'none' }} />

      <video autoPlay ref={userVideoRef} />
      <video autoPlay ref={peerVideoRef} />
      </div>
      <button className='mx-4  bg-red-400 text-black rounded-lg p-3' onClick={() => toggleMic(micActive, setMicActive, userStreamRef)} type="button">
        {micActive ? 'Mute Mic' : 'UnMute Mic'}
      </button>
      <button className='mx-4  bg-red-400 text-black rounded-lg p-3' onClick={()=>endMeeting(mediaRecorder,audioBlob,roomName, userVideoRef, peerVideoRef, rtcConnectionRef, socket)} type="button">
        Leave
      </button>
      <button className='mx-4 bg-red-400 text-black rounded-lg p-3' onClick={() => toggleCamera(cameraActive, setCameraActive, userStreamRef)} type="button">
        {cameraActive ? 'Stop Camera' : 'Start Camera'}
      </button>
      <button className='mx-4 bg-red-400 text-black rounded-lg p-3' onClick={() => handleScreenShare(rtcConnectionRef, userStreamRef, socket, roomName, screenShareRef)} type="button">
        Share Screen
      </button>
      </>}
      
      
    </div>
  );
}
export default Room;