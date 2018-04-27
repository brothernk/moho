import React from "react";

export const Enter = props => (
    <div>
        <div className="input-group input-group-sm">
            <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-sm">Game Keyword</span>
            </div>
            <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" {...props}/>
        </div>
    </div>
)