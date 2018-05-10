import React, { Component } from "react";
import API from "../../utils/API";

class WinnerPage extends Component {
  state = {
    judge: "",
    gif: "",
    winner: "",
    userJudge: ""
  }

	componentDidMount = () => {
    console.log("mounted");

    this.setState({gif: this.props.winner.gif})
    this.setState({winner: this.props.winner.member.name})
    this.setState({judge: this.props.judge})
    this.setState({userJudge: this.props.userJudge})
  }
  
  componentDidUpdate = () => {

    if (this.props.winner.member.name !== this.state.winner) {
      this.setState({winner: this.props.winner.member.name})
    }

    if (this.props.winner.gif !== this.state.gif) {
      this.setState({gif: this.props.winner.gif})
    }

    if (this.props.judge !== this.state.judge) {
      this.setState({judge: this.props.judge})
    }

    if (this.props.userJudge !== this.state.userJudge) {
      this.setState({userJudge: this.props.userJudge})
    }
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

        <p className="judge">Judge: {this.state.judge}</p>

        <h6>{this.props.theme}</h6>
        <h4>{this.props.category}</h4>

				<h1>Winner: {this.state.winner}!!!</h1>

        <div>
          <img src={this.state.gif} />
        </div>

      </div>
			);
	}
}

export default WinnerPage;