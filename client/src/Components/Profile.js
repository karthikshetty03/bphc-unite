import React from "react";
import { connect } from "react-redux";
import HorizontalNav from "./HorizontalNav";
import VerticalNav from "./VerticalNav";
import "../Stylesheets/maingroup.css";
import Axios from "axios";
import GroupCard from "../Components/GroupCard.js";
import { ToastContainer, toast } from "react-toastify";

class Profile extends React.Component {
  render() {
    return (

      <div>
      <div className="box" id="nav1">
        <VerticalNav />
      </div>
      <div className="columns">
        <div className="column is-one-fifth sideNav">
          <HorizontalNav />
        </div>
      </div>
      <div id="groupbox">
        
        <div class="container2" style={{overflow:"hidden"}}>
    
      <div style={{ margin: "100px auto",}}>
        <div className="columns">
          <div className="column is-two-fifth">
            <figure style={{width:"300px"}}>
              <img
                style={{ border: "8px solid white" }}
                
                src={
                  this.props && this.props.auth ? this.props.auth.avatar : ""
                }
              />
            </figure>
          </div>
          
          <div
            className="column card3 has-background-black has-text-white "
      
            style={{fontSize:"35px", marginTop:"20px"}}
          >
            <p>{this.props && this.props.auth ? this.props.auth.name.toUpperCase() : ""}</p>
            <br />
            <div class="bar2">
                <div className="emptybar2"></div>
                <div className="filledbar2"></div>
              </div>
              <br/>
            <p>{this.props && this.props.auth ? this.props.auth.email : ""}</p>
          </div>
        </div>
      </div>
      </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Profile);
