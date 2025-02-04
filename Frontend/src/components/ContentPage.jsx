import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';

function ContentPage() {
    const location = useLocation();
    const { version, project, msg } = location.state || {};
    const [editorValue, setEditorValue] = useState('');

    useEffect(()=>{
      async function fetch_data(){
        try{
          // console.log("edit page: ", version)
          console.log(project)
          const response = await axios.get(`/api/versions/${version}`);
          if(response.data){
            console.log(response.data);  
            setEditorValue(response.data.content)
          }
        }
        catch{
          console.log("erroreee");
        }
      }
    fetch_data();
  },[])

    const textContent = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Suspendisse vehicula convallis sapien, a facilisis justo consequat et. 
Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
Cras nec libero hendrerit, viverra lectus nec, consectetur nisl. 
Sed fringilla tortor vitae mauris aliquet varius. 
Aenean ac orci nec erat varius faucibus nec ut turpis.
...<strong>hello</strong>
(More content here)
`;
  return (
    <div className='flex justify-items-end'>
    <div className='w-[20%] h-11 bg-slate-500'>
        <h1 className='p-2 text-xl text-white' >{msg}</h1>
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

export default ContentPage