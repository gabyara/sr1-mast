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
paste = async () => {
  console.log("paste")

    var path = "nodes";
    path = this.search(path, this.state.nodes, this.state.here);
    let flagFolderHome = false;
    console.log("path",path)
    path = path.replace("['value']","");
    path = path.replace("nodes,0,","");
    if(path.includes('nodes,0')){
      flagFolderHome=true;
    }
    console.log("path2",path)
    var auxSubPaths= path.split(',')
    console.log("auxSubPaths",auxSubPaths)
    var subPaths = ""
    var x=0;
     for(var i=0; i<auxSubPaths.length;i++){
      if(/^\d+$/.test(auxSubPaths[i+1])){
        if(i===0){
          subPaths=auxSubPaths[i]+"["+auxSubPaths[i+1]+"]"
        }else{
          subPaths=subPaths+"."+auxSubPaths[i]+"["+auxSubPaths[i+1]+"]"
        }      
        i++;
        x++;
      } //if string is num
     }

      //var data = this.state.nodes[0];
      var data = JSON.stringify(this.state.nodes);
      console.log("DATAAA",data)
      console.log("PORTAPEEELLL",this.state.portaPapel)
      console.log("subpth", subPaths)
      var data2 = JSON.parse(data);
      console.log("DATA22",data2)
      var here2;
      if(flagFolderHome){
        eval("data2[0].children[data2[0].children.length]= this.state.portaPapel")
        eval ("this.setState({here:data2[0]})")
      }else{
        eval("data2[0]."+subPaths+".children[data2[0]."+subPaths+".children.length]= this.state.portaPapel")
        eval("this.setState({here:data2[0]."+subPaths+"})")
      }
      console.log(data2)
      //await this.setState({here:here2})
      console.log("HEREE 22",this.state.here)
      await this.setState({nodes:data2})
      console.log("NODEESSS UPD", this.state.nodes)

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
              <MDBDropdownItem href="#!">Copiar</MDBDropdownItem>
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
  