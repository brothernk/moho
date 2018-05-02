import React, { Component } from "react";
// import axios from "axios"
import API from "../../utils/API"

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
          <div className="promptSelect-component"> 
              <h4>Select a Theme</h4>
              {/* Will need to use a map function to pull out the categories and assign the proper fa icon. Will also need to assign a random color */}
              <div className="prompt-card">
              <h5><i className="fas fa-exclamation-triangle"></i>Natural Disasters</h5>
              </div>
          </div>
    );
  }
}

export default GiphySearch;