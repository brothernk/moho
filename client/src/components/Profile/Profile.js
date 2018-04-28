import React from "react";

export const Profile = props => (
    <div>
        <div className="setup-profile">
            <div className="enter-profile">Setup Your Profile</div>
            <input type="text"{...props}/>
        </div>
        <div className="setup-color">
            <div className="enter-color">Pick a Color</div>
        </div>
    </div>
);
