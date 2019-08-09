import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter , Form, FormGroup, Label, Input, FormText  } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import './css/App.css';
import Navbar from './Navbar';
import File from "./components/File"
import Folder from "./components/Folder"
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { MDBProgress } from 'mdbreact';

let aes256 = require('aes256');

class App extends Component {
  state = {
    childrens: [],
    aux:"aux",
    modalNewFolder: false,
    checked: [],
    expanded: [],
    key: "my passphrase;",
    here: {},
    nodes :[{
      value: 'mars',
      label: 'Home',
      children: [
        { 
        value: 'phobos', 
        label: 'Phobos' 
        },
        { 
         value: 'deimos', 
         label: 'Deimos' ,
         children: [
          { 
          value: 'phobos', 
          label: 'Phobos' 
          },
          { 
           value: 'deim', 
           label: 'Deim' ,
           children: [
            { 
            value: 'phobos', 
            label: 'Phobos' 
            },
            { 
             value: 'deimo', 
             label: 'Deimos3',
             children: []
             
            }
          ]
           
          }
        ]
        }
      ]
    }]
  };
  componentWillMount() {
    console.log("this.state.nodes[0]")
    this.setState({here:this.state.nodes[0]});
  }

  componentDidMount() {
    // console.log(JSON.stringify(this.state.nodes[0]))
    // fetch('api/prueba', { // Your POST endpoint
    //   method: 'POST',
    //   headers: {'Content-Type': 'application/json'},
    //   body: JSON.stringify(this.state.nodes)
    //   })
    //   .then((response) => response.json())
    //   .then((data) => {console.log(data)})
    //   .catch(function() {
    //     console.log("error in post data");
    //   });
    
   
  }

 sendJson = () => {
  fetch('api/createFolder', { // Your POST endpoint
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(this.state.nodes)
    })
    .then((response) => response.json())
    .then((data) => {console.log(data)})
    .catch(function() {
      console.log("error in post data");
    });

 }

 search = (path, obj, target) => {
    for (var k in obj) {
      //console.log("k",k)
        if (obj.hasOwnProperty(k))//si esta el atributo k en el objeto
            if (obj[k] === target)
                return path + "," + k 
            else if (typeof obj[k] === "object") {
                var result = this.search(path + "," + k , obj[k], target);
                if (result)
                    return result;
            }
    }
    return false;
}

  clickInLoad = () => {
    document.getElementById("inputUpload").click();
    let UpdFile = document.getElementById("inputUpload");
    UpdFile.addEventListener('change',this.handleFileSelect, false);
  }

  callFile = async () => {
    const response = await fetch('/api/getFile');
    const body = await response.blob();
    if (response.status !== 200) throw Error(body.message);
    let key = "my passphrase;"
    let fileReader = new FileReader();
 
    fileReader.onloadend = function (e){

      let content = aes256.decrypt(key,fileReader.result);
      console.log("contentdes", content);
      var fileDown =[];
      var filename = "pruba.pdf";
      fileDown[0]=content;
      fileDown[1]=filename;
      
      fetch('api/postForDownload', { // Your POST endpoint
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ "file": {
          "content" : content,
          "name" : filename
        }}) // This is your file object
        }).catch(function() {
          console.log("error in post data");
        });
     // download(content,filename,"js");
     
