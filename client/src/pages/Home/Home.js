import React, { Component } from "react";
import API from "../../utils/API";
import { endSessBtn, nextRndBtn } from "../../components/Buttons";
import BottomNav from "../../components/BottomNav/bottomNav";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import GiphySearch from "../../components/GiphySearch/GiphySearch";
import PlayerList from "../../components/PlayerList/PlayerList";
import PlayerListHolder from "../../components/PlayerListHolder/PlayerListHolder";
import Profile from "../../components/Profile";
import PromptSelect from "../../components/PromptSelect/PromptSelect";
import CurrentPlayer from "../../components/CurrentPlayer/CurrentPlayer";
import WinnerPage from "../../components/WinnerPage/WinnerPage";
import io from "socket.io-client";

class Home extends Component {

    state = {
        urlString: "",
        keyword: "",
        socketAddress: "",
        theme: "",
        userName: "",
        userScore: "",
        userColor: "",
        BottomNavPlayerList: [],
        BottomNavExpanded: false,
        BottomNavClasses: "bottom-nav",
        userJudge: false, 
        currentJudge: "",
        playerList: [],
        selectedTheme: "",
        themeIndex: "",
        winner: "",
        socket: "",
        pendingMessage: "",
        pendingPlayerHeader: "",
        profBtnClicked: false,
        profBtnId: "selected-btn",
        // Variables to prompt showing React components
        showProfile: false,
        showPending: false, 
        showJudgeCategory: false,
        showGiphySearch: false,
        showWinner: false,
    }

    // check IP address on mount
    componentDidMount = () => {

        this.returnCategories()
        this.setUrl()

    }

