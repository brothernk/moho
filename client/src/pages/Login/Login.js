import React, { Component } from "react";
import axios from "axios"
import { SignupBtn, LoginBtn } from "../../components/Buttons";
import API from "../../utils/API"

class Login extends Component {

    state = {
        randomWord: "",
        randomURL: ""
    }

    generateRandomWord = () => {

        var apiURL = "http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=false&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"
        axios.get(apiURL)
        .then(response => {
            this.setState({randomWord: response.data.word});
            this.generateRandomURL();
        })
        .catch(err => console.log(err))

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
            this.setState({randomURL: url})
            this.saveSessionData()
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

    printState = () => {
        console.log(this.state.randomWord)
        console.log(this.state.randomURL)
    }

    render() {
        return (
            <div> 
                <SignupBtn onClick = {this.generateRandomWord}/>
                <LoginBtn />
            </div>
        );
    }
}

export default Login;