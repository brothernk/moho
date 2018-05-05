import React, { Component } from "react";
import API from "../../utils/API";
import Gif from "../Gif/Gif";

class GiphySearch extends Component {

  state = {
      searchTerm: "",
      image_url: "",
      confirm: false
  }

  componentDidMount = () => {
      console.log("Mounted");
  }
  
  callGIPHY = () => {
      API.getGIF(this.state.searchTerm)
      .then(response => {
          console.log(response.data.data);
          this.setState({
            image_url: response.data.data.image_url
        });
      })
      .catch(err => console.log(err))
  }

  handleInputChange = event => {
      const { name, value } = event.target;
      this.setState({
          [name]: value
      });
  };

  searchTerm = event => {
    const value = event.target.value;
    this.setState({
        searchTerm: value
    });
  }

  confirmSelection = () => {
      this.setState({
          confirm: true
      });
  }

  render() {
      return (
          <div className="giphy-component"> 
              <h6>Player's Prompt</h6>
              <h4>Placeholder Prompt</h4>
              <div className="search-holder">
                <input name="giphySearchBar" onChange={this.searchTerm} type="text" />
                <div onClick={this.callGIPHY} className="search-button">
                    <i className="fas fa-search"></i>
                </div>
                <Gif src={this.state.image_url} alt="" />
                {/* <img src={this.state.image_url} alt="" className="gif-preview"/> */}
                <div className="button-holder">
                    <div className="timer-placeholder">
                        <i className="fas fa-stopwatch"></i>
                        <span className="timer">10</span>
                    </div>
                    <div className="button research" onClick={this.callGIPHY}>
                        <i className="fas fa-redo"></i>
                    </div>
                    <div className="button confirm" onClick={this.confirmSelection}>
                        <i className="fas fa-check"></i>
                    </div>
                </div>
              </div>
          </div>
      );
  }
}

export default GiphySearch;