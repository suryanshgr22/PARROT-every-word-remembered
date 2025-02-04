import React, { useState, useEffect, version } from 'react';
import { useLocation } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

function AcceptPage() {
    const location = useLocation();
    
    const { notification, toggle } = location.state || {};
    // console.log(notification)
    const version = notification.child;
    const msg = notification.message;

    const [editorValue, setEditorValue] = useState('');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    useEffect(()=>{
      async function fetch_data(){
        try{
          console.log("accept page: ", version, msg, toggle)
        //   console.log(project)
          const response = await axios.get(`/api/versions/${version}`);
          if(response.data){
            // console.log(response.data);  
            setEditorValue(response.data.content)
          }
        }
        catch{
          console.log("erroreee");
        }
      }
    fetch_data();
  },[])

  const profile = ()=>{

  }
  const navigate = useNavigate();
  const accept = async ()=>{
    try{
      const response = await axios.post('api/version/commit', {notification})
      if(response.data.success){
        const response1 = await axios.patch('api/version/status', {notification})
        if(response.data.success){
          console.log("Success")
          navigate('/projects');
        }else{
          console.log("Error in status update");
          
        }
      }else{
        console.log("error in commit");
        
      }
    }catch{
      console.log("error")
    }
  }


  // console.log(editorValue)

    
  return (
    <div className='flex justify-items-end'>
    <div className='flex justify-center w-[20%] h-11'>
        <div className='flex flex-col w-[100%] '>
            <div className='p-2 text-xl bg-slate-700 text-white text-center ' >{msg}</div>
            <div className='p-3' >Project : {notification.projectname}</div>
            { toggle === "Sent"? 
            <div className='flex flex-col justify-evenly w-[90%] py-3'>
                <div className='p-3'>Sent by<Link to = {`/userprofile/${notification.to}`} className='ml-6' ><HiOutlineUserCircle /></Link></div>
                {notification.status === "Pending"? 
                <div className='flex justify-around w-[100%] mt-3' >
                <div className='flex'>
                    <button onClick={accept} className='bg-emerald-300 px-2 py-1' >Accept</button>
                </div>
                {/* <div className='flex'>
                    <button className='bg-orange-300 px-2 py-1' >Reject</button>
                </div> */}
            </div>
                
                : ""}
                
            </div>
             :
                <div className='flex flex-col justify-evenly w-[90%] py-3'>
                    <div className='p-3'>Sent to<Link to = {`/userprofile/${notification.to}`} className='ml-6' ><HiOutlineUserCircle /></Link></div>
                    <div className='flex justify-center w-[100%] mt-3' >
                        {/* <div className='flex'>
                            <button className='bg-red-300 px-2 py-1' >Cancel</button>
                        </div> */}
                    </div>
                </div>
             }
        </div>
    </div>
    <div className="flex items-start justify-center h-screen max-h-full w-[75%]  bg-gray-100 p-5">
    <div className="w-full h-[95%] max-w-4xl  p-6 bg-white shadow-lg rounded-md overflow-scroll">
      <pre className="text-sm leading-relaxed text-gray-800 " dangerouslySetInnerHTML={{ __html: editorValue }}>
      </pre>
    </div>
  </div>
  </div>
  )
}

export default AcceptPage;