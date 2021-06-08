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
import { Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import { Component } from 'react';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {Snackbar } from '@material-ui/core';
import mamsitter from '..//hands1.png';
//import { makeStyles } from '@material-ui/core/styles';
// import img from '..//img.png';



class Cerca extends Component {
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
      highlighted: '',
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
    let vetrina = [];
    const url='/api/v1/users/search';
    axios.get(url).then(response=>{
    this.setState({users: response.data.data});
    response.data.data.map((user) => {
      if(user.generalUser.highlighted === true) vetrina.push(user);
      return vetrina

    });
    this.setState({highlighted: this.grid(vetrina)});
  }).catch(error=>{
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
    const url = '/api/v1/users/search' + query;
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
       <img src={`/api/v1/users/${user.generalUser._id}/file/${user.generalUser.photo}`} style={{ paddingBottom:0, height:100, width:100}} alt=''  /> 

        

        
         {user.specificUser.name} {user.specificUser.surname} 
         </div>
         </div> 
        </div>
      
      ))}
      
     </div> 
     </div>
    );
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
                  <Link to="/login"><MenuItem  onClick={this.handleClose}>Accedi</MenuItem></Link> 
                  <Link to="/signup"> <MenuItem onClick={this.handleClose}>Registrati</MenuItem></Link>
                </Menu>
                 
              </ul>
      
      <Col>
        <Form   className="formm"> 
        <br/>
        <h3><font face='Georgia' color='black'>Cerca il lavoratore più adatto alle tue esigenze!</font> </h3>
          <Row>
            <Col sm={5}> 
            <br/><Form.Control style={{marginLeft:100}} name='city' as="select" defaultValue="Città" onChange={this.changeHandler} > 
               <option value='' >Città</option>
               <option>Milano</option> 
            </Form.Control><br/>
            <Form.Control style={{marginLeft:100}} name='district' as="select" defaultValue="Distretto" onChange={this.changeHandler} > 
            <option value='' >Distretto</option>
               <option value='district1'>district1</option> 
               <option value='district2'>district2</option> 
               <option value='district3'>district3</option>  
            </Form.Control><br/>
              <Form.Control style={{marginLeft:100}} name='ageMin' placeHolder="Inserisci età minima" onChange={this.changeHandler} /> <br/>
              <Form.Control style={{marginLeft:100}} name='ageMax' placeHolder="Inserisci età massima" onChange={this.changeHandler} /> <br/>
              <Form.Control style={{marginLeft:100}} name='sex' as="select" defaultValue="Sesso" onChange={this.changeHandler} > <br/>
              <option value=''>Sesso</option>
               <option value='M'>Maschio</option> 
               <option value='F'>Femmina</option> 
            </Form.Control><br/>
            <Form.Control style={{marginLeft:100}} name='role' as="select" defaultValue="Ruolo" onChange={this.changeHandler} > 
            <option value='' >Ruolo</option>
              <option value='famiglia'>Famiglia</option> 
               <option value='babysitter'>Babysitter</option> 
               <option value='colf'>Colf</option> 
               <option value='badante'>Badante</option> 
            </Form.Control><br/>
            </Col>
            <Col>
            <Form.Group>
              <Form.Label style={{marginLeft:90}} as="legend" column sm={9}>
             <br/> <font face='Georgia' color="black"><h5>  Tipologia di lavoro</h5></font>  
              </Form.Label>
             <Col sm={11}>
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
              label="Ad orario"
              name='atHour'
              id="formHorizontalRadios3"
            />
            <Form.Check
            onChange={this.changeHandler}
            style={{marginLeft:160}}
              label="Tutto il giorno"
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
          <button type="submit" class="button1 button2" style={{marginLeft:80}} onClick={this.submitHandler}>Cerca</button>
          </Col>
          </Row>
        </Form>
    </Col>

    <Col>
    <img src={mamsitter} className="im" alt="mamsitter" style={{marginLeft:500,  width:900, marginTop:-450, marginBottom:40}}/>
    {/* <iframe title="mamsitter" src="https://www.google.com/maps/d/u/0/embed?mid=1ETRb4lxy5gvfF2m--GB1cOAJNCdmSRfs"  style={{marginLeft:700,  width:450, height:380, marginTop:-1000, marginBottom:40}} loading="lazy" ></iframe> */}
     </Col>
              
              {this.state.highlighted}


              <div className="card_container">
           
           {this.state.users.length === 0 ? (<h5>Non ci sono utenti</h5>) : this.state.users.map(users=>(
             <div class="containerProva">
             <div key={users.generalUser.id}>
            <div className="card"> 
            <div className="card_body">
             <img src={`/api/v1/users/${users.generalUser._id}/file/${users.generalUser.photo}`} style={{marginLeft:2, width:100, height:100}} alt=''class="imageProva"></img>
             
             <div class="overlayProva">
    <div class="textProva"><p><b>Effettua l'accesso</b><br/> per poter vedere le informazioni complete di questo utente!</p><Link to='/login'><button class="button1 button2" > Accedi</button></Link></div>
  </div>

              <div className="card_title">
              {users.specificUser.name} {users.specificUser.surname} 
              </div> 
             
              {this.calculateAge(users.specificUser.birthDate)} <br/>
              {users.specificUser.city} <br/>
              {users.specificUser.role}<br/>
              </div> 
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
 export default Cerca;

 