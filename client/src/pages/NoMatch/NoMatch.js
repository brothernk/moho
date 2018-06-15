import React, { Component } from "react";
import BackBtn from "../../components/Buttons/backButton";

class NoMatch extends Component {

    render() {
        return (
            <div>
                <p id="not-a-session">This is not a valid session. Please enter a room key, or create a new game.</p>
                <BackBtn></BackBtn>
            </div>

        );
    }
}

export default NoMatch;