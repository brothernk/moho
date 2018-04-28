import React from "react";

export const Profile = props => (
    <div>
        <div className="setup-profile">
            <div className="enter-profile">Setup Your Profile</div>
            <input type="text"{...props} placeholder="Enter Name"/>
        </div>
        <div className="setup-color">
            <div className="enter-color">Pick a Color</div>
        </div>
        <div className="setup-color-buttondiv">
            <span id="yellow-prof" className="btn color-btn"></span>
            <span id="blue-prof" className="btn color-btn"></span>
            <span id="red-prof" className="btn color-btn"></span>
            <span id="pink-prof" className="btn color-btn"></span>
            <span id="green-prof" className="btn color-btn"></span>
            <span id="orange-prof" className="btn color-btn"></span>
            <span id="purple-prof" className="btn color-btn"></span>
            <span id="charcoal-prof" className="btn color-btn"></span>
        </div>
    </div>
);
