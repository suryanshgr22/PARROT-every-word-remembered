import React, { useState } from "react";
import MyEditor from './MyEditor'

import { useLocation } from "react-router-dom";

function EditPage() {
    const [show, setShow] = useState(false)
    // const {version} = useParams();
    const location = useLocation();
    const { version, project } = location.state || {};
    // console.log("verion ",version);
    // console.log(project);
    
    const toggle = ()=>{
        setShow(!show)
    }






  return (
    <>
    <div className="p-3" >
    <div className="text-xl" >New Verion</div>
    {/* <div className="flex py-2" ><button onClick={toggle} className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded" >{show ? "Hide":"Show"}</button> </div> */}
    <div className={show?"flex justify-between":"flex justify-center"}>
        {show?         <div className="flex flex-col p-2" >
           <div className="px-4">
                <ul>
                    <li>Version 0
                        <ul>
                        <li>Version 0.1</li>
                        <li>Version 0.2</li>
                        </ul>
                    </li>
                    <li>Version 1
                        <ul>
                        <li>Version 1.1
                            <ul>
                            <li>Version 1.1.1</li>
                            <li>Version 1.1.2</li>
                            </ul>
                        </li>
                        <li>Version 1.2</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>:""}




        <div className="flex" >
        <MyEditor version={version} project={project} />
        </div>
    </div>
    </div>
    </>
  );
}

export default EditPage;
