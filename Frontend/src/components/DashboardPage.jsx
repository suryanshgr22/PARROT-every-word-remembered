// src/DashboardPage.js
import Swal from 'sweetalert2';
import axios from 'axios';
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const DashboardPage = () => {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState("");
  const [error, setError] = useState("");
  const [projectDescription, setProjectDescription] = useState("");




  const handleCreateProject = async () => {
    try{
      console.log(localStorage.getItem('user'))
      const response = await axios.post('/api/project/create', {user:localStorage.getItem('user'), projectName, projectDescription});
      console.log(response.data);
      if (!response.data.error) {
        Swal.fire({
          title: 'Success!',
          text: `Project "${projectName}" created!`,
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#3085d6',
          customClass: {
            popup: 'rounded-lg shadow-lg',
          },
        });
        setProjectName(""); // Clear the input after creation
        const projectId = response.data._id
        navigate(`/projectpage/${projectId}`);
      } else {
        setError("some error");
      }
    }catch{
      setError("not connected");
      console.log("error")
    }

  };


  return (
    <div className='h-screen' >
      <section className="bg-gray-50">
  <div className="mx-auto mt-11  max-w-screen-xl px-4 py-5 lg:flex lg:h-44 lg:items-center">
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-3xl font-extrabold sm:text-5xl">
      Version Control Simplified
        <strong className="font-extrabold text-slate-700 sm:block"> Collaborate and Create</strong>
      </h1>
    </div>
  </div>
</section>
     <div className="min-h-64 bg-gray-50 flex flex-col items-center justify-center px-4">
    
      
      <div className="w-full max-w-md bg-gray-50 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Create a New Project</h2>
        
        <div className="flex flex-col gap-4">
          {/* Input Field */}
          <input
            type="text"
            placeholder="Enter project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-slate-500 focus:border-slate-500"
          />
            <input
            type="text"
            placeholder="Enter project Description"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-slate-500 focus:border-slate-500"
          />
          
          {/* Create Button */}
          <button
            onClick={handleCreateProject}
            className="w-full bg-gray-600 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-slate-800 transition duration-300"
          >
            Create Project
          </button>
          <div className='text-red-400'>
            {error}
          </div>
        </div>
      </div>
    </div>

    </div>
  );
};

export default DashboardPage;
