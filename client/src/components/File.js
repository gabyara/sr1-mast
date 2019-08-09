import React, { Component } from 'react';
import filePic from "../Img/file.svg";
import { Container, Row, Col } from 'reactstrap';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
  MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";

class File extends Component {
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
        <div className="element" >
          <Row>
          
              <MDBDropdown className="menuPic" >
                <MDBDropdownToggle nav caret>
                <MDBIcon icon="bars" /> 
                  
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default SubMenu">
                <MDBDropdownItem  href="#!">Eliminar</MDBDropdownItem>
              <MDBDropdownItem href="#!">Renombrar</MDBDropdownItem>
              <MDBDropdownItem href="#!">Mover</MDBDropdownItem>
              <MDBDropdownItem href="#!">Descargar</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
              
          </Row>
          <div className="clickeable">
            <Row>
              <img className="fileIcon" src={filePic} width="80px" alt="File"></img>
            </Row>
            <Row >
              <p className="textElement" width="60px">{this.props.labelFile}</p>
            </Row>
          </div>
        </div>
      );
    }
  }
  
  export default File;
  