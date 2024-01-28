import React, { createContext, useState } from "react";
import axios from 'axios';
import {  useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AuthContext = createContext({
  setUser: () => { },
  handleLogout: () => { },
  errorHandleLogout: () => { },
})


export const AuthContextProvider = ({ children }) => {
  const navigate=useNavigate();
  // const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const BACKEND_URL = 'http://localhost:8000';
  const errorHandleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");

    navigate('/')
    toast.success("Logout Successfully !", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("name");
      toast.success("Logout Successfully !", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      navigate('/')
    } else {
      // Show a cancellation notification using toast
      toast.info('Logout cancelled. You are still logged in.', {
        onClose: () => {
          navigate("/homepage");
        },
        position: toast.POSITION.BOTTOM_RIGHT,
      });

    }
  }

  const setUser = (user) => {
    const headers = {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    };
    // const apiURL="http://localhost:8080/users/login"
    // const apiBackendURL="http://backendvideo.stepsoflearningprocess.com:8001/users/login"
    // console.log("token",token)
    // console.log("success",success);
    try {
      // axios.post(`${BACKEND_URL}/users/login`, user, { headers: headers })
      axios.post(`http://localhost:8000/api/login`, user, { headers: headers })
        .then((res) => {
          if (res.data.success === true) {
            // console.log(res.data)
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId",res.data.data._id);
            localStorage.setItem("name",res.data.data.name);
            navigate("/homepage");
          }
          else {
            alert("Wrong Credentials")
          }
        });
    } catch (err) {
      alert("Session Timeout", err);
      errorHandleLogout();
      navigate("/")
    }

  };

  return (
    <AuthContext.Provider value={{ setUser, handleLogout, errorHandleLogout }}>
      {children}
      <ToastContainer autoClose={1000} />
    </AuthContext.Provider>
  );
};

export default AuthContext;