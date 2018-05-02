import React, { Component } from "react";
import axios from "axios"
import { SignupBtn, LoginBtn, EnterBtn } from "../../components/Buttons";
import { Enter } from "../../components/Enter";
import API from "../../utils/API"
import mnGen from "mngen"

class Login extends Component {

    state = {
        randomWord: "",
        randomURL: "",
        enteredWord: "",
        showResults: false,
        showError: false,
        showButton: true
    }

    componentDidMount = () => {
        this.loadSavedSessions()
    }

    generateRandomWord = () => {
        this.setState({showResults: false})
        this.setState({showError: false})
        this.setState({showButton: false})

        let newword = mnGen.word();
        this.setState({randomWord: newword}, function() {
            this.generateRandomURL();
        })
    }

    generateRandomURL = () => {
        var apiURL = "https://makemeapassword.org/api/v1/passphrase/json?pc=1&wc=6&sp=y"
        axios.get(apiURL)
        .then(response => {
            let randomPhrase = response.data.pws[0]
            let randomArray = randomPhrase.split(" ")
            let url = ""
            for (var i = 0; i < randomArray.length; i ++) {
                url += "/" + randomArray[i]
            }
            this.setState({randomURL: url}, function() {
                this.saveSessionData()
                this.printState()
            })    
        })
        .catch(err => console.log(err))
    }

    saveSessionData = () => {
        API.saveSession({
            title: this.state.randomWord,
            url: this.state.randomURL
        })
        .then(res => this.loadSavedSessions())
        .catch(err => console.log(err.response));
    }

    loadSavedSessions = () => {
        API.getSessions()
        .then(res => console.log(res))
        .catch(err => console.log(err.response));
    }

    loginClick = () => {
        this.setState({showResults: true});
    }

    printState = () => {
        console.log(this.state.randomWord)
        console.log(this.state.randomURL)
        console.log(this.state)
    }

    enterGame = () => {
        API.checkSessionTitle(this.state.enteredWord)
        .then(res =>{
            console.log(res.data)
            if (res.data.length < 1) {
                console.log("Not found")
                this.setState({showError: true})
            }

            else {
                let url = res.data[0].url
                let newurl = "/game" + url
                window.location.href = (newurl)
                return false
            }
        })
        .catch(err => console.log(err.response));
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    render() {
        return (
            <div> 
                <SignupBtn onClick={this.generateRandomWord} randomword={this.state.randomWord} 
                showbutton={this.state.showButton.toString()}/>

                { this.state.showError ? 
                    <div> 
                        <p>Session does not exist, double check game keyword or create new game</p>
                    </div>
                : null }

                { this.state.showResults === false ? 
                    <LoginBtn onClick={this.loginClick}/>
                : null}

                { this.state.showResults ? 
                <div>
                    <Enter name="enteredWord" value={this.state.enteredWord} onChange={this.handleInputChange}/> 
                    <EnterBtn onClick={this.enterGame}/> 
                </div>
                : null }
            </div>
        );
    }
}

export default Login;