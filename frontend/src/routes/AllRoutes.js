import React from 'react'
import { Route, Routes } from "react-router-dom";
import { Login } from '../pages/Login';


export const AllRoutes = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Login />}/>
    </Routes>
      
    </>
  )
}
