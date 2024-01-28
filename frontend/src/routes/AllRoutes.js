import React from 'react'
import { Route, Routes } from "react-router-dom";
import { Login } from '../pages/Login';
import { Home } from '../pages/Home';
import { ProtectedRoutes } from './ProtectedRoutes';
import { Footer } from '../layouts/Footer';
import { Header } from '../layouts/Header';


export const AllRoutes = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/homepage" element={ 
        <>
          <ProtectedRoutes element={<Home/>}/>
        </>
      
       }/>
    </Routes>
      
    </>
  )
}
