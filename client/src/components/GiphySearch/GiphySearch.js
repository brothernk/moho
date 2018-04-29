import React, { Component } from "react";
// import axios from "axios"
import API from "../../utils/API"

class GiphySearch extends Component {

  state = {
      searchTerm: "",
      image_url: ""
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

  render() {
      return (
          <div> 
        
              {/* <EnterBtn onClick={this.callGIPHY} /> */}
              <h1>GIPHY SEARCH</h1>
              <div className="search-holder">
                <input name="giphySearchBar" onChange={this.searchTerm} type="text" />
                <div onClick={this.callGIPHY} className="search-button"></div>
                <img src={this.state.image_url} alt="" className="gif-preview"/>
              </div>

          </div>
      );
  }
}

export default GiphySearch;