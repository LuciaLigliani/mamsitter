import React from  'react';
import '..//App.css';

import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AccountCircle from '@material-ui/icons/AccountCircle'
import logomodi from '..//logomodi.png';
import { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Snackbar } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import util from '..//util/util'
class Candidature extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: [],
      anchorEl:'',
      city:'',
      district: '',
      ageMax:'',
      ageMin:'',
      sex:'',
      open: false,
      message:''
    }
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

  calculateAge(birthday) { 
    const todayYear = new Date().getFullYear();
    const dob = new Date(birthday).getFullYear();
    return todayYear - dob;

  }
  async componentDidMount(){
    const id= this.props.location.pathname.split('/application/')[1];
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.getCookie('user_jwt');
    const url='http://localhost:3000/api/v1/announcements/' +id+ '/applications';
    axios.get(url).then(response=>{
      console.log(response.data.data)
    this.setState({users: response.data.data});
  })
  .catch(error=>{
    this.setState({open:true, message:error.response.data.message});
      console.log(error);
    })
  }

  // submitHandler = (e) => {
  //   e.preventDefault()
  //   const url = 'http://localhost:3000/api/v1/users';
  //   axios.get(url).then(response=>{
  //     console.log(url);
  //     this.setState({users: response.data.data});
      
  //   })
  //   .catch(error=>{
  //     console.log(error);
  //   })
  // }

  logout = () => {
    setTimeout(()=> {
      window.location.assign('/');
       }, 10); 
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.eraseCookie('user_jwt');
  }

  /*info = (user) => {
    let specificUser = '';
    if(user.user_id.role === 'famiglia') specificUser = user.user_id.famiglia_id;
    else if(user.user_id.role === 'babysitter') specificUser = user.user_id.babysitter_id;
    else if(user.user_id.role === 'colf') specificUser = user.user_id.colf_id;
    else if(user.user_id.role === 'badante') specificUser = user.user_id.badante_id;
    return(
      <div>
    <div className="card_title">
              {specificUser.name} {specificUser.surname} 
              </div> 
              {this.calculateAge(specificUser.birthDate)} <br/>
              {specificUser.city} <br/>
          </div>
    )
  }*/

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
      <div className="cerca">
        
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
              <Button className="buttonNav" aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}  > <AccountCircle fontSize='large'/>
                  <ArrowDropDownIcon></ArrowDropDownIcon>
              </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                  >
                  <Link to="/myProfile"><MenuItem  onClick={this.handleClose}>Visualizza Profilo</MenuItem></Link> 
                  <Link to="/createann"><MenuItem  onClick={this.handleClose}>Crea annuncio</MenuItem></Link> 
                  <Link to="/viewallann"><MenuItem  onClick={this.handleClose}>I miei annunci</MenuItem></Link> 
                  <Link to="/search"> <MenuItem onClick={this.handleClose}>Cerca</MenuItem></Link>
                  <Link to="/">  <MenuItem onClick={this.logout}>Logout</MenuItem></Link> 
                </Menu>
                 
              </ul>
<br/><br/><br/>
<Box height="5%" width="40%" mb="4%" m="7%" ml="70%"  bgcolor="text.primary" >
     <font size="5" face='Georgia' color="white"> Candidati</font>
    </Box>
              <div className="card_container">
           
           {this.state.users.map(users=>(
             <div key={users.user_id._id}>
            <div className="card">
               <div className="card_body">

              <img src={`http://localhost:3000/api/v1/users/${users.user_id._id}/file/${users.user_id.photo}`} style={{marginLeft:2, width:100, height:100}} alt=''></img><br/><br/>
             { /*{this.info(users)}*/}
              <Link to={"/users/" + users.user_id._id} > <button class="button1 button2" >Visualizza Profilo</button></Link>
              </div> 
             </div>
             </div>
           ))}
           </div>

           </div>
           </div>
    )
  }
}

export default Candidature