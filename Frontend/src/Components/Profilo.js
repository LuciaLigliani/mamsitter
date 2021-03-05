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
import avatar from '..//avatar.png';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import util from '..//util/util'

/*
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
      phoneNumber:''
    }
    

setData = (data, specificData) => {
  this.email= data.email;
  this.role = data.role;
  this.name = specificData.name;
  this.surname = specificData.surname;
  this.sex = specificData.sex;
  this.birthDate = specificData.birthDate;
  this.city = specificData.city;
  this.district = specificData.district;
  this.description = specificData.description;
  this.phoneNumber = specificData.phoneNumber;
}


  
  }
  submitHandler = (e) => {
    e.preventDefault()
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.getCookie('user_jwt');
    axios.get('http://localhost:3000/api/v1/users/myProfile', this.state).then(response=>{
      let specificData;
          if(response.data.data.role === 'famiglia') specificData = response.data.data.famiglia_id;
          if(response.data.data.role === 'babysitter') specificData = response.data.data.babysitter_id;
          if(response.data.data.role === 'badante') specificData = response.data.data.badante_id;
          if(response.data.data.role === 'colf') specificData = response.data.data.colf_id;
    
          this.setData(response.data.data , specificData);
    
    if(response.data.status === 'success') {
      alert('ok');
      setTimeout(()=> {
      window.location.assign('/myProfile');
       }, 10);
    }
    })
    .catch(error=>{
      alert(error.response.data.message);
    })
    }
    

  handleClick = (event) => {
    this.setState({anchorEl:event.currentTarget});
  }
  handleClose = () => {
    this.setState({anchorEl:null});
  };


  render(){
    
    const data = this.props.email;
    console.log(data);

    
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
            <li><font face='Georgia' color='black'>DICONO DI NOI</font></li>
          </Link>
        <Button className="buttonNav" aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}> <AccountCircle/>
            <ArrowDropDownIcon></ArrowDropDownIcon>
        </Button>
          <Menu
              id="simple-menu"
              anchorEl={this.state.anchorEl}
              keepMounted
              open={Boolean(this.state.anchorEl)}
              onClose={this.handleClose}
            >
           <Link to="/myProfile"><MenuItem  onClick={this.handleClose}>Visualizza profilo</MenuItem></Link> 
            <Link to="/signup"> <MenuItem onClick={this.handleClose}>Passa a profilo premium</MenuItem></Link>
            <MenuItem onClick={this.handleClose}>Logout</MenuItem>
            
          </Menu>
        </ul>
    </div>
    
    <Box height="5%" width="10%" mb="0%" m="2rem" ml="35rem" bgcolor="text.primary" color="background.paper">
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
         <TextField name='email'
 label={this.state.props}
 disabled
 style={{  margin: 1, width: 300, left:80}}
 fullWidth
 margin="normal"/>
  <TextField name='role'
 label={this.state.role}
 disabled
 style={{  margin: 1, width: 300, left:80 }}
 fullWidth
 margin="normal"/> 
 <TextField name='name'
 label={this.state.name}
 disabled
 style={{ margin: 1, width: 300, left:80 }}
 fullWidth
 margin="normal"/> 
<TextField name='surname'
 label={this.state.surname}
 disabled
 style={{  margin: 1, width: 300, left:80 }}
 fullWidth
 margin="normal"/> 
         </Col>
         <Col sm={3}><font face='Georgia' color="white">
   <br/><br/><br/><br/> &nbsp;&nbsp;<button type="submit" className="buttonp buttonpp" >Elimina Profilo</button></font>
    <font  face='Georgia' color="white">
    <br/><br/> &nbsp;&nbsp; <button type="submit" className="buttonp buttonpp"  >Aggiorna Profilo</button></font>
         </Col>
 </Row>
<Row>
  <Col>
  <PersonOutlineSharpIcon fontSize="large" />&nbsp;
 <TextField name='sex'
 label={this.state.sex}
 disabled
 style={{ margin: -5, width: 70, left:-2, bottom:6 }}
 fullWidth
 margin="dense"/> &nbsp;&nbsp;
 &nbsp;<CakeOutlinedIcon fontSize="large"/>&nbsp;
 <TextField name='birthDate'
 label={this.state.birthDate}
 disabled
 style={{ margin: -10, width: 130, left:7, bottom:6 }}
 fullWidth
 margin="normal"/>&nbsp;&nbsp;
 &nbsp; &nbsp;&nbsp;<PlaceOutlinedIcon fontSize="large"/>&nbsp;
 <TextField name='city'
 label={this.state.city}
 disabled
 style={{ margin: -10, width: 110, left:7, bottom:6 }}
 fullWidth
 margin="normal"/>
  </Col>
  <Row>
<Col>
<br/><AssignmentOutlinedIcon fontSize="large"/>&nbsp;
 <TextField name='description'
 label={this.state.description}
 style={{ margin: -10, width: 100, left:7, bottom:6}}
 fullWidth
 margin="normal"/>&nbsp;&nbsp;
&nbsp;&nbsp;<CallOutlinedIcon fontSize="large"/>&nbsp;
 <TextField name='phoneNumber'
 label={this.state.phoneNumber}
 disabled
 style={{ margin: -10, width: 150, left:7, bottom:6 }}
 fullWidth
 margin="normal"/> &nbsp;&nbsp;&nbsp;&nbsp;
 &nbsp;&nbsp;<PlaceOutlinedIcon fontSize="large"/>
 <TextField  name='district'
 label={this.state.district}
 disabled
 style={{ margin: -10, width: 150, left:7, bottom:6}}
 fullWidth
 margin="normal"/> 

</Col>
</Row>

</Row>
     </Container>
     
   </div>
    </div>
      </div>

    );
  }


}
export default Profilo;
*/








