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
        memberArray: [],
        clicked:false
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

    //Assign user color and judge
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
                        this.setState({judge: true})
                    }

                    else {
                        this.setState({judge: false})
                    }
                })
            })
        }
    }

    //Update user to loading screen
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
                    <span data="#FFC655" className="yellow-prof btn color-btn" onClick={this.enterProfile}></span>
                    <span data="#5FACFF" className="blue-prof btn color-btn" onClick={this.enterProfile}></span>
                    <span data="#FF6161" className="red-prof btn color-btn" onClick={this.enterProfile}></span>
                    <span data="#D45FFF" className="pink-prof btn color-btn" onClick={this.enterProfile}></span>
                    <span data="#44BBA4" className="green-prof btn color-btn" onClick={this.enterProfile}></span>
                    <span data="#FF8A5B" className="orange-prof btn color-btn" onClick={this.enterProfile}></span>
                    <span data="#9964FF" className="purple-prof btn color-btn" onClick={this.enterProfile}></span>
                    <span data="#444444" className="charcoal-prof btn color-btn" onClick={this.enterProfile}></span>
                </div>

                <div onClick={this.addMember} className="complete-profile-btn">
                    <span className="btn join-btn">Join Game</span>

                </div>

             </div>
        )
    }
}

export default Profile;
