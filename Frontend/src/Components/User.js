import React from 'react'
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
// import Avatar from '@material-ui/core/Avatar';
// import avatar from '..//default.jpg';
//import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import util from '..//util/util'
import { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Snackbar } from '@material-ui/core';


class User extends Component {
  constructor(props){
    super(props)
    this.state = {
      id:'',
      email:'',
      role:'',
      photo:'',
      name:'',
      surname:'',
      sex:'',
      birthDate:'',
      city:'',
      district:'',
      description:'',
      phoneNumber:'',
      car:'',
      work:'',
      available:'',
      languages:'',
      anchorEl:'',
      me:'',
      open: false,
      message:''
    }
}

  setData = (data, specificData) => {
    let birthDate = '';
    birthDate=new Date(specificData.birthDate).toLocaleDateString();
    if (data.role !== 'famiglia') {
      specificData.availableDays.map(el => {
        let id = '';
        if (el.partOfDay === 'morning') id = 'm';
        else if (el.partOfDay === 'afternoon') id = 'p';
        else if (el.partOfDay === 'evening') id = 's';
        else if (el.partOfDay === 'night') id = 'n';
        if(el.weekDay === 'monday') id += 'l';
        else if(el.weekDay === 'tuesday') id += 'ma';
        else if(el.weekDay === 'wednesday') id += 'me';
        else if(el.weekDay === 'thursday') id += 'g';
        else if(el.weekDay === 'friday') id += 'v';
        else if(el.weekDay === 'saturday') id += 's';
        else if(el.weekDay === 'sunday') id += 'd';
        document.getElementById(id).checked = true;
        return el;
      })
    }
    if (specificData.occasional === true) document.getElementById('occasional').checked = true;
    if (specificData.regular === true) document.getElementById('regular').checked = true;
    if (specificData.allDay === true) document.getElementById('allDay').checked = true;
    if (specificData.atHour === true) document.getElementById('atHour').checked = true;
    if (specificData.diurnal === true) document.getElementById('diurnal').checked = true;
    if (specificData.nocturnal === true) document.getElementById('nocturnal').checked = true;
    if (specificData.homework === true) document.getElementById('homework').checked = true;
    if (specificData.cook === true) document.getElementById('cook').checked = true;
    if (specificData.car === true) document.getElementById('car').checked = true;
    if (specificData.alsoColf === true) document.getElementById('alsoColf').checked = true;

    this.setState({id: data._id});
    this.setState({email: data.email});
    this.setState({role: data.role});
    this.setState({photo: data.photo})
    this.setState({name: specificData.name});
    this.setState({surname: specificData.surname});
    this.setState({sex: specificData.sex});
    this.setState({birthDate: birthDate});
    this.setState({city: specificData.city});
    this.setState({district: specificData.district});
    this.setState({description: specificData.description});
    this.setState({phoneNumber: specificData.phoneNumber});
    this.setState({car: specificData.car});
    this.setState({availableDays: specificData.availableDays});
    this.setState({languages: specificData.languages});
}


  componentDidMount(){
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.getCookie('user_jwt');
    axios.get('http://localhost:3000/api/v1/users/myProfile').then(profile => {
      this.setState({me: profile.data.data.role});
    })
    .catch(error=>{
      this.setState({open:true, message:error.response.data.message});
        console.log(error);
      })
    const id= this.props.location.pathname.split('/users/')[1];
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.getCookie('user_jwt');
    axios.get('http://localhost:3000/api/v1/users/' + id).then(profile => {
      console.log(profile);
      let specificData;
      if(profile.data.data.role === 'famiglia') specificData = profile.data.data.famiglia_id;
      if(profile.data.data.role === 'babysitter') specificData = profile.data.data.babysitter_id;
      if(profile.data.data.role === 'badante') specificData = profile.data.data.badante_id;
      if(profile.data.data.role === 'colf') specificData = profile.data.data.colf_id;
      this.setData(profile.data.data , specificData);
    })
    .catch(error=>{
      this.setState({open:true, message:error.response.data.message});
        console.log(error);
      })
  }
 
  logout = () => {
    setTimeout(()=> {
      window.location.assign('/');
       }, 10); 
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.eraseCookie('user_jwt');
  }

