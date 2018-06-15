import React, { Component } from "react";
import ModalInner from "./ModalInner";

class Modal extends Component {

  state = {
    isModalOpen: false
  }

  openModal = () => {
    this.setState({isModalOpen: true})
  }

  closeModal = () => {
    this.setState({isModalOpen: false})
  }

  
  render() {
    return (
      <div>
        <div className={this.props.className} id={this.props.id} onClick={this.openModal}>{this.props.text}</div>

        <ModalInner isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}
          title={this.props.modalTitle} p1={this.props.modalInstructions1} p2={this.props.modalInstructions2} p3={this.props.modalInstructions3}>
        </ModalInner>
      </div>

    )
  }
}


export default Modal;