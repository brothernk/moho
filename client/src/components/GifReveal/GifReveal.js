import React, { Component } from "react";
import Gif from "../Gif/Gif";
import ReactSwipe from "react-swipe";

class GifReveal extends Component {
  state = {
    gifsReturned: []
  }

  componentDidMount = () => {
    console.log("Mounted")
    console.log(this.props.gifsReturned)
    this.setState({gifsReturned: this.props.gifsReturned})
  }

  componentDidUpdate = () => {
    if (this.props.gifsReturned !== this.state.gifsReturned) {
      this.setState({gifsReturned: this.props.gifsReturned})
    }
  }

  selectWinner = () => {
    // if (user === judge) {
    //   "slected"
    // }
    // else {
    //   "too bad"
    // }
  }

  render() {
    return(
      <div className="gif-reveal-component">
        <h6>{this.props.theme}</h6>
        <h4>{this.props.category}</h4>

        <ReactSwipe key={this.state.gifsReturned.length} className="carousel" swipeOptions={{continous: false}}>
          {this.state.gifsReturned.map(gif => (
            <div>
              <img onClick={this.selectWinner} src={gif.gif} data-user={gif.member.ip}/>
            </div>
          ))
          }
        </ReactSwipe>
        

      </div>
    )
  }
}

export default GifReveal;
