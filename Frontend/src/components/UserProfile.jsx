import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"
const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const { userId } = useParams();
  
  useEffect(()=>{
    async function fetch_data(){
      try{
        console.log(userId);
        
        const response = await axios.get(`/api/user/${userId}`);
        if(response.data){
          console.log(response.data);  
          setUserData(response.data)
        }
      }
      catch{
        console.log("erroreeeuser");
      }
    }
  fetch_data();
},[])
  



  return (
    <div className='flex h-screen justify-center py-10' >
    <div className="bg-white overflow-hidden shadow rounded-lg border h-84">
      <div className="px-4 py-3 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          User Profile
        </h3>

      </div>
      <div className="border-t border-gray-200 px-4 py-3 sm:p-0 w-[90%]">
        <dl className="sm:divide-y sm:divide-gray-200">

          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Username</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
             {userData.username ?userData.username :"" }
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Email address</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {userData.email ? userData.email :"" }
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 w-[100%]">
            <dt className="text-sm font-medium text-gray-500">Projects</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {userData.projects ?
              <div className='h-[90%] justify-center  w-[100%]'>
                
                {userData.projects.length !==0?
                  <div className='flex flex-col overflow-y-scroll border-2 h-[100%] w-[100%]' >
                    {userData.projects.map((project)=>(
                      <div className='flex text-lg text-slate-700 w-[100%] hover:text-slate-800 '>
                    <Link to = {`/projectpage/${project._id}`} >
                    {project.name}
                  </Link>
                      </div>
                    ))}
                  </div>
                
                
                
                :""}
              </div>
              
              
              
              
              :"" }
              
            </dd>
          </div>

        </dl>
      </div>
    </div>
    </div>
  );
};

export default UserProfile;
