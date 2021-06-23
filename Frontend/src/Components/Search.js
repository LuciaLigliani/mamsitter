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
import Form from 'react-bootstrap/Form'
import { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Snackbar } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import mamsitter from '..//hands1.png';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
// import img from '..//img.png';


class Search extends Component {
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
      role:'',
      regular:'',
      occasional:'',
      diurnal:'',
      nocturnal:'',
      allDay:'',
      atHour:'',
      open: false,
      message:'',
      me:'',
      can:'',
      profile:''
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

  changeHandler = (e) => {
  if(['regular', 'occasional', 'diurnal', 'nocturnal', 'atHour', 'allDay'].includes(e.target.name))
  this.setState({[e.target.name]:e.target.checked});
  else this.setState({[e.target.name]:e.target.value})
  }

  createQuery () {
    let filter = '';
    const todayYear = new Date().getFullYear();
      if(this.state.city) filter = (filter || '?') + 'city='+this.state.city+'&';
      if(this.state.ageMax) {
        const year = todayYear-this.state.ageMax;
        const maxDate= year + '-01-01';
        filter = (filter || '?') + 'birthDate[gte]='+maxDate+'&';
      }
      if(this.state.ageMin) {
        const year = todayYear-this.state.ageMin;
        const minDate= year + '-01-01';
        filter = (filter || '?') + 'birthDate[lte]='+minDate+'&';
      }
      if(this.state.sex) filter = (filter || '?') + 'sex='+this.state.sex+'&';
      if(this.state.role) filter = (filter || '?') + 'role='+this.state.role+'&';
      if(this.state.regular) filter = (filter || '?') + 'regular='+this.state.regular+'&';
      if(this.state.occasional) filter = (filter || '?') + 'occasional='+this.state.occasional+'&';
      if(this.state.district) filter = (filter || '?') + 'district='+this.state.district+'&';
      if(this.state.diurnal) filter = (filter || '?') + 'diurnal='+this.state.diurnal+'&';
      if(this.state.nocturnal) filter = (filter || '?') + 'nocturnal='+this.state.nocturnal+'&';
      if(this.state.allDay) filter = (filter || '?') + 'allDay='+this.state.allDay+'&';
      if(this.state.atHour) filter = (filter || '?') + 'atHour='+this.state.atHour+'&';

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
      this.setState({me: profile.data.data.role});
      this.setState({can: profile.data.data.can});
      this.setState({profile: profile.data.data.profile});
    })
    .catch(error=>{
      this.setState({open:true, message:error.response.data.message});
      setTimeout(()=> {
        this.setState({open:false})
           }, 2000);
        console.log(error);
      })
    let vetrina =[];
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.getCookie('user_jwt');
    const url='http://localhost:3000/api/v1/users';
    axios.get(url).then(response=>{
    this.setState({users: response.data.data});
    response.data.data.map((user) => {
      if(user.generalUser.highlighted === true) vetrina.push(user);
    
      return vetrina

    });
    this.setState({highlighted: this.grid(vetrina)});
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
    e.preventDefault()
    const query = this.createQuery();
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.getCookie('user_jwt');
    const url = 'http://localhost:3000/api/v1/users' + query;
    axios.get(url).then(response=>{
      this.setState({users: response.data.data});
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

 grid (vetrina) {
  return(
    <div>
        <Box height="5%" width="20%" mb="0%" m="2%" ml="87%"  bgcolor="text.primary" >
     <font size="3" face='Georgia' color="white"> Vetrina</font>
    </Box>
      
      <div className="vetrina">
      {vetrina.map(user=>(
        
        <div key={user.generalUser.photo}>
       <div className="cardv" > 
       <div className="card_bodyv" >
       {this.state.profile === 'semplice' ? ( <img src={`http://localhost:3000/api/v1/users/${user.generalUser._id}/file/${user.generalUser.photo}`} style={{ paddingBottom:0, height:100, width:100}} alt=''/> ) : (<Link to={"/users/" + user.generalUser._id} >  
        <img src={`http://localhost:3000/api/v1/users/${user.generalUser._id}/file/${user.generalUser.photo}`} style={{ paddingBottom:0, height:100, width:100}} alt='' class="imageProva" /> 
        </Link>)
        
       }
       
         {user.specificUser.name} {user.specificUser.surname} 
         </div>
         </div> 
        </div>
      
      ))}
      
     </div> 
     </div>
  );
}

menu = () => {
  if(this.state.me === 'famiglia' && this.state.can === true)
  return (<div>
      <Link to="/myProfile"><MenuItem  onClick={this.handleClose}>Visualizza Profilo</MenuItem></Link> 
      <Link to="/createann"><MenuItem  onClick={this.handleClose}>Crea annuncio</MenuItem></Link> 
      <Link to="/viewallann"><MenuItem  onClick={this.handleClose}>I miei annunci</MenuItem></Link> 
      <Link to="/payments"><MenuItem  onClick={this.handleClose}>Cambia tipo di profilo</MenuItem></Link> 
      <Link to="/">  <MenuItem onClick={this.logout}>Logout</MenuItem></Link>
    </div>)
  else if(this.state.me === 'famiglia' && this.state.can === false)
  return (<div>
      <Link to="/myProfile"><MenuItem  onClick={this.handleClose}>Visualizza Profilo</MenuItem></Link> 
      <Link to="/payments"><MenuItem  onClick={this.handleClose}>Crea annuncio</MenuItem></Link>
      <Link to="/payments"><MenuItem  onClick={this.handleClose}>Cambia tipo di profilo</MenuItem></Link> 
      <Link to="/">  <MenuItem onClick={this.logout}>Logout</MenuItem></Link>
    </div>)
  else if (this.state.me === 'admin') 
  return(<div>
    <Link to="/announcement"><MenuItem  onClick={this.handleClose}>Cerca Annunci</MenuItem></Link>
      <MenuItem onClick={this.logout}>Logout</MenuItem>
  </div>)
}
 
  render() {
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
                    {this.menu()}
                   
                </Menu>
                 
              </ul>
      
      <Col>
        <Form onSubmit={this.submitHandler}  className="formm"> 
        <br/>
        <h3><font face='Georgia' color='black'>Cerca assistente familiare più adatto alle tue esigenze!</font> </h3>
          <Row>
            <Col sm={5}> 
            <br/><Form.Control style={{marginLeft:100}} name='city' as="select" defaultValue="Città" onChange={this.changeHandler} > 
               <option value='' >Città</option>
               <option>Milano</option> 
            </Form.Control><br/>
            <Form.Control style={{marginLeft:100}} name='district' as="select" defaultValue="Zona" onChange={this.changeHandler} > 
               <option value =''>Zona</option>
               <option value='district1'>district1</option> 
               <option value='district2'>district2</option> 
               <option value='district3'>district3</option> 
            </Form.Control><br/>
              <Form.Control style={{marginLeft:100}} name='ageMin' placeHolder="Inserisci età minima" onChange={this.changeHandler} /> <br/>
              <Form.Control style={{marginLeft:100}} name='ageMax' placeHolder="Inserisci età massima" onChange={this.changeHandler} /> <br/>
              <Form.Control style={{marginLeft:100}} name='sex' as="select" defaultValue="Sesso" onChange={this.changeHandler} > <br/>
               <option value='' >Sesso</option>
               <option value='M'>Maschio</option> 
               <option value='F'>Femmina</option> 
            </Form.Control><br/>
            <Form.Control style={{marginLeft:100}} name='role' as="select" defaultValue="Ruolo" onChange={this.changeHandler} > 
               <option value='' >Ruolo</option>
               {this.state.me === 'admin' ? (<option value='famiglia'>Famiglia</option>) : (<div/>)}
               <option value='babysitter'>Babysitter</option> 
               <option value='colf'>Colf</option> 
               <option value='badante'>Badante</option> 
            </Form.Control><br/>
            </Col>
            <Col>
            <Form.Group>
              <Form.Label style={{marginLeft:90}} as="legend" column sm={9}>
             <br/> <font face='Georgia' color="black"><h5>  Orario richiesto</h5></font>  
              </Form.Label>
             <Col sm={9}>
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:160}}
              label="Occasionale"
              name='occasional'
              id="formHorizontalRadios1"
            />
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:160}}
              label="Regolare"
              name='regular'
              id="formHorizontalRadios2"
            />
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:160}}
              label="Giornaliero"
              name='diurnal'
              id="formHorizontalRadios3"
            />
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:160}}
              label="A ora"
              name='atHour'
              id="formHorizontalRadios3"
            />
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:160}}
              label="Al giorno"
              name='allDay'
              id="formHorizontalRadios3"
            />
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:160}}
              label="Notturno"
              name='nocturnal'
              id="formHorizontalRadios3"
            />
          </Col>
          </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
          <button type="submit" class="button1 button2" style={{marginLeft:80}} >Cerca</button>
          </Col>
          </Row>
        </Form>
    </Col>
    <Col>
    <img src={mamsitter} className="im" alt="mamsitter" style={{marginLeft:500,  width:900, marginTop:-450, marginBottom:40}}/>
    {/* <iframe title="mamsitter" src="https://www.google.com/maps/d/u/0/embed?mid=1ETRb4lxy5gvfF2m--GB1cOAJNCdmSRfs"  style={{marginLeft:650,  width:450, height:380, marginTop:-1000, marginBottom:40}} loading="lazy" ></iframe> */}
     </Col>
              
              
     {this.state.highlighted}
     
          <div className="card_container">
           
            {this.state.users.length === 0 ? (<h5>Non ci sono utenti</h5>) : this.state.users.map(users=>(
            <div class="containerProva">
              <div key={users.generalUser.id}>
             <div className="card">
                <div className="card_body">


               <img src={`http://localhost:3000/api/v1/users/${users.generalUser._id}/file/${users.generalUser.photo}`} style={{marginLeft:2, width:100, height:100}} alt='' class="imageProva"></img>
               
  
  
               <div className="card_title">
               {users.specificUser.name} {users.specificUser.surname} 
               {users.generalUser.role !== 'famiglia' && users.generalUser.profile === 'premium' ? (<VerifiedUserIcon style={{color:'green', fontSize:30}}/>) : (<div/>)}
               </div> 
              
              
               {this.calculateAge(users.specificUser.birthDate)} <br/>
               {users.specificUser.city} <br/>
               {users.specificUser.role}<br/>
              {this.state.profile === 'semplice' ? ( <div class="overlayProva"><div class="textProva"><p>Passa al <b>profilo base</b><br/> per poter vedere le informazioni complete di questo utente!</p><Link to='/payments'><button class="button1 button2" > Profilo Base</button></Link></div>
  </div>) :
                (<Link to={"/users/" + users.generalUser._id} > <button class="button1 button2" >Visualizza Profilo</button></Link>)
              }
              </div>
              </div></div></div>
            ))}
</div>

            
      
      
            </div>
      
     
      
      </div>
      );
  }


}
 export default Search;

 