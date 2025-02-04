import React from 'react'
import TreeComponent from './TreeComponent';
import { useParams } from 'react-router-dom';
import treedata from './logic/tree';
import { useState, useEffect } from 'react';
import axios from 'axios';

function ProjectPage() {
  const [projectData, setProjectData] = useState([]);
  const { projectId } = useParams();

  useEffect(()=>{
    console.log(projectData[0])
  },[projectData])

  useEffect(()=>{
    async function fetch_data(){
      try{
        console.log(projectId)
        const response = await axios.get(`/api/project/${projectId}`);
        if(response.data){
          console.log(response.data);
          
          setProjectData(response.data);
          
        }
      }
      catch{
        console.log("errorccc");
      }
    }
  fetch_data();
},[])
  

  console.log(projectId)
 

  return (
    <>
    <div className='border-b-2 border-slate-400 w-full  px-2 py-1' >
        {/* {projectData[0].name}:  {projectData[0].description}
         */}
         {projectData.length===0?"Project":
          
            <div className='flex justify-start'>
              <div className='text-xl font-bold text-slate-900 mr-4' >{projectData[0].name}</div>
              <div className='text-xl text-slate-600 ' >{projectData[0].description}</div>
            </div>
          
         }
    </div>
    {projectData.length===0?"":
              <div>
              <TreeComponent
                data={projectData}
                
              />
            </div>
         }

  {/* <Graph/> */}
  </>
  )
}

export default ProjectPage