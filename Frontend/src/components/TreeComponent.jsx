import React, { useEffect } from 'react';
import Tree from 'react-d3-tree';
import { useState, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const TreeComponent = ({data}) => {



  const [project, setProject] = useState({});  
  const [msg, setMsg] = useState("");
    const [clicked, setClicked] = useState(false);
    const [version, setVersion] = useState("");
    const navigate = useNavigate();
    const nodeRef = useRef(null);
    // console.log(data);


    // console.log(obj);


    

  // Custom node rendering
  const customNode = ({ nodeDatum }) => (
    <g>
      <circle r="15" fill={nodeDatum.head ? "red" :"lightblue"} onClick={handleNodeClick} ref={nodeRef} id={nodeDatum.id} key={nodeDatum.id}  name={nodeDatum.name} />
      <text fill="black" fontSize="16" x="20">
        {nodeDatum.name}
      </text>
    </g>
  );

  const view = ()=>{
    navigate('/contentpage')
  }



  const close = ()=>{
    setClicked(false);
  }


  const handleNodeClick = (event) => {
    const obj  = {
      id:data[0].p_id,
      createdBy:data[0].createdBy
    }
    setProject(obj)
    console.log(event.target.getAttribute('name'))
    console.log(event.target.id)
    console.log("clicked")
    console.log(nodeRef)
    console.log(data);
    
    setVersion(event.target.id)
    setClicked(true);
    setMsg(event.target.getAttribute('name'))
  };


  const memoizedData = React.useMemo(() => data, [data]);
  return (
    
    <div className='h-screen' >
      {nodeRef!==null && clicked ?
            <div className='flex ml-2 mt-3 py-2 w-80 h-12 justify-evenly border-2 border-slate-300 fixed'>
            
              <div className='flex' ><Link to="/editpage"
              state={{ version:version, project:project }}>Create New Version</Link></div>
          
              <div className='flex' ><Link to="/contentpage"
              state={{ version:version, project:project, msg:msg }}>View</Link></div>
              <div className='flex  text-center' ><button className='text-gray-600 hover:text-red-700' onClick={close}  >x</button></div>
          </div>
      :""}

      <Tree
        data={memoizedData}
        renderCustomNodeElement={customNode}
        zoom={1.0}
        orientation={"vertical"}
        nodeSize={{ x: 200, y: 100 }}
        translate={{ x: 600, y: 50 }}
        // pathFunc={"step"} 
        height = {"100vh"}
      />
    </div>
    
  );
};

export default TreeComponent;
