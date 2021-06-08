import React from  'react';
import '..//App.css';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AccountCircle from '@material-ui/icons/AccountCircle'
import logomodi from '..//logomodi.png';
import axios from 'axios';
import util from '..//util/util'
import { Col, Row } from 'react-bootstrap';
import { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Snackbar } from '@material-ui/core';
import Box from '@material-ui/core/Box';
// import img from '..//img.png';


class VisualizzaCandidature extends Component {
  constructor(props){
    super(props);
    this.state = {
      announcements: [],
      user_id: '',
      anchorEl:'',
      title:'',
      typeAnnouncement: '',
      typeWork:'',
      startDate:'',
      annCity:'',
      annDistrict:'',
      regular:'',
      occasional:'',
      diurnal:'',
      nocturnal:'',
      allDay:'',
      atHour:'',
      open: false,
      message:'',
      me:''
    }
  }
  async componentDidMount(){
    if(!util.getCookie('user_jwt')) {
      setTimeout(()=> {
        window.location.assign('/notAuthenticated');
           }, 0);
    }
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.getCookie('user_jwt');
    axios.get('/api/v1/users/myProfile').then(profile => {
      if (profile.data.data.role === 'admin' || profile.data.data.role === 'famiglia') setTimeout(()=> {
        window.location.assign('/unauthorized');
           }, 0);
      else if (profile.data.data.can === false) setTimeout(()=> {
            window.location.assign('/unauthorized');
               }, 0);
      this.setState({me: profile.data.data.role});
    })
    .catch(error=>{
      this.setState({open:true, message:error.response.data.message});
      setTimeout(()=> {
        this.setState({open:false})
           }, 2000);
        console.log(error);
      })
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.getCookie('user_jwt');
    const url='/api/v1/applications';
    axios.get(url).then(response=>{
      
    this.setState({announcements: response.data.data});
    })
    .catch(error=>{
      this.setState({open:true, message:error.response.data.message});
      setTimeout(()=> {
        this.setState({open:false})
           }, 2000);
        console.log(error);
      })
  }


  setData(date) {
    date=new Date(date).toLocaleDateString();
    if(date==='Invalid Date')
    return '';  
    return date;
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
      <Link to="/"><img src={logomodi} className="navbarLogo" alt="logo"/></Link>
         <ul className="linksNav">
         <Link to="/aboutUs">
                  <li><font face='Georgia' color='black' >LA NOSTRA STORIA</font></li>
                </Link>
                <Link to="/payments">
                  <li><font face='Georgia' color='black'>ABBONAMENTI</font></li>
                </Link>
                
                <Link to="/blog">
                  <li><font face='Georgia' color='black'>BLOG</font></li>
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
      <Link to="/announcement"><MenuItem  onClick={this.handleClose}>Cerca</MenuItem></Link> 
      <Link to="/myProfile"><MenuItem  onClick={this.handleClose}>Visualizza Profilo</MenuItem></Link> 
      <Link to="/">  <MenuItem onClick={this.logout}>Logout</MenuItem></Link>
             </Menu>
              
           </ul><br/><br/><br/>
           <Box height="5%" width="40%" mb="4%" m="7%" ml="70%"  bgcolor="text.primary" >
     <font size="5" face='Georgia' color="white"> Le mie candidature</font>
    </Box>
           <div className="card_container_ann" style={{marginTop:50}}> 
      {this.state.announcements.map(announcements=>(     
         <div className="card_ann">
            <div className="card_body_ann">
               <div className="card_title_ann">
               <Row>
                <Col sm={8}>
                  {'Titolo: ' + announcements.announcement_id.title} <br/> {'Tipologia: ' + announcements.announcement_id.typeAnnouncement} <br/> 
                  {'Città: ' + announcements.announcement_id.annCity} <br/> 
                  {'Distretto: ' + announcements.announcement_id.annDistrict} <br/> 

                 
                </Col>
                <Col>
                <br/>
                <br/>
                <br/>
              
               <Link to={"/announcements/" + announcements.announcement_id._id + "/application"} > <button class="button1 button2" style={{marginLeft:20}} >Visualizza Annuncio</button></Link>
               </Col>
               </Row>
               </div> 
            </div>
          </div>
      ))} 
            

      </div>
      
      

</div>
</div>



  );
}
}

export default VisualizzaCandidature;