  deleteProfile = () => {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.getCookie('user_jwt');
    axios.delete('http://localhost:3000/api/v1/users/' + this.state.id).then(profile => {
      console.log(profile);
      this.setState({open:true, message:'Account eliminato'})
        setTimeout(()=> {
          window.location.assign('/');
           }, 30); 
      })
      .catch(error=>{
        this.setState({open:true, message:error.response.data.message});
          console.log(error);
        })
  }

  handleClick = (event) => {
    this.setState({anchorEl:event.currentTarget});
  }
  handleClose = () => {
    this.setState({anchorEl:null});
  };

  handleClos= (e) => {
    this.setState({open:false})
   }

  buttons = () => {
    if(this.state.me === 'admin') return (
      <div >
  <font face='Georgia' color="white">
   <button style={{marginRight:10, marginTop:60}} onClick={this.deleteProfile} className="buttonp buttonpp" >Elimina Profilo</button></font></div>
    )
  }

  showInformations = (role) => {
    if (role !== 'famiglia') {
      return (
     <div>   
<Row >
        <Col sm={3}>
<Typography style={{bottom:152, marginLeft:45, marginTop:0}} variant="subtitle1" gutterBottom>
        Tipo di lavoro: &nbsp;</Typography>
         <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:90, textAlign:'left'}}
              label="Occasionale"
              name='occasional'
              id="occasional"
              disabled
            />
           <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:90, textAlign:'left'}}
              label="Regolare"
              name='regular'
              id="regular"
              disabled
            />
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:90, textAlign:'left'}}
              label="Diurno"
              name='diurnal'
              id="diurnal"
              disabled
            />
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:90, textAlign:'left'}}
              label="Notturno"
              name='nocturnal'
              id="nocturnal"
              disabled
            />
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:90, textAlign:'left'}}
              label="Ad orario"
              name='atHour'
              id="atHour"
              disabled
            />
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:90, textAlign:'left'}}
              label="Tutto il giorno"
              name='allDay'
              id="allDay"
              disabled
            />
            </Col>
  <Col >
  <Typography style={{bottom:152, marginRight:300, marginTop:0}} variant="subtitle1" gutterBottom>
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
      <td><Form.Check id='ml' disabled/></td>
      <td><Form.Check id='mma' disabled/></td>
      <td><Form.Check id='mme' disabled/></td>
      <td><Form.Check id='mg' disabled/></td>
      <td><Form.Check id='mv' disabled/></td>
      <td><Form.Check id='ms' disabled/></td>
      <td><Form.Check id='md' disabled/></td>
    </tr>
    <tr>
      <td>Pomeriggio</td>
      <td><Form.Check id='pl' disabled/></td>
      <td><Form.Check id='pma' disabled/></td>
      <td><Form.Check id='pme' disabled/></td>
      <td><Form.Check id='pg' disabled/></td>
      <td><Form.Check id='pv' disabled/></td>
      <td><Form.Check id='ps' disabled/></td>
      <td><Form.Check id='pd' disabled/></td>
    </tr>
    <tr>
      <td>Sera</td>
      <td><Form.Check id='sl' disabled/></td>
      <td><Form.Check id='sma' disabled/></td>
      <td><Form.Check id='sme' disabled/></td>
      <td><Form.Check id='sg' disabled/></td>
      <td><Form.Check id='sv' disabled/></td>
      <td><Form.Check id='ss' disabled/></td>
      <td><Form.Check id='sd' disabled/></td>
    </tr>
    <tr>
      <td>Notte</td>
      <td><Form.Check id='nl' disabled/></td>
      <td><Form.Check id='nma' disabled/></td>
      <td><Form.Check id='nme' disabled/></td>
      <td><Form.Check id='ng' disabled/></td>
      <td><Form.Check id='nv' disabled/></td>
      <td><Form.Check id='ns' disabled/></td>
      <td><Form.Check id='nd' disabled/></td>
    </tr>
  </tbody>
</Table>
  
  </Col>
  <Col sm={2}>
