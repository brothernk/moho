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
        joinClasses: "join-btn cantJoin"
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
    setupProfile = event => {
        const self = this;
        let divTarget = event.target
        let profileColor = divTarget.getAttribute('data')
        this.setState({color:profileColor}, function(){
            self.onClickIdHandler()
            API.checkSessionUrl(this.state.url)
            .then(res => {
                if (res.data[0].members.length === 0) {
                    this.setState({judge: true});
                }

                else {
                    this.setState({judge: false})
                }
                this.setState({joinClasses: "join-btn join"})
            })
        })

    }

    //Update user to loading screen
    addMember = () => {
        if (this.state.username === "") {
            this.setState({showError: true})
        }
        else if (this.state.color === "") {
            this.setState({showError: true})
        }
        else {
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
    }
    
    showSessionData = () => {
        console.log("member data added")
        const self = this
        self.props.socket.emit('useradded')

        self.props.socket.on('useraddedsuccessfullyself', function(data) {
            console.log("YOU ARE ADDED")
            self.props.profileAdded('pendingPlayerHeader', 'Players logged in')
            self.props.userAdded(data, function() {console.log('useradded')})

            if (self.state.judge) {
                self.props.profileAdded('pendingMessage', 'Click start game when ready to play')
                self.props.profileAdded('showProfile', false);
                self.props.profileAdded('showPending', true);
            }
            else {
                self.props.profileAdded('pendingMessage', 'Waiting for game to start')
                self.props.profileAdded('showProfile', false);
                self.props.profileAdded('showPending', true);
            }  
        })
    }

    onClickIdHandler = () => {
        let btns = document.getElementsByClassName("color-btn");

        for (let i=0;i<btns.length;i++) {
            if(btns[i].getAttribute('data') === this.state.color) {
                btns[i].setAttribute('id', 'selected')
            }
            else {
                btns[i].removeAttribute('id')
            }
        }
    }  

    render() {
        return (
            <div>
                <div>
                    <div className="setup-profile">Setup Your Profile</div>
                    <input id="enter-name" type="text" placeholder="Enter Name" name="username" value={this.state.username} onChange={this.handleInputChange}/>
                </div>

                <div>
                    <div className="pick-a-color">Pick a Color</div>
                </div>
                
                <div className="setup-color-buttondiv">
                    <span data="#FFC655" className="yellow-prof btn color-btn" onClick={this.setupProfile}></span>
                    <span data="#5FACFF" className="blue-prof btn color-btn" onClick={this.setupProfile}></span>
                    <span data="#FF6161" className="red-prof btn color-btn" onClick={this.setupProfile}></span>
                    <span data="#D45FFF" className="pink-prof btn color-btn" onClick={this.setupProfile}></span>
                    <span data="#44BBA4" className="green-prof btn color-btn" onClick={this.setupProfile}></span>
                    <span data="#FF8A5B" className="orange-prof btn color-btn" onClick={this.setupProfile}></span>
                    <span data="#9964FF" className="purple-prof btn color-btn" onClick={this.setupProfile}></span>
                    <span data="#444444" className="charcoal-prof btn color-btn" onClick={this.setupProfile}></span>
                </div>

                <div onClick={this.addMember} className="complete-profile-btn">
                    <span className={this.state.joinClasses}>Join Game</span>
                </div>

                { this.state.showError ?
                        <div>
                            <p id="username-error">Please enter a username and choose a color</p>
                        </div>
                : null }
                
             </div>
        )
    }
}

export default Profile;
