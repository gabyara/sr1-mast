import React, { Component } from 'react';
import folderPic from "../Img/folder.svg";

import { Container, Row, Col } from 'reactstrap';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
  MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact"; 

class Folder extends Component {
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
  clickCard= () => {
    this.props.changeHere(this.props.children);
  }
  render() {
      return (
        <div className=" element" onClick={this.clickCard}>
        <Row>
          
          <MDBDropdown className="menuPic" >
            <MDBDropdownToggle nav caret>
            <MDBIcon icon="bars" /> 
              
            </MDBDropdownToggle>
            <MDBDropdownMenu className="dropdown-default SubMenu">
              <MDBDropdownItem  href="#!">Eliminar</MDBDropdownItem>
              <MDBDropdownItem href="#!">Renombrar</MDBDropdownItem>
              <MDBDropdownItem href="#!">Mover</MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
          
      </Row>
          <div className="clickeable">
            <Row>
              <img className="folderIcon" src={folderPic} width="80px" alt="Folder"></img>
            </Row>
            <Row>
              <p className="textElement" width="60px">{this.props.labelFile}</p>
            </Row>
          </div>
        </div>
      );
    }
  }
  
  export default Folder;
  