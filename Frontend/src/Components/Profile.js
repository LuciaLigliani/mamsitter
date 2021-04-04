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
import Avatar from '@material-ui/core/Avatar';
// import avatar from '..//default.jpg';
import photo from '..//photo.jpg';
import Typography from '@material-ui/core/Typography';
// import Form from 'react-bootstrap/Form'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Table from 'react-bootstrap/Table'
import axios from 'axios';
import util from '..//util/util';

class Profile extends Component{
  constructor(props){
    super(props);
    this.state= {
      id: '',
      email:'',
      role:'',
      profile:'',
      highlighted:'',
      can:'',
      photo:'',
      name:'',
      surname:'',
      sex:'',
      birthDate:'',
      city:'',
      district:'',
      description:'',
      phoneNumber:'',
      occasional:'',
      regular:'',
      allDay:'',
      atHour:'',
      diurnal:'',
      nocturnal:'',
      languages:'',
      car:'',
      homework:'',
      cook:'',
      alsoColf:'',
      available: [],
      work: [],
      availableDays: [],
      seeData: '',
      update: '',

      open: false,
      message:'',
      anchorEl:'',


    }
  }

  setData = (data, specificData) => {
    let birthDate = '';
    birthDate=new Date(specificData.birthDate).toLocaleDateString();
    let can = '';
    if (data.can === true) can = data.role === 'famiglia' ? 'Puoi creare annunci!' : 'Puoi candidarti agli annunci!'
    else can = data.role === 'famiglia' ? 'Abbonati per creare annunci!' : 'Abbonati per candidarti agli annunci!'
    let highlighted = '';
    if (data.role !== 'famiglia') highlighted = data.highlighted === true ? 'Sei in vetrina!' : 'Abbonati per andare in vetrina!'
    let work = [];
    if (specificData.occasional === true) work.push('Occasionale');
    if (specificData.regular === true) work.push('Regolare');
    if (specificData.allDay === true) work.push('Tutto il giorno');
    if (specificData.atHour === true) work.push('A orario');
    if (specificData.diurnal === true) work.push('Diurno');
    if (specificData.nocturnal === true) work.push('Notturno');
    work = work.map(el => <dd>{el}</dd>);
    let available = [];
    if (specificData.homework === true) available.push('Aiuto compiti');
    if (specificData.cook === true)  available.push('Cucinare');
    if (specificData.car === true) available.push('Guidare');
    if (specificData.alsoColf === true) available.push('Fare pulizie');
    available = available.map(el => <dd>{el}</dd>);
    console.log(specificData.availableDays);
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
      document.getElementById(id).innerText = 'X';
      return el;
    })
    
    const info = {
      email: data.email,
      role: data.role,
      profile: data.profile,
      highlighted: highlighted,
      can: can,
      name: specificData.name,
      surname: specificData.surname,
      sex: specificData.sex,
      birthDate: birthDate,
      city: specificData.city,
      district: specificData.district,
      description: specificData.description,
      phoneNumber: specificData.phoneNumber,
      car: specificData.car,
      work: work,
      available: available,
      languages: specificData.languages,
      availableDays: specificData.availableDays 
    };
    this.setState({seeData: info});
    this.setState({id: data.id});
    this.setState({email: data.email});
    this.setState({role: data.role});
    this.setState({profile: data.profile});
    this.setState({highlighted: data.highlighted});
    this.setState({can: data.can});
    this.setState({photo: data.photo});
    this.setState({name: specificData.name});
    this.setState({surname: specificData.surname});
    this.setState({sex: specificData.sex});
    this.setState({birthDate: specificData.birthDate});
    this.setState({city: specificData.city});
    this.setState({district: specificData.district});
    this.setState({description: specificData.description});
    this.setState({phoneNumber: specificData.phoneNumber});
    this.setState({occasional: specificData.occasional});
    this.setState({regular: specificData.regular});
    this.setState({allDay: specificData.allDay});
    this.setState({nocturnal: specificData.nocturnal});
    this.setState({diurnal: specificData.diurnal});
    this.setState({atHour: specificData.atHour});
    this.setState({homework: specificData.homework});
    this.setState({cook: specificData.cook});
    this.setState({alsoColf: specificData.alsoColf});
    this.setState({languages: specificData.languages});
    this.setState({car: specificData.car});
    this.setState({availableDays: specificData.availableDays});
}

  componentDidMount(){
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.getCookie('user_jwt');
    axios.get('http://localhost:3000/api/v1/users/myProfile').then(profile => {
      let specificData;
      if(profile.data.data.role === 'famiglia') specificData = profile.data.data.famiglia_id;
      if(profile.data.data.role === 'babysitter') specificData = profile.data.data.babysitter_id;
      if(profile.data.data.role === 'badante') specificData = profile.data.data.badante_id;
      if(profile.data.data.role === 'colf') specificData = profile.data.data.colf_id;
      this.setData(profile.data.data , specificData);
    })
    .catch((err)=> {
      setTimeout((err)=> {
        window.location.assign('/error');
         }, 10)
      console.log(err);
    } );
  }

  deleteProfile = () => {
    axios.delete('http://localhost:3000/api/v1/users/myProfile').then(profile => {
      this.setState({open:true, message:'Account eliminato'})
        setTimeout(()=> {
          window.location.assign('/');
           }, 30); 
           axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.eraseCookie('user_jwt');
      })
    .catch((err)=>console.log(err));
  }

  logout = () => {
    setTimeout(()=> {
      window.location.assign('/');
       }, 10); 
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.eraseCookie('user_jwt');
  }

  canUpdate = () => {
    // update photo
    const image = <div class="inner">
    <input class="inputfile" type="file"  accept="image/*" name='photo' onChange={this.changeHandler}/>
    <label><img src={photo} width="35" alt=''></img></label>
    </div>;
    document.getElementById('phoneNumber').disabled = false;
    document.getElementById('name').disabled = false;
    document.getElementById('surname').disabled = false;
    document.getElementById('sex').disabled = false;
    document.getElementById('birthDate').disabled = false;

    const update = {
      photo: image
    }
    this.setState({update: update});
  }

  handleClick = (event) => {
    this.setState({anchorEl:event.currentTarget});
  }
  handleClose = () => {
    this.setState({anchorEl:null});
  };

  changeHandler = (e) => {
    if (e.target.name === 'photo')
      this.setState({[e.target.name]:e.target.value.split('\\')[2].split('.')[0]});
    else this.setState({[e.target.name]:e.target.value});
  }

  showInformations = (role) => {
    if (role !== 'famiglia') {
      return (
     <div>   
<Row >
        <Col sm={3}>
<Typography style={{bottom:152, marginLeft:45, marginTop:-90}} variant="subtitle1" gutterBottom>
        Tipo di lavoro: &nbsp;</Typography>
        <ul style={{bottom:152, marginLeft:70, textAlign: 'left'}}>{this.state.seeData.work}</ul>

        {/* <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:90, textAlign:'left'}}
              label="Occasionale"
              name='occasional'
              id="formHorizontalRadios1"
            />
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:90, textAlign:'left'}}
              label="Regolare"
              name='regular'
              id="formHorizontalRadios2"
            />
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:90, textAlign:'left'}}
              label="Giornaliero"
              name='diurnal'
              id="formHorizontalRadios3"
            />
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:90, textAlign:'left'}}
              label="Notturno"
              name='nocturnal'
              id="formHorizontalRadios3"
            />
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:90, textAlign:'left'}}
              label="Ad orario"
              name='atHour'
              id="formHorizontalRadios3"
            />
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:90, textAlign:'left'}}
              label="Tutto il giorno"
              name='allDay'
              id="formHorizontalRadios3"
            /> */}
            </Col>
  <Col >
  <Typography style={{bottom:152, marginRight:300, marginTop:-90}} variant="subtitle1" gutterBottom>
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
      <td id='ml'></td>
      <td id='mma'></td>
      <td id='mme'></td>
      <td id='mg'></td>
      <td id='mv'></td>
      <td id='ms'></td>
      <td id='md'></td>
    </tr>
    <tr>
      <td>Pomeriggio</td>
      <td id='pl'></td>
      <td id='pma'></td>
      <td id='pme'></td>
      <td id='pg'></td>
      <td id='pv'></td>
      <td id='ps'></td>
      <td id='pd'></td>
    </tr>
    <tr>
      <td>Sera</td>
      <td id='sl'></td>
      <td id='sma'></td>
      <td id='sme'></td>
      <td id='sg'></td>
      <td id='sv'></td>
      <td id='ss'></td>
      <td id='sd'></td>
    </tr>
    <tr>
      <td>Notte</td>
      <td id='nl'></td>
      <td id='nma'></td>
      <td id='nme'></td>
      <td id='ng'></td>
      <td id='nv'></td>
      <td id='ns'></td>
      <td id='nd'></td>
    </tr>
  </tbody>
</Table>
  
  </Col>
  <Col sm={2}>
<Typography style={{bottom:152, marginLeft:-250, marginTop:-90}} variant="subtitle1" gutterBottom>
        Disponibilità a: &nbsp;</Typography>
        <ul style={{bottom:152, marginLeft:-125, textAlign: 'left'}}>{this.state.seeData.available}</ul>
        {/* <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:-100, textAlign:'left'}}
              label="Aiuto compiti"
              name='homework'
              id="formHorizontalRadios1"
            />
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:-100, textAlign:'left'}}
              label="Cucinare"
              name='cook'
              id="formHorizontalRadios2"
            />
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:-100, textAlign:'left'}}
              label="Guidare"
              name='car'
              id="formHorizontalRadios3"
            />
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:-100, textAlign:'left'}}
              label="Fare pulizie"
              name='alsoColf'
              id="formHorizontalRadios3"
            /> */}
            </Col>
  </Row>
  <br/><br/><br/><br/></div>
      )
    }
  }


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
            <MenuItem onClick={this.logout}>Logout</MenuItem>
          </Menu>
        </ul>
    </div>

    <br/><br/><br/>
    <Box height="5%" width="30%" mb="10%" m="2%" ml="34%"  bgcolor="text.primary" >
     <font size="5" face='Georgia' color="white"> Il Mio Profilo</font>
    </Box>
   <div className="myprofile">
     <Container >
       <Row>
         <Col sm={1}>
         <Box  m="4rem" ml="3rem" mt="100px" >
