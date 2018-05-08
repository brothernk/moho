import React, { Component } from "react";
import gif from "./beaker.gif";

class LoadingScreen extends Component {

  state = {
    userName: "",
    userScore: "",
    userColor: "",
    userJudge: "",
    pendingMessage: "",
    judge: "",
    members: ""
  }

  componentDidMount = () => {
    this.setState({userName: this.props.userName})
    this.setState({userScore: this.props.userScore})
    this.setState({userJudge: this.props.userJudge})
    this.setState({userColor: this.props.userColor})
    this.setState({pendingMessage: this.props.message})
    this.setState({members: this.props.members}, function() {
      this.checkJudge()
    })
  }

  componentDidUpdate = () => {
    if (this.props.members !== this.state.members) {
      this.setState({members: this.props.members}, function() {
        this.checkJudge()
      })
    }

    if (this.props.message !== this.state.pendingMessage) {
      this.setState({pendingMessage: this.props.message})
    }
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


  startGame = () => {
    console.log('start game button clicked')
    const self = this
    self.props.socket.emit('startgame')

  }


  render() {
    return (

      <div className="loading-screen-holder">
        {/* style={{color:props.userColor}} */}
      
        <p className="judge">Judge: {this.props.judge}</p>

        <div className="pull-themes-btn">
            <span className="btn">
            { this.state.userJudge ? 
              < p className="judge-start" onClick={this.startGame}>Start</p>
            : null}
            </span>
        </div>
                    
        <p>{this.state.pendingMessage}</p>

        <div>
          <img src={gif} alt="" className="loading-gif"/>
          {this.state.members.length ? (
                <div>
                  <h1 id="current-players"> Current Players </h1>
                  <div className="current-players-div">
                    <div className="player-bubble" key={this.state.userName}>
                      <span className="fa-stack fa-3x" id="user-icon">
                        <i className="fas fa-circle" style={{color: this.state.userColor}}></i>
                        <strong className="fa-stack-1x" id="username">{this.state.userName.charAt(0)}</strong>
                      </span>
                    </div>
                    {this.state.members.map(member => (
                      <div className="player-bubble" key={member.ip}>
                        <span className="fa-stack fa-3x" id="user-icon">
                          <i className="fas fa-circle" style={{color:member.color}}></i>
                          <strong className="fa-stack-1x" id="username">{member.name.charAt(0)}</strong>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
            ) : (
              <h3 id="no-players">No current players</h3>
            )}
        </div>
      </div>
    )
  }
}

export default LoadingScreen;