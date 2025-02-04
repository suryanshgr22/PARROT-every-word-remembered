import React from 'react'
import ContentPage from './ContentPage'
import { Link } from 'react-router-dom';
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



function PullHandle() {
  return (
    <div className='flex justify-around'>
    <div className='w-[80%] h-11 flex flex-col '>
        <div className='p-2 text-xl text-white w-[100%] h-11 bg-slate-500' >Version 1.2</div>
        <div className='w-[100%] h-11 mt-6 text-center text-slate-800 text-xl'>For Project : <Link className='text-slate-950 underline' >Project 1</Link></div>
        <div className='w-[100%] h-11 mt-2 text-center text-slate-700'>Request from : <Link className='text-slate-900 underline' >Manas07</Link></div>
        <div className='w-[100%] h-11 mt-4 text-center text-slate-700 flex justify-evenly '>
          <div><button className='hover:bg-red-300  py-1 px-2 '>Reject</button></div>
          <div><button className='hover:bg-emerald-300 py-1 px-2 '>Accept</button></div>
        </div>
    </div>
    <div className="flex items-start justify-center h-screen max-h-full  bg-gray-100 p-5">
    <div className="w-full h-[95%] max-w-4xl  p-6 bg-white shadow-lg rounded-md overflow-scroll">
      <pre className="text-sm leading-relaxed text-gray-800 " dangerouslySetInnerHTML={{ __html: textContent }}>
        
      </pre>
    </div>
  </div>
  </div>
  )
}

export default PullHandle