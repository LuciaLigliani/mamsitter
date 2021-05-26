import React from  'react';
import { Component } from 'react';
import '..//App.css';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AccountCircle from '@material-ui/icons/AccountCircle'
import logomodi from '..//logomodi.png';
import { Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import axios from 'axios';
import util from '..//util/util';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Snackbar } from '@material-ui/core';
import mamsitter from '..//hands1.png';

class Announcements extends Component {
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
  handleClick = (event) => {
    this.setState({anchorEl:event.currentTarget});
  }
  handleClose = () => {
    this.setState({anchorEl:null});
  };

  handleClos= (e) => {
    this.setState({open:false})
   }

  setData(date) {
    date=new Date(date).toLocaleDateString();
    if(date==='Invalid Date')
    return '';  
    return date;
  }

  changeHandler = (e) => {
    // if(['regular', 'occasional', 'diurnal', 'nocturnal', 'atHour', 'allDay'].includes(e.target.name))
    if(e.target.name === 'typeWork' && e.target.value === 'on') 
    this.setState({[e.target.name]:e.target.id});
    else this.setState({[e.target.name]:e.target.value})
  }

    createQuery () {
      let filter = '';
        if(this.state.startDate) 
        filter = (filter || '?') + 'startDate[gte]='+this.state.startDate+'&';
        if(this.state.annCity) filter = (filter || '?') + 'annCity='+this.state.annCity+'&';
        if(this.state.annDistrict) filter = (filter || '?') + 'annDistrict='+this.state.annDistrict+'&';
        if(this.state.typeAnnouncement) filter = (filter || '?') + 'typeAnnouncement='+this.state.typeAnnouncement+'&';
        if(this.state.typeWork) filter = (filter || '?') + 'typeWork='+this.state.typeWork+'&';
      return filter;
    }
  async componentDidMount(){
    if(!util.getCookie('user_jwt')) {
      setTimeout(()=> {
        window.location.assign('/notAuthenticated');
           }, 0);
    }
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.getCookie('user_jwt');
    axios.get('http://localhost:3000/api/v1/users/myProfile').then(profile => {
      if (profile.data.data.role === 'famiglia') setTimeout(()=> {
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
    const url='http://localhost:3000/api/v1/announcements';
    axios.get(url).then(response=>{
    this.setState({announcements: response.data.data});
    })
    .catch(error=>{
      if(error.response && error.response.data.message === 'You do not have permission to perform this action') {
        setTimeout(()=> {
          window.location.assign('/unauthorized');
             }, 0);
      }
    this.setState({open:true, message:error.response.data.message});
    setTimeout(()=> {
      this.setState({open:false})
         }, 2000);
     console.log(error);
    })
  }

  submitHandler = (e) => {
    e.preventDefault();
    const query = this.createQuery();
    const url = 'http://localhost:3000/api/v1/announcements' + query;
    axios.get(url).then(response=>{
      this.setState({announcements: response.data.data});
      this.setState({open:true, message:'Ricerca effettuata correttamente'})
      setTimeout(()=> {
      this.setState({open:false})
         }, 2000);
    })
    .catch(error=>{
    this.setState({open:true, message:error.response.data.message});
    setTimeout(()=> {
      this.setState({open:false})
         }, 2000);
      console.log(error);
    })
  }

  menu = () => {
    if (this.state.me === 'admin') return(<div>
      <Link to="/search"><MenuItem  onClick={this.handleClose}>Cerca utenti</MenuItem></Link>
      <Link to="/">  <MenuItem onClick={this.logout}>Logout</MenuItem></Link>
    </div>)
    else if(this.state.me === 'babysitter' || this.state.me === 'badante' || this.state.me === 'colf') return (<div>
        <Link to="/myProfile"><MenuItem  onClick={this.handleClose}>Visualizza Profilo</MenuItem></Link> 
                  <Link to="/viewallapplication"><MenuItem  onClick={this.handleClose}>Le mie candidature</MenuItem></Link>
                  <Link to="/">  <MenuItem onClick={this.logout}>Logout</MenuItem></Link> 
      </div>)
  }


  render(){
    return (
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
    <IconButton onClick={this.handleClos}>
      <CloseIcon/>
    </IconButton>
  }
  />
      <div className="cerca">
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
                    {this.menu()}
                </Menu>
                 
              </ul>
    
              <Col>
        <Form onSubmit={this.submitHandler}  className="formm"> 
        <br/>
        <h3><font face='Georgia' color='black' >Cerca un annuncio</font> </h3>
          <Row>
            <Col sm={5}> 
            <br/><Form.Control style={{marginLeft:100}} name='annCity' as="select" defaultValue="Città" onChange={this.changeHandler} > 
               <option value='' >Città</option>
               <option>Milano</option> 
            </Form.Control><br/>
            <Form.Control style={{marginLeft:100}} name='annDistrict' as="select" defaultValue="Distretto" onChange={this.changeHandler} > 
               <option value =''>Distretto</option>
               <option value='district1'>district1</option> 
               <option value='district2'>district2</option> 
               <option value='district3'>district3</option> 
            </Form.Control><br/>
              <Form.Control style={{marginLeft:100}} name='startDate' type="date" placeHolder="Inserisci data inizio" onChange={this.changeHandler} /> <br/>
            
            </Col>
            <Col>
            <Form.Group>
              <Form.Label style={{marginLeft:90}} as="legend" column sm={9}>
             <font face='Georgia' color="black"><h5>  Tipologia di lavoro</h5></font>  
              </Form.Label>
             <Col sm={9}>
            <input type='radio'
            onChange={this.changeHandler}
            style={{marginLeft:110, width: 30}}
              name='typeWork'
              id="occasionale"
            /><label for="occasionale">Occasionale</label><br/>
            <input type='radio'
            onChange={this.changeHandler}
            style={{marginLeft:85, width: 30}}
              name='typeWork'
              id="regolare"
            /><label for="regolare">Regolare</label><br/>
            <input type='radio'
            onChange={this.changeHandler}
            style={{marginLeft:70, width: 30}}
              name='typeWork'
              id="diurno"
            /><label for="diurno">Diurno</label><br/>
            <input type='radio'
            onChange={this.changeHandler}
            style={{marginLeft:69, width: 30}}
              name='typeWork'
              id="aOre"
            /><label for="aOre">Ad ora</label><br/>
            <input type='radio'
            onChange={this.changeHandler}
            style={{marginLeft:121, width: 30}}
              name='typeWork'
              id="24h"
            /><label for="24h">Tutto il giorno</label><br/>
            <input type='radio'
            onChange={this.changeHandler}
            style={{marginLeft:87, width: 30}}
              name='typeWork'
              id="notturno"
            /><label for="notturno">Notturno</label><br/>
          </Col>
          </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
          <button type="submit" class="button1 button2" style={{marginLeft:80, marginTop:30}} >Cerca</button>
          </Col>
          </Row>
        </Form>
    </Col>

    <Col>
    <img src={mamsitter} className="im" alt="mamsitter" style={{marginLeft:500,  width:900, marginTop:-320}}/>
    {/* <iframe title="mamsitter" src="https://www.google.com/maps/d/u/0/embed?mid=1ETRb4lxy5gvfF2m--GB1cOAJNCdmSRfs"  style={{marginLeft:650,  width:450, height:380, marginTop:-300, marginBottom:40}} loading="lazy" ></iframe> */}
     </Col>




    <div className="card_container_ann"> 
      {this.state.announcements.map(announcements=>(     
         <div className="card_ann">
            <div className="card_body_ann">
               <div className="card_title_ann">
               <Row>
                <Col sm={8}>
                  {'TITOLO: ' + announcements.generalAnnouncement.title} <br/> {'TIPOLOGIA: ' + announcements.generalAnnouncement.typeAnnouncement} <br/> 
                  {'DA: ' + this.setData(announcements.specificAnnouncement.startDate)} <br/>
                  {'A: ' + this.setData(announcements.specificAnnouncement.endDate)}<br/>
                </Col>
                <Col>
                <br/>
                <br/>
                <br/>
               <Link to={"/announcements/" + announcements.generalAnnouncement._id} > <button class="button1 button2" style={{marginLeft:20}} >Visualizza Annuncio</button></Link>
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

export default Announcements;