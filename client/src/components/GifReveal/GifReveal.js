import React, { Component } from "react";
import Gif from "../Gif/Gif";

class GifReveal extends Component {
  state = {
    gifsReturned: [],
    gifsReturnedShuffle: [],
    users: [],
    judge: "",
    judgeSocket: "",
    userSocket: "",
    socket: "",
    showJudgeInstructions: false
  }

  componentDidMount = () => {

    const shuffleArray = arr => arr.sort(() => Math.random() - 0.5)

    this.setState({gifsReturned: this.props.gifsReturned})
    this.setState({gifsReturnedShuffle: shuffleArray(this.props.gifsReturned)})
    this.setState({userSocket: this.props.userSocket})
    this.setState({socket: this.props.socket})
    this.setState({users: this.props.users}, function() {
      for (var i = 0; i < this.state.users.length; i ++ ) {
        if (this.state.users[i].judge) {
          this.setState({judgeSocket: this.state.users[i].ip}, function() {
            if (this.state.userSocket === this.state.judgeSocket) {
              this.setState({showJudgeInstructions: true})
            }
          })
          this.setState({judge: this.state.users[i].name})
          break
        }
      }
    }) 
  }

  componentDidUpdate = () => {

    const shuffleArray = arr => arr.sort(() => Math.random() - 0.5)

    if (this.props.gifsReturned !== this.state.gifsReturned) {
      this.setState({gifsReturned: this.props.gifsReturned})
      this.setState({gifsReturnedShuffle: shuffleArray(this.props.gifsReturned)})
    }

    if (this.props.users !== this.state.users) {
      this.setState({users: this.props.users}, function() {
        for (var i = 0; i < this.state.users.length; i ++ ) {
          if (this.state.users[i].judge) {
            this.setState({judgeSocket: this.state.users[i].ip}, function(){
              if (this.state.userSocket === this.state.judgeSocket) {
                this.setState({showJudgeInstructions: true})
              }
            })
            this.setState({judge: this.state.users[i].name})
            break
          }
        }
      })
    }
  }

  selectWinner = (event) => {

    if (this.state.userSocket === this.state.judgeSocket) {

      let ip = event.target.getAttribute('data')
      let gifurl = event.target.getAttribute('src')
      let winner = {
        gif: gifurl
      }

      for (var i = 0; i < this.state.users.length; i ++ ) {

        if (this.state.users[i].ip === ip) {
          winner['member'] = this.state.users[i]
          break
        }
      }

      const self = this
      self.state.socket.emit('winnersocket', winner)

    }
  }

  render() {
    return(
      <div className="gif-reveal-component">

        { this.state.showJudgeInstructions ? 
          <h1 className="pick-winner-instruction">Pick a winner!</h1>
        : null}

        <div className="theme-and-category" id="gif-reveal-prompt"> 
            <p className="theme-prompt">{this.props.theme}</p>
            <p className="category-prompt">{this.props.category}</p>
        </div>

        <div className="gif-reveal-div">
          {this.state.gifsReturnedShuffle.map(gif => (
              <Gif onClick={this.selectWinner} src={gif.gif} user={gif.member.ip}/>
          ))}
        </div>
      </div>
    )
  }
}

export default GifReveal;