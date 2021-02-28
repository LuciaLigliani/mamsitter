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
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Container } from 'react-bootstrap';
import CakeOutlinedIcon from '@material-ui/icons/CakeOutlined';
import PlaceOutlinedIcon from '@material-ui/icons/PlaceOutlined';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import CallOutlinedIcon from '@material-ui/icons/CallOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import avatar from '..//avatar.png';
import axios from 'axios';

const Profilo = (props) => {

  const [ciao] = React.useState({
    email:'',
    role:'',
    name:'',
    surname:''
  })


  const getProfile = () => {
    const url = 'http://localhost:3000/api/v1/users/myProfile';
    axios.get(url)
    .then((profile)=>{
      console.log(profile)
      ciao(profile.profile);
    })
    .catch((err)=> console.log(err));


  }

  const useStyles = makeStyles((theme) => ({
    avatar: {
      bottom:40,
      margin: -50,
      top:-15, 
      width:200,
      height:200
    },
    icon: {

      width:20,
      height:20
    },
    large: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    }

  }));
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();
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
           <Link to="/myProfile"><MenuItem  onClick={handleClose}>Visualizza profilo</MenuItem></Link> 
            <Link to="/signup"> <MenuItem onClick={handleClose}>Passa a profilo premium</MenuItem></Link>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
            
          </Menu>
        </ul>
    </div>
    
    <Box height="5%" width="10%" mb="0%" m="2rem" ml="35rem" bgcolor="text.primary" color="background.paper">
     <font size="5" face='Georgia' color="white"> My Profile</font>
    </Box>
   <div className="mprofile">
     <Container>
       <Row>
         <Col sm={1}>
         <Box  m="4rem" ml="3rem" mt="100px" >
<Avatar  alt="Remy Sharp" src={avatar}
className={classes.large} className={classes.avatar}/>
</Box>
         </Col>
         <Col sm={7}>
         <TextField id="standard-full-width"
 label="Email"
 style={{  margin: 1, width: 300, left:80}}
 fullWidth
 margin="normal"/>
  <TextField id="standard-full-width"
 label="Ruolo"
 style={{  margin: 1, width: 300, left:80 }}
 fullWidth
 margin="normal"/> 
 <TextField id="standard-full-width"
 label="Nome"
 style={{ margin: 1, width: 300, left:80 }}
 fullWidth
 margin="normal"/> 
<TextField id="standard-full-width"
 label="Cognome"
 style={{  margin: 1, width: 300, left:80 }}
 fullWidth
 margin="normal"/> 
         </Col>
         <Col sm={3}><font face='Georgia' color="white">
   <br/><br/><br/><br/> &nbsp;&nbsp;<button onClick={()=>getProfile()} type="submit" class="buttonp buttonpp" >Elimina Profilo</button></font>
    <font  face='Georgia' color="white">
    <br/><br/> &nbsp;&nbsp; <button type="submit" class="buttonp buttonpp"  >Aggiorna Profilo</button></font>
         </Col>
 </Row>
<Row>
  <Col>
  <PersonOutlineSharpIcon fontSize="large" />&nbsp;
 <TextField id="standard-full-width"
 label="Sesso"
 style={{ margin: -5, width: 70, left:-2, bottom:6 }}
 fullWidth
 margin="dense"/> &nbsp;&nbsp;
 &nbsp;<CakeOutlinedIcon fontSize="large"/>&nbsp;
 <TextField id="standard-full-width"
 label="Data di Nascita"
 style={{ margin: -10, width: 130, left:7, bottom:6 }}
 fullWidth
 margin="normal"/>&nbsp;&nbsp;
 &nbsp; &nbsp;&nbsp;<PlaceOutlinedIcon fontSize="large"/>&nbsp;
 <TextField id="standard-full-width"
 label="Città"
 style={{ margin: -10, width: 110, left:7, bottom:6 }}
 fullWidth
 margin="normal"/>
  </Col>
  <Row>
<Col>
<br/><AssignmentOutlinedIcon fontSize="large"/>&nbsp;
 <TextField id="standard-full-width"
 label="Descrizione"
 style={{ margin: -10, width: 100, left:7, bottom:6}}
 fullWidth
 margin="normal"/>&nbsp;&nbsp;
&nbsp;&nbsp;<CallOutlinedIcon fontSize="large"/>&nbsp;
 <TextField id="standard-full-width"
 label="Numero di Telefono"
 style={{ margin: -10, width: 150, left:7, bottom:6 }}
 fullWidth
 margin="normal"/> &nbsp;&nbsp;&nbsp;&nbsp;
 &nbsp;&nbsp;<PlaceOutlinedIcon fontSize="large"/>
 <TextField id="standard-full-width"
 label="Distretto"
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

