import React, { Component } from "react";

class LoadingScreen extends Component {

  state = {
    userName: "",
    userScore: "",
    userColor: "",
    userJudge: "",
    // Players logged in, Players this round
    pendingMessage: "",
    pendingPlayerHeader: "",
    judge: "",
    members: "",
    // Show keyword on first loading screen
    showKeyword: false,
    // Show theme and category on all other loading screens
    showTheme: false,
    category: "",
    theme: "",
    // Show judge start button or judge reveal button
    showChoices: false
  }

  componentDidMount = () => {
    this.setState({userName: this.props.userName})
    this.setState({userScore: this.props.userScore})
    this.setState({userJudge: this.props.userJudge})
    this.setState({userColor: this.props.userColor})
    this.setState({showChoices: this.props.showChoices})
    
    if (this.props.theme && this.props.category) {
      this.setState({category: this.props.category})
      this.setState({theme: this.props.theme})
    }

    this.setState({pendingMessage: this.props.pendingMessage}, function() {
      this.checkMessage()
    })
    this.setState({pendingPlayerHeader: this.props.pendingPlayerHeader})
    this.setState({members: this.props.members}, function() {
      this.checkJudge()
    })
  }

  componentDidUpdate = () => {
    if (this.props.members !== this.state.members) {
      this.setState({members: this.props.members}, function() {
        console.log("NEWLOADINGMEMBERS")
        console.log(this.state.members)
        this.checkJudge()
      })
    }

    if (this.props.pendingMessage !== this.state.pendingMessage) {
      this.setState({pendingMessage: this.props.pendingMessage}, function() {
        this.checkMessage()
      })
    }

    if (this.props.pendingPlayerHeader !== this.state.pendingPlayerHeader) {
      this.setState({pendingPlayerHeader: this.props.pendingPlayerHeader})
    }

    if (this.props.theme !== this.state.theme) {
      this.setState({theme: this.props.theme})
    }

    if (this.props.category !== this.state.category) {
      this.setState({category: this.props.category})
    }

    if (this.props.showChoices !== this.state.showChoices) {
      this.setState({showChoices: this.props.showChoices})
    }
  }

  checkMessage = () => {
    console.log("CHECK MESSAGE LOADING SCREEN")

    console.log(this.state.pendingMessage)

    if (this.state.pendingMessage === "Players choosing gifs") {
      this.setState({showKeyword: false})
      this.setState({showTheme: true})
    }

    else if (this.state.pendingMessage === "Waiting for game to start" || this.state.pendingMessage === "Click start game when ready to play") {
      this.setState({showKeyword: true})
      this.setState({showTheme: false})
    }

    else if (this.state.pendingPlayerHeader === "Players in round") {
      this.setState({showKeyword: false})
      this.setState({showTheme: false})
    }
  }

  checkJudge = () => {
      for (var i = 0; i < this.state.members.length; i ++) {
        if (this.state.members[i].judge) {
          this.setState({judge: this.state.members[i].name})
        }
      }
  }

  startGame = () => {
    console.log('start game button clicked')
    const self = this
    self.props.socket.emit('startgame')
  }
  
  showGifs = () => {
    console.log('show gifs button clicked')
    const self = this
    self.props.socket.emit('revealgifs')
  }

  render() {
    return (

      <div className="loading-screen-holder">
        { this.state.showKeyword ? 

          <div>
            <div id="loading-pg-roomkey"> 
              <p><i className="fas fa-key"></i> {this.props.keyword}</p>
            </div>

            <div className="pull-themes-btn">
              <span className="btn">
              { this.state.userJudge ? 
                <p className="judge-start" onClick={this.startGame}>Start</p>
              : null}
              </span>
            </div>
          </div>

        : null }

        { this.state.showTheme ? 
          <div id = "theme-prompt"> 
            <p id="theme-prompt-theme">{this.state.theme}</p>
            <p>{this.state.category}</p>
          </div>
        : null }

        { this.state.userJudge ? 
          <div>
            { this.state.showChoices ? 
              <p className="show-gifs-btn" onClick={this.showGifs}>Show Gifs</p>
            : null}
          </div>
        : null}

        <p className="judge"><i className="fas fa-gavel"></i> {this.props.judge}</p>
      
        <div>
          <img src="https://media.giphy.com/media/3op2XKLw67aLrvKikC/giphy.gif" alt="" className="loading-gif"/>
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