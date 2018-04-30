import React from "react";

const BottomNav = props => (
	<nav className="navbar navbar-default navbar-fixed-bottom">
		<div className="container">
			<span>
				<span class="fa-stack fa-3x">
					<i class="fas fa-circle">{props.color}</i>
					<strong class="fa-stack-1x" id="username">M {props.username}</strong>
				</span>
				<p className="userScore"><i class="fas fa-trophy"></i> 0 {props.userScore}</p>
				<i class="fas fa-home"></i>
			</span>
		</div>
	</nav>
);

export default BottomNav;