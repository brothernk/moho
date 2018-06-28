import React, { Component } from "react";
import API from "../../utils/API";
import BottomNav from "../../components/BottomNav/bottomNav";
import CurrentPlayer from "../../components/CurrentPlayer/CurrentPlayer";
import GifReveal from "../../components/GifReveal/GifReveal";
import GiphySearch from "../../components/GiphySearch/GiphySearch";
import io from "socket.io-client";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import PlayerList from "../../components/PlayerList/PlayerList";
import PlayerListHolder from "../../components/PlayerListHolder/PlayerListHolder";
import Profile from "../../components/Profile";
import PromptSelect from "../../components/PromptSelect/PromptSelect";
import Timer from "../../components/Timer/Timer";
import WinnerPage from "../../components/WinnerPage/WinnerPage";
import reloadSocket from "./reloadSocket.js";

class Home extends Component {

    state = {
        // User information
        urlString: "",
        keyword: "",
        socketAddress: "",
        userName: "",
        userScore: "",
        userColor: "",
    
        // All players except user
        BottomNavPlayerList: [],
        BottomNavExpanded: false,
        BottomNavClasses: "bottom-nav",
        userJudge: false, 
        currentJudge: "",
        oldJudge: "",

        // If on opening screen, includes all players. Otherwise includes players that are not the judge
        // from updateMembers function
        // During play round, includes first only judge, then whatever players are done choosing their gifs
        playerList: [],

        // List that keeps track of all players
        allPlayers: [],

        // Theme and Categories
        themeIndex: "",
        selectedTheme: "",
        selectedCategory: "",

        winner: "",
        socket: "",
        pendingMessage: "",
        pendingPlayerHeader: "",
        gifsReturned: [],

        // Variables to prompt showing React components
        showProfile: false,
        showPending: false, 
        showJudgeCategory: false,
        showGifReveal: false,
        showGiphySearch: false,
        showJudgeChoices: false,
        showWinner: false,
        showTimer: false,
        outOfTime: false,

    }

    // check IP address on mount
    componentDidMount = () => {
        this.returnCategories()
        this.setUrl()
    }

