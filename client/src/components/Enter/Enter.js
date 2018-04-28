import React from "react";

export const Enter = props => (
    <div>
        <div className="enter-game">
            <div className="roomkey">Enter Your Room Key</div>
            <input type="text"{...props}/>
        </div>
    </div>
    // <div>
    //     <div className="input-group input-group-sm" id="enter-roomkey">
    //         <div className="input-group-prepend">
    //             <span className="input-group-text" id="inputGroup-sizing-sm">Enter Your Room Key</span>
    //         </div>
    //         <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
    //     </div>
    // </div>
)