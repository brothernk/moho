import React, { Component } from "react";
// import axios from "axios"
import API from "../../utils/API";
import BottomNav from "../../components/BottomNav/bottomNav";
import GiphySearch from "../../components/GiphySearch/GiphySearch";
import Profile from "../../components/Profile";
import PromptSelect from "../../components/PromptSelect/PromptSelect";

class Home extends Component {

    state = {
        urlString: ""
    }

    componentDidMount = () => {
        this.setUrl()
    }

    setUrl = () => {
        let currenturl = window.location.href;
        let spliturl = currenturl.split("/");
        let newurl = ""
        
        for (var i = 4; i < spliturl.length; i ++ ) {
            newurl += "/" + spliturl[i]
        }

        this.setState({urlString: newurl}, function() {
            this.checkURL()
        })

    }
    
    callGIPHY = () => {
        API.getGIF(this.state.searchTerm)
        .then(response => {
            console.log(response.data.data);
        })
        .catch(err => console.log(err))
    }

    checkURL = () => {
        API.checkSessionUrl(this.state.urlString)
        .then(res =>{ 
            if (res.data.length < 1) {
                console.log("Not found")
                window.location.href = "/notfound"
                return false
            }

            else {
                console.log("You entered a valid session!")
            }
        })
        .catch(err => console.log(err.response));
    };


    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    render() {
        return (
            <div> 
          
                {/* <EnterBtn onClick={this.callGIPHY} /> */}

                <Profile />
                <GiphySearch />

                <PromptSelect />

                <BottomNav />

            </div>
        );
    }
}

export default Home;