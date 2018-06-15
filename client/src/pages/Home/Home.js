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
        outOfTime: false
    }

    // check IP address on mount
    componentDidMount = () => {
        this.returnCategories()
        this.setUrl()
    }

    configureSocket = (socket) => {
        const self = this;

        self.state.socket.on("useraddedsuccessfullyother", function(data) {
            self.updateMembers(data, function(){console.log('Member added')})
        })

        self.state.socket.on("startgameplayer", function(data){
            self.setState({pendingPlayerHeader: "Players in round"}, function() {
                self.updateMembers(data, function() {
                    let judge = self.state.currentJudge
                    let message = judge + " choosing category..."
                    self.setState({pendingMessage: message})
                })
            })       
        })

        self.state.socket.on("startgamejudge", function(data) {
            self.setState({showPending: false})
            self.setState({showJudgeCategory: true})
        })

        self.state.socket.on("startnextroundplayer", function() {
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
            self.setState({gifsReturned: []})
            self.setState({outOfTime: false})
            self.setState({showWinner: false})
            self.setState({showJudgeCategory: true})
        })

        self.state.socket.on("categorytheme selected player", function(data) {

            self.setState({selectedTheme: data.model.theme})
            let newArray = []
            newArray.push(data.model.member)
            self.setState({playerList: newArray})
            self.setState({selectedCategory: data.model.category}, function() {
                self.setState({showPending: false})
                self.setState({showTimer: true})
                self.setState({showGiphySearch: true})
            })
        })

        self.state.socket.on("categorytheme selected judge", function(data) {

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
                    self.setState({showTimer: true}) 
                    self.setState({showJudgeCategory: false})
                    self.setState({showPending: true})
                }) 
            }) 
        })

        self.state.socket.on('playeroutoftimereturned', function(data) {

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

            let playerArray = []
            for (var j = 0; j < self.state.playerList.length; j ++ ) {
                playerArray.push(self.state.playerList[j])
            }
            playerArray.push(data.model.member)
            self.setState({playerList: playerArray}, function() {
                if (self.state.playerList.length === self.state.allPlayers.length) {
                    self.setState({outOfTime: true})
                    self.setState({showTimer: false})
                    self.setState({showJudgeChoices: true})
                }

            })
        })

        self.state.socket.on('playerchosenreturned', function(data) {
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

            let playerArray = []
            for (var j = 0; j < self.state.playerList.length; j ++ ) {
                playerArray.push(self.state.playerList[j])
            }
            playerArray.push(data.model.member)
            self.setState({playerList: playerArray}, function() {
                if (self.state.playerList.length === self.state.allPlayers.length) {
                    self.setState({outOfTime: true})
                    self.setState({showTimer: false})
                    self.setState({showJudgeChoices: true})
                }
            })
        })

        self.state.socket.on('winnerinfojudge', function(data) {
            self.setState({winner: data})

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
            self.setState({winner: data})
        })

        self.state.socket.on('revealgifsjudge', function() {
            self.setState({showPending: false})
            self.setState({showGifReveal: true})
        })

        self.state.socket.on('revealgifsplayer', function() {
            self.setState({showPending: false})
            self.setState({showGifReveal: true})
        })

        self.state.socket.on('newjudgeupdated', function() {
            let oldjudge = self.state.oldJudge
            self.state.socket.emit('changeoldjudge', oldjudge)
        })

        self.state.socket.on('oldjudgeupdated', function() {
            self.state.socket.emit('newgame')
        })

        self.state.socket.on('newgamejudge', function(data) {
            self.updateMembers(data, function() {
                self.setState({showGifReveal: false})
                self.setState({showWinner: true})
            })
        })

        self.state.socket.on('newgameplayer', function(data) {
            self.updateMembers(data, function() {
                self.setState({showGifReveal: false})
                self.setState({showWinner: true})
            })
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
                                console.log("No members yet in session")
                                self.setState({showProfile: true})
                            }
                            // If users exist but user's ip address is not associated with a session member,
                            // user gets shown profile page. If the ip address already exists, user goes straight to 
                            // home page
                            else {
                                console.log("Members exist in session")
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
        console.log(data.model[0].members)

        const bottomNavArray = []
        const playerList = []
        const totalPlayerList = []
        let count = 1

        for (var i = 0; i < data.model[0].members.length; i ++) {

            totalPlayerList.push(data.model[0].members[i])

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
                        userSocket={this.state.socketAddress} 
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
                        users={this.state.allPlayers} userSocket = {this.state.socketAddress}
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