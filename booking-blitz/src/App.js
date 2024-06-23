
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component, useState, useContext} from 'react';
import { Button, Fade } from 'react-bootstrap';
import Headers from './components/header';
import Buttons from './components/Buttons';
import booking from "./components/booking/booking.js";
import Faq from "./components/faq/Faq.js";
import MainBlitz from './components/menu/MainBlitz.js';
import Profile from './components/Profile/Profile.js';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Booking2 from './components/booking2/Booking2.js';
import Booking3 from './components/booking3/Booking3.js';
import Auth from './components/Auth/Auth.js';
import Reg from './components/Reg/Reg.js';
import { AuthContext } from './context/AuthContext.js';
import { useAuth } from './hooks/auth.hook.js';
import { VisibilityProvider } from './context.js';
import { useRoutes } from './routes.js';
import admin from './components/admin/admin.js';


const App = () => {
  const {login, logout, token, userID, isReady} = useAuth()
  const isLogin = !!token 
  const routes = useRoutes(isLogin)
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Загрузка...</div>;
  }
  return (
    <>

    <AuthContext.Provider value={{login, logout, token, userID, isReady, isLogin}}>

    <VisibilityProvider>
    <div class='app-wrapper-content'>
      <Headers />
      
      
    </div>
    <div className='app-wrapper, box_2'>
      <Routes>
      { routes }
      <Route path='/menu' element={<MainBlitz />} />
      <Route path="/booking" Component={booking} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/booking/black" element={<Booking2 />} />
      <Route path="/booking/arena" element={<Booking3 />} />
      <Route path="/login" element={<Reg />} />
      <Route path="/auth" element={<Auth />} />
      <Route path='/admin' Component={admin} />
     
      </Routes>
      
    </div>
    <div className='baton'>
          <Buttons />
    </div>
    <div className="App">
            {user && user.isAdmin ? (
                <admin />
            ) : (
                <div>У вас нет доступа к этой странице</div>
            )}
        </div>
    </VisibilityProvider>
    </AuthContext.Provider>
    </>
    
  );

}


const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;