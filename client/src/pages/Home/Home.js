import React, { Component } from "react";
import API from "../../utils/API";
import BottomNav from "../../components/BottomNav/bottomNav";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import GiphySearch from "../../components/GiphySearch/GiphySearch";
import PlayerList from "../../components/PlayerList/PlayerList";
import PlayerListHolder from "../../components/PlayerListHolder/PlayerListHolder";
import Profile from "../../components/Profile";
import PromptSelect from "../../components/PromptSelect/PromptSelect";
import { lookup } from "ipdata"
import CurrentPlayer from "../../components/CurrentPlayer/CurrentPlayer";
import io from "socket.io-client";

class Home extends Component {

    state = {
        urlString: "",
        ipAddress: "",
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
        this.checkIp()
        this.returnCategories()
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
                            self.setState({showProfile: false})
                            self.setState({showPending: true})
                            break
                        }

                        else {
                            console.log("member does not yet exist in session")
                            self.setState({showProfile: true})
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

    // getScores = () => {
    //     API.getSessions()
    //     .then(response => {
    //         const currentURL = window.location.pathname.slice(5);
    //         console.log(response.data);
    //         console.log(currentURL);
    //         console.log(this.state.ipAddress);
    //         let i;
    //         let j;
    //         for (i = 0; i < response.data.length; i++) {
    //             if (response.data[i].url === currentURL) {
    //                 console.log("Match!");
    //                 console.log(response.data[i]);
    //                 for (j = 0; j < response.data[i].members.length; j++) {
    //                     if (response.data[i].members[j].ip === this.state.ipAddress) {
    //                         this.setState({
    //                             CurrentPlayer: response.data[i].members[j]
    //                         });
    //                         response.data[i].members.splice(j, 1);
    //                     } else {
    //                         console.log(response.data[i].members[j].ip + " No player found");
    //                     }
    //                     console.log(response.data[i].members);
    //                 }
    //                 this.setState({
    //                     PlayerList: response.data[i].members
    //                 })
    //             } else {
    //                 console.log("No match!");
    //             }
    //         }
    //     })
    //     .catch(err => console.log(err));
    // }

    render() {
        return (
            <div> 

                { this.state.showProfile ? 
                    <Profile url={this.state.urlString} ip={this.state.socketAddress} profileAdded={this.componentChange.bind(this)}/>
                : null}

                { this.state.showPending ?
                    <div>
                
                        <LoadingScreen url={this.state.urlString} judge={this.state.currentJudge}  />
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
                : null} */}
                {/* Use to test Giphy Search w/o running the game logic */}
                <GiphySearch />
            </div>
        );
    }
}

export default Home;