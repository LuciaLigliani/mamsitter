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
import avatar from '..//default.jpg';
import Typography from '@material-ui/core/Typography';
import Form from 'react-bootstrap/Form'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Table from 'react-bootstrap/Table'

class Profile extends Component{
  constructor(props){
    super(props);
    this.state= {
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
      car:'',
      work:'',
      available:'',
      languages:'',
      open: false,
      message:'',
      anchorEl:'',


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
<Avatar  alt="Remy Sharp" src={avatar} style={{
      bottom:40,
      margin: -55,
      top:16, 
      width:150,
      height:150}} />
</Box>
         </Col>
         <Col sm={7}>
       <br/>  <br/> <br/>  
       <TextField name='email'
 label='{this.state.seeData.email}'
 disabled
 style={{  margin: 1, width: 200, left:-80, bottom:40 }}
 fullWidth
 margin="normal"/>  <br/>
  <TextField 
  name='role'
 label='{this.state.seeData.role}'
 disabled
 style={{  margin: 1, width: 200, left:-80, bottom: 40 }}
 fullWidth
 margin="normal"/>  <br/>
 <TextField name='name'
 label='{this.state.seeData.profile}'
 disabled
 style={{ margin: 1, width: 200, left:-80, bottom: 40 }}
 fullWidth
 margin="normal"/>  <br/>
<TextField name='surname'
 label='highlighted'
 disabled
 style={{  margin: 1, width: 200, left:-80, bottom: 40  }}
 fullWidth
 margin="normal"/>  <br/>
 <TextField name='profile'
 label='{this.state.seeData.can}'
 disabled
 style={{  margin: 1, width: 200, left:-80, bottom: 40  }}
 fullWidth
 margin="normal"/>  <br/>
 <TextField name='city'
 label='{this.state.seeData.city}'
 disabled
 style={{ margin: 1, width: 200, left:-80, bottom: 40  }}
 fullWidth
 margin="normal"/><br/>
  <TextField name='phoneNumber'
 label='{this.state.seeData.phoneNumber}'
 disabled
 style={{ margin: 1, width: 200, left:-80, bottom: 40 }}
 fullWidth
 margin="normal"/> 

         </Col>
         <Col>
         <br/><br/>
         <TextareaAutosize
         style={{  marginLeft: 70  , width: 200, top:1000, borderColor:'white', overflow: 'auto'}}
      rowsMax={4}
      disabled
      aria-label="maximum height"
      placeholder="Maximum 4 rows"
      defaultValue="DescrizioneDescrizioneDescrizioneDescrizioneDescrizioneDescrizioneDescrizioneDescrizioneDescrizioneDescrizioneDescrizioneDescrizioneDescrizioneDescrizioneDescrizioneDescrizioneDescrizioneDescrizioneDescrizioneDescrizioneDescrizioneDescrizioneDescrizioneDescrizioneDescrizioneDescrizioneDescrizioneDescrizioneDescrizioneDescrizioneDescrizioneDescrizioneDescrizioneDescrizioneDescrizioneDescrizioneDescrizioneDescrizioneDescrizioneDescrizioneDescrizioneDescrizioneDescrizioneDescrizioneDescrizioneDescrizioneDescrizioneDescrizioneDescrizioneDescrizioneDescrizioneDescrizioneDescrizioneDescrizione"
    />
         </Col>
         <Col>
         <br/> 
<TextField 
name='work'
 label='{this.state.seeData.name}'
 disabled
 style={{  marginLeft: -800  , width: 200, bottom:7}}
 fullWidth
 margin="normal"/> 

 <br/>
  <TextField name='available'
 label='{this.state.seeData.surname}'
 disabled
 style={{  marginLeft: -800  , width: 200,bottom:29}}
 fullWidth
 margin="normal"/><br/>
 <TextField name='languages'
 label='{this.state.seeData.sex}'
 disabled
 style={{  marginLeft: -800 , width: 200, bottom:50}}
 fullWidth
 margin="normal"/><br/>
 <TextField name='car'
 label='{this.state.seeData.birthday}'
 disabled
 style={{ marginLeft:-800  , width: 200,  bottom:73  }}
 fullWidth
 margin="normal"/><br/>
 <TextField name='sex'
 label='{this.state.seeData.city}'
 disabled
 style={{marginLeft:-800  , width: 200,  bottom:83 }}
 fullWidth
 margin="dense"/> <br/>
 <TextField name='birthDate'
 label='{this.state.seeData.district}'
 disabled
 style={{ marginLeft:-800  , width: 200,  bottom:102   }}
 fullWidth
 margin="normal"/>
 <br/>
 <TextField name='birthDate'
 label='{this.state.seeData.languages}'
 disabled
 style={{ marginLeft:-800  , width: 200,  bottom:125   }}
 fullWidth
 margin="normal"/>
 </Col>
  
 </Row>
<Row >
        <Col sm={3}>
<Typography style={{bottom:152, marginLeft:50, marginTop:-90}} variant="subtitle1" gutterBottom>
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
  <Typography style={{bottom:152, marginRight:200, marginTop:-90}} variant="subtitle1" gutterBottom>
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
<Typography style={{bottom:152, marginLeft:-300, marginTop:-90}} variant="subtitle1" gutterBottom>
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
   
   <button style={{marginRight:10, marginTop:60}} onClick={this.deleteProfile} className="buttonp buttonpp" >Elimina Profilo</button></font></Link>
    <font  face='Georgia' color="white">
   &nbsp; <button style={{marginRight:10, marginTop:60}} onClick={this.canUpdate} type="submit" className="buttonp buttonpp"  >Aggiorna Profilo</button></font>
    <font> <button style={{marginRight:10, marginTop:60}} onClick={this.updateProfile} className="buttonp buttonpp" >Salva</button></font>
         </div>
</Row>

</Row>

     </Container>
     
   
   </div>
   
   </div>
   





    )







  }
}

export default Profile