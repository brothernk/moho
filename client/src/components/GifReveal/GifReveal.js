import React, { Component } from "react";
import Gif from "../Gif/Gif";
import ReactSwipe from "react-swipe";

class GifReveal extends Component {

  componentDidMount = () => {
    console.log("Mounted")
  }

  render() {
    return(
      <div className="gif-reveal-component">
        <h6>{this.props.theme}</h6>
        <h4>{this.props.category}</h4>

        <ReactSwipe className="carousel" swipeOptions={{continous: false}}>
          {this.props.gifsReturned.map(gif => (
            <Gif onClick={this.props.onClick} src={this.props.url} alt={this.props.alt} data-user={this.props.ip}/>
          ))
          
          }
        </ReactSwipe>
        

      </div>
    )
  }
}

export default GifReveal;
