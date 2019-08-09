import React from 'react';
import './css/App.css';
import Planes from './Planes';
import Principal from './Principal';
import Encriptado from './Img/Encriptado.jpg';
import Dispositivos from './Img/Dispositivos.png';
import Disponibilidad from './Img/Disponibilidad.png';
import Almacenamiento from './Img/Almacenamiento.jpg';
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
                  <MDBNavItem >
                    <MDBNavLink to="/Principal">Home</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem active>
                    <MDBNavLink to="#">Our service</MDBNavLink>
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
            <Route path="/Planes/" component={Planes} />
            <Route path="/Principal/" component={Principal} />
          </Router>

          <MDBView src="https://mdbootstrap.com/img/Photos/Others/img%20(42).jpg">
            <MDBMask overlay="purple-light" className=" flex-column text-white text-center">
              <h2 style={{marginTop: '10%'}}>We care about your confidence and security when storing your documents. <br></br>With us, you will always have guaranteed:</h2>
             
             

              <div class="card" >
                <div class="view overlay">
                  <img class="card-img-top" style={{width:'250px',height:'165px'}} src={Encriptado} alt="Card image cap"></img>
                  <a href="#!">
                    <div class="mask rgba-white-slight"></div>
                  </a>
                </div>

                <div class="card-body">


                  <h4 class="card-title"  style={{color: '#aa98cc'}} >Privacy</h4>
                
                  <p class="card-text">Dispondras de un espacio de almacenamiento de hasta 1G.</p>
                  
                </div>
              </div>
              <div class="card" >
                <div class="view overlay">
                  <img class="card-img-top"  src={Disponibilidad} alt="Card image cap"></img>
                  <a href="#!">
                    <div class="mask rgba-white-slight"></div>
                  </a>
                </div>

                <div class="card-body">


                  <h4 class="card-title"  style={{color: '#aa98cc'}} >Customer Support</h4>
                
                  <p class="card-text">Dispondras de un espacio de almacenamiento de hasta 1G.</p>
                  
                </div>
              </div>
              <div class="card" >
                <div class="view overlay">
                  <img class="card-img-top" src={Dispositivos} alt="Card image cap"></img>
                  <a href="#!">
                    <div class="mask rgba-white-slight"></div>
                  </a>
                </div>

                <div class="card-body">


                <h4 class="card-title"  style={{color: '#aa98cc'}} >On all devices</h4>
                  <p class="card-text">Dispondras de un espacio de almacenamiento de hasta 10G.</p>
                  
                </div>
              </div>
              <div class="card" >
                <div class="view overlay">
                  <img class="card-img-top" src={Almacenamiento} alt="Card image cap"></img>
                  <a href="#!">
                    <div class="mask rgba-white-slight"></div>
                  </a>
                </div>

                <div class="card-body">


                <h4 class="card-title"  style={{color: '#aa98cc'}} >Big storage</h4>
                  
                  <p class="card-text">Dispondras de un espacio de almacenamiento Ilimitado.</p>
                  
                </div>
              </div>

            </MDBMask>
          </MDBView>
        </header>
      </div>
    );
  }
}

export default FullPageIntroWithFixedTransparentNavbar;