    configureSocket = (socket) => {
        const self = this;

        self.state.socket.on('usermade', function(data) {
            console.log("usermade socket working")

            console.log(data.userid)

            API.checkSessionUrl(self.state.urlString)
            .then(res => {
                console.log(res.data[0])
                console.log(sessionStorage.getItem("username"))

                let count = 0;

                for (var i=0; i < res.data[0].members.length; i ++) {
                    if (res.data[0].members[i].ip === sessionStorage.getItem("username")) {

                        console.log("IF IS ACTIVE")
                        console.log("API Check SessionURL response:")
                        console.log(res)
                        
                        reloadSocket(res, self.componentChange.bind(this), self.state.socket)
                        self.setState({socketAddress: sessionStorage.getItem("username")})

                        break
                    }

                    else {
                        count ++
                    }
                }

                if (count === res.data[0].members.length) {
                    console.log("ELSE IS ACTIVE")
                    self.setState({showProfile: true})
                }
            }) 

        })

        self.state.socket.on('useraddedsuccessfullyself', function(data) {
            console.log("YOU ARE ADDED")
            sessionStorage.setItem("socketMessage", "useraddedsuccessfullyself")
            self.setState({pendingPlayerHeader: "Players logged in"})
            self.updateMembers(data, function() {
                console.log('useradded')
                if (self.state.userJudge) {
                    self.setState({pendingMessage: "Click start game when ready to play"})
                    self.setState({showProfile: false})
                    self.setState({showPending: true})
                }
                else {
                    self.setState({pendingMessage: "Waiting for game to start..."})
                    self.setState({showProfile: false})
                    self.setState({showPending: true})
                } 
            })
             
        })

        self.state.socket.on("useraddedsuccessfullyother", function(data) {
            sessionStorage.setItem("socketMessage", "useraddedsuccessfullyother")
            self.updateMembers(data, function(){console.log('Member added')})
        })

        self.state.socket.on("startgameplayer", function(data){
            sessionStorage.setItem("socketMessage", "startgameplayer")
            self.setState({pendingPlayerHeader: "Players in round"}, function() {
                self.updateMembers(data, function() {
                    let judge = self.state.currentJudge
                    let message = judge + " choosing category..."
                    self.setState({pendingMessage: message})
                })
            })       
        })

        self.state.socket.on("startgamejudge", function() {
            sessionStorage.setItem("socketMessage", "startgamejudge")
            self.setState({showPending: false})
            self.setState({showJudgeCategory: true})
        })

        self.state.socket.on("startnextroundplayer", function() {
            sessionStorage.setItem("socketMessage", "startnextroundplayer")
            self.setState({gifsReturned: []})
            self.setState({outOfTime: false})
            self.setState({pendingPlayerHeader: "Players in round"}, function() {
                let judge = self.state.currentJudge
                let message = judge + " choosing category..."
                self.setState({pendingMessage: message}, function() {
                    self.setState({showWinner: false})
                    self.setState({showPending: true})
                })
            })
        })

        self.state.socket.on("startnextroundjudge", function() {
            sessionStorage.setItem("socketMessage", "startnextroundjudge")
            self.setState({gifsReturned: []})
            self.setState({outOfTime: false})
            self.setState({showWinner: false})
            self.setState({showJudgeCategory: true})
        })

        self.state.socket.on("categorytheme selected player", function(data) {
            sessionStorage.setItem("socketMessage", "categorytheme selected player")
            sessionStorage.setItem("selectedTheme", data.model.theme)
            sessionStorage.setItem("selectedCategory", data.model.category)
            sessionStorage.setItem("timer", 45)
            self.setState({selectedTheme: data.model.theme})
            let newArray = []
            newArray.push(data.model.member)
            self.setState({playerList: newArray})
            sessionStorage.setItem("playerArray", JSON.stringify(newArray))
            self.setState({selectedCategory: data.model.category}, function() {
                self.setState({showPending: false})
                self.setState({showTimer: true})
                self.setState({showGiphySearch: true})
            })
        })

        self.state.socket.on("categorytheme selected judge", function(data) {
            sessionStorage.setItem("socketMessage", "categorytheme selected judge")
            sessionStorage.setItem("selectedTheme", data.model.theme)
            sessionStorage.setItem("selectedCategory", data.model.category)
            sessionStorage.setItem("timer", 45)

            console.log("YOU SELECTED GAME")
            self.setState({showJudgeChoices: false})

            self.setState({selectedTheme: data.model.theme})
            self.setState({selectedCategory: data.model.category})
            self.setState({playerList: data.model.member})
            self.setState({pendingMessage: "Players choosing gifs"})
            self.setState({pendingPlayerHeader: "Players done with challenge"}, function() {
                let newArray = []
                newArray.push(data.model.member)
                self.setState({playerList: newArray}, function() {
                    sessionStorage.setItem("playerArray", JSON.stringify(newArray))
                    self.setState({showTimer: true}) 
                    self.setState({showJudgeCategory: false})
                    self.setState({showPending: true})
                }) 
            }) 
        })

        self.state.socket.on('playeroutoftimereturned', function(data) {
            sessionStorage.setItem("socketMessage", "playeroutoftimereturned")
            
            let gifArray = []
            for (var i = 0; i < self.state.gifsReturned.length; i ++ ) {
                gifArray.push(self.state.gifsReturned[i])
            }
            let newGifObject = {
                gif: data.model.gif,
                member: data.model.member
            }

            gifArray.push(newGifObject)
            self.setState({gifsReturned: gifArray})

            sessionStorage.setItem("gifsReturned", JSON.stringify(gifArray))

            let playerArray = []
            for (var j = 0; j < self.state.playerList.length; j ++ ) {
                playerArray.push(self.state.playerList[j])
            }

            playerArray.push(data.model.member)
            self.setState({playerList: playerArray}, function() {
                sessionStorage.setItem("playerArray", JSON.stringify(playerArray))
                if (self.state.playerList.length === self.state.allPlayers.length) {
                    self.setState({outOfTime: true})
                    self.setState({showTimer: false})
                    self.setState({showJudgeChoices: true})
                }

            })
        })

        self.state.socket.on('playerchosenreturned', function(data) {
            sessionStorage.setItem("socketMessage", "playerchosenreturned")

            let gifArray = []
            for (var i = 0; i < self.state.gifsReturned.length; i ++ ) {
                gifArray.push(self.state.gifsReturned[i])
            }
            let newGifObject = {
                gif: data.model.gif,
                member: data.model.member
            }
            gifArray.push(newGifObject)
            self.setState({gifsReturned: gifArray}, function() {
                console.log(self.state.gifsReturned)
            })

            sessionStorage.setItem("gifsReturned", JSON.stringify(gifArray))

            let playerArray = []
            for (var j = 0; j < self.state.playerList.length; j ++ ) {
                playerArray.push(self.state.playerList[j])
            }
            playerArray.push(data.model.member)
            self.setState({playerList: playerArray}, function() {
                sessionStorage.setItem("playerArray", JSON.stringify(playerArray))
                if (self.state.playerList.length === self.state.allPlayers.length) {
                    self.setState({outOfTime: true})
                    self.setState({showTimer: false})
                    self.setState({showJudgeChoices: true})
                }
            })
        })

        self.state.socket.on('revealgifsjudge', function() {
            sessionStorage.setItem("socketMessage", "revealgifsjudge")

            self.setState({showPending: false})
            self.setState({showGifReveal: true})
        })

        self.state.socket.on('revealgifsplayer', function() {
            sessionStorage.setItem("socketMessage", "revealgifsplayer")

            self.setState({showPending: false})
            self.setState({showGifReveal: true})
        })


        self.state.socket.on('winnerinfojudge', function(data) {
            sessionStorage.setItem("socketMessage", "winnerinfojudge")
            
            self.setState({winner: data})
            
            sessionStorage.setItem("winner", JSON.stringify(data))

            let allPlayerArray = []
            let oldJudge = ""

            for (var i = 0; i < self.state.allPlayers.length; i ++ ) {
                if (self.state.allPlayers[i].judge === false) {
                    allPlayerArray.push(self.state.allPlayers[i])
                }

                else {
                    oldJudge = self.state.allPlayers[i]
                }
            }
            
            self.setState({oldJudge: oldJudge})

            let randomJudge = allPlayerArray[Math.floor(Math.random() * allPlayerArray.length)]

            self.state.socket.emit('choosenewjudge', randomJudge)
        })

        self.state.socket.on('winnerinfoplayer', function(data) {
            sessionStorage.setItem("socketMessage", "winnerinfoplayer")
            sessionStorage.setItem("winner", JSON.stringify(data))

            self.setState({winner: data})
        })

        self.state.socket.on('newjudgeupdated', function() {
            sessionStorage.setItem("socketMessage", "newjudgeupdated")
  
            let oldjudge = self.state.oldJudge
            self.state.socket.emit('changeoldjudge', oldjudge)
        })

        self.state.socket.on('oldjudgeupdated', function() {
            sessionStorage.setItem("socketMessage", "oldjudgeupdated")

            self.state.socket.emit('newgame')
        })

        self.state.socket.on('newgamejudge', function(data) {
            sessionStorage.setItem("socketMessage", "newgamejudge")

            self.updateMembers(data, function() {
                self.setState({showGifReveal: false})
                self.setState({showWinner: true})
            })
        })

        self.state.socket.on('newgameplayer', function(data) {
            sessionStorage.setItem("socketMessage", "newgameplayer")

            self.updateMembers(data, function() {
                self.setState({showGifReveal: false})
                self.setState({showWinner: true})
            })
        })

        self.state.socket.on('disconnectuser', function() {
            self.state.socket.emit('disconnectuserinfo', sessionStorage.getItem("username"))
        })

        self.state.socket.on('remaininguserinfo', function(data) {
            console.log(data)
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
                    this.configureSocket(socket)
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
            this.setState({themeIndex: response.data});
        })
        .catch(err => console.log(err))
    }

