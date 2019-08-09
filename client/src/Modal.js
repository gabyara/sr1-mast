
import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

class ModalPage extends Component {
state = {
  modal: false
}

toggle = () => {
  this.setState({
    modal: !this.state.modal
  });
}

render() {
  return (
    <MDBContainer>
      <MDBBtn onClick={this.toggle}>Modal</MDBBtn>
      <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
        <MDBModalHeader toggle={this.toggle}>Sopote</MDBModalHeader>
        <MDBModalBody>
  
    <div class="modal-content">
     
      <div class="modal-body mx-3">
        <div class="md-form mb-5">
          <i class="fas fa-user prefix grey-text"></i>
          <input type="text" id="form34" class="form-control validate"></input>
          <label data-error="wrong" data-success="right" for="form34">Your name</label>
        </div>

        <div class="md-form mb-5">
          <i class="fas fa-envelope prefix grey-text"></i>
          <input type="email" id="form29" class="form-control validate"></input>
          <label data-error="wrong" data-success="right" for="form29">Your email</label>
        </div>

        <div class="md-form mb-5">
          <i class="fas fa-tag prefix grey-text"></i>
          <input type="text" id="form32" class="form-control validate"></input>
          <label data-error="wrong" data-success="right" for="form32">Subject</label>
        </div>

        <div class="md-form">
          <i class="fas fa-pen-square"></i>
          <textarea type="text" id="form8" class="md-textarea form-control" rows="4"></textarea>
        
        </div>

      </div>
    </div>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={this.toggle}>Cancelar</MDBBtn>
          <MDBBtn color="primary">Enviar</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
    );
  }
}

export default ModalPage;