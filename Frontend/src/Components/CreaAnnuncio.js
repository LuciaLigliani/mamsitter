import React from 'react'
import { Component } from 'react';
import '../App.css';
import { Col, Row } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import logomodi from '..//logomodi.png';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Container } from 'react-bootstrap';
import Typography from '@material-ui/core/Typography';
import Form from 'react-bootstrap/Form'
import { Snackbar } from '@material-ui/core';

import util from '..//util/util'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
class CreaAnnuncio extends Component{
  constructor(props){
    super(props);
    this.state= {
      title:'',
      typeAnnouncement:'',
      children:[{'name' : 'martina','sex': 'F', 'age': '3'}],
      senior:'',
      name:'',
      sex:'',
      age:'',
      typeWork:'',
      startDate:'',
      endDate:'',
      neededDays:[{'weekDay' : 'monday', 'partOfDay': 'morning'}],
      car:'',
      work:'',
      available:'',
      languages:['ciao', 'hola'],
      open: false,
      message:'',
      anchorEl:'',
      show:''


    }
  }
  handleClick = (event) => {
    this.setState({anchorEl:event.currentTarget});
  }
  handleClose = () => {
    this.setState({anchorEl:null});
  };

  handleClos = () =>{
    this.setState({show:false});
  } 

  handleShow = () => {
    this.setState({show:true});
 
  }
  logout = () => {
    setTimeout(()=> {
      window.location.assign('/');
       }, 10); 
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.eraseCookie('user_jwt');
  }

  changeHandler = (e) => {
   /* if(e.target.name === 'languages')
    this.setState({[e.target.name]:this.state.languages.push(e.target.value)})
    if(e.target.name === 'children')
    this.setState({[e.target.name]:this.state.children.push(e.target.value)})*/
    this.setState({[e.target.name]:e.target.value})
  }
  submitHandler = (e) => {
    console.log(this.state);
    e.preventDefault()
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.getCookie('user_jwt');
    axios.post('http://localhost:3000/api/v1/announcements', this.state).then(response=>{
      if(response.data.status === 'success') {
        this.setState({open:true, message:'Annuncio creato'})
       setTimeout(()=> {
          window.location.assign('/announcement');
        }, 10);
      }
    })
    .catch(error=>{
      console.log(error)})
    }

    create=[
      {
      value:'babysitter',
      label:'babysitter'
      },
      {
        value:'badante',
        label:'badante'
      },
      {
        value:'colf',
        label:'colf'
      }
    ];