<div class="rounded-box">
<div class="outer">
<img src={`http://localhost:3000/api/v1/users/${this.state.id}/file/${this.state.photo}`} style={{
      bottom:40,
      margin: 0,
      width:150,
      height:150}} alt=''></img>
  
    {this.state.update.photo}
  </div>
</div>
</Box>
         </Col>
         <Col sm={7}>
       <br/>  <br/> <br/>  
       <TextField name='email'
 label={this.state.seeData.email}
 disabled
 style={{  margin: 1, width: 200,  bottom:40, marginLeft: 50 }}
 fullWidth
 margin="normal"/>  <br/>
  <TextField 
  name='role'
 label={this.state.seeData.role}
 disabled
 style={{  margin: 1, width: 200, bottom: 40, marginLeft: 50  }}
 fullWidth
 margin="normal"/>  <br/>
 <TextField name='profile'
 label={this.state.seeData.profile}
 disabled
 style={{ margin: 1, width: 200, bottom: 40, marginLeft: 50  }}
 fullWidth
 margin="normal"/>  <br/>
<TextField name='highlighted'
 label={this.state.seeData.highlighted}
 disabled
 style={{  margin: 1, width: 240, bottom: 40, marginLeft: 50   }}
 fullWidth
 margin="normal"/>
 <br/>
 <TextField name='can'
 label={this.state.seeData.can}
 disabled
 style={{  margin: 1, width: 270, bottom: 40, marginLeft: 50   }}
 fullWidth
 margin="normal"/>  <br/>
 <TextField name='phoneNumber' id='phoneNumber'
 label={this.state.seeData.phoneNumber}
 disabled
 style={{ margin: 1, width: 200, bottom: 40, marginLeft: 50   }}
 fullWidth
 margin="normal"/><br/>

         </Col>
         <Col>
         <br/> 
