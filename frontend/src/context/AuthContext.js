import React, { createContext } from "react";
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
const BACKEND_URL= process.env.REACT_APP_BACKEND_URL;

  const navigate=useNavigate();
  const errorHandleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");

    navigate('/')
    toast.success("Logout Successfully !");
  }
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("name");
      toast.success("Logout Successfully !");
      navigate('/')
    } else {
      // Show a cancellation notification using toast
      toast.info('Logout cancelled. You are still logged in.', {
        onClose: () => {
          navigate("/homepage");
        }
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
    let loadingToast;
    try {
      loadingToast = toast.loading("Login in progress...");
      // axios.post(`${BACKEND_URL}/users/login`, user, { headers: headers })
      axios.post(`${BACKEND_URL}/api/login`, user, { headers: headers })
        .then((res) => {
          if (res.data.success === true) {
            // console.log(res.data)
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId",res.data.data._id);
            localStorage.setItem("name",res.data.data.name);
            navigate("/homepage");
            toast.success("Login Successfully !");
          }
          else {
            alert("Wrong Credentials")
          }
        });
    } catch (err) {
      alert("Session Timeout", err);
      errorHandleLogout();
      navigate("/")
    } finally {
      // Close the loading state
      if (loadingToast) {
          toast.dismiss(loadingToast);
      }
  }

  };

  return (
    <AuthContext.Provider value={{ setUser, handleLogout, errorHandleLogout }}>
      {children}
      <ToastContainer autoClose={2000} />
    </AuthContext.Provider>
  );
};

export default AuthContext;