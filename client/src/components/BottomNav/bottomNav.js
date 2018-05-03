import React from "react";

const BottomNav = props => (
	<nav className="navbar navbar-default navbar-fixed-bottom">
		<div className="container">
			<span>

				<span className="fa-stack fa-3x">
					<i className="fas fa-circle" style={{color:props.userColor}}></i>
					<strong className="fa-stack-1x" id="username">{props.userName.charAt(0)}</strong>
				</span>

				<p className="userScore"><i className="fas fa-trophy"></i> {props.userScore}</p>
				<i className="fas fa-home"></i>
			</span>
		</div>
	</nav>
);

export default BottomNav;