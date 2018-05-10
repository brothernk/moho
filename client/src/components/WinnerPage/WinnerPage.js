import React, { Component } from "react";
import API from "../../utils/API";

class WinnerPage extends Component {
  state = {
    judge: "",
    winner: [],
  }

	componentDidMount = () => {
		console.log("mounted");
	}

  // Users color is this.state.winner.member.color

	render() {
		return (
			<div className="winnerScreen-component">
        {/* Button to start next round */}
        <div className="pull-themes-btn">
          <span className="btn">
          { this.state.userJudge ? 
            <p className="judge-start" onClick={this.startGame}>Start Next Round!</p>
          : null}
          </span>
        </div>

				<h1>Winner: {this.state.winner.member.name}!!!</h1>

        <div>
          <img src={this.state.winner.gif} />
        </div>

        <h6>{this.props.theme}</h6>
        <h4>{this.props.category}</h4>
      </div>
			);
	}
}

export default WinnerPage;