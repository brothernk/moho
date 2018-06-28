import React, { Component } from "react";
import BackBtn from "../../components/Buttons/backButton";
import MiniLogo from "../../components/Logo/MiniLogo";

class NoMatch extends Component {

    backFunction = () => {
        window.location.href="/";
    }

    render() {
        return (
            <div>
                <MiniLogo></MiniLogo>
                <p id="not-a-session">This is not a valid session. Please enter a room key, or create a new game.</p>
                <BackBtn onClick={this.backFunction}></BackBtn>
            </div>

        );
    }
}

export default NoMatch;