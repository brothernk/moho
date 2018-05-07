import React, { Component } from "react";
import API from "../../utils/API";
import BottomNav from "../../components/BottomNav/bottomNav";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import GiphySearch from "../../components/GiphySearch/GiphySearch";
import PlayerList from "../../components/PlayerList/PlayerList";
import PlayerListHolder from "../../components/PlayerListHolder/PlayerListHolder";
import Profile from "../../components/Profile";
import PromptSelect from "../../components/PromptSelect/PromptSelect";
import CurrentPlayer from "../../components/CurrentPlayer/CurrentPlayer";
import io from "socket.io-client";

class Home extends Component {

    state = {
        urlString: "",
        socketAddress: "",
        showProfile: false,
        theme: "",
        showPending: false,
        showHome: false, 
        userName: "",
        userScore: "",
        userColor: "",
        BottomNavExpanded: false,
        BottomNavClasses: "bottom-nav",
        userJudge: false, 
        currentJudge: "",
        playerList: [],
    }

    // check IP address on mount
    componentDidMount = () => {
        this.setUrl()
        this.returnCategories()
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

        const self = this;

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

                const socket = io(this.state.urlString);
                console.log("Socket object:", socket);

                socket.on('usermade', function(data) {
                    self.setState({socketAddress: data.userid})
                    
                    // If no members yet exist in session, user is shown profile page
                    if (res.data[0].members.length === 0 ) {
                        console.log("no members yet in session")
                        self.setState({showProfile: true})
                    }
                    
                    // If users exist but user's ip address is not associated with a session member,
                    // user gets shown profile page. If the ip address already exists, user goes straight to 
                    // home page
                    for (var i = 0; i < res.data[0].members.length; i ++) {
                        if (res.data[0].members[i].ip === this.state.ipAddress) {
                            console.log("member already exists in session ") 
                            self.updateMembers( function() {
                                self.setState({showProfile: false})
                                self.setState({showPending: true})
                            })
                        }

                        else {
                            console.log("member does not yet exist in session")
                            self.updateMembers( function() {
                                self.setState({showProfile: true})
                            })
                        }
                    }
                })
            }
        })
        .catch(err => console.log(err.response));
    };

    componentChange = (field, value) => {
        this.setState({[field]: value})
    }

    returnCategories = () => {
        API.getCategories()
        .then(response => {
          console.log(response.data);
          this.setState({theme: response.data});
        })
        .catch(err => console.log(err))
    }

    expandToggle = () => {
        if (this.state.BottomNavExpanded) {
            console.log("expanded!")
            this.setState({
                BottomNavClasses: "bottom-nav not-expanded",
                BottomNavExpanded: false
            })
        } else {
            console.log("Not expanded :/");
            this.setState({
                BottomNavClasses: "bottom-nav expanded",
                BottomNavExpanded: true
            })
        }
    };

    updateMembers = () => {
        API.checkSessionUrl(this.state.urlString)
        .then(res =>{ 
            if (res.data.length > 0) {
                if (res.data[0].members.length === 0 ) {
                    const memberArray = []
                    for (var i = 0; i < res.data[0].members.length; i ++) {

                        if (res.data[0].members[i].ip === this.state.socketAddress) {
                            this.setState({userName: res.data[0].members[i].name})
                            this.setState({userScore: res.data[0].members[i].score})
                            this.setState({userColor: res.data[0].members[i].color})
                        }
                        
                        else {
                            memberArray.push(res.data[0].members[i])
                        }
                    }

                    this.setState({playerList: memberArray}, function() {
                        console.log("Player list: ")
                        console.log(this.state.playerList)
                    })
                }
            }
        })

    }


    render() {
        return (
            <div> 

                { this.state.showProfile ? 
                    <Profile url={this.state.urlString} ip={this.state.socketAddress} members={this.state.playerList} profileAdded={this.componentChange.bind(this)}/>
                : null}

                { this.state.showPending ?
                    <div>
                

                        <LoadingScreen url={this.state.urlString} judge={this.state.currentJudge} 
                            userName= {this.state.userName}
                            userColor={this.state.userScore}
                            userJudge={this.state.userJudge}
                            members={this.state.playerList}
                            />

                        <BottomNav expand={() => { this.expandToggle() }} class={this.state.BottomNavClasses}>
                            <PlayerListHolder>
                                <CurrentPlayer playerName={this.state.userName} playerScore={this.state.userScore}
                                        userColor={this.state.userColor} />
                                {this.state.playerList.map(
                                    player => (
                                        <PlayerList
                                        id={player.id}
                                        key={player.id}
                                        playerName={player.name} playerScore={player.score}
                                        userColor={player.color}
                                        />
                                    ))
                                }
                            </PlayerListHolder>

                        </BottomNav>    
                    
                    </div>
                : null}

                { this.state.showHome ?
                    <div> 
                        <GiphySearch />
                        {this.state.theme.map(prompt => (
                            <PromptSelect
                            id={prompt.id}
                            key={prompt.id}
                            icon={prompt.icon}
                            theme={prompt.theme}
                            color={prompt.color}
                            />
                        ))}
                        <LoadingScreen />
                        <BottomNav />
                    </div>
                : null}
                {/* Use to test Giphy Search w/o running the game logic */}
                {/* <GiphySearch /> */}
            </div>
        );
    }
}

export default Home;