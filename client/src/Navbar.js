import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import './css/App.css';
import './Modal.js';

class NavbarPage extends Component {
  state = {
    isOpen: false,modal: false
    
  };  

toggle = () => {
  this.setState({
    modal: !this.state.modal
  });
}

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

render() {
  return (
    <Router>
      <MDBNavbar className="Color" dark expand="md">
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          
          <MDBNavbarNav right >
          <MDBNavItem>
              <MDBNavLink onClick={this.toggle} className="waves-effect waves-light" to="#!">
                <MDBIcon  icon="fas fa-envelope" /> Support
                <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                  <MDBModalHeader className="Titulo" toggle={this.toggle}>Support</MDBModalHeader>
                  <MDBModalBody>
                  
                    <div class="modal-content">
                    
                      <div class="modal-body mx-2">
                        <div class="md-form mb-3">
                          <i class="fas fa-user prefix grey-text"></i>
                          <input type="text" id="form34" class="form-control validate"></input>
                          <label data-error="wrong" data-success="right" for="form34">Your name</label>
                        </div>

                        <div class="md-form mb-3">
                          <i class="fas fa-envelope prefix grey-text"></i>
                          <input type="email" id="form29" class="form-control validate"></input>
                          <label data-error="wrong" data-success="right" for="form29">Your email</label>
                        </div>

                        <div class="md-form mb-3">
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
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem >
              <MDBDropdown >
                <MDBDropdownToggle nav caret>
                  <MDBIcon icon="user" /> Profile
                  
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default SubMenu">
                  <MDBDropdownItem  href="#!">Edit profile</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Close session</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    </Router>
    );
  }
}

export default NavbarPage;

