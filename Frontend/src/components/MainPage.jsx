import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from "react-router-dom";
function MainPage({user, setUser}) {
  return (
    <>

    <Navbar user={user} setUser={setUser} />
    <div className='h-screen pt-16 pb-20' >
    <Outlet />
    </div>
    <Footer/>
    </>

  )
}

export default MainPage