      function download(data, filename, type) {
        var file = new Blob([data], {type: type});
        if (window.navigator.msSaveOrOpenBlob) // IE10+
            window.navigator.msSaveOrOpenBlob(file, filename);
        else { // Others
            var a = document.createElement("a"),
                    url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);  
            }, 0); 
        }
    
      }

    }
    fileReader.readAsText(body);
  };

  handleFileSelect = (evt) => {
    if(evt.target.files.length>0){
      var files = evt.target.files; // FileList object
      console.log("llamo")
      this.postContentFile(files);
      
    }
  }
  postContentFile = async (files) =>{
    let flagError=false;
    
      var formData = new FormData();
      //formData.set('files', files);
      console.log("entro", formData)
      formData.append('files', files[0]);
      fetch('api/postContentFile', { // Your POST endpoint
      method: 'POST',
      body: formData // This is your file object
      }).catch(function() {
        console.log("error in post data");
        flagError=true;
      });
    
    this.getContentFile(files,flagError);
  }

  getContentFile = async (files,flagError) =>{
    const response = await fetch('api/getContentFile?name='+files[0].name).catch(function() {
			console.log("error in get files");
			flagError=true;
			});
			if(!flagError){
			let json = await response.json();

				setTimeout(() => {
          var filename = files[0].name;
          console.log("json",json)

          var key = "my passphrase;"
          // var contentEncrypted = aes256.encrypt(key, contentString);
          var contentEncrypted = aes256.encrypt(key, json)
          var nameEncrypted = aes256.encrypt(key, filename);
          //nameEncrypted = nameEncrypted.toString().replace(":", "\/");
          //
          /* create file encrypt */
          var fileEncrypted = new File([contentEncrypted], nameEncrypted);
          console.log("fileEncrypted",fileEncrypted);
          var formData = new FormData();
          //formData.set('files', files);
          formData.append('files', fileEncrypted);
          fetch('api/file', { // Your POST endpoint
            method: 'POST',
            body: formData // This is your file object
          })

				}, 500);
			}
  }

  selected = (clicked) => {
    if(clicked.isParent){
      this.setState({childrens:clicked.children});
      var objHere = {}
      for (var i =0; i<clicked.parent.children.length; i++){
        if (clicked.parent.children[i].value === clicked.value){ //find parent element
          objHere=clicked.parent.children[i].value;
        }
      }
      this.setState({here:objHere});
    }else{
      console.log("hoja")
    }
  }

  clickInNewFolder= () => {
    this.setState(prevState => ({
      modalNewFolder: !prevState.modalNewFolder
    }));
  }

  createFolder= () => {
    var newName = document.getElementById("newFolder").value;
    this.setState(prevState => ({
      modalNewFolder: !prevState.modalNewFolder
    }));
    var path = "nodes";
    path = this.search(path, this.state.nodes, this.state.here);
    let newObj = {
      value: aes256.encrypt(this.state.key, newName),
      label: newName,
      children: []
    }
    let flagFolderHome = false;
    console.log("path",path)
    console.log("newobj", newObj)
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

      var data = this.state.nodes[0];
      console.log("subpth", subPaths)
      if(flagFolderHome){
        eval("data.children[data.children.length]= newObj")
      }else{
        eval("data."+subPaths+".children[data."+subPaths+".children.length]= newObj")
      }

  }

  changeHere= (children) => {
    console.log("childrenhere", children)
   this.setState({here:children})
  }

  clickInBefore = () => {
    var path = "nodes";
    path = this.search(path, this.state.nodes, this.state.here);
    let flagHome=false;
    console.log("path",path)

    path = path.replace("['value']","");

    console.log("path2",path)
    var auxSubPaths= path.split(',')
    
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
     console.log("SubPaths",subPaths)
     var arr = subPaths.split(".");
     subPaths=""
     if(arr.length===1){
      flagHome=true;
      alert("Estas en el home")
     }else{
      for(var i = 0; i<arr.length-1; i++){
        if (i===0){
          subPaths = subPaths.concat(arr[i])
        }else{
          subPaths = subPaths.concat("."+arr[i])
        }
      }
      eval("this.setState({here:this.state."+subPaths+"})")
     }
     console.log("SubPaths2",subPaths)
     
  }

  saveJson= (children) => {
    fetch('api/saveJson', { // Your POST endpoint
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.state.nodes)
      })
      .then((response) => response.json())
      .then((data) => {console.log(data)})
      .catch(function() {
        console.log("error in post data");
      });
   }
    
