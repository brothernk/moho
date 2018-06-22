import React from "react";

class Timer extends React.Component {

  state = {
    timeRemaining: 0
  }

  componentDidMount = () => {
    this.countdown();
  }

  countdown = () => {
    this.setState({timeRemaining: 45000}, function() {
      let number = this.state.timeRemaining;
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
    })
    
  }

render() {
  return (
    <div>
      <i id="timer-icon" className="fas fa-stopwatch"></i>
      <span className="loading-screen-timer">{this.state.timeRemaining}</span>
    </div>
    )
  }
}

export default Timer;