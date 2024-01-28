import React, { useContext, useState } from 'react'
import "../css/home.css"
import gif from "../assets/mobile.gif"
import AuthContext from '../context/AuthContext'
import { AddDetailsForm } from '../components/AddDetailsForm'
import { ProtectedRoutes } from '../routes/ProtectedRoutes'
import { BusinessList } from '../components/BusinessList'
export const Home = () => {
const [shouldShow,setsShouldShow] =useState(false);
 
  const [showForm,setShowForm]=useState(false);

  const {handleLogout}=useContext(AuthContext)
  const name=localStorage.getItem("name").toUpperCase();
  return (
    <div>
  <div className="header-blue">
    <nav className="navbar navbar-dark navbar-expand-md navigation-clean-search">
      <div className="container">
        <p className="navbar-brand" style={{cursor:"pointer"}} onClick={()=>setsShouldShow(false)}>
          Techlife Solutions
        </p>
        <button
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navcol-1"
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navcol-1">
          <ul className="nav navbar-nav">
            <li className="nav-item" role="presentation">
              <p className="nav-link active" style={{cursor:"pointer"}} onClick={()=>setsShouldShow(true)}>
                Business List
              </p>
            </li>
           
          </ul>
          <form className="form-inline mr-auto" target="_self">
            <div className="form-group">
              
            </div>
          </form>
          <a href="/homepage" id='nameTag' >
             Hii {name}
            </a>
          <p className="btn btn-light action-button" role="button" onClick={()=>handleLogout()} style={{margin:0}}>
            Sign Out
          </p>
        </div>
      </div>
      {
        showForm ? <AddDetailsForm setShowForm={setShowForm}/> : null
      }
    </nav>


{/* body replaced with list */}

{
  shouldShow ? (
    <ProtectedRoutes element={<BusinessList/>}/>
     ):(
    <div className="container hero">
      <div className="row">
        <div className="col-12 col-lg-6 col-xl-5 offset-xl-1">
          <h1>The revolution is here.</h1>
          <p>
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, aliquid fugit. Similique quasi libero tenetur perspiciatis commodi. A eveniet ullam mollitia nemo? Tempore, sequi? Blanditiis quasi debitis iusto impedit assumenda,{" "}
          </p>
          <button className="btn btn-light btn-lg action-button" type="button" onClick={()=>setShowForm(!showForm)}>
            Add Business Details
          </button>
        </div>
        <div className="col-md-5 col-lg-5 offset-lg-1 offset-xl-0 d-none d-lg-block phone-holder">
          <div className="iphone-mockup">
            <img src={gif} className="device" alt='gif' />
            <div className="screen" />
          </div>
        </div>
      </div>
    </div>
  )
}

    


  </div>
</div>

  )
}
