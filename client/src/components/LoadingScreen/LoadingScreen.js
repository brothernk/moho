import React, { Component } from "react";
import API from "../../utils/API";
import gif from "./beaker.gif";

class LoadingScreen extends Component {

  state = {
    members: "",
    url: ""
  }

  componentDidMount = () => {
    this.setState({url: this.props.url}, function(){ 
      this.checkURL()
    })
  }

  checkURL = () => {
    API.checkSessionUrl(this.state.url)
    .then(res => { 
      let sessionMembers = res.data[0].members
      this.setState({members: sessionMembers}, function() {
        console.log(this.state.members)
      })
    })
  }


  render() {
    return (
      <div>
        <p id="judge">Judge: {this.props.judge}</p>

        <img src={gif} alt="" className="loading-gif"/>

        {this.state.members.length ? (
              <div>
                <h1 id="current-players"> Current Players </h1>
                <div className="current-players-div">
                  {this.state.members.map(member => (
                    <div key={member.ip}>
                      <span className="fa-stack fa-3x" id="user-icon">
                        <i className="fas fa-circle" style={{color:member.color}}></i>
                        <strong className="fa-stack-1x" id="username">{member.name.charAt(0)}</strong>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
          ) : (
            <h3>No current players</h3>
          )}
        
      </div>
  
    )
  }
}

export default LoadingScreen;