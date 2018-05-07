import React, { Component } from "react";
import gif from "./beaker.gif";

class LoadingScreen extends Component {

  state = {
    userName: "",
    userScore: "",
    userJudge: "",
    judge: "",
    members: ""
  }

  componentDidMount = () => {
    this.setState({userName: this.props.userName})
    this.setState({userScore: this.props.userScore})
    this.setState({userJudge: this.props.userJudge})
    this.setState({members: this.props.members}, function() {
      this.checkJudge()
    })

  }

  checkJudge = () => {
    if (this.state.userJudge) {
      this.setState({judge: this.state.userName})
    }

    else {
      for (var i = 0; i < this.state.members.length; i ++) {

        if (this.state.members[i].judge) {
          this.setState({judge: this.state.members[i].name})
        }
      }
    }
  }


  render() {
    return (
      <div>
        <p id="judge">Judge: {this.state.judge}</p>

        <img src={gif} alt="" className="loading-gif"/>

        {this.state.members.length ? (
              <div>
                <h1 id="current-players"> Current Players </h1>
                {this.state.members.map(member => (
                  <div key={member.ip}>
                    <span className="fa-stack fa-3x" id="user-icon">
                      <i className="fas fa-circle" style={{color:member.color}}></i>
                      <strong className="fa-stack-1x" id="username">{member.name.charAt(0)}</strong>
                    </span>
                  </div>
                ))}
              </div>
          ) : (
            <h3>No current players</h3>
          )}
        
      </div>
  
    )
  }
}

export default LoadingScreen;