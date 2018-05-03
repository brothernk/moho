import React from "react";
import { Link } from 'react-router-dom'

const BottomNav = props => (
	<nav className="bottom-nav">
		<div className="content-holder">

				<span className="fa-stack fa-3x">
					<i className="fas fa-circle" style={{color:props.userColor}}></i>
					<strong className="fa-stack-1x" id="username">{props.userName.charAt(0)}</strong>
				</span>

				<p className="userScore"><i className="fas fa-trophy"></i> {props.userScore}</p>
				<Link to="/"><i className="fas fa-home"></i>/Link>
		</div>
	</nav>
);

export default BottomNav;