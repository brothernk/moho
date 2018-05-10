import React from "react";

class Timer extends React.Component {

  state = {
    timeRemaining: 45
  }

  componentDidMount = () => {
    this.countdown();
  }

  countdown = () => {
    this.state.timeRemaining = 45;
    let number = this.state.timeRemaining;
    let i;
    setInterval(() => {
      if (this.state.timeRemaining > 0) {
        number--;
        this.setState({
              timeRemaining: number
            });
      } else {
        this.props.outOfTime("outOfTime", true)
        this.props.outOfTime("showTimer", false)
      }
      }, 1000)
  }

render() {
  return (
    <span>{this.state.timeRemaining}</span>
    )
  }
}

export default Timer;