<TextField 
name='name' id='name'
 label={this.state.seeData.name}
 disabled
 style={{marginLeft: -150, width: 200, bottom:7}}
 fullWidth
 margin="normal"/> 

 <br/>
  <TextField name='surname' id='surname'
 label={this.state.seeData.surname}
 disabled
 style={{marginLeft: -150,  width: 200,bottom:29}}
 fullWidth
 margin="normal"/><br/>
 <TextField name='sex' id='sex'
 label={this.state.seeData.sex}
 disabled
 style={{marginLeft: -150, width: 200, bottom:50}}
 fullWidth
 margin="normal"/><br/>
 <TextField name='birthDate' id='birthDate'
 label={this.state.seeData.birthDate}
 disabled
 style={{marginLeft: -150, width: 200,  bottom:73  }}
 fullWidth
 margin="normal"/><br/>
 <TextField name='city'
 label={this.state.seeData.city}
 disabled
 style={{marginLeft: -150,  width: 200,  bottom:83 }}
 fullWidth
 margin="dense"/> <br/>
 <TextField name='district'
 label={this.state.seeData.district}
 disabled
 style={{marginLeft: -150, width: 200,  bottom:102   }}
 fullWidth
 margin="normal"/>
 <br/>
 </Col>
  
 </Row>
 <br/><br/>
 {this.showInformations(this.state.role)}
 
  <Row>
