import React from "react";

const BottomNav = props => (
	<nav className="navbar navbar-default navbar-fixed-bottom">
		<div className="container">
			<span>
				<span className="fa-stack fa-3x">
					<i className="fas fa-circle">{props.color}</i>
					<strong className="fa-stack-1x" id="username">M {props.username}</strong>
				</span>
				<p className="userScore"><i className="fas fa-trophy"></i> 0 {props.userScore}</p>
				<i className="fas fa-home"></i>
			</span>
		</div>
	</nav>
);

export default BottomNav;