import React from "react";

export const ModalButton = props => (
    <span onClick={props.onClick} className="modal-btn">
        <i className="fas fa-check"></i>
    </span>
);

export default ModalButton;