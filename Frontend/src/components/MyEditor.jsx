import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const MyEditor = ({version, project}) => {
  
  // const [prevValue, setPrevValue] = useState(''); 
  const [editorValue, setEditorValue] = useState(''); 
  const [error, setError] = useState(''); 
  const [versionName, setVersionName] = useState('');
  const navigate = useNavigate();
  useEffect(()=>{
    async function fetch_data(){
      try{
        console.log("edit page: ", version)
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





  const type = (e)=>{
    setVersionName(e.target.value)
  }

  const handleChange = (value) => {
    setEditorValue(value); 
  };

  const save = async()=>{
    if(versionName.length===0){
      setError("Please Enter a valid Version name!")
    }
    // console.log(editorValue)
    try {
      const user_id = localStorage.getItem('user');
      console.log(version, "p", project.id,"ev", editorValue,"vn", versionName,"uid", user_id)
      
      const response = await axios.post('api/version/create', { version:version, pid:project.id, content:editorValue, message:versionName, author:user_id});
      if (response.data) {
        console.log(response.data);
        if(response.data.done){
          navigate('/notifications');
        }else{
          navigate(`/projectpage/${project.id}`);
        }
      }
       
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  }

  return (
    <div className='flex flex-col space-y-4'>
      <div className='flex' >
      <ReactQuill
        value={editorValue}
        onChange={handleChange}
        modules={{
          toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],        // Font styles and headers
            [{ 'size': ['small', false, 'large', 'huge'] }],                // Font sizes
            [{ 'color': [] }, { 'background': [] }],                        // Text color and background color
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],                   // Lists
            [{ 'align': [] }],                                              // Alignment options
            ['bold', 'italic', 'underline', 'strike'],                      // Basic text styles
            ['blockquote', 'code-block'],                                   // Blockquote and code block
            ['link', 'image', 'video']                                      // Links, images, videos
          ],
        }}
        style={{
          height: '400px',
          
          marginBottom: '16px',
        }}
      />
      </div>
      
      <div className='flex py-5 justify-evenly' >
        <div className='flex h-8 '><input type="text" placeholder='Enter your Version name' onChange={type}  value={versionName} /></div>
        <div className='flex h-12' ><button onClick={save}  class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Save</button></div>
        <div className='flex text-red-500 w-40' >
          {error}
      </div>
        {/* <div dangerouslySetInnerHTML={{ __html: editorValue }}></div>       Render HTML */}
      </div>

      
    </div>
  );
};

export default MyEditor;
