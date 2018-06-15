import React, { Component } from "react";
import BackBtn from "../../components/Buttons/backButton";

class NoMatch extends Component {

    backFunction = () => {
        window.location.href="/";
    }

    render() {
        return (
            <div>
                <p id="not-a-session">This is not a valid session. Please enter a room key, or create a new game.</p>
                <BackBtn onClick={this.backFunction}></BackBtn>
            </div>

        );
    }
}

export default NoMatch;