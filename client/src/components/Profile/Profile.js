import React, { Component } from "react";
import API from "../../utils/API";



class Profile extends Component {

    state = {
        url: "",
        username: "",
        color: "",
        ip: "",
        judge: false,
        showError: false,
        memberArray: []
    }

    componentDidMount = () => {

        console.log(this.props)
        this.setState({url: this.props.url})
        this.setState({ip: this.props.ip})
        this.setState({memberArray: this.props.memberArray}, function() {
            console.log(this.state)
        })

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
            this.showSessionData()
        })
        .catch(err => console.log(err.response));
    }
    
    showSessionData = () => {

        console.log("member data added")

        const self = this

        self.props.socket.emit('useradded')

        self.props.socket.on('useraddedsuccessfully', function(data) {
            console.log("USER ADDED")
            self.props.userAdded(data)

            if (self.state.judge) {
                self.props.profileAdded('pendingMessage', 'Click start game when ready to play');
                self.props.profileAdded('showProfile', false);
                self.props.profileAdded('showPending', true);
            }

            else {
                self.props.profileAdded('pendingMessage', 'Waiting for game to start');
                self.props.profileAdded('showProfile', false);
                self.props.profileAdded('showPending', true);
            }
            
        })
        
    }

    render() {
        return (
            <div>

                { this.state.showError ?
                        <div>
                            <p id="username-error">Please enter a username</p>
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
                    <span id="yellow-prof" data="#FFC655" className="btn color-btn"></span>
                    <span id="blue-prof" data="#5FACFF" className="btn color-btn"></span>
                    <span id="red-prof" data="#FF6161" className="btn color-btn"></span>
                    <span id="pink-prof" data="#D45FFF" className="btn color-btn"></span>
                    <span id="green-prof" data="#44BBA4" className="btn color-btn"></span>
                    <span id="orange-prof" data="#FF8A5B" className="btn color-btn"></span>
                    <span id="purple-prof" data="#9964FF" className="btn color-btn"></span>
                    <span id="charcoal-prof" data="#444444" className="btn color-btn"></span>
                </div>
                <div className="complete-profile-btn">
                    <span className="btn join-btn" onClick={this.enterProfile}>Join Game</span>
                </div>

        </div>
        )
    }
}

export default Profile;
