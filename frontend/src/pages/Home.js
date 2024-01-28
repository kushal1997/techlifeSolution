import React from 'react'
import "./css/home.css"
import gif from "../assets/mobile.gif"
export const Home = () => {
  return (
    <div>
  <div className="header-blue">
    <nav className="navbar navbar-dark navbar-expand-md navigation-clean-search">
      <div className="container">
        <a className="navbar-brand" href="/homepage">
          Techlife Solutions
        </a>
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
              <a className="nav-link active" href="#">
                Business List
              </a>
            </li>
           
          </ul>
          <form className="form-inline mr-auto" target="_self">
            <div className="form-group">
              
            </div>
          </form>
         
          <a className="btn btn-light action-button" role="button" href="#">
            Sign Out
          </a>
        </div>
      </div>
    </nav>


{/* body replaced with list */}
    <div className="container hero">
      <div className="row">
        <div className="col-12 col-lg-6 col-xl-5 offset-xl-1">
          <h1>The revolution is here.</h1>
          <p>
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, aliquid fugit. Similique quasi libero tenetur perspiciatis commodi. A eveniet ullam mollitia nemo? Tempore, sequi? Blanditiis quasi debitis iusto impedit assumenda,{" "}
          </p>
          <button className="btn btn-light btn-lg action-button" type="button">
            Add Business Details
          </button>
        </div>
        <div className="col-md-5 col-lg-5 offset-lg-1 offset-xl-0 d-none d-lg-block phone-holder">
          <div className="iphone-mockup">
            <img src={gif} className="device" />
            <div className="screen" />
          </div>
        </div>
      </div>
    </div>


  </div>
</div>

  )
}