  render(){
    return(
     
        <div className="profile">
      <div className="Navbar">
      <Link to="/home"><img src={logomodi} className="navbarLogo" alt="logo"/></Link>
        <ul className="linksNav">
          <Link to="/mamsitter">
            <li><font face='Georgia' color='black' >I NOSTRI SERVIZI</font></li>
          </Link>
          <Link to="/mamsitter">
            <li><font face='Georgia' color='black'>BLOG</font></li>
          </Link>
          
          <Link to="/aboutUs">
            <li><font face='Georgia' color='black'>LA NOSTRA STORIA</font></li>
          </Link>
        <Button className="buttonNav" aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}> <AccountCircle fontSize='large'/>
            <ArrowDropDownIcon></ArrowDropDownIcon>
        </Button>
          <Menu
              id="simple-menu"
              anchorEl={this.state.anchorEl}
              keepMounted
              open={Boolean(this.state.anchorEl)}
              onClose={this.handleClose}
            >
            <Link to="/search"> <MenuItem onClick={this.handleClose}>Cerca</MenuItem></Link>
            <Link to="/myProfile"><MenuItem  onClick={this.handleClose}>Visualizza Profilo</MenuItem></Link> 
            <MenuItem onClick={this.logout}>Logout</MenuItem>

          </Menu>
        </ul>
    </div>
    <Snackbar 
  anchorOrigin={{
    vertical: 'top',
    horizontal: 'center'
  }}
  open={this.state.open}
  autoHideDuration={3000}
  onClose={this.handleClose}
  message = {<span id="message-id">{this.state.message}</span>}
  action={
    <IconButton onClick={this.handleClose}>
      <CloseIcon/>
    </IconButton>
  }
  />
    <br/><br/><br/>
    <Box height="5%" width="30%" mb="10%" m="2%" ml="34%"  bgcolor="text.primary" >
     <font size="5" face='Georgia' color="white"> Inserisci Annuncio</font>
    </Box>
   <div className="myprofile">
     <Container >
       <Row>
         <Col sm={7}>
       <br/>  <br/> <br/>  
       
       <TextField 
       name='title'
 label='Inserisci titolo'
 style={{  margin: 1, width: 200, left:-80, bottom:40 }}
 fullWidth
 margin="normal"
 onChange={this.changeHandler}
 />  <br/>
  <TextField 
  name='typeAnnouncement'
  select
 label='Tipo di annuncio'
 style={{  margin: 1, width: 200, left:-80, bottom: 40 }}
 fullWidth
 margin="normal"
 onChange={this.changeHandler}>  <br/>
 {this.create.map((ann)=>(
      <MenuItem key={ann.value} value={ann.value}>
      {ann.label}
    </MenuItem>
 ))}
 </TextField>
  <br/>
 <Button variant="primary" onClick={this.handleShow}>
        Aggiungi+
      </Button>
      <Modal show={this.state.show} onHide={this.handleClos}>
       
        <Modal.Body>
        <TextField name='name'
 label='Nome'
 style={{ margin: 1, width: 200, left:80, bottom: 10 }}
 fullWidth
 margin="normal"
 onChange={this.changeHandler}/>  <br/>
<TextField name='sex'
 label='Sesso'
 style={{  margin: 1, width: 200, left:80, bottom: 10  }}
 fullWidth
 margin="normal"
 onChange={this.changeHandler}/>  <br/>
 <TextField name='age'
 label='Età'
 style={{  margin: 1, width: 200, left:80, bottom: 10  }}
 fullWidth
 margin="normal"
 onChange={this.changeHandler}/> 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClos}>
            Annulla
          </Button>
          <Button variant="primary" onClick={this.handleClos}>
            Aggiungi
          </Button>
        </Modal.Footer>
      </Modal>
         </Col>
         <Col sm={3}>
         <br/> 

<Typography style={{bottom:152, marginLeft:-400, marginTop:-2}} variant="subtitle1" gutterBottom>
 Inserisci data inizio &nbsp;</Typography>
<Form.Control style={{marginLeft:-200, marginTop:7}} name='startDate' type="date" placeHolder="Inserisci data inizio" onChange={this.changeHandler} /> <br/>
<Typography style={{bottom:152, marginLeft:-400, marginTop:-2}} variant="subtitle1" gutterBottom>
 Inserisci data fine &nbsp;</Typography>
<Form.Control style={{marginLeft:-200, marginTop:5}} name='startDate' type="date" placeHolder="Inserisci data inizio" onChange={this.changeHandler} /> <br/>
 <br/>
 <br/>
 </Col>
 <Col> 
 <br/>

 </Col>
  
