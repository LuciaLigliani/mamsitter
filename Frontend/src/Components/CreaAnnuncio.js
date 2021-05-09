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
      children:[],
      senior:'',
      name:'',
      sex:'',
      age:'',
      typeWork:'',
      startDate:'',
      endDate:'',
      neededDays:[],
      car:false,
      homework:false,
      alsoColf:false,
      cook:false,
      languages:['italiano'],
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

  handleClo= (e) => {
    this.setState({open:false})
   }

  handleShow = () => {
    this.setState({name:''});
    this.setState({age:''});
    this.setState({sex:''});
    this.setState({show:true});
  }

  add = () => {
    const el =  {'name' : this.state.name,'sex': this.state.sex, 'age': this.state.age};
    const children = [...this.state.children, el];
    this.setState({children:children});
    this.setState({show:false});
  }

  logout = () => {
    setTimeout(()=> {
      window.location.assign('/');
       }, 10); 
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.eraseCookie('user_jwt');
  }

  changeHandler = (e) => {
    if(e.target.name === 'typeWork' && e.target.value === 'on') e.target.value = e.target.id;
    else if (e.target.name === 'homework') e.target.value = e.target.checked;
    else if (e.target.name === 'cook') e.target.value = e.target.checked;
    else if (e.target.name === 'car') e.target.value = e.target.checked;
    else if (e.target.name === 'alsoColf') e.target.value = e.target.checked;
    this.setState({[e.target.name]:e.target.value})
  }
  submitHandler = (e) => {
    const array = ['l', 'ma', 'me', 'g', 'v', 's', 'd'];
      const arr = ['m', 'p', 's', 'n'];
      const neededDays = [];
      arr.forEach(part => {
        array.forEach(day => {
          const id = part + day;
          if(document.getElementById(id).checked === true) {
            let partOfDay = '';
            let weekDay = '';
            if(part === 'm') partOfDay = 'morning';
            else if(part === 'p') partOfDay = 'afternoon';
            else if(part === 's') partOfDay = 'evening';
            else if(part === 'n') partOfDay = 'night';
            if(day === 'l') weekDay = 'monday';
            else if(day === 'ma') weekDay = 'tuesday';
            else if(day === 'me') weekDay = 'wednesday';
            else if(day === 'g') weekDay = 'thursday';
            else if(day === 'v') weekDay = 'friday';
            else if(day === 's') weekDay = 'saturday';
            else if(day === 'd') weekDay = 'sunday';
            const value = {
              partOfDay,
              weekDay
            };
            neededDays.push(value);
          }
        })
      });
      this.state.neededDays = neededDays;
    console.log(this.state);
    e.preventDefault()
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.getCookie('user_jwt');
    axios.post('/api/v1/announcements', this.state).then(response=>{
      if(response.data.status === 'success') {
        this.setState({open:true, message:'Annuncio creato'})
       setTimeout(()=> {
          window.location.assign('/search');
        }, 50);
      }
    })
    .catch(error=>{
      this.setState({open:true, message:error.response.data.message});
        console.log(error);
      })
    }

  render(){
    return(
      <div>
      <Snackbar className="snackbar"
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
            <Link to="/viewallann"><MenuItem  onClick={this.handleClose}>I miei annunci</MenuItem></Link>
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
 style={{  margin: 10, width: 180, left:-120}}
 fullWidth
 margin="normal"
 onChange={this.changeHandler}
 />  <br/>
  <TextField 
  name='typeAnnouncement'
  select
 label='Tipo di annuncio'
 style={{  margin: 10, width: 180, left:-120 }}
 fullWidth
 margin="normal"
 onChange={this.changeHandler}>  <br/>
 <MenuItem value='babysitter'>Babysitter</MenuItem>
 <MenuItem value='badante'>Badante</MenuItem>
 <MenuItem value='colf'>Colf</MenuItem>
 </TextField>
  <br/>
  </Col>
  <Col>
  <br/>
  <TextField label= {this.state.children.map(child => child.name + "  ")} style={{ margin: 1, width: 260, left:-230, bottom: -55 }} disabled/>
 <Button  onClick={this.handleShow} style={{  margin: 1, left:-250, bottom: -100 }}>Bambino+</Button>
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
          <Button  onClick={this.handleClos}>
            Annulla
          </Button>
          <Button  onClick={this.add}>
            Aggiungi
          </Button>
        </Modal.Footer>
      </Modal>
         </Col>
         <Col>
        
<TextField type='date' helperText='data di inizio' onChange={this.changeHandler} name='startDate' style={{ margin: 10, width: 180, top:85, marginLeft:-200}}/><br/>
<TextField type='date' helperText='data di fine' onChange={this.changeHandler} name='endDate' style={{ margin: 10, width: 180, top:85, marginLeft:-200}}/>
 
 </Col>
  
 </Row>
<Row >
  <br/>
        <Col sm={3}>
<Typography style={{bottom:152, marginLeft:45, marginTop:50}}  gutterBottom>
        Tipo di lavoro: &nbsp;</Typography>
        <input type='radio'
            onChange={this.changeHandler}
            style={{marginLeft:60, width: 30}}
              name='typeWork'
              id="occasionale"
            /><label for="occasionale">Occasionale</label><br/>
            <input type='radio'
            onChange={this.changeHandler}
            style={{marginLeft:36, width: 30}}
              name='typeWork'
              id="regolare"
            /><label for="regolare">Regolare</label><br/>
            <input type='radio'
            onChange={this.changeHandler}
            style={{marginLeft:21, width: 30}}
              name='typeWork'
              id="diurno"
            /><label for="diurno">Diurno</label><br/>
            <input type='radio'
            onChange={this.changeHandler}
            style={{marginLeft:21, width: 30}}
              name='typeWork'
              id="aOre"
            /><label for="aOre">Ad ora</label><br/>
            <input type='radio'
            onChange={this.changeHandler}
            style={{marginLeft:74, width: 30}}
              name='typeWork'
              id="24h"
            /><label for="24h">Tutto il giorno</label><br/>
            <input type='radio'
            onChange={this.changeHandler}
            style={{marginLeft:40, width: 30}}
              name='typeWork'
              id="notturno"
            /><label for="notturno">Notturno</label><br/>
            </Col>
  <Col >
  <Typography style={{bottom:152, marginRight:300, marginTop:50}}  gutterBottom>
        Giorni disponibili: &nbsp;</Typography>
  <Table striped bordered hover size="sm" style={{width:90, marginLeft:50}} >
  <thead>
    <tr>
      <th></th>
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
      <td >Mattino</td>
      <td><Form.Check id='ml' /></td>
      <td><Form.Check id='mma' /></td>
      <td><Form.Check id='mme' /></td>
      <td><Form.Check id='mg' /></td>
      <td><Form.Check id='mv' /></td>
      <td><Form.Check id='ms' /></td>
      <td><Form.Check id='md' /></td>
    </tr>
    <tr>
      <td>Pomeriggio</td>
      <td><Form.Check id='pl' /></td>
      <td><Form.Check id='pma' /></td>
      <td><Form.Check id='pme' /></td>
      <td><Form.Check id='pg' /></td>
      <td><Form.Check id='pv' /></td>
      <td><Form.Check id='ps' /></td>
      <td><Form.Check id='pd' /></td>
    </tr>
    <tr>
      <td>Sera</td>
      <td><Form.Check id='sl' /></td>
      <td><Form.Check id='sma' /></td>
      <td><Form.Check id='sme' /></td>
      <td><Form.Check id='sg' /></td>
      <td><Form.Check id='sv' /></td>
      <td><Form.Check id='ss' /></td>
      <td><Form.Check id='sd' /></td>
    </tr>
    <tr>
      <td>Notte</td>
      <td><Form.Check id='nl' /></td>
      <td><Form.Check id='nma' /></td>
      <td><Form.Check id='nme' /></td>
      <td><Form.Check id='ng' /></td>
      <td><Form.Check id='nv' /></td>
      <td><Form.Check id='ns' /></td>
      <td><Form.Check id='nd' /></td>
    </tr>
  </tbody>
</Table>
  
  </Col>
  <Col sm={2}>
<Typography style={{bottom:152, marginLeft:-250, marginTop:50}}  gutterBottom>
        Disponibilità a: &nbsp;</Typography>
        <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:-100, textAlign:'left'}}
              label="Aiuto compiti"
              name='homework'
              id="homework"
            />
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:-100, textAlign:'left'}}
              label="Cucinare"
              name='cook'
              id="cook"
            />
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:-100, textAlign:'left'}}
              label="Guidare"
              name='car'
              id="car"
            />
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:-100, textAlign:'left'}}
              label="Fare pulizie"
              name='alsoColf'
              id="alsoColf"
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