import React from 'react';
import './css/App.css';
import Planes from './Planes';
import Services from './Services';
import Carrusel from './Carrusel';

import FaceLogin from './components/FaceLogin';
import { MDBIcon, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter,MDBBtn, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBContainer, MDBMask, MDBView } from 'mdbreact';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class FullPageIntroWithFixedTransparentNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
    };
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }
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
      <div>
        <header>
          <Router>
            <MDBNavbar color="bg-primary" fixed="top" dark expand="md" scrolling transparent>
              <MDBNavbarBrand href="#">
                <strong>Navbar</strong>
              </MDBNavbarBrand>
              {!this.state.isWideEnough && <MDBNavbarToggler onClick={this.onClick} />}
              <MDBCollapse isOpen={this.state.collapse} navbar>
                <MDBNavbarNav left>
                  <MDBNavItem active>
                    <MDBNavLink to="#">Home</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="/Services">Our service</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="/Planes">Plans</MDBNavLink>
                  </MDBNavItem>
                </MDBNavbarNav>
                <MDBNavbarNav right>
                  <MDBNavItem >
                  <MDBNavLink onClick={this.toggle} className="waves-effect waves-light" to="#!">
                 LogIn con facebook
                <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                  <MDBModalHeader className="Titulo" toggle={this.toggle}>LogIn</MDBModalHeader>
                  <MDBModalBody>
                  <div class="modal-body mx-3">
                    <div class="md-form mb-5">
                      <i class="fas fa-envelope prefix grey-text"></i>
                      <input type="email" id="defaultForm-email" class="form-control validate"></input>
                      <label data-error="wrong" data-success="right" for="defaultForm-email">Your email</label>
                    </div>
                    <div class="md-form mb-4">
                      <i class="fas fa-lock prefix grey-text"></i>
                      <input type="password" id="defaultForm-pass" class="form-control validate"></input>
                      <label data-error="wrong" data-success="right" for="defaultForm-pass">Your password</label>
                    </div>
                  </div>
                  <div class="modal-footer d-flex justify-content-center">
                    <button class="btn btn-default " className= "boton">Login</button>
                  </div>
                  <p className="Titulo or" >or</p>
                  <div class=" justify-content-center"  ><FaceLogin/></div>
                  </MDBModalBody>
                </MDBModal>
              </MDBNavLink>
                  </MDBNavItem>
                  </MDBNavbarNav>
              </MDBCollapse>
            </MDBNavbar>      
                <Route path="/Planes" exact component={Planes} />
                <Route path="/Services" exact component={Services} />
          </Router>
          <MDBView src="https://mdbootstrap.com/img/Photos/Others/img%20(42).jpg">
            <MDBMask overlay="purple-light" className=" flex-column text-white text-center">
            <Carrusel/>
            </MDBMask>
          </MDBView>
        </header>
      </div>
    );
  }
}

export default FullPageIntroWithFixedTransparentNavbar;