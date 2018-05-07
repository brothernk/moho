import React from "react";
// import { Link } from 'react-router-dom'

const BottomNav = props => (
	<nav className={props.class}>
		<div className="content-holder">
			{/* This will get deleted */}
			<i onClick={props.expand} className="fas fa-bars home-button"></i>
		</div>
		{props.children}
	</nav>
);

export default BottomNav;