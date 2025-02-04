import React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from 'axios';
export default function Projects() {

  const [projects, setProjects] = useState([]);

  useEffect(()=>{
      async function fetch_data(){
          try{
            const userId = localStorage.getItem('user'); 
            console.log(userId)
            const response = await axios.get(`/api/projects/${userId}`);
            if(response.data){
              console.log(response.data);
              
              setProjects(response.data);
            }
          }
          catch{
            console.log("errorvvv");
          }
        }


      fetch_data();
    
  },[]);





  return (
    <div className="bg-white h-screen py-2 sm:py-3">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-pretty text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">Projects</h2>
          
        </div>
        <div className="mx-auto mt-3 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-3 pt-3 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {projects.map((project) => (
            <article key={project._id} className="flex max-w-xl flex-col py-2 items-start justify-between border-b-2 border-slate-300 hover:border-slate-500">
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={project.createdAt} className="text-gray-500">
                  {project.createdAt.split('T')[0]}
                </time>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                  <Link to = {`/projectpage/${project._id}`} >
                    <span className="absolute inset-0" />
                    {project.name}
                  </Link>
                </h3>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <div className="text-sm/6">
                  <p className="font-semibold text-gray-900">
                      <span className="absolute inset-0" />
                      {project.description}
                  </p>
                 </div>
              </div>
              
               

            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