 </Row>
<Row >
        <Col sm={3}>
<Typography style={{bottom:152, marginLeft:50, marginTop:-2}} variant="subtitle1" gutterBottom>
        Tipo di lavoro: &nbsp;</Typography>
        <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:90, marginRight:200}}
              label="Occasionale"
              name='occasional'
              id="formHorizontalRadios1"
            />
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:90, marginRight:200}}
              label="Regolare"
              name='regular'
              id="formHorizontalRadios2"
            />
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:90, marginRight:200}}
              label="Giornaliero"
              name='diurnal'
              id="formHorizontalRadios3"
            />
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:90, marginRight:40}}
              label="Ad orario"
              name='atHour'
              id="formHorizontalRadios3"
            />
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:90, marginRight:10}}
              label="Tutto il giorno"
              name='allDay'
              id="formHorizontalRadios3"
            />
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:90, marginRight:200}}
              label="Notturno"
              name='nocturnal'
              id="formHorizontalRadios3"
            />
            </Col>
  <Col >
  <Typography style={{bottom:152, marginRight:200, marginTop:-2}} variant="subtitle1" gutterBottom>
        Giorni disponibili: &nbsp;</Typography>
  <Table striped bordered hover size="sm" style={{width:90, marginLeft:40}} >
  <thead>
    <tr>
      <th>#</th>
      <th>Lun</th>
      <th>Mar</th>
      <th>Mer</th>
      <th>Gio</th>
      <th>Ven</th>
      <th>Sab</th>
      <th>Dom</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td >Mat</td>
      <td>V</td>
      <td>V</td>
      <td>V</td>
      <td>V</td>
      <td>V</td>
      <td>V</td>
      <td>V</td>
    </tr>
    <tr>
      <td>Pom</td>
      <td>V</td>
      <td>V</td>
      <td>V</td>
      <td>V</td>
      <td>V</td>
      <td>V</td>
      <td>V</td>
    </tr>
    <tr>
      <td>Sera</td>
      <td>V</td>
      <td>V</td>
      <td>V</td>
      <td>V</td>
      <td>V</td>
      <td>V</td>
      <td>V</td>
    </tr>
    <tr>
      <td>Notte</td>
      <td>V</td>
      <td>V</td>
      <td>V</td>
      <td>V</td>
      <td>V</td>
      <td>V</td>
      <td>V</td>
    </tr>
  </tbody>
</Table>
  
  </Col>
  <Col sm={2}>
<Typography style={{bottom:152, marginLeft:-300, marginTop:-2}} variant="subtitle1" gutterBottom>
        Disponibilità a: &nbsp;</Typography>
        <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:-150, marginRight:150}}
              label="Aiuto compiti"
              name='occasional'
              id="formHorizontalRadios1"
            />
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:-150, marginRight:180}}
              label="Cucinare"
              name='regular'
              id="formHorizontalRadios2"
            />
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:-150, marginRight:190}}
              label="Guidare"
              name='diurnal'
              id="formHorizontalRadios3"
            />
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:-150, marginRight:180}}
              label="Ad orario"
              name='atHour'
              id="formHorizontalRadios3"
            />
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:-150, marginRight:150}}
              label="Tutto il giorno"
              name='allDay'
              id="formHorizontalRadios3"
            />
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:-150, marginRight:180}}
              label="Notturno"
              name='nocturnal'
              id="formHorizontalRadios3"
            />
            </Col>
  
  <Row>
    
  <div >
  <Link to="/home"><font face='Georgia' color="white">
   
   <button type="submit" style={{marginRight:10, marginTop:60}} onClick={this.submitHandler} className="buttonp buttonpp" >Crea Annuncio</button></font></Link>
         </div>
</Row>

</Row>

     </Container>
     
   
   </div>
   
   </div>
   





    )







  }
}

export default CreaAnnuncio

/*<Typography style={{bottom:152, marginLeft:-210, marginTop:-10}} variant="subtitle1" gutterBottom>
        Inserisci informazioni: &nbsp;</Typography><br/>
 <TextField name='name'
 label='Nome'
 style={{ margin: 1, width: 200, left:-80, bottom: 40 }}
 fullWidth
 margin="normal"
 onChange={this.changeHandler}/>  <br/>
<TextField name='sex'
 label='Sesso'
 style={{  margin: 1, width: 200, left:-80, bottom: 40  }}
 fullWidth
 margin="normal"
 onChange={this.changeHandler}/>  <br/>
 <TextField name='age'
 label='Età'
 style={{  margin: 1, width: 200, left:-80, bottom: 40  }}
 fullWidth
 margin="normal"
 onChange={this.changeHandler}/> */

 /*
 <TextField name='languages'
 label='Inserisci lingue'
 style={{ margin: 1, width: 200, left:200, top: -285}}
 fullWidth
 margin="normal"
 onChange={this.changeHandler}/>*/