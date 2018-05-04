import React from "react";
import { Link } from 'react-router-dom'

const BottomNav = props => (
	<nav className="bottom-nav">
		<div className="content-holder">
		<span className="user-initial" style={{background:props.userColor}}>{props.userName.charAt(0)}</span>
		<p className="userScore"><i className="fas fa-trophy"></i> {props.userScore}</p>
		<Link to="/"><i className="fas fa-home home-button"></i></Link>
		</div>
	</nav>
);

export default BottomNav;