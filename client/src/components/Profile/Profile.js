import React, { Component } from "react";
import API from "../../utils/API";
import openSocket from "socket.io-client";

class Profile extends Component {

    state = {
        url: "",
        username: "",
        color: "",
        ip: "",
        judge: false,
        showError: false,
    }

    componentDidMount = () => {

        console.log(this.props)
        
        this.setState({url: this.props.url})
        this.setState({ip: this.props.ip})

    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    enterProfile = event => {
        
        if (this.state.username === "") {
            this.setState({showError: true})
        }

        else {
            let divTarget = event.target
            let profileColor = divTarget.getAttribute('data')
            this.setState({color:profileColor}, function(){

                API.checkSessionUrl(this.state.url)
                .then(res => {

                    if (res.data[0].members.length === 0) {

                        this.setState({judge: true}, function() {
                            this.addMember()
                        })
                    }

                    else {

                        this.setState({judge: false}, function() {
                            this.addMember()
                        })
                    }
                })
            })
        }
    }

    addMember = () => {
        API.addSessionMember({
            url: this.state.url,
            username: this.state.username,
            color: this.state.color,
            ip: this.state.ip,
            judge: this.state.judge
        })
        .then(res => {
            const socket = openSocket(res.data.url);
            socket.on('connection', () => console.log("hello"));
            this.showSessionData()
        })
        .catch(err => console.log(err.response));
    }
    

    showSessionData = () => {
        API.checkSessionUrl(this.state.url)
        .then(res =>{ 
            console.log(res.data);
            this.props.profileAdded('showProfile', false);
            this.props.profileAdded('showPending', true);

            for (var i = 0; i < res.data[0].members.length; i ++ ){
                if (res.data[0].members[i].ip === this.state.ip) {
                    this.props.profileAdded('userName', res.data[0].members[i].name);
                    this.props.profileAdded('userScore', res.data[0].members[i].score);
                    this.props.profileAdded('userColor', res.data[0].members[i].color);
                    this.props.profileAdded('userJudge', res.data[0].members[i].judge);
                }

                if (res.data[0].members[i].judge) {
                    this.props.profileAdded('currentJudge', res.data[0].members[i].name)
                }
            }
            
        })
    }

    render() {
        return (
            <div>

                { this.state.showError ?
                        <div>
                            <p>Please enter a username</p>
                        </div>
                : null }

                <div className="setup-profile">
                    <div className="enter-profile">Setup Your Profile</div>
                    <input type="text" placeholder="Enter Name" name="username" value={this.state.username} onChange={this.handleInputChange}/>
                </div>
                <div className="setup-color">
                    <div className="enter-color">Pick a Color</div>
                </div>
                <div className="setup-color-buttondiv">
                    <span id="yellow-prof" data="#FFC655" className="btn color-btn" onClick={this.enterProfile}></span>
                    <span id="blue-prof" data="#5FACFF" className="btn color-btn" onClick={this.enterProfile}></span>
                    <span id="red-prof" data="#FF6161" className="btn color-btn" onClick={this.enterProfile}></span>
                    <span id="pink-prof" data="#D45FFF" className="btn color-btn" onClick={this.enterProfile}></span>
                    <span id="green-prof" data="#44BBA4" className="btn color-btn" onClick={this.enterProfile}></span>
                    <span id="orange-prof" data="#FF8A5B" className="btn color-btn" onClick={this.enterProfile}></span>
                    <span id="purple-prof" data="#9964FF" className="btn color-btn" onClick={this.enterProfile}></span>
                    <span id="charcoal-prof" data="#444444" className="btn color-btn" onClick={this.enterProfile}></span>
                </div>

        </div>
        )
    }
}

export default Profile;
