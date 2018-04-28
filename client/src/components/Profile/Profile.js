import React, { Component } from "react";
import API from "../../utils/API"

class Profile extends Component {

    state = {
        url: "",
        username: "",
        color: "",
        showProfile: true
    }

    componentDidMount = () => {

        this.loadSavedSessions();
        
        let currenturl = window.location.href;
        let spliturl = currenturl.split("/");
        let newurl = ""
        
        for (var i = 4; i < spliturl.length; i ++ ) {
            newurl += "/" + spliturl[i]
        }

        this.setState({url: newurl})
    }

    loadSavedSessions = () => {
        API.getSessions()
        .then(res => console.log(res))
        .catch(err => console.log(err.response));
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    enterProfile = event => {
        
        let profileColor = event.target.id
        this.setState({color:profileColor}, function(){
            
            API.addSessionMember({
                url: this.state.url,
                username: this.state.username,
                color: this.state.color
            })
            .then(res => 
                console.log(res),
                this.hideProfile()
            )
            .catch(err => console.log(err.response));

        })

    }

    hideProfile = () => {
        this.setState({showProfile: false})
    }

    render() {

        return (
            <div>
            { this.state.showProfile ? 
                <div>
                    <div className="setup-profile">
                        <div className="enter-profile">Setup Your Profile</div>
                        <input type="text" placeholder="Enter Name" name="username" value={this.state.username} onChange={this.handleInputChange}/>
                    </div>
                    <div className="setup-color">
                        <div className="enter-color">Pick a Color</div>
                    </div>
                    <div className="setup-color-buttondiv">
                        <span id="yellow-prof" className="btn color-btn" onClick={this.enterProfile}></span>
                        <span id="blue-prof" className="btn color-btn" onClick={this.enterProfile}></span>
                        <span id="red-prof" className="btn color-btn" onClick={this.enterProfile}></span>
                        <span id="pink-prof" className="btn color-btn" onClick={this.enterProfile}></span>
                        <span id="green-prof" className="btn color-btn" onClick={this.enterProfile}></span>
                        <span id="orange-prof" className="btn color-btn" onClick={this.enterProfile}></span>
                        <span id="purple-prof" className="btn color-btn" onClick={this.enterProfile}></span>
                        <span id="charcoal-prof" className="btn color-btn" onClick={this.enterProfile}></span>
                    </div>
                </div>
            : null }
            </div>

               
        )
    }
}

export default Profile;
