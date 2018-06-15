import React, { Component } from "react";
import ModalButton from "../Buttons/modalButton";

class ModalInner extends Component {

    state = {
        modal:  {
            position: 'absolute',
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex:"9999",
        },
        background: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: '0px',
            left: '0px',
            zIndex: '9998',
        }
    }


    render() {
        return (
            <div>
                {this.props.isOpen ?  
                    <div className="modal-background" style={this.state.background}>
                        <div className="modal-style" style={this.state.modal}>
                            <h1 className="modal-title">{this.props.title}</h1>
                            <div className="modal-text">
                                <p className="modal-p">{this.props.p1}</p>
                                <p className="modal-p">{this.props.p2}</p>
                                <p className="modal-p">{this.props.p3}</p>
                            </div>
                            <ModalButton onClick={this.props.onClose}></ModalButton>
                        </div>
                    </div>
                : null }
            </div>
        )
    }
    
}

export default ModalInner;