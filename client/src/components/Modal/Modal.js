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
          title={this.props.modalTitle} text={this.props.modalInstructions}>
        </ModalInner>
      </div>

    )
  }
}


export default Modal;