    //Expand navbar
    expandToggle = () => {
        if (this.state.BottomNavExpanded) {
            this.setState({
                BottomNavClasses: "bottom-nav not-expanded",
                BottomNavExpanded: false
            })
        } else {
            this.setState({
                BottomNavClasses: "bottom-nav expanded",
                BottomNavExpanded: true
            })
        }
    };
    
    endTimer = () => {
    }

    updateMembers = (data, callback) => {
        console.log("update members triggered")

        let members = []

        if (data.model) {
            members = data.model[0].members
        }

        else if (data.data) {
            members = data.data[0].members
        }

        console.log(members)
        const bottomNavArray = []
        const playerList = []
        const totalPlayerList = []
        let count = 1

        for (var i = 0; i < members.length; i ++) {

            totalPlayerList.push(members[i])

            if (members[i].ip === this.state.socketAddress) {
                this.setState({userName: members[i].name})
                this.setState({userScore: members[i].score})
                this.setState({userColor: members[i].color})
                this.setState({userJudge: members[i].judge})
            }
            
            else {
                bottomNavArray.push(members[i])
            }

            if (this.state.pendingPlayerHeader === "Players logged in") {
                playerList.push(members[i])
            }

            else {
                if (members[i].judge === false) {
                    playerList.push(members[i])
                }
            }

            if (members[i].judge) {
                this.setState({currentJudge: members[i].name})
            }

            if (count === members.length) {
                this.setState({allPlayers: totalPlayerList})
                this.setState({playerList: playerList})
                this.setState({BottomNavPlayerList: bottomNavArray})
            }

            count ++ 
        }
        callback()
    }