const Profilo = () => {

  const [ciao] = React.useState({
    email:'',
    role:'',
    name:'',
    surname:'',
    sex:'',
    birthDate:'',
    city:'',
    district:'',
    description:'',
    phoneNumber:''
  })

  const setData = (data, specificData) => {
    ciao.email= data.email;
    ciao.role = data.role;
    ciao.name = specificData.name;
    ciao.surname = specificData.surname;
    ciao.sex = specificData.sex;
    ciao.birthDate = specificData.birthDate;
    ciao.city = specificData.city;
    ciao.district = specificData.district;
    ciao.description = specificData.description;
    ciao.phoneNumber = specificData.phoneNumber;
  }
 

  const getProfile = () => {
    axios.get('http://localhost:3000/api/v1/users/myProfile').then(profile => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.getCookie('user_jwt');
      let specificData;
      if(profile.data.data.role === 'famiglia') specificData = profile.data.data.famiglia_id;
      if(profile.data.data.role === 'babysitter') specificData = profile.data.data.babysitter_id;
      if(profile.data.data.role === 'badante') specificData = profile.data.data.badante_id;
      if(profile.data.data.role === 'colf') specificData = profile.data.data.colf_id;
      setData(profile.data.data , specificData);
      
    })
    .catch((err)=> alert(err));


  }

  const deleteProfile = () => {
   
    axios.delete('http://localhost:3000/api/v1/users/myProfile').then(profile => {
        alert('utente eliminato');
        setTimeout(()=> {
          window.location.assign('/');
           }, 10); 
           axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.eraseCookie('user_jwt');
      })
    .catch((err)=>alert(err));


    
  }

  const logout = () => {
    setTimeout(()=> {
      window.location.assign('/');
       }, 10); 
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.eraseCookie('user_jwt');
  }

  /*const updateProfile = () => {
    axios.patch('http://localhost:3000/api/v1/users/myProfile')
  }
*/

  const styles = makeStyles((theme) => ({
    avatar: {
      bottom:40,
      margin: -50,
      top:-15, 
      width:200,
      height:200
    }
  }))

  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const classe= styles();
 // console.log(ciao);
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
            <li><font face='Georgia' color='black'>DICONO DI NOI</font></li>
          </Link>
        <Button className="buttonNav" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}> <AccountCircle/>
            <ArrowDropDownIcon></ArrowDropDownIcon>
        </Button>
          <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
           <Link to="/myProfile"><MenuItem onClick={()=>getProfile()}  >Visualizza profilo</MenuItem></Link> 
            <Link to="/signup"> <MenuItem onClick={handleClose}>Passa a profilo premium</MenuItem></Link>
            <MenuItem onClick={()=>logout()} >Logout</MenuItem>
            
          </Menu>
        </ul>
    </div>
    
    <Box height="5%" width="10%" mb="0%" m="2rem" ml="35rem" bgcolor="text.primary" color="background.paper">
     <font size="5" face='Georgia' color="white"> My Profile</font>
    </Box>
   <div className="mprofile">
     <Container >
       <Row>
         <Col sm={1}>
         <Box  m="4rem" ml="3rem" mt="100px" >
