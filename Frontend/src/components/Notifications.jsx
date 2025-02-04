import React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from 'axios';

function Notifications() {
    const [recieved, setRecieved] = useState([]);
    const [send, setSend] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [toggle, setToggle] = useState("Sent");
    const userId = localStorage.getItem('user'); 

    useEffect(()=>{
        async function fetch_data(){
            try{
            //   console.log(userId)
              const response = await axios.get(`/api/notifications/${userId}`);
              if(response.data){
                console.log(response.data);
                
                setSend(response.data[0]);
                setRecieved(response.data[1]);
                setNotifications(response.data[1])
              }
            }
            catch{
              console.log("errorvvv");
            }
          }
  
  
        fetch_data();
      
    },[]);

    const run = ()=>{
        if(toggle == "Received"){
            setNotifications([])
            setNotifications(recieved)
            setToggle("Sent")
        }
        if(toggle == "Sent"){
            setNotifications([])
            setNotifications(send)
            setToggle("Received")
        }

    }


  return (
    <div className='flex justify-center h-screen w-[90%]  mb-3 mt-0 p-4'>
        
            <div><button onClick={run} className=" bg-slate-700 px-2 py-1 text-gray-200 hover:bg-slate-600" >{toggle}</button></div>
            {notifications.length===0? 
            
            <div className='flex flex-col h-max-[90%]  w-[100%] p-3' >
           
                <div className='flex justify-evenly border-slate-500 border-b-2 py-2  mb-3 hover:border-slate-600' >
                    <div className='flex'>Empty</div>
                    {/* {console.log(notification)} */}
                    
                </div>
    </div>
            
            :

            //noti
            <div className='flex flex-col h-max-[90%]  w-[100%] p-3' >
                    { notifications.map((notification)=>(
        <div key={notification._id} className='flex justify-evenly border-slate-500 border-b-2 py-2  mb-3 hover:border-slate-600' >
            <div className='flex'>Project Name : &nbsp;<h6 className="text-slate-800" >{notification.projectname}</h6></div>
            {/* {console.log(notification)} */}
            <div className='flex'>Message :&nbsp;<h6 className="text-slate-700" >{notification.message}</h6></div>
            <div><h6 className="text-slate-900" >{notification.status}</h6></div>
            <div className="bg-slate-600 px-2 py-1 text-gray-200 hover:bg-slate-500 " ><Link to="/acceptpage" state={{ notification:notification, toggle:toggle}}>View</Link></div>
            
        </div>
    ))}
            </div>
            }
        
    </div>

  )
}

export default Notifications