    configureSocket = (socket) => {
        const self = this;

        self.state.socket.on("useraddedsuccessfullyother", function(data) {
            console.log("NEW USER ADDED")
            self.updateMembers(data)

        })

        self.state.socket.on("startgameplayer", function(data){
            console.log("PLAYER GAME STARTED")

            self.setState({pendingPlayerHeader: "Players in round"}, function() {
                self.updateMembers(data)

                let judge = self.state.currentJudge
                let message = judge + " choosing category..."
                self.setState({pendingMessage: message})

            })

            

        })

        self.state.socket.on("startgamejudge", function(data) {
            console.log("JUDGE GAME STARTED")

            self.setState({showPending: false})
            self.setState({showJudgeCategory: true})
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
        const self = this

        API.checkSessionUrl(self.state.urlString)
        .then(res =>{ 
            //Error screen if winner URL doesn't exist
            if (res.data.length < 1) {
                console.log("Not found")
                window.location.href = "/notfound"
                return false
            }

            //URl exists
            else {
                console.log("SESSION DATA")
                console.log(res.data)
                console.log("You entered a valid session!")
                const socket = io(self.state.urlString);
                console.log("Socket object:", socket);

                this.setState({keyword: res.data[0].title})

                this.setState({socket: socket}, function() {

                    this.configureSocket(this.state.socket)

                    this.state.socket.on('usermade', function(data) {
                        console.log("usermade socket working")
                        self.setState({socketAddress: data.userid}, function() {

                            //No members in session
                            if (res.data[0].members.length === 0 ) {
                                console.log("no members yet in session")
                                self.setState({showProfile: true})
                            }
                            // If users exist but user's ip address is not associated with a session member,
                            // user gets shown profile page. If the ip address already exists, user goes straight to 
                            // home page
                            else {
                                console.log("members exist in session")
                                self.setState({showProfile: true})
                            }
                        })    
                    })
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
            console.log("CATEGORY RESPONSE")
            console.log(response.data);
            this.setState({theme: response.data});
        })
        .catch(err => console.log(err))
    }

    //Select random category after judge chooses theme
    randomTheme = (themeIndex) => {
        this.setState({
            selectedTheme: this.state.theme[themeIndex].categories[Math.floor(Math.random()*this.state.theme[themeIndex].categories.length)]
        })
    }

    //Expand navbar
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

    updateMembers = (data) => {
        console.log("update members triggered")
        console.log(data.model[0].members)

        const bottomNavArray = []
        const playerList = []
        let count = 1

        for (var i = 0; i < data.model[0].members.length; i ++) {

            if (data.model[0].members[i].ip === this.state.socketAddress) {
                this.setState({userName: data.model[0].members[i].name})
                this.setState({userScore: data.model[0].members[i].score})
                this.setState({userColor: data.model[0].members[i].color})
                this.setState({userJudge: data.model[0].members[i].judge})
            }
            
            else {
                bottomNavArray.push(data.model[0].members[i])
            }

            if (this.state.pendingPlayerHeader === "Players logged in") {
                playerList.push(data.model[0].members[i])
            }

            else {

                if (data.model[0].members[i].judge === false) {
                    playerList.push(data.model[0].members[i])
                }

            }

            if (data.model[0].members[i].judge) {
                this.setState({currentJudge: data.model[0].members[i].name})
            }

            if (count === data.model[0].members.length) {
                this.setState({playerList: playerList})
                this.setState({BottomNavPlayerList: bottomNavArray})
            }

            count ++
            
        } 
    

    }

    render() {
        return (
            <div> 

                { this.state.showProfile ? 
                    <Profile url={this.state.urlString} ip={this.state.socketAddress} memberArray={this.state.playerList} socket={this.state.socket} userAdded={this.updateMembers} profileAdded={this.componentChange.bind(this)}/>
                : null}

                { this.state.showPending ?
                    <div>
                        <LoadingScreen url={this.state.urlString} judge={this.state.currentJudge} socket={this.state.socket}
                            keyword = {this.state.keyword}
                            pendingMessage= {this.state.pendingMessage}
                            pendingPlayerHeader = {this.state.pendingPlayerHeader}
                            userName= {this.state.userName}
                            userColor={this.state.userColor}
                            userScore={this.state.userScore}
                            userJudge={this.state.userJudge}
                            members={this.state.playerList}
                        />
                        <BottomNav expand={() => { this.expandToggle() }} class={this.state.BottomNavClasses}>
                            <PlayerListHolder>
                                <CurrentPlayer playerName={this.state.userName} playerScore={this.state.userScore}
                                        userColor={this.state.userColor} />
                                {this.state.BottomNavPlayerList.map(
                                    player => (
                                        <PlayerList
                                        key={player.ip}
                                        id={player.ip}
                                        playerName={player.name} 
                                        playerScore={player.score}
                                        userColor={player.color}
                                        />
                                    ))
                                }
                            </PlayerListHolder>
                        </BottomNav>    
                    </div>
                : null}

                {this.state.showJudgeCategory ?
                    <div>
                        {this.state.theme.map(prompt => (
                            <PromptSelect
                            key={prompt.index}
                            index={prompt.index}
                            icon={prompt.icon}
                            theme={prompt.theme}
                            color={prompt.color}
                            selectedTheme={() => {this.randomTheme(prompt.index)}} />
                        ))}
                        <BottomNav expand={() => { this.expandToggle() }} class={this.state.BottomNavClasses}>
                            <PlayerListHolder>
                                <CurrentPlayer playerName={this.state.userName} playerScore={this.state.userScore}
                                        userColor={this.state.userColor} />
                                {this.state.BottomNavPlayerList.map(
                                    player => (
                                        <PlayerList
                                        key={player.ip}
                                        id={player.ip}
                                        playerName={player.name} playerScore={player.score}
                                        userColor={player.color}
                                        />
                                    ))
                                }
                            </PlayerListHolder>
                        </BottomNav> 
                    </div>
                
                : null }

                { this.state.showGiphySearch ?
                    <div> 
                        <GiphySearch />
                        <BottomNav />
                    </div>
                : null}
                {/* Use to test Giphy Search w/o running the game logic */}
                {/* <GiphySearch />  */}
                { this.state.showWinner ?   
                    <div> 
                        <WinnerPage />
                        {this.state.theme.map(winner => (
                            <WinnerPage
                            id={winner.id}
                            key={winner.id}
                            icon={winner.icon}
                            theme={winner.theme}
                            color={winner.color}
                            />
                        ))}
                        <BottomNav />
                    </div>
                : null}
            </div>
        );
    }
}

export default Home;