import React from "react";

export const Enter = props => (
    <div>
        <div className="enter-game">
            <div className="enter-key">Enter Your Room Key</div>
            <input type="text"{...props}/>
        </div>
    </div>
)