    render() {
        return (
            <div className="home-container"> 

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
                            category={this.state.selectedCategory}
                            theme={this.state.selectedTheme}
                            showChoices={this.state.showJudgeChoices}
                        />

                        { this.state.showTimer ? 
                            <Timer outOfTime={this.componentChange.bind(this)} />
                        : null}
                        
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
                        <p className="prompt-title">Select a Theme</p>
                        {this.state.themeIndex.map(prompt => (
                            <PromptSelect
                            key={prompt.index}
                            index={prompt.index}
                            icon={prompt.icon}
                            theme={prompt.theme}
                            color={prompt.color}
                            categories={prompt.categories}
                            socket={this.state.socket} />
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
                        <GiphySearch theme={this.state.selectedTheme} category={this.state.selectedCategory} socket={this.state.socket} 
                        userSocket={sessionStorage.getItem("username")} judge={this.state.currentJudge}
                        timer={this.state.outOfTime} outOfTime={this.componentChange.bind(this)} >
                            <Timer outOfTime={this.componentChange.bind(this)} />
                        </GiphySearch>

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
                : null}

                { this.state.showGifReveal ? 
                    <GifReveal
                        theme={this.state.selectedTheme} category={this.state.selectedCategory} gifsReturned={this.state.gifsReturned} 
                        users={this.state.allPlayers} userSocket = {sessionStorage.getItem("username")}
                        socket={this.state.socket}
                    />
                : null}

                { this.state.showWinner ? 
                    <div>
                        <WinnerPage
                            winner={this.state.winner} theme={this.state.selectedTheme} category={this.state.selectedCategory} 
                            judge={this.state.currentJudge} userJudge={this.state.userJudge}
                            socket={this.state.socket}
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
                                        playerName={player.name} playerScore={player.score}
                                        userColor={player.color}
                                        />
                                    ))
                                }
                            </PlayerListHolder>
                        </BottomNav> 
                    </div>
                : null}

            </div>
        );
    }
}

export default Home;