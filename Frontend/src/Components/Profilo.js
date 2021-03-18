import React from 'react'
import '../App.css';

import { Col, Row } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import logomodi from '..//logomodi.png';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PersonOutlineSharpIcon from '@material-ui/icons/PersonOutlineSharp';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Container } from 'react-bootstrap';
import CakeOutlinedIcon from '@material-ui/icons/CakeOutlined';
import PlaceOutlinedIcon from '@material-ui/icons/PlaceOutlined';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import CallOutlinedIcon from '@material-ui/icons/CallOutlined';
import Avatar from '@material-ui/core/Avatar';
import avatar from '..//default.jpg';
//import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import util from '..//util/util'
import { Component } from 'react';


class Profilo extends Component {
  constructor(props){
    super(props)
    this.state = {
      email:'',
      role:'',
      name:'',
      surname:'',
      sex:'',
      birthDate:'',
      city:'',
      district:'',
      description:'',
      phoneNumber:'',
      anchorEl:''
    }
}

  setData = (data, specificData) => {
    this.setState({email: data.email});
    this.setState({role: data.role});
    this.setState({name: specificData.name});
    this.setState({surname: specificData.surname});
    this.setState({sex: specificData.sex});
    this.setState({birthDate: specificData.birthDate});
    this.setState({city: specificData.city});
    this.setState({district: specificData.district});
    this.setState({description: specificData.description});
    this.setState({phoneNumber: specificData.phoneNumber});
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
    .catch((err)=> alert(err));
  }
  

  deleteProfile = () => {
    axios.delete('http://localhost:3000/api/v1/users/myProfile').then(profile => {
        alert('utente eliminato');
        setTimeout(()=> {
          window.location.assign('/');
           }, 10); 
           axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.eraseCookie('user_jwt');
      })
    .catch((err)=>alert(err));
  }

  logout = () => {
    setTimeout(()=> {
      window.location.assign('/');
       }, 10); 
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.eraseCookie('user_jwt');
  }

  /* updateProfile = () => {
    axios.patch('http://localhost:3000/api/v1/users/myProfile')
  }*/


  handleClick = (event) => {
    this.setState({anchorEl:event.currentTarget});
  }
  handleClose = () => {
    this.setState({anchorEl:null});
  };


  render(){
    
    return(
      <div>
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
            <Link to="/signup"> <MenuItem onClick={this.handleClose}>Passa a profilo premium</MenuItem></Link>
            <MenuItem onClick={this.logout}>Logout</MenuItem>
          </Menu>
        </ul>
    </div>
    
    <br/><br/><br/>
    <Box height="5%" width="10%" mb="10%" m="2%" ml="45%"  bgcolor="text.primary" >
     <font size="5" face='Georgia' color="white"> My Profile</font>
    </Box>
   <div className="mprofile">
     <Container >
       <Row>
         <Col sm={1}>
         <Box  m="4rem" ml="3rem" mt="100px" >
<Avatar  alt="Remy Sharp" src={avatar} style={{
      bottom:40,
      margin: -50,
      top:-15, 
      width:200,
      height:200}} />
</Box>
         </Col>
         <Col sm={7}>
       <br/><br></br>  <TextField name='email'
 label={this.state.email}
 disabled
 style={{  margin: 1  , width: 300, left:70}}
 fullWidth
 margin="normal"/>
  <TextField name='role'
 label={this.state.role}
 disabled
 style={{  margin: 1, width: 300, left:70 }}
 fullWidth
 margin="normal"/> 
 <TextField name='name'
 label={this.state.name}
 disabled
 style={{ margin: 1, width: 300, left:70 }}
 fullWidth
 margin="normal"/> 
<TextField name='surname'
 label={this.state.surname}
 disabled
 style={{  margin: 1, width: 300, left:70 }}
 fullWidth
 margin="normal"/> 
         </Col>
        
 </Row>
<Row >
  <Col >
 <PersonOutlineSharpIcon fontSize="large" />
 <TextField name='sex'
 label={this.state.sex}
 disabled
 style={{ margin: 5, width: 70, left:-4, bottom:6 }}
 fullWidth
 margin="dense"/> 
&nbsp;<CakeOutlinedIcon fontSize="large"/>
 <TextField name='birthDate'
 label={this.state.birthDate}
 disabled
 style={{ margin: 10, width: 130, left:-4, bottom:14 }}
 fullWidth
 margin="normal"/>
<PlaceOutlinedIcon fontSize="large"/>
 <TextField name='city'
 label={this.state.city}
 disabled
 style={{ margin: -10, width: 110, left:5, bottom:-6    }}
 fullWidth
 margin="normal"/>
  </Col>
  <Row>
<Col>
<AssignmentOutlinedIcon fontSize="large"/>
 <TextField name='description'
 label={this.state.description}
 disabled
 style={{ margin: -10, width: 100, left:10, bottom:6}}
 fullWidth
 margin="normal"/>&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;<CallOutlinedIcon fontSize="large"/>&nbsp;
 <TextField name='phoneNumber'
 label={this.state.phoneNumber}
 disabled
 style={{ margin: -10, width: 150, left:10, bottom:6 }}
 fullWidth
 margin="normal"/> &nbsp;&nbsp;&nbsp;&nbsp;
 &nbsp;&nbsp;<PlaceOutlinedIcon fontSize="large"/>
 <TextField  name='district'
 label={this.state.district}
 disabled
 style={{ margin: -10, width: 150, left:10, bottom:6}}
 fullWidth
 margin="normal"/> 

</Col>
</Row>

</Row>
<div className="bottoni"><font face='Georgia' color="white">
   <br/> &nbsp;&nbsp;<button onClick={this.deleteProfile} className="buttonp buttonpp" >Elimina Profilo</button></font>
    <font  face='Georgia' color="white">
    &nbsp;&nbsp; <button type="submit" className="buttonp buttonpp"  >Aggiorna Profilo</button></font>
         </div>
     </Container>
     
   </div>
    </div>
   
      </div>

    );
  }

}
export default Profilo;
