import React, { Component } from "react";
import Gif from "../Gif/Gif";
import ReactSwipe from "react-swipe";

class GifReveal extends Component {
  state = {
    gifsReturned: [],
    users: [],
    judge: "",
    judgeSocket: "",
    userSocket: "",
    socket: ""
  }

  componentDidMount = () => {
    this.setState({gifsReturned: this.props.gifsReturned})
    this.setState({userSocket: this.props.userSocket})
    this.setState({socket: this.props.socket})
    this.setState({users: this.props.users}, function() {
      for (var i = 0; i < this.state.users.length; i ++ ) {
        if (this.state.users[i].judge) {
          this.setState({judgeSocket: this.state.users[i].ip})
          this.setState({judge: this.state.users[i].name})
          break
        }
  
      }
    })

    
  }

  componentDidUpdate = () => {
    if (this.props.gifsReturned !== this.state.gifsReturned) {
      this.setState({gifsReturned: this.props.gifsReturned})
    }

    if (this.props.users !== this.state.users) {
      this.setState({users: this.props.users}, function() {
        for (var i = 0; i < this.state.users.length; i ++ ) {
          if (this.state.users[i].judge) {
            this.setState({judgeSocket: this.state.users[i].ip})
            this.setState({judge: this.state.users[i].name})
            break
          }
        }
      })
    }
  }

  selectWinner = (event) => {

    if (this.state.userSocket === this.state.judgeSocket) {

      let divTarget = event.target
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
        <h6>{this.props.theme}</h6>
        <h4>{this.props.category}</h4>

        <div className="gif-reveal-div">
          {this.state.gifsReturned.map(gif => (
              <Gif onClick={this.selectWinner} src={gif.gif} user={gif.member.ip}/>
          ))}
        </div>
      </div>
    )
  }
}

export default GifReveal;
