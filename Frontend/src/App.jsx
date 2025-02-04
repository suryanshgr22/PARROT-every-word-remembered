
import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import SignupPage from './components/SignupPage';
import Projects from './components/Projects'
import Explore from './components/Explore'
import MainPage from './components/MainPage'
import EditPage from './components/EditPage';
import ProjectPage from './components/ProjectPage';
import ContentPage from './components/ContentPage';
import UserProfile from './components/UserProfile';
import PullHandle from './components/PullHandle';
import Notifications from './components/Notifications';
import AcceptPage from './components/AcceptPage';

function App() {

  const [username, setUsername] = useState("");

 











  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? storedUser : undefined;
  });

  


  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage  user={user} setUser={setUser}  />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element=  { user !== undefined ? <MainPage user={user} setUser={setUser}  /> : <Navigate to="/login" />}   >
            <Route path="/" element={<DashboardPage />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projectpage/:projectId" element={<ProjectPage />} />
            <Route path="/editpage" element={<EditPage />} />
            <Route path="/userprofile/:userId" element={<UserProfile />} />
            <Route path="/contentpage" element={<ContentPage />} />
            <Route path="/pullhandle" element={<PullHandle />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/acceptpage" element={<AcceptPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
