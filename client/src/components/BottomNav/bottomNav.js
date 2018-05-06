import React from "react";
// import { Link } from 'react-router-dom'

const BottomNav = props => (
	<nav className={props.class}>
		<div className="content-holder">
			{/* This will get deleted */}
			{/* <span className="user-initial" style={{background:props.userColor}}>{props.userName.charAt(0)}</span>
			<p className="userScore"><i className="fas fa-trophy"></i> {props.userScore}</p> */}
			<i onClick={props.expand} className="fas fa-bars home-button"></i>
		</div>
		{props.children}
	</nav>
);

export default BottomNav;