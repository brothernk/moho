import React, { Component } from "react";
import ModalButton from "../Buttons/modalButton";

class ModalInner extends Component {

    state = {
        modal:  {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: '9999',
            background: '#fff',
            color: 'black',
            padding: '20px',
            'border-radius': '20px'
        },
        background: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: '0px',
            left: '0px',
            zIndex: '9998',
            background: 'rgba(0, 0, 0, 0.3)'
        }
    
    }


    render() {
        return (
            <div>
                {this.props.isOpen ?  
                    <div style={this.state.background}>
                        <div style={this.state.modal}>
                            <h1>{this.props.title}</h1>
                            <p>{this.props.p1}</p>
                            <p>{this.props.p2}</p>
                            <p>{this.props.p3}</p>
                            <ModalButton onClick={this.props.onClose}></ModalButton>
                        </div>
                    </div>
                : null }
            </div>
        )
    }
    
}

export default ModalInner;