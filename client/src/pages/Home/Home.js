import React, { Component } from "react";
import API from "../../utils/API";
import BottomNav from "../../components/BottomNav/bottomNav";
import GiphySearch from "../../components/GiphySearch/GiphySearch";
import Profile from "../../components/Profile";
import PromptSelect from "../../components/PromptSelect/PromptSelect";
import { lookup } from "ipdata"


class Home extends Component {

    state = {
        urlString: "",
        ipAddress: "",
        showProfile: false,
        showHome: false, 
        userName: "",
        userScore: "",
        userColor: "",
    }

    // check IP address on mount
    componentDidMount = () => {
        this.checkIp()
    }

    // Grab user IP address set state variable, then continue to set URL state variable
    checkIp = () => {
        
        lookup()
        .then((info) => {
            this.setState({ipAddress: info.ip})
            this.setUrl()
        })
        
    }

    // Grab current URL and set state variable, then continue to check URL
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

    // Check state variable URL against session database. If url exist is database, the user can continue into the game
    // If the URL does not exist in the database, the user is redirected to an error screen
    checkURL = () => {

        API.checkSessionUrl(this.state.urlString)
        .then(res =>{ 
            // If URL does not exist, user gets error screen
            if (res.data.length < 1) {
                console.log("Not found")
                window.location.href = "/notfound"
                return false
            }

            // If URL does exist
            else {
                console.log(res.data)
                console.log("You entered a valid session!")

                // If no members yet exist in session, user is shown profile page
                if (res.data[0].members.length === 0 ) {
                    console.log("no members yet in session")
                    this.setState({showProfile: true})
                }
                
                // If users exist but user's ip address is not associated with a session member,
                // user gets shown profile page. If the ip address already exists, user goes straight to 
                // home page
                for (var i = 0; i < res.data[0].members.length; i ++) {
                    if (res.data[0].members[i].ip === this.state.ipAddress) {
                        console.log("member already exists in session ") 
                        this.setState({showProfile: false})
                        this.setState({showHome: true})
                        break
                    }

                    else {
                        console.log("member does not yet exist in session")
                        this.setState({showProfile: true})
                    }
                }


            
            }
        })
        .catch(err => console.log(err.response));
    };

    profileOnAdd = (field, value) => {
        this.setState({[field]: value})
        console.log(this.state)
    }

    render() {
        return (
            <div> 
                { this.state.showProfile ? 
                    <Profile url={this.state.urlString} ip={this.state.ipAddress} profileAdded={this.profileOnAdd.bind(this)}/>
                : null}

                { this.state.showHome ?
                    <div>
                        <GiphySearch />
                        <PromptSelect />
                        <BottomNav userName={this.state.userName} userScore={this.state.userScore} userColor={this.state.userColor}/>
                    </div>
                : null}
                
            </div>
        );
    }
}

export default Home;