<Avatar  alt="Remy Sharp" src={avatar} className={classe.avatar}/>
</Box>
         </Col>
         <Col sm={7}>
         <TextField name='email'
 label={ciao.email}
 disabled
 style={{  margin: 1, width: 300, left:80}}
 fullWidth
 margin="normal"/>
  <TextField name='role'
 label={ciao.role}
 disabled
 style={{  margin: 1, width: 300, left:80 }}
 fullWidth
 margin="normal"/> 
 <TextField name='name'
 label={ciao.name}
 disabled
 style={{ margin: 1, width: 300, left:80 }}
 fullWidth
 margin="normal"/> 
<TextField name='surname'
 label={ciao.surname}
 disabled
 style={{  margin: 1, width: 300, left:80 }}
 fullWidth
 margin="normal"/> 
         </Col>
         <Col sm={3}><font face='Georgia' color="white">
   <br/><br/><br/><br/> &nbsp;&nbsp;<button onClick={()=>deleteProfile()}  className="buttonp buttonpp" >Elimina Profilo</button></font>
    <font  face='Georgia' color="white">
    <br/><br/> &nbsp;&nbsp; <button type="submit" className="buttonp buttonpp"  >Aggiorna Profilo</button></font>
         </Col>
 </Row>
<Row>
  <Col>
  <PersonOutlineSharpIcon fontSize="large" />&nbsp;
 <TextField name='sex'
 label={ciao.sex}
 disabled
 style={{ margin: -5, width: 70, left:-2, bottom:6 }}
 fullWidth
 margin="dense"/> &nbsp;&nbsp;
 &nbsp;<CakeOutlinedIcon fontSize="large"/>&nbsp;
 <TextField name='birthDate'
 label={ciao.birthDate}
 disabled
 style={{ margin: -10, width: 130, left:7, bottom:6 }}
 fullWidth
 margin="normal"/>&nbsp;&nbsp;
 &nbsp; &nbsp;&nbsp;<PlaceOutlinedIcon fontSize="large"/>&nbsp;
 <TextField name='city'
 label={ciao.city}
 disabled
 style={{ margin: -10, width: 110, left:7, bottom:6 }}
 fullWidth
 margin="normal"/>
  </Col>
  <Row>
<Col>
<br/><AssignmentOutlinedIcon fontSize="large"/>&nbsp;
 <TextField name='description'
 label={ciao.description}
 style={{ margin: -10, width: 100, left:7, bottom:6}}
 fullWidth
 margin="normal"/>&nbsp;&nbsp;
&nbsp;&nbsp;<CallOutlinedIcon fontSize="large"/>&nbsp;
 <TextField name='phoneNumber'
 label={ciao.phoneNumber}
 disabled
 style={{ margin: -10, width: 150, left:7, bottom:6 }}
 fullWidth
 margin="normal"/> &nbsp;&nbsp;&nbsp;&nbsp;
 &nbsp;&nbsp;<PlaceOutlinedIcon fontSize="large"/>
 <TextField  name='district'
 label={ciao.district}
 disabled
 style={{ margin: -10, width: 150, left:7, bottom:6}}
 fullWidth
 margin="normal"/> 

</Col>
</Row>

</Row>
     </Container>
     
   </div>
    </div>
  );
}

export default Profilo;

