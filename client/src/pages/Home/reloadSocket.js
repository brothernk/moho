const reloadSocket = (res, stateChange) => {

    let socketMessageUsername = sessionStorage.getItem("socketMessage")
    let pendingPlayerHeader = ""
    let socketAddress = sessionStorage.getItem("username")
    console.log(socketAddress)
    console.log(socketMessageUsername)
    let userJudge = false;
    let currentJudge = "";

    if ( socketMessageUsername === "useraddedsuccessfullyother" || socketMessageUsername === "useraddedsuccessfullyself" ) {
        pendingPlayerHeader = "Players logged in"
        updateMembers(res, function() {
            if (userJudge) {
                stateChange("pendingPlayerHeader", "Players logged in")
                stateChange("pendingMessage","Click start game when ready to play")
                stateChange("showProfile", false)
                stateChange("showPending", true)
            }
    
            else {
                stateChange("pendingPlayerHeader", "Players logged in")
                stateChange("pendingMessage","Waiting for game to start...")
                stateChange("showProfile", false)
                stateChange("showPending", true)
            }
        })
    }

    if ( socketMessageUsername === "startgameplayer") {
        pendingPlayerHeader = "Players in round"
        updateMembers(res, function() {
            stateChange("pendingPlayerHeader", "Players in round")
            let message = currentJudge + " choosing category..."
            stateChange("pendingMessage", message)
            stateChange("showPending", true)
        })
    }

    if ( socketMessageUsername === "startgamejudge") {
        updateMembers(res, function() {
            stateChange("showJudgeCategory", true)
        })
    }

    if ( socketMessageUsername === "startnextroundplayer") {
        pendingPlayerHeader = "Players in round"
        stateChange("pendingPlayerHeader", "Players in round")
        stateChange("gifsReturned", [])
        stateChange("outOfTime", false)
        updateMembers(res, function() {
            let message = currentJudge + " choosing category..."
            stateChange("pendingMessage", message)
            stateChange("showPending", true)
        })

    }

    if ( socketMessageUsername === "startnextroundjudge") {
        stateChange("gifsReturned", [])
        stateChange("outOfTime", false)
        updateMembers(res, function() {
            stateChange("showJudgeCategory", true)
        })
    }

    if ( socketMessageUsername === "categorytheme selected player") {
        stateChange("selectedTheme", sessionStorage.getItem("selectedTheme"))
        stateChange("selectedCategory", sessionStorage.getItem("selectedCategory"))
        updateMembers(res, function() {
            stateChange("showGiphySearch", true)
            stateChange("showTimer", true)
        })
    }

    if ( socketMessageUsername === "categorytheme selected judge") {
        pendingPlayerHeader = "Players choosing gifs"
        stateChange("selectedTheme", sessionStorage.getItem("selectedTheme"))
        stateChange("selectedCategory", sessionStorage.getItem("selectedCategory"))
        stateChange("pendingMessage", "Players choosing gifs")
        stateChange("pendingPlayerHeader", "Players done with challenge")
        updateMembers(res, function() {
            stateChange("showTimer", true)
            stateChange("showPending", true)
        })
    }

    if ( socketMessageUsername === "playeroutoftimereturned") {
        let gifsReturned = JSON.parse(sessionStorage.getItem("gifsReturned"))
        stateChange("gifsReturned", gifsReturned)
        stateChange("selectedTheme", sessionStorage.getItem("selectedTheme"))
        stateChange("selectedCategory", sessionStorage.getItem("selectedCategory"))
        stateChange("pendingMessage", "Players choosing gifs")
        stateChange("pendingPlayerHeader", "Players done with challenge")
        updateMembers(res, function() {
            stateChange("showPending", true)
            stateChange("outOfTime", true)
            stateChange("showTimer", false)
            stateChange("showJudgeChoices", true)
        })
    }

    if ( socketMessageUsername === "playerchosenreturned") {
        let gifsReturned = JSON.parse(sessionStorage.getItem("gifsReturned"))
        stateChange("gifsReturned", gifsReturned)
        stateChange("selectedTheme", sessionStorage.getItem("selectedTheme"))
        stateChange("selectedCategory", sessionStorage.getItem("selectedCategory"))
        stateChange("pendingMessage", "Players choosing gifs")
        stateChange("pendingPlayerHeader", "Players done with challenge")
        updateMembers(res, function() {
            stateChange("showPending", true)
            stateChange("outOfTime", true)
            stateChange("showTimer", false)
            stateChange("showJudgeChoices", true)
        })
    }

    if ( socketMessageUsername === "revealgifsjudge") {
        let gifsReturned = JSON.parse(sessionStorage.getItem("gifsReturned"))
        stateChange("gifsReturned", gifsReturned)
        stateChange("selectedTheme", sessionStorage.getItem("selectedTheme"))
        stateChange("selectedCategory", sessionStorage.getItem("selectedCategory"))
        updateMembers(res, function() {
            stateChange("showGifReveal", true)
        })
    }

    if ( socketMessageUsername === "revealgifsplayer") {
        let gifsReturned = JSON.parse(sessionStorage.getItem("gifsReturned"))
        stateChange("gifsReturned", gifsReturned)
        stateChange("selectedTheme", sessionStorage.getItem("selectedTheme"))
        stateChange("selectedCategory", sessionStorage.getItem("selectedCategory"))
        updateMembers(res, function() {
            stateChange("showGifReveal", true)
        })
    }

    function updateMembers(data, callback) {
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

            if (members[i].ip === socketAddress) {
                stateChange('userName', members[i].name)
                stateChange('userScore', members[i].score)
                stateChange('userColor', members[i].color)
                stateChange('userJudge', members[i].judge)
                
                if (members[i].judge) {
                    userJudge = true
                }

            }
            
            else {
                bottomNavArray.push(members[i])
            }

            if ( pendingPlayerHeader === "Players logged in") {
                playerList.push(members[i])
            }

            else {
                if (members[i].judge === false) {
                    playerList.push(members[i])
                }
            }

            if (members[i].judge) {
                currentJudge = members[i].name
                stateChange('currentJudge', members[i].name)
            }

            if (count === members.length) {
                stateChange('allPlayer', totalPlayerList)
                stateChange('playerList', playerList)
                stateChange('BottomNavPlayerList', bottomNavArray)
            }

            count ++ 
        }
        callback()
    }
}
    









export default reloadSocket;