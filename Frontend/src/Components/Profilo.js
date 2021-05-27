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
import Avatar from '@material-ui/core/Avatar';
// import avatar from '..//default.jpg';
//import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import util from '..//util/util'
import { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Snackbar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

class Profilo extends Component {
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
      open: false,
      message:'',
      anchorEl:'',
      seeData:''
    }
}
  handleClose= (e) => {
  this.setState({open:false})
  }

  setData = (data, specificData) => {
    let birthDate = '';
    birthDate=new Date(specificData.birthDate).toLocaleDateString();
    let car = '';
    if(specificData.car === true) car = 'SI';
    if(specificData.car === false) car = 'NO';
    let languages = '';
    if(specificData.languages !== undefined){
      languages = specificData.languages.toString();
    }
    let work = '' ; 
    if(specificData.occasional === true) work += 'occasionale, ' ;
    if(specificData.regular === true) work += 'regolare, ' ;
    if(specificData.diurnal === true) work += 'giornaliero, ' ;
    if(specificData.atHour === true)work += 'ad orario, ' ;
    if(specificData.allDay === true) work += 'al giorno, ' ;
    if(specificData.nocturnal === true) work += 'notturno, ' ;
    work = work.substring(0, work.length - 2);
    let available = '' ;
    if(specificData.homework === true) available +='aiuto compiti, ';
    if(specificData.cook === true) available += 'cucinare, ';
    if(specificData.moreChildren === true) available += 'più bimbi, ';
    if(specificData.alsoColf === true) available += 'pulizie, ';
    if(specificData.moreSeniors === true) available += 'più anziani, ';
    if(specificData.beSelfSufficient === false) available += 'non autosufficienti, ';
    available=available.substring(0, available.length - 2);
    const info = {
      email: data.email,
      role: data.role,
      name: specificData.name,
      surname: specificData.surname,
      sex: specificData.sex,
      birthDate: birthDate,
      city: specificData.city,
      district: specificData.district,
      description: specificData.description,
      phoneNumber: specificData.phoneNumber,
      car: car,
      work: work,
      available: available,
      languages: languages
    };
    this.setState({
      seeData: info
    });
    this.setState({email: data.email});
    this.setState({role: data.role});
    this.setState({photo: data.photo});
    this.setState({name: specificData.name});
    this.setState({surname: specificData.surname});
    this.setState({sex: specificData.sex});
    this.setState({birthDate: specificData.birthDate});
    this.setState({city: specificData.city});
    this.setState({district: specificData.district});
    this.setState({description: specificData.description});
    this.setState({phoneNumber: specificData.phoneNumber});
    this.setState({car: specificData.car});
    this.setState({work: work});
    this.setState({available: available});
    this.setState({languages: languages});
    
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
      console.log(this.state.id);
      // axios.get(`http://localhost:3000/api/v1/users/${this.state.id}/file/${this.state.photo}`).then(response => {
      //   this.setState({photo: response.data});
      // })
      // .catch((err)=>console.log(err));
    })
    .catch((err)=> {
    
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
    this.setState({open:true, message:'Logout effettuato'})
    setTimeout(()=> {
      this.setState({open:false})
         }, 2000);  
    setTimeout(()=> {
      window.location.assign('/');
       }, 1000); 
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.eraseCookie('user_jwt');
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]:e.target.value})
  }


  updateProfile = () => {
    console.log(this.state.car);
    axios.patch('http://localhost:3000/api/v1/users/myProfile', this.state).then(profile=>{
     /* if(response.data.status === 'success') {
        this.setState({open:true, message:'Profilo aggirornat'})
       setTimeout(()=> {
          window.location.assign('/login');
        }, 10);
      }*/
    //alert con scritto: profilo aggiornato correttamente
    
    })

  }

  canUpdate = () => {
    console.log(this.state.car);
    document.getElementById('role').disabled = false;


  }


  handleClick = (event) => {
    this.setState({anchorEl:event.currentTarget});
  }
  handleClose = () => {
    this.setState({anchorEl:null});
  };


  render(){
    
    return(<div>
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
      <div>
  <div className="profile">
      <div className="Navbar">
      <Link to="/"><img src={logomodi} className="navbarLogo" alt="logo"/></Link>
        <ul className="linksNav">
          <Link to="/">
            <li><font face='Georgia' color='black' >I NOSTRI SERVIZI</font></li>
          </Link>
          <Link to="/">
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
   <div className="mprofile">
     <Container >
       <Row>
         <Col sm={1}>
         <Box  m="4rem" ml="3rem" mt="100px" >
<Avatar  alt="Remy Sharp" src={`/api/v1/users/${this.state.id}/file/${this.state.photo}`} style={{
      bottom:40,
      margin: -55,
      top:16, 
      width:170,
      height:170}} />
</Box>
         </Col>
         <Col sm={7}>
       <br/>  <br/>
  <TextField 
  id='role'
  name='role'
 label={this.state.seeData.role}
 disabled
 style={{  margin: 1, width: 200, left:-80 }}
 fullWidth
 margin="normal"/>  <br/>
 <TextField name='name'
 label={this.state.seeData.name}
 disabled
 style={{ margin: 1, width: 200, left:-80 }}
 fullWidth
 margin="normal"/>  <br/>
<TextField name='surname'
 label={this.state.seeData.surname}
 disabled
 style={{  margin: 1, width: 200, left:-80 }}
 fullWidth
 margin="normal"/>  <br/>
         </Col>
         <Col>
         <Typography style={{marginTop:52, marginLeft:-730}} variant="subtitle1" gutterBottom>
        Tipo di lavoro: &nbsp;</Typography>
     
<TextField 
name='work'
 label={this.state.seeData.work}
 disabled
 style={{  marginLeft: -200    , width: 400, bottom:70}}
 fullWidth
 margin="normal"/> 

 <br/>
 <Typography style={{marginTop:-38, marginLeft:-730}} variant="subtitle1" gutterBottom> Disponibilità a: &nbsp;
        </Typography>
  <TextField name='available'
 label={this.state.seeData.available}
 disabled
 style={{  marginLeft: -200  , width: 400,bottom:70}}
 fullWidth
 margin="normal"/><br/>
 <Typography style={{marginTop:-35, marginLeft:-730}} variant="subtitle1" gutterBottom> Lingue parlate:&nbsp;
        </Typography>
 <TextField name='languages'
 label={this.state.seeData.languages}
 disabled
 style={{  marginLeft: -196 , width: 400, bottom:70}}
 fullWidth
 margin="normal"/>
 <Typography style={{marginTop:-40, marginLeft:-750}} variant="subtitle1" gutterBottom> Automunita:
        </Typography>
 <TextField name='car'
 label={this.state.seeData.car}
 disabled
 style={{ marginLeft:-530  , width: 100,  bottom:70  }}
 fullWidth
 margin="normal"/>
 </Col>
        
 </Row>
<Row >
  <Col >
 <br/>
 <TextField name='sex'
 label={this.state.seeData.sex}
 disabled
 style={{ margin: 1, width: 40, left:-40, bottom:80 }}
 fullWidth
 margin="dense"/> 

 <TextField name='birthDate'
 label={this.state.seeData.birthDate}
 disabled
 style={{ margin: 10, width: 130, left:-10, bottom:91 }}
 fullWidth
 margin="normal"/>
 <TextField name='city'
 label={this.state.seeData.city}
 disabled
 style={{ margin: -10, width: 110, left:30, bottom:70   }}
 fullWidth
 margin="normal"/>
  </Col>
  <Row>
<Col>
 <TextField name='phoneNumber'
 label={this.state.seeData.phoneNumber}
 disabled
 style={{ margin: -10, width: 130, left:-10, bottom:90 }}
 fullWidth
 margin="normal"/> 
 <TextField  name='district'
 label={this.state.seeData.district}
 disabled
 style={{ margin: -10, width: 120, left:45, bottom:90}}
 fullWidth
 margin="normal"/> 

</Col>
</Row>

</Row>

     </Container>
   
   </div>
    </div>
    <div className="bottoni">
  <font face='Georgia' color="white">
   
   <button onClick={this.deleteProfile} className="buttonp buttonpp" >Elimina Profilo</button></font>
    <font  face='Georgia' color="white">
    &nbsp;&nbsp; <button onClick={this.canUpdate} type="submit" className="buttonp buttonpp"  >Aggiorna Profilo</button></font>
    <font> <button onClick={this.updateProfile} className="buttonp buttonpp" >Salva</button></font>
         </div>
      </div>
      </div>
    );
  }

}
export default Profilo;
