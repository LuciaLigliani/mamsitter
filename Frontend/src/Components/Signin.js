import React from 'react';
import '..//App.css';

import {Link} from 'react-router-dom';
import { Component } from 'react';
import mamsitter from '..//mamsitter.png';
import { Col, Row } from 'react-bootstrap';
import { FormLabel } from '@material-ui/core';
import Navbar from '..//Components/Navbar'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import axios from 'axios'
import util from '..//util/util'
import { Snackbar } from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
class Signin extends Component{
  constructor(props){
    super(props)
    this.state={
      email:'',
      password:'',
      role:'',
      passwordConfirm:'',
      name:'',
      surname:'',
      sex:'',
      birthDate:'',
      city:'',
      district:'',
      description:'',
      phoneNumber:'',
      open: false,
      message:''
    }
  }

  handleClose= (e) => {
    this.setState({open:false})
   }

  changeHandler = (e) => {
    this.setState({[e.target.name]:e.target.value})
  }
submitHandler = (e) => {
  e.preventDefault()
  axios.post('http://localhost:3000/api/v1/auth/signup', this.state).then(response=>{
    if(response.data.status === 'success') {
      let jwt =  response.data.token;
      util.setCookie("user_jwt",jwt,7);
      this.setState({open:true, message:'Registrazione effettuata'})
      setTimeout(()=> {
        this.setState({open:false});
           }, 2000);
     setTimeout(()=> {
        window.location.assign('/login');
      }, 1000);
    }
  })
  .catch(error=>{
    this.setState({open:true, message:error.response.data.message});
    setTimeout(()=> {
      this.setState({open:false})
         }, 2000);
        console.log(error);
  //   if(error.response.data.message === 'User validation failed: passwordConfirm: Passwords are not the same')
  //     this.setState({open:true, message:'Le due password non corrispondono'});
    
  //  if(error.response.data.message === 'User validation failed: email: Incorrect email or password')
  //     this.setState({open:true, message:'Email o password incorretti'});
     
  //   if(error.response.data.message === 'User validation failed: role: Please provide a role')
  //     this.setState({open:true, message:'Per favore, inserisci un ruolo'});

  //   if(error.response.data.message === 'User validation failed: email: Please provide your email')
  //     this.setState({open:true, message:'Per favore, inserisci la tua email'});

  //   if(error.response.data.message === 'User validation failed: password: Password must be at least 8 character')
  //     this.setState({open:true, message:'La password deve avere più di 8 caratteri!'});

  //   if(error.response.data.message === 'Please provide a password')
  //     this.setState({open:true, message:'Per favore, inserisci una password'});

  //   if(error.response.data.message === 'Please confirm your password')
  //     this.setState({open:true, message:'Per favore, conferma la password'});
    
  //   if (error.response.data.message.includes('Please provide your birth date.'))
  //     this.setState({open:true, message:'Per favore, inserisci una data di nascita'});
   
    // if (error.response.data.message.includes('You have to be more then 18 years old'))
    //   this.setState({open:true, message:'Devi avere più di 18 anni!'});

    // if(error.response.data.message.includes('You can\'t be more then 100 years old'))
    //   this.setState({open:true, message:'Non puoi avere più di 100 anni!'});

    // if(error.response.data.message.includes('Please provide a name'))
    //   this.setState({open:true, message:'Per favore inserisci un nome'});
      
    // if(error.response.data.message.includes('Please provide a surname'))
    //   this.setState({open:true, message:'Per favore inserisci un cognome'});

    // if(error.response.data.message.includes('Please provide the sex'))
    //   this.setState({open:true, message:'Per favore inserisci il sesso'});

    // if(error.response.data.message.includes('Please provide a city'))
    //   this.setState({open:true, message:'Per favore inserisci una città'});
     
    // if(error.response.data.message.includes('Please provide a correct district'))
    //   this.setState({open:true, message:'Per favore inserisci un distretto corretto'});

    // if(error.response.data.message.includes('Please provide a valid phone number.'))
    //   this.setState({open:true, message:'Per favore inserisci un numero di telefono valido'});
  })
}

  render(){
  return (
    
    <div className="pagSignin"><Navbar></Navbar>
     <Snackbar 
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
      
      <Container className="Signin">
        <Form onSubmit={this.submitHandler}  className="formS">
        <Row> 
          <FormLabel>
          <font face='Georgia' color='black' ><h4>Compila il modulo per la registrazione</h4></font><br/>
          </FormLabel> 
          <Col>
          <img src={mamsitter} className="image" alt="mamsitter" />
          </Col>
          <Col>
          <Form.Group controlId="formBasicEmail"> 
            <br/> <Form.Control required name='email'  type="email" placeholder="Email" onChange={this.changeHandler} /><br/>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
          <Form.Control required name='password'  type="password" placeholder="Password" onChange={this.changeHandler} />
          </Form.Group>
         <br/><br/> <Form.Control required placeholder="Nome" name='name' onChange={this.changeHandler}  />
        <br/><br/> <Form.Control required name='sex' as="select" onChange={this.changeHandler}>
         <option value  hidden="hidden"  >Sesso</option>
         <option value='M'>M</option>
         <option value='F'>F</option> 
          </Form.Control>
          <br/> <br/><Form.Control required as="select" name='city'onChange={this.changeHandler}  >
           <option value hidden="hidden">Città</option>
           <option value='Milano'>Milano</option>
           </Form.Control>
           <br/> <br/> <Form.Control placeholder="Descrizione" name='description' onChange={this.changeHandler}/>

          </Col> 
          <Col>
        <br/> <Form.Control required name='role' as="select" defaultValue="Scegli ruolo" onChange={this.changeHandler} > 
        <option>Scegli ruolo</option>
        <option value='famiglia'>Famiglia</option>
        <option value='babysitter'>Babysitter</option>
        <option value='badante'>Badante</option>
        <option value='colf'> Colf</option>
      </Form.Control>
      <Form.Group controlId="formPassword">
         <br/> <Form.Control required name='passwordConfirm'  type="password" placeholder="Conferma Password"onChange={this.changeHandler}  />
          </Form.Group>
          <br/><br/> <Form.Control required placeholder="Cognome" name='surname' onChange={this.changeHandler}/>
        <br/> Data di nascita <Form.Control required type="date" name='birthDate' date-format="YYYY/MM/DD" onChange={this.changeHandler} ></Form.Control>
        <br/><br/><Form.Control  as="select" name='district' onChange={this.changeHandler} >
         <option value disabled="disabled"  hidden="hidden">Distretto</option>
         <option value='district'>distretto</option>
         <option value='district1'>district1</option>
        <option value='district2'>district2</option>
        <option valure='district3'>district3</option>
        </Form.Control>
        <br/><br/> <Form.Control required placeholder="Numero di telefono" name='phoneNumber' onChange={this.changeHandler}  /><br/>
        </Col>
       

          
<br/><br/>
<button  type="submit" class="button button1"  >Registrati</button><br/>
       
        </Row>
  </Form>
          
          
<br/><h6>Clicca <Link to ="/login"> <font face='Georgia' color='black'><u>qui</u> </font></Link>per accedere</h6> 





       








      </Container>
    
            
          
          
      
      
      
    
    
    
 </div>
  );
}
}
export default Signin;