<Typography style={{bottom:152, marginLeft:-250, marginTop:0}} variant="subtitle1" gutterBottom>
        Disponibilità a: &nbsp;</Typography>
        <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:-100, textAlign:'left'}}
              label="Aiuto compiti"
              name='homework'
              id="homework"
              disabled
            />
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:-100, textAlign:'left'}}
              label="Cucinare"
              name='cook'
              id="cook"
              disabled
            />
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:-100, textAlign:'left'}}
              label="Guidare"
              name='car'
              id="car"
              disabled
            />
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:-100, textAlign:'left'}}
              label="Fare pulizie"
              name='alsoColf'
              id="alsoColf"
              disabled
            />
            </Col>
  </Row>
  <br/><br/><br/><br/></div>
      )
    }
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
              <Link to="/myProfile"><MenuItem  onClick={this.handleClose}>Visualizza Profilo</MenuItem></Link> 
              <Link to="/createann"><MenuItem  onClick={this.handleClose}>Crea annuncio</MenuItem></Link> 
              <Link to="/viewallann"><MenuItem  onClick={this.handleClose}>I miei annunci</MenuItem></Link> 
            <MenuItem onClick={this.logout}>Logout</MenuItem>
          </Menu>
        </ul>
    </div>
    <br/><br/><br/>
   <div className="userprofile">
     <Container >
       <Row>
         <Col sm={1}>
         <Box  m="4rem" ml="3rem" mt="100px" >
         <img src={`http://localhost:3000/api/v1/users/${this.state.id}/file/${this.state.photo}`} style={{
      bottom:40,
      margin: 0,
      width:150,
      height:150}} alt=''></img>
</Box>
         </Col>
         <Col sm={7}>
       <br/>  <br/> <br/> 
       <TextField 
name='name' id='name'
 label={this.state.name}
 disabled
 style={{  margin: 1, width: 200, bottom: 10, marginLeft: 50  }}
 fullWidth
 margin="normal"/> 
 <br/>
  <TextField name='surname' id='surname'
 label={this.state.surname}
 disabled
 style={{  margin: 1, width: 200, bottom: 10, marginLeft: 50  }}
 fullWidth
 margin="normal"/><br/> 
  <TextField 
  name='role'
 label={this.state.role}
 disabled
 style={{  margin: 1, width: 200, bottom: 10, marginLeft: 50  }}
 fullWidth
 margin="normal"/>  <br/>
 <TextField name='phoneNumber' id='phoneNumber'
 label={this.state.phoneNumber}
 disabled
 type="tel"
 style={{ margin: 1, width: 200, bottom: 10, marginLeft: 50   }}
 fullWidth
 margin="normal"/><br/>
         </Col>
         <Col>
         <br/> 
 <TextField name='sex' id='sex'
 label={this.state.sex}
 disabled
 style={{ width: 200, margin:1, bottom:-40, marginLeft: -100}}
 fullWidth
 margin="normal"/><br/>
 <TextField name='birthDate' id='birthDate'
 label={this.state.birthDate}
 disabled
 style={{width: 200, margin:1, bottom: -40, marginLeft: -100}}
 fullWidth
 margin="normal"/><br/>
 <TextField name='city'
 label={this.state.city}
 disabled
 style={{ width: 200, margin:1, bottom: -40, marginLeft: -100}}
 fullWidth
 margin="dense"/> <br/>
 <TextField name='district'
 label={this.state.district}
 disabled
 style={{width: 200, margin:1, bottom: -40, marginLeft: -100}}
 fullWidth
 margin="normal"/>
 <br/>
 </Col>        
 </Row>
 <Row>
 {this.showInformations(this.state.role)}
 </Row>
 <Row>
<Col>
         <br/><br/>
         <Typography style={{bottom:152, marginLeft:-400, marginTop:-90}} variant="subtitle1" gutterBottom>
        Descrizione: &nbsp;</Typography>
         <TextareaAutosize
         onChange={this.changeHandler}
         style={{ width: 600,  borderColor:'white', overflow: 'auto'}}
         name="description"
         id="description"
      rowsMax={7}
      disabled
      aria-label="maximum height"
      placeholder={this.state.description}
      />
         </Col>
</Row>
<br/>
{this.buttons()}
<br/>

     </Container>
   
   </div>
    </div>
    
      </div>
    );
  }

}
export default User;
