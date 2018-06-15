import React, { Component } from "react";
import ModalTest from "./ModalTest";

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
        <span className="btn enter-btn" onClick={this.openModal}>
          Enter Game
        </span>

        <ModalTest isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}
          title="Modal Title" text="Modal text">
        </ModalTest>
      </div>

    )
  }
}


export default Modal;