<Col>
         <br/><br/>
         <Typography style={{bottom:152, marginLeft:-400, marginTop:-90}} variant="subtitle1" gutterBottom>
        Descrizione: &nbsp;</Typography>
         <TextareaAutosize
         style={{ width: 600,  borderColor:'white', overflow: 'auto'}}
      rowsMax={7}
      disabled
      aria-label="maximum height"
      placeholder="Maximum 4 rows"
      defaultValue="Questo sito utilizza cookie, di prima e di terza parte, per mostrarti pubblicità in linea con le tue preferenze e per misurare le prestazioni di annunci e contenuti pubblicati, come esplicato nella cookie policy. In particolare, noi e alcuni partner selezionati potremmo utilizzare dati di geolocalizzazione precisi e fare una scansione attiva delle caratteristiche del dispositivo ai fini dell’identificazione con lo scopo di archiviare e/o accedere ad alcune informazioni su un dispositivo e conseguentemente trattare i tuoi dati personali (es. dati di navigazione, indirizzi IP, etc.) per le seguenti finalità: annunci e contenuti personalizzati, valutazione dell’annuncio e del contenuto, osservazioni del pubblico, sviluppare e perfezionare i prodotti."
    />
         </Col>
</Row>

  <Row>
  <div >
  <Link to="/home"><font face='Georgia' color="white">
   
   <button style={{marginRight:10, marginTop:60}} onClick={this.deleteProfile} className="buttonp buttonpp" >Elimina Profilo</button></font></Link>
    <font  face='Georgia' color="white">
   &nbsp; <button style={{marginRight:10, marginTop:60}} onClick={this.canUpdate} type="submit" className="buttonp buttonpp"  >Aggiorna Profilo</button></font>
    <font> <button style={{marginRight:10, marginTop:60}} onClick={this.updateProfile} className="buttonp buttonpp" hidden>Salva</button></font>
         </div>
</Row>
     </Container>
   </div>
   </div>
    )
  }
}

export default Profile