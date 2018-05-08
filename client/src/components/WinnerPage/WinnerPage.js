import React, { Component } from "react";
import API from "../../utils/API";

const WinnerPage = props => (
  <div className="winnerScreen-component">
    <h2>Winner!</h2>
  </div>
)

// class WinnerPage extends Component {
// 	state = {
// 		members: "",
// 		color: "",
// 		judge: false,
// 	}

// 	componentDidMount = () => {
// 		console.log("mounted");
// 	}

// 	handleInputChange = event => {
//         const { name, value } = event.target;
//         this.setState({
//             [name]: value
//         });
//     };

//   checkURL = () => {
//     API.checkSessionUrl(this.state.url)
//     .then(res => { 
//       let sessionMembers = res.data[0].members
//       this.setState({members: sessionMembers}, function() {
//         console.log(this.state.members)
//       });
//     });
//   }

// 	render() {
// 		return (
// 			<div className="winnerScreen-component">
// 				<h2>Winner!</h2>
//       </div>
// 			);
// 	}
// }

export default WinnerPage;