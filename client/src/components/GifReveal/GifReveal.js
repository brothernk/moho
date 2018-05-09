import React, { Component } from "react";
import Gif from "../Gif/Gif";

class GifReveal extends Component {
  state = {
    gif_array: [],
  }

  componentDidMount = () => {
    console.log("Mounted")
  }

  render() {
    return(
      <div className="gif-reveal-component">
        <h6>{this.props.theme}</h6>
        <h4>{this.props.category}</h4>
          
        <Slider images={gif_array} isInfinite delay={5000}>
          {gif_array.map((url, user) => <div key={key}><img src={url} /></div>)}
        </Slider>
      </div>
    )
  }
}