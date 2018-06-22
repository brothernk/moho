import React from "react";

class Timer extends React.Component {

  state = {
    timeRemaining: 0
  }

  componentDidMount = () => {
    let timer = sessionStorage.getItem("timer")
    this.setState({timeRemaining: timer}, function() {
      this.countdown();
    })

  }

  countdown = () => {
      let number = this.state.timeRemaining;
      setInterval(() => {
        if (this.state.timeRemaining > 0) {
          number--;
          this.setState({timeRemaining: number}, function() {
            sessionStorage.setItem("timer", number)
          });
        } 
        else {
          sessionStorage.setItem("timer", 45)
          this.props.outOfTime("outOfTime", true)
          this.props.outOfTime("showTimer", false)
        }
        }, 1000)  
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