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
// import Avatar from '@material-ui/core/Avatar';
// import avatar from '..//default.jpg';
// import photo from '..//photo.jpg';
import Typography from '@material-ui/core/Typography';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import Form from 'react-bootstrap/Form'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Table from 'react-bootstrap/Table'
import axios from 'axios';
import util from '..//util/util';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Snackbar } from '@material-ui/core';

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
    if (data.role !== 'famiglia') {
      highlighted = data.highlighted === true ? 'Sei in vetrina!' : 'Abbonati per andare in vetrina!';

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
    document.getElementById(specificData.sex).checked = true;
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
    if(!util.getCookie('user_jwt')) {
      setTimeout(()=> {
        window.location.assign('/notAuthenticated');
           }, 0);
    }
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.getCookie('user_jwt');
    axios.get('http://localhost:3000/api/v1/users/myProfile').then(profile => {
      let specificData;
      if (profile.data.data.role === 'admin') setTimeout(()=> {
        window.location.assign('/unauthorized');
           }, 0);
      if(profile.data.data.role === 'famiglia') specificData = profile.data.data.famiglia_id;
      if(profile.data.data.role === 'babysitter') specificData = profile.data.data.babysitter_id;
      if(profile.data.data.role === 'badante') specificData = profile.data.data.badante_id;
      if(profile.data.data.role === 'colf') specificData = profile.data.data.colf_id;
      this.setData(profile.data.data , specificData);
      
    })
    .catch(error=>{
      this.setState({open:true, message:error.response.data.message});
      setTimeout(()=> {
        this.setState({open:false})
           }, 2000);
        console.log(error);
      })
  }

  deleteProfile = () => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.getCookie('user_jwt');
    axios.delete('http://localhost:3000/api/v1/users/myProfile').then(profile => {
      this.setState({open:true, message:'Account eliminato'})
      setTimeout(()=> {
        this.setState({open:false})
           }, 2000);
        setTimeout(()=> {
          window.location.assign('/');
           }, 1000); 
           axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.eraseCookie('user_jwt');
      })
      .catch(error=>{
        this.setState({open:true, message:error.response.data.message});
        setTimeout(()=> {
          this.setState({open:false})
             }, 2000);
          console.log(error);
        })
  }

  logout = () => {
    this.setState({open:true, message:'Logout effettuato'})
    setTimeout(()=> {
      this.setState({open:false})
         }, 2000);
        setTimeout(()=> {
          window.location.assign('/');
           }, 1000);
    
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.eraseCookie('user_jwt');
  }

  canUpdate = () => {
    // update photo
    // const image = <div class="inner">
    // <input class="inputfile" type="file"  accept="image/*" name='photo' onChange={this.changeHandler}/>
    // <label><img src={photo} width="35" alt=''></img></label>
    // </div>;
    document.getElementById('phoneNumber').disabled = false;
    document.getElementById('phoneNumber').style.backgroundColor = '#afafaf3d';
    document.getElementById('name').disabled = false;
    document.getElementById('name').style.backgroundColor = '#afafaf3d';
    document.getElementById('surname').disabled = false;
    document.getElementById('surname').style.backgroundColor = '#afafaf3d';
    document.getElementById('M').disabled = false;
    document.getElementById('F').disabled = false;
    document.getElementById('birthDate').disabled = false;
    document.getElementById('birthDate').style.backgroundColor = '#afafaf3d';
    document.getElementById('abbonamenti').hidden = true;
    document.getElementById('elimina').hidden = true;
    if (this.state.role !== 'famiglia') {
      document.getElementById('occasional').disabled = false;
      document.getElementById('regular').disabled = false;
      document.getElementById('allDay').disabled = false;
      document.getElementById('atHour').disabled = false;
      document.getElementById('diurnal').disabled = false;
      document.getElementById('nocturnal').disabled = false;
      document.getElementById('homework').disabled = false;
      document.getElementById('cook').disabled = false;
      document.getElementById('car').disabled = false;
      document.getElementById('alsoColf').disabled = false;

      const array = ['l', 'ma', 'me', 'g', 'v', 's', 'd'];
      const arr = ['m', 'p', 's', 'n'];
      arr.forEach(part => {
        array.forEach(day => {
          const id = part + day;
          document.getElementById(id).disabled = false;
        })
      })
    }
    document.getElementById('salva').hidden = false;
    document.getElementById('aggiorna').hidden = true;
    document.getElementById('description').disabled = false;
    document.getElementById('description').style.backgroundColor = '#afafaf3d';
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    // const update = {
    //   photo: image
    // }
    // this.setState({update: update});
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

  changeHandler = (e) => {
    // if (e.target.name === 'photo') {
    //   // this.setState({[e.target.name]:e.target.value.split('\\')[2].split('.')[0]});
    //   // console.log(e.target.value.split('\\')[2].split('.')[0]);
      // this.setState({'photo': e.target.files[0]});
    //   console.log(e.target.files);
    // }

     if (e.target.id === 'M' && e.target.value === 'on') e.target.value = 'M';
    else if (e.target.id === 'F' && e.target.value === 'on') e.target.value = 'F';
    else if (e.target.name === 'occasional') e.target.value = e.target.checked;
    else if (e.target.name === 'regular') e.target.value = e.target.checked;
    else if (e.target.name === 'diurnal') e.target.value = e.target.checked;
    else if (e.target.name === 'nocturnal') e.target.value = e.target.checked;
    else if (e.target.name === 'allDay') e.target.value = e.target.checked;
    else if (e.target.name === 'atHour') e.target.value = e.target.checked;
    else if (e.target.name === 'homework') e.target.value = e.target.checked;
    else if (e.target.name === 'cook') e.target.value = e.target.checked;
    else if (e.target.name === 'car') e.target.value = e.target.checked;
    else if (e.target.name === 'alsoColf') e.target.value = e.target.checked;
    this.setState({[e.target.name]: e.target.value});
  }

  updateProfile = () => {
    if(this.state.role !== 'famiglia'){
      const array = ['l', 'ma', 'me', 'g', 'v', 's', 'd'];
      const arr = ['m', 'p', 's', 'n'];
      const availableDays = [];
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
            availableDays.push(value);
          }
        })
      });
      // this.setState({availableDays: availableDays});
      // eslint-disable-next-line react/no-direct-mutation-state
      this.state.availableDays = availableDays;
    }
    // this.state.photo = document.getElementById('photo').files[0];
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.getCookie('user_jwt');
    axios.patch('http://localhost:3000/api/v1/users/myProfile', this.state).then(response=>{
      if(response.data.status === 'success') {
        this.setState({open:true, message:'Profilo aggiornato correttamente'})
        setTimeout(()=> {
          this.setState({open:false})
             }, 2000);
       setTimeout(()=> {
          window.location.assign('/myProfile');
        }, 1000);
      }
    }).catch(error=>{
      this.setState({open:true, message:error.response.data.message});
      setTimeout(()=> {
        this.setState({open:false})
           }, 2000);
        console.log(error);
      })
  }

  menu = () => {
    if(this.state.me === 'famiglia' && this.state.can === true)
  return (<div>
      <Link to="/search"><MenuItem  onClick={this.handleClose}>Cerca</MenuItem></Link> 
      <Link to="/createann"><MenuItem  onClick={this.handleClose}>Crea annuncio</MenuItem></Link> 
      <Link to="/viewallann"><MenuItem  onClick={this.handleClose}>I miei annunci</MenuItem></Link> 
      <Link to="/payments"><MenuItem  onClick={this.handleClose}>Cambia tipo di profilo</MenuItem></Link> 
      <Link to="/">  <MenuItem onClick={this.logout}>Logout</MenuItem></Link>
    </div>)
  else if(this.state.me === 'famiglia' && this.state.can === false)
  return (<div>
      <Link to="/search"><MenuItem  onClick={this.handleClose}>Cerca</MenuItem></Link> 
      <Link to="/payments"><MenuItem  onClick={this.handleClose}>Crea annuncio</MenuItem></Link>
      <Link to="/payments"><MenuItem  onClick={this.handleClose}>Cambia tipo di profilo</MenuItem></Link> 
      <Link to="/">  <MenuItem onClick={this.logout}>Logout</MenuItem></Link>
    </div>)
    // if (this.state.role === 'admin')
    if(this.state.me !== 'famiglia' && this.state.can === true)
  return (<div>
      <Link to="/announcement"><MenuItem  onClick={this.handleClose}>Cerca</MenuItem></Link> 
      <Link to="/viewallapplication"><MenuItem  onClick={this.handleClose}>Le mie candidature</MenuItem></Link>
      <Link to="/">  <MenuItem onClick={this.logout}>Logout</MenuItem></Link>
    </div>)
  else if(this.state.me !== 'famiglia' && this.state.can === false)
  return (<div>
      <Link to="/announcement"><MenuItem  onClick={this.handleClose}>Cerca</MenuItem></Link> 
      <Link to="/payments"><MenuItem  onClick={this.handleClose}>Le mie candidature</MenuItem></Link>
      <Link to="/">  <MenuItem onClick={this.logout}>Logout</MenuItem></Link>
    </div>)
  }

  showInformations = (role) => {
    if (role !== 'famiglia') {
      return (
     <div>   
<Row >
        <Col sm={3}>
<Typography style={{bottom:152, marginLeft:45, marginTop:-90}} variant="subtitle1" gutterBottom>
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
<Typography style={{bottom:152, marginLeft:-250, marginTop:-90}} variant="subtitle1" gutterBottom>
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
      <Link to="/"><img src={logomodi} className="navbarLogo" alt="logo"/></Link>
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
            {this.menu()}
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
  
    {/* {this.state.update.photo} */}
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
 {this.state.seeData.role !== 'famiglia' && this.state.seeData.profile === 'premium' ? (<VerifiedUserIcon style={{color:'green', fontSize:30, marginTop: -50, marginRight:-30}}/>) : (<div/>)}
 <TextField name='profile'
 label={this.state.seeData.profile}
 disabled
 style={{ margin: 1, width: 200, bottom: 40, marginLeft: 50  }}
 fullWidth
 margin="normal"/>  <br/>
{this.state.seeData.role !== 'famiglia' ? (<div><TextField name='highlighted'
 id='highlighted'
 label={this.state.seeData.highlighted}
 disabled
 style={{  margin: 1, width: 240, bottom: 40, marginLeft: 50   }}
 fullWidth
 margin="normal"/>
 <br/></div>) : (<div/>)}
<TextField name='can'
 label={this.state.seeData.can}
 disabled
 style={{  margin: 1, width: 270, bottom: 40, marginLeft: 50   }}
 fullWidth
 margin="normal"/>  <br/>
 <TextField name='phoneNumber' id='phoneNumber'
 onChange={this.changeHandler}
 label={this.state.seeData.phoneNumber}
 disabled
 type="tel"
 style={{ margin: 1, width: 200, bottom: 40, marginLeft: 50   }}
 fullWidth
 margin="normal"/><br/>
 <Link to='/payments' id='abbonamenti'><button class='button1 button2'>Vai agli abbonamenti</button></Link>
         </Col>
         <Col>
         <br/> <br/><br/>
<TextField 
name='name' id='name'
onChange={this.changeHandler}
 label={this.state.seeData.name}
 disabled
 style={{marginLeft: -150, width: 200, bottom:7}}
 fullWidth
 margin="normal"/> 

 <br/>
  <TextField name='surname' id='surname'
  onChange={this.changeHandler}
 label={this.state.seeData.surname}
 disabled
 style={{marginLeft: -150,  width: 200,bottom:29}}
 fullWidth
 margin="normal"/><br/>
 <TextField 
 label="Sesso: "
 disabled
 style={{marginLeft: -160,  width: 60, top:-55}}
 fullWidth
 margin="normal"/>
 <input type="radio" id="M" name="sex" onChange={this.changeHandler} style={{marginLeft:20, width: 30, top:-30}} disabled/> <label for="M" style={{color:'grey'}}>M</label>
 <input type="radio" id="F" name="sex" onChange={this.changeHandler} style={{marginLeft:20, width: 30, top:-300}} disabled/> <label for="F" style={{color:'grey'}}>F</label><br/>
 <TextField name='birthDate' id='birthDate'
 onChange={this.changeHandler}
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
         onChange={this.changeHandler}
         style={{ width: 600,  borderColor:'white', overflow: 'auto'}}
         name="description"
         id="description"
      rowsMax={7}
      disabled
      aria-label="maximum height"
      placeholder={this.state.seeData.description}
      />
         </Col>
</Row>

  <Row>
  <div >
  <font face='Georgia' color="white">
   <button style={{marginRight:10, marginTop:60}} onClick={this.deleteProfile} className="buttonp buttonpp" id= 'elimina'>Elimina Profilo</button></font>

    <font  face='Georgia' color="white">
   &nbsp; <button style={{marginRight:10, marginTop:60}} onClick={this.canUpdate} id="aggiorna" className="buttonp buttonpp"  >Aggiorna Profilo</button></font>
    <font> <button style={{marginRight:10, marginTop:60}} onClick={this.updateProfile} id="salva" className="buttonp buttonpp" hidden>Salva</button></font>
         </div>
         <br/> 
</Row>
     </Container>
   </div>
   </div>
   </div>
    )
  }
}

export default Profile