render() {
  const childrenFolder = [];
  const childrenFile = [];
  var flagEmpty = false;

  console.log("here",this.state.here)
    let auxChildren=this.state.here.children;
    for (var i = 0; i < auxChildren.length; i += 1) {
      
      if(typeof auxChildren[i].children !== "undefined") {  // ES PADRE (Carpeta)

        childrenFolder.push(<Col key={i} className="nodeCard " sm="8" md="3"><Folder  number={i}  
          children={auxChildren[i]}labelFile={auxChildren[i].label} 
          valueFile={auxChildren[i].label} changeHere={this.changeHere} /></Col>);
        
        flagEmpty = true;
      }else{//Es un file

        childrenFile.push(<Col key={i} className="nodeCard " sm="8" md="3"><File  number={i}
         labelFile={auxChildren[i].label} valueFile={auxChildren[i].label}/></Col>);
        flagEmpty = true;
      }
        
    };
    if(!flagEmpty){
      childrenFolder.push(<h2 key="empty">
        Folder Empty
      </h2>)
    }
    childrenFolder.push(childrenFile);

    return (
      <div className="App"> 

        <Navbar/>
        
        <Row>
    <Col sm={2}>
        <div className="md-form mb-3">
        <div className="md-form my-0">
        <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"></input>
      </div>      
        </div>

        <div className="md-form mb-3">
        
        <i className="far fa-clock"> <strong>Recent</strong></i>
        
        </div>

        <div className="md-form mb-3">
        <i className="fas fa-star"> Destacada</i>
        </div>
        
        <div className="md-form mb-3">
        <i className="fas fa-trash-alt"> Papelera</i>
        </div>
        <hr className="my-5"></hr>
        <div className="md-form mb-3 ">
        <i className="fas fa-server">  Storage</i>
        <MDBProgress value={25} className="my-2" />
        398.8 Mb of 5G used<br></br>
       <a className="color"> Increase storage</a>
        </div>
        </Col>
    <Col sm={8}>     
     <Row> 
     <Button color="light-blue" className="boton2" onClick={this.clickInNewFolder}><i className="fas fa-folder-plus"></i> Create Folder</Button>
          <Button color="light-blue" className="boton" onClick={this.saveJson}><i className="fas fa-save"></i> Paste</Button>
          <Button color="light-blue" className="boton" onClick={this.saveJson}><i className="fas fa-file-upload"></i> File upload</Button>
          <Button color="light-blue" className="boton" onClick={this.clickInBefore}><i className="fas fa-undo-alt"></i> Back</Button>
         
          {/* <Col xs="4">
            <CheckboxTree
              nodes={this.state.nodes}
              checked={this.state.checked}
              expanded={this.state.expanded}
              onCheck={checked => this.setState({ checked })}
              onExpand={expanded => this.setState({ expanded })}
              onClick={clicked => this.selected(clicked)}
            />
          </Col> */}
          <Col xs="12">
            <Row>
          
            {childrenFolder}
            </Row>
          </Col>
        </Row>
        </Col>
  </Row>
      <Container>

      
        <Modal isOpen={this.state.modalNewFolder} toggle={this.clickInNewFolder}>
          <ModalHeader toggle={this.clickInNewFolder}>Create Folder</ModalHeader>
          <ModalBody>
          <FormGroup>
            <Label for="newFolder">Name of folder:</Label>
            <Input type="text" name="newFolder" id="newFolder" placeholder="New name"/>
          </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button className="boton" color="primary"  onClick={this.createFolder}>Create</Button>{' '}
            <Button className="boton" color="secondary" onClick={this.clickInNewFolder}>Cancel</Button>
          </ModalFooter>
        </Modal>
        
        {/* file */}

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Button className="boton" onClick={this.clickInLoad} color="primary">primary</Button>{' '}
        <input type="file" id="inputUpload" name="files[]" multiple/> 

        <Button onClick={this.callFile} color="primary">call file</Button>{' '}
        

      </Container>
      </div>
    );
  }
}

export default App;
