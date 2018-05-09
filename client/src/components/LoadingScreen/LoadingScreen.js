import React, { Component } from "react";
import gif from "./beaker.gif";

class LoadingScreen extends Component {

  state = {
    userName: "",
    userScore: "",
    userColor: "",
    userJudge: "",
    keyword: "",
    // Players logged in, Players this round
    pendingMessage: "",
    pendingPlayerHeader: "",
    judge: "",
    members: "",
    // Show keyword on first loading screen
    showKeyword: false
  }

  componentDidMount = () => {
    this.setState({userName: this.props.userName})
    this.setState({userScore: this.props.userScore})
    this.setState({userJudge: this.props.userJudge})
    this.setState({userColor: this.props.userColor})
    this.setState({keyword: this.props.keyword})
    this.setState({pendingMessage: this.props.pendingMessage}, function() {
      if ((this.state.pendingMessage) === "Waiting for game to start" || "Click start game when ready to play") {
        this.setState({showKeyword: true})
      }
    })
    this.setState({pendingPlayerHeader: this.props.pendingPlayerHeader})
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

    if (this.props.pendingMessage !== this.state.pendingMessage) {
      this.setState({pendingMessage: this.props.pendingMessage})
    }

    if (this.props.pendingPlayerHeader !== this.state.pendingPlayerHeader) {
      this.setState({pendingPlayerHeader: this.props.pendingPlayerHeader})
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
        { this.state.showKeyword ? 
          <div id = "loading-pg-roomkey"> 
          <i className="fas fa-key" id="key-icon"></i>
          <p id="random-word">{this.state.keyword}</p>
          </div>
        : null }
      
        <p className="judge">Judge: {this.props.judge}</p>
        
        <div className="pull-themes-btn">
            <span className="btn">
            { this.state.userJudge ? 
              <p className="judge-start" onClick={this.startGame}>Start Game</p>
            : null}
            </span>
        </div>
                    
        <div>
          <img src={gif} alt="" className="loading-gif"/>
          <p className="waiting-msg">{this.state.pendingMessage}</p>

          <div>
            <h1 id="current-players"> {this.state.pendingPlayerHeader} </h1>
              
              <div className="current-players-div">
                  
                  {this.state.members.length ? (
                        <div style={{display: "inline-block"}}>
                            {this.state.members.map(member => (
                              <div className="player-bubble" key={member.ip}>
                                <span className="fa-stack fa-3x" id="user-icon">
                                  <i className="fas fa-circle" style={{color:member.color}}></i>
                                  <strong className="fa-stack-1x" id="username">{member.name.charAt(0)}</strong>
                                </span>
                              </div>
                            ))}
                        </div>
                    ) : null} 
                </div>
          </div>
      </div>
    </div>
    )
  }
}

export default LoadingScreen;